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
    title: "Creating Team Accountability Rituals",
    description: "Weekly and monthly practices that keep everyone accountable",
    content: {
      whatYouLearn: [
        "Why accountability rituals beat one-off conversations",
        "The weekly accountability standup framework",
        "Monthly retrospectives for deep accountability"
      ],
      coreConcept: [
        "One-off accountability conversations fade. Rituals stick. Championship teams have weekly practices: film review, stats check, goal recalibration. Everyone knows it's coming.",
        "Weekly accountability standup (15 min): Each person shares: 1) My commitment last week, 2) What I delivered, 3) My commitment this week, 4) What I need from the team. No judgment, just visibility.",
        "Monthly retrospective (60 min): Deeper dive. What's working? What's not? Where are we slipping? What needs to change? This is where you address patterns, not just individual misses.",
        "The power: When rituals are consistent, accountability becomes normal. It's not 'You're in trouble'—it's 'It's Tuesday, we do our check-in.'"
      ],
      researchBox: {
        title: "Ritual and Accountability Research",
        content: [
          "Research on team rituals and performance:",
          "• Teams with weekly accountability rituals have 45% higher goal achievement",
          "• Consistent rituals reduce stress around accountability by 35%",
          "• Monthly retrospectives improve team learning and adaptation by 50%",
          "The key: Make accountability predictable, not punitive."
        ]
      },
      keyTakeaways: [
        "Rituals (weekly, monthly) beat one-off accountability conversations",
        "Weekly standup: Last week's commitment, what happened, this week's commitment",
        "Monthly retrospective: Deep dive on patterns and adjustments"
      ],
      practiceExercise: "This week: Establish one accountability ritual with your team (or accountability partner). Schedule it recurring. Use the standup format: commitment, delivery, new commitment, needs. Run it for 4 weeks."
    }
  },
  {
    id: 2,
    title: "Accountability Dashboards",
    description: "Making progress and gaps visible to everyone",
    content: {
      whatYouLearn: [
        "Why visibility drives accountability",
        "How to create a simple accountability dashboard",
        "The balance between transparency and trust"
      ],
      coreConcept: [
        "Athletes look at the leaderboard, the standings, the stats. Visibility creates accountability. When everyone can see the scoreboard, you can't hide from the gap.",
        "Accountability dashboard basics: Simple visual board (whiteboard, spreadsheet, app) showing: Who committed to what? Status (done/in progress/missed)? Updated weekly. Public to the team.",
        "Example: Family fitness dashboard on the fridge. Each person's weekly training commitment + checkmarks. Everyone sees who's following through. No shame—just data.",
        "The balance: Dashboards work when combined with support. If visibility creates shame without help, people hide. Combine transparency with 'How can we help you hit your commitments?'"
      ],
      researchBox: {
        title: "Transparency and Accountability Research",
        content: [
          "Research on visible accountability systems:",
          "• Visible progress tracking increases follow-through by 40%",
          "• Public commitments are 65% more likely to be kept",
          "• Transparency + support (not judgment) doubles effectiveness",
          "The rule: Make progress visible, make support available."
        ]
      },
      keyTakeaways: [
        "Visible dashboards make accountability unavoidable",
        "Simple system: Who committed? Status? Updated weekly. Public to team.",
        "Combine transparency with support—visibility without help creates shame"
      ],
      practiceExercise: "This week: Create a simple accountability dashboard for one shared goal (family, team, training group). Track commitments publicly. Update weekly. After 3 weeks, ask: Did visibility change behavior?"
    }
  },
  {
    id: 3,
    title: "Peer-to-Peer Accountability Partnerships",
    description: "Building 1:1 accountability without hierarchies",
    content: {
      whatYouLearn: [
        "Why peer accountability works better than manager accountability",
        "How to structure accountability partnerships",
        "What to do when your accountability partner isn't holding up"
      ],
      coreConcept: [
        "Manager-subordinate accountability has power dynamics. Peer accountability doesn't. You're equals pushing each other to be better.",
        "Accountability partnership structure: Two people pair up. Weekly 15-minute call. Each shares: 1) Last week's goal and outcome, 2) This week's goal, 3) One challenge they need support on. The other person asks questions, offers ideas, then does their share.",
        "The power: No hierarchy means no fear. You can be honest because your partner isn't evaluating you—they're supporting you. Both of you benefit from being pushed.",
        "When your partner slacks: Have the accountability conversation. 'We committed to weekly check-ins. You've missed 3. Do you still want this partnership, or should we pause?' Accountability partnerships require mutual commitment."
      ],
      researchBox: {
        title: "Peer Accountability Research",
        content: [
          "Research on accountability partners:",
          "• Peer accountability partnerships increase goal achievement by 70%",
          "• Peers are perceived as 2x more supportive than managers in accountability",
          "• Mutual accountability (both people committed) is 5x stronger than one-way",
          "The key: Equal power, equal commitment, equal benefit."
        ]
      },
      keyTakeaways: [
        "Peer accountability (equals) beats hierarchical accountability (manager-subordinate)",
        "Structure: Weekly 15-min check-in, share goals/outcomes, mutual support",
        "If partner slacks, address it directly—accountability partnerships require mutual commitment"
      ],
      practiceExercise: "This week: Find one accountability partner (peer, not manager). Set up weekly 15-min check-ins. Use the structure: last week's goal/outcome, this week's goal, one challenge. Commit for 4 weeks."
    }
  },
  {
    id: 4,
    title: "Scaling Accountability in Large Teams",
    description: "How to maintain accountability as teams grow",
    content: {
      whatYouLearn: [
        "Why accountability gets diluted as teams grow",
        "The 'team of teams' accountability model",
        "How to cascade accountability without micromanaging"
      ],
      coreConcept: [
        "Small teams: Everyone sees everyone. Accountability is natural. Large teams: People hide in the crowd. 'Someone else will handle it.' Accountability dilutes.",
        "The solution: Team of teams model. Break large teams into small pods (3-5 people). Each pod has internal accountability (weekly standups, peer checks). Pod leads meet weekly for cross-pod accountability. Leader holds pod leads accountable, who hold their pods accountable.",
        "Cascading accountability: Leader sets vision and standards. Pod leads translate to their pod's goals. Pods own execution. Leader checks pod-level outcomes, not individual tasks (that's micromanaging).",
        "Sports analogy: NFL teams have position groups (offensive line, receivers, etc.). Each group has internal accountability. Coordinators hold group leaders accountable. Head coach holds coordinators accountable."
      ],
      researchBox: {
        title: "Scaling Accountability Research",
        content: [
          "Research on accountability in large organizations:",
          "• Teams larger than 7-9 people experience 50% accountability dilution",
          "• 'Team of teams' model (small pods + cross-pod coordination) maintains 85% accountability effectiveness",
          "• Leaders who hold teams accountable (not individuals) increase autonomy and ownership",
          "The key: Small pods for peer accountability, cross-pod coordination for alignment."
        ]
      },
      keyTakeaways: [
        "Accountability dilutes in large teams—break into small pods (3-5 people)",
        "Team of teams: Pods have internal accountability, pod leads coordinate",
        "Leader holds pod-level outcomes accountable, not individual tasks"
      ],
      practiceExercise: "This week: If you lead a large team (10+), map your 'team of teams' structure. Break into pods. Identify pod leads. Set up weekly pod accountability + weekly cross-pod coordination. Run for 4 weeks and assess."
    }
  }
];

export function BrownBeltStripe3() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('brownBeltStripe3Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('brownBeltStripe3Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Brown Belt Stripe 3 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('brown-stripe-3');
      await addXP(100, 'Brown Belt Stripe 3 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/brown/stripe-4');
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
              🟤 BROWN BELT - STRIPE 3 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-amber-600 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              🔧 Accountability Systems
            </h1>
            <p className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Build sustainable accountability structures. Learn to create team rituals, implement accountability dashboards, establish peer partnerships, and scale accountability in large teams.
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
                <div className="text-6xl mb-3 sm:mb-4">🔧</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 3 Complete! 🥋</h2>
                <p className="text-amber-100 mb-3 sm:mb-4">
                  You've mastered Accountability Systems. Ready for the final stripe?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-amber-300 text-sm">
                  Redirecting to Stripe 4: Accountability Mastery...
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

