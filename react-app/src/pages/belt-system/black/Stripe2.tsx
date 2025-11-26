import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Users } from 'lucide-react';
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
    title: "The Shift from Doer to Teacher",
    description: "Why teaching others is the highest form of mastery",
    content: {
      whatYouLearn: [
        "Why you don't truly master something until you can teach it",
        "The difference between mentoring and teaching",
        "How teaching forces you to clarify your own understanding"
      ],
      coreConcept: [
        "You think you understand vulnerability-based trust. Then someone asks you to explain it, and you realize you've been operating on instinct, not clarity.",
        "Teaching forces mastery. When you have to break down a concept for someone else, you discover gaps in your own understanding. Teaching deepens learning.",
        "The shift: Beginners focus on doing. Intermediates focus on doing better. Masters focus on teaching others to do. Your impact multiplies.",
        "Sports analogy: The coach who was once a great player. The veteran who trains the rookie. The black belt who runs the dojo. Mastery isn't just about what you can do—it's about who you can develop."
      ],
      researchBox: {
        title: "Teaching and Learning Research",
        content: [
          "Research on the 'protégé effect':",
          "• Teaching content increases your own retention by 90%",
          "• Teachers develop deeper conceptual understanding than learners",
          "• The act of explaining forces clarification of fuzzy thinking",
          "The key: You don't truly know it until you can teach it."
        ]
      },
      keyTakeaways: [
        "Teaching forces mastery—explaining reveals gaps in your own understanding",
        "The shift: From doing → doing better → teaching others to do",
        "Your impact multiplies when you develop others"
      ],
      practiceExercise: "This week: Teach one concept from your journey (trust, conflict, commitment, accountability) to someone. Notice where you struggle to explain—that's where you need to deepen your own understanding."
    }
  },
  {
    id: 2,
    title: "Creating Future Leaders",
    description: "Your job is to make yourself obsolete by developing others",
    content: {
      whatYouLearn: [
        "Why great leaders measure success by who they develop, not what they achieve",
        "The 'leader of leaders' mindset",
        "How to identify and develop high-potential people"
      ],
      coreConcept: [
        "Average leaders hoard knowledge. Great leaders give it away. Your success isn't measured by what you accomplish—it's measured by who you develop.",
        "The 'leader of leaders' mindset: Your job isn't to be the best performer. It's to create more leaders. If you leave and the team collapses, you didn't build leaders—you built dependency.",
        "Identifying high-potential people: Look for curiosity (they ask questions), ownership (they take responsibility), and coachability (they act on feedback). Teach these people first—they'll multiply your impact.",
        "The ultimate test: Can you leave for 6 months and the team gets better without you? If yes, you've built leaders. If no, you've built followers."
      ],
      researchBox: {
        title: "Leadership Development Research",
        content: [
          "Research on leadership pipelines:",
          "• Organizations that invest in developing leaders have 3x higher long-term performance",
          "• Leaders who develop other leaders are rated 40% higher in effectiveness",
          "• Teams led by 'leader of leaders' have 50% higher retention and innovation",
          "The shift: From being indispensable to making yourself obsolete."
        ]
      },
      keyTakeaways: [
        "Great leaders measure success by who they develop, not what they achieve",
        "'Leader of leaders' mindset: Build capability, not dependency",
        "The test: Can the team thrive without you?"
      ],
      practiceExercise: "This week: Identify 1-2 high-potential people in your circle. Teach them something from your journey. Give them real responsibility. See if they step up."
    }
  },
  {
    id: 3,
    title: "Teaching Through Questions, Not Answers",
    description: "The Socratic method for developing critical thinking",
    content: {
      whatYouLearn: [
        "Why giving answers creates dependency; asking questions builds capability",
        "The Socratic method: Teaching through inquiry",
        "How to ask questions that develop thinking, not just compliance"
      ],
      coreConcept: [
        "When someone comes to you with a problem, your instinct is to solve it. But if you always give answers, they'll always need you. That's not teaching—that's dependency.",
        "Teaching through questions: Instead of 'Here's what you should do,' ask: 'What have you tried? What do you think is causing this? What are your options? Which one feels right?' Guide them to their own answer.",
        "The Socratic method: Don't tell—ask. Your job isn't to be the smartest person in the room. It's to make everyone else smarter by forcing them to think.",
        "Example: Your mentee asks 'How do I build trust with my team?' Don't give the answer. Ask: 'What do you think trust requires? When have you felt trusted? What did that person do?' Let them discover it."
      ],
      researchBox: {
        title: "Socratic Teaching Research",
        content: [
          "Research on inquiry-based learning:",
          "• Questions are 3x more effective than answers for developing critical thinking",
          "• Students taught through inquiry retain information 2x longer",
          "• Socratic questioning increases problem-solving ability by 40%",
          "The key: Guide discovery, don't provide solutions."
        ]
      },
      keyTakeaways: [
        "Giving answers creates dependency; asking questions builds capability",
        "Socratic method: Ask 'What do you think?' not 'Here's what to do'",
        "Your job: Make others smarter, not prove you're smart"
      ],
      practiceExercise: "This week: When someone asks you for advice, resist giving the answer. Ask 3 questions: 'What have you tried? What are your options? Which feels right?' Let them solve it."
    }
  },
  {
    id: 4,
    title: "Building Your Teaching Practice",
    description: "Creating rituals for passing on what you've learned",
    content: {
      whatYouLearn: [
        "How to structure recurring teaching moments (weekly office hours, monthly workshops)",
        "The 'see one, do one, teach one' apprenticeship model",
        "Why documenting your lessons multiplies your impact"
      ],
      coreConcept: [
        "Teaching can't be ad-hoc. It needs structure. Otherwise, you'll be too busy 'doing' to ever teach.",
        "Teaching rituals: Weekly office hours (anyone can ask questions). Monthly workshops (teach one concept in depth). Quarterly retrospectives (share what you've learned). Build teaching into your rhythm.",
        "The apprenticeship model: 1) See one (I do it, you watch). 2) Do one (You do it, I watch). 3) Teach one (You teach someone else, I coach). This is how mastery transfers.",
        "Documenting lessons: Write down what you've learned. Blog posts, videos, internal wikis. Your lessons become assets that teach even when you're not there."
      ],
      researchBox: {
        title: "Apprenticeship Research",
        content: [
          "Research on skill transfer and apprenticeship:",
          "• 'See one, do one, teach one' increases skill mastery by 60%",
          "• Documented lessons (written, video) extend teaching reach by 10x",
          "• Structured teaching rituals (weekly, monthly) are 5x more effective than ad-hoc mentoring",
          "The key: Build teaching into your cadence, not just your intentions."
        ]
      },
      keyTakeaways: [
        "Teaching needs structure—build rituals (weekly office hours, monthly workshops)",
        "'See one, do one, teach one' apprenticeship model",
        "Document lessons to multiply impact beyond 1:1 teaching"
      ],
      practiceExercise: "This week: Create one teaching ritual. Weekly office hour? Monthly workshop? Quarterly lessons-learned doc? Schedule it recurring for the next 3 months. Start teaching."
    }
  }
];

export function BlackBeltStripe2() {
  const navigate = useNavigate();
  const { completeModule, addXP } = useGamification();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('blackBeltStripe2Completed');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blackBeltStripe2Completed', JSON.stringify(completedLessons));
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

    await addXP(25, `Black Belt Stripe 2 - Lesson ${lessonId}`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (newCompleted.length === lessons.length) {
      await completeModule('black-stripe-2');
      await addXP(100, 'Black Belt Stripe 2 Complete');
      setShowCelebration(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        navigate('/belt-system/black/stripe-3');
      }, 3000);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-black border-slate-600">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-yellow-400 mb-3 sm:mb-4">
              ⚫ BLACK BELT - STRIPE 2 of 4
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded shadow-lg shadow-yellow-500/50" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-slate-700 rounded" />
              <div className="w-2 sm:w-3 h-8 sm:h-10 bg-slate-700 rounded" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 flex items-center gap-3">
              <Users className="w-10 h-10 text-yellow-500" />
              Teaching Others: Becoming a Leader of Leaders
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Transform from doer to teacher. Learn why teaching is the highest form of mastery, develop the 'leader of leaders' mindset, master the Socratic method, and build sustainable teaching practices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{completedLessons.length}</div>
                <div className="text-xs sm:text-sm text-slate-300">Lessons Done</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{completedLessons.length * 25 + (completedLessons.length === lessons.length ? 100 : 0)}</div>
                <div className="text-xs sm:text-sm text-slate-300">XP Earned</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{Math.round(progressPercentage)}%</div>
                <div className="text-xs sm:text-sm text-slate-300">Complete</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-8 bg-slate-800 border-slate-600">
          <div className="p-6">
            <h3 className="text-white font-semibold mb-3">📊 Your Progress</h3>
            <div className="bg-slate-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-slate-300 text-sm mt-2">
              {completedLessons.length} of {lessons.length} lessons completed
            </p>
          </div>
        </Card>

        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;

          return (
            <Card key={lesson.id} className="mb-6 bg-slate-800 border-slate-600 overflow-hidden">
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gradient-to-br from-slate-600 to-slate-700 text-yellow-400'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : lesson.id}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 mb-1">Lesson {lesson.id}</div>
                    <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    <p className="text-slate-300 text-sm">{lesson.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isCompleted && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Done
                    </span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-600"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          🎯 What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {lesson.content.whatYouLearn.map((item, i) => (
                            <li key={i} className="text-slate-300 flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-700/30 border-l-4 border-yellow-500 p-4 rounded-r">
                        <h4 className="text-yellow-400 font-semibold mb-3">📖 Core Concept</h4>
                        <div className="space-y-3">
                          {lesson.content.coreConcept.map((para, i) => (
                            <p key={i} className="text-slate-300 leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>

                      {lesson.content.researchBox && (
                        <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r">
                          <h4 className="text-cyan-300 font-semibold mb-3">📊 {lesson.content.researchBox.title}</h4>
                          <div className="space-y-2">
                            {lesson.content.researchBox.content.map((item, i) => (
                              <p key={i} className="text-slate-300 leading-relaxed">{item}</p>
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
                            <li key={i} className="text-slate-300 flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r">
                        <h4 className="text-green-400 font-semibold mb-2">✨ Practice Exercise</h4>
                        <p className="text-slate-300 leading-relaxed">{lesson.content.practiceExercise}</p>
                      </div>

                      <Button
                        onClick={() => completeLesson(lesson.id)}
                        disabled={isCompleted}
                        className={`w-full ${isCompleted ? 'bg-green-600' : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600'}`}
                      >
                        {isCompleted ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Completed
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Mark Complete
                            <span className="bg-slate-900 text-yellow-400 px-2 py-0.5 rounded text-sm font-bold">+25 XP</span>
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
                className="bg-gradient-to-br from-slate-800 to-black rounded-2xl p-8 max-w-md text-center border-2 border-yellow-500 shadow-2xl shadow-yellow-500/30"
              >
                <Users className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stripe 2 Complete! ⚫</h2>
                <p className="text-slate-300 mb-3 sm:mb-4">
                  You've mastered Teaching Others. Ready for Stripe 3: Leadership Philosophy?
                </p>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-6 py-3 rounded-lg font-bold text-lg mb-3 sm:mb-4">
                  +{(lessons.length * 25) + 100} XP Total!
                </div>
                <p className="text-slate-400 text-sm">
                  Redirecting to Stripe 3...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/belt-system')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Belt System
          </button>
        </div>
      </div>
    </div>
  );
}

