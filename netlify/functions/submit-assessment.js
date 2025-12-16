const { createClient } = require('@supabase/supabase-js');
exports.handler = async (event) => {
    // Only allow POST
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}
try {
const { email, name, assessmentType, scores } = JSON.parse(event.body);
        // Validate email
if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
return {
statusCode: 400,
body: JSON.stringify({ error: 'Valid email required' })
};
}
        // Initialize Supabase client
const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY // Use service key for admin access
);
        // Check if email already used for this assessment type
const { data: existing, error: checkError } = await supabase
.from('assessments')
.select('id, created_at')
.eq('email', email.toLowerCase())
.eq('assessment_type', assessmentType)
.single();
if (existing) {
            // Email already used for this assessment
const date = new Date(existing.created_at).toLocaleDateString();
return {
statusCode: 409, // Conflict
body: JSON.stringify({
error: 'email_already_used',
message: `This email was already used for this assessment on ${date}. Each email can only be used once per assessment type.`,
existingDate: existing.created_at
})
};
}
        // Check if lead exists
const { data: lead, error: leadError } = await supabase
.from('leads')
.select('id')
.eq('email', email.toLowerCase())
.single();
let leadId;
if (lead) {
            // Lead exists, use existing ID
leadId = lead.id;
} else {
            // Create new lead
const { data: newLead, error: createLeadError } = await supabase
.from('leads')
.insert([{
email: email.toLowerCase(),
name: name || null,
source: 'assessment',
metadata: {
firstAssessment: assessmentType,
userAgent: event.headers['user-agent'],
referrer: event.headers['referer']
}
}])
.select()
.single();
if (createLeadError) {
                console.error('Error creating lead:', createLeadError);
return {
statusCode: 500,
body: JSON.stringify({ error: 'Failed to create lead' })
};
}
leadId = newLead.id;
}
        // Insert assessment record
const assessmentData = {
lead_id: leadId,
email: email.toLowerCase(), // Denormalized for easier querying
assessment_type: assessmentType,
...scores
};
const { data: assessment, error: assessmentError } = await supabase
.from('assessments')
.insert([assessmentData])
.select()
.single();
if (assessmentError) {
            console.error('Error creating assessment:', assessmentError);
return {
statusCode: 500,
body: JSON.stringify({ error: 'Failed to save assessment' })
};
}
        // Success response
return {
statusCode: 200,
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
success: true,
assessmentId: assessment.id,
leadId: leadId,
message: 'Assessment saved successfully'
})
};
} catch (error) {
        console.error('Function error:', error);
return {
statusCode: 500,
body: JSON.stringify({
error: 'Internal server error',
message: error.message
})
};
}
};