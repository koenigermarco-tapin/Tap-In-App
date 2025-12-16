#!/usr/bin/env python3
"""
Auto-fix script for adding aria-labels to unlabeled inputs.
HIGH QUALITY: Conservative, validated, with rollback capability.
"""

import os
import re
import json
import shutil
from pathlib import Path
from bs4 import BeautifulSoup, Comment
from datetime import datetime
from typing import List, Dict, Optional, Tuple

# Files to EXCLUDE (DO NOT TOUCH list)
EXCLUDE_PATTERNS = [
    'team-dashboard',
    'join-team',
    'admin',
    'profile',
    'lab',
    'crew',
    'gym-dashboard',
    'belt-assessment-v2',
    'leadership-style-assessment',
    'worker-type-assessment',
    'team-assessment',
    'combined-profile-carousel',
    'deep-dive',
    'open-mat-',
    'tool-',
    'business-portal',
    'learning-hub',
    'index-DUAL-ENTRY',
    'index-de.html',
    'index.html',
]

class AriaLabelFixer:
    """High-quality aria-label fixer with validation and safety checks"""
    
    def __init__(self, dry_run=False, backup=True):
        self.dry_run = dry_run
        self.backup = backup
        self.stats = {
            'files_processed': 0,
            'files_modified': 0,
            'labels_added': 0,
            'labels_by_type': {},
            'errors': [],
            'skipped': [],
        }
        self.changes_log = []
    
    def should_exclude_file(self, filepath: str) -> bool:
        """Check if file should be excluded"""
        filename = os.path.basename(filepath).lower()
        return any(pattern.lower() in filename for pattern in EXCLUDE_PATTERNS)
    
    def has_label_association(self, elem, soup: BeautifulSoup) -> bool:
        """Check if element has proper label association"""
        # Check for id and matching label
        elem_id = elem.get('id')
        if elem_id:
            label = soup.find('label', {'for': elem_id})
            if label and label.get_text(strip=True):
                return True
        
        # Check if wrapped in label
        parent = elem.parent
        if parent and parent.name == 'label':
            if parent.get_text(strip=True):
                return True
        
        return False
    
    def has_aria_label(self, elem) -> bool:
        """Check if element already has aria-label"""
        return bool(elem.get('aria-label'))
    
    def get_placeholder_text(self, elem) -> Optional[str]:
        """Get placeholder attribute"""
        placeholder = elem.get('placeholder', '').strip()
        return placeholder if placeholder else None
    
    def get_nearby_question_text(self, elem) -> Optional[str]:
        """Find question text in nearby elements"""
        # Check parent for question/prompt classes
        parent = elem.parent
        if parent:
            # Look for question/prompt elements
            question = parent.find(['div', 'p', 'span', 'label'], 
                                  class_=re.compile(r'question|prompt|label|instruction', re.I))
            if question:
                text = question.get_text(strip=True)
                if text and len(text) < 200:  # Reasonable length
                    return text
            
            # Look for headings
            heading = parent.find(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
            if heading:
                text = heading.get_text(strip=True)
                if text and len(text) < 200:
                    return text
        
        # Check previous sibling
        prev = elem.previous_sibling
        if prev:
            if hasattr(prev, 'get_text'):
                text = prev.get_text(strip=True)
                if text and len(text) < 200:
                    return text
        
        return None
    
    def get_option_text(self, elem) -> Optional[str]:
        """Get text for radio/checkbox options"""
        if elem.get('type') not in ['radio', 'checkbox']:
            return None
        
        # Check next sibling text
        next_sib = elem.next_sibling
        if next_sib:
            if isinstance(next_sib, str):
                text = next_sib.strip()
                if text:
                    return text
            elif hasattr(next_sib, 'get_text'):
                text = next_sib.get_text(strip=True)
                if text:
                    return text
        
        # Check parent text (excluding the input itself)
        parent = elem.parent
        if parent:
            # Clone to avoid modifying original
            parent_clone = BeautifulSoup(str(parent), 'html.parser')
            # Remove the input element
            for inp in parent_clone.find_all(['input', 'textarea', 'select']):
                inp.decompose()
            text = parent_clone.get_text(strip=True)
            if text and len(text) < 200:
                return text
        
        # Check value attribute
        value = elem.get('value', '').strip()
        if value and len(value) < 100:
            return value
        
        return None
    
    def get_input_name_or_id(self, elem) -> Optional[str]:
        """Get name or id as fallback"""
        name = elem.get('name', '').strip()
        if name:
            # Humanize: "user_name" -> "User name"
            name = name.replace('_', ' ').replace('-', ' ').title()
            return name
        
        elem_id = elem.get('id', '').strip()
        if elem_id:
            elem_id = elem_id.replace('_', ' ').replace('-', ' ').title()
            return elem_id
        
        return None
    
    def generate_aria_label(self, elem, soup: BeautifulSoup) -> Optional[str]:
        """Generate appropriate aria-label for element"""
        input_type = elem.get('type', 'text')
        elem_name = elem.name
        
        if elem_name == 'textarea':
            input_type = 'textarea'
        elif elem_name == 'select':
            input_type = 'select'
        
        # Priority 1: Placeholder text
        placeholder = self.get_placeholder_text(elem)
        if placeholder:
            return placeholder
        
        # Priority 2: Nearby question text
        question = self.get_nearby_question_text(elem)
        if question:
            # For radio/checkbox, append option text if available
            if input_type in ['radio', 'checkbox']:
                option = self.get_option_text(elem)
                if option:
                    return f"{question}: {option}"
                return question
            return question
        
        # Priority 3: For radio/checkbox, use option text
        if input_type in ['radio', 'checkbox']:
            option = self.get_option_text(elem)
            if option:
                if question:
                    return f"{question}: {option}"
                return option
        
        # Priority 4: Name or ID (humanized)
        name_id = self.get_input_name_or_id(elem)
        if name_id:
            if input_type == 'search':
                return f"Search {name_id.lower()}"
            return name_id
        
        # Priority 5: Type-based defaults
        type_defaults = {
            'search': 'Search',
            'email': 'Email address',
            'tel': 'Phone number',
            'url': 'Website URL',
            'number': 'Number',
            'date': 'Date',
            'time': 'Time',
            'file': 'Upload file',
            'range': 'Slider',
            'textarea': 'Text input',
            'select': 'Select option',
        }
        
        default = type_defaults.get(input_type, 'Input')
        return default
    
    def add_range_attributes(self, elem, aria_label: str) -> Dict[str, str]:
        """Add additional attributes for range inputs"""
        attrs = {}
        
        # Add min/max if present
        min_val = elem.get('min')
        max_val = elem.get('max')
        if min_val:
            attrs['aria-valuemin'] = min_val
        if max_val:
            attrs['aria-valuemax'] = max_val
        
        # Try to find value display
        elem_id = elem.get('id')
        if elem_id:
            # Look for element that displays the value
            soup = elem.find_parent()
            if soup:
                # Common patterns: id + "Value", id + "-value", etc.
                value_elem = soup.find(id=re.compile(f'{re.escape(elem_id)}.*value', re.I))
                if not value_elem:
                    value_elem = soup.find(class_=re.compile('value|display', re.I))
                
                if value_elem:
                    value_text = value_elem.get_text(strip=True)
                    if value_text:
                        attrs['aria-valuetext'] = value_text
                        # Update aria-label to include current value
                        aria_label = f"{aria_label} (current: {value_text})"
        
        return attrs, aria_label
    
    def fix_element(self, elem, soup: BeautifulSoup) -> Tuple[bool, str]:
        """Fix a single element - returns (success, aria_label)"""
        # Skip if already has label association
        if self.has_label_association(elem, soup):
            return False, "Has label association"
        
        # Skip if already has aria-label
        if self.has_aria_label(elem):
            return False, "Already has aria-label"
        
        # Generate aria-label
        aria_label = self.generate_aria_label(elem, soup)
        if not aria_label:
            return False, "Could not generate aria-label"
        
        # Clean up aria-label (remove extra whitespace, limit length)
        aria_label = ' '.join(aria_label.split())
        if len(aria_label) > 200:
            aria_label = aria_label[:197] + "..."
        
        # Add additional attributes for range inputs
        input_type = elem.get('type', 'text')
        if input_type == 'range':
            extra_attrs, aria_label = self.add_range_attributes(elem, aria_label)
            for key, value in extra_attrs.items():
                elem[key] = value
        
        # Set aria-label
        elem['aria-label'] = aria_label
        
        return True, aria_label
    
    def validate_html(self, content: str) -> Tuple[bool, Optional[str]]:
        """Validate HTML is still well-formed after changes"""
        try:
            soup = BeautifulSoup(content, 'html.parser')
            # Try to parse - if it fails, BeautifulSoup will raise
            return True, None
        except Exception as e:
            return False, str(e)
    
    def process_file(self, filepath: str) -> Dict:
        """Process a single file"""
        result = {
            'file': filepath,
            'success': False,
            'labels_added': 0,
            'errors': [],
            'changes': [],
        }
        
        try:
            # Read file
            with open(filepath, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Parse
            soup = BeautifulSoup(original_content, 'html.parser')
            
            # Find all inputs
            inputs = soup.find_all(['input', 'textarea', 'select'])
            
            fixed_count = 0
            for elem in inputs:
                success, message = self.fix_element(elem, soup)
                if success:
                    fixed_count += 1
                    input_type = elem.get('type', elem.name)
                    result['changes'].append({
                        'type': input_type,
                        'id': elem.get('id', ''),
                        'name': elem.get('name', ''),
                        'aria_label': message,
                    })
                    self.stats['labels_by_type'][input_type] = self.stats['labels_by_type'].get(input_type, 0) + 1
            
            if fixed_count == 0:
                result['success'] = True
                return result
            
            # Get modified content
            modified_content = str(soup)
            
            # Validate HTML
            is_valid, error = self.validate_html(modified_content)
            if not is_valid:
                result['errors'].append(f"HTML validation failed: {error}")
                return result
            
            # Backup original
            if self.backup and not self.dry_run:
                backup_path = f"{filepath}.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
                shutil.copy2(filepath, backup_path)
                result['backup'] = backup_path
            
            # Write changes
            if not self.dry_run:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
            
            result['success'] = True
            result['labels_added'] = fixed_count
            self.stats['labels_added'] += fixed_count
            
        except Exception as e:
            result['errors'].append(f"Error processing file: {str(e)}")
            self.stats['errors'].append(f"{filepath}: {str(e)}")
        
        return result
    
    def run(self, directory: str = '.'):
        """Run the fixer on all HTML files"""
        print("🔧 Auto-Fix ARIA Labels - High Quality Mode")
        print("=" * 60)
        print(f"Mode: {'DRY RUN' if self.dry_run else 'LIVE'}")
        print(f"Backup: {'Yes' if self.backup else 'No'}")
        print("=" * 60)
        
        files_to_process = []
        
        # Find all HTML files
        for root, dirs, files in os.walk(directory):
            # Skip hidden and excluded directories
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'react-app', 'archive', '.git']]
            
            for file in files:
                if not file.endswith('.html'):
                    continue
                
                filepath = os.path.join(root, file)
                
                if self.should_exclude_file(filepath):
                    self.stats['skipped'].append(filepath)
                    continue
                
                files_to_process.append(filepath)
        
        print(f"\n📋 Found {len(files_to_process)} files to process")
        print(f"⏭️  Skipped {len(self.stats['skipped'])} files (excluded)")
        
        # Process files
        results = []
        for i, filepath in enumerate(files_to_process, 1):
            print(f"\n[{i}/{len(files_to_process)}] Processing: {filepath}")
            result = self.process_file(filepath)
            results.append(result)
            self.stats['files_processed'] += 1
            
            if result['success'] and result['labels_added'] > 0:
                self.stats['files_modified'] += 1
                print(f"  ✅ Added {result['labels_added']} aria-label(s)")
                if result.get('backup'):
                    print(f"  💾 Backup: {result['backup']}")
            elif result['errors']:
                print(f"  ❌ Errors: {', '.join(result['errors'])}")
            else:
                print(f"  ⏭️  No changes needed")
        
        # Generate report
        self.generate_report(results)
        
        return results
    
    def generate_report(self, results: List[Dict]):
        """Generate detailed report"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        report_file = f'aria-label-fix-report-{timestamp}.json'
        summary_file = f'aria-label-fix-summary-{timestamp}.md'
        
        # JSON report
        report_data = {
            'timestamp': timestamp,
            'dry_run': self.dry_run,
            'stats': self.stats,
            'results': results,
        }
        
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        
        # Markdown summary
        with open(summary_file, 'w', encoding='utf-8') as f:
            f.write("# ARIA Label Auto-Fix Report\n\n")
            f.write(f"**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"**Mode:** {'DRY RUN' if self.dry_run else 'LIVE'}\n\n")
            
            f.write("## Summary\n\n")
            f.write(f"- **Files Processed:** {self.stats['files_processed']}\n")
            f.write(f"- **Files Modified:** {self.stats['files_modified']}\n")
            f.write(f"- **Labels Added:** {self.stats['labels_added']}\n")
            f.write(f"- **Files Skipped:** {len(self.stats['skipped'])}\n")
            f.write(f"- **Errors:** {len(self.stats['errors'])}\n\n")
            
            f.write("## Labels Added by Type\n\n")
            for input_type, count in sorted(self.stats['labels_by_type'].items(), key=lambda x: x[1], reverse=True):
                f.write(f"- `{input_type}`: {count}\n")
            
            f.write("\n## Modified Files\n\n")
            modified = [r for r in results if r['success'] and r['labels_added'] > 0]
            if modified:
                f.write("| File | Labels Added | Changes |\n")
                f.write("|------|--------------|----------|\n")
                for r in modified:
                    changes_str = ', '.join([f"{c['type']}" for c in r['changes'][:3]])
                    if len(r['changes']) > 3:
                        changes_str += f" (+{len(r['changes'])-3} more)"
                    f.write(f"| `{r['file']}` | {r['labels_added']} | {changes_str} |\n")
            else:
                f.write("No files were modified.\n")
            
            if self.stats['errors']:
                f.write("\n## Errors\n\n")
                for error in self.stats['errors']:
                    f.write(f"- {error}\n")
        
        print("\n" + "=" * 60)
        print("📊 FINAL STATISTICS")
        print("=" * 60)
        print(f"Files Processed: {self.stats['files_processed']}")
        print(f"Files Modified: {self.stats['files_modified']}")
        print(f"Labels Added: {self.stats['labels_added']}")
        print(f"Files Skipped: {len(self.stats['skipped'])}")
        print(f"Errors: {len(self.stats['errors'])}")
        
        print(f"\n📄 Reports Generated:")
        print(f"  - {report_file}")
        print(f"  - {summary_file}")
        
        if self.dry_run:
            print("\n⚠️  DRY RUN MODE - No files were modified")
            print("   Run without --dry-run to apply changes")

def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Auto-fix aria-labels in HTML files')
    parser.add_argument('--dry-run', action='store_true', help='Dry run mode (no changes)')
    parser.add_argument('--no-backup', action='store_true', help='Skip backup creation')
    parser.add_argument('--directory', default='.', help='Directory to process')
    
    args = parser.parse_args()
    
    fixer = AriaLabelFixer(dry_run=args.dry_run, backup=not args.no_backup)
    fixer.run(args.directory)

if __name__ == "__main__":
    main()

