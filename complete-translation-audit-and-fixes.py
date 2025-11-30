#!/usr/bin/env python3
"""
Complete Translation Audit and Belt Progression Fixes
1. Check belt progression links (German files)
2. Audit all English files vs German files
3. Fix progression links
4. Generate comprehensive report
"""

import os
from pathlib import Path
import re
from collections import defaultdict

def find_all_html_files():
    """Find all HTML files in the repository"""
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip certain directories
        if any(skip in root for skip in ['node_modules', '.git', '__pycache__', 'venv', '.venv']):
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(Path(root) / file)
    return html_files

def check_belt_progression_links():
    """Check and fix belt progression links in German files"""
    print("=" * 80)
    print("🔗 CHECKING BELT PROGRESSION LINKS")
    print("=" * 80)
    
    # Define expected progression paths
    progression = {
        'white-belt-stripe1-gamified-de.html': 'white-belt-stripe2-gamified-de.html',
        'white-belt-stripe2-gamified-de.html': 'white-belt-stripe3-gamified-de.html',
        'white-belt-stripe3-gamified-de.html': 'white-belt-stripe4-gamified-de.html',
        'white-belt-stripe4-gamified-de.html': 'white-belt-assessment-de.html',
        
        'blue-belt-stripe1-gamified-de.html': 'blue-belt-stripe2-gamified-de.html',
        'blue-belt-stripe2-gamified-de.html': 'blue-belt-stripe3-gamified-de.html',
        'blue-belt-stripe3-gamified-de.html': 'blue-belt-stripe4-gamified-de.html',
        'blue-belt-stripe4-gamified-de.html': 'blue-belt-assessment-de.html',
        
        'purple-belt-stripe1-gamified-de.html': 'purple-belt-stripe2-gamified-de.html',
        'purple-belt-stripe2-gamified-de.html': 'purple-belt-stripe3-gamified-de.html',
        'purple-belt-stripe3-gamified-de.html': 'purple-belt-stripe4-gamified-de.html',
        'purple-belt-stripe4-gamified-de.html': 'purple-belt-assessment-de.html',
        
        'brown-belt-stripe1-gamified-de.html': 'brown-belt-stripe2-gamified-de.html',
        'brown-belt-stripe2-gamified-de.html': 'brown-belt-stripe3-gamified-de.html',
        'brown-belt-stripe3-gamified-de.html': 'brown-belt-stripe4-gamified-de.html',
        'brown-belt-stripe4-gamified-de.html': 'brown-belt-assessment-de.html',
        
        'black-belt-stripe1-gamified-de.html': 'black-belt-stripe2-gamified-de.html',
        'black-belt-stripe2-gamified-de.html': 'black-belt-stripe3-gamified-de.html',
        'black-belt-stripe3-gamified-de.html': 'black-belt-stripe4-gamified-de.html',
        'black-belt-stripe4-gamified-de.html': 'black-belt-assessment-de.html',
    }
    
    # Belt hub pages should link to stripe1
    hub_to_stripe1 = {
        'white-belt-de.html': 'white-belt-stripe1-gamified-de.html',
        'blue-belt-de.html': 'blue-belt-stripe1-gamified-de.html',
        'purple-belt-de.html': 'purple-belt-stripe1-gamified-de.html',
        'brown-belt-de.html': 'brown-belt-stripe1-gamified-de.html',
        'black-belt-de.html': 'black-belt-stripe1-gamified-de.html',
    }
    
    issues = []
    fixes = []
    
    # Check stripe progression
    for file, expected_next in progression.items():
        filepath = Path(file)
        if not filepath.exists():
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for links to next stripe
        # Look for links in completion sections
        next_stripe_pattern = r'href="([^"]*-stripe[^"]*\.html)"'
        links = re.findall(next_stripe_pattern, content)
        
        # Check if correct next stripe is linked
        found_correct = False
        found_incorrect = []
        
        for link in links:
            if expected_next in link:
                found_correct = True
            elif '-de.html' in link and '-stripe' in link:
                # This might be incorrect
                if expected_next not in link:
                    found_incorrect.append(link)
        
        if not found_correct and filepath.exists():
            issues.append(f"{file}: Missing link to {expected_next}")
        elif found_incorrect:
            issues.append(f"{file}: Incorrect links found: {', '.join(found_incorrect)}")
    
    # Check hub pages
    for hub_file, expected_stripe1 in hub_to_stripe1.items():
        filepath = Path(hub_file)
        if not filepath.exists():
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if expected_stripe1 not in content:
            issues.append(f"{hub_file}: Should link to {expected_stripe1}")
    
    print(f"\n📊 Found {len(issues)} progression link issues")
    for issue in issues:
        print(f"  ⚠️  {issue}")
    
    return issues, fixes

def audit_translation_coverage():
    """Audit translation coverage - English vs German files"""
    print("\n" + "=" * 80)
    print("📚 TRANSLATION COVERAGE AUDIT")
    print("=" * 80)
    
    all_files = find_all_html_files()
    
    english_files = []
    german_files = []
    
    for filepath in all_files:
        filename = filepath.name
        if filename.endswith('-de.html') or filename.endswith('.de.html'):
            german_files.append(filename)
        elif not filename.endswith('-de.html') and not filename.endswith('.de.html'):
            # Skip if it's a German file with different pattern
            if 'deutsch' in filename.lower() or 'german' in filename.lower():
                continue
            english_files.append(filename)
    
    # Match English to German
    english_with_translation = []
    english_without_translation = []
    german_orphans = []
    
    for eng_file in english_files:
        # Try to find corresponding German file
        base_name = eng_file.replace('.html', '')
        
        # Common patterns
        german_patterns = [
            base_name + '-de.html',
            base_name.replace('-', '-') + '-de.html',
            eng_file.replace('.html', '.de.html'),
        ]
        
        found = False
        for pattern in german_patterns:
            if pattern in german_files:
                english_with_translation.append((eng_file, pattern))
                found = True
                break
        
        if not found:
            # Check if this is a file that doesn't need translation
            skip_patterns = ['test', 'example', 'template', 'old', 'backup', 'demo']
            if not any(skip in eng_file.lower() for skip in skip_patterns):
                english_without_translation.append(eng_file)
    
    # Find German files without English counterpart
    for ger_file in german_files:
        base_name = ger_file.replace('-de.html', '').replace('.de.html', '')
        if base_name + '.html' not in english_files:
            german_orphans.append(ger_file)
    
    print(f"\n📊 Translation Coverage:")
    print(f"  Total English files: {len(english_files)}")
    print(f"  Total German files: {len(german_files)}")
    print(f"  English with translation: {len(english_with_translation)}")
    print(f"  English without translation: {len(english_without_translation)}")
    print(f"  German orphans: {len(german_orphans)}")
    
    print(f"\n✅ Files with Translation ({len(english_with_translation)}):")
    for eng, ger in sorted(english_with_translation)[:20]:  # Show first 20
        print(f"    {eng} → {ger}")
    if len(english_with_translation) > 20:
        print(f"    ... and {len(english_with_translation) - 20} more")
    
    print(f"\n❌ English Files Without Translation ({len(english_without_translation)}):")
    for eng in sorted(english_without_translation)[:30]:  # Show first 30
        print(f"    {eng}")
    if len(english_without_translation) > 30:
        print(f"    ... and {len(english_without_translation) - 30} more")
    
    if german_orphans:
        print(f"\n⚠️  German Files Without English Counterpart ({len(german_orphans)}):")
        for ger in sorted(german_orphans)[:10]:
            print(f"    {ger}")
        if len(german_orphans) > 10:
            print(f"    ... and {len(german_orphans) - 10} more")
    
    return {
        'english_files': english_files,
        'german_files': german_files,
        'with_translation': english_with_translation,
        'without_translation': english_without_translation,
        'orphans': german_orphans,
    }

def check_backend_navigation():
    """Check if German files are linked in main navigation/index files"""
    print("\n" + "=" * 80)
    print("🔍 CHECKING BACKEND NAVIGATION")
    print("=" * 80)
    
    nav_files = [
        'index.html',
        'learning-hub.html',
        'gym-dashboard.html',
        'index-DUAL-ENTRY.html',
    ]
    
    issues = []
    
    for nav_file in nav_files:
        filepath = Path(nav_file)
        if not filepath.exists():
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for language switcher
        if 'language-switcher' not in content and 'lang-switch' not in content:
            issues.append(f"{nav_file}: Missing language switcher")
        
        # Check for links to German versions
        german_links = re.findall(r'href="[^"]*-de\.html"', content)
        if not german_links:
            # This might be okay if using a language switcher
            pass
    
    if issues:
        print(f"\n⚠️  Found {len(issues)} navigation issues:")
        for issue in issues:
            print(f"    {issue}")
    else:
        print("\n✅ Navigation looks good!")
    
    return issues

def generate_report(coverage_data, progression_issues, nav_issues):
    """Generate comprehensive report"""
    report = []
    report.append("# 🌍 COMPLETE TRANSLATION AUDIT REPORT\n")
    report.append(f"Generated: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    report.append("=" * 80 + "\n")
    
    report.append("## 📊 SUMMARY\n")
    report.append(f"- **English Files:** {len(coverage_data['english_files'])}\n")
    report.append(f"- **German Files:** {len(coverage_data['german_files'])}\n")
    report.append(f"- **With Translation:** {len(coverage_data['with_translation'])}\n")
    report.append(f"- **Missing Translation:** {len(coverage_data['without_translation'])}\n")
    report.append(f"- **Progression Issues:** {len(progression_issues)}\n")
    report.append(f"- **Navigation Issues:** {len(nav_issues)}\n\n")
    
    report.append("## ❌ PRIORITY: MISSING TRANSLATIONS\n\n")
    report.append("### Core Pages Missing German Versions:\n")
    
    priority_files = [
        f for f in coverage_data['without_translation']
        if any(keyword in f.lower() for keyword in ['index', 'dashboard', 'hub', 'assessment', 'stripe'])
        and not any(skip in f.lower() for skip in ['test', 'old', 'backup', 'example'])
    ]
    
    for file in sorted(priority_files)[:20]:
        report.append(f"- `{file}`\n")
    
    if len(priority_files) > 20:
        report.append(f"\n... and {len(priority_files) - 20} more\n")
    
    report.append("\n## 🔗 BELT PROGRESSION ISSUES\n\n")
    if progression_issues:
        for issue in progression_issues:
            report.append(f"- {issue}\n")
    else:
        report.append("✅ No progression issues found!\n")
    
    report.append("\n## 🎯 RECOMMENDATIONS\n\n")
    report.append("1. **Fix Belt Progression Links** (if any issues found)\n")
    report.append("2. **Translate Priority Core Pages** (index, dashboard, hub)\n")
    report.append("3. **Add Language Switcher** to main navigation\n")
    report.append("4. **Test German User Journey** end-to-end\n")
    
    return ''.join(report)

def main():
    print("=" * 80)
    print("🌍 COMPLETE TRANSLATION AUDIT AND FIXES")
    print("=" * 80)
    print()
    
    # Check belt progression
    progression_issues, fixes = check_belt_progression_links()
    
    # Audit translation coverage
    coverage_data = audit_translation_coverage()
    
    # Check backend navigation
    nav_issues = check_backend_navigation()
    
    # Generate report
    report = generate_report(coverage_data, progression_issues, nav_issues)
    
    with open('TRANSLATION-AUDIT-REPORT.md', 'w', encoding='utf-8') as f:
        f.write(report)
    
    print("\n" + "=" * 80)
    print("✅ AUDIT COMPLETE")
    print("=" * 80)
    print(f"\n📄 Full report saved to: TRANSLATION-AUDIT-REPORT.md")
    print(f"\n📊 Summary:")
    print(f"   Missing translations: {len(coverage_data['without_translation'])}")
    print(f"   Progression issues: {len(progression_issues)}")
    print(f"   Navigation issues: {len(nav_issues)}")

if __name__ == '__main__':
    main()

