import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

const questions = [
  "I'm energized by painting a big-picture vision of what's possible",
  "I prefer to develop people through questions rather than giving answers",
  "I seek input from the team before making major decisions",
  "I lead by example and expect others to match my standards",
  "In a crisis, I make quick decisions and expect immediate execution",
  "I connect daily work to a larger mission and purpose",
  "I invest significant time in one-on-one development conversations",
  "I build consensus through collaboration and listening to all voices",
  "I set ambitious goals and get frustrated when people don't keep up",
  "When things go wrong, I take charge and issue clear directives",
  "I inspire people by helping them see possibilities they didn't know existed",
  "I celebrate when people figure things out on their own rather than being told"
];

const leadershipStyles = {
  visionary: {
    name: "Visionary Leader",
    description: "You lead through inspiration and possibility. Like Steve Jobs or Elon Musk, you see the future others can't and make people believe in it.",
    strengths: ["Inspiring", "Strategic", "Innovative", "Big-picture thinker"],
    watchOuts: ["Losing patience with details", "Moving too fast", "Leaving people behind"],
    example: "Phil Jackson (NBA) - Created a championship culture through vision, purpose, and triangle offense philosophy",
    nextSteps: [
      "Partner with detail-oriented executors to balance vision with implementation",
      "Slow down to ensure people understand the 'how,' not just the 'why'",
      "Practice celebrating small wins, not just the big vision"
    ]
  },
  coach: {
    name: "Coach Leader",
    description: "You develop people through questions and guidance. Like John Wooden or Bill Campbell, you believe growth happens when people discover answers themselves.",
    strengths: ["Develops talent", "Asks powerful questions", "Patient", "Builds capability"],
    watchOuts: ["Moving too slow when urgency is needed", "Over-coaching when people need direction"],
    example: "Gregg Popovich (Spurs) - Legendary for developing players through tough love, questions, and trust",
    nextSteps: [
      "Balance coaching with clear direction when the situation demands it",
      "Set hard deadlines to avoid analysis paralysis",
      "Know when to shift from 'guide' mode to 'decide' mode"
    ]
  },
  democratic: {
    name: "Democratic Leader",
    description: "You build buy-in through collaboration and inclusion. Like Satya Nadella, you believe the best decisions come from listening to all voices.",
    strengths: ["Inclusive", "Collaborative", "Builds trust", "Reduces blind spots"],
    watchOuts: ["Slow decision-making", "Avoiding tough calls", "Seeking approval too much"],
    example: "Pete Carroll (Seahawks) - Built championship teams through player input, collaboration, and shared leadership",
    nextSteps: [
      "Set decision deadlines to avoid endless discussion",
      "Practice making unpopular calls when needed",
      "Balance collaboration with decisive action"
    ]
  },
  pacesetting: {
    name: "Pacesetting Leader",
    description: "You lead by example and expect excellence. Like Kobe Bryant or Michael Jordan, you set the bar through your own performance.",
    strengths: ["High standards", "Leads by example", "Drives results", "Relentless"],
    watchOuts: ["Burning out your team", "Micromanaging", "Expecting everyone to work like you"],
    example: "Bill Belichick (Patriots) - Obsessive preparation, leads by example, expects everyone to 'do their job'",
    nextSteps: [
      "Communicate *why* the standard matters, not just *what* it is",
      "Recognize different people have different work styles",
      "Balance intensity with recovery and celebration"
    ]
  },
  commanding: {
    name: "Commanding Leader",
    description: "You lead through decisiveness and control. Like Vince Lombardi or General Patton, you make the tough calls and expect execution.",
    strengths: ["Decisive", "Clear direction", "Thrives in crisis", "Drives accountability"],
    watchOuts: ["Stifling creativity", "Killing morale", "Creating dependency"],
    example: "Nick Saban (Alabama) - Demands discipline, clear systems, and relentless execution. 'The Process.'",
    nextSteps: [
      "Develop others' decision-making skills—don't create dependency",
      "Balance command with collaboration in stable times",
      "Explain the 'why' behind decisions to build understanding"
    ]
  }
};

export function LeadershipStyleAssessment() {
  const navigate = useNavigate();
  const { addXP, completeModule } = useGamification();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: number[]) => {
    // Calculate scores for each style
    const scores = {
      visionary: finalAnswers[0] + finalAnswers[5] + finalAnswers[10],
      coach: finalAnswers[1] + finalAnswers[6] + finalAnswers[11],
      democratic: finalAnswers[2] + finalAnswers[7],
      pacesetting: finalAnswers[3] + finalAnswers[8],
      commanding: finalAnswers[4] + finalAnswers[9]
    };

    // Find highest score
    const maxScore = Math.max(...Object.values(scores));
    const topStyle = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'visionary';

    setResult(topStyle);
    setShowResults(true);

    // Award XP and complete module
    await addXP(150, 'Leadership Style Assessment');
    await completeModule('white-stripe-1');

    // Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && result) {
    const style = leadershipStyles[result as keyof typeof leadershipStyles];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <div className="p-8 text-center">
              <Award className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Your Leadership Style
              </h1>
              <div className="bg-purple-500/20 border-2 border-purple-500 rounded-xl p-6 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-300 mb-2">
                  {style.name}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  {style.description}
                </p>
              </div>

              {/* Strengths */}
              <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r mb-6 text-left">
                <h3 className="text-green-400 font-bold text-xl mb-3">💪 Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {style.strengths.map((strength, i) => (
                    <span key={i} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              {/* Watch Outs */}
              <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r mb-6 text-left">
                <h3 className="text-yellow-400 font-bold text-xl mb-3">⚠️ Watch Out For</h3>
                <ul className="space-y-2">
                  {style.watchOuts.map((item, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r mb-6 text-left">
                <h3 className="text-blue-400 font-bold text-xl mb-3">🏆 Famous Example</h3>
                <p className="text-slate-300">{style.example}</p>
              </div>

              {/* Next Steps */}
              <div className="bg-purple-500/10 border-l-4 border-purple-500 p-6 rounded-r mb-6 sm:mb-8 text-left">
                <h3 className="text-purple-400 font-bold text-xl mb-3">🎯 Next Steps</h3>
                <ul className="space-y-3">
                  {style.nextSteps.map((step, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-purple-400 font-bold">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* XP Badge */}
              <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold text-xl mb-6 sm:mb-8 inline-block">
                +150 XP Earned!
              </div>

              {/* Continue Journey */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-xl mb-4">Continue Your Journey</h3>
                <Button
                  onClick={() => navigate('/belt-system/white/stripe-2')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                >
                  Next Up: Stripe 2 - Emotional Intelligence
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/belt-system')}
                  className="w-full"
                >
                  Back to Belt System
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <div className="p-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full text-sm font-bold text-purple-300 mb-4">
              LEADERSHIP STYLE ASSESSMENT
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Discover Your Leadership Style
            </h1>
            <p className="text-slate-300">
              Answer these questions honestly to discover your natural leadership approach.
            </p>
          </div>
        </Card>

        {/* Progress */}
        <Card className="mb-6 sm:mb-8 bg-slate-800 border-slate-700">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-purple-400 text-sm font-semibold">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="bg-slate-700 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </Card>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 leading-relaxed">
                {questions[currentQuestion]}
              </h2>

              {/* Answer Options */}
              <div className="space-y-3">
                {[
                  { value: 1, label: 'Strongly Disagree' },
                  { value: 2, label: 'Disagree' },
                  { value: 3, label: 'Neutral' },
                  { value: 4, label: 'Agree' },
                  { value: 5, label: 'Strongly Agree' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 hover:border-purple-500 rounded-lg text-white text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/belt-system/white/stripe-1')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Stripe 1
          </button>
        </div>
      </div>
    </div>
  );
}

