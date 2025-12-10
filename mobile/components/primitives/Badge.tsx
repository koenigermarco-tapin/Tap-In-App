import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from './Text';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type Props = ViewProps & {
  tone?: Tone;
  children: React.ReactNode;
};

export function Badge({ tone = 'neutral', children, style, ...rest }: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={[styles.base, styles[tone], style]} {...rest}>
      <Text variant="caption" style={styles.label}>
        {children}
      </Text>
    </View>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    base: {
      paddingHorizontal: theme.space[2],
      paddingVertical: theme.space[1],
      borderRadius: theme.radius.lg,
      alignSelf: 'flex-start',
    },
    label: {
      fontWeight: theme.weight.semibold as any,
    },
    neutral: {
      backgroundColor: theme.palette.surfaceMuted,
    },
    success: {
      backgroundColor: 'rgba(16,185,129,0.15)',
      borderColor: 'rgba(16,185,129,0.3)',
      borderWidth: 1,
    },
    warning: {
      backgroundColor: 'rgba(245,158,11,0.15)',
      borderColor: 'rgba(245,158,11,0.3)',
      borderWidth: 1,
    },
    danger: {
      backgroundColor: 'rgba(239,68,68,0.15)',
      borderColor: 'rgba(239,68,68,0.3)',
      borderWidth: 1,
    },
    info: {
      backgroundColor: 'rgba(124,58,237,0.15)',
      borderColor: 'rgba(124,58,237,0.3)',
      borderWidth: 1,
    },
  });

