// STRIPE 3: Building Team Trust
const allChunks = [
    // LESSON 1: The 360° Trust Grid
{
lessonNumber: "Lesson 1 of 4",
lessonTitle: "The 360° Trust Grid",
content: `
<div class="content-section">
<h3>📖 Core Concept</h3>
<p>Most teams assume trust is binary—present or absent. In reality, trust is a network. The 360° Trust Grid makes this visible.</p>
<h4>🛠️ How to Create It:</h4>
<ol>
<li>Create matrix: all team members on both axes</li>
<li>Self-assessment: rate trust 1-5 with each person</li>
<li>Aggregate anonymously into heat map</li>
<li>Identify patterns: gaps, islands, asymmetries</li>
</ol>
</div>
`,
question: {
text: "What does the Trust Grid reveal?",
options: [
{ label: "A) Who works hardest", correct: false },
{ label: "B) Trust network patterns and gaps", correct: true },
{ label: "C) Performance metrics", correct: false }
],
correctFeedback: "✓ Yes! It shows who trusts whom and where gaps exist.",
incorrectFeedback: "Not quite. The Grid maps trust relationships across the team."
}
},
{
lessonNumber: "Lesson 1 of 4",
lessonTitle: "The 360° Trust Grid",
content: `
<div class="practice-box">
<h4>✨ Practice Exercise</h4>
<p>Create a simple trust map for your team. Who do you trust most? Least? Where are the gaps?</p>
</div>
`,
isLessonComplete: true,
lessonIndex: 1
},
    // LESSON 2: Team Vulnerability Stack
{
lessonNumber: "Lesson 2 of 4",
lessonTitle: "The Team Vulnerability Stack",
content: `
<div class="content-section">
<h3>📖 The Stack Method</h3>
<p>A structured team exercise where vulnerability builds progressively:</p>
<ol>
<li><strong>Round 1:</strong> Share something low-risk (hobby, background)</li>
<li><strong>Round 2:</strong> Share a professional challenge</li>
<li><strong>Round 3:</strong> Share a current struggle or fear</li>
</ol>
<p>Each round increases vulnerability. People opt-in to deeper rounds.</p>
</div>
`,
question: {
text: "Why start with low-risk sharing?",
options: [
{ label: "A) It's easier and builds momentum", correct: true },
{ label: "B) High-risk sharing doesn't work", correct: false },
{ label: "C) It saves time", correct: false }
],
correctFeedback: "✓ Correct! Progressive vulnerability builds trust safely.",
incorrectFeedback: "Not quite. Starting low-risk creates safety for deeper sharing."
}
},
{
lessonNumber: "Lesson 2 of 4",
lessonTitle: "The Team Vulnerability Stack",
content: `
<div class="practice-box">
<h4>✨ Practice Exercise</h4>
<p>Run a 3-round Vulnerability Stack with your team. Notice who opts into Round 3.</p>
</div>
`,
isLessonComplete: true,
lessonIndex: 2
},
    // LESSON 3: Psychological Safety Rituals
{
lessonNumber: "Lesson 3 of 4",
lessonTitle: "Creating Psychological Safety Rituals",
content: `
<div class="content-section">
<h3>📖 Rituals That Build Trust</h3>
<p>Trust isn't built in one-off exercises. It requires consistent rituals:</p>
<ul>
<li><strong>Weekly Wins & Struggles:</strong> 5 min check-in at start of meetings</li>
<li><strong>Mistake of the Week:</strong> Leader shares first, team follows</li>
<li><strong>Help Requests:</strong> Standing agenda item for asking support</li>
<li><strong>Feedback Fridays:</strong> Regular peer feedback exchanges</li>
</ul>
</div>
`,
question: {
text: "Why use rituals instead of one-time exercises?",
options: [
{ label: "A) Rituals are easier", correct: false },
{ label: "B) Trust requires consistent practice", correct: true },
{ label: "C) One-time exercises don't work", correct: false }
],
correctFeedback: "✓ Yes! Consistency builds lasting trust.",
incorrectFeedback: "Not quite. Regular rituals embed trust-building into culture."
}
},
{
lessonNumber: "Lesson 3 of 4",
lessonTitle: "Creating Psychological Safety Rituals",
content: `
<div class="practice-box">
<h4>✨ Practice Exercise</h4>
<p>Add one trust ritual to your team's weekly routine. Start with "Wins & Struggles" check-ins.</p>
</div>
`,
isLessonComplete: true,
lessonIndex: 3
},
    // LESSON 4: Handling Trust Breakdowns
{
lessonNumber: "Lesson 4 of 4",
lessonTitle: "Handling Trust Breakdowns",
content: `
<div class="content-section">
<h3>📖 When Trust Breaks</h3>
<p>Trust breakdowns are inevitable. What matters is repair speed.</p>
<h4>🔧 Repair Protocol:</h4>
<ol>
<li><strong>Acknowledge quickly:</strong> "Something broke between us"</li>
<li><strong>Take responsibility:</strong> Own your part first</li>
<li><strong>Ask for their experience:</strong> "How did that land for you?"</li>
<li><strong>Commit to change:</strong> Specific behavior adjustment</li>
<li><strong>Follow through:</strong> Demonstrate change consistently</li>
</ol>
</div>
`,
question: {
text: "What's most important in trust repair?",
options: [
{ label: "A) Explaining your intentions", correct: false },
{ label: "B) Speed of acknowledgment and repair", correct: true },
{ label: "C) Waiting for time to heal", correct: false }
],
correctFeedback: "✓ Correct! Fast repair prevents trust debt accumulation.",
incorrectFeedback: "Not quite. Speed matters—address breakdowns immediately."
}
},
{
lessonNumber: "Lesson 4 of 4",
lessonTitle: "Handling Trust Breakdowns",
content: `
<div class="practice-box">
<h4>✨ Practice Exercise</h4>
<p>Identify one broken trust relationship. Use the 5-step repair protocol this week.</p>
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
text: "What does the 360° Trust Grid map?",
options: [
{ label: "A) Performance levels", value: "a" },
{ label: "B) Trust relationships across the team", value: "b", correct: true },
{ label: "C) Work assignments", value: "c" },
{ label: "D) Skill levels", value: "d" }
]
},
{
text: "How does the Vulnerability Stack work?",
options: [
{ label: "A) Everyone shares everything at once", value: "a" },
{ label: "B) Progressive rounds from low to high risk", value: "b", correct: true },
{ label: "C) Only leaders share", value: "c" },
{ label: "D) Anonymous submissions", value: "d" }
]
},
{
text: "Why use trust-building rituals?",
options: [
{ label: "A) They're required by HR", value: "a" },
{ label: "B) Consistency embeds trust into culture", value: "b", correct: true },
{ label: "C) One-time exercises fail completely", value: "c" },
{ label: "D) They're easy to implement", value: "d" }
]
},
{
text: "What's the first step in trust repair?",
options: [
{ label: "A) Explain your intentions", value: "a" },
{ label: "B) Quickly acknowledge the breakdown", value: "b", correct: true },
{ label: "C) Wait for them to apologize", value: "c" },
{ label: "D) Move on and forget it", value: "d" }
]
},
{
text: "What matters most in trust repair?",
options: [
{ label: "A) Detailed explanations", value: "a" },
{ label: "B) Speed of acknowledgment and action", value: "b", correct: true },
{ label: "C) Time healing all wounds", value: "c" },
{ label: "D) Formal mediation", value: "d" }
]
}
]
}
];