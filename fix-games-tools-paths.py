#!/usr/bin/env python3
"""
Fix all CSS and JS paths in game and tool files
Changes css/ to ../../../css/ and js/ to ../../../js/
"""

import os
import re
from pathlib import Path

def fix_paths_in_file(filepath):
    """Fix CSS and JS paths in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix CSS paths
        content = re.sub(r'href=["\']css/', r'href="../../../css/', content)
        content = re.sub(r'href=["\']css/', r"href='../../../css/", content)
        
        # Fix JS paths
        content = re.sub(r'src=["\']js/', r'src="../../../js/', content)
        content = re.sub(r'src=["\']js/', r"src='../../../js/", content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")
        return False

# Fix game files
fixed_count = 0
games = ['conflict-cards.html', 'take-the-back.html', 'disagree-commit.html', 'disagree-commit-roulette.html']
for game in games:
    game_file = f'src/pages/games/{game}'
    if os.path.exists(game_file):
        if fix_paths_in_file(game_file):
            fixed_count += 1
            print(f"✅ Fixed: {game_file}")

# Fix tool files
tools = [
    'tool-energy-audit.html', 'tool-box-breathing.html', 'tool-journal.html',
    'tool-mood-tracker.html', 'tool-morning-routine.html', 'tool-weekly-review.html',
    'tool-decision-framework.html', 'tool-goal-tracker.html', 'tool-inner-game.html'
]
for tool in tools:
    tool_file = f'src/pages/tools/{tool}'
    if os.path.exists(tool_file):
        if fix_paths_in_file(tool_file):
            fixed_count += 1
            print(f"✅ Fixed: {tool_file}")

print(f"\n✅ Fixed {fixed_count} game and tool files")

