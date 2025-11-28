/**
 * German Hub Unlock Messages for Progressive Unlocking System
 * Tyrolean "Du" form with Impact jargon
 *
 * Add to hub-unlock-system.js or import as module
 */

const HUB_UNLOCK_REQUIREMENTS_DE = {
  // Tier 1: Starter (Always unlocked)
  starter: {
    level: "Starter",
    xpRequired: 0,
    beltRequired: null,
    message: "🟢 Immer verfügbar: Kommunikationsmeisterschaft",
    courses: ["Kommunikationsmeisterschaft"]
  },

  // Tier 2: Bronze
  bronze: {
    level: "Bronze",
    xpRequired: 100,
    beltRequired: null,
    message: "🔓 Freigeschaltet bei 100 XP: Energiemanagement & Grenzen setzen",
    courses: ["Energiemanagement", "Grenzen setzen"]
  },

  // Tier 3: Silver
  silver: {
    level: "Silber",
    xpRequired: 300,
    beltRequired: "blue",
    message: "🔓 Freigeschaltet bei 300 XP + Blaugurt: Feedbackkultur & Erwartungsmanagement",
    courses: ["Feedbackkultur", "Erwartungsmanagement"]
  },

  // Tier 4: Gold
  gold: {
    level: "Gold",
    xpRequired: 500,
    beltRequired: "purple",
    message: "🔓 Freigeschaltet bei 500 XP + Lilagurt: Deep Work",
    courses: ["Deep Work"]
  },

  // Tier 5: Platinum
  platinum: {
    level: "Platin",
    xpRequired: 750,
    beltRequired: "brown",
    message: "🔓 Freigeschaltet bei 750 XP + Braungurt: Business Portal Zugang",
    courses: ["Business Portal"]
  }
};

// Belt names in German
const BELT_NAMES_DE = {
  white: "Weißgurt",
  blue: "Blaugurt",
  purple: "Lilagurt",
  brown: "Braungurt",
  black: "Schwarzgurt"
};

// UI text for unlock system
const HUB_UNLOCK_UI_DE = {
  // Section headers
  unlockRequirements: "Freischaltungs-Anforderungen",
  yourProgress: "Dein Fortschritt",
  nextUnlock: "Nächste Freischaltung",

  // Status labels
  locked: "Gesperrt",
  unlocked: "Freigeschaltet",
  available: "Verfügbar",
  comingSoon: "Bald verfügbar",

  // Requirements
  xpRequired: "Benötigte XP",
  beltRequired: "Benötigter Gürtel",
  currentXP: "Aktuelle XP",
  currentBelt: "Aktueller Gürtel",

  // Progress messages
  xpToGo: (remaining) => `Noch ${remaining} XP bis zur Freischaltung!`,
  beltNeeded: (belt) => `${BELT_NAMES_DE[belt]} benötigt`,
  almostThere: "Fast geschafft!",
  keepGoing: "Weiter so!",

  // Unlock notifications
  newUnlock: "🎉 Neuer Inhalt freigeschaltet!",
  courseUnlocked: (course) => `✨ ${course} ist jetzt verfügbar!`,
  tierUnlocked: (tier) => `🏆 ${tier}-Tier erreicht!`
};

// Locked course card messages
const LOCKED_CARD_MESSAGES_DE = {
  xpOnly: (xp) => `🔒 Schalte frei bei ${xp} XP`,
  beltOnly: (belt) => `🔒 Benötigt ${BELT_NAMES_DE[belt]}`,
  xpAndBelt: (xp, belt) => `🔒 ${xp} XP + ${BELT_NAMES_DE[belt]} benötigt`,
  clickToSee: "Klicke für Details"
};

// Tooltip messages
const UNLOCK_TOOLTIPS_DE = {
  locked: "Dieser Kurs ist noch gesperrt. Erfülle die Anforderungen, um ihn freizuschalten.",
  almostUnlocked: "Du bist fast da! Noch ein bisschen und dieser Kurs gehört dir.",
  justUnlocked: "Gerade freigeschaltet! Starte jetzt deinen Lernpfad.",
  completed: "Abgeschlossen! Du hast diesen Kurs gemeistert."
};

// Export for use in main hub-unlock-system.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HUB_UNLOCK_REQUIREMENTS_DE,
    BELT_NAMES_DE,
    HUB_UNLOCK_UI_DE,
    LOCKED_CARD_MESSAGES_DE,
    UNLOCK_TOOLTIPS_DE
  };
}
