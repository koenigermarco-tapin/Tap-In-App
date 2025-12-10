/**
 * TAP-IN Enhanced Stripe Completion
 * Personalized analysis, unique achievements, and rich completion experience
 */

const StripeCompletionEnhanced = {
    
    // Achievement imagery by belt/stripe
    achievements: {
        white: {
            1: { title: 'Foundation Stone', icon: '🪨', color: '#f8fafc', subtitle: 'Self-Trust Unlocked' },
            2: { title: 'Energy Awareness', icon: '⚡', color: '#fbbf24', subtitle: 'Know Your Rhythms' },
            3: { title: 'Mind Reader', icon: '🧠', color: '#8b5cf6', subtitle: 'Patterns Revealed' },
            4: { title: 'True North', icon: '🧭', color: '#10b981', subtitle: 'Values Defined' }
        },
        blue: {
            1: { title: 'Brave Voice', icon: '💬', color: '#3b82f6', subtitle: 'Difficult Conversations Master' },
            2: { title: 'Deep Listener', icon: '👂', color: '#06b6d4', subtitle: 'Truly Heard' },
            3: { title: 'Feedback Champion', icon: '🎯', color: '#10b981', subtitle: 'SBIR Certified' },
            4: { title: 'Boundary Keeper', icon: '🛡️', color: '#6366f1', subtitle: 'Limits Set' }
        },
        purple: {
            1: { title: 'Ownership Master', icon: '👊', color: '#8b5cf6', subtitle: 'Take the Back' },
            2: { title: 'Conflict Navigator', icon: '⚔️', color: '#ec4899', subtitle: 'Healthy Tension' },
            3: { title: 'Accountability Pro', icon: '📊', color: '#f59e0b', subtitle: 'Team Accountable' },
            4: { title: 'Results Driver', icon: '🏆', color: '#10b981', subtitle: 'Outcomes Focus' }
        },
        brown: {
            1: { title: 'Self-Accountable', icon: '⚖️', color: '#92400e', subtitle: 'Walk the Talk' },
            2: { title: 'Feedback Sage', icon: '📝', color: '#b45309', subtitle: 'Deep Impact' },
            3: { title: 'System Builder', icon: '⚙️', color: '#78350f', subtitle: 'Sustainable Success' },
            4: { title: 'Coach Certified', icon: '🎓', color: '#d97706', subtitle: 'GROW Master' }
        },
        black: {
            1: { title: 'Integrated Leader', icon: '🔮', color: '#1f2937', subtitle: 'All Skills United' },
            2: { title: 'Multiplier', icon: '✨', color: '#374151', subtitle: 'Teaching Others' },
            3: { title: 'Philosopher King', icon: '📚', color: '#4b5563', subtitle: 'Wisdom Applied' },
            4: { title: 'Legacy Builder', icon: '🏛️', color: '#111827', subtitle: 'Impact Beyond You' }
        }
    },
    
    /**
     * Show enhanced completion screen
     */
    show(options = {}) {
        const {
            belt,
            stripe,
            quizScore = 0,
            timeSpent = 0,
            reflectionText = ''
        } = options;
        
        // Get achievement data
        const achievement = this.achievements[belt]?.[stripe] || {
            title: 'Stripe Complete',
            icon: '🎖️',
            color: '#f59e0b',
            subtitle: 'Well done!'
        };
        
        // Calculate engagement level
        let engagementLevel = 'Completed';
        let engagementColor = '#64748b';
        if (timeSpent > 20 && quizScore > 70) {
            engagementLevel = 'Solid Performance';
            engagementColor = '#10b981';
        }
        if (timeSpent > 35 && quizScore > 85 && reflectionText.length > 150) {
            engagementLevel = 'Deep Mastery';
            engagementColor = '#f59e0b';
        }
        
        // Calculate XP
        const baseXP = { white: 50, blue: 75, purple: 100, brown: 150, black: 200 }[belt] || 50;
        const bonusXP = Math.floor(quizScore / 4) + Math.min(25, Math.floor(timeSpent / 2));
        const totalXP = baseXP + bonusXP;
        
        // Get personalized insight
        const insight = this.getInsight(belt, stripe, quizScore);
        
        // Belt-specific colors
        const beltColors = {
            white: { primary: '#f8fafc', secondary: '#64748b', bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)' },
            blue: { primary: '#3b82f6', secondary: '#1d4ed8', bg: 'linear-gradient(135deg, #1e40af, #3b82f6)' },
            purple: { primary: '#8b5cf6', secondary: '#6d28d9', bg: 'linear-gradient(135deg, #5b21b6, #8b5cf6)' },
            brown: { primary: '#92400e', secondary: '#78350f', bg: 'linear-gradient(135deg, #451a03, #92400e)' },
            black: { primary: '#1f2937', secondary: '#111827', bg: 'linear-gradient(135deg, #030712, #1f2937)' }
        };
        
        const colors = beltColors[belt] || beltColors.blue;
        
        // Create completion overlay
        const overlay = document.createElement('div');
        overlay.id = 'stripe-completion-overlay';
        overlay.innerHTML = `
            <div style="
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                padding: 1rem;
                animation: fadeIn 0.3s ease;
            ">
                <div style="
                    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
                    border: 3px solid ${colors.primary};
                    border-radius: 24px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.4s ease;
                ">
                    <!-- Achievement Header -->
                    <div style="
                        ${colors.bg};
                        padding: 2rem;
                        text-align: center;
                        border-radius: 21px 21px 0 0;
                    ">
                        <div style="
                            font-size: 4rem;
                            margin-bottom: 1rem;
                            animation: bounceIn 0.5s ease 0.3s both;
                        ">${achievement.icon}</div>
                        <h2 style="
                            font-size: 1.75rem;
                            font-weight: 800;
                            color: ${belt === 'white' ? '#1f2937' : '#ffffff'};
                            margin-bottom: 0.5rem;
                        ">${achievement.title}</h2>
                        <p style="
                            color: ${belt === 'white' ? '#64748b' : 'rgba(255,255,255,0.8)'};
                            font-size: 1rem;
                        ">${achievement.subtitle}</p>
                        
                        <!-- Belt/Stripe Badge -->
                        <div style="
                            display: inline-block;
                            background: rgba(0,0,0,0.2);
                            padding: 0.5rem 1rem;
                            border-radius: 20px;
                            margin-top: 1rem;
                            font-size: 0.85rem;
                            color: ${belt === 'white' ? '#374151' : 'rgba(255,255,255,0.9)'};
                        ">
                            ${belt.charAt(0).toUpperCase() + belt.slice(1)} Belt • Stripe ${stripe}
                        </div>
                    </div>
                    
                    <!-- Stats Section -->
                    <div style="padding: 1.5rem 2rem;">
                        <!-- Engagement Level -->
                        <div style="
                            text-align: center;
                            margin-bottom: 1.5rem;
                            padding: 1rem;
                            background: ${engagementColor}22;
                            border: 1px solid ${engagementColor}44;
                            border-radius: 12px;
                        ">
                            <span style="color: ${engagementColor}; font-weight: 700; font-size: 1.1rem;">
                                ${engagementLevel}
                            </span>
                        </div>
                        
                        <!-- Stats Grid -->
                        <div style="
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 1rem;
                            margin-bottom: 1.5rem;
                        ">
                            <div style="text-align: center; padding: 1rem; background: #0f172a; border-radius: 12px;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: #10b981;">${timeSpent}m</div>
                                <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Time Invested</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: #0f172a; border-radius: 12px;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: #3b82f6;">${quizScore}%</div>
                                <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Quiz Score</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: #0f172a; border-radius: 12px;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: #f59e0b;">+${totalXP}</div>
                                <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">XP Earned</div>
                            </div>
                        </div>
                        
                        <!-- Personalized Insight -->
                        <div style="
                            background: linear-gradient(135deg, #1e293b, #0f172a);
                            border-left: 4px solid ${colors.primary};
                            padding: 1.25rem;
                            border-radius: 0 12px 12px 0;
                            margin-bottom: 1.5rem;
                        ">
                            <div style="
                                color: ${colors.primary};
                                font-weight: 600;
                                font-size: 0.85rem;
                                margin-bottom: 0.5rem;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                            ">
                                <svg style="width: 16px; height: 16px;" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 00-3.5 10.9V14a1 1 0 001 1h5a1 1 0 001-1v-1.1A6 6 0 0010 2zM8 17a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                </svg>
                                Your Insight
                            </div>
                            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin: 0;">
                                ${insight}
                            </p>
                        </div>
                        
                        <!-- XP Breakdown -->
                        <div style="
                            background: #0f172a;
                            border-radius: 12px;
                            padding: 1rem;
                            margin-bottom: 1.5rem;
                        ">
                            <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.75rem;">XP Breakdown</div>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <div style="display: flex; justify-content: space-between; color: #e2e8f0; font-size: 0.9rem;">
                                    <span>Base Completion</span>
                                    <span>+${baseXP}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; color: #e2e8f0; font-size: 0.9rem;">
                                    <span>Performance Bonus</span>
                                    <span>+${bonusXP}</span>
                                </div>
                                <div style="height: 1px; background: #334155; margin: 0.25rem 0;"></div>
                                <div style="display: flex; justify-content: space-between; color: #f59e0b; font-weight: 700;">
                                    <span>Total</span>
                                    <span>+${totalXP} XP</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            ${stripe < 4 ? `
                                <a href="${belt}-belt-stripe${stripe + 1}-gamified.html" style="
                                    display: block;
                                    padding: 1rem;
                                    ${colors.bg};
                                    border-radius: 12px;
                                    color: ${belt === 'white' ? '#1f2937' : 'white'};
                                    text-decoration: none;
                                    text-align: center;
                                    font-weight: 700;
                                    transition: transform 0.2s;
                                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                                    Continue to Stripe ${stripe + 1} →
                                </a>
                            ` : `
                                <a href="${belt}-belt.html" style="
                                    display: block;
                                    padding: 1rem;
                                    ${colors.bg};
                                    border-radius: 12px;
                                    color: ${belt === 'white' ? '#1f2937' : 'white'};
                                    text-decoration: none;
                                    text-align: center;
                                    font-weight: 700;
                                    transition: transform 0.2s;
                                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                                    🎉 Complete ${belt.charAt(0).toUpperCase() + belt.slice(1)} Belt!
                                </a>
                            `}
                            <a href="learning-hub.html" style="
                                display: block;
                                padding: 0.75rem;
                                background: #334155;
                                border-radius: 10px;
                                color: #94a3b8;
                                text-decoration: none;
                                text-align: center;
                                font-size: 0.9rem;
                            ">
                                Back to Hub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.1); }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); opacity: 1; }
                }
            </style>
        `;
        
        document.body.appendChild(overlay);
        
        // Award XP
        this.awardXP(totalXP);
        
        // Track completion
        this.trackCompletion(belt, stripe, { timeSpent, quizScore, totalXP });
    },
    
    /**
     * Get personalized insight based on performance
     */
    getInsight(belt, stripe, score) {
        const insights = {
            white: {
                1: {
                    high: "Your self-trust foundation is solid. This awareness will serve you in every challenge ahead.",
                    mid: "You're building self-trust. Remember: acknowledging uncertainty is itself a form of wisdom.",
                    low: "Self-trust takes time to develop. What you've started here will grow with practice."
                },
                2: {
                    high: "You have strong energy awareness. Use this knowledge to optimize your peak performance times.",
                    mid: "You're becoming aware of your energy patterns. Keep tracking to refine your understanding.",
                    low: "Energy management is a skill. The patterns will become clearer as you pay attention."
                },
                3: {
                    high: "Your mental pattern recognition is sharp. This awareness is the first step to change.",
                    mid: "You're seeing your patterns more clearly. Awareness precedes transformation.",
                    low: "Mental patterns often hide in plain sight. What you've uncovered is valuable."
                },
                4: {
                    high: "Your values and mission are crystal clear. This clarity will guide difficult decisions.",
                    mid: "You have direction. Refine your mission as you grow—it's meant to evolve.",
                    low: "Mission clarity develops over time. What you've defined is a strong starting point."
                }
            },
            blue: {
                1: {
                    high: "You've mastered the fundamentals of difficult conversations. Now practice in real situations.",
                    mid: "The STATE framework gives you structure. Confidence comes with practice.",
                    low: "Difficult conversations are hard for everyone. You now have tools others don't."
                },
                2: {
                    high: "Active listening is rare. Your ability to truly hear will set you apart as a leader.",
                    mid: "You're developing the skill of presence. Each conversation is practice.",
                    low: "Listening is harder than speaking. What you've learned will improve with intention."
                },
                3: {
                    high: "SBIR mastery changes teams. You can now give feedback that actually drives change.",
                    mid: "Structured feedback feels awkward at first. It becomes natural with repetition.",
                    low: "Feedback is a gift. The framework you've learned makes giving it easier."
                },
                4: {
                    high: "Your boundaries are clear and communicated well. This protects your energy for what matters.",
                    mid: "Boundaries require ongoing maintenance. What you've set is a strong foundation.",
                    low: "Saying no is hard. The clarity you've gained makes it possible."
                }
            },
            purple: {
                1: {
                    high: "Ownership mindset is fully developed. You see problems as opportunities to lead.",
                    mid: "Taking the back means taking responsibility. You're building this muscle.",
                    low: "Ownership is a choice made daily. You now understand what it means."
                },
                2: {
                    high: "You navigate conflict with skill. Healthy tension leads to better decisions.",
                    mid: "Conflict is uncomfortable but necessary. Your toolkit is growing.",
                    low: "Avoiding conflict feels safe but costly. You now have alternatives."
                },
                3: {
                    high: "Your accountability systems are solid. Teams thrive with this kind of structure.",
                    mid: "Accountability without micromanagement is an art. You're developing it.",
                    low: "Accountability starts with clarity. What you've learned creates that clarity."
                },
                4: {
                    high: "Results-focus combined with people-focus—you've found the balance.",
                    mid: "Results matter, but the path to them matters too. You understand both.",
                    low: "Outcomes thinking is learnable. You've taken important steps."
                }
            },
            brown: {
                1: {
                    high: "Self-accountability is your superpower. You model what you expect from others.",
                    mid: "Walking the talk requires vigilance. Your awareness is growing.",
                    low: "Personal accountability is the foundation of leading others."
                },
                2: {
                    high: "Your feedback creates lasting change. This is advanced leadership in action.",
                    mid: "Deep feedback requires practice. Each conversation builds your skill.",
                    low: "Impactful feedback takes time to master. You're on the path."
                },
                3: {
                    high: "Systems thinking is your strength. You build sustainable success.",
                    mid: "Systems beat willpower. What you've created will compound.",
                    low: "Frameworks provide structure. Apply what you've learned consistently."
                },
                4: {
                    high: "GROW coaching mastery achieved. You transform conversations into development.",
                    mid: "Coaching is a skill that improves with each conversation.",
                    low: "The GROW model gives structure to development conversations."
                }
            },
            black: {
                1: {
                    high: "Integration complete. Your leadership skills work together seamlessly.",
                    mid: "The pieces are connecting. Fluency comes with continued practice.",
                    low: "Integration is a journey. What you've unified will strengthen."
                },
                2: {
                    high: "Teaching multiplies impact. You're ready to develop other leaders.",
                    mid: "The best way to learn is to teach. You're beginning that journey.",
                    low: "Sharing knowledge solidifies it. Each teaching moment is growth."
                },
                3: {
                    high: "Philosophy grounds action. Your wisdom is both deep and practical.",
                    mid: "Theory without practice is empty. You're bridging both.",
                    low: "Leadership philosophy develops over time. Seeds are planted."
                },
                4: {
                    high: "Legacy thinking achieved. Your impact extends beyond your presence.",
                    mid: "What you build outlasts you. This awareness shapes decisions.",
                    low: "Legacy begins with intention. You've set meaningful direction."
                }
            }
        };
        
        const level = score >= 85 ? 'high' : score >= 60 ? 'mid' : 'low';
        return insights[belt]?.[stripe]?.[level] || "Well done completing this stripe!";
    },
    
    /**
     * Award XP to user
     */
    awardXP(amount) {
        const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
        const newXP = currentXP + amount;
        localStorage.setItem('totalXP', newXP.toString());
        
        // Trigger XP event
        window.dispatchEvent(new CustomEvent('xpAwarded', { detail: { amount, total: newXP } }));
    },
    
    /**
     * Track completion
     */
    trackCompletion(belt, stripe, data) {
        localStorage.setItem(`${belt}BeltStripe${stripe}Complete`, 'true');
        localStorage.setItem(`${belt}BeltStripe${stripe}Score`, data.quizScore.toString());
        localStorage.setItem(`${belt}BeltStripe${stripe}Time`, data.timeSpent.toString());
        localStorage.setItem(`${belt}BeltStripe${stripe}XP`, data.totalXP.toString());
        localStorage.setItem(`${belt}BeltStripe${stripe}Date`, new Date().toISOString());
        
        // Check if belt complete
        if (stripe === 4) {
            localStorage.setItem(`${belt}BeltComplete`, 'true');
        }
    }
};

// Export
if (typeof module !== 'undefined') {
    module.exports = StripeCompletionEnhanced;
}
