#!/usr/bin/env python3
"""
Direct fix for remaining production files
Anti-Laziness: Fix each file individually with verification
"""

import os
import re

# Files identified with innerHTML issues
INNERHTML_FILES = [
    "lesson-viewer.html",
    "account.html",
    "statistics.html",
    "learning-modules/energy-management/energy-tracker.html",
    "advanced-analytics.html",
    "statistics.de.html",
    "src/pages/assessments/black-belt-assessment.html",
    "src/pages/assessments/black-belt-assessment.de.html",
    "src/pages/gym/blue-belt-stripe1-gamified-de.html",
    "src/pages/gym/blue-belt-stripe4-gamified-de.html",
    "src/pages/gym/blue-belt-stripe3-gamified-de.html",
    "src/pages/gym/blue-belt-stripe2-gamified-de.html",
    "src/pages/hub/team-member-dashboard.html",
]

# Files missing meta tags
META_FILES = [
    "referral-dashboard.html",
    "language-switcher.html",
    "js/data-migration.html",
    "js/auth-modal.html",
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
    "src/pages/gym/white-belt-stripe3-gamified.html",
    "src/pages/gym/white-belt-stripe2-carousel-NEW.html",
    "src/pages/gym/white-belt-stripe3-carousel-NEW.html",
    "src/pages/gym/white-belt-stripe2-gamified.html",
    "src/pages/games/take-the-back-clean.html",
    "src/pages/games/take-the-back-clean-working.html",
]

def fix_innerhtml(filepath):
    """Fix innerHTML in file - multiple patterns"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        fixes = 0
        
        # Pattern 1: element.innerHTML = value;
        pattern1 = r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*([^;]+);'
        def replace1(match):
            nonlocal fixes
            element = match.group(1)
            value = match.group(2).strip()
            if 'safeSetInnerHTML' not in value:
                fixes += 1
                return f'safeSetInnerHTML({element}, {value});'
            return match.group(0)
        content = re.sub(pattern1, replace1, content)
        
        # Pattern 2: element.innerHTML = value (no semicolon, multiline)
        pattern2 = r'(\w+(?:\.\w+)*)\.innerHTML\s*=\s*([^\n]+?)(?=\n|;|$)'
        def replace2(match):
            nonlocal fixes
            element = match.group(1)
            value = match.group(2).strip().rstrip(';')
            if 'safeSetInnerHTML' not in value and value:
                fixes += 1
                return f'safeSetInnerHTML({element}, {value});'
            return match.group(0)
        content = re.sub(pattern2, replace2, content, flags=re.MULTILINE)
        
        # Add dom.js if needed
        if fixes > 0 and '/js/core/dom.js' not in content:
            if '</head>' in content:
                script_tag = '    <script src="/js/core/dom.js" type="module"></script>\n'
                content = content.replace('</head>', f'{script_tag}</head>', 1)
            elif '<head>' in content:
                script_tag = '    <script src="/js/core/dom.js" type="module"></script>\n'
                content = content.replace('<head>', f'<head>\n{script_tag}', 1)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes
        return 0
    except Exception as e:
        return f"Error: {e}"

def fix_meta_tags(filepath):
    """Fix meta tags in file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if len(content) < 50:
            return 0
        
        original = content
        fixes = 0
        
        # Add viewport
        if 'viewport' not in content:
            if '<head>' in content:
                viewport = '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
                content = content.replace('<head>', f'<head>\n{viewport}', 1)
                fixes += 1
            elif '<html>' in content:
                # Add head tag if missing
                viewport = '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
                head_tag = f'<head>\n{viewport}</head>'
                content = content.replace('<html>', f'<html>\n{head_tag}', 1)
                fixes += 1
        
        # Add description
        if 'meta name="description"' not in content:
            if '</head>' in content:
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
        return f"Error: {e}"

def main():
    print("=== DIRECT FIX: REMAINING PRODUCTION FILES ===")
    print()
    
    # Fix innerHTML
    print("Fixing innerHTML...")
    innerhtml_total = 0
    for filepath in INNERHTML_FILES:
        if os.path.exists(filepath):
            result = fix_innerhtml(filepath)
            if isinstance(result, int):
                innerhtml_total += result
                if result > 0:
                    print(f"  ✅ {filepath}: {result} fixes")
            else:
                print(f"  ❌ {filepath}: {result}")
    
    print(f"InnerHTML fixes: {innerhtml_total}")
    print()
    
    # Fix meta tags
    print("Fixing meta tags...")
    meta_total = 0
    for filepath in META_FILES:
        if os.path.exists(filepath):
            result = fix_meta_tags(filepath)
            if isinstance(result, int):
                meta_total += result
                if result > 0:
                    print(f"  ✅ {filepath}: {result} meta tags")
            else:
                print(f"  ❌ {filepath}: {result}")
    
    print(f"Meta tag fixes: {meta_total}")
    print()
    print("✅ Direct fixes complete")

if __name__ == "__main__":
    main()

