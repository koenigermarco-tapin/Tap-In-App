#!/usr/bin/env python3
"""
German Translation Quality Checker
Validates Du-form usage, link correctness, and translation quality
"""

import re
from pathlib import Path
from typing import List, Dict

class GermanQualityChecker:
    """Check German translation quality"""
    
    def __init__(self, filepath: Path):
        self.filepath = filepath
        self.issues = []
        
    def check_sie_form(self, content: str) -> List[Dict]:
        """Check for Sie-form (should be Du-form)"""
        issues = []
        
        # Patterns to check for Sie-form
        sie_patterns = [
            (r'\bSie haben\b', 'Du hast'),
            (r'\bIhre\b', 'Deine'),
            (r'\bIhren\b', 'Deinen'),
            (r'\bIhrem\b', 'Deinem'),
            (r'\bIhnen\b', 'Dir'),
            (r'\bSie können\b', 'Du kannst'),
            (r'\bSie sind\b', 'Du bist'),
            (r'\bSie müssen\b', 'Du musst'),
            (r'\bIhr\b(?=\s+[A-Z])', 'Dein'),  # Before capital (noun)
        ]
        
        for pattern, suggestion in sie_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            if matches:
                for match in set(matches):
                    issues.append({
                        'type': 'sie_form',
                        'severity': 'error',
                        'message': f'Found Sie-form: "{match}"',
                        'suggestion': f'Should be: "{suggestion}"',
                        'pattern': pattern
                    })
        
        return issues
    
    def check_links(self, content: str) -> List[Dict]:
        """Check internal links point to -de.html"""
        issues = []
        
        # Find all internal HTML links
        link_pattern = r'href=["\']([^"\']*\.html[^"\']*)["\']'
        links = re.findall(link_pattern, content)
        
        for link in links:
            # Skip external links
            if link.startswith('http://') or link.startswith('https://'):
                continue
            # Skip anchors only
            if link.startswith('#'):
                continue
            # Skip mailto/tel
            if ':' in link:
                continue
            
            # Remove anchor part
            base_link = link.split('#')[0]
            
            # Check if it should be German version
            if not base_link.endswith('-de.html') and base_link.endswith('.html'):
                # Check if it's an internal link (not external)
                if not base_link.startswith('http') and not base_link.startswith('//'):
                    expected_german = base_link.replace('.html', '-de.html')
                    issues.append({
                        'type': 'english_link',
                        'severity': 'error',
                        'message': f'Links to English version: {base_link}',
                        'suggestion': f'Should be: {expected_german}',
                        'current': base_link,
                        'expected': expected_german
                    })
        
        return issues
    
    def check_lang_attribute(self, content: str) -> List[Dict]:
        """Check language attribute is 'de'"""
        issues = []
        
        if '<html lang="de">' not in content and '<html lang="de-DE">' not in content:
            issues.append({
                'type': 'lang_attr',
                'severity': 'error',
                'message': 'Missing or incorrect <html lang="de"> attribute',
                'suggestion': 'Should be: <html lang="de">'
            })
        
        return issues
    
    def check_untranslated_text(self, content: str) -> List[Dict]:
        """Check for common untranslated English patterns"""
        issues = []
        
        english_patterns = [
            (r'\bComplete Lesson\b', 'Lektion abschließen'),
            (r'\bNext Lesson\b', 'Nächste Lektion'),
            (r'\bStart Quiz\b', 'Quiz starten'),
            (r'\bSubmit Answer\b', 'Antwort einreichen'),
            (r'\bRetry Quiz\b', 'Quiz wiederholen'),
            (r'\bYou Passed\b', 'Bestanden'),
            (r'\bYou Failed\b', 'Nicht bestanden'),
        ]
        
        for pattern, suggestion in english_patterns:
            matches = re.findall(pattern, content)
            if matches:
                issues.append({
                    'type': 'untranslated',
                    'severity': 'warning',
                    'message': f'Found English text: "{matches[0]}"',
                    'suggestion': f'Should be: "{suggestion}"'
                })
        
        return issues
    
    def run_checks(self) -> Dict:
        """Run all quality checks"""
        try:
            with open(self.filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return {
                'file': str(self.filepath),
                'error': str(e),
                'issues': []
            }
        
        all_issues = []
        all_issues.extend(self.check_lang_attribute(content))
        all_issues.extend(self.check_sie_form(content))
        all_issues.extend(self.check_links(content))
        all_issues.extend(self.check_untranslated_text(content))
        
        return {
            'file': self.filepath.name,
            'total_issues': len(all_issues),
            'issues': all_issues
        }

def check_all_german_stripes():
    """Check all 20 German stripe files"""
    print("🔍 GERMAN TRANSLATION QUALITY CHECK")
    print("=" * 60)
    
    stripe_files = []
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        for i in range(1, 5):
            stripe_files.append(f'{belt}-belt-stripe{i}-gamified-de.html')
    
    total_issues = 0
    files_with_issues = 0
    
    for filename in stripe_files:
        filepath = Path(filename)
        
        if not filepath.exists():
            print(f"⚠️  {filename} - NOT FOUND")
            continue
        
        checker = GermanQualityChecker(filepath)
        result = checker.run_checks()
        
        if result.get('error'):
            print(f"❌ {filename} - ERROR: {result['error']}")
            continue
        
        if result['total_issues'] > 0:
            files_with_issues += 1
            total_issues += result['total_issues']
            
            print(f"\n📄 {filename}")
            print(f"   {result['total_issues']} issue(s):")
            
            for issue in result['issues']:
                severity_icon = {'error': '❌', 'warning': '⚠️'}.get(issue['severity'], '•')
                print(f"   {severity_icon} [{issue['type']}] {issue['message']}")
                if 'suggestion' in issue:
                    print(f"      → {issue['suggestion']}")
        else:
            print(f"✅ {filename} - No issues found")
    
    print(f"\n📊 SUMMARY")
    print(f"   Files checked: {len(stripe_files)}")
    print(f"   Files with issues: {files_with_issues}")
    print(f"   Total issues: {total_issues}")
    
    return files_with_issues == 0

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        # Check single file
        filepath = Path(sys.argv[1])
        if filepath.exists():
            checker = GermanQualityChecker(filepath)
            result = checker.run_checks()
            print(f"\n📄 {result['file']}")
            print(f"   Issues: {result['total_issues']}")
            for issue in result['issues']:
                print(f"   - {issue['message']}")
                if 'suggestion' in issue:
                    print(f"     → {issue['suggestion']}")
        else:
            print(f"❌ File not found: {filepath}")
    else:
        # Check all files
        check_all_german_stripes()

