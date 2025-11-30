/**
 * TAP-IN Enhanced Celebrations
 * Different confetti styles for different achievement types
 */

// Confetti library must be loaded: https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js

const CELEBRATIONS = {
  /**
   * Lesson completion - subtle
   */
  lessonComplete: function() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  },

  /**
   * Stripe completion - medium
   */
  stripeComplete: function() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#667eea', '#764ba2', '#f093fb']
      });
    }
  },

  /**
   * Belt completion - BIG
   */
  beltComplete: function() {
    if (typeof confetti === 'function') {
      // Fire from both sides
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
      
      // Center burst
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#FF8C00', '#f6ad55', '#ed8936']
        });
      }, 250);
    }
  },

  /**
   * Level up - gold confetti
   */
  levelUp: function() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF8C00']
      });
    }
  },

  /**
   * Achievement unlocked
   */
  achievement: function() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#38a169', '#48bb78', '#68d391']
      });
    }
  },

  /**
   * Streak milestone
   */
  streakMilestone: function() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f6ad55', '#ed8936', '#dd6b20']
      });
    }
  },

  /**
   * Quiz perfect score
   */
  perfectScore: function() {
    if (typeof confetti === 'function') {
      // Double burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#667eea', '#764ba2']
        });
      }, 200);
    }
  }
};

// Export for global use
window.CELEBRATIONS = CELEBRATIONS;

