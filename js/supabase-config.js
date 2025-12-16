// TAP-IN - Supabase Disabled (Using LocalStorage Only)
// This eliminates 600+ console warnings
let supabase = null;
let supabaseReady = false;
// Silent mode - no console warnings
window.SupabaseClient = null;
window.supabaseReady = false;
console.log('✅ TAP-IN running in localStorage-only mode');