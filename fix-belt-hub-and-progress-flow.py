#!/usr/bin/env python3
"""
Fix Belt Hub Links and Progress Flow
1. Fix German hub pages to link to correct German stripe files
2. Ensure stripe files link to next stripe in same language
3. Fix completion links to next belt
"""

from pathlib import Path
import re

def fix_german_hub_links():
    """Fix stripe links in German hub pages"""
    fixes = {
        'white-belt-de.html': [
            ('white-belt-stripe3-carousel-NEW-de.html', 'white-belt-stripe3-gamified-de.html'),
            ('white-belt-stripe4-carousel-NEW-de.html', 'white-belt-stripe4-gamified-de.html'),
        ],
        'blue-belt-de.html': [
            ('blue-belt-stripe1-carousel-NEW-de.html', 'blue-belt-stripe1-gamified-de.html'),
            ('blue-belt-stripe2-carousel-NEW-de.html', 'blue-belt-stripe2-gamified-de.html'),
            ('blue-belt-stripe3-carousel-NEW-de.html', 'blue-belt-stripe3-gamified-de.html'),
            ('blue-belt-stripe4-carousel-NEW-de.html', 'blue-belt-stripe4-gamified-de.html'),
        ],
        'black-belt-de.html': [
            ('black-belt-stripe2-de.html', 'black-belt-stripe2-gamified-de.html'),
            ('black-belt-stripe3-de.html', 'black-belt-stripe3-gamified-de.html'),
        ],
    }
    
    results = []
    
    for hub_file, link_fixes in fixes.items():
        if not Path(hub_file).exists():
            print(f"⚠️  {hub_file} not found")
            continue
        
        with open(hub_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changes = 0
        for old_link, new_link in link_fixes:
            if old_link in content:
                content = content.replace(old_link, new_link)
                changes += 1
                print(f"  ✓ {hub_file}: {old_link} → {new_link}")
            else:
                # Try in href
                pattern = f'href="{re.escape(old_link)}"'
                if re.search(pattern, content):
                    content = re.sub(pattern, f'href="{new_link}"', content)
                    changes += 1
                    print(f"  ✓ {hub_file}: Fixed href to {new_link}")
        
        if changes > 0:
            with open(hub_file, 'w', encoding='utf-8') as f:
                f.write(content)
            results.append((hub_file, changes))
            print(f"✅ {hub_file}: Fixed {changes} link(s)")
    
    return results

def fix_stripe_progress_flow():
    """Fix stripe files to link to next stripe in same language"""
    belt_order = ['white', 'blue', 'purple', 'brown', 'black']
    fixes = []
    
    for belt in belt_order:
        for stripe in range(1, 5):
            # Check German stripe files
            de_file = f"{belt}-belt-stripe{stripe}-gamified-de.html"
            if not Path(de_file).exists():
                continue
            
            with open(de_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content_changed = False
            
            if stripe < 4:
                # Should link to next stripe (German)
                next_stripe = stripe + 1
                next_de = f"{belt}-belt-stripe{next_stripe}-gamified-de.html"
                
                # Check if it links to English version
                next_en = f"{belt}-belt-stripe{next_stripe}-gamified.html"
                if next_en in content and Path(next_de).exists():
                    content = content.replace(next_en, next_de)
                    content_changed = True
                    fixes.append(f"{de_file}: Fixed next stripe link to German")
            else:
                # Stripe 4 should link to next belt hub or assessment (German)
                belt_index = belt_order.index(belt)
                if belt_index < len(belt_order) - 1:
                    next_belt = belt_order[belt_index + 1]
                    next_belt_hub_de = f"{next_belt}-belt-de.html"
                    next_belt_assessment_de = f"{next_belt}-belt-assessment.de.html"
                    
                    # Check for English links
                    next_belt_hub_en = f"{next_belt}-belt.html"
                    next_belt_assessment_en = f"{next_belt}-belt-assessment.html"
                    
                    if next_belt_hub_en in content and Path(next_belt_hub_de).exists():
                        content = content.replace(next_belt_hub_en, next_belt_hub_de)
                        content_changed = True
                        fixes.append(f"{de_file}: Fixed next belt hub link to German")
                    
                    if next_belt_assessment_en in content and Path(next_belt_assessment_de).exists():
                        content = content.replace(next_belt_assessment_en, next_belt_assessment_de)
                        content_changed = True
                        fixes.append(f"{de_file}: Fixed next belt assessment link to German")
            
            if content_changed:
                with open(de_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ {de_file}: Fixed progress flow links")
    
    return fixes

def fix_completion_messages():
    """Ensure completion messages link to correct next steps"""
    belt_order = ['white', 'blue', 'purple', 'brown', 'black']
    
    for belt in belt_order:
        for stripe in range(1, 5):
            de_file = f"{belt}-belt-stripe{stripe}-gamified-de.html"
            if not Path(de_file).exists():
                continue
            
            with open(de_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content_changed = False
            
            # Fix "Back to Hub" links
            if 'href="white-belt.html"' in content and belt != 'white':
                belt_hub_de = f"{belt}-belt-de.html"
                if Path(belt_hub_de).exists():
                    content = content.replace('href="white-belt.html"', f'href="{belt_hub_de}"')
                    content_changed = True
            
            # Fix generic hub links
            if 'href="learning-hub.html"' in content:
                if 'href="learning-hub-de.html"' not in content:
                    # Check if German hub exists
                    if Path('learning-hub-de.html').exists():
                        # Only replace if we're in German context
                        # Actually, keep learning-hub.html as it might have language switcher
                        pass
            
            if content_changed:
                with open(de_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ {de_file}: Fixed completion links")

def main():
    print("=" * 80)
    print("🔧 FIXING BELT HUB LINKS AND PROGRESS FLOW")
    print("=" * 80)
    print()
    
    print("📋 Step 1: Fixing German Hub Links...")
    hub_results = fix_german_hub_links()
    print()
    
    print("📋 Step 2: Fixing Stripe Progress Flow...")
    flow_fixes = fix_stripe_progress_flow()
    print()
    
    print("📋 Step 3: Fixing Completion Messages...")
    fix_completion_messages()
    print()
    
    print("=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    print(f"Hub files fixed: {len(hub_results)}")
    print(f"Progress flow fixes: {len(flow_fixes)}")
    print("\n✅ All fixes applied!")
    print("=" * 80)

if __name__ == '__main__':
    main()

