#!/bin/bash

FILE="/Users/marcok./Downloads/tap-in-netlify-deploy/combined-profile-carousel.de.html"

# Results page translations
sed -i '' "s|<h2>Your Complete Leadership Profile</h2>|<h2>Dein vollständiges Leadership-Profil</h2>|" "$FILE"
sed -i '' "s|<p>Based on \${totalAssessments.toLocaleString()} professionals assessed</p>|<p>Basierend auf \${totalAssessments.toLocaleString()} assessen Professionals</p>|" "$FILE"

# Worker Type section headers
sed -i '' "s|<h3>💼 Your Work Style: \${worker.name}</h3>|<h3>💼 Dein Work Style: \${worker.name}</h3>|" "$FILE"
sed -i '' "s|<h5>✓ Your Strengths:</h5>|<h5>✓ Deine Stärken:</h5>|" "$FILE"
sed -i '' "s|<h5>💡 Optimize Your Work Style:</h5>|<h5>💡 Optimiere deinen Work Style:</h5>|" "$FILE"

# Leadership section headers  
sed -i '' "s|<h3>🎯 Your Leadership Style: \${leadership.name}</h3>|<h3>🎯 Dein Leadership Style: \${leadership.name}</h3>|" "$FILE"
sed -i '' "s|<h5>✓ Your Leadership Strengths:</h5>|<h5>✓ Deine Leadership Strengths:</h5>|" "$FILE"
sed -i '' "s|<h5>⚠ Watch Out For:</h5>|<h5>⚠ Achte auf:</h5>|" "$FILE"
sed -i '' "s|<h5 style=\"color: #1a365d; margin-bottom: 10px;\">🔄 Your Secondary Styles:</h5>|<h5 style=\"color: #1a365d; margin-bottom: 10px;\">🔄 Deine Secondary Styles:</h5>|" "$FILE"
sed -i '' "s|💡 Elite leaders develop secondary styles. Your versatility is a strength.|💡 Elite Leaders entwickeln Secondary Styles. Deine Versatility ist eine Stärke.|" "$FILE"

# Team Dynamics section
sed -i '' "s|<h3>🤝 Your Team Dynamics Health</h3>|<h3>🤝 Deine Team Dynamics Health</h3>|" "$FILE"
sed -i '' "s|Based on Patrick Lencioni's 5 Dysfunctions of a Team. Scores show team health across five critical areas.|Basierend auf Patrick Lencionis 5 Dysfunctions of a Team. Scores zeigen Team Health über fünf kritische Bereiche.|" "$FILE"

# Integration section
sed -i '' "s|<h3>🚀 Your Integrated Profile</h3>|<h3>🚀 Dein Integrated Profile</h3>|" "$FILE"
sed -i '' "s|You are a |Du bist ein |" "$FILE"

# Worker Type descriptions
sed -i '' "s|name: 'The Sprinter'|name: 'Der Sprinter'|" "$FILE"
sed -i '' "s|tagline: 'High-Intensity Bursts with Recovery'|tagline: 'High-Intensity Bursts mit Recovery'|" "$FILE"
sed -i '' "s|You thrive on intense focus periods followed by complete breaks|Du thrivest bei intensiven Focus-Perioden gefolgt von kompletten Breaks|" "$FILE"
sed -i '' "s|Like elite athletes, you perform best in sprints—not marathons|Wie Elite Athletes performst du am besten in Sprints—nicht Marathons|" "$FILE"
sed -i '' "s|Your productivity comes in waves of deep work followed by recovery|Deine Productivity kommt in Waves von Deep Work gefolgt von Recovery|" "$FILE"

sed -i '' "s|name: 'The Jogger'|name: 'Der Jogger'|" "$FILE"
sed -i '' "s|tagline: 'Steady, Consistent, Reliable'|tagline: 'Steady, Consistent, Reliable'|" "$FILE"
sed -i '' "s|You maintain a sustainable pace throughout the day|Du maintainst ein sustainables Tempo über den Tag|" "$FILE"
sed -i '' "s|Like a marathon runner, you excel at consistent output over time|Wie ein Marathon-Läufer excellst du bei consistent Output über Zeit|" "$FILE"
sed -i '' "s|Your reliability and predictability make you invaluable to teams|Deine Reliability und Predictability machen dich invaluable für Teams|" "$FILE"

sed -i '' "s|name: 'The Ultrarunner'|name: 'Der Ultrarunner'|" "$FILE"
sed -i '' "s|tagline: 'Deep Work, Long Game, Endurance'|tagline: 'Deep Work, Long Game, Endurance'|" "$FILE"
sed -i '' "s|You excel at deep, methodical work over extended periods|Du excellst bei deep, methodischer Arbeit über extended Periods|" "$FILE"
sed -i '' "s|Like ultramarathon runners, you have extraordinary endurance and rarely burn out|Wie Ultramarathon-Läufer hast du extraordinary Endurance und burnst rarely out|" "$FILE"
sed -i '' "s|Your superpower is sustainability|Deine Superpower ist Sustainability|" "$FILE"

# Leadership archetype descriptions
sed -i '' "s|name: 'The Visionary Leader'|name: 'Der Visionary Leader'|" "$FILE"
sed -i '' "s|tagline: 'You Set Direction & Inspire Others'|tagline: 'Du setzt Direction & inspirierst andere'|" "$FILE"
sed -i '' "s|You lead with vision and purpose|Du führst mit Vision und Purpose|" "$FILE"

sed -i '' "s|name: 'The Architect Leader'|name: 'Der Architect Leader'|" "$FILE"
sed -i '' "s|tagline: 'You Design Systems & Optimize Performance'|tagline: 'Du designst Systems & optimierst Performance'|" "$FILE"
sed -i '' "s|You lead through intelligent design|Du führst durch intelligent Design|" "$FILE"

sed -i '' "s|name: 'The Facilitator Leader'|name: 'Der Facilitator Leader'|" "$FILE"
sed -i '' "s|tagline: 'You Build Teams & Create Connection'|tagline: 'Du buildest Teams & kreierst Connection'|" "$FILE"
sed -i '' "s|You lead through people|Du führst durch Menschen|" "$FILE"

sed -i '' "s|name: 'The Executor Leader'|name: 'Der Executor Leader'|" "$FILE"
sed -i '' "s|tagline: 'You Drive Results & Make Things Happen'|tagline: 'Du treibst Results & machst Things happen'|" "$FILE"
sed -i '' "s|You lead through action|Du führst durch Action|" "$FILE"

sed -i '' "s|name: 'The Commander Leader'|name: 'Der Commander Leader'|" "$FILE"
sed -i '' "s|tagline: 'You Make Tough Calls & Win'|tagline: 'Du machst Tough Calls & gewinnst'|" "$FILE"
sed -i '' "s|You lead through decisive action|Du führst durch decisive Action|" "$FILE"

sed -i '' "s|name: 'The Coach Leader'|name: 'Der Coach Leader'|" "$FILE"
sed -i '' "s|tagline: 'You Develop People & Build Capability'|tagline: 'Du entwickelst People & buildest Capability'|" "$FILE"
sed -i '' "s|You lead through questions|Du führst durch Questions|" "$FILE"

echo "Results page translated!"
