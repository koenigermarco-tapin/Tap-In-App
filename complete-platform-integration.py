#!/usr/bin/env python3
"""
Complete TAP-IN Platform Integration
Adds platform modules to priority pages that don't have them yet
"""

import re
from pathlib import Path
from typing import List, Tuple

# Modules to add (order matters)
PLATFORM_MODULES = [
    'js/achievement-badges.js',
    'js/language-switcher.js',
    'js/structured-data.js'
]

# Pages already updated (skip these)
ALREADY_UPDATED = {
    'white-belt.html', 'white-belt.de.html',
    'blue-belt.html', 'blue-belt.de.html',
    'purple-belt.html', 'purple-belt.de.html',
    'brown-belt.html', 'brown-belt.de.html',
    'black-belt.html', 'black-belt.de.html',
    'gym-dashboard.html', 'gym-dashboard.de.html',
    'achievements.html', 'achievements.de.html'
}

# Priority files to update
PRIORITY_1_STRIPES = [
    'white-belt-stripe1-gamified.html', 'white-belt-stripe2-gamified.html',
    'white-belt-stripe3-gamified.html', 'white-belt-stripe4-gamified.html',
    'blue-belt-stripe1-gamified.html', 'blue-belt-stripe2-gamified.html',
    'blue-belt-stripe3-gamified.html', 'blue-belt-stripe4-gamified.html',
    'purple-belt-stripe1-gamified.html', 'purple-belt-stripe2-gamified.html',
    'purple-belt-stripe3-gamified.html', 'purple-belt-stripe4-gamified.html',
    'brown-belt-stripe1-gamified.html', 'brown-belt-stripe2-gamified.html',
    'brown-belt-stripe3-gamified.html', 'brown-belt-stripe4-gamified.html',
    'black-belt-stripe1-gamified.html', 'black-belt-stripe2-gamified.html',
    'black-belt-stripe3-gamified.html', 'black-belt-stripe4-gamified.html',
]

PRIORITY_2_ASSESSMENTS = [
    'white-belt-assessment.html', 'white-belt-assessment.de.html',
    'blue-belt-assessment.html', 'blue-belt-assessment.de.html',
    'purple-belt-assessment.html', 'purple-belt-assessment.de.html',
    'brown-belt-assessment.html', 'brown-belt-assessment.de.html',
    'black-belt-assessment.html', 'black-belt-assessment.de.html',
]

PRIORITY_3_ENTRY = [
    'index.html', 'index.de.html',
    'learning-hub.html', 'learning-hub.de.html',
]

PRIORITY_4_OTHER = [
    'leaderboard.html',
]

def has_platform_modules(content: str) -> bool:
    """Check if file already has platform modules"""
    return 'achievement-badges.js' in content and 'language-switcher.js' in content

def find_tap_in_utilities_end(content: str) -> int:
    """Find the end of TAP-IN Utilities scripts section"""
    # Look for the comment or last TAP-IN utility script
    patterns = [
        r'(<!-- TAP-IN Utilities[^-]*-+>\s*(?:<script[^>]*>.*?</script>\s*)*)',
        r'(<script src="js/(?:shared-utilities|global-error-handler|storage-health)\.js"></script>\s*)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE | re.DOTALL)
        if match:
            return match.end()
    
    return -1

def find_insertion_point(content: str) -> Tuple[int, str]:
    """Find where to insert the platform modules"""
    # First, check if TAP-IN Utilities exist
    utils_end = find_tap_in_utilities_end(content)
    
    if utils_end > 0:
        # Insert after TAP-IN Utilities
        return utils_end, 'after_utilities'
    
    # Otherwise, insert before </body>
    body_close_match = re.search(r'(\s*</body>)', content, re.IGNORECASE | re.MULTILINE)
    if body_close_match:
        return body_close_match.start(1), 'before_body'
    
    # Fallback to </html>
    html_close_match = re.search(r'(\s*</html>)', content, re.IGNORECASE | re.MULTILINE)
    if html_close_match:
        return html_close_match.start(1), 'before_html'
    
    return -1, 'not_found'

def generate_script_tags(insert_after_utilities: bool = False) -> str:
    """Generate platform module script tags"""
    script_tags = '\n'.join([
        f'    <script src="{module}"></script>'
        for module in PLATFORM_MODULES
    ])
    
    if insert_after_utilities:
        return f'\n    <!-- Platform Integration Modules -->\n{script_tags}\n'
    else:
        return f'\n    <!-- Platform Integration Modules -->\n{script_tags}\n'

def add_lesson_completion_event(content: str, is_stripe: bool = False) -> Tuple[str, bool]:
    """Add lesson completion event dispatch to stripe completion handlers"""
    if not is_stripe:
        return content, False
    
    modified = False
    
    # Pattern 1: In completeQuiz function, after localStorage.setItem for completion
    pattern1 = r'(localStorage\.setItem\([^)]*Complete[^)]*\);[^}]*?localStorage\.setItem\([^)]*Score[^)]*\);[^}]*?localStorage\.setItem\([^)]*Date[^)]*\);)'
    
    if re.search(pattern1, content):
        replacement = r'\1\n            \n            // Trigger lesson completion event for achievements\n            window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));\n            \n            // Track in analytics if available\n            if (typeof TapInAnalytics !== \'undefined\') {\n                TapInAnalytics.trackLessonComplete(\'stripe-\' + stripeNum, quizScore * 10);\n            }'
        new_content = re.sub(pattern1, replacement, content, flags=re.DOTALL, count=1)
        if new_content != content:
            content = new_content
            modified = True
    
    # Pattern 2: In completeLesson function
    pattern2 = r'(localStorage\.setItem\([^)]*Completed[^)]*\);)'
    if re.search(pattern2, content):
        replacement = r'\1\n            window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));'
        new_content = re.sub(pattern2, replacement, content, count=1)
        if new_content != content:
            content = new_content
            modified = True
    
    return content, modified

def process_file(filepath: Path, is_stripe: bool = False) -> dict:
    """Process a single file"""
    result = {
        'file': filepath.name,
        'status': 'skipped',
        'reason': '',
        'changes': []
    }
    
    # Skip if already updated
    if filepath.name in ALREADY_UPDATED:
        result['status'] = 'skipped'
        result['reason'] = 'Already updated (do not modify)'
        return result
    
    # Skip if doesn't exist
    if not filepath.exists():
        result['status'] = 'error'
        result['reason'] = 'File not found'
        return result
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        result['status'] = 'error'
        result['reason'] = f"Read error: {e}"
        return result
    
    # Check if already has modules
    if has_platform_modules(content):
        result['status'] = 'skipped'
        result['reason'] = 'Platform modules already present'
        return result
    
    # Find insertion point
    insertion_idx, location = find_insertion_point(content)
    
    if insertion_idx == -1:
        result['status'] = 'error'
        result['reason'] = 'Could not find insertion point'
        return result
    
    # Generate script tags
    insert_after_utilities = (location == 'after_utilities')
    script_tags = generate_script_tags(insert_after_utilities)
    
    # Insert scripts
    new_content = (
        content[:insertion_idx] +
        script_tags +
        content[insertion_idx:]
    )
    result['changes'].append(f'Added platform modules ({location})')
    
    # Add lesson completion events for stripe pages
    if is_stripe:
        new_content, event_added = add_lesson_completion_event(new_content, is_stripe=True)
        if event_added:
            result['changes'].append('Added lesson completion event')
    
    # Write back
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        result['status'] = 'updated'
    except Exception as e:
        result['status'] = 'error'
        result['reason'] = f"Write error: {e}"
        return result
    
    return result

def main():
    """Main integration function"""
    print("🔧 COMPLETE TAP-IN PLATFORM INTEGRATION")
    print("=" * 60)
    
    all_priority_files = (
        [(f, True) for f in PRIORITY_1_STRIPES] +  # (filename, is_stripe)
        [(f, False) for f in PRIORITY_2_ASSESSMENTS] +
        [(f, False) for f in PRIORITY_3_ENTRY] +
        [(f, False) for f in PRIORITY_4_OTHER]
    )
    
    print(f"\n📄 Processing {len(all_priority_files)} priority files\n")
    
    results = {
        'updated': [],
        'skipped': [],
        'error': []
    }
    
    # Process Priority 1: Stripes
    print("🎯 Priority 1: Stripe Lesson Pages")
    for filename in PRIORITY_1_STRIPES:
        filepath = Path(filename)
        result = process_file(filepath, is_stripe=True)
        results[result['status']].append(result)
        
        if result['status'] == 'updated':
            changes_str = ', '.join(result['changes'])
            print(f"  ✅ {filename} - {changes_str}")
        elif result['status'] == 'error':
            print(f"  ⚠️  {filename} - {result['reason']}")
    
    # Process Priority 2: Assessments
    print("\n🎯 Priority 2: Assessment Pages")
    for filename in PRIORITY_2_ASSESSMENTS:
        filepath = Path(filename)
        result = process_file(filepath, is_stripe=False)
        results[result['status']].append(result)
        
        if result['status'] == 'updated':
            print(f"  ✅ {filename}")
        elif result['status'] == 'error':
            print(f"  ⚠️  {filename} - {result['reason']}")
    
    # Process Priority 3: Entry Pages
    print("\n🎯 Priority 3: Entry/Index Pages")
    for filename in PRIORITY_3_ENTRY:
        filepath = Path(filename)
        result = process_file(filepath, is_stripe=False)
        results[result['status']].append(result)
        
        if result['status'] == 'updated':
            print(f"  ✅ {filename}")
        elif result['status'] == 'error':
            print(f"  ⚠️  {filename} - {result['reason']}")
    
    # Process Priority 4: Other Pages
    print("\n🎯 Priority 4: Other Key Pages")
    for filename in PRIORITY_4_OTHER:
        filepath = Path(filename)
        if filepath.exists():
            result = process_file(filepath, is_stripe=False)
            results[result['status']].append(result)
            
            if result['status'] == 'updated':
                print(f"  ✅ {filename}")
            elif result['status'] == 'error':
                print(f"  ⚠️  {filename} - {result['reason']}")
        else:
            print(f"  ⏭️  {filename} - Not found (skipping)")
    
    # Summary
    print(f"\n📊 INTEGRATION SUMMARY")
    print("=" * 60)
    print(f"   ✅ Updated: {len(results['updated'])} files")
    print(f"   ⏭️  Skipped: {len(results['skipped'])} files")
    print(f"   ⚠️  Errors: {len(results['error'])} files")
    
    if results['error']:
        print(f"\n⚠️  Files with errors:")
        for err in results['error']:
            print(f"      - {err['file']}: {err['reason']}")
    
    print(f"\n✅ Platform integration complete!")
    print(f"\n🎯 Verification:")
    print(f"   1. Open browser DevTools console")
    print(f"   2. Navigate to an updated page")
    print(f"   3. Run: typeof AchievementSystem !== 'undefined'")
    print(f"   4. Run: typeof LanguageSwitcher !== 'undefined'")
    print(f"   5. Check for language switcher button in top-right")

if __name__ == '__main__':
    main()

