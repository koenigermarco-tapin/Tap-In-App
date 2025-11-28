#!/usr/bin/env python3
"""
Generate app icons in all required sizes
Requires: pip install Pillow cairosvg
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    from pathlib import Path
    import io
    
    # Try to import cairosvg for SVG conversion (optional)
    try:
        import cairosvg
        HAS_CAIRO = True
    except ImportError:
        HAS_CAIRO = False
        print("⚠️  cairosvg not installed - will generate programmatically")
        print("   To convert SVG: pip install cairosvg")

except ImportError:
    print("❌ PIL (Pillow) not installed")
    print("   Install with: pip install Pillow")
    exit(1)

SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
ICONS_DIR = Path(__file__).parent / 'icons'
ICONS_DIR.mkdir(exist_ok=True)

def create_icon_programmatically(size):
    """Create icon using PIL (no SVG dependency)"""
    # Create image with gradient-like background
    img = Image.new('RGB', (size, size), color='#6366f1')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient effect (simple approximation)
    for y in range(size):
        # Interpolate between indigo and purple
        r = int(99 + (139 - 99) * (y / size))
        g = int(102 + (92 - 102) * (y / size))
        b = int(241 + (246 - 241) * (y / size))
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    # Try to load a font, fallback to default
    try:
        # Try to use system fonts
        font_size_tap = int(size * 0.27)  # ~140px at 512
        font_size_in = int(size * 0.19)    # ~100px at 512
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size_tap)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size_in)
    except:
        font = ImageFont.load_default()
        font_small = font
    
    # Draw "TAP" text
    tap_text = "TAP"
    tap_bbox = draw.textbbox((0, 0), tap_text, font=font)
    tap_width = tap_bbox[2] - tap_bbox[0]
    tap_x = (size - tap_width) // 2
    tap_y = int(size * 0.35)  # ~200px at 512
    draw.text((tap_x, tap_y), tap_text, fill='white', font=font)
    
    # Draw "IN" text
    in_text = "IN"
    in_bbox = draw.textbbox((0, 0), in_text, font=font_small)
    in_width = in_bbox[2] - in_bbox[0]
    in_x = (size - in_width) // 2
    in_y = int(size * 0.58)  # ~320px at 512
    draw.text((in_x, in_y), in_text, fill='white', font=font_small)
    
    # Draw badge circle
    badge_x = int(size * 0.78)  # ~400px at 512
    badge_y = int(size * 0.23)  # ~120px at 512
    badge_r = int(size * 0.078)  # ~40px at 512
    
    draw.ellipse(
        [badge_x - badge_r, badge_y - badge_r, badge_x + badge_r, badge_y + badge_r],
        fill='#fbbf24'
    )
    
    # Draw highlight on badge
    highlight_offset = int(badge_r * 0.4)
    highlight_r = int(badge_r * 0.4)
    draw.ellipse(
        [badge_x - highlight_offset - highlight_r, badge_y - highlight_offset - highlight_r,
         badge_x - highlight_offset + highlight_r, badge_y - highlight_offset + highlight_r],
        fill='rgba(255,255,255,128)'
    )
    
    return img

def generate_icons():
    """Generate all icon sizes"""
    print("🎨 Generating app icons...\n")
    
    for size in SIZES:
        output_path = ICONS_DIR / f'icon-{size}x{size}.png'
        
        if HAS_CAIRO and (ICONS_DIR / 'icon.svg').exists():
            # Convert SVG to PNG at specific size
            print(f"   Converting SVG → {size}x{size}...")
            cairosvg.svg2png(
                url=str(ICONS_DIR / 'icon.svg'),
                write_to=str(output_path),
                output_width=size,
                output_height=size
            )
        else:
            # Generate programmatically
            print(f"   Creating {size}x{size}...")
            img = create_icon_programmatically(size)
            img.save(output_path, 'PNG', optimize=True)
        
        print(f"   ✓ Saved: {output_path.name}")
    
    print("\n✅ All icons generated!")
    print(f"📁 Location: {ICONS_DIR}")
    print("\nGenerated sizes:")
    for size in SIZES:
        print(f"   • {size}x{size}.png")

if __name__ == '__main__':
    generate_icons()
