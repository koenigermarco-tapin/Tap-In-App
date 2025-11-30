#!/usr/bin/env python3
"""
Comprehensive German translation fixes for White Belt Stripes 2-4
Fixes all remaining English text patterns
"""

from pathlib import Path
import re

def fix_all_english_patterns():
    """Fix all common English patterns in White Belt files"""
    
    files = {
        'white-belt-stripe2-gamified-de.html': 'White Belt Stripe 2',
        'white-belt-stripe3-gamified-de.html': 'White Belt Stripe 3',
        'white-belt-stripe4-gamified-de.html': 'White Belt Stripe 4',
    }
    
    # Comprehensive translation patterns
    translations = [
        # Quiz failure messages
        (r'You Got Submitted by a White Belt! 🥋', 'Du wurdest von einem White Belt submitted! 🥋'),
        (r'A white belt just showed you there\'s more to learn\.', 'Ein White Belt hat dir gerade gezeigt, dass es noch mehr zu lernen gibt.'),
        (r'Im BJJ: getting submitted is how you learn\.', 'Im BJJ: Submitted zu werden ist, wie du lernst.'),
        (r'Review the sections below and try again!', 'Schaue dir die Abschnitte unten an und versuche es erneut!'),
        (r'Scroll up to review the lessons and scenarios, then retry the quiz!', 'Scrolle nach oben, um die Lektionen und Szenarien zu wiederholen, dann versuche das Quiz erneut!'),
        
        # Progress messages
        (r'Your progress will be saved\.', 'Dein Fortschritt wird gespeichert.'),
        (r'You can continue from', 'Du kannst fortfahren von'),
        (r'anytime', 'jederzeit'),
        (r'Return to Gym Dashboard\?', 'Zurück zum Gym Dashboard?'),
        
        # Quiz content
        (r'Score: (\d+)/10 \(Need (\d+)/10 to pass\)', r'Punktzahl: \1/10 (Benötigt \2/10 zum Bestehen)'),
        (r'Review These Frages:', 'Wiederhole diese Fragen:'),
        (r'Tip:', 'Tipp:'),
        
        # Lesson content patterns
        (r'there\'s a concept called', 'es gibt ein Konzept namens'),
        (r'your opponent can choke you', 'dein Gegner kann dich würgen'),
        (r'you can\'t see what\'s coming', 'du kannst nicht sehen, was kommt'),
        (r'No one voluntarily gives their back', 'Niemand gibt freiwillig seinen Rücken'),
        (r'When you give your back intentionally', 'Wenn du deinen Rücken absichtlich gibst'),
        (r'you\'re saying:', 'sagst du:'),
        (r'I trust you not to destroy me', 'Ich vertraue dir, mich nicht zu zerstören'),
        (r'Let\'s work on escape techniques', 'Lass uns an Fluchttechniken arbeiten'),
        (r'Someone has to go first', 'Jemand muss den ersten Schritt machen'),
        (r'it must be the leader', 'es muss der Leader sein'),
        
        # Quiz answer options
        (r'Believing you can speak up without risk von punishment or humiliation', 
         'Die Überzeugung, dass du dich äußern kannst ohne Bestrafung oder Demütigung zu riskieren'),
        (r'Only speak when you have the answer', 'Sprich nur, wenn du die Antwort hast'),
        (r'Trust takes time and consistency\. While you can start building it sofort', 
         'Vertrauen braucht Zeit und Konsistenz. Während du es sofort aufbauen kannst'),
        (r'strong trust develops over months and years von reliable behavior', 
         'starkes Vertrauen entwickelt sich über Monate und Jahre von zuverlässigem Verhalten'),
        
        # Lesson instructions
        (r'You can pass, but we encourage you to lean in\.', 
         'Du kannst passen, aber wir ermutigen dich, dich darauf einzulassen.'),
        (r'You can coach others and build trust systems', 
         'Du kannst andere coachen und Vertrauenssysteme aufbauen'),
        (r'you\'ll unlock', 'wirst du freischalten'),
        (r'you can\'t have productive conflict without', 
         'du kannst keinen produktiven Konflikt haben ohne'),
        (r'You\'ll pass if you can actually do the thing', 
         'Du wirst bestehen, wenn du die Sache tatsächlich umsetzen kannst'),
        (r'It\'s a demonstration von embodied trust-building capability', 
         'Es ist eine Demonstration von verkörperter Vertrauensaufbau-Fähigkeit'),
        (r'isn\'t a test you can cram for', 'ist kein Test, für den du pauken kannst'),
        (r'The questions get progressively more personal', 
         'Die Fragen werden zunehmend persönlicher'),
        (r'Each round, everyone shares something', 
         'In jeder Runde teilt jeder etwas'),
        (r'We\'re going to do three rounds', 'Wir machen drei Runden'),
        
        # Function name fixes (should keep English, but fix user-facing strings)
        (r'scrollToLektions\(\)', 'scrollToLessons()'),  # Fix function call
        (r'getStreifenNumber\(\)', 'getStripeNumber()'),  # Fix function call
        
        # Mixed patterns
        (r'von reliable behavior', 'von zuverlässigem Verhalten'),
        (r'von embodied', 'von verkörperter'),
    ]
    
    total_changes = 0
    
    for filepath_str, name in files.items():
        filepath = Path(filepath_str)
        if not filepath.exists():
            print(f"❌ {filepath_str} not found")
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        file_changes = 0
        for pattern, replacement in translations:
            matches = list(re.finditer(pattern, content, re.IGNORECASE))
            if matches:
                # Replace all matches
                new_content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
                if new_content != content:
                    content = new_content
                    file_changes += len(matches)
        
        if file_changes > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ {name}: Fixed {file_changes} pattern(s)")
            total_changes += file_changes
        else:
            print(f"✅ {name}: No additional fixes needed")
    
    return total_changes

def main():
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE WHITE BELT GERMAN TRANSLATION FIXES")
    print("=" * 80)
    print()
    
    total = fix_all_english_patterns()
    
    print()
    print("=" * 80)
    print(f"📊 TOTAL: Fixed {total} translation pattern(s) across all files")
    print("=" * 80)

if __name__ == '__main__':
    main()

