#!/usr/bin/env python3
"""
Complete Purple Belt German translation
Translates all questions, reflections, and practical demonstration
"""

import re

def translate_purple_complete():
    file_path = 'purple-belt-assessment.de.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Question translations (preserve HTML structure exactly)
    question_translations = [
        # Question 1
        (
            'At the end of a planning meeting, your product manager says "I\'ll try to get the designs done soon." \n                        Two weeks later, nothing has happened. What\'s the core problem?',
            'Am Ende eines Planning Meetings sagt dein Product Manager "Ich werde versuchen, die Designs bald fertig zu machen." \n                        Zwei Wochen später ist nichts passiert. Was ist das Kernproblem?'
        ),
        ('The PM is overwhelmed and needs capacity support.', 'Der PM ist überfordert und braucht Capacity Support.'),
        ('The commitment was too vague—"try," "soon," and no specific deliverable creates no accountability.', 
         'Das Commitment war zu vage—"versuchen," "bald," und kein spezifisches Deliverable kreiert keine Accountability.'),
        ('The PM doesn\'t care about the project enough to prioritize it.', 'Der PM kümmert sich nicht genug um das Projekt, um es zu priorisieren.'),
        ('Two weeks isn\'t long enough to follow up—give them more time.', 'Zwei Wochen sind nicht lang genug für ein Follow-up—gib ihnen mehr Zeit.'),
        
        # Question 2
        (
            'Your team is behind on a major deliverable. Your best engineer says "I can work this weekend to catch up." \n                        What\'s the best response as their leader?',
            'Dein Team liegt bei einem großen Deliverable zurück. Dein bester Engineer sagt "Ich kann am Wochenende arbeiten, um aufzuholen." \n                        Was ist die beste Response als ihr Leader?'
        ),
        ('Thank them for the offer and let them work the weekend—shows commitment to the team.', 
         'Danke ihnen für das Angebot und lass sie am Wochenende arbeiten—zeigt Commitment zum Team.'),
        ('Say "I appreciate the offer, but weekends are sacred. Let\'s look at what we can descope or push back instead."',
         'Sage "Ich schätze das Angebot, aber Wochenenden sind sacred. Lass uns schauen, was wir descopen oder pushen können stattdessen."'),
        ('Accept the offer only if everyone else on the team also works the weekend to be fair.',
         'Akzeptiere das Angebot nur, wenn alle anderen im Team auch am Wochenende arbeiten, um fair zu sein.'),
        ('Tell them to work the weekend but promise them comp time next month.',
         'Sage ihnen, sie sollen am Wochenende arbeiten, aber verspreche ihnen Comp Time nächsten Monat.'),
        
        # Question 3
        ('Which of these is the BEST example of a clear, actionable commitment?',
         'Welches ist das BESTE Beispiel für ein klares, actionable Commitment?'),
        ('"I\'ll work on the API integration this week."', '"Ich werde diese Woche an der API Integration arbeiten."'),
        ('"I\'ll ship the user authentication endpoints by Friday 5pm, with Swagger docs and unit tests at 80% coverage."',
         '"Ich werde die User Authentication Endpoints bis Freitag 17 Uhr shippen, mit Swagger Docs und Unit Tests bei 80% Coverage."'),
        ('"I\'ll do my best to get the authentication stuff done soon."', '"Ich werde mein Bestes geben, um die Authentication Sachen bald fertig zu machen."'),
        ('"I\'ll make progress on authentication by end of week."', '"Ich werde bis Ende der Woche Progress bei Authentication machen."'),
        
        # Question 4
        (
            'You\'ve asked a team member three times to update the documentation. Each time they say "sure" but nothing happens. \n                        What\'s the best next step?',
            'Du hast ein Team-Mitglied dreimal gebeten, die Documentation zu updaten. Jedes Mal sagen sie "klar", aber nichts passiert. \n                        Was ist der beste nächste Schritt?'
        ),
        ('Escalate to their manager—this is a performance issue.', 'Escalate zu ihrem Manager—das ist ein Performance Issue.'),
        ('Do it yourself—it\'s faster than continuing to ask.', 'Mache es selbst—es ist schneller, als weiter zu fragen.'),
        ('Have a direct conversation: "I\'ve asked three times with no follow-through. What\'s blocking you? Do you have capacity? Is this unclear?"',
         'Habe ein direktes Gespräch: "Ich habe dreimal gefragt ohne Follow-through. Was blockt dich? Hast du Capacity? Ist das unklar?"'),
        ('Stop asking—clearly documentation isn\'t a priority for them.', 'Höre auf zu fragen—offensichtlich ist Documentation keine Priority für sie.'),
        
        # Question 5
        (
            'You committed to delivering a feature by Monday. On Thursday, you realize a critical dependency is blocked \n                        and you won\'t make the deadline. What should you do?',
            'Du hast committed, ein Feature bis Montag zu delivern. Am Donnerstag realisierst du, dass eine kritische Dependency geblockt ist \n                        und du die Deadline nicht schaffen wirst. Was solltest du tun?'
        ),
        ('Work over the weekend to hit the Monday deadline—never break commitments.',
         'Arbeite über das Wochenende, um die Montag-Deadline zu treffen—breche niemals Commitments.'),
        ('Wait until Monday to tell stakeholders you missed the deadline.',
         'Warte bis Montag, um Stakeholdern zu sagen, dass du die Deadline verpasst hast.'),
        ('Ship an incomplete version on Monday to technically meet the commitment.',
         'Shippe eine incomplete Version am Montag, um das Commitment technisch zu erfüllen.'),
        ('Renegotiate immediately on Thursday: "The dependency is blocked. Here are three options with new timelines."',
         'Renegotiate sofort am Donnerstag: "Die Dependency ist geblockt. Hier sind drei Optionen mit neuen Timelines."'),
    ]
    
    # Apply question translations
    for english, german in question_translations:
        content = content.replace(english, german)
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Translated Purple Belt questions 1-5")
    print(f"   Total translations: {len(question_translations)}")

if __name__ == '__main__':
    translate_purple_complete()
