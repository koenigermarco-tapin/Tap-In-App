#!/usr/bin/env python3
"""
FIX ALL NAVIGATION & LINKING
Links all Hub courses and ensures consistent navigation
"""

import re

def fix_hub_course_links():
    """Fix Hub course links to actual module files"""
    
    files = ['learning-hub.html', 'learning-hub-de.html']
    
    # Map course names to actual files
    course_files = {
        'energy': 'energy-management-module-gamified.html',
        'boundaries': 'boundaries-module-gamified.html',
        'deepwork': 'deep-work-module-gamified.html',
        'feedback': 'feedback-module-gamified.html',
        'expectations': 'expectation-management-module-gamified.html',
    }
    
    for filepath in files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix each course card link
            for course_class, target_file in course_files.items():
                # Find the course card and replace '#' with actual file
                pattern = f'(<div class="course-card {course_class}"[^>]*onclick="window\\.location\\.href=)[\'"]#[\'"](>)'
                replacement = f'\\1\'{target_file}\'\\2'
                content = re.sub(pattern, replacement, content)
            
            # Also fix featured card if it exists
            content = re.sub(
                r'(onclick="window\.location\.href=)[\'"]#[\'"](>)',
                r'\1\'communication-mastery-module.html\'\2',
                content,
                count=1
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f'✅ Fixed course links in: {filepath}')
            
        except FileNotFoundError:
            print(f'⚠️  File not found: {filepath}')

def ensure_consistent_navigation():
    """Ensure all pages have consistent navigation"""
    
    core_pages = [
        'index-DUAL-ENTRY.html',
        'index-DUAL-ENTRY-de.html',
        'gym-dashboard.html',
        'gym-dashboard-de.html',
        'learning-hub.html',
        'learning-hub-de.html',
    ]
    
    for filepath in core_pages:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Ensure all gym links point to gym-dashboard.html (not gym-home-FOCUSED.html)
            content = re.sub(
                r'href=[\'"]gym-home-FOCUSED\.html[\'"]',
                'href="gym-dashboard.html"',
                content
            )
            content = re.sub(
                r'href=[\'"]gym-home-FOCUSED-de\.html[\'"]',
                'href="gym-dashboard-de.html"',
                content
            )
            
            # Ensure hub links are correct
            content = re.sub(
                r'href=[\'"]hub-home-BUSINESS\.html[\'"]',
                'href="learning-hub.html"',
                content
            )
            content = re.sub(
                r'href=[\'"]hub-home-BUSINESS-de\.html[\'"]',
                'href="learning-hub-de.html"',
                content
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f'✅ Fixed navigation in: {filepath}')
            
        except FileNotFoundError:
            print(f'⚠️  File not found: {filepath}')

def create_communication_mastery_placeholder():
    """Create placeholder for Communication Mastery module"""
    
    content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Communication Mastery - Coming Soon | TAP-IN</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #252940;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: #e2e8f0;
        }
        .container {
            max-width: 600px;
            text-align: center;
        }
        h1 {
            font-size: 2.5rem;
            color: #ffffff;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.125rem;
            color: #94a3b8;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .back-btn {
            display: inline-block;
            background: #4a5568;
            color: #ffffff;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
        }
        .back-btn:hover {
            background: #5a6478;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚧 Coming Soon</h1>
        <p>
            <strong>Communication Mastery</strong> is currently under development. 
            This comprehensive 8-module program will cover active listening, empathy, 
            coaching techniques, and feedback systems.
        </p>
        <p>
            In the meantime, explore our other courses in The Hub!
        </p>
        <a href="learning-hub.html" class="back-btn">← Back to The Hub</a>
    </div>
</body>
</html>'''
    
    with open('communication-mastery-module.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('✅ Created placeholder: communication-mastery-module.html')

def main():
    """Execute all navigation fixes"""
    
    print("🔗 FIXING ALL NAVIGATION & LINKING")
    print("=" * 60)
    
    print("\n1. Fixing Hub course links...")
    fix_hub_course_links()
    
    print("\n2. Ensuring consistent navigation...")
    ensure_consistent_navigation()
    
    print("\n3. Creating placeholders...")
    create_communication_mastery_placeholder()
    
    print("\n" + "=" * 60)
    print("✅ ALL NAVIGATION FIXED!")
    print("\nChanges made:")
    print("  • Hub courses now link to actual module files")
    print("  • All gym links point to gym-dashboard.html")
    print("  • All hub links point to learning-hub.html")
    print("  • Communication Mastery placeholder created")
    print("\nReady to test!")

if __name__ == '__main__':
    main()

