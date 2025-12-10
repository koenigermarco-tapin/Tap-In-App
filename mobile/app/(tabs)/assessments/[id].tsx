import React from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '../../../components/primitives/Text';
import { Section } from '../../../components/primitives/Section';
import { ProgressBar } from '../../../components/primitives/ProgressBar';
import { Card } from '../../../components/primitives/Card';
import { Button } from '../../../components/primitives/Button';
import { useTheme } from '../../../theme/ThemeProvider';

export default function AssessmentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.palette.bg }} contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}>
      <Section title={id ? id.toString().replace(/-/g, ' ') : 'Assessment'}>
        <Card elevated style={{ gap: theme.space[3] }}>
          <Text variant="body" muted>
            This is a placeholder screen. Wire this up to the actual assessment flow with questions, progress, and results.
          </Text>
          <ProgressBar value={0.2} label="Progress" />
          <View style={{ flexDirection: 'row', gap: theme.space[2] }}>
            <Button variant="secondary" onPress={() => {}}>
              Back
            </Button>
            <Button onPress={() => {}}>Continue</Button>
          </View>
        </Card>
      </Section>
    </ScrollView>
  );
}

