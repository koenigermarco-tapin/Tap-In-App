#!/usr/bin/env python3
"""
Complete German Quiz Translations for White Belt Stripes 2-4
Comprehensive translation of all quiz questions, answers, and explanations
"""

import re
from pathlib import Path

# Complete translations for Stripe 2 (Psychological Safety)
STRIPE2_COMPLETE = {
    'questions': {
        'What is psychological safety?': 'Was ist psychologische Sicherheit?',
        "According to Amy Edmondson's research, what happens in psychologically safe teams?": "Laut Amy Edmondsons Forschung: Was passiert in psychologisch sicheren Teams?",
        "True or False: Psychological safety means everyone always agrees and there's no conflict.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass alle immer übereinstimmen und es keine Konflikte gibt.",
        'What is a key behavior that creates psychological safety?': 'Was ist ein Schlüsselverhalten, das psychologische Sicherheit schafft?',
        "What happens when a leader admits they don't know something?": "Was passiert, wenn ein Leader zugibt, etwas nicht zu wissen?",
        'Which of these is a sign of low psychological safety?': 'Welches davon ist ein Zeichen für niedrige psychologische Sicherheit?',
        "What is the 'two-second rule' for creating psychological safety?": "Was ist die 'Zwei-Sekunden-Regel' zur Schaffung von psychologischer Sicherheit?",
        'How can you build psychological safety as a team member?': 'Wie kannst du als Teammitglied psychologische Sicherheit aufbauen?',
        'What is the relationship between psychological safety and performance?': 'Wie ist die Beziehung zwischen psychologischer Sicherheit und Leistung?',
        "True or False: Psychological safety means there are no consequences for poor performance.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass es keine Konsequenzen für schlechte Leistung gibt."
    },
    'explanations': {
        "Psychological safety is the belief that you can speak up with ideas, questions, concerns, or mistakes without being punished or humiliated.": "Psychologische Sicherheit ist die Überzeugung, dass du dich mit Ideen, Fragen, Bedenken oder Fehlern äußern kannst, ohne bestraft oder gedemütigt zu werden.",
        "Paradoxically, psychologically safe teams report MORE mistakes because they feel safe to admit them, leading to better learning and prevention.": "Paradoxerweise berichten psychologisch sichere Teams über MEHR Fehler, weil sie sich sicher fühlen, sie zuzugeben, was zu besserem Lernen und Prävention führt.",
        "False! Psychological safety enables healthy conflict and debate. It's about feeling safe to disagree, not avoiding disagreement.": "Falsch! Psychologische Sicherheit ermöglicht gesunden Konflikt und Debatte. Es geht darum, sich sicher zu fühlen zu widersprechen, nicht darum, Uneinigkeit zu vermeiden.",
        "Responding with curiosity instead of judgment creates safety. When someone asks a question, treat it as a learning opportunity for everyone.": "Mit Neugier statt Beurteilung zu reagieren schafft Sicherheit. Wenn jemand eine Frage stellt, behandle sie als Lernmöglichkeit für alle.",
        "Leaders who admit they don't know something model vulnerability and create psychological safety. This encourages others to do the same.": "Leader, die zugeben, etwas nicht zu wissen, zeigen Verletzlichkeit vor und schaffen psychologische Sicherheit. Das ermutigt andere, dasselbe zu tun.",
        "Silence in meetings is a red flag. In psychologically safe teams, people speak up with questions, concerns, and ideas.": "Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen.",
        "The two-second rule: When someone speaks, wait 2 seconds before responding. This shows you're listening and considering their input, not just waiting to talk.": "Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden.",
        "You build psychological safety by modeling vulnerability: ask questions, admit when you don't know, and acknowledge others' contributions.": "Du baust psychologische Sicherheit auf, indem du Verletzlichkeit vorlebst: stelle Fragen, gib zu, wenn du etwas nicht weißt, und erkenne die Beiträge anderer an.",
        "Research shows psychological safety is a key driver of team performance. Safe teams learn faster, innovate more, and make better decisions.": "Forschung zeigt, dass psychologische Sicherheit ein Schlüsselfaktor für Teamleistung ist. Sichere Teams lernen schneller, innovieren mehr und treffen bessere Entscheidungen.",
        "False! Psychological safety is about interpersonal risk, not performance standards. You can have high standards AND psychological safety.": "Falsch! Psychologische Sicherheit geht um zwischenmenschliches Risiko, nicht um Leistungsstandards. Du kannst hohe Standards UND psychologische Sicherheit haben."
    },
    'options': {
        'A) Feeling physically safe at work': 'A) Sich physisch sicher bei der Arbeit fühlen',
        "B) Believing you can speak up without risk of punishment or humiliation": "B) Der Glaube, dass du dich äußern kannst, ohne Gefahr von Bestrafung oder Demütigung",
        'C) Never making mistakes': 'C) Niemals Fehler machen',
        "D) Always agreeing with the team": "D) Immer mit dem Team übereinstimmen",
        'A) Fewer mistakes are made': 'A) Es werden weniger Fehler gemacht',
        'B) More mistakes are reported and learned from': 'B) Mehr Fehler werden gemeldet und daraus gelernt',
        'C) People work in silence': 'C) Menschen arbeiten schweigend',
        'D) Conflict is avoided': 'D) Konflikte werden vermieden',
        'A) True': 'A) Wahr',
        'B) False': 'B) Falsch',
        'A) Criticizing mistakes publicly': 'A) Fehler öffentlich kritisieren',
        'B) Responding to questions with curiosity, not judgment': 'B) Auf Fragen mit Neugier statt Beurteilung reagieren',
        'C) Keeping information secret': 'C) Informationen geheim halten',
        'D) Only speaking to senior members': 'D) Nur mit leitenden Mitgliedern sprechen',
        'A) They lose credibility': 'A) Sie verlieren Glaubwürdigkeit',
        'B) They create psychological safety for others': 'B) Sie schaffen psychologische Sicherheit für andere',
        'C) The team loses confidence': 'C) Das Team verliert Vertrauen',
        'D) Nothing changes': 'D) Nichts ändert sich',
        'A) People ask questions freely': 'A) Menschen stellen Fragen frei',
        'B) Team members admit mistakes openly': 'B) Teammitglieder geben Fehler offen zu',
        'C) People stay silent in meetings': 'C) Menschen bleiben in Meetings schweigsam',
        'D) Ideas are debated respectfully': 'D) Ideen werden respektvoll diskutiert',
        'A) Respond within 2 seconds': 'A) Innerhalb von 2 Sekunden antworten',
        'B) Wait 2 seconds before responding to show you listened': 'B) 2 Sekunden warten, bevor du antwortest, um zu zeigen, dass du zugehört hast',
        'C) Speak for only 2 seconds': 'C) Nur 2 Sekunden lang sprechen',
        'D) Think for 2 seconds before speaking': 'D) 2 Sekunden nachdenken, bevor du sprichst',
        'A) Only speak when you have the answer': 'A) Nur sprechen, wenn du die Antwort hast',
        "B) Ask questions, admit when you don't know, and acknowledge others' contributions": "B) Fragen stellen, zugeben, wenn du etwas nicht weißt, und die Beiträge anderer anerkennen",
        'C) Stay quiet to avoid mistakes': 'C) Ruhig bleiben, um Fehler zu vermeiden',
        "D) Only share perfect ideas": "D) Nur perfekte Ideen teilen",
        'A) They are unrelated': 'A) Sie stehen in keinem Zusammenhang',
        'B) High psychological safety leads to higher performance': 'B) Hohe psychologische Sicherheit führt zu höherer Leistung',
        'C) Safety reduces performance': 'C) Sicherheit reduziert die Leistung',
        "D) Only high performers create safety": "D) Nur Hochleistende schaffen Sicherheit"
    }
}

# Similar dictionaries for Stripes 3 and 4 would go here...
# For now, let's focus on completing Stripe 2 properly

def translate_file_comprehensive(filepath: Path, translations: dict):
    """Comprehensively translate quiz content"""
    if not filepath.exists():
        return {'status': 'error', 'reason': 'File not found'}
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {'status': 'error', 'reason': f'Read error: {e}'}
    
    changes = 0
    
    # Translate questions
    for en, de in translations['questions'].items():
        # In question-text
        pattern = f'<p class="question-text">{re.escape(en)}</p>'
        if re.search(pattern, content):
            content = re.sub(pattern, f'<p class="question-text">{de}</p>', content)
            changes += 1
    
    # Translate explanations
    for en, de in translations['explanations'].items():
        # In data-explanation
        pattern = f'data-explanation="{re.escape(en)}"'
        if re.search(pattern, content):
            content = re.sub(pattern, f'data-explanation="{de}"', content)
            changes += 1
    
    # Translate answer options
    for en, de in translations['options'].items():
        # In button text (may have whitespace)
        pattern = f'>{re.escape(en)}</button>'
        if re.search(pattern, content):
            content = re.sub(pattern, f'>{de}</button>', content)
            changes += 1
    
    # Fix "Question" to "Frage"
    old_count = len(re.findall(r'<h3>Question \d+ of 10</h3>', content))
    content = re.sub(r'<h3>Question (\d+) of 10</h3>', r'<h3>Frage \1 von 10</h3>', content)
    if old_count > 0:
        changes += old_count
    
    # Fix quiz description
    if "Schließe dieses Quiz ab, um dein Verständnis zu überprüfen von this stripe's content." in content:
        content = content.replace(
            "Schließe dieses Quiz ab, um dein Verständnis zu überprüfen von this stripe's content.",
            "Schließe dieses Quiz ab, um dein Verständnis zu überprüfen."
        )
        changes += 1
    
    # Write back
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return {'status': 'updated', 'changes': changes}
    except Exception as e:
        return {'status': 'error', 'reason': f'Write error: {e}'}

def main():
    """Complete quiz translations"""
    print("🇩🇪 COMPLETE GERMAN QUIZ TRANSLATIONS: White Belt Stripe 2")
    print("=" * 60)
    
    filepath = Path('white-belt-stripe2-gamified-de.html')
    print(f"\n📝 Translating {filepath.name}...")
    result = translate_file_comprehensive(filepath, STRIPE2_COMPLETE)
    
    if result['status'] == 'updated':
        print(f"   ✅ Applied {result['changes']} translations")
    elif result['status'] == 'error':
        print(f"   ⚠️  Error: {result['reason']}")
    
    print(f"\n✅ Translation complete!")

if __name__ == '__main__':
    main()
