// ===== PURPLE BELT STRIPE 1: COMMITMENT FOUNDATIONS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Decision-Making Clarity",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "Your team is split 50/50 on a major technical decision. Half prefer Solution A (faster to market but technical debt), half prefer Solution B (cleaner architecture but slower). As a Purple Belt leader, your FIRST move is:",
            options: [
                { label: "A) Call a vote and go with the majority decision", correct: false },
        { label: "B) Make the executive decision yourself to break the tie", correct: false },
        { label: "C) Explore the underlying concerns driving each group's preference", correct: true },
        { label: "D) Table the decision and gather more competitive intelligence", correct: false }
            ],
            correctFeedback: "✓ Correct! Excellent strategic thinking! Purple Belt leaders understand that surface-level positions ('I want A' vs 'I want B') often hide deeper shared interests. By exploring WHY each group prefers their option, you might discover Solution C that addresses both speed AND quality. This is Roger Martin's 'integrative thinking' - refusing to accept trade-offs as permanent.",
            incorrectFeedback: "Not quite. Excellent strategic thinking! Purple Belt leaders understand that surface-level positions ('I want A' vs 'I want B') often hide deeper shared interests. By exploring WHY each group prefers their option, you might discover Solution C that addresses both speed AND quality. This is Roger Martin's 'integrative thinking' - refusing to accept trade-offs as permanent."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Understanding True Commitment",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "You notice your team consistently choosing 'urgent' tasks over 'important' strategic work. What does this pattern likely indicate?",
            options: [
                { label: "A) Your team lacks discipline and time management skills", correct: false },
        { label: "B) The system is optimized for short-term fires over long-term value", correct: true },
        { label: "C) You need to micromanage their priorities more closely", correct: false },
        { label: "D) Strategic work is less valuable than you thought", correct: false }
            ],
            correctFeedback: "✓ Correct! Perfect systems thinking! You're seeing the pattern behind the pattern. When good people consistently make suboptimal choices, the system is usually the problem, not the people. This is Peter Senge's 'Fifth Discipline' - recognizing that structures influence behavior. Your job is to redesign the system (incentives, metrics, meeting structures) to reward strategic work.",
            incorrectFeedback: "Not quite. Perfect systems thinking! You're seeing the pattern behind the pattern. When good people consistently make suboptimal choices, the system is usually the problem, not the people. This is Peter Senge's 'Fifth Discipline' - recognizing that structures influence behavior. Your job is to redesign the system (incentives, metrics, meeting structures) to reward strategic work."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Overcoming Analysis Paralysis",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "A key team member proposes a radical new approach that contradicts your current strategy. You should:",
            options: [
                { label: "A) Politely decline - consistency is crucial when executing strategy", correct: false },
        { label: "B) Ask them to prove it would work before changing course", correct: false },
        { label: "C) Create space to seriously explore the idea while maintaining current execution", correct: true },
        { label: "D) Immediately pivot if their reasoning is sound", correct: false }
            ],
            correctFeedback: "✓ Correct! Strong strategic leadership! You're balancing commitment with flexibility. Rita McGrath calls this 'discovery-driven strategy' - staying committed to your vision while remaining open to better paths. The key is creating dual tracks: execute today's strategy while seriously exploring tomorrow's possibilities. This prevents both rigid dogmatism and chaotic pivoting.",
            incorrectFeedback: "Not quite. Strong strategic leadership! You're balancing commitment with flexibility. Rita McGrath calls this 'discovery-driven strategy' - staying committed to your vision while remaining open to better paths. The key is creating dual tracks: execute today's strategy while seriously exploring tomorrow's possibilities. This prevents both rigid dogmatism and chaotic pivoting."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Creating Buy-In",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "When setting quarterly goals for your team, the most strategic approach is to:",
            options: [
                { label: "A) Set aggressive stretch goals to maximize team performance", correct: false },
        { label: "B) Let the team set their own goals to ensure buy-in", correct: false },
        { label: "C) Work backward from the future state you want to create", correct: true },
        { label: "D) Base goals on what competitors are doing", correct: false }
            ],
            correctFeedback: "✓ Correct! Excellent! You're demonstrating 'Playing to Win' strategic thinking (Roger Martin). Strategy isn't about setting goals based on current capacity or competition - it's about defining where you want to be and working backward. This forces creative thinking: 'If we must be here in 3 years, what must be true in 9 months?' This is how transformative strategies emerge.",
            incorrectFeedback: "Not quite. Excellent! You're demonstrating 'Playing to Win' strategic thinking (Roger Martin). Strategy isn't about setting goals based on current capacity or competition - it's about defining where you want to be and working backward. This forces creative thinking: 'If we must be here in 3 years, what must be true in 9 months?' This is how transformative strategies emerge."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Creating Buy-In",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "Your analysis reveals that 80% of your team's time goes to activities generating only 20% of impact. The Purple Belt response is:",
            options: [
                { label: "A) Immediately cut the low-impact work and reallocate time", correct: false },
        { label: "B) Accept this as natural - some work is necessary overhead", correct: false },
        { label: "C) Investigate WHY the system makes low-impact work feel necessary", correct: true },
        { label: "D) Hire more people to handle the low-impact tasks", correct: false }
            ],
            correctFeedback: "✓ Correct! Perfect systems analysis! You're not just seeing the symptom (80/20 mismatch), you're asking about root causes. Usually, low-impact work feels necessary because of system design: unclear priorities, poor delegation, reactive culture, or misaligned metrics. Fix the system that makes low-impact work 'urgent,' and behavior will shift naturally. This is leverage.",
            incorrectFeedback: "Not quite. Perfect systems analysis! You're not just seeing the symptom (80/20 mismatch), you're asking about root causes. Usually, low-impact work feels necessary because of system design: unclear priorities, poor delegation, reactive culture, or misaligned metrics. Fix the system that makes low-impact work 'urgent,' and behavior will shift naturally. This is leverage."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Creating Buy-In",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "You're deciding whether to enter a new market. Your team's analysis shows a 40% chance of success with high potential returns. What strategic principle should guide your decision?",
            options: [
                { label: "A) Don't enter - 40% is too risky for major resource allocation", correct: false },
        { label: "B) Enter if potential returns exceed potential losses by 2:1", correct: false },
        { label: "C) Create small experiments to reduce uncertainty before full commitment", correct: true },
        { label: "D) Enter immediately to establish first-mover advantage", correct: false }
            ],
            correctFeedback: "✓ Correct! Smart strategic experimentation! Instead of binary go/no-go decisions, Purple Belt leaders create options. Small, low-cost experiments (pilot programs, limited releases, partnerships) reveal information that reduces uncertainty. This is 'optionality' - preserving the ability to make better decisions later. Clayton Christensen's 'Jobs to Be Done' framework emphasizes learning before committing.",
            incorrectFeedback: "Not quite. Smart strategic experimentation! Instead of binary go/no-go decisions, Purple Belt leaders create options. Small, low-cost experiments (pilot programs, limited releases, partnerships) reveal information that reduces uncertainty. This is 'optionality' - preserving the ability to make better decisions later. Clayton Christensen's 'Jobs to Be Done' framework emphasizes learning before committing."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Creating Buy-In",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "Two departments are competing for the same budget allocation, each making strong cases. As a strategic leader, you should:",
            options: [
                { label: "A) Split the budget 50/50 to maintain harmony", correct: false },
        { label: "B) Give it to the department with the strongest proposal", correct: false },
        { label: "C) Reframe the question: What outcomes do we need, and which allocation best achieves them?", correct: true },
        { label: "D) Defer the decision until you have more data", correct: false }
            ],
            correctFeedback: "✓ Correct! Strategic reframing! When teams compete for resources, shift from 'Who gets what?' to 'What outcomes matter most?' This moves the conversation from zero-sum competition to collaborative problem-solving. Often, the answer isn't splitting resources - it's reimagining how to achieve outcomes differently. This is integrative thinking in action.",
            incorrectFeedback: "Not quite. Strategic reframing! When teams compete for resources, shift from 'Who gets what?' to 'What outcomes matter most?' This moves the conversation from zero-sum competition to collaborative problem-solving. Often, the answer isn't splitting resources - it's reimagining how to achieve outcomes differently. This is integrative thinking in action."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Creating Buy-In",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "Your strategic plan assumes steady market growth, but early indicators suggest a shift. What's the Purple Belt response?",
            options: [
                { label: "A) Stick to the plan - strategic plans should be stable for at least a year", correct: false },
        { label: "B) Immediately revise the entire strategy to match new conditions", correct: false },
        { label: "C) Identify which assumptions are most critical and monitor them closely", correct: true },
        { label: "D) Wait for more definitive data before making any changes", correct: false }
            ],
            correctFeedback: "✓ Correct! Assumption monitoring is key! Rita McGrath teaches that strategy is about managing assumptions, not following plans. Identify your critical assumptions (the ones that, if wrong, would invalidate your strategy) and create early-warning signals. This lets you adapt quickly when conditions shift, rather than being blindsided or overreacting to noise.",
            incorrectFeedback: "Not quite. Assumption monitoring is key! Rita McGrath teaches that strategy is about managing assumptions, not following plans. Identify your critical assumptions (the ones that, if wrong, would invalidate your strategy) and create early-warning signals. This lets you adapt quickly when conditions shift, rather than being blindsided or overreacting to noise."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Creating Buy-In",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "You're choosing between investing in customer acquisition vs. customer retention. Both are important. The strategic approach is:",
            options: [
                { label: "A) Focus on acquisition - you can't retain customers you don't have", correct: false },
        { label: "B) Focus on retention - it's cheaper than acquisition", correct: false },
        { label: "C) Calculate the lifetime value impact of each and invest where leverage is highest", correct: true },
        { label: "D) Split investment equally between both", correct: false }
            ],
            correctFeedback: "✓ Correct! Strategic leverage thinking! Instead of choosing between two goods, calculate where marginal investment creates the most value. If retention improvements yield 3x ROI but acquisition yields 1.5x, that's your answer - regardless of conventional wisdom. This is systems thinking: optimizing the whole, not individual parts. Strategic decisions are about leverage, not tradition.",
            incorrectFeedback: "Not quite. Strategic leverage thinking! Instead of choosing between two goods, calculate where marginal investment creates the most value. If retention improvements yield 3x ROI but acquisition yields 1.5x, that's your answer - regardless of conventional wisdom. This is systems thinking: optimizing the whole, not individual parts. Strategic decisions are about leverage, not tradition."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "Creating Buy-In",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on commitment foundations principles and practices.</p>
</div>`,
        question: {
            text: "Your organization faces a strategic dilemma: innovate in new areas (risky, potentially transformative) or optimize existing operations (safe, incremental gains). What's the Purple Belt approach?",
            options: [
                { label: "A) Focus on optimization - proven value is better than potential value", correct: false },
        { label: "B) Focus on innovation - incremental improvement leads to irrelevance", correct: false },
        { label: "C) Create separate tracks: optimization funds innovation, innovation reveals optimization opportunities", correct: true },
        { label: "D) Let market conditions determine the focus", correct: false }
            ],
            correctFeedback: "✓ Correct! Dual-track strategy! This is 'ambidextrous leadership' - excelling at both exploration (innovation) and exploitation (optimization). The best organizations do both simultaneously: optimization provides resources and stability; innovation provides future relevance. They're not competitors - they're complements. This requires different metrics, timelines, and even team structures. Strategic maturity means holding both tensions.",
            incorrectFeedback: "Not quite. Dual-track strategy! This is 'ambidextrous leadership' - excelling at both exploration (innovation) and exploitation (optimization). The best organizations do both simultaneously: optimization provides resources and stability; innovation provides future relevance. They're not competitors - they're complements. This requires different metrics, timelines, and even team structures. Strategic maturity means holding both tensions."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
