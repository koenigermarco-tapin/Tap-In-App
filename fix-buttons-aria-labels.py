#!/usr/bin/env python3
"""
Fix buttons without aria-label attributes
Adds descriptive aria-label based on button content, onclick, id, or class
"""
import re
import os
from pathlib import Path

def extract_button_text(button_tag, full_content, button_index):
    """Extract text content that might follow the button tag"""
    # Look for text after the button tag (up to 50 chars)
    start_pos = full_content.find(button_tag)
    if start_pos != -1:
        after_tag = full_content[start_pos + len(button_tag):start_pos + len(button_tag) + 50]
        # Extract text until next tag
        text_match = re.search(r'^([^<]+)', after_tag)
        if text_match:
            text = text_match.group(1).strip()
            if text and len(text) < 50:
                return text
    return None

def generate_aria_label(button_tag, full_content, button_index):
    """Generate an appropriate aria-label for a button"""
    # Check for onclick
    onclick_match = re.search(r"onclick=['\"]([^'\"]+)['\"]", button_tag)
    if onclick_match:
        onclick_val = onclick_match.group(1)
        onclick_lower = onclick_val.lower()
        
        if 'retry' in onclick_lower or 'retryquiz' in onclick_lower:
            return 'Retry quiz'
        elif 'continue' in onclick_lower or 'resume' in onclick_lower:
            return 'Continue'
        elif 'submit' in onclick_lower:
            return 'Submit'
        elif 'close' in onclick_lower or 'remove' in onclick_lower:
            return 'Close'
        elif 'next' in onclick_lower or 'nextquestion' in onclick_lower:
            return 'Next'
        elif 'prev' in onclick_lower or 'previous' in onclick_lower or 'back' in onclick_lower:
            return 'Previous'
        elif 'complete' in onclick_lower or 'completequiz' in onclick_lower:
            return 'Complete'
        elif 'start' in onclick_lower:
            return 'Start'
        elif 'buy' in onclick_lower or 'purchase' in onclick_lower:
            return 'Purchase'
        elif 'vote' in onclick_lower:
            return 'Vote'
        elif 'location.href' in onclick_val or 'window.location' in onclick_val:
            return 'Navigate'
    
    # Check for id
    id_match = re.search(r"id=['\"]([^'\"]+)['\"]", button_tag)
    if id_match:
        id_val = id_match.group(1)
        id_lower = id_val.lower()
        
        if 'next' in id_lower:
            return 'Next'
        elif 'prev' in id_lower or 'back' in id_lower:
            return 'Previous'
        elif 'submit' in id_lower:
            return 'Submit'
        elif 'close' in id_lower:
            return 'Close'
        elif 'retry' in id_lower:
            return 'Retry'
        else:
            # Convert id to readable label
            label = id_val.replace('-', ' ').replace('_', ' ').title()
            return label
    
    # Check for class
    class_match = re.search(r"class=['\"]([^'\"]+)['\"]", button_tag)
    if class_match:
        class_val = class_match.group(1)
        class_lower = class_val.lower()
        
        if 'btn-primary' in class_lower or 'primary' in class_lower:
            return 'Primary action'
        elif 'btn-secondary' in class_lower or 'secondary' in class_lower:
            return 'Secondary action'
        elif 'close' in class_lower:
            return 'Close'
        elif 'submit' in class_lower:
            return 'Submit'
        elif 'buy' in class_lower or 'purchase' in class_lower:
            return 'Purchase'
        elif 'done' in class_lower:
            return 'Done'
        elif 'start' in class_lower:
            return 'Start'
    
    # Try to extract text content
    text = extract_button_text(button_tag, full_content, button_index)
    if text:
        return text.strip()
    
    # Default
    return 'Button'

def fix_buttons_in_file(filepath):
    """Fix all buttons without aria-label in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        fixes = 0
        
        # Handle multiline buttons and template literals
        # Process content to find buttons that span multiple lines
        lines = content.split('\n')
        new_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i]
            
            # Check if this line starts a button tag
            if '<button' in line and '>' not in line:
                # Multiline button - collect until we find >
                button_lines = [line]
                j = i + 1
                found_close = False
                
                # Look ahead up to 10 lines for the closing >
                while j < len(lines) and j < i + 10 and not found_close:
                    button_lines.append(lines[j])
                    if '>' in lines[j]:
                        found_close = True
                        break
                    j += 1
                
                if found_close:
                    # Combine button lines
                    button_text = '\n'.join(button_lines)
                    
                    # Check if button needs aria-label
                    if 'aria-label' not in button_text or 'aria-label="Button"' in button_text:
                        # Generate label
                        label = generate_aria_label(button_text, content, fixes)
                        
                        # Add or replace aria-label
                        if 'aria-label="Button"' in button_text:
                            # Replace placeholder - handle multiline
                            button_text = re.sub(r'aria-label="Button"', f'aria-label="{label}"', button_text)
                        else:
                            # Find the > and add aria-label before it
                            # Insert on the line with >
                            last_line_idx = len(button_lines) - 1
                            if '>' in button_lines[last_line_idx]:
                                # Add aria-label before the >
                                button_lines[last_line_idx] = button_lines[last_line_idx].replace('>', f' aria-label="{label}">', 1)
                                button_text = '\n'.join(button_lines)
                        
                        fixes += 1
                    
                    # Split back into lines
                    new_lines.extend(button_text.split('\n'))
                    i = j + 1
                else:
                    # Didn't find closing >, just add the line as-is
                    new_lines.append(line)
                    i += 1
            elif '<button' in line and '>' in line:
                # Single line button
                if 'aria-label' not in line or 'aria-label="Button"' in line:
                    label = generate_aria_label(line, content, fixes)
                    if 'aria-label="Button"' in line:
                        line = line.replace('aria-label="Button"', f'aria-label="{label}"')
                    else:
                        line = line.replace('>', f' aria-label="{label}">', 1)
                    fixes += 1
                new_lines.append(line)
                i += 1
            else:
                new_lines.append(line)
                i += 1
        
        content = '\n'.join(new_lines)
        
        if fixes > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        
        return 0
    
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return 0

# Main execution
if __name__ == '__main__':
    files_processed = 0
    total_fixes = 0
    files_to_process = []
    
    # Find HTML files with buttons missing aria-label
    for root, dirs, files in os.walk('.'):
        # Skip excluded directories
        if any(excluded in root for excluded in ['archive', 'node_modules', 'react-app', '.git', 'components', '__pycache__']):
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Check if file has buttons without aria-label OR with placeholder aria-label="Button"
                        buttons = re.findall(r'<button[^>]*>', content)
                        buttons_without_aria = [b for b in buttons if 'aria-label' not in b]
                        buttons_with_placeholder = [b for b in buttons if 'aria-label="Button"' in b]
                        if buttons_without_aria or buttons_with_placeholder:
                            files_to_process.append((filepath, len(buttons_without_aria) + len(buttons_with_placeholder)))
                except:
                    pass
    
    print(f"Found {len(files_to_process)} files with buttons missing aria-label")
    print(f"Processing files...\n")
    
    for filepath, count in files_to_process:
        fixes = fix_buttons_in_file(filepath)
        if fixes > 0:
            files_processed += 1
            total_fixes += fixes
            print(f"✅ Fixed {fixes} buttons in {filepath}")
    
    print(f"\n{'='*60}")
    print(f"Processed {files_processed} files")
    print(f"Total fixes: {total_fixes}")
    print(f"{'='*60}")

