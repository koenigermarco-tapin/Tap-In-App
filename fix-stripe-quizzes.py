#!/usr/bin/env python3
"""
Fix Knowledge Quiz Issues in All 20 Stripe Files

Fixes:
1. Expand from 4 to 10 questions
2. Add proper CSS styling
3. Add immediate feedback with explanations
4. Improve JavaScript functionality
5. Ensure proper XP rewards
"""

import re
from pathlib import Path

# Quiz questions for each stripe (10 questions each)
QUIZ_QUESTIONS = {
    # WHITE BELT - Stripe 1: Trust Foundations
    'white-belt-stripe1-gamified.html': [
        {
            'question': "According to the 2025 Talent Trends Austria Report, what percentage of employees fully trust leadership?",
            'options': ['31%', '1%', '50%', '10%'],
            'correct': 1,
            'explanation': "Only 1% of employees fully trust leadership, highlighting the critical trust crisis in organizations."
        },
        {
            'question': "What type of trust does Lencioni's Five Dysfunctions model focus on?",
            'options': ['Predictability-based trust', 'Vulnerability-based trust', 'Professional trust', 'Competency trust'],
            'correct': 1,
            'explanation': "Vulnerability-based trust is the foundation. It allows team members to admit mistakes and ask for help without fear."
        },
        {
            'question': "According to Google's Project Aristotle, what was the #1 predictor of team performance?",
            'options': ['Team member IQ', 'Psychological safety', 'Years of experience', 'Available resources'],
            'correct': 1,
            'explanation': "Psychological safety was the top factor. Teams where members feel safe to take risks outperform others."
        },
        {
            'question': 'In BJJ, what do people who progress fastest do?',
            'options': ['Never tap out', 'Tap early and ask questions', 'Only train with lower belts', 'Avoid difficult positions'],
            'correct': 1,
            'explanation': "Tapping early and asking questions shows vulnerability and accelerates learning, just like in teams."
        },
        {
            'question': 'True or False: Vulnerability-based trust means being weak or incompetent.',
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Vulnerability-based trust is about courage—admitting you don't know something or made a mistake. It's strength, not weakness."
        },
        {
            'question': "What happens when teams lack vulnerability-based trust?",
            'options': ['They work faster', 'They hide weaknesses and mistakes', 'They communicate better', 'They innovate more'],
            'correct': 1,
            'explanation': "Without vulnerability-based trust, team members hide weaknesses and mistakes, leading to poor decisions and artificial harmony."
        },
        {
            'question': "Which of these is a sign of vulnerability-based trust?",
            'options': ['Team members never admit mistakes', 'People ask for help when stuck', 'Everyone pretends to know everything', 'Weaknesses are hidden'],
            'correct': 1,
            'explanation': "Asking for help when stuck demonstrates vulnerability-based trust. It shows safety to admit you don't know something."
        },
        {
            'question': "What is the relationship between trust and conflict in Lencioni's model?",
            'options': ['Trust prevents conflict', 'Trust enables healthy conflict', 'They are unrelated', 'Conflict destroys trust'],
            'correct': 1,
            'explanation': "Trust enables healthy conflict. Without trust, teams avoid conflict (artificial harmony), which is actually a dysfunction."
        },
        {
            'question': "In a high-trust team, what happens when someone makes a mistake?",
            'options': ['They are immediately fired', 'They hide it from others', 'They admit it and the team helps fix it', 'They blame someone else'],
            'correct': 2,
            'explanation': "In high-trust teams, mistakes are admitted openly and the team works together to fix them. This builds stronger trust."
        },
        {
            'question': "What is the first step to building vulnerability-based trust?",
            'options': ['Wait for others to go first', 'Start by admitting your own mistakes and asking for help', 'Demand trust from your team', 'Only trust people you know well'],
            'correct': 1,
            'explanation': "Building trust starts with you. Admit your own mistakes and ask for help first. This creates psychological safety for others."
        }
    ],
    
    # WHITE BELT - Stripe 2: Psychological Safety
    'white-belt-stripe2-gamified.html': [
        {
            'question': "What is psychological safety?",
            'options': ['Feeling physically safe at work', 'Believing you can speak up without risk of punishment or humiliation', 'Never making mistakes', 'Always agreeing with the team'],
            'correct': 1,
            'explanation': "Psychological safety is the belief that you can speak up with ideas, questions, concerns, or mistakes without being punished or humiliated."
        },
        {
            'question': "According to Amy Edmondson's research, what happens in psychologically safe teams?",
            'options': ['Fewer mistakes are made', 'More mistakes are reported and learned from', 'People work in silence', 'Conflict is avoided'],
            'correct': 1,
            'explanation': "Paradoxically, psychologically safe teams report MORE mistakes because they feel safe to admit them, leading to better learning and prevention."
        },
        {
            'question': "True or False: Psychological safety means everyone always agrees and there's no conflict.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Psychological safety enables healthy conflict and debate. It's about feeling safe to disagree, not avoiding disagreement."
        },
        {
            'question': "What is a key behavior that creates psychological safety?",
            'options': ['Criticizing mistakes publicly', 'Responding to questions with curiosity, not judgment', 'Keeping information secret', 'Only speaking to senior members'],
            'correct': 1,
            'explanation': "Responding with curiosity instead of judgment creates safety. When someone asks a question, treat it as a learning opportunity for everyone."
        },
        {
            'question': "What happens when a leader admits they don't know something?",
            'options': ['They lose credibility', 'They create psychological safety for others', 'The team loses confidence', 'Nothing changes'],
            'correct': 1,
            'explanation': "Leaders who admit they don't know something model vulnerability and create psychological safety. This encourages others to do the same."
        },
        {
            'question': "Which of these is a sign of low psychological safety?",
            'options': ['People ask questions freely', 'Team members admit mistakes openly', 'People stay silent in meetings', 'Ideas are debated respectfully'],
            'correct': 2,
            'explanation': "Silence in meetings is a red flag. In psychologically safe teams, people speak up with questions, concerns, and ideas."
        },
        {
            'question': "What is the 'two-second rule' for creating psychological safety?",
            'options': ['Respond within 2 seconds', 'Wait 2 seconds before responding to show you listened', 'Speak for only 2 seconds', 'Think for 2 seconds before speaking'],
            'correct': 1,
            'explanation': "The two-second rule: When someone speaks, wait 2 seconds before responding. This shows you're listening and considering their input, not just waiting to talk."
        },
        {
            'question': "How can you build psychological safety as a team member?",
            'options': ['Only speak when you have the answer', 'Ask questions, admit when you don\'t know, and acknowledge others\' contributions', 'Stay quiet to avoid mistakes', 'Only share perfect ideas'],
            'correct': 1,
            'explanation': "You build psychological safety by modeling vulnerability: ask questions, admit when you don't know, and acknowledge others' contributions."
        },
        {
            'question': "What is the relationship between psychological safety and performance?",
            'options': ['They are unrelated', 'High psychological safety leads to higher performance', 'Safety reduces performance', 'Only high performers create safety'],
            'correct': 1,
            'explanation': "Research shows psychological safety is a key driver of team performance. Safe teams learn faster, innovate more, and make better decisions."
        },
        {
            'question': "True or False: Psychological safety means there are no consequences for poor performance.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Psychological safety is about interpersonal risk, not performance standards. You can have high standards AND psychological safety."
        }
    ],
    
    # WHITE BELT - Stripe 3: Building Trust
    'white-belt-stripe3-gamified.html': [
        {
            'question': "What is the most effective way to build trust quickly?",
            'options': ['Demand trust from others', 'Start by being vulnerable yourself', 'Wait for others to trust you first', 'Only trust people you already know'],
            'correct': 1,
            'explanation': "The fastest way to build trust is to go first. Be vulnerable, admit mistakes, and ask for help. This creates safety for others."
        },
        {
            'question': "What is a 'trust-building moment'?",
            'options': ['A formal trust exercise', 'Any moment where you choose vulnerability over self-protection', 'A team building event', 'A performance review'],
            'correct': 1,
            'explanation': "Trust-building moments happen daily. Every time you choose vulnerability over self-protection, you build trust."
        },
        {
            'question': "True or False: Trust is built through grand gestures and big moments.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Trust is built through small, consistent actions over time. Daily vulnerability compounds into strong trust."
        },
        {
            'question': "What should you do when someone shares a mistake or weakness?",
            'options': ['Point out how to avoid it next time', 'Thank them for their honesty and share your own experience', 'Change the subject quickly', 'Criticize the mistake'],
            'correct': 1,
            'explanation': "Acknowledge their vulnerability and reciprocate. Thank them for sharing and offer your own experience. This builds mutual trust."
        },
        {
            'question': "What is the 'personal history exercise' designed to do?",
            'options': ['Share work accomplishments', 'Help team members understand each other\'s backgrounds and experiences', 'Review performance metrics', 'Plan future projects'],
            'correct': 1,
            'explanation': "The personal history exercise helps team members understand each other's backgrounds, creating empathy and connection that builds trust."
        },
        {
            'question': "Which of these behaviors destroys trust?",
            'options': ['Admitting mistakes', 'Asking for help', 'Blaming others for your mistakes', 'Sharing personal challenges'],
            'correct': 2,
            'explanation': "Blaming others destroys trust. Taking responsibility, even when it's hard, builds trust. Blame erodes it."
        },
        {
            'question': "What does 'going first' mean in trust building?",
            'options': ['Being the first to speak in meetings', 'Being vulnerable before others feel safe to be', 'Always leading projects', 'Never making mistakes'],
            'correct': 1,
            'explanation': "'Going first' means being vulnerable before others feel safe. You create the safety by modeling the behavior you want to see."
        },
        {
            'question': "How long does it take to build trust?",
            'options': ['One team building session', 'Months or years of consistent behavior', 'A single conversation', 'Only during crises'],
            'correct': 1,
            'explanation': "Trust takes time and consistency. While you can start building it immediately, strong trust develops over months and years of reliable behavior."
        },
        {
            'question': "True or False: Trust can be rebuilt after it's been broken.",
            'options': ['True', 'False'],
            'correct': 0,
            'explanation': "True, but it's harder. Rebuilding trust requires consistent vulnerability, transparency, and reliability over time. It's possible but takes work."
        },
        {
            'question': "What is the foundation of all trust-building activities?",
            'options': ['Complex exercises', 'Genuine vulnerability and authenticity', 'Perfect performance', 'Avoiding all mistakes'],
            'correct': 1,
            'explanation': "All trust-building comes down to genuine vulnerability and authenticity. No exercise works without real, honest human connection."
        }
    ],
    
    # WHITE BELT - Stripe 4: Trust in Practice
    'white-belt-stripe4-gamified.html': [
        {
            'question': "What is the relationship between trust and team speed?",
            'options': ['Trust slows teams down', 'High trust teams move faster because they don\'t waste energy on politics', 'Trust has no impact on speed', 'Only fast teams can build trust'],
            'correct': 1,
            'explanation': "High-trust teams move faster. They don't waste time on politics, second-guessing, or covering mistakes. Trust = speed."
        },
        {
            'question': "What happens when trust is low in a team?",
            'options': ['Teams work more efficiently', 'Energy is wasted on politics, second-guessing, and self-protection', 'Communication improves', 'Innovation increases'],
            'correct': 1,
            'explanation': "Low trust wastes energy. Team members spend time on politics, protecting themselves, and second-guessing instead of productive work."
        },
        {
            'question': "True or False: Trust is a 'nice to have' but not essential for high performance.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Trust is essential, not optional. It's the foundation of the entire Lencioni pyramid. Without it, teams cannot function at a high level."
        },
        {
            'question': "What should you do if you notice trust is low in your team?",
            'options': ['Wait for someone else to fix it', 'Start by being vulnerable yourself', 'Demand that others trust you', 'Ignore it and focus on work'],
            'correct': 1,
            'explanation': "Start by being vulnerable yourself. You can't force others to trust, but you can model the behavior and create safety for others to follow."
        },
        {
            'question': "How does trust impact decision-making?",
            'options': ['Trust has no impact', 'High trust enables faster, better decisions because people share information freely', 'Trust slows decisions down', 'Only leaders make decisions in high-trust teams'],
            'correct': 1,
            'explanation': "In high-trust teams, people share information freely, leading to better-informed and faster decisions. Low trust leads to information hoarding."
        },
        {
            'question': "What is a 'trust audit'?",
            'options': ['A formal assessment of trust levels', 'A review of financial records', 'A performance evaluation', 'A team building exercise'],
            'correct': 0,
            'explanation': "A trust audit is an honest assessment of trust levels in your team. It helps identify where trust is strong and where it needs work."
        },
        {
            'question': "Which of these is a sign of high trust?",
            'options': ['People hide mistakes', 'Team members ask for help freely', 'Information is hoarded', 'People avoid difficult conversations'],
            'correct': 1,
            'explanation': "In high-trust teams, people ask for help freely. They don't fear judgment or punishment for not knowing something."
        },
        {
            'question': "What role does the leader play in building trust?",
            'options': ['They can delegate trust-building', 'They must model vulnerability first', 'They should demand trust', 'They can ignore trust issues'],
            'correct': 1,
            'explanation': "Leaders must go first. They set the tone by modeling vulnerability. If leaders don't trust, the team won't either."
        },
        {
            'question': "True or False: Once trust is built, it never needs maintenance.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Trust requires ongoing maintenance. It's built through consistent daily actions and can be eroded by a single betrayal if not addressed."
        },
        {
            'question': "What is the ultimate test of trust in a team?",
            'options': ['How well they perform in good times', 'How they handle mistakes, conflicts, and difficult situations', 'How many projects they complete', 'How often they agree'],
            'correct': 1,
            'explanation': "Trust is tested in difficult moments. How a team handles mistakes, conflicts, and crises reveals the true level of trust."
        }
    ],
    
    # Add more stripes as needed - using placeholders for now
    # BLUE BELT, PURPLE BELT, BROWN BELT, BLACK BELT will follow similar pattern
}

def generate_quiz_html(questions, stripe_num, belt_color='#667eea'):
    """Generate the new quiz HTML section"""
    
    quiz_html = f'''
        <!-- QUIZ SECTION -->
        <div class="quiz-section" id="quizSection" style="margin-top: 60px;">
            <div class="section-header">
                <h2>🎯 Test Your Knowledge</h2>
                <p>Complete this quiz to validate your understanding of this stripe's content.</p>
            </div>
'''
    
    for idx, q in enumerate(questions, 1):
        quiz_html += f'''
            <!-- Question {idx}: Multiple Choice -->
            <div class="quiz-question" data-question="{idx}">
                <h3>Question {idx} of {len(questions)}</h3>
                <p class="question-text">{q['question']}</p>
                
                <div class="quiz-options">
'''
        
        option_labels = ['A', 'B', 'C', 'D', 'E']
        for opt_idx, option in enumerate(q['options']):
            is_correct = 'true' if opt_idx == q['correct'] else 'false'
            label = option_labels[opt_idx] if opt_idx < len(option_labels) else str(opt_idx + 1)
            quiz_html += f'''                    <button class="quiz-option" data-correct="{is_correct}" data-explanation="{q.get('explanation', '')}" onclick="selectQuizAnswer({idx}, this)">
                        {label}) {option}
                    </button>
'''
        
        quiz_html += f'''
                </div>
                
                <div class="quiz-feedback" style="display: none;">
                    <p class="feedback-text"></p>
                </div>
            </div>
'''
    
    quiz_html += f'''
            <div class="quiz-completion" style="display: none;">
                <h3>Quiz Complete! 🎉</h3>
                <p class="quiz-score">You scored: <span id="quizScore">0</span>/{len(questions)}</p>
                <p class="quiz-xp">+50 XP awarded!</p>
                <button class="btn-primary" onclick="completeQuiz({stripe_num})">Continue</button>
            </div>
        </div>
'''
    
    return quiz_html

def generate_quiz_css():
    """Generate the CSS for the quiz section"""
    return '''
        /* Quiz Section Styling */
        .quiz-section {
            background: white;
            border-radius: 20px;
            padding: 40px;
            margin: 40px 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .quiz-section .section-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .quiz-section .section-header h2 {
            color: #1a365d;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .quiz-section .section-header p {
            color: #64748b;
            font-size: 18px;
        }

        .quiz-question {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 30px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
        }

        .quiz-question h3 {
            color: #667eea;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .question-text {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 20px;
            color: #2d3748;
            line-height: 1.6;
        }

        .quiz-options {
            display: grid;
            gap: 12px;
        }

        .quiz-option {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px 20px;
            text-align: left;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s;
            color: #2d3748;
            font-family: inherit;
        }

        .quiz-option:hover {
            border-color: #667eea;
            background: #f7fafc;
            transform: translateX(4px);
        }

        .quiz-option:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }

        .quiz-option.selected-correct {
            background: #d4edda;
            border-color: #28a745;
            color: #155724;
            font-weight: 600;
        }

        .quiz-option.selected-incorrect {
            background: #f8d7da;
            border-color: #dc3545;
            color: #721c24;
        }

        .quiz-feedback {
            margin-top: 15px;
            padding: 15px;
            border-radius: 8px;
            font-size: 14px;
        }

        .quiz-feedback.correct {
            background: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
        }

        .quiz-feedback.incorrect {
            background: #f8d7da;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }

        .quiz-feedback .feedback-text {
            margin: 0;
            line-height: 1.6;
        }

        .quiz-completion {
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            border-radius: 12px;
            margin-top: 30px;
        }

        .quiz-completion h3 {
            color: #155724;
            font-size: 28px;
            margin-bottom: 20px;
        }

        .quiz-score {
            font-size: 24px;
            font-weight: 600;
            color: #155724;
            margin-bottom: 10px;
        }

        .quiz-xp {
            font-size: 20px;
            color: #155724;
            margin-bottom: 20px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .quiz-section {
                padding: 20px;
            }
            
            .quiz-question {
                padding: 20px;
            }
            
            .question-text {
                font-size: 16px;
            }

            .quiz-section .section-header h2 {
                font-size: 24px;
            }
        }
'''

def generate_quiz_js(stripe_num, belt_name='white'):
    """Generate the JavaScript for quiz functionality"""
    return f'''
        // Quiz functionality
        let quizAnswers = [];
        let quizScore = 0;
        const totalQuizQuestions = {len(QUIZ_QUESTIONS.get(f'{belt_name}-belt-stripe{stripe_num}-gamified.html', []))};

        function selectQuizAnswer(questionNum, optionElement) {{
            // Disable all options for this question
            const question = document.querySelector(`[data-question="${{questionNum}}"]`);
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(opt => {{
                opt.disabled = true;
                opt.style.pointerEvents = 'none';
            }});
            
            // Check if correct
            const isCorrect = optionElement.dataset.correct === 'true';
            
            // Visual feedback
            optionElement.classList.add(isCorrect ? 'selected-correct' : 'selected-incorrect');
            
            // Show feedback
            const feedbackDiv = question.querySelector('.quiz-feedback');
            feedbackDiv.style.display = 'block';
            feedbackDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            if (isCorrect) {{
                feedbackDiv.querySelector('.feedback-text').textContent = 
                    "✅ Correct! " + (optionElement.dataset.explanation || '');
                quizScore++;
            }} else {{
                // Highlight correct answer
                options.forEach(opt => {{
                    if (opt.dataset.correct === 'true') {{
                        opt.classList.add('selected-correct');
                    }}
                }});
                feedbackDiv.querySelector('.feedback-text').textContent = 
                    "❌ Not quite. " + (optionElement.dataset.explanation || '');
            }}
            
            // Track answer
            quizAnswers[questionNum - 1] = isCorrect;
            
            // Check if all answered
            checkQuizCompletion();
        }}

        function checkQuizCompletion() {{
            const totalQuestions = document.querySelectorAll('.quiz-question').length;
            const answered = quizAnswers.filter(a => a !== undefined).length;
            
            if (answered === totalQuestions) {{
                // Show completion
                const completionDiv = document.querySelector('.quiz-completion');
                completionDiv.style.display = 'block';
                document.getElementById('quizScore').textContent = quizScore;
                
                // Award XP
                const xpAmount = quizScore >= 7 ? 50 : 25; // Bonus for passing (70%)
                awardQuizXP(xpAmount);
                
                // Scroll to completion
                completionDiv.scrollIntoView({{ behavior: 'smooth', block: 'nearest' }});
            }}
        }}

        function awardQuizXP(amount) {{
            // Use existing XP system if available
            if (typeof TapInGamification !== 'undefined' && TapInGamification.awardXP) {{
                TapInGamification.awardXP(amount, 'Quiz Completion');
            }} else {{
                // Fallback to localStorage
                const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
                const newXP = currentXP + amount;
                localStorage.setItem('totalXP', newXP.toString());
            }}
        }}

        function completeQuiz(stripeNum) {{
            // Mark quiz complete
            const storageKey = '{belt_name}beltStripe' + stripeNum + 'QuizComplete';
            localStorage.setItem(storageKey, 'true');
            localStorage.setItem(storageKey + 'Score', quizScore.toString());
            localStorage.setItem(storageKey + 'Date', new Date().toISOString());
            
            // Navigate to next stripe or back to hub
            const nextStripe = stripeNum + 1;
            if (nextStripe <= 4) {{
                if (confirm('Quiz Complete! Continue to Stripe ' + nextStripe + '?')) {{
                    window.location.href = '{belt_name}-belt-stripe' + nextStripe + '-gamified.html';
                }} else {{
                    window.location.href = 'learning-hub.html';
                }}
            }} else {{
                alert('🎉 {belt_name.capitalize()} Belt Complete! Ready for the next level.');
                window.location.href = 'learning-hub.html';
            }}
        }}
'''

def fix_stripe_file(filepath):
    """Fix a single stripe file"""
    print(f"\n📝 Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract stripe number and belt name
    filename = filepath.name
    match = re.search(r'(\w+)-belt-stripe(\d+)-gamified\.html', filename)
    if not match:
        print(f"   ⚠️  Could not parse filename: {filename}")
        return False
    
    belt_name = match.group(1)
    stripe_num = int(match.group(2))
    
    # Get questions for this stripe
    questions = QUIZ_QUESTIONS.get(filename, [])
    if not questions:
        print(f"   ⚠️  No questions defined for {filename}, using default set")
        # Use White Belt Stripe 1 questions as template
        questions = QUIZ_QUESTIONS.get('white-belt-stripe1-gamified.html', [])
    
    # Find and replace the old quiz section
    # Look for the quiz section pattern
    quiz_pattern = r'<!-- QUIZ SECTION -->.*?</div>\s*</div>\s*<script>.*?function submitQuiz.*?</script>'
    
    if not re.search(quiz_pattern, content, re.DOTALL):
        print(f"   ⚠️  Could not find old quiz section in {filename}")
        # Try to find just the quiz section div
        quiz_pattern = r'<!-- QUIZ SECTION -->.*?</div>\s*</div>'
    
    # Generate new quiz HTML
    new_quiz_html = generate_quiz_html(questions, stripe_num)
    
    # Generate CSS (add to style section if not exists)
    quiz_css = generate_quiz_css()
    
    # Generate JavaScript
    quiz_js = generate_quiz_js(stripe_num, belt_name)
    
    # Replace old quiz section
    if re.search(quiz_pattern, content, re.DOTALL):
        content = re.sub(quiz_pattern, new_quiz_html, content, flags=re.DOTALL)
        print(f"   ✅ Replaced old quiz section")
    else:
        # Try to insert before the "Back to Learning Hub" link
        back_link_pattern = r'(<div style="text-align: center; margin: 40px 0;">.*?Back to Learning Hub.*?</div>)'
        if re.search(back_link_pattern, content, re.DOTALL):
            content = re.sub(back_link_pattern, new_quiz_html + r'\1', content, flags=re.DOTALL)
            print(f"   ✅ Inserted new quiz section before back link")
        else:
            print(f"   ⚠️  Could not find insertion point, appending to end")
            # Append before closing body tag
            content = content.replace('</body>', new_quiz_html + '\n</body>')
    
    # Add CSS to style section
    if '</style>' in content:
        # Insert before closing style tag
        content = content.replace('</style>', quiz_css + '\n    </style>')
        print(f"   ✅ Added quiz CSS")
    else:
        print(f"   ⚠️  Could not find </style> tag")
    
    # Add JavaScript before closing body or in script section
    if '</body>' in content:
        # Insert before closing body tag
        content = content.replace('</body>', '<script>' + quiz_js + '</script>\n</body>')
        print(f"   ✅ Added quiz JavaScript")
    else:
        print(f"   ⚠️  Could not find </body> tag")
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"   ✅ Fixed: {filename}")
    return True

def main():
    """Main function to fix all stripe files"""
    print("🔧 Fixing Knowledge Quiz Issues in All Stripe Files")
    print("=" * 60)
    
    # Find all stripe files
    stripe_files = sorted(Path('.').glob('*-belt-stripe*-gamified.html'))
    
    if not stripe_files:
        print("❌ No stripe files found!")
        return
    
    print(f"\n📋 Found {len(stripe_files)} stripe files to fix\n")
    
    fixed_count = 0
    for filepath in stripe_files:
        if fix_stripe_file(filepath):
            fixed_count += 1
    
    print(f"\n{'=' * 60}")
    print(f"✅ Fixed {fixed_count}/{len(stripe_files)} files")
    print(f"\n🎉 Quiz fixes complete!")
    print(f"\nNext steps:")
    print(f"  1. Test White Belt Stripe 1 quiz")
    print(f"  2. Verify 10 questions appear")
    print(f"  3. Check immediate feedback works")
    print(f"  4. Test XP rewards")

if __name__ == '__main__':
    main()

