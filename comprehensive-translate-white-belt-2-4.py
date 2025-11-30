#!/usr/bin/env python3
"""
COMPREHENSIVE German Translation for White Belt Stripes 2-4
Systematic translation of quiz, UI, and JavaScript strings
"""

import re
from pathlib import Path

def comprehensive_translate_file(filepath: Path, stripe_num: int):
    """Comprehensively translate a stripe file"""
    
    if not filepath.exists():
        return {'status': 'error', 'reason': 'File not found'}
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {'status': 'error', 'reason': f'Read error: {e}'}
    
    original = content
    changes = 0
    
    # 1. Quiz Section Header
    content = re.sub(r'Test Your Knowledge', 'Teste Dein Wissen', content)
    content = re.sub(
        r"Complete this quiz to validate your understanding of this stripe's content\.",
        "Schließe dieses Quiz ab, um dein Verständnis zu überprüfen.",
        content
    )
    
    # 2. Question Headers: "Question X of 10" -> "Frage X von 10"
    content = re.sub(r'<h3>Question (\d+) of 10</h3>', r'<h3>Frage \1 von 10</h3>', content)
    
    # 3. Quiz Completion Messages
    content = re.sub(r'Quiz Complete! 🎉', 'Quiz abgeschlossen! 🎉', content)
    content = re.sub(r'You scored:', 'Deine Punktzahl:', content)
    content = re.sub(r'\+50 XP awarded!', '+50 XP verdient!', content)
    content = re.sub(r'Continue', 'Weiter', content, count=1)
    
    # 4. UI Elements (common)
    ui_replacements = {
        'Lessons Completed': 'Lektionen abgeschlossen',
        'Mark Complete': 'Als abgeschlossen markieren',
        'Complete Lesson': 'Lektion abschließen',
        'Next Lesson': 'Nächste Lektion',
        'Back to Learning Hub': 'Zurück zum Learning Hub',
        'Back to White Belt Hub': 'Zurück zum White Belt Hub',
        'Lesson Complete!': 'Lektion abgeschlossen!',
    }
    for en, de in ui_replacements.items():
        if en in content:
            content = content.replace(en, de)
            changes += 1
    
    # 5. JavaScript Strings
    js_replacements = {
        "Already Complete!": "Bereits abgeschlossen!",
        "You completed this lesson already": "Du hast diese Lektion bereits abgeschlossen",
        "Lesson Complete!": "Lektion abgeschlossen!",
        "You're building vulnerability mastery": "Du baust Vertrauens-Meisterschaft auf",
        "You're building team trust mastery": "Du baust Teamvertrauen-Meisterschaft auf",
        "You're ready for White Belt mastery!": "Du bist bereit für White Belt Meisterschaft!",
        "All White Belt stripes earned! Ready for assessment!": "Alle White Belt Streifen verdient! Bereit für die Prüfung!",
    }
    for en, de in js_replacements.items():
        if en in content:
            content = content.replace(en, de)
            changes += 1
    
    # 6. Fix links to -de.html
    def fix_link(match):
        url = match.group(1)
        if url.startswith('http') or '-de.html' in url or url.startswith('#'):
            return match.group(0)
        if url.endswith('.html') and not url.endswith('-de.html'):
            return f'href="{url.replace(".html", "-de.html")}"'
        return match.group(0)
    
    new_content = re.sub(r'href="([^"]+\.html)"', fix_link, content)
    if new_content != content:
        content = new_content
        changes += 1
    
    # 7. Ensure lang="de"
    if '<html' in content and 'lang="de"' not in content:
        content = re.sub(r'(<html[^>]*)(>)', r'\1 lang="de"\2', content, count=1)
        changes += 1
    
    # Now do stripe-specific quiz translations
    if stripe_num == 2:
        # Stripe 2 quiz translations
        quiz2 = {
            'What is psychological safety?': 'Was ist psychologische Sicherheit?',
            'A) Feeling physically safe at work': 'A) Sich physisch sicher bei der Arbeit fühlen',
            'B) Believing you can speak up without risk of punishment or humiliation': 'B) Der Glaube, dass du dich äußern kannst, ohne Gefahr von Bestrafung oder Demütigung',
            'C) Never making mistakes': 'C) Niemals Fehler machen',
            "D) Always agreeing with the team": "D) Immer mit dem Team übereinstimmen",
            "According to Amy Edmondson's research, what happens in psychologically safe teams?": "Laut Amy Edmondsons Forschung: Was passiert in psychologisch sicheren Teams?",
            'A) Fewer mistakes are made': 'A) Es werden weniger Fehler gemacht',
            'B) More mistakes are reported and learned from': 'B) Mehr Fehler werden gemeldet und daraus gelernt',
            'C) People work in silence': 'C) Menschen arbeiten schweigend',
            'D) Conflict is avoided': 'D) Konflikte werden vermieden',
            "True or False: Psychological safety means everyone always agrees and there's no conflict.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass alle immer übereinstimmen und es keine Konflikte gibt.",
            'A) True': 'A) Wahr',
            'B) False': 'B) Falsch',
            'What is a key behavior that creates psychological safety?': 'Was ist ein Schlüsselverhalten, das psychologische Sicherheit schafft?',
            'A) Criticizing mistakes publicly': 'A) Fehler öffentlich kritisieren',
            'B) Responding to questions with curiosity, not judgment': 'B) Auf Fragen mit Neugier statt Beurteilung reagieren',
            'C) Keeping information secret': 'C) Informationen geheim halten',
            'D) Only speaking to senior members': 'D) Nur mit leitenden Mitgliedern sprechen',
            "What happens when a leader admits they don't know something?": "Was passiert, wenn ein Leader zugibt, etwas nicht zu wissen?",
            'A) They lose credibility': 'A) Sie verlieren Glaubwürdigkeit',
            'B) They create psychological safety for others': 'B) Sie schaffen psychologische Sicherheit für andere',
            'C) The team loses confidence': 'C) Das Team verliert Vertrauen',
            'D) Nothing changes': 'D) Nichts ändert sich',
            'Which of these is a sign of low psychological safety?': 'Welches davon ist ein Zeichen für niedrige psychologische Sicherheit?',
            'A) People ask questions freely': 'A) Menschen stellen Fragen frei',
            'B) Team members admit mistakes openly': 'B) Teammitglieder geben Fehler offen zu',
            'C) People stay silent in meetings': 'C) Menschen bleiben in Meetings schweigsam',
            'D) Ideas are debated respectfully': 'D) Ideen werden respektvoll diskutiert',
            "What is the 'two-second rule' for creating psychological safety?": "Was ist die 'Zwei-Sekunden-Regel' zur Schaffung von psychologischer Sicherheit?",
            'A) Respond within 2 seconds': 'A) Innerhalb von 2 Sekunden antworten',
            'B) Wait 2 seconds before responding to show you listened': 'B) 2 Sekunden warten, bevor du antwortest, um zu zeigen, dass du zugehört hast',
            'C) Speak for only 2 seconds': 'C) Nur 2 Sekunden lang sprechen',
            'D) Think for 2 seconds before speaking': 'D) 2 Sekunden nachdenken, bevor du sprichst',
            'How can you build psychological safety as a team member?': 'Wie kannst du als Teammitglied psychologische Sicherheit aufbauen?',
            'A) Only speak when you have the answer': 'A) Nur sprechen, wenn du die Antwort hast',
            "B) Ask questions, admit when you don't know, and acknowledge others' contributions": "B) Fragen stellen, zugeben, wenn du etwas nicht weißt, und die Beiträge anderer anerkennen",
            'C) Stay quiet to avoid mistakes': 'C) Ruhig bleiben, um Fehler zu vermeiden',
            "D) Only share perfect ideas": "D) Nur perfekte Ideen teilen",
            'What is the relationship between psychological safety and performance?': 'Wie ist die Beziehung zwischen psychologischer Sicherheit und Leistung?',
            'A) They are unrelated': 'A) Sie stehen in keinem Zusammenhang',
            'B) High psychological safety leads to higher performance': 'B) Hohe psychologische Sicherheit führt zu höherer Leistung',
            'C) Safety reduces performance': 'C) Sicherheit reduziert die Leistung',
            "D) Only high performers create safety": "D) Nur Hochleistende schaffen Sicherheit",
            "True or False: Psychological safety means there are no consequences for poor performance.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass es keine Konsequenzen für schlechte Leistung gibt.",
            # Explanations
            "Psychological safety is the belief that you can speak up with ideas, questions, concerns, or mistakes without being punished or humiliated.": "Psychologische Sicherheit ist die Überzeugung, dass du dich mit Ideen, Fragen, Bedenken oder Fehlern äußern kannst, ohne bestraft oder gedemütigt zu werden.",
            "Paradoxically, psychologically safe teams report MORE mistakes because they feel safe to admit them, leading to better learning and prevention.": "Paradoxerweise berichten psychologisch sichere Teams über MEHR Fehler, weil sie sich sicher fühlen, sie zuzugeben, was zu besserem Lernen und Prävention führt.",
            "False! Psychological safety enables healthy conflict and debate. It's about feeling safe to disagree, not avoiding disagreement.": "Falsch! Psychologische Sicherheit ermöglicht gesunden Konflikt und Debatte. Es geht darum, sich sicher zu fühlen zu widersprechen, nicht darum, Uneinigkeit zu vermeiden.",
            "Responding with curiosity instead of judgment creates safety. When someone asks a question, treat it as a learning opportunity for everyone.": "Mit Neugier statt Beurteilung zu reagieren schafft Sicherheit. Wenn jemand eine Frage stellt, behandle sie als Lernmöglichkeit für alle.",
            "Leaders who admit they don't know something model vulnerability and create psychological safety. This encourages others to do the same.": "Leader, die zugeben, etwas nicht zu wissen, zeigen Verletzlichkeit vor und schaffen psychologische Sicherheit. Das ermutigt andere, dasselbe zu tun.",
            "Silence in meetings is a red flag. In psychologically safe teams, people speak up with questions, concerns, and ideas.": "Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen.",
            "The two-second rule: When someone speaks, wait 2 seconds before responding. This shows you're listening and considering their input, not just waiting to talk.": "Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden.",
            "You build psychological safety by modeling vulnerability: ask questions, admit when you don't know, and acknowledge others' contributions.": "Du baust psychologische Sicherheit auf, indem du Verletzlichkeit vorlebst: stelle Fragen, gib zu, wenn du etwas nicht weißt, und erkenne die Beiträge anderer an.",
            "Research shows psychological safety is a key driver of team performance. Safe teams learn faster, innovate more, and make better decisions.": "Forschung zeigt, dass psychologische Sicherheit ein Schlüsselfaktor für Teamleistung ist. Sichere Teams lernen schneller, innovieren mehr und treffen bessere Entscheidungen.",
            "False! Psychological safety is about interpersonal risk, not performance standards. You can have high standards AND psychological safety.": "Falsch! Psychologische Sicherheit geht um zwischenmenschliches Risiko, nicht um Leistungsstandards. Du kannst hohe Standards UND psychologische Sicherheit haben.",
        }
        
        for en, de in quiz2.items():
            # Replace in question text
            if f'<p class="question-text">{en}</p>' in content:
                content = content.replace(f'<p class="question-text">{en}</p>', f'<p class="question-text">{de}</p>')
                changes += 1
            # Replace in button text
            if f'>{en}</button>' in content:
                content = content.replace(f'>{en}</button>', f'>{de}</button>')
                changes += 1
            # Replace in data-explanation
            de_escaped = de.replace('"', '&quot;')
            if f'data-explanation="{en}"' in content:
                content = content.replace(f'data-explanation="{en}"', f'data-explanation="{de_escaped}"')
                changes += 1
            elif 'data-explanation="' + en + '"' in content:
                content = content.replace('data-explanation="' + en + '"', 'data-explanation="' + de_escaped + '"')
                changes += 1
    
    elif stripe_num == 3:
        # Stripe 3 quiz translations
        quiz3 = {
            'What is the most effective way to build trust quickly?': 'Was ist der effektivste Weg, um schnell Vertrauen aufzubauen?',
            'A) Demand trust from others': 'A) Vertrauen von anderen verlangen',
            'B) Start by being vulnerable yourself': 'B) Beginne damit, selbst verletzlich zu sein',
            'C) Wait for others to trust you first': 'C) Warte, dass andere dir zuerst vertrauen',
            'D) Only trust people you already know': 'D) Nur Menschen vertrauen, die du schon kennst',
            "What is a 'trust-building moment'?": "Was ist ein 'Vertrauensbildungsmoment'?",
            'A) A formal trust exercise': 'A) Eine formale Vertrauensübung',
            'B) Any moment where you choose vulnerability over self-protection': 'B) Jeder Moment, in dem du Verletzlichkeit über Selbstschutz wählst',
            'C) A team building event': 'C) Ein Teambuilding-Event',
            'D) A performance review': 'D) Eine Leistungsbeurteilung',
            'True or False: Trust is built through grand gestures and big moments.': 'Wahr oder Falsch: Vertrauen wird durch große Gesten und große Momente aufgebaut.',
            'What should you do when someone shares a mistake or weakness?': 'Was solltest du tun, wenn jemand einen Fehler oder eine Schwäche teilt?',
            'A) Point out how to avoid it next time': 'A) Hinweisen, wie man es beim nächsten Mal vermeidet',
            'B) Thank them for their honesty and share your own experience': 'B) Ihnen für ihre Ehrlichkeit danken und deine eigene Erfahrung teilen',
            'C) Change the subject quickly': 'C) Schnell das Thema wechseln',
            'D) Criticize the mistake': 'D) Den Fehler kritisieren',
            "What is the 'personal history exercise' designed to do?": "Wozu dient die 'Persönliche Historie Übung'?",
            'A) Share work accomplishments': 'A) Arbeitsleistungen teilen',
            "B) Help team members understand each other's backgrounds and experiences": "B) Teammitgliedern helfen, sich gegenseitig zu verstehen",
            'C) Review performance metrics': 'C) Leistungsmetriken überprüfen',
            'D) Plan future projects': 'D) Zukünftige Projekte planen',
            'Which of these behaviors destroys trust?': 'Welches dieser Verhaltensweisen zerstört Vertrauen?',
            'A) Admitting mistakes': 'A) Fehler zugeben',
            'B) Asking for help': 'B) Um Hilfe bitten',
            "C) Blaming others for your mistakes": "C) Anderen die Schuld für deine Fehler geben",
            'D) Sharing personal challenges': 'D) Persönliche Herausforderungen teilen',
            "What does 'going first' mean in trust building?": "Was bedeutet 'den ersten Schritt machen' beim Vertrauensaufbau?",
            "A) Being the first to speak in meetings": "A) Als Erster in Meetings sprechen",
            'B) Being vulnerable before others feel safe to be': 'B) Verletzlich sein, bevor andere sich sicher fühlen',
            'C) Always leading projects': 'C) Immer Projekte leiten',
            "D) Never making mistakes": "D) Niemals Fehler machen",
            'How long does it take to build trust?': 'Wie lange dauert es, Vertrauen aufzubauen?',
            'A) One team building session': 'A) Eine Teambuilding-Sitzung',
            'B) Months or years of consistent behavior': 'B) Monate oder Jahre konsistenten Verhaltens',
            'C) A single conversation': 'C) Ein einziges Gespräch',
            "D) Only during crises": "D) Nur in Krisen",
            "True or False: Trust can be rebuilt after it's been broken.": "Wahr oder Falsch: Vertrauen kann wiederaufgebaut werden, nachdem es gebrochen wurde.",
            'What is the foundation of all trust-building activities?': 'Was ist die Grundlage aller Vertrauensbildungsaktivitäten?',
            'A) Complex exercises': 'A) Komplexe Übungen',
            'B) Genuine vulnerability and authenticity': 'B) Echte Verletzlichkeit und Authentizität',
            'C) Perfect performance': 'C) Perfekte Leistung',
            'D) Avoiding all mistakes': 'D) Alle Fehler vermeiden',
            # Explanations
            "The fastest way to build trust is to go first. Be vulnerable, admit mistakes, and ask for help. This creates safety for others.": "Der schnellste Weg, Vertrauen aufzubauen, ist, den ersten Schritt zu machen. Sei verletzlich, gib Fehler zu und bitte um Hilfe. Das schafft Sicherheit für andere.",
            "Trust-building moments happen daily. Every time you choose vulnerability over self-protection, you build trust.": "Vertrauensbildungsmomente passieren täglich. Jedes Mal, wenn du Verletzlichkeit über Selbstschutz wählst, baust du Vertrauen auf.",
            "False! Trust is built through small, consistent actions over time. Daily vulnerability compounds into strong trust.": "Falsch! Vertrauen wird durch kleine, konsistente Handlungen über die Zeit aufgebaut. Tägliche Verletzlichkeit führt zu starkem Vertrauen.",
            "Acknowledge their vulnerability and reciprocate. Thank them for sharing and offer your own experience. This builds mutual trust.": "Erkenne ihre Verletzlichkeit an und gib zurück. Danke ihnen fürs Teilen und biete deine eigene Erfahrung an. Das baut gegenseitiges Vertrauen auf.",
            "The personal history exercise helps team members understand each other's backgrounds, creating empathy and connection that builds trust.": "Die persönliche Historie Übung hilft Teammitgliedern, sich gegenseitig zu verstehen und schafft Empathie und Verbindung, die Vertrauen aufbaut.",
            "Blaming others destroys trust. Taking responsibility, even when it's hard, builds trust. Blame erodes it.": "Anderen die Schuld zu geben zerstört Vertrauen. Verantwortung zu übernehmen, auch wenn es schwer ist, baut Vertrauen auf. Schuldzuweisungen zerstören es.",
            "'Going first' means being vulnerable before others feel safe. You create the safety by modeling the behavior you want to see.": "'Den ersten Schritt machen' bedeutet, verletzlich zu sein, bevor andere sich sicher fühlen. Du schaffst die Sicherheit, indem du das Verhalten vorlebst, das du sehen möchtest.",
            "Trust takes time and consistency. While you can start building it immediately, strong trust develops over months and years of reliable behavior.": "Vertrauen braucht Zeit und Konsistenz. Während du sofort anfangen kannst, es aufzubauen, entwickelt sich starkes Vertrauen über Monate und Jahre zuverlässigen Verhaltens.",
            "True, but it's harder. Rebuilding trust requires consistent vulnerability, transparency, and reliability over time. It's possible but takes work.": "Wahr, aber es ist schwerer. Vertrauen wiederaufzubauen erfordert konsistente Verletzlichkeit, Transparenz und Zuverlässigkeit über die Zeit. Es ist möglich, aber erfordert Arbeit.",
            "All trust-building comes down to genuine vulnerability and authenticity. No exercise works without real, honest human connection.": "Alle Vertrauensbildung kommt auf echte Verletzlichkeit und Authentizität an. Keine Übung funktioniert ohne echte, ehrliche menschliche Verbindung.",
        }
        
        for en, de in quiz3.items():
            if f'<p class="question-text">{en}</p>' in content:
                content = content.replace(f'<p class="question-text">{en}</p>', f'<p class="question-text">{de}</p>')
                changes += 1
            if f'>{en}</button>' in content:
                content = content.replace(f'>{en}</button>', f'>{de}</button>')
                changes += 1
            de_escaped = de.replace('"', '&quot;')
            if f'data-explanation="{en}"' in content:
                content = content.replace(f'data-explanation="{en}"', f'data-explanation="{de_escaped}"')
                changes += 1
            elif 'data-explanation="' + en + '"' in content:
                content = content.replace('data-explanation="' + en + '"', 'data-explanation="' + de_escaped + '"')
                changes += 1
    
    elif stripe_num == 4:
        # Stripe 4 quiz translations  
        quiz4 = {
            'What is the relationship between trust and team speed?': 'Wie ist die Beziehung zwischen Vertrauen und Teamgeschwindigkeit?',
            'A) Trust slows teams down': 'A) Vertrauen verlangsamt Teams',
            "B) High trust teams move faster because they don't waste energy on politics": 'B) Hochvertrauensteams bewegen sich schneller, weil sie keine Energie auf Politik verschwenden',
            'C) Trust has no impact on speed': 'C) Vertrauen hat keinen Einfluss auf Geschwindigkeit',
            "D) Only fast teams can build trust": "D) Nur schnelle Teams können Vertrauen aufbauen",
            'What happens when trust is low in a team?': 'Was passiert, wenn Vertrauen in einem Team niedrig ist?',
            'A) Teams work more efficiently': 'A) Teams arbeiten effizienter',
            'B) Energy is wasted on politics, second-guessing, and self-protection': 'B) Energie wird auf Politik, Zweifeln und Selbstschutz verschwendet',
            'C) Communication improves': 'C) Kommunikation verbessert sich',
            'D) Innovation increases': 'D) Innovation steigt',
            "True or False: Trust is a 'nice to have' but not essential for high performance.": "Wahr oder Falsch: Vertrauen ist 'schön zu haben', aber nicht wesentlich für hohe Leistung.",
            'What should you do if you notice trust is low in your team?': 'Was solltest du tun, wenn du merkst, dass Vertrauen in deinem Team niedrig ist?',
            "A) Wait for someone else to fix it": "A) Warten, dass jemand anderes es behebt",
            'B) Start by being vulnerable yourself': 'B) Beginne damit, selbst verletzlich zu sein',
            "C) Demand that others trust you": "C) Verlangen, dass andere dir vertrauen",
            "D) Ignore it and focus on work": "D) Es ignorieren und sich auf die Arbeit konzentrieren",
            'How does trust impact decision-making?': 'Wie beeinflusst Vertrauen die Entscheidungsfindung?',
            'A) Trust has no impact': 'A) Vertrauen hat keinen Einfluss',
            'B) High trust enables faster, better decisions because people share information freely': 'B) Hohes Vertrauen ermöglicht schnellere, bessere Entscheidungen, weil Menschen Informationen frei teilen',
            'C) Trust slows decisions down': 'C) Vertrauen verlangsamt Entscheidungen',
            "D) Only leaders make decisions in high-trust teams": "D) Nur Leader treffen Entscheidungen in Hochvertrauensteams",
            "What is a 'trust audit'?": "Was ist ein 'Vertrauensaudit'?",
            'A) A formal assessment of trust levels': 'A) Eine formale Bewertung der Vertrauensniveaus',
            'B) A review of financial records': 'B) Eine Überprüfung der Finanzunterlagen',
            'C) A performance evaluation': 'C) Eine Leistungsbeurteilung',
            'D) A team building exercise': 'D) Eine Teambuilding-Übung',
            'Which of these is a sign of high trust?': 'Welches davon ist ein Zeichen für hohes Vertrauen?',
            'A) People hide mistakes': 'A) Menschen verstecken Fehler',
            'B) Team members ask for help freely': 'B) Teammitglieder bitten frei um Hilfe',
            'C) Information is hoarded': 'C) Informationen werden gehortet',
            'D) People avoid difficult conversations': 'D) Menschen vermeiden schwierige Gespräche',
            'What role does the leader play in building trust?': 'Welche Rolle spielt der Leader beim Aufbau von Vertrauen?',
            "A) Wait for the team to build trust first": "A) Warten, dass das Team zuerst Vertrauen aufbaut",
            'B) Model vulnerability and transparency to create safety': 'B) Verletzlichkeit und Transparenz vorleben, um Sicherheit zu schaffen',
            "C) Demand trust from team members": "C) Vertrauen von Teammitgliedern verlangen",
            "D) Trust develops naturally without leader involvement": "D) Vertrauen entwickelt sich natürlich ohne Leader-Beteiligung",
            "True or False: You can measure trust directly through surveys.": "Wahr oder Falsch: Du kannst Vertrauen direkt durch Umfragen messen.",
            'What is the ultimate outcome of building vulnerability-based trust?': 'Was ist das ultimative Ergebnis des Aufbaus von verletzlichkeitsbasiertem Vertrauen?',
            'What is the ultimate test of trust in a team?': 'Was ist der ultimative Test von Vertrauen in einem Team?',
            'A) How well they perform in good times': 'A) Wie gut sie in guten Zeiten performen',
            'B) How they handle mistakes, conflicts, and difficult situations': 'B) Wie sie mit Fehlern, Konflikten und schwierigen Situationen umgehen',
            'C) How many projects they complete': 'C) Wie viele Projekte sie abschließen',
            'D) How often they agree': 'D) Wie oft sie übereinstimmen',
            'A) They can delegate trust-building': 'A) Sie können Vertrauensaufbau delegieren',
            'B) They must model vulnerability first': 'B) Sie müssen zuerst Verletzlichkeit vorleben',
            'C) They should demand trust': 'C) Sie sollten Vertrauen verlangen',
            'D) They can ignore trust issues': 'D) Sie können Vertrauensprobleme ignorieren',
            'True or False: Once trust is built, it never needs maintenance.': 'Wahr oder Falsch: Einmal aufgebaut, braucht Vertrauen nie Wartung.',
            # Explanations
            "High-trust teams move faster. They don't waste time on politics, second-guessing, or covering mistakes. Trust = speed.": "Hochvertrauensteams bewegen sich schneller. Sie verschwenden keine Zeit mit Politik, Zweifeln oder dem Verdecken von Fehlern. Vertrauen = Geschwindigkeit.",
            "Low trust wastes energy. Team members spend time on politics, protecting themselves, and second-guessing instead of productive work.": "Niedriges Vertrauen verschwendet Energie. Teammitglieder verbringen Zeit mit Politik, Selbstschutz und Zweifeln statt produktiver Arbeit.",
            "False! Trust is essential, not optional. It's the foundation of the entire Lencioni pyramid. Without it, teams cannot function at a high level.": "Falsch! Vertrauen ist wesentlich, nicht optional. Es ist die Grundlage der gesamten Lencioni-Pyramide. Ohne es können Teams nicht auf hohem Niveau funktionieren.",
            "Start by being vulnerable yourself. You can't force others to trust, but you can model the behavior and create safety for others to follow.": "Beginne damit, selbst verletzlich zu sein. Du kannst andere nicht zwingen zu vertrauen, aber du kannst das Verhalten vorleben und Sicherheit für andere schaffen, um zu folgen.",
            "In high-trust teams, people share information freely, leading to better-informed and faster decisions. Low trust leads to information hoarding.": "In Hochvertrauensteams teilen Menschen Informationen frei, was zu besser informierten und schnelleren Entscheidungen führt. Niedriges Vertrauen führt zu Informationshortung.",
            "A trust audit is an honest assessment of trust levels in your team. It helps identify where trust is strong and where it needs work.": "Ein Vertrauensaudit ist eine ehrliche Bewertung der Vertrauensniveaus in deinem Team. Es hilft zu identifizieren, wo Vertrauen stark ist und wo es Arbeit braucht.",
            "In high-trust teams, people ask for help freely. They don't fear judgment or punishment for not knowing something.": "In Hochvertrauensteams bitten Menschen frei um Hilfe. Sie fürchten keine Beurteilung oder Bestrafung dafür, etwas nicht zu wissen.",
            "Leaders must go first. By modeling vulnerability and transparency, leaders create the safety that allows trust to flourish throughout the team.": "Leader müssen den ersten Schritt machen. Indem sie Verletzlichkeit und Transparenz vorleben, schaffen Leader die Sicherheit, die es ermöglicht, dass Vertrauen im gesamten Team gedeiht.",
            "True, but be careful. Trust surveys can help, but observable behaviors (silence, defensiveness, information hoarding) are often more reliable indicators.": "Wahr, aber sei vorsichtig. Vertrauensumfragen können helfen, aber beobachtbare Verhaltensweisen (Schweigen, Defensivität, Informationshortung) sind oft zuverlässigere Indikatoren.",
            "Teams with strong vulnerability-based trust move faster, make better decisions, innovate more, and achieve higher results because they're not wasting energy on self-protection.": "Teams mit starkem verletzlichkeitsbasiertem Vertrauen bewegen sich schneller, treffen bessere Entscheidungen, innovieren mehr und erreichen höhere Ergebnisse, weil sie keine Energie auf Selbstschutz verschwenden.",
            "Trust is tested in difficult moments. How a team handles mistakes, conflicts, and crises reveals the true level of trust.": "Vertrauen wird in schwierigen Momenten getestet. Wie ein Team mit Fehlern, Konflikten und Krisen umgeht, zeigt das wahre Vertrauensniveau.",
            "False! Trust requires ongoing maintenance. It's built through consistent daily actions and can be eroded by a single betrayal if not addressed.": "Falsch! Vertrauen erfordert laufende Wartung. Es wird durch konsistente tägliche Handlungen aufgebaut und kann durch einen einzigen Verrat erodiert werden, wenn es nicht angesprochen wird.",
            "Leaders must go first. They set the tone by modeling vulnerability. If leaders don't trust, the team won't either.": "Leader müssen den ersten Schritt machen. Sie setzen den Ton, indem sie Verletzlichkeit vorleben. Wenn Leader nicht vertrauen, tut es das Team auch nicht.",
        }
        
        for en, de in quiz4.items():
            if f'<p class="question-text">{en}</p>' in content:
                content = content.replace(f'<p class="question-text">{en}</p>', f'<p class="question-text">{de}</p>')
                changes += 1
            if f'>{en}</button>' in content:
                content = content.replace(f'>{en}</button>', f'>{de}</button>')
                changes += 1
            de_escaped = de.replace('"', '&quot;')
            if f'data-explanation="{en}"' in content:
                content = content.replace(f'data-explanation="{en}"', f'data-explanation="{de_escaped}"')
                changes += 1
            elif 'data-explanation="' + en + '"' in content:
                content = content.replace('data-explanation="' + en + '"', 'data-explanation="' + de_escaped + '"')
                changes += 1
    
    # Write back if changed
    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return {'status': 'updated', 'changes': changes}
        except Exception as e:
            return {'status': 'error', 'reason': f'Write error: {e}'}
    
    return {'status': 'no_changes', 'changes': 0}

def main():
    """Main translation process"""
    print("🇩🇪 URGENT: COMPREHENSIVE GERMAN TRANSLATIONS - WHITE BELT STRIPES 2-4")
    print("=" * 70)
    
    files = [
        (2, 'white-belt-stripe2-gamified-de.html', 'STRIPE 2'),
        (3, 'white-belt-stripe3-gamified-de.html', 'STRIPE 3'),
        (4, 'white-belt-stripe4-gamified-de.html', 'STRIPE 4'),
    ]
    
    total_changes = 0
    for stripe_num, filename, title in files:
        print(f"\n📝 {title}")
        filepath = Path(filename)
        result = comprehensive_translate_file(filepath, stripe_num)
        
        if result['status'] == 'updated':
            print(f"   ✅ {result['changes']} translations applied")
            total_changes += result['changes']
        elif result['status'] == 'error':
            print(f"   ❌ Error: {result['reason']}")
        else:
            print(f"   ⏭️  No changes needed (already translated)")
    
    print(f"\n✅ COMPLETE!")
    print(f"   Total translations: {total_changes}")
    print(f"\n⚠️  Next: Lesson content translations still needed")
    print(f"   Use white-belt-stripe1-gamified-de.html as template")

if __name__ == '__main__':
    main()

