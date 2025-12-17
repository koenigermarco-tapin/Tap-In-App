#!/usr/bin/env python3
"""
Translate deep-dive-assessment questions to German
"""

import re

# German translations for all questions and options
TRANSLATIONS = {
    # Q1
    "When facing a major decision with your team, you typically...": "Wenn Sie vor einer wichtigen Entscheidung mit Ihrem Team stehen, tun Sie typischerweise...",
    "Paint a compelling vision and rally everyone around the possibilities": "Malen Sie eine überzeugende Vision und versammeln Sie alle um die Möglichkeiten",
    "Analyze all available data and options before committing to a path": "Analysieren Sie alle verfügbaren Daten und Optionen, bevor Sie sich auf einen Weg festlegen",
    "Consult with team members to understand their perspectives first": "Konsultieren Sie zuerst Teammitglieder, um deren Perspektiven zu verstehen",
    "Make a decisive call quickly and adjust course as you learn more": "Treffen Sie schnell eine entscheidende Entscheidung und passen Sie den Kurs an, wenn Sie mehr erfahren",
    "Decision-Making Styles": "Entscheidungsstile",
    "Research shows that effective leaders adapt their decision-making style to the situation. Vision-driven decisions work best for strategic pivots, data-driven for complex problems, consultative for team buy-in, and decisive for urgent situations.": "Forschung zeigt, dass effektive Führungskräfte ihren Entscheidungsstil an die Situation anpassen. Visionäre Entscheidungen funktionieren am besten bei strategischen Wendepunkten, datengetriebene bei komplexen Problemen, konsultative für Team-Unterstützung und entscheidende bei dringenden Situationen.",
    
    # Q2
    "Your team would say your greatest strength is...": "Ihr Team würde sagen, Ihre größte Stärke ist...",
    "Inspiring them to think bigger and see new possibilities": "Sie zu inspirieren, größer zu denken und neue Möglichkeiten zu sehen",
    "Creating clear systems, processes, and structured approaches": "Klare Systeme, Prozesse und strukturierte Ansätze zu schaffen",
    "Building trust, psychological safety, and strong relationships": "Vertrauen, psychologische Sicherheit und starke Beziehungen aufzubauen",
    "Getting things done efficiently with no excuses or delays": "Dinge effizient zu erledigen, ohne Ausreden oder Verzögerungen",
    "Perceived Strengths": "Wahrgenommene Stärken",
    "Research shows that leaders who are aware of their perceived strengths are 40% more effective. Teams value different strengths: Visionaries inspire innovation, Architects create stability, Facilitators build culture, and Executors deliver results.": "Forschung zeigt, dass Führungskräfte, die sich ihrer wahrgenommenen Stärken bewusst sind, 40% effektiver sind. Teams schätzen verschiedene Stärken: Visionäre inspirieren Innovation, Architekten schaffen Stabilität, Facilitatoren bauen Kultur auf und Executoren liefern Ergebnisse.",
    
    # Q3
    "In team meetings, you're most likely to...": "In Teambesprechungen werden Sie am ehesten...",
    "Challenge the group to think about future opportunities and innovations": "Die Gruppe herausfordern, über zukünftige Möglichkeiten und Innovationen nachzudenken",
    "Ask clarifying questions and ensure we have structured notes and next steps": "Klärende Fragen stellen und sicherstellen, dass wir strukturierte Notizen und nächste Schritte haben",
    "Make sure everyone's voice is heard and people feel included": "Sicherstellen, dass die Stimme jedes Einzelnen gehört wird und sich die Menschen einbezogen fühlen",
    "Push for clear action items, deadlines, and accountable owners": "Auf klare Aktionspunkte, Fristen und verantwortliche Eigentümer drängen",
    "Meeting Leadership Styles": "Meeting-Führungsstile",
    "Effective meetings need all four approaches: Vision (big picture), Structure (organization), Inclusion (participation), and Action (accountability). The best leaders rotate between these based on meeting purpose.": "Effektive Meetings benötigen alle vier Ansätze: Vision (großes Bild), Struktur (Organisation), Einbeziehung (Teilnahme) und Aktion (Verantwortlichkeit). Die besten Führungskräfte wechseln zwischen diesen basierend auf dem Meeting-Zweck.",
    
    # Q4
    "When a project falls behind schedule, your first instinct is to...": "Wenn ein Projekt hinter dem Zeitplan zurückbleibt, ist Ihr erster Instinkt...",
    "Remind everyone of the bigger picture and why this work matters": "Alle an das größere Bild erinnern und daran, warum diese Arbeit wichtig ist",
    "Dig into the data to find the root cause of the delays": "In die Daten eintauchen, um die Grundursache der Verzögerungen zu finden",
    "Have 1:1 conversations to understand what's blocking people": "1:1-Gespräche führen, um zu verstehen, was die Menschen blockiert",
    "Roll up your sleeves and help clear obstacles directly": "Die Ärmel hochkrempeln und direkt helfen, Hindernisse zu beseitigen",
    "Crisis Response Patterns": "Krisenreaktionsmuster",
    "When projects slip, different responses work for different situations: Vision re-energizes demotivated teams, Analysis fixes systemic issues, 1:1s address individual blockers, and Direct action clears immediate obstacles.": "Wenn Projekte ins Rutschen geraten, funktionieren verschiedene Reaktionen für verschiedene Situationen: Vision belebt demotivierte Teams neu, Analyse behebt systemische Probleme, 1:1-Gespräche adressieren individuelle Blockaden und direkte Aktion räumt sofortige Hindernisse aus dem Weg.",
    
    # Q5
    "How do you prefer to tackle challenging work?": "Wie gehen Sie am liebsten an herausfordernde Aufgaben heran?",
    "Intense focused bursts with breaks to recharge between": "Intensive, fokussierte Phasen mit Pausen zum Aufladen dazwischen",
    "Steady, consistent effort spread throughout the day": "Stetige, konsistente Anstrengung über den Tag verteilt",
    "Long sustained sessions where I can go deep for hours": "Lange, anhaltende Sessions, in denen ich stundenlang tief eintauchen kann",
    "Work Rhythm Patterns": "Arbeitsrhythmus-Muster",
    "Understanding your work rhythm is crucial for peak performance. Sprinters excel at high-intensity projects, Joggers maintain steady progress, and Marathoners handle complex, long-term initiatives. The best teams have a mix of all three.": "Das Verstehen Ihres Arbeitsrhythmus ist entscheidend für Spitzenleistung. Sprinter glänzen bei hochintensiven Projekten, Jogger halten stetigen Fortschritt aufrecht und Marathonläufer bewältigen komplexe, langfristige Initiativen. Die besten Teams haben eine Mischung aus allen dreien.",
    
    # Q6
    "When are you typically at your mental best?": "Wann sind Sie typischerweise geistig am besten?",
    "Early morning - I'm sharpest before others are awake": "Frühmorgens - ich bin am schärfsten, bevor andere wach sind",
    "Mid-day - I hit my stride after warming up": "Mittags - ich komme nach dem Aufwärmen in Schwung",
    "Late afternoon/evening - I build momentum throughout the day": "Spätnachmittags/abends - ich baue den ganzen Tag über Schwung auf",
    
    # Q7
    "After completing a major project, you typically...": "Nach Abschluss eines großen Projekts tun Sie typischerweise...",
    "Need significant downtime before diving into the next big thing": "Brauchen eine signifikante Auszeit, bevor Sie sich dem nächsten großen Ding widmen",
    "Take a brief pause then continue at your normal pace": "Machen eine kurze Pause und setzen dann im normalen Tempo fort",
    "Feel energized and ready to start the next challenge immediately": "Fühlen sich energiegeladen und bereit, die nächste Herausforderung sofort zu beginnen",
    
    # Q8
    "When explaining a complex idea, you prefer to...": "Wenn Sie eine komplexe Idee erklären, bevorzugen Sie...",
    "Start with the big picture vision, then fill in details as needed": "Mit der großen Vision beginnen und dann Details nach Bedarf hinzufügen",
    "Present a logical, structured breakdown with clear steps": "Eine logische, strukturierte Aufschlüsselung mit klaren Schritten präsentieren",
    "Use stories and examples that connect emotionally": "Geschichten und Beispiele verwenden, die emotional verbinden",
    "Get straight to the point with actionable takeaways": "Direkt auf den Punkt kommen mit umsetzbaren Erkenntnissen",
    "Communication Styles": "Kommunikationsstile",
    "Effective communication adapts to the audience. Vision-first works for strategic discussions, structured breakdowns for analytical teams, stories for building connection, and direct action items for execution-focused contexts.": "Effektive Kommunikation passt sich an das Publikum an. Vision-first funktioniert für strategische Diskussionen, strukturierte Aufschlüsselungen für analytische Teams, Geschichten für den Aufbau von Verbindungen und direkte Aktionspunkte für ausführungsorientierte Kontexte.",
    
    # Q9
    "In a disagreement with a colleague, you're most likely to...": "Bei einer Meinungsverschiedenheit mit einem Kollegen werden Sie am ehesten...",
    "Focus on the shared vision and find common ground in goals": "Sich auf die gemeinsame Vision konzentrieren und gemeinsame Ziele finden",
    "Present facts and data to support your position logically": "Fakten und Daten präsentieren, um die eigene Position logisch zu untermauern",
    "Seek to understand their perspective before advocating yours": "Versuchen, ihre Perspektive zu verstehen, bevor Sie die eigene vertreten",
    "Propose a quick decision so you can move forward and test it": "Eine schnelle Entscheidung vorschlagen, um voranzukommen und sie zu testen",
    "Conflict Resolution Styles": "Konfliktlösungsstile",
    "Research shows the most effective conflict resolution combines all four: Finding common ground (Visionary), using data (Architect), understanding perspectives (Facilitator), and moving forward (Executor). The best leaders use all four sequentially.": "Forschung zeigt, dass die effektivste Konfliktlösung alle vier kombiniert: Gemeinsamen Nenner finden (Visionär), Daten verwenden (Architekt), Perspektiven verstehen (Facilitator) und vorankommen (Executor). Die besten Führungskräfte verwenden alle vier sequenziell.",
    
    # Q10
    "When giving feedback to a team member, you focus on...": "Wenn Sie einem Teammitglied Feedback geben, konzentrieren Sie sich auf...",
    "How their growth connects to bigger opportunities ahead": "Wie ihr Wachstum mit größeren Chancen in der Zukunft zusammenhängt",
    "Specific behaviors and measurable improvements to make": "Spezifische Verhaltensweisen und messbare Verbesserungen, die vorgenommen werden müssen",
    "Their feelings and ensuring they feel supported in improving": "Ihre Gefühle und sicherstellen, dass sie sich bei der Verbesserung unterstützt fühlen",
    "What they need to do differently starting immediately": "Was sie sofort anders machen müssen",
    "Feedback Effectiveness": "Feedback-Effektivität",
    "The most effective feedback includes all four elements: Future vision (why it matters), Specific behaviors (what to change), Emotional support (how they feel), and Immediate actions (what to do now). Leaders who combine all four see 60% better improvement rates.": "Das effektivste Feedback umfasst alle vier Elemente: Zukunftsvision (warum es wichtig ist), spezifische Verhaltensweisen (was zu ändern ist), emotionale Unterstützung (wie sie sich fühlen) und sofortige Aktionen (was jetzt zu tun ist). Führungskräfte, die alle vier kombinieren, sehen 60% bessere Verbesserungsraten.",
    
    # Q11
    "When facing a high-stakes deadline, you...": "Wenn Sie vor einer wichtigen Frist stehen, tun Sie...",
    "Get energized by the challenge and inspire others to rise up": "Sich von der Herausforderung energetisieren lassen und andere inspirieren, sich zu erheben",
    "Create a detailed plan and systematically execute each step": "Einen detaillierten Plan erstellen und jeden Schritt systematisch ausführen",
    "Check in with the team to make sure everyone is okay": "Sich beim Team erkundigen, ob es allen gut geht",
    "Eliminate distractions and focus purely on getting it done": "Ablenkungen eliminieren und sich rein auf die Erledigung konzentrieren",
    "Pressure Performance": "Leistung unter Druck",
    "High-pressure situations require all four leadership dimensions: Energy and vision (motivation), Systematic planning (efficiency), Team care (sustainability), and Focused execution (results). Teams with leaders who balance all four perform 35% better under pressure.": "Hochdruck-Situationen erfordern alle vier Führungsdimensionen: Energie und Vision (Motivation), systematische Planung (Effizienz), Team-Pflege (Nachhaltigkeit) und fokussierte Ausführung (Ergebnisse). Teams mit Führungskräften, die alle vier ausbalancieren, performen 35% besser unter Druck.",
    
    # Q12
    "Your biggest frustration at work is usually...": "Ihre größte Frustration bei der Arbeit ist normalerweise...",
    "People who can't see beyond today's problems to future possibilities": "Menschen, die über die heutigen Probleme hinaus keine zukünftigen Möglichkeiten sehen können",
    "Chaos, lack of clear processes, and disorganization": "Chaos, Mangel an klaren Prozessen und Desorganisation",
    "Conflict that damages relationships and team morale": "Konflikte, die Beziehungen und Team-Moral schädigen",
    "Endless discussions and meetings with no concrete action": "Endlose Diskussionen und Meetings ohne konkrete Maßnahmen",
    "Frustration Patterns": "Frustrationsmuster",
    "Your frustrations reveal your values. Visionaries get frustrated by short-sightedness, Architects by chaos, Facilitators by relationship damage, and Executors by inaction. Understanding these patterns helps you recognize when to flex your style.": "Ihre Frustrationen offenbaren Ihre Werte. Visionäre werden von Kurzsichtigkeit frustriert, Architekten von Chaos, Facilitatoren von Beziehungsschäden und Executoren von Untätigkeit. Das Verstehen dieser Muster hilft Ihnen zu erkennen, wann Sie Ihren Stil flexibel anpassen sollten.",
    
    # Q13
    "When you're overwhelmed, you cope by...": "Wenn Sie überfordert sind, bewältigen Sie dies, indem Sie...",
    "Zooming out to reconnect with meaning and purpose": "Herauszoomen, um sich wieder mit Sinn und Zweck zu verbinden",
    "Making lists and organizing tasks to regain control": "Listen erstellen und Aufgaben organisieren, um die Kontrolle zurückzugewinnen",
    "Talking it through with someone you trust": "Es mit jemandem besprechen, dem Sie vertrauen",
    "Picking one thing and attacking it to build momentum": "Eine Sache auswählen und sie angehen, um Schwung aufzubauen",
    "Stress Management Strategies": "Stressmanagement-Strategien",
    "Effective stress management uses multiple strategies: Reconnecting with purpose (Visionary), Creating structure (Architect), Seeking support (Facilitator), and Taking action (Executor). Leaders who use all four strategies recover 50% faster from overwhelm.": "Effektives Stressmanagement verwendet mehrere Strategien: Wiederverbindung mit dem Zweck (Visionär), Struktur schaffen (Architekt), Unterstützung suchen (Facilitator) und Maßnahmen ergreifen (Executor). Führungskräfte, die alle vier Strategien verwenden, erholen sich 50% schneller von Überforderung.",
    
    # Q14
    "You feel most energized when...": "Sie fühlen sich am energiegeladensten, wenn...",
    "Brainstorming new ideas and imagining what could be possible": "Neue Ideen brainstormen und sich vorstellen, was möglich sein könnte",
    "Solving complex problems with elegant, systematic solutions": "Komplexe Probleme mit eleganten, systematischen Lösungen lösen",
    "Helping someone have a breakthrough or develop new skills": "Jemandem helfen, einen Durchbruch zu erzielen oder neue Fähigkeiten zu entwickeln",
    "Crossing major items off your list and seeing tangible progress": "Wichtige Punkte von der Liste streichen und greifbaren Fortschritt sehen",
    "Energy Sources": "Energiequellen",
    "Understanding what energizes you helps you structure your day for peak performance. Visionaries need creative time, Architects need problem-solving challenges, Facilitators need people interactions, and Executors need clear wins and progress.": "Das Verstehen, was Sie energetisiert, hilft Ihnen, Ihren Tag für Spitzenleistung zu strukturieren. Visionäre brauchen kreative Zeit, Architekten brauchen Problemlösungs-Herausforderungen, Facilitatoren brauchen Menschen-Interaktionen und Executoren brauchen klare Erfolge und Fortschritt.",
    
    # Q15
    "What drives you most in your leadership role?": "Was treibt Sie am meisten in Ihrer Führungsrolle an?",
    "Creating something meaningful that outlasts me": "Etwas Sinnvolles schaffen, das mich überdauert",
    "Building systems that work efficiently and scale": "Systeme aufbauen, die effizient funktionieren und skalieren",
    "Developing people and watching them grow": "Menschen entwickeln und ihnen beim Wachsen zusehen",
    "Achieving results and hitting ambitious targets": "Ergebnisse erzielen und ehrgeizige Ziele erreichen",
    "Core Motivation": "Kernmotivation",
    "Understanding your core motivation helps you align your work with what truly energizes you. Visionaries are driven by legacy, Architects by systems, Facilitators by people development, and Executors by results. The most effective leaders integrate all four.": "Das Verstehen Ihrer Kernmotivation hilft Ihnen, Ihre Arbeit mit dem auszurichten, was Sie wirklich energetisiert. Visionäre werden von Vermächtnis angetrieben, Architekten von Systemen, Facilitatoren von Menschenentwicklung und Executoren von Ergebnissen. Die effektivsten Führungskräfte integrieren alle vier.",
}

def translate_file(filepath):
    """Translate questions in German assessment file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Translate each English string to German
    for en, de in TRANSLATIONS.items():
        # Simple string replacement for common patterns
        content = content.replace(f'text: "{en}"', f'text: "{de}"')
        content = content.replace(f"text: '{en}'", f"text: '{de}'")
        content = content.replace(f'content: "{en}"', f'content: "{de}"')
        content = content.replace(f"content: '{en}'", f"content: '{de}'")
        content = content.replace(f'title: "{en}"', f'title: "{de}"')
        content = content.replace(f"title: '{en}'", f"title: '{de}'")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Translated {filepath}")
        return True
    else:
        print(f"⚠️  No changes needed in {filepath}")
        return False

if __name__ == '__main__':
    translate_file('src/pages/assessments/deep-dive-assessment-de.html')
    print("✅ Translation complete!")

