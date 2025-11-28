#!/usr/bin/env python3
"""
Add Commander and Coach options to all 14 leadership questions
"""

# Question-specific options for Commander and Coach
new_options = {
    'q3': {
        'commander': 'Leading through decisive action in high-stakes moments',
        'coach': 'Seeing breakthroughs when people unlock their potential'
    },
    'q4': {
        'commander': 'Direct orders with clear expectations and follow-up',
        'coach': 'Through powerful questions that help people discover insights'
    },
    'q5': {
        'commander': 'Take charge, make the tough calls, and push through',
        'coach': 'Challenge your team to find the solution themselves'
    },
    'q6': {
        'commander': 'Set clear direction and hold people to high standards',
        'coach': 'Ask questions to uncover root causes and solutions'
    },
    'q7': {
        'commander': 'Provide clear, decisive leadership under pressure',
        'coach': 'Guide others to find their own answers and resilience'
    },
    'q8': {
        'commander': 'Give explicit direction and expect swift execution',
        'coach': 'Ask guiding questions to help them develop their plan'
    },
    'q9': {
        'commander': 'Set the agenda, drive conclusions, and assign accountability',
        'coach': 'Ask probing questions that shift perspectives'
    },
    'q10': {
        'commander': 'Provides clear direction and holds high standards',
        'coach': 'Develops people through powerful questions and feedback'
    },
    'q11': {
        'commander': 'Lack of discipline, accountability, or follow-through',
        'coach': 'People not taking ownership of their own development'
    },
    'q12': {
        'commander': 'Explicit orders with clear success criteria and consequences',
        'coach': 'Asking questions to help them plan their own approach'
    },
    'q13': {
        'commander': 'Take command, simplify priorities, and demand results',
        'coach': 'Stay calm and ask questions that help others perform'
    },
    'q14': {
        'commander': 'The Art of War or Leadership Strategy and Tactics',
        'coach': 'Trillion Dollar Coach (Bill Campbell) or The Inner Game of Tennis'
    }
}

# Icons for each archetype
icons = {
    'visionary': '🔮',
    'architect': '🏗️',
    'facilitator': '🤝',
    'executor': '⚡',
    'commander': '⚔️',
    'coach': '🎯'
}

print("Add these options to each question:")
for q_num, options in new_options.items():
    print(f"\n{q_num.upper()}:")
    print(f"  Commander: {icons['commander']} {options['commander']}")
    print(f"  Coach: {icons['coach']} {options['coach']}")

print(f"\n✅ Prepared options for {len(new_options)} questions")
