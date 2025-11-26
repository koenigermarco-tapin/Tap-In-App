import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, TrendingUp } from 'lucide-react';
import { AssessmentLayout, AssessmentQuestion } from '@/components/assessments/AssessmentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useGamification } from '@/hooks/useGamification';
import { saveAssessment } from '@/lib/supabase';

const questions: AssessmentQuestion[] = [
  {
    id: 'sleep',
    question: 'How would you rate your sleep quality over the past week?',
    options: [
      { value: 5, label: 'Excellent', description: 'I sleep well and wake up refreshed' },
      { value: 4, label: 'Good', description: 'Generally good with occasional issues' },
      { value: 3, label: 'Fair', description: 'Some trouble sleeping or staying asleep' },
      { value: 2, label: 'Poor', description: 'Frequently disrupted or insufficient' },
      { value: 1, label: 'Very Poor', description: 'Severe sleep problems' },
    ],
  },
  {
    id: 'energy',
    question: 'How are your energy levels throughout the day?',
    options: [
      { value: 5, label: 'Consistently High', description: 'I feel energized most of the day' },
      { value: 4, label: 'Good', description: 'Energy dips occasionally but manageable' },
      { value: 3, label: 'Moderate', description: 'Some low energy periods' },
      { value: 2, label: 'Low', description: 'Often feel tired or drained' },
      { value: 1, label: 'Exhausted', description: 'Constantly fatigued' },
    ],
  },
  {
    id: 'stress',
    question: 'How would you describe your current stress level?',
    options: [
      { value: 1, label: 'Very Low', description: 'I feel calm and relaxed' },
      { value: 2, label: 'Low', description: 'Manageable stress, no issues' },
      { value: 3, label: 'Moderate', description: 'Some stress but coping well' },
      { value: 4, label: 'High', description: 'Feeling quite stressed' },
      { value: 5, label: 'Overwhelming', description: 'Stress is affecting my life' },
    ],
  },
  {
    id: 'mood',
    question: 'How has your mood been recently?',
    options: [
      { value: 5, label: 'Very Positive', description: 'Feeling happy and optimistic' },
      { value: 4, label: 'Positive', description: 'Generally good mood' },
      { value: 3, label: 'Neutral', description: 'Neither good nor bad' },
      { value: 2, label: 'Low', description: 'Feeling down or irritable' },
      { value: 1, label: 'Very Low', description: 'Struggling with negative emotions' },
    ],
  },
  {
    id: 'focus',
    question: 'How well can you concentrate on tasks?',
    options: [
      { value: 5, label: 'Excellent', description: 'Sharp focus and concentration' },
      { value: 4, label: 'Good', description: 'Can focus well most of the time' },
      { value: 3, label: 'Fair', description: 'Occasional difficulty concentrating' },
      { value: 2, label: 'Poor', description: 'Frequently distracted or foggy' },
      { value: 1, label: 'Very Poor', description: 'Cannot concentrate effectively' },
    ],
  },
  {
    id: 'social',
    question: 'How satisfied are you with your social connections?',
    options: [
      { value: 5, label: 'Very Satisfied', description: 'Strong, fulfilling relationships' },
      { value: 4, label: 'Satisfied', description: 'Good social connections' },
      { value: 3, label: 'Neutral', description: 'Adequate but could be better' },
      { value: 2, label: 'Dissatisfied', description: 'Feeling isolated or disconnected' },
      { value: 1, label: 'Very Dissatisfied', description: 'Lacking meaningful connections' },
    ],
  },
  {
    id: 'coping',
    question: 'How well are you managing life\'s challenges?',
    options: [
      { value: 5, label: 'Very Well', description: 'I handle challenges effectively' },
      { value: 4, label: 'Well', description: 'Coping well with most situations' },
      { value: 3, label: 'Adequately', description: 'Getting by, some struggles' },
      { value: 2, label: 'Poorly', description: 'Difficulty managing challenges' },
      { value: 1, label: 'Very Poorly', description: 'Overwhelmed by daily challenges' },
    ],
  },
];

interface WellnessResult {
  score: number;
  level: 'excellent' | 'good' | 'fair' | 'needs-attention' | 'concerning';
  title: string;
  description: string;
  recommendations: string[];
}

export function MentalWellnessAssessment() {
  const [result, setResult] = useState<WellnessResult | null>(null);
  const { completeAssessment } = useGamification();

  const calculateResult = (answers: Record<string, string | number>): WellnessResult => {
    // Calculate total score (stress is inverted)
    const scores = Object.entries(answers).map(([key, value]) => {
      if (key === 'stress') {
        // Invert stress score (5 becomes 1, 1 becomes 5)
        return 6 - (value as number);
      }
      return value as number;
    });

    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / scores.length;
    const percentage = (averageScore / 5) * 100;

    let level: WellnessResult['level'];
    let title: string;
    let description: string;
    let recommendations: string[];

    if (percentage >= 80) {
      level = 'excellent';
      title = 'Excellent Mental Wellness';
      description = 'You\'re in a great place mentally and emotionally. Your healthy habits and positive mindset are serving you well.';
      recommendations = [
        'Continue your current self-care practices',
        'Consider mentoring others who might benefit from your insights',
        'Set new wellness goals to maintain momentum',
        'Share your strategies with your team or community',
      ];
    } else if (percentage >= 65) {
      level = 'good';
      title = 'Good Mental Wellness';
      description = 'You\'re doing well overall, with some areas that could use attention. You have a solid foundation to build on.';
      recommendations = [
        'Focus on the areas where you scored lower',
        'Establish a consistent sleep routine if needed',
        'Incorporate stress-reduction techniques like meditation',
        'Maintain your social connections',
      ];
    } else if (percentage >= 50) {
      level = 'fair';
      title = 'Fair Mental Wellness';
      description = 'You\'re managing but experiencing some challenges. Small improvements in key areas could make a big difference.';
      recommendations = [
        'Prioritize sleep and rest - aim for 7-8 hours',
        'Try the Box Breathing exercise for stress relief',
        'Schedule regular breaks throughout your day',
        'Reach out to friends or family for support',
        'Consider speaking with a mental health professional',
      ];
    } else if (percentage >= 35) {
      level = 'needs-attention';
      title = 'Needs Attention';
      description = 'You\'re experiencing significant challenges that are affecting your wellbeing. It\'s important to take action now.';
      recommendations = [
        'Make self-care a non-negotiable priority',
        'Reduce commitments where possible to lower stress',
        'Seek support from a therapist or counselor',
        'Practice daily stress-reduction techniques',
        'Talk to someone you trust about how you\'re feeling',
        'Consider whether workload adjustments are needed',
      ];
    } else {
      level = 'concerning';
      title = 'Concerning - Please Seek Support';
      description = 'Your responses indicate you may be struggling significantly. Please reach out for professional support.';
      recommendations = [
        '🚨 Consider speaking with a mental health professional soon',
        'Reach out to a trusted friend, family member, or mentor',
        'If in crisis, contact a crisis helpline immediately',
        'Take time off work if possible to focus on recovery',
        'Be gentle with yourself - seeking help is a sign of strength',
      ];
    }

    return {
      score: Math.round(percentage),
      level,
      title,
      description,
      recommendations,
    };
  };

  const handleComplete = async (answers: Record<string, string | number>) => {
    const wellnessResult = calculateResult(answers);
    setResult(wellnessResult);
    completeAssessment('mental-wellness');

    // Save to Supabase
    try {
      await saveAssessment('mental-health', {
        score: wellnessResult.score,
        level: wellnessResult.level,
        answers,
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to save assessment:', error);
    }
  };

  if (result) {
    const colorMap = {
      excellent: 'from-emerald-600 to-emerald-700',
      good: 'from-blue-600 to-blue-700',
      fair: 'from-amber-600 to-amber-700',
      'needs-attention': 'from-orange-600 to-orange-700',
      concerning: 'from-red-600 to-red-700',
    };

    const iconMap = {
      excellent: '🌟',
      good: '✨',
      fair: '💭',
      'needs-attention': '🤝',
      concerning: '❤️',
    };

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <span className="text-7xl mb-4 block">{iconMap[result.level]}</span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{result.title}</h1>
          <p className="text-white/60">{result.description}</p>
        </motion.div>

        <div className="space-y-6">
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`p-6 bg-gradient-to-br ${colorMap[result.level]} border-none`}>
              <div className="text-center">
                <p className="text-white/80 mb-2">Your Wellness Score</p>
                <p className="text-6xl font-bold text-white mb-2">{result.score}%</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold-300" />
                Recommendations
              </h2>
              <ul className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="text-gold-300 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Helpful Tools
              </h3>
              <div className="space-y-2">
                <Link to="/open-mat/box-breathing" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <p className="font-medium text-white">🌬️ Box Breathing</p>
                  <p className="text-sm text-white/60">4-minute stress relief exercise</p>
                </Link>
                <Link to="/open-mat/energy-audit" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <p className="font-medium text-white">⚡ Energy Audit</p>
                  <p className="text-sm text-white/60">Map your daily energy patterns</p>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* XP Earned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-gold-300/10 to-gold-400/5 border-gold-300/20 text-center">
              <p className="text-gold-300 font-bold text-2xl">+100 XP</p>
              <p className="text-white/60 text-sm">Assessment completed!</p>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link to="/dashboard" className="flex-1">
              <Button fullWidth variant="secondary">
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/assessments" className="flex-1">
              <Button fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                More Assessments
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <AssessmentLayout
      title="Mental Wellness Baseline"
      description="Check in with your mental and emotional wellbeing"
      icon="💚"
      questions={questions}
      onComplete={handleComplete}
    />
  );
}
