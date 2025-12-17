// ===== BLUE BELT STRIPE 1: CONFLICT FOUNDATIONS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Understanding Productive Conflict",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "In BJJ, what do people who progress fastest do?",
            options: [
                { label: "A) Never tap out", correct: false },
        { label: "B) Tap early and ask questions", correct: true },
        { label: "C) Only train with lower belts", correct: false },
        { label: "D) Avoid difficult positions", correct: false }
            ],
            correctFeedback: "✓ Correct! Tapping early and asking questions shows vulnerability and accelerates learning, just like in teams.",
            incorrectFeedback: "Not quite. Tapping early and asking questions shows vulnerability and accelerates learning, just like in teams."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Conflict vs Artificial Harmony",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "Productive conflict focuses on:",
            options: [
                { label: "A) Winning arguments", correct: false },
        { label: "B) Issues, not individuals", correct: true },
        { label: "C) Being polite", correct: false },
        { label: "D) Avoiding disagreement", correct: false }
            ],
            correctFeedback: "✓ Correct! Productive conflict attacks problems, not people. It focuses on issues and ideas, not personalities or positions.",
            incorrectFeedback: "Not quite. Productive conflict attacks problems, not people. It focuses on issues and ideas, not personalities or positions."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "The Cost of Avoiding Conflict",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "According to research, conflict avoidance costs U.S. businesses annually:",
            options: [
                { label: "A) $35 billion", correct: false },
        { label: "B) $100 billion", correct: false },
        { label: "C) $359 billion", correct: true },
        { label: "D) $500 billion", correct: false }
            ],
            correctFeedback: "✓ Correct! Research shows conflict avoidance costs U.S. businesses $359 billion annually in wasted time, poor decisions, and lost productivity.",
            incorrectFeedback: "Not quite. Research shows conflict avoidance costs U.S. businesses $359 billion annually in wasted time, poor decisions, and lost productivity."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Building Trust Through Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "What is 'conflict debt'?",
            options: [
                { label: "A) Money owed from disputes", correct: false },
        { label: "B) Accumulated unresolved disagreements that compound over time", correct: true },
        { label: "C) Legal costs", correct: false },
        { label: "D) Time wasted in debates", correct: false }
            ],
            correctFeedback: "✓ Correct! Conflict debt is the accumulation of unresolved disagreements. Like technical debt, it compounds and becomes harder to address.",
            incorrectFeedback: "Not quite. Conflict debt is the accumulation of unresolved disagreements. Like technical debt, it compounds and becomes harder to address."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Building Trust Through Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "High-performing teams resolve conflicts:",
            options: [
                { label: "A) Within 48 hours", correct: true },
        { label: "B) Within 2 weeks", correct: false },
        { label: "C) Within a month", correct: false },
        { label: "D) Only when absolutely necessary", correct: false }
            ],
            correctFeedback: "✓ Correct! High-performing teams address conflicts quickly, typically within 48 hours. Unresolved conflict erodes trust and team performance.",
            incorrectFeedback: "Not quite. High-performing teams address conflicts quickly, typically within 48 hours. Unresolved conflict erodes trust and team performance."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Building Trust Through Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "What enables teams to have productive conflict?",
            options: [
                { label: "A) Avoiding difficult topics", correct: false },
        { label: "B) Building vulnerability-based trust first", correct: true },
        { label: "C) Having only experienced team members", correct: false },
        { label: "D) Setting strict rules", correct: false }
            ],
            correctFeedback: "✓ Correct! Productive conflict requires vulnerability-based trust first. Without trust, teams fear conflict and default to artificial harmony.",
            incorrectFeedback: "Not quite. Productive conflict requires vulnerability-based trust first. Without trust, teams fear conflict and default to artificial harmony."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Building Trust Through Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "What happens when teams avoid conflict?",
            options: [
                { label: "A) Decisions are made faster", correct: false },
        { label: "B) Important issues are buried and resurface later", correct: true },
        { label: "C) Team harmony improves", correct: false },
        { label: "D) Productivity increases", correct: false }
            ],
            correctFeedback: "✓ Correct! Avoiding conflict buries important issues. They don't disappear; they resurface later, often as bigger problems with more damage.",
            incorrectFeedback: "Not quite. Avoiding conflict buries important issues. They don't disappear; they resurface later, often as bigger problems with more damage."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Building Trust Through Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "In BJJ, conflict is like:",
            options: [
                { label: "A) Avoiding difficult positions", correct: false },
        { label: "B) Productive rolling and sparring to test techniques", correct: true },
        { label: "C) Only drilling, never sparring", correct: false },
        { label: "D) Pretending positions aren't difficult", correct: false }
            ],
            correctFeedback: "✓ Correct! In BJJ, rolling (sparring) is productive conflict. You test techniques against resistance, learning what works and what doesn't. Avoiding it means no growth.",
            incorrectFeedback: "Not quite. In BJJ, rolling (sparring) is productive conflict. You test techniques against resistance, learning what works and what doesn't. Avoiding it means no growth."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Building Trust Through Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "What is the difference between productive and destructive conflict?",
            options: [
                { label: "A) Productive conflict is quieter", correct: false },
        { label: "B) Productive conflict focuses on issues; destructive conflict attacks people", correct: true },
        { label: "C) There is no difference", correct: false },
        { label: "D) Productive conflict is shorter", correct: false }
            ],
            correctFeedback: "✓ Correct! Productive conflict debates ideas and issues. Destructive conflict attacks people, personalities, or positions. The focus matters.",
            incorrectFeedback: "Not quite. Productive conflict debates ideas and issues. Destructive conflict attacks people, personalities, or positions. The focus matters."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "Building Trust Through Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict foundations principles and practices.</p>
</div>`,
        question: {
            text: "What is the first step when conflict arises?",
            options: [
                { label: "A) Ignore it and hope it goes away", correct: false },
        { label: "B) Address it directly, focusing on the issue not the person", correct: true },
        { label: "C) Escalate immediately to management", correct: false },
        { label: "D) Document it for HR", correct: false }
            ],
            correctFeedback: "✓ Correct! Address conflict directly, focusing on the issue at hand. Direct, respectful confrontation prevents issues from festering and becoming bigger problems.",
            incorrectFeedback: "Not quite. Address conflict directly, focusing on the issue at hand. Direct, respectful confrontation prevents issues from festering and becoming bigger problems."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
