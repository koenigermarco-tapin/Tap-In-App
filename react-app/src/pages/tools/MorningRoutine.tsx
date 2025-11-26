import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGamification } from '@/hooks/useGamification';

interface RoutineStep {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  icon: string;
}

const steps: RoutineStep[] = [
  {
    id: 'gratitude',
    title: 'Gratitude (60s)',
    description: 'Think of 3 things you\'re grateful for today',
    duration: 60,
    icon: '🙏',
  },
  {
    id: 'intention',
    title: 'Set Intention (60s)',
    description: 'What\'s your main focus for today? Set a clear intention',
    duration: 60,
    icon: '🎯',
  },
  {
    id: 'movement',
    title: 'Movement (90s)',
    description: 'Simple stretches or light movement to wake up your body',
    duration: 90,
    icon: '🤸',
  },
  {
    id: 'breathwork',
    title: 'Deep Breaths (60s)',
    description: 'Take 5-10 deep, conscious breaths',
    duration: 60,
    icon: '🌬️',
  },
  {
    id: 'visualization',
    title: 'Visualize Success (90s)',
    description: 'See yourself successfully completing your day',
    duration: 90,
    icon: '✨',
  },
];

export function MorningRoutine() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(steps[0].duration);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { addXP, updateStreak } = useGamification();

  const step = steps[currentStep];
  const progress = ((step.duration - timeRemaining) / step.duration) * 100;
  const totalProgress = ((currentStep + (step.duration - timeRemaining) / step.duration) / steps.length) * 100;

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Move to next step
          if (currentStep < steps.length - 1) {
            setCompletedSteps([...completedSteps, step.id]);
            setCurrentStep(currentStep + 1);
            return steps[currentStep + 1].duration;
          } else {
            // Routine completed
            setCompletedSteps([...completedSteps, step.id]);
            setIsActive(false);
            if (!hasCompleted) {
              setHasCompleted(true);
              addXP(75, '5-Minute Morning Routine');
              updateStreak();
            }
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentStep, timeRemaining, step, completedSteps, hasCompleted, addXP, updateStreak]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, step.id]);
      setCurrentStep(currentStep + 1);
      setTimeRemaining(steps[currentStep + 1].duration);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setTimeRemaining(steps[0].duration);
    setCompletedSteps([]);
    setHasCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <span className="text-7xl mb-4 block">🌟</span>
          <h1 className="text-3xl font-bold mb-2">Routine Complete!</h1>
          <p className="text-white/60 mb-8">
            Great job starting your day with intention
          </p>

          <Card className="p-8 mb-6 bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border-emerald-500/30">
            <p className="text-emerald-400 font-bold text-2xl mb-2">+75 XP Earned! 🎉</p>
            <p className="text-white/60">You completed the morning routine</p>
          </Card>

          <div className="space-y-3 mb-8">
            {steps.map((s) => (
              <Card key={s.id} className="p-4 flex items-center gap-4">
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1 text-left">
                  <p className="font-medium text-white">{s.title}</p>
                </div>
                <Check className="w-5 h-5 text-emerald-400" />
              </Card>
            ))}
          </div>
          <div className="flex gap-3">
            <Link to="/open-mat" className="flex-1">
              <Button fullWidth variant="secondary">
                Back to Open Mat
              </Button>
            </Link>
            <Button onClick={handleReset} variant="ghost" className="flex-1">
              Do Again
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/open-mat" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Open Mat
        </Link>
        <div className="text-center">
          <span className="text-5xl mb-4 block">🌅</span>
          <h1 className="text-3xl font-bold mb-2">5-Minute Morning Routine</h1>
          <p className="text-white/60">
            Start your day with intention and energy
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Overall Progress</span>
          <span className="text-gold-300">{Math.round(totalProgress)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-300 to-gold-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Card>

      {/* Current Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="p-8 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700 text-center mb-6">
            <span className="text-6xl mb-4 block">{step.icon}</span>
            <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
            <p className="text-white/60 mb-6">{step.description}</p>

            {/* Timer */}
            <div className="mb-6">
              <p className="text-6xl font-bold text-gold-300 mb-2">
                {formatTime(timeRemaining)}
              </p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold-300 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 justify-center">
              {!isActive ? (
                <Button onClick={handleStart} size="lg" icon={<Play className="w-5 h-5" />}>
                  {currentStep === 0 && completedSteps.length === 0 ? 'Start Routine' : 'Resume'}
                </Button>
              ) : (
                <Button onClick={handlePause} variant="secondary" size="lg">
                  Pause
                </Button>
              )}
              
              {currentStep < steps.length - 1 && (
                <Button onClick={handleNext} variant="ghost" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Skip
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Steps List */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Routine Steps</h3>
        <div className="space-y-2">
          {steps.map((s, index) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                index === currentStep
                  ? 'bg-gold-300/10 border border-gold-300/30'
                  : completedSteps.includes(s.id)
                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                  : 'bg-white/5'
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-white text-sm">{s.title}</p>
              </div>
              {completedSteps.includes(s.id) ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : index === currentStep ? (
                <span className="text-gold-300 text-xs font-medium">Current</span>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

