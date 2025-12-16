/**
* TAP-IN XP Manager
* Unified XP storage across all language versions
*/
const XPManager = {
    // Storage keys (DO NOT CHANGE - used across all pages)
KEYS: {
TOTAL_XP: 'tap_in_total_xp',
CURRENT_BELT: 'tap_in_current_belt',
CURRENT_STRIPE: 'tap_in_current_stripe',
LAST_UPDATED: 'tap_in_xp_last_updated'
},
    // Get total XP
getTotalXP() {
return parseInt(localStorage.getItem(this.KEYS.TOTAL_XP) || '0');
},
    // Set total XP
setTotalXP(xp) {
const currentXP = this.getTotalXP();
if (xp !== currentXP) {
localStorage.setItem(this.KEYS.TOTAL_XP, xp.toString());
localStorage.setItem(this.KEYS.LAST_UPDATED, new Date().toISOString());
            console.log('✅ XP updated:', xp);
}
},
    // Add XP
addXP(amount) {
const current = this.getTotalXP();
const newTotal = current + amount;
this.setTotalXP(newTotal);
return newTotal;
},
    // Get current belt
getCurrentBelt() {
return localStorage.getItem(this.KEYS.CURRENT_BELT) || 'white';
},
    // Set current belt
setCurrentBelt(belt) {
localStorage.setItem(this.KEYS.CURRENT_BELT, belt);
localStorage.setItem(this.KEYS.LAST_UPDATED, new Date().toISOString());
},
    // Get current stripe
getCurrentStripe() {
return parseInt(localStorage.getItem(this.KEYS.CURRENT_STRIPE) || '0');
},
    // Set current stripe
setCurrentStripe(stripe) {
localStorage.setItem(this.KEYS.CURRENT_STRIPE, stripe.toString());
localStorage.setItem(this.KEYS.LAST_UPDATED, new Date().toISOString());
},
    // Calculate belt and stripe from XP
calculateBeltFromXP(xp) {
if (xp < 400) return { belt: 'white', stripe: Math.min(Math.floor(xp / 100), 3) };
if (xp < 800) return { belt: 'blue', stripe: Math.min(Math.floor((xp - 400) / 100), 3) };
if (xp < 1200) return { belt: 'purple', stripe: Math.min(Math.floor((xp - 800) / 100), 3) };
if (xp < 1600) return { belt: 'brown', stripe: Math.min(Math.floor((xp - 1200) / 100), 3) };
return { belt: 'black', stripe: Math.min(Math.floor((xp - 1600) / 100), 3) };
},
    // Get full progress data
getProgress() {
const totalXP = this.getTotalXP();
const { belt, stripe } = this.calculateBeltFromXP(totalXP);
return {
totalXP,
currentBelt: belt,
currentStripe: stripe,
lastUpdated: localStorage.getItem(this.KEYS.LAST_UPDATED)
};
},
    // Debug info
debug() {
        console.log('=== XP Manager Debug ===');
);
);
);
);
);
}
};
// Make globally available
window.XPManager = XPManager;
// Auto-migrate old localStorage keys on first load
(function() {
    // Migrate from old 'totalXP' key if exists
const oldXP = localStorage.getItem('totalXP');
if (oldXP && !localStorage.getItem(XPManager.KEYS.TOTAL_XP)) {
XPManager.setTotalXP(parseInt(oldXP));
        console.log('✅ Migrated XP from old storage key');
}
    // Migrate from old 'currentBelt' key if exists
const oldBelt = localStorage.getItem('currentBelt');
if (oldBelt && !localStorage.getItem(XPManager.KEYS.CURRENT_BELT)) {
XPManager.setCurrentBelt(oldBelt);
        console.log('✅ Migrated belt from old storage key');
}
})();