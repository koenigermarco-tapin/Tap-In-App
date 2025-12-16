/**
* Supabase Client Wrapper
* Loads Supabase from CDN and initializes client
*/
(function() {
'use strict';
const SUPABASE_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    // Check if already loaded
if (typeof window.supabase !== 'undefined' && window.supabaseClient) {
        console.log('✅ Supabase already initialized');
return;
}
    // Load Supabase from CDN if not already loaded
if (typeof window.supabase === 'undefined') {
const script = document.createElement('script');
script.src = SUPABASE_CDN;
script.async = true;
script.onload = function() {
            console.log('✅ Supabase library loaded');
initializeSupabase();
};
script.onerror = function() {
            console.error('❌ Failed to load Supabase from CDN');
            console.log('Falling back to localStorage-only mode');
};
document.head.appendChild(script);
} else {
        // Supabase already loaded, just initialize
initializeSupabase();
}
function initializeSupabase() {
        // Get config from multiple sources
const SUPABASE_URL = window.SUPABASE_URL ||
(typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
localStorage.getItem('supabase_url');
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY ||
(typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
localStorage.getItem('supabase_anon_key');
        // Validate configuration
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
            console.warn('⚠️ Supabase not configured - using localStorage only');
            console.log('To enable sync, set:');
            console.log('  window.SUPABASE_URL = "https://your-project.supabase.co"');
            console.log('  window.SUPABASE_ANON_KEY = "your-anon-key"');
return;
}
        // Check for placeholder values
if (SUPABASE_URL.includes('YOUR_') ||
SUPABASE_URL.includes('xxx') ||
SUPABASE_ANON_KEY.includes('YOUR_') ||
SUPABASE_ANON_KEY.includes('xxx')) {
            console.warn('⚠️ Supabase configured with placeholder values - using localStorage only');
return;
}
try {
            // Initialize Supabase client
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
auth: {
autoRefreshToken: false, // Disable for anonymous access
persistSession: false,
detectSessionInUrl: false
}
});
            console.log('✅ Supabase client initialized');
            console.log('   URL:', SUPABASE_URL);
            // Test connection
testConnection();
} catch (error) {
            console.error('❌ Supabase initialization failed:', error);
}
}
async function testConnection() {
if (!window.supabaseClient) return;
try {
            // Simple connection test - try to query user_progress
const { error } = await window.supabaseClient
.from('user_progress')
.select('count')
.limit(1);
if (error) {
                console.warn('⚠️ Supabase connection test failed:', error.message);
if (error.code === 'PGRST301') {
                    console.log('   Hint: Table might not exist. Run migration SQL first.');
}
} else {
                console.log('✅ Supabase connection test successful');
}
} catch (error) {
            console.warn('⚠️ Supabase connection test error:', error.message);
}
}
    // Expose configuration helper
window.configureSupabase = function(url, anonKey) {
window.SUPABASE_URL = url;
window.SUPABASE_ANON_KEY = anonKey;
localStorage.setItem('supabase_url', url);
localStorage.setItem('supabase_anon_key', anonKey);
        // Re-initialize if Supabase is loaded
if (typeof window.supabase !== 'undefined') {
initializeSupabase();
}
};
    // Auto-initialize on load
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initializeSupabase);
} else {
        // Already loaded, initialize immediately if Supabase is available
if (typeof window.supabase !== 'undefined') {
initializeSupabase();
}
}
})();