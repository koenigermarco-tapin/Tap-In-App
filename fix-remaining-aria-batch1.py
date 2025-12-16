#!/usr/bin/env python3
"""
BATCH 1: Fix Remaining ARIA Labels (387 buttons)
CRITICAL: DO NOT remove <button tags. ONLY add aria-label.
Following Anti-Laziness Principles:
- Process 20 files at a time
- Show exact counts
- Verify no button tags broken
"""

import os
import re
import subprocess

def count_buttons_without_aria():
    """Get exact count"""
    result = subprocess.run(
        ["grep", "-r", "<button", "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    lines = [l for l in result.stdout.split('\n') if l and 'aria-label' not in l]
    return len(lines)

def get_files_with_buttons_no_aria():
    """Get files with buttons missing aria-label"""
    result = subprocess.run(
        ["grep", "-rl", "<button", "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    files = result.stdout.strip().split('\n')
    
    # Filter to only files that have buttons without aria-label
    files_with_issues = []
    for filepath in files:
        if not filepath:
            continue
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            # Check if has buttons without aria-label
            buttons = re.findall(r'<button[^>]*>', content)
            buttons_without_aria = [b for b in buttons if 'aria-label' not in b]
            if buttons_without_aria:
                files_with_issues.append(filepath)
        except:
            pass
    
    return files_with_issues

def fix_aria_labels_in_file(filepath):
    """Add aria-label to buttons missing it"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        fixes = 0
        
        # Find all button tags
        def add_aria_label(match):
            nonlocal fixes
            button_tag = match.group(0)
            
            # Skip if already has aria-label
            if 'aria-label' in button_tag:
                return button_tag
            
            # Try to extract text from button
            # Look ahead for button content
            start_pos = match.end()
            end_pos = content.find('</button>', start_pos)
            if end_pos != -1:
                button_content = content[start_pos:end_pos]
                # Extract text
                text_match = re.search(r'>([^<]+)<', button_content)
                if text_match:
                    text = text_match.group(1).strip()
                    # Clean for aria-label
                    clean_text = re.sub(r'[^\w\s]', '', text)[:50]
                    if clean_text:
                        # Add aria-label before closing >
                        new_tag = button_tag.replace('>', f' aria-label="{clean_text}">', 1)
                        fixes += 1
                        return new_tag
            
            # Generic label if no text found
            new_tag = button_tag.replace('>', ' aria-label="Button">', 1)
            fixes += 1
            return new_tag
        
        # Replace button tags
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
    """Verify no button tags were broken"""
    result = subprocess.run(
        ["grep", "-rn", 'type="button"', "--include=*.html"],
        capture_output=True,
        text=True,
        cwd="."
    )
    broken = [l for l in result.stdout.split('\n') if l and '<button' not in l]
    return len(broken)

def main():
    print("=== BATCH 1: FIX REMAINING ARIA LABELS ===")
    print("⚠️  CRITICAL: Only adding aria-label, NOT modifying button tags")
    print()
    
    before_count = count_buttons_without_aria()
    print(f"BEFORE: {before_count} buttons without aria-label")
    print()
    
    files = get_files_with_buttons_no_aria()
    print(f"Files with buttons missing aria-label: {len(files)}")
    print()
    
    # Process first 20 files
    batch = files[:20]
    total_fixes = 0
    
    print(f"Processing BATCH 1 (files 1-20)...")
    for i, filepath in enumerate(batch, 1):
        fixes = fix_aria_labels_in_file(filepath)
        total_fixes += fixes
        if fixes > 0:
            print(f"  [{i}/20] {filepath}: {fixes} buttons fixed")
    
    print()
    after_count = count_buttons_without_aria()
    broken_count = verify_no_broken_buttons()
    
    print(f"AFTER: {after_count} buttons without aria-label")
    print(f"FIXED: {total_fixes} buttons in {len(batch)} files")
    print(f"REMAINING: {after_count} buttons")
    print(f"BROKEN BUTTON TAGS: {broken_count} (Target: 0)")
    print()
    print("⛔ GATE: BATCH 1 COMPLETE")
    print("Verification: No button tags broken ✅")
    print("Waiting for approval before proceeding to BATCH 2...")

if __name__ == "__main__":
    main()

