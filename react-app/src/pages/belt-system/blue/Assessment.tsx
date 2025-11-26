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
    question: "Your team just wrapped a sprint planning meeting where everyone quickly agreed on an aggressive timeline. As you're leaving, you notice several engineers looking uncomfortable and whispering to each other. What should you do?",
    options: [
      "Nothing—they agreed in the meeting, so move forward with the timeline.",
      "Send a follow-up Slack asking if anyone has concerns about the timeline.",
      "Pull the team back and say 'I noticed some discomfort. Let's surface all concerns before we commit.'",
      "Talk to the uncomfortable engineers 1-on-1 to understand concerns, then bring the team back together if needed."
    ],
    correct: 2
  },
  {
    id: 2,
    question: "Your team debated two product approaches for an hour. The majority wants Option A, but you strongly believe Option B is better. The CEO is making the final call and chooses Option A. What's the best response?",
    options: [
      "Tell the CEO you disagree and will need to be convinced before you can support it.",
      "Say 'I disagree but I'll commit. Here's how I'll support Option A moving forward.'",
      "Stay quiet publicly but tell your team privately that you think it's the wrong call.",
      "Ask to revisit the decision in two weeks after you gather more data to support Option B."
    ],
    correct: 1
  },
  {
    id: 3,
    question: "During a heated design review, you notice your heart racing, your face getting hot, and a strong urge to interrupt and prove someone wrong. What's the best first step?",
    options: [
      "Take three deep breaths, acknowledge internally that you're activated, then choose your response consciously.",
      "Interrupt immediately to make your point before you forget it.",
      "Excuse yourself from the meeting to cool down completely.",
      "Push through the discomfort and stay in the debate—conflict requires staying engaged."
    ],
    correct: 0
  },
  {
    id: 4,
    question: "You're facilitating a product roadmap discussion. Three people have spoken strongly in favor of Feature X. Four people haven't said anything yet. What's the best mining technique?",
    options: [
      "Move forward—silence usually means agreement.",
      "Say 'Let's hear from people who haven't spoken yet. Jordan, what do you think?'",
      "Assign someone to play devil's advocate and argue against Feature X.",
      "Pause and say 'This consensus came quickly. What concerns might we be missing about Feature X?'"
    ],
    correct: 3
  },
  {
    id: 5,
    question: "Two team members are in a heated debate about technical architecture. One person keeps interrupting the other, and the conversation is becoming personal ('You never listen to engineers!'). How do you intervene?",
    options: [
      "Let them work it out—they're both adults and can manage conflict themselves.",
      "Say 'Let's pause. We're debating ideas, not people. What's the core technical tradeoff we're trying to solve?'",
      "End the meeting immediately and send them both an email about professional conduct.",
      "Take sides with whoever has the better technical argument to resolve the conflict quickly."
    ],
    correct: 1
  },
  {
    id: 6,
    question: "Product and Engineering are locked in disagreement about whether to prioritize new features or pay down tech debt. As the facilitator, what should you do first in the 7-step resolution process?",
    options: [
      "Ask both sides to surface their positions and debate until consensus emerges.",
      "Generate multiple options that blend both features and tech debt work.",
      "Define the decision method (who decides) and set time boundaries for the discussion.",
      "Explore the underlying interests driving each position (speed to market vs. system stability)."
    ],
    correct: 2
  },
  {
    id: 7,
    question: "A team member comes to you: 'I can't work with Sarah anymore. She's blocking all my PRs with nitpicky comments.' What's the best coaching response?",
    options: [
      "Say 'Let me talk to Sarah and tell her to ease up on the reviews.'",
      "Ask 'What do you think Sarah cares about in those reviews? What do you care about? How could you talk to her about finding a balance?'",
      "Tell them to write cleaner code so Sarah won't have as many comments.",
      "Reassign them to different projects so they don't have to work together."
    ],
    correct: 1
  },
  {
    id: 8,
    question: "The exec team must decide on layoffs (20% of staff). The CFO says it's necessary for survival. The CTO says it will kill critical projects. As CEO facilitating this, what principle matters most?",
    options: [
      "Move fast—in high-stakes conflicts, speed is essential to reduce uncertainty.",
      "Slow down to speed up—align on process (how we'll decide) before diving into content (what to decide).",
      "Take a vote so everyone feels their voice was heard equally.",
      "Bring in a neutral third-party consultant to make the decision for you."
    ],
    correct: 1
  },
  {
    id: 9,
    question: "Two engineers have different coding style preferences. One prefers functional programming, the other object-oriented. They're debating which to use. Where does this fall on the conflict continuum?",
    options: [
      "Destructive conflict—personal preferences shouldn't create disagreement.",
      "Productive conflict—they're debating technical tradeoffs that matter for code quality and maintainability.",
      "Artificial harmony—they should avoid this debate and just pick one standard.",
      "Mean-spirited conflict—they're attacking each other's competence."
    ],
    correct: 1
  },
  {
    id: 10,
    question: "You avoided giving critical feedback to an underperforming team member because you didn't want to hurt their feelings. Three months later, their work quality has declined further and they're surprised when you bring it up. What happened?",
    options: [
      "The team member should have known they were underperforming without being told.",
      "Avoidance cascade—avoiding conflict created a bigger problem (performance gap + trust damage).",
      "You gave them enough time to self-correct, which was the right approach.",
      "The team member is at fault for not asking for feedback proactively."
    ],
    correct: 1
  },
  {
    id: 11,
    question: "You're using Spar-&-Solve to debate two product directions with a colleague. You've both shared your positions and debated for 10 minutes. What comes next in the technique?",
    options: [
      "Keep debating until one person convinces the other they're right.",
      "Switch perspectives—you argue for their position, they argue for yours.",
      "Take a vote to decide which direction to pursue.",
      "End the debate and defer to whoever has more seniority."
    ],
    correct: 1
  },
  {
    id: 12,
    question: "Your team created a Conflict Norms Canvas three months ago, but no one references it anymore and people have fallen back into old patterns. What's the best fix?",
    options: [
      "The canvas didn't work—abandon it and try a different approach.",
      "Make the canvas visible in meetings and reference it when conflict happens: 'Remember we agreed to...'",
      "Remind the team about the canvas via email once a month.",
      "Blame the team for not following the norms they agreed to."
    ],
    correct: 1
  },
  {
    id: 13,
    question: "You're facilitating a conflict between a U.S. team member (direct communication culture) and a Japanese team member (indirect communication culture). The U.S. person says 'Why didn't you just say you disagreed in the meeting?' What should you do?",
    options: [
      "Tell the Japanese team member they need to adapt to U.S. norms since that's the company culture.",
      "Explain cultural differences to both, then create a hybrid process (open debate + 1-on-1 follow-ups).",
      "Tell the U.S. team member to be more sensitive and read between the lines better.",
      "Avoid addressing the cultural difference and focus only on the technical disagreement."
    ],
    correct: 1
  },
  {
    id: 14,
    question: "You strongly disagree with your manager's decision to cut QA resources. Which is the most skillful way to express disagreement?",
    options: [
      "'I disagree with cutting QA. Here's my concern: we'll ship more bugs and damage customer trust. Can we discuss alternatives?'",
      "'That's a terrible idea. Every good engineering team knows QA is essential.'",
      "Say nothing in the meeting, then complain to your team about the bad decision.",
      "'I'm not sure that will work, but you're the manager so whatever you think is best.'"
    ],
    correct: 0
  },
  {
    id: 15,
    question: "Two teammates are debating whether to refactor legacy code. One says 'You always want to over-engineer everything because you can't ship fast.' The other responds 'You always cut corners because you don't care about quality.' What type of conflict is this?",
    options: [
      "Productive conflict—they're passionately debating an important technical tradeoff.",
      "Destructive conflict—they've shifted from debating the decision to attacking character and motives.",
      "Artificial harmony—they're avoiding the real disagreement about code quality standards.",
      "Healthy debate—strong language shows they care about getting the right answer."
    ],
    correct: 1
  }
];

type Section = 'intro' | 'scenarios' | 'reflections' | 'practical' | 'results';

export function BlueBeltAssessment() {
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

    // Reflection score (simplified - in real assessment would need human review)
    const reflectionScore = 0.3; // 30% weight - assume pass if word count met

    // Practical score (simplified - keyword matching)
    let practicalScore = 0;
    const hasPreparation = /prepare|pre-work|stakeholder|align/i.test(practical);
    const hasFraming = /frame|conversation|meeting|facilitate/i.test(practical);
    const hasTechniques = /mining|7-step|conflict norm|disagree|commit/i.test(practical);
    const hasCommitment = /commit|follow.?up|accountab/i.test(practical);
    const hasMeasurement = /measure|metric|outcome|success|know if/i.test(practical);
    
    if (practicalWords >= 300 && practicalWords <= 450) practicalScore += 0.1;
    if (hasPreparation) practicalScore += 0.04;
    if (hasFraming) practicalScore += 0.04;
    if (hasTechniques) practicalScore += 0.06;
    if (hasCommitment) practicalScore += 0.04;
    if (hasMeasurement) practicalScore += 0.02;
    practicalScore = Math.min(practicalScore, 0.3); // Cap at 30%

    const total = scenarioScore + reflectionScore + practicalScore;
    const percentage = Math.round(total * 100);
    const didPass = total >= 0.80;

    setFinalScore(percentage);
    setPassed(didPass);

    if (didPass) {
      await addXP(750, '🔵 BLUE BELT ASSESSMENT PASSED! 🥋');
      
      // Mark Blue Belt progress
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.blue = 'completed';
      beltsProgress.purple = 'unlocked';
      localStorage.setItem('beltsProgress', JSON.stringify(beltsProgress));

      // Save reflections
      localStorage.setItem('blueBeltReflection1', reflection1);
      localStorage.setItem('blueBeltReflection2', reflection2);
      localStorage.setItem('blueBeltReflection3', reflection3);
      localStorage.setItem('blueBeltPractical', practical);

      // Confetti celebration
      confetti({
        particleCount: 150,
        spread: 100,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* INTRO SECTION */}
        {currentSection === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400">
              <div className="p-12 text-center">
                <div className="text-7xl mb-6">🥋🔵</div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  Blue Belt Assessment
                </h1>
                <div className="text-2xl text-blue-100 mb-6">Fear of Conflict Mastery Test</div>
                <div className="inline-block bg-white text-blue-700 px-6 py-3 rounded-full font-bold shadow-lg">
                  🔵 BLUE BELT CERTIFICATION
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-white/95 border-blue-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <div className="text-blue-900 leading-relaxed space-y-4">
                  <p>Demonstrate your mastery of productive conflict through scenarios, reflections, and practical application. This comprehensive assessment covers all 4 Blue Belt stripes: Conflict Foundations, Engagement, Facilitation, and Mastery.</p>
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-yellow-50 border-yellow-300">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-4">⚡ Assessment Requirements:</h3>
                <ul className="space-y-2 text-yellow-900">
                  <li>✦ <strong>15 Scenario Questions:</strong> Multiple-choice scenarios (40%)</li>
                  <li>✦ <strong>3 Reflective Prompts:</strong> Written reflections (30%)</li>
                  <li>✦ <strong>1 Practical Demonstration:</strong> Design a conflict facilitation intervention (30%)</li>
                  <li>✦ <strong>Passing Score:</strong> 80% to earn Blue Belt and unlock Purple Belt</li>
                  <li>✦ <strong>Reward:</strong> 750 XP upon successful completion</li>
                </ul>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setCurrentSection('scenarios')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-12 py-6 text-lg sm:text-xl font-bold shadow-2xl"
              >
                Begin Assessment 🔵
              </Button>
            </div>
          </motion.div>
        )}

        {/* SCENARIOS SECTION */}
        {currentSection === 'scenarios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 sm:mb-8 bg-white border-blue-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">Scenario Questions</h2>
                <p className="text-slate-600 mb-8">15 questions • 40% of score • Choose the best response</p>

                <div className="space-y-8">
                  {scenarios.map((scenario, index) => (
                      <div key={scenario.id} className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
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
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-slate-300 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                  isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
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
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Reflections →
                  </Button>
                  {!canProceedToReflections && (
                    <p className="text-sm text-slate-600 mt-2">Please answer all questions</p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* REFLECTIONS SECTION */}
        {currentSection === 'reflections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 sm:mb-8 bg-white border-blue-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">Reflective Prompts</h2>
                <p className="text-slate-600 mb-8">3 prompts • 30% of score • 200-300 words each</p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Reflection 1: Your Conflict Journey</h3>
                    <p className="text-slate-700 mb-4">
                      Reflect on how your relationship with conflict has changed through the Blue Belt modules. What was your biggest "aha moment" or mindset shift? How has your default response to disagreement evolved? Be specific about a concept or technique that changed how you think about conflict.
                    </p>
                    <textarea
                      value={reflection1}
                      onChange={(e) => setReflection1(e.target.value)}
                      placeholder="Share your personal journey with conflict... (200-300 words)"
                      className="w-full min-h-[200px] p-4 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <div className={`text-right text-sm mt-1 ${getWordCount(reflection1) >= 200 ? 'text-green-600' : 'text-slate-500'}`}>
                      {getWordCount(reflection1)} words
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Reflection 2: Your Most Challenging Conflict</h3>
                    <p className="text-slate-700 mb-4">
                      Describe a difficult conflict you navigated (or attempted to navigate) during or after learning Blue Belt concepts. What made it challenging? Which techniques did you use? What worked? What would you do differently now? Focus on specific behaviors and outcomes, not vague generalizations.
                    </p>
                    <textarea
                      value={reflection2}
                      onChange={(e) => setReflection2(e.target.value)}
                      placeholder="Describe your challenging conflict experience... (200-300 words)"
                      className="w-full min-h-[200px] p-4 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <div className={`text-right text-sm mt-1 ${getWordCount(reflection2) >= 200 ? 'text-green-600' : 'text-slate-500'}`}>
                      {getWordCount(reflection2)} words
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Reflection 3: Team Transformation</h3>
                    <p className="text-slate-700 mb-4">
                      How has your team's approach to conflict shifted as you've applied Blue Belt concepts? Give a concrete example of a conflict that would have played out differently six months ago versus now. What specific behaviors or norms have changed? If your team hasn't shifted yet, what's one experiment you'll run to improve conflict competence?
                    </p>
                    <textarea
                      value={reflection3}
                      onChange={(e) => setReflection3(e.target.value)}
                      placeholder="Share how your team's conflict dynamics have evolved... (200-300 words)"
                      className="w-full min-h-[200px] p-4 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <div className={`text-right text-sm mt-1 ${getWordCount(reflection3) >= 200 ? 'text-green-600' : 'text-slate-500'}`}>
                      {getWordCount(reflection3)} words
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={() => setCurrentSection('scenarios')}
                    className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={() => setCurrentSection('practical')}
                    disabled={!canProceedToPractical}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Practical →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* PRACTICAL SECTION */}
        {currentSection === 'practical' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 sm:mb-8 bg-white border-blue-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">Practical Demonstration</h2>
                <p className="text-slate-600 mb-8">1 scenario • 30% of score • 300-400 words</p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">Design a Conflict Facilitation Intervention</h3>
                  
                  <p className="text-slate-800 mb-4">
                    <strong>Scenario:</strong> You're leading a product team where Product and Engineering have been in ongoing tension for three months. Product says Engineering is too slow and always pushes back on features. Engineering says Product doesn't understand technical constraints and keeps changing requirements. The tension is now affecting team morale—people are avoiding meetings, making snarky comments in Slack, and the CEO has noticed the dysfunction.
                  </p>

                  <p className="text-slate-800 mb-3"><strong>Your Task:</strong> Design a facilitation plan to address this conflict. In 300-400 words, describe:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>How you'll prepare for the conversation (pre-work, stakeholder alignment, etc.)</li>
                    <li>How you'll frame the conversation when you bring Product and Engineering together</li>
                    <li>Which specific Blue Belt techniques you'll use and why (mining, 7-step process, conflict norms, etc.)</li>
                    <li>How you'll get concrete commitments and prevent the conflict from resurfacing</li>
                    <li>How you'll know if your intervention worked (measurable outcomes)</li>
                  </ul>
                </div>

                <textarea
                  value={practical}
                  onChange={(e) => setPractical(e.target.value)}
                  placeholder="Design your conflict facilitation plan... (300-400 words)"
                  className="w-full min-h-[300px] p-4 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <div className={`text-right text-sm mt-1 ${getWordCount(practical) >= 300 ? 'text-green-600' : 'text-slate-500'}`}>
                  {getWordCount(practical)} words
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={() => setCurrentSection('reflections')}
                    className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={submitAssessment}
                    disabled={!canSubmit}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-12 py-6 text-lg sm:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
                  >
                    Submit Assessment 🏆
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* RESULTS SECTION */}
        {currentSection === 'results' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className={`mb-6 sm:mb-8 ${passed ? 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400' : 'bg-white border-red-400'}`}>
              <div className="p-12 text-center">
                {passed ? (
                  <>
                    <Trophy className="w-32 h-32 text-white mx-auto mb-6 animate-pulse" />
                    <h1 className="text-5xl font-bold text-white mb-4">
                      BLUE BELT EARNED! 🔵
                    </h1>
                  </>
                ) : (
                  <>
                    <div className="text-7xl mb-6">📚</div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Keep Learning</h1>
                  </>
                )}
                
                <div className={`text-7xl font-bold mb-6 ${passed ? 'text-white' : 'text-red-500'}`}>
                  {finalScore}%
                </div>

                {passed ? (
                  <>
                    <Card className="mb-6 sm:mb-8 bg-white/95 border-blue-200">
                      <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                        <div className="text-5xl font-bold text-blue-700 mb-2">+750 XP</div>
                        <div className="text-slate-700 text-xl font-semibold">Blue Belt Certification Earned!</div>
                      </div>
                    </Card>

                    <div className={`leading-relaxed space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto ${passed ? 'text-white' : 'text-slate-700'}`}>
                      <p className="text-xl"><strong>🎉 Congratulations!</strong></p>
                      <p>You've demonstrated mastery of Fear of Conflict. You can now engage in productive conflict, facilitate difficult conversations, and help teams navigate disagreement constructively.</p>
                      <p className="text-lg"><strong>Purple Belt (Lack of Commitment) is now unlocked!</strong></p>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-700 leading-relaxed space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
                    <p>You scored {finalScore}%. You need 80% to pass.</p>
                    <p>Review the Blue Belt modules and focus on:</p>
                    <ul className="list-disc list-inside text-left max-w-md mx-auto">
                      <li>Scenarios where you missed questions</li>
                      <li>Key concepts like mining for disagreement</li>
                      <li>The 7-step conflict resolution process</li>
                      <li>Productive vs. destructive conflict</li>
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white hover:bg-slate-100 text-blue-700 px-8 py-4 text-lg font-bold"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Return to Dashboard
                  </Button>
                  {passed && (
                    <Button
                      onClick={() => navigate('/belt-system')}
                      className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-bold"
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      View Belt System
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {currentSection !== 'intro' && currentSection !== 'results' && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/belt-system')}
              className="text-white hover:text-blue-200 transition-colors"
            >
              ← Back to Belt System
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

