#!/usr/bin/env python3
"""
Fix ONLY actual duplicated filenames/paths, not single letter repetitions
Examples to fix:
- gym-dashboardgym-dashboard.html → gym-dashboard.html
- belt-assessmentbelt-assessment.html → belt-assessment.html
- boundariesboundaries-1-why.html → boundaries-1-why.html
- communication-masterycommunication-mastery-1.html → communication-mastery-1.html

NOT to fix:
- css/ (single 's' is fine)
- https:// (single 't' is fine)
- assessments (single 's' is fine)
"""

import os
import re
from pathlib import Path

def fix_duplicated_paths(filepath):
    """Fix only actual duplicated filenames, not single letters"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return False, []
    
    original = content
    fixes = []
    
    # Pattern 1: Duplicated filename before .html
    # Match: wordword.html where word is at least 2 characters
    # Examples: gym-dashboardgym-dashboard.html, belt-assessmentbelt-assessment.html
    def fix_dup_filename(match):
        attr = match.group(1)
        quote = match.group(2)
        before = match.group(3)
        word = match.group(4)  # Must be at least 2 chars (handled by regex)
        after = match.group(5)
        
        # Only fix if word is at least 3 characters (to avoid fixing single letters)
        if len(word) >= 3:
            fixed = f'{attr}={quote}{before}{word}{after}{quote}'
            if match.group(0) != fixed:
                fixes.append({
                    'old': match.group(0),
                    'new': fixed,
                    'type': 'duplicated_filename'
                })
            return fixed
        return match.group(0)
    
    # Pattern: wordword.html where word is 3+ chars
    pattern1 = r'(href|src|use\s+href)=(["\'])([^"\']*?)([a-z-]{3,})\4(\.html)([^"\']*?)\2'
    content = re.sub(pattern1, fix_dup_filename, content, flags=re.IGNORECASE)
    
    # Pattern 2: Duplicated path segment before /
    # Match: wordword/ where word is at least 3 characters
    # Examples: boundariesboundaries-1-why.html → boundaries-1-why.html
    def fix_dup_path_segment(match):
        attr = match.group(1)
        quote = match.group(2)
        before = match.group(3)
        word = match.group(4)  # Must be at least 3 chars
        after = match.group(5)
        
        if len(word) >= 3:
            fixed = f'{attr}={quote}{before}{word}/{after}{quote}'
            if match.group(0) != fixed:
                fixes.append({
                    'old': match.group(0),
                    'new': fixed,
                    'type': 'duplicated_path_segment'
                })
            return fixed
        return match.group(0)
    
    pattern2 = r'(href|src|use\s+href)=(["\'])([^"\']*?)([a-z-]{3,})\4/([^"\']*?)\2'
    content = re.sub(pattern2, fix_dup_path_segment, content, flags=re.IGNORECASE)
    
    # Manual fixes for known specific issues
    manual_fixes = {
        'gym-dashboardgym-dashboard': 'gym-dashboard',
        'belt-assessmentbelt-assessment': 'belt-assessment',
        'worker-type-assessmentworker-type-assessment': 'worker-type-assessment',
        'leadership-style-assessmentleadership-style-assessment': 'leadership-style-assessment',
        'communication-masterycommunication-mastery': 'communication-mastery',
        'boundariesboundaries': 'boundaries',
        'deep-workdeep-work': 'deep-work',
        'energy-managementenergy-management': 'energy-management',
        'stripestripe': 'stripe',
        'work-life-balance-assessmentwork-life-balance-assessment': 'work-life-balance-assessment',
        'values-discovery-assessmentvalues-discovery-assessment': 'values-discovery-assessment',
        'team-assessment-enhanced-v2team-assessment-enhanced-v2': 'team-assessment-enhanced-v2',
    }
    
    for old, new in manual_fixes.items():
        if old in content:
            count = content.count(old)
            content = content.replace(old, new)
            if count > 0:
                fixes.append({
                    'old': old,
                    'new': new,
                    'type': 'manual',
                    'count': count
                })
    
    # Fix missing slashes in paths (pathpath/file → path/file)
    # Only if the word before the slash is duplicated
    def fix_missing_slash(match):
        attr = match.group(1)
        quote = match.group(2)
        before = match.group(3)
        word1 = match.group(4)
        word2 = match.group(5)
        after = match.group(6)
        
        # Only fix if word1 == word2 and both are at least 3 chars
        if word1 == word2 and len(word1) >= 3:
            fixed = f'{attr}={quote}{before}{word1}/{after}{quote}'
            if match.group(0) != fixed:
                fixes.append({
                    'old': match.group(0),
                    'new': fixed,
                    'type': 'missing_slash'
                })
            return fixed
        return match.group(0)
    
    # Pattern: wordword/file (missing slash)
    pattern3 = r'(href|src|use\s+href)=(["\'])([^"\']*?)([a-z-]{3,})([a-z-]{3,})/([^"\']*?)\2'
    content = re.sub(pattern3, fix_missing_slash, content, flags=re.IGNORECASE)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, fixes
    
    return False, []

# Find all HTML files
html_files = []
for root, dirs, files in os.walk('.'):
    if any(skip in root for skip in ['.git', 'node_modules', '__pycache__', 'venv', 'archive', 'backup', 'react-app', '.next']):
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

print("🔍 Finding and fixing ONLY actual duplicated filenames...\n")
print(f"📄 Scanning {len(html_files)} HTML files...\n")

total_fixed = 0
all_fixes = []

for html_file in html_files:
    fixed, fixes = fix_duplicated_paths(html_file)
    if fixed:
        total_fixed += 1
        all_fixes.extend([(html_file, f) for f in fixes])
        print(f"✅ Fixed: {html_file} ({len(fixes)} fixes)")

print("\n" + "="*60)
print(f"📊 SUMMARY")
print("="*60)
print(f"✅ Files Fixed: {total_fixed}")
print(f"✅ Total Fixes: {len(all_fixes)}")

if all_fixes:
    print("\n📋 Sample Fixes:\n")
    # Group by type
    by_type = {}
    for file, fix in all_fixes:
        fix_type = fix['type']
        if fix_type not in by_type:
            by_type[fix_type] = []
        by_type[fix_type].append((file, fix))
    
    for fix_type, type_fixes in by_type.items():
        print(f"\n🔧 {fix_type.upper()} ({len(type_fixes)} fixes):")
        for file, fix in type_fixes[:10]:  # Show first 10
            print(f"   📄 {os.path.basename(file)}")
            print(f"      {fix['old']} → {fix['new']}")
        if len(type_fixes) > 10:
            print(f"   ... and {len(type_fixes) - 10} more")
else:
    print("\n✅ No duplicated filenames found!")

print("\n" + "="*60)

