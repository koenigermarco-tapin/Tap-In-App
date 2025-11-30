#!/usr/bin/env python3
"""
TAP-IN Platform Components Integration Script
Automatically adds language switcher, meta tags, achievements, and structured data to all HTML pages

Usage:
    python integrate-js-modules.py --dry-run    # Preview changes
    python integrate-js-modules.py              # Apply changes
"""

import re
import sys
from pathlib import Path
from typing import List, Tuple, Set

# Core modules to integrate
CORE_MODULES = [
    'js/language-switcher.js',
    'js/meta-tags-manager.js',
    'js/achievement-badges.js',
    'js/structured-data.js'
]

SCRIPT_COMMENT = '<!-- TAP-IN Core Modules -->'

def find_html_files() -> List[Path]:
    """Find all HTML files in the project"""
    html_files = []
    
    # Find all .html files in root and subdirectories (excluding node_modules, .git, etc.)
    for html_file in Path('.').rglob('*.html'):
        # Skip certain directories
        parts = html_file.parts
        if any(skip in parts for skip in ['node_modules', '.git', '__pycache__', 'venv', '.venv']):
            continue
        html_files.append(html_file)
    
    # Also check root level
    for html_file in Path('.').glob('*.html'):
        if html_file not in html_files:
            html_files.append(html_file)
    
    return sorted(html_files)

def check_modules_already_added(content: str) -> bool:
    """Check if core modules are already added"""
    return 'language-switcher.js' in content and SCRIPT_COMMENT in content

def find_insertion_point(content: str) -> Tuple[int, str]:
    """
    Find where to insert the scripts
    Returns: (insertion_index, tag_found)
    """
    # Try to find </body> first
    body_close_match = re.search(r'(\s*</body>)', content, re.IGNORECASE | re.MULTILINE)
    if body_close_match:
        return body_close_match.start(1), '</body>'
    
    # Fallback to </html>
    html_close_match = re.search(r'(\s*</html>)', content, re.IGNORECASE | re.MULTILINE)
    if html_close_match:
        return html_close_match.start(1), '</html>'
    
    # Last resort: end of file
    return len(content), 'EOF'

def generate_script_tags() -> str:
    """Generate the script tags block"""
    script_tags = '\n'.join([
        f'    <script src="{module}"></script>'
        for module in CORE_MODULES
    ])
    
    return f'\n    {SCRIPT_COMMENT}\n{script_tags}\n'

def process_file(filepath: Path, dry_run: bool = False) -> dict:
    """Process a single HTML file"""
    result = {
        'file': str(filepath),
        'status': 'skipped',
        'reason': '',
        'insertion_point': None
    }
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        result['status'] = 'error'
        result['reason'] = f"Read error: {e}"
        return result
    
    # Check if already has modules
    if check_modules_already_added(content):
        result['status'] = 'skipped'
        result['reason'] = 'Modules already added'
        return result
    
    # Find insertion point
    insertion_idx, tag_found = find_insertion_point(content)
    
    if tag_found == 'EOF':
        result['status'] = 'error'
        result['reason'] = 'Could not find </body> or </html> tag'
        return result
    
    result['insertion_point'] = tag_found
    
    if not dry_run:
        # Generate script tags
        script_tags = generate_script_tags()
        
        # Insert before closing tag
        new_content = (
            content[:insertion_idx] +
            script_tags +
            content[insertion_idx:]
        )
        
        # Write back
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            result['status'] = 'updated'
        except Exception as e:
            result['status'] = 'error'
            result['reason'] = f"Write error: {e}"
            return result
    else:
        result['status'] = 'would_update'
    
    return result

def main():
    """Main integration function"""
    # Check for dry-run flag
    dry_run = '--dry-run' in sys.argv or '-d' in sys.argv
    
    print("🔧 TAP-IN PLATFORM COMPONENTS INTEGRATION")
    print("=" * 60)
    
    if dry_run:
        print("🔍 DRY RUN MODE - No files will be modified\n")
    else:
        print("⚡ APPLYING CHANGES - Files will be modified\n")
    
    # Find all HTML files
    html_files = find_html_files()
    print(f"📄 Found {len(html_files)} HTML files\n")
    
    # Process files
    results = {
        'updated': [],
        'skipped': [],
        'error': [],
        'would_update': []
    }
    
    print("Processing files...")
    for filepath in html_files:
        result = process_file(filepath, dry_run=dry_run)
        results[result['status']].append(result)
        
        # Show progress for important files
        if result['status'] in ['updated', 'would_update']:
            print(f"  ✅ {filepath.name} ({result['insertion_point']})")
        elif result['status'] == 'error':
            print(f"  ⚠️  {filepath.name}: {result['reason']}")
    
    # Summary
    print(f"\n📊 INTEGRATION SUMMARY")
    print("=" * 60)
    
    if dry_run:
        print(f"   Would update: {len(results['would_update'])} files")
        print(f"   Would skip: {len(results['skipped'])} files (already have modules)")
        print(f"   Errors: {len(results['error'])} files")
        print(f"\n💡 Run without --dry-run to apply changes")
    else:
        print(f"   ✅ Updated: {len(results['updated'])} files")
        print(f"   ⏭️  Skipped: {len(results['skipped'])} files (already have modules)")
        print(f"   ⚠️  Errors: {len(results['error'])} files")
        
        if results['error']:
            print(f"\n⚠️  Files with errors:")
            for err in results['error'][:10]:
                print(f"      - {err['file']}: {err['reason']}")
            if len(results['error']) > 10:
                print(f"      ... and {len(results['error']) - 10} more")
    
    print(f"\n📦 Modules to be added:")
    for module in CORE_MODULES:
        print(f"   - {module}")
    
    print(f"\n✅ Integration {'preview complete' if dry_run else 'complete'}!")
    
    if not dry_run and results['updated']:
        print(f"\n🎯 Next steps:")
        print(f"   1. Verify JS files exist in /js/ directory")
        print(f"   2. Test language switcher on a few pages")
        print(f"   3. Check achievement notifications work")
        print(f"   4. Verify Schema.org markup in page source")

if __name__ == '__main__':
    main()

