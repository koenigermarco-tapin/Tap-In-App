#!/usr/bin/env python3
"""
Optimize images - Add lazy loading, dimensions, and prepare for WebP conversion
"""

from pathlib import Path
import re

def optimize_images_in_html(content, filepath):
    """Add lazy loading and dimensions to images"""
    changes = False
    
    # Pattern to find img tags
    img_pattern = r'<img([^>]*?)>'
    
    def optimize_img(match):
        attrs = match.group(1)
        original = match.group(0)
        
        # Skip if already has loading="lazy"
        if 'loading=' in attrs:
            return original
        
        # Skip if it's likely above the fold (first 2 images or has class="hero")
        if 'hero' in attrs.lower() or 'logo' in attrs.lower():
            # Add dimensions if missing for hero images
            if 'width=' not in attrs and 'height=' not in attrs:
                # Try to add reasonable defaults
                attrs = attrs.rstrip() + ' width="1200" height="600"'
                changes = True
                return f'<img{attrs}>'
            return original
        
        # Add loading="lazy" to below-fold images
        if 'width=' not in attrs or 'height=' not in attrs:
            # Add placeholder dimensions to prevent layout shift
            if 'width=' not in attrs:
                attrs = attrs.rstrip() + ' width="800"'
            if 'height=' not in attrs:
                attrs = attrs.rstrip() + ' height="600"'
        
        attrs = attrs.rstrip() + ' loading="lazy"'
        return f'<img{attrs}>'
    
    new_content = re.sub(img_pattern, optimize_img, content)
    
    return new_content, new_content != content

def add_picture_elements_for_webp(content):
    """Convert img tags to picture elements with WebP fallback"""
    changes = False
    
    # Only convert if WebP version exists (for now, just prepare structure)
    # Pattern: <img src="path/to/image.jpg">
    img_pattern = r'<img([^>]*src="([^"]+\.(?:jpg|jpeg|png))"[^>]*)>'
    
    def convert_to_picture(match):
        attrs = match.group(1)
        src = match.group(2)
        
        # Skip if already in picture element
        if '<picture>' in content[:content.find(match.group(0))]:
            return match.group(0)
        
        # Generate WebP path
        webp_src = src.rsplit('.', 1)[0] + '.webp'
        
        # Extract alt and other attributes
        alt_match = re.search(r'alt="([^"]*)"', attrs)
        alt = alt_match.group(1) if alt_match else ''
        
        other_attrs = re.sub(r'(src|alt)="[^"]*"', '', attrs).strip()
        
        picture = f'''<picture>
      <source srcset="{webp_src}" type="image/webp">
      <img src="{src}" alt="{alt}" {other_attrs}>
    </picture>'''
        
        return picture
    
    # Only convert first few to avoid too many changes at once
    new_content = re.sub(img_pattern, convert_to_picture, content, count=5)
    
    return new_content, new_content != content

def main():
    print("=" * 80)
    print("🖼️  OPTIMIZING IMAGES")
    print("=" * 80)
    print()
    
    priority_files = [
        'index.html',
        'gym-dashboard.html',
        'learning-hub.html',
        'belt-assessment-v2.html',
    ]
    
    files_to_update = [Path(f) for f in priority_files if Path(f).exists()]
    
    print(f"Found {len(files_to_update)} files to optimize\n")
    
    updated = 0
    
    for filepath in files_to_update:
        print(f"📝 {filepath.name}...")
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Add lazy loading
            content, changed1 = optimize_images_in_html(content, filepath)
            
            # Add picture elements (optional, commented for now)
            # content, changed2 = add_picture_elements_for_webp(content)
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated += 1
                print(f"  ✅ Added lazy loading and dimensions to images")
            else:
                print(f"  ⏭️  Images already optimized")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()
    
    print("=" * 80)
    print(f"✅ Updated: {updated}/{len(files_to_update)}")
    print("=" * 80)
    print()
    print("💡 Note: WebP conversion requires actual image files.")
    print("   Use: cwebp -q 85 input.jpg -o output.webp")

if __name__ == '__main__':
    main()
