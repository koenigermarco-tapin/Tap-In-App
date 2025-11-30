#!/usr/bin/env python3
"""
Add accessibility improvements to HTML files
- ARIA labels on interactive elements
- Skip-to-content links
- Enhanced focus indicators
"""

from pathlib import Path
import re

# Priority pages to update first
PRIORITY_PAGES = [
    'gym-dashboard.html',
    'index.html',
    'learning-hub.html',
    'belt-assessment-v2.html',
]

# All stripe files
STRIPE_PATTERNS = [
    '*-stripe*-gamified.html',
    '*-stripe*-carousel*.html',
]

def add_skip_link(content):
    """Add skip-to-content link at the top of body"""
    
    skip_link = '''<a href="#main-content" class="skip-link" style="position: absolute; top: -40px; left: 0; background: #6366f1; color: white; padding: 8px 16px; text-decoration: none; z-index: 9999; border-radius: 0 0 4px 0; font-weight: 600;"
    onfocus="this.style.top='0';" onblur="this.style.top='-40px';">Skip to main content</a>'''
    
    # Find <body> tag
    body_pattern = r'(<body[^>]*>)'
    
    if re.search(body_pattern, content):
        # Check if skip link already exists
        if 'skip-link' in content or 'Skip to main content' in content:
            return content, False
        
        content = re.sub(
            body_pattern,
            r'\1\n    ' + skip_link,
            content,
            count=1
        )
        return content, True
    
    return content, False

def add_aria_labels(content):
    """Add ARIA labels to buttons and links"""
    
    changes = 0
    
    # Pattern 1: Icon-only buttons (arrows, etc.)
    patterns = [
        # Buttons with just arrows
        (r'(<button[^>]*>)\s*[←→↑↓]+\s*(</button>)', r'\1<span class="sr-only">Navigation</span>\2'),
        # Buttons without aria-label
        (r'<button([^>]*)(?!.*aria-label)([^>]*)>([^<]+)</button>', 
         lambda m: f'<button{m.group(1)}{m.group(2)} aria-label="{m.group(3).strip()}" >{m.group(3)}</button>' if not m.group(1).startswith('aria-label') and m.group(3).strip() else m.group(0)),
        # Links without aria-label (but skip ones that already have it)
        (r'<a([^>]*)(?!.*aria-label)([^>]*href="[^"]*">)([^<]+)</a>',
         lambda m: f'<a{m.group(1)}{m.group(2)} aria-label="{m.group(3).strip() if len(m.group(3).strip()) < 50 else "Link"}" {m.group(3)}</a>' if 'aria-label' not in m.group(1) and 'aria-label' not in m.group(2) else m.group(0)),
    ]
    
    # Simpler approach: Add aria-label to buttons that don't have it and have text
    def add_button_aria(match):
        attrs = match.group(1)
        text = match.group(2)
        
        if 'aria-label' in attrs:
            return match.group(0)
        
        # Skip if text is empty or just symbols
        if not text.strip() or len(text.strip()) < 3:
            return match.group(0)
        
        # Add aria-label
        new_attrs = attrs.rstrip()
        if not new_attrs.endswith('>'):
            new_attrs = new_attrs.rstrip('>') + ' aria-label="' + text.strip() + '" >'
        else:
            new_attrs = new_attrs.rstrip('>') + ' aria-label="' + text.strip() + '" >'
        
        return f'<button{new_attrs}{text}</button>'
    
    # More targeted: buttons without aria-label
    button_pattern = r'<button([^>]*)(?!.*aria-label)([^>]*)>([^<]{3,})</button>'
    
    def replace_button(match):
        attrs = match.group(1) + match.group(2)
        text = match.group(3).strip()
        
        if 'aria-label' in attrs:
            return match.group(0)
        
        # Don't add if text is too long or contains HTML
        if len(text) > 100 or '<' in text:
            return match.group(0)
        
        # Add aria-label before closing of opening tag
        if attrs.endswith('>'):
            new_attrs = attrs[:-1] + ' aria-label="' + text + '" >'
        else:
            new_attrs = attrs + ' aria-label="' + text + '"'
        
        return f'<button{new_attrs}>{match.group(3)}</button>'
    
    # Apply replacement
    new_content = re.sub(button_pattern, replace_button, content)
    if new_content != content:
        changes += 1
        content = new_content
    
    return content, changes > 0

def add_landmarks(content):
    """Add ARIA landmarks (main, nav, etc.)"""
    
    changes = 0
    
    # Add main landmark
    if '<main' not in content and '#main-content' not in content:
        # Try to find main content area
        main_patterns = [
            (r'(<div[^>]*class="[^"]*main-content[^"]*"[^>]*>)', r'<main id="main-content" \1'),
            (r'(<div[^>]*class="[^"]*content[^"]*"[^>]*>)', r'<main id="main-content" role="main" \1'),
        ]
        
        for pattern, replacement in main_patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content, count=1)
                changes += 1
                break
    
    # Add nav landmark
    nav_pattern = r'(<nav[^>]*)(?!.*role)([^>]*>)'
    if re.search(nav_pattern, content):
        content = re.sub(nav_pattern, r'\1 role="navigation"\2', content)
        changes += 1
    
    return content, changes > 0

def add_focus_styles(content):
    """Add enhanced focus styles"""
    
    focus_css = '''
/* Enhanced Focus Styles for Accessibility */
button:focus,
a:focus,
input:focus,
textarea:focus,
select:focus,
.stripe-item:focus,
.module-card:focus,
.entry-card:focus {
    outline: 3px solid #6366f1;
    outline-offset: 2px;
    box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.2);
}

/* Screen reader only class */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
'''
    
    # Check if focus styles already exist
    if 'outline: 3px solid #6366f1' in content or 'Enhanced Focus Styles' in content:
        return content, False
    
    # Find </style> tag or add before </head>
    style_pattern = r'(</style>)'
    head_pattern = r'(</head>)'
    
    if re.search(style_pattern, content):
        content = re.sub(style_pattern, focus_css + r'\1', content, count=1)
        return content, True
    elif re.search(head_pattern, content):
        # Add style tag before </head>
        style_tag = f'<style>{focus_css}</style>'
        content = re.sub(head_pattern, style_tag + r'\1', content, count=1)
        return content, True
    
    return content, False

def improve_accessibility(filepath):
    """Apply all accessibility improvements to a file"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # 1. Add skip link
    content, changed = add_skip_link(content)
    if changed:
        changes.append("Skip link added")
    
    # 2. Add ARIA labels
    content, changed = add_aria_labels(content)
    if changed:
        changes.append("ARIA labels added")
    
    # 3. Add landmarks
    content, changed = add_landmarks(content)
    if changed:
        changes.append("ARIA landmarks added")
    
    # 4. Add focus styles
    content, changed = add_focus_styles(content)
    if changed:
        changes.append("Focus styles added")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def main():
    print("=" * 80)
    print("♿ ACCESSIBILITY IMPROVEMENTS")
    print("=" * 80)
    print()
    
    files_to_update = []
    
    # Add priority pages
    for page in PRIORITY_PAGES:
        if Path(page).exists():
            files_to_update.append(Path(page))
    
    # Add stripe files (sample first 5)
    for pattern in STRIPE_PATTERNS:
        for file in list(Path('.').glob(pattern))[:5]:
            if any(skip in str(file) for skip in ['node_modules', '.git', 'react-app']):
                continue
            if file not in files_to_update:
                files_to_update.append(file)
    
    files_to_update.sort()
    
    print(f"Found {len(files_to_update)} files to update\n")
    
    updated = 0
    skipped = 0
    
    for filepath in files_to_update:
        print(f"📝 {filepath.name}...")
        try:
            success, changes = improve_accessibility(filepath)
            if success:
                updated += 1
                print(f"  ✅ Updated: {', '.join(changes)}")
            else:
                skipped += 1
                print(f"  ⏭️  No changes needed")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(files_to_update)}")
    print(f"⏭️  Skipped: {skipped}")
    print("=" * 80)
    print()
    print("💡 Note: This is a first pass. Manual review recommended for:")
    print("   - Complex interactive elements")
    print("   - Forms and inputs")
    print("   - Custom components")

if __name__ == '__main__':
    main()

