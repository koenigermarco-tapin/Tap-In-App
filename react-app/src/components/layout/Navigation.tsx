import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Trophy, Flame, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export function Navigation() {
  const { user, signOut, profile } = useAuth();
  const { stats } = useGamification();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/assessments', label: 'Assessments' },
    { href: '/belt-system', label: 'Belt System' },
    { href: '/open-mat', label: 'Open Mat' },
  ];

  const getBeltEmoji = () => {
    switch (stats.beltProgress.currentBelt) {
      case 'white': return '⚪';
      case 'blue': return '🔵';
      case 'purple': return '🟣';
      case 'brown': return '🟤';
      case 'black': return '⚫';
      default: return '⚪';
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-bg-card/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🥋</span>
            <span className="text-xl font-extrabold text-white group-hover:text-gold-300 transition-colors">
              THE GYM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.href
                    ? 'bg-navy-800 text-gold-300'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Streak Badge */}
                {stats.streak.currentStreak > 0 && (
                  <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1.5 rounded-full text-sm font-semibold">
                    <Flame className="w-4 h-4" />
                    <span>{stats.streak.currentStreak}</span>
                  </div>
                )}

                {/* XP Badge */}
                <div className="hidden sm:flex items-center gap-1.5 bg-border-subtle px-3 py-1.5 rounded-full text-sm">
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>{stats.totalXP.toLocaleString()} XP</span>
                </div>

                {/* Belt Badge */}
                <div className="hidden sm:flex items-center gap-1.5 bg-border-subtle px-3 py-1.5 rounded-full text-sm">
                  <span>{getBeltEmoji()}</span>
                  <span className="capitalize">{stats.beltProgress.currentBelt}</span>
                </div>

                {/* Language Toggle */}
                <div className="hidden sm:block">
                  <LanguageToggle />
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-10 h-10 bg-gradient-to-br from-navy-700 to-navy-800 rounded-full flex items-center justify-center font-bold text-white hover:from-navy-600 hover:to-navy-700 transition-all"
                  >
                    {profile?.name?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-bg-card border border-border-subtle rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-border-subtle">
                          <p className="font-medium text-white truncate">
                            {profile?.name || 'User'}
                          </p>
                          <p className="text-sm text-white/50 truncate">{user.email}</p>
                        </div>
                        
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>
                          <Link
                            to="/achievements"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Trophy className="w-4 h-4" />
                            Achievements
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>

                        <div className="p-2 border-t border-border-subtle">
                          <button
                            onClick={() => {
                              signOut();
                              setUserMenuOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost text-sm">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary text-sm">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-subtle overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    location.pathname === link.href
                      ? 'bg-navy-800 text-gold-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

