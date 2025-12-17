// ===== PURPLE BELT STRIPE 2: DECISION CLARITY =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Strategic Decision Frameworks",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "Your team keeps missing deadlines despite working harder. You notice they're constantly interrupted by urgent requests. This is a:",
            options: [
                { label: "A) People problem - they need better time management training", correct: false },
        { label: "B) System problem - the work design creates constant interruption", correct: true },
        { label: "C) Resource problem - you need to hire more people", correct: false },
        { label: "D) Priority problem - they're not focusing on the right work", correct: false }
            ],
            correctFeedback: "✓ Correct! Systems thinking recognizes that patterns reveal structures. When capable people consistently produce poor results, the system is usually designed to produce those results. Interruptions aren't random - they're built into workflows, notification systems, and cultural expectations. Fix the system (batch communication, protected time blocks, clearer priorities) and behavior changes automatically.",
            incorrectFeedback: "Not quite. Systems thinking recognizes that patterns reveal structures. When capable people consistently produce poor results, the system is usually designed to produce those results. Interruptions aren't random - they're built into workflows, notification systems, and cultural expectations. Fix the system (batch communication, protected time blocks, clearer priorities) and behavior changes automatically."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Prioritization Principles",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "You implement a new policy to solve a problem, but it creates two new problems. This likely means:",
            options: [
                { label: "A) The policy was poorly designed", correct: false },
        { label: "B) You're seeing unintended consequences of a structural fix", correct: true },
        { label: "C) People are resisting change", correct: false },
        { label: "D) The original problem wasn't worth solving", correct: false }
            ],
            correctFeedback: "✓ Correct! Systems have feedback loops. When you push in one place, the system pushes back elsewhere. This is why 'quick fixes' often create new problems. Systems thinking maps causal loops: 'If we do X, then Y happens, which causes Z...' The solution isn't better policies - it's understanding the system structure that creates the pattern in the first place.",
            incorrectFeedback: "Not quite. Systems have feedback loops. When you push in one place, the system pushes back elsewhere. This is why 'quick fixes' often create new problems. Systems thinking maps causal loops: 'If we do X, then Y happens, which causes Z...' The solution isn't better policies - it's understanding the system structure that creates the pattern in the first place."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Managing Trade-Offs",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "You notice that the more you track a metric, the less useful it becomes. This is an example of:",
            options: [
                { label: "A) Poor measurement design", correct: false },
        { label: "B) Goodhart's Law - when a measure becomes a target, it ceases to be a good measure", correct: true },
        { label: "C) Metric fatigue", correct: false },
        { label: "D) Need for better analytics tools", correct: false }
            ],
            correctFeedback: "✓ Correct! Goodhart's Law is a classic systems thinking insight: when you optimize for a metric, people game the metric. The measure loses its informational value. Systems thinkers use metrics to understand, not to control. The solution is balancing metrics (measure multiple dimensions) and focusing on outcomes, not just outputs.",
            incorrectFeedback: "Not quite. Goodhart's Law is a classic systems thinking insight: when you optimize for a metric, people game the metric. The measure loses its informational value. Systems thinkers use metrics to understand, not to control. The solution is balancing metrics (measure multiple dimensions) and focusing on outcomes, not just outputs."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Communicating Decisions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "Your team productivity increases after removing a status update meeting. This suggests:",
            options: [
                { label: "A) The meeting was a waste of time", correct: false },
        { label: "B) The meeting created a negative feedback loop (more updates = more confusion = less productivity)", correct: true },
        { label: "C) People work better without oversight", correct: false },
        { label: "D) The meeting time was needed for actual work", correct: false }
            ],
            correctFeedback: "✓ Correct! Systems thinking identifies feedback loops. Some structures amplify problems (reinforcing loops) or create delays that cause oscillations (balancing loops). Meetings often create unintended feedback: status updates → misalignment → more updates → less time for work → worse outcomes → more updates. Removing the loop improves the system more than optimizing individual components.",
            incorrectFeedback: "Not quite. Systems thinking identifies feedback loops. Some structures amplify problems (reinforcing loops) or create delays that cause oscillations (balancing loops). Meetings often create unintended feedback: status updates → misalignment → more updates → less time for work → worse outcomes → more updates. Removing the loop improves the system more than optimizing individual components."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Communicating Decisions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "You want to improve team collaboration. The systems thinking approach is to:",
            options: [
                { label: "A) Create more collaboration tools and platforms", correct: false },
        { label: "B) Mandate regular collaboration sessions", correct: false },
        { label: "C) Understand what structural barriers prevent natural collaboration", correct: true },
        { label: "D) Reward individual collaboration efforts", correct: false }
            ],
            correctFeedback: "✓ Correct! Systems thinking asks: What structures make collaboration difficult? Is it reward systems (individual bonuses)? Physical layout (separate offices)? Workflow design (siloed processes)? Information architecture (hoarded knowledge)? Fix the structural barriers, and collaboration emerges naturally. Adding tools without fixing structures just adds complexity.",
            incorrectFeedback: "Not quite. Systems thinking asks: What structures make collaboration difficult? Is it reward systems (individual bonuses)? Physical layout (separate offices)? Workflow design (siloed processes)? Information architecture (hoarded knowledge)? Fix the structural barriers, and collaboration emerges naturally. Adding tools without fixing structures just adds complexity."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Communicating Decisions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "A project is consistently late. You discover each team member adds 'safety buffers' to their estimates. This creates:",
            options: [
                { label: "A) A planning problem - estimates are too conservative", correct: false },
        { label: "B) A coordination problem - buffers don't align across teams", correct: false },
        { label: "C) A system effect - individual rational decisions create collective irrationality", correct: true },
        { label: "D) A trust problem - people don't believe the timeline", correct: false }
            ],
            correctFeedback: "✓ Correct! This is the 'Student Syndrome' - a systems archetype. Individual buffers seem rational, but they create system delays: late starts (plenty of time), delayed handoffs (my buffer, not yours), and accumulated delays. The system structure (individual estimation, sequential dependencies) creates the pattern. Fix: shared buffers, parallel work, earlier starts, and measuring system time, not individual time.",
            incorrectFeedback: "Not quite. This is the 'Student Syndrome' - a systems archetype. Individual buffers seem rational, but they create system delays: late starts (plenty of time), delayed handoffs (my buffer, not yours), and accumulated delays. The system structure (individual estimation, sequential dependencies) creates the pattern. Fix: shared buffers, parallel work, earlier starts, and measuring system time, not individual time."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Communicating Decisions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "You notice that faster response times to customer issues correlate with more issues overall. This likely indicates:",
            options: [
                { label: "A) Faster responses cause more problems", correct: false },
        { label: "B) A balancing feedback loop - quick fixes don't address root causes", correct: true },
        { label: "C) Measurement error - correlation isn't causation", correct: false },
        { label: "D) Customer expectations are increasing", correct: false }
            ],
            correctFeedback: "✓ Correct! This is 'Shifting the Burden' - a systems archetype. Quick fixes (fast responses) reduce symptoms temporarily but don't address underlying causes. The system learns to depend on quick fixes, creating more issues. The leverage point is fixing root causes (better product, clearer documentation, prevention), even if it slows initial responses. Systems thinking finds leverage points.",
            incorrectFeedback: "Not quite. This is 'Shifting the Burden' - a systems archetype. Quick fixes (fast responses) reduce symptoms temporarily but don't address underlying causes. The system learns to depend on quick fixes, creating more issues. The leverage point is fixing root causes (better product, clearer documentation, prevention), even if it slows initial responses. Systems thinking finds leverage points."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Communicating Decisions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "Your organization\'s innovation rate has decreased despite hiring more creative people. Systems thinking suggests:",
            options: [
                { label: "A) You're hiring the wrong people", correct: false },
        { label: "B) The innovation system (processes, metrics, rewards) has changed to favor safety over creativity", correct: true },
        { label: "C) Market conditions have changed", correct: false },
        { label: "D) Innovation naturally declines as organizations grow", correct: false }
            ],
            correctFeedback: "✓ Correct! Systems thinking distinguishes people from system design. If changing people doesn't change outcomes, the system is the problem. Innovation systems include: risk tolerance, failure acceptance, experimentation time, reward structures, and decision-making processes. These structures determine innovation rates more than individual creativity. Fix the innovation system, not just the people.",
            incorrectFeedback: "Not quite. Systems thinking distinguishes people from system design. If changing people doesn't change outcomes, the system is the problem. Innovation systems include: risk tolerance, failure acceptance, experimentation time, reward structures, and decision-making processes. These structures determine innovation rates more than individual creativity. Fix the innovation system, not just the people."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Communicating Decisions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on decision clarity principles and practices.</p>
</div>`,
        question: {
            text: "You improve a process in Department A, but overall organizational performance doesn't improve. This is because:",
            options: [
                { label: "A) The improvement wasn't significant enough", correct: false },
        { label: "B) Department A isn't the bottleneck - optimizing non-bottlenecks doesn't improve the system", correct: true },
        { label: "C) Other departments are counteracting the improvement", correct: false },
        { label: "D) The metrics are flawed", correct: false }
            ],
            correctFeedback: "✓ Correct! Systems thinking applies the Theory of Constraints: system performance is limited by the bottleneck. Optimizing non-bottlenecks (Department A) doesn't improve system throughput - it just creates more inventory/waste. Find the constraint, optimize it, then find the next constraint. System optimization, not local optimization, is the goal.",
            incorrectFeedback: "Not quite. Systems thinking applies the Theory of Constraints: system performance is limited by the bottleneck. Optimizing non-bottlenecks (Department A) doesn't improve system throughput - it just creates more inventory/waste. Find the constraint, optimize it, then find the next constraint. System optimization, not local optimization, is the goal."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
