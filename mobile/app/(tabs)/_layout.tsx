import React from 'react';
import { Tabs, Redirect, useSegments } from 'expo-router';
import { useTheme } from '../../theme/ThemeProvider';
import { HeroIcon } from '../../components/icons/HeroIcon';
import { useAuthStore } from '../../state/useAuthStore';

export default function TabsLayout() {
  const { theme } = useTheme();
  const { token } = useAuthStore();
  const segments = useSegments();

  // Prevent non-authenticated users from accessing tabs; send to login.
  if (!token && segments[0] === '(tabs)') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.palette.primary,
        tabBarInactiveTintColor: theme.palette.textMuted,
        tabBarStyle: {
          backgroundColor: theme.palette.surface,
          borderTopColor: theme.palette.border,
        },
        tabBarLabelStyle: {
          fontFamily: theme.font.family,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HeroIcon name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="assessments/index"
        options={{
          title: 'Assessments',
          tabBarIcon: ({ color, size }) => <HeroIcon name="clipboard" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="games/index"
        options={{
          title: 'Games',
          tabBarIcon: ({ color, size }) => <HeroIcon name="sparkles" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <HeroIcon name="chart-bar" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => <HeroIcon name="user" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

