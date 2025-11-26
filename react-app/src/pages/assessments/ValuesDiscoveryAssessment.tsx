import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, Home, CheckCircle2 } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

const coreValues = [
  { id: 'achievement', name: 'Achievement', description: 'Accomplishing goals and seeing results' },
  { id: 'authenticity', name: 'Authenticity', description: 'Being genuine and true to yourself' },
  { id: 'autonomy', name: 'Autonomy', description: 'Having freedom and independence' },
  { id: 'balance', name: 'Balance', description: 'Maintaining harmony across life areas' },
  { id: 'compassion', name: 'Compassion', description: 'Caring for and helping others' },
  { id: 'courage', name: 'Courage', description: 'Facing challenges and taking risks' },
  { id: 'creativity', name: 'Creativity', description: 'Expressing yourself and innovating' },
  { id: 'excellence', name: 'Excellence', description: 'Pursuing high quality and mastery' },
  { id: 'fairness', name: 'Fairness', description: 'Ensuring justice and equality' },
  { id: 'family', name: 'Family', description: 'Prioritizing close relationships' },
  { id: 'freedom', name: 'Freedom', description: 'Living without constraints' },
  { id: 'growth', name: 'Growth', description: 'Continuously learning and developing' },
  { id: 'health', name: 'Health', description: 'Maintaining physical and mental wellbeing' },
  { id: 'honesty', name: 'Honesty', description: 'Being truthful and transparent' },
  { id: 'impact', name: 'Impact', description: 'Making a meaningful difference' },
  { id: 'integrity', name: 'Integrity', description: 'Aligning actions with principles' },
  { id: 'kindness', name: 'Kindness', description: 'Being considerate and caring' },
  { id: 'leadership', name: 'Leadership', description: 'Guiding and inspiring others' },
  { id: 'loyalty', name: 'Loyalty', description: 'Being faithful and committed' },
  { id: 'peace', name: 'Peace', description: 'Cultivating calm and harmony' },
  { id: 'respect', name: 'Respect', description: 'Honoring others and yourself' },
  { id: 'security', name: 'Security', description: 'Having stability and safety' },
  { id: 'service', name: 'Service', description: 'Contributing to something larger' },
  { id: 'wisdom', name: 'Wisdom', description: 'Gaining and applying knowledge' }
];

type Section = 'intro' | 'selection' | 'ranking' | 'results';

export function ValuesDiscoveryAssessment() {
  const navigate = useNavigate();
  const { addXP } = useGamification();
  
  const [currentSection, setCurrentSection] = useState<Section>('intro');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [rankedValues, setRankedValues] = useState<string[]>([]);

  const toggleValue = (valueId: string) => {
    if (selectedValues.includes(valueId)) {
      setSelectedValues(selectedValues.filter(v => v !== valueId));
    } else if (selectedValues.length < 8) {
      setSelectedValues([...selectedValues, valueId]);
    }
  };

  const moveValue = (fromIndex: number, direction: 'up' | 'down') => {
    if (direction === 'up' && fromIndex > 0) {
      const newRanked = [...rankedValues];
      [newRanked[fromIndex], newRanked[fromIndex - 1]] = [newRanked[fromIndex - 1], newRanked[fromIndex]];
      setRankedValues(newRanked);
    } else if (direction === 'down' && fromIndex < rankedValues.length - 1) {
      const newRanked = [...rankedValues];
      [newRanked[fromIndex], newRanked[fromIndex + 1]] = [newRanked[fromIndex + 1], newRanked[fromIndex]];
      setRankedValues(newRanked);
    }
  };

  const proceedToRanking = () => {
    setRankedValues(selectedValues);
    setCurrentSection('ranking');
  };

  const completeAssessment = async () => {
    await addXP(100, '💎 Values Discovery Assessment Completed!');
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
    setCurrentSection('results');
  };

  const getValueById = (id: string) => coreValues.find(v => v.id === id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* INTRO */}
        {currentSection === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-white">
              <div className="p-12 text-center">
                <Gem className="w-20 h-20 text-purple-600 mx-auto mb-6" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Values Discovery
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Identify your core values and how they guide your decisions
                </p>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg text-left mb-6 sm:mb-8 max-w-2xl mx-auto">
                  <h3 className="font-bold text-purple-900 mb-3">How This Works:</h3>
                  <ol className="space-y-2 text-slate-700 list-decimal list-inside">
                    <li><strong>Select:</strong> Choose 8 values that resonate most with you</li>
                    <li><strong>Rank:</strong> Order them from most to least important</li>
                    <li><strong>Discover:</strong> See your core values and what they mean</li>
                  </ol>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 sm:mb-8 max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600">24</div>
                    <div className="text-sm text-slate-600">Core Values</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-slate-600">To Select</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600">100</div>
                    <div className="text-sm text-slate-600">XP Reward</div>
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentSection('selection')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-12 py-6 text-lg sm:text-xl font-bold shadow-xl"
                >
                  Start Discovery
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* SELECTION */}
        {currentSection === 'selection' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-white mb-6">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Select Your Top 8 Values</h2>
                  <div className="bg-purple-100 text-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold">
                    {selectedValues.length} / 8 selected
                  </div>
                </div>
                <p className="text-slate-600 mt-2">Click on values that resonate with you</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {coreValues.map(value => {
                const isSelected = selectedValues.includes(value.id);
                const isDisabled = !isSelected && selectedValues.length >= 8;
                
                return (
                  <button
                    key={value.id}
                    onClick={() => toggleValue(value.id)}
                    disabled={isDisabled}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : isDisabled
                        ? 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                        : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-slate-900">{value.name}</h3>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-slate-600">{value.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <Button
                onClick={proceedToRanking}
                disabled={selectedValues.length !== 8}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-12 py-4 text-lg sm:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Ranking →
              </Button>
            </div>
          </motion.div>
        )}

        {/* RANKING */}
        {currentSection === 'ranking' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-white mb-6">
              <div className="p-6 border-b">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Rank Your Values</h2>
                <p className="text-slate-600 mt-2">Drag or use arrows to order from most to least important</p>
              </div>
            </Card>

            <div className="space-y-3 mb-8">
              {rankedValues.map((valueId, index) => {
                const value = getValueById(valueId);
                if (!value) return null;

                return (
                  <Card key={valueId} className="bg-white">
                    <div className="p-6 flex items-center gap-4">
                      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{value.name}</h3>
                        <p className="text-sm text-slate-600">{value.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => moveValue(index, 'up')}
                          disabled={index === 0}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 disabled:opacity-30 rounded text-slate-700 font-bold"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveValue(index, 'down')}
                          disabled={index === rankedValues.length - 1}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 disabled:opacity-30 rounded text-slate-700 font-bold"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentSection('selection')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3"
              >
                ← Back to Selection
              </Button>
              <Button
                onClick={completeAssessment}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-12 py-4 text-lg sm:text-xl font-bold"
              >
                See My Core Values 💎
              </Button>
            </div>
          </motion.div>
        )}

        {/* RESULTS */}
        {currentSection === 'results' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="bg-white">
              <div className="p-12">
                <div className="text-center mb-8">
                  <Gem className="w-20 h-20 text-purple-600 mx-auto mb-6" />
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your Core Values</h1>
                  <p className="text-lg text-slate-600">These are the principles that guide your decisions and actions</p>
                </div>

                <div className="grid gap-4 mb-8">
                  {rankedValues.slice(0, 5).map((valueId, index) => {
                    const value = getValueById(valueId);
                    if (!value) return null;

                    const colors = [
                      'from-purple-600 to-pink-600',
                      'from-purple-500 to-pink-500',
                      'from-purple-400 to-pink-400',
                      'from-purple-300 to-pink-300',
                      'from-purple-200 to-pink-200'
                    ];

                    return (
                      <div
                        key={valueId}
                        className={`bg-gradient-to-r ${colors[index]} p-6 rounded-xl ${
                          index < 2 ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                            index < 2 ? 'bg-white text-purple-600' : 'bg-slate-900 text-white'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold mb-1">{value.name}</h3>
                            <p className={index < 2 ? 'text-white/90' : 'text-slate-700'}>
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-8">
                  <h3 className="font-bold text-purple-900 mb-4">💡 How to Use Your Core Values:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✦ <strong>Decision Making:</strong> When facing tough choices, ask "Which option honors my top 3 values?"</li>
                    <li>✦ <strong>Goal Setting:</strong> Set goals that align with your core values for deeper motivation</li>
                    <li>✦ <strong>Conflict Resolution:</strong> Understand value conflicts - yours and others</li>
                    <li>✦ <strong>Career Choices:</strong> Seek roles and companies that share your values</li>
                    <li>✦ <strong>Relationships:</strong> Discuss values with partners, friends, and team members</li>
                  </ul>
                </div>

                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-900 px-6 py-4 rounded-full text-lg sm:text-xl font-bold inline-block">
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

