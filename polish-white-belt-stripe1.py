#!/usr/bin/env python3
"""
Polish White Belt Stripe 1 - Complete Translation Refinement
Fixes mixed language issues and creates perfect German quality template
"""

import re
from pathlib import Path

def polish_white_belt_stripe1():
    """Complete polish of White Belt Stripe 1"""
    
    file_path = Path('white-belt-stripe1-gamified-de.html')
    
    print("🎨 Polishing White Belt Stripe 1...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix mixed language patterns
    fixes = [
        # Fix "von" used incorrectly
        (r'\bvon\s+this', 'dieses'),
        (r'\bvon\s+trust', 'von Vertrauen'),
        (r'\bvon\s+the', 'der'),
        (r'\bvon\s+a\s+team', 'eines Teams'),
        (r'\bvon\s+employees', 'der Mitarbeiter'),
        (r'\bvon\s+variance', 'der Varianz'),
        (r'\bvon\s+experience', 'der Erfahrung'),
        (r'\bvon\s+team\s+performance', 'der Teamleistung'),
        (r'\bvon\s+the\s+worst', 'am schlechtesten'),
        
        # Fix mixed English/German
        (r'reliability with trust', 'Zuverlässigkeit mit Vertrauen'),
        (r'They think:', 'Sie denken:'),
        (r'useful, but limited', 'nützlich, aber begrenzt'),
        (r'It means you can', 'Es bedeutet, dass du kannst'),
        (r'It doesn\'t mean', 'Es bedeutet nicht'),
        (r'is different', 'ist anders'),
        (r'Laut Lencioni\'s Forschung', "Laut Lencionis Forschung"),
        (r'Forschung at Harvard', 'Forschung an Harvard'),
        (r'defines this as', 'definiert dies als'),
        
        # Fix research box class name
        (r'class="Forschung-box"', 'class="research-box"'),
        
        # Fix function names (should stay English for JavaScript)
        (r'onclick="toggleLektion', 'onclick="toggleLesson'),
        (r'onclick="completeLektion', 'onclick="completeLesson'),
        
        # Fix quiz description
        (r'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen von this stripe\'s content\.', 
         'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen.'),
        
        # Fix mixed phrases
        (r'operate in constant', 'operieren im ständigen'),
        (r'Energy that should go toward results', 'Energie, die in Ergebnisse fließen sollte'),
        (r'gets wasted on', 'wird verschwendet für'),
        
        # Fix incomplete translations
        (r'Why Teams Avoid Vulnerability', 'Warum Teams Verletzlichkeit vermeiden'),
        (r'The Trust Pyramid', 'Die Vertrauens-Pyramide'),
        (r'Recognizing Trust Dysfunction', 'Vertrauensdysfunktion erkennen'),
    ]
    
    for pattern, replacement in fixes:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # Complete lesson content translations
    lesson_translations = {
        # Lesson 1 Core Concept - Complete translation
        'Most people confuse reliability with trust. They think: "I trust Sarah because she always delivers on time." That\'s <strong>vorhersagbarkeitsbasiertes Vertrauen</strong>—useful, but limited. It means you can predict behavior. It doesn\'t mean you can be vulnerable.': 
        'Die meisten Menschen verwechseln Zuverlässigkeit mit Vertrauen. Sie denken: "Ich vertraue Sarah, weil sie immer pünktlich liefert." Das ist <strong>vorhersagbarkeitsbasiertes Vertrauen</strong>—nützlich, aber begrenzt. Es bedeutet, dass du Verhalten vorhersagen kannst. Es bedeutet nicht, dass du verletzlich sein kannst.',
        
        '<strong>Vulnerability-based trust</strong> is different. Laut Lencioni\'s Forschung, it\'s the confidence that your teammates will not use your weaknesses against you. It\'s knowing you can say "I don\'t know," "I was wrong," or "I need help" without being punished, judged, or secretly tallied against.':
        '<strong>Verletzlichkeitsbasiertes Vertrauen</strong> ist anders. Laut Lencionis Forschung ist es das Vertrauen, dass deine Teammitglieder deine Schwächen nicht gegen dich verwenden werden. Es bedeutet zu wissen, dass du "Ich weiß es nicht", "Ich lag falsch" oder "Ich brauche Hilfe" sagen kannst, ohne bestraft, beurteilt oder heimlich gegen dich verwendet zu werden.',
        
        'Amy Edmondson\'s Forschung at Harvard defines this as <strong>psychologische Sicherheit</strong>: "a shared belief held by members von a team that the team is safe for interpersonal risk-taking."':
        'Amy Edmondsons Forschung an Harvard definiert dies als <strong>psychologische Sicherheit</strong>: "eine gemeinsame Überzeugung der Teammitglieder, dass das Team sicher für zwischenmenschliche Risikobereitschaft ist."',
    }
    
    for eng, ger in lesson_translations.items():
        if eng in content:
            content = content.replace(eng, ger)
    
    # Write polished file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"   ✅ Polished {file_path.name}")
    print(f"   ⚠️  NOTE: Comprehensive lesson content translation still needed")
    
    return True

if __name__ == '__main__':
    polish_white_belt_stripe1()

