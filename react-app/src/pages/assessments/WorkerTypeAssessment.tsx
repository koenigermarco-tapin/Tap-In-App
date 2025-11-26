import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Coffee } from 'lucide-react';
import { AssessmentLayout, AssessmentQuestion } from '@/components/assessments/AssessmentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useGamification } from '@/hooks/useGamification';

const questions: AssessmentQuestion[] = [
  {
    id: 'work-style',
    question: 'How do you prefer to work on complex projects?',
    options: [
      { value: 'sprint', label: 'Intense bursts of focus', description: 'I work best in short, intense sessions' },
      { value: 'steady', label: 'Steady, consistent pace', description: 'I maintain consistent energy throughout' },
      { value: 'marathon', label: 'Long, sustained efforts', description: 'I can maintain focus for extended periods' },
    ],
  },
  {
    id: 'energy-pattern',
    question: 'When during the day do you feel most productive?',
    options: [
      { value: 'morning', label: 'Early morning', description: 'I\'m at my best before noon' },
      { value: 'afternoon', label: 'Afternoon', description: 'I hit my stride after lunch' },
      { value: 'evening', label: 'Late evening', description: 'I do my best work at night' },
      { value: 'varies', label: 'It varies', description: 'Depends on the task and day' },
    ],
  },
  {
    id: 'break-preference',
    question: 'How often do you need breaks during focused work?',
    options: [
      { value: 'frequent', label: 'Every 25-30 minutes', description: 'Short, frequent breaks keep me sharp' },
      { value: 'moderate', label: 'Every 60-90 minutes', description: 'I need periodic longer breaks' },
      { value: 'rare', label: 'Every 2-3 hours', description: 'I can sustain focus for long periods' },
    ],
  },
  {
    id: 'deadline-response',
    question: 'How do you respond to tight deadlines?',
    options: [
      { value: 'thrive', label: 'I thrive under pressure', description: 'Deadlines energize me' },
      { value: 'manage', label: 'I manage them well', description: 'I adapt my pace as needed' },
      { value: 'prefer-early', label: 'I prefer to start early', description: 'I like to plan ahead and avoid last-minute stress' },
    ],
  },
  {
    id: 'multitasking',
    question: 'How do you handle multiple projects?',
    options: [
      { value: 'serial', label: 'One at a time', description: 'I focus on completing one before starting another' },
      { value: 'parallel', label: 'Juggle several at once', description: 'I can context-switch effectively' },
      { value: 'batch', label: 'Batch similar tasks', description: 'I group similar work together' },
    ],
  },
];

type WorkerType = 'sprinter' | 'jogger' | 'ultra';

interface WorkerResult {
  type: WorkerType;
  title: string;
  emoji: string;
  description: string;
  strengths: string[];
  tips: string[];
}

const workerResults: Record<WorkerType, WorkerResult> = {
  sprinter: {
    type: 'sprinter',
    title: 'The Sprinter',
    emoji: '🏃‍♂️',
    description: 'You work best in intense, focused bursts. You thrive under pressure and can produce high-quality work quickly when motivated.',
    strengths: [
      'High productivity in short bursts',
      'Thrives under pressure',
      'Quick decision making',
      'Excellent at meeting tight deadlines',
    ],
    tips: [
      'Use the Pomodoro technique (25 min work / 5 min break)',
      'Schedule your most important work during peak energy times',
      'Build in recovery time after intense work sessions',
      'Break large projects into smaller sprints',
    ],
  },
  jogger: {
    type: 'jogger',
    title: 'The Jogger',
    emoji: '🚶',
    description: 'You maintain a steady, sustainable pace. You\'re reliable, consistent, and can adapt to different situations as needed.',
    strengths: [
      'Consistent output over time',
      'Adaptable to changing demands',
      'Good work-life balance',
      'Sustainable productivity',
    ],
    tips: [
      'Use time-blocking to maintain your rhythm',
      'Plan buffer time between tasks',
      'Protect your consistent work hours',
      'Use your adaptability to help others during crunch times',
    ],
  },
  ultra: {
    type: 'ultra',
    title: 'The Ultra-Marathoner',
    emoji: '🏔️',
    description: 'You excel at sustained, long-term efforts. You can maintain deep focus for extended periods and see complex projects through to completion.',
    strengths: [
      'Deep work capability',
      'Long-term project management',
      'Strategic thinking',
      'Resilience over time',
    ],
    tips: [
      'Protect large blocks of uninterrupted time',
      'Use your endurance for complex, strategic work',
      'Remember to take breaks even when you don\'t feel you need them',
      'Communicate your work style to teammates who may work differently',
    ],
  },
};

export function WorkerTypeAssessment() {
  const [result, setResult] = useState<WorkerResult | null>(null);
  const { completeAssessment } = useGamification();

  const calculateResult = (answers: Record<string, string | number>): WorkerType => {
    // Simple scoring logic
    let sprinterScore = 0;
    let joggerScore = 0;
    let ultraScore = 0;

    // Work style
    if (answers['work-style'] === 'sprint') sprinterScore += 2;
    if (answers['work-style'] === 'steady') joggerScore += 2;
    if (answers['work-style'] === 'marathon') ultraScore += 2;

    // Break preference
    if (answers['break-preference'] === 'frequent') sprinterScore += 2;
    if (answers['break-preference'] === 'moderate') joggerScore += 2;
    if (answers['break-preference'] === 'rare') ultraScore += 2;

    // Deadline response
    if (answers['deadline-response'] === 'thrive') sprinterScore += 1;
    if (answers['deadline-response'] === 'manage') joggerScore += 1;
    if (answers['deadline-response'] === 'prefer-early') ultraScore += 1;

    // Multitasking
    if (answers['multitasking'] === 'serial') ultraScore += 1;
    if (answers['multitasking'] === 'parallel') sprinterScore += 1;
    if (answers['multitasking'] === 'batch') joggerScore += 1;

    if (sprinterScore >= joggerScore && sprinterScore >= ultraScore) return 'sprinter';
    if (ultraScore >= joggerScore) return 'ultra';
    return 'jogger';
  };

  const handleComplete = (answers: Record<string, string | number>) => {
    const type = calculateResult(answers);
    setResult(workerResults[type]);
    completeAssessment('worker-type');
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <span className="text-7xl mb-4 block">{result.emoji}</span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">You're {result.title}!</h1>
          <p className="text-white/60">{result.description}</p>
        </motion.div>

        <div className="space-y-6">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-gold-300" />
                Your Strengths
              </h2>
              <ul className="space-y-2">
                {result.strengths.map((strength, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-gold-300" />
                Tips for You
              </h2>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80">
                    <span className="text-gold-300 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* XP Earned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-gold-300/10 to-gold-400/5 border-gold-300/20 text-center">
              <Target className="w-8 h-8 text-gold-300 mx-auto mb-2" />
              <p className="text-gold-300 font-bold text-2xl">+100 XP</p>
              <p className="text-white/60 text-sm">Assessment completed!</p>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
      title="Worker Type Assessment"
      description="Discover your optimal work style"
      icon="🏃"
      questions={questions}
      onComplete={handleComplete}
    />
  );
}

