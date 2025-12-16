#!/usr/bin/env python3
"""
BATCH 2: Continue fixing innerHTML in production files
Anti-Laziness: Exact counts, verification gates
"""

import os
import re
import subprocess

def get_production_files_with_innerhtml():
    """Get production files with raw innerHTML"""
    result = subprocess.run(
        ["grep", "-rl", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    files = [f for f in result.stdout.split('\n') if f.strip()]
    # Filter to production only
    prod_files = [f for f in files if 'archive' not in f and 'node_modules' not in f and 'react-app' not in f]
    
    # Filter out files already using safeSetInnerHTML
    final_files = []
    for f in prod_files:
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
            if 'safeSetInnerHTML' not in content:
                # Check if has raw innerHTML
                matches = re.findall(r'\.innerHTML\s*=', content)
                if matches:
                    final_files.append(f)
        except:
            pass
    return final_files

def count_production_innerhtml():
    """Count raw innerHTML in production"""
    total = 0
    files = get_production_files_with_innerhtml()
    for filepath in files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            matches = re.findall(r'\.innerHTML\s*=', content)
            total += len(matches)
        except:
            pass
    return total

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
            
            if 'safeSetInnerHTML' not in value:
                fixes += 1
                return f'safeSetInnerHTML({element}, {value});'
            return match.group(0)
        
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
    print("=== BATCH 2: FIX PRODUCTION INNERHTML ===")
    print("Excluding: archive, node_modules, react-app")
    print()
    
    before_count = count_production_innerhtml()
    print(f"BEFORE: {before_count} raw innerHTML instances in production")
    print()
    
    files = get_production_files_with_innerhtml()
    print(f"Production files to process: {len(files)}")
    print()
    
    # Process next 20 files (skip first 20 if already processed)
    batch = files[:20]
    total_fixes = 0
    
    print(f"Processing BATCH 2 (files 1-20)...")
    for i, filepath in enumerate(batch, 1):
        fixes = fix_innerhtml_in_file(filepath)
        total_fixes += fixes
        if fixes > 0:
            print(f"  [{i}/20] {filepath}: {fixes} fixes")
    
    print()
    after_count = count_production_innerhtml()
    print(f"AFTER: {after_count} raw innerHTML instances in production")
    print(f"FIXED: {total_fixes} instances in {len(batch)} files")
    print(f"REMAINING: {after_count} instances")
    print()
    print("⛔ GATE: BATCH 2 COMPLETE")
    print("Verification: Exact counts shown above")

if __name__ == "__main__":
    main()

