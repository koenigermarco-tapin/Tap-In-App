import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { StripeQuiz } from '@/components/quiz/StripeQuiz';
import { blueBeltContent } from '@/content/blueBeltContent';
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
    title: "The Listening Gap",
    description: "Why most people are terrible listeners and what it costs teams",
    content: {
      whatYouLearn: [
        "The difference between hearing and listening",
        "Why smart people are often the worst listeners",
        "The cost of the listening gap in teams"
      ],
      coreConcept: [
        "Most people don't listen—they wait to talk. While you're speaking, they're formulating their response, planning their rebuttal, or thinking about what they'll say next.",
        "This is especially true for high achievers. They're used to having answers. Listening feels passive. It feels like losing the debate before it starts.",
        "The listening gap is the space between what someone says and what you hear. It's filled with your assumptions, biases, and ego.",
        "In conflict, the listening gap widens. When stakes are high, people listen even less. They're in defend mode, not understand mode."
      ],
      researchBox: {
        title: "Research on Listening",
        content: [
          "Studies show that people retain only 25-50% of what they hear in conversations.",
          "In high-stakes discussions (conflict, negotiations), retention drops to 10-15%.",
          "Teams with strong listening skills:",
          "• Resolve conflicts 40% faster",
          "• Have 27% fewer misunderstandings",
          "• Report 35% higher trust scores"
        ]
      },
      keyTakeaways: [
        "Most people hear words but don't listen to understand",
        "High achievers often struggle with listening because it feels passive",
        "The listening gap costs teams speed, clarity, and trust"
      ],
      practiceExercise: "This week: In your next difficult conversation, notice when you stop listening. What triggers it? When someone says something you disagree with? When you feel defensive? Document the pattern."
    }
  },
  {
    id: 2,
    title: "Active Listening in Conflict",
    description: "The specific techniques that transform conflict conversations",
    content: {
      whatYouLearn: [
        "The three levels of listening: hearing, active listening, empathic listening",
        "Reflective listening technique for de-escalating conflict",
        "When to use paraphrasing vs. summarizing vs. mirroring"
      ],
      coreConcept: [
        "Active listening has three core techniques: 1) Paraphrasing: Repeat back what you heard in your own words. 'So what I'm hearing is...' 2) Summarizing: Distill the key points. 'Let me make sure I understand—you're saying X, Y, and Z?' 3) Mirroring: Reflect the emotion, not just the content. 'It sounds like you're frustrated because...'",
        "In conflict, use this sequence: First, mirror the emotion. ('You seem upset about this.') Then, paraphrase the content. ('You're saying the deadline feels unrealistic.') Finally, ask a clarifying question. ('What would make it feel more realistic?')",
        "The paradox: Active listening slows the conversation down, but it speeds up resolution. You spend 2 extra minutes listening, and save 2 hours of misunderstanding."
      ],
      researchBox: {
        title: "Carl Rogers Research",
        content: [
          "Psychologist Carl Rogers pioneered 'active listening' and found that it:",
          "• Reduces defensiveness by 60% in conflict conversations",
          "• Increases perceived empathy by 45%",
          "• Makes people 3x more likely to change their position when they feel heard first",
          "Key insight: People don't need you to agree—they need you to understand."
        ]
      },
      keyTakeaways: [
        "Active listening has three techniques: paraphrase, summarize, mirror",
        "In conflict, mirror emotion first, then paraphrase content",
        "Listening slows conversations but speeds resolution"
      ],
      practiceExercise: "This week: In one conflict conversation, use the three-step sequence: Mirror emotion → Paraphrase content → Ask clarifying question. Notice how the other person's energy shifts when they feel heard."
    }
  },
  {
    id: 3,
    title: "The Pause Before Response",
    description: "Building the discipline to listen fully before reacting",
    content: {
      whatYouLearn: [
        "Why the 2-second pause changes everything",
        "The difference between reactive and responsive communication",
        "Building your listening discipline muscle"
      ],
      coreConcept: [
        "The pause is the space between stimulus and response. When someone says something that triggers you, your instinct is to react immediately. The pause creates choice.",
        "Practice: After someone finishes speaking, count to 2 before responding. In that 2 seconds: 1) Take a breath. 2) Notice your emotional reaction. 3) Choose your response (rather than reacting automatically).",
        "This is incredibly hard. Your brain wants to jump in. Your ego wants to defend. Your competitiveness wants to win. The pause requires discipline.",
        "In BJJ, there's a concept called 'control before submission.' You can't finish someone until you have positional control. Same in conflict: You can't resolve disagreement until you have conversational control—and control starts with the pause."
      ],
      researchBox: {
        title: "Viktor Frankl's Research",
        content: [
          "Viktor Frankl wrote: 'Between stimulus and response there is a space. In that space is our power to choose our response.'",
          "Neuroscience confirms this: The 2-second pause allows the prefrontal cortex (rational brain) to engage before the amygdala (reactive brain) takes over.",
          "Teams trained in 'pause practices' show 50% reduction in escalated conflicts."
        ]
      },
      keyTakeaways: [
        "The 2-second pause creates space for choice instead of reaction",
        "Listening requires discipline—your brain wants to interrupt",
        "Control before resolution: You can't solve conflict until you have conversational control"
      ],
      practiceExercise: "This week: Practice the 2-second pause in every conversation. After someone speaks, count '1-Mississippi, 2-Mississippi' before responding. Notice how hard this is. Notice what changes."
    }
  },
  {
    id: 4,
    title: "Listening Without Fixing",
    description: "How to be present without trying to solve every problem",
    content: {
      whatYouLearn: [
        "Why trying to fix problems destroys listening",
        "The difference between 'space-holding' and problem-solving",
        "When to listen vs. when to advise"
      ],
      coreConcept: [
        "High achievers have a dangerous instinct: Someone shares a problem, and they immediately try to fix it. This feels helpful. It's not.",
        "When you jump to solutions, you signal: 'I don't need to understand your experience—I just need to solve it.' The other person feels dismissed, not supported.",
        "Listening without fixing means: 1) Suspend your solutions. 2) Ask questions to understand their experience. 3) Only offer advice if explicitly asked.",
        "The test: Can you sit with someone's problem for 5 minutes without offering a solution? If not, you're not listening—you're performing."
      ],
      researchBox: {
        title: "Brené Brown's Research",
        content: [
          "Brené Brown distinguishes between empathy (being with someone) and sympathy (feeling sorry for someone).",
          "Empathy requires:",
          "• Perspective-taking (seeing their view)",
          "• Staying out of judgment",
          "• Recognizing their emotion",
          "• Communicating that recognition",
          "Fixing is sympathy disguised as empathy. It relieves your discomfort, not theirs."
        ]
      },
      keyTakeaways: [
        "Jumping to solutions signals 'I don't need to understand—I just need to fix'",
        "Listening without fixing means suspending your solutions and asking to understand",
        "Real support is being with someone, not fixing them"
      ],
      practiceExercise: "This week: When someone shares a problem, challenge yourself: Listen for 5 minutes without offering a solution. Ask questions like 'What's that like for you?' or 'How are you feeling about it?' Notice your urge to fix. Resist it."
    }
  }
];

export function BlueBeltStripe2() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const stripeQuiz = blueBeltContent[1].quiz; // Stripe 2

  useEffect(() => {
    const saved = localStorage.getItem('blueBeltStripe2Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blueBeltStripe2Completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Auto-expand first incomplete lesson on load, show quiz when all lessons done
  useEffect(() => {
    const firstIncomplete = lessons.find(l => !completedLessons.includes(l.id));
    if (firstIncomplete && expandedLesson === null) {
      setExpandedLesson(firstIncomplete.id);
    } else if (completedLessons.length === lessons.length && !quizPassed) {
      setShowQuiz(true);
    }
  }, [completedLessons, expandedLesson, quizPassed]);

  const toggleLesson = (lessonId: number) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const completeLesson = async (lessonId: number) => {
    if (completedLessons.includes(lessonId)) return;

    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);

    await addXP(25, `Blue Belt Stripe 2 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    
    // Auto-expand next lesson after completing current one
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < lessons.length - 1) {
      setExpandedLesson(lessons[currentIndex + 1].id);
    } else {
      // All lessons complete - show quiz
      setShowQuiz(true);
      setExpandedLesson(null);
    }
  };

  const handleQuizComplete = async (_score: number, _total: number, passed: boolean) => {
    if (passed && !quizPassed) {
      setQuizPassed(true);
      await addXP(50, 'Blue Belt Stripe 2 Quiz Passed');
      await completeModule('blue-stripe-2');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/blue/stripe-3');
      }, 3000);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    /* RESPONSIVE: Mobile-first container */
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* RESPONSIVE: Header card */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-800 to-blue-900 border-blue-700">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">
              🔵 BLUE BELT - STRIPE 2 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-600 rounded" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              👂 Active Listening
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Master the art of truly hearing others in conflict. Learn to close the listening gap, practice active listening techniques, build the discipline to pause before responding, and listen without trying to fix every problem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-100">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-blue-200">Lessons Done</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-100">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 100 : 0)}</div>
                <div className="text-xs sm:text-sm text-blue-200">XP Earned</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-100">{Math.round(progressPercentage)}%</div>
                <div className="text-xs sm:text-sm text-blue-200">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-blue-800 border-blue-700">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Progress</h3>
            <div className="bg-blue-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-blue-200 text-sm mt-2">
              {completedLessons.length} of {lessons.length} lessons completed
            </p>
          </div>
        </Card>

        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;

          return (
            <Card key={lesson.id} className="mb-6 bg-blue-800 border-blue-700 overflow-hidden">
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-blue-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}
                  </div>
                  <div>
                    <div className="text-sm text-blue-200 mb-1">Lesson {lesson.id}</div>
                    <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    <p className="text-blue-200 text-sm">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isCompleted && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Done
                    </span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-blue-200 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-blue-700"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          🎯 What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {lesson.content.whatYouLearn.map((item, i) => (
                            <li key={i} className="text-blue-100 flex items-start gap-2">
                              <span className="text-blue-300 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r">
                        <h4 className="text-blue-300 font-semibold mb-3">📖 Core Concept</h4>
                        <div className="space-y-3">
                          {lesson.content.coreConcept.map((para, i) => (
                            <p key={i} className="text-blue-100 leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>

                      {lesson.content.researchBox && (
                        <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r">
                          <h4 className="text-cyan-300 font-semibold mb-3">📊 {lesson.content.researchBox.title}</h4>
                          <div className="space-y-2">
                            {lesson.content.researchBox.content.map((item, i) => (
                              <p key={i} className="text-blue-100 leading-relaxed">{item}</p>
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
                            <li key={i} className="text-blue-100 flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r">
                        <h4 className="text-green-400 font-semibold mb-2">✨ Practice Exercise</h4>
                        <p className="text-blue-100 leading-relaxed">{lesson.content.practiceExercise}</p>
                      </div>

                      <Button
                        onClick={() => completeLesson(lesson.id)}
                        disabled={isCompleted}
                        className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'}`}
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

        {/* Quiz Section - Show after all lessons complete */}
        {showQuiz && completedLessons.length === lessons.length && (
          <div className="mb-8">
            <Card className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  📝 Knowledge Check
                </h2>
                <p className="text-slate-300 mb-4">
                  Test your understanding of Mastering Difficult Conversations. You need 70% to pass and complete this stripe.
                </p>
              </div>
            </Card>
            
            <StripeQuiz
              questions={stripeQuiz}
              onComplete={handleQuizComplete}
              stripeName="Mastering Difficult Conversations"
              beltColor="blue"
              stripeNumber={2}
            />
          </div>
        )}

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
                className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 max-w-md text-center border-2 border-blue-500"
              >
                <div className="text-6xl mb-4">👂</div>
                <h2 className="text-3xl font-bold text-white mb-2">Stripe 2 Complete! 🥋</h2>
                <p className="text-blue-100 mb-4">
                  You've mastered Active Listening. Ready for Stripe 3?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-blue-300 text-sm">
                  Redirecting to Stripe 3: Feedback Systems...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/belt-system')}
            className="text-blue-300 hover:text-white transition-colors"
          >
            ← Back to Belt System
          </button>
        </div>
      </div>
    </div>
  );
}

