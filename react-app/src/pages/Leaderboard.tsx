import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Flame, TrendingUp, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  total_xp: number;
  current_streak: number;
  belt_level: string;
  badges_earned: number;
}

type LeaderboardType = 'xp' | 'streak' | 'badges';

const beltEmojis: Record<string, string> = {
  white: '⚪',
  blue: '🔵',
  purple: '🟣',
  brown: '🟤',
  black: '⚫'
};

export function Leaderboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<LeaderboardType>('xp');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .rpc('get_leaderboard', {
          leaderboard_type: activeTab,
          limit_count: 100
        });

      if (error) throw error;

      // Add ranks
      const rankedData = data.map((entry: any, index: number) => ({
        ...entry,
        rank: index + 1
      }));

      setLeaderboard(rankedData);

      // Find current user's rank
      if (user) {
        const userEntry = rankedData.find((entry: LeaderboardEntry) => entry.user_id === user.id);
        setUserRank(userEntry ? userEntry.rank : null);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback to mock data for demo
      setLeaderboard(getMockLeaderboard(activeTab));
    } finally {
      setLoading(false);
    }
  };

  const getMockLeaderboard = (type: LeaderboardType): LeaderboardEntry[] => {
    const mockUsers = [
      { username: 'SarahTheLeader', xp: 15000, streak: 87, belt: 'black', badges: 15 },
      { username: 'MikeAccountable', xp: 12500, streak: 65, belt: 'brown', badges: 12 },
      { username: 'EmilyCommitted', xp: 10800, streak: 120, belt: 'purple', badges: 10 },
      { username: 'JohnConflictMaster', xp: 9200, streak: 45, belt: 'purple', badges: 9 },
      { username: 'AlexTrustBuilder', xp: 8500, streak: 30, belt: 'blue', badges: 8 },
      { username: 'LisaResults', xp: 7800, streak: 92, belt: 'blue', badges: 7 },
      { username: 'DavidVulnerable', xp: 6900, streak: 15, belt: 'white', badges: 6 },
      { username: 'RachelGrowth', xp: 6200, streak: 28, belt: 'white', badges: 5 },
      { username: 'TomLeadership', xp: 5500, streak: 60, belt: 'blue', badges: 4 },
      { username: 'YouCurrentUser', xp: 5000, streak: 12, belt: 'white', badges: 3 }
    ];

    return mockUsers
      .sort((a, b) => {
        if (type === 'xp') return b.xp - a.xp;
        if (type === 'streak') return b.streak - a.streak;
        return b.badges - a.badges;
      })
      .map((user, index) => ({
        rank: index + 1,
        user_id: user.username === 'YouCurrentUser' ? 'current-user' : `mock-${index}`,
        username: user.username,
        total_xp: user.xp,
        current_streak: user.streak,
        belt_level: user.belt,
        badges_earned: user.badges
      }));
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-slate-400 font-bold">#{rank}</span>;
  };

  const getTabIcon = (tab: LeaderboardType) => {
    if (tab === 'xp') return <Trophy className="w-5 h-5" />;
    if (tab === 'streak') return <Flame className="w-5 h-5" />;
    return <Target className="w-5 h-5" />;
  };

  const getValueDisplay = (entry: LeaderboardEntry) => {
    if (activeTab === 'xp') return `${entry.total_xp.toLocaleString()} XP`;
    if (activeTab === 'streak') return `${entry.current_streak} days`;
    return `${entry.badges_earned} badges`;
  };

  return (
    /* RESPONSIVE: Mobile-first padding */
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      {/* RESPONSIVE: Centered container */}
      <div className="max-w-4xl mx-auto w-full">
        {/* Header - RESPONSIVE */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          {/* RESPONSIVE: Padding scales */}
          <div className="p-6 sm:p-8 text-center">
            {/* RESPONSIVE: Icon size */}
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto mb-3 sm:mb-4" />
            {/* RESPONSIVE: Heading scales from 2xl to 5xl */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">Leaderboard</h1>
            {/* RESPONSIVE: Subtitle scales */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl">
              See how you rank against other leaders in The Gym
            </p>
          </div>
        </Card>

        {/* Tabs - RESPONSIVE: Touch-friendly buttons */}
        <div className="flex gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab('xp')}
            /* RESPONSIVE: Padding scales, touch target 44px min-height, text scales, flex-wrap */
            className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all min-h-[44px] text-xs sm:text-sm md:text-base ${
              activeTab === 'xp'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 active:bg-slate-600'
            }`}
          >
            {/* Icon scales appropriately */}
            <span className="flex-shrink-0">{getTabIcon('xp')}</span>
            <span className="hidden sm:inline">Total XP</span>
            <span className="sm:hidden">XP</span>
          </button>
          <button
            onClick={() => setActiveTab('streak')}
            className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all min-h-[44px] text-xs sm:text-sm md:text-base ${
              activeTab === 'streak'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 active:bg-slate-600'
            }`}
          >
            <span className="flex-shrink-0">{getTabIcon('streak')}</span>
            <span>Streak</span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all min-h-[44px] text-xs sm:text-sm md:text-base ${
              activeTab === 'badges'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 active:bg-slate-600'
            }`}
          >
            <span className="flex-shrink-0">{getTabIcon('badges')}</span>
            <span>Badges</span>
          </button>
        </div>

        {/* Your Rank Card - RESPONSIVE */}
        {userRank && (
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400">
            {/* RESPONSIVE: Padding and flex layout */}
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                {/* RESPONSIVE: Rank icon size */}
                <div className="text-2xl sm:text-3xl flex-shrink-0">{getRankIcon(userRank)}</div>
                <div className="min-w-0 flex-1">
                  {/* RESPONSIVE: Text scales */}
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">Your Rank</div>
                  <div className="text-white/80 text-xs sm:text-sm md:text-base truncate">You're #{userRank} in {activeTab}</div>
                </div>
              </div>
              {/* RESPONSIVE: Icon size */}
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0" />
            </div>
          </Card>
        )}

        {/* Leaderboard List - RESPONSIVE */}
        <Card className="bg-slate-800 border-slate-700 overflow-hidden">
          {loading ? (
            /* RESPONSIVE: Loading state padding */
            <div className="p-8 sm:p-12 text-center">
              {/* RESPONSIVE: Spinner size */}
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-3 sm:mb-4" />
              <p className="text-slate-400 text-sm sm:text-base">Loading leaderboard...</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = entry.user_id === user?.id;
                
                return (
                  <motion.div
                    key={entry.user_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    /* RESPONSIVE: Padding scales, flex direction changes, touch-friendly */
                    className={`p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-700/50 active:bg-slate-700 transition-colors ${
                      isCurrentUser ? 'bg-purple-900/30 border-l-4 border-purple-500' : ''
                    }`}
                  >
                    {/* Left: Rank + User - RESPONSIVE layout */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-1 w-full sm:w-auto min-w-0">
                      {/* Rank - RESPONSIVE: Width scales */}
                      <div className="w-8 sm:w-10 md:w-12 flex justify-center flex-shrink-0">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* User Info - RESPONSIVE: Allow text to wrap and truncate properly */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          {/* RESPONSIVE: Text scales, allows wrapping on very small screens */}
                          <span className={`font-bold text-sm sm:text-base md:text-lg break-words ${isCurrentUser ? 'text-purple-400' : 'text-white'}`}>
                            {entry.username}
                            {isCurrentUser && <span className="text-purple-400 ml-1 sm:ml-2">(You)</span>}
                          </span>
                          {/* RESPONSIVE: Emoji size */}
                          <span className="text-xl sm:text-2xl flex-shrink-0">{beltEmojis[entry.belt_level] || '⚪'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Value - RESPONSIVE: Align right on mobile too */}
                    <div className="text-right self-end sm:self-auto w-full sm:w-auto">
                      {/* RESPONSIVE: Value text scales */}
                      <div className="text-xl sm:text-2xl font-bold text-purple-400">
                        {getValueDisplay(entry)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Motivational Footer - RESPONSIVE */}
        <Card className="mt-6 sm:mt-8 bg-slate-800 border-slate-700">
          {/* RESPONSIVE: Padding scales */}
          <div className="p-6 sm:p-8 text-center">
            {/* RESPONSIVE: Quote text scales */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg italic leading-relaxed">
              "The only person you should try to be better than is the person you were yesterday."
            </p>
            {/* RESPONSIVE: Attribution text */}
            <p className="text-slate-500 mt-2 text-xs sm:text-sm">- Anonymous</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

