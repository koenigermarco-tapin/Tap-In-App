#!/usr/bin/env python3
"""
Comprehensive Translation Audit and Belt Flow Fixes
1. Check belt navigation and progress flow (EN → DE links)
2. Ensure German files are properly linked in hub pages
3. Audit all English files and identify missing German translations
4. Fix navigation links to ensure natural progress flow
"""

import os
import re
from pathlib import Path
from collections import defaultdict

def find_all_html_files():
    """Find all HTML files in the workspace"""
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip certain directories
        if any(skip in root for skip in ['.git', 'node_modules', 'archive', 'react-app']):
            continue
        for file in files:
            if file.endswith('.html') and not file.startswith('.'):
                html_files.append(os.path.join(root, file))
    return sorted(html_files)

def check_belt_hub_links():
    """Check belt hub pages for proper stripe links"""
    belt_hubs = {
        'white-belt.html': 'white-belt-de.html',
        'blue-belt.html': 'blue-belt-de.html',
        'purple-belt.html': 'purple-belt-de.html',
        'brown-belt.html': 'brown-belt-de.html',
        'black-belt.html': 'black-belt-de.html',
    }
    
    issues = []
    fixes = []
    
    for en_file, de_file in belt_hubs.items():
        if not Path(en_file).exists():
            continue
        
        with open(en_file, 'r', encoding='utf-8') as f:
            en_content = f.read()
        
        # Check if German version exists
        if Path(de_file).exists():
            with open(de_file, 'r', encoding='utf-8') as f:
                de_content = f.read()
        else:
            issues.append(f"❌ Missing: {de_file}")
            continue
        
        # Find stripe links in English file
        stripe_links = re.findall(r'href="([^"]*-stripe\d+[^"]*\.html)"', en_content)
        
        for link in stripe_links:
            # Check if corresponding German file exists
            de_link = link.replace('.html', '-de.html').replace('-carousel-NEW.html', '-gamified-de.html').replace('-gamified.html', '-gamified-de.html')
            
            # Special handling for stripe links
            if 'stripe' in link.lower():
                # Try different patterns
                patterns = [
                    link.replace('.html', '-de.html'),
                    link.replace('.html', '-gamified-de.html'),
                    link.replace('-carousel-NEW.html', '-gamified-de.html'),
                    link.replace('-gamified.html', '-gamified-de.html'),
                ]
                
                de_link_found = False
                for pattern in patterns:
                    if Path(pattern).exists():
                        de_link = pattern
                        de_link_found = True
                        break
                
                if not de_link_found:
                    # Check if any German stripe file exists for this belt/stripe
                    belt_match = re.search(r'(\w+)-belt-stripe(\d+)', link)
                    if belt_match:
                        belt, stripe = belt_match.groups()
                        # Look for German versions
                        possible_names = [
                            f"{belt}-belt-stripe{stripe}-gamified-de.html",
                            f"{belt}-belt-stripe{stripe}-de.html",
                        ]
                        if not any(Path(p).exists() for p in possible_names):
                            issues.append(f"⚠️  {de_file}: Missing German stripe file for {link}")
                    continue
            
            # Check if German hub links to German stripe file
            if de_link in de_content:
                continue  # Already linked correctly
            
            # Need to fix the link in German hub
            old_pattern = link.replace('.html', '-de.html')
            if old_pattern in de_content:
                fixes.append({
                    'file': de_file,
                    'old': old_pattern,
                    'new': de_link,
                    'issue': f'Update stripe link from {old_pattern} to {de_link}'
                })
    
    return issues, fixes

def audit_missing_translations():
    """Find all English HTML files and check for German versions"""
    html_files = find_all_html_files()
    
    # Categorize files
    english_files = []
    german_files = []
    
    for file in html_files:
        if file.endswith('-de.html') or file.endswith('.de.html'):
            german_files.append(file)
        elif 'archive' not in file and 'react-app' not in file:
            english_files.append(file)
    
    # Find missing translations
    missing = []
    has_translation = []
    
    for en_file in english_files:
        # Skip certain files
        if any(skip in en_file for skip in ['-de.html', '.de.html', 'archive', 'react-app', 'icon-generator', 'generate-icons']):
            continue
        
        # Check for German version
        base_name = Path(en_file).stem
        dir_path = Path(en_file).parent
        
        # Try different patterns
        possible_de_files = [
            dir_path / f"{base_name}-de.html",
            dir_path / f"{base_name}.de.html",
            dir_path / (base_name.replace('-', '-') + '-de.html'),
        ]
        
        # Also check root directory
        possible_de_files.extend([
            Path(f"{base_name}-de.html"),
            Path(f"{base_name}.de.html"),
        ])
        
        found = False
        for de_file in possible_de_files:
            if de_file.exists():
                has_translation.append((en_file, str(de_file)))
                found = True
                break
        
        if not found:
            # Check if it's a file that should have a translation
            # Skip utility files, archives, etc.
            if any(skip in en_file.lower() for skip in ['icon', 'generate', 'template', 'backup', 'old', 'test', 'demo']):
                continue
            
            missing.append(en_file)
    
    return english_files, german_files, missing, has_translation

def fix_belt_progress_flow():
    """Fix navigation links in stripe files to ensure natural flow"""
    fixes = []
    
    # Belt progression: White → Blue → Purple → Brown → Black
    belt_order = ['white', 'blue', 'purple', 'brown', 'black']
    
    for belt in belt_order:
        for stripe in range(1, 5):
            # Check English stripe file
            en_files = [
                f"{belt}-belt-stripe{stripe}-gamified.html",
                f"{belt}-belt-stripe{stripe}-carousel-NEW.html",
            ]
            
            for en_file in en_files:
                if not Path(en_file).exists():
                    continue
                
                with open(en_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check completion links
                # Stripe 4 should link to next belt or assessment
                if stripe == 4:
                    # Find next belt
                    belt_index = belt_order.index(belt)
                    if belt_index < len(belt_order) - 1:
                        next_belt = belt_order[belt_index + 1]
                        # Should link to next belt hub or assessment
                        next_link = f"{next_belt}-belt.html"
                        assessment_link = f"{next_belt}-belt-assessment.html"
                        
                        # Check if links are correct
                        if next_link not in content and assessment_link not in content:
                            # Might need to add navigation
                            pass
                else:
                    # Stripe 1-3 should link to next stripe
                    next_stripe = stripe + 1
                    next_link_en = f"{belt}-belt-stripe{next_stripe}-gamified.html"
                    
                    # Check German version
                    de_file = en_file.replace('.html', '-de.html')
                    if Path(de_file).exists():
                        with open(de_file, 'r', encoding='utf-8') as f:
                            de_content = f.read()
                        
                        # Check if German file links to German next stripe
                        next_link_de = f"{belt}-belt-stripe{next_stripe}-gamified-de.html"
                        if next_link_en in de_content and next_link_de not in de_content:
                            fixes.append({
                                'file': de_file,
                                'old': next_link_en,
                                'new': next_link_de,
                                'issue': f'Update next stripe link to German version'
                            })
    
    return fixes

def main():
    print("=" * 80)
    print("🔍 COMPREHENSIVE TRANSLATION AUDIT & BELT FLOW FIXES")
    print("=" * 80)
    print()
    
    # Step 1: Check belt hub links
    print("📋 Step 1: Checking Belt Hub Links...")
    hub_issues, hub_fixes = check_belt_hub_links()
    
    if hub_issues:
        print(f"\n⚠️  Hub Issues Found: {len(hub_issues)}")
        for issue in hub_issues[:10]:
            print(f"  {issue}")
    
    if hub_fixes:
        print(f"\n🔧 Hub Fixes Needed: {len(hub_fixes)}")
        for fix in hub_fixes[:10]:
            print(f"  {fix['file']}: {fix['issue']}")
    
    # Step 2: Audit missing translations
    print("\n📋 Step 2: Auditing Missing Translations...")
    en_files, de_files, missing, has_trans = audit_missing_translations()
    
    print(f"\n📊 Translation Status:")
    print(f"  English files: {len(en_files)}")
    print(f"  German files: {len(de_files)}")
    print(f"  Files with translations: {len(has_trans)}")
    print(f"  Missing translations: {len(missing)}")
    
    # Step 3: Check belt progress flow
    print("\n📋 Step 3: Checking Belt Progress Flow...")
    flow_fixes = fix_belt_progress_flow()
    
    if flow_fixes:
        print(f"\n🔧 Flow Fixes Needed: {len(flow_fixes)}")
        for fix in flow_fixes[:10]:
            print(f"  {fix['file']}: {fix['issue']}")
    
    # Generate report
    print("\n" + "=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    print(f"Hub Issues: {len(hub_issues)}")
    print(f"Hub Fixes: {len(hub_fixes)}")
    print(f"Flow Fixes: {len(flow_fixes)}")
    print(f"Missing Translations: {len(missing)}")
    
    # Save report
    with open('TRANSLATION-AUDIT-REPORT.md', 'w', encoding='utf-8') as f:
        f.write("# Translation Audit Report\n\n")
        f.write(f"## Summary\n\n")
        f.write(f"- English Files: {len(en_files)}\n")
        f.write(f"- German Files: {len(de_files)}\n")
        f.write(f"- Files with Translations: {len(has_trans)}\n")
        f.write(f"- Missing Translations: {len(missing)}\n\n")
        f.write(f"## Missing Translations ({len(missing)} files)\n\n")
        for file in sorted(missing)[:50]:
            f.write(f"- `{file}`\n")
        f.write(f"\n... and {max(0, len(missing) - 50)} more\n")
        f.write(f"\n## Hub Link Issues\n\n")
        for issue in hub_issues:
            f.write(f"- {issue}\n")
        f.write(f"\n## Recommended Fixes\n\n")
        f.write(f"1. Fix {len(hub_fixes)} hub link issues\n")
        f.write(f"2. Fix {len(flow_fixes)} progress flow issues\n")
        f.write(f"3. Translate {len(missing)} missing files\n")
    
    print("\n✅ Report saved to TRANSLATION-AUDIT-REPORT.md")
    print("=" * 80)
    
    return hub_fixes, flow_fixes, missing

if __name__ == '__main__':
    main()

