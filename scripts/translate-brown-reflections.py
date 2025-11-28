#!/usr/bin/env python3

with open('brown-belt-assessment.de.html', 'r', encoding='utf-8') as f:
    content = f.read()

translations = [
    # Reflections section
    ('Part 2: Personal Reflection (3 Questions)', 'Teil 2: Persönliche Reflektion (3 Fragen)'),
    
    # Reflection 1
    ('Reflection 1: Your Accountability Gaps', 'Reflektion 1: Deine Accountability Gaps'),
    ('Think about the last 3 months. Where have YOU avoided accountability? (Example: Not addressing a performance issue, letting commitments slip without communicating, waiting for someone else to solve a problem you could have owned.) Be specific. (Min. 100 words)',
     'Denk über die letzten 3 Monate nach. Wo hast DU Accountability vermieden? (Beispiel: Ein Performance Issue nicht addressen, Commitments slippen lassen ohne zu kommunizieren, warten, dass jemand anderes ein Problem solved, das du ownen könntest.) Sei spezifisch. (Min. 100 Wörter)'),
    ('Your honest reflection...', 'Deine ehrliche Reflektion...'),
    
    # Reflection 2
    ('Reflection 2: Peer Accountability Assessment', 'Reflektion 2: Peer Accountability Assessment'),
    ('Does your team hold each other accountable, or do they wait for you to do it? What\'s one specific example that shows the current state? What would need to change to move toward peer-driven accountability? (Min. 100 words)',
     'Hält dein Team sich gegenseitig accountable oder warten sie darauf, dass du es machst? Was ist ein spezifisches Beispiel, das den Current State zeigt? Was müsste sich ändern, um zu Peer-driven Accountability zu moven? (Min. 100 Wörter)'),
    ('Your assessment...', 'Dein Assessment...'),
    
    # Reflection 3
    ('Reflection 3: The Hardest Conversation', 'Reflektion 3: Das Hardest Conversation'),
    ('Who on your team (or in your organization) do you need to have an accountability conversation with but haven\'t? What\'s stopping you? What would change if you had that conversation this week? (Min. 100 words)',
     'Mit wem in deinem Team (oder deiner Organisation) musst du ein Accountability Conversation haben, hast es aber nicht getan? Was stoppt dich? Was würde sich ändern, wenn du dieses Conversation diese Woche hättest? (Min. 100 Wörter)'),
    ('Be honest with yourself...', 'Sei ehrlich zu dir selbst...'),
    
    # Practical Application section
    ('Part 3: Practical Application (3 Commitments)', 'Teil 3: Praktische Anwendung (3 Commitments)'),
    
    # Commitment 1
    ('Commitment 1: Personal Accountability Upgrade', 'Commitment 1: Personal Accountability Upgrade'),
    ('What\'s ONE habit from the "7 Habits of Accountability Champions" you\'ll practice daily for the next 30 days? Be specific about how you\'ll implement it.',
     'Was ist EIN Habit aus den "7 Habits of Accountability Champions", den du die nächsten 30 Tage täglich practicen wirst? Sei spezifisch darüber, wie du es implementieren wirst.'),
    ('Example: I will make 3 explicit public commitments every Monday in our team meeting, going first to model the behavior...',
     'Beispiel: Ich werde jeden Montag im Team Meeting 3 explizite Public Commitments machen und dabei first gehen, um das Behavior zu modeln...'),
    
    # Commitment 2
    ('Commitment 2: Team System Implementation', 'Commitment 2: Team System Implementation'),
    ('What\'s ONE accountability system (visibility, rituals, consequences) you\'ll implement or strengthen with your team in the next 2 weeks? What specific action will you take this week to start it?',
     'Was ist EIN Accountability System (Visibility, Rituals, Consequences), das du in den nächsten 2 Wochen mit deinem Team implementieren oder strengthenen wirst? Welche spezifische Action wirst du diese Woche machen, um zu starten?'),
    ('Example: I will restart our public commitment board by creating a shared Trello board this week and using it in Monday\'s standup...',
     'Beispiel: Ich werde unser Public Commitment Board restartn, indem ich diese Woche ein Shared Trello Board create und es im Montags-Standup nutze...'),
    
    # Commitment 3
    ('Commitment 3: The Conversation You\'ll Have', 'Commitment 3: Das Conversation, das du haben wirst'),
    ('Based on Reflection 3, commit to having that accountability conversation. When will you have it? What\'s the specific first sentence you\'ll use to open the conversation?',
     'Basierend auf Reflektion 3, committe, dieses Accountability Conversation zu haben. Wann wirst du es haben? Was ist der spezifische First Sentence, den du nutzen wirst, um das Conversation zu openen?'),
    ('Example: I will talk to Marcus by Friday at our 1-on-1. Opening: \'Marcus, I want to talk about a pattern I\'m seeing with missed deadlines...\'',
     'Beispiel: Ich werde mit Marcus bis Freitag in unserem 1-on-1 reden. Opening: \'Marcus, ich möchte über ein Pattern reden, das ich bei Missed Deadlines sehe...\''),
    
    # Submit section
    ('Submit Assessment', 'Assessment Absenden'),
    ('Assessment Results', 'Assessment Ergebnisse'),
    ('Continue to Learning Hub', 'Weiter zum Learning Hub'),
]

for english, german in translations:
    content = content.replace(english, german)

with open('brown-belt-assessment.de.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Translated Brown Belt reflections and commitments")
print(f"   Total translations: {len(translations)}")
