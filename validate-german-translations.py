#!/usr/bin/env python3
"""
TAP-IN German Translation Link Validator & Gap Analyzer

Analyzes all German files, validates links, identifies gaps, and auto-fixes issues
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Set, Tuple
import json

class GermanLinkValidator:
    """Validates and analyzes German translation completeness"""
    
    def __init__(self, root_dir: str = "."):
        self.root_dir = Path(root_dir)
        self.issues = []
        self.stats = {
            'german_files': 0,
            'english_files': 0,
            'broken_links': 0,
            'english_links_in_german': 0,
            'missing_german_versions': 0,
            'correct_links': 0,
            'lang_attr_issues': 0
        }
        
    def scan_all_files(self) -> Dict[str, Set[str]]:
        """Scan directory for all HTML files"""
        files = {
            'german': set(),
            'english': set(),
            'all': set()
        }
        
        for html_file in self.root_dir.glob("*.html"):
            files['all'].add(html_file.name)
            
            if html_file.name.endswith('-de.html'):
                files['german'].add(html_file.name)
            else:
                files['english'].add(html_file.name)
                
        self.stats['german_files'] = len(files['german'])
        self.stats['english_files'] = len(files['english'])
        
        return files
    
    def get_expected_german_version(self, english_file: str) -> str:
        """Get expected German filename for English file"""
        if english_file.endswith('.html'):
            base = english_file[:-5]  # Remove .html
            return f"{base}-de.html"
        return english_file
    
    def get_english_version(self, german_file: str) -> str:
        """Get English version of German file"""
        if german_file.endswith('-de.html'):
            return german_file[:-8] + '.html'
        return german_file
    
    def extract_links(self, content: str) -> List[str]:
        """Extract all internal HTML links from content"""
        # Pattern for href="*.html"
        pattern = r'href=["\']([^"\']*\.html[^"\']*)["\']'
        links = re.findall(pattern, content)
        
        # Filter out external links and anchors
        internal_links = []
        for link in links:
            # Skip external URLs
            if link.startswith('http://') or link.startswith('https://'):
                continue
            # Skip mailto and tel
            if link.startswith('mailto:') or link.startswith('tel:'):
                continue
            # Remove anchors
            if '#' in link:
                link = link.split('#')[0]
            if link:
                internal_links.append(link)
        
        return internal_links
    
    def validate_german_file(self, filepath: Path, all_files: Set[str]) -> List[Dict]:
        """Validate a single German file"""
        file_issues = []
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check 1: Language attribute
            if '<html lang="de">' not in content and '<html lang="de-DE">' not in content:
                file_issues.append({
                    'type': 'lang_attr',
                    'severity': 'error',
                    'message': 'Missing or incorrect <html lang="de"> attribute',
                    'fix': 'Change <html lang="..."> to <html lang="de">'
                })
                self.stats['lang_attr_issues'] += 1
            
            # Check 2: Links to other pages
            links = self.extract_links(content)
            
            for link in links:
                # Skip external and special links
                if not link.endswith('.html'):
                    continue
                
                # Check if linking to English version when German exists
                if not link.endswith('-de.html'):
                    expected_german = self.get_expected_german_version(link)
                    
                    if expected_german in all_files:
                        file_issues.append({
                            'type': 'english_link',
                            'severity': 'warning',
                            'message': f'Linking to English version: {link}',
                            'current': link,
                            'suggested': expected_german,
                            'fix': f'Change href="{link}" to href="{expected_german}"'
                        })
                        self.stats['english_links_in_german'] += 1
                    else:
                        file_issues.append({
                            'type': 'missing_german',
                            'severity': 'info',
                            'message': f'Links to {link} but German version does not exist',
                            'file_needed': expected_german
                        })
                        self.stats['missing_german_versions'] += 1
                else:
                    # Verify German file exists
                    if link not in all_files:
                        file_issues.append({
                            'type': 'broken_link',
                            'severity': 'error',
                            'message': f'Broken link: {link} does not exist',
                            'link': link
                        })
                        self.stats['broken_links'] += 1
                    else:
                        self.stats['correct_links'] += 1
            
            # Check 3: Common English text that should be German
            english_patterns = {
                r'\bComplete Lesson\b': 'Should be: Lektion abschließen',
                r'\bNext Lesson\b': 'Should be: Nächste Lektion',
                r'\bStart Quiz\b': 'Should be: Quiz starten',
                r'\bSubmit Answer\b': 'Should be: Antwort einreichen',
                r'\bRetry Quiz\b': 'Should be: Quiz wiederholen',
                r'\bYou Passed\b': 'Should be: Bestanden',
                r'\bYou Failed\b': 'Should be: Nicht bestanden',
                r'\bQuestion \d+ of \d+\b': 'Should be: Frage X von Y',
            }
            
            for pattern, suggestion in english_patterns.items():
                matches = re.findall(pattern, content)
                if matches:
                    file_issues.append({
                        'type': 'untranslated_text',
                        'severity': 'warning',
                        'message': f'Found English text: {matches[0]}',
                        'suggestion': suggestion,
                        'pattern': pattern
                    })
            
        except Exception as e:
            file_issues.append({
                'type': 'file_error',
                'severity': 'error',
                'message': f'Error reading file: {str(e)}'
            })
        
        return file_issues
    
    def find_missing_translations(self, files: Dict[str, Set[str]]) -> List[Dict]:
        """Find English files without German translations"""
        missing = []
        
        for english_file in files['english']:
            expected_german = self.get_expected_german_version(english_file)
            
            if expected_german not in files['german']:
                # Determine priority based on filename
                priority = 'low'
                if 'stripe' in english_file or 'belt' in english_file:
                    priority = 'high'
                elif 'hub' in english_file or 'dashboard' in english_file:
                    priority = 'medium'
                
                missing.append({
                    'english_file': english_file,
                    'missing_german': expected_german,
                    'priority': priority
                })
        
        return missing
    
    def generate_report(self, detailed: bool = True) -> str:
        """Generate validation report"""
        report = []
        report.append("=" * 80)
        report.append("TAP-IN GERMAN TRANSLATION VALIDATION REPORT")
        report.append("=" * 80)
        report.append("")
        
        # Summary statistics
        report.append("📊 SUMMARY STATISTICS")
        report.append("-" * 80)
        report.append(f"German files found:           {self.stats['german_files']}")
        report.append(f"English files found:          {self.stats['english_files']}")
        report.append(f"Correct German links:         {self.stats['correct_links']} ✅")
        report.append(f"English links in German:      {self.stats['english_links_in_german']} ⚠️")
        report.append(f"Broken links:                 {self.stats['broken_links']} ❌")
        report.append(f"Missing German versions:      {self.stats['missing_german_versions']} ℹ️")
        report.append(f"Language attribute issues:    {self.stats['lang_attr_issues']} ⚠️")
        report.append("")
        
        # Issues by file
        if detailed and self.issues:
            report.append("🔍 DETAILED ISSUES BY FILE")
            report.append("-" * 80)
            
            for file_data in self.issues:
                filename = file_data['file']
                issues = file_data['issues']
                
                if not issues:
                    continue
                
                report.append(f"\n📄 {filename}")
                report.append(f"   {len(issues)} issue(s) found:")
                
                for issue in issues:
                    severity_icon = {
                        'error': '❌',
                        'warning': '⚠️',
                        'info': 'ℹ️'
                    }.get(issue['severity'], '•')
                    
                    report.append(f"   {severity_icon} [{issue['type'].upper()}] {issue['message']}")
                    
                    if 'fix' in issue:
                        report.append(f"      Fix: {issue['fix']}")
                    if 'suggested' in issue:
                        report.append(f"      Suggested: {issue['suggested']}")
        
        report.append("")
        report.append("=" * 80)
        
        return "\n".join(report)
    
    def auto_fix_links(self, filepath: Path, all_files: Set[str], dry_run: bool = True) -> int:
        """Auto-fix common link issues"""
        fixes = 0
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Fix 1: Update links to German versions
            links = self.extract_links(content)
            
            for link in links:
                if not link.endswith('.html') or link.endswith('-de.html'):
                    continue
                
                expected_german = self.get_expected_german_version(link)
                
                if expected_german in all_files:
                    # Replace the link
                    content = content.replace(f'href="{link}"', f'href="{expected_german}"')
                    content = content.replace(f"href='{link}'", f"href='{expected_german}'")
                    fixes += 1
            
            # Fix 2: Update language attribute
            content = re.sub(r'<html lang="[^"]*">', '<html lang="de">', content)
            
            # Only write if not dry run and changes were made
            if not dry_run and content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ Fixed {fixes} issues in {filepath.name}")
            elif dry_run and content != original_content:
                print(f"🔍 Would fix {fixes} issues in {filepath.name} (dry run)")
            
        except Exception as e:
            print(f"❌ Error processing {filepath.name}: {str(e)}")
        
        return fixes
    
    def run_validation(self, auto_fix: bool = False, dry_run: bool = True) -> str:
        """Run complete validation"""
        print("🔍 Scanning for HTML files...")
        files = self.scan_all_files()
        
        print(f"Found {len(files['german'])} German files")
        print(f"Found {len(files['english'])} English files")
        print("")
        
        print("🔍 Validating German files...")
        total_fixes = 0
        
        for german_file in sorted(files['german']):
            filepath = self.root_dir / german_file
            
            # Validate
            file_issues = self.validate_german_file(filepath, files['all'])
            
            if file_issues:
                self.issues.append({
                    'file': german_file,
                    'issues': file_issues
                })
            
            # Auto-fix if enabled
            if auto_fix:
                fixes = self.auto_fix_links(filepath, files['all'], dry_run)
                total_fixes += fixes
        
        print("")
        
        # Find missing translations
        print("🔍 Checking for missing German translations...")
        missing = self.find_missing_translations(files)
        
        if missing:
            print(f"\n📋 MISSING GERMAN TRANSLATIONS ({len(missing)})")
            print("-" * 80)
            
            # Group by priority
            for priority in ['high', 'medium', 'low']:
                priority_items = [m for m in missing if m['priority'] == priority]
                
                if priority_items:
                    priority_icon = {'high': '🔴', 'medium': '🟡', 'low': '🟢'}[priority]
                    print(f"\n{priority_icon} {priority.upper()} PRIORITY:")
                    for item in priority_items:
                        print(f"   • {item['english_file']} → {item['missing_german']}")
        
        print("")
        
        if auto_fix and total_fixes > 0:
            if dry_run:
                print(f"🔍 DRY RUN: Would fix {total_fixes} issues")
                print("Run with --fix (no --dry-run) to apply changes")
            else:
                print(f"✅ Fixed {total_fixes} issues automatically")
        
        # Generate and return report
        return self.generate_report(detailed=True)


def main():
    """Main execution"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Validate German translations and links')
    parser.add_argument('--fix', action='store_true', help='Auto-fix common issues')
    parser.add_argument('--dry-run', action='store_true', default=True, help='Show what would be fixed without changing files')
    parser.add_argument('--output', '-o', help='Output report to file')
    
    args = parser.parse_args()
    
    # If --fix is specified without --dry-run, disable dry run
    if args.fix and not any('--dry-run' in arg for arg in __import__('sys').argv):
        args.dry_run = False
    
    validator = GermanLinkValidator()
    report = validator.run_validation(auto_fix=args.fix, dry_run=args.dry_run)
    
    print(report)
    
    # Save report if output specified
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"\n📄 Report saved to: {args.output}")
    
    # Exit code based on severity of issues
    if validator.stats['broken_links'] > 0 or validator.stats['lang_attr_issues'] > 0:
        return 1
    return 0


if __name__ == '__main__':
    exit(main())

