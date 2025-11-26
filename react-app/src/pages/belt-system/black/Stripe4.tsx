import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Trophy, Sparkles, Home, RotateCcw } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Lesson {
  id: number;
  title: string;
  description: string;
  content: {
    whatYouLearn: string[];
    coreConcept: string[];
    researchBox?: {
      title: string;
      content: string[];
    };
    keyTakeaways: string[];
    practiceExercise: string;
  };
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "What You Leave Behind",
    description: "Legacy isn't what you achieve—it's who you develop",
    content: {
      whatYouLearn: [
        "Why legacy is measured in people, not achievements",
        "The difference between monuments and movements",
        "How to think about impact beyond your lifetime"
      ],
      coreConcept: [
        "Most people think legacy is what they achieve: titles, awards, wealth. But achievements die with you. People live on.",
        "Real legacy: Who did you develop? What did you teach? How did you change how people think, lead, and live? That's what echoes.",
        "The test: If you disappeared tomorrow, what would continue without you? If the answer is 'nothing,' you haven't built a legacy—you've built dependency.",
        "Sports analogy: The coach isn't remembered for their wins—they're remembered for the players they developed who become great coaches themselves. That's a movement, not a monument."
      ],
      researchBox: {
        title: "Generativity Research",
        content: [
          "Erik Erikson's concept of generativity (concern for future generations):",
          "• People focused on legacy (developing others) report 50% higher life satisfaction",
          "• 'Generative' individuals experience lower rates of depression and higher purpose",
          "• Legacy measured in people (who you developed) outlasts legacy measured in achievements",
          "The shift: From 'What did I achieve?' to 'Who did I develop?'"
        ]
      },
      keyTakeaways: [
        "Legacy is measured in people developed, not achievements earned",
        "Monuments die; movements continue",
        "If it disappears when you leave, it's not a legacy"
      ],
      practiceExercise: "This week: Write your legacy statement. 'I want to be remembered for…' Focus on impact on people, not achievements. Then ask: Am I living that now?"
    }
  },
  {
    id: 2,
    title: "Teaching the Teachers",
    description: "Creating a cascade of leadership development",
    content: {
      whatYouLearn: [
        "Why teaching one person to teach others multiplies your impact",
        "The cascade model: Leaders who develop leaders who develop leaders",
        "How to build self-sustaining leadership culture"
      ],
      coreConcept: [
        "If you teach 10 people, your impact is 10. If you teach 1 person to teach 10 people, your impact is 100. If they each teach 10, your impact is 1,000. That's the cascade.",
        "Teaching the teachers: Your job isn't to teach everyone directly. It's to teach people who will teach others. They become the carriers of your philosophy.",
        "The cascade model: You → Leaders → Leaders → Leaders. Each generation passes on what they learned, adapted to their context. Your ideas spread far beyond your reach.",
        "Example: You teach someone about vulnerability-based trust. They teach their team. Their team members teach their families. The ripple extends infinitely."
      ],
      researchBox: {
        title: "Cascading Leadership Research",
        content: [
          "Research on leadership multiplication:",
          "• Organizations with 'leader development cascades' grow leadership capacity 10x faster",
          "• Cascading models (teach others to teach) scale impact exponentially",
          "• Leaders who focus on developing other leaders create self-sustaining cultures",
          "The key: Teach people to teach. Multiply, don't just add."
        ]
      },
      keyTakeaways: [
        "Teaching one person to teach others multiplies impact exponentially",
        "The cascade: You → Leaders → Leaders → Leaders",
        "Legacy is building a self-sustaining system, not being indispensable"
      ],
      practiceExercise: "This week: Identify one person you've developed. Ask them: 'Who are you developing?' If the answer is 'no one,' help them start. Teach them to teach."
    }
  },
  {
    id: 3,
    title: "The Stories They'll Tell",
    description: "Your legacy lives in the stories people tell about you",
    content: {
      whatYouLearn: [
        "Why stories shape legacy more than facts",
        "The difference between impressive and impactful moments",
        "How to create moments that become stories"
      ],
      coreConcept: [
        "People won't remember your PowerPoints or your policies. They'll remember the moment you admitted a mistake. The time you went to bat for them. The conversation that changed how they saw themselves.",
        "Stories shape legacy: The best leaders are remembered for pivotal moments—acts of vulnerability, courage, generosity, or wisdom—that people retell for years.",
        "Creating story-worthy moments: It's not about being impressive. It's about being impactful. The handwritten note. The hard truth delivered with care. The time you stayed late to help them through something tough.",
        "Example: 'I'll never forget the time my leader said…' That's legacy. What will people say about you?"
      ],
      researchBox: {
        title: "Narrative and Memory Research",
        content: [
          "Research on storytelling and legacy:",
          "• People remember stories 22x more than facts",
          "• Legacy is shaped more by peak moments than consistent behavior (Peak-End Rule)",
          "• Impactful moments create lasting behavior change in those who experience them",
          "The key: Create moments worth retelling."
        ]
      },
      keyTakeaways: [
        "Legacy lives in the stories people tell about you",
        "Impactful moments matter more than impressive achievements",
        "Ask: 'What will people say I did for them?'"
      ],
      practiceExercise: "This week: Think of someone who impacted you. What story do you tell about them? Now reverse it: What stories will people tell about you? Are you creating those moments intentionally?"
    }
  },
  {
    id: 4,
    title: "Beginning Again",
    description: "Mastery is a cycle, not a destination",
    content: {
      whatYouLearn: [
        "Why black belts return to white belt mindset",
        "The beginner's mind: Staying curious after mastery",
        "How to continue growing when you've 'arrived'"
      ],
      coreConcept: [
        "In martial arts, earning a black belt doesn't mean you're done—it means you're ready to begin again. You return to the fundamentals with deeper awareness.",
        "The beginner's mind (Shoshin): After mastery, the trap is thinking you know everything. The antidote is curiosity. 'What am I still missing? Where can I grow? Who can teach me?'",
        "Mastery is a cycle: You learn. You master. You teach. Then you find new areas where you're a beginner. The cycle repeats forever. That's growth.",
        "You've completed the journey through Trust → Conflict → Commitment → Accountability → Results. Now you begin again, but at a higher level. What new challenges await? What new lessons will you learn?"
      ],
      researchBox: {
        title: "Mastery and Beginner's Mind Research",
        content: [
          "Research on expertise and continued growth:",
          "• Experts who maintain 'beginner's mind' continue improving; those who don't plateau",
          "• Lifelong learners report 40% higher life satisfaction than those who 'arrive'",
          "• The mastery cycle (learn → master → teach → begin again) predicts sustained performance",
          "The key: Mastery is not a destination. It's a mindset."
        ]
      },
      keyTakeaways: [
        "Black belt means you're ready to begin again, not that you're done",
        "Beginner's mind: Stay curious after mastery",
        "The cycle: Learn → Master → Teach → Begin again"
      ],
      practiceExercise: "This week: Reflect on your journey. Where are you still a beginner? What's your next white belt moment? Write it down. Then begin."
    }
  }
];

export function BlackBeltStripe4() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('blackBeltStripe4Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blackBeltStripe4Completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Auto-expand first incomplete lesson on load
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

    
    // Auto-expand next lesson after completing current one
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < lessons.length - 1) {
      setExpandedLesson(lessons[currentIndex + 1].id);
    }

    await addXP(25, `Black Belt Stripe 4 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('black-stripe-4');
      await addXP(500, '⚫ BLACK BELT EARNED! 🥋');
      
      // Mark Black Belt as COMPLETE
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.black = 'completed';
      localStorage.setItem('beltsProgress', JSON.stringify(beltsProgress));
      
      setShowCelebration(true);
      
      // EPIC confetti celebration
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-black border-yellow-500/50">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 border border-yellow-500/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-yellow-400 mb-4 shadow-lg shadow-yellow-500/20">
              ⚫ BLACK BELT - STRIPE 4 of 4 (FINAL)
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4 flex items-center gap-3">
              <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse" />
              Legacy: What You Leave Behind
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              The final stripe: Define your legacy, learn to teach the teachers, create moments worth retelling, and embrace the beginner's mind. Complete this to earn your Black Belt and complete the entire TAP-IN journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-yellow-500/30">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-slate-300">Lessons Done</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-yellow-500/30">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 500 : 0)}</div>
                <div className="text-xs sm:text-sm text-slate-300">XP Earned</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-yellow-500/30">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{Math.round(progressPercentage)}%</div>
                <div className="text-xs sm:text-sm text-slate-300">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-slate-800 border-yellow-500/30">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Final Progress</h3>
            <div className="bg-slate-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-slate-300 text-sm mt-2">
              {completedLessons.length} of {lessons.length} lessons completed
            </p>
          </div>
        </Card>

        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;

          return (
            <Card key={lesson.id} className="mb-6 bg-slate-800 border-slate-600 overflow-hidden">
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-400'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 mb-1">Lesson {lesson.id}</div>
                    <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    <p className="text-slate-300 text-sm">{lesson.description}</p>
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
                    className="border-t border-slate-600"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          🎯 What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {lesson.content.whatYouLearn.map((item, i) => (
                            <li key={i} className="text-slate-300 flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-700/30 border-l-4 border-yellow-500 p-4 rounded-r">
                        <h4 className="text-yellow-400 font-semibold mb-3">📖 Core Concept</h4>
                        <div className="space-y-3">
                          {lesson.content.coreConcept.map((para, i) => (
                            <p key={i} className="text-slate-300 leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>

                      {lesson.content.researchBox && (
                        <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r">
                          <h4 className="text-cyan-300 font-semibold mb-3">📊 {lesson.content.researchBox.title}</h4>
                          <div className="space-y-2">
                            {lesson.content.researchBox.content.map((item, i) => (
                              <p key={i} className="text-slate-300 leading-relaxed">{item}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          💡 Key Takeaways
                        </h4>
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
                        className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-500 shadow-lg shadow-yellow-500/30'}`}
                      >
                        {isCompleted ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Completed
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Mark Complete
                            <span className="bg-slate-900 text-yellow-400 px-2 py-0.5 rounded text-sm font-bold">+25 XP</span>
                          </span>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}

        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl p-10 max-w-2xl text-center border-4 border-yellow-500 shadow-2xl shadow-yellow-500/50"
              >
                <Trophy className="w-32 h-32 text-yellow-500 mx-auto mb-6 animate-pulse" />
                
                <motion.h1 
                  className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  ⚫ BLACK BELT EARNED ⚫
                </motion.h1>
                
                <motion.p 
                  className="text-slate-300 text-xl mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  You've completed the entire TAP-IN journey. From White Belt to Black Belt. From beginner to master. You've learned to build trust, engage in conflict, create commitment, hold accountability, and focus on results. Now, begin again.
                </motion.p>

                <motion.div 
                  className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 text-slate-900 px-10 py-6 rounded-2xl font-bold text-3xl mb-8 shadow-lg shadow-yellow-500/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  +{(lessons.length * 25) + 500} XP!
                </motion.div>

                <motion.div 
                  className="space-y-3 text-yellow-400 text-lg mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="flex items-center justify-center gap-2">✓ All 20 Stripes Complete</p>
                  <p className="flex items-center justify-center gap-2">✓ 80 Lessons Mastered</p>
                  <p className="flex items-center justify-center gap-2">✓ Leadership Mastery Achieved</p>
                </motion.div>

                <motion.div 
                  className="flex flex-col gap-4 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button
                    onClick={() => {
                      setShowCelebration(false);
                      navigate('/belt-system/black/assessment');
                    }}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 text-lg font-bold shadow-xl"
                  >
                    🎯 Take Black Belt Assessment
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        setShowCelebration(false);
                        navigate('/belt-system');
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 font-bold flex-1"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Belt System
                    </Button>
                    <Button
                      onClick={() => {
                        setShowCelebration(false);
                        navigate('/dashboard');
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 font-bold flex-1"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </div>
                </motion.div>

                <motion.p 
                  className="text-slate-500 text-sm mt-8 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  "The black belt is not the end. It's the beginning."
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Step Section */}
        {completedLessons.length === lessons.length && !showCelebration && (
          <Card className="mb-8 bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-500/30">
            <div className="p-6 sm:p-8 text-center">
              <div className="text-4xl sm:text-5xl mb-4">🏆</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Achieve Black Belt Mastery
              </h3>
              <p className="text-yellow-200 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                You've completed all 80 lessons. Take the final Black Belt Assessment to prove your mastery of the 5 Dysfunctions framework!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/belt-system/black/assessment')}
                  className="min-h-[56px] bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600"
                >
                  🎯 Take Black Belt Assessment →
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/belt-system')}
                  className="min-h-[56px]"
                >
                  Back to Belt System
                </Button>
              </div>
            </div>
          </Card>
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

