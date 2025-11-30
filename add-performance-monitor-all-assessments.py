#!/usr/bin/env python3
"""
Add performance monitor to all assessment pages
"""

from pathlib import Path
import re

def add_performance_monitor(filepath):
    """Add performance monitor script before </body>"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already added
    if 'js/performance-monitor.js' in content:
        return False, "Already added"
    
    # Add before </body>
    pattern = r'(</body>)'
    if re.search(pattern, content):
        content = re.sub(
            pattern,
            '    <script src="js/performance-monitor.js"></script>\n\1',
            content,
            count=1
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, "Added"
    
    return False, "Could not find </body>"

def main():
    print("=" * 80)
    print("📊 ADDING PERFORMANCE MONITOR TO ASSESSMENTS")
    print("=" * 80)
    print()
    
    # Find all assessment pages
    assessment_files = []
    patterns = ['*-belt-assessment.html', 'belt-assessment*.html']
    
    for pattern in patterns:
        for file in Path('.').glob(pattern):
            if any(skip in str(file) for skip in ['node_modules', '.git', 'react-app']):
                continue
            if file not in assessment_files:
                assessment_files.append(file)
    
    assessment_files.sort()
    
    print(f"Found {len(assessment_files)} assessment files\n")
    
    updated = 0
    skipped = 0
    
    for filepath in assessment_files:
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
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(assessment_files)}")
    print(f"⏭️  Skipped: {skipped}")
    print("=" * 80)

if __name__ == '__main__':
    main()

