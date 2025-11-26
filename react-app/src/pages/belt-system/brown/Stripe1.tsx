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
    title: "The Accountability Gap",
    description: "Why teams and individuals avoid accountability and what it costs",
    content: {
      whatYouLearn: [
        "What accountability actually means (and what it doesn't)",
        "The difference between accountability and blame",
        "Why avoiding accountability feels safe but isn't"
      ],
      coreConcept: [
        "Accountability isn't punishment. It's ownership. It means: 'I said I'd do X. Did I do it? If not, what happened? What's my plan to follow through?'",
        "Most people avoid accountability because they confuse it with blame. Blame asks 'Who screwed up?' Accountability asks 'What happened? What do we learn? What's next?'",
        "The accountability gap: The space between what you committed to and what you actually did. High performers close this gap by naming it explicitly. Low performers pretend it doesn't exist.",
        "In BJJ: If you tap in training, you don't blame the move—you study why it worked on you. Accountability means owning the gap between your defense and the submission."
      ],
      researchBox: {
        title: "Accountability Research",
        content: [
          "Research on accountability and performance:",
          "• Teams with explicit accountability practices have 2.5x higher execution rates",
          "• Individual accountability partners increase goal achievement by 65%",
          "• The 'blame culture' reduces innovation by 40% and increases turnover by 30%",
          "The key: Accountability as learning, not punishment."
        ]
      },
      keyTakeaways: [
        "Accountability is ownership, not blame—it's about learning and adjusting",
        "The accountability gap: What you said vs. what you did",
        "High performers name the gap explicitly; low performers ignore it"
      ],
      practiceExercise: "This week: Identify one commitment you didn't fully keep. Write down: 1) What I committed to, 2) What actually happened, 3) What I learned, 4) What I'll do differently. No blame—just ownership."
    }
  },
  {
    id: 2,
    title: "Self-Accountability First",
    description: "You can't hold others accountable if you don't hold yourself accountable",
    content: {
      whatYouLearn: [
        "Why self-accountability is the foundation",
        "How to create personal accountability systems",
        "The 'no excuses' mindset vs. the 'radical responsibility' mindset"
      ],
      coreConcept: [
        "You can't hold your team accountable if you don't model it yourself. Self-accountability comes first.",
        "Self-accountability systems: 1) Weekly self-review (What did I commit to? What did I do? What's the gap?). 2) Public commitments (telling someone what you'll do). 3) Tracking (data doesn't lie—write it down).",
        "The difference: 'No excuses' mindset = harsh, inflexible, all-or-nothing. 'Radical responsibility' mindset = honest, learning-focused, gap-acknowledging. One creates shame. The other creates growth.",
        "Athletes review game film on themselves harder than their teammates do. They own their mistakes before anyone else points them out. That's self-accountability."
      ],
      researchBox: {
        title: "Self-Regulation Research",
        content: [
          "Research on self-accountability and goal achievement:",
          "• People who conduct weekly self-reviews are 42% more likely to hit goals",
          "• Public commitments increase follow-through by 65%",
          "• Self-tracking (journals, apps, logs) improves consistency by 33%",
          "The pattern: Measure, review, adjust. Repeat."
        ]
      },
      keyTakeaways: [
        "Self-accountability must come before holding others accountable",
        "Systems: Weekly self-review, public commitments, tracking",
        "Radical responsibility (learning) beats 'no excuses' (shame)"
      ],
      practiceExercise: "This week: Conduct a weekly self-review every Sunday. Ask: What did I commit to? What did I do? What's the gap? What do I learn? What's my commitment for next week? Write it down."
    }
  },
  {
    id: 3,
    title: "Peer Accountability Without Judgment",
    description: "How to hold others accountable while maintaining trust",
    content: {
      whatYouLearn: [
        "The difference between accountability and micromanagement",
        "How to ask accountability questions without being accusatory",
        "The 'curious, not furious' approach"
      ],
      coreConcept: [
        "Holding someone accountable doesn't mean interrogating them. It means creating space for them to own their commitments.",
        "The accountability conversation: 'You said you'd do X by Y. What happened?' (Curious tone, not angry). Listen. Then: 'What do you need to make it happen? How can I support you?'",
        "The key: You're not their parent. You're their training partner. You want them to succeed. The conversation is about alignment, not punishment.",
        "Judgment kills accountability. Curiosity builds it. 'Curious, not furious'—if you're angry, you're not ready to have the conversation yet."
      ],
      researchBox: {
        title: "Peer Accountability Research",
        content: [
          "Research on accountability conversations:",
          "• Questions ('What happened?') are 3x more effective than statements ('You failed')",
          "• Judgment-free accountability increases trust by 40%",
          "• Support offers ('How can I help?') double follow-through rates",
          "The shift: From enforcer to enabler."
        ]
      },
      keyTakeaways: [
        "Accountability conversations are curious, not accusatory",
        "Ask 'What happened?' then 'How can I support you?'",
        "'Curious, not furious'—judgment kills accountability"
      ],
      practiceExercise: "This week: Have one accountability conversation with someone who missed a commitment. Use the script: 'You said you'd do X. What happened?' Listen. Then: 'What do you need to follow through? How can I help?' Track the response."
    }
  },
  {
    id: 4,
    title: "Consequences That Build, Not Break",
    description: "Creating meaningful consequences that reinforce commitment",
    content: {
      whatYouLearn: [
        "Why consequences matter (and what happens without them)",
        "The difference between punitive and natural consequences",
        "How to design consequences that strengthen relationships"
      ],
      coreConcept: [
        "Accountability without consequences is just hope. If there's no result when someone doesn't follow through, the commitment wasn't real.",
        "Two types of consequences: Punitive (punishment imposed from outside—shame, penalties, reprimands). Natural (logical result of the behavior—lost trust, missed opportunity, team impact).",
        "Natural consequences are better. Example: Your training partner keeps no-showing. Punitive: 'You're off the team.' Natural: 'I can't rely on you, so I'm finding a different training partner.' One feels like attack. The other is just reality.",
        "The key: Consequences aren't about making someone feel bad—they're about making commitments real. If your 'yes' doesn't mean anything, why would anyone believe it next time?"
      ],
      researchBox: {
        title: "Consequences Research",
        content: [
          "Research on accountability and consequences:",
          "• Natural consequences are 3x more effective than punitive consequences at changing behavior",
          "• Clear consequences stated upfront increase follow-through by 50%",
          "• Consequences applied inconsistently destroy trust and accountability",
          "The rule: Define consequences early, apply them consistently, keep them natural."
        ]
      },
      keyTakeaways: [
        "Accountability without consequences is hope, not commitment",
        "Natural consequences (reality) beat punitive consequences (punishment)",
        "Define consequences early, apply consistently, keep them logical"
      ],
      practiceExercise: "This week: For one commitment (yours or someone else's), define the natural consequence upfront. 'If I/you don't do X, here's what happens.' Make it logical, not punitive. Then follow through if needed."
    }
  }
];

export function BrownBeltStripe1() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('brownBeltStripe1Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('brownBeltStripe1Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Brown Belt Stripe 1 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('brown-stripe-1');
      await addXP(100, 'Brown Belt Stripe 1 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/brown/stripe-2');
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
              🟤 BROWN BELT - STRIPE 1 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-600 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              ⚖️ Accountability Foundation
            </h1>
            <p className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Build the foundation for holding yourself and others accountable. Learn what accountability really means, master self-accountability first, practice peer accountability without judgment, and create consequences that build rather than break.
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
                <div className="text-6xl mb-3 sm:mb-4">⚖️</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 1 Complete! 🥋</h2>
                <p className="text-amber-100 mb-3 sm:mb-4">
                  You've mastered Accountability Foundation. Ready for Stripe 2?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-amber-300 text-sm">
                  Redirecting to Stripe 2: Accountability Depth...
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

