#!/usr/bin/env python3
"""
Extend accessibility improvements to ALL HTML pages
"""

from pathlib import Path
import re

def add_skip_links(content):
    """Add skip links if missing"""
    if 'class="skip-link"' in content:
        return content, False
    
    skip_links = '''    <!-- Skip Links for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <a href="#navigation" class="skip-link">Skip to navigation</a>
'''
    
    body_pattern = r'(<body[^>]*>)'
    if re.search(body_pattern, content):
        content = re.sub(body_pattern, r'\1\n' + skip_links, content, count=1)
        return content, True
    
    return content, False

def add_accessibility_css(content):
    """Add accessibility CSS if missing"""
    if 'css/accessibility.css' in content:
        return content, False
    
    css_link = '<link rel="stylesheet" href="css/accessibility.css">'
    
    # Find existing CSS links
    css_pattern = r'(<link[^>]*rel="stylesheet"[^>]*>)'
    if re.search(css_pattern, content):
        content = re.sub(css_pattern, r'\1\n    ' + css_link, content, count=1)
        return content, True
    
    # Fallback: before </head>
    if '</head>' in content:
        content = re.sub(r'(</head>)', '    ' + css_link + '\n\1', content)
        return content, True
    
    return content, False

def add_keyboard_nav(content):
    """Add keyboard navigation script if missing"""
    if 'js/keyboard-navigation.js' in content:
        return content, False
    
    js_script = '<script src="js/keyboard-navigation.js" defer></script>'
    
    if '</body>' in content:
        content = re.sub(r'(</body>)', '    ' + js_script + '\n\1', content, count=1)
        return content, True
    elif '</html>' in content:
        content = re.sub(r'(</html>)', '    ' + js_script + '\n\1', content)
        return content, True
    
    return content, False

def add_semantic_ids(content):
    """Add semantic IDs to main and nav"""
    changes = False
    
    # Add id="main-content" to main
    if '<main' in content and 'id="main-content"' not in content:
        if not re.search(r'<main[^>]*id=', content):
            content = re.sub(r'(<main[^>]*)(>)', r'\1 id="main-content" tabindex="-1"\2', content, count=1)
            changes = True
    
    # Add id="navigation" to nav (first one)
    nav_matches = list(re.finditer(r'<nav[^>]*>', content))
    if nav_matches and 'id="navigation"' not in content[:nav_matches[0].end()]:
        first_nav = nav_matches[0]
        if 'id=' not in first_nav.group(0):
            content = content[:first_nav.start()] + first_nav.group(0).replace('>', ' id="navigation">', 1) + content[first_nav.end():]
            changes = True
    
    return content, changes

def improve_file(filepath):
    """Apply all accessibility improvements"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # Apply improvements
    content, changed = add_skip_links(content)
    if changed:
        changes.append("skip links")
    
    content, changed = add_accessibility_css(content)
    if changed:
        changes.append("accessibility CSS")
    
    content, changed = add_keyboard_nav(content)
    if changed:
        changes.append("keyboard nav")
    
    content, changed = add_semantic_ids(content)
    if changed:
        changes.append("semantic IDs")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def main():
    print("=" * 80)
    print("♿ EXTENDING ACCESSIBILITY TO ALL PAGES")
    print("=" * 80)
    print()
    
    # Find all HTML files (except priority ones already done)
    all_html_files = list(Path('.').glob('*.html'))
    
    # Exclude priority files (already done) and specific patterns
    exclude_patterns = ['node_modules', '.git', 'react-app', 'test', 'spec']
    html_files = [
        f for f in all_html_files
        if not any(exclude in str(f) for exclude in exclude_patterns)
        and f.name not in ['index.html', 'gym-dashboard.html', 'learning-hub.html', 'belt-assessment-v2.html']
    ]
    
    # Also include German versions and stripe files
    stripe_files = list(Path('.').glob('*-stripe*-gamified*.html'))
    html_files.extend(stripe_files)
    
    html_files = list(set(html_files))  # Remove duplicates
    html_files.sort()
    
    print(f"Found {len(html_files)} files to update\n")
    
    updated = 0
    skipped = 0
    
    for filepath in html_files[:30]:  # Limit to first 30 for now
        print(f"📝 {filepath.name}...")
        try:
            success, changes = improve_file(filepath)
            if success:
                updated += 1
                print(f"  ✅ Added: {', '.join(changes)}")
            else:
                skipped += 1
                print(f"  ⏭️  Already has accessibility")
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    if len(html_files) > 30:
        print(f"\n... and {len(html_files) - 30} more files to process")
    
    print()
    print("=" * 80)
    print(f"✅ Updated: {updated}/{min(30, len(html_files))}")
    print(f"⏭️  Skipped: {skipped}")
    print("=" * 80)

if __name__ == '__main__':
    main()

