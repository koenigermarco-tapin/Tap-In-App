#!/usr/bin/env python3
"""Integrate all remaining belts (Blue, Purple, Brown, Black) from White Belt template"""

import re
from pathlib import Path

# Belt configurations
BELTS = {
    'blue': {
        'name': 'Blue Belt',
        'theme': 'Conflict',
        'stripes': [
            {'num': 1, 'topic': 'Conflict Foundations', 'content': 'blue-belt-stripe1-content.js'},
            {'num': 2, 'topic': 'Difficult Conversations', 'content': 'blue-belt-stripe2-content.js'},
            {'num': 3, 'topic': 'Team Conflict Protocols', 'content': 'blue-belt-stripe3-content.js'},
            {'num': 4, 'topic': 'Conflict Mastery', 'content': 'blue-belt-stripe4-content.js'}
        ]
    },
    'purple': {
        'name': 'Purple Belt',
        'theme': 'Commitment',
        'stripes': [
            {'num': 1, 'topic': 'Decision-Making Clarity', 'content': 'purple-belt-stripe1-content.js'},
            {'num': 2, 'topic': 'Buy-In and Alignment', 'content': 'purple-belt-stripe2-content.js'},
            {'num': 3, 'topic': 'Cascading Commitments', 'content': 'purple-belt-stripe3-content.js'},
            {'num': 4, 'topic': 'Recommitment Practices', 'content': 'purple-belt-stripe4-content.js'}
        ]
    },
    'brown': {
        'name': 'Brown Belt',
        'theme': 'Accountability',
        'stripes': [
            {'num': 1, 'topic': 'Peer Accountability Foundations', 'content': 'brown-belt-stripe1-content.js'},
            {'num': 2, 'topic': 'Feedback Systems', 'content': 'brown-belt-stripe2-content.js'},
            {'num': 3, 'topic': 'Performance Standards', 'content': 'brown-belt-stripe3-content.js'},
            {'num': 4, 'topic': 'Accountability Mastery', 'content': 'brown-belt-stripe4-content.js'}
        ]
    },
    'black': {
        'name': 'Black Belt',
        'theme': 'Results',
        'stripes': [
            {'num': 1, 'topic': 'Results Focus', 'content': 'black-belt-stripe1-content-ENHANCED.js'},
            {'num': 2, 'topic': 'Collective Goals', 'content': 'black-belt-stripe2-content-ENHANCED.js'},
            {'num': 3, 'topic': 'Course Correction', 'content': 'black-belt-stripe3-content-ENHANCED.js'},
            {'num': 4, 'topic': 'Sustainable Excellence', 'content': 'black-belt-stripe4-content-ENHANCED.js'}
        ]
    }
}

def get_next_file(belt, stripe_num):
    """Get the next file in sequence"""
    if stripe_num < 4:
        return f'{belt}-belt-stripe{stripe_num + 1}-gamified.html'
    else:
        # Move to next belt
        belt_order = ['blue', 'purple', 'brown', 'black']
        try:
            current_index = belt_order.index(belt)
            if current_index < len(belt_order) - 1:
                next_belt = belt_order[current_index + 1]
                return f'{next_belt}-belt-stripe1-gamified.html'
            else:
                return '../../index.html'  # End of progression
        except ValueError:
            return '../../index.html'

def create_belt_file(template_path, belt_key, stripe_info):
    """Create a belt stripe file from template"""
    belt_config = BELTS[belt_key]
    stripe_num = stripe_info['num']
    topic = stripe_info['topic']
    content_file = stripe_info['content']
    
    # Read template
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update belt badge
    content = re.sub(
        r'<div class="belt-badge">WHITE BELT - STRIPE 1 of 4</div>',
        f'<div class="belt-badge">{belt_config["name"].upper()} - STRIPE {stripe_num} of 4</div>',
        content
    )
    
    # 2. Update title
    content = re.sub(
        r'<h1>Trust Foundations</h1>',
        f'<h1>{topic}</h1>',
        content
    )
    
    # 3. Update breadcrumb
    content = re.sub(
        r'<a href="white-belt\.html">White Belt</a> / Stripe 1',
        f'<a href="{belt_key}-belt.html">{belt_config["name"]}</a> / Stripe {stripe_num}',
        content
    )
    
    # 4. Update script tag
    content = re.sub(
        r'<script src="../../../js/stripe1-content\.js"></script>',
        f'<script src="../../../js/{content_file}"></script>',
        content
    )
    
    # 5. Update progress ID
    content = re.sub(
        r"stripeId: 'white-stripe-1'",
        f"stripeId: '{belt_key}-stripe-{stripe_num}'",
        content
    )
    
    # 6. Update navigation in completeQuiz
    next_file = get_next_file(belt_key, stripe_num)
    content = re.sub(
        r"window\.location\.href = 'white-belt-stripe2-gamified\.html'",
        f"window.location.href = '{next_file}'",
        content
    )
    # Also update any other navigation references
    content = re.sub(
        r'white-belt-stripe\d+-gamified\.html',
        lambda m: next_file if 'stripe2' in m.group() else m.group(),
        content
    )
    
    # 7. Update meta title
    content = re.sub(
        r'<title>.*?White Belt.*?Stripe 1.*?Trust Foundations.*?</title>',
        f'<title>{belt_config["name"]} Stripe {stripe_num} - {topic} | TAP-IN Leadership</title>',
        content
    )
    
    # 8. Update meta description
    content = re.sub(
        r'<meta name="description" content="Master leadership fundamentals in White Belt Stripe 1: Trust Foundations',
        f'<meta name="description" content="Master {belt_config["theme"].lower()} leadership in {belt_config["name"]} Stripe {stripe_num}: {topic}',
        content
    )
    
    # 9. Update OG tags
    content = re.sub(
        r'<meta property="og:title" content="White Belt Stripe 1 Training">',
        f'<meta property="og:title" content="{belt_config["name"]} Stripe {stripe_num} Training">',
        content
    )
    content = re.sub(
        r'<meta property="og:url" content="https://tap-in-platform\.netlify\.app/white-belt-stripe1-gamified\.html">',
        f'<meta property="og:url" content="https://tap-in-platform.netlify.app/{belt_key}-belt-stripe{stripe_num}-gamified.html">',
        content
    )
    
    # 10. Update Twitter tags
    content = re.sub(
        r'<meta property="twitter:title" content="White Belt Stripe 1 Training">',
        f'<meta property="twitter:title" content="{belt_config["name"]} Stripe {stripe_num} Training">',
        content
    )
    content = re.sub(
        r'<meta property="twitter:url" content="https://tap-in-platform\.netlify\.app/white-belt-stripe1-gamified\.html">',
        f'<meta property="twitter:url" content="https://tap-in-platform.netlify.app/{belt_key}-belt-stripe{stripe_num}-gamified.html">',
        content
    )
    
    # 11. Update canonical URL
    content = re.sub(
        r'<link rel="canonical" href="https://tap-in-platform\.netlify\.app/white-belt-stripe1-gamified\.html">',
        f'<link rel="canonical" href="https://tap-in-platform.netlify.app/{belt_key}-belt-stripe{stripe_num}-gamified.html">',
        content
    )
    
    # 12. Update dynamic quiz loader comment
    content = re.sub(
        r'<!-- Dynamic Quiz Container - Questions loaded from stripe1-content\.js -->',
        f'<!-- Dynamic Quiz Container - Questions loaded from {content_file} -->',
        content
    )
    content = re.sub(
        r'// Dynamic Quiz Loader for Stripe 1',
        f'// Dynamic Quiz Loader for {belt_config["name"]} Stripe {stripe_num}',
        content
    )
    
    # 13. Update any remaining "white-belt" references in paths
    content = re.sub(
        r'white-belt\.html',
        f'{belt_key}-belt.html',
        content
    )
    
    # 14. Update completeQuiz function parameter if it exists
    content = re.sub(
        r'completeQuiz\(1\)',
        f'completeQuiz({stripe_num})',
        content
    )
    
    # Write file
    output_path = Path(f'src/pages/gym/{belt_key}-belt-stripe{stripe_num}-gamified.html')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {output_path.name}")

# Main execution
template_path = Path('src/pages/gym/white-belt-stripe1-gamified.html')

if not template_path.exists():
    print(f"❌ Template not found: {template_path}")
    exit(1)

print("🚀 Starting belt integration...")
print("")

total_files = 0
for belt_key, belt_config in BELTS.items():
    print(f"📦 Creating {belt_config['name']} files...")
    for stripe_info in belt_config['stripes']:
        create_belt_file(template_path, belt_key, stripe_info)
        total_files += 1
    print("")

print(f"✅ Integration complete! Created {total_files} files.")
print("")
print("📋 Next steps:")
print("1. Verify all content files exist in src/js/")
print("2. Test in browser")
print("3. Check navigation flows")
print("4. Verify questions load correctly")

