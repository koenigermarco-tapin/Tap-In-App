import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Home, CheckCircle2 } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface Question {
  num: number;
  dimension: string;
  text: string;
  options: {
    label: string;
    text: string;
    value: number;
    pole?: string;
  }[];
}

const questions: Question[] = [
  {
    num: 1,
    dimension: "directness",
    text: "When giving feedback to a colleague, you typically:",
    options: [
      { label: "A", text: "Say exactly what you think plainly and clearly", value: 4, pole: "direct" },
      { label: "B", text: "Be honest but soften the message a bit", value: 3, pole: "direct" },
      { label: "C", text: "Hint at the issue and let them figure it out", value: 2, pole: "indirect" },
      { label: "D", text: "Avoid saying anything negative if possible", value: 1, pole: "indirect" }
    ]
  },
  {
    num: 2,
    dimension: "directness",
    text: "When you disagree with someone in a meeting, you:",
    options: [
      { label: "A", text: "Voice your disagreement immediately and clearly", value: 4, pole: "direct" },
      { label: "B", text: "Ask clarifying questions to surface the issue", value: 3, pole: "direct" },
      { label: "C", text: "Bring it up privately after the meeting", value: 2, pole: "indirect" },
      { label: "D", text: "Stay quiet and hope someone else raises it", value: 1, pole: "indirect" }
    ]
  },
  {
    num: 3,
    dimension: "focus",
    text: "In a conversation, you prioritize:",
    options: [
      { label: "A", text: "Getting to the point and solving the problem", value: 4, pole: "task" },
      { label: "B", text: "Efficiency but with some warmth", value: 3, pole: "task" },
      { label: "C", text: "Connection first, then the task", value: 2, pole: "relationship" },
      { label: "D", text: "Building the relationship above all else", value: 1, pole: "relationship" }
    ]
  },
  {
    num: 4,
    dimension: "focus",
    text: "When starting a work call, you:",
    options: [
      { label: "A", text: "Dive right into the agenda", value: 4, pole: "task" },
      { label: "B", text: "Quick greeting, then get to business", value: 3, pole: "task" },
      { label: "C", text: "Check in briefly about how they're doing", value: 2, pole: "relationship" },
      { label: "D", text: "Catch up personally before any work talk", value: 1, pole: "relationship" }
    ]
  },
  {
    num: 5,
    dimension: "expression",
    text: "When you're excited about something, people:",
    options: [
      { label: "A", text: "Absolutely know it - you show it openly", value: 4, pole: "expressive" },
      { label: "B", text: "Can tell, but you're somewhat measured", value: 3, pole: "expressive" },
      { label: "C", text: "Might notice if they know you well", value: 2, pole: "reserved" },
      { label: "D", text: "Probably can't tell - you keep it internal", value: 1, pole: "reserved" }
    ]
  },
  {
    num: 6,
    dimension: "expression",
    text: "Your typical emotional range in professional settings is:",
    options: [
      { label: "A", text: "Full spectrum - people see how I feel", value: 4, pole: "expressive" },
      { label: "B", text: "Positive emotions mostly, negative ones modulated", value: 3, pole: "expressive" },
      { label: "C", text: "Even-keeled - steady and predictable", value: 2, pole: "reserved" },
      { label: "D", text: "Neutral - emotions stay private", value: 1, pole: "reserved" }
    ]
  },
  {
    num: 7,
    dimension: "structure",
    text: "You prefer meetings that are:",
    options: [
      { label: "A", text: "Tightly structured with clear agenda", value: 4, pole: "structured" },
      { label: "B", text: "Generally organized but flexible", value: 3, pole: "structured" },
      { label: "C", text: "Loose framework, go where it goes", value: 2, pole: "flexible" },
      { label: "D", text: "Freeform discussion, no rigid structure", value: 1, pole: "flexible" }
    ]
  },
  {
    num: 8,
    dimension: "structure",
    text: "When planning a project, you:",
    options: [
      { label: "A", text: "Map everything out in detail upfront", value: 4, pole: "structured" },
      { label: "B", text: "Plan major milestones, fill in details later", value: 3, pole: "structured" },
      { label: "C", text: "Rough outline, adapt as you go", value: 2, pole: "flexible" },
      { label: "D", text: "Start and figure it out along the way", value: 1, pole: "flexible" }
    ]
  }
];

type Section = 'intro' | 'assessment' | 'results';

interface StyleProfile {
  primary: string;
  directnessScore: number;
  focusScore: number;
  expressionScore: number;
  structureScore: number;
}

export function CommunicationStyleAssessment() {
  const navigate = useNavigate();
  const { addXP } = useGamification();
  
  const [currentSection, setCurrentSection] = useState<Section>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [profile, setProfile] = useState<StyleProfile | null>(null);

  const selectAnswer = (answerValue: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerValue;
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
    // Calculate dimension scores
    let directnessTotal = 0, directnessCount = 0;
    let focusTotal = 0, focusCount = 0;
    let expressionTotal = 0, expressionCount = 0;
    let structureTotal = 0, structureCount = 0;

    questions.forEach((q, index) => {
      const answer = answers[index];
      if (answer > -1) {
        switch (q.dimension) {
          case 'directness':
            directnessTotal += answer;
            directnessCount++;
            break;
          case 'focus':
            focusTotal += answer;
            focusCount++;
            break;
          case 'expression':
            expressionTotal += answer;
            expressionCount++;
            break;
          case 'structure':
            structureTotal += answer;
            structureCount++;
            break;
        }
      }
    });

    const directnessScore = directnessCount > 0 ? Math.round((directnessTotal / (directnessCount * 4)) * 100) : 50;
    const focusScore = focusCount > 0 ? Math.round((focusTotal / (focusCount * 4)) * 100) : 50;
    const expressionScore = expressionCount > 0 ? Math.round((expressionTotal / (expressionCount * 4)) * 100) : 50;
    const structureScore = structureCount > 0 ? Math.round((structureTotal / (structureCount * 4)) * 100) : 50;

    // Determine primary style
    let primary = "Balanced Communicator";
    if (directnessScore > 70 && focusScore > 70) {
      primary = "Direct Achiever";
    } else if (directnessScore < 30 && focusScore < 30) {
      primary = "Relationship Builder";
    } else if (expressionScore > 70) {
      primary = "Expressive Collaborator";
    } else if (expressionScore < 30) {
      primary = "Analytical Thinker";
    } else if (structureScore > 70) {
      primary = "Structured Organizer";
    } else if (structureScore < 30) {
      primary = "Flexible Adaptor";
    }

    setProfile({
      primary,
      directnessScore,
      focusScore,
      expressionScore,
      structureScore
    });

    await addXP(100, '💬 Communication Style Assessment Completed!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setCurrentSection('results');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* INTRO */}
        {currentSection === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-white border-blue-200">
              <div className="p-12 text-center">
                <MessageCircle className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Communication Style Assessment
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Discover how you naturally communicate and how to work better with others
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg text-left mb-8">
                  <h3 className="font-bold text-blue-900 mb-3">What You'll Discover:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✦ Your directness level (Direct ↔ Indirect)</li>
                    <li>✦ Your focus preference (Task ↔ Relationship)</li>
                    <li>✦ Your expression style (Expressive ↔ Reserved)</li>
                    <li>✦ Your structure preference (Structured ↔ Flexible)</li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-slate-600">Questions</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">4</div>
                    <div className="text-sm text-slate-600">Dimensions</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">100</div>
                    <div className="text-sm text-slate-600">XP Reward</div>
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentSection('assessment')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-12 py-6 text-lg sm:text-xl font-bold shadow-xl"
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
            <Card className="bg-white border-blue-200 mb-6">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600 font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {questions[currentQuestion].dimension}
                  </span>
                </div>
                <div className="bg-blue-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white border-blue-200">
              <div className="p-4 sm:p-6 md:p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">{questions[currentQuestion].text}</h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = answers[currentQuestion] === option.value;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => selectAnswer(option.value)}
                        className={`w-full p-6 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
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
                    disabled={answers[currentQuestion] === -1}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 disabled:opacity-50"
                  >
                    {currentQuestion === questions.length - 1 ? 'See Results' : 'Next →'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* RESULTS */}
        {currentSection === 'results' && profile && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="bg-white border-blue-200">
              <div className="p-12">
                <div className="text-center mb-8">
                  <MessageCircle className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your Communication Style</h1>
                  <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full text-xl sm:text-2xl font-bold shadow-lg">
                    {profile.primary}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { name: 'Directness', score: profile.directnessScore, low: 'Indirect', high: 'Direct' },
                    { name: 'Focus', score: profile.focusScore, low: 'Relationship', high: 'Task' },
                    { name: 'Expression', score: profile.expressionScore, low: 'Reserved', high: 'Expressive' },
                    { name: 'Structure', score: profile.structureScore, low: 'Flexible', high: 'Structured' }
                  ].map((dimension, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-3">{dimension.name}</h3>
                      <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div 
                          className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
                          style={{ width: `${dimension.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>{dimension.low}</span>
                        <span className="font-bold text-blue-600">{dimension.score}%</span>
                        <span>{dimension.high}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                  <h3 className="font-bold text-blue-900 mb-3">💡 Key Insights:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✦ Your primary style shapes how others perceive you</li>
                    <li>✦ No style is better than another - all have strengths</li>
                    <li>✦ Adapt your style to match your audience for better results</li>
                    <li>✦ Understanding your style helps prevent miscommunication</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-900 px-6 py-4 rounded-full text-lg sm:text-xl font-bold inline-block mb-8">
                    🎉 +100 XP Earned!
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold"
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

