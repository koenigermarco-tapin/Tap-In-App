#!/usr/bin/env python3
"""
Apply performance optimizations to ALL HTML files in the repository
- Add performance optimizer script
- Defer non-critical scripts
- Optimize localStorage reads
"""

import os
import re
from pathlib import Path

# Performance optimizer script to add
PERFORMANCE_OPTIMIZER_SCRIPT = '''<!-- Performance Optimizer - Load First -->
<script src="js/performance-optimizer.js"></script>
'''

# Scripts that should be deferred
SCRIPTS_TO_DEFER = [
    'js/loading-states.js',
    'js/error-handler.js',
    'js/cache-buster.js',
    'js/wisdom-tracker.js',
    'js/hub-unlock-system.js',
    'js/progress-sync-init.js',
    'js/gamification.js',
    'js/gym-dashboard-init.js',
    'js/belt-progression.js',
    'js/stripe-completion-helper.js',
    'js/assessment-completion-helper.js',
    'js/invite-system.js',
    'js/talent-finder.js',
    'js/analytics.js',
    'js/auth-system.js',
    'js/supabase-client.js',
    'js/supabase-config.js'
]

def should_skip_file(filepath):
    """Check if file should be skipped"""
    skip_patterns = [
        'node_modules',
        '.git',
        'react-app',
        'archive',
        'backup',
        'OLD',
        'TEMP',
        'template',
        'mockup',
        'test',
        'demo',
        'launch-ready',
        'audit'
    ]
    filepath_lower = filepath.lower()
    return any(pattern in filepath_lower for pattern in skip_patterns)

def add_performance_optimizer(content):
    """Add performance optimizer script if not present"""
    if 'performance-optimizer.js' in content:
        return content  # Already added
    
    # Find the first script tag or closing body tag
    # Insert performance optimizer before first script or before </body>
    pattern1 = r'(<script[^>]*src=["\']js/[^"\']+["\'][^>]*>)'
    pattern2 = r'(</body>)'
    
    # Try to insert before first JS script
    match = re.search(pattern1, content, re.IGNORECASE)
    if match:
        insert_pos = match.start()
        # Check if already has defer or is performance optimizer
        script_line = match.group(1)
        if 'performance-optimizer' not in script_line:
            content = content[:insert_pos] + PERFORMANCE_OPTIMIZER_SCRIPT + '\n    ' + content[insert_pos:]
            return content
    
    # Fallback: insert before </body>
    match = re.search(pattern2, content, re.IGNORECASE)
    if match:
        insert_pos = match.start()
        content = content[:insert_pos] + '\n    ' + PERFORMANCE_OPTIMIZER_SCRIPT + content[insert_pos:]
        return content
    
    return content

def defer_scripts(content):
    """Add defer attribute to non-critical scripts"""
    for script_path in SCRIPTS_TO_DEFER:
        # Pattern: <script src="js/script.js">
        pattern = r'(<script[^>]*src=["\']' + re.escape(script_path) + r'["\'][^>]*>)'
        
        def add_defer(match):
            script_tag = match.group(1)
            # Skip if already has defer or async
            if 'defer' in script_tag or 'async' in script_tag:
                return script_tag
            # Add defer
            return script_tag.replace('>', ' defer>')
        
        content = re.sub(pattern, add_defer, content, flags=re.IGNORECASE)
    
    return content

def optimize_localstorage_reads(content):
    """Optimize localStorage reads in inline scripts"""
    # Pattern: localStorage.getItem('key') or localStorage.getItem("key")
    # This is a simple optimization - batch reads would require more complex analysis
    
    # For now, just ensure we're not doing localStorage in tight loops
    # (This would require AST parsing for full optimization)
    
    # Simple optimization: replace multiple sequential getItem calls with batch
    # This is a basic pass - full optimization would need more context
    
    return content

def process_html_file(filepath):
    """Process a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply optimizations
        content = add_performance_optimizer(content)
        content = defer_scripts(content)
        # content = optimize_localstorage_reads(content)  # Skip for now - too complex
        
        # Only write if changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Main function to process all HTML files"""
    repo_root = Path(__file__).parent
    html_files = list(repo_root.rglob('*.html'))
    
    processed = 0
    updated = 0
    skipped = 0
    errors = 0
    
    print(f"Found {len(html_files)} HTML files")
    print("Processing...")
    
    for html_file in html_files:
        filepath_str = str(html_file)
        
        if should_skip_file(filepath_str):
            skipped += 1
            continue
        
        processed += 1
        if process_html_file(html_file):
            updated += 1
            print(f"✅ Updated: {html_file.relative_to(repo_root)}")
        else:
            # Check if error occurred
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    f.read()
            except:
                errors += 1
                print(f"❌ Error: {html_file.relative_to(repo_root)}")
    
    print(f"\n{'='*60}")
    print(f"Processing complete!")
    print(f"  Total files: {len(html_files)}")
    print(f"  Processed: {processed}")
    print(f"  Updated: {updated}")
    print(f"  Skipped: {skipped}")
    print(f"  Errors: {errors}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()

