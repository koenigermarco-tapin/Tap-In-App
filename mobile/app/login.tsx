import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Section } from '../components/primitives/Section';
import { Card } from '../components/primitives/Card';
import { Text } from '../components/primitives/Text';
import { Button } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { useTheme } from '../theme/ThemeProvider';
import { login } from '../lib/api';
import { useAuthStore } from '../state/useAuthStore';
import { showToast } from '../lib/toast';
import { env } from '../lib/env';

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  const [email, setEmail] = useState('marco@example.com');
  const [password, setPassword] = useState('password');

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      router.replace('/(tabs)');
      showToast('Welcome back');
    },
    onError: (err: any) => {
      showToast(err?.message ?? 'Login failed');
    },
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.palette.bg }}
      contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}
    >
      <Section title="Welcome" description="Log in to continue.">
        <Card elevated style={{ gap: theme.space[3] }}>
          <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <Button onPress={() => mutation.mutate()} loading={mutation.isPending}>
            Log in
          </Button>
          <Text muted>
            {env.supabaseUrl
              ? 'Using Supabase auth. Enter your email/password.'
              : 'Demo credentials are prefilled. Replace with your account to test.'}
          </Text>
        </Card>
      </Section>
    </ScrollView>
  );
}

