#!/usr/bin/env python3
"""
Add missing platform modules to files that need them
Specifically adds: achievement-badges.js, language-switcher.js, structured-data.js
"""

import re
from pathlib import Path

PLATFORM_MODULES = [
    'js/achievement-badges.js',
    'js/language-switcher.js',
    'js/structured-data.js'
]

def has_all_modules(content: str) -> bool:
    """Check if file has all 3 required platform modules"""
    return all(module.split('/')[-1] in content for module in PLATFORM_MODULES)

def process_file(filepath: Path, is_stripe: bool = False):
    """Process a single file"""
    if not filepath.exists():
        return {'status': 'not_found', 'file': filepath.name}
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {'status': 'error', 'file': filepath.name, 'reason': str(e)}
    
    if has_all_modules(content):
        return {'status': 'has_modules', 'file': filepath.name}
    
    # Find insertion point
    body_match = re.search(r'(\s*</body>)', content, re.IGNORECASE | re.MULTILINE)
    if not body_match:
        return {'status': 'error', 'file': filepath.name, 'reason': 'No </body> tag found'}
    
    # Check if TAP-IN Utilities exist before </body>
    utils_pattern = r'(<script src="js/(?:shared-utilities|global-error-handler|storage-health)\.js"></script>\s*)'
    utils_match = re.search(utils_pattern, content[body_match.start()-500:body_match.start()], re.IGNORECASE)
    
    insertion_idx = body_match.start(1)
    
    # Generate script tags
    script_tags = '\n'.join([
        f'    <script src="{module}"></script>'
        for module in PLATFORM_MODULES
    ])
    
    if utils_match:
        # Insert after TAP-IN Utilities
        # Find the end of the last utility script
        utils_end_match = re.search(r'(<script src="js/storage-health\.js"></script>\s*)', content[:insertion_idx], re.IGNORECASE)
        if utils_end_match:
            insertion_idx = utils_end_match.end()
            script_block = f'\n    <!-- Platform Integration Modules -->\n{script_tags}\n'
        else:
            script_block = f'\n    <!-- Platform Integration Modules -->\n{script_tags}\n'
    else:
        script_block = f'\n    <!-- Platform Integration Modules -->\n{script_tags}\n'
    
    # Insert
    new_content = (
        content[:insertion_idx] +
        script_block +
        content[insertion_idx:]
    )
    
    # Add lesson completion events for stripe pages
    if is_stripe:
        # Add to completeQuiz function
        quiz_pattern = r'(localStorage\.setItem\([^)]*Complete[^)]*\);[^}]*?localStorage\.setItem\([^)]*Score[^)]*\);)'
        if re.search(quiz_pattern, new_content, re.DOTALL):
            new_content = re.sub(
                quiz_pattern,
                r'\1\n            \n            // Trigger lesson completion event\n            window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));\n            \n            // Track in analytics if available\n            if (typeof TapInAnalytics !== \'undefined\') {\n                TapInAnalytics.trackLessonComplete(\'stripe-\' + stripeNum, quizScore * 10);\n            }',
                new_content,
                flags=re.DOTALL,
                count=1
            )
    
    # Write
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return {'status': 'updated', 'file': filepath.name}
    except Exception as e:
        return {'status': 'error', 'file': filepath.name, 'reason': f'Write error: {e}'}

def main():
    files_to_check = [
        # Priority 1: Stripes
        *[Path(f'white-belt-stripe{i}-gamified.html') for i in range(1, 5)],
        *[Path(f'blue-belt-stripe{i}-gamified.html') for i in range(1, 5)],
        *[Path(f'purple-belt-stripe{i}-gamified.html') for i in range(1, 5)],
        *[Path(f'brown-belt-stripe{i}-gamified.html') for i in range(1, 5)],
        *[Path(f'black-belt-stripe{i}-gamified.html') for i in range(1, 5)],
        
        # Priority 2: Assessments
        Path('white-belt-assessment.html'),
        Path('blue-belt-assessment.html'),
        Path('purple-belt-assessment.html'),
        Path('brown-belt-assessment.html'),
        Path('black-belt-assessment.html'),
        
        # Priority 3: Entry
        Path('index.html'),
        Path('learning-hub.html'),
        
        # Priority 4: Other
        Path('leaderboard.html'),
    ]
    
    print("🔧 ADDING MISSING PLATFORM MODULES")
    print("=" * 60)
    
    updated = []
    skipped = []
    errors = []
    
    for filepath in files_to_check:
        is_stripe = 'stripe' in filepath.name and 'gamified' in filepath.name
        result = process_file(filepath, is_stripe=is_stripe)
        
        if result['status'] == 'updated':
            updated.append(result['file'])
            print(f"  ✅ {result['file']}")
        elif result['status'] == 'has_modules':
            skipped.append(result['file'])
        elif result['status'] == 'error':
            errors.append(result)
            print(f"  ⚠️  {result['file']}: {result.get('reason', 'Error')}")
        elif result['status'] == 'not_found':
            print(f"  ⏭️  {result['file']}: Not found")
    
    print(f"\n✅ Updated: {len(updated)}")
    print(f"⏭️  Already have modules: {len(skipped)}")
    print(f"⚠️  Errors: {len(errors)}")

if __name__ == '__main__':
    main()

