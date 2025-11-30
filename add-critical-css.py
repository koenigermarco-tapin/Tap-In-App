#!/usr/bin/env python3
"""
Add critical CSS inlining for above-the-fold content
"""

from pathlib import Path

PRIORITY_PAGES = [
    'index.html',
    'gym-dashboard.html',
    'learning-hub.html',
]

CRITICAL_CSS = '''    <style>
      /* Critical Above-the-Fold CSS */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #1f2937;
        background: #ffffff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #1a365d;
        color: #ffffff;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 9999;
        font-weight: 600;
      }
      .skip-link:focus {
        top: 0;
      }
      header, nav {
        display: block;
      }
      .hero {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      h1 {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 700;
        line-height: 1.2;
      }
    </style>'''

def add_critical_css(filepath):
    """Add critical CSS inline in head"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has critical CSS
    if '/* Critical Above-the-Fold CSS */' in content:
        return content, False
    
    # Insert after <head> or after charset meta
    if '<meta charset' in content:
        content = content.replace(
            '<meta charset',
            CRITICAL_CSS + '\n    <meta charset',
            1
        )
        return content, True
    elif '<head' in content:
        head_match = content.find('<head')
        if head_match != -1:
            head_end = content.find('>', head_match) + 1
            content = content[:head_end] + '\n' + CRITICAL_CSS + content[head_end:]
            return content, True
    
    return content, False

def main():
    print("=" * 80)
    print("⚡ ADDING CRITICAL CSS")
    print("=" * 80)
    print()
    
    updated = 0
    
    for filename in PRIORITY_PAGES:
        filepath = Path(filename)
        if not filepath.exists():
            continue
        
        print(f"📝 {filename}...")
        try:
            content, changed = add_critical_css(filepath)
            if changed:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated += 1
                print(f"  ✅ Added critical CSS")
            else:
                print(f"  ⏭️  Already has critical CSS")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(PRIORITY_PAGES)}")
    print("=" * 80)

if __name__ == '__main__':
    main()

