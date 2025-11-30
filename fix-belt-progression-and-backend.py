#!/usr/bin/env python3
"""
Fix Belt Progression Links and Backend Integration
1. Fix stripe-to-stripe progression links in German files
2. Fix belt hub pages to link to German stripe files
3. Ensure assessment completion links point to next belt
"""

from pathlib import Path
import re

def fix_stripe_progression():
    """Fix progression links between stripe files"""
    print("=" * 80)
    print("🔗 FIXING BELT PROGRESSION LINKS")
    print("=" * 80)
    
    progression = {
        'white-belt-stripe1-gamified-de.html': {
            'next': 'white-belt-stripe2-gamified-de.html',
            'pattern': r'href="([^"]*white-belt-stripe[^"]*\.html)"',
        },
        'white-belt-stripe2-gamified-de.html': {
            'next': 'white-belt-stripe3-gamified-de.html',
            'pattern': r'href="([^"]*white-belt-stripe[^"]*\.html)"',
        },
        'white-belt-stripe3-gamified-de.html': {
            'next': 'white-belt-stripe4-gamified-de.html',
            'pattern': r'href="([^"]*white-belt-stripe[^"]*\.html)"',
        },
        'white-belt-stripe4-gamified-de.html': {
            'next': 'white-belt-assessment-de.html',
            'pattern': r'href="([^"]*white-belt-assessment[^"]*\.html)"',
        },
        'blue-belt-stripe1-gamified-de.html': {
            'next': 'blue-belt-stripe2-gamified-de.html',
            'pattern': r'href="([^"]*blue-belt-stripe[^"]*\.html)"',
        },
        'blue-belt-stripe2-gamified-de.html': {
            'next': 'blue-belt-stripe3-gamified-de.html',
            'pattern': r'href="([^"]*blue-belt-stripe[^"]*\.html)"',
        },
        'blue-belt-stripe3-gamified-de.html': {
            'next': 'blue-belt-stripe4-gamified-de.html',
            'pattern': r'href="([^"]*blue-belt-stripe[^"]*\.html)"',
        },
        'blue-belt-stripe4-gamified-de.html': {
            'next': 'blue-belt-assessment-de.html',
            'pattern': r'href="([^"]*blue-belt-assessment[^"]*\.html)"',
        },
        'purple-belt-stripe1-gamified-de.html': {
            'next': 'purple-belt-stripe2-gamified-de.html',
            'pattern': r'href="([^"]*purple-belt-stripe[^"]*\.html)"',
        },
        'purple-belt-stripe2-gamified-de.html': {
            'next': 'purple-belt-stripe3-gamified-de.html',
            'pattern': r'href="([^"]*purple-belt-stripe[^"]*\.html)"',
        },
        'purple-belt-stripe3-gamified-de.html': {
            'next': 'purple-belt-stripe4-gamified-de.html',
            'pattern': r'href="([^"]*purple-belt-stripe[^"]*\.html)"',
        },
        'purple-belt-stripe4-gamified-de.html': {
            'next': 'purple-belt-assessment-de.html',
            'pattern': r'href="([^"]*purple-belt-assessment[^"]*\.html)"',
        },
        'brown-belt-stripe1-gamified-de.html': {
            'next': 'brown-belt-stripe2-gamified-de.html',
            'pattern': r'href="([^"]*brown-belt-stripe[^"]*\.html)"',
        },
        'brown-belt-stripe2-gamified-de.html': {
            'next': 'brown-belt-stripe3-gamified-de.html',
            'pattern': r'href="([^"]*brown-belt-stripe[^"]*\.html)"',
        },
        'brown-belt-stripe3-gamified-de.html': {
            'next': 'brown-belt-stripe4-gamified-de.html',
            'pattern': r'href="([^"]*brown-belt-stripe[^"]*\.html)"',
        },
        'brown-belt-stripe4-gamified-de.html': {
            'next': 'brown-belt-assessment-de.html',
            'pattern': r'href="([^"]*brown-belt-assessment[^"]*\.html)"',
        },
        'black-belt-stripe1-gamified-de.html': {
            'next': 'black-belt-stripe2-gamified-de.html',
            'pattern': r'href="([^"]*black-belt-stripe[^"]*\.html)"',
        },
        'black-belt-stripe2-gamified-de.html': {
            'next': 'black-belt-stripe3-gamified-de.html',
            'pattern': r'href="([^"]*black-belt-stripe[^"]*\.html)"',
        },
        'black-belt-stripe3-gamified-de.html': {
            'next': 'black-belt-stripe4-gamified-de.html',
            'pattern': r'href="([^"]*black-belt-stripe[^"]*\.html)"',
        },
        'black-belt-stripe4-gamified-de.html': {
            'next': 'black-belt-assessment-de.html',
            'pattern': r'href="([^"]*black-belt-assessment[^"]*\.html)"',
        },
    }
    
    fixes_applied = 0
    
    for filename, config in progression.items():
        filepath = Path(filename)
        if not filepath.exists():
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        next_file = config['next']
        
        # Look for completion/CTA sections that should link to next stripe
        # Pattern: Look for buttons or links after completion messages
        completion_patterns = [
            (r'(Starte|Continue|Weiter|Fortfahren)[^<]*→[^<]*<a[^>]*href=")([^"]+)(")', 
             rf'\1{next_file}\3'),
            (r'(href=")([^"]*stripe[^"]*\.html)(".*?>(?:Starte|Continue|Weiter|Fortfahren)[^<]*→)', 
             rf'\1{next_file}\3'),
            # Look for completion CTA sections
            (r'(<a[^>]*class="[^"]*btn[^"]*"[^>]*href=")([^"]*-stripe[^"]*\.html)(".*?>(?:Starte|Continue|Weiter|Fortfahren)[^<]*Stripe[^<]*→)', 
             rf'\1{next_file}\3'),
        ]
        
        for pattern, replacement in completion_patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content)
        
        # Also check for direct references in completion divs
        # Look for "Continue to Stripe X" or similar
        stripe_num_pattern = re.search(r'stripe(\d)', filename)
        if stripe_num_pattern:
            stripe_num = int(stripe_num_pattern.group(1))
            next_stripe_num = stripe_num + 1
            
            # Fix patterns like "Stripe 2" -> next stripe
            if next_stripe_num <= 4:
                patterns_to_fix = [
                    (rf'href="([^"]*stripe{stripe_num}[^"]*\.html)"', next_file),
                    (rf'Stripe {stripe_num}', f'Stripe {next_stripe_num}'),
                ]
                
                for old_pattern, new_value in patterns_to_fix:
                    if re.search(old_pattern, content):
                        content = re.sub(old_pattern, f'href="{new_value}"', content)
        
        # Ensure completion sections link correctly
        # Look for completion divs and add/update next stripe link
        if 'completeQuiz' in content or 'stripe-complete' in content.lower():
            # Find completion sections
            completion_sections = re.findall(
                r'(<div[^>]*(?:class|id)="[^"]*(?:completion|complete|cta)[^"]*"[^>]*>.*?</div>)',
                content,
                re.DOTALL | re.IGNORECASE
            )
            
            for section in completion_sections:
                if next_file not in section and '-de.html' not in section:
                    # Try to add the link
                    if 'Starte' in section or 'Continue' in section:
                        # Replace any incorrect links
                        new_section = re.sub(
                            r'href="([^"]*\.html)"',
                            f'href="{next_file}"',
                            section,
                            count=1
                        )
                        content = content.replace(section, new_section)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            fixes_applied += 1
            print(f"  ✅ Fixed: {filename} → {next_file}")
    
    print(f"\n✅ Fixed progression links in {fixes_applied} files")
    return fixes_applied

def fix_belt_hub_pages():
    """Fix belt hub pages to link to German stripe files"""
    print("\n" + "=" * 80)
    print("🏠 FIXING BELT HUB PAGES")
    print("=" * 80)
    
    hub_to_stripe1 = {
        'white-belt-de.html': 'white-belt-stripe1-gamified-de.html',
        'blue-belt-de.html': 'blue-belt-stripe1-gamified-de.html',
        'purple-belt-de.html': 'purple-belt-stripe1-gamified-de.html',
        'brown-belt-de.html': 'brown-belt-stripe1-gamified-de.html',
        'black-belt-de.html': 'black-belt-stripe1-gamified-de.html',
    }
    
    fixes_applied = 0
    
    for hub_file, stripe1_file in hub_to_stripe1.items():
        filepath = Path(hub_file)
        if not filepath.exists():
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix links to stripe files
        # Replace English stripe file links with German versions
        belt_name = hub_file.replace('-belt-de.html', '').replace('-de.html', '')
        
        # Pattern: href="white-belt-stripe1-gamified.html" -> href="white-belt-stripe1-gamified-de.html"
        stripe_pattern = rf'href="({belt_name}-belt-stripe\d+-gamified)\.html"'
        if re.search(stripe_pattern, content):
            content = re.sub(
                stripe_pattern,
                rf'href="\1-de.html"',
                content
            )
            fixes_applied += 1
            print(f"  ✅ Fixed: {hub_file} - Updated stripe links to German versions")
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
    
    print(f"\n✅ Fixed {fixes_applied} hub page(s)")
    return fixes_applied

def main():
    print("=" * 80)
    print("🔧 FIXING BELT PROGRESSION AND BACKEND INTEGRATION")
    print("=" * 80)
    print()
    
    stripe_fixes = fix_stripe_progression()
    hub_fixes = fix_belt_hub_pages()
    
    print("\n" + "=" * 80)
    print("✅ COMPLETE")
    print("=" * 80)
    print(f"\n📊 Summary:")
    print(f"   Stripe progression fixes: {stripe_fixes}")
    print(f"   Hub page fixes: {hub_fixes}")
    print(f"   Total fixes: {stripe_fixes + hub_fixes}")

if __name__ == '__main__':
    main()

