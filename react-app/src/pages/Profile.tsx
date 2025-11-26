import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Award, Target, Flame, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BeltBadge } from '@/components/ui/BeltBadge';
import { supabase } from '@/lib/supabase';

export function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const { stats, getLevelTitle } = useGamification();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ 
          name: name.trim(),
          bio: bio.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await refreshProfile();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const memberSince = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      })
    : 'Recently';

  const totalStripesEarned = Object.values(stats.beltProgress.completedStripes).reduce((sum: number, stripes) => sum + stripes, 0);
  const totalLessonsCompleted = Math.floor(stats.totalXP / 25);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Profile</h1>
        <p className="text-white/60 text-sm sm:text-base">Manage your account and view your journey</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Profile Section */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Profile Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<User className="w-5 h-5 text-gold-300" />}>
                  Profile Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                    icon={<Edit2 className="w-4 h-4" />}
                    className="min-h-[44px]"
                  >
                    Edit
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-300 transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-300 transition-colors resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={saving}
                        icon={<Save className="w-4 h-4" />}
                        className="flex-1 min-h-[44px]"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsEditing(false);
                          setName(profile?.name || '');
                          setBio(profile?.bio || '');
                        }}
                        icon={<X className="w-4 h-4" />}
                        className="min-h-[44px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-navy-700 to-navy-800 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                        {profile?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white break-words">
                          {profile?.name || 'Set your name'}
                        </h3>
                        <p className="text-sm sm:text-base text-white/60 break-all">{user?.email}</p>
                        <p className="text-xs sm:text-sm text-white/40">Member since {memberSince}</p>
                      </div>
                    </div>

                    {profile?.bio && (
                      <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
                        <p className="text-sm sm:text-base text-white/80 leading-relaxed break-words">{profile.bio}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Assessment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Target className="w-5 h-5 text-gold-300" />}>
                  Assessment History
                </CardTitle>
              </CardHeader>

              <CardContent>
                {stats.beltProgress.completedAssessments.length > 0 ? (
                  <div className="space-y-2 sm:space-y-3">
                    {stats.beltProgress.completedAssessments.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm sm:text-base font-medium text-white capitalize truncate">
                              {assessment.replace(/-/g, ' ')}
                            </p>
                            <p className="text-xs text-white/50">Completed</p>
                          </div>
                        </div>
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-300 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <Target className="w-12 h-12 sm:w-16 sm:h-16 text-white/20 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-white/60">No assessments completed yet</p>
                    <p className="text-xs sm:text-sm text-white/40 mb-4">Take your first assessment to get personalized insights</p>
                    <Button variant="primary" onClick={() => window.location.href = '/assessments'} className="min-h-[44px]">
                      Take Assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Calendar className="w-5 h-5 text-gold-300" />}>
                  Learning Statistics
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-gold-300">{totalLessonsCompleted}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Lessons</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-purple-400">{totalStripesEarned}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Stripes</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-orange-400">{stats.streak.longestStreak}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Best Streak</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white/5 rounded-xl text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{stats.totalXP.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">Total XP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Current Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4">
                {/* Belt */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <BeltBadge belt={stats.beltProgress.currentBelt} size="sm" showLabel={false} />
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-white capitalize">
                        {stats.beltProgress.currentBelt} Belt
                      </p>
                      <p className="text-xs text-white/50">Stripe {stats.beltProgress.currentStripe}</p>
                    </div>
                  </div>
                </div>

                {/* Level */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {stats.level}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-white">
                        Level {stats.level}
                      </p>
                      <p className="text-xs text-purple-300">{getLevelTitle(stats.level)}</p>
                    </div>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-white">
                        {stats.streak.currentStreak} Day Streak
                      </p>
                      <p className="text-xs text-orange-300">Keep it going!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Award className="w-5 h-5 text-gold-300" />}>
                  Badges
                </CardTitle>
                <a href="/badges" className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">
                  View all →
                </a>
              </CardHeader>

              <CardContent>
                <div className="text-center py-6 sm:py-8">
                  <div className="text-3xl sm:text-4xl mb-3">🏆</div>
                  <p className="text-2xl sm:text-3xl font-bold text-gold-300 mb-1">
                    {stats.badges?.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-white/60">Badges Earned</p>
                </div>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => window.location.href = '/badges'}
                  className="min-h-[44px]"
                >
                  View Collection
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle icon={<Mail className="w-5 h-5 text-gold-300" />}>
                  Account
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-white/60">Email</span>
                  <span className="text-white font-medium break-all text-right">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-white/60">Member since</span>
                  <span className="text-white font-medium">{memberSince}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-white/60">Account Type</span>
                  <span className="text-gold-300 font-medium">Premium</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
