// ===== PURPLE BELT STRIPE 3: BUY-IN & ALIGNMENT =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Building Consensus",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "A team member comes to you with a problem. The Purple Belt coaching approach is to:",
            options: [
                { label: "A) Share your own similar experience and how you solved it", correct: false },
        { label: "B) Ask powerful questions that help them discover their own solution", correct: true },
        { label: "C) Provide clear direction on what they should do", correct: false },
        { label: "D) Delegate the problem to someone more experienced", correct: false }
            ],
            correctFeedback: "✓ Correct! Coaching creates capability; directing creates dependency. Powerful questions (What have you tried? What's the real challenge here? What would need to be true for this to work?) help people think through problems themselves. This builds problem-solving muscle. As Brene Brown says, 'Clear is kind' - but clarity comes from their own discovery, not your answers.",
            incorrectFeedback: "Not quite. Coaching creates capability; directing creates dependency. Powerful questions (What have you tried? What's the real challenge here? What would need to be true for this to work?) help people think through problems themselves. This builds problem-solving muscle. As Brene Brown says, 'Clear is kind' - but clarity comes from their own discovery, not your answers."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Disagree and Commit",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "You notice a team member is struggling with a task. Your first coaching move should be:",
            options: [
                { label: "A) Show them the correct way to do it", correct: false },
        { label: "B) Assess their readiness: Are they willing but unable, or able but unwilling?", correct: true },
        { label: "C) Give them easier tasks until they improve", correct: false },
        { label: "D) Pair them with a stronger performer", correct: false }
            ],
            correctFeedback: "✓ Correct! Situational leadership recognizes different readiness levels require different approaches. Willing but unable = teach/direct. Able but unwilling = coach/support. Both low = direct closely. Both high = delegate. The same person needs different support for different tasks. This is Ken Blanchard's Situational Leadership - matching your approach to their development level.",
            incorrectFeedback: "Not quite. Situational leadership recognizes different readiness levels require different approaches. Willing but unable = teach/direct. Able but unwilling = coach/support. Both low = direct closely. Both high = delegate. The same person needs different support for different tasks. This is Ken Blanchard's Situational Leadership - matching your approach to their development level."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Cascading Commitments",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "A high performer seems stuck in their current role. The coaching approach is to:",
            options: [
                { label: "A) Give them more of the same work to master it further", correct: false },
        { label: "B) Create stretch assignments that build new capabilities", correct: true },
        { label: "C) Promote them to management", correct: false },
        { label: "D) Wait for them to ask for development opportunities", correct: false }
            ],
            correctFeedback: "✓ Correct! Growth happens at the edge of competence. High performers need challenges that stretch them - projects requiring new skills, cross-functional leadership, ambiguous problems. This is the 'zone of proximal development' (Vygotsky) - the space between current ability and potential with support. Coaching provides that support while creating the stretch.",
            incorrectFeedback: "Not quite. Growth happens at the edge of competence. High performers need challenges that stretch them - projects requiring new skills, cross-functional leadership, ambiguous problems. This is the 'zone of proximal development' (Vygotsky) - the space between current ability and potential with support. Coaching provides that support while creating the stretch."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Maintaining Alignment",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "During a coaching conversation, the person says 'I don't know what to do.' Your response should be:",
            options: [
                { label: "A) Tell them what you would do in their situation", correct: false },
        { label: "B) Help them explore what they DO know and build from there", correct: true },
        { label: "C) Break the problem into smaller steps for them", correct: false },
        { label: "D) Assign them to shadow someone who handles this well", correct: false }
            ],
            correctFeedback: "✓ Correct! Coaching assumes people have more knowledge than they realize. 'I don't know' often means 'I haven't connected the dots yet.' Questions like 'What do you know for sure?' 'What's worked before in similar situations?' 'What's one small step you're confident about?' help them access their own wisdom. Your role is to help them think, not think for them.",
            incorrectFeedback: "Not quite. Coaching assumes people have more knowledge than they realize. 'I don't know' often means 'I haven't connected the dots yet.' Questions like 'What do you know for sure?' 'What's worked before in similar situations?' 'What's one small step you're confident about?' help them access their own wisdom. Your role is to help them think, not think for them."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Maintaining Alignment",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "You're coaching someone through a difficult conversation they need to have. The most helpful approach is to:",
            options: [
                { label: "A) Role-play the conversation with them as practice", correct: false },
        { label: "B) Script exactly what they should say", correct: false },
        { label: "C) Help them clarify their intent and desired outcome, then trust their judgment on delivery", correct: true },
        { label: "D) Offer to have the conversation for them", correct: false }
            ],
            correctFeedback: "✓ Correct! Coaching builds capability, not dependency. Help them clarify: What do you want this person to understand? What's your desired outcome? What's your intent? Then let them find their own words. Scripting creates inauthenticity; role-playing can help, but the goal is building their ability to navigate difficult conversations, not perfecting a script.",
            incorrectFeedback: "Not quite. Coaching builds capability, not dependency. Help them clarify: What do you want this person to understand? What's your desired outcome? What's your intent? Then let them find their own words. Scripting creates inauthenticity; role-playing can help, but the goal is building their ability to navigate difficult conversations, not perfecting a script."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Maintaining Alignment",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "A team member makes the same mistake repeatedly. The coaching response is to:",
            options: [
                { label: "A) Increase oversight and checking of their work", correct: false },
        { label: "B) Explore what's preventing them from learning from the mistake", correct: true },
        { label: "C) Give them clearer instructions", correct: false },
        { label: "D) Move them to a different role where they won't make this mistake", correct: false }
            ],
            correctFeedback: "✓ Correct! Patterns reveal learning blocks. Are they not seeing the mistake? (Awareness issue) Not understanding why it's a problem? (Understanding issue) Unable to change the behavior? (Capability issue) Unwilling to change? (Motivation issue) Each requires different coaching. The goal is building their ability to recognize, understand, and prevent mistakes - not preventing mistakes for them.",
            incorrectFeedback: "Not quite. Patterns reveal learning blocks. Are they not seeing the mistake? (Awareness issue) Not understanding why it's a problem? (Understanding issue) Unable to change the behavior? (Capability issue) Unwilling to change? (Motivation issue) Each requires different coaching. The goal is building their ability to recognize, understand, and prevent mistakes - not preventing mistakes for them."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Maintaining Alignment",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "You want to develop someone's strategic thinking. The best coaching approach is to:",
            options: [
                { label: "A) Assign them to read books on strategy", correct: false },
        { label: "B) Give them strategic projects and coach through the thinking process", correct: true },
        { label: "C) Have them observe strategic planning meetings", correct: false },
        { label: "D) Explain your strategic thinking process to them", correct: false }
            ],
            correctFeedback: "✓ Correct! Learning happens through doing, not observing. Strategic thinking develops through practice with real problems, guided by coaching questions: 'What's the real challenge here?' 'What assumptions are you making?' 'What would need to be true for this to work?' 'What are you optimizing for?' Experience + reflection = learning. Your coaching accelerates that learning.",
            incorrectFeedback: "Not quite. Learning happens through doing, not observing. Strategic thinking develops through practice with real problems, guided by coaching questions: 'What's the real challenge here?' 'What assumptions are you making?' 'What would need to be true for this to work?' 'What are you optimizing for?' Experience + reflection = learning. Your coaching accelerates that learning."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Maintaining Alignment",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "During coaching, the person keeps asking 'What should I do?' Your best response is:",
            options: [
                { label: "A) Give them your recommendation", correct: false },
        { label: "B) Help them think through options: 'What are your choices here? What are the pros and cons of each?'", correct: true },
        { label: "C) Refer them to someone else who can answer", correct: false },
        { label: "D) Tell them to figure it out themselves", correct: false }
            ],
            correctFeedback: "✓ Correct! Coaching builds decision-making capability. When people ask 'What should I do?' they're often seeking permission or avoiding responsibility. Coaching questions help them think: 'What are your options?' 'What criteria matter most?' 'What's the worst that could happen with each?' 'What feels right to you?' This builds their judgment, not your control.",
            incorrectFeedback: "Not quite. Coaching builds decision-making capability. When people ask 'What should I do?' they're often seeking permission or avoiding responsibility. Coaching questions help them think: 'What are your options?' 'What criteria matter most?' 'What's the worst that could happen with each?' 'What feels right to you?' This builds their judgment, not your control."
        }
    },
    {
        lessonNumber: "Lesson 9 of 4",
        lessonTitle: "Maintaining Alignment",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on buy-in & alignment principles and practices.</p>
</div>`,
        question: {
            text: "The difference between coaching and mentoring is:",
            options: [
                { label: "A) Coaching is for performance, mentoring is for career development", correct: false },
        { label: "B) Coaching helps people discover their own answers; mentoring shares your experience and knowledge", correct: true },
        { label: "C) Coaching is formal, mentoring is informal", correct: false },
        { label: "D) They're the same thing with different names", correct: false }
            ],
            correctFeedback: "✓ Correct! Both are valuable but different. Coaching uses questions to unlock someone's own wisdom and capability. Mentoring shares your experience, knowledge, and networks to accelerate their learning. Great leaders do both: coach to build capability, mentor to share wisdom. The key is knowing when each is appropriate - coaching for discovery and growth, mentoring for knowledge transfer and perspective.",
            incorrectFeedback: "Not quite. Both are valuable but different. Coaching uses questions to unlock someone's own wisdom and capability. Mentoring shares your experience, knowledge, and networks to accelerate their learning. Great leaders do both: coach to build capability, mentor to share wisdom. The key is knowing when each is appropriate - coaching for discovery and growth, mentoring for knowledge transfer and perspective."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
