/**
 * Progress Sync Initialization
 * Ensures all systems work together
 */

const ProgressSyncInit = {
  async init() {
    console.log('🔄 Initializing all progress systems...');
    
    // 1. Check localStorage health
    this.checkStorageHealth();
    
    // 2. Initialize core systems
    await this.initializeSystems();
    
    // 3. Sync everything
    this.syncAllProgress();
    
    console.log('✅ All systems ready!');
  },
  
  checkStorageHealth() {
    const required = ['totalXP', 'currentBelt', 'currentStripe'];
    const missing = required.filter(key => !localStorage.getItem(key));
    
    if (missing.length > 0) {
      console.warn('⚠️ Missing storage keys:', missing);
      this.initializeStorage();
    }
  },
  
  initializeStorage() {
    const defaults = {
      totalXP: '0',
      currentBelt: 'white',
      currentStripe: '1',
      completedLessons: '[]',
      userName: 'Warrior_' + Math.floor(Math.random() * 9999),
      beltLevel: 'white',
      assessmentTotal: '0',
      currentStreak: '0',
      longestStreak: '0',
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    
    Object.entries(defaults).forEach(([key, value]) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, value);
      }
    });
  },
  
  async initializeSystems() {
    // Belt Progression
    if (typeof BeltProgression !== 'undefined') {
      BeltProgression.init();
    }
    
    // Gamification
    if (typeof updateXPDisplay === 'function') {
      updateXPDisplay();
    }
    
    // Wisdom Tracker
    if (typeof WisdomTracker !== 'undefined') {
      WisdomTracker.init();
    }
    
    // Hub Unlock
    if (typeof HubUnlockSystem !== 'undefined') {
      HubUnlockSystem.init();
    }
  },
  
  syncAllProgress() {
    // Trigger any pending syncs
    if (typeof StorageManager !== 'undefined' && StorageManager.cloudSyncEnabled) {
      StorageManager.syncToCloud().catch(console.error);
    }
  }
};

// Auto-initialize on every page
document.addEventListener('DOMContentLoaded', () => {
  ProgressSyncInit.init();
});

window.ProgressSyncInit = ProgressSyncInit;

