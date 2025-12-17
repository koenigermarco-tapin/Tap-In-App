#!/usr/bin/env python3
"""Fix White Belt quiz system - apply fixes to all 8 files (4 EN + 4 DE)"""

import re
from pathlib import Path

def fix_white_belt_file(filepath, stripe_num, is_german=False):
    """Apply all fixes to a White Belt stripe file"""
    print(f"\n🔧 Fixing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # Fix 1: Remove/comment broken minified JS files
    if 'performance-optimizer.min.js' in content and 'REMOVED' not in content:
        content = re.sub(
            r'<!-- Performance Optimizer - Load First -->\s*<script src="[^"]*performance-optimizer\.min\.js"></script>',
            '<!-- Performance Optimizer - Load First -->\n<!-- REMOVED: Syntax errors in minified files\n<script src="../../../js/performance-optimizer.min.js"></script>',
            content
        )
        changes.append("✅ Commented out performance-optimizer.min.js")
    
    if 'storage-health.min.js' in content and 'REMOVED' not in content:
        # Find the storage-health line and comment it
        content = re.sub(
            r'<script src="[^"]*storage-health\.min\.js"></script>',
            '<script src="../../../js/storage-health.min.js"></script>\n-->',
            content
        )
        changes.append("✅ Commented out storage-health.min.js")
    
    # Fix 2: Fix syntax error on line with "message" (stray line)
    if re.search(r';\s+message\s+const', content):
        content = re.sub(r';\s+message\s+const', ';\n            const', content)
        changes.append("✅ Fixed stray 'message' line")
    
    # Fix 3: Fix style syntax error (text-align: center); -> text-align: center;)
    if 'text-align: center);' in content:
        content = content.replace('text-align: center);', 'text-align: center;')
        changes.append("✅ Fixed style syntax error")
    
    # Fix 4: Add debug script if not present
    if '=== WHITE BELT STRIPE' not in content and 'DEBUG ===' not in content:
        # Find the dynamic quiz loader script start
        debug_script = '''<script>
// ===== DEBUG SCRIPT =====
console.log('=== WHITE BELT STRIPE ''' + str(stripe_num) + (' DE' if is_german else '') + ''' DEBUG ===');
console.log('Page loading...');

window.addEventListener('error', function(e) {
    console.error('🚨 ERROR:', e.message, 'at line', e.lineno);
    console.error('File:', e.filename);
    console.error('Full error:', e);
});

window.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded');
    console.log('Checking quiz system...');
    console.log('  - allChunks exists?', typeof allChunks !== 'undefined');
    console.log('  - allChunks length:', typeof allChunks !== 'undefined' ? allChunks.length : 'N/A');
    console.log('  - loadDynamicQuiz exists?', typeof loadDynamicQuiz !== 'undefined');
});
</script>
'''
        
        # Insert before the dynamic quiz loader
        if '// Dynamic Quiz Loader' in content:
            content = content.replace(
                '<script>\n// Dynamic Quiz Loader',
                debug_script + '<script>\n// Dynamic Quiz Loader'
            )
            changes.append("✅ Added debug script")
    
    # Fix 5: Add console.log to loadDynamicQuiz
    if 'function loadDynamicQuiz()' in content and 'console.log' not in content.split('function loadDynamicQuiz()')[1].split('}')[0]:
        content = re.sub(
            r'(function loadDynamicQuiz\(\) \{[^}]*if \(typeof allChunks === \'undefined\'\))',
            r'\1\n            console.log(\'⏳ Waiting for allChunks to load...\');',
            content
        )
        content = re.sub(
            r'(if \(typeof allChunks === \'undefined\'\) \{[^}]*return;\s*\})',
            r'\1\n        console.log(\'✅ allChunks loaded:\', allChunks.length, \'chunks\');',
            content
        )
        changes.append("✅ Added debug logging to loadDynamicQuiz")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"   {len(changes)} fixes applied:")
        for change in changes:
            print(f"   {change}")
        return True
    else:
        print("   ⚠️  No changes needed (already fixed or no issues found)")
        return False

# Fix all White Belt files
base_dir = Path('src/pages/gym')

files_to_fix = [
    # English
    (base_dir / 'white-belt-stripe1-gamified.html', 1, False),
    (base_dir / 'white-belt-stripe2-gamified.html', 2, False),
    (base_dir / 'white-belt-stripe3-gamified.html', 3, False),
    (base_dir / 'white-belt-stripe4-gamified.html', 4, False),
    # German
    (base_dir / 'white-belt-stripe1-gamified-de.html', 1, True),
    (base_dir / 'white-belt-stripe2-gamified-de.html', 2, True),
    (base_dir / 'white-belt-stripe3-gamified-de.html', 3, True),
    (base_dir / 'white-belt-stripe4-gamified-de.html', 4, True),
]

print("🚀 Fixing White Belt Quiz System...")
print("=" * 60)

fixed_count = 0
for filepath, stripe_num, is_german in files_to_fix:
    if filepath.exists():
        if fix_white_belt_file(filepath, stripe_num, is_german):
            fixed_count += 1
    else:
        print(f"\n⚠️  File not found: {filepath.name}")

print("\n" + "=" * 60)
print(f"✅ Complete! Fixed {fixed_count} files.")
print("\n📋 Next steps:")
print("1. Test in browser - check console for errors")
print("2. Verify quiz questions load")
print("3. Test answer selection and feedback")

