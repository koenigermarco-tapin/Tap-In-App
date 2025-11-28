#!/usr/bin/env python3
"""
Convert leadership-style-assessment-carousel.html to carousel format
Based on team-assessment-enhanced-v2.html structure
"""

# Define all 14 questions with 6 options each
questions = [
    {
        "number": 1,
        "text": "When starting a new project or initiative, your first instinct is to:",
        "insight": {
            "title": "First Moves Reveal Your Leadership DNA",
            "content": "How you start reveals how you lead. Visionaries inspire with possibility. Architects design the structure. Facilitators build the team. Executors launch into action. Commanders establish authority. Coaches develop capability. Your first move isn't random—it's your leadership operating system.",
        },
        "options": [
            {"value": "visionary", "text": "Paint an inspiring vision of what success could look like"},
            {"value": "architect", "text": "Map out the strategy, structure, and dependencies"},
            {"value": "facilitator", "text": "Bring everyone together to build alignment and clarity"},
            {"value": "executor", "text": "Identify quick wins and start executing immediately"},
            {"value": "commander", "text": "Define clear objectives, roles, and chain of command"},
            {"value": "coach", "text": "Ask powerful questions to help the team discover the path forward"}
        ]
    },
    {
        "number": 2,
        "text": "During team conflicts, you naturally:",
        "insight": {
            "title": "Conflict Reveals Your Leadership Core",
            "content": "How you handle conflict shows your true leadership DNA. Visionaries redirect to purpose. Architects redesign systems. Facilitators create dialogue. Executors push for resolution. Commanders make decisive calls. Coaches develop capability through challenge. Patrick Lencioni: teams that avoid conflict make worse decisions.",
        },
        "options": [
            {"value": "visionary", "text": "Reframe the conflict around shared purpose and bigger goals"},
            {"value": "architect", "text": "Analyze root causes and design better processes"},
            {"value": "facilitator", "text": "Create space for everyone to be heard and find common ground"},
            {"value": "executor", "text": "Push for quick resolution so the team can move forward"},
            {"value": "commander", "text": "Make the final call and expect alignment"},
            {"value": "coach", "text": "Help people work through it themselves with guided questions"}
        ]
    },
    {
        "number": 3,
        "text": "What energizes you most at work?",
        "insight": {
            "title": "Energy = Your Leadership Fuel Source",
            "content": "Sustainable leadership comes from doing work that energizes you. If you're constantly drained, you're likely leading against your archetype. Elite leaders structure their roles around their energy source—delegating tasks that deplete them.",
        },
        "options": [
            {"value": "visionary", "text": "Brainstorming big ideas and exploring new possibilities"},
            {"value": "architect", "text": "Solving complex problems and designing elegant solutions"},
            {"value": "facilitator", "text": "Helping people connect, grow, and work well together"},
            {"value": "executor", "text": "Checking off completed tasks and hitting milestones"},
            {"value": "commander", "text": "Making tough decisions and winning against competition"},
            {"value": "coach", "text": "Watching people have breakthroughs and level up"}
        ]
    },
    {
        "number": 4,
        "text": "How do you prefer to communicate important information?",
        "insight": {
            "title": "Communication Style = Leadership Signature",
            "content": "Your communication pattern is your leadership fingerprint. Jobs storytold. Bezos used data. Nadella created dialogue. Ardern gave clarity. Patton commanded. Campbell questioned. Research shows leaders are most effective when communicating in their natural style—not mimicking others.",
        },
        "options": [
            {"value": "visionary", "text": "Through storytelling and painting compelling pictures"},
            {"value": "architect", "text": "With data, frameworks, and logical reasoning"},
            {"value": "facilitator", "text": "In dialogue, ensuring everyone understands and feels heard"},
            {"value": "executor", "text": "Clearly and concisely with specific action items"},
            {"value": "commander", "text": "Directly and decisively with clear expectations"},
            {"value": "coach", "text": "Through questions that help others discover insights"}
        ]
    },
    {
        "number": 5,
        "text": "When facing a major obstacle, your approach is to:",
        "insight": {
            "title": "Obstacles Reveal Character Under Pressure",
            "content": "Pressure doesn't build character—it reveals it. How you handle obstacles shows your default operating system. Visionaries reframe. Architects redesign. Facilitators unite. Executors find paths. Commanders take charge. Coaches develop. Your crisis response is your leadership truth.",
        },
        "options": [
            {"value": "visionary", "text": "Reframe it as an opportunity and inspire creative solutions"},
            {"value": "architect", "text": "Break it down systematically and engineer a solution"},
            {"value": "facilitator", "text": "Rally the team to tackle it together"},
            {"value": "executor", "text": "Find the fastest path around or through it"},
            {"value": "commander", "text": "Take charge, make the tough calls, and push through"},
            {"value": "coach", "text": "Challenge your team to find the solution themselves"}
        ]
    },
    {
        "number": 6,
        "text": "In meetings, you're most likely to:",
        "insight": {
            "title": "Meetings Show Your Leadership in Action",
            "content": "Meetings are leadership laboratories. Your meeting behavior predicts your culture. Visionaries elevate thinking. Architects question assumptions. Facilitators ensure inclusion. Executors drive decisions. Commanders set agendas. Coaches shift perspectives. Amazon's Jeff Bezos: if you're not adding value in a meeting, leave.",
        },
        "options": [
            {"value": "visionary", "text": "Challenge the team to think bigger and aim higher"},
            {"value": "architect", "text": "Question the underlying assumptions and logic"},
            {"value": "facilitator", "text": "Ensure all voices are heard and synthesize perspectives"},
            {"value": "executor", "text": "Push for decisions and clear next steps"},
            {"value": "commander", "text": "Set the agenda, drive conclusions, and assign accountability"},
            {"value": "coach", "text": "Ask probing questions that shift perspectives"}
        ]
    },
    {
        "number": 7,
        "text": "Your team would describe you as someone who:",
        "insight": {
            "title": "External Perception = Your Leadership Brand",
            "content": "How others see you matters. Your perceived strengths become your opportunities—or your limitations. Self-aware leaders know their brand and actively shape it. You can't be all things to all people. Own your archetype.",
        },
        "options": [
            {"value": "visionary", "text": "Sees possibilities others miss and makes them feel achievable"},
            {"value": "architect", "text": "Thinks deeply and designs smart solutions to complex problems"},
            {"value": "facilitator", "text": "Creates connection, trust, and brings out everyone's best"},
            {"value": "executor", "text": "Gets things done no matter what obstacles appear"},
            {"value": "commander", "text": "Provides clear direction and holds high standards"},
            {"value": "coach", "text": "Develops people through powerful questions and feedback"}
        ]
    },
    {
        "number": 8,
        "text": "What frustrates you most in a team setting?",
        "insight": {
            "title": "Frustrations Reveal Your Values",
            "content": "What frustrates you most reveals what you value most. Visionaries hate small thinking. Architects hate sloppy work. Facilitators hate silos. Executors hate inaction. Commanders hate lack of discipline. Coaches hate dependency. Your frustration is your value system speaking. Use it as data.",
        },
        "options": [
            {"value": "visionary", "text": "Playing too small and settling for incremental improvements"},
            {"value": "architect", "text": "Sloppy thinking and poorly designed processes"},
            {"value": "facilitator", "text": "People not listening to each other or working in silos"},
            {"value": "executor", "text": "Endless discussion without decisions or action"},
            {"value": "commander", "text": "Lack of discipline, accountability, and follow-through"},
            {"value": "coach", "text": "People not taking ownership of their own development"}
        ]
    },
    {
        "number": 9,
        "text": "When delegating work, you focus on:",
        "options": [
            {"value": "visionary", "text": "The 'why' and desired impact, trusting the team on the 'how'"},
            {"value": "architect", "text": "Clear frameworks and decision rights so people can operate independently"},
            {"value": "facilitator", "text": "Matching tasks to people's strengths and development goals"},
            {"value": "executor", "text": "Specific deliverables, deadlines, and accountability checkpoints"},
            {"value": "commander", "text": "Clear orders with expected outcomes and reporting structure"},
            {"value": "coach", "text": "Challenging questions that help them figure out their own path"}
        ]
    },
    {
        "number": 10,
        "text": "Under pressure, you tend to:",
        "options": [
            {"value": "visionary", "text": "Double down on the vision and inspire urgency"},
            {"value": "architect", "text": "Step back to analyze and redesign the approach"},
            {"value": "facilitator", "text": "Rally the team and ensure everyone's aligned and supported"},
            {"value": "executor", "text": "Go into high gear and drive execution relentlessly"},
            {"value": "commander", "text": "Take control, make decisive calls, and eliminate distractions"},
            {"value": "coach", "text": "Stay calm and help the team navigate through it together"}
        ]
    },
    {
        "number": 11,
        "text": "Your ideal work environment is one where:",
        "insight": {
            "title": "Culture Eats Strategy",
            "content": "Peter Drucker's famous line: Your ideal environment reveals the culture you create. Visionaries build innovation labs. Architects optimize operations. Facilitators foster safety. Executors demand results. Commanders enforce standards. Coaches develop people. You don't join a culture—you radiate one.",
        },
        "options": [
            {"value": "visionary", "text": "Innovation and bold ideas are encouraged and celebrated"},
            {"value": "architect", "text": "Systems are clean, processes are optimized, and logic prevails"},
            {"value": "facilitator", "text": "People feel safe, valued, and work together seamlessly"},
            {"value": "executor", "text": "Goals are clear, momentum is high, and results come fast"},
            {"value": "commander", "text": "Standards are high, roles are clear, and everyone executes"},
            {"value": "coach", "text": "People are challenged to grow and take ownership"}
        ]
    },
    {
        "number": 12,
        "text": "When giving feedback, you emphasize:",
        "insight": {
            "title": "Feedback Is Leadership in Real-Time",
            "content": "Kim Scott (Radical Candor): The best feedback is caring personally while challenging directly. Visionaries connect to mission. Architects explain logic. Facilitators build confidence. Executors specify actions. Commanders set standards. Coaches ask questions. All can be radically candid—just in different languages.",
        },
        "options": [
            {"value": "visionary", "text": "Connecting their work to the bigger mission and potential"},
            {"value": "architect", "text": "The logic and framework behind what works and what doesn't"},
            {"value": "facilitator", "text": "Their growth journey and building their confidence"},
            {"value": "executor", "text": "Specific behaviors to change and results to achieve"},
            {"value": "commander", "text": "Clear standards and where they need to step up"},
            {"value": "coach", "text": "Questions that help them discover their own insights"}
        ]
    },
    {
        "number": 13,
        "text": "Success for you is best measured by:",
        "insight": {
            "title": "Success Metrics Define You",
            "content": "What you measure reveals what you value. Visionaries track transformation. Architects measure scalability. Facilitators count developed leaders. Executors monitor results. Commanders track wins. Coaches measure growth. Your scorecard isn't neutral—it shapes behavior. Choose metrics that align with your archetype.",
        },
        "options": [
            {"value": "visionary", "text": "Creating lasting impact and transformation"},
            {"value": "architect", "text": "Building systems that scale and endure"},
            {"value": "facilitator", "text": "Developing people and strengthening team capability"},
            {"value": "executor", "text": "Hitting targets and delivering tangible results"},
            {"value": "commander", "text": "Winning decisively and outperforming competition"},
            {"value": "coach", "text": "How many people you've helped reach their potential"}
        ]
    },
    {
        "number": 14,
        "text": "Your leadership superpower is:",
        "insight": {
            "title": "Superpower = Consistent Excellence",
            "content": "Your superpower isn't what you can do occasionally—it's what you deliver consistently under pressure. Mandela inspired through decades in prison. Jobs designed through failure and success. Rogers connected for 33 years. Know your power. Use it wisely.",
        },
        "options": [
            {"value": "visionary", "text": "Painting a compelling future people want to follow"},
            {"value": "architect", "text": "Designing smart solutions to complex challenges"},
            {"value": "facilitator", "text": "Bringing out the best in people and building great teams"},
            {"value": "executor", "text": "Turning strategy into reality through flawless execution"},
            {"value": "commander", "text": "Making tough calls and leading decisively in chaos"},
            {"value": "coach", "text": "Developing people who go on to do great things"}
        ]
    }
]

# Generate JavaScript array
js_output = "const questions = [\n"
for q in questions:
    js_output += "    {\n"
    js_output += f"        number: {q['number']},\n"
    js_output += f"        text: '{q['text']}',\n"
    
    if 'insight' in q:
        js_output += f"        insight: {{\n"
        js_output += f"            title: '{q['insight']['title']}',\n"
        js_output += f"            content: '{q['insight']['content']}'\n"
        js_output += f"        }},\n"
    
    js_output += f"        options: [\n"
    for opt in q['options']:
        js_output += f"            {{value: '{opt['value']}', text: '{opt['text']}'}},\n"
    js_output += f"        ]\n"
    js_output += "    },\n"
js_output += "];\n"

print(js_output)
print(f"\n✅ Generated {len(questions)} questions with 6 archetypes each")
