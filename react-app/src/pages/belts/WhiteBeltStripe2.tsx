import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGamification } from '@/hooks/useGamification';
import { useAuth } from '@/contexts/AuthContext';

export function WhiteBeltStripe2() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addXP, completeModule } = useGamification();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (!user) {
      alert('Please sign in to track your progress');
      return;
    }

    setIsCompleting(true);

    try {
      await completeModule('white-stripe-2');
      await addXP(50, 'White Belt Stripe 2');
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
          <div>
            <p className="text-white/60 text-sm font-medium">WHITE BELT - STRIPE 2</p>
            <h1 className="text-3xl font-bold text-white">Emotional Intelligence</h1>
          </div>
        </div>
        <p className="text-white/70 text-lg">
          Recognizing and managing your emotions is crucial for effective leadership.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Assess Your Mental Wellness</h2>
              <p className="text-white/70 mb-4">
                Emotional intelligence starts with self-awareness. This baseline assessment
                evaluates your current mental wellness across key dimensions including energy,
                stress management, emotional balance, and resilience.
              </p>
            </div>
          </div>

          <div className="bg-navy-800/50 border border-navy-700 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Assessment Dimensions:</h3>
            <ul className="space-y-3">
              {[
                'Energy levels and sleep quality',
                'Stress management and coping mechanisms',
                'Mental clarity and focus',
                'Emotional balance and resilience',
                'Work-life integration and boundaries',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-white/80">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-pink-200">
              <strong className="text-pink-300">Time Required:</strong> 3-5 minutes • 8 questions
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/belt-system')}
              className="flex-1"
            >
              Back to Belt System
            </Button>
            <Button
              onClick={() => navigate('/assessments/mental-wellness')}
              icon={<ArrowRight className="w-5 h-5" />}
              className="flex-1"
            >
              Start Wellness Assessment
            </Button>
          </div>
        </Card>

        {/* Note about completion */}
        <Card className="p-6 bg-gold-300/10 border-gold-300/20">
          <p className="text-sm text-gold-200">
            <strong className="text-gold-300">💡 Note:</strong> Complete the Mental Wellness Assessment,
            then return here to mark this stripe complete.
          </p>
          <div className="mt-4">
            <Button
              onClick={handleComplete}
              disabled={isCompleting}
              className="w-full"
            >
              {isCompleting ? 'Saving...' : 'Mark Stripe Complete'}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

