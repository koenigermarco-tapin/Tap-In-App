#!/bin/bash

FILE="/Users/marcok./Downloads/tap-in-netlify-deploy/combined-profile-carousel.de.html"

# Question 27
sed -i '' "s/text: 'Team members openly admit their mistakes and weaknesses'/text: 'Team-Mitglieder geben offen ihre Fehler und Schwächen zu'/" "$FILE"

# Question 28
sed -i '' "s/text: 'People ask for help without hesitation'/text: 'Menschen fragen ohne Zögern um Hilfe'/" "$FILE"

# Question 29
sed -i '' "s/text: 'Team members give each other benefit of the doubt'/text: 'Team-Mitglieder geben sich gegenseitig den Benefit of the Doubt'/" "$FILE"

# Question 30
sed -i '' "s/text: 'Apologies are genuine and accepted'/text: 'Entschuldigungen sind echt und werden akzeptiert'/" "$FILE"

# Question 31
sed -i '' "s/text: 'People share information freely, without hoarding knowledge'/text: 'Menschen teilen Informationen frei, ohne Knowledge zu horten'/" "$FILE"

# Question 32
sed -i '' "s/text: 'Team members engage in passionate, productive debates'/text: 'Team-Mitglieder führen leidenschaftliche, produktive Debatten'/" "$FILE"

# Question 33
sed -i '' "s/text: 'Disagreements are surfaced and resolved quickly'/text: 'Disagreements werden surfaced und schnell resolved'/" "$FILE"

# Question 34
sed -i '' "s|text: 'Team members challenge each other's ideas respectfully|text: 'Team-Mitglieder challengen gegenseitig ihre Ideas respektvoll|" "$FILE"

# Question 35
sed -i '' "s/text: 'Decisions are made with clarity and buy-in from everyone'/text: 'Decisions werden mit Clarity und Buy-in von allen getroffen'/" "$FILE"

# Question 36
sed -i '' "s/text: 'Once a decision is made, everyone commits—even if they initially disagreed'/text: 'Sobald eine Decision getroffen ist, committen alle—auch wenn sie initial disagreed haben'/" "$FILE"

# Question 37
sed -i '' "s/text: 'Team goals are more important than individual agendas'/text: 'Team Goals sind wichtiger als individuelle Agendas'/" "$FILE"

# Question 38
sed -i '' "s/text: 'People follow through on commitments without being reminded'/text: 'Menschen followen durch auf Commitments ohne Erinnerung'/" "$FILE"

# Question 39
sed -i '' "s/text: 'Team members hold each other accountable (not just the leader)'/text: 'Team-Mitglieder halten sich gegenseitig accountable (nicht nur der Leader)'/" "$FILE"

# Question 40
sed -i '' "s/text: 'Poor performers are confronted directly and quickly'/text: 'Poor Performers werden direkt und schnell konfrontiert'/" "$FILE"

# Question 41
sed -i '' "s/text: 'People are willing to make personal sacrifices for team success'/text: 'Menschen sind bereit, persönliche Sacrifices für Team Success zu machen'/" "$FILE"

# Question 42
sed -i '' "s|text: 'Team members celebrate each other's successes|text: 'Team-Mitglieder feiern gegenseitig ihre Erfolge|" "$FILE"

# Question 43
sed -i '' "s/text: 'Results and outcomes are prioritized over politics and process'/text: 'Results und Outcomes werden über Politics und Process priorisiert'/" "$FILE"

# Question 44
sed -i '' "s/text: 'The team regularly reviews performance and adjusts strategy'/text: 'Das Team reviewed regelmäßig Performance und adjustet Strategy'/" "$FILE"

# Question 45
sed -i '' "s/text: 'Success is defined by achieving collective goals, not individual metrics'/text: 'Success wird definiert durch das Erreichen kollektiver Goals, nicht individueller Metrics'/" "$FILE"

# Question 46
sed -i '' "s/text: 'The team has a shared sense of purpose that drives daily work'/text: 'Das Team hat einen shared Sense of Purpose, der daily Work antreibt'/" "$FILE"

echo "Team Dynamics questions 27-46 translated!"
