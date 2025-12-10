import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Section } from '../../components/primitives/Section';
import { ChecklistWidget } from '../../components/composite/ChecklistWidget';
import { useTheme } from '../../theme/ThemeProvider';
import { getChecklist, queryKeys } from '../../lib/api';

export default function ChecklistScreen() {
  const { theme } = useTheme();
  const { data, isLoading, error } = useQuery({ queryKey: queryKeys.checklist, queryFn: getChecklist, staleTime: 60_000 });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.palette.bg }} contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}>
      <Section title="Onboarding checklist" description="Finish setup to maximize XP and unlock streak bonuses.">
        {error && <Section description="Could not load checklist." />}
        <ChecklistWidget tasks={data} loading={isLoading} />
      </Section>
    </ScrollView>
  );
}

