/**
 * PURPLE BELT - STRIPE 11: STRATEGIC CLARITY
 * Theme: Translating strategy into executable action that creates alignment
 * Focus: Strategy execution, Hoshin Kanri, cascading clarity, prioritization
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

export const stripe11Lessons: Lesson[] = [
  {
    id: 1,
    title: "From Strategy to Action",
    content: [
      "Your CEO presents the company strategy: 'We're going to be the market leader in customer experience.' Everyone nods. Meeting ends. Two weeks later, you discover: three teams interpreted 'customer experience' differently, two teams didn't change their priorities at all, and one team started a project that contradicts the strategy. The strategy was communicated, but it wasn't translated. Communication without translation is just noise.",
      
      "Research from Harvard Business School shows that 67% of well-formulated strategies fail during execution. Not because the strategy is wrong—because the translation from strategy to action never happens. Employees four levels down can recite the company's strategic priorities but can't explain how their daily work connects to them. That's the strategy-execution gap, and it costs organizations billions in wasted effort.",
      
      "The translation problem has three failure modes: (1) Abstraction—the strategy is too high-level to guide decisions ('be customer-focused' doesn't tell anyone what to do differently). (2) Ambiguity—people interpret the same words differently ('improve quality' means different things to engineering vs. customer service). (3) Absence of trade-offs—the strategy doesn't say what NOT to do, so everything remains a priority, which means nothing is a priority.",
      
      "At Just Eat Takeaway, leadership declared: 'We're prioritizing retention over acquisition.' Clear strategy. But in execution: Marketing kept running acquisition campaigns (that's what they knew). Product kept building new-user features (that's what was in the roadmap). Operations kept optimizing for volume (that's how they were measured). Why? Because 'prioritizing retention' wasn't translated into: Marketing: shift 60% of budget to reactivation campaigns. Product: 3 of next 5 features must improve order frequency. Operations: track repeat order rate as primary metric. Without translation, strategy is wallpaper.",
      
      "The translation framework: (1) Strategic priority (what we're trying to achieve). (2) Leading indicators (how we'll measure progress). (3) Key initiatives (what projects move the needle). (4) Team-specific actions (what each team does differently). (5) Trade-offs (what we're deliberately NOT doing). Five levels from strategy to action. Most organizations stop at level 1 and wonder why nothing changes.",
      
      "Example translation: Strategic priority: 'Improve customer lifetime value.' Leading indicators: (a) Repeat purchase rate, (b) Average order value, (c) Retention at 90 days. Key initiatives: (a) Loyalty program launch, (b) Personalized recommendations engine, (c) Customer success proactive outreach. Team actions: Marketing—reduce acquisition spend 20%, reallocate to retention. Product—prioritize features that increase repeat usage. Engineering—invest in recommendation algorithm. CS—implement quarterly check-ins. Trade-offs: NOT pursuing new market segments this quarter. NOT building acquisition-focused features. Every team knows what to do AND what to stop.",
      
      "The test of good translation: Can someone four levels down explain: (1) What the strategy is, (2) How their work connects to it, (3) What they're doing differently because of it. If they can't answer all three, translation failed. Most executives test only #1 ('Do people know the strategy?'). That's not enough. Knowing isn't doing. The question is: Are people CHANGING BEHAVIOR because of the strategy? If not, it's not translated.",
      
      "The common objection: 'But our strategy needs to be flexible, we can't be too specific.' Wrong framing. Specificity isn't rigidity. You can be specific about current priorities while remaining flexible to change them. What kills execution isn't specificity—it's vagueness disguised as flexibility. 'We might do this, depending on market conditions' gives teams permission to keep doing what they're already doing. 'We're doing X for next 90 days, then reassessing' creates focus.",
      
      "In Brazilian Jiu Jitsu, your strategy might be 'control the opponent's posture.' Clear strategy. But execution requires translation: 'Break their grip on my collar with a two-handed strip. Establish my grip on their sleeve and collar. Pull down on the collar to break their posture. Maintain the position.' Five specific actions that translate strategy into technique. Without that translation, 'control posture' is just an intention, not a skill.",
      
      "The discipline: After strategy is declared, don't move to execution until translation is complete. Run translation workshops where each team answers: (1) What does this strategy mean for us? (2) What will we do differently? (3) What will we stop doing? (4) How will we measure success? Document the answers. Share them across teams. This creates horizontal alignment (teams understand how their work connects to others) and vertical alignment (leadership sees how strategy translates down).",
      
      "Next lesson: The Hoshin Kanri Approach—a structured methodology from Toyota for translating strategy into action with rigor. But first, take your organization's current strategic priorities. Ask: Could someone three levels down explain how their daily work connects to these priorities? If not, translation hasn't happened. That's your work. Strategy without translation is expensive theater that changes nothing."
    ],
    learningObjective: "You will learn why 67% of well-formulated strategies fail during execution and how to translate strategy through 5 levels (priority, indicators, initiatives, actions, trade-offs) that create behavioral change.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Hoshin Kanri Approach",
    content: [
      "Hoshin Kanri is Japanese for 'compass management'—pointing everyone in the same direction. Developed at Toyota, it's the methodology that allowed them to execute strategy across 300,000+ employees in dozens of countries with remarkable consistency. Most Western companies try to copy Toyota's manufacturing techniques. Few copy their strategy deployment system. That's a mistake. The system is the competitive advantage.",
      
      "The Hoshin Kanri process has four phases executed annually: (1) Establish strategic priorities (3-5 max), (2) Cascade to mid-level objectives, (3) Create action plans at team level, (4) Monthly review and adjust. The discipline: Each level negotiates with the level above (not receives orders) and each initiative has ONE owner (not committee ownership). This creates clarity through negotiation and accountability through ownership.",
      
      "Phase 1: Establish Strategic Priorities (top 3-5). Leadership identifies the 3-5 breakthrough objectives for the year. Not 'business as usual' goals ('maintain current performance'). Breakthrough objectives that require the organization to work differently. Example: 'Reduce customer churn from 25% to 15%.' This is ambitious, measurable, and time-bound. Crucially: Hoshin limits to 3-5 priorities. Why? Because humans can't focus on 20 things. Organizations that try to prioritize everything end up prioritizing nothing.",
      
      "Phase 2: Cascade to Mid-Level Objectives. Each strategic priority gets broken into 3-5 mid-level objectives owned by different functions. Example: 'Reduce churn 25% to 15%' cascades to: Product: 'Increase feature adoption in first 30 days by 40%.' CS: 'Implement proactive outreach for at-risk customers.' Engineering: 'Reduce product bugs that cause cancellations by 50%.' Marketing: 'Improve onboarding NPS from 6.5 to 8.0.' Each function negotiates their objective with leadership: Is this achievable? Do we have resources? What trade-offs are required?",
      
      "Phase 3: Create Action Plans at Team Level. Each mid-level objective cascades to team-level action plans. Example: Product's 'Increase feature adoption 40%' cascades to: (a) Ship guided onboarding flow Q1, (b) Implement in-app feature tours Q2, (c) Launch email re-engagement campaign Q2. Each action has: Owner (one name), Timeline (specific dates), Metrics (how success is measured), Resources required. The negotiation continues: Can your team deliver this with current resources? What support do you need? What might block you?",
      
      "Phase 4: Monthly Review and Adjust (Catchball). This is where Hoshin Kanri differs from typical strategic planning. Every month, teams review progress, surface blockers, and adjust. The term 'catchball' describes the two-way negotiation: teams throw issues up ('we're blocked on X'), leadership throws solutions down ('here's how we'll unblock you'). This isn't top-down command; it's continuous negotiation. Strategies that aren't working get adjusted. Resources get reallocated. The plan evolves based on reality.",
      
      "At Just Eat Takeaway, we implemented modified Hoshin Kanri for operations. Before: We had 23 'strategic initiatives' (which meant none were strategic). After: 3 breakthrough objectives (reduce delivery errors 40%, increase driver retention 25%, improve customer NPS to 8.5). Each objective had 3-4 functional owners with negotiated targets. Monthly catchball meetings kept us aligned. Result: We delivered 2 of 3 objectives fully and made 70% progress on the third. Under the old system, we'd have delivered 30% on 23 initiatives and called it success.",
      
      "The power of constraint: Hoshin forces prioritization by limiting to 3-5 priorities. This is uncomfortable. Executives want to say yes to everything. 'But this is important too!' Yes, but if everything is important, nothing is strategic. Strategic means: this is where we'll achieve breakthrough results that require different ways of working. Everything else is operational (maintain current performance). Both matter, but don't confuse them. Strategic priorities get breakthrough resources and attention. Operational priorities get maintenance resources.",
      
      "The negotiation discipline: At each cascade level, there's two-way dialogue. Not 'here's your target, go achieve it.' But 'here's the objective we need. Can you deliver it with current resources? What trade-offs are required? What support do you need?' This negotiation creates buy-in. When a team negotiates their target, they own it. When a target is imposed, they comply but don't commit. Hoshin's genius is building commitment through negotiation at every level.",
      
      "In Brazilian Jiu Jitsu, high-level strategy might be 'win by submission.' That cascades to mid-level: 'dominate top position.' That cascades to specific techniques: 'establish mount, maintain pressure, isolate an arm, execute arm-bar.' Each level is specific and measurable. And during a match, you adjust: if mount isn't working, you don't abandon the strategy (win by submission), you adjust the tactics (try back control instead). That's catchball—continuous adjustment while maintaining strategic direction.",
      
      "The implementation: Run Hoshin Kanri planning at the start of your fiscal year. Step 1: Leadership defines 3-5 breakthrough objectives (one full day workshop). Step 2: Cascade to functional owners over 2 weeks (negotiation meetings). Step 3: Teams create action plans over 2 weeks (with support from leadership). Step 4: Monthly reviews for the year (2-hour catchball meetings). Total planning time: roughly 40 hours spread across org. Compare to ad-hoc planning: hundreds of hours in disconnected meetings producing misaligned plans.",
      
      "Next lesson: Cascading Clarity—how to ensure everyone knows 'why' behind their work, creating intrinsic motivation and better decision-making. But first, if you're in planning season, consider Hoshin Kanri. The constraint of 3-5 priorities feels uncomfortable but creates the focus that allows breakthrough. Twenty priorities means twenty mediocre efforts. Five priorities means five breakthrough shots. Choose focused excellence over diffuse mediocrity."
    ],
    learningObjective: "You will learn Toyota's Hoshin Kanri methodology that deploys strategy across organizations through 4 phases (priorities, cascade, action plans, monthly catchball) with negotiation at each level creating commitment.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Cascading Clarity: Everyone Knows Why",
    content: [
      "Your engineer is building a feature. You ask: 'Why are we building this?' They answer: 'Because it's on the roadmap.' That's not why—that's where. 'Why' means: What customer problem does this solve? How does this connect to company strategy? What happens if we don't build it? When people know 'what' but not 'why,' they become order-takers, not problem-solvers. Cascading clarity means ensuring everyone understands the 'why' behind their work.",
      
      "Research from Teresa Amabile at Harvard studying 12,000+ daily work diaries found that 'meaningful work' was the #1 driver of motivation and performance. What makes work meaningful? Understanding how it contributes to a larger purpose. People who could connect their daily tasks to organizational outcomes had 2.5x higher engagement and 3x more creative problem-solving. But only 22% of employees strongly agreed they understood how their work contributed to organizational goals. That's an 78% waste of potential.",
      
      "The clarity cascade has three levels: (1) Organizational why (what's our mission/strategy?), (2) Team why (how does our team contribute?), (3) Individual why (how does my work matter?). Most organizations communicate level 1 (mission statements, town halls) but fail at levels 2-3. So people know the company's purpose abstractly but can't connect their Tuesday afternoon task to it. That disconnect kills motivation and decision quality.",
      
      "At Just Eat Takeaway, we had a data team building analytics dashboards. I asked: 'Why are you building this?' Answer: 'The VP requested it.' I pushed: 'But why did they request it? What decision will this dashboard enable?' They didn't know. So we set up a 15-minute call with the VP. The VP explained: 'I need to identify which restaurants are at risk of churning so operations can intervene early. Currently, we only react after they've quit.' Suddenly, the data team understood: we're not building a dashboard; we're building an early warning system that saves partnerships. Their motivation and execution quality both jumped.",
      
      "The practice: Implement 'why chains' for major work. For every project, document: (1) What are we building? (2) What problem does it solve? (3) For whom? (4) What happens if we don't do it? (5) How does this connect to company strategy? Five questions. Answer them before work starts. Share them with everyone involved. This creates shared understanding of purpose. When decisions arise mid-project ('Should we add this feature?'), teams can evaluate against the documented 'why' instead of guessing or asking permission.",
      
      "The leadership discipline: When assigning work, explain the why first, the what second. Bad: 'We need to reduce our AWS costs by 20%. Here's your target.' Good: 'Our burn rate is unsustainable at current runway. If we don't reduce infrastructure costs 20%, we'll need to cut headcount. That's why I'm asking you to find 20% AWS savings. Here's what I'm thinking, but I'm open to your ideas.' Same ask, different framing. The first creates compliance ('fine, I'll cut costs'). The second creates ownership ('I understand the stakes, let me solve this smartly').",
      
      "The test of cascading clarity: Random sampling. Walk up to any team member. Ask: (1) What are you working on today? (2) Why does it matter? (3) How does it connect to company priorities? If they can answer fluently, you have clarity. If they stumble or give vague answers, clarity hasn't cascaded. Do this monthly. The gaps you find are opportunities to improve communication. Most leaders assume clarity exists because they've communicated. But communication isn't clarity. Clarity is what the receiver understands, not what the sender said.",
      
      "In Brazilian Jiu Jitsu, you drill techniques repeatedly. But high-level instruction includes 'why': 'We're drilling this escape because when your opponent has mount, this is your highest-percentage path to safety. The alternative escapes work against white belts but fail against blue belts who know the counter. That's why we focus here first.' This 'why' context makes drilling less boring and more purposeful. You're not just repeating movements—you're building a specific capability for a specific situation.",
      
      "The mistake organizations make: They communicate strategy once (annual kickoff) and assume it cascades. It doesn't. Clarity degrades over time as people return to urgent tasks. New people join who weren't at the kickoff. Projects evolve. The 'why' needs constant reinforcement. Toyota's practice: Every meeting starts with a reminder of how this discussion connects to strategic priorities. Seems repetitive? That's the point. Repetition creates retention. Say it once, people forget. Say it constantly, it becomes the water they swim in.",
      
      "The implementation: Start your next project kickoff by documenting the 'why chain' together: What problem are we solving? For whom? Why does it matter? How does this connect to company strategy? Get everyone's input. Reach consensus. Document it. Put it in Slack. Reference it when making decisions ('Does this align with our documented why?'). When the project completes, revisit the why: Did we achieve it? What did we learn about the problem? This closes the loop and reinforces that 'why' isn't bureaucracy—it's the compass for decision-making.",
      
      "Next lesson: Priorities—the hardest word in leadership is 'no.' We'll learn how to say it strategically so your team focuses on what matters instead of spreading effort across everything. But first, do the random sampling test. Ask three people in your organization: What are you working on and why does it matter? Score their answers. If they can't fluently connect their work to strategic priorities, you've found your clarity gap. Fix it before moving to the next lesson."
    ],
    learningObjective: "You will learn how cascading clarity (organizational/team/individual 'why') increases engagement 2.5x and problem-solving 3x by helping people understand how their work contributes to larger purpose.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Priorities: Saying No to Say Yes",
    content: [
      "Your team has 47 items on the backlog. All labeled 'high priority.' Which means none are priorities. A priority is, by definition, something that comes BEFORE other things. If everything is high priority, you've just relabeled your to-do list. The hardest leadership skill isn't saying yes to good ideas—it's saying no to good ideas so you can say yes to great execution.",
      
      "Research from Bain & Company studying high-growth companies found that organizations with clear priorities (3-5 max) grew 3x faster than organizations with diffuse priorities (10+). Why? Because focus creates momentum. When your team knows the top 3 priorities, every decision becomes easier: Does this serve one of the top 3? Yes: green light. No: not now. When you have 15 priorities, every decision requires negotiation and political maneuvering. That coordination tax kills velocity.",
      
      "The prioritization problem has two sources: (1) Leaders can't say no (every idea sounds important in the moment). (2) Leaders confuse urgency with priority (whatever's on fire becomes the priority). Both lead to the same outcome: teams in constant reactive mode, jumping between initiatives, completing nothing fully. Research from McKinsey: Organizations with clear prioritization complete 80% of strategic initiatives. Organizations without: 20%. That's a 4x difference in execution effectiveness.",
      
      "The Eisenhower Matrix: Urgent-Important, Urgent-Not Important, Not Urgent-Important, Not Urgent-Not Important. Most leaders spend 80% of time in Urgent-Important (firefighting) and Urgent-Not Important (other people's emergencies). High performers spend 60% of time in Not Urgent-Important (strategic work that prevents fires). The only way to get there: ruthlessly eliminate Not Important work and delegate Urgent-Not Important. That requires saying no. A lot.",
      
      "At Just Eat Takeaway, we had a backlog explosion: 200+ items labeled priority. I implemented 'brutal prioritization': (1) Everything goes into one backlog (no team-specific backlogs—forces trade-offs). (2) Stack rank 1-200 (someone has to be #1, someone has to be #200). (3) Resource planning: We have capacity for 20 items per quarter. (4) Cut line: Items 21-200 go to 'not now' list. Teams howled. 'But item #47 is critical!' My response: 'Maybe, but it's not top 20. If it's truly critical, what in the top 20 should it replace?' This forced real trade-offs. Result: We completed 18 of 20 items that quarter. Previously, we'd have started 50 and completed 12.",
      
      "The 'not now' list is critical. When you say no, people hear 'never.' That creates resistance and bad feelings. When you say 'not now, it's #47 on the list,' people understand: there's a plan, there's visibility, and if priorities shift, we can revisit. The 'not now' list does three things: (1) Captures ideas so they're not lost. (2) Makes prioritization transparent (here's why X comes before Y). (3) Creates optionality (when top 20 items complete, we pull from the not-now list).",
      
      "The discipline: Regular reprioritization. Not set-it-and-forget-it. Every quarter, review the top priorities. Ask: Is this still true? Have market conditions changed? Did we learn something that changes importance? Be willing to kill projects mid-stream if they no longer serve priorities. Most organizations are terrible at this—once something starts, it has momentum and politics protecting it. High-performing organizations kill projects constantly. Amazon's Jeff Wilke: 'Good leaders relentlessly question priorities and kill projects that no longer matter.'",
      
      "The communication framework: When saying no, provide context. Bad no: 'We're not doing that.' Good no: 'Here's our top 3 priorities for this quarter [list them]. This doesn't serve any of the 3. If you believe it should be a priority, tell me which of the current 3 we should drop.' This frames the no as a trade-off, not a rejection. It also protects you from political pressure—if someone wants their project prioritized, they have to argue for de-prioritizing something else. That usually ends the conversation because people want their project added, not another project removed.",
      
      "In Brazilian Jiu Jitsu, you can't work on everything simultaneously. If you try to improve guard passing AND takedowns AND submissions AND escapes, you'll be mediocre at all four. High-level training focuses: 3 months drilling guard passing intensively. Then 3 months on submissions. Then 3 months on takedowns. This focused training produces breakthroughs. Diffuse training produces plateau. Your priorities are your focused training. Everything else goes to 'maintenance mode'—don't regress, but don't try to breakthrough.",
      
      "Purple Belt Integration: You've completed Strategic Clarity stripe. You learned: (1) How to translate strategy through 5 levels so it becomes action. (2) Hoshin Kanri's structured approach for strategy deployment. (3) Cascading clarity so everyone knows why their work matters. (4) Brutal prioritization that creates focus through saying no. These four capabilities transform strategic intent into executed results. Most organizations are great at strategy creation, terrible at strategy translation. You now have the frameworks that close that gap.",
      
      "Next stripe: Systems Thinking—we'll explore how to see the interconnections and feedback loops that create unintended consequences. But first, do brutal prioritization on your team's backlog. Stack rank everything. Draw the cut line based on capacity. Move everything below the line to 'not now.' Feel the discomfort. That discomfort is you learning to say no, which is the prerequisite for focused excellence. Leadership isn't about doing everything—it's about choosing the few things that matter and executing them brilliantly."
    ],
    learningObjective: "You will learn why clear priorities (3-5 max) enable 3x growth vs. diffuse priorities (10+) and how brutal prioritization with 'not now' lists creates focus without losing ideas.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe11Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your CEO declares: 'We're prioritizing customer experience.' Two weeks later, you discover teams interpreting this differently and priorities haven't actually changed. According to strategy translation principles, what's missing?",
    options: [
      "Better communication from the CEO",
      "Translation through 5 levels: priority, leading indicators, key initiatives, team-specific actions, explicit trade-offs",
      "More time for strategy to sink in",
      "Stronger accountability for execution"
    ],
    correctAnswer: 1,
    explanation: "Option B provides the 5-level translation framework that moves from strategy (abstract) to action (specific). Harvard research: 67% of strategies fail during execution because translation never happens. 'Prioritizing customer experience' is too vague to guide decisions. Translation means: Leading indicators = NPS, repeat rate. Key initiatives = loyalty program, personalized recs. Team actions = Marketing shifts 60% budget to retention, Product prioritizes repeat-user features. Trade-offs = NOT pursuing new markets this quarter. Option A (more communication) doesn't solve vagueness. Option C (waiting) won't create clarity. Option D (accountability) can't work when people don't know what to do differently. The test: Can someone four levels down explain how their work changed because of the strategy? If not, translation failed.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You're implementing Hoshin Kanri planning. Leadership identified 12 strategic priorities for the year. According to the Hoshin Kanri discipline, what should you do?",
    options: [
      "Cascade all 12 to create comprehensive alignment",
      "Force leadership to narrow to 3-5 breakthrough objectives—Hoshin requires constraint to create focus",
      "Divide the 12 across quarters (3 per quarter)",
      "Let each function choose which priorities to focus on"
    ],
    correctAnswer: 1,
    explanation: "Option B implements Hoshin's core discipline: limit to 3-5 priorities max. Toyota's insight: humans can't focus on 12 things. When everything is strategic, nothing is. Twelve priorities means twelve mediocre efforts. Five priorities means five breakthrough shots. Bain research: organizations with 3-5 clear priorities grow 3x faster than those with 10+. Option A dilutes focus. Option C delays but doesn't solve (you still have 12 priorities competing for attention in Q1). Option D creates misalignment. The discomfort of choosing 3-5 from 12 is the point—it forces real strategy (what are we betting on?) vs. fake strategy (we'll do everything!). Strategic priorities are where you'll achieve breakthrough requiring different ways of working. Everything else is operational (maintain current performance).",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You ask a team member: 'Why are you working on this?' They answer: 'Because it's on the roadmap.' According to cascading clarity principles, what does this response indicate?",
    options: [
      "Perfect clarity—they're following the plan",
      "Missing clarity—they know 'what' but not 'why' (what problem it solves, how it connects to strategy)",
      "Good enough—they're executing their assignment",
      "Normal—most people don't need to know the why"
    ],
    correctAnswer: 1,
    explanation: "Option B correctly diagnoses missing clarity. 'On the roadmap' is where, not why. Teresa Amabile's research: people who connect daily tasks to organizational outcomes have 2.5x engagement and 3x creative problem-solving. Only 22% of employees understand how their work contributes to goals—that's 78% wasted potential. The 'why chain' should include: What problem are we solving? For whom? Why does it matter? How does this connect to strategy? When people know this, they become problem-solvers (making smart decisions mid-project) vs. order-takers (just doing what they're told). The Just Eat Takeaway example: data team building 'a dashboard' vs. 'an early warning system to save partnerships'—same work, different motivation and execution quality. Option A/C accept inadequate clarity. Option D is leadership malpractice.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "Your team has 47 backlog items, all labeled 'high priority.' You have capacity for 15 items this quarter. According to brutal prioritization principles, what's your approach?",
    options: [
      "Try to do all 47 by working harder",
      "Let the team vote on which 15 to do",
      "Stack rank 1-47, draw cut line at 15, move items 16-47 to 'not now' list with visibility",
      "Do the 15 easiest items first to show momentum"
    ],
    correctAnswer: 2,
    explanation: "Option C implements brutal prioritization that creates focus. Bain research: organizations with clear priorities (3-5 max) complete 80% of strategic initiatives. Organizations without: 20%. That's 4x execution effectiveness. The 'not now' list is critical—when you say no, people hear 'never.' The not-now list captures ideas, makes trade-offs transparent, creates optionality. Option A creates the 50-started-12-completed pattern (diffuse effort, mediocre results). Option B (voting) doesn't improve decision quality. Option D optimizes for easy over important. The Just Eat Takeaway example: 200-item backlog → brutal prioritization to top 20 → completed 18 of 20. The discomfort of choosing is the point. Leadership isn't doing everything—it's choosing the few things that matter and executing brilliantly.",
    xpReward: 10
  }
];

export const stripe11Content = {
  lessons: stripe11Lessons,
  checkpoints: stripe11Checkpoints
};

