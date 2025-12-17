// ===== BLUE BELT STRIPE 2: DIFFICULT CONVERSATIONS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "The STATE Framework",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
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
        lessonTitle: "Managing Crucial Conversations",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "The COIN method stands for:",
            options: [
                { label: "A) Context-Opinion-Insight-Next", correct: false },
        { label: "B) Connection-Observation-Impact-Next", correct: true },
        { label: "C) Clarity-Outcome-Implementation-Now", correct: false },
        { label: "D) Communicate-Organize-Integrate-Navigate", correct: false }
            ],
            correctFeedback: "✓ Correct! COIN = Connection, Observation, Impact, Next. This framework helps structure difficult conversations productively.",
            incorrectFeedback: "Not quite. COIN = Connection, Observation, Impact, Next. This framework helps structure difficult conversations productively."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Staying Calm Under Pressure",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "Separating impact from intent means:",
            options: [
                { label: "A) Ignoring intentions", correct: false },
        { label: "B) Assuming positive intent while addressing negative impact", correct: true },
        { label: "C) Only focusing on outcomes", correct: false },
        { label: "D) Judging people by their intentions", correct: false }
            ],
            correctFeedback: "✓ Correct! Separate impact from intent: assume the person had good intentions (intent) but address the negative consequences (impact) of their actions.",
            incorrectFeedback: "Not quite. Separate impact from intent: assume the person had good intentions (intent) but address the negative consequences (impact) of their actions."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Finding Common Ground",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "An amygdala hijack refers to:",
            options: [
                { label: "A) A leadership crisis", correct: false },
        { label: "B) When emotional response overrides rational thinking", correct: true },
        { label: "C) A conflict resolution technique", correct: false },
        { label: "D) Team dysfunction", correct: false }
            ],
            correctFeedback: "✓ Correct! An amygdala hijack occurs when your emotional brain (amygdala) overrides your rational brain, causing reactive, unproductive responses.",
            incorrectFeedback: "Not quite. An amygdala hijack occurs when your emotional brain (amygdala) overrides your rational brain, causing reactive, unproductive responses."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Finding Common Ground",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "When should you pause vs. push in difficult conversations?",
            options: [
                { label: "A) Always push for resolution", correct: false },
        { label: "B) Always pause to avoid conflict", correct: false },
        { label: "C) Read signals and choose strategically", correct: true },
        { label: "D) Let the other person decide", correct: false }
            ],
            correctFeedback: "✓ Correct! Effective conflict requires reading the situation. Sometimes you pause (de-escalate), sometimes you push (maintain pressure). Context matters.",
            incorrectFeedback: "Not quite. Effective conflict requires reading the situation. Sometimes you pause (de-escalate), sometimes you push (maintain pressure). Context matters."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Finding Common Ground",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "What is the 'purpose check' before a difficult conversation?",
            options: [
                { label: "A) Check if you want to win", correct: false },
        { label: "B) Clarify your goal: inform, influence, or understand", correct: true },
        { label: "C) Decide who is right", correct: false },
        { label: "D) Determine consequences", correct: false }
            ],
            correctFeedback: "✓ Correct! Before difficult conversations, clarify your purpose. Are you trying to inform, influence behavior, or understand? This guides your approach.",
            incorrectFeedback: "Not quite. Before difficult conversations, clarify your purpose. Are you trying to inform, influence behavior, or understand? This guides your approach."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Finding Common Ground",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "Active listening in conflict means:",
            options: [
                { label: "A) Waiting for your turn to speak", correct: false },
        { label: "B) Fully understanding the other person's perspective before responding", correct: true },
        { label: "C) Agreeing with everything", correct: false },
        { label: "D) Taking notes", correct: false }
            ],
            correctFeedback: "✓ Correct! Active listening means genuinely seeking to understand the other person's perspective, not just waiting for your turn to make your point.",
            incorrectFeedback: "Not quite. Active listening means genuinely seeking to understand the other person's perspective, not just waiting for your turn to make your point."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Finding Common Ground",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "What should you do if a conversation becomes heated?",
            options: [
                { label: "A) Keep pushing until resolved", correct: false },
        { label: "B) Take a break and revisit when emotions have calmed", correct: true },
        { label: "C) Bring in more people", correct: false },
        { label: "D) Ignore the heat", correct: false }
            ],
            correctFeedback: "✓ Correct! When emotions run high, pause the conversation. Schedule a follow-up when everyone can think clearly. Continuing while heated rarely resolves anything.",
            incorrectFeedback: "Not quite. When emotions run high, pause the conversation. Schedule a follow-up when everyone can think clearly. Continuing while heated rarely resolves anything."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Finding Common Ground",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "In BJJ, difficult conversations are like:",
            options: [
                { label: "A) Avoiding tough positions", correct: false },
        { label: "B) Drilling submissions with resistance to learn what works", correct: true },
        { label: "C) Only rolling with lower belts", correct: false },
        { label: "D) Pretending techniques always work", correct: false }
            ],
            correctFeedback: "✓ Correct! Just like drilling with resistance tests techniques, difficult conversations test and strengthen your communication skills. Avoidance prevents growth.",
            incorrectFeedback: "Not quite. Just like drilling with resistance tests techniques, difficult conversations test and strengthen your communication skills. Avoidance prevents growth."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "Finding Common Ground",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on difficult conversations principles and practices.</p>
</div>`,
        question: {
            text: "The best outcome of a difficult conversation is:",
            options: [
                { label: "A) You win the argument", correct: false },
        { label: "B) Both parties understand each other better", correct: true },
        { label: "C) One person admits they were wrong", correct: false },
        { label: "D) The issue is forgotten", correct: false }
            ],
            correctFeedback: "✓ Correct! The best outcome is mutual understanding, even if you don't fully agree. Understanding enables better collaboration going forward.",
            incorrectFeedback: "Not quite. The best outcome is mutual understanding, even if you don't fully agree. Understanding enables better collaboration going forward."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
