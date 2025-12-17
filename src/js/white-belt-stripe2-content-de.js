// ===== WHITE BELT STRIPE 2: PSYCHOLOGISCHE SICHERHEIT (GERMAN) =====
const allChunks = [
    {
        lessonNumber: "Lektion 1 von 4",
        lessonTitle: "Sicherheit schaffen",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist psychologische Sicherheit?",
            options: [
                { label: "A) Feeling physically safe at work", correct: false },
        { label: "B) Die Überzeugung, dass du dich äußern kannst ohne Bestrafung oder Demütigung zu riskieren", correct: true },
        { label: "C) Never making mistakes", correct: false },
        { label: "D) Always agreeing with the team", correct: false }
            ],
            correctFeedback: "✓ Richtig! Psychologische Sicherheit ist die Überzeugung, dass du dich mit Ideen, Fragen, Bedenken oder Fehlern äußern kannst, ohne bestraft oder gedemütigt zu werden.",
            incorrectFeedback: "Nicht ganz. Psychologische Sicherheit ist die Überzeugung, dass du dich mit Ideen, Fragen, Bedenken oder Fehlern äußern kannst, ohne bestraft oder gedemütigt zu werden."
        }
    },
    {
        lessonNumber: "Lektion 2 von 4",
        lessonTitle: "Angst überwinden",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Laut Amy Edmondsons Forschung: Was passiert in psychologisch sicheren Teams?",
            options: [
                { label: "A) Fewer mistakes are made", correct: false },
        { label: "B) More mistakes are reported and learned from", correct: true },
        { label: "C) People work in silence", correct: false },
        { label: "D) Conflict is vermeidened", correct: false }
            ],
            correctFeedback: "✓ Richtig! Paradoxerweise berichten psychologisch sichere Teams über MEHR Fehler, weil sie sich sicher fühlen, sie zuzugeben, was zu besserem Lernen und Prävention führt.",
            incorrectFeedback: "Nicht ganz. Paradoxerweise berichten psychologisch sichere Teams über MEHR Fehler, weil sie sich sicher fühlen, sie zuzugeben, was zu besserem Lernen und Prävention führt."
        }
    },
    {
        lessonNumber: "Lektion 3 von 4",
        lessonTitle: "Team Vertrauen",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist ein Schlüsselverhalten, das psychologische Sicherheit schafft?",
            options: [
                { label: "A) Criticizing mistakes publicly", correct: false },
        { label: "B) Responding to questions with curiosity, not judgment", correct: true },
        { label: "C) Keeping information secret", correct: false },
        { label: "D) Only speaking to senior members", correct: false }
            ],
            correctFeedback: "✓ Richtig! Mit Neugier statt Beurteilung zu reagieren schafft Sicherheit. Wenn jemand eine Frage stellt, behandle sie als Lernmöglichkeit für alle.",
            incorrectFeedback: "Nicht ganz. Mit Neugier statt Beurteilung zu reagieren schafft Sicherheit. Wenn jemand eine Frage stellt, behandle sie als Lernmöglichkeit für alle."
        }
    },
    {
        lessonNumber: "Lektion 4 von 4",
        lessonTitle: "Offene Kommunikation",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was passiert, wenn ein Leader zugibt, etwas nicht zu wissen?",
            options: [
                { label: "A) They lose credibility", correct: false },
        { label: "B) They create psychologische Sicherheit for others", correct: true },
        { label: "C) The team loses confidence", correct: false },
        { label: "D) Nothing changes", correct: false }
            ],
            correctFeedback: "✓ Richtig! Leader, die zugeben, etwas nicht zu wissen, zeigen Verletzlichkeit vor und schaffen psychologische Sicherheit. Das ermutigt andere, dasselbe zu tun.",
            incorrectFeedback: "Nicht ganz. Leader, die zugeben, etwas nicht zu wissen, zeigen Verletzlichkeit vor und schaffen psychologische Sicherheit. Das ermutigt andere, dasselbe zu tun."
        }
    },
    {
        lessonNumber: "Lektion 5 von 4",
        lessonTitle: "Offene Kommunikation",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Welches davon ist ein Zeichen für niedrige psychologische Sicherheit?",
            options: [
                { label: "A) People ask questions freely", correct: false },
        { label: "B) Team members Fehler zugeben openly", correct: false },
        { label: "C) People stay silent in meetings", correct: true },
        { label: "D) Ideas are debated respectfully", correct: false }
            ],
            correctFeedback: "✓ Richtig! Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen.",
            incorrectFeedback: "Nicht ganz. Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen."
        }
    },
    {
        lessonNumber: "Lektion 6 von 4",
        lessonTitle: "Offene Kommunikation",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist die 'Zwei-Sekunden-Regel' zur Schaffung von psychologischer Sicherheit?",
            options: [
                { label: "A) Respond within 2 seconds", correct: false },
        { label: "B) Wait 2 seconds before responding to show you listened", correct: true },
        { label: "C) Speak for only 2 seconds", correct: false },
        { label: "D) Think for 2 seconds before speaking", correct: false }
            ],
            correctFeedback: "✓ Richtig! Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden.",
            incorrectFeedback: "Nicht ganz. Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden."
        }
    },
    {
        lessonNumber: "Lektion 7 von 4",
        lessonTitle: "Offene Kommunikation",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Wie kannst du als Teammitglied psychologische Sicherheit aufbauen?",
            options: [
                { label: "A) Sprich nur, wenn du die Antwort hast", correct: false },
        { label: "B) Ask questions, admit when you don't know, and acknowledge others' contributions", correct: true },
        { label: "C) Stay quiet to vermeiden mistakes", correct: false },
        { label: "D) Only share perfect ideas", correct: false }
            ],
            correctFeedback: "✓ Richtig! Du baust psychologische Sicherheit auf, indem du Verletzlichkeit vorlebst: stelle Fragen, gib zu, wenn du etwas nicht weißt, und erkenne die Beiträge anderer an.",
            incorrectFeedback: "Nicht ganz. Du baust psychologische Sicherheit auf, indem du Verletzlichkeit vorlebst: stelle Fragen, gib zu, wenn du etwas nicht weißt, und erkenne die Beiträge anderer an."
        }
    },
    {
        lessonNumber: "Lektion 8 von 4",
        lessonTitle: "Offene Kommunikation",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf psychologische sicherheit Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Wie ist die Beziehung zwischen psychologischer Sicherheit und Leistung?",
            options: [
                { label: "A) They are unrelated", correct: false },
        { label: "B) High psychologische Sicherheit leads to higher performance", correct: true },
        { label: "C) Safety reduces performance", correct: false },
        { label: "D) Only high performers create safety", correct: false }
            ],
            correctFeedback: "✓ Richtig! Forschung zeigt, dass psychologische Sicherheit ein Schlüsselfaktor für Teamleistung ist. Sichere Teams lernen schneller, innovieren mehr und treffen bessere Entscheidungen.",
            incorrectFeedback: "Nicht ganz. Forschung zeigt, dass psychologische Sicherheit ein Schlüsselfaktor für Teamleistung ist. Sichere Teams lernen schneller, innovieren mehr und treffen bessere Entscheidungen."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
