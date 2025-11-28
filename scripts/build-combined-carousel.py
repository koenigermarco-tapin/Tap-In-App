#!/usr/bin/env python3
"""
Build complete combined leadership profile carousel with 6 archetypes
46 total questions: 12 Worker Type + 14 Leadership + 20 Team Dynamics
"""

# WORKER TYPE QUESTIONS (12 questions - Sprinter/Jogger/Ultrarunner)
worker_questions = [
    {
        'question': 'When starting a big project, you prefer to:',
        'options': {
            'sprinter': 'Sprint hard for weeks, then recharge',
            'jogger': 'Work steadily every day at sustainable pace',
            'ultrarunner': 'Play the long game with multi-year vision'
        }
    },
    {
        'question': 'Your ideal work rhythm is:',
        'options': {
            'sprinter': 'Intense bursts with clear start/end dates',
            'jogger': 'Consistent hours, predictable schedule',
            'ultrarunner': 'Flexible schedule optimized for decade-long impact'
        }
    },
    {
        'question': 'When facing burnout, you:',
        'options': {
            'sprinter': 'Take a hard break, then return full throttle',
            'jogger': 'Adjust pace slightly, maintain consistency',
            'ultrarunner': 'Redesign your life for sustainable decades'
        }
    },
    {
        'question': 'You measure success by:',
        'options': {
            'sprinter': 'Explosive results in months',
            'jogger': 'Steady progress year over year',
            'ultrarunner': 'Legacy impact over decades'
        }
    },
    {
        'question': 'Your energy management strategy:',
        'options': {
            'sprinter': 'Go all-in, then recover completely',
            'jogger': 'Balance work/rest daily',
            'ultrarunner': 'Optimize for lifelong performance'
        }
    },
    {
        'question': 'When setting goals, you think:',
        'options': {
            'sprinter': 'What can I achieve in 90 days?',
            'jogger': 'Where will I be in 1-2 years?',
            'ultrarunner': 'What legacy am I building over 20+ years?'
        }
    },
    {
        'question': 'Your approach to rest and recovery:',
        'options': {
            'sprinter': 'Earn breaks through intense output',
            'jogger': 'Built into daily routine',
            'ultrarunner': 'Strategic sabbaticals and life seasons'
        }
    },
    {
        'question': 'How do you handle slow periods?',
        'options': {
            'sprinter': 'Get frustrated, seek next challenge',
            'jogger': 'Accept natural rhythms',
            'ultrarunner': 'Use them strategically for reflection'
        }
    },
    {
        'question': 'Your relationship with deadlines:',
        'options': {
            'sprinter': 'Thrive on tight deadlines',
            'jogger': 'Prefer realistic timelines',
            'ultrarunner': 'Work backward from long-term milestones'
        }
    },
    {
        'question': 'Peak performance for you means:',
        'options': {
            'sprinter': 'Maximum output for short periods',
            'jogger': 'Consistent excellence daily',
            'ultrarunner': 'Sustained impact across lifetime'
        }
    },
    {
        'question': 'Your work style role model:',
        'options': {
            'sprinter': 'Elon Musk - Intense sprints, ship fast',
            'jogger': 'Cal Newport - Deep work, steady systems',
            'ultrarunner': 'Warren Buffett - Compound wisdom over decades'
        }
    },
    {
        'question': 'If you could design your career:',
        'options': {
            'sprinter': '10 explosive projects changing the world',
            'jogger': 'Mastery in one domain over career',
            'ultrarunner': 'Build institutions that outlive me'
        }
    }
]

# LEADERSHIP QUESTIONS (14 questions - 6 archetypes)
leadership_questions = [
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

print(f"""
✅ Questions built successfully!

Worker Type: {len(worker_questions)} questions (Sprinter/Jogger/Ultrarunner)
Leadership: {len(leadership_questions)} questions (6 archetypes)
Team Dynamics: 20 questions (will be added from team-assessment)

Total Questions: {len(worker_questions) + len(leadership_questions) + 20} = 46

Leadership Archetypes:
  🔮 Visionary - MLK Jr., Steve Jobs, Simon Sinek
  🏗️ Architect - Jeff Bezos, Andy Grove, Ray Dalio
  🤝 Facilitator - Brené Brown, Satya Nadella, Mary Barra
  ⚡ Executor - Jocko Willink, Jacinda Ardern, Tim Cook
  ⚔️ Commander - George Patton, Winston Churchill, Jack Welch
  🎯 Coach - Bill Campbell, Phil Jackson, John Wooden
""")
