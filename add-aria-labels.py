#!/usr/bin/env python3
"""
Task 6: Add ARIA Labels to Remaining Buttons
CRITICAL: DO NOT remove or modify <button tags. ONLY add aria-label attribute.
"""

import os
import re

def add_aria_label_to_button(match):
    """Add aria-label to a button tag if missing"""
    button_tag = match.group(0)
    
    # Skip if already has aria-label
    if 'aria-label' in button_tag:
        return button_tag
    
    # Extract button text from the full button element
    # We need to look ahead to find the button content
    return button_tag  # Will be handled differently

def process_button_tags(content):
    """Process all button tags in content"""
    modified = False
    original = content
    
    # Pattern to match <button...> tags
    # We need to match the opening tag and potentially extract text
    pattern = r'<button([^>]*)>'
    
    def replace_button(match):
        attrs = match.group(1)
        
        # Skip if already has aria-label
        if 'aria-label' in attrs:
            return match.group(0)
        
        # Try to find button text by looking for the next > and content
        # This is a simplified approach - we'll add a generic aria-label
        # Find the button text by looking ahead
        start_pos = match.end()
        # Find closing tag
        end_tag_pos = content.find('</button>', start_pos)
        if end_tag_pos == -1:
            return match.group(0)
        
        button_content = content[start_pos:end_tag_pos]
        # Extract text (remove HTML tags)
        text_match = re.search(r'>([^<]+)<', button_content)
        if text_match:
            text = text_match.group(1).strip()
            # Clean text for aria-label
            clean_text = re.sub(r'[^\w\s]', '', text)[:50]
            if clean_text:
                # Add aria-label before closing >
                new_attrs = f'{attrs} aria-label="{clean_text}"'
                return f'<button{new_attrs}>'
        
        # If no text found, add generic label
        new_attrs = f'{attrs} aria-label="Button"'
        return f'<button{new_attrs}>'
    
    new_content = re.sub(pattern, replace_button, content)
    
    if new_content != original:
        modified = True
    
    return new_content, modified

def process_file(filepath):
    """Process a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Process button tags
        content, modified = process_button_tags(content)
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    print("=== TASK 6: ADD ARIA LABELS TO BUTTONS ===")
    print("⚠️  CRITICAL: Only adding aria-label, NOT modifying button tags")
    print()
    
    files_updated = 0
    
    # Process all HTML files
    for root, dirs, files in os.walk('.'):
        if any(skip in root for skip in ['.git', 'archive', 'backup', 'node_modules']):
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    files_updated += 1
                    if files_updated % 50 == 0:
                        print(f"⏳ Updated {files_updated} files...")
    
    print()
    print(f"✅ Task 6 Complete: Updated {files_updated} files")
    print()
    print("Verification: Check buttons without aria-label...")
    print("CRITICAL: Verify all <button tags still exist!")

if __name__ == "__main__":
    main()

