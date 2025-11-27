/**
 * TAP-IN SMART NUDGES SYSTEM
 * 
 * Context-aware suggestions to guide users between Gym and Hub
 * Tracks effectiveness and learns from user behavior
 * 
 * Version: 1.0
 * Last Updated: November 27, 2025
 */

const SmartNudges = {
    
    // ============= NUDGE DEFINITIONS =============
    
    nudges: {
        // Gym → Hub nudges
        gymToHub: [
            {
                id: 'bonus_xp_communication',
                trigger: 'after_stripe_complete',
                condition: (stats) => stats.completedStripes >= 2 && stats.hubModulesComplete === 0,
                message: {
                    title: '💡 Want Bonus XP?',
                    text: 'Great progress in The Gym! Try Communication Module 1 in The Hub to earn +25 XP toward your next belt.',
                    cta: 'Explore The Hub',
                    link: 'hub-home-BUSINESS.html'
                }
            },
            {
                id: 'team_application',
                trigger: 'after_belt_complete',
                condition: (stats) => stats.currentBelt.name !== 'White Belt',
                message: {
                    title: '🏢 Ready to Apply Your Skills?',
                    text: `You've mastered ${stats.currentBelt.name}! Visit The Hub to apply these skills in team contexts and earn bonus XP.`,
                    cta: 'Visit The Hub',
                    link: 'hub-home-BUSINESS.html'
                }
            },
            {
                id: 'xp_boost',
                trigger: 'low_xp_progress',
                condition: (stats) => {
                    const progress = stats.progress.percentage;
                    return progress < 30 && stats.hubModulesComplete === 0;
                },
                message: {
                    title: '⚡ Need an XP Boost?',
                    text: 'Hub modules are a fast way to earn XP! Each Communication module awards +25 XP toward your belt.',
                    cta: 'Get Bonus XP',
                    link: 'hub-home-BUSINESS.html'
                }
            }
        ],
        
        // Hub → Gym nudges
        hubToGym: [
            {
                id: 'build_foundation',
                trigger: 'hub_entry_no_gym',
                condition: (stats) => stats.completedStripes === 0 && stats.hubModulesComplete > 0,
                message: {
                    title: '🥋 Build Your Foundation',
                    text: 'Great work in The Hub! Start The Gym to build your personal leadership foundation through belt progression.',
                    cta: 'Start The Gym',
                    link: 'gym-home-FOCUSED.html'
                }
            },
            {
                id: 'structured_path',
                trigger: 'multiple_hub_modules',
                condition: (stats) => stats.hubModulesComplete >= 3 && stats.completedStripes === 0,
                message: {
                    title: '🎯 Want a Structured Path?',
                    text: 'You're doing great in The Hub! The Gym offers a structured 20-stripe journey from White to Black Belt.',
                    cta: 'Explore The Gym',
                    link: 'gym-home-FOCUSED.html'
                }
            }
        ],
        
        // Assessment → Both nudges
        assessmentToBoth: [
            {
                id: 'low_trust_score',
                trigger: 'assessment_complete',
                condition: (stats, assessmentData) => assessmentData?.trustScore < 50,
                message: {
                    title: '🎯 Personalized Recommendation',
                    text: 'Your assessment shows opportunities in trust-building. Start White Belt in The Gym (personal) or Communication in The Hub (team).',
                    cta: 'View Recommendations',
                    link: 'gym-home-FOCUSED.html'
                }
            }
        ]
    },
    
    // ============= NUDGE DISPLAY =============
    
    /**
     * Show a nudge to the user
     */
    showNudge(nudge) {
        // Check if user has dismissed this nudge recently
        const dismissedNudges = JSON.parse(localStorage.getItem('dismissedNudges') || '{}');
        const lastDismissed = dismissedNudges[nudge.id];
        
        if (lastDismissed) {
            const daysSince = (Date.now() - lastDismissed) / (1000 * 60 * 60 * 24);
            if (daysSince < 3) {
                // Don't show again for 3 days
                return false;
            }
        }
        
        // Create nudge HTML
        const nudgeHTML = `
            <div class="smart-nudge" id="nudge-${nudge.id}" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                max-width: 400px;
                background: linear-gradient(135deg, rgba(139,92,246,0.95) 0%, rgba(168,85,247,0.95) 100%);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 16px;
                padding: 25px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.4);
                z-index: 9999;
                animation: slideInRight 0.4s ease;
            ">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div style="font-size: 18px; font-weight: 700; color: white;">
                        ${nudge.message.title}
                    </div>
                    <button onclick="SmartNudges.dismissNudge('${nudge.id}')" style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        opacity: 0.7;
                        transition: opacity 0.3s;
                    " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                        ×
                    </button>
                </div>
                <div style="color: rgba(255,255,255,0.95); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    ${nudge.message.text}
                </div>
                <div style="display: flex; gap: 10px;">
                    <a href="${nudge.message.link}" onclick="SmartNudges.trackNudgeClick('${nudge.id}')" style="
                        flex: 1;
                        background: white;
                        color: #8b5cf6;
                        padding: 12px 20px;
                        border-radius: 8px;
                        text-align: center;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 14px;
                        transition: all 0.3s;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        ${nudge.message.cta}
                    </a>
                    <button onclick="SmartNudges.dismissNudge('${nudge.id}')" style="
                        background: rgba(255,255,255,0.2);
                        border: 1px solid rgba(255,255,255,0.3);
                        color: white;
                        padding: 12px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 14px;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        Later
                    </button>
                </div>
            </div>
            
            <style>
                @keyframes slideInRight {
                    from {
                        transform: translateX(500px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(500px);
                        opacity: 0;
                    }
                }
            </style>
        `;
        
        // Add to page
        const nudgeDiv = document.createElement('div');
        nudgeDiv.innerHTML = nudgeHTML;
        document.body.appendChild(nudgeDiv);
        
        // Track impression
        this.trackNudgeImpression(nudge.id);
        
        return true;
    },
    
    /**
     * Dismiss a nudge
     */
    dismissNudge(nudgeId) {
        const nudgeElement = document.getElementById(`nudge-${nudgeId}`);
        if (nudgeElement) {
            nudgeElement.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => nudgeElement.remove(), 400);
        }
        
        // Track dismissal
        const dismissedNudges = JSON.parse(localStorage.getItem('dismissedNudges') || '{}');
        dismissedNudges[nudgeId] = Date.now();
        localStorage.setItem('dismissedNudges', JSON.stringify(dismissedNudges));
        
        this.trackNudgeDismissal(nudgeId);
    },
    
    // ============= NUDGE TRIGGERING =============
    
    /**
     * Check and show relevant nudges
     */
    checkNudges(trigger, additionalData = {}) {
        const stats = window.TapInXP ? window.TapInXP.getAllStats() : null;
        if (!stats) return;
        
        // Check all nudge categories
        const allNudges = [
            ...this.nudges.gymToHub,
            ...this.nudges.hubToGym,
            ...this.nudges.assessmentToBoth
        ];
        
        // Find matching nudges
        const matchingNudges = allNudges.filter(nudge => {
            return nudge.trigger === trigger && nudge.condition(stats, additionalData);
        });
        
        // Show first matching nudge (don't overwhelm user)
        if (matchingNudges.length > 0) {
            setTimeout(() => {
                this.showNudge(matchingNudges[0]);
            }, 2000); // Delay 2 seconds after trigger
        }
    },
    
    // ============= ANALYTICS =============
    
    /**
     * Track nudge impression
     */
    trackNudgeImpression(nudgeId) {
        const analytics = JSON.parse(localStorage.getItem('nudgeAnalytics') || '{}');
        
        if (!analytics[nudgeId]) {
            analytics[nudgeId] = { impressions: 0, clicks: 0, dismissals: 0 };
        }
        
        analytics[nudgeId].impressions++;
        localStorage.setItem('nudgeAnalytics', JSON.stringify(analytics));
    },
    
    /**
     * Track nudge click
     */
    trackNudgeClick(nudgeId) {
        const analytics = JSON.parse(localStorage.getItem('nudgeAnalytics') || '{}');
        
        if (!analytics[nudgeId]) {
            analytics[nudgeId] = { impressions: 0, clicks: 0, dismissals: 0 };
        }
        
        analytics[nudgeId].clicks++;
        localStorage.setItem('nudgeAnalytics', JSON.stringify(analytics));
    },
    
    /**
     * Track nudge dismissal
     */
    trackNudgeDismissal(nudgeId) {
        const analytics = JSON.parse(localStorage.getItem('nudgeAnalytics') || '{}');
        
        if (!analytics[nudgeId]) {
            analytics[nudgeId] = { impressions: 0, clicks: 0, dismissals: 0 };
        }
        
        analytics[nudgeId].dismissals++;
        localStorage.setItem('nudgeAnalytics', JSON.stringify(analytics));
    },
    
    /**
     * Get nudge effectiveness report
     */
    getEffectivenessReport() {
        const analytics = JSON.parse(localStorage.getItem('nudgeAnalytics') || '{}');
        
        const report = Object.keys(analytics).map(nudgeId => {
            const data = analytics[nudgeId];
            const clickRate = data.impressions > 0 ? (data.clicks / data.impressions * 100).toFixed(1) : 0;
            const dismissalRate = data.impressions > 0 ? (data.dismissals / data.impressions * 100).toFixed(1) : 0;
            
            return {
                nudgeId,
                impressions: data.impressions,
                clicks: data.clicks,
                dismissals: data.dismissals,
                clickRate: `${clickRate}%`,
                dismissalRate: `${dismissalRate}%`
            };
        });
        
        console.table(report);
        return report;
    }
};

// ============= GLOBAL HELPERS =============

/**
 * Trigger nudge after stripe completion
 */
window.afterStripeComplete = function() {
    SmartNudges.checkNudges('after_stripe_complete');
};

/**
 * Trigger nudge after belt completion
 */
window.afterBeltComplete = function() {
    SmartNudges.checkNudges('after_belt_complete');
};

/**
 * Trigger nudge on Hub entry
 */
window.onHubEntry = function() {
    SmartNudges.checkNudges('hub_entry_no_gym');
};

/**
 * Trigger nudge after assessment
 */
window.afterAssessment = function(assessmentData) {
    SmartNudges.checkNudges('assessment_complete', assessmentData);
};

// Make globally available
window.SmartNudges = SmartNudges;

console.log('✅ Smart Nudges System loaded');

