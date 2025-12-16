#!/usr/bin/env python3
"""
TAP-IN E2E Testing Automation Script
Performs automated checks for broken links, missing files, and common issues
"""

import os
import re
import json
from pathlib import Path
from urllib.parse import urlparse

class E2ETester:
    def __init__(self, root_dir='.'):
        self.root_dir = Path(root_dir)
        self.issues = {
            'critical': [],
            'high': [],
            'medium': [],
            'low': []
        }
        self.broken_links = []
        self.missing_files = []
        self.console_errors = []
        self.passed_tests = []
        
    def check_file_exists(self, filepath):
        """Check if a file exists"""
        full_path = self.root_dir / filepath
        return full_path.exists()
    
    def resolve_path(self, base_file, link):
        """Resolve a relative or absolute link to an actual file path"""
        base_path = Path(base_file).parent
        
        # Skip external links
        if link.startswith('http://') or link.startswith('https://') or link.startswith('//'):
            return None
        
        # Skip anchors and javascript
        if link.startswith('#') or link.startswith('javascript:'):
            return None
        
        # Skip mailto and tel
        if link.startswith('mailto:') or link.startswith('tel:'):
            return None
        
        # Handle absolute paths
        if link.startswith('/'):
            resolved = self.root_dir / link.lstrip('/')
        else:
            # Relative path
            resolved = (base_path / link).resolve()
            # Make relative to root
            try:
                resolved = resolved.relative_to(self.root_dir.resolve())
            except ValueError:
                # Path outside root
                return None
        
        return str(resolved)
    
    def find_links_in_file(self, filepath):
        """Find all links (href, src) in an HTML file"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return []
        
        links = []
        
        # Find href attributes
        href_pattern = r'href=["\']([^"\']+)["\']'
        for match in re.finditer(href_pattern, content):
            links.append(('href', match.group(1), match.start()))
        
        # Find src attributes
        src_pattern = r'src=["\']([^"\']+)["\']'
        for match in re.finditer(src_pattern, content):
            links.append(('src', match.group(1), match.start()))
        
        # Find use href (SVG)
        use_pattern = r'use\s+href=["\']([^"\']+)["\']'
        for match in re.finditer(use_pattern, content):
            links.append(('use', match.group(1), match.start()))
        
        return links
    
    def check_links_in_file(self, filepath):
        """Check all links in a file for broken references"""
        issues = []
        links = self.find_links_in_file(filepath)
        
        for link_type, link, position in links:
            resolved = self.resolve_path(filepath, link)
            
            if resolved is None:
                continue  # External or special link
            
            if not self.check_file_exists(resolved):
                issues.append({
                    'type': link_type,
                    'link': link,
                    'resolved': resolved,
                    'position': position
                })
        
        return issues
    
    def test_landing_page(self):
        """Test Phase 1: Landing Page"""
        print("\n" + "="*60)
        print("PHASE 1: LANDING PAGE TESTING")
        print("="*60)
        
        landing_files = ['index.html', 'index-DUAL-ENTRY.html', 'index-de.html']
        
        for landing_file in landing_files:
            if not self.check_file_exists(landing_file):
                self.issues['high'].append({
                    'file': landing_file,
                    'issue': 'Landing page file missing',
                    'phase': 'Phase 1'
                })
                continue
            
            print(f"\n✅ Testing: {landing_file}")
            self.passed_tests.append(f"Landing page exists: {landing_file}")
            
            # Check for broken links
            link_issues = self.check_links_in_file(landing_file)
            if link_issues:
                for issue in link_issues:
                    self.broken_links.append({
                        'source': landing_file,
                        'link': issue['link'],
                        'resolved': issue['resolved'],
                        'type': issue['type']
                    })
                    self.issues['high'].append({
                        'file': landing_file,
                        'issue': f"Broken {issue['type']} link: {issue['link']}",
                        'resolved': issue['resolved']
                    })
            else:
                self.passed_tests.append(f"All links valid in {landing_file}")
    
    def test_gym_dashboard(self):
        """Test Phase 2.1: Gym Dashboard"""
        print("\n" + "="*60)
        print("PHASE 2.1: GYM DASHBOARD TESTING")
        print("="*60)
        
        gym_files = [
            'src/pages/gym/gym-dashboard.html',
            'src/pages/gym/gym-home-FOCUSED.html'
        ]
        
        for gym_file in gym_files:
            if not self.check_file_exists(gym_file):
                self.issues['high'].append({
                    'file': gym_file,
                    'issue': 'Gym dashboard file missing',
                    'phase': 'Phase 2.1'
                })
                continue
            
            print(f"\n✅ Testing: {gym_file}")
            self.passed_tests.append(f"Gym dashboard exists: {gym_file}")
            
            # Check links
            link_issues = self.check_links_in_file(gym_file)
            if link_issues:
                for issue in link_issues:
                    self.broken_links.append({
                        'source': gym_file,
                        'link': issue['link'],
                        'resolved': issue['resolved'],
                        'type': issue['type']
                    })
    
    def test_belt_stripes(self):
        """Test Phase 2.2-2.6: All Belt Stripes"""
        print("\n" + "="*60)
        print("PHASE 2.2-2.6: BELT STRIPE TESTING")
        print("="*60)
        
        belts = ['white', 'blue', 'purple', 'brown', 'black']
        
        for belt in belts:
            print(f"\n🔍 Testing {belt.upper()} Belt...")
            
            # Check belt overview page
            belt_overview = f'src/pages/gym/{belt}-belt.html'
            if self.check_file_exists(belt_overview):
                self.passed_tests.append(f"{belt.capitalize()} belt overview exists")
                link_issues = self.check_links_in_file(belt_overview)
                if link_issues:
                    for issue in link_issues:
                        self.broken_links.append({
                            'source': belt_overview,
                            'link': issue['link'],
                            'resolved': issue['resolved']
                        })
            
            # Check all 4 stripes
            for stripe in range(1, 5):
                stripe_file = f'src/pages/gym/{belt}-belt-stripe{stripe}-gamified.html'
                if self.check_file_exists(stripe_file):
                    self.passed_tests.append(f"{belt.capitalize()} belt stripe {stripe} exists")
                    link_issues = self.check_links_in_file(stripe_file)
                    if link_issues:
                        for issue in link_issues:
                            self.broken_links.append({
                                'source': stripe_file,
                                'link': issue['link'],
                                'resolved': issue['resolved']
                            })
                else:
                    self.issues['high'].append({
                        'file': stripe_file,
                        'issue': f'{belt.capitalize()} belt stripe {stripe} missing',
                        'phase': f'Phase 2.{2 + belts.index(belt)}'
                    })
    
    def test_assessments(self):
        """Test Phase 4: Assessments"""
        print("\n" + "="*60)
        print("PHASE 4: ASSESSMENT TESTING")
        print("="*60)
        
        assessment_files = [
            'src/pages/assessments/deep-dive-assessment.html',
            'src/pages/assessments/leadership-style-carousel_de.html',
            'src/pages/assessments/talent-finder.html'
        ]
        
        for assessment_file in assessment_files:
            if self.check_file_exists(assessment_file):
                print(f"✅ Testing: {assessment_file}")
                self.passed_tests.append(f"Assessment exists: {assessment_file}")
                link_issues = self.check_links_in_file(assessment_file)
                if link_issues:
                    for issue in link_issues:
                        self.broken_links.append({
                            'source': assessment_file,
                            'link': issue['link'],
                            'resolved': issue['resolved']
                        })
            else:
                self.issues['medium'].append({
                    'file': assessment_file,
                    'issue': 'Assessment file missing',
                    'phase': 'Phase 4'
                })
    
    def test_games(self):
        """Test Phase 5: Games"""
        print("\n" + "="*60)
        print("PHASE 5: GAMES TESTING")
        print("="*60)
        
        game_files = [
            'src/pages/games/conflict-cards.html',
            'src/pages/games/take-the-back.html',
            'src/pages/games/disagree-commit.html',
            'src/pages/games/disagree-commit-roulette.html',
            'src/pages/games/confession-poker-v2.html'
        ]
        
        for game_file in game_files:
            if self.check_file_exists(game_file):
                print(f"✅ Testing: {game_file}")
                self.passed_tests.append(f"Game exists: {game_file}")
                link_issues = self.check_links_in_file(game_file)
                if link_issues:
                    for issue in link_issues:
                        self.broken_links.append({
                            'source': game_file,
                            'link': issue['link'],
                            'resolved': issue['resolved']
                        })
            else:
                self.issues['medium'].append({
                    'file': game_file,
                    'issue': 'Game file missing',
                    'phase': 'Phase 5'
                })
    
    def test_tools(self):
        """Test Phase 6: Tools"""
        print("\n" + "="*60)
        print("PHASE 6: TOOLS TESTING")
        print("="*60)
        
        tool_files = [
            'src/pages/tools/restore-progress.html',
            'src/pages/tools/tool-energy-audit.html',
            'src/pages/tools/tool-box-breathing.html',
            'src/pages/tools/tool-journal.html'
        ]
        
        for tool_file in tool_files:
            if self.check_file_exists(tool_file):
                print(f"✅ Testing: {tool_file}")
                self.passed_tests.append(f"Tool exists: {tool_file}")
                link_issues = self.check_links_in_file(tool_file)
                if link_issues:
                    for issue in link_issues:
                        self.broken_links.append({
                            'source': tool_file,
                            'link': issue['link'],
                            'resolved': issue['resolved']
                        })
    
    def test_team_features(self):
        """Test Phase 7: Team Features"""
        print("\n" + "="*60)
        print("PHASE 7: TEAM FEATURES TESTING")
        print("="*60)
        
        team_files = [
            'join-team.html',
            'src/pages/hub/team-dashboard.html'
        ]
        
        for team_file in team_files:
            if self.check_file_exists(team_file):
                print(f"✅ Testing: {team_file}")
                self.passed_tests.append(f"Team feature exists: {team_file}")
                link_issues = self.check_links_in_file(team_file)
                if link_issues:
                    for issue in link_issues:
                        self.broken_links.append({
                            'source': team_file,
                            'link': issue['link'],
                            'resolved': issue['resolved']
                        })
    
    def generate_report(self):
        """Generate final test report"""
        report = {
            'summary': {
                'total_issues': sum(len(issues) for issues in self.issues.values()),
                'critical': len(self.issues['critical']),
                'high': len(self.issues['high']),
                'medium': len(self.issues['medium']),
                'low': len(self.issues['low']),
                'broken_links': len(self.broken_links),
                'passed_tests': len(self.passed_tests)
            },
            'issues': self.issues,
            'broken_links': self.broken_links,
            'passed_tests': self.passed_tests
        }
        
        return report
    
    def run_all_tests(self):
        """Run all test phases"""
        print("🚀 Starting TAP-IN E2E Automated Testing")
        print("="*60)
        
        self.test_landing_page()
        self.test_gym_dashboard()
        self.test_belt_stripes()
        self.test_assessments()
        self.test_games()
        self.test_tools()
        self.test_team_features()
        
        report = self.generate_report()
        
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        print(f"✅ Passed Tests: {report['summary']['passed_tests']}")
        print(f"❌ Critical Issues: {report['summary']['critical']}")
        print(f"⚠️  High Priority: {report['summary']['high']}")
        print(f"⚠️  Medium Priority: {report['summary']['medium']}")
        print(f"⚠️  Low Priority: {report['summary']['low']}")
        print(f"🔗 Broken Links: {report['summary']['broken_links']}")
        
        return report

if __name__ == '__main__':
    tester = E2ETester('.')
    report = tester.run_all_tests()
    
    # Save report
    with open('e2e-test-results.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    print("\n✅ Test results saved to: e2e-test-results.json")

