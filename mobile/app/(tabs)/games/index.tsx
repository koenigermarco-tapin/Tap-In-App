import React from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Text } from '../../../components/primitives/Text';
import { Section } from '../../../components/primitives/Section';
import { ListItem } from '../../../components/primitives/ListItem';
import { Badge } from '../../../components/primitives/Badge';
import { useTheme } from '../../../theme/ThemeProvider';
import { getGames, queryKeys } from '../../../lib/api';

export default function GamesIndex() {
  const router = useRouter();
  const { theme } = useTheme();
  const { data, isLoading, error } = useQuery({ queryKey: queryKeys.games, queryFn: getGames, staleTime: 60_000 });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.palette.bg }} contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}>
      <Section title="Games" description="Deliberate practice, fast feedback.">
        {isLoading && <Text muted>Loading...</Text>}
        {error && <Text muted>Could not load games.</Text>}
        <View style={{ gap: theme.space[2] }}>
          {(data ?? []).map((game) => (
            <ListItem
              key={game.id}
              title={game.title}
              subtitle={game.detail}
              trailing={<Badge tone="success">{game.difficulty}</Badge>}
              onPress={() => router.push(`/games/${game.id}`)}
            />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

