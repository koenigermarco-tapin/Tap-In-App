#!/usr/bin/env python3
"""
Fix Broken Links in learning-hub-de.html

Since many course/tool pages don't have German versions yet,
we'll either:
1. Point to existing German course pages (course-*-de.html)
2. Comment out broken links with a note
3. Point to English versions temporarily with a language notice
"""

import re
from pathlib import Path

def fix_learning_hub_links():
    """Fix broken links in learning-hub-de.html"""
    
    filepath = Path('learning-hub-de.html')
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"📝 Fixing links in: {filepath.name}")
    
    # Mapping of broken links to working alternatives
    link_mappings = {
        # Course modules - point to course overview pages that DO exist
        'communication-mastery-module-de.html': 'course-communication-mastery-de.html',  # Check if exists
        'energy-management-module-gamified-de.html': 'course-energy-management-de.html',
        'boundaries-module-gamified-de.html': 'course-boundaries-de.html',
        'deep-work-module-gamified-de.html': 'course-deep-work-de.html',
        'feedback-module-gamified-de.html': 'course-feedback-culture-de.html',
        'expectation-management-module-gamified-de.html': 'course-expectation-management-de.html',
        
        # Tools - point to English versions for now (will be created later)
        # Keep as -de.html for now, they might exist
        'hub-assessment-center-de.html': 'hub-assessment-center.html',  # Fallback
        'leadership-games-de.html': 'leadership-games.html',
        
        # Quick tools - point to English versions temporarily
        # These will be created later
    }
    
    # Check which files actually exist
    existing_courses = [
        'course-energy-management-de.html',
        'course-boundaries-de.html',
        'course-deep-work-de.html',
        'course-feedback-culture-de.html',
        'course-expectation-management-de.html',
    ]
    
    fixes_applied = 0
    
    # Fix communication-mastery-module link
    if 'communication-mastery-module-de.html' in content:
        # Check if course page exists, if not use English or comment
        if Path('course-communication-mastery-de.html').exists():
            content = content.replace('communication-mastery-module-de.html', 'course-communication-mastery-de.html')
            fixes_applied += 1
            print(f"   ✅ Fixed: communication-mastery-module → course-communication-mastery-de.html")
        else:
            # Point to English version temporarily
            content = content.replace('communication-mastery-module-de.html', 'communication-mastery-module.html')
            fixes_applied += 1
            print(f"   ⚠️  Temporarily pointing to English: communication-mastery-module.html")
    
    # Fix course module links to point to course overview pages
    for broken, fixed in link_mappings.items():
        if broken in content and Path(fixed).exists():
            content = content.replace(broken, fixed)
            fixes_applied += 1
            print(f"   ✅ Fixed: {broken} → {fixed}")
        elif broken in content:
            # File doesn't exist, check if English version exists
            english_version = broken.replace('-de.html', '.html')
            if Path(english_version).exists():
                # Add a note that this is temporarily in English
                content = content.replace(broken, english_version + '" data-note="German version coming soon')
                fixes_applied += 1
                print(f"   ⚠️  Temporarily pointing to English: {english_version}")
    
    # Write back
    if fixes_applied > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"   ✅ Applied {fixes_applied} fixes")
    else:
        print(f"   ℹ️  No fixes needed")
    
    return fixes_applied

if __name__ == '__main__':
    print("🔧 Fixing Broken Links in learning-hub-de.html")
    print("=" * 60)
    fix_learning_hub_links()
    print(f"\n✅ Done!")

