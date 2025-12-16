#!/usr/bin/env python3
"""
BATCH 1: Fix innerHTML in PRODUCTION files only
Excluding: archive, node_modules, react-app
Following Anti-Laziness: Exact counts, verification gates
"""

import os
import re
import subprocess

def get_production_files_with_innerhtml():
    """Get production files only"""
    result = subprocess.run(
        ["grep", "-rl", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    files = [f for f in result.stdout.split('\n') if f.strip()]
    # Filter out archives, node_modules, react-app
    prod_files = [f for f in files if 'archive' not in f and 'node_modules' not in f and 'react-app' not in f]
    # Filter out files already using safeSetInnerHTML
    final_files = []
    for f in prod_files:
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
            if 'safeSetInnerHTML' not in content and r'.innerHTML\s*=' in content:
                final_files.append(f)
        except:
            pass
    return final_files

def count_production_innerhtml():
    """Count raw innerHTML in production files"""
    result = subprocess.run(
        ["grep", "-roh", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    lines = [l for l in result.stdout.split('\n') if l and 'safeSetInnerHTML' not in l]
    # Filter by file location
    files_result = subprocess.run(
        ["grep", "-rl", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    prod_files = set([f for f in files_result.stdout.split('\n') if f and 'archive' not in f and 'node_modules' not in f and 'react-app' not in f])
    
    # Count instances in production files
    count = 0
    for line in lines:
        # This is approximate - we'll verify after
        count += 1
    
    # Better: count in actual files
    total = 0
    for filepath in prod_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            matches = re.findall(r'\.innerHTML\s*=', content)
            matches = [m for m in matches if 'safeSetInnerHTML' not in content[max(0, content.find(m)-50):content.find(m)+50]]
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
    print("=== BATCH 1: FIX PRODUCTION INNERHTML ===")
    print("Excluding: archive, node_modules, react-app")
    print()
    
    before_count = count_production_innerhtml()
    print(f"BEFORE: {before_count} raw innerHTML instances in production files")
    print()
    
    files = get_production_files_with_innerhtml()
    print(f"Production files to process: {len(files)}")
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
    after_count = count_production_innerhtml()
    print(f"AFTER: {after_count} raw innerHTML instances in production files")
    print(f"FIXED: {total_fixes} instances in {len(batch)} files")
    print(f"REMAINING: {after_count} instances")
    print()
    print("⛔ GATE: BATCH 1 COMPLETE")
    print("Verification: Exact counts shown above")
    print("Files processed: " + str(len(batch)))
    print("Waiting for approval before proceeding...")

if __name__ == "__main__":
    main()

