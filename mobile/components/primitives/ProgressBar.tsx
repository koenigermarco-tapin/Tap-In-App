import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Props = ViewProps & {
  value: number; // 0-1
  label?: string;
};

export function ProgressBar({ value, label, style, ...rest }: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const clamped = Math.min(1, Math.max(0, value));

  return (
    <View style={[styles.container, style]} accessibilityRole="progressbar" {...rest}>
      {label && (
        <View style={styles.labelRow}>
          <Text>{label}</Text>
          <Text muted>{Math.round(clamped * 100)}%</Text>
        </View>
      )}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
      </View>
    </View>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.space[1],
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    track: {
      width: '100%',
      height: 10,
      backgroundColor: theme.palette.surfaceMuted,
      borderRadius: 999,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      backgroundColor: theme.palette.primary,
      borderRadius: 999,
    },
  });

