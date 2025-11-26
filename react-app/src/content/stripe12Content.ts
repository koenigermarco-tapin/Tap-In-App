/**
 * PURPLE BELT - STRIPE 12: SYSTEMS THINKING
 * Theme: Understanding interconnections, feedback loops, and unintended consequences
 * Focus: Systems vs. events, unintended consequences, second-order effects, Purple Belt integration
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

export const stripe12Lessons: Lesson[] = [
  {
    id: 1,
    title: "You Can't Optimize in Isolation",
    content: [
      "Your sales team is crushing it—highest revenue quarter ever. Your customer success team is drowning—churn rate just hit an all-time high. Your operations team is burning out—delivery errors are spiking. These aren't three separate problems. They're one system problem: sales is selling to customers who aren't a good fit, creating downstream chaos. Optimizing one part of a system often degrades the whole. This is systems thinking.",
      
      "Research from MIT's Peter Senge in 'The Fifth Discipline' shows that 90% of management problems are system-level (structure, processes, interconnections) but 90% of management attention goes to event-level (what just happened? who screwed up?). This mismatch causes organizations to solve the same problems repeatedly because they're treating symptoms, not addressing root causes. Systems thinking is the ability to see patterns, interconnections, and feedback loops instead of isolated events.",
      
      "The fundamental insight: Organizations are systems where everything affects everything else. Change one thing, and you create ripple effects—some intended, some not. Example: You implement a bonus for closing deals (intended consequence: more deals closed). Unintended consequences: Sales closes deals with anyone, quality of customers drops, churn increases, customer success spends more time on support, product gets pulled into firefighting custom features, engineering quality drops trying to meet impossible timelines. You optimized for deal close rate and degraded system-wide performance.",
      
      "The optimization trap: Every function is measured on local metrics. Sales: revenue. Product: features shipped. Engineering: velocity. Customer Success: retention. Each team optimizes for their metric. But the metrics are interconnected. When Sales optimizes for revenue without considering customer fit, they create retention problems for CS. When Engineering optimizes for velocity without considering quality, they create support load for CS. When Product optimizes for features without considering technical debt, they slow future Engineering velocity. Local optimization creates global degradation.",
      
      "At Just Eat Takeaway, we had this exact problem: We launched a campaign to acquire new restaurants fast (growth team metric: restaurants onboarded). Growth crushed their target. But the restaurants we onboarded had poor menus, slow preparation, and high error rates. Operations got overwhelmed with support. Customer experience dropped. We had to off-board 30% of the restaurants within 6 months. Growth 'won' their metric. The system lost. Why? Because we optimized one part (acquisition) without considering the whole (quality, operations capacity, customer experience).",
      
      "The systems thinking shift: From 'How do we hit OUR numbers?' to 'How does our work affect the whole system?' Sales doesn't just ask 'Can I close this deal?' but 'Is this customer a good fit for our product and operations?' Product doesn't just ask 'Can we ship this feature?' but 'What technical debt and support burden will this create?' Engineering doesn't just ask 'Can we meet the deadline?' but 'What quality shortcuts will cause problems later?' This requires seeing beyond your function to the interconnections.",
      
      "The diagnostic question: 'If we succeed wildly at our team goal, what problems could that create for other teams?' Sales succeeding wildly at revenue with bad-fit customers creates CS churn problems. Product succeeding wildly at feature velocity creates Engineering technical debt. Operations succeeding wildly at cost reduction creates quality problems. Every success in isolation can create system-level failure. High-performing teams ask this question before celebrating local wins.",
      
      "The practice: Create a 'ripple effect map' for major initiatives. Center: your initiative. First ring: direct effects (what happens immediately). Second ring: indirect effects (what happens because of first-ring effects). Third ring: long-term effects. Example: Initiative = Slash prices 20% to gain market share. First ring: More customers acquired. Second ring: Lower margins, higher support volume, operations strain. Third ring: Can't sustain service quality, churn increases, brand damage. The map reveals: short-term gain creates long-term pain. Systems thinkers see the full map before pulling the lever.",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'creating problems while solving problems.' You escape mount (solving a problem) but end up in triangle position (created a new problem). White belts do this constantly—they're so focused on solving the immediate threat that they don't see what position they're moving into. Black belts think systemically: 'If I escape mount this way, where do I end up? Is that position better or worse?' They optimize for the SYSTEM (overall position), not the EVENT (escaping mount).",
      
      "Leadership is the same. Event thinkers react to fires. Systems thinkers ask: 'What's creating the fires? If I put out this fire, will I create a bigger fire somewhere else?' Example: Engineering is slow, so you push them to move faster (solving the event). Unintended consequence: Technical debt accumulates, system becomes harder to change, future velocity drops even more (created a system problem). Systems thinkers would ask: 'Why is Engineering slow? Is it because we're asking them to build features on top of unmaintainable code?' Fix the root cause (refactor the foundation), and velocity improves sustainably.",
      
      "Next lesson: Unintended Consequences—we'll explore the specific patterns of how actions create unexpected effects and how to anticipate them. But first, do this diagnostic: List your team's top 3 metrics. For each one, ask: 'If we succeed wildly at this metric, what problems could that create for other teams?' Write down the ripple effects. That's your systems thinking practice. Most problems aren't coming from malice or incompetence—they're coming from local optimization in an interconnected system."
    ],
    learningObjective: "You will learn why optimizing one part of a system often degrades the whole and how to think systemically by mapping ripple effects across interconnected functions.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Unintended Consequences",
    content: [
      "You implement a policy to reduce costs: require manager approval for all purchases over €100. Intended consequence: better cost control. Unintended consequences: (1) Employees spend hours splitting €150 purchases into two €75 orders to avoid approval. (2) Managers spend 10 hours/week approving trivial expenses. (3) Critical purchases get delayed waiting for approval. (4) Trust erodes ('leadership doesn't trust us'). You saved €5,000 in costs. You lost €50,000 in productivity. This is the law of unintended consequences.",
      
      "Economist Thomas Sowell: 'The most basic question is not what is best, but compared to what?' Every intervention has effects—some intended, some not. The question isn't whether your policy achieves its intended goal (cost reduction). The question is whether the total effects (including unintended) are better than doing nothing. Most policies succeed at their stated goal but fail at the system level because unintended consequences dwarf intended benefits.",
      
      "The three types of unintended consequences: (1) Unexpected benefits—good outcomes you didn't predict. (2) Unexpected drawbacks—negative outcomes you didn't consider. (3) Perverse results—the policy creates the opposite of what you wanted. Example of perverse: Implementing performance reviews to improve performance, but reviews create so much anxiety and political gaming that actual performance drops. The cure is worse than the disease.",
      
      "Why unintended consequences are inevitable: Complex systems have interconnections you can't fully map. Change one variable, and you affect variables you didn't consider through paths you didn't see. This doesn't mean don't change things—it means: (1) Expect unintended consequences. (2) Monitor for them. (3) Adjust when you find them. The mistake isn't creating unintended consequences (unavoidable). The mistake is ignoring them once they emerge because you're committed to your intervention.",
      
      "At Just Eat Takeaway, we implemented a policy: all customer complaints escalated to management within 4 hours (intended: faster resolution, better customer experience). Unintended consequence: Operations started escalating trivial issues to hit the 4-hour metric even when they could resolve them faster locally. Management got flooded with low-value escalations. Time to resolve CRITICAL issues actually increased because management was buried in noise. The policy achieved its metric (escalation time) while degrading its goal (customer experience). We killed the policy after 6 weeks.",
      
      "The anticipation framework: Before implementing a policy, ask: (1) What behavior am I trying to change? (2) What's the easiest way for people to game this metric? (3) If everyone optimizes for this metric, what breaks? (4) What's the opposite of my intended outcome, and could this policy accidentally cause it? This doesn't prevent all unintended consequences, but it catches the obvious ones. The €100 approval policy: Asking question #2 (how would people game this?) would have revealed 'split purchases' immediately.",
      
      "Goodhart's Law: 'When a measure becomes a target, it ceases to be a good measure.' Example: You measure call center performance by 'average call duration' (short calls = efficient). Employees optimize by rushing customers off the phone without solving problems. Call duration drops. Customer satisfaction drops. You optimized the metric while degrading the outcome. Cobra Effect: British colonial government in India put a bounty on cobras (intended: reduce cobra population). People started breeding cobras to collect bounties. When government ended the program, breeders released cobras into wild. Cobra population increased. That's a perverse result.",
      
      "The monitoring discipline: After implementing any significant change, designate someone to monitor for unintended consequences. Not 'is this achieving the intended goal?' (that's easy to track). But 'what unexpected effects are emerging?' Have that person report monthly for 6 months. Examples to monitor: (1) Are people gaming the system? (2) Have other metrics degraded? (3) Are people complaining about things you didn't anticipate? (4) Is the cure creating new diseases? If you find unintended consequences that outweigh intended benefits, kill the policy. Don't double down defending your idea.",
      
      "In Brazilian Jiu Jitsu, there's a submission called 'Can Opener' (grabbing opponent's head and pulling). It works—you can make people tap. Unintended consequence: You injure training partners' necks. They can't train. Worse: They learn the same technique and injure others. The gym culture degrades. Most academies ban the Can Opener not because it doesn't work (it does) but because the unintended consequences (injured partners, degraded training environment) outweigh the intended benefit (one more submission in your arsenal). Good policies consider total effects, not just direct effects.",
      
      "The implementation: Before your next policy change, run an 'unintended consequences workshop' (30 minutes with 5-8 people from different perspectives). Present the policy. Ask: (1) How could people game this? (2) What could break if this succeeds? (3) What's the worst unintended outcome we can imagine? (4) How will we monitor for these? Document the concerns. Implement the policy with monitoring. Review after 30 and 90 days. This doesn't prevent all unintended consequences, but it builds the organizational muscle of systems thinking.",
      
      "Next lesson: The Second-Order Effects—we'll explore how to think two or three moves ahead like a chess master, anticipating cascades of consequences. But first, audit your current policies. Pick three. For each one, ask: What unintended consequences have emerged? Are those consequences worse than the problem the policy was solving? If yes, you know what to do: Kill the policy or redesign it. Don't fall victim to sunk cost fallacy ('but we invested so much in this policy'). Cut your losses. Bad policies compound over time."
    ],
    learningObjective: "You will learn the three types of unintended consequences and how to anticipate, monitor, and respond to effects that dwarf intended benefits through system-level thinking.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "The Second-Order Effects",
    content: [
      "You're deciding whether to cut prices 20% to gain market share. First-order effect: More customers buy (intended). But what's the second-order effect? Competitors cut prices too (price war). Third-order effect? Industry margins compress, startups die, only big players survive, innovation slows. Most leaders stop thinking at first-order effects. High performers think three orders ahead. This is second-order thinking.",
      
      "Investor Howard Marks: 'First-level thinking is simplistic and superficial... Second-level thinking is deep, complex, and convoluted.' First-order thinking asks: 'What happens next?' Second-order thinking asks: 'What happens after that? And after that?' Example: Fire underperforming employee (first-order: team productivity improves). But second-order: Team sees you fire someone without support or coaching first. They become risk-averse, stop trying new things, engagement drops. Third-order: Top performers leave because they don't want to work in a fear-based culture. You optimized for short-term productivity, destroyed long-term capability.",
      
      "The chess analogy: Beginners see one move ahead ('if I move my bishop here, I can take their pawn'). Intermediate players see two moves ahead ('if I take their pawn, they'll take my bishop'). Masters see five moves ahead ('if I sacrifice this piece, I'll open this attack, which forces them into this bad position, which sets up this checkmate three moves later'). Business requires the same: thinking in chains of consequences, not isolated moves.",
      
      "At Just Eat Takeaway, we debated offering free delivery to gain customers from competitors. First-order effect: Customer acquisition would spike (good). Second-order effect: Customers we acquired would be price-sensitive, low-loyalty users. Third-order effect: Once we raised prices back to normal, they'd churn. Fourth-order: We'd spend heavily acquiring customers who never became profitable. We'd have been better off targeting fewer, higher-value customers. Second-order thinking killed the free delivery proposal before we wasted money on it.",
      
      "The framework for multi-order thinking: (1) Identify the action. (2) Map first-order effects (immediate, direct consequences). (3) Map second-order effects (what happens because of first-order effects?). (4) Map third-order effects (what happens because of second-order effects?). (5) Evaluate the total chain—is the final position better or worse than status quo? Most decisions look great at first-order and terrible at third-order. The discipline is thinking through the full chain BEFORE acting.",
      
      "Common second-order reversals (where the ultimate effect is opposite of first-order): (1) Short-term revenue optimization → Long-term customer trust destruction. (2) Aggressive cost cutting → Capability degradation that costs more to rebuild. (3) Overworking team for one deadline → Burnout that creates missed deadlines for months. (4) Scaling before product-market fit → Resources locked in wrong direction, hard to pivot. (5) Rewarding individual performance → Team collaboration dies, system performance drops. All of these look smart at first-order, dumb at third-order.",
      
      "The time horizon question: How far ahead should you think? Depends on reversibility. Reversible decisions (Type 2 from earlier stripe): 1-2 orders ahead is sufficient because you can adjust. Irreversible decisions (Type 1): 3-5 orders ahead is necessary. Example: Hiring a C-level executive (irreversible, hard to undo): Think three orders ahead. First-order: Do they have skills for current needs? Second-order: Will their approach create the culture we want? Third-order: Can they scale with the company or will we outgrow them? Launching a marketing campaign (reversible): First-order: Will it drive leads? Second-order: Will those leads convert? That's sufficient—if it doesn't work, you stop.",
      
      "The mistake most leaders make: They confuse activity with progress. They take action quickly (first-order thinking: 'we must do something!') without considering whether that action creates a better end state. Example: Tech company struggling with quality launches a massive testing initiative. First-order: More testing, fewer bugs. Second-order: Testing becomes bottleneck, release velocity drops, company loses market timing. Third-order: Competitors ship faster, capture market, company loses despite better quality. The 'do something' bias led to worse outcomes than doing nothing. Sometimes the right action is patient analysis, not rapid action.",
      
      "In Brazilian Jiu Jitsu, there's a technique where you bait your opponent: You deliberately give them an opening (your arm, your neck) that looks vulnerable. First-order: They attack the opening. Second-order: Their attack requires them to shift weight or extend position. Third-order: You counter their attack from the position they've moved into. This is called 'setting traps.' You're thinking three moves ahead: Give opening → They take it → You counter. White belts see the opening and attack without thinking what comes next. Black belts see the trap and avoid it OR take the opening while protecting against the counter. Both are thinking multi-order.",
      
      "Next lesson: Purple Belt Integration—we'll synthesize everything you've learned about commitment, alignment, and systems thinking. But first, practice second-order thinking on a current decision. Map first, second, and third-order effects. Ask: Is the final position (third-order) actually better than status quo? If not, don't do it—even if first-order looks great. This discipline prevents most strategic mistakes, which aren't sins of execution (doing things wrong) but sins of conception (doing wrong things efficiently)."
    ],
    learningObjective: "You will learn to think like a chess master by mapping first, second, and third-order effects of decisions and understanding why many choices that look smart at first-order are destructive at third-order.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Purple Belt Integration: Your Alignment Check",
    content: [
      "You've completed Purple Belt—the belt of commitment and alignment. Where White Belt built trust and vulnerability, and Blue Belt taught conflict and communication, Purple Belt focused on turning decisions into committed action. Before moving to Brown Belt (accountability), we need to integrate: Are you actually creating alignment, or just having better meetings?",
      
      "Let's review the four stripes. Stripe 9: Decision-Making—you learned 'disagree and commit' (committing to decisions you opposed), Clarity Canvas (documenting decisions to prevent misalignment), decision velocity (70% confidence beats waiting for 90%), and why consensus-seeking kills decisions. Stripe 10: Cross-Team Alignment—you learned to break silos through shared goals, the Alignment Accelerator for rapid alignment, systemic mapping to reveal dependencies, and coordination mechanisms that work within constraints.",
      
      "Stripe 11: Strategic Clarity—you learned to translate strategy through 5 levels (priority → indicators → initiatives → actions → trade-offs), Hoshin Kanri for structured deployment, cascading clarity so everyone knows 'why,' and brutal prioritization that says no to create focus. Stripe 12: Systems Thinking—you learned why optimizing in isolation degrades systems, how to anticipate unintended consequences, how to think in second-order and third-order effects, and how decisions create ripple effects across the organization.",
      
      "These aren't separate skills—they're an integrated capability for creating organizational alignment. Decisions (Stripe 9) need cross-team buy-in (Stripe 10). Cross-team coordination requires strategic clarity (Stripe 11). Strategic clarity requires systems thinking to avoid unintended consequences (Stripe 12). Each stripe builds on and requires the previous. You can't have commitment without clarity. You can't have clarity without considering system effects. You can't create system-wide change without cross-team alignment.",
      
      "Here's your Purple Belt Integration Assessment: (1) Decisions: Do you have a backlog of relitigated decisions, or do decisions stay decided? (2) Alignment: Can you get 3+ teams aligned on a strategy in 3-5 days, or does it take weeks? (3) Clarity: Can someone three levels down explain how their work connects to strategy? (4) Systems Thinking: Do you map second-order effects before major decisions, or do unintended consequences constantly surprise you?",
      
      "If you answered positively to 3-4: Your Purple Belt is solid. You're creating real alignment, not just better documentation. You're ready for Brown Belt (accountability). If you answered positively to 1-2: You have work to do. Pick the weakest area and practice intensively for 2-4 weeks. If you answered positively to 0: You consumed content without building capability. Go back to Stripe 9 and actually implement one framework per stripe before moving forward.",
      
      "The most common Purple Belt failure: Teams implement the tools (Clarity Canvas, systemic mapping, Hoshin Kanri) without the underlying capabilities (trust from White Belt, conflict skills from Blue Belt). So they have beautifully documented decisions that no one actually commits to. They have systemic maps that don't change behavior. They have strategic priorities that don't translate to action. The tools don't work because the foundation is missing. This is why sequence matters: White → Blue → Purple. You can't skip levels.",
      
      "At Just Eat Takeaway, I inherited a team with great Purple Belt tools (they had roadmaps, OKRs, documentation systems) but zero Purple Belt capability (decisions got relitigated, cross-team coordination was chaos, strategy didn't translate to action). Why? Because they'd skipped White and Blue Belt—no trust, couldn't handle conflict. We paused all the tools and spent 6 weeks rebuilding foundation: vulnerability exercises (White Belt), structured debate practice (Blue Belt), then reintroduced Purple Belt frameworks. Only then did the tools work.",
      
      "The Purple Belt mindset shift: From 'how do we decide?' to 'how do we commit?' Decisions are easy. Commitment is hard. Purple Belt leaders understand that the quality of the decision matters less than the quality of the commitment. A mediocre decision executed with full commitment beats a perfect decision executed with ambivalence. Why? Because execution is iterative—you learn and adjust. But you can only learn if you commit fully enough to discover what works and what doesn't. Half-commitment produces half-data, which leads to no learning.",
      
      "In Brazilian Jiu Jitsu, purple belt is often called 'the grind belt.' It's where technique meets consistency. You're no longer figuring out basics (White Belt) or developing flow (Blue Belt). You're integrating everything you know and applying it consistently. You can execute under pressure. You can adapt to different body types and styles. You're not a master yet, but you're dangerous. You can walk into any gym and hold your own. That's the standard.",
      
      "Business Purple Belt is the same: You can create commitment across teams despite disagreement. You can translate strategy into action that people actually follow. You can align multiple stakeholders in days, not months. You think systemically, anticipating consequences most leaders miss. You're not a CEO yet, but you're a leader who can drive organizational results, not just manage your team. That's the standard.",
      
      "The Purple Belt test: Can you take an executive strategy ('improve customer lifetime value') and within one week produce: (1) Documented translation to team-level actions, (2) Alignment from 3+ cross-functional teams, (3) Second-order effects analysis showing what could go wrong, (4) Explicit commitment from all teams to execute for 90 days? If yes, you've earned Purple Belt. If no, you need more mat time.",
      
      "Next belt: Brown Belt focuses on accountability. You'll learn peer accountability (holding each other to commitments), self-accountability (owning your impact), accountability systems (transparent tracking), and accountability mastery (navigating the hardest conversations). But Brown Belt only works if Purple Belt is solid. You can't hold people accountable to commitments they never truly made (Purple Belt failure). Accountability without commitment is just authoritarianism.",
      
      "Before moving to Brown Belt, do this final integration exercise: Take one strategic initiative you're currently running. Evaluate it against Purple Belt criteria: (1) Is the decision clear and documented (Stripe 9)? (2) Are cross-functional teams aligned (Stripe 10)? (3) Can people 3 levels down explain why this matters (Stripe 11)? (4) Have you mapped second-order effects (Stripe 12)? Score each 1-10. Average below 7 means you're not Purple Belt ready. Fix the gaps before proceeding. Self-deception here costs you massively in Brown Belt when accountability fails because the foundation (commitment) was never solid."
    ],
    learningObjective: "You will integrate all Purple Belt learnings (decision-making, alignment, clarity, systems thinking) and assess whether you're creating real organizational commitment or just better documentation.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe12Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your sales team hits record revenue by closing deals with anyone who'll buy. Your customer success team reports churn is spiking and operations is overwhelmed. According to systems thinking, what's the actual problem?",
    options: [
      "Sales is doing great, CS and Ops need to improve",
      "Local optimization (Sales maximizing revenue) is degrading system-wide performance (customer fit, operations capacity, retention)",
      "You need to hire more CS and Ops staff to handle growth",
      "Sales targets are too aggressive"
    ],
    correctAnswer: 1,
    explanation: "Option B correctly diagnoses the system problem. Sales is optimizing locally (their metric: revenue) without considering system-wide effects (customer quality, operations load, long-term retention). Peter Senge's research: 90% of problems are system-level but 90% of attention goes to event-level ('who screwed up?'). The Just Eat Takeaway example: growth team optimized restaurant acquisition, onboarded poor-quality restaurants, created operations chaos and customer experience problems, had to off-board 30% within 6 months. Growth 'won' their metric. System lost. Option A blames functions when structure is the problem. Option C treats symptoms (add capacity) not root cause (acquisition quality). Option D adjusts one metric without fixing the misalignment. The fix: Shared metrics requiring cross-functional success.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You implement a policy: all purchases over €100 require manager approval (intended: cost control). Six months later, you discover employees split purchases to avoid approval, managers spend 10 hours/week on trivial approvals, critical purchases are delayed. According to unintended consequences framework, what happened?",
    options: [
      "Policy is working—costs are controlled",
      "Employees are violating the policy and should be disciplined",
      "Unintended consequences (gaming, manager time, delays, trust erosion) outweigh intended benefits (cost savings)—kill the policy",
      "Tighten the policy to prevent splitting purchases"
    ],
    correctAnswer: 2,
    explanation: "Option C applies total effects analysis: intended benefit (€5K saved) vs. unintended costs (€50K+ in productivity lost, trust eroded, delays). Thomas Sowell: 'The question isn't what is best, but compared to what?' The policy succeeded at its stated goal (cost control) but failed system-wide because unintended consequences dwarfed benefits. Option A ignores total costs. Option B blames people for gaming what's a poorly designed system. Option D doubles down on a bad policy. Goodhart's Law: 'When a measure becomes a target, it ceases to be a good measure.' The monitoring discipline: After implementing any change, designate someone to monitor for unintended consequences for 6 months. If cure creates worse disease, kill the policy.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You're considering cutting prices 20% to gain market share. According to second-order thinking, what's the analysis chain you should complete before deciding?",
    options: [
      "First-order only: More customers buy (good) → Do it",
      "First and second-order: More customers buy → Competitors match prices → Price war → Lower margins for everyone → Reassess",
      "First-order with positive spin: Lower prices drive volume which drives economies of scale",
      "Ask the sales team if they think it will work"
    ],
    correctAnswer: 1,
    explanation: "Option B demonstrates multi-order thinking. Howard Marks: 'First-level thinking is simplistic... Second-level thinking is deep and complex.' Map the chain: First-order = more customers (good). Second-order = competitors react, price war starts. Third-order = margins compress industry-wide, only big players survive, startups die, innovation slows. Is the third-order position better than status quo? Often no. The Just Eat Takeaway example: free delivery proposal looked great at first-order (acquire customers), terrible at third-order (acquire price-sensitive customers who churn when prices normalize, waste money on unprofitable acquisition). Second-order thinking killed the proposal before wasting money. Option A stops too early. Option C is wishful thinking. Option D outsources strategic thinking. The discipline: For irreversible decisions, think 3-5 orders ahead.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're doing your Purple Belt Integration Assessment. Your scores: Decisions (8/10), Cross-Team Alignment (4/10), Strategic Clarity (7/10), Systems Thinking (6/10). What should you focus on before moving to Brown Belt?",
    options: [
      "Move to Brown Belt—average is 6.25 which is passing",
      "Focus on Cross-Team Alignment (lowest score)—you can't create accountability without being able to align teams",
      "Double down on Decisions (highest score) to reach mastery",
      "Work on all four areas equally"
    ],
    correctAnswer: 1,
    explanation: "Option B focuses on the weakest link. Alignment = 4 means you struggle to coordinate across functions. Brown Belt is about accountability—holding teams accountable to commitments. But you can't create accountability if you can't first create alignment. The capability stack: Trust (White) enables Conflict (Blue) enables Commitment (Purple) enables Accountability (Brown). A 4 in alignment will undermine everything in Brown Belt. Option A ignores that belt progression is sequential, not averaging. Option C optimizes strength while ignoring critical gap. Option D dilutes effort. The insight: Purple Belt Integration isn't about perfect scores—it's about ensuring you're ABOVE threshold in all four areas. A score below 6 in any area means that area will fail you in Brown Belt. Fix it first.",
    xpReward: 10
  }
];

export const stripe12Content = {
  lessons: stripe12Lessons,
  checkpoints: stripe12Checkpoints
};

