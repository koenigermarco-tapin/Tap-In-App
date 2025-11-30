#!/usr/bin/env python3
"""
Comprehensive translation of quiz explanations
Translates all remaining English in quiz explanation attributes
"""

from pathlib import Path
import re

def translate_explanations(de_file):
    """Translate all quiz explanations"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Explanation translations
    explanation_fixes = [
        # Common patterns in explanations
        (r'Du\'re always YOU \(authentic\)',
         'Du bist immer DU (authentisch)'),
        (r'Du\'re always',
         'Du bist immer'),
        (r'how du show up',
         'wie du auftrittst'),
        (r'du show up',
         'du auftrittst'),
        (r'du express',
         'du drückst'),
        (r'du express feedback',
         'du Feedback ausdrückst'),
        (r'to deine Werte',
         'zu deinen Werten'),
        (r'in deine Ausdrucksweise',
         'in deiner Ausdrucksweise'),
        (r'deine Werte',
         'deine Werte'),  # Keep as is
        (r'deine Ausdrucksweise',
         'deine Ausdrucksweise'),  # Keep as is
        (r'when du can\'t',
         'wenn du nicht kannst'),
        (r'when du don\'t',
         'wenn du nicht'),
        (r'wenn du nicht kannst control',
         'wenn du das Ergebnis nicht kontrollieren kannst'),
        (r'du don\'t know',
         'du es nicht weißt'),
        (r'deine Emotionen',
         'deine Emotionen'),  # Keep as is
        (r'dein weaknesses',
         'deine Schwächen'),
        (r'deinself',
         'dich selbst'),
        (r'Always being deinself',
         'Immer du selbst sein'),
        (r'Being consistently deinself',
         'Konsistent du selbst sein'),
        (r'adapting dein style',
         'deinen Stil anpassen'),
        (r'dein style',
         'deinen Stil'),
        
        # Brené Brown explanation
        (r'Brené Brown clarifies: vulnerability isn\'t weakness - it\'s courage\.',
         'Brené Brown klärt auf: Verletzlichkeit ist keine Schwäche - es ist Mut.'),
        (r'It\'s showing up wenn du nicht kannst control the outcome\.',
         'Es ist Auftreten, wenn du das Ergebnis nicht kontrollieren kannst.'),
        (r'It\'s asking for help when stuck\.',
         'Es ist um Hilfe bitten, wenn du feststeckst.'),
        (r'It\'s admitting du don\'t know\.',
         'Es ist zuzugeben, dass du es nicht weißt.'),
        (r'It\'s having difficult conversations\.',
         'Es ist schwierige Gespräche führen.'),
        (r'It\'s NOT oversharing personal problems',
         'Es ist NICHT persönliche Probleme übermäßig teilen'),
        (r'or making others responsible for deine Emotionen\.',
         'oder andere für deine Emotionen verantwortlich machen.'),
        (r'Brown Belt vulnerability is strategic',
         'Brown Belt Verletzlichkeit ist strategisch'),
        (r'it builds trust, models courage',
         'sie baut Vertrauen auf, zeigt Mut'),
        (r'and creates safety for others to be real\.',
         'und schafft Sicherheit für andere, echt zu sein.'),
        (r'It\'s strength, not weakness\.',
         'Es ist Stärke, keine Schwäche.'),
        
        # Authenticity explanation
        (r'Authenticity isn\'t rigid consistency',
         'Authentizität ist keine starre Konsistenz'),
        (r'it\'s consistent values with adaptable expression\.',
         'es sind konsistente Werte mit anpassbarer Ausdrucksweise.'),
        (r'Du\'re always YOU \(authentic\), but how du show up adapts to context \(skillful\)\.',
         'Du bist immer DU (authentisch), aber wie du auftrittst passt sich dem Kontext an (geschickt).'),
        (r'Example: Du\'re always honest \(authentic\), but du express feedback differently',
         'Beispiel: Du bist immer ehrlich (authentisch), aber du drückst Feedback anders aus'),
        (r'to a junior vs\. senior person \(skillful\)\.',
         'zu einer Junior- vs. Senior-Person (geschickt).'),
        (r'Brown Belt leaders know: be authentic to deine Werte, skillful in deine Ausdrucksweise\.',
         'Brown Belt Führungskräfte wissen: sei authentisch zu deinen Werten, geschickt in deiner Ausdrucksweise.'),
        (r'Rigid \'authenticity\' that ignores context isn\'t leadership - it\'s self-indulgence\.',
         'Starre "Authentizität", die den Kontext ignoriert, ist keine Führung - es ist Selbstgefälligkeit.'),
        
        # Extreme Ownership explanation
        (r'Perfect understanding of \'Extreme Ownership\.\'',
         'Perfektes Verständnis von "Extreme Ownership".'),
        (r'Before you can lead them forward',
         'Bevor du sie nach vorne führen kannst'),
        (r'you must take ownership of their current state',
         'musst du Verantwortung für ihren aktuellen Zustand übernehmen'),
        (r'even though you didn\'t create it\.',
         'auch wenn du ihn nicht geschaffen hast.'),
        (r'This paradox builds trust:',
         'Dieses Paradoxon baut Vertrauen auf:'),
        (r'\'I own this mess, and I\'m going to fix it WITH you\.\'',
         '"Ich bin für dieses Chaos verantwortlich und ich werde es MIT dir beheben."'),
        (r'Only after taking ownership can you credibly ask them to own their piece\.',
         'Erst nach der Übernahme der Verantwortung kannst du glaubwürdig verlangen, dass sie ihren Teil übernehmen.'),
        (r'This is Jocko\'s core teaching',
         'Das ist Jockos Kernlehre'),
        (r'leadership starts with owning everything in your world\.',
         'Führung beginnt damit, Verantwortung für alles in deiner Welt zu übernehmen.'),
    ]
    
    for pattern, replacement in explanation_fixes:
        # Fix in data-explanation attributes
        content = re.sub(
            rf'data-explanation="{re.escape(pattern)}"',
            f'data-explanation="{re.escape(replacement)}"',
            content
        )
        # Also fix if pattern appears in explanation text
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
        print(f"📄 {f}...")
        if translate_explanations(f):
            print(f"  ✅ Explanations translated")
        print()

if __name__ == '__main__':
    main()

