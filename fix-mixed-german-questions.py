#!/usr/bin/env python3
"""
Fix mixed English/German in question arrays
"""

from pathlib import Path
import re

def fix_mixed_questions(de_file):
    """Fix mixed English/German in JavaScript question arrays"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix common mixed patterns
    fixes = [
        # Question patterns
        (r'Wenn jemand fragt \'How am I doing\?\' and du have concerns, du typically\.\.\.',
         "Wenn jemand fragt 'Wie mache ich mich?' und du Bedenken hast, tust du typischerweise..."),
        (r'"How am I doing\?" and you have concerns',
         '"Wie mache ich mich?" und du Bedenken hast'),
        (r'you typically',
         'tust du typischerweise'),
        (r'you have concerns',
         'du Bedenken hast'),
        (r'your approach is',
         'ist dein Ansatz'),
        (r'your comfort level',
         'dein Komfortniveau'),
        (r'your belief',
         'dein Glaube'),
        (r'you need to',
         'du musst'),
        (r'you\'ve been',
         'du hast'),
        (r'you typically',
         'du tust typischerweise'),
        
        # Option text fixes
        (r'Give clear feedback but soft it',
         'Klares Feedback geben, aber es'),
        (r'softening',
         'Abschwächung'),
        (r'soft it',
         'es abschwächen'),
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
        if fix_mixed_questions(f):
            print(f"✅ Fixed {f}")

if __name__ == '__main__':
    main()

