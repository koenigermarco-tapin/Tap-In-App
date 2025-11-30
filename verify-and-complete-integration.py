#!/usr/bin/env python3
"""
Verify and complete platform integration
- Check all priority files have the 3 required modules
- Add lesson completion events to stripe files
"""

import re
from pathlib import Path

PLATFORM_MODULES = [
    'js/achievement-badges.js',
    'js/language-switcher.js',
    'js/structured-data.js'
]

def check_modules(filepath: Path) -> dict:
    """Check if file has all required modules"""
    if not filepath.exists():
        return {'has_modules': False, 'missing': PLATFORM_MODULES, 'file': filepath.name}
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return {'has_modules': False, 'missing': PLATFORM_MODULES, 'file': filepath.name}
    
    missing = []
    for module in PLATFORM_MODULES:
        module_name = module.split('/')[-1]
        if module_name not in content:
            missing.append(module)
    
    return {
        'has_modules': len(missing) == 0,
        'missing': missing,
        'has_events': 'lessonCompleted' in content,
        'file': filepath.name
    }

def add_lesson_events(filepath: Path) -> bool:
    """Add lesson completion events to stripe file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    if 'lessonCompleted' in content:
        return False  # Already has events
    
    modified = False
    
    # Add to completeQuiz function
    quiz_complete_pattern = r'(function completeQuiz\([^)]+\)\s*\{[^}]*?localStorage\.setItem\([^)]*Complete[^)]*\);[^}]*?localStorage\.setItem\([^)]*Score[^)]*\);[^}]*?)'
    
    if re.search(quiz_complete_pattern, content, re.DOTALL):
        replacement = r'\1\n            \n            // Trigger lesson completion event for achievements\n            window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));\n            \n            // Track in analytics if available\n            if (typeof TapInAnalytics !== \'undefined\') {\n                TapInAnalytics.trackLessonComplete(\'stripe-\' + stripeNum, quizScore * 10);\n            }\n            '
        new_content = re.sub(quiz_complete_pattern, replacement, content, flags=re.DOTALL, count=1)
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
    """Verify and complete integration"""
    print("🔍 VERIFYING PLATFORM INTEGRATION")
    print("=" * 60)
    
    # Check all priority files
    stripe_files = []
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        for i in range(1, 5):
            stripe_files.append(Path(f'{belt}-belt-stripe{i}-gamified.html'))
            stripe_files.append(Path(f'{belt}-belt-stripe{i}-gamified-de.html'))
    
    assessment_files = []
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        assessment_files.append(Path(f'{belt}-belt-assessment.html'))
        assessment_files.append(Path(f'{belt}-belt-assessment.de.html'))
    
    entry_files = [
        Path('index.html'),
        Path('index.de.html'),
        Path('learning-hub.html'),
        Path('learning-hub.de.html'),
    ]
    
    other_files = [
        Path('leaderboard.html'),
    ]
    
    all_files = stripe_files + assessment_files + entry_files + other_files
    
    print(f"\n📊 Checking {len(all_files)} files...\n")
    
    missing_modules = []
    missing_events = []
    all_good = []
    
    for filepath in all_files:
        result = check_modules(filepath)
        
        if not result['has_modules']:
            missing_modules.append(result)
        elif filepath in stripe_files and not result.get('has_events'):
            missing_events.append(filepath)
        else:
            all_good.append(result['file'])
    
    # Report
    print(f"✅ Files with all modules: {len(all_good)}")
    print(f"⚠️  Files missing modules: {len(missing_modules)}")
    print(f"⚠️  Stripe files missing events: {len(missing_events)}")
    
    if missing_modules:
        print(f"\n📋 Files missing modules:")
        for item in missing_modules[:10]:
            print(f"   - {item['file']}: missing {', '.join([m.split('/')[-1] for m in item['missing']])}")
        if len(missing_modules) > 10:
            print(f"   ... and {len(missing_modules) - 10} more")
    
    if missing_events:
        print(f"\n📋 Stripe files missing lesson completion events:")
        for filepath in missing_events[:10]:
            print(f"   - {filepath.name}")
        if len(missing_events) > 10:
            print(f"   ... and {len(missing_events) - 10} more")
        
        # Offer to add events
        if missing_events:
            print(f"\n🔧 Adding lesson completion events to {len(missing_events)} files...")
            added = 0
            for filepath in missing_events:
                if add_lesson_events(filepath):
                    added += 1
                    print(f"   ✅ {filepath.name}")
            print(f"\n✅ Added events to {added} files")
    
    print(f"\n✅ Verification complete!")
    
    if not missing_modules and not missing_events:
        print(f"\n🎉 All files are properly integrated!")

if __name__ == '__main__':
    main()

