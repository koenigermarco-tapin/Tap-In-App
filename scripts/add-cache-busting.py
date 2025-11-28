#!/usr/bin/env python3
"""
Add cache-busting to all gamified module HTML files
"""

import re
from pathlib import Path

# Files to update (already did coaching-module-gamified.html)
modules = [
    'energy-management-module-gamified.html',
    'feedback-module-gamified.html',
    'deep-work-module-gamified.html',
    'boundaries-module-gamified.html',
    'limiting-beliefs-module-gamified.html',
    'stoic-tools-module-gamified.html',
    'expectation-management-module-gamified.html',
    'active-listening-module-gamified.html',
    'empathy-module-gamified.html',
]

cache_meta_tags = """    <!-- Cache Control Meta Tags -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">"""

cache_buster_code = """
        // ============= CACHE BUSTER =============
        // Update VERSION whenever you deploy changes to force client refresh
        const APP_VERSION = '2024-11-24-v1';
        
        function checkVersion() {
            const cachedVersion = localStorage.getItem('appVersion');
            if (cachedVersion && cachedVersion !== APP_VERSION) {
                console.log(`Version update detected: ${cachedVersion} → ${APP_VERSION}`);
                // Keep module-specific data, only clear version
                localStorage.setItem('appVersion', APP_VERSION);
                // Force a single hard reload
                if (!sessionStorage.getItem('hasReloaded')) {
                    sessionStorage.setItem('hasReloaded', 'true');
                    window.location.reload(true);
                }
            } else {
                localStorage.setItem('appVersion', APP_VERSION);
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            checkVersion();
            initModule();
        });"""

def update_module(filepath):
    """Add cache busting to a module file"""
    print(f"Updating {filepath.name}...")
    
    content = filepath.read_text(encoding='utf-8')
    
    # 1. Add meta tags after viewport (if not already present)
    if 'Cache-Control' not in content:
        content = re.sub(
            r'(<meta name="viewport"[^>]*>)',
            r'\1\n' + cache_meta_tags,
            content
        )
    
    # 2. Replace the DOMContentLoaded listener (if not already updated)
    if 'APP_VERSION' not in content:
        # Find and replace the existing DOMContentLoaded listener
        content = re.sub(
            r"window\.addEventListener\('DOMContentLoaded', initModule\);",
            cache_buster_code,
            content
        )
    
    # Write back
    filepath.write_text(content, encoding='utf-8')
    print(f"✓ Updated {filepath.name}")

def main():
    base_path = Path('/Users/marcok./Downloads/tap-in-netlify-deploy')
    
    for module_file in modules:
        filepath = base_path / module_file
        if filepath.exists():
            update_module(filepath)
        else:
            print(f"⚠ Not found: {module_file}")
    
    print("\n✅ All modules updated with cache-busting!")

if __name__ == '__main__':
    main()
