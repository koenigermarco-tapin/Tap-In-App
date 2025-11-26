import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Home, Check } from 'lucide-react';

interface TapHomeButtonProps {
  onSave?: () => Promise<void>; // Optional save function
}

export function TapHomeButton({ onSave }: TapHomeButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't show on dashboard or home
  if (location.pathname === '/dashboard' || location.pathname === '/') {
    return null;
  }

  const handleTap = async () => {
    setIsSaving(true);

    try {
      // Save progress if save function provided
      if (onSave) {
        await onSave();
      }

      setShowSaved(true);

      // Brief delay to show "Saved!" feedback
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (error) {
      console.error('Save failed:', error);
      // Navigate anyway even if save fails
      setTimeout(() => {
        navigate('/dashboard');
      }, 300);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
    >
      <motion.button
        onClick={handleTap}
        disabled={isSaving || showSaved}
        className="relative group"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Main button */}
        <motion.div
          className="relative w-16 h-16 bg-gradient-to-br from-gold-300 to-gold-400 rounded-full shadow-2xl flex items-center justify-center cursor-pointer"
          animate={
            isSaving
              ? {
                  rotate: 360,
                }
              : showSaved
              ? {
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{
            duration: isSaving ? 0.8 : 0.3,
            repeat: isSaving ? Infinity : 0,
            ease: 'linear',
          }}
        >
          {/* Inner circle design */}
          <div className="absolute inset-1 rounded-full border-2 border-gold-200/50" />

          {/* Icon/Text */}
          <AnimatePresence mode="wait">
            {showSaved ? (
              <motion.div
                key="saved"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="text-navy-900"
              >
                <Check className="w-7 h-7" strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div
                key="tap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col items-center"
              >
                <Home className="w-5 h-5 text-navy-900" strokeWidth={2.5} />
                <span className="text-navy-900 font-bold text-[10px] uppercase tracking-wider mt-0.5">
                  TAP
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse ring animation */}
          {!showSaved && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold-300"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold-400"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </>
          )}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !showSaved && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-navy-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
            >
              <div className="relative">
                {onSave ? 'Save & Return to Gym' : 'Return to Gym'}
                {/* Arrow */}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-navy-900" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Saved!" message */}
        <AnimatePresence>
          {showSaved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap"
            >
              Saved! 🎉
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

