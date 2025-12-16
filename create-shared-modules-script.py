#!/usr/bin/env python3
"""
Task 3: Add shared module scripts to HTML files and remove duplicate definitions
"""

import os
import re

# Core modules to add
CORE_MODULES = [
    '/js/core/dom.js',
    '/js/core/progress.js',
    '/js/core/results.js',
    '/js/core/quiz.js',
    '/js/core/lessons.js'
]

# Functions to remove from inline scripts
FUNCTIONS_TO_REMOVE = [
    r'function\s+safeSetInnerHTML\s*\([^)]*\)\s*\{[^}]*\}',
    r'function\s+updateProgress\s*\([^)]*\)\s*\{[^}]*\}',
    r'function\s+showResults\s*\([^)]*\)\s*\{[^}]*\}',
    r'function\s+selectOption\s*\([^)]*\)\s*\{[^}]*\}',
    r'function\s+renderQuestion\s*\([^)]*\)\s*\{[^}]*\}',
    r'function\s+completeLesson\s*\([^)]*\)\s*\{[^}]*\}',
]

def add_core_modules(content):
    """Add core module script tags to head"""
    # Check if already added
    if '/js/core/dom.js' in content:
        return content, False
    
    # Find </head> tag
    if '</head>' in content:
        modules_html = '\n'.join([f'    <script src="{module}" type="module"></script>' for module in CORE_MODULES])
        content = content.replace('</head>', f'{modules_html}\n</head>')
        return content, True
    
    return content, False

def remove_duplicate_functions(content):
    """Remove duplicate function definitions"""
    modified = False
    for pattern in FUNCTIONS_TO_REMOVE:
        # Match multiline function definitions
        matches = re.findall(pattern, content, re.DOTALL | re.MULTILINE)
        if matches:
            # Remove first occurrence (keep the one in shared module)
            content = re.sub(pattern, '', content, count=1, flags=re.DOTALL | re.MULTILINE)
            modified = True
    
    return content, modified

def process_file(filepath):
    """Process a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Add core modules
        content, added_modules = add_core_modules(content)
        
        # Remove duplicate functions
        content, removed_functions = remove_duplicate_functions(content)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    print("=== TASK 3: CREATE SHARED JS MODULES ===")
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
    print(f"✅ Task 3 Complete: Updated {files_updated} files")
    print()
    print("Verification: Check for remaining duplicates...")

if __name__ == "__main__":
    main()

