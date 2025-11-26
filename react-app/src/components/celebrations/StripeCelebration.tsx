import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface StripeCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  beltColor: 'white' | 'blue' | 'purple' | 'brown' | 'black';
  stripeNumber: 1 | 2 | 3 | 4;
  xpAwarded: number;
}

const beltEmojis = {
  white: '⚪',
  blue: '🔵',
  purple: '🟣',
  brown: '🟤',
  black: '⚫'
};

const beltColors = {
  white: {
    gradient: 'from-slate-600 to-slate-800',
    text: 'White Belt',
    bg: 'bg-slate-50',
    border: 'border-slate-400'
  },
  blue: {
    gradient: 'from-blue-600 to-blue-800',
    text: 'Blue Belt',
    bg: 'bg-blue-50',
    border: 'border-blue-400'
  },
  purple: {
    gradient: 'from-purple-600 to-purple-800',
    text: 'Purple Belt',
    bg: 'bg-purple-50',
    border: 'border-purple-400'
  },
  brown: {
    gradient: 'from-amber-700 to-amber-900',
    text: 'Brown Belt',
    bg: 'bg-amber-50',
    border: 'border-amber-400'
  },
  black: {
    gradient: 'from-slate-800 to-black',
    text: 'Black Belt',
    bg: 'bg-slate-100',
    border: 'border-yellow-500'
  }
};

export function StripeCelebration({ isOpen, onClose, beltColor, stripeNumber, xpAwarded }: StripeCelebrationProps) {
  const belt = beltColors[beltColor];

  useEffect(() => {
    if (isOpen) {
      // Small confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: beltColor === 'white' ? ['#cbd5e1', '#94a3b8'] :
                beltColor === 'blue' ? ['#3b82f6', '#60a5fa'] :
                beltColor === 'purple' ? ['#a855f7', '#c084fc'] :
                beltColor === 'brown' ? ['#d97706', '#f59e0b'] :
                ['#fbbf24', '#fcd34d']
      });

      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, beltColor]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - responsive padding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            {/* Modal - responsive sizing and padding */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 ${belt.border}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon - responsive sizing */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-4 sm:mb-6"
              >
                {/* Responsive icon container: smaller on mobile (p-4), larger on desktop (p-6) */}
                <div className={`bg-gradient-to-br ${belt.gradient} p-4 sm:p-6 rounded-full`}>
                  {/* Responsive icon: 44px min (touch target), scales up on larger screens */}
                  <Award className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              </motion.div>

              {/* Title - responsive typography using clamp-like approach */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-2 sm:mb-3"
              >
                Stripe Earned! {beltEmojis[beltColor]}
              </motion.h2>

              {/* Subtitle - responsive text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-slate-600 text-base sm:text-lg mb-4 sm:mb-6"
              >
                {belt.text} - Stripe {stripeNumber}
              </motion.p>

              {/* Progress - responsive padding and spacing */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${belt.bg} rounded-xl p-3 sm:p-4 mb-4 sm:mb-6`}
              >
                {/* Responsive flex layout - better spacing on mobile */}
                <div className="flex justify-between items-center mb-2 gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Progress</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{stripeNumber} of 4 stripes</span>
                </div>
                {/* Responsive gap between progress bars */}
                <div className="flex gap-1 sm:gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className={`flex-1 h-2 sm:h-3 rounded-full transition-all ${
                        num <= stripeNumber
                          ? `bg-gradient-to-r ${belt.gradient}`
                          : 'bg-slate-200'
                      }`}
                    >
                      {num <= stripeNumber && (
                        <div className="flex items-center justify-center h-full">
                          <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* XP Badge - responsive sizing and padding for touch targets */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="text-center"
              >
                {/* Minimum 44px height for touch target, responsive text and padding */}
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-900 px-6 sm:px-8 py-3 rounded-full font-bold text-lg sm:text-xl shadow-lg min-h-[44px] flex items-center">
                  +{xpAwarded} XP
                </div>
              </motion.div>

              {/* Auto-dismiss indicator - responsive text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-slate-400 text-xs sm:text-sm mt-3 sm:mt-4"
              >
                Tap anywhere to continue
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
