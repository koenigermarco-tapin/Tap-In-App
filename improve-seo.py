#!/usr/bin/env python3
"""
Add SEO enhancements to HTML files
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Enhanced meta descriptions
- JSON-LD structured data
"""

from pathlib import Path
import re
import json

# Page-specific metadata
PAGE_METADATA = {
    'index.html': {
        'title': 'TAP-IN | Leadership Development Platform',
        'description': 'Transform your leadership through embodied learning. Progress through belt levels, complete assessments, and build championship-level leadership skills.',
        'og_title': 'TAP-IN Leadership Development Platform',
        'og_description': 'Transform teams through embodied leadership training. Build trust, embrace conflict, deliver results.',
        'og_image': '/og-image.png',
        'type': 'website'
    },
    'gym-dashboard.html': {
        'title': 'The Gym | TAP-IN Personal Development',
        'description': 'Your personal development dashboard. Track progress, continue training, and level up your leadership skills.',
        'og_title': 'The Gym - TAP-IN Personal Development',
        'og_description': 'Track your progress, continue your training, and level up your leadership skills.',
        'type': 'website'
    },
    'learning-hub.html': {
        'title': 'The Hub | TAP-IN Business Leadership',
        'description': 'Business-focused leadership training. Build high-performing teams with trust, accountability, and conflict resolution.',
        'og_title': 'The Hub - TAP-IN Business Leadership',
        'og_description': 'Transform your team through embodied leadership training. Tools, assessments, and games for high-performing teams.',
        'type': 'website'
    },
    'belt-assessment-v2.html': {
        'title': 'Belt Level Assessment | TAP-IN',
        'description': 'Discover your leadership belt level. Complete this assessment to find out if you\'re a White, Blue, Purple, Brown, or Black Belt leader.',
        'og_title': 'Find Your Leadership Belt Level',
        'og_description': 'Complete this assessment to discover your current leadership level and get a personalized training path.',
        'type': 'article'
    }
}

def get_canonical_url(filepath):
    """Generate canonical URL from filepath"""
    # Assume production URL (update with actual domain)
    base_url = 'https://tap-in-platform.netlify.app'
    return f"{base_url}/{filepath.name}"

def add_og_tags(content, metadata):
    """Add Open Graph meta tags"""
    
    og_tags = f'''<!-- Open Graph / Facebook -->
<meta property="og:type" content="{metadata.get('type', 'website')}">
<meta property="og:url" content="{get_canonical_url(Path('temp.html'))}">
<meta property="og:title" content="{metadata.get('og_title', metadata.get('title', ''))}">
<meta property="og:description" content="{metadata.get('og_description', metadata.get('description', ''))}">
<meta property="og:image" content="{metadata.get('og_image', '/og-image.png')}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="{get_canonical_url(Path('temp.html'))}">
<meta property="twitter:title" content="{metadata.get('og_title', metadata.get('title', ''))}">
<meta property="twitter:description" content="{metadata.get('og_description', metadata.get('description', ''))}">
<meta property="twitter:image" content="{metadata.get('og_image', '/og-image.png')}">
'''
    
    # Check if OG tags already exist
    if 'property="og:type"' in content or 'og:type' in content:
        return content, False
    
    # Find viewport meta tag and insert after it
    viewport_pattern = r'(<meta[^>]*name="viewport"[^>]*>)'
    
    if re.search(viewport_pattern, content):
        content = re.sub(viewport_pattern, r'\1\n    ' + og_tags, content, count=1)
        return content, True
    
    # Fallback: Insert before </head>
    head_pattern = r'(</head>)'
    if re.search(head_pattern, content):
        content = re.sub(head_pattern, '    ' + og_tags + '\n\1', content, count=1)
        return content, True
    
    return content, False

def add_canonical_url(content, filepath):
    """Add canonical URL"""
    
    canonical_url = get_canonical_url(filepath)
    canonical_tag = f'<link rel="canonical" href="{canonical_url}">'
    
    # Check if canonical already exists
    if 'rel="canonical"' in content:
        return content, False
    
    # Insert before </head>
    head_pattern = r'(</head>)'
    if re.search(head_pattern, content):
        content = re.sub(head_pattern, '    ' + canonical_tag + '\n\1', content, count=1)
        return content, True
    
    return content, False

def add_structured_data(content, metadata, filepath):
    """Add JSON-LD structured data"""
    
    # Determine type based on file
    is_assessment = 'assessment' in filepath.name.lower()
    is_article = 'article' in filepath.name.lower() or 'hub' in filepath.name.lower()
    
    if is_assessment:
        schema = {
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": metadata.get('title', ''),
            "description": metadata.get('description', ''),
            "url": get_canonical_url(filepath)
        }
    elif is_article:
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": metadata.get('title', ''),
            "description": metadata.get('description', ''),
            "url": get_canonical_url(filepath)
        }
    else:
        schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": metadata.get('title', ''),
            "description": metadata.get('description', ''),
            "url": get_canonical_url(filepath)
        }
    
    json_ld = f'<script type="application/ld+json">\n{json.dumps(schema, indent=2)}\n</script>'
    
    # Check if structured data already exists
    if 'application/ld+json' in content:
        return content, False
    
    # Insert before </head>
    head_pattern = r'(</head>)'
    if re.search(head_pattern, content):
        content = re.sub(head_pattern, '    ' + json_ld + '\n\1', content, count=1)
        return content, True
    
    return content, False

def improve_seo(filepath):
    """Apply all SEO improvements to a file"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # Get metadata for this file
    filename = filepath.name
    metadata = PAGE_METADATA.get(filename, {
        'title': '',
        'description': '',
        'og_title': '',
        'og_description': '',
        'type': 'website'
    })
    
    # Update title if missing
    if not metadata.get('title'):
        # Try to extract from existing title tag
        title_match = re.search(r'<title>([^<]+)</title>', content)
        if title_match:
            metadata['title'] = title_match.group(1)
        else:
            metadata['title'] = 'TAP-IN Leadership Development'
    
    # Update description if missing
    if not metadata.get('description'):
        desc_match = re.search(r'<meta[^>]*name="description"[^>]*content="([^"]+)"', content)
        if desc_match:
            metadata['description'] = desc_match.group(1)
        else:
            metadata['description'] = 'Transform your leadership through embodied learning.'
    
    # Set og_title and og_description if not set
    if not metadata.get('og_title'):
        metadata['og_title'] = metadata['title']
    if not metadata.get('og_description'):
        metadata['og_description'] = metadata['description']
    
    # 1. Add Open Graph tags
    content, changed = add_og_tags(content, metadata)
    if changed:
        changes.append("Open Graph tags added")
    
    # 2. Add canonical URL
    content, changed = add_canonical_url(content, filepath)
    if changed:
        changes.append("Canonical URL added")
    
    # 3. Add structured data
    content, changed = add_structured_data(content, metadata, filepath)
    if changed:
        changes.append("Structured data added")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    
    return False, []

def main():
    print("=" * 80)
    print("🔍 SEO ENHANCEMENTS")
    print("=" * 80)
    print()
    
    files_to_update = list(PAGE_METADATA.keys())
    
    print(f"Found {len(files_to_update)} priority files to update\n")
    
    updated = 0
    skipped = 0
    
    for filename in files_to_update:
        filepath = Path(filename)
        if not filepath.exists():
            print(f"⚠️  {filename} - File not found, skipping")
            continue
        
        print(f"📝 {filename}...")
        try:
            success, changes = improve_seo(filepath)
            if success:
                updated += 1
                print(f"  ✅ Updated: {', '.join(changes)}")
            else:
                skipped += 1
                print(f"  ⏭️  Already has SEO tags")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(files_to_update)}")
    print(f"⏭️  Skipped: {skipped}")
    print("=" * 80)
    print()
    print("💡 Next: Run for all stripe and assessment pages")

if __name__ == '__main__':
    main()

