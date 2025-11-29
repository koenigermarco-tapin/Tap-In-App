#!/usr/bin/env python3
"""
Add Remaining Quiz Questions to expand-all-quiz-questions.py

This extends the question bank with all remaining stripes.
"""

# Additional questions for remaining stripes - add to QUIZ_QUESTIONS_EXPANDED dict

ADDITIONAL_QUESTIONS = {
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
            'options': ['Waiting for your turn to speak', 'Fully understanding the other person's perspective before responding', 'Agreeing with everything', 'Taking notes'],
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
}

print("✅ Additional questions for Blue Belt Stripes 2-4 added!")
print(f"📊 Total questions added: {sum(len(q) for q in ADDITIONAL_QUESTIONS.values())}")

