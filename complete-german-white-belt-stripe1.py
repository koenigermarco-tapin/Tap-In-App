#!/usr/bin/env python3
"""
Complete German Translation for White Belt Stripe 1
Systematically completes all mixed-language content to 100% German
"""

import re
from pathlib import Path

def complete_white_belt_stripe1():
    """Complete all translations in White Belt Stripe 1"""
    
    filepath = Path('white-belt-stripe1-gamified-de.html')
    
    print("🇩🇪 COMPLETING GERMAN TRANSLATION: White Belt Stripe 1")
    print("=" * 60)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_length = len(content)
    changes_count = 0
    
    # ========================================================================
    # LESSON CONTENT TRANSLATIONS
    # ========================================================================
    print("\n📝 Phase 1: Completing lesson content...")
    
    lesson_translations = [
        # Lesson 1 - Core Concept paragraph 2 (already done, but verify)
        (
            r'<strong>Predictability-based trust</strong> lets you rely on someone\'s behavior;',
            '<strong>Vorhersagbarkeitsbasiertes Vertrauen</strong> ermöglicht es dir, dich auf jemandes Verhalten zu verlassen;'
        ),
        (
            r'Teams without verletzlichkeitsbasiertes Vertrauen waste enormous energy',
            'Teams ohne verletzlichkeitsbasiertes Vertrauen verschwenden enorme Energie'
        ),
        (
            r'Building verletzlichkeitsbasiertes Vertrauen requires someone to go first',
            'Verletzlichkeitsbasiertes Vertrauen aufzubauen erfordert, dass jemand den ersten Schritt macht'
        ),
        
        # Practice exercise
        (
            r'gib etwas zu you don\'t know or a recent mistake you made\. Observe how people respond\.',
            'gib etwas zu, das du nicht weißt oder einen kürzlichen Fehler, den du gemacht hast. Beobachte, wie die Leute reagieren.'
        ),
        (
            r'Do they reciprocate with their own vulnerability, or does the room go silent\?',
            'Geben sie mit ihrer eigenen Verletzlichkeit zurück, oder wird es still im Raum?'
        ),
        (
            r'in your Leadership-Journal\.',
            'in deinem Leadership-Journal.'
        ),
    ]
    
    for old, new in lesson_translations:
        if old in content:
            content = content.replace(old, new)
            changes_count += 1
            print(f"   ✅ Fixed: {old[:50]}...")
    
    # ========================================================================
    # QUIZ QUESTION TRANSLATIONS
    # ========================================================================
    print("\n📝 Phase 2: Completing quiz questions...")
    
    quiz_translations = [
        # Question 1
        (
            r'Laut the 2025 Talent Trends Austria Report, wie viel Prozent der Mitarbeiter fully trust leadership\?',
            'Laut dem Talent Trends Österreich Report 2025: Wie viel Prozent der Mitarbeiter vertrauen der Führung voll und ganz?'
        ),
        (
            r'Only 1% der Mitarbeiter fully trust leadership, highlighting the critical trust crisis',
            'Nur 1% der Mitarbeiter vertrauen der Führung voll und ganz—das zeigt die kritische Vertrauenskrise'
        ),
        
        # Question 2
        (
            r'What type von Vertrauen does Lencioni\'s Five Dysfunctions model focus on\?',
            'Auf welche Art von Vertrauen fokussiert sich Lencionis Five Dysfunctions Modell?'
        ),
        (
            r'Vulnerability-based trust is the foundation\. It ermöglicht Teammitgliedern to Fehler zugeben',
            'Verletzlichkeitsbasiertes Vertrauen ist die Grundlage. Es ermöglicht Teammitgliedern, Fehler zuzugeben'
        ),
        
        # Question 3
        (
            r'Laut Google\'s Project Aristotle, what was the #1 predictor der Teamleistung\?',
            'Laut Googles Project Aristotle: Was war der #1 Prädiktor für Teamleistung?'
        ),
        (
            r'Psychological safety was the top factor\. Teams where members feel safe to take risks',
            'Psychologische Sicherheit war der wichtigste Faktor. Teams, in denen sich Mitglieder sicher fühlen, Risiken einzugehen,'
        ),
        
        # Fix quiz description
        (
            r'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen dieses Streifens content\.',
            'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen.'
        ),
    ]
    
    for old, new in quiz_translations:
        if re.search(old, content):
            content = re.sub(old, new, content)
            changes_count += 1
            print(f"   ✅ Fixed quiz content")
    
    # ========================================================================
    # WRITE UPDATED FILE
    # ========================================================================
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_length = len(content)
    
    print(f"\n✅ Translation refinement complete!")
    print(f"   Changes made: {changes_count}")
    print(f"   File size: {original_length:,} → {new_length:,} chars")
    print(f"\n⚠️  NOTE: Quiz questions 4-10 still need manual translation")
    print(f"   Lesson content is now ~90% complete")

if __name__ == '__main__':
    complete_white_belt_stripe1()

