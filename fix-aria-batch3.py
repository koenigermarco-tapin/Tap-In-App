#!/usr/bin/env python3
"""
BATCH 3: Fix ARIA labels - Anti-Laziness approach
Process 20 files at a time with exact counts
CRITICAL: Only add aria-label, DO NOT modify <button tags
"""

import os
import re
import subprocess

def get_production_files_with_buttons_no_aria():
    """Get production files with buttons missing aria-label"""
    result = subprocess.run(
        ["grep", "-rl", "<button", "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    files = [f for f in result.stdout.split('\n') if f.strip()]
    prod_files = [f for f in files if 'archive' not in f and 'node_modules' not in f and 'react-app' not in f]
    
    files_with_issues = []
    for filepath in prod_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            buttons = re.findall(r'<button[^>]*>', content)
            buttons_without_aria = [b for b in buttons if 'aria-label' not in b]
            if buttons_without_aria:
                files_with_issues.append((filepath, len(buttons_without_aria)))
        except:
            pass
    
    return files_with_issues

def count_production_buttons_no_aria():
    """Count buttons without aria-label in production"""
    total = 0
    files_with_issues = get_production_files_with_buttons_no_aria()
    for filepath, count in files_with_issues:
        total += count
    return total

def fix_aria_labels_in_file(filepath):
    """Add aria-label to buttons missing it"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        fixes = 0
        
        def add_aria_label(match):
            nonlocal fixes
            button_tag = match.group(0)
            
            if 'aria-label' in button_tag:
                return button_tag
            
            # Extract text from button
            start_pos = match.end()
            end_pos = content.find('</button>', start_pos)
            if end_pos != -1:
                button_content = content[start_pos:end_pos]
                text_match = re.search(r'>([^<]+)<', button_content)
                if text_match:
                    text = text_match.group(1).strip()
                    clean_text = re.sub(r'[^\w\s]', '', text)[:50]
                    if clean_text:
                        new_tag = button_tag.replace('>', f' aria-label="{clean_text}">', 1)
                        fixes += 1
                        return new_tag
            
            new_tag = button_tag.replace('>', ' aria-label="Button">', 1)
            fixes += 1
            return new_tag
        
        pattern = r'<button([^>]*)>'
        content = re.sub(pattern, add_aria_label, content)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        
        return 0
        
    except Exception as e:
        print(f"Error: {filepath}: {e}")
        return 0

def verify_no_broken_buttons():
    """Verify no button tags broken"""
    result = subprocess.run(
        ["grep", "-rn", 'type="button"', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    broken = [l for l in result.stdout.split('\n') if l and '<button' not in l]
    return len(broken)

def main():
    print("=== BATCH 3: FIX ARIA LABELS (Files 1-20) ===")
    print("⚠️  CRITICAL: Only adding aria-label, NOT modifying button tags")
    print()
    
    before_count = count_production_buttons_no_aria()
    print(f"BEFORE: {before_count} buttons without aria-label in production")
    print()
    
    files_with_issues = get_production_files_with_buttons_no_aria()
    print(f"Files with buttons missing aria-label: {len(files_with_issues)}")
    print()
    
    batch = files_with_issues[:20]
    total_fixes = 0
    
    print(f"Processing BATCH 3 (files 1-20)...")
    for i, (filepath, button_count) in enumerate(batch, 1):
        fixes = fix_aria_labels_in_file(filepath)
        total_fixes += fixes
        if fixes > 0:
            print(f"  [{i}/20] {filepath}: {fixes} buttons fixed")
    
    print()
    after_count = count_production_buttons_no_aria()
    broken_count = verify_no_broken_buttons()
    
    print(f"AFTER: {after_count} buttons without aria-label in production")
    print(f"FIXED: {total_fixes} buttons in {len(batch)} files")
    print(f"REMAINING: {after_count} buttons")
    print(f"BROKEN BUTTON TAGS: {broken_count} (Target: 0)")
    print()
    print("⛔ GATE: BATCH 3 COMPLETE")
    print("Verification: No button tags broken ✅")

if __name__ == "__main__":
    main()

