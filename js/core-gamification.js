/**
* TAP-IN Core Gamification System
* Unified wrapper for all gamification functionality
* Works with existing systems: gamification.js, tap-in-xp-enhanced.js, unified XP system
*/
(function() {
'use strict';
const CoreGamification = {
        // XP Configuration
XP_VALUES: {
lessonComplete: 25,
stripeComplete: 100,
beltComplete: 500,
assessmentComplete: 100,
openMatComplete: 25,
dailyLogin: 10,
weekStreak: 100,
monthStreak: 500
},
        /**
* Initialize the core gamification system
*/
init() {
            console.log('🎮 Core Gamification System initialized');
this.syncWithExistingSystems();
},
        /**
* Sync with existing gamification systems
*/
syncWithExistingSystems() {
            // If TapInXP exists (unified system), use it
if (typeof TapInXP !== 'undefined') {
                console.log('✅ Using TapInXP unified system');
return;
}
            // If TapInGamification exists, use it
if (typeof TapInGamification !== 'undefined') {
                console.log('✅ Using TapInGamification system');
return;
}
            // Fallback to localStorage-based system
this.initLocalStorageSystem();
},
        /**
* Initialize localStorage-based gamification system
*/
initLocalStorageSystem() {
const stored = localStorage.getItem('tapinGamification') || localStorage.getItem('tapInGamification');
if (!stored) {
const defaultData = {
totalXP: 0,
level: 1,
badges: [],
lastVisit: null,
streakCount: 0,
modulesComplete: 0,
assessmentsComplete: 0,
history: []
};
localStorage.setItem('tapinGamification', JSON.stringify(defaultData));
}
},
        /**
* Award XP - Unified function that works with all systems
* @param {number} amount - XP amount to award
* @param {string} reason - Reason for XP award
*/
awardXP(amount, reason = '') {
            // Try unified XP system first
if (typeof TapInXP !== 'undefined' && TapInXP.addXP) {
TapInXP.addXP(amount, reason || 'XP Award');
return;
}
            // Try TapInGamification
if (typeof TapInGamification !== 'undefined' && TapInGamification.awardXP) {
TapInGamification.awardXP(amount, reason);
return;
}
            // Try window.awardXP (from gym-dashboard.html)
if (typeof window.awardXP === 'function') {
window.awardXP(amount, reason);
return;
}
            // Fallback to localStorage
this.awardXPLocalStorage(amount, reason);
},
        /**
* Award XP using localStorage
*/
awardXPLocalStorage(amount, reason) {
            // Get existing XP from localStorage
let totalXP = parseInt(localStorage.getItem('totalXP') || '0');
            // Also check gamification object
const gamificationData = this.getGamificationData();
if (gamificationData.totalXP) {
totalXP = gamificationData.totalXP;
}
            // Add new XP
totalXP += amount;
            // Update localStorage
localStorage.setItem('totalXP', totalXP.toString());
            // Update gamification data
const data = this.getGamificationData();
data.totalXP = totalXP;
data.history = data.history || [];
data.history.push({
amount,
reason,
timestamp: new Date().toISOString()
});
localStorage.setItem('tapinGamification', JSON.stringify(data));
            // Check for level up
this.checkLevelUp(data.totalXP, data.level || 1);
            // Trigger custom event for UI updates
window.dispatchEvent(new CustomEvent('xpAwarded', {
detail: { amount, totalXP, reason }
}));
`);
},
        /**
* Get total XP
*/
getTotalXP() {
            // Try unified system
if (typeof TapInXP !== 'undefined' && TapInXP.getTotalXP) {
return TapInXP.getTotalXP();
}
            // Try localStorage
const totalXP = parseInt(localStorage.getItem('totalXP') || '0');
if (totalXP > 0) {
return totalXP;
}
            // Try gamification data
const data = this.getGamificationData();
return data.totalXP || 0;
},
        /**
* Get gamification data
*/
getGamificationData() {
const stored = localStorage.getItem('tapinGamification') || localStorage.getItem('tapInGamification');
if (stored) {
try {
return JSON.parse(stored);
} catch (e) {
                    console.error('Error parsing gamification data:', e);
}
}
return {
totalXP: 0,
level: 1,
badges: [],
lastVisit: null,
streakCount: 0,
modulesComplete: 0,
assessmentsComplete: 0,
history: []
};
},
        /**
* Check for level up
*/
checkLevelUp(totalXP, currentLevel) {
const newLevel = Math.floor(totalXP / 500) + 1;
if (newLevel > currentLevel) {
const data = this.getGamificationData();
data.level = newLevel;
localStorage.setItem('tapinGamification', JSON.stringify(data));
                // Trigger level up event
window.dispatchEvent(new CustomEvent('levelUp', {
detail: { newLevel, totalXP }
}));
                // Show notification if function exists
if (typeof showLevelUpNotification === 'function') {
showLevelUpNotification(newLevel);
}
}
},
        /**
* Get current level
*/
getCurrentLevel() {
const totalXP = this.getTotalXP();
return Math.floor(totalXP / 500) + 1;
}
};
    // Make available globally
window.CoreGamification = CoreGamification;
    // Auto-initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => CoreGamification.init());
} else {
CoreGamification.init();
}
})();