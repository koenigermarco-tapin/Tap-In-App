#!/usr/bin/env python3
"""
Fix "Academic Cap" text that should be icons
Replaces text like "Academic Cap Begin Assessment" with proper icon SVG
"""

import os
import re
from pathlib import Path

def fix_button_text(content):
    """Fix button text that has 'Academic Cap' instead of icon"""
    changes = 0
    
    # Pattern 1: Button with "Academic Cap Begin Assessment"
    pattern1 = r'(<button[^>]*>)\s*Academic Cap\s+Begin Assessment'
    replacement1 = r'\1<svg class="hero-icon hero-icon-md" aria-hidden="true" style="margin-right: 8px;"><use href="icons/sprite.svg#icon-academic-cap"></use></svg>Begin Assessment'
    if re.search(pattern1, content):
        content = re.sub(pattern1, replacement1, content)
        changes += 1
    
    # Pattern 2: Any button with "Academic Cap" as text
    pattern2 = r'(<button[^>]*>)\s*Academic Cap\s+([^<]+)'
    replacement2 = r'\1<svg class="hero-icon hero-icon-md" aria-hidden="true" style="margin-right: 8px;"><use href="icons/sprite.svg#icon-academic-cap"></use></svg>\2'
    if re.search(pattern2, content):
        content = re.sub(pattern2, replacement2, content)
        changes += 1
    
    # Pattern 3: aria-label with "Academic Cap" (should just be descriptive text)
    pattern3 = r'aria-label="Academic Cap\s+([^"]+)"'
    replacement3 = r'aria-label="\1"'
    if re.search(pattern3, content):
        content = re.sub(pattern3, replacement3, content)
        changes += 1
    
    # Pattern 4: Text content with "Academic Cap" that should be icon (in headings, paragraphs, etc.)
    # But be careful - only replace when it's clearly meant to be an icon placeholder
    pattern4 = r'(<h[1-6][^>]*>)\s*Academic Cap\s+([^<]+)'
    replacement4 = r'\1<svg class="hero-icon hero-icon-md" aria-hidden="true" style="margin-right: 8px;"><use href="icons/sprite.svg#icon-academic-cap"></use></svg>\2'
    if re.search(pattern4, content):
        content = re.sub(pattern4, replacement4, content)
        changes += 1
    
    return content, changes

def fix_all_academic_cap_text(file_path):
    """Fix all instances of 'Academic Cap' text that should be icons"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        content, changes = fix_button_text(content)
        
        if changes > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes
        return 0
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 0

def main():
    """Main function"""
    repo_root = Path(__file__).parent
    total_changes = 0
    files_fixed = 0
    
    print("=== FIXING 'ACADEMIC CAP' TEXT TO ICONS ===\n")
    
    # Find all HTML files
    html_files = list(repo_root.rglob('*.html'))
    
    for file_path in html_files:
        # Skip certain directories
        if any(skip in str(file_path) for skip in ['node_modules', '.git', 'react-app', 'archive']):
            continue
        
        # Check if file has "Academic Cap" text
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'Academic Cap' in content and ('Begin Assessment' in content or '<button' in content):
                    changes = fix_all_academic_cap_text(file_path)
                    if changes > 0:
                        print(f"✅ Fixed {changes} instance(s) in: {file_path.relative_to(repo_root)}")
                        total_changes += changes
                        files_fixed += 1
        except:
            continue
    
    print(f"\n=== SUMMARY ===")
    print(f"✅ Files fixed: {files_fixed}")
    print(f"📊 Total changes: {total_changes}")

if __name__ == '__main__':
    main()

