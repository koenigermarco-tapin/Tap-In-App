// ============================================
// TAP-IN ANONYMOUS AUTH SYSTEM
// GDPR Compliant - No Personal Data Required
// ============================================

class TapInAuth {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        this.backupCode = null;
        this.initialized = false;
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    async init() {
        // Check if Supabase is available
        if (typeof supabase === 'undefined') {
            console.log('Supabase not loaded - using localStorage only');
            this.initLocalStorageMode();
            return;
        }

        try {
            this.supabase = supabase.createClient(
                window.SUPABASE_URL || 'YOUR_SUPABASE_URL',
                window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
            );

            const { data: { session } } = await this.supabase.auth.getSession();
            
            if (session) {
                this.currentUser = session.user;
                await this.loadBackupCode();
            } else {
                const savedCode = localStorage.getItem('tap_in_backup_code');
                if (savedCode) {
                    await this.restoreFromBackupCode(savedCode);
                } else {
                    await this.createAnonymousUser();
                }
            }

            this.initialized = true;
        } catch (error) {
            console.error('Auth init failed, using localStorage:', error);
            this.initLocalStorageMode();
        }
    }

    initLocalStorageMode() {
        // Fallback mode - localStorage only
        this.backupCode = localStorage.getItem('tap_in_backup_code');
        if (!this.backupCode) {
            this.backupCode = this.generateBackupCode();
            localStorage.setItem('tap_in_backup_code', this.backupCode);
        }
        this.currentUser = { id: this.backupCode };
        this.initialized = true;
    }

    // ============================================
    // BACKUP CODE GENERATION
    // ============================================
    generateBackupCode() {
        const words = [
            'alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot',
            'golf', 'hotel', 'india', 'juliet', 'kilo', 'lima',
            'mike', 'november', 'oscar', 'papa', 'quebec', 'romeo',
            'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'xray',
            'yankee', 'zulu', 'tiger', 'dragon', 'phoenix', 'falcon'
        ];
        const w1 = words[Math.floor(Math.random() * words.length)];
        const w2 = words[Math.floor(Math.random() * words.length)];
        const num = Math.floor(1000 + Math.random() * 8999);
        return `${w1}-${w2}-${num}`.toUpperCase();
    }

    // ============================================
    // ANONYMOUS USER CREATION
    // ============================================
    async createAnonymousUser() {
        if (!this.supabase) return this.initLocalStorageMode();

        try {
            const { data, error } = await this.supabase.auth.signInAnonymously();
            if (error) throw error;
            
            this.currentUser = data.user;
            this.backupCode = this.generateBackupCode();
            
            await this.saveBackupCode(this.backupCode);
            localStorage.setItem('tap_in_backup_code', this.backupCode);
            
            // Show backup code modal on first visit
            setTimeout(() => this.showBackupCodeModal(), 2000);
            
            return { success: true, userId: data.user.id, backupCode: this.backupCode };
        } catch (error) {
            console.error('Error creating anonymous user:', error);
            this.initLocalStorageMode();
            return { success: false, error };
        }
    }

    async saveBackupCode(code) {
        if (!this.supabase || !this.currentUser) return false;
        
        try {
            const { error } = await this.supabase
                .from('user_backup_codes')
                .upsert({
                    user_id: this.currentUser.id,
                    backup_code: code,
                    created_at: new Date().toISOString()
                });
            return !error;
        } catch (e) {
            console.error('Error saving backup code:', e);
            return false;
        }
    }

    async loadBackupCode() {
        if (!this.supabase || !this.currentUser) return null;
        
        try {
            const { data } = await this.supabase
                .from('user_backup_codes')
                .select('backup_code')
                .eq('user_id', this.currentUser.id)
                .single();
            
            if (data) {
                this.backupCode = data.backup_code;
                localStorage.setItem('tap_in_backup_code', this.backupCode);
            }
            return this.backupCode;
        } catch (e) {
            return localStorage.getItem('tap_in_backup_code');
        }
    }

    async restoreFromBackupCode(code) {
        if (!this.supabase) {
            localStorage.setItem('tap_in_backup_code', code);
            this.backupCode = code;
            this.currentUser = { id: code };
            return { success: true };
        }

        try {
            const { data: codeData } = await this.supabase
                .from('user_backup_codes')
                .select('user_id')
                .eq('backup_code', code)
                .single();

            if (!codeData) throw new Error('Invalid backup code');

            const { data } = await this.supabase.auth.signInAnonymously();
            this.currentUser = data.user;
            this.backupCode = code;
            localStorage.setItem('tap_in_backup_code', code);
            
            return { success: true, userId: data.user.id };
        } catch (error) {
            console.error('Error restoring:', error);
            return { success: false, error: error.message };
        }
    }

    // ============================================
    // PROGRESS SYNC
    // ============================================
    async syncProgress() {
        const progress = {
            currentBelt: localStorage.getItem('currentBelt') || 'white',
            totalXP: parseInt(localStorage.getItem('tapinTotalXP') || '0'),
            completedLessons: JSON.parse(localStorage.getItem('completedLessons') || '[]'),
            stripesCompleted: this.countCompletedStripes()
        };

        if (this.supabase && this.currentUser) {
            try {
                await this.supabase.from('user_progress').upsert({
                    user_id: this.currentUser.id,
                    backup_code: this.backupCode,
                    progress_data: progress,
                    updated_at: new Date().toISOString()
                });
            } catch (e) {
                console.error('Sync failed:', e);
            }
        }
        return progress;
    }

    countCompletedStripes() {
        let count = 0;
        const belts = ['white', 'blue', 'purple', 'brown', 'black'];
        belts.forEach(belt => {
            for (let i = 1; i <= 4; i++) {
                if (localStorage.getItem(`${belt}beltStripe${i}Complete`) === 'true') {
                    count++;
                }
            }
        });
        return count;
    }

    // ============================================
    // BACKUP CODE MODAL
    // ============================================
    showBackupCodeModal() {
        if (document.getElementById('backupCodeModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'backupCodeModal';
        modal.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px;">
                <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:2.5rem;border-radius:20px;max-width:450px;text-align:center;border:1px solid rgba(255,255,255,0.1);">
                    <div style="font-size:3rem;margin-bottom:1rem;">🔐</div>
                    <h2 style="margin-bottom:1rem;color:#fff;font-size:1.5rem;">Save Your Progress Code</h2>
                    <p style="color:#a0aec0;margin-bottom:1.5rem;font-size:0.95rem;">Use this code to restore your progress on any device. No account needed!</p>
                    <div style="background:rgba(16,185,129,0.15);border:2px solid #10b981;padding:1.2rem;border-radius:12px;margin-bottom:1.5rem;font-family:monospace;font-size:1.4rem;font-weight:700;color:#10b981;letter-spacing:1px;">${this.backupCode}</div>
                    <div style="display:flex;gap:10px;margin-bottom:1rem;">
                        <button onclick="window.tapInAuth.copyCode()" style="flex:1;padding:0.9rem;background:#3b82f6;color:white;border:none;border-radius:10px;font-weight:600;cursor:pointer;font-size:0.9rem;">📋 Copy</button>
                        <button onclick="window.tapInAuth.downloadCode()" style="flex:1;padding:0.9rem;background:#10b981;color:white;border:none;border-radius:10px;font-weight:600;cursor:pointer;font-size:0.9rem;">💾 Download</button>
                    </div>
                    <button onclick="window.tapInAuth.closeModal()" style="width:100%;padding:0.9rem;background:rgba(255,255,255,0.1);color:white;border:1px solid rgba(255,255,255,0.2);border-radius:10px;font-weight:600;cursor:pointer;font-size:0.9rem;">I've Saved It ✓</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    copyCode() {
        navigator.clipboard.writeText(this.backupCode);
        alert('✅ Code copied!');
    }

    downloadCode() {
        const blob = new Blob([`TAP-IN Progress Code\n\n${this.backupCode}\n\nUse this code to restore your progress on any device.`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tap-in-progress-code.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    closeModal() {
        const modal = document.getElementById('backupCodeModal');
        if (modal) modal.remove();
    }

    // ============================================
    // GETTERS
    // ============================================
    getUserId() { return this.currentUser?.id || this.backupCode; }
    getBackupCode() { return this.backupCode; }
    isAuthenticated() { return !!this.currentUser || !!this.backupCode; }
}

// Initialize on load
window.tapInAuth = new TapInAuth();
document.addEventListener('DOMContentLoaded', () => {
    window.tapInAuth.init();
});
