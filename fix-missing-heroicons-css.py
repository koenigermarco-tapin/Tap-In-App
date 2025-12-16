#!/usr/bin/env python3
"""
Fix Missing Heroicons CSS
Adds hero-icons.css link to all HTML files that use heroicons but don't have the CSS
"""

import os
import re
from pathlib import Path

def has_heroicons(file_path):
    """Check if file uses heroicons"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            return 'sprite.svg#icon-' in content or 'hero-icon' in content
    except:
        return False

def has_css_link(file_path):
    """Check if file already has hero-icons.css"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return 'hero-icons.css' in f.read()
    except:
        return False

def add_css_link(file_path):
    """Add hero-icons.css link to file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already has CSS
        if 'hero-icons.css' in content:
            return False
        
        # Pattern 1: After accessibility.css
        pattern1 = r'(<link\s+rel="stylesheet"\s+href="css/accessibility\.css">)'
        replacement1 = r'\1\n    <link rel="stylesheet" href="css/hero-icons.css">'
        
        if re.search(pattern1, content):
            content = re.sub(pattern1, replacement1, content, count=1)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        # Pattern 2: After other CSS links (core-styles, dark-mode, etc.)
        pattern2 = r'(<link\s+rel="stylesheet"\s+href="css/[^"]+\.css">)'
        replacement2 = r'\1\n    <link rel="stylesheet" href="css/hero-icons.css">'
        
        if re.search(pattern2, content):
            # Get the last CSS link
            matches = list(re.finditer(pattern2, content))
            if matches:
                last_match = matches[-1]
                pos = last_match.end()
                content = content[:pos] + '\n    <link rel="stylesheet" href="css/hero-icons.css">' + content[pos:]
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
        
        # Pattern 3: Before </head> or <body>
        pattern3 = r'(</head>|<body)'
        if re.search(pattern3, content):
            content = re.sub(pattern3, r'    <link rel="stylesheet" href="css/hero-icons.css">\n\1', content, count=1)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function"""
    repo_root = Path(__file__).parent
    fixed_count = 0
    skipped_count = 0
    error_count = 0
    
    print("=== FIXING MISSING HEROICONS CSS ===\n")
    
    # Find all HTML files
    html_files = list(repo_root.rglob('*.html'))
    
    for file_path in html_files:
        # Skip certain directories
        if any(skip in str(file_path) for skip in ['node_modules', '.git', 'react-app']):
            continue
        
        # Check if file uses heroicons
        if not has_heroicons(file_path):
            continue
        
        # Skip if already has CSS
        if has_css_link(file_path):
            skipped_count += 1
            continue
        
        # Add CSS link
        if add_css_link(file_path):
            print(f"✅ Fixed: {file_path.relative_to(repo_root)}")
            fixed_count += 1
        else:
            print(f"⚠️  Could not fix: {file_path.relative_to(repo_root)}")
            error_count += 1
    
    print(f"\n=== SUMMARY ===")
    print(f"✅ Fixed: {fixed_count} files")
    print(f"⏭️  Skipped (already has CSS): {skipped_count} files")
    print(f"❌ Errors: {error_count} files")
    print(f"📊 Total processed: {fixed_count + skipped_count + error_count} files")

if __name__ == '__main__':
    main()

