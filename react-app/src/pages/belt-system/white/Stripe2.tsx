import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { CheckpointQuestion } from '@/components/CheckpointQuestion';
import { StripeCompleteCard } from '@/components/StripeCompleteCard';
import { whiteBeltContent } from '@/content/whiteBeltContent';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

const { lessons, quiz: quizQuestions } = whiteBeltContent[1]; // Stripe 2

export function WhiteBeltStripe2() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  useEffect(() => {
    const savedLessons = localStorage.getItem('whiteBeltStripe2Lessons');
    const savedCheckpoints = localStorage.getItem('whiteBeltStripe2Checkpoints');
    if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
    if (savedCheckpoints) setCompletedCheckpoints(JSON.parse(savedCheckpoints));
  }, []);

  useEffect(() => {
    localStorage.setItem('whiteBeltStripe2Lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('whiteBeltStripe2Checkpoints', JSON.stringify(completedCheckpoints));
  }, [completedCheckpoints]);

  useEffect(() => {
    const firstIncomplete = lessons.find(l => !completedLessons.includes(l.id));
    if (firstIncomplete && expandedLesson === null) {
      setExpandedLesson(firstIncomplete.id);
    }
  }, [completedLessons, expandedLesson]);

  const toggleLesson = (lessonId: number) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const completeLesson = async (lessonId: number) => {
    if (completedLessons.includes(lessonId)) return;
    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < lessons.length - 1) {
      setExpandedLesson(lessons[currentIndex + 1].id);
    } else {
      setExpandedLesson(null);
    }
  };

  const handleCheckpointComplete = async (checkpointIndex: number) => {
    if (completedCheckpoints.includes(checkpointIndex)) return;
    const newCompleted = [...completedCheckpoints, checkpointIndex];
    setCompletedCheckpoints(newCompleted);
    await addXP(25, `White Belt Stripe 2 - Checkpoint ${checkpointIndex + 1}`);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    if (newCompleted.length === 4) {
      await addXP(100, 'White Belt Stripe 2 - Completion Bonus');
      await completeModule('white-stripe-2');
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 } });
    }
  };

  const allCheckpointsComplete = completedCheckpoints.length === 4;
  const progressPercentage = (completedCheckpoints.length / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <div className="p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold text-white mb-4">
              ⚪ WHITE BELT - STRIPE 2 of 4
            </div>
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-10 bg-slate-400 rounded" />
              <div className="w-3 h-10 bg-slate-100 rounded" />
              <div className="w-3 h-10 bg-slate-600 rounded" />
              <div className="w-3 h-10 bg-slate-600 rounded" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              🤝 Practicing Vulnerability
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Learn to demonstrate vulnerability and create psychological safety for others.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">{completedCheckpoints.length}/4</div>
                <div className="text-sm text-slate-400">Checkpoints</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {completedCheckpoints.length * 25 + (allCheckpointsComplete ? 100 : 0)}
                </div>
                <div className="text-sm text-slate-400">XP Earned</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-slate-400">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-slate-800 border-slate-700">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Progress</h3>
            <div className="bg-slate-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-slate-400 text-sm mt-2">
              {completedCheckpoints.length} of 4 checkpoints completed
            </p>
          </div>
        </Card>

        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;
          const checkpointCompleted = completedCheckpoints.includes(index);

          return (
            <div key={lesson.id}>
              <Card className="mb-6 bg-slate-800 border-slate-700 overflow-hidden">
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Lesson {lesson.id}</div>
                      <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                      <p className="text-slate-400 text-sm">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isCompleted && (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                        ✓ Done
                      </span>
                    )}
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-700"
                    >
                      <div className="p-6 space-y-6">
                        <div>
                          <h4 className="text-white font-semibold mb-3">🎯 What You'll Learn</h4>
                          <ul className="space-y-2">
                            {lesson.content.whatYouLearn.map((item, i) => (
                              <li key={i} className="text-slate-300 flex items-start gap-2">
                                <span className="text-purple-400 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r">
                          <h4 className="text-blue-400 font-semibold mb-3">📖 Core Concept</h4>
                          <div className="space-y-3">
                            {lesson.content.coreConcept.map((para, i) => (
                              <p key={i} className="text-slate-300 leading-relaxed">{para}</p>
                            ))}
                          </div>
                        </div>

                        {lesson.content.researchBox && (
                          <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r">
                            <h4 className="text-cyan-400 font-semibold mb-3">📊 {lesson.content.researchBox.title}</h4>
                            <div className="space-y-2">
                              {lesson.content.researchBox.content.map((item, i) => (
                                <p key={i} className="text-slate-300 leading-relaxed">{item}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="text-white font-semibold mb-3">💡 Key Takeaways</h4>
                          <ul className="space-y-2">
                            {lesson.content.keyTakeaways.map((item, i) => (
                              <li key={i} className="text-slate-300 flex items-start gap-2">
                                <span className="text-yellow-400 mt-1">→</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r">
                          <h4 className="text-green-400 font-semibold mb-2">✨ Practice Exercise</h4>
                          <p className="text-slate-300 leading-relaxed">{lesson.content.practiceExercise}</p>
                        </div>

                        <Button
                          onClick={() => completeLesson(lesson.id)}
                          disabled={isCompleted}
                          className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'}`}
                        >
                          {isCompleted ? (
                            <span className="flex items-center justify-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              Lesson Complete
                            </span>
                          ) : (
                            'Mark Lesson Complete'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {isCompleted && (
                <CheckpointQuestion
                  question={quizQuestions[index]}
                  questionNumber={index + 1}
                  onCorrect={() => handleCheckpointComplete(index)}
                  isCompleted={checkpointCompleted}
                />
              )}
            </div>
          );
        })}

        {allCheckpointsComplete && (
          <StripeCompleteCard
            score={4}
            total={4}
            beltColor="white"
            stripeNumber={2}
            stripeName="Practicing Vulnerability"
            onContinue={() => navigate('/belt-system/white/stripe-3')}
          />
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/belt-system')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Belt System
          </button>
        </div>
      </div>
    </div>
  );
}
