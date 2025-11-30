#!/usr/bin/env python3
"""
Comprehensive Audit Report for German Translation Files
Checks all 8 files against established guidelines
"""

import re
from pathlib import Path
from collections import defaultdict

def audit_file(filepath: Path):
    """Comprehensive audit of a German translation file"""
    
    if not filepath.exists():
        return {'status': 'error', 'reason': 'File not found'}
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    warnings = []
    passed = []
    
    # 1. Check lang="de"
    if '<html' in content:
        if 'lang="de"' not in content and 'lang=\'de\'' not in content:
            issues.append(('CRITICAL', 'Missing lang="de" attribute on <html> tag'))
        else:
            passed.append(('lang attribute', 'Correctly set to "de"'))
    
    # 2. Check for Sie-form (should be Du-form)
    sie_patterns = [
        (r'\bSie\s+', 'Sie (capital S)'),
        (r'\bIhre\s+', 'Ihre (possessive)'),
        (r'\bIhr\s+', 'Ihr (possessive)'),
        (r'\bIhnen\b', 'Ihnen (dative)'),
    ]
    for pattern, desc in sie_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            # Filter out false positives (like "Sie" in "Assess-Sie")
            actual_sie = [m for m in matches if re.search(r'\b' + m + r'[a-z]', content, re.IGNORECASE) is None]
            if actual_sie:
                count = len(set(actual_sie))
                issues.append(('CRITICAL', f'Found {count} instances of "{desc}" - should use Du-form'))
    
    # 3. Check internal links (should point to -de.html)
    html_links = re.findall(r'href="([^"]+\.html)"', content)
    for link in html_links:
        if link.startswith('http') or link.startswith('//') or link.startswith('#'):
            continue
        if '-de.html' not in link and link.endswith('.html'):
            # Check if it's a legitimate exception (external, CDN, etc.)
            if 'purple-belt-de.html' in link or 'blue-belt-de.html' in link:
                # This is fine
                continue
            issues.append(('CRITICAL', f'Link "{link}" should point to "{link.replace(".html", "-de.html")}"'))
    
    # 4. Check for untranslated English UI elements
    english_ui = [
        ('Test Your Knowledge', 'UI: Quiz header'),
        ('Question \d+ of', 'UI: Question numbering'),
        ('You scored', 'UI: Score display'),
        ('Continue', 'UI: Continue button'),
        ('Back to', 'UI: Navigation link'),
        ('Mark Complete', 'UI: Button text'),
        ('Begin Assessment', 'UI: Start button'),
        ('See Results', 'UI: Results button'),
        ('Next', 'UI: Next button'),
        ('Previous', 'UI: Previous button'),
        ('Submit', 'UI: Submit button'),
    ]
    for pattern, desc in english_ui:
        if re.search(pattern, content, re.IGNORECASE):
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            warnings.append((desc, f'Found {matches} untranslated instance(s): "{pattern}"'))
    
    # 5. Check quiz content
    quiz_questions = re.findall(r'<p[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]+)</p>', content)
    english_in_questions = 0
    for q in quiz_questions:
        # Simple heuristic: if question is mostly English
        german_words = len(re.findall(r'\b(der|die|das|und|ist|sind|zu|für|mit|von|auf|in|ein|eine|eines|du|dein|deine|was|wie|warum|wo|wann|wer)\b', q, re.IGNORECASE))
        total_words = len(q.split())
        if total_words > 0 and german_words / total_words < 0.3:
            english_in_questions += 1
    
    if english_in_questions > 0:
        warnings.append(('Quiz Questions', f'{english_in_questions} question(s) appear to be in English'))
    
    # 6. Check for energetic tone indicators
    energetic_phrases = ['Los geht\'s', 'Perfekt', 'Du schaffst', 'Super', 'Fantastisch', 'Ausgezeichnet']
    has_energetic = any(phrase in content for phrase in energetic_phrases)
    if has_energetic:
        passed.append(('Energetic tone', 'Contains motivational phrases'))
    else:
        warnings.append(('Tone', 'Missing energetic/motivational phrases'))
    
    # 7. Check function names (should be in English)
    js_functions = re.findall(r'function\s+(\w+)', content)
    german_functions = [f for f in js_functions if re.search(r'\b(abschließen|markieren|anzeigen|auswählen|berechnen|prüfen|speichern)\b', f, re.IGNORECASE)]
    if german_functions:
        warnings.append(('JavaScript', f'Function names in German (should be English): {", ".join(german_functions[:3])}'))
    else:
        passed.append(('Function names', 'JavaScript functions correctly in English'))
    
    # 8. Check technical terms (should keep English)
    tech_terms_ok = True
    tech_replacements = [
        ('Erfahrungspunkt', 'XP'),
        ('Niveau', 'Level'),
        ('Stufe', 'Level'),
    ]
    for wrong, correct in tech_replacements:
        if wrong in content:
            tech_terms_ok = False
            warnings.append(('Technical terms', f'Found "{wrong}" - should use "{correct}"'))
    
    if tech_terms_ok:
        passed.append(('Technical terms', 'Correctly using English terms (XP, Level, etc.)'))
    
    # 9. Check quiz explanations
    explanations = re.findall(r'data-explanation="([^"]+)"', content)
    english_explanations = 0
    for exp in explanations:
        german_words = len(re.findall(r'\b(der|die|das|und|ist|sind|zu|für|mit|von|auf|in|ein|eine|du|dein|deine)\b', exp, re.IGNORECASE))
        total_words = len(exp.split())
        if total_words > 3 and german_words / total_words < 0.3:
            english_explanations += 1
    
    if english_explanations > len(explanations) * 0.3:
        issues.append(('MAJOR', f'{english_explanations}/{len(explanations)} quiz explanations appear to be in English'))
    
    # 10. Check scenario/discovery content
    scenario_text = re.findall(r'<p class="scenario-question">([^<]+)</p>', content)
    discovery_text = re.findall(r'<p class="discovery-question">([^<]+)</p>', content)
    
    all_interactive_content = scenario_text + discovery_text
    english_interactive = 0
    for text in all_interactive_content:
        german_words = len(re.findall(r'\b(der|die|das|und|ist|sind|zu|für|mit|von|auf|in|ein|eine|du|dein|deine|was|wie|warum)\b', text, re.IGNORECASE))
        total_words = len(text.split())
        if total_words > 5 and german_words / total_words < 0.4:
            english_interactive += 1
    
    if english_interactive > len(all_interactive_content) * 0.3:
        warnings.append(('Interactive content', f'{english_interactive} scenario/discovery question(s) appear to be in English'))
    
    # 11. Check for mixed language patterns (von/der with English)
    mixed_patterns = [
        (r'\bvon\s+[A-Z][a-z]+\s+team', 'Mixed: "von [English] team"'),
        (r'\bder\s+[A-Z][a-z]+\s+[A-Z]', 'Mixed: "der [English] [English]"'),
        (r'you\s+can\s+[a-z]+', 'Mixed: English phrase in German content'),
    ]
    for pattern, desc in mixed_patterns:
        if re.search(pattern, content, re.IGNORECASE):
            matches = len(re.findall(pattern, content, re.IGNORECASE))
            warnings.append(('Mixed language', f'Found {matches} instance(s) of mixed English/German: {desc}'))
    
    return {
        'status': 'ok',
        'issues': issues,
        'warnings': warnings,
        'passed': passed,
        'score': len(passed) / (len(issues) + len(warnings) + len(passed)) * 100 if (issues + warnings + passed) else 0
    }

def main():
    """Generate comprehensive audit report"""
    
    files = [
        ('Purple Belt Stripe 1', Path('/Users/marcok./Downloads/purple-belt-stripe1-gamified-de.html')),
        ('Purple Belt Stripe 2', Path('/Users/marcok./Downloads/purple-belt-stripe2-gamified-de.html')),
        ('Purple Belt Stripe 3', Path('/Users/marcok./Downloads/purple-belt-stripe3-gamified-de.html')),
        ('Purple Belt Stripe 4', Path('/Users/marcok./Downloads/purple-belt-stripe4-gamified-de.html')),
        ('Blue Belt Stripe 1', Path('/Users/marcok./Downloads/blue-belt-stripe1-gamified-de.html')),
        ('Blue Belt Stripe 2', Path('/Users/marcok./Downloads/blue-belt-stripe2-gamified-de.html')),
        ('Blue Belt Stripe 3', Path('/Users/marcok./Downloads/blue-belt-stripe3-gamified-de.html')),
        ('Blue Belt Stripe 4', Path('/Users/marcok./Downloads/blue-belt-stripe4-gamified-de.html')),
    ]
    
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE GERMAN TRANSLATION AUDIT REPORT")
    print("=" * 80)
    print("\nGuidelines Checked:")
    print("  ✓ Du-form (never Sie)")
    print("  ✓ Energetic, motivational tone")
    print("  ✓ Technical terms in English (XP, Level, Belt)")
    print("  ✓ All links → -de.html versions")
    print("  ✓ Function names in English")
    print("  ✓ lang='de' attribute")
    print("  ✓ Natural German flow")
    print("  ✓ Quiz questions/answers translated")
    print("  ✓ UI elements translated")
    print("\n" + "=" * 80)
    
    total_issues = 0
    total_warnings = 0
    total_passed = 0
    
    report_data = []
    
    for name, filepath in files:
        print(f"\n📄 {name}")
        print("-" * 80)
        
        result = audit_file(filepath)
        
        if result['status'] == 'error':
            print(f"   ❌ ERROR: {result['reason']}")
            continue
        
        issues = result['issues']
        warnings = result['warnings']
        passed = result['passed']
        
        total_issues += len(issues)
        total_warnings += len(warnings)
        total_passed += len(passed)
        
        # Critical issues
        critical = [i for i in issues if i[0] == 'CRITICAL']
        major = [i for i in issues if i[0] == 'MAJOR']
        other_issues = [i for i in issues if i[0] not in ['CRITICAL', 'MAJOR']]
        
        if critical:
            print(f"   🚨 CRITICAL ISSUES ({len(critical)}):")
            for level, msg in critical:
                print(f"      • {msg}")
        
        if major:
            print(f"   ⚠️  MAJOR ISSUES ({len(major)}):")
            for level, msg in major:
                print(f"      • {msg}")
        
        if other_issues:
            print(f"   ⚠️  OTHER ISSUES ({len(other_issues)}):")
            for level, msg in other_issues:
                print(f"      • {msg}")
        
        if warnings:
            print(f"   ⚡ WARNINGS ({len(warnings)}):")
            for category, msg in warnings[:5]:  # Show first 5
                print(f"      • {category}: {msg}")
            if len(warnings) > 5:
                print(f"      ... and {len(warnings) - 5} more")
        
        if passed:
            print(f"   ✅ PASSED ({len(passed)}):")
            for category, msg in passed:
                print(f"      ✓ {category}: {msg}")
        
        # Score
        score = result['score']
        if score >= 90:
            status_emoji = "🟢"
        elif score >= 70:
            status_emoji = "🟡"
        else:
            status_emoji = "🔴"
        
        print(f"\n   {status_emoji} Quality Score: {score:.0f}%")
        
        report_data.append({
            'name': name,
            'critical': len(critical),
            'major': len(major),
            'other_issues': len(other_issues),
            'warnings': len(warnings),
            'passed': len(passed),
            'score': score
        })
    
    # Summary
    print("\n" + "=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    print(f"\nTotal Files Audited: {len(files)}")
    print(f"Total Critical Issues: {total_issues}")
    print(f"Total Warnings: {total_warnings}")
    print(f"Total Checks Passed: {total_passed}")
    
    print(f"\n📋 File-by-File Scores:")
    for data in report_data:
        status = "🟢" if data['score'] >= 90 else "🟡" if data['score'] >= 70 else "🔴"
        print(f"   {status} {data['name']}: {data['score']:.0f}% ({data['critical']} critical, {data['major']} major, {data['warnings']} warnings)")
    
    # Overall assessment
    avg_score = sum(d['score'] for d in report_data) / len(report_data) if report_data else 0
    print(f"\n🎯 Overall Average Score: {avg_score:.0f}%")
    
    if avg_score >= 90:
        print("   ✅ EXCELLENT - Ready for production")
    elif avg_score >= 70:
        print("   ⚠️  GOOD - Some improvements needed")
    else:
        print("   🚨 NEEDS WORK - Significant issues to address")
    
    print("\n" + "=" * 80)
    print("✅ Audit Complete")
    print("=" * 80)

if __name__ == '__main__':
    main()

