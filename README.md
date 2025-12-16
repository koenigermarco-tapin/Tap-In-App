# TAP-IN Leadership Academy

A martial arts-inspired leadership development platform combining BJJ belt progression with practical team dynamics training.

## Quick Start

1. Open `index.html` in a browser, or
2. Run a local server: `npx serve .`

## Project Structure

```
TAP-IN/
├── index.html              # Main landing page
├── index-de.html           # German landing page
├── src/
│   ├── pages/
│   │   ├── assessments/    # All assessment tools
│   │   ├── courses/        # Learning modules
│   │   ├── games/          # Gamified exercises
│   │   ├── gym/            # Personal development
│   │   ├── hub/            # Team tools
│   │   ├── tools/          # Utility tools
│   │   ├── legal/          # Legal pages
│   │   └── onboarding/     # Onboarding flows
│   ├── js/
│   │   ├── core/           # Shared utilities
│   │   │   ├── dom.js      # DOM manipulation
│   │   │   ├── progress.js # Progress tracking
│   │   │   ├── results.js  # Results display
│   │   │   ├── quiz.js     # Quiz utilities
│   │   │   └── lessons.js  # Lesson completion
│   │   └── utils/          # Helper functions
│   └── css/
│       └── variables.css   # Design tokens
└── docs/
    └── ADDING-CONTENT.md   # How to add new content
```

## Key Files

| File | Purpose |
|------|---------|
| `css/variables.css` | All colors/spacing (edit to rebrand) |
| `js/utils/safe-storage.js` | localStorage wrapper |
| `js/core/dom.js` | Safe DOM manipulation |
| `js/core/progress.js` | Progress tracking utilities |
| `js/core/results.js` | Results display utilities |
| `js/core/quiz.js` | Quiz interaction utilities |
| `js/core/lessons.js` | Lesson completion utilities |

## Adding New Content

See [docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md)

## Deployment

Push to `main` branch → Auto-deploys to Netlify

## Features

- **Belt System**: White → Blue → Purple → Brown → Black progression
- **Assessments**: 13+ leadership and team assessments
- **Courses**: 10+ learning modules (Communication, Boundaries, Deep Work, etc.)
- **Games**: Interactive team exercises
- **Bilingual**: Full English and German support
- **Accessible**: WCAG AA compliant with ARIA labels
- **Responsive**: Mobile-first design

## Technology Stack

- Vanilla HTML/CSS/JavaScript
- No build step required
- Netlify for hosting
- localStorage for progress tracking

## Contributing

1. Follow the folder structure
2. Use shared modules from `js/core/`
3. Use CSS variables from `css/variables.css`
4. Add ARIA labels to all interactive elements
5. Test on mobile and desktop
