import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Text } from '../../components/primitives/Text';
import { Button } from '../../components/primitives/Button';
import { Card } from '../../components/primitives/Card';
import { Section } from '../../components/primitives/Section';
import { ProgressBar } from '../../components/primitives/ProgressBar';
import { StreakWidget } from '../../components/composite/StreakWidget';
import { ChecklistWidget } from '../../components/composite/ChecklistWidget';
import { LeaderboardCard } from '../../components/composite/LeaderboardCard';
import { useTheme } from '../../theme/ThemeProvider';
import { getChecklist, getLeaderboard, getStreak, queryKeys } from '../../lib/api';

export default function HomeScreen() {
  const router = useRouter();
  const { theme, toggleMode, mode } = useTheme();
  const styles = useStyles(theme);
  const { data: streak, isLoading: streakLoading } = useQuery({ queryKey: queryKeys.streak, queryFn: getStreak, staleTime: 60_000 });
  const { data: checklist, isLoading: checklistLoading } = useQuery({ queryKey: queryKeys.checklist, queryFn: getChecklist, staleTime: 60_000 });
  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({ queryKey: queryKeys.leaderboard, queryFn: getLeaderboard, staleTime: 60_000 });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.palette.bg }} contentContainerStyle={styles.content}>
      <LinearGradient
        colors={[theme.color.primary, theme.color.purple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroContent}>
          <Text variant="h1" style={{ color: theme.palette.textOnAccent }}>
            TAP-IN
          </Text>
          <Text variant="body" style={{ color: theme.palette.textOnAccent }} muted>
            Elite coaching, assessments, and gameified practice in your pocket.
          </Text>
          <View style={styles.heroActions}>
            <Button onPress={() => router.push('/assessments')}>Start Assessment</Button>
            <Button variant="secondary" onPress={toggleMode}>
              {mode === 'dark' ? 'Light mode' : 'Dark mode'}
            </Button>
          </View>
        </View>
      </LinearGradient>

      <Section title="Progress" description="Stay on track with streaks and milestones">
        <Card elevated style={{ gap: theme.space[3] }}>
          <Text variant="title">Daily streak</Text>
          <ProgressBar value={0.65} />
          <Text muted>Keep the momentum — 5 days to the next milestone.</Text>
        </Card>
      </Section>

      <Section title="Quick actions" spacing="lg">
        <View style={styles.actionGrid}>
          <Card style={styles.actionCard}>
            <Text variant="title">Assessments</Text>
            <Text muted>Choose your belt and start.</Text>
            <Button size="sm" onPress={() => router.push('/assessments')}>
              Open
            </Button>
          </Card>
          <Card style={styles.actionCard}>
            <Text variant="title">Games</Text>
            <Text muted>Conflict, trust, reaction, more.</Text>
            <Button size="sm" variant="secondary" onPress={() => router.push('/games')}>
              Play
            </Button>
          </Card>
          <Card style={styles.actionCard}>
            <Text variant="title">Leaderboard</Text>
            <Text muted>See how you rank.</Text>
            <Button size="sm" variant="ghost" onPress={() => router.push('/leaderboard')}>
              View
            </Button>
          </Card>
        </View>
      </Section>

      <Section title="Engagement">
        <StreakWidget
          streak={streak?.streak}
          nextMilestone={streak?.nextMilestone}
          progress={streak?.progress}
          loading={streakLoading}
        />
        <ChecklistWidget
          tasks={checklist}
          loading={checklistLoading}
          onAction={() => router.push('/checklist')}
        />
        <LeaderboardCard
          rows={leaderboard}
          loading={leaderboardLoading}
          onPress={() => router.push('/leaderboard')}
        />
      </Section>
    </ScrollView>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    content: {
      padding: theme.space[4],
      gap: theme.space[4],
    },
    hero: {
      borderRadius: theme.radius.xl,
      padding: theme.space[5],
      ...theme.shadow.lg,
    },
    heroContent: {
      gap: theme.space[2],
    },
    heroActions: {
      flexDirection: 'row',
      gap: theme.space[2],
      marginTop: theme.space[2],
    },
    actionGrid: {
      flexDirection: 'row',
      gap: theme.space[3],
      flexWrap: 'wrap',
    },
    actionCard: {
      flex: 1,
      gap: theme.space[2],
      minWidth: 160,
    },
  });

