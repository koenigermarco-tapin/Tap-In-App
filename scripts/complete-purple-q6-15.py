#!/usr/bin/env python3
import re

def translate_purple_q6_15():
    file_path = 'purple-belt-assessment.de.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    translations = [
        # Question 6
        ('In your team\'s planning meeting, everyone commits to aggressive goals. Privately, several people tell you \n                        "there\'s no way we\'ll hit those numbers." What\'s the systemic problem?',
         'Im Planning Meeting deines Teams committen alle zu aggressiven Goals. Privat sagen dir mehrere Leute \n                        "es gibt keine Chance, dass wir diese Zahlen treffen." Was ist das systemische Problem?'),
        ('People are lazy and don\'t want to work hard.', 'Leute sind faul und wollen nicht hart arbeiten.'),
        ('Lack of psychological safety—people can\'t speak truth about capacity in public settings.',
         'Mangel an Psychological Safety—Leute können die Wahrheit über Capacity nicht in öffentlichen Settings aussprechen.'),
        ('The goals aren\'t aggressive enough—teams always sandbag estimates.',
         'Die Goals sind nicht aggressiv genug—Teams sandbagen immer Estimates.'),
        ('People need better project management training to estimate accurately.',
         'Leute brauchen besseres Project Management Training, um akkurat zu schätzen.'),
        
        # Question 7
        ('You want to build a culture where commitments are taken seriously. What\'s the most effective practice \n                        to implement?',
         'Du willst eine Culture aufbauen, in der Commitments ernst genommen werden. Was ist die effektivste Practice \n                        zu implementieren?'),
        ('Punish anyone who misses a deadline to create accountability.',
         'Bestrafe jeden, der eine Deadline verpasst, um Accountability zu kreieren.'),
        ('Make all commitments public in a shared tracker with specific "What by When by Whom" details.',
         'Mache alle Commitments public in einem Shared Tracker mit spezifischen "What by When by Whom" Details.'),
        ('Stop making commitments altogether—work is too unpredictable.',
         'Höre komplett auf, Commitments zu machen—Work ist zu unvorhersehbar.'),
        ('Only allow leaders to make commitments—individual contributors can\'t be trusted.',
         'Erlaube nur Leaders, Commitments zu machen—Individual Contributors kann nicht vertraut werden.'),
        
        # Question 8
        ('You\'re running at 110% capacity. Your manager asks if you can take on "one more small thing." \n                        You know it\'s not actually small. What\'s the best response?',
         'Du läufst bei 110% Capacity. Dein Manager fragt, ob du "noch eine kleine Sache" übernehmen kannst. \n                        Du weißt, es ist nicht wirklich klein. Was ist die beste Response?'),
        ('Say yes—saying no makes you look uncommitted or lazy.',
         'Sage ja—nein zu sagen lässt dich uncommitted oder faul aussehen.'),
        ('Say "I\'m at capacity. Here\'s my current load. If this is priority, what should I drop or delay?"',
         'Sage "Ich bin bei Capacity. Hier ist meine Current Load. Wenn das Priority ist, was soll ich droppen oder delayen?"'),
        ('Say yes, then work nights and weekends to fit it in.',
         'Sage ja, dann arbeite Nächte und Wochenenden, um es reinzubekommen.'),
        ('Say yes, but do a mediocre job since you don\'t have time to do it well.',
         'Sage ja, aber mache einen mittelmäßigen Job, da du keine Zeit hast, es gut zu machen.'),
        
        # Question 9
        ('You\'ve told yourself for three weeks that you\'ll start exercising before work. Every morning you hit snooze \n                        and skip it. What\'s the integrity issue?',
         'Du hast dir drei Wochen lang gesagt, dass du vor der Arbeit mit Sport anfangen wirst. Jeden Morgen drückst du Snooze \n                        und überspringst es. Was ist das Integrity Issue?'),
        ('Personal commitments don\'t matter as much as professional ones—this isn\'t a real problem.',
         'Persönliche Commitments zählen nicht so viel wie professionelle—das ist kein echtes Problem.'),
        ('You\'re lazy and just need more willpower.', 'Du bist faul und brauchst einfach mehr Willpower.'),
        ('You\'re eroding self-trust by repeatedly breaking commitments to yourself, which affects all areas of leadership.',
         'Du erodierst Self-Trust, indem du wiederholt Commitments zu dir selbst brichst, was alle Bereiche von Leadership beeinflusst.'),
        ('Morning isn\'t the right time—just exercise whenever you feel like it.',
         'Morgen ist nicht die richtige Zeit—trainiere einfach, wann immer du Lust hast.'),
        
        # Question 10
        ('Your team constantly misses commitments because "things come up." What structural change would help most?',
         'Dein Team verpasst ständig Commitments, weil "Dinge aufkommen." Welche strukturelle Änderung würde am meisten helfen?'),
        ('Fire the people who miss deadlines most often.',
         'Feuere die Leute, die Deadlines am häufigsten verpassen.'),
        ('Implement a weekly "commitment review" where all promises are tracked and blockers are surfaced publicly.',
         'Implementiere ein wöchentliches "Commitment Review", wo alle Promises getrackt werden und Blocker public gesurfaced werden.'),
        ('Stop making any commitments—work is too unpredictable.',
         'Höre auf, irgendwelche Commitments zu machen—Work ist zu unvorhersehbar.'),
        ('Hire a project manager to track everything for the team.',
         'Stelle einen Project Manager ein, um alles fürs Team zu tracken.'),
        
        # Question 11
        ('A sales rep promises a client a custom feature by next week without consulting engineering. The client \n                        is excited. Engineering says it\'ll take six weeks minimum. What\'s your move as the engineering leader?',
         'Ein Sales Rep verspricht einem Client ein Custom Feature bis nächste Woche ohne Engineering zu konsultieren. Der Client \n                        ist excited. Engineering sagt, es dauert mindestens sechs Wochen. Was ist dein Move als Engineering Leader?'),
        ('Crunch mode for a week—the client is counting on us now.',
         'Crunch Mode für eine Woche—der Client zählt jetzt auf uns.'),
        ('Call the client immediately: "Sales made a mistake. It\'ll be six weeks." Then fix the internal process.',
         'Rufe den Client sofort an: "Sales hat einen Fehler gemacht. Es dauert sechs Wochen." Dann fixe den Internal Process.'),
        ('Let sales deal with it—they made the promise, they can handle the consequences.',
         'Lass Sales damit umgehen—sie haben das Promise gemacht, sie können die Consequences handlen.'),
        ('Ship a half-finished version in a week, then iterate based on client feedback.',
         'Shippe eine Half-Finished Version in einer Woche, dann iteriere basierend auf Client Feedback.'),
        
        # Question 12
        ('A junior team member has missed three small commitments in a row (updating docs, responding to PRs, attending standups). \n                        How do you coach them?',
         'Ein Junior Team Member hat drei kleine Commitments in Folge verpasst (Docs updaten, auf PRs antworten, zu Standups gehen). \n                        Wie coachst du sie?'),
        ('Ignore it—they\'re junior and still learning.',
         'Ignoriere es—sie sind Junior und lernen noch.'),
        ('Put them on a performance improvement plan immediately.',
         'Setze sie sofort auf einen Performance Improvement Plan.'),
        ('Say "I\'ve noticed a pattern. These seem small, but commitments are commitments. What\'s getting in the way? How can we set you up to follow through?"',
         'Sage "Ich habe ein Pattern bemerkt. Diese scheinen klein, aber Commitments sind Commitments. Was steht im Weg? Wie können wir dich setuppen, um durchzuziehen?"'),
        ('Stop giving them commitments to make—just do the work yourself.',
         'Höre auf, ihnen Commitments zu geben—mache die Work einfach selbst.'),
        
        # Question 13
        ('Your CEO asks you in a board meeting "Can we launch this quarter?" You know it\'s technically possible \n                        but would require the team to work 70-hour weeks. What do you say?',
         'Dein CEO fragt dich in einem Board Meeting "Können wir dieses Quarter launchen?" Du weißt, es ist technisch möglich, \n                        aber würde erfordern, dass das Team 70-Stunden-Wochen arbeitet. Was sagst du?'),
        ('"Yes, we can do it!" Don\'t make the CEO look bad in front of the board.',
         '"Ja, wir können es schaffen!" Lass den CEO nicht schlecht vor dem Board aussehen.'),
        ('"We can launch this quarter if the team works unsustainable hours. That\'s not a commitment I\'ll make. Here are sustainable alternatives."',
         '"Wir können dieses Quarter launchen, wenn das Team unsustainable Hours arbeitet. Das ist kein Commitment, das ich machen werde. Hier sind sustainable Alternativen."'),
        ('"I\'ll check with the team and let you know after the meeting."',
         '"Ich checke mit dem Team und lasse es dich nach dem Meeting wissen."'),
        ('"We can launch a reduced-scope version this quarter. Full feature set will take one more quarter."',
         '"Wir können eine Reduced-Scope Version dieses Quarter launchen. Das Full Feature Set braucht ein weiteres Quarter."'),
        
        # Question 14
        ('As a leader, which behavior MOST powerfully signals that commitments matter in your culture?',
         'Als Leader, welches Behavior signalisiert am KRAFTVOLLSTEN, dass Commitments in deiner Culture zählen?'),
        ('Sending emails at 2am to show you work harder than everyone.',
         'E-Mails um 2 Uhr morgens senden, um zu zeigen, dass du härter arbeitest als alle anderen.'),
        ('Publicly calling out people who miss deadlines in team meetings.',
         'Public Leute callouten, die Deadlines in Team Meetings verpassen.'),
        ('When you miss a commitment, immediately owning it publicly, explaining what happened, and renegotiating.',
         'Wenn du ein Commitment verpasst, es sofort public ownen, erklären, was passiert ist, und renegotiatieren.'),
        ('Never missing any commitment, no matter the personal cost.',
         'Niemals irgendein Commitment verpassen, egal welche persönlichen Kosten.'),
        
        # Question 15
        ('What\'s the paradox at the heart of high-commitment cultures?',
         'Was ist das Paradox im Herzen von High-Commitment Cultures?'),
        ('The harder you push for commitments, the less people actually deliver.',
         'Je härter du für Commitments pushst, desto weniger delivern Leute tatsächlich.'),
        ('You build commitment culture by making it safe to say no and renegotiate, not by punishing broken promises.',
         'Du buildest Commitment Culture, indem du es safe machst, nein zu sagen und zu renegotiatieren, nicht durch das Bestrafen von gebrochenen Promises.'),
        ('Commitments kill innovation because they reduce flexibility.',
         'Commitments töten Innovation, weil sie Flexibility reduzieren.'),
        ('Individual commitments matter less than team commitments.',
         'Individuelle Commitments zählen weniger als Team Commitments.'),
    ]
    
    for english, german in translations:
        content = content.replace(english, german)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Translated Purple Belt questions 6-15")
    print(f"   Total translations: {len(translations)}")

if __name__ == '__main__':
    translate_purple_q6_15()
