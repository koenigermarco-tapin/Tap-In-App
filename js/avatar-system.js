/**
 * TAP-IN Avatar System
 * Visual character representation with belt colors, XP, and levels
 */

const AVATAR_SYSTEM = {
  // Belt color mapping
  beltColors: {
    'white': '#FFFFFF',
    'blue': '#1e40af',
    'purple': '#7c3aed',
    'brown': '#92400e',
    'black': '#1f2937'
  },
  
  // XP level thresholds
  xpLevels: [
    { level: 1, xp: 0, title: "Beginner" },
    { level: 2, xp: 100, title: "Apprentice" },
    { level: 3, xp: 250, title: "Practitioner" },
    { level: 4, xp: 500, title: "Skilled" },
    { level: 5, xp: 1000, title: "Dedicated" },
    { level: 6, xp: 1500, title: "Advanced" },
    { level: 7, xp: 2000, title: "Expert" },
    { level: 8, xp: 3000, title: "Elite" },
    { level: 9, xp: 4000, title: "Master" },
    { level: 10, xp: 5000, title: "Grand Master" },
    { level: 11, xp: 6000, title: "Champion" },
    { level: 12, xp: 7500, title: "Legend" },
    { level: 13, xp: 9000, title: "Sage" },
    { level: 14, xp: 11000, title: "Mentor" },
    { level: 15, xp: 13000, title: "Master Instructor" },
    { level: 16, xp: 15000, title: "Grand Master" },
    { level: 17, xp: 18000, title: "Legendary Master" },
    { level: 18, xp: 21000, title: "Supreme Master" },
    { level: 19, xp: 25000, title: "Ultimate Master" },
    { level: 20, xp: 30000, title: "Perfect Master" }
  ],
  
  /**
   * Get current belt from localStorage
   */
  getCurrentBelt: function() {
    // Check if user has completed any belt
    if (localStorage.getItem('blackBeltComplete') === 'true') return 'black';
    if (localStorage.getItem('brownBeltComplete') === 'true') return 'brown';
    if (localStorage.getItem('purpleBeltComplete') === 'true') return 'purple';
    if (localStorage.getItem('blueBeltComplete') === 'true') return 'blue';
    if (localStorage.getItem('whiteBeltComplete') === 'true') return 'white';
    
    // Check assessment result
    const assessment = localStorage.getItem('tapinBeltAssessment');
    if (assessment) {
      try {
        const result = JSON.parse(assessment);
        if (result.belt) {
          return result.belt.toLowerCase();
        }
      } catch (e) {
        console.warn('Error parsing assessment result:', e);
      }
    }
    
    // Default to white
    return 'white';
  },
  
  /**
   * Get total XP from localStorage
   */
  getTotalXP: function() {
    return parseInt(localStorage.getItem('totalXP')) || 0;
  },
  
  /**
   * Calculate current level from XP
   */
  getCurrentLevel: function(xp) {
    for (let i = this.xpLevels.length - 1; i >= 0; i--) {
      if (xp >= this.xpLevels[i].xp) {
        return this.xpLevels[i];
      }
    }
    return this.xpLevels[0];
  },
  
  /**
   * Get XP for next level
   */
  getNextLevelXP: function(currentLevel) {
    const currentIndex = this.xpLevels.findIndex(l => l.level === currentLevel);
    if (currentIndex < this.xpLevels.length - 1) {
      return this.xpLevels[currentIndex + 1].xp;
    }
    return this.xpLevels[currentIndex].xp; // Max level
  },
  
  /**
   * Initialize avatar on page load
   */
  init: function() {
    const totalXP = this.getTotalXP();
    const currentBelt = this.getCurrentBelt();
    const currentLevel = this.getCurrentLevel(totalXP);
    const nextLevelXP = this.getNextLevelXP(currentLevel.level);
    
    // Update belt color in SVG
    const beltElement = document.getElementById('userBelt');
    if (beltElement) {
      beltElement.style.fill = this.beltColors[currentBelt];
      beltElement.className = 'belt ' + currentBelt + '-belt';
    }
    
    // Update belt name
    const beltNameElement = document.getElementById('avatarBeltName');
    if (beltNameElement) {
      const beltName = currentBelt.charAt(0).toUpperCase() + currentBelt.slice(1);
      beltNameElement.textContent = `${beltName} Belt`;
    }
    
    // Update XP display
    const xpElement = document.getElementById('avatarXP');
    if (xpElement) {
      xpElement.textContent = `${totalXP} / ${nextLevelXP} XP`;
    }
    
    // Update level display
    const levelElement = document.getElementById('avatarLevel');
    if (levelElement) {
      levelElement.textContent = `Level ${currentLevel.level}: ${currentLevel.title}`;
    }
  },
  
  /**
   * Update avatar when XP changes
   */
  update: function() {
    this.init(); // Re-initialize with new values
  },
  
  /**
   * Check for level up and show celebration
   */
  checkLevelUp: function() {
    const totalXP = this.getTotalXP();
    const currentLevel = this.getCurrentLevel(totalXP);
    const lastLevel = parseInt(localStorage.getItem('lastKnownLevel')) || 1;
    
    if (currentLevel.level > lastLevel) {
      localStorage.setItem('lastKnownLevel', currentLevel.level.toString());
      this.showLevelUpCelebration(currentLevel);
      return true;
    }
    
    return false;
  },
  
  /**
   * Show level up celebration
   */
  showLevelUpCelebration: function(level) {
    // Create celebration popup
    const popup = document.createElement('div');
    popup.className = 'level-up-popup';
    popup.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-icon">🎉</div>
        <h2>Level Up!</h2>
        <p class="level-up-level">Level ${level.level}</p>
        <p class="level-up-title">${level.title}</p>
        <div class="level-up-xp">+${level.level * 10} XP Bonus!</div>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger confetti if available
    if (typeof triggerConfetti === 'function') {
      triggerConfetti();
    }
    
    // Show animation
    setTimeout(() => {
      popup.classList.add('show');
    }, 100);
    
    // Remove after animation
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 500);
    }, 4000);
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  AVATAR_SYSTEM.init();
  AVATAR_SYSTEM.checkLevelUp();
});

// Export for use in other scripts
window.AVATAR_SYSTEM = AVATAR_SYSTEM;
