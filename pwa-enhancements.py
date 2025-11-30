#!/usr/bin/env python3
"""
PWA Enhancements
- Add install prompt logic
- Create offline.html fallback page
- Add app shortcuts
- Enhance manifest.json
"""

from pathlib import Path
import json

def create_offline_page():
    """Create offline.html fallback page"""
    
    offline_html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - TAP-IN</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .container {
            text-align: center;
            max-width: 500px;
        }
        
        .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        p {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .button {
            display: inline-block;
            background: white;
            color: #1a365d;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 0.5rem;
            transition: transform 0.2s;
        }
        
        .button:hover {
            transform: scale(1.05);
        }
        
        .button:active {
            transform: scale(0.95);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">📡</div>
        <h1>You're Offline</h1>
        <p>It looks like you've lost your internet connection. Don't worry - you can still access some features!</p>
        <p>Try:</p>
        <ul style="list-style: none; text-align: left; display: inline-block; margin: 1rem 0;">
            <li>• Checking your internet connection</li>
            <li>• Refreshing the page when back online</li>
            <li>• Using cached content that's already available</li>
        </ul>
        <a href="/" class="button">Go Home</a>
        <button onclick="window.location.reload()" class="button">Try Again</button>
    </div>
    
    <script>
        // Check if back online
        window.addEventListener('online', function() {
            window.location.reload();
        });
        
        // Try to reload every 10 seconds
        setInterval(function() {
            if (navigator.onLine) {
                window.location.reload();
            }
        }, 10000);
    </script>
</body>
</html>'''
    
    offline_path = Path('offline.html')
    
    if offline_path.exists():
        return False, "Already exists"
    
    with open(offline_path, 'w', encoding='utf-8') as f:
        f.write(offline_html)
    
    return True, "Created"

def add_install_prompt(filepath):
    """Add PWA install prompt logic"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if install prompt already exists
    if 'beforeinstallprompt' in content or 'PWA install prompt' in content:
        return content, False
    
    install_script = '''<!-- PWA Install Prompt -->
<script>
(function() {
    'use strict';
    
    let deferredPrompt;
    const installButton = document.getElementById('pwa-install-button');
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button if it exists
        if (installButton) {
            installButton.style.display = 'inline-block';
        }
    });
    
    // Handle install button click
    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
                if (typeof showToast === 'function') {
                    showToast('App installed successfully!', 'success');
                }
            }
            
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }
    
    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        if (installButton) {
            installButton.style.display = 'none';
        }
    });
})();
</script>'''
    
    # Insert before </body>
    body_pattern = r'(</body>)'
    if re.search(body_pattern, content):
        content = re.sub(body_pattern, install_script + '\n\1', content, count=1)
        return content, True
    
    return content, False

def enhance_manifest():
    """Enhance manifest.json with shortcuts"""
    
    manifest_path = Path('manifest.json')
    
    if not manifest_path.exists():
        return False, "manifest.json not found"
    
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    
    # Add shortcuts if not present
    if 'shortcuts' not in manifest:
        manifest['shortcuts'] = [
            {
                'name': 'The Gym',
                'short_name': 'Gym',
                'description': 'Open The Gym dashboard',
                'url': '/gym-dashboard.html',
                'icons': [{'src': '/icons/icon-192x192.png', 'sizes': '192x192'}]
            },
            {
                'name': 'The Hub',
                'short_name': 'Hub',
                'description': 'Open The Hub for business training',
                'url': '/learning-hub.html',
                'icons': [{'src': '/icons/icon-192x192.png', 'sizes': '192x192'}]
            },
            {
                'name': 'Belt Assessment',
                'short_name': 'Assessment',
                'description': 'Take the belt level assessment',
                'url': '/belt-assessment-v2.html',
                'icons': [{'src': '/icons/icon-192x192.png', 'sizes': '192x192'}]
            }
        ]
        
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2)
        
        return True, "Shortcuts added"
    
    return False, "Already has shortcuts"

def main():
    print("=" * 80)
    print("📱 PWA ENHANCEMENTS")
    print("=" * 80)
    print()
    
    changes = []
    
    # 1. Create offline page
    print("📝 Creating offline.html...")
    success, msg = create_offline_page()
    if success:
        changes.append("Offline page created")
        print(f"  ✅ {msg}")
    else:
        print(f"  ⏭️  {msg}")
    print()
    
    # 2. Enhance manifest
    print("📝 Enhancing manifest.json...")
    success, msg = enhance_manifest()
    if success:
        changes.append("Manifest shortcuts added")
        print(f"  ✅ {msg}")
    else:
        print(f"  ⏭️  {msg}")
    print()
    
    # 3. Add install prompt to key pages
    print("📝 Adding install prompts...")
    key_pages = ['index.html', 'gym-dashboard.html']
    for page in key_pages:
        filepath = Path(page)
        if filepath.exists():
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content, changed = add_install_prompt(filepath)
            if changed:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                changes.append(f"Install prompt added to {page}")
                print(f"  ✅ {page} - Install prompt added")
            else:
                print(f"  ⏭️  {page} - Already has install prompt")
    
    print()
    print("=" * 80)
    print(f"✅ Changes: {len(changes)}")
    if changes:
        for change in changes:
            print(f"   • {change}")
    print("=" * 80)
    
    print()
    print("💡 Note: Update service worker to cache offline.html")

if __name__ == '__main__':
    import re
    main()

