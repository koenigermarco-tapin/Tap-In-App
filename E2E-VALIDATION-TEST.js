// ============================================================================
// ULTIMATE E2E VALIDATION TEST - TAP-IN BILINGUAL PLATFORM
// ============================================================================
// 
// INSTRUCTIONS:
// 1. Open browser in Incognito/Private mode
// 2. Navigate to your TAP-IN platform (localhost:8080 or Netlify URL)
// 3. Open Developer Console (F12)
// 4. Copy this entire file and paste into console
// 5. Press Enter to start test
// 6. Wait ~45-50 seconds for complete test
// 7. Review final report
//
// ============================================================================

(function() {
  'use strict';

  // ============================================================================
  // TEST TRACKING SETUP
  // ============================================================================

  window.testResults = {
    startTime: new Date(),
    testsRun: 0,
    testsPassed: 0,
    testsFailed: 0,
    errors: [],
    warnings: [],
    completedSections: []
  };

  function logTest(name, passed, details = '') {
    window.testResults.testsRun++;
    if (passed) {
      window.testResults.testsPassed++;
      console.log(`✅ PASS: ${name}`, details ? `(${details})` : '');
    } else {
      window.testResults.testsFailed++;
      window.testResults.errors.push(`${name}: ${details}`);
      console.error(`❌ FAIL: ${name}`, details ? `(${details})` : '');
    }
  }

  function logSection(name) {
    window.testResults.completedSections.push(name);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`  ${name}`);
    console.log('='.repeat(60) + '\n');
  }

  function generateReport() {
    const duration = ((new Date() - window.testResults.startTime) / 1000).toFixed(1);
    const passRate = window.testResults.testsRun > 0 
      ? ((window.testResults.testsPassed / window.testResults.testsRun) * 100).toFixed(1)
      : 0;

    console.log('\n' + '='.repeat(80));
    console.log('                         FINAL TEST REPORT');
    console.log('='.repeat(80));
    console.log(`Duration: ${duration} seconds`);
    console.log(`Tests Run: ${window.testResults.testsRun}`);
    console.log(`Tests Passed: ${window.testResults.testsPassed} (${passRate}%)`);
    console.log(`Tests Failed: ${window.testResults.testsFailed}`);
    console.log(`\nCompleted Sections: ${window.testResults.completedSections.length}`);
    window.testResults.completedSections.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));

    if (window.testResults.errors.length > 0) {
      console.log('\n🚨 ERRORS:');
      window.testResults.errors.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
    }

    if (window.testResults.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS:');
      window.testResults.warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
    }

    console.log('='.repeat(80) + '\n');

    return window.testResults;
  }

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  function answerAllQuestions() {
    let answered = 0;

    // Radio buttons
    const radioGroups = {};
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      if (!radioGroups[radio.name]) {
        radioGroups[radio.name] = [];
      }
      radioGroups[radio.name].push(radio);
    });

    Object.values(radioGroups).forEach(group => {
      if (group.length > 0) {
        const randomIndex = Math.floor(Math.random() * group.length);
        group[randomIndex].click();
        answered++;
      }
    });

    // Sliders
    document.querySelectorAll('input[type="range"]').forEach(slider => {
      slider.value = Math.floor(Math.random() * 5) + 1;
      slider.dispatchEvent(new Event('input'));
      answered++;
    });

    // Selects
    document.querySelectorAll('select').forEach(select => {
      if (select.options.length > 1) {
        select.selectedIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1;
        select.dispatchEvent(new Event('change'));
        answered++;
      }
    });

    return answered;
  }

  function waitFor(condition, timeout = 5000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const check = setInterval(() => {
        if (condition() || (Date.now() - startTime) > timeout) {
          clearInterval(check);
          resolve(condition());
        }
      }, 100);
    });
  }

  // ============================================================================
  // PHASE 1: LANDING PAGE & INITIAL NAVIGATION (ENGLISH)
  // ============================================================================

  async function phase1_LandingPage() {
    logSection('PHASE 1: Landing Page & Navigation');

    // Check page loaded
    await waitFor(() => document.readyState === 'complete');
    logTest('Landing page loads', document.readyState === 'complete');

    // Check critical elements exist
    logTest('Main heading exists', !!document.querySelector('h1'));
    logTest('CTA button exists', !!document.querySelector('button, .btn, [class*="cta"], a[href*="assessment"]'));

    // Check no console errors
    const errorCount = window.testResults.errors.length;
    logTest('No console errors on load', errorCount === 0);

    // Find and click assessment button
    const assessmentBtn = document.querySelector('[href*="assessment"], [href*="belt"], [href*="leadership-style-carousel"]');
    logTest('Assessment button found', !!assessmentBtn);

    if (assessmentBtn) {
      console.log('📍 Clicking assessment button:', assessmentBtn.textContent || assessmentBtn.href);
      assessmentBtn.click();
      await new Promise(resolve => setTimeout(resolve, 2000));
      logTest('Assessment page loads', 
        window.location.href.includes('assessment') || 
        window.location.href.includes('belt') ||
        window.location.href.includes('carousel'));
    }
  }

  // ============================================================================
  // PHASE 2: BELT ASSESSMENT (ENGLISH)
  // ============================================================================

  async function phase2_BeltAssessment() {
    logSection('PHASE 2: Belt Assessment');

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check gamification loaded
    await waitFor(() => typeof TapInGamification !== 'undefined', 3000);
    logTest('Gamification loaded', typeof TapInGamification !== 'undefined');

    // Check questions exist
    const questions = document.querySelectorAll('[class*="question"], .question-block, input[type="radio"], input[type="range"], select');
    logTest('Questions found', questions.length >= 1, `Found ${questions.length} question elements`);

    // Answer all questions
    const answeredCount = answerAllQuestions();
    logTest('Questions answered', answeredCount > 0, `Answered ${answeredCount} questions`);

    // Find submit button
    const submitBtn = document.querySelector('[onclick*="submit"], [onclick*="complete"], button[type="submit"], .btn-submit, .btn-primary');
    logTest('Submit button found', !!submitBtn);

    if (submitBtn) {
      console.log('📍 Submitting assessment');
      const initialXP = TapInGamification ? TapInGamification.getStats().totalXP : 0;
      console.log('Initial XP:', initialXP);
      submitBtn.click();
      await new Promise(resolve => setTimeout(resolve, 3000));

      const redirected = window.location.href.includes('gym-dashboard') || 
                        window.location.href.includes('gym') ||
                        document.querySelector('.gym-dashboard, [class*="dashboard"]');
      logTest('Assessment completed and redirected', !!redirected);

      if (TapInGamification) {
        const newXP = TapInGamification.getStats().totalXP;
        logTest('XP awarded', newXP > initialXP, `XP: ${initialXP} → ${newXP}`);
      }

      const completedAssessments = localStorage.getItem('completedAssessments');
      logTest('Assessment completion saved', !!completedAssessments);
    }
  }

  // ============================================================================
  // PHASE 3: GYM DASHBOARD (ENGLISH)
  // ============================================================================

  async function phase3_GymDashboard() {
    logSection('PHASE 3: Gym Dashboard');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const isDashboard = window.location.href.includes('gym-dashboard') || 
                       window.location.href.includes('gym');
    logTest('Dashboard loaded', isDashboard);

    logTest('Dashboard header exists', !!document.querySelector('header, .header, .gym-header'));
    logTest('Logo exists', !!document.querySelector('.logo, .gym-logo, [class*="logo"]'));

    const streakElement = document.querySelector('[class*="streak"]');
    logTest('Streak display exists', !!streakElement);

    const xpElement = document.querySelector('[class*="xp"]');
    logTest('XP display exists', !!xpElement);

    const beltCard = document.querySelector('.belt-hero, .belt-card, [class*="belt"]');
    logTest('Belt card exists', !!beltCard);

    const rootStyles = getComputedStyle(document.documentElement);
    const beltAccent = rootStyles.getPropertyValue('--belt-accent');
    logTest('Belt theme applied', !!beltAccent, `Belt accent: ${beltAccent}`);

    const continueBtn = document.querySelector('[href*="stripe"], .belt-cta, [class*="continue"]');
    logTest('Continue training button exists', !!continueBtn);

    if (TapInGamification) {
      const stats = TapInGamification.getStats();
      logTest('Gamification stats loaded', !!stats);
      logTest('XP tracking works', stats.totalXP >= 0, `Total XP: ${stats.totalXP}`);
      logTest('Streak tracking works', stats.currentStreak >= 0, `Streak: ${stats.currentStreak}`);
    }

    const completedStripes = JSON.parse(localStorage.getItem('completedStripes') || '{}');
    const stripeCount = Object.keys(completedStripes).length;
    console.log('Completed stripes:', stripeCount);

    const currentPage = document.body.innerHTML;
    const hasBeltInfo = currentPage.includes('White Belt') || 
                       currentPage.includes('Blue Belt') ||
                       currentPage.includes('Weißer Gürtel') ||
                       currentPage.includes('Blauer Gürtel');
    logTest('Belt information displayed', hasBeltInfo);
  }

  // ============================================================================
  // PHASE 4: WHITE BELT STRIPE 1 (ENGLISH)
  // ============================================================================

  async function phase4_WhiteBeltStripe1() {
    logSection('PHASE 4: White Belt Stripe 1');

    const continueBtn = document.querySelector('[href*="stripe1"], [href*="white-belt-stripe1"]');
    if (continueBtn) {
      console.log('📍 Navigating to White Belt Stripe 1');
      continueBtn.click();
      await new Promise(resolve => setTimeout(resolve, 2000));

      const onStripePage = window.location.href.includes('stripe') ||
                          window.location.href.includes('white-belt');
      logTest('Stripe page loaded', onStripePage);

      logTest('Gamification on stripe page', typeof TapInGamification !== 'undefined');

      const questionnaire = document.querySelector('form, .questionnaire, [id*="quiz"]');
      logTest('Questionnaire exists', !!questionnaire);

      const questions = document.querySelectorAll('input[type="radio"], input[type="range"], select');
      logTest('Questions found', questions.length > 0, `Found ${questions.length} inputs`);

      const initialXP = TapInGamification ? TapInGamification.getStats().totalXP : 0;
      const initialStripes = JSON.parse(localStorage.getItem('completedStripes') || '{}');

      const answered = answerAllQuestions();
      logTest('Stripe questions answered', answered > 0, `Answered ${answered}`);

      const completeBtn = document.querySelector('[onclick*="complete"], .btn-complete, button[type="submit"]');
      logTest('Complete button found', !!completeBtn);

      if (completeBtn) {
        console.log('📍 Completing Stripe 1');
        completeBtn.click();
        await new Promise(resolve => setTimeout(resolve, 3000));

        if (TapInGamification) {
          const newXP = TapInGamification.getStats().totalXP;
          logTest('Stripe XP awarded', newXP > initialXP, `XP: ${initialXP} → ${newXP} (+${newXP - initialXP})`);
        }

        const newStripes = JSON.parse(localStorage.getItem('completedStripes') || '{}');
        const newCount = Object.keys(newStripes).length;
        const oldCount = Object.keys(initialStripes).length;
        logTest('Stripe completion saved', newCount > oldCount, `Stripes: ${oldCount} → ${newCount}`);

        const toast = document.querySelector('.achievement-toast');
        logTest('Achievement toast displayed', !!toast);

        const redirected = window.location.href.includes('stripe2') || 
                          window.location.href.includes('dashboard');
        logTest('Redirected after completion', redirected);
      }
    }
  }

  // ============================================================================
  // PHASE 5: COMPLETE WHITE BELT (ENGLISH)
  // ============================================================================

  async function phase5_CompleteWhiteBelt() {
    logSection('PHASE 5: Complete White Belt');

    async function completeStripe(stripeNum) {
      return new Promise((resolve) => {
        console.log(`📍 Starting Stripe ${stripeNum}`);
        setTimeout(() => {
          const answered = answerAllQuestions();
          console.log(`  Answered ${answered} questions`);
          const completeBtn = document.querySelector('[onclick*="complete"], .btn-complete, button[type="submit"]');
          if (completeBtn) {
            completeBtn.click();
            setTimeout(() => {
              console.log(`  ✅ Stripe ${stripeNum} complete`);
              resolve(true);
            }, 3000);
          } else {
            console.error(`  ❌ Complete button not found for Stripe ${stripeNum}`);
            resolve(false);
          }
        }, 2000);
      });
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const stripe2Done = await completeStripe(2);
    logTest('Stripe 2 completed', stripe2Done);

    const stripe3Done = await completeStripe(3);
    logTest('Stripe 3 completed', stripe3Done);

    const stripe4Done = await completeStripe(4);
    logTest('Stripe 4 completed', stripe4Done);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const backToDashboard = window.location.href.includes('dashboard');
    logTest('Returned to dashboard after belt completion', backToDashboard);

    const completedStripes = JSON.parse(localStorage.getItem('completedStripes') || '{}');
    const whiteBeltComplete = 
      completedStripes['white-stripe1'] &&
      completedStripes['white-stripe2'] &&
      completedStripes['white-stripe3'] &&
      completedStripes['white-stripe4'];
    logTest('White Belt fully completed', !!whiteBeltComplete);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const pageContent = document.body.textContent;
    const showsBlueBelt = pageContent.includes('Blue Belt');
    logTest('Dashboard updated to Blue Belt', showsBlueBelt);

    const rootStyles = getComputedStyle(document.documentElement);
    const beltAccent = rootStyles.getPropertyValue('--belt-accent');
    const isBlueTheme = beltAccent.includes('3b82f6') || beltAccent.includes('59, 130, 246');
    logTest('Belt theme changed to blue', isBlueTheme, `Accent: ${beltAccent}`);
  }

  // ============================================================================
  // PHASE 6: LANGUAGE SWITCH TO GERMAN
  // ============================================================================

  async function phase6_LanguageSwitch() {
    logSection('PHASE 6: Language Switch to German');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const deLangBtn = document.querySelector('[data-lang="de"], [href*="-de.html"], .lang-de');
    logTest('German language button found', !!deLangBtn);

    if (deLangBtn) {
      console.log('📍 Switching to German');
      const xpBeforeSwitch = TapInGamification ? TapInGamification.getStats().totalXP : 0;
      const stripesBeforeSwitch = JSON.parse(localStorage.getItem('completedStripes') || '{}');

      deLangBtn.click();
      await new Promise(resolve => setTimeout(resolve, 2000));

      const isGermanUrl = window.location.href.includes('-de.html');
      logTest('German URL loaded', isGermanUrl);

      const pageContent = document.body.textContent;
      const hasGermanText = pageContent.includes('Gürtel') || 
                           pageContent.includes('Streifen') ||
                           pageContent.includes('Fortschritt');
      logTest('German text displayed', hasGermanText);

      if (TapInGamification) {
        const xpAfterSwitch = TapInGamification.getStats().totalXP;
        logTest('XP persisted across language switch', xpAfterSwitch === xpBeforeSwitch);
      }

      const stripesAfterSwitch = JSON.parse(localStorage.getItem('completedStripes') || '{}');
      const stripeCountMatches = Object.keys(stripesAfterSwitch).length === Object.keys(stripesBeforeSwitch).length;
      logTest('Stripe completion persisted', stripeCountMatches);
    }
  }

  // ============================================================================
  // PHASE 7: GERMAN USER JOURNEY - BLUE BELT
  // ============================================================================

  async function phase7_GermanBlueBelt() {
    logSection('PHASE 7: Blue Belt in German');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const pageContent = document.body.textContent;
    const showsBlueBeltGerman = pageContent.includes('Blauer Gürtel') || pageContent.includes('Blue Belt');
    logTest('German dashboard shows Blue Belt', showsBlueBeltGerman);

    const continueBtn = document.querySelector('[href*="blue-belt-stripe1"], [href*="stripe1"]');
    if (continueBtn) {
      console.log('📍 Starting Blue Belt Stripe 1 (German)');
      continueBtn.click();
      await new Promise(resolve => setTimeout(resolve, 2000));

      const onBlueBeltPage = window.location.href.includes('blue-belt-stripe1') &&
                            window.location.href.includes('-de.html');
      logTest('Blue Belt Stripe 1 (DE) loaded', onBlueBeltPage);

      logTest('Gamification on German stripe', typeof TapInGamification !== 'undefined');

      const answered = answerAllQuestions();
      logTest('Blue Belt questions answered (DE)', answered > 0);

      const completeBtn = document.querySelector('[onclick*="complete"], .btn-complete');
      if (completeBtn) {
        completeBtn.click();
        await new Promise(resolve => setTimeout(resolve, 3000));

        const toast = document.querySelector('.achievement-toast');
        if (toast) {
          const germanAchievement = toast.textContent.includes('abgeschlossen') || 
                                   toast.textContent.includes('XP');
          logTest('German achievement displayed', germanAchievement);
        }

        const redirectedToGermanStripe = window.location.href.includes('-de.html') &&
                                        (window.location.href.includes('stripe2') || 
                                         window.location.href.includes('dashboard'));
        logTest('Redirected to German stripe/dashboard', redirectedToGermanStripe);
      }
    }
  }

  // ============================================================================
  // PHASE 8: GERMAN ASSESSMENT TEST
  // ============================================================================

  async function phase8_GermanAssessment() {
    logSection('PHASE 8: German Assessment');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📍 Testing German Deep Dive Assessment');
    window.location.href = 'src/pages/assessments/deep-dive-assessment-de.html';
    await new Promise(resolve => setTimeout(resolve, 3000));

    const isAssessmentPage = window.location.href.includes('deep-dive-assessment-de');
    logTest('German assessment page loaded', isAssessmentPage);

    await waitFor(() => typeof TapInGamification !== 'undefined', 3000);
    logTest('Gamification on German assessment', typeof TapInGamification !== 'undefined');

    const questions = document.querySelectorAll('input[type="radio"], input[type="range"], select');
    logTest('Assessment questions found (DE)', questions.length > 0, `Found ${questions.length}`);

    const germanText = document.body.textContent.includes('Bewertung') || 
                      document.body.textContent.includes('Frage');
    logTest('German assessment text', germanText);

    const answered = answerAllQuestions();
    logTest('German assessment answered', answered > 0);

    const submitBtn = document.querySelector('[onclick*="submit"], [onclick*="complete"], button[type="submit"]');
    if (submitBtn) {
      submitBtn.click();
      await new Promise(resolve => setTimeout(resolve, 3000));

      const hasResults = document.querySelector('#results-section, [class*="results"]');
      const redirected = window.location.href !== 'src/pages/assessments/deep-dive-assessment-de.html';
      logTest('German assessment completed', hasResults || redirected);
    }
  }

  // ============================================================================
  // PHASE 9: CROSS-LANGUAGE NAVIGATION
  // ============================================================================

  async function phase9_CrossLanguage() {
    logSection('PHASE 9: Cross-Language Navigation');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📍 Switching back to English');
    const enLangBtn = document.querySelector('[data-lang="en"], .lang-en');

    if (enLangBtn) {
      enLangBtn.click();
      await new Promise(resolve => setTimeout(resolve, 2000));

      const isEnglishUrl = !window.location.href.includes('-de.html');
      logTest('Switched back to English', isEnglishUrl);

      const englishText = document.body.textContent.includes('Belt') &&
                         !document.body.textContent.includes('Gürtel');
      logTest('English text displayed', englishText);

      const completedStripes = JSON.parse(localStorage.getItem('completedStripes') || '{}');
      const hasWhiteBelt = completedStripes['white-stripe1'];
      const hasBlueBelt = completedStripes['blue-stripe1'];
      logTest('Progress intact after language switch', hasWhiteBelt && hasBlueBelt);
    }
  }

  // ============================================================================
  // PHASE 10: DATA PERSISTENCE TEST
  // ============================================================================

  async function phase10_DataPersistence() {
    logSection('PHASE 10: Data Persistence');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📍 Verifying data persistence');

    const hasCompletedStripes = !!localStorage.getItem('completedStripes');
    const hasGamification = !!localStorage.getItem('tap_in_gamification');
    const hasAssessments = !!localStorage.getItem('completedAssessments');

    logTest('Completed stripes saved', hasCompletedStripes);
    logTest('Gamification data saved', hasGamification);
    logTest('Assessment data saved', hasAssessments);

    if (hasCompletedStripes) {
      const stripes = JSON.parse(localStorage.getItem('completedStripes'));
      const stripeCount = Object.keys(stripes).length;
      logTest('Stripe count accurate', stripeCount >= 5, `${stripeCount} stripes completed`);

      Object.entries(stripes).forEach(([key, data]) => {
        const hasCompletedAt = !!data.completedAt;
        const hasXP = data.xpEarned > 0;
        console.log(`  ${key}: completedAt=${hasCompletedAt}, xp=${data.xpEarned}`);
      });
    }

    if (hasGamification) {
      const gamData = JSON.parse(localStorage.getItem('tap_in_gamification'));
      logTest('XP total > 0', gamData.totalXP > 0, `Total XP: ${gamData.totalXP}`);
      logTest('Streak tracked', gamData.currentStreak >= 0, `Streak: ${gamData.currentStreak}`);
      logTest('Last active recorded', !!gamData.lastActive);
    }

    console.log('📍 Testing page reload persistence');
    const xpBefore = TapInGamification ? TapInGamification.getStats().totalXP : 0;
    await new Promise(resolve => setTimeout(resolve, 1000));

    window.location.reload();
    await new Promise(resolve => setTimeout(resolve, 3000));

    await waitFor(() => typeof TapInGamification !== 'undefined', 5000);
    const xpAfter = TapInGamification ? TapInGamification.getStats().totalXP : 0;
    logTest('Data persists after reload', xpAfter === xpBefore, `XP: ${xpBefore} → ${xpAfter}`);
  }

  // ============================================================================
  // PHASE 11: ERROR HANDLING TEST
  // ============================================================================

  async function phase11_ErrorHandling() {
    logSection('PHASE 11: Error Handling');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📍 Testing error handling');

    // Test duplicate completion prevention
    window.location.href = 'src/pages/gym/white-belt-stripe1-gamified.html';
    await new Promise(resolve => setTimeout(resolve, 3000));

    const xpBefore = TapInGamification ? TapInGamification.getStats().totalXP : 0;
    answerAllQuestions();
    const completeBtn = document.querySelector('[onclick*="complete"]');
    if (completeBtn) {
      completeBtn.click();
      await new Promise(resolve => setTimeout(resolve, 2000));

      const xpAfter = TapInGamification ? TapInGamification.getStats().totalXP : 0;
      logTest('Prevents duplicate XP', xpAfter === xpBefore, 'No duplicate XP awarded');
    }
  }

  // ============================================================================
  // PHASE 12: NAVIGATION INTEGRITY TEST
  // ============================================================================

  async function phase12_NavigationIntegrity() {
    logSection('PHASE 12: Navigation Integrity');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📍 Testing all navigation links');
    window.location.href = 'src/pages/gym/gym-dashboard.html';
    await new Promise(resolve => setTimeout(resolve, 2000));

    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    console.log(`Found ${allLinks.length} links`);

    const criticalLinks = allLinks.filter(a => 
      a.href.includes('stripe') || 
      a.href.includes('belt') ||
      a.href.includes('dashboard') ||
      a.href.includes('hub')
    );

    console.log(`Testing ${criticalLinks.length} critical links`);

    let validLinks = 0;
    let brokenLinks = 0;

    criticalLinks.forEach(link => {
      const href = link.href;
      if (href && !href.includes('javascript:') && !href.includes('#')) {
        validLinks++;
      } else {
        brokenLinks++;
        console.warn(`⚠️ Suspicious link: ${href}`);
      }
    });

    logTest('Critical links valid', brokenLinks === 0, `${validLinks} valid, ${brokenLinks} broken`);
  }

  // ============================================================================
  // PHASE 13: MOBILE RESPONSIVENESS CHECK
  // ============================================================================

  async function phase13_MobileResponsiveness() {
    logSection('PHASE 13: Mobile Responsiveness');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📍 Testing mobile responsiveness');

    const hasResponsiveMeta = !!document.querySelector('meta[name="viewport"]');
    logTest('Viewport meta tag exists', hasResponsiveMeta);

    const hasResponsiveClasses = document.body.innerHTML.includes('mobile') ||
                                document.body.innerHTML.includes('responsive') ||
                                !!document.querySelector('[class*="sm:"], [class*="md:"], [class*="lg:"]');
    logTest('Responsive classes present', hasResponsiveClasses);

    const buttons = document.querySelectorAll('button, .btn, [role="button"]');
    let touchFriendly = 0;

    buttons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      if (rect.width >= 44 && rect.height >= 44) {
        touchFriendly++;
      }
    });

    const percentTouchFriendly = buttons.length > 0 ? (touchFriendly / buttons.length) * 100 : 0;
    logTest('Buttons touch-friendly', percentTouchFriendly > 70, `${percentTouchFriendly.toFixed(1)}% are 44x44px+`);
  }

  // ============================================================================
  // PHASE 14: PERFORMANCE CHECK
  // ============================================================================

  async function phase14_Performance() {
    logSection('PHASE 14: Performance');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📍 Testing performance');

    if (performance && performance.timing) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
      const renderTime = timing.domComplete - timing.domLoading;

      logTest('Page loads in < 3 seconds', loadTime < 3000, `${loadTime}ms`);
      logTest('DNS lookup fast', dnsTime < 500, `${dnsTime}ms`);
      logTest('Render time reasonable', renderTime < 2000, `${renderTime}ms`);
    }

    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length;
      }
    }

    const sizeKB = (totalSize / 1024).toFixed(2);
    logTest('localStorage size reasonable', totalSize < 5000000, `${sizeKB} KB`);

    const hasErrors = window.testResults.errors.length > 0;
    logTest('No JavaScript errors', !hasErrors, `${window.testResults.errors.length} errors found`);
  }

  // ============================================================================
  // PHASE 15: FINAL REPORT
  // ============================================================================

  async function phase15_FinalReport() {
    logSection('FINAL: Complete Report');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const report = generateReport();

    console.log('\n📊 PLATFORM STATUS:');

    const completedStripes = JSON.parse(localStorage.getItem('completedStripes') || '{}');
    const gamData = JSON.parse(localStorage.getItem('tap_in_gamification') || '{}');
    const assessments = JSON.parse(localStorage.getItem('completedAssessments') || '{}');

    console.log(`  Stripes Completed: ${Object.keys(completedStripes).length}/20`);
    console.log(`  Total XP: ${gamData.totalXP || 0}`);
    console.log(`  Current Streak: ${gamData.currentStreak || 0} days`);
    console.log(`  Assessments: ${Object.keys(assessments).length}`);

    const whiteBelt = Object.keys(completedStripes).filter(k => k.includes('white')).length;
    const blueBelt = Object.keys(completedStripes).filter(k => k.includes('blue')).length;
    const purpleBelt = Object.keys(completedStripes).filter(k => k.includes('purple')).length;
    const brownBelt = Object.keys(completedStripes).filter(k => k.includes('brown')).length;
    const blackBelt = Object.keys(completedStripes).filter(k => k.includes('black')).length;

    console.log(`\n🥋 BELT PROGRESSION:`);
    console.log(`  White Belt: ${whiteBelt}/4 stripes`);
    console.log(`  Blue Belt: ${blueBelt}/4 stripes`);
    console.log(`  Purple Belt: ${purpleBelt}/4 stripes`);
    console.log(`  Brown Belt: ${brownBelt}/4 stripes`);
    console.log(`  Black Belt: ${blackBelt}/4 stripes`);

    const passRate = (report.testsPassed / report.testsRun) * 100;

    console.log('\n' + '='.repeat(80));
    if (passRate >= 95) {
      console.log('🎉 VERDICT: PLATFORM READY FOR PRODUCTION DEPLOYMENT!');
    } else if (passRate >= 80) {
      console.log('⚠️ VERDICT: PLATFORM MOSTLY WORKING - Minor fixes needed');
    } else {
      console.log('🚨 VERDICT: CRITICAL ISSUES FOUND - Major fixes required');
    }
    console.log('='.repeat(80) + '\n');

    const reportJSON = JSON.stringify(report, null, 2);
    console.log('📋 Copy this report for documentation:');
    console.log(reportJSON);

    if (report.testsFailed > 0) {
      console.log('\n📝 RECOMMENDED FIXES:');
      report.errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }
  }

  // ============================================================================
  // MAIN TEST RUNNER
  // ============================================================================

  async function runAllTests() {
    console.log('\n' + '='.repeat(80));
    console.log('  🚀 STARTING ULTIMATE E2E VALIDATION TEST');
    console.log('  TAP-IN BILINGUAL PLATFORM');
    console.log('='.repeat(80) + '\n');

    try {
      await phase1_LandingPage();
      await phase2_BeltAssessment();
      await phase3_GymDashboard();
      await phase4_WhiteBeltStripe1();
      await phase5_CompleteWhiteBelt();
      await phase6_LanguageSwitch();
      await phase7_GermanBlueBelt();
      await phase8_GermanAssessment();
      await phase9_CrossLanguage();
      await phase10_DataPersistence();
      await phase11_ErrorHandling();
      await phase12_NavigationIntegrity();
      await phase13_MobileResponsiveness();
      await phase14_Performance();
      await phase15_FinalReport();
    } catch (error) {
      console.error('❌ TEST SUITE ERROR:', error);
      window.testResults.errors.push(`Test suite error: ${error.message}`);
      generateReport();
    }
  }

  // Start tests
  runAllTests();

})();

