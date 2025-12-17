// ===== BROWN BELT STRIPE 3: STANDARDS & METRICS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Setting Clear Standards",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "Your team has a clear vision but struggles with execution. The most likely root cause is:",
            options: [
                { label: "A) The vision isn't inspiring enough to drive action", correct: false },
        { label: "B) The gap between vision and daily work is too abstract", correct: true },
        { label: "C) Team members lack the skills needed to execute", correct: false },
        { label: "D) There's insufficient accountability for results", correct: false }
            ],
            correctFeedback: "✓ Correct! Excellent diagnosis! Most execution problems aren't motivation or skill issues - they're translation problems. The vision is '10,000 feet up' but daily work is 'ground level,' and there's no bridge connecting them. Brown Belt leaders build that bridge: 'Here's our 3-year vision... so in 12 months we need X... so this quarter we're doing Y... so this week you're working on Z.' Make the connection explicit. Clear line of sight from daily tasks to ultimate vision.",
            incorrectFeedback: "Not quite. Excellent diagnosis! Most execution problems aren't motivation or skill issues - they're translation problems. The vision is '10,000 feet up' but daily work is 'ground level,' and there's no bridge connecting them. Brown Belt leaders build that bridge: 'Here's our 3-year vision... so in 12 months we need X... so this quarter we're doing Y... so this week you're working on Z.' Make the connection explicit. Clear line of sight from daily tasks to ultimate vision."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Measuring What Matters",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "The difference between a vision and a goal is:",
            options: [
                { label: "A) Vision is long-term, goals are short-term", correct: false },
        { label: "B) Vision is where you're going (destination), goals are how you'll get there (milestones)", correct: true },
        { label: "C) Vision is inspirational, goals are operational", correct: false },
        { label: "D) They're the same thing, just different timeframes", correct: false }
            ],
            correctFeedback: "✓ Correct! Vision is the destination - 'What future state do we want to create?' Goals are milestones - 'What must be true along the way?' Example: Vision = 'Every employee feels trusted and empowered.' Goals = 'By Q2, we implement new feedback systems. By Q4, we eliminate approval layers for routine decisions.' Brown Belt leaders distinguish: vision provides direction, goals provide checkpoints. Don't confuse the destination with the journey.",
            incorrectFeedback: "Not quite. Vision is the destination - 'What future state do we want to create?' Goals are milestones - 'What must be true along the way?' Example: Vision = 'Every employee feels trusted and empowered.' Goals = 'By Q2, we implement new feedback systems. By Q4, we eliminate approval layers for routine decisions.' Brown Belt leaders distinguish: vision provides direction, goals provide checkpoints. Don't confuse the destination with the journey."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Performance Tracking",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "Communicating vision effectively (per Sinek and Kotter) means:",
            options: [
                { label: "A) Repeating the vision statement frequently in meetings", correct: false },
        { label: "B) Connecting vision to daily decisions and showing progress regularly", correct: true },
        { label: "C) Creating inspiring presentations and videos about the vision", correct: false },
        { label: "D) Ensuring everyone can recite the vision word-for-word", correct: false }
            ],
            correctFeedback: "✓ Correct! Vision communication isn't about repetition - it's about relevance. People care about vision when they see: 'How does this affect what I do today?' Brown Belt leaders connect vision to daily decisions: 'We're choosing X over Y because it aligns with our vision of Z.' Show progress: 'Remember our vision of X? We just achieved Y milestone toward it.' Make vision visible through actions and progress, not just words.",
            incorrectFeedback: "Not quite. Vision communication isn't about repetition - it's about relevance. People care about vision when they see: 'How does this affect what I do today?' Brown Belt leaders connect vision to daily decisions: 'We're choosing X over Y because it aligns with our vision of Z.' Show progress: 'Remember our vision of X? We just achieved Y milestone toward it.' Make vision visible through actions and progress, not just words."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Maintaining Quality",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "OKRs (Objectives and Key Results) are most effective when:",
            options: [
                { label: "A) Set top-down by leadership to ensure alignment", correct: false },
        { label: "B) Cascaded from organizational to team to individual levels with clear connections", correct: true },
        { label: "C) Set independently by teams to ensure ownership", correct: false },
        { label: "D) Reviewed annually to maintain focus", correct: false }
            ],
            correctFeedback: "✓ Correct! OKRs work when they cascade: organizational OKRs → team OKRs → individual OKRs, with clear connections. Each level's OKRs support the level above. This creates alignment (everyone moves toward the same destination) AND autonomy (teams/individuals choose HOW). Brown Belt leaders cascade OKRs to create 'aligned autonomy' - strategic direction with tactical freedom. This is how you scale vision.",
            incorrectFeedback: "Not quite. OKRs work when they cascade: organizational OKRs → team OKRs → individual OKRs, with clear connections. Each level's OKRs support the level above. This creates alignment (everyone moves toward the same destination) AND autonomy (teams/individuals choose HOW). Brown Belt leaders cascade OKRs to create 'aligned autonomy' - strategic direction with tactical freedom. This is how you scale vision."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Maintaining Quality",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "Strategic patience vs. urgency means:",
            options: [
                { label: "A) Always being patient - strategy takes time", correct: false },
        { label: "B) Always being urgent - markets move fast", correct: false },
        { label: "C) Patient with the vision, urgent with execution milestones", correct: true },
        { label: "D) Urgent with vision, patient with execution", correct: false }
            ],
            correctFeedback: "✓ Correct! Brown Belt leaders hold two tensions: strategic patience (vision doesn't change daily) and tactical urgency (milestones must be hit). Example: Vision of 'becoming the most trusted brand' (patience - this is a 10-year journey) BUT urgent milestones: 'Q1: launch trust-building initiative, Q2: measure trust metrics, Q3: iterate based on data.' Patient with destination, urgent with progress. This prevents both rigidity (never adapting) and chaos (always pivoting).",
            incorrectFeedback: "Not quite. Brown Belt leaders hold two tensions: strategic patience (vision doesn't change daily) and tactical urgency (milestones must be hit). Example: Vision of 'becoming the most trusted brand' (patience - this is a 10-year journey) BUT urgent milestones: 'Q1: launch trust-building initiative, Q2: measure trust metrics, Q3: iterate based on data.' Patient with destination, urgent with progress. This prevents both rigidity (never adapting) and chaos (always pivoting)."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Maintaining Quality",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "When your strategy isn't working, the Brown Belt response is to:",
            options: [
                { label: "A) Double down - execution is the problem, not strategy", correct: false },
        { label: "B) Immediately pivot to a completely new strategy", correct: false },
        { label: "C) Distinguish: Is the strategy wrong, or is execution failing? Investigate before deciding", correct: true },
        { label: "D) Blame external factors and wait for conditions to improve", correct: false }
            ],
            correctFeedback: "✓ Correct! Brown Belt leaders distinguish strategy failure from execution failure before changing course. Strategy failure = 'We're executing well, but the strategy itself is flawed.' Execution failure = 'The strategy is sound, but we're not executing it well.' Example: Sales are down. Is it strategy (wrong target market) or execution (poor sales process)? Investigate first. Good strategies fail due to poor execution. Don't pivot until you know which is broken.",
            incorrectFeedback: "Not quite. Brown Belt leaders distinguish strategy failure from execution failure before changing course. Strategy failure = 'We're executing well, but the strategy itself is flawed.' Execution failure = 'The strategy is sound, but we're not executing it well.' Example: Sales are down. Is it strategy (wrong target market) or execution (poor sales process)? Investigate first. Good strategies fail due to poor execution. Don't pivot until you know which is broken."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Maintaining Quality",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "The 4 Disciplines of Execution (McChesney) focus on:",
            options: [
                { label: "A) Setting clear goals and tracking progress", correct: false },
        { label: "B) Focusing on wildly important goals, acting on lead measures, keeping a compelling scoreboard, and creating accountability cadence", correct: true },
        { label: "C) Planning, executing, monitoring, and adjusting", correct: false },
        { label: "D) Vision, strategy, tactics, and metrics", correct: false }
            ],
            correctFeedback: "✓ Correct! 4DX is a framework for executing strategy: (1) Focus on 1-2 wildly important goals (WIGs) - you can't do everything, (2) Act on lead measures (predictive metrics you can influence), (3) Keep a compelling scoreboard (visible, simple, shows progress), (4) Create accountability cadence (regular check-ins on commitments). Brown Belt leaders use 4DX to bridge strategy and execution - making the important visible and the visible important.",
            incorrectFeedback: "Not quite. 4DX is a framework for executing strategy: (1) Focus on 1-2 wildly important goals (WIGs) - you can't do everything, (2) Act on lead measures (predictive metrics you can influence), (3) Keep a compelling scoreboard (visible, simple, shows progress), (4) Create accountability cadence (regular check-ins on commitments). Brown Belt leaders use 4DX to bridge strategy and execution - making the important visible and the visible important."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Maintaining Quality",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "Course correction vs. pivoting means:",
            options: [
                { label: "A) Course correction adjusts tactics, pivoting changes strategy", correct: true },
        { label: "B) They're the same thing - just adjusting direction", correct: false },
        { label: "C) Course correction happens quarterly, pivoting happens annually", correct: false },
        { label: "D) Pivoting is for startups, course correction is for established companies", correct: false }
            ],
            correctFeedback: "✓ Correct! Brown Belt leaders distinguish: Course correction = adjusting HOW you execute (tactics, processes, resources). Pivoting = changing WHAT you're trying to achieve (strategy, vision, direction). Example: 'We're behind on our customer acquisition goal' → course correct: adjust marketing channels, improve onboarding. 'Our customers don't want this product' → pivot: change product strategy. Don't pivot when you need to course-correct. Don't course-correct when you need to pivot.",
            incorrectFeedback: "Not quite. Brown Belt leaders distinguish: Course correction = adjusting HOW you execute (tactics, processes, resources). Pivoting = changing WHAT you're trying to achieve (strategy, vision, direction). Example: 'We're behind on our customer acquisition goal' → course correct: adjust marketing channels, improve onboarding. 'Our customers don't want this product' → pivot: change product strategy. Don't pivot when you need to course-correct. Don't course-correct when you need to pivot."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Maintaining Quality",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on standards & metrics principles and practices.</p>
</div>`,
        question: {
            text: "Balancing vision (where we're going) with execution (what we do today) requires:",
            options: [
                { label: "A) Focusing entirely on vision - execution will follow", correct: false },
        { label: "B) Focusing entirely on execution - vision is just words", correct: false },
        { label: "C) Connecting today's work explicitly to the vision through milestones and progress", correct: true },
        { label: "D) Alternating focus - vision one quarter, execution the next", correct: false }
            ],
            correctFeedback: "✓ Correct! Brown Belt leaders hold vision and execution simultaneously. They: (1) Keep vision visible (regular communication), (2) Show progress toward vision (milestones, wins), (3) Connect daily work to vision ('We're doing X because it moves us toward Y'), (4) Adjust execution while holding vision steady. This prevents both 'vision without execution' (all talk) and 'execution without vision' (directionless activity). Vision provides direction, execution provides momentum.",
            incorrectFeedback: "Not quite. Brown Belt leaders hold vision and execution simultaneously. They: (1) Keep vision visible (regular communication), (2) Show progress toward vision (milestones, wins), (3) Connect daily work to vision ('We're doing X because it moves us toward Y'), (4) Adjust execution while holding vision steady. This prevents both 'vision without execution' (all talk) and 'execution without vision' (directionless activity). Vision provides direction, execution provides momentum."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
