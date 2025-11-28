#!/usr/bin/env python3
"""
Convert combined-leadership-profile.html to carousel format with 6 leadership archetypes
"""

# Define the 6 leadership archetypes with their characteristics
ARCHETYPES = {
    'visionary': {
        'icon': '🔮',
        'name': 'Visionary',
        'examples': 'MLK Jr., Steve Jobs, Simon Sinek',
        'tagline': 'Think different, inspire the impossible',
        'color': '#a93226'
    },
    'architect': {
        'icon': '🏗️',
        'name': 'Architect',
        'examples': 'Jeff Bezos, Andy Grove, Ray Dalio',
        'tagline': 'Systems over chaos, design for scale',
        'color': '#c9513f'
    },
    'facilitator': {
        'icon': '🤝',
        'name': 'Facilitator',
        'examples': 'Brené Brown, Satya Nadella, Mary Barra',
        'tagline': 'People first, collaboration wins',
        'color': '#d67059'
    },
    'executor': {
        'icon': '⚡',
        'name': 'Executor',
        'examples': 'Jocko Willink, Jacinda Ardern, Tim Cook',
        'tagline': 'Get shit done, deliver results',
        'color': '#e88973'
    },
    'commander': {
        'icon': '⚔️',
        'name': 'Commander',
        'examples': 'George Patton, Winston Churchill, Jack Welch',
        'tagline': 'Decisive authority, clarity in chaos',
        'color': '#8b0000'
    },
    'coach': {
        'icon': '🎯',
        'name': 'Coach',
        'examples': 'Bill Campbell, Phil Jackson, John Wooden',
        'tagline': 'Develop people through questions',
        'color': '#4a7ba7'
    }
}

# Define leadership questions with 6 options each
LEADERSHIP_QUESTIONS = [
    {
        'question': 'When starting a new project, what\'s your first instinct?',
        'options': {
            'visionary': 'Paint the big picture and inspire the team with the vision',
            'architect': 'Map out the system, processes, and dependencies',
            'facilitator': 'Bring everyone together to build alignment and clarity',
            'executor': 'Identify quick wins and start executing immediately',
            'commander': 'Define clear objectives, roles, and chain of command',
            'coach': 'Ask powerful questions to help the team discover the path forward'
        }
    },
    {
        'question': 'During team conflicts, you naturally:',
        'options': {
            'visionary': 'Redirect focus to the shared mission and bigger purpose',
            'architect': 'Analyze the root cause and design better processes',
            'facilitator': 'Create safe space for all perspectives to be heard',
            'executor': 'Push for quick resolution so we can get back to work',
            'commander': 'Make the final call and expect everyone to fall in line',
            'coach': 'Guide individuals to find their own resolution through dialogue'
        }
    },
    {
        'question': 'What energizes you most at work?',
        'options': {
            'visionary': 'Inspiring others and creating momentum toward a bold future',
            'architect': 'Solving complex problems and building elegant systems',
            'facilitator': 'Helping team members grow and collaborate effectively',
            'executor': 'Checking off completed tasks and delivering results',
            'commander': 'Leading through decisive action in high-stakes moments',
            'coach': 'Seeing breakthroughs when people unlock their potential'
        }
    },
    {
        'question': 'When facing a major obstacle, your approach is to:',
        'options': {
            'visionary': 'Reframe it as an opportunity and rally the team forward',
            'architect': 'Break it down systematically and redesign the approach',
            'facilitator': 'Bring the team together to collectively problem-solve',
            'executor': 'Find the fastest path around or through it',
            'commander': 'Take charge, make the tough calls, and push through',
            'coach': 'Challenge your team to find the solution themselves'
        }
    },
    {
        'question': 'In meetings, you\'re most likely to:',
        'options': {
            'visionary': 'Challenge the team to think bigger and aim higher',
            'architect': 'Question the underlying assumptions and logic',
            'facilitator': 'Ensure all voices are heard and synthesize perspectives',
            'executor': 'Push for decisions and clear next steps',
            'commander': 'Set the agenda, drive conclusions, and assign accountability',
            'coach': 'Ask probing questions that shift perspectives'
        }
    },
    {
        'question': 'Your team would describe you as someone who:',
        'options': {
            'visionary': 'Sees possibilities others miss and makes them feel achievable',
            'architect': 'Thinks deeply and designs smart solutions to complex problems',
            'facilitator': 'Creates connection, trust, and brings out everyone\'s best',
            'executor': 'Gets things done no matter what obstacles appear',
            'commander': 'Provides clear direction and holds high standards',
            'coach': 'Develops people through powerful questions and feedback'
        }
    },
    {
        'question': 'What frustrates you most in a team setting?',
        'options': {
            'visionary': 'Playing too small and settling for incremental improvements',
            'architect': 'Sloppy thinking and poorly designed processes',
            'facilitator': 'People not listening to each other or working in silos',
            'executor': 'Endless discussion without decisions or action',
            'commander': 'Lack of discipline, accountability, or follow-through',
            'coach': 'People not taking ownership of their own development'
        }
    },
    {
        'question': 'When delegating work, you focus on:',
        'options': {
            'visionary': 'The "why" and desired impact, trusting the team on the "how"',
            'architect': 'Clear frameworks and decision rights so people can operate independently',
            'facilitator': 'Matching tasks to people\'s strengths and development goals',
            'executor': 'Specific deliverables, deadlines, and accountability checkpoints',
            'commander': 'Explicit orders with clear success criteria and consequences',
            'coach': 'Asking questions to help them plan their own approach'
        }
    },
    {
        'question': 'Under pressure, you tend to:',
        'options': {
            'visionary': 'Double down on the vision and inspire urgency',
            'architect': 'Step back to analyze and redesign the approach',
            'facilitator': 'Rally the team and ensure everyone\'s aligned and supported',
            'executor': 'Go into high gear and drive execution relentlessly',
            'commander': 'Take command, simplify priorities, and demand results',
            'coach': 'Stay calm and ask questions that help others perform'
        }
    },
    {
        'question': 'Your ideal work environment is one where:',
        'options': {
            'visionary': 'Innovation and bold ideas are encouraged and celebrated',
            'architect': 'Systems are clean, processes are optimized, and logic prevails',
            'facilitator': 'People feel safe, valued, and work together seamlessly',
            'executor': 'Goals are clear, momentum is high, and results come fast',
            'commander': 'Authority is respected, standards are high, and discipline is strong',
            'coach': 'People are challenged to grow and develop continuously'
        }
    },
    {
        'question': 'When giving feedback, you typically:',
        'options': {
            'visionary': 'Connect it to the bigger purpose and future potential',
            'architect': 'Focus on systems, processes, and repeatable improvements',
            'facilitator': 'Start with strengths and co-create development plans',
            'executor': 'Be direct about what needs to change and by when',
            'commander': 'Give clear, immediate feedback - praise in public, correct in private',
            'coach': 'Ask questions that help them see what to improve themselves'
        }
    },
    {
        'question': 'Your leadership philosophy centers on:',
        'options': {
            'visionary': 'Purpose and possibility - painting a future worth fighting for',
            'architect': 'Principles and systems - building sustainable excellence',
            'facilitator': 'People and culture - unlocking collective potential',
            'executor': 'Performance and results - winning through execution',
            'commander': 'Discipline and decisiveness - clarity under fire',
            'coach': 'Development and empowerment - growing capability'
        }
    },
    {
        'question': 'In a crisis, people look to you to:',
        'options': {
            'visionary': 'Provide hope and a path forward through the chaos',
            'architect': 'Redesign the system to prevent future crises',
            'facilitator': 'Keep everyone connected and psychologically safe',
            'executor': 'Take immediate action and stabilize the situation',
            'commander': 'Take charge, make tough calls, and restore order',
            'coach': 'Guide the team to discover their own solutions'
        }
    },
    {
        'question': 'The leadership book on your nightstand is most likely:',
        'options': {
            'visionary': 'Start With Why (Simon Sinek) or The Innovator\'s Dilemma',
            'architect': 'Principles (Ray Dalio) or Good to Great (Jim Collins)',
            'facilitator': 'Dare to Lead (Brené Brown) or Leaders Eat Last',
            'executor': 'Extreme Ownership (Jocko) or Execution (Larry Bossidy)',
            'commander': 'The Art of War or Leadership Strategy and Tactics',
            'coach': 'Trillion Dollar Coach (Bill Campbell) or The Inner Game of Tennis'
        }
    }
]

print("Leadership questions and archetypes defined successfully!")
print(f"Total archetypes: {len(ARCHETYPES)}")
print(f"Total leadership questions: {len(LEADERSHIP_QUESTIONS)}")
print("\nArchetypes:")
for key, arch in ARCHETYPES.items():
    print(f"  {arch['icon']} {arch['name']} - {arch['examples']}")
