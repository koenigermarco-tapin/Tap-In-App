#!/usr/bin/env python3
"""
Carefully translate assessment files - ONLY user-facing text, preserve all code
"""

import re
from pathlib import Path

# ONLY translate these specific strings in user-visible contexts
TRANSLATIONS = {
    # Button text
    "Next": "Weiter",
    "Previous": "Zurück", 
    "Back": "Zurück",
    "Continue": "Fortsetzen",
    "See Results": "Ergebnisse anzeigen",
    "Show Results": "Ergebnisse anzeigen",
    "Complete": "Abschließen",
    "Submit": "Absenden",
    
    # Progress text
    "of": "von",
    
    # Results
    "Your Results": "Ihre Ergebnisse",
    "Assessment Complete!": "Assessment abgeschlossen!",
    "Viewing your results...": "Ihre Ergebnisse werden angezeigt...",
    "Please answer all questions": "Bitte beantworten Sie alle Fragen",
    "Analyzing your responses...": "Ihre Antworten werden analysiert...",
}

# URL redirects
REDIRECTS = {
    "learning-hub.html": "learning-hub-de.html",
    "gym-dashboard.html": "gym-dashboard-de.html",
    "../gym/gym-dashboard.html": "../../gym/gym-dashboard-de.html",
    "../hub/learning-hub.html": "../../hub/learning-hub-de.html",
}

def translate_file(filepath):
    """Translate ONLY user-facing text, preserve all code"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Update HTML lang
    content = re.sub(r'<html lang="en"', '<html lang="de"', content)
    
    # 2. Update title (be specific)
    content = re.sub(
        r'<title>Leadership Assessment - TAP-IN</title>',
        '<title>Führungsbewertung - TAP-IN</title>',
        content
    )
    
    # 3. Update redirect URLs (in href and window.location)
    for en_url, de_url in REDIRECTS.items():
        content = content.replace(f'href="{en_url}"', f'href="{de_url}"')
        content = content.replace(f"href='{en_url}'", f"href='{de_url}'")
        content = content.replace(f'window.location.href = "{en_url}"', f'window.location.href = "{de_url}"')
        content = content.replace(f"window.location.href = '{en_url}'", f"window.location.href = '{de_url}'")
    
    # 4. Translate button text in HTML (between > and <)
    for en, de in TRANSLATIONS.items():
        # Only in button/label text, not in code
        content = re.sub(
            f'(>)([^<]*?){re.escape(en)}([^<]*?)(<)',
            lambda m: f'{m.group(1)}{m.group(2)}{de}{m.group(3)}{m.group(4)}',
            content,
            flags=re.IGNORECASE
        )
    
    # 5. Translate in string literals (quoted text)
    for en, de in TRANSLATIONS.items():
        # In single or double quotes
        content = re.sub(
            f'(["\'])([^"\']*?){re.escape(en)}([^"\']*?)(["\'])',
            lambda m: f'{m.group(1)}{m.group(2)}{de}{m.group(3)}{m.group(4)}',
            content,
            flags=re.IGNORECASE
        )
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Translate all German assessment files"""
    
    base_dir = Path('src/pages/assessments')
    
    files = [
        'deep-dive-assessment-de.html',
        'belt-assessment-v2-de.html',
        'mental-health-assessment-de.html',
        'worker-type-assessment-de.html',
        'team-assessment-enhanced-v2-de.html',
    ]
    
    for filename in files:
        filepath = base_dir / filename
        if filepath.exists():
            if translate_file(filepath):
                print(f"✅ Translated {filename}")
            else:
                print(f"ℹ️  No changes needed for {filename}")
        else:
            print(f"⚠️  {filename} not found")
    
    print("\n✅ Translation complete!")
    print("⚠️  NOTE: Question text in questions array still needs manual translation")
    print("   All code structure is preserved - only translate the 'text' property")

if __name__ == '__main__':
    main()

