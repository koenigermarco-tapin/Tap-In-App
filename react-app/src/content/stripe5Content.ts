/**
 * BLUE BELT - STRIPE 5: CONFLICT FOUNDATIONS
 * Theme: Understanding productive vs destructive conflict
 * Focus: Why teams avoid conflict, the cost of harmony, conflict styles, frameworks
 */

interface Lesson {
  id: number;
  title: string;
  content: string[];
  learningObjective: string;
  duration: string;
  xpReward: number;
}

interface Checkpoint {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xpReward: number;
}

export const stripe5Lessons: Lesson[] = [
  {
    id: 1,
    title: "Why Conflict Avoidance Kills Teams",
    content: [
      "Walk into any 'harmonious' team and you'll find the same pattern: everyone is polite in meetings, no one disagrees, decisions happen quickly, and then...nothing gets executed. Or worse, people execute different versions of what they think was decided. Artificial harmony is killing more businesses than open conflict ever will.",
      
      "Patrick Lencioni identifies 'Fear of Conflict' as the second dysfunction of teams. Here's why it matters: Teams that lack trust can't engage in unfiltered, passionate debate about ideas. They resort to veiled discussions and guarded comments. This prevents them from tapping into collective intelligence and making optimal decisions.",
      
      "Research from Harvard Business Review analyzing 57 executive teams found that those engaging in regular productive conflict outperformed 'harmonious' teams by 25% on strategic execution and 40% on innovation metrics. Why? Because hard problems require hard conversations. If you're avoiding the conversation, you're avoiding the solution.",
      
      "Here's what conflict avoidance costs: (1) Worse decisions—you don't surface risks, challenge assumptions, or stress-test logic. (2) Slower execution—people comply instead of commit because their concerns weren't addressed. (3) Unspoken resentment—the tensions don't disappear, they just go underground. (4) Wasted time—you'll have the conflict eventually, but later when it's more expensive. (5) Lost talent—your best people leave when they can't speak truth.",
      
      "Gallup estimates that conflict avoidance costs U.S. businesses €359 billion annually in lost productivity and turnover. That's not the cost of conflict—it's the cost of AVOIDING conflict. The difficult conversations you're not having are costing you money every day.",
      
      "Why do teams avoid conflict? Four reasons: (1) Absence of trust (covered in White Belt)—people don't feel safe disagreeing. (2) Desire to protect relationships—they think conflict damages connections. (3) Misunderstanding of professionalism—they think being 'nice' is being professional. (4) Fear of emotions—they're worried debates will get too heated. All four are fixable with the right frameworks.",
      
      "At Just Eat Takeaway during COVID, we had to make rapid decisions about market prioritization—which cities got delivery capacity when we couldn't serve everyone. The 'polite' approach would have been to try to make everyone happy. Instead, we had brutal (but professional) debates: 'City A has higher revenue but City B has better unit economics. What's our decision criteria?' People got heated. Voices were raised. But it was about the decision, not personal.",
      
      "After 45 minutes of real conflict, we had clarity. We chose criteria (optimize for retention not acquisition), made the call (prioritize City B), and everyone committed—even those who'd argued for City A. Why? Because their voices were heard, the logic was transparent, and the decision was final. Two weeks later, City B's retention proved we'd made the right call. But we'd ONLY gotten there through conflict.",
      
      "Compare that to teams where the leader says 'Let's all try to get along' and decisions get made in backchannels. No clarity. No commitment. No accountability. Just confusion masked as consensus. That's not team health—that's team dysfunction disguised with 'nice.'",
      
      "In Brazilian Jiu Jitsu, sparring (rolling) looks like conflict. Two people trying to submit each other, using pressure, leverage, and technique to impose their will. Observers think it's aggressive. Practitioners know it's collaborative. You're both testing techniques, finding gaps, improving through resistance. The conflict IS the training. Without it, you never get better.",
      
      "The best training partners are the ones who give you honest resistance. They don't 'let you work'—they make you earn it. This forces you to refine your technique. Teams are the same. The best teammates give you honest resistance to your ideas. They make you earn the decision by stress-testing your logic. That resistance IS the value.",
      
      "Next lesson: The Cost of Artificial Harmony—we'll quantify exactly what conflict avoidance is costing your team. For now, reflect: In your last 5 team meetings, how many times did someone openly disagree with a proposed decision? If the answer is zero, you don't have harmony—you have fear. That fear is expensive."
    ],
    learningObjective: "You will learn why conflict avoidance costs businesses €359 billion annually and why 'harmonious' teams underperform teams with productive conflict by 25% on execution.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Cost of Artificial Harmony",
    content: [
      "Your team just agreed to a major strategic pivot in 15 minutes. No debate. No concerns raised. Everyone nodded. You're feeling good—look how aligned we are! Two weeks later, you discover three different interpretations of 'the decision,' two teams executing conflicting approaches, and one team that never started because they thought someone else was doing it. This is artificial harmony, and it just cost you two weeks and team credibility.",
      
      "Artificial harmony is worse than open conflict because it disguises dysfunction as health. At least when teams are openly fighting, you know there's a problem. Artificial harmony looks like alignment, sounds like agreement, and feels like efficiency—until execution reveals it was all theater.",
      
      "Research from McKinsey on team decision-making shows that teams reaching 'consensus' too quickly (under 30 minutes for complex decisions) have 60% higher implementation failure rates than teams that debate for 60-90 minutes. Why? Because fast agreement usually means unspoken concerns. Those concerns don't disappear—they surface during execution as 'resistance,' 'unexpected obstacles,' or 'we need to revisit this.'",
      
      "The signs you're in artificial harmony: (1) Meetings end early because 'everyone agrees.' (2) No one asks difficult questions or raises concerns. (3) Decisions get relitigated later ('I thought we decided X?'). (4) 'Parking lot conversations' happen after meetings where real opinions emerge. (5) Implementation is slow because no one is truly committed. (6) Passive-aggressive behavior replaces direct disagreement.",
      
      "Here's the cost breakdown: Say you have 8 people in a decision meeting. Meeting ends in 15 minutes with fast agreement. Feels efficient. But the decision was unclear, so you spend: 3 follow-up meetings (3 hours total team time), 10 email chains seeking clarification (2 hours), 4 weeks of misaligned execution (equivalent to 160 person-hours), then a 'reset meeting' to actually make the decision for real (2 hours). Total cost: 167 person-hours. If you'd spent 90 minutes in the original meeting having real conflict, you'd have saved 165+ hours. Artificial harmony is the most expensive 'efficiency' you can buy.",
      
      "At Just Eat Takeaway, I inherited a team with beautiful artificial harmony. Meetings were pleasant. No one disagreed. Everyone smiled. And literally nothing got done. Three months of 'aligned' decisions had produced zero executed initiatives. I asked the team privately: 'What's not being said in our meetings?' The floodgates opened. 20 minutes of suppressed concerns came pouring out.",
      
      "We established a new norm: 'If a decision is made and you didn't voice concerns, you've agreed to commit. If you have concerns, raise them NOW or forever hold your peace.' Sounds harsh. But it worked. Meetings got longer (60-90 minutes vs. 30). They got louder—people actually debated. But implementation speed tripled because commitment was real, not performed.",
      
      "The breakthrough moment: A product lead challenged my proposed timeline in front of the whole team. Old culture: that never would have happened. New culture: I said 'Thank you—tell me where my timeline is unrealistic.' She explained the engineering dependencies I'd missed. We adjusted the plan. It was better. And I'd just demonstrated that challenging me was safe, not career-limiting.",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'flow rolling.' It's when both partners go 50-70% intensity, focusing on technique over winning. Beginners love flow rolling—it feels safe, friendly, no one gets hurt. But here's the problem: you never learn what actually works at 100% intensity. Your techniques feel smooth at 50% but fail under real pressure.",
      
      "The best academies balance flow rolling with 'comp rolling'—competition-intensity sparring. Comp rolling is uncomfortable. It exposes your weaknesses. It hurts your ego. But it's the only way to know if your technique works when someone's really trying to submit you. Teams need the same: balance between 'flow meetings' (low-stakes, collaborative) and 'comp meetings' (high-stakes, full debate). Skip the comp meetings, and you'll never know if your strategies work under real pressure.",
      
      "The hidden benefit of productive conflict: It's actually more respectful than artificial harmony. When I disagree with you openly and specifically, I'm treating you like an intellectual equal capable of defending your ideas. When I smile and nod while privately disagree, I'm treating you like someone who can't handle honesty. Which is more respectful?",
      
      "Next lesson: Conflict Styles—we'll identify your default conflict pattern and how to adapt to others. But first, audit your team's last 5 decisions. For each one, answer: How long did we debate? Did anyone voice concerns? Were those concerns addressed or dismissed? How's implementation going? If you see a pattern of fast agreement followed by slow/failed execution, you've diagnosed artificial harmony. Naming it is the first step to fixing it."
    ],
    learningObjective: "You will learn how artificial harmony costs 165+ person-hours per decision through rework and misalignment, and why productive conflict frontloads pain to save massive backend costs.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Conflict Styles: Know Your Default",
    content: [
      "Everyone has a default conflict style—how you instinctively respond when disagreements arise. Most people don't know their default, which means they can't adapt it. They're locked into one pattern: avoid, compete, accommodate, or collaborate. This limits their effectiveness across different situations.",
      
      "The Thomas-Kilmann Conflict Mode Instrument identifies five styles plotted on two axes: Assertiveness (pursuing your own concerns) and Cooperativeness (satisfying others' concerns). (1) Avoiding—low on both. (2) Competing—high assertive, low cooperative. (3) Accommodating—low assertive, high cooperative. (4) Collaborating—high on both. (5) Compromising—middle on both.",
      
      "Here's what research shows: No style is universally best. High performers adapt their style to the situation. Competing works for urgent, high-stakes decisions where you have clear expertise. Collaborating works for complex problems needing multiple perspectives. Avoiding works for trivial issues not worth time investment. Accommodating works when the relationship matters more than the specific issue. Compromising works when time is short and both parties need some win.",
      
      "The problem: Most leaders default to ONE style regardless of context. Avoiders avoid everything (even critical conflicts). Competitors compete on everything (even trivial issues). Accommodators accommodate everything (even when they shouldn't). This rigidity kills effectiveness. The research from organizational psychology shows that leaders who adapt conflict styles to context are rated 35% more effective than those who use one style for everything.",
      
      "At Just Eat Takeaway, I ran a conflict styles workshop with my leadership team. We all took the Thomas-Kilmann assessment. My default: Competing (high assertive, low cooperative). Great for crisis decisions where I had operational expertise. Terrible for strategic discussions where I needed diverse input. I was bulldozing people because that's what felt natural. Once I saw the pattern, I could start adapting: This is a strategic discussion, I need to shift to Collaborating mode even though Competing feels right.",
      
      "How to identify your default: Recall your last 5 conflicts (at work or personal). For each one, ask: Did I push hard for my view (Competing)? Did I withdraw to avoid tension (Avoiding)? Did I give in to keep peace (Accommodating)? Did I seek win-win (Collaborating)? Did I split the difference (Compromising)? You'll see a pattern. That's your default. And defaults are fine—as long as you can override them when needed.",
      
      "The adaptation practice: Before your next conflict, diagnose the context. Ask: (1) How important is this issue to me (high/low)? (2) How important is this relationship (high/low)? Those two questions determine optimal style. High issue importance + low relationship importance = Compete. High issue + high relationship = Collaborate. Low issue + high relationship = Accommodate. Low issue + low relationship = Avoid. High both + time pressure = Compromise.",
      
      "Most leaders don't think through this—they just react with their default. Then they wonder why the competing style that works great in ops crises fails miserably in peer disagreements where relationship matters. Or why the accommodating style that keeps peace short-term creates resentment long-term when you never advocate for your team's needs.",
      
      "In Brazilian Jiu Jitsu, there's a saying: 'Position before submission.' Don't go for the finish if you haven't established dominant position first. White belts violate this constantly—they see a submission opportunity and abandon good position to chase it. They lose the position AND miss the submission. Black belts are patient: establish position, maintain control, THEN finish when the moment is clean.",
      
      "Conflict is the same. Your 'position' is the relational foundation and contextual clarity. Your 'submission' is winning the argument. If you chase winning (Competing mode) before you've established mutual respect and understanding, you might win the battle but lose the war. Position before submission means: Build trust first (White Belt), THEN engage in conflict (Blue Belt). Now you have the foundation to fight productively.",
      
      "The most dangerous leaders are the ones who learned ONE conflict style and became successful with it, so they think it's the only way. Former military: often default to Competing (works great in command structures, fails in peer relationships). Former consultants: often default to Compromising (works great with clients, fails when you need to take a strong stand). Tech founders: often default to Avoiding (works great when coding alone, fails when leading teams). Your superpower becomes your liability if you can't adapt.",
      
      "Next lesson: The Spar-&-Solve Framework—a practical structure for productive conflict. But first, identify your default conflict style. Then identify one recent conflict where that default didn't serve you. What style would have worked better? That gap between what you did and what would have worked is your development edge."
    ],
    learningObjective: "You will identify your default conflict style using the Thomas-Kilmann framework and learn to adapt it based on issue importance and relationship importance.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Spar-&-Solve Framework",
    content: [
      "Productive conflict isn't random—it's structured. The teams that fight well have explicit agreements about HOW to disagree. Without structure, conflict defaults to whoever is loudest, most senior, or most stubborn winning. That's not productive—that's just dominance. The Spar-&-Solve Framework gives you a step-by-step process for turning disagreements into decisions.",
      
      "The framework has five phases, based on research from 'Crucial Conversations' (Patterson et al.) and adapted for operational teams: (1) Frame the Ring, (2) Spar Honestly, (3) Separate Ideas from Identity, (4) Solve Together, (5) Commit and Close. Each phase has specific behaviors that keep conflict productive instead of destructive.",
      
      "Phase 1: Frame the Ring. Before you debate, establish boundaries. What are we deciding? What's in scope vs. out of scope? How much time do we have? Who makes the final call? What's the decision criteria? Without this frame, debates wander, never conclude, and leave everyone frustrated. Example: 'We have 60 minutes to decide vendor A vs. B. Final call is mine but I want everyone's input. Decision criteria: cost, reliability, integration speed. Let's surface all concerns, then I'll decide by end of meeting.'",
      
      "Phase 2: Spar Honestly. This is where real debate happens. Encourage people to advocate for their positions strongly. 'Disagree as if you're right, listen as if you're wrong.' The behaviors: Challenge assumptions, ask for evidence, stress-test logic, surface risks. The prohibitions: No personal attacks, no questioning motives, no interrupting, no dismissing without engaging. You want vigorous ideological conflict, not destructive personal conflict.",
      
      "Phase 3: Separate Ideas from Identity. Most conflict fails because people conflate 'you challenged my idea' with 'you attacked me.' Lencioni's research shows this explicitly: The teams that can debate ideas without damaging relationships are the ones that separate the two. Say: 'I respect you AND I disagree with your proposal.' Both are true simultaneously.",
      
      "Phase 4: Solve Together. After debate, synthesize: 'Here's what I heard: Team A is concerned about cost. Team B is concerned about reliability. Both are valid. What if we pilot with vendor B for 90 days with a cost cap, then evaluate?' You're weaving opposing perspectives into integrated solutions. This is where collective intelligence emerges—not in individuals winning, but in the group creating something better than any single person proposed.",
      
      "Phase 5: Commit and Close. Once decided, get explicit verbal commitment. Go around the room: 'Are you committed to vendor B for 90 days, even if you argued for vendor A?' Make people say yes out loud. Then document the decision (what, who, when, criteria for success) and share it. This prevents relitigating and creates accountability.",
      
      "At Just Eat Takeaway, we implemented Spar-&-Solve for major decisions. Typical meeting flow: 10 minutes framing the ring, 45 minutes honest sparring, 10 minutes synthesizing, 10 minutes commitment check, 5 minutes documentation. Total: 80 minutes. Before this framework, the same decisions took 3-4 meetings over 2 weeks because we never actually resolved the conflict—we just tabled it.",
      
      "The framework ROI: One meeting with full conflict beats three meetings with partial conflict. You pay the emotional cost upfront (the debate is hard), but you save the coordination cost backend (execution is fast because commitment is real). Most teams do the opposite: they make meetings easy (avoid conflict) and make execution hard (no one is aligned). That's optimizing for comfort at the expense of results.",
      
      "In Brazilian Jiu Jitsu, sparring has structure: rounds are timed (usually 5-6 minutes), there are rules (no striking, tap when caught, respect the tap), and there's a coach watching (to stop it if someone's unsafe). This structure is what makes hard sparring safe and productive. Without structure, it's just a fight where someone gets hurt.",
      
      "Business conflict needs the same: structure (the five phases), rules (how we disagree), and facilitation (someone ensuring rules are followed). That's what transforms conflict from something teams avoid to something they use as a competitive advantage.",
      
      "Next lesson: Conflict Styles deep-dive where we match your default style to the Spar-&-Solve framework. But first, try this: In your next contentious discussion, explicitly use Phase 1 (Frame the Ring). Before debating, spend 5 minutes getting clear on: What are we deciding? What's the criteria? Who decides? Watch how this frame makes the subsequent debate more focused and productive."
    ],
    learningObjective: "You will learn the five-phase Spar-&-Solve Framework (Frame, Spar, Separate, Solve, Commit) that transforms messy conflict into structured decision-making.",
    duration: "8-10 minutes",
    xpReward: 10
  }
];

export const stripe5Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your team has been debating a pricing strategy for 45 minutes. Voices have been raised, strong opinions expressed, but it's stayed focused on ideas not personal. Your CFO, who values harmony, suggests: 'Let's table this for now and revisit when we've all cooled down.' What do you do?",
    options: [
      "Agree—emotions are high and cooling down is wise",
      "Say: 'This debate is productive, not destructive. Let's push through to a decision in the next 15 minutes.'",
      "Call for a vote to resolve it quickly",
      "Make an executive decision to end the conflict"
    ],
    correctAnswer: 1,
    explanation: "Option B recognizes that productive conflict is supposed to be uncomfortable. Harvard research shows teams that push through 60-90 minutes of debate on complex decisions outperform those who 'table it' by 25%. Tabling feels safe but costs you: the conflict will resurface, people's positions will harden, and you'll have to start over. Option A confuses emotional intensity with dysfunction—if it's still about ideas, let it run. Option C (voting) doesn't create learning or commitment. Option D (executive decision) wastes the debate you just had. The key insight: discomfort ≠ dysfunction. If people are engaged, heated, but still focused on the issue—that's exactly where breakthrough happens. The CFO's desire for 'cooling down' is actually conflict avoidance disguised as emotional intelligence.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "Your team just reached agreement on a major decision in 12 minutes. No one raised concerns. Everyone nodded. You're the leader. What does the research on artificial harmony tell you to do?",
    options: [
      "Great—efficient decision, move to execution",
      "Ask: 'That felt too easy. What concerns haven't been voiced yet? I want to hear them now.'",
      "Document the decision and send it out for final confirmation",
      "Thank the team for being so aligned and end the meeting early"
    ],
    correctAnswer: 1,
    explanation: "Option B 'mines for conflict'—Lencioni's term for actively surfacing disagreements that people are suppressing. McKinsey data: decisions reaching consensus under 30 minutes have 60% implementation failure rates. That fast agreement likely means unspoken concerns, which will surface during execution as resistance. By explicitly asking for concerns, you either (1) discover real issues that need addressing, or (2) confirm that alignment is genuine. Either way, you win. Option A assumes fast = good (wrong). Option C doesn't test if the agreement is real. Option D rewards artificial harmony. The leader's job isn't to minimize conflict—it's to ensure all relevant conflict happens BEFORE the decision, not during execution.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You're using the Spar-&-Solve Framework in a strategy meeting. You're 40 minutes into Phase 2 (Spar Honestly) and the debate is getting heated. Two directors are strongly disagreeing. It's still about ideas, not personal. One director says: 'We're going in circles. Let's just move on.' What phase should you move to?",
    options: [
      "Agree and move to Phase 5 (Commit and Close)—we've debated enough",
      "Stay in Phase 2 (Spar Honestly)—let the conflict continue until positions are fully expressed",
      "Move to Phase 3 (Separate Ideas from Identity)—name that this is ideological, not personal",
      "Move to Phase 4 (Solve Together)—start synthesizing the opposing views"
    ],
    correctAnswer: 3,
    explanation: "Option C is the right phase transition. When debate is heated but productive, explicitly naming 'this is about ideas, not people' (Phase 3) resets the frame before you lose people to personal defensiveness. Then you can move to Phase 4 (synthesizing). The 'going in circles' comment suggests you've fully aired positions—staying in Phase 2 (Option B) will just repeat arguments. But jumping to Phase 5 (Option A) skips synthesis and separation. Option D (straight to solve) might work but you risk people feeling attacked without the explicit separation of ideas from identity. The Spar-&-Solve sequence matters: you need Phase 3 to prevent Phase 2 intensity from becoming personal before you synthesize in Phase 4.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "Comparing the two meetings: Meeting A—20 minutes, fast agreement, everyone polite, no concerns raised. Meeting B—75 minutes, vigorous debate, some raised voices, multiple concerns addressed, final decision documented with clear commitments. Based on McKinsey research, which meeting predicts better execution?",
    options: [
      "Meeting A—efficiency and alignment predict faster execution",
      "Meeting B—productive conflict and explicit commitment predict 60% better execution",
      "Both equal—execution depends on team capability, not meeting dynamics",
      "Meeting A for simple decisions, Meeting B only for complex ones"
    ],
    correctAnswer: 1,
    explanation: "Option B reflects the McKinsey data: decisions with 60-90 minutes of structured conflict have dramatically better execution than fast-consensus decisions. Meeting A likely has artificial harmony—fast agreement suggests unvoiced concerns that will surface as execution resistance. Meeting B's 'raised voices' aren't dysfunction if they're focused on ideas. The explicit commitments and documentation prevent relitigating. Meeting efficiency is the wrong metric—decision quality and execution speed are what matter. Option C ignores the research. Option D oversimplifies—even simple decisions benefit from stress-testing. The counterintuitive truth: The pain of productive conflict in the meeting saves you from the pain of misalignment during execution.",
    xpReward: 10
  }
];

export const stripe5Content = {
  lessons: stripe5Lessons,
  checkpoints: stripe5Checkpoints
};

