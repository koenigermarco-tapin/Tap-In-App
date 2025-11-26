#!/usr/bin/env python3
"""
Convert HTML stripe files to React TypeScript components.
Extracts lessons, research boxes, and practice exercises.
"""

import re
import os
from pathlib import Path

# Belt color mappings
BELT_COLORS = {
    'white': {'name': 'White', 'gradient': 'from-slate-100 to-gray-200', 'color': 'slate'},
    'blue': {'name': 'Blue', 'gradient': 'from-blue-500 to-blue-600', 'color': 'blue'},
    'purple': {'name': 'Purple', 'gradient': 'from-purple-500 to-purple-600', 'color': 'purple'},
    'brown': {'name': 'Brown', 'gradient': 'from-amber-700 to-amber-800', 'color': 'amber'},
    'black': {'name': 'Black', 'gradient': 'from-gray-900 to-black', 'color': 'gray'}
}

def extract_title(html):
    """Extract stripe title from h1"""
    match = re.search(r'<h1>🥋 (.+?)</h1>', html)
    return match.group(1) if match else "Unknown Stripe"

def extract_description(html):
    """Extract module description"""
    match = re.search(r'<p class="module-description">\s*(.+?)\s*</p>', html, re.DOTALL)
    if match:
        return match.group(1).strip().replace('\n', ' ').replace('  ', ' ')
    return ""

def extract_lesson(html, lesson_num):
    """Extract a complete lesson with all its parts"""
    # Find the lesson card
    pattern = rf'<!-- Lesson {lesson_num}:.*?-->.*?<div class="lesson-card">.*?</div>\s*</div>\s*</div>\s*(?=<!-- Lesson {lesson_num+1}:|<!-- Summary Dashboard)'
    match = re.search(pattern, html, re.DOTALL)
    
    if not match:
        return None
    
    lesson_html = match.group(0)
    
    # Extract lesson title
    title_match = re.search(r'<div class="lesson-title">(.+?)</div>', lesson_html)
    title = title_match.group(1) if title_match else f"Lesson {lesson_num}"
    
    # Extract "What You'll Learn" items
    learn_pattern = r'<h3>🎯 What You\'ll Learn</h3>\s*<ul>(.*?)</ul>'
    learn_match = re.search(learn_pattern, lesson_html, re.DOTALL)
    whatYouLearn = []
    if learn_match:
        items = re.findall(r'<li>(.+?)</li>', learn_match.group(1))
        whatYouLearn = [item.strip() for item in items]
    
    # Extract Core Concept paragraphs
    core_pattern = r'<h3>📖 .*?</h3>(.*?)(?=<div class="research-box|<div class="highlight-box|<div class="lesson-section">|<h3>)'
    core_match = re.search(core_pattern, lesson_html, re.DOTALL)
    coreConcept = []
    if core_match:
        paras = re.findall(r'<p>(.*?)</p>', core_match.group(1), re.DOTALL)
        coreConcept = [clean_html(p) for p in paras]
        # Also capture lists in core concept
        lists = re.findall(r'<ul>(.*?)</ul>', core_match.group(1), re.DOTALL)
        for lst in lists:
            items = re.findall(r'<li>(.+?)</li>', lst)
            for item in items:
                coreConcept.append(f"• {clean_html(item)}")
    
    # Extract research box if present
    research_pattern = r'<div class="research-box">\s*<h4>📊 (.+?)</h4>\s*<p>(.*?)</p>'
    research_match = re.search(research_pattern, lesson_html, re.DOTALL)
    researchBox = None
    if research_match:
        researchBox = {
            'title': research_match.group(1),
            'content': [clean_html(research_match.group(2))]
        }
        # Check for additional list items
        research_list = re.search(r'<div class="research-box">.*?<ul>(.*?)</ul>', lesson_html, re.DOTALL)
        if research_list:
            items = re.findall(r'<li>(.+?)</li>', research_list.group(1))
            researchBox['content'].extend([clean_html(item) for item in items])
    
    # Extract Key Takeaways
    takeaways_pattern = r'<h3>💡 Key Takeaways</h3>\s*<ul>(.*?)</ul>'
    takeaways_match = re.search(takeaways_pattern, lesson_html, re.DOTALL)
    keyTakeaways = []
    if takeaways_match:
        items = re.findall(r'<li>(.+?)</li>', takeaways_match.group(1))
        keyTakeaways = [clean_html(item) for item in items]
    
    # Extract practice exercise
    practice_pattern = r'<div class="practice-box">.*?<p>(.*?)</p>(.*?)</div>'
    practice_match = re.search(practice_pattern, lesson_html, re.DOTALL)
    practiceExercise = ""
    if practice_match:
        practiceExercise = clean_html(practice_match.group(1) + " " + practice_match.group(2))
    
    return {
        'id': lesson_num,
        'title': title,
        'description': extract_lesson_description(lesson_html),
        'content': {
            'whatYouLearn': whatYouLearn,
            'coreConcept': coreConcept,
            'researchBox': researchBox,
            'keyTakeaways': keyTakeaways,
            'practiceExercise': practiceExercise
        }
    }

def extract_lesson_description(lesson_html):
    """Extract a brief description for the lesson card"""
    # Try to get first sentence of core concept
    first_p = re.search(r'<p>(.*?)</p>', lesson_html, re.DOTALL)
    if first_p:
        text = clean_html(first_p.group(1))
        if len(text) > 100:
            return text[:97] + "..."
        return text
    return "Learn essential leadership concepts"

def clean_html(text):
    """Remove HTML tags and clean up text"""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text)
    # Unescape HTML entities
    text = text.replace('&quot;', '"').replace('&apos;', "'")
    text = text.replace('&lt;', '<').replace('&gt;', '>')
    text = text.replace('&amp;', '&')
    return text.strip()

def format_for_react(text):
    """Escape quotes and format for React/JSX"""
    return text.replace('"', '\\"').replace("'", "\\'")

def generate_react_component(belt, stripe_num, title, description, lessons):
    """Generate the complete React component"""
    belt_info = BELT_COLORS[belt]
    next_stripe = stripe_num + 1 if stripe_num < 4 else None
    
    # Format lessons as JSON
    lessons_json = "const lessons: Lesson[] = [\n"
    for lesson in lessons:
        lessons_json += "  {\n"
        lessons_json += f"    id: {lesson['id']},\n"
        lessons_json += f"    title: \"{format_for_react(lesson['title'])}\",\n"
        lessons_json += f"    description: \"{format_for_react(lesson['description'])}\",\n"
        lessons_json += "    content: {\n"
        
        # whatYouLearn
        lessons_json += "      whatYouLearn: [\n"
        for item in lesson['content']['whatYouLearn']:
            lessons_json += f"        \"{format_for_react(item)}\",\n"
        lessons_json += "      ],\n"
        
        # coreConcept
        lessons_json += "      coreConcept: [\n"
        for para in lesson['content']['coreConcept']:
            lessons_json += f"        \"{format_for_react(para)}\",\n"
        lessons_json += "      ],\n"
        
        # researchBox
        if lesson['content']['researchBox']:
            rb = lesson['content']['researchBox']
            lessons_json += "      researchBox: {\n"
            lessons_json += f"        title: \"{format_for_react(rb['title'])}\",\n"
            lessons_json += "        content: [\n"
            for item in rb['content']:
                lessons_json += f"          \"{format_for_react(item)}\",\n"
            lessons_json += "        ]\n"
            lessons_json += "      },\n"
        
        # keyTakeaways
        lessons_json += "      keyTakeaways: [\n"
        for item in lesson['content']['keyTakeaways']:
            lessons_json += f"        \"{format_for_react(item)}\",\n"
        lessons_json += "      ],\n"
        
        # practiceExercise
        lessons_json += f"      practiceExercise: \"{format_for_react(lesson['content']['practiceExercise'])}\"\n"
        
        lessons_json += "    }\n"
        lessons_json += "  },\n"
    lessons_json += "];\n"
    
    component_name = f"{belt_info['name']}BeltStripe{stripe_num}"
    
    # Generate component template
    return f"""import {{ useState }} from 'react';
import {{ useNavigate }} from 'react-router-dom';
import {{ motion, AnimatePresence }} from 'framer-motion';
import {{ ChevronDown, Award, CheckCircle }} from 'lucide-react';
import {{ useGamification }} from '@/hooks/useGamification';
import {{ Card }} from '@/components/ui/Card';
import {{ Button }} from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Lesson {{
  id: number;
  title: string;
  description: string;
  content: {{
    whatYouLearn: string[];
    coreConcept: string[];
    researchBox?: {{
      title: string;
      content: string[];
    }};
    keyTakeaways: string[];
    practiceExercise: string;
  }};
}}

{lessons_json}

export function {component_name}() {{
  const navigate = useNavigate();
  const {{ completeModule, addXP }} = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const toggleLesson = (lessonId: number) => {{
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  }};

  const completeLesson = async (lessonId: number) => {{
    if (completedLessons.includes(lessonId)) return;

    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);

    await addXP(25, `{belt_info['name']} Belt Stripe {stripe_num} - Lesson ${{lessonId}}`);

    confetti({{
      particleCount: 50,
      spread: 60,
      origin: {{ y: 0.7 }}
    }});

    if (newCompleted.length === lessons.length) {{
      await completeModule('{belt}-stripe-{stripe_num}');
      await addXP(100, '{belt_info['name']} Belt Stripe {stripe_num} Complete');
      setShowCelebration(true);
      
      confetti({{
        particleCount: 100,
        spread: 70,
        origin: {{ y: 0.6 }}
      }});

      setTimeout(() => {{
        navigate('{"/belt-system/" + belt + "/stripe-" + str(next_stripe) if next_stripe else "/belt-system"}');
      }}, 3000);
    }}
  }};

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <div className="p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold text-white mb-4">
              ⚪ {belt_info['name'].upper()} BELT - STRIPE {stripe_num} of 4
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              🥋 {title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {description}
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-{belt_info['color']}-400">{{completedLessons.length}}</div>
                <div className="text-sm text-slate-400">Lessons Done</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-{belt_info['color']}-400">{{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 100 : 0)}}</div>
                <div className="text-sm text-slate-400">XP Earned</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-{belt_info['color']}-400">{{Math.round(progressPercentage)}}%</div>
                <div className="text-sm text-slate-400">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-slate-800 border-slate-700">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Progress</h3>
            <div className="bg-slate-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-{belt_info['color']}-500 to-{belt_info['color']}-600"
                initial={{ width: 0 }}
                animate={{ width: `${{progressPercentage}}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-slate-400 text-sm mt-2">
              {{completedLessons.length}} of {{lessons.length}} lessons completed
            </p>
          </div>
        </Card>

        {{lessons.map((lesson) => {{
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;

          return (
            <Card key={{lesson.id}} className="mb-6 bg-slate-800 border-slate-700 overflow-hidden">
              <button
                onClick={{() => toggleLesson(lesson.id)}}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className={{`w-12 h-12 rounded-full flex items-center justify-center font-bold ${{
                    isCompleted ? 'bg-green-500 text-white' : 'bg-{belt_info['color']}-500 text-white'
                  }}`}}>
                    {{isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}}
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Lesson {{lesson.id}}</div>
                    <h3 className="text-xl font-bold text-white">{{lesson.title}}</h3>
                    <p className="text-slate-400 text-sm">{{lesson.description}}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {{isCompleted && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Done
                    </span>
                  )}}
                  <ChevronDown className={{`w-5 h-5 text-slate-400 transition-transform ${{isExpanded ? 'rotate-180' : ''}}`}} />
                </div>
              </button>

              <AnimatePresence>
                {{isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-700"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          🎯 What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {{lesson.content.whatYouLearn.map((item, i) => (
                            <li key={{i}} className="text-slate-300 flex items-start gap-2">
                              <span className="text-{belt_info['color']}-400 mt-1">•</span>
                              <span>{{item}}</span>
                            </li>
                          ))}}
                        </ul>
                      </div>

                      <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r">
                        <h4 className="text-blue-400 font-semibold mb-3">📖 Core Concept</h4>
                        <div className="space-y-3">
                          {{lesson.content.coreConcept.map((para, i) => (
                            <p key={{i}} className="text-slate-300 leading-relaxed">{{para}}</p>
                          ))}}
                        </div>
                      </div>

                      {{lesson.content.researchBox && (
                        <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r">
                          <h4 className="text-cyan-400 font-semibold mb-3">📊 {{lesson.content.researchBox.title}}</h4>
                          <div className="space-y-2">
                            {{lesson.content.researchBox.content.map((item, i) => (
                              <p key={{i}} className="text-slate-300 leading-relaxed">{{item}}</p>
                            ))}}
                          </div>
                        </div>
                      )}}

                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          💡 Key Takeaways
                        </h4>
                        <ul className="space-y-2">
                          {{lesson.content.keyTakeaways.map((item, i) => (
                            <li key={{i}} className="text-slate-300 flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">→</span>
                              <span>{{item}}</span>
                            </li>
                          ))}}
                        </ul>
                      </div>

                      <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r">
                        <h4 className="text-green-400 font-semibold mb-2">✨ Practice Exercise</h4>
                        <p className="text-slate-300 leading-relaxed">{{lesson.content.practiceExercise}}</p>
                      </div>

                      <Button
                        onClick={{() => completeLesson(lesson.id)}}
                        disabled={{isCompleted}}
                        className={{`w-full ${{isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-{belt_info['color']}-600 to-{belt_info['color']}-700 hover:from-{belt_info['color']}-500 hover:to-{belt_info['color']}-600'}}`}}
                      >
                        {{isCompleted ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Completed
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Mark Complete
                            <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-sm font-bold">+25 XP</span>
                          </span>
                        )}}
                      </Button>
                    </div>
                  </motion.div>
                )}}
              </AnimatePresence>
            </Card>
          );
        }})}}

        <AnimatePresence>
          {{showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md text-center border-2 border-{belt_info['color']}-500"
              >
                <Award className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Stripe {stripe_num} Complete! 🥋</h2>
                <p className="text-slate-300 mb-4">
                  You've mastered {title}. {'{'}next_stripe ? f"Ready for Stripe {next_stripe}?" : "Ready for the next belt!"{'}'}
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-4">
                  +{'{'}(lessons.length * 25) + 100{'}'} XP Total!
                </div>
                <p className="text-slate-400 text-sm">
                  Redirecting{'{'}next_stripe ? f" to Stripe {next_stripe}..." : " to Belt System..."{'}'}
                </p>
              </motion.div>
            </motion.div>
          )}}
        </AnimatePresence>

        <div className="text-center mt-8">
          <button
            onClick={{() => navigate('/belt-system')}}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Belt System
          </button>
        </div>
      </div>
    </div>
  );
}}
"""

def main():
    # Source and destination directories
    html_dir = Path('/Users/marcok./Downloads/tap-in-netlify-deploy')
    react_dir = Path('/Users/marcok./tap-in-netlify-deploy/react-app/src/pages/belt-system')
    
    # Process all stripe files
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        belt_dir = react_dir / belt
        belt_dir.mkdir(parents=True, exist_ok=True)
        
        for stripe_num in [2, 3, 4]:  # Skip stripe 1 as it's already done
            html_file = html_dir / f'{belt}-belt-stripe{stripe_num}-gamified.html'
            
            if not html_file.exists():
                print(f"❌ File not found: {html_file}")
                continue
            
            print(f"🔄 Processing {belt} belt stripe {stripe_num}...")
            
            # Read HTML
            with open(html_file, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            # Extract data
            title = extract_title(html_content)
            description = extract_description(html_content)
            
            lessons = []
            for i in range(1, 5):
                lesson = extract_lesson(html_content, i)
                if lesson:
                    lessons.append(lesson)
            
            if len(lessons) != 4:
                print(f"⚠️  Warning: Found {len(lessons)} lessons instead of 4")
            
            # Generate React component
            component_code = generate_react_component(belt, stripe_num, title, description, lessons)
            
            # Write to file
            output_file = belt_dir / f'Stripe{stripe_num}.tsx'
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(component_code)
            
            print(f"✅ Created {output_file}")
    
    print("\n🎉 All stripe conversions complete!")

if __name__ == '__main__':
    main()

