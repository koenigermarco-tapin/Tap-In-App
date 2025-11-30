#!/usr/bin/env python3
"""
Comprehensive German Translation Script for All 20 Stripe Files
Based on established quality patterns from White Belt Stripe 1 template
"""

import re
from pathlib import Path
import html

# ============================================================================
# COMPREHENSIVE TRANSLATION DICTIONARY
# ============================================================================

# UI Elements & Navigation
UI_TRANSLATIONS = {
    # Navigation
    'Back to White Belt Hub': 'Zurück zur Weißer-Gürtel-Übersicht',
    'Back to Blue Belt Hub': 'Zurück zur Blauer-Gürtel-Übersicht',
    'Back to Purple Belt Hub': 'Zurück zur Violetter-Gürtel-Übersicht',
    'Back to Brown Belt Hub': 'Zurück zur Brauner-Gürtel-Übersicht',
    'Back to Black Belt Hub': 'Zurück zur Schwarzer-Gürtel-Übersicht',
    'Continue': 'Weiter',
    'Next': 'Weiter',
    'Previous': 'Zurück',
    'Start': 'Start',
    
    # Lesson terminology
    'Lesson': 'Lektion',
    'Lesson 1': 'Lektion 1',
    'Lesson 2': 'Lektion 2',
    'Lesson 3': 'Lektion 3',
    'Lesson 4': 'Lektion 4',
    'Mark Complete': 'Als abgeschlossen markieren',
    'Complete Lesson': 'Lektion abschließen',
    'Next Lesson': 'Nächste Lektion',
    
    # Progress
    'Your Progress': 'Dein Fortschritt',
    'Progress': 'Fortschritt',
    'of': 'von',
    'lessons completed': 'Lektionen abgeschlossen',
    'lesson completed': 'Lektion abgeschlossen',
    
    # Stats
    'XP Earned': 'XP verdient',
    'Completed': 'Abgeschlossen',
    'Stripe': 'Streifen',
    'Total XP': 'Gesamt-XP',
    
    # Quiz
    'Test Your Knowledge': 'Teste dein Wissen',
    'Question': 'Frage',
    'of 10': 'von 10',
    'Quiz Complete!': 'Quiz abgeschlossen!',
    'You scored:': 'Deine Punktzahl:',
    'XP awarded!': 'XP verdient!',
    'Correct!': 'Richtig!',
    'Not quite.': 'Nicht ganz.',
    'Retry Quiz': 'Quiz wiederholen',
    'Review Lessons': 'Lektionen nochmal ansehen',
    
    # Sections
    'What You\'ll Learn': 'Was du lernst',
    'Core Concept': 'Kernkonzept',
    'Why This Matters': 'Warum das wichtig ist',
    'Key Takeaways': 'Wichtigste Erkenntnisse',
    'Practice Exercise': 'Praxisübung',
    'Research Evidence': 'Forschungsbeleg',
    
    # Summary
    'Stripe 1 Summary': 'Streifen 1 Zusammenfassung',
    'Stripe 2 Summary': 'Streifen 2 Zusammenfassung',
    'Stripe 3 Summary': 'Streifen 3 Zusammenfassung',
    'Stripe 4 Summary': 'Streifen 4 Zusammenfassung',
    'Lessons Completed': 'Lektionen abgeschlossen',
    'Progress': 'Fortschritt',
    'Stripe Earned': 'Streifen verdient',
}

# Technical Terms (Keep in English)
TECHNICAL_TERMS_TO_KEEP = [
    'XP', 'White Belt', 'Blue Belt', 'Purple Belt', 'Brown Belt', 'Black Belt',
    'Project Aristotle', 'Lencioni', 'Edmondson', 'Harvard', 'Google',
    'STRIPE 1', 'STRIPE 2', 'STRIPE 3', 'STRIPE 4',
]

# Common Phrases
PHRASE_TRANSLATIONS = {
    # Lesson content patterns
    'Most people confuse': 'Die meisten Menschen verwechseln',
    'According to': 'Laut',
    'research': 'Forschung',
    'found that': 'ergab, dass',
    'This week:': 'Diese Woche:',
    'In your next': 'In deinem nächsten',
    'team meeting': 'Team-Meeting',
    'admit something': 'gib etwas zu',
    'Document what happened': 'Dokumentiere, was passiert ist',
    'leadership journal': 'Leadership-Journal',
    
    # Research boxes
    'study of': 'Studie mit',
    'teams found': 'Teams ergab',
    'correlated with': 'korrelierte mit',
    'higher productivity': 'höhere Produktivität',
    'lower turnover': 'niedrigere Fluktuation',
    'more engagement': 'mehr Engagement',
    
    # Quiz patterns
    'According to the': 'Laut dem',
    'what percentage': 'wie viel Prozent',
    'What type of': 'Welche Art von',
    'focuses on': 'fokussiert auf',
    'allows team members': 'ermöglicht Teammitgliedern',
    'admit mistakes': 'Fehler zugeben',
    'ask for help': 'um Hilfe bitten',
}

# Belt-specific content translations
BELT_TRANSLATIONS = {
    'white': {
        'Trust Foundations': 'Vertrauens-Grundlagen',
        'vulnerability-based trust': 'verletzlichkeitsbasiertes Vertrauen',
        'predictability-based trust': 'vorhersagbarkeitsbasiertes Vertrauen',
        'psychological safety': 'psychologische Sicherheit',
    },
    'blue': {
        # Add Blue Belt specific terms
    },
    'purple': {
        # Add Purple Belt specific terms
    },
    'brown': {
        # Add Brown Belt specific terms
    },
    'black': {
        # Add Black Belt specific terms
    },
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def preserve_technical_terms(text):
    """Preserve technical terms that should stay in English"""
    for term in TECHNICAL_TERMS_TO_KEEP:
        # Replace with placeholder, then restore later
        placeholder = f'__PRESERVE_{term.replace(" ", "_")}__'
        text = text.replace(term, placeholder)
    return text

def restore_technical_terms(text):
    """Restore preserved technical terms"""
    for term in TECHNICAL_TERMS_TO_KEEP:
        placeholder = f'__PRESERVE_{term.replace(" ", "_")}__'
        text = text.replace(placeholder, term)
    return text

def translate_pronouns(text):
    """Convert English pronouns to German Du-form"""
    replacements = [
        (r'\bYour\b', 'Dein'),
        (r'\bYour\s+', 'Dein '),
        (r'\byour\s+', 'dein '),
        (r'\bYou\b', 'Du'),
        (r'\byou\b', 'du'),
        (r'\bYou\'re\b', 'Du bist'),
        (r'\byou\'re\b', 'du bist'),
        (r'\bYou\'ve\b', 'Du hast'),
        (r'\byou\'ve\b', 'du hast'),
        (r'\bYou\'ll\b', 'Du wirst'),
        (r'\byou\'ll\b', 'du wirst'),
        (r'\bYou\'d\b', 'Du würdest'),
        (r'\byou\'d\b', 'du würdest'),
        (r'\bYour team\b', 'Dein Team'),
        (r'\byour team\b', 'dein Team'),
        (r'\bYour results\b', 'Deine Ergebnisse'),
        (r'\byour results\b', 'deine Ergebnisse'),
        (r'\bYour score\b', 'Deine Punktzahl'),
        (r'\byour score\b', 'deine Punktzahl'),
    ]
    
    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text)
    
    return text

def fix_internal_links(content, belt_name):
    """Update all internal links to point to German versions"""
    link_replacements = {
        'white-belt.html': 'white-belt-de.html',
        'blue-belt.html': 'blue-belt-de.html',
        'purple-belt.html': 'purple-belt-de.html',
        'brown-belt.html': 'brown-belt-de.html',
        'black-belt.html': 'black-belt-de.html',
        'gym-dashboard.html': 'gym-dashboard-de.html',
        'learning-hub.html': 'learning-hub-de.html',
    }
    
    # Add stripe links
    belt_prefix = belt_name.lower().replace('-belt', '')
    for i in range(1, 5):
        old_link = f'{belt_prefix}-belt-stripe{i}-gamified.html'
        new_link = f'{belt_prefix}-belt-stripe{i}-gamified-de.html'
        link_replacements[old_link] = new_link
    
    # Replace links
    for old, new in link_replacements.items():
        if not old.endswith('-de.html'):
            content = content.replace(f'href="{old}"', f'href="{new}"')
            content = content.replace(f"href='{old}'", f"href='{new}'")
            content = content.replace(f'window.location.href = "{old}"', f'window.location.href = "{new}"')
            content = content.replace(f"window.location.href = '{old}'", f"window.location.href = '{new}'")
    
    return content

def translate_quiz_questions(content):
    """Translate quiz questions while preserving structure"""
    # This will be enhanced with specific question translations
    # For now, basic pattern matching
    patterns = [
        (r'Question (\d+) of 10', r'Frage \1 von 10'),
        (r'Complete this quiz to validate your understanding', 'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen'),
    ]
    
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content)
    
    return content

def translate_lesson_content(content):
    """Translate lesson content sections"""
    # Translate section headers
    content = content.replace("What You'll Learn", "Was du lernst")
    content = content.replace("Core Concept", "Kernkonzept")
    content = content.replace("Why This Matters", "Warum das wichtig ist")
    content = content.replace("Key Takeaways", "Wichtigste Erkenntnisse")
    content = content.replace("Practice Exercise", "Praxisübung")
    
    return content

# ============================================================================
# MAIN TRANSLATION FUNCTION
# ============================================================================

def translate_stripe_file(input_file, output_file, belt_name):
    """Comprehensive translation of a stripe file"""
    
    print(f"\n📝 Translating {input_file.name}...")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_length = len(content)
    
    # Step 1: Change language attribute
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    # Step 2: Translate title
    title_pattern = r'<title>(.*?)</title>'
    def translate_title(match):
        title = match.group(1)
        # Translate common title patterns
        title = title.replace('Stripe 1:', 'Streifen 1:')
        title = title.replace('Stripe 2:', 'Streifen 2:')
        title = title.replace('Stripe 3:', 'Streifen 3:')
        title = title.replace('Stripe 4:', 'Streifen 4:')
        title = title.replace('Trust Foundations', 'Vertrauens-Grundlagen')
        return title
    
    content = re.sub(title_pattern, translate_title, content)
    
    # Step 3: Apply UI translations (most common first)
    for eng, ger in sorted(UI_TRANSLATIONS.items(), key=lambda x: -len(x[0])):
        if eng in content:
            content = content.replace(eng, ger)
    
    # Step 4: Translate common phrases
    for eng, ger in PHRASE_TRANSLATIONS.items():
        content = content.replace(eng, ger)
    
    # Step 5: Fix internal links
    content = fix_internal_links(content, belt_name)
    
    # Step 6: Translate lesson content patterns
    content = translate_lesson_content(content)
    
    # Step 7: Translate quiz patterns
    content = translate_quiz_questions(content)
    
    # Step 8: Translate pronouns (Du-form)
    # Be careful not to break HTML/JS, so only translate in text content
    # Split into HTML tags and content
    def translate_text_content(match):
        text = match.group(1)
        # Only translate if it's actual content text
        if not text.strip().startswith('<'):
            text = translate_pronouns(text)
        return text
    
    # Step 9: Translate JavaScript strings
    js_string_patterns = [
        (r'"Quiz Complete! Continue', '"Quiz abgeschlossen! Weiter'),
        (r'"You scored"', '"Deine Punktzahl"'),
        (r'"XP awarded"', '"XP verdient"'),
        (r"'Quiz Complete!'", "'Quiz abgeschlossen!'"),
        (r"'lessons completed'", "'Lektionen abgeschlossen'"),
    ]
    
    for pattern, replacement in js_string_patterns:
        content = re.sub(pattern, replacement, content)
    
    # Step 10: Translate progress text in JavaScript
    progress_patterns = [
        (r'of \${TOTAL_LESSONS} lessons completed', 'von ${TOTAL_LESSONS} Lektionen abgeschlossen'),
        (r'lessons completed', 'Lektionen abgeschlossen'),
    ]
    
    for pattern, replacement in progress_patterns:
        content = re.sub(pattern, replacement, content)
    
    # Step 11: Fix belt-specific translations
    belt_prefix = belt_name.lower().replace('-belt', '')
    if belt_prefix in BELT_TRANSLATIONS:
        for eng, ger in BELT_TRANSLATIONS[belt_prefix].items():
            content = content.replace(eng, ger)
    
    # Step 12: Fix common mistakes
    fixes = [
        ('Dur Fortschritt', 'Dein Fortschritt'),  # Fix typo
        ('Abgeschlossend', 'Abgeschlossen'),  # Fix typo
        ('Du\'ll', 'Du wirst'),  # Fix contraction
        ('Schließe dieses Quiz ab, um dein Verständnis zu überprüfen of this stripe\'s content', 
         'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen'),
    ]
    
    for old, new in fixes:
        content = content.replace(old, new)
    
    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_length = len(content)
    print(f"   ✅ Created {output_file.name} ({new_length:,} chars)")
    
    return True

# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """Translate all 20 stripe files"""
    print("🇩🇪 COMPREHENSIVE GERMAN STRIPE TRANSLATION")
    print("=" * 60)
    
    # All stripe files to translate
    stripe_files = []
    
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        for i in range(1, 5):
            stripe_files.append({
                'input': f'{belt}-belt-stripe{i}-gamified.html',
                'output': f'{belt}-belt-stripe{i}-gamified-de.html',
                'belt': f'{belt}-belt'
            })
    
    translated = 0
    skipped = 0
    
    for file_info in stripe_files:
        input_path = Path(file_info['input'])
        output_path = Path(file_info['output'])
        
        if not input_path.exists():
            print(f"⚠️  {input_path.name} not found, skipping...")
            skipped += 1
            continue
        
        if translate_stripe_file(input_path, output_path, file_info['belt']):
            translated += 1
    
    print(f"\n✅ Translation complete!")
    print(f"   Translated: {translated}/{len(stripe_files)} files")
    print(f"   Skipped: {skipped} files")
    print(f"\n⚠️  NOTE: This is automated translation. Manual review recommended for:")
    print(f"   - Complex lesson content (may need refinement)")
    print(f"   - Quiz questions (context-specific translation)")
    print(f"   - Natural German flow verification")
    print(f"\n💡 TIP: Review White Belt Stripe 1 first as quality template")

if __name__ == '__main__':
    main()

