#!/usr/bin/env python3
"""
Implement TAP-IN Information Architecture Structure
Following the IA document exactly
"""

import os
import shutil
import re

# Define the target structure from IA document
TARGET_STRUCTURE = {
    'gym': {
        'dashboard': 'src/pages/gym/dashboard.html',
        'my-journey': 'src/pages/gym/my-journey.html',
        'my-profile': 'src/pages/gym/my-profile.html',
        'training-room': 'src/pages/gym/training-room.html',
        'white-belt': {
            'overview': 'src/pages/gym/white-belt/overview.html',
            'stripe-1-personality': {
                'lesson': 'src/pages/gym/white-belt/stripe-1-personality/lesson.html',
                'assessment': 'src/pages/gym/white-belt/stripe-1-personality/assessment.html',
                'results': 'src/pages/gym/white-belt/stripe-1-personality/results.html'
            },
            'stripe-2-values': {
                'lesson': 'src/pages/gym/white-belt/stripe-2-values/lesson.html',
                'values-discovery': 'src/pages/gym/white-belt/stripe-2-values/values-discovery.html',
                'results': 'src/pages/gym/white-belt/stripe-2-values/results.html'
            },
            'stripe-3-communication': {
                'lesson': 'src/pages/gym/white-belt/stripe-3-communication/lesson.html',
                'communication-style': 'src/pages/gym/white-belt/stripe-3-communication/communication-style.html',
                'results': 'src/pages/gym/white-belt/stripe-3-communication/results.html'
            },
            'stripe-4-stress': {
                'lesson': 'src/pages/gym/white-belt/stripe-4-stress/lesson.html',
                'stress-response': 'src/pages/gym/white-belt/stripe-4-stress/stress-response.html',
                'results': 'src/pages/gym/white-belt/stripe-4-stress/results.html'
            }
        },
        'blue-belt': {
            'overview': 'src/pages/gym/blue-belt/overview.html',
            'stripe-1-energy': {
                'lesson': 'src/pages/gym/blue-belt/stripe-1-energy/lesson.html',
                'energy-audit': 'src/pages/gym/blue-belt/stripe-1-energy/energy-audit.html',
                'results': 'src/pages/gym/blue-belt/stripe-1-energy/results.html'
            },
            'stripe-2-focus': {
                'lesson': 'src/pages/gym/blue-belt/stripe-2-focus/lesson.html',
                'focus-assessment': 'src/pages/gym/blue-belt/stripe-2-focus/focus-assessment.html',
                'results': 'src/pages/gym/blue-belt/stripe-2-focus/results.html'
            }
        }
    },
    'hub': {
        'dashboard': 'src/pages/hub/dashboard.html',
        'team-setup': 'src/pages/hub/team-setup.html',
        'team-dashboard': 'src/pages/hub/team-dashboard.html',
        'team-insights': 'src/pages/hub/team-insights.html',
        'diagnostics': {
            'index': 'src/pages/hub/diagnostics/index.html',
            'team-health': 'src/pages/hub/diagnostics/team-health.html',
            'trust-barometer': 'src/pages/hub/diagnostics/trust-barometer.html',
            'conflict-styles': 'src/pages/hub/diagnostics/conflict-styles.html',
            'communication-audit': 'src/pages/hub/diagnostics/communication-audit.html'
        },
        'exercises': {
            'index': 'src/pages/hub/exercises/index.html',
            'shark-tank': {
                'facilitator-guide': 'src/pages/hub/exercises/shark-tank/facilitator-guide.html',
                'game': 'src/pages/hub/exercises/shark-tank/game.html',
                'debrief': 'src/pages/hub/exercises/shark-tank/debrief.html'
            },
            'confession-poker': {
                'facilitator-guide': 'src/pages/hub/exercises/confession-poker/facilitator-guide.html',
                'game': 'src/pages/hub/exercises/confession-poker/game.html',
                'debrief': 'src/pages/hub/exercises/confession-poker/debrief.html'
            }
        },
        'toolkit': {
            'index': 'src/pages/hub/toolkit/index.html',
            'one-on-one-templates': 'src/pages/hub/toolkit/one-on-one-templates.html',
            'feedback-generator': 'src/pages/hub/toolkit/feedback-generator.html',
            'talent-finder': 'src/pages/hub/toolkit/talent-finder.html'
        }
    },
    'onboarding': {
        'welcome': 'src/pages/onboarding/welcome.html',
        'quick-assessment': 'src/pages/onboarding/quick-assessment.html',
        'path-selection': 'src/pages/onboarding/path-selection.html'
    },
    'legal': {
        'privacy': 'src/pages/legal/privacy.html',
        'terms': 'src/pages/legal/terms.html',
        'imprint': 'src/pages/legal/imprint.html'
    }
}

# Migration mapping from IA document
MIGRATION_MAP = {
    # Hub exercises
    'shark-tank.html': 'src/pages/hub/exercises/shark-tank/game.html',
    'confession-poker.html': 'src/pages/hub/exercises/confession-poker/game.html',
    
    # Gym assessments (White Belt)
    'leadership-style-assessment.html': 'src/pages/gym/white-belt/stripe-1-personality/assessment.html',
    'communication-style-assessment.html': 'src/pages/gym/white-belt/stripe-3-communication/communication-style.html',
    
    # Gym lessons (Blue Belt)
    'course-energy-management.html': 'src/pages/gym/blue-belt/stripe-1-energy/lesson.html',
    'course-deep-work.html': 'src/pages/gym/blue-belt/stripe-2-focus/lesson.html',
    
    # Hub diagnostics
    'team-health-assessment.html': 'src/pages/hub/diagnostics/team-health.html',
    
    # Hub toolkit
    'talent-finder.html': 'src/pages/hub/toolkit/talent-finder.html',
    'talent-finder-de.html': 'src/pages/hub/toolkit/talent-finder-de.html',
}

def create_directory_structure():
    """Create all required directories from IA structure"""
    directories = set()
    
    def extract_dirs(structure, base=''):
        for key, value in structure.items():
            if isinstance(value, dict):
                dir_path = os.path.join(base, key) if base else key
                directories.add(dir_path)
                extract_dirs(value, dir_path)
            else:
                # It's a file path, extract directory
                dir_path = os.path.dirname(value)
                if dir_path:
                    directories.add(dir_path)
    
    extract_dirs(TARGET_STRUCTURE)
    
    print("Creating directory structure...")
    for directory in sorted(directories):
        full_path = os.path.join('.', directory)
        os.makedirs(full_path, exist_ok=True)
        print(f"  ✓ {directory}")
    
    return directories

def find_files_to_migrate():
    """Find files that need to be migrated according to IA"""
    files_found = {}
    
    for pattern, target in MIGRATION_MAP.items():
        # Search for files matching pattern
        for root, dirs, files in os.walk('.'):
            if 'archive' in root or 'node_modules' in root or '.git' in root:
                continue
            
            for file in files:
                if file == pattern or pattern.replace('.html', '') in file.lower():
                    source = os.path.join(root, file)
                    if source not in files_found:
                        files_found[source] = target
    
    return files_found

def main():
    print("=== IMPLEMENTING TAP-IN INFORMATION ARCHITECTURE ===")
    print()
    
    # Step 1: Create directory structure
    print("STEP 1: Creating directory structure...")
    directories = create_directory_structure()
    print(f"Created {len(directories)} directories")
    print()
    
    # Step 2: Find files to migrate
    print("STEP 2: Finding files to migrate...")
    files_to_migrate = find_files_to_migrate()
    print(f"Found {len(files_to_migrate)} files to migrate")
    for source, target in files_to_migrate.items():
        print(f"  {source} → {target}")
    print()
    
    print("⛔ GATE: Directory structure created")
    print("Next: Migrate files and update links")
    print("Waiting for approval before proceeding...")

if __name__ == "__main__":
    main()

