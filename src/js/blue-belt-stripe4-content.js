// ===== BLUE BELT STRIPE 4: CONFLICT MASTERY =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Advanced Conflict Resolution",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
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
        lessonTitle: "Transforming Conflict to Innovation",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "Cross-cultural conflict requires understanding:",
            options: [
                { label: "A) Everyone should adapt to your culture", correct: false },
        { label: "B) Different cultures have different conflict norms", correct: true },
        { label: "C) Conflict is universal", correct: false },
        { label: "D) Only language barriers matter", correct: false }
            ],
            correctFeedback: "✓ Correct! Different cultures have different conflict norms. Understanding these differences prevents miscommunication and enables productive cross-cultural conflict.",
            incorrectFeedback: "Not quite. Different cultures have different conflict norms. Understanding these differences prevents miscommunication and enables productive cross-cultural conflict."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Leading Through Difficult Decisions",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "In remote teams, conflict should be handled:",
            options: [
                { label: "A) Always via text/email", correct: false },
        { label: "B) Move to video when possible for nuance", correct: true },
        { label: "C) Avoid conflict entirely", correct: false },
        { label: "D) Wait for in-person meetings", correct: false }
            ],
            correctFeedback: "✓ Correct! Remote conflict requires extra care. Move to video calls when possible - tone and body language matter. Text/email lose critical nuance.",
            incorrectFeedback: "Not quite. Remote conflict requires extra care. Move to video calls when possible - tone and body language matter. Text/email lose critical nuance."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Building Conflict-Resilient Teams",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "When conflict goes wrong, the best approach is:",
            options: [
                { label: "A) Pretend it didn't happen", correct: false },
        { label: "B) Revisit and repair explicitly", correct: true },
        { label: "C) Wait for time to heal it", correct: false },
        { label: "D) Blame the other person", correct: false }
            ],
            correctFeedback: "✓ Correct! When conflict goes wrong, don't ignore it. Explicitly revisit and repair. Acknowledge what happened, apologize if needed, and reset.",
            incorrectFeedback: "Not quite. When conflict goes wrong, don't ignore it. Explicitly revisit and repair. Acknowledge what happened, apologize if needed, and reset."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Building Conflict-Resilient Teams",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "The bridge from conflict to commitment requires:",
            options: [
                { label: "A) Everyone agreeing", correct: false },
        { label: "B) Full debate followed by explicit commitment question", correct: true },
        { label: "C) Voting on decisions", correct: false },
        { label: "D) Leadership decree", correct: false }
            ],
            correctFeedback: "✓ Correct! After full conflict and debate, explicitly ask: 'Can everyone commit to this decision?' This bridges conflict to commitment.",
            incorrectFeedback: "Not quite. After full conflict and debate, explicitly ask: 'Can everyone commit to this decision?' This bridges conflict to commitment."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Building Conflict-Resilient Teams",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "What is conflict 'repair work'?",
            options: [
                { label: "A) Fixing equipment", correct: false },
        { label: "B) Explicitly addressing and mending relationships after conflict", correct: true },
        { label: "C) Documenting conflicts", correct: false },
        { label: "D) Punishing wrongdoers", correct: false }
            ],
            correctFeedback: "✓ Correct! Conflict repair work means explicitly addressing relationship damage after conflict. It involves acknowledgment, apology if needed, and rebuilding trust.",
            incorrectFeedback: "Not quite. Conflict repair work means explicitly addressing relationship damage after conflict. It involves acknowledgment, apology if needed, and rebuilding trust."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Building Conflict-Resilient Teams",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "Mastery of conflict means:",
            options: [
                { label: "A) Always winning arguments", correct: false },
        { label: "B) Engaging in productive conflict consistently, even when uncomfortable", correct: true },
        { label: "C) Avoiding all conflict", correct: false },
        { label: "D) Only having conflict in meetings", correct: false }
            ],
            correctFeedback: "✓ Correct! Conflict mastery isn't about winning; it's about consistently engaging in productive conflict when needed, even when it's uncomfortable.",
            incorrectFeedback: "Not quite. Conflict mastery isn't about winning; it's about consistently engaging in productive conflict when needed, even when it's uncomfortable."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Building Conflict-Resilient Teams",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "In BJJ, mastering conflict (rolling) means:",
            options: [
                { label: "A) Never tapping", correct: false },
        { label: "B) Rolling regularly, learning from each roll, adapting", correct: true },
        { label: "C) Only rolling when you can win", correct: false },
        { label: "D) Avoiding difficult partners", correct: false }
            ],
            correctFeedback: "✓ Correct! BJJ mastery means rolling regularly, learning from each roll, and adapting. Avoiding conflict (rolling) prevents growth. Same in teams.",
            incorrectFeedback: "Not quite. BJJ mastery means rolling regularly, learning from each roll, and adapting. Avoiding conflict (rolling) prevents growth. Same in teams."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Building Conflict-Resilient Teams",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on conflict mastery principles and practices.</p>
</div>`,
        question: {
            text: "The ultimate goal of productive conflict is:",
            options: [
                { label: "A) Winning", correct: false },
        { label: "B) Better decisions and stronger team relationships", correct: true },
        { label: "C) Proving you're right", correct: false },
        { label: "D) Avoiding future conflict", correct: false }
            ],
            correctFeedback: "✓ Correct! The goal of productive conflict is better decisions and stronger relationships. It's not about winning; it's about collective improvement.",
            incorrectFeedback: "Not quite. The goal of productive conflict is better decisions and stronger relationships. It's not about winning; it's about collective improvement."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
