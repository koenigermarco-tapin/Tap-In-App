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
    title: "Building Your Championship Team",
    description: "Who's on your team and are they aligned with your goals?",
    content: {
      whatYouLearn: [
        "How to identify who's actually on your team (family, friends, training partners)",
        "The difference between supporters and true teammates",
        "Why alignment matters more than skill"
      ],
      coreConcept: [
        "In sports, championship teams don't just have talented players—they have players who are aligned on the goal. Everyone knows what they're playing for.",
        "Your life works the same way. Your 'team' includes: Your partner/family, your close friends, your training partners, your work colleagues. But are they aligned with where you're going?",
        "The alignment question: 'If I'm trying to build X (health, business, family, skill), is this person helping me get there, distracting me, or actively pulling me away?'",
        "Sports analogy: If you're training for a marathon and your friends only want to go out drinking, there's a misalignment. Not because they're bad people—but because they're not on your championship team for this goal."
      ],
      researchBox: {
        title: "Social Support Research",
        content: [
          "Studies on goal achievement show:",
          "• People with aligned support networks are 3x more likely to achieve major goals",
          "• Misaligned relationships (people undermining your goals) reduce success rates by 60%",
          "• Having even one 'championship teammate' (fully aligned support) doubles your follow-through",
          "Your environment shapes your outcomes more than your willpower does."
        ]
      },
      keyTakeaways: [
        "Championship teams are aligned on the goal, not just talented",
        "Your 'team' includes family, friends, training partners, colleagues",
        "Alignment matters more than likeability—are they helping or hindering your goals?"
      ],
      practiceExercise: "This week: Map your team. Write down your top 5 goals (health, family, career, skill development, etc.). For each goal, list who's aligned (helping), neutral, or misaligned (pulling you away). Notice where the gaps are."
    }
  },
  {
    id: 2,
    title: "The Coach's Mindset",
    description: "Leading your team without controlling them",
    content: {
      whatYouLearn: [
        "The difference between coaching and controlling",
        "How to inspire alignment instead of demanding it",
        "When to let people find their own path"
      ],
      coreConcept: [
        "Great coaches don't control players—they align them around a shared vision. They inspire commitment rather than enforce compliance.",
        "In your life, you're the coach of your team (family, friends, colleagues). Your job isn't to make everyone do what you want—it's to create alignment around shared goals.",
        "The coach's question: 'What do we all want?' not 'What do I want you to do?' Example: Instead of 'You need to eat healthier' (control), try 'We both want to feel great—what if we meal-prepped together?' (alignment).",
        "BJJ analogy: A good coach shows you the technique, lets you practice it, and gives feedback. A bad coach just yells 'Do it my way!' without explaining why. One creates commitment. The other creates compliance (or rebellion)."
      ],
      researchBox: {
        title: "Motivation Research",
        content: [
          "Self-Determination Theory (Deci & Ryan) shows:",
          "• Autonomy (choice) increases commitment by 40%",
          "• People who feel controlled resist, even when the goal is good",
          "• Intrinsic motivation (aligned goals) outlasts extrinsic pressure (forced goals) by 10x",
          "The coach's job: Create conditions where people want to commit, not where they have to."
        ]
      },
      keyTakeaways: [
        "Coaches inspire alignment; controllers demand compliance",
        "Ask 'What do we all want?' not 'What do I want you to do?'",
        "Autonomy and shared vision create commitment; pressure creates resistance"
      ],
      practiceExercise: "This week: Pick one goal where you're trying to get someone (partner, kid, friend) to change. Shift from control to coaching: Share your goal, ask what they want, find the overlap. See if their commitment changes."
    }
  },
  {
    id: 3,
    title: "Setting Game Plans, Not Just Goals",
    description: "Turning intentions into commitments through clear planning",
    content: {
      whatYouLearn: [
        "Why vague goals fail (and specific game plans succeed)",
        "The difference between hoping and committing",
        "How to turn 'I should' into 'I will'"
      ],
      coreConcept: [
        "In sports, teams don't just say 'Let's win.' They create game plans: specific strategies, plays, contingencies. That's how hope becomes commitment.",
        "Most people set vague life goals: 'Get healthy.' 'Spend more time with family.' 'Build a business.' These aren't commitments—they're wishes.",
        "A game plan has three elements: 1) Specific action ('I will train BJJ Monday/Wednesday/Friday at 6pm'). 2) Triggers ('When I get home from work, I'll change immediately into training gear'). 3) Contingencies ('If I miss Monday, I'll go Saturday morning').",
        "The commitment test: Can you fail at this? If your goal is so vague you can't tell if you're succeeding, you haven't committed—you're just hoping."
      ],
      researchBox: {
        title: "Implementation Intention Research",
        content: [
          "Peter Gollwitzer's research on 'if-then planning' shows:",
          "• People with specific plans (game plans) are 2-3x more likely to follow through",
          "• 'I will do X at Y time in Z place' increases success rates by 90%",
          "• Contingency plans ('If A happens, I'll do B') prevent derailment",
          "Vague goals rely on motivation. Game plans rely on commitment."
        ]
      },
      keyTakeaways: [
        "Game plans (specific, triggered, contingency-ready) beat vague goals",
        "Commitment means you can fail—hope means you can't tell",
        "'I will' beats 'I should' every time"
      ],
      practiceExercise: "This week: Pick one goal and turn it into a game plan. Write: 1) Specific action, 2) When/where trigger, 3) 'If I miss X, I'll do Y' contingency. Then follow it for 7 days and track success rate."
    }
  },
  {
    id: 4,
    title: "Winning Streaks and Breaking Slumps",
    description: "Building momentum and recovering when commitment breaks",
    content: {
      whatYouLearn: [
        "How to build and protect winning streaks",
        "Why one miss becomes a slump (and how to prevent it)",
        "The 'never miss twice' rule from athletes"
      ],
      coreConcept: [
        "Athletes know: Momentum matters. Winning streaks build confidence. But slumps happen when you miss once, then twice, then stop tracking altogether.",
        "The 'never miss twice' rule: You're allowed to miss your commitment once. Life happens. But never miss twice in a row. Missing twice turns an exception into a pattern.",
        "How to protect streaks: 1) Track visibly (calendar, app, journal). 2) Celebrate milestones (7 days, 30 days, 100 days). 3) Have a 'comeback plan'—if you miss, what's the immediate next action?",
        "BJJ analogy: If you miss a week of training, it's easy to miss two weeks, then a month, then quit. But if you have a comeback rule ('I miss Monday, I show up Wednesday no matter what'), you protect the habit."
      ],
      researchBox: {
        title: "Habit Research",
        content: [
          "Research on habit formation and streak maintenance:",
          "• Streaks increase commitment: People on 7-day streaks are 60% more likely to continue",
          "• The 'miss twice' threshold: People who miss twice are 5x more likely to quit",
          "• Visible tracking (calendar, app) increases follow-through by 42%",
          "The key: Make the streak visible, celebrate it, and never let one miss become two."
        ]
      },
      keyTakeaways: [
        "Winning streaks build momentum; slumps start with missing twice",
        "The 'never miss twice' rule: Miss once = life. Miss twice = pattern.",
        "Track visibly, celebrate milestones, have a comeback plan"
      ],
      practiceExercise: "This week: Start a streak for one commitment. Track it daily (calendar, app, notebook). If you miss, immediately schedule the next occurrence. Practice the 'never miss twice' rule."
    }
  }
];

export function PurpleBeltStripe1() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('purpleBeltStripe1Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('purpleBeltStripe1Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Purple Belt Stripe 1 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('purple-stripe-1');
      await addXP(100, 'Purple Belt Stripe 1 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/purple/stripe-2');
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
              🟣 PURPLE BELT - STRIPE 1 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-600 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              🏆 Team Alignment & Shared Goals
            </h1>
            <p className="text-purple-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Build your championship team across all areas of life. Learn who's truly on your team, develop the coach's mindset, create game plans that turn intentions into commitments, and build winning streaks while recovering from slumps.
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
                <div className="text-6xl mb-3 sm:mb-4">🏆</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 1 Complete! 🥋</h2>
                <p className="text-purple-100 mb-3 sm:mb-4">
                  You've mastered Team Alignment & Shared Goals. Ready for Stripe 2?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-purple-300 text-sm">
                  Redirecting to Stripe 2: Healthy Conflict...
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

