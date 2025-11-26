import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('tap-in-language', newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4 text-white/70" />
      <span className="text-sm font-medium text-white/90">
        {currentLang === 'en' ? '🇬🇧 EN' : '🇩🇪 DE'}
      </span>
    </motion.button>
  );
}

