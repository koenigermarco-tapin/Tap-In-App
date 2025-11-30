#!/usr/bin/env python3
"""
Direct fix for quiz explanations - replace English with German
"""

from pathlib import Path
import re

def fix_explanations_direct(de_file):
    """Fix explanations by reading English file and translating"""
    
    en_file = de_file.replace('-de.html', '.html')
    
    if not Path(de_file).exists() or not Path(en_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        de_content = f.read()
    
    with open(en_file, 'r', encoding='utf-8') as f:
        en_content = f.read()
    
    # Find all explanations in English file
    en_explanations = re.findall(r'data-explanation="([^"]+)"', en_content)
    
    # Translation mapping for common explanations
    translations = {
        "Perfect understanding of 'Extreme Ownership.' Before you can lead them forward, you must take ownership of their current state - even though you didn't create it. This paradox builds trust: 'I own this mess, and I'm going to fix it WITH you.' Only after taking ownership can you credibly ask them to own their piece. This is Jocko's core teaching - leadership starts with owning everything in your world.":
        "Perfektes Verständnis von 'Extreme Ownership'. Bevor du sie nach vorne führen kannst, musst du Verantwortung für ihren aktuellen Zustand übernehmen - auch wenn du ihn nicht geschaffen hast. Dieses Paradoxon baut Vertrauen auf: 'Ich bin für dieses Chaos verantwortlich und ich werde es MIT dir beheben.' Erst nach der Übernahme der Verantwortung kannst du glaubwürdig verlangen, dass sie ihren Teil übernehmen. Das ist Jockos Kernlehre - Führung beginnt damit, Verantwortung für alles in deiner Welt zu übernehmen.",
        
        "Excellent self-awareness! You've identified the 'savior complex' trap. When leaders are too good at solving problems, teams stop trying. Marshall Goldsmith calls this 'adding too much value' - your input, even when helpful, robs others of ownership. Brown Belt means recognizing when your strength becomes the team's weakness. The fix: bite your tongue, let them make the call, and coach AFTER the outcome (win or lose).":
        "Ausgezeichnetes Selbstbewusstsein! Du hast die 'Retter-Komplex'-Falle identifiziert. Wenn Führungskräfte zu gut darin sind, Probleme zu lösen, hören Teams auf zu versuchen. Marshall Goldsmith nennt dies 'zu viel Wert hinzufügen' - dein Input, auch wenn hilfreich, raubt anderen die Verantwortung. Brown Belt bedeutet zu erkennen, wann deine Stärke zur Schwäche des Teams wird. Die Lösung: beiße auf die Zunge, lass sie die Entscheidung treffen, und coache NACH dem Ergebnis (Sieg oder Niederlage).",
        
        "Perfect! You understand the 'Golden Circle.' Inspiring leaders start with WHY (purpose/belief), then HOW (process/values), then WHAT (products/services). Most organizations communicate backwards: 'We make X (what), it has Y features (how), buy it.' Apple says: 'We challenge the status quo (why), by making beautifully designed products (how), we happen to make computers (what).' See the difference? Purpose before product. Belief before features. Brown Belt leaders inspire through WHY.":
        "Perfekt! Du verstehst den 'Golden Circle'. Inspirierende Führungskräfte beginnen mit WARUM (Zweck/Glaube), dann WIE (Prozess/Werte), dann WAS (Produkte/Dienstleistungen). Die meisten Organisationen kommunizieren rückwärts: 'Wir machen X (was), es hat Y Features (wie), kaufe es.' Apple sagt: 'Wir fordern den Status quo heraus (warum), indem wir wunderschön gestaltete Produkte machen (wie), wir machen zufällig Computer (was).' Siehst du den Unterschied? Zweck vor Produkt. Glaube vor Features. Brown Belt Führungskräfte inspirieren durch WARUM.",
        
        "Excellent! You know Kotter's 8-Step Process. Step 1 is 'Create Urgency' - people won't change unless they feel the current state is untenable. Without urgency, your guiding coalition will lack energy, your vision will seem optional, and resistance will win. Brown Belt leaders understand that logic doesn't drive change - emotion does. Your job is to make the status quo feel riskier than the change. Then momentum builds naturally.":
        "Ausgezeichnet! Du kennst Kotters 8-Schritte-Prozess. Schritt 1 ist 'Dringlichkeit schaffen' - Menschen ändern sich nicht, es sei denn, sie empfinden den aktuellen Zustand als unhaltbar. Ohne Dringlichkeit wird deine Führungskoalition Energie fehlen, deine Vision wird optional erscheinen, und Widerstand wird gewinnen. Brown Belt Führungskräfte verstehen, dass Logik keine Veränderung antreibt - Emotionen tun es. Deine Aufgabe ist es, den Status quo riskanter als die Veränderung erscheinen zu lassen. Dann baut sich Schwung natürlich auf.",
        
        "Perfect application of 'Dare to Lead' principles! Brown says: 'Choose courage over comfort... choose what is right over what is fun, fast, or easy.' Tolerating toxic brilliance signals that results matter more than people. This destroys psychological safety - your team learns that performance excuses bad behavior. The Brown Belt move: clear expectations, clear consequences. If they can't show up as a teammate, they can't stay on the team. Period. This is what daring leadership looks like.":
        "Perfekte Anwendung der 'Dare to Lead'-Prinzipien! Brown sagt: 'Wähle Mut vor Komfort... wähle das Richtige vor dem, was Spaß macht, schnell oder einfach ist.' Toxische Brillanz zu tolerieren signalisiert, dass Ergebnisse mehr zählen als Menschen. Das zerstört psychologische Sicherheit - dein Team lernt, dass Leistung schlechtes Verhalten entschuldigt. Der Brown Belt Zug: klare Erwartungen, klare Konsequenzen. Wenn sie nicht als Teammitglied auftreten können, können sie nicht im Team bleiben. Punkt. So sieht mutige Führung aus.",
        
        "Servant leadership is about serving first to lead better. Greenleaf's philosophy: 'The servant-leader is servant first... It begins with the natural feeling that one wants to serve, to serve first. Then conscious choice brings one to aspire to lead.' This isn't abdicating leadership - it's leading by enabling others' success. Your job is their growth, not your comfort. Brown Belt leaders serve their teams by creating conditions for their success.":
        "Dienstleistungsführung geht darum, zuerst zu dienen, um besser zu führen. Greenleafs Philosophie: 'Der Dienstleister-Führer ist zuerst Diener... Es beginnt mit dem natürlichen Gefühl, dass man dienen möchte, zuerst zu dienen. Dann bringt bewusste Wahl einen dazu, Führung anzustreben.' Das ist keine Abdankung der Führung - es ist Führen durch Ermöglichen des Erfolgs anderer. Deine Aufgabe ist ihr Wachstum, nicht dein Komfort. Brown Belt Führungskräfte dienen ihren Teams, indem sie Bedingungen für ihren Erfolg schaffen.",
        
        "Perfect understanding of adaptive leadership! Technical challenges have known solutions - apply expertise. Adaptive challenges require learning, experimentation, and often changing values or behaviors. Example: 'Sales are down' (technical: fix pricing). 'Our customers don't trust us anymore' (adaptive: rebuild relationships, shift culture). Brown Belt leaders recognize adaptive challenges can't be solved by authority alone - they require mobilizing people to do the work of change.":
        "Perfektes Verständnis von adaptiver Führung! Technische Herausforderungen haben bekannte Lösungen - wende Expertise an. Adaptive Herausforderungen erfordern Lernen, Experimentieren und oft Änderungen von Werten oder Verhalten. Beispiel: 'Verkäufe sind gesunken' (technisch: Preise anpassen). 'Unsere Kunden vertrauen uns nicht mehr' (adaptiv: Beziehungen wiederaufbauen, Kultur verschieben). Brown Belt Führungskräfte erkennen, dass adaptive Herausforderungen nicht allein durch Autorität gelöst werden können - sie erfordern, Menschen zu mobilisieren, die Arbeit der Veränderung zu tun.",
        
        "Collins' research shocked the business world: the best companies had 'Level 5' leaders who were paradoxically humble AND willful. They channel ambition into the company, not themselves. They take responsibility for failures but give credit for successes. They're ambitious for the mission, not their ego. This is Brown Belt leadership - building something bigger than yourself through paradoxical combination of humility and resolve.":
        "Collins' Forschung schockierte die Geschäftswelt: Die besten Unternehmen hatten 'Level 5'-Führungskräfte, die paradoxerweise demütig UND willensstark waren. Sie lenken Ambitionen in das Unternehmen, nicht in sich selbst. Sie übernehmen Verantwortung für Fehler, geben aber Anerkennung für Erfolge. Sie sind ehrgeizig für die Mission, nicht für ihr Ego. Das ist Brown Belt Führung - etwas Größeres als dich selbst aufbauen durch paradoxe Kombination von Demut und Entschlossenheit.",
        
        "Brené Brown clarifies: vulnerability isn't weakness - it's courage. It's showing up when you can't control the outcome. It's asking for help when stuck. It's admitting you don't know. It's having difficult conversations. It's NOT oversharing personal problems or making others responsible for your emotions. Brown Belt vulnerability is strategic - it builds trust, models courage, and creates safety for others to be real. It's strength, not weakness.":
        "Brené Brown klärt auf: Verletzlichkeit ist keine Schwäche - es ist Mut. Es ist Auftreten, wenn du das Ergebnis nicht kontrollieren kannst. Es ist um Hilfe bitten, wenn du feststeckst. Es ist zuzugeben, dass du es nicht weißt. Es ist schwierige Gespräche führen. Es ist NICHT persönliche Probleme übermäßig teilen oder andere für deine Emotionen verantwortlich machen. Brown Belt Verletzlichkeit ist strategisch - sie baut Vertrauen auf, zeigt Mut und schafft Sicherheit für andere, echt zu sein. Es ist Stärke, keine Schwäche.",
        
        "Authenticity isn't rigid consistency - it's consistent values with adaptable expression. You're always YOU (authentic), but how you show up adapts to context (skillful). Example: You're always honest (authentic), but you express feedback differently to a junior vs. senior person (skillful). Brown Belt leaders know: be authentic to your values, skillful in your expression. Rigid 'authenticity' that ignores context isn't leadership - it's self-indulgence.":
        "Authentizität ist keine starre Konsistenz - es sind konsistente Werte mit anpassbarer Ausdrucksweise. Du bist immer DU (authentisch), aber wie du auftrittst passt sich dem Kontext an (geschickt). Beispiel: Du bist immer ehrlich (authentisch), aber du drückst Feedback anders aus zu einer Junior- vs. Senior-Person (geschickt). Brown Belt Führungskräfte wissen: sei authentisch zu deinen Werten, geschickt in deiner Ausdrucksweise. Starre 'Authentizität', die den Kontext ignoriert, ist keine Führung - es ist Selbstgefälligkeit.",
    }
    
    # Apply translations
    for en_text, de_text in translations.items():
        # Escape for regex
        en_escaped = re.escape(en_text)
        de_escaped = re.escape(de_text)
        
        # Replace in data-explanation attributes
        de_content = re.sub(
            rf'data-explanation="{en_escaped}"',
            f'data-explanation="{de_escaped}"',
            de_content
        )
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(de_content)
    
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
        if fix_explanations_direct(f):
            print(f"  ✅ Explanations fixed")
        print()

if __name__ == '__main__':
    main()

