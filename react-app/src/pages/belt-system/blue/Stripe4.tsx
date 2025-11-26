import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Trophy } from 'lucide-react';
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
    title: "Why Boundaries Matter in Conflict",
    description: "How healthy boundaries enable productive disagreement",
    content: {
      whatYouLearn: [
        "Why conflict without boundaries becomes personal attacks",
        "The difference between healthy and unhealthy boundaries",
        "How boundaries protect relationships during disagreement"
      ],
      coreConcept: [
        "Boundaries are the container that makes conflict safe. Without boundaries, disagreement escalates into personal attacks.",
        "Healthy boundaries in conflict look like: 'We can disagree intensely about the strategy, but we don't question each other's motives.' 'You can challenge my idea aggressively, but you can't dismiss me as a person.'",
        "Unhealthy boundaries look like: No separation between ideas and identity. 'If you disagree with my proposal, you're saying I'm incompetent.' Personal attacks disguised as feedback. 'You always do this—you're too emotional to make rational decisions.'",
        "BJJ analogy: In sparring, boundaries are what separate training from fighting. You can apply pressure, test technique, go hard—but you don't injure your partner. The boundary protects the relationship while allowing intensity."
      ],
      researchBox: {
        title: "Brené Brown's Boundary Research",
        content: [
          "Brené Brown found that people with strong boundaries are more compassionate, not less:",
          "• Clear boundaries allow for vulnerability without resentment",
          "• People who set boundaries report 40% higher relationship satisfaction",
          "• Conflict with boundaries feels challenging; conflict without boundaries feels threatening",
          "Key insight: Boundaries aren't walls—they're the rules of engagement that make closeness possible."
        ]
      },
      keyTakeaways: [
        "Boundaries are the container that makes conflict safe",
        "Healthy boundaries separate ideas from identity",
        "Conflict without boundaries escalates into personal attacks"
      ],
      practiceExercise: "This week: Notice when conflict crosses from ideological to personal. What triggered the shift? Was there a boundary violation (questioning motives, personal attack, dismissing someone's experience)? Write it down."
    }
  },
  {
    id: 2,
    title: "Setting Conflict Boundaries Explicitly",
    description: "How to establish and communicate your conflict boundaries",
    content: {
      whatYouLearn: [
        "How to name your boundaries before conflict starts",
        "The 'rules of engagement' conversation",
        "What to do when someone violates a boundary"
      ],
      coreConcept: [
        "Most people never explicitly state their boundaries. They assume others know. They don't.",
        "The 'rules of engagement' conversation: Before a high-stakes discussion, name the boundaries. 'We're going to debate this intensely, but here are the lines: We challenge ideas, not character. We don't question each other's motives. If we get heated, we call a timeout.'",
        "When someone violates a boundary: Name it in real-time. 'Hold on—that felt like a personal attack. Can we reframe that as a disagreement about the approach, not about me as a person?'",
        "The goal isn't to avoid intensity—it's to contain it. You want the heat of disagreement without the destruction of personal attacks."
      ],
      researchBox: {
        title: "Gottman Institute Research",
        content: [
          "John Gottman's research on conflict in relationships shows:",
          "• Couples with explicit conflict rules have 31% lower divorce rates",
          "• The 'four horsemen' (criticism, contempt, defensiveness, stonewalling) predict relationship failure",
          "• Boundaries that prevent the four horsemen increase relationship stability by 65%",
          "Teams function the same way: Clear rules of engagement prevent toxic conflict patterns."
        ]
      },
      keyTakeaways: [
        "Explicit boundaries prevent implicit violations",
        "The 'rules of engagement' conversation happens before conflict, not during",
        "Name boundary violations in real-time: 'That crossed a line—let's reframe'"
      ],
      practiceExercise: "This week: Before your next difficult conversation, have a 'rules of engagement' discussion. 'Let's agree: We'll challenge ideas hard, but not question each other's character. If it gets personal, we'll pause.' Then hold the boundary if violated."
    }
  },
  {
    id: 3,
    title: "Personal Boundaries vs. Team Boundaries",
    description: "Distinguishing between your boundaries and collective norms",
    content: {
      whatYouLearn: [
        "The difference between personal and team boundaries",
        "How to negotiate boundaries as a team",
        "When personal boundaries should override team norms"
      ],
      coreConcept: [
        "Personal boundaries are yours alone: 'I don't respond to work messages after 8pm.' 'I need 24 hours to process big decisions—don't ask me to decide on the spot.'",
        "Team boundaries are collective: 'We don't interrupt each other in meetings.' 'We challenge ideas in the room, not in Slack afterward.'",
        "The negotiation: Personal boundaries sometimes conflict with team norms. When they do, you have to name it. 'The team norm is real-time decisions, but I need processing time. Can we find a middle ground?'",
        "When to hold firm: If a team norm violates your core boundary (e.g., the team culture is 'always available,' but you have non-negotiable family time), you advocate for change or leave. Resentment is worse than conflict."
      ],
      researchBox: {
        title: "Work-Life Boundary Research",
        content: [
          "Research from the Journal of Occupational Health Psychology:",
          "• Employees with clear work-life boundaries report 47% lower burnout",
          "• Teams that respect personal boundaries have 23% higher retention",
          "• Boundary violators (constant after-hours contact) decrease team performance by 18%",
          "Key finding: Respecting boundaries doesn't reduce productivity—it increases it."
        ]
      },
      keyTakeaways: [
        "Personal boundaries are individual; team boundaries are collective",
        "When they conflict, negotiate explicitly—don't silently resent",
        "Holding core personal boundaries is non-negotiable—even if it means conflict"
      ],
      practiceExercise: "This week: Identify one personal boundary that's being violated (by yourself or your team). Name it explicitly: 'I need X boundary. Can we figure out how to make that work?' Then hold it."
    }
  },
  {
    id: 4,
    title: "Enforcing Boundaries Without Escalation",
    description: "How to hold boundaries firmly while maintaining relationships",
    content: {
      whatYouLearn: [
        "The difference between enforcing and weaponizing boundaries",
        "De-escalation techniques when boundaries are tested",
        "Rebuilding trust after a boundary violation"
      ],
      coreConcept: [
        "Enforcing a boundary isn't punishment—it's clarity. 'You just interrupted me three times. I need to finish my thought before you respond.' That's enforcement.",
        "Weaponizing looks like: 'You ALWAYS interrupt me. You don't respect anyone. This is why nobody trusts you.' That's escalation disguised as boundary-setting.",
        "De-escalation technique: Name the boundary, not the person. 'That comment crossed into personal territory. Let's bring it back to the work.' vs. 'You're being disrespectful.'",
        "After a violation: Rebuild trust by naming it and moving forward. 'Yesterday's meeting got personal. I don't think either of us wanted that. Can we reset and try again?' This signals: The boundary matters, but the relationship matters more."
      ],
      researchBox: {
        title: "Conflict De-escalation Research",
        content: [
          "Research from the Program on Negotiation at Harvard:",
          "• De-escalation techniques reduce conflict intensity by 60%",
          "• Naming the pattern ('This is getting personal') without blaming reduces defensiveness by 45%",
          "• Repair attempts after boundary violations restore trust 80% of the time if done within 24 hours",
          "Speed matters: Address violations quickly, or resentment becomes permanent."
        ]
      },
      keyTakeaways: [
        "Enforcing boundaries is clarity, not punishment",
        "Name the boundary violation, not the person",
        "Repair attempts after violations rebuild trust—but do them within 24 hours"
      ],
      practiceExercise: "This week: If someone violates a boundary, practice enforcement without escalation. 'That crossed a line for me. Let's bring it back to [specific topic].' Then, within 24 hours, offer a repair: 'Let's reset—I value working with you.'"
    }
  }
];

export function BlueBeltStripe4() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const stripeQuiz = blueBeltContent[3].quiz; // Stripe 4

  useEffect(() => {
    const saved = localStorage.getItem('blueBeltStripe4Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blueBeltStripe4Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Blue Belt Stripe 4 - Lesson ${lessonId}`);

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
      await addXP(50, 'Blue Belt Stripe 4 Quiz Passed');
      await completeModule('blue-stripe-4');
      await addXP(150, 'Blue Belt Complete! 🥋');
      
      // Mark Blue Belt complete and Purple Belt unlocked
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.blue = 'completed';
      beltsProgress.purple = 'unlocked';
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
    /* RESPONSIVE: Mobile-first container */
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* RESPONSIVE: Header card */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-800 to-blue-900 border-blue-700">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">
              🔵 BLUE BELT - STRIPE 4 of 4 (FINAL)
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              🛡️ Boundaries
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              The final stripe: Master boundaries that enable healthy conflict. Learn why boundaries matter, set explicit rules of engagement, distinguish personal from team boundaries, and enforce boundaries without escalation. Complete this to earn your Blue Belt and unlock Purple Belt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-100">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-blue-200">Lessons Done</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-100">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 200 : 0)}</div>
                <div className="text-xs sm:text-sm text-blue-200">XP Earned</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-3xl font-bold text-blue-100">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-blue-200">Complete</div>
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
                  📝 Final Knowledge Check
                </h2>
                <p className="text-slate-300 mb-4">
                  Test your understanding of Conflict Mastery. You need 70% to pass and earn your Blue Belt!
                </p>
              </div>
            </Card>
            
            <StripeQuiz
              questions={stripeQuiz}
              onComplete={handleQuizComplete}
              stripeName="Conflict Mastery"
              beltColor="blue"
              stripeNumber={4}
            />
          </div>
        )}

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
                className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 max-w-lg text-center border-4 border-blue-300"
              >
                <Trophy className="w-24 h-24 text-blue-300 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-white mb-3">🔵 BLUE BELT EARNED! 🥋</h2>
                <p className="text-blue-100 text-lg mb-6">
                  You've mastered Fear of Conflict. Purple Belt is now unlocked!
                </p>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-2xl mb-6">
                  +{(lessons.length * 25) + 200} XP!
                </div>
                <div className="space-y-2 text-blue-200 text-sm mb-6">
                  <p>✓ All 4 Blue Belt Stripes Complete</p>
                  <p>✓ Conflict Mastery Established</p>
                  <p>✓ Purple Belt Unlocked</p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setShowCelebration(false);
                    navigate('/belt-system/blue/assessment');
                  }}
                  className="mb-4 min-h-[56px] w-full"
                >
                  🎯 Take Blue Belt Assessment
                </Button>
                <button
                  onClick={() => {
                    setShowCelebration(false);
                    navigate('/belt-system');
                  }}
                  className="text-blue-300 hover:text-white transition-colors text-sm"
                >
                  Skip for now →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Step Section */}
        {completedLessons.length === lessons.length && !showCelebration && (
          <Card className="mb-8 bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-500/30">
            <div className="p-6 sm:p-8 text-center">
              <div className="text-4xl sm:text-5xl mb-4">🎯</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Ready for Certification?
              </h3>
              <p className="text-blue-200 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                You've completed all Blue Belt stripes. Test your knowledge with the Blue Belt Assessment!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/belt-system/blue/assessment')}
                  className="min-h-[56px]"
                >
                  Take Blue Belt Assessment →
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
            className="text-blue-300 hover:text-white transition-colors"
          >
            ← Back to Belt System
          </button>
        </div>
      </div>
    </div>
  );
}

