import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Home, BookOpen } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Scenario {
  id: number;
  title: string;
  badge: string;
  context: string[];
  question: string;
  options: string[];
  correct: number;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "The Silent Standoff",
    badge: "Absence of Trust",
    context: [
      "Your leadership team has been working together for 18 months. Meetings are polite and professional. People share updates but rarely ask each other for help. When you ask team members privately what they think of each other, you get carefully diplomatic answers.",
      "Last week, two leaders had a project conflict—instead of talking to each other, they both came to you separately to 'get your perspective.'"
    ],
    question: "What is the ROOT dysfunction here?",
    options: [
      "Fear of Conflict - They need conflict training to address issues directly",
      "Absence of Trust - Without vulnerability-based trust, they can't have productive conflict",
      "Avoidance of Accountability - They should be holding each other accountable for direct communication",
      "Lack of Commitment - They need clearer decision-making processes"
    ],
    correct: 1
  },
  {
    id: 2,
    title: "The Quick Agreement",
    badge: "Fear of Conflict",
    context: [
      "Your team has strong trust—people are vulnerable, admit mistakes, and ask for help freely. But in strategy meetings, when you present a major decision, everyone nods along. You explicitly ask 'What concerns do you have?' and get surface-level questions.",
      "The meeting ends with apparent agreement. Then, over the next week, you hear through the grapevine that several leaders have serious reservations they never voiced."
    ],
    question: "What's the core issue?",
    options: [
      "Lack of Commitment - They're not truly bought in, so they're not speaking up",
      "Absence of Trust - Despite appearances, they still don't feel safe being honest",
      "Fear of Conflict - They trust you but haven't learned to engage in productive ideological debate",
      "Avoidance of Accountability - They should hold each other accountable for voicing concerns in the moment"
    ],
    correct: 2
  },
  {
    id: 3,
    title: "The Endless Debate",
    badge: "Lack of Commitment",
    context: [
      "Your team has excellent trust and healthy conflict. Meetings are passionate—people challenge ideas freely and debate vigorously. The problem: debates go in circles. You discuss the same strategic questions meeting after meeting.",
      "Even when you think you've reached a decision, someone reopens the discussion two weeks later. Leaders leave meetings energized by the debate but unclear about what was actually decided."
    ],
    question: "What dysfunction is present?",
    options: [
      "Fear of Conflict - They're actually avoiding making hard choices by staying in debate mode",
      "Avoidance of Accountability - No one is holding the team accountable to decisions",
      "Lack of Commitment - Without clarity and closure, they can't commit even after healthy debate",
      "Inattention to Results - They enjoy the debate more than they care about actual outcomes"
    ],
    correct: 2
  },
  {
    id: 4,
    title: "The Passive Observer",
    badge: "Avoidance of Accountability",
    context: [
      "Your team commits clearly to decisions. Everyone leaves meetings knowing exactly what they own and when it's due. But when someone misses a deadline or delivers subpar work, their peers say nothing.",
      "Instead, they come to you privately: 'I don't want to throw them under the bus, but...' You end up being the only one who addresses performance issues, while team members watch from the sidelines."
    ],
    question: "What's the primary dysfunction?",
    options: [
      "Absence of Trust - They don't trust each other enough to have hard conversations",
      "Lack of Commitment - They weren't truly committed to the standards, so they won't enforce them",
      "Avoidance of Accountability - They avoid peer-to-peer accountability, defaulting to leader-driven enforcement",
      "Inattention to Results - They care more about being liked than achieving team outcomes"
    ],
    correct: 2
  },
  {
    id: 5,
    title: "The Status Reports",
    badge: "Inattention to Results",
    context: [
      "Your leadership team has trust, healthy conflict, clear commitments, and holds each other accountable. But in your weekly meetings, most of the time is spent on status updates about departmental activities. Each leader shares what their team accomplished, plans for next week, and current projects.",
      "The team's collective goal—growing annual recurring revenue by 25%—is mentioned briefly at the end. When you check mid-quarter, you're only at 8% growth, but everyone has been 'busy.'"
    ],
    question: "What dysfunction has emerged?",
    options: [
      "Lack of Commitment - They're not truly committed to the 25% goal",
      "Avoidance of Accountability - No one is being held accountable for the revenue target",
      "Inattention to Results - They're focused on individual/departmental activity instead of collective outcomes",
      "Fear of Conflict - They're avoiding the difficult conversation about being off track"
    ],
    correct: 2
  },
  {
    id: 6,
    title: "The Artificial Harmony",
    badge: "Integration - Trust & Conflict",
    context: [
      "During a strategy offsite, you run a trust-building exercise where leaders share personal histories and challenges. The energy in the room shifts—people open up, laugh, and connect. You feel optimistic.",
      "But the next day, when you discuss whether to sunset an underperforming product line, the debate lasts 15 minutes before someone suggests 'we should probably study this more' and everyone agrees to table it. This is the third time you've tabled this exact discussion."
    ],
    question: "What's happening?",
    options: [
      "The trust exercise worked, but they need more time to develop conflict skills",
      "One exercise doesn't build real trust—they shared stories but not vulnerability about current weaknesses",
      "This is lack of commitment—they can't decide, so they keep delaying",
      "Inattention to results—they care more about keeping the product team happy than the business outcome"
    ],
    correct: 1
  },
  {
    id: 7,
    title: "The Nodding Problem",
    badge: "Integration - Commitment & Accountability",
    context: [
      "After healthy debate, your team makes a clear decision: shift 30% of engineering resources from feature development to technical debt for Q2. Everyone verbally agrees. You document it.",
      "Two weeks later, the VP of Engineering is still allocating resources the old way. When you ask why, they say 'I support the decision in principle, but the timing isn't right—we have customer commitments.' Other leaders nod sympathetically. No one challenges this."
    ],
    question: "What dysfunctions are at play? (Choose the BEST answer)",
    options: [
      "Only lack of commitment—the VP never truly bought in to the decision",
      "Only avoidance of accountability—peers should call out the VP for not following through",
      "Both—the VP lacked true commitment, AND peers are avoiding accountability by staying silent",
      "Inattention to results—they're prioritizing short-term feature delivery over long-term system health"
    ],
    correct: 2
  },
  {
    id: 8,
    title: "The Perfect Leader",
    badge: "Trust - Vulnerability Test",
    context: [
      "Your VP of Sales consistently hits targets, runs tight meetings, and gives polished presentations. But in leadership team meetings, they never ask for help, never admit uncertainty, and deflect any suggestion that something in their area needs improvement.",
      "When their team has a major customer churn issue, they present it as 'handled' before anyone even knew it happened. Other leaders are starting to do the same—everyone projects competence and control."
    ],
    question: "What's the core issue?",
    options: [
      "Avoidance of accountability—no one is holding them accountable for transparency",
      "Absence of trust—they're protecting their image instead of being vulnerable about weaknesses",
      "This is actually good—high performers should solve problems independently",
      "Fear of conflict—they're avoiding difficult conversations about the churn issue"
    ],
    correct: 1
  },
  {
    id: 9,
    title: "The Silent Concern",
    badge: "Conflict - Mining for Disagreement",
    context: [
      "You're presenting a major pivot in product strategy. The room is quiet as you lay out the plan. You ask 'What are your concerns?' Silence. You ask again, 'Does anyone disagree with this direction?' More silence. You move forward.",
      "Three weeks later, the CFO mentions in a 1-on-1 that they think the financial assumptions are flawed. When you ask why they didn't say this in the meeting, they respond: 'I wasn't sure. I didn't want to derail things if I was wrong.'"
    ],
    question: "What's the root problem?",
    options: [
      "Absence of trust—the CFO doesn't feel safe being wrong in front of peers",
      "Fear of conflict—you haven't created permission and expectation for real-time debate",
      "Lack of commitment—the CFO isn't committed to the strategy so they're staying quiet",
      "This is normal—not everyone has concerns to share in every meeting"
    ],
    correct: 1
  },
  {
    id: 10,
    title: "The Passive Agreement",
    badge: "Commitment - Disagree and Commit",
    context: [
      "After a vigorous 90-minute debate about entering a new market, the team is split. You have strong proponents on both sides who've made compelling cases. As CEO, you make the final call: 'We're going in. I know not everyone agrees, but this is the decision.' Leaders nod. You ask each person to verbally commit. They all say 'yes.'",
      "But over the next month, you notice the leaders who disagreed aren't allocating resources, aren't talking about the new market in their team meetings, and aren't adjusting their plans."
    ],
    question: "What's missing?",
    options: [
      "Avoidance of accountability—you need to hold them accountable for follow-through",
      "Lack of commitment—they said yes but never truly bought in to disagree and commit",
      "Fear of conflict—they're afraid to say they won't support the decision",
      "Your decision-making process was flawed—you should have built more consensus"
    ],
    correct: 1
  },
  {
    id: 11,
    title: "The Low Bar",
    badge: "Accountability - Peer Standards",
    context: [
      "Your leadership team commits to responding to critical customer issues within 4 hours. One leader consistently takes 24-48 hours. In team meetings, when you review metrics, this shows up clearly. No one says anything.",
      "After the meeting, two other leaders complain to you privately: 'It's not fair—we're busting our tails to hit 4 hours, and they're not even trying.' When you ask why they don't bring it up in the meeting, they say: 'That's your job as the boss.'"
    ],
    question: "What's the primary dysfunction?",
    options: [
      "Lack of commitment—the slow leader never truly committed to the 4-hour standard",
      "Absence of trust—they don't trust each other enough to have the hard conversation",
      "Avoidance of accountability—peers refuse to hold each other accountable, deferring to leader",
      "The 4-hour standard is unrealistic and should be adjusted"
    ],
    correct: 2
  },
  {
    id: 12,
    title: "The Busy Season",
    badge: "Results - Scoreboard Focus",
    context: [
      "Your team's primary goal is reducing time-to-hire from 45 days to 30 days. Every leader owns a piece: sourcing, screening, interviewing, decision-making. In weekly meetings, leaders report being 'slammed'—the recruiting team ran 50 phone screens, hiring managers did 30 interviews, the ops team processed 40 background checks. Everyone is working hard.",
      "But when you check the actual metric, time-to-hire is still at 44 days. No one seems bothered by this disconnect."
    ],
    question: "What's the core problem?",
    options: [
      "Lack of commitment—they're not committed to the 30-day goal, just to looking busy",
      "Avoidance of accountability—no one is calling out the lack of progress",
      "Inattention to results—they're measuring activity (screens, interviews) not outcomes (time-to-hire)",
      "The 30-day goal is too aggressive given current volume"
    ],
    correct: 2
  },
  {
    id: 13,
    title: "The Struggling Turnaround",
    badge: "Integration - All 5 Dysfunctions",
    context: [
      "You've been CEO for 6 months at a struggling company. In leadership meetings, people are polite but guarded. When you propose bold changes, leaders nod but rarely push back or build on ideas. After meetings, decisions seem clear, but execution is inconsistent—some leaders move forward, others quietly do their own thing.",
      "When you ask people to call out problems, they deflect with 'we're all doing our best.' The company's north star metric hasn't budged. Everyone points to their department's activities as evidence of progress."
    ],
    question: "If you could only fix ONE dysfunction first, which would have the most cascading impact?",
    options: [
      "Absence of Trust—nothing else works without vulnerability-based trust as the foundation",
      "Fear of Conflict—get them debating and everything else will follow",
      "Inattention to Results—make the scoreboard visible and force focus on outcomes",
      "Avoidance of Accountability—hold people accountable and the rest will improve"
    ],
    correct: 0
  },
  {
    id: 14,
    title: "The New VP",
    badge: "Integration - Cascade Effect",
    context: [
      "You hire a new VP who joins your functional leadership team. In their first month, they openly admit 'I don't know' in meetings, ask for help navigating internal politics, and share a mistake they made in their first week. Other leaders are initially surprised but start opening up more themselves.",
      "Debates get more real. Decisions get clearer. Then you notice: without you saying anything, peers start calling each other out when commitments slip."
    ],
    question: "What just happened?",
    options: [
      "One vulnerable leader modeled trust, which unlocked conflict, commitment, and accountability",
      "The new VP is just naturally more accountable than others",
      "This is temporary—the team will revert once the new VP assimilates",
      "The existing leaders were just waiting for permission to be more direct"
    ],
    correct: 0
  },
  {
    id: 15,
    title: "The Hard Call",
    badge: "Black Belt - Mastery",
    context: [
      "Your leadership team has all five elements working: high trust, healthy conflict, clear commitments, peer accountability, and results focus. You're crushing your primary metric. Then your board gives you a new aggressive target that will require massive organizational change.",
      "You bring it to the team. The room goes quiet. You can feel the resistance. Several leaders look uncomfortable. One finally speaks: 'I don't think we can do this without sacrificing quality.' Others nod."
    ],
    question: "As a Black Belt leader, what's your BEST move?",
    options: [
      "Lean into conflict—challenge them to debate if it's truly impossible or if they're just uncomfortable",
      "Get commitment—tell them the board decided, so now we need to disagree and commit",
      "Build trust first—ask each person to vulnerably share their real fear about this target",
      "Focus on results—show them the math and remind them we're a results-driven team"
    ],
    correct: 0
  }
];

type Section = 'intro' | 'scenarios' | 'reflections' | 'results';

export function BlackBeltAssessment() {
  const navigate = useNavigate();
  const { addXP } = useGamification();
  
  const [currentSection, setCurrentSection] = useState<Section>('intro');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(scenarios.length).fill(-1));
  
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  
  const [finalScore, setFinalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [passed, setPassed] = useState(false);

  const selectOption = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentScenario] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const nextScenario = () => {
    if (userAnswers[currentScenario] === -1) {
      alert('Please select an answer before continuing.');
      return;
    }

    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      window.scrollTo(0, 0);
    } else {
      setCurrentSection('reflections');
      window.scrollTo(0, 0);
    }
  };

  const previousScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1);
      window.scrollTo(0, 0);
    }
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  const submitAssessment = async () => {
    const r1Words = getWordCount(reflection1);
    const r2Words = getWordCount(reflection2);
    const r3Words = getWordCount(reflection3);

    if (r1Words < 100 || r2Words < 100 || r3Words < 100) {
      alert('Please complete all three reflections with at least 100 words each before submitting.');
      return;
    }

    // Calculate score
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === scenarios[index].correct) {
        correct++;
      }
    });

    const percentage = Math.round((correct / scenarios.length) * 100);
    const didPass = correct >= 12; // 80% = 12/15

    setCorrectCount(correct);
    setFinalScore(percentage);
    setPassed(didPass);

    if (didPass) {
      await addXP(2500, '⚫ BLACK BELT MASTERY ASSESSMENT PASSED! 🥋');
      
      // Mark Black Belt as MASTERED
      const beltsProgress = JSON.parse(localStorage.getItem('beltsProgress') || '{}');
      beltsProgress.black = 'mastered';
      localStorage.setItem('beltsProgress', JSON.stringify(beltsProgress));

      // Save reflections
      localStorage.setItem('blackBeltReflection1', reflection1);
      localStorage.setItem('blackBeltReflection2', reflection2);
      localStorage.setItem('blackBeltReflection3', reflection3);

      // EPIC confetti celebration
      const duration = 7000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 75 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }

    setCurrentSection('results');
    window.scrollTo(0, 0);
  };

  const progressPercentage = ((currentScenario + 1) / scenarios.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* INTRO SECTION */}
        {currentSection === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-black border-yellow-500/50">
              <div className="p-12 text-center">
                <div className="text-7xl mb-6">🥋⚫</div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
                  Black Belt Assessment
                </h1>
                <div className="text-2xl text-slate-400 mb-6">The 5 Dysfunctions Mastery Test</div>
                <div className="inline-block bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-3 rounded-full border-2 border-yellow-500/30 font-bold shadow-lg">
                  🏆 Final Certification Assessment
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-slate-800/50 border-slate-600">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">The Ultimate Leadership Challenge</h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>This assessment represents the culmination of your journey through The Five Dysfunctions of a Functional Team. You've studied each dysfunction individually—now it's time to demonstrate your mastery of how they integrate.</p>
                  <p><strong className="text-yellow-400">Black Belt</strong> isn't just about knowledge. It's about wisdom—the ability to diagnose complex team situations, recognize the interplay between dysfunctions, and choose the right intervention at the right time.</p>
                  <p>This assessment will test your ability to apply everything you've learned across all five dysfunctions in realistic, challenging scenarios.</p>
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50">
              <div className="p-8 text-center">
                <div className="text-6xl font-bold text-yellow-400 mb-2">2,500 XP</div>
                <div className="text-slate-300 text-lg">Highest Single Reward in the System</div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-slate-800/50 border-slate-600">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Assessment Requirements</h3>
                <ul className="space-y-3">
                  {[
                    { icon: '⚫', text: '15 Complex Scenarios - Each tests your understanding across multiple dysfunctions' },
                    { icon: '⚫', text: '80% Passing Score - You must answer at least 12 out of 15 correctly' },
                    { icon: '⚫', text: 'Integration Focus - Scenarios require you to identify root causes and understand how dysfunctions cascade' },
                    { icon: '⚫', text: '3 Reflections - Deep written reflections on your learning journey (100+ words each)' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="text-yellow-500 mt-1">{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-slate-800/50 border-slate-600">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">What You'll Be Tested On</h3>
                <div className="space-y-3 text-slate-300">
                  <p><strong className="text-white">1. Absence of Trust</strong> - Vulnerability-based trust, authenticity, psychological safety</p>
                  <p><strong className="text-blue-400">2. Fear of Conflict</strong> - Productive ideological conflict, mining for disagreement, real-time permission</p>
                  <p><strong className="text-purple-400">3. Lack of Commitment</strong> - Clarity, buy-in, cascading communication, disagree and commit</p>
                  <p><strong className="text-amber-400">4. Avoidance of Accountability</strong> - Peer-to-peer accountability, difficult conversations, standards enforcement</p>
                  <p><strong className="text-yellow-400">5. Inattention to Results</strong> - Collective outcomes over individual goals, scoreboard clarity, sacrifice for results</p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setCurrentSection('scenarios')}
                className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-500 text-slate-900 px-12 py-6 text-lg sm:text-xl font-bold shadow-2xl shadow-yellow-500/30"
              >
                Begin Assessment ⚫
              </Button>
            </div>
          </motion.div>
        )}

        {/* SCENARIOS SECTION */}
        {currentSection === 'scenarios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentScenario}
          >
            <Card className="mb-6 bg-slate-800 border-yellow-500/30">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 font-semibold">SCENARIO {currentScenario + 1} OF {scenarios.length}</span>
                  <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600">
                    {scenarios[currentScenario].badge}
                  </span>
                </div>
                <div className="bg-slate-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2 text-center">
                  Question {currentScenario + 1} of {scenarios.length}
                </p>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-slate-800/50 border-slate-600">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">{scenarios[currentScenario].title}</h3>
                
                <div className="bg-slate-700/30 border-l-4 border-slate-500 p-6 rounded-r-lg mb-6">
                  <span className="text-2xl mb-4 block">💼</span>
                  {scenarios[currentScenario].context.map((para, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed mb-4 last:mb-0">{para}</p>
                  ))}
                </div>

                <div className="bg-slate-700/20 border-2 border-slate-600 rounded-lg p-3 sm:p-4 mb-6 text-center">
                  <strong className="text-white text-lg">{scenarios[currentScenario].question}</strong>
                </div>

                <div className="space-y-3">
                  {scenarios[currentScenario].options.map((option, oIndex) => {
                    const isSelected = userAnswers[currentScenario] === oIndex;
                    
                    return (
                      <button
                        key={oIndex}
                        onClick={() => selectOption(oIndex)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-start gap-3 ${
                          isSelected 
                            ? 'border-yellow-500 bg-yellow-500/10' 
                            : 'border-slate-600 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
                        }`}
                      >
                        <span className={`font-bold ${isSelected ? 'text-yellow-400' : 'text-slate-400'}`}>
                          {String.fromCharCode(65 + oIndex)}.
                        </span>
                        <span className={`flex-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>{option}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <Button
                    onClick={previousScenario}
                    disabled={currentScenario === 0}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3"
                  >
                    ← Previous
                  </Button>
                  <Button
                    onClick={nextScenario}
                    disabled={userAnswers[currentScenario] === -1}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 px-8 py-3 font-bold"
                  >
                    {currentScenario === scenarios.length - 1 ? 'Continue to Reflections →' : 'Next →'}
                  </Button>
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
            <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-black border-yellow-500/50">
              <div className="p-8 text-center">
                <BookOpen className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Black Belt Reflections</h1>
                <p className="text-slate-400 text-lg">Demonstrate Your Mastery Through Deep Reflection</p>
              </div>
            </Card>

            <Card className="mb-6 bg-slate-800/50 border-slate-600">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Reflection 1: Your Greatest Dysfunction Challenge</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Of the five dysfunctions (Trust, Conflict, Commitment, Accountability, Results), which has been the most challenging for you personally as a leader? Describe a specific situation where this dysfunction showed up on your team, what you learned from it, and how you would handle it differently now. (Minimum 100 words)
                </p>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="Share your greatest challenge..."
                  className="w-full min-h-[150px] p-4 bg-slate-700/30 border-2 border-slate-600 rounded-lg text-slate-200 focus:border-yellow-500 focus:outline-none"
                />
                <div className={`text-right text-sm mt-1 ${getWordCount(reflection1) >= 100 ? 'text-green-400' : 'text-slate-400'}`}>
                  {getWordCount(reflection1)} / 100 words minimum
                </div>
              </div>
            </Card>

            <Card className="mb-6 bg-slate-800/50 border-slate-600">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Reflection 2: The Cascade Effect</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Explain in your own words why the dysfunctions build on each other (absence of trust leads to fear of conflict, which leads to lack of commitment, etc.). Give a real or hypothetical example of how fixing one dysfunction unlocked progress on others. What does this teach you about where to focus your energy as a leader? (Minimum 100 words)
                </p>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="Explain the cascade effect..."
                  className="w-full min-h-[150px] p-4 bg-slate-700/30 border-2 border-slate-600 rounded-lg text-slate-200 focus:border-yellow-500 focus:outline-none"
                />
                <div className={`text-right text-sm mt-1 ${getWordCount(reflection2) >= 100 ? 'text-green-400' : 'text-slate-400'}`}>
                  {getWordCount(reflection2)} / 100 words minimum
                </div>
              </div>
            </Card>

            <Card className="mb-6 sm:mb-8 bg-slate-800/50 border-slate-600">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Reflection 3: Your Black Belt Commitment</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Black Belt represents mastery—not just knowledge, but the ability to teach and develop other leaders. How will you use what you've learned to build a more functional team? What specific behaviors will you model? How will you teach these concepts to others? What legacy do you want to leave as a leader? (Minimum 100 words)
                </p>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="Share your Black Belt commitment..."
                  className="w-full min-h-[150px] p-4 bg-slate-700/30 border-2 border-slate-600 rounded-lg text-slate-200 focus:border-yellow-500 focus:outline-none"
                />
                <div className={`text-right text-sm mt-1 ${getWordCount(reflection3) >= 100 ? 'text-green-400' : 'text-slate-400'}`}>
                  {getWordCount(reflection3)} / 100 words minimum
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={submitAssessment}
                disabled={getWordCount(reflection1) < 100 || getWordCount(reflection2) < 100 || getWordCount(reflection3) < 100}
                className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-500 text-slate-900 px-12 py-6 text-lg sm:text-xl font-bold shadow-2xl shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Assessment ⚫
              </Button>
            </div>
          </motion.div>
        )}

        {/* RESULTS SECTION */}
        {currentSection === 'results' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className={`mb-6 sm:mb-8 ${passed ? 'bg-gradient-to-br from-slate-800 to-black border-yellow-500' : 'bg-slate-800/50 border-red-500/50'}`}>
              <div className="p-12 text-center">
                {passed ? (
                  <>
                    <Trophy className="w-32 h-32 text-yellow-500 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
                      BLACK BELT EARNED! ⚫
                    </h1>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-24 h-24 text-red-500 mx-auto mb-6" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Not Yet - Keep Learning</h1>
                  </>
                )}
                
                <div className={`text-7xl font-bold mb-6 ${passed ? 'text-green-500' : 'text-red-500'}`}>
                  {correctCount} / {scenarios.length}
                </div>
                
                <div className="text-2xl text-slate-300 mb-8">
                  {finalScore}% Correct
                </div>

                {passed ? (
                  <>
                    <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-400">
                      <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                        <div className="text-5xl font-bold text-slate-900 mb-2">+2,500 XP</div>
                        <div className="text-slate-900 text-xl font-semibold">Black Belt Certification Earned!</div>
                      </div>
                    </Card>

                    <div className="text-slate-300 leading-relaxed space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
                      <p className="text-xl"><strong className="text-yellow-400">🎉 Congratulations, Black Belt!</strong></p>
                      <p>You've demonstrated mastery of The Five Dysfunctions of a Functional Team. You understand not just the individual dysfunctions, but how they cascade and integrate. You're ready to build highly functional teams and teach others.</p>
                      <p className="text-lg"><strong>🏆 Complete 5 Dysfunctions Belt System Achieved</strong></p>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-300 leading-relaxed space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
                    <p><strong className="text-red-400">Black Belt requires 80% mastery (12/15 correct).</strong> You scored {correctCount}/15.</p>
                    <p>This assessment tests deep integration of all five dysfunctions. Review the material, reflect on the scenarios where you struggled, and try again when ready.</p>
                    <p className="text-sm text-slate-400">Your reflections have been saved.</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {passed ? (
                    <>
                      <Button
                        onClick={() => navigate('/dashboard')}
                        className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 px-8 py-4 text-lg font-bold"
                      >
                        <Home className="w-5 h-5 mr-2" />
                        Return to Dashboard
                      </Button>
                      <Button
                        onClick={() => navigate('/belt-system')}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 text-lg font-bold"
                      >
                        <Trophy className="w-5 h-5 mr-2" />
                        View Belt System
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setCurrentSection('intro');
                          setCurrentScenario(0);
                          setUserAnswers(new Array(scenarios.length).fill(-1));
                          setReflection1('');
                          setReflection2('');
                          setReflection3('');
                        }}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4"
                      >
                        Try Again
                      </Button>
                      <Button
                        onClick={() => navigate('/belt-system')}
                        className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-4"
                      >
                        Return to Belt System
                      </Button>
                    </>
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
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Belt System
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

