import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Home, CheckCircle2 } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Question {
  num: number;
  text: string;
  options: {
    label: string;
    text: string;
    style: string;
  }[];
}

const questions: Question[] = [
  {
    num: 1,
    text: "When facing a major decision, you typically:",
    options: [
      { label: "A", text: "Gather all possible data, analyze thoroughly, then decide", style: "analytical" },
      { label: "B", text: "Trust your gut feeling - you usually know the right answer", style: "intuitive" },
      { label: "C", text: "Seek input from others and build consensus", style: "collaborative" },
      { label: "D", text: "Make a quick call and adjust if needed", style: "decisive" }
    ]
  },
  {
    num: 2,
    text: "Under time pressure, you:",
    options: [
      { label: "A", text: "Get stressed - you need time to think through options", style: "analytical" },
      { label: "B", text: "Thrive - pressure clarifies what matters most", style: "decisive" },
      { label: "C", text: "Trust your instincts more than usual", style: "intuitive" },
      { label: "D", text: "Quick check-in with key stakeholders, then decide", style: "collaborative" }
    ]
  },
  {
    num: 3,
    text: "After making a decision, you:",
    options: [
      { label: "A", text: "Second-guess yourself - wonder if you missed something", style: "analytical" },
      { label: "B", text: "Move on quickly - done is better than perfect", style: "decisive" },
      { label: "C", text: "Feel confident if it aligns with your values", style: "intuitive" },
      { label: "D", text: "Feel good if the team is on board", style: "collaborative" }
    ]
  },
  {
    num: 4,
    text: "When you make a mistake, you:",
    options: [
      { label: "A", text: "Analyze what went wrong and how to prevent it next time", style: "analytical" },
      { label: "B", text: "Feel it deeply but learn and move forward", style: "intuitive" },
      { label: "C", text: "Take responsibility, apologize, and course-correct", style: "collaborative" },
      { label: "D", text: "Fix it fast and keep moving", style: "decisive" }
    ]
  },
  {
    num: 5,
    text: "You're most confident in decisions when:",
    options: [
      { label: "A", text: "You've thoroughly researched all options", style: "analytical" },
      { label: "B", text: "It feels right in your gut", style: "intuitive" },
      { label: "C", text: "The team agrees and everyone is aligned", style: "collaborative" },
      { label: "D", text: "You've made the call and started acting on it", style: "decisive" }
    ]
  },
  {
    num: 6,
    text: "When others disagree with your decision, you:",
    options: [
      { label: "A", text: "Want to understand their logic and data", style: "analytical" },
      { label: "B", text: "Listen but stay true to what feels right", style: "intuitive" },
      { label: "C", text: "Seek to find a solution everyone can support", style: "collaborative" },
      { label: "D", text: "Acknowledge their view but move forward with your call", style: "decisive" }
    ]
  },
  {
    num: 7,
    text: "Your decision-making strength is:",
    options: [
      { label: "A", text: "Thorough analysis and risk assessment", style: "analytical" },
      { label: "B", text: "Seeing patterns and reading situations intuitively", style: "intuitive" },
      { label: "C", text: "Building buy-in and ensuring team alignment", style: "collaborative" },
      { label: "D", text: "Speed and willingness to act with imperfect information", style: "decisive" }
    ]
  },
  {
    num: 8,
    text: "Your decision-making weakness is:",
    options: [
      { label: "A", text: "Analysis paralysis - overthinking delays action", style: "analytical" },
      { label: "B", text: "Ignoring data when gut says otherwise", style: "intuitive" },
      { label: "C", text: "Slow process trying to make everyone happy", style: "collaborative" },
      { label: "D", text: "Moving too fast and missing important considerations", style: "decisive" }
    ]
  }
];

const styleDescriptions = {
  analytical: {
    title: "Analytical Decision Maker",
    icon: "📊",
    description: "You value thorough research, data, and careful analysis. You minimize risk by thinking through scenarios before acting.",
    strengths: ["Thorough risk assessment", "Data-driven choices", "Well-reasoned decisions", "Minimizes errors"],
    watchouts: ["Can slow down urgent decisions", "May overthink small choices", "Risk of analysis paralysis"],
    tip: "Practice making small decisions with 80% information to build speed without sacrificing quality."
  },
  intuitive: {
    title: "Intuitive Decision Maker",
    icon: "✨",
    description: "You trust your gut, read situations well, and see patterns others miss. You make decisions based on feel and experience.",
    strengths: ["Quick pattern recognition", "Reads situations well", "Values-aligned choices", "Strong instincts"],
    watchouts: ["Can ignore contradictory data", "May struggle to explain logic", "Risk of confirmation bias"],
    tip: "Balance intuition with data - use gut to generate options, data to validate."
  },
  collaborative: {
    title: "Collaborative Decision Maker",
    icon: "🤝",
    description: "You prioritize buy-in, consensus, and team alignment. You believe better decisions come from diverse perspectives.",
    strengths: ["High team buy-in", "Diverse perspectives", "Shared ownership", "Fewer surprises"],
    watchouts: ["Can be slow in urgent situations", "May dilute strong convictions", "Risk of groupthink"],
    tip: "Define decision thresholds: when you need consensus vs. when you'll decide and communicate."
  },
  decisive: {
    title: "Decisive Decision Maker",
    icon: "⚡",
    description: "You value speed, action, and momentum. You make calls with imperfect information and course-correct as you go.",
    strengths: ["Fast execution", "Comfortable with uncertainty", "Creates momentum", "Learns by doing"],
    watchouts: ["May miss important details", "Can be hasty with big decisions", "Risk of rework"],
    tip: "Slow down on irreversible decisions - speed matters most when you can course-correct."
  }
};

type Section = 'intro' | 'assessment' | 'results';

export function DecisionMakingAssessment() {
  const navigate = useNavigate();
  const { addXP } = useGamification();
  
  const [currentSection, setCurrentSection] = useState<Section>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [primaryStyle, setPrimaryStyle] = useState<keyof typeof styleDescriptions>('analytical');

  const selectAnswer = (style: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = style;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = async () => {
    const styleCounts: Record<string, number> = {
      analytical: 0,
      intuitive: 0,
      collaborative: 0,
      decisive: 0
    };

    answers.forEach(answer => {
      if (answer) styleCounts[answer]++;
    });

    const dominantStyle = Object.entries(styleCounts).reduce((a, b) => 
      styleCounts[a[0]] > styleCounts[b[0]] ? a : b
    )[0] as keyof typeof styleDescriptions;

    setPrimaryStyle(dominantStyle);

    await addXP(100, '🧠 Decision Making Style Assessment Completed!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setCurrentSection('results');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const styleData = styleDescriptions[primaryStyle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* INTRO */}
        {currentSection === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-white">
              <div className="p-12 text-center">
                <Brain className="w-20 h-20 text-purple-600 mx-auto mb-6" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Decision Making Style
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Discover how you naturally make decisions and where your strengths lie
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {['📊 Analytical', '✨ Intuitive', '🤝 Collaborative', '⚡ Decisive'].map((style, i) => (
                    <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center">
                      <div className="text-2xl mb-1">{style.split(' ')[0]}</div>
                      <div className="text-sm font-semibold text-slate-700">{style.split(' ')[1]}</div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setCurrentSection('assessment')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-12 py-6 text-lg sm:text-xl font-bold shadow-xl"
                >
                  Start Assessment
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ASSESSMENT */}
        {currentSection === 'assessment' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={currentQuestion}>
            <Card className="bg-white mb-6">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600 font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
                </div>
                <div className="bg-purple-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">{questions[currentQuestion].text}</h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = answers[currentQuestion] === option.style;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => selectAnswer(option.style)}
                        className={`w-full p-6 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                          isSelected ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {option.label}
                        </div>
                        <div className="flex-1 text-slate-700 leading-relaxed">{option.text}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 disabled:opacity-50"
                  >
                    ← Previous
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={answers[currentQuestion] === ''}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-3 disabled:opacity-50"
                  >
                    {currentQuestion === questions.length - 1 ? 'See Results' : 'Next →'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* RESULTS */}
        {currentSection === 'results' && styleData && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="bg-white">
              <div className="p-12">
                <div className="text-center mb-8">
                  <div className="text-7xl mb-6">{styleData.icon}</div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your Decision Making Style</h1>
                  <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl sm:text-2xl font-bold shadow-lg">
                    {styleData.title}
                  </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-xl mb-8">
                  <p className="text-lg text-slate-700 leading-relaxed text-center">
                    {styleData.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <span>💪</span> Strengths
                    </h3>
                    <ul className="space-y-2">
                      {styleData.strengths.map((s, i) => (
                        <li key={i} className="text-slate-700 flex items-start gap-2">
                          <span className="text-green-600">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
                    <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                      <span>⚠️</span> Watch Outs
                    </h3>
                    <ul className="space-y-2">
                      {styleData.watchouts.map((w, i) => (
                        <li key={i} className="text-slate-700 flex items-start gap-2">
                          <span className="text-amber-600">•</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                  <h3 className="font-bold text-blue-900 mb-3">💡 Next Step:</h3>
                  <p className="text-slate-700">{styleData.tip}</p>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-900 px-6 py-4 rounded-full text-lg sm:text-xl font-bold inline-block mb-8">
                    🎉 +100 XP Earned!
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-bold"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Return to Dashboard
                  </Button>
                  <Button
                    onClick={() => navigate('/assessments')}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 text-lg font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    View All Assessments
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

