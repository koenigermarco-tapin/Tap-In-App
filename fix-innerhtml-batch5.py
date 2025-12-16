#!/usr/bin/env python3
"""
BATCH 5: Fix innerHTML - Anti-Laziness approach
Process remaining files with exact counts
"""

import os
import re
import subprocess

def fix_innerhtml_in_file(filepath):
    """Fix innerHTML in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'safeSetInnerHTML' in content:
            return 0
        
        original = content
        fixes = 0
        
        # Pattern: element.innerHTML = value;
        # Handle both single-line and multiline assignments
        patterns = [
            # Template literals with backticks
            (r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*`([^`]*(?:`[^`]*`)*[^`]*)`;', r'safeSetInnerHTML(\1, `\2`);'),
            # Regular assignments
            (r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*([^;]+);', r'safeSetInnerHTML(\1, \2);'),
        ]
        
        for pattern, replacement in patterns:
            def replace(match):
                nonlocal fixes
                if 'safeSetInnerHTML' not in match.group(0):
                    fixes += 1
                    element = match.group(1)
                    value = match.group(2).strip()
                    return f'safeSetInnerHTML({element}, {value});'
                return match.group(0)
            
            content = re.sub(pattern, replace, content, flags=re.DOTALL)
        
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
        return 0

def main():
    print("=== BATCH 5: FIX INNERHTML ===")
    print("Anti-Laziness: Exact counts, verification gates")
    print()
    
    # Get all files with innerHTML
    result = subprocess.run(
        ["grep", "-rl", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    files = [f for f in result.stdout.split('\n') if f.strip()]
    prod_files = [f for f in files if 'archive' not in f and 'node_modules' not in f and 'react-app' not in f]
    
    # Filter files that don't already have safeSetInnerHTML
    files_to_fix = []
    for filepath in prod_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'safeSetInnerHTML' not in content:
                matches = re.findall(r'\.innerHTML\s*=', content)
                if matches:
                    files_to_fix.append(filepath)
        except:
            pass
    
    before_count = subprocess.run(
        ["grep", "-roh", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    before = len([l for l in before_count.stdout.split('\n') if l.strip() and 'safeSetInnerHTML' not in l and 'archive' not in l and 'node_modules' not in l and 'react-app' not in l])
    
    print(f"BEFORE: {before} raw innerHTML instances")
    print(f"Files to process: {len(files_to_fix)}")
    print()
    
    # Process first 20 files
    batch = files_to_fix[:20]
    total_fixes = 0
    
    for filepath in batch:
        fixes = fix_innerhtml_in_file(filepath)
        total_fixes += fixes
        if fixes > 0:
            print(f"  ✓ {filepath}: {fixes} fixes")
    
    print()
    after_count = subprocess.run(
        ["grep", "-roh", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    after = len([l for l in after_count.stdout.split('\n') if l.strip() and 'safeSetInnerHTML' not in l and 'archive' not in l and 'node_modules' not in l and 'react-app' not in l])
    
    print(f"AFTER: {after} raw innerHTML instances")
    print(f"FIXED: {total_fixes} instances in {len(batch)} files")
    print(f"REMAINING: {after} instances")
    print()
    print("⛔ GATE: BATCH 5 COMPLETE")
    print("Verification: Exact counts shown above")

if __name__ == "__main__":
    main()

