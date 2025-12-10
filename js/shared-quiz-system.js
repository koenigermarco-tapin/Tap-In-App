/**
 * Shared Quiz System for Stripe Files
 * Provides reusable quiz functionality across all belt stripe pages
 */

(function() {
    'use strict';

    // Shared quiz state
    window.QuizSystem = {
        answers: {},
        score: 0,
        
        /**
         * Select a quiz answer
         * @param {number} questionNum - Question number (1-based)
         * @param {HTMLElement} optionElement - The clicked option element
         */
        selectAnswer: function(questionNum, optionElement) {
            const question = document.querySelector(`[data-question="${questionNum}"]`);
            if (!question) return;
            
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(opt => opt.style.pointerEvents = 'none');
            
            const isCorrect = optionElement.dataset.correct === 'true';
            
            // Visual feedback
            optionElement.classList.add(isCorrect ? 'selected-correct' : 'selected-incorrect');
            
            // Show feedback
            const feedbackDiv = question.querySelector('.quiz-feedback');
            if (feedbackDiv) {
                feedbackDiv.style.display = 'block';
                feedbackDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
                
                const feedbackText = feedbackDiv.querySelector('.feedback-text');
                if (feedbackText) {
                    if (isCorrect) {
                        feedbackText.textContent = "✅ Correct! " + (optionElement.dataset.explanation || '');
                        this.score++;
                    } else {
                        // Highlight correct answer
                        options.forEach(opt => {
                            if (opt.dataset.correct === 'true') {
                                opt.classList.add('selected-correct');
                            }
                        });
                        feedbackText.textContent = "❌ Not quite. " + (optionElement.dataset.explanation || '');
                    }
                }
            }
            
            // Track answer
            this.answers[questionNum - 1] = isCorrect;
            
            // Check completion
            this.checkCompletion();
        },
        
        /**
         * Check if all questions are answered
         */
        checkCompletion: function() {
            const totalQuestions = document.querySelectorAll('.quiz-question').length;
            const answeredCount = Object.keys(this.answers).length;
            
            if (answeredCount === totalQuestions) {
                this.showCompletion();
            }
        },
        
        /**
         * Show quiz completion
         */
        showCompletion: function() {
            const totalQuestions = document.querySelectorAll('.quiz-question').length;
            const passingThreshold = Math.ceil(totalQuestions * 0.7); // 70% pass
            const passed = this.score >= passingThreshold;
            
            const completionDiv = document.querySelector('.quiz-completion');
            if (!completionDiv) return;
            
            completionDiv.style.display = 'block';
            
            const scoreElement = completionDiv.querySelector('#quizScore');
            if (scoreElement) {
                scoreElement.textContent = this.score;
            }
            
            const xpElement = completionDiv.querySelector('.quiz-xp');
            if (xpElement) {
                const xpAmount = passed ? 50 : 25;
                xpElement.textContent = `+${xpAmount} XP ${passed ? 'awarded!' : '(minimum score)'}`;
                this.awardXP(xpAmount);
            }
            
            // Scroll to completion
            completionDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        
        /**
         * Award XP for quiz
         * @param {number} amount - XP amount to award
         */
        awardXP: function(amount) {
            if (typeof TapInGamification !== 'undefined' && TapInGamification.awardXP) {
                TapInGamification.awardXP(amount, 'quiz');
            } else if (typeof CoreGamification !== 'undefined' && CoreGamification.awardXP) {
                CoreGamification.awardXP(amount, 'quiz');
            } else {
                // Fallback
                const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
                localStorage.setItem('totalXP', (currentXP + amount).toString());
            }
        },
        
        /**
         * Complete quiz and mark stripe complete
         * @param {number} stripeNum - Stripe number
         * @param {string} beltName - Belt name (e.g., 'white', 'blue')
         */
        completeQuiz: function(stripeNum, beltName) {
            const totalQuestions = document.querySelectorAll('.quiz-question').length;
            const passingThreshold = Math.ceil(totalQuestions * 0.7);
            const passed = this.score >= passingThreshold;
            
            if (!passed) {
                if (confirm(`Quiz score: ${this.score}/${totalQuestions}. You need ${passingThreshold}/${totalQuestions} to pass. Review the lessons and try again?`)) {
                    this.retry();
                    return;
                }
            }
            
            // Mark quiz complete
            const storageKey = `${beltName}BeltStripe${stripeNum}QuizComplete`;
            localStorage.setItem(storageKey, 'true');
            
            // Award completion bonus if passed
            if (passed) {
                const bonusXP = 50;
                this.awardXP(bonusXP);
            }
        },
        
        /**
         * Reset quiz for retry
         */
        retry: function() {
            this.answers = {};
            this.score = 0;
            
            document.querySelectorAll('.quiz-question').forEach(question => {
                const options = question.querySelectorAll('.quiz-option');
                options.forEach(opt => {
                    opt.style.pointerEvents = 'auto';
                    opt.classList.remove('selected-correct', 'selected-incorrect');
                });
                
                const feedback = question.querySelector('.quiz-feedback');
                if (feedback) {
                    feedback.style.display = 'none';
                    feedback.classList.remove('correct', 'incorrect');
                }
            });
            
            const completionDiv = document.querySelector('.quiz-completion');
            if (completionDiv) completionDiv.style.display = 'none';
            
            const firstQuestion = document.querySelector('.quiz-question');
            if (firstQuestion) {
                firstQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        /**
         * Get stripe number from URL
         */
        getStripeNumber: function() {
            const match = window.location.pathname.match(/stripe(\d+)/);
            return match ? parseInt(match[1]) : 1;
        },
        
        /**
         * Get belt name from URL
         */
        getBeltName: function() {
            const match = window.location.pathname.match(/(white|blue|purple|brown|black)-belt/);
            return match ? match[1] : 'white';
        },
        
        /**
         * Initialize quiz system
         */
        init: function() {
            this.answers = {};
            this.score = 0;
        }
    };

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.QuizSystem.init();
        });
    } else {
        window.QuizSystem.init();
    }

})();

// Global helper functions for backward compatibility
function selectQuizAnswer(questionNum, optionElement) {
    window.QuizSystem.selectAnswer(questionNum, optionElement);
}

function checkQuizCompletion() {
    window.QuizSystem.checkCompletion();
}

function completeQuiz(stripeNum) {
    const beltName = window.QuizSystem.getBeltName();
    window.QuizSystem.completeQuiz(stripeNum, beltName);
}

function retryQuiz() {
    window.QuizSystem.retry();
}

function getStripeNumber() {
    return window.QuizSystem.getStripeNumber();
}

