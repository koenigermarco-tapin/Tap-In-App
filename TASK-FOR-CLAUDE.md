# Task: Create Enhanced Belt Assessment (V2 or improve V1)

## Context
We're building a comprehensive belt assessment that determines a user's starting belt (White or Blue max). The current `belt-assessment.html` has 40 identical 5-point scale questions which is boring and lacks educational value.

## Your Mission
Using the EXACT styles and patterns from our approved assessments, create an engaging belt assessment that:

1. **Reuses existing White Belt content** (don't reinvent the wheel)
2. **Adds educational value** through insight cards (like worker-type-assessment.html)
3. **Mixes question types** (not 40 scales in a row)
4. **Stays professional** (not overly colorful or gamey)

## Files to Study (COPY THESE PATTERNS EXACTLY)

### Primary Reference: `worker-type-assessment.html`
- **Intro section design** (lines 149-176): Clean explanation box with "Begin Assessment" button
- **Question structure** (lines 520-560): Shows insight cards BEFORE each question (starting from Q2)
- **Insight cards** (lines 74-81): Navy border, research-backed content, quotes
- **Results with flip cards** (lines 600-800): Detailed breakdown

### Content Sources to Recycle:
1. **Worker type questions** from `worker-type-assessment.html` (lines 226-424)
   - 12 questions about work rhythm (Sprinter/Jogger/Ultrarunner)
   - Already has 12 matching insight cards with research

2. **Mental health baseline** from `mental-health-assessment.html`
   - Energy levels, stress patterns, sleep quality
   - Need 6-8 questions

3. **Trust questions** from current `belt-assessment.html`
   - Vulnerability, admitting mistakes, asking for help
   - Need 6-8 questions (best ones from the 40)

4. **Conflict questions** from current `belt-assessment.html`
   - Productive disagreement, challenging ideas
   - Need 4-6 questions (best ones)

## Design Requirements

### Color Scheme (NAVY/BLUISH - NOT COLORFUL)
```css
/* Use these exact colors */
Primary: #1a365d (navy)
Background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)
Accent: #b91c1c (brick red for philosophy box)
Card backgrounds: white
Borders: #e2e8f0

/* DO NOT USE rainbow colors in scale questions */
/* Simple white backgrounds with navy borders only */
```

### Philosophy Box (MUST BE DARK)
```css
.intro-box.philosophy { 
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); 
    border-left: 6px solid #b91c1c;
    color: white; /* WHITE TEXT */
}
```

### Question Flow Structure
```
INTRO SCREEN
├── Why This Assessment? (standard intro-box)
├── Belt Philosophy (DARK box with white text)
├── What to Expect (standard intro-box)
└── Begin Assessment button (large, centered)

QUESTION FLOW (25-30 questions total)
├── Section 1: Worker Type (6-8 questions)
│   ├── Insight card before Q2, Q4, Q6, Q8
│   └── Use exact questions from worker-type-assessment.html
├── Section 2: Energy & Mental Health (6-8 questions)
│   ├── Insight card before each question
│   └── Mix scales and multiple choice
├── Section 3: Trust Foundation (6-8 questions)
│   ├── Insight cards with Lencioni research
│   └── Mostly scales (1-5)
└── Section 4: Conflict Skills (4-6 questions)
    ├── Insight cards with research
    └── Mix of scales and scenarios

RESULTS SCREEN
├── Belt recommendation (CAP AT BLUE)
├── Worker type result
├── Flip cards with details
└── Training path link
```

### Insight Card Pattern (FROM WORKER ASSESSMENT)
```javascript
// Show insight BEFORE questions (starting from Q2)
if (currentQuestion >= 1) {
    const insight = insights[currentQuestion - 1];
    html += `
        <div class="insight-card">
            <div class="insight-icon">${insight.icon}</div>
            <div class="insight-title">${insight.title}</div>
            <div class="insight-content">${insight.content}</div>
            <div class="insight-quote">${insight.quote}</div>
        </div>
    `;
}
```

## Content to Copy Directly

### Worker Type Questions (USE EXACTLY AS-IS)
From `worker-type-assessment.html` lines 226-424, copy all 12 questions:
1. "I prefer working on projects that have:"
2. "My ideal work schedule looks like:"
3. "When facing a challenge, I:"
... (etc - copy all 12)

### Worker Type Insights (USE EXACTLY AS-IS)
From `worker-type-assessment.html` lines 225-416, copy all 12 insights with research:
- Time Horizons Shape Decisions (Harvard)
- Your Chronotype Matters (Neuroscience)
- Challenge Response Patterns (Stanford)
... (etc - copy all 12)

## What NOT to Do
❌ Don't create 40 identical scale questions
❌ Don't use rainbow/colorful gradients in scales
❌ Don't make up new worker type questions (reuse existing)
❌ Don't skip the insight cards (they provide educational value)
❌ Don't make philosophy box light colored (MUST BE DARK)
❌ Don't recommend Purple/Brown/Black belt (cap at Blue)

## What TO Do
✅ Copy worker-type-assessment.html structure exactly
✅ Reuse all 12 worker questions + insights
✅ Add 6-8 mental health/energy questions
✅ Add 6-8 trust questions (best from existing 40)
✅ Add 4-6 conflict questions (best from existing 40)
✅ Make philosophy box dark with white text
✅ Style "Begin Assessment" button large and prominent
✅ Cap belt recommendation at Blue (exceptional = "quick route to Purple possible")

## Expected Deliverable
A single HTML file (`belt-assessment-v2.html` OR improved `belt-assessment.html`) that:
- Has 25-30 total questions (not 40)
- Shows insight cards before questions (educational value)
- Mixes question types (worker, energy, trust, conflict)
- Uses clean navy/bluish design (not rainbow)
- Recommends White or Blue belt max
- Feels professional and valuable (not a boring survey)

## Testing Checklist
- [ ] Philosophy box is dark (#1a1a1a background) with white text
- [ ] Begin Assessment button is large and centered
- [ ] Scale questions are simple (white bg, navy border - not colorful)
- [ ] Insight cards appear before questions starting from Q2
- [ ] Worker type questions are copied exactly (not rewritten)
- [ ] Results cap at Blue Belt
- [ ] Total questions = 25-30 (not 40)
- [ ] Educational value is clear throughout

## Questions for Marco
1. Should we create V2 or just improve the existing belt-assessment.html?
2. Do you want gamification (stripe unlocking during assessment)?
3. Should we show section progress differently?

---
**Priority:** Make it valuable and engaging, not just a data collection survey.
**Timeline:** Small batches - get each section approved before moving to next.
