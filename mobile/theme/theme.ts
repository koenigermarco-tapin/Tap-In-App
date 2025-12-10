import { color, font, radius, shadow, space, weight } from './tokens';

export type Mode = 'light' | 'dark';

const base = {
  color,
  font,
  radius,
  shadow,
  space,
  weight,
};

export const lightTheme = {
  ...base,
  mode: 'light' as Mode,
  palette: {
    text: color.text,
    textMuted: color.textMuted,
    textOnAccent: color.textOnDark,
    bg: color.bg,
    surface: color.bgCard,
    surfaceMuted: '#e5e7eb',
    border: color.border,
    primary: color.primary,
    primaryAlt: color.primaryAlt,
    accent: color.purple,
    success: color.green,
    warning: color.gold,
    danger: color.red,
  },
};

export const darkTheme = {
  ...base,
  mode: 'dark' as Mode,
  palette: {
    text: color.textOnDark,
    textMuted: '#cbd5e1',
    textOnAccent: color.textOnDark,
    bg: color.bgDark,
    surface: color.bgCardDark,
    surfaceMuted: color.bgCardHoverDark,
    border: color.borderDark,
    primary: color.primaryAlt,
    primaryAlt: color.primary,
    accent: color.purple,
    success: color.green,
    warning: color.gold,
    danger: color.red,
  },
};

export type Theme = typeof lightTheme;

