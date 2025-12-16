/**
* Netlify Function: Send Assessment Results Email via SendGrid
* Sends personalized assessment results with PDF attachment
*/
// Note: Node.js 18+ has native fetch, but using node-fetch for compatibility
// node-fetch is installed in top-level package.json
const fetch = require('node-fetch');
exports.handler = async (event, context) => {
    // CORS headers
const headers = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'Content-Type',
'Access-Control-Allow-Methods': 'POST, OPTIONS',
'Content-Type': 'application/json'
};
    // Handle CORS preflight
if (event.httpMethod === 'OPTIONS') {
return {
statusCode: 200,
headers,
body: ''
};
}
    // Only allow POST
if (event.httpMethod !== 'POST') {
return {
statusCode: 405,
headers,
body: JSON.stringify({ error: 'Method not allowed' })
};
}
try {
const data = JSON.parse(event.body);
const { email, assessment_type, assessment_name, results, scores, options } = data;
        // Validate required fields
if (!email || !assessment_type) {
return {
statusCode: 400,
headers,
body: JSON.stringify({ error: 'Missing required fields' })
};
}
        // Get SendGrid API key from environment
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
            console.error('SendGrid API key not configured');
return {
statusCode: 500,
headers,
body: JSON.stringify({ error: 'Email service not configured' })
};
}
        // Get email template
const emailContent = generateEmailContent(assessment_type, assessment_name, results, scores, options);
        // Prepare SendGrid payload
const sendGridPayload = {
personalizations: [{
to: [{ email: email }],
subject: `Your ${assessment_name || 'Assessment'} Results - TAP-IN`
}],
from: {
email: process.env.SENDGRID_FROM_EMAIL || 'results@tap-in.com',
name: 'TAP-IN Leadership Academy'
},
content: [{
type: 'text/html',
value: emailContent
}],
            // Add tracking
tracking_settings: {
click_tracking: { enable: true },
open_tracking: { enable: true }
}
};
        // Add PDF attachment if requested
if (options && options.includes('pdf_report')) {
            // Generate PDF (you'll need to implement PDF generation)
            // For now, we'll add a placeholder
            // const pdfBuffer = await generatePDF(results, scores, assessment_type);
            // sendGridPayload.attachments = [{
            //     content: pdfBuffer.toString('base64'),
            //     filename: `${assessment_type}-results.pdf`,
            //     type: 'application/pdf',
            //     disposition: 'attachment'
            // }];
}
        // Send email via SendGrid
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
method: 'POST',
headers: {
'Authorization': `Bearer ${SENDGRID_API_KEY}`,
'Content-Type': 'application/json'
},
body: JSON.stringify(sendGridPayload)
});
if (!response.ok) {
const errorText = await response.text();
            console.error('SendGrid error:', errorText);
throw new Error(`SendGrid API error: ${response.status}`);
}
        // Success
return {
statusCode: 200,
headers,
body: JSON.stringify({
success: true,
message: 'Email sent successfully'
})
};
} catch (error) {
        console.error('Email send error:', error);
return {
statusCode: 500,
headers,
body: JSON.stringify({
error: 'Failed to send email',
message: error.message
})
};
}
};
/**
* Generate email HTML content
*/
function generateEmailContent(assessmentType, assessmentName, results, scores, options) {
const assessmentTitle = assessmentName || 'Assessment';
    // Get personalized action items based on results
const actionItems = generateActionItems(assessmentType, results, scores);
    // Base email template
return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your ${assessmentTitle} Results</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
<!-- Header -->
<div style="background: linear-gradient(135deg, #1a365d 0%, #7c3aed 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
<h1 style="color: white; margin: 0; font-size: 28px;">Your ${assessmentTitle} Results</h1>
<p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">TAP-IN Leadership Academy</p>
</div>
<!-- Main Content -->
<div style="background: #ffffff; padding: 40px 20px; border: 1px solid #e2e8f0; border-top: none;">
<p style="font-size: 16px; margin-bottom: 30px;">
Thank you for completing your ${assessmentTitle}! Here are your personalized results and next steps.
</p>
<!-- Results Summary -->
${generateResultsSummary(assessmentType, results, scores)}
<!-- Action Items -->
<div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 30px 0;">
<h2 style="color: #1a365d; font-size: 22px; margin-top: 0;">🎯 Your Personalized Action Plan</h2>
<ol style="margin: 20px 0; padding-left: 20px;">
${actionItems.map(item => `<li style="margin-bottom: 15px; color: #475569;">${item}</li>`).join('')}
</ol>
</div>
<!-- Attachments Note -->
${options && options.includes('pdf_report') ? `
<div style="background: #fff7ed; border: 1px solid #fed7aa; padding: 20px; border-radius: 8px; margin: 30px 0;">
<p style="margin: 0; color: #92400e;">
<strong>📄 PDF Report:</strong> Your complete results report is attached to this email.
</p>
</div>
` : ''}
${options && options.includes('industry_benchmarks') ? `
<div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px; margin: 30px 0;">
<p style="margin: 0; color: #1e40af;">
<strong>📊 Industry Benchmarks:</strong> You'll receive comparison data in a separate email within 24 hours.
</p>
</div>
` : ''}
<!-- CTA Button -->
<div style="text-align: center; margin: 40px 0;">
<a href="https://tap-in-platform.netlify.app/book-strategy-session.html"
style="display: inline-block; background: linear-gradient(135deg, #1a365d 0%, #7c3aed 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px;">
Book Free Strategy Session →
</a>
</div>
</div>
<!-- Footer -->
<div style="background: #f8fafc; padding: 30px 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
<p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
Questions? Reply to this email or visit our
<a href="https://tap-in-platform.netlify.app" style="color: #7c3aed;">website</a>
</p>
<p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
TAP-IN Leadership Academy<br>
<a href="https://tap-in-platform.netlify.app/privacy-policy.html" style="color: #94a3b8;">Privacy Policy</a> |
<a href="https://tap-in-platform.netlify.app/unsubscribe.html" style="color: #94a3b8;">Unsubscribe</a>
</p>
</div>
</body>
</html>
`;
}
/**
* Generate results summary HTML
*/
function generateResultsSummary(assessmentType, results, scores) {
if (assessmentType === 'belt-assessment') {
const belt = results.belt || 'White';
const score = results.totalScore || 0;
return `
<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0;">
<div style="font-size: 48px; margin-bottom: 10px;">${getBeltEmoji(belt)}</div>
<h2 style="color: #1a365d; font-size: 28px; margin: 10px 0;">${belt} Belt</h2>
<p style="color: #64748b; font-size: 18px; margin: 0;">Overall Score: ${score}%</p>
</div>
`;
}
    // Generic summary
if (scores && typeof scores === 'object') {
const scoreEntries = Object.entries(scores);
return `
<div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 30px 0;">
<h2 style="color: #1a365d; font-size: 22px; margin-top: 0;">Your Scores</h2>
${scoreEntries.map(([key, value]) => `
<div style="margin-bottom: 15px;">
<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
<span style="color: #475569; text-transform: capitalize;">${key.replace(/_/g, ' ')}</span>
<span style="color: #1a365d; font-weight: 600;">${value}%</span>
</div>
<div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
<div style="background: ${getScoreColor(value)}; height: 100%; width: ${value}%;"></div>
</div>
</div>
`).join('')}
</div>
`;
}
return '';
}
/**
* Generate personalized action items
*/
function generateActionItems(assessmentType, results, scores) {
const items = [];
    // Belt assessment specific
if (assessmentType === 'belt-assessment') {
const belt = results.belt || 'White';
items.push(`Continue your ${belt} Belt journey by completing the next stripe lessons`);
items.push(`Focus on building trust and psychological safety in your team`);
items.push(`Schedule a strategy session to create your personalized development plan`);
} else {
        // Generic action items
items.push(`Review your results and identify your top 2 strengths to leverage`);
items.push(`Choose one growth area to focus on over the next 30 days`);
items.push(`Book a free strategy session to create your personalized action plan`);
}
return items;
}
/**
* Get belt emoji
*/
function getBeltEmoji(belt) {
const emojis = {
'White': '⚪',
'Blue': '🔵',
'Purple': '🟣',
'Brown': '🟤',
'Black': '⚫'
};
return emojis[belt] || '🥋';
}
/**
* Get color for score
*/
function getScoreColor(score) {
if (score >= 80) return '#10b981';
if (score >= 60) return '#f59e0b';
return '#ef4444';
}