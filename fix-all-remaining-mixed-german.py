#!/usr/bin/env python3
"""
Comprehensive fix for all remaining mixed English/German patterns
"""

from pathlib import Path
import re

def fix_all_mixed_patterns(de_file):
    """Fix all remaining mixed patterns"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Comprehensive fixes
    fixes = [
        # Question patterns - "du" usage
        (r'"When du see',
         '"Wenn du siehst'),
        (r'"When du ',
         '"Wenn du '),
        (r'"If du',
         '"Wenn du'),
        (r'"ist dein Ansatz to',
         '"Dein Ansatz zu'),
        (r'ist dein Ansatz to peer accountability is\.\.\.',
         'Dein Ansatz zu Peer-Verantwortlichkeit ist...'),
        (r'"Wenn du musst to',
         '"Wenn du musst, um'),
        (r'"Wenn jemand fragt du to',
         '"Wenn dich jemand bittet'),
        (r'"When others hold du accountable',
         '"Wenn andere dich zur Verantwortung ziehen'),
        (r'"When quality standards conflict with speed, du prioritize',
         '"Wenn Qualitätsstandards mit Geschwindigkeit kollidieren, priorisierst du'),
        (r'"Dein comfort with',
         '"Dein Komfort mit'),
        (r'"Dein non-negotiable standards',
         '"Deine nicht verhandelbaren Standards'),
        
        # Answer option patterns
        (r'"Only if it directly affects me"',
         '"Nur wenn es mich direkt betrifft"'),
        (r'"Sometimes, depending on relationship"',
         '"Manchmal, abhängig von der Beziehung"'),
        (r'"Regularly, when standards slip"',
         '"Regelmäßig, wenn Standards sinken"'),
        (r'"Always - we all own team performance"',
         '"Immer - wir alle tragen Verantwortung für Teamleistung"'),
        
        (r'"Ruining the relationship completely"',
         '"Die Beziehung völlig zu ruinieren"'),
        (r'"Being seen as difficult or confrontational"',
         '"Als schwierig oder konfrontativ gesehen zu werden"'),
        (r'"How they\'ll react emotionally"',
         '"Wie sie emotional reagieren werden"'),
        (r'"Finding the right words"',
         '"Die richtigen Worte zu finden"'),
        (r'"Nothing - it\'s part von being a teammate"',
         '"Nichts - es ist Teil davon, ein Teammitglied zu sein"'),
        
        (r'"I work around them and say nothing"',
         '"Ich arbeite um sie herum und sage nichts"'),
        (r'"I complain privately but don\'t address it"',
         '"Ich beschwere mich privat, spreche es aber nicht an"'),
        (r'"I hint at the pattern indirectly"',
         '"Ich deute auf das Muster indirekt hin"'),
        (r'"I address it after multiple occurrences"',
         '"Ich spreche es nach mehreren Vorkommnissen an"'),
        (r'"I address it after the second occurrence"',
         '"Ich spreche es nach dem zweiten Vorkommnis an"'),
        
        (r'"It\'s the manager\'s job, not mine"',
         '"Es ist die Aufgabe des Managers, nicht meine"'),
        (r'"It\'s risky and oft backfires"',
         '"Es ist riskant und schlägt oft fehl"'),
        (r'"It\'s necessary but uncomfortable"',
         '"Es ist notwendig, aber unangenehm"'),
        (r'"It\'s important for team health"',
         '"Es ist wichtig für die Teamgesundheit"'),
        (r'"It\'s how high-performing teams operate"',
         '"So funktionieren hochleistungsfähige Teams"'),
        
        (r'"Attacked or criticized unfairly"',
         '"Ungerechtfertigt angegriffen oder kritisiert"'),
        (r'"Defensive and resistant"',
         '"Defensiv und widerständig"'),
        (r'"Uncomfortable but willing to listen"',
         '"Unangenehm, aber bereit zuzuhören"'),
        (r'"Appreciative von their courage"',
         '"Wertschätzend ihrer Courage"'),
        (r'"Grateful they cared enough to speak up"',
         '"Dankbar, dass sie genug kümmerten, um zu sprechen"'),
        
        (r'"Usually agree to avoid conflict"',
         '"Normalerweise zustimmen, um Konflikt zu vermeiden"'),
        (r'"Reluctantly agree while feeling uncomfortable"',
         '"Widerwillig zustimmen, während man sich unwohl fühlt"'),
        (r'"Negotiate a middle ground"',
         '"Einen Mittelweg aushandeln"'),
        (r'"Hold firm most von the time"',
         '"Die meiste Zeit standhaft bleiben"'),
        (r'"Never compromise - standards exist for a reason"',
         '"Niemals Kompromisse - Standards existieren aus einem Grund"'),
        
        (r'"Extremely uncomfortable - I avoid this role"',
         '"Extrem unangenehm - ich vermeide diese Rolle"'),
        (r'"Quite uncomfortable - I prefer flexibility"',
         '"Sehr unangenehm - ich bevorzuge Flexibilität"'),
        (r'"Neutral - I do it when absolutely necessary"',
         '"Neutral - ich tue es, wenn absolut notwendig"'),
        (r'"Comfortable - someone has to do it"',
         '"Komfortabel - jemand muss es tun"'),
        (r'"Very comfortable - clarity serves everyone"',
         '"Sehr komfortabel - Klarheit dient allen"'),
        
        (r'"Speed almost always - ship fast"',
         '"Geschwindigkeit fast immer - schnell ausliefern"'),
        (r'"Speed usually - quality can wait"',
         '"Geschwindigkeit normalerweise - Qualität kann warten"'),
        (r'"Depends on the situation"',
         '"Hängt von der Situation ab"'),
        (r'"Quality usually - rarely compromise"',
         '"Qualität normalerweise - selten Kompromisse"'),
        (r'"Quality always - never ship garbage"',
         '"Qualität immer - niemals Müll ausliefern"'),
        
        (r'"Unclear - I\'m flexible on most things"',
         '"Unklar - ich bin bei den meisten Dingen flexibel"'),
        (r'"Loosely defined - situation dependent"',
         '"Locker definiert - situationsabhängig"'),
        (r'"Somewhat defined - a few hard lines"',
         '"Etwas definiert - ein paar harte Linien"'),
        (r'"Clearly defined - several hard lines"',
         '"Klar definiert - mehrere harte Linien"'),
        (r'"Crystal clear - everyone knows my lines"',
         '"Klar wie Kristall - jeder kennt meine Linien"'),
        
        # More question patterns
        (r'"When du see quality slipping',
         '"Wenn du siehst, dass Qualität nachlässt'),
        (r'"When du notice',
         '"Wenn du bemerkst'),
        (r'"When du know',
         '"Wenn du weißt'),
        (r'"When du miss',
         '"Wenn du verpasst'),
        
        # Common mixed patterns
        (r'du worry',
         'sorgen du dich'),
        (r'du feel',
         'fühlst du'),
        (r'du prioritize',
         'priorisierst du'),
        (r'du address',
         'spricht du an'),
        (r'du hold',
         'hältst du'),
        (r'du see',
         'siehst du'),
        (r'du notice',
         'bemerkst du'),
        
        # Fix "von" misuse
        (r'part von being',
         'Teil davon, ein'),
        (r'most von the time',
         'die meiste Zeit'),
        (r'von the time',
         'der Zeit'),
        
        # Quiz explanation fixes
        (r'when du can\'t',
         'wenn du nicht kannst'),
        (r'when du don\'t',
         'wenn du nicht'),
        (r'dein emotions',
         'deine Emotionen'),
        (r'dein values',
         'deine Werte'),
        (r'dein expression',
         'deine Ausdrucksweise'),
    ]
    
    for pattern, replacement in fixes:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # Fix specific duplicate issues
    content = content.replace('tust du du', 'tust du')
    content = content.replace('ist dein Ansatz to', 'Dein Ansatz zu')
    content = content.replace('to peer accountability is', 'zu Peer-Verantwortlichkeit ist')
    
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
        if fix_all_mixed_patterns(f):
            print(f"  ✅ Fixed")
        print()

if __name__ == '__main__':
    main()

