#!/usr/bin/env python3

with open('black-belt-assessment.de.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Part 1: Header and Introduction
translations = [
    ('Black Belt Assessment - The 5 Dysfunctions Mastery', 'Black Belt Assessment - The 5 Dysfunctions Mastery'),
    ('Black Belt Assessment', 'Black Belt Assessment'),
    ('The 5 Dysfunctions Mastery Test', 'The 5 Dysfunctions Mastery Test'),
    ('🏆 Final Certification Assessment', '🏆 Final Certification Assessment'),
    
    ('The Ultimate Leadership Challenge', 'Die Ultimate Leadership Challenge'),
    ("This assessment represents the culmination of your journey through The Five Dysfunctions of a Functional Team. You've studied each dysfunction individually—now it's time to demonstrate your mastery of how they integrate.",
     "Dieses Assessment repräsentiert den Höhepunkt deiner Journey durch The Five Dysfunctions of a Functional Team. Du hast jede Dysfunction individuell studiert—jetzt ist es Zeit, deine Mastery darüber zu demonstrieren, wie sie integrieren."),
    ("<strong>Black Belt</strong> isn't just about knowledge. It's about wisdom—the ability to diagnose complex team situations, recognize the interplay between dysfunctions, and choose the right intervention at the right time.",
     "<strong>Black Belt</strong> ist nicht nur über Knowledge. Es ist über Wisdom—die Ability, komplexe Team Situations zu diagnosizieren, das Interplay zwischen Dysfunctions zu recognizen und die richtige Intervention zur richtigen Zeit zu choosen."),
    ("This assessment will test your ability to apply everything you've learned across all five dysfunctions in realistic, challenging scenarios.",
     "Dieses Assessment wird deine Ability testen, alles anzuwenden, was du über alle fünf Dysfunctions in realistischen, challenging Scenarios gelernt hast."),
    
    ('Highest Single Reward in the System', 'Highest Single Reward im System'),
    
    ('Assessment Requirements', 'Assessment Requirements'),
    ('<strong>15 Complex Scenarios</strong> - Each tests your understanding across multiple dysfunctions',
     '<strong>15 Komplexe Scenarios</strong> - Jedes testet dein Verständnis über mehrere Dysfunctions'),
    ('<strong>80% Passing Score</strong> - You must answer at least 12 out of 15 correctly',
     '<strong>80% Passing Score</strong> - Du musst mindestens 12 von 15 richtig beantworten'),
    ('<strong>Integration Focus</strong> - Scenarios require you to identify root causes and understand how dysfunctions cascade',
     '<strong>Integration Focus</strong> - Scenarios requiren, dass du Root Causes identifizierst und verstehst, wie Dysfunctions cascaden'),
    ('<strong>3 Reflections</strong> - Deep written reflections on your learning journey (100+ words each)',
     '<strong>3 Reflektionen</strong> - Deep Written Reflections über deine Learning Journey (100+ Wörter jeweils)'),
    ('<strong>3 Commitments</strong> - Specific actions you\'ll take to apply this knowledge',
     '<strong>3 Commitments</strong> - Spezifische Actions, die du machen wirst, um dieses Knowledge anzuwenden'),
    
    ('What You\'ll Be Tested On', 'Worauf du getestet wirst'),
    ('<strong>1. Absence of Trust</strong> - Vulnerability-based trust, authenticity, psychological safety',
     '<strong>1. Absence of Trust</strong> - Vulnerability-based Trust, Authenticity, Psychological Safety'),
    ('<strong>2. Fear of Conflict</strong> - Productive ideological conflict, mining for disagreement, real-time permission',
     '<strong>2. Fear of Conflict</strong> - Productive Ideological Conflict, Mining for Disagreement, Real-Time Permission'),
    ('<strong>3. Lack of Commitment</strong> - Clarity, buy-in, cascading communication, disagree and commit',
     '<strong>3. Lack of Commitment</strong> - Clarity, Buy-In, Cascading Communication, Disagree and Commit'),
    ('<strong>4. Avoidance of Accountability</strong> - Peer-to-peer accountability, difficult conversations, standards enforcement',
     '<strong>4. Avoidance of Accountability</strong> - Peer-to-Peer Accountability, Difficult Conversations, Standards Enforcement'),
    ('<strong>5. Inattention to Results</strong> - Collective outcomes over individual goals, scoreboard clarity, sacrifice for results',
     '<strong>5. Inattention to Results</strong> - Collective Outcomes über Individual Goals, Scoreboard Clarity, Sacrifice for Results'),
    
    ('Begin Assessment ⬛', 'Assessment Beginnen ⬛'),
    ('Question 1 of 15', 'Frage 1 von 15'),
]

for english, german in translations:
    content = content.replace(english, german)

with open('black-belt-assessment.de.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Translated Black Belt introduction and headers")
print(f"   Total translations: {len(translations)}")
