import { env } from './env';
import { http } from './http';
import { supabase } from './supabase';

export type Assessment = { id: string; title: string; level: string; eta: string };
export type Game = { id: string; title: string; detail: string; difficulty: string };
export type LeaderboardRow = { rank: number; name: string; xp: number; delta: string; you?: boolean };
export type ChecklistTask = { id: string; label: string; done: boolean };
export type UserProfile = { name: string; email: string };
export type AuthResponse = { token: string; user: UserProfile };

export const queryKeys = {
  assessments: ['assessments'] as const,
  games: ['games'] as const,
  leaderboard: ['leaderboard'] as const,
  streak: ['streak'] as const,
  checklist: ['checklist'] as const,
  user: ['user'] as const,
};

// Toggle to false to hit real backend (or set API_URL/supabase)
const useMock = !env.apiUrl && !env.supabaseUrl;

const mock = {
  async assessments(): Promise<Assessment[]> {
    return [
      { id: 'belt-blue', title: 'Blue Belt Assessment', level: 'Intermediate', eta: '15 min' },
      { id: 'belt-black', title: 'Black Belt Assessment', level: 'Advanced', eta: '25 min' },
      { id: 'communication', title: 'Communication Style', level: 'Foundation', eta: '10 min' },
    ];
  },
  async games(): Promise<Game[]> {
    return [
      { id: 'conflict-navigator', title: 'Conflict Navigator', detail: 'Practice tough conversations', difficulty: 'Advanced' },
      { id: 'trust-builder', title: 'Trust Builder', detail: 'Micro-trust reps', difficulty: 'Intermediate' },
      { id: 'reaction-trainer', title: 'Reaction Trainer', detail: 'Speed and decision-making', difficulty: 'Foundation' },
    ];
  },
  async leaderboard(): Promise<LeaderboardRow[]> {
    return [
      { rank: 1, name: 'Alex', xp: 1820, delta: '+120' },
      { rank: 2, name: 'Sam', xp: 1750, delta: '+90' },
      { rank: 3, name: 'You', xp: 1680, delta: '+60', you: true },
    ];
  },
  async streak(): Promise<{ streak: number; nextMilestone: string; progress: number }> {
    return { streak: 12, nextMilestone: '15-day streak bonus', progress: 0.65 };
  },
  async checklist(): Promise<ChecklistTask[]> {
    return [
      { id: 'profile', label: 'Complete profile', done: true },
      { id: 'assessment', label: 'Start your first assessment', done: false },
      { id: 'game', label: 'Play one practice game', done: false },
    ];
  },
  async profile(): Promise<UserProfile> {
    return { name: 'Marco K.', email: 'marco@example.com' };
  },
  async login(_email: string, _password: string): Promise<AuthResponse> {
    return { token: 'mock-token', user: { name: 'Marco K.', email: 'marco@example.com' } };
  },
};

export async function getAssessments(): Promise<Assessment[]> {
  if (useMock || !env.apiUrl) return mock.assessments();
  return http<Assessment[]>('/assessments', { auth: true });
}

export async function getGames(): Promise<Game[]> {
  if (useMock || !env.apiUrl) return mock.games();
  return http<Game[]>('/games', { auth: true });
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  if (useMock || !env.apiUrl) return mock.leaderboard();
  return http<LeaderboardRow[]>('/leaderboard', { auth: true });
}

export async function getStreak(): Promise<{ streak: number; nextMilestone: string; progress: number }> {
  if (useMock || !env.apiUrl) return mock.streak();
  return http<{ streak: number; nextMilestone: string; progress: number }>('/streak', { auth: true });
}

export async function getChecklist(): Promise<ChecklistTask[]> {
  if (useMock || !env.apiUrl) return mock.checklist();
  return http<ChecklistTask[]>('/checklist', { auth: true });
}

export async function getProfile(): Promise<UserProfile> {
  if (supabase) {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw error ?? new Error('No user');
    return { name: data.user.email ?? 'User', email: data.user.email ?? '' };
  }
  if (useMock || !env.apiUrl) return mock.profile();
  return http<UserProfile>('/me', { auth: true });
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) throw error ?? new Error('Login failed');
    return {
      token: data.session.access_token,
      user: { name: data.user.email ?? 'User', email: data.user.email ?? '' },
    };
  }
  if (useMock || !env.apiUrl) return mock.login(email, password);
  return http<AuthResponse>('/login', {
    method: 'POST',
    body: { email, password },
  });
}

