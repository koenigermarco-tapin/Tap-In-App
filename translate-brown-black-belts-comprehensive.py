#!/usr/bin/env python3
"""
Comprehensive translation of Brown and Black Belt German files
Translates all content: lessons, quizzes, JavaScript strings, UI elements
"""

from pathlib import Path
import re

def translate_brown_belt_stripe1():
    """Translate Brown Belt Stripe 1 comprehensively"""
    
    de_file = 'brown-belt-stripe1-gamified-de.html'
    en_file = 'brown-belt-stripe1-gamified.html'
    
    if not Path(de_file).exists() or not Path(en_file).exists():
        print(f"⚠️  Files not found")
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix broken German first
    broken_fixes = [
        ('von', 'von'),  # Keep "von" when it's correct, but fix "von svontening" etc
        ('svontening', 'des Erweichens'),  # "softening"
        ('vonten', 'oft'),  # "often"
        ('Frage', 'Frage'),  # Keep when correct
        ('Frages', 'Fragen'),  # Plural
    ]
    
    # Comprehensive translations
    translations = [
        # Title
        ('Brown Belt Streifen 1: Accountability Foundation | TAP-IN', 
         'Brown Belt Streifen 1: Verantwortlichkeits-Grundlage | TAP-IN'),
        
        # Header
        ('🎯 Welcome to Brown Belt', '🎯 Willkommen zum Brown Belt'),
        ('You\'ve built trust, mastered conflict, secured commitment, and focused on results. Now comes the hardest skill of all:',
         'Du hast Vertrauen aufgebaut, Konflikte gemeistert, Verpflichtung gesichert und dich auf Ergebnisse konzentriert. Jetzt kommt die schwierigste Fähigkeit von allen:'),
        ('holding people accountable', 'Menschen zur Verantwortung ziehen'),
        ('Accountability isn\'t about being the bad guy. It\'s about caring enough to speak up when standards slip, calling out behavior that hurts the team, and having the courage to say what needs to be said.',
         'Verantwortlichkeit geht nicht darum, der Böse zu sein. Es geht darum, genug zu kümmern, um zu sprechen, wenn Standards sinken, Verhalten anzusprechen, das dem Team schadet, und den Mut zu haben, das zu sagen, was gesagt werden muss.'),
        
        # Assessment Details
        ('⏱️ Assessment Details', '⏱️ Bewertungsdetails'),
        ('Questions:', 'Fragen:'),
        ('Time:', 'Zeit:'),
        ('Format:', 'Format:'),
        ('Honest self-assessment', 'Ehrliche Selbsteinschätzung'),
        ('Begin Assessment →', 'Bewertung starten →'),
        
        # Quiz Section
        ('🎯 Test Your Knowledge', '🎯 Teste dein Wissen'),
        ('Complete this quiz to validate your understanding of this stripe\'s content.',
         'Schließe dieses Quiz ab, um dein Verständnis für den Inhalt dieses Streifens zu überprüfen.'),
        
        # Quiz Questions - Q1
        ('Question 1 of 10', 'Frage 1 von 10'),
        ('You\'ve been promoted to lead a struggling team. The previous manager was beloved but ineffective - the team is comfortable but underperforming. Your mentor Jocko would likely advise you to:',
         'Du wurdest befördert, um ein kämpfendes Team zu führen. Der vorherige Manager war beliebt, aber ineffektiv - das Team ist bequem, aber unterdurchschnittlich. Dein Mentor Jocko würde dir wahrscheinlich raten:'),
        ('Immediately set higher standards to shift the culture quickly',
         'Sofort höhere Standards setzen, um die Kultur schnell zu ändern'),
        ('Build relationships first, then gradually raise expectations',
         'Zuerst Beziehungen aufbauen, dann schrittweise Erwartungen erhöhen'),
        ('Take extreme ownership of past failures before changing anything',
         'Extreme Verantwortung für vergangene Fehler übernehmen, bevor etwas geändert wird'),
        ('Replace underperformers to signal the new standard',
         'Unterdurchschnittliche Mitarbeiter ersetzen, um den neuen Standard zu signalisieren'),
        
        # Fix broken "von" phrases
        ('Perfect understanding von', 'Perfektes Verständnis von'),
        ('ownership von their current state', 'Verantwortung für ihren aktuellen Zustand'),
        ('Jocko\'s core teaching', 'Jockos Kernlehre'),
        ('leadership starts with owning everything in your world',
         'Führung beginnt damit, Verantwortung für alles in deiner Welt zu übernehmen'),
        
        # Q2
        ('Question 2 of 10', 'Frage 2 von 10'),
        ('Your team respects you for your technical expertise, but you notice they wait for your approval on decisions they should own. According to leadership research, this pattern indicates:',
         'Dein Team respektiert dich für dein technisches Fachwissen, aber du bemerkst, dass sie auf deine Zustimmung bei Entscheidungen warten, die sie selbst treffen sollten. Laut Führungsforschung zeigt dieses Muster:'),
        ('Laut leadership Forschung', 'Laut Führungsforschung'),
        ('Your team lacks confidence and needs more training',
         'Deinem Team fehlt das Vertrauen und es braucht mehr Training'),
        ('You\'ve accidentally created dependency instead of capability',
         'Du hast versehentlich Abhängigkeit statt Fähigkeit geschaffen'),
        ('You\'ve accidentally created dependency instead von capability',
         'Du hast versehentlich Abhängigkeit statt Fähigkeit geschaffen'),
        ('This is normal - leaders should quality-check important decisions',
         'Das ist normal - Führungskräfte sollten wichtige Entscheidungen qualitätsprüfen'),
        ('Your team is being appropriately cautious and risk-averse',
         'Dein Team ist angemessen vorsichtig und risikoscheu'),
        ('savior complex', 'Retter-Komplex'),
        ('adding too much value', 'zu viel Wert hinzufügen'),
        ('robs others von ownership', 'raubt anderen die Verantwortung'),
        ('Brown Belt means recognizing when your strength becomes the team\'s weakness',
         'Brown Belt bedeutet, zu erkennen, wann deine Stärke zur Schwäche des Teams wird'),
        ('bite your tongue, let them make the call',
         'beiße auf die Zunge, lass sie die Entscheidung treffen'),
        ('coach AFTER the outcome', 'coache NACH dem Ergebnis'),
        
        # Q3
        ('Question 3 of 10', 'Frage 3 von 10'),
        ('Simon Sinek\'s \'Start with Why\' suggests that inspiring leaders communicate in this order:',
         'Simon Sineks "Start with Why" schlägt vor, dass inspirierende Führungskräfte in dieser Reihenfolge kommunizieren:'),
        ('What we do → How we do it → Why we do it (outside-in)',
         'Was wir tun → Wie wir es tun → Warum wir es tun (von außen nach innen)'),
        ('Why we do it → How we do it → What we do (inside-out)',
         'Warum wir es tun → Wie wir es tun → Was wir tun (von innen nach außen)'),
        ('How we do it → What we do → Why we do it (process-first)',
         'Wie wir es tun → Was wir tun → Warum wir es tun (prozessorientiert)'),
        ('What we do → Why we do it → How we do it (results-first)',
         'Was wir tun → Warum wir es tun → Wie wir es tun (ergebnisorientiert)'),
        ('Perfect! You understand the \'Golden Circle.\'',
         'Perfekt! Du verstehst den "Golden Circle".'),
        ('Inspiring leaders start with WHY (purpose/belief), then HOW (process/values), then WHAT (products/services).',
         'Inspirierende Führungskräfte beginnen mit WARUM (Zweck/Glaube), dann WIE (Prozess/Werte), dann WAS (Produkte/Dienstleistungen).'),
        ('Purpose before product. Belief before features. Brown Belt leaders inspire through WHY.',
         'Zweck vor Produkt. Glaube vor Features. Brown Belt Führungskräfte inspirieren durch WARUM.'),
        
        # Q4
        ('Question 4 of 10', 'Frage 4 von 10'),
        ('You\'re implementing a major change. Kotter\'s research on change management says your FIRST step should be:',
         'Du implementierst eine größere Veränderung. Kotters Forschung zum Change Management sagt, dein ERSTER Schritt sollte sein:'),
        ('Kotter\'s Forschung', 'Kotters Forschung'),
        ('Form a guiding coalition of key influencers',
         'Eine Führungskoalition wichtiger Influencer bilden'),
        ('Form a guiding coalition von key influencers',
         'Eine Führungskoalition wichtiger Influencer bilden'),
        ('Create a sense of urgency around the need for change',
         'Ein Gefühl der Dringlichkeit für die Notwendigkeit der Veränderung schaffen'),
        ('Create a sense von urgency around the need for change',
         'Ein Gefühl der Dringlichkeit für die Notwendigkeit der Veränderung schaffen'),
        ('Develop a clear vision for where you\'re heading',
         'Eine klare Vision entwickeln, wohin du gehst'),
        ('Communicate the change vision repeatedly',
         'Die Veränderungsvision wiederholt kommunizieren'),
        ('Excellent! You know Kotter\'s 8-Step Process.',
         'Ausgezeichnet! Du kennst Kotters 8-Schritte-Prozess.'),
        ('Step 1 is \'Create Urgency\' - people won\'t change unless they feel the current state is untenable.',
         'Schritt 1 ist "Dringlichkeit schaffen" - Menschen ändern sich nicht, es sei denn, sie empfinden den aktuellen Zustand als unhaltbar.'),
        ('Brown Belt leaders understand that logic doesn\'t drive change - emotion does.',
         'Brown Belt Führungskräfte verstehen, dass Logik keine Veränderung antreibt - Emotionen tun es.'),
        ('Your job is to make the status quo feel riskier than the change.',
         'Deine Aufgabe ist es, den Status quo riskanter als die Veränderung erscheinen zu lassen.'),
        
        # Q5
        ('Question 5 of 10', 'Frage 5 von 10'),
        ('Your star performer is brilliant individually but toxic to team culture. Brené Brown\'s research on belonging would suggest:',
         'Dein Star-Performer ist individuell brillant, aber toxisch für die Teamkultur. Brené Browns Forschung zu Zugehörigkeit würde vorschlagen:'),
        ('Brené Brown\'s Forschung', 'Brené Browns Forschung'),
        ('Coach them privately but keep them - talent trumps culture',
         'Coache sie privat, aber behalte sie - Talent schlägt Kultur'),
        ('Create clear boundaries: change behavior or exit the team',
         'Klare Grenzen schaffen: Verhalten ändern oder das Team verlassen'),
        ('Accept this trade-off - high performers are always difficult',
         'Diesen Kompromiss akzeptieren - Hochleister sind immer schwierig'),
        ('Move them to an individual contributor role',
         'Sie in eine individuelle Beitragsrolle versetzen'),
        ('Choose courage over comfort',
         'Mut vor Komfort wählen'),
        ('choose what is right over what is fun, fast, or easy',
         'das Richtige wählen statt das, was Spaß macht, schnell oder einfach ist'),
        ('Tolerating toxic brilliance signals that results matter more than people.',
         'Toxische Brillanz zu tolerieren signalisiert, dass Ergebnisse mehr zählen als Menschen.'),
        ('This destroys psychological safety',
         'Das zerstört psychologische Sicherheit'),
        ('If they can\'t show up as a teammate, they can\'t stay on the team.',
         'Wenn sie nicht als Teammitglied auftreten können, können sie nicht im Team bleiben.'),
        
        # Q6
        ('Question 6 of 10', 'Frage 6 von 10'),
        ('Servant leadership, as taught by Robert Greenleaf, means:',
         'Dienstleistungsführung, wie von Robert Greenleaf gelehrt, bedeutet:'),
        ('Doing whatever your team asks you to do',
         'Zu tun, was dein Team dich bittet'),
        ('Putting your team\'s needs before your own in service of their growth',
         'Die Bedürfnisse deines Teams vor deine eigenen zu stellen, im Dienst ihres Wachstums'),
        ('Being humble and never making decisions yourself',
         'Bescheiden sein und nie selbst Entscheidungen treffen'),
        ('Leading from behind and letting the team take credit',
         'Von hinten führen und das Team die Anerkennung bekommen lassen'),
        ('The servant-leader is servant first',
         'Der Dienstleister-Führer ist zuerst Diener'),
        ('Your job is their growth, not your comfort.',
         'Deine Aufgabe ist ihr Wachstum, nicht dein Komfort.'),
        
        # Q7
        ('Question 7 of 10', 'Frage 7 von 10'),
        ('Ronald Heifetz distinguishes between \'technical\' and \'adaptive\' challenges. An adaptive challenge requires:',
         'Ronald Heifetz unterscheidet zwischen "technischen" und "adaptiven" Herausforderungen. Eine adaptive Herausforderung erfordert:'),
        ('Expert knowledge to solve - you already have the answer',
         'Expertenwissen zur Lösung - du hast bereits die Antwort'),
        ('Learning and experimentation - the answer isn\'t known yet',
         'Lernen und Experimentieren - die Antwort ist noch nicht bekannt'),
        ('More resources or better processes',
         'Mehr Ressourcen oder bessere Prozesse'),
        ('Clear authority to make decisions',
         'Klare Autorität, Entscheidungen zu treffen'),
        ('Technical challenges have known solutions - apply expertise.',
         'Technische Herausforderungen haben bekannte Lösungen - wende Expertise an.'),
        ('Adaptive challenges require learning, experimentation, and often changing values or behaviors.',
         'Adaptive Herausforderungen erfordern Lernen, Experimentieren und oft Änderungen von Werten oder Verhalten.'),
        ('Brown Belt leaders recognize adaptive challenges can\'t be solved by authority alone',
         'Brown Belt Führungskräfte erkennen, dass adaptive Herausforderungen nicht allein durch Autorität gelöst werden können'),
        
        # Q8
        ('Question 8 of 10', 'Frage 8 von 10'),
        ('Jim Collins\' research on \'Level 5 Leadership\' found that the best leaders combine:',
         'Jim Collins\' Forschung zu "Level 5 Leadership" fand, dass die besten Führungskräfte kombinieren:'),
        ('Humility and fierce resolve for results',
         'Demut und entschlossene Entschlossenheit für Ergebnisse'),
        ('Vision and execution capability',
         'Vision und Ausführungsfähigkeit'),
        ('Charisma and strategic thinking',
         'Charisma und strategisches Denken'),
        ('Intelligence and decisiveness',
         'Intelligenz und Entschlossenheit'),
        ('Collins\' research shocked the business world',
         'Collins\' Forschung schockierte die Geschäftswelt'),
        ('They channel ambition into the company, not themselves.',
         'Sie lenken Ambitionen in das Unternehmen, nicht in sich selbst.'),
        ('They take responsibility for failures but give credit for successes.',
         'Sie übernehmen Verantwortung für Fehler, geben aber Anerkennung für Erfolge.'),
        
        # Q9
        ('Question 9 of 10', 'Frage 9 von 10'),
        ('True or False: Vulnerability in leadership means sharing your weaknesses with your team.',
         'Wahr oder Falsch: Verletzlichkeit in der Führung bedeutet, deine Schwächen mit deinem Team zu teilen.'),
        ('True - vulnerability means exposing your weaknesses',
         'Wahr - Verletzlichkeit bedeutet, deine Schwächen zu enthüllen'),
        ('False - vulnerability means courage to show up, take risks, and be seen even when you can\'t control the outcome',
         'Falsch - Verletzlichkeit bedeutet Mut, aufzutreten, Risiken einzugehen und gesehen zu werden, auch wenn du das Ergebnis nicht kontrollieren kannst'),
        ('Brené Brown clarifies: vulnerability isn\'t weakness - it\'s courage.',
         'Brené Brown klärt auf: Verletzlichkeit ist keine Schwäche - es ist Mut.'),
        ('It\'s showing up when you can\'t control the outcome.',
         'Es ist Auftreten, wenn du das Ergebnis nicht kontrollieren kannst.'),
        ('It\'s asking for help when stuck.',
         'Es ist um Hilfe bitten, wenn du feststeckst.'),
        ('It\'s admitting you don\'t know.',
         'Es ist zuzugeben, dass du es nicht weißt.'),
        
        # Q10
        ('Question 10 of 10', 'Frage 10 von 10'),
        ('Leadership presence and authenticity means:',
         'Führungspräsenz und Authentizität bedeutet:'),
        ('Always being yourself, no matter what',
         'Immer du selbst zu sein, egal was'),
        ('Being consistently yourself while adapting your style to context',
         'Konsistent du selbst zu sein, während du deinen Stil an den Kontext anpasst'),
        ('Never changing your approach regardless of situation',
         'Nie den Ansatz ändern, unabhängig von der Situation'),
        ('Mimicking successful leaders until it becomes natural',
         'Erfolgreiche Führungskräfte nachahmen, bis es natürlich wird'),
        ('Authenticity isn\'t rigid consistency - it\'s consistent values with adaptable expression.',
         'Authentizität ist keine starre Konsistenz - es sind konsistente Werte mit anpassbarer Ausdrucksweise.'),
        ('be authentic to your values, skillful in your expression',
         'sei authentisch zu deinen Werten, geschickt in deinem Ausdruck'),
        
        # Quiz Completion
        ('Quiz Complete! 🎉', 'Quiz abgeschlossen! 🎉'),
        ('You scored:', 'Deine Punktzahl:'),
        ('/10', '/10'),
        ('+50 XP awarded!', '+50 XP vergeben!'),
        ('Continue', 'Weiter'),
        
        # Navigation
        ('← Back to Brown Belt', '← Zurück zum Brown Belt'),
        ('Continue to Stripe 2 →', 'Weiter zu Streifen 2 →'),
        ('← Previous', '← Zurück'),
        ('Next →', 'Weiter →'),
        ('brown-belt.html', 'brown-belt-de.html'),
        ('brown-belt-stripe2-gamified.html', 'brown-belt-stripe2-gamified-de.html'),
        
        # JavaScript strings
        ('Complete this quiz to validate your mastery. ⚫ Black Belt requires 85% to pass (9/10 correct).',
         'Schließe dieses Quiz ab, um deine Meisterschaft zu überprüfen. ⚫ Black Belt erfordert 85% zum Bestehen (9/10 richtig).'),
        
        # Fix common errors
        ('Dein team', 'Dein Team'),
        ('dein team', 'dein Team'),
        ('Deine team', 'Dein Team'),
    ]
    
    # Apply all translations
    for old, new in translations:
        content = content.replace(old, new)
        # Also replace in quotes
        content = content.replace(f"'{old}'", f"'{new}'")
        content = content.replace(f'"{old}"', f'"{new}"')
        # Replace in HTML attributes
        content = content.replace(f'>{old}<', f'>{new}<')
    
    # Fix broken German patterns
    content = re.sub(r'\bvon\s+svontening\b', 'des Erweichens', content)
    content = re.sub(r'\bvonten\b', 'oft', content)
    content = re.sub(r'\bvon\s+([A-Z])', r'von \1', content)  # Fix "von Employees" -> "von Employees" (keep if correct)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated comprehensively")
    return True

def main():
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE BROWN/BLACK BELT TRANSLATION")
    print("=" * 80)
    print()
    
    print("📄 Brown Belt Stripe 1...")
    if translate_brown_belt_stripe1():
        print("  ✅ Complete")
    else:
        print("  ❌ Failed")
    
    print()
    print("=" * 80)
    print("✅ Step 1 complete - Brown Belt Stripe 1")
    print("⚠️  Remaining: 7 more files (Brown 2-4, Black 1-4)")
    print("=" * 80)

if __name__ == '__main__':
    main()

