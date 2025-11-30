#!/usr/bin/env python3
"""
Complete German Translation for Tools and Games
Comprehensive translation of all user-facing content
"""

from pathlib import Path
import re

def translate_file_comprehensively(en_file, de_file, file_type='tool'):
    """Translate file with comprehensive German content"""
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update lang
    content = content.replace('<html lang="en">', '<html lang="de">')
    content = content.replace("lang='en'", "lang='de'")
    
    # Common translations for all files
    common_translations = [
        # Navigation
        ('Back to Dashboard', 'Zurück zum Dashboard'),
        ('Back to Open Mat', 'Zurück zum Open Mat'),
        ('gym-dashboard.html', 'gym-dashboard-de.html'),
        ('learning-hub.html', 'learning-hub-de.html'),
        
        # UI Elements
        ('Start', 'Start'),
        ('Reset', 'Zurücksetzen'),
        ('Pause', 'Pause'),
        ('Resume', 'Fortsetzen'),
        ('Stop', 'Stopp'),
        ('Save', 'Speichern'),
        ('Complete', 'Abgeschlossen'),
        ('Loading...', 'Lädt...'),
        ('Ready', 'Bereit'),
        ('Next', 'Weiter'),
        ('Previous', 'Zurück'),
        ('Continue', 'Weiter'),
        
        # Common phrases (Du-form)
        (r'\bYour\b', 'Dein'),
        (r'\byour\b', 'dein'),
        (r'\bYou\b', 'Du'),
        (r'\byou\b', 'du'),
        (r'\byou\'re\b', 'du bist'),
        (r'\byou\'ve\b', 'du hast'),
        (r'\byou\'ll\b', 'du wirst'),
        
        # Time
        ('minutes', 'Minuten'),
        ('seconds', 'Sekunden'),
        ('Daily Practice', 'Tägliche Praxis'),
    ]
    
    # Apply common translations
    for pattern, replacement in common_translations:
        if pattern.startswith('\\b'):
            # Regex pattern
            content = re.sub(pattern, replacement, content)
        else:
            # Simple string replacement
            content = content.replace(pattern, replacement)
    
    # File-specific translations
    if file_type == 'tool':
        if 'morning-routine' in en_file:
            content = apply_morning_routine_translations(content)
        elif 'box-breathing' in en_file:
            content = apply_box_breathing_translations(content)
        elif 'decision-framework' in en_file:
            content = apply_decision_framework_translations(content)
        elif 'energy-audit' in en_file:
            content = apply_energy_audit_translations(content)
        elif 'weekly-review' in en_file:
            content = apply_weekly_review_translations(content)
        elif 'goal-tracker' in en_file:
            content = apply_goal_tracker_translations(content)
        elif 'journal' in en_file:
            content = apply_journal_translations(content)
        elif 'mood-tracker' in en_file:
            content = apply_mood_tracker_translations(content)
        elif 'inner-game' in en_file:
            content = apply_inner_game_translations(content)
    
    elif file_type == 'game':
        if 'confession-poker' in en_file:
            content = apply_confession_poker_translations(content)
        elif 'conflict-cards' in en_file:
            content = apply_conflict_cards_translations(content)
        elif 'disagree-commit' in en_file:
            content = apply_disagree_commit_translations(content)
        elif 'challenge-vulnerability' in en_file:
            content = apply_challenge_vulnerability_translations(content)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def apply_morning_routine_translations(content):
    """Apply morning routine specific translations"""
    translations = [
        ('5-Minute Morning Routine | TAP-IN Open Mat', '5-Minuten Morgenroutine | TAP-IN Open Mat'),
        ('5-Minute Morning Routine', '5-Minuten Morgenroutine'),
        ('Set the tone for your day', 'Setze den Ton für deinen Tag'),
        ('Start your day with intention', 'Starte deinen Tag mit Absicht'),
        ('This 5-minute ritual sets the tone for everything that follows', 
         'Dieses 5-Minuten-Ritual setzt den Ton für alles, was folgt'),
        ('Gratitude', 'Dankbarkeit'),
        ('Write down 3 things you\'re grateful for today', 
         'Schreibe 3 Dinge auf, für die du heute dankbar bist'),
        ('This shifts your mindset from scarcity to abundance', 
         'Das verschiebt deine Denkweise von Mangel zu Fülle'),
        ('I\'m grateful for', 'Ich bin dankbar für'),
        ('Set Your Intention', 'Setze deine Absicht'),
        ('What\'s the ONE thing you want to focus on today?', 
         'Was ist die EINE Sache, auf die du dich heute konzentrieren willst?'),
        ('Be specific', 'Sei spezifisch'),
        ('Focus Level', 'Fokusniveau'),
        ('Today, I will focus on', 'Heute werde ich mich auf... konzentrieren'),
        ('Energy Check', 'Energie-Check'),
        ('Rate your current energy level', 'Bewerte dein aktuelles Energieniveau'),
        ('This helps you plan your day around your natural rhythms', 
         'Das hilft dir, deinen Tag um deine natürlichen Rhythmen zu planen'),
        ('Energy Level', 'Energieniveau'),
        ('Box Breathing', 'Box-Atmung'),
        ('Follow the timer: Inhale (4s) → Hold (4s) → Exhale (4s) → Hold (4s)', 
         'Folge dem Timer: Einatmen (4s) → Halten (4s) → Ausatmen (4s) → Halten (4s)'),
        ('Repeat 8 times', 'Wiederhole 8 Mal'),
        ('Start Breathing', 'Atmung starten'),
        ('Morning Routine Complete!', 'Morgenroutine abgeschlossen!'),
        ('You\'ve set your intention for the day', 'Du hast deine Absicht für den Tag gesetzt'),
        ('Now go make it happen!', 'Jetzt geh und setze sie um!'),
        ('Do It Again', 'Nochmal machen'),
        ('Inhale', 'Einatmen'),
        ('Exhale', 'Ausatmen'),
        ('Hold', 'Halten'),
        ('Complete Step', 'Schritt abschließen'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
        # Also in JavaScript strings
        content = re.sub(rf"'({re.escape(old)})'", rf"'{new}'", content)
        content = re.sub(rf'"({re.escape(old)})"', rf'"{new}"', content)
    
    return content

def apply_box_breathing_translations(content):
    """Apply box breathing specific translations"""
    translations = [
        ('Box Breathing | TAP-IN Open Mat', 'Box-Atmung | TAP-IN Open Mat'),
        ('Box Breathing', 'Box-Atmung'),
        ('What is Box Breathing?', 'Was ist Box-Atmung?'),
        ('Breathe in for', 'Einatmen für'),
        ('Hold for', 'Halten für'),
        ('Breathe out for', 'Ausatmen für'),
        ('Start Breathing', 'Atmung starten'),
        ('Press Start to Begin', 'Drücke Start zum Beginnen'),
        ('Breath Duration (seconds)', 'Atem-Dauer (Sekunden)'),
        ('Cycles completed:', 'Zyklen abgeschlossen:'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
        content = re.sub(rf"'({re.escape(old)})'", rf"'{new}'", content)
        content = re.sub(rf'"({re.escape(old)})"', rf'"{new}"', content)
    
    return content

def apply_decision_framework_translations(content):
    """Apply decision framework translations"""
    translations = [
        ('Decision Framework', 'Entscheidungsrahmen'),
        ('Make better decisions', 'Bessere Entscheidungen treffen'),
        ('Question', 'Frage'),
        ('Answer', 'Antwort'),
        ('Options', 'Optionen'),
        ('Criteria', 'Kriterien'),
        ('Decision', 'Entscheidung'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_energy_audit_translations(content):
    """Apply energy audit translations"""
    translations = [
        ('Energy Audit', 'Energie-Audit'),
        ('Track your energy levels', 'Verfolge deine Energieniveaus'),
        ('Activity', 'Aktivität'),
        ('High', 'Hoch'),
        ('Medium', 'Mittel'),
        ('Low', 'Niedrig'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_weekly_review_translations(content):
    """Apply weekly review translations"""
    translations = [
        ('Weekly Review', 'Wöchentliche Reflexion'),
        ('Reflect on your week', 'Reflektiere über deine Woche'),
        ('Wins', 'Erfolge'),
        ('Challenges', 'Herausforderungen'),
        ('Lessons Learned', 'Gelernte Lektionen'),
        ('Next Week', 'Nächste Woche'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_goal_tracker_translations(content):
    """Apply goal tracker translations"""
    translations = [
        ('Goal Tracker', 'Ziel-Tracker'),
        ('Track your goals', 'Verfolge deine Ziele'),
        ('Add Goal', 'Ziel hinzufügen'),
        ('Progress', 'Fortschritt'),
        ('Due Date', 'Fälligkeitsdatum'),
        ('Status', 'Status'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_journal_translations(content):
    """Apply journal translations"""
    translations = [
        ('Journal', 'Tagebuch'),
        ('Write your thoughts', 'Schreibe deine Gedanken'),
        ('New Entry', 'Neuer Eintrag'),
        ('Date', 'Datum'),
        ('Entry', 'Eintrag'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_mood_tracker_translations(content):
    """Apply mood tracker translations"""
    translations = [
        ('Mood Tracker', 'Stimmungs-Tracker'),
        ('Track your mood', 'Verfolge deine Stimmung'),
        ('How are you feeling?', 'Wie fühlst du dich?'),
        ('Mood', 'Stimmung'),
        ('Notes', 'Notizen'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_inner_game_translations(content):
    """Apply inner game translations"""
    translations = [
        ('Inner Game', 'Inneres Spiel'),
        ('Mental training', 'Mentales Training'),
        ('Exercise', 'Übung'),
        ('Practice', 'Praxis'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_confession_poker_translations(content):
    """Apply confession poker translations"""
    translations = [
        ('Confession Poker - Trust-Building Card Game', 
         'Confession Poker - Vertrauensaufbau-Kartenspiel'),
        ('Create Room', 'Raum erstellen'),
        ('Join Room', 'Raum beitreten'),
        ('Player Name', 'Spielername'),
        ('Enter your name', 'Gib deinen Namen ein'),
        ('Room Code', 'Raumcode'),
        ('Enter room code', 'Gib den Raumcode ein'),
        ('Waiting for players...', 'Warte auf Spieler...'),
        ('Start Game', 'Spiel starten'),
        ('Players:', 'Spieler:'),
        ('Rate Intensity', 'Intensität bewerten'),
        ('How uncomfortable would you feel sharing this?', 
         'Wie unangenehm wäre es dir, das zu teilen?'),
        ('Not uncomfortable', 'Nicht unangenehm'),
        ('Very uncomfortable', 'Sehr unangenehm'),
        ('Submit Rating', 'Bewertung absenden'),
        ('Next Card', 'Nächste Karte'),
        ('Challenge', 'Herausforderung'),
        ('Challenge succeeded', 'Herausforderung erfolgreich'),
        ('Challenge failed', 'Herausforderung fehlgeschlagen'),
        ('Name already taken!', 'Name bereits vergeben!'),
        ('Need at least 3 players!', 'Mindestens 3 Spieler erforderlich!'),
        ('All cards used! Game over!', 'Alle Karten verwendet! Spiel beendet!'),
    ]
    
    for old, new in translations:
        content = content.replace(f"'{old}'", f"'{new}'")
        content = content.replace(f'"{old}"', f'"{new}"')
        content = content.replace(f'>{old}<', f'>{new}<')
    
    return content

def apply_conflict_cards_translations(content):
    """Apply conflict cards translations"""
    translations = [
        ('Conflict Cards', 'Konflikt-Karten'),
        ('Practice difficult conversations', 'Schwierige Gespräche üben'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_disagree_commit_translations(content):
    """Apply disagree & commit translations"""
    translations = [
        ('Disagree & Commit Roulette', 'Nicht einverstanden & Verpflichten Roulette'),
        ('Practice disagreeing then committing', 'Übe, nicht einverstanden zu sein und dich dann zu verpflichten'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def apply_challenge_vulnerability_translations(content):
    """Apply challenge vulnerability translations"""
    translations = [
        ('Challenge Vulnerability', 'Verletzlichkeit herausfordern'),
        ('Build trust through vulnerability', 'Baue Vertrauen durch Verletzlichkeit auf'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def main():
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE GERMAN TRANSLATION - TOOLS & GAMES")
    print("=" * 80)
    print()
    
    # Tools
    tools = [
        'tool-morning-routine.html',
        'tool-box-breathing.html',
        'tool-decision-framework.html',
        'tool-energy-audit.html',
        'tool-weekly-review.html',
        'tool-inner-game.html',
        'tool-goal-tracker.html',
        'tool-journal.html',
        'tool-mood-tracker.html',
    ]
    
    print("📋 Translating Open Mat Tools...")
    tools_count = 0
    for tool in tools:
        de_file = tool.replace('.html', '-de.html')
        print(f"  📄 {tool}...")
        if translate_file_comprehensively(tool, de_file, 'tool'):
            tools_count += 1
            print(f"    ✅ {de_file}")
    
    print()
    
    # Games
    games = [
        'confession-poker.html',
        'conflict-cards.html',
        'disagree-commit-roulette.html',
        'challenge-vulnerability.html',
    ]
    
    print("📋 Translating Leadership Games...")
    games_count = 0
    for game in games:
        de_file = game.replace('.html', '-de.html')
        print(f"  📄 {game}...")
        if translate_file_comprehensively(game, de_file, 'game'):
            games_count += 1
            print(f"    ✅ {de_file}")
    
    print()
    print("=" * 80)
    print(f"✅ Tools translated: {tools_count}/{len(tools)}")
    print(f"✅ Games translated: {games_count}/{len(games)}")
    print("=" * 80)

if __name__ == '__main__':
    main()

