#!/usr/bin/env python3
import sys

# Read the file
with open('purple-belt-assessment.de.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Reflection section translations
translations = [
    # Section header
    ('Reflections', 'Reflektionen'),
    ('3 prompts • Reflect on your commitment journey', '3 Prompts • Reflektiere über deine Commitment Journey'),
    
    # Reflection 1
    ('<strong>1. Commitment Audit:</strong> Think about the last 3 commitments you made (to yourself, your team, or stakeholders).',
     '<strong>1. Commitment Audit:</strong> Denk über die letzten 3 Commitments nach, die du gemacht hast (an dich selbst, dein Team oder Stakeholder).'),
    ('How clear were they? Did you follow through? If not, what got in the way? What pattern do you notice?',
     'Wie klar waren sie? Hast du follow-through gemacht? Falls nicht, was kam in den Weg? Welches Pattern siehst du?'),
    
    # Reflection 2
    ('<strong>2. Capacity Reality:</strong> Where are you currently operating beyond your sustainable capacity?',
     '<strong>2. Capacity Reality:</strong> Wo operierst du aktuell über deine sustainable Capacity hinaus?'),
    ('What commitment(s) do you need to renegotiate or drop? What would it take to actually have that conversation?',
     'Welche Commitment(s) musst du renegotiatieren oder droppen? Was würde es brauchen, um dieses Gespräch tatsächlich zu haben?'),
    
    # Reflection 3
    ('<strong>3. Cultural Assessment:</strong> On a scale of 1-10, how would you rate your team/organization\'s commitment culture?',
     '<strong>3. Cultural Assessment:</strong> Auf einer Skala von 1-10, wie würdest du die Commitment Culture deines Teams/deiner Organisation raten?'),
    ('What\'s one specific practice you could implement to improve it by 2 points?',
     'Was ist eine spezifische Practice, die du implementieren könntest, um sie um 2 Punkte zu verbessern?'),
    
    # Practical Application section header
    ('Practical Application', 'Praktische Anwendung'),
    ('Your commitment mastery action plan', 'Dein Commitment Mastery Action Plan'),
    
    # Intro text
    ('Real mastery shows up in what you do next. Based on your Purple Belt learning, make three specific commitments',
     'Echte Mastery zeigt sich in dem, was du als Nächstes tust. Basierend auf deinem Purple Belt Learning mach drei spezifische Commitments'),
    ('below. Use the "What by When by Whom" framework and be honest about your capacity.',
     'unten. Nutze das "What by When by Whom" Framework und sei ehrlich über deine Capacity.'),
    
    # Commitment 1
    ('<strong>Commitment 1 - Personal:</strong> One commitment to yourself to rebuild self-trust.',
     '<strong>Commitment 1 - Personal:</strong> Ein Commitment an dich selbst, um Self-Trust wieder aufzubauen.'),
    ('<em>Example: "I will work out 3x/week (Mon/Wed/Fri 6:30am) for the next 4 weeks, starting Nov 27."</em>',
     '<em>Beispiel: "Ich werde 3x/Woche (Mo/Mi/Fr 6:30 Uhr) für die nächsten 4 Wochen trainieren, ab 27. Nov."</em>'),
    
    # Commitment 2
    ('<strong>Commitment 2 - Team:</strong> One commitment to improve how your team makes and tracks commitments.',
     '<strong>Commitment 2 - Team:</strong> Ein Commitment, um zu verbessern, wie dein Team Commitments macht und trackt.'),
    ('<em>Example: "I will run a \'commitment audit\' in our next team meeting (Dec 1) to make all promises visible and renegotiate where needed."</em>',
     '<em>Beispiel: "Ich werde ein \'Commitment Audit\' in unserem nächsten Team Meeting (1. Dez) durchführen, um alle Promises sichtbar zu machen und wo nötig zu renegotiatieren."</em>'),
    
    # Commitment 3
    ('<strong>Commitment 3 - Capacity:</strong> One thing you will say no to or renegotiate this week.',
     '<strong>Commitment 3 - Capacity:</strong> Eine Sache, zu der du diese Woche nein sagen oder die du renegotiatieren wirst.'),
    ('<em>Example: "I will tell my manager by Friday that I need to delay the Q4 roadmap review until Jan to focus on the product launch."</em>',
     '<em>Beispiel: "Ich werde meinem Manager bis Freitag sagen, dass ich die Q4 Roadmap Review bis Jan delayen muss, um mich auf den Product Launch zu fokussieren."</em>'),
    
    # Placeholders
    ('Your reflection here...', 'Deine Reflektion hier...'),
    ('What will you do, by when?', 'Was wirst du tun, bis wann?'),
    ('What will you say no to, when?', 'Zu was wirst du nein sagen, wann?'),
    
    # Submit section (already partially translated, but ensure complete)
    ('Ready to Submit?', 'Bereit zum Absenden?'),
    ('Make sure you\'ve answered all questions and completed the reflection sections.', 
     'Stell sicher, dass du alle Fragen beantwortet und die Reflektions-Sektionen vervollständigt hast.'),
]

# Apply all translations
for english, german in translations:
    content = content.replace(english, german)

# Write back
with open('purple-belt-assessment.de.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Translated Purple Belt reflections and practical application")
print(f"   Total translations: {len(translations)}")
