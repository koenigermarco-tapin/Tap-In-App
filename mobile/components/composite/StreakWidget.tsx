import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card } from '../primitives/Card';
import { Text } from '../primitives/Text';
import { ProgressBar } from '../primitives/ProgressBar';

type Props = {
  streak?: number;
  nextMilestone?: string;
  progress?: number; // 0-1
  loading?: boolean;
};

export function StreakWidget({ streak, nextMilestone, progress, loading }: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const current = streak ?? 0;
  const pct = progress ?? 0;

  return (
    <Card elevated style={styles.card}>
      <View style={styles.header}>
        <Text variant="title">Streak</Text>
        <Text variant="caption" muted>
          {loading ? 'Loading...' : `${current}-day run`}
        </Text>
      </View>
      <View style={styles.body}>
        <Text variant="h2">🔥 {current}</Text>
        <Text muted>
          {loading ? 'Checking bonuses...' : nextMilestone ?? 'Keep the momentum.'}
        </Text>
      </View>
      <ProgressBar value={pct} label="Next milestone" />
    </Card>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    card: {
      gap: theme.space[3],
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    body: {
      gap: theme.space[1],
    },
  });

