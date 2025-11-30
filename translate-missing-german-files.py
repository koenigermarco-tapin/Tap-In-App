#!/usr/bin/env python3
"""
Translate Missing German Files - High Priority
1. Leadership Games (4 files)
2. Open Mat Tools (9 files)
3. Communication Mastery Lessons (8 files)
4. Additional Assessments (4 files)
"""

import os
from pathlib import Path
import re

def translate_file_to_german(en_file, de_file):
    """Create German version of an English file"""
    
    if not Path(en_file).exists():
        print(f"⚠️  {en_file} not found")
        return False
    
    if Path(de_file).exists():
        print(f"⚠️  {de_file} already exists, skipping")
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Basic translations
    translations = [
        # HTML lang attribute
        ('<html lang="en">', '<html lang="de">'),
        
        # Common UI elements
        ('<title>', '<title>', 'partial'),  # Will translate title separately
        
        # Common phrases
        ('Start', 'Start'),
        ('Next', 'Weiter'),
        ('Previous', 'Zurück'),
        ('Submit', 'Absenden'),
        ('Continue', 'Weiter'),
        ('Back', 'Zurück'),
        ('Save', 'Speichern'),
        ('Cancel', 'Abbrechen'),
        ('Complete', 'Abgeschlossen'),
        ('Close', 'Schließen'),
        
        # User-facing text (Du-form)
        ('You', 'Du'),
        ('Your', 'Dein'),
        ('Your ', 'Deine '),  # For plural
        ('you', 'du'),
        ('your', 'dein'),
        ('your ', 'deine '),
    ]
    
    # Update lang attribute
    content = content.replace('<html lang="en">', '<html lang="de">')
    content = content.replace("lang='en'", "lang='de'")
    content = content.replace('lang="en"', 'lang="de"')
    
    # Note: This is a basic template. Full translation would require
    # more sophisticated translation of all user-facing content
    
    # Write German file
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created {de_file} (basic structure)")
    print(f"   ⚠️  Note: Full translation of content needed")
    return True

def main():
    print("=" * 80)
    print("🇩🇪 TRANSLATING MISSING GERMAN FILES")
    print("=" * 80)
    print()
    
    # High Priority Files
    files_to_translate = [
        # Leadership Games (4 files)
        ('confession-poker.html', 'confession-poker-de.html'),
        ('conflict-cards.html', 'conflict-cards-de.html'),
        ('disagree-commit-roulette.html', 'disagree-commit-roulette-de.html'),
        ('challenge-vulnerability.html', 'challenge-vulnerability-de.html'),
        
        # Open Mat Tools (9 files)
        ('tool-morning-routine.html', 'tool-morning-routine-de.html'),
        ('tool-box-breathing.html', 'tool-box-breathing-de.html'),
        ('tool-decision-framework.html', 'tool-decision-framework-de.html'),
        ('tool-energy-audit.html', 'tool-energy-audit-de.html'),
        ('tool-weekly-review.html', 'tool-weekly-review-de.html'),
        ('tool-inner-game.html', 'tool-inner-game-de.html'),
        ('tool-goal-tracker.html', 'tool-goal-tracker-de.html'),
        ('tool-journal.html', 'tool-journal-de.html'),
        ('tool-mood-tracker.html', 'tool-mood-tracker-de.html'),
        
        # Communication Mastery Lessons (8 files - start with key ones)
        ('communication-mastery-1.html', 'communication-mastery-1-de.html'),
        ('communication-mastery-3-feedback.html', 'communication-mastery-3-feedback-de.html'),
        ('communication-mastery-module-v2.html', 'communication-mastery-module-v2-de.html'),
        
        # Additional Assessments (4 files)
        ('360-feedback-assessment.html', '360-feedback-assessment-de.html'),
        ('accountability-audit-assessment.html', 'accountability-audit-assessment-de.html'),
        ('communication-style-assessment.html', 'communication-style-assessment-de.html'),
    ]
    
    translated = 0
    skipped = 0
    
    for en_file, de_file in files_to_translate:
        print(f"📄 {en_file}...")
        if translate_file_to_german(en_file, de_file):
            translated += 1
        else:
            skipped += 1
        print()
    
    print("=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    print(f"✅ Files created: {translated}")
    print(f"⚠️  Files skipped: {skipped}")
    print(f"\n⚠️  NOTE: Created basic structure with lang='de'")
    print(f"   Full content translation still needed for each file")
    print("=" * 80)

if __name__ == '__main__':
    main()

