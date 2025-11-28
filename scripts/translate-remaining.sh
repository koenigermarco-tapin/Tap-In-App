#!/bin/bash

FILE="/Users/marcok./Downloads/tap-in-netlify-deploy/combined-profile-carousel.de.html"

# Worker Type - Sprinter strengths
sed -i '' "s/'Intense focus when engaged'/'Intense Focus wenn engaged'/g" "$FILE"
sed -i '' "s/'Thrive under pressure'/'Thrivet unter Pressure'/g" "$FILE"
sed -i '' "s/'High output in short bursts'/'High Output in Short Bursts'/g" "$FILE"
sed -i '' "s/'Excel at deadline-driven work'/'Excellst bei deadline-driven Work'/g" "$FILE"

# Worker Type - Sprinter tips
sed -i '' "s/'Schedule 90-min deep work blocks'/'Schedule 90-min Deep Work Blocks'/g" "$FILE"
sed -i '' "s/'Build in recovery time'/'Baue Recovery Time ein'/g" "$FILE"
sed -i '' "s/'Protect your peak hours'/'Schütze deine Peak Hours'/g" "$FILE"
sed -i '' "s|'Don\\\\'t fight your rhythm'|'Kämpfe nicht gegen deinen Rhythm'|g" "$FILE"

# Worker Type - Jogger strengths
sed -i '' "s/'Consistent daily output'/'Consistent Daily Output'/g" "$FILE"
sed -i '' "s/'Reliable and predictable'/'Reliable und Predictable'/g" "$FILE"
sed -i '' "s/'Sustainable over time'/'Sustainable über Zeit'/g" "$FILE"
sed -i '' "s/'Great at routine excellence'/'Great bei Routine Excellence'/g" "$FILE"

# Worker Type - Jogger tips
sed -i '' "s/'Build strong daily routines'/'Baue starke Daily Routines'/g" "$FILE"
sed -i '' "s/'Avoid over-committing to sprints'/'Vermeide Over-Committing zu Sprints'/g" "$FILE"
sed -i '' "s/'Leverage your consistency'/'Leverage deine Consistency'/g" "$FILE"
sed -i '' "s/'Create systems for success'/'Kreiere Systems for Success'/g" "$FILE"

# Worker Type - Ultrarunner strengths
sed -i '' "s/'Exceptional endurance'/'Exceptional Endurance'/g" "$FILE"
sed -i '' "s/'Deep focus for hours'/'Deep Focus für Stunden'/g" "$FILE"
sed -i '' "s/'Rarely burn out'/'Burnst rarely out'/g" "$FILE"
sed -i '' "s/'Excel at complex, long-term projects'/'Excellst bei komplexen, Long-Term Projects'/g" "$FILE"

# Worker Type - Ultrarunner tips
sed -i '' "s/'Embrace your slow-and-steady approach'/'Embrace deinen Slow-and-Steady Approach'/g" "$FILE"
sed -i '' "s/'Avoid artificial urgency'/'Vermeide artificial Urgency'/g" "$FILE"
sed -i '' "s/'Take on ambitious long-term projects'/'Übernimm ambitionierte Long-Term Projects'/g" "$FILE"
sed -i '' "s/'Trust your endurance'/'Vertraue deiner Endurance'/g" "$FILE"

# Leadership - Visionary
sed -i '' "s/'Strategic thinking'/'Strategic Thinking'/g" "$FILE"
sed -i '' "s/'Inspiring communication'/'Inspiring Communication'/g" "$FILE"
sed -i '' "s/'Creating alignment'/'Creating Alignment'/g" "$FILE"
sed -i '' "s/'Navigating ambiguity'/'Navigating Ambiguity'/g" "$FILE"
sed -i '' "s/'May overlook details'/'Könnte Details overlooken'/g" "$FILE"
sed -i '' "s/'Can move too fast'/'Kann zu fast moven'/g" "$FILE"
sed -i '' "s/'Need to balance vision with execution'/'Muss Vision mit Execution balancen'/g" "$FILE"

# Leadership - Architect
sed -i '' "s/'Systems thinking'/'Systems Thinking'/g" "$FILE"
sed -i '' "s/'Analytical problem-solving'/'Analytical Problem-Solving'/g" "$FILE"
sed -i '' "s/'Process optimization'/'Process Optimization'/g" "$FILE"
sed -i '' "s/'Strategic planning'/'Strategic Planning'/g" "$FILE"
sed -i '' "s/'Can over-engineer'/'Kann over-engineeren'/g" "$FILE"
sed -i '' "s/'May miss emotional dynamics'/'Könnte emotionale Dynamics missen'/g" "$FILE"
sed -i '' "s/'Need to balance logic with people'/'Muss Logic mit People balancen'/g" "$FILE"

# Leadership - Facilitator
sed -i '' "s/'Building trust'/'Building Trust'/g" "$FILE"
sed -i '' "s/'Conflict resolution'/'Conflict Resolution'/g" "$FILE"
sed -i '' "s/'Team development'/'Team Development'/g" "$FILE"
sed -i '' "s/'Can avoid tough decisions'/'Kann tough Decisions vermeiden'/g" "$FILE"
sed -i '' "s/'May prioritize harmony over results'/'Könnte Harmony über Results priorisieren'/g" "$FILE"
sed -i '' "s/'Need to balance care with candor'/'Muss Care mit Candor balancen'/g" "$FILE"

# Leadership - Executor
sed -i '' "s/'Bias for action'/'Bias for Action'/g" "$FILE"
sed -i '' "s/'Overcoming obstacles'/'Overcoming Obstacles'/g" "$FILE"
sed -i '' "s/'Driving results'/'Driving Results'/g" "$FILE"
sed -i '' "s/'Creating momentum'/'Creating Momentum'/g" "$FILE"
sed -i '' "s/'Can rush strategy'/'Kann Strategy rushen'/g" "$FILE"
sed -i '' "s/'May overlook people development'/'Könnte People Development overlooken'/g" "$FILE"
sed -i '' "s/'Need to balance speed with sustainability'/'Muss Speed mit Sustainability balancen'/g" "$FILE"

# Leadership - Commander
sed -i '' "s/'Decisive leadership'/'Decisive Leadership'/g" "$FILE"
sed -i '' "s/'Clear direction'/'Clear Direction'/g" "$FILE"
sed -i '' "s/'High standards'/'High Standards'/g" "$FILE"
sed -i '' "s/'Crisis management'/'Crisis Management'/g" "$FILE"
sed -i '' "s/'Can be too directive'/'Kann zu directive sein'/g" "$FILE"
sed -i '' "s|'May not delegate enough'|'Könnte nicht genug delegaten'|g" "$FILE"
sed -i '' "s|'Need to develop others\\\\' autonomy'|'Muss Autonomy anderer entwickeln'|g" "$FILE"

# Leadership - Coach
sed -i '' "s/'Developing talent'/'Developing Talent'/g" "$FILE"
sed -i '' "s/'Asking powerful questions'/'Asking Powerful Questions'/g" "$FILE"
sed -i '' "s/'Building capability'/'Building Capability'/g" "$FILE"
sed -i '' "s/'Long-term thinking'/'Long-Term Thinking'/g" "$FILE"
sed -i '' "s/'Can be too patient'/'Kann zu patient sein'/g" "$FILE"
sed -i '' "s/'May under-direct when needed'/'Könnte under-directen wenn nötig'/g" "$FILE"
sed -i '' "s/'Need to balance development with delivery'/'Muss Development mit Delivery balancen'/g" "$FILE"

echo "All remaining English strengths, tips, and challenges translated!"
