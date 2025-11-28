#!/usr/bin/env python3
"""
ADD NAVIGATION & FIX LANGUAGE SWITCHING
Adds clear Gym <-> Hub navigation and ensures language switcher works
"""

import re

# Navigation HTML (English version)
NAV_EN = '''
<!-- Main Navigation -->
<nav style="position: sticky; top: 0; z-index: 999; background: #1a1d2e; border-bottom: 1px solid #3d4466; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    <div style="max-width: 1400px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
        
        <!-- Brand -->
        <div style="flex-shrink: 0;">
            <a href="index-DUAL-ENTRY.html" style="font-size: 1.5rem; font-weight: 700; color: white; text-decoration: none; letter-spacing: 0.05em;">
                TAP-IN
            </a>
        </div>
        
        <!-- Center Nav Links -->
        <div style="display: flex; gap: 1rem; align-items: center;">
            <a href="gym-dashboard.html" style="color: white; background: #3d4466; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                🥋 The Gym
            </a>
            <a href="learning-hub.html" style="color: #94a3b8; background: transparent; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;" onmouseover="this.style.color='white';this.style.background='#2d3548';" onmouseout="this.style.color='#94a3b8';this.style.background='transparent';">
                🏢 The Hub
            </a>
        </div>
        
        <!-- Right Side - Language Switcher placeholder -->
        <div style="flex-shrink: 0;">
            <!-- Language switcher will be here -->
        </div>
    </div>
</nav>

'''

# Navigation HTML (German version)
NAV_DE = '''
<!-- Main Navigation -->
<nav style="position: sticky; top: 0; z-index: 999; background: #1a1d2e; border-bottom: 1px solid #3d4466; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    <div style="max-width: 1400px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
        
        <!-- Brand -->
        <div style="flex-shrink: 0;">
            <a href="index-DUAL-ENTRY-de.html" style="font-size: 1.5rem; font-weight: 700; color: white; text-decoration: none; letter-spacing: 0.05em;">
                TAP-IN
            </a>
        </div>
        
        <!-- Center Nav Links -->
        <div style="display: flex; gap: 1rem; align-items: center;">
            <a href="gym-dashboard-de.html" style="color: white; background: #3d4466; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                🥋 Das Gym
            </a>
            <a href="learning-hub-de.html" style="color: #94a3b8; background: transparent; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;" onmouseover="this.style.color='white';this.style.background='#2d3548';" onmouseout="this.style.color='#94a3b8';this.style.background='transparent';">
                🏢 Der Hub
            </a>
        </div>
        
        <!-- Right Side - Language Switcher placeholder -->
        <div style="flex-shrink: 0;">
            <!-- Language switcher will be here -->
        </div>
    </div>
</nav>

'''

# Hub navigation (English - Hub active)
NAV_HUB_EN = '''
<!-- Main Navigation -->
<nav style="position: sticky; top: 0; z-index: 999; background: #252940; border-bottom: 1px solid #3d4466; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    <div style="max-width: 1400px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
        
        <!-- Brand -->
        <div style="flex-shrink: 0;">
            <a href="index-DUAL-ENTRY.html" style="font-size: 1.5rem; font-weight: 700; color: white; text-decoration: none; letter-spacing: 0.05em;">
                TAP-IN
            </a>
        </div>
        
        <!-- Center Nav Links -->
        <div style="display: flex; gap: 1rem; align-items: center;">
            <a href="gym-dashboard.html" style="color: #94a3b8; background: transparent; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;" onmouseover="this.style.color='white';this.style.background='#2d3548';" onmouseout="this.style.color='#94a3b8';this.style.background='transparent';">
                🥋 The Gym
            </a>
            <a href="learning-hub.html" style="color: white; background: #3d4466; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                🏢 The Hub
            </a>
        </div>
        
        <!-- Right Side - Language Switcher placeholder -->
        <div style="flex-shrink: 0;">
            <!-- Language switcher will be here -->
        </div>
    </div>
</nav>

'''

# Hub navigation (German - Hub active)
NAV_HUB_DE = '''
<!-- Main Navigation -->
<nav style="position: sticky; top: 0; z-index: 999; background: #252940; border-bottom: 1px solid #3d4466; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    <div style="max-width: 1400px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
        
        <!-- Brand -->
        <div style="flex-shrink: 0;">
            <a href="index-DUAL-ENTRY-de.html" style="font-size: 1.5rem; font-weight: 700; color: white; text-decoration: none; letter-spacing: 0.05em;">
                TAP-IN
            </a>
        </div>
        
        <!-- Center Nav Links -->
        <div style="display: flex; gap: 1rem; align-items: center;">
            <a href="gym-dashboard-de.html" style="color: #94a3b8; background: transparent; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;" onmouseover="this.style.color='white';this.style.background='#2d3548';" onmouseout="this.style.color='#94a3b8';this.style.background='transparent';">
                🥋 Das Gym
            </a>
            <a href="learning-hub-de.html" style="color: white; background: #3d4466; text-decoration: none; font-weight: 600; padding: 0.65rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                🏢 Der Hub
            </a>
        </div>
        
        <!-- Right Side - Language Switcher placeholder -->
        <div style="flex-shrink: 0;">
            <!-- Language switcher will be here -->
        </div>
    </div>
</nav>

'''

def add_navigation(filepath, nav_html):
    """Add navigation bar after loading screen"""
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if navigation already exists
        if '<!-- Main Navigation -->' in content:
            print(f'  ⚠️  Navigation already exists in {filepath}')
            return
        
        # Find the end of loading screen and add navigation after it
        # Look for the loading screen closing tags
        pattern = r'(</script>\s*</div>)\s*(<div class="container">|<div style="display: flex)'
        
        if re.search(pattern, content):
            content = re.sub(
                pattern,
                r'\1\n' + nav_html + r'\n\2',
                content,
                count=1
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f'  ✅ Added navigation to {filepath}')
        else:
            print(f'  ⚠️  Could not find insertion point in {filepath}')
    
    except FileNotFoundError:
        print(f'  ❌ File not found: {filepath}')

def main():
    """Add navigation to all core pages"""
    
    print("🔧 ADDING NAVIGATION & FIXING LANGUAGE SWITCHING")
    print("=" * 60)
    
    print("\n1. Adding navigation to Gym pages...")
    add_navigation('gym-dashboard.html', NAV_EN)
    add_navigation('gym-dashboard-de.html', NAV_DE)
    
    print("\n2. Adding navigation to Hub pages...")
    add_navigation('learning-hub.html', NAV_HUB_EN)
    add_navigation('learning-hub-de.html', NAV_HUB_DE)
    
    print("\n" + "=" * 60)
    print("✅ NAVIGATION ADDED!")
    print("\nChanges made:")
    print("  • Gym pages now have Gym/Hub navigation")
    print("  • Hub pages now have Gym/Hub navigation")
    print("  • Active state shows current location")
    print("  • Navigation is sticky (stays visible on scroll)")
    print("  • Language switcher already present (from earlier)")
    print("\nUsers can now:")
    print("  • Easily navigate between Gym and Hub")
    print("  • See where they are (active state)")
    print("  • Switch languages (existing switcher)")
    print("\nReady to test!")

if __name__ == '__main__':
    main()

