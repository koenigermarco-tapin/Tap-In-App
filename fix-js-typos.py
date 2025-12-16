#!/usr/bin/env python3
"""
Fix JS file reference typos across all HTML files
- global-eror-handler -> global-error-handler
- scren-reader-enhancements -> screen-reader-enhancements
"""

import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent

# Patterns to fix
FIXES = [
    (r'global-eror-handler', 'global-error-handler'),
    (r'scren-reader-enhancements', 'screen-reader-enhancements'),
]

def fix_file(filepath):
    """Fix typos in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = 0
        
        for pattern, replacement in FIXES:
            # Fix in src attributes
            new_content = re.sub(
                rf'src=["\']([^"\']*){re.escape(pattern)}([^"\']*)["\']',
                rf'src="\1{replacement}\2"',
                content
            )
            if new_content != content:
                changes += len(re.findall(re.escape(pattern), content))
                content = new_content
            
            # Fix in href attributes (if any)
            new_content = re.sub(
                rf'href=["\']([^"\']*){re.escape(pattern)}([^"\']*)["\']',
                rf'href="\1{replacement}\2"',
                content
            )
            if new_content != content:
                changes += len(re.findall(re.escape(pattern), content))
                content = new_content
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes
        
        return 0
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return 0

def main():
    """Fix all HTML files"""
    html_files = list(BASE_DIR.rglob('*.html'))
    
    total_fixes = 0
    files_fixed = 0
    
    for html_file in html_files:
        fixes = fix_file(html_file)
        if fixes > 0:
            files_fixed += 1
            total_fixes += fixes
            print(f"Fixed {fixes} instances in {html_file.relative_to(BASE_DIR)}")
    
    print(f"\n✅ Fixed {total_fixes} typos across {files_fixed} files")

if __name__ == '__main__':
    main()

