export interface User {
  id: string;
  email: string;
  name?: string;
  company?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  bio?: string | null;
  company: string | null;
  created_at: string;
  updated_at: string;
  // Gamification fields
  total_xp?: number;
  level?: number;
  current_belt?: string;
  current_stripe?: number;
  current_streak?: number;
  longest_streak?: number;
  last_active_date?: string;
  badges?: string[];
  completed_modules?: string[];
  completed_assessments?: string[];
}

export interface Team {
  id: string;
  name: string;
  description: string | null;
  invite_code: string;
  created_by: string;
  created_at: string;
  role?: 'admin' | 'member';
  joined_at?: string;
  member_count?: number;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  user_profiles?: UserProfile;
}

export interface Assessment {
  id: string;
  user_id: string;
  team_id: string | null;
  assessment_type: AssessmentType;
  data: Record<string, unknown>;
  is_shared_with_team: boolean;
  created_at: string;
  user_profiles?: UserProfile;
}

export type AssessmentType = 
  | 'leadership-style'
  | 'worker-type'
  | 'mental-health'
  | 'work-life-balance'
  | 'belt-assessment'
  | 'team-dynamics'
  | 'communication-style'
  | 'decision-making'
  | 'values-discovery'
  | 'deep-dive';

export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black';

export interface BeltProgress {
  currentBelt: BeltLevel;
  currentStripe: number;
  totalXP: number;
  completedModules: string[];
  completedAssessments: string[];
  completedStripes: {
    white: number;
    blue: number;
    purple: number;
    brown: number;
    black: number;
  };
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface GamificationStats {
  totalXP: number;
  level: number;
  streak: StreakData;
  badges: string[];
  beltProgress: BeltProgress;
}

