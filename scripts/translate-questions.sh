#!/bin/bash

# Translate remaining worker type questions (6-12) in combined-profile-carousel.de.html

FILE="/Users/marcok./Downloads/tap-in-netlify-deploy/combined-profile-carousel.de.html"

# Question 6
sed -i '' "s/text: 'After completing a major project, you:'/text: 'Nach Abschluss eines großen Projekts:'/" "$FILE"
sed -i '' "s/text: 'Need significant downtime before the next challenge'/text: 'Brauchst du signifikante Downtime vor der nächsten Challenge'/" "$FILE"
sed -i '' "s/text: 'Transition smoothly to the next project'/text: 'Gehst du smooth über zum nächsten Projekt'/" "$FILE"
sed -i '' "s/text: 'Already well into the next long-term initiative'/text: 'Bist du schon mitten in der nächsten Langzeit-Initiative'/" "$FILE"
sed -i '' "s/title: 'Recovery Pattern = Sustainability'/title: 'Recovery Pattern = Nachhaltigkeit'/" "$FILE"

# Question 7
sed -i '' "s/text: 'When learning something new, you prefer to:'/text: 'Wenn du etwas Neues lernst, bevorzugst du:'/" "$FILE"
sed -i '' "s/text: 'Dive in intensely and master it quickly'/text: 'Intensiv einzutauchen und es schnell zu meistern'/" "$FILE"
sed -i '' "s/text: 'Learn consistently through regular practice'/text: 'Konsistent durch regelmäßige Praxis zu lernen'/" "$FILE"
sed -i '' "s/text: 'Take time to deeply understand before moving forward'/text: 'Dir Zeit zu nehmen für tiefes Verständnis, bevor du weitergehst'/" "$FILE"
sed -i '' "s/title: 'Learning Style Impacts Mastery Speed'/title: 'Learning Style beeinflusst Mastery-Geschwindigkeit'/" "$FILE"

# Question 8
sed -i '' "s/text: 'Your productivity is highest when:'/text: 'Deine Produktivität ist am höchsten, wenn:'/" "$FILE"
sed -i '' "s/text: 'There's a clear deadline creating urgency'/text: 'Eine klare Deadline Urgency erzeugt'/" "$FILE"
sed -i '' "s/text: 'You have a structured routine to follow'/text: 'Du eine strukturierte Routine hast'/" "$FILE"
sed -i '' "s/text: 'You have ample time to do thorough work'/text: 'Du ausreichend Zeit für gründliche Arbeit hast'/" "$FILE"
sed -i '' "s/title: 'Productivity Trigger = Performance Catalyst'/title: 'Productivity Trigger = Performance Catalyst'/" "$FILE"

# Question 9
sed -i '' "s/text: 'How do you recharge?'/text: 'Wie lädst du auf?'/" "$FILE"
sed -i '' "s/text: 'Complete breaks from work - clear boundaries'/text: 'Komplette Pausen von der Arbeit - klare Grenzen'/" "$FILE"
sed -i '' "s/text: 'Regular short breaks throughout the day'/text: 'Regelmäßige kurze Pausen über den Tag'/" "$FILE"
sed -i '' "s/text: 'Rarely feel drained - work is sustainable'/text: 'Fühlst dich selten ausgelaugt - Arbeit ist nachhaltig'/" "$FILE"
sed -i '' "s/title: 'Recovery = Performance Multiplier'/title: 'Recovery = Performance Multiplier'/" "$FILE"

# Question 10
sed -i '' "s/text: 'In a typical work week, you prefer:'/text: 'In einer typischen Arbeitswoche bevorzugst du:'/" "$FILE"
sed -i '' "s/text: 'Variety and intensity - different challenges daily'/text: 'Variety und Intensität - täglich unterschiedliche Challenges'/" "$FILE"
sed -i '' "s/text: 'Predictable structure with some variety'/text: 'Vorhersehbare Struktur mit etwas Variety'/" "$FILE"
sed -i '' "s/text: 'Consistency - similar tasks and rhythms'/text: 'Konsistenz - ähnliche Tasks und Rhythmen'/" "$FILE"
sed -i '' "s/title: 'Weekly Pattern Shapes Sustainability'/title: 'Weekly Pattern formt Nachhaltigkeit'/" "$FILE"

# Question 11
sed -i '' "s/text: 'Your approach to meetings is:'/text: 'Dein Ansatz zu Meetings ist:'/" "$FILE"
sed -i '' "s/text: 'Short and intense - get in, decide, get out'/text: 'Kurz und intensiv - rein, entscheiden, raus'/" "$FILE"
sed -i '' "s/text: 'Scheduled regularly with clear agendas'/text: 'Regelmäßig geplant mit klaren Agendas'/" "$FILE"
sed -i '' "s/text: 'Thorough discussions - take time needed'/text: 'Gründliche Diskussionen - nimm dir die Zeit, die nötig ist'/" "$FILE"
sed -i '' "s/title: 'Meeting Style Reveals Communication Pattern'/title: 'Meeting Style zeigt Communication Pattern'/" "$FILE"

# Question 12
sed -i '' "s/text: 'When stressed, you perform best by:'/text: 'Wenn du gestresst bist, performst du am besten, indem du:'/" "$FILE"
sed -i '' "s/text: 'Channeling it into rapid, focused action'/text: 'Es in schnelle, fokussierte Action kanalisierst'/" "$FILE"
sed -i '' "s/text: 'Maintaining your normal routine and pace'/text: 'Deine normale Routine und Pace beibehältst'/" "$FILE"
sed -i '' "s/text: 'Staying calm and methodical'/text: 'Ruhig und methodisch bleibst'/" "$FILE"
sed -i '' "s/title: 'Stress Response = Your Default Mode'/title: 'Stress Response = dein Default Mode'/" "$FILE"

echo "Worker Type questions 6-12 translated!"
