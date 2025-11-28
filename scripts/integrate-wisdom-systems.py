#!/usr/bin/env python3
"""
Integrate Wisdom Tracker & Hub Unlock Systems into all main HTML pages
"""

import os
import re

# Script to add before closing </body> tag
WISDOM_INTEGRATION_SCRIPT = '''
<!-- Wisdom Tracker & Hub Unlock Systems -->
<script src="js/wisdom-tracker.js" defer></script>
<script src="js/hub-unlock-system.js" defer></script>
<script src="js/progress-sync-init.js" defer></script>

<!-- Initialize Systems -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize Wisdom Tracker
    if (typeof WisdomTracker !== 'undefined') {
      WisdomTracker.init();
      console.log('✅ Wisdom Tracker initialized');
    }
    
    // Initialize Hub Unlock System  
    if (typeof HubUnlockSystem !== 'undefined') {
      HubUnlockSystem.init();
      console.log('✅ Hub Unlock System initialized');
    }
  });
</script>
'''

# Files to update (critical pages only)
FILES_TO_UPDATE = [
    'index-DUAL-ENTRY.html',
    'index-DUAL-ENTRY-de.html',
    'gym-dashboard.html',
    'gym-dashboard-de.html',
    'learning-hub.html',
    'learning-hub-de.html',
    'assessment-belt-landing.html',
    'assessment-belt-questions.html',
    'assessment-belt-results.html',
    'business-portal.html',
    'invite-team.html',
    'profile-backup.html'
]

def integrate_wisdom_system(filepath):
    """Add wisdom system integration to an HTML file"""
    
    if not os.path.exists(filepath):
        print(f"  ⚠️  {filepath} not found - skipping")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already integrated
    if 'wisdom-tracker.js' in content:
        print(f"  ✅ {filepath} - Already integrated")
        return True
    
    # Find </body> tag and insert before it
    if '</body>' in content:
        content = content.replace('</body>', WISDOM_INTEGRATION_SCRIPT + '\n</body>')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✅ {filepath} - Wisdom systems integrated")
        return True
    else:
        print(f"  ❌ {filepath} - No </body> tag found")
        return False

def main():
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print("🔧 INTEGRATING WISDOM TRACKER & HUB UNLOCK SYSTEMS")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print()
    
    success_count = 0
    for filepath in FILES_TO_UPDATE:
        if integrate_wisdom_system(filepath):
            success_count += 1
    
    print()
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"✅ INTEGRATION COMPLETE: {success_count}/{len(FILES_TO_UPDATE)} files updated")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

if __name__ == '__main__':
    main()
