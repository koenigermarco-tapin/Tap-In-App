import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGamification } from '@/hooks/useGamification';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const REFLECTION_QUESTIONS = [
  {
    question: 'Describe a recent situation where you received feedback that was difficult to hear. How did you respond?',
    placeholder: 'Think about your emotional reaction, body language, and what you said...',
  },
  {
    question: 'What makes it challenging for you to give direct feedback to others?',
    placeholder: 'Consider fear of conflict, wanting to be liked, uncertainty about approach...',
  },
  {
    question: 'Think of someone who gives you feedback well. What do they do that makes it effective?',
    placeholder: 'Specific behaviors, tone, timing, follow-up...',
  },
  {
    question: 'When giving feedback, what do you tend to avoid or sugarcoat? Why?',
    placeholder: 'Performance issues, behavioral problems, difficult truths...',
  },
  {
    question: 'What commitment will you make to improve your feedback skills this week?',
    placeholder: 'One specific action you will take...',
  },
];

export function WhiteBeltStripe3() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addXP, completeModule } = useGamification();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const allQuestionsAnswered = REFLECTION_QUESTIONS.every((_, index) => 
    answers[index]?.trim().length > 0
  );

  const handleComplete = async () => {
    if (!user) {
      alert('Please sign in to track your progress');
      return;
    }

    if (!allQuestionsAnswered) {
      alert('Please answer all reflection questions before completing.');
      return;
    }

    setIsCompleting(true);

    try {
      // Save reflection answers to Supabase
      const { error: saveError } = await supabase
        .from('assessment_results')
        .insert({
          user_id: user.id,
          assessment_type: 'white-stripe-3-feedback-mastery',
          answers: answers,
          score: 100,
          metadata: { completed_at: new Date().toISOString() },
        });

      if (saveError) throw saveError;

      // Mark module complete and award XP
      await completeModule('white-stripe-3');
      await addXP(50, 'White Belt Stripe 3');

      setShowSuccess(true);

      setTimeout(() => {
        navigate('/belt-system');
      }, 2000);
    } catch (error) {
      console.error('Error completing stripe:', error);
      alert('Failed to save progress. Please try again.');
      setIsCompleting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Stripe Complete!</h2>
          <p className="text-white/70 mb-4">+50 XP earned</p>
          <p className="text-white/50 text-sm">Returning to Belt System...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-12 bg-white rounded" />
          <div className="w-3 h-12 bg-white rounded" />
          <div className="w-3 h-12 bg-white rounded" />
          <div>
            <p className="text-white/60 text-sm font-medium">WHITE BELT - STRIPE 3</p>
            <h1 className="text-3xl font-bold text-white">Feedback Mastery</h1>
          </div>
        </div>
        <p className="text-white/70 text-lg">
          Receiving and giving feedback openly is essential for growth.
        </p>
      </motion.div>

      {/* Intro Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Reflect on Your Feedback Skills</h2>
              <p className="text-white/70 mb-4">
                Take time to honestly examine how you currently give and receive feedback.
                Your answers are private and will help you identify areas for growth.
              </p>
            </div>
          </div>

          <div className="bg-navy-800/50 border border-navy-700 rounded-xl p-4 mb-6">
            <p className="text-sm text-white/70">
              <strong className="text-white">💡 Tip:</strong> Be honest and specific. 
              The more thoughtful your reflections, the more valuable this exercise becomes.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Reflection Questions */}
      {REFLECTION_QUESTIONS.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="mb-6"
        >
          <Card className="p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-gold-300">Question {index + 1} of {REFLECTION_QUESTIONS.length}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
              <textarea
                value={answers[index] || ''}
                onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                placeholder={item.placeholder}
                rows={4}
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-300/50 focus:border-gold-300"
              />
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Complete Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <Card className="p-6 bg-gold-300/10 border-gold-300/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gold-200 font-medium mb-1">
                {allQuestionsAnswered ? 'All questions answered!' : `${Object.keys(answers).length}/${REFLECTION_QUESTIONS.length} questions answered`}
              </p>
              <p className="text-sm text-white/60">
                Complete all reflections to earn your stripe
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant="secondary"
                onClick={() => navigate('/belt-system')}
                className="flex-1 md:flex-none"
              >
                Save & Exit
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!allQuestionsAnswered || isCompleting}
                className="flex-1 md:flex-none"
              >
                {isCompleting ? 'Saving...' : 'Complete Stripe'}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

