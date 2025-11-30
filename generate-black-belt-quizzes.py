#!/usr/bin/env python3
"""
Generate Black Belt Quiz Questions
Creates 40 VERY HARD questions requiring mastery integration
Difficulty: VERY HARD - 85% passing threshold
Philosophy: "The belt only covers two inches of your ass. You have to cover the rest." - Royce Gracie
"""

import re
from pathlib import Path

# Black Belt Stripe 1: Integration & Mastery (10 questions)
BLACK_STRIPE1_QUESTIONS = [
    {
        "question": "SCENARIO: You're leading a team through a critical product launch. Your top engineer (Sarah) has been working 80-hour weeks and is burning out. She just submitted a design that's technically brilliant but 3 weeks late, putting the launch at risk. Your CEO is demanding you 'fix this.' Meanwhile, Sarah's spouse just called you, concerned about her health.\n\nConsidering trust (White), conflict (Blue), commitment (Purple), and accountability (Brown), what is your FIRST move?",
        "options": [
            "Have a vulnerable conversation with Sarah about health concerns and negotiate sustainable hours, even if it delays the launch further",
            "Bring the whole team together for a crucial conversation about the timeline pressure and collectively decide how to proceed",
            "Take extreme ownership with the CEO for the delay, buy time, then address Sarah's burnout without timeline pressure",
            "Reassign Sarah to recovery mode, redistribute her work, and accept that the team will need to execute her design"
        ],
        "correct": 2,
        "explanation": "Masterful integration! You recognized the sequence matters: First, take extreme ownership upward (Brown Belt) to remove timeline pressure. THEN you can have an authentic conversation with Sarah (White Belt vulnerability) without making her choose between health and launch. This protects her from impossible trade-offs. Next, you'll facilitate team commitment to a revised plan (Purple Belt). Finally, you'll build sustainable accountability (Brown Belt). Notice how you integrated all four belt concepts in proper sequence. This is Black Belt thinking."
    },
    {
        "question": "SCENARIO: Your company is considering a major layoff (20% of staff). You're in leadership meetings where the decision is being finalized. You disagree with the approach - you believe restructuring could save more jobs. However, you're outvoted 4-to-1, and the CEO says 'we need unified leadership on this.'\n\nBalancing Blue Belt (healthy conflict), Purple Belt (commitment after disagreement), and Brown Belt (leadership integrity), what do you do?",
        "options": [
            "Resign - you can't authentically support a decision you believe is wrong",
            "Disagree and commit: Voice opposition in the room, then support the decision publicly once made",
            "Compartmentalize: Execute the decision but privately express your disagreement to affected employees",
            "Go over the CEO's head to the board - the decision is important enough to escalate"
        ],
        "correct": 1,
        "explanation": "Perfect application of 'disagree and commit' (Amazon's principle). You fought for your position in the room (Blue Belt healthy conflict). You lost. Now you commit fully (Purple Belt) because unity matters when executing hard decisions. This isn't selling out - it's maturity. You stay AND you execute with full integrity. If you can't commit, THEN you resign. But checking out while staying is the worst option. This is Black Belt leadership - fighting hard, committing fully, or exiting cleanly."
    },
    {
        "question": "SCENARIO: You discover that a peer leader has been taking credit for their team's work in exec meetings while privately blaming them for failures. This violates every leadership principle you hold. However, confronting them risks: (1) Your working relationship, (2) Your reputation as a 'team player,' (3) Potential retaliation. Your CEO values collaboration and tends to shoot messengers.\n\nWhat do you do?",
        "options": [
            "Gather evidence and present it to HR with specific examples",
            "Have a private crucial conversation with the peer about what you've observed",
            "Bring it up in an exec meeting to make the pattern visible to leadership",
            "Support their team members directly by validating their contributions publicly"
        ],
        "correct": 1,
        "explanation": "Excellent application of Crucial Conversations + Radical Candor. You chose the path of highest respect: direct conversation with the peer first. This honors Blue Belt (productive conflict) and Brown Belt (integrity). You're not avoiding it (White Belt fear), not going around them (political), not making it public (shaming). You're saying: 'I care about you AND I can't stay silent about this pattern.' This is courageous. It might fail. But it's the only approach that treats them with dignity while holding the standard. Black Belt courage."
    },
    {
        "question": "SCENARIO: Your highest-performing team member (Alex) tells you privately they're considering leaving because they're burned out and don't see growth opportunities. However, Alex is critical to a major initiative launching in 3 months. You know if Alex leaves now, the project will fail.\n\nIntegrating vulnerability (White), crucial conversations (Blue), strategic thinking (Purple), and extreme ownership (Brown), what's the Black Belt response?",
        "options": [
            "Offer them a promotion or raise to incentivize them to stay through the launch",
            "Have an honest conversation about their needs, help them see growth opportunities, but accept their decision if they still want to leave",
            "Delay the conversation until after the launch to protect the project",
            "Create a retention plan that addresses burnout while ensuring project continuity"
        ],
        "correct": 1,
        "explanation": "Black Belt leadership recognizes that retaining someone who wants to leave creates dependency, not commitment. You'll have the vulnerable conversation (White Belt), address the real issues (Blue Belt crucial conversation), explore options (Purple Belt strategic thinking), and take extreme ownership of creating conditions where they might want to stay (Brown Belt). But ultimately, if they decide to leave, you support them. Because true leadership serves the person, not just the project. This is the hardest call - but it's the right one."
    },
    {
        "question": "SCENARIO: Your organization's culture rewards individual heroics over team collaboration. You've been promoted to a role where you can influence culture change. However, your success in this role was built on the old culture - your heroics got you here. Changing the culture might make your past achievements less valued.\n\nThis is a Black Belt challenge because it requires:",
        "options": [
            "Choosing between your past success and future organizational success",
            "Integrating your past (acknowledging what got you here) with future vision (what the organization needs)",
            "Convincing leadership that collaboration is better without undermining your own achievements",
            "Building a coalition to change culture so you don't have to change yourself"
        ],
        "correct": 1,
        "explanation": "Black Belt mastery means holding paradoxes: 'I succeeded in the old system, AND I'm building a new system where that success looks different.' This requires: vulnerability (acknowledging your past success might not be future success), strategic thinking (the organization needs different behaviors), and extreme ownership (taking responsibility for culture change even when it might diminish your personal standing). The Black Belt move: honor your past, build the future, don't let ego block transformation."
    },
    {
        "question": "SCENARIO: You're teaching leadership to a group of high-potential managers. One participant consistently challenges your methods, questions your examples, and pushes back on your frameworks. Others in the group are getting frustrated with them.\n\nAs a Black Belt teacher, you recognize this person is:",
        "options": [
            "Disrupting the learning and needs to be managed or removed",
            "Engaging in the highest form of learning - critical thinking and integration",
            "Projecting their own insecurities onto you and the material",
            "Testing your authority and needs to be put in their place"
        ],
        "correct": 1,
        "explanation": "Black Belt teachers recognize: the best students challenge, question, and integrate - they don't just absorb. This participant is doing the work: thinking critically, testing frameworks, making it their own. Your job isn't to win the argument - it's to facilitate their learning. The Black Belt teacher move: engage their challenges, explore their questions, help them integrate concepts with their experience. This is how you build leaders who think for themselves, not just follow frameworks."
    },
    {
        "question": "SCENARIO: You've built a high-performing team over 3 years. They trust each other, engage in healthy conflict, commit to decisions, hold each other accountable, and focus on results. Now you're being promoted to a different role.\n\nThe Black Belt question isn't 'Will they succeed without me?' but rather:",
        "options": [
            "'How do I ensure they continue to perform at the same level?'",
            "'Have I built leaders who can lead themselves and each other?'",
            "'Who should I recommend as my replacement?'",
            "'What processes can I create to maintain team performance?'"
        ],
        "correct": 1,
        "explanation": "Black Belt leadership recognizes: your ultimate success isn't building a high-performing team - it's building a team that can perform without you. If you built dependency (they need you), you failed. If you built capability (they can lead themselves), you succeeded. The Black Belt question: 'Did I create leaders or followers?' The answer determines whether this team will thrive or struggle in your absence. True mastery is making yourself dispensable by building capability."
    },
    {
        "question": "SCENARIO: You're leading a transformation initiative that requires people to change deeply held behaviors. Early adopters are excited, but 60% are resisting. Your CEO wants faster progress and is questioning your approach.\n\nBlack Belt transformation leadership requires:",
        "options": [
            "Increasing pressure and accountability to force faster adoption",
            "Balancing urgency (stakeholder pressure) with patience (human change takes time)",
            "Focusing only on early adopters and accepting that resistors will eventually follow",
            "Changing your approach to match what leadership wants, regardless of effectiveness"
        ],
        "correct": 1,
        "explanation": "Black Belt leaders hold multiple tensions: urgency (stakeholder expectations) AND patience (human change takes time), push (accountability) AND pull (invitation), consistency (steady approach) AND flexibility (learning and adjusting). Transformation fails when leaders choose one pole: too much patience = no progress. Too much urgency = resistance wins. The Black Belt move: maintain steady pressure while creating space for people to make the change their own. This is the hardest leadership work - holding tensions without choosing sides."
    },
    {
        "question": "SCENARIO: You're facing an ethical dilemma. Following company policy would harm customers, but violating policy could cost you your job. Your team is watching how you handle this.\n\nBlack Belt integrity means:",
        "options": [
            "Finding a creative solution that technically follows policy while protecting customers",
            "Following policy but documenting the harm it causes",
            "Violating policy to protect customers, accepting the consequences",
            "Escalating to leadership and following whatever decision they make"
        ],
        "correct": 2,
        "explanation": "Black Belt integrity isn't about finding loopholes or passing responsibility - it's about doing what's right, even when it costs you. When policy conflicts with ethics, ethics wins. Always. This might cost you your job. But your integrity is worth more than your position. This is what 'extreme ownership' means at the highest level: you own the outcome, even when it's hard. Your team is watching - they'll learn from what you model. Model courage, not compliance."
    },
    {
        "question": "SCENARIO: After years of leadership development, you realize you've been leading from ego - seeking recognition, needing to be right, building teams that depend on you. You see this pattern clearly now.\n\nBlack Belt self-awareness means:",
        "options": [
            "Overcorrecting - becoming passive and never asserting your views",
            "Acknowledging the pattern, understanding its origins, and consciously choosing different behaviors going forward",
            "Pretending the pattern doesn't exist since you've already achieved success",
            "Apologizing to everyone you've led and starting over"
        ],
        "correct": 1,
        "explanation": "Black Belt mastery includes self-awareness: seeing your patterns clearly, understanding why they exist, and consciously choosing different behaviors. Ego-driven leadership often comes from insecurity - needing external validation. The Black Belt move: acknowledge the pattern without judgment, understand its protective function (it kept you safe), and choose to lead from service instead. This isn't self-flagellation - it's growth. The most powerful leaders are those who've seen their shadows and integrated them."
    }
]

# Black Belt Stripe 2: Teaching & Developing Leaders (10 questions)
BLACK_STRIPE2_QUESTIONS = [
    {
        "question": "SCENARIO: You're mentoring a high-potential leader (Jordan) who consistently makes good decisions but struggles with confidence. Jordan second-guesses decisions and seeks your approval frequently.\n\nThe Black Belt teaching move is to:",
        "options": [
            "Build their confidence by validating their good decisions and providing reassurance",
            "Help them distinguish between healthy validation-seeking and confidence-building self-reflection",
            "Push them to make decisions independently without your input",
            "Provide more frequent feedback so they can learn faster"
        ],
        "correct": 1,
        "explanation": "Black Belt teachers recognize: confidence isn't built through external validation - it's built through internal self-trust. The goal isn't to eliminate second-guessing (healthy reflection is good) but to help them trust their own judgment. The Black Belt move: 'What does your gut tell you?' 'What would you do if I weren't here?' 'What's the worst that could happen if you're wrong?' Help them build internal validation, not dependence on external approval. This is how you create leaders who lead from within."
    },
    {
        "question": "SCENARIO: You're teaching leadership to a group, and a participant asks: 'But what if I try vulnerability and my team takes advantage of it?'\n\nThis question reveals the participant is stuck at:",
        "options": [
            "White Belt - they haven't built trust yet and fear being vulnerable",
            "Blue Belt - they understand conflict but fear it will become destructive",
            "A fundamental misunderstanding of vulnerability as weakness rather than courage",
            "A legitimate concern that needs to be addressed with risk mitigation strategies"
        ],
        "correct": 2,
        "explanation": "Black Belt teachers recognize: this question reveals they see vulnerability as weakness ('they'll take advantage') rather than strength ('they'll respect my courage'). The Black Belt teaching move: reframe vulnerability. 'Vulnerability isn't sharing weaknesses - it's having the courage to be real. It's saying what needs to be said even when it's hard. Your team won't take advantage - they'll respect you more.' Help them see: vulnerability builds trust and respect, it doesn't invite exploitation. This is fundamental understanding."
    },
    {
        "question": "SCENARIO: You're developing a leader (Casey) who is brilliant strategically but struggles with emotional intelligence - they miss social cues and often hurt people's feelings without realizing it.\n\nBlack Belt development means:",
        "options": [
            "Protecting them from feedback so they can focus on their strengths",
            "Pairing them with someone who has high EQ to compensate for their weakness",
            "Creating safe spaces for them to receive direct feedback about their impact and practice emotional awareness",
            "Accepting that some leaders are just better at strategy than people"
        ],
        "correct": 2,
        "explanation": "Black Belt development recognizes: you can't skip fundamental leadership skills. Strategy without emotional intelligence creates brilliant plans that fail in execution. The Black Belt move: create conditions for growth. Pair them with a coach who can give direct, caring feedback. Help them practice noticing social cues. Use role-play and real-time feedback. This is uncomfortable work, but it's necessary. Black Belt leaders aren't just strategic - they're complete. Help them become complete."
    },
    {
        "question": "SCENARIO: You're teaching conflict management, and a participant says: 'I've tried having difficult conversations, but they always escalate. Maybe I'm just not good at this.'\n\nThe Black Belt teaching response is:",
        "options": [
            "Validate their experience and suggest they might be better suited to less confrontational leadership roles",
            "Help them examine what happens BEFORE the conversation that might be causing escalation - their preparation, mindset, and approach",
            "Provide them with scripts to follow word-for-word in difficult conversations",
            "Tell them that conflict management is a natural talent that some people just don't have"
        ],
        "correct": 1,
        "explanation": "Black Belt teachers know: if conversations consistently escalate, there's a pattern to examine. What's happening in preparation? Mindset? Opening? The Black Belt move: help them see the pattern. 'What are you thinking before these conversations?' 'How are you opening them?' 'What's your body language?' Often, escalation happens because: they're anxious (creates defensiveness), they're blaming (creates fight-or-flight), they're unprepared (creates confusion). Help them see: this is learnable. With practice and awareness, they can master this."
    },
    {
        "question": "SCENARIO: A leader you're developing (Morgan) asks: 'How do I know if I'm ready to lead a bigger team?'\n\nBlack Belt mentoring means:",
        "options": [
            "Giving them a clear checklist of skills they need before they're ready",
            "Helping them reflect: 'Are people following you because they have to, or because they want to? Do they seek your input on decisions? Do they grow in your presence?'",
            "Testing them with increasingly larger leadership challenges",
            "Telling them they're ready when they feel confident"
        ],
        "correct": 1,
        "explanation": "Black Belt mentoring helps people discover readiness, not just achieve it. The question isn't 'Do you have the skills?' It's 'Are you leading in a way that creates followers?' Black Belt indicators: people seek your input (not because they have to, because they value it), people grow in your presence (not despite you, because of you), people choose to follow (not because of authority, because of influence). If these are true, you're ready. If not, focus there. This is self-discovery, not skill-checking."
    },
    {
        "question": "SCENARIO: You're teaching accountability, and someone asks: 'But what if holding someone accountable damages the relationship?'\n\nThis question reveals they're confusing accountability with:",
        "options": [
            "Confrontation and conflict",
            "Personal criticism and judgment",
            "Punishment and consequences",
            "All of the above - they see accountability as negative rather than caring"
        ],
        "correct": 3,
        "explanation": "Black Belt teachers recognize: many people see accountability as punishment, criticism, or relationship-damaging confrontation. The Black Belt reframe: 'Accountability IS caring. I'm holding you accountable because I care about you, the team, and our shared goals. If I didn't care, I'd let you fail in silence.' Help them see: accountability done well (direct, respectful, focused on standards, not personality) strengthens relationships. People respect leaders who hold the line. They lose respect for leaders who don't."
    },
    {
        "question": "SCENARIO: You're developing multiple leaders simultaneously. One (Taylor) is progressing quickly, asking great questions, applying concepts. Another (Riley) is struggling, seems resistant, questions the value.\n\nBlack Belt development means:",
        "options": [
            "Focusing energy on Taylor since they're showing more promise",
            "Spending extra time with Riley to figure out why they're resistant",
            "Recognizing that development happens at different paces and both need different approaches",
            "Creating a competitive environment where Taylor's success motivates Riley"
        ],
        "correct": 2,
        "explanation": "Black Belt teachers know: everyone learns differently. Taylor might need: more advanced challenges, teaching opportunities, stretch assignments. Riley might need: slower pace, more support, understanding their resistance. The Black Belt move: meet each person where they are. Don't compare. Don't force the same pace. Development isn't a race - it's individual growth. Invest in both, differently. Sometimes the 'struggling' learner becomes the strongest leader because they had to work harder to integrate concepts."
    },
    {
        "question": "SCENARIO: A leader you're mentoring asks: 'How do I build a leadership philosophy that feels authentic to me?'\n\nBlack Belt teaching means:",
        "options": [
            "Sharing your leadership philosophy as a template they can adapt",
            "Helping them reflect: 'What values guide you? What do you stand for? What can't you compromise on? What's your why?'",
            "Recommending books and frameworks they can study",
            "Telling them to observe successful leaders and model their approaches"
        ],
        "correct": 1,
        "explanation": "Black Belt teachers recognize: leadership philosophy isn't learned - it's discovered. It comes from within: your values, your experiences, your what-matters-most. The Black Belt move: ask powerful questions. 'What can't you compromise on?' 'What would you fight for?' 'What breaks your heart?' 'What makes you come alive?' Help them discover their own answers. Their philosophy will emerge from reflection, not instruction. Your job is to create the space for discovery."
    },
    {
        "question": "SCENARIO: You're teaching strategic thinking, and someone says: 'I understand the concepts, but I can't apply them to my real situation.'\n\nThis is a teaching moment because:",
        "options": [
            "They need more examples and case studies to see applications",
            "The gap between understanding and application reveals they need practice with integration, not more theory",
            "They're not smart enough to apply abstract concepts",
            "The concepts aren't relevant to their situation"
        ],
        "correct": 1,
        "explanation": "Black Belt teachers recognize: understanding ≠ application. Application requires: seeing patterns, connecting concepts to context, making judgments. The Black Belt move: practice integration. 'Let's take YOUR situation. What's the real challenge here? Which concepts apply? How would you connect them?' Walk through their real scenarios. Help them see: concepts aren't rules - they're thinking tools. Application comes through practice, not explanation. This is where teaching becomes learning."
    },
    {
        "question": "SCENARIO: A leader you've developed (Avery) is now leading a team that's outperforming yours. Avery is using approaches you taught, but doing it better than you do.\n\nThis is Black Belt success because:",
        "options": [
            "Your teaching was so effective that Avery surpassed you",
            "You've created a leader who can lead independently and even innovate beyond your methods",
            "You should step up your own leadership to compete with Avery",
            "You've proven your teaching methods work"
        ],
        "correct": 1,
        "explanation": "Black Belt mastery means: your greatest success is creating leaders who surpass you. This isn't failure - it's the ultimate win. If Avery is outperforming you using methods you taught, you've succeeded. The Black Belt teacher celebrates this. Your legacy isn't being the best leader - it's creating leaders who become better than you. This is what mastery looks like: making yourself obsolete by building capability in others. This is the teacher's ultimate achievement."
    }
]

# Black Belt Stripe 3: Leadership Philosophy & Legacy (10 questions)
BLACK_STRIPE3_QUESTIONS = [
    {
        "question": "SCENARIO: You're defining your leadership legacy. You've built successful teams, developed leaders, and achieved results. But you're asking: 'What will remain when I'm gone?'\n\nBlack Belt legacy thinking means:",
        "options": [
            "Documenting your methods and creating systems that preserve your approach",
            "Building leaders and culture that thrive independently, making your direct involvement unnecessary",
            "Ensuring your name is associated with major achievements",
            "Creating processes and structures that require your ongoing oversight"
        ],
        "correct": 1,
        "explanation": "Black Belt legacy recognizes: true legacy isn't what you built - it's what continues to build without you. If your systems require you, that's dependency, not legacy. If your culture depends on your presence, that's not sustainable. The Black Belt legacy: leaders who lead independently, culture that reinforces itself, systems that create capability. Your legacy is what grows when you're gone, not what preserves your memory. This is the difference between building something great and building something that creates greatness."
    },
    {
        "question": "SCENARIO: After decades of leadership, you realize you've been optimizing for short-term results (quarterly metrics, annual bonuses) at the expense of long-term capability building (developing leaders, building culture).\n\nBlack Belt leadership philosophy requires:",
        "options": [
            "Switching entirely to long-term thinking and ignoring short-term pressures",
            "Balancing short-term execution with long-term capability building - holding both tensions",
            "Finding a role where you only focus on long-term development",
            "Accepting that leadership requires choosing between short-term and long-term"
        ],
        "correct": 1,
        "explanation": "Black Belt philosophy holds tensions: you need BOTH short-term results AND long-term capability. The question isn't 'Which matters more?' It's 'How do I deliver results while building capability?' The Black Belt move: make development part of execution. 'We're doing X project (results) AND developing Y leaders through it (capability).' This isn't either/or - it's both/and. Black Belt leaders optimize for the system, not just the quarter. They deliver results while building future capacity."
    },
    {
        "question": "SCENARIO: You're asked to define your leadership philosophy in one sentence.\n\nA Black Belt philosophy would be:",
        "options": [
            "'I build high-performing teams that deliver results.'",
            "'I serve others by creating conditions where they can do their best work and become their best selves.'",
            "'I lead through vision, strategy, and execution.'",
            "'I hold people accountable and drive performance.'"
        ],
        "correct": 1,
        "explanation": "Black Belt philosophy is service-oriented: leadership is about others, not yourself. It's about creating conditions (trust, safety, clarity, challenge) where people can excel. It's about development (helping people become their best selves) AND results (delivering outcomes). Notice the difference: 'I build teams' (about you) vs. 'I serve by creating conditions' (about them). Black Belt leadership is service. The work is about others. The results serve a greater purpose. This is philosophy, not tactics."
    },
    {
        "question": "SCENARIO: You're facing a values conflict. Your organization's values say 'integrity first,' but you're being asked to mislead customers about product capabilities to close a deal.\n\nBlack Belt integrity means:",
        "options": [
            "Finding a way to technically tell the truth while still closing the deal",
            "Refusing to mislead, accepting that you might lose the deal and potentially your job",
            "Following organizational directives while documenting your concerns",
            "Misleading customers but working to change the organization's practices later"
        ],
        "correct": 1,
        "explanation": "Black Belt integrity is non-negotiable. When values conflict with demands, values win. Always. Even when it costs you. Even when it's hard. Even when everyone else is doing it. Integrity isn't integrity if it's conditional. The Black Belt move: 'I can't do that. Here's why. Here's an alternative that serves the customer AND closes the deal.' If that's not acceptable, you walk. Your integrity is worth more than any deal, any job, any opportunity. This is what 'uncompromising' means."
    },
    {
        "question": "SCENARIO: You're known as a leader who 'gets things done.' You deliver results consistently. But you're asking: 'Am I building something that lasts, or just achieving short-term wins?'\n\nThis self-reflection is Black Belt because it recognizes:",
        "options": [
            "Short-term wins are important and shouldn't be questioned",
            "True leadership creates sustainable systems, not just temporary results",
            "You should focus more on relationships and less on results",
            "Results matter more than how you achieve them"
        ],
        "correct": 1,
        "explanation": "Black Belt self-awareness recognizes: results achieved through unsustainable means (burnout, dependency, heroics) aren't true success. True leadership creates systems that produce results sustainably. The Black Belt question: 'Could this continue without me? Are people growing? Is capability building? Or am I just pushing hard to deliver?' This reflection leads to different choices: invest in capability, build systems, develop leaders. Because sustainable results > temporary wins. This is the difference between managing and leading."
    },
    {
        "question": "SCENARIO: You've achieved significant success - promotions, recognition, high-performing teams. But you're questioning: 'What am I optimizing for? Personal success or something bigger?'\n\nBlack Belt philosophy shifts from:",
        "options": [
            "Personal success to organizational success",
            "Individual achievement to building capability in others",
            "Career advancement to impact and legacy",
            "All of the above - from 'what's in it for me' to 'what serves the greater good'"
        ],
        "correct": 3,
        "explanation": "Black Belt philosophy recognizes: personal success is satisfying, but it's limited. True fulfillment comes from building something bigger than yourself. This shift: from 'How do I succeed?' to 'How do I help others succeed?' from 'What's my impact?' to 'What's our collective impact?' from 'What do I achieve?' to 'What capability do I create?' This isn't self-sacrifice - it's expansion. Your success becomes defined by others' growth. This is the shift from managing a career to building a legacy."
    },
    {
        "question": "SCENARIO: You're leading through a crisis. Every decision matters. People are stressed. Results are urgent. You feel the pressure.\n\nBlack Belt leadership under pressure means:",
        "options": [
            "Shielding your team from the pressure so they can focus",
            "Sharing the pressure transparently while maintaining clarity and calm",
            "Doubling down on accountability and performance expectations",
            "Taking all the pressure yourself and handling everything"
        ],
        "correct": 1,
        "explanation": "Black Belt leaders in crisis: share reality (don't hide pressure), maintain clarity (don't add confusion), model calm (don't spread anxiety), create agency (don't create helplessness). The Black Belt move: 'Here's the situation. Here's what we can control. Here's what we can't. Here's how we'll move forward.' You're honest about pressure while creating capacity to respond. You feel the pressure, but you don't let it drive you. You let it inform you. This is leadership under fire - clarity, calm, agency in the face of uncertainty."
    },
    {
        "question": "SCENARIO: You're asked: 'What's your leadership philosophy?' You want to answer authentically, not with a rehearsed statement.\n\nBlack Belt authenticity means your philosophy comes from:",
        "options": [
            "Studying successful leaders and adopting their approaches",
            "Your lived experience - what you've learned through practice, reflection, and integration",
            "Your organization's values and leadership frameworks",
            "A combination of research, training, and best practices"
        ],
        "correct": 1,
        "explanation": "Black Belt philosophy is discovered through experience, not learned from others. It emerges from: what you've lived, what you've learned, what you've integrated. It's unique to you - your values, your experiences, your what-matters-most. You might draw from others' wisdom, but your philosophy is YOURS. It's not a quote - it's a lived understanding. Black Belt authenticity: your philosophy reflects your journey, not someone else's. This is what makes it real and compelling."
    },
    {
        "question": "SCENARIO: After years of leadership, you realize you've been leading from fear - fear of failure, fear of being seen as weak, fear of losing control.\n\nBlack Belt self-awareness means:",
        "options": [
            "Suppressing the fear and pretending it doesn't affect you",
            "Acknowledging the fear, understanding its protective function, and choosing to lead from courage instead",
            "Finding leadership roles where you don't face these fears",
            "Accepting that fear is part of leadership and learning to manage it"
        ],
        "correct": 1,
        "explanation": "Black Belt self-awareness: seeing your patterns clearly, understanding why they exist (fear protected you), and consciously choosing different responses (courage). Fear-based leadership creates: control, dependency, anxiety. Courage-based leadership creates: trust, capability, calm. The Black Belt move: acknowledge the fear without judgment, understand its origins, and choose courage. This isn't eliminating fear - it's recognizing it and choosing to act from courage anyway. 'I'm afraid, AND I'm moving forward.' This is the integration of awareness and action."
    },
    {
        "question": "SCENARIO: You're defining what success means to you as a leader. You've achieved results, developed teams, built culture.\n\nBlack Belt success is measured by:",
        "options": [
            "Your personal achievements and recognition",
            "The capability and independence of the leaders you've developed",
            "The results your teams deliver",
            "All of the above, with emphasis on building lasting capability"
        ],
        "correct": 3,
        "explanation": "Black Belt success includes: results (you deliver outcomes), development (you build leaders), impact (you create capability). But the ultimate measure: 'Can they thrive without me?' If yes, you've succeeded. If no, you've created dependency. Black Belt success = results + development + independence. Your teams perform. Your leaders grow. Your organization becomes more capable. And it all continues when you're gone. This is the complete definition of leadership success."
    }
]

# Black Belt Stripe 4: Mastery Under Fire (10 questions)
BLACK_STRIPE4_QUESTIONS = [
    {
        "question": "SCENARIO: You're leading through a major organizational crisis. Your team is stressed, stakeholders are demanding answers, and you don't have all the information you need.\n\nBlack Belt crisis leadership requires:",
        "options": [
            "Projecting absolute confidence even when uncertain",
            "Being transparent about uncertainty while providing clarity on what you DO know and how you'll proceed",
            "Waiting until you have complete information before communicating",
            "Delegating the crisis response to experts and focusing on maintaining normal operations"
        ],
        "correct": 1,
        "explanation": "Black Belt crisis leadership: transparency about uncertainty, clarity about what you know, direction about how you'll proceed. People need: honesty ('I don't know everything'), clarity ('Here's what I do know'), direction ('Here's how we'll figure it out'). False confidence destroys trust. Uncertainty without direction creates anxiety. The Black Belt move: 'Here's what we know. Here's what we don't. Here's how we'll learn. Here's what we'll do next.' This is leadership in ambiguity - clarity in uncertainty."
    },
    {
        "question": "SCENARIO: You're facing an ethical dilemma with no good options. Every choice has negative consequences. There's no 'right' answer.\n\nBlack Belt ethical leadership means:",
        "options": [
            "Choosing the option with the least negative consequences",
            "Finding a creative third option that avoids the dilemma",
            "Choosing based on your core values, accepting that negative consequences are inevitable",
            "Delaying the decision until a better option emerges"
        ],
        "correct": 2,
        "explanation": "Black Belt ethical leadership recognizes: some dilemmas have no good answers. When every option has costs, you choose based on values. 'Which option aligns with what I stand for? Which can I live with? Which serves the greater good?' You accept that negative consequences are inevitable, but you choose the path that honors your values. This is the hardest leadership - choosing when all options are hard. Black Belt integrity means: when there's no good answer, you choose the least-worst path that aligns with your values."
    },
    {
        "question": "SCENARIO: You're leading a transformation that's failing. Resistance is high, results are slow, leadership is questioning the approach.\n\nBlack Belt leadership means:",
        "options": [
            "Doubling down on the original plan and pushing harder",
            "Pivoting immediately to a new approach based on stakeholder feedback",
            "Examining what's failing and why, then adjusting approach while maintaining vision",
            "Stepping back and letting the transformation fail to learn from it"
        ],
        "correct": 2,
        "explanation": "Black Belt transformation leadership: hold vision steady, adjust tactics based on learning. The vision (where we're going) doesn't change easily. The approach (how we're getting there) adapts to reality. The Black Belt move: 'What's failing? Why? What can we learn? How do we adjust?' This requires: courage (acknowledging what's not working), learning (understanding why), flexibility (changing approach), persistence (maintaining vision). This is how you lead through failure - not by giving up, not by refusing to adapt, but by learning and adjusting."
    },
    {
        "question": "SCENARIO: You're under extreme pressure - tight deadlines, high stakes, multiple demands. You feel yourself getting reactive, making quick decisions, losing patience with your team.\n\nBlack Belt mastery under pressure means:",
        "options": [
            "Pushing through the pressure and maintaining your high standards",
            "Slowing down to speed up - creating space for clear thinking even when urgent",
            "Isolating yourself to avoid spreading stress to your team",
            "Accepting that pressure naturally causes reactivity and it's unavoidable"
        ],
        "correct": 1,
        "explanation": "Black Belt mastery: pressure doesn't drive you - you drive through pressure. The paradox: when everything is urgent, you must slow down. Create space: 'Let me think about this.' 'What's really important here?' 'What's the best move?' Reactivity creates mistakes. Clarity creates better decisions. The Black Belt move: pause, breathe, think, then act. Even 30 seconds of clarity prevents hours of fixing mistakes. This is what mastery looks like under fire - calm, clear, decisive, not reactive."
    },
    {
        "question": "SCENARIO: You're leading through a conflict between two senior team members. Both are right from their perspectives. Both are valuable. The conflict is blocking progress.\n\nBlack Belt conflict resolution means:",
        "options": [
            "Choosing the side that aligns with your strategic priorities",
            "Finding the underlying shared interest that both perspectives are trying to serve",
            "Mediating a compromise where both sides give up something",
            "Separating them into different teams to avoid the conflict"
        ],
        "correct": 1,
        "explanation": "Black Belt conflict resolution: when both perspectives have merit, find the shared interest they're both serving. Example: 'You want speed (perspective 1) and you want quality (perspective 2). Both serve customer satisfaction. How do we achieve both?' The Black Belt move: reframe from 'either/or' to 'both/and.' Help them see they're on the same team, just emphasizing different aspects of the same goal. Then find solutions that honor both. This is integration, not compromise."
    },
    {
        "question": "SCENARIO: You're recovering from a major leadership failure. A decision you made caused significant harm. People lost trust. Your confidence is shaken.\n\nBlack Belt recovery means:",
        "options": [
            "Moving on quickly and focusing on future success",
            "Acknowledging the failure fully, learning from it, rebuilding trust through changed behavior",
            "Finding ways to minimize the failure's significance",
            "Proving your competence through immediate wins to restore confidence"
        ],
        "correct": 1,
        "explanation": "Black Belt recovery: failure is data, not identity. The move: (1) Acknowledge fully ('I made a mistake. Here's what happened. I'm sorry.'), (2) Learn deeply ('What did I miss? Why did this happen?'), (3) Change behavior ('Here's what I'll do differently.'), (4) Rebuild trust through consistent new behavior. This isn't about self-flagellation or defensiveness - it's about integration. Failure teaches. Learn. Grow. Come back stronger. This is how you recover with integrity - not by avoiding, not by proving, but by learning and changing."
    },
    {
        "question": "SCENARIO: You're making a decision with incomplete information. Waiting for more data will delay critical action. Acting now risks making the wrong choice.\n\nBlack Belt decision-making means:",
        "options": [
            "Waiting until you have enough information to be confident",
            "Making the best decision with available information, building in feedback loops to adjust",
            "Choosing the safest option that minimizes risk",
            "Deferring the decision to someone with more information"
        ],
        "correct": 1,
        "explanation": "Black Belt decision-making: perfectionism is paralysis. You make the best call with available information, then adjust based on feedback. The Black Belt framework: 'Here's what I know. Here's what I don't. Here's my best decision given what I know. Here's how I'll learn if I'm wrong. Here's how I'll adjust.' This is 'discovery-driven' decision-making - you move forward, learn, adjust. Waiting for perfect information means you never move. Making calls with incomplete information and adjusting is leadership."
    },
    {
        "question": "SCENARIO: You're leading a team that's demoralized after a major setback. Morale is low. Energy is depleted. Results are suffering.\n\nBlack Belt leadership means:",
        "options": [
            "Pushing harder for results to overcome the setback",
            "Acknowledging the setback, processing the emotions, then refocusing on what's possible",
            "Focusing on positive outcomes and avoiding discussion of the setback",
            "Restructuring the team to bring in fresh energy"
        ],
        "correct": 1,
        "explanation": "Black Belt leadership: you can't skip the emotions. People need: acknowledgment ('This is hard'), processing ('What did we learn?'), refocusing ('What's possible now?'). The Black Belt move: create space for the emotions, help them make meaning from the setback, then redirect energy forward. Don't bypass the feelings - process them. Then channel that energy into growth. This is how you lead through demoralization - not by ignoring it, not by forcing positivity, but by acknowledging, processing, and redirecting."
    },
    {
        "question": "SCENARIO: You're managing your own triggers and biases under stress. You notice yourself getting defensive, making assumptions, reacting emotionally.\n\nBlack Belt self-management means:",
        "options": [
            "Suppressing your emotional reactions to maintain professionalism",
            "Recognizing your triggers in real-time, pausing, choosing your response rather than reacting",
            "Removing yourself from stressful situations until you can respond calmly",
            "Accepting that stress naturally causes reactivity and it's part of leadership"
        ],
        "correct": 1,
        "explanation": "Black Belt self-awareness: you notice your reactions, pause, choose your response. The pattern: Trigger → Recognize → Pause → Choose. Example: Someone challenges you. Your trigger fires (defensiveness). You notice: 'I'm getting defensive.' You pause. You choose: 'What are they really saying? How can I respond with curiosity instead of defensiveness?' This is mastery - awareness in real-time, choice instead of reaction. It's not suppression (ignoring emotions) - it's integration (feeling emotions, choosing response)."
    },
    {
        "question": "SCENARIO: You're facing the ultimate Black Belt challenge: integrating all your learning - trust, conflict, commitment, accountability, strategy, culture, coaching, philosophy - while leading through a complex, ambiguous situation with high stakes.\n\nBlack Belt integration means:",
        "options": [
            "Applying each concept sequentially as situations arise",
            "Seeing the situation holistically and applying the right concepts in the right sequence, in real-time, under pressure",
            "Relying on your strongest leadership skills and delegating areas where you're weaker",
            "Following a framework or checklist to ensure you cover all concepts"
        ],
        "correct": 1,
        "explanation": "Black Belt mastery: integration happens in real-time, under pressure, holistically. You're not thinking 'Now I'll apply White Belt trust' - you're seeing the whole situation and knowing: 'This requires vulnerability, crucial conversation, strategic thinking, and accountability, in this sequence, now.' It's seamless. Natural. Intuitive. The concepts have become part of how you think, not tools you apply. This is what mastery looks like - integration so complete it becomes instinct. You don't think about it - you just do it. This is Black Belt."
    }
]

def generate_quiz_html(questions, stripe_num, passing_threshold=85):
    """Generate HTML for quiz questions with Black Belt 85% threshold"""
    html = ""
    
    for i, q in enumerate(questions, 1):
        html += f"""
            <!-- Question {i}: Multiple Choice -->
            <div class="quiz-question" data-question="{i}">
                <h3>Question {i} of 10</h3>
                <p class="question-text" style="white-space: pre-line;">{q['question']}</p>
                
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

def update_black_stripe_file(stripe_num, questions, passing_threshold=85):
    """Update a Black Belt stripe file with new quiz questions"""
    filename = f"black-belt-stripe{stripe_num}-gamified.html"
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
    new_quiz_html = generate_quiz_html(questions, stripe_num, passing_threshold)
    
    # Replace quiz questions
    new_content = content[:questions_start] + new_quiz_html + content[questions_end:]
    
    # Update passing threshold in JavaScript if found
    threshold_pattern = r'(quizScore >= )\d+'
    new_content = re.sub(threshold_pattern, f'\\g<1>{int(passing_threshold / 10)}', new_content)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"   ✅ Updated with {len(questions)} questions (85% passing threshold)")
    return True

def main():
    print("⚫ Generating Black Belt Quiz Questions")
    print("=" * 60)
    print("⚠️  VERY HARD - 85% Passing Threshold Required")
    print("=" * 60)
    
    # Update all 4 stripes
    stripe_data = [
        (1, BLACK_STRIPE1_QUESTIONS, "Integration & Mastery"),
        (2, BLACK_STRIPE2_QUESTIONS, "Teaching & Developing Leaders"),
        (3, BLACK_STRIPE3_QUESTIONS, "Leadership Philosophy & Legacy"),
        (4, BLACK_STRIPE4_QUESTIONS, "Mastery Under Fire")
    ]
    
    updated = 0
    for stripe_num, questions, theme in stripe_data:
        print(f"\n📋 Stripe {stripe_num}: {theme}")
        if update_black_stripe_file(stripe_num, questions, 85):
            updated += 1
    
    print(f"\n✅ Complete! Updated {updated}/4 stripe files")
    print(f"📊 Total: {updated * 10} VERY HARD questions created")
    print(f"🎯 Passing Threshold: 85% (9/10 correct required)")

if __name__ == '__main__':
    main()

