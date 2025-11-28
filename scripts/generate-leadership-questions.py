#!/usr/bin/env python3
"""
Generate JavaScript questions array for Leadership Style carousel with 6 archetypes
"""

questions = []

# All 14 leadership questions with 6 archetype options each
leadership_data = [
    ("When starting a new project, what's your first instinct?", {
        'visionary': 'Paint the big picture and inspire the team with the vision',
        'architect': 'Map out the system, processes, and dependencies',
        'facilitator': 'Bring everyone together to build alignment and clarity',
        'executor': 'Identify quick wins and start executing immediately',
        'commander': 'Define clear objectives, roles, and chain of command',
        'coach': 'Ask powerful questions to help the team discover the path forward'
    }),
    ("During team conflicts, you naturally:", {
        'visionary': 'Redirect focus to the shared mission and bigger purpose',
        'architect': 'Analyze the root cause and design better processes',
        'facilitator': 'Create safe space for all perspectives to be heard',
        'executor': 'Push for quick resolution so we can get back to work',
        'commander': 'Make the final call and expect everyone to fall in line',
        'coach': 'Guide individuals to find their own resolution through dialogue'
    }),
    ("What energizes you most at work?", {
        'visionary': 'Inspiring others and creating momentum toward a bold future',
        'architect': 'Solving complex problems and building elegant systems',
        'facilitator': 'Helping team members grow and collaborate effectively',
        'executor': 'Checking off completed tasks and delivering results',
        'commander': 'Leading through decisive action in high-stakes moments',
        'coach': 'Seeing breakthroughs when people unlock their potential'
    }),
    ("When facing a major obstacle, your approach is to:", {
        'visionary': 'Reframe it as an opportunity and rally the team forward',
        'architect': 'Break it down systematically and redesign the approach',
        'facilitator': 'Bring the team together to collectively problem-solve',
        'executor': 'Find the fastest path around or through it',
        'commander': 'Take charge, make the tough calls, and push through',
        'coach': 'Challenge your team to find the solution themselves'
    }),
    ("In meetings, you're most likely to:", {
        'visionary': 'Challenge the team to think bigger and aim higher',
        'architect': 'Question the underlying assumptions and logic',
        'facilitator': 'Ensure all voices are heard and synthesize perspectives',
        'executor': 'Push for decisions and clear next steps',
        'commander': 'Set the agenda, drive conclusions, and assign accountability',
        'coach': 'Ask probing questions that shift perspectives'
    }),
    ("Your team would describe you as someone who:", {
        'visionary': 'Sees possibilities others miss and makes them feel achievable',
        'architect': 'Thinks deeply and designs smart solutions to complex problems',
        'facilitator': 'Creates connection, trust, and brings out everyone\'s best',
        'executor': 'Gets things done no matter what obstacles appear',
        'commander': 'Provides clear direction and holds high standards',
        'coach': 'Develops people through powerful questions and feedback'
    }),
    ("What frustrates you most in a team setting?", {
        'visionary': 'Playing too small and settling for incremental improvements',
        'architect': 'Sloppy thinking and poorly designed processes',
        'facilitator': 'People not listening to each other or working in silos',
        'executor': 'Endless discussion without decisions or action',
        'commander': 'Lack of discipline, accountability, or follow-through',
        'coach': 'People not taking ownership of their own development'
    }),
    ("When delegating work, you focus on:", {
        'visionary': 'The "why" and desired impact, trusting the team on the "how"',
        'architect': 'Clear frameworks and decision rights so people can operate independently',
        'facilitator': 'Matching tasks to people\'s strengths and development goals',
        'executor': 'Specific deliverables, deadlines, and accountability checkpoints',
        'commander': 'Explicit orders with clear success criteria and consequences',
        'coach': 'Asking questions to help them plan their own approach'
    }),
    ("Under pressure, you tend to:", {
        'visionary': 'Double down on the vision and inspire urgency',
        'architect': 'Step back to analyze and redesign the approach',
        'facilitator': 'Rally the team and ensure everyone\'s aligned and supported',
        'executor': 'Go into high gear and drive execution relentlessly',
        'commander': 'Take command, simplify priorities, and demand results',
        'coach': 'Stay calm and ask questions that help others perform'
    }),
    ("Your ideal work environment is one where:", {
        'visionary': 'Innovation and bold ideas are encouraged and celebrated',
        'architect': 'Systems are clean, processes are optimized, and logic prevails',
        'facilitator': 'People feel safe, valued, and work together seamlessly',
        'executor': 'Goals are clear, momentum is high, and results come fast',
        'commander': 'Authority is respected, standards are high, and discipline is strong',
        'coach': 'People are challenged to grow and develop continuously'
    }),
    ("When giving feedback, you typically:", {
        'visionary': 'Connect it to the bigger purpose and future potential',
        'architect': 'Focus on systems, processes, and repeatable improvements',
        'facilitator': 'Start with strengths and co-create development plans',
        'executor': 'Be direct about what needs to change and by when',
        'commander': 'Give clear, immediate feedback - praise in public, correct in private',
        'coach': 'Ask questions that help them see what to improve themselves'
    }),
    ("Your leadership philosophy centers on:", {
        'visionary': 'Purpose and possibility - painting a future worth fighting for',
        'architect': 'Principles and systems - building sustainable excellence',
        'facilitator': 'People and culture - unlocking collective potential',
        'executor': 'Performance and results - winning through execution',
        'commander': 'Discipline and decisiveness - clarity under fire',
        'coach': 'Development and empowerment - growing capability'
    }),
    ("In a crisis, people look to you to:", {
        'visionary': 'Provide hope and a path forward through the chaos',
        'architect': 'Redesign the system to prevent future crises',
        'facilitator': 'Keep everyone connected and psychologically safe',
        'executor': 'Take immediate action and stabilize the situation',
        'commander': 'Take charge, make tough calls, and restore order',
        'coach': 'Guide the team to discover their own solutions'
    }),
    ("The leadership book on your nightstand is most likely:", {
        'visionary': 'Start With Why (Simon Sinek) or The Innovator\'s Dilemma',
        'architect': 'Principles (Ray Dalio) or Good to Great (Jim Collins)',
        'facilitator': 'Dare to Lead (Brené Brown) or Leaders Eat Last',
        'executor': 'Extreme Ownership (Jocko) or Execution (Larry Bossidy)',
        'commander': 'The Art of War or Leadership Strategy and Tactics',
        'coach': 'Trillion Dollar Coach (Bill Campbell) or The Inner Game of Tennis'
    })
]

# Build JavaScript array
print("        const questions = [")
for i, (question, options) in enumerate(leadership_data, 1):
    print(f"            {{")
    print(f"                question: '{question}',")
    print(f"                options: {{")
    for archetype, answer in options.items():
        print(f"                    {archetype}: '{answer}',")
    print(f"                }}")
    if i < len(leadership_data):
        print(f"            }},")
    else:
        print(f"            }}")
print("        ];")

print(f"\n✅ Generated {len(leadership_data)} questions with 6 archetypes each!")
