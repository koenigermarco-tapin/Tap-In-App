/**
 * WHITE BELT - STRIPE 4: VULNERABILITY IN ACTION
 * Theme: Putting vulnerability principles into real leadership practice
 * Focus: Trust through embodiment, admitting mistakes, asking for help, integration
 */

interface Lesson {
  id: number;
  title: string;
  content: string[];
  learningObjective: string;
  duration: string;
  xpReward: number;
}

interface Checkpoint {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xpReward: number;
}

export const stripe4Lessons: Lesson[] = [
  {
    id: 1,
    title: "The Grip-Switch: Trust Through Touch",
    content: [
      "In Brazilian Jiu Jitsu, the 'grip fight' determines everything. Who controls the grips controls the match. But here's what white belts don't understand: effective grips aren't about strength—they're about sensitivity. You need to feel what your opponent is doing so you can respond before they move.",
      
      "There's a drill called the 'Grip-Switch' that teaches this. Two partners face each other, both with right-hand grips on each other's left lapel. Partner A tries to break Partner B's grip. Partner B relaxes their grip just enough that A can't break it—but not so much that they lose control. It's a constant calibration: tight enough to maintain connection, loose enough to feel A's intentions.",
      
      "The lesson isn't just about grips—it's about trust through physical awareness. To do the Grip-Switch well, you have to trust that your partner isn't going to rip your hand off. They have to trust you're not going to freeze-grip and hurt them. Both partners develop sensitivity to each other's force and intention. This is embodied trust.",
      
      "Research from the Strozzi Institute shows that 70-90% of communication is non-verbal. Your words say one thing, but your body tells the real story. In business, we pretend we can build trust purely through words and policies. But your team's nervous system is reading your body: Are you tense? Are you breathing? Is your posture open or closed? These signals determine trust more than your words ever will.",
      
      "The Grip-Switch drill translates directly to leadership. Think about a difficult conversation—maybe giving critical feedback or having a disagreement. Most leaders come in too 'tight' (defensive, controlling, rigid) or too 'loose' (avoiding conflict, being vague, not holding boundaries). The skill is calibration: firm enough to be clear, soft enough to stay connected.",
      
      "At Just Eat Takeaway, I had a manager who was struggling. Her team was missing deadlines and she wasn't addressing it. In our 1-on-1, I could have gone 'tight grip'—This is unacceptable, here's what you must do, we need this fixed immediately. That would have triggered defense and compliance, not growth.",
      
      "Instead, I used 'Grip-Switch' energy: I was clear about the problem (firm grip) but curious about her perspective (light grip). 'Your team's missed three deadlines this month. I need to understand what's happening from your view. Walk me through it.' That calibration—clarity + curiosity—created space for her to be honest. She admitted she didn't know how to have tough conversations with her reports. We focused there, not on the symptoms.",
      
      "The physical practice is literal: Find a training partner. Do the Grip-Switch drill. Notice what happens when you grip too tight (you exhaust yourself and your partner resists). Notice what happens when you're too loose (you lose connection and influence). Find the calibration where you maintain connection while staying sensitive to feedback. That feeling is what vulnerability-based trust feels like in your body.",
      
      "After you've done the physical drill, translate it to your next difficult conversation. Before you speak, ask yourself: 'Am I gripping too tight here (being too controlling/rigid) or too loose (being too vague/passive)?' The Grip-Switch is about power with, not power over. You maintain your clarity AND your connection.",
      
      "Brené Brown's research on vulnerability emphasizes that 'vulnerability without boundaries is not vulnerability.' The Grip-Switch embodies this: you're engaged (vulnerable) but you're also maintaining your structure (boundaries). You're not collapsing into the other person or dominating them. You're calibrating in real-time.",
      
      "In the next lesson, we'll tackle one of the hardest vulnerability moments: admitting mistakes without losing authority. For now, find a colleague and do the physical Grip-Switch drill. 60 seconds each side. Notice what you learn about calibration. That physical intelligence transfers directly to your leadership conversations—if you let it."
    ],
    learningObjective: "You will learn how embodied trust practices (like the Grip-Switch drill) develop the physical intelligence to calibrate between firmness and connection in difficult conversations.",
    duration: "6-8 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Admitting Mistakes Without Losing Authority",
    content: [
      "Every leader has the same fear: 'If I admit I was wrong, my team will lose confidence in me.' So they double down on bad decisions, defend the indefensible, and spin failures as learning opportunities without acknowledging the failure. This destroys trust faster than the original mistake ever could.",
      
      "Research from organizational psychology shows the opposite of what leaders fear. A study of 2,000+ teams found that leaders who openly acknowledge mistakes are rated 12% higher in competence and 23% higher in trustworthiness by their teams. Why? Because mistake admission signals three things: self-awareness (you see reality), accountability (you own your impact), and confidence (you're secure enough to be honest).",
      
      "Ray Dalio at Bridgewater created a culture where logging your mistakes is mandatory. The 'Issue Log' captures every error, every near-miss, every bad judgment. Not to punish people—to learn systemically. Dalio himself shares his mistakes publicly: 'I was wrong about X. Here's how I misjudged it. Here's what I'm changing.' That modeling created the world's largest hedge fund ($140B+ AUM) by making mistakes safe to acknowledge and learn from.",
      
      "At Pixar, Ed Catmull writes in 'Creativity Inc.' that every Pixar movie starts out terrible. Finding Nemo: terrible. Toy Story: terrible. Inside Out: terrible. The difference between Pixar and failed studios isn't that Pixar makes fewer mistakes—it's that they acknowledge them faster. They don't pretend the first cut is good. They say 'This sucks. Here's why. How do we fix it?' That candor enables the iteration that produces excellence.",
      
      "Here's the framework for admitting mistakes without losing authority: (1) Acknowledge specifically what you got wrong. (2) Own the impact without defending yourself. (3) State what you're learning. (4) Share what you're changing. (5) Ask for input on your plan. This sequence maintains authority because you're demonstrating agency—you're not a victim, you're a learner taking action.",
      
      "Bad mistake admission: 'Guys, I think maybe that decision didn't work out as planned. Market conditions were tough. But we did our best.' This is weak. It's hedged ('I think maybe'), deflects blame ('market conditions'), and doesn't own impact ('didn't work out'). Your team hears: 'You're not safe with uncertainty here.'",
      
      "Good mistake admission: 'I made a bad call on the vendor selection. I prioritized cost over reliability and that decision cost us three weeks of delays and customer frustration. I misjudged the risk. Going forward, I'm changing my eval criteria to weight operational risk higher. What am I still missing in how I think about this?' This is strong. Specific error, clear impact, stated learning, defined change, invited input. Your team hears: 'Reality matters more than ego here.'",
      
      "At Just Eat Takeaway, I made a significant mistake: I pushed for a dispatcher tool rollout before it was ready because I was feeling pressure from leadership. The tool crashed on day one. 500 drivers couldn't get their routes. Chaos. I could have blamed engineering ('they said it was ready') or minimized it ('just some bugs'). Instead, I sent an all-hands:",
      
      "'I made the call to launch the dispatch tool yesterday despite red flags from QA. That was pressure-driven decision-making, not data-driven. The result: 500 drivers impacted, 4 hours of chaos, and lost trust in our tools. I own that. I'm implementing a launch readiness checklist that requires 3 signoffs including QA. And I'm committing to slowing down when I feel pressure to rush. I'd value input on what else should change in how we make go/no-go decisions.'",
      
      "What happened? The team rallied. Engineering appreciated being defended (I didn't throw them under the bus). Operations trusted me more because I'd been honest. Within 2 days we had a better launch process and the team felt psychologically safer. The mistake cost money. The admission built culture.",
      
      "In Brazilian Jiu Jitsu, 'tapping' (admitting defeat) is how you stay safe and keep learning. If you refuse to tap because of ego, you get injured. Your training partner has to hurt you to get you to respect the position. But if you tap early and ask 'how did you get that?'—you learn the technique. Then you can defend it. The tap isn't weakness—it's the mechanism of growth.",
      
      "Leadership is the same. Refusing to acknowledge mistakes doesn't make you look strong—it makes you look fragile. Leaders with fragile egos can't admit error. Leaders with strong egos say 'I was wrong' and move to 'here's what's next.' Strength is demonstrated by how you handle being wrong, not by avoiding being wrong.",
      
      "Next lesson: Asking for help without looking weak. But first, identify one mistake you made in the past month that you haven't fully owned. Write out the five-part admission (specific error, impact, learning, change, input request). Practice saying it out loud. Notice the resistance. That resistance is ego protecting itself. Your job is to override it in service of your team's trust."
    ],
    learningObjective: "You will learn the five-part framework for admitting mistakes that maintains authority while building trust (acknowledge, own impact, state learning, share changes, request input).",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Asking for Help: Strength, Not Weakness",
    content: [
      "High-achievers are the worst at asking for help. They built their careers on being the person with answers, the one who figures it out, the reliable expert. Asking for help feels like admitting incompetence. So they struggle alone, burn out slowly, and make preventable mistakes because they wouldn't ask the person next to them who already knew the solution.",
      
      "Research from Paul J. Zak's neuroscience work shows that asking for help triggers oxytocin release in both parties—the person asking AND the person helping. Why? Because requests for help signal trust ('I trust you have expertise') and create connection ('we're solving this together'). Teams where help-seeking is common have 32% higher performance and 27% better knowledge transfer than teams where everyone pretends they have all the answers.",
      
      "Adam Grant's research in 'Give and Take' found that 'successful givers' (people who help others AND achieve their own goals) are strategic about asking for help. They ask specific questions to specific people at specific times. They make it easy for others to help. And they close the loop by sharing what impact the help had. This creates reciprocity networks that multiply everyone's capacity.",
      
      "Here's why leaders don't ask for help: (1) Status threat—'If I ask, I'll look incompetent.' (2) Reciprocity debt—'If I ask, I'll owe them.' (3) Autonomy preservation—'I should be able to figure this out myself.' (4) Time perception—'It's faster to do it myself than explain what I need.' All four of these are cognitive distortions that tank performance.",
      
      "Reality check: (1) Asking good questions makes you look smart, not stupid. (2) Reciprocity creates relationships, not debt. (3) Autonomy means choosing when to ask for help, not never asking. (4) 10 minutes of asking saves 10 hours of struggling. Leaders who don't ask for help aren't strong—they're stuck.",
      
      "The framework for asking for help effectively: (1) Be specific about what you need. (2) Explain why you're asking this person. (3) Make it easy for them to say yes or no. (4) Close the loop on impact. This sequence respects the other person's time and expertise while making your request clear.",
      
      "Bad help request: 'Hey, do you have time to help me with something?' This is vague (what?), time-indefinite (how long?), and puts pressure on them (hard to say no without seeming unhelpful). Most people will say yes out of obligation and resent the time.",
      
      "Good help request: 'I'm trying to decide between vendor A and B for our logistics platform. You've implemented similar systems. Could I get 15 minutes of your time this week to ask you 3 specific questions about your vendor selection criteria? If you're slammed, I totally understand.' This is specific, time-bound, expertise-targeted, and easy to decline. If they say yes, they're genuinely available.",
      
      "At Just Eat Takeaway, I was struggling with a strategic decision about territory expansion. I'd been spinning on it for two weeks, running scenarios, building models, going in circles. Finally, I reached out to a peer in another division: 'I'm stuck on expansion prioritization. You did this 6 months ago. Could I buy you coffee and ask how you approached the decision framework? 30 minutes max.' He said yes, shared his framework, I adapted it, made the decision within 2 days. Two weeks of struggle solved by 30 minutes of asking.",
      
      "The transformation wasn't just solving that problem—it was rewiring my identity. I realized I'd been carrying 'I should know this' as a badge of honor. But 'I should know this' was keeping me stupid. The real badge of honor is 'I'm resourceful'—which means knowing when to ask for help, who to ask, and how to ask effectively.",
      
      "In Brazilian Jiu Jitsu, after you get submitted, the standard practice is to ask: 'How did you get that?' or 'What did I do wrong?' This isn't optional for people who want to improve—it's the mechanism of learning. Your training partner just exposed a gap in your game. They have the information you need. Asking is how you close the gap.",
      
      "The people who progress fastest in BJJ are the ones who ask the most questions. 'Why did you choose that grip?' 'How did you see that opening?' 'What should I have done differently?' They extract maximum learning from every round. The people who progress slowly are the ones who tap, reset, and repeat the same mistakes without asking. Pride costs them years.",
      
      "Leadership is identical. The leaders who scale fastest are relentless help-seekers. They build networks of expertise they can tap into. They make it easy for people to help them. They close loops and create reciprocity. The leaders who plateau are the ones who white-knuckle problems alone because asking feels like weakness.",
      
      "Jocko Willink, Navy SEAL commander, says: 'The most important conversations I had as a commander were the ones where I said: I don't know. Help me think through this.' Not because he was incompetent—because he valued collective intelligence over individual ego. That's strength.",
      
      "Next lesson: White Belt Integration—we'll tie everything together and assess your foundation. But first, ask for help on something real this week. Use the framework: specific need, targeted person, time-bound, easy to decline. Then notice: Did it make you look weak? Or did it make you look like a leader who values learning over ego? The data will tell you vulnerability is strength."
    ],
    learningObjective: "You will learn why asking for help signals strength not weakness and master the four-part framework (specific need, targeted person, time-bound, easy decline) for effective help requests.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "White Belt Integration: Your Foundation Check",
    content: [
      "You've completed White Belt. This isn't just the end of Stripe 4—it's the foundation of everything else you'll build. Before we move to Blue Belt (conflict and communication), we need to check the foundation. If it's solid, you'll accelerate. If it's shaky, you'll struggle. This lesson is your integration checkpoint.",
      
      "Let's review what you've learned across the four stripes. Stripe 1: Trust Foundations—you understand the difference between predictability trust and vulnerability trust. You know that absence of trust is the root dysfunction. You've committed to being the person who 'taps first' and creates safety for others. Stripe 2: Psychological Safety—you've learned Google's research, Amy Edmondson's five leader behaviors, and how to respond to problems with curiosity not blame.",
      
      "Stripe 3: Self-Leadership—you've established that you can't give what you don't have. You've learned emotional regulation techniques (box breathing, 6-second pause, name it to tame it, grounding). You've assessed your baseline across five dimensions. You've practiced the base position and understand that physical stability enables mental clarity. Stripe 4: Vulnerability in Action—you've learned the Grip-Switch calibration, how to admit mistakes without losing authority, and how to ask for help effectively.",
      
      "These aren't separate lessons—they're an integrated system. Trust enables psychological safety. Psychological safety enables learning from mistakes. Learning from mistakes requires self-regulation. Self-regulation depends on physical grounding. Physical grounding supports vulnerability. Vulnerability deepens trust. It's a cycle, not a checklist.",
      
      "Here's your White Belt Integration Assessment. Answer honestly—this is for you, not for a grade. (1) Trust: Do you have at least one relationship where you can be fully vulnerable without fear? (2) Safety: Have you created space for your team to report mistakes early? (3) Self-Leadership: Do you have daily practices for physical, mental, and emotional grounding? (4) Vulnerability: Have you publicly admitted a mistake and asked for help in the past month?",
      
      "If you answered yes to 3-4: Your foundation is solid. Blue Belt will build naturally on this base. If you answered yes to 1-2: You have work to do. Don't move forward until you've practiced the fundamentals more. If you answered yes to 0: You skipped the training. Go back to Stripe 1 and actually do the exercises, not just read about them.",
      
      "The most common mistake at this stage: intellectual understanding without embodied practice. You 'know' vulnerability builds trust, but you haven't actually been vulnerable. You 'know' box breathing regulates the nervous system, but you've never used it when triggered. You 'know' the five-part mistake admission framework, but you haven't admitted a real mistake yet. Knowing ≠ doing. White Belt is about doing.",
      
      "At Just Eat Takeaway, I had a director who was brilliant strategically but struggled with teams. I asked him to do White Belt training. He completed it in a week, came back saying 'I get it. Trust, safety, vulnerability. Got it.' But nothing in his behavior changed. Two months later, I asked his team how things were. Same problems. Why? Because he'd intellectualized the content without practicing it. He knew the words but hadn't developed the skills.",
      
      "I gave him a challenge: 'For the next month, I want you to practice one vulnerability action per week. Week 1: Admit a mistake publicly. Week 2: Ask someone for help. Week 3: Share something you're uncertain about. Week 4: Give your team permission to challenge your ideas, and thank the first person who does.' He resisted ('I already know this stuff') but agreed. By week 3, his team reported a shift. By month 3, they were performing differently. The content was the same—but now it was embodied.",
      

      "In Brazilian Jiu Jitsu, a white belt who 'knows all the moves' but hasn't drilled them 1,000 times is functionally useless in a live roll. Knowledge doesn't beat resistance—skills do. And skills come from repetition under pressure. You build skills by showing up consistently, practicing the basics, getting corrected by higher belts, and accumulating mat time. There are no shortcuts.",
      
      "Your White Belt isn't metaphorical—it's real. You're at the beginning of a leadership development journey that will take years. White Belt is your foundation. Most people rush through it to get to 'advanced' techniques. But the highest-level practitioners will tell you: mastery is white belt fundamentals done at black belt speed. The basics never stop mattering.",
      
      "Here's what you should be able to do consistently by the end of White Belt: (1) Name your current emotional state and regulate it within 60 seconds. (2) Admit mistakes specifically without defending or minimizing. (3) Ask for help from appropriate people on real problems. (4) Create space for others to be vulnerable by modeling it first. If you can't do all four, you're not done with White Belt.",
      
      "The physical integration: Combine everything you've learned into one drill. With a training partner, do the Grip-Switch while having a difficult conversation. Example: 'I need to tell you that I made a mistake on Project X' (vulnerability) while maintaining physical base (regulation) and calibrating your grip (connection + clarity). This integrates the cognitive and somatic learning. If you can do this—stay grounded, be vulnerable, maintain connection—you've earned your White Belt.",
      
      "Next belt: Blue Belt focuses on conflict and communication. You'll learn why conflict avoidance kills teams, how to engage in productive debate, and how to build team rhythm. But Blue Belt will only work if White Belt is solid. You can't have healthy conflict without trust. You can't communicate effectively without self-regulation. You can't build team rhythm without vulnerability. White Belt is prerequisite for everything else.",
      
      "Before you move forward, do this: Share your White Belt Integration Assessment with someone who knows your leadership (a peer, your boss, a coach). Ask them: 'Based on what you've observed in how I lead, do you think my foundation is solid?' Their answer matters more than yours. Leadership isn't what you intend—it's what your team experiences. Get the feedback. Integrate it. Then move forward with eyes open about where you actually are, not where you wish you were."
    ],
    learningObjective: "You will integrate all White Belt learnings (trust, safety, self-leadership, vulnerability) and assess whether your foundation is solid enough to build Blue Belt skills on top of it.",
    duration: "8-10 minutes",
    xpReward: 10
  }
];

export const stripe4Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You're giving feedback to a team member who's defensive. You feel yourself getting frustrated and 'gripping tight'—becoming more direct and forceful. The conversation is escalating. What does the Grip-Switch principle tell you to do?",
    options: [
      "Maintain your firmness—they need to hear the feedback clearly",
      "Soften completely—back off and reschedule when emotions aren't high",
      "Calibrate: maintain your clarity about the issue but soften your delivery and add curiosity",
      "Match their energy—if they're getting defensive, you need to be more forceful to break through"
    ],
    correctAnswer: 2,
    explanation: "Option C embodies Grip-Switch: you calibrate between firmness (clarity) and softness (connection). When your partner in the drill 'resists' (pulls away), you don't grip tighter (Option A) or let go completely (Option B)—you adjust pressure while maintaining connection. Option D (matching their energy) creates an escalation spiral. Strozzi Institute research shows effective leadership is 'power with' not 'power over.' The Grip-Switch teaches you to stay connected while being clear. Brené Brown: 'Vulnerability without boundaries isn't vulnerability.' Your boundaries are your clarity about the issue. Your vulnerability is your willingness to stay in dialogue. Calibrate both.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You made a strategic decision 3 months ago that's now clearly failing. It's costing money and team morale. You're in a leadership meeting where you need to pivot. How do you open the conversation using the five-part mistake admission framework?",
    options: [
      "'The market shifted and our previous approach isn't working. Here's the new plan.'",
      "'I pushed for Strategy A 3 months ago. It's failing—costing us €50K and team frustration. I misjudged the customer adoption curve. I'm proposing Strategy B with these specific changes. What am I missing?'",
      "'As a team, we decided on Strategy A. It hasn't worked out as planned. Let's discuss alternatives.'",
      "'I want to acknowledge that Strategy A was my call and it's not working. I take full responsibility. Here's what we're doing next.'"
    ],
    correctAnswer: 1,
    explanation: "Option B hits all five parts: (1) Specific error: 'I pushed for Strategy A,' (2) Impact owned: 'costing €50K and team frustration,' (3) Learning stated: 'misjudged adoption curve,' (4) Change shared: 'proposing Strategy B with specific changes,' (5) Input requested: 'What am I missing?' This maintains authority through agency—you're acting, not wallowing. Option A deflects to market (no ownership). Option C diffuses responsibility ('as a team'). Option D has ownership but no learning or input request. Research shows leaders who admit mistakes this way are rated 23% higher in trustworthiness. The formula works because it's honest about the past AND clear about the future.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You're struggling with a technical architecture decision. Your lead engineer Alex has deep expertise here. You want to ask for help but you're worried about looking indecisive to your team. What's the effective help request?",
    options: [
      "'Alex, can you just make the architecture decision? You know this better than me.'",
      "'Alex, I need help thinking through the DB architecture. You've built similar systems. Could I get 30 minutes this week to walk through my thinking and get your input on tradeoffs? If you're slammed, no worries.'",
      "'Alex, I'm not sure about the architecture. Thoughts?'",
      "Don't ask—research it yourself to maintain authority"
    ],
    correctAnswer: 1,
    explanation: "Option B uses the effective help framework: (1) Specific need: 'DB architecture decision,' (2) Why this person: 'You've built similar systems,' (3) Time-bound: '30 minutes this week,' (4) Easy to decline: 'If you're slammed, no worries.' This makes you look resourceful, not weak. Paul Zak's research: asking for help triggers oxytocin in both parties—it builds connection. Option A abdicates (not leading). Option C is too vague. Option D is the high-achiever trap that keeps you stuck. Leaders who ask for help effectively are rated 12% higher in competence because they demonstrate intellectual humility and efficient learning. You're not asking Alex to do your job—you're leveraging his expertise to make a better decision.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're doing your White Belt Integration Assessment. You scored: Trust (yes), Safety (yes), Self-Leadership (no—you haven't established daily practices), Vulnerability (no—you haven't publicly admitted a mistake or asked for help recently). What should you do?",
    options: [
      "Move to Blue Belt anyway—you got 50% which is passing",
      "Go back and establish daily self-leadership practices AND practice one public vulnerability action before moving forward",
      "Just read Blue Belt content—you'll get the self-leadership stuff later when you have more time",
      "Focus only on self-leadership (your lowest score) and then move forward"
    ],
    correctAnswer: 1,
    explanation: "Option B addresses both gaps before moving forward. White Belt is foundational—if it's weak, Blue Belt will fail. You can't engage in healthy conflict (Blue Belt content) without self-regulation (self-leadership) or the ability to be vulnerable. Research shows 75% of leadership derailment traces to self-regulation issues. Option A is the 'fake it' approach that leads to eventual failure. Option C treats this like content consumption, not skill development. Option D only fixes one gap when you have two. The integration lesson: these aren't independent skills—they're a system. Your self-leadership enables your vulnerability. Your vulnerability enables trust. Your trust enables the conflict skills you'll learn next. Fix the foundation before building the next floor.",
    xpReward: 10
  }
];

export const stripe4Content = {
  lessons: stripe4Lessons,
  checkpoints: stripe4Checkpoints
};

