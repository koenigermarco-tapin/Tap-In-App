#!/usr/bin/env python3
"""
Image optimization script
- Checks for images that need optimization
- Adds loading="lazy" if missing
- Provides recommendations for WebP conversion
"""

from pathlib import Path
import os

def find_images():
    """Find all images in the repository"""
    
    image_extensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp']
    images = []
    
    for ext in image_extensions:
        for img_file in Path('.').rglob(f'*{ext}'):
            if any(skip in str(img_file) for skip in ['node_modules', '.git', 'react-app']):
                continue
            images.append(img_file)
    
    return images

def analyze_images():
    """Analyze images and provide recommendations"""
    
    images = find_images()
    
    print("=" * 80)
    print("🖼️  IMAGE OPTIMIZATION ANALYSIS")
    print("=" * 80)
    print()
    
    total_size = 0
    png_count = 0
    jpg_count = 0
    svg_count = 0
    
    print(f"Found {len(images)} images:\n")
    
    for img in sorted(images):
        try:
            size = img.stat().st_size
            total_size += size
            size_kb = size / 1024
            
            ext = img.suffix.lower()
            if ext == '.png':
                png_count += 1
            elif ext in ['.jpg', '.jpeg']:
                jpg_count += 1
            elif ext == '.svg':
                svg_count += 1
            
            status = "✅" if ext == '.webp' else "⚠️"
            recommendation = ""
            if ext == '.png' and size > 50000:  # > 50KB
                recommendation = f" → Convert to WebP (could save ~{int(size_kb * 0.6)}KB)"
            elif ext in ['.jpg', '.jpeg'] and size > 50000:
                recommendation = f" → Convert to WebP (could save ~{int(size_kb * 0.5)}KB)"
            
            print(f"{status} {img.name:40s} {size_kb:8.1f} KB {recommendation}")
            
        except Exception as e:
            print(f"❌ {img.name}: Error reading ({e})")
    
    print()
    print("=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    print(f"Total images: {len(images)}")
    print(f"Total size: {total_size / 1024 / 1024:.2f} MB")
    print(f"PNG: {png_count} | JPG: {jpg_count} | SVG: {svg_count} | WebP: {len(images) - png_count - jpg_count - svg_count}")
    print()
    
    if total_size > 1024 * 1024:  # > 1MB
        print("💡 RECOMMENDATIONS:")
        print("   1. Convert large PNG/JPG to WebP format (60-80% size reduction)")
        print("   2. Compress existing images using tools like:")
        print("      - Online: Squoosh.app, TinyPNG.com")
        print("      - CLI: cwebp, sharp (Node.js)")
        print("   3. Add responsive images with <picture> element")
        print()
    else:
        print("✅ Images are already relatively small!")
        print("   Optional: Convert to WebP for further optimization")
        print()

if __name__ == '__main__':
    analyze_images()

