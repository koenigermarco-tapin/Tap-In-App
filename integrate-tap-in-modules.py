#!/usr/bin/env python3
"""
Integrate TAP-IN Platform Components
Adds new JavaScript modules to all HTML pages
"""

import re
from pathlib import Path
from typing import List, Set

# Core modules to add
CORE_MODULES = [
    'js/language-switcher.js',
    'js/meta-tags-manager.js',
    'js/achievement-badges.js',
    'js/structured-data.js'
]

def add_scripts_to_file(filepath: Path) -> bool:
    """Add core module scripts to a single HTML file"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"   ⚠️  Error reading {filepath.name}: {e}")
        return False
    
    # Check if scripts are already added
    if 'language-switcher.js' in content:
        return False  # Already has scripts
    
    # Find the closing </body> tag
    body_close_pattern = r'(\s*</body>)'
    match = re.search(body_close_pattern, content, re.IGNORECASE)
    
    if not match:
        # Try to find </html> if no </body>
        html_close_pattern = r'(\s*</html>)'
        match = re.search(html_close_pattern, content, re.IGNORECASE)
        if not match:
            print(f"   ⚠️  Could not find </body> or </html> in {filepath.name}")
            return False
    
    # Create script tags
    script_tags = '\n'.join([
        f'    <script src="{module}"></script>'
        for module in CORE_MODULES
    ])
    
    # Insert before closing tag
    insertion_point = match.start(1)
    new_content = (
        content[:insertion_point] +
        '\n    <!-- TAP-IN Core Modules -->\n' +
        script_tags + '\n' +
        content[insertion_point:]
    )
    
    # Write back
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    except Exception as e:
        print(f"   ⚠️  Error writing {filepath.name}: {e}")
        return False

def verify_lang_attribute(filepath: Path) -> tuple[bool, str]:
    """Check if file has correct lang attribute"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False, "error"
    
    # Check if it's a German file
    is_german = '-de.html' in filepath.name or filepath.name.endswith('.de.html')
    
    # Look for html tag with lang attribute
    html_tag_match = re.search(r'<html[^>]*lang=["\']([^"\']*)["\']', content, re.IGNORECASE)
    
    if html_tag_match:
        current_lang = html_tag_match.group(1).lower()
        expected = 'de' if is_german else 'en'
        
        if current_lang == expected or current_lang.startswith(expected):
            return True, current_lang
        else:
            return False, current_lang
    else:
        # No lang attribute found
        return False, "missing"

def add_achievement_events(filepath: Path) -> bool:
    """Add achievement event triggers to stripe completion handlers"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    # Check if this is a stripe file
    if 'stripe' not in filepath.name.lower() or 'gamified' not in filepath.name.lower():
        return False
    
    # Check if already has achievement event
    if "window.dispatchEvent(new CustomEvent('lessonCompleted'))" in content:
        return False
    
    # Find completion handler patterns
    patterns = [
        (r'(localStorage\.setItem\([^)]*Complete[^)]*\);)', r'\1\n                    window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));'),
        (r'(completeQuiz\([^)]*\))', r'\1\n                    window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));'),
    ]
    
    modified = False
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            new_content = re.sub(pattern, replacement, content, count=1)
            if new_content != content:
                content = new_content
                modified = True
    
    if modified:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except:
            return False
    
    return False

def main():
    """Main integration function"""
    
    print("🔧 INTEGRATING TAP-IN PLATFORM COMPONENTS")
    print("=" * 60)
    
    # Find all HTML files
    html_files = list(Path('.').glob('*.html'))
    html_files.extend(Path('.').glob('*-de.html'))
    
    # Sort for consistent processing
    html_files = sorted(html_files)
    
    print(f"\n📄 Found {len(html_files)} HTML files")
    
    # Phase 1: Add scripts
    print("\n📝 Phase 1: Adding core module scripts...")
    scripts_added = 0
    skipped = 0
    
    for filepath in html_files:
        if add_scripts_to_file(filepath):
            scripts_added += 1
            print(f"   ✅ {filepath.name}")
        else:
            skipped += 1
    
    print(f"\n   ✅ Scripts added to {scripts_added} files")
    print(f"   ⏭️  Skipped {skipped} files (already have scripts)")
    
    # Phase 2: Verify lang attributes
    print("\n📝 Phase 2: Verifying lang attributes...")
    lang_issues = []
    
    for filepath in html_files:
        is_correct, current = verify_lang_attribute(filepath)
        if not is_correct:
            is_german = '-de.html' in filepath.name
            expected = 'de' if is_german else 'en'
            lang_issues.append((filepath.name, expected, current))
    
    if lang_issues:
        print(f"   ⚠️  Found {len(lang_issues)} files with lang attribute issues:")
        for filename, expected, current in lang_issues[:10]:  # Show first 10
            print(f"      - {filename}: expected '{expected}', found '{current}'")
        if len(lang_issues) > 10:
            print(f"      ... and {len(lang_issues) - 10} more")
    else:
        print("   ✅ All files have correct lang attributes")
    
    # Phase 3: Add achievement events (stripe files only)
    print("\n📝 Phase 3: Adding achievement event triggers...")
    achievement_events_added = 0
    
    stripe_files = [f for f in html_files if 'stripe' in f.name.lower() and 'gamified' in f.name.lower()]
    
    for filepath in stripe_files:
        if add_achievement_events(filepath):
            achievement_events_added += 1
            print(f"   ✅ {filepath.name}")
    
    print(f"\n   ✅ Achievement events added to {achievement_events_added} stripe files")
    
    # Summary
    print(f"\n📊 INTEGRATION SUMMARY")
    print(f"   Scripts added: {scripts_added} files")
    print(f"   Lang issues: {len(lang_issues)} files")
    print(f"   Achievement events: {achievement_events_added} files")
    
    print(f"\n⚠️  MANUAL TASKS REMAINING:")
    print(f"   1. Add achievements page links to gym-dashboard.html and gym-dashboard.de.html")
    print(f"   2. Review lang attribute issues ({len(lang_issues)} files)")
    print(f"   3. Test language switcher functionality")
    print(f"   4. Verify achievement notifications work")

if __name__ == '__main__':
    main()

