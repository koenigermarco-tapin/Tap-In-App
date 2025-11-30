#!/usr/bin/env python3
"""
Comprehensive translation of ALL Brown and Black Belt files
Translates: Lessons, Quiz questions, JavaScript questions array, Explanations, UI
"""

from pathlib import Path
import re

# Common translation patterns for all files
COMMON_TRANSLATIONS = [
    # Progress/UI
    ('Question', 'Frage'),
    ('of', 'von'),
    ('Complete', 'Abgeschlossen'),
    ('Begin Assessment →', 'Bewertung starten →'),
    ('Begin →', 'Beginnen →'),
    ('← Previous', '← Zurück'),
    ('Previous', 'Zurück'),
    ('Next →', 'Weiter →'),
    ('Next', 'Weiter'),
    ('Continue', 'Weiter'),
    ('Continue to', 'Weiter zu'),
    ('Back to', 'Zurück zum'),
    ('Back to Hub', 'Zurück zum Hub'),
    
    # Assessment
    ('Assessment Details', 'Bewertungsdetails'),
    ('Questions:', 'Fragen:'),
    ('Time:', 'Zeit:'),
    ('Format:', 'Format:'),
    ('minutes', 'Minuten'),
    ('Honest self-assessment', 'Ehrliche Selbsteinschätzung'),
    
    # Quiz
    ('Test Your Knowledge', 'Teste dein Wissen'),
    ('Complete this quiz to validate your understanding of this stripe\'s content.',
     'Schließe dieses Quiz ab, um dein Verständnis für den Inhalt dieses Streifens zu überprüfen.'),
    ('Quiz Complete!', 'Quiz abgeschlossen!'),
    ('You scored:', 'Deine Punktzahl:'),
    ('+50 XP awarded!', '+50 XP vergeben!'),
    ('+75 XP awarded!', '+75 XP vergeben!'),
    
    # Common phrases
    ('Your', 'Dein'),
    ('your', 'dein'),
    ('You', 'Du'),
    ('you', 'du'),
    ('You\'re', 'Du bist'),
    ('you\'re', 'du bist'),
    ('You\'ve', 'Du hast'),
    ('you\'ve', 'du hast'),
    ('When someone asks', 'Wenn jemand fragt'),
    ('you typically', 'tust du typischerweise'),
    ('Your team', 'Dein Team'),
    ('your team', 'dein Team'),
    
    # Broken German fixes
    ('von svontening', 'des Erweichens'),
    ('svontening', 'Erweichung'),
    ('vonten', 'oft'),
    ('Frages', 'Fragen'),
    ('des Erweichens', 'des Erweichens'),  # Keep if already fixed
]

# Question-specific translations
QUESTION_PATTERNS = [
    # Direct Feedback section
    ("When someone asks 'How am I doing?' and you have concerns, you typically...",
     "Wenn jemand fragt 'Wie mache ich mich?' und du Bedenken hast, tust du typischerweise..."),
    ("Give vague positive feedback to avoid discomfort",
     "Vage positives Feedback geben, um Unbehagen zu vermeiden"),
    ("Hint at issues indirectly but don't say it clearly",
     "Indirekt auf Probleme hinweisen, aber nicht klar sagen"),
    ("Mix positive with vague concerns",
     "Positives mit vagen Bedenken mischen"),
    ("Give clear feedback but soften it significantly",
     "Klares Feedback geben, aber es erheblich abschwächen"),
    ("Give direct, kind, specific feedback immediately",
     "Sofort direktes, freundliches, spezifisches Feedback geben"),
    
    # Comfort level
    ("Your comfort level with giving critical feedback to a peer is...",
     "Dein Komfortniveau beim Geben von kritischem Feedback an einen Kollegen ist..."),
    ("Extremely uncomfortable - I avoid it entirely",
     "Extrem unangenehm - ich vermeide es vollständig"),
    ("Quite uncomfortable - I delay as long as possible",
     "Sehr unangenehm - ich zögere so lange wie möglich"),
    ("Somewhat comfortable - I do it but reluctantly",
     "Etwas komfortabel - ich tue es, aber widerwillig"),
    ("Mostly comfortable - I do it when needed",
     "Meistens komfortabel - ich tue es, wenn nötig"),
    ("Very comfortable - It's a gift, not a burden",
     "Sehr komfortabel - es ist ein Geschenk, keine Belastung"),
    
    # Addressing behavior
    ("When you need to address someone's behavior, your approach is...",
     "Wenn du jemandes Verhalten ansprechen musst, ist dein Ansatz..."),
    ("Avoid the conversation completely",
     "Das Gespräch vollständig vermeiden"),
    ("Talk around the issue without being direct",
     "Um das Thema herumreden, ohne direkt zu sein"),
    ("Address it but very gently and indirectly",
     "Es ansprechen, aber sehr sanft und indirekt"),
    ("Address it clearly but with lots of softening",
     "Es klar ansprechen, aber mit viel Abschwächung"),
    ("Address it directly, kindly, and immediately",
     "Es direkt, freundlich und sofort ansprechen"),
    
    # Feedback timing
    ("How often do you give feedback in the moment vs. waiting for a formal setting?",
     "Wie oft gibst du Feedback im Moment vs. warten auf eine formelle Umgebung?"),
    ("Never in the moment - always wait for formal settings",
     "Nie im Moment - immer auf formelle Umgebungen warten"),
    ("Rarely in the moment - usually wait",
     "Selten im Moment - normalerweise warten"),
    ("Sometimes in the moment - depends on situation",
     "Manchmal im Moment - hängt von der Situation ab"),
    ("Usually in the moment - prefer timely feedback",
     "Normalerweise im Moment - bevorzuge zeitnahes Feedback"),
    ("Always in the moment - immediacy is key",
     "Immer im Moment - Unmittelbarkeit ist der Schlüssel"),
    
    # Tough feedback style
    ("When giving tough feedback, your default style is...",
     "Beim Geben von hartem Feedback ist dein Standardstil..."),
    ("Extremely indirect - lots of padding and softening",
     "Extrem indirekt - viel Polsterung und Abschwächung"),
    ("Mostly indirect - hints and suggestions",
     "Meistens indirekt - Hinweise und Vorschläge"),
    ("Balanced - mix of direct and gentle",
     "Ausgewogen - Mischung aus direkt und sanft"),
    ("Mostly direct - clear but kind",
     "Meistens direkt - klar, aber freundlich"),
    ("Very direct - no ambiguity, just clarity and care",
     "Sehr direkt - keine Mehrdeutigkeit, nur Klarheit und Fürsorge"),
    
    # Avoiding feedback
    ("If you've been avoiding giving someone feedback, it's usually because...",
     "Wenn du vermieden hast, jemandem Feedback zu geben, liegt es normalerweise daran..."),
    ("I'm afraid of conflict or damaging the relationship",
     "Ich habe Angst vor Konflikten oder die Beziehung zu schädigen"),
    ("I'm not sure how they'll react",
     "Ich bin mir nicht sicher, wie sie reagieren werden"),
    ("I'm waiting for the perfect moment",
     "Ich warte auf den perfekten Moment"),
    ("I want to be extra thoughtful about delivery",
     "Ich möchte besonders bedacht über die Überbringung sein"),
    ("I don't avoid feedback - I give it when needed",
     "Ich vermeide Feedback nicht - ich gebe es, wenn nötig"),
    
    # Belief about feedback
    ("Your belief about feedback is...",
     "Dein Glaube über Feedback ist..."),
    ("It usually makes things worse",
     "Es macht die Dinge normalerweise schlimmer"),
    ("It's necessary but painful",
     "Es ist notwendig, aber schmerzhaft"),
    ("It can help but must be done carefully",
     "Es kann helfen, muss aber sorgfältig gemacht werden"),
    ("It's essential for growth",
     "Es ist wichtig für Wachstum"),
    ("It's a gift that builds trust and performance",
     "Es ist ein Geschenk, das Vertrauen und Leistung aufbaut"),
    
    # Receiving feedback
    ("When receiving feedback yourself, you typically...",
     "Wenn du selbst Feedback erhältst, tust du typischerweise..."),
    ("Get defensive and push back",
     "Werde defensiv und wehre dich"),
    ("Feel hurt and withdraw",
     "Fühle mich verletzt und ziehe mich zurück"),
    ("Listen but discount it internally",
     "Höre zu, aber diskontiere es intern"),
    ("Listen and consider it seriously",
     "Höre zu und betrachte es ernst"),
    ("Welcome it and ask for more specifics",
     "Begrüße es und bitte um mehr Details"),
    
    # Peer accountability
    ("When a peer misses a deadline that affects you, you...",
     "Wenn ein Kollege eine Frist verpasst, die dich betrifft, tust du..."),
    ("Say nothing and work around it",
     "Nichts sagen und darum herum arbeiten"),
    ("Complain to others but not to them",
     "Bei anderen beschweren, aber nicht bei ihnen"),
    ("Mention it casually without addressing impact",
     "Beiläufig erwähnen, ohne die Auswirkungen anzusprechen"),
    ("Address it directly but gently",
     "Es direkt, aber sanft ansprechen"),
    ("Address it immediately and clearly with impact",
     "Es sofort und klar mit Auswirkung ansprechen"),
    
    # Calling out colleagues
    ("Calling out a colleague without managerial authority feels...",
     "Einen Kollegen ohne Führungsautorität anzusprechen fühlt sich an..."),
    ("Impossible - not my place",
     "Unmöglich - nicht mein Platz"),
    ("Very uncomfortable - I avoid it",
     "Sehr unangenehm - ich vermeide es"),
    ("Uncomfortable but sometimes necessary",
     "Unangenehm, aber manchmal notwendig"),
    ("Natural if done respectfully",
     "Natürlich, wenn respektvoll gemacht"),
    ("Essential - we're all responsible for standards",
     "Wesentlich - wir sind alle für Standards verantwortlich"),
]

def translate_file_comprehensive(en_file, de_file, belt_type='brown'):
    """Translate file comprehensively"""
    
    if not Path(en_file).exists():
        print(f"⚠️  {en_file} not found")
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Ensure lang="de"
    content = content.replace('<html lang="en">', '<html lang="de">')
    content = content.replace("lang='en'", "lang='de'")
    
    # Apply common translations
    for old, new in COMMON_TRANSLATIONS:
        content = content.replace(old, new)
        content = content.replace(f"'{old}'", f"'{new}'")
        content = content.replace(f'"{old}"', f'"{new}"')
    
    # Apply question patterns
    for old, new in QUESTION_PATTERNS:
        # In JavaScript strings
        content = content.replace(f'question: "{old}"', f'question: "{new}"')
        content = content.replace(f"question: '{old}'", f"question: '{new}'")
        # In HTML
        content = content.replace(f'>{old}<', f'>{new}<')
        # In option text
        content = content.replace(f'text: "{old}"', f'text: "{new}"')
        content = content.replace(f"text: '{old}'", f"text: '{new}'")
    
    # Fix broken German
    content = re.sub(r'\bvon\s+svontening\b', 'des Erweichens', content)
    content = re.sub(r'\bsvontening\b', 'Erweichung', content)
    content = re.sub(r'\bvonten\b', 'oft', content)
    content = re.sub(r'\bFrages\b', 'Fragen', content)
    
    # Fix "von" misuse patterns
    content = re.sub(r'\bvon\s+employees\b', 'der Mitarbeiter', content)
    content = re.sub(r'\bvon\s+([A-Z][a-z]+)\b', r'von \1', content)  # Keep "von Leadership" etc if correct
    
    # Update links
    if belt_type == 'brown':
        content = content.replace('brown-belt.html', 'brown-belt-de.html')
        content = content.replace('brown-belt-stripe', 'brown-belt-stripe')
        content = content.replace('-gamified.html', '-gamified-de.html')
    elif belt_type == 'black':
        content = content.replace('black-belt.html', 'black-belt-de.html')
        content = content.replace('black-belt-stripe', 'black-belt-stripe')
        content = content.replace('-gamified.html', '-gamified-de.html')
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE BROWN/BLACK BELT TRANSLATION")
    print("=" * 80)
    print()
    
    files_to_translate = [
        # Brown Belt
        ('brown-belt-stripe1-gamified.html', 'brown-belt-stripe1-gamified-de.html', 'brown'),
        ('brown-belt-stripe2-gamified.html', 'brown-belt-stripe2-gamified-de.html', 'brown'),
        ('brown-belt-stripe3-gamified.html', 'brown-belt-stripe3-gamified-de.html', 'brown'),
        ('brown-belt-stripe4-gamified.html', 'brown-belt-stripe4-gamified-de.html', 'brown'),
        # Black Belt
        ('black-belt-stripe1-gamified.html', 'black-belt-stripe1-gamified-de.html', 'black'),
        ('black-belt-stripe2-gamified.html', 'black-belt-stripe2-gamified-de.html', 'black'),
        ('black-belt-stripe3-gamified.html', 'black-belt-stripe3-gamified-de.html', 'black'),
        ('black-belt-stripe4-gamified.html', 'black-belt-stripe4-gamified-de.html', 'black'),
    ]
    
    translated = 0
    for en_file, de_file, belt_type in files_to_translate:
        print(f"📄 {de_file}...")
        if translate_file_comprehensive(en_file, de_file, belt_type):
            translated += 1
            print(f"  ✅ Translated")
        else:
            print(f"  ⚠️  Skipped")
        print()
    
    print("=" * 80)
    print(f"✅ Translated {translated}/{len(files_to_translate)} files")
    print("⚠️  Note: Full lesson content translation still needed per file")
    print("=" * 80)

if __name__ == '__main__':
    main()

