/**
 * TAP-IN Daily Streak System
 * Tracks consecutive days and rewards milestone streaks
 */

const DAILY_STREAK = {
  /**
   * Check and update daily streak
   */
  checkStreak: function() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisitDate');
    const currentStreak = parseInt(localStorage.getItem('dailyStreak')) || 0;
    
    if (lastVisit === today) {
      // Already counted today
      return currentStreak;
    }
    
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastVisit === yesterday) {
      // Streak continues
      const newStreak = currentStreak + 1;
      localStorage.setItem('dailyStreak', newStreak.toString());
      localStorage.setItem('lastVisitDate', today);
      
      // Award bonus XP for milestones
      if (newStreak % 7 === 0) {
        this.awardStreakBonus(newStreak);
      }
      
      return newStreak;
    } else if (lastVisit && lastVisit !== yesterday) {
      // Streak broken - reset
      localStorage.setItem('dailyStreak', '1');
      localStorage.setItem('lastVisitDate', today);
      return 1;
    } else {
      // First visit ever
      localStorage.setItem('dailyStreak', '1');
      localStorage.setItem('lastVisitDate', today);
      return 1;
    }
  },

  /**
   * Get current streak without updating
   */
  getCurrentStreak: function() {
    return parseInt(localStorage.getItem('dailyStreak')) || 0;
  },

  /**
   * Award bonus XP for streak milestones
   */
  awardStreakBonus: function(streakDays) {
    const bonusXP = streakDays * 5; // 5 XP per day in streak
    
    // Award XP using available systems
    if (typeof window.TapInGamification !== 'undefined' && window.TapInGamification.awardXP) {
      window.TapInGamification.awardXP(bonusXP, `${streakDays}-day streak milestone`);
    } else if (typeof addXP === 'function') {
      addXP(bonusXP);
    } else {
      const totalXP = parseInt(localStorage.getItem('totalXP')) || 0;
      localStorage.setItem('totalXP', (totalXP + bonusXP).toString());
    }
    
    this.showStreakMilestonePopup(streakDays, bonusXP);
  },

  /**
   * Show streak milestone celebration
   */
  showStreakMilestonePopup: function(days, bonusXP) {
    const popup = document.createElement('div');
    popup.className = 'streak-milestone-popup';
    popup.innerHTML = `
      <div class="streak-content">
        <div class="fire-icon">🔥</div>
        <h3>${days} Day Streak!</h3>
        <p>Your consistency is paying off!</p>
        <div class="streak-bonus">+${bonusXP} Bonus XP</div>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f6ad55', '#ed8936', '#dd6b20']
      });
    }
    
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => popup.remove(), 500);
    }, 4000);
  },

  /**
   * Display current streak
   */
  displayStreak: function() {
    const streak = this.checkStreak();
    
    document.querySelectorAll('[data-streak-display]').forEach(el => {
      el.innerHTML = `
        <span class="streak-fire">🔥</span>
        <span class="streak-number">${streak}</span>
        <span class="streak-label">day${streak !== 1 ? 's' : ''}</span>
      `;
    });
    
    // Update text-based streak displays
    document.querySelectorAll('[data-streak-count]').forEach(el => {
      el.textContent = streak;
    });
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  DAILY_STREAK.displayStreak();
});

// Export for use in other scripts
window.DAILY_STREAK = DAILY_STREAK;

