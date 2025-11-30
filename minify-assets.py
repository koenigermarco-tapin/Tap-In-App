#!/usr/bin/env python3
"""
Minify CSS and JS files for production
Simple minification (removes comments and whitespace)
"""

from pathlib import Path
import re

def minify_js(content):
    """Simple JS minification"""
    # Remove single-line comments
    content = re.sub(r'//.*', '', content)
    # Remove multi-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove extra whitespace
    content = re.sub(r'\s+', ' ', content)
    # Remove whitespace around operators
    content = re.sub(r'\s*([=+\-*/%<>!&|,;:{}()\[\]])\s*', r'\1', content)
    # Remove leading/trailing whitespace from lines
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    return '\n'.join(lines)

def minify_css(content):
    """Simple CSS minification"""
    # Remove comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove extra whitespace
    content = re.sub(r'\s+', ' ', content)
    # Remove whitespace around colons, semicolons, commas, braces
    content = re.sub(r'\s*([:;{},])\s*', r'\1', content)
    # Remove whitespace around operators
    content = re.sub(r'\s*([>+~])\s*', r'\1', content)
    return content.strip()

def minify_file(filepath, file_type):
    """Minify a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_size = len(content)
        
        if file_type == 'js':
            minified = minify_js(content)
        elif file_type == 'css':
            minified = minify_css(content)
        else:
            return False
        
        new_size = len(minified)
        savings = ((original_size - new_size) / original_size) * 100 if original_size > 0 else 0
        
        # Only minify if we get reasonable savings (avoid breaking files)
        if savings > 5:  # At least 5% reduction
            # Create backup
            backup_path = filepath.with_suffix(filepath.suffix + '.bak')
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # Write minified
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(minified)
            
            return (original_size, new_size, savings)
    
    except Exception as e:
        print(f"  ⚠️  Error minifying {filepath}: {e}")
        return False

def main():
    print("🗜️  Minifying CSS and JS files...")
    print()
    
    js_files = list(Path('js').rglob('*.js')) if Path('js').exists() else []
    css_files = list(Path('css').rglob('*.css')) if Path('css').exists() else []
    
    js_minified = 0
    css_minified = 0
    total_original = 0
    total_new = 0
    
    print("📦 JavaScript files:")
    for js_file in js_files:
        result = minify_file(js_file, 'js')
        if result:
            original, new_size, savings = result
            js_minified += 1
            total_original += original
            total_new += new_size
            print(f"  ✅ {js_file.name}: {original:,} → {new_size:,} bytes ({savings:.1f}% reduction)")
    
    print()
    print("🎨 CSS files:")
    for css_file in css_files:
        result = minify_file(css_file, 'css')
        if result:
            original, new_size, savings = result
            css_minified += 1
            total_original += original
            total_new += new_size
            print(f"  ✅ {css_file.name}: {original:,} → {new_size:,} bytes ({savings:.1f}% reduction)")
    
    print()
    print("=" * 60)
    total_savings = ((total_original - total_new) / total_original) * 100 if total_original > 0 else 0
    print(f"✅ Minified {js_minified} JS + {css_minified} CSS files")
    print(f"📊 Total: {total_original:,} → {total_new:,} bytes ({total_savings:.1f}% reduction)")
    print("=" * 60)

if __name__ == '__main__':
    main()

