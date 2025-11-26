import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Scale, TrendingUp } from 'lucide-react';
import { AssessmentLayout, AssessmentQuestion } from '@/components/assessments/AssessmentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useGamification } from '@/hooks/useGamification';
import { saveAssessment } from '@/lib/supabase';

const questions: AssessmentQuestion[] = [
  {
    id: 'work-hours',
    question: 'How many hours do you typically work per week?',
    options: [
      { value: 1, label: 'Under 40 hours', description: 'Standard work week or less' },
      { value: 2, label: '40-45 hours', description: 'Slightly above standard' },
      { value: 3, label: '45-50 hours', description: 'Extended hours' },
      { value: 4, label: '50-60 hours', description: 'Very long hours' },
      { value: 5, label: 'Over 60 hours', description: 'Excessive work hours' },
    ],
  },
  {
    id: 'boundaries',
    question: 'How well do you maintain boundaries between work and personal time?',
    options: [
      { value: 5, label: 'Excellent', description: 'Clear separation, rarely interrupted' },
      { value: 4, label: 'Good', description: 'Usually maintain boundaries' },
      { value: 3, label: 'Fair', description: 'Sometimes blur together' },
      { value: 2, label: 'Poor', description: 'Work often bleeds into personal time' },
      { value: 1, label: 'Non-existent', description: 'No clear boundaries' },
    ],
  },
  {
    id: 'personal-time',
    question: 'How much time do you spend on hobbies, interests, or personal development?',
    options: [
      { value: 5, label: 'Several hours daily', description: 'Rich personal life' },
      { value: 4, label: 'Few hours weekly', description: 'Regular personal time' },
      { value: 3, label: 'Occasional', description: 'Some personal activities' },
      { value: 2, label: 'Rare', description: 'Very little personal time' },
      { value: 1, label: 'Almost never', description: 'No time for personal interests' },
    ],
  },
  {
    id: 'relationships',
    question: 'How satisfied are you with the quality time you spend with loved ones?',
    options: [
      { value: 5, label: 'Very satisfied', description: 'Meaningful, quality time together' },
      { value: 4, label: 'Satisfied', description: 'Good time with loved ones' },
      { value: 3, label: 'Neutral', description: 'Could be better' },
      { value: 2, label: 'Dissatisfied', description: 'Not enough quality time' },
      { value: 1, label: 'Very dissatisfied', description: 'Relationships suffering' },
    ],
  },
  {
    id: 'health',
    question: 'How well are you taking care of your physical health?',
    options: [
      { value: 5, label: 'Excellent', description: 'Regular exercise, good diet, sleep' },
      { value: 4, label: 'Good', description: 'Generally healthy habits' },
      { value: 3, label: 'Fair', description: 'Some healthy habits, some neglect' },
      { value: 2, label: 'Poor', description: 'Neglecting health needs' },
      { value: 1, label: 'Very poor', description: 'Health significantly compromised' },
    ],
  },
  {
    id: 'stress-recovery',
    question: 'How effectively do you recover from work stress?',
    options: [
      { value: 5, label: 'Very effectively', description: 'I recharge and feel refreshed' },
      { value: 4, label: 'Effectively', description: 'Usually recover well' },
      { value: 3, label: 'Moderately', description: 'Partial recovery' },
      { value: 2, label: 'Poorly', description: 'Struggle to decompress' },
      { value: 1, label: 'Not at all', description: 'Always carrying work stress' },
    ],
  },
  {
    id: 'fulfillment',
    question: 'Overall, how fulfilled do you feel with your current work-life balance?',
    options: [
      { value: 5, label: 'Very fulfilled', description: 'Great balance, happy with both' },
      { value: 4, label: 'Fulfilled', description: 'Good balance overall' },
      { value: 3, label: 'Neutral', description: 'Neither satisfied nor dissatisfied' },
      { value: 2, label: 'Unfulfilled', description: 'Balance feels off' },
      { value: 1, label: 'Very unfulfilled', description: 'Seriously out of balance' },
    ],
  },
];

interface BalanceResult {
  score: number;
  category: 'excellent' | 'good' | 'needs-improvement' | 'concerning';
  title: string;
  description: string;
  strengths: string[];
  improvements: string[];
}

export function WorkLifeBalanceAssessment() {
  const [result, setResult] = useState<BalanceResult | null>(null);
  const { completeAssessment } = useGamification();

  const calculateResult = (answers: Record<string, string | number>): BalanceResult => {
    // Invert work-hours score (less is better)
    const workHoursScore = 6 - (answers['work-hours'] as number);
    const otherScores = Object.entries(answers)
      .filter(([key]) => key !== 'work-hours')
      .map(([, value]) => value as number);

    const totalScore = workHoursScore + otherScores.reduce((sum, score) => sum + score, 0);
    const maxScore = 7 * 5; // 7 questions, max 5 points each
    const percentage = (totalScore / maxScore) * 100;

    let category: BalanceResult['category'];
    let title: string;
    let description: string;
    let strengths: string[];
    let improvements: string[];

    if (percentage >= 75) {
      category = 'excellent';
      title = 'Excellent Balance';
      description = 'You\'ve achieved a healthy work-life balance. You\'re taking care of yourself while being productive at work.';
      strengths = [
        'You maintain clear boundaries between work and personal life',
        'You make time for relationships and personal interests',
        'You prioritize your physical and mental health',
        'You recover effectively from work stress',
      ];
      improvements = [
        'Continue your current practices',
        'Help others achieve better balance',
        'Regularly reassess as circumstances change',
      ];
    } else if (percentage >= 60) {
      category = 'good';
      title = 'Good Balance';
      description = 'You have a solid foundation with room for improvement in a few areas. You\'re managing both work and life reasonably well.';
      strengths = [
        'You recognize the importance of balance',
        'You\'re taking steps to maintain boundaries',
        'You make some time for personal activities',
      ];
      improvements = [
        'Strengthen boundaries where they\'re weakest',
        'Schedule regular personal time and treat it as non-negotiable',
        'Communicate your needs to colleagues and loved ones',
        'Try setting "no work" times (e.g., after 7 PM, weekends)',
      ];
    } else if (percentage >= 40) {
      category = 'needs-improvement';
      title = 'Needs Improvement';
      description = 'Your work-life balance is tilted heavily toward work. This imbalance can lead to burnout if not addressed.';
      strengths = [
        'You\'re aware that change is needed',
        'You have the potential to create better balance',
      ];
      improvements = [
        'Set strict work hour limits and stick to them',
        'Block out personal time in your calendar',
        'Learn to say no to non-essential work demands',
        'Delegate or eliminate low-priority tasks',
        'Schedule regular breaks and actually take them',
        'Consider having a conversation with your manager about workload',
      ];
    } else {
      category = 'concerning';
      title = 'Concerning Imbalance';
      description = 'Your current situation shows significant imbalance that may be affecting your health, relationships, and overall wellbeing.';
      strengths = [
        'You\'ve taken this assessment - awareness is the first step',
      ];
      improvements = [
        '🚨 Consider this a priority - your health and relationships matter',
        'Have an honest conversation with your manager or team about workload',
        'Start small: pick one evening per week that\'s completely work-free',
        'Set boundaries and communicate them clearly to colleagues',
        'Seek support from HR, a counselor, or career coach',
        'Evaluate whether your current role is sustainable long-term',
        'Remember: you can\'t pour from an empty cup',
      ];
    }

    return {
      score: Math.round(percentage),
      category,
      title,
      description,
      strengths,
      improvements,
    };
  };

  const handleComplete = async (answers: Record<string, string | number>) => {
    const balanceResult = calculateResult(answers);
    setResult(balanceResult);
    completeAssessment('work-life-balance');

    // Save to Supabase
    try {
      await saveAssessment('work-life-balance', {
        score: balanceResult.score,
        category: balanceResult.category,
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
      'needs-improvement': 'from-amber-600 to-amber-700',
      concerning: 'from-red-600 to-red-700',
    };

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <span className="text-7xl mb-4 block">⚖️</span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{result.title}</h1>
          <p className="text-white/60">{result.description}</p>
        </motion.div>

        <div className="space-y-6">
          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`p-6 bg-gradient-to-br ${colorMap[result.category]} border-none`}>
              <div className="text-center">
                <p className="text-white/80 mb-2">Balance Score</p>
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

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                Your Strengths
              </h2>
              <ul className="space-y-2">
                {result.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <span className="text-emerald-400 mt-1">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Improvements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold-300" />
                Action Steps
              </h2>
              <ul className="space-y-3">
                {result.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="text-gold-300 mt-1">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
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
      title="Work-Life Balance Assessment"
      description="Evaluate your current work-life integration"
      icon="⚖️"
      questions={questions}
      onComplete={handleComplete}
    />
  );
}

