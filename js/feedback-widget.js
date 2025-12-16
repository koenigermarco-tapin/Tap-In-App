/**
* TAP-IN Feedback Widget
* Collect user feedback on any page
*/
(function() {
'use strict';
const FeedbackWidget = {
init: function() {
this.createWidget();
this.attachEvents();
},
createWidget: function() {
const widget = document.createElement('div');
widget.id = 'feedback-widget';
widget.innerHTML = `
<button class="feedback-trigger" aria-label="Send feedback">
💬 Feedback
</button>
<div class="feedback-panel" id="feedbackPanel" hidden role="dialog" aria-labelledby="feedback-title" aria-modal="true">
<div class="feedback-header">
<h3 id="feedback-title">Send Feedback</h3>
<button class="close-feedback" onclick="FeedbackWidget.close()" aria-label="Close feedback">×</button>
</div>
<form id="feedbackForm">
<div class="feedback-type">
<label for="feedback-type-select">Type of feedback:</label>
<select name="type" id="feedback-type-select" required aria-required="true">
<option value="">Select...</option>
<option value="bug">🐛 Bug Report</option>
<option value="feature">💡 Feature Request</option>
<option value="praise">❤️ Praise</option>
<option value="question">❓ Question</option>
<option value="other">📝 Other</option>
</select>
</div>
<div class="feedback-message">
<label for="feedback-text">Your feedback:</label>
<textarea
id="feedback-text"
name="message"
required
rows="4"
placeholder="Tell us what you think..."
aria-required="true"
></textarea>
</div>
<div class="feedback-contact">
<label for="feedback-email">Email (optional):</label>
<input
type="email"
id="feedback-email"
name="email"
placeholder="your@email.com"
aria-label="Email address for feedback response"
>
</div>
<div class="feedback-actions">
<button type="submit" class="btn-submit">Send Feedback</button>
<button type="button" class="btn-cancel" onclick="FeedbackWidget.close()">Cancel</button>
</div>
</form>
<div class="feedback-success" id="feedbackSuccess" hidden>
<p>✅ Thank you for your feedback!</p>
<button class="btn-close" onclick="FeedbackWidget.close()">Close</button>
</div>
</div>
`;
document.body.appendChild(widget);
this.addStyles();
},
addStyles: function() {
if (document.getElementById('feedback-widget-styles')) return;
const style = document.createElement('style');
style.id = 'feedback-widget-styles';
style.textContent = `
#feedback-widget {
position: fixed;
bottom: 20px;
right: 20px;
z-index: 1000;
}
.feedback-trigger {
background: linear-gradient(135deg, #4a7c9c 0%, #5a8cac 100%);
color: white;
border: none;
padding: 12px 20px;
border-radius: 24px;
font-weight: 600;
cursor: pointer;
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
transition: all 0.3s;
font-size: 14px;
}
.feedback-trigger:hover,
.feedback-trigger:focus {
transform: translateY(-2px);
box-shadow: 0 6px 16px rgba(0,0,0,0.2);
outline: 3px solid #4a7c9c;
outline-offset: 2px;
}
.feedback-panel {
position: absolute;
bottom: 60px;
right: 0;
background: white;
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0,0,0,0.15);
width: 350px;
max-width: calc(100vw - 40px);
max-height: 80vh;
overflow-y: auto;
}
.feedback-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px 20px 16px;
border-bottom: 1px solid #e5e7eb;
}
.feedback-header h3 {
margin: 0;
color: #1a365d;
font-size: 20px;
}
.close-feedback {
background: none;
border: none;
font-size: 24px;
cursor: pointer;
padding: 0;
color: #64748b;
line-height: 1;
width: 32px;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px;
transition: background 0.2s;
}
.close-feedback:hover,
.close-feedback:focus {
background: rgba(100, 116, 139, 0.1);
color: #1a365d;
outline: 2px solid #4a7c9c;
outline-offset: 2px;
}
#feedbackForm {
padding: 20px;
}
.feedback-type,
.feedback-message,
.feedback-contact {
margin-bottom: 16px;
}
.feedback-type label,
.feedback-message label,
.feedback-contact label {
display: block;
margin-bottom: 8px;
font-weight: 600;
color: #1a365d;
}
.feedback-type select,
.feedback-message textarea,
.feedback-contact input {
width: 100%;
padding: 10px 12px;
border: 1px solid #d1d5db;
border-radius: 8px;
font-family: inherit;
font-size: 14px;
transition: border-color 0.2s;
}
.feedback-type select:focus,
.feedback-message textarea:focus,
.feedback-contact input:focus {
outline: 3px solid #4a7c9c;
outline-offset: 2px;
border-color: #4a7c9c;
}
.feedback-message textarea {
resize: vertical;
min-height: 80px;
}
.feedback-actions {
display: flex;
gap: 8px;
}
.btn-submit,
.btn-cancel {
flex: 1;
padding: 10px;
border: none;
border-radius: 8px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s;
font-size: 14px;
}
.btn-submit {
background: #4a7c9c;
color: white;
}
.btn-submit:hover,
.btn-submit:focus {
background: #5a8cac;
outline: 3px solid #4a7c9c;
outline-offset: 2px;
}
.btn-cancel {
background: #f1f5f9;
color: #64748b;
}
.btn-cancel:hover,
.btn-cancel:focus {
background: #e5e7eb;
outline: 2px solid #64748b;
outline-offset: 2px;
}
.feedback-success {
padding: 40px 20px;
text-align: center;
}
.feedback-success p {
font-size: 18px;
margin-bottom: 20px;
color: #1a365d;
}
.btn-close {
background: #4a7c9c;
color: white;
border: none;
padding: 10px 24px;
border-radius: 8px;
font-weight: 600;
cursor: pointer;
transition: background 0.3s;
}
.btn-close:hover,
.btn-close:focus {
background: #5a8cac;
outline: 3px solid #4a7c9c;
outline-offset: 2px;
}
@media (max-width: 768px) {
#feedback-widget {
bottom: 10px;
right: 10px;
}
.feedback-trigger {
padding: 10px 16px;
font-size: 12px;
}
.feedback-panel {
width: calc(100vw - 20px);
bottom: 50px;
right: 0;
}
}
`;
document.head.appendChild(style);
},
attachEvents: function() {
      // Open panel
document.querySelector('.feedback-trigger').addEventListener('click', () => {
this.open();
});
      // Submit form
document.getElementById('feedbackForm').addEventListener('submit', (e) => {
e.preventDefault();
this.submitFeedback(new FormData(e.target));
});
      // Close on Escape
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && !document.getElementById('feedbackPanel').hasAttribute('hidden')) {
this.close();
}
});
},
open: function() {
const panel = document.getElementById('feedbackPanel');
panel.removeAttribute('hidden');
document.getElementById('feedback-text').focus();
      // Track analytics
if (window.Analytics) {
window.Analytics.track('feedback_opened');
}
},
close: function() {
const panel = document.getElementById('feedbackPanel');
panel.setAttribute('hidden', 'true');
this.resetForm();
},
submitFeedback: function(formData) {
const feedback = {
type: formData.get('type'),
message: formData.get('message'),
email: formData.get('email'),
page: window.location.pathname,
userAgent: navigator.userAgent,
timestamp: new Date().toISOString(),
belt: localStorage.getItem('currentBelt'),
xp: localStorage.getItem('totalXP')
};
      // Track analytics
if (window.Analytics) {
window.Analytics.track('feedback_submitted', {
type: feedback.type,
page: feedback.page
});
}
      // Store locally (for now - replace with backend API later)
this.storeFeedbackLocally(feedback);
      // Show success
this.showSuccess();
},
storeFeedbackLocally: function(feedback) {
try {
const feedbacks = JSON.parse(localStorage.getItem('pending_feedback') || '[]');
feedbacks.push(feedback);
        // Keep last 50
const recent = feedbacks.slice(-50);
localStorage.setItem('pending_feedback', JSON.stringify(recent));
} catch (e) {
        console.warn('Could not store feedback locally:', e);
}
},
showSuccess: function() {
document.getElementById('feedbackForm').hidden = true;
document.getElementById('feedbackSuccess').removeAttribute('hidden');
      // Auto-close after 3 seconds
setTimeout(() => {
this.close();
}, 3000);
},
resetForm: function() {
document.getElementById('feedbackForm').reset();
document.getElementById('feedbackForm').hidden = false;
document.getElementById('feedbackSuccess').setAttribute('hidden', 'true');
}
};
  // Auto-initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => FeedbackWidget.init());
} else {
FeedbackWidget.init();
}
  // Export for global use
window.FeedbackWidget = FeedbackWidget;
})();