// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAP-IN INVITE SYSTEM - VIRAL GROWTH ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Generate unique referral code
function generateReferralCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'TAP-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Get or create user's referral code
function getUserReferralCode() {
  let code = localStorage.getItem('userReferralCode');
  if (!code) {
    code = generateReferralCode();
    localStorage.setItem('userReferralCode', code);
  }
  return code;
}

// Generate unique referral link
function generateReferralLink(userId) {
  const baseUrl = window.location.origin;
  const refCode = userId || getUserReferralCode();
  return `${baseUrl}/invite-landing.html?ref=${refCode}`;
}

// Save invite to localStorage
function saveInvite(emails, message, referralLink) {
  const invites = JSON.parse(localStorage.getItem('sentInvites') || '[]');
  const newInvite = {
    id: Date.now(),
    emails: emails,
    message: message,
    link: referralLink,
    sentAt: new Date().toISOString(),
    opened: 0,
    completed: 0
  };
  invites.push(newInvite);
  localStorage.setItem('sentInvites', JSON.stringify(invites));
  return newInvite;
}

// Track link opens (on invite-landing.html)
function trackLinkOpen(refCode) {
  if (!refCode) return;
  
  const opens = JSON.parse(localStorage.getItem('linkOpens') || '[]');
  opens.push({
    refCode: refCode,
    openedAt: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
  localStorage.setItem('linkOpens', JSON.stringify(opens));
  
  // Also store the refCode for this session (to attribute assessment completion)
  sessionStorage.setItem('referredBy', refCode);
}

// Track assessment completion (call this on assessment results page)
function trackAssessmentComplete(refCode) {
  if (!refCode) {
    // Check if user came from a referral link
    refCode = sessionStorage.getItem('referredBy');
  }
  
  if (!refCode) return;
  
  const completions = JSON.parse(localStorage.getItem('assessmentCompletions') || '[]');
  completions.push({
    refCode: refCode,
    completedAt: new Date().toISOString()
  });
  localStorage.setItem('assessmentCompletions', JSON.stringify(completions));
  
  // Award bonus XP to inviter
  awardInviterBonus(refCode, 50); // +50 XP per successful referral
  
  // Clear the referral session
  sessionStorage.removeItem('referredBy');
}

// Award XP bonus to inviter
function awardInviterBonus(refCode, xpAmount) {
  const userRefCode = getUserReferralCode();
  if (refCode === userRefCode) {
    // This user invited someone who completed!
    const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
    localStorage.setItem('totalXP', currentXP + xpAmount);
    
    // Show notification
    showInviteSuccessNotification(xpAmount);
    
    // Check for badges
    checkInviteBadges();
  }
}

// Show success notification when someone completes via your invite
function showInviteSuccessNotification(xp) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.innerHTML = `
    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
    <div style="font-weight: 700; margin-bottom: 0.25rem;">Referral Success!</div>
    <div style="font-size: 0.9rem;">+${xp} XP earned from your invite</div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(400px)';
    notification.style.transition = 'all 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Calculate invite stats
function getInviteStats() {
  const invites = JSON.parse(localStorage.getItem('sentInvites') || '[]');
  const opens = JSON.parse(localStorage.getItem('linkOpens') || '[]');
  const completions = JSON.parse(localStorage.getItem('assessmentCompletions') || '[]');
  
  const userRefCode = getUserReferralCode();
  const userOpens = opens.filter(o => o.refCode === userRefCode);
  const userCompletions = completions.filter(c => c.refCode === userRefCode);
  
  return {
    sent: invites.reduce((sum, inv) => sum + inv.emails.length, 0),
    opened: userOpens.length,
    completed: userCompletions.length,
    conversionRate: userOpens.length ? (userCompletions.length / userOpens.length * 100).toFixed(1) : 0
  };
}

// Invite badges
const inviteBadges = {
  starter: { threshold: 1, name: "First Invite", emoji: "🌱", xp: 10 },
  connector: { threshold: 5, name: "Connector", emoji: "🔗", xp: 50 },
  networker: { threshold: 10, name: "Networker", emoji: "🌐", xp: 100 },
  influencer: { threshold: 25, name: "Influencer", emoji: "⭐", xp: 250 },
  legend: { threshold: 50, name: "Legend", emoji: "👑", xp: 500 }
};

// Check and award invite badges
function checkInviteBadges() {
  const stats = getInviteStats();
  const completedCount = stats.completed;
  const earnedBadges = JSON.parse(localStorage.getItem('inviteBadges') || '[]');
  
  Object.entries(inviteBadges).forEach(([key, badge]) => {
    if (completedCount >= badge.threshold && !earnedBadges.includes(key)) {
      // Award new badge!
      earnedBadges.push(key);
      localStorage.setItem('inviteBadges', JSON.stringify(earnedBadges));
      
      // Award XP
      const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
      localStorage.setItem('totalXP', currentXP + badge.xp);
      
      // Show badge notification
      showBadgeNotification(badge);
    }
  });
}

// Show badge earned notification
function showBadgeNotification(badge) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #1a1d2e;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(251, 191, 36, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.innerHTML = `
    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${badge.emoji}</div>
    <div style="font-weight: 700; margin-bottom: 0.25rem;">Badge Unlocked!</div>
    <div style="font-size: 0.9rem;">${badge.name} (+${badge.xp} XP)</div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(400px)';
    notification.style.transition = 'all 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Copy referral link to clipboard
function copyReferralLink() {
  const link = generateReferralLink();
  navigator.clipboard.writeText(link).then(() => {
    showCopySuccess();
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Show copy success message
function showCopySuccess() {
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4a7c9c;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(74, 124, 156, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  message.textContent = '✓ Link copied to clipboard!';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.style.opacity = '0';
    message.style.transition = 'opacity 0.3s ease';
    setTimeout(() => message.remove(), 300);
  }, 2000);
}

// Get referral info for landing page
function getReferralInfo(refCode) {
  // In a real system, this would query a database
  // For now, return generic info
  return {
    inviterName: 'A Colleague',
    inviterBelt: 'Purple Belt',
    inviterScore: 68,
    companyCount: Math.floor(Math.random() * 20) + 5
  };
}

// Validate email address
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Get user info for invite message
function getUserInfo() {
  return {
    name: localStorage.getItem('userName') || 'A Colleague',
    belt: localStorage.getItem('beltLevel') || 'white',
    beltTitle: getBeltTitle(localStorage.getItem('beltLevel') || 'white'),
    weakness: localStorage.getItem('weakestArea') || 'trust',
    weaknessTitle: capitalizeFirst(localStorage.getItem('weakestArea') || 'trust')
  };
}

// Get belt title from level
function getBeltTitle(level) {
  const titles = {
    white: 'White Belt',
    blue: 'Blue Belt',
    purple: 'Purple Belt',
    brown: 'Brown Belt',
    black: 'Black Belt'
  };
  return titles[level] || 'White Belt';
}

// Capitalize first letter
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate personalized invite message
function generateInviteMessage() {
  const user = getUserInfo();
  const link = generateReferralLink();
  
  return `Hey!

I just discovered my leadership Impact-Level using Tap-In's free assessment.

It's based on Google's Project Aristotle research and takes only 10 minutes.

I got ${user.beltTitle} and found out my biggest growth area is ${user.weaknessTitle}.

Want to see where you stand? Take the assessment here:
${link}

No email required, instant results.

— ${user.name}`;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateReferralCode,
    getUserReferralCode,
    generateReferralLink,
    saveInvite,
    trackLinkOpen,
    trackAssessmentComplete,
    getInviteStats,
    copyReferralLink,
    getReferralInfo,
    isValidEmail,
    getUserInfo,
    generateInviteMessage
  };
}

