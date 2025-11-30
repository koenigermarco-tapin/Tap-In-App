#!/usr/bin/env python3
"""
Clean up duplicate code in quiz completion functions
"""

import re
from pathlib import Path

def cleanup_file(filename):
    """Remove duplicate code from a stripe file"""
    filepath = Path(filename)
    
    if not filepath.exists():
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_length = len(content)
    
    # Remove duplicate pattern: }</span>/10</p> followed by duplicate code
    # Pattern: closing brace, then HTML fragment, then duplicate JavaScript
    pattern = r'\}\}</span>/10</p>.*?completionDiv\.scrollIntoView.*?\n        \}\}\);'
    
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, '}', content, flags=re.DOTALL)
        print(f"   ✅ Cleaned duplicate code")
    
    # Also check for simpler duplicate: closing brace followed by duplicate function content
    pattern2 = r'(\}\s*\n\s*\})\s*\n\s*\);\s*\n\s*\}\s*\n\s*\}\s*\n\s*function awardQuizXP'
    
    if re.search(pattern2, content, re.DOTALL):
        content = re.sub(pattern2, r'\1\n        function awardQuizXP', content, flags=re.DOTALL)
        print(f"   ✅ Cleaned duplicate closing braces")
    
    if len(content) != original_length:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    print("🧹 Cleaning up duplicate quiz code")
    print("=" * 60)
    
    files = []
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        for i in range(1, 5):
            files.append(f"{belt}-belt-stripe{i}-gamified.html")
    
    cleaned = 0
    for filename in files:
        if cleanup_file(filename):
            cleaned += 1
            print(f"✅ {filename}")
    
    print(f"\n🎉 Cleaned {cleaned} files")

if __name__ == '__main__':
    main()

