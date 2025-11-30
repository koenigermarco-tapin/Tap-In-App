#!/usr/bin/env python3
"""
Fix remaining integration issues:
- Fix lang attributes
- Add missing platform modules to files that need them
"""

import re
from pathlib import Path

def fix_lang_attribute(filepath: Path):
    """Fix lang attribute"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    is_german = '-de.html' in filepath.name or filepath.name.endswith('.de.html')
    expected = 'de' if is_german else 'en'
    
    # Check current lang
    html_tag_match = re.search(r'(<html[^>]*lang=["\'])([^"\']*)(["\'])', content, re.IGNORECASE)
    
    if html_tag_match:
        current = html_tag_match.group(2).lower()
        if current == expected or current.startswith(expected):
            return False  # Already correct
        
        # Fix it
        new_content = content.replace(
            html_tag_match.group(0),
            f'{html_tag_match.group(1)}{expected}{html_tag_match.group(3)}'
        )
    else:
        # Add lang attribute
        html_tag_match = re.search(r'(<html[^>]*>)', content, re.IGNORECASE)
        if html_tag_match:
            new_content = content.replace(
                html_tag_match.group(1),
                f'<html lang="{expected}">'
            )
        else:
            return False
    
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    except:
        return False

def add_modules_to_file(filepath: Path):
    """Add platform modules to a file that needs them"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return False
    
    # Check if already has modules
    if 'achievement-badges.js' in content and 'language-switcher.js' in content:
        return False  # Already has them
    
    # Try to find insertion point
    # Look for any script tag before end
    script_pattern = r'(<script[^>]*>.*?</script>\s*)'
    scripts = list(re.finditer(script_pattern, content, re.DOTALL))
    
    if scripts:
        # Insert after last script
        last_script = scripts[-1]
        insertion_point = last_script.end()
    else:
        # Try to find </body>
        body_match = re.search(r'(\s*</body>)', content, re.IGNORECASE)
        if body_match:
            insertion_point = body_match.start(1)
        else:
            # Try </html>
            html_match = re.search(r'(\s*</html>)', content, re.IGNORECASE)
            if html_match:
                insertion_point = html_match.start(1)
            else:
                return False  # Can't find insertion point
    
    script_tags = '\n'.join([
        f'    <script src="{module}"></script>'
        for module in [
            'js/achievement-badges.js',
            'js/language-switcher.js',
            'js/structured-data.js'
        ]
    ])
    
    script_block = f'\n    <!-- Platform Integration Modules -->\n{script_tags}\n'
    
    new_content = (
        content[:insertion_point] +
        script_block +
        content[insertion_point:]
    )
    
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    except:
        return False

def main():
    """Fix remaining issues"""
    print("🔧 FIXING REMAINING INTEGRATION ISSUES")
    print("=" * 60)
    
    # Fix lang attributes
    print("\n📝 Fixing lang attributes...")
    lang_files = [
        Path('belt-assessment-de.html'),
        Path('generate-icons.html'),
        Path('icon-generator.html'),
        Path('leadership-style-assessment.de.html'),
    ]
    
    lang_fixed = 0
    for filepath in lang_files:
        if filepath.exists():
            if fix_lang_attribute(filepath):
                lang_fixed += 1
                print(f"  ✅ {filepath.name}")
    
    print(f"\n   ✅ Fixed lang attributes in {lang_fixed} files")
    
    # Try to add modules to leadership-style-assessment.de.html if it needs them
    print("\n📝 Checking for missing modules...")
    problem_file = Path('leadership-style-assessment.de.html')
    
    if problem_file.exists():
        if add_modules_to_file(problem_file):
            print(f"  ✅ Added modules to {problem_file.name}")
        else:
            print(f"  ⏭️  {problem_file.name} - Already has modules or couldn't add")
    
    print(f"\n✅ Remaining issues addressed!")

if __name__ == '__main__':
    main()

