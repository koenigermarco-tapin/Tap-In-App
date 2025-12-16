#!/usr/bin/env python3
"""
Direct fix for production files - Anti-Laziness approach
Fixes innerHTML, meta tags in actual production files
"""

import os
import re

# Production files identified with issues
INNERHTML_FILES = [
    "js/data-migration.html",
    "lesson-viewer.html",
    "account.html",
    "statistics.html",
    "advanced-analytics.html",
    "statistics.de.html",
    "src/pages/assessments/black-belt-assessment.html",
    "src/pages/assessments/black-belt-assessment.de.html",
    "src/pages/gym/blue-belt-stripe1-gamified-de.html",
    "src/pages/gym/blue-belt-stripe4-gamified-de.html",
    "src/pages/gym/blue-belt-stripe3-gamified-de.html",
    "src/pages/gym/blue-belt-stripe2-gamified-de.html",
    "src/pages/hub/team-dashboard.html",
    "src/pages/hub/team-member-dashboard.html",
]

META_FILES = [
    "referral-dashboard.html",
    "language-switcher.html",
    "tap-out-button.html",
    "leaderboard.html",
    "save-exit-button.html",
    "restore.html",
    "evening-reflection.html",
    "src/pages/assessments/leadership-style-assessment.de.html",
    "src/pages/assessments/white-belt-graduation-assessment.html",
    "src/pages/gym/blue-belt-stripe1-carousel-NEW.html",
    "src/pages/gym/white-belt-stripe4-carousel-NEW.html",
    "src/pages/gym/white-belt-stripe1-carousel-NEW.html",
]

def fix_innerhtml(filepath):
    """Fix innerHTML in file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        fixes = 0
        
        # Pattern: element.innerHTML = value;
        pattern = r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*([^;]+);'
        
        def replace(match):
            nonlocal fixes
            element = match.group(1)
            value = match.group(2).strip()
            if 'safeSetInnerHTML' not in value:
                fixes += 1
                return f'safeSetInnerHTML({element}, {value});'
            return match.group(0)
        
        content = re.sub(pattern, replace, content)
        
        # Add dom.js if needed
        if fixes > 0 and '/js/core/dom.js' not in content and '</head>' in content:
            script_tag = '    <script src="/js/core/dom.js" type="module"></script>\n'
            content = content.replace('</head>', f'{script_tag}</head>', 1)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        return 0
    except Exception as e:
        print(f"Error {filepath}: {e}")
        return 0

def fix_meta_tags(filepath):
    """Fix meta tags in file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        fixes = 0
        
        # Add viewport
        if 'viewport' not in content and '<head>' in content:
            viewport = '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
            content = content.replace('<head>', f'<head>\n{viewport}', 1)
            fixes += 1
        
        # Add description
        if 'meta name="description"' not in content and '</head>' in content:
            title_match = re.search(r'<title>([^<]+)</title>', content)
            if title_match:
                desc = f"{title_match.group(1).strip()} - TAP-IN Leadership Academy"
            else:
                filename = os.path.basename(filepath).replace('.html', '').replace('-', ' ').title()
                desc = f"{filename} - TAP-IN Leadership Academy"
            description = f'    <meta name="description" content="{desc}">\n'
            content = content.replace('</head>', f'{description}</head>', 1)
            fixes += 1
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        return 0
    except Exception as e:
        print(f"Error {filepath}: {e}")
        return 0

def main():
    print("=== DIRECT FIX: PRODUCTION FILES ===")
    print()
    
    # Fix innerHTML
    print("Fixing innerHTML...")
    innerhtml_fixes = 0
    for filepath in INNERHTML_FILES:
        if os.path.exists(filepath):
            fixes = fix_innerhtml(filepath)
            innerhtml_fixes += fixes
            if fixes > 0:
                print(f"  ✅ {filepath}: {fixes} fixes")
    
    print(f"InnerHTML fixes: {innerhtml_fixes}")
    print()
    
    # Fix meta tags
    print("Fixing meta tags...")
    meta_fixes = 0
    for filepath in META_FILES:
        if os.path.exists(filepath):
            fixes = fix_meta_tags(filepath)
            meta_fixes += fixes
            if fixes > 0:
                print(f"  ✅ {filepath}: {fixes} meta tags")
    
    print(f"Meta tag fixes: {meta_fixes}")
    print()
    print("✅ Direct fixes complete")

if __name__ == "__main__":
    main()

