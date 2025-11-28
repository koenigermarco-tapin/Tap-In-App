#!/usr/bin/env python3
"""
Fix cache-buster.js loading in all HTML files
- Remove defer attribute
- Change path from js/cache-buster.js to cache-buster.js
- Move to <head> section (early loading)
"""

import os
import re
from pathlib import Path

def fix_cache_buster_in_file(filepath):
    """Fix cache-buster.js loading in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Pattern 1: <script src="js/cache-buster.js" defer></script>
        content = re.sub(
            r'<script\s+src=["\']js/cache-buster\.js["\'][^>]*defer[^>]*></script>',
            '<!-- CACHE BUSTER - Load FIRST, before anything else -->\n    <script src="cache-buster.js"></script>',
            content,
            flags=re.IGNORECASE
        )
        
        # Pattern 2: <script src="cache-buster.js" defer></script>
        content = re.sub(
            r'<script\s+src=["\']cache-buster\.js["\'][^>]*defer[^>]*></script>',
            '<!-- CACHE BUSTER - Load FIRST, before anything else -->\n    <script src="cache-buster.js"></script>',
            content,
            flags=re.IGNORECASE
        )
        
        # Pattern 3: Any cache-buster.js with defer (catch-all)
        content = re.sub(
            r'<script\s+src=["\'][^"\']*cache-buster\.js["\'][^>]*defer[^>]*></script>',
            '<!-- CACHE BUSTER - Load FIRST, before anything else -->\n    <script src="cache-buster.js"></script>',
            content,
            flags=re.IGNORECASE
        )
        
        # If we found cache-buster but it's at the end, move it to <head>
        if 'cache-buster.js' in content and '</head>' in content:
            # Check if it's in <head> already
            head_match = re.search(r'<head[^>]*>.*?</head>', content, re.DOTALL | re.IGNORECASE)
            if head_match:
                head_content = head_match.group(0)
                # If cache-buster is not in head, move it
                if 'cache-buster.js' not in head_content:
                    # Remove from body
                    content = re.sub(
                        r'<!-- CACHE BUSTER[^>]*>.*?<script\s+src=["\']cache-buster\.js["\'][^>]*></script>',
                        '',
                        content,
                        flags=re.DOTALL | re.IGNORECASE
                    )
                    # Add to head (after charset/viewport, before other scripts)
                    head_insert = '    <!-- CACHE BUSTER - Load FIRST, before anything else -->\n    <script src="cache-buster.js"></script>\n'
                    content = re.sub(
                        r'(<head[^>]*>.*?<meta[^>]*charset[^>]*>.*?<meta[^>]*viewport[^>]*>)',
                        r'\1\n' + head_insert,
                        content,
                        flags=re.DOTALL | re.IGNORECASE
                    )
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    repo_root = Path(__file__).parent
    html_files = list(repo_root.rglob('*.html'))
    
    updated = 0
    errors = 0
    
    # Files that should have cache-buster
    target_files = [
        'index.html',
        'index-DUAL-ENTRY.html',
        'index-DUAL-ENTRY-de.html',
        'gym-dashboard.html',
        'gym-dashboard-de.html',
        'learning-hub.html',
        'learning-hub-de.html',
        'business-portal.html',
        'invite-team.html',
        'assessment-belt-landing.html',
        'talent-finder.html',
        'hub-home-BUSINESS.html',
        'hub-home-BUSINESS-de.html'
    ]
    
    for html_file in html_files:
        if html_file.name in target_files:
            if fix_cache_buster_in_file(html_file):
                updated += 1
                print(f"✅ Updated: {html_file.name}")
    
    print(f"\n{'='*60}")
    print(f"Updated {updated} files")
    print(f"Errors: {errors}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()

