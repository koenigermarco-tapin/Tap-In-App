#!/usr/bin/env python3
"""
Translate all 52 confession poker cards to German
"""

from pathlib import Path

def translate_confession_cards():
    """Translate all confession cards in confession-poker-de.html"""
    
    de_file = 'confession-poker-de.html'
    if not Path(de_file).exists():
        return False
    
    with open(de_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Card translations - all 52 cards
    card_translations = {
        # White Belt (10 cards)
        "I once blamed someone else for my mistake at work": "Ich habe einmal jemand anderem die Schuld für meinen Fehler bei der Arbeit gegeben",
        "I've pretended to be busy to avoid helping someone": "Ich habe so getan, als wäre ich beschäftigt, um jemandem nicht helfen zu müssen",
        "I've gossiped about a teammate behind their back": "Ich habe über einen Teammitglied hinter seinem Rücken getratscht",
        "I took credit for an idea that wasn't entirely mine": "Ich habe Anerkennung für eine Idee bekommen, die nicht ganz meine war",
        "I've lied about reading an important email/document": "Ich habe gelogen, dass ich eine wichtige E-Mail/Dokument gelesen habe",
        "I called in sick when I wasn't actually sick": "Ich habe mich krank gemeldet, obwohl ich nicht wirklich krank war",
        "I've judged someone based on their appearance": "Ich habe jemanden aufgrund seines Aussehens beurteilt",
        "I pretended to understand something when I was completely lost": "Ich habe so getan, als würde ich etwas verstehen, obwohl ich völlig verloren war",
        "I've bad-mouthed a previous employer in an interview": "Ich habe in einem Interview schlecht über einen früheren Arbeitgeber gesprochen",
        "I've taken office supplies home without permission": "Ich habe Büromaterial ohne Erlaubnis mit nach Hause genommen",
        
        # Blue Belt (10 cards)
        "I avoided a difficult conversation for over a month": "Ich habe ein schwieriges Gespräch über einen Monat lang vermieden",
        "I agreed to something in a meeting then complained about it later": "Ich habe in einem Meeting zugestimmt und mich später darüber beschwert",
        "I've stayed silent when I disagreed with a bad decision": "Ich habe geschwiegen, als ich mit einer schlechten Entscheidung nicht einverstanden war",
        "I sent a passive-aggressive email instead of talking directly": "Ich habe eine passiv-aggressive E-Mail geschickt, anstatt direkt zu sprechen",
        "I've ended a friendship by ghosting instead of having a conversation": "Ich habe eine Freundschaft beendet, indem ich geghostet habe, anstatt ein Gespräch zu führen",
        "I've cc'd someone's boss on an email to make them look bad": "Ich habe jemandes Chef in eine E-Mail kopiert, um ihn schlecht aussehen zu lassen",
        "I ignored someone's feedback because I didn't like them": "Ich habe jemandes Feedback ignoriert, weil ich ihn nicht mochte",
        "I've left a toxic work environment without giving honest exit feedback": "Ich habe eine toxische Arbeitsumgebung verlassen, ohne ehrliches Exit-Feedback zu geben",
        "I complained about someone to others instead of addressing them directly": "Ich habe mich bei anderen über jemanden beschwert, anstatt ihn direkt anzusprechen",
        "I've avoided eye contact with someone to dodge a conversation": "Ich habe Blickkontakt vermieden, um ein Gespräch zu vermeiden",
        
        # Purple Belt (12 cards)
        "I said 'yes' to a commitment knowing I wouldn't follow through": "Ich habe 'ja' zu einer Verpflichtung gesagt, obwohl ich wusste, dass ich sie nicht einhalten würde",
        "I've quit something I committed to when it got hard": "Ich habe etwas aufgegeben, wozu ich mich verpflichtet habe, als es schwierig wurde",
        "I made a promise to someone and completely forgot about it": "Ich habe jemandem ein Versprechen gegeben und es völlig vergessen",
        "I've been 'too busy' for something I actually just didn't prioritize": "Ich war 'zu beschäftigt' für etwas, das ich eigentlich einfach nicht priorisiert habe",
        "I abandoned a team project before it was finished": "Ich habe ein Teamprojekt aufgegeben, bevor es fertig war",
        "I've ghosted on a volunteer commitment": "Ich habe eine Freiwilligenverpflichtung geghostet",
        "I committed to a deadline I knew was impossible": "Ich habe mich zu einem Termin verpflichtet, von dem ich wusste, dass er unmöglich war",
        "I've cancelled plans at the last minute for no good reason": "Ich habe Pläne in letzter Minute ohne guten Grund abgesagt",
        "I've half-assed something I committed to doing well": "Ich habe etwas halbherzig gemacht, wozu ich mich verpflichtet habe, es gut zu machen",
        "I joined a committee/group then never showed up": "Ich bin einem Ausschuss/Gruppe beigetreten und dann nie aufgetaucht",
        "I've broken a New Year's resolution by January 15th": "Ich habe einen Neujahrsvorsatz bis zum 15. Januar gebrochen",
        "I committed to learning something then gave up after one week": "Ich habe mich verpflichtet, etwas zu lernen, und dann nach einer Woche aufgegeben",
        
        # Brown Belt (10 cards)
        "I knew someone was underperforming but didn't say anything": "Ich wusste, dass jemand unterdurchschnittlich leistete, habe aber nichts gesagt",
        "I've let someone take the blame for a shared mistake": "Ich habe jemanden die Schuld für einen gemeinsamen Fehler übernehmen lassen",
        "I didn't hold myself to the same standards I expect from others": "Ich habe mich nicht an die gleichen Standards gehalten, die ich von anderen erwarte",
        "I made an excuse instead of admitting I dropped the ball": "Ich habe eine Ausrede gemacht, anstatt zuzugeben, dass ich versagt habe",
        "I've ignored a team value or rule when it was inconvenient": "Ich habe einen Teamwert oder eine Regel ignoriert, wenn es unbequem war",
        "I knew someone was violating policy but stayed silent": "Ich wusste, dass jemand die Richtlinie verletzte, habe aber geschwiegen",
        "I've given someone a good review they didn't deserve to avoid conflict": "Ich habe jemandem eine gute Bewertung gegeben, die er nicht verdient hat, um Konflikte zu vermeiden",
        "I watched someone struggle and didn't offer help": "Ich habe zugesehen, wie jemand kämpfte, und habe keine Hilfe angeboten",
        "I've covered for someone's poor performance out of friendship": "Ich habe jemandes schlechte Leistung aus Freundschaft vertuscht",
        "I didn't speak up when I saw unethical behavior": "Ich habe nicht gesprochen, als ich unethisches Verhalten sah",
        
        # Black Belt (10 cards)
        "I prioritized looking good over achieving actual results": "Ich habe Priorität darauf gelegt, gut auszusehen, anstatt tatsächliche Ergebnisse zu erzielen",
        "I've protected my status instead of doing what was best for the team": "Ich habe meinen Status geschützt, anstatt das zu tun, was für das Team am besten war",
        "I took a shortcut that hurt long-term results for short-term wins": "Ich habe einen kurzfristigen Vorteil genommen, der langfristige Ergebnisse geschadet hat",
        "I've celebrated individual success while the team was failing": "Ich habe individuellen Erfolg gefeiert, während das Team versagte",
        "I knew we were heading toward failure but didn't speak up": "Ich wusste, dass wir auf ein Scheitern zusteuerten, habe aber nicht gesprochen",
        "I've competed with my own teammates instead of collaborating": "Ich habe mit meinen eigenen Teammitgliedern konkurriert, anstatt zusammenzuarbeiten",
        "I sandbagged my goals to make them easier to hit": "Ich habe meine Ziele absichtlich niedrig angesetzt, um sie leichter zu erreichen",
        "I've hoarded information to maintain my importance": "Ich habe Informationen gehortet, um meine Wichtigkeit zu erhalten",
        "I let a customer fail because helping them wasn't in my KPIs": "Ich habe einen Kunden scheitern lassen, weil ihnen zu helfen nicht in meinen KPIs war",
        "I've optimized for my bonus over what was right for the business": "Ich habe für meinen Bonus optimiert, anstatt für das, was richtig für das Geschäft war",
    }
    
    # Replace all card texts
    for english, german in card_translations.items():
        # In JavaScript object format
        content = content.replace(f'text: "{english}"', f'text: "{german}"')
        content = content.replace(f"text: '{english}'", f"text: '{german}'")
        # Handle escaped quotes
        content = content.replace(f'text: \\"{english}\\"', f'text: \\"{german}\\"')
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Translated {len(card_translations)} confession cards")
    return True

if __name__ == '__main__':
    translate_confession_cards()

