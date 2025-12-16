/**
* Email Capture Component - Reusable for All Assessments
* GDPR-compliant email opt-in form with SendGrid integration
*/
(function() {
'use strict';
const EmailCaptureComponent = {
        // Configuration
config: {
sendgridEndpoint: '/.netlify/functions/send-results-email',
supabaseEndpoint: '/.netlify/functions/save-lead',
minDelay: 2000, // Minimum time before showing form (ms)
showDelay: 3000, // Delay after results shown (ms)
},
        /**
* Initialize email capture on results page
* @param {Object} options - Configuration options
*/
init: function(options = {}) {
this.config = { ...this.config, ...options };
            // Wait for results to be displayed
setTimeout(() => {
this.showEmailCapture();
}, this.config.showDelay);
},
        /**
* Create and display email capture form
*/
showEmailCapture: function() {
            // Check if already shown or user already submitted
if (document.getElementById('email-capture-form')) {
return;
}
            // CRITICAL: Only show if results are actually visible AND assessment is complete
            // Don't show on page load or during assessment
const resultsDiv = document.getElementById('results');
const resultsVisible = resultsDiv &&
resultsDiv.classList.contains('active') &&
resultsDiv.style.display !== 'none' &&
resultsDiv.style.display !== '';
const resultContent = document.getElementById('resultContent');
const hasResultContent = resultContent &&
resultContent.innerHTML.trim() !== '' &&
resultContent.innerHTML.trim().length > 50; // Must have substantial content
            // Also check that assessment form is NOT visible (meaning assessment is complete)
const assessmentForm = document.getElementById('assessmentForm');
const assessmentHidden = !assessmentForm ||
assessmentForm.style.display === 'none' ||
assessmentForm.classList.contains('hidden');
if (!resultsVisible || !hasResultContent || !assessmentHidden) {
                // Don't show until assessment is complete
return;
}
const assessmentType = this.config.assessmentType || 'belt-assessment';
const results = this.config.results || {};
const scores = this.config.scores || {};
            // Create form container
const formContainer = document.createElement('div');
formContainer.id = 'email-capture-container';
formContainer.className = 'visible'; // Explicitly mark as visible
formContainer.innerHTML = this.getEmailCaptureHTML(assessmentType);
            // Add CSS if not already present
if (!document.getElementById('email-capture-container-style')) {
const style = document.createElement('style');
style.id = 'email-capture-container-style';
style.textContent = `
#email-capture-container {
display: none !important;
}
#email-capture-container.visible {
display: block !important;
}
`;
document.head.appendChild(style);
}
            // Find insertion point (after results, before footer/share)
const resultsContainer = document.querySelector('.results-container') ||
document.querySelector('.assessment-results') ||
document.querySelector('.results-section') ||
document.getElementById('results');
if (resultsContainer) {
                // Insert after results container
resultsContainer.parentNode.insertBefore(formContainer, resultsContainer.nextSibling);
} else {
                // Fallback: append to body
document.body.appendChild(formContainer);
}
            // Store results data for email
formContainer.dataset.assessmentType = assessmentType;
formContainer.dataset.resultsJson = JSON.stringify(results);
formContainer.dataset.scoresJson = JSON.stringify(scores);
            // Bind form handlers
this.bindFormHandlers(formContainer);
            // Smooth scroll to form
setTimeout(() => {
formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 500);
            // Track email capture shown
if (typeof Analytics !== 'undefined') {
Analytics.track('email_capture_shown', {
assessment_type: assessmentType
});
}
},
        /**
* Get email capture form HTML
*/
getEmailCaptureHTML: function(assessmentType) {
const assessmentName = this.getAssessmentName(assessmentType);
return `
<div class="email-capture-wrapper">
<div class="email-capture-card">
<div class="email-capture-header">
<div class="email-icon">📧</div>
<h3>Get Your Complete Results Delivered</h3>
<p>Receive your detailed ${assessmentName} report via email</p>
</div>
<form id="email-capture-form" class="email-capture-form">
<div class="form-group">
<label for="email-input">Email Address *</label>
<input
type="email"
id="email-input"
name="email"
placeholder="your@email.com"
required
aria-required="true"
aria-label="Email address"
>
<span class="error-message" id="email-error"></span>
</div>
<div class="form-group checkbox-group">
<p class="checkbox-label">What would you like to receive?</p>
<label class="checkbox-label-item">
<input type="checkbox" name="options" value="pdf_report" checked>
<span>📄 PDF Report - Complete results with insights</span>
</label>
<label class="checkbox-label-item">
<input type="checkbox" name="options" value="action_plan" checked>
<span>📋 Action Plan - Personalized next steps</span>
</label>
<label class="checkbox-label-item">
<input type="checkbox" name="options" value="industry_benchmarks">
<span>📊 Industry Benchmarks - See how you compare</span>
</label>
</div>
<div class="form-group gdpr-consent">
<label class="checkbox-label-item">
<input type="checkbox" name="gdpr_consent" required aria-required="true">
<span>I agree to receive my results and future leadership insights from TAP-IN.
<a href="/privacy-policy.html" target="_blank">Privacy Policy</a></span>
</label>
</div>
<button type="submit" class="email-submit-btn" id="email-submit-btn">
<span class="btn-text">📧 Email Me My Complete Results</span>
<span class="btn-loading" style="display: none;">⏳ Sending...</span>
</button>
</form>
<div class="email-success" id="email-success" style="display: none;">
<div class="success-icon">✅</div>
<h4>Check Your Email!</h4>
<p>Your results have been sent to <strong id="success-email"></strong></p>
<p class="success-note">Didn't receive it? Check your spam folder.</p>
</div>
</div>
</div>
`;
},
        /**
* Bind form event handlers
*/
bindFormHandlers: function(container) {
const form = container.querySelector('#email-capture-form');
const emailInput = container.querySelector('#email-input');
const submitBtn = container.querySelector('#email-submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
            // Real-time email validation
emailInput.addEventListener('input', () => {
this.validateEmail(emailInput.value, container.querySelector('#email-error'));
});
            // Form submission
form.addEventListener('submit', async (e) => {
e.preventDefault();
await this.handleSubmit(form, container, submitBtn, btnText, btnLoading);
});
},
        /**
* Validate email address
*/
validateEmail: function(email, errorElement) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email) {
errorElement.textContent = '';
return false;
}
if (!emailRegex.test(email)) {
errorElement.textContent = 'Please enter a valid email address';
errorElement.style.display = 'block';
return false;
}
errorElement.textContent = '';
errorElement.style.display = 'none';
return true;
},
        /**
* Handle form submission
*/
handleSubmit: async function(form, container, submitBtn, btnText, btnLoading) {
const emailInput = form.querySelector('#email-input');
const email = emailInput.value.trim();
const errorElement = container.querySelector('#email-error');
const gdprConsent = form.querySelector('[name="gdpr_consent"]').checked;
            // Validate email
if (!this.validateEmail(email, errorElement)) {
emailInput.focus();
return;
}
            // Check GDPR consent
if (!gdprConsent) {
alert('Please accept the privacy policy to continue.');
return;
}
            // Get selected options
const selectedOptions = Array.from(form.querySelectorAll('[name="options"]:checked'))
.map(cb => cb.value);
if (selectedOptions.length === 0) {
alert('Please select at least one option to receive.');
return;
}
            // Get assessment data
const assessmentType = container.dataset.assessmentType;
const results = JSON.parse(container.dataset.resultsJson || '{}');
const scores = JSON.parse(container.dataset.scoresJson || '{}');
            // Show loading state
submitBtn.disabled = true;
btnText.style.display = 'none';
btnLoading.style.display = 'inline';
try {
                // Save lead to Supabase
const leadData = {
email: email,
assessment_type: assessmentType,
scores_json: scores,
results_json: results,
options: selectedOptions,
gdpr_consent: true,
timestamp: new Date().toISOString()
};
const leadResponse = await fetch(this.config.supabaseEndpoint, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(leadData)
});
if (!leadResponse.ok) {
throw new Error('Failed to save lead');
}
                // Send email via SendGrid
const emailData = {
email: email,
assessment_type: assessmentType,
assessment_name: this.getAssessmentName(assessmentType),
results: results,
scores: scores,
options: selectedOptions
};
const emailResponse = await fetch(this.config.sendgridEndpoint, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(emailData)
});
if (!emailResponse.ok) {
throw new Error('Failed to send email');
}
                // Success!
this.showSuccess(container, email);
                // Track conversion
if (typeof Analytics !== 'undefined') {
Analytics.track('email_capture_submitted', {
assessment_type: assessmentType,
options: selectedOptions
});
}
} catch (error) {
                console.error('Email capture error:', error);
errorElement.textContent = 'Something went wrong. Please try again or contact support.';
errorElement.style.display = 'block';
                // Reset button
submitBtn.disabled = false;
btnText.style.display = 'inline';
btnLoading.style.display = 'none';
}
},
        /**
* Show success message
*/
showSuccess: function(container, email) {
const form = container.querySelector('#email-capture-form');
const successDiv = container.querySelector('#email-success');
const successEmail = container.querySelector('#success-email');
form.style.display = 'none';
successEmail.textContent = email;
successDiv.style.display = 'block';
            // Track email sent
if (typeof Analytics !== 'undefined') {
Analytics.track('email_capture_success', {
email: email
});
}
},
        /**
* Get human-readable assessment name
*/
getAssessmentName: function(assessmentType) {
const names = {
'belt-assessment': 'Leadership Belt Assessment',
'worker-type-assessment': 'Worker Type Assessment',
'leadership-style-assessment': 'Leadership Style Assessment',
'mental-health-assessment': 'Mental Health Assessment',
'team-assessment': 'Team Assessment',
'communication-style-assessment': 'Communication Style Assessment',
'values-discovery-assessment': 'Values Discovery Assessment',
'work-life-balance-assessment': 'Work-Life Balance Assessment',
'decision-making-assessment': 'Decision Making Assessment',
'life-audit-assessment': 'Life Audit Assessment',
'mission-statement-assessment': 'Mission Statement Assessment',
'accountability-audit-assessment': 'Accountability Audit Assessment'
};
return names[assessmentType] || 'Assessment';
}
};
    // Export globally
if (typeof window !== 'undefined') {
window.EmailCaptureComponent = EmailCaptureComponent;
}
    // Auto-initialize if config provided
if (typeof window.EMAIL_CAPTURE_CONFIG !== 'undefined') {
document.addEventListener('DOMContentLoaded', () => {
EmailCaptureComponent.init(window.EMAIL_CAPTURE_CONFIG);
});
}
})();