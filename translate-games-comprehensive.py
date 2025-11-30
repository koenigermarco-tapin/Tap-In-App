#!/usr/bin/env python3
"""
Comprehensive translation of Leadership Games to German
Focuses on UI elements and user-facing strings
"""

from pathlib import Path
import re

def translate_confession_poker():
    """Translate confession poker game"""
    en_file = 'confession-poker.html'
    de_file = 'confession-poker-de.html'
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update lang
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    # Title
    content = content.replace(
        '<title>Confession Poker - Trust-Building Card Game</title>',
        '<title>Confession Poker - Vertrauensaufbau-Kartenspiel</title>'
    )
    
    # UI strings in JavaScript (need to find and replace)
    ui_translations = [
        # Lobby
        ('Create Room', 'Raum erstellen'),
        ('Join Room', 'Raum beitreten'),
        ('Player Name', 'Spielername'),
        ('Enter your name', 'Gib deinen Namen ein'),
        ('Room Code', 'Raumcode'),
        ('Enter room code', 'Gib den Raumcode ein'),
        ('Waiting for players...', 'Warte auf Spieler...'),
        ('Start Game', 'Spiel starten'),
        ('Players:', 'Spieler:'),
        
        # Game
        ('Rate Intensity', 'Intensität bewerten'),
        ('How uncomfortable would you feel sharing this?', 'Wie unangenehm wäre es dir, das zu teilen?'),
        ('Not uncomfortable', 'Nicht unangenehm'),
        ('Very uncomfortable', 'Sehr unangenehm'),
        ('Submit Rating', 'Bewertung absenden'),
        ('Next Card', 'Nächste Karte'),
        ('Card', 'Karte'),
        ('of', 'von'),
        
        # Challenge
        ('Challenge', 'Herausforderung'),
        ('Do you want to challenge this rating?', 'Möchtest du diese Bewertung herausfordern?'),
        ('Yes, Challenge', 'Ja, herausfordern'),
        ('No, Accept', 'Nein, akzeptieren'),
        ('Vote on Challenge', 'Abstimmen über Herausforderung'),
        ('Challenge accepted!', 'Herausforderung angenommen!'),
        ('Challenge rejected', 'Herausforderung abgelehnt'),
        
        # Results
        ('Round', 'Runde'),
        ('Score', 'Punktzahl'),
        ('Final Scores', 'Endpunktzahlen'),
        ('Winner:', 'Gewinner:'),
        ('Game Over', 'Spiel beendet'),
        ('Play Again', 'Nochmal spielen'),
        
        # Categories
        ('White Belt', 'White Belt'),
        ('Blue Belt', 'Blue Belt'),
        ('Purple Belt', 'Purple Belt'),
        ('Brown Belt', 'Brown Belt'),
        ('Black Belt', 'Black Belt'),
    ]
    
    # Replace in JavaScript strings (both single and double quotes)
    for old, new in ui_translations:
        # In strings
        content = re.sub(rf"'({re.escape(old)})'", rf"'{new}'", content)
        content = re.sub(rf'"({re.escape(old)})"', rf'"{new}"', content)
        # In JSX/HTML-like content
        content = content.replace(f'>{old}<', f'>{new}<')
        content = content.replace(f'>{old}</', f'>{new}</')
    
    # Translate card texts (the 52 confession cards)
    # This is a large task - translate key phrases
    card_phrase_translations = [
        ("I once blamed someone else for my mistake at work", "Ich habe einmal jemand anderem die Schuld für meinen Fehler bei der Arbeit gegeben"),
        ("I've pretended to be busy to avoid helping someone", "Ich habe so getan, als wäre ich beschäftigt, um jemandem nicht helfen zu müssen"),
        ("I've gossiped about a teammate behind their back", "Ich habe über einen Teammitglied hinter seinem Rücken getratscht"),
        # Add more as needed - this is a template
    ]
    
    # Note: Full translation of all 52 cards would be extensive
    # For now, mark that cards need translation
    for old, new in card_phrase_translations:
        content = content.replace(f'text: "{old}"', f'text: "{new}"')
        content = content.replace(f"text: '{old}'", f"text: '{new}'")
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated")
    print(f"   ⚠️  52 card texts need individual translation")
    return True

def translate_conflict_cards():
    """Translate conflict cards game"""
    en_file = 'conflict-cards.html'
    de_file = 'conflict-cards-de.html'
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    translations = [
        ('Conflict Cards', 'Konflikt-Karten'),
        ('Practice difficult conversations', 'Schwierige Gespräche üben'),
        ('Start', 'Start'),
        ('Next', 'Weiter'),
        ('Previous', 'Zurück'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated (basic)")
    return True

def translate_disagree_commit():
    """Translate disagree & commit roulette"""
    en_file = 'disagree-commit-roulette.html'
    de_file = 'disagree-commit-roulette-de.html'
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    translations = [
        ('Disagree & Commit Roulette', 'Nicht einverstanden & Verpflichten Roulette'),
        ('Practice disagreeing then committing', 'Übe, nicht einverstanden zu sein und dich dann zu verpflichten'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated (basic)")
    return True

def translate_challenge_vulnerability():
    """Translate challenge vulnerability game"""
    en_file = 'challenge-vulnerability.html'
    de_file = 'challenge-vulnerability-de.html'
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<html lang="en">', '<html lang="de">')
    
    translations = [
        ('Challenge Vulnerability', 'Verletzlichkeit herausfordern'),
        ('Build trust through vulnerability', 'Baue Vertrauen durch Verletzlichkeit auf'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {de_file} translated (basic)")
    return True

def main():
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE GAME TRANSLATION")
    print("=" * 80)
    print()
    
    translated = 0
    
    print("📄 confession-poker.html...")
    if translate_confession_poker():
        translated += 1
    print()
    
    print("📄 conflict-cards.html...")
    if translate_conflict_cards():
        translated += 1
    print()
    
    print("📄 disagree-commit-roulette.html...")
    if translate_disagree_commit():
        translated += 1
    print()
    
    print("📄 challenge-vulnerability.html...")
    if translate_challenge_vulnerability():
        translated += 1
    print()
    
    print("=" * 80)
    print(f"✅ Translated {translated}/4 games")
    print("⚠️  Note: Game content (cards, scenarios) need full translation")
    print("=" * 80)

if __name__ == '__main__':
    main()

