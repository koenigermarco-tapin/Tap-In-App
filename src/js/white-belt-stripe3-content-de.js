// ===== WHITE BELT STRIPE 3: SELBSTFÜHRUNG (GERMAN) =====
const allChunks = [
    {
        lessonNumber: "Lektion 1 von 4",
        lessonTitle: "Selbstbewusstsein",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist most effective way to build trust quickly?",
            options: [
                { label: "A) Demand trust from others", correct: false },
        { label: "B) Start by being vulnerable yourself", correct: true },
        { label: "C) Wait for others to trust you first", correct: false },
        { label: "D) Only trust people you already know", correct: false }
            ],
            correctFeedback: "✓ Richtig! The fastest way to build trust is to go first. Be vulnerable, Fehler zugeben, and um Hilfe bitten. This creates safety for others.",
            incorrectFeedback: "Nicht ganz. The fastest way to build trust is to go first. Be vulnerable, Fehler zugeben, and um Hilfe bitten. This creates safety for others."
        }
    },
    {
        lessonNumber: "Lektion 2 von 4",
        lessonTitle: "Persönliche Verantwortung",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist a 'trust-building moment'?",
            options: [
                { label: "A) A formal trust exercise", correct: false },
        { label: "B) Any moment where you choose vulnerability over self-protection", correct: true },
        { label: "C) A team building event", correct: false },
        { label: "D) A performance review", correct: false }
            ],
            correctFeedback: "✓ Richtig! Vertrauensbildungsmomente passieren täglich. Jedes Mal, wenn du Verletzlichkeit über Selbstschutz wählst, baust du Vertrauen auf.",
            incorrectFeedback: "Nicht ganz. Vertrauensbildungsmomente passieren täglich. Jedes Mal, wenn du Verletzlichkeit über Selbstschutz wählst, baust du Vertrauen auf."
        }
    },
    {
        lessonNumber: "Lektion 3 von 4",
        lessonTitle: "Innere Arbeit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was solltest du tun, wenn jemand einen Fehler oder eine Schwäche teilt?",
            options: [
                { label: "A) Point out how to vermeiden it next time", correct: false },
        { label: "B) Thank them for their honesty and share your own experience", correct: true },
        { label: "C) Change the subject quickly", correct: false },
        { label: "D) Criticize the mistake", correct: false }
            ],
            correctFeedback: "✓ Richtig! Acknowledge their vulnerability and reciprocate. Thank them for sharing and vonfer your own experience. This builds mutual trust.",
            incorrectFeedback: "Nicht ganz. Acknowledge their vulnerability and reciprocate. Thank them for sharing and vonfer your own experience. This builds mutual trust."
        }
    },
    {
        lessonNumber: "Lektion 4 von 4",
        lessonTitle: "Führung beginnt bei dir",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist 'personal history exercise' designed to do?",
            options: [
                { label: "A) Share work accomplishments", correct: false },
        { label: "B) Help team members understand each other's backgrounds and experiences", correct: true },
        { label: "C) Review performance metrics", correct: false },
        { label: "D) Plan future projects", correct: false }
            ],
            correctFeedback: "✓ Richtig! Die persönliche Historie Übung hilft Teammitgliedern, sich gegenseitig zu verstehen und schafft Empathie und Verbindung, die Vertrauen aufbaut.",
            incorrectFeedback: "Nicht ganz. Die persönliche Historie Übung hilft Teammitgliedern, sich gegenseitig zu verstehen und schafft Empathie und Verbindung, die Vertrauen aufbaut."
        }
    },
    {
        lessonNumber: "Lektion 5 von 4",
        lessonTitle: "Führung beginnt bei dir",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Which von these behaviors destroys trust?",
            options: [
                { label: "A) Admitting mistakes", correct: false },
        { label: "B) Asking for help", correct: false },
        { label: "C) Blaming others for your mistakes", correct: true },
        { label: "D) Sharing personal challenges", correct: false }
            ],
            correctFeedback: "✓ Richtig! Anderen die Schuld zu geben zerstört Vertrauen. Verantwortung zu übernehmen, auch wenn es schwer ist, baut Vertrauen auf. Schuldzuweisungen zerstören es.",
            incorrectFeedback: "Nicht ganz. Anderen die Schuld zu geben zerstört Vertrauen. Verantwortung zu übernehmen, auch wenn es schwer ist, baut Vertrauen auf. Schuldzuweisungen zerstören es."
        }
    },
    {
        lessonNumber: "Lektion 6 von 4",
        lessonTitle: "Führung beginnt bei dir",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was bedeutet 'den ersten Schritt machen' beim Vertrauensaufbau?",
            options: [
                { label: "A) Being the first to speak in meetings", correct: false },
        { label: "B) Being vulnerable before others feel safe to be", correct: true },
        { label: "C) Always leading projects", correct: false },
        { label: "D) Never making mistakes", correct: false }
            ],
            correctFeedback: "✓ Richtig! 'Den ersten Schritt machen' bedeutet, verletzlich zu sein, bevor andere sich sicher fühlen. Du schaffst die Sicherheit, indem du das Verhalten vorlebst, das du sehen möchtest.",
            incorrectFeedback: "Nicht ganz. 'Den ersten Schritt machen' bedeutet, verletzlich zu sein, bevor andere sich sicher fühlen. Du schaffst die Sicherheit, indem du das Verhalten vorlebst, das du sehen möchtest."
        }
    },
    {
        lessonNumber: "Lektion 7 von 4",
        lessonTitle: "Führung beginnt bei dir",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Wie lange dauert es, Vertrauen aufzubauen?",
            options: [
                { label: "A) One team building session", correct: false },
        { label: "B) Months or years von consistent behavior", correct: true },
        { label: "C) A single conversation", correct: false },
        { label: "D) Only during crises", correct: false }
            ],
            correctFeedback: "✓ Richtig! Vertrauen braucht Zeit und Konsistenz. Während du es sofort aufbauen kannst, starkes Vertrauen entwickelt sich über Monate und Jahre von zuverlässigem Verhalten.",
            incorrectFeedback: "Nicht ganz. Vertrauen braucht Zeit und Konsistenz. Während du es sofort aufbauen kannst, starkes Vertrauen entwickelt sich über Monate und Jahre von zuverlässigem Verhalten."
        }
    },
    {
        lessonNumber: "Lektion 8 von 4",
        lessonTitle: "Führung beginnt bei dir",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf selbstführung Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist foundation von all trust-building activities?",
            options: [
                { label: "A) Complex exercises", correct: false },
        { label: "B) Genuine vulnerability and authenticity", correct: true },
        { label: "C) Perfect performance", correct: false },
        { label: "D) vermeidening all mistakes", correct: false }
            ],
            correctFeedback: "✓ Richtig! Alle Vertrauensbildung kommt auf echte Verletzlichkeit und Authentizität an. Keine Übung funktioniert ohne echte, ehrliche menschliche Verbindung.",
            incorrectFeedback: "Nicht ganz. Alle Vertrauensbildung kommt auf echte Verletzlichkeit und Authentizität an. Keine Übung funktioniert ohne echte, ehrliche menschliche Verbindung."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
