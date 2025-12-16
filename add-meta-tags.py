#!/usr/bin/env python3
"""
Task 9: Add Meta Tags for SEO
"""

import os
import re

def add_meta_tags(content, filepath):
    """Add missing meta tags to HTML"""
    modified = False
    original = content
    
    # Add viewport if missing
    if 'viewport' not in content and '<head>' in content:
        viewport_tag = '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        content = content.replace('<head>', f'<head>\n{viewport_tag}', 1)
        modified = True
    
    # Add description if missing
    if 'meta name="description"' not in content and '</head>' in content:
        # Extract title for description
        title_match = re.search(r'<title>([^<]+)</title>', content)
        if title_match:
            title = title_match.group(1).strip()
            # Clean title
            title = re.sub(r'\s+', ' ', title)
            description = f"{title} - TAP-IN Leadership Academy"
        else:
            # Use filename
            filename = os.path.basename(filepath).replace('.html', '').replace('-', ' ').title()
            description = f"{filename} - TAP-IN Leadership Academy"
        
        description_tag = f'    <meta name="description" content="{description}">\n'
        content = content.replace('</head>', f'{description_tag}</head>', 1)
        modified = True
    
    return content, modified

def process_file(filepath):
    """Process a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Add meta tags
        content, modified = add_meta_tags(content, filepath)
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    print("=== TASK 9: ADD META TAGS FOR SEO ===")
    print()
    
    files_updated = 0
    
    # Process all HTML files
    for root, dirs, files in os.walk('.'):
        if any(skip in root for skip in ['.git', 'archive', 'backup', 'node_modules']):
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    files_updated += 1
                    if files_updated % 50 == 0:
                        print(f"⏳ Updated {files_updated} files...")
    
    print()
    print(f"✅ Task 9 Complete: Updated {files_updated} files")
    print()
    print("Verification: Check pages without viewport/description...")

if __name__ == "__main__":
    main()

