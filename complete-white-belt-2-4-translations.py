#!/usr/bin/env python3
"""
URGENT: Complete German Translations for White Belt Stripes 2-4
Batch process all 3 files using Stripe 1 as template
"""

import re
from pathlib import Path

# Complete translations for all quiz content
QUIZ_TRANSLATIONS = {
    'stripe2': {
        # Question 1
        'What is psychological safety?': 'Was ist psychologische Sicherheit?',
        'A) Feeling physically safe at work': 'A) Sich physisch sicher bei der Arbeit fühlen',
        'B) Believing you can speak up without risk of punishment or humiliation': 'B) Der Glaube, dass du dich äußern kannst, ohne Gefahr von Bestrafung oder Demütigung',
        'C) Never making mistakes': 'C) Niemals Fehler machen',
        'D) Always agreeing with the team': 'D) Immer mit dem Team übereinstimmen',
        'Psychological safety is the belief that you can speak up with ideas, questions, concerns, or mistakes without being punished or humiliated.': 'Psychologische Sicherheit ist die Überzeugung, dass du dich mit Ideen, Fragen, Bedenken oder Fehlern äußern kannst, ohne bestraft oder gedemütigt zu werden.',
        
        # Question 2
        "According to Amy Edmondson's research, what happens in psychologically safe teams?": "Laut Amy Edmondsons Forschung: Was passiert in psychologisch sicheren Teams?",
        'A) Fewer mistakes are made': 'A) Es werden weniger Fehler gemacht',
        'B) More mistakes are reported and learned from': 'B) Mehr Fehler werden gemeldet und daraus gelernt',
        'C) People work in silence': 'C) Menschen arbeiten schweigend',
        'D) Conflict is avoided': 'D) Konflikte werden vermieden',
        "Paradoxically, psychologically safe teams report MORE mistakes because they feel safe to admit them, leading to better learning and prevention.": "Paradoxerweise berichten psychologisch sichere Teams über MEHR Fehler, weil sie sich sicher fühlen, sie zuzugeben, was zu besserem Lernen und Prävention führt.",
        
        # Question 3
        "True or False: Psychological safety means everyone always agrees and there's no conflict.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass alle immer übereinstimmen und es keine Konflikte gibt.",
        'A) True': 'A) Wahr',
        'B) False': 'B) Falsch',
        "False! Psychological safety enables healthy conflict and debate. It's about feeling safe to disagree, not avoiding disagreement.": "Falsch! Psychologische Sicherheit ermöglicht gesunden Konflikt und Debatte. Es geht darum, sich sicher zu fühlen zu widersprechen, nicht darum, Uneinigkeit zu vermeiden.",
        
        # Question 4
        'What is a key behavior that creates psychological safety?': 'Was ist ein Schlüsselverhalten, das psychologische Sicherheit schafft?',
        'A) Criticizing mistakes publicly': 'A) Fehler öffentlich kritisieren',
        'B) Responding to questions with curiosity, not judgment': 'B) Auf Fragen mit Neugier statt Beurteilung reagieren',
        'C) Keeping information secret': 'C) Informationen geheim halten',
        'D) Only speaking to senior members': 'D) Nur mit leitenden Mitgliedern sprechen',
        "Responding with curiosity instead of judgment creates safety. When someone asks a question, treat it as a learning opportunity for everyone.": "Mit Neugier statt Beurteilung zu reagieren schafft Sicherheit. Wenn jemand eine Frage stellt, behandle sie als Lernmöglichkeit für alle.",
        
        # Question 5
        "What happens when a leader admits they don't know something?": "Was passiert, wenn ein Leader zugibt, etwas nicht zu wissen?",
        'A) They lose credibility': 'A) Sie verlieren Glaubwürdigkeit',
        'B) They create psychological safety for others': 'B) Sie schaffen psychologische Sicherheit für andere',
        'C) The team loses confidence': 'C) Das Team verliert Vertrauen',
        'D) Nothing changes': 'D) Nichts ändert sich',
        "Leaders who admit they don't know something model vulnerability and create psychological safety. This encourages others to do the same.": "Leader, die zugeben, etwas nicht zu wissen, zeigen Verletzlichkeit vor und schaffen psychologische Sicherheit. Das ermutigt andere, dasselbe zu tun.",
        
        # Question 6
        'Which of these is a sign of low psychological safety?': 'Welches davon ist ein Zeichen für niedrige psychologische Sicherheit?',
        'A) People ask questions freely': 'A) Menschen stellen Fragen frei',
        'B) Team members admit mistakes openly': 'B) Teammitglieder geben Fehler offen zu',
        'C) People stay silent in meetings': 'C) Menschen bleiben in Meetings schweigsam',
        'D) Ideas are debated respectfully': 'D) Ideen werden respektvoll diskutiert',
        "Silence in meetings is a red flag. In psychologically safe teams, people speak up with questions, concerns, and ideas.": "Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen.",
        
        # Question 7
        "What is the 'two-second rule' for creating psychological safety?": "Was ist die 'Zwei-Sekunden-Regel' zur Schaffung von psychologischer Sicherheit?",
        'A) Respond within 2 seconds': 'A) Innerhalb von 2 Sekunden antworten',
        'B) Wait 2 seconds before responding to show you listened': 'B) 2 Sekunden warten, bevor du antwortest, um zu zeigen, dass du zugehört hast',
        'C) Speak for only 2 seconds': 'C) Nur 2 Sekunden lang sprechen',
        'D) Think for 2 seconds before speaking': 'D) 2 Sekunden nachdenken, bevor du sprichst',
        "The two-second rule: When someone speaks, wait 2 seconds before responding. This shows you're listening and considering their input, not just waiting to talk.": "Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden.",
        
        # Question 8
        'How can you build psychological safety as a team member?': 'Wie kannst du als Teammitglied psychologische Sicherheit aufbauen?',
        'A) Only speak when you have the answer': 'A) Nur sprechen, wenn du die Antwort hast',
        "B) Ask questions, admit when you don't know, and acknowledge others' contributions": "B) Fragen stellen, zugeben, wenn du etwas nicht weißt, und die Beiträge anderer anerkennen",
        'C) Stay quiet to avoid mistakes': 'C) Ruhig bleiben, um Fehler zu vermeiden',
        "D) Only share perfect ideas": "D) Nur perfekte Ideen teilen",
        "You build psychological safety by modeling vulnerability: ask questions, admit when you don't know, and acknowledge others' contributions.": "Du baust psychologische Sicherheit auf, indem du Verletzlichkeit vorlebst: stelle Fragen, gib zu, wenn du etwas nicht weißt, und erkenne die Beiträge anderer an.",
        
        # Question 9
        'What is the relationship between psychological safety and performance?': 'Wie ist die Beziehung zwischen psychologischer Sicherheit und Leistung?',
        'A) They are unrelated': 'A) Sie stehen in keinem Zusammenhang',
        'B) High psychological safety leads to higher performance': 'B) Hohe psychologische Sicherheit führt zu höherer Leistung',
        'C) Safety reduces performance': 'C) Sicherheit reduziert die Leistung',
        "D) Only high performers create safety": "D) Nur Hochleistende schaffen Sicherheit",
        "Research shows psychological safety is a key driver of team performance. Safe teams learn faster, innovate more, and make better decisions.": "Forschung zeigt, dass psychologische Sicherheit ein Schlüsselfaktor für Teamleistung ist. Sichere Teams lernen schneller, innovieren mehr und treffen bessere Entscheidungen.",
        
        # Question 10
        "True or False: Psychological safety means there are no consequences for poor performance.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass es keine Konsequenzen für schlechte Leistung gibt.",
        "False! Psychological safety is about interpersonal risk, not performance standards. You can have high standards AND psychological safety.": "Falsch! Psychologische Sicherheit geht um zwischenmenschliches Risiko, nicht um Leistungsstandards. Du kannst hohe Standards UND psychologische Sicherheit haben.",
    },
    
    'stripe3': {
        # Question 1
        'What is the most effective way to build trust quickly?': 'Was ist der effektivste Weg, um schnell Vertrauen aufzubauen?',
        'A) Demand trust from others': 'A) Vertrauen von anderen verlangen',
        'B) Start by being vulnerable yourself': 'B) Beginne damit, selbst verletzlich zu sein',
        'C) Wait for others to trust you first': 'C) Warte, dass andere dir zuerst vertrauen',
        'D) Only trust people you already know': 'D) Nur Menschen vertrauen, die du schon kennst',
        "The fastest way to build trust is to go first. Be vulnerable, admit mistakes, and ask for help. This creates safety for others.": "Der schnellste Weg, Vertrauen aufzubauen, ist, den ersten Schritt zu machen. Sei verletzlich, gib Fehler zu und bitte um Hilfe. Das schafft Sicherheit für andere.",
        
        # Question 2
        "What is a 'trust-building moment'?": "Was ist ein 'Vertrauensbildungsmoment'?",
        'A) A formal trust exercise': 'A) Eine formale Vertrauensübung',
        'B) Any moment where you choose vulnerability over self-protection': 'B) Jeder Moment, in dem du Verletzlichkeit über Selbstschutz wählst',
        'C) A team building event': 'C) Ein Teambuilding-Event',
        'D) A performance review': 'D) Eine Leistungsbeurteilung',
        "Trust-building moments happen daily. Every time you choose vulnerability over self-protection, you build trust.": "Vertrauensbildungsmomente passieren täglich. Jedes Mal, wenn du Verletzlichkeit über Selbstschutz wählst, baust du Vertrauen auf.",
        
        # Question 3
        'True or False: Trust is built through grand gestures and big moments.': 'Wahr oder Falsch: Vertrauen wird durch große Gesten und große Momente aufgebaut.',
        "False! Trust is built through small, consistent actions over time. Daily vulnerability compounds into strong trust.": "Falsch! Vertrauen wird durch kleine, konsistente Handlungen über die Zeit aufgebaut. Tägliche Verletzlichkeit führt zu starkem Vertrauen.",
        
        # Question 4
        'What should you do when someone shares a mistake or weakness?': 'Was solltest du tun, wenn jemand einen Fehler oder eine Schwäche teilt?',
        'A) Point out how to avoid it next time': 'A) Hinweisen, wie man es beim nächsten Mal vermeidet',
        'B) Thank them for their honesty and share your own experience': 'B) Ihnen für ihre Ehrlichkeit danken und deine eigene Erfahrung teilen',
        'C) Change the subject quickly': 'C) Schnell das Thema wechseln',
        'D) Criticize the mistake': 'D) Den Fehler kritisieren',
        "Acknowledge their vulnerability and reciprocate. Thank them for sharing and offer your own experience. This builds mutual trust.": "Erkenne ihre Verletzlichkeit an und gib zurück. Danke ihnen fürs Teilen und biete deine eigene Erfahrung an. Das baut gegenseitiges Vertrauen auf.",
        
        # Question 5
        "What is the 'personal history exercise' designed to do?": "Wozu dient die 'Persönliche Historie Übung'?",
        'A) Share work accomplishments': 'A) Arbeitsleistungen teilen',
        "B) Help team members understand each other's backgrounds and experiences": "B) Teammitgliedern helfen, sich gegenseitig zu verstehen",
        'C) Review performance metrics': 'C) Leistungsmetriken überprüfen',
        'D) Plan future projects': 'D) Zukünftige Projekte planen',
        "The personal history exercise helps team members understand each other's backgrounds, creating empathy and connection that builds trust.": "Die persönliche Historie Übung hilft Teammitgliedern, sich gegenseitig zu verstehen und schafft Empathie und Verbindung, die Vertrauen aufbaut.",
        
        # Question 6
        'Which of these behaviors destroys trust?': 'Welches dieser Verhaltensweisen zerstört Vertrauen?',
        'A) Admitting mistakes': 'A) Fehler zugeben',
        'B) Asking for help': 'B) Um Hilfe bitten',
        "C) Blaming others for your mistakes": "C) Anderen die Schuld für deine Fehler geben",
        'D) Sharing personal challenges': 'D) Persönliche Herausforderungen teilen',
        "Blaming others destroys trust. Taking responsibility, even when it's hard, builds trust. Blame erodes it.": "Anderen die Schuld zu geben zerstört Vertrauen. Verantwortung zu übernehmen, auch wenn es schwer ist, baut Vertrauen auf. Schuldzuweisungen zerstören es.",
        
        # Question 7
        "What does 'going first' mean in trust building?": "Was bedeutet 'den ersten Schritt machen' beim Vertrauensaufbau?",
        "A) Being the first to speak in meetings": "A) Als Erster in Meetings sprechen",
        'B) Being vulnerable before others feel safe to be': 'B) Verletzlich sein, bevor andere sich sicher fühlen',
        'C) Always leading projects': 'C) Immer Projekte leiten',
        "D) Never making mistakes": "D) Niemals Fehler machen",
        "'Going first' means being vulnerable before others feel safe. You create the safety by modeling the behavior you want to see.": "'Den ersten Schritt machen' bedeutet, verletzlich zu sein, bevor andere sich sicher fühlen. Du schaffst die Sicherheit, indem du das Verhalten vorlebst, das du sehen möchtest.",
        
        # Question 8
        'How long does it take to build trust?': 'Wie lange dauert es, Vertrauen aufzubauen?',
        'A) One team building session': 'A) Eine Teambuilding-Sitzung',
        'B) Months or years of consistent behavior': 'B) Monate oder Jahre konsistenten Verhaltens',
        'C) A single conversation': 'C) Ein einziges Gespräch',
        "D) Only during crises": "D) Nur in Krisen",
        "Trust takes time and consistency. While you can start building it immediately, strong trust develops over months and years of reliable behavior.": "Vertrauen braucht Zeit und Konsistenz. Während du sofort anfangen kannst, es aufzubauen, entwickelt sich starkes Vertrauen über Monate und Jahre zuverlässigen Verhaltens.",
        
        # Question 9
        "True or False: Trust can be rebuilt after it's been broken.": "Wahr oder Falsch: Vertrauen kann wiederaufgebaut werden, nachdem es gebrochen wurde.",
        "True, but it's harder. Rebuilding trust requires consistent vulnerability, transparency, and reliability over time. It's possible but takes work.": "Wahr, aber es ist schwerer. Vertrauen wiederaufzubauen erfordert konsistente Verletzlichkeit, Transparenz und Zuverlässigkeit über die Zeit. Es ist möglich, aber erfordert Arbeit.",
        
        # Question 10
        'What happens when you consistently choose vulnerability over self-protection?': 'Was passiert, wenn du konsequent Verletzlichkeit über Selbstschutz wählst?',
        "Consistent vulnerability creates a cascade effect. Others see it's safe and follow, leading to stronger team trust overall.": "Konsistente Verletzlichkeit schafft einen Kaskadeneffekt. Andere sehen, dass es sicher ist, und folgen, was zu stärkerem Teamvertrauen insgesamt führt.",
    },
    
    'stripe4': {
        # Question 1
        'What is the relationship between trust and team speed?': 'Wie ist die Beziehung zwischen Vertrauen und Teamgeschwindigkeit?',
        'A) Trust slows teams down': 'A) Vertrauen verlangsamt Teams',
        'B) High trust teams move faster because they don\'t waste energy on politics': 'B) Hochvertrauensteams bewegen sich schneller, weil sie keine Energie auf Politik verschwenden',
        'C) Trust has no impact on speed': 'C) Vertrauen hat keinen Einfluss auf Geschwindigkeit',
        "D) Only fast teams can build trust": "D) Nur schnelle Teams können Vertrauen aufbauen",
        "High-trust teams move faster. They don't waste time on politics, second-guessing, or covering mistakes. Trust = speed.": "Hochvertrauensteams bewegen sich schneller. Sie verschwenden keine Zeit mit Politik, Zweifeln oder dem Verdecken von Fehlern. Vertrauen = Geschwindigkeit.",
        
        # Question 2
        'What happens when trust is low in a team?': 'Was passiert, wenn Vertrauen in einem Team niedrig ist?',
        'A) Teams work more efficiently': 'A) Teams arbeiten effizienter',
        'B) Energy is wasted on politics, second-guessing, and self-protection': 'B) Energie wird auf Politik, Zweifeln und Selbstschutz verschwendet',
        'C) Communication improves': 'C) Kommunikation verbessert sich',
        'D) Innovation increases': 'D) Innovation steigt',
        "Low trust wastes energy. Team members spend time on politics, protecting themselves, and second-guessing instead of productive work.": "Niedriges Vertrauen verschwendet Energie. Teammitglieder verbringen Zeit mit Politik, Selbstschutz und Zweifeln statt produktiver Arbeit.",
        
        # Question 3
        "True or False: Trust is a 'nice to have' but not essential for high performance.": "Wahr oder Falsch: Vertrauen ist 'schön zu haben', aber nicht wesentlich für hohe Leistung.",
        "False! Trust is essential, not optional. It's the foundation of the entire Lencioni pyramid. Without it, teams cannot function at a high level.": "Falsch! Vertrauen ist wesentlich, nicht optional. Es ist die Grundlage der gesamten Lencioni-Pyramide. Ohne es können Teams nicht auf hohem Niveau funktionieren.",
        
        # Question 4
        'What should you do if you notice trust is low in your team?': 'Was solltest du tun, wenn du merkst, dass Vertrauen in deinem Team niedrig ist?',
        "A) Wait for someone else to fix it": "A) Warten, dass jemand anderes es behebt",
        'B) Start by being vulnerable yourself': 'B) Beginne damit, selbst verletzlich zu sein',
        "C) Demand that others trust you": "C) Verlangen, dass andere dir vertrauen",
        "D) Ignore it and focus on work": "D) Es ignorieren und sich auf die Arbeit konzentrieren",
        "Start by being vulnerable yourself. You can't force others to trust, but you can model the behavior and create safety for others to follow.": "Beginne damit, selbst verletzlich zu sein. Du kannst andere nicht zwingen zu vertrauen, aber du kannst das Verhalten vorleben und Sicherheit für andere schaffen, um zu folgen.",
        
        # Question 5
        'How does trust impact decision-making?': 'Wie beeinflusst Vertrauen die Entscheidungsfindung?',
        'A) Trust has no impact': 'A) Vertrauen hat keinen Einfluss',
        'B) High trust enables faster, better decisions because people share information freely': 'B) Hohes Vertrauen ermöglicht schnellere, bessere Entscheidungen, weil Menschen Informationen frei teilen',
        'C) Trust slows decisions down': 'C) Vertrauen verlangsamt Entscheidungen',
        "D) Only leaders make decisions in high-trust teams": "D) Nur Leader treffen Entscheidungen in Hochvertrauensteams",
        "In high-trust teams, people share information freely, leading to better-informed and faster decisions. Low trust leads to information hoarding.": "In Hochvertrauensteams teilen Menschen Informationen frei, was zu besser informierten und schnelleren Entscheidungen führt. Niedriges Vertrauen führt zu Informationshortung.",
        
        # Question 6
        "What is a 'trust audit'?": "Was ist ein 'Vertrauensaudit'?",
        'A) A formal assessment of trust levels': 'A) Eine formale Bewertung der Vertrauensniveaus',
        'B) A review of financial records': 'B) Eine Überprüfung der Finanzunterlagen',
        'C) A performance evaluation': 'C) Eine Leistungsbeurteilung',
        'D) A team building exercise': 'D) Eine Teambuilding-Übung',
        "A trust audit is an honest assessment of trust levels in your team. It helps identify where trust is strong and where it needs work.": "Ein Vertrauensaudit ist eine ehrliche Bewertung der Vertrauensniveaus in deinem Team. Es hilft zu identifizieren, wo Vertrauen stark ist und wo es Arbeit braucht.",
        
        # Question 7
        'Which of these is a sign of high trust?': 'Welches davon ist ein Zeichen für hohes Vertrauen?',
        'A) People hide mistakes': 'A) Menschen verstecken Fehler',
        'B) Team members ask for help freely': 'B) Teammitglieder bitten frei um Hilfe',
        'C) Information is hoarded': 'C) Informationen werden gehortet',
        'D) People avoid difficult conversations': 'D) Menschen vermeiden schwierige Gespräche',
        "In high-trust teams, people ask for help freely. They don't fear judgment or punishment for not knowing something.": "In Hochvertrauensteams bitten Menschen frei um Hilfe. Sie fürchten keine Beurteilung oder Bestrafung dafür, etwas nicht zu wissen.",
        
        # Question 8
        'What role does the leader play in building trust?': 'Welche Rolle spielt der Leader beim Aufbau von Vertrauen?',
        "A) Wait for the team to build trust first": "A) Warten, dass das Team zuerst Vertrauen aufbaut",
        'B) Model vulnerability and transparency to create safety': 'B) Verletzlichkeit und Transparenz vorleben, um Sicherheit zu schaffen',
        "C) Demand trust from team members": "C) Vertrauen von Teammitgliedern verlangen",
        "D) Trust develops naturally without leader involvement": "D) Vertrauen entwickelt sich natürlich ohne Leader-Beteiligung",
        "Leaders must go first. By modeling vulnerability and transparency, leaders create the safety that allows trust to flourish throughout the team.": "Leader müssen den ersten Schritt machen. Indem sie Verletzlichkeit und Transparenz vorleben, schaffen Leader die Sicherheit, die es ermöglicht, dass Vertrauen im gesamten Team gedeiht.",
        
        # Question 9
        "True or False: You can measure trust directly through surveys.": "Wahr oder Falsch: Du kannst Vertrauen direkt durch Umfragen messen.",
        "True, but be careful. Trust surveys can help, but observable behaviors (silence, defensiveness, information hoarding) are often more reliable indicators.": "Wahr, aber sei vorsichtig. Vertrauensumfragen können helfen, aber beobachtbare Verhaltensweisen (Schweigen, Defensivität, Informationshortung) sind oft zuverlässigere Indikatoren.",
        
        # Question 10
        'What is the ultimate outcome of building vulnerability-based trust?': 'Was ist das ultimative Ergebnis des Aufbaus von verletzlichkeitsbasiertem Vertrauen?',
        "Teams with strong vulnerability-based trust move faster, make better decisions, innovate more, and achieve higher results because they're not wasting energy on self-protection.": "Teams mit starkem verletzlichkeitsbasiertem Vertrauen bewegen sich schneller, treffen bessere Entscheidungen, innovieren mehr und erreichen höhere Ergebnisse, weil sie keine Energie auf Selbstschutz verschwenden.",
    }
}

def translate_quiz_section(content, stripe_num):
    """Translate quiz section for a stripe"""
    translations = QUIZ_TRANSLATIONS[f'stripe{stripe_num}']
    
    # Translate question headers
    content = re.sub(r'<h3>Question (\d+) of 10</h3>', r'<h3>Frage \1 von 10</h3>', content)
    
    # Translate quiz section header
    content = content.replace('Test Your Knowledge', 'Teste Dein Wissen')
    content = content.replace(
        "Complete this quiz to validate your understanding of this stripe's content.",
        "Schließe dieses Quiz ab, um dein Verständnis zu überprüfen."
    )
    
    # Translate questions and answers
    for en, de in translations.items():
        # Questions in question-text
        pattern = f'<p class="question-text">{re.escape(en)}</p>'
        if re.search(pattern, content):
            content = re.sub(pattern, f'<p class="question-text">{de}</p>', content)
        
        # Answers in button text
        pattern = f'>{re.escape(en)}</button>'
        if re.search(pattern, content):
            content = re.sub(pattern, f'>{de}</button>', content)
        
        # Explanations in data-explanation
        pattern = f'data-explanation="{re.escape(en)}"'
        if re.search(pattern, content):
            content = re.sub(pattern, f'data-explanation="{de}"', content)
    
    # Translate completion message
    content = content.replace('Quiz Complete! 🎉', 'Quiz abgeschlossen! 🎉')
    content = content.replace('You scored:', 'Deine Punktzahl:')
    content = content.replace('+50 XP awarded!', '+50 XP verdient!')
    content = content.replace('Continue', 'Weiter')
    
    return content

def translate_ui_elements(content):
    """Translate common UI elements"""
    replacements = {
        'Complete Lesson': 'Lektion abschließen',
        'Mark Complete': 'Als abgeschlossen markieren',
        'Next Lesson': 'Nächste Lektion',
        'Back to White Belt Hub': 'Zurück zum White Belt Hub',
        'Test Your Knowledge': 'Teste Dein Wissen',
    }
    
    for en, de in replacements.items():
        content = content.replace(en, de)
    
    return content

def fix_links(content):
    """Fix all internal links to -de.html versions"""
    # Pattern: href="filename.html" -> href="filename-de.html"
    # But don't change if already -de.html or external URLs
    def replace_link(match):
        link = match.group(1)
        if '-de.html' in link or link.startswith('http'):
            return match.group(0)
        if link.endswith('.html') and not link.endswith('-de.html'):
            return f'href="{link.replace(".html", "-de.html")}"'
        return match.group(0)
    
    content = re.sub(r'href="([^"]+\.html)"', replace_link, content)
    return content

def main():
    """Complete translations for Stripes 2-4"""
    print("🇩🇪 URGENT: COMPLETING WHITE BELT STRIPES 2-4 GERMAN TRANSLATIONS")
    print("=" * 70)
    
    stripe_files = [
        (2, 'white-belt-stripe2-gamified-de.html', 'STRIPE 2: Psychological Safety'),
        (3, 'white-belt-stripe3-gamified-de.html', 'STRIPE 3: Building Trust'),
        (4, 'white-belt-stripe4-gamified-de.html', 'STRIPE 4: Trust & Performance'),
    ]
    
    for stripe_num, filename, title in stripe_files:
        filepath = Path(filename)
        
        if not filepath.exists():
            print(f"\n⚠️  {filename} not found - skipping")
            continue
        
        print(f"\n📝 {title}")
        print(f"   Processing {filename}...")
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"   ❌ Error reading file: {e}")
            continue
        
        original_content = content
        changes = 0
        
        # 1. Translate quiz section
        new_content = translate_quiz_section(content, stripe_num)
        if new_content != content:
            changes += 1
            content = new_content
        
        # 2. Translate UI elements
        new_content = translate_ui_elements(content)
        if new_content != content:
            changes += 1
            content = new_content
        
        # 3. Fix links
        new_content = fix_links(content)
        if new_content != content:
            changes += 1
            content = new_content
        
        # 4. Ensure lang="de"
        if 'lang="de"' not in content and '<html' in content:
            content = re.sub(r'<html([^>]*)>', r'<html\1 lang="de">', content, count=1)
            if 'lang="de"' in content:
                changes += 1
        
        # Write back
        if content != original_content:
            try:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"   ✅ Updated ({changes} changes applied)")
            except Exception as e:
                print(f"   ❌ Error writing file: {e}")
        else:
            print(f"   ⏭️  No changes needed")
    
    print(f"\n✅ Batch translation complete!")
    print(f"\n⚠️  NOTE: Lesson content translations still needed")
    print(f"   Use Stripe 1 as template for lesson translations")

if __name__ == '__main__':
    main()

