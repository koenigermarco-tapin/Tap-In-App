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
    title: "Self-Accountability as a Lifelong Practice",
    description: "Making accountability a non-negotiable part of who you are",
    content: {
      whatYouLearn: [
        "Why accountability is a practice, not a destination",
        "How to maintain accountability when no one's watching",
        "The identity shift: From 'I should' to 'I am'"
      ],
      coreConcept: [
        "Mastery isn't about being perfect. It's about owning your gaps consistently, forever. The black belt who misses training doesn't make excuses—they acknowledge it, adjust, and get back on the mat.",
        "Self-accountability when no one's watching: This is the real test. When there's no scoreboard, no coach, no team—do you still keep your commitments to yourself? That's mastery.",
        "The identity shift: Beginners say 'I should work out.' Intermediates say 'I'm trying to work out.' Masters say 'I work out'—it's part of who they are, not something they're trying to do.",
        "Example: A master athlete doesn't need a coach to show up. They train because that's who they are. The commitment is internal, not external."
      ],
      researchBox: {
        title: "Self-Determination and Identity Research",
        content: [
          "Research on intrinsic motivation and identity:",
          "• People who internalize behaviors ('I am X') maintain them 5x longer than people who externalize ('I should do X')",
          "• Self-accountability without external pressure is the strongest predictor of long-term success",
          "• Identity-based habits ('I am a person who…') are 3x more resilient than goal-based habits",
          "The shift: From external motivation to internal identity."
        ]
      },
      keyTakeaways: [
        "Accountability mastery = owning your gaps consistently, forever",
        "Self-accountability when no one's watching is the real test",
        "Identity shift: From 'I should' to 'I am'"
      ],
      practiceExercise: "This week: Write down one behavior you want to master. Reframe it as identity: 'I am a person who…' Practice self-accountability for 7 days with no external tracking or pressure. See if the internal commitment holds."
    }
  },
  {
    id: 2,
    title: "Modeling Accountability for Others",
    description: "How your accountability (or lack of it) sets the standard",
    content: {
      whatYouLearn: [
        "Why leaders who don't model accountability lose credibility instantly",
        "How to publicly acknowledge your own gaps",
        "The ripple effect of visible self-accountability"
      ],
      coreConcept: [
        "People don't listen to what you say about accountability. They watch what you do. If you demand accountability from others but make excuses for yourself, you've lost them.",
        "Modeling accountability: When you miss a commitment, acknowledge it publicly. 'I said I'd have this done by Friday. I didn't. Here's why, here's what I'm doing to fix it, and here's my new commitment.' No hiding, no excuses.",
        "The ripple effect: When leaders model accountability, teams follow. When one person owns their gaps openly, others feel safe to do the same. Vulnerability creates the culture.",
        "Sports example: The team captain who admits 'I cost us that game' gives everyone permission to be honest about their own performance. Culture shifts."
      ],
      researchBox: {
        title: "Leadership and Modeling Research",
        content: [
          "Research on leadership behavior and team culture:",
          "• Leaders who model desired behaviors see 3x higher adoption rates",
          "• Public acknowledgment of personal failures increases team psychological safety by 40%",
          "• Teams with high modeling leadership have 50% lower blame culture",
          "The key: Your behavior sets the standard, not your words."
        ]
      },
      keyTakeaways: [
        "People watch your accountability behavior, not your words",
        "Model accountability by publicly owning your gaps",
        "Your visible self-accountability creates permission for others"
      ],
      practiceExercise: "This week: Next time you miss a commitment, acknowledge it publicly (team meeting, family dinner, group chat). State what you committed to, what happened, and your new commitment. Model the standard you want."
    }
  },
  {
    id: 3,
    title: "Accountability Without Ego",
    description: "Separating accountability from your self-worth",
    content: {
      whatYouLearn: [
        "Why ego makes accountability threatening",
        "How to separate 'I failed' from 'I'm a failure'",
        "The growth mindset approach to accountability"
      ],
      coreConcept: [
        "Ego says: 'If I admit I failed, I'm a failure.' Mastery says: 'I failed at this—what do I learn?' The difference: Ego ties outcomes to identity. Mastery separates them.",
        "Accountability without ego: 'I committed to X. I delivered Y. The gap is Z. That doesn't make me a bad person—it makes me someone who's learning.' Owning gaps without shame or defensiveness.",
        "Growth mindset: Failures are data, not verdicts. Every gap is information. 'I missed my training goal 3 weeks in a row. What's the pattern? What needs to change?' Curiosity, not self-flagellation.",
        "BJJ analogy: Getting tapped isn't personal failure—it's a technique you need to study. The tap is data, not a statement about your worth."
      ],
      researchBox: {
        title: "Ego and Learning Research",
        content: [
          "Research on ego, accountability, and growth:",
          "• Fixed mindset (ego-driven) reduces willingness to admit mistakes by 70%",
          "• Growth mindset (learning-driven) increases accountability and iteration speed",
          "• Separating behavior from identity reduces shame and increases course correction",
          "The shift: From 'I'm a failure' to 'I'm learning.'"
        ]
      },
      keyTakeaways: [
        "Ego ties outcomes to identity ('I'm a failure'); mastery separates them ('I failed—what do I learn?')",
        "Accountability without ego: Own gaps without shame or defensiveness",
        "Growth mindset: Failures are data, not verdicts"
      ],
      practiceExercise: "This week: Notice when you feel defensive about a gap or failure. Pause. Separate behavior from identity: 'I did X (behavior), which didn't work. That doesn't mean I'm Y (identity judgment). What do I learn?' Practice the shift."
    }
  },
  {
    id: 4,
    title: "Accountability as Love",
    description: "Holding people accountable because you care, not because you're controlling",
    content: {
      whatYouLearn: [
        "Why accountability is a form of respect and care",
        "The difference between accountability and control",
        "How to hold people to their potential, not your expectations"
      ],
      coreConcept: [
        "The highest form of accountability is saying: 'I believe in you enough to not let you settle.' Not because you need something from them, but because you care about who they're becoming.",
        "Accountability as love: 'You said you wanted X. I'm holding you to that because I believe you can achieve it. I'm not controlling you—I'm believing in you.' This is care, not pressure.",
        "The difference: Control says 'You need to do this for me.' Love says 'You committed to this for yourself. I'm here to help you honor that.' One is about your needs. The other is about their growth.",
        "Sports example: The best coaches push you because they see your potential. They're not angry—they're invested. That's accountability as love."
      ],
      researchBox: {
        title: "Support and Accountability Research",
        content: [
          "Research on supportive accountability:",
          "• Accountability framed as 'belief in potential' is 3x more motivating than 'you're failing'",
          "• People respond to accountability from those they believe care about them",
          "• 'Tough love' accountability (high standards + high support) has the best long-term outcomes",
          "The key: Hold people accountable because you believe in them, not because you need them to perform."
        ]
      },
      keyTakeaways: [
        "Accountability as love: 'I believe in you enough to not let you settle'",
        "Control = 'Do this for me.' Love = 'You committed to this—I'm helping you honor it.'",
        "Hold people to their potential, not your expectations"
      ],
      practiceExercise: "This week: Hold one person accountable from a place of care, not control. Frame it: 'You said you wanted X. I believe you can do it. How can I support you in following through?' Track how they respond differently to love-based accountability."
    }
  }
];

export function BrownBeltStripe4() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('brownBeltStripe4Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('brownBeltStripe4Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Brown Belt Stripe 4 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('brown-stripe-4');
      await addXP(200, 'Brown Belt Complete! 🥋');
      
      // Mark Brown Belt complete and Black Belt unlocked
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.brown = 'completed';
      beltsProgress.black = 'unlocked';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-amber-800 to-amber-900 border-amber-700">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">
              🟤 BROWN BELT - STRIPE 4 of 4 (FINAL)
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              🏆 Accountability Mastery
            </h1>
            <p className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              The final stripe: Master self-accountability as a lifelong practice, model accountability for others, separate accountability from ego, and practice accountability as love. Complete this to earn your Brown Belt and unlock Black Belt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-100">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-amber-200">Lessons Done</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-100">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 200 : 0)}</div>
                <div className="text-xs sm:text-sm text-amber-200">XP Earned</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-100">{Math.round(progressPercentage)}%</div>
                <div className="text-xs sm:text-sm text-amber-200">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-amber-800 border-amber-700">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Progress</h3>
            <div className="bg-amber-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-amber-200 text-sm mt-2">
              {completedLessons.length} of {lessons.length} lessons completed
            </p>
          </div>
        </Card>

        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;

          return (
            <Card key={lesson.id} className="mb-6 bg-amber-800 border-amber-700 overflow-hidden">
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-amber-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-amber-200 mb-1">Lesson {lesson.id}</div>
                    <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    <p className="text-amber-200 text-sm">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isCompleted && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Done
                    </span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-amber-200 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-amber-700"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          🎯 What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {lesson.content.whatYouLearn.map((item, i) => (
                            <li key={i} className="text-amber-100 flex items-start gap-2">
                              <span className="text-amber-300 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r">
                        <h4 className="text-amber-300 font-semibold mb-3">📖 Core Concept</h4>
                        <div className="space-y-3">
                          {lesson.content.coreConcept.map((para, i) => (
                            <p key={i} className="text-amber-100 leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>

                      {lesson.content.researchBox && (
                        <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r">
                          <h4 className="text-cyan-300 font-semibold mb-3">📊 {lesson.content.researchBox.title}</h4>
                          <div className="space-y-2">
                            {lesson.content.researchBox.content.map((item, i) => (
                              <p key={i} className="text-amber-100 leading-relaxed">{item}</p>
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
                            <li key={i} className="text-amber-100 flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r">
                        <h4 className="text-green-400 font-semibold mb-2">✨ Practice Exercise</h4>
                        <p className="text-amber-100 leading-relaxed">{lesson.content.practiceExercise}</p>
                      </div>

                      <Button
                        onClick={() => completeLesson(lesson.id)}
                        disabled={isCompleted}
                        className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600'}`}
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
                className="bg-gradient-to-br from-amber-800 to-amber-900 rounded-2xl p-8 max-w-lg text-center border-4 border-amber-300"
              >
                <Trophy className="w-24 h-24 text-amber-300 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-white mb-3">🟤 BROWN BELT EARNED! 🥋</h2>
                <p className="text-amber-100 text-lg mb-6">
                  You've mastered Accountability. Black Belt is now unlocked—the final journey awaits!
                </p>
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg font-bold text-2xl mb-6">
                  +{(lessons.length * 25) + 200} XP!
                </div>
                <div className="space-y-2 text-amber-200 text-sm mb-6">
                  <p>✓ All 4 Brown Belt Stripes Complete</p>
                  <p>✓ Accountability Mastery Established</p>
                  <p>✓ Black Belt Unlocked</p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setShowCelebration(false);
                    navigate('/belt-system/brown/assessment');
                  }}
                  className="mb-4 min-h-[56px] w-full"
                >
                  🎯 Take Brown Belt Assessment
                </Button>
                <button
                  onClick={() => {
                    setShowCelebration(false);
                    navigate('/belt-system');
                  }}
                  className="text-amber-300 hover:text-white transition-colors text-sm"
                >
                  Skip for now →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Step Section */}
        {completedLessons.length === lessons.length && !showCelebration && (
          <Card className="mb-8 bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-500/30">
            <div className="p-6 sm:p-8 text-center">
              <div className="text-4xl sm:text-5xl mb-4">🎯</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Ready for Certification?
              </h3>
              <p className="text-amber-200 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                You've completed all Brown Belt stripes. Test your knowledge with the Brown Belt Assessment!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/belt-system/brown/assessment')}
                  className="min-h-[56px]"
                >
                  Take Brown Belt Assessment →
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
            className="text-amber-300 hover:text-white transition-colors"
          >
            ← Back to Belt System
          </button>
        </div>
      </div>
    </div>
  );
}

