import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Trophy } from 'lucide-react';
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
    title: "Measuring What Matters",
    description: "Why teams that track progress stay committed longer",
    content: {
      whatYouLearn: [
        "The difference between leading and lagging indicators",
        "Why 'I feel like I'm making progress' isn't enough",
        "How to track results without becoming obsessed with metrics"
      ],
      coreConcept: [
        "Championship teams don't guess if they're improving—they measure. Reps completed. Times recorded. Games won. Progress visible.",
        "Your life needs the same clarity. Not everything needs to be tracked, but the things you've committed to? Measure them. Otherwise, you'll lose motivation when progress feels invisible.",
        "Leading vs. lagging indicators: Lagging = results you can't control directly (weight lost, promotion earned). Leading = actions you can control (workouts completed, skills practiced). Track both, but focus on leading indicators.",
        "Example: You committed to getting stronger. Lagging: '1-rep max bench press.' Leading: 'Training sessions completed per week.' Track leading indicators weekly, lagging indicators monthly."
      ],
      researchBox: {
        title: "Measurement and Motivation Research",
        content: [
          "Research on goal tracking and achievement:",
          "• People who track progress are 42% more likely to achieve goals",
          "• Visible progress (charts, streaks) increases motivation by 35%",
          "• Leading indicators predict success 3x better than lagging indicators",
          "The key: Measure what you can control (actions), not just what you want (outcomes)."
        ]
      },
      keyTakeaways: [
        "Measure progress or it becomes invisible—and invisible progress kills motivation",
        "Track leading indicators (actions) more than lagging indicators (outcomes)",
        "Make progress visible (charts, streaks, journals)"
      ],
      practiceExercise: "This week: Pick one commitment and define 1 leading indicator (action you control) and 1 lagging indicator (result you want). Track the leading indicator daily for 7 days. See if it feels more motivating."
    }
  },
  {
    id: 2,
    title: "Scoreboard Culture",
    description: "Creating visibility and urgency around what matters",
    content: {
      whatYouLearn: [
        "Why making results public increases commitment",
        "How to create a 'scoreboard' for your goals",
        "The balance between pressure and support"
      ],
      coreConcept: [
        "In sports, the scoreboard is visible to everyone. You can't hide from the score. This creates urgency—you either adjust or lose.",
        "Your commitments need scoreboards too. Not to create shame, but to create clarity. A visible board (physical or digital) that shows: What did we commit to? What's the score? Are we winning or losing?",
        "Example: You and your partner committed to date night once/week. The scoreboard: A calendar on the fridge with checkmarks. 4 checkmarks = winning month. 2 or fewer = adjustment needed.",
        "The key: Scoreboards create urgency without judgment. They answer 'Are we doing what we said we'd do?' objectively."
      ],
      researchBox: {
        title: "Public Commitment Research",
        content: [
          "Research on public commitment and accountability:",
          "• Public goals (visible to others) increase follow-through by 65%",
          "• Visual scoreboards (calendars, charts) improve consistency by 40%",
          "• Teams with visible progress tracking report 30% higher morale",
          "The shift: From private intentions to public commitments."
        ]
      },
      keyTakeaways: [
        "Scoreboards create urgency and clarity without shame",
        "Make your commitments visible (calendar, chart, shared doc)",
        "Answer 'Are we doing what we said?' objectively, then adjust"
      ],
      practiceExercise: "This week: Create a scoreboard for one commitment. Make it visible (fridge, phone home screen, shared doc). Track for 7 days. Notice if visibility changes your behavior."
    }
  },
  {
    id: 3,
    title: "Course Correction, Not Quitting",
    description: "How to adjust when results aren't coming",
    content: {
      whatYouLearn: [
        "The difference between pivoting and quitting",
        "When to double down vs. when to change approach",
        "The '10% rule' for sustainable adjustment"
      ],
      coreConcept: [
        "Athletes don't quit when a strategy isn't working—they adjust. Half-time adjustments. Play-calling changes. Training modifications. Course correction, not quitting.",
        "When your results aren't coming: 1) Check the data (Am I actually doing what I committed to?). 2) Check the approach (Am I doing the right things?). 3) Check the timeline (Am I being patient enough?).",
        "The '10% rule': Don't overhaul everything at once. Adjust 10% and see what happens. Example: Not losing weight? Don't change your entire diet. Add 10% more protein or 10% more movement. See if that moves the needle.",
        "Quitting is stopping entirely. Course correction is staying committed to the goal while adjusting the method."
      ],
      researchBox: {
        title: "Adaptive Performance Research",
        content: [
          "Research on goal persistence and adaptation:",
          "• People who make small adjustments (10% changes) are 3x more likely to succeed than people who overhaul everything",
          "• Course correction maintains motivation; quitting and restarting kills it",
          "• High achievers adjust methods frequently but change goals rarely",
          "The key: Flexible on tactics, committed on outcomes."
        ]
      },
      keyTakeaways: [
        "Course correction (adjusting method) is different from quitting (abandoning goal)",
        "The '10% rule': Small adjustments beat complete overhauls",
        "Check: Are you doing what you said? Is the approach working? Are you being patient?"
      ],
      practiceExercise: "This week: Identify one goal where results aren't coming. Use the 3-check framework: 1) Am I doing it? 2) Is the approach working? 3) Am I being patient? Then make one 10% adjustment."
    }
  },
  {
    id: 4,
    title: "Championship Mindset: Long-Term Results",
    description: "Staying committed beyond the season",
    content: {
      whatYouLearn: [
        "Why short-term results thinking kills long-term success",
        "The 'season' mindset: Peaks, valleys, and cycles",
        "How to maintain commitment when progress isn't linear"
      ],
      coreConcept: [
        "Athletes know: One bad game doesn't define the season. One bad season doesn't end the career. Championships are built over years, not weeks.",
        "Your life works in seasons too. Training season (high intensity). Recovery season (lower intensity). Building season (focused on growth). Maintenance season (holding gains). Progress isn't linear—it's cyclical.",
        "The mistake: Expecting every week to be peak performance. Reality: Some weeks you're building, some weeks you're maintaining, some weeks you're recovering. Long-term commitment means respecting the seasons.",
        "Example: You trained hard for 3 months, hit a plateau, feel burned out. Championship mindset: 'This is recovery season. I'm maintaining for 2 weeks, then building again.' Short-term thinking: 'I'm failing, I should quit.'"
      ],
      researchBox: {
        title: "Long-Term Performance Research",
        content: [
          "Research on sustained high performance:",
          "• Elite athletes periodize (plan seasons) rather than train maximally year-round",
          "• People who accept non-linear progress maintain commitment 60% longer",
          "• 'Season thinking' reduces burnout by 45% compared to constant intensity",
          "The key: Play the long game. Commitment isn't constant effort—it's sustained intention across seasons."
        ]
      },
      keyTakeaways: [
        "Progress is cyclical, not linear—respect the seasons (build, maintain, recover)",
        "Championship mindset: Stay committed through peaks and valleys",
        "Long-term success requires periodization, not constant maximum effort"
      ],
      practiceExercise: "This week: Reflect on your current 'season.' Are you in building, maintaining, or recovery mode? Write down what that season requires. Then adjust your expectations and commitments accordingly."
    }
  }
];

export function PurpleBeltStripe4() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('purpleBeltStripe4Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('purpleBeltStripe4Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Purple Belt Stripe 4 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('purple-stripe-4');
      await addXP(200, 'Purple Belt Complete! 🥋');
      
      // Mark Purple Belt complete and Brown Belt unlocked
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.purple = 'completed';
      beltsProgress.brown = 'unlocked';
      localStorage.setItem('beltsProgress', JSON.stringify(beltsProgress));
      
      setShowCelebration(true);
      
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });

      setTimeout(() => {
        navigate('/belt-system');
      }, 4000);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-purple-800 to-purple-900 border-purple-700">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">
              🟣 PURPLE BELT - STRIPE 4 of 4 (FINAL)
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              🎯 Results Focus
            </h1>
            <p className="text-purple-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              The final stripe: Master the discipline of measuring what matters, creating scoreboard culture, course-correcting without quitting, and maintaining the championship mindset for long-term success. Complete this to earn your Purple Belt and unlock Brown Belt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-100">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-purple-200">Lessons Done</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-100">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 200 : 0)}</div>
                <div className="text-xs sm:text-sm text-purple-200">XP Earned</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-100">{Math.round(progressPercentage)}%</div>
                <div className="text-xs sm:text-sm text-purple-200">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-purple-800 border-purple-700">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Progress</h3>
            <div className="bg-purple-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-purple-200 text-sm mt-2">
              {completedLessons.length} of {lessons.length} lessons completed
            </p>
          </div>
        </Card>

        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;

          return (
            <Card key={lesson.id} className="mb-6 bg-purple-800 border-purple-700 overflow-hidden">
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-purple-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-purple-200 mb-1">Lesson {lesson.id}</div>
                    <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    <p className="text-purple-200 text-sm">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isCompleted && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Done
                    </span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-purple-200 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-purple-700"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          🎯 What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {lesson.content.whatYouLearn.map((item, i) => (
                            <li key={i} className="text-purple-100 flex items-start gap-2">
                              <span className="text-purple-300 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r">
                        <h4 className="text-purple-300 font-semibold mb-3">📖 Core Concept</h4>
                        <div className="space-y-3">
                          {lesson.content.coreConcept.map((para, i) => (
                            <p key={i} className="text-purple-100 leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>

                      {lesson.content.researchBox && (
                        <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r">
                          <h4 className="text-cyan-300 font-semibold mb-3">📊 {lesson.content.researchBox.title}</h4>
                          <div className="space-y-2">
                            {lesson.content.researchBox.content.map((item, i) => (
                              <p key={i} className="text-purple-100 leading-relaxed">{item}</p>
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
                            <li key={i} className="text-purple-100 flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r">
                        <h4 className="text-green-400 font-semibold mb-2">✨ Practice Exercise</h4>
                        <p className="text-purple-100 leading-relaxed">{lesson.content.practiceExercise}</p>
                      </div>

                      <Button
                        onClick={() => completeLesson(lesson.id)}
                        disabled={isCompleted}
                        className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600'}`}
                      >
                        {isCompleted ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Completed
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Mark Complete
                            <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-sm font-bold">+25 XP</span>
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
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-2xl p-8 max-w-lg text-center border-4 border-purple-300"
              >
                <Trophy className="w-24 h-24 text-purple-300 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-white mb-3">🟣 PURPLE BELT EARNED! 🥋</h2>
                <p className="text-purple-100 text-lg mb-6">
                  You've mastered Lack of Commitment. Brown Belt is now unlocked!
                </p>
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-2xl mb-6">
                  +{(lessons.length * 25) + 200} XP!
                </div>
                <div className="space-y-2 text-purple-200 text-sm mb-6">
                  <p>✓ All 4 Purple Belt Stripes Complete</p>
                  <p>✓ Commitment Mastery Established</p>
                  <p>✓ Brown Belt Unlocked</p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setShowCelebration(false);
                    navigate('/belt-system/purple/assessment');
                  }}
                  className="mb-4 min-h-[56px] w-full"
                >
                  🎯 Take Purple Belt Assessment
                </Button>
                <button
                  onClick={() => {
                    setShowCelebration(false);
                    navigate('/belt-system');
                  }}
                  className="text-purple-300 hover:text-white transition-colors text-sm"
                >
                  Skip for now →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Step Section */}
        {completedLessons.length === lessons.length && !showCelebration && (
          <Card className="mb-8 bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/30">
            <div className="p-6 sm:p-8 text-center">
              <div className="text-4xl sm:text-5xl mb-4">🎯</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Ready for Certification?
              </h3>
              <p className="text-purple-200 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                You've completed all Purple Belt stripes. Test your knowledge with the Purple Belt Assessment!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/belt-system/purple/assessment')}
                  className="min-h-[56px]"
                >
                  Take Purple Belt Assessment →
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
            className="text-purple-300 hover:text-white transition-colors"
          >
            ← Back to Belt System
          </button>
        </div>
      </div>
    </div>
  );
}

