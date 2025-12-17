// ===== WHITE BELT STRIPE 1: VERTRAUEN GRUNDLAGEN (GERMAN) =====
const allChunks = [
    {
        lessonNumber: "Lektion 1 von 4",
        lessonTitle: "Vertrauensarten",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Laut dem Talent Trends Österreich Report 2025: Wie viel Prozent der Mitarbeiter vertrauen der Führung voll und ganz?",
            options: [
                { label: "A) 31%", correct: false },
        { label: "B) 1%", correct: true },
        { label: "C) 50%", correct: false },
        { label: "D) 10%", correct: false }
            ],
            correctFeedback: "✓ Richtig! Nur 1% der Mitarbeiter vertrauen der Führung voll und ganz—das zeigt die kritische Vertrauenskrise in organizations.",
            incorrectFeedback: "Nicht ganz. Nur 1% der Mitarbeiter vertrauen der Führung voll und ganz—das zeigt die kritische Vertrauenskrise in organizations."
        }
    },
    {
        lessonNumber: "Lektion 2 von 4",
        lessonTitle: "Psychologische Sicherheit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Auf welche Art von Vertrauen fokussiert sich Lencionis Five Dysfunctions Modell?",
            options: [
                { label: "A) Predictability-based trust", correct: false },
        { label: "B) Vulnerability-based trust", correct: true },
        { label: "C) Professionelles Vertrauen", correct: false },
        { label: "D) Competency trust", correct: false }
            ],
            correctFeedback: "✓ Richtig! Verletzlichkeitsbasiertes Vertrauen ist die Grundlage. Es ermöglicht Teammitgliedern, Fehler zuzugeben und um Hilfe zu bitten, ohne Angst zu haben.",
            incorrectFeedback: "Nicht ganz. Verletzlichkeitsbasiertes Vertrauen ist die Grundlage. Es ermöglicht Teammitgliedern, Fehler zuzugeben und um Hilfe zu bitten, ohne Angst zu haben."
        }
    },
    {
        lessonNumber: "Lektion 3 von 4",
        lessonTitle: "Teamdynamik",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Laut Googles Project Aristotle: Was war der #1 Prädiktor für Teamleistung?",
            options: [
                { label: "A) Team member IQ", correct: false },
        { label: "B) Psychological safety", correct: true },
        { label: "C) Jahre der Erfahrung", correct: false },
        { label: "D) Verfügbare Ressourcen", correct: false }
            ],
            correctFeedback: "✓ Richtig! Psychologische Sicherheit war der wichtigste Faktor. Teams, in denen sich Mitglieder sicher fühlen, Risiken einzugehen, übertreffen andere.",
            incorrectFeedback: "Nicht ganz. Psychologische Sicherheit war der wichtigste Faktor. Teams, in denen sich Mitglieder sicher fühlen, Risiken einzugehen, übertreffen andere."
        }
    },
    {
        lessonNumber: "Lektion 4 von 4",
        lessonTitle: "Verletzlichkeit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Im BJJ: Was machen Menschen, die am schnellsten Fortschritte machen?",
            options: [
                { label: "A) Niemals tappen", correct: false },
        { label: "B) Früh tappen und Fragen stellen", correct: true },
        { label: "C) Nur mit niedrigeren Gürteln trainieren", correct: false },
        { label: "D) Schwere Positionen vermeiden", correct: false }
            ],
            correctFeedback: "✓ Richtig! Früh zu tappen und Fragen zu stellen zeigt Verletzlichkeit und beschleunigt das Lernen—genau wie in Teams.",
            incorrectFeedback: "Nicht ganz. Früh zu tappen und Fragen zu stellen zeigt Verletzlichkeit und beschleunigt das Lernen—genau wie in Teams."
        }
    },
    {
        lessonNumber: "Lektion 5 von 4",
        lessonTitle: "Verletzlichkeit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was passiert, wenn Teams verletzlichkeitsbasiertem Vertrauen fehlt?",
            options: [
                { label: "A) Sie arbeiten schneller", correct: false },
        { label: "B) Sie verstecken Schwächen und Fehler", correct: true },
        { label: "C) Sie kommunizieren besser", correct: false },
        { label: "D) Sie innovieren mehr", correct: false }
            ],
            correctFeedback: "✓ Richtig! Ohne verletzlichkeitsbasiertes Vertrauen verstecken Teammitglieder Schwächen und Fehler, was zu schlechten Entscheidungen und künstlicher Harmonie führt.",
            incorrectFeedback: "Nicht ganz. Ohne verletzlichkeitsbasiertes Vertrauen verstecken Teammitglieder Schwächen und Fehler, was zu schlechten Entscheidungen und künstlicher Harmonie führt."
        }
    },
    {
        lessonNumber: "Lektion 6 von 4",
        lessonTitle: "Verletzlichkeit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Welches davon ist ein Zeichen für verletzlichkeitsbasiertes Vertrauen?",
            options: [
                { label: "A) Teammitglieder geben niemals Fehler zu", correct: false },
        { label: "B) Menschen bitten um Hilfe, wenn sie feststecken", correct: true },
        { label: "C) Alle tun so, als wüssten sie alles", correct: false },
        { label: "D) Schwächen werden versteckt", correct: false }
            ],
            correctFeedback: "✓ Richtig! Um Hilfe zu bitten, wenn man feststeckt, zeigt verletzlichkeitsbasiertes Vertrauen. Es zeigt Sicherheit, zuzugeben, dass man etwas nicht weiß.",
            incorrectFeedback: "Nicht ganz. Um Hilfe zu bitten, wenn man feststeckt, zeigt verletzlichkeitsbasiertes Vertrauen. Es zeigt Sicherheit, zuzugeben, dass man etwas nicht weiß."
        }
    },
    {
        lessonNumber: "Lektion 7 von 4",
        lessonTitle: "Verletzlichkeit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Wie ist die Beziehung zwischen Vertrauen und Konflikt in Lencionis Modell?",
            options: [
                { label: "A) Vertrauen verhindert Konflikte", correct: false },
        { label: "B) Vertrauen ermöglicht gesunden Konflikt", correct: true },
        { label: "C) Sie stehen in keinem Zusammenhang", correct: false },
        { label: "D) Konflikt zerstört Vertrauen", correct: false }
            ],
            correctFeedback: "✓ Richtig! Vertrauen ermöglicht gesunden Konflikt. Ohne Vertrauen vermeiden Teams Konflikte (künstliche Harmonie), was tatsächlich eine Dysfunktion ist.",
            incorrectFeedback: "Nicht ganz. Vertrauen ermöglicht gesunden Konflikt. Ohne Vertrauen vermeiden Teams Konflikte (künstliche Harmonie), was tatsächlich eine Dysfunktion ist."
        }
    },
    {
        lessonNumber: "Lektion 8 von 4",
        lessonTitle: "Verletzlichkeit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "In einem Hochvertrauensteam: Was passiert, wenn jemand einen Fehler macht?",
            options: [
                { label: "A) Sie werden sofort gekündigt", correct: false },
        { label: "B) Sie verstecken es vor anderen", correct: false },
        { label: "C) Sie geben es zu und das Team hilft, es zu beheben", correct: true },
        { label: "D) Sie geben jemand anderem die Schuld", correct: false }
            ],
            correctFeedback: "✓ Richtig! In Hochvertrauensteams werden Fehler offen zugegeben und das Team arbeitet zusammen, um sie zu beheben. Das stärkt das Vertrauen.",
            incorrectFeedback: "Nicht ganz. In Hochvertrauensteams werden Fehler offen zugegeben und das Team arbeitet zusammen, um sie zu beheben. Das stärkt das Vertrauen."
        }
    },
    {
        lessonNumber: "Lektion 9 von 4",
        lessonTitle: "Verletzlichkeit",
        content: `<div class="content-section">
    <h3>🎯 Was Sie lernen werden</h3>
    <p>Dieser Abschnitt konzentriert sich auf vertrauen grundlagen Prinzipien und Praktiken.</p>
</div>`,
        question: {
            text: "Was ist der erste Schritt zum Aufbau von verletzlichkeitsbasiertem Vertrauen?",
            options: [
                { label: "A) Warte, dass andere den ersten Schritt machen", correct: false },
        { label: "B) Beginne, indem du deine eigenen Fehler zugibst und um Hilfe bittest", correct: true },
        { label: "C) Vertrauen von deinem Team verlangen", correct: false },
        { label: "D) Nur Menschen vertrauen, die du gut kennst", correct: false }
            ],
            correctFeedback: "✓ Richtig! Vertrauen aufzubauen beginnt mit dir. Gib deine eigenen Fehler zu und bitte zuerst um Hilfe. Das schafft psychologische Sicherheit für andere.",
            incorrectFeedback: "Nicht ganz. Vertrauen aufzubauen beginnt mit dir. Gib deine eigenen Fehler zu und bitte zuerst um Hilfe. Das schafft psychologische Sicherheit für andere."
        }
    },
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allChunks };
}
