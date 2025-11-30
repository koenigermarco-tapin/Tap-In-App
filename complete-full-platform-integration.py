#!/usr/bin/env python3
"""
Complete Full Platform Integration
- Adds platform modules to ALL remaining HTML files
- Adds lesson completion events to all stripe files
- Verifies lang attributes
"""

import re
from pathlib import Path
from typing import List, Tuple

PLATFORM_MODULES = [
    'js/achievement-badges.js',
    'js/language-switcher.js',
    'js/structured-data.js'
]

def has_platform_modules(content: str) -> bool:
    """Check if file has all 3 required platform modules"""
    return all(module.split('/')[-1] in content for module in PLATFORM_MODULES)

def find_html_files() -> List[Path]:
    """Find all HTML files excluding components and temp files"""
    html_files = []
    skip_dirs = {'node_modules', '.git', '__pycache__', 'venv', '.venv'}
    skip_files = {
        'user-avatar.html', 'auth-modal.html', 'data-migration.html',
        'loading-screen.html', 'optimized-fonts.html', 'language-switcher.html',
        'save-exit-button.html', 'tap-out-button.html'
    }
    
    for html_file in Path('.').rglob('*.html'):
        # Skip certain directories
        if any(skip in html_file.parts for skip in skip_dirs):
            continue
        # Skip component/template files
        if html_file.name in skip_files:
            continue
        # Skip if in components/js directory (these are components)
        if 'components' in html_file.parts or (html_file.parent.name == 'js'):
            continue
        html_files.append(html_file)
    
    return sorted(html_files)

def find_insertion_point(content: str) -> Tuple[int, str]:
    """Find where to insert platform modules"""
    # Check for TAP-IN Utilities first
    utils_patterns = [
        r'(<script src="js/storage-health\.js"></script>\s*)',
        r'(<!-- TAP-IN Utilities[^-]*-+>\s*(?:<script[^>]*>.*?</script>\s*)*)',
    ]
    
    for pattern in utils_patterns:
        match = re.search(pattern, content, re.IGNORECASE | re.DOTALL)
        if match:
            return match.end(), 'after_utilities'
    
    # Otherwise before </body>
    body_match = re.search(r'(\s*</body>)', content, re.IGNORECASE | re.MULTILINE)
    if body_match:
        return body_match.start(1), 'before_body'
    
    # Fallback to </html>
    html_match = re.search(r'(\s*</html>)', content, re.IGNORECASE | re.MULTILINE)
    if html_match:
        return html_match.start(1), 'before_html'
    
    return -1, 'not_found'

def add_platform_modules(filepath: Path) -> dict:
    """Add platform modules to a file"""
    result = {'file': filepath.name, 'status': 'skipped', 'changes': []}
    
    if not filepath.exists():
        result['status'] = 'error'
        result['reason'] = 'File not found'
        return result
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        result['status'] = 'error'
        result['reason'] = f'Read error: {e}'
        return result
    
    # Skip if already has modules
    if has_platform_modules(content):
        result['status'] = 'skipped'
        result['reason'] = 'Already has modules'
        return result
    
    # Find insertion point
    insertion_idx, location = find_insertion_point(content)
    
    if insertion_idx == -1:
        result['status'] = 'error'
        result['reason'] = 'Could not find insertion point'
        return result
    
    # Generate script tags
    script_tags = '\n'.join([
        f'    <script src="{module}"></script>'
        for module in PLATFORM_MODULES
    ])
    
    script_block = f'\n    <!-- Platform Integration Modules -->\n{script_tags}\n'
    
    # Insert
    new_content = (
        content[:insertion_idx] +
        script_block +
        content[insertion_idx:]
    )
    
    result['changes'].append(f'Added platform modules ({location})')
    
    # Write
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        result['status'] = 'updated'
        return result
    except Exception as e:
        result['status'] = 'error'
        result['reason'] = f'Write error: {e}'
        return result

def add_lesson_events_to_stripe(filepath: Path) -> dict:
    """Add lesson completion events to stripe files"""
    result = {'file': filepath.name, 'status': 'skipped', 'changes': []}
    
    if not filepath.exists() or 'stripe' not in filepath.name.lower() or 'gamified' not in filepath.name.lower():
        return result
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return result
    
    # Check if already has events
    if 'lessonCompleted' in content:
        result['status'] = 'skipped'
        result['reason'] = 'Already has events'
        return result
    
    modified = False
    
    # Pattern 1: In completeQuiz function
    quiz_pattern = r'(localStorage\.setItem\([^)]*Complete[^)]*\);[^}]*?localStorage\.setItem\([^)]*Score[^)]*\);[^}]*?)'
    
    if re.search(quiz_pattern, content, re.DOTALL):
        replacement = r'\1\n            \n            // Trigger lesson completion event for achievements\n            window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));\n            \n            // Track in analytics if available\n            if (typeof TapInAnalytics !== \'undefined\') {\n                TapInAnalytics.trackLessonComplete(\'stripe-\' + stripeNum, quizScore * 10);\n            }\n            '
        new_content = re.sub(quiz_pattern, replacement, content, flags=re.DOTALL, count=1)
        if new_content != content:
            content = new_content
            modified = True
            result['changes'].append('Added lesson completion events')
    
    # Pattern 2: In completeLesson function
    lesson_pattern = r'(localStorage\.setItem\([^)]*Completed[^)]*\);)'
    if re.search(lesson_pattern, content) and 'lessonCompleted' not in content:
        replacement = r'\1\n            window.dispatchEvent(new CustomEvent(\'lessonCompleted\'));'
        new_content = re.sub(lesson_pattern, replacement, content, count=1)
        if new_content != content:
            content = new_content
            modified = True
            result['changes'].append('Added lesson completion event')
    
    if modified:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            result['status'] = 'updated'
            return result
        except Exception as e:
            result['status'] = 'error'
            result['reason'] = f'Write error: {e}'
            return result
    
    result['status'] = 'skipped'
    result['reason'] = 'No completion handlers found'
    return result

def verify_lang_attribute(filepath: Path) -> Tuple[bool, str]:
    """Verify lang attribute is correct"""
    if not filepath.exists():
        return False, 'not_found'
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False, 'read_error'
    
    is_german = '-de.html' in filepath.name or filepath.name.endswith('.de.html')
    expected = 'de' if is_german else 'en'
    
    html_tag_match = re.search(r'<html[^>]*lang=["\']([^"\']*)["\']', content, re.IGNORECASE)
    
    if html_tag_match:
        current_lang = html_tag_match.group(1).lower()
        if current_lang == expected or current_lang.startswith(expected):
            return True, current_lang
        return False, current_lang
    
    return False, 'missing'

def main():
    """Complete full platform integration"""
    print("🔧 COMPLETE FULL PLATFORM INTEGRATION")
    print("=" * 60)
    
    # Find all HTML files
    html_files = find_html_files()
    print(f"\n📄 Found {len(html_files)} HTML files to check\n")
    
    # Phase 1: Add platform modules
    print("📝 Phase 1: Adding platform modules to remaining files...")
    modules_added = 0
    modules_skipped = 0
    modules_errors = []
    
    for filepath in html_files:
        result = add_platform_modules(filepath)
        if result['status'] == 'updated':
            modules_added += 1
            if modules_added <= 10:  # Show first 10
                print(f"  ✅ {filepath.name}")
        elif result['status'] == 'error':
            modules_errors.append(result)
        else:
            modules_skipped += 1
    
    if modules_added > 10:
        print(f"  ... and {modules_added - 10} more files")
    
    print(f"\n   ✅ Added modules to: {modules_added} files")
    print(f"   ⏭️  Skipped (already have): {modules_skipped} files")
    print(f"   ⚠️  Errors: {len(modules_errors)} files")
    
    # Phase 2: Add lesson events to stripe files
    print("\n📝 Phase 2: Adding lesson completion events to stripe files...")
    stripe_files = [f for f in html_files if 'stripe' in f.name.lower() and 'gamified' in f.name.lower()]
    events_added = 0
    
    for filepath in stripe_files:
        result = add_lesson_events_to_stripe(filepath)
        if result['status'] == 'updated':
            events_added += 1
            if events_added <= 10:
                print(f"  ✅ {filepath.name}: {', '.join(result['changes'])}")
    
    if events_added > 10:
        print(f"  ... and {events_added - 10} more files")
    
    print(f"\n   ✅ Added events to: {events_added} stripe files")
    
    # Phase 3: Verify lang attributes
    print("\n📝 Phase 3: Verifying lang attributes...")
    lang_issues = []
    
    for filepath in html_files:
        is_correct, current = verify_lang_attribute(filepath)
        if not is_correct:
            is_german = '-de.html' in filepath.name
            expected = 'de' if is_german else 'en'
            lang_issues.append((filepath.name, expected, current))
    
    if lang_issues:
        print(f"   ⚠️  Found {len(lang_issues)} files with lang attribute issues:")
        for filename, expected, current in lang_issues[:5]:
            print(f"      - {filename}: expected '{expected}', found '{current}'")
        if len(lang_issues) > 5:
            print(f"      ... and {len(lang_issues) - 5} more")
    else:
        print(f"   ✅ All files have correct lang attributes")
    
    # Summary
    print(f"\n📊 INTEGRATION SUMMARY")
    print("=" * 60)
    print(f"   ✅ Platform modules added: {modules_added} files")
    print(f"   ✅ Lesson events added: {events_added} stripe files")
    print(f"   ⚠️  Lang attribute issues: {len(lang_issues)} files")
    print(f"   ⚠️  Module errors: {len(modules_errors)} files")
    
    print(f"\n✅ Full platform integration complete!")
    
    if modules_errors:
        print(f"\n⚠️  Files with errors (first 5):")
        for err in modules_errors[:5]:
            print(f"      - {err['file']}: {err.get('reason', 'Unknown error')}")

if __name__ == '__main__':
    main()

