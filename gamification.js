/**
 * TAP-IN Gamification System
 * Achievements, badges, streaks, and celebrations
 */

const ACHIEVEMENTS = {
    first_assessment: {
        id: 'first_assessment',
        name: '🎯 First Steps',
        description: 'Completed your first assessment',
        icon: '🎯',
        points: 10
    },
    three_assessments: {
        id: 'three_assessments',
        name: '📊 Getting Serious',
        description: 'Completed 3 assessments',
        icon: '📊',
        points: 25
    },
    ten_assessments: {
        id: 'ten_assessments',
        name: '🏆 Committed',
        description: 'Completed 10 assessments',
        icon: '🏆',
        points: 50
    },
    seven_day_streak: {
        id: 'seven_day_streak',
        name: '🔥 Week Warrior',
        description: '7-day assessment streak',
        icon: '🔥',
        points: 30
    },
    thirty_day_streak: {
        id: 'thirty_day_streak',
        name: '⚡ Monthly Master',
        description: '30-day assessment streak',
        icon: '⚡',
        points: 100
    },
    big_improvement: {
        id: 'big_improvement',
        name: '📈 Rising Star',
        description: 'Improved score by 20+ points',
        icon: '📈',
        points: 40
    },
    perfect_score: {
        id: 'perfect_score',
        name: '💎 Excellence',
        description: 'Scored 90+ on any assessment',
        icon: '💎',
        points: 50
    },
    team_creator: {
        id: 'team_creator',
        name: '👥 Team Builder',
        description: 'Created a team',
        icon: '👥',
        points: 20
    },
    team_complete: {
        id: 'team_complete',
        name: '✅ Team Complete',
        description: 'All team members completed assessments',
        icon: '✅',
        points: 75
    },
    recruiter_pro: {
        id: 'recruiter_pro',
        name: '🎯 Hiring Pro',
        description: 'Assessed 10+ candidates',
        icon: '🎯',
        points: 60
    },
    early_bird: {
        id: 'early_bird',
        name: '🌅 Early Bird',
        description: 'Completed assessment before 9 AM',
        icon: '🌅',
        points: 15
    },
    night_owl: {
        id: 'night_owl',
        name: '🦉 Night Owl',
        description: 'Completed assessment after 10 PM',
        icon: '🦉',
        points: 15
    }
};

/**
 * Get user's gamification data
 */
function getGamificationData() {
    const data = localStorage.getItem('gamification-data');
    return data ? JSON.parse(data) : {
        points: 0,
        level: 1,
        achievements: [],
        streak: 0,
        lastAssessmentDate: null,
        totalAssessments: 0
    };
}

/**
 * Save gamification data
 */
function saveGamificationData(data) {
    localStorage.setItem('gamification-data', JSON.stringify(data));
}

/**
 * Calculate level from points
 */
function calculateLevel(points) {
    // Level up every 100 points
    return Math.floor(points / 100) + 1;
}

/**
 * Calculate streak
 */
function updateStreak(gamData, assessments) {
    if (assessments.length === 0) return 0;

    const sortedDates = assessments
        .map(a => new Date(a.timestamp).toDateString())
        .filter((date, index, self) => self.indexOf(date) === index)
        .sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    const today = new Date().toDateString();
    let currentDate = new Date(today);

    for (let i = 0; i < sortedDates.length; i++) {
        const assessmentDate = new Date(sortedDates[i]);
        const diffDays = Math.floor((currentDate - assessmentDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 0 || diffDays === 1) {
            streak++;
            currentDate = assessmentDate;
        } else {
            break;
        }
    }

    return streak;
}

/**
 * Check and unlock achievements
 */
function checkAchievements(assessments, teams, candidates) {
    const gamData = getGamificationData();
    const newAchievements = [];

    // First assessment
    if (assessments.length >= 1 && !gamData.achievements.includes('first_assessment')) {
        newAchievements.push(ACHIEVEMENTS.first_assessment);
    }

    // Three assessments
    if (assessments.length >= 3 && !gamData.achievements.includes('three_assessments')) {
        newAchievements.push(ACHIEVEMENTS.three_assessments);
    }

    // Ten assessments
    if (assessments.length >= 10 && !gamData.achievements.includes('ten_assessments')) {
        newAchievements.push(ACHIEVEMENTS.ten_assessments);
    }

    // Streak achievements
    const streak = updateStreak(gamData, assessments);
    if (streak >= 7 && !gamData.achievements.includes('seven_day_streak')) {
        newAchievements.push(ACHIEVEMENTS.seven_day_streak);
    }
    if (streak >= 30 && !gamData.achievements.includes('thirty_day_streak')) {
        newAchievements.push(ACHIEVEMENTS.thirty_day_streak);
    }

    // Big improvement
    if (assessments.length >= 2) {
        const sorted = assessments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        for (let i = 1; i < sorted.length; i++) {
            const improvement = sorted[i].totalScore - sorted[i-1].totalScore;
            if (improvement >= 20 && !gamData.achievements.includes('big_improvement')) {
                newAchievements.push(ACHIEVEMENTS.big_improvement);
                break;
            }
        }
    }

    // Perfect score
    if (assessments.some(a => a.totalScore >= 90) && !gamData.achievements.includes('perfect_score')) {
        newAchievements.push(ACHIEVEMENTS.perfect_score);
    }

    // Team creator
    if (teams && Object.keys(teams).length > 0 && !gamData.achievements.includes('team_creator')) {
        newAchievements.push(ACHIEVEMENTS.team_creator);
    }

    // Team complete
    if (teams) {
        Object.values(teams).forEach(team => {
            const allComplete = team.members.every(m => 
                assessments.some(a => a.email === m.email)
            );
            if (allComplete && team.members.length > 1 && !gamData.achievements.includes('team_complete')) {
                newAchievements.push(ACHIEVEMENTS.team_complete);
            }
        });
    }

    // Recruiter pro
    if (candidates && candidates.length >= 10 && !gamData.achievements.includes('recruiter_pro')) {
        newAchievements.push(ACHIEVEMENTS.recruiter_pro);
    }

    // Time-based achievements
    if (assessments.length > 0) {
        const latest = assessments[assessments.length - 1];
        const hour = new Date(latest.timestamp).getHours();
        
        if (hour < 9 && !gamData.achievements.includes('early_bird')) {
            newAchievements.push(ACHIEVEMENTS.early_bird);
        }
        if (hour >= 22 && !gamData.achievements.includes('night_owl')) {
            newAchievements.push(ACHIEVEMENTS.night_owl);
        }
    }

    // Update gamification data
    if (newAchievements.length > 0) {
        newAchievements.forEach(achievement => {
            gamData.achievements.push(achievement.id);
            gamData.points += achievement.points;
        });
        gamData.level = calculateLevel(gamData.points);
        gamData.streak = streak;
        gamData.totalAssessments = assessments.length;
        saveGamificationData(gamData);

        return newAchievements;
    }

    return [];
}

/**
 * Show achievement popup
 */
function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #a93226 0%, #7a2419 100%);
        color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        z-index: 10000;
        text-align: center;
        animation: achievementPop 0.5s ease-out forwards;
        max-width: 400px;
    `;

    popup.innerHTML = `
        <div style="font-size: 5em; margin-bottom: 20px;">${achievement.icon}</div>
        <h2 style="font-size: 2em; margin-bottom: 10px;">Achievement Unlocked!</h2>
        <h3 style="font-size: 1.5em; margin-bottom: 10px;">${achievement.name}</h3>
        <p style="opacity: 0.9; margin-bottom: 20px;">${achievement.description}</p>
        <div style="font-size: 1.2em; font-weight: bold;">+${achievement.points} points</div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 12px 30px;
            background: white;
            color: #a93226;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            font-size: 16px;
        ">Awesome!</button>
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes achievementPop {
            0% { transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(popup);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        popup.style.animation = 'achievementPop 0.3s ease-in reverse';
        setTimeout(() => popup.remove(), 300);
    }, 5000);
}

/**
 * Get progress to next level
 */
function getNextLevelProgress() {
    const gamData = getGamificationData();
    const currentLevelPoints = (gamData.level - 1) * 100;
    const nextLevelPoints = gamData.level * 100;
    const progress = gamData.points - currentLevelPoints;
    const total = nextLevelPoints - currentLevelPoints;
    
    return {
        current: progress,
        total: total,
        percentage: Math.round((progress / total) * 100)
    };
}

/**
 * Update gamification after assessment
 */
function updateGamificationAfterAssessment() {
    const assessments = JSON.parse(localStorage.getItem('tap-in-assessments') || '[]');
    const teams = JSON.parse(localStorage.getItem('tap-in-teams') || '{}');
    const candidates = JSON.parse(localStorage.getItem('recruiter-candidates') || '[]');

    const newAchievements = checkAchievements(assessments, teams, candidates);
    
    // Show popups for new achievements
    newAchievements.forEach((achievement, index) => {
        setTimeout(() => showAchievementPopup(achievement), index * 500);
    });

    return newAchievements;
}

// Export for use in pages
window.Gamification = {
    getData: getGamificationData,
    saveData: saveGamificationData,
    checkAchievements,
    showAchievement: showAchievementPopup,
    updateAfterAssessment: updateGamificationAfterAssessment,
    getProgress: getNextLevelProgress,
    ACHIEVEMENTS
};
