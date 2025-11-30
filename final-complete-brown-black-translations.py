#!/usr/bin/env python3
"""
FINAL complete translation pass for Brown and Black belts
Fixes ALL remaining English text in questions, explanations, and answers
"""

from pathlib import Path
import re

def final_translation_pass(de_file):
    """Final comprehensive translation pass"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Comprehensive translation patterns
    translations = [
        # Question text patterns
        (r'Du want to shift',
         'Du willst ändern'),
        (r'You want to shift',
         'Du willst ändern'),
        (r"dein team's culture",
         'die Kultur deines Teams'),
        (r"your team's culture",
         'die Kultur deines Teams'),
        (r"from 'blame and hide mistakes'",
         'von "Schuldzuweisung und Fehler verstecken"'),
        (r"to 'learn from failures.'",
         'zu "aus Fehlern lernen."'),
        (r'According to Schein, du must:',
         'Laut Schein musst du:'),
        (r'According to Schein, you must:',
         'Laut Schein musst du:'),
        (r'Google\'s Project Aristotle found',
         'Googles Projekt Aristoteles fand heraus'),
        (r'that psychological safety was',
         'dass psychologische Sicherheit'),
        (r'the #1 predictor von',
         'der beste Prädiktor für'),
        (r'the #1 predictor of',
         'der beste Prädiktor für'),
        (r'At the organizational level, this means:',
         'Auf organisatorischer Ebene bedeutet dies:'),
        
        # Explanation patterns
        (r'Culture change requires changing deep assumptions',
         'Kulturwandel erfordert die Änderung tiefgreifender Annahmen'),
        (r', not just behaviors\.',
         ', nicht nur Verhalten.'),
        (r"The assumption 'mistakes = incompetence'",
         'Die Annahme "Fehler = Inkompetenz"'),
        (r'drives hiding behavior\.',
         'treibt verstecktes Verhalten an.'),
        (r"Challenge this: 'Mistakes are data, not judgment\.'",
         'Fordere dies heraus: "Fehler sind Daten, kein Urteil."'),
        (r"We hide mistakes to avoid looking incompetent,",
         'Wir verstecken Fehler, um nicht inkompetent zu wirken,'),
        (r'but hiding mistakes IS incompetence\.\'',
         'aber Fehler zu verstecken IST Inkompetenz."'),
        (r'Make mistakes safe to discuss by modeling it dich selbst\.',
         'Mache Fehler sicher zu besprechen, indem du dich selbst modellierst.'),
        (r'Make mistakes safe to discuss by modeling it yourself\.',
         'Mache Fehler sicher zu besprechen, indem du dich selbst modellierst.'),
        (r'Brown Belt culture change works at the assumption level',
         'Brown Belt Kulturwandel funktioniert auf der Annahmenebene'),
        (r'change the invisible beliefs, and behaviors shift naturally\.',
         'ändere die unsichtbaren Überzeugungen, und Verhalten verschiebt sich natürlich.'),
        
        # Psychological safety explanation
        (r"Psychological safety isn't about eliminating conflict",
         'Psychologische Sicherheit geht nicht darum, Konflikte zu eliminieren'),
        (r"it's about creating safety to engage in productive conflict\. It means:",
         'es geht darum, Sicherheit zu schaffen, um an produktiven Konflikten teilzunehmen. Es bedeutet:'),
        (r"'I can speak up without fear von punishment or humiliation\.'",
         '"Ich kann mich äußern, ohne Angst vor Bestrafung oder Demütigung."'),
        (r"'I can speak up without fear of punishment or humiliation\.'",
         '"Ich kann mich äußern, ohne Angst vor Bestrafung oder Demütigung."'),
        (r'This requires leaders who:',
         'Dies erfordert Führungskräfte, die:'),
        (r'respond to mistakes with curiosity \(not blame\),',
         'auf Fehler mit Neugier reagieren (nicht mit Schuldzuweisung),'),
        (r'invite dissent \(not agreement\),',
         'Widerspruch einladen (nicht Übereinstimmung),'),
        (r'admit their own fallibility\.',
         'ihre eigene Fehlbarkeit zugeben.'),
        (r'Brown Belt leaders build psychological safety',
         'Brown Belt Führungskräfte bauen psychologische Sicherheit auf'),
        (r'by modeling vulnerability and rewarding candor',
         'durch Modellieren von Verletzlichkeit und Belohnen von Offenheit'),
        (r'creating culture where truth-telling is safe\.',
         'und schaffen eine Kultur, in der Wahrheitssprechen sicher ist.'),
        
        # Answer options
        (r'A\) Change visible behaviors first - reward transparency, punish hiding mistakes',
         'A) Ändere zuerst sichtbares Verhalten - belohne Transparenz, bestrafe Fehler verstecken'),
        (r'B\) Surface the unconscious assumption that \'mistakes mean incompetence\' and challenge it directly',
         'B) Lege die unbewusste Annahme auf, dass "Fehler Inkompetenz bedeuten" und fordere sie direkt heraus'),
        (r'C\) Create new values statements about learning from failure',
         'C) Erstelle neue Werteerklärungen über Lernen aus Fehlern'),
        (r'D\) Hire people who already demonstrate the desired culture',
         'D) Stelle Menschen ein, die bereits die gewünschte Kultur demonstrieren'),
        (r'A\) Creating environments where people feel safe to take risks and be vulnerable',
         'A) Umgebungen schaffen, in denen sich Menschen sicher fühlen, Risiken einzugehen und verletzlich zu sein'),
        (r'B\) Eliminating all conflict and ensuring everyone gets along',
         'B) Alle Konflikte eliminieren und sicherstellen, dass alle miteinander auskommen'),
        (r'C\) Hiring people who naturally fit the culture',
         'C) Menschen einstellen, die natürlich zur Kultur passen'),
        (r'D\) Having clear performance metrics and accountability',
         'D) Klare Leistungskennzahlen und Verantwortlichkeit haben'),
        
        # Common patterns
        (r'that Verantwortlichkeit',
         'dass Verantwortlichkeit'),
        (r'addressing this person',
         'anzusprechen dieser Person'),
        (r'dich selbst\.',
         'dich selbst.'),
        (r'von punishment',
         'vor Bestrafung'),
        (r'of punishment',
         'vor Bestrafung'),
        (r'von team',
         'für Team'),
        (r'of team',
         'für Team'),
    ]
    
    for pattern, replacement in translations:
        content = re.sub(pattern, replacement, content)
    
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
    
    print("=" * 80)
    print("✨ FINAL TRANSLATION PASS - BROWN & BLACK BELTS")
    print("=" * 80)
    print()
    
    for f in files:
        print(f"✨ {f}...")
        if final_translation_pass(f):
            print(f"  ✅ Completed")
        print()
    
    print("=" * 80)
    print("✅ FINAL PASS COMPLETE")
    print("=" * 80)

if __name__ == '__main__':
    main()

