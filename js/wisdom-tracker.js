// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAP-IN WISDOM TRACKER - "NOTHING IN EXCESS" (μηδὲν ἄγαν)
// Active Recovery System for Sustainable Learning
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const WisdomTracker = {
  
  // Session tracking
  sessionStart: null,
  
  // Thresholds (in minutes)
  thresholds: {
    gentle: 30,    // Gentle reminder after 30 min
    moderate: 45,  // Stronger suggestion after 45 min
    strong: 60,    // Active rest reward after 60 min
    hardcore: 90   // Concern message after 90 min
  },
  
  // Initialize on page load
  init() {
    this.sessionStart = parseInt(localStorage.getItem('sessionStart')) || Date.now();
    localStorage.setItem('sessionStart', this.sessionStart);
    this.startMonitoring();
  },
  
  // Calculate session duration
  getSessionDuration() {
    const now = Date.now();
    const duration = (now - this.sessionStart) / 1000 / 60; // in minutes
    return Math.round(duration);
  },
  
  // Check if we should show wisdom reminder
  checkWisdom() {
    const duration = this.getSessionDuration();
    const lastReminder = parseInt(localStorage.getItem('lastWisdomReminder')) || 0;
    const timeSinceReminder = (Date.now() - lastReminder) / 1000 / 60;
    
    // Don't show reminders more than once per 15 minutes
    if (timeSinceReminder < 15) return;
    
    if (duration >= this.thresholds.hardcore && !this.hasShownReminder('hardcore')) {
      this.showWisdomModal('hardcore');
    } else if (duration >= this.thresholds.strong && !this.hasShownReminder('strong')) {
      this.showWisdomModal('strong');
    } else if (duration >= this.thresholds.moderate && !this.hasShownReminder('moderate')) {
      this.showWisdomModal('moderate');
    } else if (duration >= this.thresholds.gentle && !this.hasShownReminder('gentle')) {
      this.showWisdomModal('gentle');
    }
  },
  
  // Track which reminders shown this session
  hasShownReminder(level) {
    const shown = JSON.parse(localStorage.getItem('wisdomRemindersShown') || '[]');
    return shown.includes(level);
  },
  
  // Mark reminder as shown
  markReminderShown(level) {
    const shown = JSON.parse(localStorage.getItem('wisdomRemindersShown') || '[]');
    shown.push(level);
    localStorage.setItem('wisdomRemindersShown', JSON.stringify(shown));
    localStorage.setItem('lastWisdomReminder', Date.now());
  },
  
  // Show wisdom modal
  showWisdomModal(level) {
    const messages = {
      gentle: {
        title: "🏛️ Remember the Oracle",
        message: "\"Nothing in Excess\" - You've been training for 30 minutes. Great progress!",
        suggestion: "Consider taking a 5-minute break to let the learning settle.",
        reward: null,
        canDismiss: true
      },
      moderate: {
        title: "🏛️ Wisdom from Delphi",
        message: "\"Nothing in Excess\" - 45 minutes of focused learning. Impressive dedication.",
        suggestion: "Take a 10-minute break. Walk, breathe, reflect on what you've learned.",
        reward: "+10 XP for mindful practice",
        canDismiss: true
      },
      strong: {
        title: "🏛️ Active Rest Unlocked",
        message: "\"Nothing in Excess\" - 60 minutes! Time for active recovery.",
        suggestion: "You've earned +25 XP and unlocked a 15-minute guided reflection.",
        reward: "+25 XP",
        canDismiss: true
      },
      hardcore: {
        title: "⚠️ The Oracle Speaks",
        message: "\"Nothing in Excess\" - 90+ minutes is beyond healthy learning.",
        suggestion: "Even martial artists rest. Take a break. The training will be here tomorrow.",
        reward: "No XP penalty, but strongly recommended break",
        canDismiss: true
      }
    };
    
    const config = messages[level];
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'wisdom-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(4px);
    `;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'wisdom-modal';
    modal.style.cssText = `
      background: linear-gradient(135deg, #2d3548 0%, #252940 100%);
      border: 2px solid #4a7c9c;
      border-radius: 16px;
      padding: 3rem;
      max-width: 500px;
      text-align: center;
      animation: slideIn 0.3s ease;
      position: relative;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `;
    
    modal.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: 1rem;">${config.title.includes('⚠️') ? '⚠️' : '🏛️'}</div>
      <h3 style="color: #4a7c9c; font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700;">
        ${config.title.replace('🏛️ ', '').replace('⚠️ ', '')}
      </h3>
      <p style="color: #94a3b8; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">
        ${config.message}
      </p>
      <p style="color: #e2e8f0; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6;">
        ${config.suggestion}
      </p>
      ${config.reward && config.reward.includes('XP') ? `
        <div style="background: rgba(74, 124, 156, 0.2); padding: 1rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #4a7c9c;">
          <span style="color: #fbbf24; font-weight: 600;">${config.reward}</span>
        </div>
      ` : ''}
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button onclick="WisdomTracker.takeBreak('${level}')" style="
          background: #4a7c9c;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        " onmouseover="this.style.background='#5a8cac'; this.style.transform='translateY(-2px)'" 
           onmouseout="this.style.background='#4a7c9c'; this.style.transform='translateY(0)'">
          Take a Break
        </button>
        ${config.canDismiss ? `
          <button onclick="WisdomTracker.dismissReminder('${level}')" style="
            background: transparent;
            color: #94a3b8;
            border: 2px solid #3d4466;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1rem;
          " onmouseover="this.style.borderColor='#4a7c9c'; this.style.color='#e2e8f0'" 
             onmouseout="this.style.borderColor='#3d4466'; this.style.color='#94a3b8'">
            Continue Training
          </button>
        ` : ''}
      </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    this.markReminderShown(level);
    
    // Award XP if applicable
    if (config.reward && config.reward.includes('XP')) {
      const xpMatch = config.reward.match(/\+(\d+)/);
      if (xpMatch) {
        const xpAmount = parseInt(xpMatch[1]);
        const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
        localStorage.setItem('totalXP', currentXP + xpAmount);
      }
    }
  },
  
  // User takes break
  takeBreak(level) {
    const overlay = document.querySelector('.wisdom-modal-overlay');
    if (overlay) overlay.remove();
    
    // Reset session timer
    localStorage.setItem('sessionStart', Date.now());
    this.sessionStart = Date.now();
    localStorage.setItem('wisdomRemindersShown', JSON.stringify([]));
    
    // Show affirmation
    this.showAffirmation('🏛️ Wise choice. Rest is part of mastery. See you soon!');
  },
  
  // User dismisses reminder
  dismissReminder(level) {
    const overlay = document.querySelector('.wisdom-modal-overlay');
    if (overlay) overlay.remove();
  },
  
  // Show affirmation message
  showAffirmation(message) {
    const affirmation = document.createElement('div');
    affirmation.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #4a7c9c 0%, #2d5a7b 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(74, 124, 156, 0.3);
      z-index: 10001;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
    `;
    affirmation.textContent = message;
    document.body.appendChild(affirmation);
    
    setTimeout(() => {
      affirmation.style.opacity = '0';
      affirmation.style.transform = 'translateX(400px)';
      affirmation.style.transition = 'all 0.3s ease';
      setTimeout(() => affirmation.remove(), 300);
    }, 4000);
  },
  
  // Start monitoring (check every 5 minutes)
  startMonitoring() {
    // Check immediately on load
    setTimeout(() => this.checkWisdom(), 5000); // After 5 seconds
    
    // Then check every 5 minutes
    setInterval(() => {
      this.checkWisdom();
    }, 5 * 60 * 1000); // Every 5 minutes
  },
  
  // Reset on new session (call this on page navigation)
  resetSession() {
    localStorage.setItem('sessionStart', Date.now());
    localStorage.setItem('wisdomRemindersShown', JSON.stringify([]));
  },
  
  // Get session stats (for debugging/display)
  getSessionStats() {
    return {
      duration: this.getSessionDuration(),
      remindersShown: JSON.parse(localStorage.getItem('wisdomRemindersShown') || '[]'),
      lastReminder: new Date(parseInt(localStorage.getItem('lastWisdomReminder') || '0')).toLocaleString()
    };
  }
};

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Auto-initialize
if (typeof window !== 'undefined') {
  window.WisdomTracker = WisdomTracker;
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WisdomTracker.init());
  } else {
    WisdomTracker.init();
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WisdomTracker;
}

