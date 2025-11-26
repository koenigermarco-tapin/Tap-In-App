import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

type AuthMode = 'password' | 'magic-link';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<AuthMode>('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const { signInWithPassword, signInWithMagicLink } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMode === 'password') {
        const result = await signInWithPassword(email, password);
        if (result.error) {
          setError(result.error);
        } else {
          navigate(from, { replace: true });
        }
      } else {
        const result = await signInWithMagicLink(email);
        if (result.error) {
          setError(result.error);
        } else {
          setMagicLinkSent(true);
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-navy-900 to-bg-dark">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border-emerald-500/30">
            <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Check Your Email</h2>
            <p className="text-white/70 mb-6">
              We sent a magic link to <strong className="text-white">{email}</strong>
              <br />
              Click the link to sign in.
            </p>
            <button
              onClick={() => setMagicLinkSent(false)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              ← Use a different email
            </button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-navy-900 to-bg-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <span className="text-4xl">🥋</span>
            <span className="text-3xl font-extrabold text-white group-hover:text-gold-300 transition-colors">
              THE GYM
            </span>
          </Link>
        </div>

        <Card className="p-4 sm:p-6 md:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-white/60 text-center mb-8">
            Sign in to continue your journey
          </p>

          {/* Auth Mode Tabs */}
          <div className="flex bg-white/5 rounded-lg p-1 mb-6">
            <button
              onClick={() => setAuthMode('password')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                authMode === 'password'
                  ? 'bg-navy-700 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setAuthMode('magic-link')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                authMode === 'magic-link'
                  ? 'bg-navy-700 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Magic Link
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
            />

            {authMode === 'password' && (
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                required
              />
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              fullWidth
              loading={loading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {authMode === 'password' ? 'Sign In' : 'Send Magic Link'}
            </Button>
          </form>

          {authMode === 'password' && (
            <div className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-gold-300 hover:text-gold-200 font-medium transition-colors"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

