/**
* TAP-IN Quiz Utilities
* @module core/quiz
*/
export function selectOption(questionId, optionValue, selectedClass = 'selected') {
const questionElement = document.getElementById(questionId);
if (!questionElement) return;
    // Remove selected class from all options
const options = questionElement.querySelectorAll('.option, .quiz-option');
options.forEach(opt => opt.classList.remove(selectedClass));
    // Add selected class to chosen option
const selectedOption = questionElement.querySelector(`[data-value="${optionValue}"]`);
if (selectedOption) {
selectedOption.classList.add(selectedClass);
}
}
export function renderQuestion(questionId, questionData) {
const container = document.getElementById(questionId);
if (!container) return;
const { question, options, type = 'multiple-choice' } = questionData;
let html = `<div class="question-text">${question}</div>`;
html += '<div class="options">';
options.forEach((option, index) => {
html += `<div class="option" data-value="${option.value || index}">${option.text}</div>`;
});
html += '</div>';
    // Use safeSetInnerHTML if available
if (typeof window !== 'undefined' && window.safeSetInnerHTML) {
window.safeSetInnerHTML(container, html);
} else {
container.innerHTML = html;
}
}
// Make available globally
if (typeof window !== 'undefined') {
window.selectOption = selectOption;
window.renderQuestion = renderQuestion;
}