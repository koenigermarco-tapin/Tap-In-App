// Netlify Function: Create Team
// POST /.netlify/functions/create-team
// Body: { name: string, description?: string }

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for admin operations
);

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
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
        // Get user from authorization header
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

        // Parse request body
        const { name, description = '' } = JSON.parse(event.body);

        if (!name || name.trim().length === 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Team name is required' })
            };
        }

        // Create team
        const { data: team, error: teamError } = await supabase
            .from('teams')
            .insert({
                name: name.trim(),
                description: description.trim(),
                created_by: user.id
            })
            .select()
            .single();

        if (teamError) {
            console.error('Team creation error:', teamError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to create team' })
            };
        }

        // Team member is automatically added via trigger, but let's verify
        const { data: membership } = await supabase
            .from('team_members')
            .select('*')
            .eq('team_id', team.id)
            .eq('user_id', user.id)
            .single();

        return {
            statusCode: 201,
            headers,
            body: JSON.stringify({
                success: true,
                team: {
                    ...team,
                    role: membership?.role || 'admin'
                }
            })
        };

    } catch (error) {
        console.error('Create team function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
