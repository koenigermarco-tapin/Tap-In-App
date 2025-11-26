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
    title: "Everyone Owns the Outcome",
    description: "Moving from 'my goal' to 'our goal' in relationships and teams",
    content: {
      whatYouLearn: [
        "Why shared ownership creates commitment",
        "The difference between delegation and shared responsibility",
        "How to create 'we' instead of 'me vs. you'"
      ],
      coreConcept: [
        "Championship teams don't have 'your stats' and 'my stats'—they have team stats. Everyone owns the win or loss together.",
        "In relationships, work, and training: If only one person owns the goal, commitment is fragile. The moment they're tired, sick, or distracted, progress stops.",
        "Shared ownership means: Both people (or all people) have skin in the game. Example: 'Getting healthy' isn't just your goal—it's 'our goal' if your partner meal-preps with you, trains with you, holds you accountable.",
        "The shift: From 'I need you to support my goal' to 'This is our goal—how do we both win?'"
      ],
      researchBox: {
        title: "Collective Ownership Research",
        content: [
          "Research on team performance and shared goals:",
          "• Teams with shared ownership report 45% higher sustained commitment",
          "• Individual goals with 'supporters' have 30% lower success rates than truly shared goals",
          "• Accountability paired with shared ownership increases follow-through by 65%",
          "The key: Everyone owns the win AND the loss."
        ]
      },
      keyTakeaways: [
        "Shared ownership creates resilience—when one person is down, the other carries",
        "Individual goals with 'supporters' are weaker than truly shared goals",
        "Ask 'How do we both win?' to create collective ownership"
      ],
      practiceExercise: "This week: Pick one goal where you currently have a 'supporter.' Have a conversation: 'What if this became our goal together? What would you want to get out of it?' Turn support into shared ownership."
    }
  },
  {
    id: 2,
    title: "Calling the Play: Decision Rights",
    description: "Who decides what, and how to avoid decision paralysis",
    content: {
      whatYouLearn: [
        "Why teams without clear decision rights get stuck",
        "The quarterback principle: Someone calls the play, everyone executes",
        "When to decide by consensus vs. when to decide and commit"
      ],
      coreConcept: [
        "In sports, the quarterback calls the play. Not because they're smarter, but because indecision loses games. Everyone has input, but one person makes the call.",
        "In life and teams: Shared ownership doesn't mean every decision is a committee vote. Decide who decides: Health decisions? Maybe you call it. Financial decisions? Maybe your partner calls it. Work projects? Maybe the lead calls it.",
        "The rule: Input from everyone, decision by the right person, commitment from everyone. Example: 'We're deciding where to move. We'll both share what matters to us, you'll make the final call, and I'll commit fully.'",
        "Danger: Getting stuck in 'consensus purgatory' where no one decides, so nothing moves forward."
      ],
      researchBox: {
        title: "Decision-Making Research",
        content: [
          "Research on team decision-making and speed:",
          "• Teams with clear decision rights make decisions 40% faster",
          "• Unclear decision rights increase conflict by 50%",
          "• 'Input + decision + commitment' model has 70% higher satisfaction than pure consensus",
          "Speed matters: A good decision executed fast beats a perfect decision executed slowly."
        ]
      },
      keyTakeaways: [
        "Clear decision rights prevent paralysis and resentment",
        "Input from everyone, decision by the right person, commitment from everyone",
        "Avoid consensus purgatory—someone has to call the play"
      ],
      practiceExercise: "This week: Identify one decision you or your team keeps delaying. Clarify: Who decides? Who gives input? Who commits? Then decide and move forward."
    }
  },
  {
    id: 3,
    title: "The Accountability Check-In",
    description: "Weekly rituals that keep commitments alive",
    content: {
      whatYouLearn: [
        "Why weekly check-ins prevent drift",
        "The 3-question accountability framework",
        "How to make check-ins feel like support, not surveillance"
      ],
      coreConcept: [
        "Athletes have team meetings every week: What did we commit to? What did we do? What's next? This keeps everyone aligned and accountable.",
        "Your life needs the same. Whether it's with a partner, training buddy, or accountability group: Weekly check-in. 10-15 minutes. Three questions: 1) What did I commit to last week? 2) What actually happened? 3) What's my commitment for this week?",
        "Key: Make it non-judgmental. The point isn't shame ('You failed again!')—it's clarity ('You said you'd do X, you did Y, what happened? What do you need to adjust?').",
        "Example: You and your training partner commit to checking in every Sunday: 'I said I'd train 4x this week. I did 2. I was exhausted from work. Next week, I'm committing to 3 and scheduling them in advance.'"
      ],
      researchBox: {
        title: "Accountability Research",
        content: [
          "Research on goal achievement and accountability partners:",
          "• Weekly check-ins increase goal achievement by 65%",
          "• Accountability without judgment increases follow-through by 40%",
          "• People with accountability partners are 95% more likely to achieve goals than people working alone",
          "The key: Regular, structured, non-judgmental check-ins."
        ]
      },
      keyTakeaways: [
        "Weekly check-ins keep commitments alive and prevent drift",
        "3 questions: What did I commit to? What happened? What's next?",
        "Make it supportive, not judgmental—clarity over shame"
      ],
      practiceExercise: "This week: Set up one weekly accountability check-in with someone (partner, friend, training buddy). Use the 3-question framework. Do it for 4 weeks and track whether your follow-through improves."
    }
  },
  {
    id: 4,
    title: "When Commitments Clash",
    description: "Navigating conflicts between competing commitments",
    content: {
      whatYouLearn: [
        "Why commitment conflicts create stress and resentment",
        "The priority pyramid: How to stack commitments",
        "When to renegotiate vs. when to hold the line"
      ],
      coreConcept: [
        "You've committed to training 5x/week. Your partner needs support with a family issue. Your work has a deadline. All commitments are real—but they can't all happen at once.",
        "The priority pyramid: Not all commitments are equal. Rank them: Foundation (non-negotiables like family, health), Middle (important but flexible like work projects), Top (nice-to-haves like hobbies). When commitments clash, the pyramid tells you what gives.",
        "Renegotiation: When commitments conflict, renegotiate explicitly. 'I committed to training 5x, but this week is family-first. I'm renegotiating to 2x this week, back to 5x next week.'",
        "Don't suffer in silence. Unexpressed commitment conflicts create resentment. Name it, renegotiate it, move forward."
      ],
      researchBox: {
        title: "Work-Life Balance Research",
        content: [
          "Research on competing commitments and stress:",
          "• Unexpressed commitment conflicts are the #1 source of chronic stress",
          "• People with clear priority hierarchies report 40% lower stress",
          "• Explicit renegotiation (vs. silent dropping) maintains trust and reduces guilt",
          "The key: Make your priorities visible and renegotiate explicitly when conflicts arise."
        ]
      },
      keyTakeaways: [
        "Commitment conflicts are inevitable—the pyramid helps you prioritize",
        "Renegotiate explicitly when commitments clash—don't just drop things silently",
        "Foundation > Middle > Top: Not all commitments are equal"
      ],
      practiceExercise: "This week: Build your priority pyramid. Write down your commitments and rank them (Foundation, Middle, Top). Next time commitments clash, use the pyramid to decide what gives—and renegotiate explicitly with anyone affected."
    }
  }
];

export function PurpleBeltStripe3() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('purpleBeltStripe3Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('purpleBeltStripe3Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Purple Belt Stripe 3 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('purple-stripe-3');
      await addXP(100, 'Purple Belt Stripe 3 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/purple/stripe-4');
      }, 3000);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-purple-800 to-purple-900 border-purple-700">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">
              🟣 PURPLE BELT - STRIPE 3 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-600 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              🤝 Collective Accountability
            </h1>
            <p className="text-purple-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Build systems for shared success. Learn to create collective ownership, establish clear decision rights, implement weekly accountability check-ins, and navigate conflicts between competing commitments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-100">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-purple-200">Lessons Done</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-100">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 100 : 0)}</div>
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
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-2xl p-8 max-w-md text-center border-2 border-purple-500"
              >
                <div className="text-6xl mb-3 sm:mb-4">🤝</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 3 Complete! 🥋</h2>
                <p className="text-purple-100 mb-3 sm:mb-4">
                  You've mastered Collective Accountability. Ready for the final stripe?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-purple-300 text-sm">
                  Redirecting to Stripe 4: Results Focus...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

