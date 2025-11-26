/**
 * BLUE BELT - STRIPE 8: FLOW STATE
 * Theme: Creating conditions for peak team performance
 * Focus: Team flow, removing friction, performing under pressure, Blue Belt integration
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

export const stripe8Lessons: Lesson[] = [
  {
    id: 1,
    title: "What Flow Feels Like in Teams",
    content: [
      "You've experienced individual flow: hours pass like minutes, the work flows effortlessly, you're fully absorbed, and you produce your best output. Mihaly Csikszentmihalyi's research identified this state—where challenge meets skill at the edge of ability. But team flow is different. It's when an entire group enters a state of collective effortlessness, anticipating each other's moves, building on ideas seamlessly, and producing outcomes none could achieve alone.",
      
      "Research from MIT's Human Dynamics Lab studying hundreds of teams found that high-performing teams exhibit specific patterns during 'flow states': equal conversational turn-taking, high energy levels (measured by vocal patterns and movement), frequent face-to-face interaction, and direct communication (not just through the leader). These teams moved 3x faster and produced 25% higher quality outputs than teams without these patterns.",
      
      "What does team flow feel like? Time distorts (meetings fly by productively, not drag painfully). Communication is efficient (people finish each other's thoughts, minimal explanation needed). Energy is high (room feels charged, not drained). Ideas build (each contribution adds to the previous, creating something better than any individual proposed). Obstacles get solved quickly (blockers are addressed immediately, not deferred). Trust is implicit (no one is checking or controlling, everyone is contributing).",
      
      "Contrast this with teams NOT in flow: Meetings drag. Every explanation requires backstory. People talk past each other. Ideas get shot down. Obstacles become debates about whose fault it is. Everyone is exhausted after an hour together. This isn't a 'bad day'—it's the absence of the conditions that create flow. Most teams operate this way constantly because leaders don't know how to create flow conditions.",
      
      "At Just Eat Takeaway during COVID crisis management, we'd have daily war room sessions with 8 people (ops, tech, customer service, finance, legal). Early sessions were painful—everyone protecting territory, explaining why their constraints mattered most, defending past decisions. But after 3 weeks of daily sessions, something shifted. We developed shared language, understood each other's constraints, and started finishing each other's sentences. Problems that took 2 hours in week one took 15 minutes in week four. That was team flow.",
      
      "The prerequisites for team flow, based on Keith Sawyer's research on group creativity: (1) Shared goals (everyone understands and cares about the same outcome). (2) Close listening (people are genuinely tracking each other, not waiting to talk). (3) Complete concentration (no phones, no multitasking, full presence). (4) Being in control (team has authority to make decisions, not just recommendations). (5) Blending egos (ideas matter more than who proposed them). (6) Equal participation (everyone contributes, no one dominates). (7) Familiarity (team has worked together enough to develop rhythm). (8) Communication (constant, direct, informal). (9) Moving it forward (building on ideas, not critiquing into paralysis).",
      
      "Most teams fail at flow because they miss multiple prerequisites. Shared goals are vague ('do great work'). Listening is performative (people nod but don't integrate what they heard). Concentration is fragmented (laptops open, Slack notifications pinging). Authority is unclear (team can't decide, only recommend). Egos are rigid (people defend their ideas as if ideas are identity). Participation is unequal (2 people dominate, 5 are silent). The team is new (no shared rhythm). Communication flows through the leader (hub-and-spoke, not mesh). Critique dominates (every idea gets picked apart before it's developed).",
      
      "The leader's role in creating flow: You're not IN the flow—you're creating CONDITIONS for flow. Your job is to protect the prerequisites. Remove distractions (no phones). Ensure goals are clear (start every session restating the outcome you're working toward). Balance participation (draw out quiet people, gentle redirect over-talkers). Encourage building not critiquing ('Yes, and...' instead of 'No, because...').  Protect authority (if the team can't decide, tell them upfront so they're not confused). Manage your own ego (be the first to let go of your ideas when better ones emerge).",
      
      "In Brazilian Jiu Jitsu, flow rolling is when both partners are moving at 70-80% intensity, reading each other's movements, countering and adapting fluidly. It looks choreographed but it's improvised. Both people are in the zone, reacting faster than they can think. This only happens between partners who've trained together extensively—they've developed shared language (understanding of techniques), mutual trust (won't injure each other), and complementary skill (challenging but not overwhelming).",
      
      "Teams are the same. Flow emerges from repetition. You can't force it in the first meeting. But if you protect the prerequisites consistently—same team, clear goals, full presence, equal participation—flow starts emerging by week 3-4. Then it becomes the team's new baseline. What used to take 2 hours now takes 30 minutes because the team is operating in flow.",
      
      "Next lesson: Removing Friction—we'll identify the common obstacles that prevent flow and how to eliminate them. For now, reflect on your team's last collaborative session. Were the 9 prerequisites present? Which ones were missing? That gap is why flow didn't happen. Flow isn't magic—it's the result of specific, creatable conditions. Your job as leader is to create those conditions deliberately."
    ],
    learningObjective: "You will learn the 9 prerequisites for team flow (shared goals, close listening, concentration, control, blended egos, equal participation, familiarity, communication, forward momentum) and how flow multiplies team output by 3x.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Removing Friction: The Lean Approach",
    content: [
      "Your team is talented, motivated, and working hard. But they're slow. Why? Friction. Not lazy people—systemic friction. Every handoff requires 3 emails. Every decision needs 2 approvals. Every question requires a meeting. Every tool requires a login, a VPN, and a prayer. Your team isn't underperforming—they're running through mud. Remove the mud, and they'll sprint.",
      
      "Lean methodology from Toyota Production System centers on identifying and eliminating 'muda' (waste). The 7 types of waste in knowledge work: (1) Waiting (for approvals, for information, for others to finish). (2) Extra processing (bureaucratic steps that add no value). (3) Overproduction (producing reports no one reads, attending meetings no one needs). (4) Defects (errors that require rework). (5) Inventory (work started but not finished, creating context-switching cost). (6) Motion (excessive emails, messages, searching for information). (7) Unused talent (people underutilized because of poor role design).",
      
      "Research from McKinsey on organizational drag shows that employees at large companies spend 20-40% of their time on 'wasteful activities'—meetings that accomplish nothing, emails no one reads, reports that duplicate other reports, approvals that add no insight. That's 1-2 days per week per person. Multiply by your team size. That's the cost of organizational friction. Not strategy failures or talent gaps—just accumulated waste.",
      
      "At Just Eat Takeaway, we did a 'friction audit' with the operations team. For one week, every person logged every time they were 'stuck waiting' or 'doing something that felt pointless.' The results were staggering: 6 hours per person per week waiting for approvals that could be delegated. 3 hours in meetings where they contributed nothing. 2 hours searching for information that should have been documented. That's 11 hours per week—27.5% of available time. We eliminated or streamlined half of it within a month. Suddenly, the team 'had more capacity' without adding headcount.",
      
      "The Lean approach to removing friction: (1) Map the value stream (what steps does work go through from request to delivery?). (2) Identify waste (where do handoffs, waiting, rework, or unnecessary processing occur?). (3) Eliminate or streamline (can this step be removed? Automated? Delegated lower?). (4) Measure improvement (did cycle time decrease? Did quality stay the same or improve?). This isn't theory—it's operational discipline.",
      
      "Common sources of friction in knowledge work: Approval processes where the approver adds no expertise, just checks a box. Meetings with unclear purposes that could have been emails. Reports produced because 'we've always done it' that no one reads. Tools that don't integrate, requiring manual data transfer. Documentation that's out of date or nonexistent, forcing people to ask the same questions repeatedly. Handoffs between teams without clear protocols. All fixable. All ignored by most leaders.",
      
      "Example: We had a process where new driver onboarding required 7 signatures. Each signature took 1-3 days. Total onboarding time: 2-3 weeks. I asked: 'What's each signature approving?' Answer: 'Just confirming they reviewed the file.' Did the review add value? No—all the real validation happened upfront. We eliminated 5 signatures. New onboarding time: 3 days. Zero drop in quality. 10x speed improvement. That's what happens when you question wasteful processes.",
      
      "The discipline: Every process in your organization should justify its existence. If you can't articulate the value it adds, eliminate it. This feels risky ('What if we need that approval?'). But the data shows: most processes survive because of institutional inertia, not necessity. Companies that ruthlessly eliminate low-value processes move faster, make better decisions, and retain talent better—because talented people hate bureaucratic waste.",
      
      "In Brazilian Jiu Jitsu, efficient movement beats strong movement. A black belt uses 60% of the energy a white belt uses to achieve better positions because they've eliminated wasted motion. Every movement has purpose. No thrashing, no panic, no muscling through bad technique. This efficiency is what allows them to roll for 6+ rounds while white belts gas out after 2. Efficiency = sustainability.",
      
      "Teams are the same. Removing friction isn't about working harder—it's about removing the obstacles to efficient work. Your team will move faster not because you pushed them, but because you cleared the path. That's leadership leverage: small changes to systems create massive improvements in output.",
      
      "Next lesson: Pressure Without Panic—how to maintain performance when stakes are high. But first, do a mini friction audit this week. In your next team meeting, ask: 'What's one recurring obstacle that slows us down?' Collect 5-10 answers. Then pick one and eliminate it. Just one. Don't try to fix everything—just prove that friction can be removed. That proof creates momentum for bigger systematic friction elimination."
    ],
    learningObjective: "You will learn the 7 types of waste in knowledge work and how removing systemic friction can reclaim 20-40% of your team's time without adding headcount.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Pressure Without Panic",
    content: [
      "High-stakes moments separate good teams from great teams. When the product launch fails, when the client threatens to leave, when the funding falls through, when the market shifts overnight—that's when pressure reveals character. Great teams perform. Good teams panic. The difference isn't talent or experience. It's practiced composure under pressure.",
      
      "Research from U.S. Navy SEAL training shows that only 25% of candidates complete BUD/S (Basic Underwater Demolition/SEAL training). The washout isn't physical capability—most candidates are physically qualified. It's psychological. Under sustained pressure (cold, fatigue, uncertainty, time constraints), most people's performance degrades. SEALs are the ones who maintain decision-making quality and execution discipline when everything's falling apart.",
      
      "What do they learn? Three things: (1) Arousal control (regulating physiological state through breath work). (2) Cognitive compartmentalization (focusing on immediate controllable actions, not catastrophizing). (3) Micro-goals (breaking overwhelming challenges into smallest next step). These aren't natural—they're trained. And they transfer directly to business leadership.",
      
      "At Just Eat Takeaway during our biggest system outage, I watched two teams react differently. Team A (newer leader) panicked: everyone talking over each other, multiple simultaneous theories with no testing, blame starting to flow, junior engineers freezing because no one was giving clear direction. Team B (experienced leader) stayed methodical: leader slowed the room down ('Everyone breathe. We'll fix this.'), assigned clear investigation tasks ('Maria check database, Carlos check API logs'), set a 10-minute reconvene time, and waited for data before theorizing. Team B resolved their issue in 25 minutes. Team A took 3 hours.",
      
      "The difference? Team B's leader had practiced pressure protocols. She knew: When stress spikes, people's IQs drop. So you slow down, break problems into parts, and restore structured thinking. Team A's leader thought leadership meant having answers immediately. So he theorized loudly, changed direction every 2 minutes, and created chaos that amplified the crisis.",
      
      "The pressure protocol that works: (1) Acknowledge reality ('This is serious'). (2) Regulate the room ('Everyone take a breath. We're going to solve this.'). (3) Break into parts ('Here are the 3 things we need to know'). (4) Assign clear actions ('Person A, you own X. Person B, you own Y.'). (5) Set reconvene time ('We meet back in 15 minutes with data'). (6) Make decision ('Based on what we know, here's what we're doing'). (7) Execute ('Go.'). This structure overrides panic with process.",
      
      "The neuroscience: Under pressure, your amygdala floods cortisol and adrenaline. This shuts down prefrontal cortex (rational thinking) and activates limbic system (fight-flight-freeze). You're literally less smart. The antidote isn't positive thinking—it's structured thinking. A simple process (7 steps above) gives your brain something to follow when it can't generate original thought. That's why pilots use checklists and surgeons use protocols. Not because they're not smart—because under pressure, everyone needs structure.",
      
      "The mistake most leaders make: They think staying calm means suppressing emotion. Wrong. Suppression creates brittleness—eventually you snap. The practice is regulation, not suppression. You feel the stress AND you channel it into productive action. Jocko Willink's phrase: 'Calm is contagious. So is panic.' Your team's nervous system mirrors yours. If you're regulated, they regulate. If you're panicking, they panic. Your composure is the most important tool you have in crisis.",
      
      "In Brazilian Jiu Jitsu, there's a position called 'mount'—opponent sitting on your chest, controlling your arms, about to rain down strikes or submit you. Every instinct screams: ESCAPE NOW. But thrashing wastes energy and makes it worse. The technique: breathe, create small frames with your arms, patiently work escapes, wait for opponent to overcommit. The person who stays calm under mount escapes. The person who panics stays trapped.",
      
      "Business crises are mount position. Your instinct: DO SOMETHING NOW. But reactive flailing makes it worse. The practice: breathe, assess, structure your response, execute methodically. Pressure without panic isn't about being unaffected—it's about channeling the activation into disciplined action instead of chaotic reaction.",
      
      "Next lesson: Blue Belt Integration—we'll tie together everything you've learned about rhythm, conflict, and flow. But first, identify your team's highest-pressure recurring situation (client escalations, production issues, deadline crunches). Write out the 7-step pressure protocol specifically for that situation. Next time it happens, use the protocol. Test whether structure reduces panic. Spoiler: it will. Because pressure protocols aren't theory—they're trained responses that work when thinking stops working."
    ],
    learningObjective: "You will learn the 7-step pressure protocol that Navy SEALs use to maintain performance under extreme stress and why structure overrides panic when rational thinking shuts down.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Blue Belt Integration: Your Team Rhythm Check",
    content: [
      "You've completed Blue Belt. This is the belt of rhythm, conflict, and communication. Where White Belt built your foundation (trust, safety, self-leadership, vulnerability), Blue Belt taught you how teams move together. Now we integrate: Are you actually applying what you've learned? Or did you consume content without changing behavior?",
      
      "Let's review the eight stripes. Stripe 5: Conflict Foundations—you learned why avoiding conflict costs €359 billion annually, how artificial harmony creates slower execution, and the Spar-&-Solve framework for turning disagreements into decisions. Stripe 6: Communication Under Pressure—you learned that 93% of communication is non-verbal, how to implement tactical stand-ups, how to give real-time feedback, and how listening is a combat sport requiring active effort.",
      
      "Stripe 7: Team Rhythm—you learned how operating rhythm eliminates coordination overhead, how to separate meeting types (tactical vs. strategic), how visual management (Kanban) reduces cycle time by 35%, and how energy check protocols prevent burnout. Stripe 8: Flow State—you learned the 9 prerequisites for team flow, how to remove systemic friction that costs 20-40% of team time, how to use pressure protocols to prevent panic, and how to perform under high stakes.",
      
      "These aren't separate lessons—they're an integrated system for team performance. Trust (White Belt) enables conflict (Blue Belt). Conflict produces alignment. Alignment creates rhythm. Rhythm enables flow. Flow produces results. Each level builds on the previous. You can't skip White Belt and expect Blue Belt to work. If your team doesn't trust each other, structured conflict will just formalize the dysfunction.",
      
      "Here's your Blue Belt Integration Assessment. Answer honestly: (1) Conflict: Does your team openly debate decisions until reaching clarity, or avoid disagreement until issues explode? (2) Communication: Do you regulate your physical state before high-stakes conversations, or wing it? (3) Rhythm: Does your team have daily/weekly/monthly operating cadences, or is coordination ad-hoc? (4) Flow: Can your team enter collaborative flow states, or does every session feel like grinding?",
      
      "If you answered positively to 3-4: Your Blue Belt is solid. You're ready for Purple Belt (commitment and alignment). If you answered positively to 1-2: You have work to do. Pick one area and practice intensively for 2 weeks before moving forward. If you answered positively to 0: You haven't done the work. Blue Belt isn't knowledge—it's capability. Go back and implement one practice from each stripe before proceeding.",
      
      "The most common Blue Belt failure: Teams implement one piece (usually Kanban or stand-ups) without the underlying foundation (trust, conflict comfort, communication skills). So they have a board no one updates or stand-ups where no one says anything real. The tool doesn't work because the culture doesn't support it. This is why sequence matters: White Belt → Blue Belt → Purple Belt. You can't skip the foundation.",
      
      "At Just Eat Takeaway, I had a team that wanted to 'just do Agile'—sprints, stand-ups, retrospectives. But they had zero trust and avoided conflict. So stand-ups were performative ('everything's fine'). Retrospectives were safe ('we could document better'). Sprint planning was fake agreement followed by non-execution. The Agile tools didn't fix the team—they exposed that the team lacked the prerequisite capabilities (trust, productive conflict).",
      
      "We paused the Agile adoption and did 6 weeks of foundation work: White Belt trust-building (vulnerability exercises, mistake-sharing rituals) and Blue Belt conflict practice (Spar-&-Solve frameworks, real-time feedback). Then we reintroduced Agile. It worked. Because now the team had the underlying skills to use the tools. Tools don't create capability. Practice creates capability. Tools just organize it.",
      
      "In Brazilian Jiu Jitsu, a blue belt means you're no longer a beginner. You have fundamental competencies: you can maintain positions, execute basic techniques, survive against higher belts, and roll with purpose not panic. You're not a master—but you're functional. You can train productively. In business, Blue Belt means your team has communication and conflict capabilities that allow productive collaboration. You're not perfect—but you're functional.",
      
      "The Blue Belt test: Can your team have a difficult conversation (debate with real stakes, strong disagreement) and emerge with: (1) a clear decision, (2) full commitment from everyone (even those who disagreed), (3) preserved or strengthened relationships, (4) documented next actions? If yes, you've earned Blue Belt. If no, you need more mat time.",
      
      "Next belt: Purple Belt focuses on commitment and alignment. You'll learn 'disagree and commit,' decision documentation, cross-team coordination, strategic clarity, and systems thinking. But Purple Belt only works if Blue Belt is solid. You can't create commitment if you can't handle conflict. You can't achieve alignment if you don't have communication skills. The belts build on each other.",
      
      "Before moving to Purple Belt, do this: Gather your team for a 30-minute Blue Belt assessment. Ask: (1) How well do we handle conflict? (2) How effective is our communication under pressure? (3) Do we have sustainable rhythm? (4) Can we achieve flow states? Score each 1-10. Average below 6 means you need more Blue Belt practice. Average above 7 means you're ready for Purple Belt. Be honest. Self-deception here costs you later when Purple Belt concepts don't land because the foundation is missing."
    ],
    learningObjective: "You will integrate all Blue Belt learnings (conflict, communication, rhythm, flow) and assess whether your team has the capabilities required for Purple Belt work on commitment and alignment.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe8Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You're leading a strategy session. After 20 minutes, you notice: 2 people have dominated discussion, 4 people haven't spoken, 3 people are on laptops, and the energy feels flat. According to flow prerequisites, which is your MOST important intervention right now?",
    options: [
      "Introduce a new topic to reengage interest",
      "Ask: 'Laptops closed please. Let's hear from everyone who hasn't spoken yet—starting with Maria, what are we missing?'",
      "Keep going—some people prefer to listen rather than speak",
      "Take a 5-minute break to reset energy"
    ],
    correctAnswer: 1,
    explanation: "Option B addresses two critical flow prerequisites simultaneously: removing distractions (laptops) and ensuring equal participation. Keith Sawyer's research shows flow requires all 9 prerequisites—missing even one blocks flow. The laptops signal divided attention (prerequisite 3: complete concentration). The unequal participation means you're missing perspectives (prerequisite 6: equal participation). Option A adds complexity without fixing the structural issues. Option C accepts sub-optimal dynamics. Option D might help energy but doesn't address the participation imbalance. The key: Flow isn't about letting organic dynamics play out—it's about actively creating the conditions that allow flow to emerge.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "Your 'friction audit' reveals your team spends 5 hours per week in approval processes where approvers add no value (they just check that prior steps were completed). According to Lean principles, what should you do?",
    options: [
      "Keep the approvals—they create accountability",
      "Eliminate the approval step and trust that prior steps are being done correctly",
      "Automate the approval with a system check",
      "Reduce approval time from 24 hours to 12 hours"
    ],
    correctAnswer: 1,
    explanation: "Option B eliminates waste that adds no value. Lean methodology: if a step doesn't transform the work or add expertise, it's waste. 'Checking that prior steps were completed' is waste—you're assuming incompetence and adding bureaucracy to compensate. McKinsey shows this costs 20-40% of team time. Option A confuses accountability with bureaucracy. Option C automates waste (faster waste is still waste). Option D optimizes waste (12-hour waste vs. 24-hour waste). The courage of Lean: trust your team to do their jobs correctly, eliminate the checking step, and if problems emerge, fix the root cause (training, clarity), not add more checks. 5 hours per week reclaimed = 12.5% capacity increase at zero cost.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Your product launch just failed publicly. Angry customers, bad press, leadership demanding answers. Your team is in the war room, stressed. What's the FIRST thing you should do according to pressure protocols?",
    options: [
      "Demand immediate status updates from everyone",
      "Start theorizing about what went wrong",
      "Say: 'This is serious AND we're going to fix it. Everyone take a breath. Here's how we'll tackle this.'",
      "Assign blame so people understand the consequences"
    ],
    correctAnswer: 2,
    explanation: "Option C implements the pressure protocol: (1) Acknowledge reality ('This is serious'), (2) Regulate the room ('take a breath'), (3) Set structure ('Here's how we'll tackle this'). Navy SEAL research: under pressure, people's IQs drop due to cortisol flooding. Your first job is to regulate the nervous system so rational thinking can resume. Option A amplifies panic (everyone scrambling). Option B models panicked thinking (theorizing without data). Option D destroys psychological safety when you need maximum collaboration. The key insight: The leader's composure is the thermostat. If you enter panicking, the room panics. If you enter calm and structured, the room regulates. Your physiology broadcasts louder than your words.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're doing your Blue Belt Integration Assessment. Your team scores: Conflict (4/10), Communication (7/10), Rhythm (8/10), Flow (6/10). What should you prioritize before moving to Purple Belt?",
    options: [
      "Move to Purple Belt—you're at 6.25 average which is passing",
      "Focus on improving Conflict (your lowest score) to at least 6 before proceeding",
      "Double down on Rhythm and Communication (your strengths)",
      "Work on all four areas equally"
    ],
    correctAnswer: 1,
    explanation: "Option B focuses on the foundation weakness. Conflict = 4 means your team cannot handle productive disagreement. Purple Belt is about commitment—but commitment requires debate first. You can't commit to decisions if you can't have the difficult conversations that produce good decisions. Your Communication/Rhythm/Flow scores are decent, but they're built on a cracked foundation (conflict avoidance). Option A ignores that Purple Belt will fail without conflict capability. Option C optimizes strengths while ignoring a critical gap. Option D dilutes effort. The insight: Leadership development isn't linear averaging—it's sequential building. A 4 in conflict undermines everything else. Fix the foundation before building the next floor.",
    xpReward: 10
  }
];

export const stripe8Content = {
  lessons: stripe8Lessons,
  checkpoints: stripe8Checkpoints
};

