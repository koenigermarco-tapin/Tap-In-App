#!/usr/bin/env python3
"""
Add all missing scripts to priority pages
"""

from pathlib import Path
import re

FILES = ['index.html', 'gym-dashboard.html', 'learning-hub.html', 'belt-assessment-v2.html']

SCRIPTS = [
    '<script src="js/dark-mode.js"></script>',
    '<script src="js/micro-interactions.js"></script>',
    '<script src="js/enhanced-loading-states.js"></script>'
]

def add_scripts(filepath):
    """Add scripts before </body> or </html>"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    added = []
    
    for script in SCRIPTS:
        script_name = script.split('/')[-1].replace('</script>', '')
        if script_name not in content:
            # Find </body> or </html>
            if '</body>' in content:
                content = re.sub(r'(</body>)', '    ' + script + '\n\1', content, count=1)
                added.append(script_name)
            elif '</html>' in content:
                content = re.sub(r'(</html>)', '    ' + script + '\n\1', content, count=1)
                added.append(script_name)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, added
    
    return False, []

def main():
    print("=" * 80)
    print("🔧 ADDING ALL SCRIPTS TO PRIORITY PAGES")
    print("=" * 80)
    print()
    
    updated = 0
    
    for filename in FILES:
        filepath = Path(filename)
        if not filepath.exists():
            continue
        
        print(f"📝 {filename}...")
        try:
            success, added = add_scripts(filepath)
            if success:
                updated += 1
                print(f"  ✅ Added: {', '.join(added)}")
            else:
                print(f"  ✅ Already has all scripts")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(FILES)}")
    print("=" * 80)

if __name__ == '__main__':
    main()

