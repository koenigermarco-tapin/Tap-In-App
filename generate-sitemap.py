#!/usr/bin/env python3
"""
Generate sitemap.xml for TAP-IN platform
Includes all HTML pages (English and German versions)
"""

from pathlib import Path
from datetime import datetime
import os

def generate_sitemap(root_dir='.', output_file='sitemap.xml'):
    """Generate sitemap.xml with all HTML files"""
    
    # Base URL (update this to your production URL)
    base_url = 'https://tap-in.netlify.app'  # Change to your actual domain
    
    html_files = []
    
    # Find all HTML files
    for html_file in Path(root_dir).rglob('*.html'):
        # Skip node_modules, .git, react-app
        if any(skip in str(html_file) for skip in ['node_modules', '.git', 'react-app']):
            continue
        
        # Get relative path
        rel_path = html_file.relative_to(root_dir)
        html_files.append(str(rel_path))
    
    # Sort for consistency
    html_files.sort()
    
    # Generate sitemap XML
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>']
    sitemap.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    # Priority mapping
    priority_map = {
        'index': 1.0,
        'gym-dashboard': 0.9,
        'learning-hub': 0.9,
        'belt-assessment': 0.8,
        'belt': 0.8,
        'stripe': 0.7,
        'assessment': 0.7,
        'tool-': 0.6,
        'game-': 0.6,
    }
    
    for html_file in html_files:
        url = f"{base_url}/{html_file}"
        url = url.replace('\\', '/')  # Fix Windows paths
        
        # Determine priority
        priority = 0.5  # default
        for key, value in priority_map.items():
            if key in html_file.lower():
                priority = value
                break
        
        # Determine change frequency
        changefreq = 'weekly'
        if 'index' in html_file.lower() or 'dashboard' in html_file.lower():
            changefreq = 'daily'
        elif 'stripe' in html_file.lower() or 'assessment' in html_file.lower():
            changefreq = 'monthly'
        
        sitemap.append('  <url>')
        sitemap.append(f'    <loc>{url}</loc>')
        sitemap.append(f'    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>')
        sitemap.append(f'    <changefreq>{changefreq}</changefreq>')
        sitemap.append(f'    <priority>{priority:.1f}</priority>')
        sitemap.append('  </url>')
    
    sitemap.append('</urlset>')
    
    # Write to file
    output_path = Path(root_dir) / output_file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sitemap))
    
    return len(html_files)

if __name__ == '__main__':
    print("🌐 Generating sitemap.xml...")
    count = generate_sitemap()
    print(f"✅ Generated sitemap.xml with {count} URLs")
    print(f"📄 Saved to: sitemap.xml")

