/**
 * German Wisdom Messages for "Nothing in Excess" System
 * Tyrolean "Du" form with Impact jargon
 *
 * Add to wisdom-tracker.js or import as module
 */

const wisdomMessagesDE = {
  gentle: {
    title: "🏛️ Denk an das Orakel",
    message: "\"Nichts im Übermaß\" - Du trainierst seit 30 Minuten. Toller Fortschritt!",
    suggestion: "Zieh in Erwägung, eine 5-minütige Pause einzulegen, damit das Gelernte sich setzen kann.",
    reward: null,
    buttons: {
      break: "Mach eine Pause",
      continue: "Training fortsetzen"
    }
  },
  moderate: {
    title: "🏛️ Weisheit aus Delphi",
    message: "\"Nichts im Übermaß\" - 45 Minuten fokussiertes Lernen. Beeindruckende Hingabe.",
    suggestion: "Mach eine 10-minütige Pause. Geh spazieren, atme, reflektiere über das Gelernte.",
    reward: "+10 XP für achtsame Praxis",
    buttons: {
      break: "Mach eine Pause",
      continue: "Training fortsetzen"
    }
  },
  strong: {
    title: "🏛️ Aktive Erholung freigeschaltet",
    message: "\"Nichts im Übermaß\" - 60 Minuten! Zeit für aktive Erholung.",
    suggestion: "Du hast +25 XP verdient und eine 15-minütige geführte Reflexion freigeschaltet.",
    reward: "+25 XP",
    buttons: {
      break: "Aktive Erholung starten",
      continue: "Weitermachen"
    }
  },
  hardcore: {
    title: "⚠️ Das Orakel spricht",
    message: "\"Nichts im Übermaß\" - 90+ Minuten überschreitet gesundes Lernen.",
    suggestion: "Selbst Kampfkünstler ruhen sich aus. Mach eine Pause. Das Training ist morgen noch da.",
    reward: "Keine XP-Strafe, aber Pause dringend empfohlen",
    buttons: {
      break: "Jetzt Pause machen",
      continue: "Ich verstehe das Risiko"
    }
  }
};

// Alert messages for wisdom system
const wisdomAlertsDE = {
  breakTaken: "🏛️ Weise Entscheidung. Ruhe ist Teil der Meisterschaft. Bis bald!",
  sessionPaused: "⏸️ Session pausiert. Dein Fortschritt ist gespeichert.",
  welcomeBack: "🥋 Willkommen zurück, Impact-Leader! Bereit für mehr Training?",
  xpAwarded: (xp) => `✨ +${xp} XP für achtsame Praxis verdient!`
};

// Modal UI text
const wisdomUIDE = {
  modalTitle: "Nichts im Übermaß",
  subtitle: "Antike Weisheit für moderne Meisterschaft",
  timerLabel: "Aktive Trainingszeit",
  breakLabel: "Empfohlene Pausendauer",
  minutes: "Min",
  hours: "Std",
  seconds: "Sek"
};

// Export for use in main wisdom-tracker.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { wisdomMessagesDE, wisdomAlertsDE, wisdomUIDE };
}
