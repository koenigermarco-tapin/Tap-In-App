#!/usr/bin/env python3

with open('black-belt-assessment.de.html', 'r', encoding='utf-8') as f:
    content = f.read()

translations = [
    # Reflections header
    ('Black Belt Reflections', 'Black Belt Reflektionen'),
    ('Demonstrate Your Mastery Through Deep Reflection', 'Demonstriere deine Mastery durch Deep Reflection'),
    
    # Reflection 1
    ('Reflection 1: Your Greatest Dysfunction Challenge', 'Reflektion 1: Deine Greatest Dysfunction Challenge'),
    ('Of the five dysfunctions (Trust, Conflict, Commitment, Accountability, Results), which has been the most challenging for you personally as a leader? Describe a specific situation where this dysfunction showed up on your team, what you learned from it, and how you would handle it differently now. (Minimum 100 words)',
     'Von den fünf Dysfunctions (Trust, Conflict, Commitment, Accountability, Results), welche war die most challenging für dich persönlich als Leader? Beschreibe eine spezifische Situation, wo diese Dysfunction in deinem Team appeared, was du daraus gelernt hast und wie du es jetzt differently handlen würdest. (Minimum 100 Wörter)'),
    
    # Reflection 2
    ('Reflection 2: The Cascade Effect', 'Reflektion 2: Der Cascade Effect'),
    ('Explain in your own words why the dysfunctions build on each other (absence of trust leads to fear of conflict, which leads to lack of commitment, etc.). Give a real or hypothetical example of how fixing one dysfunction unlocked progress on others. What does this teach you about where to focus your energy as a leader? (Minimum 100 words)',
     'Erklär in deinen eigenen Worten, warum die Dysfunctions aufeinander builden (Absence of Trust leaded zu Fear of Conflict, was zu Lack of Commitment leaded, etc.). Gib ein echtes oder hypothetisches Beispiel, wie das Fixen einer Dysfunction Progress auf anderen unlockte. Was lehrt dich das darüber, wo du als Leader deine Energy fokussieren solltest? (Minimum 100 Wörter)'),
    
    # Reflection 3
    ('Reflection 3: Your Black Belt Commitment', 'Reflektion 3: Dein Black Belt Commitment'),
    ('Black Belt represents mastery—not just knowledge, but the ability to teach and develop other leaders. How will you use what you\'ve learned to build a more functional team? What specific behaviors will you model? How will you teach these concepts to others? What legacy do you want to leave as a leader? (Minimum 100 words)',
     'Black Belt repräsentiert Mastery—nicht nur Knowledge, sondern die Ability, andere Leaders zu teachen und zu developen. Wie wirst du nutzen, was du gelernt hast, um ein more functional Team zu builden? Welche spezifischen Behaviors wirst du modeln? Wie wirst du diese Concepts anderen teachen? Welches Legacy willst du als Leader leaven? (Minimum 100 Wörter)'),
    
    # Character counts and buttons
    ('0 / 100 words minimum', '0 / 100 Wörter Minimum'),
    ('Submit Assessment ⬛', 'Assessment Absenden ⬛'),
    
    # Results screen
    ('Assessment Results', 'Assessment Ergebnisse'),
    ('Already Earned', 'Bereits Verdient'),
    ("You've already completed the Black Belt Assessment!", 'Du hast das Black Belt Assessment bereits abgeschlossen!'),
    ('You are a certified Black Belt in The Five Dysfunctions of a Functional Team.', 'Du bist ein zertifizierter Black Belt in The Five Dysfunctions of a Functional Team.'),
    ('Total System XP:', 'Total System XP:'),
    ('🏆 Complete 5 Dysfunctions Belt System', '🏆 Complete 5 Dysfunctions Belt System'),
    ('Return Home', 'Zurück zur Startseite'),
    ('View My Reflections', 'Meine Reflektionen Ansehen'),
    
    # Other UI elements
    ('Black Belt - Mastery', 'Black Belt - Mastery'),
    ('As a Black Belt leader, what\'s your BEST move?', 'Als Black Belt Leader, was ist dein BESTER Move?'),
    ('Next →', 'Weiter →'),
    ('← Previous', '← Zurück'),
]

for english, german in translations:
    content = content.replace(english, german)

with open('black-belt-assessment.de.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Translated Black Belt reflections and UI elements")
print(f"   Total translations: {len(translations)}")
