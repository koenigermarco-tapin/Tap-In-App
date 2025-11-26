import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  category: string;
  href: string;
}

const tools: Tool[] = [
  // Quick Exercises
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    description: 'Calm your nervous system with this simple 4-4-4-4 breathing technique',
    icon: '🌬️',
    duration: '4 min',
    category: 'Quick Exercises',
    href: '/open-mat/box-breathing',
  },
  {
    id: 'morning-routine',
    title: '5-Minute Morning Routine',
    description: 'Start your day with intention and energy',
    icon: '🌅',
    duration: '5 min',
    category: 'Quick Exercises',
    href: '/open-mat/morning-routine',
  },
  // Audits & Reviews
  {
    id: 'energy-audit',
    title: 'Energy Audit',
    description: 'Map your energy throughout the day to optimize performance',
    icon: '⚡',
    duration: '10 min',
    category: 'Audits & Reviews',
    href: '/open-mat/energy-audit',
  },
  {
    id: 'weekly-review',
    title: 'Weekly Review',
    description: 'Reflect on your week and plan for the next one',
    icon: '📋',
    duration: '15 min',
    category: 'Audits & Reviews',
    href: '/open-mat/weekly-review',
  },
  // Decision Tools
  {
    id: 'decision-framework',
    title: 'Decision Framework',
    description: 'Make better decisions with structured thinking',
    icon: '🎯',
    duration: '10-15 min',
    category: 'Decision Tools',
    href: '/open-mat/decision-framework',
  },
  // Leadership Practice
  {
    id: 'inner-game',
    title: 'Inner Game of Leadership',
    description: 'Develop your internal leadership mindset',
    icon: '🧠',
    duration: '15 min',
    category: 'Leadership Practice',
    href: '/open-mat/inner-game',
  },
];

const categories = [...new Set(tools.map((t) => t.category))];

export function OpenMat() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-5xl mb-4 block">🛠️</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Open Mat</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Practical tools and exercises for everyday leadership development.
          Pick any tool and start practicing.
        </p>
      </motion.div>

      {/* Categories */}
      {categories.map((category, categoryIndex) => {
        const categoryTools = tools.filter((t) => t.category === category);

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + categoryIndex * 0.1 }}
            className="mb-10"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              {category}
            </h2>

            <div className="grid gap-4">
              {categoryTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link to={tool.href}>
                    <Card hover className="group">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-3xl group-hover:bg-white/10 transition-colors">
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white group-hover:text-gold-300 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-white/50">{tool.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-sm text-white/40">
                            <Clock className="w-4 h-4" />
                            {tool.duration}
                          </span>
                          <div className="w-10 h-10 bg-gold-300/10 rounded-full flex items-center justify-center group-hover:bg-gold-300/20 transition-colors">
                            <Play className="w-5 h-5 text-gold-300 ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-8 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700 text-center">
          <h3 className="text-xl font-bold mb-2">What is Open Mat?</h3>
          <p className="text-white/60 max-w-xl mx-auto">
            In martial arts, "open mat" is free practice time. Here, it's the same concept:
            tools you can use anytime to develop your leadership skills. No progression required—
            just pick what you need and practice.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

