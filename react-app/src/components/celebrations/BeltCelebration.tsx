import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface BeltCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  beltColor: 'white' | 'blue' | 'purple' | 'brown' | 'black';
  stripeNames: string[];
  totalXP: number;
  nextBelt?: string;
}

const beltEmojis = {
  white: '⚪',
  blue: '🔵',
  purple: '🟣',
  brown: '🟤',
  black: '⚫'
};

const beltData = {
  white: {
    name: 'White Belt',
    gradient: 'from-slate-600 via-slate-700 to-slate-900',
    theme: 'Absence of Trust - Vulnerability-Based Foundation',
    colors: ['#cbd5e1', '#94a3b8', '#64748b']
  },
  blue: {
    name: 'Blue Belt',
    gradient: 'from-blue-600 via-blue-700 to-blue-900',
    theme: 'Fear of Conflict - Healthy Debate & Disagreement',
    colors: ['#3b82f6', '#2563eb', '#1d4ed8']
  },
  purple: {
    name: 'Purple Belt',
    gradient: 'from-purple-600 via-purple-700 to-purple-900',
    theme: 'Lack of Commitment - Clarity & Buy-In',
    colors: ['#a855f7', '#9333ea', '#7e22ce']
  },
  brown: {
    name: 'Brown Belt',
    gradient: 'from-amber-700 via-amber-800 to-amber-950',
    theme: 'Avoidance of Accountability - Ownership & Standards',
    colors: ['#d97706', '#b45309', '#92400e']
  },
  black: {
    name: 'Black Belt',
    gradient: 'from-slate-800 via-slate-900 to-black',
    theme: 'Inattention to Results - Mastery & Leadership',
    colors: ['#fbbf24', '#f59e0b', '#d97706']
  }
};

export function BeltCelebration({ 
  isOpen, 
  onClose, 
  beltColor, 
  stripeNames,
  totalXP,
  nextBelt 
}: BeltCelebrationProps) {
  const belt = beltData[beltColor];

  useEffect(() => {
    if (isOpen) {
      // Massive confetti explosion
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const colors = belt.colors;

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2
          },
          colors
        });

        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2
          },
          colors
        });
      }, 250);

      // Special effect for Black Belt
      if (beltColor === 'black') {
        setTimeout(() => {
          confetti({
            particleCount: 200,
            spread: 180,
            origin: { y: 0.6 },
            colors: ['#fbbf24', '#fcd34d', '#fde047'],
            shapes: ['star'],
            scalar: 1.5
          });
        }, 500);
      }

      return () => clearInterval(interval);
    }
  }, [isOpen, belt.colors, beltColor]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          /* Responsive padding: 16px mobile, 24px tablet, 32px desktop */
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0.4 }}
            /* Responsive max-width and padding */
            className="max-w-4xl w-full py-6 sm:py-8"
          >
            {/* Trophy Icon - responsive sizing */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              {/* Responsive trophy container and icon size */}
              <div className={`bg-gradient-to-br ${belt.gradient} p-6 sm:p-8 rounded-full shadow-2xl border-2 sm:border-4 border-white/20`}>
                <Trophy className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white" />
              </div>
            </motion.div>

            {/* Main Title - responsive typography and spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-4 sm:mb-6 px-4"
            >
              {/* Responsive emoji size */}
              <div className="text-5xl sm:text-6xl md:text-8xl mb-3 sm:mb-4 animate-pulse">{beltEmojis[beltColor]}</div>
              {/* Responsive heading: mobile 3xl (30px), tablet 5xl (48px), desktop 7xl (72px) */}
              <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r ${belt.gradient} bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight`}>
                {belt.name.toUpperCase()} EARNED!
              </h1>
              {/* Responsive theme text: base (16px) mobile, lg (18px) tablet, xl (20px) desktop */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-semibold px-2">{belt.theme}</p>
            </motion.div>

            {/* Journey Summary - responsive padding and spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-white/10 mx-4 sm:mx-0"
            >
              {/* Responsive heading and icon */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Your Journey</h3>
              </div>

              {/* Responsive grid gap */}
              <div className="grid gap-3 sm:gap-4">
                {stripeNames.map((name, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    /* Responsive padding and gap */
                    className="flex items-center gap-3 sm:gap-4 bg-white/5 rounded-lg p-3 sm:p-4"
                  >
                    {/* Ensure icon is visible and properly sized */}
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-slate-400 text-xs sm:text-sm block">Stripe {index + 1}</span>
                      {/* Responsive text with proper wrapping */}
                      <p className="text-white font-semibold text-sm sm:text-base break-words">{name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* XP Reward - responsive sizing and padding */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="text-center mb-6 sm:mb-8 px-4"
            >
              {/* Responsive XP badge with touch-friendly padding */}
              <div className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-slate-900 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-full font-black text-2xl sm:text-3xl md:text-4xl shadow-2xl border-2 sm:border-4 border-yellow-300 min-h-[56px]">
                +{totalXP} XP
              </div>
              {/* Responsive subtext */}
              <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">Belt Completion Bonus!</p>
            </motion.div>

            {/* Next Belt Message - responsive padding and text */}
            {nextBelt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-center mx-4 sm:mx-0"
              >
                <p className="text-green-300 text-base sm:text-lg md:text-xl font-semibold mb-2">🎉 Achievement Unlocked!</p>
                <p className="text-white text-lg sm:text-xl md:text-2xl font-bold break-words">{nextBelt} is now available!</p>
              </motion.div>
            )}

            {/* Special Black Belt Message - responsive padding and text */}
            {beltColor === 'black' && !nextBelt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-center mx-4 sm:mx-0"
              >
                <p className="text-yellow-300 text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">🏆 JOURNEY COMPLETE 🏆</p>
                {/* Responsive paragraph with proper line height */}
                <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                  You've mastered all 5 dysfunctions and completed the entire TAP-IN curriculum. From White Belt to Black Belt. From beginner to master. Now, the real journey begins—share your knowledge and lead others.
                </p>
              </motion.div>
            )}

            {/* Continue Button - responsive sizing with touch target */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-center px-4"
            >
              <Button
                onClick={onClose}
                /* Responsive button: touch-friendly with min-h-[56px], responsive padding and text */
                className="bg-white hover:bg-slate-100 text-slate-900 px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-bold shadow-2xl min-h-[56px] w-full sm:w-auto"
              >
                Continue Your Journey
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
              </Button>
            </motion.div>

            {/* Motivational Quote - responsive text and spacing */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-center text-slate-400 italic mt-6 sm:mt-8 text-sm sm:text-base md:text-lg px-4"
            >
              "The belt only covers two inches of your ass. You have to cover the rest." - Royce Gracie
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
