import React, { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { darkTheme, lightTheme, Mode, Theme } from './theme';

type ThemeContextValue = {
  theme: Theme;
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const system = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  const [mode, setMode] = useState<Mode>(system);

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      setMode,
      toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { mode } = useTheme();
  return mode === 'dark' ? dark : light;
}

