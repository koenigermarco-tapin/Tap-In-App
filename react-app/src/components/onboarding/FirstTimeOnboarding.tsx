import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Trophy, Target, Flame, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OnboardingSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
}

const slides: OnboardingSlide[] = [
  {
    icon: <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-gold-300" />,
    title: 'Welcome to THE GYM',
    description: 'Your personal dojo for leadership development. Master the 5 dysfunctions of a team through gamified learning, from White Belt to Black Belt mastery.'
  },
  {
    icon: <Target className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400" />,
    title: 'Belt Progression System',
    description: 'Start with White Belt (Trust) and progress through Blue (Conflict), Purple (Commitment), Brown (Accountability), to Black Belt (Results). Each belt has 4 stripes to earn.'
  },
  {
    icon: <Flame className="w-16 h-16 sm:w-20 sm:h-20 text-orange-400" />,
    title: 'Build Your Streak',
    description: 'Train daily to maintain your streak. Every lesson earns you XP, levels up your skills, and unlocks achievements. Consistency is key to mastery.'
  },
  {
    icon: <Award className="w-16 h-16 sm:w-20 sm:h-20 text-purple-400" />,
    title: 'Earn Achievements',
    description: 'Complete lessons, earn stripes, and collect badges. Track your progress, compete on leaderboards, and celebrate every milestone on your journey.'
  }
];

export function FirstTimeOnboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('tap-in-onboarding-completed');
    if (!hasSeenOnboarding) {
      // Small delay before showing onboarding
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    }
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('tap-in-onboarding-completed', 'true');
    setIsOpen(false);
  };

  const currentSlideData = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          {/* Onboarding Card - Responsive sizing */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-white/10 relative overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
              aria-label="Close onboarding"
            >
              <X className="w-5 h-5 text-white/70 group-hover:text-white" />
            </button>

            {/* Content - Responsive padding */}
            <div className="p-6 sm:p-8 md:p-12">
              {/* Icon - Centered and responsive */}
              <motion.div
                key={currentSlide}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6 sm:mb-8"
              >
                {currentSlideData.icon}
              </motion.div>

              {/* Title - Responsive typography */}
              <motion.h2
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4 sm:mb-6 leading-tight"
              >
                {currentSlideData.title}
              </motion.h2>

              {/* Description - Responsive text and line height */}
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-white/80 text-center leading-relaxed mb-8 sm:mb-12 px-2"
              >
                {currentSlideData.description}
              </motion.p>

              {/* Progress Dots - Responsive sizing */}
              <div className="flex justify-center gap-2 mb-6 sm:mb-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all ${
                      index === currentSlide
                        ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gold-300'
                        : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/50'
                    } rounded-full`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Buttons - Responsive layout and sizing */}
              <div className="flex gap-3 sm:gap-4">
                {currentSlide > 0 && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    className="flex-1 min-h-[48px] sm:min-h-[56px]"
                    icon={<ChevronLeft className="w-5 h-5" />}
                  >
                    Back
                  </Button>
                )}

                <Button
                  variant="primary"
                  onClick={handleNext}
                  className={`${currentSlide === 0 ? 'w-full' : 'flex-1'} min-h-[48px] sm:min-h-[56px] text-base sm:text-lg font-bold`}
                >
                  {isLastSlide ? (
                    <>
                      Start Training
                      <Trophy className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* Skip button - Responsive text */}
              {!isLastSlide && (
                <button
                  onClick={handleSkip}
                  className="w-full text-center text-white/50 hover:text-white/70 transition-colors mt-4 text-sm sm:text-base py-2"
                >
                  Skip tutorial
                </button>
              )}
            </div>

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gold-300/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

