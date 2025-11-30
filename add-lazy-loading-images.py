#!/usr/bin/env python3
"""
Add lazy loading to all images in HTML files
"""

from pathlib import Path
import re

def add_lazy_loading(filepath):
    """Add loading='lazy' to all <img> tags"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Pattern 1: <img ...> without loading attribute
    # Match img tags that don't already have loading attribute
    pattern1 = r'<img\s+((?:(?!loading=)[^>])*?)>'
    
    def add_loading(match):
        tag_content = match.group(1)
        # Skip if already has loading attribute
        if 'loading=' in tag_content:
            return match.group(0)
        # Add loading="lazy" before closing >
        return f'<img {tag_content} loading="lazy">'
    
    content = re.sub(pattern1, add_loading, content, flags=re.IGNORECASE)
    
    # Pattern 2: <img ... /> self-closing
    pattern2 = r'<img\s+((?:(?!loading=)[^>])*?)\s*/>'
    
    def add_loading_self_closing(match):
        tag_content = match.group(1)
        if 'loading=' in tag_content:
            return match.group(0)
        return f'<img {tag_content} loading="lazy" />'
    
    content = re.sub(pattern2, add_loading_self_closing, content, flags=re.IGNORECASE)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🖼️  Adding lazy loading to images...")
    
    html_files = []
    for html_file in Path('.').rglob('*.html'):
        if any(skip in str(html_file) for skip in ['node_modules', '.git', 'react-app']):
            continue
        html_files.append(html_file)
    
    updated = 0
    for html_file in html_files:
        if add_lazy_loading(html_file):
            updated += 1
            print(f"  ✅ {html_file}")
    
    print(f"\n✅ Updated {updated}/{len(html_files)} files")

if __name__ == '__main__':
    main()

