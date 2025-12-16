/**
* Netlify Function: Save Lead to Supabase
* Stores email and assessment data in Supabase 'leads' table
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
const { email, assessment_type, scores_json, results_json, options, gdpr_consent } = data;
        // Validate required fields
if (!email || !assessment_type) {
return {
statusCode: 400,
headers,
body: JSON.stringify({ error: 'Missing required fields: email and assessment_type' })
};
}
        // Get Supabase credentials from environment
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            console.error('Supabase credentials not configured');
return {
statusCode: 500,
headers,
body: JSON.stringify({ error: 'Database not configured' })
};
}
        // Prepare lead data
const leadData = {
email: email.toLowerCase().trim(),
assessment_type: assessment_type,
scores_json: scores_json || {},
results_json: results_json || {},
options: options || [],
gdpr_consent: gdpr_consent || false,
lead_status: 'new',
lead_score: 10, // Initial score for assessment completion
newsletter_subscribed: true,
created_at: new Date().toISOString(),
updated_at: new Date().toISOString()
};
        // Insert into Supabase
const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
method: 'POST',
headers: {
'apikey': SUPABASE_SERVICE_KEY,
'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
'Content-Type': 'application/json',
'Prefer': 'return=representation'
},
body: JSON.stringify(leadData)
});
if (!response.ok) {
const errorText = await response.text();
            // Handle duplicate email (update existing record)
if (response.status === 409 || errorText.includes('duplicate')) {
                // Update existing lead
const updateResponse = await fetch(
`${SUPABASE_URL}/rest/v1/leads?email=eq.${encodeURIComponent(leadData.email)}`,
{
method: 'PATCH',
headers: {
'apikey': SUPABASE_SERVICE_KEY,
'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
'Content-Type': 'application/json',
'Prefer': 'return=representation'
},
body: JSON.stringify({
assessment_type: assessment_type,
scores_json: scores_json || {},
results_json: results_json || {},
options: options || [],
updated_at: new Date().toISOString(),
                            // Increment assessments completed
assessments_completed: `coalesce(assessments_completed, 0) + 1`
})
}
);
if (!updateResponse.ok) {
throw new Error('Failed to update existing lead');
}
return {
statusCode: 200,
headers,
body: JSON.stringify({
success: true,
message: 'Lead updated successfully',
action: 'updated'
})
};
}
            console.error('Supabase error:', errorText);
throw new Error(`Supabase API error: ${response.status}`);
}
const result = await response.json();
        // Auto-tag in Mailchimp/HubSpot if configured
if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
            // Add to Mailchimp (fire and forget)
fetch('https://us1.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST_ID + '/members', {
method: 'POST',
headers: {
'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({
email_address: email,
status: 'subscribed',
tags: ['assessment-completed', assessment_type],
merge_fields: {
ASSESSMENT: assessment_type
}
})
}).catch(err => );
}
        // Success
return {
statusCode: 200,
headers,
body: JSON.stringify({
success: true,
message: 'Lead saved successfully',
action: 'created',
data: result[0] || result
})
};
} catch (error) {
        console.error('Save lead error:', error);
return {
statusCode: 500,
headers,
body: JSON.stringify({
error: 'Failed to save lead',
message: error.message
})
};
}
};