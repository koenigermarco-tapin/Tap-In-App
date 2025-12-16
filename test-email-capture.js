/**
* Test Script for Email Capture System
* Tests SendGrid and Supabase integration
*/
const fetch = require('node-fetch');
// Configuration - Update with your values
const CONFIG = {
NETLIFY_URL: process.env.NETLIFY_URL || 'http://localhost:8888',
TEST_EMAIL: process.env.TEST_EMAIL || 'test@example.com'
};
async function testSaveLead() {
    console.log('🧪 Testing Save Lead Function...');
const testData = {
email: CONFIG.TEST_EMAIL,
assessment_type: 'belt-assessment',
scores_json: {
totalScore: 85,
trustScore: 80,
conflictScore: 90
},
results_json: {
belt: 'Blue',
modifier: 'Trust Builder'
},
options: ['pdf_report', 'action_plan'],
gdpr_consent: true
};
try {
const response = await fetch(`${CONFIG.NETLIFY_URL}/.netlify/functions/save-lead`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(testData)
});
const result = await response.json();
if (response.ok) {
            console.log('✅ Save Lead: SUCCESS');
            console.log('   Result:', result);
return true;
} else {
            console.log('❌ Save Lead: FAILED');
            console.log('   Error:', result);
return false;
}
} catch (error) {
        console.log('❌ Save Lead: ERROR');
        console.log('   Error:', error.message);
return false;
}
}
async function testSendEmail() {
    console.log('\n🧪 Testing Send Email Function...');
const testData = {
email: CONFIG.TEST_EMAIL,
assessment_type: 'belt-assessment',
assessment_name: 'Leadership Belt Assessment',
results: {
belt: 'Blue',
totalScore: 85
},
scores: {
trustScore: 80,
conflictScore: 90
},
options: ['pdf_report', 'action_plan']
};
try {
const response = await fetch(`${CONFIG.NETLIFY_URL}/.netlify/functions/send-results-email`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(testData)
});
const result = await response.json();
if (response.ok) {
            console.log('✅ Send Email: SUCCESS');
            console.log('   Check inbox:', CONFIG.TEST_EMAIL);
return true;
} else {
            console.log('❌ Send Email: FAILED');
            console.log('   Error:', result);
return false;
}
} catch (error) {
        console.log('❌ Send Email: ERROR');
        console.log('   Error:', error.message);
return false;
}
}
async function runTests() {
);
    console.log('📧 EMAIL CAPTURE SYSTEM - TEST SUITE');
);
    console.log();
const results = {
saveLead: false,
sendEmail: false
};
    // Test 1: Save Lead
results.saveLead = await testSaveLead();
    // Wait a bit
await new Promise(resolve => setTimeout(resolve, 1000));
    // Test 2: Send Email
results.sendEmail = await testSendEmail();
    // Summary
);
    console.log('📊 TEST RESULTS');
);
    console.log(`Save Lead:   ${results.saveLead ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Send Email:  ${results.sendEmail ? '✅ PASS' : '❌ FAIL'}`);
    console.log();
if (results.saveLead && results.sendEmail) {
        console.log('🎉 All tests passed! System is ready.');
} else {
        console.log('⚠️  Some tests failed. Check configuration.');
}
);
}
// Run tests if executed directly
if (require.main === module) {
runTests().catch(console.error);
}
module.exports = { testSaveLead, testSendEmail };