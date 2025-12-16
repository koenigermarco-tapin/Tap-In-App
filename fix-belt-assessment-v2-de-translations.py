#!/usr/bin/env python3
"""
Fix belt-assessment-v2-de.html:
1. Add proper language switcher
2. Translate questions from English to German
3. Fix button layout
"""

import re
import sys

def translate_question(question_text):
    """Translate common question patterns"""
    translations = {
        "You're in a meeting": "Du bist in einem Meeting",
        "Someone asks": "Jemand fragt",
        "Who's struggling": "Wer hat Probleme",
        "What do you do?": "Was tust du?",
        "When you make": "Wenn du",
        "how quickly": "wie schnell",
        "do you admit": "gibst du zu",
        "True or False": "Wahr oder Falsch",
        "Your colleagues know": "Deine Kollegen wissen",
        "personal challenge": "persönliche Herausforderung",
        "outside of work": "außerhalb der Arbeit",
        "A colleague asks": "Ein Kollege fragt",
        "for help": "um Hilfe",
        "What's your honest": "Was ist deine ehrliche",
        "first thought": "erste Gedanke",
        "In a meeting": "In einem Meeting",
        "someone asks a question": "jemand eine Frage stellt",
        "you don't know": "du nicht weißt",
        "the answer to": "die Antwort auf",
        "What do you say?": "Was sagst du?",
        "How vulnerable": "Wie verletzlich",
        "are you about": "bist du bezüglich",
        "your weaknesses": "deiner Schwächen",
        "in front of others": "vor anderen",
    }
    
    result = question_text
    for en, de in translations.items():
        result = result.replace(en, de)
    return result

def translate_scale_option(option):
    """Translate common scale option patterns"""
    translations = {
        "Stay silent": "Schweigen",
        "admitting struggle": "Schwierigkeiten zuzugeben",
        "shows weakness": "zeigt Schwäche",
        "Wait to see": "Warten, um zu sehen",
        "if others speak first": "ob andere zuerst sprechen",
        "Acknowledge vaguely": "Vage anerkennen",
        "It's challenging": "Es ist herausfordernd",
        "for everyone": "für alle",
        "Raise your hand": "Melde dich",
        "briefly share": "kurz teilen",
        "Immediately share": "Sofort teilen",
        "specific struggles": "spezifische Schwierigkeiten",
        "ask for help": "um Hilfe bitten",
    }
    
    result = option
    for en, de in translations.items():
        result = result.replace(en, de)
    return result

# This is a placeholder - the actual translations need to be done manually
# or extracted from existing German files
print("Translation script created. Manual translation required for full accuracy.")

