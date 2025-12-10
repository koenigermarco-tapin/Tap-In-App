# TAP-IN Mobile App (React Native / Expo) — High-Quality Plan

This repo is currently static HTML/CSS/JS. Below is a concrete starting point to recreate the experience as a first-class mobile app with React Native (Expo), prioritizing polish, performance, and accessibility.

## Extracted Design Tokens (from `css/variables.css`, `css/design-system-unified.css`, others)

- **Colors (base)**
  - Primary navy `#1a365d`, navy light `#2d4a7c`
  - Accent purple `#7c3aed`
  - Accent gold `#f59e0b` (and softer `#f6e05e` in UI accents)
  - Accent red `#ef4444`, deep red `#b91c1c`
  - Success green `#10b981`
  - Dark surfaces: `#0a0a0a`, `#141414`, `#1a1a1a`
  - Light surface: `#f8fafc`; card light `#1e293b` (dark theme cards hover `#334155`)
  - Borders: subtle `#334155` (light), subtle dark `#2d2d2d`/`#404040`
  - Text: white `#ffffff`, dark `#1f2937`, muted `#94a3b8`/`#64748b`, dim `#cbd5e1` for dark
- **Typography**
  - Family: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`
  - Base size: 16px; line height: 1.6
  - Weights: 400/500/600/700/800 (normal → extrabold)
- **Spacing**
  - XS 4px, SM 8px, MD 16px, LG 24px, XL 32px (also `tap-spacing-unit` 4px multiples)
- **Radii**
  - 4px, 8px, 12px, 16px (cards at 12px/16px; buttons 8px)
- **Shadows (web) → translate to RN/elevation presets**
  - sm `0 1px 2px rgba(0,0,0,0.05)`
  - md `0 4px 6px rgba(0,0,0,0.1)`
  - lg `0 10px 15px rgba(0,0,0,0.1)`
  - xl `0 20px 25px rgba(0,0,0,0.15)`
- **Motion**
  - Transitions 150–300ms ease; shimmer/slide/pulse patterns in conversion widgets
- **Gradients (represent with RN linear gradients where valuable)**
  - Primary bg: `linear-gradient(135deg, #1a365d 0%, #7c3aed 100%)`
  - Milestone progress: `linear-gradient(90deg, #1a365d, #7c3aed)`
  - Checklist bg: `linear-gradient(135deg, #f0f9ff, #e0f2fe)`
  - Streak widget: `linear-gradient(135deg, rgba(239,68,68,0.2), rgba(251,146,60,0.15))`

## Suggested RN/Expo Token Object (TypeScript)

Use these as a starting point for a `theme/tokens.ts` file.

```ts
export const color = {
  primary: '#1a365d',
  primaryAlt: '#2d4a7c',
  purple: '#7c3aed',
  gold: '#f59e0b',
  goldSoft: '#f6e05e',
  red: '#ef4444',
  redDeep: '#b91c1c',
  green: '#10b981',
  text: '#1f2937',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textOnDark: '#ffffff',
  bg: '#f8fafc',
  bgCard: '#1e293b',
  bgDark: '#0a0a0a',
  bgCardDark: '#141414',
  bgCardHoverDark: '#1a1a1a',
  border: '#334155',
  borderDark: '#2d2d2d',
};

export const space = [0, 4, 8, 16, 24, 32, 40, 48] as const; // or named map
export const radius = { sm: 4, md: 8, lg: 12, xl: 16 } as const;
export const font = { family: 'Inter', size: 16, lineHeight: 1.6 } as const;
export const weight = { normal: '400', medium: '500', semibold: '600', bold: '700', extrabold: '800' } as const;
export const shadow = {
  sm: { elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  md: { elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 4 } },
  lg: { elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 10 } },
};
```

## Component Kit Baseline (RN)

- Typography: `Text` variants (heading 1–4, body, caption), link style.
- Buttons: primary/secondary/ghost, sizes (sm/md/lg), loading/disabled states, optional left/right icons.
- Inputs: text, text area, select/picker, checkbox/switch, radio chips; inline validation; helper/error text.
- Cards/Surfaces: default, elevated, section headers with optional icons/badges.
- List items: with avatar/icon, metadata, trailing action/chevron.
- Progress/Status: progress bar, stepper, pill/badge, toast/inline alert, empty/zero-state cards.
- Layout primitives: `Stack` (row/column), `Screen` wrapper with safe areas, `Section` for standard padding.
- Overlays: modal/sheet (for mobile, prefer bottom sheets), tooltip/coachmark.
- Decorative patterns: gradient banner/hero, shimmer for loading rows, streak/milestone widgets adapted from web.

## App Architecture (Expo + TypeScript)

- Tooling: Expo SDK, React Navigation (stack + bottom tabs), React Query, Zustand (lightweight global UI state), react-hook-form + zod for validation, ESLint/Prettier, Husky + lint-staged, Jest/Vitest + Testing Library.
- Structure (proposal):
  - `app/` (Expo Router) or `src/app.tsx` with `navigation/`, `screens/`, `components/`, `theme/`, `state/`, `hooks/`, `lib/`, `assets/`.
  - `theme/` holds tokens, light/dark theme objects, and `ThemeProvider`.
  - `components/` houses primitives + composites; each with a Storybook story for visual QA.
  - `screens/` mirror major site pages grouped by domain (e.g., onboarding, assessments, belts, hub, games).
  - `state/` for lightweight global UI state (e.g., theme toggle, auth shell); data fetching lives in React Query.
  - `assets/` for images/icons with @1x/@2x/@3x; convert key SVGs to vector icons when possible.

### Concrete setup (Expo, TypeScript, lint/test)

- Init: `npx create-expo-app@latest tapin-mobile --template`
- Core deps: `expo-router` (or classic navigation), `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `react-native-reanimated`, `react-native-gesture-handler`, `@tanstack/react-query`, `zustand`, `react-hook-form`, `@hookform/resolvers`, `zod`, `expo-linear-gradient`, `expo-haptics`.
- Tooling: `typescript`, `eslint`, `@react-native-community/eslint-config`, `prettier`, `lint-staged`, `husky`, `jest`/`vitest`, `@testing-library/react-native`, `msw` (if mocking), `@storybook/react-native` (component lab).

### Suggested project layout (Expo Router style)

```
app/
  _layout.tsx               // providers: theme, query, nav gestures
  index.tsx                 // home/landing
  dashboard.tsx             // hub/metrics
  assessments/
    index.tsx               // list
    [id].tsx                // detail/quiz shell
  games/
    index.tsx
    [id].tsx
  account.tsx
components/
  primitives/               // Text, Button, Input, Card, Badge, Section
  composite/                // Checklist, StreakWidget, Leaderboard, HeroBanner
theme/
  tokens.ts                 // from this plan
  theme.ts                  // light/dark palette mapping
  Typography.tsx            // text variants
state/
  useThemeStore.ts
  useAuthShell.ts
hooks/
  useSafeAsync.ts
  useColorModeValue.ts
lib/
  api.ts                    // fetch helpers / MSW stubs
  analytics.ts              // placeholder
assets/
  fonts/
  icons/
  images/
tests/
  components/
  screens/
```

### Provider composition (at `_layout.tsx` or root)

- `GestureHandlerRootView` → `SafeAreaProvider` → `QueryClientProvider` → `ThemeProvider` (tokens + light/dark) → `BottomSheetModalProvider` (if using sheets) → `Slot` (Expo Router) or `NavigationContainer`.

### Storybook snapshot lab

- Keep a `storybook/` folder with stories for primitives and composites; run on-device/localhost to verify spacing, typography, and dark mode alignment with tokens.

## Screen/Flow Mapping (high level)

- **Landing & Marketing**: index/landing pages → Home screen with hero CTA, testimonials, feature highlights, and quick entry to assessments or games.
- **Onboarding & Checklists**: onboarding checklist widget → dedicated screen with progress, dismissal, and CTA; reuse for post-signup guidance.
- **Assessments & Belts**: numerous belt/assessment pages → grouped flows: select assessment → questions → results/badges → share/export.
- **Hub/Dashboard**: hub/gym/leaderboard pages → tabbed experience: Dashboard, Assessments, Games, Progress (XP/streak), Account.
- **Games/Practices**: conflict navigator, trust builder, reaction trainer, etc. → card grid → detail/play screens with timers, streaks, feedback.
- **Account/Settings**: profile, teams/invites, calendar integrations, data export, theme toggle.

### Priority cut (proposed)

- **P0 (ship first)**: Home/Landing (from `index.html`/`landing.html`), Dashboard/Hub (`hub-focused.html`, `gym-home-FOCUSED.html`), Assessments list and runner (`assessment-*`, `belt-*`), Checklist widget, Account basics (`account.html`, `invite-team.html`, `join-team.html`), Theme toggle.
- **P1 (engagement layer)**: Leaderboard (`leaderboard.html`), XP/Streak widgets, Games core set (`game-conflict-navigator*`, `game-trust-builder*`, `game-reaction-trainer*`), Achievements/Badges (`achievement-*`, `achievements*`), Calendar integration, Data export.
- **P2 (long tail/marketing variants)**: Additional language variants (`*-de.html`), advanced analytics, niche landing pages, ceremony/shark-tank pages.

## UX & Quality Bar

- 44px touch targets, clear focus/hover/press states, haptics on key actions.
- Keyboard handling: safe areas, scroll-to-error, returnKey navigation, submit progress indicators.
- Performance: lazy screens, FlashList for lists, memoized components, optimized image sizes/densities.
- Accessibility: labels/hints, contrast-safe colors, reduced motion support, dynamic type considerations.

## Suggested Next Steps

1) Set up Expo + TS + lint/test + Husky, add `theme/tokens.ts` with the above values.  
2) Build primitives: Text variants, Button, Card/Surface, Input set, Badge, ProgressBar, Section.  
3) Create navigation shell (stack + bottom tabs) and scaffold top-priority screens (Home, Dashboard, Assessments list).  
4) Port visual patterns: hero/CTA gradient banner, checklist widget, streak/milestone, leaderboard.  
5) Add Storybook for components and snapshot a11y checks; add basic e2e (Detox/maestro) for happy-path flows.  

If you want, I can generate the initial Expo project structure and the token file next, then scaffold the first screen with the extracted palette and typography.

