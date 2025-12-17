// ===== BROWN BELT STRIPE 1: ACCOUNTABILITY FOUNDATIONS =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Peer-to-Peer Accountability",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "You've been promoted to lead a struggling team. The previous manager was beloved but ineffective - the team is comfortable but underperforming. Your mentor Jocko would likely advise you to:",
            options: [
                { label: "A) Immediately set higher standards to shift the culture quickly", correct: false },
        { label: "B) Build relationships first, then gradually raise expectations", correct: false },
        { label: "C) Take extreme ownership of past failures before changing anything", correct: true },
        { label: "D) Replace underperformers to signal the new standard", correct: false }
            ],
            correctFeedback: "✓ Correct! Perfect understanding of 'Extreme Ownership.' Before you can lead them forward, you must take ownership of their current state - even though you didn't create it. This paradox builds trust: 'I own this mess, and I'm going to fix it WITH you.' Only after taking ownership can you credibly ask them to own their piece. This is Jocko's core teaching - leadership starts with owning everything in your world.",
            incorrectFeedback: "Not quite. Perfect understanding of 'Extreme Ownership.' Before you can lead them forward, you must take ownership of their current state - even though you didn't create it. This paradox builds trust: 'I own this mess, and I'm going to fix it WITH you.' Only after taking ownership can you credibly ask them to own their piece. This is Jocko's core teaching - leadership starts with owning everything in your world."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Standards and Expectations",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "Your team respects you for your technical expertise, but you notice they wait for your approval on decisions they should own. According to leadership research, this pattern indicates:",
            options: [
                { label: "A) Your team lacks confidence and needs more training", correct: false },
        { label: "B) You've accidentally created dependency instead of capability", correct: true },
        { label: "C) This is normal - leaders should quality-check important decisions", correct: false },
        { label: "D) Your team is being appropriately cautious and risk-averse", correct: false }
            ],
            correctFeedback: "✓ Correct! Excellent self-awareness! You've identified the 'savior complex' trap. When leaders are too good at solving problems, teams stop trying. Marshall Goldsmith calls this 'adding too much value' - your input, even when helpful, robs others of ownership. Brown Belt means recognizing when your strength becomes the team's weakness. The fix: bite your tongue, let them make the call, and coach AFTER the outcome (win or lose).",
            incorrectFeedback: "Not quite. Excellent self-awareness! You've identified the 'savior complex' trap. When leaders are too good at solving problems, teams stop trying. Marshall Goldsmith calls this 'adding too much value' - your input, even when helpful, robs others of ownership. Brown Belt means recognizing when your strength becomes the team's weakness. The fix: bite your tongue, let them make the call, and coach AFTER the outcome (win or lose)."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Ownership Culture",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "Simon Sinek's 'Start with Why' suggests that inspiring leaders communicate in this order:",
            options: [
                { label: "A) What we do → How we do it → Why we do it (outside-in)", correct: false },
        { label: "B) Why we do it → How we do it → What we do (inside-out)", correct: true },
        { label: "C) How we do it → What we do → Why we do it (process-first)", correct: false },
        { label: "D) What we do → Why we do it → How we do it (results-first)", correct: false }
            ],
            correctFeedback: "✓ Correct! Perfect! You understand the 'Golden Circle.' Inspiring leaders start with WHY (purpose/belief), then HOW (process/values), then WHAT (products/services). Most organizations communicate backwards: 'We make X (what), it has Y features (how), buy it.' Apple says: 'We challenge the status quo (why), by making beautifully designed products (how), we happen to make computers (what).' See the difference? Purpose before product. Belief before features. Brown Belt leaders inspire through WHY.",
            incorrectFeedback: "Not quite. Perfect! You understand the 'Golden Circle.' Inspiring leaders start with WHY (purpose/belief), then HOW (process/values), then WHAT (products/services). Most organizations communicate backwards: 'We make X (what), it has Y features (how), buy it.' Apple says: 'We challenge the status quo (why), by making beautifully designed products (how), we happen to make computers (what).' See the difference? Purpose before product. Belief before features. Brown Belt leaders inspire through WHY."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Direct Communication",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "You're implementing a major change. Kotter's research on change management says your FIRST step should be:",
            options: [
                { label: "A) Form a guiding coalition of key influencers", correct: false },
        { label: "B) Create a sense of urgency around the need for change", correct: true },
        { label: "C) Develop a clear vision for where you're heading", correct: false },
        { label: "D) Communicate the change vision repeatedly", correct: false }
            ],
            correctFeedback: "✓ Correct! Excellent! You know Kotter's 8-Step Process. Step 1 is 'Create Urgency' - people won't change unless they feel the current state is untenable. Without urgency, your guiding coalition will lack energy, your vision will seem optional, and resistance will win. Brown Belt leaders understand that logic doesn't drive change - emotion does. Your job is to make the status quo feel riskier than the change. Then momentum builds naturally.",
            incorrectFeedback: "Not quite. Excellent! You know Kotter's 8-Step Process. Step 1 is 'Create Urgency' - people won't change unless they feel the current state is untenable. Without urgency, your guiding coalition will lack energy, your vision will seem optional, and resistance will win. Brown Belt leaders understand that logic doesn't drive change - emotion does. Your job is to make the status quo feel riskier than the change. Then momentum builds naturally."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Direct Communication",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "Your star performer is brilliant individually but toxic to team culture. Brené Brown's research on belonging would suggest:",
            options: [
                { label: "A) Coach them privately but keep them - talent trumps culture", correct: false },
        { label: "B) Create clear boundaries: change behavior or exit the team", correct: true },
        { label: "C) Accept this trade-off - high performers are always difficult", correct: false },
        { label: "D) Move them to an individual contributor role", correct: false }
            ],
            correctFeedback: "✓ Correct! Perfect application of 'Dare to Lead' principles! Brown says: 'Choose courage over comfort... choose what is right over what is fun, fast, or easy.' Tolerating toxic brilliance signals that results matter more than people. This destroys psychological safety - your team learns that performance excuses bad behavior. The Brown Belt move: clear expectations, clear consequences. If they can't show up as a teammate, they can't stay on the team. Period. This is what daring leadership looks like.",
            incorrectFeedback: "Not quite. Perfect application of 'Dare to Lead' principles! Brown says: 'Choose courage over comfort... choose what is right over what is fun, fast, or easy.' Tolerating toxic brilliance signals that results matter more than people. This destroys psychological safety - your team learns that performance excuses bad behavior. The Brown Belt move: clear expectations, clear consequences. If they can't show up as a teammate, they can't stay on the team. Period. This is what daring leadership looks like."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Direct Communication",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "Servant leadership, as taught by Robert Greenleaf, means:",
            options: [
                { label: "A) Doing whatever your team asks you to do", correct: false },
        { label: "B) Putting your team's needs before your own in service of their growth", correct: true },
        { label: "C) Being humble and never making decisions yourself", correct: false },
        { label: "D) Leading from behind and letting the team take credit", correct: false }
            ],
            correctFeedback: "✓ Correct! Servant leadership is about serving first to lead better. Greenleaf's philosophy: 'The servant-leader is servant first... It begins with the natural feeling that one wants to serve, to serve first. Then conscious choice brings one to aspire to lead.' This isn't abdicating leadership - it's leading by enabling others' success. Your job is their growth, not your comfort. Brown Belt leaders serve their teams by creating conditions for their success.",
            incorrectFeedback: "Not quite. Servant leadership is about serving first to lead better. Greenleaf's philosophy: 'The servant-leader is servant first... It begins with the natural feeling that one wants to serve, to serve first. Then conscious choice brings one to aspire to lead.' This isn't abdicating leadership - it's leading by enabling others' success. Your job is their growth, not your comfort. Brown Belt leaders serve their teams by creating conditions for their success."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Direct Communication",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "Ronald Heifetz distinguishes between 'technical' and 'adaptive' challenges. An adaptive challenge requires:",
            options: [
                { label: "A) Expert knowledge to solve - you already have the answer", correct: false },
        { label: "B) Learning and experimentation - the answer isn't known yet", correct: true },
        { label: "C) More resources or better processes", correct: false },
        { label: "D) Clear authority to make decisions", correct: false }
            ],
            correctFeedback: "✓ Correct! Perfect understanding of adaptive leadership! Technical challenges have known solutions - apply expertise. Adaptive challenges require learning, experimentation, and often changing values or behaviors. Example: 'Sales are down' (technical: fix pricing). 'Our customers don't trust us anymore' (adaptive: rebuild relationships, shift culture). Brown Belt leaders recognize adaptive challenges can't be solved by authority alone - they require mobilizing people to do the work of change.",
            incorrectFeedback: "Not quite. Perfect understanding of adaptive leadership! Technical challenges have known solutions - apply expertise. Adaptive challenges require learning, experimentation, and often changing values or behaviors. Example: 'Sales are down' (technical: fix pricing). 'Our customers don't trust us anymore' (adaptive: rebuild relationships, shift culture). Brown Belt leaders recognize adaptive challenges can't be solved by authority alone - they require mobilizing people to do the work of change."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Direct Communication",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "Jim Collins' research on 'Level 5 Leadership' found that the best leaders combine:",
            options: [
                { label: "A) Humility and fierce resolve for results", correct: true },
        { label: "B) Vision and execution capability", correct: false },
        { label: "C) Charisma and strategic thinking", correct: false },
        { label: "D) Intelligence and decisiveness", correct: false }
            ],
            correctFeedback: "✓ Correct! Collins' research shocked the business world: the best companies had 'Level 5' leaders who were paradoxically humble AND willful. They channel ambition into the company, not themselves. They take responsibility for failures but give credit for successes. They're ambitious for the mission, not their ego. This is Brown Belt leadership - building something bigger than yourself through paradoxical combination of humility and resolve.",
            incorrectFeedback: "Not quite. Collins' research shocked the business world: the best companies had 'Level 5' leaders who were paradoxically humble AND willful. They channel ambition into the company, not themselves. They take responsibility for failures but give credit for successes. They're ambitious for the mission, not their ego. This is Brown Belt leadership - building something bigger than yourself through paradoxical combination of humility and resolve."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Direct Communication",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on accountability foundations principles and practices.</p>
</div>`,
        question: {
            text: "Leadership presence and authenticity means:",
            options: [
                { label: "A) Always being yourself, no matter what", correct: false },
        { label: "B) Being consistently yourself while adapting your style to context", correct: true },
        { label: "C) Never changing your approach regardless of situation", correct: false },
        { label: "D) Mimicking successful leaders until it becomes natural", correct: false }
            ],
            correctFeedback: "✓ Correct! Authenticity isn't rigid consistency - it's consistent values with adaptable expression. You're always YOU (authentic), but how you show up adapts to context (skillful). Example: You're always honest (authentic), but you express feedback differently to a junior vs. senior person (skillful). Brown Belt leaders know: be authentic to your values, skillful in your expression. Rigid 'authenticity' that ignores context isn't leadership - it's self-indulgence.",
            incorrectFeedback: "Not quite. Authenticity isn't rigid consistency - it's consistent values with adaptable expression. You're always YOU (authentic), but how you show up adapts to context (skillful). Example: You're always honest (authentic), but you express feedback differently to a junior vs. senior person (skillful). Brown Belt leaders know: be authentic to your values, skillful in your expression. Rigid 'authenticity' that ignores context isn't leadership - it's self-indulgence."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
