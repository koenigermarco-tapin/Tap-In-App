#!/usr/bin/env python3
"""
Fix completion save logic in all stripe files
Adds completeLesson() function if missing
"""

import re
import os
from pathlib import Path

# Standard completeLesson function template
COMPLETE_LESSON_TEMPLATE = """
function completeLesson() {
    const current = getStripeNumber();
    const belt = current.belt;
    const stripeNum = current.stripe;
    
    // Save to localStorage
    const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    if (!progress.completedStripes) progress.completedStripes = [];
    const stripeKey = `${belt}-${stripeNum}`;
    if (!progress.completedStripes.includes(stripeKey)) {
        progress.completedStripes.push(stripeKey);
    }
    localStorage.setItem('userProgress', JSON.stringify(progress));
    
    // Save to gamification system
    if (typeof TapInGamification !== 'undefined') {
        TapInGamification.saveStripeCompletion(belt, stripeNum, 100);
    }
    
    // Show achievement
    showAchievement('Stripe Complete! +100 XP');
    
    // Redirect to next stripe or dashboard
    redirectToNext();
}

function redirectToNext() {
    const current = getStripeNumber();
    const belt = current.belt;
    const stripeNum = current.stripe;
    const nextStripe = stripeNum + 1;
    
    if (nextStripe <= 4) {
        window.location.href = `${belt}-belt-stripe${nextStripe}-gamified.html`;
    } else {
        // Belt complete, go to dashboard
        window.location.href = 'gym-dashboard.html';
    }
}

function getStripeNumber() {
    const filename = window.location.pathname.split('/').pop();
    const match = filename.match(/(white|blue|purple|brown|black)-belt-stripe([0-9]+)/);
    if (match) {
        return {
            belt: match[1],
            stripe: parseInt(match[2])
        };
    }
    return { belt: 'white', stripe: 1 };
}

function showAchievement(message) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-toast';
    achievement.innerHTML = `
        <svg class="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>${message}</span>
    `;
    document.body.appendChild(achievement);
    setTimeout(() => achievement.classList.add('show'), 100);
    setTimeout(() => {
        achievement.classList.remove('show');
        setTimeout(() => achievement.remove(), 300);
    }, 3000);
}
"""

# Achievement toast CSS
ACHIEVEMENT_CSS = """
<style>
.achievement-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--tap-green) 0%, #059669 100%);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10000;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 1rem;
}

.achievement-toast.show {
    transform: translateX(0);
    opacity: 1;
}

.achievement-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}
</style>
"""

def check_file_has_complete_lesson(content):
    """Check if file has proper completeLesson function"""
    has_complete_lesson = bool(re.search(r'function\s+completeLesson\s*\(', content))
    has_save_stripe = bool(re.search(r'saveStripeCompletion', content))
    has_get_stripe = bool(re.search(r'function\s+getStripeNumber', content))
    has_redirect = bool(re.search(r'function\s+redirectToNext|redirectToNext\(\)', content))
    
    # Check if completeLesson calls saveStripeCompletion
    if has_complete_lesson:
        # Extract completeLesson function
        match = re.search(r'function\s+completeLesson[^{]*\{[^}]*\}', content, re.DOTALL)
        if match:
            func_content = match.group(0)
            has_save_in_func = 'saveStripeCompletion' in func_content
            return has_save_in_func and has_get_stripe
    return False

def fix_stripe_file(filepath):
    """Fix a single stripe file"""
    print(f"Checking {filepath.name}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has proper completeLesson
    if check_file_has_complete_lesson(content):
        print(f"  ✅ Already has completeLesson()")
        return False
    
    # Check if has getStripeNumber
    if not re.search(r'function\s+getStripeNumber', content):
        # Add getStripeNumber if missing
        # Find a good place to insert (before completeQuiz or at end of script)
        if re.search(r'function\s+completeQuiz', content):
            # Insert before completeQuiz
            content = re.sub(
                r'(function\s+completeQuiz)',
                COMPLETE_LESSON_TEMPLATE + r'\n\n\1',
                content
            )
        else:
            # Add at end of last script tag
            content = re.sub(
                r'(</script>)',
                COMPLETE_LESSON_TEMPLATE + r'\n\1',
                content,
                count=1
            )
    else:
        # Add completeLesson after getStripeNumber
        content = re.sub(
            r'(function\s+getStripeNumber[^}]*\})',
            r'\1' + COMPLETE_LESSON_TEMPLATE,
            content,
            flags=re.DOTALL
        )
    
    # Add achievement CSS if missing
    if '.achievement-toast' not in content:
        # Add before closing </head> or after <style> tags
        if '</head>' in content:
            content = content.replace('</head>', ACHIEVEMENT_CSS + '\n</head>')
        elif '<style>' in content:
            content = re.sub(r'(</style>)', r'\1' + ACHIEVEMENT_CSS, content, count=1)
    
    # Fix onclick handlers that call completeLesson incorrectly
    # Change onclick="completeLesson(1)" to onclick="completeLesson(); window.dispatchEvent(new Event('achievement-earned')); completeLesson();"
    content = re.sub(
        r'onclick="completeLesson\((\d+)\)',
        r'onclick="completeLesson(); window.dispatchEvent(new Event(\'achievement-earned\'));',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ Fixed {filepath.name}")
    return True

def main():
    """Main function"""
    gym_dir = Path('src/pages/gym')
    stripe_files = list(gym_dir.glob('*-belt-stripe*-gamified.html'))
    
    print(f"Found {len(stripe_files)} stripe files\n")
    
    fixed_count = 0
    for filepath in sorted(stripe_files):
        if fix_stripe_file(filepath):
            fixed_count += 1
    
    print(f"\n✅ Fixed {fixed_count} files")
    print(f"✅ {len(stripe_files) - fixed_count} files already had completeLesson()")

if __name__ == '__main__':
    main()

