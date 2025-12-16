#!/usr/bin/env python3
"""
Comprehensive Error Scanner - Finds all deeply integrated errors
Scans for: fancy quotes, syntax errors, extra parentheses, script conflicts
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple

class ComprehensiveErrorScanner:
    def __init__(self, root_dir: str = "."):
        self.root_dir = Path(root_dir)
        self.results = {
            "files_scanned": 0,
            "files_with_errors": 0,
            "fancy_quotes": {},
            "syntax_errors": {},
            "extra_parentheses": {},
            "script_conflicts": {},
            "critical_files": [],
            "clean_files": []
        }
        
    def find_fancy_quotes(self, file_path: Path) -> List[Tuple[int, str]]:
        """Find fancy quotes in JavaScript strings"""
        try:
            content = file_path.read_text(encoding='utf-8')
            issues = []
            
            # Find fancy quotes in JavaScript strings
            # Look for fancy apostrophes and quotes in string literals
            lines = content.split('\n')
            
            for i, line in enumerate(lines, 1):
                # Check for fancy apostrophe (U+2019) in single-quoted strings
                if "'" in line or "'" in line:
                    # Check if it's in a JavaScript string context
                    if re.search(r"['\"].*[''""].*['\"]", line) or re.search(r":\s*['\"].*[''""]", line):
                        issues.append((i, line.strip()[:100]))
                
                # Check for fancy double quotes (U+201C, U+201D)
                if '"' in line or '"' in line:
                    if re.search(r"['\"].*[''""].*['\"]", line):
                        issues.append((i, line.strip()[:100]))
            
            return issues
            
        except Exception as e:
            return []
    
    def find_extra_parentheses(self, file_path: Path) -> List[Tuple[int, str]]:
        """Find extra closing parentheses in JavaScript"""
        try:
            content = file_path.read_text(encoding='utf-8')
            issues = []
            
            # Look for patterns like })); or })); in service worker / promise chains
            pattern = r'\.catch\([^)]+\)\s*\)\);'
            matches = list(re.finditer(pattern, content, re.MULTILINE))
            
            for match in matches:
                # Find line number
                line_num = content[:match.start()].count('\n') + 1
                context = content[max(0, match.start()-50):match.end()+20]
                issues.append((line_num, context.replace('\n', ' ')[:150]))
            
            # Also check for })); patterns
            pattern2 = r'\}\s*\)\s*\)\s*;'
            matches2 = list(re.finditer(pattern2, content, re.MULTILINE))
            
            for match in matches2:
                line_num = content[:match.start()].count('\n') + 1
                # Check if it's in a problematic context (service worker, promise chain)
                context_before = content[max(0, match.start()-100):match.start()]
                if 'serviceWorker' in context_before or '.catch' in context_before or '.then' in context_before:
                    context = content[max(0, match.start()-50):match.end()+20]
                    issues.append((line_num, context.replace('\n', ' ')[:150]))
            
            return issues
            
        except Exception as e:
            return []
    
    def find_script_conflicts(self, file_path: Path) -> List[str]:
        """Find conflicting script includes"""
        try:
            content = file_path.read_text(encoding='utf-8')
            issues = []
            
            # Check for both inline language switcher AND external script
            has_inline_lang_switcher = 'initLanguageSwitcher' in content or 'langToggle' in content
            has_external_lang_switcher = 'language-switcher.min.js' in content or 'language-switcher.js' in content
            
            if has_inline_lang_switcher and has_external_lang_switcher:
                issues.append("Both inline and external language-switcher scripts found")
            
            # Check for duplicate script includes
            script_pattern = r'<script[^>]*src="([^"]+)"[^>]*>'
            scripts = re.findall(script_pattern, content)
            seen = set()
            for script in scripts:
                if script in seen:
                    issues.append(f"Duplicate script: {script}")
                seen.add(script)
            
            return issues
            
        except Exception as e:
            return []
    
    def validate_javascript_syntax(self, file_path: Path) -> List[str]:
        """Try to extract and validate JavaScript syntax"""
        try:
            content = file_path.read_text(encoding='utf-8')
            errors = []
            
            # Extract script blocks
            script_pattern = r'<script[^>]*>(.*?)</script>'
            scripts = re.findall(script_pattern, content, re.DOTALL)
            
            for i, script in enumerate(scripts):
                # Skip if it's just a src attribute (external script)
                if not script.strip() or script.strip().startswith('src='):
                    continue
                
                # Check for obvious syntax errors
                # Unclosed strings with fancy quotes
                if re.search(r"['\"].*[''""].*['\"]", script):
                    errors.append(f"Script block {i+1}: Fancy quotes in string literal")
                
                # Unbalanced parentheses in promise chains
                if re.search(r'\.catch\([^)]+\)\s*\)\);', script):
                    errors.append(f"Script block {i+1}: Extra closing parenthesis")
                
                # Check for common syntax issues
                if script.count('(') < script.count(')'):
                    errors.append(f"Script block {i+1}: More closing than opening parentheses")
            
            return errors
            
        except Exception as e:
            return [f"Error validating: {str(e)}"]
    
    def scan_file(self, file_path: Path) -> Dict:
        """Scan a single file for all error types"""
        result = {
            "file": str(file_path),
            "fancy_quotes": [],
            "extra_parentheses": [],
            "script_conflicts": [],
            "syntax_errors": [],
            "error_count": 0,
            "is_critical": False
        }
        
        # Check if it's a critical file
        critical_patterns = [
            'index', 'gym-dashboard', 'learning-hub', 'belt-assessment',
            'hub-home', 'gym-home', 'combined-profile'
        ]
        result["is_critical"] = any(pattern in file_path.name for pattern in critical_patterns)
        
        # Scan for all error types
        result["fancy_quotes"] = self.find_fancy_quotes(file_path)
        result["extra_parentheses"] = self.find_extra_parentheses(file_path)
        result["script_conflicts"] = self.find_script_conflicts(file_path)
        result["syntax_errors"] = self.validate_javascript_syntax(file_path)
        
        # Count total errors
        result["error_count"] = (
            len(result["fancy_quotes"]) +
            len(result["extra_parentheses"]) +
            len(result["script_conflicts"]) +
            len(result["syntax_errors"])
        )
        
        return result
    
    def scan_repository(self):
        """Scan entire repository"""
        print("🔍 COMPREHENSIVE ERROR SCAN")
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
        
        print(f"Found {len(test_files)} HTML files to scan")
        print()
        
        # Scan files
        for file_path in test_files:
            self.results["files_scanned"] += 1
            result = self.scan_file(file_path)
            
            if result["error_count"] > 0:
                self.results["files_with_errors"] += 1
                
                # Categorize errors
                if result["fancy_quotes"]:
                    self.results["fancy_quotes"][str(file_path)] = len(result["fancy_quotes"])
                if result["extra_parentheses"]:
                    self.results["extra_parentheses"][str(file_path)] = result["extra_parentheses"]
                if result["script_conflicts"]:
                    self.results["script_conflicts"][str(file_path)] = result["script_conflicts"]
                if result["syntax_errors"]:
                    self.results["syntax_errors"][str(file_path)] = result["syntax_errors"]
            
            # Track critical files
            if result["is_critical"]:
                if result["error_count"] == 0:
                    self.results["clean_files"].append(str(file_path))
                else:
                    self.results["critical_files"].append({
                        "file": str(file_path),
                        "errors": result["error_count"],
                        "details": result
                    })
        
        # Generate report
        self.generate_report()
    
    def generate_report(self):
        """Generate comprehensive report"""
        print("=" * 70)
        print("📊 SCAN RESULTS")
        print("=" * 70)
        print()
        
        print(f"Files Scanned: {self.results['files_scanned']}")
        print(f"Files with Errors: {self.results['files_with_errors']}")
        print(f"Clean Files: {len(self.results['clean_files'])}")
        print()
        
        # Fancy quotes summary
        fancy_quote_files = len(self.results['fancy_quotes'])
        total_fancy_quotes = sum(self.results['fancy_quotes'].values())
        print(f"🚨 Fancy Quotes:")
        print(f"   Files affected: {fancy_quote_files}")
        print(f"   Total instances: {total_fancy_quotes}")
        
        if fancy_quote_files > 0:
            print(f"\n   Top 10 worst offenders:")
            sorted_files = sorted(self.results['fancy_quotes'].items(), key=lambda x: x[1], reverse=True)[:10]
            for file, count in sorted_files:
                print(f"     - {Path(file).name}: {count} instances")
        
        print()
        
        # Extra parentheses
        extra_paren_files = len(self.results['extra_parentheses'])
        print(f"🚨 Extra Parentheses:")
        print(f"   Files affected: {extra_paren_files}")
        if extra_paren_files > 0:
            for file, issues in list(self.results['extra_parentheses'].items())[:10]:
                print(f"     - {Path(file).name}: {len(issues)} issues")
                for line_num, context in issues[:2]:
                    print(f"       Line {line_num}: {context[:80]}...")
        
        print()
        
        # Script conflicts
        conflict_files = len(self.results['script_conflicts'])
        print(f"🚨 Script Conflicts:")
        print(f"   Files affected: {conflict_files}")
        if conflict_files > 0:
            for file, issues in list(self.results['script_conflicts'].items())[:10]:
                print(f"     - {Path(file).name}: {', '.join(issues)}")
        
        print()
        
        # Syntax errors
        syntax_error_files = len(self.results['syntax_errors'])
        print(f"🚨 Syntax Errors:")
        print(f"   Files affected: {syntax_error_files}")
        if syntax_error_files > 0:
            for file, errors in list(self.results['syntax_errors'].items())[:10]:
                print(f"     - {Path(file).name}:")
                for error in errors[:3]:
                    print(f"       {error}")
        
        print()
        
        # Critical files with errors
        if self.results['critical_files']:
            print(f"🚨 CRITICAL FILES WITH ERRORS: {len(self.results['critical_files'])}")
            for item in self.results['critical_files'][:10]:
                print(f"   - {Path(item['file']).name}: {item['errors']} errors")
        
        print()
        
        # Clean critical files
        if self.results['clean_files']:
            print(f"✅ CLEAN CRITICAL FILES: {len(self.results['clean_files'])}")
            for file in self.results['clean_files'][:10]:
                print(f"   - {Path(file).name}")
        
        # Save detailed report
        report_path = self.root_dir / "COMPREHENSIVE-ERROR-SCAN-REPORT.json"
        report_path.write_text(json.dumps(self.results, indent=2), encoding='utf-8')
        print()
        print(f"📄 Detailed report saved to: {report_path}")
        
        # Generate fix script
        self.generate_fix_script()
    
    def generate_fix_script(self):
        """Generate automated fix script"""
        fix_script = """#!/usr/bin/env python3
\"\"\"
Automated Fix Script - Fixes all found errors
\"\"\"

import re
from pathlib import Path

def fix_fancy_quotes(content):
    \"\"\"Replace fancy quotes with regular quotes in JavaScript strings\"\"\"
    # Replace fancy apostrophe in single-quoted strings
    content = re.sub(r"([\"'])([^\"']*?)'([^\"']*?)([\"'])", r"\\1\\2'\\3\\4", content)
    # Replace fancy double quotes
    content = content.replace('"', '"').replace('"', '"')
    return content

def fix_extra_parentheses(content):
    \"\"\"Fix extra closing parentheses in promise chains\"\"\"
    # Fix })); patterns in service worker / promise chains
    content = re.sub(r'(\\.catch\\([^)]+\\))\\s*\\)\\);', r'\\1);', content)
    # Fix })); patterns
    content = re.sub(r'(\\})\\s*\\)\\s*\\)\\s*;', r'\\1);', content)
    return content

def fix_script_conflicts(content):
    \"\"\"Remove conflicting external language-switcher scripts\"\"\"
    # Remove external language-switcher if inline exists
    if 'initLanguageSwitcher' in content or 'langToggle' in content:
        content = re.sub(
            r'<script[^>]*src=["\']js/language-switcher\\.min\\.js["\'][^>]*>\\s*</script>',
            '<!-- REMOVED: Conflicting external language-switcher script -->',
            content
        )
    return content

# Load scan results
import json
with open('COMPREHENSIVE-ERROR-SCAN-REPORT.json', 'r') as f:
    results = json.load(f)

fixed = 0
for file_path in results.get('fancy_quotes', {}).keys():
    path = Path(file_path)
    if path.exists():
        content = path.read_text(encoding='utf-8')
        original = content
        
        content = fix_fancy_quotes(content)
        content = fix_extra_parentheses(content)
        content = fix_script_conflicts(content)
        
        if content != original:
            path.write_text(content, encoding='utf-8')
            fixed += 1
            print(f"✅ Fixed: {path.name}")

print(f"\\n✅ Fixed {fixed} files")
"""
        
        fix_script_path = self.root_dir / "auto-fix-all-errors.py"
        fix_script_path.write_text(fix_script, encoding='utf-8')
        print(f"🔧 Auto-fix script generated: {fix_script_path}")

def main():
    scanner = ComprehensiveErrorScanner()
    scanner.scan_repository()

if __name__ == "__main__":
    main()

