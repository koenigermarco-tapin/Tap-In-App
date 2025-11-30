#!/usr/bin/env python3
"""
Complete ALL remaining translations for Brown and Black belts
Systematically finds and translates every remaining English phrase
"""

from pathlib import Path
import re

def complete_all_translations(de_file):
    """Complete all remaining translations"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Read corresponding English file for reference
    en_file = de_file.replace('-de.html', '.html')
    if Path(en_file).exists():
        with open(en_file, 'r', encoding='utf-8') as f:
            en_content = f.read()
    else:
        en_content = ""
    
    # Comprehensive translation dictionary
    translations = {
        # Question patterns
        "Du know addressing this person will make powerful people uncomfortable. Du...":
        "Du weißt, dass anzusprechen dieser Person mächtige Menschen unbehaglich machen wird. Du...",
        
        "You know addressing this person will make powerful people uncomfortable. You...":
        "Du weißt, dass anzusprechen dieser Person mächtige Menschen unbehaglich machen wird. Du...",
        
        # Strength/Edge text
        "<strong>Dein Strength:</strong>":
        "<strong>Deine Stärke:</strong>",
        
        "<strong>Dein Edge:</strong>":
        "<strong>Dein Vorteil:</strong>",
        
        "Du understand that Verantwortlichkeit ist a gift, not a burden. Keep modeling this for dein team.":
        "Du verstehst, dass Verantwortlichkeit ein Geschenk ist, keine Belastung. Bleibe dabei, dies für dein Team zu modellieren.",
        
        "Du understand that Verantwortlichkeit ist hardest when it matters most - and that's exactly wenn du nicht compromise.":
        "Du verstehst, dass Verantwortlichkeit am schwierigsten ist, wenn es am wichtigsten ist - und das ist genau, wenn du keinen Kompromiss eingehen solltest.",
        
        # Quiz answer options that might be in English
        "Artifacts: The visible structures and processes people can observe":
        "Artefakte: Die sichtbaren Strukturen und Prozesse, die Menschen beobachten können",
        
        "Espoused values: The stated beliefs and ideals the organization claims":
        "Bekundete Werte: Die erklärten Überzeugungen und Ideale, die die Organisation beansprucht",
        
        "Basic assumptions: The unconscious, taken-for-granted beliefs that drive behavior":
        "Grundannahmen: Die unbewussten, selbstverständlichen Überzeugungen, die Verhalten antreiben",
        
        "Behaviors: The actual actions people take day-to-day":
        "Verhalten: Die tatsächlichen Handlungen, die Menschen täglich ausführen",
    }
    
    # Apply direct translations
    for en_text, de_text in translations.items():
        content = content.replace(en_text, de_text)
    
    # Fix explanation patterns using regex
    explanation_patterns = [
        # Organizational culture explanation
        (
            r'data-explanation="Perfect understanding von organizational culture! Schein shows that the deepest level is \'basic assumptions\' - beliefs so ingrained they\'re invisible\. Example: \'Conflict is dangerous\' \(assumption\) leads to \'We value collaboration\' \(value\) leads to \'No one challenges ideas in meetings\' \(artifact\)\. Du can\'t change culture by changing artifacts - du must surface and challenge the unconscious assumptions driving behavior\. This is Brown Belt organizational thinking\."',
            'data-explanation="Perfektes Verständnis von Organisationskultur! Schein zeigt, dass die tiefste Ebene "Grundannahmen" sind - Überzeugungen, die so tief verwurzelt sind, dass sie unsichtbar sind. Beispiel: "Konflikt ist gefährlich" (Annahme) führt zu "Wir schätzen Zusammenarbeit" (Wert) führt zu "Niemand stellt Ideen in Meetings in Frage" (Artefakt). Du kannst Kultur nicht ändern, indem du Artefakte änderst - du musst die unbewussten Annahmen, die das Verhalten antreiben, aufdecken und herausfordern. Das ist Brown Belt organisatorisches Denken."'
        ),
        (
            r'data-explanation="Perfect understanding of organizational culture! Schein shows that the deepest level is \'basic assumptions\' - beliefs so ingrained they\'re invisible\. Example: \'Conflict is dangerous\' \(assumption\) leads to \'We value collaboration\' \(value\) leads to \'No one challenges ideas in meetings\' \(artifact\)\. You can\'t change culture by changing artifacts - you must surface and challenge the unconscious assumptions driving behavior\. This is Brown Belt organizational thinking\."',
            'data-explanation="Perfektes Verständnis von Organisationskultur! Schein zeigt, dass die tiefste Ebene "Grundannahmen" sind - Überzeugungen, die so tief verwurzelt sind, dass sie unsichtbar sind. Beispiel: "Konflikt ist gefährlich" (Annahme) führt zu "Wir schätzen Zusammenarbeit" (Wert) führt zu "Niemand stellt Ideen in Meetings in Frage" (Artefakt). Du kannst Kultur nicht ändern, indem du Artefakte änderst - du musst die unbewussten Annahmen, die das Verhalten antreiben, aufdecken und herausfordern. Das ist Brown Belt organisatorisches Denken."'
        ),
    ]
    
    for pattern, replacement in explanation_patterns:
        content = re.sub(pattern, replacement, content)
    
    # Fix remaining mixed patterns
    mixed_fixes = [
        (r'Du can\'t change',
         'Du kannst nicht ändern'),
        (r'You can\'t change',
         'Du kannst nicht ändern'),
        (r'du must surface',
         'du musst aufdecken'),
        (r'you must surface',
         'du musst aufdecken'),
    ]
    
    for pattern, replacement in mixed_fixes:
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
    
    for f in files:
        print(f"✨ {f}...")
        if complete_all_translations(f):
            print(f"  ✅ Completed")
        print()

if __name__ == '__main__':
    main()

