#!/usr/bin/env python3
"""
Update internal links to match IA structure
"""

import os
import re

# Link update mappings
LINK_UPDATES = {
    # Old paths → New paths
    'src/pages/games/confession-poker.html': 'src/pages/hub/exercises/confession-poker/game.html',
    'src/pages/games/confession-poker-de.html': 'src/pages/hub/exercises/confession-poker/game-de.html',
    'confession-poker.html': 'src/pages/hub/exercises/confession-poker/game.html',
    'confession-poker-de.html': 'src/pages/hub/exercises/confession-poker/game-de.html',
    
    'src/pages/assessments/leadership-style-assessment.html': 'src/pages/gym/white-belt/stripe-1-personality/assessment.html',
    'src/pages/assessments/leadership-style-assessment.de.html': 'src/pages/gym/white-belt/stripe-1-personality/assessment-de.html',
    'leadership-style-assessment.html': 'src/pages/gym/white-belt/stripe-1-personality/assessment.html',
    
    'src/pages/assessments/communication-style-assessment.html': 'src/pages/gym/white-belt/stripe-3-communication/communication-style.html',
    'src/pages/assessments/communication-style-assessment.de.html': 'src/pages/gym/white-belt/stripe-3-communication/communication-style-de.html',
    'communication-style-assessment.html': 'src/pages/gym/white-belt/stripe-3-communication/communication-style.html',
    
    'course-energy-management.html': 'src/pages/gym/blue-belt/stripe-1-energy/lesson.html',
    'course-energy-management-de.html': 'src/pages/gym/blue-belt/stripe-1-energy/lesson-de.html',
    
    'course-deep-work.html': 'src/pages/gym/blue-belt/stripe-2-focus/lesson.html',
    'course-deep-work-de.html': 'src/pages/gym/blue-belt/stripe-2-focus/lesson-de.html',
    
    'talent-finder.html': 'src/pages/hub/toolkit/talent-finder.html',
    'talent-finder-de.html': 'src/pages/hub/toolkit/talent-finder-de.html',
}

def update_links_in_file(filepath):
    """Update links in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        updates = 0
        
        # Update href links
        for old_path, new_path in LINK_UPDATES.items():
            # Pattern: href="old_path" or href='/old_path'
            patterns = [
                (rf'href=["\']({re.escape(old_path)})["\']', rf'href="\1"'),
                (rf'href=["\']({re.escape(old_path)})["\']', rf"href='\1'"),
            ]
            
            for pattern, replacement in patterns:
                matches = len(re.findall(pattern, content))
                if matches > 0:
                    content = re.sub(pattern, lambda m: m.group(0).replace(old_path, new_path), content)
                    updates += matches
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return updates
        
        return 0
    except Exception as e:
        return 0

def main():
    print("=== UPDATING LINKS TO IA STRUCTURE ===")
    print()
    
    total_updates = 0
    files_updated = 0
    
    # Process all HTML files
    for root, dirs, files in os.walk('.'):
        if any(skip in root for skip in ['.git', 'archive', 'backup', 'node_modules']):
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                updates = update_links_in_file(filepath)
                if updates > 0:
                    total_updates += updates
                    files_updated += 1
                    if files_updated % 20 == 0:
                        print(f"  Updated {files_updated} files...")
    
    print()
    print(f"Updated {total_updates} links in {files_updated} files")
    print()
    print("✅ IA structure implementation complete")

if __name__ == "__main__":
    main()

