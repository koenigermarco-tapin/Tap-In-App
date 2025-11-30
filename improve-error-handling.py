#!/usr/bin/env python3
"""
Improve error handling and user feedback
- Replace console.log with user-friendly messages
- Add toast notifications
- Improve form validation feedback
- Add offline state indicators
"""

from pathlib import Path
import re

# Priority files
PRIORITY_FILES = [
    'gym-dashboard.html',
    'index.html',
    'learning-hub.html',
    'belt-assessment-v2.html',
]

def add_toast_system(content):
    """Add toast notification system"""
    
    toast_html = '''<!-- Toast Notification System -->
<div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 10px;"></div>

<script>
(function() {
    'use strict';
    
    window.showToast = function(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.style.cssText = `
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            min-width: 300px;
            max-width: 500px;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
        `;
        
        const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        toast.innerHTML = `<span style="font-size: 1.25rem;">${icon}</span><span>${message}</span>`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };
    
    // Add animations if not present
    if (!document.getElementById('toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
})();
</script>'''
    
    # Check if toast system already exists
    if 'toast-container' in content or 'showToast' in content:
        return content, False
    
    # Insert before </body>
    body_pattern = r'(</body>)'
    if re.search(body_pattern, content):
        content = re.sub(body_pattern, toast_html + '\n\1', content, count=1)
        return content, True
    
    return content, False

def add_offline_indicator(content):
    """Add offline state indicator"""
    
    offline_html = '''<!-- Offline Indicator -->
<div id="offline-indicator" style="position: fixed; top: 0; left: 0; right: 0; background: #ef4444; color: white; padding: 0.75rem; text-align: center; z-index: 10001; display: none; font-weight: 600;">
    ⚠️ You're offline. Some features may not work.
</div>

<script>
(function() {
    'use strict';
    
    const indicator = document.getElementById('offline-indicator');
    if (!indicator) return;
    
    function updateOnlineStatus() {
        if (!navigator.onLine) {
            indicator.style.display = 'block';
            if (typeof showToast === 'function') {
                showToast('You\'re offline. Some features may not work.', 'error', 5000);
            }
        } else {
            indicator.style.display = 'none';
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
})();
</script>'''
    
    # Check if offline indicator already exists
    if 'offline-indicator' in content:
        return content, False
    
    # Insert before </body>
    body_pattern = r'(</body>)'
    if re.search(body_pattern, content):
        content = re.sub(body_pattern, offline_html + '\n\1', content, count=1)
        return content, True
    
    return content, False

def replace_console_errors(content):
    """Replace console.error with user-friendly error messages"""
    
    changes = 0
    
    # Pattern: console.error('message') -> showToast('message', 'error')
    def replace_error(match):
        error_msg = match.group(1)
        # Extract message from quotes
        msg_match = re.search(r'["\']([^"\']+)["\']', error_msg)
        if msg_match:
            user_msg = msg_match.group(1)
            # Make message user-friendly
            if 'error' in user_msg.lower() or 'failed' in user_msg.lower():
                friendly_msg = 'Something went wrong. Please try again.'
            else:
                friendly_msg = user_msg
            
            return f"if(typeof showToast === 'function') {{ showToast('{friendly_msg}', 'error'); }} console.error({error_msg});"
        return match.group(0)
    
    # Find console.error calls
    error_pattern = r'console\.error\(([^)]+)\);'
    new_content = re.sub(error_pattern, replace_error, content)
    
    if new_content != content:
        changes += 1
        content = new_content
    
    return content, changes > 0

def improve_error_handling(filepath):
    """Apply all error handling improvements"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # 1. Add toast system
    content, changed = add_toast_system(content)
    if changed:
        changes.append("Toast notifications added")
    
    # 2. Add offline indicator
    content, changed = add_offline_indicator(content)
    if changed:
        changes.append("Offline indicator added")
    
    # 3. Replace console errors
    content, changed = replace_console_errors(content)
    if changed:
        changes.append("Error messages improved")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def main():
    print("=" * 80)
    print("🛡️  ERROR HANDLING IMPROVEMENTS")
    print("=" * 80)
    print()
    
    files_to_update = []
    for filename in PRIORITY_FILES:
        filepath = Path(filename)
        if filepath.exists():
            files_to_update.append(filepath)
    
    print(f"Found {len(files_to_update)} files to update\n")
    
    updated = 0
    skipped = 0
    
    for filepath in files_to_update:
        print(f"📝 {filepath.name}...")
        try:
            success, changes = improve_error_handling(filepath)
            if success:
                updated += 1
                print(f"  ✅ Updated: {', '.join(changes)}")
            else:
                skipped += 1
                print(f"  ⏭️  Already has error handling")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(files_to_update)}")
    print(f"⏭️  Skipped: {skipped}")
    print("=" * 80)

if __name__ == '__main__':
    main()

