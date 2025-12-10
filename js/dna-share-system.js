// ============================================
// TAP-IN LEADERSHIP DNA SHARE SYSTEM
// Share results & join teams via shareable links
// ============================================

class DNAShareSystem {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    // ============================================
    // GENERATE SHAREABLE DNA CARD DATA
    // ============================================
    getDNAData() {
        const profile = JSON.parse(localStorage.getItem('tap_in_profile') || '{}');
        const dna = JSON.parse(localStorage.getItem('leadershipDNA') || '{}');
        const backupCode = localStorage.getItem('tap_in_backup_code') || '';
        
        return {
            name: profile.name || 'Anonymous Leader',
            archetype: dna.archetype || profile.archetype || 'Explorer',
            workerType: dna.workerType || profile.workerType || 'Jogger',
            primaryStrength: dna.primaryStrength || 'Adaptability',
            communicationStyle: dna.communicationStyle || 'Collaborative',
            decisionStyle: dna.decisionStyle || 'Balanced',
            energyPattern: dna.energyPattern || 'Steady',
            values: dna.topValues || profile.values || ['Growth', 'Impact', 'Balance'],
            belt: profile.belt || 'white',
            xp: parseInt(localStorage.getItem('tapinTotalXP') || '0'),
            shareCode: backupCode,
            timestamp: Date.now()
        };
    }

    // ============================================
    // CREATE SHAREABLE LINK
    // ============================================
    createShareLink(includeTeamJoin = false, teamCode = null) {
        const dna = this.getDNAData();
        
        // Encode DNA data (compact format)
        const shareData = {
            n: dna.name.substring(0, 20),
            a: dna.archetype.substring(0, 3),
            w: dna.workerType.substring(0, 1),
            s: dna.primaryStrength.substring(0, 10),
            c: dna.shareCode,
            t: teamCode || ''
        };
        
        const encoded = btoa(JSON.stringify(shareData));
        const shareUrl = `${this.baseUrl}/dna-view.html?d=${encoded}`;
        
        return shareUrl;
    }

    // ============================================
    // GENERATE SHARE CARD IMAGE (Canvas-based)
    // ============================================
    async generateShareImage() {
        const dna = this.getDNAData();
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 600, 400);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 400);

        // Border
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 10, 580, 380);

        // Header
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillText('TAP-IN LEADERSHIP DNA', 30, 45);

        // Name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillText(dna.name, 30, 90);

        // Archetype badge
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.fillRect(30, 110, 200, 35);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText(`${dna.archetype} • ${dna.workerType}`, 45, 135);

        // Stats
        ctx.fillStyle = '#a0aec0';
        ctx.font = '14px Inter, sans-serif';
        const stats = [
            `Primary Strength: ${dna.primaryStrength}`,
            `Communication: ${dna.communicationStyle}`,
            `Decision Style: ${dna.decisionStyle}`,
            `Energy Pattern: ${dna.energyPattern}`
        ];
        stats.forEach((stat, i) => {
            ctx.fillText(stat, 30, 180 + (i * 28));
        });

        // Values
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillText('Core Values:', 30, 310);
        ctx.fillStyle = '#10b981';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText(dna.values.slice(0, 3).join(' • '), 30, 335);

        // Belt & XP
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText(`${dna.belt.toUpperCase()} BELT`, 450, 340);
        ctx.fillStyle = '#f6e05e';
        ctx.fillText(`${dna.xp.toLocaleString()} XP`, 450, 365);

        // Share code
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '12px monospace';
        ctx.fillText(`ID: ${dna.shareCode}`, 450, 45);

        return canvas.toDataURL('image/png');
    }

    // ============================================
    // SHARE FUNCTIONS
    // ============================================
    async shareToLinkedIn() {
        const url = this.createShareLink();
        const text = encodeURIComponent("Check out my Leadership DNA profile on TAP-IN! 🥋");
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }

    async shareToTwitter() {
        const dna = this.getDNAData();
        const text = encodeURIComponent(`I'm a ${dna.archetype} ${dna.workerType} on TAP-IN! 🥋 What's your Leadership DNA?`);
        const url = encodeURIComponent(this.createShareLink());
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    async shareViaEmail(recipientEmail = '') {
        const dna = this.getDNAData();
        const subject = encodeURIComponent(`${dna.name}'s Leadership DNA - TAP-IN`);
        const body = encodeURIComponent(`Hey!\n\nI wanted to share my Leadership DNA profile with you:\n\nArchetype: ${dna.archetype}\nWorker Type: ${dna.workerType}\nPrimary Strength: ${dna.primaryStrength}\n\nView my full profile: ${this.createShareLink()}\n\nTry TAP-IN yourself: ${this.baseUrl}`);
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    }

    copyShareLink(includeTeamCode = false, teamCode = null) {
        const url = this.createShareLink(includeTeamCode, teamCode);
        navigator.clipboard.writeText(url);
        return url;
    }

    async downloadDNACard() {
        const imageData = await this.generateShareImage();
        const a = document.createElement('a');
        a.href = imageData;
        a.download = 'my-leadership-dna.png';
        a.click();
    }

    // ============================================
    // TEAM JOIN VIA SHARE LINK
    // ============================================
    createTeamInviteLink(teamCode) {
        const dna = this.getDNAData();
        const inviteData = {
            t: teamCode,
            from: dna.name.substring(0, 15),
            a: dna.archetype.substring(0, 3)
        };
        const encoded = btoa(JSON.stringify(inviteData));
        return `${this.baseUrl}/join-team.html?invite=${encoded}`;
    }

    parseInviteLink() {
        const params = new URLSearchParams(window.location.search);
        const inviteData = params.get('invite');
        const dnaData = params.get('d');
        
        if (inviteData) {
            try {
                return JSON.parse(atob(inviteData));
            } catch (e) {
                return null;
            }
        }
        
        if (dnaData) {
            try {
                return JSON.parse(atob(dnaData));
            } catch (e) {
                return null;
            }
        }
        
        return null;
    }

    // ============================================
    // SHOW SHARE MODAL
    // ============================================
    showShareModal(teamCode = null) {
        if (document.getElementById('dnaShareModal')) return;
        
        const dna = this.getDNAData();
        const shareUrl = this.createShareLink(!!teamCode, teamCode);
        
        const modal = document.createElement('div');
        modal.id = 'dnaShareModal';
        modal.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px;">
                <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:2rem;border-radius:20px;max-width:500px;width:100%;border:1px solid rgba(16,185,129,0.3);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                        <h2 style="color:#fff;font-size:1.3rem;margin:0;">Share Your Leadership DNA</h2>
                        <button onclick="window.dnaShare.closeShareModal()" style="background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;">&times;</button>
                    </div>
                    
                    <!-- DNA Preview -->
                    <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:1.2rem;margin-bottom:1.5rem;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <div style="color:#10b981;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;">Your DNA</div>
                                <div style="color:#fff;font-size:1.2rem;font-weight:700;">${dna.name}</div>
                                <div style="color:#a0aec0;font-size:0.9rem;">${dna.archetype} • ${dna.workerType}</div>
                            </div>
                            <div style="text-align:right;">
                                <div style="color:#f6e05e;font-weight:700;">${dna.xp.toLocaleString()} XP</div>
                                <div style="color:#a0aec0;font-size:0.85rem;">${dna.belt.toUpperCase()} Belt</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Share Link -->
                    <div style="margin-bottom:1.5rem;">
                        <label style="color:#a0aec0;font-size:0.85rem;display:block;margin-bottom:0.5rem;">Share Link</label>
                        <div style="display:flex;gap:8px;">
                            <input type="text" value="${shareUrl}" readonly style="flex:1;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:0.7rem;color:#fff;font-size:0.85rem;">
                            <button onclick="window.dnaShare.copyShareLink();this.textContent='✓'" style="padding:0.7rem 1rem;background:#10b981;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Copy</button>
                        </div>
                    </div>
                    
                    ${teamCode ? `
                    <!-- Team Invite Section -->
                    <div style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:1rem;margin-bottom:1.5rem;">
                        <div style="color:#3b82f6;font-size:0.85rem;margin-bottom:0.5rem;">🎯 Team Invite Included</div>
                        <div style="color:#fff;font-size:0.9rem;">Recipients can join team <strong>${teamCode}</strong> when viewing your DNA</div>
                    </div>
                    ` : ''}
                    
                    <!-- Share Buttons -->
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:1rem;">
                        <button onclick="window.dnaShare.shareToLinkedIn()" style="padding:0.8rem;background:#0077b5;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            LinkedIn
                        </button>
                        <button onclick="window.dnaShare.shareToTwitter()" style="padding:0.8rem;background:#1da1f2;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            Twitter
                        </button>
                        <button onclick="window.dnaShare.shareViaEmail()" style="padding:0.8rem;background:#ea4335;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            Email
                        </button>
                        <button onclick="window.dnaShare.downloadDNACard()" style="padding:0.8rem;background:#6b5b95;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    closeShareModal() {
        const modal = document.getElementById('dnaShareModal');
        if (modal) modal.remove();
    }
}

// Initialize
window.dnaShare = new DNAShareSystem();
