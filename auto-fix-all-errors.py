#!/usr/bin/env python3
"""
Automated Fix Script - Fixes all found errors systematically
- Fancy quotes in JavaScript strings
- Extra parentheses in service workers
- Script conflicts
- Syntax errors
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List

class ComprehensiveErrorFixer:
    def __init__(self, root_dir: str = "."):
        self.root_dir = Path(root_dir)
        self.fixed_files = []
        self.errors_fixed = {
            "fancy_quotes": 0,
            "extra_parentheses": 0,
            "script_conflicts": 0,
            "syntax_errors": 0
        }
        
    def fix_fancy_quotes_in_javascript(self, content: str) -> tuple[str, int]:
        """Replace fancy quotes with regular quotes in JavaScript strings only"""
        fixed_count = 0
        lines = content.split('\n')
        fixed_lines = []
        
        in_script = False
        in_string = False
        string_char = None
        
        for line in lines:
            original_line = line
            
            # Track if we're in a <script> block
            if '<script' in line.lower() and '</script>' not in line.lower():
                in_script = True
            if '</script>' in line.lower():
                in_script = False
                in_string = False
                string_char = None
            
            if in_script:
                # Only fix quotes inside JavaScript strings
                # Look for string literals: '...' or "..."
                i = 0
                new_line = []
                while i < len(line):
                    char = line[i]
                    
                    # Track string boundaries
                    if char in ["'", '"'] and (i == 0 or line[i-1] != '\\'):
                        if not in_string:
                            in_string = True
                            string_char = char
                        elif char == string_char:
                            in_string = False
                            string_char = None
                    
                    # Replace fancy quotes only inside strings
                    if in_string:
                        if char == "'":  # Fancy apostrophe
                            new_line.append("'")
                            fixed_count += 1
                        elif char == '"':  # Fancy left double quote
                            new_line.append('"')
                            fixed_count += 1
                        elif char == '"':  # Fancy right double quote
                            new_line.append('"')
                            fixed_count += 1
                        else:
                            new_line.append(char)
                    else:
                        new_line.append(char)
                    
                    i += 1
                
                line = ''.join(new_line)
            
            fixed_lines.append(line)
        
        return '\n'.join(fixed_lines), fixed_count
    
    def fix_extra_parentheses(self, content: str) -> tuple[str, int]:
        """Fix extra closing parentheses in promise chains"""
        fixed_count = 0
        
        # Pattern 1: .catch(...) ));  -> .catch(...) );
        pattern1 = r'(\.catch\([^)]+\))\s*\)\);'
        def replace1(match):
            nonlocal fixed_count
            fixed_count += 1
            return match.group(1) + ');'
        content = re.sub(pattern1, replace1, content)
        
        # Pattern 2: }));  -> });
        # But only in service worker / promise contexts
        pattern2 = r'(\}\s*\)\s*\)\s*;)'
        def replace2(match):
            # Check if it's in a problematic context
            start = max(0, match.start() - 100)
            context = content[start:match.start()]
            if 'serviceWorker' in context or '.catch' in context or '.then' in context:
                nonlocal fixed_count
                fixed_count += 1
                return '});'
            return match.group(1)
        content = re.sub(pattern2, replace2, content)
        
        return content, fixed_count
    
    def fix_script_conflicts(self, content: str) -> tuple[str, int]:
        """Remove conflicting external language-switcher scripts"""
        fixed_count = 0
        
        # Check if inline language switcher exists
        has_inline = 'initLanguageSwitcher' in content or 'langToggle' in content or 'lang-toggle' in content
        
        if has_inline:
            # Remove external language-switcher.min.js
            pattern = r'<script[^>]*src=["\']js/language-switcher\.min\.js["\'][^>]*>\s*</script>'
            matches = list(re.finditer(pattern, content, re.IGNORECASE))
            if matches:
                fixed_count = len(matches)
                for match in reversed(matches):
                    content = content[:match.start()] + '<!-- REMOVED: Conflicting external language-switcher script -->' + content[match.end():]
        
        return content, fixed_count
    
    def fix_syntax_errors(self, content: str) -> tuple[str, int]:
        """Fix common syntax errors"""
        fixed_count = 0
        
        # Fix: organization's -> organization\'s (escape apostrophe)
        pattern1 = r"organization's"
        if re.search(pattern1, content):
            content = re.sub(pattern1, "organization\\'s", content)
            fixed_count += 1
        
        # Fix: don't -> don\'t (in JavaScript strings)
        # This is more complex, we'll handle it in the fancy quotes fix
        
        return content, fixed_count
    
    def fix_file(self, file_path: Path) -> Dict:
        """Fix all errors in a single file"""
        result = {
            "file": str(file_path),
            "fixed": False,
            "errors_fixed": {
                "fancy_quotes": 0,
                "extra_parentheses": 0,
                "script_conflicts": 0,
                "syntax_errors": 0
            }
        }
        
        try:
            original_content = file_path.read_text(encoding='utf-8')
            content = original_content
            
            # Apply all fixes
            content, fancy_count = self.fix_fancy_quotes_in_javascript(content)
            result["errors_fixed"]["fancy_quotes"] = fancy_count
            
            content, paren_count = self.fix_extra_parentheses(content)
            result["errors_fixed"]["extra_parentheses"] = paren_count
            
            content, conflict_count = self.fix_script_conflicts(content)
            result["errors_fixed"]["script_conflicts"] = conflict_count
            
            content, syntax_count = self.fix_syntax_errors(content)
            result["errors_fixed"]["syntax_errors"] = syntax_count
            
            # Only write if something changed
            total_fixes = sum(result["errors_fixed"].values())
            if total_fixes > 0:
                file_path.write_text(content, encoding='utf-8')
                result["fixed"] = True
                self.fixed_files.append(result)
                
                # Update global counts
                for key in self.errors_fixed:
                    self.errors_fixed[key] += result["errors_fixed"][key]
        
        except Exception as e:
            result["error"] = str(e)
        
        return result
    
    def fix_repository(self):
        """Fix all HTML files in repository"""
        print("🔧 COMPREHENSIVE ERROR FIXER")
        print("=" * 70)
        print()
        
        # Find all HTML files
        html_files = list(self.root_dir.rglob("*.html"))
        
        # Filter out unwanted files
        test_files = [
            f for f in html_files
            if not any(skip in str(f) for skip in [
                'node_modules', 'archive', 'react-app/dist', '.git',
                'react-app/src', 'android', 'dist'
            ])
        ]
        
        print(f"Found {len(test_files)} HTML files to fix")
        print()
        
        # Fix files
        for file_path in test_files:
            result = self.fix_file(file_path)
            if result["fixed"]:
                total = sum(result["errors_fixed"].values())
                print(f"✅ Fixed {Path(result['file']).name}: {total} errors")
        
        # Generate report
        self.generate_report()
    
    def generate_report(self):
        """Generate fix report"""
        print()
        print("=" * 70)
        print("📊 FIX SUMMARY")
        print("=" * 70)
        print()
        
        print(f"Files Fixed: {len(self.fixed_files)}")
        print()
        print("Errors Fixed:")
        print(f"  - Fancy Quotes: {self.errors_fixed['fancy_quotes']}")
        print(f"  - Extra Parentheses: {self.errors_fixed['extra_parentheses']}")
        print(f"  - Script Conflicts: {self.errors_fixed['script_conflicts']}")
        print(f"  - Syntax Errors: {self.errors_fixed['syntax_errors']}")
        print()
        
        total = sum(self.errors_fixed.values())
        print(f"Total Fixes Applied: {total}")
        print()
        
        # Save detailed report
        report = {
            "files_fixed": len(self.fixed_files),
            "errors_fixed": self.errors_fixed,
            "total_fixes": total,
            "fixed_files": self.fixed_files[:50]  # First 50
        }
        
        report_path = self.root_dir / "AUTO-FIX-REPORT.json"
        report_path.write_text(json.dumps(report, indent=2), encoding='utf-8')
        print(f"📄 Detailed report saved to: {report_path}")
        print()
        print("✅ All fixes applied!")

def main():
    fixer = ComprehensiveErrorFixer()
    fixer.fix_repository()

if __name__ == "__main__":
    main()
