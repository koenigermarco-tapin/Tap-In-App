/**
 * Hub Unlock System - Progressive Content Unlocking
 * Bilingual support (English + German)
 * Manages course/tool unlocking based on XP and belt level
 */

(function() {
  'use strict';

  // ============================================
  // LANGUAGE DETECTION
  // ============================================
  const isGerman = window.location.pathname.includes('-de.html') ||
                   window.location.pathname.includes('-de/') ||
                   localStorage.getItem('preferredLanguage') === 'de';

  // ============================================
  // BELT HIERARCHY
  // ============================================
  const BELT_ORDER = ['white', 'blue', 'purple', 'brown', 'black'];

  const BELT_NAMES = isGerman ? {
    white: 'Weißgurt',
    blue: 'Blaugurt',
    purple: 'Lilagurt',
    brown: 'Braungurt',
    black: 'Schwarzgurt'
  } : {
    white: 'White Belt',
    blue: 'Blue Belt',
    purple: 'Purple Belt',
    brown: 'Brown Belt',
    black: 'Black Belt'
  };

  // ============================================
  // GERMAN UNLOCK REQUIREMENTS
  // ============================================
  const UNLOCK_TIERS_DE = {
    starter: {
      level: 'Starter',
      xpRequired: 0,
      beltRequired: null,
      message: '🟢 Immer verfügbar',
      courses: ['communication-mastery'],
      tools: ['mood-tracker'],
      courseLinks: {
        'communication-mastery': 'course-communication-mastery-de.html'
      }
    },
    bronze: {
      level: 'Bronze',
      xpRequired: 100,
      beltRequired: null,
      message: '🔓 Freigeschaltet bei 100 XP: Energiemanagement & Grenzen setzen',
      courses: ['energy-management', 'boundaries'],
      tools: ['journal'],
      courseLinks: {
        'energy-management': 'course-energy-management-de.html',
        'boundaries': 'course-boundaries-de.html'
      }
    },
    silver: {
      level: 'Silber',
      xpRequired: 300,
      beltRequired: 'blue',
      message: '🔓 Freigeschaltet bei 300 XP + Blaugurt: Feedbackkultur & Erwartungsmanagement',
      courses: ['feedback-culture', 'expectation-management'],
      tools: ['goal-tracker'],
      courseLinks: {
        'feedback-culture': 'course-feedback-culture-de.html',
        'expectation-management': 'course-expectation-management-de.html'
      }
    },
    gold: {
      level: 'Gold',
      xpRequired: 500,
      beltRequired: 'purple',
      message: '🔓 Freigeschaltet bei 500 XP + Lilagurt: Deep Work',
      courses: ['deep-work'],
      tools: [],
      courseLinks: {
        'deep-work': 'course-deep-work-de.html'
      }
    },
    platinum: {
      level: 'Platin',
      xpRequired: 750,
      beltRequired: 'brown',
      message: '🔓 Freigeschaltet bei 750 XP + Braungurt: Business Portal Zugang',
      courses: [],
      tools: [],
      special: ['business-portal'],
      courseLinks: {
        'business-portal': 'business-portal-de.html'
      }
    }
  };

  // ============================================
  // ENGLISH UNLOCK REQUIREMENTS
  // ============================================
  const UNLOCK_TIERS_EN = {
    starter: {
      level: 'Starter',
      xpRequired: 0,
      beltRequired: null,
      message: '🟢 Always available',
      courses: ['communication-mastery'],
      tools: ['mood-tracker'],
      courseLinks: {
        'communication-mastery': 'course-communication-mastery.html'
      }
    },
    bronze: {
      level: 'Bronze',
      xpRequired: 100,
      beltRequired: null,
      message: '🔓 Unlocked at 100 XP: Energy Management & Setting Boundaries',
      courses: ['energy-management', 'boundaries'],
      tools: ['journal'],
      courseLinks: {
        'energy-management': 'course-energy-management.html',
        'boundaries': 'course-boundaries.html'
      }
    },
    silver: {
      level: 'Silver',
      xpRequired: 300,
      beltRequired: 'blue',
      message: '🔓 Unlocked at 300 XP + Blue Belt: Feedback Culture & Expectation Management',
      courses: ['feedback-culture', 'expectation-management'],
      tools: ['goal-tracker'],
      courseLinks: {
        'feedback-culture': 'course-feedback-culture.html',
        'expectation-management': 'course-expectation-management.html'
      }
    },
    gold: {
      level: 'Gold',
      xpRequired: 500,
      beltRequired: 'purple',
      message: '🔓 Unlocked at 500 XP + Purple Belt: Deep Work',
      courses: ['deep-work'],
      tools: [],
      courseLinks: {
        'deep-work': 'course-deep-work.html'
      }
    },
    platinum: {
      level: 'Platinum',
      xpRequired: 750,
      beltRequired: 'brown',
      message: '🔓 Unlocked at 750 XP + Brown Belt: Business Portal Access',
      courses: [],
      tools: [],
      special: ['business-portal'],
      courseLinks: {
        'business-portal': 'business-portal.html'
      }
    }
  };

  // ============================================
  // UI TEXT
  // ============================================
  const UI_TEXT = isGerman ? {
    unlockRequirements: 'Freischaltungs-Anforderungen',
    yourProgress: 'Dein Fortschritt',
    nextUnlock: 'Nächste Freischaltung',
    xpRequired: 'Benötigte XP',
    beltRequired: 'Benötigter Gürtel',
    currentXP: 'Aktuelle XP',
    currentBelt: 'Aktueller Gürtel',
    locked: 'Gesperrt',
    unlocked: 'Freigeschaltet',
    available: 'Verfügbar',
    xpToGo: (remaining) => `Noch ${remaining} XP!`,
    beltNeeded: (belt) => `${BELT_NAMES[belt]} benötigt`,
    almostThere: 'Fast geschafft!',
    keepGoing: 'Weiter so!',
    newUnlock: '🎉 Neuer Inhalt freigeschaltet!',
    courseUnlocked: (course) => `✨ ${course} ist jetzt verfügbar!`,
    tierUnlocked: (tier) => `🏆 ${tier}-Tier erreicht!`,
    clickToUnlock: 'Klicke für Details'
  } : {
    unlockRequirements: 'Unlock Requirements',
    yourProgress: 'Your Progress',
    nextUnlock: 'Next Unlock',
    xpRequired: 'XP Required',
    beltRequired: 'Belt Required',
    currentXP: 'Current XP',
    currentBelt: 'Current Belt',
    locked: 'Locked',
    unlocked: 'Unlocked',
    available: 'Available',
    xpToGo: (remaining) => `${remaining} XP to go!`,
    beltNeeded: (belt) => `${BELT_NAMES[belt]} required`,
    almostThere: 'Almost there!',
    keepGoing: 'Keep going!',
    newUnlock: '🎉 New content unlocked!',
    courseUnlocked: (course) => `✨ ${course} is now available!`,
    tierUnlocked: (tier) => `🏆 ${tier} tier reached!`,
    clickToUnlock: 'Click for details'
  };

  // ============================================
  // SELECT LANGUAGE
  // ============================================
  const UNLOCK_TIERS = isGerman ? UNLOCK_TIERS_DE : UNLOCK_TIERS_EN;

  // ============================================
  // GET USER PROGRESS
  // ============================================
  function getUserProgress() {
    return {
      xp: parseInt(localStorage.getItem('totalXP') || '0'),
      belt: localStorage.getItem('beltLevel') || 'white'
    };
  }

  // ============================================
  // CHECK BELT REQUIREMENT
  // ============================================
  function meetsБeltRequirement(requiredBelt, userBelt) {
    if (!requiredBelt) return true;
    const requiredIndex = BELT_ORDER.indexOf(requiredBelt);
    const userIndex = BELT_ORDER.indexOf(userBelt);
    return userIndex >= requiredIndex;
  }

  // ============================================
  // CHECK IF TIER IS UNLOCKED
  // ============================================
  function isTierUnlocked(tierKey) {
    const tier = UNLOCK_TIERS[tierKey];
    const progress = getUserProgress();

    const hasXP = progress.xp >= tier.xpRequired;
    const hasBelt = meetsБeltRequirement(tier.beltRequired, progress.belt);

    return hasXP && hasBelt;
  }

  // ============================================
  // CHECK IF COURSE IS UNLOCKED
  // ============================================
  function isCourseUnlocked(courseId) {
    for (const tierKey of Object.keys(UNLOCK_TIERS)) {
      const tier = UNLOCK_TIERS[tierKey];
      const allCourses = [...(tier.courses || []), ...(tier.special || [])];

      if (allCourses.includes(courseId)) {
        return isTierUnlocked(tierKey);
      }
    }
    return true; // If not in any tier, assume unlocked
  }

  // ============================================
  // GET COURSE LINK
  // ============================================
  function getCourseLink(courseId) {
    for (const tierKey of Object.keys(UNLOCK_TIERS)) {
      const tier = UNLOCK_TIERS[tierKey];
      if (tier.courseLinks && tier.courseLinks[courseId]) {
        return tier.courseLinks[courseId];
      }
    }
    return '#';
  }

  // ============================================
  // GET UNLOCK STATUS FOR ALL TIERS
  // ============================================
  function getAllUnlockStatus() {
    const progress = getUserProgress();
    const status = {};

    for (const tierKey of Object.keys(UNLOCK_TIERS)) {
      const tier = UNLOCK_TIERS[tierKey];
      const isUnlocked = isTierUnlocked(tierKey);

      status[tierKey] = {
        ...tier,
        isUnlocked,
        xpRemaining: Math.max(0, tier.xpRequired - progress.xp),
        beltMet: meetsБeltRequirement(tier.beltRequired, progress.belt)
      };
    }

    return status;
  }

  // ============================================
  // GET NEXT UNLOCK
  // ============================================
  function getNextUnlock() {
    const progress = getUserProgress();

    for (const tierKey of Object.keys(UNLOCK_TIERS)) {
      if (!isTierUnlocked(tierKey)) {
        const tier = UNLOCK_TIERS[tierKey];
        return {
          tierKey,
          tier,
          xpRemaining: Math.max(0, tier.xpRequired - progress.xp),
          beltMet: meetsБeltRequirement(tier.beltRequired, progress.belt)
        };
      }
    }

    return null; // All tiers unlocked
  }

  // ============================================
  // RENDER LOCKED CARD OVERLAY
  // ============================================
  function renderLockedOverlay(courseId) {
    const tier = findTierForCourse(courseId);
    if (!tier) return '';

    const progress = getUserProgress();
    const xpRemaining = Math.max(0, tier.xpRequired - progress.xp);
    const beltMet = meetsБeltRequirement(tier.beltRequired, progress.belt);

    let requirementText = '';
    if (xpRemaining > 0 && !beltMet) {
      requirementText = `🔒 ${tier.xpRequired} XP + ${BELT_NAMES[tier.beltRequired]}`;
    } else if (xpRemaining > 0) {
      requirementText = `🔒 ${UI_TEXT.xpToGo(xpRemaining)}`;
    } else if (!beltMet) {
      requirementText = `🔒 ${UI_TEXT.beltNeeded(tier.beltRequired)}`;
    }

    return `
      <div class="locked-overlay" style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(26, 29, 46, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: inherit;
        z-index: 10;
      ">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
        <div style="color: #94a3b8; font-size: 0.9rem; text-align: center; padding: 0 1rem;">
          ${requirementText}
        </div>
      </div>
    `;
  }

  // ============================================
  // FIND TIER FOR COURSE
  // ============================================
  function findTierForCourse(courseId) {
    for (const tierKey of Object.keys(UNLOCK_TIERS)) {
      const tier = UNLOCK_TIERS[tierKey];
      const allCourses = [...(tier.courses || []), ...(tier.special || [])];
      if (allCourses.includes(courseId)) {
        return tier;
      }
    }
    return null;
  }

  // ============================================
  // CHECK FOR NEW UNLOCKS
  // ============================================
  function checkForNewUnlocks() {
    const lastCheckedXP = parseInt(localStorage.getItem('lastCheckedXP') || '0');
    const currentXP = parseInt(localStorage.getItem('totalXP') || '0');

    if (currentXP > lastCheckedXP) {
      // Check each tier
      for (const tierKey of Object.keys(UNLOCK_TIERS)) {
        const tier = UNLOCK_TIERS[tierKey];
        const wasLocked = lastCheckedXP < tier.xpRequired;
        const isNowUnlocked = isTierUnlocked(tierKey);

        if (wasLocked && isNowUnlocked) {
          showUnlockNotification(tier);
        }
      }

      localStorage.setItem('lastCheckedXP', currentXP);
    }
  }

  // ============================================
  // SHOW UNLOCK NOTIFICATION
  // ============================================
  function showUnlockNotification(tier) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 1.5rem 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
      z-index: 10000;
      animation: slideIn 0.5s ease;
      max-width: 350px;
    `;

    notification.innerHTML = `
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
      <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${UI_TEXT.newUnlock}</div>
      <div style="font-size: 1rem; opacity: 0.9;">${tier.message}</div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideIn 0.5s ease reverse';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }

  // ============================================
  // RENDER PROGRESS BAR
  // ============================================
  function renderProgressBar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const progress = getUserProgress();
    const nextUnlock = getNextUnlock();

    if (!nextUnlock) {
      container.innerHTML = `
        <div style="text-align: center; color: #10b981; font-weight: 600;">
          🏆 ${isGerman ? 'Alle Inhalte freigeschaltet!' : 'All content unlocked!'}
        </div>
      `;
      return;
    }

    const tier = nextUnlock.tier;
    const progressPercent = Math.min(100, (progress.xp / tier.xpRequired) * 100);

    container.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="color: #94a3b8; font-size: 0.9rem;">${UI_TEXT.nextUnlock}: ${tier.level}</span>
          <span style="color: #4a7c9c; font-weight: 600;">${progress.xp} / ${tier.xpRequired} XP</span>
        </div>
        <div style="background: #1a1d2e; border-radius: 8px; height: 12px; overflow: hidden;">
          <div style="
            background: linear-gradient(90deg, #4a7c9c 0%, #5a8cac 100%);
            height: 100%;
            width: ${progressPercent}%;
            border-radius: 8px;
            transition: width 0.5s ease;
          "></div>
        </div>
        <div style="text-align: right; margin-top: 0.25rem;">
          <span style="color: #94a3b8; font-size: 0.8rem;">
            ${UI_TEXT.xpToGo(tier.xpRequired - progress.xp)}
          </span>
        </div>
      </div>
      ${tier.beltRequired && !nextUnlock.beltMet ? `
        <div style="color: #fbbf24; font-size: 0.9rem; text-align: center;">
          ⚠️ ${UI_TEXT.beltNeeded(tier.beltRequired)}
        </div>
      ` : ''}
    `;
  }

  // ============================================
  // PUBLIC API
  // ============================================
  window.HubUnlockSystem = {
    isCourseUnlocked,
    isTierUnlocked,
    getCourseLink,
    getAllUnlockStatus,
    getNextUnlock,
    getUserProgress,
    renderLockedOverlay,
    renderProgressBar,
    checkForNewUnlocks,
    BELT_NAMES,
    UI_TEXT,
    isGerman
  };

  // ============================================
  // AUTO-INITIALIZE
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkForNewUnlocks);
  } else {
    checkForNewUnlocks();
  }

})();
