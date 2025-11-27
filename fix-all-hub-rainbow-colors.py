#!/usr/bin/env python3
"""
COMPREHENSIVE FIX: Remove ALL rainbow colors from Hub course modules
Replace with professional dark navy + muted blue palette
"""

import os
import re

# Professional color palette (ONLY these colors allowed)
PROFESSIONAL_COLORS = {
    'background': '#252940',
    'nav_bg': '#1a1d2e',
    'card_bg': '#2d3548',
    'border': '#3d4466',
    'accent': '#4a7c9c',
    'accent_hover': '#5a8cac',
    'text_primary': '#ffffff',
    'text_secondary': '#94a3b8',
    'text_muted': '#64748b'
}

# Rainbow colors to REMOVE (map to professional replacements)
RAINBOW_TO_PROFESSIONAL = {
    # Purple
    '#a855f7': '#4a7c9c',
    '#7c3aed': '#4a7c9c',
    'rgb(168, 85, 247)': 'rgb(74, 124, 156)',
    
    # Pink
    '#ec4899': '#4a7c9c',
    'rgb(236, 72, 153)': 'rgb(74, 124, 156)',
    
    # Teal/Cyan
    '#14b8a6': '#4a7c9c',
    '#06b6d4': '#4a7c9c',
    
    # Green
    '#10b981': '#4a7c9c',
    '#22c55e': '#4a7c9c',
    
    # Bright Blue
    '#3b82f6': '#4a7c9c',
    '#2563eb': '#4a7c9c',
    
    # Orange (except for specific use cases)
    '#f97316': '#4a7c9c',
}

def fix_rainbow_colors(file_path):
    """Remove rainbow colors from a file and replace with professional palette"""
    print(f"\n🎨 Fixing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Replace rainbow colors with professional colors
    for rainbow, professional in RAINBOW_TO_PROFESSIONAL.items():
        if rainbow in content:
            count = content.count(rainbow)
            content = content.replace(rainbow, professional)
            print(f"  ✅ Replaced {count}x {rainbow} → {professional}")
    
    # Check if any changes were made
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  💾 Saved changes to {file_path}")
        return True
    else:
        print(f"  ℹ️  No rainbow colors found (already professional)")
        return False

def verify_no_rainbow(file_path):
    """Verify file has no rainbow colors remaining"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    found_colors = []
    for rainbow in RAINBOW_TO_PROFESSIONAL.keys():
        if rainbow in content:
            found_colors.append(rainbow)
    
    return found_colors

def main():
    """Fix all Hub course module files"""
    print("🚨 FIXING ALL HUB COURSE RAINBOW COLORS")
    print("=" * 60)
    
    # Files to fix (the -gamified.html versions that Hub links to)
    files_to_fix = [
        'energy-management-module-gamified.html',
        'boundaries-module-gamified.html',
        'deep-work-module-gamified.html',
        'feedback-module-gamified.html',
        'expectation-management-module-gamified.html',
        'communication-mastery-module.html',  # No gamified version
    ]
    
    fixed_count = 0
    
    for filename in files_to_fix:
        if os.path.exists(filename):
            changed = fix_rainbow_colors(filename)
            if changed:
                fixed_count += 1
        else:
            print(f"\n⚠️  {filename} not found (skipping)")
    
    print("\n" + "=" * 60)
    print("🔍 VERIFICATION PHASE")
    print("=" * 60)
    
    all_clean = True
    for filename in files_to_fix:
        if os.path.exists(filename):
            remaining = verify_no_rainbow(filename)
            if remaining:
                print(f"\n❌ {filename} STILL HAS RAINBOW COLORS:")
                for color in remaining:
                    print(f"   - {color}")
                all_clean = False
            else:
                print(f"\n✅ {filename} - Professional colors only")
    
    print("\n" + "=" * 60)
    if all_clean:
        print("✅ ALL FILES FIXED - NO RAINBOW COLORS REMAIN!")
    else:
        print("⚠️  Some files still have rainbow colors - manual fix needed")
    
    print(f"\nFiles fixed: {fixed_count}/{len(files_to_fix)}")
    print("\nProfessional palette applied:")
    print("  - Background: #252940")
    print("  - Cards: #2d3548")
    print("  - Accent: #4a7c9c")
    print("  - NO rainbow colors!")

if __name__ == '__main__':
    main()

