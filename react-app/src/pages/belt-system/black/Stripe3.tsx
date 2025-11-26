import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, BookOpen } from 'lucide-react';
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
    title: "What You Believe About People",
    description: "Your assumptions about human nature shape your leadership",
    content: {
      whatYouLearn: [
        "Theory X vs. Theory Y: Do you believe people are lazy or driven?",
        "How your assumptions become self-fulfilling prophecies",
        "The difference between trust-first and prove-it-first leadership"
      ],
      coreConcept: [
        "Douglas McGregor's Theory X vs. Theory Y:",
        "**Theory X**: People are inherently lazy, need control, avoid responsibility. So you micromanage, punish mistakes, withhold trust.",
        "**Theory Y**: People are inherently motivated, seek responsibility, want to contribute. So you give autonomy, support growth, trust first.",
        "Here's the twist: Your beliefs shape reality. If you treat people as Theory X, they'll act that way (because micromanagement kills motivation). If you treat them as Theory Y, they'll rise to it (because autonomy creates ownership).",
        "Your philosophy isn't just what you believe—it's what you create. Trust-first leaders build high-trust teams. Prove-it-first leaders build resentful teams."
      ],
      researchBox: {
        title: "Self-Fulfilling Prophecy Research",
        content: [
          "Research on leadership beliefs and outcomes:",
          "• Leaders with Theory Y beliefs have teams with 40% higher engagement",
          "• 'Trust first' leadership increases team performance by 50%",
          "• Self-fulfilling prophecies: Your expectations shape behavior",
          "The key: What you believe about people determines who they become."
        ]
      },
      keyTakeaways: [
        "Theory X (lazy, need control) vs. Theory Y (motivated, seek responsibility)",
        "Your beliefs become self-fulfilling prophecies",
        "Trust-first leadership creates high-trust teams"
      ],
      practiceExercise: "This week: Reflect on your default belief. Do you assume people will step up, or let you down? Write your honest answer. Then ask: Is this belief serving me? What would change if I believed the opposite?"
    }
  },
  {
    id: 2,
    title: "Your Non-Negotiables",
    description: "Defining the principles you'll never compromise on",
    content: {
      whatYouLearn: [
        "Why great leaders have clear non-negotiables",
        "The difference between values (aspirational) and non-negotiables (absolute)",
        "How to communicate your non-negotiables without being rigid"
      ],
      coreConcept: [
        "Values are what you aspire to (integrity, growth, excellence). Non-negotiables are what you'll fire someone over (lying, violating trust, harming the team).",
        "Non-negotiables create clarity: 'These are the things I will never tolerate, no matter how talented you are or how much pressure we're under.' They're the line you won't cross.",
        "Examples: 'We never lie to customers.' 'We never blame publicly.' 'We never skip safety protocols.' Clear. Absolute. Everyone knows the rules.",
        "The key: Non-negotiables aren't about control—they're about protecting what matters most. They create safety because people know the boundaries."
      ],
      researchBox: {
        title: "Principles and Culture Research",
        content: [
          "Research on organizational principles:",
          "• Organizations with clear non-negotiables have 35% higher trust",
          "• Consistently enforced principles reduce ambiguity and stress",
          "• Non-negotiables that are communicated but not enforced destroy credibility",
          "The rule: Define them clearly, communicate them often, enforce them always."
        ]
      },
      keyTakeaways: [
        "Non-negotiables are absolutes—the line you'll never cross",
        "They create clarity and safety by defining boundaries",
        "Communicate clearly, enforce consistently"
      ],
      practiceExercise: "This week: Write down your 3-5 non-negotiables. What will you never tolerate? What would you fire someone over? Share them with your team or family. Make them explicit."
    }
  },
  {
    id: 3,
    title: "How You Define Success",
    description: "What winning looks like when no one's watching",
    content: {
      whatYouLearn: [
        "The difference between external success (accolades) and internal success (integrity)",
        "Why 'winning at all costs' is actually losing",
        "How to measure success beyond results"
      ],
      coreConcept: [
        "Most people define success externally: money, titles, recognition. Masters define it internally: integrity, growth, impact.",
        "The test: If you achieve your goal but violate your values, did you win? If you answer 'yes,' you're playing a game you'll eventually lose (health, relationships, respect).",
        "Internal success metrics: Did I do what I said I'd do? Did I help someone grow? Did I stay true to my principles under pressure? Did I leave things better than I found them?",
        "Sports analogy: The athlete who uses steroids to win. Externally, they got the medal. Internally, they lost. Mastery is winning the right way, or not at all."
      ],
      researchBox: {
        title: "Success and Well-Being Research",
        content: [
          "Research on success metrics and fulfillment:",
          "• People who prioritize external success (money, status) have 30% lower life satisfaction",
          "• People who prioritize internal success (values, growth, impact) report 50% higher well-being",
          "• 'Winning at all costs' correlates with burnout, broken relationships, and regret",
          "The shift: From external validation to internal integrity."
        ]
      },
      keyTakeaways: [
        "External success (accolades) vs. internal success (integrity, growth, impact)",
        "The test: If you achieve the goal but violate values, did you win?",
        "Measure success by integrity, not just results"
      ],
      practiceExercise: "This week: Define your internal success metrics. Write 3-5 questions to evaluate yourself beyond results. Use them to review your last week. How'd you do?"
    }
  },
  {
    id: 4,
    title: "Your Leadership Manifesto",
    description: "Articulating your philosophy in writing",
    content: {
      whatYouLearn: [
        "Why writing your philosophy clarifies your thinking",
        "How to structure a personal leadership manifesto",
        "The power of making your beliefs explicit"
      ],
      coreConcept: [
        "Your leadership philosophy is the sum of your beliefs: What you believe about people. Your non-negotiables. How you define success. Writing it down forces clarity.",
        "Structure of a leadership manifesto:",
        "1. **What I Believe**: Core assumptions about people and teams.",
        "2. **My Non-Negotiables**: The lines I won't cross.",
        "3. **How I Define Success**: Internal metrics that matter most.",
        "4. **How I Want to Be Remembered**: The legacy I'm building (Stripe 4).",
        "The power: Once you write it, you can't unsee it. It becomes your compass. When decisions get hard, you consult your manifesto. It grounds you."
      ],
      researchBox: {
        title: "Written Philosophy Research",
        content: [
          "Research on articulated values and behavior:",
          "• Writing down beliefs increases follow-through by 42%",
          "• Leaders with written philosophies make 30% more consistent decisions",
          "• Articulated values reduce decision fatigue and increase confidence",
          "The key: What's written becomes actionable. What's vague stays vague."
        ]
      },
      keyTakeaways: [
        "Writing your philosophy forces clarity and creates a compass",
        "Manifesto structure: Beliefs, non-negotiables, success definition, legacy",
        "Once written, it becomes your decision-making guide"
      ],
      practiceExercise: "This week: Write your leadership manifesto. Use the 4-part structure. Don't overthink—write your honest beliefs. Save it. Read it monthly. Let it guide you."
    }
  }
];

export function BlackBeltStripe3() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('blackBeltStripe3Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blackBeltStripe3Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Black Belt Stripe 3 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('black-stripe-3');
      await addXP(100, 'Black Belt Stripe 3 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/black/stripe-4');
      }, 3000);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-black border-slate-600">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-yellow-400 mb-3 sm:mb-4">
              ⚫ BLACK BELT - STRIPE 3 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-slate-700 rounded" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-yellow-500" />
              Leadership Philosophy: Your Personal Worldview
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Articulate your leadership worldview. Define your beliefs about people, establish your non-negotiables, clarify how you measure success, and create your leadership manifesto.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-slate-300">Lessons Done</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 100 : 0)}</div>
                <div className="text-xs sm:text-sm text-slate-300">XP Earned</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{Math.round(progressPercentage)}%</div>
                <div className="text-xs sm:text-sm text-slate-300">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-slate-800 border-slate-600">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Progress</h3>
            <div className="bg-slate-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
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
                        className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600'}`}
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
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-black rounded-2xl p-8 max-w-md text-center border-2 border-yellow-500 shadow-2xl shadow-yellow-500/30"
              >
                <BookOpen className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 3 Complete! ⚫</h2>
                <p className="text-slate-300 mb-3 sm:mb-4">
                  You've defined your Leadership Philosophy. Ready for the final stripe: Legacy?
                </p>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-slate-400 text-sm">
                  Redirecting to Stripe 4: Legacy...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

