// ===== BLUE BELT STRIPE 3: TEAM CONFLICT PROTOCOLS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Establishing Conflict Norms",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
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
        lessonTitle: "Facilitating Healthy Debate",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "Conflict norms are:",
            options: [
                { label: "A) Unnecessary formalities", correct: false },
        { label: "B) Explicit team agreements about how to handle disagreements", correct: true },
        { label: "C) Ways to avoid conflict", correct: false },
        { label: "D) HR policies", correct: false }
            ],
            correctFeedback: "✓ Correct! Conflict norms are explicit agreements teams make about how to handle disagreements. They create predictability and safety.",
            incorrectFeedback: "Not quite. Conflict norms are explicit agreements teams make about how to handle disagreements. They create predictability and safety."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Resolving Team Tensions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "The devil's advocate role helps teams:",
            options: [
                { label: "A) Create unnecessary arguments", correct: false },
        { label: "B) Stress-test ideas before committing", correct: true },
        { label: "C) Delay decisions", correct: false },
        { label: "D) Undermine leadership", correct: false }
            ],
            correctFeedback: "✓ Correct! The devil's advocate role assigns someone to challenge ideas, helping teams find weaknesses before committing to decisions.",
            incorrectFeedback: "Not quite. The devil's advocate role assigns someone to challenge ideas, helping teams find weaknesses before committing to decisions."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Creating Psychological Safety for Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "Conflict retrospectives should ask:",
            options: [
                { label: "A) Who was right?", correct: false },
        { label: "B) How did we handle conflict and what can we learn?", correct: true },
        { label: "C) Should we avoid conflict next time?", correct: false },
        { label: "D) Who needs to be punished?", correct: false }
            ],
            correctFeedback: "✓ Correct! Conflict retrospectives focus on process: How did we handle it? What worked? What can we improve? This builds conflict capability.",
            incorrectFeedback: "Not quite. Conflict retrospectives focus on process: How did we handle it? What worked? What can we improve? This builds conflict capability."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Creating Psychological Safety for Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "When should conflicts be escalated?",
            options: [
                { label: "A) Immediately when they arise", correct: false },
        { label: "B) Never - teams should handle everything", correct: false },
        { label: "C) When unresolved and impacting team performance", correct: true },
        { label: "D) Only in emergencies", correct: false }
            ],
            correctFeedback: "✓ Correct! Escalate conflicts when teams can't resolve them and performance is impacted. Don't escalate immediately; give teams a chance first.",
            incorrectFeedback: "Not quite. Escalate conflicts when teams can't resolve them and performance is impacted. Don't escalate immediately; give teams a chance first."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Creating Psychological Safety for Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "What is a 'conflict contract'?",
            options: [
                { label: "A) A legal document", correct: false },
        { label: "B) A team agreement on how to handle disagreements", correct: true },
        { label: "C) An HR policy", correct: false },
        { label: "D) A performance review", correct: false }
            ],
            correctFeedback: "✓ Correct! A conflict contract is a team-created agreement outlining how they'll handle disagreements. It makes conflict predictable and safe.",
            incorrectFeedback: "Not quite. A conflict contract is a team-created agreement outlining how they'll handle disagreements. It makes conflict predictable and safe."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Creating Psychological Safety for Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "Red/yellow card system in conflict means:",
            options: [
                { label: "A) Punishing people", correct: false },
        { label: "B) Warning system: yellow = address it, red = escalate", correct: true },
        { label: "C) Scoring conflict", correct: false },
        { label: "D) Avoiding conflict", correct: false }
            ],
            correctFeedback: "✓ Correct! Red/yellow card system provides a warning mechanism. Yellow = address the conflict pattern, Red = it's time to escalate or intervene.",
            incorrectFeedback: "Not quite. Red/yellow card system provides a warning mechanism. Yellow = address the conflict pattern, Red = it's time to escalate or intervene."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Creating Psychological Safety for Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "What happens when teams lack conflict norms?",
            options: [
                { label: "A) They avoid conflict more", correct: false },
        { label: "B) Conflict becomes unpredictable and destructive", correct: true },
        { label: "C) They handle conflict better", correct: false },
        { label: "D) Nothing changes", correct: false }
            ],
            correctFeedback: "✓ Correct! Without conflict norms, disagreements are unpredictable. Team members don't know what to expect, leading to avoidance or destructive patterns.",
            incorrectFeedback: "Not quite. Without conflict norms, disagreements are unpredictable. Team members don't know what to expect, leading to avoidance or destructive patterns."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Creating Psychological Safety for Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "In BJJ, conflict protocols are like:",
            options: [
                { label: "A) Random techniques", correct: false },
        { label: "B) Agreed rules of rolling: tap means stop, respect positions", correct: true },
        { label: "C) No rules", correct: false },
        { label: "D) Only attacking", correct: false }
            ],
            correctFeedback: "✓ Correct! BJJ has clear protocols: tap means stop, respect positions, no illegal moves. These rules make intense conflict (rolling) safe and productive.",
            incorrectFeedback: "Not quite. BJJ has clear protocols: tap means stop, respect positions, no illegal moves. These rules make intense conflict (rolling) safe and productive."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "Creating Psychological Safety for Disagreement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on team conflict protocols principles and practices.</p>
</div>`,
        question: {
            text: "The best time to establish conflict norms is:",
            options: [
                { label: "A) During a conflict", correct: false },
        { label: "B) When the team first forms, before conflicts arise", correct: true },
        { label: "C) After major conflicts", correct: false },
        { label: "D) Never", correct: false }
            ],
            correctFeedback: "✓ Correct! Establish conflict norms proactively when the team forms. Trying to create rules during a heated conflict rarely works well.",
            incorrectFeedback: "Not quite. Establish conflict norms proactively when the team forms. Trying to create rules during a heated conflict rarely works well."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
