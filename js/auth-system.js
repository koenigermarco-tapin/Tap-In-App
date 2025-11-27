/**
 * Authentication System
 * Optional anonymous authentication for cloud sync
 */

const AuthSystem = {
  currentUser: null,
  profile: null,
  
  async init() {
    if (!window.supabaseReady) {
      console.log('💾 Auth: localStorage-only mode');
      return;
    }
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        this.currentUser = session.user;
        await this.loadProfile();
      }
    } catch (error) {
      console.error('Auth init failed:', error);
    }
  },
  
  async loadProfile() {
    if (!this.currentUser) return;
    
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', this.currentUser.id)
      .single();
    
    if (data) {
      this.profile = data;
      this.syncToLocalStorage();
    }
  },
  
  syncToLocalStorage() {
    if (!this.profile) return;
    
    localStorage.setItem('userId', this.profile.id);
    localStorage.setItem('userName', this.profile.username);
    localStorage.setItem('totalXP', this.profile.total_xp || '0');
    localStorage.setItem('currentBelt', this.profile.current_belt || 'white');
    localStorage.setItem('currentStripe', this.profile.current_stripe || '1');
  },
  
  async syncProgress() {
    if (!this.profile || !window.supabaseReady) return;
    
    const { error } = await supabase
      .from('users')
      .update({
        total_xp: parseInt(localStorage.getItem('totalXP') || '0'),
        current_belt: localStorage.getItem('currentBelt') || 'white',
        current_stripe: parseInt(localStorage.getItem('currentStripe') || '1'),
        last_active: new Date().toISOString()
      })
      .eq('id', this.profile.id);
    
    if (!error) {
      console.log('☁️ Progress synced');
    }
  },
  
  async signInAnonymously() {
    if (!window.supabaseReady) {
      console.warn('Supabase not configured');
      return false;
    }
    
    const { data, error } = await supabase.auth.signInAnonymously();
    
    if (error) {
      console.error('❌ Anonymous sign in failed:', error);
      return false;
    }
    
    this.currentUser = data.user;
    console.log('✅ Signed in anonymously');
    return true;
  }
};

window.AuthSystem = AuthSystem;

