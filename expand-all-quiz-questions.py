#!/usr/bin/env python3
"""
Expand All Quiz Questions to 10 Questions Per Stripe

This script:
1. Finds existing quiz sections in stripe files
2. Replaces them with 10-question versions
3. Uses belt-specific content
4. Maintains the new quiz format (like white-belt-stripe1-gamified.html)
"""

import re
from pathlib import Path

# Comprehensive question bank - 10 questions per stripe
QUIZ_QUESTIONS_EXPANDED = {
    # WHITE BELT
    'white-belt-stripe1-gamified.html': None,  # Already has 10 questions
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
    
    # BLUE BELT - Stripe 1: Conflict Foundations
    'blue-belt-stripe1-gamified.html': [
        {
            'question': "Productive conflict focuses on:",
            'options': ['Winning arguments', 'Issues, not individuals', 'Being polite', 'Avoiding disagreement'],
            'correct': 1,
            'explanation': "Productive conflict attacks problems, not people. It focuses on issues and ideas, not personalities or positions."
        },
        {
            'question': "According to research, conflict avoidance costs U.S. businesses annually:",
            'options': ['$35 billion', '$100 billion', '$359 billion', '$500 billion'],
            'correct': 2,
            'explanation': "Research shows conflict avoidance costs U.S. businesses $359 billion annually in wasted time, poor decisions, and lost productivity."
        },
        {
            'question': "What is 'conflict debt'?",
            'options': ['Money owed from disputes', 'Accumulated unresolved disagreements that compound over time', 'Legal costs', 'Time wasted in debates'],
            'correct': 1,
            'explanation': "Conflict debt is the accumulation of unresolved disagreements. Like technical debt, it compounds and becomes harder to address."
        },
        {
            'question': "High-performing teams resolve conflicts:",
            'options': ['Within 48 hours', 'Within 2 weeks', 'Within a month', 'Only when absolutely necessary'],
            'correct': 0,
            'explanation': "High-performing teams address conflicts quickly, typically within 48 hours. Unresolved conflict erodes trust and team performance."
        },
        {
            'question': "True or False: Healthy teams avoid all conflict.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Healthy teams engage in productive conflict. Avoiding conflict (artificial harmony) is actually the second dysfunction in Lencioni's model."
        },
        {
            'question': "What enables teams to have productive conflict?",
            'options': ['Avoiding difficult topics', 'Building vulnerability-based trust first', 'Having only experienced team members', 'Setting strict rules'],
            'correct': 1,
            'explanation': "Productive conflict requires vulnerability-based trust first. Without trust, teams fear conflict and default to artificial harmony."
        },
        {
            'question': "What happens when teams avoid conflict?",
            'options': ['Decisions are made faster', 'Important issues are buried and resurface later', 'Team harmony improves', 'Productivity increases'],
            'correct': 1,
            'explanation': "Avoiding conflict buries important issues. They don't disappear; they resurface later, often as bigger problems with more damage."
        },
        {
            'question': "In BJJ, conflict is like:",
            'options': ['Avoiding difficult positions', 'Productive rolling and sparring to test techniques', 'Only drilling, never sparring', 'Pretending positions aren\'t difficult'],
            'correct': 1,
            'explanation': "In BJJ, rolling (sparring) is productive conflict. You test techniques against resistance, learning what works and what doesn't. Avoiding it means no growth."
        },
        {
            'question': "What is the difference between productive and destructive conflict?",
            'options': ['Productive conflict is quieter', 'Productive conflict focuses on issues; destructive conflict attacks people', 'There is no difference', 'Productive conflict is shorter'],
            'correct': 1,
            'explanation': "Productive conflict debates ideas and issues. Destructive conflict attacks people, personalities, or positions. The focus matters."
        },
        {
            'question': "What is the first step when conflict arises?",
            'options': ['Ignore it and hope it goes away', 'Address it directly, focusing on the issue not the person', 'Escalate immediately to management', 'Document it for HR'],
            'correct': 1,
            'explanation': "Address conflict directly, focusing on the issue at hand. Direct, respectful confrontation prevents issues from festering and becoming bigger problems."
        }
    ],
    
    # BLUE BELT - Stripe 2: Mastering Difficult Conversations
    'blue-belt-stripe2-gamified.html': [
        {
            'question': "The COIN method stands for:",
            'options': ['Context-Opinion-Insight-Next', 'Connection-Observation-Impact-Next', 'Clarity-Outcome-Implementation-Now', 'Communicate-Organize-Integrate-Navigate'],
            'correct': 1,
            'explanation': "COIN = Connection, Observation, Impact, Next. This framework helps structure difficult conversations productively."
        },
        {
            'question': "Separating impact from intent means:",
            'options': ['Ignoring intentions', 'Assuming positive intent while addressing negative impact', 'Only focusing on outcomes', 'Judging people by their intentions'],
            'correct': 1,
            'explanation': "Separate impact from intent: assume the person had good intentions (intent) but address the negative consequences (impact) of their actions."
        },
        {
            'question': "An amygdala hijack refers to:",
            'options': ['A leadership crisis', 'When emotional response overrides rational thinking', 'A conflict resolution technique', 'Team dysfunction'],
            'correct': 1,
            'explanation': "An amygdala hijack occurs when your emotional brain (amygdala) overrides your rational brain, causing reactive, unproductive responses."
        },
        {
            'question': "When should you pause vs. push in difficult conversations?",
            'options': ['Always push for resolution', 'Always pause to avoid conflict', 'Read signals and choose strategically', 'Let the other person decide'],
            'correct': 2,
            'explanation': "Effective conflict requires reading the situation. Sometimes you pause (de-escalate), sometimes you push (maintain pressure). Context matters."
        },
        {
            'question': "True or False: Difficult conversations should always be handled face-to-face.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! While face-to-face is often best, video calls work well for remote teams. Email/text should be avoided for difficult conversations due to lack of nuance."
        },
        {
            'question': "What is the 'purpose check' before a difficult conversation?",
            'options': ['Check if you want to win', 'Clarify your goal: inform, influence, or understand', 'Decide who is right', 'Determine consequences'],
            'correct': 1,
            'explanation': "Before difficult conversations, clarify your purpose. Are you trying to inform, influence behavior, or understand? This guides your approach."
        },
        {
            'question': "Active listening in conflict means:",
            'options': ['Waiting for your turn to speak', 'Fully understanding the other person\'s perspective before responding', 'Agreeing with everything', 'Taking notes'],
            'correct': 1,
            'explanation': "Active listening means genuinely seeking to understand the other person's perspective, not just waiting for your turn to make your point."
        },
        {
            'question': "What should you do if a conversation becomes heated?",
            'options': ['Keep pushing until resolved', 'Take a break and revisit when emotions have calmed', 'Bring in more people', 'Ignore the heat'],
            'correct': 1,
            'explanation': "When emotions run high, pause the conversation. Schedule a follow-up when everyone can think clearly. Continuing while heated rarely resolves anything."
        },
        {
            'question': "In BJJ, difficult conversations are like:",
            'options': ['Avoiding tough positions', 'Drilling submissions with resistance to learn what works', 'Only rolling with lower belts', 'Pretending techniques always work'],
            'correct': 1,
            'explanation': "Just like drilling with resistance tests techniques, difficult conversations test and strengthen your communication skills. Avoidance prevents growth."
        },
        {
            'question': "The best outcome of a difficult conversation is:",
            'options': ['You win the argument', 'Both parties understand each other better', 'One person admits they were wrong', 'The issue is forgotten'],
            'correct': 1,
            'explanation': "The best outcome is mutual understanding, even if you don't fully agree. Understanding enables better collaboration going forward."
        }
    ],
    
    # BLUE BELT - Stripe 3: Team Conflict Protocols
    'blue-belt-stripe3-gamified.html': [
        {
            'question': "Conflict norms are:",
            'options': ['Unnecessary formalities', 'Explicit team agreements about how to handle disagreements', 'Ways to avoid conflict', 'HR policies'],
            'correct': 1,
            'explanation': "Conflict norms are explicit agreements teams make about how to handle disagreements. They create predictability and safety."
        },
        {
            'question': "The devil's advocate role helps teams:",
            'options': ['Create unnecessary arguments', 'Stress-test ideas before committing', 'Delay decisions', 'Undermine leadership'],
            'correct': 1,
            'explanation': "The devil's advocate role assigns someone to challenge ideas, helping teams find weaknesses before committing to decisions."
        },
        {
            'question': "Conflict retrospectives should ask:",
            'options': ['Who was right?', 'How did we handle conflict and what can we learn?', 'Should we avoid conflict next time?', 'Who needs to be punished?'],
            'correct': 1,
            'explanation': "Conflict retrospectives focus on process: How did we handle it? What worked? What can we improve? This builds conflict capability."
        },
        {
            'question': "When should conflicts be escalated?",
            'options': ['Immediately when they arise', 'Never - teams should handle everything', 'When unresolved and impacting team performance', 'Only in emergencies'],
            'correct': 2,
            'explanation': "Escalate conflicts when teams can't resolve them and performance is impacted. Don't escalate immediately; give teams a chance first."
        },
        {
            'question': "True or False: Teams should have the same conflict norms as other teams.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Each team should establish their own conflict norms based on their culture, personalities, and work style. One size doesn't fit all."
        },
        {
            'question': "What is a 'conflict contract'?",
            'options': ['A legal document', 'A team agreement on how to handle disagreements', 'An HR policy', 'A performance review'],
            'correct': 1,
            'explanation': "A conflict contract is a team-created agreement outlining how they'll handle disagreements. It makes conflict predictable and safe."
        },
        {
            'question': "Red/yellow card system in conflict means:",
            'options': ['Punishing people', 'Warning system: yellow = address it, red = escalate', 'Scoring conflict', 'Avoiding conflict'],
            'correct': 1,
            'explanation': "Red/yellow card system provides a warning mechanism. Yellow = address the conflict pattern, Red = it's time to escalate or intervene."
        },
        {
            'question': "What happens when teams lack conflict norms?",
            'options': ['They avoid conflict more', 'Conflict becomes unpredictable and destructive', 'They handle conflict better', 'Nothing changes'],
            'correct': 1,
            'explanation': "Without conflict norms, disagreements are unpredictable. Team members don't know what to expect, leading to avoidance or destructive patterns."
        },
        {
            'question': "In BJJ, conflict protocols are like:",
            'options': ['Random techniques', 'Agreed rules of rolling: tap means stop, respect positions', 'No rules', 'Only attacking'],
            'correct': 1,
            'explanation': "BJJ has clear protocols: tap means stop, respect positions, no illegal moves. These rules make intense conflict (rolling) safe and productive."
        },
        {
            'question': "The best time to establish conflict norms is:",
            'options': ['During a conflict', 'When the team first forms, before conflicts arise', 'After major conflicts', 'Never'],
            'correct': 1,
            'explanation': "Establish conflict norms proactively when the team forms. Trying to create rules during a heated conflict rarely works well."
        }
    ],
    
    # BLUE BELT - Stripe 4: Conflict Mastery
    'blue-belt-stripe4-gamified.html': [
        {
            'question': "Cross-cultural conflict requires understanding:",
            'options': ['Everyone should adapt to your culture', 'Different cultures have different conflict norms', 'Conflict is universal', 'Only language barriers matter'],
            'correct': 1,
            'explanation': "Different cultures have different conflict norms. Understanding these differences prevents miscommunication and enables productive cross-cultural conflict."
        },
        {
            'question': "In remote teams, conflict should be handled:",
            'options': ['Always via text/email', 'Move to video when possible for nuance', 'Avoid conflict entirely', 'Wait for in-person meetings'],
            'correct': 1,
            'explanation': "Remote conflict requires extra care. Move to video calls when possible - tone and body language matter. Text/email lose critical nuance."
        },
        {
            'question': "When conflict goes wrong, the best approach is:",
            'options': ['Pretend it didn\'t happen', 'Revisit and repair explicitly', 'Wait for time to heal it', 'Blame the other person'],
            'correct': 1,
            'explanation': "When conflict goes wrong, don't ignore it. Explicitly revisit and repair. Acknowledge what happened, apologize if needed, and reset."
        },
        {
            'question': "The bridge from conflict to commitment requires:",
            'options': ['Everyone agreeing', 'Full debate followed by explicit commitment question', 'Voting on decisions', 'Leadership decree'],
            'correct': 1,
            'explanation': "After full conflict and debate, explicitly ask: 'Can everyone commit to this decision?' This bridges conflict to commitment."
        },
        {
            'question': "True or False: Cultural differences in conflict are just excuses.",
            'options': ['True', 'False'],
            'correct': 1,
            'explanation': "False! Cultural differences in conflict are real. Some cultures value direct confrontation; others prefer indirect approaches. Both are valid."
        },
        {
            'question': "What is conflict 'repair work'?",
            'options': ['Fixing equipment', 'Explicitly addressing and mending relationships after conflict', 'Documenting conflicts', 'Punishing wrongdoers'],
            'correct': 1,
            'explanation': "Conflict repair work means explicitly addressing relationship damage after conflict. It involves acknowledgment, apology if needed, and rebuilding trust."
        },
        {
            'question': "Mastery of conflict means:",
            'options': ['Always winning arguments', 'Engaging in productive conflict consistently, even when uncomfortable', 'Avoiding all conflict', 'Only having conflict in meetings'],
            'correct': 1,
            'explanation': "Conflict mastery isn't about winning; it's about consistently engaging in productive conflict when needed, even when it's uncomfortable."
        },
        {
            'question': "What is the relationship between conflict and trust?",
            'options': ['Conflict destroys trust', 'Trust enables productive conflict; conflict, when handled well, builds trust', 'They are unrelated', 'Conflict always builds trust'],
            'correct': 1,
            'explanation': "Trust enables productive conflict (you feel safe to disagree). And when conflict is handled well, it actually builds trust through respect and resolution."
        },
        {
            'question': "In BJJ, mastering conflict (rolling) means:",
            'options': ['Never tapping', 'Rolling regularly, learning from each roll, adapting', 'Only rolling when you can win', 'Avoiding difficult partners'],
            'correct': 1,
            'explanation': "BJJ mastery means rolling regularly, learning from each roll, and adapting. Avoiding conflict (rolling) prevents growth. Same in teams."
        },
        {
            'question': "The ultimate goal of productive conflict is:",
            'options': ['Winning', 'Better decisions and stronger team relationships', 'Proving you\'re right', 'Avoiding future conflict'],
            'correct': 1,
            'explanation': "The goal of productive conflict is better decisions and stronger relationships. It's not about winning; it's about collective improvement."
        }
    ],
    
    # NOTE: Purple, Brown, and Black belt questions will be added next
    # Using existing 4-question sets as base and expanding to 10
}

# Add remaining questions (abbreviated for space - full version would have all 20 stripes)
# For now, I'll create a structure that can be expanded

def find_quiz_section(content):
    """Find the quiz section in HTML content"""
    # Look for quiz section markers
    patterns = [
        r'<!-- QUIZ SECTION -->.*?<!-- Footer|</body>|</html>',
        r'<div class="quiz-section".*?</div>\s*</div>\s*</div>\s*(?:<!--|</body>)',
        r'🎯 Test Your Knowledge.*?(?:<!--|</body>|</html>)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            return match.start(), match.end()
    
    return None, None

def generate_quiz_html_new_format(questions, stripe_name):
    """Generate quiz HTML in the new format (like white-belt-stripe1)"""
    
    quiz_html = '''
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
            escaped_explanation = q.get('explanation', '').replace('"', '&quot;')
            quiz_html += f'''                    <button class="quiz-option" data-correct="{is_correct}" data-explanation="{escaped_explanation}" onclick="selectQuizAnswer({idx}, this)">
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
                <button class="btn-primary" onclick="completeQuiz()">Continue</button>
            </div>
        </div>
'''
    
    return quiz_html

def expand_quiz_in_file(filepath, questions):
    """Replace quiz section with expanded 10-question version"""
    
    print(f"\n📝 Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find quiz section
    start_pos, end_pos = find_quiz_section(content)
    
    if start_pos is None:
        print(f"   ⚠️  Quiz section not found - may need manual check")
        return False
    
    # Extract stripe name from filename
    stripe_match = re.search(r'(\w+)-belt-stripe(\d+)', filepath.name)
    if stripe_match:
        belt = stripe_match.group(1)
        stripe_num = stripe_match.group(2)
        stripe_name = f"{belt}BeltStripe{stripe_num}"
    else:
        stripe_name = "stripe"
    
    # Generate new quiz HTML
    new_quiz_html = generate_quiz_html_new_format(questions, stripe_name)
    
    # Replace old quiz section
    new_content = content[:start_pos] + new_quiz_html + content[end_pos:]
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"   ✅ Expanded to {len(questions)} questions")
    return True

def main():
    """Main function to expand all quiz questions"""
    print("🔧 Expanding Quiz Questions for All Stripes")
    print("=" * 60)
    
    expanded_count = 0
    
    for filename, questions in QUIZ_QUESTIONS_EXPANDED.items():
        if questions is None:
            print(f"⏭️  Skipping {filename} (already has 10 questions)")
            continue
        
        filepath = Path(filename)
        if not filepath.exists():
            print(f"⚠️  {filename} not found, skipping...")
            continue
        
        if expand_quiz_in_file(filepath, questions):
            expanded_count += 1
    
    print(f"\n✅ Expanded {expanded_count} files!")
    print(f"📊 Next: Need to add questions for remaining stripes")

if __name__ == '__main__':
    main()

