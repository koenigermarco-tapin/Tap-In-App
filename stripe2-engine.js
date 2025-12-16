// ===== WHITE BELT STRIPE 1: INTERACTIVE ENGINE =====
// State Management
let currentChunk = 0;
let currentLesson = 0;
let lessonsCompleted = 0;
let totalChunks = allChunks.length;
let quizAnswers = {};
// Initialize
window.addEventListener('DOMContentLoaded', () => {
loadProgress();
renderChunk();
});
// Load saved progress
function loadProgress() {
const saved = localStorage.getItem('stripe2Progress');
if (saved) {
const data = JSON.parse(saved);
currentChunk = data.currentChunk || 0;
currentLesson = data.currentLesson || 0;
lessonsCompleted = data.lessonsCompleted || 0;
quizAnswers = data.quizAnswers || {};
}
}
// Save progress
function saveProgress() {
const data = {
currentChunk,
currentLesson,
lessonsCompleted,
quizAnswers,
timestamp: new Date().toISOString()
};
localStorage.setItem('stripe2Progress', JSON.stringify(data));
}
// Render current chunk
function renderChunk() {
const chunk = allChunks[currentChunk];
const card = document.getElementById('contentCard');
    // Check if final quiz
if (chunk.isFinalQuiz) {
renderFinalQuiz();
return;
}
let html = `
<div class="lesson-number">${chunk.lessonNumber}</div>
<div class="lesson-title">${chunk.lessonTitle}</div>
${chunk.content}
`;
    // Add question if not lesson complete
if (!chunk.isLessonComplete) {
html += `
<div class="question-box">
<h4>✓ Quick Check</h4>
<p class="question-text">${chunk.question.text}</p>
<div class="options" id="options">
${chunk.question.options.map((opt, idx) => `
<div class="option" onclick="selectAnswer(${idx}, ${opt.correct})" data-index="${idx}">
${opt.label}
</div>
`).join('')}
</div>
<div class="feedback" id="feedback"></div>
</div>
`;
} else {
        // Lesson complete slide
html += `
<div class="nav-buttons">
<button class="btn btn-primary" onclick="completeLesson(${chunk.lessonIndex})">
Mark Lesson ${chunk.lessonIndex} Complete <span class="xp-badge">+25 XP</span>
</button>
</div>
`;
}
card.innerHTML = html;
updateProgress();
window.scrollTo(0, 0);
}
// Handle answer selection
function selectAnswer(index, isCorrect) {
const chunk = allChunks[currentChunk];
const options = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');
    // Disable all options
options.forEach(opt => {
opt.classList.remove('selected', 'correct', 'incorrect');
opt.style.pointerEvents = 'none';
});
    // Mark selected
options[index].classList.add('selected');
if (isCorrect) {
options[index].classList.add('correct');
feedback.className = 'feedback correct show';
feedback.textContent = chunk.question.correctFeedback;
        // Auto-advance after 1.5 seconds
setTimeout(() => {
currentChunk++;
if (currentChunk < totalChunks) {
renderChunk();
saveProgress();
}
}, 1500);
} else {
options[index].classList.add('incorrect');
feedback.className = 'feedback incorrect show';
feedback.textContent = chunk.question.incorrectFeedback;
        // Re-enable after 2 seconds
setTimeout(() => {
options.forEach(opt => {
opt.style.pointerEvents = 'auto';
opt.classList.remove('selected', 'incorrect');
});
feedback.classList.remove('show');
}, 2000);
}
}
// Complete lesson
function completeLesson(lessonIndex) {
lessonsCompleted++;
    // Award XP
let totalXP = parseInt(localStorage.getItem('totalXP') || '0');
totalXP += 25;
localStorage.setItem('totalXP', totalXP);
alert(`🎉 Lesson ${lessonIndex} Complete!\n\n+25 XP earned\nTotal XP: ${totalXP}`);
    // Move to next chunk
currentChunk++;
if (currentChunk < totalChunks) {
currentLesson = lessonIndex;
renderChunk();
saveProgress();
}
}
// Update progress bar
function updateProgress() {
const progress = ((currentChunk + 1) / totalChunks) * 100;
document.getElementById('progressFill').style.width = progress + '%';
const chunk = allChunks[currentChunk];
if (chunk.isFinalQuiz) {
document.getElementById('progressText').textContent = 'Final Quiz - Stripe Completion';
} else if (chunk.isLessonComplete) {
document.getElementById('progressText').textContent = `${chunk.lessonNumber} - Ready to Complete`;
} else {
document.getElementById('progressText').textContent = `${chunk.lessonNumber} - Section ${(currentChunk % 5) + 1}`;
}
}
// Render final quiz
function renderFinalQuiz() {
const quiz = allChunks[currentChunk];
const card = document.getElementById('contentCard');
let html = `
<div class="quiz-header">
<h2>📝 Stripe 1 Final Quiz</h2>
<p>Pass with 80% (4/5 correct) to complete this stripe and earn +100 XP bonus!</p>
</div>
`;
quiz.questions.forEach((q, index) => {
html += `
<div class="quiz-question">
<div class="quiz-question-number">Question ${index + 1} of 5</div>
<div class="quiz-question-text">${q.text}</div>
<div class="options">
${q.options.map((opt, optIndex) => `
<label class="quiz-option" onclick="selectQuizOption(this, ${index}, '${opt.value}')">
<input type="radio" name="q${index}" value="${opt.value}" ${opt.correct ? 'data-correct="true"' : ''}>
<span>${opt.label}</span>
</label>
`).join('')}
</div>
</div>
`;
});
html += `
<div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #3d4466;">
<button class="btn btn-primary" id="submitQuiz" onclick="submitQuiz()" disabled>
Submit Quiz & Complete Stripe <span class="xp-badge">+100 XP</span>
</button>
<p id="quizFeedback" style="margin-top: 20px; font-size: 16px; font-weight: 600;"></p>
</div>
`;
card.innerHTML = html;
updateProgress();
}
// Select quiz option
function selectQuizOption(el, questionIndex, value) {
    // Visual feedback
const allOptions = document.querySelectorAll(`input[name="q${questionIndex}"]`);
allOptions.forEach(radio => {
radio.closest('.quiz-option').classList.remove('selected');
});
el.classList.add('selected');
    // Save answer
quizAnswers[`q${questionIndex}`] = value;
saveProgress();
    // Enable submit if all answered
const quiz = allChunks[currentChunk];
const answered = Object.keys(quizAnswers).length;
document.getElementById('submitQuiz').disabled = answered < quiz.questions.length;
}
// Submit quiz
function submitQuiz() {
const quiz = allChunks[currentChunk];
let correct = 0;
const totalQuestions = quiz.questions.length;
    // Check each answer
quiz.questions.forEach((q, index) => {
const userAnswer = quizAnswers[`q${index}`];
const correctOption = q.options.find(opt => opt.correct);
if (correctOption && userAnswer === correctOption.value) {
correct++;
}
});
const percentage = Math.round((correct / totalQuestions) * 100);
const passed = percentage >= 80; // 80% pass requirement (4/5)
const feedback = document.getElementById('quizFeedback');
if (passed) {
feedback.style.color = '#6ee7b7';
feedback.innerHTML = `
🎉 <strong>Quiz Passed!</strong><br>
Score: ${correct}/${totalQuestions} (${percentage}%)<br>
+100 XP Bonus Earned!<br><br>
<strong>Stripe 1 Complete!</strong>
`;
        // Award XP
let totalXP = parseInt(localStorage.getItem('totalXP') || '0');
totalXP += 100; // Stripe completion bonus
totalXP += 100; // 4 lessons × 25 XP
localStorage.setItem('totalXP', totalXP);
        // Mark stripe complete
let completedStripes = JSON.parse(localStorage.getItem('completedStripes') || '[]');
if (!completedStripes.includes(1)) {
completedStripes.push(1);
localStorage.setItem('completedStripes', JSON.stringify(completedStripes));
}
        // Clear progress
localStorage.removeItem('stripe2Progress');
        // Show continue button
setTimeout(() => {
if (confirm('🎉 Stripe 2 Complete!\n\nContinue to Stripe 3?')) {
window.location.href = 'white-belt-stripe3-interactive-FULL.html';
} else {
window.location.href = 'stripe-navigator.html';
}
}, 2000);
} else {
feedback.style.color = '#fca5a5';
feedback.innerHTML = `
Score: ${correct}/${totalQuestions} (${percentage}%)<br>
Need 80% to pass (4/5 correct)<br><br>
Review the lessons and try again!
`;
        // Allow retake after 3 seconds
setTimeout(() => {
quizAnswers = {};
saveProgress();
renderFinalQuiz();
}, 3000);
}
}