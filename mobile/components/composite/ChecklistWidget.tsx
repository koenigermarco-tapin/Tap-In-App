import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../primitives/Card';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';
import { useTheme } from '../../theme/ThemeProvider';
import { ProgressBar } from '../primitives/ProgressBar';
import { ChecklistTask } from '../../lib/api';

type Props = {
  onAction?: () => void;
  tasks?: ChecklistTask[];
  loading?: boolean;
};

export function ChecklistWidget({ onAction, tasks, loading }: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const items = tasks ?? [];
  const completed = items.filter((t) => t.done).length;
  const progress = items.length ? completed / items.length : 0;

  return (
    <Card elevated style={styles.card}>
      <View style={styles.header}>
        <Text variant="title">Onboarding checklist</Text>
        <Button size="sm" variant="secondary" onPress={onAction}>
          View all
        </Button>
      </View>
      <View style={styles.list}>
        {loading && items.length === 0 ? (
          <Text muted>Loading...</Text>
        ) : (
          items.map((task) => (
            <View key={task.id} style={styles.item}>
              <View style={[styles.checkbox, task.done && styles.checkboxDone]} />
              <Text muted={task.done}>{task.label}</Text>
            </View>
          ))
        )}
      </View>
      <ProgressBar value={progress} label="Completion" />
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
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.space[2],
    },
    list: {
      gap: theme.space[2],
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[2],
    },
    checkbox: {
      width: 16,
      height: 16,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
      borderColor: theme.palette.border,
      backgroundColor: theme.palette.surfaceMuted,
    },
    checkboxDone: {
      backgroundColor: theme.palette.primary,
      borderColor: theme.palette.primaryAlt,
    },
  });

