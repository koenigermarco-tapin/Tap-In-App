# TAP-IN V11 STRUCTURE & COVERAGE AUDIT

**Date:** December 9, 2025  
**Scope:** Repository structure, EN/DE parity, games/tools/assessments overview, irregularities, and recommended re-organization.

---

## Snapshot
- Files scanned: 584 total (494 HTML, 70 JS, 3 JSON, 3 MD, misc assets).
- Bilingual pairs: 209 EN/DE page pairs; 31 DE-only pages; 45 EN-only pages.
- Games: 12 concepts, fully paired (24 pages).
- Modules: 21 concepts; 7 lack DE counterparts (`boundaries`, `deep-work`, `energy-management`, `expectation-management`, `feedback`, `limiting-beliefs`, `stoic-tools`).
- Assessments: 36 concepts; DE gaps for several belt assessments/exams and work-life-balance.
- Belt coverage: White/Blue largely paired; Purple missing `purple-belt-exam-de`, `purple-belt-shark-tank-de`; Brown missing ceremony/exam/shark-tank DE; Black missing ceremony/exam/shark-tank DE; some EN-only stripe pages exist.

---

## Language Coverage Gaps (need counterparts)
**DE-only (needs EN):**
- achievements.de, black-belt-assessment.de, black-belt.de, blue-belt-assessment.de, blue-belt.de, boundaries-module.de, brown-belt-assessment.de, brown-belt.de, combined-complete-profile.de, combined-leadership-profile(-v2).de, combined-profile-carousel.de, deep-work-module.de, energy-management-module.de, expectation-management-module.de, feedback-module.de, gym-dashboard.de, leadership-style-assessment.de, leadership-style-carousel.de, learning-hub.de, limiting-beliefs-module.de, mental-health-assessment.de, purple-belt-assessment.de, purple-belt.de, stoic-tools-module.de, team-assessment-enhanced-v2.de, white-belt-assessment.de, white-belt.de, work-life-balance-assessment.de, work-life-balance-carousel.de, worker-type-assessment.de.

**EN-only (needs DE):**
- achievements, black-belt-assessment/ceremony/exam/shark-tank/stripe1/2/3, blue-belt-assessment/shark-tank, boundaries-module, brown-belt-assessment/ceremony/exam/shark-tank(-template), combined-complete-profile(_de), combined-leadership-profile(_de/-v2_de), combined-profile-carousel(_de), daily-challenge, deep-work-module, dna-view, energy-management-module, expectation-management-module, feedback-module, gym-focused-old, hub-focused-minimal, limiting-beliefs-module, purple-belt-assessment/exam/shark-tank, research-lab, stoic-tools-module, stripe-results, test-team-data, white-belt-assessment/shark-tank, work-life-balance-carousel(_de), work-life-balance-assessment_de, xp-gate.

Naming inconsistencies to normalize: mixed `-de.html` vs `.de.html`, stray `_de` suffixes (`combined-complete-profile_de.html`, `combined-leadership-profile-v2_de.html`, `combined-profile-carousel_de.html`, `work-life-balance-carousel_de.html`, `work-life-balance-assessment_de.html`).

---

## Irregularities / Risks
- **Duplicate JS locations:** 59 scripts exist both at repo root and under `js/` (e.g., `analytics.js`, `auth-system.js`). Maintainers can’t tell which is canonical—risks drift.
- **Empty or stub JS:** `js/wisdom-tracker.js` (0 lines), `js/hub-unlock-system.js` (0), `js/comparison-tool.js` (2). If referenced, they fail silently.
- **Asset hygiene:** `images/` is empty; `icons/` contains placeholder PNGs (`icon-192.png.placeholder`, `icon-512.png.placeholder`).
- **Legacy/likely-not-in-use pages:** `gym-focused-old.html`, `hub-focused-minimal.html`, `brown-belt-shark-tank-template.html`, `xp-gate.html`, `research-lab.html`, `stripe-results.html`, `test-team-data.html`, `dna-view.html`, `daily-challenge.html`—validate before keeping.
- **Belt DE gaps:** No DE ceremony/exam/shark-tank for Brown/Black; Purple missing DE exam/shark-tank; White/Blue complete.
- **Module DE gaps:** Missing DE for `limiting-beliefs`, `stoic-tools`, and base versions of `boundaries`, `deep-work`, `energy-management`, `expectation-management`, `feedback`.
- **Assessment DE gaps:** Belt assessments/exams (Black/Brown/Blue/Purple/White) and `work-life-balance` lack DE.

---

## Proposed Folder Structure (non-breaking plan)
Organize by language → domain → type to make related modules discoverable:
```
/pages/
  /en/
    /belt/{white,blue,purple,brown,black}/{core,ceremony,exam,shark-tank,stripes}
    /modules/{deep-work,energy-management,expectation-management,feedback,...}
    /assessments/{communication-style,leadership-style,work-life-balance,...}
    /games/{accountability-arena,trust-builder,conflict-navigator,...}
    /tools/{journal,goal-tracker,mood-tracker,...}
    /hub/{dashboard,business-portal,recruiter,...}
  /de/ (mirror same structure)
/shared/
  /css (design-system-unified.css, variables.css, etc.)
  /js  (single canonical copies; remove root duplicates)
  /assets/{icons,images}
/archive/ (legacy: gym-focused-old.html, hub-focused-minimal.html, brown-belt-shark-tank-template.html, xp-gate.html, research-lab.html, stripe-results.html, test-team-data.html, dna-view.html, daily-challenge.html)
```
Migration steps: pick one naming convention (`name.en.html` / `name.de.html` recommended), move HTML into `/pages/<lang>/...`, update relative asset/script links once, delete or archive duplicated JS at repo root after confirming references.

---

## What Needs Updating Now
- Add missing counterparts (priority): belt DE ceremonies/exams/shark-tanks (Black, Brown, Purple), belt assessments (DE for White/Blue/Purple/Brown/Black), `work-life-balance` DE/EN alignment, module DEs (`limiting-beliefs`, `stoic-tools`, base module shells listed above).
- Normalize filenames using one convention and fix `_de` variants.
- Decide canonical JS location, remove duplicates, implement empty stubs (`wisdom-tracker`, `hub-unlock-system`, `comparison-tool`).
- Replace placeholder icons and populate `images/` or remove if unused.
- Verify and either archive or relink legacy pages called out above.

---

## Quick Category Status
- Games: ✅ 12/12 paired (EN/DE) including v2 variants (conflict-navigator, trust-builder, accountability-arena).
- Tools: ⚠️ Some v2 present, but naming inconsistent (some `tool-*` vs generic names); ensure both languages exist per tool.
- Assessments/Questionnaires: ⚠️ 36 concepts; DE gaps for belt paths and work-life-balance; cross-check `leadership-style` and `team-assessment-enhanced-v2`.
- Belt path: ⚠️ DE gaps for Brown/Black ceremonies/exams/shark-tanks; Purple missing DE exam/shark-tank; EN has some stripe-only pages without DE.

---

## Recommended Next Steps
1) Freeze root-level JS and consolidate into `/shared/js`; update HTML includes.  
2) Standardize file naming to `name.en.html` / `name.de.html`; rename `_de` and `.de.html` variants.  
3) Fill DE gaps: belt ceremonies/exams/shark-tanks (Brown/Black/Purple), belt assessments (all colors), work-life-balance, limiting-beliefs/stoic-tools/modules.  
4) Move HTML into `/pages/<lang>/...` structure; adjust links once.  
5) Archive or delete flagged legacy pages after confirming no inbound links.  
6) Replace placeholder icons and clean empty `images/` or populate with actual assets.

---

*Prepared for repository re-organization and localization parity work.*

