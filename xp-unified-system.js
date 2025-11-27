/**
 * TAP-IN UNIFIED XP SYSTEM
 * 
 * Single XP tracker that works across The Gym and The Hub
 * All XP counts toward belt progression
 * 
 * Version: 2.0
 * Last Updated: November 27, 2025
 */

const TapInXP = {
    
    // ============= CORE XP FUNCTIONS =============
    
    /**
     * Get current total XP
     */
    getTotalXP() {
        return parseInt(localStorage.getItem('totalXP') || '0');
    },
    
    /**
     * Add XP and update localStorage
     * @param {number} amount - XP to add
     * @param {string} source - Where XP came from (for analytics)
     */
    addXP(amount, source = 'unknown') {
        const currentXP = this.getTotalXP();
        const newXP = currentXP + amount;
        
        localStorage.setItem('totalXP', newXP.toString());
        
        // Log XP transaction
        this.logXPTransaction(amount, source, newXP);
        
        // Check for level up
        this.checkLevelUp(currentXP, newXP);
        
        // Check for belt promotion
        this.checkBeltPromotion(currentXP, newXP);
        
        return newXP;
    },
    
    /**
     * Log XP transaction for analytics
     */
    logXPTransaction(amount, source, newTotal) {
        const transactions = JSON.parse(localStorage.getItem('xpTransactions') || '[]');
        
        transactions.push({
            amount,
            source,
            newTotal,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 transactions
        if (transactions.length > 100) {
            transactions.shift();
        }
        
        localStorage.setItem('xpTransactions', JSON.stringify(transactions));
    },
    
    // ============= BELT SYSTEM =============
    
    belts: [
        { name: 'White Belt', emoji: '⚪', xpRequired: 0, nextAt: 100 },
        { name: 'Blue Belt', emoji: '🔵', xpRequired: 100, nextAt: 200 },
        { name: 'Purple Belt', emoji: '🟣', xpRequired: 200, nextAt: 400 },
        { name: 'Brown Belt', emoji: '🟤', xpRequired: 400, nextAt: 600 },
        { name: 'Black Belt', emoji: '⚫', xpRequired: 600, nextAt: 1000 },
        { name: 'Master', emoji: '🏆', xpRequired: 1000, nextAt: Infinity }
    ],
    
    /**
     * Get current belt based on XP
     */
    getCurrentBelt() {
        const xp = this.getTotalXP();
        
        for (let i = this.belts.length - 1; i >= 0; i--) {
            if (xp >= this.belts[i].xpRequired) {
                return this.belts[i];
            }
        }
        
        return this.belts[0]; // Default to White Belt
    },
    
    /**
     * Get next belt
     */
    getNextBelt() {
        const currentBelt = this.getCurrentBelt();
        const currentIndex = this.belts.findIndex(b => b.name === currentBelt.name);
        
        if (currentIndex < this.belts.length - 1) {
            return this.belts[currentIndex + 1];
        }
        
        return null; // Already at highest belt
    },
    
    /**
     * Get XP progress to next belt
     */
    getProgressToNextBelt() {
        const xp = this.getTotalXP();
        const currentBelt = this.getCurrentBelt();
        const nextBelt = this.getNextBelt();
        
        if (!nextBelt) {
            return {
                current: xp,
                required: currentBelt.nextAt,
                remaining: 0,
                percentage: 100
            };
        }
        
        const xpInBelt = xp - currentBelt.xpRequired;
        const xpNeeded = nextBelt.xpRequired - currentBelt.xpRequired;
        const percentage = Math.min(100, (xpInBelt / xpNeeded) * 100);
        
        return {
            current: xp,
            required: nextBelt.xpRequired,
            remaining: nextBelt.xpRequired - xp,
            percentage: percentage
        };
    },
    
    /**
     * Check if user leveled up to new belt
     */
    checkBeltPromotion(oldXP, newXP) {
        const oldBelt = this.belts.find(b => oldXP >= b.xpRequired && oldXP < b.nextAt);
        const newBelt = this.belts.find(b => newXP >= b.xpRequired && newXP < b.nextAt);
        
        if (oldBelt && newBelt && oldBelt.name !== newBelt.name) {
            // BELT PROMOTION!
            this.celebrateBeltPromotion(newBelt);
        }
    },
    
    /**
     * Celebrate belt promotion
     */
    celebrateBeltPromotion(newBelt) {
        // Store promotion for celebration page
        localStorage.setItem('pendingBeltPromotion', JSON.stringify({
            belt: newBelt,
            timestamp: new Date().toISOString()
        }));
        
        // Show immediate notification
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
        
        alert(`🎉 BELT PROMOTION!\n\nYou've earned your ${newBelt.emoji} ${newBelt.name}!\n\nCongratulations on your progress!`);
    },
    
    // ============= STRIPE TRACKING =============
    
    /**
     * Get completed stripes
     */
    getCompletedStripes() {
        return JSON.parse(localStorage.getItem('completedStripes') || '[]');
    },
    
    /**
     * Mark stripe as complete
     */
    completeStripe(stripeNumber) {
        const completed = this.getCompletedStripes();
        
        if (!completed.includes(stripeNumber)) {
            completed.push(stripeNumber);
            localStorage.setItem('completedStripes', JSON.stringify(completed));
            
            // Award stripe completion bonus
            this.addXP(100, `stripe_${stripeNumber}_bonus`);
        }
    },
    
    /**
     * Check if stripe is complete
     */
    isStripeComplete(stripeNumber) {
        return this.getCompletedStripes().includes(stripeNumber);
    },
    
    // ============= HUB TRACKING =============
    
    /**
     * Track Hub module completion
     */
    completeHubModule(moduleName, xpReward = 25) {
        const completed = JSON.parse(localStorage.getItem('completedHubModules') || '[]');
        
        if (!completed.includes(moduleName)) {
            completed.push(moduleName);
            localStorage.setItem('completedHubModules', JSON.stringify(completed));
            
            // Award XP
            this.addXP(xpReward, `hub_module_${moduleName}`);
        }
    },
    
    /**
     * Get completed Hub modules
     */
    getCompletedHubModules() {
        return JSON.parse(localStorage.getItem('completedHubModules') || '[]');
    },
    
    /**
     * Track Communication Path progress
     */
    getCommunicationProgress() {
        const completed = this.getCompletedHubModules();
        const commModules = completed.filter(m => m.startsWith('communication_'));
        return commModules.length;
    },
    
    // ============= LEVEL SYSTEM =============
    
    levels: [
        { level: 1, xpRequired: 0, title: 'Novice' },
        { level: 2, xpRequired: 50, title: 'Apprentice' },
        { level: 3, xpRequired: 150, title: 'Practitioner' },
        { level: 4, xpRequired: 300, title: 'Skilled' },
        { level: 5, xpRequired: 500, title: 'Proficient' },
        { level: 6, xpRequired: 750, title: 'Expert' },
        { level: 7, xpRequired: 1000, title: 'Master' },
        { level: 8, xpRequired: 1500, title: 'Grandmaster' },
        { level: 9, xpRequired: 2000, title: 'Legend' },
        { level: 10, xpRequired: 3000, title: 'Mythic' }
    ],
    
    /**
     * Get current level
     */
    getCurrentLevel() {
        const xp = this.getTotalXP();
        
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (xp >= this.levels[i].xpRequired) {
                return this.levels[i];
            }
        }
        
        return this.levels[0];
    },
    
    /**
     * Check for level up
     */
    checkLevelUp(oldXP, newXP) {
        const oldLevel = this.levels.find(l => oldXP >= l.xpRequired && (this.levels[this.levels.indexOf(l) + 1] ? oldXP < this.levels[this.levels.indexOf(l) + 1].xpRequired : true));
        const newLevel = this.levels.find(l => newXP >= l.xpRequired && (this.levels[this.levels.indexOf(l) + 1] ? newXP < this.levels[this.levels.indexOf(l) + 1].xpRequired : true));
        
        if (oldLevel && newLevel && oldLevel.level !== newLevel.level) {
            console.log(`🎉 LEVEL UP! You're now Level ${newLevel.level}: ${newLevel.title}`);
        }
    },
    
    // ============= STREAK SYSTEM =============
    
    /**
     * Update daily streak
     */
    updateStreak() {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('lastVisitDate');
        const currentStreak = parseInt(localStorage.getItem('currentStreak') || '0');
        const longestStreak = parseInt(localStorage.getItem('longestStreak') || '0');
        
        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            
            let newStreak;
            if (lastVisit === yesterdayStr) {
                // Consecutive day
                newStreak = currentStreak + 1;
                this.addXP(5, 'daily_streak');
            } else {
                // Streak broken
                newStreak = 1;
            }
            
            localStorage.setItem('currentStreak', newStreak.toString());
            localStorage.setItem('lastVisitDate', today);
            
            // Update longest streak
            if (newStreak > longestStreak) {
                localStorage.setItem('longestStreak', newStreak.toString());
            }
        }
    },
    
    /**
     * Get current streak
     */
    getCurrentStreak() {
        return parseInt(localStorage.getItem('currentStreak') || '0');
    },
    
    // ============= UTILITY FUNCTIONS =============
    
    /**
     * Get all stats for dashboard
     */
    getAllStats() {
        return {
            totalXP: this.getTotalXP(),
            currentBelt: this.getCurrentBelt(),
            nextBelt: this.getNextBelt(),
            progress: this.getProgressToNextBelt(),
            completedStripes: this.getCompletedStripes().length,
            currentLevel: this.getCurrentLevel(),
            currentStreak: this.getCurrentStreak(),
            longestStreak: parseInt(localStorage.getItem('longestStreak') || '0'),
            hubModulesComplete: this.getCompletedHubModules().length,
            communicationProgress: this.getCommunicationProgress()
        };
    },
    
    /**
     * Reset all progress (for testing)
     */
    resetAll() {
        if (confirm('⚠️ WARNING: This will delete ALL progress!\n\nAre you sure?')) {
            localStorage.removeItem('totalXP');
            localStorage.removeItem('completedStripes');
            localStorage.removeItem('completedHubModules');
            localStorage.removeItem('xpTransactions');
            localStorage.removeItem('currentStreak');
            localStorage.removeItem('longestStreak');
            localStorage.removeItem('lastVisitDate');
            localStorage.removeItem('pendingBeltPromotion');
            
            alert('✅ All progress reset!');
            window.location.reload();
        }
    }
};

// ============= INITIALIZATION =============

// Update streak on page load
document.addEventListener('DOMContentLoaded', function() {
    TapInXP.updateStreak();
});

// Make globally available
window.TapInXP = TapInXP;

console.log('✅ TAP-IN Unified XP System loaded');
console.log('📊 Current Stats:', TapInXP.getAllStats());

