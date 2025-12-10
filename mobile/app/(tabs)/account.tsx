import React from 'react';
import { ScrollView, View, Switch } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Section } from '../../components/primitives/Section';
import { Card } from '../../components/primitives/Card';
import { Text } from '../../components/primitives/Text';
import { Button } from '../../components/primitives/Button';
import { useTheme } from '../../theme/ThemeProvider';
import { getProfile, queryKeys } from '../../lib/api';
import { useAuthStore } from '../../state/useAuthStore';
import { supabase } from '../../lib/supabase';

export default function AccountScreen() {
  const { theme, mode, toggleMode } = useTheme();
  const { token, logout, setToken, setUser, user } = useAuthStore();
  const { data, isLoading } = useQuery({ queryKey: queryKeys.user ?? ['user'], queryFn: getProfile, enabled: Boolean(token) });

  const profile = data ?? user;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.palette.bg }}
      contentContainerStyle={{ padding: theme.space[4], gap: theme.space[4] }}
    >
      <Section title="Account" description="Manage profile, preferences, and privacy.">
        <Card elevated style={{ gap: theme.space[3] }}>
          <Text variant="title">{profile?.name ?? 'Guest'}</Text>
          <Text muted>{profile?.email ?? 'Not signed in'}</Text>
          <View style={{ flexDirection: 'row', gap: theme.space[2] }}>
            {token ? (
              <Button
                size="sm"
                variant="ghost"
                onPress={async () => {
                  if (supabase) {
                    await supabase.auth.signOut();
                  }
                  logout();
                }}
              >
                Log out
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                onPress={() => {
                  logout();
                  setToken(null);
                  setUser(undefined);
                }}
              >
                Log in
              </Button>
            )}
            <Button size="sm" variant="secondary">
              Edit profile
            </Button>
          </View>
          {isLoading && <Text muted>Loading profile…</Text>}
        </Card>
      </Section>

      <Section title="Preferences">
        <Card style={{ gap: theme.space[3] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Dark mode</Text>
            <Switch value={mode === 'dark'} onValueChange={toggleMode} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Notifications</Text>
            <Switch value />
          </View>
        </Card>
      </Section>

      <Section title="Data & privacy">
        <Card style={{ gap: theme.space[2] }}>
          <Button size="sm" variant="secondary">
            Export data
          </Button>
          <Button size="sm" variant="ghost">
            Delete account
          </Button>
        </Card>
      </Section>
    </ScrollView>
  );
}

