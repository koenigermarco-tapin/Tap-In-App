import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, Star, Crown } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: string;
}

const allBadges: Badge[] = [
  // Starter Badges
  { id: 'first-stripe', name: 'First Stripe', description: 'Complete your first stripe', icon: '🥋', rarity: 'common', requirement: 'Complete any belt stripe' },
  { id: 'first-assessment', name: 'First Assessment', description: 'Complete your first assessment', icon: '📝', rarity: 'common', requirement: 'Complete any assessment' },
  { id: 'first-tool', name: 'Tool Master', description: 'Use your first Open Mat tool', icon: '🛠️', rarity: 'common', requirement: 'Complete Box Breathing or Morning Routine' },
  
  // Streak Badges
  { id: 'streak-7', name: '7-Day Streak', description: 'Train for 7 consecutive days', icon: '🔥', rarity: 'rare', requirement: 'Maintain 7-day streak' },
  { id: 'streak-30', name: '30-Day Warrior', description: 'Train for 30 consecutive days', icon: '⚡', rarity: 'epic', requirement: 'Maintain 30-day streak' },
  { id: 'streak-100', name: '100-Day Legend', description: 'Train for 100 consecutive days', icon: '💎', rarity: 'legendary', requirement: 'Maintain 100-day streak' },
  
  // Belt Badges
  { id: 'white-belt', name: 'White Belt', description: 'Master vulnerability-based trust', icon: '⚪', rarity: 'rare', requirement: 'Complete all White Belt stripes' },
  { id: 'blue-belt', name: 'Blue Belt', description: 'Master productive conflict', icon: '🔵', rarity: 'rare', requirement: 'Complete all Blue Belt stripes' },
  { id: 'purple-belt', name: 'Purple Belt', description: 'Master commitment clarity', icon: '🟣', rarity: 'epic', requirement: 'Complete all Purple Belt stripes' },
  { id: 'brown-belt', name: 'Brown Belt', description: 'Master accountability', icon: '🟤', rarity: 'epic', requirement: 'Complete all Brown Belt stripes' },
  { id: 'black-belt', name: 'Black Belt', description: 'Achieve ultimate mastery', icon: '⚫', rarity: 'legendary', requirement: 'Complete all Black Belt stripes' },
  
  // Achievement Badges
  { id: 'speed-demon', name: 'Speed Demon', description: 'Complete 10 activities in one day', icon: '💨', rarity: 'rare', requirement: 'Complete 10 activities in 24 hours' },
  { id: 'deep-thinker', name: 'Deep Thinker', description: 'Complete all deep-dive assessments', icon: '🧠', rarity: 'epic', requirement: 'Complete all 7 assessments' },
  { id: 'belt-collector', name: 'Belt Collector', description: 'Earn all 5 belts', icon: '🏆', rarity: 'legendary', requirement: 'Complete all 5 belts' },
  { id: 'early-riser', name: 'Early Riser', description: 'Complete Morning Routine 10 times', icon: '🌅', rarity: 'rare', requirement: 'Complete Morning Routine 10x' },
  { id: 'zen-master', name: 'Zen Master', description: 'Complete Box Breathing 25 times', icon: '🧘', rarity: 'epic', requirement: 'Complete Box Breathing 25x' },
  
  // Special Badges
  { id: 'founding-member', name: 'Founding Member', description: 'One of the first 100 users', icon: '👑', rarity: 'legendary', requirement: 'Join in first 100 users' },
  { id: 'completionist', name: 'Completionist', description: 'Complete every piece of content', icon: '💯', rarity: 'legendary', requirement: 'Achieve 100% completion' }
];

const rarityColors = {
  common: 'from-slate-400 to-slate-600',
  rare: 'from-blue-500 to-blue-700',
  epic: 'from-purple-500 to-purple-700',
  legendary: 'from-yellow-500 to-orange-600'
};

const rarityGlow = {
  common: 'shadow-slate-500/50',
  rare: 'shadow-blue-500/50',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-yellow-500/50'
};

export function Badges() {
  const { stats } = useGamification();
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  useEffect(() => {
    // Get earned badges from stats or localStorage
    const badges = stats.badges || [];
    setEarnedBadges(badges);
  }, [stats.badges]);

  const getBadgeProgress = (badge: Badge): number => {
    // Simple progress logic - in production would check actual completion
    switch (badge.id) {
      case 'first-stripe':
      case 'first-assessment':
      case 'first-tool':
        return earnedBadges.includes(badge.id) ? 100 : 0;
      case 'streak-7':
        return Math.min((stats.streak.currentStreak / 7) * 100, 100);
      case 'streak-30':
        return Math.min((stats.streak.currentStreak / 30) * 100, 100);
      case 'streak-100':
        return Math.min((stats.streak.currentStreak / 100) * 100, 100);
      default:
        return earnedBadges.includes(badge.id) ? 100 : 0;
    }
  };

  const isEarned = (badgeId: string) => earnedBadges.includes(badgeId);

  const earnedCount = allBadges.filter(b => isEarned(b.id)).length;
  const totalBadges = allBadges.length;
  const progressPercentage = (earnedCount / totalBadges) * 100;

  return (
    /* RESPONSIVE: Mobile-first approach with responsive padding */
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* RESPONSIVE: Centered container with max-width */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Header - RESPONSIVE padding and typography */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          {/* RESPONSIVE: Padding scales from mobile to desktop */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 text-center">
            {/* RESPONSIVE: Icon size scales with screen size */}
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto mb-4 sm:mb-6" />
            {/* RESPONSIVE: Heading scales from 2xl (24px) to 5xl (48px) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Badge Collection</h1>
            {/* RESPONSIVE: Subtitle scales from base (16px) to xl (20px) */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
              Track your achievements and unlock exclusive badges
            </p>

            {/* RESPONSIVE: Grid adapts from 2 cols mobile to 4 cols desktop, with responsive gaps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {/* RESPONSIVE: Stat cards with responsive padding and text */}
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                {/* RESPONSIVE: Numbers scale from 2xl to 4xl */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500">{earnedCount}</div>
                {/* RESPONSIVE: Labels scale from xs to sm */}
                <div className="text-slate-400 text-xs sm:text-sm">Earned</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">{totalBadges}</div>
                <div className="text-slate-400 text-xs sm:text-sm">Total</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">{Math.round(progressPercentage)}%</div>
                <div className="text-slate-400 text-xs sm:text-sm">Complete</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400">
                  {allBadges.filter(b => isEarned(b.id) && b.rarity === 'legendary').length}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">Legendary</div>
              </div>
            </div>

            {/* Progress Bar - RESPONSIVE height and spacing */}
            <div className="mt-4 sm:mt-6">
              {/* RESPONSIVE: Bar height scales from 2px to 3px */}
              <div className="bg-slate-700 h-2 sm:h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Badge Grid - RESPONSIVE: 1 col mobile (320px), 2 cols (375px+), 3 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {allBadges.map((badge, index) => {
            const earned = isEarned(badge.id);
            const progress = getBadgeProgress(badge);
            
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* RESPONSIVE: Badge card with touch-friendly padding and hover effects */}
                <Card
                  className={`relative overflow-hidden transition-all ${
                    earned
                      ? `bg-gradient-to-br ${rarityColors[badge.rarity]} border-2 border-white/20 ${rarityGlow[badge.rarity]} shadow-2xl hover:scale-105 cursor-pointer active:scale-100`
                      : 'bg-slate-800 border-slate-700 hover:border-slate-600 active:bg-slate-700'
                  }`}
                >
                  {/* RESPONSIVE: Padding scales from mobile to desktop */}
                  <div className="p-4 sm:p-5 md:p-6 text-center">
                    {/* Badge Icon - RESPONSIVE: Size scales from 3xl to 6xl */}
                    <div className={`text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 ${earned ? '' : 'filter grayscale opacity-30'}`}>
                      {earned ? badge.icon : '🔒'}
                    </div>

                    {/* Badge Name - RESPONSIVE: Text scales from sm to lg */}
                    <h3 className={`font-bold text-sm sm:text-base md:text-lg mb-2 ${earned ? 'text-white' : 'text-slate-400'} break-words`}>
                      {badge.name}
                    </h3>

                    {/* Badge Description - RESPONSIVE: Text scales, proper line height */}
                    <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${earned ? 'text-white/80' : 'text-slate-500'} leading-relaxed`}>
                      {badge.description}
                    </p>

                    {/* Rarity Badge - RESPONSIVE: Touch-friendly padding */}
                    <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                      badge.rarity === 'legendary' ? 'bg-yellow-500 text-slate-900' :
                      badge.rarity === 'epic' ? 'bg-purple-500 text-white' :
                      badge.rarity === 'rare' ? 'bg-blue-500 text-white' :
                      'bg-slate-600 text-white'
                    }`}>
                      {badge.rarity.toUpperCase()}
                    </div>

                    {/* Progress for in-progress badges - RESPONSIVE */}
                    {!earned && progress > 0 && progress < 100 && (
                      <div className="mt-3 sm:mt-4">
                        {/* RESPONSIVE: Progress bar height */}
                        <div className="bg-slate-700 h-1.5 sm:h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-slate-400 text-xs mt-1">{Math.round(progress)}% complete</p>
                      </div>
                    )}

                    {/* Requirement - RESPONSIVE: Spacing and text */}
                    {!earned && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700">
                        <p className="text-slate-500 text-xs leading-relaxed flex items-start justify-center gap-1">
                          <Lock className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          <span>{badge.requirement}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Shine Effect for Legendary */}
                  {earned && badge.rarity === 'legendary' && (
                    <motion.div
                      animate={{
                        opacity: [0, 0.5, 0],
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                      style={{ width: '50%' }}
                    />
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Motivation Message - RESPONSIVE */}
        {earnedCount < totalBadges && (
          <Card className="mt-6 sm:mt-8 bg-slate-800 border-slate-700">
            {/* RESPONSIVE: Padding scales from mobile to desktop */}
            <div className="p-6 sm:p-8 text-center">
              {/* RESPONSIVE: Icon size */}
              <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
              {/* RESPONSIVE: Heading scales */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Keep Going!
              </h3>
              {/* RESPONSIVE: Text scales with proper line height */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                You've earned {earnedCount} of {totalBadges} badges. Continue your journey to unlock more achievements!
              </p>
            </div>
          </Card>
        )}

        {/* Completionist Message - RESPONSIVE */}
        {earnedCount === totalBadges && (
          <Card className="mt-6 sm:mt-8 bg-gradient-to-br from-yellow-500 to-orange-500 border-yellow-400">
            {/* RESPONSIVE: Padding scales */}
            <div className="p-6 sm:p-8 text-center">
              {/* RESPONSIVE: Icon size and animation */}
              <Crown className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white mx-auto mb-3 sm:mb-4 animate-pulse" />
              {/* RESPONSIVE: Heading scales from xl to 3xl */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                COMPLETIONIST!
              </h3>
              {/* RESPONSIVE: Text scales with proper line height */}
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                You've earned every single badge! You are a true TAP-IN master! 🏆
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

