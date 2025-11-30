#!/usr/bin/env python3
"""
Direct translation of quiz answer options in German files
Handles mixed English/German content
"""

import re
from pathlib import Path

def translate_quiz_answers_direct(filepath: Path, stripe_num: int):
    """Directly translate quiz answer options"""
    
    if not filepath.exists():
        return {'status': 'error', 'reason': 'File not found'}
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = 0
    
    if stripe_num == 2:
        # Stripe 2: Direct replacements for answer options
        replacements = [
            # Question 1 options
            ('A) Feeling physically safe at work', 'A) Sich physisch sicher bei der Arbeit fühlen'),
            ('B) Believing you can speak up without risk von punishment or humiliation', 'B) Der Glaube, dass du dich äußern kannst, ohne Gefahr von Bestrafung oder Demütigung'),
            ('C) Never making mistakes', 'C) Niemals Fehler machen'),
            ('D) Always agreeing with the team', 'D) Immer mit dem Team übereinstimmen'),
            # Question 2
            ('A) Fewer mistakes are made', 'A) Es werden weniger Fehler gemacht'),
            ('B) More mistakes are reported and learned from', 'B) Mehr Fehler werden gemeldet und daraus gelernt'),
            ('C) People work in silence', 'C) Menschen arbeiten schweigend'),
            ('D) Conflict is vermeidened', 'D) Konflikte werden vermieden'),
            # Question 3
            # Question 4
            ('A) Criticizing mistakes publicly', 'A) Fehler öffentlich kritisieren'),
            ('B) Responding to questions with curiosity, not judgment', 'B) Auf Fragen mit Neugier statt Beurteilung reagieren'),
            ('C) Keeping information secret', 'C) Informationen geheim halten'),
            ('D) Only speaking to senior members', 'D) Nur mit leitenden Mitgliedern sprechen'),
            # Question 5
            ('A) They lose credibility', 'A) Sie verlieren Glaubwürdigkeit'),
            ('B) They create psychologische Sicherheit for others', 'B) Sie schaffen psychologische Sicherheit für andere'),
            ('C) The team loses confidence', 'C) Das Team verliert Vertrauen'),
            ('D) Nothing changes', 'D) Nichts ändert sich'),
            # Question 6
            ('A) People ask questions freely', 'A) Menschen stellen Fragen frei'),
            ('B) Team members Fehler zugeben openly', 'B) Teammitglieder geben Fehler offen zu'),
            ('C) People stay silent in meetings', 'C) Menschen bleiben in Meetings schweigsam'),
            ('D) Ideas are debated respectfully', 'D) Ideen werden respektvoll diskutiert'),
            # Question 7
            ('A) Respond within 2 seconds', 'A) Innerhalb von 2 Sekunden antworten'),
            ('B) Wait 2 seconds before responding to show you listened', 'B) 2 Sekunden warten, bevor du antwortest, um zu zeigen, dass du zugehört hast'),
            ('C) Speak for only 2 seconds', 'C) Nur 2 Sekunden lang sprechen'),
            ('D) Think for 2 seconds before speaking', 'D) 2 Sekunden nachdenken, bevor du sprichst'),
            # Question 8
            ('A) Only speak when you have the answer', 'A) Nur sprechen, wenn du die Antwort hast'),
            ("B) Ask questions, admit when you don't know, and acknowledge others' contributions", "B) Fragen stellen, zugeben, wenn du etwas nicht weißt, und die Beiträge anderer anerkennen"),
            ('C) Stay quiet to vermeiden mistakes', 'C) Ruhig bleiben, um Fehler zu vermeiden'),
            ("D) Only share perfect ideas", "D) Nur perfekte Ideen teilen"),
            # Question 9
            ('A) They are unrelated', 'A) Sie stehen in keinem Zusammenhang'),
            ('B) High psychologische Sicherheit leads to higher performance', 'B) Hohe psychologische Sicherheit führt zu höherer Leistung'),
            ('C) Safety reduces performance', 'C) Sicherheit reduziert die Leistung'),
            ("D) Only high performers create safety", "D) Nur Hochleistende schaffen Sicherheit"),
            # Questions
            ("Laut Amy Edmondson's Forschung, what happens in psychologically safe teams?", "Laut Amy Edmondsons Forschung: Was passiert in psychologisch sicheren Teams?"),
            ("Wahr oder Falsch: Psychologische Sicherheit means everyone always agrees and there's no conflict.", "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass alle immer übereinstimmen und es keine Konflikte gibt."),
            ('Was ist a key behavior that creates psychologische Sicherheit?', 'Was ist ein Schlüsselverhalten, das psychologische Sicherheit schafft?'),
            ('Was passiert, wenn a leader admits they don\'t know something?', "Was passiert, wenn ein Leader zugibt, etwas nicht zu wissen?"),
            ('Which von these is a sign von low psychologische Sicherheit?', 'Welches davon ist ein Zeichen für niedrige psychologische Sicherheit?'),
            ("Was ist 'two-second rule' for creating psychologische Sicherheit?", "Was ist die 'Zwei-Sekunden-Regel' zur Schaffung von psychologischer Sicherheit?"),
            ('How can you build psychologische Sicherheit as a team member?', 'Wie kannst du als Teammitglied psychologische Sicherheit aufbauen?'),
            ('Was ist relationship between psychologische Sicherheit and performance?', 'Wie ist die Beziehung zwischen psychologischer Sicherheit und Leistung?'),
            ('Wahr oder Falsch: Psychologische Sicherheit means there are no consequences for poor performance.', "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass es keine Konsequenzen für schlechte Leistung gibt."),
            # Explanations - fix mixed content
            ('Psychologische Sicherheit ist die Überzeugung, dass you can speak up with ideas, questions, concerns, or mistakes ohne bestraft zu werden or humiliated.', 'Psychologische Sicherheit ist die Überzeugung, dass du dich mit Ideen, Fragen, Bedenken oder Fehlern äußern kannst, ohne bestraft oder gedemütigt zu werden.'),
            ('False! Psychologische Sicherheit ermöglicht gesunden conflict and debate. It\'s about feeling safe to disagree, not vermeidening disagreement.', 'Falsch! Psychologische Sicherheit ermöglicht gesunden Konflikt und Debatte. Es geht darum, sich sicher zu fühlen zu widersprechen, nicht darum, Uneinigkeit zu vermeiden.'),
            ('Responding with curiosity instead von judgment creates safety. When someone asks a question, treat it as a learning opportunity for everyone.', 'Mit Neugier statt Beurteilung zu reagieren schafft Sicherheit. Wenn jemand eine Frage stellt, behandle sie als Lernmöglichkeit für alle.'),
            ('Leaders who admit they don\'t know something model vulnerability and create psychologische Sicherheit. This encourages others to do the same.', 'Leader, die zugeben, etwas nicht zu wissen, zeigen Verletzlichkeit vor und schaffen psychologische Sicherheit. Das ermutigt andere, dasselbe zu tun.'),
            ('Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen.', 'Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen.'),
            ('Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden.', 'Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden.'),
            ("You build psychologische Sicherheit by modeling vulnerability: ask questions, admit when you don't know, and acknowledge others' contributions.", "Du baust psychologische Sicherheit auf, indem du Verletzlichkeit vorlebst: stelle Fragen, gib zu, wenn du etwas nicht weißt, und erkenne die Beiträge anderer an."),
            ('Research shows psychologische Sicherheit is a key driver von team performance. Safe teams learn faster, innovate more, and make better decisions.', 'Forschung zeigt, dass psychologische Sicherheit ein Schlüsselfaktor für Teamleistung ist. Sichere Teams lernen schneller, innovieren mehr und treffen bessere Entscheidungen.'),
            ('False! Psychologische Sicherheit geht um interpersonal risk, not performance standards. You can have high standards AND psychologische Sicherheit.', 'Falsch! Psychologische Sicherheit geht um zwischenmenschliches Risiko, nicht um Leistungsstandards. Du kannst hohe Standards UND psychologische Sicherheit haben.'),
        ]
    
    elif stripe_num == 3:
        replacements = [
            # Questions
            ('What is the most effective way to build trust quickly?', 'Was ist der effektivste Weg, um schnell Vertrauen aufzubauen?'),
            ("What is a 'trust-building moment'?", "Was ist ein 'Vertrauensbildungsmoment'?"),
            ('True or False: Trust is built through grand gestures and big moments.', 'Wahr oder Falsch: Vertrauen wird durch große Gesten und große Momente aufgebaut.'),
            ('What should you do when someone shares a mistake or weakness?', 'Was solltest du tun, wenn jemand einen Fehler oder eine Schwäche teilt?'),
            ("What is the 'personal history exercise' designed to do?", "Wozu dient die 'Persönliche Historie Übung'?"),
            ('Which of these behaviors destroys trust?', 'Welches dieser Verhaltensweisen zerstört Vertrauen?'),
            ("What does 'going first' mean in trust building?", "Was bedeutet 'den ersten Schritt machen' beim Vertrauensaufbau?"),
            ('How long does it take to build trust?', 'Wie lange dauert es, Vertrauen aufzubauen?'),
            ("True or False: Trust can be rebuilt after it's been broken.", "Wahr oder Falsch: Vertrauen kann wiederaufgebaut werden, nachdem es gebrochen wurde."),
            ('What is the foundation of all trust-building activities?', 'Was ist die Grundlage aller Vertrauensbildungsaktivitäten?'),
            # Options
            ('A) Demand trust from others', 'A) Vertrauen von anderen verlangen'),
            ('B) Start by being vulnerable yourself', 'B) Beginne damit, selbst verletzlich zu sein'),
            ('C) Wait for others to trust you first', 'C) Warte, dass andere dir zuerst vertrauen'),
            ('D) Only trust people you already know', 'D) Nur Menschen vertrauen, die du schon kennst'),
            ('A) A formal trust exercise', 'A) Eine formale Vertrauensübung'),
            ('B) Any moment where you choose vulnerability over self-protection', 'B) Jeder Moment, in dem du Verletzlichkeit über Selbstschutz wählst'),
            ('A) Point out how to avoid it next time', 'A) Hinweisen, wie man es beim nächsten Mal vermeidet'),
            ('B) Thank them for their honesty and share your own experience', 'B) Ihnen für ihre Ehrlichkeit danken und deine eigene Erfahrung teilen'),
            ('A) Share work accomplishments', 'A) Arbeitsleistungen teilen'),
            ("B) Help team members understand each other's backgrounds and experiences", "B) Teammitgliedern helfen, sich gegenseitig zu verstehen"),
            ("C) Blaming others for your mistakes", "C) Anderen die Schuld für deine Fehler geben"),
            ("A) Being the first to speak in meetings", "A) Als Erster in Meetings sprechen"),
            ('B) Being vulnerable before others feel safe to be', 'B) Verletzlich sein, bevor andere sich sicher fühlen'),
            ('A) One team building session', 'A) Eine Teambuilding-Sitzung'),
            ('B) Months or years of consistent behavior', 'B) Monate oder Jahre konsistenten Verhaltens'),
            ('A) Complex exercises', 'A) Komplexe Übungen'),
            ('B) Genuine vulnerability and authenticity', 'B) Echte Verletzlichkeit und Authentizität'),
            # Explanations
            ("The fastest way to build trust is to go first. Be vulnerable, admit mistakes, and ask for help. This creates safety for others.", "Der schnellste Weg, Vertrauen aufzubauen, ist, den ersten Schritt zu machen. Sei verletzlich, gib Fehler zu und bitte um Hilfe. Das schafft Sicherheit für andere."),
            ("Trust-building moments happen daily. Every time you choose vulnerability over self-protection, you build trust.", "Vertrauensbildungsmomente passieren täglich. Jedes Mal, wenn du Verletzlichkeit über Selbstschutz wählst, baust du Vertrauen auf."),
            ("False! Trust is built through small, consistent actions over time. Daily vulnerability compounds into strong trust.", "Falsch! Vertrauen wird durch kleine, konsistente Handlungen über die Zeit aufgebaut. Tägliche Verletzlichkeit führt zu starkem Vertrauen."),
            ("Acknowledge their vulnerability and reciprocate. Thank them for sharing and offer your own experience. This builds mutual trust.", "Erkenne ihre Verletzlichkeit an und gib zurück. Danke ihnen fürs Teilen und biete deine eigene Erfahrung an. Das baut gegenseitiges Vertrauen auf."),
            ("The personal history exercise helps team members understand each other's backgrounds, creating empathy and connection that builds trust.", "Die persönliche Historie Übung hilft Teammitgliedern, sich gegenseitig zu verstehen und schafft Empathie und Verbindung, die Vertrauen aufbaut."),
            ("Blaming others destroys trust. Taking responsibility, even when it's hard, builds trust. Blame erodes it.", "Anderen die Schuld zu geben zerstört Vertrauen. Verantwortung zu übernehmen, auch wenn es schwer ist, baut Vertrauen auf. Schuldzuweisungen zerstören es."),
            ("'Going first' means being vulnerable before others feel safe. You create the safety by modeling the behavior you want to see.", "'Den ersten Schritt machen' bedeutet, verletzlich zu sein, bevor andere sich sicher fühlen. Du schaffst die Sicherheit, indem du das Verhalten vorlebst, das du sehen möchtest."),
            ("Trust takes time and consistency. While you can start building it immediately, strong trust develops over months and years of reliable behavior.", "Vertrauen braucht Zeit und Konsistenz. Während du sofort anfangen kannst, es aufzubauen, entwickelt sich starkes Vertrauen über Monate und Jahre zuverlässigen Verhaltens."),
            ("True, but it's harder. Rebuilding trust requires consistent vulnerability, transparency, and reliability over time. It's possible but takes work.", "Wahr, aber es ist schwerer. Vertrauen wiederaufzubauen erfordert konsistente Verletzlichkeit, Transparenz und Zuverlässigkeit über die Zeit. Es ist möglich, aber erfordert Arbeit."),
            ("All trust-building comes down to genuine vulnerability and authenticity. No exercise works without real, honest human connection.", "Alle Vertrauensbildung kommt auf echte Verletzlichkeit und Authentizität an. Keine Übung funktioniert ohne echte, ehrliche menschliche Verbindung."),
        ]
    
    elif stripe_num == 4:
        replacements = [
            # Questions
            ('What is the relationship between trust and team speed?', 'Wie ist die Beziehung zwischen Vertrauen und Teamgeschwindigkeit?'),
            ('What happens when trust is low in a team?', 'Was passiert, wenn Vertrauen in einem Team niedrig ist?'),
            ("True or False: Trust is a 'nice to have' but not essential for high performance.", "Wahr oder Falsch: Vertrauen ist 'schön zu haben', aber nicht wesentlich für hohe Leistung."),
            ('What should you do if you notice trust is low in your team?', 'Was solltest du tun, wenn du merkst, dass Vertrauen in deinem Team niedrig ist?'),
            ('How does trust impact decision-making?', 'Wie beeinflusst Vertrauen die Entscheidungsfindung?'),
            ("What is a 'trust audit'?", "Was ist ein 'Vertrauensaudit'?"),
            ('Which of these is a sign of high trust?', 'Welches davon ist ein Zeichen für hohes Vertrauen?'),
            ('What role does the leader play in building trust?', 'Welche Rolle spielt der Leader beim Aufbau von Vertrauen?'),
            ("True or False: You can measure trust directly through surveys.", "Wahr oder Falsch: Du kannst Vertrauen direkt durch Umfragen messen."),
            ('What is the ultimate outcome of building vulnerability-based trust?', 'Was ist das ultimative Ergebnis des Aufbaus von verletzlichkeitsbasiertem Vertrauen?'),
            ('What is the ultimate test of trust in a team?', 'Was ist der ultimative Test von Vertrauen in einem Team?'),
            # Options
            ('A) Trust slows teams down', 'A) Vertrauen verlangsamt Teams'),
            ("B) High trust teams move faster because they don't waste energy on politics", 'B) Hochvertrauensteams bewegen sich schneller, weil sie keine Energie auf Politik verschwenden'),
            ('A) Teams work more efficiently', 'A) Teams arbeiten effizienter'),
            ('B) Energy is wasted on politics, second-guessing, and self-protection', 'B) Energie wird auf Politik, Zweifeln und Selbstschutz verschwendet'),
            ("A) Wait for someone else to fix it", "A) Warten, dass jemand anderes es behebt"),
            ('B) Start by being vulnerable yourself', 'B) Beginne damit, selbst verletzlich zu sein'),
            ('B) High trust enables faster, better decisions because people share information freely', 'B) Hohes Vertrauen ermöglicht schnellere, bessere Entscheidungen, weil Menschen Informationen frei teilen'),
            ('A) A formal assessment of trust levels', 'A) Eine formale Bewertung der Vertrauensniveaus'),
            ('B) Team members ask for help freely', 'B) Teammitglieder bitten frei um Hilfe'),
            ("A) Wait for the team to build trust first", "A) Warten, dass das Team zuerst Vertrauen aufbaut"),
            ('B) Model vulnerability and transparency to create safety', 'B) Verletzlichkeit und Transparenz vorleben, um Sicherheit zu schaffen'),
            ('B) How they handle mistakes, conflicts, and difficult situations', 'B) Wie sie mit Fehlern, Konflikten und schwierigen Situationen umgehen'),
            ('B) They must model vulnerability first', 'B) Sie müssen zuerst Verletzlichkeit vorleben'),
            ('True or False: Once trust is built, it never needs maintenance.', 'Wahr oder Falsch: Einmal aufgebaut, braucht Vertrauen nie Wartung.'),
            # Explanations
            ("High-trust teams move faster. They don't waste time on politics, second-guessing, or covering mistakes. Trust = speed.", "Hochvertrauensteams bewegen sich schneller. Sie verschwenden keine Zeit mit Politik, Zweifeln oder dem Verdecken von Fehlern. Vertrauen = Geschwindigkeit."),
            ("Low trust wastes energy. Team members spend time on politics, protecting themselves, and second-guessing instead of productive work.", "Niedriges Vertrauen verschwendet Energie. Teammitglieder verbringen Zeit mit Politik, Selbstschutz und Zweifeln statt produktiver Arbeit."),
            ("False! Trust is essential, not optional. It's the foundation of the entire Lencioni pyramid. Without it, teams cannot function at a high level.", "Falsch! Vertrauen ist wesentlich, nicht optional. Es ist die Grundlage der gesamten Lencioni-Pyramide. Ohne es können Teams nicht auf hohem Niveau funktionieren."),
            ("Start by being vulnerable yourself. You can't force others to trust, but you can model the behavior and create safety for others to follow.", "Beginne damit, selbst verletzlich zu sein. Du kannst andere nicht zwingen zu vertrauen, aber du kannst das Verhalten vorleben und Sicherheit für andere schaffen, um zu folgen."),
            ("In high-trust teams, people share information freely, leading to better-informed and faster decisions. Low trust leads to information hoarding.", "In Hochvertrauensteams teilen Menschen Informationen frei, was zu besser informierten und schnelleren Entscheidungen führt. Niedriges Vertrauen führt zu Informationshortung."),
            ("A trust audit is an honest assessment of trust levels in your team. It helps identify where trust is strong and where it needs work.", "Ein Vertrauensaudit ist eine ehrliche Bewertung der Vertrauensniveaus in deinem Team. Es hilft zu identifizieren, wo Vertrauen stark ist und wo es Arbeit braucht."),
            ("In high-trust teams, people ask for help freely. They don't fear judgment or punishment for not knowing something.", "In Hochvertrauensteams bitten Menschen frei um Hilfe. Sie fürchten keine Beurteilung oder Bestrafung dafür, etwas nicht zu wissen."),
            ("Leaders must go first. By modeling vulnerability and transparency, leaders create the safety that allows trust to flourish throughout the team.", "Leader müssen den ersten Schritt machen. Indem sie Verletzlichkeit und Transparenz vorleben, schaffen Leader die Sicherheit, die es ermöglicht, dass Vertrauen im gesamten Team gedeiht."),
            ("True, but be careful. Trust surveys can help, but observable behaviors (silence, defensiveness, information hoarding) are often more reliable indicators.", "Wahr, aber sei vorsichtig. Vertrauensumfragen können helfen, aber beobachtbare Verhaltensweisen (Schweigen, Defensivität, Informationshortung) sind oft zuverlässigere Indikatoren."),
            ("Teams with strong vulnerability-based trust move faster, make better decisions, innovate more, and achieve higher results because they're not wasting energy on self-protection.", "Teams mit starkem verletzlichkeitsbasiertem Vertrauen bewegen sich schneller, treffen bessere Entscheidungen, innovieren mehr und erreichen höhere Ergebnisse, weil sie keine Energie auf Selbstschutz verschwenden."),
            ("Trust is tested in difficult moments. How a team handles mistakes, conflicts, and crises reveals the true level of trust.", "Vertrauen wird in schwierigen Momenten getestet. Wie ein Team mit Fehlern, Konflikten und Krisen umgeht, zeigt das wahre Vertrauensniveau."),
            ("False! Trust requires ongoing maintenance. It's built through consistent daily actions and can be eroded by a single betrayal if not addressed.", "Falsch! Vertrauen erfordert laufende Wartung. Es wird durch konsistente tägliche Handlungen aufgebaut und kann durch einen einzigen Verrat erodiert werden, wenn es nicht angesprochen wird."),
            ("Leaders must go first. They set the tone by modeling vulnerability. If leaders don't trust, the team won't either.", "Leader müssen den ersten Schritt machen. Sie setzen den Ton, indem sie Verletzlichkeit vorleben. Wenn Leader nicht vertrauen, tut es das Team auch nicht."),
        ]
    
    # Apply all replacements
    for en, de in replacements:
        # Replace in button text
        if f'>{en}</button>' in content:
            content = content.replace(f'>{en}</button>', f'>{de}</button>')
            changes += 1
        # Replace in question text
        if f'<p class="question-text">{en}</p>' in content:
            content = content.replace(f'<p class="question-text">{en}</p>', f'<p class="question-text">{de}</p>')
            changes += 1
        # Replace in data-explanation (handle quotes)
        de_escaped = de.replace('"', '&quot;')
        en_escaped = en.replace('"', '&quot;')
        if f'data-explanation="{en_escaped}"' in content:
            content = content.replace(f'data-explanation="{en_escaped}"', f'data-explanation="{de_escaped}"')
            changes += 1
        elif f'data-explanation="{en}"' in content:
            content = content.replace(f'data-explanation="{en}"', f'data-explanation="{de_escaped}"')
            changes += 1
    
    # Write back
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return {'status': 'updated', 'changes': changes}
    
    return {'status': 'no_changes', 'changes': 0}

def main():
    """Translate quiz answers"""
    print("🇩🇪 DIRECT QUIZ ANSWER TRANSLATIONS")
    print("=" * 70)
    
    files = [
        (2, 'white-belt-stripe2-gamified-de.html'),
        (3, 'white-belt-stripe3-gamified-de.html'),
        (4, 'white-belt-stripe4-gamified-de.html'),
    ]
    
    for stripe_num, filename in files:
        print(f"\n📝 Stripe {stripe_num}: {filename}")
        result = translate_quiz_answers_direct(Path(filename), stripe_num)
        
        if result['status'] == 'updated':
            print(f"   ✅ {result['changes']} replacements applied")
        elif result['status'] == 'error':
            print(f"   ❌ {result['reason']}")
        else:
            print(f"   ⏭️  No changes")
    
    print(f"\n✅ Quiz translations complete!")

if __name__ == '__main__':
    main()

