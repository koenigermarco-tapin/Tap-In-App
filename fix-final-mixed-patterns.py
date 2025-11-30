#!/usr/bin/env python3
"""
Final fixes for remaining mixed patterns
"""

from pathlib import Path
import re

def fix_final_patterns(de_file):
    """Fix final mixed patterns"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = [
        # Fix remaining question patterns
        (r'"Wenn du siehst a team member',
         '"Wenn du siehst, dass ein Teammitglied'),
        (r'"Dein Ansatz zu peer accountability is',
         '"Dein Ansatz zu Peer-Verantwortlichkeit ist'),
        (r'"Wenn du musst, um hold',
         '"Wenn du musst, um einen Kollegen zur Verantwortung zu ziehen, sorgen du dich am meisten'),
        (r'hold a peer accountable, sorgen du dich most',
         'einen Kollegen zur Verantwortung zu ziehen, sorgen du dich am meisten'),
        
        # Fix "sorgen du dich" -> "sorgst du dich"
        (r'sorgen du dich',
         'sorgst du dich'),
        
        # Fix remaining quiz option patterns
        (r'Never changing ist dein Ansatz',
         'Niemals den Ansatz ändern'),
        (r'regardless von situation',
         'unabhängig von der Situation'),
        
        # Fix remaining "is" patterns
        (r'accountability is\.\.\.',
         'Verantwortlichkeit ist...'),
        (r'accountability is',
         'Verantwortlichkeit ist'),
        
        # Fix remaining explanation patterns
        (r'when du can\'t',
         'wenn du nicht kannst'),
        (r'when du don\'t',
         'wenn du nicht'),
        (r'du\'re always',
         'du bist immer'),
        (r'Du\'re always',
         'Du bist immer'),
        (r'how du show up',
         'wie du auftrittst'),
        (r'du express',
         'du drückst'),
        (r'dein values',
         'deine Werte'),
        (r'dein expression',
         'deine Ausdrucksweise'),
        (r'to dein values',
         'zu deinen Werten'),
        (r'in dein expression',
         'in deiner Ausdrucksweise'),
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
        if fix_final_patterns(f):
            print(f"✅ {f}")

if __name__ == '__main__':
    main()

