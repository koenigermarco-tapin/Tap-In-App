#!/usr/bin/env python3
"""
Comprehensive translation of JavaScript questions arrays (37 questions per file)
Translates all question text and option text in the questions array
"""

from pathlib import Path
import re

def translate_questions_array(de_file):
    """Translate all questions in JavaScript array"""
    
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Common question translations
    question_translations = [
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
        
        # Peer Accountability section
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
        
        ("When you see a team member slacking but management hasn't noticed...",
         "Wenn du siehst, dass ein Teammitglied faulenzt, aber das Management es nicht bemerkt hat..."),
        ("Do nothing - not my job",
         "Nichts tun - nicht meine Aufgabe"),
        ("Hope management notices eventually",
         "Hoffen, dass das Management es schließlich bemerkt"),
        ("Mention it vaguely to the person",
         "Es der Person vage erwähnen"),
        ("Talk to management about it",
         "Mit dem Management darüber sprechen"),
        ("Address it directly with the person first",
         "Es zuerst direkt mit der Person ansprechen"),
        
        ("Your approach to peer accountability is...",
         "Dein Ansatz zu Peer-Verantwortlichkeit ist..."),
        ("Not my responsibility - managers should do it",
         "Nicht meine Verantwortung - Manager sollten es tun"),
        ("I'll do it but only if absolutely necessary",
         "Ich werde es tun, aber nur wenn absolut notwendig"),
        ("I'll mention it if it directly affects me",
         "Ich werde es erwähnen, wenn es mich direkt betrifft"),
        ("I'll address it when I see it, especially if it affects the team",
         "Ich werde es ansprechen, wenn ich es sehe, besonders wenn es das Team betrifft"),
        ("I actively hold peers accountable - it's part of being a good teammate",
         "Ich halte Kollegen aktiv zur Verantwortung - es ist Teil davon, ein gutes Teammitglied zu sein"),
        
        # Self Accountability section
        ("When you miss a commitment, you typically...",
         "Wenn du eine Verpflichtung verpasst, tust du normalerweise..."),
        ("Make excuses or blame external factors",
         "Ausreden machen oder externe Faktoren beschuldigen"),
        ("Apologize but don't fully own the impact",
         "Entschuldigung sagen, aber die Auswirkung nicht vollständig übernehmen"),
        ("Apologize and explain what happened",
         "Entschuldigung sagen und erklären, was passiert ist"),
        ("Apologize, own the impact, and propose a solution",
         "Entschuldigung sagen, die Auswirkung übernehmen und eine Lösung vorschlagen"),
        ("Immediately own it, address the impact, and fix it without excuses",
         "Sofort übernehmen, die Auswirkung ansprechen und ohne Ausreden beheben"),
        
        ("If someone asks you to lower standards 'just this once,' you...",
         "Wenn dich jemand bittet, Standards 'nur diesmal' zu senken, tust du..."),
        ("Agree - flexibility is important",
         "Zustimmen - Flexibilität ist wichtig"),
        ("Reluctantly agree to maintain harmony",
         "Widerwillig zustimmen, um Harmonie zu bewahren"),
        ("Politely decline and explain why standards matter",
         "Höflich ablehnen und erklären, warum Standards wichtig sind"),
        ("Firmly decline - standards aren't negotiable",
         "Fest ablehnen - Standards sind nicht verhandelbar"),
        
        # Cultural Accountability
        ("When a team value is violated but it's not directly your responsibility...",
         "Wenn ein Teamwert verletzt wird, aber es nicht direkt deine Verantwortung ist..."),
        ("Say nothing - not my problem",
         "Nichts sagen - nicht mein Problem"),
        ("Mention it to someone else who might address it",
         "Es jemand anderem erwähnen, der es ansprechen könnte"),
        ("Address it directly even though it's not 'my job'",
         "Es direkt ansprechen, auch wenn es nicht 'meine Aufgabe' ist"),
    ]
    
    # Apply translations to question and text fields
    for old, new in question_translations:
        # In question: field
        content = re.sub(
            rf'question:\s*"{re.escape(old)}"',
            f'question: "{new}"',
            content
        )
        content = re.sub(
            rf"question:\s*'{re.escape(old)}'",
            f"question: '{new}'",
            content
        )
        # In text: field
        content = re.sub(
            rf'text:\s*"{re.escape(old)}"',
            f'text: "{new}"',
            content
        )
        content = re.sub(
            rf"text:\s*'{re.escape(old)}'",
            f"text: '{new}'",
            content
        )
    
    # Fix section comments
    content = content.replace('// SECTION 1: DIRECT FEEDBACK (Frages 1-8)',
                              '// SECTION 1: DIREKTES FEEDBACK (Fragen 1-8)')
    content = content.replace('// SECTION 2: PEER ACCOUNTABILITY (Frages 9-16)',
                              '// SECTION 2: PEER-VERANTWORTLICHKEIT (Fragen 9-16)')
    content = content.replace('// SECTION 3: SELF ACCOUNTABILITY',
                              '// SECTION 3: SELBST-VERANTWORTLICHKEIT')
    content = content.replace('// SECTION 4: CULTURAL ACCOUNTABILITY',
                              '// SECTION 4: KULTURELLE VERANTWORTLICHKEIT')
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    files = [
        'brown-belt-stripe1-gamified-de.html',
        'brown-belt-stripe2-gamified-de.html',
        'brown-belt-stripe3-gamified-de.html',
        'brown-belt-stripe4-gamified-de.html',
        'black-belt-stripe1-gamified-de.html',
        'black-belt-stripe2-gamified-de.html',
        'black-belt-stripe3-gamified-de.html',
        'black-belt-stripe4-gamified-de.html',
    ]
    
    for f in files:
        print(f"📄 {f}...")
        if translate_questions_array(f):
            print(f"  ✅ Questions array translated")
        print()

if __name__ == '__main__':
    main()

