import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Star } from 'lucide-react';
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
    title: "The 5 Dysfunctions: A Complete System",
    description: "How trust, conflict, commitment, accountability, and results form a pyramid",
    content: {
      whatYouLearn: [
        "How the 5 dysfunctions interconnect as a system",
        "Why fixing one dysfunction without the others fails",
        "The pyramid model: Each layer enables the next"
      ],
      coreConcept: [
        "The 5 Dysfunctions aren't separate problems—they're a pyramid. Each layer builds on the last:",
        "1. **Trust** (Base): Without vulnerability-based trust, you can't have productive conflict.",
        "2. **Conflict**: Without healthy debate, you can't get real commitment.",
        "3. **Commitment**: Without buy-in, you can't hold people accountable.",
        "4. **Accountability**: Without accountability, no one focuses on collective results.",
        "5. **Results** (Top): The ultimate goal—but it only happens if the foundation is solid.",
        "The mistake: Trying to fix results without fixing trust. It's like trying to build the roof before the foundation. The pyramid collapses.",
        "Integration means seeing the whole system, not just fixing individual parts."
      ],
      researchBox: {
        title: "Systems Thinking Research",
        content: [
          "Research on organizational systems:",
          "• Organizations that address foundational issues (trust) see 3x better results than those focusing only on outcomes",
          "• System-level interventions (fixing multiple dysfunctions) outperform single-issue fixes by 200%",
          "• Teams that understand the interconnection of dysfunctions adapt 50% faster",
          "The key: Fix the system, not just the symptoms."
        ]
      },
      keyTakeaways: [
        "The 5 Dysfunctions are a system—each layer enables the next",
        "Pyramid: Trust → Conflict → Commitment → Accountability → Results",
        "Fixing results without fixing trust is building a roof without a foundation"
      ],
      practiceExercise: "This week: Map your team/life on the pyramid. Rate each layer 1-10. Where's your weakest link? That's where you start—not at the top."
    }
  },
  {
    id: 2,
    title: "Diagnosing Your Team's Primary Dysfunction",
    description: "How to identify which dysfunction is holding you back most",
    content: {
      whatYouLearn: [
        "How to spot the symptoms of each dysfunction",
        "The diagnostic question for each layer",
        "Why you start at the weakest point, not the top"
      ],
      coreConcept: [
        "Most teams have multiple dysfunctions, but one is usually the bottleneck. Find it, fix it, and everything else improves.",
        "Diagnostic questions:",
        "• **Trust**: Do team members admit weaknesses and mistakes without fear?",
        "• **Conflict**: Do we have passionate debates without personal attacks?",
        "• **Commitment**: Do we leave meetings with clear decisions and unified buy-in?",
        "• **Accountability**: Do we call each other out on behaviors that hurt the team?",
        "• **Results**: Are we focused on team outcomes over individual goals?",
        "The bottleneck is usually lower than you think. If results are suffering, it's rarely a results problem—it's trust, conflict, or commitment breaking down."
      ],
      researchBox: {
        title: "Diagnostic Research",
        content: [
          "Research on organizational diagnosis:",
          "• 80% of 'results problems' are actually trust or commitment problems",
          "• Teams that diagnose their primary dysfunction improve 2x faster",
          "• Starting at the foundation (trust) is 3x more effective than starting at outcomes",
          "The rule: Find the weakest link, start there."
        ]
      },
      keyTakeaways: [
        "Diagnose your primary dysfunction using the 5 questions",
        "The bottleneck is usually lower in the pyramid than you think",
        "Fix the foundation first, not the results"
      ],
      practiceExercise: "This week: Run the 5 diagnostic questions with your team. Which one gets the lowest scores? That's your starting point for the next 90 days."
    }
  },
  {
    id: 3,
    title: "Your Leadership Journey: White to Black",
    description: "Reflecting on how you've grown through each belt",
    content: {
      whatYouLearn: [
        "How each belt transformed your leadership",
        "The patterns you've broken and the habits you've built",
        "Why mastery is a journey, not a destination"
      ],
      coreConcept: [
        "Look back at where you started:",
        "• **White Belt**: You learned that vulnerability-based trust is the foundation. You practiced admitting gaps, asking for help, and building safety.",
        "• **Blue Belt**: You learned to engage in healthy conflict without destroying relationships. Disagreement became productive, not dangerous.",
        "• **Purple Belt**: You learned to create commitment through alignment, not control. Your team bought in because you built it together.",
        "• **Brown Belt**: You learned to hold yourself and others accountable without blame. Gaps became data, not verdicts.",
        "• **Black Belt**: You're integrating it all. You see the system. You're teaching others. You're leaving a legacy.",
        "Mastery isn't arriving—it's continuing to practice the fundamentals with greater awareness."
      ],
      researchBox: {
        title: "Reflective Practice Research",
        content: [
          "Research on expertise and mastery:",
          "• Reflective practice (reviewing your journey) accelerates learning by 40%",
          "• Experts who continue practicing fundamentals outperform those who move only to 'advanced' work",
          "• Self-awareness of growth patterns predicts future performance",
          "The key: Look back to move forward better."
        ]
      },
      keyTakeaways: [
        "Each belt built on the last—trust → conflict → commitment → accountability → results",
        "Mastery is practicing fundamentals with awareness, not moving past them",
        "Reflection on your journey accelerates future growth"
      ],
      practiceExercise: "This week: Journal on each belt. What was your biggest breakthrough at each level? What habit from each belt do you still practice? What needs reinforcement?"
    }
  },
  {
    id: 4,
    title: "Building a High-Performing Culture",
    description: "Applying the complete system to transform teams",
    content: {
      whatYouLearn: [
        "The 6-month roadmap for transforming team culture",
        "How to sequence interventions (which dysfunction to fix first)",
        "The leader's role: Model, facilitate, hold the line"
      ],
      coreConcept: [
        "Transforming a team takes time. Here's the roadmap:",
        "**Months 1-2: Trust**. Run vulnerability exercises (Personal History, Trust Grid). Model admitting gaps. Create psychological safety.",
        "**Months 2-3: Conflict**. Normalize productive disagreement. Teach conflict frameworks. Facilitate heated debates without rescuing.",
        "**Months 3-4: Commitment**. Clarify decision rights. Get explicit buy-in. Build commitment rituals.",
        "**Months 4-5: Accountability**. Create accountability systems (standups, dashboards, peer partnerships). Model self-accountability.",
        "**Month 6: Results**. Measure collective outcomes. Celebrate team wins. Course-correct on individual agendas.",
        "The leader's job: Model every behavior you want to see. Facilitate every hard conversation. Hold the line on standards when the team wants to slip back."
      ],
      researchBox: {
        title: "Culture Transformation Research",
        content: [
          "Research on organizational change:",
          "• Culture transformation takes 6-12 months for initial shifts, 2-3 years for full integration",
          "• Sequential interventions (building on each dysfunction) are 3x more effective than parallel work",
          "• Leader modeling is the #1 predictor of culture change success",
          "The timeline: Be patient. Trust the process. Stay consistent."
        ]
      },
      keyTakeaways: [
        "Culture transformation follows the pyramid: Trust → Conflict → Commitment → Accountability → Results",
        "6-month roadmap: Build one layer at a time, sequentially",
        "Leader's role: Model, facilitate, hold the line"
      ],
      practiceExercise: "This week: If you lead a team, draft your 6-month transformation roadmap. Which dysfunction are you starting with? What's your first intervention? Schedule it."
    }
  }
];

export function BlackBeltStripe1() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('blackBeltStripe1Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blackBeltStripe1Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Black Belt Stripe 1 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('black-stripe-1');
      await addXP(100, 'Black Belt Stripe 1 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/black/stripe-2');
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
              ⚫ BLACK BELT - STRIPE 1 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-slate-700 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-slate-700 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-slate-700 rounded" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 flex items-center gap-3">
              <Star className="w-10 h-10 text-yellow-500" />
              Integration: Seeing the Whole System
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              The highest level: Master systems thinking by understanding how all 5 dysfunctions interconnect, diagnose your team's primary bottleneck, reflect on your complete journey from White to Black, and learn to build high-performing cultures.
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
                <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 1 Complete! ⚫</h2>
                <p className="text-slate-300 mb-3 sm:mb-4">
                  You've mastered Integration. Ready for Stripe 2: Teaching Others?
                </p>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-slate-400 text-sm">
                  Redirecting to Stripe 2...
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

