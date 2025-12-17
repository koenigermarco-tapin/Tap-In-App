// ===== BLACK BELT STRIPE 1: RESULTS FOCUS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Collective Results vs Individual Achievement",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on understanding why collective results matter more than individual achievement in high-performing teams.</p>
</div>`,
        question: {
            text: "A team member delivers exceptional individual results but undermines team cohesion. The Black Belt response is:",
            options: [
                { label: "A) Celebrate the individual achievement publicly", correct: false },
                { label: "B) Address the behavior privately, prioritizing team results", correct: true },
                { label: "C) Ignore it if results are good", correct: false },
                { label: "D) Remove them immediately", correct: false }
            ],
            correctFeedback: "✓ Correct! Black Belts understand that team results always trump individual achievements. They address behavior that undermines the collective.",
            incorrectFeedback: "Not quite. Black Belts understand that team results always trump individual achievements. They address behavior that undermines the collective."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Outcome Orientation",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>High-performing teams focus relentlessly on outcomes, not activities or effort.</p>
</div>`,
        question: {
            text: "Your team is working extremely hard but missing targets. What's the Black Belt priority?",
            options: [
                { label: "A) Recognize the effort and hard work", correct: false },
                { label: "B) Investigate why effort isn't converting to results", correct: true },
                { label: "C) Push for more hours", correct: false },
                { label: "D) Replace team members", correct: false }
            ],
            correctFeedback: "✓ Correct! Black Belts focus on outcomes. Effort matters, but results are what count. Investigate systemic issues.",
            incorrectFeedback: "Not quite. Black Belts focus on outcomes. Effort matters, but results are what count. Investigate systemic issues."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Results-Driven Culture",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>Creating a culture where results are the ultimate measure of success.</p>
</div>`,
        question: {
            text: "What distinguishes a results-oriented culture from an activity-oriented one?",
            options: [
                { label: "A) Focus on hours worked", correct: false },
                { label: "B) Focus on measurable outcomes and impact", correct: true },
                { label: "C) Focus on process compliance", correct: false },
                { label: "D) Focus on being busy", correct: false }
            ],
            correctFeedback: "✓ Correct! Results cultures measure impact and outcomes, not activity or effort. Output matters more than input.",
            incorrectFeedback: "Not quite. Results cultures measure impact and outcomes, not activity or effort. Output matters more than input."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Scoreboard Thinking",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>Black Belt teams keep score and know if they're winning or losing at all times.</p>
</div>`,
        question: {
            text: "A Black Belt leader ensures the team always knows:",
            options: [
                { label: "A) Who's working hardest", correct: false },
                { label: "B) The current score and what winning looks like", correct: true },
                { label: "C) Everyone's individual metrics", correct: false },
                { label: "D) The competitor's strategies", correct: false }
            ],
            correctFeedback: "✓ Correct! Black Belt teams always know the score - they have clear, visible metrics that show if they're winning.",
            incorrectFeedback: "Not quite. Black Belt teams always know the score - they have clear, visible metrics that show if they're winning."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Team Performance Over Politics",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>Results-focused teams eliminate politics and focus energy on outcomes.</p>
</div>`,
        question: {
            text: "Two senior team members are competing for recognition. The Black Belt leader:",
            options: [
                { label: "A) Let them compete - it drives performance", correct: false },
                { label: "B) Redirect focus to collective team results", correct: true },
                { label: "C) Pick a winner to end the conflict", correct: false },
                { label: "D) Ignore it if results are good", correct: false }
            ],
            correctFeedback: "✓ Correct! Internal competition undermines team results. Black Belts redirect energy toward collective outcomes.",
            incorrectFeedback: "Not quite. Internal competition undermines team results. Black Belts redirect energy toward collective outcomes."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Accountability to Results",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>Elite teams hold themselves accountable to results, not excuses.</p>
</div>`,
        question: {
            text: "When a team misses a critical goal, the Black Belt approach is:",
            options: [
                { label: "A) Identify external factors and explain the miss", correct: false },
                { label: "B) Own the miss, learn, and adjust the approach", correct: true },
                { label: "C) Blame individuals who underperformed", correct: false },
                { label: "D) Lower the bar for next time", correct: false }
            ],
            correctFeedback: "✓ Correct! Extreme ownership - the team owns results and misses, learns, and adapts without excuses.",
            incorrectFeedback: "Not quite. Extreme ownership - the team owns results and misses, learns, and adapts without excuses."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Leading Indicators",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>Black Belt leaders focus on leading indicators that predict results.</p>
</div>`,
        question: {
            text: "What's the difference between leading and lagging indicators?",
            options: [
                { label: "A) Leading indicators are past results, lagging are future", correct: false },
                { label: "B) Leading indicators predict future results, lagging show past performance", correct: true },
                { label: "C) They're the same thing", correct: false },
                { label: "D) Leading indicators are for individuals only", correct: false }
            ],
            correctFeedback: "✓ Correct! Leading indicators (activities) predict future results. Lagging indicators (outcomes) show past performance.",
            incorrectFeedback: "Not quite. Leading indicators (activities) predict future results. Lagging indicators (outcomes) show past performance."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Results vs Effort",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>Understanding the critical distinction between effort and outcomes.</p>
</div>`,
        question: {
            text: "Your team consistently works 60+ hours but misses targets. This indicates:",
            options: [
                { label: "A) They need to work even harder", correct: false },
                { label: "B) A strategy or execution problem, not an effort problem", correct: true },
                { label: "C) They're not committed enough", correct: false },
                { label: "D) The targets are too aggressive", correct: false }
            ],
            correctFeedback: "✓ Correct! Effort without results signals systemic issues. Working harder on the wrong things doesn't help.",
            incorrectFeedback: "Not quite. Effort without results signals systemic issues. Working harder on the wrong things doesn't help."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Collective Win Celebration",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>How Black Belt teams celebrate wins reinforces results culture.</p>
</div>`,
        question: {
            text: "When celebrating a major win, the Black Belt leader emphasizes:",
            options: [
                { label: "A) The star performers who made it happen", correct: false },
                { label: "B) The collective effort and team achievement", correct: true },
                { label: "C) Their own leadership role", correct: false },
                { label: "D) How hard everyone worked", correct: false }
            ],
            correctFeedback: "✓ Correct! Black Belt teams celebrate collective wins. This reinforces that team results > individual glory.",
            incorrectFeedback: "Not quite. Black Belt teams celebrate collective wins. This reinforces that team results > individual glory."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "Results Attribution",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>How leaders attribute success impacts team culture and future performance.</p>
</div>`,
        question: {
            text: "According to Jim Collins' Level 5 Leadership, when things go well, Level 5 leaders:",
            options: [
                { label: "A) Take credit for the vision and strategy", correct: false },
                { label: "B) Credit the team; when things go poorly, they look in the mirror", correct: true },
                { label: "C) Share credit equally with everyone", correct: false },
                { label: "D) Credit external market conditions", correct: false }
            ],
            correctFeedback: "✓ Correct! Level 5 leaders look out the window (credit team) when winning, look in the mirror when losing.",
            incorrectFeedback: "Not quite. Level 5 leaders look out the window (credit team) when winning, look in the mirror when losing."
        }
    }
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
