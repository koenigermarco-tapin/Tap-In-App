import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';
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
    title: "Accountability to Values, Not Just Results",
    description: "Why 'winning at all costs' destroys teams",
    content: {
      whatYouLearn: [
        "The difference between results accountability and values accountability",
        "Why 'ends justify means' thinking kills culture",
        "How to hold people accountable for HOW they achieve, not just WHAT they achieve"
      ],
      coreConcept: [
        "Results matter. But how you get results matters more. A team that wins by cheating, burning out, or destroying trust isn't sustainable.",
        "Values accountability: Holding people accountable not just for hitting goals, but for HOW they do it. Did you hit your sales goal by lying to customers? You failed. Did you win the game by injuring opponents? You failed.",
        "The test: 'If we achieve our goal but violate our values to get there, did we really succeed?' Championship teams say no.",
        "Sports example: Winning a tournament using illegal techniques gets you disqualified. You 'won' on the scoreboard but lost on integrity. Real champions care about both."
      ],
      researchBox: {
        title: "Values-Based Accountability Research",
        content: [
          "Research on organizational culture and performance:",
          "• Teams with strong values accountability have 50% higher long-term performance",
          "• 'Results at all costs' cultures have 3x higher burnout and turnover",
          "• Values-based accountability increases innovation and risk-taking",
          "The key: Hold people accountable for the HOW, not just the WHAT."
        ]
      },
      keyTakeaways: [
        "Results accountability + values accountability = sustainable success",
        "Winning by violating values is losing",
        "Ask: 'Did we achieve the goal in a way we're proud of?'"
      ],
      practiceExercise: "This week: Identify your top 3 values (integrity, respect, growth, etc.). Next time you review performance (yours or someone else's), ask: 'Did we live our values while achieving this?' If not, address it."
    }
  },
  {
    id: 2,
    title: "The Accountability Conversation Framework",
    description: "A structured approach to difficult accountability discussions",
    content: {
      whatYouLearn: [
        "The 5-step accountability conversation framework",
        "How to stay in 'coach mode' instead of 'judge mode'",
        "When to push harder vs. when to support differently"
      ],
      coreConcept: [
        "Most accountability conversations fail because they lack structure. Here's the framework: 1) State the commitment ('You said X'). 2) State reality ('What actually happened was Y'). 3) Ask curiously ('What got in the way?'). 4) Problem-solve together ('What needs to change?'). 5) Re-commit or release ('Can you commit to this going forward, or should we adjust the goal?').",
        "Coach mode vs. judge mode: Judge says 'You failed.' Coach says 'You're capable of more—what's blocking you?' Judge closes down. Coach opens up.",
        "The push/support decision: If effort is low, push. If effort is high but results aren't coming, support differently (new approach, more resources, clearer goals).",
        "Like a training partner: If you're not trying, I'll push you harder. If you're trying but stuck, I'll help you adjust technique."
      ],
      researchBox: {
        title: "Difficult Conversations Research",
        content: [
          "Research on feedback and accountability conversations:",
          "• Structured frameworks increase successful outcomes by 60%",
          "• 'Curious' questions are 4x more effective than 'accusatory' statements",
          "• Conversations that end with re-commitment or adjustment have 80% higher follow-through",
          "The shift: From venting frustration to structured problem-solving."
        ]
      },
      keyTakeaways: [
        "5-step framework: State commitment, state reality, ask curiously, problem-solve, re-commit or adjust",
        "Coach mode (opens up) beats judge mode (closes down)",
        "Push when effort is low; support differently when effort is high but blocked"
      ],
      practiceExercise: "This week: Use the 5-step framework for one accountability conversation. Write out each step beforehand. Deliver in coach mode. Track the outcome."
    }
  },
  {
    id: 3,
    title: "Accountability in Crisis",
    description: "How to maintain standards when things go wrong",
    content: {
      whatYouLearn: [
        "Why accountability matters most when pressure is highest",
        "The 'no excuses when it counts' principle",
        "How to hold standards without being rigid"
      ],
      coreConcept: [
        "It's easy to be accountable when everything is going well. Real accountability shows up in crisis: injuries, losses, setbacks, chaos.",
        "The principle: Excuses multiply in crisis. 'We're understaffed.' 'We're stressed.' 'We've been unlucky.' All true. Also irrelevant. Did you do what you committed to or not?",
        "The balance: Be firm on commitments, flexible on methods. Example: You committed to training 4x/week, but you got injured. Don't drop accountability—adjust the commitment. 'I can't train full contact, but I'll do 4x rehab/conditioning sessions instead.'",
        "Championship teams don't lower standards in crisis—they find new ways to meet them."
      ],
      researchBox: {
        title: "High-Pressure Performance Research",
        content: [
          "Research on accountability under pressure:",
          "• Teams that maintain accountability during setbacks recover 2x faster",
          "• Lowering standards during crisis increases recovery time by 40%",
          "• 'Flexible methods, firm standards' approach increases resilience",
          "The key: Hold the line on what matters, adapt on how to get there."
        ]
      },
      keyTakeaways: [
        "Accountability matters most in crisis, not comfort",
        "Be firm on commitments, flexible on methods",
        "Don't drop standards—adjust the approach to meet them"
      ],
      practiceExercise: "This week: Identify one commitment you or your team dropped during a crisis/setback. Revisit it: Can you restore the commitment with a new approach? Or do you need to explicitly renegotiate the goal?"
    }
  },
  {
    id: 4,
    title: "Rebuilding Accountability After Trust Breaks",
    description: "How to repair accountability when someone repeatedly doesn't follow through",
    content: {
      whatYouLearn: [
        "Why repeated failures require a different conversation",
        "The 'prove it' phase of rebuilding accountability",
        "When to give another chance vs. when to part ways"
      ],
      coreConcept: [
        "One missed commitment is a mistake. Two is a pattern. Three is a choice. After repeated failures, accountability requires a reset conversation.",
        "The reset: 'We've had this conversation before. You've committed multiple times and not followed through. Trust is damaged. Here's what needs to happen: [specific, measurable actions]. If it doesn't, here's the consequence [stated clearly]. This is your last chance.'",
        "The 'prove it' phase: After trust breaks, words don't matter—only actions. They need to rebuild trust through consistency, not promises.",
        "The hard decision: Sometimes the answer is to part ways. If someone won't hold themselves accountable, you can't force them. It's better to release them than to enable the pattern."
      ],
      researchBox: {
        title: "Trust Repair Research",
        content: [
          "Research on rebuilding trust and accountability:",
          "• Trust repair requires 5-7 consistent actions before full restoration",
          "• The 'prove it' phase with clear milestones rebuilds trust 3x faster than vague promises",
          "• Enabling patterns (not enforcing consequences) reduces future accountability by 70%",
          "The rule: Give clear chances, enforce clear consequences, know when to release."
        ]
      },
      keyTakeaways: [
        "One miss = mistake. Two = pattern. Three = choice.",
        "Reset conversation: 'Here's what needs to happen. Here's the consequence if it doesn't.'",
        "Rebuild through actions, not promises—'prove it' phase"
      ],
      practiceExercise: "This week: If someone has repeatedly missed commitments, have the reset conversation. Use the script: 'We've been here before. Here's what needs to happen now. Here's the consequence if it doesn't. This is your chance to rebuild trust through action.'"
    }
  }
];

export function BrownBeltStripe2() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('brownBeltStripe2Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('brownBeltStripe2Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Brown Belt Stripe 2 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('brown-stripe-2');
      await addXP(100, 'Brown Belt Stripe 2 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/brown/stripe-3');
      }, 3000);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-amber-800 to-amber-900 border-amber-700">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">
              🟤 BROWN BELT - STRIPE 2 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-600 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              🎯 Accountability Depth
            </h1>
            <p className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Go deeper into accountability mastery. Learn to hold people accountable to values, master the accountability conversation framework, maintain standards in crisis, and rebuild accountability after trust breaks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-100">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-amber-200">Lessons Done</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-100">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 100 : 0)}</div>
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
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-amber-800 to-amber-900 rounded-2xl p-8 max-w-md text-center border-2 border-amber-500"
              >
                <div className="text-6xl mb-3 sm:mb-4">🎯</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 2 Complete! 🥋</h2>
                <p className="text-amber-100 mb-3 sm:mb-4">
                  You've mastered Accountability Depth. Ready for Stripe 3?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-amber-300 text-sm">
                  Redirecting to Stripe 3: Accountability Systems...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

