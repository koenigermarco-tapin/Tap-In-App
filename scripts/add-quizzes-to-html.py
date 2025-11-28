#!/usr/bin/env python3
"""
Add quiz questions to all 20 stripe HTML files
Questions appear at the end, before the "Back to Learning Hub" link
"""

import re
from pathlib import Path

# Quiz questions for each stripe
QUIZ_QUESTIONS = {
    # WHITE BELT - Stripe 1: Trust Foundations
    1: [
        {
            'question': 'According to the 2025 Talent Trends Austria Report, what percentage of employees fully trust leadership?',
            'options': ['31%', '1%', '50%', '10%'],
            'correct': 1
        },
        {
            'question': "What type of trust does Lencioni's Five Dysfunctions model focus on?",
            'options': ['Predictability-based trust', 'Vulnerability-based trust', 'Professional trust', 'Competency trust'],
            'correct': 1
        },
        {
            'question': "According to Google's Project Aristotle, what was the #1 predictor of team performance?",
            'options': ['Team member IQ', 'Psychological safety', 'Years of experience', 'Available resources'],
            'correct': 1
        },
        {
            'question': 'In BJJ, what do people who progress fastest do?',
            'options': ['Never tap out', 'Tap early and ask questions', 'Only train with lower belts', 'Avoid difficult positions'],
            'correct': 1
        }
    ],
    
    # WHITE BELT - Stripe 2: Psychological Safety
    2: [
        {
            'question': 'According to Amy Edmondson, psychological safety is:',
            'options': ['Being nice and avoiding conflict', 'A shared belief that the team is safe for interpersonal risk-taking', 'Lowering performance standards', 'Always agreeing with everyone'],
            'correct': 1
        },
        {
            'question': "In Google's Project Aristotle, psychological safety explained what percentage of team performance variance?",
            'options': ['19%', '27%', '43%', '50%'],
            'correct': 2
        },
        {
            'question': 'What created psychological safety in the Just Eat Takeaway example?',
            'options': ['New HR policies', 'Leader sharing their biggest mistake first each week', 'Team-building exercises', 'Anonymous feedback surveys'],
            'correct': 1
        },
        {
            'question': 'In high-performing teams, conversational turn-taking was:',
            'options': ['Dominated by the smartest person', 'Roughly equal among all team members', 'Led only by the manager', 'Unimportant'],
            'correct': 1
        }
    ],
    
    # WHITE BELT - Stripe 3: Self-Leadership
    3: [
        {
            'question': 'Self-leadership means:',
            'options': ['Working independently without team input', 'Leading yourself before you can lead others', 'Being selfish with your time', 'Avoiding collaboration'],
            'correct': 1
        },
        {
            'question': 'Emotional regulation under pressure requires:',
            'options': ['Suppressing all emotions', 'Practice and deliberate techniques', 'Natural talent', 'Avoiding stressful situations'],
            'correct': 1
        },
        {
            'question': 'The "base position" in BJJ refers to:',
            'options': ['The starting position of a match', 'Physical stability that enables mental clarity', 'A defensive-only strategy', 'The lowest belt level'],
            'correct': 1
        },
        {
            'question': 'Why is self-awareness critical for leadership?',
            'options': ['It makes you popular', 'You cannot lead others beyond your own level of self-understanding', 'It helps you avoid conflict', 'It makes decisions easier'],
            'correct': 1
        }
    ],
    
    # WHITE BELT - Stripe 4: Vulnerability in Action
    4: [
        {
            'question': 'The "Grip-Switch" drill teaches:',
            'options': ['Physical strength techniques', 'Trust through touch and giving/receiving control', 'Competition tactics', 'Defensive maneuvers'],
            'correct': 1
        },
        {
            'question': 'When admitting a mistake, effective leaders:',
            'options': ['Minimize and deflect', 'Name it clearly and state what they learned', 'Blame external factors', 'Avoid mentioning it'],
            'correct': 1
        },
        {
            'question': 'Asking for help is a sign of:',
            'options': ['Weakness and incompetence', 'Strength and self-awareness', 'Poor planning', 'Leadership failure'],
            'correct': 1
        },
        {
            'question': 'White Belt mastery means:',
            'options': ['Never making mistakes', 'Having all the answers', 'Building trust through consistent vulnerability', 'Completing all assignments'],
            'correct': 2
        }
    ],
    
    # BLUE BELT - Stripe 5: Conflict Foundations
    5: [
        {
            'question': 'Productive conflict focuses on:',
            'options': ['Winning arguments', 'Issues, not individuals', 'Being polite', 'Avoiding disagreement'],
            'correct': 1
        },
        {
            'question': 'According to research, conflict avoidance costs U.S. businesses annually:',
            'options': ['$35 billion', '$100 billion', '$359 billion', '$500 billion'],
            'correct': 2
        },
        {
            'question': 'What is "conflict debt"?',
            'options': ['Money owed from disputes', 'Accumulated unresolved disagreements that compound', 'Legal costs', 'Time wasted in debates'],
            'correct': 1
        },
        {
            'question': 'High-performing teams resolve conflicts:',
            'options': ['Within 48 hours', 'Within 2 weeks', 'Within a month', 'Only when absolutely necessary'],
            'correct': 0
        }
    ],
    
    # BLUE BELT - Stripe 6: Mastering Difficult Conversations
    6: [
        {
            'question': 'The COIN method stands for:',
            'options': ['Context-Opinion-Insight-Next', 'Connection-Observation-Impact-Next', 'Clarity-Outcome-Implementation-Now', 'Communicate-Organize-Integrate-Navigate'],
            'correct': 1
        },
        {
            'question': 'Separating impact from intent means:',
            'options': ['Ignoring intentions', 'Assuming positive intent while addressing negative impact', 'Only focusing on outcomes', 'Judging people by their intentions'],
            'correct': 1
        },
        {
            'question': 'An amygdala hijack refers to:',
            'options': ['A leadership crisis', 'When emotional response overrides rational thinking', 'A conflict resolution technique', 'Team dysfunction'],
            'correct': 1
        },
        {
            'question': 'When should you pause vs. push in difficult conversations?',
            'options': ['Always push for resolution', 'Always pause to avoid conflict', 'Read signals and choose strategically', 'Let the other person decide'],
            'correct': 2
        }
    ],
    
    # BLUE BELT - Stripe 7: Team Conflict Protocols
    7: [
        {
            'question': 'Conflict norms are:',
            'options': ['Unnecessary formalities', 'Explicit team agreements about how to handle disagreements', 'Ways to avoid conflict', 'HR policies'],
            'correct': 1
        },
        {
            'question': 'The devil\'s advocate role helps teams:',
            'options': ['Create unnecessary arguments', 'Stress-test ideas before committing', 'Delay decisions', 'Undermine leadership'],
            'correct': 1
        },
        {
            'question': 'Conflict retrospectives should ask:',
            'options': ['Who was right?', 'How did we handle conflict and what can we learn?', 'Should we avoid conflict next time?', 'Who needs to be punished?'],
            'correct': 1
        },
        {
            'question': 'When should conflicts be escalated?',
            'options': ['Immediately when they arise', 'Never - teams should handle everything', 'When unresolved and impacting team performance', 'Only in emergencies'],
            'correct': 2
        }
    ],
    
    # BLUE BELT - Stripe 8: Conflict Mastery
    8: [
        {
            'question': 'Cross-cultural conflict requires understanding:',
            'options': ['Everyone should adapt to your culture', 'Different cultures have different conflict norms', 'Conflict is universal', 'Only language barriers matter'],
            'correct': 1
        },
        {
            'question': 'In remote teams, conflict should be handled:',
            'options': ['Always via text/email', 'Move to video when possible for nuance', 'Avoid conflict entirely', 'Wait for in-person meetings'],
            'correct': 1
        },
        {
            'question': 'When conflict goes wrong, the best approach is:',
            'options': ['Pretend it didn\'t happen', 'Revisit and repair explicitly', 'Wait for time to heal it', 'Blame the other person'],
            'correct': 1
        },
        {
            'question': 'The bridge from conflict to commitment requires:',
            'options': ['Everyone agreeing', 'Full debate followed by explicit commitment question', 'Voting on decisions', 'Leadership decree'],
            'correct': 1
        }
    ],
    
    # PURPLE BELT - Stripe 9: Commitment Foundations
    9: [
        {
            'question': 'When team members nod in meetings but don\'t execute after, the root cause is usually:',
            'options': ['Lack of skills', 'Lack of commitment due to unclear decisions', 'Lack of time', 'Lack of resources'],
            'correct': 1
        },
        {
            'question': 'The "Disagree and Commit" principle means:',
            'options': ['Everyone must agree before moving forward', 'Leaders make decisions alone', 'Voice concerns fully, then commit to the decision', 'Only commit to decisions you personally agree with'],
            'correct': 2
        },
        {
            'question': 'According to research, what percentage of strategic clarity is lost between each organizational level?',
            'options': ['10-15%', '25-30%', '40-50%', '60-70%'],
            'correct': 2
        },
        {
            'question': 'In BJJ, commitment is like:',
            'options': ['Choosing a submission and forcing it', 'Committing to a position before seeing the outcome', 'Abandoning a technique if it feels uncomfortable', 'Waiting for the perfect moment that never comes'],
            'correct': 1
        }
    ],
    
    # PURPLE BELT - Stripe 10: Creating Clarity
    10: [
        {
            'question': 'Buy-in differs from consensus because:',
            'options': ['It requires everyone to agree', 'It requires everyone to commit regardless of initial agreement', 'It\'s faster but less effective', 'It\'s only needed for major decisions'],
            'correct': 1
        },
        {
            'question': 'How many times should leaders communicate key decisions for them to stick?',
            'options': ['Once, clearly', '2-3 times', '5-7 times', '10+ times'],
            'correct': 2
        },
        {
            'question': 'A "commitment ritual" might include:',
            'options': ['Everyone verbally stating what they\'ll do by when', 'Silent agreement', 'Written signatures on documents', 'Manager follow-up emails'],
            'correct': 0
        },
        {
            'question': 'In rolling, commitment shows when you:',
            'options': ['Hesitate mid-technique', 'Fully commit to a pass even if unsure', 'Wait for perfect setups', 'Abandon plans quickly'],
            'correct': 1
        }
    ],
    
    # PURPLE BELT - Stripe 11: Driving Buy-In
    11: [
        {
            'question': 'When everything is a priority:',
            'options': ['Teams work harder', 'Nothing is actually a priority', 'Leaders must delegate more', 'More resources are needed'],
            'correct': 1
        },
        {
            'question': 'The best teams limit work-in-progress to:',
            'options': ['As many initiatives as team members', '1-2 critical goals at a time', '5-7 major projects', 'Whatever stakeholders request'],
            'correct': 1
        },
        {
            'question': 'Saying "no" to good opportunities is necessary because:',
            'options': ['Resources are always limited', 'Commitment requires trade-offs', 'Focus creates better outcomes than diffusion', 'All of the above'],
            'correct': 3
        },
        {
            'question': 'In BJJ, trying to do "everything" leads to:',
            'options': ['Mastery of all techniques', 'Being average at many things, excellent at none', 'Faster progression', 'Better competition results'],
            'correct': 1
        }
    ],
    
    # PURPLE BELT - Stripe 12: Commitment Mastery
    12: [
        {
            'question': 'When deadlines consistently slip, teams lose:',
            'options': ['Money', 'Credibility and trust', 'Talent', 'Customers'],
            'correct': 1
        },
        {
            'question': 'Course correction is healthier than blind commitment when:',
            'options': ['Teams feel uncomfortable', 'New information fundamentally changes assumptions', 'Leaders want to avoid accountability', 'Individual contributors disagree'],
            'correct': 1
        },
        {
            'question': 'The best accountability systems are:',
            'options': ['Manager-driven', 'Peer-driven', 'HR-driven', 'Tool-driven'],
            'correct': 1
        },
        {
            'question': 'Commitment in BJJ means:',
            'options': ['Never tapping', 'Finishing every technique you start', 'Committing fully to positions while staying adaptive', 'Always going for submissions'],
            'correct': 2
        }
    ],
    
    # BROWN BELT - Stripe 13: Accountability Foundations
    13: [
        {
            'question': 'Peer accountability works better than top-down because:',
            'options': ['Managers are too busy', 'Peers interact daily and spot issues faster', 'It\'s less confrontational', 'HR recommends it'],
            'correct': 1
        },
        {
            'question': '"Calling in" means:',
            'options': ['Reporting issues to management', 'Addressing issues privately with care', 'Ignoring problems', 'Public confrontation'],
            'correct': 1
        },
        {
            'question': 'When teams avoid accountability, performance:',
            'options': ['Improves due to autonomy', 'Stays the same', 'Declines gradually then rapidly', 'Depends on individual motivation'],
            'correct': 2
        },
        {
            'question': 'In rolling, accountability looks like:',
            'options': ['Your partner tapping when caught', 'Both partners respecting position and technique', 'Calling out bad technique', 'Only the coach providing feedback'],
            'correct': 1
        }
    ],
    
    # BROWN BELT - Stripe 14: Accountability Skills
    14: [
        {
            'question': 'Standards differ from expectations because:',
            'options': ['They\'re written down', 'They\'re non-negotiable and consistently enforced', 'They come from leadership', 'They\'re easier to measure'],
            'correct': 1
        },
        {
            'question': 'Radical Candor combines:',
            'options': ['Honesty and empathy', 'Care personally and challenge directly', 'Feedback and consequences', 'Standards and flexibility'],
            'correct': 1
        },
        {
            'question': 'Accountability without blame focuses on:',
            'options': ['Who made the mistake', 'What happened and how to prevent it', 'Punishing poor performance', 'Documentation for HR'],
            'correct': 1
        },
        {
            'question': 'In BJJ, holding position demonstrates:',
            'options': ['Superior strength', 'Technical accountability to fundamentals', 'Stalling', 'Defensive mindset'],
            'correct': 1
        }
    ],
    
    # BROWN BELT - Stripe 15: Accountability Systems
    15: [
        {
            'question': 'Issues should be addressed:',
            'options': ['Immediately when noticed', 'After three occurrences', 'During annual reviews', 'When they become serious'],
            'correct': 0
        },
        {
            'question': 'High-performing teams combine:',
            'options': ['High standards + high support', 'High standards + high pressure', 'High autonomy + low oversight', 'High safety + low expectations'],
            'correct': 0
        },
        {
            'question': '"Feedback velocity" means:',
            'options': ['Speaking quickly in feedback sessions', 'The speed from observation to conversation', 'Number of feedback sessions per quarter', 'How fast people improve'],
            'correct': 1
        },
        {
            'question': 'Delayed feedback in BJJ:',
            'options': ['Allows bad habits to solidify', 'Gives time for self-correction', 'Builds independence', 'Prevents over-coaching'],
            'correct': 0
        }
    ],
    
    # BROWN BELT - Stripe 16: Accountability Mastery
    16: [
        {
            'question': 'Public performance metrics work when:',
            'options': ['They shame poor performers', 'They create transparency and shared responsibility', 'Only leaders see them', 'They\'re used for compensation decisions'],
            'correct': 1
        },
        {
            'question': 'Self-correction happens when:',
            'options': ['Managers constantly monitor', 'Teams own their metrics and standards', 'Consequences are severe', 'External pressure increases'],
            'correct': 1
        },
        {
            'question': 'Accountability rituals might include:',
            'options': ['Daily stand-ups where commitments are stated', 'Weekly retrospectives on missed goals', 'Monthly one-on-ones', 'All of the above'],
            'correct': 3
        },
        {
            'question': 'In competition, accountability shows through:',
            'options': ['Winning', 'Consistent drilling of fundamentals', 'Training when you don\'t feel like it', 'Both B and C'],
            'correct': 3
        }
    ],
    
    # BLACK BELT - Stripe 17: Results Foundations
    17: [
        {
            'question': 'Teams fail when members:',
            'options': ['Prioritize individual metrics over team goals', 'Work too collaboratively', 'Don\'t compete internally', 'Focus too much on results'],
            'correct': 0
        },
        {
            'question': 'A shared scoreboard should:',
            'options': ['Rank individual performance', 'Show only lagging indicators', 'Display collective progress toward shared goals', 'Be kept private'],
            'correct': 2
        },
        {
            'question': '"Ego is the enemy" means:',
            'options': ['Confidence is bad', 'Personal pride blocks team success', 'Individual achievement doesn\'t matter', 'Only team wins count'],
            'correct': 1
        },
        {
            'question': 'In team training, the goal is:',
            'options': ['Being the best in the room', 'Everyone getting better together', 'Individual promotion', 'Proving superiority'],
            'correct': 1
        }
    ],
    
    # BLACK BELT - Stripe 18: Defining Success
    18: [
        {
            'question': 'Leading indicators:',
            'options': ['Show past results', 'Predict future outcomes', 'Are easier to measure', 'Matter less than lagging indicators'],
            'correct': 1
        },
        {
            'question': 'Course correction should happen:',
            'options': ['Quarterly', 'When results miss targets', 'Continuously based on leading indicators', 'After project completion'],
            'correct': 2
        },
        {
            'question': 'Celebrating wins reinforces:',
            'options': ['Complacency', 'The behaviors that led to success', 'Individual achievement', 'Competitive advantage'],
            'correct': 1
        },
        {
            'question': 'In competition, learning happens most when:',
            'options': ['You win', 'You analyze both wins and losses', 'You focus only on what worked', 'Your coach tells you what to fix'],
            'correct': 1
        }
    ],
    
    # BLACK BELT - Stripe 19: Sustaining Results
    19: [
        {
            'question': 'Activity-based cultures reward:',
            'options': ['Busyness', 'Long hours', 'Meeting attendance', 'All of the above'],
            'correct': 3
        },
        {
            'question': 'Quarterly cycles work because:',
            'options': ['They align with business calendars', 'They balance urgency with strategic perspective', 'HR recommends them', 'They\'re easier to plan'],
            'correct': 1
        },
        {
            'question': 'Outcome clarity means:',
            'options': ['Everyone knows the goal', 'Everyone knows what success looks like specifically', 'Goals are documented', 'Leaders set targets'],
            'correct': 1
        },
        {
            'question': 'Black belts focus on:',
            'options': ['Learning new techniques constantly', 'Mastering fundamentals at highest level', 'Flashy moves', 'Competition wins only'],
            'correct': 1
        }
    ],
    
    # BLACK BELT - Stripe 20: Legacy Leadership
    20: [
        {
            'question': 'Legacy is built through:',
            'options': ['Personal achievements', 'Systems and people you develop', 'Titles and promotions', 'Years of service'],
            'correct': 1
        },
        {
            'question': 'The best leaders:',
            'options': ['Are irreplaceable', 'Make themselves unnecessary', 'Maintain control', 'Do the most important work themselves'],
            'correct': 1
        },
        {
            'question': 'Embodied leadership means:',
            'options': ['Physical fitness', 'Living your values under pressure', 'Demonstrating techniques', 'Leading by example only'],
            'correct': 1
        },
        {
            'question': 'A black belt is:',
            'options': ['The end of the journey', 'The beginning of true mastery', 'A status symbol', 'Proof of superiority'],
            'correct': 1
        }
    ],
}

def generate_quiz_html(questions, stripe_num):
    """Generate quiz HTML for a stripe"""
    
    quiz_html = '''
        <!-- QUIZ SECTION -->
        <div class="progress-section" style="margin-top: 60px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 3px solid #2563eb;">
            <h2 style="color: #1e40af; margin-bottom: 20px; font-size: 28px;">📝 Stripe Knowledge Check</h2>
            <p style="color: #1e40af; margin-bottom: 30px; font-size: 16px;">
                Answer all questions to complete this stripe and earn your bonus XP!
            </p>
'''
    
    for idx, q in enumerate(questions, 1):
        quiz_html += f'''
            <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; border: 2px solid #cbd5e1;">
                <p style="font-size: 18px; font-weight: 600; color: #1a365d; margin-bottom: 15px;">
                    {idx}. {q['question']}
                </p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
'''
        
        for opt_idx, option in enumerate(q['options']):
            is_correct = 'data-correct="true"' if opt_idx == q['correct'] else ''
            quiz_html += f'''
                    <label style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; transition: all 0.3s;" class="quiz-option">
                        <input type="radio" name="quiz_q{idx}" value="{opt_idx}" {is_correct} style="width: 20px; height: 20px;">
                        <span style="color: #475569; font-size: 16px;">{option}</span>
                    </label>
'''
        
        quiz_html += '''
                </div>
            </div>
'''
    
    quiz_html += f'''
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="submitQuiz({stripe_num})" class="btn btn-primary" style="padding: 18px 40px; font-size: 18px;">
                    Submit Quiz & Complete Stripe <span class="xp-badge">+100 XP Bonus</span>
                </button>
                <p id="quizFeedback" style="margin-top: 20px; font-size: 16px; font-weight: 600;"></p>
            </div>
        </div>

        <script>
        function submitQuiz(stripeNum) {{
            const totalQuestions = {len(questions)};
            let answered = 0;
            let correct = 0;
            
            for (let i = 1; i <= totalQuestions; i++) {{
                const selected = document.querySelector('input[name="quiz_q' + i + '"]:checked');
                if (selected) {{
                    answered++;
                    if (selected.dataset.correct === "true") {{
                        correct++;
                    }}
                }}
            }}
            
            if (answered < totalQuestions) {{
                alert('Please answer all ' + totalQuestions + ' questions before submitting!');
                return;
            }}
            
            const percentage = Math.round((correct / totalQuestions) * 100);
            const passed = percentage >= 70;
            
            if (passed) {{
                // Award bonus XP
                let xp = parseInt(localStorage.getItem('whitebeltStripe' + stripeNum + 'ModuleXP') || '0');
                xp += 100;
                localStorage.setItem('whitebeltStripe' + stripeNum + 'ModuleXP', xp);
                
                alert('✓ Quiz Passed!\\n\\nScore: ' + correct + '/' + totalQuestions + ' (' + percentage + '%)\\n+100 XP Bonus Earned!\\n\\nStripe ' + stripeNum + ' Complete!');
                
                // Navigate to next stripe or back to hub
                const nextStripe = stripeNum + 1;
                if (nextStripe <= 4) {{
                    if (confirm('Continue to Stripe ' + nextStripe + '?')) {{
                        window.location.href = 'white-belt-stripe' + nextStripe + '-gamified.html';
                    }} else {{
                        window.location.href = 'learning-hub.html';
                    }}
                }} else {{
                    alert('🎉 White Belt Complete! Ready for Blue Belt.');
                    window.location.href = 'learning-hub.html';
                }}
            }} else {{
                document.getElementById('quizFeedback').innerHTML = 
                    '<span style="color: #dc2626;">Score: ' + correct + '/' + totalQuestions + ' (' + percentage + '%) - Need 70% to pass. Review lessons and try again!</span>';
            }}
        }}
        </script>
'''
    
    return quiz_html

def add_quiz_to_file(html_file, stripe_num):
    """Add quiz section to an HTML file before the footer"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if quiz already exists
    if 'Stripe Knowledge Check' in content or 'submitQuiz' in content:
        print(f"⏭️  {html_file.name} already has quiz, skipping")
        return False
    
    # Find the insertion point (before nav buttons or footer)
    # Try multiple possible markers
    possible_markers = [
        '<div style="text-align: center; margin: 40px 0;">',
        '<div class="nav-buttons">',
        '<!-- Footer/Navigation -->',
    ]
    
    insertion_marker = None
    for marker in possible_markers:
        if marker in content:
            insertion_marker = marker
            break
    
    if not insertion_marker:
        print(f"⚠️  Could not find insertion point in {html_file.name}")
        return False
    
    # Get questions for this stripe
    if stripe_num not in QUIZ_QUESTIONS:
        print(f"⚠️  No questions defined for stripe {stripe_num}")
        return False
    
    # Generate quiz HTML
    quiz_html = generate_quiz_html(QUIZ_QUESTIONS[stripe_num], stripe_num)
    
    # Insert quiz before footer
    content = content.replace(insertion_marker, quiz_html + '\n        ' + insertion_marker)
    
    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Added quiz to {html_file.name}")
    return True

if __name__ == '__main__':
    # Process all belts
    belts = [
        ('white', range(1, 5)),
        ('blue', range(5, 9)),
        ('purple', range(9, 13)),
        ('brown', range(13, 17)),
        ('black', range(17, 21))
    ]
    
    total_updated = 0
    
    for belt_color, stripe_range in belts:
        belt_updated = 0
        for stripe_num in stripe_range:
            html_file = Path(f'{belt_color}-belt-stripe{stripe_num - (stripe_range.start - 1)}-gamified.html')
            
            if not html_file.exists():
                print(f"⏭️  {html_file} not found")
                continue
            
            if add_quiz_to_file(html_file, stripe_num):
                belt_updated += 1
                total_updated += 1
        
        if belt_updated > 0:
            print(f"✅ {belt_color.title()} Belt: {belt_updated} files updated")
    
    print(f"\n{'='*50}")
    print(f"✅ Total files updated: {total_updated}")
    print(f"📊 Total questions added: {total_updated * 4}")
    print(f"\n🧪 TEST: Open white-belt-stripe1-gamified.html")
    print(f"   Scroll to bottom → You should see quiz questions")

