import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Section } from '../../components/primitives/Section';
import { LeaderboardCard } from '../../components/composite/LeaderboardCard';
import { useTheme } from '../../theme/ThemeProvider';
import { getLeaderboard, queryKeys } from '../../lib/api';

export default function LeaderboardScreen() {
  const { theme } = useTheme();
  const { data, isLoading, error } = useQuery({ queryKey: queryKeys.leaderboard, queryFn: getLeaderboard, staleTime: 60_000 });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.palette.bg }} contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}>
      <Section title="Leaderboard" description="Stay competitive and celebrate wins.">
        {error && <Section description="Could not load leaderboard." />}
        <LeaderboardCard rows={data} loading={isLoading} />
      </Section>
    </ScrollView>
  );
}

