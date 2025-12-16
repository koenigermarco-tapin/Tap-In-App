# Adding New Content to TAP-IN

## Quick Guide

### Adding a New Assessment

1. Create HTML file in `src/pages/assessments/`
2. Include core modules in `<head>`:
   ```html
   <script src="/js/core/dom.js" type="module"></script>
   <script src="/js/core/progress.js" type="module"></script>
   <script src="/js/core/results.js" type="module"></script>
   ```
3. Use `updateProgress()` from `progress.js`
4. Use `showResults()` from `results.js`
5. Add German version: `*-de.html`

### Adding a New Course Module

1. Create HTML file in `src/pages/courses/`
2. Include core modules
3. Use `completeLesson()` from `lessons.js`
4. Follow existing module structure

### Adding a New Game

1. Create HTML file in `src/pages/games/`
2. Include core modules
3. Use shared utilities

## Best Practices

1. **Use CSS Variables**: Always use `var(--tap-blue)` instead of `#4a7c9c`
2. **Use Shared Functions**: Import from `js/core/` instead of duplicating
3. **Add ARIA Labels**: All buttons need `aria-label`
4. **Safe DOM**: Use `safeSetInnerHTML()` instead of `.innerHTML =`
5. **Mobile First**: Test on mobile devices
6. **Bilingual**: Create `-de.html` version for German

## File Naming

- Assessments: `*-assessment.html` / `*-assessment-de.html`
- Courses: `*-module.html` / `*-module-de.html`
- Games: `*-game.html` / `*-game-de.html`
- Tools: `tool-*.html` / `tool-*-de.html`

## Linking

Always use absolute paths from root:
- `/src/pages/assessments/belt-assessment.html`
- `/src/pages/courses/communication-mastery-module.html`
- `/src/pages/games/confession-poker.html`

