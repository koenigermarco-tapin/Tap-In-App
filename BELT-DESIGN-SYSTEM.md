# TAP-IN Belt Design System
## Comprehensive Style Guide for Purple, Brown, and Black Belt Courses

**Version**: 2.0  
**Date**: November 25, 2025  
**Status**: Production Ready  
**For**: Claude AI agents creating Purple, Brown, and Black Belt course content

---

## 🎯 Design Philosophy

**Keep it minimal, professional, and consistent.**
- Use colors sparingly to avoid overwhelming the eye
- Maintain professional appearance
- Each belt level has subtle background tint in its belt color (light opacity)
- Core colors: Navy, Red, Purple (accents only)
- Content-driven color exceptions allowed (frameworks, quadrants)

---

## 🎨 Core Color Palette

### Primary Colors (All Belts)
```css
:root {
    /* Navy - Primary brand color */
    --primary-navy: #1a365d;
    --secondary-navy: #334155;
    
    /* Red - Progress & Energy */
    --accent-red: #b91c1c;
    --red-gradient: linear-gradient(90deg, #b91c1c 0%, #dc2626 100%);
    
    /* Purple - BJJ theme accents */
    --accent-purple: #a78bfa;
    --purple-gradient: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%);
    
    /* Neutrals */
    --text-dark: #1e293b;
    --text-muted: #64748b;
    --border-light: #e2e8f0;
    --light-bg: #f8fafc;
    --card-bg: #ffffff;
    
    /* Status Colors */
    --success-green: #38a169;
    --warning-orange: #dd6b20;
}
```

### Belt-Specific Background Tints

Each belt gets a subtle background opacity overlay in its color:

**White Belt** (⚪):
```css
body {
    background: linear-gradient(135deg, #1a365d 0%, #7c3aed 100%);
    /* Navy to Purple - represents foundation to mastery journey */
}
```

**Blue Belt** (💙):
```css
body {
    background: linear-gradient(135deg, #1a365d 0%, #7c3aed 100%);
    /* Same as White - communication skills */
}
```

**Purple Belt** (🟣):
```css
body {
    background: linear-gradient(135deg, #581c87 0%, #7c3aed 100%);
    /* Deeper purple gradient - team alignment focus */
}
```

**Brown Belt** (🟤):
```css
body {
    background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
    /* Brown gradient - systems & strategy */
}
```

**Black Belt** (⬛):
```css
body {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    /* Dark gradient - mastery level */
}
```

---

## 📐 Component Library

### 1. Standard Info Box (Light)
**Usage**: Default for most explanatory content  
**When**: Educational content, research citations, standard explanations

```css
.intro-box {
    background: #f7fafc;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.intro-box h3 { 
    color: var(--primary-navy); 
    font-size: 1.1rem; 
    margin-bottom: 0.75rem; 
    font-weight: 600;
}

.intro-box p { 
    color: var(--text-dark); 
    font-size: 0.95rem; 
    margin-bottom: 0.75rem; 
    line-height: 1.7; 
}

.intro-box strong { color: var(--primary-navy); }
```

### 2. Philosophy Box (Light Navy Theme) - DEFAULT
**Usage**: BJJ principles, leadership wisdom, foundational concepts  
**When**: 90% of philosophy/principle content  
**Color**: Light background, navy border, easy to read

```css
.intro-box.philosophy {
    background: linear-gradient(135deg, var(--light-bg) 0%, #e2e8f0 100%);
    border-left: 6px solid var(--primary-navy);
}

.intro-box.philosophy h3 { color: var(--primary-navy); }
.intro-box.philosophy p { color: var(--text-dark); }
.intro-box.philosophy strong { color: var(--primary-navy); }
.intro-box.philosophy em { color: var(--accent-purple); }
```

**Example**:
```html
<div class="intro-box philosophy">
    <h3>🥋 The BJJ Principle: Position Before Submission</h3>
    <p>In Jiu-Jitsu, you <strong>secure position</strong> before attempting a finish. The same applies to leadership—build trust before pushing change.</p>
    <p><em>"The goal is not to be better than the other man, but to be better than your former self."</em> — Rickson Gracie</p>
</div>
```

### 3. Black Belt Wisdom Box (Dark) - SPARINGLY
**Usage**: ONLY for profound "captain obvious" truths and Black Belt-level wisdom  
**When**: 5-10% of content, maximum 1-2 per course  
**Purpose**: Create impact through contrast and rarity

```css
.intro-box.black-belt-wisdom {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border-left: 6px solid var(--accent-red);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.intro-box.black-belt-wisdom h3 { color: #ffffff; font-weight: 700; }
.intro-box.black-belt-wisdom p { color: #e2e8f0; }
.intro-box.black-belt-wisdom strong { color: #ffffff; }
.intro-box.black-belt-wisdom em { color: var(--accent-purple); }
```

**Example**:
```html
<div class="intro-box black-belt-wisdom">
    <h3>⬛ Black Belt Wisdom</h3>
    <p><em>"The belt only covers two inches of your ass. You have to cover the rest."</em> — Royce Gracie</p>
    <p><strong>Translation:</strong> A title means nothing without the work to back it up.</p>
</div>
```

### 4. Research Box (Navy Gradient)
**Usage**: Academic citations, study findings, credibility-building content  
**When**: Referencing Harvard, Google, Amy Edmondson, etc.

```css
.intro-box.research {
    background: linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-navy) 100%);
    border: none;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.intro-box.research h3 { color: #ffffff; font-weight: 600; }
.intro-box.research p { color: #e2e8f0; line-height: 1.7; }
.intro-box.research strong { color: var(--accent-purple); }
```

**Example**:
```html
<div class="intro-box research">
    <h3>📊 The Research</h3>
    <p><strong>Google's Project Aristotle</strong> found that psychological safety—not IQ or seniority—was the #1 predictor of high-performing teams.</p>
</div>
```

### 5. Warning/Uncomfortable Box (Amber)
**Usage**: "This will be uncomfortable" warnings, cautions, reality checks  
**When**: Setting expectations before difficult exercises

```css
.intro-box.warning {
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    border-left: 6px solid var(--warning-orange);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.intro-box.warning h3 { color: #92400e; font-weight: 600; }
.intro-box.warning p { color: #78350f; }
```

### 6. Dark Navy Section (Visual Variety)
**Usage**: Break up long light sections, add depth  
**When**: Every 3-4 sections for rhythm

```css
.dark-section {
    background: linear-gradient(135deg, var(--secondary-navy) 0%, var(--text-dark) 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.dark-section h3 { color: #ffffff; }
.dark-section p { color: #e2e8f0; }
.dark-section strong { color: var(--accent-red); }
```

### 7. Reflection Box (Yellow/Amber)
**Usage**: User prompts, questions, journaling exercises  
**When**: Asking user to write or think

```css
.reflection-box {
    background: #fffbeb;
    border: 2px solid #fcd34d;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
}

.reflection-box h3 { color: #92400e; font-size: 1rem; margin-bottom: 0.75rem; }
.reflection-box p { color: #78350f; font-size: 0.95rem; margin-bottom: 1rem; }

.reflection-textarea {
    width: 100%;
    min-height: 100px;
    padding: 1rem;
    border: 1px solid #fcd34d;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.95rem;
    resize: vertical;
    background: white;
}
```

### 8. Practice Card (Green)
**Usage**: Actionable steps, exercises, practice challenges  
**When**: "Try this" or "Do this" content

```css
.practice-card {
    background: #f0fdf4;
    border: 2px solid #86efac;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
}

.practice-card h4 { color: #166534; font-size: 1rem; margin-bottom: 0.5rem; }
.practice-card p { color: #14532d; font-size: 0.9rem; }
```

### 9. Insight Card (Light Blue)
**Usage**: Key takeaways, "aha" moments, important realizations  
**When**: Highlighting crucial insights

```css
.insight-card {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border: 1px solid #93c5fd;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
}

.insight-icon { font-size: 2rem; margin-bottom: 0.75rem; }
.insight-title { 
    font-size: 1.1rem; 
    font-weight: 700; 
    color: var(--primary-navy); 
    margin-bottom: 0.75rem; 
}
.insight-content { color: var(--text-dark); font-size: 0.95rem; line-height: 1.7; }
```

---

## 🎮 Gamification Elements

### Progress Bar (Red Gradient)
```css
.progress-container {
    background: rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 1rem 1.5rem;
    margin-bottom: 2rem;
}

.progress-bar {
    background: rgba(255,255,255,0.3);
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-red) 0%, #dc2626 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
}
```

### XP/Points Display
```css
.xp-badge {
    background: linear-gradient(90deg, var(--accent-red) 0%, #dc2626 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.9rem;
}
```

### Stripe Earned (Success)
```css
.stripe-earned {
    background: linear-gradient(135deg, var(--primary-navy) 0%, #7c3aed 100%);
    border-radius: 16px;
    padding: 2rem;
    color: white;
    text-align: center;
    margin-bottom: 1.5rem;
}

.stripe-earned h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
.stripe-visual { font-size: 3rem; margin: 1rem 0; }
```

---

## 🔘 Buttons

### Primary Button (Navy)
```css
.btn {
    padding: 1rem 2rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    border: none;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-navy) 100%);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(26, 54, 93, 0.3);
}
```

### Secondary Button
```css
.btn-secondary { 
    background: #edf2f7; 
    color: var(--text-dark); 
}

.btn-secondary:hover { 
    background: #e2e8f0; 
}
```

### Success Button (Green)
```css
.btn-success {
    background: linear-gradient(135deg, var(--success-green) 0%, #2f855a 100%);
    color: white;
}

.btn-success:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(56, 161, 105, 0.3);
}
```

---

## 📱 Responsive Design

### Mobile Breakpoint
```css
@media (max-width: 768px) {
    body { padding: 1rem; }
    .main-card { padding: 1.5rem; }
    .header h1 { font-size: 1.75rem; }
    .nav-buttons { flex-direction: column; }
    .btn { width: 100%; text-align: center; }
}
```

### Font Sizing (Use clamp for scalability)
```css
h1 { font-size: clamp(1.75rem, 5vw, 2rem); }
h2 { font-size: clamp(1.25rem, 3.5vw, 1.5rem); }
p { font-size: clamp(0.95rem, 2.5vw, 1rem); }
```

---

## ✍️ Typography

```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
}

h1, h2, h3, h4 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.75rem;
}

.section-title { 
    font-size: 1.5rem; 
    font-weight: 700; 
    color: var(--text-dark); 
    margin-bottom: 1rem; 
}

.section-subtitle { 
    color: var(--text-muted); 
    margin-bottom: 1.5rem; 
    font-size: 1rem; 
}
```

---

## 🎯 Usage Rules

### Component Selection Guide

| Content Type | Component | Why |
|--------------|-----------|-----|
| BJJ Principle | `.intro-box.philosophy` (light) | Default, readable, consistent |
| Profound Truth | `.intro-box.black-belt-wisdom` (dark) | RARE, maximum impact |
| Research/Study | `.intro-box.research` | Credibility, authority |
| Warning | `.intro-box.warning` | Caution, expectation-setting |
| User Prompt | `.reflection-box` | Encourages writing/thinking |
| Action Item | `.practice-card` | Clear "do this" signal |
| Key Insight | `.insight-card` | Highlight important points |
| Visual Break | `.dark-section` | Rhythm, not monotony |

### Color Mixing Guidelines

**DO**:
- Use navy as primary throughout
- Red for progress/energy elements only
- Purple for quotes and special emphasis (sparingly)
- Keep backgrounds light (white/light gray) for readability
- Use 1-2 dark boxes per course max

**DON'T**:
- Mix too many colors in one section
- Use bright colors for large backgrounds
- Overuse dark boxes (causes eye strain)
- Use gold/yellow except for warnings
- Deviate from navy/red/purple palette without reason

---

## 📋 Pre-Flight Checklist

Before submitting any belt course, verify:

- [ ] Body background uses correct belt-specific gradient
- [ ] Progress bars use red gradient (`#b91c1c to #dc2626`)
- [ ] Primary buttons use navy gradient (`#1a365d to #334155`)
- [ ] Philosophy boxes are LIGHT (not dark) by default
- [ ] Black Belt Wisdom boxes used sparingly (1-2 max)
- [ ] Purple accents used only for quotes/emphasis
- [ ] All text meets WCAG AA contrast (4.5:1 minimum)
- [ ] Mobile responsive at 768px breakpoint
- [ ] Consistent spacing scale (1rem, 1.5rem, 2rem, 2.5rem)
- [ ] Box shadows standardized (3 levels max)
- [ ] Font weights: 400 (regular), 600 (semi-bold), 700 (bold)

---

## 🏗️ Implementation Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Belt Color] Belt Stripe [X]: [Topic] | TAP-IN</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --primary-navy: #1a365d;
            --secondary-navy: #334155;
            --accent-red: #b91c1c;
            --accent-purple: #a78bfa;
            --success-green: #38a169;
            --warning-orange: #dd6b20;
            --card-bg: #ffffff;
            --border-light: #e2e8f0;
            --text-dark: #1e293b;
            --text-muted: #64748b;
            --light-bg: #f8fafc;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            /* CHANGE THIS BASED ON BELT LEVEL */
            background: linear-gradient(135deg, #1a365d 0%, #7c3aed 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
            line-height: 1.6;
        }
        
        /* Copy all component styles from this guide */
    </style>
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

---

## 🎨 Belt-Specific Customizations

### Purple Belt (🟣)
```css
body {
    background: linear-gradient(135deg, #581c87 0%, #7c3aed 100%);
}
```
- Focus: Team alignment, shared goals, collective accountability
- Tone: Collaborative, strategic
- Content: More emphasis on group dynamics

### Brown Belt (🟤)
```css
body {
    background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
}
```
- Focus: Systems thinking, organizational design, scalability
- Tone: Strategic, analytical
- Content: Frameworks, models, systems

### Black Belt (⬛)
```css
body {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

/* Black Belt gets special header treatment */
.header {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
}
```
- Focus: Mastery, integration, teaching others
- Tone: Profound, reflective, mature
- Content: More Black Belt Wisdom boxes allowed (3-4)

---

## 💡 Examples from Blue Belt

### Good Example: Standard Philosophy Box
```html
<div class="intro-box philosophy">
    <h3>🥋 The BJJ Principle: Timing Over Force</h3>
    <p>A smaller opponent can <strong>submit a larger one</strong> through perfect timing. Leadership works the same way—know when to push and when to wait.</p>
</div>
```

### Good Example: Research Box
```html
<div class="intro-box research">
    <h3>📊 The Research</h3>
    <p><strong>Kim Scott's Radical Candor</strong> framework shows that the most effective leaders care personally AND challenge directly. One without the other fails.</p>
</div>
```

### Good Example: Black Belt Wisdom (Use Sparingly)
```html
<div class="intro-box black-belt-wisdom">
    <h3>⬛ Black Belt Wisdom</h3>
    <p><em>"Discipline equals freedom."</em> — Jocko Willink</p>
    <p><strong>The paradox:</strong> The more structure you create, the more freedom you enable.</p>
</div>
```

---

## 🚫 Common Mistakes to Avoid

1. **Using dark philosophy boxes as default** → Use light boxes instead
2. **Overusing Black Belt Wisdom boxes** → Reserve for profound moments
3. **Mixing too many colors** → Stick to navy/red/purple palette
4. **Forgetting belt-specific background** → Each belt should feel distinct
5. **Poor contrast on dark backgrounds** → Always test readability
6. **Inconsistent button styles** → All primary buttons should be navy
7. **Progress bars in wrong color** → Should always be red gradient
8. **Skipping mobile responsive** → Test at 768px breakpoint

---

## 📚 Reference Files

Check these files for working examples:
- `blue-belt-stripe1-gamified.html` - Difficult conversations
- `blue-belt-stripe2-gamified.html` - Active listening
- `blue-belt-stripe3-gamified.html` - Feedback systems
- `blue-belt-stripe4-gamified.html` - Boundaries
- `worker-type-assessment.html` - Assessment design pattern

---

## ✅ Final Notes

**Remember**:
- Consistency > Creativity
- Readability > Aesthetics
- Professional > Flashy
- Minimal color mixing keeps it clean
- Each belt should feel slightly different via background gradient
- The content is the hero, design supports it

**When in doubt**: Use the light philosophy box, navy buttons, and red progress bars.

---

**Version History**:
- v2.0 (Nov 25, 2025): Added belt-specific backgrounds, purple accents, minimized color mixing
- v1.0 (Nov 24, 2025): Initial Blue Belt design system

**Maintained by**: TAP-IN Design Team  
**Questions?**: Refer to `BLUE-BELT-DESIGN-FEEDBACK.md` for additional context
