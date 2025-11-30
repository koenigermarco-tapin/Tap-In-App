#!/usr/bin/env python3
"""
Generate Purple Belt Quiz Questions
Creates 40 high-quality, scenario-based questions across 4 stripes
"""

import re
from pathlib import Path

# Purple Belt Stripe 1: Strategic Thinking (10 questions)
PURPLE_STRIPE1_QUESTIONS = [
    {
        "question": "Your team is split 50/50 on a major technical decision. Half prefer Solution A (faster to market but technical debt), half prefer Solution B (cleaner architecture but slower). As a Purple Belt leader, your FIRST move is:",
        "options": [
            "Call a vote and go with the majority decision",
            "Make the executive decision yourself to break the tie",
            "Explore the underlying concerns driving each group's preference",
            "Table the decision and gather more competitive intelligence"
        ],
        "correct": 2,
        "explanation": "Excellent strategic thinking! Purple Belt leaders understand that surface-level positions ('I want A' vs 'I want B') often hide deeper shared interests. By exploring WHY each group prefers their option, you might discover Solution C that addresses both speed AND quality. This is Roger Martin's 'integrative thinking' - refusing to accept trade-offs as permanent."
    },
    {
        "question": "You notice your team consistently choosing 'urgent' tasks over 'important' strategic work. What does this pattern likely indicate?",
        "options": [
            "Your team lacks discipline and time management skills",
            "The system is optimized for short-term fires over long-term value",
            "You need to micromanage their priorities more closely",
            "Strategic work is less valuable than you thought"
        ],
        "correct": 1,
        "explanation": "Perfect systems thinking! You're seeing the pattern behind the pattern. When good people consistently make suboptimal choices, the system is usually the problem, not the people. This is Peter Senge's 'Fifth Discipline' - recognizing that structures influence behavior. Your job is to redesign the system (incentives, metrics, meeting structures) to reward strategic work."
    },
    {
        "question": "A key team member proposes a radical new approach that contradicts your current strategy. You should:",
        "options": [
            "Politely decline - consistency is crucial when executing strategy",
            "Ask them to prove it would work before changing course",
            "Create space to seriously explore the idea while maintaining current execution",
            "Immediately pivot if their reasoning is sound"
        ],
        "correct": 2,
        "explanation": "Strong strategic leadership! You're balancing commitment with flexibility. Rita McGrath calls this 'discovery-driven strategy' - staying committed to your vision while remaining open to better paths. The key is creating dual tracks: execute today's strategy while seriously exploring tomorrow's possibilities. This prevents both rigid dogmatism and chaotic pivoting."
    },
    {
        "question": "When setting quarterly goals for your team, the most strategic approach is to:",
        "options": [
            "Set aggressive stretch goals to maximize team performance",
            "Let the team set their own goals to ensure buy-in",
            "Work backward from the future state you want to create",
            "Base goals on what competitors are doing"
        ],
        "correct": 2,
        "explanation": "Excellent! You're demonstrating 'Playing to Win' strategic thinking (Roger Martin). Strategy isn't about setting goals based on current capacity or competition - it's about defining where you want to be and working backward. This forces creative thinking: 'If we must be here in 3 years, what must be true in 9 months?' This is how transformative strategies emerge."
    },
    {
        "question": "Your analysis reveals that 80% of your team's time goes to activities generating only 20% of impact. The Purple Belt response is:",
        "options": [
            "Immediately cut the low-impact work and reallocate time",
            "Accept this as natural - some work is necessary overhead",
            "Investigate WHY the system makes low-impact work feel necessary",
            "Hire more people to handle the low-impact tasks"
        ],
        "correct": 2,
        "explanation": "Perfect systems analysis! You're not just seeing the symptom (80/20 mismatch), you're asking about root causes. Usually, low-impact work feels necessary because of system design: unclear priorities, poor delegation, reactive culture, or misaligned metrics. Fix the system that makes low-impact work 'urgent,' and behavior will shift naturally. This is leverage."
    },
    {
        "question": "You're deciding whether to enter a new market. Your team's analysis shows a 40% chance of success with high potential returns. What strategic principle should guide your decision?",
        "options": [
            "Don't enter - 40% is too risky for major resource allocation",
            "Enter if potential returns exceed potential losses by 2:1",
            "Create small experiments to reduce uncertainty before full commitment",
            "Enter immediately to establish first-mover advantage"
        ],
        "correct": 2,
        "explanation": "Smart strategic experimentation! Instead of binary go/no-go decisions, Purple Belt leaders create options. Small, low-cost experiments (pilot programs, limited releases, partnerships) reveal information that reduces uncertainty. This is 'optionality' - preserving the ability to make better decisions later. Clayton Christensen's 'Jobs to Be Done' framework emphasizes learning before committing."
    },
    {
        "question": "Two departments are competing for the same budget allocation, each making strong cases. As a strategic leader, you should:",
        "options": [
            "Split the budget 50/50 to maintain harmony",
            "Give it to the department with the strongest proposal",
            "Reframe the question: What outcomes do we need, and which allocation best achieves them?",
            "Defer the decision until you have more data"
        ],
        "correct": 2,
        "explanation": "Strategic reframing! When teams compete for resources, shift from 'Who gets what?' to 'What outcomes matter most?' This moves the conversation from zero-sum competition to collaborative problem-solving. Often, the answer isn't splitting resources - it's reimagining how to achieve outcomes differently. This is integrative thinking in action."
    },
    {
        "question": "Your strategic plan assumes steady market growth, but early indicators suggest a shift. What's the Purple Belt response?",
        "options": [
            "Stick to the plan - strategic plans should be stable for at least a year",
            "Immediately revise the entire strategy to match new conditions",
            "Identify which assumptions are most critical and monitor them closely",
            "Wait for more definitive data before making any changes"
        ],
        "correct": 2,
        "explanation": "Assumption monitoring is key! Rita McGrath teaches that strategy is about managing assumptions, not following plans. Identify your critical assumptions (the ones that, if wrong, would invalidate your strategy) and create early-warning signals. This lets you adapt quickly when conditions shift, rather than being blindsided or overreacting to noise."
    },
    {
        "question": "You're choosing between investing in customer acquisition vs. customer retention. Both are important. The strategic approach is:",
        "options": [
            "Focus on acquisition - you can't retain customers you don't have",
            "Focus on retention - it's cheaper than acquisition",
            "Calculate the lifetime value impact of each and invest where leverage is highest",
            "Split investment equally between both"
        ],
        "correct": 2,
        "explanation": "Strategic leverage thinking! Instead of choosing between two goods, calculate where marginal investment creates the most value. If retention improvements yield 3x ROI but acquisition yields 1.5x, that's your answer - regardless of conventional wisdom. This is systems thinking: optimizing the whole, not individual parts. Strategic decisions are about leverage, not tradition."
    },
    {
        "question": "Your organization faces a strategic dilemma: innovate in new areas (risky, potentially transformative) or optimize existing operations (safe, incremental gains). What's the Purple Belt approach?",
        "options": [
            "Focus on optimization - proven value is better than potential value",
            "Focus on innovation - incremental improvement leads to irrelevance",
            "Create separate tracks: optimization funds innovation, innovation reveals optimization opportunities",
            "Let market conditions determine the focus"
        ],
        "correct": 2,
        "explanation": "Dual-track strategy! This is 'ambidextrous leadership' - excelling at both exploration (innovation) and exploitation (optimization). The best organizations do both simultaneously: optimization provides resources and stability; innovation provides future relevance. They're not competitors - they're complements. This requires different metrics, timelines, and even team structures. Strategic maturity means holding both tensions."
    }
]

# Purple Belt Stripe 2: Systems Thinking (10 questions)
PURPLE_STRIPE2_QUESTIONS = [
    {
        "question": "Your team keeps missing deadlines despite working harder. You notice they're constantly interrupted by urgent requests. This is a:",
        "options": [
            "People problem - they need better time management training",
            "System problem - the work design creates constant interruption",
            "Resource problem - you need to hire more people",
            "Priority problem - they're not focusing on the right work"
        ],
        "correct": 1,
        "explanation": "Systems thinking recognizes that patterns reveal structures. When capable people consistently produce poor results, the system is usually designed to produce those results. Interruptions aren't random - they're built into workflows, notification systems, and cultural expectations. Fix the system (batch communication, protected time blocks, clearer priorities) and behavior changes automatically."
    },
    {
        "question": "You implement a new policy to solve a problem, but it creates two new problems. This likely means:",
        "options": [
            "The policy was poorly designed",
            "You're seeing unintended consequences of a structural fix",
            "People are resisting change",
            "The original problem wasn't worth solving"
        ],
        "correct": 1,
        "explanation": "Systems have feedback loops. When you push in one place, the system pushes back elsewhere. This is why 'quick fixes' often create new problems. Systems thinking maps causal loops: 'If we do X, then Y happens, which causes Z...' The solution isn't better policies - it's understanding the system structure that creates the pattern in the first place."
    },
    {
        "question": "You notice that the more you track a metric, the less useful it becomes. This is an example of:",
        "options": [
            "Poor measurement design",
            "Goodhart's Law - when a measure becomes a target, it ceases to be a good measure",
            "Metric fatigue",
            "Need for better analytics tools"
        ],
        "correct": 1,
        "explanation": "Goodhart's Law is a classic systems thinking insight: when you optimize for a metric, people game the metric. The measure loses its informational value. Systems thinkers use metrics to understand, not to control. The solution is balancing metrics (measure multiple dimensions) and focusing on outcomes, not just outputs."
    },
    {
        "question": "Your team productivity increases after removing a status update meeting. This suggests:",
        "options": [
            "The meeting was a waste of time",
            "The meeting created a negative feedback loop (more updates = more confusion = less productivity)",
            "People work better without oversight",
            "The meeting time was needed for actual work"
        ],
        "correct": 1,
        "explanation": "Systems thinking identifies feedback loops. Some structures amplify problems (reinforcing loops) or create delays that cause oscillations (balancing loops). Meetings often create unintended feedback: status updates → misalignment → more updates → less time for work → worse outcomes → more updates. Removing the loop improves the system more than optimizing individual components."
    },
    {
        "question": "You want to improve team collaboration. The systems thinking approach is to:",
        "options": [
            "Create more collaboration tools and platforms",
            "Mandate regular collaboration sessions",
            "Understand what structural barriers prevent natural collaboration",
            "Reward individual collaboration efforts"
        ],
        "correct": 2,
        "explanation": "Systems thinking asks: What structures make collaboration difficult? Is it reward systems (individual bonuses)? Physical layout (separate offices)? Workflow design (siloed processes)? Information architecture (hoarded knowledge)? Fix the structural barriers, and collaboration emerges naturally. Adding tools without fixing structures just adds complexity."
    },
    {
        "question": "A project is consistently late. You discover each team member adds 'safety buffers' to their estimates. This creates:",
        "options": [
            "A planning problem - estimates are too conservative",
            "A coordination problem - buffers don't align across teams",
            "A system effect - individual rational decisions create collective irrationality",
            "A trust problem - people don't believe the timeline"
        ],
        "correct": 2,
        "explanation": "This is the 'Student Syndrome' - a systems archetype. Individual buffers seem rational, but they create system delays: late starts (plenty of time), delayed handoffs (my buffer, not yours), and accumulated delays. The system structure (individual estimation, sequential dependencies) creates the pattern. Fix: shared buffers, parallel work, earlier starts, and measuring system time, not individual time."
    },
    {
        "question": "You notice that faster response times to customer issues correlate with more issues overall. This likely indicates:",
        "options": [
            "Faster responses cause more problems",
            "A balancing feedback loop - quick fixes don't address root causes",
            "Measurement error - correlation isn't causation",
            "Customer expectations are increasing"
        ],
        "correct": 1,
        "explanation": "This is 'Shifting the Burden' - a systems archetype. Quick fixes (fast responses) reduce symptoms temporarily but don't address underlying causes. The system learns to depend on quick fixes, creating more issues. The leverage point is fixing root causes (better product, clearer documentation, prevention), even if it slows initial responses. Systems thinking finds leverage points."
    },
    {
        "question": "Your organization's innovation rate has decreased despite hiring more creative people. Systems thinking suggests:",
        "options": [
            "You're hiring the wrong people",
            "The innovation system (processes, metrics, rewards) has changed to favor safety over creativity",
            "Market conditions have changed",
            "Innovation naturally declines as organizations grow"
        ],
        "correct": 1,
        "explanation": "Systems thinking distinguishes people from system design. If changing people doesn't change outcomes, the system is the problem. Innovation systems include: risk tolerance, failure acceptance, experimentation time, reward structures, and decision-making processes. These structures determine innovation rates more than individual creativity. Fix the innovation system, not just the people."
    },
    {
        "question": "You improve a process in Department A, but overall organizational performance doesn't improve. This is because:",
        "options": [
            "The improvement wasn't significant enough",
            "Department A isn't the bottleneck - optimizing non-bottlenecks doesn't improve the system",
            "Other departments are counteracting the improvement",
            "The metrics are flawed"
        ],
        "correct": 1,
        "explanation": "Systems thinking applies the Theory of Constraints: system performance is limited by the bottleneck. Optimizing non-bottlenecks (Department A) doesn't improve system throughput - it just creates more inventory/waste. Find the constraint, optimize it, then find the next constraint. System optimization, not local optimization, is the goal."
    },
    {
        "question": "True or False: In systems thinking, the solution to a problem is usually in a different part of the system than where symptoms appear.",
        "options": [
            "True - symptoms and causes are often separated in time and space",
            "False - problems should be fixed where they occur"
        ],
        "correct": 0,
        "explanation": "True! Systems thinking recognizes that cause and effect are often separated. The symptom appears in one place (late deliveries), but the cause is elsewhere (upstream planning, resource allocation, measurement systems). This is why 'firefighting' doesn't work - you're treating symptoms, not causes. The leverage point is usually upstream from the problem."
    }
]

# Purple Belt Stripe 3: Coaching & Development (10 questions)
PURPLE_STRIPE3_QUESTIONS = [
    {
        "question": "A team member comes to you with a problem. The Purple Belt coaching approach is to:",
        "options": [
            "Share your own similar experience and how you solved it",
            "Ask powerful questions that help them discover their own solution",
            "Provide clear direction on what they should do",
            "Delegate the problem to someone more experienced"
        ],
        "correct": 1,
        "explanation": "Coaching creates capability; directing creates dependency. Powerful questions (What have you tried? What's the real challenge here? What would need to be true for this to work?) help people think through problems themselves. This builds problem-solving muscle. As Brene Brown says, 'Clear is kind' - but clarity comes from their own discovery, not your answers."
    },
    {
        "question": "You notice a team member is struggling with a task. Your first coaching move should be:",
        "options": [
            "Show them the correct way to do it",
            "Assess their readiness: Are they willing but unable, or able but unwilling?",
            "Give them easier tasks until they improve",
            "Pair them with a stronger performer"
        ],
        "correct": 1,
        "explanation": "Situational leadership recognizes different readiness levels require different approaches. Willing but unable = teach/direct. Able but unwilling = coach/support. Both low = direct closely. Both high = delegate. The same person needs different support for different tasks. This is Ken Blanchard's Situational Leadership - matching your approach to their development level."
    },
    {
        "question": "A high performer seems stuck in their current role. The coaching approach is to:",
        "options": [
            "Give them more of the same work to master it further",
            "Create stretch assignments that build new capabilities",
            "Promote them to management",
            "Wait for them to ask for development opportunities"
        ],
        "correct": 1,
        "explanation": "Growth happens at the edge of competence. High performers need challenges that stretch them - projects requiring new skills, cross-functional leadership, ambiguous problems. This is the 'zone of proximal development' (Vygotsky) - the space between current ability and potential with support. Coaching provides that support while creating the stretch."
    },
    {
        "question": "During a coaching conversation, the person says 'I don't know what to do.' Your response should be:",
        "options": [
            "Tell them what you would do in their situation",
            "Help them explore what they DO know and build from there",
            "Break the problem into smaller steps for them",
            "Assign them to shadow someone who handles this well"
        ],
        "correct": 1,
        "explanation": "Coaching assumes people have more knowledge than they realize. 'I don't know' often means 'I haven't connected the dots yet.' Questions like 'What do you know for sure?' 'What's worked before in similar situations?' 'What's one small step you're confident about?' help them access their own wisdom. Your role is to help them think, not think for them."
    },
    {
        "question": "True or False: Good coaching focuses on fixing weaknesses rather than building on strengths.",
        "options": [
            "True - weaknesses limit performance and must be addressed",
            "False - coaching leverages strengths while managing weaknesses"
        ],
        "correct": 1,
        "explanation": "False! Strengths-based coaching (Marcus Buckingham, Gallup) recognizes that excellence comes from developing strengths, not fixing weaknesses. Focus 80% on amplifying what's working (strengths, successful patterns, natural talents) and 20% on managing weaknesses (preventing them from derailing performance). People grow faster when building on their strengths."
    },
    {
        "question": "You're coaching someone through a difficult conversation they need to have. The most helpful approach is to:",
        "options": [
            "Role-play the conversation with them as practice",
            "Script exactly what they should say",
            "Help them clarify their intent and desired outcome, then trust their judgment on delivery",
            "Offer to have the conversation for them"
        ],
        "correct": 2,
        "explanation": "Coaching builds capability, not dependency. Help them clarify: What do you want this person to understand? What's your desired outcome? What's your intent? Then let them find their own words. Scripting creates inauthenticity; role-playing can help, but the goal is building their ability to navigate difficult conversations, not perfecting a script."
    },
    {
        "question": "A team member makes the same mistake repeatedly. The coaching response is to:",
        "options": [
            "Increase oversight and checking of their work",
            "Explore what's preventing them from learning from the mistake",
            "Give them clearer instructions",
            "Move them to a different role where they won't make this mistake"
        ],
        "correct": 1,
        "explanation": "Patterns reveal learning blocks. Are they not seeing the mistake? (Awareness issue) Not understanding why it's a problem? (Understanding issue) Unable to change the behavior? (Capability issue) Unwilling to change? (Motivation issue) Each requires different coaching. The goal is building their ability to recognize, understand, and prevent mistakes - not preventing mistakes for them."
    },
    {
        "question": "You want to develop someone's strategic thinking. The best coaching approach is to:",
        "options": [
            "Assign them to read books on strategy",
            "Give them strategic projects and coach through the thinking process",
            "Have them observe strategic planning meetings",
            "Explain your strategic thinking process to them"
        ],
        "correct": 1,
        "explanation": "Learning happens through doing, not observing. Strategic thinking develops through practice with real problems, guided by coaching questions: 'What's the real challenge here?' 'What assumptions are you making?' 'What would need to be true for this to work?' 'What are you optimizing for?' Experience + reflection = learning. Your coaching accelerates that learning."
    },
    {
        "question": "During coaching, the person keeps asking 'What should I do?' Your best response is:",
        "options": [
            "Give them your recommendation",
            "Help them think through options: 'What are your choices here? What are the pros and cons of each?'",
            "Refer them to someone else who can answer",
            "Tell them to figure it out themselves"
        ],
        "correct": 1,
        "explanation": "Coaching builds decision-making capability. When people ask 'What should I do?' they're often seeking permission or avoiding responsibility. Coaching questions help them think: 'What are your options?' 'What criteria matter most?' 'What's the worst that could happen with each?' 'What feels right to you?' This builds their judgment, not your control."
    },
    {
        "question": "The difference between coaching and mentoring is:",
        "options": [
            "Coaching is for performance, mentoring is for career development",
            "Coaching helps people discover their own answers; mentoring shares your experience and knowledge",
            "Coaching is formal, mentoring is informal",
            "They're the same thing with different names"
        ],
        "correct": 1,
        "explanation": "Both are valuable but different. Coaching uses questions to unlock someone's own wisdom and capability. Mentoring shares your experience, knowledge, and networks to accelerate their learning. Great leaders do both: coach to build capability, mentor to share wisdom. The key is knowing when each is appropriate - coaching for discovery and growth, mentoring for knowledge transfer and perspective."
    }
]

# Purple Belt Stripe 4: Constructive Conflict (10 questions)
PURPLE_STRIPE4_QUESTIONS = [
    {
        "question": "Two team members have a fundamental disagreement about approach. As a Purple Belt leader, you should:",
        "options": [
            "Mediate to find a compromise that satisfies both",
            "Surface the disagreement openly and help them debate the merits of each approach",
            "Make the decision yourself to resolve the conflict quickly",
            "Separate them so the conflict doesn't spread"
        ],
        "correct": 1,
        "explanation": "Healthy conflict surfaces disagreement so teams can find the best solution. Lencioni calls artificial harmony a dysfunction - teams that avoid conflict make mediocre decisions. Your job is creating safety to disagree: 'Let's hear both perspectives. What are the trade-offs? What would need to be true for each to work?' Conflict, properly managed, creates better outcomes than forced consensus."
    },
    {
        "question": "A team meeting gets heated as people debate priorities. The Purple Belt response is to:",
        "options": [
            "Stop the meeting and reschedule when emotions have cooled",
            "Let it play out - passionate debate is productive",
            "Facilitate the debate: ensure everyone's heard, focus on ideas not personalities, seek the best solution",
            "Shut it down to maintain professionalism"
        ],
        "correct": 2,
        "explanation": "Purple Belt leaders distinguish productive debate from personal attacks. Productive conflict focuses on ideas, issues, and solutions - not personalities. Your role is facilitator: ensure respectful discourse, summarize positions, find common ground, and guide toward resolution. Shutting down conflict prevents teams from finding the best solutions. The skill is managing conflict, not avoiding it."
    },
    {
        "question": "You notice team members avoid disagreeing with each other in meetings. This indicates:",
        "options": [
            "The team has reached consensus naturally",
            "Artificial harmony - people are avoiding conflict to maintain comfort",
            "They've learned to disagree privately",
            "There aren't any real disagreements to surface"
        ],
        "correct": 1,
        "explanation": "Artificial harmony is a dysfunction. When teams don't disagree, it's usually because: (1) They lack trust to be vulnerable, (2) Conflict has been punished in the past, (3) They prioritize harmony over results. Healthy teams engage in productive conflict - they debate ideas vigorously because they trust each other. Your job is building that trust and modeling productive disagreement."
    },
    {
        "question": "During a conflict, someone gets defensive and personal. Your intervention should:",
        "options": [
            "Call them out publicly to stop the behavior",
            "Redirect to ideas: 'Let's focus on the issue, not each other. What are we trying to solve here?'",
            "End the conversation immediately",
            "Ignore it and let them work it out"
        ],
        "correct": 1,
        "explanation": "Conflict management requires maintaining productive focus. When people get personal, redirect to issues: 'I hear strong feelings. Let's focus on the problem we're solving. What outcome do we want?' This models productive conflict and creates safety. The goal is maintaining debate while preventing it from becoming destructive. This is the Purple Belt skill - managing emotional dynamics while keeping focus on outcomes."
    },
    {
        "question": "True or False: The best teams have no conflict because they're aligned.",
        "options": [
            "True - alignment means agreement on everything",
            "False - the best teams engage in healthy conflict precisely because they're committed to the best outcomes"
        ],
        "correct": 1,
        "explanation": "False! Alignment doesn't mean agreement on everything - it means commitment to decisions after healthy debate. The best teams have MORE conflict (debate, disagreement, challenge) because they're trying to find the best solutions. They trust each other enough to disagree. Conflict isn't the problem - destructive conflict is. Productive conflict is a feature, not a bug."
    },
    {
        "question": "You want to surface hidden disagreements on your team. The best approach is to:",
        "options": [
            "Ask directly: 'Does anyone disagree with this plan?'",
            "Create structured debate: assign someone to argue against the plan",
            "Make a decision and see who pushes back",
            "Wait for disagreements to emerge naturally"
        ],
        "correct": 1,
        "explanation": "Structured debate surfaces hidden concerns. Techniques like 'Devil's Advocate,' 'Pre-Mortem' (what could go wrong?), or 'Red Team' (argue against the plan) make disagreement safe and expected. This reveals concerns that people are hesitant to voice. The key is making disagreement a process step, not a personal challenge. This is how you build conflict capacity."
    },
    {
        "question": "A conflict escalates and becomes personal. The Purple Belt approach is to:",
        "options": [
            "Separate the people involved immediately",
            "Address the behavior: 'Let's pause. We're getting personal. What's the real issue we're trying to solve?'",
            "Let them work it out - conflict resolution is their responsibility",
            "Document the incident for HR"
        ],
        "correct": 1,
        "explanation": "Conflict management requires intervention when dynamics become destructive. Pause the process, address the behavior directly but respectfully, and refocus on the issue. 'I see this is getting personal. Let's take a breath. What outcome do we all want here?' This models conflict management while protecting team dynamics. The goal is maintaining productive debate, not avoiding all conflict."
    },
    {
        "question": "Two team members have competing ideas and both seem valid. The Purple Belt approach is to:",
        "options": [
            "Choose the idea from the more senior person",
            "Combine elements of both ideas into a hybrid solution",
            "Facilitate deeper exploration: 'What's the best of each? What would an ideal solution include?'",
            "Let them debate and the stronger idea will win"
        ],
        "correct": 2,
        "explanation": "Integrative thinking seeks solutions that don't require choosing between valid options. Instead of 'A or B,' ask 'What's the best of A? The best of B? What would a solution that captures both look like?' This is Roger Martin's approach - refuse false trade-offs. Often, the best solution combines insights from competing perspectives. Your role is facilitating that synthesis."
    },
    {
        "question": "You notice conflict increases after you started encouraging more debate. This is:",
        "options": [
            "A sign you should dial back the encouragement",
            "Expected and healthy - you're surfacing previously hidden disagreements",
            "A problem that needs immediate intervention",
            "Proof that your team doesn't work well together"
        ],
        "correct": 1,
        "explanation": "Increased conflict after encouraging debate is often good news - you're surfacing disagreements that were previously hidden or suppressed. The key is ensuring it's productive conflict (focused on ideas and outcomes) rather than destructive (personal attacks, power struggles). If it's productive, continue facilitating. If it becomes destructive, intervene to refocus. More conflict isn't bad - more destructive conflict is."
    },
    {
        "question": "The goal of managing conflict is to:",
        "options": [
            "Eliminate all disagreement",
            "Reach consensus on every decision",
            "Surface disagreement, debate ideas, and reach commitment to decisions - even without consensus",
            "Win arguments and establish the best ideas"
        ],
        "correct": 2,
        "explanation": "Conflict management isn't about eliminating disagreement - it's about using disagreement to find better solutions. The process: (1) Surface disagreements openly, (2) Debate ideas productively, (3) Reach clarity on decisions, (4) Get commitment to execute (even from those who disagreed). Consensus is nice but not required - clarity and commitment are. Disagreement improves decisions; commitment enables execution."
    }
]

def generate_quiz_html(questions, stripe_num):
    """Generate HTML for quiz questions"""
    html = ""
    
    for i, q in enumerate(questions, 1):
        html += f"""
            <!-- Question {i}: Multiple Choice -->
            <div class="quiz-question" data-question="{i}">
                <h3>Question {i} of 10</h3>
                <p class="question-text">{q['question']}</p>
                
                <div class="quiz-options">"""
        
        for j, option in enumerate(q['options']):
            letter = chr(65 + j)  # A, B, C, D
            is_correct = (j == q['correct'])
            html += f"""
                    <button class="quiz-option" data-correct="{'true' if is_correct else 'false'}" data-explanation="{q['explanation'].replace('"', '&quot;')}" onclick="selectQuizAnswer({i}, this)">
                        {letter}) {option}
                    </button>"""
        
        html += """
                </div>
                
                <div class="quiz-feedback" style="display: none;">
                    <p class="feedback-text"></p>
                </div>
            </div>
"""
    
    return html

def update_purple_stripe_file(stripe_num, questions):
    """Update a Purple Belt stripe file with new quiz questions"""
    filename = f"purple-belt-stripe{stripe_num}-gamified.html"
    filepath = Path(filename)
    
    if not filepath.exists():
        print(f"⚠️  {filename} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"📝 Updating {filename}...")
    
    # Find quiz section
    quiz_start = content.find('<div class="quiz-section"')
    if quiz_start == -1:
        print(f"   ⚠️  Quiz section not found in {filename}")
        return False
    
    # Find where quiz questions start
    questions_start = content.find('<!-- Question 1', quiz_start)
    if questions_start == -1:
        print(f"   ⚠️  Quiz questions not found in {filename}")
        return False
    
    # Find where quiz questions end (before quiz-completion div)
    questions_end = content.find('<div class="quiz-completion"', questions_start)
    if questions_end == -1:
        questions_end = content.find('</div>\n\n\n        <div style="text-align', questions_start)
    
    if questions_end == -1:
        print(f"   ⚠️  Could not find end of quiz questions")
        return False
    
    # Generate new quiz HTML
    new_quiz_html = generate_quiz_html(questions, stripe_num)
    
    # Replace quiz questions
    new_content = content[:questions_start] + new_quiz_html + content[questions_end:]
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"   ✅ Updated with {len(questions)} questions")
    return True

def main():
    print("🎯 Generating Purple Belt Quiz Questions")
    print("=" * 60)
    
    # Update all 4 stripes
    stripe_data = [
        (1, PURPLE_STRIPE1_QUESTIONS, "Strategic Thinking"),
        (2, PURPLE_STRIPE2_QUESTIONS, "Systems Thinking"),
        (3, PURPLE_STRIPE3_QUESTIONS, "Coaching & Development"),
        (4, PURPLE_STRIPE4_QUESTIONS, "Constructive Conflict")
    ]
    
    updated = 0
    for stripe_num, questions, theme in stripe_data:
        print(f"\n📋 Stripe {stripe_num}: {theme}")
        if update_purple_stripe_file(stripe_num, questions):
            updated += 1
    
    print(f"\n✅ Complete! Updated {updated}/4 stripe files")
    print(f"📊 Total: {updated * 10} questions created")

if __name__ == '__main__':
    main()

