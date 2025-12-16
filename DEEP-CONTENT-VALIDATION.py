#!/usr/bin/env python3
"""
Deep Content Validation Audit for Stripe Files
Validates design, content, gamification, and questionnaire variety
"""

import os
import re
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).parent

# All stripe files to validate
STRIPE_FILES = []
for belt in ['white', 'blue', 'purple', 'brown', 'black']:
    for stripe in [1, 2, 3, 4]:
        STRIPE_FILES.append(f'src/pages/gym/{belt}-belt-stripe{stripe}-gamified.html')

def get_file_size(filepath):
    """Get file size in bytes"""
    try:
        return Path(filepath).stat().st_size
    except:
        return 0

def count_words(content):
    """Count actual words in content (excluding HTML tags)"""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', content)
    # Remove script and style content
    text = re.sub(r'<script[^>]*>.*?</script>', ' ', text, flags=re.DOTALL)
    text = re.sub(r'<style[^>]*>.*?</style>', ' ', text, flags=re.DOTALL)
    # Count words
    words = [w for w in text.split() if len(w) > 2]
    return len(words)

def detect_questionnaire_format(content):
    """Detect questionnaire format type"""
    formats = []
    
    if 'carousel' in content.lower() or 'one question at a time' in content.lower():
        formats.append('Carousel')
    if 'slider' in content.lower() or 'input[type="range"]' in content:
        formats.append('Slider')
    if 'multiple choice' in content.lower() or 'quiz-option' in content:
        formats.append('Multiple Choice')
    if 'scenario' in content.lower() or 'situation' in content.lower():
        formats.append('Scenario-based')
    if 'self-assessment' in content.lower() or 'rate yourself' in content.lower():
        formats.append('Self-assessment')
    if 'grid' in content.lower() or 'matrix' in content.lower():
        formats.append('Grid')
    
    if not formats:
        # Check for quiz questions
        if 'quiz-question' in content or 'question-text' in content:
            formats.append('Traditional Quiz')
        elif 'questionnaire' in content.lower():
            formats.append('Questionnaire')
        else:
            formats.append('Unknown/None')
    
    return ', '.join(formats) if formats else 'None detected'

def validate_stripe_file(filepath):
    """Validate a single stripe file"""
    full_path = BASE_DIR / filepath
    
    if not full_path.exists():
        return {
            'file': filepath,
            'exists': False,
            'quality': 'MISSING',
            'score': 0,
            'checks': {}
        }
    
    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {
            'file': filepath,
            'exists': True,
            'quality': 'ERROR',
            'score': 0,
            'error': str(e),
            'checks': {}
        }
    
    file_size = get_file_size(full_path)
    word_count = count_words(content)
    
    # Validation checks
    checks = {
        'fileSize': file_size > 10000,  # 10KB minimum
        'hasDarkTheme': 'dark-journey' in content or 'dark-mode' in content or 'var(--bg-primary)' in content,
        'hasHeroicons': '<svg' in content and ('hero-icon' in content or 'sprite.svg' in content),
        'noEmojis': not bool(re.search(r'[😀-🙏🌀-🗿]', content)),  # No emoji unicode
        'hasGamificationJS': 'gamification-v10.js' in content,
        'hasGamificationCSS': 'gamification-v10.css' in content,
        'hasSaveCompletion': 'saveStripeCompletion' in content,
        'hasBeltFailureMessage': 'getBeltFailureMessage' in content,
        'hasQuestionnaire': bool(re.search(r'questionnaire|quiz|assessment|question-text', content, re.I)),
        'hasNavigation': ('Continue' in content or 'Next' in content) and ('Back' in content or 'Previous' in content),
        'hasRealContent': word_count > 500 and 'Lorem ipsum' not in content and 'Content here' not in content,
        'hasLessons': bool(re.search(r'lesson|module|section', content, re.I)),
        'hasExercises': bool(re.search(r'exercise|practice|activity', content, re.I)),
        'hasIntroduction': bool(re.search(r'introduction|overview|what you.*learn', content, re.I)),
        'hasCompletion': 'complete' in content.lower() or 'completion' in content.lower(),
    }
    
    # Calculate score
    score = sum(1 for v in checks.values() if v)
    total_checks = len(checks)
    
    # Determine quality
    if score >= total_checks * 0.85:  # 85%+
        quality = 'EXCELLENT'
    elif score >= total_checks * 0.70:  # 70%+
        quality = 'GOOD'
    elif score >= total_checks * 0.50:  # 50%+
        quality = 'FAIR'
    else:
        quality = 'POOR'
    
    # Detect questionnaire format
    questionnaire_format = detect_questionnaire_format(content)
    
    return {
        'file': filepath,
        'exists': True,
        'quality': quality,
        'score': f'{score}/{total_checks}',
        'fileSize': f'{file_size:,} bytes',
        'wordCount': word_count,
        'questionnaireFormat': questionnaire_format,
        'checks': checks,
        'lastModified': datetime.fromtimestamp(full_path.stat().st_mtime).strftime('%Y-%m-%d %H:%M')
    }

def find_alternative_files(belt, stripe):
    """Find all files with similar names for comparison"""
    patterns = [
        f'{belt}-belt-stripe{stripe}-gamified.html',
        f'{belt}-belt-stripe{stripe}-interactive-FULL.html',
        f'{belt}-belt-stripe{stripe}-interactive.html',
        f'{belt}-belt-stripe{stripe}-carousel-NEW.html',
        f'{belt}-belt-stripe{stripe}-carousel.html',
        f'{belt}-belt-stripe{stripe}.html',
        f'{belt}-belt-stripe{stripe}-v2.html',
        f'{belt}-belt-stripe{stripe}-final.html',
    ]
    
    alternatives = []
    for pattern in patterns:
        filepath = BASE_DIR / 'src/pages/gym' / pattern
        if filepath.exists():
            size = get_file_size(filepath)
            alternatives.append({
                'file': pattern,
                'size': size,
                'path': str(filepath.relative_to(BASE_DIR))
            })
    
    return sorted(alternatives, key=lambda x: x['size'], reverse=True)

def main():
    """Run comprehensive validation audit"""
    print("=" * 80)
    print("DEEP CONTENT VALIDATION AUDIT")
    print("=" * 80)
    print()
    
    results = {}
    belt_results = {}
    
    # Validate all stripe files
    print("🔍 Validating all stripe files...")
    print()
    
    for filepath in STRIPE_FILES:
        result = validate_stripe_file(filepath)
        belt = filepath.split('/')[-1].split('-')[0]
        stripe = int(filepath.split('stripe')[1].split('-')[0])
        
        if belt not in belt_results:
            belt_results[belt] = {}
        belt_results[belt][stripe] = result
        
        results[filepath] = result
    
    # Generate report by belt
    print("📊 STRIPE FILE QUALITY AUDIT")
    print("=" * 80)
    print()
    
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        belt_name = belt.upper() + ' BELT'
        print(f"\n{belt_name}:")
        print("-" * 80)
        
        for stripe in [1, 2, 3, 4]:
            result = belt_results[belt][stripe]
            
            if not result['exists']:
                print(f"\n❌ Stripe {stripe}: {result['file']}")
                print(f"   Status: FILE MISSING")
                # Find alternatives
                alternatives = find_alternative_files(belt, stripe)
                if alternatives:
                    print(f"   📁 Alternative files found:")
                    for alt in alternatives[:3]:
                        print(f"      - {alt['file']} ({alt['size']:,} bytes)")
            else:
                quality_icon = '✅' if result['quality'] in ['EXCELLENT', 'GOOD'] else '⚠️' if result['quality'] == 'FAIR' else '❌'
                print(f"\n{quality_icon} Stripe {stripe}: {Path(result['file']).name}")
                print(f"   Quality Score: {result['score']} ({result['quality']})")
                print(f"   File Size: {result['fileSize']}")
                print(f"   Word Count: {result['wordCount']:,} words")
                print(f"   Questionnaire Format: {result['questionnaireFormat']}")
                print(f"   Last Modified: {result['lastModified']}")
                
                # Check for issues
                issues = []
                if not result['checks'].get('fileSize'):
                    issues.append("⚠️ File too small (< 10KB)")
                if not result['checks'].get('hasGamificationJS'):
                    issues.append("⚠️ Missing gamification-v10.js")
                if not result['checks'].get('hasSaveCompletion'):
                    issues.append("⚠️ Missing saveStripeCompletion")
                if not result['checks'].get('hasQuestionnaire'):
                    issues.append("⚠️ No questionnaire detected")
                if not result['checks'].get('hasRealContent'):
                    issues.append("⚠️ Insufficient content (< 500 words)")
                
                if issues:
                    print(f"   Issues:")
                    for issue in issues:
                        print(f"      {issue}")
                
                # Check for alternatives if quality is poor
                if result['quality'] in ['POOR', 'FAIR']:
                    alternatives = find_alternative_files(belt, stripe)
                    if alternatives and len(alternatives) > 1:
                        print(f"   📁 Better alternatives found:")
                        for alt in alternatives[:3]:
                            if alt['file'] != Path(result['file']).name:
                                alt_result = validate_stripe_file(alt['path'])
                                if alt_result['exists']:
                                    print(f"      ✅ {alt['file']} - Score: {alt_result['score']} ({alt_result['quality']})")
    
    # Questionnaire format diversity check
    print("\n" + "=" * 80)
    print("🎯 QUESTIONNAIRE FORMAT DIVERSITY CHECK")
    print("=" * 80)
    print()
    
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        formats = []
        for stripe in [1, 2, 3, 4]:
            result = belt_results[belt][stripe]
            if result['exists']:
                formats.append((stripe, result['questionnaireFormat']))
        
        print(f"\n{belt.upper()} BELT:")
        unique_formats = set(f[1] for f in formats)
        if len(unique_formats) == len(formats):
            print("   ✅ All stripes have DIFFERENT questionnaire formats")
        else:
            print("   ⚠️  Some stripes have SIMILAR questionnaire formats")
        
        for stripe, fmt in formats:
            print(f"      Stripe {stripe}: {fmt}")
    
    # Navigation audit
    print("\n" + "=" * 80)
    print("🔗 NAVIGATION AUDIT")
    print("=" * 80)
    print()
    
    # Check white-belt.html links
    white_belt_file = BASE_DIR / 'src/pages/gym/white-belt.html'
    if white_belt_file.exists():
        with open(white_belt_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("white-belt.html currently links to:")
        for stripe in [1, 2, 3, 4]:
            pattern = f'white-belt-stripe{stripe}'
            if pattern in content:
                # Find the actual link
                matches = re.findall(rf'href=["\']([^"\']*{pattern}[^"\']*)["\']', content)
                if matches:
                    link = matches[0]
                    result = belt_results['white'][stripe]
                    status = '✅ CORRECT' if result['quality'] in ['EXCELLENT', 'GOOD'] else '⚠️  NEEDS REVIEW'
                    print(f"  Stripe {stripe}: {link} {status}")
                else:
                    print(f"  Stripe {stripe}: Link found but format unclear")
            else:
                print(f"  Stripe {stripe}: ❌ NO LINK FOUND")
    
    # Summary
    print("\n" + "=" * 80)
    print("📈 SUMMARY")
    print("=" * 80)
    print()
    
    total = len(results)
    excellent = sum(1 for r in results.values() if r.get('quality') == 'EXCELLENT')
    good = sum(1 for r in results.values() if r.get('quality') == 'GOOD')
    fair = sum(1 for r in results.values() if r.get('quality') == 'FAIR')
    poor = sum(1 for r in results.values() if r.get('quality') == 'POOR')
    missing = sum(1 for r in results.values() if not r.get('exists'))
    
    print(f"Total Stripe Files: {total}")
    print(f"✅ Excellent Quality: {excellent}")
    print(f"✅ Good Quality: {good}")
    print(f"⚠️  Fair Quality: {fair}")
    print(f"❌ Poor Quality: {poor}")
    print(f"❌ Missing Files: {missing}")
    print()
    
    if excellent + good >= total * 0.8:
        print("🎉 Overall Quality: EXCELLENT (80%+ files are good or better)")
    elif excellent + good >= total * 0.6:
        print("✅ Overall Quality: GOOD (60%+ files are good or better)")
    else:
        print("⚠️  Overall Quality: NEEDS IMPROVEMENT (< 60% files are good)")

if __name__ == '__main__':
    main()

