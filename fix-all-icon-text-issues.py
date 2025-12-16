#!/usr/bin/env python3
"""
Comprehensive fix for icon text issues
Replaces text like "Academic Cap" that should be icons with proper SVG icons
"""

import os
import re
from pathlib import Path

def fix_academic_cap_in_buttons(content):
    """Fix 'Academic Cap' text in buttons"""
    changes = 0
    
    # Pattern: Button with "Academic Cap" as text before other text
    patterns = [
        # Button with "Academic Cap Begin Assessment"
        (r'(<button[^>]*>)\s*Academic Cap\s+Begin Assessment', 
         r'\1<svg class="hero-icon hero-icon-md" aria-hidden="true" style="margin-right: 8px; vertical-align: middle;"><use href="icons/sprite.svg#icon-academic-cap"></use></svg>Begin Assessment'),
        
        # Button with "Academic Cap" followed by any text
        (r'(<button[^>]*>)\s*Academic Cap\s+([A-Z][^<]+)', 
         r'\1<svg class="hero-icon hero-icon-md" aria-hidden="true" style="margin-right: 8px; vertical-align: middle;"><use href="icons/sprite.svg#icon-academic-cap"></use></svg>\2'),
        
        # aria-label with "Academic Cap" (remove it, keep the rest)
        (r'aria-label="Academic Cap\s+([^"]+)"', 
         r'aria-label="\1"'),
    ]
    
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes += 1
    
    return content, changes

def fix_academic_cap_in_headings(content):
    """Fix 'Academic Cap' text in headings that should be icons"""
    changes = 0
    
    # Pattern: Heading with "Academic Cap" as prefix
    pattern = r'(<h[1-6][^>]*>)\s*Academic Cap\s+([^<]+)'
    replacement = r'\1<svg class="hero-icon hero-icon-md" aria-hidden="true" style="margin-right: 8px; vertical-align: middle;"><use href="icons/sprite.svg#icon-academic-cap"></use></svg>\2'
    
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
        changes += 1
    
    return content, changes

def fix_academic_cap_in_other_elements(content):
    """Fix 'Academic Cap' text in other elements (divs, spans, etc.)"""
    changes = 0
    
    # Pattern: Elements with "Academic Cap" followed by text (but not in already processed buttons/headings)
    # Only fix if it's clearly meant to be an icon (followed by capital letter or common button text)
    patterns = [
        # In div/span with class containing "button", "btn", "icon"
        (r'(<(?:div|span)[^>]*(?:class="[^"]*(?:button|btn|icon)[^"]*")[^>]*>)\s*Academic Cap\s+([A-Z][^<]+)', 
         r'\1<svg class="hero-icon hero-icon-md" aria-hidden="true" style="margin-right: 8px; vertical-align: middle;"><use href="icons/sprite.svg#icon-academic-cap"></use></svg>\2'),
    ]
    
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes += 1
    
    return content, changes

def fix_all_icon_text_issues(file_path):
    """Fix all icon text issues in a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        total_changes = 0
        
        # Fix buttons first
        content, changes = fix_academic_cap_in_buttons(content)
        total_changes += changes
        
        # Fix headings
        content, changes = fix_academic_cap_in_headings(content)
        total_changes += changes
        
        # Fix other elements
        content, changes = fix_academic_cap_in_other_elements(content)
        total_changes += changes
        
        if total_changes > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return total_changes
        return 0
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 0

def main():
    """Main function"""
    repo_root = Path(__file__).parent
    total_changes = 0
    files_fixed = 0
    
    print("=== FIXING ALL ICON TEXT ISSUES ===\n")
    
    # Find all HTML files
    html_files = list(repo_root.rglob('*.html'))
    
    for file_path in html_files:
        # Skip certain directories
        if any(skip in str(file_path) for skip in ['node_modules', '.git', 'react-app', 'archive']):
            continue
        
        # Check if file has "Academic Cap" text that might need fixing
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Only process if it has "Academic Cap" and looks like it might be an icon issue
                if 'Academic Cap' in content and ('<button' in content or '<h' in content):
                    changes = fix_all_icon_text_issues(file_path)
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

