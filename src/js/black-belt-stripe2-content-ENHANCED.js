// ===== BLACK BELT STRIPE 2: COLLECTIVE GOALS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Setting Team Goals",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How to set compelling team goals that unite and motivate.</p></div>`,
        question: {
            text: "The most effective team goals are:",
            options: [
                { label: "A) Ambitious but achievable, clearly measurable", correct: true },
        { label: "B) Easy to guarantee success", correct: false },
        { label: "C) Set by leadership without team input", correct: false },
        { label: "D) Focused on individual metrics", correct: false }
            ],
            correctFeedback: "✓ Correct! Effective goals stretch the team while remaining achievable, with clear metrics everyone understands.",
            incorrectFeedback: "Not quite. Effective goals stretch the team while remaining achievable, with clear metrics everyone understands."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Aligning Individual and Team Goals",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How to ensure individual goals serve team outcomes.</p></div>`,
        question: {
            text: "A team member's individual goals conflict with team priorities. The Black Belt leader:",
            options: [
                { label: "A) Let them pursue personal goals - motivation matters", correct: false },
        { label: "B) Realign individual goals to serve team outcomes", correct: true },
        { label: "C) Fire them for lack of alignment", correct: false },
        { label: "D) Ignore it and focus on team goals only", correct: false }
            ],
            correctFeedback: "✓ Correct! Individual goals must serve collective outcomes. Black Belts ensure alignment without crushing individual growth.",
            incorrectFeedback: "Not quite. Individual goals must serve collective outcomes. Black Belts ensure alignment without crushing individual growth."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Shared Success Metrics",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Creating metrics that drive collective behavior.</p></div>`,
        question: {
            text: "What makes a metric 'shared' versus individual?",
            options: [
                { label: "A) Everyone has the same number", correct: false },
        { label: "B) Success requires collective effort, failure impacts everyone", correct: true },
        { label: "C) Leadership decides who gets credit", correct: false },
        { label: "D) It's measured at the company level", correct: false }
            ],
            correctFeedback: "✓ Correct! Shared metrics require team effort and create shared accountability for outcomes.",
            incorrectFeedback: "Not quite. Shared metrics require team effort and create shared accountability for outcomes."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "OKR Discipline",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Using Objectives and Key Results to drive team performance.</p></div>`,
        question: {
            text: "In the OKR framework, what percentage of Key Results should typically be achieved?",
            options: [
                { label: "A) 100% - anything less is failure", correct: false },
        { label: "B) 70-80% if properly ambitious", correct: true },
        { label: "C) 50% - goals should be stretch", correct: false },
        { label: "D) 90%+ to maintain morale", correct: false }
            ],
            correctFeedback: "✓ Correct! OKRs should be ambitious - 70-80% achievement indicates proper stretch goals. 100% means goals are too easy.",
            incorrectFeedback: "Not quite. OKRs should be ambitious - 70-80% achievement indicates proper stretch goals. 100% means goals are too easy."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Goal Transparency",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Why transparent goals drive better results.</p></div>`,
        question: {
            text: "Making team goals visible to everyone:",
            options: [
                { label: "A) Creates unhealthy pressure", correct: false },
        { label: "B) Drives accountability and alignment", correct: true },
        { label: "C) Should only be done for top performers", correct: false },
        { label: "D) Invites too many opinions", correct: false }
            ],
            correctFeedback: "✓ Correct! Transparency creates accountability, enables support, and ensures everyone pulls in the same direction.",
            incorrectFeedback: "Not quite. Transparency creates accountability, enables support, and ensures everyone pulls in the same direction."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Celebrating Team Wins",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How celebration reinforces results culture.</p></div>`,
        question: {
            text: "When the team hits a major goal, the Black Belt leader:",
            options: [
                { label: "A) Immediately sets the next goal", correct: false },
        { label: "B) Celebrates the win, then resets focus", correct: true },
        { label: "C) Rewards top individual contributors", correct: false },
        { label: "D) Takes credit for the strategy", correct: false }
            ],
            correctFeedback: "✓ Correct! Celebrate wins to reinforce achievement, then reset. Skip celebration and teams burn out or disengage.",
            incorrectFeedback: "Not quite. Celebrate wins to reinforce achievement, then reset. Skip celebration and teams burn out or disengage."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Managing Goal Conflicts",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>What to do when team goals compete with each other.</p></div>`,
        question: {
            text: "Two important team goals are in direct conflict (e.g., speed vs quality). The solution is:",
            options: [
                { label: "A) Pick one and deprioritize the other", correct: false },
        { label: "B) Clearly prioritize and sequence the goals", correct: true },
        { label: "C) Try to achieve both simultaneously", correct: false },
        { label: "D) Let the team decide through voting", correct: false }
            ],
            correctFeedback: "✓ Correct! Conflicting goals create confusion. Leaders must clarify priorities and sequence, not create false dichotomies.",
            incorrectFeedback: "Not quite. Conflicting goals create confusion. Leaders must clarify priorities and sequence, not create false dichotomies."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Goal Ownership",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Creating genuine ownership of team goals.</p></div>`,
        question: {
            text: "Team members truly own goals when:",
            options: [
                { label: "A) They're told the goals are important", correct: false },
        { label: "B) They participate in setting them and understand why they matter", correct: true },
        { label: "C) Their bonuses depend on them", correct: false },
        { label: "D) Leadership monitors progress daily", correct: false }
            ],
            correctFeedback: "✓ Correct! Ownership comes from involvement and understanding 'why', not mandates or incentives alone.",
            incorrectFeedback: "Not quite. Ownership comes from involvement and understanding 'why', not mandates or incentives alone."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Goal Cadence",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>The rhythm of goal setting, tracking, and reset.</p></div>`,
        question: {
            text: "High-performing teams typically review goal progress:",
            options: [
                { label: "A) Quarterly only", correct: false },
        { label: "B) Weekly with monthly deeper reviews", correct: true },
        { label: "C) Daily in standup meetings", correct: false },
        { label: "D) Only when problems arise", correct: false }
            ],
            correctFeedback: "✓ Correct! Regular weekly check-ins keep momentum, monthly reviews allow for adjustment without micromanaging.",
            incorrectFeedback: "Not quite. Regular weekly check-ins keep momentum, monthly reviews allow for adjustment without micromanaging."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "From Goals to Results",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>The execution gap between goals and results.</p></div>`,
        question: {
            text: "The main reason teams fail to achieve goals is:",
            options: [
                { label: "A) Goals are too ambitious", correct: false },
        { label: "B) Lack of discipline in execution and follow-through", correct: true },
        { label: "C) External factors and bad luck", correct: false },
        { label: "D) Insufficient talent", correct: false }
            ],
            correctFeedback: "✓ Correct! Most teams fail on execution, not goal-setting. Discipline and consistent focus bridge the gap.",
            incorrectFeedback: "Not quite. Most teams fail on execution, not goal-setting. Discipline and consistent focus bridge the gap."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
