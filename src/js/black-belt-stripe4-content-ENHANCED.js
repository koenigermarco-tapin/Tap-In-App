// ===== BLACK BELT STRIPE 4: SUSTAINABLE EXCELLENCE =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Long-Term Performance",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Building systems for sustained high performance, not just short sprints.</p></div>`,
        question: {
            text: "Sustainable excellence requires:",
            options: [
                { label: "A) Constant maximum effort", correct: false },
        { label: "B) Rhythms of intensity and recovery", correct: true },
        { label: "C) Lowering standards to manageable levels", correct: false },
        { label: "D) Working longer hours", correct: false }
            ],
            correctFeedback: "✓ Correct! Like elite athletes, elite teams need intensity AND recovery. Constant max effort leads to burnout.",
            incorrectFeedback: "Not quite. Like elite athletes, elite teams need intensity AND recovery. Constant max effort leads to burnout."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Building Resilience",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How resilient teams bounce back stronger from setbacks.</p></div>`,
        question: {
            text: "Team resilience is built through:",
            options: [
                { label: "A) Avoiding all failures", correct: false },
        { label: "B) Successfully navigating and learning from adversity", correct: true },
        { label: "C) Having backup plans for everything", correct: false },
        { label: "D) Maintaining positive attitude only", correct: false }
            ],
            correctFeedback: "✓ Correct! Resilience isn't avoiding problems - it's successfully navigating them and emerging stronger.",
            incorrectFeedback: "Not quite. Resilience isn't avoiding problems - it's successfully navigating them and emerging stronger."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Continuous Improvement Culture",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Making improvement a daily habit, not an annual initiative.</p></div>`,
        question: {
            text: "In a continuous improvement culture:",
            options: [
                { label: "A) Major changes happen quarterly", correct: false },
        { label: "B) Small improvements happen daily", correct: true },
        { label: "C) Only leadership drives improvements", correct: false },
        { label: "D) Change is resisted to maintain stability", correct: false }
            ],
            correctFeedback: "✓ Correct! Kaizen - daily small improvements compound. Waiting for big changes means falling behind competitors.",
            incorrectFeedback: "Not quite. Kaizen - daily small improvements compound. Waiting for big changes means falling behind competitors."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Legacy Building",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Creating systems and cultures that outlast individual leaders.</p></div>`,
        question: {
            text: "A Black Belt leader's greatest legacy is:",
            options: [
                { label: "A) The results achieved during their tenure", correct: false },
        { label: "B) Developing leaders who build on what they started", correct: true },
        { label: "C) Their personal achievements", correct: false },
        { label: "D) The size of team they managed", correct: false }
            ],
            correctFeedback: "✓ Correct! True legacy is measured by what continues after you leave. Great leaders build systems and people, not dependencies.",
            incorrectFeedback: "Not quite. True legacy is measured by what continues after you leave. Great leaders build systems and people, not dependencies."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Excellence as Standard",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Making excellence the baseline, not the exception.</p></div>`,
        question: {
            text: "When excellence becomes the standard:",
            options: [
                { label: "A) People burn out from constant pressure", correct: false },
        { label: "B) It feels normal and anything less feels wrong", correct: true },
        { label: "C) Team members become arrogant", correct: false },
        { label: "D) Innovation stops", correct: false }
            ],
            correctFeedback: "✓ Correct! In elite cultures, excellence isn't special - it's expected. Mediocrity becomes uncomfortable.",
            incorrectFeedback: "Not quite. In elite cultures, excellence isn't special - it's expected. Mediocrity becomes uncomfortable."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Preventing Complacency",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>How to maintain hunger after achieving success.</p></div>`,
        question: {
            text: "The biggest threat to sustained excellence is:",
            options: [
                { label: "A) Competition", correct: false },
        { label: "B) Complacency after success", correct: true },
        { label: "C) Market changes", correct: false },
        { label: "D) Team turnover", correct: false }
            ],
            correctFeedback: "✓ Correct! Success breeds complacency. 'What got us here won't get us there' - Jim Collins. Stay paranoid, stay hungry.",
            incorrectFeedback: "Not quite. Success breeds complacency. 'What got us here won't get us there' - Jim Collins. Stay paranoid, stay hungry."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Scaling Excellence",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Maintaining standards while growing the team.</p></div>`,
        question: {
            text: "When scaling a high-performing team:",
            options: [
                { label: "A) Hire fast to meet demand", correct: false },
        { label: "B) Protect culture through rigorous hiring and onboarding", correct: true },
        { label: "C) Relax standards to grow faster", correct: false },
        { label: "D) Only hire from within", correct: false }
            ],
            correctFeedback: "✓ Correct! One bad hire can poison culture. Slow hiring to protect standards beats fast hiring that dilutes excellence.",
            incorrectFeedback: "Not quite. One bad hire can poison culture. Slow hiring to protect standards beats fast hiring that dilutes excellence."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Work-Life Integration",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Sustaining performance requires sustainable practices.</p></div>`,
        question: {
            text: "Elite teams maintain performance by:",
            options: [
                { label: "A) Expecting 60+ hour weeks consistently", correct: false },
        { label: "B) Protecting boundaries and modeling recovery", correct: true },
        { label: "C) Only hiring people with no outside commitments", correct: false },
        { label: "D) Offering unlimited vacation nobody takes", correct: false }
            ],
            correctFeedback: "✓ Correct! Sprint, don't marathon. Intensity requires recovery. Leaders must model this, not just preach it.",
            incorrectFeedback: "Not quite. Sprint, don't marathon. Intensity requires recovery. Leaders must model this, not just preach it."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Developing Next Generation",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>Sustainability requires building a leadership pipeline.</p></div>`,
        question: {
            text: "Black Belt leaders spend significant time:",
            options: [
                { label: "A) Doing the work themselves", correct: false },
        { label: "B) Developing their replacement and future leaders", correct: true },
        { label: "C) Managing up to executives", correct: false },
        { label: "D) Protecting their position", correct: false }
            ],
            correctFeedback: "✓ Correct! Your job is to work yourself out of a job by building leaders. Insecure leaders hoard knowledge and create dependencies.",
            incorrectFeedback: "Not quite. Your job is to work yourself out of a job by building leaders. Insecure leaders hoard knowledge and create dependencies."
        }
    },
    {
        lessonNumber: "Lesson 10 of 4",
        lessonTitle: "Elite Team Culture",
        content: `<div class="content-section"><h3>🎯 What You'll Learn</h3><p>The characteristics of truly elite team cultures.</p></div>`,
        question: {
            text: "Elite teams are characterized by:",
            options: [
                { label: "A) Never having conflicts or problems", correct: false },
        { label: "B) High standards, high support, high accountability", correct: true },
        { label: "C) Being the smartest people in the room", correct: false },
        { label: "D) Working the longest hours", correct: false }
            ],
            correctFeedback: "✓ Correct! Elite cultures = demanding + supportive. High standards without support = burnout. High support without standards = mediocrity.",
            incorrectFeedback: "Not quite. Elite cultures = demanding + supportive. High standards without support = burnout. High support without standards = mediocrity."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
