#!/usr/bin/env python3
"""
BATCH 1: Fix Remaining innerHTML (225 instances)
Following Anti-Laziness Principles:
- Process files in batches of 20
- Show exact counts before/after
- Verify each batch
"""

import os
import re
import subprocess

def count_raw_innerhtml():
    """Get exact count of raw innerHTML"""
    result = subprocess.run(
        ["grep", "-roh", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    lines = [l for l in result.stdout.split('\n') if l and 'safeSetInnerHTML' not in l]
    return len(lines)

def get_files_with_innerhtml():
    """Get list of files with raw innerHTML"""
    result = subprocess.run(
        ["grep", "-rl", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    files = [f for f in result.stdout.split('\n') if f and 'safeSetInnerHTML' not in f]
    return files

def fix_innerhtml_in_file(filepath):
    """Fix innerHTML in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        fixes = 0
        
        # Pattern: element.innerHTML = value;
        pattern = r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*([^;]+);'
        
        def replace(match):
            nonlocal fixes
            element = match.group(1)
            value = match.group(2).strip()
            
            # Skip if already safeSetInnerHTML
            if 'safeSetInnerHTML' in value:
                return match.group(0)
            
            fixes += 1
            return f'safeSetInnerHTML({element}, {value});'
        
        content = re.sub(pattern, replace, content)
        
        # Ensure dom.js is imported
        if fixes > 0 and '/js/core/dom.js' not in content:
            if '</head>' in content:
                script_tag = '    <script src="/js/core/dom.js" type="module"></script>\n'
                content = content.replace('</head>', f'{script_tag}</head>', 1)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        
        return 0
        
    except Exception as e:
        print(f"Error: {filepath}: {e}")
        return 0

def main():
    print("=== BATCH 1: FIX REMAINING INNERHTML ===")
    print()
    
    before_count = count_raw_innerhtml()
    print(f"BEFORE: {before_count} raw innerHTML instances")
    print()
    
    files = get_files_with_innerhtml()
    print(f"Files to process: {len(files)}")
    print()
    
    # Process first 20 files
    batch = files[:20]
    total_fixes = 0
    
    print(f"Processing BATCH 1 (files 1-20)...")
    for i, filepath in enumerate(batch, 1):
        fixes = fix_innerhtml_in_file(filepath)
        total_fixes += fixes
        if fixes > 0:
            print(f"  [{i}/20] {filepath}: {fixes} fixes")
    
    print()
    after_count = count_raw_innerhtml()
    print(f"AFTER: {after_count} raw innerHTML instances")
    print(f"FIXED: {total_fixes} instances in {len(batch)} files")
    print(f"REMAINING: {after_count} instances")
    print()
    print("⛔ GATE: BATCH 1 COMPLETE")
    print("Verification output shown above.")
    print("Waiting for approval before proceeding to BATCH 2...")

if __name__ == "__main__":
    main()

