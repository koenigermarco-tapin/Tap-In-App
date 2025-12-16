#!/usr/bin/env python3
"""
Clone working English assessments to German versions
Only translates user-facing text, preserves all code/logic
"""

import re
import shutil
from pathlib import Path

# Translation dictionary for UI elements
UI_TRANSLATIONS = {
    # Navigation & Buttons
    "Question": "Frage",
    "Next": "Weiter",
    "Previous": "Zurück",
    "Back": "Zurück",
    "Submit": "Absenden",
    "Show Results": "Ergebnisse anzeigen",
    "Complete": "Abschließen",
    "Continue": "Fortsetzen",
    "Start": "Beginnen",
    "Finish": "Beenden",
    "of": "von",
    
    # Assessment Labels
    "Assessment": "Bewertung",
    "Leadership": "Führung",
    "Communication": "Kommunikation",
    "Strategy": "Strategie",
    "Execution": "Umsetzung",
    "Team": "Team",
    "Personal": "Persönlich",
    "Worker Type": "Arbeitstyp",
    "Team Dynamics": "Team-Dynamik",
    
    # Progress
    "Progress": "Fortschritt",
    "Completed": "Abgeschlossen",
    
    # Results
    "Your Results": "Ihre Ergebnisse",
    "Results": "Ergebnisse",
    "Score": "Punktzahl",
    "Summary": "Zusammenfassung",
    "Details": "Details",
    
    # Actions
    "Save": "Speichern",
    "Cancel": "Abbrechen",
    "Close": "Schließen",
    
    # Notifications
    "Assessment completed! +100 XP": "Assessment abgeschlossen! +100 XP",
    "Please answer all questions": "Bitte beantworten Sie alle Fragen",
    "completed! +100 XP": "abgeschlossen! +100 XP",
}

# URL Redirects - update to German versions
REDIRECT_UPDATES = {
    "learning-hub.html": "learning-hub-de.html",
    "gym-dashboard.html": "gym-dashboard-de.html",
    "../gym/gym-dashboard.html": "../../gym/gym-dashboard-de.html",
    "../hub/learning-hub.html": "../../hub/learning-hub-de.html",
    "gym-dashboard.html": "gym-dashboard-de.html",
    "learning-hub.html": "learning-hub-de.html",
}

# Page titles
TITLE_TRANSLATIONS = {
    "Deep Dive Assessment": "Vollständiges Leadership-Profil",
    "Belt Assessment": "Gürtel-Bewertung",
    "Mental Health Assessment": "Mentale Gesundheit Bewertung",
    "Worker Type Assessment": "Arbeitstyp-Bewertung",
    "Team Assessment": "Team-Bewertung",
    "Leadership Style Assessment": "Führungsstil-Bewertung",
}

def translate_ui_text(content):
    """Translate user-facing UI text only"""
    
    # Translate in HTML content (between tags, not in attributes)
    for en, de in UI_TRANSLATIONS.items():
        # Pattern: >text< (content between tags)
        content = re.sub(
            f'(>)([^<]*?){re.escape(en)}([^<]*?)(<)',
            lambda m: f'{m.group(1)}{m.group(2)}{de}{m.group(3)}{m.group(4)}',
            content,
            flags=re.IGNORECASE
        )
        
        # Pattern: "text" or 'text' (in string literals)
        content = re.sub(
            f'(["\'])([^"\']*?){re.escape(en)}([^"\']*?)(["\'])',
            lambda m: f'{m.group(1)}{m.group(2)}{de}{m.group(3)}{m.group(4)}',
            content,
            flags=re.IGNORECASE
        )
    
    return content

def update_redirects(content):
    """Update redirect URLs to German versions"""
    for en_url, de_url in REDIRECT_UPDATES.items():
        # Update in href attributes
        content = content.replace(f'href="{en_url}"', f'href="{de_url}"')
        content = content.replace(f"href='{en_url}'", f"href='{de_url}'")
        
        # Update in window.location
        content = content.replace(f'window.location.href = "{en_url}"', f'window.location.href = "{de_url}"')
        content = content.replace(f"window.location.href = '{en_url}'", f"window.location.href = '{de_url}'")
        
        # Update in template literals
        content = content.replace(f'`{en_url}`', f'`{de_url}`')
    
    return content

def update_html_metadata(content):
    """Update HTML lang, title, and meta tags"""
    
    # Update lang attribute
    content = re.sub(r'<html lang="en"', '<html lang="de"', content)
    content = re.sub(r'<html lang=\'en\'', '<html lang="de"', content)
    
    # Update title
    for en_title, de_title in TITLE_TRANSLATIONS.items():
        content = re.sub(
            f'<title>{re.escape(en_title)}',
            f'<title>{de_title}',
            content,
            flags=re.IGNORECASE
        )
    
    return content

def clone_and_translate(english_file, german_file):
    """Clone English file and translate to German"""
    
    english_path = Path(english_file)
    german_path = Path(german_file)
    
    if not english_path.exists():
        print(f"⚠️  {english_file} not found, skipping")
        return False
    
    # 1. Copy file
    shutil.copy2(english_path, german_path)
    print(f"📄 Copied {english_path.name} → {german_path.name}")
    
    # 2. Read content
    with open(german_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 3. Update HTML metadata
    content = update_html_metadata(content)
    
    # 4. Update redirect URLs
    content = update_redirects(content)
    
    # 5. Translate UI text (be careful not to break code)
    content = translate_ui_text(content)
    
    # 6. Write back
    with open(german_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Translated and saved {german_path.name}")
    return True

def clone_all_assessments():
    """Clone all working assessments"""
    
    base_dir = Path('src/pages/assessments')
    
    files_to_clone = [
        ('deep-dive-assessment.html', 'deep-dive-assessment-de.html'),
        ('belt-assessment-v2.html', 'belt-assessment-v2-de.html'),
        ('mental-health-assessment.html', 'mental-health-assessment-de.html'),
        ('worker-type-assessment.html', 'worker-type-assessment-de.html'),
        ('team-assessment-enhanced-v2.html', 'team-assessment-enhanced-v2-de.html'),
    ]
    
    success_count = 0
    
    for en_file, de_file in files_to_clone:
        en_path = base_dir / en_file
        de_path = base_dir / de_file
        
        if clone_and_translate(en_path, de_path):
            success_count += 1
        print()
    
    print(f"✅ Successfully cloned and translated {success_count}/{len(files_to_clone)} assessment files")
    print("\n⚠️  NOTE: Question text in the questions array still needs manual translation")
    print("   The structure and code are preserved - only translate the 'text' property of each question")

if __name__ == '__main__':
    clone_all_assessments()

