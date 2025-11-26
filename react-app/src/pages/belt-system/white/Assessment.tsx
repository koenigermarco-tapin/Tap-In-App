import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Scenario {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    question: "A team member consistently avoids speaking up in meetings, even when they clearly have expertise on the topic being discussed.",
    options: [
      "Ignore it—some people are just quiet",
      "Call them out publicly to encourage participation",
      "Have a private conversation to understand their hesitation and create safety",
      "Assign them to present at the next meeting to force engagement"
    ],
    correct: 2,
    explanation: "Building trust with avoiders requires private conversation and creating safety, not public pressure or forcing."
  },
  {
    question: "In a meeting, two team members have a minor disagreement. Everyone else goes silent and the energy in the room shifts uncomfortably.",
    options: [
      "Change the subject to reduce tension",
      "Say: 'This is healthy—disagreement helps us make better decisions. Let's hear both perspectives.'",
      "Take the discussion offline to avoid discomfort",
      "Ask everyone to vote to resolve quickly"
    ],
    correct: 1,
    explanation: "Normalizing productive disagreement in the moment builds trust. Avoiding it signals that conflict is dangerous."
  },
  {
    question: "You made a significant mistake that affected your team's project timeline. The mistake hasn't been discovered yet.",
    options: [
      "Fix it quietly and hope no one notices",
      "Wait until someone asks about it, then explain",
      "Proactively share the mistake with your team, explain what happened, and outline your plan to address it",
      "Blame external factors to minimize personal impact"
    ],
    correct: 2,
    explanation: "Vulnerability-based trust requires proactive admission of mistakes. It's the 'vulnerability first move.'"
  },
  {
    question: "During a Personal History exercise, one team member shares something deeply personal. Another team member tries to offer advice and 'fix' the situation.",
    options: [
      "Let it happen—they're trying to help",
      "Intervene gently: 'Thank you for sharing. Let's just listen without fixing right now.'",
      "Move quickly to the next person to avoid awkwardness",
      "Ask the group if anyone else has advice to give"
    ],
    correct: 1,
    explanation: "Personal History requires listening only, no fixing. The facilitator must protect the space for vulnerability."
  },
  {
    question: "Your team completed the 360° Trust Grid and discovered that two people have asymmetric trust—Person A trusts Person B (5/5), but Person B doesn't trust Person A (2/5).",
    options: [
      "Share the results publicly to create accountability",
      "Ignore it—trust will build naturally over time",
      "Facilitate a private conversation between them to surface and address the gap",
      "Remove Person B from the team for not being a team player"
    ],
    correct: 2,
    explanation: "Trust asymmetries require facilitated private conversation to understand and repair the gap."
  },
  {
    question: "A new team member joins and immediately admits in their first meeting: 'I don't understand the technical details here—can someone explain?'",
    options: [
      "Quickly explain so they don't feel embarrassed",
      "Suggest they review documentation offline",
      "Thank them publicly for asking and provide a clear explanation, reinforcing that questions are welcome",
      "Ask if anyone else has questions to move on faster"
    ],
    correct: 2,
    explanation: "Publicly thanking vulnerability reinforces that admitting gaps is safe and valued."
  },
  {
    question: "During a Trust Vulnerability Stack exercise, one team member says 'I'll pass' on sharing their struggle in Round 3.",
    options: [
      "Pressure them gently: 'Come on, everyone else shared'",
      "Respect the pass and move to the next person without comment or pressure",
      "Ask them privately after the meeting why they didn't share",
      "Make a note to address their lack of engagement later"
    ],
    correct: 1,
    explanation: "Honoring passes without pressure is essential. Forced vulnerability destroys trust faster than silence."
  },
  {
    question: "You notice that after team meetings, people have different 'side conversations' in Slack where they share opinions they didn't voice in the meeting.",
    options: [
      "Ban side conversations to force everything into meetings",
      "Join the side conversations to stay informed",
      "Address it directly: 'I'm noticing important conversations happening after meetings. Let's create space to have them during meetings.'",
      "Ignore it—people need to vent sometimes"
    ],
    correct: 2,
    explanation: "Side conversations signal lack of safety in meetings. Address the pattern directly to build trust."
  },
  {
    question: "A team member violates confidentiality by sharing something personal that another team member disclosed during a trust exercise.",
    options: [
      "Address it privately with the violator only",
      "Ignore it to avoid further damage",
      "Have a direct conversation with the violator about impact, and potentially address it with the team to rebuild safety",
      "Remove the violator from future trust exercises"
    ],
    correct: 2,
    explanation: "Confidentiality breaches are trust ruptures that require direct addressing and potential public repair."
  },
  {
    question: "Your leader asks in a meeting: 'What's one thing I could do better?' No one responds.",
    options: [
      "Break the silence by sharing your own feedback first as a peer",
      "Say 'You're doing great!' to fill the awkward silence",
      "Suggest people send feedback privately instead",
      "Wait silently until someone speaks"
    ],
    correct: 0,
    explanation: "The vulnerability first move—modeling by going first—creates safety for others to follow."
  },
  {
    question: "During a Grip-Switch drill, one person is being overly aggressive and competitive rather than collaborative.",
    options: [
      "Let them work it out themselves",
      "Pause the exercise and remind everyone: 'This is about flow and trust, not winning. Let's reset.'",
      "Match their intensity to show them how it feels",
      "Exclude them from future physical exercises"
    ],
    correct: 1,
    explanation: "Physical trust exercises require facilitation to maintain the collaborative intent, not competitive energy."
  },
  {
    question: "Your team has built strong trust, but you're about to bring in three new team members. How do you maintain trust culture?",
    options: [
      "Expect new members to adapt to existing norms naturally",
      "Run Personal History and vulnerability exercises with the full team including new members within their first two weeks",
      "Have existing members explain the trust norms to new members",
      "Wait six months for new members to integrate before doing trust work"
    ],
    correct: 1,
    explanation: "Onboarding new members requires intentional trust-building exercises, not assumption they'll adapt naturally."
  },
  {
    question: "A team member approaches you privately with a concern about another team member's performance but asks you not to tell anyone.",
    options: [
      "Keep their confidence and address the performance issue yourself",
      "Say: 'I appreciate you sharing this. For us to address it, we need to involve the person directly. Can we do that together?'",
      "Share it with the other person but don't reveal the source",
      "Ignore it since it was shared in confidence"
    ],
    correct: 1,
    explanation: "Triangulation destroys trust. Encourage direct communication while offering support."
  },
  {
    question: "After implementing trust rituals (like weekly check-ins) for a month, some team members complain they feel 'forced' and 'performative.'",
    options: [
      "Stop the rituals—they're not working",
      "Make them optional to reduce pressure",
      "Acknowledge the feedback and ask: 'What would make this feel more genuine? Should we adjust the format?'",
      "Push through—resistance means it's working"
    ],
    correct: 2,
    explanation: "Rituals should be collaboratively designed and adjusted. Rigidity kills authenticity."
  },
  {
    question: "You're facilitating a trust repair conversation between two people. Person A says 'I'm sorry if you felt hurt.' How do you respond?",
    options: [
      "Accept it and move on",
      "Say: 'Can you try that again without the 'if'? Take responsibility for impact, not just intent.'",
      "Let it go—at least they apologized",
      "Ask Person B if they accept the apology"
    ],
    correct: 1,
    explanation: "'Sorry if you felt' deflects responsibility. Real repair requires owning impact without conditions."
  }
];

type Section = 'scenarios' | 'reflections' | 'practical' | 'results';

export function WhiteBeltAssessment() {
  const navigate = useNavigate();
  const { addXP } = useGamification();
  
  const [currentSection, setCurrentSection] = useState<Section>('scenarios');
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [showScenarioResults, setShowScenarioResults] = useState(false);
  
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

  const submitScenarios = () => {
    if (userAnswers.filter(a => a !== undefined).length < scenarios.length) {
      alert('Please answer all scenario questions before continuing.');
      return;
    }

    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === scenarios[index].correct) {
        score++;
      }
    });

    setScenarioScore(score);
    setShowScenarioResults(true);

    setTimeout(() => {
      setCurrentSection('reflections');
      window.scrollTo(0, 0);
    }, 2000);
  };

  const submitReflections = () => {
    if (!reflection1.trim() || !reflection2.trim() || !reflection3.trim()) {
      alert('Please complete all three reflective prompts before continuing.');
      return;
    }

    if (reflection1.length < 200 || reflection2.length < 200 || reflection3.length < 150) {
      alert('Please meet the minimum character count requirements for all reflections.');
      return;
    }

    setCurrentSection('practical');
    window.scrollTo(0, 0);
  };

  const submitAssessment = async () => {
    if (!practical.trim()) {
      alert('Please complete the practical demonstration before submitting.');
      return;
    }

    if (practical.length < 300) {
      alert('Please meet the minimum character count (300 characters) for your practical demonstration.');
      return;
    }

    // Calculate final score
    const scenarioPercentage = (scenarioScore / scenarios.length) * 100;
    const scenarioWeight = 0.4;
    const reflectionWeight = 0.3;
    const practicalWeight = 0.3;

    const finalScoreCalc = Math.round(
      (scenarioPercentage * scenarioWeight) + (100 * reflectionWeight) + (100 * practicalWeight)
    );
    const didPass = finalScoreCalc >= 80;

    setFinalScore(finalScoreCalc);
    setPassed(didPass);

    if (didPass) {
      await addXP(500, 'White Belt Assessment Passed!');
      
      // Mark White Belt as fully complete
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.white = 'mastered';
      localStorage.setItem('beltsProgress', JSON.stringify(beltsProgress));

      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 }
      });
    }

    setCurrentSection('results');
    window.scrollTo(0, 0);
  };

  const progressPercentage = (userAnswers.filter(a => a !== undefined).length / scenarios.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-100 to-slate-200 border-slate-400">
          <div className="p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-bold text-slate-800 mb-4 border-2 border-slate-400">
              ⚪ WHITE BELT ASSESSMENT
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              🥋 Demonstrate Your Trust Mastery
            </h1>
            <p className="text-slate-600 text-lg mb-6">
              This assessment evaluates your understanding and application of vulnerability-based trust. Pass with 80% to earn your White Belt.
            </p>

            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-600 p-6 rounded-lg text-left">
              <h3 className="text-yellow-900 font-bold mb-3">Assessment Structure</h3>
              <ul className="text-yellow-900 space-y-2">
                <li><strong>Part 1:</strong> 15 Scenario Questions (40% weight)</li>
                <li><strong>Part 2:</strong> 3 Reflective Prompts (30% weight)</li>
                <li><strong>Part 3:</strong> 1 Practical Demonstration (30% weight)</li>
                <li><strong>Passing Score:</strong> 80% overall</li>
                <li><strong>XP Reward:</strong> 500 XP + White Belt Mastery Badge</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Section 1: Scenarios */}
        {currentSection === 'scenarios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Progress Bar */}
            <Card className="mb-6 bg-slate-800 border-slate-600">
              <div className="p-4 flex items-center gap-4">
                <span className="text-slate-300 font-semibold whitespace-nowrap">
                  Question {userAnswers.filter(a => a !== undefined).length} of {scenarios.length}
                </span>
                <div className="flex-1 bg-slate-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-slate-400 to-slate-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-white">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center text-xl sm:text-2xl font-bold">
                    1
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Scenario-Based Questions</h2>
                    <p className="text-slate-600">Choose the best response for each trust-related situation</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {scenarios.map((scenario, qIndex) => (
                    <div key={qIndex} className="p-6 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                      <div className="flex gap-4 mb-4">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-bold flex-shrink-0">
                          {qIndex + 1}
                        </div>
                        <div className="flex-1">
                          <div className="bg-white p-4 rounded-lg border-l-3 border-blue-500 mb-4">
                            <div className="text-blue-700 font-semibold text-xs uppercase mb-2">Scenario</div>
                            <p className="text-slate-800">{scenario.question}</p>
                          </div>
                          
                          <div className="space-y-3">
                            {scenario.options.map((option, oIndex) => {
                              const isSelected = userAnswers[qIndex] === oIndex;
                              const isCorrect = showScenarioResults && oIndex === scenario.correct;
                              const isIncorrect = showScenarioResults && isSelected && oIndex !== scenario.correct;
                              
                              return (
                                <button
                                  key={oIndex}
                                  onClick={() => !showScenarioResults && selectOption(qIndex, oIndex)}
                                  disabled={showScenarioResults}
                                  className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-start gap-3 ${
                                    isCorrect ? 'border-green-500 bg-green-50' :
                                    isIncorrect ? 'border-red-500 bg-red-50' :
                                    isSelected ? 'border-purple-500 bg-purple-50' :
                                    'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50'
                                  } ${showScenarioResults ? 'cursor-default' : 'cursor-pointer'}`}
                                >
                                  <span className={`font-bold ${
                                    isCorrect ? 'text-green-600' :
                                    isIncorrect ? 'text-red-600' :
                                    'text-purple-600'
                                  }`}>
                                    {String.fromCharCode(65 + oIndex)}.
                                  </span>
                                  <span className="flex-1 text-slate-700">{option}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    onClick={submitScenarios}
                    disabled={showScenarioResults || userAnswers.filter(a => a !== undefined).length < scenarios.length}
                    className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white px-8 py-4"
                  >
                    Submit Scenario Answers →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Section 2: Reflections */}
        {currentSection === 'reflections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="mb-6 sm:mb-8 bg-white">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center text-xl sm:text-2xl font-bold">
                    2
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Reflective Prompts</h2>
                    <p className="text-slate-600">Share your personal journey and insights</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Prompt 1 */}
                  <div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-4">
                      <div className="text-blue-700 font-bold text-sm mb-2">Prompt 1: Your Trust Journey</div>
                      <p className="text-slate-800 mb-3">
                        Describe how your understanding of trust has evolved through White Belt. What did you believe about vulnerability before? What do you believe now? What remains challenging?
                      </p>
                      <div className="text-slate-600 text-sm italic">Write 200-300 characters</div>
                    </div>
                    <textarea
                      value={reflection1}
                      onChange={(e) => setReflection1(e.target.value)}
                      placeholder="Share your trust journey..."
                      className="w-full min-h-[150px] p-4 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <div className="text-right text-sm text-slate-500 mt-1">{reflection1.length} characters</div>
                  </div>

                  {/* Prompt 2 */}
                  <div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-4">
                      <div className="text-blue-700 font-bold text-sm mb-2">Prompt 2: Your Most Significant Practice</div>
                      <p className="text-slate-800 mb-3">
                        Describe the most impactful practice exercise you completed during White Belt. What happened? What did you learn about yourself or your team?
                      </p>
                      <div className="text-slate-600 text-sm italic">Write 200-300 characters</div>
                    </div>
                    <textarea
                      value={reflection2}
                      onChange={(e) => setReflection2(e.target.value)}
                      placeholder="Describe your practice experience..."
                      className="w-full min-h-[150px] p-4 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <div className="text-right text-sm text-slate-500 mt-1">{reflection2.length} characters</div>
                  </div>

                  {/* Prompt 3 */}
                  <div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-4">
                      <div className="text-blue-700 font-bold text-sm mb-2">Prompt 3: Your Team's Evolution</div>
                      <p className="text-slate-800 mb-3">
                        How has trust shown up differently in your team since you started White Belt? What specific changes have you observed? What work remains?
                      </p>
                      <div className="text-slate-600 text-sm italic">Write 150-200 characters</div>
                    </div>
                    <textarea
                      value={reflection3}
                      onChange={(e) => setReflection3(e.target.value)}
                      placeholder="Describe your team's changes..."
                      className="w-full min-h-[150px] p-4 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <div className="text-right text-sm text-slate-500 mt-1">{reflection3.length} characters</div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <Button
                    onClick={() => setCurrentSection('scenarios')}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={submitReflections}
                    className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white px-8 py-3"
                  >
                    Continue to Practical Demonstration →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Section 3: Practical */}
        {currentSection === 'practical' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="mb-6 sm:mb-8 bg-white">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center text-xl sm:text-2xl font-bold">
                    3
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Practical Demonstration</h2>
                    <p className="text-slate-600">Describe a real trust-building intervention you've implemented</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                  <div className="text-blue-700 font-bold text-sm mb-3">Practical Demonstration Requirements</div>
                  <p className="text-slate-800 mb-4">
                    Describe a real trust-building exercise, intervention, or practice you implemented with your team or in your leadership. Include:
                  </p>
                  <ul className="text-slate-800 space-y-2 ml-5 list-disc mb-4">
                    <li><strong>The context:</strong> What was the trust challenge or opportunity?</li>
                    <li><strong>Your approach:</strong> What technique(s) did you use and why?</li>
                    <li><strong>The implementation:</strong> How did you facilitate it?</li>
                    <li><strong>The outcomes:</strong> What happened? How did people respond?</li>
                    <li><strong>Your learnings:</strong> What worked? What would you do differently?</li>
                  </ul>
                  <div className="text-slate-600 text-sm italic">Write 300-400 characters</div>
                </div>

                <textarea
                  value={practical}
                  onChange={(e) => setPractical(e.target.value)}
                  placeholder="Describe your trust-building intervention..."
                  className="w-full min-h-[250px] p-4 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <div className="text-right text-sm text-slate-500 mt-1">{practical.length} characters</div>

                <div className="mt-8 flex justify-center gap-4">
                  <Button
                    onClick={() => setCurrentSection('reflections')}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={submitAssessment}
                    className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white px-8 py-3"
                  >
                    Submit Assessment 🏆
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Section 4: Results */}
        {currentSection === 'results' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="mb-6 sm:mb-8 bg-white text-center">
              <div className="p-12">
                <div className="text-7xl mb-6">
                  {passed ? '🏆' : '📚'}
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  {passed ? 'White Belt Earned!' : 'Not Yet—Keep Learning'}
                </h2>
                
                <div className={`text-6xl font-bold mb-6 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {finalScore}%
                </div>
                
                <p className="text-slate-600 text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {passed 
                    ? "Congratulations! You've demonstrated mastery of vulnerability-based trust. Your White Belt has been awarded, and you've earned 500 XP."
                    : "You scored below 80%. Review the lessons where you struggled and try again. Mastery takes practice."}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">{scenarioScore}/{scenarios.length}</div>
                    <div className="text-sm text-slate-600">Scenarios Correct</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">✓</div>
                    <div className="text-sm text-slate-600">Reflections Complete</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">✓</div>
                    <div className="text-sm text-slate-600">Demonstration Complete</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">{passed ? '+500' : '0'} XP</div>
                    <div className="text-sm text-slate-600">Bonus Awarded</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg text-left mb-8">
                  <h3 className="text-yellow-900 font-bold mb-3">📊 Your Performance</h3>
                  <ul className="text-yellow-900 space-y-2">
                    {(scenarioScore / scenarios.length) * 100 >= 80 ? (
                      <li>✅ <strong>Scenarios:</strong> Excellent understanding of trust situations</li>
                    ) : (scenarioScore / scenarios.length) * 100 >= 60 ? (
                      <li>⚠️ <strong>Scenarios:</strong> Review lessons on trust-building techniques and repair</li>
                    ) : (
                      <li>❌ <strong>Scenarios:</strong> Revisit all lessons and practice exercises</li>
                    )}
                    <li>✅ <strong>Reflections:</strong> Thoughtful self-awareness demonstrated</li>
                    <li>✅ <strong>Practical:</strong> Real-world application described</li>
                    {!passed && (
                      <li>📖 <strong>Recommendation:</strong> Focus on scenarios where you struggled. Re-read those lessons and try the practice exercises again before retaking.</li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => navigate('/belt-system')}
                    className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white px-8 py-4"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Return to Belt System
                  </Button>
                  {passed && (
                    <Button
                      onClick={() => navigate('/belt-system/blue/stripe-1')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                    >
                      Start Blue Belt →
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

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

