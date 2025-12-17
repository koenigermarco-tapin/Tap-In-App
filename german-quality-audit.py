#!/usr/bin/env python3

"""

TAP-IN GERMAN CONTENT QUALITY AUDIT

Comprehensive checker for German translation quality issues

"""



import os

import re

from pathlib import Path

from collections import defaultdict



class GermanQualityAuditor:

    def __init__(self):

        self.issues = {

            'english_leakage': [],      # English words in German context

            'mixed_sentences': [],       # Sentences with both languages

            'incorrect_anglicisms': [],  # Anglicisms that should be German

            'missing_translations': [],  # Untranslated UI elements

            'grammar_issues': [],        # Basic grammar problems

            'inconsistent_terms': [],    # Same concept, different translations

            'sie_form_usage': [],        # Formal Sie instead of du

        }

        

        # Approved anglicisms (keep in English/original)

        self.approved_anglicisms = {

            'team', 'teams',

            'impact',

            'xp',

            'belt', 'belts',

            'stripe', 'stripes',

            'dashboard',

            'leaderboard',

            'white belt', 'blue belt', 'purple belt', 'brown belt', 'black belt',

            'email',

            'feedback',

            'coach', 'coaching',

            'leader', 'leadership',

        }

        

        # Words that MUST be translated

        self.must_translate = {

            'complete': 'abschließen',

            'next': 'nächste',

            'previous': 'vorherige',

            'save': 'speichern',

            'cancel': 'abbrechen',

            'continue': 'fortsetzen',

            'start': 'starten',

            'finish': 'beenden',

            'submit': 'einreichen',

            'back': 'zurück',

            'home': 'startseite',

            'profile': 'profil',

            'settings': 'einstellungen',

            'help': 'hilfe',

            'logout': 'abmelden',

            'login': 'anmelden',

        }

        

        # Consistent terminology mapping

        self.terminology = {

            'lesson': 'lektion',

            'module': 'modul',

            'course': 'kurs',

            'assessment': 'assessment',  # Keep anglicism

            'quiz': 'quiz',  # Keep anglicism

            'progress': 'fortschritt',

            'achievement': 'erfolg',

            'badge': 'abzeichen',

        }

        

        # Common English UI patterns

        self.ui_patterns = [

            r'Click here',

            r'Learn more',

            r'Get started',

            r'Sign up',

            r'Log in',

            r'View all',

            r'Read more',

            r'Show less',

        ]

        

    def scan_file(self, filepath):

        """Scan a single German file for quality issues"""

        try:

            with open(filepath, 'r', encoding='utf-8') as f:

                content = f.read()

                lines = content.split('\n')

            

            filename = os.path.basename(filepath)

            

            # Check each line

            for line_num, line in enumerate(lines, 1):

                # Skip HTML comments and script tags

                if '<!--' in line or '<script' in line or '</script>' in line:

                    continue

                    

                # Skip style tags

                if '<style' in line or '</style>' in line:

                    continue

                

                # Check for English leakage

                self._check_english_leakage(line, filename, line_num)

                

                # Check for mixed language sentences

                self._check_mixed_sentences(line, filename, line_num)

                

                # Check for incorrect anglicisms

                self._check_anglicisms(line, filename, line_num)

                

                # Check for Sie-form (should be du-form)

                self._check_sie_form(line, filename, line_num)

            

            # Check for missing translations

            self._check_missing_translations(content, filename)

            

        except Exception as e:

            print(f"Error scanning {filepath}: {e}")

    

    def _check_english_leakage(self, line, filename, line_num):

        """Check for English words that should be translated"""

        # Common English words that shouldn't appear in German content

        english_words = [

            r'\bclick\b', r'\bhere\b', r'\blearn\b', r'\bmore\b',

            r'\bget\b', r'\bstarted\b', r'\bsign\b', r'\bup\b',

            r'\blog\b', r'\bin\b', r'\bout\b', r'\bview\b', r'\ball\b',

            r'\bshow\b', r'\bless\b', r'\bread\b',

        ]

        

        for pattern in english_words:

            if re.search(pattern, line, re.IGNORECASE):

                # Check if it's in an approved context

                if not self._is_approved_context(line):

                    self.issues['english_leakage'].append({

                        'file': filename,

                        'line': line_num,

                        'issue': f'English word found: {pattern}',

                        'content': line.strip()[:100]

                    })

    

    def _check_mixed_sentences(self, line, filename, line_num):

        """Check for sentences mixing German and English"""

        # Look for patterns like "Das ist ein good example"

        # German article/verb + English word

        mixed_patterns = [

            r'(der|die|das|ein|eine)\s+[a-z]+(?:ing|ed|tion|ment)',

            r'(ist|sind|hat|haben|wird|werden)\s+[a-z]+(?:ing|ed|tion)',

        ]

        

        for pattern in mixed_patterns:

            if re.search(pattern, line, re.IGNORECASE):

                # Skip if it's an approved anglicism

                if not self._is_approved_anglicism(line):

                    self.issues['mixed_sentences'].append({

                        'file': filename,

                        'line': line_num,

                        'issue': 'Mixed German/English sentence detected',

                        'content': line.strip()[:100]

                    })

    

    def _check_anglicisms(self, line, filename, line_num):

        """Check for anglicisms that should be German"""

        for eng_word, ger_word in self.must_translate.items():

            # Look for the English word NOT in approved context

            pattern = r'\b' + eng_word + r'\b'

            if re.search(pattern, line, re.IGNORECASE):

                # Check if it's in HTML tag or approved context

                if not self._is_approved_context(line):

                    self.issues['incorrect_anglicisms'].append({

                        'file': filename,

                        'line': line_num,

                        'issue': f'Should translate "{eng_word}" to "{ger_word}"',

                        'content': line.strip()[:100]

                    })

    

    def _check_sie_form(self, line, filename, line_num):

        """Check for formal Sie-form (should use du-form)"""

        sie_patterns = [

            r'\bSie\b(?!\s*sind)',  # Sie but not "Sie sind" (could be plural)

            r'\bIhre\b',  # Your (formal)

            r'\bIhr\b(?!\s+Team)',  # Your (formal, but allow "Ihr Team")

            r'\bIhnen\b',  # You (formal, dative)

        ]

        

        for pattern in sie_patterns:

            if re.search(pattern, line):

                self.issues['sie_form_usage'].append({

                    'file': filename,

                    'line': line_num,

                    'issue': 'Using formal Sie-form instead of du-form',

                    'content': line.strip()[:100]

                })

    

    def _check_missing_translations(self, content, filename):

        """Check for UI elements that should be translated"""

        for pattern in self.ui_patterns:

            if re.search(pattern, content, re.IGNORECASE):

                self.issues['missing_translations'].append({

                    'file': filename,

                    'issue': f'Untranslated UI pattern: {pattern}',

                    'count': len(re.findall(pattern, content, re.IGNORECASE))

                })

    

    def _is_approved_context(self, line):

        """Check if English word is in approved context (HTML tag, etc.)"""

        # In HTML attribute

        if re.search(r'(href|src|class|id|data-)="[^"]*"', line):

            return True

        # In HTML tag

        if re.search(r'<[^>]+>', line):

            return True

        # In comment

        if '<!--' in line or '//' in line:

            return True

        return False

    

    def _is_approved_anglicism(self, line):

        """Check if line contains approved anglicism"""

        line_lower = line.lower()

        for anglicism in self.approved_anglicisms:

            if anglicism in line_lower:

                return True

        return False

    

    def generate_report(self):

        """Generate comprehensive quality report"""

        print('\n' + '='*70)

        print('🇩🇪 TAP-IN GERMAN CONTENT QUALITY AUDIT REPORT')

        print('='*70)

        print('')

        

        total_issues = sum(len(issues) for issues in self.issues.values())

        

        if total_issues == 0:

            print('✅ NO ISSUES FOUND - German content quality is excellent!')

            print('')

            return

        

        print(f'⚠️  TOTAL ISSUES FOUND: {total_issues}\n')

        

        # English Leakage

        if self.issues['english_leakage']:

            print('🔴 ENGLISH LEAKAGE (High Priority)')

            print('-' * 70)

            print(f'Found {len(self.issues["english_leakage"])} instances of English words\n')

            for issue in self.issues['english_leakage'][:10]:  # Show first 10

                print(f'  File: {issue["file"]}')

                print(f'  Line: {issue["line"]}')

                print(f'  Issue: {issue["issue"]}')

                print(f'  Content: {issue["content"]}')

                print('')

            if len(self.issues['english_leakage']) > 10:

                print(f'  ... and {len(self.issues["english_leakage"]) - 10} more\n')

        

        # Mixed Sentences

        if self.issues['mixed_sentences']:

            print('🟠 MIXED LANGUAGE SENTENCES (High Priority)')

            print('-' * 70)

            print(f'Found {len(self.issues["mixed_sentences"])} mixed sentences\n')

            for issue in self.issues['mixed_sentences'][:10]:

                print(f'  File: {issue["file"]}')

                print(f'  Line: {issue["line"]}')

                print(f'  Content: {issue["content"]}')

                print('')

            if len(self.issues['mixed_sentences']) > 10:

                print(f'  ... and {len(self.issues["mixed_sentences"]) - 10} more\n')

        

        # Incorrect Anglicisms

        if self.issues['incorrect_anglicisms']:

            print('🟡 INCORRECT ANGLICISMS (Medium Priority)')

            print('-' * 70)

            print(f'Found {len(self.issues["incorrect_anglicisms"])} words to translate\n')

            for issue in self.issues['incorrect_anglicisms'][:10]:

                print(f'  File: {issue["file"]}')

                print(f'  Line: {issue["line"]}')

                print(f'  Fix: {issue["issue"]}')

                print(f'  Content: {issue["content"]}')

                print('')

            if len(self.issues['incorrect_anglicisms']) > 10:

                print(f'  ... and {len(self.issues["incorrect_anglicisms"]) - 10} more\n')

        

        # Sie-form Usage

        if self.issues['sie_form_usage']:

            print('🔵 FORMAL SIE-FORM DETECTED (Medium Priority)')

            print('-' * 70)

            print(f'Found {len(self.issues["sie_form_usage"])} instances (should use du-form)\n')

            for issue in self.issues['sie_form_usage'][:10]:

                print(f'  File: {issue["file"]}')

                print(f'  Line: {issue["line"]}')

                print(f'  Content: {issue["content"]}')

                print('')

            if len(self.issues['sie_form_usage']) > 10:

                print(f'  ... and {len(self.issues["sie_form_usage"]) - 10} more\n')

        

        # Missing Translations

        if self.issues['missing_translations']:

            print('⚪ MISSING TRANSLATIONS (Low Priority)')

            print('-' * 70)

            print(f'Found {len(self.issues["missing_translations"])} untranslated UI elements\n')

            for issue in self.issues['missing_translations']:

                print(f'  File: {issue["file"]}')

                print(f'  Pattern: {issue["issue"]}')

                print(f'  Count: {issue["count"]} occurrences')

                print('')

        

        # Summary by severity

        print('='*70)

        print('📊 SUMMARY BY SEVERITY')

        print('='*70)

        print('')

        print(f'🔴 Critical (English Leakage): {len(self.issues["english_leakage"])}')

        print(f'🟠 High (Mixed Sentences): {len(self.issues["mixed_sentences"])}')

        print(f'🟡 Medium (Incorrect Anglicisms): {len(self.issues["incorrect_anglicisms"])}')

        print(f'🔵 Medium (Sie-form): {len(self.issues["sie_form_usage"])}')

        print(f'⚪ Low (Missing Translations): {len(self.issues["missing_translations"])}')

        print('')

        print('='*70)

        print('💡 RECOMMENDATIONS')

        print('='*70)

        print('')

        

        if self.issues['english_leakage'] or self.issues['mixed_sentences']:

            print('1. FIX IMMEDIATELY: English leakage and mixed sentences')

            print('   These break user immersion and look unprofessional')

            print('')

        

        if self.issues['incorrect_anglicisms']:

            print('2. FIX BEFORE LAUNCH: Translate required UI elements')

            print('   Use proper German for buttons, navigation, etc.')

            print('')

        

        if self.issues['sie_form_usage']:

            print('3. FIX FOR CONSISTENCY: Change Sie to du throughout')

            print('   TAP-IN uses informal du-form for authentic connection')

            print('')

        

        print('✅ Keep approved anglicisms: Team, Impact, XP, Belt, etc.')

        print('✅ Maintain consistent terminology across all files')

        print('✅ Use du-form exclusively (no Sie-form)')

        print('')



def main():

    auditor = GermanQualityAuditor()

    

    # Scan all German HTML files

    german_files = []

    

    # Look in common directories

    search_dirs = [

        'src/pages',

        'src/pages/gym',

        'src/pages/assessments',

        'src/pages/hub',

        'pages',

        'gym',

        'hub',

        'assessments',

        '.',  # Current directory

    ]

    

    for search_dir in search_dirs:

        if os.path.exists(search_dir):

            for root, dirs, files in os.walk(search_dir):

                for file in files:

                    if file.endswith('-de.html') or file.endswith('_de.html'):

                        filepath = os.path.join(root, file)

                        german_files.append(filepath)

    

    if not german_files:

        print('⚠️  No German files found!')

        print('Please run this script from your project root directory.')

        return

    

    print(f'\n🔍 Scanning {len(german_files)} German files...\n')

    

    for filepath in german_files:

        auditor.scan_file(filepath)

    

    auditor.generate_report()

    

    # Save detailed report to file

    with open('GERMAN-QUALITY-AUDIT-REPORT.txt', 'w', encoding='utf-8') as f:

        f.write('TAP-IN GERMAN CONTENT QUALITY AUDIT - DETAILED REPORT\n')

        f.write('='*70 + '\n\n')

        

        for category, issues in auditor.issues.items():

            if issues:

                f.write(f'\n{category.upper().replace("_", " ")}\n')

                f.write('-'*70 + '\n')

                for issue in issues:

                    f.write(f'{issue}\n')

                f.write('\n')

    

    print(f'\n📄 Detailed report saved to: GERMAN-QUALITY-AUDIT-REPORT.txt\n')



if __name__ == '__main__':

    main()

