#!/usr/bin/env python3
"""
Integrate Core Modules Across Remaining Pages
Systematically adds core CSS and JS modules to specified files
"""

from pathlib import Path
import re

# Core CSS to add after Google Fonts
CSS_TO_ADD = '<link rel="stylesheet" href="css/core-styles.css">'

# Scripts for Belt Hub Pages
BELT_HUB_SCRIPTS = """<!-- Core Modules -->
<script src="js/core-gamification.js"></script>
<script src="js/core-progress-tracker.js"></script>
<script src="js/keyboard-nav.js"></script>"""

# Scripts for Belt Assessment Pages
ASSESSMENT_SCRIPTS = """<!-- Core Modules -->
<script src="js/core-gamification.js"></script>
<script src="js/core-progress-tracker.js"></script>
<script src="js/lazy-confetti.js"></script>
<script src="js/keyboard-nav.js"></script>"""

# Scripts for Dashboard
DASHBOARD_SCRIPTS = """<!-- Core Modules -->
<script src="js/core-gamification.js"></script>
<script src="js/core-progress-tracker.js"></script>
<script src="js/storage-manager.js"></script>
<script src="js/keyboard-nav.js"></script>"""

# Scripts for Entry Pages
ENTRY_SCRIPTS = """<!-- Core Modules -->
<script src="js/core-gamification.js"></script>
<script src="js/keyboard-nav.js"></script>"""

# SEO Meta Tags for Entry Pages
SEO_META = """<!-- SEO Meta Tags -->
<meta name="description" content="TAP-IN Leadership - Master leadership skills through martial arts methodology.">
<meta name="keywords" content="leadership training, team building, professional development">
<meta property="og:title" content="TAP-IN Leadership Development">
<meta property="og:description" content="Progress from White to Black Belt in leadership skills.">
<meta property="og:type" content="website">"""

def add_css_after_fonts(content):
    """Add core CSS after Google Fonts link"""
    # Pattern to find Google Fonts link
    fonts_pattern = r'(<link[^>]*fonts\.googleapis\.com[^>]*>)'
    
    if re.search(fonts_pattern, content):
        # Insert CSS after fonts link
        content = re.sub(
            fonts_pattern,
            r'\1\n    ' + CSS_TO_ADD,
            content
        )
        return content, True
    return content, False

def add_scripts_before_body(content, scripts):
    """Add scripts before closing body tag"""
    # Check if scripts already exist
    if 'core-gamification.js' in content:
        return content, False
    
    # Pattern to find </body> and insert before it
    body_pattern = r'(</body>)'
    
    if re.search(body_pattern, content):
        # Insert scripts before </body>
        content = re.sub(
            body_pattern,
            scripts + '\n' + r'\1',
            content
        )
        return content, True
    return content, False

def add_seo_meta(content):
    """Add SEO meta tags after viewport meta"""
    # Check if already added
    if 'og:title' in content:
        return content, False
    
    # Pattern to find viewport meta tag
    viewport_pattern = r'(<meta name="viewport"[^>]*>)'
    
    if re.search(viewport_pattern, content):
        # Insert SEO meta after viewport
        content = re.sub(
            viewport_pattern,
            r'\1\n    ' + SEO_META.replace('\n', '\n    '),
            content
        )
        return content, True
    return content, False

def update_file(filepath, file_type):
    """Update a single file based on type"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changes_made = []
        original_content = content
        
        # Always add CSS after fonts
        content, css_added = add_css_after_fonts(content)
        if css_added:
            changes_made.append('CSS added')
        
        # Add scripts based on file type
        scripts_added = False
        if file_type == 'belt_hub':
            content, scripts_added = add_scripts_before_body(content, BELT_HUB_SCRIPTS)
        elif file_type == 'assessment':
            content, scripts_added = add_scripts_before_body(content, ASSESSMENT_SCRIPTS)
        elif file_type == 'dashboard':
            content, scripts_added = add_scripts_before_body(content, DASHBOARD_SCRIPTS)
        elif file_type == 'entry':
            # Entry pages get scripts and SEO
            content, scripts_added = add_scripts_before_body(content, ENTRY_SCRIPTS)
            content, seo_added = add_seo_meta(content)
            if seo_added:
                changes_made.append('SEO meta added')
        
        if scripts_added:
            changes_made.append('Scripts added')
        
        # Write back if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, changes_made
        else:
            return False, ['No changes needed (already has modules)']
            
    except Exception as e:
        return False, [f'Error: {str(e)}']

def main():
    """Main execution"""
    print("🔧 INTEGRATING CORE MODULES")
    print("=" * 60)
    
    files_to_update = {
        # Belt Hub Pages
        'white-belt.html': 'belt_hub',
        'blue-belt.html': 'belt_hub',
        'purple-belt.html': 'belt_hub',
        'brown-belt.html': 'belt_hub',
        'black-belt.html': 'belt_hub',
        
        # Belt Assessment Pages
        'white-belt-assessment.html': 'assessment',
        'blue-belt-assessment.html': 'assessment',
        'purple-belt-assessment.html': 'assessment',
        'brown-belt-assessment.html': 'assessment',
        'black-belt-assessment.html': 'assessment',
        
        # Dashboard
        'gym-dashboard.html': 'dashboard',
        
        # Entry Pages
        'index.html': 'entry',
        'learning-hub.html': 'entry',
    }
    
    updated_count = 0
    skipped_count = 0
    
    for filename, file_type in files_to_update.items():
        filepath = Path(filename)
        
        if not filepath.exists():
            print(f"⚠️  {filename} - NOT FOUND")
            skipped_count += 1
            continue
        
        print(f"\n📝 {filename} ({file_type})...")
        updated, changes = update_file(filepath, file_type)
        
        if updated:
            print(f"   ✅ Updated: {', '.join(changes)}")
            updated_count += 1
        else:
            if 'Error' in changes[0]:
                print(f"   ❌ {changes[0]}")
            else:
                print(f"   ⏭️  {changes[0]}")
            skipped_count += 1
    
    print(f"\n✅ Integration Complete!")
    print(f"   Updated: {updated_count}/{len(files_to_update)} files")
    print(f"   Skipped: {skipped_count} files")

if __name__ == '__main__':
    main()

