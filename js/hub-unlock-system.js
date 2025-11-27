// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAP-IN HUB UNLOCK SYSTEM - PROGRESSIVE CONTENT UNLOCKING
// Prevents overwhelm, creates clear progression
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Unlock Requirements Configuration
const HUB_UNLOCK_REQUIREMENTS = {
  
  // ALWAYS UNLOCKED (Tier 0)
  starter: {
    courses: ['communication-mastery'], // First 8 lessons
    tools: ['mood-tracker'],
    xpRequired: 0,
    beltRequired: 'white',
    message: "✅ Unlocked: Your starting resources"
  },
  
  // TIER 1: Early Progress
  bronze: {
    courses: ['energy-management', 'boundaries'],
    tools: ['journal'],
    xpRequired: 100,  // Complete Communication Mastery (8 lessons × 25 XP avg = ~200 XP)
    beltRequired: 'white',
    message: "🔓 Unlocked at 100 XP: Energy Management & Boundaries"
  },
  
  // TIER 2: Building Momentum
  silver: {
    courses: ['feedback-culture', 'expectation-management'],
    tools: ['goal-tracker'],
    xpRequired: 300,  // ~15 lessons completed
    beltRequired: 'blue',
    message: "🔓 Unlocked at 300 XP + Blue Belt: Feedback Culture & Expectation Management"
  },
  
  // TIER 3: Advanced Practice
  gold: {
    courses: ['deep-work'],
    tools: [],
    xpRequired: 500,  // ~25 lessons completed
    beltRequired: 'purple',
    message: "🔓 Unlocked at 500 XP + Purple Belt: Deep Work"
  },
  
  // TIER 4: Business Portal (Special)
  platinum: {
    special: ['business-portal'],
    xpRequired: 750,
    beltRequired: 'brown',
    message: "🔓 Unlocked at 750 XP + Brown Belt: Business Portal Access"
  }
};

const HubUnlockSystem = {
  
  // Check if content is unlocked
  isUnlocked(contentId) {
    const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
    const currentBelt = localStorage.getItem('beltLevel') || localStorage.getItem('currentBelt') || 'white';
    
    // Find which tier this content belongs to
    for (const [tier, config] of Object.entries(HUB_UNLOCK_REQUIREMENTS)) {
      if (config.courses && config.courses.includes(contentId)) {
        return currentXP >= config.xpRequired && this.beltMeetsRequirement(currentBelt, config.beltRequired);
      }
      if (config.tools && config.tools.includes(contentId)) {
        return currentXP >= config.xpRequired && this.beltMeetsRequirement(currentBelt, config.beltRequired);
      }
      if (config.special && config.special.includes(contentId)) {
        return currentXP >= config.xpRequired && this.beltMeetsRequirement(currentBelt, config.beltRequired);
      }
    }
    
    return true; // If not found in any tier, assume unlocked (safety)
  },
  
  // Check if current belt meets requirement
  beltMeetsRequirement(currentBelt, requiredBelt) {
    const beltOrder = ['white', 'blue', 'purple', 'brown', 'black'];
    const currentIndex = beltOrder.indexOf(currentBelt);
    const requiredIndex = beltOrder.indexOf(requiredBelt);
    return currentIndex >= requiredIndex;
  },
  
  // Get unlock requirements for locked content
  getUnlockRequirements(contentId) {
    for (const [tier, config] of Object.entries(HUB_UNLOCK_REQUIREMENTS)) {
      if (config.courses?.includes(contentId) || config.tools?.includes(contentId) || config.special?.includes(contentId)) {
        return {
          xpRequired: config.xpRequired,
          beltRequired: config.beltRequired,
          message: config.message,
          tier: tier
        };
      }
    }
    return null;
  },
  
  // Get next unlock milestone
  getNextUnlock() {
    const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
    const currentBelt = localStorage.getItem('beltLevel') || localStorage.getItem('currentBelt') || 'white';
    
    // Find next tier to unlock
    for (const [tier, config] of Object.entries(HUB_UNLOCK_REQUIREMENTS)) {
      if (currentXP < config.xpRequired || !this.beltMeetsRequirement(currentBelt, config.beltRequired)) {
        const xpNeeded = Math.max(0, config.xpRequired - currentXP);
        const beltNeeded = this.beltMeetsRequirement(currentBelt, config.beltRequired) ? null : config.beltRequired;
        
        return {
          tier: tier,
          xpNeeded: xpNeeded,
          beltNeeded: beltNeeded,
          message: config.message,
          courses: config.courses || [],
          tools: config.tools || [],
          special: config.special || []
        };
      }
    }
    
    return null; // Everything unlocked
  },
  
  // Render locked card
  renderLockedCard(contentId, contentName, contentType = 'course', iconEmoji = '📚') {
    const requirements = this.getUnlockRequirements(contentId);
    if (!requirements) return ''; // Safety check
    
    const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
    const currentBelt = localStorage.getItem('beltLevel') || localStorage.getItem('currentBelt') || 'white';
    const xpMet = currentXP >= requirements.xpRequired;
    const beltMet = this.beltMeetsRequirement(currentBelt, requirements.beltRequired);
    
    return `
      <div class="course-card locked" style="
        opacity: 0.6;
        position: relative;
        cursor: not-allowed;
        background: #1a1d2e;
        border: 2px solid #3d4466;
        border-radius: 12px;
        padding: 2rem;
        transition: all 0.3s ease;
      ">
        <div style="position: absolute; top: 1rem; right: 1rem; font-size: 2rem;">🔒</div>
        <div class="course-icon" style="
          filter: grayscale(100%);
          font-size: 2.5rem;
          margin-bottom: 1rem;
        ">
          ${iconEmoji}
        </div>
        <h3 style="color: #94a3b8; margin-bottom: 1rem; font-size: 1.2rem;">${contentName}</h3>
        <div class="unlock-requirements" style="
          background: rgba(74, 124, 156, 0.2);
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          border: 1px solid #3d4466;
        ">
          <div style="font-weight: 600; margin-bottom: 0.5rem; color: #4a7c9c; font-size: 0.9rem;">
            Unlock Requirements:
          </div>
          <div style="color: ${xpMet ? '#10b981' : '#ef4444'}; margin-bottom: 0.3rem; font-size: 0.85rem;">
            ${xpMet ? '✅' : '❌'} ${requirements.xpRequired} XP ${!xpMet ? `(${currentXP}/${requirements.xpRequired})` : ''}
          </div>
          <div style="color: ${beltMet ? '#10b981' : '#ef4444'}; font-size: 0.85rem;">
            ${beltMet ? '✅' : '❌'} ${this.capitalize(requirements.beltRequired)} Belt Required
          </div>
        </div>
      </div>
    `;
  },
  
  // Capitalize first letter
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  // Get progress percentage to next unlock
  getProgressToNextUnlock() {
    const nextUnlock = this.getNextUnlock();
    if (!nextUnlock) return 100; // Everything unlocked
    
    const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
    const requiredXP = nextUnlock.xpNeeded + currentXP;
    
    if (nextUnlock.xpNeeded === 0) return 100; // XP met, just need belt
    
    return Math.round((currentXP / requiredXP) * 100);
  },
  
  // Create next unlock banner HTML
  createNextUnlockBanner() {
    const nextUnlock = this.getNextUnlock();
    if (!nextUnlock) {
      return `
        <div class="next-unlock-banner" style="
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          text-align: center;
        ">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
          <div style="font-weight: 700; margin-bottom: 0.5rem; color: white; font-size: 1.2rem;">
            All Content Unlocked!
          </div>
          <div style="color: rgba(255,255,255,0.9);">
            You've unlocked everything in The Hub. Keep training!
          </div>
        </div>
      `;
    }
    
    const progress = this.getProgressToNextUnlock();
    
    return `
      <div class="next-unlock-banner" style="
        background: linear-gradient(135deg, #4a7c9c 0%, #2d5a7b 100%);
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        text-align: center;
      ">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎯</div>
        <div style="font-weight: 600; margin-bottom: 0.5rem; color: white;">Next Unlock</div>
        <div style="color: rgba(255,255,255,0.9); margin-bottom: 1rem;">
          ${nextUnlock.message}
        </div>
        ${nextUnlock.xpNeeded > 0 ? `
          <div style="margin-top: 1rem; color: rgba(255,255,255,0.8); margin-bottom: 0.5rem;">
            ${nextUnlock.xpNeeded} XP to go!
          </div>
          <div style="
            background: rgba(0,0,0,0.2);
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 0.5rem;
          ">
            <div style="
              background: #10b981;
              height: 100%;
              width: ${progress}%;
              transition: width 0.3s ease;
            "></div>
          </div>
        ` : nextUnlock.beltNeeded ? `
          <div style="margin-top: 1rem; color: rgba(255,255,255,0.8);">
            Earn ${this.capitalize(nextUnlock.beltNeeded)} Belt to unlock!
          </div>
        ` : ''}
      </div>
    `;
  },
  
  // Initialize unlock system on hub pages
  initializeHub() {
    // This will be called from hub-home-BUSINESS.html
    console.log('Hub Unlock System initialized');
  }
};

// Make globally available
if (typeof window !== 'undefined') {
  window.HubUnlockSystem = HubUnlockSystem;
  window.HUB_UNLOCK_REQUIREMENTS = HUB_UNLOCK_REQUIREMENTS;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HubUnlockSystem, HUB_UNLOCK_REQUIREMENTS };
}

