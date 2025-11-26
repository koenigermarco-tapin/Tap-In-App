import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Globe, Shield, LogOut, Trash2, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

export function Settings() {
  const { signOut, user } = useAuth();
  const { i18n } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('tap-in-language', lang);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = () => {
    // This would need to be implemented with proper backend support
    console.log('Delete account requested');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Settings</h1>
        <p className="text-white/60 text-sm sm:text-base">Manage your preferences and account settings</p>
      </motion.div>

      <div className="space-y-4 sm:space-y-6">
        {/* Language & Region */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle icon={<Globe className="w-5 h-5 text-gold-300" />}>
                Language & Region
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">
                  Display Language
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      i18n.language === 'en'
                        ? 'border-gold-300 bg-gold-300/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">🇬🇧</div>
                    <div className="text-sm font-medium text-white">English</div>
                  </button>
                  <button
                    onClick={() => handleLanguageChange('de')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      i18n.language === 'de'
                        ? 'border-gold-300 bg-gold-300/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">🇩🇪</div>
                    <div className="text-sm font-medium text-white">Deutsch</div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle icon={<Bell className="w-5 h-5 text-gold-300" />}>
                Notifications
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Push Notifications */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm sm:text-base font-medium text-white">Push Notifications</p>
                  <p className="text-xs sm:text-sm text-white/60">Get notified about streak reminders and achievements</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors flex-shrink-0 ${
                    notifications ? 'bg-gold-300' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    animate={{ x: notifications ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>

              {/* Email Updates */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm sm:text-base font-medium text-white">Email Updates</p>
                  <p className="text-xs sm:text-sm text-white/60">Receive weekly progress reports via email</p>
                </div>
                <button
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors flex-shrink-0 ${
                    emailUpdates ? 'bg-gold-300' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    animate={{ x: emailUpdates ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle icon={darkMode ? <Moon className="w-5 h-5 text-gold-300" /> : <Sun className="w-5 h-5 text-gold-300" />}>
                Appearance
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm sm:text-base font-medium text-white">Dark Mode</p>
                  <p className="text-xs sm:text-sm text-white/60">Currently always enabled (dark theme)</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors flex-shrink-0 ${
                    darkMode ? 'bg-navy-700' : 'bg-white/20'
                  }`}
                  disabled
                >
                  <motion.div
                    animate={{ x: darkMode ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-lg opacity-50"
                  />
                </button>
              </div>
              <p className="text-xs text-white/40 mt-2 px-4">Light mode coming soon!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle icon={<Shield className="w-5 h-5 text-gold-300" />}>
                Privacy & Security
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
                <p className="text-sm sm:text-base font-medium text-white mb-1">Email Address</p>
                <p className="text-xs sm:text-sm text-white/60 break-all">{user?.email}</p>
              </div>

              <Button
                variant="secondary"
                fullWidth
                icon={<Shield className="w-4 h-4" />}
                className="min-h-[44px]"
                onClick={() => alert('Password change coming soon!')}
              >
                Change Password
              </Button>

              <div className="p-3 sm:p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-xs sm:text-sm text-blue-300">
                  <strong>Privacy:</strong> Your data is encrypted and never shared with third parties.
                  We use industry-standard security practices to protect your information.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle icon={<SettingsIcon className="w-5 h-5 text-gold-300" />}>
                Account Actions
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button
                variant="secondary"
                fullWidth
                icon={<LogOut className="w-4 h-4" />}
                onClick={handleLogout}
                className="min-h-[44px]"
              >
                Log Out
              </Button>

              {!showDeleteConfirm ? (
                <Button
                  variant="secondary"
                  fullWidth
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="min-h-[44px] !bg-red-500/10 !border-red-500/20 !text-red-300 hover:!bg-red-500/20"
                >
                  Delete Account
                </Button>
              ) : (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl space-y-3">
                  <p className="text-sm text-red-300 font-medium">
                    ⚠️ Are you sure you want to delete your account?
                  </p>
                  <p className="text-xs text-white/60">
                    This action cannot be undone. All your progress, achievements, and data will be permanently deleted.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setShowDeleteConfirm(false)}
                      className="min-h-[44px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={handleDeleteAccount}
                      className="min-h-[44px] !bg-red-500 !border-red-500 !text-white hover:!bg-red-600"
                    >
                      Delete Forever
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs sm:text-sm text-white/40 py-4"
        >
          <p>TAP-IN - The Gym v3.1.0</p>
          <p className="mt-1">© 2025 All rights reserved</p>
        </motion.div>
      </div>
    </div>
  );
}
