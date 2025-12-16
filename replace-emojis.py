#!/usr/bin/env python3
"""
TAP-IN V10 Emoji Replacement Tool
Replaces all 626 emoji instances with Heroicons

Usage:
    python replace-emojis.py --dry-run  # Preview
    python replace-emojis.py            # Execute
"""

import json
import os
import argparse
from pathlib import Path
from typing import Dict, List

# Target files with their expected emoji counts
# Script will search recursively for these filenames
TARGET_FILES = {
    'mental-health-assessment-de.html': 39,
    'team-assessment-enhanced-v2.html': 34,
    'white-belt-stripe4-gamified.html': 31,
    'blue-belt-stripe2-carousel-NEW.html': 31,
    'purple-belt-stripe1-gamified.html': 31,
    'purple-belt-stripe2-carousel-NEW.html': 31,
    'blue-belt-stripe1-gamified.html': 30,
    'blue-belt-stripe3-carousel-NEW.html': 29,
    'blue-belt-stripe4-carousel-NEW.html': 29,
    'blue-belt-stripe2-gamified.html': 28,
    'blue-belt-stripe3-gamified.html': 28,
    'belt-assessment-de.html': 26,
    'white-belt-stripe1-gamified.html': 24,
    'purple-belt-stripe2-gamified.html': 24,
    'purple-belt-stripe1-carousel-NEW.html': 22,
    'blue-belt-stripe4-gamified.html': 21,
}

class EmojiReplacer:
    def __init__(self, mapping_file: str = 'emoji-to-heroicon-map.json'):
        with open(mapping_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        self.mappings = data['mappings']
        self.special = data.get('special_replacements', {})
        self.stats = {'files_processed': 0, 'files_modified': 0, 'total_replacements': 0}
    
    def get_sprite_path(self, filepath: Path) -> str:
        """Calculate relative path to sprite.svg based on file location"""
        # Count depth from root (e.g., src/pages/gym/file.html = depth 3)
        depth = len(filepath.parts) - 1
        if depth == 0:
            return "icons/sprite.svg#icon-"
        elif depth == 1:
            return "../icons/sprite.svg#icon-"
        elif depth == 2:
            return "../../icons/sprite.svg#icon-"
        elif depth == 3:
            return "../../../icons/sprite.svg#icon-"
        else:
            return "../../../../icons/sprite.svg#icon-"
    
    def extract_icon_name(self, heroicon_template: str) -> str:
        """Extract icon name from template like '#light-bulb' or '#icon-academic-cap'"""
        # Handle formats: '#light-bulb', '#icon-academic-cap', etc.
        if "'#" in heroicon_template:
            icon_part = heroicon_template.split("'#")[1].split("'")[0]
        elif '"#' in heroicon_template:
            icon_part = heroicon_template.split('"#')[1].split('"')[0]
        else:
            return "icon-sparkles"  # default
        
        # Ensure 'icon-' prefix is present (don't double it)
        if icon_part.startswith('icon-'):
            return icon_part
        else:
            return f'icon-{icon_part}'
    
    def replace_in_file(self, filepath: Path, dry_run: bool = True) -> Dict:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            return {'error': f'File not found: {filepath}'}
        
        original_content = content
        replacements = {}
        sprite_path = self.get_sprite_path(filepath)
        
        for emoji, heroicon_template in self.mappings.items():
            if emoji in content:
                # Extract icon name and build proper Heroicon SVG
                icon_name = self.extract_icon_name(heroicon_template)
                heroicon = f'<svg class="hero-icon hero-icon-md" aria-hidden="true"><use href="{sprite_path}{icon_name}"></use></svg>'
                count = content.count(emoji)
                content = content.replace(emoji, heroicon)
                replacements[emoji] = count
                self.stats['total_replacements'] += count
        
        for emoji, replacement in self.special.items():
            if emoji in content:
                count = content.count(emoji)
                content = content.replace(emoji, replacement)
                replacements[emoji] = count
                self.stats['total_replacements'] += count
        
        if content != original_content:
            if not dry_run:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
            self.stats['files_modified'] += 1
        
        self.stats['files_processed'] += 1
        
        return {
            'file': filepath.name,
            'modified': content != original_content,
            'replacements': replacements,
            'total': sum(replacements.values())
        }
    
    def find_file(self, base_dir: Path, filename: str) -> Path:
        """Recursively find a file by name"""
        for path in base_dir.rglob(filename):
            return path
        return None
    
    def process_all(self, base_dir: Path, dry_run: bool = True, all_files: bool = False) -> List[Dict]:
        results = []
        
        if all_files:
            # Process ALL HTML files recursively
            html_files = list(base_dir.rglob('*.html'))
            print(f"\n{'='*70}")
            print(f"{'DRY RUN' if dry_run else 'EXECUTING'} - Scanning {len(html_files)} HTML files")
            print(f"{'='*70}\n")
            
            for filepath in html_files:
                # Skip archive/backup directories
                if 'archive' in str(filepath) or 'backup' in str(filepath):
                    continue
                result = self.replace_in_file(filepath, dry_run=dry_run)
                if result.get('modified') or result.get('total', 0) > 0:
                    results.append(result)
        else:
            # Process only target files
            print(f"\n{'='*70}")
            print(f"{'DRY RUN' if dry_run else 'EXECUTING'} - {len(TARGET_FILES)} target files")
            print(f"{'='*70}\n")
            
            for filename, expected in TARGET_FILES.items():
                filepath = self.find_file(base_dir, filename)
                if not filepath:
                    print(f"⏭️  {filename}: File not found (skipping)")
                    continue
                result = self.replace_in_file(filepath, dry_run=dry_run)
                results.append(result)
            
            if 'error' in result:
                print(f"❌ {filename}: {result['error']}")
            elif result['modified']:
                status = "✅" if not dry_run else "🔍"
                action = "REPLACED" if not dry_run else "WOULD REPLACE"
                print(f"{status} {filename}: {action} {result['total']} emojis")
                for emoji, count in result['replacements'].items():
                    print(f"   {emoji} → {count}x")
                if result['total'] != expected:
                    print(f"   ⚠️  Expected {expected}, found {result['total']}")
        
        return results
    
    def print_summary(self, dry_run: bool):
        print(f"\n{'='*70}")
        print("SUMMARY")
        print(f"{'='*70}")
        print(f"Files processed: {self.stats['files_processed']}")
        print(f"Files modified: {self.stats['files_modified']}")
        print(f"Total emojis {'would be ' if dry_run else ''}replaced: {self.stats['total_replacements']}")
        print(f"\nTarget: 626 emojis")
        print(f"Status: {self.stats['total_replacements']}/626")
        
        if self.stats['total_replacements'] == 626:
            print("\n✅ ALL EMOJIS ELIMINATED!")
        elif dry_run:
            print(f"\n💡 Run without --dry-run to execute")

def main():
    parser = argparse.ArgumentParser(description='Replace emojis with Heroicons')
    parser.add_argument('--dry-run', action='store_true', help='Preview without modifying')
    parser.add_argument('--base-dir', default='.', help='Base directory')
    parser.add_argument('--all-files', action='store_true', help='Process all HTML files (not just target files)')
    args = parser.parse_args()
    
    base_dir = Path(args.base_dir)
    if not base_dir.exists():
        print(f"❌ Directory not found: {base_dir}")
        return 1
    
    replacer = EmojiReplacer()
    replacer.process_all(base_dir, dry_run=args.dry_run, all_files=args.all_files)
    replacer.print_summary(dry_run=args.dry_run)
    
    return 0

if __name__ == '__main__':
    exit(main())
