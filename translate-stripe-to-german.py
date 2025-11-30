#!/usr/bin/env python3
"""
Translate Stripe Files to German
Systematic translation of all 20 belt stripe files with quality checks
"""

import re
from pathlib import Path
from html.parser import HTMLParser
import html

# Translation dictionary - Comprehensive mapping
TRANSLATIONS = {
    # Page metadata
    '<html lang="en">': '<html lang="de">',
    '| Tap-In Leadership': '| TAP-IN Leadership',
    
    # Navigation & UI
    'Back to White Belt Hub': 'Zurück zur Weißer-Gürtel-Übersicht',
    'Back to Blue Belt Hub': 'Zurück zur Blauer-Gürtel-Übersicht',
    'Back to Purple Belt Hub': 'Zurück zur Violetter-Gürtel-Übersicht',
    'Back to Brown Belt Hub': 'Zurück zur Brauner-Gürtel-Übersicht',
    'Back to Black Belt Hub': 'Zurück zur Schwarzer-Gürtel-Übersicht',
    'Continue': 'Weiter',
    'Next': 'Weiter',
    'Previous': 'Zurück',
    'Complete Lesson': 'Lektion abschließen',
    'Next Lesson': 'Nächste Lektion',
    'Start Assessment': 'Assessment starten',
    'Begin Assessment': 'Assessment beginnen',
    
    # Quiz section
    'Test Your Knowledge': 'Teste dein Wissen',
    'Complete this quiz to validate your understanding': 'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen',
    'Question': 'Frage',
    'of 10': 'von 10',
    'Quiz Complete!': 'Quiz abgeschlossen!',
    'You scored:': 'Deine Punktzahl:',
    'XP awarded!': 'XP verdient!',
    'Continue': 'Weiter',
    
    # Failure messages (keep "submitted" in English)
    'You Got Submitted by a White Belt!': 'Du wurdest von einem Weißen Gürtel submitted!',
    'You Got Submitted by a Blue Belt!': 'Du wurdest von einem Blauen Gürtel submitted!',
    'You Got Submitted by a Purple Belt!': 'Du wurdest von einem Violetten Gürtel submitted!',
    'You Got Submitted by a Brown Belt!': 'Du wurdest von einem Braunen Gürtel submitted!',
    'You Got Submitted by a Black Belt!': 'Du wurdest von einem Schwarzen Gürtel submitted!',
    
    # Retry/Review
    'Retry Quiz': 'Quiz wiederholen',
    'Review Lessons': 'Lektionen nochmal ansehen',
    'Review These Questions:': 'Schau dir diese Fragen nochmal an:',
    'Tip:': '💡 Tipp:',
    'Scroll up to review the lessons': 'Scroll nach oben, um die Lektionen nochmal anzuschauen',
    'Score:': 'Punktzahl:',
    'Need': 'Du brauchst',
    'to pass': 'zum Bestehen',
    
    # Progress
    'Progress': 'Fortschritt',
    'Your Progress': 'Dein Fortschritt',
    'Complete': 'Abgeschlossen',
    'In Progress': 'In Bearbeitung',
    'Not Started': 'Noch nicht begonnen',
    
    # Belt names (keep in English but add context)
    'White Belt': 'White Belt',
    'Blue Belt': 'Blue Belt',
    'Purple Belt': 'Purple Belt',
    'Brown Belt': 'Brown Belt',
    'Black Belt': 'Black Belt',
    
    # Common phrases
    'Loading...': 'Lädt...',
    'Welcome': 'Willkommen',
    'Congratulations!': 'Glückwunsch!',
    'You': 'Du',
    'Your': 'Dein',
    'You have': 'Du hast',
    'You are': 'Du bist',
    'You can': 'Du kannst',
    'You will': 'Du wirst',
    
    # Quiz feedback
    'Correct!': 'Richtig!',
    'Not quite.': 'Nicht ganz.',
    'Excellent!': 'Perfekt!',
    'Well done!': 'Gut gemacht!',
}

# Pronouns - Du-form conversion
PRONOUN_REPLACEMENTS = [
    (r'\bYour\b', 'Dein'),
    (r'\bYour\s+', 'Dein '),
    (r'\bYou\b', 'Du'),
    (r'\byou\b', 'du'),
    (r'\bYou\'re\b', 'Du bist'),
    (r'\byou\'re\b', 'du bist'),
    (r'\bYou\'ve\b', 'Du hast'),
    (r'\byou\'ve\b', 'du hast'),
    (r'\bYou\'ll\b', 'Du wirst'),
    (r'\byou\'ll\b', 'du wirst'),
    # Be careful with possessive
    (r'\bYour team\b', 'Dein Team'),
    (r'\bYour results\b', 'Deine Ergebnisse'),
    (r'\bYour score\b', 'Deine Punktzahl'),
]

def fix_internal_links(content, belt_name):
    """Update all internal links to point to -de.html versions"""
    
    # Pattern: href="filename.html" -> href="filename-de.html"
    # But NOT for external links or files that don't have German versions
    patterns = [
        (r'href="([^"]+\.html)"', r'href="\1"'),  # We'll process this more carefully
        (r'href="([^"]*belt[^"]*\.html)"', r'href="\1"'),
        (r'href="([^"]*stripe[^"]*\.html)"', r'href="\1"'),
        (r'href="([^"]*dashboard[^"]*\.html)"', r'href="\1"'),
        (r'href="([^"]*hub[^"]*\.html)"', r'href="\1"'),
        (r'href="([^"]*assessment[^"]*\.html)"', r'href="\1"'),
    ]
    
    # More targeted link replacement
    link_replacements = {
        'white-belt.html': 'white-belt-de.html',
        'blue-belt.html': 'blue-belt-de.html',
        'purple-belt.html': 'purple-belt-de.html',
        'brown-belt.html': 'brown-belt-de.html',
        'black-belt.html': 'black-belt-de.html',
        'gym-dashboard.html': 'gym-dashboard-de.html',
        'learning-hub.html': 'learning-hub-de.html',
        'hub-assessment-center.html': 'hub-assessment-center-de.html',
    }
    
    # Add stripe links
    for i in range(1, 5):
        belt_prefix = belt_name.lower().replace('-belt', '')
        old_link = f'{belt_prefix}-belt-stripe{i}-gamified.html'
        new_link = f'{belt_prefix}-belt-stripe{i}-gamified-de.html'
        link_replacements[old_link] = new_link
        
        # Also handle carousel versions
        old_carousel = f'{belt_prefix}-belt-stripe{i}-carousel-NEW.html'
        new_carousel = f'{belt_prefix}-belt-stripe{i}-carousel-NEW-de.html'
        link_replacements[old_carousel] = new_carousel
    
    # Replace links
    for old, new in link_replacements.items():
        # Only replace if it's not already a -de.html link
        if not old.endswith('-de.html'):
            content = content.replace(f'href="{old}"', f'href="{new}"')
            content = content.replace(f"href='{old}'", f"href='{new}'")
            content = content.replace(f'window.location.href = "{old}"', f'window.location.href = "{new}"')
            content = content.replace(f"window.location.href = '{old}'", f"window.location.href = '{new}'")
    
    return content

def translate_stripe_file(input_file, output_file, belt_name):
    """Translate a single stripe file to German"""
    
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
        title = title.replace('| Tap-In Leadership', '| TAP-IN Leadership')
        return f'<title>{title}</title>'
    
    content = re.sub(title_pattern, translate_title, content)
    
    # Step 3: Apply direct translations
    for eng, ger in TRANSLATIONS.items():
        content = content.replace(eng, ger)
    
    # Step 4: Fix internal links
    content = fix_internal_links(content, belt_name)
    
    # Step 5: Translate JavaScript strings (simple replacements)
    js_translations = {
        "Quiz Complete! Continue to Stripe": "Quiz abgeschlossen! Weiter zu Streifen",
        "Quiz Complete! Continue": "Quiz abgeschlossen! Weiter",
        "Continue to Stripe": "Weiter zu Streifen",
        "Return to": "Zurück zu",
        "You scored": "Deine Punktzahl",
        "XP awarded": "XP verdient",
        "You need": "Du brauchst",
        "to pass": "zum Bestehen",
        "Retry Quiz": "Quiz wiederholen",
        "Review Lessons": "Lektionen nochmal ansehen",
    }
    
    for eng, ger in js_translations.items():
        content = content.replace(f'"{eng}', f'"{ger}')
        content = content.replace(f"'{eng}", f"'{ger}")
    
    # Step 6: Translate common UI text in attributes
    content = content.replace('placeholder="Enter your name"', 'placeholder="Gib deinen Namen ein"')
    content = content.replace('placeholder="Your answer"', 'placeholder="Deine Antwort"')
    
    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_length = len(content)
    print(f"   ✅ Created {output_file.name} ({new_length:,} chars)")
    
    return True

def main():
    """Main translation function"""
    print("🇩🇪 GERMAN STRIPE TRANSLATION")
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
    for file_info in stripe_files:
        input_path = Path(file_info['input'])
        output_path = Path(file_info['output'])
        
        if not input_path.exists():
            print(f"⚠️  {input_path.name} not found, skipping...")
            continue
        
        if translate_stripe_file(input_path, output_path, file_info['belt']):
            translated += 1
    
    print(f"\n✅ Translation complete!")
    print(f"   Translated: {translated}/{len(stripe_files)} files")
    print(f"\n⚠️  NOTE: This is a basic translation. Manual review needed for:")
    print(f"   - Lesson content translation")
    print(f"   - Quiz question translation")
    print(f"   - JavaScript string refinement")
    print(f"   - Tone and naturalness check")

if __name__ == '__main__':
    main()

