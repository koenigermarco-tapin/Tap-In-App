import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export type BeltColor = 'white' | 'blue' | 'purple' | 'brown' | 'black';

interface CelebrationState {
  showStripeCelebration: boolean;
  showBeltCelebration: boolean;
  celebrationData: {
    beltColor: BeltColor;
    stripeNumber: 1 | 2 | 3 | 4;
    xpAwarded: number;
    totalBeltXP: number;
    nextBelt?: string;
    stripeNames: string[];
  } | null;
}

const STRIPE_XP = 100; // XP per stripe completion
const BELT_BONUS_XP = 500; // Bonus XP for completing all 4 stripes

const beltProgression: Record<BeltColor, string | undefined> = {
  white: 'Blue Belt',
  blue: 'Purple Belt',
  purple: 'Brown Belt',
  brown: 'Black Belt',
  black: undefined // No next belt after black
};

const stripeNamesByBelt: Record<BeltColor, string[]> = {
  white: [
    'Trust Foundations',
    'Practicing Vulnerability',
    'Building Team Trust',
    'Trust Mastery'
  ],
  blue: [
    'Difficult Conversations',
    'Active Listening',
    'Feedback Systems',
    'Boundaries'
  ],
  purple: [
    'Team Alignment & Shared Goals',
    'Healthy Conflict',
    'Collective Accountability',
    'Results Focus'
  ],
  brown: [
    'Accountability Foundation',
    'Accountability Depth',
    'Accountability Systems',
    'Accountability Mastery'
  ],
  black: [
    'Integration',
    'Teaching Others',
    'Leadership Philosophy',
    'Legacy'
  ]
};

export function useCelebrations() {
  const [state, setState] = useState<CelebrationState>({
    showStripeCelebration: false,
    showBeltCelebration: false,
    celebrationData: null
  });

  const checkAndTriggerCelebrations = useCallback(async (
    beltColor: BeltColor,
    stripeNumber: 1 | 2 | 3 | 4
  ) => {
    try {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check if this stripe was already celebrated
      const storageKey = `${beltColor}_stripe_${stripeNumber}_celebrated`;
      const alreadyCelebrated = localStorage.getItem(storageKey);

      if (alreadyCelebrated) {
        return; // Don't celebrate twice
      }

      // Mark as celebrated
      localStorage.setItem(storageKey, 'true');

      // Get completed stripes for this belt
      const completedStripes = await getCompletedStripes(beltColor);
      const allStripesComplete = completedStripes.length === 4;

      // Prepare celebration data
      const celebrationData = {
        beltColor,
        stripeNumber,
        xpAwarded: STRIPE_XP,
        totalBeltXP: STRIPE_XP * 4 + BELT_BONUS_XP,
        nextBelt: allStripesComplete ? beltProgression[beltColor] : undefined,
        stripeNames: stripeNamesByBelt[beltColor]
      };

      if (allStripesComplete) {
        // Check if belt was already celebrated
        const beltStorageKey = `${beltColor}_belt_celebrated`;
        const beltAlreadyCelebrated = localStorage.getItem(beltStorageKey);

        if (!beltAlreadyCelebrated) {
          localStorage.setItem(beltStorageKey, 'true');
          
          // Show belt celebration
          setState({
            showStripeCelebration: false,
            showBeltCelebration: true,
            celebrationData
          });
        }
      } else {
        // Show stripe celebration
        setState({
          showStripeCelebration: true,
          showBeltCelebration: false,
          celebrationData
        });
      }
    } catch (error) {
      console.error('Error checking celebrations:', error);
    }
  }, []);

  const closeStripeCelebration = useCallback(() => {
    setState(prev => ({
      ...prev,
      showStripeCelebration: false
    }));
  }, []);

  const closeBeltCelebration = useCallback(() => {
    setState(prev => ({
      ...prev,
      showBeltCelebration: false,
      celebrationData: null
    }));
  }, []);

  return {
    ...state,
    checkAndTriggerCelebrations,
    closeStripeCelebration,
    closeBeltCelebration
  };
}

// Helper function to get completed stripes for a belt
async function getCompletedStripes(beltColor: string): Promise<number[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('stripe_progress')
      .select('stripe_number')
      .eq('user_id', user.id)
      .eq('belt_color', beltColor)
      .eq('completed', true);

    if (error) throw error;

    return data?.map(d => d.stripe_number) || [];
  } catch (error) {
    console.error('Error getting completed stripes:', error);
    return [];
  }
}

