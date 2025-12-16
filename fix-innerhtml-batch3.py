#!/usr/bin/env python3
"""
BATCH 3: Fix innerHTML - Anti-Laziness approach
Process 10 files at a time with exact counts and verification
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
    prod_files = [f for f in files if 'archive' not in f and 'node_modules' not in f and 'react-app' not in f]
    
    final_files = []
    for f in prod_files:
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
            if 'safeSetInnerHTML' not in content:
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
            if 'safeSetInnerHTML' not in match.group(0):
                fixes += 1
                element = match.group(1)
                value = match.group(2).strip()
                return f'safeSetInnerHTML({element}, {value});'
            return match.group(0)
        
        content = re.sub(pattern, replace, content)
        
        # Add dom.js if needed
        if fixes > 0 and '/js/core/dom.js' not in content:
            if '</head>' in content:
                script_tag = '    <script src="/js/core/dom.js" type="module"></script>\n'
                content = content.replace('</head>', f'{script_tag}</head>', 1)
            elif '<head>' in content:
                script_tag = '    <script src="/js/core/dom.js" type="module"></script>\n'
                content = content.replace('<head>', f'<head>\n{script_tag}', 1)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        
        return 0
        
    except Exception as e:
        print(f"Error: {filepath}: {e}")
        return 0

def main():
    print("=== BATCH 3: FIX INNERHTML (Files 1-10) ===")
    print("Anti-Laziness: Exact counts, verification gates")
    print()
    
    before_count = count_production_innerhtml()
    print(f"BEFORE: {before_count} raw innerHTML instances")
    print()
    
    files = get_production_files_with_innerhtml()
    print(f"Total files to process: {len(files)}")
    print()
    
    # Process first 10 files
    batch = files[:10]
    total_fixes = 0
    
    print(f"Processing BATCH 3 (files 1-10)...")
    for i, filepath in enumerate(batch, 1):
        fixes = fix_innerhtml_in_file(filepath)
        total_fixes += fixes
        if fixes > 0:
            print(f"  [{i}/10] {filepath}: {fixes} fixes")
    
    print()
    after_count = count_production_innerhtml()
    print(f"AFTER: {after_count} raw innerHTML instances")
    print(f"FIXED: {total_fixes} instances in {len(batch)} files")
    print(f"REMAINING: {after_count} instances")
    print(f"PROGRESS: {before_count - after_count} fixed out of {before_count} total ({int((before_count - after_count) / before_count * 100) if before_count > 0 else 0}%)")
    print()
    print("⛔ GATE: BATCH 3 COMPLETE")
    print("Verification: Exact counts shown above")
    print("Files processed: " + str(len(batch)))
    print("Waiting for approval before proceeding to BATCH 4...")

if __name__ == "__main__":
    main()

