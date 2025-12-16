#!/usr/bin/env python3
"""
Task 8: Remove console.log Statements
"""

import os
import re

def remove_console_logs(content):
    """Remove console.log statements"""
    modified = False
    original = content
    
    # Pattern: console.log(...); or console.log(...)
    # Remove entire line if it's just console.log
    patterns = [
        # Standalone console.log lines
        (r'^\s*console\.(log|error|warn|debug|info)\([^)]*\);?\s*$', ''),
        # console.log in middle of line (more careful)
        (r'\s*console\.(log|error|warn|debug|info)\([^)]*\);?\s*', ' '),
    ]
    
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        original_line = line
        
        # Skip if it's a comment
        if line.strip().startswith('//') or '/*' in line:
            new_lines.append(line)
            continue
        
        # Remove console.log statements
        for pattern, replacement in patterns:
            line = re.sub(pattern, replacement, line)
        
        # Clean up extra spaces
        line = re.sub(r'\s+', ' ', line).strip()
        if line and line != original_line.strip():
            modified = True
        
        if line:  # Keep non-empty lines
            new_lines.append(line)
        elif original_line.strip():  # Keep original if it had content
            new_lines.append(original_line)
    
    new_content = '\n'.join(new_lines)
    
    if new_content != original:
        modified = True
    
    return new_content, modified

def process_file(filepath):
    """Process a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Remove console.logs
        content, modified = remove_console_logs(content)
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    print("=== TASK 8: REMOVE CONSOLE.LOG STATEMENTS ===")
    print()
    
    files_updated = 0
    
    # Process all HTML and JS files
    for root, dirs, files in os.walk('.'):
        if any(skip in root for skip in ['.git', 'archive', 'backup', 'node_modules']):
            continue
        
        for file in files:
            if file.endswith(('.html', '.js')):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    files_updated += 1
                    if files_updated % 50 == 0:
                        print(f"⏳ Updated {files_updated} files...")
    
    print()
    print(f"✅ Task 8 Complete: Updated {files_updated} files")
    print()
    print("Verification: Check remaining console.log...")

if __name__ == "__main__":
    main()

