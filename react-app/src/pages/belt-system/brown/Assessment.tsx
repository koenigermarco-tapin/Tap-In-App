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
    question: "Two colleagues committed to deliver features for a launch. On launch day, one feature is done, one isn't. The person who didn't deliver says 'I hit some technical issues.' What's the accountability breakdown?",
    options: [
      "They should have worked harder—no excuses.",
      "They didn't flag the risk early—accountability means early escalation, not last-minute reveals.",
      "The technical issues were legitimate—sometimes things take longer.",
      "Their colleague should have checked in with them during the week."
    ],
    correct: 1
  },
  {
    id: 2,
    question: "You're in a 1-on-1 with someone who has been underperforming for 6 months. They start to tear up when you bring it up. What's the accountable response?",
    options: [
      "Back off—you've hurt their feelings, wait for a better time.",
      "Stay compassionate but direct: 'I can see this is hard. And it's important we talk about it. Here's what I'm seeing...'",
      "End the meeting and send them a written summary instead.",
      "Soften your feedback to make them feel better."
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Your team has an 'Accountability Hour' every week where people share: What I said I'd do, what I did, what I didn't and why. One team member never admits to missing anything—they always have an excuse. What do you do?",
    options: [
      "Call them out publicly in the next Accountability Hour.",
      "Accept their explanations—maybe they're legitimately blocked.",
      "Talk to them privately: 'I notice you rarely acknowledge misses without an external reason. Real accountability includes owning our part.'",
      "Remove them from the team—they're not accountable."
    ],
    correct: 2
  },
  {
    id: 4,
    question: "You committed to hitting a quarterly revenue target. You miss it by 15%. Your CEO asks 'What happened?' What's the accountable answer?",
    options: [
      "'Market conditions changed, our competitors dropped prices, and we had a team member leave.'",
      "'I missed the target. Here's what I own: I overestimated pipeline conversion, didn't adjust fast enough mid-quarter, and didn't allocate enough resources to top-of-funnel. Here's what I'm changing next quarter.'",
      "'The sales team didn't execute well enough.'",
      "'We almost hit it—15% miss isn't that bad in this market.'"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "Your company's values include 'Radical Accountability.' But when mistakes happen, people get defensive, blame others, or go silent. What's the core culture problem?",
    options: [
      "People don't actually value accountability despite what the poster says.",
      "There's no psychological safety—accountability without safety becomes blame culture.",
      "The consequences for mistakes are too harsh.",
      "You hired the wrong people."
    ],
    correct: 1
  },
  {
    id: 6,
    question: "Your CEO declares a feature 'urgent' and wants it shipped Friday, skipping code review. Your standard is all code gets reviewed. What's the high-accountability response?",
    options: [
      "Skip the review—CEO's request overrides standards.",
      "Push back hard: 'We never skip reviews, period.'",
      "Name the trade-off: 'To ship Friday without review risks bugs. We can do rapid review with one senior engineer or ship Monday with full review. Which do you prefer?'",
      "Have the team work all weekend to finish early so you can do full review and still hit Friday."
    ],
    correct: 2
  },
  {
    id: 7,
    question: "You notice your team's public commitment board hasn't been updated in 2 weeks. People are making vague commitments like 'I'll work on the redesign.' What does this signal?",
    options: [
      "The board tool is bad, switch to a different tool.",
      "Early culture erosion—systems are decaying and specificity is disappearing.",
      "People are too busy for the board right now.",
      "You're micromanaging, let them work how they want."
    ],
    correct: 1
  },
  {
    id: 8,
    question: "A project involving Engineering, Product, and Design fails to launch on time. Each team says they did their part but the other teams dropped the ball. What's the root accountability issue?",
    options: [
      "No single person was accountable for the whole outcome.",
      "The teams don't like each other.",
      "The deadline was unrealistic.",
      "Someone is lying about doing their part."
    ],
    correct: 0
  },
  {
    id: 9,
    question: "You committed to delivering a report by Friday. On Wednesday you realize it's going to take until Monday to do it well. What's the accountable response?",
    options: [
      "Work all weekend to hit Friday even if quality suffers.",
      "Message Wednesday: 'I committed to Friday, but I need until Monday to do this right. Does that work, or should I deliver partial version Friday?'",
      "Say nothing, miss Friday, apologize Monday.",
      "Deliver a rushed version Friday and fix it quietly next week."
    ],
    correct: 1
  },
  {
    id: 10,
    question: "Your peer leader consistently shows up late to leadership meetings. You're annoyed but haven't said anything. What's the accountability principle at play?",
    options: [
      "It's the CEO's job to address this, not yours.",
      "Peer accountability—you're avoiding having a hard conversation that's your responsibility as a peer.",
      "Being late isn't a big deal—focus on bigger issues.",
      "They probably have good reasons for being late."
    ],
    correct: 1
  },
  {
    id: 11,
    question: "You're trying to build an accountability culture but notice people focus on blaming who dropped the ball rather than solving the problem. What's missing?",
    options: [
      "Clearer consequences for failures.",
      "The distinction between accountability (owning the problem) and blame (punishing the person).",
      "Better project management tools.",
      "More experienced team members."
    ],
    correct: 1
  },
  {
    id: 12,
    question: "Your team member misses a deadline. You ask 'What happened?' They say 'I got pulled into other things.' What's your best accountability coaching response?",
    options: [
      "'Next time, say no to the other things.'",
      "'Let's dig in: What pulled you away? Did you flag that you couldn't do both? What would help you protect your commitments next time?'",
      "'That's not an acceptable excuse.'",
      "'I understand, let's just extend the deadline.'"
    ],
    correct: 1
  },
  {
    id: 13,
    question: "You lead a team that has strong individual accountability but weak collective accountability—everyone does their own work but no one feels responsible for the team's overall success. What intervention would help most?",
    options: [
      "Make individual bonuses dependent on team outcomes, not just personal performance.",
      "Fire the least collaborative person as a warning.",
      "Create a shared team scoreboard with one metric everyone owns together, and review it weekly as a group.",
      "Hire more team players next time you recruit."
    ],
    correct: 2
  },
  {
    id: 14,
    question: "What's the difference between high-accountability and high-blame cultures?",
    options: [
      "Accountability cultures punish failure. Blame cultures don't.",
      "Accountability cultures focus on owning and solving problems. Blame cultures focus on finding and punishing who caused them.",
      "There's no real difference—both create pressure to perform.",
      "Accountability cultures are for high performers. Blame cultures are for low performers."
    ],
    correct: 1
  },
  {
    id: 15,
    question: "You're about to have a hard accountability conversation with someone. You're nervous they'll get defensive. What's the best opening?",
    options: [
      "'We need to talk about your performance.'",
      "'I have some feedback that might be hard to hear.'",
      "'I want to talk about [specific situation]. My intent is to help us both get clear on what happened and what we'll do differently. Can we start with your perspective?'",
      "'You've been dropping the ball lately and we need to fix this.'"
    ],
    correct: 2
  }
];

type Section = 'intro' | 'scenarios' | 'reflections' | 'practical' | 'results';

export function BrownBeltAssessment() {
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

    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === scenarios[index].correct) {
        correct++;
      }
    });

    const scenarioScore = (correct / scenarios.length) * 0.4;
    const reflectionScore = 0.3;
    const practicalScore = 0.25;

    const total = scenarioScore + reflectionScore + practicalScore;
    const percentage = Math.round(total * 100);
    const didPass = total >= 0.80;

    setFinalScore(percentage);
    setPassed(didPass);

    if (didPass) {
      await addXP(1500, '🟤 BROWN BELT ASSESSMENT PASSED! 🥋');
      
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.brown = 'completed';
      beltsProgress.black = 'unlocked';
      localStorage.setItem('beltsProgress', JSON.stringify(beltsProgress));

      localStorage.setItem('brownBeltReflection1', reflection1);
      localStorage.setItem('brownBeltReflection2', reflection2);
      localStorage.setItem('brownBeltReflection3', reflection3);
      localStorage.setItem('brownBeltPractical', practical);

      confetti({
        particleCount: 250,
        spread: 140,
        origin: { y: 0.6 },
        colors: ['#8B4513', '#A0522D', '#CD853F']
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
    <div className="min-h-screen bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* INTRO */}
        {currentSection === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500">
              <div className="p-12 text-center">
                <div className="text-7xl mb-6">🥋🟤</div>
                <h1 className="text-5xl font-bold text-white mb-4">Brown Belt Assessment</h1>
                <div className="text-2xl text-amber-100 mb-6">Avoidance of Accountability Mastery Test</div>
                <div className="inline-block bg-white text-amber-800 px-6 py-3 rounded-full font-bold shadow-lg">
                  🟤 BROWN BELT CERTIFICATION
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-white/95 border-amber-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <p className="text-amber-900 leading-relaxed">
                  Brown Belt tests your mastery of accountability—the courage to own outcomes, have hard conversations, and hold both yourself and others to high standards with compassion.
                </p>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-yellow-50 border-yellow-300">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-4">⚡ Assessment Requirements:</h3>
                <ul className="space-y-2 text-yellow-900">
                  <li>✦ <strong>15 Scenario Questions:</strong> Accountability scenarios (40%)</li>
                  <li>✦ <strong>3 Reflective Prompts:</strong> Written reflections (30%)</li>
                  <li>✦ <strong>1 Practical Demonstration:</strong> Design an accountability system (30%)</li>
                  <li>✦ <strong>Passing Score:</strong> 80% to earn Brown Belt and unlock Black Belt</li>
                  <li>✦ <strong>Reward:</strong> 1,500 XP upon successful completion</li>
                </ul>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setCurrentSection('scenarios')}
                className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-6 text-lg sm:text-xl font-bold shadow-2xl"
              >
                Begin Assessment 🟤
              </Button>
            </div>
          </motion.div>
        )}

        {/* SCENARIOS - Following same pattern as other assessments */}
        {currentSection === 'scenarios' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="mb-6 sm:mb-8 bg-white border-amber-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6">Accountability Scenarios</h2>
                <p className="text-slate-600 mb-8">15 questions • 40% of score</p>

                <div className="space-y-8">
                  {scenarios.map((scenario, index) => (
                    <div key={scenario.id} className="bg-slate-50 p-6 rounded-lg border-l-4 border-amber-600">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
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
                                  ? 'border-amber-600 bg-amber-50' 
                                  : 'border-slate-300 bg-white hover:border-amber-400'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                isSelected ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
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
                    className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 text-lg font-bold disabled:opacity-50"
                  >
                    Continue to Reflections →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* REFLECTIONS, PRACTICAL, RESULTS follow same condensed pattern */}
        {currentSection === 'reflections' && (
          <Card className="mb-6 sm:mb-8 bg-white border-amber-200 p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6">Reflective Prompts</h2>
            
            {[
              { label: 'Your Accountability Journey', prompt: 'How has your understanding of accountability evolved? What\'s been your biggest insight?' },
              { label: 'A Hard Accountability Conversation', prompt: 'Describe a time you had (or avoided) a hard accountability conversation. What happened? What would you do differently now?' },
              { label: 'Building Accountability Culture', prompt: 'How do you balance high accountability with psychological safety? Give a concrete example from your team.' }
            ].map((item, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3">Reflection {i + 1}: {item.label}</h3>
                <p className="text-slate-700 mb-4">{item.prompt}</p>
                <textarea
                  value={[reflection1, reflection2, reflection3][i]}
                  onChange={(e) => [setReflection1, setReflection2, setReflection3][i](e.target.value)}
                  placeholder={`Reflect on ${item.label.toLowerCase()}... (200-300 words)`}
                  className="w-full min-h-[200px] p-4 border-2 border-slate-300 rounded-lg focus:border-amber-600 focus:outline-none"
                />
                <div className={`text-right text-sm mt-1 ${getWordCount([reflection1, reflection2, reflection3][i]) >= 200 ? 'text-green-600' : 'text-slate-500'}`}>
                  {getWordCount([reflection1, reflection2, reflection3][i])} words
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentSection('scenarios')} className="bg-slate-600 text-white px-6 py-3">← Back</Button>
              <Button onClick={() => setCurrentSection('practical')} disabled={!canProceedToPractical} className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-8 py-4 disabled:opacity-50">Continue to Practical →</Button>
            </div>
          </Card>
        )}

        {currentSection === 'practical' && (
          <Card className="mb-6 sm:mb-8 bg-white border-amber-200 p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6">Practical Demonstration</h2>
            
            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-lg mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-4">Design an Accountability System</h3>
              <p className="text-slate-800 mb-4">
                <strong>Scenario:</strong> Your team struggles with accountability—people miss deadlines, don't flag risks early, and get defensive when challenged. Design an accountability system (300-400 words) that includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>How you'll define clear ownership and commitments</li>
                <li>What rituals you'll implement for accountability check-ins</li>
                <li>How you'll create safety for admitting mistakes</li>
                <li>How you'll handle repeated accountability failures</li>
                <li>How you'll measure if accountability is improving</li>
              </ul>
            </div>

            <textarea
              value={practical}
              onChange={(e) => setPractical(e.target.value)}
              placeholder="Design your accountability system... (300-400 words)"
              className="w-full min-h-[300px] p-4 border-2 border-slate-300 rounded-lg focus:border-amber-600 focus:outline-none"
            />
            <div className={`text-right text-sm mt-1 ${getWordCount(practical) >= 300 ? 'text-green-600' : 'text-slate-500'}`}>
              {getWordCount(practical)} words
            </div>

            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentSection('reflections')} className="bg-slate-600 text-white px-6 py-3">← Back</Button>
              <Button onClick={submitAssessment} disabled={!canSubmit} className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-12 py-6 text-lg sm:text-xl font-bold disabled:opacity-50 shadow-2xl">
                Submit Assessment 🏆
              </Button>
            </div>
          </Card>
        )}

        {currentSection === 'results' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className={`mb-6 sm:mb-8 ${passed ? 'bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500' : 'bg-white border-red-400'}`}>
              <div className="p-12 text-center">
                {passed ? (
                  <>
                    <Trophy className="w-32 h-32 text-white mx-auto mb-6 animate-pulse" />
                    <h1 className="text-5xl font-bold text-white mb-4">BROWN BELT EARNED! 🟤</h1>
                    <div className="text-7xl font-bold mb-6 text-white">{finalScore}%</div>
                    <Card className="mb-6 sm:mb-8 bg-white/95">
                      <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                        <div className="text-5xl font-bold text-amber-800 mb-2">+1,500 XP</div>
                        <div className="text-slate-700 text-xl font-semibold">Brown Belt Certification Earned!</div>
                      </div>
                    </Card>
                    <div className="text-white leading-relaxed space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
                      <p className="text-xl"><strong>🎉 Congratulations!</strong></p>
                      <p>You've mastered accountability—the courage to own outcomes and have hard conversations. Black Belt (Mastery & Leadership) is now unlocked!</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-7xl mb-6">📚</div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Keep Learning</h1>
                    <div className="text-7xl font-bold mb-6 text-red-500">{finalScore}%</div>
                    <div className="text-slate-700">You need 80% to pass. Review Brown Belt modules.</div>
                  </>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <Button onClick={() => navigate('/dashboard')} className="bg-white hover:bg-slate-100 text-amber-800 px-8 py-4 text-lg font-bold">
                    <Home className="w-5 h-5 mr-2" />
                    Return to Dashboard
                  </Button>
                  {passed && (
                    <Button onClick={() => navigate('/belt-system')} className="bg-amber-950 hover:bg-amber-900 text-white px-8 py-4 text-lg font-bold">
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

