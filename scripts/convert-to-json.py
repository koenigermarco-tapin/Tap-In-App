#!/usr/bin/env python3
"""
Convert TypeScript stripe content files to JSON format for lesson-viewer.html
"""

import json
import re
from pathlib import Path

# Belt information
BELT_INFO = {
    '1': {'belt': 'White Belt', 'stripe': 1, 'theme': 'Absence of Trust - Trust Foundations'},
    '2': {'belt': 'White Belt', 'stripe': 2, 'theme': 'Absence of Trust - Psychological Safety'},
    '3': {'belt': 'White Belt', 'stripe': 3, 'theme': 'Absence of Trust - Self-Leadership'},
    '4': {'belt': 'White Belt', 'stripe': 4, 'theme': 'Absence of Trust - Vulnerability in Action'},
    '5': {'belt': 'Blue Belt', 'stripe': 1, 'theme': 'Fear of Conflict - Conflict Foundations'},
    '6': {'belt': 'Blue Belt', 'stripe': 2, 'theme': 'Fear of Conflict - Mastering Difficult Conversations'},
    '7': {'belt': 'Blue Belt', 'stripe': 3, 'theme': 'Fear of Conflict - Team Conflict Protocols'},
    '8': {'belt': 'Blue Belt', 'stripe': 4, 'theme': 'Fear of Conflict - Conflict Mastery'},
    '9': {'belt': 'Purple Belt', 'stripe': 1, 'theme': 'Lack of Commitment - Commitment Foundations'},
    '10': {'belt': 'Purple Belt', 'stripe': 2, 'theme': 'Lack of Commitment - Creating Clarity'},
    '11': {'belt': 'Purple Belt', 'stripe': 3, 'theme': 'Lack of Commitment - Driving Buy-In'},
    '12': {'belt': 'Purple Belt', 'stripe': 4, 'theme': 'Lack of Commitment - Commitment Mastery'},
    '13': {'belt': 'Brown Belt', 'stripe': 1, 'theme': 'Avoidance of Accountability - Accountability Foundations'},
    '14': {'belt': 'Brown Belt', 'stripe': 2, 'theme': 'Avoidance of Accountability - Accountability Skills'},
    '15': {'belt': 'Brown Belt', 'stripe': 3, 'theme': 'Avoidance of Accountability - Accountability Systems'},
    '16': {'belt': 'Brown Belt', 'stripe': 4, 'theme': 'Avoidance of Accountability - Accountability Mastery'},
    '17': {'belt': 'Black Belt', 'stripe': 1, 'theme': 'Inattention to Results - Results Foundations'},
    '18': {'belt': 'Black Belt', 'stripe': 2, 'theme': 'Inattention to Results - Defining Success'},
    '19': {'belt': 'Black Belt', 'stripe': 3, 'theme': 'Inattention to Results - Sustaining Results'},
    '20': {'belt': 'Black Belt', 'stripe': 4, 'theme': 'Inattention to Results - Mastery & Legacy'},
}

def parse_typescript_file(content):
    """Parse TypeScript content file and extract lessons and checkpoints"""
    
    # Extract lessons array
    lessons_match = re.search(r'export const stripe\d+Lessons.*?=\s*\[(.*?)\];', content, re.DOTALL)
    if not lessons_match:
        return None, None
    
    lessons_text = lessons_match.group(1)
    
    # Extract checkpoints array
    checkpoints_match = re.search(r'export const stripe\d+Checkpoints.*?=\s*\[(.*?)\];', content, re.DOTALL)
    checkpoints_text = checkpoints_match.group(1) if checkpoints_match else ""
    
    # Parse lessons
    lessons = []
    lesson_pattern = r'\{[^}]*?id:\s*(\d+).*?title:\s*["\']([^"\']+)["\'].*?content:\s*\[(.*?)\].*?duration:\s*["\']([^"\']+)["\'].*?xpReward:\s*(\d+)'
    
    for match in re.finditer(lesson_pattern, lessons_text, re.DOTALL):
        lesson_id = int(match.group(1))
        title = match.group(2)
        content_text = match.group(3)
        duration = match.group(4)
        xp_reward = int(match.group(5))
        
        # Extract paragraphs from content array
        paragraphs = re.findall(r'["\']([^"\']+)["\']', content_text)
        
        # Split into sections (every 3-4 paragraphs = 1 section)
        sections = []
        section_size = 3
        for i in range(0, len(paragraphs), section_size):
            section_paras = paragraphs[i:i+section_size]
            if section_paras:
                sections.append({
                    'title': f'Section {len(sections) + 1}',
                    'paragraphs': section_paras,
                    'questions': []  # Will be filled from checkpoints
                })
        
        lessons.append({
            'id': lesson_id,
            'title': title,
            'duration': duration,
            'xpReward': xp_reward,
            'sections': sections
        })
    
    # Parse checkpoints
    checkpoints = []
    checkpoint_pattern = r'\{[^}]*?id:\s*(\d+).*?lessonId:\s*(\d+).*?question:\s*["\']([^"\']+)["\'].*?options:\s*\[(.*?)\].*?correctAnswer:\s*(\d+)'
    
    for match in re.finditer(checkpoint_pattern, checkpoints_text, re.DOTALL):
        checkpoint_id = int(match.group(1))
        lesson_id = int(match.group(2))
        question = match.group(3)
        options_text = match.group(4)
        correct_answer = int(match.group(5))
        
        # Extract options
        options = re.findall(r'["\']([^"\']+)["\']', options_text)
        
        checkpoints.append({
            'id': checkpoint_id,
            'lessonId': lesson_id,
            'question': question,
            'options': options,
            'correctAnswer': correct_answer
        })
    
    # Distribute checkpoints to lesson sections (2 questions per section)
    for checkpoint in checkpoints:
        lesson_id = checkpoint['lessonId']
        if lesson_id <= len(lessons):
            lesson = lessons[lesson_id - 1]
            # Find section with fewest questions
            for section in lesson['sections']:
                if len(section['questions']) < 2:
                    section['questions'].append({
                        'question': checkpoint['question'],
                        'options': checkpoint['options'],
                        'correctAnswer': checkpoint['correctAnswer']
                    })
                    break
    
    return lessons, checkpoints

def convert_all_stripes():
    """Convert all 20 stripe TypeScript files to JSON"""
    
    content_dir = Path('react-app/src/content')
    output = {'stripes': {}}
    
    for stripe_num in range(1, 21):
        ts_file = content_dir / f'stripe{stripe_num}Content.ts'
        
        if not ts_file.exists():
            print(f"⚠️  Warning: {ts_file} not found")
            continue
        
        print(f"📄 Processing stripe {stripe_num}...")
        
        with open(ts_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lessons, checkpoints = parse_typescript_file(content)
        
        if lessons is None:
            print(f"❌ Failed to parse {ts_file}")
            continue
        
        belt_info = BELT_INFO[str(stripe_num)]
        
        output['stripes'][str(stripe_num)] = {
            'title': f"{belt_info['belt']} - Stripe {belt_info['stripe']}",
            'belt': belt_info['belt'],
            'theme': belt_info['theme'],
            'lessons': lessons
        }
        
        print(f"✅ Stripe {stripe_num}: {len(lessons)} lessons, {len([q for l in lessons for s in l['sections'] for q in s['questions']])} questions")
    
    # Write output JSON
    output_file = Path('stripe-content.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Created {output_file} with {len(output['stripes'])} stripes")
    print(f"📊 Total lessons: {sum(len(s['lessons']) for s in output['stripes'].values())}")
    print(f"📊 Total questions: {sum(len([q for l in s['lessons'] for sec in l['sections'] for q in sec['questions']]) for s in output['stripes'].values())}")

if __name__ == '__main__':
    convert_all_stripes()

