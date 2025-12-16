/**
 * TAP-IN End-to-End User Journey Test Script
 * Tests the complete flow from assessment to black belt
 * 
 * Run this in browser console after loading the landing page
 */

const E2ETest = {
    issues: [],
    currentStep: 0,
    totalSteps: 0,
    
    log(step, message, status = 'info') {
        const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : status === 'warn' ? '⚠️' : 'ℹ️';
        console.log(`${icon} [Step ${step}] ${message}`);
        if (status === 'fail') {
            this.issues.push({ step, message, status });
        }
    },
    
    async checkLink(url, expectedStatus = 200) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.status === expectedStatus || response.status < 400) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    },
    
    async checkFileExists(path) {
        try {
            const response = await fetch(path, { method: 'HEAD' });
            return response.status < 400;
        } catch (e) {
            return false;
        }
    },
    
    async testAssessmentFlow() {
        this.log(1, 'Testing Landing Page → Assessment Link', 'info');
        const assessmentLink = 'src/pages/assessments/deep-dive-assessment.html';
        const exists = await this.checkFileExists(assessmentLink);
        if (exists) {
            this.log(1, 'Assessment file exists', 'pass');
        } else {
            this.log(1, `Assessment file missing: ${assessmentLink}`, 'fail');
        }
        
        // Check assessment result links
        this.log(2, 'Checking assessment result page links', 'info');
        const resultLinks = [
            '../gym/gym-dashboard.html',
            '../../join-team.html',
            '../hub/team-dashboard.html'
        ];
        
        for (const link of resultLinks) {
            const fullPath = `src/pages/assessments/${link}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(2, `Result link OK: ${link}`, 'pass');
            } else {
                this.log(2, `Result link broken: ${link}`, 'fail');
            }
        }
    },
    
    async testGymDashboard() {
        this.log(3, 'Testing Gym Dashboard', 'info');
        const dashboardPath = 'src/pages/gym/gym-dashboard.html';
        const exists = await this.checkFileExists(dashboardPath);
        if (exists) {
            this.log(3, 'Gym dashboard exists', 'pass');
        } else {
            this.log(3, `Gym dashboard missing: ${dashboardPath}`, 'fail');
        }
        
        // Check belt links
        this.log(4, 'Checking belt progression links', 'info');
        const beltLinks = [
            'white-belt.html',
            'blue-belt.html',
            'purple-belt.html',
            'brown-belt.html',
            'black-belt.html'
        ];
        
        for (const belt of beltLinks) {
            const fullPath = `src/pages/gym/${belt}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(4, `Belt file exists: ${belt}`, 'pass');
            } else {
                this.log(4, `Belt file missing: ${belt}`, 'fail');
            }
        }
    },
    
    async testWhiteBelt() {
        this.log(5, 'Testing White Belt Stripe Files', 'info');
        const whiteBeltStripes = [
            'white-belt-stripe1-gamified.html',
            'white-belt-stripe2-gamified.html',
            'white-belt-stripe3-gamified.html',
            'white-belt-stripe4-gamified.html'
        ];
        
        for (const stripe of whiteBeltStripes) {
            const fullPath = `src/pages/gym/${stripe}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(5, `White belt stripe exists: ${stripe}`, 'pass');
            } else {
                this.log(5, `White belt stripe missing: ${stripe}`, 'fail');
            }
        }
    },
    
    async testBlueBelt() {
        this.log(6, 'Testing Blue Belt Stripe Files', 'info');
        const blueBeltStripes = [
            'blue-belt-stripe1-gamified.html',
            'blue-belt-stripe2-gamified.html',
            'blue-belt-stripe3-gamified.html',
            'blue-belt-stripe4-gamified.html'
        ];
        
        for (const stripe of blueBeltStripes) {
            const fullPath = `src/pages/gym/${stripe}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(6, `Blue belt stripe exists: ${stripe}`, 'pass');
            } else {
                this.log(6, `Blue belt stripe missing: ${stripe}`, 'fail');
            }
        }
    },
    
    async testPurpleBelt() {
        this.log(7, 'Testing Purple Belt Stripe Files', 'info');
        const purpleBeltStripes = [
            'purple-belt-stripe1-gamified.html',
            'purple-belt-stripe2-gamified.html',
            'purple-belt-stripe3-gamified.html',
            'purple-belt-stripe4-gamified.html'
        ];
        
        for (const stripe of purpleBeltStripes) {
            const fullPath = `src/pages/gym/${stripe}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(7, `Purple belt stripe exists: ${stripe}`, 'pass');
            } else {
                this.log(7, `Purple belt stripe missing: ${stripe}`, 'fail');
            }
        }
    },
    
    async testBrownBelt() {
        this.log(8, 'Testing Brown Belt Stripe Files', 'info');
        const brownBeltStripes = [
            'brown-belt-stripe1-gamified.html',
            'brown-belt-stripe2-gamified.html',
            'brown-belt-stripe3-gamified.html',
            'brown-belt-stripe4-gamified.html'
        ];
        
        for (const stripe of brownBeltStripes) {
            const fullPath = `src/pages/gym/${stripe}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(8, `Brown belt stripe exists: ${stripe}`, 'pass');
            } else {
                this.log(8, `Brown belt stripe missing: ${stripe}`, 'fail');
            }
        }
    },
    
    async testBlackBelt() {
        this.log(9, 'Testing Black Belt Stripe Files', 'info');
        const blackBeltStripes = [
            'black-belt-stripe1-gamified.html',
            'black-belt-stripe2-gamified.html',
            'black-belt-stripe3-gamified.html',
            'black-belt-stripe4-gamified.html'
        ];
        
        for (const stripe of blackBeltStripes) {
            const fullPath = `src/pages/gym/${stripe}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(9, `Black belt stripe exists: ${stripe}`, 'pass');
            } else {
                this.log(9, `Black belt stripe missing: ${stripe}`, 'fail');
            }
        }
    },
    
    async testGames() {
        this.log(10, 'Testing Game Files', 'info');
        const games = [
            'conflict-cards.html',
            'take-the-back.html',
            'disagree-commit.html',
            'disagree-commit-roulette.html'
        ];
        
        for (const game of games) {
            const fullPath = `src/pages/games/${game}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(10, `Game exists: ${game}`, 'pass');
            } else {
                this.log(10, `Game missing: ${game}`, 'fail');
            }
        }
    },
    
    async testTools() {
        this.log(11, 'Testing Tool Files', 'info');
        const tools = [
            'tool-energy-audit.html',
            'tool-box-breathing.html',
            'tool-journal.html',
            'tool-mood-tracker.html',
            'tool-morning-routine.html',
            'tool-weekly-review.html',
            'tool-decision-framework.html',
            'tool-goal-tracker.html',
            'tool-inner-game.html'
        ];
        
        for (const tool of tools) {
            const fullPath = `src/pages/tools/${tool}`;
            const exists = await this.checkFileExists(fullPath);
            if (exists) {
                this.log(11, `Tool exists: ${tool}`, 'pass');
            } else {
                this.log(11, `Tool missing: ${tool}`, 'fail');
            }
        }
    },
    
    async runAllTests() {
        console.log('🚀 Starting TAP-IN End-to-End Test Suite...\n');
        
        await this.testAssessmentFlow();
        await this.testGymDashboard();
        await this.testWhiteBelt();
        await this.testBlueBelt();
        await this.testPurpleBelt();
        await this.testBrownBelt();
        await this.testBlackBelt();
        await this.testGames();
        await this.testTools();
        
        console.log('\n📊 Test Summary:');
        console.log(`   Total Issues Found: ${this.issues.length}`);
        if (this.issues.length > 0) {
            console.log('\n❌ Issues:');
            this.issues.forEach((issue, i) => {
                console.log(`   ${i + 1}. [Step ${issue.step}] ${issue.message}`);
            });
        } else {
            console.log('   ✅ All tests passed!');
        }
        
        return this.issues;
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.E2ETest = E2ETest;
}

// Auto-run if in browser
if (typeof window !== 'undefined' && window.location.pathname.includes('index.html')) {
    console.log('Run E2ETest.runAllTests() to start the test suite');
}

