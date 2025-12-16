#!/usr/bin/env python3
"""
Task 2: Update All Internal Links
Updates href links after files have been moved to organized folders
"""

import os
import re
from pathlib import Path

# Map old locations to new paths
MOVES = {
    # Assessments
    'belt-assessment': 'src/pages/assessments/belt-assessment',
    'worker-type-assessment': 'src/pages/assessments/worker-type-assessment',
    'team-assessment': 'src/pages/assessments/team-assessment',
    'leadership-style-assessment': 'src/pages/assessments/leadership-style-assessment',
    'mental-health-assessment': 'src/pages/assessments/mental-health-assessment',
    'communication-style-assessment': 'src/pages/assessments/communication-style-assessment',
    'decision-making-assessment': 'src/pages/assessments/decision-making-assessment',
    'values-discovery-assessment': 'src/pages/assessments/values-discovery-assessment',
    'work-life-balance-assessment': 'src/pages/assessments/work-life-balance-assessment',
    'life-audit-assessment': 'src/pages/assessments/life-audit-assessment',
    '360-feedback-assessment': 'src/pages/assessments/360-feedback-assessment',
    'accountability-audit-assessment': 'src/pages/assessments/accountability-audit-assessment',
    'mission-statement-assessment': 'src/pages/assessments/mission-statement-assessment',
    'deep-dive-assessment': 'src/pages/assessments/deep-dive-assessment',
    
    # Courses
    'communication-mastery': 'src/pages/courses/communication-mastery',
    'feedback-culture': 'src/pages/courses/feedback-culture',
    'deep-work': 'src/pages/courses/deep-work',
    'energy-management': 'src/pages/courses/energy-management',
    'limiting-beliefs': 'src/pages/courses/limiting-beliefs',
    'boundaries': 'src/pages/courses/boundaries',
    'empathy': 'src/pages/courses/empathy',
    'coaching': 'src/pages/courses/coaching',
    'active-listening': 'src/pages/courses/active-listening',
    'stoic': 'src/pages/courses/stoic',
    'expectation-management': 'src/pages/courses/expectation-management',
    
    # Games
    'confession-poker': 'src/pages/games/confession-poker',
    'conflict-cards': 'src/pages/games/conflict-cards',
    'disagree-commit': 'src/pages/games/disagree-commit',
    'take-the-back': 'src/pages/games/take-the-back',
    
    # Gym
    'gym-dashboard': 'src/pages/gym/gym-dashboard',
    'gym-home': 'src/pages/gym/gym-home',
    'white-belt': 'src/pages/gym/white-belt',
    'blue-belt': 'src/pages/gym/blue-belt',
    'purple-belt': 'src/pages/gym/purple-belt',
    'brown-belt': 'src/pages/gym/brown-belt',
    'black-belt': 'src/pages/gym/black-belt',
    'stripe': 'src/pages/gym/stripe',
    'open-mat': 'src/pages/gym/open-mat',
    
    # Hub
    'hub-': 'src/pages/hub/hub-',
    'team-': 'src/pages/hub/team-',
    
    # Tools
    'tool-': 'src/pages/tools/tool-',
    
    # Legal
    'privacy': 'src/pages/legal/privacy',
    'terms': 'src/pages/legal/terms',
}

def update_links_in_file(filepath):
    """Update links in a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        modified = False
        
        # Update href links
        for old_pattern, new_path in MOVES.items():
            # Pattern: href="old-file.html" or href='old-file.html'
            patterns = [
                (rf'href="({re.escape(old_pattern)}[^"]*\.html)"', rf'href="/{new_path}\1"'),
                (rf"href='({re.escape(old_pattern)}[^']*\.html)'", rf"href='/{new_path}\1'"),
            ]
            
            for pattern, replacement in patterns:
                matches = re.findall(pattern, content)
                if matches:
                    content = re.sub(pattern, replacement, content)
                    modified = True
        
        # Also update direct file references (without quotes)
        for old_pattern, new_path in MOVES.items():
            # Pattern: >old-file.html< or =old-file.html
            patterns = [
                (rf'>({re.escape(old_pattern)}[^<]*\.html)<', rf'>/{new_path}\1<'),
                (rf'=({re.escape(old_pattern)}[^\s"\'<>]*\.html)', rf'=/{new_path}\1'),
            ]
            
            for pattern, replacement in patterns:
                if re.search(pattern, content):
                    content = re.sub(pattern, replacement, content)
                    modified = True
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    print("=== TASK 2: UPDATE INTERNAL LINKS ===")
    print()
    
    files_updated = 0
    
    # Process all HTML files
    for root, dirs, files in os.walk('.'):
        # Skip certain directories
        if any(skip in root for skip in ['.git', 'archive', 'backup', 'node_modules']):
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                if update_links_in_file(filepath):
                    files_updated += 1
                    if files_updated % 50 == 0:
                        print(f"⏳ Updated {files_updated} files...")
    
    print()
    print(f"✅ Task 2 Complete: Updated links in {files_updated} files")
    print()
    print("Verification: Check for broken links...")
    print("Run: grep -roh 'href=\"[^\"]*\.html\"' --include='*.html' | sort | uniq")

if __name__ == "__main__":
    main()

