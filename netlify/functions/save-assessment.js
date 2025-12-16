// Netlify Function to save assessment data
// This can connect to: Supabase, Airtable, Google Sheets, or Netlify Blobs
const { createClient } = require('@supabase/supabase-js');
// Environment variables (set in Netlify dashboard)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
exports.handler = async (event, context) => {
  // CORS headers
const headers = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'Content-Type',
'Access-Control-Allow-Methods': 'POST, OPTIONS',
'Content-Type': 'application/json'
};
  // Handle preflight
if (event.httpMethod === 'OPTIONS') {
return { statusCode: 200, headers, body: '' };
}
if (event.httpMethod !== 'POST') {
return {
statusCode: 405,
headers,
body: JSON.stringify({ error: 'Method not allowed' })
};
}
try {
const data = JSON.parse(event.body);
    // Validate data
if (!data.timestamp || !data.assessmentType) {
return {
statusCode: 400,
headers,
body: JSON.stringify({ error: 'Missing required fields' })
};
}
    // Add metadata
const enrichedData = {
...data,
ip: event.headers['x-forwarded-for'] || event.headers['client-ip'],
userAgent: event.headers['user-agent'],
referer: event.headers['referer'] || event.headers['referrer'],
savedAt: new Date().toISOString()
};
    // Option 1: Save to Supabase (recommended)
if (SUPABASE_URL && SUPABASE_KEY) {
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const { data: result, error } = await supabase
.from('assessments')
.insert([{
assessment_type: enrichedData.assessmentType,
timestamp: enrichedData.timestamp,
total_score: enrichedData.totalScore,
max_score: enrichedData.maxScore,
percentage: enrichedData.percentage,
level_text: enrichedData.levelText,
categories: enrichedData.categories,
details: enrichedData.details,
user_agent: enrichedData.userAgent,
language: enrichedData.language,
ip_address: enrichedData.ip,
referer: enrichedData.referer,
framework: enrichedData.framework
}]);
if (error) throw error;
      console.log('Saved to Supabase:', result);
}
    // Option 2: Send to Google Sheets
if (GOOGLE_SHEETS_URL) {
await fetch(GOOGLE_SHEETS_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(enrichedData)
});
      console.log('Sent to Google Sheets');
}
    // Option 3: Save to Netlify Blobs (simple key-value storage)
    // Uncomment if you want to use Netlify Blobs:
    /*
const { getStore } = await import('@netlify/blobs');
const store = getStore('assessments');
const id = `${enrichedData.assessmentType}-${Date.now()}`;
await store.set(id, JSON.stringify(enrichedData));
    console.log('Saved to Netlify Blobs:', id);
*/
return {
statusCode: 200,
headers,
body: JSON.stringify({
success: true,
message: 'Assessment data saved successfully',
timestamp: enrichedData.timestamp
})
};
} catch (error) {
    console.error('Error saving assessment:', error);
return {
statusCode: 500,
headers,
body: JSON.stringify({
error: 'Failed to save assessment data',
message: error.message
})
};
}
};