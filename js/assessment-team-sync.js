/**
 * Assessment Team Sync
 * Bridges individual assessment results to team member profiles
 * Enables team dashboard to show aggregated assessment data
 */

const AssessmentTeamSync = {
    
    // Assessment key mapping
    ASSESSMENT_KEYS: {
        workerType: 'tapin-worker-type',
        leadershipStyle: 'tapin-leadership-style',
        commStyle: 'tapin-communication-style',
        decisionStyle: 'tapin-decision-style',
        mentalHealth: 'tapin-mental-health',
        workLifeBalance: 'tapin-work-life-balance',
        values: 'tapin-values',
        teamAssessment: 'tapin-team-assessment',
        feedback360: 'tapin-360-feedback',
        lifeAudit: 'tapin-life-audit'
    },
    
    /**
     * Get current user's assessment results
     */
    getUserAssessmentResults() {
        const results = {};
        
        // Worker Type
        const workerData = this.getStoredData('tapin-worker-type');
        if (workerData && workerData.type) {
            results.workerType = workerData.type; // sprinter, jogger, ultrarunner
        }
        
        // Leadership Style
        const leaderData = this.getStoredData('tapin-leadership-style');
        if (leaderData && leaderData.primary) {
            results.leadershipStyle = this.capitalizeFirst(leaderData.primary); // directive, coaching, supportive, delegating
        }
        
        // Communication Style
        const commData = this.getStoredData('tapin-communication-style');
        if (commData && commData.primary) {
            results.commStyle = this.capitalizeFirst(commData.primary); // direct, analytical, expressive, amiable
        }
        
        // Decision Making Style
        const decisionData = this.getStoredData('tapin-decision-style');
        if (decisionData && decisionData.primary) {
            results.decisionStyle = this.capitalizeFirst(decisionData.primary);
        }
        
        // Values
        const valuesData = this.getStoredData('tapin-values');
        if (valuesData && valuesData.top3) {
            results.topValues = valuesData.top3;
        }
        
        // Mental Health Score
        const mentalData = this.getStoredData('tapin-mental-health');
        if (mentalData && mentalData.overall) {
            results.mentalHealthScore = mentalData.overall;
        }
        
        // Work-Life Balance
        const wlbData = this.getStoredData('tapin-work-life-balance');
        if (wlbData && wlbData.overall) {
            results.workLifeScore = wlbData.overall;
        }
        
        // 360 Feedback
        const feedbackData = this.getStoredData('tapin-360-feedback');
        if (feedbackData && feedbackData.overall) {
            results.feedback360Score = feedbackData.overall;
        }
        
        // Life Audit
        const lifeData = this.getStoredData('tapin-life-audit');
        if (lifeData && lifeData.overall) {
            results.lifeAuditScore = lifeData.overall;
        }
        
        // Calculate completion percentage
        results.assessmentCompletion = this.calculateAssessmentCompletion();
        
        return results;
    },
    
    /**
     * Get stored JSON data safely
     */
    getStoredData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Failed to parse', key, e);
            return null;
        }
    },
    
    /**
     * Calculate assessment completion percentage
     */
    calculateAssessmentCompletion() {
        const assessments = [
            'tapin-worker-type',
            'tapin-leadership-style', 
            'tapin-communication-style',
            'tapin-decision-style',
            'tapin-values',
            'tapin-mental-health',
            'tapin-work-life-balance',
            'tapin-360-feedback',
            'tapin-life-audit'
        ];
        
        let completed = 0;
        assessments.forEach(key => {
            if (localStorage.getItem(key)) completed++;
        });
        
        return Math.round((completed / assessments.length) * 100);
    },
    
    /**
     * Update current user's team member record with assessment data
     */
    syncToTeamMember() {
        const teamCode = localStorage.getItem('teamCode');
        if (!teamCode) return null;
        
        const members = JSON.parse(localStorage.getItem('teamMembers') || '[]');
        const userCode = localStorage.getItem('tap_in_user_code');
        const userName = localStorage.getItem('tapin-user-name') || localStorage.getItem('userName');
        
        // Find current user in team
        let memberIndex = members.findIndex(m => 
            m.userCode === userCode || 
            (userName && m.name.toLowerCase() === userName.toLowerCase())
        );
        
        // Get assessment results
        const assessmentResults = this.getUserAssessmentResults();
        
        if (memberIndex >= 0) {
            // Update existing member
            members[memberIndex] = {
                ...members[memberIndex],
                ...assessmentResults,
                lastActive: new Date().toISOString()
            };
        } else if (userName) {
            // Create new member entry
            members.push({
                id: Date.now(),
                name: userName,
                userCode: userCode,
                ...assessmentResults,
                belt: localStorage.getItem('currentBelt') || 'white',
                stripe: parseInt(localStorage.getItem('currentStripe')) || 1,
                xp: parseInt(localStorage.getItem('totalXP')) || 0,
                joinedDate: new Date().toISOString(),
                lastActive: new Date().toISOString()
            });
        }
        
        localStorage.setItem('teamMembers', JSON.stringify(members));
        return assessmentResults;
    },
    
    /**
     * Get team assessment summary for dashboard
     */
    getTeamAssessmentSummary() {
        const members = JSON.parse(localStorage.getItem('teamMembers') || '[]');
        
        const summary = {
            totalMembers: members.length,
            assessmentCompletion: {
                workerType: 0,
                leadershipStyle: 0,
                commStyle: 0,
                values: 0
            },
            distributions: {
                workerType: { sprinter: 0, jogger: 0, ultrarunner: 0 },
                leadershipStyle: { directive: 0, coaching: 0, supportive: 0, delegating: 0 },
                commStyle: { direct: 0, analytical: 0, expressive: 0, amiable: 0 }
            },
            averageScores: {
                mentalHealth: 0,
                workLife: 0,
                feedback360: 0,
                lifeAudit: 0
            }
        };
        
        if (members.length === 0) return summary;
        
        let mhCount = 0, wlCount = 0, fbCount = 0, laCount = 0;
        
        members.forEach(m => {
            // Count completions
            if (m.workerType) {
                summary.assessmentCompletion.workerType++;
                const type = m.workerType.toLowerCase();
                if (summary.distributions.workerType[type] !== undefined) {
                    summary.distributions.workerType[type]++;
                }
            }
            
            if (m.leadershipStyle) {
                summary.assessmentCompletion.leadershipStyle++;
                const style = m.leadershipStyle.toLowerCase();
                if (summary.distributions.leadershipStyle[style] !== undefined) {
                    summary.distributions.leadershipStyle[style]++;
                }
            }
            
            if (m.commStyle) {
                summary.assessmentCompletion.commStyle++;
                const style = m.commStyle.toLowerCase();
                if (summary.distributions.commStyle[style] !== undefined) {
                    summary.distributions.commStyle[style]++;
                }
            }
            
            if (m.topValues) summary.assessmentCompletion.values++;
            
            // Sum scores
            if (m.mentalHealthScore) { summary.averageScores.mentalHealth += m.mentalHealthScore; mhCount++; }
            if (m.workLifeScore) { summary.averageScores.workLife += m.workLifeScore; wlCount++; }
            if (m.feedback360Score) { summary.averageScores.feedback360 += m.feedback360Score; fbCount++; }
            if (m.lifeAuditScore) { summary.averageScores.lifeAudit += m.lifeAuditScore; laCount++; }
        });
        
        // Calculate averages
        if (mhCount > 0) summary.averageScores.mentalHealth = Math.round(summary.averageScores.mentalHealth / mhCount);
        if (wlCount > 0) summary.averageScores.workLife = Math.round(summary.averageScores.workLife / wlCount);
        if (fbCount > 0) summary.averageScores.feedback360 = Math.round(summary.averageScores.feedback360 / fbCount);
        if (laCount > 0) summary.averageScores.lifeAudit = Math.round(summary.averageScores.lifeAudit / laCount);
        
        return summary;
    },
    
    /**
     * Helper to capitalize first letter
     */
    capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    
    /**
     * Auto-sync on assessment completion
     * Call this at the end of each assessment
     */
    onAssessmentComplete(assessmentType, data) {
        // Save the individual assessment
        const key = this.ASSESSMENT_KEYS[assessmentType];
        if (key) {
            localStorage.setItem(key, JSON.stringify({
                ...data,
                completedAt: new Date().toISOString()
            }));
        }
        
        // Sync to team if user is in a team
        if (localStorage.getItem('teamCode')) {
            this.syncToTeamMember();
        }
        
        // Dispatch event for dashboard updates
        window.dispatchEvent(new CustomEvent('assessment-complete', {
            detail: { type: assessmentType, data }
        }));
    }
};

// Auto-init
if (typeof window !== 'undefined') {
    window.AssessmentTeamSync = AssessmentTeamSync;
}
