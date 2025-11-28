#!/usr/bin/env python3

with open('brown-belt-assessment.de.html', 'r', encoding='utf-8') as f:
    content = f.read()

translations = [
    # Header
    ('Brown Belt Assessment', 'Brown Belt Assessment'),
    ('Avoidance of Accountability • Final Evaluation', 'Avoidance of Accountability • Final Evaluation'),
    
    # Overview section
    ('Assessment Overview', 'Assessment Übersicht'),
    ("You've completed all four Brown Belt stripes and learned the foundations of accountability. This assessment evaluates your understanding of how to build, maintain, and embody accountability in real leadership scenarios.",
     "Du hast alle vier Brown Belt Stripes abgeschlossen und die Foundations von Accountability gelernt. Dieses Assessment evaluiert dein Verständnis davon, wie du Accountability in echten Leadership Scenarios buildest, maintainst und embodiest."),
    
    # Requirements
    ('What to Expect', 'Was dich erwartet'),
    ('<strong>15 Scenario Questions:</strong> Real-world accountability challenges requiring judgment and application of principles',
     '<strong>15 Scenario Fragen:</strong> Real-world Accountability Challenges, die Judgment und Application von Principles erfordern'),
    ('<strong>3 Reflection Questions:</strong> Deep thinking about your own accountability patterns (100+ words each)',
     '<strong>3 Reflektions-Fragen:</strong> Deep Thinking über deine eigenen Accountability Patterns (100+ Wörter jeweils)'),
    ('<strong>3 Practical Commitments:</strong> Specific actions you\'ll take to strengthen accountability',
     '<strong>3 Praktische Commitments:</strong> Spezifische Actions, die du machen wirst, um Accountability zu strengthenen'),
    ('<strong>Passing Score:</strong> 12 out of 15 correct (80%)',
     '<strong>Passing Score:</strong> 12 von 15 richtig (80%)'),
    ('<strong>Time:</strong> 30-40 minutes',
     '<strong>Zeit:</strong> 30-40 Minuten'),
    ('<strong>Reward:</strong> 1,500 XP + Black Belt Unlock',
     '<strong>Reward:</strong> 1.500 XP + Black Belt Unlock'),
    
    # Instructions
    ('<strong>Instructions:</strong> Read each scenario carefully. Choose the response that best demonstrates high accountability leadership. There\'s one best answer for each question. Your reflections and commitments will be saved for your reference.',
     '<strong>Instruktionen:</strong> Lies jedes Scenario sorgfältig. Wähl die Response, die High Accountability Leadership am besten demonstriert. Es gibt eine beste Antwort für jede Frage. Deine Reflektionen und Commitments werden für deine Referenz gespeichert.'),
    
    # Section titles
    ('Part 1: Accountability Scenarios (15 Questions)', 'Teil 1: Accountability Scenarios (15 Fragen)'),
    
    # Q1
    ('Question 1: The Missed Commitment', 'Frage 1: Das Missed Commitment'),
    ('Your team member Sarah committed to delivering a feature by Friday. It\'s Monday morning and she hasn\'t delivered it or communicated anything. What\'s your best first response?',
     'Dein Team Member Sarah hat committed, ein Feature bis Freitag zu delivern. Es ist Montagmorgen und sie hat es nicht gedelivert oder irgendetwas kommuniziert. Was ist deine beste First Response?'),
    ('A) Wait for her to bring it up in the next 1-on-1 (scheduled for Wednesday)',
     'A) Warten, bis sie es im nächsten 1-on-1 anspricht (scheduled für Mittwoch)'),
    ('B) Message her today: "You committed to the feature by Friday. It\'s Monday and I haven\'t seen it. What happened?"',
     'B) Message sie heute: "Du hast committed, das Feature bis Freitag zu liefern. Es ist Montag und ich hab es nicht gesehen. Was ist passiert?"'),
    ('C) Bring it up in the team standup so everyone knows missed commitments have consequences',
     'C) Bring es im Team Standup an, damit alle wissen, dass Missed Commitments Konsequenzen haben'),
    ('D) Assume she had a good reason and reassign the work to someone else',
     'D) Annehmen, dass sie einen guten Grund hatte und die Arbeit jemand anderem reassignen'),
    
    # Q2
    ('Question 2: Peer Accountability Failure', 'Frage 2: Peer Accountability Failure'),
    ('You\'ve built a culture where team members are supposed to hold each other accountable. But you notice they still wait for you to address gaps instead of talking to each other directly. What\'s the root cause you should address?',
     'Du hast eine Culture gebuildet, wo Team Members sich gegenseitig accountable halten sollen. Aber du merkst, dass sie immer noch warten, bis du Gaps addresst, anstatt direkt miteinander zu reden. Was ist die Root Cause, die du addressen solltest?'),
    ('A) They don\'t have clear enough standards to know what to call out',
     'A) Sie haben nicht klare genug Standards, um zu wissen, was sie callen sollen'),
    ('B) They don\'t feel psychologically safe calling out peers',
     'B) Sie fühlen sich nicht psychologically safe, Peers zu callen'),
    ('C) You haven\'t explicitly given them permission and modeled it',
     'C) Du hast ihnen nicht explizit Permission gegeben und es gemodelt'),
    ('D) They\'re lazy and don\'t care about the team',
     'D) Sie sind lazy und kümmern sich nicht um das Team'),
    
    # Q3
    ('Question 3: The Chronic Low Performer', 'Frage 3: Der Chronic Low Performer'),
    ('You\'ve been coaching Marcus for 4 months on his performance gaps. He tries hard but isn\'t improving. The team is frustrated carrying his workload. What should you do?',
     'Du coachst Marcus seit 4 Monaten zu seinen Performance Gaps. Er versucht hard, aber verbessert sich nicht. Das Team ist frustriert, seine Workload zu carrien. Was solltest du tun?'),
    ('A) Keep coaching—firing people is mean',
     'A) Weitercoachen—Leute zu firen ist mean'),
    ('B) Move to performance management with clear timeline and consequences',
     'B) Move zu Performance Management mit klarem Timeline und Konsequenzen'),
    ('C) Reduce his responsibilities so he can succeed at a lower level',
     'C) Reduziere seine Responsibilities, damit er auf einem niedrigeren Level succeeeden kann'),
    ('D) Wait until annual review to address it formally',
     'D) Warten bis zum Annual Review, um es formal zu addressen'),
    
    # Q4
    ('Question 4: Cross-Team Blocker', 'Frage 4: Cross-Team Blocker'),
    ('Your project depends on the API team delivering an endpoint. They\'ve missed 3 deadlines in a row. You don\'t manage that team. What\'s your best approach?',
     'Dein Projekt hängt davon ab, dass das API Team ein Endpoint delivered. Sie haben 3 Deadlines in a Row gemisst. Du managst dieses Team nicht. Was ist dein bester Approach?'),
    ('A) Complain to your boss and hope they fix it',
     'A) Deinem Boss complain und hoffen, dass sie es fixen'),
    ('B) Talk directly to the API team lead about impact and timeline, escalate to shared manager if unresolved',
     'B) Direkt mit dem API Team Lead über Impact und Timeline reden, zum Shared Manager escalaten, falls unresolved'),
    ('C) Build a workaround so you\'re not dependent on them',
     'C) Ein Workaround builden, damit du nicht dependent von ihnen bist'),
    ('D) Keep following up weekly via email',
     'D) Weiter weekly via Email follow-upen'),
    
    # Q5
    ('Question 5: Your Boss Undermines Standards', 'Frage 5: Dein Boss Underminet Standards'),
    ('You\'ve asked your team to update the project board daily. Your boss tells someone on your team "don\'t worry about the board, just focus on shipping." This undermines your accountability system. What do you do?',
     'Du hast dein Team gebeten, das Project Board daily zu updaten. Dein Boss sagt zu jemandem in deinem Team "mach dir keine Sorgen über das Board, fokussier dich einfach aufs Shippen." Das underminet dein Accountability System. Was tust du?'),
    ('A) Let it go—boss outranks you',
     'A) Es lassen—Boss outrankt dich'),
    ('B) Talk to your boss privately: "When you override my requests, it makes it hard for me to build accountability. Can we align on standards?"',
     'B) Mit deinem Boss privat reden: "Wenn du meine Requests overridest, macht es es hard für mich, Accountability zu builden. Können wir uns auf Standards alignen?"'),
    ('C) Tell your team to ignore your boss and keep updating the board',
     'C) Deinem Team sagen, deinen Boss zu ignoren und das Board weiterzuupdaten'),
    ('D) Abandon the board since your boss doesn\'t value it',
     'D) Das Board abandonen, da dein Boss es nicht valued'),
    
    # Q6
    ('Question 6: Accountability Under Pressure', 'Frage 6: Accountability Under Pressure'),
    ('Your CEO declares a feature "urgent" and wants it shipped Friday, skipping code review. Your standard is all code gets reviewed. What\'s the high-accountability response?',
     'Dein CEO declared ein Feature als "urgent" und will es Freitag shippen, Code Review skippend. Dein Standard ist, dass aller Code reviewt wird. Was ist die High-Accountability Response?'),
    ('A) Skip the review—CEO\'s request overrides standards',
     'A) Das Review skippen—CEOs Request overridet Standards'),
    ('B) Push back hard: "We never skip reviews, period"',
     'B) Hart pushbacken: "Wir skippen nie Reviews, period"'),
    ('C) Name the trade-off: "To ship Friday without review risks bugs. We can do rapid review with one senior engineer or ship Monday with full review. Which do you prefer?"',
     'C) Den Trade-off namen: "Um Freitag ohne Review zu shippen, risken wir Bugs. Wir können ein Rapid Review mit einem Senior Engineer machen oder Montag mit Full Review shippen. Was preferst du?"'),
    ('D) Have the team work all weekend to finish early so you can do a full review and still hit Friday',
     'D) Das Team das ganze Wochenende arbeiten lassen, um früh zu finishen, damit du ein Full Review machen kannst und trotzdem Freitag hitten'),
    
    # Q7
    ('Question 7: Culture Erosion Warning Sign', 'Frage 7: Culture Erosion Warning Sign'),
    ('You notice your team\'s public commitment board hasn\'t been updated in 2 weeks. People are making vague commitments like "I\'ll work on the redesign." What does this signal?',
     'Du merkst, dass das Public Commitment Board deines Teams seit 2 Wochen nicht geupdatet wurde. Leute machen vage Commitments wie "Ich werde am Redesign arbeiten." Was signalt das?'),
    ('A) The board tool is bad, switch to a different tool',
     'A) Das Board Tool ist bad, zu einem anderen Tool switchen'),
    ('B) Early culture erosion—systems are decaying and specificity is disappearing',
     'B) Early Culture Erosion—Systeme decayen und Specificity disappeart'),
    ('C) People are too busy for the board right now',
     'C) Leute sind zu busy für das Board right now'),
    ('D) You\'re micromanaging, let them work how they want',
     'D) Du micromanagst, lass sie arbeiten, wie sie wollen'),
    
    # Q8
    ('Question 8: Ambiguous Ownership', 'Frage 8: Ambiguous Ownership'),
    ('A project involving Engineering, Product, and Design fails to launch on time. Each team says they did their part but the other teams dropped the ball. What\'s the root accountability issue?',
     'Ein Projekt, das Engineering, Product und Design involviert, failt, on Time zu launchen. Jedes Team sagt, sie haben ihren Part gemacht, aber die anderen Teams haben den Ball gedroppt. Was ist das Root Accountability Issue?'),
    ('A) No single person was accountable for the whole outcome',
     'A) Keine einzelne Person war accountable für das ganze Outcome'),
    ('B) The teams don\'t like each other',
     'B) Die Teams mögen sich nicht gegenseitig'),
    ('C) The deadline was unrealistic',
     'C) Die Deadline war unrealistic'),
    ('D) Someone is lying about doing their part',
     'D) Jemand lügt darüber, seinen Part gemacht zu haben'),
    
    # Q9
    ('Question 9: Renegotiating Commitments', 'Frage 9: Commitments Renegotiatieren'),
    ('You committed to delivering a report by Friday. On Wednesday you realize it\'s going to take until Monday to do it well. What\'s the accountable response?',
     'Du hast committed, einen Report bis Freitag zu delivern. Am Mittwoch realisierst du, dass es bis Montag dauern wird, es well zu machen. Was ist die accountable Response?'),
    ('A) Work all weekend to hit Friday even if quality suffers',
     'A) Das ganze Wochenende arbeiten, um Freitag zu hitten, auch wenn Quality leidet'),
    ('B) Message Wednesday: "I committed to Friday, but I need until Monday to do this right. Does that work, or should I deliver partial version Friday?"',
     'B) Message Mittwoch: "Ich hab zu Freitag committed, aber ich brauche bis Montag, um das right zu machen. Geht das, oder soll ich eine Partial Version Freitag delivern?"'),
    ('C) Deliver Friday with a disclaimer: "This is rushed, sorry"',
     'C) Freitag delivern mit einem Disclaimer: "Das ist rushed, sorry"'),
    ('D) Don\'t say anything Wednesday, deliver Monday, apologize then',
     'D) Mittwoch nichts sagen, Montag delivern, dann apologizen'),
    
    # Q10
    ('Question 10: Modeling Accountability', 'Frage 10: Accountability Modeln'),
    ('You want your team to make explicit public commitments. What\'s the most effective way to build this habit?',
     'Du willst, dass dein Team explizite Public Commitments macht. Was ist der effektivste Way, diesen Habit zu builden?'),
    ('A) Send an email explaining why public commitments matter',
     'A) Eine Email senden, die erklärt, warum Public Commitments mattern'),
    ('B) Start every team meeting by stating your own crisp commitments first, then ask them for theirs',
     'B) Jedes Team Meeting starten, indem du zuerst deine eigenen Crisp Commitments statest, dann sie nach ihren fragst'),
    ('C) Require everyone to submit written commitments every Monday',
     'C) Requiren, dass jeder geschriebene Commitments jeden Montag submitted'),
    ('D) Call out people who make vague commitments',
     'D) Leute callen, die vage Commitments machen'),
    
    # Q11
    ('Question 11: Good Effort, Bad Outcome', 'Frage 11: Good Effort, Bad Outcome'),
    ('A team member worked 50 hours this week and shipped on time, but the quality is poor and full of bugs. How do you address this?',
     'Ein Team Member hat diese Woche 50 Stunden gearbeitet und on Time geshipped, aber die Quality ist poor und voller Bugs. Wie addresst du das?'),
    ('A) Praise the effort: "Thanks for working so hard!"',
     'A) Den Effort preisen: "Danke, dass du so hard gearbeitet hast!"'),
    ('B) Focus only on the outcome: "The quality isn\'t acceptable"',
     'B) Nur auf das Outcome fokussieren: "Die Quality ist nicht acceptable"'),
    ('C) Acknowledge effort AND address outcome: "I see how hard you worked, and the quality still isn\'t where it needs to be. Let\'s figure out what went wrong."',
     'C) Effort acknowledgen UND Outcome addressen: "Ich sehe, wie hard du gearbeitet hast, und die Quality ist immer noch nicht, wo sie sein muss. Lass uns rausfinden, was wrong gelaufen ist."'),
    ('A) Don\'t say anything—they\'re already stressed',
     'A) Nichts sagen—sie sind bereits gestresst'),
    
    # Q12
    ('Question 12: System vs. Person Problem', 'Frage 12: System vs. Person Problem'),
    ('Three different people have missed the same type of deadline over the last 2 months. What does this pattern suggest?',
     'Drei verschiedene Leute haben die gleiche Art von Deadline über die letzten 2 Monate gemisst. Was suggestet dieses Pattern?'),
    ('A) You hired the wrong people',
     'A) Du hast die falschen Leute gehired'),
    ('B) There\'s a systemic issue—unclear process, unrealistic timeline, or missing dependencies',
     'B) Es gibt ein systemisches Issue—unklarer Process, unrealistische Timeline oder Missing Dependencies'),
    ('C) People aren\'t trying hard enough',
     'C) Leute versuchen nicht hard genug'),
    ('D) The team doesn\'t respect deadlines',
     'D) Das Team respectet Deadlines nicht'),
    
    # Q13
    ('Question 13: Holding Your Boss Accountable', 'Frage 13: Deinen Boss Accountable Halten'),
    ('Your boss committed to making a budget decision 3 weeks ago. You\'ve followed up twice via email with no response. Your team is blocked. What\'s your best next step?',
     'Dein Boss hat committed, eine Budget Decision vor 3 Wochen zu machen. Du hast zweimal via Email followed-up ohne Response. Dein Team ist blocked. Was ist dein bester Next Step?'),
    ('A) Send another follow-up email',
     'A) Noch ein Follow-up Email senden'),
    ('B) Request a 15-minute meeting: "My team is blocked on the budget decision. What\'s preventing it? Can I help move it forward?"',
     'B) Ein 15-Minuten Meeting requesten: "Mein Team ist blocked auf der Budget Decision. Was prevented es? Kann ich helfen, es forward zu moven?"'),
    ('C) Complain to your boss\'s boss',
     'C) Dem Boss deines Bosses complain'),
    ('D) Make the decision yourself since they\'re not responding',
     'D) Die Decision selbst machen, da sie nicht responden'),
    
    # Q14
    ('Question 14: Celebrating Accountability', 'Frage 14: Accountability Celebraten'),
    ('A team member proactively updated you that his Friday commitment would slip to Monday due to unexpected technical debt. How should you respond?',
     'Ein Team Member hat dich proactively geupdatet, dass sein Friday Commitment auf Montag slippen würde wegen Unexpected Technical Debt. Wie solltest du responden?'),
    ('A) Express frustration about the delay',
     'A) Frustration über den Delay expressen'),
    ('B) Say nothing—this should be normal behavior',
     'B) Nichts sagen—das sollte Normal Behavior sein'),
    ('C) Thank them for the early heads-up and adjust plans together—model that renegotiation is valued',
     'C) Ihnen für den Early Heads-up danken und Plans zusammen adjusten—modeln, dass Renegotiation valued wird'),
    ('D) Ask why they didn\'t plan better',
     'D) Fragen, warum sie nicht besser geplant haben'),
    
    # Q15
    ('Question 15: The Accountability Conversation', 'Frage 15: Das Accountability Conversation'),
    ('You need to address a pattern of missed commitments with a team member. What\'s the most important element of that conversation?',
     'Du musst ein Pattern von Missed Commitments mit einem Team Member addressen. Was ist das wichtigste Element dieses Conversations?'),
    ('A) Making them feel bad so they change',
     'A) Sie schlecht fühlen lassen, damit sie sich ändern'),
    ('B) Stating the facts, naming the impact, asking for their perspective, and agreeing on specific next actions',
     'B) Die Facts staten, den Impact namen, nach ihrer Perspective fragen und auf spezifische Next Actions agreeen'),
    ('C) Giving them one more chance without specific expectations',
     'C) Ihnen noch eine Chance geben ohne spezifische Expectations'),
    ('D) Comparing them to better performers on the team',
     'D) Sie mit besseren Performern im Team comparen'),
]

for english, german in translations:
    content = content.replace(english, german)

with open('brown-belt-assessment.de.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Translated Brown Belt questions 1-15")
print(f"   Total translations: {len(translations)}")
