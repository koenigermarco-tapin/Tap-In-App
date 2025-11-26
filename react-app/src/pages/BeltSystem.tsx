import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock, Clock, BookOpen } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BeltBadge } from '@/components/ui/BeltBadge';
import type { BeltLevel } from '@/types';

interface BeltData {
  level: BeltLevel;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  topics: string[];
  stripes: {
    title: string;
    description: string;
    href: string;
  }[];
}

const beltsData: BeltData[] = [
  {
    level: 'white',
    title: 'White Belt',
    subtitle: 'Absence of Trust (Foundation)',
    description: 'Build vulnerability-based trust—the foundation of all high-performing teams. Learn to be honest about weaknesses, mistakes, and gaps without fear.',
    duration: '35-45 min',
    topics: ['Vulnerability', 'Psychological safety', 'Self-awareness', 'Trust foundations'],
    stripes: [
      { title: 'Stripe 1: Trust Foundations', description: 'Theory & frameworks behind vulnerability-based trust', href: '/belt-system/white/stripe-1' },
      { title: 'Stripe 2: Practicing Vulnerability', description: 'Personal exercises to develop vulnerability capacity', href: '/belt-system/white/stripe-2' },
      { title: 'Stripe 3: Building Team Trust', description: 'Scale individual vulnerability into team-level systems', href: '/belt-system/white/stripe-3' },
      { title: 'Stripe 4: Trust Mastery', description: 'Trust repair and maintenance rituals', href: '/belt-system/white/stripe-4' },
    ],
  },
  {
    level: 'blue',
    title: 'Blue Belt',
    subtitle: 'Fear of Conflict (Healthy Debate)',
    description: 'Master productive conflict. Learn to disagree without destroying relationships, have hard conversations with compassion, and create environments where truth beats harmony.',
    duration: '40-50 min',
    topics: ['Productive conflict', 'Difficult conversations', 'Active listening', 'Feedback systems', 'Boundaries'],
    stripes: [
      { title: 'Stripe 1: Difficult Conversations', description: 'Having hard talks without fear', href: '/belt-system/blue/stripe-1' },
      { title: 'Stripe 2: Active Listening', description: 'Deep listening under pressure', href: '/belt-system/blue/stripe-2' },
      { title: 'Stripe 3: Feedback Systems', description: 'Creating continuous feedback loops', href: '/belt-system/blue/stripe-3' },
      { title: 'Stripe 4: Boundaries', description: 'Setting and holding healthy limits', href: '/belt-system/blue/stripe-4' },
    ],
  },
  {
    level: 'purple',
    title: 'Purple Belt',
    subtitle: 'Lack of Commitment (Buy-In)',
    description: 'Build true commitment through healthy conflict and alignment. Move from compliance to genuine buy-in. Create teams that commit even when they disagree.',
    duration: '40-50 min',
    topics: ['Team alignment', 'Shared goals', 'Collective accountability', 'Results focus', 'Buy-in'],
    stripes: [
      { title: 'Stripe 1: Team Alignment & Shared Goals', description: 'Creating collective direction', href: '/belt-system/purple/stripe-1' },
      { title: 'Stripe 2: Healthy Conflict', description: 'Disagreement as a path to commitment', href: '/belt-system/purple/stripe-2' },
      { title: 'Stripe 3: Collective Accountability', description: 'Team responsibility for outcomes', href: '/belt-system/purple/stripe-3' },
      { title: 'Stripe 4: Results Focus', description: 'Collective outcomes over individual wins', href: '/belt-system/purple/stripe-4' },
    ],
  },
  {
    level: 'brown',
    title: 'Brown Belt',
    subtitle: 'Avoidance of Accountability (Peer Pressure)',
    description: 'Master peer-to-peer accountability. Learn to call out performance gaps, hold high standards, and create cultures where accountability flows sideways, not just top-down.',
    duration: '40-50 min',
    topics: ['Peer accountability', 'Standards', 'Performance gaps', 'Direct feedback', 'Consequences'],
    stripes: [
      { title: 'Stripe 1: Accountability Foundation', description: 'Understanding real accountability', href: '/belt-system/brown/stripe-1' },
      { title: 'Stripe 2: Accountability Depth', description: 'Peer-to-peer accountability systems', href: '/belt-system/brown/stripe-2' },
      { title: 'Stripe 3: Accountability Systems', description: 'Structures that sustain accountability', href: '/belt-system/brown/stripe-3' },
      { title: 'Stripe 4: Accountability Mastery', description: 'High standards without fear', href: '/belt-system/brown/stripe-4' },
    ],
  },
  {
    level: 'black',
    title: 'Black Belt',
    subtitle: 'Inattention to Results (Collective Outcomes)',
    description: 'Focus on collective results over ego. Teach others what you\'ve learned, build your leadership philosophy, and create lasting impact beyond yourself.',
    duration: '45-59 min',
    topics: ['Collective results', 'Teaching others', 'Leadership philosophy', 'Legacy', 'Integration'],
    stripes: [
      { title: 'Stripe 1: Integration', description: 'Synthesize all prior learnings', href: '/belt-system/black/stripe-1' },
      { title: 'Stripe 2: Teaching Others', description: 'Pass on what you\'ve mastered', href: '/belt-system/black/stripe-2' },
      { title: 'Stripe 3: Leadership Philosophy', description: 'Codify your approach', href: '/belt-system/black/stripe-3' },
      { title: 'Stripe 4: Legacy', description: 'Create lasting impact beyond yourself', href: '/belt-system/black/stripe-4' },
    ],
  },
];

export function BeltSystem() {
  const { stats, BELT_XP_THRESHOLDS } = useGamification();
  const currentBelt = stats.beltProgress.currentBelt;

  const isBeltUnlocked = (belt: BeltLevel) => {
    return stats.totalXP >= BELT_XP_THRESHOLDS[belt];
  };

  const isBeltCompleted = (belt: BeltLevel) => {
    const belts: BeltLevel[] = ['white', 'blue', 'purple', 'brown', 'black'];
    const beltIndex = belts.indexOf(belt);
    const currentIndex = belts.indexOf(currentBelt);
    return beltIndex < currentIndex;
  };

  return (
    /* RESPONSIVE: Mobile-first container */
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header - RESPONSIVE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        {/* RESPONSIVE: Emoji scales */}
        <span className="text-4xl sm:text-5xl mb-3 sm:mb-4 block">🥋</span>
        {/* RESPONSIVE: Heading scales from 2xl to 4xl */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">The Belt System</h1>
        {/* RESPONSIVE: Paragraph scales */}
        <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Train for life's biggest games. Five progressive levels—from learning the fundamentals to championship mindset. Like any sport, mastery takes practice.
        </p>
      </motion.div>

      {/* Current Progress - RESPONSIVE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 sm:mb-8 md:mb-12"
      >
        {/* RESPONSIVE: Card padding scales */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700">
          {/* RESPONSIVE: Flex layout and gaps */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <BeltBadge belt={currentBelt} stripe={stats.beltProgress.currentStripe} size="lg" />
              <div>
                <p className="text-xs sm:text-sm text-white/60">Current Level</p>
                {/* RESPONSIVE: Text scales */}
                <p className="text-lg sm:text-xl font-bold capitalize">{currentBelt} Belt</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs sm:text-sm text-white/60">Total XP</p>
              {/* RESPONSIVE: XP display scales */}
              <p className="text-xl sm:text-2xl font-bold text-gold-300">{stats.totalXP.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Belt Cards - RESPONSIVE spacing */}
      <div className="space-y-4 sm:space-y-6">
        {beltsData.map((belt, index) => {
          const unlocked = isBeltUnlocked(belt.level);
          const completed = isBeltCompleted(belt.level);
          const isCurrent = belt.level === currentBelt;

          return (
            <motion.div
              key={belt.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              {/* RESPONSIVE: Card with proper opacity */}
              <Card className={`overflow-hidden ${!unlocked ? 'opacity-60' : ''} ${isCurrent ? 'border-gold-300/50' : ''}`}>
                {/* Belt Header - RESPONSIVE */}
                <div className={`p-3 sm:p-4 bg-gradient-to-r ${getBeltGradient(belt.level)}`}>
                  {/* RESPONSIVE: Flex layout for mobile */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="flex-shrink-0">
                        <BeltBadge belt={belt.level} showLabel={false} size="lg" />
                      </div>
                      <div className="min-w-0 flex-1">
                        {/* RESPONSIVE: Heading scales, allows wrapping */}
                        <h2 className={`text-lg sm:text-xl font-bold break-words ${belt.level === 'white' ? 'text-gray-900' : 'text-white'}`}>
                          {belt.title}
                        </h2>
                        {/* RESPONSIVE: Subtitle scales */}
                        <p className={`text-xs sm:text-sm ${belt.level === 'white' ? 'text-gray-700' : 'text-white/80'}`}>
                          {belt.subtitle}
                        </p>
                      </div>
                    </div>
                    {/* RESPONSIVE: Status badges wrap on mobile */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {completed && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium whitespace-nowrap">
                          <Check className="w-3 h-3 flex-shrink-0" /> Completed
                        </span>
                      )}
                      {isCurrent && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-gold-300/20 text-gold-300 rounded-full text-xs font-medium whitespace-nowrap">
                          In Progress
                        </span>
                      )}
                      {!unlocked && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-white/10 text-white/60 rounded-full text-xs font-medium whitespace-nowrap">
                          <Lock className="w-3 h-3 flex-shrink-0" /> Locked
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Belt Content */}
                <div className="p-6">
                  <p className="text-white/70 mb-4">{belt.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {belt.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {belt.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> 4 Stripes
                    </span>
                  </div>

                  {/* Stripes */}
                  {unlocked && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {belt.stripes.map((stripe, stripeIndex) => {
                        const stripeCompleted = stats.beltProgress.completedModules.includes(`${belt.level}-stripe-${stripeIndex + 1}`);
                        
                        return (
                          <Link
                            key={stripe.title}
                            to={stripe.href}
                            className="group"
                          >
                            <div className={`p-3 rounded-xl border transition-all ${
                              stripeCompleted
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10'
                            }`}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-white group-hover:text-gold-300 transition-colors">
                                  {stripe.title}
                                </span>
                                {stripeCompleted ? (
                                  <Check className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                                )}
                              </div>
                              <p className="text-xs text-white/50">{stripe.description}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {!unlocked && (
                    <div className="text-center py-4">
                      <p className="text-white/40 text-sm">
                        Earn {BELT_XP_THRESHOLDS[belt.level].toLocaleString()} XP to unlock this belt
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Card className="p-8 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700">
          <h3 className="text-xl font-bold mb-2">Not Sure Where to Start?</h3>
          <p className="text-white/60 mb-6">
            Take the Belt Assessment to discover your current level
          </p>
          <Link to="/assessments/belt">
            <Button size="lg" icon={<span>🥋</span>}>
              Take Belt Assessment
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}

function getBeltGradient(belt: BeltLevel): string {
  switch (belt) {
    case 'white':
      return 'from-gray-100 to-gray-200';
    case 'blue':
      return 'from-blue-500 to-blue-600';
    case 'purple':
      return 'from-purple-500 to-purple-600';
    case 'brown':
      return 'from-amber-700 to-amber-800';
    case 'black':
      return 'from-gray-900 to-black';
  }
}

