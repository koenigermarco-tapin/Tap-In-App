import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Check, Target } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';

interface Assessment {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  category: 'quick' | 'deep' | 'team';
  href: string;
}

const assessments: Assessment[] = [
  // Quick Assessments
  {
    id: 'worker-type',
    title: 'Worker Type Assessment',
    description: 'Discover if you\'re a Sprinter, Jogger, or Ultra-marathoner',
    icon: '🏃',
    duration: '2-3 min',
    category: 'quick',
    href: '/assessments/worker-type',
  },
  {
    id: 'mental-health',
    title: 'Mental Wellness Baseline',
    description: 'Check in with your mental health and wellbeing',
    icon: '💚',
    duration: '3 min',
    category: 'quick',
    href: '/assessments/mental-health',
  },
  {
    id: 'work-life-balance',
    title: 'Work-Life Balance',
    description: 'Evaluate your current work-life integration',
    icon: '⚖️',
    duration: '3 min',
    category: 'quick',
    href: '/assessments/work-life-balance',
  },
  {
    id: 'communication-style',
    title: 'Communication Style',
    description: 'Understand how you communicate with others',
    icon: '💬',
    duration: '4 min',
    category: 'quick',
    href: '/assessments/communication-style',
  },
  // Deep Assessments
  {
    id: 'leadership-style',
    title: 'Leadership Style Assessment',
    description: 'Comprehensive analysis of your leadership approach',
    icon: '👑',
    duration: '5-7 min',
    category: 'deep',
    href: '/assessments/leadership-style',
  },
  {
    id: 'belt-assessment',
    title: 'Belt Level Assessment',
    description: 'Determine your starting belt in the development system',
    icon: '🥋',
    duration: '45-59 min',
    category: 'deep',
    href: '/assessments/belt',
  },
  {
    id: 'values-discovery',
    title: 'Values Discovery',
    description: 'Identify your core values and how they guide your decisions',
    icon: '💎',
    duration: '10-15 min',
    category: 'deep',
    href: '/assessments/values-discovery',
  },
  {
    id: 'decision-making',
    title: 'Decision Making Style',
    description: 'Understand your approach to making decisions',
    icon: '🎯',
    duration: '8-10 min',
    category: 'deep',
    href: '/assessments/decision-making',
  },
  // Team Assessments
  {
    id: 'team-dynamics',
    title: 'Team Dynamics Assessment',
    description: 'Evaluate your team\'s health and collaboration',
    icon: '🤝',
    duration: '10-15 min',
    category: 'team',
    href: '/assessments/team-dynamics',
  },
  {
    id: '360-feedback',
    title: '360° Feedback Assessment',
    description: 'Comprehensive feedback from all directions',
    icon: '🔄',
    duration: '20-30 min',
    category: 'team',
    href: '/assessments/360-feedback',
  },
];

const categories = [
  { id: 'quick', title: 'Quick Assessments', description: '2-5 minute check-ins' },
  { id: 'deep', title: 'Deep Dives', description: 'Comprehensive evaluations' },
  { id: 'team', title: 'Team Assessments', description: 'For you and your team' },
];

export function Assessments() {
  const { stats } = useGamification();

  const isCompleted = (assessmentId: string) => {
    return stats.beltProgress.completedAssessments.includes(assessmentId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-5xl mb-4 block">📊</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Assessments</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Discover insights about yourself and your team through research-backed assessments.
          Each one helps you grow and earn XP.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="p-4 flex items-center justify-center gap-8 bg-gradient-to-r from-navy-800 to-navy-900 border-navy-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-gold-300">
              {stats.beltProgress.completedAssessments.length}
            </p>
            <p className="text-sm text-white/50">Completed</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{assessments.length}</p>
            <p className="text-sm text-white/50">Total</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {stats.beltProgress.completedAssessments.length * 100}
            </p>
            <p className="text-sm text-white/50">XP Earned</p>
          </div>
        </Card>
      </motion.div>

      {/* Categories */}
      {categories.map((category, categoryIndex) => {
        const categoryAssessments = assessments.filter((a) => a.category === category.id);

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + categoryIndex * 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{category.title}</h2>
                <p className="text-sm text-white/50">{category.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {categoryAssessments.map((assessment, index) => {
                const completed = isCompleted(assessment.id);

                return (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Link to={assessment.href}>
                      <Card hover className={`h-full ${completed ? 'border-emerald-500/30' : ''}`}>
                        <div className="flex items-start gap-4">
                          <span className="text-4xl">{assessment.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-white group-hover:text-gold-300 transition-colors">
                                {assessment.title}
                              </h3>
                              {completed && (
                                <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-white/50 mb-3">{assessment.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-xs text-white/40">
                                <Clock className="w-3 h-3" />
                                {assessment.duration}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-gold-300/80">
                                +100 XP <Target className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors mt-1" />
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Card className="p-8 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700">
          <h3 className="text-xl font-bold mb-2">Complete Assessments to Level Up</h3>
          <p className="text-white/60 mb-4">
            Each assessment earns you 100 XP and helps track your development journey
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-white/40">
            <span>Current XP: <strong className="text-gold-300">{stats.totalXP.toLocaleString()}</strong></span>
            <span>•</span>
            <span>Level: <strong className="text-white">{stats.level}</strong></span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

