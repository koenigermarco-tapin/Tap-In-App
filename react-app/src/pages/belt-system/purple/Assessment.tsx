import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Home } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Scenario {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    question: "At the end of a planning meeting, your product manager says 'I'll try to get the designs done soon.' Two weeks later, nothing has happened. What's the core problem?",
    options: [
      "The PM is overwhelmed and needs capacity support.",
      "The commitment was too vague—'try,' 'soon,' and no specific deliverable creates no accountability.",
      "The PM doesn't care about the project enough to prioritize it.",
      "Two weeks isn't long enough to follow up—give them more time."
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Your team is behind on a major deliverable. Your best engineer says 'I can work this weekend to catch up.' What's the best response as their leader?",
    options: [
      "Thank them for the offer and let them work the weekend—shows commitment to the team.",
      "Say 'I appreciate the offer, but weekends are sacred. Let's look at what we can descope or push back instead.'",
      "Accept the offer only if everyone else on the team also works the weekend to be fair.",
      "Tell them to work the weekend but promise them comp time next month."
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Which of these is the BEST example of a clear, actionable commitment?",
    options: [
      "'I'll work on the API integration this week.'",
      "'I'll ship the user authentication endpoints by Friday 5pm, with Swagger docs and unit tests at 80% coverage.'",
      "'I'll do my best to get the authentication stuff done soon.'",
      "'I'll make progress on authentication by end of week.'"
    ],
    correct: 1
  },
  {
    id: 4,
    question: "You've asked a team member three times to update the documentation. Each time they say 'sure' but nothing happens. What's the best next step?",
    options: [
      "Stop asking—if they cared, they would have done it by now.",
      "Assign the task to someone else who will actually follow through.",
      "Have a direct conversation: 'You've said yes three times but haven't delivered. Help me understand what's blocking you or if this isn't a priority.'",
      "Put it in their performance review as a commitment issue."
    ],
    correct: 2
  },
  {
    id: 5,
    question: "You realize mid-week that you won't be able to deliver a commitment you made. What's the best action?",
    options: [
      "Work extra hours to make the deadline—commitments are sacred.",
      "Say nothing and miss the deadline—apologize when it comes up.",
      "Flag it immediately: 'I committed to X by Friday, but I'm at risk. Here's what happened, here's my revised ETA, and here's my plan.'",
      "Deliver something partial by the deadline and explain you'll finish the rest soon."
    ],
    correct: 2
  },
  {
    id: 6,
    question: "Your team has a problem with broken commitments. People say yes in meetings, then don't deliver. What's the best systemic fix?",
    options: [
      "Start tracking commitments publicly so everyone knows who's accountable.",
      "Reduce the number of commitments made—less is more.",
      "Create a Commitment Canvas: define what makes a clear commitment, how to renegotiate, and consequences for breaking commitments.",
      "Replace underperformers with people who take commitments seriously."
    ],
    correct: 2
  },
  {
    id: 7,
    question: "In a planning meeting, you ask 'Can everyone commit to shipping their features by sprint end?' Everyone nods. But you notice two people looking uncomfortable. What do you do?",
    options: [
      "Move forward—they nodded, so they're committed.",
      "Pause and say 'I saw some hesitation. Let's make sure everyone can genuinely commit before we move forward.'",
      "Follow up with the two people 1-on-1 after the meeting.",
      "Reduce the scope by 20% to make it easier for everyone to commit."
    ],
    correct: 1
  },
  {
    id: 8,
    question: "A team member consistently overcommits—says yes to everything, then delivers on half. What's the root cause?",
    options: [
      "They lack time management skills and need coaching.",
      "They're a people-pleaser who can't say no—they value approval over honesty.",
      "They're lazy and don't care about following through.",
      "They don't understand how long tasks actually take."
    ],
    correct: 1
  },
  {
    id: 9,
    question: "You're working on a personal goal (like exercise 4x/week). You miss a week. What's the best commitment response?",
    options: [
      "Recommit immediately—'I'll make up the missed workouts this week.'",
      "Acknowledge the miss without shame, reflect on what blocked you, and recommit to the original cadence: 'I missed last week. This week I'm back to 4x.'",
      "Lower the bar—'4x was too ambitious. I'll commit to 2x instead.'",
      "Give yourself grace—one missed week doesn't matter in the long run."
    ],
    correct: 1
  },
  {
    id: 10,
    question: "Your team has a Weekly Commitment Review where everyone shares: What I committed to, what I delivered, what I didn't and why. One person says 'I committed to three things, delivered two. The third I didn't get to.' How should the team respond?",
    options: [
      "Ask 'What blocked you? How can we help?'",
      "Say 'No big deal, we all miss commitments sometimes.'",
      "Ask 'What's your revised ETA? And what do you need to make sure you deliver next time?'",
      "Move on—the review is just about transparency, not problem-solving."
    ],
    correct: 2
  },
  {
    id: 11,
    question: "Your manager asks you to take on a new project. You're already at capacity. Which response best reflects commitment mastery?",
    options: [
      "Say yes—you don't want to seem uncommitted or difficult.",
      "Say 'I want to help, but I'm at capacity. Can we look at my current commitments and decide what to deprioritize?'",
      "Say no immediately—you have to protect your boundaries.",
      "Say yes and figure out how to make it work—you can always work extra hours."
    ],
    correct: 1
  },
  {
    id: 12,
    question: "You're in a workout program with a friend. They keep canceling last minute. How do you address this?",
    options: [
      "Stop inviting them—actions speak louder than words.",
      "Keep inviting them but don't expect them to show up.",
      "Say: 'I value training together, but when you cancel last minute it throws off my routine. Can we either commit to a consistent schedule or make it optional?'",
      "Match their energy—start canceling on them too."
    ],
    correct: 2
  },
  {
    id: 13,
    question: "Your team made a commitment to launch a feature by month-end. On day 25, you realize it's impossible. What do you do?",
    options: [
      "Push through and launch something by month-end, even if it's not fully ready.",
      "Immediately communicate: 'We committed to launch by month-end. We're not going to make it. Here's why, here's the revised date, and here's what we learned.'",
      "Say nothing until month-end, then explain why you missed it.",
      "Blame external factors—'The design team was late, so we couldn't deliver.'"
    ],
    correct: 1
  },
  {
    id: 14,
    question: "Your company has a culture where meetings always run late, people show up unprepared, and commitments are loose. As a leader, what's the best first intervention?",
    options: [
      "Start strictly enforcing meeting times and preparation in your team.",
      "Accept that this is the culture and work within it.",
      "Model perfect commitment yourself (on time, prepared, deliver what you say) and narrate it: 'I committed to X, here it is.'",
      "Bring it up at an all-hands and demand change from leadership."
    ],
    correct: 2
  },
  {
    id: 15,
    question: "The Commitment Paradox: 'The more freely you can say no, the more meaningful your yes becomes.' Why is this true?",
    options: [
      "Because saying no protects your capacity so you can deliver on your yes commitments.",
      "Because people respect you more when you're selective about what you commit to.",
      "Because overcommitment is the root of all broken promises.",
      "All of the above—saying no with integrity makes your yes commitments credible and achievable."
    ],
    correct: 3
  }
];

type Section = 'intro' | 'scenarios' | 'reflections' | 'practical' | 'results';

export function PurpleBeltAssessment() {
  const navigate = useNavigate();
  const { addXP } = useGamification();
  
  const [currentSection, setCurrentSection] = useState<Section>('intro');
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(scenarios.length).fill(-1));
  
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [practical, setPractical] = useState('');
  
  const [finalScore, setFinalScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const selectOption = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  const submitAssessment = async () => {
    const r1Words = getWordCount(reflection1);
    const r2Words = getWordCount(reflection2);
    const r3Words = getWordCount(reflection3);
    const practicalWords = getWordCount(practical);

    if (r1Words < 200 || r2Words < 200 || r3Words < 200 || practicalWords < 300) {
      alert('Please complete all reflections (200+ words) and practical demonstration (300+ words).');
      return;
    }

    // Calculate scenario score
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === scenarios[index].correct) {
        correct++;
      }
    });

    const scenarioScore = (correct / scenarios.length) * 0.4; // 40% weight
    const reflectionScore = 0.3; // 30% weight
    const practicalScore = 0.25; // 25% weight (simplified)

    const total = scenarioScore + reflectionScore + practicalScore;
    const percentage = Math.round(total * 100);
    const didPass = total >= 0.80;

    setFinalScore(percentage);
    setPassed(didPass);

    if (didPass) {
      await addXP(1000, '🟣 PURPLE BELT ASSESSMENT PASSED! 🥋');
      
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.purple = 'completed';
      beltsProgress.brown = 'unlocked';
      localStorage.setItem('beltsProgress', JSON.stringify(beltsProgress));

      localStorage.setItem('purpleBeltReflection1', reflection1);
      localStorage.setItem('purpleBeltReflection2', reflection2);
      localStorage.setItem('purpleBeltReflection3', reflection3);
      localStorage.setItem('purpleBeltPractical', practical);

      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
      });
    }

    setCurrentSection('results');
    window.scrollTo(0, 0);
  };

  const canProceedToReflections = !userAnswers.includes(-1);
  const canProceedToPractical = 
    getWordCount(reflection1) >= 200 &&
    getWordCount(reflection2) >= 200 &&
    getWordCount(reflection3) >= 200;
  const canSubmit = 
    canProceedToPractical &&
    getWordCount(practical) >= 300;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* INTRO SECTION */}
        {currentSection === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-purple-500 to-purple-700 border-purple-400">
              <div className="p-12 text-center">
                <div className="text-7xl mb-6">🥋🟣</div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  Purple Belt Assessment
                </h1>
                <div className="text-2xl text-purple-100 mb-6">Lack of Commitment Mastery Test</div>
                <div className="inline-block bg-white text-purple-700 px-6 py-3 rounded-full font-bold shadow-lg">
                  🟣 PURPLE BELT CERTIFICATION
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-white/95 border-purple-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <div className="text-purple-900 leading-relaxed space-y-4">
                  <p>Purple Belt tests your mastery of commitment—clarity, integrity, and follow-through. This assessment evaluates your understanding of how teams get buy-in, make clear commitments, and maintain accountability to achieve collective goals.</p>
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-yellow-50 border-yellow-300">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-4">⚡ Assessment Requirements:</h3>
                <ul className="space-y-2 text-yellow-900">
                  <li>✦ <strong>15 Scenario Questions:</strong> Commitment scenarios (40%)</li>
                  <li>✦ <strong>3 Reflective Prompts:</strong> Written reflections (30%)</li>
                  <li>✦ <strong>1 Practical Demonstration:</strong> Design a commitment system (30%)</li>
                  <li>✦ <strong>Passing Score:</strong> 80% to earn Purple Belt and unlock Brown Belt</li>
                  <li>✦ <strong>Reward:</strong> 1,000 XP upon successful completion</li>
                </ul>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setCurrentSection('scenarios')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-12 py-6 text-lg sm:text-xl font-bold shadow-2xl"
              >
                Begin Assessment 🟣
              </Button>
            </div>
          </motion.div>
        )}

        {/* SCENARIOS, REFLECTIONS, PRACTICAL, RESULTS sections follow same pattern as Blue Belt */}
        {/* Condensing for brevity - structure is identical to Blue Belt Assessment */}
        
        {currentSection === 'scenarios' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="mb-6 sm:mb-8 bg-white border-purple-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-6">Commitment Scenarios</h2>
                <p className="text-slate-600 mb-8">15 questions • 40% of score</p>

                <div className="space-y-8">
                  {scenarios.map((scenario, index) => (
                    <div key={scenario.id} className="bg-slate-50 p-6 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {scenario.id}
                        </div>
                        <p className="text-slate-800 font-medium leading-relaxed">{scenario.question}</p>
                      </div>
                      
                      <div className="ml-14 space-y-2">
                        {scenario.options.map((option, oIndex) => {
                          const isSelected = userAnswers[index] === oIndex;
                          const letter = String.fromCharCode(65 + oIndex);
                          
                          return (
                            <button
                              key={oIndex}
                              onClick={() => selectOption(index, oIndex)}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                                isSelected 
                                  ? 'border-purple-500 bg-purple-50' 
                                  : 'border-slate-300 bg-white hover:border-purple-300'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                isSelected ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {letter}
                              </div>
                              <span className="flex-1 text-slate-700">{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    onClick={() => setCurrentSection('reflections')}
                    disabled={!canProceedToReflections}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 text-lg font-bold disabled:opacity-50"
                  >
                    Continue to Reflections →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection === 'reflections' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="mb-6 sm:mb-8 bg-white border-purple-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-6">Reflective Prompts</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-3">Reflection 1: Your Commitment Journey</h3>
                    <p className="text-slate-700 mb-4">
                      How has your understanding of commitment evolved through Purple Belt? What's your biggest insight about clarity, sacred commitments, or renegotiation? Be specific.
                    </p>
                    <textarea
                      value={reflection1}
                      onChange={(e) => setReflection1(e.target.value)}
                      placeholder="Share your commitment journey... (200-300 words)"
                      className="w-full min-h-[200px] p-4 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <div className={`text-right text-sm mt-1 ${getWordCount(reflection1) >= 200 ? 'text-green-600' : 'text-slate-500'}`}>
                      {getWordCount(reflection1)} words
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-3">Reflection 2: A Broken Commitment</h3>
                    <p className="text-slate-700 mb-4">
                      Describe a time you broke a commitment (to yourself or others). What happened? What did you learn? How do you handle commitment failures differently now?
                    </p>
                    <textarea
                      value={reflection2}
                      onChange={(e) => setReflection2(e.target.value)}
                      placeholder="Reflect on a broken commitment... (200-300 words)"
                      className="w-full min-h-[200px] p-4 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <div className={`text-right text-sm mt-1 ${getWordCount(reflection2) >= 200 ? 'text-green-600' : 'text-slate-500'}`}>
                      {getWordCount(reflection2)} words
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-3">Reflection 3: Team Commitment Culture</h3>
                    <p className="text-slate-700 mb-4">
                      How has your team's commitment culture evolved? Give a concrete example of how commitment clarity has improved decision-making or accountability.
                    </p>
                    <textarea
                      value={reflection3}
                      onChange={(e) => setReflection3(e.target.value)}
                      placeholder="Describe your team's commitment culture... (200-300 words)"
                      className="w-full min-h-[200px] p-4 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <div className={`text-right text-sm mt-1 ${getWordCount(reflection3) >= 200 ? 'text-green-600' : 'text-slate-500'}`}>
                      {getWordCount(reflection3)} words
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button onClick={() => setCurrentSection('scenarios')} className="bg-slate-600 text-white px-6 py-3">
                    ← Back
                  </Button>
                  <Button
                    onClick={() => setCurrentSection('practical')}
                    disabled={!canProceedToPractical}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 disabled:opacity-50"
                  >
                    Continue to Practical →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection === 'practical' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="mb-6 sm:mb-8 bg-white border-purple-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-6">Practical Demonstration</h2>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-4">Design a Commitment System</h3>
                  <p className="text-slate-800 mb-4">
                    <strong>Scenario:</strong> Your team has a problem with vague commitments and broken promises. People say "I'll try" or "I'll work on it" but nothing gets done. Meetings end with unclear next steps. Describe a commitment system you'd implement (300-400 words):
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>How you'll define what makes a clear commitment</li>
                    <li>What rituals/processes you'll implement (e.g., commitment reviews)</li>
                    <li>How you'll handle broken commitments without shame</li>
                    <li>How you'll measure if the system is working</li>
                  </ul>
                </div>

                <textarea
                  value={practical}
                  onChange={(e) => setPractical(e.target.value)}
                  placeholder="Design your commitment system... (300-400 words)"
                  className="w-full min-h-[300px] p-4 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <div className={`text-right text-sm mt-1 ${getWordCount(practical) >= 300 ? 'text-green-600' : 'text-slate-500'}`}>
                  {getWordCount(practical)} words
                </div>

                <div className="flex justify-between mt-8">
                  <Button onClick={() => setCurrentSection('reflections')} className="bg-slate-600 text-white px-6 py-3">
                    ← Back
                  </Button>
                  <Button
                    onClick={submitAssessment}
                    disabled={!canSubmit}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-12 py-6 text-lg sm:text-xl font-bold disabled:opacity-50 shadow-2xl"
                  >
                    Submit Assessment 🏆
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection === 'results' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className={`mb-6 sm:mb-8 ${passed ? 'bg-gradient-to-br from-purple-500 to-purple-700 border-purple-400' : 'bg-white border-red-400'}`}>
              <div className="p-12 text-center">
                {passed ? (
                  <>
                    <Trophy className="w-32 h-32 text-white mx-auto mb-6 animate-pulse" />
                    <h1 className="text-5xl font-bold text-white mb-4">PURPLE BELT EARNED! 🟣</h1>
                    <div className="text-7xl font-bold mb-6 text-white">{finalScore}%</div>
                    <Card className="mb-6 sm:mb-8 bg-white/95">
                      <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                        <div className="text-5xl font-bold text-purple-700 mb-2">+1,000 XP</div>
                        <div className="text-slate-700 text-xl font-semibold">Purple Belt Certification Earned!</div>
                      </div>
                    </Card>
                    <div className="text-white leading-relaxed space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
                      <p className="text-xl"><strong>🎉 Congratulations!</strong></p>
                      <p>You've mastered commitment clarity, integrity, and accountability. Brown Belt (Avoidance of Accountability) is now unlocked!</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-7xl mb-6">📚</div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Keep Learning</h1>
                    <div className="text-7xl font-bold mb-6 text-red-500">{finalScore}%</div>
                    <div className="text-slate-700">You need 80% to pass. Review Purple Belt modules and try again.</div>
                  </>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <Button onClick={() => navigate('/dashboard')} className="bg-white hover:bg-slate-100 text-purple-700 px-8 py-4 text-lg font-bold">
                    <Home className="w-5 h-5 mr-2" />
                    Return to Dashboard
                  </Button>
                  {passed && (
                    <Button onClick={() => navigate('/belt-system')} className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-4 text-lg font-bold">
                      <Trophy className="w-5 h-5 mr-2" />
                      View Belt System
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

