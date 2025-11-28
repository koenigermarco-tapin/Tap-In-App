#!/bin/bash

FILE="/Users/marcok./Downloads/tap-in-netlify-deploy/combined-profile-carousel.de.html"

# Question 13
sed -i '' "s/text: 'When starting a new project or initiative, your first instinct is to:'/text: 'Beim Start eines neuen Projekts oder einer Initiative ist dein erster Instinkt:'/" "$FILE"
sed -i '' "s/text: 'Paint an inspiring vision of what success could look like'/text: 'Eine inspirierende Vision zu malen, wie Erfolg aussehen könnte'/" "$FILE"
sed -i '' "s/text: 'Map out the strategy, structure, and dependencies'/text: 'Strategie, Struktur und Dependencies zu mappen'/" "$FILE"
sed -i '' "s/text: 'Bring everyone together to build alignment and clarity'/text: 'Alle zusammenzubringen, um Alignment und Clarity zu schaffen'/" "$FILE"
sed -i '' "s/text: 'Identify quick wins and start executing immediately'/text: 'Quick Wins zu identifizieren und sofort mit Execution zu starten'/" "$FILE"
sed -i '' "s/text: 'Define clear objectives, roles, and chain of command'/text: 'Klare Objectives, Rollen und Chain of Command zu definieren'/" "$FILE"
sed -i '' "s/text: 'Ask powerful questions to help the team discover the path forward'/text: 'Kraftvolle Fragen zu stellen, damit das Team den Weg selbst entdeckt'/" "$FILE"

# Question 14
sed -i '' "s/text: 'During team conflicts, you naturally:'/text: 'Bei Team-Konflikten tendierst du natürlich dazu:'/" "$FILE"
sed -i '' "s/text: 'Reframe the conflict around shared purpose and bigger goals'/text: 'Den Konflikt um Shared Purpose und größere Goals zu reframen'/" "$FILE"
sed -i '' "s/text: 'Analyze root causes and design better processes'/text: 'Root Causes zu analysieren und bessere Processes zu designen'/" "$FILE"
sed -i '' "s/text: 'Create space for everyone to be heard and find common ground'/text: 'Space zu schaffen, damit alle gehört werden und Common Ground zu finden'/" "$FILE"
sed -i '' "s/text: 'Push for quick resolution so the team can move forward'/text: 'Auf schnelle Resolution zu drängen, damit das Team vorankommen kann'/" "$FILE"
sed -i '' "s/text: 'Make the final call and expect alignment'/text: 'Den Final Call zu machen und Alignment zu erwarten'/" "$FILE"
sed -i '' "s/text: 'Help people work through it themselves with guided questions'/text: 'Menschen zu helfen, es selbst mit guided Questions durchzuarbeiten'/" "$FILE"

# Question 15
sed -i '' "s/text: 'What energizes you most at work?'/text: 'Was energetisiert dich am meisten bei der Arbeit?'/" "$FILE"
sed -i '' "s/text: 'Brainstorming big ideas and exploring new possibilities'/text: 'Big Ideas zu brainstormen und neue Possibilities zu erkunden'/" "$FILE"
sed -i '' "s/text: 'Solving complex problems and designing elegant solutions'/text: 'Komplexe Probleme zu lösen und elegante Solutions zu designen'/" "$FILE"
sed -i '' "s/text: 'Helping people connect, grow, and work well together'/text: 'Menschen zu helfen, sich zu connecten, zu wachsen und gut zusammenzuarbeiten'/" "$FILE"
sed -i '' "s/text: 'Checking off completed tasks and hitting milestones'/text: 'Abgeschlossene Tasks abzuhaken und Milestones zu erreichen'/" "$FILE"
sed -i '' "s/text: 'Making tough decisions and winning against competition'/text: 'Tough Decisions zu treffen und gegen Competition zu gewinnen'/" "$FILE"
sed -i '' "s/text: 'Watching people have breakthroughs and level up'/text: 'Zuzusehen, wie Menschen Breakthroughs haben und leveln'/" "$FILE"

# Question 16
sed -i '' "s/text: 'How do you prefer to communicate important information?'/text: 'Wie kommunizierst du bevorzugt wichtige Informationen?'/" "$FILE"
sed -i '' "s/text: 'Through storytelling and painting compelling pictures'/text: 'Durch Storytelling und das Malen überzeugender Bilder'/" "$FILE"
sed -i '' "s/text: 'With data, frameworks, and logical reasoning'/text: 'Mit Data, Frameworks und logischem Reasoning'/" "$FILE"
sed -i '' "s/text: 'In dialogue, ensuring everyone understands and feels heard'/text: 'Im Dialog, damit alle verstehen und sich gehört fühlen'/" "$FILE"
sed -i '' "s/text: 'Clearly and concisely with specific action items'/text: 'Klar und präzise mit spezifischen Action Items'/" "$FILE"
sed -i '' "s/text: 'Directly and decisively with clear expectations'/text: 'Direkt und entschieden mit klaren Expectations'/" "$FILE"
sed -i '' "s/text: 'Through questions that help others discover insights'/text: 'Durch Questions, die anderen helfen, Insights selbst zu entdecken'/" "$FILE"

# Question 17
sed -i '' "s/text: 'When facing a major obstacle, your approach is to:'/text: 'Wenn du mit einem großen Obstacle konfrontiert bist, ist dein Ansatz:'/" "$FILE"
sed -i '' "s/text: 'Reframe it as an opportunity and inspire creative solutions'/text: 'Es als Opportunity zu reframen und kreative Solutions zu inspirieren'/" "$FILE"
sed -i '' "s/text: 'Break it down systematically and engineer a solution'/text: 'Es systematisch zu breaken und eine Solution zu engineeren'/" "$FILE"
sed -i '' "s/text: 'Rally the team to tackle it together'/text: 'Das Team zu rallyen, es gemeinsam anzugehen'/" "$FILE"
sed -i '' "s/text: 'Find the fastest path around or through it'/text: 'Den schnellsten Path drumherum oder hindurch zu finden'/" "$FILE"
sed -i '' "s/text: 'Take charge, make the tough calls, and push through'/text: 'Charge zu übernehmen, tough Calls zu machen und durchzupushen'/" "$FILE"
sed -i '' "s/text: 'Challenge your team to find the solution themselves'/text: 'Dein Team zu challengen, die Solution selbst zu finden'/" "$FILE"

# Question 18
sed -i '' "s/text: 'In meetings, you are most likely to:'/text: 'In Meetings neigst du am ehesten dazu:'/" "$FILE"
sed -i '' "s/text: 'Share bold ideas and challenge conventional thinking'/text: 'Bold Ideas zu sharen und konventionelles Denken zu challengen'/" "$FILE"
sed -i '' "s/text: 'Present frameworks and analytical insights'/text: 'Frameworks und analytische Insights zu präsentieren'/" "$FILE"
sed -i '' "s/text: 'Ensure everyone has a voice and the discussion stays productive'/text: 'Sicherzustellen, dass alle eine Voice haben und die Discussion produktiv bleibt'/" "$FILE"
sed -i '' "s/text: 'Drive toward decisions and action items'/text: 'Auf Decisions und Action Items hinzutreiben'/" "$FILE"
sed -i '' "s/text: 'Take control and keep things on track'/text: 'Control zu übernehmen und alles on track zu halten'/" "$FILE"
sed -i '' "s/text: 'Ask questions that deepen thinking and clarity'/text: 'Questions zu stellen, die Thinking und Clarity vertiefen'/" "$FILE"

echo "Leadership questions 13-18 translated!"
