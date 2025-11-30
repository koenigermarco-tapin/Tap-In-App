#!/usr/bin/env python3
"""
Add analytics.js to all pages
"""

from pathlib import Path
import re

PRIORITY_PAGES = [
    'index.html',
    'gym-dashboard.html',
    'learning-hub.html',
    'belt-assessment-v2.html',
]

def add_analytics_script(content):
    """Add analytics.js script"""
    
    js_script = '<script src="js/analytics.js" defer></script>'
    
    if 'js/analytics.js' in content:
        return content, False
    
    # Insert before </body> or </html>
    if '</body>' in content:
        content = re.sub(r'(</body>)', '    ' + js_script + '\n\1', content, count=1)
        return content, True
    elif '</html>' in content:
        content = re.sub(r'(</html>)', '    ' + js_script + '\n\1', content, count=1)
        return content, True
    
    return content, False

def main():
    print("=" * 80)
    print("📊 ADDING ANALYTICS TO ALL PAGES")
    print("=" * 80)
    print()
    
    updated = 0
    
    for filename in PRIORITY_PAGES:
        filepath = Path(filename)
        if not filepath.exists():
            continue
        
        print(f"📝 {filename}...")
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content, changed = add_analytics_script(content)
            
            if changed:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated += 1
                print(f"  ✅ Added analytics script")
            else:
                print(f"  ⏭️  Already has analytics")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(PRIORITY_PAGES)}")
    print("=" * 80)

if __name__ == '__main__':
    main()

