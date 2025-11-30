#!/usr/bin/env python3
"""
Comprehensive translation of Open Mat Tools to German
Translates all user-facing content properly
"""

from pathlib import Path
import re

def translate_tool_content(en_file, de_file):
    """Translate tool file content comprehensively"""
    
    if not Path(en_file).exists():
        return False
    
    with open(en_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update lang
    content = content.replace('<html lang="en">', '<html lang="de">')
    content = content.replace("lang='en'", "lang='de'")
    
    # File-specific translations based on content
    if 'morning-routine' in en_file:
        content = translate_morning_routine(content)
    elif 'box-breathing' in en_file:
        content = translate_box_breathing(content)
    elif 'decision-framework' in en_file:
        content = translate_decision_framework(content)
    elif 'energy-audit' in en_file:
        content = translate_energy_audit(content)
    elif 'weekly-review' in en_file:
        content = translate_weekly_review(content)
    elif 'goal-tracker' in en_file:
        content = translate_goal_tracker(content)
    elif 'journal' in en_file:
        content = translate_journal(content)
    elif 'mood-tracker' in en_file:
        content = translate_mood_tracker(content)
    elif 'inner-game' in en_file:
        content = translate_inner_game(content)
    
    # Common translations for all tools
    common = [
        # UI elements
        ('Back to Open Mat', 'Zurück zum Open Mat'),
        ('<title>', '<title>'),  # Will handle titles separately
        ('Start', 'Start'),
        ('Reset', 'Zurücksetzen'),
        ('Pause', 'Pause'),
        ('Resume', 'Fortsetzen'),
        ('Stop', 'Stopp'),
        ('Save', 'Speichern'),
        ('Complete', 'Abgeschlossen'),
        ('Completed', 'Abgeschlossen'),
        ('Loading...', 'Lädt...'),
        ('Ready', 'Bereit'),
        
        # Common phrases (Du-form)
        ('Your', 'Dein'),
        ('your', 'dein'),
        ('Your ', 'Deine '),  # Plural
        ('You', 'Du'),
        ('you', 'du'),
        ('Click', 'Klicke'),
        ('Enter', 'Eingabe'),
        ('Type', 'Tippe'),
        ('Select', 'Wähle'),
    ]
    
    for old, new in common:
        content = content.replace(f">{old}<", f">{new}<")
        content = content.replace(f'"{old}"', f'"{new}"')
        content = content.replace(f"'{old}'", f"'{new}'")
    
    with open(de_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def translate_morning_routine(content):
    """Translate morning routine specific content"""
    translations = [
        # Title
        ('5-Minute Morning Routine | TAP-IN Open Mat', '5-Minuten Morgenroutine | TAP-IN Open Mat'),
        ('5-Minute Morning Routine', '5-Minuten Morgenroutine'),
        
        # Header
        ('Set the tone for your day', 'Setze den Ton für deinen Tag'),
        ('Time:', 'Zeit:'),
        ('Difficulty:', 'Schwierigkeit:'),
        ('minutes', 'Minuten'),
        ('Easy', 'Einfach'),
        
        # Steps
        ('Step 1: Gratitude', 'Schritt 1: Dankbarkeit'),
        ('Step 2: Intention', 'Schritt 2: Absicht'),
        ('Step 3: Focus & Energy', 'Schritt 3: Fokus & Energie'),
        ('Step 4: Breathing', 'Schritt 4: Atmung'),
        
        # Step 1
        ('What are you grateful for today?', 'Wofür bist du heute dankbar?'),
        ('Write 3 things', 'Schreibe 3 Dinge'),
        ('Complete Step', 'Schritt abschließen'),
        
        # Step 2
        ('What is your intention for today?', 'Wie ist deine Absicht für heute?'),
        ('Set your intention', 'Setze deine Absicht'),
        
        # Step 3
        ('Rate your current focus level', 'Bewerte dein aktuelles Fokusniveau'),
        ('Rate your current energy level', 'Bewerte dein aktuelles Energieniveau'),
        ('Low', 'Niedrig'),
        ('High', 'Hoch'),
        ('Focus:', 'Fokus:'),
        ('Energy:', 'Energie:'),
        
        # Step 4
        ('Box Breathing Exercise', 'Box-Atmung Übung'),
        ('Complete 8 cycles', 'Vervollständige 8 Zyklen'),
        ('Start Breathing', 'Atmung starten'),
        ('Stop', 'Stopp'),
        ('Breathe in', 'Einatmen'),
        ('Hold', 'Halten'),
        ('Breathe out', 'Ausatmen'),
        
        # Completion
        ('Routine Complete!', 'Routine abgeschlossen!'),
        ('Great job!', 'Gut gemacht!'),
        ('You completed your morning routine', 'Du hast deine Morgenroutine abgeschlossen'),
        ('Continue', 'Weiter'),
        ('Do Again', 'Nochmal machen'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
        # Also in JavaScript strings
        content = content.replace(f"'{old}'", f"'{new}'")
        content = content.replace(f'"{old}"', f'"{new}"')
    
    return content

def translate_box_breathing(content):
    """Translate box breathing specific content"""
    translations = [
        ('Box Breathing | TAP-IN Open Mat', 'Box-Atmung | TAP-IN Open Mat'),
        ('Box Breathing', 'Box-Atmung'),
        ('Breathe in for', 'Einatmen für'),
        ('Hold for', 'Halten für'),
        ('Breathe out for', 'Ausatmen für'),
        ('seconds', 'Sekunden'),
        ('Start Breathing', 'Atmung starten'),
        ('Pause', 'Pause'),
        ('Reset', 'Zurücksetzen'),
        ('Cycles completed:', 'Zyklen abgeschlossen:'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
        content = content.replace(f"'{old}'", f"'{new}'")
        content = content.replace(f'"{old}"', f'"{new}"')
    
    return content

def translate_decision_framework(content):
    """Translate decision framework content"""
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

def translate_energy_audit(content):
    """Translate energy audit content"""
    translations = [
        ('Energy Audit', 'Energie-Audit'),
        ('Track your energy levels', 'Verfolge deine Energieniveaus'),
        ('Activity', 'Aktivität'),
        ('Energy Level', 'Energieniveau'),
        ('High', 'Hoch'),
        ('Medium', 'Mittel'),
        ('Low', 'Niedrig'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def translate_weekly_review(content):
    """Translate weekly review content"""
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

def translate_goal_tracker(content):
    """Translate goal tracker content"""
    translations = [
        ('Goal Tracker', 'Ziel-Tracker'),
        ('Track your goals', 'Verfolge deine Ziele'),
        ('Add Goal', 'Ziel hinzufügen'),
        ('Goal', 'Ziel'),
        ('Progress', 'Fortschritt'),
        ('Due Date', 'Fälligkeitsdatum'),
        ('Status', 'Status'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def translate_journal(content):
    """Translate journal content"""
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

def translate_mood_tracker(content):
    """Translate mood tracker content"""
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

def translate_inner_game(content):
    """Translate inner game content"""
    translations = [
        ('Inner Game', 'Inneres Spiel'),
        ('Mental training', 'Mentales Training'),
        ('Exercise', 'Übung'),
        ('Practice', 'Praxis'),
    ]
    
    for old, new in translations:
        content = content.replace(old, new)
    
    return content

def main():
    print("=" * 80)
    print("🇩🇪 COMPREHENSIVE TOOL TRANSLATION")
    print("=" * 80)
    print()
    
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
    
    translated = 0
    for tool in tools:
        de_file = tool.replace('.html', '-de.html')
        print(f"📄 {tool}...")
        if translate_tool_content(tool, de_file):
            translated += 1
            print(f"  ✅ Translated to {de_file}")
        print()
    
    print("=" * 80)
    print(f"✅ Translated {translated}/{len(tools)} tools")
    print("=" * 80)

if __name__ == '__main__':
    main()

