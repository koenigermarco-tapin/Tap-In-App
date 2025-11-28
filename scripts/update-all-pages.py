#!/usr/bin/env python3
import os

# Script tags to add
SCRIPTS = '''
<script src="js/loading-states.js"></script>
<script src="js/error-handler.js"></script>'''

# Files to update
FILES = [
    'index-DUAL-ENTRY.html',
    'index-DUAL-ENTRY-de.html',
    'gym-dashboard.html',
    'gym-dashboard-de.html',
    'learning-hub.html',
    'learning-hub-de.html',
    'assessment-belt-landing.html',
    'business-portal.html',
    'invite-team.html'
]

updated = 0
for filepath in FILES:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add scripts if not already present
    if 'loading-states.js' not in content and '</body>' in content:
        content = content.replace('</body>', SCRIPTS + '\n</body>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {filepath} - Scripts added")
        updated += 1
    else:
        print(f"⚠️  {filepath} - Already has scripts or no </body>")

print(f"\n✅ Updated {updated}/{len(FILES)} files with loading & error scripts")
