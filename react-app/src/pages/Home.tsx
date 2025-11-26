import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Trophy, BookOpen, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type PathType = 'individual' | 'team' | null;

export function Home() {
  const [selectedPath, setSelectedPath] = useState<PathType>(null);

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Belt System',
      description: 'Progress through White → Blue → Purple → Brown → Black belts, mastering the 5 team dysfunctions step by step',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Quick Assessments',
      description: '2-3 minute diagnostics for work style, mental health, work-life balance, and team dynamics',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Open Mat Tools',
      description: 'Practical exercises: box breathing, morning routines, energy audits, weekly reviews, decision frameworks',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Progress Tracking',
      description: 'See your journey over time, celebrate wins, identify growth areas with gamified progression',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Features',
      description: 'Create teams, share assessments, and grow together with collaborative leadership tools',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: '100% Free',
      description: 'No paywalls, no upsells, no data harvesting. Just pure development tools for you and your team',
    },
  ];

  const belts = [
    { level: 'White', subtitle: 'Foundation of Vulnerability', time: '~35-45 min', emoji: '⚪', gradient: 'from-gray-100 to-gray-200', textColor: 'text-gray-900' },
    { level: 'Blue', subtitle: 'Building Meaningful Connections', time: '~40-50 min', emoji: '🔵', gradient: 'from-blue-500 to-blue-600', textColor: 'text-white' },
    { level: 'Purple', subtitle: 'Conflict & Commitment', time: '~40-50 min', emoji: '🟣', gradient: 'from-purple-500 to-purple-600', textColor: 'text-white' },
    { level: 'Brown', subtitle: 'Accountability & Results', time: '~40-50 min', emoji: '🟤', gradient: 'from-amber-700 to-amber-800', textColor: 'text-white' },
    { level: 'Black', subtitle: 'Visionary Leadership', time: '~45-59 min', emoji: '⚫', gradient: 'from-gray-900 to-black', textColor: 'text-white' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-bg-dark" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[500px] rotate-[-15deg]">
            🥋
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gold-300 bg-clip-text text-transparent"
          >
            THE GYM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-3xl text-white/90 mb-4"
          >
            Your Personal Leadership Development System
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            60-second diagnostic → Personalized development path → Track your progress
            <br />
            Built on research from Lencioni, Sinek, and top performance coaches
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <Button size="lg" icon={<Zap className="w-5 h-5" />}>
                Start Free Assessment
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg" icon={<span>🥋</span>}>
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Diagnostic Section */}
      <section className="py-20 px-4 bg-bg-card">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Starting Point</h2>
            <p className="text-white/60 text-lg">Answer one question to get your personalized path</p>
          </motion.div>

          {!selectedPath ? (
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card
                  hover
                  onClick={() => setSelectedPath('individual')}
                  className="p-6 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700 hover:border-gold-300/50"
                >
                  <div className="text-4xl mb-4">🏃</div>
                  <h3 className="text-xl font-semibold mb-2">Individual Development</h3>
                  <p className="text-white/60">
                    I want to understand my work style, mental health, and personal growth
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card
                  hover
                  onClick={() => setSelectedPath('team')}
                  className="p-6 bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700 hover:border-gold-300/50"
                >
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold mb-2">Team Development</h3>
                  <p className="text-white/60">
                    I lead a team and want to improve collaboration, trust, and results
                  </p>
                </Card>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card className="p-8 bg-gradient-to-br from-emerald-600 to-emerald-700 border-emerald-500">
                <div className="text-5xl mb-4">{selectedPath === 'individual' ? '🎯' : '🏆'}</div>
                <h3 className="text-2xl font-bold mb-2">
                  {selectedPath === 'individual' ? 'Your Individual Path' : 'Your Team Path'}
                </h3>
                <p className="text-white/80 mb-6">
                  {selectedPath === 'individual'
                    ? 'Start with quick assessments to understand yourself'
                    : 'Begin with team assessment to improve collaboration'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/assessments/worker-type">
                    <Button variant="secondary">
                      {selectedPath === 'individual' ? '🏃 Worker Type Assessment' : '🤝 Team Assessment'}
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button icon={<ArrowRight className="w-4 h-4" />}>
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </Card>
              <button
                onClick={() => setSelectedPath(null)}
                className="mt-4 text-white/50 hover:text-white transition-colors"
              >
                ← Choose different path
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Belt System Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-navy-900 to-bg-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Advanced Development
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Structured Leadership Growth?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              The Belt System is a self-paced leadership development program.
              Five progressive levels from foundational vulnerability to visionary leadership.
            </p>
          </motion.div>

          <div className="space-y-3 mb-12">
            {belts.map((belt, index) => (
              <motion.div
                key={belt.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-0 overflow-hidden hover:translate-x-2 transition-transform">
                  <div className={`flex items-center gap-4 p-4 bg-gradient-to-r ${belt.gradient} ${belt.textColor}`}>
                    <span className="text-3xl">{belt.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold">{belt.level} Belt</h3>
                      <p className="opacity-80">{belt.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <p className="text-white/60 text-sm">{belt.time}</p>
                    <Link to={`/belt-system/${belt.level.toLowerCase()}`}>
                      <Button variant="ghost" size="sm">
                        Start <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center bg-gradient-to-br from-bg-card to-bg-dark border-navy-700">
              <h3 className="text-2xl font-bold mb-2">Find Your Starting Belt</h3>
              <p className="text-white/60 mb-6">
                Take the comprehensive belt assessment to discover where you are
              </p>
              <Link to="/assessments/belt">
                <Button size="lg" icon={<span>🥋</span>}>
                  Start Belt Assessment
                </Button>
              </Link>
              <p className="text-white/40 text-sm mt-4">
                ~45 minutes • Self-paced • Instant results
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-bg-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Inside THE GYM</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="text-gold-300 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-navy-800 to-navy-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/70 text-lg mb-8">
            Join thousands of leaders who are developing themselves with THE GYM
          </p>
          <Link to="/signup">
            <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Create Free Account
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

