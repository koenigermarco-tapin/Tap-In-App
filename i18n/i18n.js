(function(){
  'use strict';
  // Lightweight placeholder to avoid missing script errors.
  // Extend with real translations when needed.
  const translations = {
    en: {},
    de: {}
  };
  function t(key, lang='en'){
    const table = translations[lang] || translations.en;
    return table[key] || key;
  }
  window.TapInI18n = { t, translations };
  console.log('i18n placeholder loaded');
})();

