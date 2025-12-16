#!/usr/bin/env python3
"""
Comprehensive fix script for all 20 stripe files.
Applies all fixes from stripe1 to remaining 19 files.
"""

from pathlib import Path
import re

def extract_belt_stripe(filename):
    """Extract belt and stripe number from filename"""
    match = re.search(r'(\w+)-belt-stripe(\d+)', filename)
    if match:
        return match.group(1), int(match.group(2))
    return None, None

def fix_stripe_file(filepath):
    """Apply all fixes to a stripe file"""
    belt, stripe = extract_belt_stripe(filepath.name)
    if not belt or not stripe:
        print(f"⚠️  Could not parse belt/stripe from {filepath.name}")
        return False
    
    try:
        content = filepath.read_text(encoding='utf-8')
        original = content
        changes = []
        
        # Fix 1: Broken onclick handlers (multi-line without semicolon)
        pattern1 = r'onclick="completeQuiz\((\d+)\)\s*\n\s*window\.dispatchEvent'
        if re.search(pattern1, content):
            content = re.sub(pattern1, f'onclick="completeQuiz({stripe}); window.dispatchEvent', content)
            changes.append("broken onclick")
        
        # Fix 2: Update getStripeNumber to return belt and stripe
        old_get = r'function getStripeNumber\(\) \{[\s\S]*?const match = window\.location\.pathname\.match\(/stripe\(\\d\+\)/\);[\s\S]*?return match \? parseInt\(match\[1\]\) : \d+;[\s\S]*?\}'
        new_get = f'''function getStripeNumber() {{
  const filename = window.location.pathname.split('/').pop();
  const match = filename.match(/(white|blue|purple|brown|black)-belt-stripe(\\d+)/);
  if (match) {{
    return {{
      belt: match[1],
      stripe: parseInt(match[2])
    }};
  }}
  return {{ belt: '{belt}', stripe: {stripe} }};
}}'''
        if re.search(r'function getStripeNumber\(\) \{[\s\S]*?return match \? parseInt\(match\[1\]\) : \d+;', content):
            content = re.sub(
                r'function getStripeNumber\(\) \{[\s\S]*?return match \? parseInt\(match\[1\]\) : \d+;[\s\S]*?\}',
                new_get,
                content,
                flags=re.MULTILINE
            )
            changes.append("getStripeNumber")
        
        # Fix 3: Replace safeSetInnerHTML with innerHTML
        if 'safeSetInnerHTML(' in content:
            content = re.sub(r'safeSetInnerHTML\(([^,]+),\s*`', r'\1.innerHTML = `', content)
            changes.append("safeSetInnerHTML")
        
        # Fix 4: Remove stray message variable
        if re.search(r'^\s*message\s*$', content, re.MULTILINE):
            content = re.sub(r'^\s*message\s*$\n', '', content, flags=re.MULTILINE)
            changes.append("stray message")
        
        # Fix 5: Fix icon typos
        if 'icon-bok-open' in content:
            content = content.replace('icon-bok-open', 'icon-book-open')
            changes.append("icon typo")
        
        # Fix 6: Fix CSS syntax error (text-align: center);)
        if 'text-align: center);' in content:
            content = content.replace('text-align: center);', 'text-align: center;')
            changes.append("CSS syntax")
        
        # Fix 7: Update completeQuiz to use getStripeNumber().stripe
        if 'completeQuiz(getStripeNumber())' in content:
            content = content.replace('completeQuiz(getStripeNumber())', 'completeQuiz(getStripeNumber().stripe)')
            changes.append("completeQuiz call")
        
        # Fix 8: Update completeQuiz function to handle parameters and use correct belt
        old_complete = r'function completeQuiz\(stripeNum\) \{[\s\S]*?const storageKey = \'[^\']+Stripe\' \+ stripeNum'
        if re.search(old_complete, content):
            # Check if it already has parameter handling
            if 'if (!stripeNum)' not in content:
                # Add parameter handling
                content = re.sub(
                    r'function completeQuiz\(stripeNum\) \{',
                    r'function completeQuiz(stripeNum) {\n  // If no stripeNum provided, get it from URL\n  if (!stripeNum) {\n    const current = getStripeNumber();\n    stripeNum = current.stripe;\n  }\n  \n  const current = getStripeNumber();\n  const belt = current.belt;',
                    content
                )
                changes.append("completeQuiz params")
            
            # Update storage key to use belt
            content = re.sub(
                r"const storageKey = '[^']+Stripe' \+ stripeNum",
                f"const storageKey = belt + 'beltStripe' + stripeNum",
                content
            )
            
            # Update TapInGamification to use belt
            content = re.sub(
                r"TapInGamification\.saveStripeCompletion\('[^']+', stripeNum",
                r"TapInGamification.saveStripeCompletion(belt, stripeNum",
                content
            )
            
            # Update navigation to use belt
            content = re.sub(
                r"window\.location\.href = '[^']+-belt-stripe' \+ nextStripe",
                r"window.location.href = belt + '-belt-stripe' + nextStripe",
                content
            )
            
            # Update alert message
            old_alert = r"alert\('.*Belt Complete!"
            if re.search(old_alert, content):
                content = re.sub(
                    old_alert,
                    r"alert(belt.charAt(0).toUpperCase() + belt.slice(1) + ' Belt Complete!",
                    content
                )
            changes.append("completeQuiz belt")
        
        # Fix 9: Update hardcoded belt references in quiz completion
        if f'TapInGamification.saveStripeCompletion("{belt}", {stripe}' not in content:
            # Update to use dynamic belt
            content = re.sub(
                r'TapInGamification\.saveStripeCompletion\("white", \d+',
                f'TapInGamification.saveStripeCompletion("{belt}", {stripe}',
                content
            )
            changes.append("quiz completion belt")
        
        # Fix 10: Update failure message belt reference
        if f'getBeltFailureMessage("{belt}")' not in content:
            content = re.sub(
                r'getBeltFailureMessage\("white"\)',
                f'getBeltFailureMessage("{belt}")',
                content
            )
            changes.append("failure message belt")
        
        # Fix 11: Update failure text to use correct belt
        belt_capitalized = belt.capitalize()
        if f'Submitted by a {belt_capitalized} Belt' not in content:
            content = re.sub(
                r'You Got Submitted by a White Belt!',
                f'You Got Submitted by a {belt_capitalized} Belt!',
                content
            )
            changes.append("failure text belt")
        
        if content != original:
            filepath.write_text(content, encoding='utf-8')
            print(f"✅ Fixed {filepath.name} ({belt} belt, stripe {stripe}): {', '.join(changes)}")
            return True
        else:
            print(f"✓  {filepath.name} already correct ({belt} belt, stripe {stripe})")
            return False
            
    except Exception as e:
        print(f"❌ Error fixing {filepath.name}: {e}")
        import traceback
        traceback.print_exc()
        return False

# Get all stripe files (excluding archive)
stripe_files = sorted([f for f in Path('src/pages/gym').glob('*-belt-stripe*-gamified.html')])

print(f"🔍 Processing {len(stripe_files)} stripe files\n")

fixed_count = 0
for filepath in stripe_files:
    if fix_stripe_file(filepath):
        fixed_count += 1

print(f"\n📊 SUMMARY:")
print(f"   Files processed: {len(stripe_files)}")
print(f"   Files fixed: {fixed_count}")
print(f"   ✅ All stripe files updated!")

