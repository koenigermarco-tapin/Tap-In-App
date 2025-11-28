#!/usr/bin/env python3
"""
EMERGENCY FIX: Replace ALL gradient rainbow colors with professional gradient
This fixes the ACTUAL rainbow problem Marco is seeing (gradients, not solid colors)
"""

import os
import re
import glob

# Rainbow gradient colors to replace (these are what Marco sees in screenshot)
RAINBOW_GRADIENTS = {
    '#667eea': '#4a7c9c',  # Purple → Muted blue
    '#764ba2': '#3d6680',  # Dark purple → Dark muted blue
    '#f093fb': '#4a7c9c',  # Pink → Muted blue
    '#f5576c': '#3d6680',  # Dark pink → Dark muted blue
    '#4facfe': '#4a7c9c',  # Cyan → Muted blue
    '#00f2fe': '#3d6680',  # Bright cyan → Dark muted blue
    '#43e97b': '#4a7c9c',  # Green → Muted blue
    '#38f9d7': '#3d6680',  # Turquoise → Dark muted blue
}

def fix_gradients_in_file(file_path):
    """Replace gradient rainbow colors in a file"""
    print(f"\n🎨 Checking: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes_made = 0
    
    # Replace each rainbow gradient color
    for rainbow, professional in RAINBOW_GRADIENTS.items():
        if rainbow in content:
            count = content.count(rainbow)
            content = content.replace(rainbow, professional)
            changes_made += count
            print(f"  ✅ Replaced {count}x {rainbow} → {professional}")
    
    # Save if changes were made
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  💾 Saved {changes_made} changes")
        return True
    else:
        print(f"  ℹ️  No gradient rainbows found")
        return False

def main():
    """Fix ALL HTML files with gradient rainbows"""
    print("🚨 FIXING ALL GRADIENT RAINBOW COLORS")
    print("=" * 60)
    print("Targeting gradients Marco saw in screenshot:")
    print("  - Purple gradient (Energy Fundamentals)")
    print("  - Pink gradient (Recovery Techniques)")
    print("  - Cyan gradient (Energy Rhythm)")
    print("  - Green gradient (Energy Protection)")
    print("=" * 60)
    
    # Get all HTML files
    html_files = glob.glob('*.html')
    
    fixed_count = 0
    skipped_count = 0
    
    for file_path in sorted(html_files):
        changed = fix_gradients_in_file(file_path)
        if changed:
            fixed_count += 1
        else:
            skipped_count += 1
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETE!")
    print(f"  Files fixed: {fixed_count}")
    print(f"  Files skipped (no gradients): {skipped_count}")
    print(f"  Total files checked: {len(html_files)}")
    
    # Verify key files
    print("\n" + "=" * 60)
    print("🔍 VERIFYING KEY FILES:")
    print("=" * 60)
    
    key_files = [
        'energy-management-module-gamified.html',
        'boundaries-module-gamified.html',
        'deep-work-module-gamified.html',
        'feedback-module-gamified.html',
        'expectation-management-module-gamified.html',
    ]
    
    all_clean = True
    for filename in key_files:
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            found_rainbow = []
            for rainbow in RAINBOW_GRADIENTS.keys():
                if rainbow in content:
                    found_rainbow.append(rainbow)
            
            if found_rainbow:
                print(f"\n❌ {filename} STILL HAS GRADIENTS:")
                for color in found_rainbow:
                    print(f"   - {color}")
                all_clean = False
            else:
                print(f"\n✅ {filename} - No gradient rainbows")
    
    print("\n" + "=" * 60)
    if all_clean:
        print("✅ ALL KEY FILES CLEAN - NO GRADIENT RAINBOWS!")
    else:
        print("⚠️  Some files still have gradient rainbows")

if __name__ == '__main__':
    main()

