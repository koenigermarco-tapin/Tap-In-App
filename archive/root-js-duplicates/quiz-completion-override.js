/**
 * Override completeQuiz function to use enhanced completion
 */

// Store original function if exists
const originalCompleteQuiz = window.completeQuiz;

// Enhanced completion function
window.completeQuizEnhanced = function(stripeNum) {
    // Get belt and stripe from URL
    const path = window.location.pathname;
    const match = path.match(/(\w+)-belt-stripe(\d+)/);
    
    if (!match) {
        // Fallback to original if can't detect
        if (originalCompleteQuiz) originalCompleteQuiz(stripeNum);
        return;
    }
    
    const belt = match[1];
    const stripe = parseInt(match[2]);
    
    // Get quiz score
    const quizScore = window.quizScore || parseInt(document.getElementById('quizScore')?.textContent || '0');
    const totalQuestions = 10;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    
    // Get time spent (from depth system or estimate)
    let timeSpent = 0;
    if (typeof StripeDepthSystem !== 'undefined') {
        timeSpent = Math.round(StripeDepthSystem.state.totalTimeSpent / 60);
    } else {
        // Estimate based on localStorage
        const savedTime = localStorage.getItem(`${belt}Stripe${stripe}TimeSpent`);
        timeSpent = savedTime ? Math.round(parseInt(savedTime) / 60) : 10;
    }
    
    // Get reflection text if any
    let reflectionText = '';
    const reflectionFields = document.querySelectorAll('textarea, [data-reflection]');
    reflectionFields.forEach(field => {
        if (field.value) reflectionText += field.value + ' ';
    });
    
    // Mark original completion keys
    localStorage.setItem(`${belt}BeltStripe${stripe}Complete`, 'true');
    localStorage.setItem(`${belt}beltStripe${stripe}QuizComplete`, 'true');
    
    // Trigger achievement event
    window.dispatchEvent(new CustomEvent('lessonCompleted'));
    
    // Use enhanced completion screen if available
    if (typeof StripeCompletionEnhanced !== 'undefined') {
        StripeCompletionEnhanced.show({
            belt: belt,
            stripe: stripe,
            quizScore: percentage,
            timeSpent: timeSpent,
            reflectionText: reflectionText
        });
    } else {
        // Fallback - navigate to next
        if (stripe < 4) {
            window.location.href = `${belt}-belt-stripe${stripe + 1}-gamified.html`;
        } else {
            window.location.href = `${belt}-belt.html`;
        }
    }
};

// Override default if it exists
if (typeof window.completeQuiz !== 'undefined') {
    window.completeQuiz = window.completeQuizEnhanced;
}
