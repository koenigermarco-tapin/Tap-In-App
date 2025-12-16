#!/usr/bin/env python3
"""
Apply all stripe fixes to German -de.html files
"""

from pathlib import Path
import re

def extract_belt_stripe(filename):
    """Extract belt and stripe number from filename"""
    match = re.search(r'(\w+)-belt-stripe(\d+)', filename)
    if match:
        return match.group(1), int(match.group(2))
    return None, None

def fix_german_stripe_file(filepath):
    """Apply all fixes to a German stripe file"""
    belt, stripe = extract_belt_stripe(filepath.name)
    if not belt or not stripe:
        print(f"⚠️  Could not parse belt/stripe from {filepath.name}")
        return False
    
    try:
        content = filepath.read_text(encoding='utf-8')
        original = content
        changes = []
        
        # Fix 1: Broken onclick handlers
        if f'onclick="completeQuiz({stripe})\n' in content:
            content = content.replace(
                f'onclick="completeQuiz({stripe})\nwindow.dispatchEvent',
                f'onclick="completeQuiz({stripe}); window.dispatchEvent'
            )
            changes.append("onclick")
        
        # Fix 2: safeSetInnerHTML
        if 'safeSetInnerHTML(' in content:
            content = content.replace('safeSetInnerHTML(completionDiv, `', 'completionDiv.innerHTML = `')
            changes.append("safeSetInnerHTML")
        
        # Fix 3: Stray message variable
        if '\n             message\n' in content:
            content = content.replace('\n             message\n', '\n')
            changes.append("stray message")
        
        # Fix 4: Icon typo
        if 'icon-bok-open' in content:
            content = content.replace('icon-bok-open', 'icon-book-open')
            changes.append("icon typo")
        
        # Fix 5: CSS syntax error
        if 'text-align: center);' in content:
            content = content.replace('text-align: center);', 'text-align: center;')
            changes.append("CSS syntax")
        
        # Fix 6: Update getStripeNumber to return belt and stripe
        old_get = '''function getStripeNumber() {
const match = window.location.pathname.match(/stripe(\\d+)/);
return match ? parseInt(match[1]) : 1;
}'''
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
        if old_get in content:
            content = content.replace(old_get, new_get)
            changes.append("getStripeNumber")
        
        # Fix 7: Update completeQuiz call to use .stripe
        if 'completeQuiz(getStripeNumber())' in content:
            content = content.replace('completeQuiz(getStripeNumber())', 'completeQuiz(getStripeNumber().stripe)')
            changes.append("completeQuiz call")
        
        # Fix 8: Update completeQuiz function - add parameter handling and German navigation
        if 'function completeQuiz(stripeNum) {' in content:
            # Check if it already has parameter handling
            if 'if (!stripeNum)' not in content:
                # Insert parameter handling after function declaration
                content = content.replace(
                    'function completeQuiz(stripeNum) {',
                    '''function completeQuiz(stripeNum) {
  // If no stripeNum provided, get it from URL
  if (!stripeNum) {
    const current = getStripeNumber();
    stripeNum = current.stripe;
  }
  
  const current = getStripeNumber();
  const belt = current.belt;'''
                )
                changes.append("completeQuiz params")
            
            # Update storage key to use belt
            if f"const storageKey = '{belt.lower()}beltStripe' + stripeNum" not in content:
                old_patterns = [
                    "const storageKey = 'whitebeltStripe' + stripeNum",
                    "const storageKey = 'bluebeltStripe' + stripeNum",
                    "const storageKey = 'purplebeltStripe' + stripeNum",
                    "const storageKey = 'brownbeltStripe' + stripeNum",
                    "const storageKey = 'blackbeltStripe' + stripeNum"
                ]
                for old in old_patterns:
                    if old in content:
                        content = content.replace(old, "const storageKey = belt + 'beltStripe' + stripeNum")
                        changes.append("storage key")
                        break
            
            # Update TapInGamification to use belt
            if f'TapInGamification.saveStripeCompletion("{belt}", stripeNum' not in content:
                content = re.sub(
                    r"TapInGamification\.saveStripeCompletion\('[^']+', stripeNum",
                    r"TapInGamification.saveStripeCompletion(belt, stripeNum",
                    content
                )
                changes.append("gamification belt")
            
            # CRITICAL: Update navigation to use -de.html files
            old_navs = [
                "window.location.href = 'white-belt-stripe' + nextStripe + '-gamified.html'",
                "window.location.href = 'blue-belt-stripe' + nextStripe + '-gamified.html'",
                "window.location.href = 'purple-belt-stripe' + nextStripe + '-gamified.html'",
                "window.location.href = 'brown-belt-stripe' + nextStripe + '-gamified.html'",
                "window.location.href = 'black-belt-stripe' + nextStripe + '-gamified.html'"
            ]
            for old in old_navs:
                if old in content:
                    content = content.replace(old, f"window.location.href = belt + '-belt-stripe' + nextStripe + '-gamified-de.html'")
                    changes.append("navigation to -de")
                    break
            
            # Update dashboard link to German version
            if "window.location.href = 'gym-dashboard.html'" in content:
                content = content.replace("window.location.href = 'gym-dashboard.html'", "window.location.href = 'gym-dashboard-de.html'")
                changes.append("dashboard link")
            
            # Update alert message to use dynamic belt
            old_alert = r"alert\('.*Belt Complete!"
            if re.search(old_alert, content):
                content = re.sub(
                    old_alert,
                    r"alert(belt.charAt(0).toUpperCase() + belt.slice(1) + ' Belt Complete!",
                    content
                )
                changes.append("alert message")
        
        # Fix 9: Update hardcoded belt references in quiz completion
        if f'TapInGamification.saveStripeCompletion("{belt}", {stripe}' not in content:
            patterns = [
                (f'TapInGamification.saveStripeCompletion("white", {stripe}', f'TapInGamification.saveStripeCompletion("{belt}", {stripe}'),
                (f'TapInGamification.saveStripeCompletion("blue", {stripe}', f'TapInGamification.saveStripeCompletion("{belt}", {stripe}'),
                (f'TapInGamification.saveStripeCompletion("purple", {stripe}', f'TapInGamification.saveStripeCompletion("{belt}", {stripe}'),
                (f'TapInGamification.saveStripeCompletion("brown", {stripe}', f'TapInGamification.saveStripeCompletion("{belt}", {stripe}'),
                (f'TapInGamification.saveStripeCompletion("black", {stripe}', f'TapInGamification.saveStripeCompletion("{belt}", {stripe}'),
            ]
            for old, new in patterns:
                if old in content:
                    content = content.replace(old, new)
                    changes.append("quiz completion belt")
                    break
        
        # Fix 10: Update failure message belt reference
        if f'getBeltFailureMessage("{belt}")' not in content:
            content = content.replace('getBeltFailureMessage("white")', f'getBeltFailureMessage("{belt}")')
            if 'getBeltFailureMessage("white")' in content:
                changes.append("failure message belt")
        
        # Fix 11: Update failure text to use correct belt
        belt_cap = belt.capitalize()
        if f'Submitted by a {belt_cap} Belt' not in content:
            content = content.replace('You Got Submitted by a White Belt!', f'You Got Submitted by a {belt_cap} Belt!')
            if 'You Got Submitted by a White Belt!' not in content:
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

# Get all German stripe files
german_files = sorted([f for f in Path('src/pages/gym').glob('*-belt-stripe*-gamified-de.html')])

print(f"🔍 Processing {len(german_files)} German stripe files\n")

fixed_count = 0
for filepath in german_files:
    if fix_german_stripe_file(filepath):
        fixed_count += 1

print(f"\n📊 SUMMARY:")
print(f"   Files processed: {len(german_files)}")
print(f"   Files fixed: {fixed_count}")
print(f"   ✅ All German stripe files updated!")

