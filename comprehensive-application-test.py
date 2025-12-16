#!/usr/bin/env python3
"""
Comprehensive Application Test Script
Tests all major features in both English and German
"""

import os
import re
from pathlib import Path
import json
from datetime import datetime

class ApplicationTester:
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'tests': [],
            'summary': {}
        }
        
    def test_file_exists(self, filepath):
        """Check if a file exists"""
        full_path = self.base_dir / filepath
        exists = full_path.exists()
        return {
            'file': filepath,
            'exists': exists,
            'size': full_path.stat().st_size if exists else 0
        }
    
    def test_link_in_file(self, filepath, link_pattern):
        """Check if a link exists in a file"""
        full_path = self.base_dir / filepath
        if not full_path.exists():
            return {'file': filepath, 'found': False, 'error': 'File not found'}
        
        content = full_path.read_text(encoding='utf-8', errors='ignore')
        matches = re.findall(link_pattern, content, re.IGNORECASE)
        return {
            'file': filepath,
            'found': len(matches) > 0,
            'matches': len(matches),
            'sample': matches[:3] if matches else []
        }
    
    def test_language_switcher(self, filepath):
        """Test if language switcher is present and functional"""
        full_path = self.base_dir / filepath
        if not full_path.exists():
            return {'file': filepath, 'has_switcher': False, 'error': 'File not found'}
        
        content = full_path.read_text(encoding='utf-8', errors='ignore')
        
        has_toggle = 'langToggle' in content or 'lang-toggle' in content
        has_dropdown = 'langDropdown' in content or 'lang-dropdown' in content
        has_guards = '_langSwitcherInitialized' in content or 'data-lang-listener' in content
        has_navigation = 'window.location.href' in content or 'location.href' in content
        
        return {
            'file': filepath,
            'has_switcher': has_toggle and has_dropdown,
            'has_guards': has_guards,
            'has_navigation': has_navigation,
            'functional': has_toggle and has_dropdown and has_guards and has_navigation
        }
    
    def test_module_links(self, filepath):
        """Test if module cards have proper data-target attributes"""
        full_path = self.base_dir / filepath
        if not full_path.exists():
            return {'file': filepath, 'modules': [], 'error': 'File not found'}
        
        content = full_path.read_text(encoding='utf-8', errors='ignore')
        
        # Find module cards with data-target
        data_targets = re.findall(r'data-target=["\']([^"\']+)["\']', content)
        # Find module cards without data-target (using title matching)
        module_titles = re.findall(r'<div[^>]*class="[^"]*module-title[^"]*"[^>]*>([^<]+)</div>', content)
        
        return {
            'file': filepath,
            'modules_with_target': len(data_targets),
            'modules_without_target': len(module_titles) - len(data_targets),
            'data_targets': data_targets[:10],  # First 10
            'module_titles': module_titles[:10]  # First 10
        }
    
    def run_comprehensive_test(self):
        """Run all comprehensive tests"""
        print("🔍 Starting Comprehensive Application Test...")
        print("=" * 60)
        
        # Test 1: Main Entry Points
        print("\n1️⃣ Testing Main Entry Points...")
        entry_tests = [
            ('index-DUAL-ENTRY.html', 'English main entry'),
            ('index-DUAL-ENTRY-de.html', 'German main entry'),
            ('index.html', 'Root index'),
        ]
        for file, desc in entry_tests:
            result = self.test_file_exists(file)
            result['description'] = desc
            self.results['tests'].append(('entry_point', result))
            print(f"  {'✅' if result['exists'] else '❌'} {desc}: {file}")
        
        # Test 2: Language Switchers
        print("\n2️⃣ Testing Language Switchers...")
        switcher_files = [
            'index-DUAL-ENTRY.html',
            'index-DUAL-ENTRY-de.html',
            'gym-dashboard.html',
            'gym-dashboard-de.html',
            'learning-hub.html',
            'learning-hub-de.html',
        ]
        for file in switcher_files:
            result = self.test_language_switcher(file)
            self.results['tests'].append(('language_switcher', result))
            status = '✅' if result.get('functional', False) else '❌'
            print(f"  {status} {file}: {'Functional' if result.get('functional') else 'Missing/Incomplete'}")
        
        # Test 3: Gym Dashboard Modules
        print("\n3️⃣ Testing Gym Dashboard Module Links...")
        gym_files = ['gym-dashboard.html', 'gym-dashboard-de.html']
        for file in gym_files:
            result = self.test_module_links(file)
            self.results['tests'].append(('module_links', result))
            print(f"  📦 {file}:")
            print(f"     - Modules with data-target: {result.get('modules_with_target', 0)}")
            print(f"     - Modules without data-target: {result.get('modules_without_target', 0)}")
        
        # Test 4: Belt Assessments
        print("\n4️⃣ Testing Belt Assessment Files...")
        belt_assessments = [
            ('belt-assessment-v2.html', 'belt-assessment-v2-de.html', 'Belt Assessment'),
        ]
        for en_file, de_file, desc in belt_assessments:
            en_result = self.test_file_exists(en_file)
            de_result = self.test_file_exists(de_file)
            self.results['tests'].append(('belt_assessment', {'en': en_result, 'de': de_result, 'description': desc}))
            print(f"  {'✅' if en_result['exists'] else '❌'} {desc} EN: {en_file}")
            print(f"  {'✅' if de_result['exists'] else '❌'} {desc} DE: {de_file}")
        
        # Test 5: Combined Profile Carousel (Business Portal Assessment)
        print("\n5️⃣ Testing Business Portal Assessment...")
        carousel_files = [
            ('combined-profile-carousel.html', 'English carousel'),
            ('combined-profile-carousel.de.html', 'German carousel'),
        ]
        for file, desc in carousel_files:
            result = self.test_file_exists(file)
            # Check if initialization is at the end
            if result['exists']:
                content = (self.base_dir / file).read_text(encoding='utf-8', errors='ignore')
                init_at_end = 'DOM loaded, initializing assessment' in content
                functions_before_init = content.find('function renderQuestion') < content.find('DOM loaded, initializing')
                result['init_fixed'] = init_at_end and functions_before_init
            self.results['tests'].append(('carousel', result))
            status = '✅' if result.get('init_fixed', False) else '❌'
            print(f"  {status} {desc}: {file} ({'Fixed' if result.get('init_fixed') else 'Needs fix'})")
        
        # Test 6: Hub Pages
        print("\n6️⃣ Testing Hub Pages...")
        hub_files = [
            ('learning-hub.html', 'English hub'),
            ('learning-hub-de.html', 'German hub'),
        ]
        for file, desc in hub_files:
            result = self.test_file_exists(file)
            # Check for broken links
            if result['exists']:
                content = (self.base_dir / file).read_text(encoding='utf-8', errors='ignore')
                broken_links = len(re.findall(r'onclick=["\']window\.location\.href=["\']#["\']', content))
                result['broken_links'] = broken_links
            self.results['tests'].append(('hub', result))
            status = '✅' if result.get('broken_links', 0) == 0 else '⚠️'
            print(f"  {status} {desc}: {file} ({result.get('broken_links', 0)} broken links)")
        
        # Test 7: Business Portal
        print("\n7️⃣ Testing Business Portal...")
        portal_files = [
            ('business-portal.html', 'English portal'),
            ('business-portal-de.html', 'German portal'),
        ]
        for file, desc in portal_files:
            result = self.test_file_exists(file)
            # Check if links to carousel
            if result['exists']:
                content = (self.base_dir / file).read_text(encoding='utf-8', errors='ignore')
                links_to_carousel = 'combined-profile-carousel' in content
                result['links_to_carousel'] = links_to_carousel
            self.results['tests'].append(('business_portal', result))
            status = '✅' if result.get('links_to_carousel', False) else '❌'
            print(f"  {status} {desc}: {file} ({'Links to carousel' if result.get('links_to_carousel') else 'Missing link'})")
        
        # Test 8: Belt Stripe Files (White through Black)
        print("\n8️⃣ Testing Belt Stripe Files...")
        belt_colors = ['white', 'blue', 'purple', 'brown', 'black']
        for color in belt_colors:
            for stripe in range(1, 5):
                en_file = f'{color}-belt-stripe{stripe}-gamified.html'
                de_file = f'{color}-belt-stripe{stripe}-gamified-de.html'
                en_result = self.test_file_exists(en_file)
                de_result = self.test_file_exists(de_file)
                self.results['tests'].append(('belt_stripe', {
                    'belt': color,
                    'stripe': stripe,
                    'en': en_result,
                    'de': de_result
                }))
                if stripe == 1:  # Only print first stripe to avoid clutter
                    print(f"  📋 {color.capitalize()} Belt:")
                if stripe <= 2:  # Show first 2 stripes
                    en_status = '✅' if en_result['exists'] else '❌'
                    de_status = '✅' if de_result['exists'] else '❌'
                    print(f"     Stripe {stripe}: EN {en_status} | DE {de_status}")
        
        # Generate Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.results['tests'])
        passed = sum(1 for test in self.results['tests'] 
                    if isinstance(test[1], dict) and test[1].get('exists', test[1].get('functional', False)))
        
        self.results['summary'] = {
            'total_tests': total_tests,
            'passed': passed,
            'failed': total_tests - passed,
            'success_rate': f"{(passed/total_tests*100):.1f}%" if total_tests > 0 else "0%"
        }
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed}")
        print(f"Failed: {total_tests - passed}")
        print(f"Success Rate: {self.results['summary']['success_rate']}")
        
        # Save results
        report_file = self.base_dir / 'COMPREHENSIVE-TEST-REPORT.json'
        with open(report_file, 'w') as f:
            json.dump(self.results, f, indent=2)
        
        print(f"\n📄 Full report saved to: {report_file}")
        return self.results

if __name__ == '__main__':
    tester = ApplicationTester('/Users/marcok./tap-in-netlify-deploy')
    results = tester.run_comprehensive_test()

