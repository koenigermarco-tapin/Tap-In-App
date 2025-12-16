#!/usr/bin/env python3
"""
Replace emojis in console.log statements with text
"""

import re
import os
from pathlib import Path

# Emoji to text mapping for console.log
EMOJI_TO_TEXT = {
    '✅': '✓',
    '❌': '✗',
    '⚠️': '!',
    'ℹ️': 'i',
    '🥋': '[BELT]',
    '🎯': '[TARGET]',
    '💪': '[STRENGTH]',
    '📊': '[CHART]',
    '🌟': '[STAR]',
    '⭐': '[STAR]',
    '🔥': '[FIRE]',
    '📱': '[MOBILE]',
    '💻': '[DESKTOP]',
    '👥': '[TEAM]',
    '🏆': '[TROPHY]',
    '📈': '[TREND]',
    '💼': '[BUSINESS]',
    '🔒': '[LOCK]',
    '🔓': '[UNLOCK]',
    '⏱️': '[CLOCK]',
    '📝': '[DOC]',
    '🔔': '[BELL]',
    '⚡': '[BOLT]',
    '🎮': '[GAME]',
    '📚': '[BOOK]',
}

def fix_console_logs(file_path):
    """Fix console.log statements with emojis"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = 0
        
        # Pattern: console.log('emoji text')
        for emoji, text in EMOJI_TO_TEXT.items():
            if emoji in content:
                # Replace in console.log strings
                pattern = re.compile(f"console\\.log\\s*\\([^)]*{re.escape(emoji)}[^)]*\\)")
                
                def replace_func(match):
                    nonlocal changes
                    changes += 1
                    matched = match.group(0)
                    return matched.replace(emoji, text)
                
                content = pattern.sub(replace_func, content)
        
        if changes > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✓ Fixed {changes} console.log statements")
            return True
        return False
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    """Main function"""
    base_dir = Path('.')
    
    # Find all HTML files
    html_files = list(base_dir.glob('*.html'))
    
    print(f"🔧 Fixing console.log statements in {len(html_files)} files...\n")
    
    fixed = 0
    for file_path in sorted(html_files):
        if file_path.name.startswith('_') or file_path.name.startswith('.'):
            continue
        if fix_console_logs(file_path):
            fixed += 1
    
    print(f"\n✅ Fixed console.log in {fixed} files")

if __name__ == '__main__':
    main()

