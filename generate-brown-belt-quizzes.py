#!/usr/bin/env python3
"""
Generate Brown Belt Quiz Questions
Creates 40 high-quality, advanced questions across 4 stripes
Difficulty: Advanced (harder than Purple, easier than Black)
"""

import re
from pathlib import Path

# Brown Belt Stripe 1: Leadership Philosophy (10 questions)
BROWN_STRIPE1_QUESTIONS = [
    {
        "question": "You've been promoted to lead a struggling team. The previous manager was beloved but ineffective - the team is comfortable but underperforming. Your mentor Jocko would likely advise you to:",
        "options": [
            "Immediately set higher standards to shift the culture quickly",
            "Build relationships first, then gradually raise expectations",
            "Take extreme ownership of past failures before changing anything",
            "Replace underperformers to signal the new standard"
        ],
        "correct": 2,
        "explanation": "Perfect understanding of 'Extreme Ownership.' Before you can lead them forward, you must take ownership of their current state - even though you didn't create it. This paradox builds trust: 'I own this mess, and I'm going to fix it WITH you.' Only after taking ownership can you credibly ask them to own their piece. This is Jocko's core teaching - leadership starts with owning everything in your world."
    },
    {
        "question": "Your team respects you for your technical expertise, but you notice they wait for your approval on decisions they should own. According to leadership research, this pattern indicates:",
        "options": [
            "Your team lacks confidence and needs more training",
            "You've accidentally created dependency instead of capability",
            "This is normal - leaders should quality-check important decisions",
            "Your team is being appropriately cautious and risk-averse"
        ],
        "correct": 1,
        "explanation": "Excellent self-awareness! You've identified the 'savior complex' trap. When leaders are too good at solving problems, teams stop trying. Marshall Goldsmith calls this 'adding too much value' - your input, even when helpful, robs others of ownership. Brown Belt means recognizing when your strength becomes the team's weakness. The fix: bite your tongue, let them make the call, and coach AFTER the outcome (win or lose)."
    },
    {
        "question": "Simon Sinek's 'Start with Why' suggests that inspiring leaders communicate in this order:",
        "options": [
            "What we do → How we do it → Why we do it (outside-in)",
            "Why we do it → How we do it → What we do (inside-out)",
            "How we do it → What we do → Why we do it (process-first)",
            "What we do → Why we do it → How we do it (results-first)"
        ],
        "correct": 1,
        "explanation": "Perfect! You understand the 'Golden Circle.' Inspiring leaders start with WHY (purpose/belief), then HOW (process/values), then WHAT (products/services). Most organizations communicate backwards: 'We make X (what), it has Y features (how), buy it.' Apple says: 'We challenge the status quo (why), by making beautifully designed products (how), we happen to make computers (what).' See the difference? Purpose before product. Belief before features. Brown Belt leaders inspire through WHY."
    },
    {
        "question": "You're implementing a major change. Kotter's research on change management says your FIRST step should be:",
        "options": [
            "Form a guiding coalition of key influencers",
            "Create a sense of urgency around the need for change",
            "Develop a clear vision for where you're heading",
            "Communicate the change vision repeatedly"
        ],
        "correct": 1,
        "explanation": "Excellent! You know Kotter's 8-Step Process. Step 1 is 'Create Urgency' - people won't change unless they feel the current state is untenable. Without urgency, your guiding coalition will lack energy, your vision will seem optional, and resistance will win. Brown Belt leaders understand that logic doesn't drive change - emotion does. Your job is to make the status quo feel riskier than the change. Then momentum builds naturally."
    },
    {
        "question": "Your star performer is brilliant individually but toxic to team culture. Brené Brown's research on belonging would suggest:",
        "options": [
            "Coach them privately but keep them - talent trumps culture",
            "Create clear boundaries: change behavior or exit the team",
            "Accept this trade-off - high performers are always difficult",
            "Move them to an individual contributor role"
        ],
        "correct": 1,
        "explanation": "Perfect application of 'Dare to Lead' principles! Brown says: 'Choose courage over comfort... choose what is right over what is fun, fast, or easy.' Tolerating toxic brilliance signals that results matter more than people. This destroys psychological safety - your team learns that performance excuses bad behavior. The Brown Belt move: clear expectations, clear consequences. If they can't show up as a teammate, they can't stay on the team. Period. This is what daring leadership looks like."
    },
    {
        "question": "Servant leadership, as taught by Robert Greenleaf, means:",
        "options": [
            "Doing whatever your team asks you to do",
            "Putting your team's needs before your own in service of their growth",
            "Being humble and never making decisions yourself",
            "Leading from behind and letting the team take credit"
        ],
        "correct": 1,
        "explanation": "Servant leadership is about serving first to lead better. Greenleaf's philosophy: 'The servant-leader is servant first... It begins with the natural feeling that one wants to serve, to serve first. Then conscious choice brings one to aspire to lead.' This isn't abdicating leadership - it's leading by enabling others' success. Your job is their growth, not your comfort. Brown Belt leaders serve their teams by creating conditions for their success."
    },
    {
        "question": "Ronald Heifetz distinguishes between 'technical' and 'adaptive' challenges. An adaptive challenge requires:",
        "options": [
            "Expert knowledge to solve - you already have the answer",
            "Learning and experimentation - the answer isn't known yet",
            "More resources or better processes",
            "Clear authority to make decisions"
        ],
        "correct": 1,
        "explanation": "Perfect understanding of adaptive leadership! Technical challenges have known solutions - apply expertise. Adaptive challenges require learning, experimentation, and often changing values or behaviors. Example: 'Sales are down' (technical: fix pricing). 'Our customers don't trust us anymore' (adaptive: rebuild relationships, shift culture). Brown Belt leaders recognize adaptive challenges can't be solved by authority alone - they require mobilizing people to do the work of change."
    },
    {
        "question": "Jim Collins' research on 'Level 5 Leadership' found that the best leaders combine:",
        "options": [
            "Humility and fierce resolve for results",
            "Vision and execution capability",
            "Charisma and strategic thinking",
            "Intelligence and decisiveness"
        ],
        "correct": 0,
        "explanation": "Collins' research shocked the business world: the best companies had 'Level 5' leaders who were paradoxically humble AND willful. They channel ambition into the company, not themselves. They take responsibility for failures but give credit for successes. They're ambitious for the mission, not their ego. This is Brown Belt leadership - building something bigger than yourself through paradoxical combination of humility and resolve."
    },
    {
        "question": "True or False: Vulnerability in leadership means sharing your weaknesses with your team.",
        "options": [
            "True - vulnerability means exposing your weaknesses",
            "False - vulnerability means courage to show up, take risks, and be seen even when you can't control the outcome"
        ],
        "correct": 1,
        "explanation": "Brené Brown clarifies: vulnerability isn't weakness - it's courage. It's showing up when you can't control the outcome. It's asking for help when stuck. It's admitting you don't know. It's having difficult conversations. It's NOT oversharing personal problems or making others responsible for your emotions. Brown Belt vulnerability is strategic - it builds trust, models courage, and creates safety for others to be real. It's strength, not weakness."
    },
    {
        "question": "Leadership presence and authenticity means:",
        "options": [
            "Always being yourself, no matter what",
            "Being consistently yourself while adapting your style to context",
            "Never changing your approach regardless of situation",
            "Mimicking successful leaders until it becomes natural"
        ],
        "correct": 1,
        "explanation": "Authenticity isn't rigid consistency - it's consistent values with adaptable expression. You're always YOU (authentic), but how you show up adapts to context (skillful). Example: You're always honest (authentic), but you express feedback differently to a junior vs. senior person (skillful). Brown Belt leaders know: be authentic to your values, skillful in your expression. Rigid 'authenticity' that ignores context isn't leadership - it's self-indulgence."
    }
]

# Brown Belt Stripe 2: Organizational Culture (10 questions)
BROWN_STRIPE2_QUESTIONS = [
    {
        "question": "Ed Schein's culture model has three levels. The deepest level - often invisible but most powerful - consists of:",
        "options": [
            "Artifacts: The visible structures and processes people can observe",
            "Espoused values: The stated beliefs and ideals the organization claims",
            "Basic assumptions: The unconscious, taken-for-granted beliefs that drive behavior",
            "Behaviors: The actual actions people take day-to-day"
        ],
        "correct": 2,
        "explanation": "Perfect understanding of organizational culture! Schein shows that the deepest level is 'basic assumptions' - beliefs so ingrained they're invisible. Example: 'Conflict is dangerous' (assumption) leads to 'We value collaboration' (value) leads to 'No one challenges ideas in meetings' (artifact). You can't change culture by changing artifacts - you must surface and challenge the unconscious assumptions driving behavior. This is Brown Belt organizational thinking."
    },
    {
        "question": "You want to shift your team's culture from 'blame and hide mistakes' to 'learn from failures.' According to Schein, you must:",
        "options": [
            "Change visible behaviors first - reward transparency, punish hiding mistakes",
            "Surface the unconscious assumption that 'mistakes mean incompetence' and challenge it directly",
            "Create new values statements about learning from failure",
            "Hire people who already demonstrate the desired culture"
        ],
        "correct": 1,
        "explanation": "Culture change requires changing deep assumptions, not just behaviors. The assumption 'mistakes = incompetence' drives hiding behavior. Challenge this: 'Mistakes are data, not judgment. We hide mistakes to avoid looking incompetent, but hiding mistakes IS incompetence.' Make mistakes safe to discuss by modeling it yourself. Brown Belt culture change works at the assumption level - change the invisible beliefs, and behaviors shift naturally."
    },
    {
        "question": "Google's Project Aristotle found that psychological safety was the #1 predictor of team performance. At the organizational level, this means:",
        "options": [
            "Creating environments where people feel safe to take risks and be vulnerable",
            "Eliminating all conflict and ensuring everyone gets along",
            "Hiring people who naturally fit the culture",
            "Having clear performance metrics and accountability"
        ],
        "correct": 0,
        "explanation": "Psychological safety isn't about eliminating conflict - it's about creating safety to engage in productive conflict. It means: 'I can speak up without fear of punishment or humiliation.' This requires leaders who: respond to mistakes with curiosity (not blame), invite dissent (not agreement), admit their own fallibility. Brown Belt leaders build psychological safety by modeling vulnerability and rewarding candor - creating culture where truth-telling is safe."
    },
    {
        "question": "Culture as competitive advantage means:",
        "options": [
            "Having the best perks and benefits to attract talent",
            "Creating a culture that's difficult for competitors to replicate",
            "Building a brand that customers recognize",
            "Hiring the smartest people in the industry"
        ],
        "correct": 1,
        "explanation": "Culture as competitive advantage means building something unique and valuable that competitors can't easily copy. Example: Zappos' culture of customer service, Patagonia's culture of environmental responsibility. These aren't just slogans - they're deep systems, values, and behaviors that drive different outcomes. Brown Belt leaders recognize that strategy can be copied, technology can be copied, but authentic culture? That's much harder. Invest in culture - it's your moat."
    },
    {
        "question": "When diagnosing organizational culture, you should pay most attention to:",
        "options": [
            "What people say in company meetings and official communications",
            "What actually happens when people make mistakes or take risks",
            "The values posters on the wall",
            "How new employees describe the culture during onboarding"
        ],
        "correct": 1,
        "explanation": "Culture is revealed in moments of pressure. What happens when someone makes a mistake? Takes a risk? Challenges authority? Disagrees publicly? Watch behavior under pressure - that's where real culture shows up. Brown Belt leaders observe the gap between espoused values (what we say) and enacted values (what we do) and close it. Real culture is behavior, not words."
    },
    {
        "question": "Onboarding is most effective for culture transmission when it:",
        "options": [
            "Covers company history and values statements thoroughly",
            "Shows new hires how people actually behave and what gets rewarded",
            "Tests new hires on cultural knowledge",
            "Separates culture training from job training"
        ],
        "correct": 1,
        "explanation": "Onboarding transmits culture through modeling, not teaching. New hires learn culture by watching: Who gets praised? What behaviors are rewarded? How do leaders handle conflict? What happens when someone breaks a rule? Brown Belt onboarding shows culture in action - pair new hires with culture carriers, show real examples, make culture visible through stories and behaviors. Teach culture by demonstrating it."
    },
    {
        "question": "Rituals and symbols that reinforce culture work best when they:",
        "options": [
            "Are elaborate and impressive to outsiders",
            "Embody and reinforce the core values in daily practice",
            "Are unique and different from competitors",
            "Include everyone equally regardless of role"
        ],
        "correct": 1,
        "explanation": "Rituals reinforce culture when they embody values, not just celebrate them. Example: If your value is 'learning from failure,' your ritual might be monthly 'failure postmortems' where teams share what didn't work and what they learned. If your value is 'customer obsession,' your ritual might be everyone spending time with customers monthly. Brown Belt leaders design rituals that PRACTICE values, not just talk about them."
    },
    {
        "question": "Culture change leadership (per Kotter and Schein) requires:",
        "options": [
            "A charismatic leader who can inspire change through speeches",
            "A systematic approach that addresses both the emotional and rational sides of change",
            "Replacing people who resist the new culture",
            "Waiting for a crisis that makes change necessary"
        ],
        "correct": 1,
        "explanation": "Culture change is systematic work that addresses both head and heart. Kotter: create urgency, build coalition, communicate vision, empower action. Schein: unfreeze old assumptions, learn new behaviors, refreeze new assumptions. Both recognize that culture change is emotional work - people's identity is tied to current culture. Brown Belt leaders change culture systematically, recognizing it's a journey, not an event."
    },
    {
        "question": "True or False: A strong culture means everyone thinks and acts the same way.",
        "options": [
            "True - strong culture requires uniformity",
            "False - strong culture means shared values and behaviors, but diverse thinking and perspectives"
        ],
        "correct": 1,
        "explanation": "Strong culture isn't uniformity - it's shared values with diverse perspectives. Example: At Patagonia, everyone shares environmental values, but they think differently about HOW to solve problems. Strong culture = 'How we show up' (shared) + 'How we think' (diverse). Brown Belt leaders build culture that unites on values while encouraging diverse thinking - this creates both cohesion and innovation."
    },
    {
        "question": "The fastest way to shift culture is to:",
        "options": [
            "Change the reward systems - what gets measured and rewarded",
            "Hire new people who embody the desired culture",
            "Communicate the new culture values more frequently",
            "Replace leaders who don't model the new culture"
        ],
        "correct": 0,
        "explanation": "Reward systems drive behavior faster than communication. People do what gets rewarded, regardless of what gets said. If you want collaboration but reward individual performance, you'll get competition. If you want innovation but punish failures, you'll get risk-aversion. Brown Belt leaders align rewards with desired culture: measure and reward the behaviors that embody values. This is leverage."
    }
]

# Brown Belt Stripe 3: Strategic Vision & Execution (10 questions)
BROWN_STRIPE3_QUESTIONS = [
    {
        "question": "Your team has a clear vision but struggles with execution. The most likely root cause is:",
        "options": [
            "The vision isn't inspiring enough to drive action",
            "The gap between vision and daily work is too abstract",
            "Team members lack the skills needed to execute",
            "There's insufficient accountability for results"
        ],
        "correct": 1,
        "explanation": "Excellent diagnosis! Most execution problems aren't motivation or skill issues - they're translation problems. The vision is '10,000 feet up' but daily work is 'ground level,' and there's no bridge connecting them. Brown Belt leaders build that bridge: 'Here's our 3-year vision... so in 12 months we need X... so this quarter we're doing Y... so this week you're working on Z.' Make the connection explicit. Clear line of sight from daily tasks to ultimate vision."
    },
    {
        "question": "The difference between a vision and a goal is:",
        "options": [
            "Vision is long-term, goals are short-term",
            "Vision is where you're going (destination), goals are how you'll get there (milestones)",
            "Vision is inspirational, goals are operational",
            "They're the same thing, just different timeframes"
        ],
        "correct": 1,
        "explanation": "Vision is the destination - 'What future state do we want to create?' Goals are milestones - 'What must be true along the way?' Example: Vision = 'Every employee feels trusted and empowered.' Goals = 'By Q2, we implement new feedback systems. By Q4, we eliminate approval layers for routine decisions.' Brown Belt leaders distinguish: vision provides direction, goals provide checkpoints. Don't confuse the destination with the journey."
    },
    {
        "question": "Communicating vision effectively (per Sinek and Kotter) means:",
        "options": [
            "Repeating the vision statement frequently in meetings",
            "Connecting vision to daily decisions and showing progress regularly",
            "Creating inspiring presentations and videos about the vision",
            "Ensuring everyone can recite the vision word-for-word"
        ],
        "correct": 1,
        "explanation": "Vision communication isn't about repetition - it's about relevance. People care about vision when they see: 'How does this affect what I do today?' Brown Belt leaders connect vision to daily decisions: 'We're choosing X over Y because it aligns with our vision of Z.' Show progress: 'Remember our vision of X? We just achieved Y milestone toward it.' Make vision visible through actions and progress, not just words."
    },
    {
        "question": "OKRs (Objectives and Key Results) are most effective when:",
        "options": [
            "Set top-down by leadership to ensure alignment",
            "Cascaded from organizational to team to individual levels with clear connections",
            "Set independently by teams to ensure ownership",
            "Reviewed annually to maintain focus"
        ],
        "correct": 1,
        "explanation": "OKRs work when they cascade: organizational OKRs → team OKRs → individual OKRs, with clear connections. Each level's OKRs support the level above. This creates alignment (everyone moves toward the same destination) AND autonomy (teams/individuals choose HOW). Brown Belt leaders cascade OKRs to create 'aligned autonomy' - strategic direction with tactical freedom. This is how you scale vision."
    },
    {
        "question": "Strategic patience vs. urgency means:",
        "options": [
            "Always being patient - strategy takes time",
            "Always being urgent - markets move fast",
            "Patient with the vision, urgent with execution milestones",
            "Urgent with vision, patient with execution"
        ],
        "correct": 2,
        "explanation": "Brown Belt leaders hold two tensions: strategic patience (vision doesn't change daily) and tactical urgency (milestones must be hit). Example: Vision of 'becoming the most trusted brand' (patience - this is a 10-year journey) BUT urgent milestones: 'Q1: launch trust-building initiative, Q2: measure trust metrics, Q3: iterate based on data.' Patient with destination, urgent with progress. This prevents both rigidity (never adapting) and chaos (always pivoting)."
    },
    {
        "question": "When your strategy isn't working, the Brown Belt response is to:",
        "options": [
            "Double down - execution is the problem, not strategy",
            "Immediately pivot to a completely new strategy",
            "Distinguish: Is the strategy wrong, or is execution failing? Investigate before deciding",
            "Blame external factors and wait for conditions to improve"
        ],
        "correct": 2,
        "explanation": "Brown Belt leaders distinguish strategy failure from execution failure before changing course. Strategy failure = 'We're executing well, but the strategy itself is flawed.' Execution failure = 'The strategy is sound, but we're not executing it well.' Example: Sales are down. Is it strategy (wrong target market) or execution (poor sales process)? Investigate first. Good strategies fail due to poor execution. Don't pivot until you know which is broken."
    },
    {
        "question": "The 4 Disciplines of Execution (McChesney) focus on:",
        "options": [
            "Setting clear goals and tracking progress",
            "Focusing on wildly important goals, acting on lead measures, keeping a compelling scoreboard, and creating accountability cadence",
            "Planning, executing, monitoring, and adjusting",
            "Vision, strategy, tactics, and metrics"
        ],
        "correct": 1,
        "explanation": "4DX is a framework for executing strategy: (1) Focus on 1-2 wildly important goals (WIGs) - you can't do everything, (2) Act on lead measures (predictive metrics you can influence), (3) Keep a compelling scoreboard (visible, simple, shows progress), (4) Create accountability cadence (regular check-ins on commitments). Brown Belt leaders use 4DX to bridge strategy and execution - making the important visible and the visible important."
    },
    {
        "question": "Course correction vs. pivoting means:",
        "options": [
            "Course correction adjusts tactics, pivoting changes strategy",
            "They're the same thing - just adjusting direction",
            "Course correction happens quarterly, pivoting happens annually",
            "Pivoting is for startups, course correction is for established companies"
        ],
        "correct": 0,
        "explanation": "Brown Belt leaders distinguish: Course correction = adjusting HOW you execute (tactics, processes, resources). Pivoting = changing WHAT you're trying to achieve (strategy, vision, direction). Example: 'We're behind on our customer acquisition goal' → course correct: adjust marketing channels, improve onboarding. 'Our customers don't want this product' → pivot: change product strategy. Don't pivot when you need to course-correct. Don't course-correct when you need to pivot."
    },
    {
        "question": "True or False: A good vision should be achievable within 12 months.",
        "options": [
            "True - visions must be realistic and achievable",
            "False - a good vision should be 3-5 years out, ambitious but not impossible"
        ],
        "correct": 1,
        "explanation": "Vision should be far enough out to require transformation (3-5 years), not just improvement. If you can achieve it in 12 months, it's a goal, not a vision. Vision stretches you - it's ambitious, even audacious. Example: 'Become the #1 trusted brand in our category' (vision - 5 years) vs. 'Increase customer satisfaction by 10%' (goal - 12 months). Brown Belt leaders create visions that require growth and transformation, not just effort."
    },
    {
        "question": "Balancing vision (where we're going) with execution (what we do today) requires:",
        "options": [
            "Focusing entirely on vision - execution will follow",
            "Focusing entirely on execution - vision is just words",
            "Connecting today's work explicitly to the vision through milestones and progress",
            "Alternating focus - vision one quarter, execution the next"
        ],
        "correct": 2,
        "explanation": "Brown Belt leaders hold vision and execution simultaneously. They: (1) Keep vision visible (regular communication), (2) Show progress toward vision (milestones, wins), (3) Connect daily work to vision ('We're doing X because it moves us toward Y'), (4) Adjust execution while holding vision steady. This prevents both 'vision without execution' (all talk) and 'execution without vision' (directionless activity). Vision provides direction, execution provides momentum."
    }
]

# Brown Belt Stripe 4: Coaching & Mentorship (10 questions)
BROWN_STRIPE4_QUESTIONS = [
    {
        "question": "A team member comes to you with a problem they could solve themselves. The Brown Belt coaching response is:",
        "options": [
            "Solve it quickly - you're the expert and time is limited",
            "Ask: 'What have you already tried?' and 'What would you do if I weren't available?'",
            "Direct them to resources so they can figure it out",
            "Schedule a coaching session to work through it together"
        ],
        "correct": 1,
        "explanation": "Perfect coaching instinct! You're using powerful questions to build capability. 'What have you tried?' surfaces their thinking. 'What would you do if I weren't here?' forces ownership. This isn't refusing to help - it's helping them discover they CAN solve this. You're teaching them to fish, not giving them fish. Brown Belt leaders build problem-solvers, not problem-bringers. Over time, they stop coming to you with solvable problems."
    },
    {
        "question": "The GROW coaching model stands for:",
        "options": [
            "Goal, Resources, Options, Will",
            "Goal, Reality, Options, Way forward",
            "Goal, Reality, Options, Will",
            "Goal, Resources, Outcomes, Will"
        ],
        "correct": 2,
        "explanation": "GROW is a coaching framework: (1) Goal - What do you want to achieve? (2) Reality - What's the current situation? (3) Options - What are possible approaches? (4) Will - What will you commit to? Brown Belt coaches use GROW to structure conversations, not scripts. The power is in the questions, not the answers. This framework creates space for discovery while providing structure for clarity."
    },
    {
        "question": "Developmental feedback vs. evaluative feedback means:",
        "options": [
            "Developmental is for growth, evaluative is for performance reviews",
            "Developmental focuses on future capability, evaluative focuses on past performance",
            "They're the same - just different names",
            "Developmental is positive, evaluative is negative"
        ],
        "correct": 1,
        "explanation": "Evaluative feedback: 'Your presentation was good/bad' (judgment of past). Developmental feedback: 'Here's how to make your next presentation more impactful' (guidance for future). Brown Belt coaches use both: evaluative for clarity ('Here's what happened'), developmental for growth ('Here's how to improve'). But developmental feedback builds capability - it's forward-looking, specific, and actionable. This is how you develop people."
    },
    {
        "question": "Creating thinking partnerships (coaching relationships) means:",
        "options": [
            "Being friends with your team members",
            "Creating safe spaces for people to think out loud and discover their own answers",
            "Partnering with them to solve problems together",
            "Mentoring them based on your experience"
        ],
        "correct": 1,
        "explanation": "Thinking partnerships create space for discovery. You're not solving their problems or sharing your wisdom - you're creating conditions for them to think clearly. Powerful questions, active listening, reflecting back what you hear. Nancy Kline's 'Time to Think' research shows: people think better when someone listens without interrupting or judging. Brown Belt coaches create thinking partnerships - spaces where clarity emerges naturally."
    },
    {
        "question": "Building independence, not dependency, means:",
        "options": [
            "Never helping - make them figure everything out themselves",
            "Helping them build problem-solving capability so they need you less over time",
            "Giving them all the answers so they learn faster",
            "Checking in frequently to ensure they're on track"
        ],
        "correct": 1,
        "explanation": "Brown Belt coaches build capability, not dependency. The goal: they need you less over time, not more. This means: asking questions instead of giving answers, letting them make decisions even when you'd choose differently, celebrating their independent problem-solving. Dependency feels good (you're needed!) but it's a leadership failure. Independence feels scary (they don't need you!) but it's leadership success. Build leaders who can lead without you."
    },
    {
        "question": "When NOT to coach (directive leadership moments) includes:",
        "options": [
            "Always coach - directive leadership is outdated",
            "Crisis situations, safety issues, or when the person lacks basic capability",
            "When you're busy and don't have time for coaching",
            "When the person is senior and should know better"
        ],
        "correct": 1,
        "explanation": "Brown Belt leaders know when to coach vs. direct. Coach when: they have capability, there's time for discovery, the stakes allow learning. Direct when: crisis/safety, they lack basic capability, time is critical. Example: Fire in building → direct ('Evacuate now!'). Improving presentation skills → coach ('What would make this more impactful?'). The skill is knowing which mode the situation requires. Flexibility, not dogmatism."
    },
    {
        "question": "Scaling yourself through others means:",
        "options": [
            "Delegating all your work so you have less to do",
            "Teaching others to think and decide so your impact multiplies",
            "Hiring people to replace you",
            "Creating systems that run without you"
        ],
        "correct": 1,
        "explanation": "Brown Belt leaders scale through teaching, not delegating. When you teach someone to think strategically, they make better decisions. When you teach someone to coach, they develop others. Your impact multiplies. This is the difference between delegation (giving away tasks) and scaling (multiplying capability). Brown Belt: build leaders who build leaders. Your legacy isn't what you accomplished - it's what others accomplish because you taught them."
    },
    {
        "question": "Measuring coaching effectiveness means tracking:",
        "options": [
            "How many coaching sessions you've conducted",
            "The capability growth of the people you coach - can they handle more complex challenges?",
            "Whether people follow your coaching advice",
            "How much people appreciate your coaching"
        ],
        "correct": 1,
        "explanation": "Coaching effectiveness = capability growth. Are they solving harder problems? Making better decisions? Needing you less? Taking on more responsibility? Brown Belt coaches measure impact, not activity. A coaching session isn't successful because it happened - it's successful if it built capability. Track: complexity of challenges they handle, frequency of 'needing your help,' quality of independent decisions. This is how you know coaching works."
    },
    {
        "question": "The mentor's dilemma (when to let them fail) is resolved by:",
        "options": [
            "Never letting them fail - prevent all mistakes",
            "Always letting them fail - failure is the best teacher",
            "Letting them fail when the cost is low but learning is high; preventing failure when cost exceeds learning value",
            "Letting them fail when they ignore your advice"
        ],
        "correct": 2,
        "explanation": "Brown Belt mentors calculate: Cost of failure vs. Value of learning. Low cost + High learning = Let them fail. High cost + Low learning = Prevent failure. Example: Let them make a $100 decision mistake (low cost, high learning). Prevent a $100,000 decision mistake (high cost, even if learning potential). The skill is calibrating: when does failure teach vs. damage? This is judgment, not rules. Protect them from catastrophic failures, allow learning failures."
    },
    {
        "question": "True or False: Great coaches always have the answers to their coachee's problems.",
        "options": [
            "True - that's why you're the coach",
            "False - great coaches ask powerful questions that help coachees discover their own answers"
        ],
        "correct": 1,
        "explanation": "Brown Belt coaches recognize: if you always have the answer, you're teaching dependency. If you help them discover answers, you're building capability. Powerful questions > quick answers. Example: Instead of 'Do X,' ask 'What options have you considered?' Instead of 'Here's what I'd do,' ask 'What would need to be true for Y to work?' Your job isn't to be smart - it's to help them get smart. This is coaching mastery."
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

def update_brown_stripe_file(stripe_num, questions):
    """Update a Brown Belt stripe file with new quiz questions"""
    filename = f"brown-belt-stripe{stripe_num}-gamified.html"
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
    print("🎯 Generating Brown Belt Quiz Questions")
    print("=" * 60)
    
    # Update all 4 stripes
    stripe_data = [
        (1, BROWN_STRIPE1_QUESTIONS, "Leadership Philosophy"),
        (2, BROWN_STRIPE2_QUESTIONS, "Organizational Culture"),
        (3, BROWN_STRIPE3_QUESTIONS, "Strategic Vision & Execution"),
        (4, BROWN_STRIPE4_QUESTIONS, "Coaching & Mentorship")
    ]
    
    updated = 0
    for stripe_num, questions, theme in stripe_data:
        print(f"\n📋 Stripe {stripe_num}: {theme}")
        if update_brown_stripe_file(stripe_num, questions):
            updated += 1
    
    print(f"\n✅ Complete! Updated {updated}/4 stripe files")
    print(f"📊 Total: {updated * 10} questions created")

if __name__ == '__main__':
    main()

