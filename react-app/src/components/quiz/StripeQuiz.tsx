import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import confetti from 'canvas-confetti';

interface QuizOption {
  label: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correct: string;
  explanation?: string;
}

interface StripeQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number, passed: boolean) => void;
  stripeName: string;
  beltColor: string; // Used for future theming
  stripeNumber: number;
}

export function StripeQuiz({ 
  questions, 
  onComplete, 
  stripeName,
  beltColor: _beltColor, // Prefix with underscore to indicate intentionally unused
  stripeNumber 
}: StripeQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correct++;
    });
    setScore(correct);
    setShowResults(true);

    const percentage = (correct / questions.length) * 100;
    const passed = percentage >= 70;

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    onComplete(correct, questions.length, passed);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
  const percentage = showResults ? Math.round((score / questions.length) * 100) : 0;
  const passed = percentage >= 70;

  if (showResults) {
    return (
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <div className="p-6 sm:p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-6"
          >
            <div className="text-6xl sm:text-7xl mb-4">
              {passed ? '🎉' : '📚'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {passed ? 'Quiz Complete!' : 'Keep Learning'}
            </h3>
            <div className="text-5xl sm:text-6xl font-bold mb-2">
              <span className={passed ? 'text-green-400' : 'text-yellow-400'}>
                {score}/{questions.length}
              </span>
            </div>
            <div className="text-xl sm:text-2xl text-slate-300 mb-4">
              {percentage}% correct
            </div>
            {passed ? (
              <p className="text-green-400 text-base sm:text-lg max-w-2xl mx-auto">
                Excellent work! You've demonstrated understanding of {stripeName}. You can now complete this stripe and earn your rewards.
              </p>
            ) : (
              <p className="text-yellow-400 text-base sm:text-lg max-w-2xl mx-auto">
                Review the lessons above and try again. You need 70% to pass (at least {Math.ceil(questions.length * 0.7)} out of {questions.length} correct).
              </p>
            )}
          </motion.div>

          {/* Show Review of Answers */}
          <div className="space-y-4 mb-6">
            <h4 className="text-lg font-bold text-white">Review Your Answers:</h4>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correct;
              
              return (
                <div key={q.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">
                        Question {index + 1}: {q.question}
                      </p>
                      <p className="text-sm text-slate-300 mb-1">
                        Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                          {userAnswer}) {q.options.find(o => o.label === userAnswer)?.text}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-1">
                          Correct answer: {q.correct}) {q.options.find(o => o.label === q.correct)?.text}
                        </p>
                      )}
                      {q.explanation && (
                        <p className="text-sm text-slate-400 mt-2 italic">
                          💡 {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!passed && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setShowResults(false);
                setSelectedAnswers({});
                setCurrentQuestion(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full"
            >
              Retake Quiz
            </Button>
          )}
        </div>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = !!selectedAnswers[question.id];

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <div className="p-6 sm:p-8">
        {/* Quiz Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              📝 Stripe {stripeNumber} Knowledge Check
            </h3>
            <p className="text-slate-400 text-sm">
              Test your understanding of {stripeName}
            </p>
          </div>
          <div className="text-slate-400 text-sm bg-slate-800 px-4 py-2 rounded-lg">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  selectedAnswers[questions[index].id]
                    ? 'bg-blue-500'
                    : index === currentQuestion
                    ? 'bg-slate-600'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <p className="text-lg sm:text-xl text-white mb-6 leading-relaxed">
                {question.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map(option => {
                  const isSelected = selectedAnswers[question.id] === option.label;
                  
                  return (
                    <button
                      key={option.label}
                      onClick={() => handleSelect(question.id, option.label)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/20 shadow-lg'
                          : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-500'
                        }`}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-white mr-2">{option.label})</span>
                          <span className="text-slate-200">{option.text}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            icon={<ChevronLeft className="w-4 h-4" />}
            className="min-h-[48px]"
          >
            Previous
          </Button>
          
          <div className="flex gap-3 flex-1 sm:flex-initial">
            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="flex-1 sm:flex-initial min-h-[48px] px-8"
              >
                {allAnswered ? 'Submit Quiz' : `Answer all ${questions.length} questions`}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!isAnswered}
                icon={<ChevronRight className="w-4 h-4" />}
                className="flex-1 sm:flex-initial min-h-[48px]"
              >
                Next Question
              </Button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-slate-500 text-sm mt-4">
          Passing score: 70% ({Math.ceil(questions.length * 0.7)}/{questions.length} correct)
        </p>
      </div>
    </Card>
  );
}

