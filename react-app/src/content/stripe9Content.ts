/**
 * PURPLE BELT - STRIPE 9: DECISION-MAKING
 * Theme: Creating clarity and commitment through structured decision-making
 * Focus: Disagree and commit, decision documentation, velocity, consensus traps
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

export const stripe9Lessons: Lesson[] = [
  {
    id: 1,
    title: "Disagree and Commit: The Purple Belt Principle",
    content: [
      "You're in a leadership meeting. The CEO proposes Strategy A. You think Strategy B is better. You voice your concerns, provide data, make your case. The team debates for 45 minutes. Then the CEO says: 'I hear everyone. We're going with Strategy A.' What do you do? This moment determines whether you're ready for Purple Belt or not.",
      
      "Most leaders do one of three things: (1) Passive compliance ('Fine, whatever')—they agree externally but undermine execution through lack of effort. (2) Continued resistance ('I still think we're wrong')—they keep arguing, creating endless relitigating. (3) Backstabbing ('I told them this wouldn't work')—they wait for failure so they can say 'I told you so.' All three destroy team performance. None of them is leadership.",
      
      "The Purple Belt principle is 'Disagree and Commit.' You disagree openly and fully during debate. You advocate for your position with passion. You challenge assumptions, surface risks, stress-test logic. But once a decision is made, you commit completely—as if it were your own idea. Not passive compliance. Active, enthusiastic commitment to making the decided path work.",
      
      "This comes from Andy Grove at Intel and was popularized by Jeff Bezos at Amazon. Bezos wrote in a 2017 shareholder letter: 'Use the phrase 'disagree and commit.' If you have conviction on a particular direction even though there's no consensus, it's helpful to say, 'Look, I know we disagree on this but will you gamble with me on it? Disagree and commit?' The answer is almost always yes, and this is an effective way of working when you have conviction but can't necessarily convince others.'",
      
      "The neuroscience behind why this is hard: When you invest intellectual and emotional energy into a position, your brain treats it as part of your identity. Abandoning your position feels like abandoning yourself. This is called 'ego depletion'—the cognitive cost of overriding your initial judgment. It's why people double down on bad decisions rather than pivot. Your ego would rather be right than successful.",
      
      "At Just Eat Takeaway, we had a major disagreement about market prioritization. I argued strongly for City A (higher revenue). My peer argued for City B (better unit economics). We debated in front of the executive team for 60 minutes. The CEO chose City B. In that moment, I had a choice: stay bitter or commit fully. I chose commit. I told my team: 'We're focusing City B. Here's why it's the right call. Here's how we win.' Three months later, City B's retention numbers proved the decision correct. But my commitment wasn't conditional on being right—it was unconditional the moment the decision was made.",
      
      "The key distinction: Disagree and commit is NOT 'shut up and follow orders.' It requires vigorous disagreement DURING the decision process. If you didn't voice your concerns, you don't have standing to complain later. The commitment is earned through the opportunity to fully voice dissent. Amazon's leadership principle: 'Have Backbone; Disagree and Commit.' Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly.",
      
      "Why this matters for team performance: Research from McKinsey shows that teams where leaders commit to decisions (even ones they disagreed with) execute 40% faster than teams where leaders remain ambivalent. Why? Because teams take their cues from leaders. If you're halfhearted, your team will be. If you're committed, your team will be. Your job isn't to only execute decisions you agree with—it's to make whatever decision gets made successful.",
      
      "In Brazilian Jiu Jitsu, there's a moment in competition where you commit to a technique. Maybe you're going for a triangle choke. You've invested energy setting it up. Then you realize: this isn't working, my opponent has a counter. You have milliseconds to decide: keep forcing the triangle (ego preservation) or abandon it and transition to a different attack (strategic adaptation). White belts force techniques because they committed to them. Black belts abandon techniques instantly when they're not working. Commitment to the goal (submission) trumps commitment to the method (specific technique).",
      
      "Leadership is the same. You're committed to the goal (team success, company success), not to being right about which path. When the decision goes against your recommendation, you don't sulk—you abandon your attachment to your idea and fully commit to making the chosen idea work. That's Purple Belt maturity. White Belt leaders stay attached to being right. Purple Belt leaders are attached to results.",
      
      "The practice: Next time a decision goes against your recommendation, explicitly tell your team: 'I argued for X, the decision was Y, I'm now 100% committed to making Y successful. Here's how we'll execute it.' This verbal articulation does two things: (1) It models healthy disagreement for your team. (2) It signals complete commitment going forward. Both matter.",
      
      "Next lesson: The Clarity Canvas—how to document decisions so they don't get relitigated. But first, reflect: When was the last time you had to commit to a decision you disagreed with? Did you commit fully or did you comply passively? Your team knows the difference. So do your results."
    ],
    learningObjective: "You will learn why 'disagree and commit' enables 40% faster execution than passive compliance and how to commit fully to decisions you initially opposed.",
    duration: "8-10 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Clarity Canvas: Decision Documentation",
    content: [
      "Your team just spent 90 minutes in a heated debate and reached a decision. Everyone leaves the meeting feeling aligned. Two weeks later, you discover: three different interpretations of 'the decision,' two teams executing conflicting approaches, and one team that never started. What went wrong? You made a decision but didn't create clarity. Decision without documentation is just expensive conversation.",
      
      "Research from Harvard Business School studying 200+ leadership teams found that 60% of 'agreed decisions' failed during execution because of misalignment on what was actually decided. Not disagreement—misalignment. Everyone thought they agreed because they stopped talking, but they'd agreed to different things in their heads. The moment you leave a room without written documentation, memory diverges. Within 24 hours, people remember different things. Within a week, it's completely fragmented.",
      
      "The Clarity Canvas is a decision documentation framework that forces crystallization. It's not minutes (recording what was said). It's not notes (capturing discussion). It's a structured template that captures: (1) What we decided, (2) What we explicitly did NOT decide, (3) Who owns what, (4) By when, (5) How we'll measure success, (6) What would cause us to revisit this decision. Six elements. Every decision. No exceptions.",
      
      "Element 1: What We Decided. This seems obvious but it's where most teams fail. They think they decided something but it's vague. Bad: 'We're focusing on quality.' Good: 'We're extending QA cycle from 2 weeks to 4 weeks for all new features starting with the March release.' Specificity eliminates ambiguity. If you can't write it in one clear sentence, you haven't actually decided.",
      
      "Element 2: What We Did NOT Decide. This is counterintuitive but crucial. Explicitly state what's out of scope. Example: 'We decided to extend QA. We did NOT decide to increase QA headcount or change the bug severity classification system.' Why? Because in execution, someone will assume those were part of the decision and make changes you didn't authorize. Defining boundaries prevents scope creep.",
      
      "Element 3: Who Owns What. Names and specific responsibilities. Bad: 'Engineering will handle this.' Good: 'Sarah (QA Lead) owns implementation timeline. Marcus (Eng Manager) owns resource allocation. Final sign-off: Lisa (CPO).' Research shows that decisions with named owners execute 3x faster than decisions with team-level ownership because individual accountability is clear.",
      
      "Element 4: By When. Specific dates, not vague timeframes. Bad: 'Soon' or 'Q2.' Good: 'Implementation plan due March 15. First extended-QA release on April 1.' Deadlines create urgency. Vague timelines create drift. McKinsey research: 70% of initiatives without explicit deadlines never complete. With deadlines: 85% completion rate.",
      
      "Element 5: How We'll Measure Success. Define what 'working' looks like. Example: 'Success = zero critical bugs in first month post-release AND customer satisfaction >4.5/5 AND deployment frequency maintained (not reduced by QA extension).' This prevents declaring success prematurely or arguing later about whether it worked. The metrics are agreed upfront.",
      
      "Element 6: What Would Cause Us to Revisit. Decisions aren't permanent. But relitigating wastes time. So define conditions for revisiting upfront. Example: 'We'll revisit this decision if: (a) critical bug rate increases >20%, (b) deployment frequency drops >30%, or (c) 6 months pass without measurable quality improvement.' This gives people permission to raise concerns without seeming like they're undermining the decision. The conditions for revisiting are pre-agreed.",
      
      "At Just Eat Takeaway, I implemented Clarity Canvas for all major decisions. Before: We'd have great debates but fuzzy execution. After: Every decision ended with me filling out the canvas on screen while everyone watched. 'What did we decide? [write it]. What did we NOT decide? [write it].' By the time people left the room, the canvas was done and shared in Slack. Relitigating dropped by 80% because there was a written artifact everyone had seen.",
      
      "The resistance you'll get: 'This feels bureaucratic.' 'We don't need this written down.' 'Can't we just move fast?' All wrong. The Clarity Canvas doesn't slow you down—it prevents the 3-4 follow-up meetings and 20 Slack threads that would otherwise happen when execution reveals misalignment. Five minutes documenting saves 5 hours of later confusion. That's not bureaucracy—that's efficiency.",
      
      "In Brazilian Jiu Jitsu, after you learn a new technique, your instructor says: 'Teach it back to me.' You have to verbally articulate the steps: 'Control the head, secure the grip, hip out, bring knee across.' This forced articulation reveals gaps in understanding. If you can't teach it, you don't actually know it. The teaching is the test.",
      
      "Decision documentation is the same. If you can't fill out the Clarity Canvas, you haven't actually made a clear decision. The act of writing forces clarity. Vague thoughts that sound good verbally crumble when you try to write them specifically. That's the value—the canvas reveals whether you actually decided or just stopped talking.",
      
      "Next lesson: Decision Velocity—how to make good decisions fast when perfect information isn't available. But first, implement this: After your next significant decision, fill out the Clarity Canvas before anyone leaves the room. Watch what happens. You'll discover gaps ('Wait, who actually owns this?') that would have caused execution failures. Catch them in 5 minutes rather than discovering them in 2 weeks."
    ],
    learningObjective: "You will learn the 6-element Clarity Canvas framework that prevents 60% of execution failures by documenting decisions with specificity that eliminates misalignment.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Decision Velocity: Speed Without Sloppiness",
    content: [
      "Your competitor just announced a feature you've been debating for 3 months. They beat you to market. Why? Not because they're smarter. Because they decided faster. In tech and operations, decision speed is competitive advantage. But most leaders confuse 'fast decisions' with 'reckless decisions.' This lesson teaches you how to move fast without being sloppy.",
      
      "Research from McKinsey on high-performing teams found that top-quartile companies make decisions 2x faster than bottom-quartile companies, but with equal or better quality. The difference isn't less analysis—it's structured process for rapid analysis. They know which decisions require deep analysis (few) and which require rapid execution with learning loops (most). Bottom-quartile companies treat every decision like it needs a task force and a 40-slide deck.",
      
      "Jeff Bezos's framework: Type 1 vs. Type 2 decisions. Type 1 decisions are irreversible or nearly irreversible—these require slow, careful analysis. Examples: selling the company, choosing fundamental architecture, hiring C-level executives. Type 2 decisions are reversible—these should be made fast by small groups or individuals with good judgment. Examples: feature prioritization, marketing campaigns, process changes. Most organizations treat Type 2 decisions like Type 1. This kills velocity.",
      
      "The velocity framework: (1) Categorize the decision (Type 1 or 2?). (2) Set time box (Type 1: days/weeks. Type 2: minutes/hours). (3) Gather minimum viable input (70% confidence threshold, not 100%). (4) Decide and document (using Clarity Canvas). (5) Execute with learning loops (monitor, adapt, iterate). Most teams skip steps 1-2 (categorization and time-boxing), which causes them to spend 3 weeks on a decision that should take 30 minutes.",
      
      "The 70% rule from Jeff Bezos: 'Most decisions should probably be made with somewhere around 70% of the information you wish you had. If you wait for 90%, in most cases, you're probably being slow.' Why? Because gathering the last 20% of information takes 80% of the time. And by the time you have 90% confidence, the market has moved. The penalty for moving at 70% confidence (you might be wrong) is less than the penalty for waiting for 90% (you're definitely slow).",
      
      "At Just Eat Takeaway during COVID, we had to make dozens of operational decisions daily. Normal decision process: 2-3 days for analysis, presentation to leadership, debate, decision. COVID decision process: 30-minute standup, present options, debate 10 minutes, decide, execute same day. Success rate: roughly the same. Why? Because we correctly identified these as Type 2 decisions. If we were wrong, we'd adjust within 48 hours. Speed with learning loops beat slow with perfect analysis.",
      
      "The common objection: 'But what if we're wrong?' The counter: What if you're slow? In dynamic environments (tech, operations, anything customer-facing), being fast and approximately right beats being slow and precisely right. Why? Because you learn from real data (customer behavior, system performance) faster than you learn from analysis. Reid Hoffman (LinkedIn founder): 'If you're not embarrassed by the first version of your product, you've launched too late.' Same applies to decisions.",
      
      "The velocity killers to eliminate: (1) Consensus requirement—needing everyone to agree slows decisions to the speed of the slowest person. Use 'consult and decide' instead: gather input, then one person decides. (2) Analysis paralysis—commissioning more research when you have enough. Set data collection time boxes. (3) Committee proliferation—adding more people to decisions doesn't improve quality after 5-7 people. (4) Perfectionism—waiting for the perfect option when a good-enough option executed well would win. (5) Fear of being wrong—cultures that punish mistakes kill velocity. Build 'safe to fail' culture for Type 2 decisions.",
      
      "The discipline: Time-box every decision. Type 2 decisions: 30 minutes to 2 hours. Type 1 decisions: 2 days to 2 weeks. Not 'until we figure it out'—specific time limits. When the time expires, you decide with whatever information you have. This forces prioritization of analysis (what data actually matters?) and prevents endless deferral ('let's think about it more'). Amazon's bias for action: 'Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.'",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'action beats reaction.' If you're both in neutral position and you attack first, you have advantage. Your opponent is reacting to your move, which means they're half a step behind. But if you wait to see what they do, you're the one reacting. High-level competitors understand: speed of decision (which attack to launch) matters more than perfection of technique. Launch 70% technique fast beats launching 95% technique slow—because by the time you're ready with 95%, your opponent has already moved.",
      
      "Business is the same. Your competitor moving at 70% confidence with fast iteration beats you moving at 90% confidence slowly. They're learning from market feedback while you're still in planning meetings. By the time you launch, they're on version 3, and they've learned what customers actually want. Your version 1 with perfect analysis loses to their version 3 with rapid learning.",
      
      "Next lesson: The Paralysis of Consensus—why trying to make everyone happy kills decision quality. But first, practice this: Identify one decision your team has been debating for >2 weeks. Ask: Is this Type 1 or Type 2? If Type 2, make the decision in the next 48 hours with 70% confidence, document it, execute with learning loops. You'll discover that moving fast with adjustment beats waiting for perfect clarity that never arrives."
    ],
    learningObjective: "You will learn Bezos's Type 1 vs Type 2 decision framework and why moving at 70% confidence with learning loops beats waiting for 90% confidence that arrives too late.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "The Paralysis of Consensus",
    content: [
      "Your team has been debating a decision for three meetings. Everyone has opinions. No one wants to upset anyone. So you keep discussing, hoping consensus will emerge. It won't. And while you debate, your competitor decides and executes. Consensus isn't alignment—it's the illusion of harmony that produces mediocre decisions and slow execution.",
      
      "Research from Paul Nutt at Ohio State University studied 400+ strategic decisions and found that decisions made by consensus took 40% longer and had 20% lower success rates than decisions made through 'consult and decide' (gather input, then one person decides). Why? Because consensus optimizes for agreement, not for quality. The decision that makes everyone somewhat happy usually makes no one truly committed and doesn't solve the actual problem.",
      
      "Patrick Lencioni identifies the pursuit of consensus as a commitment killer. Teams confuse buy-in with consensus. Buy-in means: 'I was heard, my concerns were addressed, and I'm committed to making this decision work even if it's not my first choice.' Consensus means: 'Everyone agrees this is the best option.' The first is achievable and valuable. The second is rare and often undesirable—because it usually means you've compromised to the point of mediocrity.",
      
      "The consensus trap has three failure modes: (1) Lowest common denominator—you choose the option that offends no one, which is usually the blandest option. (2) Analysis paralysis—people keep researching, hoping data will create agreement. It won't. Reasonable people disagree about interpretation. (3) Slow rot—the decision takes so long that by the time you agree, the market has moved and the decision is obsolete. All three are worse than making a good decision quickly that some people initially disagree with.",
      
      "At Just Eat Takeaway, we had a product decision that required choosing between three approaches. We spent two meetings trying to reach consensus. Didn't work—each approach had advocates with valid reasons. In the third meeting, I said: 'We're switching to consult and decide. I'll listen to everyone's final input for 20 minutes, then I'm deciding. You don't have to agree—but you do have to commit once it's decided.' Decision was made that meeting. Three months later, the approach worked. But even if it hadn't, we'd have learned fast and iterated. The consensus approach would still have been debating.",
      
      "The framework for 'consult and decide': (1) Frame the decision and criteria clearly upfront. (2) Give everyone space to voice input (this is where buy-in comes from—being heard). (3) Actively listen and acknowledge valid concerns. (4) Make the decision, explaining your reasoning. (5) Explicitly ask for commitment from everyone, including those who disagreed. (6) Document and execute. This respects input without requiring agreement. It's inclusive without being consensus-driven.",
      
      "The key distinction: You're not ignoring people's input by not seeking consensus—you're respecting that sometimes reasonable people disagree and someone still needs to decide. The research is clear: decisions made by informed individuals or small groups (2-3 people) with clear accountability consistently outperform decisions made by committees trying to reach consensus. Jim Collins in 'Good to Great': 'The right people on the bus' matters, but so does 'one person steering the bus.' Distributed input, centralized decision.",
      
      "Why consensus feels safe but isn't: Leaders pursue consensus because they fear conflict and want everyone to be happy. But Patrick Lencioni's research shows that teams avoiding healthy conflict make worse decisions. The disagreement you're avoiding in pursuit of consensus doesn't disappear—it just surfaces later as passive-aggressive execution or 'I told you so' undermining. Better to have the conflict upfront, make a decision, and create real commitment.",
      
      "In Brazilian Jiu Jitsu, during team training for competitions, the coach decides the strategy. They consult with fighters ('What's your best position? What are you struggling with?'), but the coach makes final calls on who fights in which division, which techniques to emphasize, how to train. If they tried to get consensus from 15 fighters with different strengths and preferences, they'd never have a coherent strategy. Consult broadly, decide centrally, execute together.",
      
      "The practice that enables this: Psychological safety (White Belt foundation) + productive conflict (Blue Belt skill). If your team doesn't trust you or can't handle disagreement, consult-and-decide will feel authoritarian. But if they trust you and you've earned credibility through White/Blue Belt practices, they'll welcome it. They want someone to make the call after they've been heard. The exhausting thing isn't having someone decide—it's endless debate without resolution.",
      
      "Purple Belt Integration Check: You've now learned the four foundations of commitment: (1) Disagree and Commit—how to commit fully to decisions you opposed. (2) Clarity Canvas—how to document decisions to prevent misalignment. (3) Decision Velocity—how to move fast at 70% confidence with learning loops. (4) Consensus Paralysis—why 'consult and decide' beats consensus-seeking. These aren't separate—they're a system. Fast decisions with clear documentation enable commitment. Commitment without relitigating enables execution. That's Purple Belt.",
      
      "Next stripe: Cross-Team Alignment—we'll tackle the hardest coordination challenge (getting multiple teams aligned when they have competing priorities). But first, audit your team's decision-making: How many decisions are stuck in consensus-seeking? Pick one. Use 'consult and decide' to resolve it this week. Gather input for 30 minutes. Decide. Document with Clarity Canvas. Move to execution. You'll discover that clarity beats consensus every time."
    ],
    learningObjective: "You will learn why consensus-seeking kills decisions (40% slower, 20% lower success) and how 'consult and decide' creates buy-in without requiring agreement.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe9Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You strongly advocated for Strategy A in a leadership meeting, presenting data and making your case for 45 minutes. The CEO chose Strategy B. Your team is looking to you for direction. According to 'disagree and commit' principles, what do you say?",
    options: [
      "'I disagree with this decision, but we'll do our best to execute it.'",
      "'I argued for Strategy A, the decision was Strategy B, and I'm now 100% committed to making Strategy B successful. Here's how we'll execute it.'",
      "'Let's give Strategy B a try and see how it goes.'",
      "Say nothing—just start executing halfheartedly"
    ],
    correctAnswer: 1,
    explanation: "Option B demonstrates full disagree-and-commit. You acknowledge your disagreement (models healthy dissent for your team) AND you articulate complete commitment going forward (signals execution mode, not continued debate). McKinsey research: teams where leaders commit to decisions they initially opposed execute 40% faster because the team takes cues from the leader. Option A signals ambivalence ('we'll do our best' is not full commitment). Option C is passive. Option D is the worst—halfhearted execution undermines both the decision and your credibility. The key: Your job after a decision isn't to only execute decisions you agree with—it's to make whatever decision gets made successful.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "Your team just spent 90 minutes deciding to extend your QA cycle from 2 weeks to 4 weeks. Everyone seems aligned. Before people leave, what does the Clarity Canvas framework require you to do?",
    options: [
      "Send meeting notes via email later",
      "Fill out the 6-element Clarity Canvas on screen while everyone watches: What we decided, what we didn't decide, who owns what, by when, success metrics, revisit conditions",
      "Trust that everyone understood—they're professionals",
      "Schedule a follow-up meeting to document decisions"
    ],
    correctAnswer: 1,
    explanation: "Option B implements the Clarity Canvas framework that prevents 60% of execution failures. Harvard research shows that within 24 hours of a decision meeting, people remember different things. By filling it out BEFORE people leave, you catch misalignment immediately ('Wait, who owns implementation?') rather than discovering it 2 weeks into failed execution. Option A delays documentation when memory is already diverging. Option C is the trap that causes 60% of 'agreed decisions' to fail—people think they agree but agreed to different things. Option D creates coordination overhead. The insight: Five minutes documenting saves 5 hours of later confusion. The canvas forces specificity that verbal agreement doesn't require.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Your team has been debating a feature prioritization decision for 2 weeks. You have 70% confidence in the best path forward. More analysis would take another week. According to decision velocity principles and Bezos's framework, what should you do?",
    options: [
      "Spend another week getting to 90% confidence before deciding",
      "Decide now with 70% confidence, document it, execute with learning loops to adjust if needed",
      "Take a vote to let the team decide democratically",
      "Wait until consensus naturally emerges"
    ],
    correctAnswer: 1,
    explanation: "Option B applies Bezos's 70% rule and Type 2 decision framework. This is likely a Type 2 decision (reversible feature prioritization) that should be made fast with learning loops. McKinsey research: top-quartile companies make decisions 2x faster with equal quality by correctly categorizing decisions. The last 20% of information takes 80% of the time—and by the time you have 90% confidence, the market has moved. Option A optimizes for being right over being fast (wrong in dynamic environments). Option C (voting) doesn't improve decision quality and diffuses accountability. Option D (waiting for consensus) could take forever. The key: For Type 2 decisions, being fast and approximately right beats being slow and precisely right because you learn from real execution faster than from more analysis.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "Your team of 8 has been trying to reach consensus on a go-to-market strategy for 3 meetings. Different people advocate for different approaches, all valid. No consensus is emerging. According to research on decision-making effectiveness, what should you do?",
    options: [
      "Keep meeting until everyone agrees—consensus is important for buy-in",
      "Switch to 'consult and decide': Give 20 minutes for final input, then make the decision, explain reasoning, ask for commitment",
      "Take the decision to a higher authority to break the tie",
      "Choose the option that most people prefer (simple majority)"
    ],
    correctAnswer: 1,
    explanation: "Option B implements 'consult and decide' which Nutt's research shows is 40% faster and 20% more successful than consensus-seeking. Consensus optimizes for agreement, not quality—you get the lowest common denominator that offends no one but excites no one. Option A (keep meeting) is how decisions die—you'll still be debating when your competitor ships. Option C abdicates leadership. Option D (majority vote) creates winners and losers without requiring commitment. The framework: consult broadly (everyone's input is heard—this is where buy-in comes from), decide centrally (one person makes the call with clear reasoning), execute together (even those who disagreed commit fully). Lencioni's insight: buy-in ≠ consensus. Buy-in means 'I was heard and I'm committed' not 'I agree.'",
    xpReward: 10
  }
];

export const stripe9Content = {
  lessons: stripe9Lessons,
  checkpoints: stripe9Checkpoints
};

