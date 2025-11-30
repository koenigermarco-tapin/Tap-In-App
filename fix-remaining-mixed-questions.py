#!/usr/bin/env python3
"""
Fix remaining mixed English/German in questions arrays
"""

from pathlib import Path
import re

def fix_remaining_mixed(de_file):
    """Fix remaining mixed patterns"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = [
        # Question patterns
        (r'Dein comfort level with giving',
         'Dein Komfortniveau beim Geben'),
        (r'When du need',
         'Wenn du musst'),
        (r'dein approach',
         'ist dein Ansatz'),
        (r'How oft do',
         'Wie oft tust du'),
        (r'How oft',
         'Wie oft'),
        
        # Text patterns
        (r'with lots des Erweichens',
         'mit viel Abschwächung'),
        (r'lots von padding',
         'viel Polsterung'),
        (r'mix von direct',
         'Mischung aus direkt'),
        (r'I\'m afraid von',
         'Ich habe Angst vor'),
        (r'waiting for the perfect',
         'auf den perfekten Moment warten'),
        (r'Extra thoughtful',
         'Besonders bedacht'),
        (r'I don\'t avoid',
         'Ich vermeide nicht'),
        
        # Tip/Tipp
        (r'💡 Tip:',
         '💡 Tipp:'),
        
        # Scenarios
        (r'and scenarios',
         'und Szenarien'),
    ]
    
    for pattern, replacement in fixes:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    files = [
        'brown-belt-stripe1-gamified-de.html',
        'brown-belt-stripe2-gamified-de.html',
        'brown-belt-stripe3-gamified-de.html',
        'brown-belt-stripe4-gamified-de.html',
        'black-belt-stripe1-gamified-de.html',
        'black-belt-stripe2-gamified-de.html',
        'black-belt-stripe3-gamified-de.html',
        'black-belt-stripe4-gamified-de.html',
    ]
    
    for f in files:
        if fix_remaining_mixed(f):
            print(f"✅ Fixed {f}")

if __name__ == '__main__':
    main()

