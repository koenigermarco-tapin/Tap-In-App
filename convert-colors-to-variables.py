#!/usr/bin/env python3
"""
Task 4: Convert Hardcoded Colors to CSS Variables
"""

import os
import re

COLOR_MAP = {
    '#e2e8f0': 'var(--border-light)',
    '#4a7c9c': 'var(--tap-blue)',
    '#10b981': 'var(--tap-green)',
    '#1a365d': 'var(--bg-primary)',
    '#0f172a': 'var(--bg-primary)',
    '#1e293b': 'var(--bg-secondary)',
    '#334155': 'var(--bg-tertiary)',
    '#f8fafc': 'var(--text-primary)',
    '#94a3b8': 'var(--text-secondary)',
    '#64748b': 'var(--text-muted)',
    '#a93226': 'var(--tap-red)',
    '#3b82f6': 'var(--belt-blue)',
    '#8b5cf6': 'var(--belt-purple)',
    '#92400e': 'var(--belt-brown)',
    '#1f2937': 'var(--belt-black)',
    '#ef4444': 'var(--error)',
    '#f59e0b': 'var(--warning)',
    '#ffffff': 'var(--belt-white)',
    '#000000': 'var(--text-primary)',  # Usually text
}

def ensure_variables_css():
    """Ensure css/variables.css exists with all variables"""
    css_path = 'css/variables.css'
    css_dir = os.path.dirname(css_path)
    
    if not os.path.exists(css_dir):
        os.makedirs(css_dir)
    
    if not os.path.exists(css_path):
        variables_content = """:root {
    /* Brand */
    --tap-green: #10b981;
    --tap-blue: #4a7c9c;
    --tap-red: #a93226;
    
    /* Backgrounds */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    
    /* Text */
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    
    /* Borders */
    --border-default: #334155;
    --border-light: #475569;
    
    /* Status */
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    
    /* Belts */
    --belt-white: #ffffff;
    --belt-blue: #3b82f6;
    --belt-purple: #8b5cf6;
    --belt-brown: #92400e;
    --belt-black: #1f2937;
}
"""
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(variables_content)
        print(f"✅ Created {css_path}")

def add_variables_link(content):
    """Add variables.css link to head if not present"""
    if 'css/variables.css' in content or 'variables.css' in content:
        return content, False
    
    if '</head>' in content:
        link_tag = '    <link rel="stylesheet" href="/css/variables.css">\n'
        content = content.replace('</head>', f'{link_tag}</head>')
        return content, True
    
    return content, False

def replace_colors(content):
    """Replace hardcoded colors with CSS variables"""
    modified = False
    original = content
    
    for hex_color, css_var in COLOR_MAP.items():
        # Case-insensitive replacement
        pattern = re.escape(hex_color)
        matches = len(re.findall(pattern, content, re.IGNORECASE))
        if matches > 0:
            content = re.sub(pattern, css_var, content, flags=re.IGNORECASE)
            modified = True
    
    return content, modified

def process_file(filepath):
    """Process a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Add variables.css link for HTML files
        if filepath.endswith('.html'):
            content, added_link = add_variables_link(content)
        
        # Replace colors
        content, replaced_colors = replace_colors(content)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    print("=== TASK 4: CONVERT HARDCODED COLORS ===")
    print()
    
    # Ensure variables.css exists
    ensure_variables_css()
    
    files_updated = 0
    
    # Process all HTML and CSS files
    for root, dirs, files in os.walk('.'):
        if any(skip in root for skip in ['.git', 'archive', 'backup', 'node_modules']):
            continue
        
        for file in files:
            if file.endswith(('.html', '.css')):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    files_updated += 1
                    if files_updated % 50 == 0:
                        print(f"⏳ Updated {files_updated} files...")
    
    print()
    print(f"✅ Task 4 Complete: Updated {files_updated} files")
    print()
    print("Verification: Check remaining hardcoded colors...")

if __name__ == "__main__":
    main()

