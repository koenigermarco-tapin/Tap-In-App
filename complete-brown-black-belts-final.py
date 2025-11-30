#!/usr/bin/env python3
"""
Complete final translations for Brown and Black belts
Fixes ALL remaining English text, explanations, and edge cases
"""

from pathlib import Path
import re

def complete_file_translations(de_file):
    """Complete all translations in a file"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Comprehensive explanation translations
    explanation_translations = [
        # Organizational culture explanation (Brown Belt Stripe 2)
        (r'Perfect understanding von organizational culture! Schein shows that the deepest level is \'basic assumptions\' - beliefs so ingrained they\'re invisible\. Example: \'Conflict is dangerous\' \(assumption\) leads to \'We value collaboration\' \(value\) leads to \'No one challenges ideas in meetings\' \(artifact\)\. Du can\'t change culture by changing artifacts - du must surface and challenge the unconscious assumptions driving behavior\. This is Brown Belt organizational thinking\.',
         'Perfektes Verständnis von Organisationskultur! Schein zeigt, dass die tiefste Ebene "Grundannahmen" sind - Überzeugungen, die so tief verwurzelt sind, dass sie unsichtbar sind. Beispiel: "Konflikt ist gefährlich" (Annahme) führt zu "Wir schätzen Zusammenarbeit" (Wert) führt zu "Niemand stellt Ideen in Meetings in Frage" (Artefakt). Du kannst Kultur nicht ändern, indem du Artefakte änderst - du musst die unbewussten Annahmen, die das Verhalten antreiben, aufdecken und herausfordern. Das ist Brown Belt organisatorisches Denken.'),
        
        (r'Perfect understanding of organizational culture! Schein shows that the deepest level is \'basic assumptions\' - beliefs so ingrained they\'re invisible\. Example: \'Conflict is dangerous\' \(assumption\) leads to \'We value collaboration\' \(value\) leads to \'No one challenges ideas in meetings\' \(artifact\)\. You can\'t change culture by changing artifacts - you must surface and challenge the unconscious assumptions driving behavior\. This is Brown Belt organizational thinking\.',
         'Perfektes Verständnis von Organisationskultur! Schein zeigt, dass die tiefste Ebene "Grundannahmen" sind - Überzeugungen, die so tief verwurzelt sind, dass sie unsichtbar sind. Beispiel: "Konflikt ist gefährlich" (Annahme) führt zu "Wir schätzen Zusammenarbeit" (Wert) führt zu "Niemand stellt Ideen in Meetings in Frage" (Artefakt). Du kannst Kultur nicht ändern, indem du Artefakte änderst - du musst die unbewussten Annahmen, die das Verhalten antreiben, aufdecken und herausfordern. Das ist Brown Belt organisatorisches Denken.'),
        
        # Fix remaining "du" patterns in explanations
        (r'Du can\'t change culture',
         'Du kannst Kultur nicht ändern'),
        (r'You can\'t change culture',
         'Du kannst Kultur nicht ändern'),
        (r'du must surface and challenge',
         'du musst aufdecken und herausfordern'),
        (r'you must surface and challenge',
         'du musst aufdecken und herausfordern'),
        (r'the unconscious assumptions driving behavior',
         'die unbewussten Annahmen, die das Verhalten antreiben'),
        
        # Common remaining patterns
        (r'Du understand',
         'Du verstehst'),
        (r'You understand',
         'Du verstehst'),
        (r'Du know',
         'Du weißt'),
        (r'You know',
         'Du weißt'),
        (r'Du know addressing',
         'Du weißt, dass anzusprechen'),
        (r'You know addressing',
         'Du weißt, dass anzusprechen'),
        (r'will make powerful people uncomfortable',
         'mächtige Menschen unbehaglich machen wird'),
        (r'Du\.\.\.',
         'Du...'),
        (r'You\.\.\.',
         'Du...'),
        
        # Question text fixes
        (r'Du know addressing this person will make powerful people uncomfortable\. Du\.\.\.',
         'Du weißt, dass anzusprechen dieser Person mächtige Menschen unbehaglich machen wird. Du...'),
        (r'You know addressing this person will make powerful people uncomfortable\. You\.\.\.',
         'Du weißt, dass anzusprechen dieser Person mächtige Menschen unbehaglich machen wird. Du...'),
        
        # Strength/Edge fixes
        (r'Dein Strength:',
         'Deine Stärke:'),
        (r'Dein Edge:',
         'Dein Vorteil:'),
        (r'Du understand that Verantwortlichkeit ist',
         'Du verstehst, dass Verantwortlichkeit'),
        (r'a gift, not a burden',
         'ein Geschenk ist, keine Belastung'),
        (r'Keep modeling this for dein team',
         'Bleibe dabei, dies für dein Team zu modellieren'),
        (r'hardest when it matters most',
         'am schwierigsten ist, wenn es am wichtigsten ist'),
        (r'and that\'s exactly wenn du nicht compromise',
         'und das ist genau, wenn du keinen Kompromiss eingehen solltest'),
        
        # More explanation patterns
        (r'Perfektes Verständnis von',
         'Perfektes Verständnis von'),
        (r'zeigt, dass',
         'zeigt, dass'),
        (r'Example:',
         'Beispiel:'),
        (r'This is Brown Belt',
         'Das ist Brown Belt'),
        (r'This is Black Belt',
         'Das ist Black Belt'),
    ]
    
    # Apply explanation translations
    for pattern, replacement in explanation_translations:
        # Fix in data-explanation attributes
        content = re.sub(
            rf'data-explanation="{re.escape(pattern)}"',
            f'data-explanation="{re.escape(replacement)}"',
            content
        )
        # Also fix if it appears in text
        content = re.sub(pattern, replacement, content)
    
    # Additional fixes for common mixed patterns
    additional_fixes = [
        (r'Perfect understanding von organizational culture!',
         'Perfektes Verständnis von Organisationskultur!'),
        (r'Perfect understanding of organizational culture!',
         'Perfektes Verständnis von Organisationskultur!'),
        (r'Schein shows that',
         'Schein zeigt, dass'),
        (r'the deepest level is',
         'die tiefste Ebene ist'),
        (r'\'basic assumptions\'',
         '"Grundannahmen"'),
        (r'beliefs so ingrained they\'re invisible',
         'Überzeugungen, die so tief verwurzelt sind, dass sie unsichtbar sind'),
        (r'Example: \'Conflict is dangerous\'',
         'Beispiel: "Konflikt ist gefährlich"'),
        (r'\(assumption\) leads to',
         '(Annahme) führt zu'),
        (r'\'We value collaboration\'',
         '"Wir schätzen Zusammenarbeit"'),
        (r'\(value\) leads to',
         '(Wert) führt zu'),
        (r'\'No one challenges ideas in meetings\'',
         '"Niemand stellt Ideen in Meetings in Frage"'),
        (r'\(artifact\)',
         '(Artefakt)'),
        (r'Du can\'t change culture by changing artifacts',
         'Du kannst Kultur nicht ändern, indem du Artefakte änderst'),
        (r'You can\'t change culture by changing artifacts',
         'Du kannst Kultur nicht ändern, indem du Artefakte änderst'),
        (r'must surface and challenge',
         'musst aufdecken und herausfordern'),
        (r'the unconscious assumptions driving behavior',
         'die unbewussten Annahmen, die das Verhalten antreiben'),
        (r'This is Brown Belt organizational thinking',
         'Das ist Brown Belt organisatorisches Denken'),
        (r'This is Black Belt organizational thinking',
         'Das ist Black Belt organisatorisches Denken'),
    ]
    
    for pattern, replacement in additional_fixes:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    print("=" * 80)
    print("✨ COMPLETE BROWN & BLACK BELT TRANSLATIONS")
    print("=" * 80)
    print()
    
    files = [
        # Brown Belt
        'brown-belt-stripe1-gamified-de.html',
        'brown-belt-stripe2-gamified-de.html',
        'brown-belt-stripe3-gamified-de.html',
        'brown-belt-stripe4-gamified-de.html',
        # Black Belt
        'black-belt-stripe1-gamified-de.html',
        'black-belt-stripe2-gamified-de.html',
        'black-belt-stripe3-gamified-de.html',
        'black-belt-stripe4-gamified-de.html',
    ]
    
    completed = 0
    for f in files:
        print(f"✨ {f}...")
        if complete_file_translations(f):
            completed += 1
            print(f"  ✅ Completed")
        else:
            print(f"  ⚠️  Skipped")
        print()
    
    print("=" * 80)
    print(f"✅ Completed {completed}/{len(files)} files")
    print("=" * 80)

if __name__ == '__main__':
    main()

