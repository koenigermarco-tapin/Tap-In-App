/**
 * TAP-IN V10 Gamification Module
 * XP tracking, achievements, streak management, progress persistence
 * 
 * Usage: Include in every stripe file:
 * <script src="../../js/gamification-v10.js"></script>
 */

const TapInGamification = (function() {
    'use strict';
    
    // XP Values
    const XP_VALUES = {
        STRIPE_COMPLETE: 100,
        QUIZ_PERFECT: 50,
        QUIZ_PASS: 30,
        FIRST_STRIPE: 50,  // Bonus
        BELT_COMPLETE: 200, // Bonus
        DAILY_LOGIN: 10,
        STREAK_MILESTONE: 25, // Per week of streak
    };
    
    // Achievement Definitions
    const ACHIEVEMENTS = {
        'first-stripe': {
            title: 'First Stripe',
            description: 'Completed your first stripe',
            xp: 50,
            icon: 'trophy'
        },
        'white-belt-complete': {
            title: 'White Belt Earned',
            description: 'Completed all White Belt stripes',
            xp: 200,
            icon: 'trophy'
        },
        'blue-belt-complete': {
            title: 'Blue Belt Earned',
            description: 'Completed all Blue Belt stripes',
            xp: 200,
            icon: 'trophy'
        },
        'purple-belt-complete': {
            title: 'Purple Belt Earned',
            description: 'Completed all Purple Belt stripes',
            xp: 200,
            icon: 'trophy'
        },
        'streak-7': {
            title: 'Week Warrior',
            description: '7-day practice streak',
            xp: 25,
            icon: 'fire'
        },
        'streak-30': {
            title: 'Monthly Dedication',
            description: '30-day practice streak',
            xp: 100,
            icon: 'fire'
        },
        'perfect-quiz': {
            title: 'Perfect Score',
            description: 'Scored 100% on a quiz',
            xp: 50,
            icon: 'star'
        }
    };
    
    /**
     * Initialize gamification on page load
     */
    function init() {
        updateDailyLogin();
        displayCurrentXP();
        checkStreak();
    }
    
    /**
     * Award XP and show notification
     */
    function awardXP(amount, reason = '') {
        const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
        const newXP = currentXP + amount;
        localStorage.setItem('totalXP', newXP);
        
        showXPNotification(amount, reason);
        updateXPDisplay(newXP);
        
        return newXP;
    }
    
    /**
     * Show XP notification toast
     */
    function showXPNotification(amount, reason) {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('xp-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'xp-notification';
            notification.className = 'xp-toast';
            notification.innerHTML = `
                <svg class="hi"><use href="#sparkles"/></svg>
                <span id="xp-amount"></span>
            `;
            document.body.appendChild(notification);
        }
        
        // Update and show
        const amountEl = notification.querySelector('#xp-amount');
        amountEl.textContent = `+${amount} XP`;
        if (reason) {
            amountEl.textContent += ` • ${reason}`;
        }
        
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    /**
     * Update XP display in header
     */
    function updateXPDisplay(xp) {
        const xpDisplay = document.getElementById('current-xp');
        if (xpDisplay) {
            xpDisplay.textContent = xp || localStorage.getItem('totalXP') || '0';
        }
    }
    
    /**
     * Display current XP on page load
     */
    function displayCurrentXP() {
        const xp = localStorage.getItem('totalXP') || '0';
        updateXPDisplay(xp);
    }
    
    /**
     * Save stripe completion progress
     */
    function saveStripeCompletion(belt, stripe, quizScore = null, timeSpent = null) {
        const progress = getProgress();
        const stripeKey = `${belt}-stripe${stripe}`;
        
        progress[stripeKey] = {
            completed: true,
            completedAt: new Date().toISOString(),
            score: quizScore,
            timeSpent: timeSpent
        };
        
        localStorage.setItem('userProgress', JSON.stringify(progress));
        
        // Award XP
        awardXP(XP_VALUES.STRIPE_COMPLETE, `${belt} Stripe ${stripe}`);
        
        // Check for achievements
        checkForAchievements(belt, stripe, quizScore);
    }
    
    /**
     * Get user progress
     */
    function getProgress() {
        return JSON.parse(localStorage.getItem('userProgress') || '{}');
    }
    
    /**
     * Check if stripe is completed
     */
    function isStripeCompleted(belt, stripe) {
        const progress = getProgress();
        const stripeKey = `${belt}-stripe${stripe}`;
        return progress[stripeKey]?.completed || false;
    }
    
    /**
     * Check for belt completion
     */
    function isBeltCompleted(belt) {
        const progress = getProgress();
        for (let i = 1; i <= 4; i++) {
            if (!progress[`${belt}-stripe${i}`]?.completed) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Check and unlock achievements
     */
    function checkForAchievements(belt, stripe, quizScore) {
        const achievements = JSON.parse(localStorage.getItem('achievements') || '{}');
        
        // First stripe achievement
        if (!achievements['first-stripe'] && belt === 'white' && stripe === 1) {
            unlockAchievement('first-stripe');
        }
        
        // Perfect quiz achievement
        if (quizScore === 100 && !achievements['perfect-quiz']) {
            unlockAchievement('perfect-quiz');
        }
        
        // Belt completion achievements
        if (isBeltCompleted(belt)) {
            const achievementKey = `${belt}-belt-complete`;
            if (!achievements[achievementKey]) {
                unlockAchievement(achievementKey);
            }
        }
        
        // Check streak achievements
        const streak = getCurrentStreak();
        if (streak >= 7 && !achievements['streak-7']) {
            unlockAchievement('streak-7');
        }
        if (streak >= 30 && !achievements['streak-30']) {
            unlockAchievement('streak-30');
        }
    }
    
    /**
     * Unlock an achievement
     */
    function unlockAchievement(achievementKey) {
        const achievement = ACHIEVEMENTS[achievementKey];
        if (!achievement) return;
        
        const achievements = JSON.parse(localStorage.getItem('achievements') || '{}');
        achievements[achievementKey] = {
            unlockedAt: new Date().toISOString()
        };
        localStorage.setItem('achievements', JSON.stringify(achievements));
        
        // Award XP
        awardXP(achievement.xp, achievement.title);
        
        // Show achievement modal
        showAchievementModal(achievement);
    }
    
    /**
     * Show achievement unlock modal
     */
    function showAchievementModal(achievement) {
        let modal = document.getElementById('achievement-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'achievement-modal';
            modal.className = 'achievement-unlock';
            modal.innerHTML = `
                <div class="achievement-content">
                    <svg class="hi achievement-icon"><use href="#trophy"/></svg>
                    <h3 id="achievement-title"></h3>
                    <p id="achievement-desc"></p>
                    <p class="achievement-xp">+<span id="achievement-xp"></span> XP</p>
                    <button onclick="TapInGamification.closeAchievementModal()" class="btn-primary">
                        Continue
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        modal.querySelector('#achievement-title').textContent = achievement.title;
        modal.querySelector('#achievement-desc').textContent = achievement.description;
        modal.querySelector('#achievement-xp').textContent = achievement.xp;
        modal.querySelector('.achievement-icon use').setAttribute('href', `#${achievement.icon}`);
        
        modal.classList.add('show');
    }
    
    /**
     * Close achievement modal
     */
    function closeAchievementModal() {
        const modal = document.getElementById('achievement-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
    
    /**
     * Update daily login streak
     */
    function updateDailyLogin() {
        const today = new Date().toDateString();
        const lastLogin = localStorage.getItem('lastLogin');
        
        if (lastLogin !== today) {
            localStorage.setItem('lastLogin', today);
            awardXP(XP_VALUES.DAILY_LOGIN, 'Daily Login');
        }
    }
    
    /**
     * Check and update streak
     */
    function checkStreak() {
        const today = new Date().toDateString();
        const lastPractice = localStorage.getItem('lastPractice');
        const currentStreak = parseInt(localStorage.getItem('currentStreak') || '0');
        
        const lastDate = lastPractice ? new Date(lastPractice) : null;
        const todayDate = new Date(today);
        
        if (!lastDate) {
            // First time
            localStorage.setItem('currentStreak', '1');
            localStorage.setItem('lastPractice', today);
        } else {
            const daysDiff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === 1) {
                // Consecutive day
                const newStreak = currentStreak + 1;
                localStorage.setItem('currentStreak', newStreak.toString());
                localStorage.setItem('lastPractice', today);
                
                // Award milestone XP
                if (newStreak % 7 === 0) {
                    awardXP(XP_VALUES.STREAK_MILESTONE, `${newStreak}-Day Streak!`);
                }
            } else if (daysDiff > 1) {
                // Streak broken
                localStorage.setItem('currentStreak', '1');
                localStorage.setItem('lastPractice', today);
            }
            // daysDiff === 0 means same day, no change needed
        }
    }
    
    /**
     * Get current streak
     */
    function getCurrentStreak() {
        return parseInt(localStorage.getItem('currentStreak') || '0');
    }
    
    /**
     * Get failure message based on belt level (BJJ-themed)
     */
    function getBeltFailureMessage(belt) {
        const messages = {
            'white': {
                title: 'You Got Submitted by a White Belt!',
                message: 'Even beginners need to understand the fundamentals. Review the lesson and try again.',
                emoji: '🥋'
            },
            'blue': {
                title: 'You Got Submitted by a Blue Belt!',
                message: 'Blue belts know the basics well. Study the material and come back stronger.',
                emoji: '💙'
            },
            'purple': {
                title: 'You Got Submitted by a Purple Belt!',
                message: 'Purple belts are getting advanced. You need to sharpen your understanding.',
                emoji: '💜'
            },
            'brown': {
                title: 'You Got Submitted by a Brown Belt!',
                message: 'Brown belts are near-experts. This content requires deep mastery.',
                emoji: '🤎'
            },
            'black': {
                title: 'You Got Submitted by a Black Belt!',
                message: 'Black belt level mastery required. Review thoroughly before attempting again.',
                emoji: '🖤'
            }
        };
        
        return messages[belt] || messages['white'];
    }
    
    // Public API
    return {
        init,
        awardXP,
        saveStripeCompletion,
        isStripeCompleted,
        isBeltCompleted,
        checkForAchievements,
        unlockAchievement,
        closeAchievementModal,
        getCurrentStreak,
        getBeltFailureMessage,
        getProgress,
        XP_VALUES,
        ACHIEVEMENTS
    };
})();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', TapInGamification.init);
} else {
    TapInGamification.init();
}
