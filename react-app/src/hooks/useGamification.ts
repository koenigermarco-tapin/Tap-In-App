import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { GamificationStats, BeltLevel } from '@/types';

const DEFAULT_STATS: GamificationStats = {
  totalXP: 0,
  level: 1,
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
  },
  badges: [],
  beltProgress: {
    currentBelt: 'white',
    currentStripe: 0,
    totalXP: 0,
    completedModules: [],
    completedAssessments: [],
    completedStripes: {
      white: 0,
      blue: 0,
      purple: 0,
      brown: 0,
      black: 0,
    },
  },
};

const BELT_XP_THRESHOLDS: Record<BeltLevel, number> = {
  white: 0,
  blue: 1000,
  purple: 3000,
  brown: 6000,
  black: 10000,
};

// XP Level System (1-10)
const XP_LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: 'Beginner' },
  { level: 2, xp: 100, title: 'Learner' },
  { level: 3, xp: 250, title: 'Practitioner' },
  { level: 4, xp: 500, title: 'Dedicated' },
  { level: 5, xp: 1000, title: 'Committed' },
  { level: 6, xp: 2000, title: 'Advanced' },
  { level: 7, xp: 3500, title: 'Expert' },
  { level: 8, xp: 5000, title: 'Master' },
  { level: 9, xp: 7000, title: 'Grandmaster' },
  { level: 10, xp: 9000, title: 'Legend' },
];

// Calculate level from total XP
const calculateLevel = (totalXP: number): number => {
  for (let i = XP_LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= XP_LEVEL_THRESHOLDS[i].xp) {
      return XP_LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
};

// Get level title
const getLevelTitle = (level: number): string => {
  const levelData = XP_LEVEL_THRESHOLDS.find(l => l.level === level);
  return levelData?.title || 'Beginner';
};

// Get XP needed for next level
const getXPForNextLevel = (currentXP: number, currentLevel: number): number => {
  if (currentLevel >= 10) return 0; // Max level reached
  const nextLevelData = XP_LEVEL_THRESHOLDS.find(l => l.level === currentLevel + 1);
  return nextLevelData ? nextLevelData.xp - currentXP : 0;
};

export function useGamification() {
  const { user, profile, refreshProfile } = useAuth();
  const [stats, setStats] = useState<GamificationStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  // Helper to calculate completed stripes from completed modules
  const calculateCompletedStripes = (completedModules: string[]) => {
    const completedStripes = {
      white: 0,
      blue: 0,
      purple: 0,
      brown: 0,
      black: 0,
    };

    const belts = ['white', 'blue', 'purple', 'brown', 'black'] as const;
    belts.forEach(belt => {
      for (let stripe = 1; stripe <= 4; stripe++) {
        const moduleId = `${belt}-stripe-${stripe}`;
        if (completedModules.includes(moduleId)) {
          completedStripes[belt] += 1;
        }
      }
    });

    return completedStripes;
  };

  // Load stats from profile
  useEffect(() => {
    if (profile) {
      const completedModules = profile.completed_modules || [];
      const completedStripes = calculateCompletedStripes(completedModules);
      const totalXP = profile.total_xp || 0;
      const level = calculateLevel(totalXP);

      setStats({
        totalXP,
        level,
        streak: {
          currentStreak: profile.current_streak || 0,
          longestStreak: profile.longest_streak || 0,
          lastActiveDate: profile.last_active_date || '',
        },
        badges: profile.badges || [],
        beltProgress: {
          currentBelt: (profile.current_belt as BeltLevel) || 'white',
          currentStripe: profile.current_stripe || 0,
          totalXP,
          completedModules,
          completedAssessments: profile.completed_assessments || [],
          completedStripes,
        },
      });
      setLoading(false);
    } else if (user && !profile) {
      // User logged in but profile not loaded yet
      setLoading(true);
    } else {
      // No user, reset to defaults
      setStats(DEFAULT_STATS);
      setLoading(false);
    }
  }, [profile, user]);

  const addXP = async (amount: number, source?: string, description?: string) => {
    if (!user) {
      console.warn('Cannot add XP: User not logged in');
      return;
    }

    try {
      // Call Supabase function to add XP
      const { data, error } = await supabase.rpc('add_xp', {
        p_user_id: user.id,
        p_amount: amount,
        p_source: source || null,
        p_description: description || null,
      });

      if (error) throw error;

      console.log(`🎮 +${amount} XP${source ? ` from ${source}` : ''}`, data);

      // Show toast notification for XP gain
      if (data?.level_up) {
        console.log(`🎉 Level Up! You're now level ${data.new_level}`);
      }
      
      if (data?.belt_promotion) {
        console.log(`🥋 Belt Promotion! You've earned your ${data.new_belt} belt!`);
      }

      // Refresh profile to get updated stats
      await refreshProfile();
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  const updateStreak = async () => {
    if (!user) {
      console.warn('Cannot update streak: User not logged in');
      return;
    }

    try {
      const { data, error } = await supabase.rpc('update_streak', {
        p_user_id: user.id,
      });

      if (error) throw error;

      // Streak updated successfully
      if (data?.streak_milestone) {
        // Milestone reached
      }

      // Refresh profile
      await refreshProfile();
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const addBadge = async (badge: string) => {
    if (!user) {
      console.warn('Cannot add badge: User not logged in');
      return;
    }

    try {
      const { error } = await supabase.rpc('add_badge', {
        p_user_id: user.id,
        p_badge: badge,
      });

      if (error) throw error;

      // Badge added successfully

      // Refresh profile
      await refreshProfile();
    } catch (error) {
      console.error('Error adding badge:', error);
    }
  };

  const completeAssessment = async (assessmentId: string, xpAmount: number = 100) => {
    if (!user) {
      console.warn('Cannot complete assessment: User not logged in');
      return;
    }

    try {
      const { data, error } = await supabase.rpc('complete_assessment', {
        p_user_id: user.id,
        p_assessment_id: assessmentId,
        p_xp_amount: xpAmount,
      });

      if (error) throw error;

      // Assessment completed successfully

      // Refresh profile
      await refreshProfile();

      return data;
    } catch (error) {
      console.error('Error completing assessment:', error);
    }
  };

  const completeModule = async (moduleId: string) => {
    if (!user) {
      console.warn('Cannot complete module: User not logged in');
      return;
    }

    try {
      // Check if already completed
      if (stats.beltProgress.completedModules.includes(moduleId)) {
        // Module already completed
        return;
      }

      // Add to completed modules
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          completed_modules: [...stats.beltProgress.completedModules, moduleId],
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Add XP
      await addXP(150, 'module', moduleId);

      // Update streak
      await updateStreak();

      // Module completed successfully
    } catch (error) {
      console.error('Error completing module:', error);
    }
  };

  const getNextBelt = (current: BeltLevel): BeltLevel | null => {
    const belts: BeltLevel[] = ['white', 'blue', 'purple', 'brown', 'black'];
    const currentIndex = belts.indexOf(current);
    return currentIndex < belts.length - 1 ? belts[currentIndex + 1] : null;
  };

  return {
    stats,
    loading,
    addXP,
    updateStreak,
    addBadge,
    completeAssessment,
    completeModule,
    getNextBelt,
    BELT_XP_THRESHOLDS,
    getLevelTitle,
    getXPForNextLevel,
    XP_LEVEL_THRESHOLDS,
  };
}

