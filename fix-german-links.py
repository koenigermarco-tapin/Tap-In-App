#!/usr/bin/env python3
"""
Fix German Translation & Linking Issues

1. Fix all broken links in -de.html files to point to -de.html versions
2. Create missing German pages
3. Add language switcher
"""

import re
import os
from pathlib import Path
from collections import defaultdict

# Translation dictionary for common terms
TRANSLATIONS = {
    'Home': 'Startseite',
    'The Gym': 'Das Gym',
    'Der Hub': 'Der Hub',
    'Learning Hub': 'Lern-Hub',
    'Dashboard': 'Dashboard',
    'Start': 'Starten',
    'Continue': 'Weiter',
    'Back': 'Zurück',
    'Next': 'Weiter',
    'Previous': 'Zurück',
    'Complete': 'Abschließen',
}

def find_german_files():
    """Find all German HTML files"""
    german_files = list(Path('.').glob('*-de.html'))
    return sorted(german_files)

def find_english_links(content):
    """Find all HTML file links that should point to German versions"""
    # Pattern to match href="something.html" (but not external URLs or already -de.html)
    link_pattern = r'href=["\']([^"\']*\.html)["\']'
    
    links = re.findall(link_pattern, content)
    
    # Filter out:
    # - External URLs (http/https)
    # - Already German files (-de.html)
    # - JavaScript files
    # - Special files (cache-buster.js, etc.)
    internal_links = []
    for link in links:
        if not link.startswith('http') and '.html' in link:
            if not link.endswith('-de.html') and not link.startswith('mailto:') and not link.startswith('#'):
                internal_links.append(link)
    
    return list(set(internal_links))  # Remove duplicates

def convert_to_german_link(link):
    """Convert English link to German link"""
    # If it's already -de.html, return as-is
    if link.endswith('-de.html'):
        return link
    
    # If it ends with .html, replace with -de.html
    if link.endswith('.html'):
        return link.replace('.html', '-de.html')
    
    return link

def fix_links_in_file(filepath):
    """Fix all links in a German file"""
    print(f"\n📝 Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    links_found = find_english_links(content)
    
    if not links_found:
        print(f"   ✅ No English links found")
        return False, 0
    
    print(f"   🔍 Found {len(links_found)} English link(s):")
    replacements = 0
    
    # Fix each link
    for link in links_found:
        german_link = convert_to_german_link(link)
        
        # Replace all occurrences
        # Pattern: href="link" or href='link'
        patterns = [
            (f'href="{re.escape(link)}"', f'href="{german_link}"'),
            (f"href='{re.escape(link)}'", f"href='{german_link}'"),
        ]
        
        for pattern, replacement in patterns:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                content = new_content
                replacements += 1
                print(f"      ✅ {link} → {german_link}")
    
    # Also fix onclick handlers
    onclick_pattern = r"onclick=[\"']window\.location\.href=['\"]([^'\"]*\.html)['\"]"
    def replace_onclick(match):
        link = match.group(1)
        if not link.endswith('-de.html') and not link.startswith('http'):
            german_link = convert_to_german_link(link)
            print(f"      ✅ onclick: {link} → {german_link}")
            return match.group(0).replace(link, german_link)
        return match.group(0)
    
    content = re.sub(onclick_pattern, replace_onclick, content)
    
    # Write back if changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"   ✅ Fixed {replacements} link(s)")
        return True, replacements
    
    return False, 0

def audit_missing_pages():
    """Audit which critical pages are missing German versions"""
    
    critical_pages = [
        # Belt hub pages
        'white-belt.html',
        'blue-belt.html',
        'purple-belt.html',
        'brown-belt.html',
        'black-belt.html',
        
        # Core navigation (check if exist)
        'gym-home-FOCUSED.html',
        'hub-home-BUSINESS.html',
        'index-DUAL-ENTRY.html',
        'learning-hub.html',
        
        # Assessments
        'belt-assessment-v2.html',
        'worker-type-assessment.html',
        'leadership-style-assessment.html',
        
        # Tools
        'tool-mood-tracker.html',
        'tool-goal-tracker.html',
        'tool-journal.html',
        'tool-morning-routine.html',
        'tool-box-breathing.html',
        'tool-decision-framework.html',
        'tool-energy-audit.html',
        'tool-weekly-review.html',
        'tool-inner-game.html',
    ]
    
    missing = []
    existing = []
    
    for page in critical_pages:
        german_version = page.replace('.html', '-de.html')
        german_path = Path(german_version)
        english_path = Path(page)
        
        if english_path.exists() and not german_path.exists():
            missing.append(page)
        elif german_path.exists():
            existing.append(page)
    
    return missing, existing

def main():
    """Main function"""
    print("=" * 60)
    print("🇩🇪 GERMAN TRANSLATION & LINKING FIX")
    print("=" * 60)
    
    # Step 1: Audit existing files
    print("\n📊 STEP 1: Auditing existing German files...")
    german_files = find_german_files()
    print(f"   Found {len(german_files)} German file(s)")
    
    # Step 2: Audit missing pages
    print("\n📋 STEP 2: Auditing missing critical pages...")
    missing, existing = audit_missing_pages()
    print(f"   ✅ Existing: {len(existing)} page(s)")
    print(f"   ❌ Missing: {len(missing)} page(s)")
    if missing:
        print("   Missing pages:")
        for page in missing[:10]:  # Show first 10
            print(f"      - {page}")
        if len(missing) > 10:
            print(f"      ... and {len(missing) - 10} more")
    
    # Step 3: Fix links
    print("\n🔧 STEP 3: Fixing broken links...")
    total_fixed = 0
    files_fixed = 0
    
    for filepath in german_files:
        fixed, count = fix_links_in_file(filepath)
        if fixed:
            files_fixed += 1
            total_fixed += count
    
    print(f"\n{'=' * 60}")
    print(f"📊 SUMMARY")
    print(f"{'=' * 60}")
    print(f"   Files processed: {len(german_files)}")
    print(f"   Files fixed: {files_fixed}")
    print(f"   Total links fixed: {total_fixed}")
    print(f"   Missing critical pages: {len(missing)}")
    
    if missing:
        print(f"\n⚠️  Next steps:")
        print(f"   1. Create missing {len(missing)} German pages")
        print(f"   2. Add language switcher to all pages")
        print(f"   3. Test complete German user flow")
    
    print(f"\n✅ Link fixing complete!")

if __name__ == '__main__':
    main()

