/**
 * Invite System - Team Referral & Tracking
 * Bilingual support (English + German)
 * Manages invite codes, tracking, and personalized messages
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
  // BELT NAMES
  // ============================================
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
  // DYSFUNCTION NAMES
  // ============================================
  const DYSFUNCTION_NAMES = isGerman ? {
    trust: 'Vertrauen',
    conflict: 'Konflikt',
    commitment: 'Verbindlichkeit',
    accountability: 'Verantwortung',
    results: 'Ergebnisse'
  } : {
    trust: 'Trust',
    conflict: 'Conflict',
    commitment: 'Commitment',
    accountability: 'Accountability',
    results: 'Results'
  };

  // ============================================
  // UI TEXT
  // ============================================
  const UI_TEXT = isGerman ? {
    // Invite page
    inviteYourTeam: 'Lade dein Team ein',
    helpTeammates: 'Hilf deinen Teamkollegen, ihr Impact-Level zu entdecken',
    teamsGrowTogether: 'Teams, die sich gemeinsam bewerten, wachsen gemeinsam',
    sendEmailInvites: 'E-Mail-Einladungen versenden',
    emailPlaceholder: 'kollege@firma.com',
    addAnotherEmail: 'Weitere E-Mail hinzufügen',
    personalMessage: 'Persönliche Nachricht (optional)',
    personalMessagePlaceholder: 'Füge eine persönliche Notiz hinzu...',
    sendInvites: 'Einladungen versenden',
    or: 'ODER',
    shareUniqueLink: 'Teile deinen einzigartigen Link',
    copyLinkDesc: 'Kopiere diesen Link und teile ihn überall — Slack, LinkedIn, E-Mail oder SMS',
    copyLink: 'Link kopieren',
    linkCopied: 'Kopiert! ✓',
    loading: 'Lädt...',

    // Stats
    yourInviteStats: 'Deine Einladungs-Statistik',
    invitesSent: 'Einladungen versendet',
    linksOpened: 'Links geöffnet',
    assessmentsCompleted: 'Bewertungen abgeschlossen',
    conversionRate: 'Konversionsrate',

    // Badges
    inviteBadges: 'Einladungs-Abzeichen',
    completions: 'Abschlüsse',
    badgeNames: {
      first: 'Erste Einladung',
      connector: 'Verbinder',
      networker: 'Netzwerker',
      influencer: 'Influencer',
      legend: 'Legende'
    },

    // Rewards
    earnXP: 'Verdiene +50 XP für jeden Teamkollegen, der die Bewertung über deine Einladung abschließt!',
    unlockBadges: 'Schalte Abzeichen frei und klettere die Rangliste hoch, während deine Einladungen wachsen.',

    // Alerts
    maxEmails: 'Maximal 10 E-Mail-Adressen erlaubt',
    fixInvalidEmails: 'Bitte korrigiere ungültige E-Mail-Adressen',
    enterAtLeastOne: 'Bitte gib mindestens eine E-Mail-Adresse ein',
    invitesSentSuccess: (count) => `✅ Erfolg! Einladungen an ${count} Teamkollegen versendet`,

    // Landing page
    youveBeenInvited: 'Du wurdest eingeladen',
    invitedBy: (name) => `${name} lädt dich ein, dein Impact-Level zu entdecken!`,
    joinTeammates: (count) => `Schließ dich ${count} Teamkollegen an, die die Bewertung bereits absolviert haben`,
    startMyAssessment: 'Meine Bewertung starten',

    // Benefits
    minutes10: '10 Minuten',
    scienceBacked: 'Wissenschaftlich fundiert (Google-Forschung)',
    personalizedPath: 'Personalisierter Lernpfad',
    freeAssessment: '100% kostenlos'
  } : {
    // Invite page
    inviteYourTeam: 'Invite Your Team',
    helpTeammates: 'Help your teammates discover their Impact-Level',
    teamsGrowTogether: 'Teams that assess together, grow together',
    sendEmailInvites: 'Send Email Invites',
    emailPlaceholder: 'teammate@company.com',
    addAnotherEmail: 'Add Another Email',
    personalMessage: 'Personal Message (optional)',
    personalMessagePlaceholder: 'Add a personal note...',
    sendInvites: 'Send Invites',
    or: 'OR',
    shareUniqueLink: 'Share Your Unique Link',
    copyLinkDesc: 'Copy this link and share it anywhere — Slack, LinkedIn, email, or text',
    copyLink: 'Copy Link',
    linkCopied: 'Copied! ✓',
    loading: 'Loading...',

    // Stats
    yourInviteStats: 'Your Invite Stats',
    invitesSent: 'Invites Sent',
    linksOpened: 'Links Opened',
    assessmentsCompleted: 'Assessments Completed',
    conversionRate: 'Conversion Rate',

    // Badges
    inviteBadges: 'Invite Badges',
    completions: 'completions',
    badgeNames: {
      first: 'First Invite',
      connector: 'Connector',
      networker: 'Networker',
      influencer: 'Influencer',
      legend: 'Legend'
    },

    // Rewards
    earnXP: 'Earn +50 XP for each teammate who completes the assessment through your invite!',
    unlockBadges: 'Unlock badges and climb the leaderboard as your invite count grows.',

    // Alerts
    maxEmails: 'Maximum 10 email addresses allowed',
    fixInvalidEmails: 'Please fix invalid email addresses',
    enterAtLeastOne: 'Please enter at least one email address',
    invitesSentSuccess: (count) => `✅ Success! Invites sent to ${count} teammate(s)`,

    // Landing page
    youveBeenInvited: "You've Been Invited",
    invitedBy: (name) => `${name} invited you to discover your Impact-Level!`,
    joinTeammates: (count) => `Join ${count} teammates who've already taken the assessment`,
    startMyAssessment: 'Start My Assessment',

    // Benefits
    minutes10: '10 minutes',
    scienceBacked: 'Science-backed (Google research)',
    personalizedPath: 'Get personalized learning path',
    freeAssessment: 'Free assessment'
  };

  // ============================================
  // GENERATE UNIQUE INVITE CODE
  // ============================================
  function generateInviteCode() {
    const stored = localStorage.getItem('inviteCode');
    if (stored) return stored;

    const code = 'TAP' + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem('inviteCode', code);
    return code;
  }

  // ============================================
  // GET INVITE URL
  // ============================================
  function getInviteUrl() {
    const code = generateInviteCode();
    const baseUrl = window.location.origin;
    const landingPage = isGerman ? 'invite-landing-de.html' : 'invite-landing.html';
    return `${baseUrl}/${landingPage}?ref=${code}`;
  }

  // ============================================
  // GET INVITE STATS
  // ============================================
  function getInviteStats() {
    return {
      sent: parseInt(localStorage.getItem('invitesSent') || '0'),
      opened: parseInt(localStorage.getItem('invitesOpened') || '0'),
      completed: parseInt(localStorage.getItem('invitesCompleted') || '0')
    };
  }

  // ============================================
  // TRACK INVITE SENT
  // ============================================
  function trackInviteSent(count = 1) {
    const current = parseInt(localStorage.getItem('invitesSent') || '0');
    localStorage.setItem('invitesSent', current + count);
  }

  // ============================================
  // TRACK LINK OPENED
  // ============================================
  function trackLinkOpened(refCode) {
    if (!refCode) return;

    const openedKey = `invite_opened_${refCode}`;
    if (!sessionStorage.getItem(openedKey)) {
      sessionStorage.setItem(openedKey, 'true');

      const current = parseInt(localStorage.getItem('invitesOpened') || '0');
      localStorage.setItem('invitesOpened', current + 1);
    }

    // Store ref code for tracking completion
    localStorage.setItem('inviteRefCode', refCode);
  }

  // ============================================
  // TRACK COMPLETION
  // ============================================
  function trackCompletion() {
    const refCode = localStorage.getItem('inviteRefCode');
    if (!refCode) return;

    const completedKey = `invite_completed_${refCode}`;
    if (!localStorage.getItem(completedKey)) {
      localStorage.setItem(completedKey, 'true');

      const current = parseInt(localStorage.getItem('invitesCompleted') || '0');
      localStorage.setItem('invitesCompleted', current + 1);

      // Award XP to inviter (in real app, this would be server-side)
      const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
      localStorage.setItem('totalXP', currentXP + 50);

      // Clear ref code
      localStorage.removeItem('inviteRefCode');
    }
  }

  // ============================================
  // GENERATE PERSONALIZED INVITE MESSAGE
  // ============================================
  function generateInviteMessage() {
    const beltLevel = localStorage.getItem('beltLevel') || 'white';
    const totalScore = localStorage.getItem('assessmentTotal') || '50';
    const weakestArea = localStorage.getItem('weakestArea') || 'trust';
    const userName = localStorage.getItem('userName') || (isGerman ? 'Ein Kollege' : 'A colleague');
    const inviteUrl = getInviteUrl();

    if (isGerman) {
      return `Hey!

Ich habe gerade mein Impact-Level mit Tap-Ins kostenloser Bewertung entdeckt.

Sie basiert auf Googles Project Aristotle Forschung und dauert nur 10 Minuten.

Ich habe ${BELT_NAMES[beltLevel]} (${totalScore}%) erreicht und herausgefunden, dass mein größter Entwicklungsbereich ${DYSFUNCTION_NAMES[weakestArea]} ist.

Möchtest du sehen, wo du stehst? Mach die Bewertung hier:
${inviteUrl}

Keine E-Mail erforderlich, sofortige Ergebnisse.

— ${userName}`;
    } else {
      return `Hey!

I just discovered my Impact-Level using Tap-In's free assessment.

It's based on Google's Project Aristotle research and only takes 10 minutes.

I scored ${BELT_NAMES[beltLevel]} (${totalScore}%) and found out my biggest growth area is ${DYSFUNCTION_NAMES[weakestArea]}.

Want to see where you stand? Take the assessment here:
${inviteUrl}

No email required, instant results.

— ${userName}`;
    }
  }

  // ============================================
  // GENERATE SHORT INVITE MESSAGE (for SMS/Slack)
  // ============================================
  function generateShortInviteMessage() {
    const inviteUrl = getInviteUrl();

    if (isGerman) {
      return `🥋 Hey! Ich habe gerade mein Impact-Level entdeckt. Willst du deins auch herausfinden? Kostenlos, 10 Min: ${inviteUrl}`;
    } else {
      return `🥋 Hey! I just discovered my Impact-Level. Want to find yours? Free, 10 min: ${inviteUrl}`;
    }
  }

  // ============================================
  // GET EARNED BADGES
  // ============================================
  function getEarnedBadges() {
    const completed = parseInt(localStorage.getItem('invitesCompleted') || '0');

    return {
      first: completed >= 1,
      connector: completed >= 5,
      networker: completed >= 10,
      influencer: completed >= 25,
      legend: completed >= 50
    };
  }

  // ============================================
  // VALIDATE EMAIL
  // ============================================
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ============================================
  // COPY TO CLIPBOARD
  // ============================================
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }

  // ============================================
  // PUBLIC API
  // ============================================
  window.InviteSystem = {
    generateInviteCode,
    getInviteUrl,
    getInviteStats,
    trackInviteSent,
    trackLinkOpened,
    trackCompletion,
    generateInviteMessage,
    generateShortInviteMessage,
    getEarnedBadges,
    validateEmail,
    copyToClipboard,
    UI_TEXT,
    BELT_NAMES,
    DYSFUNCTION_NAMES,
    isGerman
  };

  // ============================================
  // AUTO-TRACK LANDING PAGE VISITS
  // ============================================
  if (window.location.pathname.includes('invite-landing')) {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      trackLinkOpened(refCode);
    }
  }

  // ============================================
  // AUTO-TRACK ASSESSMENT COMPLETION
  // ============================================
  if (window.location.pathname.includes('assessment-belt-results')) {
    trackCompletion();
  }

})();
