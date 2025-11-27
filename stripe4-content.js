// STRIPE 4: Trust Mastery

const allChunks = [
    // LESSON 1: Coaching Others
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Coaching Others in Trust-Building",
        content: `
            <div class="content-section">
                <h3>📖 Teaching Trust</h3>
                <p>Once you've built trust, you can teach others. Key coaching principles:</p>
                <ul>
                    <li><strong>Model first:</strong> Show vulnerability before teaching it</li>
                    <li><strong>Name the dynamic:</strong> "Notice how we all agreed quickly—is that real?"</li>
                    <li><strong>Create safety:</strong> Reward vulnerability publicly</li>
                    <li><strong>Normalize mistakes:</strong> Share your own regularly</li>
                </ul>
            </div>
        `,
        question: {
            text: "What must you do before coaching others on trust?",
            options: [
                { label: "A) Read books about it", correct: false },
                { label: "B) Model vulnerability yourself first", correct: true },
                { label: "C) Get certified", correct: false }
            ],
            correctFeedback: "✓ Yes! You must demonstrate before teaching.",
            incorrectFeedback: "Not quite. Model the behavior before coaching it."
        }
    },
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Coaching Others in Trust-Building",
        content: `
            <div class="practice-box">
                <h4>✨ Practice Exercise</h4>
                <p>Coach one person on vulnerability this week. Share your own journey first.</p>
            </div>
        `,
        isLessonComplete: true,
        lessonIndex: 1
    },

    // LESSON 2: Integrating into Culture
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Integrating Trust into Team Culture",
        content: `
            <div class="content-section">
                <h3>📖 From Practice to Culture</h3>
                <p>Trust exercises are powerful, but culture change requires embedding trust into daily operations:</p>
                <ul>
                    <li><strong>Meeting norms:</strong> "We ask for help here"</li>
                    <li><strong>Performance reviews:</strong> Include vulnerability as a competency</li>
                    <li><strong>Hiring:</strong> Screen for trust-building capacity</li>
                    <li><strong>Onboarding:</strong> New members do Personal History on day 1</li>
                </ul>
            </div>
        `,
        question: {
            text: "How do you embed trust into culture?",
            options: [
                { label: "A) One-time team building event", correct: false },
                { label: "B) Integrate into daily operations and systems", correct: true },
                { label: "C) Hope it happens naturally", correct: false }
            ],
            correctFeedback: "✓ Correct! Culture requires systemic integration.",
            incorrectFeedback: "Not quite. Trust must be embedded in daily systems."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Integrating Trust into Team Culture",
        content: `
            <div class="practice-box">
                <h4>✨ Practice Exercise</h4>
                <p>Add one trust element to your team's systems (meetings, reviews, or onboarding).</p>
            </div>
        `,
        isLessonComplete: true,
        lessonIndex: 2
    },

    // LESSON 3: Trust Under Pressure
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Trust Under Pressure",
        content: `
            <div class="content-section">
                <h3>📖 When Stakes Are High</h3>
                <p>Trust is easy when things are calm. The real test comes under pressure:</p>
                <ul>
                    <li><strong>Crisis moments:</strong> Do people hide or share bad news?</li>
                    <li><strong>High-stakes decisions:</strong> Do dissenting voices speak up?</li>
                    <li><strong>Resource scarcity:</strong> Do people hoard or collaborate?</li>
                    <li><strong>Failure:</strong> Do teams blame or learn together?</li>
                </ul>
                <p>Pressure reveals whether trust is real or performative.</p>
            </div>
        `,
        question: {
            text: "What does pressure reveal about trust?",
            options: [
                { label: "A) Nothing, pressure is different", correct: false },
                { label: "B) Whether trust is real or performative", correct: true },
                { label: "C) Who is strongest", correct: false }
            ],
            correctFeedback: "✓ Yes! High stakes expose true trust levels.",
            incorrectFeedback: "Not quite. Pressure tests whether trust is genuine."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Trust Under Pressure",
        content: `
            <div class="practice-box">
                <h4>✨ Practice Exercise</h4>
                <p>Recall a recent high-pressure moment. Did trust hold or break? What would strengthen it?</p>
            </div>
        `,
        isLessonComplete: true,
        lessonIndex: 3
    },

    // LESSON 4: White Belt Assessment Prep
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Preparing for Your White Belt Assessment",
        content: `
            <div class="content-section">
                <h3>🎯 Assessment Overview</h3>
                <p>After completing this stripe, you'll take the White Belt Assessment covering:</p>
                <ul>
                    <li>Two types of trust (predictability vs vulnerability)</li>
                    <li>Psychological safety research</li>
                    <li>Trust-building exercises</li>
                    <li>Lencioni's Five Dysfunctions model</li>
                    <li>Trust repair protocols</li>
                </ul>
                <p><strong>Pass requirement:</strong> 70% (14/20 questions)</p>
            </div>
        `,
        question: {
            text: "What's required to pass the White Belt Assessment?",
            options: [
                { label: "A) 50% (10/20)", correct: false },
                { label: "B) 70% (14/20)", correct: true },
                { label: "C) 100% (20/20)", correct: false }
            ],
            correctFeedback: "✓ Correct! 70% demonstrates mastery.",
            incorrectFeedback: "Not quite. You need 70% (14/20 correct) to pass."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Preparing for Your White Belt Assessment",
        content: `
            <div class="practice-box">
                <h4>✨ Review & Prepare</h4>
                <p>Review your notes from all 4 stripes. What were your key insights? What will you apply first?</p>
            </div>
        `,
        isLessonComplete: true,
        lessonIndex: 4
    },

    // FINAL QUIZ
    {
        isFinalQuiz: true,
        questions: [
            {
                text: "What does the 360° Trust Grid help identify?",
                options: [
                    { label: "A) Performance issues", value: "a" },
                    { label: "B) Trust gaps and asymmetries in relationships", value: "b", correct: true },
                    { label: "C) Skill levels", value: "c" },
                    { label: "D) Salary fairness", value: "d" }
                ]
            },
            {
                text: "How should trust-building progress in the Vulnerability Stack?",
                options: [
                    { label: "A) Start with deepest sharing", value: "a" },
                    { label: "B) Progressive rounds from low to high risk", value: "b", correct: true },
                    { label: "C) Random order", value: "c" },
                    { label: "D) Only professional topics", value: "d" }
                ]
            },
            {
                text: "Why use consistent trust rituals?",
                options: [
                    { label: "A) They're mandatory", value: "a" },
                    { label: "B) Consistency embeds trust into culture", value: "b", correct: true },
                    { label: "C) One-time events don't work at all", value: "c" },
                    { label: "D) They fill meeting time", value: "d" }
                ]
            },
            {
                text: "What's the first step in trust repair?",
                options: [
                    { label: "A) Wait for apology", value: "a" },
                    { label: "B) Quickly acknowledge the breakdown", value: "b", correct: true },
                    { label: "C) Explain your side", value: "c" },
                    { label: "D) Involve HR", value: "d" }
                ]
            },
            {
                text: "What does pressure reveal about team trust?",
                options: [
                    { label: "A) Nothing useful", value: "a" },
                    { label: "B) Whether trust is real or performative", value: "b", correct: true },
                    { label: "C) Who is the leader", value: "c" },
                    { label: "D) Technical skills", value: "d" }
                ]
            }
        ]
    }
];
