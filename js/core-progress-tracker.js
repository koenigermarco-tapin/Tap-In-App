/**
* TAP-IN Core Progress Tracker
* Unified progress tracking system for belt progression, lessons, and modules
*/
(function() {
'use strict';
const CoreProgressTracker = {
        /**
* Initialize the progress tracker
*/
init() {
            console.log('📊 Core Progress Tracker initialized');
this.syncWithExistingSystems();
},
        /**
* Sync with existing progress systems
*/
syncWithExistingSystems() {
            // If BeltProgression exists, use it
if (typeof BeltProgression !== 'undefined') {
                console.log('✅ Using BeltProgression system');
return;
}
            // If ProgressSyncService exists, use it
if (typeof ProgressSyncService !== 'undefined') {
                console.log('✅ Using ProgressSyncService');
return;
}
            // Initialize basic tracking
this.initBasicTracking();
},
        /**
* Initialize basic progress tracking
*/
initBasicTracking() {
            // Ensure required keys exist
const required = [
'totalXP',
'currentBelt',
'currentStripe',
'completedLessons',
'completedStripes'
];
required.forEach(key => {
if (!localStorage.getItem(key)) {
const defaults = {
'totalXP': '0',
'currentBelt': 'white',
'currentStripe': '1',
'completedLessons': '[]',
'completedStripes': '[]'
};
localStorage.setItem(key, defaults[key] || '');
}
});
},
        /**
* Mark a lesson as complete
* @param {string} belt - Belt name (e.g., 'white', 'blue')
* @param {number} stripe - Stripe number (1-4)
* @param {number} lesson - Lesson number
*/
completeLesson(belt, stripe, lesson) {
const key = `${belt}BeltStripe${stripe}Lesson${lesson}Complete`;
localStorage.setItem(key, 'true');
            // Add to completed lessons array
const completed = this.getCompletedLessons();
const lessonId = `${belt}-${stripe}-${lesson}`;
if (!completed.includes(lessonId)) {
completed.push(lessonId);
localStorage.setItem('completedLessons', JSON.stringify(completed));
}
            // Award XP
if (typeof CoreGamification !== 'undefined') {
CoreGamification.awardXP(25, `Completed ${belt} belt stripe ${stripe} lesson ${lesson}`);
} else {
const totalXP = parseInt(localStorage.getItem('totalXP') || '0');
localStorage.setItem('totalXP', (totalXP + 25).toString());
}
            // Trigger event
window.dispatchEvent(new CustomEvent('lessonComplete', {
detail: { belt, stripe, lesson }
}));
return true;
},
        /**
* Mark a stripe as complete
* @param {string} belt - Belt name
* @param {number} stripe - Stripe number
*/
completeStripe(belt, stripe) {
const key = `${belt}BeltStripe${stripe}Complete`;
localStorage.setItem(key, 'true');
            // Add to completed stripes array
const completed = this.getCompletedStripes();
const stripeId = `${belt}-${stripe}`;
if (!completed.includes(stripeId)) {
completed.push(stripeId);
localStorage.setItem('completedStripes', JSON.stringify(completed));
}
            // Award XP
if (typeof CoreGamification !== 'undefined') {
CoreGamification.awardXP(100, `Completed ${belt} belt stripe ${stripe}`);
} else {
const totalXP = parseInt(localStorage.getItem('totalXP') || '0');
localStorage.setItem('totalXP', (totalXP + 100).toString());
}
            // Update current stripe
if (stripe === 4) {
                // Move to next belt
const nextBelt = this.getNextBelt(belt);
localStorage.setItem('currentBelt', nextBelt);
localStorage.setItem('currentStripe', '1');
} else {
localStorage.setItem('currentStripe', (stripe + 1).toString());
}
            // Trigger event
window.dispatchEvent(new CustomEvent('stripeComplete', {
detail: { belt, stripe }
}));
return true;
},
        /**
* Get completed lessons
*/
getCompletedLessons() {
try {
return JSON.parse(localStorage.getItem('completedLessons') || '[]');
} catch (e) {
return [];
}
},
        /**
* Get completed stripes
*/
getCompletedStripes() {
try {
return JSON.parse(localStorage.getItem('completedStripes') || '[]');
} catch (e) {
return [];
}
},
        /**
* Check if a lesson is complete
*/
isLessonComplete(belt, stripe, lesson) {
const key = `${belt}BeltStripe${stripe}Lesson${lesson}Complete`;
return localStorage.getItem(key) === 'true';
},
        /**
* Check if a stripe is complete
*/
isStripeComplete(belt, stripe) {
const key = `${belt}BeltStripe${stripe}Complete`;
return localStorage.getItem(key) === 'true';
},
        /**
* Check if a belt is complete (all 4 stripes)
*/
isBeltComplete(belt) {
for (let i = 1; i <= 4; i++) {
if (!this.isStripeComplete(belt, i)) {
return false;
}
}
return true;
},
        /**
* Get current belt
*/
getCurrentBelt() {
return localStorage.getItem('currentBelt') || 'white';
},
        /**
* Get current stripe
*/
getCurrentStripe() {
return parseInt(localStorage.getItem('currentStripe') || '1');
},
        /**
* Get next belt
*/
getNextBelt(currentBelt) {
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
const currentIndex = belts.indexOf(currentBelt);
if (currentIndex < belts.length - 1) {
return belts[currentIndex + 1];
}
return 'black'; // Already at highest belt
},
        /**
* Get belt progress percentage
*/
getBeltProgress(belt) {
let completed = 0;
for (let i = 1; i <= 4; i++) {
if (this.isStripeComplete(belt, i)) {
completed++;
}
}
return (completed / 4) * 100;
},
        /**
* Get overall progress (all belts)
*/
getOverallProgress() {
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
let totalStripes = 0;
let completedStripes = 0;
belts.forEach(belt => {
for (let i = 1; i <= 4; i++) {
totalStripes++;
if (this.isStripeComplete(belt, i)) {
completedStripes++;
}
}
});
return totalStripes > 0 ? (completedStripes / totalStripes) * 100 : 0;
}
};
    // Make available globally
window.CoreProgressTracker = CoreProgressTracker;
    // Auto-initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => CoreProgressTracker.init());
} else {
CoreProgressTracker.init();
}
})();