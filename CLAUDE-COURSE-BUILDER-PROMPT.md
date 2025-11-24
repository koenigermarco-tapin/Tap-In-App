# 🥋 Course Builder Prompt for Claude Projects

## Context
I'm building a leadership development platform with a **Jiu-Jitsu belt & stripe progression system** based on Patrick Lencioni's **5 Dysfunctions of a Team** framework. I need you to help me create comprehensive learning modules following the existing structure.

---

## 🎯 Belt System Architecture

### Belt Progression (5 Dysfunctions → 5 Belts)

| Belt Color | Dysfunction Mastered | Focus Area | Estimated Duration |
|------------|---------------------|------------|-------------------|
| ⚪ **White Belt** | Absence of Trust | Building Vulnerability-Based Trust | 30-45 days |
| 🔵 **Blue Belt** | Fear of Conflict | Mastering Productive Conflict | 45-60 days |
| 🟣 **Purple Belt** | Lack of Commitment | Achieving Clarity & Buy-In | 45-60 days |
| 🟤 **Brown Belt** | Avoidance of Accountability | Holding Each Other Accountable | 60-90 days |
| ⚫ **Black Belt** | Inattention to Results | Focusing on Collective Outcomes | 60-90 days |

### Stripe System (Per Belt)
Each belt has **4 stripes** earned by:
- **Stripe 1:** Complete foundational lessons (theory + frameworks)
- **Stripe 2:** Complete practical application lessons (exercises + scenarios)
- **Stripe 3:** Complete integration lessons (real-world implementation)
- **Stripe 4:** Pass belt assessment + demonstrate mastery

**Total:** 20 modules (5 belts × 4 stripes each) + 5 belt assessments

---

## 📚 Existing Platform Structure

### Current Gamification System
- **XP Economy:** +25 XP per lesson, +100 XP module bonus
- **Achievement Popups:** 4-second auto-dismiss with slide-in animation
- **Progress Tracking:** localStorage persistence, progress bars, badge system
- **Module Format:** HTML files with ~3-4 lessons per module
- **Learning Hub:** Central dashboard with module cards, batches, stats

### Existing Modules (10 Total)
1. Energy Management (4 lessons, 200 XP)
2. Boundaries (4 lessons, 200 XP)
3. Deep Work (4 lessons, 200 XP)
4. Feedback (4 lessons, 200 XP)
5. Expectation Management (3 lessons, 175 XP)
6. Stoic Tools (3 lessons, 175 XP)
7. Limiting Beliefs (4 lessons, 200 XP)
8. Active Listening (3 lessons, 175 XP)
9. Empathy (3 lessons, 175 XP)
10. Coaching (3 lessons, 175 XP)

### Technical Stack
- Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)
- localStorage for data persistence
- PWA-ready (manifest.json, service worker)
- Cache-busting system (3-layer)
- Responsive design with gradients and animations

---

## 🎨 Design System

### Color Palette for Belts
```css
/* White Belt - Trust */
.belt-white { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); }

/* Blue Belt - Conflict */
.belt-blue { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }

/* Purple Belt - Commitment */
.belt-purple { background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); }

/* Brown Belt - Accountability */
.belt-brown { background: linear-gradient(135deg, #92400e 0%, #78350f 100%); }

/* Black Belt - Results */
.belt-black { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); }
```

### Stripe Badges
- 🥋 Stripe earned badge (shown on module cards)
- Progress bar shows 0/4, 1/4, 2/4, 3/4, 4/4 stripes
- Belt earned after 4th stripe + assessment

---

## 📋 Your Task: Generate 5 Dysfunction Belt Courses

For **each belt** (starting with White Belt), create:

### 1. **Belt Overview Document**
Include:
- Belt name and color
- Dysfunction being addressed
- Learning objectives (3-5 clear outcomes)
- Prerequisites (if any)
- Estimated time to complete
- Key concepts/frameworks covered

### 2. **4 Stripe Modules** (4 modules per belt)

Each module should contain **3-4 lessons** following this structure:

#### Stripe 1: Foundation (Theory Module)
**Example Lessons:**
- Lesson 1: Understanding [Core Concept]
- Lesson 2: The [Framework Name] Model
- Lesson 3: Signs of [Dysfunction] in Teams
- Lesson 4: Why [Dysfunction] Happens

#### Stripe 2: Application (Practice Module)
**Example Lessons:**
- Lesson 1: Practical Exercise: [Activity Name]
- Lesson 2: Scenario Analysis: [Real Situation]
- Lesson 3: Team Workshop: [Interactive Tool]
- Lesson 4: Daily Practices for [Skill]

#### Stripe 3: Integration (Implementation Module)
**Example Lessons:**
- Lesson 1: Implementing with Your Team
- Lesson 2: Overcoming Common Obstacles
- Lesson 3: Measuring Progress & Impact
- Lesson 4: Sustaining the Change

#### Stripe 4: Mastery (Advanced Module)
**Example Lessons:**
- Lesson 1: Advanced Techniques
- Lesson 2: Coaching Others in [Skill]
- Lesson 3: Cultural Integration
- Lesson 4: Preparing for Belt Assessment

### 3. **Belt Assessment**
Create a comprehensive assessment with:
- 10-15 scenario-based questions
- Reflective journaling prompts
- Practical demonstration task
- Peer feedback component (optional)
- Passing criteria (80%+ = belt earned)

### 4. **Content Requirements for Each Lesson**

Every lesson must include:

**✅ Content Structure:**
```html
<div class="lesson-card">
    <div class="lesson-header" onclick="toggleLesson('lesson1')">
        <div class="lesson-number">Lesson 1</div>
        <div class="lesson-title">[Compelling Title]</div>
        <div class="lesson-status" id="status1">Start</div>
    </div>
    <div class="lesson-body" id="lesson1">
        <!-- Content sections -->
        <div class="lesson-section">
            <h3>🎯 What You'll Learn</h3>
            <ul>
                <li>[Learning objective 1]</li>
                <li>[Learning objective 2]</li>
                <li>[Learning objective 3]</li>
            </ul>
        </div>

        <div class="lesson-section">
            <h3>📖 Core Concept</h3>
            <p>[2-3 paragraphs explaining main idea]</p>
        </div>

        <div class="lesson-section">
            <h3>🔍 Real-World Example</h3>
            <p>[Concrete story or scenario]</p>
        </div>

        <div class="lesson-section">
            <h3>💡 Key Takeaways</h3>
            <ul>
                <li>[Actionable insight 1]</li>
                <li>[Actionable insight 2]</li>
                <li>[Actionable insight 3]</li>
            </ul>
        </div>

        <div class="lesson-section">
            <h3>✨ Practice Exercise</h3>
            <p>[Specific action to take this week]</p>
        </div>

        <button class="btn btn-primary" onclick="completeLesson(1)">
            Mark Complete <span class="xp-badge">+25 XP</span>
        </button>
    </div>
</div>
```

**✅ Content Guidelines:**
- **Tone:** Conversational, practical, empowering
- **Length:** 300-600 words per lesson (concise but comprehensive)
- **Examples:** Real leadership scenarios, not generic
- **Exercises:** Specific, actionable, measurable
- **No fluff:** Every sentence must add value

---

## 🎯 White Belt: Absence of Trust (START HERE)

### Context from Lencioni's Work
**The Dysfunction:** Team members are reluctant to be vulnerable with one another and unwilling to admit mistakes, weaknesses, or needs for help.

**The Solution:** Vulnerability-based trust - team members must get comfortable being vulnerable with each other by exposing their weaknesses, mistakes, and fears.

### Your Task for White Belt

Generate:

1. **Belt Overview:** "White Belt: Building Vulnerability-Based Trust"
   - Include: Why trust is the foundation, common trust dysfunctions, outcomes of mastering trust

2. **Stripe 1 Module:** "Trust Foundations" (4 lessons)
   - Lesson titles and full content for each
   - Focus: Theory and understanding

3. **Stripe 2 Module:** "Practicing Vulnerability" (4 lessons)
   - Lesson titles and full content for each
   - Focus: Exercises and scenarios

4. **Stripe 3 Module:** "Building Team Trust" (4 lessons)
   - Lesson titles and full content for each
   - Focus: Implementation with teams

5. **Stripe 4 Module:** "Trust Mastery" (4 lessons)
   - Lesson titles and full content for each
   - Focus: Advanced techniques and coaching

6. **White Belt Assessment:**
   - 10 scenario questions
   - 3 reflective prompts
   - 1 practical demonstration task
   - Scoring rubric

---

## 📊 Output Format

For each module, provide:

```markdown
## [Belt Color] Belt - Stripe [#]: [Module Name]

**localStorage Key:** `[beltName]Stripe[#]Completed`
**XP Key:** `[beltName]Stripe[#]ModuleXP`
**Total Lessons:** [3-4]
**Max XP:** [175-200]
**Gradient:** [CSS color code]

---

### Lesson 1: [Title]

**🎯 What You'll Learn**
- [Objective 1]
- [Objective 2]
- [Objective 3]

**📖 Core Concept**
[2-3 paragraphs]

**🔍 Real-World Example**
[Scenario]

**💡 Key Takeaways**
- [Insight 1]
- [Insight 2]
- [Insight 3]

**✨ Practice Exercise**
[Specific action]

---

[Repeat for Lessons 2-4]
```

---

## 🔧 Technical Integration Notes

After you generate the content, I will:
1. Create HTML files using existing template structure
2. Add belt/stripe tracking to learning hub
3. Implement belt progression UI (visual belt display)
4. Create assessment functionality
5. Update service worker to cache new modules
6. Deploy to Netlify

---

## 📚 Resources You Can Use

Feel free to reference:
- Patrick Lencioni's "The Five Dysfunctions of a Team"
- Leadership best practices from modern organizations
- Team psychology research
- Agile/Scrum team dynamics
- Psychological safety frameworks (Amy Edmondson)
- Trust-building exercises from organizational development

---

## 🚀 Let's Start!

**Please generate the complete White Belt course (all 4 stripes + assessment) following the structure above.**

After White Belt is complete and I confirm it's good, we'll move to Blue Belt (Fear of Conflict), then Purple (Commitment), Brown (Accountability), and finally Black (Results).

Focus on:
✅ Practical, actionable content
✅ Real leadership scenarios
✅ Clear progression from theory → practice → mastery
✅ Engaging, conversational tone
✅ Measurable outcomes

Let's build something transformative! 🥋
