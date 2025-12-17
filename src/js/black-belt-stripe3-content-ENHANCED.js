// ===== BLACK BELT STRIPE 3: COURSE CORRECTION =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Monitoring Progress",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How Black Belt teams track and measure progress continuously.</p></div>`,
        question: {
            text: "The most important metric to monitor is:",
            options: [
                { label: "A) Activity levels and effort", correct: false },
        { label: "B) Leading indicators that predict results", correct: true },
        { label: "C) Lagging results only", correct: false },
        { label: "D) Individual performance scores", correct: false }
            ],
            correctFeedback: "✓ Correct! Leading indicators let you course-correct before lagging results show problems.",
            incorrectFeedback: "Not quite. Leading indicators let you course-correct before lagging results show problems."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Rapid Adjustment",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Speed of adjustment separates good teams from great ones.</p></div>`,
        question: {
            text: "When metrics show you're off track, the Black Belt response is:",
            options: [
                { label: "A) Wait for end of quarter to assess", correct: false },
        { label: "B) Adjust immediately while maintaining core strategy", correct: true },
        { label: "C) Abandon the plan completely", correct: false },
        { label: "D) Push harder on current approach", correct: false }
            ],
            correctFeedback: "✓ Correct! Fast adjustment keeps you on track. Wait too long and small problems become crises.",
            incorrectFeedback: "Not quite. Fast adjustment keeps you on track. Wait too long and small problems become crises."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Learning from Failure",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How elite teams extract maximum learning from failures.</p></div>`,
        question: {
            text: "After a significant failure, the Black Belt team:",
            options: [
                { label: "A) Move on quickly to avoid dwelling", correct: false },
        { label: "B) Conduct blameless postmortem and extract learnings", correct: true },
        { label: "C) Identify who was responsible", correct: false },
        { label: "D) Lower expectations for next time", correct: false }
            ],
            correctFeedback: "✓ Correct! Blameless postmortems extract maximum learning. Focus on system, not scapegoats.",
            incorrectFeedback: "Not quite. Blameless postmortems extract maximum learning. Focus on system, not scapegoats."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Staying Agile",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Balancing commitment to strategy with flexibility in tactics.</p></div>`,
        question: {
            text: "Being agile means:",
            options: [
                { label: "A) Changing strategy frequently", correct: false },
        { label: "B) Firm on goals, flexible on methods", correct: true },
        { label: "C) Never committing to a plan", correct: false },
        { label: "D) Following whatever is trendy", correct: false }
            ],
            correctFeedback: "✓ Correct! Stay committed to the destination, but adjust the route as needed. Don't confuse means with ends.",
            incorrectFeedback: "Not quite. Stay committed to the destination, but adjust the route as needed. Don't confuse means with ends."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Feedback Loops",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Creating tight feedback loops for rapid learning.</p></div>`,
        question: {
            text: "The best feedback loops are:",
            options: [
                { label: "A) Annual performance reviews", correct: false },
        { label: "B) Short, frequent, and directly tied to actions", correct: true },
        { label: "C) Quarterly business reviews", correct: false },
        { label: "D) Monthly one-on-ones", correct: false }
            ],
            correctFeedback: "✓ Correct! Tight loops (daily/weekly) enable fast learning. Long loops mean slow learning and compounded errors.",
            incorrectFeedback: "Not quite. Tight loops (daily/weekly) enable fast learning. Long loops mean slow learning and compounded errors."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Pivoting vs Persevering",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Knowing when to stay the course vs when to change direction.</p></div>`,
        question: {
            text: "You should consider pivoting when:",
            options: [
                { label: "A) First sign of difficulty", correct: false },
        { label: "B) Data consistently shows approach isn't working", correct: true },
        { label: "C) Team gets tired of current approach", correct: false },
        { label: "D) A competitor does something different", correct: false }
            ],
            correctFeedback: "✓ Correct! Pivot on data, not feelings. But don't quit at first obstacle - that's not pivoting, it's quitting.",
            incorrectFeedback: "Not quite. Pivot on data, not feelings. But don't quit at first obstacle - that's not pivoting, it's quitting."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Retrospectives",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How regular retrospectives drive continuous improvement.</p></div>`,
        question: {
            text: "Effective retrospectives focus on:",
            options: [
                { label: "A) What went wrong and who to blame", correct: false },
        { label: "B) What to stop, start, and continue", correct: true },
        { label: "C) Celebrating only the wins", correct: false },
        { label: "D) Planning the next sprint", correct: false }
            ],
            correctFeedback: "✓ Correct! Good retros are forward-focused: Stop (what's not working), Start (new approaches), Continue (what works).",
            incorrectFeedback: "Not quite. Good retros are forward-focused: Stop (what's not working), Start (new approaches), Continue (what works)."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Data-Driven Decisions",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Using data to guide course corrections without analysis paralysis.</p></div>`,
        question: {
            text: "When data and intuition conflict, the Black Belt leader:",
            options: [
                { label: "A) Always trusts the data", correct: false },
        { label: "B) Investigates the gap, then decides", correct: true },
        { label: "C) Always follows intuition", correct: false },
        { label: "D) Takes a vote", correct: false }
            ],
            correctFeedback: "✓ Correct! When data and intuition diverge, something interesting is happening. Investigate before deciding.",
            incorrectFeedback: "Not quite. When data and intuition diverge, something interesting is happening. Investigate before deciding."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Managing Course Corrections",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How to adjust course without creating chaos or losing confidence.</p></div>`,
        question: {
            text: "When announcing a course correction to the team, emphasize:",
            options: [
                { label: "A) That the previous approach was wrong", correct: false },
        { label: "B) What we learned and why this adjustment makes sense", correct: true },
        { label: "C) That nothing fundamental has changed", correct: false },
        { label: "D) Blame external factors", correct: false }
            ],
            correctFeedback: "✓ Correct! Frame corrections as learning, not failure. Show the logic, maintain confidence while adjusting.",
            incorrectFeedback: "Not quite. Frame corrections as learning, not failure. Show the logic, maintain confidence while adjusting."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "Continuous Improvement",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Making course correction a continuous practice, not emergency response.</p></div>`,
        question: {
            text: "In elite teams, course correction happens:",
            options: [
                { label: "A) Only in crisis situations", correct: false },
        { label: "B) As a regular discipline through small adjustments", correct: true },
        { label: "C) When leadership demands it", correct: false },
        { label: "D) Quarterly during planning", correct: false }
            ],
            correctFeedback: "✓ Correct! Small, frequent adjustments prevent big crisis corrections. Continuous improvement is cultural, not event-driven.",
            incorrectFeedback: "Not quite. Small, frequent adjustments prevent big crisis corrections. Continuous improvement is cultural, not event-driven."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
