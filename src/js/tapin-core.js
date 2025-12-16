/**
 * TAP-IN Core
 * Master file that loads all utilities
 * Include this in every HTML page
 */

(function() {
  // Base path detection
  const scripts = document.getElementsByTagName('script');
  let basePath = '';
  for (let script of scripts) {
    if (script.src.includes('tapin-core.js')) {
      basePath = script.src.replace('tapin-core.js', '');
      break;
    }
  }
  
  // If basePath not found, try to detect from common locations
  if (!basePath) {
    const path = window.location.pathname;
    if (path.includes('/src/pages/')) {
      basePath = '../../js/';
    } else if (path.includes('/src/')) {
      basePath = '../js/';
    } else {
      basePath = 'src/js/';
    }
  }
  
  // Utilities to load
  const utilities = [
    'utils/error-handler.js',
    'utils/validation.js',
    'utils/security.js',
    'utils/data-manager.js'
  ];
  
  // Load each utility synchronously
  utilities.forEach((util, index) => {
    const script = document.createElement('script');
    script.src = basePath + util;
    script.async = false;
    script.defer = false;
    
    // Load in sequence
    if (index === 0) {
      document.head.appendChild(script);
    } else {
      const prevScript = document.querySelector(`script[src="${basePath}${utilities[index - 1]}"]`);
      if (prevScript) {
        prevScript.addEventListener('load', () => {
          document.head.appendChild(script);
        });
      } else {
        document.head.appendChild(script);
      }
    }
  });
  
  // Load CSS files
  const cssFiles = [
    'components/toast.css',
    'components/forms.css',
    'components/progress.css'
  ];
  
  cssFiles.forEach(css => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = basePath.replace('/js/', '/css/') + css;
    document.head.appendChild(link);
  });
})();

