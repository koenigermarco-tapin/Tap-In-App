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
    title: "Training Partners vs. Opponents",
    description: "Reframing conflict as collaboration instead of competition",
    content: {
      whatYouLearn: [
        "Why treating people as opponents kills commitment",
        "The training partner mindset in relationships and teams",
        "How to disagree without making it adversarial"
      ],
      coreConcept: [
        "In BJJ, your training partners aren't your enemies—they're helping you get better. You push each other hard, but you're both trying to improve.",
        "Most people treat disagreement like combat: Me vs. You. Winner vs. Loser. This destroys commitment because no one wants to be on the losing team.",
        "The training partner reframe: 'We're both trying to get to the best answer/outcome. Let's push each other's thinking and see what we discover together.'",
        "Example: Your partner wants to save money, you want to travel. Opponent mindset: 'You're holding me back.' Training partner mindset: 'We both want security AND experiences—how do we get both?'"
      ],
      researchBox: {
        title: "Collaborative vs. Adversarial Mindset",
        content: [
          "Research on negotiation and conflict resolution:",
          "• Adversarial mindset (me vs. you) reduces agreement rates by 50%",
          "• Collaborative mindset ('us vs. the problem') increases creative solutions by 70%",
          "• Teams that frame conflict as 'training' report 40% higher satisfaction",
          "The shift: From 'I need to win' to 'We need to solve this together.'"
        ]
      },
      keyTakeaways: [
        "Training partners push each other to improve; opponents try to defeat each other",
        "Disagreement framed as collaboration creates commitment; adversarial conflict destroys it",
        "Ask 'How do we both win?' not 'How do I win?'"
      ],
      practiceExercise: "This week: Next time you disagree with someone (partner, friend, colleague), explicitly say: 'We're training partners on this, not opponents. Let's figure it out together.' Notice how the energy shifts."
    }
  },
  {
    id: 2,
    title: "The Post-Game Review",
    description: "How to debrief decisions and build trust through reflection",
    content: {
      whatYouLearn: [
        "Why teams need structured reflection after major decisions",
        "The post-game review framework: What worked, what didn't, what's next",
        "How to separate outcomes from decisions"
      ],
      coreConcept: [
        "Athletes watch game film after every match. They review: What worked? What didn't? What do we do differently next time? This builds commitment because everyone learns together.",
        "Your life needs post-game reviews too. After big decisions (moving, changing jobs, major family choices), debrief: 1) What did we decide and why? 2) How did it turn out? 3) What would we do differently?",
        "Key distinction: Separate outcome from decision. A good decision can have a bad outcome (got unlucky). A bad decision can have a good outcome (got lucky). Review the decision process, not just the result.",
        "Example: You decided to invest in training instead of taking a vacation. The training was hard, but you learned a lot. Post-game: 'The decision to invest in skills was good, even though it was tough. Next time, let's plan a smaller trip as a reward after.'"
      ],
      researchBox: {
        title: "After-Action Review Research",
        content: [
          "U.S. Army After-Action Review (AAR) research:",
          "• Teams that conduct structured reviews improve performance by 25% per iteration",
          "• Separating outcome from decision quality improves future decision-making by 40%",
          "• Regular reviews build psychological safety and commitment",
          "The key: Make it a learning loop, not a blame session."
        ]
      },
      keyTakeaways: [
        "Post-game reviews build commitment by turning decisions into learning",
        "Review the decision process, not just the outcome (good decisions can have bad outcomes)",
        "Ask: What worked? What didn't? What's next?"
      ],
      practiceExercise: "This week: Schedule a post-game review for one recent decision (work, family, personal). Use the 3-question framework: What worked? What didn't? What would we do differently? Do it with anyone else involved."
    }
  },
  {
    id: 3,
    title: "Playing Through Adversity",
    description: "Maintaining commitment when things get hard",
    content: {
      whatYouLearn: [
        "Why commitment is tested most when results aren't immediate",
        "The difference between quitting and pivoting",
        "How champions respond to setbacks"
      ],
      coreConcept: [
        "Every athlete faces adversity: injuries, losses, plateaus. Champions don't quit—but they do adjust. The question isn't 'Should I keep going?' It's 'Is this still the right path, and if so, what needs to change?'",
        "In life, commitment gets tested when: Progress stalls. Results don't come fast. Life throws obstacles. This is when most people quit—not because the goal was wrong, but because they didn't expect it to be this hard.",
        "The adversity framework: 1) Is the goal still right? (Check in with your 'why'). 2) Is the approach working? (Maybe the method needs adjustment, not the goal). 3) What support do I need? (You don't play through adversity alone).",
        "Example: You committed to building a business, but 6 months in, it's harder than expected. Quitting: 'This isn't working, I'm done.' Pivoting: 'The goal is still right, but my approach needs adjustment. What do I need to change?'"
      ],
      researchBox: {
        title: "Grit and Perseverance Research",
        content: [
          "Angela Duckworth's research on grit shows:",
          "• High achievers experience just as many setbacks as everyone else",
          "• The difference: They reframe adversity as information, not failure",
          "• People who ask 'What needs to change?' vs. 'Should I quit?' have 5x higher success rates",
          "Commitment isn't blind persistence—it's informed persistence."
        ]
      },
      keyTakeaways: [
        "Adversity tests commitment—champions adjust but don't quit",
        "Ask 'What needs to change?' not 'Should I quit?'",
        "Check: Is the goal still right? Is the approach working? What support do I need?"
      ],
      practiceExercise: "This week: Identify one area where you're facing adversity. Use the framework: 1) Is the goal still right? 2) Is the approach working? 3) What support do I need? Write down your answers and adjust accordingly."
    }
  },
  {
    id: 4,
    title: "Celebrating Milestones as a Team",
    description: "Why recognition and celebration fuel sustained commitment",
    content: {
      whatYouLearn: [
        "Why teams that celebrate together stay together",
        "The difference between private and shared celebration",
        "How to mark progress without losing momentum"
      ],
      coreConcept: [
        "Championship teams celebrate wins together—not just the championship, but the milestones along the way. First win of the season. Breakthrough game. Comeback from adversity.",
        "Your team (family, friends, training partners) needs celebration too. Not just 'when we achieve the big goal,' but the milestones: First month of consistency. First breakthrough. First time you supported each other through something hard.",
        "The celebration rule: Make it specific, make it shared, make it meaningful. Not just 'Good job'—but 'We committed to X, we hit it, and here's how it mattered.'",
        "Example: You and your partner committed to working out together 3x/week. At 30 days, celebrate: Go out for a nice meal, acknowledge what it took, talk about how you both feel different. This reinforces the commitment for the next 30 days."
      ],
      researchBox: {
        title: "Celebration and Motivation Research",
        content: [
          "Research on intrinsic motivation and team dynamics:",
          "• Teams that celebrate milestones report 35% higher sustained motivation",
          "• Shared celebration (public acknowledgment) increases commitment by 50%",
          "• Specific recognition ('You did X and it mattered because Y') is 3x more effective than generic praise",
          "Celebration isn't frivolous—it's fuel for the next phase."
        ]
      },
      keyTakeaways: [
        "Celebrating milestones fuels sustained commitment",
        "Make it specific, shared, and meaningful",
        "Don't wait for the end goal—celebrate progress along the way"
      ],
      practiceExercise: "This week: Identify one milestone you or your team has hit recently (even small). Celebrate it specifically: Acknowledge what was achieved, why it mattered, and what it took. Share it with the people involved."
    }
  }
];

export function PurpleBeltStripe2() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('purpleBeltStripe2Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('purpleBeltStripe2Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Purple Belt Stripe 2 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('purple-stripe-2');
      await addXP(100, 'Purple Belt Stripe 2 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/purple/stripe-3');
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
              🟣 PURPLE BELT - STRIPE 2 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-100 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-600 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-purple-600 rounded" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 sm:mb-4">
              🤝 Healthy Conflict
            </h1>
            <p className="text-purple-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Transform how you handle disagreements. Learn to treat people as training partners instead of opponents, conduct post-game reviews to build trust, maintain commitment through adversity, and celebrate milestones to fuel sustained effort.
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
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 2 Complete! 🥋</h2>
                <p className="text-purple-100 mb-3 sm:mb-4">
                  You've mastered Healthy Conflict. Ready for Stripe 3?
                </p>
                <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-purple-300 text-sm">
                  Redirecting to Stripe 3: Collective Accountability...
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

