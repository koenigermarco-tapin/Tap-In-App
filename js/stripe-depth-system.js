/**
 * TAP-IN Stripe Depth System
 * Adds time gates, mandatory games, and enhanced completion
 * Version 1.0 - December 2025
 */

const StripeDepthSystem = {
    
    // Configuration by belt level
    config: {
        white: {
            minSectionTime: 60,      // 60 seconds minimum per section
            cooldownHours: 2,        // 2 hours between stripes
            requiredGames: [],       // White belt has assessments, not games
            minReflectionChars: 50
        },
        blue: {
            minSectionTime: 90,      // 90 seconds
            cooldownHours: 4,
            requiredGames: {
                1: 'confession-poker',
                2: 'game-reaction-trainer',
                3: 'game-sbir-trainer',
                4: 'conflict-cards'
            },
            minGameScore: 60,
            minReflectionChars: 100
        },
        purple: {
            minSectionTime: 120,     // 2 minutes
            cooldownHours: 6,
            requiredGames: {
                1: 'take-the-back',
                2: 'disagree-commit-roulette',
                3: 'game-daily-dilemma',
                4: 'tool-goal-tracker'
            },
            minGameScore: 65,
            minReflectionChars: 150
        },
        brown: {
            minSectionTime: 150,     // 2.5 minutes
            cooldownHours: 12,
            requiredGames: {
                1: 'game-daily-dilemma',
                2: 'game-sbir-trainer',
                3: 'tool-decision-framework',
                4: 'game-coaching-quest'
            },
            minGameScore: 70,
            minReflectionChars: 200
        },
        black: {
            minSectionTime: 180,     // 3 minutes
            cooldownHours: 24,
            requiredGames: {
                1: 'game-reaction-trainer',
                2: 'confession-poker',
                3: 'stoic-tools-module-gamified',
                4: 'tool-journal'
            },
            minGameScore: 80,
            minReflectionChars: 250
        }
    },
    
    // Current state
    state: {
        currentBelt: null,
        currentStripe: null,
        sectionStartTime: null,
        sectionTimes: [],
        totalTimeSpent: 0
    },
    
    /**
     * Initialize the depth system for a stripe
     */
    init(belt, stripe) {
        this.state.currentBelt = belt;
        this.state.currentStripe = stripe;
        this.state.sectionStartTime = Date.now();
        this.state.sectionTimes = [];
        
        // Load any saved progress
        const savedTime = localStorage.getItem(`${belt}Stripe${stripe}TimeSpent`);
        this.state.totalTimeSpent = savedTime ? parseInt(savedTime) : 0;
        
        // Start time tracking
        this.startTimeTracking();
        
        // Check if game is required and completed
        this.checkGameRequirement();
        
        // Initialize time gates on buttons
        this.initTimeGates();
        
        console.log(`[StripeDepth] Initialized for ${belt} belt, stripe ${stripe}`);
    },
    
    /**
     * Start tracking time spent on page
     */
    startTimeTracking() {
        // Track time every 30 seconds
        setInterval(() => {
            this.state.totalTimeSpent += 30;
            localStorage.setItem(
                `${this.state.currentBelt}Stripe${this.state.currentStripe}TimeSpent`,
                this.state.totalTimeSpent
            );
        }, 30000);
        
        // Track page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause tracking
                this.state.sectionStartTime = null;
            } else {
                // Resume tracking
                this.state.sectionStartTime = Date.now();
            }
        });
    },
    
    /**
     * Initialize time gates on continue/next buttons
     */
    initTimeGates() {
        const config = this.config[this.state.currentBelt];
        if (!config) return;
        
        const minTime = config.minSectionTime;
        
        // Find all section navigation buttons
        const nextButtons = document.querySelectorAll('[onclick*="nextSection"], .btn-next, .continue-btn');
        
        nextButtons.forEach(btn => {
            // Store original onclick
            const originalOnClick = btn.onclick;
            
            // Disable initially
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            
            // Add countdown text
            const originalText = btn.textContent;
            let countdown = minTime;
            
            btn.innerHTML = `<span class="countdown-text">${originalText} (${countdown}s)</span>`;
            
            // Countdown timer
            const timer = setInterval(() => {
                countdown--;
                const countdownSpan = btn.querySelector('.countdown-text');
                if (countdownSpan) {
                    if (countdown > 0) {
                        countdownSpan.textContent = `${originalText} (${countdown}s)`;
                    } else {
                        countdownSpan.textContent = originalText;
                        btn.disabled = false;
                        btn.style.opacity = '1';
                        btn.style.cursor = 'pointer';
                        clearInterval(timer);
                    }
                }
            }, 1000);
        });
    },
    
    /**
     * Check if required game is completed
     */
    checkGameRequirement() {
        const config = this.config[this.state.currentBelt];
        if (!config || !config.requiredGames) return;
        
        const requiredGame = config.requiredGames[this.state.currentStripe];
        if (!requiredGame) return;
        
        // Check localStorage for game completion
        const gameComplete = localStorage.getItem(`${requiredGame}Complete`);
        const gameScore = parseInt(localStorage.getItem(`${requiredGame}Score`) || '0');
        
        if (!gameComplete || gameScore < (config.minGameScore || 60)) {
            this.showGameRequirement(requiredGame, config.minGameScore || 60);
        }
    },
    
    /**
     * Show game requirement modal
     */
    showGameRequirement(gameName, minScore) {
        // Don't block if already in game
        if (window.location.href.includes(gameName)) return;
        
        const gameNames = {
            'confession-poker': 'Confession Poker',
            'game-reaction-trainer': 'Reaction Trainer',
            'game-sbir-trainer': 'SBIR Trainer',
            'conflict-cards': 'Conflict Cards',
            'take-the-back': 'Take the Back',
            'disagree-commit-roulette': 'Disagree & Commit Roulette',
            'game-daily-dilemma': 'Daily Dilemma',
            'game-coaching-quest': 'Coaching Quest',
            'tool-goal-tracker': 'Goal Tracker',
            'tool-decision-framework': 'Decision Framework',
            'stoic-tools-module-gamified': 'Stoic Tools',
            'tool-journal': 'Leadership Journal'
        };
        
        const displayName = gameNames[gameName] || gameName;
        
        // Create requirement notice (not blocking, encouraging)
        const notice = document.createElement('div');
        notice.id = 'game-requirement-notice';
        notice.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #1e293b, #0f172a);
                border: 2px solid #f59e0b;
                border-radius: 16px;
                padding: 1.5rem;
                max-width: 320px;
                z-index: 9999;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            ">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <svg style="width: 24px; height: 24px; color: #f59e0b;" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                    </svg>
                    <span style="color: #f59e0b; font-weight: 700;">Practice Recommended</span>
                </div>
                <p style="color: #e2e8f0; font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.5;">
                    Complete <strong>${displayName}</strong> to reinforce what you're learning and earn bonus XP.
                </p>
                <div style="display: flex; gap: 0.75rem;">
                    <a href="${gameName}.html" style="
                        flex: 1;
                        padding: 0.75rem;
                        background: linear-gradient(135deg, #f59e0b, #d97706);
                        border-radius: 8px;
                        color: white;
                        text-decoration: none;
                        text-align: center;
                        font-weight: 600;
                        font-size: 0.85rem;
                    ">Play Now</a>
                    <button onclick="this.closest('#game-requirement-notice').remove()" style="
                        padding: 0.75rem;
                        background: #334155;
                        border: none;
                        border-radius: 8px;
                        color: #94a3b8;
                        cursor: pointer;
                        font-size: 0.85rem;
                    ">Later</button>
                </div>
            </div>
        `;
        
        // Show after 5 seconds
        setTimeout(() => {
            document.body.appendChild(notice);
        }, 5000);
    },
    
    /**
     * Record section completion time
     */
    recordSectionTime(sectionNumber) {
        if (this.state.sectionStartTime) {
            const timeSpent = Math.round((Date.now() - this.state.sectionStartTime) / 1000);
            this.state.sectionTimes[sectionNumber] = timeSpent;
            
            // Save to localStorage
            localStorage.setItem(
                `${this.state.currentBelt}Stripe${this.state.currentStripe}SectionTimes`,
                JSON.stringify(this.state.sectionTimes)
            );
        }
        
        // Reset for next section
        this.state.sectionStartTime = Date.now();
    },
    
    /**
     * Check stripe cooldown
     */
    checkCooldown() {
        const config = this.config[this.state.currentBelt];
        if (!config) return { canProceed: true };
        
        const lastComplete = localStorage.getItem(`${this.state.currentBelt}Stripe${this.state.currentStripe - 1}CompleteTime`);
        if (!lastComplete) return { canProceed: true };
        
        const cooldownMs = config.cooldownHours * 60 * 60 * 1000;
        const elapsed = Date.now() - parseInt(lastComplete);
        
        if (elapsed < cooldownMs) {
            const remaining = cooldownMs - elapsed;
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
            
            return {
                canProceed: false,
                remainingTime: `${hours}h ${minutes}m`,
                message: `Next stripe unlocks in ${hours}h ${minutes}m. Take time to practice what you learned!`
            };
        }
        
        return { canProceed: true };
    },
    
    /**
     * Complete stripe and show enhanced analysis
     */
    completeStripe(options = {}) {
        const {
            quizScore = 0,
            reflectionText = '',
            gameScores = {}
        } = options;
        
        // Save completion time
        localStorage.setItem(
            `${this.state.currentBelt}Stripe${this.state.currentStripe}CompleteTime`,
            Date.now()
        );
        
        // Calculate time invested
        const totalMinutes = Math.round(this.state.totalTimeSpent / 60);
        
        // Generate personalized analysis
        return this.generateAnalysis({
            belt: this.state.currentBelt,
            stripe: this.state.currentStripe,
            timeSpent: totalMinutes,
            quizScore,
            reflectionLength: reflectionText.length,
            gameScores
        });
    },
    
    /**
     * Generate personalized completion analysis
     */
    generateAnalysis(data) {
        const { belt, stripe, timeSpent, quizScore, reflectionLength, gameScores } = data;
        
        // Determine engagement level
        let engagementLevel = 'standard';
        if (timeSpent > 30 && reflectionLength > 150) {
            engagementLevel = 'deep';
        } else if (timeSpent > 45 && reflectionLength > 250 && quizScore > 85) {
            engagementLevel = 'mastery';
        }
        
        // Belt-specific insights
        const insights = {
            white: {
                1: "You've begun the journey of self-awareness. The foundations you're building here will support everything that follows.",
                2: "Understanding your energy patterns is like knowing your body's natural rhythms in training. This awareness will serve you well.",
                3: "Mental patterns shape behavior more than we realize. What you've discovered here is the beginning of lasting change.",
                4: "Values and mission aren't just words—they're your compass. You now have direction."
            },
            blue: {
                1: "Difficult conversations are like sparring—uncomfortable but essential for growth. You've taken the first step.",
                2: "Active listening is a superpower most leaders lack. You're developing a rare skill.",
                3: "Feedback is the breakfast of champions. The SBIR framework you've learned changes how teams grow.",
                4: "Boundaries protect your energy and relationships. What you've learned here prevents burnout."
            },
            purple: {
                1: "Taking ownership, even when it's hard, separates leaders from managers. You're building that muscle.",
                2: "Healthy conflict is the path to commitment. Teams that can't disagree can't truly align.",
                3: "Accountability without micromanagement—that's the balance you're learning to strike.",
                4: "Results matter, but how you achieve them matters more. You're learning to lead both."
            },
            brown: {
                1: "Personal accountability is where coaching begins. You can't develop others without first developing yourself.",
                2: "The depth of feedback you can now give will accelerate your team's growth exponentially.",
                3: "Systems beat willpower. The frameworks you've learned create sustainable accountability.",
                4: "GROW coaching transforms conversations into development opportunities. This is advanced leadership."
            },
            black: {
                1: "Integration means your skills work together seamlessly. You're moving from competence to fluency.",
                2: "Teaching others solidifies your own learning. You're now ready to multiply your impact.",
                3: "Philosophy without practice is empty. Practice without philosophy is blind. You have both.",
                4: "Legacy is what remains when you leave. You're now building something that outlasts you."
            }
        };
        
        const stripeInsight = insights[belt]?.[stripe] || "You've completed this stripe with dedication.";
        
        // Generate XP breakdown
        const baseXP = { white: 50, blue: 75, purple: 100, brown: 150, black: 200 }[belt] || 50;
        const timeBonus = Math.min(50, Math.floor(timeSpent / 2));
        const quizBonus = Math.floor(quizScore / 2);
        const reflectionBonus = Math.min(30, Math.floor(reflectionLength / 10));
        const totalXP = baseXP + timeBonus + quizBonus + reflectionBonus;
        
        return {
            engagementLevel,
            insight: stripeInsight,
            xpBreakdown: {
                base: baseXP,
                timeBonus,
                quizBonus,
                reflectionBonus,
                total: totalXP
            },
            stats: {
                timeSpent: `${timeSpent} minutes`,
                quizScore: `${quizScore}%`,
                reflectionDepth: reflectionLength > 200 ? 'Deep' : reflectionLength > 100 ? 'Good' : 'Brief'
            },
            nextSteps: this.getNextSteps(belt, stripe)
        };
    },
    
    /**
     * Get personalized next steps
     */
    getNextSteps(belt, stripe) {
        const steps = [];
        
        // Check if game was completed
        const config = this.config[belt];
        if (config?.requiredGames?.[stripe]) {
            const game = config.requiredGames[stripe];
            const gameComplete = localStorage.getItem(`${game}Complete`);
            if (!gameComplete) {
                steps.push({
                    type: 'game',
                    title: 'Complete Practice Game',
                    description: 'Reinforce what you learned through practice',
                    link: `${game}.html`
                });
            }
        }
        
        // Add real-world challenge
        steps.push({
            type: 'challenge',
            title: '24-Hour Challenge',
            description: 'Apply one thing you learned before your next stripe',
            action: 'Apply in real life'
        });
        
        // Next stripe (if not stripe 4)
        if (stripe < 4) {
            steps.push({
                type: 'continue',
                title: `Continue to Stripe ${stripe + 1}`,
                description: `Unlocks in ${config?.cooldownHours || 2} hours`,
                link: `${belt}-belt-stripe${stripe + 1}-gamified.html`
            });
        } else {
            steps.push({
                type: 'ceremony',
                title: `${belt.charAt(0).toUpperCase() + belt.slice(1)} Belt Complete!`,
                description: 'Ready for your belt ceremony',
                link: `${belt}-belt-ceremony.html`
            });
        }
        
        return steps;
    }
};

// Auto-initialize if stripe page detected
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const match = path.match(/(\w+)-belt-stripe(\d+)/);
    if (match) {
        const belt = match[1];
        const stripe = parseInt(match[2]);
        StripeDepthSystem.init(belt, stripe);
    }
});

// Export for use
if (typeof module !== 'undefined') {
    module.exports = StripeDepthSystem;
}
