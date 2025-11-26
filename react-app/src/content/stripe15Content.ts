/**
 * BROWN BELT - STRIPE 15: INFLUENCE WITHOUT AUTHORITY
 * Theme: Leading when you don't have formal power
 * Focus: Leading from anywhere, presence/physics of leadership, building credibility under pressure
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

export const stripe15Lessons: Lesson[] = [
  {
    id: 1,
    title: "Leading from Anywhere",
    content: [
      "You're not the CEO. You don't have direct reports. You can't fire anyone. And yet—when you speak, people listen. When you propose something, people follow. When problems arise, people look to you. This is influence without authority. It's the most important leadership skill because most leadership happens without formal power. You influence peers, you influence other teams, you influence upward. Title gives you positional authority. Influence gives you actual power.",
      
      "Research from Harvard Business School studying 'informal leadership' found that in high-performing organizations, 70% of critical decisions and coordination happen through informal networks, not formal hierarchy. The people who move these organizations forward aren't necessarily the highest-ranking—they're the most trusted, most credible, most connected. Formal authority opens doors. Informal influence opens minds. The first gives you meetings. The second gives you impact.",
      
      "The four sources of influence without authority: (1) Expertise—you know things others need. (2) Credibility—you deliver on commitments consistently. (3) Relationships—you've invested in connections across the organization. (4) Value creation—you solve problems that matter to others. These four compound. Expertise gets you in the room. Credibility makes people trust your expertise. Relationships amplify your reach. Value creation makes people want to work with you. Combined, they create influence that transcends org charts.",
      
      "At Just Eat Takeaway, I had a peer (same level, different function) who consistently influenced across the organization despite having zero formal authority over other functions. How? (1) Expertise—she deeply understood operations, product, and tech. When she spoke about cross-functional issues, she wasn't guessing. (2) Credibility—when she committed to something, it happened. No flaking, no excuses. (3) Relationships—she'd invested time building genuine connections with leaders across functions. (4) Value creation—when she proposed something, it usually solved multiple teams' problems simultaneously. Result: Her proposals moved forward faster than VP-level proposals lacking these four elements.",
      
      "The difference between positional authority and earned influence: Authority says 'do this because I'm your boss.' Influence says 'do this because it's the right move and here's why.' Authority creates compliance (people do the minimum). Influence creates commitment (people invest energy because they believe). Authority works within your team. Influence works across teams, up the chain, and outside your formal control. Authority ends when you leave the role. Influence persists because it's built on reputation, not title.",
      
      "The mistake most people make: They wait for the title before trying to lead. 'Once I'm a manager, THEN I'll start leading.' Backwards. You get the title by demonstrating leadership without it. Organizations promote people who are already leading informally. If you wait for authority to start leading, you'll never get authority because you haven't proven you can lead without it. Start leading now, from wherever you are. Prove influence first. Title follows.",
      
      "The practice: Identify one problem that affects multiple teams but no one owns. Research it. Develop a proposal that solves it. Build coalition by talking to stakeholders individually before any formal meeting (this is where real decisions happen). Present it not as 'my idea' but as 'what I heard from talking to you all.' Give credit away liberally. Make it easy for people to say yes by anticipating objections and addressing them upfront. This is influence in action—no one told you to do this, you have no authority over the teams involved, but you're moving the organization forward through credible problem-solving and relationship leverage.",
      
      "In Brazilian Jiu Jitsu, size and strength (positional authority) matter—but technique (influence) matters more. A skilled 150-pound practitioner beats an unskilled 220-pound opponent by using leverage, timing, and positioning. They can't overpower their opponent, so they influence the opponent's movement, create openings, and exploit them. This is what influence looks like: using skill and positioning to achieve outcomes you can't force through power alone.",
      
      "The long game: Building influence without authority takes time. You can't rush credibility—it's earned through repeated delivery. You can't buy relationships—they require genuine investment in others. You can't fake expertise—people know when you're bullshitting. But once established, influence compounds. Each successful collaboration builds your reputation. Each kept commitment strengthens your credibility. Each relationship connects you to new networks. After 18-24 months of consistent practice, you'll find you have more influence than people two levels above you who rely solely on positional authority.",
      
      "Next lesson: Presence—The Physics of Leadership. We'll explore how your physical and energetic presence affects how people respond to you and how to cultivate presence intentionally. But first, start building influence. Pick one cross-functional problem. Research it. Talk to stakeholders. Develop a proposal. Build coalition. Present it. This is leadership without waiting for permission. You don't need a title to see what needs fixing and mobilize people to fix it. That's influence. And it's available to you right now, regardless of your position."
    ],
    learningObjective: "You will learn the four sources of influence without authority (expertise, credibility, relationships, value creation) and why 70% of critical decisions happen through informal networks, not formal hierarchy.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Presence: The Physics of Leadership",
    content: [
      "Two people walk into a room. Same credentials, same title, same words. But when Person A speaks, the room leans in. When Person B speaks, people check their phones. What's the difference? Presence. It's not charisma (though that helps). It's not volume (quiet people can have massive presence). It's the quality of being fully inhabiting the moment, grounded in your body, clear in your intention. Presence is the physics of leadership—and like physics, it follows laws you can learn.",
      
      "Research from the Strozzi Institute on embodied leadership shows that presence has three components: (1) Somatic—your body is aligned, grounded, and breathing fully. (2) Cognitive—your attention is focused, not scattered. (3) Intentional—you're clear on why you're here and what matters. When all three align, people feel it. When any one is missing, your presence degrades. Most leaders operate with scattered attention (checking Slack mentally during meetings), collapsed posture (hunched over laptops), and unclear intention ('I guess we should discuss this'). That combination produces no presence.",
      
      "The physics of centered presence: Stand with feet shoulder-width apart, weight evenly distributed, knees slightly unlocked, spine neutral (not rigid), shoulders back and down, chest open, head balanced over spine. Breathe low and slow—belly rising on inhale, falling on exhale. Eyes focused but soft. Now speak. Notice how your voice sounds different—fuller, more resonant. Notice how you feel different—grounded, calm, clear. This isn't performance. This is your natural state when not collapsed by stress and screen-time. This is presence.",
      
      "At Just Eat Takeaway during a crisis (major system outage affecting thousands of orders), I watched two leaders respond. Leader A: hunched forward, speaking fast, gesturing frantically, voice pitched high. The team's anxiety spiked. Leader B: stood grounded, spoke slowly and clearly, maintained eye contact, breathed visibly. The team calmed. Same crisis. Different presence. Different outcomes. Your nervous system broadcasts to the room. If you're dysregulated, the room dysregulates. If you're grounded, the room grounds. This isn't magic—it's mirror neurons and nervous system attunement.",
      
      "The three enemies of presence: (1) Digital distraction—your attention is fragmented across devices and mental tabs. (2) Physical collapse—your posture is compressed from hours at screens. (3) Unclear intention—you're in the meeting but don't know why or what matters. These three create the default modern leader: scattered, collapsed, and purposeless. No amount of content knowledge compensates for absence of presence. People don't follow absent leaders. They follow present ones.",
      
      "The practice: Before any important interaction (presentation, difficult conversation, key meeting), take 60 seconds to establish presence. Stand or sit with aligned posture. Close eyes. Take 5 deep belly breaths. Ask yourself: 'What's my intention here? What does this room need from me?' Feel your feet on the floor. Then open eyes and enter. This 60-second reset moves you from scattered/collapsed/unclear to present/grounded/intentional. The difference is palpable to everyone in the room.",
      
      "The advanced technique: Presence under pressure. Anyone can be present when calm. Leaders must be present when chaos erupts. The practice: When you feel stress spike (heart rate up, thoughts racing, breath shallow), that's your signal. Don't fight it—use it. (1) Acknowledge: 'I'm activated.' (2) Ground: Feel your feet, press them into the floor. (3) Breathe: One deep exhale, releasing tension. (4) Refocus: 'What's needed now?' This four-step takes 10 seconds and returns you to presence. The more you practice when stakes are low, the more available it is when stakes are high.",
      
      "In Brazilian Jiu Jitsu, presence is called 'being heavy.' It's not about body weight—it's about energy distribution and connection to the ground. A grounded 150-pound person feels heavier than a tense 200-pound person. Why? The grounded person's energy is settled, their weight is organized through their structure, their intention is clear. The tense person's energy is scattered, their weight is disorganized, their intention is murky. 'Being heavy' in BJJ is identical to presence in leadership: organized energy, grounded structure, clear intention.",
      
      "The mistake most leaders make: They think presence is something you have or don't have (innate). It's not. Presence is a practice. Like physical fitness, it requires training. You don't wake up with presence—you cultivate it through deliberate practice. 60 seconds before meetings. Daily breathing practice. Weekly check-ins on posture and energy. Monthly assessment: 'Am I more present this month than last?' The leaders with the most presence aren't naturally gifted—they've just practiced longer.",
      
      "Next lesson: Building Credibility Under Pressure—how to build and maintain trust when stakes are high and everyone's watching. But first, practice presence. Tomorrow, before three important interactions, take 60 seconds: aligned posture, five breaths, clear intention. Notice how you feel. Notice how others respond. The difference won't be in your words—it'll be in your presence. And presence creates influence that words alone never can."
    ],
    learningObjective: "You will learn the three components of presence (somatic, cognitive, intentional) and how 60 seconds of grounding practice transforms how others respond to your leadership through embodied physics.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Building Credibility Under Pressure",
    content: [
      "Your team is facing a crisis. Customers are angry. Leadership is demanding answers. Everyone's looking at you. This is the moment where credibility is either built or destroyed. Not in calm times (everyone looks good when things are easy), but in chaos. Credibility under pressure is the currency of leadership. It's earned slowly and lost quickly. This lesson teaches you how to build it systematically.",
      
      "Research from the Center for Creative Leadership studying executive derailment found that 75% of failed leaders had the right technical skills but cracked under pressure. They became defensive, blamed others, made rash decisions, or froze. The 25% who succeeded under pressure all demonstrated: (1) Emotional regulation (stayed calm), (2) Transparent communication (acknowledged reality), (3) Clear action (moved from problem to solution quickly), (4) Accountability (owned outcomes). These four behaviors under pressure build credibility faster than years of calm competence.",
      
      "The credibility formula under pressure: Acknowledge reality + Own your part + State the plan + Invite input + Execute visibly. Example: 'We have a problem. [Reality] 500 orders are delayed because our dispatch system failed. [Own] I pushed for deployment without adequate testing. That's on me. [Plan] Here's what we're doing: immediate rollback, manual routing for next 4 hours, root cause analysis by tomorrow. [Input] What am I missing? What else do we need? [Execute] I'll update everyone in 2 hours with progress.' This five-part response to crisis builds credibility because it's honest, accountable, and action-oriented.",
      
      "The mistake most leaders make under pressure: They try to project confidence by minimizing the problem or knowing answers they don't know. 'It's not that bad.' 'We have it under control.' 'Everything will be fine.' This destroys credibility because (1) people see through fake confidence, (2) when reality doesn't match your projection, you lose trust. Better: 'This is serious. I don't have all answers yet. Here's what I know, what I don't know, and how we'll figure it out.' Honest uncertainty builds trust. False certainty destroys it.",
      
      "At Just Eat Takeaway, we had a data breach. Customer information potentially exposed. Legal required notification. PR was panicking. Engineers were investigating. I had two choices: Wait until we knew everything (appear in control) or communicate immediately with what we knew (appear vulnerable). I chose vulnerability: Sent company-wide update within 2 hours: 'We have a potential breach. We're investigating scope. We don't know impact yet. Here's what we're doing: forensics team engaged, customers will be notified per GDPR, I'll update every 4 hours regardless of new info.' Team later told me: That honesty in uncertainty built more trust than any polished communication would have.",
      
      "The three credibility accelerators under pressure: (1) Speed—communicate fast even if information is incomplete. Silence creates anxiety. Fast, partial information ('here's what we know') beats slow, complete information every time. (2) Consistency—do what you said you'd do. If you said 'update in 2 hours,' update in 2 hours even if there's no news ('Still investigating, next update at 4pm'). Kept commitments build trust. (3) Visibility—be present where the problem is. If there's a customer crisis, be in the customer service center. If there's a production issue, be with engineering. Physical presence signals: this matters, I'm accountable, we'll solve this together.",
      
      "The credibility destroyer: Throwing people under the bus under pressure. 'Engineering screwed up.' 'Product gave us bad requirements.' 'Sales oversold.' This destroys your credibility (you look like someone who blames instead of leads) and destroys psychological safety (everyone learns: when pressure hits, leadership looks for scapegoats). The alternative from Extreme Ownership: 'I'm accountable. Here's what I'm changing.' This builds credibility (you own outcomes) and safety (mistakes won't be used for blame).",
      
      "In Brazilian Jiu Jitsu, you build reputation through how you handle bad positions. Everyone looks good when they're dominating from mount. Your character is revealed when you're getting crushed in bottom side control. Do you panic, thrash, and blame the position? Or do you stay calm, breathe, work your defense patiently? The practitioners who build respect are the ones who handle adversity with composure. Same in business. Your credibility isn't built when you're winning—it's built when you're losing and people watch how you respond.",
      
      "The long-term compounding: Each pressure situation where you demonstrate the four behaviors (emotional regulation, transparent communication, clear action, accountability) adds to your credibility bank. After 10 crises handled well, people trust you'll handle #11 well. You've proven your pattern. This trust becomes predictive: 'If something goes wrong, I trust [your name] to handle it.' That trust is the foundation of influence. People follow leaders they trust under pressure, not leaders who only perform when conditions are perfect.",
      
      "Next lesson: The Executive Presence Lab—we'll synthesize everything about influence and presence into a practical framework for showing up as a leader regardless of your title. But first, prepare for pressure. You WILL face a crisis. When it comes, use the five-part credibility formula: Acknowledge reality, Own your part, State the plan, Invite input, Execute visibly. Don't wait to feel confident. Confidence comes from action, not the other way around. Act with integrity under pressure, and credibility follows."
    ],
    learningObjective: "You will learn the five-part credibility formula for crisis response (acknowledge, own, plan, invite, execute) and why 75% of leadership failures happen under pressure despite technical competence.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "The Executive Presence Lab",
    content: [
      "Executive presence. Everyone talks about it. Few can define it. It's the combination of gravitas (you're taken seriously), communication (you articulate clearly), and appearance (you look the part). But those definitions are vague. This lesson makes it concrete through the Executive Presence Lab—a systematic framework for developing and demonstrating leadership presence regardless of your title or experience level.",
      
      "Research from the Center for Talent Innovation studying 4,000+ professionals found that executive presence accounts for 26% of what it takes to get promoted, yet only 5% of professionals receive feedback on how to improve it. Why? Because most people can't articulate what it is. They just know it when they see it. This lesson reverse-engineers presence into trainable components: (1) How you show up physically, (2) How you communicate, (3) How you handle challenges, (4) How you make others feel. Master these four, and you have presence.",
      
      "Component 1: Physical Showing Up. This isn't about expensive suits or perfect hair. It's about: (a) Posture—aligned, grounded, open (not collapsed or rigid). (b) Energy—alert but calm (not frenetic or lethargic). (c) Eye contact—steady and warm (not darting or staring). (d) Voice—resonant and paced (not squeaky or rushed). (e) Movement—purposeful (not fidgety or frozen). Each element is trainable. Record yourself on video. Watch with sound off. What does your body communicate? Confidence? Anxiety? Boredom? Your body tells the truth your mind edits. Train the body first—words follow.",
      
      "Component 2: Communication Clarity. Executives don't ramble. They: (a) Start with the headline ('Here's what I recommend...'), (b) Provide 3 supporting points (not 10), (c) Acknowledge counterarguments ('Some will say X, but here's why Y...'), (d) Close with clear ask ('I need your decision on A and support on B'). This structure—Headline, 3 Points, Address Objections, Clear Ask—works for emails, presentations, and conversations. Practice it until it's automatic. Clarity is respect for others' time. Rambling is disrespect disguised as thoroughness.",
      
      "Component 3: Challenge Response. Presence is tested when challenged. Someone questions your judgment in a meeting. Do you: (a) Get defensive ('You don't understand...'), (b) Steamroll ('I've already considered that...'), (c) Collapse ('Maybe you're right...'), or (d) Engage ('That's a fair concern. Here's my thinking. What am I missing?'). Option D is presence. You're secure enough to engage critique without defensiveness. You're curious, not combative. This creates psychological safety (people feel heard) while maintaining your position (you're not collapsing). The formula: Acknowledge, Engage, Inquire.",
      
      "Component 4: How You Make Others Feel. Maya Angelou: 'People forget what you said, forget what you did, but never forget how you made them feel.' Leaders with presence make people feel: (a) Seen—you notice them, remember details, make eye contact. (b) Heard—you listen fully, not just wait to speak. (c) Valued—you appreciate their contributions explicitly. (d) Confident—your calm presence makes them feel situations are manageable. This isn't manipulation—it's intentional positive impact. You're creating an environment where people can do their best work.",
      
      "At Just Eat Takeaway, I watched our CEO in action. Physical: Always aligned posture, even in 12-hour days. Moved purposefully, never rushed. Communication: Every response started with headline. Complex topics explained in 3 points max. Challenge Response: When questioned, he'd pause (vs. immediate defense), then 'Help me understand your concern' (engage vs. dismiss). Impact: People left conversations with him feeling energized, not drained. That's presence. Not title, not charisma—systematic practice of the four components.",
      
      "The development plan: (1) Record yourself in 3 different contexts (presentation, meeting, 1-on-1). (2) Score each component 1-10 (Physical, Communication, Challenge Response, Impact on Others). (3) Identify lowest score—that's your focus for next 60 days. (4) Practice deliberately (if Physical: daily posture work; if Communication: headline-first practice; if Challenge: role-play difficult conversations; if Impact: conscious attention to making others feel valued). (5) Re-record and re-score after 60 days. Presence isn't innate—it's trained.",
      
      "In Brazilian Jiu Jitsu, black belt presence is unmistakable. They don't need to announce rank. You feel it in: how they move (efficient, purposeful), how they teach (clear, structured), how they roll (calm under pressure), how they make you feel (challenged but safe). That presence was built through years of practice—not in trying to look like a black belt, but in developing the actual capabilities that presence reflects. Executive presence is the same. Don't fake it. Build it. The presence follows the capability.",
      
      "Brown Belt Integration: You've completed Influence Without Authority stripe. You learned: (1) Four sources of influence (expertise, credibility, relationships, value creation). (2) Physics of presence (somatic, cognitive, intentional alignment). (3) Credibility under pressure (five-part crisis formula). (4) Executive presence framework (four trainable components). These create influence that transcends title. Most leadership happens without formal authority. The leaders who matter aren't necessarily the highest-ranked—they're the ones people trust, follow, and want to work with. That's you now.",
      
      "Next stripe: Advanced Communication—we'll tackle the highest-level communication skills (coaching conversations at scale, powerful questions, storytelling for influence). But first, run the Executive Presence Lab on yourself. Record three interactions. Score the four components. Identify lowest. Practice for 60 days. You can't shortcut presence—it requires deliberate development. But it's fully within your control. No one gave you permission to have presence. You cultivate it through systematic practice. Start now."
    ],
    learningObjective: "You will learn the four trainable components of executive presence (physical showing up, communication clarity, challenge response, impact on others) that account for 26% of promotion decisions.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe15Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You're not a manager but you see a cross-functional problem affecting three teams that no one owns. According to 'leading from anywhere' principles, what's your move?",
    options: [
      "Wait for a manager to notice and fix it",
      "Mention it in your next 1-on-1 with your boss",
      "Research the problem, talk to stakeholders individually, develop a proposal, build coalition, present it. Lead without waiting for permission.",
      "Send an email to all three teams describing the problem"
    ],
    correctAnswer: 2,
    explanation: "Option C demonstrates leading from anywhere through the four sources of influence: expertise (you researched it), credibility (you're proposing solutions not just problems), relationships (you talked to stakeholders first), value creation (you're solving others' problems). Harvard research: 70% of critical decisions happen through informal networks, not formal hierarchy. Option A waits for permission that never comes. Option B abdicates ownership. Option D identifies problem without solving it. The insight: Organizations promote people who are already leading informally. You prove influence first, title follows. Don't wait for authority to start leading. Just Eat Takeaway example: peer with zero formal authority consistently influenced across org through expertise + credibility + relationships + value creation.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You're presenting to senior leadership. You're nervous—shoulders hunched, breathing shallow, thoughts scattered. You have 60 seconds before you present. According to presence physics, what do you do?",
    options: [
      "Review your slides one more time",
      "Take 5 deep breaths, but stay hunched over your laptop",
      "Stand with aligned posture, take 5 deep belly breaths, ask yourself 'What does this room need from me?', feel your feet on the floor. Then present.",
      "Imagine them in their underwear to reduce anxiety"
    ],
    correctAnswer: 2,
    explanation: "Option C applies the 60-second presence reset: somatic (aligned posture, feet grounded, breathing), cognitive (clear attention), intentional (what's needed here). Strozzi Institute research: presence requires all three components aligned. Your nervous system broadcasts to the room—if you're dysregulated (hunched, shallow breathing), the room feels it. Option A doesn't address your physical/mental state. Option B fixes breathing but not posture/presence. Option D is a myth that doesn't work. The Just Eat Takeaway crisis example: Leader A (hunched, fast speech, high voice) spiked team anxiety. Leader B (grounded, slow speech, eye contact) calmed team. Same crisis, different presence, different outcomes. Practice: 60 seconds before important interactions changes how others respond to you through physics, not content.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Major system outage. 1000+ customers affected. Leadership demanding answers. You're investigating but don't have root cause yet. It's been 2 hours. According to credibility-under-pressure principles, what do you communicate?",
    options: [
      "Wait until you have the full picture so you can provide complete, confident information",
      "'We have an outage affecting 1000+ customers. Investigating root cause. Don't know impact yet. Actions: engineering forensics underway, customers being notified, I'll update in 2 hours regardless of new info.'",
      "Downplay it: 'Minor technical issue, we're working on it, everything will be fine soon'",
      "Blame the vendor or another team to deflect pressure"
    ],
    correctAnswer: 1,
    explanation: "Option B uses the five-part credibility formula: Acknowledge reality (1000+ affected), Own your part (implicit in 'we have'), State plan (forensics, notifications), Invite input (implicit in transparent status), Execute visibly (update in 2 hours). Center for Creative Leadership: 75% of leadership failures happen under pressure. Success requires: emotional regulation, transparent communication, clear action, accountability. Option A optimizes for appearing in control over building trust—fast partial information beats slow complete information. Option C destroys credibility through false confidence. Option D destroys credibility and safety through blame. Just Eat Takeaway breach example: communicated within 2 hours with incomplete info—'honesty in uncertainty built more trust than polished communication would have.' Kept commitments (updates every 4 hours) build trust.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You record yourself in three meetings and score the four components of executive presence: Physical (4/10), Communication (8/10), Challenge Response (7/10), Impact on Others (6/10). According to the Executive Presence Lab, where do you focus next 60 days?",
    options: [
      "Communication (your highest score)—double down on strengths",
      "Physical (your lowest score)—daily posture work, breathing practice, movement awareness",
      "Work on all four equally for balanced improvement",
      "None—4/10 is good enough"
    ],
    correctAnswer: 1,
    explanation: "Option B focuses on the weakest link. Executive presence requires all four components—weakness in any one undermines the others. Center for Talent Innovation: presence accounts for 26% of promotion decisions but only 5% get feedback on improving it. Physical presence (posture, energy, eye contact, voice, movement) is foundational—it's the platform other components run on. Collapsed posture undermines even great communication. Option A optimizes strength while ignoring critical gap. Option C dilutes effort. Option D accepts inadequacy. The development plan: identify lowest score, practice deliberately for 60 days, re-assess. The Just Eat Takeaway CEO example: systematic practice of four components (aligned posture even in 12-hour days, headline-first communication, 'help me understand' challenge response, making people feel energized). Presence isn't innate—it's trained. Don't fake it, build it.",
    xpReward: 10
  }
];

export const stripe15Content = {
  lessons: stripe15Lessons,
  checkpoints: stripe15Checkpoints
};

