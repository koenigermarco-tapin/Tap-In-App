import React from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Text } from '../../../components/primitives/Text';
import { Section } from '../../../components/primitives/Section';
import { ListItem } from '../../../components/primitives/ListItem';
import { Badge } from '../../../components/primitives/Badge';
import { useTheme } from '../../../theme/ThemeProvider';
import { getAssessments, queryKeys } from '../../../lib/api';

export default function AssessmentsIndex() {
  const router = useRouter();
  const { theme } = useTheme();
  const { data, isLoading, error } = useQuery({ queryKey: queryKeys.assessments, queryFn: getAssessments, staleTime: 60_000 });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.palette.bg }} contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}>
      <Section title="Assessments" description="Pick a track to level up.">
        {isLoading && <Text muted>Loading...</Text>}
        {error && <Text muted>Could not load assessments.</Text>}
        <View style={{ gap: theme.space[2] }}>
          {(data ?? []).map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              subtitle={item.level}
              meta={item.eta}
              trailing={<Badge tone="info">Start</Badge>}
              onPress={() => router.push(`/assessments/${item.id}`)}
            />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

