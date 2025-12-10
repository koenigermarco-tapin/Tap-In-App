# TAP-IN Mobile (Expo/React Native) Starter

This folder contains a pre-baked structure and components to recreate the TAP-IN experience as a native app with Expo + React Native. It is aligned with the design tokens extracted from the web repo.

## Quick start (recommended)

1) Create the Expo app (adjust name if needed):
   - `npx create-expo-app@latest mobile --template`
   - `cd mobile`
2) Install deps (navigation, forms, theming, data, icons):
   - `npx expo install expo-router react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens`
   - `npx expo install expo-linear-gradient expo-haptics`
   - `npx expo install react-native-svg`
   - `npx expo install expo-secure-store`
   - `npx expo install @react-native-async-storage/async-storage`
   - `npm i @supabase/supabase-js`
   - `npm i @tanstack/react-query zustand react-hook-form @hookform/resolvers zod`
3) Copy the contents of this `mobile/` folder from the repo into your new Expo app (merge/replace files).
4) Run: `npm run start`

## Environment / config

- Copy `app.config.ts` and set env vars before building:
  - `APP_NAME`, `APP_SLUG`, `BUNDLE_ID` (iOS), `PACKAGE` (Android), `API_URL`, `APP_ENV`, `EAS_PROJECT_ID`, `SUPABASE_URL`, `SUPABASE_KEY`.
- You can create a `.env` file (not committed) and load via `dotenv/config` (already wired in `app.config.ts`).

## EAS (build & submit)

- Install EAS CLI: `npm i -g eas-cli`
- Configure: `eas build:configure`
- Build profiles (see `eas.json`):
  - Dev client: `eas build --profile development --platform ios|android`
  - Preview/internal: `eas build --profile preview --platform ios|android`
  - Store: `eas build --profile production --platform ios|android`
- Submit: `eas submit --platform ios|android --profile production`

## Assets

- Place app icon at `./assets/icon.png`, splash at `./assets/splash.png`, adaptive icon at `./assets/adaptive-icon.png`. Colors align to primary navy `#1a365d`.

## Suggested package.json (scripts/deps)

Use the Expo-managed versions shown by `expo install` for native deps. Example (adjust versions to current Expo SDK):

```jsonc
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "storybook": "start-storybook -p 7007"
  },
  "dependencies": {
    "expo": "SDK_VERSION",
    "expo-router": "LATEST_COMPAT",
    "expo-linear-gradient": "LATEST_COMPAT",
    "expo-haptics": "LATEST_COMPAT",
    "react-native-svg": "LATEST_COMPAT",
    "react-native-gesture-handler": "LATEST_COMPAT",
    "react-native-reanimated": "LATEST_COMPAT",
    "react-native-safe-area-context": "LATEST_COMPAT",
    "react-native-screens": "LATEST_COMPAT",
    "@tanstack/react-query": "^5.x",
    "zustand": "^4.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-native": "^0.73.x",
    "typescript": "^5.x",
    "eslint": "^8.x",
    "@react-native-community/eslint-config": "^3.x",
    "jest": "^29.x",
    "@testing-library/react-native": "^12.x"
  }
}
```

Run `expo install` for any native module first to ensure version alignment, then `npm i` for JS-only deps. Replace `SDK_VERSION`/`LATEST_COMPAT` with the versions Expo suggests for your SDK.***

## Included

- `theme/`: tokens, light/dark theme mapping, provider.
- `components/primitives/`: Text, Button, Card, Section, ProgressBar, Input.
- `app/`: Expo Router layout + a sample home screen wired to the theme/components.

## Notes

- Uses Expo Router; swap to classic React Navigation if preferred.
- Tokens come from the site’s CSS variables for visual parity.
- Components favor accessibility (labels, hit slop, clear states) and mobile-friendly spacing.***

