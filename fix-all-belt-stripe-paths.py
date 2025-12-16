#!/usr/bin/env python3
"""
Fix all CSS and icon paths in belt stripe files
Changes css/ to ../../../css/ and icons/ to ../../../icons/
"""

import os
import re
from pathlib import Path

def fix_paths_in_file(filepath):
    """Fix CSS and icon paths in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix CSS paths
        content = re.sub(r'href=["\']css/', r'href="../../../css/', content)
        content = re.sub(r'href=["\']css/', r"href='../../../css/", content)
        
        # Fix icon paths
        content = re.sub(r'href=["\']icons/', r'href="../../../icons/', content)
        content = re.sub(r'href=["\']icons/', r"href='../../../icons/", content)
        
        # Fix JS paths (if any)
        content = re.sub(r'src=["\']js/', r'src="../../../js/', content)
        content = re.sub(r'src=["\']js/', r"src='../../../js/", content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")
        return False

# Fix all belt stripe files
fixed_count = 0
for belt in ['white', 'blue', 'purple', 'brown', 'black']:
    for stripe in range(1, 5):
        stripe_file = f'src/pages/gym/{belt}-belt-stripe{stripe}-gamified.html'
        if os.path.exists(stripe_file):
            if fix_paths_in_file(stripe_file):
                fixed_count += 1
                print(f"✅ Fixed: {stripe_file}")

print(f"\n✅ Fixed {fixed_count} belt stripe files")

