#!/usr/bin/env python3
"""
Add performance-monitor.js to key pages
"""

from pathlib import Path
import re

# Key pages that should have performance monitoring
KEY_PAGES = [
    'index.html',
    'gym-dashboard.html',
    'learning-hub.html',
    'belt-assessment-v2.html',
]

# Also add to all assessment pages
ASSESSMENT_PATTERNS = [
    '*-belt-assessment.html',
    'belt-assessment*.html',
]

def add_performance_monitor(filepath):
    """Add performance monitor script to file"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already added
    if 'js/performance-monitor.js' in content:
        return False, "Already added"
    
    # Find insertion point - before </body> or before other monitoring scripts
    # Pattern 1: Before analytics or similar scripts
    pattern1 = r'(<script\s+src=["\']js/(analytics|error-handler)\.js["\'])'
    
    if re.search(pattern1, content):
        content = re.sub(
            pattern1,
            r'<script src="js/performance-monitor.js"></script>\n    \1',
            content,
            count=1
        )
    else:
        # Pattern 2: Before </body>
        pattern2 = r'(</body>)'
        if re.search(pattern2, content):
            content = re.sub(
                pattern2,
                '    <script src="js/performance-monitor.js"></script>\n\1',
                content,
                count=1
            )
        else:
            return False, "Could not find insertion point"
    
    original = content
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, "Added"
    
    return False, "No changes needed"

def main():
    print("=" * 80)
    print("📊 ADDING PERFORMANCE MONITOR")
    print("=" * 80)
    print()
    
    files_to_update = []
    
    # Add key pages
    for page in KEY_PAGES:
        if Path(page).exists():
            files_to_update.append(Path(page))
    
    # Add assessment pages
    for pattern in ASSESSMENT_PATTERNS:
        for file in Path('.').glob(pattern):
            if any(skip in str(file) for skip in ['node_modules', '.git', 'react-app']):
                continue
            if file not in files_to_update:
                files_to_update.append(file)
    
    files_to_update.sort()
    
    print(f"Found {len(files_to_update)} files to update\n")
    
    updated = 0
    skipped = 0
    errors = 0
    
    for filepath in files_to_update:
        print(f"📝 {filepath.name}...")
        try:
            success, message = add_performance_monitor(filepath)
            if success:
                updated += 1
                print(f"  ✅ {message}")
            else:
                skipped += 1
                print(f"  ⏭️  {message}")
        except Exception as e:
            errors += 1
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(files_to_update)}")
    print(f"⏭️  Skipped: {skipped}")
    print(f"❌ Errors: {errors}")
    print("=" * 80)

if __name__ == '__main__':
    main()

