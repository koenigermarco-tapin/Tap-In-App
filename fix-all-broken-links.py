#!/usr/bin/env python3
"""
TAP-IN Complete Link & Path Fixer
Fixes all broken links, corrupted paths, and naming inconsistencies

Run: python3 fix-all-broken-links.py
"""

import os
import re
from pathlib import Path

class LinkFixer:
    def __init__(self, base_path='src/pages'):
        self.base_path = base_path
        self.fixes_made = 0
        self.files_fixed = []
        
    def fix_duplicated_paths(self, content):
        """Fix paths where filename is duplicated (e.g., beltbelt)"""
        replacements = [
            # Belt duplications
            (r'purple-beltpurple-belt', 'purple-belt'),
            (r'brown-beltbrown-belt', 'brown-belt'),
            (r'black-beltblack-belt', 'black-belt'),
            (r'white-beltwhite-belt', 'white-belt'),
            (r'blue-beltblue-belt', 'blue-belt'),
            
            # Assessment duplications
            (r'worker-type-assessmentworker-type-assessment', 'worker-type-assessment'),
            (r'team-assessmentteam-assessment', 'team-assessment'),
            (r'deep-dive-assessmentdeep-dive-assessment', 'deep-dive-assessment'),
            (r'belt-assessmentbelt-assessment', 'belt-assessment'),
            
            # Hub duplications
            (r'hub-hub-home', 'hub-home'),
            (r'team-team-profile', 'team-profile'),
            (r'team-team-composition', 'team-composition'),
            (r'team-team-dynamics', 'team-dynamics'),
            (r'team-team-dashboard', 'team-dashboard'),
            
            # Gym duplications  
            (r'gym-dashboardgym-dashboard', 'gym-dashboard'),
            (r'gym-homegym-home', 'gym-home'),
            
            # Generic catch-all patterns (be careful with these)
            (r'open-matopen-mat', 'open-mat'),
        ]
        
        original = content
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        
        return content, content != original
    
    def fix_german_naming(self, content):
        """Standardize German file naming from .de.html to -de.html in links"""
        original = content
        
        # Fix href links - .de.html → -de.html
        content = re.sub(
            r'href="([^"]*?)\.de\.html"',
            r'href="\1-de.html"',
            content
        )
        
        # Fix onclick/window.location - .de.html → -de.html
        content = re.sub(
            r"window\.location\.href\s*=\s*'([^']*?)\.de\.html'",
            r"window.location.href='\1-de.html'",
            content
        )
        
        return content, content != original
    
    def fix_relative_paths(self, content, filepath):
        """Fix relative path issues (e.g., assessments linking to gym)"""
        original = content
        
        # If we're in assessments folder, fix gym-dashboard paths
        if '/assessments/' in filepath:
            # href="gym-dashboard.html" → href="../gym/gym-dashboard.html"
            content = re.sub(
                r'href="gym-dashboard\.html"',
                'href="../gym/gym-dashboard.html"',
                content
            )
            content = re.sub(
                r'href="gym-dashboard-de\.html"',
                'href="../gym/gym-dashboard-de.html"',
                content
            )
            # onclick versions
            content = re.sub(
                r"window\.location\.href\s*=\s*'gym-dashboard\.html'",
                "window.location.href='../gym/gym-dashboard.html'",
                content
            )
        
        # If we're in courses folder, fix hub paths
        if '/courses/' in filepath:
            # Fix any absolute paths that are wrong
            content = re.sub(
                r'/src/pages/hub/hub-home',
                '/src/pages/hub/hub-home',
                content
            )
        
        return content, content != original
    
    def fix_language_switcher_links(self, content, filepath):
        """Fix language switcher pointing to wrong file"""
        original = content
        
        # Get the filename
        filename = os.path.basename(filepath)
        
        # If this is an English file, check if DE link points to correct -de.html version
        if not filename.endswith('-de.html') and not filename.endswith('.de.html'):
            base_name = filename.replace('.html', '')
            
            # Fix link to German version
            wrong_de_patterns = [
                (rf'href="{base_name}\.de\.html"', f'href="{base_name}-de.html"'),
            ]
            
            for pattern, replacement in wrong_de_patterns:
                content = re.sub(pattern, replacement, content)
        
        return content, content != original
    
    def fix_file(self, filepath):
        """Apply all fixes to a single file"""
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {filepath}: {e}")
            return False
        
        original_content = content
        any_changes = False
        
        # Apply all fix functions
        content, changed = self.fix_duplicated_paths(content)
        any_changes = any_changes or changed
        
        content, changed = self.fix_german_naming(content)
        any_changes = any_changes or changed
        
        content, changed = self.fix_relative_paths(content, filepath)
        any_changes = any_changes or changed
        
        content, changed = self.fix_language_switcher_links(content, filepath)
        any_changes = any_changes or changed
        
        # Write back if changes were made
        if any_changes:
            try:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                self.files_fixed.append(filepath)
                return True
            except Exception as e:
                print(f"Error writing {filepath}: {e}")
                return False
        
        return False
    
    def rename_german_files(self):
        """Rename .de.html files to -de.html"""
        renamed = []
        for root, dirs, files in os.walk(self.base_path):
            for file in files:
                if file.endswith('.de.html'):
                    old_path = os.path.join(root, file)
                    new_name = file.replace('.de.html', '-de.html')
                    new_path = os.path.join(root, new_name)
                    
                    # Check if target already exists
                    if os.path.exists(new_path):
                        print(f"Warning: {new_path} already exists, skipping rename of {old_path}")
                        continue
                    
                    try:
                        os.rename(old_path, new_path)
                        renamed.append((old_path, new_path))
                        print(f"Renamed: {file} → {new_name}")
                    except Exception as e:
                        print(f"Error renaming {old_path}: {e}")
        
        return renamed
    
    def run(self, rename_files=False):
        """Run all fixes"""
        print("="*60)
        print("TAP-IN Link Fixer - Starting...")
        print("="*60)
        
        # Step 1: Optionally rename German files
        if rename_files:
            print("\n[Phase 1] Renaming .de.html files to -de.html...")
            renamed = self.rename_german_files()
            print(f"Renamed {len(renamed)} files")
        
        # Step 2: Fix links in all HTML files
        print("\n[Phase 2] Fixing links in HTML files...")
        for root, dirs, files in os.walk(self.base_path):
            for file in files:
                if file.endswith('.html'):
                    filepath = os.path.join(root, file)
                    if self.fix_file(filepath):
                        print(f"Fixed: {filepath}")
        
        # Summary
        print("\n" + "="*60)
        print("SUMMARY")
        print("="*60)
        print(f"Files fixed: {len(self.files_fixed)}")
        
        return self.files_fixed


def verify_fixes():
    """Verify that fixes were successful"""
    print("\n" + "="*60)
    print("VERIFICATION")
    print("="*60)
    
    issues = []
    
    # Check for remaining duplicated paths
    print("\nChecking for remaining duplicated paths...")
    import subprocess
    result = subprocess.run(
        ['grep', '-rn', 'beltbelt|hub-hub|team-team', 'src/pages/'],
        capture_output=True, text=True
    )
    if result.stdout:
        issues.append("Duplicated paths still exist")
        print(f"⚠️  Found issues:\n{result.stdout[:500]}")
    else:
        print("✅ No duplicated paths found")
    
    # Check for .de.html files
    print("\nChecking for .de.html files that should be -de.html...")
    de_files = list(Path('src/pages').rglob('*.de.html'))
    if de_files:
        issues.append(f"{len(de_files)} .de.html files still exist")
        print(f"⚠️  Found {len(de_files)} .de.html files")
    else:
        print("✅ All German files use -de.html convention")
    
    # Summary
    if issues:
        print(f"\n❌ {len(issues)} issue types remain")
        for issue in issues:
            print(f"   - {issue}")
    else:
        print("\n✅ All checks passed!")
    
    return len(issues) == 0


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Fix TAP-IN broken links')
    parser.add_argument('--rename', action='store_true', 
                       help='Also rename .de.html files to -de.html')
    parser.add_argument('--verify', action='store_true',
                       help='Only verify, do not fix')
    parser.add_argument('--path', default='src/pages',
                       help='Base path to fix (default: src/pages)')
    
    args = parser.parse_args()
    
    if args.verify:
        verify_fixes()
    else:
        fixer = LinkFixer(args.path)
        fixer.run(rename_files=args.rename)
        
        print("\nRun with --verify to check results")
        print("Run with --rename to also rename .de.html files")

