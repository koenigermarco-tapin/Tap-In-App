#!/usr/bin/env python3
"""
EMERGENCY PERFORMANCE FIXES
Applies critical performance optimizations to all HTML files
"""

import os
import re
from pathlib import Path

# Files to optimize
CORE_FILES = [
    'index-DUAL-ENTRY.html',
    'index-DUAL-ENTRY-de.html',
    'gym-dashboard.html',
    'gym-dashboard-de.html',
    'learning-hub.html',
    'learning-hub-de.html',
]

def read_component(filename):
    """Read a component file"""
    path = Path('components') / filename
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def optimize_fonts(html_content):
    """Replace blocking Google Fonts with optimized version"""
    # Remove old font link
    html_content = re.sub(
        r'<link href="https://fonts\.googleapis\.com/css2\?family=Inter[^>]+>',
        '',
        html_content
    )
    
    # Add optimized fonts after <head>
    optimized_fonts = read_component('optimized-fonts.html')
    html_content = html_content.replace(
        '<head>',
        '<head>\n' + optimized_fonts
    )
    
    return html_content

def add_loading_screen(html_content):
    """Add loading screen component"""
    # Check if already has loading screen
    if 'loadingScreen' in html_content:
        print("  ⚠️  Loading screen already present, skipping")
        return html_content
    
    loading_screen = read_component('loading-screen.html')
    
    # Add after <body> tag
    html_content = html_content.replace(
        '<body>',
        '<body>\n' + loading_screen + '\n'
    )
    
    return html_content

def defer_scripts(html_content):
    """Add defer attribute to non-critical scripts"""
    # Add defer to script tags that don't have it
    html_content = re.sub(
        r'<script src="([^"]+\.js)"(?!.*defer)>',
        r'<script src="\1" defer>',
        html_content
    )
    
    return html_content

def add_error_handling(html_content):
    """Add global error handling"""
    error_handler = """
    <script>
    // Global error handler - prevents silent failures
    window.addEventListener('error', function(e) {
        console.error('Resource failed to load:', e.target.src || e.target.href || e.message);
        // Don't break the page, just log
        e.preventDefault();
    });
    
    // Handle promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
    </script>
"""
    
    # Add before </body>
    if 'Global error handler' not in html_content:
        html_content = html_content.replace('</body>', error_handler + '\n</body>')
    
    return html_content

def optimize_file(filepath):
    """Apply all optimizations to a single file"""
    print(f"\n🔧 Optimizing: {filepath}")
    
    # Read file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_size = len(content)
    
    # Apply fixes
    print("  ✅ Optimizing fonts...")
    content = optimize_fonts(content)
    
    print("  ✅ Adding loading screen...")
    content = add_loading_screen(content)
    
    print("  ✅ Deferring scripts...")
    content = defer_scripts(content)
    
    print("  ✅ Adding error handling...")
    content = add_error_handling(content)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_size = len(content)
    size_diff = new_size - original_size
    
    print(f"  ✅ Complete! Size: {original_size} → {new_size} ({size_diff:+d} bytes)")

def main():
    """Main execution"""
    print("🚨 APPLYING EMERGENCY PERFORMANCE FIXES")
    print("=" * 60)
    
    # Optimize core files
    for filename in CORE_FILES:
        if os.path.exists(filename):
            optimize_file(filename)
        else:
            print(f"\n⚠️  File not found: {filename}")
    
    print("\n" + "=" * 60)
    print("✅ PERFORMANCE FIXES APPLIED!")
    print("\nExpected improvements:")
    print("  • Loading state visible immediately")
    print("  • Fonts load without blocking (400-800ms faster)")
    print("  • Scripts don't block render (200-500ms faster)")
    print("  • Error handling prevents silent failures")
    print("\nTotal expected speedup: 1-2 seconds faster")

if __name__ == '__main__':
    main()

