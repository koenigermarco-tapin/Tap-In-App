#!/usr/bin/env python3
"""
TAP-IN Platform - Comprehensive End-to-End Test
Tests the complete user journey from landing page to black belt completion
"""

import os
import re
from pathlib import Path
from urllib.parse import urlparse

# Base directory
BASE_DIR = Path(__file__).parent

# Critical user journey files
CRITICAL_FILES = {
    'landing_en': 'index.html',
    'landing_de': 'index-de.html',
    'assessment': 'src/pages/assessments/deep-dive-assessment.html',
    'gym_dashboard': 'src/pages/gym/gym-dashboard.html',
    'restore_progress': 'src/pages/tools/restore-progress.html',
    'join_team': 'join-team.html',
    'join_team_de': 'join-team-de.html',
}

# Belt progression files
BELT_FILES = {
    'white': 'src/pages/gym/white-belt.html',
    'blue': 'src/pages/gym/blue-belt.html',
    'purple': 'src/pages/gym/purple-belt.html',
    'brown': 'src/pages/gym/brown-belt.html',
    'black': 'src/pages/gym/black-belt.html',
}

# Stripe files (20 total: 5 belts × 4 stripes)
STRIPE_FILES = []
for belt in ['white', 'blue', 'purple', 'brown', 'black']:
    for stripe in [1, 2, 3, 4]:
        STRIPE_FILES.append(f'src/pages/gym/{belt}-belt-stripe{stripe}-gamified.html')

# Core utility files
CORE_FILES = {
    'gamification': 'js/gamification-v10.js',
    'gamification_css': 'css/gamification-v10.css',
    'error_handler': 'src/js/utils/error-handler.js',
    'validation': 'src/js/utils/validation.js',
    'security': 'src/js/utils/security.js',
    'data_manager': 'src/js/utils/data-manager.js',
    'tapin_core': 'src/js/tapin-core.js',
}

def check_file_exists(filepath):
    """Check if a file exists"""
    full_path = BASE_DIR / filepath
    return full_path.exists(), full_path

def extract_links(html_content, base_path):
    """Extract all href and src attributes from HTML"""
    links = []
    
    # Find all href attributes
    href_pattern = r'href=["\']([^"\']+)["\']'
    for match in re.finditer(href_pattern, html_content):
        link = match.group(1)
        # Skip external URLs
        if not link.startswith(('http://', 'https://', 'mailto:', 'tel:', '#')):
            links.append(('href', link, match.start()))
    
    # Find all src attributes
    src_pattern = r'src=["\']([^"\']+)["\']'
    for match in re.finditer(src_pattern, html_content):
        link = match.group(1)
        if not link.startswith(('http://', 'https://', 'data:', 'javascript:')):
            links.append(('src', link, match.start()))
    
    return links

def resolve_path(link, base_file):
    """Resolve a relative path to an absolute file path"""
    base_dir = (BASE_DIR / base_file).parent
    
    # Remove query strings and fragments
    link = link.split('?')[0].split('#')[0]
    
    # Handle absolute paths from root
    if link.startswith('/'):
        return BASE_DIR / link.lstrip('/')
    
    # Handle relative paths
    if link.startswith('../'):
        parts = link.split('/')
        current_dir = base_dir
        for part in parts:
            if part == '..':
                current_dir = current_dir.parent
            elif part:
                current_dir = current_dir / part
        return current_dir
    elif link.startswith('./'):
        return base_dir / link[2:]
    else:
        return base_dir / link

def check_link_validity(link, base_file):
    """Check if a link points to a valid file"""
    try:
        resolved = resolve_path(link, base_file)
        return resolved.exists() and resolved.is_file()
    except:
        return False

def check_inline_onclick(html_content, filepath):
    """Check if assessment uses inline onclick handlers"""
    if 'deep-dive-assessment' in filepath:
        has_inline = 'onclick="selectOption' in html_content
        has_delegate = 'attachOptionsDelegate' in html_content or 'optionsDelegateAttached' in html_content
        return {
            'has_inline': has_inline,
            'has_delegate': has_delegate,
            'status': '✅ CORRECT' if has_inline and not has_delegate else '❌ ISSUE'
        }
    return None

def check_gamification_integration(html_content, filepath):
    """Check if gamification is properly integrated"""
    if 'stripe' in filepath and 'gamified' in filepath:
        has_js = 'gamification-v10.js' in html_content
        has_css = 'gamification-v10.css' in html_content
        has_save = 'TapInGamification.saveStripeCompletion' in html_content
        return {
            'has_js': has_js,
            'has_css': has_css,
            'has_save': has_save,
            'status': '✅ COMPLETE' if (has_js and has_css and has_save) else '❌ INCOMPLETE'
        }
    return None

def test_file(filepath, category):
    """Test a single file"""
    exists, full_path = check_file_exists(filepath)
    
    if not exists:
        return {
            'file': filepath,
            'category': category,
            'exists': False,
            'errors': [f'File does not exist: {filepath}']
        }
    
    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {
            'file': filepath,
            'category': category,
            'exists': True,
            'errors': [f'Cannot read file: {str(e)}']
        }
    
    # Extract and check links
    links = extract_links(content, filepath)
    broken_links = []
    for link_type, link, pos in links:
        if not check_link_validity(link, filepath):
            broken_links.append(f'{link_type}="{link}" (line ~{content[:pos].count(chr(10)) + 1})')
    
    # Check assessment-specific issues
    onclick_check = check_inline_onclick(content, filepath)
    
    # Check gamification integration
    gamification_check = check_gamification_integration(content, filepath)
    
    errors = []
    if broken_links:
        errors.extend(broken_links)
    if onclick_check and onclick_check['status'] == '❌ ISSUE':
        errors.append(f"Assessment click handling: {onclick_check}")
    if gamification_check and gamification_check['status'] == '❌ INCOMPLETE':
        errors.append(f"Gamification integration: {gamification_check}")
    
    return {
        'file': filepath,
        'category': category,
        'exists': True,
        'links': len(links),
        'broken_links': len(broken_links),
        'errors': errors,
        'onclick_check': onclick_check,
        'gamification_check': gamification_check
    }

def main():
    """Run comprehensive E2E test"""
    print("=" * 80)
    print("TAP-IN PLATFORM - COMPREHENSIVE E2E TEST")
    print("=" * 80)
    print()
    
    results = {
        'critical': [],
        'belts': [],
        'stripes': [],
        'core': []
    }
    
    # Test critical files
    print("🔍 Testing Critical Entry Points...")
    for key, filepath in CRITICAL_FILES.items():
        result = test_file(filepath, 'critical')
        results['critical'].append(result)
        status = "✅" if result['exists'] and not result['errors'] else "❌"
        print(f"  {status} {key}: {filepath}")
        if result['errors']:
            for error in result['errors'][:3]:  # Show first 3 errors
                print(f"     ⚠️  {error}")
    
    print()
    
    # Test belt files
    print("🥋 Testing Belt Overview Pages...")
    for belt, filepath in BELT_FILES.items():
        result = test_file(filepath, 'belt')
        results['belts'].append(result)
        status = "✅" if result['exists'] and not result['errors'] else "❌"
        print(f"  {status} {belt.upper()} Belt: {filepath}")
    
    print()
    
    # Test stripe files
    print("📚 Testing Stripe Files (20 files)...")
    stripe_issues = 0
    for filepath in STRIPE_FILES:
        result = test_file(filepath, 'stripe')
        results['stripes'].append(result)
        if not result['exists'] or result['errors']:
            stripe_issues += 1
            status = "❌"
            print(f"  {status} {filepath}")
            for error in result['errors'][:2]:
                print(f"     ⚠️  {error}")
    
    if stripe_issues == 0:
        print(f"  ✅ All {len(STRIPE_FILES)} stripe files are valid!")
    else:
        print(f"  ⚠️  {stripe_issues} stripe files have issues")
    
    print()
    
    # Test core utility files
    print("🛠️  Testing Core Utility Files...")
    for key, filepath in CORE_FILES.items():
        result = test_file(filepath, 'core')
        results['core'].append(result)
        status = "✅" if result['exists'] else "❌"
        print(f"  {status} {key}: {filepath}")
    
    print()
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    
    # Calculate statistics
    total_files = sum(len(v) for v in results.values())
    existing_files = sum(1 for category in results.values() for r in category if r['exists'])
    files_with_errors = sum(1 for category in results.values() for r in category if r.get('errors'))
    
    print(f"Total Files Tested: {total_files}")
    print(f"Files Found: {existing_files}/{total_files} ({existing_files/total_files*100:.1f}%)")
    print(f"Files With Issues: {files_with_errors}")
    print()
    
    # Detailed error report
    if files_with_errors > 0:
        print("DETAILED ERROR REPORT:")
        print("-" * 80)
        for category, category_results in results.items():
            for result in category_results:
                if result.get('errors'):
                    print(f"\n❌ {result['file']} ({result['category']})")
                    for error in result['errors']:
                        print(f"   • {error}")
    
    print()
    print("=" * 80)
    
    # Assessment-specific check
    print("\n🎯 ASSESSMENT CLICK HANDLING CHECK:")
    assessment_result = next((r for r in results['critical'] if 'assessment' in r['file']), None)
    if assessment_result and assessment_result.get('onclick_check'):
        check = assessment_result['onclick_check']
        print(f"  Status: {check['status']}")
        print(f"  Has inline onclick: {check['has_inline']}")
        print(f"  Has event delegation: {check['has_delegate']}")
    
    # Gamification check summary
    print("\n🎮 GAMIFICATION INTEGRATION CHECK:")
    gamification_results = [r for r in results['stripes'] if r.get('gamification_check')]
    complete = sum(1 for r in gamification_results if r['gamification_check']['status'] == '✅ COMPLETE')
    print(f"  Complete: {complete}/{len(gamification_results)} stripe files")
    
    if complete < len(gamification_results):
        incomplete = [r for r in gamification_results if r['gamification_check']['status'] != '✅ COMPLETE']
        print(f"  ⚠️  {len(incomplete)} files need gamification fixes:")
        for r in incomplete[:5]:
            check = r['gamification_check']
            missing = []
            if not check['has_js']: missing.append('JS')
            if not check['has_css']: missing.append('CSS')
            if not check['has_save']: missing.append('saveStripeCompletion')
            print(f"     • {r['file']}: Missing {', '.join(missing)}")

if __name__ == '__main__':
    main()

