#!/usr/bin/env python3
"""
Comprehensive Functionality Audit Script
Tests every aspect of the TAP-IN application
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict
from datetime import datetime

class FunctionalityAuditor:
    def __init__(self, root_dir):
        self.root_dir = Path(root_dir)
        self.issues = []
        self.warnings = []
        self.info = []
        self.stats = {
            'files_checked': 0,
            'links_found': 0,
            'scripts_found': 0,
            'functions_found': 0,
            'issues_found': 0,
            'warnings_found': 0
        }
        
    def audit(self):
        print("🔍 Starting Comprehensive Functionality Audit...")
        print("=" * 70)
        
        # 1. File Structure Audit
        self.audit_file_structure()
        
        # 2. Link Integrity Audit
        self.audit_links()
        
        # 3. JavaScript Functionality
        self.audit_javascript()
        
        # 4. Form Validation
        self.audit_forms()
        
        # 5. Data Persistence
        self.audit_data_persistence()
        
        # 6. User Flows
        self.audit_user_flows()
        
        # 7. Error Handling
        self.audit_error_handling()
        
        # 8. German Translation Completeness
        self.audit_translations()
        
        # 9. Resource Loading
        self.audit_resources()
        
        # 10. Critical Files
        self.audit_critical_files()
        
        self.generate_report()
        
    def audit_file_structure(self):
        print("\n📁 1. FILE STRUCTURE AUDIT")
        print("-" * 70)
        
        critical_files = [
            'index.html',
            'index-de.html',
            'join-team.html',
            'join-team-de.html',
            'src/pages/assessments/deep-dive-assessment.html',
            'src/pages/gym/gym-dashboard.html',
            'src/pages/gym/gym-dashboard-de.html',
            'src/pages/tools/restore-progress.html',
            'src/pages/hub/hub-home-BUSINESS.html',
            'js/core/dom.js',
            'js/core/progress.js',
            'js/core/results.js',
            'js/core/quiz.js',
            'js/core/lessons.js',
            'manifest.json',
            '_headers',
            '_redirects'
        ]
        
        missing = []
        for file_path in critical_files:
            full_path = self.root_dir / file_path
            if not full_path.exists():
                missing.append(file_path)
                self.issues.append({
                    'category': 'File Structure',
                    'severity': 'CRITICAL',
                    'file': file_path,
                    'issue': f'Critical file missing: {file_path}',
                    'impact': 'Application will not function correctly'
                })
            else:
                self.info.append(f'✅ Found: {file_path}')
        
        if missing:
            print(f"❌ Missing {len(missing)} critical files")
        else:
            print("✅ All critical files present")
            
    def audit_links(self):
        print("\n🔗 2. LINK INTEGRITY AUDIT")
        print("-" * 70)
        
        html_files = list(self.root_dir.rglob('*.html'))
        broken_links = []
        external_links = []
        internal_links = []
        
        for html_file in html_files:
            if 'node_modules' in str(html_file) or 'archive' in str(html_file):
                continue
                
            try:
                content = html_file.read_text(encoding='utf-8')
                
                # Find all href and src attributes
                href_pattern = r'href=["\']([^"\']+)["\']'
                src_pattern = r'src=["\']([^"\']+)["\']'
                
                for match in re.finditer(href_pattern, content):
                    link = match.group(1)
                    if link.startswith('#'):
                        continue  # Anchor links
                    if link.startswith('http://') or link.startswith('https://'):
                        external_links.append((str(html_file.relative_to(self.root_dir)), link))
                        continue
                    if link.startswith('mailto:') or link.startswith('tel:'):
                        continue
                    
                    # Resolve relative path
                    link_path = (html_file.parent / link).resolve()
                    if not link_path.exists() and not link.startswith('data:'):
                        broken_links.append({
                            'file': str(html_file.relative_to(self.root_dir)),
                            'link': link,
                            'expected': str(link_path.relative_to(self.root_dir))
                        })
                    else:
                        internal_links.append((str(html_file.relative_to(self.root_dir)), link))
                        
                for match in re.finditer(src_pattern, content):
                    link = match.group(1)
                    if link.startswith('http://') or link.startswith('https://'):
                        continue
                    if link.startswith('data:'):
                        continue
                    
                    link_path = (html_file.parent / link).resolve()
                    if not link_path.exists():
                        broken_links.append({
                            'file': str(html_file.relative_to(self.root_dir)),
                            'link': link,
                            'expected': str(link_path.relative_to(self.root_dir))
                        })
                        
            except Exception as e:
                self.warnings.append({
                    'category': 'Link Audit',
                    'file': str(html_file),
                    'warning': f'Could not read file: {e}'
                })
        
        if broken_links:
            print(f"❌ Found {len(broken_links)} broken links")
            for broken in broken_links[:10]:  # Show first 10
                self.issues.append({
                    'category': 'Link Integrity',
                    'severity': 'HIGH',
                    'file': broken['file'],
                    'issue': f"Broken link: {broken['link']}",
                    'expected': broken['expected']
                })
        else:
            print("✅ No broken internal links found")
            
        print(f"📊 Stats: {len(internal_links)} internal, {len(external_links)} external links")
        self.stats['links_found'] = len(internal_links) + len(external_links)
        
    def audit_javascript(self):
        print("\n⚙️ 3. JAVASCRIPT FUNCTIONALITY AUDIT")
        print("-" * 70)
        
        js_files = list(self.root_dir.rglob('*.js'))
        html_files = list(self.root_dir.rglob('*.html'))
        
        functions_called = set()
        functions_defined = set()
        missing_functions = []
        
        # Find all function definitions
        for js_file in js_files:
            if 'node_modules' in str(js_file):
                continue
            try:
                content = js_file.read_text(encoding='utf-8')
                # Find function definitions
                func_defs = re.findall(r'function\s+(\w+)\s*\(', content)
                functions_defined.update(func_defs)
                
                # Find arrow functions
                arrow_funcs = re.findall(r'const\s+(\w+)\s*=\s*\([^)]*\)\s*=>', content)
                functions_defined.update(arrow_funcs)
            except:
                pass
        
        # Find function calls in HTML
        for html_file in html_files:
            if 'node_modules' in str(html_file) or 'archive' in str(html_file):
                continue
            try:
                content = html_file.read_text(encoding='utf-8')
                # Find onclick, onsubmit, etc.
                onclick_calls = re.findall(r'onclick=["\']([^"\']+)["\']', content)
                for call in onclick_calls:
                    func_match = re.search(r'(\w+)\s*\(', call)
                    if func_match:
                        func_name = func_match.group(1)
                        functions_called.add(func_name)
                        
                # Find addEventListener calls
                listener_calls = re.findall(r'addEventListener\s*\(\s*["\'](\w+)["\']', content)
                # Find script tags with function calls
                script_content = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
                for script in script_content:
                    func_calls = re.findall(r'(\w+)\s*\(', script)
                    functions_called.update(func_calls)
            except:
                pass
        
        # Check for undefined functions
        for func in functions_called:
            if func not in functions_defined and func not in ['console', 'document', 'window', 'localStorage', 'JSON', 'Date', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'addEventListener', 'removeEventListener', 'querySelector', 'querySelectorAll', 'getElementById', 'getElementsByClassName', 'createElement', 'appendChild', 'removeChild', 'classList', 'setAttribute', 'getAttribute', 'removeAttribute', 'innerHTML', 'textContent', 'value', 'preventDefault', 'stopPropagation', 'parse', 'stringify', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'encodeURIComponent', 'decodeURIComponent', 'fetch', 'Promise', 'then', 'catch', 'finally', 'async', 'await']:
                missing_functions.append(func)
        
        if missing_functions:
            print(f"⚠️ Found {len(missing_functions)} potentially undefined functions")
            for func in missing_functions[:10]:
                self.warnings.append({
                    'category': 'JavaScript',
                    'severity': 'MEDIUM',
                    'issue': f'Function "{func}" may be undefined',
                    'impact': 'Could cause runtime errors'
                })
        else:
            print("✅ No obvious undefined functions")
            
        print(f"📊 Found {len(functions_defined)} function definitions, {len(functions_called)} function calls")
        self.stats['functions_found'] = len(functions_defined)
        
    def audit_forms(self):
        print("\n📝 4. FORM VALIDATION AUDIT")
        print("-" * 70)
        
        html_files = list(self.root_dir.rglob('*.html'))
        forms_found = 0
        forms_without_validation = []
        
        for html_file in html_files:
            if 'node_modules' in str(html_file) or 'archive' in str(html_file):
                continue
            try:
                content = html_file.read_text(encoding='utf-8')
                forms = re.findall(r'<form[^>]*>(.*?)</form>', content, re.DOTALL)
                for form in forms:
                    forms_found += 1
                    # Check for validation
                    has_required = 'required' in form
                    has_validation_js = 'validate' in form.lower() or 'checkValidity' in form
                    has_onsubmit = 'onsubmit' in form or 'addEventListener' in content
                    
                    if not (has_required or has_validation_js or has_onsubmit):
                        forms_without_validation.append(str(html_file.relative_to(self.root_dir)))
            except:
                pass
        
        if forms_without_validation:
            print(f"⚠️ Found {len(forms_without_validation)} forms without obvious validation")
            for form_file in forms_without_validation[:5]:
                self.warnings.append({
                    'category': 'Form Validation',
                    'file': form_file,
                    'issue': 'Form may lack client-side validation',
                    'impact': 'Could allow invalid data submission'
                })
        else:
            print("✅ Forms appear to have validation")
            
        print(f"📊 Found {forms_found} forms")
        
    def audit_data_persistence(self):
        print("\n💾 5. DATA PERSISTENCE AUDIT")
        print("-" * 70)
        
        html_files = list(self.root_dir.rglob('*.html'))
        js_files = list(self.root_dir.rglob('*.js'))
        
        localStorage_usage = []
        potential_data_loss = []
        
        for file in html_files + js_files:
            if 'node_modules' in str(file) or 'archive' in str(file):
                continue
            try:
                content = file.read_text(encoding='utf-8')
                # Find localStorage usage
                ls_matches = re.findall(r'localStorage\.(setItem|getItem|removeItem|clear)\s*\(', content)
                if ls_matches:
                    localStorage_usage.append({
                        'file': str(file.relative_to(self.root_dir)),
                        'operations': len(ls_matches)
                    })
                    
                # Check for data that should be persisted
                if 'assessment' in content.lower() and 'localStorage' not in content:
                    if 'result' in content.lower() or 'score' in content.lower():
                        potential_data_loss.append(str(file.relative_to(self.root_dir)))
            except:
                pass
        
        if potential_data_loss:
            print(f"⚠️ Found {len(potential_data_loss)} files that may not persist data")
            for file in potential_data_loss[:5]:
                self.warnings.append({
                    'category': 'Data Persistence',
                    'file': file,
                    'issue': 'May not persist user data',
                    'impact': 'User progress could be lost'
                })
        else:
            print("✅ Data persistence appears implemented")
            
        print(f"📊 Found localStorage usage in {len(localStorage_usage)} files")
        
    def audit_user_flows(self):
        print("\n👤 6. USER FLOWS AUDIT")
        print("-" * 70)
        
        # Critical user flows to verify
        flows = [
            {
                'name': 'Landing Page → Assessment',
                'steps': [
                    'index.html',
                    'src/pages/assessments/deep-dive-assessment.html'
                ]
            },
            {
                'name': 'Landing Page → Gym Dashboard',
                'steps': [
                    'index.html',
                    'src/pages/gym/gym-dashboard.html'
                ]
            },
            {
                'name': 'Join Team Flow',
                'steps': [
                    'join-team.html',
                    'src/pages/hub/hub-home-BUSINESS.html'
                ]
            },
            {
                'name': 'Restore Progress Flow',
                'steps': [
                    'src/pages/tools/restore-progress.html',
                    'src/pages/gym/gym-dashboard.html'
                ]
            }
        ]
        
        broken_flows = []
        for flow in flows:
            all_exist = True
            for step in flow['steps']:
                if not (self.root_dir / step).exists():
                    all_exist = False
                    broken_flows.append(flow['name'])
                    break
            if all_exist:
                self.info.append(f"✅ Flow complete: {flow['name']}")
        
        if broken_flows:
            print(f"❌ {len(broken_flows)} broken user flows")
            for flow_name in broken_flows:
                self.issues.append({
                    'category': 'User Flows',
                    'severity': 'HIGH',
                    'issue': f'Broken user flow: {flow_name}',
                    'impact': 'Users cannot complete this journey'
                })
        else:
            print("✅ All critical user flows intact")
            
    def audit_error_handling(self):
        print("\n🛡️ 7. ERROR HANDLING AUDIT")
        print("-" * 70)
        
        js_files = list(self.root_dir.rglob('*.js'))
        html_files = list(self.root_dir.rglob('*.html'))
        
        files_without_error_handling = []
        files_with_error_handling = []
        
        for file in js_files + html_files:
            if 'node_modules' in str(file) or 'archive' in str(file):
                continue
            try:
                content = file.read_text(encoding='utf-8')
                has_try_catch = 'try' in content and 'catch' in content
                has_error_handler = 'error' in content.lower() and ('handler' in content.lower() or 'catch' in content)
                has_null_check = 'if' in content and ('null' in content or 'undefined' in content)
                
                if has_try_catch or has_error_handler or has_null_check:
                    files_with_error_handling.append(str(file.relative_to(self.root_dir)))
                else:
                    # Check if it's a critical file that should have error handling
                    if 'assessment' in str(file).lower() or 'dashboard' in str(file).lower():
                        if 'localStorage' in content or 'getElementById' in content:
                            files_without_error_handling.append(str(file.relative_to(self.root_dir)))
            except:
                pass
        
        if files_without_error_handling:
            print(f"⚠️ Found {len(files_without_error_handling)} files that may lack error handling")
            for file in files_without_error_handling[:5]:
                self.warnings.append({
                    'category': 'Error Handling',
                    'file': file,
                    'issue': 'May lack error handling',
                    'impact': 'Could crash on unexpected input'
                })
        else:
            print("✅ Error handling appears comprehensive")
            
        print(f"📊 {len(files_with_error_handling)} files with error handling")
        
    def audit_translations(self):
        print("\n🌍 8. TRANSLATION COMPLETENESS AUDIT")
        print("-" * 70)
        
        english_files = list(self.root_dir.rglob('*.html'))
        english_files = [f for f in english_files if '-de' not in str(f) and 'de.html' not in str(f) and 'node_modules' not in str(f) and 'archive' not in str(f)]
        
        missing_translations = []
        for en_file in english_files[:20]:  # Check first 20
            file_str = str(en_file)
            if 'index.html' in file_str or 'join-team.html' in file_str:
                # Check for German version
                de_file = file_str.replace('.html', '-de.html').replace('index.html', 'index-de.html')
                if not (self.root_dir / de_file).exists():
                    missing_translations.append(file_str)
        
        if missing_translations:
            print(f"⚠️ Found {len(missing_translations)} files without German translations")
            for file in missing_translations[:5]:
                self.warnings.append({
                    'category': 'Translations',
                    'file': file,
                    'issue': 'Missing German translation',
                    'impact': 'German users see English content'
                })
        else:
            print("✅ Critical pages have German translations")
            
    def audit_resources(self):
        print("\n📦 9. RESOURCE LOADING AUDIT")
        print("-" * 70)
        
        html_files = list(self.root_dir.rglob('*.html'))
        missing_resources = []
        
        for html_file in html_files[:10]:  # Check first 10
            if 'node_modules' in str(html_file) or 'archive' in str(html_file):
                continue
            try:
                content = html_file.read_text(encoding='utf-8')
                # Find CSS and JS references
                css_links = re.findall(r'<link[^>]+href=["\']([^"\']+\.css)["\']', content)
                js_scripts = re.findall(r'<script[^>]+src=["\']([^"\']+\.js)["\']', content)
                
                for resource in css_links + js_scripts:
                    if resource.startswith('http'):
                        continue
                    resource_path = (html_file.parent / resource).resolve()
                    if not resource_path.exists():
                        missing_resources.append({
                            'file': str(html_file.relative_to(self.root_dir)),
                            'resource': resource
                        })
            except:
                pass
        
        if missing_resources:
            print(f"❌ Found {len(missing_resources)} missing resources")
            for res in missing_resources[:5]:
                self.issues.append({
                    'category': 'Resource Loading',
                    'severity': 'HIGH',
                    'file': res['file'],
                    'issue': f"Missing resource: {res['resource']}",
                    'impact': 'Page may not load correctly'
                })
        else:
            print("✅ Resources appear to load correctly")
            
    def audit_critical_files(self):
        print("\n🎯 10. CRITICAL FILES AUDIT")
        print("-" * 70)
        
        critical_checks = [
            {
                'file': 'src/pages/assessments/deep-dive-assessment.html',
                'check': 'Has question logic',
                'pattern': r'question|assessment|quiz'
            },
            {
                'file': 'src/pages/gym/gym-dashboard.html',
                'check': 'Has belt progression',
                'pattern': r'belt|stripe|progress'
            },
            {
                'file': 'join-team.html',
                'check': 'Has team code input',
                'pattern': r'team.*code|join.*team'
            },
            {
                'file': 'src/pages/tools/restore-progress.html',
                'check': 'Has backup code input',
                'pattern': r'backup.*code|restore'
            }
        ]
        
        for check in critical_checks:
            file_path = self.root_dir / check['file']
            if file_path.exists():
                content = file_path.read_text(encoding='utf-8', errors='ignore')
                if re.search(check['pattern'], content, re.IGNORECASE):
                    self.info.append(f"✅ {check['file']}: {check['check']}")
                else:
                    self.warnings.append({
                        'category': 'Critical Files',
                        'file': check['file'],
                        'issue': f"May be missing: {check['check']}",
                        'impact': 'Feature may not work as expected'
                    })
            else:
                self.issues.append({
                    'category': 'Critical Files',
                    'severity': 'CRITICAL',
                    'file': check['file'],
                    'issue': 'Critical file missing',
                    'impact': 'Application cannot function'
                })
        
    def generate_report(self):
        print("\n" + "=" * 70)
        print("📊 AUDIT SUMMARY")
        print("=" * 70)
        
        print(f"\n✅ Info Items: {len(self.info)}")
        print(f"⚠️ Warnings: {len(self.warnings)}")
        print(f"❌ Issues: {len(self.issues)}")
        
        # Generate JSON report
        report = {
            'timestamp': datetime.now().isoformat(),
            'summary': {
                'info': len(self.info),
                'warnings': len(self.warnings),
                'issues': len(self.issues),
                'critical_issues': len([i for i in self.issues if i.get('severity') == 'CRITICAL'])
            },
            'stats': self.stats,
            'issues': self.issues,
            'warnings': self.warnings,
            'info': self.info[:50]  # First 50 info items
        }
        
        report_file = self.root_dir / 'FUNCTIONALITY-AUDIT-REPORT.json'
        report_file.write_text(json.dumps(report, indent=2))
        
        # Generate markdown report
        md_report = self.generate_markdown_report(report)
        md_file = self.root_dir / 'FUNCTIONALITY-AUDIT-REPORT.md'
        md_file.write_text(md_report)
        
        print(f"\n📄 Reports generated:")
        print(f"   - {report_file}")
        print(f"   - {md_file}")
        
    def generate_markdown_report(self, report):
        md = f"""# 🔍 COMPREHENSIVE FUNCTIONALITY AUDIT REPORT

**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Status:** {'✅ PASS' if report['summary']['critical_issues'] == 0 else '⚠️ ISSUES FOUND'}

---

## 📊 EXECUTIVE SUMMARY

- **Total Issues:** {report['summary']['issues']}
- **Critical Issues:** {report['summary']['critical_issues']}
- **Warnings:** {report['summary']['warnings']}
- **Info Items:** {report['summary']['info']}

---

## ❌ CRITICAL ISSUES ({report['summary']['critical_issues']})

"""
        
        critical_issues = [i for i in report['issues'] if i.get('severity') == 'CRITICAL']
        if critical_issues:
            for issue in critical_issues:
                md += f"### {issue.get('category', 'Unknown')}\n"
                md += f"- **File:** `{issue.get('file', 'N/A')}`\n"
                md += f"- **Issue:** {issue.get('issue', 'N/A')}\n"
                md += f"- **Impact:** {issue.get('impact', 'N/A')}\n\n"
        else:
            md += "✅ No critical issues found!\n\n"
        
        md += f"""
## ⚠️ HIGH PRIORITY ISSUES ({len([i for i in report['issues'] if i.get('severity') == 'HIGH'])})

"""
        
        high_issues = [i for i in report['issues'] if i.get('severity') == 'HIGH']
        for issue in high_issues[:20]:  # First 20
            md += f"- **{issue.get('category', 'Unknown')}** - `{issue.get('file', 'N/A')}`: {issue.get('issue', 'N/A')}\n"
        
        md += f"""
## ⚠️ WARNINGS ({len(report['warnings'])})

"""
        
        # Group warnings by category
        warnings_by_category = defaultdict(list)
        for warning in report['warnings']:
            warnings_by_category[warning.get('category', 'Unknown')].append(warning)
        
        for category, warnings in warnings_by_category.items():
            md += f"### {category}\n"
            for warning in warnings[:10]:  # First 10 per category
                md += f"- `{warning.get('file', 'N/A')}`: {warning.get('issue', 'N/A')}\n"
            md += "\n"
        
        md += f"""
## 📈 STATISTICS

- **Files Checked:** {report['stats']['files_checked']}
- **Links Found:** {report['stats']['links_found']}
- **Functions Found:** {report['stats']['functions_found']}
- **Scripts Found:** {report['stats']['scripts_found']}

---

## ✅ RECOMMENDATIONS

1. **Fix all critical issues immediately**
2. **Address high-priority issues before deployment**
3. **Review warnings for potential improvements**
4. **Test all user flows manually**
5. **Verify all links work in production environment**

---

*Report generated automatically by comprehensive-functionality-audit.py*
"""
        
        return md

if __name__ == '__main__':
    auditor = FunctionalityAuditor('/Users/marcok./tap-in-netlify-deploy')
    auditor.audit()

