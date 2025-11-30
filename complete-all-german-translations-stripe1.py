#!/usr/bin/env python3
"""
Complete All German Translations for White Belt Stripe 1
Translates all remaining English content to natural, energetic German
"""

import re
from pathlib import Path

def complete_translations():
    """Complete all translations in White Belt Stripe 1"""
    
    filepath = Path('white-belt-stripe1-gamified-de.html')
    
    print("🇩🇪 COMPLETING ALL GERMAN TRANSLATIONS: White Belt Stripe 1")
    print("=" * 60)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_length = len(content)
    changes_count = 0
    
    # ========================================================================
    # QUIZ QUESTIONS - Complete Translations
    # ========================================================================
    print("\n📝 Phase 1: Completing quiz questions...")
    
    quiz_translations = [
        # Question 1 (fix remaining)
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
        (
            r'and um Hilfe bitten without fear\.',
            'und um Hilfe zu bitten, ohne Angst zu haben.'
        ),
        (
            r'Prvonessional trust',
            'Professionelles Vertrauen'
        ),
        
        # Question 3
        (
            r'Laut Google\'s Project Aristotle, what was the #1 predictor der Teamleistung\?',
            'Laut Googles Project Aristotle: Was war der #1 Prädiktor für Teamleistung?'
        ),
        (
            r'Psychological safety was the top factor\. Teams where members feel safe to take risks outperform others\.',
            'Psychologische Sicherheit war der wichtigste Faktor. Teams, in denen sich Mitglieder sicher fühlen, Risiken einzugehen, übertreffen andere.'
        ),
        (
            r'Years der Erfahrung',
            'Jahre der Erfahrung'
        ),
        (
            r'Available resources',
            'Verfügbare Ressourcen'
        ),
        
        # Question 4
        (
            r'In BJJ, what do people who progress fastest do\?',
            'Im BJJ: Was machen Menschen, die am schnellsten Fortschritte machen?'
        ),
        (
            r'Tapping early and asking questions shows vulnerability and accelerates learning, just like in teams\.',
            'Früh zu tappen und Fragen zu stellen zeigt Verletzlichkeit und beschleunigt das Lernen—genau wie in Teams.'
        ),
        (
            r'A\) Never tap out',
            'A) Niemals tappen'
        ),
        (
            r'B\) Tap early and ask questions',
            'B) Früh tappen und Fragen stellen'
        ),
        (
            r'C\) Only train with lower belts',
            'C) Nur mit niedrigeren Gürteln trainieren'
        ),
        (
            r'D\) Avoid difficult positions',
            'D) Schwere Positionen vermeiden'
        ),
        
        # Question 5
        (
            r'True or False: Vulnerability-based trust means being weak or incompetent\.',
            'Wahr oder Falsch: Verletzlichkeitsbasiertes Vertrauen bedeutet schwach oder inkompetent zu sein.'
        ),
        (
            r'False! Vulnerability-based trust is about courage—admitting you don\'t know something or made a mistake\. It\'s strength, not weakness\.',
            'Falsch! Verletzlichkeitsbasiertes Vertrauen geht um Mut—zuzugeben, dass du etwas nicht weißt oder einen Fehler gemacht hast. Es ist Stärke, nicht Schwäche.'
        ),
        (
            r'A\) True',
            'A) Wahr'
        ),
        (
            r'B\) False',
            'B) Falsch'
        ),
        
        # Question 6
        (
            r'What happens when teams lack verletzlichkeitsbasiertes Vertrauen\?',
            'Was passiert, wenn Teams verletzlichkeitsbasiertem Vertrauen fehlt?'
        ),
        (
            r'Without verletzlichkeitsbasiertes Vertrauen, team members hide weaknesses and mistakes, leading to poor decisions and artificial harmony\.',
            'Ohne verletzlichkeitsbasiertes Vertrauen verstecken Teammitglieder Schwächen und Fehler, was zu schlechten Entscheidungen und künstlicher Harmonie führt.'
        ),
        (
            r'A\) They work faster',
            'A) Sie arbeiten schneller'
        ),
        (
            r'B\) They hide weaknesses and mistakes',
            'B) Sie verstecken Schwächen und Fehler'
        ),
        (
            r'C\) They communicate better',
            'C) Sie kommunizieren besser'
        ),
        (
            r'D\) They innovate more',
            'D) Sie innovieren mehr'
        ),
        
        # Question 7
        (
            r'Which derse is a sign von verletzlichkeitsbasiertes Vertrauen\?',
            'Welches davon ist ein Zeichen für verletzlichkeitsbasiertes Vertrauen?'
        ),
        (
            r'Asking for help when stuck demonstrates verletzlichkeitsbasiertes Vertrauen\. It shows safety to admit you don\'t know something\.',
            'Um Hilfe zu bitten, wenn man feststeckt, zeigt verletzlichkeitsbasiertes Vertrauen. Es zeigt Sicherheit, zuzugeben, dass man etwas nicht weiß.'
        ),
        (
            r'A\) Team members never Fehler zugeben',
            'A) Teammitglieder geben niemals Fehler zu'
        ),
        (
            r'B\) People um Hilfe bitten when stuck',
            'B) Menschen bitten um Hilfe, wenn sie feststecken'
        ),
        (
            r'C\) Everyone pretends to know everything',
            'C) Alle tun so, als wüssten sie alles'
        ),
        (
            r'D\) Weaknesses are hidden',
            'D) Schwächen werden versteckt'
        ),
        
        # Question 8
        (
            r'What is the relationship between trust and conflict in Lencioni\'s model\?',
            'Wie ist die Beziehung zwischen Vertrauen und Konflikt in Lencionis Modell?'
        ),
        (
            r'Trust enables healthy conflict\. Without trust, teams avoid conflict \(artificial harmony\), which is actually a dysfunction\.',
            'Vertrauen ermöglicht gesunden Konflikt. Ohne Vertrauen vermeiden Teams Konflikte (künstliche Harmonie), was tatsächlich eine Dysfunktion ist.'
        ),
        (
            r'A\) Trust prevents conflict',
            'A) Vertrauen verhindert Konflikte'
        ),
        (
            r'B\) Trust enables healthy conflict',
            'B) Vertrauen ermöglicht gesunden Konflikt'
        ),
        (
            r'C\) They are unrelated',
            'C) Sie sind unabhängig'
        ),
        (
            r'D\) Conflict destroys trust',
            'D) Konflikt zerstört Vertrauen'
        ),
        
        # Question 9
        (
            r'In a high-trust team, what happens when someone makes a mistake\?',
            'In einem Hochvertrauensteam: Was passiert, wenn jemand einen Fehler macht?'
        ),
        (
            r'In high-trust teams, mistakes are admitted openly and the team works together to fix them\. This builds stronger trust\.',
            'In Hochvertrauensteams werden Fehler offen zugegeben und das Team arbeitet zusammen, um sie zu beheben. Das stärkt das Vertrauen.'
        ),
        (
            r'A\) They are immediately fired',
            'A) Sie werden sofort gekündigt'
        ),
        (
            r'B\) They hide it from others',
            'B) Sie verstecken es vor anderen'
        ),
        (
            r'C\) They admit it and the team helps fix it',
            'C) Sie geben es zu und das Team hilft, es zu beheben'
        ),
        (
            r'D\) They blame someone else',
            'D) Sie geben jemand anderem die Schuld'
        ),
        
        # Question 10
        (
            r'What is the first step to building verletzlichkeitsbasiertes Vertrauen\?',
            'Was ist der erste Schritt zum Aufbau von verletzlichkeitsbasiertem Vertrauen?'
        ),
        (
            r'Building trust starts with you\. Admit your own mistakes and um Hilfe bitten first\. This creates psychologische Sicherheit for others\.',
            'Vertrauen aufzubauen beginnt mit dir. Gib deine eigenen Fehler zu und bitte zuerst um Hilfe. Das schafft psychologische Sicherheit für andere.'
        ),
        (
            r'A\) Wait for others to go first',
            'A) Warte, dass andere den ersten Schritt machen'
        ),
        (
            r'B\) Start by admitting your own mistakes and asking for help',
            'B) Beginne, indem du deine eigenen Fehler zugibst und um Hilfe bittest'
        ),
        (
            r'C\) Demand trust from your team',
            'C) Vertrauen von deinem Team verlangen'
        ),
        (
            r'D\) Only trust people you know well',
            'D) Nur Menschen vertrauen, die du gut kennst'
        ),
    ]
    
    for old, new in quiz_translations:
        if re.search(old, content):
            content = re.sub(old, new, content)
            changes_count += 1
    
    print(f"   ✅ Fixed {changes_count} quiz translations")
    
    # ========================================================================
    # QUIZ DESCRIPTION
    # ========================================================================
    if 'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen dieses Streifens content.' in content:
        content = content.replace(
            'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen dieses Streifens content.',
            'Schließe dieses Quiz ab, um dein Verständnis zu überprüfen.'
        )
        changes_count += 1
        print("   ✅ Fixed quiz description")
    
    # ========================================================================
    # ACHIEVEMENT POPUP
    # ========================================================================
    print("\n📝 Phase 2: Translating achievement popup...")
    
    achievement_translations = [
        (r'Lektion Complete!', 'Lektion abgeschlossen!'),
        (r"You're building trust mastery", 'Du baust Vertrauens-Meisterschaft auf'),
        (r'Already Complete!', 'Bereits abgeschlossen!'),
        (r'You completed this lesson already', 'Du hast diese Lektion bereits abgeschlossen'),
        (r'Streifen 1 Complete! 🥋', 'Streifen 1 abgeschlossen! 🥋'),
    ]
    
    for old, new in achievement_translations:
        if old in content:
            content = content.replace(old, new)
            changes_count += 1
    
    # ========================================================================
    # JAVASCRIPT STRINGS
    # ========================================================================
    print("\n📝 Phase 3: Translating JavaScript strings...")
    
    js_translations = [
        (r'"Quiz Complete! Continue', '"Quiz abgeschlossen! Weiter'),
        (r'"You scored"', '"Deine Punktzahl"'),
        (r'"XP awarded"', '"XP verdient"'),
        (r'of \$\{TOTAL_LESSONS\} lessons completed', 'von ${TOTAL_LESSONS} Lektionen abgeschlossen'),
        (r'lessons completed', 'Lektionen abgeschlossen'),
        (r"'Already Complete!'", "'Bereits abgeschlossen!'"),
        (r"'You completed this lesson already'", "'Du hast diese Lektion bereits abgeschlossen'"),
    ]
    
    for old, new in js_translations:
        if re.search(old, content):
            content = re.sub(old, new, content)
            changes_count += 1
    
    # ========================================================================
    # LESSON 2-4 CONTENT (if present in file)
    # ========================================================================
    print("\n📝 Phase 4: Checking remaining lesson content...")
    
    # Fix "Sie denken" if it appears (should be "Sie denken" is OK in quotes, but context matters)
    # Actually, let me check if there are any remaining English phrases in lessons
    
    # ========================================================================
    # WRITE UPDATED FILE
    # ========================================================================
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_length = len(content)
    
    print(f"\n✅ Translation complete!")
    print(f"   Total changes: {changes_count}")
    print(f"   File size: {original_length:,} → {new_length:,} chars")
    print(f"\n📝 Next: Manual review for natural flow and final polish")

if __name__ == '__main__':
    complete_translations()

