import React from 'react';
import { ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Section } from '../../../components/primitives/Section';
import { Card } from '../../../components/primitives/Card';
import { Text } from '../../../components/primitives/Text';
import { Button } from '../../../components/primitives/Button';
import { useTheme } from '../../../theme/ThemeProvider';

export default function GameDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.palette.bg }} contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}>
      <Section title={id ? id.toString().replace(/-/g, ' ') : 'Game'}>
        <Card elevated style={{ gap: theme.space[3] }}>
          <Text muted>
            Placeholder for game experience. Connect to the actual game logic, scoring, and feedback loops here.
          </Text>
          <Button onPress={() => {}}>Start</Button>
        </Card>
      </Section>
    </ScrollView>
  );
}

