#!/usr/bin/env python3
"""
Code Cleanup
- Remove commented-out code
- Standardize naming conventions
- Remove unused CSS classes (basic check)
"""

from pathlib import Path
import re

def remove_commented_code(content):
    """Remove HTML and CSS commented-out code"""
    
    changes = 0
    
    # Remove HTML comments that look like commented code (not important comments)
    # Keep comments that are documentation
    html_comment_pattern = r'<!--\s*(TODO|FIXME|NOTE|IMPORTANT|WARNING|BUG|HACK|XXX).*?-->'
    # Don't remove important comments
    
    # Remove old commented-out code blocks
    old_code_pattern = r'<!--\s*(OLD|DEPRECATED|UNUSED|REMOVE).*?-->'
    new_content = re.sub(old_code_pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    if new_content != content:
        changes += 1
        content = new_content
    
    return content, changes > 0

def remove_debug_console_logs(content):
    """Remove debug console.log statements"""
    
    # Pattern: console.log('debug message') or console.log("debug")
    debug_patterns = [
        r'console\.log\(["\'](debug|DEBUG|Debug|test|TEST|Test).*?\);',
        r'console\.log\(["\'].*?loaded successfully.*?\);',
    ]
    
    changes = 0
    for pattern in debug_patterns:
        new_content = re.sub(pattern, '', content, flags=re.IGNORECASE)
        if new_content != content:
            changes += 1
            content = new_content
    
    return content, changes > 0

def standardize_indentation(content):
    """Standardize indentation (basic - tabs vs spaces)"""
    # This is complex, so we'll just report inconsistencies
    # In practice, you'd want to use a proper formatter
    
    has_tabs = '\t' in content
    has_spaces = '    ' in content or '  ' in content
    
    if has_tabs and has_spaces:
        return content, False  # Mixed indentation found but not auto-fixing
    
    return content, False

def cleanup_file(filepath):
    """Apply code cleanup to a file"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # 1. Remove commented code
    content, changed = remove_commented_code(content)
    if changed:
        changes.append("Commented code removed")
    
    # 2. Remove debug console logs
    content, changed = remove_debug_console_logs(content)
    if changed:
        changes.append("Debug console logs removed")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def main():
    print("=" * 80)
    print("🧹 CODE CLEANUP")
    print("=" * 80)
    print()
    
    # Sample files for cleanup
    files_to_clean = [
        'index.html',
        'gym-dashboard.html',
    ]
    
    print(f"Cleaning {len(files_to_clean)} files...\n")
    
    updated = 0
    
    for filename in files_to_clean:
        filepath = Path(filename)
        if not filepath.exists():
            continue
        
        print(f"📝 {filename}...")
        try:
            success, changes = cleanup_file(filepath)
            if success:
                updated += 1
                print(f"  ✅ Cleaned: {', '.join(changes)}")
            else:
                print(f"  ⏭️  No cleanup needed")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Cleaned: {updated}/{len(files_to_clean)} files")
    print("=" * 80)
    print()
    print("💡 Note: Manual review recommended for:")
    print("   - Unused CSS classes")
    print("   - Duplicate code")
    print("   - Naming conventions")

if __name__ == '__main__':
    main()

