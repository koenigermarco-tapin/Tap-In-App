#!/usr/bin/env python3
"""
BATCH 3: Fix Meta Tags - Anti-Laziness approach
Process 20 files at a time with exact counts
"""

import os
import re
import subprocess

def get_production_files_without_viewport():
    """Get production files missing viewport"""
    result = subprocess.run(
        ["find", ".", "-name", "*.html", "!", "-path", "*/archive/*", "!", "-path", "*/.git/*", "!", "-path", "*/react-app/*", "!", "-path", "*/node_modules/*", "!", "-path", "*/components/*", "-exec", "grep", "-L", "viewport", "{}", ";"],
        capture_output=True,
        text=True,
        cwd="."
    )
    return [f for f in result.stdout.split('\n') if f.strip()]

def get_production_files_without_description():
    """Get production files missing description"""
    result = subprocess.run(
        ["find", ".", "-name", "*.html", "!", "-path", "*/archive/*", "!", "-path", "*/.git/*", "!", "-path", "*/react-app/*", "!", "-path", "*/node_modules/*", "!", "-path", "*/components/*", "-exec", "grep", "-L", 'meta name="description"', "{}", ";"],
        capture_output=True,
        text=True,
        cwd="."
    )
    return [f for f in result.stdout.split('\n') if f.strip()]

def fix_meta_tags(filepath):
    """Add missing meta tags"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if len(content) < 50 or '<head>' not in content:
            return 0
        
        original = content
        fixes = 0
        
        # Add viewport if missing
        if 'viewport' not in content and '<head>' in content:
            viewport_tag = '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
            content = content.replace('<head>', f'<head>\n{viewport_tag}', 1)
            fixes += 1
        
        # Add description if missing
        if 'meta name="description"' not in content and '</head>' in content:
            title_match = re.search(r'<title>([^<]+)</title>', content)
            if title_match:
                title = title_match.group(1).strip()
                title = re.sub(r'\s+', ' ', title)
                description = f"{title} - TAP-IN Leadership Academy"
            else:
                filename = os.path.basename(filepath).replace('.html', '').replace('-', ' ').title()
                description = f"{filename} - TAP-IN Leadership Academy"
            
            description_tag = f'    <meta name="description" content="{description}">\n'
            content = content.replace('</head>', f'{description_tag}</head>', 1)
            fixes += 1
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        
        return 0
        
    except Exception as e:
        return 0

def main():
    print("=== BATCH 3: FIX META TAGS (Files 1-20) ===")
    print()
    
    files_no_viewport = get_production_files_without_viewport()
    files_no_desc = get_production_files_without_description()
    
    print(f"BEFORE:")
    print(f"  Pages without viewport: {len(files_no_viewport)}")
    print(f"  Pages without description: {len(files_no_desc)}")
    print()
    
    all_files = list(set(files_no_viewport + files_no_desc))
    batch = all_files[:20]
    
    print(f"Processing BATCH 3 (files 1-20)...")
    total_fixes = 0
    
    for i, filepath in enumerate(batch, 1):
        fixes = fix_meta_tags(filepath)
        total_fixes += fixes
        if fixes > 0:
            print(f"  [{i}/20] {filepath}: {fixes} meta tags added")
    
    print()
    after_viewport = len(get_production_files_without_viewport())
    after_desc = len(get_production_files_without_description())
    
    print(f"AFTER:")
    print(f"  Pages without viewport: {after_viewport}")
    print(f"  Pages without description: {after_desc}")
    print(f"FIXED: {total_fixes} meta tags in {len(batch)} files")
    print()
    print("⛔ GATE: BATCH 3 COMPLETE")
    print("Verification: Exact counts shown above")

if __name__ == "__main__":
    main()

