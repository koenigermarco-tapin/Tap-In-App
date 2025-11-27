# 📝 CLAUDE PROMPT: Generate 27 Hub Lesson Files

## CONTEXT
You are generating educational lesson content for a leadership development platform called "Tap-In". The platform has a professional, supportive tone and teaches practical leadership skills.

---

## TASK
Generate **20 remaining HTML lesson files** (I've already created 7 Communication Mastery lessons).

Use the **EXACT template structure** from `communication-mastery-1-listening.html` as your base.

---

## TEMPLATE TO FOLLOW

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[LESSON TITLE] | Tap-In</title>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <style>
    /* Copy ALL CSS from communication-mastery-1-listening.html - DO NOT MODIFY */
  </style>
</head>
<body>
  <nav class="lesson-nav">
    <div class="nav-container">
      <a href="[MODULE]-v2.html" class="back-btn">← Back to [Module Name]</a>
      <span class="progress-indicator">Lesson X of Y</span>
    </div>
  </nav>

  <div class="lesson-container">
    <header class="lesson-header">
      <h1>[EMOJI] [Title]</h1>
      <p class="subtitle">[One-line subtitle]</p>
      <div class="lesson-meta">
        <span class="meta-item">⏱️ [X] minutes</span>
        <span class="meta-item">⭐ +30 XP</span>
      </div>
    </header>

    <section class="content-section">
      <h2>[Main Topic 1]</h2>
      <p>[200-300 words of educational content]</p>
      <div class="highlight-box">
        <strong>Key insight:</strong> [Memorable takeaway]
      </div>
    </section>

    <section class="content-section">
      <h2>[Main Topic 2]</h2>
      <p>[Content with practical examples]</p>
      
      <!-- Optional: Use comparison boxes for good/bad examples -->
      <div class="comparison-box">
        <div class="comparison-item bad">
          <h4>❌ Don't Do This</h4>
          <p style="color: #94a3b8; font-size: 0.9rem;">[Bad example]</p>
        </div>
        <div class="comparison-item good">
          <h4>✅ Do This Instead</h4>
          <p style="color: #94a3b8; font-size: 0.9rem;">[Good example]</p>
        </div>
      </div>
    </section>

    <section class="practice-section">
      <h2>🎯 Practice Exercise: [Exercise Title]</h2>
      <p>[Clear instructions for the exercise]</p>
      <div class="exercise-box">
        <textarea placeholder="[Helpful placeholder with example]"></textarea>
        <button onclick="saveExercise()">Save Progress</button>
      </div>
    </section>

    <section class="takeaway-section">
      <h2>💡 Key Takeaway</h2>
      <p style="color: #e2e8f0; margin: 1rem 0;">
        <strong>[One sentence summary]</strong> [Additional context sentence]
      </p>
      <button onclick="completeLesson()" class="complete-btn">
        Mark Complete (+30 XP)
      </button>
    </section>

    <nav class="lesson-footer">
      <a href="[previous-lesson].html" class="btn btn-secondary">← Previous Lesson</a>
      <a href="[next-lesson].html" class="btn btn-primary">Next Lesson →</a>
    </nav>
  </div>

  <script>
    function saveExercise() {
      const textarea = document.querySelector('textarea');
      const answer = textarea.value;
      
      if (!answer.trim()) {
        alert('Please complete the exercise before saving!');
        return;
      }
      
      localStorage.setItem('exercise-[module-id]-[lesson-num]', answer);
      alert('✅ Progress saved!');
    }

    function completeLesson() {
      const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
      localStorage.setItem('totalXP', currentXP + 30);
      
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      if (!completedLessons.includes('[lesson-id]')) {
        completedLessons.push('[lesson-id]');
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      }
      
      alert('🎉 Lesson completed! +30 XP earned!');
      window.location.href = '[next-lesson].html';
    }
  </script>
</body>
</html>
```

---

## LESSONS TO GENERATE (20 files)

### ✅ ALREADY DONE (7 files):
- communication-mastery-1-listening.html ✅
- communication-mastery-2-clarity.html ✅
- communication-mastery-3-feedback.html ✅
- communication-mastery-4-receiving.html ✅
- communication-mastery-5-difficult.html ✅
- communication-mastery-6-nonverbal.html ✅
- communication-mastery-7-meetings.html ✅

---

### 🔵 BATCH 1: Communication Mastery (1 remaining)

**File:** `communication-mastery-8-written.html`
- **Title:** Written Communication
- **Subtitle:** Words that work in email and Slack
- **Time:** 12 minutes | XP: +30
- **Content Topics:**
  - Email best practices (subject lines, BLUF, length)
  - Slack/Teams etiquette (threading, @mentions, status)
  - Documentation standards (what to write vs. what to say)
  - Tone in writing (you sound harsher than you think)
  - When to pick up the phone instead
- **Practice:** Revise an unclear email using BLUF and clear structure
- **Takeaway:** "Written communication is permanent—edit before sending"
- **Navigation:** 
  - Back: `communication-mastery-v2.html`
  - Previous: `communication-mastery-7-meetings.html`
  - Progress: "Lesson 8 of 8"
  - localStorage key: `exercise-comm-mastery-8`
  - Completion ID: `communication-mastery-8`

---

### 🟢 BATCH 2: Energy Management (4 files)

**File:** `energy-fundamentals-1.html`
- **Title:** Understanding the 80/20 Principle
- **Subtitle:** Not all hours are created equal
- **Time:** 10 minutes | XP: +25
- **Content:** Pareto Principle in energy, peak vs recovery windows, identifying personal peak hours, myth of "time management", protecting prime 20%
- **Practice:** Track your energy for 3 days (morning/afternoon/evening ratings)
- **Takeaway:** "Work smarter by working when you're strongest"
- **Back to:** `energy-management-v2.html`

**File:** `energy-fundamentals-2.html`
- **Title:** Circadian Rhythms and Performance
- **Subtitle:** Work with your biology, not against it
- **Time:** 12 minutes | XP: +25
- **Content:** Biological clock, morning larks vs night owls, post-lunch dip, light/caffeine/energy regulation, aligning schedule to rhythm
- **Practice:** Identify your chronotype (quiz with 5 questions)
- **Takeaway:** "Fighting your rhythm is fighting yourself"

**File:** `energy-fundamentals-3.html`
- **Title:** Energy Audit
- **Subtitle:** What drains you, what fuels you
- **Time:** 15 minutes | XP: +25
- **Content:** Energy vampires, energy amplifiers, energy ROI of tasks, saying no to protect energy, building energy buffers
- **Practice:** Complete energy audit worksheet (list 5 drainers, 5 amplifiers)
- **Takeaway:** "Manage energy, not time"

**File:** `energy-fundamentals-4.html`
- **Title:** Building Energy Rituals
- **Subtitle:** Design your ideal day
- **Time:** 12 minutes | XP: +25
- **Content:** Morning rituals, transition rituals, recovery rituals, evening rituals, compound effect of tiny habits
- **Practice:** Design your ideal morning ritual (3-5 elements)
- **Takeaway:** "Consistency beats intensity"

---

### 🟣 BATCH 3: Boundaries (4 files)

**File:** `boundaries-1.html`
- **Title:** Why Boundaries Matter
- **Subtitle:** The foundation of sustainable performance
- **Time:** 10 minutes | XP: +25
- **Content:** What boundaries are, why boundary-less people burn out, common violations, cost of saying yes to everything, boundaries as self-respect
- **Practice:** Identify your 3 biggest boundary violations
- **Takeaway:** "Boundaries are not walls, they're guidelines"

**File:** `boundaries-2.html`
- **Title:** Setting Boundaries
- **Subtitle:** How to say no with grace
- **Time:** 12 minutes | XP: +25
- **Content:** "No sandwich" technique, scripting boundaries, when to explain vs decline, upward/downward/lateral boundaries, importance of consistency
- **Practice:** Script 3 boundary statements you need to use
- **Takeaway:** "'No' is a complete sentence"

**File:** `boundaries-3.html`
- **Title:** Maintaining Boundaries
- **Subtitle:** When people push back
- **Time:** 12 minutes | XP: +25
- **Content:** Handling pushback, broken record technique, recognizing boundary testing, when to stand firm vs flex, supporting others' boundaries
- **Practice:** Plan for your biggest boundary challenge
- **Takeaway:** "People respect boundaries when you respect them first"

**File:** `boundaries-4.html`
- **Title:** Self-Care Boundaries
- **Subtitle:** Protecting time for yourself
- **Time:** 10 minutes | XP: +25
- **Content:** Non-negotiable self-care, calendar blocking, evening/weekend boundaries, oxygen mask principle, self-care as performance optimization
- **Practice:** Create your boundary map (what's negotiable vs non-negotiable)
- **Takeaway:** "Self-care isn't selfish, it's strategic"

---

### 🔴 BATCH 4: Deep Work (4 files)

**File:** `deep-work-1.html`
- **Title:** What is Deep Work?
- **Subtitle:** The competitive advantage of focus
- **Time:** 10 minutes | XP: +25
- **Content:** Deep vs shallow work, why deep work is rare/valuable, attention economy, task switching costs, deep work as superpower
- **Practice:** Audit your last 3 work days (how many hours were deep work?)
- **Takeaway:** "Your ability to focus is your edge"

**File:** `deep-work-2.html`
- **Title:** Creating Flow States
- **Subtitle:** When time disappears and quality soars
- **Time:** 12 minutes | XP: +25
- **Content:** Science of flow (Csikszentmihalyi), conditions for flow, removing friction, 20-minute warm-up period, capturing insights during flow
- **Practice:** Design your ideal deep work session (environment, duration, ritual)
- **Takeaway:** "Flow is a skill you can train"

**File:** `deep-work-3.html`
- **Title:** Deep Work Protocols
- **Subtitle:** Systems that protect focus
- **Time:** 15 minutes | XP: +25
- **Content:** Timeboxing deep work blocks, "Do Not Disturb" protocol, email/Slack batching, environmental design, accountability partnerships
- **Practice:** Build your personal protocol (when, where, how long, what triggers)
- **Takeaway:** "Systems beat willpower"

**File:** `deep-work-4.html`
- **Title:** Defending Deep Work
- **Subtitle:** Communicating your focus needs
- **Time:** 12 minutes | XP: +25
- **Content:** Educating team, setting response time expectations, communication templates, creating team norms, measuring deep work hours
- **Practice:** Draft your deep work announcement for your team
- **Takeaway:** "Protect your focus or someone else will steal it"

---

### 🟠 BATCH 5: Feedback Culture (4 files)

**File:** `feedback-culture-1.html`
- **Title:** Feedback Fundamentals
- **Subtitle:** Building a culture where feedback flows
- **Time:** 10 minutes | XP: +25
- **Content:** Why teams avoid feedback, psychological safety as foundation, feedback as kindness, the feedback gap, making feedback normal
- **Practice:** Take the feedback culture pulse (5 questions about your team)
- **Takeaway:** "Feedback is the breakfast of champions"

**File:** `feedback-culture-2.html`
- **Title:** Real-Time Feedback
- **Subtitle:** Don't wait for the review
- **Time:** 12 minutes | XP: +25
- **Content:** Power of immediate feedback, catching people doing things right, 24-hour window, micro-feedback in meetings, building the habit
- **Practice:** Give 3 pieces of feedback within 24 hours (plan who and what)
- **Takeaway:** "Fresh feedback is effective feedback"

**File:** `feedback-culture-3.html`
- **Title:** Receiving Feedback as a Team
- **Subtitle:** Creating safety to speak up
- **Time:** 12 minutes | XP: +25
- **Content:** Modeling vulnerability, "what did I miss?" question, rewarding candor, closing feedback loop, anonymous channels
- **Practice:** Start a feedback journal (what feedback did you receive/how did you respond?)
- **Takeaway:** "The quality of feedback you get reflects the safety you create"

**File:** `feedback-culture-4.html`
- **Title:** Building Feedback Systems
- **Subtitle:** Structure that makes feedback easy
- **Time:** 10 minutes | XP: +25
- **Content:** Weekly team rituals, peer feedback frameworks, 360-degree feedback, retrospectives, measuring feedback health
- **Practice:** Design your team feedback system (when, how, what format)
- **Takeaway:** "Don't rely on willpower, build systems"

---

### 🟡 BATCH 6: Expectation Management (3 files)

**File:** `expectation-mgmt-1-upward.html`
- **Title:** Managing Upward
- **Subtitle:** Clarify expectations with your manager
- **Time:** 12 minutes | XP: +30
- **Content:** Why upward management matters, weekly sync agenda, asking for clear priorities, communicating blockers early, making manager's job easier
- **Practice:** Prepare your next 1-on-1 agenda using the framework
- **Takeaway:** "Your manager isn't a mind reader"

**File:** `expectation-mgmt-2-downward.html`
- **Title:** Managing Downward
- **Subtitle:** Set clear expectations with your team
- **Time:** 12 minutes | XP: +30
- **Content:** Explicit vs implicit expectations, "definition of done", checking for understanding not just agreement, revising expectations as context changes, cost of ambiguity
- **Practice:** Document expectations for one direct report on their current project
- **Takeaway:** "Clarity is kindness"

**File:** `expectation-mgmt-3-lateral.html`
- **Title:** Peer Expectations
- **Subtitle:** Aligning with colleagues and stakeholders
- **Time:** 10 minutes | XP: +30
- **Content:** Stakeholder mapping, explicit collaboration agreements, response time expectations, decision rights and authority, resolving expectation conflicts
- **Practice:** Create stakeholder map for your current project
- **Takeaway:** "Assumptions are where collaboration dies"

---

## CONTENT QUALITY STANDARDS

### Tone & Style:
- **Professional but warm** - like a wise mentor, not a textbook
- **Practical over theoretical** - real examples, not academic
- **Conversational** - write like you're talking to a colleague
- **Honest** - acknowledge when things are hard
- **Action-oriented** - every lesson ends with something to DO

### Content Structure:
- **200-300 words per major section minimum**
- **Real examples** - use workplace scenarios people recognize
- **Research citations when possible** (e.g., "Research by X shows...")
- **Comparison boxes** for good/bad examples where relevant
- **Highlight boxes** for key insights
- **Specific, actionable practice exercises**

### Writing Tips:
- Start sections with a hook or surprising fact
- Use "you" language (speak directly to the reader)
- Break up long paragraphs (3-4 sentences max)
- Use bullet points and numbered lists generously
- End each section with a transition to the next

### Examples to Include:
- Workplace scenarios (meetings, emails, 1-on-1s)
- Common mistakes people make
- "Before/After" transformations
- Research findings (Google's Project Aristotle, etc.)
- Quotes from leadership experts when relevant

---

## FILE NAMING & NAVIGATION

### File Names:
- Use lowercase with hyphens: `energy-fundamentals-1.html`
- Match the pattern: `[module]-[lesson-number].html`

### Navigation Links:
- **Back button:** Links to module overview (e.g., `energy-management-v2.html`)
- **Previous/Next:** Links to adjacent lesson files
- **Progress indicator:** "Lesson X of Y" (update for each module)

### localStorage Keys:
- Exercise: `exercise-[short-module]-[number]` (e.g., `exercise-energy-1`)
- Completion: `[module-full-name]-[number]` (e.g., `energy-fundamentals-1`)

---

## TESTING CHECKLIST

For each file you generate:
- [ ] Opens without errors
- [ ] All links work (back, previous, next)
- [ ] Exercise textarea saves to localStorage
- [ ] Complete button awards XP and marks lesson complete
- [ ] Mobile responsive (test at 375px width)
- [ ] Content is 200+ words per section
- [ ] Practice exercise is clear and actionable
- [ ] Takeaway is memorable and concise

---

## DELIVERY FORMAT

Create each file as a complete, standalone HTML document.

**File order to generate:**
1. communication-mastery-8-written.html
2. energy-fundamentals-1.html
3. energy-fundamentals-2.html
4. energy-fundamentals-3.html
5. energy-fundamentals-4.html
6. boundaries-1.html
7. boundaries-2.html
8. boundaries-3.html
9. boundaries-4.html
10. deep-work-1.html
11. deep-work-2.html
12. deep-work-3.html
13. deep-work-4.html
14. feedback-culture-1.html
15. feedback-culture-2.html
16. feedback-culture-3.html
17. feedback-culture-4.html
18. expectation-mgmt-1-upward.html
19. expectation-mgmt-2-downward.html
20. expectation-mgmt-3-lateral.html

---

## 🚀 START GENERATING!

Generate all 20 lesson files following this template and guidelines.

Each file should be:
- ✅ Copy-paste ready (complete HTML)
- ✅ Professionally written (200-300+ words per section)
- ✅ Fully functional (all buttons/links work)
- ✅ Mobile responsive
- ✅ Following the exact CSS/structure from the template

**Goal:** Create high-quality educational content that teaches practical leadership skills in an engaging, actionable way.

Good luck! 🎯

