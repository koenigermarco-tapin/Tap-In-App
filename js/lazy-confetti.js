/**
* Lazy Confetti Loader
* Loads confetti library only when needed
*/
(function() {
'use strict';
let confettiLoaded = false;
let confettiLib = null;
function loadConfetti() {
if (confettiLoaded) {
return Promise.resolve(confettiLib);
}
return new Promise((resolve, reject) => {
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
script.async = true;
script.onload = () => {
confettiLoaded = true;
confettiLib = window.confetti;
resolve(confettiLib);
};
script.onerror = reject;
document.head.appendChild(script);
});
}
function triggerConfetti(options = {}) {
return loadConfetti().then(() => {
if (confettiLib) {
confettiLib(options);
}
}).catch(err => {
            console.warn('Confetti failed to load:', err);
});
}
    // Export
window.LazyConfetti = {
load: loadConfetti,
trigger: triggerConfetti
};
    // Auto-load if confetti is already requested
if (typeof window.confetti !== 'undefined') {
confettiLoaded = true;
confettiLib = window.confetti;
}
})();