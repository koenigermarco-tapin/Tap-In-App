#!/usr/bin/env python3
"""Final fix for all White Belt files - ensure minified JS is commented out"""

import re
from pathlib import Path

def fix_minified_js(filepath):
    """Ensure minified JS files are commented out"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # Check if minified files are still active (not commented)
    if '<script src="../../../js/performance-optimizer.min.js"></script>' in content:
        # Check if it's already in a comment
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'performance-optimizer.min.js' in line and '<script' in line:
                # Check if previous line has comment start
                if i > 0 and '<!-- REMOVED' not in lines[i-1] and '<!--' not in lines[i-1]:
                    # Need to add comment
                    comment_start = '<!-- REMOVED: Syntax errors in minified files causing console errors'
                    if i > 0 and '<!-- Performance Optimizer' in lines[i-1]:
                        lines[i-1] = lines[i-1] + '\n' + comment_start
                    else:
                        lines.insert(i, comment_start)
                    changes.append("Added comment start")
                
                # Find storage-health line
                for j in range(i+1, min(i+5, len(lines))):
                    if 'storage-health.min.js' in lines[j] and '<script' in lines[j]:
                        # Add comment end after storage-health
                        if j+1 < len(lines) and '-->' not in lines[j+1]:
                            lines.insert(j+1, '-->')
                            changes.append("Added comment end")
                        break
                break
        
        content = '\n'.join(lines)
    
    # Alternative: Use regex to find and comment out the block
    pattern = r'(<!-- Performance Optimizer[^>]*>)\s*<script src="[^"]*performance-optimizer\.min\.js"></script>\s*<script src="[^"]*shared-quiz-system\.js"></script>'
    replacement = r'\1\n<!-- REMOVED: Syntax errors in minified files causing console errors\n<script src="../../../js/performance-optimizer.min.js"></script>\n<script src="../../../js/storage-health.min.js"></script>\n-->\n<script src="../../../js/shared-quiz-system.js"></script>'
    
    if re.search(pattern, content) and 'REMOVED' not in content.split('performance-optimizer')[0].split('performance-optimizer')[1].split('</script>')[0]:
        content = re.sub(
            r'(<!-- Performance Optimizer[^>]*>)\s*<script src="[^"]*performance-optimizer\.min\.js"></script>',
            r'\1\n<!-- REMOVED: Syntax errors in minified files causing console errors\n<script src="../../../js/performance-optimizer.min.js"></script>',
            content
        )
        content = re.sub(
            r'<script src="[^"]*storage-health\.min\.js"></script>',
            r'<script src="../../../js/storage-health.min.js"></script>\n-->',
            content,
            count=1
        )
        changes.append("Commented out minified JS files")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    return False, []

# Files to check
files = [
    'src/pages/gym/white-belt-stripe1-gamified.html',
    'src/pages/gym/white-belt-stripe2-gamified.html',
    'src/pages/gym/white-belt-stripe3-gamified.html',
    'src/pages/gym/white-belt-stripe4-gamified.html',
    'src/pages/gym/white-belt-stripe1-gamified-de.html',
    'src/pages/gym/white-belt-stripe2-gamified-de.html',
    'src/pages/gym/white-belt-stripe3-gamified-de.html',
    'src/pages/gym/white-belt-stripe4-gamified-de.html',
]

print("🔍 Checking all White Belt files for minified JS issues...")
print("=" * 60)

fixed = 0
for filepath in files:
    path = Path(filepath)
    if path.exists():
        changed, changes = fix_minified_js(path)
        if changed:
            print(f"\n✅ Fixed: {path.name}")
            for change in changes:
                print(f"   {change}")
            fixed += 1
        else:
            # Check if already fixed
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'REMOVED: Syntax errors' in content or 'performance-optimizer.min.js' not in content:
                print(f"✓ {path.name} - Already fixed")
            elif 'performance-optimizer.min.js' in content:
                print(f"⚠️  {path.name} - Still has uncommented minified JS")
    else:
        print(f"❌ {path.name} - File not found")

print("\n" + "=" * 60)
print(f"✅ Checked {len(files)} files, {fixed} needed fixes")

