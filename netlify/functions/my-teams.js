// Netlify Function: Get My Teams
// GET /.netlify/functions/my-teams

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'GET') {
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

        // Get user's team memberships
        const { data: memberships, error: memberError } = await supabase
            .from('team_members')
            .select('team_id, role, joined_at')
            .eq('user_id', user.id);

        if (memberError) {
            console.error('Get memberships error:', memberError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to fetch teams' })
            };
        }

        if (!memberships || memberships.length === 0) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ teams: [] })
            };
        }

        const teamIds = memberships.map(m => m.team_id);

        // Get team details with member count
        const { data: teams, error: teamsError } = await supabase
            .from('teams')
            .select('*')
            .in('id', teamIds);

        if (teamsError) {
            console.error('Get teams error:', teamsError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to fetch team details' })
            };
        }

        // Get member counts for each team
        const teamsWithDetails = await Promise.all(
            teams.map(async (team) => {
                const membership = memberships.find(m => m.team_id === team.id);
                
                // Get member count
                const { count } = await supabase
                    .from('team_members')
                    .select('*', { count: 'exact', head: true })
                    .eq('team_id', team.id);

                // Get assessment count
                const { count: assessmentCount } = await supabase
                    .from('assessments')
                    .select('*', { count: 'exact', head: true })
                    .eq('team_id', team.id)
                    .eq('is_shared_with_team', true);

                return {
                    ...team,
                    role: membership?.role,
                    joined_at: membership?.joined_at,
                    member_count: count || 0,
                    assessment_count: assessmentCount || 0
                };
            })
        );

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ teams: teamsWithDetails })
        };

    } catch (error) {
        console.error('My teams function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
