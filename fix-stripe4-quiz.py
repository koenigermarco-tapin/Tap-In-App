#!/usr/bin/env python3
"""Remove hardcoded questions from Stripe 4 and ensure dynamic loader is in place"""

import re
from pathlib import Path

filepath = Path('src/pages/gym/white-belt-stripe4-gamified.html')

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the quiz section start
quiz_start_pattern = r'(<p>Complete this quiz to validate your understanding of this stripe\'s content\.</p>\s*</div>)'

# Check if dynamic container already exists
if 'id="dynamicQuizContainer"' in content:
    print("✅ Dynamic quiz container already exists")
    
    # Remove all hardcoded questions between quiz section and quiz-completion
    # Find the pattern: </div> followed by <!-- Question 1 through Question 10
    pattern = r'(</div>\s*<!-- Question 1: Multiple Choice -->.*?<!-- Question 10: Multiple Choice -->.*?</div>\s*<div class="quiz-completion")'
    
    replacement = r'</div>\n<div class="quiz-completion"'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("✅ Removed hardcoded questions from Stripe 4")
    else:
        print("⚠️  No hardcoded questions found to remove")
else:
    # Add dynamic container if missing
    replacement = r'\1\n<!-- Dynamic Quiz Container - Questions loaded from stripe4-content.js -->\n<div id="dynamicQuizContainer"></div>\n<script>\n// Dynamic Quiz Loader for Stripe 4\n(function() {\n    \'use strict\';\n    \n    function loadDynamicQuiz() {\n        if (typeof allChunks === \'undefined\') {\n            setTimeout(loadDynamicQuiz, 100);\n            return;\n        }\n        \n        const container = document.getElementById(\'dynamicQuizContainer\');\n        if (!container) return;\n        \n        const questionsWithQuiz = allChunks.filter(chunk => chunk.question && chunk.question.text);\n        const quizQuestions = questionsWithQuiz.slice(0, 10);\n        const totalQuestions = quizQuestions.length;\n        \n        container.innerHTML = \'\';\n        \n        quizQuestions.forEach((chunk, index) => {\n            const questionNum = index + 1;\n            const question = chunk.question;\n            \n            const questionDiv = document.createElement(\'div\');\n            questionDiv.className = \'quiz-question\';\n            questionDiv.setAttribute(\'data-question\', questionNum);\n            \n            let optionsHTML = \'\';\n            const optionLabels = [\'A\', \'B\', \'C\', \'D\', \'E\', \'F\'];\n            question.options.forEach((option, optIndex) => {\n                const label = optionLabels[optIndex] || String.fromCharCode(65 + optIndex);\n                const isCorrect = option.correct === true;\n                const explanation = isCorrect ? question.correctFeedback : question.incorrectFeedback;\n                optionsHTML += `\n                    <button class="quiz-option" \n                            data-correct="${isCorrect}" \n                            data-explanation="${explanation.replace(/"/g, \'&quot;\')}" \n                            onclick="selectQuizAnswer(${questionNum}, this)" \n                            aria-label="${label}) ${option.label.replace(/"/g, \'\')}">\n                        ${label}) ${option.label}\n                    </button>\n                `;\n            });\n            \n            questionDiv.innerHTML = `\n                <h3>Question ${questionNum} of ${totalQuestions}</h3>\n                <p class="question-text">${question.text}</p>\n                <div class="quiz-options">\n                    ${optionsHTML}\n                </div>\n                <div class="quiz-feedback" style="display: none;">\n                    <p class="feedback-text"></p>\n                </div>\n            `;\n            \n            container.appendChild(questionDiv);\n        });\n        \n        if (typeof window.totalQuizQuestions !== \'undefined\') {\n            window.totalQuizQuestions = totalQuestions;\n        }\n        if (typeof totalQuizQuestions !== \'undefined\') {\n            totalQuizQuestions = totalQuestions;\n        }\n    }\n    \n    if (document.readyState === \'loading\') {\n        document.addEventListener(\'DOMContentLoaded\', loadDynamicQuiz);\n    } else {\n        loadDynamicQuiz();\n    }\n})();\n</script>'
    
    new_content = re.sub(quiz_start_pattern, replacement, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("✅ Added dynamic quiz container to Stripe 4")

print("✅ Stripe 4 fix complete!")

