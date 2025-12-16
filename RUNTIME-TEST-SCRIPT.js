/**
 * TAP-IN Runtime Functionality Test Script
 * Run this in browser console on each page to test functionality
 * 
 * Usage:
 * 1. Open page in browser
 * 2. Open DevTools Console (F12)
 * 3. Paste this script
 * 4. Run: testTAPIN.runAll()
 */

const testTAPIN = {
    results: [],
    page: window.location.pathname.split('/').pop() || 'index.html',
    
    log(test, status, message) {
        const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
        const result = { test, status, message, page: this.page };
        this.results.push(result);
        console.log(`${icon} [${test}] ${message}`);
        return status === 'pass';
    },
    
    // Test 1: Storage Availability
    testStorage() {
        console.log('\n🔍 Testing Storage...');
        
        if (typeof TapInErrorHandler === 'undefined') {
            return this.log('Storage', 'fail', 'TapInErrorHandler not loaded');
        }
        
        const available = TapInErrorHandler.isStorageAvailable();
        if (!available) {
            return this.log('Storage', 'fail', 'localStorage not available');
        }
        
        const quota = TapInErrorHandler.getStorageQuota();
        this.log('Storage', 'pass', `Storage available (${quota.usedMB}MB used, ${quota.percentUsed}% of limit)`);
        
        // Test save/load
        const testData = { test: 'data', timestamp: Date.now() };
        const saved = safeSet('testTAPIN', testData);
        if (!saved) {
            return this.log('Storage', 'fail', 'Failed to save test data');
        }
        
        const loaded = safeGet('testTAPIN');
        if (!loaded || loaded.test !== 'data') {
            return this.log('Storage', 'fail', 'Failed to load test data');
        }
        
        safeRemove('testTAPIN');
        return this.log('Storage', 'pass', 'Save/load works correctly');
    },
    
    // Test 2: Assessment Functionality
    testAssessment() {
        console.log('\n🔍 Testing Assessment...');
        
        if (!this.page.includes('deep-dive-assessment')) {
            return this.log('Assessment', 'skip', 'Not on assessment page');
        }
        
        // Check if functions exist
        if (typeof selectOption === 'undefined') {
            return this.log('Assessment', 'fail', 'selectOption function not found');
        }
        
        if (typeof renderQuestion === 'undefined') {
            return this.log('Assessment', 'fail', 'renderQuestion function not found');
        }
        
        // Check if options container exists
        const container = document.getElementById('optionsContainer');
        if (!container) {
            return this.log('Assessment', 'fail', 'Options container not found');
        }
        
        // Check if options are rendered
        const options = container.querySelectorAll('.option');
        if (options.length === 0) {
            return this.log('Assessment', 'fail', 'No options rendered');
        }
        
        // Check if event delegation is set up
        let hasListeners = false;
        options.forEach(opt => {
            if (opt.hasAttribute('data-option-index')) {
                hasListeners = true;
            }
        });
        
        if (!hasListeners) {
            return this.log('Assessment', 'fail', 'Event delegation not set up');
        }
        
        // Check continue button
        const nextBtn = document.getElementById('nextBtn');
        if (!nextBtn) {
            return this.log('Assessment', 'fail', 'Continue button not found');
        }
        
        this.log('Assessment', 'pass', `Found ${options.length} options, event delegation active`);
        
        // Check GAMIFICATION
        if (typeof GAMIFICATION === 'undefined') {
            return this.log('Assessment', 'warn', 'GAMIFICATION not loaded');
        }
        
        this.log('Assessment', 'pass', 'GAMIFICATION system loaded');
        return true;
    },
    
    // Test 3: Gym Dashboard
    testGymDashboard() {
        console.log('\n🔍 Testing Gym Dashboard...');
        
        if (!this.page.includes('gym-dashboard')) {
            return this.log('Gym Dashboard', 'skip', 'Not on gym dashboard');
        }
        
        // Check belt background function
        if (typeof getCurrentBelt === 'undefined') {
            return this.log('Gym Dashboard', 'fail', 'getCurrentBelt function not found');
        }
        
        if (typeof applyBeltBackground === 'undefined') {
            return this.log('Gym Dashboard', 'fail', 'applyBeltBackground function not found');
        }
        
        const currentBelt = getCurrentBelt();
        this.log('Gym Dashboard', 'pass', `Current belt: ${currentBelt}`);
        
        // Check if background is applied
        const hasBeltClass = document.body.classList.contains(`belt-${currentBelt}`);
        if (!hasBeltClass) {
            return this.log('Gym Dashboard', 'fail', 'Belt background class not applied');
        }
        
        this.log('Gym Dashboard', 'pass', 'Belt background applied correctly');
        
        // Check belt cards
        const beltCards = document.querySelectorAll('.open-mat-card');
        if (beltCards.length === 0) {
            return this.log('Gym Dashboard', 'warn', 'No belt cards found');
        }
        
        this.log('Gym Dashboard', 'pass', `Found ${beltCards.length} belt cards`);
        return true;
    },
    
    // Test 4: Data Manager
    testDataManager() {
        console.log('\n🔍 Testing Data Manager...');
        
        if (typeof TapInDataManager === 'undefined') {
            return this.log('Data Manager', 'warn', 'TapInDataManager not loaded');
        }
        
        // Test backup code generation
        if (typeof TapInDataManager.generateBackupCode !== 'function') {
            return this.log('Data Manager', 'fail', 'generateBackupCode function not found');
        }
        
        const backupCode = TapInDataManager.generateBackupCode();
        if (!backupCode || !backupCode.startsWith('TAP-')) {
            return this.log('Data Manager', 'fail', 'Backup code generation failed');
        }
        
        this.log('Data Manager', 'pass', `Backup code generated: ${backupCode}`);
        
        // Test data export
        if (typeof TapInDataManager.exportData === 'function') {
            const exported = TapInDataManager.exportData();
            if (exported) {
                this.log('Data Manager', 'pass', 'Data export works');
            } else {
                this.log('Data Manager', 'warn', 'Data export returned empty');
            }
        }
        
        return true;
    },
    
    // Test 5: Validation
    testValidation() {
        console.log('\n🔍 Testing Validation...');
        
        if (typeof TapInValidator === 'undefined') {
            return this.log('Validation', 'warn', 'TapInValidator not loaded');
        }
        
        // Test team code validation
        if (typeof TapInValidator.validateTeamCode === 'function') {
            const valid = TapInValidator.validateTeamCode('TEAM-1234');
            const invalid = TapInValidator.validateTeamCode('invalid');
            
            if (valid && !invalid) {
                this.log('Validation', 'pass', 'Team code validation works');
            } else {
                this.log('Validation', 'fail', 'Team code validation incorrect');
            }
        }
        
        // Test email validation
        if (typeof TapInValidator.validateEmail === 'function') {
            const valid = TapInValidator.validateEmail('test@example.com');
            const invalid = TapInValidator.validateEmail('not-an-email');
            
            if (valid && !invalid) {
                this.log('Validation', 'pass', 'Email validation works');
            } else {
                this.log('Validation', 'fail', 'Email validation incorrect');
            }
        }
        
        return true;
    },
    
    // Test 6: Security
    testSecurity() {
        console.log('\n🔍 Testing Security...');
        
        if (typeof TapInSecurity === 'undefined') {
            return this.log('Security', 'warn', 'TapInSecurity not loaded');
        }
        
        // Test HTML escaping
        if (typeof TapInSecurity.escapeHtml === 'function') {
            const test = '<script>alert("xss")</script>';
            const escaped = TapInSecurity.escapeHtml(test);
            
            if (escaped.includes('<script>')) {
                return this.log('Security', 'fail', 'HTML escaping not working');
            }
            
            this.log('Security', 'pass', 'HTML escaping works');
        }
        
        return true;
    },
    
    // Test 7: Error Handling
    testErrorHandling() {
        console.log('\n🔍 Testing Error Handling...');
        
        if (typeof TapInErrorHandler === 'undefined') {
            return this.log('Error Handling', 'fail', 'TapInErrorHandler not loaded');
        }
        
        // Test toast display
        if (typeof TapInErrorHandler.showToast === 'function') {
            // Don't actually show toast, just verify function exists
            this.log('Error Handling', 'pass', 'Toast notification system available');
        }
        
        // Test loading overlay
        if (typeof TapInErrorHandler.showLoading === 'function') {
            this.log('Error Handling', 'pass', 'Loading overlay system available');
        }
        
        return true;
    },
    
    // Test 8: Check for JavaScript Errors
    testJavaScriptErrors() {
        console.log('\n🔍 Checking for JavaScript Errors...');
        
        // Check console for errors (manual check needed)
        this.log('JavaScript Errors', 'info', 'Check browser console for red errors');
        
        // Check for undefined functions being called
        const scripts = document.querySelectorAll('script');
        let inlineScripts = 0;
        scripts.forEach(script => {
            if (script.textContent && !script.src) {
                inlineScripts++;
            }
        });
        
        this.log('JavaScript Errors', 'info', `Found ${inlineScripts} inline scripts`);
        return true;
    },
    
    // Run all tests
    runAll() {
        console.log('🚀 Starting TAP-IN Runtime Tests...');
        console.log(`📄 Testing page: ${this.page}\n`);
        
        this.results = [];
        
        this.testStorage();
        this.testAssessment();
        this.testGymDashboard();
        this.testDataManager();
        this.testValidation();
        this.testSecurity();
        this.testErrorHandling();
        this.testJavaScriptErrors();
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(60));
        
        const passed = this.results.filter(r => r.status === 'pass').length;
        const failed = this.results.filter(r => r.status === 'fail').length;
        const warnings = this.results.filter(r => r.status === 'warn').length;
        const skipped = this.results.filter(r => r.status === 'skip').length;
        
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⚠️  Warnings: ${warnings}`);
        console.log(`⏭️  Skipped: ${skipped}`);
        
        if (failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.filter(r => r.status === 'fail').forEach(r => {
                console.log(`   - ${r.test}: ${r.message}`);
            });
        }
        
        if (warnings > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.results.filter(r => r.status === 'warn').forEach(r => {
                console.log(`   - ${r.test}: ${r.message}`);
            });
        }
        
        console.log('\n' + '='.repeat(60));
        
        return {
            passed,
            failed,
            warnings,
            skipped,
            results: this.results
        };
    }
};

// Make available globally
window.testTAPIN = testTAPIN;

// Auto-run if on assessment or gym page
if (window.location.pathname.includes('deep-dive-assessment') || 
    window.location.pathname.includes('gym-dashboard')) {
    console.log('💡 TAP-IN Test Script Loaded!');
    console.log('💡 Run: testTAPIN.runAll() to start testing');
}

