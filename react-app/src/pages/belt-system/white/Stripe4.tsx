import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Trophy } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { CheckpointQuestion } from '@/components/CheckpointQuestion';
import { StripeCompleteCard } from '@/components/StripeCompleteCard';
import { whiteBeltContent } from '@/content/whiteBeltContent';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

const { lessons, quiz: quizQuestions } = whiteBeltContent[3]; // Stripe 4

export function WhiteBeltStripe4() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  useEffect(() => {
    const savedLessons = localStorage.getItem('whiteBeltStripe4Lessons');
    const savedCheckpoints = localStorage.getItem('whiteBeltStripe4Checkpoints');
    if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
    if (savedCheckpoints) setCompletedCheckpoints(JSON.parse(savedCheckpoints));
  }, []);

  useEffect(() => {
    localStorage.setItem('whiteBeltStripe4Lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('whiteBeltStripe4Checkpoints', JSON.stringify(completedCheckpoints));
  }, [completedCheckpoints]);

  useEffect(() => {
    const firstIncomplete = lessons.find(l => !completedLessons.includes(l.id));
    if (firstIncomplete && expandedLesson === null) setExpandedLesson(firstIncomplete.id);
  }, [completedLessons, expandedLesson]);

  const toggleLesson = (lessonId: number) => setExpandedLesson(expandedLesson === lessonId ? null : lessonId);

  const completeLesson = async (lessonId: number) => {
    if (completedLessons.includes(lessonId)) return;
    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < lessons.length - 1) setExpandedLesson(lessons[currentIndex + 1].id);
    else setExpandedLesson(null);
  };

  const handleCheckpointComplete = async (checkpointIndex: number) => {
    if (completedCheckpoints.includes(checkpointIndex)) return;
    const newCompleted = [...completedCheckpoints, checkpointIndex];
    setCompletedCheckpoints(newCompleted);
    await addXP(25, `White Belt Stripe 4 - Checkpoint ${checkpointIndex + 1}`);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    if (newCompleted.length === 4) {
      await addXP(100, 'White Belt Stripe 4 - Completion Bonus');
      await addXP(300, 'White Belt Complete! 🥋');
      await completeModule('white-stripe-4');
      confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 }, colors: ['#ffffff', '#818cf8', '#c084fc'] });
    }
  };

  const allCheckpointsComplete = completedCheckpoints.length === 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <div className="p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold text-white mb-4">⚪ WHITE BELT - STRIPE 4 of 4</div>
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-10 bg-slate-400 rounded" />
              <div className="w-3 h-10 bg-slate-400 rounded" />
              <div className="w-3 h-10 bg-slate-400 rounded" />
              <div className="w-3 h-10 bg-slate-100 rounded" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4"><Trophy className="inline w-10 h-10 mr-2 text-yellow-400" />Trust Mastery</h1>
            <p className="text-slate-300 text-lg">Final stripe - Complete this to earn your White Belt!</p>
          </div>
        </Card>
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;
          return (
            <div key={lesson.id}>
              <Card className="mb-6 bg-slate-800 border-slate-700 overflow-hidden">
                <button onClick={() => toggleLesson(lesson.id)} className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1 text-left">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${isCompleted ? 'bg-green-500' : 'bg-purple-500'} text-white`}>{isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}</div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Lesson {lesson.id}</div>
                      <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                      <p className="text-slate-400 text-sm">{lesson.description}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-700 p-6 space-y-6">
                      <div><h4 className="text-white font-semibold mb-3">🎯 What You'll Learn</h4><ul className="space-y-2">{lesson.content.whatYouLearn.map((item, i) => <li key={i} className="text-slate-300 flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span>{item}</span></li>)}</ul></div>
                      <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r"><h4 className="text-blue-400 font-semibold mb-3">📖 Core Concept</h4><div className="space-y-3">{lesson.content.coreConcept.map((para, i) => <p key={i} className="text-slate-300 leading-relaxed">{para}</p>)}</div></div>
                      {lesson.content.researchBox && <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r"><h4 className="text-cyan-400 font-semibold mb-3">📊 {lesson.content.researchBox.title}</h4><div className="space-y-2">{lesson.content.researchBox.content.map((item, i) => <p key={i} className="text-slate-300">{item}</p>)}</div></div>}
                      <div><h4 className="text-white font-semibold mb-3">💡 Key Takeaways</h4><ul className="space-y-2">{lesson.content.keyTakeaways.map((item, i) => <li key={i} className="text-slate-300 flex items-start gap-2"><span className="text-yellow-400 mt-1">→</span><span>{item}</span></li>)}</ul></div>
                      <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r"><h4 className="text-green-400 font-semibold mb-2">✨ Practice Exercise</h4><p className="text-slate-300">{lesson.content.practiceExercise}</p></div>
                      <Button onClick={() => completeLesson(lesson.id)} disabled={isCompleted} className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}>{isCompleted ? <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" />Complete</span> : 'Mark Complete'}</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
              {isCompleted && <CheckpointQuestion question={quizQuestions[index]} questionNumber={index + 1} onCorrect={() => handleCheckpointComplete(index)} isCompleted={completedCheckpoints.includes(index)} />}
            </div>
          );
        })}
        {allCheckpointsComplete && <StripeCompleteCard score={4} total={4} beltColor="white" stripeNumber={4} stripeName="Trust Mastery" onContinue={() => navigate('/belt-system')} />}
      </div>
    </div>
  );
}
