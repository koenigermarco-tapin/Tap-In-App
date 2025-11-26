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
    title: "The Feedback Problem",
    description: "Why most feedback systems fail and what to do instead",
    content: {
      whatYouLearn: [
        "Why annual reviews fail to change behavior",
        "The difference between evaluative and developmental feedback",
        "How to build feedback muscle through frequency"
      ],
      coreConcept: [
        "Most organizations treat feedback like a once-a-year event. Annual reviews. Performance evaluations. This doesn't work.",
        "The problem: Feedback delayed is feedback denied. If you wait 6 months to tell someone their presentation style isn't landing, they've already presented 50 times. The behavior is now a habit.",
        "Effective feedback requires two shifts: 1) Frequency over formality (weekly micro-feedback beats quarterly formal reviews). 2) Developmental over evaluative (focus on growth, not judgment).",
        "Think of feedback like coaching in sports. A coach doesn't wait until the end of the season to tell you your form is wrong. They correct you in real-time, rep by rep."
      ],
      researchBox: {
        title: "Research on Feedback Frequency",
        content: [
          "Research from Marcus Buckingham and Ashley Goodall shows:",
          "• Weekly feedback improves performance 3x more than annual reviews",
          "• Real-time feedback (within 24 hours) has 6x the impact of delayed feedback",
          "• Teams with weekly check-ins have 23% higher engagement",
          "The key: Frequency builds muscle. One conversation doesn't change behavior—100 conversations do."
        ]
      },
      keyTakeaways: [
        "Annual reviews fail because feedback delayed is feedback denied",
        "Frequency matters more than formality in feedback systems",
        "Developmental feedback (growth-focused) beats evaluative feedback (judgment-focused)"
      ],
      practiceExercise: "This week: Give one piece of micro-feedback within 24 hours of observing something. Keep it specific, behavioral, and developmental: 'In today's meeting, when you interrupted Sarah, it shut down the conversation. How could you signal disagreement without interrupting?'"
    }
  },
  {
    id: 2,
    title: "Radical Candor Framework",
    description: "Balancing caring personally with challenging directly",
    content: {
      whatYouLearn: [
        "Kim Scott's Radical Candor framework",
        "The four quadrants: Radical Candor, Ruinous Empathy, Obnoxious Aggression, Manipulative Insincerity",
        "How to give feedback that challenges without destroying relationships"
      ],
      coreConcept: [
        "Kim Scott's Radical Candor framework has two axes: 1) Care Personally (Do you genuinely care about this person's growth?). 2) Challenge Directly (Are you willing to say the hard thing?).",
        "Most leaders fall into one of two traps: Ruinous Empathy (caring but not challenging—'That presentation was fine!' when it wasn't). Obnoxious Aggression (challenging without caring—'Your work is terrible' with no empathy).",
        "Radical Candor means: 'I care about you, which is why I'm telling you the truth. Your last project missed the mark. Here's specifically what didn't work, and here's how we'll make the next one better.'",
        "The test: If someone receives your feedback and thinks 'They want me to succeed,' you've hit Radical Candor. If they think 'They don't care' or 'They're just being nice,' you haven't."
      ],
      researchBox: {
        title: "Radical Candor Research",
        content: [
          "Scott's research at Google, Apple, and Twitter found:",
          "• Ruinous Empathy is the most common failure mode (87% of leaders)",
          "• Teams with Radical Candor cultures have 31% faster learning curves",
          "• Direct feedback delivered with care increases performance 40% more than indirect 'nice' feedback",
          "Key insight: People want honesty more than they want comfort."
        ]
      },
      keyTakeaways: [
        "Radical Candor = Care Personally + Challenge Directly",
        "Ruinous Empathy (caring without challenging) is the most common trap",
        "People want honest feedback delivered with genuine care"
      ],
      practiceExercise: "This week: Give one piece of Radical Candor feedback. Start with care ('I'm invested in your growth'), then challenge directly ('Here's what didn't work and why'), then support ('How can I help you improve this?'). Notice the response."
    }
  },
  {
    id: 3,
    title: "The Feedback Sandwich Is Broken",
    description: "Why 'compliment-criticism-compliment' doesn't work and what to do instead",
    content: {
      whatYouLearn: [
        "Why the feedback sandwich destroys trust",
        "The SBI model: Situation-Behavior-Impact",
        "How to give direct feedback without the cushion"
      ],
      coreConcept: [
        "The feedback sandwich (positive-negative-positive) teaches people to distrust praise. When you say 'Great job on the report, but...' people stop hearing the praise. They're just waiting for the 'but.'",
        "Better: The SBI model. Situation ('In yesterday's client meeting'), Behavior ('when you interrupted the client mid-sentence'), Impact ('it made them defensive and we lost momentum').",
        "SBI is clean. No fluff. No hidden criticism in fake praise. Just: Here's what happened, here's what you did, here's the result.",
        "Then, add the forward piece: 'Next time, how could you signal disagreement without interrupting?' This turns feedback into coaching."
      ],
      researchBox: {
        title: "Center for Creative Leadership Research",
        content: [
          "CCL research on feedback effectiveness shows:",
          "• Feedback sandwich reduces retention of critical feedback by 40%",
          "• SBI model improves behavior change by 3x compared to vague feedback",
          "• Specific, behavioral feedback is 4x more likely to change performance",
          "People prefer direct, specific feedback to vague, cushioned feedback."
        ]
      },
      keyTakeaways: [
        "The feedback sandwich trains people to distrust praise",
        "SBI model (Situation-Behavior-Impact) is clear and actionable",
        "Direct feedback is more effective than cushioned feedback"
      ],
      practiceExercise: "This week: Use the SBI model once. Pick a specific situation, describe the behavior you observed, explain the impact it had. Then ask: 'What would you do differently next time?' No sandwich. Just clarity."
    }
  },
  {
    id: 4,
    title: "Receiving Feedback Without Defense",
    description: "The discipline of listening to criticism without justifying",
    content: {
      whatYouLearn: [
        "Why defensiveness destroys feedback loops",
        "The receiving feedback protocol: Listen, Clarify, Thank",
        "How to separate feedback content from delivery"
      ],
      coreConcept: [
        "Giving feedback is hard. Receiving it is harder. Your instinct when criticized: Defend. Explain. Justify. 'But you don't understand...'",
        "This kills the feedback loop. If someone gives you feedback and you get defensive, they'll never give you feedback again. You've trained them that honesty isn't safe.",
        "The receiving protocol: 1) Listen (don't interrupt, don't explain, just absorb). 2) Clarify ('Can you give me a specific example?'). 3) Thank ('I appreciate you telling me this. Let me think about it.').",
        "Even if the feedback is delivered poorly, there's often truth in it. Your job: Extract the signal from the noise. Don't dismiss feedback because of how it's packaged."
      ],
      researchBox: {
        title: "Sheila Heen's Research",
        content: [
          "Harvard negotiation expert Sheila Heen found:",
          "• Defensive reactions reduce likelihood of receiving future feedback by 72%",
          "• People who say 'Thank you' to criticism receive 5x more feedback over time",
          "• Separating feedback content from delivery increases learning by 60%",
          "Key insight: Your defensiveness is your enemy, not the feedback."
        ]
      },
      keyTakeaways: [
        "Defensiveness kills feedback loops—people stop being honest",
        "Receiving protocol: Listen, Clarify, Thank (no defending or explaining)",
        "Extract signal from noise—don't dismiss feedback because of poor delivery"
      ],
      practiceExercise: "This week: Ask one person for feedback on something specific. 'How could I run meetings better?' When they answer, practice the protocol: Listen fully, ask clarifying questions, thank them. Do NOT defend or explain. Notice how hard this is."
    }
  }
];

export function BlueBeltStripe3() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const stripeQuiz = blueBeltContent[2].quiz; // Stripe 3

  useEffect(() => {
    const saved = localStorage.getItem('blueBeltStripe3Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blueBeltStripe3Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Blue Belt Stripe 3 - Lesson ${lessonId}`);

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
      setShowQuiz(true);
      setExpandedLesson(null);
    }
  };

  const handleQuizComplete = async (_score: number, _total: number, passed: boolean) => {
    if (passed && !quizPassed) {
      setQuizPassed(true);
      await addXP(50, 'Blue Belt Stripe 3 Quiz Passed');
      await completeModule('blue-stripe-3');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/blue/stripe-4');
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
              🔵 BLUE BELT - STRIPE 3 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-600 rounded" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              💬 Feedback Systems
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Build effective feedback loops in your team. Learn why traditional feedback fails, master the Radical Candor framework, move beyond the feedback sandwich, and develop the discipline to receive feedback without defensiveness.
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
                  Test your understanding of Team Conflict Protocols. You need 70% to pass and complete this stripe.
                </p>
              </div>
            </Card>
            
            <StripeQuiz
              questions={stripeQuiz}
              onComplete={handleQuizComplete}
              stripeName="Team Conflict Protocols"
              beltColor="blue"
              stripeNumber={3}
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
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-3xl font-bold text-white mb-2">Stripe 3 Complete! 🥋</h2>
                <p className="text-blue-100 mb-4">
                  You've mastered Feedback Systems. Ready for the final stripe?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-blue-300 text-sm">
                  Redirecting to Stripe 4: Boundaries...
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

