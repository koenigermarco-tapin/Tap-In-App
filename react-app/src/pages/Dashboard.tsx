import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, Target, BookOpen, TrendingUp, Calendar, 
  ArrowRight, Flame, Trophy, Clock, ChevronRight, Award,
  Activity, CheckCircle, Lock, Play, BarChart3
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BeltBadge } from '@/components/ui/BeltBadge';
import { FirstTimeOnboarding } from '@/components/onboarding/FirstTimeOnboarding';
import type { BeltLevel } from '@/types';

// Motivational quotes rotation
const QUOTES = [
  { text: "Discipline equals freedom.", author: "Jocko Willink" },
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.", author: "Bruce Lee" },
  { text: "Leadership is not about being in charge. It's about taking care of those in your charge.", author: "Simon Sinek" },
  { text: "Vulnerability is not winning or losing; it's having the courage to show up and be seen.", author: "Brené Brown" },
  { text: "The quality of your life is determined by the quality of the questions you ask.", author: "Tony Robbins" },
  { text: "We don't rise to the level of our expectations; we fall to the level of our training.", author: "Archilochus" },
  { text: "Excellence is not a skill, it's an attitude.", author: "Ralph Marston" },
];

// Achievement definitions
const ACHIEVEMENTS = [
  { id: 'first-step', title: 'First Step', description: 'Complete your first lesson', icon: '🎯', threshold: 1, check: (stats: any) => stats.totalXP >= 25 },
  { id: 'stripe-earned', title: 'Stripe Earned', description: 'Complete your first stripe', icon: '🥋', threshold: 1, check: (stats: any) => stats.totalXP >= 125 },
  { id: 'white-belt', title: 'White Belt Master', description: 'Complete White Belt', icon: '⚪', threshold: 1, check: (stats: any) => stats.beltProgress.completedStripes.white === 4 },
  { id: 'blue-belt', title: 'Blue Belt Master', description: 'Complete Blue Belt', icon: '🔵', threshold: 1, check: (stats: any) => stats.beltProgress.completedStripes.blue === 4 },
  { id: 'purple-belt', title: 'Purple Belt Master', description: 'Complete Purple Belt', icon: '🟣', threshold: 1, check: (stats: any) => stats.beltProgress.completedStripes.purple === 4 },
  { id: 'brown-belt', title: 'Brown Belt Master', description: 'Complete Brown Belt', icon: '🟤', threshold: 1, check: (stats: any) => stats.beltProgress.completedStripes.brown === 4 },
  { id: 'black-belt', title: 'Black Belt Master', description: 'Complete entire curriculum', icon: '⚫', threshold: 1, check: (stats: any) => stats.beltProgress.completedStripes.black === 4 },
  { id: 'week-warrior', title: 'Week Warrior', description: '7-day streak', icon: '🔥', threshold: 7, check: (stats: any) => stats.streak.currentStreak >= 7 },
  { id: 'dedicated-learner', title: 'Dedicated Learner', description: '30-day streak', icon: '💪', threshold: 30, check: (stats: any) => stats.streak.currentStreak >= 30 },
  { id: 'century-club', title: 'Century Club', description: 'Earn 100 XP', icon: '💯', threshold: 100, check: (stats: any) => stats.totalXP >= 100 },
  { id: 'xp-master', title: 'XP Master', description: 'Earn 1000 XP', icon: '⭐', threshold: 1000, check: (stats: any) => stats.totalXP >= 1000 },
];

export function Dashboard() {
  const { user, profile } = useAuth();
  const { stats, BELT_XP_THRESHOLDS, getNextBelt } = useGamification();
  const navigate = useNavigate();
  const [dayOfYear, setDayOfYear] = useState(0);

  useEffect(() => {
    // Calculate day of year for quote rotation
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    setDayOfYear(Math.floor(diff / oneDay));
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const currentBelt = stats.beltProgress.currentBelt;
  const nextBelt = getNextBelt(currentBelt);
  const currentBeltXP = BELT_XP_THRESHOLDS[currentBelt];
  const nextBeltXP = nextBelt ? BELT_XP_THRESHOLDS[nextBelt] : BELT_XP_THRESHOLDS.black + 5000;
  const progressToNextBelt = ((stats.totalXP - currentBeltXP) / (nextBeltXP - currentBeltXP)) * 100;

  // Calculate total lessons completed (rough estimate from XP)
  const totalLessonsCompleted = Math.floor(stats.totalXP / 25);
  const totalStripesEarned = Object.values(stats.beltProgress.completedStripes).reduce((sum: number, stripes) => sum + stripes, 0);
  const beltsCompleted = (['white', 'blue', 'purple', 'brown', 'black'] as const).filter(
    belt => stats.beltProgress.completedStripes[belt] === 4
  ).length;

  // Weekly activity data (mock for now, can be pulled from Supabase later)
  const weeklyActivityData = [
    { day: 'Mon', lessons: stats.streak.currentStreak >= 7 ? 2 : 0 },
    { day: 'Tue', lessons: stats.streak.currentStreak >= 6 ? 1 : 0 },
    { day: 'Wed', lessons: stats.streak.currentStreak >= 5 ? 3 : 0 },
    { day: 'Thu', lessons: stats.streak.currentStreak >= 4 ? 1 : 0 },
    { day: 'Fri', lessons: stats.streak.currentStreak >= 3 ? 2 : 0 },
    { day: 'Sat', lessons: stats.streak.currentStreak >= 2 ? 1 : 0 },
    { day: 'Sun', lessons: stats.streak.currentStreak >= 1 ? 2 : 0 },
  ];

  // Get next incomplete lesson
  const getNextLesson = () => {
    const belts: BeltLevel[] = ['white', 'blue', 'purple', 'brown', 'black'];
    for (const belt of belts) {
      const completedStripes = stats.beltProgress.completedStripes[belt];
      if (completedStripes < 4) {
        const nextStripe = completedStripes + 1;
        return {
          belt,
          stripe: nextStripe,
          title: `${belt.charAt(0).toUpperCase() + belt.slice(1)} Belt - Stripe ${nextStripe}`,
          href: `/belt-system/${belt}/stripe-${nextStripe}`,
          timeEstimate: '10-15 min'
        };
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();

  // Today's quote (rotates based on day of year)
  const todayQuote = QUOTES[dayOfYear % QUOTES.length];

  // Calculate earned achievements
  const earnedAchievements = ACHIEVEMENTS.filter(achievement => achievement.check(stats));

  const quickAssessments = [
    { id: 'worker-type', title: 'Worker Type', icon: '🏃', time: '2-3 min', href: '/assessments/worker-type' },
    { id: 'mental-health', title: 'Mental Wellness', icon: '💚', time: '3 min', href: '/assessments/mental-health' },
    { id: 'work-life', title: 'Work-Life Balance', icon: '⚖️', time: '3 min', href: '/assessments/work-life-balance' },
    { id: 'leadership', title: 'Leadership Style', icon: '👑', time: '5 min', href: '/assessments/leadership-style' },
  ];

  const openMatTools = [
    { id: 'box-breathing', title: 'Box Breathing', icon: '🌬️', time: '4 min', href: '/open-mat/box-breathing' },
    { id: 'morning-routine', title: '5-Min Morning', icon: '🌅', time: '5 min', href: '/open-mat/morning-routine' },
    { id: 'energy-audit', title: 'Energy Audit', icon: '⚡', time: '10 min', href: '/open-mat/energy-audit' },
    { id: 'weekly-review', title: 'Weekly Review', icon: '📋', time: '15 min', href: '/open-mat/weekly-review' },
  ];

  // Calculate completion percentage
  const overallCompletion = (totalStripesEarned / 20) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-8">
      {/* First-time user onboarding */}
      <FirstTimeOnboarding />

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 break-words">
          {greeting()}, {profile?.name || user?.email?.split('@')[0] || 'Champion'}!
        </h1>
        <p className="text-white/60 text-sm sm:text-base">{today}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* 1. PROGRESS OVERVIEW CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700 relative overflow-hidden">
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-4xl sm:text-5xl md:text-6xl opacity-10">🥋</div>
              
              <CardHeader>
                <CardTitle icon={<Target className="w-5 h-5 text-gold-300" />}>
                  Belt Progress
                </CardTitle>
                <BeltBadge belt={currentBelt} stripe={stats.beltProgress.currentStripe} />
              </CardHeader>

              <CardContent>
                {/* XP Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-white/60">Progress to {nextBelt || 'mastery'}</span>
                    <span className="text-gold-300 font-medium">{stats.totalXP.toLocaleString()} XP</span>
                  </div>
                  <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progressToNextBelt, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-gold-300 to-gold-400 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-white/40 mt-1">
                    {nextBelt ? `${(nextBeltXP - stats.totalXP).toLocaleString()} XP to ${nextBelt} belt` : 'Maximum belt achieved!'}
                  </p>
                </div>

                {/* Overall Journey Completion */}
                <div className="mb-4 p-3 sm:p-4 bg-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-white/70">Overall Journey</span>
                    <span className="text-sm sm:text-base font-bold text-gold-300">{Math.round(overallCompletion)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-gold-400 rounded-full"
                      style={{ width: `${overallCompletion}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-1">{totalStripesEarned}/20 stripes earned</p>
                </div>

                {/* Belt Grid */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center mb-4">
                  {(['white', 'blue', 'purple', 'brown', 'black'] as const).map((belt) => {
                    const isCompleted = BELT_XP_THRESHOLDS[belt] <= stats.totalXP;
                    const isCurrent = belt === currentBelt;
                    return (
                      <div
                        key={belt}
                        className={`p-1.5 sm:p-2 rounded-lg ${
                          isCurrent
                            ? 'bg-gold-300/20 border border-gold-300/30'
                            : isCompleted
                            ? 'bg-white/5'
                            : 'bg-white/5 opacity-40'
                        }`}
                      >
                        <BeltBadge belt={belt} size="sm" showLabel={false} />
                      </div>
                    );
                  })}
                </div>

                {/* Current Streak */}
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl border border-orange-500/30 mb-3">
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-white">{stats.streak.currentStreak} Day Streak</p>
                    <p className="text-xs text-white/50">Longest: {stats.streak.longestStreak} days</p>
                  </div>
                </div>

                <Link to="/belt-system" className="mt-3 sm:mt-4 block">
                  <Button variant="secondary" fullWidth icon={<ArrowRight className="w-4 h-4" />} className="min-h-[44px]">
                    Continue Training
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. WEEKLY ACTIVITY CHART */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<BarChart3 className="w-5 h-5 text-gold-300" />}>
                  Weekly Activity
                </CardTitle>
                <span className="text-xs sm:text-sm text-white/50">Last 7 days</span>
              </CardHeader>

              <CardContent>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="day" 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="lessons" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. BELT JOURNEY MAP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Target className="w-5 h-5 text-gold-300" />}>
                  Belt Journey
                </CardTitle>
                <span className="text-xs sm:text-sm text-white/50">{beltsCompleted}/5 belts completed</span>
              </CardHeader>

              <CardContent>
                {/* Desktop: Horizontal Timeline */}
                <div className="hidden md:flex items-center justify-between gap-2">
                  {(['white', 'blue', 'purple', 'brown', 'black'] as const).map((belt, index) => {
                    const isCompleted = stats.beltProgress.completedStripes[belt] === 4;
                    const isCurrent = belt === currentBelt;
                    const isUnlocked = BELT_XP_THRESHOLDS[belt] <= stats.totalXP;
                    
                    return (
                      <div key={belt} className="flex items-center flex-1">
                        <Link 
                          to={`/belt-system/${belt}`}
                          className={`flex-1 ${!isUnlocked ? 'pointer-events-none' : ''}`}
                        >
                          <div className={`
                            p-3 rounded-xl border-2 transition-all
                            ${isCurrent ? 'border-gold-300 bg-gold-300/10 animate-pulse' : ''}
                            ${isCompleted && !isCurrent ? 'border-emerald-500 bg-emerald-500/10' : ''}
                            ${!isUnlocked ? 'border-white/10 bg-white/5 opacity-40' : ''}
                            ${isUnlocked && !isCompleted && !isCurrent ? 'border-white/20 bg-white/5' : ''}
                            hover:border-gold-300/50
                          `}>
                            <div className="flex flex-col items-center gap-2">
                              {isCompleted ? (
                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                              ) : !isUnlocked ? (
                                <Lock className="w-6 h-6 text-white/30" />
                              ) : (
                                <BeltBadge belt={belt} size="sm" showLabel={false} />
                              )}
                              <p className={`text-xs font-semibold text-center capitalize ${
                                isCurrent ? 'text-gold-300' : isCompleted ? 'text-emerald-400' : 'text-white/60'
                              }`}>
                                {belt}
                              </p>
                              <p className="text-xs text-white/40">{stats.beltProgress.completedStripes[belt]}/4</p>
                            </div>
                          </div>
                        </Link>
                        {index < 4 && (
                          <div className={`h-0.5 w-4 ${isCompleted ? 'bg-emerald-500' : 'bg-white/20'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: Vertical Stack */}
                <div className="md:hidden space-y-2">
                  {(['white', 'blue', 'purple', 'brown', 'black'] as const).map((belt) => {
                    const isCompleted = stats.beltProgress.completedStripes[belt] === 4;
                    const isCurrent = belt === currentBelt;
                    const isUnlocked = BELT_XP_THRESHOLDS[belt] <= stats.totalXP;
                    
                    return (
                      <Link 
                        key={belt}
                        to={`/belt-system/${belt}`}
                        className={`block ${!isUnlocked ? 'pointer-events-none' : ''}`}
                      >
                        <div className={`
                          p-3 rounded-xl border-2 transition-all flex items-center gap-3
                          ${isCurrent ? 'border-gold-300 bg-gold-300/10' : ''}
                          ${isCompleted && !isCurrent ? 'border-emerald-500 bg-emerald-500/10' : ''}
                          ${!isUnlocked ? 'border-white/10 bg-white/5 opacity-40' : ''}
                          ${isUnlocked && !isCompleted && !isCurrent ? 'border-white/20 bg-white/5' : ''}
                        `}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                          ) : !isUnlocked ? (
                            <Lock className="w-6 h-6 text-white/30 flex-shrink-0" />
                          ) : (
                            <BeltBadge belt={belt} size="sm" showLabel={false} />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold capitalize ${
                              isCurrent ? 'text-gold-300' : isCompleted ? 'text-emerald-400' : 'text-white'
                            }`}>
                              {belt} Belt
                            </p>
                            <p className="text-xs text-white/50">{stats.beltProgress.completedStripes[belt]}/4 stripes</p>
                          </div>
                          {isCurrent && <span className="text-xs text-gold-300 font-semibold">Current</span>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4. NEXT UP CARD */}
          {nextLesson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-700/50">
                <CardHeader>
                  <CardTitle icon={<Play className="w-5 h-5 text-gold-300" />}>
                    Next Up
                  </CardTitle>
                  <span className="text-xs sm:text-sm text-white/50">{nextLesson.timeEstimate}</span>
                </CardHeader>

                <CardContent>
                  <Link to={nextLesson.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 sm:p-5 bg-gradient-to-r from-gold-300/10 to-gold-400/10 rounded-xl border-2 border-gold-300/30 hover:border-gold-300/60 transition-all"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-gold-300/80 mb-1">Continue your journey</p>
                          <p className="text-base sm:text-lg font-bold text-white mb-1">{nextLesson.title}</p>
                          <p className="text-xs text-white/50">{nextLesson.timeEstimate} to complete</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gold-300 flex-shrink-0" />
                      </div>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Completion Celebration */}
          {!nextLesson && totalStripesEarned === 20 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="bg-gradient-to-br from-emerald-900/50 to-gold-900/50 border-emerald-700/50">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="text-4xl sm:text-5xl mb-4">🏆</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Journey Complete!</h3>
                  <p className="text-sm sm:text-base text-white/70 mb-4">You've mastered all 20 stripes and 80 lessons. You are a Black Belt.</p>
                  <Link to="/belt-system">
                    <Button variant="primary" className="min-h-[44px]">
                      Review Your Journey
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 6. STATS GRID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Activity className="w-5 h-5 text-gold-300" />}>
                  Your Statistics
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-gold-300">{totalLessonsCompleted}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Lessons</p>
                    <p className="text-xs text-white/40">/ 80 total</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-purple-400">{totalStripesEarned}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Stripes</p>
                    <p className="text-xs text-white/40">/ 20 total</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{beltsCompleted}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Belts</p>
                    <p className="text-xs text-white/40">/ 5 total</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-orange-400">{stats.streak.longestStreak}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Best Streak</p>
                    <p className="text-xs text-white/40">days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 5. ACHIEVEMENTS PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Award className="w-5 h-5 text-gold-300" />}>
                  Achievements
                </CardTitle>
                <Link to="/badges" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">
                  View all →
                </Link>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                  {ACHIEVEMENTS.slice(0, 12).map((achievement) => {
                    const earned = achievement.check(stats);
                    return (
                      <motion.div
                        key={achievement.id}
                        whileHover={earned ? { scale: 1.1 } : {}}
                        className={`
                          p-2 sm:p-3 rounded-xl border-2 text-center transition-all
                          ${earned 
                            ? 'border-gold-300/50 bg-gold-300/10' 
                            : 'border-white/10 bg-white/5 opacity-40'
                          }
                        `}
                      >
                        <div className="text-2xl sm:text-3xl mb-1">{achievement.icon}</div>
                        <p className={`text-xs font-medium break-words ${
                          earned ? 'text-white' : 'text-white/40'
                        }`}>
                          {achievement.title.split(' ')[0]}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="text-xs sm:text-sm text-center text-white/50 mt-3">
                  {earnedAchievements.length}/{ACHIEVEMENTS.length} achievements unlocked
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* 8. MOTIVATIONAL QUOTE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-navy-800/50 to-purple-900/50 border-navy-700">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl opacity-30">💭</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base md:text-lg text-white/90 italic leading-relaxed mb-2 break-words">
                      "{todayQuote.text}"
                    </p>
                    <p className="text-xs sm:text-sm text-white/50">— {todayQuote.author}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Assessments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Zap className="w-5 h-5 text-gold-300" />}>
                  Quick Assessments
                </CardTitle>
                <Link to="/assessments" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">
                  View all →
                </Link>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {quickAssessments.map((assessment, index) => (
                    <Link key={assessment.id} to={assessment.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 active:bg-white/15 transition-colors group min-h-[56px]"
                      >
                        <span className="text-xl sm:text-2xl flex-shrink-0">{assessment.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm sm:text-base text-white group-hover:text-gold-300 transition-colors truncate">
                            {assessment.title}
                          </p>
                          <p className="text-xs text-white/40 flex items-center gap-1">
                            <Clock className="w-3 h-3 flex-shrink-0" /> {assessment.time}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Open Mat Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<BookOpen className="w-5 h-5 text-gold-300" />}>
                  Open Mat Tools
                </CardTitle>
                <Link to="/open-mat" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">
                  View all →
                </Link>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {openMatTools.map((tool, index) => (
                    <Link key={tool.id} to={tool.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 active:bg-white/15 transition-colors group min-h-[56px]"
                      >
                        <span className="text-xl sm:text-2xl flex-shrink-0">{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm sm:text-base text-white group-hover:text-gold-300 transition-colors truncate">
                            {tool.title}
                          </p>
                          <p className="text-xs text-white/40 flex items-center gap-1">
                            <Clock className="w-3 h-3 flex-shrink-0" /> {tool.time}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Trophy className="w-5 h-5 text-yellow-400" />}>
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <Link to="/badges">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center gap-2 p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl hover:from-yellow-500/20 hover:to-orange-500/20 active:from-yellow-500/30 active:to-orange-500/30 transition-all border border-yellow-500/20 min-h-[100px] sm:min-h-[120px]"
                    >
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                      <p className="font-medium text-sm sm:text-base text-white text-center">Badges</p>
                      <p className="text-xs text-white/40">{stats.badges?.length || 0} earned</p>
                    </motion.div>
                  </Link>
                  <Link to="/leaderboard">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center gap-2 p-4 sm:p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl hover:from-purple-500/20 hover:to-blue-500/20 active:from-purple-500/30 active:to-blue-500/30 transition-all border border-purple-500/20 min-h-[100px] sm:min-h-[120px]"
                    >
                      <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                      <p className="font-medium text-sm sm:text-base text-white text-center">Leaderboard</p>
                      <p className="text-xs text-white/40">See rankings</p>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Current Stats Snapshot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<TrendingUp className="w-5 h-5 text-gold-300" />}>
                  At a Glance
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4">
                {/* Streak */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-white">{stats.streak.currentStreak} Day Streak</p>
                      <p className="text-xs text-white/50">Keep it going!</p>
                    </div>
                  </div>
                </div>

                {/* XP */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gold-300 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-white">{stats.totalXP.toLocaleString()} XP</p>
                      <p className="text-xs text-white/50">Total earned</p>
                    </div>
                  </div>
                </div>

                {/* Level */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-white">Level {stats.level}</p>
                      <p className="text-xs text-white/50">{500 - (stats.totalXP % 500)} XP to next</p>
                    </div>
                  </div>
                </div>

                {/* Assessments */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-white">
                        {stats.beltProgress.completedAssessments.length} Assessments
                      </p>
                      <p className="text-xs text-white/50">Completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Calendar className="w-5 h-5 text-gold-300" />}>
                  Recommendations
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {nextLesson && (
                    <Link to={nextLesson.href} className="block">
                      <div className="p-3 bg-gold-300/10 border border-gold-300/30 rounded-xl hover:bg-gold-300/20 transition-colors">
                        <p className="font-medium text-sm sm:text-base text-gold-300 mb-1">Resume Learning</p>
                        <p className="text-xs text-white/50 truncate">
                          {nextLesson.title}
                        </p>
                      </div>
                    </Link>
                  )}
                  
                  {stats.streak.currentStreak === 0 && (
                    <Link to="/assessments" className="block">
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl hover:bg-orange-500/20 transition-colors">
                        <p className="font-medium text-sm sm:text-base text-orange-400 mb-1">Start Your Streak!</p>
                        <p className="text-xs text-white/50">
                          Complete an assessment today
                        </p>
                      </div>
                    </Link>
                  )}

                  {beltsCompleted === 0 && totalStripesEarned === 0 && (
                    <Link to="/belt-system/white/stripe-1" className="block">
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-colors">
                        <p className="font-medium text-sm sm:text-base text-emerald-400 mb-1">Begin Your Journey</p>
                        <p className="text-xs text-white/50">
                          Start with White Belt Stripe 1
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* 7. QUICK ACTIONS BAR - Sticky on Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 lg:hidden bg-navy-900/95 backdrop-blur-lg border-t border-white/10 p-3 z-40"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-around gap-2">
          {nextLesson && (
            <button
              onClick={() => navigate(nextLesson.href)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors min-w-[60px]"
            >
              <Play className="w-5 h-5 text-gold-300" />
              <span className="text-xs text-white/70">Resume</span>
            </button>
          )}
          <button
            onClick={() => navigate('/assessments')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors min-w-[60px]"
          >
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-white/70">Assess</span>
          </button>
          <button
            onClick={() => navigate('/belt-system')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors min-w-[60px]"
          >
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-white/70">Belts</span>
          </button>
          <button
            onClick={() => navigate('/badges')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors min-w-[60px]"
          >
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-white/70">Badges</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
