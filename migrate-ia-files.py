#!/usr/bin/env python3
"""
Migrate files according to Information Architecture
Following the IA document exactly
"""

import os
import shutil
import re

# Migration map from IA document (exact mappings)
MIGRATIONS = [
    # Hub exercises
    {
        'source': 'src/pages/games/confession-poker.html',
        'target': 'src/pages/hub/exercises/confession-poker/game.html',
        'type': 'move'
    },
    {
        'source': 'src/pages/games/confession-poker-de.html',
        'target': 'src/pages/hub/exercises/confession-poker/game-de.html',
        'type': 'move'
    },
    {
        'source': 'src/pages/games/confession-poker-v2.html',
        'target': 'src/pages/hub/exercises/confession-poker/game.html',  # Use v2 as main
        'type': 'move',
        'backup_existing': True
    },
    {
        'source': 'src/pages/games/confession-poker-v2-de.html',
        'target': 'src/pages/hub/exercises/confession-poker/game-de.html',
        'type': 'move',
        'backup_existing': True
    },
    
    # Gym assessments (White Belt)
    {
        'source': 'src/pages/assessments/leadership-style-assessment.html',
        'target': 'src/pages/gym/white-belt/stripe-1-personality/assessment.html',
        'type': 'move'
    },
    {
        'source': 'src/pages/assessments/leadership-style-assessment.de.html',
        'target': 'src/pages/gym/white-belt/stripe-1-personality/assessment-de.html',
        'type': 'move'
    },
    {
        'source': 'src/pages/assessments/communication-style-assessment.html',
        'target': 'src/pages/gym/white-belt/stripe-3-communication/communication-style.html',
        'type': 'move'
    },
    {
        'source': 'src/pages/assessments/communication-style-assessment.de.html',
        'target': 'src/pages/gym/white-belt/stripe-3-communication/communication-style-de.html',
        'type': 'move'
    },
    
    # Gym lessons (Blue Belt)
    {
        'source': 'course-energy-management.html',
        'target': 'src/pages/gym/blue-belt/stripe-1-energy/lesson.html',
        'type': 'move'
    },
    {
        'source': 'course-energy-management-de.html',
        'target': 'src/pages/gym/blue-belt/stripe-1-energy/lesson-de.html',
        'type': 'move'
    },
    {
        'source': 'course-deep-work.html',
        'target': 'src/pages/gym/blue-belt/stripe-2-focus/lesson.html',
        'type': 'move'
    },
    {
        'source': 'course-deep-work-de.html',
        'target': 'src/pages/gym/blue-belt/stripe-2-focus/lesson-de.html',
        'type': 'move'
    },
    
    # Hub toolkit
    {
        'source': 'talent-finder.html',
        'target': 'src/pages/hub/toolkit/talent-finder.html',
        'type': 'move'
    },
    {
        'source': 'talent-finder-de.html',
        'target': 'src/pages/hub/toolkit/talent-finder-de.html',
        'type': 'move'
    },
]

def migrate_files():
    """Migrate files according to IA structure"""
    migrated = []
    errors = []
    
    for migration in MIGRATIONS:
        source = migration['source']
        target = migration['target']
        
        if not os.path.exists(source):
            continue
        
        # Create target directory
        target_dir = os.path.dirname(target)
        os.makedirs(target_dir, exist_ok=True)
        
        # Handle backup if target exists
        if migration.get('backup_existing') and os.path.exists(target):
            backup = target + '.backup-ia-migration'
            shutil.move(target, backup)
            print(f"  Backed up existing: {target} → {backup}")
        
        # Move file
        try:
            shutil.move(source, target)
            migrated.append((source, target))
            print(f"  ✓ {source} → {target}")
        except Exception as e:
            errors.append((source, target, str(e)))
            print(f"  ✗ Error moving {source}: {e}")
    
    return migrated, errors

def main():
    print("=== MIGRATING FILES TO IA STRUCTURE ===")
    print()
    
    migrated, errors = migrate_files()
    
    print()
    print(f"Migrated: {len(migrated)} files")
    if errors:
        print(f"Errors: {len(errors)} files")
        for source, target, error in errors:
            print(f"  {source}: {error}")
    
    print()
    print("⛔ GATE: Files migrated")
    print("Next: Update internal links")
    print("Waiting for approval before proceeding...")

if __name__ == "__main__":
    main()

