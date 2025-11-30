/**
 * TAP-IN XP Level System
 * Transforms raw XP into meaningful levels with titles and milestones
 */

const XP_LEVEL_SYSTEM = {
  levels: [
    { level: 1, xp_required: 0, title: "Beginner", next_xp: 100 },
    { level: 2, xp_required: 100, title: "Apprentice", next_xp: 250 },
    { level: 3, xp_required: 250, title: "Practitioner", next_xp: 500 },
    { level: 4, xp_required: 500, title: "Skilled", next_xp: 1000 },
    { level: 5, xp_required: 1000, title: "Dedicated", next_xp: 1500 },
    { level: 6, xp_required: 1500, title: "Advanced", next_xp: 2000 },
    { level: 7, xp_required: 2000, title: "Expert", next_xp: 3000 },
    { level: 8, xp_required: 3000, title: "Elite", next_xp: 4500 },
    { level: 9, xp_required: 4500, title: "Master", next_xp: 6000 },
    { level: 10, xp_required: 6000, title: "Grand Master", next_xp: null }
  ],

  /**
   * Get current level based on total XP
   */
  getCurrentLevel: function(totalXP) {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (totalXP >= this.levels[i].xp_required) {
        return this.levels[i];
      }
    }
    return this.levels[0];
  },

  /**
   * Get XP needed for next level
   */
  getXPForNextLevel: function(currentLevel) {
    const levelData = this.levels.find(l => l.level === currentLevel);
    return levelData ? levelData.next_xp : null;
  },

  /**
   * Calculate progress percentage to next level
   */
  getProgressToNextLevel: function(totalXP) {
    const currentLevel = this.getCurrentLevel(totalXP);
    const nextLevelXP = currentLevel.next_xp;
    
    if (!nextLevelXP) return 100; // Max level
    
    const currentLevelXP = currentLevel.xp_required;
    const xpInCurrentLevel = totalXP - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    
    return Math.min(100, (xpInCurrentLevel / xpNeededForLevel) * 100);
  },

  /**
   * Check if user leveled up and show popup
   */
  checkLevelUp: function(oldXP, newXP) {
    const oldLevel = this.getCurrentLevel(oldXP);
    const newLevel = this.getCurrentLevel(newXP);
    
    if (newLevel.level > oldLevel.level) {
      this.showLevelUpPopup(newLevel);
      return true;
    }
    return false;
  },

  /**
   * Show level-up celebration popup
   */
  showLevelUpPopup: function(levelData) {
    const popup = document.createElement('div');
    popup.className = 'level-up-popup';
    popup.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-icon">🎊</div>
        <h2>LEVEL UP!</h2>
        <div class="new-level">Level ${levelData.level}</div>
        <div class="level-title">${levelData.title}</div>
        <p>You're making incredible progress!</p>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF8C00']
      });
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => popup.remove(), 500);
    }, 5000);
  },

  /**
   * Update all level displays on page
   */
  updateLevelDisplays: function() {
    const totalXP = parseInt(localStorage.getItem('totalXP')) || 0;
    const levelData = this.getCurrentLevel(totalXP);
    const progress = this.getProgressToNextLevel(totalXP);
    
    // Update level text elements
    document.querySelectorAll('[data-level-display]').forEach(el => {
      el.textContent = `Level ${levelData.level}: ${levelData.title}`;
    });
    
    // Update level number elements
    document.querySelectorAll('[data-level-number]').forEach(el => {
      el.textContent = levelData.level;
    });
    
    // Update level title elements
    document.querySelectorAll('[data-level-title]').forEach(el => {
      el.textContent = levelData.title;
    });
    
    // Update progress to next level
    document.querySelectorAll('[data-level-progress]').forEach(el => {
      el.style.width = progress + '%';
    });
    
    // Update XP to next level text
    const nextLevelXP = levelData.next_xp;
    if (nextLevelXP) {
      document.querySelectorAll('[data-next-level-xp]').forEach(el => {
        const remaining = nextLevelXP - totalXP;
        el.textContent = `${remaining} XP to Level ${levelData.level + 1}`;
      });
    } else {
      document.querySelectorAll('[data-next-level-xp]').forEach(el => {
        el.textContent = 'Max Level Achieved!';
      });
    }
  }
};

// Hook into existing XP system
(function() {
  // Store old XP value
  let lastKnownXP = parseInt(localStorage.getItem('totalXP')) || 0;
  localStorage.setItem('lastKnownXP', lastKnownXP.toString());

  // Intercept XP changes
  const originalSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    
    if (key === 'totalXP') {
      const oldXP = parseInt(localStorage.getItem('lastKnownXP')) || 0;
      const newXP = parseInt(value) || 0;
      
      if (newXP > oldXP) {
        XP_LEVEL_SYSTEM.checkLevelUp(oldXP, newXP);
        XP_LEVEL_SYSTEM.updateLevelDisplays();
        localStorage.setItem('lastKnownXP', newXP.toString());
      }
    }
  };

  // Also hook into TapInGamification if it exists
  if (typeof window.TapInGamification !== 'undefined' && window.TapInGamification.awardXP) {
    const originalAwardXP = window.TapInGamification.awardXP;
    window.TapInGamification.awardXP = function(amount, reason) {
      const oldXP = parseInt(localStorage.getItem('totalXP')) || 0;
      const result = originalAwardXP.apply(this, arguments);
      const newXP = parseInt(localStorage.getItem('totalXP')) || 0;
      
      if (newXP > oldXP) {
        XP_LEVEL_SYSTEM.checkLevelUp(oldXP, newXP);
        XP_LEVEL_SYSTEM.updateLevelDisplays();
      }
      
      return result;
    };
  }
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  XP_LEVEL_SYSTEM.updateLevelDisplays();
});

// Export for use in other scripts
window.XP_LEVEL_SYSTEM = XP_LEVEL_SYSTEM;

