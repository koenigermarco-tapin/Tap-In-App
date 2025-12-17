#!/usr/bin/env python3
"""Update Stripe 2 and 3 files from Stripe 1 template"""

import re
from pathlib import Path

def update_stripe_file(filepath, stripe_num, stripe_name, content_file):
    """Update a stripe file with new stripe number and content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace stripe number references
    content = re.sub(r'stripe1', f'stripe{stripe_num}', content)
    content = re.sub(r'Stripe 1', f'Stripe {stripe_num}', content)
    content = re.sub(r'stripe 1', f'stripe {stripe_num}', content)
    content = re.sub(r'white-belt-stripe1', f'white-belt-stripe{stripe_num}', content)
    
    # Replace content file reference
    content = re.sub(r'stripe1-content\.js', content_file, content)
    
    # Replace stripe name in titles and descriptions
    content = re.sub(r'Trust Foundations', stripe_name, content)
    
    # Update quiz loader function name
    content = re.sub(r'Dynamic Quiz Loader for Stripe 1', f'Dynamic Quiz Loader for Stripe {stripe_num}', content)
    
    # Update completeQuiz calls
    content = re.sub(r'completeQuiz\(1\)', f'completeQuiz({stripe_num})', content)
    
    # Update getStripeNumber if it exists
    content = re.sub(r'getStripeNumber\(\)', f'getStripeNumber()', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Updated {Path(filepath).name}")

# Update Stripe 2
update_stripe_file(
    'src/pages/gym/white-belt-stripe2-gamified.html',
    2,
    'Psychological Safety',
    'stripe2-content.js'
)

# Update Stripe 3
update_stripe_file(
    'src/pages/gym/white-belt-stripe3-gamified.html',
    3,
    'Self-Leadership',
    'stripe3-content.js'
)

print("\n✅ All stripe files updated!")

