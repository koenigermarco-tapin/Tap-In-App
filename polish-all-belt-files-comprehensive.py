#!/usr/bin/env python3
"""
Comprehensive polish of ALL belt files (White to Black)
Fixes remaining mixed patterns, explanations, and edge cases
"""

from pathlib import Path
import re

def polish_file(de_file):
    """Comprehensive polish of a German belt file"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Comprehensive fixes for all remaining patterns
    fixes = [
        # Explanation patterns - Extreme Ownership
        (r'Perfect understanding von \'Extreme Ownership\.\'',
         'Perfektes Verständnis von "Extreme Ownership".'),
        (r'Perfect understanding of \'Extreme Ownership\.\'',
         'Perfektes Verständnis von "Extreme Ownership".'),
        (r'Before du can lead them forward',
         'Bevor du sie nach vorne führen kannst'),
        (r'Before you can lead them forward',
         'Bevor du sie nach vorne führen kannst'),
        (r'du must take ownership von their current state',
         'musst du Verantwortung für ihren aktuellen Zustand übernehmen'),
        (r'you must take ownership of their current state',
         'musst du Verantwortung für ihren aktuellen Zustand übernehmen'),
        (r'even though du didn\'t create it',
         'auch wenn du ihn nicht geschaffen hast'),
        (r'even though you didn\'t create it',
         'auch wenn du ihn nicht geschaffen hast'),
        (r'\'I own this mess, and I\'m going to fix it WITH du\.\'',
         '"Ich bin für dieses Chaos verantwortlich und ich werde es MIT dir beheben."'),
        (r'\'I own this mess, and I\'m going to fix it WITH you\.\'',
         '"Ich bin für dieses Chaos verantwortlich und ich werde es MIT dir beheben."'),
        (r'Only after taking ownership can du credibly ask',
         'Erst nach der Übernahme der Verantwortung kannst du glaubwürdig verlangen'),
        (r'Only after taking ownership can you credibly ask',
         'Erst nach der Übernahme der Verantwortung kannst du glaubwürdig verlangen'),
        (r'leadership starts with owning everything in dein world',
         'Führung beginnt damit, Verantwortung für alles in deiner Welt zu übernehmen'),
        (r'leadership starts with owning everything in your world',
         'Führung beginnt damit, Verantwortung für alles in deiner Welt zu übernehmen'),
        
        # Savior complex explanation
        (r'Du\'ve identified',
         'Du hast identifiziert'),
        (r'You\'ve identified',
         'Du hast identifiziert'),
        (r'When leaders are too good',
         'Wenn Führungskräfte zu gut sind'),
        (r'dein input, even when helpful',
         'dein Input, auch wenn hilfreich'),
        (r'your input, even when helpful',
         'dein Input, auch wenn hilfreich'),
        (r'robs others von ownership',
         'raubt anderen die Verantwortung'),
        (r'robs others of ownership',
         'raubt anderen die Verantwortung'),
        (r'when dein strength becomes',
         'wann deine Stärke wird'),
        (r'when your strength becomes',
         'wann deine Stärke wird'),
        (r'bite dein tongue',
         'beiße auf die Zunge'),
        (r'bite your tongue',
         'beiße auf die Zunge'),
        (r'coach AFTER the outcome',
         'coache NACH dem Ergebnis'),
        
        # Golden Circle explanation
        (r'Du understand the \'Golden Circle\.\'',
         'Du verstehst den "Golden Circle".'),
        (r'You understand the \'Golden Circle\.\'',
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
        (r'You know Kotter\'s 8-Step Process',
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
        
        # Adaptive leadership explanation
        (r'Perfect understanding von adaptive leadership',
         'Perfektes Verständnis von adaptiver Führung'),
        (r'Perfect understanding of adaptive leadership',
         'Perfektes Verständnis von adaptiver Führung'),
        (r'Technical challenges have known solutions',
         'Technische Herausforderungen haben bekannte Lösungen'),
        (r'apply expertise',
         'wende Expertise an'),
        (r'Adaptive challenges require learning',
         'Adaptive Herausforderungen erfordern Lernen'),
        (r'oft changing values',
         'oft Änderungen von Werten'),
        (r'often changing values',
         'oft Änderungen von Werten'),
        (r'work von change',
         'Arbeit der Veränderung'),
        (r'work of change',
         'Arbeit der Veränderung'),
        (r'can\'t be solved by authority alone',
         'nicht allein durch Autorität gelöst werden können'),
        (r'require mobilizing people',
         'erfordern, Menschen zu mobilisieren'),
        
        # Brené Brown explanation
        (r'It\'s showing up wenn du das Ergebnis nicht kontrollieren kannst the outcome',
         'Es ist Auftreten, wenn du das Ergebnis nicht kontrollieren kannst'),
        (r'It\'s showing up when you can\'t control the outcome',
         'Es ist Auftreten, wenn du das Ergebnis nicht kontrollieren kannst'),
        (r'It\'s asking for help when stuck',
         'Es ist um Hilfe bitten, wenn du feststeckst'),
        (r'It\'s admitting du es nicht weißt',
         'Es ist zuzugeben, dass du es nicht weißt'),
        (r'It\'s admitting you don\'t know',
         'Es ist zuzugeben, dass du es nicht weißt'),
        (r'It\'s having difficult conversations',
         'Es ist schwierige Gespräche führen'),
        (r'It\'s NOT oversharing personal problems',
         'Es ist NICHT persönliche Probleme übermäßig teilen'),
        (r'or making others responsible for deine Emotionen',
         'oder andere für deine Emotionen verantwortlich machen'),
        (r'or making others responsible for your emotions',
         'oder andere für deine Emotionen verantwortlich machen'),
        (r'Brown Belt vulnerability is strategic',
         'Brown Belt Verletzlichkeit ist strategisch'),
        (r'it builds trust, models courage',
         'sie baut Vertrauen auf, zeigt Mut'),
        (r'and creates safety for others to be real',
         'und schafft Sicherheit für andere, echt zu sein'),
        (r'It\'s strength, not weakness',
         'Es ist Stärke, keine Schwäche'),
        
        # Authenticity explanation
        (r'du bist immer YOU \(authentic\)',
         'Du bist immer DU (authentisch)'),
        (r'you\'re always YOU \(authentic\)',
         'Du bist immer DU (authentisch)'),
        (r'but wie du auftrittst adapts',
         'aber wie du auftrittst passt sich'),
        (r'but how you show up adapts',
         'aber wie du auftrittst passt sich'),
        (r'to context \(skillful\)',
         'dem Kontext an (geschickt)'),
        (r'Example: du bist immer honest',
         'Beispiel: Du bist immer ehrlich'),
        (r'Example: you\'re always honest',
         'Beispiel: Du bist immer ehrlich'),
        (r'\(authentic\), but du drückst',
         '(authentisch), aber du drückst'),
        (r'\(authentic\), but you express',
         '(authentisch), aber du drückst'),
        (r'du drückst feedback differently',
         'du drückst Feedback anders aus'),
        (r'you express feedback differently',
         'du drückst Feedback anders aus'),
        (r'Brown Belt leaders know',
         'Brown Belt Führungskräfte wissen'),
        (r'be authentic zu deinen Werten',
         'sei authentisch zu deinen Werten'),
        (r'be authentic to your values',
         'sei authentisch zu deinen Werten'),
        (r'skillful in deiner Ausdrucksweise',
         'geschickt in deiner Ausdrucksweise'),
        (r'skillful in your expression',
         'geschickt in deiner Ausdrucksweise'),
        (r'Rigid \'authenticity\' that ignores context',
         'Starre "Authentizität", die den Kontext ignoriert'),
        (r'isn\'t leadership - it\'s self-indulgence',
         'ist keine Führung - es ist Selbstgefälligkeit'),
        
        # Quiz answer options
        (r'Always being dich selbst, no matter what',
         'Immer du selbst sein, egal was'),
        (r'Always being yourself, no matter what',
         'Immer du selbst sein, egal was'),
        (r'Being consistently dich selbst',
         'Konsistent du selbst sein'),
        (r'Being consistently yourself',
         'Konsistent du selbst sein'),
        (r'while deinen Stil anpassen to context',
         'während du deinen Stil an den Kontext anpasst'),
        (r'while adapting your style to context',
         'während du deinen Stil an den Kontext anpasst'),
        (r'Mimicking successful leaders',
         'Erfolgreiche Führungskräfte nachahmen'),
        (r'until it becomes natural',
         'bis es natürlich wird'),
        
        # Question text fixes
        (r'Leadership presence and authenticity means:',
         'Führungspräsenz und Authentizität bedeutet:'),
        (r'True or False:',
         'Wahr oder Falsch:'),
        (r'True - vulnerability means',
         'Wahr - Verletzlichkeit bedeutet'),
        (r'False - vulnerability means',
         'Falsch - Verletzlichkeit bedeutet'),
        
        # Common "von" fixes
        (r'von adaptive',
         'von adaptiver'),
        (r'von change',
         'der Veränderung'),
        (r'oft changing',
         'oft Änderungen von'),
        (r'oft backfires',
         'oft fehlschlägt'),
        
        # Fix remaining "du" patterns in questions
        (r'When du see',
         'Wenn du siehst'),
        (r'When you see',
         'Wenn du siehst'),
        (r'When du notice',
         'Wenn du bemerkst'),
        (r'When you notice',
         'Wenn du bemerkst'),
        (r'When du know',
         'Wenn du weißt'),
        (r'When you know',
         'Wenn du weißt'),
        (r'When du miss',
         'Wenn du verpasst'),
        (r'When you miss',
         'Wenn du verpasst'),
        (r'If du',
         'Wenn du'),
        (r'If you',
         'Wenn du'),
        
        # Fix remaining answer option patterns
        (r'Only if it directly affects me',
         'Nur wenn es mich direkt betrifft'),
        (r'Sometimes, depending on relationship',
         'Manchmal, abhängig von der Beziehung'),
        (r'Regularly, when standards slip',
         'Regelmäßig, wenn Standards sinken'),
        (r'Always - we all own team performance',
         'Immer - wir alle tragen Verantwortung für Teamleistung'),
    ]
    
    for pattern, replacement in fixes:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # Fix specific duplicate/error patterns
    content = content.replace('tust du du', 'tust du')
    content = content.replace('wenn du das Ergebnis nicht kontrollieren kannst the outcome', 
                             'wenn du das Ergebnis nicht kontrollieren kannst')
    content = content.replace('(authentic), but du', '(authentisch), aber du')
    content = content.replace('(authentic), but you', '(authentisch), aber du')
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    print("=" * 80)
    print("✨ COMPREHENSIVE BELT PATH POLISH")
    print("=" * 80)
    print()
    
    # All belt stripe files (White to Black)
    all_files = [
        # White Belt
        'white-belt-stripe1-gamified-de.html',
        'white-belt-stripe2-gamified-de.html',
        'white-belt-stripe3-gamified-de.html',
        'white-belt-stripe4-gamified-de.html',
        # Blue Belt
        'blue-belt-stripe1-gamified-de.html',
        'blue-belt-stripe2-gamified-de.html',
        'blue-belt-stripe3-gamified-de.html',
        'blue-belt-stripe4-gamified-de.html',
        # Purple Belt
        'purple-belt-stripe1-gamified-de.html',
        'purple-belt-stripe2-gamified-de.html',
        'purple-belt-stripe3-gamified-de.html',
        'purple-belt-stripe4-gamified-de.html',
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
    
    polished = 0
    for f in all_files:
        print(f"✨ {f}...")
        if polish_file(f):
            polished += 1
            print(f"  ✅ Polished")
        else:
            print(f"  ⚠️  Skipped (not found)")
        print()
    
    print("=" * 80)
    print(f"✅ Polished {polished}/{len(all_files)} files")
    print("=" * 80)

if __name__ == '__main__':
    main()

