import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    value: string | number;
    label: string;
    description?: string;
  }[];
}

interface AssessmentLayoutProps {
  title: string;
  description: string;
  icon: string;
  questions: AssessmentQuestion[];
  onComplete: (answers: Record<string, string | number>) => void;
  resultComponent?: ReactNode;
}

export function AssessmentLayout({
  title,
  description,
  icon,
  questions,
  onComplete,
  resultComponent,
}: AssessmentLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const canGoNext = answers[currentQuestion?.id] !== undefined;
  const canGoPrev = currentIndex > 0;

  const handleAnswer = (value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isComplete && resultComponent) {
    return <>{resultComponent}</>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-5xl mb-4 block">{icon}</span>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-white/60">{description}</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-gold-300">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-300 to-gold-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700">
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'bg-gold-300/10 border-gold-300/50'
                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isSelected ? 'text-gold-300' : 'text-white'}`}>
                          {option.label}
                        </p>
                        {option.description && (
                          <p className="text-sm text-white/50 mt-1">{option.description}</p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-gold-300 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-bg-dark" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={!canGoPrev}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          icon={
            currentIndex === questions.length - 1 ? (
              <Check className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )
          }
        >
          {currentIndex === questions.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

