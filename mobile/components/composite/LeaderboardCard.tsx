import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../primitives/Card';
import { Text } from '../primitives/Text';
import { Badge } from '../primitives/Badge';
import { useTheme } from '../../theme/ThemeProvider';
import { LeaderboardRow } from '../../lib/api';

type Props = {
  onPress?: () => void;
  rows?: LeaderboardRow[];
  loading?: boolean;
};

export function LeaderboardCard({ onPress, rows, loading }: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const data = rows ?? [];

  return (
    <Card elevated style={styles.card}>
      <View style={styles.header}>
        <Text variant="title">Leaderboard</Text>
        <Badge tone="info">Top 10%</Badge>
      </View>
      <View style={styles.list}>
        {loading && data.length === 0 ? (
          <Text muted>Loading...</Text>
        ) : (
          data.map((row) => (
            <View key={row.rank} style={[styles.row, row.you && styles.you]}>
              <Text variant="title">{row.rank}</Text>
              <View style={styles.nameBlock}>
                <Text variant="body" style={row.you && styles.youText}>
                  {row.name}
                </Text>
                <Text muted>{row.xp} XP</Text>
              </View>
              <Text style={[styles.delta, row.you && styles.youText]}>{row.delta}</Text>
            </View>
          ))
        )}
      </View>
      {onPress && (
        <Text variant="caption" muted style={styles.link} onPress={onPress}>
          View full leaderboard →
        </Text>
      )}
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
    list: {
      gap: theme.space[2],
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[2],
      padding: theme.space[2],
      borderRadius: theme.radius.md,
      backgroundColor: theme.palette.surfaceMuted,
    },
    nameBlock: {
      flex: 1,
      gap: theme.space[0],
    },
    delta: {
      fontWeight: theme.weight.semibold as any,
      color: theme.palette.success,
    },
    you: {
      borderWidth: 1,
      borderColor: theme.palette.warning,
      backgroundColor: 'rgba(245,158,11,0.08)',
    },
    youText: {
      fontWeight: theme.weight.bold as any,
    },
    link: {
      textDecorationLine: 'underline',
    },
  });

