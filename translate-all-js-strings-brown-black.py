#!/usr/bin/env python3
"""
Translate all JavaScript strings in Brown and Black belt files
Focuses on: quiz failure messages, completion messages, alerts, etc.
"""

from pathlib import Path
import re

def translate_js_strings(de_file, belt_color='🟤', belt_name='Brown Belt'):
    """Translate JavaScript strings in German file"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Belt-specific translations
    if 'black' in de_file.lower():
        belt_color = '⚫'
        belt_name = 'Black Belt'
        belt_german = 'Black Belt'
    else:
        belt_german = 'Brown Belt'
    
    translations = [
        # Quiz failure messages (template strings)
        (r'You Got Submitted by a Brown Belt! 🥋',
         f'Du wurdest von einem {belt_german} submitted! 🥋'),
        (r'You Got Submitted by a Black Belt! 🥋',
         f'Du wurdest von einem {belt_german} submitted! 🥋'),
        (r'The brown belt exposed gaps',
         f'Der {belt_german} hat Lücken aufgedeckt'),
        (r'The black belt exposed gaps',
         f'Der {belt_german} hat Lücken aufgedeckt'),
        (r'This is advanced material',
         'Das ist fortgeschrittenes Material'),
        (r'take time to review, then come back ready',
         'nimm dir Zeit zum Überprüfen, dann komm zurück, bereit'),
        
        # Review section
        (r'Review These Questions:',
         'Überprüfe diese Fragen:'),
        (r'Review Lessons',
         'Lektionen überprüfen'),
        (r'Retry Quiz',
         'Quiz wiederholen'),
        (r'Scroll up to review the lessons',
         'Scrolle nach oben, um die Lektionen zu überprüfen'),
        (r'then retry the quiz!',
         'dann wiederhole das Quiz!'),
        
        # Score display
        (r'Score:',
         'Ergebnis:'),
        (r'Need.*to pass',
         r'Benötigt ${passingThreshold}/10 zum Bestehen'),
        
        # Quiz completion
        (r'Quiz Complete! 🎉',
         'Quiz abgeschlossen! 🎉'),
        (r'You scored:',
         'Deine Punktzahl:'),
        (r'\+50 XP awarded!',
         '+50 XP vergeben!'),
        (r'\+75 XP awarded!',
         '+75 XP vergeben!'),
        
        # Common JS strings
        (r'Question \$\{index \+ 1\}',
         r'Frage ${index + 1}'),
        (r'Question \$\{q\.num\}',
         r'Frage ${q.num}'),
    ]
    
    for pattern, replacement in translations:
        content = re.sub(pattern, replacement, content)
    
    # Fix score template
    content = re.sub(
        r'Score: \$\{quizScore\}/10 \(Need \$\{passingThreshold\}/10 to pass\)',
        r'Ergebnis: ${quizScore}/10 (Benötigt ${passingThreshold}/10 zum Bestehen)',
        content
    )
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    files = [
        ('brown-belt-stripe1-gamified-de.html', '🟤', 'Brown Belt'),
        ('brown-belt-stripe2-gamified-de.html', '🟤', 'Brown Belt'),
        ('brown-belt-stripe3-gamified-de.html', '🟤', 'Brown Belt'),
        ('brown-belt-stripe4-gamified-de.html', '🟤', 'Brown Belt'),
        ('black-belt-stripe1-gamified-de.html', '⚫', 'Black Belt'),
        ('black-belt-stripe2-gamified-de.html', '⚫', 'Black Belt'),
        ('black-belt-stripe3-gamified-de.html', '⚫', 'Black Belt'),
        ('black-belt-stripe4-gamified-de.html', '⚫', 'Black Belt'),
    ]
    
    for de_file, color, name in files:
        if translate_js_strings(de_file, color, name):
            print(f"✅ {de_file} - JS strings translated")

if __name__ == '__main__':
    main()

