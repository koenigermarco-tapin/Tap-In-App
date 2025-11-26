import { useState } from 'react';
import { motion } from 'framer-motion';

interface CheckpointQuestionProps {
  question: {
    id: string;
    question: string;
    options: { label: string; text: string }[];
    correct: string;
    explanation?: string;
  };
  questionNumber: number;
  onCorrect: () => void;
  disabled?: boolean;
  isCompleted?: boolean;
}

export function CheckpointQuestion({ 
  question, 
  questionNumber, 
  onCorrect,
  disabled,
  isCompleted = false
}: CheckpointQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(isCompleted);
  const [isCorrect, setIsCorrect] = useState(isCompleted);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === question.correct) {
      setIsCorrect(true);
      onCorrect();
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelected(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 my-6 ${
        isCorrect 
          ? 'bg-green-900/30 border border-green-500' 
          : submitted 
            ? 'bg-red-900/30 border border-red-500'
            : 'bg-slate-800 border border-slate-700'
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-slate-400">
          ❓ Checkpoint {questionNumber}
        </span>
        {isCorrect && <span className="text-green-400 font-bold">✅ +25 XP</span>}
      </div>

      <p className="text-lg mb-4 text-white">{question.question}</p>

      <div className="space-y-3 mb-6">
        {question.options.map(option => (
          <button
            key={option.label}
            onClick={() => !isCorrect && !disabled && setSelected(option.label)}
            disabled={isCorrect || disabled}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              isCorrect && option.label === question.correct
                ? 'border-green-500 bg-green-500/20 text-white'
                : submitted && selected === option.label && !isCorrect
                  ? 'border-red-500 bg-red-500/20 text-white'
                  : selected === option.label
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-slate-600 hover:border-slate-500 text-slate-300'
            } ${isCorrect || disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="font-bold mr-2">{option.label})</span>
            {option.text}
          </button>
        ))}
      </div>

      {!isCorrect && (
        <div className="flex gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="px-6 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-semibold"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {submitted && !isCorrect && (
        <p className="text-red-400 mt-4">
          Not quite. Review the lesson and try again!
        </p>
      )}

      {isCorrect && question.explanation && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-300 mt-4 bg-green-900/20 p-3 rounded-lg"
        >
          ✓ {question.explanation}
        </motion.p>
      )}
    </motion.div>
  );
}

