#!/usr/bin/env python3
"""
Add PWA manifest and service worker registration to all main HTML pages
"""

import os
import re

PWA_HEAD_CONTENT = '''
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#4a7c9c">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Tap-In">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
'''

PWA_SW_SCRIPT = '''
<!-- Service Worker Registration -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('✅ Service Worker registered'))
        .catch(err => console.log('❌ SW registration failed:', err));
    });
  }
</script>
'''

FILES_TO_UPDATE = [
    'index-DUAL-ENTRY.html',
    'index-DUAL-ENTRY-de.html',
    'gym-dashboard.html',
    'gym-dashboard-de.html',
    'learning-hub.html',
    'learning-hub-de.html'
]

def integrate_pwa(filepath):
    if not os.path.exists(filepath):
        print(f"  ⚠️  {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already integrated
    if 'manifest.json' in content:
        print(f"  ✅ {filepath} - PWA already integrated")
        return True
    
    # Add PWA manifest to <head>
    if '</head>' in content:
        content = content.replace('</head>', PWA_HEAD_CONTENT + '\n</head>')
    
    # Add SW registration before </body>
    if '</body>' in content:
        content = content.replace('</body>', PWA_SW_SCRIPT + '\n</body>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ {filepath} - PWA integrated")
    return True

def main():
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print("📱 INTEGRATING PWA (MANIFEST + SERVICE WORKER)")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print()
    
    success = 0
    for filepath in FILES_TO_UPDATE:
        if integrate_pwa(filepath):
            success += 1
    
    print()
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"✅ PWA INTEGRATION COMPLETE: {success}/{len(FILES_TO_UPDATE)} files")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

if __name__ == '__main__':
    main()
