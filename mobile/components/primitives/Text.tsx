import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Variant = 'h1' | 'h2' | 'h3' | 'title' | 'body' | 'caption' | 'label';

type Props = TextProps & {
  variant?: Variant;
  muted?: boolean;
};

export function Text({ variant = 'body', muted = false, style, ...rest }: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const variantStyle = styles[variant] ?? styles.body;
  const color = muted ? theme.palette.textMuted : theme.palette.text;

  return <RNText style={[variantStyle, { color }, style]} {...rest} />;
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    h1: {
      fontFamily: theme.font.family,
      fontWeight: theme.weight.extrabold as any,
      fontSize: 32,
      lineHeight: 38,
    },
    h2: {
      fontFamily: theme.font.family,
      fontWeight: theme.weight.bold as any,
      fontSize: 26,
      lineHeight: 32,
    },
    h3: {
      fontFamily: theme.font.family,
      fontWeight: theme.weight.bold as any,
      fontSize: 22,
      lineHeight: 28,
    },
    title: {
      fontFamily: theme.font.family,
      fontWeight: theme.weight.semibold as any,
      fontSize: 18,
      lineHeight: 24,
    },
    body: {
      fontFamily: theme.font.family,
      fontWeight: theme.weight.normal as any,
      fontSize: theme.font.size,
      lineHeight: theme.font.size * theme.font.lineHeight,
    },
    caption: {
      fontFamily: theme.font.family,
      fontWeight: theme.weight.medium as any,
      fontSize: 13,
      lineHeight: 18,
    },
    label: {
      fontFamily: theme.font.family,
      fontWeight: theme.weight.semibold as any,
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0.2,
      textTransform: 'uppercase',
    },
  });

