#!/usr/bin/env python3
"""
Add Belt-Specific Failure Messages to Quiz Completion
When users fail a quiz, show belt-appropriate "submission" messages
and link to sections they need to review
"""

import re
from pathlib import Path

# Belt-specific failure messages
BELT_MESSAGES = {
    'white': {
        'emoji': '⚪',
        'title': 'You Got Submitted by a White Belt! 🥋',
        'msg': 'A white belt just showed you there\'s more to learn. In BJJ, getting submitted is how you learn. Review the sections below and try again!'
    },
    'blue': {
        'emoji': '🔵',
        'title': 'You Got Submitted by a Blue Belt! 🥋',
        'msg': 'The blue belt caught you. That\'s okay - every submission teaches you something. Review what you missed and come back stronger!'
    },
    'purple': {
        'emoji': '🟣',
        'title': 'You Got Submitted by a Purple Belt! 🥋',
        'msg': 'The purple belt found your weakness. This is how you grow - by seeing where you need work. Study the sections below and retry!'
    },
    'brown': {
        'emoji': '🟤',
        'title': 'You Got Submitted by a Brown Belt! 🥋',
        'msg': 'The brown belt exposed gaps in your knowledge. This is advanced material - take time to review, then come back ready.'
    },
    'black': {
        'emoji': '⚫',
        'title': 'You Got Submitted by a Black Belt! 🥋',
        'msg': 'The black belt showed you what mastery looks like. Black Belt tests are HARD - that\'s why they mean something. Review, reflect, and return.'
    }
}

def get_belt_and_threshold(filename):
    """Get belt color and passing threshold from filename"""
    if 'white-belt' in filename.lower():
        return 'white', 7
    elif 'blue-belt' in filename.lower():
        return 'blue', 7
    elif 'purple-belt' in filename.lower():
        return 'purple', 7
    elif 'brown-belt' in filename.lower():
        return 'brown', 7
    elif 'black-belt' in filename.lower():
        return 'black', 9
    return 'white', 7

def update_file(filename):
    """Update a single stripe file with failure messages"""
    filepath = Path(filename)
    
    if not filepath.exists():
        print(f"⚠️  {filename} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    belt, threshold = get_belt_and_threshold(filename)
    msg = BELT_MESSAGES[belt]
    
    # Determine XP amounts
    if belt == 'black':
        xp_pass = '75'
        xp_perfect = '75'
    else:
        xp_pass = '50'
        xp_perfect = '75'
    
    # Find and replace checkQuizCompletion function
    # Pattern to match the function
    old_pattern = r'(function checkQuizCompletion\(\) \{[^}]+if \(answered === totalQuestions\) \{[^}]+\})'
    
    new_function = f'''function checkQuizCompletion() {{
            const totalQuestions = document.querySelectorAll('.quiz-question').length;
            const answered = quizAnswers.filter(a => a !== undefined).length;
            
            if (answered === totalQuestions) {{
                const completionDiv = document.querySelector('.quiz-completion');
                completionDiv.style.display = 'block';
                
                // Check if passed
                const passingThreshold = {threshold};
                const passed = quizScore >= passingThreshold;
                
                if (passed) {{
                    // PASSED - Show success message
                    completionDiv.innerHTML = `
                        <h3>Quiz Complete! 🎉</h3>
                        <p class="quiz-score">You scored: <span id="quizScore">${{quizScore}}</span>/10</p>
                        <p class="quiz-xp">+${{quizScore === 10 ? {xp_perfect} : {xp_pass}}} XP awarded!</p>
                        <button class="btn-primary" onclick="completeQuiz(getStripeNumber())">Continue</button>
                    `;
                    document.getElementById('quizScore').textContent = quizScore;
                    
                    // Award XP
                    const xpAmount = quizScore === 10 ? {xp_perfect} : {xp_pass};
                    awardQuizXP(xpAmount);
                }} else {{
                    // FAILED - Show belt-specific submission message
                    const failedQuestions = [];
                    quizAnswers.forEach((isCorrect, index) => {{
                        if (!isCorrect) {{
                            const question = document.querySelector(`[data-question="${{index + 1}}"]`);
                            if (question) {{
                                const questionText = question.querySelector('.question-text')?.textContent || `Question ${{index + 1}}`;
                                failedQuestions.push({{
                                    num: index + 1,
                                    text: questionText.substring(0, 80) + (questionText.length > 80 ? '...' : '')
                                }});
                            }}
                        }}
                    }});
                    
                    completionDiv.innerHTML = `
                        <div style="text-align: center; padding: 2rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">{msg['emoji']}</div>
                            <h3 style="color: #dc2626; margin-bottom: 1rem; font-size: 1.5rem;">{msg['title']}</h3>
                            <p style="color: #64748b; margin-bottom: 2rem; line-height: 1.6; font-size: 1rem;">{msg['msg']}</p>
                            
                            <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 1.5rem; margin: 2rem 0; text-align: left;">
                                <h4 style="color: #991b1b; margin-bottom: 1rem; font-size: 1.1rem;">📚 Review These Questions:</h4>
                                <ul style="color: #7f1d1d; line-height: 1.8; margin-left: 1.5rem; font-size: 0.95rem;">
                                    ${{failedQuestions.map(q => `<li style="margin-bottom: 0.5rem;"><strong>Question ${{q.num}}:</strong> ${{q.text}}</li>`).join('')}}
                                </ul>
                                <p style="color: #991b1b; margin-top: 1rem; font-size: 0.9rem;">
                                    <strong>💡 Tip:</strong> Scroll up to review the lessons and scenarios, then retry the quiz!
                                </p>
                            </div>
                            
                            <div style="margin-top: 2rem;">
                                <button class="btn-primary" onclick="retryQuiz()" style="margin-right: 1rem; padding: 12px 24px; font-size: 1rem;">🔄 Retry Quiz</button>
                                <button class="btn-secondary" onclick="scrollToLessons()" style="padding: 12px 24px; font-size: 1rem;">📖 Review Lessons</button>
                            </div>
                            
                            <p style="color: #64748b; margin-top: 1.5rem; font-size: 0.9rem;">Score: ${{quizScore}}/10 (Need ${{passingThreshold}}/10 to pass)</p>
                        </div>
                    `;
                    
                    // Award small XP for attempt
                    awardQuizXP(10);
                }}
                
                // Scroll to completion
                completionDiv.scrollIntoView({{ behavior: 'smooth', block: 'nearest' }});
            }}
        }}'''
    
    # Try to replace the function
    if re.search(old_pattern, content, re.DOTALL):
        content = re.sub(old_pattern, new_function, content, flags=re.DOTALL)
        replaced = True
    else:
        # Try alternative pattern - match the entire function more flexibly
        alt_pattern = r'(function checkQuizCompletion\(\) \{.*?if \(answered === totalQuestions\).*?\})'
        if re.search(alt_pattern, content, re.DOTALL):
            content = re.sub(alt_pattern, new_function, content, flags=re.DOTALL)
            replaced = True
        else:
            replaced = False
            print(f"   ⚠️  Could not find checkQuizCompletion function pattern")
    
    if replaced:
        # Add helper functions if not present
        if 'function retryQuiz()' not in content:
            helper_code = '''
        function getStripeNumber() {
            const match = window.location.pathname.match(/stripe(\\d+)/);
            return match ? parseInt(match[1]) : 1;
        }
        
        function retryQuiz() {
            quizAnswers = [];
            quizScore = 0;
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
            if (firstQuestion) firstQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        function scrollToLessons() {
            const lessonsSection = document.querySelector('.intro-section, .main-card, .header');
            if (lessonsSection) {
                lessonsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }'''
            
            # Insert before closing script tag (escape backslashes in helper_code)
            helper_code_escaped = helper_code.replace('\\', '\\\\')
            content = re.sub(r'(</script>)', helper_code_escaped + r'\1', content, count=1)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"   ✅ Updated with {belt} belt failure message (threshold: {threshold}/10)")
        return True
    else:
        return False

def main():
    print("🥋 Adding Belt-Specific Failure Messages")
    print("=" * 60)
    
    # All stripe files
    stripe_files = []
    for belt in ['white', 'blue', 'purple', 'brown', 'black']:
        for i in range(1, 5):
            stripe_files.append(f"{belt}-belt-stripe{i}-gamified.html")
    
    updated = 0
    for filename in stripe_files:
        print(f"\n📝 {filename}")
        if update_file(filename):
            updated += 1
    
    print(f"\n✅ Complete! Updated {updated}/{len(stripe_files)} stripe files")
    print(f"🎯 All files now have belt-specific 'submission' failure messages!")

if __name__ == '__main__':
    main()
