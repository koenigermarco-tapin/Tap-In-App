#!/usr/bin/env python3
"""
Add comprehensive ARIA labels to all interactive elements
"""

from pathlib import Path
import re

def add_aria_to_buttons(content):
    """Add ARIA labels to buttons without visible text"""
    changes = False
    
    # Pattern: <button> with only icons/symbols
    patterns = [
        (r'<button([^>]*>)\s*(?:×|✕|✖|×|Close|X)\s*</button>', r'<button\1 aria-label="Close">\2</button>'),
        (r'<button([^>]*>)\s*(?:☰|☵|☷|Menu)\s*</button>', r'<button\1 aria-label="Open menu">\2</button>'),
        (r'<button([^>]*>)\s*(?:❌|×)\s*</button>', r'<button\1 aria-label="Close">\2</button>'),
        (r'<button([^>]*>)\s*(?:✓|✅|✔)\s*</button>', r'<button\1 aria-label="Confirm">\2</button>'),
    ]
    
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content, count=10)
            changes = True
    
    return content, changes

def add_aria_to_links(content):
    """Add ARIA labels to icon-only links"""
    changes = False
    
    # Social media links
    social_patterns = [
        (r'<a([^>]*href="[^"]*twitter[^"]*"[^>]*>)\s*[^<]*twitter[^<]*</a>', r'<a\1 aria-label="Follow on Twitter">'),
        (r'<a([^>]*href="[^"]*facebook[^"]*"[^>]*>)\s*[^<]*facebook[^<]*</a>', r'<a\1 aria-label="Follow on Facebook">'),
        (r'<a([^>]*href="[^"]*linkedin[^"]*"[^>]*>)\s*[^<]*linkedin[^<]*</a>', r'<a\1 aria-label="Connect on LinkedIn">'),
        (r'<a([^>]*href="[^"]*instagram[^"]*"[^>]*>)\s*[^<]*instagram[^<]*</a>', r'<a\1 aria-label="Follow on Instagram">'),
    ]
    
    for pattern, replacement in social_patterns:
        if re.search(pattern, content, re.IGNORECASE):
            content = re.sub(pattern, replacement, content, count=5, flags=re.IGNORECASE)
            changes = True
    
    return content, changes

def add_aria_to_forms(content):
    """Add ARIA attributes to form inputs"""
    changes = False
    
    # Add aria-required to required inputs
    if 'required' in content and 'aria-required' not in content:
        content = re.sub(r'(<input[^>]*required[^>]*>)', r'\1 aria-required="true"', content, count=20)
        content = re.sub(r'(<textarea[^>]*required[^>]*>)', r'\1 aria-required="true"', content, count=10)
        changes = True
    
    # Add aria-describedby for help text
    # This is more complex, so we'll add a marker for manual review
    if 'placeholder' in content and 'aria-describedby' not in content:
        # Find inputs with placeholders and add aria-describedby if help text exists
        pass
    
    return content, changes

def add_aria_to_navigation(content):
    """Add ARIA attributes to navigation"""
    changes = False
    
    # Add role="navigation" if not present
    if '<nav' in content and 'role=' not in re.search(r'<nav[^>]*>', content).group(0) if re.search(r'<nav[^>]*>', content) else '':
        content = re.sub(r'<nav([^>]*)>', r'<nav\1 role="navigation">', content, count=5)
        changes = True
    
    # Add aria-label to nav if missing
    nav_matches = re.finditer(r'<nav([^>]*)>', content)
    for match in nav_matches:
        nav_attrs = match.group(1)
        if 'aria-label' not in nav_attrs and 'aria-labelledby' not in nav_attrs:
            content = content.replace(match.group(0), f'<nav{nav_attrs} aria-label="Main navigation">', 1)
            changes = True
            break
    
    # Add aria-current="page" to current nav item
    current_page = None
    if 'index.html' in content or 'index"' in content:
        current_page = 'index'
    
    return content, changes

def add_aria_to_images(content):
    """Add alt text to images missing it"""
    changes = False
    
    # Find images without alt
    img_pattern = r'<img([^>]*)(?<!alt=)(?<!alt=")(?<!alt=\')([^>]*)>'
    matches = re.finditer(img_pattern, content)
    
    for match in list(matches)[:20]:  # Limit to 20 to avoid too many changes
        img_attrs = match.group(1) + match.group(2)
        if 'alt=' not in img_attrs:
            # Skip decorative images (those with aria-hidden already)
            if 'aria-hidden' not in img_attrs:
                new_img = match.group(0).replace('>', ' alt="">', 1)
                content = content.replace(match.group(0), new_img, 1)
                changes = True
    
    return content, changes

def add_aria_to_icons(content):
    """Add aria-hidden to decorative icons"""
    changes = False
    
    # Find SVG icons inside buttons/links
    svg_pattern = r'(<(?:button|a)[^>]*>)\s*<svg([^>]*)>'
    matches = re.finditer(svg_pattern, content)
    
    for match in list(matches)[:30]:  # Limit changes
        svg_tag = match.group(0)
        if 'aria-hidden' not in svg_tag:
            new_svg = svg_tag.replace('<svg', '<svg aria-hidden="true"')
            content = content.replace(svg_tag, new_svg, 1)
            changes = True
    
    return content, changes

def improve_accessibility(filepath):
    """Apply all ARIA improvements"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # Apply all improvements
    content, changed = add_aria_to_buttons(content)
    if changed:
        changes.append("button labels")
    
    content, changed = add_aria_to_links(content)
    if changed:
        changes.append("link labels")
    
    content, changed = add_aria_to_forms(content)
    if changed:
        changes.append("form attributes")
    
    content, changed = add_aria_to_navigation(content)
    if changed:
        changes.append("navigation")
    
    content, changed = add_aria_to_images(content)
    if changed:
        changes.append("image alt")
    
    content, changed = add_aria_to_icons(content)
    if changed:
        changes.append("icon labels")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def main():
    print("=" * 80)
    print("♿ ADDING COMPREHENSIVE ARIA LABELS")
    print("=" * 80)
    print()
    
    # Priority pages first
    priority_files = [
        'index.html',
        'gym-dashboard.html',
        'learning-hub.html',
        'belt-assessment-v2.html',
    ]
    
    files_to_update = []
    for page in priority_files:
        if Path(page).exists():
            files_to_update.append(Path(page))
    
    print(f"Found {len(files_to_update)} priority files\n")
    
    updated = 0
    
    for filepath in files_to_update:
        print(f"📝 {filepath.name}...")
        try:
            success, changes = improve_accessibility(filepath)
            if success:
                updated += 1
                print(f"  ✅ Added: {', '.join(changes)}")
            else:
                print(f"  ⏭️  No ARIA improvements needed")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(files_to_update)}")
    print("=" * 80)

if __name__ == '__main__':
    main()

