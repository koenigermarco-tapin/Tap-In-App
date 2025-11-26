import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGamification } from '@/hooks/useGamification';

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

const PHASES: Phase[] = ['inhale', 'hold1', 'exhale', 'hold2'];

const PHASE_INSTRUCTIONS = {
  inhale: 'Breathe In',
  hold1: 'Hold',
  exhale: 'Breathe Out',
  hold2: 'Hold',
};

const PHASE_COLORS = {
  inhale: 'from-blue-500 to-cyan-500',
  hold1: 'from-amber-500 to-orange-500',
  exhale: 'from-purple-500 to-pink-500',
  hold2: 'from-emerald-500 to-teal-500',
};

export function BoxBreathing() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('inhale');
  const [counter, setCounter] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { addXP, updateStreak } = useGamification();

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          // Move to next phase
          const currentIndex = PHASES.indexOf(currentPhase);
          const nextIndex = (currentIndex + 1) % PHASES.length;
          const nextPhase = PHASES[nextIndex];
          
          setCurrentPhase(nextPhase);
          
          // If we completed a full cycle
          if (nextPhase === 'inhale') {
            setCycles((c) => c + 1);
            
            // Award XP after 3 complete cycles (about 1 minute)
            if (cycles + 1 === 3 && !hasCompleted) {
              setHasCompleted(true);
              addXP(50, 'Box Breathing exercise');
              updateStreak();
            }
          }
          
          // Play sound if enabled
          if (soundEnabled) {
            playSound();
          }
          
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentPhase, counter, soundEnabled, cycles, hasCompleted, addXP, updateStreak]);

  const playSound = () => {
    // Simple beep using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setCounter(4);
    setCycles(0);
    setHasCompleted(false);
  };

  const getCircleSize = () => {
    switch (currentPhase) {
      case 'inhale':
        return 200;
      case 'hold1':
        return 200;
      case 'exhale':
        return 100;
      case 'hold2':
        return 100;
      default:
        return 150;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/open-mat" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Open Mat
        </Link>
        <div className="text-center">
          <span className="text-5xl mb-4 block">🌬️</span>
          <h1 className="text-3xl font-bold mb-2">Box Breathing</h1>
          <p className="text-white/60">
            4-4-4-4 breathing pattern to calm your nervous system
          </p>
        </div>
      </div>

      {/* Main Breathing Circle */}
      <div className="flex flex-col items-center mb-8">
        <Card className="p-12 bg-gradient-to-br from-navy-900 to-bg-dark border-navy-700 flex flex-col items-center">
          {/* Breathing Circle */}
          <div className="relative mb-8 flex items-center justify-center" style={{ width: 300, height: 300 }}>
            {/* Background circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border-2 border-white/10 rounded-full" />
            </div>

            {/* Animated breathing circle */}
            <motion.div
              animate={{
                width: getCircleSize(),
                height: getCircleSize(),
              }}
              transition={{
                duration: currentPhase.includes('hold') ? 0.5 : 4,
                ease: 'easeInOut',
              }}
              className={`rounded-full bg-gradient-to-br ${PHASE_COLORS[currentPhase]} opacity-80 flex items-center justify-center shadow-2xl`}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-2">
                  {counter}
                </p>
                <p className="text-sm text-white/80 uppercase tracking-wider">
                  {PHASE_INSTRUCTIONS[currentPhase]}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mb-6">
            {!isActive ? (
              <Button onClick={handleStart} size="lg" icon={<Play className="w-5 h-5" />}>
                Start
              </Button>
            ) : (
              <Button onClick={handlePause} variant="secondary" size="lg" icon={<Pause className="w-5 h-5" />}>
                Pause
              </Button>
            )}
            
            <Button onClick={handleReset} variant="ghost" size="lg" icon={<RotateCcw className="w-5 h-5" />}>
              Reset
            </Button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <VolumeX className="w-5 h-5 text-white/40" />
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{cycles}</p>
              <p className="text-sm text-white/50">Cycles</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-gold-300">
                {Math.floor((cycles * 16) / 60)}:{((cycles * 16) % 60).toString().padStart(2, '0')}
              </p>
              <p className="text-sm text-white/50">Time</p>
            </div>
          </div>

          {/* Completion message */}
          <AnimatePresence>
            {hasCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center"
              >
                <p className="text-emerald-400 font-semibold">+50 XP Earned! 🎉</p>
                <p className="text-white/60 text-sm">Great job completing 3 cycles</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">How It Works</h3>
        <div className="space-y-3 text-white/70">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <div>
              <p className="font-medium text-white">Inhale (4 seconds)</p>
              <p className="text-sm">Breathe in slowly through your nose</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 font-bold">2</span>
            </div>
            <div>
              <p className="font-medium text-white">Hold (4 seconds)</p>
              <p className="text-sm">Hold your breath comfortably</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold">3</span>
            </div>
            <div>
              <p className="font-medium text-white">Exhale (4 seconds)</p>
              <p className="text-sm">Breathe out slowly through your mouth</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 font-bold">4</span>
            </div>
            <div>
              <p className="font-medium text-white">Hold (4 seconds)</p>
              <p className="text-sm">Hold your breath before starting again</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gold-300/10 border border-gold-300/20 rounded-xl">
          <p className="text-sm text-white/80">
            💡 <strong>Tip:</strong> Practice for at least 3 cycles (about 1 minute) to experience the calming effects.
            This technique activates your parasympathetic nervous system, reducing stress and anxiety.
          </p>
        </div>
      </Card>
    </div>
  );
}
