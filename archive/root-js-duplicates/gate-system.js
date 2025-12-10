/**
 * TAP-IN Gate System v1.0
 * Prevents speed-running, enforces learning pace
 */

const TapInGates = {
    
    // Gate requirements per belt
    config: {
        white:  { minTimePerStripe: 10, requireGym: false, waitHours: 0, maxPerDay: 4 },
        blue:   { minTimePerStripe: 15, requireGym: false, waitHours: 2, maxPerDay: 3 },
        purple: { minTimePerStripe: 20, requireGym: true,  waitHours: 4, maxPerDay: 2 },
        brown:  { minTimePerStripe: 25, requireGym: true,  waitHours: 6, maxPerDay: 2 },
        black:  { minTimePerStripe: 30, requireGym: true,  waitHours: 8, maxPerDay: 1 }
    },
    
    // Check if user can start a stripe
    canStartStripe: function(belt, stripeNum) {
        const config = this.config[belt];
        if (!config) return { allowed: true };
        
        // Check if previous stripe is complete
        if (stripeNum > 1) {
            const prevKey = `tap_in_${belt}_stripe${stripeNum - 1}_complete`;
            if (belt === 'white') {
                // White belt uses different key format
                const prevKeyWhite = `tap_in_stripe${stripeNum - 1}_complete`;
                if (localStorage.getItem(prevKeyWhite) !== 'true') {
                    return { allowed: false, reason: 'previous_incomplete', message: 'Complete the previous stripe first.' };
                }
            } else {
                if (localStorage.getItem(prevKey) !== 'true') {
                    return { allowed: false, reason: 'previous_incomplete', message: 'Complete the previous stripe first.' };
                }
            }
        }
        
        // Check time gate (hours since last stripe)
        if (config.waitHours > 0 && stripeNum > 1) {
            const lastCompleteTime = localStorage.getItem(`tap_in_${belt}_stripe${stripeNum - 1}_time`);
            if (lastCompleteTime) {
                const hoursSince = (Date.now() - parseInt(lastCompleteTime)) / (1000 * 60 * 60);
                if (hoursSince < config.waitHours) {
                    const remaining = Math.ceil(config.waitHours - hoursSince);
                    return { 
                        allowed: false, 
                        reason: 'time_gate', 
                        message: `Integration time: ${remaining} hour${remaining > 1 ? 's' : ''} remaining`,
                        hoursRemaining: remaining,
                        canBypass: true // Can bypass with Gym exercise
                    };
                }
            }
        }
        
        // Check gym requirement for bypass
        if (config.requireGym && stripeNum > 1) {
            const gymBypass = localStorage.getItem(`tap_in_${belt}_stripe${stripeNum}_gym_bypass`);
            // If time gate active but gym done, allow
            if (gymBypass === 'true') {
                return { allowed: true, bypassedWith: 'gym' };
            }
        }
        
        // Check daily limit
        const today = new Date().toDateString();
        const dailyKey = `tap_in_${belt}_stripes_${today}`;
        const stripesToday = parseInt(localStorage.getItem(dailyKey) || '0');
        if (stripesToday >= config.maxPerDay) {
            return { 
                allowed: false, 
                reason: 'daily_limit', 
                message: `Daily limit reached. ${config.maxPerDay} ${belt} belt stripe${config.maxPerDay > 1 ? 's' : ''} per day. Rest and return tomorrow.`
            };
        }
        
        return { allowed: true };
    },
    
    // Record stripe completion
    recordCompletion: function(belt, stripeNum, timeSpentMinutes) {
        // Save completion time
        localStorage.setItem(`tap_in_${belt}_stripe${stripeNum}_time`, Date.now().toString());
        localStorage.setItem(`tap_in_${belt}_stripe${stripeNum}_duration`, timeSpentMinutes.toString());
        
        // Increment daily count
        const today = new Date().toDateString();
        const dailyKey = `tap_in_${belt}_stripes_${today}`;
        const stripesToday = parseInt(localStorage.getItem(dailyKey) || '0');
        localStorage.setItem(dailyKey, (stripesToday + 1).toString());
        
        // Check if speed-running
        const config = this.config[belt];
        if (timeSpentMinutes < config.minTimePerStripe * 0.5) {
            return { 
                warning: true, 
                message: 'You completed this quickly! Consider revisiting to deepen your understanding.' 
            };
        }
        
        return { success: true };
    },
    
    // Bypass time gate with gym exercise
    bypassWithGym: function(belt, stripeNum) {
        localStorage.setItem(`tap_in_${belt}_stripe${stripeNum}_gym_bypass`, 'true');
    },
    
    // Get gate status display
    getGateStatus: function(belt, stripeNum) {
        const result = this.canStartStripe(belt, stripeNum);
        if (result.allowed) {
            return { locked: false };
        }
        
        return {
            locked: true,
            reason: result.reason,
            message: result.message,
            canBypass: result.canBypass || false,
            hoursRemaining: result.hoursRemaining || 0
        };
    },
    
    // Format time remaining
    formatTimeRemaining: function(hours) {
        if (hours < 1) {
            return Math.ceil(hours * 60) + ' minutes';
        }
        return Math.ceil(hours) + ' hour' + (Math.ceil(hours) > 1 ? 's' : '');
    }
};

// Make available globally
window.TapInGates = TapInGates;
