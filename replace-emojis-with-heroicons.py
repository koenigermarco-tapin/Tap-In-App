#!/usr/bin/env python3
"""
Replace emojis with Heroicons in HTML files
Tier 1: High visibility pages (6 files)
"""

import re
import os
from pathlib import Path

# Emoji to Heroicon mapping
EMOJI_TO_ICON = {
    '🥋': 'icon-academic-cap',
    '🎯': 'icon-flag',
    '💪': 'icon-hand-raised',
    '📊': 'icon-chart-bar',
    '🌟': 'icon-star',
    '⭐': 'icon-star-solid',
    '✅': 'icon-check-circle',
    '❌': 'icon-x-circle',
    '⚠️': 'icon-exclamation-triangle',
    '🔥': 'icon-fire',
    '📱': 'icon-device-phone-mobile',
    '💻': 'icon-computer-desktop',
    '👥': 'icon-user-group',
    '🏆': 'icon-trophy',
    '📈': 'icon-arrow-trending-up',
    '🎓': 'icon-academic-cap',
    '💼': 'icon-briefcase',
    '🔒': 'icon-lock-closed',
    '🔓': 'icon-lock-open',
    '⏱️': 'icon-clock',
    '📝': 'icon-document-text',
    '🔔': 'icon-bell',
    '⚡': 'icon-bolt',
    '🎮': 'icon-puzzle-piece',
    '📚': 'icon-book-open',
    '🏢': 'icon-briefcase',  # Building/office
    '⏸️': 'icon-clock',  # Pause (using clock as closest)
    '☀️': 'icon-star',  # Sun (using star)
    '🎙️': 'icon-bolt',  # Microphone (using bolt)
    '🛡️': 'icon-lock-closed',  # Shield (using lock)
    '⚪': 'icon-academic-cap',  # White circle (belt)
    '⚫': 'icon-academic-cap',  # Black circle (belt)
    '🟤': 'icon-academic-cap',  # Brown circle (belt)
    '🟣': 'icon-academic-cap',  # Purple circle (belt)
    '🔵': 'icon-academic-cap',  # Blue circle (belt)
}

# Size classes based on context
SIZE_CLASSES = {
    'heading': 'hero-icon-lg',
    'button': 'hero-icon-md',
    'inline': 'hero-icon-sm',
    'large': 'hero-icon-xl',
}

def create_icon_svg(icon_name, size='md', inline=False):
    """Create SVG icon HTML"""
    size_class = SIZE_CLASSES.get(size, 'hero-icon-md')
    if inline:
        # Inline SVG for critical path
        return f'<svg class="hero-icon {size_class}" aria-hidden="true"><use href="icons/sprite.svg#{icon_name}"></use></svg>'
    else:
        return f'<svg class="hero-icon {size_class}" aria-hidden="true"><use href="icons/sprite.svg#{icon_name}"></use></svg>'

def replace_emoji_in_text(text, emoji, icon_name):
    """Replace emoji in text with icon SVG"""
    # Pattern 1: Emoji at start of text (heading, button)
    pattern1 = re.compile(f'^{re.escape(emoji)}\\s*')
    if pattern1.search(text):
        return pattern1.sub(f'{create_icon_svg(icon_name, "lg")} ', text)
    
    # Pattern 2: Emoji in middle/end (inline)
    pattern2 = re.compile(re.escape(emoji))
    return pattern2.sub(create_icon_svg(icon_name, "sm"), text)

def process_html_file(file_path):
    """Process a single HTML file"""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_made = 0
        
        # Replace emojis in HTML content
        for emoji, icon_name in EMOJI_TO_ICON.items():
            if emoji in content:
                # Replace in text content (between tags)
                # Pattern: >emoji< or >emoji text<
                pattern = re.compile(f'([>])({re.escape(emoji)})([^<]*)')
                def replace_func(match):
                    nonlocal changes_made
                    changes_made += 1
                    before = match.group(1)
                    emoji_char = match.group(2)
                    after = match.group(3)
                    icon_svg = create_icon_svg(icon_name, 'sm')
                    return f'{before}{icon_svg}{after}'
                
                content = pattern.sub(replace_func, content)
                
                # Also replace standalone emojis in attributes (like onclick, aria-label)
                # This is more complex, so we'll handle common cases
                if emoji in content:
                    # Replace in onclick/aria-label attributes
                    attr_pattern = re.compile(f'({re.escape(emoji)})')
                    content = attr_pattern.sub(icon_name.replace('icon-', '').replace('-', ' ').title(), content)
        
        if changes_made > 0 or content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ Made {changes_made} replacements")
            return True
        else:
            print(f"  ⏭️  No emojis found")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def process_tier2_files():
    """Process Tier 2 files: assessments and profiles"""
    base_dir = Path('.')
    processed = 0
    
    # Find all assessment files
    assessment_files = list(base_dir.glob('*-assessment*.html'))
    assessment_files.extend(list(base_dir.glob('*assessment*.html')))
    
    # Find all profile files
    profile_files = list(base_dir.glob('*profile*.html'))
    
    # Business portal files
    business_files = [
        base_dir / 'business-portal.html',
        base_dir / 'business-portal-de.html',
    ]
    
    all_tier2 = list(set(assessment_files + profile_files + [f for f in business_files if f.exists()]))
    
    print(f"🎨 Processing {len(all_tier2)} Tier 2 files...\n")
    
    for file_path in sorted(all_tier2):
        if file_path.exists():
            if process_html_file(file_path):
                processed += 1
        else:
            print(f"⚠️  File not found: {file_path}")
    
    return processed

def process_tier3_files():
    """Process Tier 3 files: belt progression and lessons"""
    base_dir = Path('.')
    processed = 0
    
    # Find belt progression files
    belt_files = []
    belt_files.extend(list(base_dir.glob('*-belt*.html')))
    belt_files.extend(list(base_dir.glob('white-belt*.html')))
    belt_files.extend(list(base_dir.glob('blue-belt*.html')))
    belt_files.extend(list(base_dir.glob('purple-belt*.html')))
    belt_files.extend(list(base_dir.glob('brown-belt*.html')))
    belt_files.extend(list(base_dir.glob('black-belt*.html')))
    
    # Find lesson/stripe files
    lesson_files = []
    lesson_files.extend(list(base_dir.glob('stripe*.html')))
    lesson_files.extend(list(base_dir.glob('*-stripe*.html')))
    lesson_files.extend(list(base_dir.glob('*-module*.html')))
    lesson_files.extend(list(base_dir.glob('*-lesson*.html')))
    
    # Exclude files already processed in Tier 1 & 2
    excluded = {'belt-assessment-v2.html', 'belt-assessment-v2-de.html', 
                'belt-assessment.html', 'belt-assessment-de.html',
                'belt-assessment-card.html', 'belt-level-assessment.html'}
    
    all_tier3 = [f for f in set(belt_files + lesson_files) 
                 if f.exists() and f.name not in excluded]
    
    print(f"🎨 Processing {len(all_tier3)} Tier 3 files...\n")
    
    for file_path in sorted(all_tier3):
        if file_path.exists():
            if process_html_file(file_path):
                processed += 1
        else:
            print(f"⚠️  File not found: {file_path}")
    
    return processed

def main():
    """Main function"""
    import sys
    
    tier = sys.argv[1] if len(sys.argv) > 1 else 'tier2'
    
    if tier == 'tier2':
        processed = process_tier2_files()
        print(f"\n✅ Processed {processed} Tier 2 files")
        print("\n📝 Next steps:")
        print("1. Review the changes")
        print("2. Test in browser")
        print("3. Run 'python3 replace-emojis-with-heroicons.py tier3' for Tier 3 files")
    elif tier == 'tier3':
        processed = process_tier3_files()
        print(f"\n✅ Processed {processed} Tier 3 files")
        print("\n📝 Next steps:")
        print("1. Review the changes")
        print("2. Test in browser")
        print("3. Add CSS links to Tier 3 files")
        print("4. Final testing across all pages")
    elif tier == 'tier1':
        # Tier 1 files (high visibility)
        tier1_files = [
            'index-DUAL-ENTRY.html',
            'index-DUAL-ENTRY-de.html',
            'gym-dashboard.html',
            'gym-dashboard-de.html',
            'hub-home-BUSINESS.html',
            'hub-home-BUSINESS-de.html',
            'belt-assessment-v2.html',
            'belt-assessment-v2-de.html',
        ]
        
        base_dir = Path('.')
        processed = 0
        
        print("🎨 Replacing emojis with Heroicons in Tier 1 files...\n")
        
        for filename in tier1_files:
            file_path = base_dir / filename
            if file_path.exists():
                if process_html_file(file_path):
                    processed += 1
            else:
                print(f"⚠️  File not found: {filename}")
        
        print(f"\n✅ Processed {processed} files")
        print("\n📝 Next steps:")
        print("1. Review the changes")
        print("2. Test in browser")
        print("3. Run Tier 2 files if Tier 1 looks good")

if __name__ == '__main__':
    main()

