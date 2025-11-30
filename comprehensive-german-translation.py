#!/usr/bin/env python3
"""
Comprehensive German Translation for Missing Files
Translates user-facing content to natural German (Du-form)
"""

from pathlib import Path
import re

def translate_tool_morning_routine():
    """Translate tool-morning-routine.html to German"""
    en_file = 'tool-morning-routine.html'
    de_file = 'tool-morning-routine-de.html'
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update lang attribute
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    # Title and metadata
    translations = [
        ('<title>5-Minute Morning Routine | TAP-IN Open Mat</title>', 
         '<title>5-Minuten Morgenroutine | TAP-IN Open Mat</title>'),
        
        # Common UI elements
        ('Back to Open Mat', 'Zurück zum Open Mat'),
        ('Start Routine', 'Routine starten'),
        ('Next Step', 'Nächster Schritt'),
        ('Previous Step', 'Vorheriger Schritt'),
        ('Complete Step', 'Schritt abschließen'),
        ('Complete Routine', 'Routine abschließen'),
        ('Reset', 'Zurücksetzen'),
        ('Pause', 'Pause'),
        ('Resume', 'Fortsetzen'),
        
        # User-facing text (Du-form)
        ('Your', 'Dein'),
        ('your', 'dein'),
        ('You', 'Du'),
        ('you', 'du'),
        ('Start your', 'Starte deine'),
        ('Begin your', 'Beginne deine'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    # Translate main content sections
    main_translations = [
        # Header
        ('5-Minute Morning Routine', '5-Minuten Morgenroutine'),
        ('Set the tone for your day', 'Setze den Ton für deinen Tag'),
        ('Time:', 'Zeit:'),
        ('Difficulty:', 'Schwierigkeit:'),
        
        # Steps (will need to identify and translate)
        # This is a template - actual content translation needed per section
    ]
    
    for old, new in main_translations:
        content = content.replace(old, new)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated (basic structure)")
    return True

def translate_tool_box_breathing():
    """Translate tool-box-breathing.html to German"""
    en_file = 'tool-box-breathing.html'
    de_file = 'tool-box-breathing-de.html'
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    translations = [
        ('Box Breathing', 'Box-Atmung'),
        ('Breathe in for', 'Einatmen für'),
        ('Hold for', 'Halten für'),
        ('Breathe out for', 'Ausatmen für'),
        ('seconds', 'Sekunden'),
        ('Start Breathing', 'Atmung starten'),
        ('Stop', 'Stopp'),
        ('Reset', 'Zurücksetzen'),
        ('Back to Open Mat', 'Zurück zum Open Mat'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated")
    return True

def translate_confession_poker():
    """Translate confession-poker.html to German"""
    en_file = 'confession-poker.html'
    de_file = 'confession-poker-de.html'
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    # Translate title
    content = content.replace(
        '<title>Confession Poker - Trust-Building Card Game</title>',
        '<title>Confession Poker - Vertrauensaufbau-Kartenspiel</title>'
    )
    
    # Translate card texts (in JavaScript array)
    # This requires translating all 52 confession cards
    card_translations = {
        # White Belt cards
        "I once blamed someone else for my mistake at work": "Ich habe einmal jemand anderem die Schuld für meinen Fehler bei der Arbeit gegeben",
        "I've pretended to be busy to avoid helping someone": "Ich habe so getan, als wäre ich beschäftigt, um jemandem nicht helfen zu müssen",
        "I've gossiped about a teammate behind their back": "Ich habe über einen Teammitglied hinter seinem Rücken getratscht",
        # Add more translations...
    }
    
    # Translate UI strings in JavaScript
    ui_translations = [
        ('Create Room', 'Raum erstellen'),
        ('Join Room', 'Raum beitreten'),
        ('Start Game', 'Spiel starten'),
        ('Next Card', 'Nächste Karte'),
        ('Rate Intensity', 'Intensität bewerten'),
        ('Submit Rating', 'Bewertung absenden'),
        ('Challenge', 'Herausforderung'),
        ('Accept Challenge', 'Herausforderung annehmen'),
        ('Reject Challenge', 'Herausforderung ablehnen'),
        ('Player Name', 'Spielername'),
        ('Room Code', 'Raumcode'),
        ('Waiting for players...', 'Warte auf Spieler...'),
    ]
    
    for old, new in ui_translations:
        content = content.replace(f"'{old}'", f"'{new}'")
        content = content.replace(f'"{old}"', f'"{new}"')
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated (basic structure)")
    print(f"   ⚠️  52 card texts need full translation")
    return True

def translate_all_tools():
    """Translate all Open Mat tools"""
    tools = [
        ('tool-morning-routine.html', 'tool-morning-routine-de.html'),
        ('tool-box-breathing.html', 'tool-box-breathing-de.html'),
        ('tool-decision-framework.html', 'tool-decision-framework-de.html'),
        ('tool-energy-audit.html', 'tool-energy-audit-de.html'),
        ('tool-weekly-review.html', 'tool-weekly-review-de.html'),
        ('tool-inner-game.html', 'tool-inner-game-de.html'),
        ('tool-goal-tracker.html', 'tool-goal-tracker-de.html'),
        ('tool-journal.html', 'tool-journal-de.html'),
        ('tool-mood-tracker.html', 'tool-mood-tracker-de.html'),
    ]
    
    translated = 0
    for en_file, de_file in tools:
        if not Path(en_file).exists():
            continue
        
        with open(en_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Basic structure
        content = content.replace('<html lang="en">', '<html lang="de">')
        
        # Common translations
        common = [
            ('Back to Open Mat', 'Zurück zum Open Mat'),
            ('Start', 'Start'),
            ('Next', 'Weiter'),
            ('Previous', 'Zurück'),
            ('Save', 'Speichern'),
            ('Submit', 'Absenden'),
            ('Complete', 'Abgeschlossen'),
            ('Reset', 'Zurücksetzen'),
            ('Your', 'Dein'),
            ('your', 'dein'),
            ('You', 'Du'),
            ('you', 'du'),
        ]
        
        for old, new in common:
            content = content.replace(old, new)
        
        # File-specific translations
        if 'morning-routine' in en_file:
            content = content.replace('5-Minute Morning Routine', '5-Minuten Morgenroutine')
        elif 'box-breathing' in en_file:
            content = content.replace('Box Breathing', 'Box-Atmung')
            content = content.replace('Breathe in', 'Einatmen')
            content = content.replace('Breathe out', 'Ausatmen')
            content = content.replace('Hold', 'Halten')
        elif 'decision-framework' in en_file:
            content = content.replace('Decision Framework', 'Entscheidungsrahmen')
        elif 'energy-audit' in en_file:
            content = content.replace('Energy Audit', 'Energie-Audit')
        elif 'weekly-review' in en_file:
            content = content.replace('Weekly Review', 'Wöchentliche Reflexion')
        elif 'goal-tracker' in en_file:
            content = content.replace('Goal Tracker', 'Ziel-Tracker')
        elif 'journal' in en_file:
            content = content.replace('Journal', 'Tagebuch')
        elif 'mood-tracker' in en_file:
            content = content.replace('Mood Tracker', 'Stimmungs-Tracker')
        
        with open(de_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        translated += 1
        print(f"✅ {de_file} - Basic structure translated")
    
    return translated

def translate_games():
    """Translate leadership games"""
    games = [
        ('confession-poker.html', 'confession-poker-de.html'),
        ('conflict-cards.html', 'conflict-cards-de.html'),
        ('disagree-commit-roulette.html', 'disagree-commit-roulette-de.html'),
        ('challenge-vulnerability.html', 'challenge-vulnerability-de.html'),
    ]
    
    translated = 0
    for en_file, de_file in games:
        if not Path(en_file).exists():
            continue
        
        with open(en_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace('<html lang="en">', '<html lang="de">')
        
        # Common game UI
        game_ui = [
            ('Create Room', 'Raum erstellen'),
            ('Join Room', 'Raum beitreten'),
            ('Start Game', 'Spiel starten'),
            ('Next', 'Weiter'),
            ('Back', 'Zurück'),
            ('Submit', 'Absenden'),
            ('Your', 'Dein'),
            ('your', 'dein'),
        ]
        
        for old, new in game_ui:
            content = content.replace(f"'{old}'", f"'{new}'")
            content = content.replace(f'"{old}"', f'"{new}"')
            content = content.replace(f'>{old}<', f'>{new}<')
        
        # File-specific
        if 'confession-poker' in en_file:
            content = content.replace('Confession Poker', 'Confession Poker')
            content = content.replace('Trust-Building Card Game', 'Vertrauensaufbau-Kartenspiel')
        elif 'conflict-cards' in en_file:
            content = content.replace('Conflict Cards', 'Konflikt-Karten')
        elif 'disagree-commit' in en_file:
            content = content.replace('Disagree & Commit Roulette', 'Nicht einverstanden & Verpflichten Roulette')
        elif 'challenge-vulnerability' in en_file:
            content = content.replace('Challenge Vulnerability', 'Verletzlichkeit herausfordern')
        
        with open(de_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        translated += 1
        print(f"✅ {de_file} - Basic structure translated")
        print(f"   ⚠️  Content cards/texts need full translation")
    
    return translated

def main():
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE GERMAN TRANSLATION")
    print("=" * 80)
    print()
    
    print("📋 Step 1: Translating Open Mat Tools...")
    tools_count = translate_all_tools()
    print()
    
    print("📋 Step 2: Translating Leadership Games...")
    games_count = translate_games()
    print()
    
    print("=" * 80)
    print("📊 SUMMARY")
    print("=" * 80)
    print(f"✅ Tools translated: {tools_count}/9")
    print(f"✅ Games translated: {games_count}/4")
    print()
    print("⚠️  NOTE: Basic structure + UI elements translated")
    print("   Full content translation (card texts, descriptions) still needed")
    print("=" * 80)

if __name__ == '__main__':
    main()

