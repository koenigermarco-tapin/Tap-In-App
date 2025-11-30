#!/usr/bin/env python3
"""
Complete German Translation for White Belt Stripes 2-4
Applies patterns from Stripe 1 to complete remaining White Belt files
"""

import re
from pathlib import Path

def translate_quiz_questions(content):
    """Apply standard quiz question translations"""
    
    translations = [
        # Common patterns
        (r'Question \d+ of 10', lambda m: m.group(0).replace('Question', 'Frage')),
        (r'What type', 'Welche Art'),
        (r'True or False:', 'Wahr oder Falsch:'),
        (r'In BJJ,', 'Im BJJ:'),
        (r'In a high-trust', 'In einem Hochvertrauensteam:'),
        (r'What happens when', 'Was passiert, wenn'),
        (r'What is the', 'Was ist'),
        (r'Which of these', 'Welches davon'),
        (r'Building trust', 'Vertrauen aufzubauen'),
        
        # Answer options
        (r'A\) True', 'A) Wahr'),
        (r'B\) False', 'B) Falsch'),
        
        # Feedback patterns
        (r'was the top factor', 'war der wichtigste Faktor'),
        (r'enables healthy', 'ermöglicht gesunden'),
        (r'is about courage', 'geht um Mut'),
        (r'is the foundation', 'ist die Grundlage'),
    ]
    
    for pattern, replacement in translations:
        if callable(replacement):
            content = re.sub(pattern, replacement, content)
        else:
            content = re.sub(pattern, replacement, content)
    
    return content

def fix_links(content):
    """Fix internal links to point to -de.html versions"""
    
    # Fix stripe navigation links
    content = re.sub(
        r"href=['\"]white-belt-stripe(\d+)-gamified\.html['\"]",
        r'href="white-belt-stripe\1-gamified-de.html"',
        content
    )
    
    # Fix hub links
    content = re.sub(
        r'href=["\']white-belt\.html["\']',
        'href="white-belt-de.html"',
        content
    )
    
    # Fix dashboard links
    content = re.sub(
        r'href=["\']gym-dashboard\.html["\']',
        'href="gym-dashboard-de.html"',
        content
    )
    
    return content

def translate_js_strings(content):
    """Translate JavaScript user-facing strings"""
    
    translations = [
        (r'"Quiz Complete! Continue"', '"Quiz abgeschlossen! Weiter"'),
        (r'"You scored"', '"Deine Punktzahl"'),
        (r'"XP awarded"', '"XP verdient"'),
        (r"'Already Complete!'", "'Bereits abgeschlossen!'"),
        (r"'You completed this lesson already'", "'Du hast diese Lektion bereits abgeschlossen'"),
        (r"alert\('🎉 White Belt Complete!", "alert('🎉 White Belt abgeschlossen!"),
        (r"'Ready for the next level'", "'Bereit für das nächste Level'"),
        (r'Weiter to Streifen', 'Weiter zu Streifen'),
        (r'"You Got Submitted by a White Belt! 🥋"', '"Du wurdest von einem Weißen Gürtel submitted! 🥋"'),
        (r'"Review These Questions:"', '"Schau dir diese Fragen nochmal an:"'),
        (r'"Scroll up to review"', '"Scroll nach oben, um"'),
        (r'"then retry the quiz"', '"dann versuch das Quiz nochmal"'),
        (r'"Score: \$\{quizScore\}/10"', '"Punktzahl: ${quizScore}/10"'),
        (r'"Need \$\{passingThreshold\}/10 to pass"', '"Du brauchst ${passingThreshold}/10 zum Bestehen"'),
    ]
    
    for pattern, replacement in translations:
        content = re.sub(pattern, replacement, content)
    
    return content

def translate_achievement_popup(content):
    """Translate achievement popup messages"""
    
    translations = [
        (r'Lektion Complete!', 'Lektion abgeschlossen!'),
        (r"You're building", 'Du baust'),
        (r'Already Complete!', 'Bereits abgeschlossen!'),
        (r'You completed this lesson already', 'Du hast diese Lektion bereits abgeschlossen'),
    ]
    
    for pattern, replacement in translations:
        content = content.replace(pattern, replacement)
    
    return content

def complete_stripe_translation(filepath):
    """Complete translation for a single stripe file"""
    
    print(f"\n📝 Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_length = len(content)
    
    # Apply translations
    content = fix_links(content)
    content = translate_quiz_questions(content)
    content = translate_js_strings(content)
    content = translate_achievement_popup(content)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_length = len(content)
    changes = abs(new_length - original_length)
    
    print(f"   ✅ Applied standard translations ({changes} chars changed)")
    
    return changes

def main():
    """Process White Belt Stripes 2-4"""
    
    print("🇩🇪 COMPLETING GERMAN TRANSLATIONS: White Belt Stripes 2-4")
    print("=" * 60)
    print("\n📝 Applying patterns from Stripe 1...")
    
    stripe_files = [
        Path('white-belt-stripe2-gamified-de.html'),
        Path('white-belt-stripe3-gamified-de.html'),
        Path('white-belt-stripe4-gamified-de.html'),
    ]
    
    total_changes = 0
    
    for filepath in stripe_files:
        if not filepath.exists():
            print(f"⚠️  {filepath.name} - NOT FOUND (skipping)")
            continue
        
        changes = complete_stripe_translation(filepath)
        total_changes += changes
    
    print(f"\n✅ Standard translations applied to {len([f for f in stripe_files if f.exists()])} files")
    print(f"\n⚠️  NOTE: Manual review still needed for:")
    print(f"   • Lesson content translation")
    print(f"   • Quiz question-specific translations")
    print(f"   • Natural flow and tone refinement")

if __name__ == '__main__':
    main()

