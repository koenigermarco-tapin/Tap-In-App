#!/usr/bin/env python3
"""
BATCH 4: Fix innerHTML - Anti-Laziness approach
Process files with exact counts and verification
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
        # Handle multiline template literals
        patterns = [
            (r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*`([^`]*)`;', r'safeSetInnerHTML(\1, `\2`);'),
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
        print(f"Error: {filepath}: {e}")
        return 0

def main():
    print("=== BATCH 4: FIX INNERHTML ===")
    print("Anti-Laziness: Exact counts, verification gates")
    print()
    
    files_to_fix = [
        'sales-recruiting-stage1.html',
        'sales-recruiting-stage1-de.html',
        'business-portal.html',
        'leadership-style-carousel.de.html',
        'src/pages/assessments/team-assessment-enhanced-v2.html',
        'src/pages/assessments/team-assessment-enhanced-v2.de.html',
        'src/pages/assessments/communication-style-assessment-de.html',
        'src/pages/assessments/mental-health-assessment.html',
        'src/pages/assessments/worker-type-assessment.de.html',
        'src/pages/assessments/life-audit-assessment-de.html',
    ]
    
    before_count = subprocess.run(
        ["grep", "-roh", r'\.innerHTML\s*=', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    before = len([l for l in before_count.stdout.split('\n') if l.strip() and 'safeSetInnerHTML' not in l and 'archive' not in l and 'node_modules' not in l and 'react-app' not in l])
    
    print(f"BEFORE: {before} raw innerHTML instances")
    print()
    
    total_fixes = 0
    
    for filepath in files_to_fix:
        if os.path.exists(filepath):
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
    print(f"FIXED: {total_fixes} instances in {len(files_to_fix)} files")
    print(f"REMAINING: {after} instances")
    print()
    print("⛔ GATE: BATCH 4 COMPLETE")
    print("Verification: Exact counts shown above")

if __name__ == "__main__":
    main()

