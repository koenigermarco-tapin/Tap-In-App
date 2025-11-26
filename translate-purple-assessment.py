#!/usr/bin/env python3
"""
Quick German translation for purple-belt-assessment.de.html
Translates UI text while preserving technical terms
"""

def translate_purple_assessment():
    file_path = 'purple-belt-assessment.de.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Translation pairs (English -> German)
    translations = [
        # Header and intro
        ('<a href="learning-hub.html"', '<a href="learning-hub.de.html"'),
        ('← Back to Learning Hub', '← Zurück zum Learning Hub'),
        ('Lack of Commitment Mastery Test', 'Lack of Commitment Meisterschaftstest'),
        ('Demonstrate your mastery of productive commitment', 'Demonstriere Deine Meisterschaft von produktivem Commitment'),
        ('80% to pass and earn Purple Belt', '80%, um Purple Belt zu verdienen'),
        ('7-day cooldown if you don\'t pass on first attempt', '7-Tage-Cooldown, wenn du beim ersten Versuch nicht bestehst'),
        ('1000 XP upon successful completion', '1000 XP bei erfolgreichem Abschluss'),
        
        # Section headers
        ('Scenario Questions', 'Szenario-Fragen'),
        ('15 questions • 40% of score • Choose the best answer', '15 Fragen • 40% der Punktzahl • Wähle die beste Antwort'),
        ('Reflective Prompts', 'Reflektions-Prompts'),
        ('3 prompts • 30% of score • 200-300 words each', '3 Prompts • 30% der Punktzahl • 200-300 Wörter jeweils'),
        ('Practical Demonstration', 'Praktische Demonstration'),
        ('1 scenario • 30% of score • 300-400 words', '1 Szenario • 30% der Punktzahl • 300-400 Wörter'),
        
        # Submit section
        ('Ready to Submit?', 'Bereit zum Absenden?'),
        ('Review all your answers carefully before submitting. You need 80% to pass and earn your Purple Belt.', 
         'Überprüfe alle deine Antworten sorgfältig, bevor du absendest. Du brauchst 80%, um zu bestehen und deinen Purple Belt zu verdienen.'),
        ('Submit Assessment', 'Assessment Absenden'),
        
        # Result popup
        ('Assessment Complete!', 'Assessment Abgeschlossen!'),
        ('Calculating your score...', 'Berechne deine Punktzahl...'),
        ('Continue', 'Weiter'),
        ('Purple Belt Earned!', 'Purple Belt Verdient!'),
        ('Congratulations! You scored', 'Glückwunsch! Du hast'),
        ('% and have mastered Lack of Commitment', '% erreicht und Lack of Commitment gemeistert'),
        ('Brown Belt (Avoidance of Accountability) is now unlocked', 'Brown Belt (Avoidance of Accountability) ist jetzt freigeschaltet'),
        ('Continue your journey through the 5 Dysfunctions!', 'Setze deine Journey durch die 5 Dysfunctions fort!'),
        ('Keep Learning', 'Lerne Weiter'),
        ('%. You need 80% to pass', '%. Du brauchst 80%, um zu bestehen'),
        ('Review the Purple Belt modules and try again in 7 days', 'Überprüfe die Purple Belt Module und versuche es in 7 Tagen erneut'),
        ('Focus on the concepts you missed', 'Fokussiere dich auf die Konzepte, die du verpasst hast'),
        ('Already Completed', 'Bereits Abgeschlossen'),
        ('You\'ve already earned your Purple Belt! Continue to Brown Belt.', 
         'Du hast deinen Purple Belt bereits verdient! Fahre fort zu Brown Belt.'),
        ('No Additional XP', 'Kein zusätzliches XP'),
        
        # Alert messages
        ('You need to wait', 'Du musst noch'),
        ('more day(s) before retrying the assessment', 'Tag(e) warten, bevor du das Assessment erneut versuchst'),
        
        # Word count
        ('0 words', '0 Wörter'),
        ('words', 'Wörter'),
        
        # Redirect
        ("window.location.href = 'learning-hub.html'", "window.location.href = 'learning-hub.de.html'"),
    ]
    
    # Apply translations
    for english, german in translations:
        content = content.replace(english, german)
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Translated {file_path}")
    print(f"   Total replacements: {len(translations)}")

if __name__ == '__main__':
    translate_purple_assessment()
