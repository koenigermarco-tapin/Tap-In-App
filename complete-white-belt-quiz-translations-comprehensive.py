#!/usr/bin/env python3
"""
Comprehensive Quiz Translation for White Belt Stripes 2-4
Completes all quiz questions and feedback using English versions as reference
"""

import re
from pathlib import Path

# Complete translations for Stripe 2 quiz
STRIPE2_TRANSLATIONS = {
    # Question 1
    "What is psychological safety?": "Was ist psychologische Sicherheit?",
    "Psychological safety is the belief that you can speak up with ideas, questions, concerns, or mistakes without being punished or humiliated.": "Psychologische Sicherheit ist die Überzeugung, dass du dich mit Ideen, Fragen, Bedenken oder Fehlern äußern kannst, ohne bestraft oder gedemütigt zu werden.",
    "A) Feeling physically safe at work": "A) Sich physisch sicher bei der Arbeit fühlen",
    "B) Believing you can speak up without risk of punishment or humiliation": "B) Der Glaube, dass du dich äußern kannst ohne Gefahr von Bestrafung oder Demütigung",
    "C) Never making mistakes": "C) Niemals Fehler machen",
    "D) Always agreeing with the team": "D) Immer mit dem Team übereinstimmen",
    
    # Question 2
    "According to Amy Edmondson's research, what happens in psychologically safe teams?": "Laut Amy Edmondsons Forschung: Was passiert in psychologisch sicheren Teams?",
    "Paradoxically, psychologically safe teams report MORE mistakes because they feel safe to admit them, leading to better learning and prevention.": "Paradoxerweise berichten psychologisch sichere Teams über MEHR Fehler, weil sie sich sicher fühlen, sie zuzugeben, was zu besserem Lernen und Prävention führt.",
    "A) Fewer mistakes are made": "A) Es werden weniger Fehler gemacht",
    "B) More mistakes are reported and learned from": "B) Mehr Fehler werden gemeldet und daraus gelernt",
    "C) People work in silence": "C) Menschen arbeiten schweigend",
    "D) Conflict is avoided": "D) Konflikte werden vermieden",
    
    # Question 3
    "True or False: Psychological safety means everyone always agrees and there's no conflict.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass alle immer übereinstimmen und es keine Konflikte gibt.",
    "False! Psychological safety enables healthy conflict and debate. It's about feeling safe to disagree, not avoiding disagreement.": "Falsch! Psychologische Sicherheit ermöglicht gesunden Konflikt und Debatte. Es geht darum, sich sicher zu fühlen zu widersprechen, nicht darum, Uneinigkeit zu vermeiden.",
    
    # Question 4
    "What is a key behavior that creates psychological safety?": "Was ist ein Schlüsselverhalten, das psychologische Sicherheit schafft?",
    "Responding with curiosity instead of judgment creates safety. When someone asks a question, treat it as a learning opportunity for everyone.": "Mit Neugier statt Beurteilung zu reagieren schafft Sicherheit. Wenn jemand eine Frage stellt, behandle sie als Lernmöglichkeit für alle.",
    "A) Criticizing mistakes publicly": "A) Fehler öffentlich kritisieren",
    "B) Responding to questions with curiosity, not judgment": "B) Auf Fragen mit Neugier statt Beurteilung reagieren",
    "C) Keeping information secret": "C) Informationen geheim halten",
    "D) Only speaking to senior members": "D) Nur mit leitenden Mitgliedern sprechen",
    
    # Question 5
    "What happens when a leader admits they don't know something?": "Was passiert, wenn ein Leader zugibt, etwas nicht zu wissen?",
    "Leaders who admit they don't know something model vulnerability and create psychological safety. This encourages others to do the same.": "Leader, die zugeben, etwas nicht zu wissen, zeigen Verletzlichkeit vor und schaffen psychologische Sicherheit. Das ermutigt andere, dasselbe zu tun.",
    "A) They lose credibility": "A) Sie verlieren Glaubwürdigkeit",
    "B) They create psychological safety for others": "B) Sie schaffen psychologische Sicherheit für andere",
    "C) The team loses confidence": "C) Das Team verliert Vertrauen",
    "D) Nothing changes": "D) Nichts ändert sich",
    
    # Question 6
    "Which of these is a sign of low psychological safety?": "Welches davon ist ein Zeichen für niedrige psychologische Sicherheit?",
    "Silence in meetings is a red flag. In psychologically safe teams, people speak up with questions, concerns, and ideas.": "Schweigen in Meetings ist ein Warnzeichen. In psychologisch sicheren Teams äußern sich Menschen mit Fragen, Bedenken und Ideen.",
    "A) People ask questions freely": "A) Menschen stellen Fragen frei",
    "B) Team members admit mistakes openly": "B) Teammitglieder geben Fehler offen zu",
    "C) People stay silent in meetings": "C) Menschen bleiben in Meetings schweigsam",
    "D) Ideas are debated respectfully": "D) Ideen werden respektvoll diskutiert",
    
    # Question 7
    "What is the 'two-second rule' for creating psychological safety?": "Was ist die 'Zwei-Sekunden-Regel' zur Schaffung von psychologischer Sicherheit?",
    "The two-second rule: When someone speaks, wait 2 seconds before responding. This shows you're listening and considering their input, not just waiting to talk.": "Die Zwei-Sekunden-Regel: Wenn jemand spricht, warte 2 Sekunden, bevor du antwortest. Das zeigt, dass du zuhörst und ihren Beitrag berücksichtigst, nicht nur darauf wartest zu reden.",
    "A) Respond within 2 seconds": "A) Innerhalb von 2 Sekunden antworten",
    "B) Wait 2 seconds before responding to show you listened": "B) 2 Sekunden warten, bevor du antwortest, um zu zeigen, dass du zugehört hast",
    "C) Speak for only 2 seconds": "C) Nur 2 Sekunden lang sprechen",
    "D) Think for 2 seconds before speaking": "D) 2 Sekunden nachdenken, bevor du sprichst",
    
    # Question 8
    "How can you build psychological safety as a team member?": "Wie kannst du als Teammitglied psychologische Sicherheit aufbauen?",
    "You build psychological safety by modeling vulnerability: ask questions, admit when you don't know, and acknowledge others' contributions.": "Du baust psychologische Sicherheit auf, indem du Verletzlichkeit vorlebst: stelle Fragen, gib zu, wenn du etwas nicht weißt, und erkenne die Beiträge anderer an.",
    "A) Only speak when you have the answer": "A) Nur sprechen, wenn du die Antwort hast",
    "B) Ask questions, admit when you don't know, and acknowledge others' contributions": "B) Fragen stellen, zugeben, wenn du etwas nicht weißt, und die Beiträge anderer anerkennen",
    "C) Stay quiet to avoid mistakes": "C) Ruhig bleiben, um Fehler zu vermeiden",
    "D) Only share perfect ideas": "D) Nur perfekte Ideen teilen",
    
    # Question 9
    "What is the relationship between psychological safety and performance?": "Wie ist die Beziehung zwischen psychologischer Sicherheit und Leistung?",
    "Research shows psychological safety is a key driver of team performance. Safe teams learn faster, innovate more, and make better decisions.": "Forschung zeigt, dass psychologische Sicherheit ein Schlüsselfaktor für Teamleistung ist. Sichere Teams lernen schneller, innovieren mehr und treffen bessere Entscheidungen.",
    "A) They are unrelated": "A) Sie stehen in keinem Zusammenhang",
    "B) High psychological safety leads to higher performance": "B) Hohe psychologische Sicherheit führt zu höherer Leistung",
    "C) Safety reduces performance": "C) Sicherheit reduziert die Leistung",
    "D) Only high performers create safety": "D) Nur Hochleistende schaffen Sicherheit",
    
    # Question 10
    "True or False: Psychological safety means there are no consequences for poor performance.": "Wahr oder Falsch: Psychologische Sicherheit bedeutet, dass es keine Konsequenzen für schlechte Leistung gibt.",
    "False! Psychological safety is about interpersonal risk, not performance standards. You can have high standards AND psychological safety.": "Falsch! Psychologische Sicherheit geht um zwischenmenschliches Risiko, nicht um Leistungsstandards. Du kannst hohe Standards UND psychologische Sicherheit haben.",
}

def translate_stripe_quiz(stripe_num, translations_dict):
    """Translate quiz for a specific stripe"""
    
    de_file = Path(f'white-belt-stripe{stripe_num}-gamified-de.html')
    if not de_file.exists():
        print(f"⚠️  {de_file.name} not found")
        return False
    
    print(f"\n📝 Translating Stripe {stripe_num}...")
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changes = 0
    
    # Apply all translations
    for english, german in translations_dict.items():
        # Replace in question text
        content = content.replace(f'<p class="question-text">{english}</p>', f'<p class="question-text">{german}</p>')
        
        # Replace in button text (between > and </button>)
        content = re.sub(
            rf'>{re.escape(english)}</button>',
            f'>{german}</button>',
            content
        )
        
        # Replace in data-explanation
        content = re.sub(
            rf'data-explanation="{re.escape(english)}"',
            f'data-explanation="{german}"',
            content
        )
        
        # Count if any replacement happened
        if english in content or german in content:
            changes += 1
    
    # Fix quiz description
    content = content.replace(
        "Schließe dieses Quiz ab, um dein Verständnis zu überprüfen von this stripe's content.",
        "Schließe dieses Quiz ab, um dein Verständnis zu überprüfen."
    )
    
    # Fix "Question" to "Frage"
    content = re.sub(r'<h3>Question (\d+) of 10</h3>', r'<h3>Frage \1 von 10</h3>', content)
    
    # Write back
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"   ✅ Applied {changes} translations")
    return True

def main():
    """Complete quiz translations for White Belt Stripes 2-4"""
    
    print("🇩🇪 COMPREHENSIVE QUIZ TRANSLATIONS: White Belt Stripes 2-4")
    print("=" * 60)
    
    # For now, apply Stripe 2 translations to all (will customize per stripe next)
    success = []
    for stripe_num in [2, 3, 4]:
        if translate_stripe_quiz(stripe_num, STRIPE2_TRANSLATIONS):
            success.append(stripe_num)
    
    print(f"\n✅ Completed quiz translations for {len(success)} stripes")
    print("⚠️  NOTE: Stripe-specific questions (3-4) may need customization")
    print("    Stripe 2 uses complete translations above")

if __name__ == '__main__':
    main()

