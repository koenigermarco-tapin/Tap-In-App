#!/usr/bin/env python3
"""
Add resource hints (preconnect, prefetch) for performance
"""

from pathlib import Path
import re

PRIORITY_PAGES = [
    'index.html',
    'gym-dashboard.html',
    'learning-hub.html',
    'belt-assessment-v2.html',
]

def add_resource_hints(content):
    """Add preconnect and prefetch hints"""
    changes = False
    
    hints = '''    <!-- Resource Hints for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
'''
    
    if 'rel="preconnect"' in content and 'fonts.googleapis.com' in content:
        # Already has preconnect
        return content, False
    
    # Find <head> tag
    head_pattern = r'(<head[^>]*>)'
    if re.search(head_pattern, content):
        # Check if meta charset exists
        if '<meta charset' in content:
            # Insert after charset
            content = re.sub(r'(<meta charset[^>]*>)', r'\1\n' + hints, content, count=1)
            changes = True
        else:
            # Insert after <head>
            content = re.sub(head_pattern, r'\1\n' + hints, content, count=1)
            changes = True
    
    return content, changes

def add_preload_hints(content):
    """Add preload for critical resources"""
    changes = False
    
    # Determine critical resources based on page
    current_path = Path('temp.html')
    if hasattr(content, 'path'):
        current_path = Path(content.path)
    
    preloads = []
    
    # Common critical resources
    preloads.append('<link rel="preload" href="/css/core-styles.css" as="style">')
    preloads.append('<link rel="preload" href="/js/core-gamification.js" as="script">')
    
    # Check what exists on page
    if 'css/accessibility.css' in content:
        preloads.append('<link rel="preload" href="/css/accessibility.css" as="style">')
    
    preload_hints = '    <!-- Preload Critical Resources -->\n    ' + '\n    '.join(preloads)
    
    # Add after resource hints
    if '<!-- Resource Hints' in content:
        content = content.replace('<!-- Resource Hints', preload_hints + '\n\n    <!-- Resource Hints')
        changes = True
    
    return content, changes

def add_prefetch_links(content, filepath):
    """Add prefetch for likely next navigation"""
    changes = False
    
    filename = filepath.name.lower()
    prefetch_links = []
    
    # Smart prefetching based on current page
    if 'index.html' in filename:
        prefetch_links.append('<link rel="prefetch" href="/learning-hub.html">')
        prefetch_links.append('<link rel="prefetch" href="/belt-assessment-v2.html">')
    elif 'learning-hub' in filename:
        prefetch_links.append('<link rel="prefetch" href="/white-belt-stripe1-gamified.html">')
    elif 'dashboard' in filename:
        prefetch_links.append('<link rel="prefetch" href="/learning-hub.html">')
    elif 'stripe1' in filename:
        prefetch_links.append('<link rel="prefetch" href="' + filename.replace('stripe1', 'stripe2') + '">')
    
    if prefetch_links:
        prefetch_block = '    <!-- Prefetch Next Likely Navigation -->\n    ' + '\n    '.join(prefetch_links)
        
        # Add before </head>
        if '</head>' in content:
            content = re.sub(r'(</head>)', prefetch_block + '\n\1', content, count=1)
            changes = True
    
    return content, changes

def main():
    print("=" * 80)
    print("⚡ ADDING RESOURCE HINTS")
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
            
            original = content
            
            # Add resource hints
            content, changed1 = add_resource_hints(content)
            
            # Add preload hints
            content, changed2 = add_preload_hints(content)
            
            # Add prefetch links
            content, changed3 = add_prefetch_links(content, filepath)
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated += 1
                changes_list = []
                if changed1: changes_list.append("preconnect")
                if changed2: changes_list.append("preload")
                if changed3: changes_list.append("prefetch")
                print(f"  ✅ Added: {', '.join(changes_list)}")
            else:
                print(f"  ⏭️  Already has resource hints")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(PRIORITY_PAGES)}")
    print("=" * 80)

if __name__ == '__main__':
    main()

