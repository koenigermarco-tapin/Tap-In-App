#!/usr/bin/env python3
"""
Extract rich content from HTML stripe files and create proper JSON structure
with interleaved questions after each section.
"""

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

def extract_stripe_content(html_file):
    """Extract full content from a stripe HTML file"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Get stripe title from h1
    stripe_title = soup.find('h1')
    if stripe_title:
        stripe_title = stripe_title.get_text(strip=True)
    
    # Find all lesson cards
    lesson_cards = soup.find_all('div', class_='lesson-card')
    
    lessons = []
    
    for lesson_card in lesson_cards:
        # Get lesson title
        lesson_title_elem = lesson_card.find('div', class_='lesson-title')
        if not lesson_title_elem:
            continue
            
        lesson_title = lesson_title_elem.get_text(strip=True)
        
        # Get lesson body
        lesson_body = lesson_card.find('div', class_='lesson-body')
        if not lesson_body:
            continue
        
        # Extract all sections
        sections = []
        lesson_sections = lesson_body.find_all('div', class_='lesson-section')
        
        for section in lesson_sections:
            section_title_elem = section.find('h3')
            if not section_title_elem:
                continue
                
            section_title = section_title_elem.get_text(strip=True)
            
            # Get all paragraphs and lists
            content_html = []
            for elem in section.find_all(['p', 'ul', 'ol']):
                content_html.append(str(elem))
            
            sections.append({
                'title': section_title,
                'content_html': '\n'.join(content_html),
                'questions': []  # Will be added separately
            })
        
        # Extract research boxes
        research_boxes = []
        for box in lesson_body.find_all('div', class_='research-box'):
            research_boxes.append(str(box))
        
        # Extract practice boxes
        practice_boxes = []
        for box in lesson_body.find_all('div', class_='practice-box'):
            practice_boxes.append(str(box))
        
        # Extract highlight boxes
        highlight_boxes = []
        for box in lesson_body.find_all('div', class_='highlight-box'):
            highlight_boxes.append(str(box))
        
        lessons.append({
            'title': lesson_title,
            'sections': sections,
            'research_boxes': research_boxes,
            'practice_boxes': practice_boxes,
            'highlight_boxes': highlight_boxes,
            'duration': '30-40 minutes',
            'xpReward': 25
        })
    
    return {
        'title': stripe_title,
        'lessons': lessons
    }

def generate_questions_for_section(section_title, section_content):
    """Generate 2-4 quiz questions for a section based on its content"""
    
    # This is a placeholder - in production, you'd generate these based on actual content
    # For now, return a template structure
    questions = []
    
    # Extract key concepts from content (simplified)
    if 'trust' in section_content.lower():
        questions.append({
            'question': f'Based on {section_title}, what is the key concept?',
            'options': [
                'Trust is optional in high-performing teams',
                'Vulnerability-based trust is different from predictability-based trust',
                'Trust is only about reliability',
                'Teams do not need trust if they have processes'
            ],
            'correctAnswer': 1,
            'explanation': 'Vulnerability-based trust allows team members to admit mistakes and ask for help without fear of punishment.'
        })
    
    if 'psychological safety' in section_content.lower():
        questions.append({
            'question': f'According to the research mentioned in {section_title}, what creates psychological safety?',
            'options': [
                'Never making mistakes',
                'Always agreeing with everyone',
                'Being able to take interpersonal risks without punishment',
                'Having team-building exercises'
            ],
            'correctAnswer': 2,
            'explanation': 'Psychological safety is the belief that you can take interpersonal risks without being punished or embarrassed.'
        })
    
    return questions[:2]  # Return 2 questions per section

def create_rich_json(stripe_files):
    """Create comprehensive JSON from HTML files"""
    
    all_stripes = {}
    
    for stripe_num, html_file in enumerate(stripe_files, 1):
        print(f"📄 Processing {html_file.name}...")
        
        stripe_data = extract_stripe_content(html_file)
        
        # Add questions to each section
        for lesson in stripe_data['lessons']:
            for section in lesson['sections']:
                # Generate questions based on section content
                section['questions'] = generate_questions_for_section(
                    section['title'],
                    section['content_html']
                )
        
        belt_name = 'White Belt' if stripe_num <= 4 else 'Blue Belt' if stripe_num <= 8 else 'Purple Belt'
        
        all_stripes[str(stripe_num)] = {
            'title': stripe_data['title'] or f'{belt_name} - Stripe {stripe_num}',
            'belt': belt_name,
            'theme': 'Trust Foundations' if stripe_num == 1 else 'Theme TBD',
            'lessons': stripe_data['lessons']
        }
        
        print(f"✅ Stripe {stripe_num}: {len(stripe_data['lessons'])} lessons extracted")
    
    return all_stripes

if __name__ == '__main__':
    # Find all white belt stripe HTML files
    html_files = sorted(Path('.').glob('white-belt-stripe*-gamified.html'))
    
    if not html_files:
        print("❌ No white belt HTML files found")
        exit(1)
    
    print(f"Found {len(html_files)} White Belt files")
    print("="*50)
    
    # Extract content
    stripes_data = create_rich_json(html_files)
    
    # Save to JSON
    output = {
        'stripes': stripes_data,
        'metadata': {
            'version': '2.0',
            'content_source': 'HTML extraction',
            'includes_rich_content': True,
            'includes_interleaved_questions': True
        }
    }
    
    with open('stripe-content-v2.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print("="*50)
    print(f"✅ Created stripe-content-v2.json")
    print(f"📊 Total stripes: {len(stripes_data)}")
    print(f"📊 Total lessons: {sum(len(s['lessons']) for s in stripes_data.values())}")

