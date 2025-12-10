# Assessment Files Revamp Audit

**Date:** December 10, 2025  
**Purpose:** Identify and revamp old assessment files with white backgrounds, repetitive patterns, and minimal gamification

---

## Files Requiring Complete Revamp (White Backgrounds)

### Critical Priority:
1. **belt-assessment-v2.html** - White card background, old design, needs dark theme + gamification
2. **white-belt-assessment.html** - White background, old design pattern
3. **mission-statement-assessment.html** - White background, old design
4. **accountability-audit-assessment.html** - White background, old design

### Revamp Requirements:
- ✅ Remove white backgrounds → Dark theme (`--black`, `--dark-grey`, `--mid-grey`)
- ✅ Add gamification (XP bar, achievements, celebrations)
- ✅ Replace emojis with Heroicons
- ✅ Add educational insights after questions
- ✅ Modern UI matching `deep-dive-assessment.html` style
- ✅ Progress tracking with visual feedback
- ✅ Toast notifications for XP/achievements

---

## Files Needing Emoji → Heroicon Replacement

### Dark Theme Already (Just Need Icon Updates):
1. **worker-type-assessment.html** - Uses emojis (🎯, ⚡, 🏃, etc.)
2. **mental-health-assessment.html** - Uses emojis (😫, 😴, ⚡, etc.)
3. **values-discovery-assessment.html** - Uses emojis (🎯, 🤝, 📈, etc.)
4. **decision-making-assessment.html** - Uses emojis (⚡, 🔍, 🤝, 💭)
5. **communication-style-assessment.html** - Uses emojis (🎯, 📊, ✨, 🤝)
6. **life-audit-assessment.html** - Uses emojis (needs check)
7. **leadership-style-assessment.html** - Uses emojis (🎯, 🌱, 🤝, 🚀)
8. **360-feedback-assessment.html** - Uses emojis (🎯, 🤝, 💬, 🧠)

### Replacement Strategy:
- Map emojis to appropriate Heroicons
- Maintain semantic meaning
- Use SVG icons inline or via icon system
- Ensure accessibility (aria-labels)

---

## Implementation Order

### Phase 1: Critical White Background Revamps
1. belt-assessment-v2.html
2. white-belt-assessment.html
3. mission-statement-assessment.html
4. accountability-audit-assessment.html

### Phase 2: Emoji → Heroicon Replacement
1. worker-type-assessment.html
2. mental-health-assessment.html
3. values-discovery-assessment.html
4. decision-making-assessment.html
5. communication-style-assessment.html
6. life-audit-assessment.html
7. leadership-style-assessment.html
8. 360-feedback-assessment.html

---

## Design System Reference

**Colors:**
- `--black: #0d0d14`
- `--dark-grey: #1a1a24`
- `--mid-grey: #2a2a3a`
- `--light-grey: #8a8a9a`
- `--white: #ffffff`
- `--green: #10b981`
- `--gold: #fbbf24`
- `--blue: #3b82f6`
- `--purple: #8b5cf6`

**Reference File:** `deep-dive-assessment.html` (modern, dark, gamified)

---

## Status

- [ ] Phase 1 Complete
- [ ] Phase 2 Complete
- [ ] All files tested
- [ ] German versions updated

