/**
 * PURPLE BELT - STRIPE 10: CROSS-TEAM ALIGNMENT
 * Theme: Coordinating across boundaries when teams have competing priorities
 * Focus: Breaking silos, alignment frameworks, systemic mapping, coordination under constraints
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

export const stripe10Lessons: Lesson[] = [
  {
    id: 1,
    title: "Breaking Down Silos",
    content: [
      "Engineering says the feature will take 6 weeks. Product says the client needs it in 3 weeks. Operations says any release needs 2 weeks of training. Finance says we're over budget. Each team is optimizing for their own success, creating collective failure. This is the silo problem—and it's killing more businesses than market competition ever will.",
      
      "Research from Deloitte studying 1,000+ organizations found that 'organizational silos' are cited as the #1 barrier to growth by 70% of executives. Not lack of talent, not market conditions, not technology gaps—internal coordination failure. McKinsey estimates that poor cross-functional collaboration costs large companies 20-30% of revenue annually through duplicated effort, misaligned priorities, and coordination overhead.",
      
      "Silos aren't created by bad people—they're created by incentive structures and information asymmetry. Engineering is measured on code quality and system stability, so they optimize for thorough testing (6 weeks). Product is measured on customer satisfaction and feature delivery, so they optimize for speed (3 weeks). Operations is measured on error-free deployment, so they optimize for training (2 weeks). Finance is measured on budget adherence. Each team is doing their job correctly according to their metrics—but their metrics don't align to the company's actual goal.",
      
      "The first step to breaking silos: Make the invisible visible. Create a 'coordination map' where you plot what each team is optimizing for and where those optimizations conflict. Engineering: Quality vs. Speed. Product: Features vs. Stability. Operations: Training vs. Launch. Finance: Budget vs. Investment. These aren't personality conflicts—they're structural tensions built into how teams are measured and rewarded.",
      
      "At Just Eat Takeaway, we had exactly this problem. Engineering wanted time for refactoring. Product wanted new features. Operations wanted system stability. All valid, all in tension. The breakthrough: We created a shared scorecard with ONE primary metric everyone owned together: customer-impacting incidents per million orders. Engineering could refactor if it reduced incidents. Product could ship features if incidents didn't increase. Operations could improve processes if incidents dropped. Suddenly, we had aligned incentives.",
      
      "The root cause of silos: Teams are rewarded for local optimization (how well MY team performs) instead of global optimization (how well the SYSTEM performs). Game theory research shows that when individuals optimize for local rewards in interconnected systems, you get 'Nash equilibrium' outcomes that are worse for everyone than if they'd coordinated. Example: Every team trying to 'win' their budget negotiation results in company-wide budget battles that waste executive time and create resentment.",
      
      "The solution framework: (1) Create shared goals that require cross-team success. (2) Make dependencies visible so teams understand impact. (3) Build coordination mechanisms (stand-ups across teams, liaison roles, joint planning). (4) Reward collaboration explicitly (not just individual team performance). (5) Rotate people across teams to build empathy and shared context. Most organizations do #3 (coordination mechanisms) without #1-2-4-5, which is why the mechanisms become bureaucracy that everyone resents.",
      
      "The hardest conversation: Telling high-performing teams that their local success is creating system-wide failure. Example: Your sales team is crushing quota by promising features that don't exist. Individually, they're heroes. Systemically, they're creating coordination chaos (product has to prioritize unplanned work, engineering has to rush implementations, customer success has to manage disappointed customers). The conversation: 'You're winning your game but breaking everyone else's game. We need to redefine winning.'",
      
      "In Brazilian Jiu Jitsu, there's a training format called 'king of the hill' where one person stays in the middle and new challengers rotate in. If you're the king, your goal is to survive as many rounds as possible. But if EVERYONE is trying to be king, no one develops collaborative techniques or helps their teammates improve. High-performing academies balance king-of-the-hill (individual excellence) with team drilling (collective improvement). Both matter. Most organizations only reward king-of-the-hill.",
      
      "The practice: Map your team's incentives and the tensions they create. Ask: What is my team measured on? What are our neighbor teams measured on? Where do those metrics create trade-offs (one team wins, another loses)? That's where silos live. Then ask: What metric would require all these teams to win or lose together? That's your candidate for a shared goal. Document it. Pitch it to leadership. Most silo problems aren't relationship problems—they're measurement problems disguised as people problems.",
      
      "Next lesson: The Alignment Accelerator Framework—a structured process for getting rapid cross-team alignment when you can't wait months. But first, do this diagnostic: List the 3 teams you interact with most. For each one, identify: What do they optimize for? Where does that conflict with what you optimize for? Seeing the structure of the problem is half the solution. The other half is redesigning incentives—which we'll tackle next."
    ],
    learningObjective: "You will learn why silos cost 20-30% of revenue and how to diagnose the incentive misalignments that create local optimization at the expense of system-wide performance.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Alignment Accelerator Framework",
    content: [
      "You need three teams aligned on a strategy by end of week. Normal process: 2-3 weeks of meetings, back-and-forth emails, calendar tetris finding time when everyone's available, gradual consensus-building. You don't have 2-3 weeks. You have 5 days. This is when most leaders either give up or make unilateral decisions that create later resistance. There's a third option: The Alignment Accelerator Framework.",
      
      "This framework comes from studying how high-velocity teams (Amazon, Netflix, SpaceX) achieve cross-team alignment in days, not weeks. The core insight: Traditional alignment approaches are serial (Team A agrees, then Team B, then Team C) and consensus-driven (everyone must agree before proceeding). The Accelerator is parallel (all teams engage simultaneously) and commitment-driven (buy-in, not agreement).",
      
      "The Framework has 5 phases over 3 days: Day 1 Morning: Rapid Context Sharing (90 min). Day 1 Afternoon: Parallel Problem-Solving (2 hours). Day 2 Morning: Synthesis & Proposal (60 min). Day 2 Afternoon: Challenge & Refine (90 min). Day 3 Morning: Commit & Document (30 min). Total: 5.5 hours over 3 days. Compare to traditional: 10-15 hours over 2-3 weeks. Faster AND more effective.",
      
      "Phase 1: Rapid Context Sharing (Day 1 Morning, 90 min). All teams present simultaneously in one room: (a) Current state (10 min per team), (b) Constraints and non-negotiables (5 min per team), (c) What success looks like (5 min per team). No debate yet—just information download. The goal: Everyone hears everyone else's context at once. No telephone game, no information asymmetry. By end of 90 minutes, shared understanding exists.",
      
      "Phase 2: Parallel Problem-Solving (Day 1 Afternoon, 2 hours). Break into mixed teams (not by function—deliberately mix engineers, product, ops, finance). Each mixed team generates 3 potential solutions to the alignment challenge. The mixing is crucial: it breaks down 'us vs. them' and forces people to think systemically. Each mixed team presents their 3 solutions (5 min per team). You now have 9-12 options on the table, generated collaboratively.",
      
      "Phase 3: Synthesis & Proposal (Day 2 Morning, 60 min). Leadership (or designated decision-makers) takes the 9-12 options and synthesizes into ONE proposal that integrates the best elements. This isn't voting or averaging—it's pattern recognition across proposals. Often, 3 different proposals are actually variations on the same insight. The synthesis document includes: What we're proposing, Why (which problems it solves), Trade-offs acknowledged, Implementation plan, Success metrics. Distributed by end of Day 2 morning.",
      
      "Phase 4: Challenge & Refine (Day 2 Afternoon, 90 min). Reconvene all teams. Present the synthesis proposal. Then: structured critique. Each team gets 15 minutes to challenge assumptions, surface risks, identify gaps. The key: This is structured disagreement, not open debate. You're not reopening problem-solving—you're stress-testing the proposal. Leaders take notes, make real-time adjustments where valid, document where they're holding the line and why.",
      
      "Phase 5: Commit & Document (Day 3 Morning, 30 min). Final proposal presented with changes from Day 2 critique. Then go around the room: Each team explicitly commits. 'Are you committed to making this work, even if it's not your first choice?' Get verbal yes from each team lead. Then document using Clarity Canvas (from previous stripe): decision, ownership, timeline, metrics, revisit conditions. Done. Three days, full alignment, documented commitment.",
      
      "At Just Eat Takeaway, we used this to align Engineering, Operations, and Customer Service on a major platform change that normally would have taken 6 weeks of meetings. Ran the Accelerator over 3 days. Got full alignment. Implementation started Day 4. Mid-implementation, when conflicts arose, we referred back to the documented commitment. No relitigating, just execution. Saved 4+ weeks of coordination time.",
      
      "Why this works when traditional approaches fail: (1) Parallel > Serial—everyone engages at once, not sequentially. (2) Time-boxing creates urgency—unlimited time allows drift. (3) Mixed teams break silos—you're not negotiating across functions, you're problem-solving across functions. (4) Synthesis by leadership prevents lowest-common-denominator compromise. (5) Structured critique channels disagreement productively. (6) Explicit commitment prevents later backsliding. Each element is intentional.",
      
      "The objection: 'My teams can't dedicate 5.5 hours over 3 days.' Counter-question: How many hours are you currently spending in coordination meetings, email threads, and rework due to misalignment? Probably 15-20 hours spread across the teams. The Accelerator isn't adding time—it's concentrating coordination into one intensive burst instead of diffusing it across weeks. And it produces better outcomes because decisions happen while context is fresh, not after it's degraded through serial transmission.",
      
      "In Brazilian Jiu Jitsu, 'mat time' is the best predictor of improvement. But there's a difference between 100 scattered 10-minute sessions and 10 focused 100-minute sessions. The concentrated sessions produce faster learning because your body and brain stay in 'training mode' without interruption. Same with alignment: concentrated, intensive alignment sessions beat scattered, diffuse coordination meetings. The intensity is the feature, not the bug.",
      
      "Next lesson: Systemic Mapping—how to visualize dependencies and bottlenecks across teams so everyone sees the whole board. But first, if you have a cross-team alignment challenge brewing, consider running the Accelerator. Gather the key teams. Schedule 3 days. Run the 5 phases. You'll be shocked how much clarity emerges when you force parallel, intensive engagement instead of allowing serial, diffuse coordination."
    ],
    learningObjective: "You will learn the 5-phase Alignment Accelerator Framework that achieves cross-team alignment in 3 days instead of 3 weeks through parallel engagement and structured commitment.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Systemic Mapping: See the Whole Board",
    content: [
      "Your engineering team is blocked waiting for designs. Design is blocked waiting for customer research. Research is blocked waiting for engineering to build the prototype they need for testing. This circular dependency—where everyone is blocked by everyone else—is invisible until you map it. Most coordination failures aren't caused by bad people. They're caused by invisible system dynamics that no one person can see.",
      
      "Systems thinking research from MIT's Peter Senge shows that 90% of operational problems are system-level (structure, processes, dependencies) but 90% of managers' attention goes to individual-level (who screwed up, who's not doing their job). This is called 'fundamental attribution error'—blaming people for system failures. Systemic mapping corrects this by making the structure visible so you can fix the actual problem.",
      
      "Systemic Mapping is a visual technique where you diagram: (1) All teams/functions involved in a value stream, (2) Dependencies between them (who needs what from whom), (3) Bottlenecks (where work piles up), (4) Feedback loops (where outputs from one team affect inputs to another), (5) Constraints (capacity limits, policy restrictions). Once mapped, the coordination problems become obvious—and often, the solutions are too.",
      
      "The mapping process: Gather representatives from each team involved in a value stream (example: customer acquisition, from marketing through onboarding). Give everyone sticky notes. Step 1: Map the flow (customer journey or work process). Step 2: Add each team's involvement (where do you touch this?). Step 3: Mark dependencies (arrows showing who needs what). Step 4: Identify waits and bottlenecks (where does work queue?). Step 5: Discuss (where are the problem areas?). Total time: 90-120 minutes. Output: Shared understanding of how the system actually works.",
      
      "At Just Eat Takeaway, we mapped the 'new restaurant onboarding' process. Before mapping: each team thought the bottleneck was someone else's fault. Sales blamed operations ('they're too slow'). Operations blamed tech ('the platform isn't ready'). Tech blamed legal ('contract reviews take forever'). After mapping: we discovered the real bottleneck was a manual data entry step that required 14 fields from 3 different teams who weren't coordinating. No one person could see this—it only became obvious in the map. We automated it, onboarding time dropped by 40%.",
      
      "The power of visualization: Eliyahu Goldratt's Theory of Constraints says every system has ONE primary bottleneck at any time. Improving anything other than the bottleneck doesn't improve system throughput. But you can't identify the bottleneck without seeing the whole system. Most teams optimize their local piece ('we're doing great!') while the system suffers because the bottleneck is three steps downstream. Systemic mapping reveals the bottleneck so effort goes where it matters.",
      
      "Common patterns that emerge from mapping: (1) Hidden handoffs—work passes between teams with no clear ownership transition. (2) Duplicate work—two teams doing similar work because they don't know the other exists. (3) Information silos—one team has data another team needs but there's no sharing mechanism. (4) Capacity mismatches—upstream team produces work faster than downstream team can consume. (5) Policy constraints—rules that made sense once but now create bottlenecks. All invisible in normal operations, obvious in the map.",
      
      "The facilitation technique: When facilitating systemic mapping, use these prompts: 'Where does your team get blocked waiting for others?' 'Where do other teams get blocked waiting for you?' 'What information do you need that you don't have?' 'Where does work queue up?' Don't let people blame—redirect to structure: 'Not whose fault, but what's the structural reason for the delay?' This keeps conversation productive.",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'positional hierarchy'—certain positions are better than others (mount beats guard beats being on bottom). If you don't understand positional hierarchy, you waste energy on low-value movements. Once you understand the hierarchy, you optimize: always work toward better positions, never voluntarily move to worse ones. Systemic mapping creates positional hierarchy for business operations: here's where leverage exists, here's where bottlenecks live, here's where effort has maximum impact.",
      
      "The implementation: After you create a systemic map, ask: (1) Where's the current bottleneck? (2) What would happen if we increased capacity there? (3) What would become the new bottleneck? (4) Is that a better problem to have? Theory of Constraints teaches that relieving one bottleneck just reveals the next one—that's how systems improve. You're not trying to eliminate all bottlenecks (impossible), you're trying to make better bottlenecks that allow more throughput.",
      
      "Advanced technique: Map feedback loops. Feedback loops are where output from Team A affects input to Team A later. Example: Engineering ships buggy code → Customer Support gets flooded with tickets → Engineering has to context-switch to firefighting → Code quality drops further → More bugs → More tickets. This is a reinforcing negative loop. Until you see it mapped, it feels like 'we're just really busy.' Once mapped, you see: the busyness is caused by the loop. Break the loop (invest in QA upfront), and the busyness decreases.",
      
      "Next lesson: Coordination Under Constraints—what to do when you can't add resources, can't change structure, and still need to coordinate better. But first, run a systemic mapping session for one value stream in your organization. Gather 5-8 people from different teams. Follow the 5-step process. Spend 90 minutes. What you'll discover: Most of your coordination problems aren't people problems or effort problems. They're visibility problems. Once everyone sees the system, the fixes often become obvious."
    ],
    learningObjective: "You will learn systemic mapping techniques that make invisible dependencies and bottlenecks visible, enabling teams to fix structural problems instead of blaming people.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Coordination Under Constraints",
    content: [
      "You need better cross-team coordination. But you can't hire more people. You can't restructure the organization. You can't change the incentive system. Budget is frozen. Headcount is locked. Org chart is untouchable. Most leaders hear these constraints and give up: 'We're structurally broken, nothing I can do.' Wrong. You can't change the structure, but you can change the coordination mechanisms within it. This is coordination under constraints.",
      
      "Research from organizational design studies shows that formal structure (org chart, reporting lines) accounts for only 40% of how work actually gets done. The other 60% is informal networks, coordination mechanisms, and interpersonal relationships. Most leaders obsess over the 40% they can't change and ignore the 60% they can. That's like having control over 60% of your budget but only focusing on the 40% you don't control. Backwards thinking.",
      
      "The constraint-navigation framework: (1) Accept what you can't change. (2) Identify what you CAN change within constraints. (3) Design high-leverage coordination mechanisms. (4) Test, measure, iterate. Most leaders skip step 2—they assume if they can't change structure, they can't change anything. False. Within any structure, you have degrees of freedom in HOW teams interact.",
      
      "High-leverage coordination mechanisms you can implement without permission: (1) Cross-functional stand-ups (15 min daily, rotating leads from each team, focused on dependencies). (2) Liaison roles (one person from each team attends the other's planning). (3) Shared documentation (single source of truth for decisions, not scattered emails). (4) Joint retrospectives (monthly review of cross-team friction points). (5) Shadow days (team members spend a day with adjacent team to build empathy). All of these require zero budget, zero org change, zero executive approval.",
      
      "At Just Eat Takeaway, we had a structural nightmare: Engineering, Operations, and Customer Service reported to different VPs who rarely aligned. I couldn't change the structure (tried, got told no). So I implemented: (a) Daily 10-minute cross-team standup at 9 AM (one rep from each team), (b) Shared Slack channel with clear protocols for escalations, (c) Bi-weekly joint retros where we reviewed 'what friction did we create for each other?', (d) Quarterly shadow days where engineers spent a day in operations and ops spent a day with engineers. Coordination improved dramatically. Structure never changed.",
      
      "The key insight: Coordination isn't about structure—it's about information flow and mutual understanding. If teams understand each other's constraints and have regular touchpoints for surfacing dependencies, they coordinate well regardless of reporting structure. If they don't, even perfect org structures fail. Example: Two teams reporting to the same VP but located in different buildings with no regular meetings will coordinate worse than two teams under different VPs who have daily stand-ups together.",
      
      "The mistake most leaders make: They implement coordination mechanisms but don't protect them. Someone says 'Do we really need this daily standup?' and the leader caves: 'Sure, let's make it weekly.' Wrong. Coordination mechanisms only work if they're consistent. The value is in the rhythm, not the individual meeting. Break the rhythm, lose the value. Research shows coordination quality correlates with touchpoint consistency more than touchpoint duration. 10 minutes daily beats 60 minutes weekly.",
      
      "The discipline: Once you establish a coordination mechanism, make it non-negotiable for 8 weeks. Don't evaluate after week 1 ('this feels like overhead'). Wait 8 weeks. By then, the mechanism has created rhythm, shared context has accumulated, and value becomes obvious. Most leaders kill coordination mechanisms in week 2 before they've had a chance to work. This is like planting a seed, digging it up after 3 days to check if it's growing, then declaring 'seeds don't work.'",
      
      "In Brazilian Jiu Jitsu, when you're in a bad position (someone has your back, about to choke you), you can't fundamentally change the position instantly. But you can make small adjustments: turn your head to protect the neck, grip their wrist to slow the choke, breathe to stay calm. These micro-adjustments buy time and create opportunities for escape. You're constrained, but you're not helpless. Coordination under constraints is the same: you're making micro-adjustments to information flow and touchpoints that add up to better coordination.",
      
      "The implementation: Pick one cross-team friction point that causes regular problems. Design ONE coordination mechanism to address it. Example: Engineering and Product don't align on priorities → Implement weekly 30-minute joint planning where both teams see each other's roadmaps and surface dependencies. Start it. Protect it for 8 weeks. Measure: Did coordination improve? Did rework decrease? If yes, add another mechanism for another friction point. Layer mechanisms over time, don't try to fix everything at once.",
      
      "Purple Belt Integration: You've completed cross-team alignment stripe. You've learned: (1) How to diagnose silo incentives that create local optimization. (2) The 5-phase Alignment Accelerator for rapid cross-team alignment. (3) Systemic mapping to make dependencies visible. (4) Coordination mechanisms that work within structural constraints. These aren't theoretical—they're battle-tested frameworks that high-performing organizations use to coordinate at scale despite imperfect structures.",
      
      "Next stripe: Strategic Clarity—we'll tackle the challenge of translating high-level strategy into actionable execution so everyone knows 'why' behind their work. But first, implement one constraint-friendly coordination mechanism this week. Don't wait for permission to restructure. Don't wait for perfect conditions. Just pick one friction point and design one touchpoint to address it. Coordination improves through iteration, not through perfect initial design."
    ],
    learningObjective: "You will learn how to improve cross-team coordination within structural constraints by implementing high-leverage mechanisms (stand-ups, liaisons, shared docs) that require zero budget or org changes.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe10Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your Engineering team (measured on code quality) wants 6 weeks for a feature. Your Product team (measured on delivery speed) wants it in 3 weeks. Your Operations team (measured on error-free deployment) wants 2 weeks of training before any launch. According to silo-breaking principles, what's the root problem?",
    options: [
      "Engineering is being too perfectionist",
      "Product has unrealistic expectations",
      "The teams have misaligned incentives—each optimizing locally for their metrics rather than a shared system-level goal",
      "You need to hire a project manager to coordinate"
    ],
    correctAnswer: 2,
    explanation: "Option C correctly diagnoses the structural problem. Each team is doing their job correctly according to THEIR metrics—but their metrics create trade-offs where one team's win is another's loss. Deloitte research: 70% of executives cite silos as the #1 growth barrier, costing 20-30% of revenue. The solution isn't better people or more coordination meetings—it's redesigning incentives around a shared goal all teams own together (e.g., 'customer-impacting incidents per release'). Options A and B blame individual teams when it's a system design problem. Option D adds coordination overhead without fixing the incentive misalignment. The insight: Silos aren't relationship problems disguised as people problems—they're measurement problems disguised as people problems.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You need Engineering, Product, and Operations aligned on a platform change by end of week. Normal process takes 2-3 weeks. According to the Alignment Accelerator Framework, what's your approach?",
    options: [
      "Schedule back-to-back meetings with each team until alignment emerges",
      "Make a unilateral decision to save time",
      "Run the 5-phase Accelerator over 3 days: Context sharing, parallel problem-solving in mixed teams, leadership synthesis, structured critique, explicit commitment",
      "Extend the deadline to allow proper alignment time"
    ],
    correctAnswer: 2,
    explanation: "Option C implements the Alignment Accelerator that achieves alignment in 3 days vs. 3 weeks. Key elements: parallel engagement (all teams at once, not serial), mixed teams (breaks silos), synthesis by leadership (not consensus), structured critique (channels disagreement), explicit commitment (prevents backsliding). Total time: 5.5 hours over 3 days. Option A is the slow serial approach that takes weeks. Option B creates decision but not buy-in, leading to resistance during execution. Option D accepts the constraint when it's solvable. The framework works because it concentrates coordination into intensive bursts while context is fresh, rather than diffusing it across weeks where context degrades.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You mapped your 'customer onboarding' process and discovered: Sales passes leads to Operations, Operations passes to Tech, Tech passes to Legal, Legal passes back to Sales. Work piles up at Legal (reviews take 5 days, everyone else takes 1 day). According to Theory of Constraints, where should you focus improvement efforts?",
    options: [
      "Improve Sales efficiency to generate more leads faster",
      "Optimize Operations processes to handle volume better",
      "Increase Legal capacity or streamline Legal review process (the bottleneck)",
      "Improve all four areas equally"
    ],
    correctAnswer: 2,
    explanation: "Option C correctly applies Theory of Constraints: every system has ONE primary bottleneck. Improving anything other than the bottleneck doesn't improve system throughput. Legal is the bottleneck (5 days vs. 1 day for others)—work queues there. Options A and B optimize non-bottlenecks, which is waste. Option D dilutes effort. Goldratt's insight: Identify the bottleneck, elevate it (increase capacity or reduce work), then find the next bottleneck. The pattern from Just Eat Takeaway: they mapped onboarding, found a 14-field manual data entry bottleneck no one could see individually, automated it, onboarding time dropped 40%. Systemic mapping makes bottlenecks visible so effort goes where it creates leverage.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You need better Engineering-Product coordination but: you can't change reporting structure, can't hire, budget is frozen. According to 'coordination under constraints' principles, what CAN you do?",
    options: [
      "Nothing—coordination is structurally impossible",
      "Wait until next reorg when structure might improve",
      "Implement coordination mechanisms within current structure: daily cross-team standup, shared documentation, bi-weekly joint retros, shadow days",
      "Escalate to executives to force structural change"
    ],
    correctAnswer: 2,
    explanation: "Option C leverages the 60% of coordination that comes from informal mechanisms, not formal structure. Research shows structure (org chart) accounts for only 40% of how work gets done—the other 60% is networks, touchpoints, relationships. All four mechanisms in Option C require zero budget, zero approval, zero structure change. Option A accepts defeat when you control 60% of the solution. Option B waits for conditions that may never arrive. Option D ignores that you have agency within constraints. The Just Eat Takeaway example: they implemented daily standup, shared Slack protocols, joint retros, shadow days—coordination improved dramatically despite structure staying broken. Key: Protect mechanisms for 8 weeks before evaluating. Don't kill them in week 2 before they've created rhythm.",
    xpReward: 10
  }
];

export const stripe10Content = {
  lessons: stripe10Lessons,
  checkpoints: stripe10Checkpoints
};

