#!/usr/bin/env python3
"""
Add achievement event triggers to all stripe completion handlers
"""

import re
from pathlib import Path

def add_achievement_events(filepath: Path) -> bool:
    """Add achievement events to stripe completion handlers"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    # Check if this is a stripe file
    if 'stripe' not in filepath.name.lower() or 'gamified' not in filepath.name.lower():
        return False
    
    # Check if already has both events
    if ("window.dispatchEvent(new CustomEvent('lessonCompleted'))" in content and 
        "AchievementSystem.recordQuizResult" in content):
        return False
    
    modified = False
    
    # Pattern 1: Find completeQuiz function and add events before navigation
    complete_quiz_pattern = r"(function completeQuiz\([^)]+\)\s*\{[^}]*?localStorage\.setItem\([^)]+Complete[^)]*\);[^}]*?localStorage\.setItem\([^)]+Score[^)]*\);[^}]*?localStorage\.setItem\([^)]+Date[^)]*\);)"
    
    if re.search(complete_quiz_pattern, content, re.DOTALL):
        # Add events after score/date storage, before navigation
        replacement = r"\1\n            \n            // Trigger achievement event\n            window.dispatchEvent(new CustomEvent('lessonCompleted'));\n            \n            // Track quiz result if achievement system is available\n            if (typeof AchievementSystem !== 'undefined') {\n                AchievementSystem.recordQuizResult(quizScore, quizScore >= 7, false);\n            }\n            "
        new_content = re.sub(complete_quiz_pattern, replacement, content, flags=re.DOTALL, count=1)
        if new_content != content:
            content = new_content
            modified = True
    
    # Pattern 2: Find completeLesson function
    complete_lesson_pattern = r"(function completeLesson\([^)]+\)\s*\{[^}]*?localStorage\.setItem\([^)]+Completed[^)]*\);)"
    
    if re.search(complete_lesson_pattern, content, re.DOTALL):
        replacement = r"\1\n            window.dispatchEvent(new CustomEvent('lessonCompleted'));"
        new_content = re.sub(complete_lesson_pattern, replacement, content, flags=re.DOTALL, count=1)
        if new_content != content:
            content = new_content
            modified = True
    
    # Pattern 3: Simple localStorage.setItem pattern for stripe completion
    stripe_complete_pattern = r"(localStorage\.setItem\(['\"]whitebeltStripe\d+Complete['\"][^)]*\);)"
    if 'whitebelt' in content.lower() and not modified:
        if re.search(stripe_complete_pattern, content):
            replacement = r"\1\n            window.dispatchEvent(new CustomEvent('lessonCompleted'));"
            new_content = re.sub(stripe_complete_pattern, replacement, content, count=1)
            if new_content != content:
                content = new_content
                modified = True
    
    if modified:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except:
            return False
    
    return False

def main():
    """Add achievement events to all stripe files"""
    
    print("🔧 ADDING ACHIEVEMENT EVENTS TO STRIPE FILES")
    print("=" * 60)
    
    # Find all stripe gamified files
    stripe_files = []
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        for i in range(1, 5):
            stripe_files.append(Path(f'{belt}-belt-stripe{i}-gamified.html'))
            stripe_files.append(Path(f'{belt}-belt-stripe{i}-gamified-de.html'))
    
    added_count = 0
    
    for filepath in stripe_files:
        if filepath.exists():
            if add_achievement_events(filepath):
                added_count += 1
                print(f"   ✅ {filepath.name}")
    
    print(f"\n✅ Achievement events added to {added_count} files")

if __name__ == '__main__':
    main()

