# 🎬 ANIMATION CODE DISCOVERED

**Source:** `worker-type-assessment.html`

---

## 🎨 KEY ANIMATIONS FOUND

### 1. **fadeIn** - Main Content Reveal
```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Applied to: */
.results.active {
    display: block;
    animation: fadeIn 0.5s ease;
}
```

### 2. **slideIn** - Insight Cards (Between Questions)
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Applied to: */
.insight-card {
    animation: slideIn 0.4s ease;
}
```

### 3. **slideInRight** - Achievement Toast
```css
@keyframes slideInRight {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```

---

## 🔄 PROGRESSIVE REVEAL PATTERN

### JavaScript Flow (from worker-type-assessment.html):

```javascript
let currentQuestion = 0;
let answers = {};

function renderQuestion() {
    const q = questions[currentQuestion];
    const card = document.getElementById('questionCard');
    
    let html = '';
    
    // 1. Show insight BEFORE question (if not first)
    if (currentQuestion >= 1) {
        const insight = insights[currentQuestion - 1];
        html += `
            <div class="insight-card">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-title">${insight.title}</div>
                <div class="insight-content">${insight.content}</div>
            </div>
        `;
    }
    
    // 2. Show question with options
    html += `
        <div class="question">
            <span class="question-number">${currentQuestion + 1}.</span>
            ${q.question}
        </div>
        <div class="options">
    `;
    
    q.options.forEach((opt) => {
        const selected = answers[currentQuestion] === opt.value ? 'selected' : '';
        html += `
            <label class="option ${selected}" onclick="selectOption(this, '${opt.value}')">
                <input type="radio" name="q${currentQuestion}" value="${opt.value}">
                <div class="option-label">${opt.label}</div>
            </label>
        `;
    });
    
    card.innerHTML = html;
    updateProgress();
    updateButtons();
}

function selectOption(el, value) {
    answers[currentQuestion] = value;
    // Visual feedback
    document.querySelectorAll('.option').forEach(opt => 
        opt.classList.remove('selected')
    );
    el.classList.add('selected');
    // Enable Next button
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(); // This triggers the animation via CSS
        window.scrollTo(0, 0);
    } else {
        showResults();
    }
}
```

---

## 🎯 THE PATTERN FOR LESSONS

### Current Structure (all at once):
```
[All lesson content dumped]
[Practice exercise]
[Mark Complete button]
```

### Desired Structure (progressive):
```
Slide 1: Intro text → Question → Click
Slide 2: Concept text → Question → Click
Slide 3: Research box → Question → Click
Slide 4: Takeaways → Question → Click
Slide 5: Practice → Mark Complete (+25 XP)
```

---

## 🛠️ HOW TO APPLY

### Step 1: Break Lesson into Chunks
Each lesson (e.g., "The Two Types of Trust") becomes:
- **chunks[]** array with content blocks
- **questions[]** array with inline questions
- **currentChunk** counter (like currentQuestion)

### Step 2: Create renderChunk() function
```javascript
function renderChunk() {
    const chunk = chunks[currentChunk];
    const card = document.getElementById('lessonCard');
    
    let html = `
        <div class="lesson-content" style="animation: fadeIn 0.5s ease;">
            ${chunk.content}
        </div>
    `;
    
    // Add question if not last chunk
    if (currentChunk < chunks.length - 1) {
        const q = questions[currentChunk];
        html += `
            <div class="quick-check" style="animation: slideIn 0.4s ease;">
                <h4>✓ Quick Check</h4>
                <p>${q.question}</p>
                <div class="options">
                    ${q.options.map((opt, i) => `
                        <div class="option" onclick="answerQuickCheck(${i}, ${opt.correct})">
                            ${opt.label}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        // Last chunk: show complete button
        html += `
            <button class="btn btn-primary" onclick="completeLesson()">
                Mark Complete <span class="xp-badge">+25 XP</span>
            </button>
        `;
    }
    
    card.innerHTML = html;
}

function answerQuickCheck(index, isCorrect) {
    if (isCorrect) {
        // Show feedback
        showFeedback('✓ Correct!');
        // Auto-advance after 1 second
        setTimeout(() => {
            currentChunk++;
            renderChunk();
            window.scrollTo(0, 0);
        }, 1000);
    } else {
        showFeedback('Try again!');
    }
}
```

### Step 3: Apply CSS
```css
.lesson-content {
    animation: fadeIn 0.5s ease;
}

.quick-check {
    animation: slideIn 0.4s ease;
    background: #3d4466;
    padding: 25px;
    border-radius: 12px;
    margin-top: 25px;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

---

## 📊 LESSON 1 BREAKDOWN EXAMPLE

**"The Two Types of Trust"** → 5 chunks:

### Chunk 0:
```javascript
{
    content: `
        <h3>🎯 What You'll Learn</h3>
        <ul>
            <li>The critical difference between predictability-based trust...</li>
            <li>Why high-performing teams require vulnerability-based trust</li>
            <li>How to assess which type of trust exists in your team</li>
        </ul>
    `,
    question: {
        text: "Which type of trust is most common in new teams?",
        options: [
            { label: "A) Predictability-based", correct: true },
            { label: "B) Vulnerability-based", correct: false },
            { label: "C) Both equally", correct: false }
        ]
    }
}
```

### Chunk 1:
```javascript
{
    content: `
        <h3>📖 Core Concept</h3>
        <p>Most people confuse reliability with trust...</p>
        <p><strong>Predictability-based trust</strong>—useful, but limited...</p>
    `,
    question: {
        text: "Predictability-based trust means...",
        options: [
            { label: "A) You can be vulnerable", correct: false },
            { label: "B) You can predict behavior", correct: true },
            { label: "C) Deep relationships exist", correct: false }
        ]
    }
}
```

### Chunk 2:
```javascript
{
    content: `
        <p><strong>Vulnerability-based trust</strong> is different...</p>
        <p>Amy Edmondson's research: <strong>psychological safety</strong></p>
        
        <div class="research-box">
            <h4>📊 Google's Project Aristotle</h4>
            <p>2-year study of 180 teams...</p>
            <ul>
                <li>43% variance in performance...</li>
                <li>19% higher productivity...</li>
            </ul>
        </div>
    `,
    question: {
        text: "What's the #1 predictor of team performance?",
        options: [
            { label: "A) IQ", correct: false },
            { label: "B) Psychological safety", correct: true },
            { label: "C) Experience", correct: false }
        ]
    }
}
```

### Chunk 3:
```javascript
{
    content: `
        <h3>🔍 Why This Matters</h3>
        <p>Teams without vulnerability-based trust operate in constant self-protection...</p>
        
        <h3>💡 Key Takeaways</h3>
        <ul>
            <li><strong>Predictability-based trust</strong> lets you rely...</li>
            <li>Teams waste energy on self-protection...</li>
            <li>Building trust requires someone to go first...</li>
        </ul>
    `,
    question: {
        text: "Who typically needs to go first in building vulnerability-based trust?",
        options: [
            { label: "A) Anyone on the team", correct: false },
            { label: "B) The leader", correct: true },
            { label: "C) HR department", correct: false }
        ]
    }
}
```

### Chunk 4 (Final):
```javascript
{
    content: `
        <div class="practice-box">
            <h4>✨ Practice Exercise</h4>
            <p><strong>This week:</strong> In your next team meeting, admit something you don't know...</p>
        </div>
    `,
    // No question - show complete button instead
}
```

---

## ✅ SUMMARY

**Animation Pattern Found:**
1. ✅ `fadeIn` - main content (0.5s)
2. ✅ `slideIn` - questions/insight boxes (0.4s)
3. ✅ Progressive reveal via `currentQuestion` counter
4. ✅ Option selection with visual feedback
5. ✅ Disabled Next button until answer selected
6. ✅ Auto-scroll to top on advance

**Ready to implement on lessons!**

---

## 🎯 NEXT STEP

Transform `white-belt-stripe1-carousel.html` from:
- **5 full lesson slides** (dump all content)

To:
- **~20 micro-slides** (progressive chunks with questions)

Each lesson becomes 4-5 chunks with inline questions.

Reuse exact animation CSS from `worker-type-assessment.html`.

