// ===== BLACK BELT STRIPE 3: KURSKORREKTUR (GERMAN) =====
const allChunks = [
    {
        lessonNumber: "Lektion 1 von 4",
        lessonTitle: "Fortschritt überwachen",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "According to the 2025 Talent Trends Austria Report, what percentage der Mitarbeiter fully trust leadership?",
            options: [
                { label: "A) 31%", correct: false },
        { label: "B) 1%", correct: true },
        { label: "C) 50%", correct: false },
        { label: "D) 10%", correct: false }
            ],
            correctFeedback: "✓ Richtig! Only 1% der Mitarbeiter fully trust leadership, highlighting the critical trust crisis in organizations.",
            incorrectFeedback: "Nicht ganz. Only 1% der Mitarbeiter fully trust leadership, highlighting the critical trust crisis in organizations."
        }
    },
    {
        lessonNumber: "Lektion 2 von 4",
        lessonTitle: "Schnelle Anpassung",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "What type von trust does Lencioni's Five Dysfunctions model focus on?",
            options: [
                { label: "A) Predictability-based trust", correct: false },
        { label: "B) Vulnerability-based trust", correct: true },
        { label: "C) Prvonessional trust", correct: false },
        { label: "D) Competency trust", correct: false }
            ],
            correctFeedback: "✓ Richtig! Vulnerability-based trust is the foundation. It allows team members to admit mistakes and ask for help without fear.",
            incorrectFeedback: "Nicht ganz. Vulnerability-based trust is the foundation. It allows team members to admit mistakes and ask for help without fear."
        }
    },
    {
        lessonNumber: "Lektion 3 von 4",
        lessonTitle: "Aus Fehlern lernen",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "According to Google's Project Aristotle, what was der beste Prädiktor für team performance?",
            options: [
                { label: "A) Team member IQ", correct: false },
        { label: "B) Psychological safety", correct: true },
        { label: "C) Years von experience", correct: false },
        { label: "D) Available resources", correct: false }
            ],
            correctFeedback: "✓ Richtig! Psychological safety was the top factor. Teams where members feel safe to take risks outperform others.",
            incorrectFeedback: "Nicht ganz. Psychological safety was the top factor. Teams where members feel safe to take risks outperform others."
        }
    },
    {
        lessonNumber: "Lektion 4 von 4",
        lessonTitle: "Agil bleiben",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "In BJJ, what do people who progress fastest do?",
            options: [
                { label: "A) Never tap out", correct: false },
        { label: "B) Tap early and ask questions", correct: true },
        { label: "C) Only train with lower belts", correct: false },
        { label: "D) Avoid difficult positions", correct: false }
            ],
            correctFeedback: "✓ Richtig! Tapping early and asking questions shows vulnerability and accelerates learning, just like in teams.",
            incorrectFeedback: "Nicht ganz. Tapping early and asking questions shows vulnerability and accelerates learning, just like in teams."
        }
    },
    {
        lessonNumber: "Lektion 5 von 4",
        lessonTitle: "Agil bleiben",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "What happens when teams lack vulnerability-based trust?",
            options: [
                { label: "A) They work faster", correct: false },
        { label: "B) They hide weaknesses and mistakes", correct: true },
        { label: "C) They communicate better", correct: false },
        { label: "D) They innovate more", correct: false }
            ],
            correctFeedback: "✓ Richtig! Without vulnerability-based trust, team members hide weaknesses and mistakes, leading to poor decisions and artificial harmony.",
            incorrectFeedback: "Nicht ganz. Without vulnerability-based trust, team members hide weaknesses and mistakes, leading to poor decisions and artificial harmony."
        }
    },
    {
        lessonNumber: "Lektion 6 von 4",
        lessonTitle: "Agil bleiben",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Which von these is a sign von vulnerability-based trust?",
            options: [
                { label: "A) Team members never admit mistakes", correct: false },
        { label: "B) People ask for help when stuck", correct: true },
        { label: "C) Everyone pretends to know everything", correct: false },
        { label: "D) Weaknesses are hidden", correct: false }
            ],
            correctFeedback: "✓ Richtig! Asking for help when stuck demonstrates vulnerability-based trust. It shows safety to admit du es nicht weißt something.",
            incorrectFeedback: "Nicht ganz. Asking for help when stuck demonstrates vulnerability-based trust. It shows safety to admit du es nicht weißt something."
        }
    },
    {
        lessonNumber: "Lektion 7 von 4",
        lessonTitle: "Agil bleiben",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "What is the relationship between trust and conflict in Lencioni's model?",
            options: [
                { label: "A) Trust prevents conflict", correct: false },
        { label: "B) Trust enables healthy conflict", correct: true },
        { label: "C) They are unrelated", correct: false },
        { label: "D) Conflict destroys trust", correct: false }
            ],
            correctFeedback: "✓ Richtig! Trust enables healthy conflict. Without trust, teams avoid conflict (artificial harmony), which is actually a dysfunction.",
            incorrectFeedback: "Nicht ganz. Trust enables healthy conflict. Without trust, teams avoid conflict (artificial harmony), which is actually a dysfunction."
        }
    },
    {
        lessonNumber: "Lektion 8 von 4",
        lessonTitle: "Agil bleiben",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "In a high-trust team, what happens when someone makes a mistake?",
            options: [
                { label: "A) They are immediately fired", correct: false },
        { label: "B) They hide it from others", correct: false },
        { label: "C) They admit it and the team helps fix it", correct: true },
        { label: "D) They blame someone else", correct: false }
            ],
            correctFeedback: "✓ Richtig! In high-trust teams, mistakes are admitted openly and the team works together to fix them. This builds stronger trust.",
            incorrectFeedback: "Nicht ganz. In high-trust teams, mistakes are admitted openly and the team works together to fix them. This builds stronger trust."
        }
    },
    {
        lessonNumber: "Lektion 9 von 4",
        lessonTitle: "Agil bleiben",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf kurskorrektur Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "What is the first step to building vulnerability-based trust?",
            options: [
                { label: "A) Wait for others to go first", correct: false },
        { label: "B) Start by admitting dein own mistakes and asking for help", correct: true },
        { label: "C) Demand trust from dein team", correct: false },
        { label: "D) Only trust people du know well", correct: false }
            ],
            correctFeedback: "✓ Richtig! Building trust starts with du. Admit dein own mistakes and ask for help first. This creates psychological safety for others.",
            incorrectFeedback: "Nicht ganz. Building trust starts with du. Admit dein own mistakes and ask for help first. This creates psychological safety for others."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
