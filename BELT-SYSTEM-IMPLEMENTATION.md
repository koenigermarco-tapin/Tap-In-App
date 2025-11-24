# 🥋 Belt Progression System - Implementation Plan

## Visual Belt Display Component

### Belt Progress Tracker (to add to learning-hub.html)

```html
<!-- Belt Progression Section (add after global stats) -->
<div class="belt-progression-section">
    <h2 class="section-title">🥋 Belt Progression</h2>
    <div class="current-belt-display">
        <div class="belt-visual" id="currentBelt">
            <div class="belt-color white-belt">
                <div class="belt-stripes" id="beltStripes">
                    <!-- Stripes added dynamically -->
                </div>
            </div>
            <div class="belt-label">White Belt</div>
            <div class="belt-progress-text">0/4 Stripes Earned</div>
        </div>
    </div>

    <div class="belt-journey">
        <div class="belt-path">
            <div class="belt-node completed" data-belt="white">
                <div class="belt-circle white-belt">⚪</div>
                <div class="belt-name">White<br>Trust</div>
            </div>
            <div class="belt-connector"></div>
            <div class="belt-node locked" data-belt="blue">
                <div class="belt-circle blue-belt">🔵</div>
                <div class="belt-name">Blue<br>Conflict</div>
            </div>
            <div class="belt-connector"></div>
            <div class="belt-node locked" data-belt="purple">
                <div class="belt-circle purple-belt">🟣</div>
                <div class="belt-name">Purple<br>Commitment</div>
            </div>
            <div class="belt-connector"></div>
            <div class="belt-node locked" data-belt="brown">
                <div class="belt-circle brown-belt">🟤</div>
                <div class="belt-name">Brown<br>Accountability</div>
            </div>
            <div class="belt-connector"></div>
            <div class="belt-node locked" data-belt="black">
                <div class="belt-circle black-belt">⚫</div>
                <div class="belt-name">Black<br>Results</div>
            </div>
        </div>
    </div>
</div>

<!-- Belt Modules Section -->
<div class="belt-modules-section">
    <h2 class="section-title">⚪ White Belt: Vulnerability-Based Trust</h2>
    <div class="modules-grid">
        <!-- Stripe 1: Trust Foundations -->
        <div class="module-card" onclick="location.href='white-belt-stripe1-gamified.html'">
            <div class="module-header white-belt-stripe">
                <h3>🥋 Stripe 1: Trust Foundations</h3>
                <div class="stripe-badge">Stripe 1/4</div>
            </div>
            <div class="module-stats">
                <div class="stat">
                    <span class="stat-label">Progress</span>
                    <span class="stat-value" id="whitebelt-stripe1-progress">0%</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Lessons</span>
                    <span class="stat-value" id="whitebelt-stripe1-lessons">0/4</span>
                </div>
                <div class="stat">
                    <span class="stat-label">XP</span>
                    <span class="stat-value" id="whitebelt-stripe1-xp">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Streak</span>
                    <span class="stat-value" id="whitebelt-stripe1-streak">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Badge</span>
                    <span class="stat-value" id="whitebelt-stripe1-badges">-</span>
                </div>
            </div>
        </div>

        <!-- Stripe 2: Practicing Vulnerability -->
        <div class="module-card locked" data-requires="whitebelt-stripe1">
            <div class="module-header white-belt-stripe">
                <h3>🥋 Stripe 2: Practicing Vulnerability</h3>
                <div class="stripe-badge">Stripe 2/4</div>
            </div>
            <div class="module-lock-message">
                <div class="lock-icon">🔒</div>
                <div class="lock-text">Complete Stripe 1 to unlock</div>
            </div>
        </div>

        <!-- Stripe 3: Building Team Trust -->
        <div class="module-card locked" data-requires="whitebelt-stripe2">
            <div class="module-header white-belt-stripe">
                <h3>🥋 Stripe 3: Building Team Trust</h3>
                <div class="stripe-badge">Stripe 3/4</div>
            </div>
            <div class="module-lock-message">
                <div class="lock-icon">🔒</div>
                <div class="lock-text">Complete Stripe 2 to unlock</div>
            </div>
        </div>

        <!-- Stripe 4: Trust Mastery -->
        <div class="module-card locked" data-requires="whitebelt-stripe3">
            <div class="module-header white-belt-stripe">
                <h3>🥋 Stripe 4: Trust Mastery</h3>
                <div class="stripe-badge">Stripe 4/4</div>
            </div>
            <div class="module-lock-message">
                <div class="lock-icon">🔒</div>
                <div class="lock-text">Complete Stripe 3 to unlock</div>
            </div>
        </div>

        <!-- Belt Assessment -->
        <div class="assessment-card locked" data-requires="whitebelt-stripe4">
            <div class="module-header white-belt-assessment">
                <h3>🎓 White Belt Assessment</h3>
                <div class="assessment-badge">Final Test</div>
            </div>
            <div class="assessment-info">
                <p>Complete all 4 stripes to unlock the belt assessment</p>
                <p><strong>Passing Score:</strong> 80% or higher</p>
                <p><strong>Reward:</strong> ⚪ White Belt + 500 XP Bonus</p>
            </div>
        </div>
    </div>
</div>
```

---

## CSS for Belt System

```css
/* Belt Progression Section */
.belt-progression-section {
    background: white;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.current-belt-display {
    text-align: center;
    padding: 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 15px;
    margin-bottom: 30px;
}

.belt-visual {
    display: inline-block;
}

.belt-color {
    width: 200px;
    height: 40px;
    border-radius: 10px;
    margin: 0 auto 10px;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.white-belt {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #cbd5e1;
}

.blue-belt {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.purple-belt {
    background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
}

.brown-belt {
    background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
}

.black-belt {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}

.belt-stripes {
    display: flex;
    gap: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.stripe {
    width: 8px;
    height: 30px;
    background: #1f2937;
    border-radius: 2px;
}

.belt-label {
    font-size: 24px;
    font-weight: 700;
    color: #1a365d;
    margin-top: 10px;
}

.belt-progress-text {
    font-size: 14px;
    color: #64748b;
    margin-top: 5px;
}

/* Belt Journey Path */
.belt-journey {
    margin-top: 30px;
    overflow-x: auto;
}

.belt-path {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 600px;
    padding: 20px 0;
}

.belt-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
}

.belt-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
}

.belt-node.completed .belt-circle {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.belt-node.locked .belt-circle {
    opacity: 0.4;
    filter: grayscale(100%);
}

.belt-name {
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    color: #475569;
}

.belt-connector {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
    margin: 0 10px;
}

/* Stripe Badge */
.stripe-badge {
    background: #fbbf24;
    color: #78350f;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
}

.white-belt-stripe {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #cbd5e1;
}

/* Module Lock State */
.module-card.locked {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

.module-lock-message {
    text-align: center;
    padding: 40px 20px;
    color: #64748b;
}

.lock-icon {
    font-size: 48px;
    margin-bottom: 10px;
}

.lock-text {
    font-size: 14px;
    font-weight: 500;
}

/* Assessment Card */
.assessment-card {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: white;
    border: none;
}

.white-belt-assessment {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.assessment-badge {
    background: white;
    color: #92400e;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
}

.assessment-info {
    padding: 20px;
}

.assessment-info p {
    margin: 10px 0;
    font-size: 14px;
}
```

---

## JavaScript for Belt Tracking

```javascript
// Belt System Constants
const BELTS = {
    white: {
        name: 'White Belt',
        dysfunction: 'Absence of Trust',
        emoji: '⚪',
        color: 'white-belt',
        stripes: 4,
        xpBonus: 500
    },
    blue: {
        name: 'Blue Belt',
        dysfunction: 'Fear of Conflict',
        emoji: '🔵',
        color: 'blue-belt',
        stripes: 4,
        xpBonus: 750
    },
    purple: {
        name: 'Purple Belt',
        dysfunction: 'Lack of Commitment',
        emoji: '🟣',
        color: 'purple-belt',
        stripes: 4,
        xpBonus: 1000
    },
    brown: {
        name: 'Brown Belt',
        dysfunction: 'Avoidance of Accountability',
        emoji: '🟤',
        color: 'brown-belt',
        stripes: 4,
        xpBonus: 1500
    },
    black: {
        name: 'Black Belt',
        dysfunction: 'Inattention to Results',
        emoji: '⚫',
        color: 'black-belt',
        stripes: 4,
        xpBonus: 2500
    }
};

// Belt Progression Tracking
function getCurrentBelt() {
    const earned = JSON.parse(localStorage.getItem('beltsEarned') || '[]');
    if (earned.includes('black')) return 'black';
    if (earned.includes('brown')) return 'brown';
    if (earned.includes('purple')) return 'purple';
    if (earned.includes('blue')) return 'blue';
    return 'white';
}

function getBeltStripes(belt) {
    const stripesEarned = JSON.parse(localStorage.getItem(`${belt}StripesEarned`) || '[]');
    return stripesEarned.length;
}

function awardStripe(belt, stripeNumber) {
    const stripesEarned = JSON.parse(localStorage.getItem(`${belt}StripesEarned`) || '[]');
    if (!stripesEarned.includes(stripeNumber)) {
        stripesEarned.push(stripeNumber);
        localStorage.setItem(`${belt}StripesEarned`, JSON.stringify(stripesEarned));
        
        // Show achievement
        showAchievement(
            `Stripe ${stripeNumber} Earned! 🥋`,
            `You're ${stripeNumber}/4 towards your ${BELTS[belt].name}`
        );
        
        // Check if ready for belt test
        if (stripesEarned.length === 4) {
            unlockBeltAssessment(belt);
        }
    }
}

function awardBelt(belt, assessmentScore) {
    const beltsEarned = JSON.parse(localStorage.getItem('beltsEarned') || '[]');
    if (!beltsEarned.includes(belt)) {
        beltsEarned.push(belt);
        localStorage.setItem('beltsEarned', JSON.stringify(beltsEarned));
        
        // Award bonus XP
        const totalXP = parseInt(localStorage.getItem('totalXP') || '0');
        localStorage.setItem('totalXP', totalXP + BELTS[belt].xpBonus);
        
        // Show achievement
        showBeltEarnedPopup(belt, assessmentScore, BELTS[belt].xpBonus);
        
        // Unlock next belt
        const nextBelt = getNextBelt(belt);
        if (nextBelt) {
            unlockBelt(nextBelt);
        }
    }
}

function updateBeltDisplay() {
    const currentBelt = getCurrentBelt();
    const stripes = getBeltStripes(currentBelt);
    
    // Update visual belt
    const beltElement = document.querySelector('.belt-color');
    beltElement.className = `belt-color ${BELTS[currentBelt].color}`;
    
    // Update stripes
    const stripesContainer = document.getElementById('beltStripes');
    stripesContainer.innerHTML = '';
    for (let i = 0; i < stripes; i++) {
        const stripe = document.createElement('div');
        stripe.className = 'stripe';
        stripesContainer.appendChild(stripe);
    }
    
    // Update label
    document.querySelector('.belt-label').textContent = BELTS[currentBelt].name;
    document.querySelector('.belt-progress-text').textContent = `${stripes}/4 Stripes Earned`;
    
    // Update path
    updateBeltPath();
}

function updateBeltPath() {
    const earned = JSON.parse(localStorage.getItem('beltsEarned') || '[]');
    const nodes = document.querySelectorAll('.belt-node');
    
    nodes.forEach(node => {
        const belt = node.dataset.belt;
        if (earned.includes(belt)) {
            node.classList.add('completed');
            node.classList.remove('locked');
        } else {
            node.classList.remove('completed');
            node.classList.add('locked');
        }
    });
}

function unlockBeltAssessment(belt) {
    showAchievement(
        '🎓 Assessment Unlocked!',
        `All 4 stripes earned! Take the ${BELTS[belt].name} assessment to earn your belt.`
    );
}

function showBeltEarnedPopup(belt, score, xpBonus) {
    // Create special belt achievement popup
    const popup = document.createElement('div');
    popup.className = 'belt-achievement-popup';
    popup.innerHTML = `
        <div class="belt-achievement-content">
            <div class="belt-achievement-icon">${BELTS[belt].emoji}</div>
            <h2>${BELTS[belt].name} Earned!</h2>
            <p>You mastered: ${BELTS[belt].dysfunction}</p>
            <div class="belt-achievement-score">Assessment Score: ${score}%</div>
            <div class="belt-achievement-xp">+${xpBonus} XP Bonus!</div>
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 6000);
}
```

---

## localStorage Schema for Belt System

```javascript
// Belt Progress Keys
'beltsEarned': ['white', 'blue'] // Array of earned belts
'whiteStripesEarned': [1, 2, 3, 4] // Stripes for white belt
'blueStripesEarned': [1, 2] // Stripes for blue belt
'purpleStripesEarned': []
'brownStripesEarned': []
'blackStripesEarned': []

// Module Completion Keys (per stripe)
'whitebeltStripe1Completed': [1, 2, 3, 4] // Lessons completed
'whitebeltStripe1ModuleXP': 200 // XP earned
'whitebeltStripe2Completed': [1, 2, 3, 4]
'whitebeltStripe2ModuleXP': 200
// ... and so on for all 20 modules

// Assessment Keys
'whitebeltAssessmentScore': 85 // Percentage score
'whitebeltAssessmentPassed': true
'whitebeltAssessmentDate': '2024-11-24'
```

---

## Next Steps

1. **Use CLAUDE-COURSE-BUILDER-PROMPT.md** to generate White Belt content in Claude Projects
2. **Create HTML templates** for stripe modules (using existing module structure)
3. **Implement belt progression UI** in learning-hub.html
4. **Build assessment functionality** (new component)
5. **Test progression flow** (stripe 1 → 2 → 3 → 4 → assessment → belt earned)
6. **Deploy and iterate**

---

## Migration Path for Existing Users

Existing 10 modules can be:
- **Kept as standalone** "Pre-Belt Foundations"
- **Integrated into belt system** as bonus content
- **Prerequisite to White Belt** (must complete before starting belt journey)

Recommendation: Position as "Foundation Skills" that unlock the belt system.
