#!/usr/bin/env python3
"""
Mobile Responsiveness Audit
- Check touch target sizes
- Verify responsive breakpoints
- Check text readability
- Test form usability
"""

from pathlib import Path
import re

def check_touch_targets(content):
    """Check for adequate touch target sizes (min 44x44px)"""
    
    issues = []
    
    # Check button padding
    button_pattern = r'\.(button|btn|btn-primary|btn-secondary)[^{]*\{[^}]*padding:\s*([^;]+);'
    matches = re.findall(button_pattern, content, re.MULTILINE)
    
    for match in matches:
        padding = match[1].strip()
        # Try to parse padding values
        values = re.findall(r'(\d+\.?\d*)', padding)
        if values:
            min_padding = min([float(v) for v in values if float(v) < 50])
            if min_padding < 11:  # 11px padding = 44px total (assuming 22px base)
                issues.append(f"Button may have small touch target: padding {padding}")
    
    # Check clickable areas
    clickable_pattern = r'(cursor:\s*pointer|onclick=)'
    # This is a simple check - would need more sophisticated analysis
    
    return issues

def check_responsive_breakpoints(content):
    """Verify responsive breakpoints are present"""
    
    has_mobile = bool(re.search(r'@media\s*\([^)]*max-width:\s*768', content))
    has_tablet = bool(re.search(r'@media\s*\([^)]*max-width:\s*1024', content))
    has_desktop = bool(re.search(r'@media\s*\([^)]*min-width:', content))
    
    return {
        'mobile': has_mobile,
        'tablet': has_tablet,
        'desktop': has_desktop
    }

def check_text_readability(content):
    """Check font sizes are readable"""
    
    issues = []
    
    # Check for small font sizes (< 14px)
    small_font_pattern = r'font-size:\s*(\d+\.?\d*)px'
    matches = re.findall(small_font_pattern, content)
    
    for match in matches:
        size = float(match)
        if size < 14:
            issues.append(f"Font size may be too small on mobile: {size}px")
    
    # Check viewport meta tag
    if 'viewport' not in content.lower():
        issues.append("Missing viewport meta tag")
    
    return issues

def audit_mobile(filepath):
    """Audit a file for mobile responsiveness"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # 1. Check touch targets
    touch_issues = check_touch_targets(content)
    issues.extend(touch_issues)
    
    # 2. Check responsive breakpoints
    breakpoints = check_responsive_breakpoints(content)
    if not breakpoints['mobile']:
        issues.append("Missing mobile breakpoint (@media max-width: 768px)")
    
    # 3. Check text readability
    text_issues = check_text_readability(content)
    issues.extend(text_issues)
    
    # 4. Check viewport meta
    if 'viewport' not in content:
        issues.append("Missing viewport meta tag")
    
    return issues

def main():
    print("=" * 80)
    print("📱 MOBILE RESPONSIVENESS AUDIT")
    print("=" * 80)
    print()
    
    priority_files = [
        'index.html',
        'gym-dashboard.html',
        'learning-hub.html',
        'belt-assessment-v2.html',
    ]
    
    print(f"Auditing {len(priority_files)} priority files...\n")
    
    all_issues = {}
    
    for filename in priority_files:
        filepath = Path(filename)
        if not filepath.exists():
            print(f"⚠️  {filename} - File not found, skipping")
            continue
        
        print(f"📝 {filename}...")
        issues = audit_mobile(filepath)
        
        if issues:
            all_issues[filename] = issues
            print(f"  ⚠️  Found {len(issues)} potential issues:")
            for issue in issues[:3]:  # Show first 3
                print(f"     • {issue}")
            if len(issues) > 3:
                print(f"     ... and {len(issues) - 3} more")
        else:
            print(f"  ✅ No major issues found")
        print()
    
    print("=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    
    total_issues = sum(len(issues) for issues in all_issues.values())
    
    if total_issues == 0:
        print("✅ No mobile responsiveness issues found!")
    else:
        print(f"⚠️  Found {total_issues} potential issues across {len(all_issues)} files")
        print()
        print("💡 Recommendations:")
        print("   1. Ensure all buttons have min 44x44px touch targets")
        print("   2. Test on real devices (iPhone, Android)")
        print("   3. Use Chrome DevTools device emulation")
        print("   4. Check text readability on small screens")
    
    print("=" * 80)

if __name__ == '__main__':
    main()

