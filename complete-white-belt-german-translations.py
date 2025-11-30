#!/usr/bin/env python3
"""
Complete German translations for White Belt Stripes 2-4
Fixes all remaining English text to natural German (Du-form)
"""

from pathlib import Path
import re

def translate_white_belt_stripe2():
    """Complete translation for White Belt Stripe 2"""
    filepath = Path('white-belt-stripe2-gamified-de.html')
    
    if not filepath.exists():
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = [
        # Quiz failure messages
        (
            '<h3 style="color: #dc2626; margin-bottom: 1rem; font-size: 1.5rem;">You Got Submitted by a White Belt! 🥋</h3>',
            '<h3 style="color: #dc2626; margin-bottom: 1rem; font-size: 1.5rem;">Du wurdest von einem White Belt submitted! 🥋</h3>'
        ),
        # Lesson content - mixed English
        (
            'Im BJJ: there\'s a concept called "giving your back." It\'s one von the worst positions—your opponent can choke you, and you can\'t see what\'s coming. No one voluntarily gives their back in competition.',
            'Im BJJ: Es gibt ein Konzept namens "giving your back" (Deinen Rücken geben). Es ist eine der schlimmsten Positionen—dein Gegner kann dich würgen, und du kannst nicht sehen, was kommt. Niemand gibt freiwillig seinen Rücken im Wettkampf.'
        ),
        # Quiz answer options
        (
            'B) Believing you can speak up without risk von punishment or humiliation',
            'B) Die Überzeugung, dass du dich äußern kannst ohne Bestrafung oder Demütigung zu riskieren'
        ),
        (
            'A) Only speak when you have the answer',
            'A) Sprich nur, wenn du die Antwort hast'
        ),
        # JavaScript strings
        (
            '"Your progress will be saved.\\n" +\n                "You can continue from Lektion " + currentLektion + " anytime.\\n\\n" +',
            '"Dein Fortschritt wird gespeichert.\\n" +\n                "Du kannst jederzeit von Lektion " + currentLektion + " fortfahren.\\n\\n" +'
        ),
    ]
    
    changes = 0
    for old, new in fixes:
        if old in content:
            content = content.replace(old, new)
            changes += 1
            print(f"  ✓ Fixed: {old[:60]}...")
        else:
            # Try case-insensitive
            pattern = re.escape(old)
            if re.search(pattern, content, re.IGNORECASE):
                content = re.sub(pattern, new, content, flags=re.IGNORECASE)
                changes += 1
                print(f"  ✓ Fixed (case-insensitive): {old[:60]}...")
    
    # Fix any remaining "you can", "you have", etc. in user-facing text
    # But be careful not to break JavaScript
    
    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ White Belt Stripe 2: Fixed {changes} issue(s)")
        return True
    else:
        print(f"⚠️  White Belt Stripe 2: No fixes found (may already be fixed)")
        return False

def translate_white_belt_stripe3():
    """Complete translation for White Belt Stripe 3"""
    filepath = Path('white-belt-stripe3-gamified-de.html')
    
    if not filepath.exists():
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = []
    
    # Find and fix common patterns
    common_fixes = [
        # Quiz failure message
        (r'You Got Submitted by a White Belt! 🥋', 'Du wurdest von einem White Belt submitted! 🥋'),
        # Progress messages
        (r'Your progress will be saved', 'Dein Fortschritt wird gespeichert'),
        (r'You can continue from', 'Du kannst fortfahren von'),
        (r'anytime', 'jederzeit'),
    ]
    
    changes = 0
    for pattern, replacement in common_fixes:
        matches = len(re.findall(pattern, content, re.IGNORECASE))
        if matches > 0:
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
            changes += matches
            print(f"  ✓ Fixed {matches} instance(s): {pattern[:50]}...")
    
    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ White Belt Stripe 3: Fixed {changes} issue(s)")
        return True
    else:
        print(f"⚠️  White Belt Stripe 3: No fixes found")
        return False

def translate_white_belt_stripe4():
    """Complete translation for White Belt Stripe 4"""
    filepath = Path('white-belt-stripe4-gamified-de.html')
    
    if not filepath.exists():
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = []
    
    # Find and fix common patterns
    common_fixes = [
        # Quiz failure message
        (r'You Got Submitted by a White Belt! 🥋', 'Du wurdest von einem White Belt submitted! 🥋'),
        # Progress messages
        (r'Your progress will be saved', 'Dein Fortschritt wird gespeichert'),
        (r'You can continue from', 'Du kannst fortfahren von'),
        (r'anytime', 'jederzeit'),
    ]
    
    changes = 0
    for pattern, replacement in common_fixes:
        matches = len(re.findall(pattern, content, re.IGNORECASE))
        if matches > 0:
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
            changes += matches
            print(f"  ✓ Fixed {matches} instance(s): {pattern[:50]}...")
    
    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ White Belt Stripe 4: Fixed {changes} issue(s)")
        return True
    else:
        print(f"⚠️  White Belt Stripe 4: No fixes found")
        return False

def main():
    print("=" * 80)
    print("🇩🇪 COMPLETING WHITE BELT GERMAN TRANSLATIONS")
    print("=" * 80)
    print()
    
    results = []
    
    print("📄 White Belt Stripe 2...")
    results.append(('White Belt Stripe 2', translate_white_belt_stripe2()))
    print()
    
    print("📄 White Belt Stripe 3...")
    results.append(('White Belt Stripe 3', translate_white_belt_stripe3()))
    print()
    
    print("📄 White Belt Stripe 4...")
    results.append(('White Belt Stripe 4', translate_white_belt_stripe4()))
    print()
    
    print("=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    
    fixed = sum(1 for _, success in results if success)
    total = len(results)
    
    for name, success in results:
        status = "✅" if success else "⚠️"
        print(f"  {status} {name}")
    
    print(f"\n✅ Processed {fixed}/{total} file(s)")
    print("\n" + "=" * 80)

if __name__ == '__main__':
    main()
