/**
* PWA Install Prompt Handler
* Shows custom install banner and tracks installations
*/
(function() {
'use strict';
const PWAInstallPrompt = {
deferredPrompt: null,
installBannerShown: false,
dismissedUntil: null,
dismissDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
init: function() {
            // Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
                // Prevent default browser prompt
e.preventDefault();
                // Store the event for later use
this.deferredPrompt = e;
                // Show custom prompt if not dismissed recently
if (this.shouldShowPrompt()) {
this.showInstallBanner();
}
});
            // Listen for app installed event
window.addEventListener('appinstalled', () => {
                console.log('PWA installed');
this.hideInstallBanner();
this.trackInstallation();
this.deferredPrompt = null;
});
            // Check if already installed
if (this.isStandalone()) {
                console.log('PWA already installed');
return;
}
            // Show banner after delay if prompt not fired
setTimeout(() => {
if (this.deferredPrompt && this.shouldShowPrompt()) {
this.showInstallBanner();
}
}, 3000);
},
shouldShowPrompt: function() {
            // Don't show if already shown and not dismissed
if (this.installBannerShown) {
return false;
}
            // Check if dismissed recently
const dismissedUntil = localStorage.getItem('pwa-install-dismissed-until');
if (dismissedUntil) {
const dismissTime = parseInt(dismissedUntil, 10);
if (Date.now() < dismissTime) {
return false;
}
}
            // Check if already installed
if (this.isStandalone()) {
return false;
}
return true;
},
isStandalone: function() {
return (window.matchMedia('(display-mode: standalone)').matches) ||
(window.navigator.standalone === true) ||
(document.referrer.includes('android-app://'));
},
showInstallBanner: function() {
if (document.getElementById('pwa-install-banner')) {
return; // Already showing
}
const banner = document.createElement('div');
banner.id = 'pwa-install-banner';
banner.innerHTML = this.getBannerHTML();
document.body.appendChild(banner);
            // Animate in
setTimeout(() => {
banner.classList.add('show');
}, 100);
this.installBannerShown = true;
            // Bind events
banner.querySelector('.pwa-install-btn').addEventListener('click', () => {
this.triggerInstall();
});
banner.querySelector('.pwa-dismiss-btn').addEventListener('click', () => {
this.dismissBanner();
});
            // Track banner shown
this.trackBannerShown();
},
hideInstallBanner: function() {
const banner = document.getElementById('pwa-install-banner');
if (banner) {
banner.classList.remove('show');
setTimeout(() => {
banner.remove();
}, 300);
}
this.installBannerShown = false;
},
dismissBanner: function() {
this.hideInstallBanner();
            // Store dismissal timestamp
const dismissUntil = Date.now() + this.dismissDuration;
localStorage.setItem('pwa-install-dismissed-until', dismissUntil.toString());
this.trackDismissal();
},
triggerInstall: async function() {
if (!this.deferredPrompt) {
                // Fallback instructions
this.showManualInstallInstructions();
return;
}
try {
                // Show the install prompt
this.deferredPrompt.prompt();
                // Wait for user response
const { outcome } = await this.deferredPrompt.userChoice;
                console.log('User install choice:', outcome);
                // Track outcome
if (outcome === 'accepted') {
this.trackInstallAccepted();
} else {
this.trackInstallDeclined();
}
                // Clear the deferred prompt
this.deferredPrompt = null;
this.hideInstallBanner();
} catch (error) {
                console.error('Install prompt error:', error);
this.showManualInstallInstructions();
}
},
showManualInstallInstructions: function() {
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);
let instructions = '';
if (isIOS) {
instructions = `
<h3>Install on iOS</h3>
<ol>
<li>Tap the Share button <span style="font-size: 1.2em;">📤</span> at the bottom</li>
<li>Scroll down and tap "Add to Home Screen"</li>
<li>Tap "Add" to confirm</li>
</ol>
`;
} else if (isAndroid) {
instructions = `
<h3>Install on Android</h3>
<ol>
<li>Tap the menu button <span style="font-size: 1.2em;">⋮</span> in your browser</li>
<li>Select "Add to Home Screen" or "Install App"</li>
<li>Tap "Add" or "Install" to confirm</li>
</ol>
`;
} else {
instructions = `
<h3>Install Instructions</h3>
<p>Look for an install icon in your browser's address bar, or check your browser menu for "Install" or "Add to Home Screen" options.</p>
`;
}
alert(instructions);
},
getBannerHTML: function() {
return `
<div class="pwa-install-banner">
<div class="pwa-banner-content">
<div class="pwa-banner-icon">
<img src="/icon-72.png" alt="TAP-IN" width="48" height="48">
</div>
<div class="pwa-banner-text">
<strong>Install TAP-IN</strong>
<span>Add to your home screen for quick access</span>
</div>
<div class="pwa-banner-actions">
<button class="pwa-install-btn">Install</button>
<button class="pwa-dismiss-btn" aria-label="Dismiss">×</button>
</div>
</div>
</div>
`;
},
trackBannerShown: function() {
if (typeof Analytics !== 'undefined') {
Analytics.track('pwa_install_banner_shown');
}
            console.log('[PWA] Install banner shown');
},
trackDismissal: function() {
if (typeof Analytics !== 'undefined') {
Analytics.track('pwa_install_banner_dismissed');
}
            console.log('[PWA] Install banner dismissed');
},
trackInstallAccepted: function() {
if (typeof Analytics !== 'undefined') {
Analytics.track('pwa_install_accepted');
}
            console.log('[PWA] Install accepted');
},
trackInstallDeclined: function() {
if (typeof Analytics !== 'undefined') {
Analytics.track('pwa_install_declined');
}
            console.log('[PWA] Install declined');
},
trackInstallation: function() {
if (typeof Analytics !== 'undefined') {
Analytics.track('pwa_installed');
}
            // Save install timestamp
localStorage.setItem('pwa-installed-at', Date.now().toString());
            console.log('[PWA] App installed');
}
};
    // Auto-initialize
if (typeof window !== 'undefined') {
window.PWAInstallPrompt = PWAInstallPrompt;
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => {
PWAInstallPrompt.init();
});
} else {
PWAInstallPrompt.init();
}
}
})();