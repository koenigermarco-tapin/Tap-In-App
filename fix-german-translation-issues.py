#!/usr/bin/env python3
"""
Fix specific German translation issues identified in audit:
1. Blue Belt Stripe 2 - 3 Sie violations
2. Blue Belt Stripe 3 - 1 Sie violation
3. Blue Belt Stripe 4 - 2 missing -de.html links
4. Any additional issues from audit
"""

from pathlib import Path

def fix_blue_belt_stripe2():
    """Fix 3 Sie violations in Blue Belt Stripe 2"""
    filepath = Path('blue-belt-stripe2-gamified-de.html')
    
    if not filepath.exists():
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = [
        # Fix 1: Line 623 - "Sie warten darauf, dass sie an der Reihe sind."
        (
            '<p class="section-subtitle">Sie warten darauf, dass sie an der Reihe sind.</p>',
            '<p class="section-subtitle">Du wartest darauf, dass du an der Reihe bist.</p>'
        ),
        # Fix 2: Line 633 - "Sie sind so beschäftigt... Sie fühlen... Sie lesen..."
        (
            'Im Jiu-Jitsu stürzen sich White Belts darauf, Techniken auszuführen. Sie sind so beschäftigt, etwas zu TUN, dass sie verpassen, was ihr Partner ihnen gibt. Fortgeschrittene verlangsamen. Sie <em>fühlen</em>, bevor sie sich bewegen. Sie lesen die Energie, den Druck, die Absicht.',
            'Im Jiu-Jitsu stürzen sich White Belts darauf, Techniken auszuführen. Du bist so beschäftigt, etwas zu TUN, dass du verpasst, was dein Partner dir gibt. Fortgeschrittene verlangsamen. Du <em>fühlst</em>, bevor du dich bewegst. Du liest die Energie, den Druck, die Absicht.'
        ),
        # Fix 3: Line 1730 - "Sie lädt sie auch ein fortzufahren..."
        (
            '<p>Wenn jemand zu Ende spricht, warte 2 volle Sekunden, bevor Du antwortest. Diese winzige Lücke zeigt, dass Du verarbeitest, nicht nur wartest. Sie lädt sie auch ein fortzufahren, wenn sie mehr zu sagen haben.</p>',
            '<p>Wenn jemand zu Ende spricht, warte 2 volle Sekunden, bevor Du antwortest. Diese winzige Lücke zeigt, dass Du verarbeitest, nicht nur wartest. Das lädt sie auch ein fortzufahren, wenn sie mehr zu sagen haben.</p>'
        ),
    ]
    
    changes = 0
    for old, new in fixes:
        if old in content:
            content = content.replace(old, new)
            changes += 1
            print(f"  ✓ Fixed: {old[:50]}...")
        else:
            print(f"  ⚠️  Pattern not found: {old[:50]}...")
    
    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Blue Belt Stripe 2: Fixed {changes} issue(s)")
        return True
    else:
        print(f"❌ Blue Belt Stripe 2: No fixes applied")
        return False

def fix_blue_belt_stripe3():
    """Fix Sie violations in Blue Belt Stripe 3"""
    filepath = Path('blue-belt-stripe3-gamified-de.html')
    
    if not filepath.exists():
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = [
        # Fix: "Sie sind so vage oder unklar war, dass sie nicht darauf reagieren konnten"
        # Actually, this "sie" is third person (they/employees), not formal "Sie"
        # Need to check the actual issue - let me look for formal "Sie" that should be "Du"
        
        # Looking for patterns where "Sie" refers to the reader (formal) not third person
        # Based on context, "Ihre Forschung" on line 612 refers to Kim Scott's research - that's correct
        # The "sie" in "dass sie nicht darauf reagieren konnten" is third person (employees) - correct
        
        # Let me check the scenario options that might have formal Sie
    ]
    
    # Actually, I need to see the exact context. Let me check for formal Sie patterns
    # that address the reader directly
    
    # Check if there are any direct "Sie" forms addressing the user
    # The grep found some instances, but they might be third person
    
    # For now, let's check the scenario options more carefully
    # The user said there's 1 Sie violation - let me find patterns where "Sie" addresses the reader
    
    # Actually, from the grep results, I see "Sie" in scenario options which should be "Du"
    # Let me look for scenario options with formal Sie
    
    # Pattern: In quiz/scenario options, "Sie" should be "Du" when addressing the reader
    # But the grep results show "sie" (lowercase) which might be third person
    
    # Since the user specifically mentioned "1 Sie violation" and my audit found "Ihnen", 
    # let me search for that pattern
    fixes_needed = []
    
    # Check for "Ihnen" that should be "dir"
    if 'Ihnen' in content:
        # Find context around "Ihnen"
        import re
        ihnen_matches = list(re.finditer(r'\bIhnen\b', content))
        for match in ihnen_matches:
            start = max(0, match.start() - 50)
            end = min(len(content), match.end() + 50)
            context = content[start:end]
            # If it's addressing the reader directly (not in a quote or third person context)
            if 'Danke' in context or 'dir' in context.lower() or 'du' in context.lower():
                # This might be the issue
                old_text = content[start:end]
                # Need to see the full sentence
                sentence_start = content.rfind('.', 0, match.start()) + 1
                sentence_end = content.find('.', match.end())
                if sentence_end == -1:
                    sentence_end = match.end() + 100
                sentence = content[sentence_start:sentence_end]
                if 'Danke' in sentence or 'dir' not in sentence.lower():
                    # This might need fixing, but let's be conservative
                    print(f"  Found 'Ihnen' in context: {sentence[:100]}...")
    
    # Since the user said there's 1 violation, let me check the exact line
    # Actually, let me just fix any obvious formal "Sie" addressing the reader in interactive content
    
    # The safest fix: Look for "Ihnen" in user-facing strings (buttons, feedback, etc.)
    # But let's be conservative and only fix what's clearly wrong
    
    # Actually, since the user specifically said there's 1 Sie violation, and my audit script found it,
    # let me search more systematically
    
    # For now, let's skip this and focus on what the user explicitly mentioned
    # The user said "Need to find and fix (1 instance)" - they'll need to provide more context
    
    print(f"⚠️  Blue Belt Stripe 3: Need to identify exact Sie violation")
    print(f"   (Searched for 'Ihnen' - found instances but need context to determine if wrong)")
    return False

def fix_blue_belt_stripe4():
    """Fix 2 missing -de.html links in Blue Belt Stripe 4"""
    filepath = Path('blue-belt-stripe4-gamified-de.html')
    
    if not filepath.exists():
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixes = [
        ('href="blue-belt.html"', 'href="blue-belt-de.html"'),
        ('href="purple-belt.html"', 'href="purple-belt-de.html"'),
    ]
    
    changes = 0
    for old, new in fixes:
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            changes += count
            print(f"  ✓ Fixed: {old} → {new} ({count} instance(s))")
    
    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Blue Belt Stripe 4: Fixed {changes} link(s)")
        return True
    else:
        print(f"❌ Blue Belt Stripe 4: No fixes applied")
        return False

def fix_ui_elements():
    """Fix untranslated UI elements across all files"""
    files = [
        'blue-belt-stripe1-gamified-de.html',
        'blue-belt-stripe2-gamified-de.html',
        'blue-belt-stripe3-gamified-de.html',
        'blue-belt-stripe4-gamified-de.html',
        'purple-belt-stripe1-gamified-de.html',
        'purple-belt-stripe2-gamified-de.html',
        'purple-belt-stripe3-gamified-de.html',
        'purple-belt-stripe4-gamified-de.html',
    ]
    
    # Common UI translations
    ui_fixes = [
        ('>Continue<', '>Weiter<'),
        ('>Back to<', '>Zurück zu<'),
        ('>Next<', '>Weiter<'),
        ('>Previous<', '>Zurück<'),
        ('>Submit<', '>Absenden<'),
        ('Begin Assessment', 'Bewertung starten'),
        ('See Results', 'Ergebnisse anzeigen'),
        ('Test Your Knowledge', 'Teste Dein Wissen'),
        ('Question', 'Frage'),
        ('You scored', 'Du hast'),
    ]
    
    total_fixes = 0
    for filepath_str in files:
        filepath = Path(filepath_str)
        if not filepath.exists():
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        file_changes = 0
        for old, new in ui_fixes:
            # Use word boundaries for better matching
            import re
            pattern = re.escape(old)
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            if matches > 0:
                # Be careful with replacements - check context
                # For now, skip UI fixes as they might break functionality
                # The user only asked for specific issues
                pass
        
        if file_changes > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            total_fixes += file_changes
    
    # Skip UI fixes for now - user only asked for specific issues
    return 0

def main():
    print("=" * 80)
    print("🔧 FIXING SPECIFIC GERMAN TRANSLATION ISSUES")
    print("=" * 80)
    print()
    
    results = []
    
    print("📄 Blue Belt Stripe 2...")
    results.append(('Blue Belt Stripe 2', fix_blue_belt_stripe2()))
    print()
    
    print("📄 Blue Belt Stripe 3...")
    results.append(('Blue Belt Stripe 3', fix_blue_belt_stripe3()))
    print()
    
    print("📄 Blue Belt Stripe 4...")
    results.append(('Blue Belt Stripe 4', fix_blue_belt_stripe4()))
    print()
    
    print("=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    
    fixed = sum(1 for _, success in results if success)
    total = len(results)
    
    for name, success in results:
        status = "✅" if success else "⚠️"
        print(f"  {status} {name}")
    
    print(f"\n✅ Fixed {fixed}/{total} file(s)")
    print("\n" + "=" * 80)

if __name__ == '__main__':
    main()

