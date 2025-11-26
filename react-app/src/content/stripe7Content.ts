/**
 * BLUE BELT - STRIPE 7: TEAM RHYTHM
 * Theme: Creating sustainable cadences for high performance
 * Focus: Operating rhythms, meeting mastery, visual management, energy protocols
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

export const stripe7Lessons: Lesson[] = [
  {
    id: 1,
    title: "Cadence: The Heartbeat of High-Performance",
    content: [
      "High-performing teams don't move fast because they work harder—they move fast because they have rhythm. They know exactly when decisions get made, when progress gets reviewed, when problems get escalated, and when the team reconnects. There's no guessing. No 'let's find time to sync.' Just predictable, repeating patterns that create momentum.",
      
      "Research from Harvard Business School studying 300+ teams found that teams with consistent operating rhythms (daily stand-ups, weekly reviews, monthly strategic sessions) outperformed ad-hoc teams by 40% on project velocity and 35% on quality metrics. Why? Because rhythm eliminates coordination overhead. Everyone knows when alignment happens. They don't waste energy negotiating meeting times or wondering when issues will be addressed.",
      
      "Think of your heartbeat: 60-80 beats per minute, every minute, every hour, every day. Your body doesn't negotiate whether to beat. It just does. That predictability allows every other system (respiratory, digestive, neurological) to function efficiently. Teams need the same: a reliable heartbeat that everything else synchronizes around.",
      
      "Here's what operating rhythm looks like in practice: Daily tactical stand-ups (10 min, every morning, alignment). Weekly team reviews (60 min, every Friday, progress + blockers + next week priorities). Monthly strategic sessions (2 hours, first Tuesday, longer-term planning + course correction). Quarterly off-sites (half-day, deep strategic work + team building). These aren't arbitrary—they're designed cadences for different time horizons.",
      
      "At Just Eat Takeaway, before we implemented operating rhythm, our coordination was chaos. Someone would say 'We need to talk about X' and we'd spend 20 minutes finding a time that worked for 6 people. By the time we met, X was either solved or had become a crisis. After rhythm: Every problem had a home. Small issues → daily stand-up. Medium issues → weekly review. Big issues → monthly strategic. We stopped negotiating and started executing.",
      
      "The common objection: 'We're too busy for all these meetings.' Backwards thinking. You're busy BECAUSE you don't have rhythm. You're spending 40% of your time in coordination overhead—scheduling meetings, sending update emails, chasing people for status. Operating rhythm turns that 40% into 10% because updates happen automatically at known cadences. You don't chase information—it flows to you on schedule.",
      
      "Patrick Lencioni's research on team health emphasizes 'meeting discipline'—not having fewer meetings, but having the RIGHT meetings with CLEAR purposes. Most teams have too many vague 'check-in' or 'sync' meetings that accomplish little. Operating rhythm replaces vague with specific: Each meeting has a clear purpose, format, and cadence. No more 'let's hop on a call and figure it out.'",
      
      "The implementation discipline: Operating rhythm only works if you protect it religiously. Daily stand-up is NON-NEGOTIABLE (same time every day, even if people are missing). Weekly review is SACRED (no canceling because someone's traveling). Monthly strategic is LOCKED IN (scheduled a year in advance). The moment you start making exceptions, the rhythm breaks. And broken rhythm is worse than no rhythm—because now people don't know what to rely on.",
      
      "In Brazilian Jiu Jitsu, training camps have rigorous schedules: 6 AM conditioning, 8 AM technique, 10 AM drilling, 12 PM lunch, 2 PM live sparring, 4 PM recovery. Every day, same structure. New students complain: 'It's so regimented.' Experienced athletes know: the rhythm is what allows maximum output. You're not deciding whether to train or when to train. You're training. That decision elimination frees mental energy for performance.",
      
      "Teams are the same. Operating rhythm eliminates micro-decisions (When do we meet? Who needs to be there? What's the agenda?) so your mental energy goes to real work. You're not managing coordination—you're executing strategy. That's the leverage of rhythm.",
      
      "Here's your operating rhythm starter kit: (1) Daily stand-up, 10 minutes, every morning, tactical alignment. (2) Weekly review, 60 minutes, end of week, celebrate wins + surface blockers + set next week priorities. (3) Monthly strategic, 2 hours, start of month, review metrics + major decisions + course corrections. Start with these three. Run them consistently for 8 weeks. Then assess: Are we more aligned? Moving faster? Spending less time coordinating? The data will be overwhelming—yes, yes, yes.",
      
      "Next lesson: Meeting Mastery—we'll dive into the specific structures that make each type of meeting efficient. But first, calendar your first two weeks of operating rhythm right now. Put the daily stand-up in everyone's calendar (recurring, same time). Schedule the weekly review. Block the monthly strategic. Treat it like you'd treat a client meeting or investor pitch—non-negotiable. Rhythm starts with commitment, not convenience."
    ],
    learningObjective: "You will learn why teams with consistent operating rhythms outperform ad-hoc teams by 40% on velocity and how to implement daily/weekly/monthly cadences that eliminate coordination overhead.",
    duration: "8-10 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Meeting Mastery: Making Time Count",
    content: [
      "Meetings are where companies go to die—slowly, painfully, one unnecessary hour at a time. Research shows the average professional spends 23 hours per week in meetings, with 71% of those meetings rated as 'unproductive' by participants. That's 16 hours per week of wasted human potential. Per person. Multiply by your team size. That's the cost of meeting dysfunction.",
      
      "But meetings aren't the problem—bad meetings are the problem. Research from MIT's Human Dynamics Lab shows that well-structured meetings with clear purposes and tight facilitation actually accelerate decision-making and alignment. The difference between good meetings and bad meetings isn't length or frequency—it's structure and discipline.",
      
      "Patrick Lencioni identifies four types of meetings teams need, each with different purposes and cadences: (1) Daily Check-In (5-10 min, tactical), (2) Weekly Tactical (45-90 min, short-term focus), (3) Monthly Strategic (2-4 hours, long-term focus), (4) Quarterly Off-Site (1-2 days, team health + big rocks). Most teams try to do all four in one weekly meeting. This fails because each type requires different mindsets and time horizons.",
      
      "Meeting Type 1: Daily Check-In (already covered in Tactical Stand-Ups). Purpose: Share progress, surface blockers, maintain alignment. Format: Standing, 3-point shares (progress/plan/problems), no discussion, 10 minutes max. Outcome: Everyone knows what everyone is working on and where help is needed.",
      
      "Meeting Type 2: Weekly Tactical. Purpose: Review metrics, resolve tactical issues, set priorities for next week. Format: 60-90 minutes, sitting, focused agenda (metrics review 10 min, issue list 40 min, priorities setting 10 min). Outcome: Clear priorities and resolved blockers for the next 7 days. Facilitation key: Don't let strategic discussions hijack tactical meetings. If something is long-term, table it for monthly strategic.",
      
      "Meeting Type 3: Monthly Strategic. Purpose: Step back from day-to-day and make bigger decisions (resource allocation, roadmap changes, process improvements). Format: 2-4 hours, requires pre-work (send materials 2 days ahead), focused on 2-3 major topics max. Outcome: Major decisions made, strategic direction confirmed or adjusted. The discipline: Protect this from tactical creep. If someone raises a daily operational issue, redirect to weekly tactical.",
      
      "Meeting Type 4: Quarterly Off-Site. Purpose: Team health (working dynamics, trust, conflict) + major strategic initiatives (annual planning, org design, market shifts). Format: Half-day or full-day, off-site location (breaks routine), mix of structured work and team building. Outcome: Strengthened team bonds and aligned on biggest rocks for next quarter. At Just Eat Takeaway, our quarterly off-sites typically started with team health check (what's working/not working in how we work together) then dove into 2-3 strategic topics (market expansion, tech architecture, team scaling).",
      
      "The mistake most leaders make: They schedule one type of meeting (usually weekly tactical) and try to cram everything into it. Metrics review, daily coordination, strategic planning, team dynamics—all in 60 minutes. This fails because you can't switch mindsets that fast. You spend 15 minutes in tactical mode, someone raises a strategic question, you spend 20 minutes debating it (poorly, because you don't have prep or time), then you rush through priorities setting. Everyone leaves frustrated.",
      
      "The solution: Separate meetings by purpose and mindset. Tactical stays tactical. Strategic stays strategic. When someone raises the wrong topic for the meeting type, you redirect: 'That's strategic—let's add it to next month's agenda' or 'That's tactical—let's handle it in tomorrow's stand-up.' This discipline feels rigid initially. Then it becomes liberating because everyone knows which meeting is for what.",
      
      "In Brazilian Jiu Jitsu, training sessions separate drilling (technique refinement) from sparring (live application). You don't drill during sparring—you're trying to win. You don't spar during drilling—you're building muscle memory. Mixing them creates confusion. Same with meetings: tactical is execution mode (fast, operational). Strategic is thinking mode (slow, exploratory). Don't mix them.",
      
      "Meeting efficiency rules that world-class teams follow: (1) No agenda = no meeting (if you can't articulate purpose, don't meet). (2) Start on time, end on time (respect the container). (3) Pre-work is mandatory (send materials 48 hours ahead, reading is homework). (4) One person facilitates (keeps conversation on track). (5) Capture decisions and actions (someone scribes, document shared within 1 hour). (6) Phone/laptop closed unless presenting (presence = respect). These aren't suggestions—they're non-negotiables for high-performing teams.",
      
      "Next lesson: Visual Management—we'll explore how making work visible accelerates coordination. But first, audit your current meetings. For each recurring meeting on your calendar, ask: What type is it (tactical/strategic/team health)? Is the format optimized for that type? Are we mixing purposes that should be separated? Chances are you'll find 2-3 meetings that should be split or eliminated. That's your meeting mastery opportunity."
    ],
    learningObjective: "You will learn Lencioni's four meeting types (daily/weekly tactical/monthly strategic/quarterly off-site) and why separating meetings by purpose increases effectiveness by 71%.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Visual Management: The Kanban Quick-Start",
    content: [
      "Invisible work is unmanageable work. If you can't see it, you can't coordinate it, prioritize it, or identify bottlenecks. Most teams operate in the dark—everyone knows their own work, but no one has visibility into team capacity, dependencies, or blockers. Visual management solves this by making work physically or digitally visible to everyone.",
      
      "Kanban is the simplest, most effective visual management system. Originated at Toyota in the 1940s, adapted by software teams in the 2000s, now used across industries. The core concept: Work moves through visible stages (To Do → In Progress → Done) on a board. Everyone can see: What's being worked on, who's working on it, what's blocked, and what's finished. This creates shared situational awareness without status meetings.",
      
      "Research from Lean Enterprise Institute shows teams using visual management (like Kanban) reduce cycle time by 35%, improve throughput by 25%, and reduce coordination overhead by 40%. Why? Because information flows continuously through the visual system. You don't wait for the weekly meeting to learn someone's blocked—you see the red card in 'Blocked' column and offer help immediately.",
      
      "Basic Kanban structure: Three columns (To Do, In Progress, Done). Each work item is a card (physical sticky note or digital card). Cards move left to right as work progresses. That's it. The simplicity is the power. You can set up a basic Kanban board in 10 minutes. Then you iterate: add columns for your workflow (Backlog → Ready → In Progress → Review → Done), add WIP limits (only 3 cards in 'In Progress'), add color-coding (red = urgent, yellow = blocked, green = on track).",
      
      "At Just Eat Takeaway, our operations team used a physical Kanban board on the office wall: 15 feet wide, visible from anywhere in the room. Each card was a project or initiative. Every morning during stand-up, we'd physically walk to the board and move cards. This created ritual and shared ownership. When someone got stuck (card hadn't moved in 3 days), it was visible to everyone. Help appeared because the problem was seen, not hidden in someone's to-do list.",
      
      "The breakthrough isn't the board—it's the conversations the board enables. Physical or digital, the Kanban board becomes the 'single source of truth' for team work. Instead of asking 'What's the status on X?', you look at the board. Instead of wondering 'Who's working on what?', you scan the 'In Progress' column. This eliminates status update meetings and email chains. The board is the status.",
      
      "Advanced Kanban concepts: (1) WIP Limits—constrain how many items can be 'In Progress' simultaneously (forces completion before starting new work, prevents multitasking). (2) Explicit policies—define what 'Done' means for each column (Done doesn't mean 'code written,' it means 'code written, tested, reviewed, deployed'). (3) Classes of Service—use color or tags to distinguish urgent work from regular work (prevents everything becoming urgent). (4) Cumulative Flow Diagrams—track cards moving through stages over time (reveals bottlenecks).",
      
      "The mistake teams make: They set up Kanban, use it for 2 weeks, then abandon it because 'it's too much overhead.' This happens when the board becomes a chore (updating it feels like busywork) instead of a tool (it provides value). The fix: Make board updates part of existing rhythm. Daily stand-up happens AT the board. Cards get moved DURING stand-up. The update isn't extra work—it's how you coordinate. If updating the board feels like overhead, your board isn't designed right or isn't integrated into team rhythm.",
      
      "In Brazilian Jiu Jitsu, competition brackets are visual management. You can see: who's competing, who they've beaten, who's up next, who's in the finals. This creates clarity and energy. Everyone knows where they are in the tournament structure. No one is confused about when they fight next. The bracket IS the coordination mechanism. Teams need the same: a visual artifact that coordinates without requiring constant verbal updates.",
      
      "Digital vs. Physical Kanban: Both work, different advantages. Physical (sticky notes on wall): High visibility, tactile satisfaction of moving cards, forces co-location. Digital (Trello, Jira, Asana): Remote-friendly, integrates with other tools, easier to track metrics. At Just Eat Takeaway, we used physical for local teams and digital for distributed teams. The tool doesn't matter as much as the discipline of keeping it current.",
      
      "The implementation: Start simple. Three columns. 10 cards representing your team's active work. Physical board (if co-located) or digital (if remote). Tomorrow's stand-up happens at the board—everyone moves their cards while they share progress. Do this for 2 weeks before adding complexity (WIP limits, color codes, metrics). The simplicity is what allows adoption. Complexity can come later after the habit is formed.",
      
      "Next lesson: Energy Check Protocols—we'll explore how to maintain team energy and prevent burnout. But first, set up your first Kanban board. Right now. Don't overthink it. Three columns. List your team's 10 active work items. Put them in the appropriate column. Tomorrow, start your stand-up by having everyone move cards. That's it. You're doing visual management. The sophistication can come later—the value starts immediately."
    ],
    learningObjective: "You will learn how visual management systems like Kanban reduce cycle time by 35% and coordination overhead by 40% by making work visible to everyone in real-time.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Energy Check Protocols",
    content: [
      "Your team just shipped a major release. Three months of 60-hour weeks, high-stress, all-hands effort. It's done. Everyone's exhausted. What do most leaders do? Immediately start the next high-intensity project. What happens? Burnout. Turnover. Declining performance. The team that just proved they could sprint now moves like they're running through mud. Why? Because you burned their energy without refilling it.",
      
      "Research from Tony Schwartz and the Energy Project shows that human performance isn't linear—it's oscillatory. High performance requires oscillation between energy expenditure (work sprints) and energy recovery (rest periods). Athletes understand this: hard training must be followed by recovery. Business leaders ignore this: they treat teams like machines that should run at max capacity constantly. Machines break. So do humans.",
      
      "Teresa Amabile's research at Harvard tracking 12,000+ daily work diary entries found that employee inner work life (emotions, motivation, perceptions) has the most variability on Mondays and Fridays—people start strong, deplete during the week, and often arrive at Friday mentally checked out. Teams that ignore this and schedule high-stakes work on Friday afternoons get worse outcomes than teams that schedule the same work on Tuesday mornings. Energy levels matter as much as skill levels.",
      
      "Energy Check Protocols are systems for monitoring and managing team energy levels. Not 'how people feel' (that's HR wellness programs), but 'how much capacity the team has' (that's operational intelligence). If your team is at 60% energy and you're planning like they're at 100%, you'll miss every deadline and demoralize everyone. Energy-aware leaders calibrate expectations to current capacity, not imagined capacity.",
      
      "At Just Eat Takeaway, we implemented a simple energy check: Every Friday in our weekly review, each person rated their energy 1-10 (10 = fully charged, 1 = completely depleted). No explanation required, just the number. If anyone reported 5 or below for two consecutive weeks, I'd have a 1-on-1 to understand why and what needed to change. If team average dropped below 6, we'd explicitly reduce commitments for the following week. This wasn't soft—it was risk management. Depleted teams make expensive mistakes.",
      
      "The framework for energy management: (1) Sprint-Recovery Rhythm (intense work followed by lighter work, not constant intensity). (2) Energy Check-Ins (regular measurement, not assumption). (3) Proactive Recovery (built into plans, not reacting to burnout). (4) Differentiated Loading (not everyone works at same intensity constantly—rotate who's on heavy projects). These aren't luxuries—they're how you sustain high performance over quarters and years, not just weeks.",
      
      "Sprint-Recovery in practice: After a major release, schedule a 'recovery week' where no new big initiatives start. Use the time for cleanup tasks, learning, process improvement, relationship building. Not vacation (people are still working) but lower-intensity work that allows nervous system recovery. Pixar does this religiously after every film: the core team gets a recovery period before starting the next project. Why? Because creativity requires energy, and depleted teams can't create.",
      
      "The objection everyone raises: 'We can't afford recovery time—we're behind on everything.' Backwards. You can't afford NOT to build in recovery. Teams running at constant high intensity slow down involuntarily (mistakes, rework, turnover, sickness, disengagement) or they quit. Either way, you lose capacity. Planned recovery is cheaper than unplanned collapse. You're going to pay the energy debt—either proactively (planned recovery) or reactively (burnout, turnover, failed projects). Choose proactively.",
      
      "In Brazilian Jiu Jitsu, periodization is how athletes train for competition: 12-week cycles with varying intensity. Weeks 1-4: Build base (moderate intensity, high volume). Weeks 5-8: Intensify (high intensity, moderate volume). Weeks 9-11: Peak (very high intensity, lower volume). Week 12: Taper (low intensity, recovery). Then compete. Athletes who train at max intensity year-round don't become champions—they get injured or burnt out. Periodization is the difference between showing up strong vs. showing up broken.",
      
      "Your team needs periodization: high-intensity sprints followed by moderate-intensity weeks. Not every quarter can be 'the most important quarter.' Not every project can be 'all-hands, max effort.' If everything is urgent, nothing is. Leaders who can't differentiate intensity levels burn out their teams within 18 months. Leaders who manage energy well build teams that sustain high performance for years.",
      
      "Blue Belt Integration Check: You've completed 4 stripes on conflict and communication. You've learned: why conflict avoidance kills teams, how to structure productive debate, how 93% of communication is non-verbal, how to give real-time feedback, how to implement tactical stand-ups and operating rhythm, how to separate meeting types for efficiency, how to make work visible through Kanban, and how to manage team energy. This isn't separate—it's integrated. The rhythm enables the feedback. The visual management reduces coordination. The energy protocols sustain performance.",
      
      "Next stripe: Flow State—we'll explore how to create conditions for teams to enter high-performance flow. But first, implement one energy check protocol this week. Simplest: In your next team meeting, have everyone rate current energy 1-10. Calculate average. If it's below 7, ask: What's draining us? What would help? Don't solve it immediately—just make the invisible (energy depletion) visible. Awareness precedes action. Then act accordingly."
    ],
    learningObjective: "You will learn why human performance is oscillatory (not linear) and how to implement energy check protocols and sprint-recovery rhythms that prevent burnout while sustaining high performance.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe7Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your team wants to 'check in' on a major project. You notice you've had 3 ad-hoc 'quick sync' meetings this week already, each taking 30-45 minutes to schedule and another 45 minutes to run. According to operating rhythm principles, what should you do?",
    options: [
      "Keep accommodating ad-hoc meetings—flexibility shows you're responsive",
      "Say: 'Let's add this to tomorrow's daily stand-up for quick update, and if it needs deep work, we'll schedule from the weekly review'",
      "Cancel all meetings and just use email for updates",
      "Schedule a longer weekly meeting so everything can be covered at once"
    ],
    correctAnswer: 1,
    explanation: "Option B implements operating rhythm: updates flow to existing cadences, not ad-hoc meetings. Harvard research shows teams with consistent rhythms outperform ad-hoc teams by 40%. Those 3 'quick syncs' cost you 3+ hours of scheduling overhead + 2+ hours of meeting time. If they'd used daily stand-ups (30 minutes total for the week), you'd have saved 4.5 hours. Option A is the coordination tax that's killing your velocity. Option C loses the richness of discussion. Option D tries to cram everything into one meeting. The key insight: Rhythm eliminates 'we should sync' conversations because everyone knows WHEN syncing happens. You're not being rigid—you're being efficient.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You're in your weekly tactical meeting (designed for metrics + immediate issues + next week priorities). 20 minutes in, someone raises: 'I think we should rethink our entire go-to-market strategy.' This sparks a 30-minute debate. What does meeting mastery tell you to do?",
    options: [
      "Let the debate continue—it's clearly important to the team",
      "Interrupt: 'That's strategic. Let's table it for next month's strategic session where we have proper time. For now, back to this week's metrics.'",
      "Take a quick poll to decide the strategy question now",
      "Schedule an immediate follow-up meeting to resolve it"
    ],
    correctAnswer: 1,
    explanation: "Option B maintains meeting type discipline. Lencioni's research: mixing tactical and strategic mindsets destroys both. Tactical meetings need speed and operational focus. Strategic meetings need depth and exploration. A 30-minute tactical debate on strategy will produce a poor decision AND derail your tactical priorities. Option A lets the meeting get hijacked. Option C rushes a major decision. Option D creates another ad-hoc meeting. The discipline: When someone raises the wrong topic for the meeting type, you redirect to the appropriate forum. This feels rigid initially, then becomes liberating—everyone knows which meeting is for what. Strategic questions DESERVE proper strategic time, not rushed tactical time.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You've set up a Kanban board. After 2 weeks, you notice 8 of 10 cards are stuck in 'In Progress' and haven't moved. What does this tell you according to visual management principles?",
    options: [
      "The board isn't working—abandon Kanban and go back to status meetings",
      "You've discovered a bottleneck: team is starting too much and finishing too little. Implement WIP limits (max 3 in progress).",
      "People aren't updating the board—send a reminder email about keeping it current",
      "The work is just harder than expected—nothing to do but push through"
    ],
    correctAnswer: 1,
    explanation: "Option B correctly diagnoses the problem: too much work-in-progress (WIP) is a universal sign of thrashing—starting new work before finishing existing work. Lean Enterprise research shows WIP limits improve throughput by forcing completion. When you can only have 3 items 'In Progress,' you're forced to finish something before starting something new. This creates flow. Option A throws away valuable diagnostic information. Option C assumes a discipline problem when it's actually a system problem. Option D ignores what the visual system is telling you. The power of Kanban: it makes problems visible so you can solve them. 8 cards stuck in progress isn't a board failure—it's a workflow insight the board just gave you. Now act on it.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "Your team just completed a 3-month high-intensity project. Everyone is exhausted (average energy rating: 4.5/10). Leadership wants to immediately start the next major initiative 'to capitalize on momentum.' According to energy management research, what should you do?",
    options: [
      "Agree—momentum is real and you don't want to lose it",
      "Push back: 'The team needs a recovery week with lower-intensity work before the next sprint. Depleted teams make expensive mistakes.'",
      "Compromise: Start the new project but with reduced hours",
      "Let people take vacation days to recharge"
    ],
    correctAnswer: 1,
    explanation: "Option B implements sprint-recovery rhythm based on Tony Schwartz's research: performance is oscillatory, not linear. 'Momentum' at 4.5/10 energy isn't momentum—it's fumes. Research shows depleted teams (energy below 5) have 3x higher error rates and 2x slower decision-making. The 'momentum' leadership wants to capture will evaporate within 2 weeks when mistakes start compounding. Option A burns your team. Option C half-measures don't allow real recovery. Option D (vacation) helps individuals but doesn't create team recovery time. The week of lower-intensity work lets the team recover TOGETHER while still contributing (cleanup, documentation, learning, process improvement). You're not losing momentum—you're protecting capacity. Leaders who can't say 'we need recovery time' sacrifice long-term performance for short-term optics.",
    xpReward: 10
  }
];

export const stripe7Content = {
  lessons: stripe7Lessons,
  checkpoints: stripe7Checkpoints
};

