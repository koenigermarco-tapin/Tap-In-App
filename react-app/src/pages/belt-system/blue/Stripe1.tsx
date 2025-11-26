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
    title: "The Conflict Continuum",
    description: "Understanding the spectrum from artificial harmony to productive ideological conflict",
    content: {
      whatYouLearn: [
        "The difference between destructive and productive conflict",
        "Why artificial harmony is more dangerous than messy debate",
        "The conflict continuum and where your team currently sits"
      ],
      coreConcept: [
        "Most teams think conflict is bad. They're wrong. What's bad is the wrong kind of conflict.",
        "Lencioni identifies two types of conflict: Personal conflict (attacking people, making it about identity) and Ideological conflict (debating ideas, challenging assumptions).",
        "The problem: Teams that avoid ideological conflict end up with artificial harmony—everyone nods politely while silently disagreeing. Then, resentment builds until someone explodes in personal conflict.",
        "Healthy teams embrace ideological conflict. They argue about strategies, challenge each other's thinking, and debate decisions intensely. But they separate ideas from identity."
      ],
      researchBox: {
        title: "Research on Conflict Avoidance",
        content: [
          "Studies show that conflict-avoidant teams make worse decisions and have lower performance:",
          "• 23% lower decision quality",
          "• 31% slower problem-solving",
          "• 47% more likely to have 'parking lot conversations' after meetings",
          "• 2.5x higher likelihood of unresolved issues festering"
        ]
      },
      keyTakeaways: [
        "Artificial harmony is more dangerous than productive conflict",
        "Personal conflict attacks people; ideological conflict challenges ideas",
        "Teams that can't argue about ideas will eventually argue about people"
      ],
      practiceExercise: "This week: Observe your team meetings. Are people debating ideas openly, or nodding politely? When someone disagrees, do they voice it in the meeting or save it for later? Document what you notice about your team's conflict style."
    }
  },
  {
    id: 2,
    title: "Permission to Disagree",
    description: "Creating explicit norms that make disagreement safe and expected",
    content: {
      whatYouLearn: [
        "How to explicitly grant permission for disagreement",
        "Why implicit norms aren't enough—you must make it explicit",
        "Phrases and rituals that normalize productive conflict"
      ],
      coreConcept: [
        "Even in high-trust teams, people won't disagree unless they have explicit permission.",
        "As a leader, you must say out loud: 'I want you to challenge this idea. If you disagree, I need to hear it—now, not after the meeting.'",
        "Explicit permission-granting phrases: 'What am I missing here?' 'Where's the flaw in this thinking?' 'Someone play devil's advocate.' 'If you were going to disagree with this plan, what would your argument be?'",
        "The goal isn't politeness—it's truth. You'd rather have 10 minutes of uncomfortable debate now than 6 months of wasted effort on a flawed strategy."
      ],
      researchBox: {
        title: "Amy Edmondson's Research",
        content: [
          "Psychological safety expert Amy Edmondson found that high-performing teams have leaders who actively invite dissent:",
          "• Teams where leaders explicitly ask for disagreement have 40% fewer avoidable errors",
          "• Phrases like 'What are we missing?' increase speaking up by 35%",
          "• Teams with explicit conflict norms resolve disagreements 2x faster"
        ]
      },
      keyTakeaways: [
        "Trust creates safety, but explicit permission creates action",
        "Leaders must verbally invite disagreement in real-time",
        "Normalizing conflict phrases makes disagreement feel less risky"
      ],
      practiceExercise: "This week: In your next team meeting, use one explicit permission phrase at least twice. 'What am I missing?' or 'Where could this go wrong?' Observe whether people actually speak up more. Document the difference."
    }
  },
  {
    id: 3,
    title: "Mining for Conflict",
    description: "Actively surfacing disagreement instead of waiting for it to emerge",
    content: {
      whatYouLearn: [
        "The 'mining for conflict' technique from Lencioni",
        "How to call out when the room is too quiet",
        "Distinguishing between consensus and groupthink"
      ],
      coreConcept: [
        "Mining for conflict means actively looking for buried disagreement and dragging it into the light.",
        "When everyone agrees too quickly, something's wrong. Either: 1) People don't understand the issue deeply enough to have an opinion, or 2) People disagree but don't feel safe saying it.",
        "The facilitator's job: Notice the silence and name it. 'We all just agreed in 30 seconds. That feels too easy. What are we not talking about?' 'I sense someone disagrees but isn't saying it. Who is it?'",
        "Real consensus comes after debate, not before it. If you reached agreement without conflict, you haven't reached real consensus—you've reached artificial harmony."
      ],
      researchBox: {
        title: "Irving Janis's Groupthink Research",
        content: [
          "Groupthink—the desire for harmony leading to irrational decision-making—is responsible for some of history's worst failures:",
          "• Bay of Pigs invasion",
          "• Challenger space shuttle disaster",
          "• 2008 financial crisis",
          "Key warning signs: Illusion of unanimity, self-censorship, pressure on dissenters"
        ]
      },
      keyTakeaways: [
        "Fast agreement is a red flag, not a green light",
        "Mining for conflict means actively surfacing buried disagreement",
        "The facilitator's job is to name the silence and invite dissent"
      ],
      practiceExercise: "This week: In a meeting where everyone agrees too quickly, pause and say: 'This feels too easy. What are we missing?' or 'Who disagrees but hasn't said it?' See what surfaces."
    }
  },
  {
    id: 4,
    title: "Real-Time Permission Stacking",
    description: "Building conflict muscle through repeated practice and explicit invitations",
    content: {
      whatYouLearn: [
        "How to build your team's conflict muscle over time",
        "The 'permission stacking' technique for creating habit",
        "Tracking your team's conflict capacity growth"
      ],
      coreConcept: [
        "Your team won't go from conflict-avoidant to conflict-capable overnight. It's a muscle that requires repetition.",
        "Permission stacking means repeatedly, explicitly inviting conflict until it becomes normal. Week 1: 'I need you to challenge this.' Week 2: 'Where's the flaw?' Week 3: 'Someone disagree with me.' By Week 4, people start doing it without prompting.",
        "Track your progress: Count how many times someone openly disagrees in meetings. If that number isn't growing month-over-month, your culture isn't changing.",
        "The goal: Get to the point where disagreement feels ordinary, not courageous."
      ],
      researchBox: {
        title: "Habit Formation Research",
        content: [
          "Research from BJ Fogg at Stanford shows that behavioral change requires:",
          "• Repeated triggers (explicit invitations)",
          "• Low friction (make it safe to disagree)",
          "• Positive reinforcement (thank people who disagree)",
          "Teams that practice permission stacking see 3x improvement in conflict engagement within 90 days."
        ]
      },
      keyTakeaways: [
        "Conflict capacity is a muscle built through repetition",
        "Permission stacking means repeatedly inviting disagreement until it's normal",
        "Track the frequency of open disagreement as a measure of cultural change"
      ],
      practiceExercise: "This week: Commit to using a permission phrase in every meeting for the next 30 days. Track how many times someone openly disagrees each week. Look for the trend line—it should go up."
    }
  }
];

export function BlueBeltStripe1() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Get quiz questions from content
  const stripeQuiz = blueBeltContent[0].quiz; // Stripe 1

  useEffect(() => {
    const saved = localStorage.getItem('blueBeltStripe1Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blueBeltStripe1Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Blue Belt Stripe 1 - Lesson ${lessonId}`);

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
      await addXP(50, 'Blue Belt Stripe 1 Quiz Passed');
      await completeModule('blue-stripe-1');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/blue/stripe-2');
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
              🔵 BLUE BELT - STRIPE 1 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-blue-600 rounded" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              💬 Difficult Conversations
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Learn to engage in productive ideological conflict. Master the conflict continuum, grant explicit permission to disagree, mine for buried disagreement, and build your team's conflict muscle through permission stacking.
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
                  Test your understanding of Conflict Foundations. You need 70% to pass and complete this stripe.
                </p>
              </div>
            </Card>
            
            <StripeQuiz
              questions={stripeQuiz}
              onComplete={handleQuizComplete}
              stripeName="Conflict Foundations"
              beltColor="blue"
              stripeNumber={1}
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
                <h2 className="text-3xl font-bold text-white mb-2">Stripe 1 Complete! 🥋</h2>
                <p className="text-blue-100 mb-4">
                  You've mastered Difficult Conversations. Ready for Stripe 2?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-blue-300 text-sm">
                  Redirecting to Stripe 2: Active Listening...
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

