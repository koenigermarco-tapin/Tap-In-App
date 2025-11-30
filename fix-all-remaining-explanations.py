#!/usr/bin/env python3
"""
Fix all remaining mixed patterns in explanations
"""

from pathlib import Path
import re

def fix_all_explanations(de_file):
    """Fix all remaining explanation issues"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix remaining mixed patterns in explanations
    fixes = [
        # Extreme Ownership explanation
        (r'Perfect understanding von \'Extreme Ownership\.\'',
         'Perfektes Verständnis von "Extreme Ownership".'),
        (r'Before du can lead them forward',
         'Bevor du sie nach vorne führen kannst'),
        (r'du must take ownership von their current state',
         'musst du Verantwortung für ihren aktuellen Zustand übernehmen'),
        (r'even though du didn\'t create it',
         'auch wenn du ihn nicht geschaffen hast'),
        (r'Dieses Paradoxon baut Vertrauen auf: \'I own this mess, and I\'m going to fix it WITH du\.\'',
         'Dieses Paradoxon baut Vertrauen auf: "Ich bin für dieses Chaos verantwortlich und ich werde es MIT dir beheben."'),
        (r'Only after taking ownership can du credibly ask them to own their piece',
         'Erst nach der Übernahme der Verantwortung kannst du glaubwürdig verlangen, dass sie ihren Teil übernehmen'),
        (r'Das ist Jockos Kernlehre - leadership starts with owning everything in dein world',
         'Das ist Jockos Kernlehre - Führung beginnt damit, Verantwortung für alles in deiner Welt zu übernehmen'),
        
        # Savior complex explanation
        (r'Du\'ve identified',
         'Du hast identifiziert'),
        (r'When leaders are too good',
         'Wenn Führungskräfte zu gut sind'),
        (r'dein input, even when helpful',
         'dein Input, auch wenn hilfreich'),
        (r'robs others von ownership',
         'raubt anderen die Verantwortung'),
        (r'when dein strength becomes',
         'wann deine Stärke wird'),
        (r'bite dein tongue',
         'beiße auf die Zunge'),
        (r'coach AFTER the outcome',
         'coache NACH dem Ergebnis'),
        
        # Golden Circle explanation
        (r'Du understand the \'Golden Circle\.\'',
         'Du verstehst den "Golden Circle".'),
        (r'Inspiring leaders start with WHY',
         'Inspirierende Führungskräfte beginnen mit WARUM'),
        (r'Most organizations communicate backwards',
         'Die meisten Organisationen kommunizieren rückwärts'),
        (r'See the difference\?',
         'Siehst du den Unterschied?'),
        (r'Purpose before product',
         'Zweck vor Produkt'),
        (r'Belief before features',
         'Glaube vor Features'),
        (r'inspire through WHY',
         'inspirieren durch WARUM'),
        
        # Kotter explanation
        (r'Du know Kotter\'s 8-Step Process',
         'Du kennst Kotters 8-Schritte-Prozess'),
        (r'Step 1 is \'Create Urgency\'',
         'Schritt 1 ist "Dringlichkeit schaffen"'),
        (r'people won\'t change unless',
         'Menschen ändern sich nicht, es sei denn'),
        (r'logic doesn\'t drive change',
         'Logik treibt keine Veränderung an'),
        (r'emotion does',
         'Emotionen tun es'),
        (r'make the status quo feel riskier',
         'den Status quo riskanter erscheinen lassen'),
        
        # Brené Brown explanation
        (r'It\'s showing up wenn du das Ergebnis nicht kontrollieren kannst the outcome',
         'Es ist Auftreten, wenn du das Ergebnis nicht kontrollieren kannst'),
        (r'It\'s admitting du es nicht weißt',
         'Es ist zuzugeben, dass du es nicht weißt'),
        
        # Authenticity explanation
        (r'du bist immer YOU \(authentic\)',
         'Du bist immer DU (authentisch)'),
        (r'but wie du auftrittst adapts',
         'aber wie du auftrittst passt sich'),
        (r'to context \(skillful\)',
         'dem Kontext an (geschickt)'),
        (r'Example: du bist immer honest',
         'Beispiel: Du bist immer ehrlich'),
        (r'du drückst feedback differently',
         'du drückst Feedback anders aus'),
        (r'Brown Belt leaders know',
         'Brown Belt Führungskräfte wissen'),
        (r'be authentic zu deinen Werten',
         'sei authentisch zu deinen Werten'),
        (r'skillful in deiner Ausdrucksweise',
         'geschickt in deiner Ausdrucksweise'),
        
        # Quiz answer options
        (r'Always being dich selbst',
         'Immer du selbst sein'),
        (r'Being consistently dich selbst',
         'Konsistent du selbst sein'),
        (r'while deinen Stil anpassen to context',
         'während du deinen Stil an den Kontext anpasst'),
        (r'Mimicking successful leaders',
         'Erfolgreiche Führungskräfte nachahmen'),
        (r'until it becomes natural',
         'bis es natürlich wird'),
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
        print(f"📄 {f}...")
        if fix_all_explanations(f):
            print(f"  ✅ Fixed")
        print()

if __name__ == '__main__':
    main()

