// Netlify Function: Join Team
// POST /.netlify/functions/join-team
// Body: { inviteCode: string }
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);
exports.handler = async (event, context) => {
const headers = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'Content-Type, Authorization',
'Access-Control-Allow-Methods': 'POST, OPTIONS',
'Content-Type': 'application/json'
};
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
        // Authenticate user
const authHeader = event.headers.authorization;
if (!authHeader) {
return {
statusCode: 401,
headers,
body: JSON.stringify({ error: 'No authorization header' })
};
}
const token = authHeader.replace('Bearer ', '');
const { data: { user }, error: authError } = await supabase.auth.getUser(token);
if (authError || !user) {
return {
statusCode: 401,
headers,
body: JSON.stringify({ error: 'Invalid or expired token' })
};
}
        // Parse request
const { inviteCode } = JSON.parse(event.body);
if (!inviteCode || inviteCode.trim().length === 0) {
return {
statusCode: 400,
headers,
body: JSON.stringify({ error: 'Invite code is required' })
};
}
const cleanCode = inviteCode.trim().toLowerCase();
        // Find team by invite code
const { data: team, error: teamError } = await supabase
.from('teams')
.select('*')
.eq('invite_code', cleanCode)
.single();
if (teamError || !team) {
            console.error('Team lookup error:', teamError);
return {
statusCode: 404,
headers,
body: JSON.stringify({ error: 'Invalid invite code. Team not found.' })
};
}
        // Check if already a member
const { data: existingMember } = await supabase
.from('team_members')
.select('*')
.eq('team_id', team.id)
.eq('user_id', user.id)
.maybeSingle();
if (existingMember) {
return {
statusCode: 400,
headers,
body: JSON.stringify({
error: 'You are already a member of this team',
team: team
})
};
}
        // Add user to team
const { data: membership, error: memberError } = await supabase
.from('team_members')
.insert({
team_id: team.id,
user_id: user.id,
role: 'member'
})
.select()
.single();
if (memberError) {
            console.error('Add member error:', memberError);
return {
statusCode: 500,
headers,
body: JSON.stringify({ error: 'Failed to join team' })
};
}
        // Get member count
const { count } = await supabase
.from('team_members')
.select('*', { count: 'exact', head: true })
.eq('team_id', team.id);
return {
statusCode: 200,
headers,
body: JSON.stringify({
success: true,
message: `Successfully joined ${team.name}!`,
team: {
...team,
role: membership.role,
member_count: count || 1
}
})
};
} catch (error) {
        console.error('Join team function error:', error);
return {
statusCode: 500,
headers,
body: JSON.stringify({ error: 'Internal server error' })
};
}
};