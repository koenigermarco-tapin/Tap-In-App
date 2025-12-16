#!/usr/bin/env python3
"""
Task 5: Fix Remaining innerHTML - Replace with safeSetInnerHTML
"""

import os
import re

def fix_innerhtml(content):
    """Replace raw innerHTML assignments with safeSetInnerHTML"""
    modified = False
    original = content
    
    # Pattern: element.innerHTML = something;
    # Replace with: safeSetInnerHTML(element, something);
    pattern = r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*([^;]+);'
    
    def replace_innerHTML(match):
        element = match.group(1)
        value = match.group(2).strip()
        
        # Skip if already using safeSetInnerHTML
        if 'safeSetInnerHTML' in value:
            return match.group(0)
        
        # Skip if it's a comment or in a string
        line_start = content.rfind('\n', 0, match.start())
        line = content[line_start:match.end()]
        if '//' in line or '/*' in line:
            return match.group(0)
        
        return f'safeSetInnerHTML({element}, {value});'
    
    new_content = re.sub(pattern, replace_innerHTML, content)
    
    if new_content != original:
        modified = True
    
    return new_content, modified

def ensure_safesetinnerhtml_available(content):
    """Ensure safeSetInnerHTML is available (add script if needed)"""
    if 'safeSetInnerHTML' in content or '/js/core/dom.js' in content:
        return content, False
    
    # Add dom.js script if not present
    if '</head>' in content:
        script_tag = '    <script src="/js/core/dom.js" type="module"></script>\n'
        content = content.replace('</head>', f'{script_tag}</head>')
        return content, True
    
    return content, False

def process_file(filepath):
    """Process a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Ensure safeSetInnerHTML is available
        content, added_script = ensure_safesetinnerhtml_available(content)
        
        # Fix innerHTML
        content, fixed = fix_innerhtml(content)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    print("=== TASK 5: FIX REMAINING INNERHTML ===")
    print()
    
    files_updated = 0
    
    # Process all HTML files
    for root, dirs, files in os.walk('.'):
        if any(skip in root for skip in ['.git', 'archive', 'backup', 'node_modules', 'js']):
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    files_updated += 1
                    if files_updated % 50 == 0:
                        print(f"⏳ Updated {files_updated} files...")
    
    print()
    print(f"✅ Task 5 Complete: Updated {files_updated} files")
    print()
    print("Verification: Check remaining raw innerHTML...")

if __name__ == "__main__":
    main()

