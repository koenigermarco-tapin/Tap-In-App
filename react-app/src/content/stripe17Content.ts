/**
 * BLACK BELT - STRIPE 17: RESULTS OBSESSION
 * Theme: Collective outcomes over individual agendas
 * Focus: Scoreboard thinking, team goals over personal success, metrics that matter, results rituals
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

export const stripe17Lessons: Lesson[] = [
  {
    id: 1,
    title: "Scoreboard Thinking",
    content: [
      "Two basketball teams play. One watches the scoreboard constantly, adjusts strategy based on points differential, manages clock intentionally. The other plays hard but rarely checks the score. Which wins? The one obsessed with the scoreboard. Business is the same. Teams that operate without clear, visible metrics are playing without keeping score. They work hard but don't know if they're winning or losing. Scoreboard thinking means: defining clear metrics, making them visible, adjusting strategy based on results. This is Black Belt discipline.",
      
      "Research from the 4 Disciplines of Execution (4DX) studying 200,000+ teams found that teams with visible scoreboards (updated at least weekly, tracking 2-3 metrics max) achieve goals 65% more often than teams without scoreboards. Why? Because visibility creates accountability ('everyone can see our performance'), clarity ('we know what winning looks like'), and motivation ('we're either ahead or behind—both drive action'). Without a scoreboard, teams guess whether they're effective. With one, they know.",
      
      "The anatomy of an effective scoreboard: (1) Lagging metric—the outcome you ultimately care about (revenue, customer satisfaction, delivery time). (2) Leading metric—the activity that drives the lagging metric (sales calls made, NPS surveys completed, deployments per week). (3) Target—what 'winning' looks like (green/yellow/red thresholds). (4) Visibility—everyone can see it, updated at least weekly, takes 5 seconds to understand (not complex dashboards that require training). A good scoreboard answers instantly: Are we winning? What do we need to do to win?",
      
      "At Just Eat Takeaway, we struggled with customer complaints. Too many, too slow to resolve. We implemented a scoreboard: Lagging metric = Average resolution time (target: under 24 hours). Leading metric = % of complaints responded to within 2 hours (target: 90%+). Visibility = TV screen in customer service center, updated hourly, green/yellow/red zones. Result: Resolution time dropped 45% in 8 weeks. Why? Because everyone could see whether we were winning or losing at any moment. The scoreboard created obsession with results that no amount of management pressure could have.",
      
      "The two-metric rule: Most teams track too many metrics (15-20 on their dashboard), which is the same as tracking zero. You can't improve 20 things at once. 4DX research: Focus on 2-3 metrics max. One lagging (the outcome), one-two leading (the drivers). Example: E-commerce team: Lagging = Monthly recurring revenue. Leading = Conversion rate and average order value. That's it. Everyone on the team can recite those numbers from memory. Everyone knows: If conversion and order value go up, revenue follows. If we track 20 things, we're managing a spreadsheet. If we track 2-3, we're managing results.",
      
      "The mistake most leaders make: They measure everything but focus on nothing. Their dashboard has 40 metrics. No one knows which matters most. Result: People optimize for metrics that are easy to move (vanity metrics) rather than metrics that drive actual business value. The discipline: Choose the ONE lagging metric that matters most right now. Choose the 1-2 leading metrics that drive it. Put those on the scoreboard. Ignore everything else for this quarter. After quarter, reassess and potentially change focus. But always: minimal metrics, maximum focus.",
      
      "The weekly cadence: Scoreboards only work if they're reviewed regularly with action commitment. The 4DX practice: Weekly 20-minute meeting (same time, no exceptions) where team: (1) Reviews scoreboard (are we green/yellow/red?), (2) Reports commitments from last week (did we do what we said?), (3) Identifies obstacles (what's blocking progress?), (4) Makes new commitments (what will each person do this week to move metrics?). This cadence creates accountability (public commitments), learning (what worked?), and adjustment (what needs to change?). Without the cadence, the scoreboard is just decoration.",
      
      "In Brazilian Jiu Jitsu, competition keeps score: points for positions, advantages for near-submissions, penalties for stalling. Everyone sees the score. The practitioner behind on points must adjust strategy (take risks, attempt submissions). The practitioner ahead can adjust differently (maintain position, manage clock). Clear scoreboard drives strategic adjustment. Imagine competing with no score—you'd guess whether you're winning. That's how most teams operate: no clear scoreboard, just guessing about effectiveness.",
      
      "The transformation: Before scoreboard—'We're working hard, seems like things are okay.' After scoreboard—'We're yellow on resolution time because we're only at 75% on 2-hour response rate. If we hit 90%, we'll get back to green. I'm committing to personally handle 5 escalations this week to move that number.' The scoreboard transforms vague effort into specific, measurable action. It replaces 'trying' with 'achieving.' This is results obsession: not working harder, but knowing exactly what winning looks like and adjusting until you're winning.",
      
      "Next lesson: Team Goals Over Personal Agendas—we'll tackle Lencioni's final dysfunction (inattention to results) where individual success is prioritized over collective outcomes. But first, build your scoreboard. Pick ONE lagging metric (the outcome that matters most). Pick 1-2 leading metrics (the activities that drive it). Make it visible (dashboard, TV screen, Slack bot—something everyone sees). Commit to weekly review (20 minutes, same time). Watch how visible scoreboards create results obsession that invisible metrics never can."
    ],
    learningObjective: "You will learn the four components of effective scoreboards (lagging/leading metrics, targets, visibility) that help teams achieve goals 65% more often through the two-metric rule and weekly cadence.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Team Goals Over Personal Agendas",
    content: [
      "Your sales team crushes their quota. Your product team ships every feature on roadmap. Your engineering team hits all sprint commitments. But the company misses revenue targets and loses market share. How? Because every function optimized for their goals (personal agendas) without optimizing for the collective outcome (team goals). This is Lencioni's fifth dysfunction: Inattention to results. When individual or departmental success trumps collective success, everyone wins locally while losing globally.",
      
      "Research from Harvard Business School studying organizational silos found that 75% of cross-functional initiatives fail not because functions are incompetent, but because each function prioritizes their own metrics over shared outcomes. Sales optimizes for deals closed (even if they're bad-fit customers). Product optimizes for features shipped (even if they don't drive adoption). Engineering optimizes for sprint velocity (even if they're building the wrong things). Everyone hits their numbers. The business still fails. This is local optimization creating global failure.",
      
      "The diagnostic: How do you know if your team suffers from this dysfunction? Ask: (1) Do people celebrate departmental wins even when company misses goals? ('We hit our numbers—not our fault sales couldn't sell it'). (2) Do functions protect their turf rather than collaborate? ('That's not product's job'). (3) Do people advocate for their function's priorities over company priorities in strategy discussions? (4) Does credit-taking and blame-shifting happen across functions? If yes to any, you have inattention to collective results.",
      
      "At Just Eat Takeaway, we had exactly this problem. Operations optimized for delivery speed (their KPI). Customer Service optimized for low ticket volume (their KPI). Product optimized for feature releases (their KPI). Result: Operations drove speed by cutting quality checks (more customer complaints). Customer Service deflected complex issues to keep volume down (poor customer experience). Product shipped features without considering operational impact (chaos). Every function hit targets. Customer satisfaction cratered. This is what Lencioni calls 'inattention to results'—everyone focused on their scorecard, no one focused on the game.",
      
      "The fix: Shared scoreboard. We created ONE metric the entire leadership team owned: Customer Lifetime Value (CLV). Not Operations' speed. Not CS's ticket volume. Not Product's velocity. CLV. Now: Operations couldn't optimize speed at expense of quality (tanks CLV). CS couldn't deflect complex issues (tanks CLV). Product couldn't ship without considering customer impact (tanks CLV). Shared metric aligned behavior. When everyone owns the same outcome, turf wars disappear. You can't win individually if the team loses collectively.",
      
      "The implementation: (1) Identify the ONE metric that represents collective success (revenue, profitability, customer retention, market share—whatever matters most to overall mission). (2) Make every function/department co-accountable for it (not just their piece—the whole thing). (3) Compensation/recognition/promotion tied to collective metric, not just functional metrics (this creates real accountability, not just stated alignment). (4) Monthly review where every function reports: 'Here's what we did this month to move the collective metric' (not 'here's our functional results'). This structural change shifts attention from individual agendas to team results.",
      
      "The mistake most leaders make: They preach 'teamwork' and 'collaboration' while rewarding individual performance. Sales gets bonuses for deals, Product gets promotions for features, Engineering gets recognition for velocity. Then leadership wonders why functions don't collaborate. Simple: You get what you reward. If you reward functional success regardless of collective outcomes, you'll get functional optimization. If you reward collective success, you'll get collaboration. Align incentives with desired behavior. Misaligned incentives create inattention to results no amount of messaging can overcome.",
      
      "In Brazilian Jiu Jitsu, if you compete in team tournaments, your individual match matters only insofar as it contributes to team score. You might dominate your match but if the team loses overall, you lost. This creates different strategic thinking: Do I take a risky submission attempt (higher individual points if it works, but might give up position if it fails and cost team)? Or do I play conservative, secure my points, ensure team wins? The team goal shapes individual strategy. Business teams need the same: individual excellence in service of collective success, not individual success regardless of collective outcome.",
      
      "The cultural shift: From 'How do I look good?' to 'How do we win?' From 'My function hit targets' to 'Did we achieve the mission?' From 'Not my problem' to 'What can I contribute?' This shift doesn't happen through posters or values statements. It happens through: (1) Shared scoreboard everyone owns, (2) Rewards tied to collective success, (3) Leaders modeling 'we' language instead of 'my team' language, (4) Public celebration of cross-functional collaboration over individual wins. Culture follows structure. Change the structure (metrics, incentives, rituals), culture follows.",
      
      "Next lesson: The Metrics That Matter—distinguishing between metrics that actually drive business value vs. vanity metrics that make us feel productive without creating results. But first, diagnose your team. Do people celebrate functional wins when company misses goals? Do functions protect turf? Does blame-shifting happen? If yes, create shared scoreboard. Pick ONE collective metric everyone owns. Make functional leaders co-accountable for it. Tie rewards to it. Watch how attention shifts from personal agendas to team results. That's Black Belt leadership: collective success over individual success, always."
    ],
    learningObjective: "You will learn why 75% of cross-functional initiatives fail due to local optimization (individual goals) creating global failure, and how shared scoreboards with aligned incentives fix inattention to results.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "The Metrics That Matter",
    content: [
      "Your dashboard shows: Website visits up 40%. Email open rates up 25%. Social media followers up 60%. Feature releases up 15%. Everyone's excited. But revenue is flat and customer churn is rising. What's happening? You're measuring activity, not outcomes. You're tracking vanity metrics (things that feel good) rather than value metrics (things that matter). Black Belt leaders distinguish between the two ruthlessly. They ignore everything that doesn't directly connect to business outcomes. This is metrics discipline.",
      
      "The vanity vs. value distinction: Vanity metrics make you feel productive but don't predict business success. Examples: Total users (doesn't account for inactive users), page views (doesn't mean engagement), features shipped (doesn't mean customer value), hours worked (doesn't mean effectiveness), social media likes (doesn't mean revenue). Value metrics directly connect to business outcomes. Examples: Active users (actually using product), conversion rate (visitors becoming customers), feature adoption (customers using what you built), revenue per employee (efficiency), customer lifetime value (long-term health). The first category feels good. The second category matters.",
      
      "Research from Lean Analytics studying 2,000+ startups found that companies focusing on 2-3 value metrics (specific to their business model) were 3x more likely to achieve product-market fit than companies tracking 15+ vanity metrics. Why? Because focus creates clarity about what drives success. When you track everything, nothing gets optimized. When you track the 2-3 things that actually move the business, everyone aligns their work toward those outcomes. Constraints (fewer metrics) create clarity. Abundance (many metrics) creates confusion.",
      
      "The value metric framework: Every business has: (1) Acquisition metric—how you get customers (CAC, conversion rate, signup rate). (2) Activation metric—how customers experience value (time to first value, feature adoption, onboarding completion). (3) Retention metric—how you keep customers (churn rate, engagement frequency, renewal rate). (4) Revenue metric—how you make money (MRR, LTV, ARPU). (5) Referral metric—how customers bring more customers (NPS, referral rate, viral coefficient). These AARRR metrics (Pirate Metrics framework) cover the customer lifecycle. Pick the 1-2 that are your current bottleneck. Ignore the rest until those are fixed.",
      
      "At Just Eat Takeaway, early-stage we tracked everything: Total orders, website visits, app downloads, social followers, email subscribers, customer service tickets, cuisine categories, delivery times, average order value, partner restaurants. Eighteen metrics. Result: No one knew what to focus on. We'd have meetings where Operations celebrated delivery speed improvements while Revenue reported order volume decline—both were 'hitting metrics' but company was failing. We simplified: Primary metric = Net Revenue (orders × margin). Secondary metric = Customer Retention Rate (repeat orders within 30 days). That's it. Suddenly: Operations couldn't optimize speed at expense of customer experience (tanks retention). Marketing couldn't acquire any customer (had to acquire ones who'd return). Product couldn't ship random features (had to ship what drives retention/revenue). Two metrics aligned everyone.",
      
      "The metric selection process: (1) Start with business outcome—what does success look like? (revenue, profitability, market share, mission impact). (2) Work backward—what customer behavior drives that? (purchase, retention, referral). (3) Identify leading indicator—what predicts that behavior? (engagement, activation, satisfaction). (4) Choose 2-3 metrics that span outcome + behavior + leading indicator. (5) Ignore everything else for this quarter. Example: Outcome = Revenue growth. Behavior = Customer retention. Leading indicator = Product engagement. Metrics = MRR (outcome), Churn rate (behavior), Weekly active usage (leading). This creates a value chain: Usage predicts retention predicts revenue. Optimize usage, watch retention improve, watch revenue follow.",
      
      "The mistake most leaders make: They choose metrics that are easy to measure rather than metrics that matter. 'We can't measure customer satisfaction easily, so let's track tickets resolved.' Wrong. If customer satisfaction matters, figure out how to measure it (NPS survey, retention cohort analysis, qualitative interviews). Don't optimize for what's measurable. Measure what you need to optimize. The best companies create measurement systems for the metrics that matter, even if it's hard. The worst companies optimize for easy-to-measure vanity metrics that don't drive business value.",
      
      "In Brazilian Jiu Jitsu, you could track vanity metrics: Training days attended, techniques learned, drilling hours logged. Or value metrics: Submissions in live rolling, tournament placement, progression through belts. The first category feels productive ('I trained 5 days this week!'). The second category measures actual skill development. Most practitioners track both but know which matters: Can you execute under pressure? That's the metric. Same in business. Track activity if you want, but know which metrics actually predict success. Optimize those ruthlessly.",
      
      "The discipline: Every quarter, review your metrics. Ask: (1) Do these directly connect to business outcomes? (2) Would we celebrate hitting these metrics if revenue/mission impact was declining? (3) Can we articulate how improving these metrics causes business success? If no to any, you're tracking vanity. Replace with value metrics. The goal isn't to measure everything—it's to measure the right things. And then obsess over improving them. That's results discipline: relentless focus on metrics that matter, ruthless elimination of metrics that don't.",
      
      "Next lesson: Results Rituals—how to embed results obsession into daily operations through structured practices that keep everyone focused on what matters. But first, audit your metrics. List every metric you currently track (15? 20? 30?). For each, ask: 'If this improved but revenue/mission impact declined, would that be acceptable?' If yes, it's a vanity metric. If no, it's a value metric. Keep only the value metrics (should be 2-5 max). Publish them. Make them visible. Align team work toward them. Watch how clarity about what matters creates results that measuring everything never did."
    ],
    learningObjective: "You will learn to distinguish vanity metrics (activity that feels good) from value metrics (outcomes that matter) using the AARRR framework, with research showing 3x better success from focusing on 2-3 value metrics.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Results Rituals",
    content: [
      "Results don't happen by accident. They happen by design. High-performing teams don't just 'focus on results'—they build rituals that make results focus automatic. Rituals are repeated practices that become organizational muscle memory. Without rituals, results obsession depends on individual discipline (fragile). With rituals, results obsession is embedded in operations (durable). This lesson teaches you four results rituals that create sustained high performance.",
      
      "Research from Jim Collins (Good to Great) studying companies that achieved sustained excellence found that they all had 'discipline as habit'—structured practices that reinforced focus on results. These weren't one-time initiatives or motivational programs. They were boring, repetitive rituals that happened weekly, monthly, quarterly without exception. The discipline wasn't in the individuals (though that helped)—it was in the system. The rituals made results focus the default, not the exception.",
      
      "Ritual 1: The Weekly Results Review (30 minutes, same time every week, no exceptions). Team reviews: (1) Scoreboard status (green/yellow/red on key metrics), (2) Commitments from last week (who delivered what they said?), (3) Obstacles identified (what's blocking progress?), (4) New commitments (what will each person do this week to move metrics?). This creates: Weekly accountability (public commitments), rapid learning (what worked?), course correction (what needs to change?), momentum (consistent progress review). The discipline: Never skip. Busy week? Do it anyway. Holiday week? Do it anyway. The rhythm is the point.",
      
      "Ritual 2: The Monthly Strategic Review (90 minutes, first week of each month). Leadership team reviews: (1) Key metrics trend (are we improving or declining on what matters?), (2) Strategic initiatives progress (are our big bets moving forward?), (3) Resource reallocation (do we need to shift people/budget based on results?), (4) Experiments to try (what should we test next month?). This prevents tactical execution disconnected from strategy. Every month you ask: Are we working on the right things? Are they working? Should we adjust? This rhythm prevents teams from executing efficiently in the wrong direction for 6 months before noticing.",
      
      "Ritual 3: The Quarterly Results Retrospective (3 hours, start of each quarter). Full team participates: (1) Results review (what did we achieve vs. what we committed?), (2) Pattern analysis (what worked well that we should keep? what didn't work that we should stop?), (3) Lessons documented (what did we learn about our business/customers/execution?), (4) Next quarter priorities (based on results and learning, what are the 3 most important objectives?). This creates institutional learning. Without it, teams repeat mistakes and abandon successful practices because there's no memory. The retrospective creates organizational intelligence.",
      
      "Ritual 4: The Annual Results Celebration (4 hours, end of year). Not a party—a structured reflection: (1) Results achieved (what did we accomplish as a team?), (2) Individual contributions recognized (specific people who moved key metrics), (3) Failures acknowledged (what didn't work and what we learned), (4) Year-ahead vision (where are we going?). This ritual closes the loop: We set goals, we worked toward them, we're assessing results, we're recognizing contribution, we're learning from failure, we're setting new direction. The celebration isn't just feel-good—it's results accountability made visible and meaningful.",
      
      "At Just Eat Takeaway, we implemented all four rituals after struggling with inconsistent performance (some quarters great, others terrible—no predictability). After 18 months of perfect ritual execution: Performance became predictable (we hit quarterly targets 7/8 quarters). Team developed results muscle memory (everyone knew 'Monday 9am = weekly results review'). Strategic drift disappeared (monthly reviews kept tactics aligned with strategy). Organizational learning accelerated (quarterly retros captured patterns and lessons). The rituals created the results culture that sporadic focus never could.",
      
      "The mistake most leaders make: They run rituals inconsistently. Week 1: Results review happens. Week 2: Someone's traveling, skip it. Week 3: Busy week, skip it. Week 4: People forgot about it. By month 2, the ritual is dead. The discipline: Rituals are sacred. Protect them like you protect customer meetings or board meetings. Someone traveling? Do it without them. Busy week? Do it anyway. Holiday? Do it anyway. BJ Fogg's research: 8-12 weeks of perfect consistency to establish habit. If you skip even once in first 12 weeks, you reset the clock. The ritual must be inviolable to become culture.",
      
      "In Brazilian Jiu Jitsu, every class follows ritual: Line up, bow in, warm up, technique instruction, drilling, live rolling, bow out. This happens whether it's Monday or Saturday, whether there are 5 students or 50, whether anyone feels motivated or not. The ritual creates consistency. Consistency creates improvement. Improvement creates results. Teams that depend on motivation have sporadic results. Teams with rituals have sustained results because the ritual runs regardless of motivation.",
      
      "Black Belt Integration: You've completed Results Obsession stripe. You learned: (1) Scoreboard Thinking (lagging/leading metrics, visibility, weekly cadence creating 65% higher goal achievement). (2) Team Goals Over Personal Agendas (shared scoreboard, aligned incentives, collective success over individual success fixing the final dysfunction). (3) Metrics That Matter (value vs. vanity, AARRR framework, 2-3 metric focus creating 3x better outcomes). (4) Results Rituals (weekly review, monthly strategic, quarterly retro, annual celebration embedding results obsession into operations). You now have results discipline: clear metrics, shared ownership, focused measurement, consistent rituals.",
      
      "Next stripe: Strategic Leadership—we'll elevate from results execution to strategic thinking at the highest level (vision, long-term thinking, leading through uncertainty). But first, implement one results ritual. Pick the weekly results review (highest ROI). Schedule it (30 min, same time every week, recurring for next 12 weeks). Define your agenda (scoreboard status, commitments review, obstacles, new commitments). Run it perfectly for 12 weeks without exception. After 12 weeks, layer in monthly strategic review. Build the rituals that create results culture. That's Black Belt discipline: results by design, not by chance."
    ],
    learningObjective: "You will learn four results rituals (weekly review, monthly strategic, quarterly retro, annual celebration) that embed results obsession into operations, creating sustained high performance through 'discipline as habit.'",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe17Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your team tracks 18 different metrics on their dashboard. Performance is inconsistent—some quarters good, others bad. According to scoreboard thinking principles, what's the fix?",
    options: [
      "Track even more metrics to get complete visibility",
      "Eliminate the dashboard—too many metrics create pressure",
      "Choose ONE lagging metric (outcome) and 1-2 leading metrics (drivers). Make visible, review weekly. Focus only on those 2-3 metrics this quarter.",
      "Let each team member choose their own metrics to track"
    ],
    correctAnswer: 2,
    explanation: "Option C applies the two-metric rule. 4 Disciplines of Execution: teams with visible scoreboards (2-3 metrics max, updated weekly) achieve goals 65% more often. Tracking 20 things = tracking zero. The Just Eat Takeaway example: struggled with customer complaints, created scoreboard with 2 metrics (avg resolution time lagging, % responded within 2 hours leading), visible on TV screen updated hourly—resolution time dropped 45% in 8 weeks because everyone could see win/lose at any moment. Option A amplifies the problem (more metrics = less focus). Option B eliminates accountability. Option D creates chaos (no shared focus). Effective scoreboard: lagging metric (outcome), leading metric (driver), target (green/yellow/red), visibility (everyone sees, 5 seconds to understand). Add weekly cadence: 20-min meeting reviewing scoreboard, commitments, obstacles, new actions.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "Sales hits their quota, Product ships all features, Engineering completes sprints—but company misses revenue targets. According to 'team goals over personal agendas' principles, what's the problem and fix?",
    options: [
      "Each function needs to work harder on their goals",
      "Better communication needed between functions",
      "Inattention to collective results: each function optimizing for their scorecard, not the game. Fix: Create ONE shared metric (e.g., Customer Lifetime Value) that all functions co-own. Tie rewards to it.",
      "Fire underperforming team members"
    ],
    correctAnswer: 2,
    explanation: "Option C diagnoses Lencioni's fifth dysfunction and applies the shared scoreboard fix. Harvard research: 75% of cross-functional initiatives fail because functions prioritize their metrics over shared outcomes (local optimization creates global failure). The Just Eat Takeaway example: Operations optimized speed (their KPI), CS optimized low ticket volume (their KPI), Product optimized features (their KPI)—every function hit targets, customer satisfaction cratered. Fix: ONE shared metric (CLV) that entire leadership owned—Operations couldn't optimize speed at expense of quality, CS couldn't deflect issues, Product couldn't ship without considering impact. Shared metric aligned behavior. Option A amplifies local optimization. Option B is vague. Option D treats symptom not cause. Implementation: identify ONE collective success metric, make all functions co-accountable, tie compensation/recognition to it, monthly review where each reports contribution to shared metric.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Your dashboard shows: Website visits +40%, Email opens +25%, Social followers +60%, Features +15%. But revenue flat, churn rising. According to 'metrics that matter' principles, what's happening?",
    options: [
      "Great progress—keep doing what you're doing",
      "You're measuring activity (vanity metrics) not outcomes (value metrics). Replace with 2-3 value metrics: MRR, Churn rate, Weekly active usage that directly connect to business success.",
      "You need even more metrics to understand the full picture",
      "The team isn't working hard enough"
    ],
    correctAnswer: 1,
    explanation: "Option B distinguishes vanity vs. value metrics. Vanity = feels good, doesn't predict success (total users, page views, features shipped, social likes). Value = directly connects to outcomes (active users, conversion rate, feature adoption, revenue per employee, LTV). Lean Analytics: companies focusing on 2-3 value metrics were 3x more likely to achieve product-market fit than companies tracking 15+ vanity metrics. The Just Eat Takeaway example: tracked 18 metrics, no one knew what to focus on—simplified to Net Revenue (orders × margin) and Customer Retention Rate—suddenly everyone aligned (Operations couldn't optimize speed at expense of experience, Marketing had to acquire returners, Product had to ship what drives retention). Use AARRR framework (Acquisition, Activation, Retention, Revenue, Referral), pick 1-2 that are current bottleneck. Option A celebrates activity over outcomes. Option C amplifies confusion. Option D misdiagnoses cause.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You implement weekly results reviews. Week 1-2: Perfect execution. Week 3: Someone traveling, you skip it. Week 4: Busy week, skip it. According to results rituals principles, what happened?",
    options: [
      "Reasonable flexibility—rituals should adapt to circumstances",
      "You killed the ritual. Rituals require 8-12 weeks perfect consistency to become habit. Skipping resets the clock. The discipline: run it even when someone's traveling, even when busy. No exceptions.",
      "Two weeks was enough to establish the habit",
      "You can restart next week with no impact"
    ],
    correctAnswer: 1,
    explanation: "Option B applies BJ Fogg's habit formation research and Jim Collins' 'discipline as habit.' Rituals only work if inviolable. Skip even once in first 12 weeks, reset the clock. The Just Eat Takeaway example: implemented four rituals after inconsistent performance, executed perfectly for 18 months—performance became predictable (7/8 quarterly targets hit), team developed results muscle memory, strategic drift disappeared, organizational learning accelerated. Rituals created results culture that sporadic focus never could. Option A kills rituals (inconsistency trains people the ritual isn't real). Option C underestimates habit formation time. Option D ignores the reset cost. The BJJ analogy: class ritual (bow in, warm up, technique, drilling, rolling, bow out) happens whether Monday/Saturday, 5 students/50, motivated or not. Consistency creates improvement. Business rituals same: weekly review, monthly strategic, quarterly retro, annual celebration—protected absolutely, run regardless of circumstances. Rituals are sacred, not optional.",
    xpReward: 10
  }
];

export const stripe17Content = {
  lessons: stripe17Lessons,
  checkpoints: stripe17Checkpoints
};

