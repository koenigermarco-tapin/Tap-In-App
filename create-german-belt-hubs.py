#!/usr/bin/env python3
"""
Create German Belt Hub Pages

Creates German versions of all 5 belt hub pages from English templates.
"""

from pathlib import Path
import re

# Translation mappings
TRANSLATIONS = {
    'white': {
        'belt_name': 'Weißer Gürtel',
        'title': 'Erkenne dich selbst',
        'subtitle': 'Bevor Sie andere führen können, müssen Sie sich selbst verstehen. Das ist Ihre Grundlage.',
        'progress_title': 'Weißer Gürtel Fortschritt',
        'stripes': 'Streifen',
        'back_to': 'Zurück zum Gym',
        'continue': 'Reise fortsetzen',
        'complete_msg': 'Weißer Gürtel abgeschlossen! Bereit für den Blauen Gürtel?',
        'next_belt': 'blue-belt-de.html'
    },
    'blue': {
        'belt_name': 'Blauer Gürtel',
        'title': 'Produktiver Konflikt',
        'subtitle': 'Das Plateau. Wo die meisten aufgeben. Wo Champions durch unangenehme Gespräche geschmiedet werden.',
        'progress_title': 'Blauer Gürtel Fortschritt',
        'stripes': 'Streifen',
        'back_to': 'Zurück zum Gym',
        'continue': 'Reise fortsetzen',
        'complete_msg': 'Blauer Gürtel abgeschlossen! Bereit für den Violettes Gürtel?',
        'next_belt': 'purple-belt-de.html'
    },
    'purple': {
        'belt_name': 'Violetter Gürtel',
        'title': 'Commitment & Ausrichtung',
        'subtitle': 'Von Zustimmung zu echter Verpflichtung. Teams, die sich wirklich verpflichten, handeln.',
        'progress_title': 'Violetter Gürtel Fortschritt',
        'stripes': 'Streifen',
        'back_to': 'Zurück zum Gym',
        'continue': 'Reise fortsetzen',
        'complete_msg': 'Violetter Gürtel abgeschlossen! Bereit für den Brauner Gürtel?',
        'next_belt': 'brown-belt-de.html'
    },
    'brown': {
        'belt_name': 'Brauner Gürtel',
        'title': 'Verantwortlichkeit',
        'subtitle': 'Halten Sie sich und andere verantwortlich. Standards ohne Angst.',
        'progress_title': 'Brauner Gürtel Fortschritt',
        'stripes': 'Streifen',
        'back_to': 'Zurück zum Gym',
        'continue': 'Reise fortsetzen',
        'complete_msg': 'Brauner Gürtel abgeschlossen! Bereit für den Schwarzer Gürtel?',
        'next_belt': 'black-belt-de.html'
    },
    'black': {
        'belt_name': 'Schwarzer Gürtel',
        'title': 'Vision & Ergebnisse',
        'subtitle': 'Fokussieren Sie sich auf kollektive Ergebnisse über individuelle Erfolge. Das ist wahre Führung.',
        'progress_title': 'Schwarzer Gürtel Fortschritt',
        'stripes': 'Streifen',
        'back_to': 'Zurück zum Gym',
        'continue': 'Reise fortsetzen',
        'complete_msg': 'Schwarzer Gürtel abgeschlossen! 🎉',
        'next_belt': 'gym-dashboard-de.html'
    }
}

def create_german_belt_hub(belt_color):
    """Create German version of a belt hub page"""
    
    english_file = Path(f'{belt_color}-belt.html')
    if not english_file.exists():
        print(f"⚠️  {english_file} not found, skipping...")
        return False
    
    with open(english_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    translations = TRANSLATIONS[belt_color]
    
    # Replace lang attribute
    content = content.replace('lang="en"', 'lang="de"')
    
    # Replace title
    content = re.sub(
        r'<title>.*?</title>',
        f'<title>{translations["belt_name"]}: {translations["title"]} | TAP-IN</title>',
        content
    )
    
    # Replace belt badge
    belt_badge_pattern = r'<div class="belt-badge">[^<]*BELT[^<]*</div>'
    belt_emoji = {'white': '⚪', 'blue': '🔵', 'purple': '🟣', 'brown': '🟤', 'black': '⚫'}[belt_color]
    content = re.sub(
        belt_badge_pattern,
        f'<div class="belt-badge">{belt_emoji} {translations["belt_name"].upper()}</div>',
        content
    )
    
    # Replace main title
    content = content.replace(
        re.search(r'<h1>[^<]+</h1>', content).group(0),
        f'<h1>{translations["title"]}</h1>'
    )
    
    # Replace subtitle
    subtitle_pattern = r'<p>Before you can lead others.*?</p>|The plateau.*?</p>|Von Zustimmung.*?</p>|Halten Sie.*?</p>|Fokussieren Sie.*?</p>'
    content = re.sub(
        subtitle_pattern,
        f'<p>{translations["subtitle"]}</p>',
        content,
        flags=re.DOTALL
    )
    
    # Replace progress title
    content = re.sub(
        r'<span class="progress-title">[^<]*Progress[^<]*</span>',
        f'<span class="progress-title">{translations["progress_title"]}</span>',
        content
    )
    
    # Replace "Stripes"
    content = content.replace('/4 Stripes', f'/4 {translations["stripes"]}')
    content = content.replace('Stripes', translations["stripes"])
    
    # Replace navigation links
    content = content.replace('gym-dashboard.html', 'gym-dashboard-de.html')
    content = content.replace('.html"', '-de.html"', 1)  # Only first occurrence for next belt
    content = content.replace('Back to Gym', translations["back_to"])
    content = content.replace('Continue Journey', translations["continue"])
    
    # Replace JavaScript confirm message
    content = content.replace(
        f'{belt_color.capitalize()} Belt Complete! Ready for',
        translations["complete_msg"]
    )
    
    # Replace localStorage keys to use same keys (no -de suffix needed for compatibility)
    
    # Write German version
    output_file = Path(f'{belt_color}-belt-de.html')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {output_file.name}")
    return True

def main():
    print("🇩🇪 Creating German Belt Hub Pages...")
    print("=" * 60)
    
    belts = ['white', 'blue', 'purple', 'brown', 'black']
    
    for belt in belts:
        if belt == 'white':
            print(f"⏭️  Skipping {belt} (already created manually)")
            continue
        create_german_belt_hub(belt)
    
    print(f"\n✅ German belt hub pages created!")

if __name__ == '__main__':
    main()

