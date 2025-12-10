/**
 * TAP-IN Progress Sync System
 * Anonymous code-based progress persistence
 * No personal data = No GDPR concerns
 */

const TapInSync = {
    // Configuration
    STORAGE_KEY: 'tap_in_user_code',
    PROGRESS_KEY: 'tap_in_progress',
    PROFILE_KEY: 'tap_in_profile',
    TEAM_KEY: 'tap_in_team_code',
    
    // Word lists for memorable codes
    adjectives: ['Blue', 'Red', 'Green', 'Gold', 'Silver', 'Swift', 'Brave', 'Calm', 'Bold', 'Wise', 'Keen', 'True', 'Pure', 'Wild', 'Free'],
    animals: ['Tiger', 'Eagle', 'Wolf', 'Bear', 'Lion', 'Hawk', 'Fox', 'Deer', 'Owl', 'Lynx', 'Puma', 'Raven', 'Falcon', 'Cobra', 'Phoenix'],
    
    /**
     * Generate a memorable user code like "BLUE-TIGER-4821"
     */
    generateCode() {
        const adj = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
        const animal = this.animals[Math.floor(Math.random() * this.animals.length)];
        const num = Math.floor(1000 + Math.random() * 9000);
        return `${adj.toUpperCase()}-${animal.toUpperCase()}-${num}`;
    },
    
    /**
     * Get or create user code
     */
    getUserCode() {
        let code = localStorage.getItem(this.STORAGE_KEY);
        if (!code) {
            code = this.generateCode();
            localStorage.setItem(this.STORAGE_KEY, code);
        }
        return code;
    },
    
    /**
     * Set user code (for restoring from another device)
     */
    setUserCode(code) {
        localStorage.setItem(this.STORAGE_KEY, code.toUpperCase());
        return code;
    },
    
    /**
     * Get all progress data for syncing
     */
    getProgressData() {
        const data = {
            code: this.getUserCode(),
            timestamp: Date.now(),
            progress: {},
            profile: {},
            achievements: [],
            xp: 0
        };
        
        // Collect all TAP-IN related localStorage items
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('tap_in') || key.startsWith('tapin') || 
                key.includes('Belt') || key.includes('Stripe') || key.includes('XP'))) {
                try {
                    const value = localStorage.getItem(key);
                    data.progress[key] = JSON.parse(value);
                } catch {
                    data.progress[key] = localStorage.getItem(key);
                }
            }
        }
        
        return data;
    },
    
    /**
     * Restore progress from data object
     */
    restoreProgress(data) {
        if (!data || !data.progress) return false;
        
        try {
            // Clear existing progress first
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.startsWith('tap_in') || key.startsWith('tapin') || 
                    key.includes('Belt') || key.includes('Stripe') || key.includes('XP'))) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
            
            // Restore all progress
            Object.entries(data.progress).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    localStorage.setItem(key, JSON.stringify(value));
                } else {
                    localStorage.setItem(key, value);
                }
            });
            
            // Set the code
            if (data.code) {
                localStorage.setItem(this.STORAGE_KEY, data.code);
            }
            
            return true;
        } catch (error) {
            console.error('Failed to restore progress:', error);
            return false;
        }
    },
    
    /**
     * Create shareable DNA card data
     */
    createShareableProfile() {
        const profile = JSON.parse(localStorage.getItem(this.PROFILE_KEY) || '{}');
        const progress = JSON.parse(localStorage.getItem(this.PROGRESS_KEY) || '{}');
        
        return {
            code: this.getUserCode(),
            leadershipType: profile.leadershipType || progress.leadershipType || 'Explorer',
            strengths: profile.strengths || progress.strengths || [],
            workerType: profile.workerType || progress.workerType || null,
            belt: profile.belt || progress.belt || 'white',
            values: profile.topValues || progress.topValues || [],
            timestamp: Date.now()
        };
    },
    
    /**
     * Encode profile for URL sharing
     */
    encodeProfileForShare(teamCode = null) {
        const profile = this.createShareableProfile();
        if (teamCode) {
            profile.teamCode = teamCode;
        }
        const encoded = btoa(JSON.stringify(profile));
        return encoded;
    },
    
    /**
     * Decode shared profile from URL
     */
    decodeSharedProfile(encoded) {
        try {
            return JSON.parse(atob(encoded));
        } catch {
            return null;
        }
    },
    
    /**
     * Generate share URL
     */
    getShareURL(teamCode = null) {
        const encoded = this.encodeProfileForShare(teamCode);
        const baseURL = window.location.origin;
        if (teamCode) {
            return `${baseURL}/join-team.html?profile=${encoded}`;
        }
        return `${baseURL}/view-profile.html?profile=${encoded}`;
    },
    
    /**
     * Join a team with shared profile
     */
    joinTeam(teamCode, memberProfile = null) {
        localStorage.setItem(this.TEAM_KEY, teamCode);
        
        // Store member profile in team roster (localStorage simulation)
        const rosterKey = `team_${teamCode}_roster`;
        const roster = JSON.parse(localStorage.getItem(rosterKey) || '[]');
        
        const myProfile = memberProfile || this.createShareableProfile();
        myProfile.joinedAt = Date.now();
        
        // Check if already in roster
        const existingIndex = roster.findIndex(m => m.code === myProfile.code);
        if (existingIndex >= 0) {
            roster[existingIndex] = myProfile;
        } else {
            roster.push(myProfile);
        }
        
        localStorage.setItem(rosterKey, JSON.stringify(roster));
        return true;
    },
    
    /**
     * Get team roster
     */
    getTeamRoster(teamCode) {
        const rosterKey = `team_${teamCode}_roster`;
        return JSON.parse(localStorage.getItem(rosterKey) || '[]');
    },
    
    /**
     * Copy text to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },
    
    /**
     * Show toast notification
     */
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'tap-in-toast';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6b5b95'};
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: toastIn 0.3s ease;
        `;
        
        // Add animation keyframes if not exists
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
                @keyframes toastOut { from { opacity: 1; } to { opacity: 0; } }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
};

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure user has a code
    TapInSync.getUserCode();
});

// Make available globally
window.TapInSync = TapInSync;
