// ===== BROWN BELT STRIPE 2: PEER ACCOUNTABILITY =====
const allChunks = [
    {
        lessonNumber: "Lesson 1 of 4",
        lessonTitle: "Giving Effective Feedback",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "Ed Schein's culture model has three levels. The deepest level - often invisible but most powerful - consists of:",
            options: [
                { label: "A) Artifacts: The visible structures and processes people can observe", correct: false },
        { label: "B) Espoused values: The stated beliefs and ideals the organization claims", correct: false },
        { label: "C) Basic assumptions: The unconscious, taken-for-granted beliefs that drive behavior", correct: true },
        { label: "D) Behaviors: The actual actions people take day-to-day", correct: false }
            ],
            correctFeedback: "✓ Correct! Perfect understanding of organizational culture! Schein shows that the deepest level is 'basic assumptions' - beliefs so ingrained they're invisible. Example: 'Conflict is dangerous' (assumption) leads to 'We value collaboration' (value) leads to 'No one challenges ideas in meetings' (artifact). You can't change culture by changing artifacts - you must surface and challenge the unconscious assumptions driving behavior. This is Brown Belt organizational thinking.",
            incorrectFeedback: "Not quite. Perfect understanding of organizational culture! Schein shows that the deepest level is 'basic assumptions' - beliefs so ingrained they're invisible. Example: 'Conflict is dangerous' (assumption) leads to 'We value collaboration' (value) leads to 'No one challenges ideas in meetings' (artifact). You can't change culture by changing artifacts - you must surface and challenge the unconscious assumptions driving behavior. This is Brown Belt organizational thinking."
        }
    },
    {
        lessonNumber: "Lesson 2 of 4",
        lessonTitle: "Receiving Feedback",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "You want to shift your team's culture from 'blame and hide mistakes' to 'learn from failures.' According to Schein, you must:",
            options: [
                { label: "A) Change visible behaviors first - reward transparency, punish hiding mistakes", correct: false },
        { label: "B) Surface the unconscious assumption that 'mistakes mean incompetence' and challenge it directly", correct: true },
        { label: "C) Create new values statements about learning from failure", correct: false },
        { label: "D) Hire people who already demonstrate the desired culture", correct: false }
            ],
            correctFeedback: "✓ Correct! Culture change requires changing deep assumptions, not just behaviors. The assumption 'mistakes = incompetence' drives hiding behavior. Challenge this: 'Mistakes are data, not judgment. We hide mistakes to avoid looking incompetent, but hiding mistakes IS incompetence.' Make mistakes safe to discuss by modeling it yourself. Brown Belt culture change works at the assumption level - change the invisible beliefs, and behaviors shift naturally.",
            incorrectFeedback: "Not quite. Culture change requires changing deep assumptions, not just behaviors. The assumption 'mistakes = incompetence' drives hiding behavior. Challenge this: 'Mistakes are data, not judgment. We hide mistakes to avoid looking incompetent, but hiding mistakes IS incompetence.' Make mistakes safe to discuss by modeling it yourself. Brown Belt culture change works at the assumption level - change the invisible beliefs, and behaviors shift naturally."
        }
    },
    {
        lessonNumber: "Lesson 3 of 4",
        lessonTitle: "Peer Reviews",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "Culture as competitive advantage means:",
            options: [
                { label: "A) Having the best perks and benefits to attract talent", correct: false },
        { label: "B) Creating a culture that's difficult for competitors to replicate", correct: true },
        { label: "C) Building a brand that customers recognize", correct: false },
        { label: "D) Hiring the smartest people in the industry", correct: false }
            ],
            correctFeedback: "✓ Correct! Culture as competitive advantage means building something unique and valuable that competitors can't easily copy. Example: Zappos' culture of customer service, Patagonia's culture of environmental responsibility. These aren't just slogans - they're deep systems, values, and behaviors that drive different outcomes. Brown Belt leaders recognize that strategy can be copied, technology can be copied, but authentic culture? That's much harder. Invest in culture - it's your moat.",
            incorrectFeedback: "Not quite. Culture as competitive advantage means building something unique and valuable that competitors can't easily copy. Example: Zappos' culture of customer service, Patagonia's culture of environmental responsibility. These aren't just slogans - they're deep systems, values, and behaviors that drive different outcomes. Brown Belt leaders recognize that strategy can be copied, technology can be copied, but authentic culture? That's much harder. Invest in culture - it's your moat."
        }
    },
    {
        lessonNumber: "Lesson 4 of 4",
        lessonTitle: "Team Accountability Systems",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "When diagnosing organizational culture, you should pay most attention to:",
            options: [
                { label: "A) What people say in company meetings and official communications", correct: false },
        { label: "B) What actually happens when people make mistakes or take risks", correct: true },
        { label: "C) The values posters on the wall", correct: false },
        { label: "D) How new employees describe the culture during onboarding", correct: false }
            ],
            correctFeedback: "✓ Correct! Culture is revealed in moments of pressure. What happens when someone makes a mistake? Takes a risk? Challenges authority? Disagrees publicly? Watch behavior under pressure - that's where real culture shows up. Brown Belt leaders observe the gap between espoused values (what we say) and enacted values (what we do) and close it. Real culture is behavior, not words.",
            incorrectFeedback: "Not quite. Culture is revealed in moments of pressure. What happens when someone makes a mistake? Takes a risk? Challenges authority? Disagrees publicly? Watch behavior under pressure - that's where real culture shows up. Brown Belt leaders observe the gap between espoused values (what we say) and enacted values (what we do) and close it. Real culture is behavior, not words."
        }
    },
    {
        lessonNumber: "Lesson 5 of 4",
        lessonTitle: "Team Accountability Systems",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "Onboarding is most effective for culture transmission when it:",
            options: [
                { label: "A) Covers company history and values statements thoroughly", correct: false },
        { label: "B) Shows new hires how people actually behave and what gets rewarded", correct: true },
        { label: "C) Tests new hires on cultural knowledge", correct: false },
        { label: "D) Separates culture training from job training", correct: false }
            ],
            correctFeedback: "✓ Correct! Onboarding transmits culture through modeling, not teaching. New hires learn culture by watching: Who gets praised? What behaviors are rewarded? How do leaders handle conflict? What happens when someone breaks a rule? Brown Belt onboarding shows culture in action - pair new hires with culture carriers, show real examples, make culture visible through stories and behaviors. Teach culture by demonstrating it.",
            incorrectFeedback: "Not quite. Onboarding transmits culture through modeling, not teaching. New hires learn culture by watching: Who gets praised? What behaviors are rewarded? How do leaders handle conflict? What happens when someone breaks a rule? Brown Belt onboarding shows culture in action - pair new hires with culture carriers, show real examples, make culture visible through stories and behaviors. Teach culture by demonstrating it."
        }
    },
    {
        lessonNumber: "Lesson 6 of 4",
        lessonTitle: "Team Accountability Systems",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "Rituals and symbols that reinforce culture work best when they:",
            options: [
                { label: "A) Are elaborate and impressive to outsiders", correct: false },
        { label: "B) Embody and reinforce the core values in daily practice", correct: true },
        { label: "C) Are unique and different from competitors", correct: false },
        { label: "D) Include everyone equally regardless of role", correct: false }
            ],
            correctFeedback: "✓ Correct! Rituals reinforce culture when they embody values, not just celebrate them. Example: If your value is 'learning from failure,' your ritual might be monthly 'failure postmortems' where teams share what didn't work and what they learned. If your value is 'customer obsession,' your ritual might be everyone spending time with customers monthly. Brown Belt leaders design rituals that PRACTICE values, not just talk about them.",
            incorrectFeedback: "Not quite. Rituals reinforce culture when they embody values, not just celebrate them. Example: If your value is 'learning from failure,' your ritual might be monthly 'failure postmortems' where teams share what didn't work and what they learned. If your value is 'customer obsession,' your ritual might be everyone spending time with customers monthly. Brown Belt leaders design rituals that PRACTICE values, not just talk about them."
        }
    },
    {
        lessonNumber: "Lesson 7 of 4",
        lessonTitle: "Team Accountability Systems",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "Culture change leadership (per Kotter and Schein) requires:",
            options: [
                { label: "A) A charismatic leader who can inspire change through speeches", correct: false },
        { label: "B) A systematic approach that addresses both the emotional and rational sides of change", correct: true },
        { label: "C) Replacing people who resist the new culture", correct: false },
        { label: "D) Waiting for a crisis that makes change necessary", correct: false }
            ],
            correctFeedback: "✓ Correct! Culture change is systematic work that addresses both head and heart. Kotter: create urgency, build coalition, communicate vision, empower action. Schein: unfreeze old assumptions, learn new behaviors, refreeze new assumptions. Both recognize that culture change is emotional work - people's identity is tied to current culture. Brown Belt leaders change culture systematically, recognizing it's a journey, not an event.",
            incorrectFeedback: "Not quite. Culture change is systematic work that addresses both head and heart. Kotter: create urgency, build coalition, communicate vision, empower action. Schein: unfreeze old assumptions, learn new behaviors, refreeze new assumptions. Both recognize that culture change is emotional work - people's identity is tied to current culture. Brown Belt leaders change culture systematically, recognizing it's a journey, not an event."
        }
    },
    {
        lessonNumber: "Lesson 8 of 4",
        lessonTitle: "Team Accountability Systems",
        content: `<div class="content-section">
    <h3>🎯 What You'll Learn</h3>
    <p>This section focuses on peer accountability principles and practices.</p>
</div>`,
        question: {
            text: "The fastest way to shift culture is to:",
            options: [
                { label: "A) Change the reward systems - what gets measured and rewarded", correct: true },
        { label: "B) Hire new people who embody the desired culture", correct: false },
        { label: "C) Communicate the new culture values more frequently", correct: false },
        { label: "D) Replace leaders who don't model the new culture", correct: false }
            ],
            correctFeedback: "✓ Correct! Reward systems drive behavior faster than communication. People do what gets rewarded, regardless of what gets said. If you want collaboration but reward individual performance, you'll get competition. If you want innovation but punish failures, you'll get risk-aversion. Brown Belt leaders align rewards with desired culture: measure and reward the behaviors that embody values. This is leverage.",
            incorrectFeedback: "Not quite. Reward systems drive behavior faster than communication. People do what gets rewarded, regardless of what gets said. If you want collaboration but reward individual performance, you'll get competition. If you want innovation but punish failures, you'll get risk-aversion. Brown Belt leaders align rewards with desired culture: measure and reward the behaviors that embody values. This is leverage."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
