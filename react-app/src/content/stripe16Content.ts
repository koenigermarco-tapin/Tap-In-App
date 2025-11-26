/**
 * BROWN BELT - STRIPE 16: ADVANCED COMMUNICATION
 * Theme: Mastery-level communication skills for influence and transformation
 * Focus: Coaching conversations at scale, powerful questions, leading through storytelling
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

export const stripe16Lessons: Lesson[] = [
  {
    id: 1,
    title: "Coaching Conversations at Scale",
    content: [
      "You can't have 50 deep coaching conversations a week. There isn't time. But you can create a coaching culture where every conversation develops people, even brief ones. This is coaching at scale—embedding developmental questions and frameworks into normal interactions so that every touchpoint builds capability, not just transmits information. The shift from 'I'll tell you what to do' to 'I'll help you think it through' scales your impact exponentially.",
      
      "Research from the International Coach Federation found that managers who use coaching skills (asking vs. telling) see 30% higher team performance and 40% higher engagement. But most managers say they don't have time to coach. That's because they think coaching is separate from work—a special 1-hour session. It's not. Coaching is how you work. Every status update, every problem escalation, every decision discussion can be coaching if you use the right questions.",
      
      "The GROW coaching model (Goal, Reality, Options, Will) compressed for scale: When someone brings you a problem, instead of solving it (1 minute solution, zero learning), ask: (1) 'What outcome do you want?' [Goal] (2) 'What's happening now?' [Reality] (3) 'What options have you considered?' [Options] (4) 'What will you do?' [Will]. This takes 3-5 minutes but develops their problem-solving capability instead of creating dependency. After 10 iterations, they stop bringing you problems because they can solve them.",
      
      "The mistake most leaders make: They coach when they're feeling generous and tell when they're busy. This inconsistency trains people that your coaching isn't real—when pressure hits, you'll just tell them what to do anyway. The solution: Default to coaching questions even (especially) when busy. 'I could tell you what I'd do, but that won't help you grow. What's your thinking?' Yes, it takes 2 extra minutes. That investment compounds—each coached decision builds their capability, reducing future escalations to you.",
      
      "At Just Eat Takeaway, I managed 8 direct reports. Early on, I solved everything (fast, but created dependency). Midway through, I shifted to coaching-first: When they escalated, I asked 'What options have you considered?' Often they'd say 'I haven't really thought through options yet.' My response: 'Come back with 3 options and your recommendation.' This took more time initially (they had to think), but within 3 months, escalations dropped 60% because they were solving problems themselves. Coaching scaled by making thinking the default.",
      
      "The five coaching questions to embed everywhere: (1) 'What's the real challenge here for you?' [gets beneath surface problem], (2) 'What else?' [uncovers additional perspectives—ask 3x minimum], (3) 'What would success look like?' [clarifies outcome], (4) 'What have you already tried?' [prevents redundant suggestions], (5) 'If you had to decide right now, what would you do?' [forces synthesis]. These five questions handle 80% of coaching situations. Memorize them. Deploy them reflexively. They turn every conversation into development.",
      
      "The advanced practice: Coaching in groups. You're in a meeting, someone proposes a solution. Instead of approving/rejecting (positional authority), facilitate thinking: 'What problem are we solving?' [clarify goal] 'What assumptions are we making?' [test logic] 'What could go wrong?' [stress-test] 'Who else needs to weigh in?' [expand perspective]. This develops the entire group's strategic thinking, not just one person's. After 10 meetings of this, the group starts asking these questions without you. You've scaled coaching through modeling.",
      
      "In Brazilian Jiu Jitsu, great instructors don't just demonstrate technique—they ask questions. 'What's your goal from this position?' 'What's preventing you from achieving it?' 'What options do you have?' 'Which do you think will work best?' This develops the student's decision-making under pressure, not just their technique library. You're teaching them to think like a practitioner, not just follow moves. Business is the same. Coaching develops judgment, not just task completion. Judgment scales. Task completion doesn't.",
      
      "The scaling mechanism: If you solve problems, you can solve 10-20 per day (your capacity). If you coach problem-solving, your team solves 100-200 per day (their capacity). After 6 months of coaching, they're solving problems you never see because they're capable and confident. That's exponential leverage. Your time investment in coaching returns multiples in team capability. This is how leaders scale beyond their personal capacity—by multiplying others' capability through coaching.",
      
      "Next lesson: The Art of Powerful Questions—we'll go deeper into questioning as a leadership tool, exploring how to ask questions that unlock insight, challenge assumptions, and drive transformation. But first, practice coaching at scale. This week, when someone escalates a problem, resist solving it. Ask the GROW questions: 'What outcome do you want? What's happening? What options? What will you do?' It'll feel slower. That's the investment. Watch how their capability grows over 30 days. That's the return."
    ],
    learningObjective: "You will learn the GROW coaching model compressed for scale (Goal, Reality, Options, Will) and five coaching questions that turn every conversation into development, increasing team performance 30%.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Art of Powerful Questions",
    content: [
      "Questions are more powerful than statements. Statements tell people what you think. Questions help people discover what they think. Statements create compliance. Questions create ownership. Statements position you as the expert with answers. Questions position you as the catalyst for others' thinking. The most influential leaders aren't the ones with the best answers—they're the ones with the best questions.",
      
      "Research from Harvard studying high-performing teams found that teams led by 'inquiry-based' leaders (who ask more than tell) outperform teams led by 'advocacy-based' leaders (who tell more than ask) by 40% on innovation metrics and 25% on execution metrics. Why? Because questions engage people's thinking. When you tell someone what to do, they execute (maybe). When you ask questions that help them figure it out, they own it. Ownership drives both creativity (they're invested in finding the best answer) and execution (they're committed to making it work).",
      
      "The anatomy of powerful questions: (1) Open-ended (start with 'What' or 'How', not 'Do you' or 'Can you'). (2) Generative (expands thinking rather than narrows it). (3) Assumption-challenging (surfaces unstated beliefs). (4) Future-focused (explores possibilities, not just problems). Bad question: 'Do you think this will work?' (closed, binary). Powerful question: 'What would make this work? What could prevent it? How would we know early if it's failing?' The first question gets yes/no. The second gets strategic thinking.",
      
      "The four types of powerful questions: (1) Clarifying—'What's the real challenge here?' 'What does success look like?' (2) Expanding—'What else?' 'Who else needs to be involved?' 'What are we not considering?' (3) Challenging—'What assumption are we making?' 'How might we be wrong?' 'What would you do if this approach was off the table?' (4) Action—'What will you do?' 'By when?' 'What support do you need?' Use all four types in sequence: clarify the problem, expand options, challenge assumptions, commit to action. This is strategic thinking in question form.",
      
      "At Just Eat Takeaway, we were planning a major platform migration. The team proposed an 18-month timeline. Instead of approving or questioning the timeline directly, I asked: 'What's the earliest this could be done if we had to?' [Challenge assumption] 'What's the riskiest dependency?' [Clarify bottleneck] 'If we could only migrate one market first as a test, which would you choose?' [Expand options]. These questions revealed: The 18-month timeline assumed sequential rollout (unnecessary). The riskiest dependency was data validation (addressable with better tooling). Testing one market first could reduce risk significantly (not considered in original plan). Result: Revised plan was 12 months with 40% less risk. Questions unlocked insights that statements ('make it faster') never would have.",
      
      "The mistake most leaders make: They ask leading questions that are actually statements in disguise. 'Don't you think we should do X?' isn't a real question—it's a statement with a question mark. People hear it as 'I want X, will you comply?' Real questions have genuine curiosity. You don't know the answer. You're exploring together. Test: If you're attached to a particular answer, don't ask a question. Make a statement. 'Here's what I recommend and why.' But if you're genuinely open to discovering the answer together, ask a real question and listen without agenda.",
      
      "The silence discipline: After asking a powerful question, shut up. Count to 10 in your head. Don't fill the silence. Don't rephrase. Don't offer your answer. Just wait. Powerful questions need processing time. Research shows that insight comes not immediately after the question but after 7-15 seconds of processing. Most leaders wait 2-3 seconds then jump in with their answer, aborting the thinking process. The discipline: Ask. Wait. Listen. You're not waiting for them to guess your answer. You're waiting for them to generate their own insight.",
      
      "The advanced technique: Question stacking. Don't just ask one question—ask a sequence that builds thinking. Start wide, then narrow. 'What's the biggest challenge facing our team right now?' [Wide] 'What specifically about that challenge is most critical?' [Narrow] 'What would it take to address that?' [Solutions] 'What's the first step?' [Action]. Each question builds on the previous answer, creating a path from broad awareness to specific action. This is facilitation through questions—you're guiding without directing.",
      
      "In Brazilian Jiu Jitsu, instructors use questions to develop strategic thinking: 'What's your opponent trying to do here?' 'What's your goal?' 'What's preventing you from achieving it?' 'What happens if you do X?' These questions force students to analyze position, intention, and options—the foundation of strategic grappling. The instructor could just say 'Do Y'—faster but less learning. Questions develop independent thinking. In competition, you have no instructor. You must think strategically yourself. Business is the same. Telling creates dependence. Questions create autonomy.",
      
      "Next lesson: Leading Through Storytelling—how to use narrative to influence, inspire, and embed values at scale. But first, practice powerful questions. This week, in three conversations, replace statements with questions: Instead of 'Here's what I think we should do', ask 'What do you think we should do?' Instead of 'That won't work because...', ask 'What could go wrong with that approach?' Instead of 'Do this', ask 'What would success look like? How would you achieve it?' Notice how conversations change. Notice how people engage differently. Questions unlock thinking that statements shut down."
    ],
    learningObjective: "You will learn the four types of powerful questions (clarifying, expanding, challenging, action) that drive 40% higher innovation and 25% higher execution by creating ownership through inquiry.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Leading Through Storytelling",
    content: [
      "Data persuades the mind. Stories persuade the heart. You can show someone a spreadsheet proving your strategy will work (they might intellectually agree). Or you can tell them a story about what success looks like—who benefits, how it feels, what changes—and they'll WANT it to work. Leadership is often about change. Change requires emotion, not just logic. Stories create emotion. This is why the most influential leaders are master storytellers.",
      
      "Research from Stanford studying communication effectiveness found that stories are 22x more memorable than facts alone. When you present data, people remember about 10% of what you said. When you wrap that data in a story, retention jumps to 65-70%. Why? Because stories activate multiple brain regions (language processing, sensory cortex, motor cortex, emotional centers) while facts activate only language processing. Stories create experience. Facts create information. Experience changes behavior. Information gets filed away.",
      
      "The three types of leadership stories: (1) 'Who I Am' stories—explain your values, background, why you lead the way you do. These build trust and connection. (2) 'Why We're Here' stories—articulate the mission, the problem you're solving, why it matters. These create purpose and alignment. (3) 'What Success Looks Like' stories—paint the picture of the future state, who benefits, what changes. These inspire action and commitment. Every leader needs 2-3 stories in each category, ready to deploy in meetings, presentations, and 1-on-1s.",
      
      "The story structure that works (the Pixar formula): (1) Once upon a time... [context] (2) Every day... [status quo] (3) Until one day... [inciting incident] (4) Because of that... [consequence] (5) Because of that... [escalation] (6) Until finally... [climax] (7) And ever since... [resolution/learning]. Example: 'Once upon a time, I was a junior engineer at a startup. Every day, I'd watch leadership make decisions behind closed doors, then announce them to confused teams. Until one day, our CEO quit and I got promoted unexpectedly. Because of that, I had to lead a team through crisis without knowing what I was doing. Because of that, I made every mistake in the book—didn't communicate, didn't listen, didn't build trust. Until finally, someone told me: You're not leading, you're just doing your old job louder. That changed everything. Ever since, I've focused on developing leadership capability, not just technical skill.' This story reveals values (transparency, learning, development) through narrative, not proclamation.",
      
      "At Just Eat Takeaway, we needed to shift from 'speed at all costs' culture to 'sustainable pace' culture. I could present burnout data (tried it, got nods, no behavior change). Or I could tell a story: 'A year ago, one of our best engineers collapsed at his desk. Ambulance came. Turned out: chronic sleep deprivation. He'd been working 70-hour weeks because that's what we celebrated. He recovered, but he left. And I thought: What are we doing? We're optimizing for quarterly metrics while burning out our people. That's not sustainable. So we're changing how we work.' That story created more culture shift than any policy memo could have. Why? Because it was concrete (real person, real consequence), emotional (we lost someone good), and value-laden (what we optimize for matters).",
      
      "The mistake most leaders make: They think storytelling is for 'soft' moments (team offsites, vision talks) but use data for 'hard' decisions (strategy, operations). Wrong. Strategy decisions need stories. Operational changes need stories. Budget discussions need stories. Because all organizational change involves people, and people are moved by narrative. The best leaders weave stories into everything: 'Let me tell you why this customer's experience matters...' 'Here's what happens when we get this right...' 'I've seen this pattern before, here's how it played out...' Stories aren't decoration. They're the vehicle for meaning.",
      
      "The authenticity requirement: Stories must be true. Don't fabricate. Don't exaggerate. Your leadership story library should come from: (1) Your actual experiences (the failures that taught you something), (2) Your team's experiences (with permission to share), (3) Customer experiences (anonymized if needed), (4) Industry examples (properly attributed). If you make up stories or steal others' stories, people sense it. Authenticity is the foundation of trust. Real stories, even small ones, beat manufactured inspirational tales every time.",
      
      "In Brazilian Jiu Jitsu, instructors teach through stories: 'When I was a purple belt, I had this bad habit of forcing sweeps. One day, I rolled with a black belt who just waited. Every time I pushed, he countered. I got exhausted. Then my instructor said: Stop forcing. Let them give you the opening. Next roll, I waited. The opening came. I took it. Easiest sweep of my life. Ever since, I've focused on patience over force.' This story teaches a principle (patience > force) through experience. It's memorable because it's concrete and relatable. Students remember stories long after they forget technique names.",
      
      "Brown Belt Integration: You've completed Advanced Communication stripe. You learned: (1) Coaching at scale (GROW model, five core questions, developing capability through every conversation). (2) Powerful questions (four types: clarifying, expanding, challenging, action—that drive ownership and insight). (3) Storytelling (three types of leadership stories, Pixar structure, authenticity requirement). These are mastery-level communication skills. You're not just transmitting information—you're developing people, unlocking strategic thinking, and inspiring commitment through narrative. This is how leaders communicate at scale: not by talking more, but by coaching, asking, and storytelling.",
      
      "Next belt: Black Belt—Inattention to Results. You've built trust (White), navigated conflict (Blue), driven commitment (Purple), created accountability (Brown). Now you'll master the final dysfunction: ensuring collective results trump individual agendas. This is where leadership culminates: obsessive focus on outcomes that matter, strategic thinking at the highest level, organizational transformation capability, and legacy creation. You're ready. Let's complete the journey."
    ],
    learningObjective: "You will learn the three types of leadership stories (who I am, why we're here, what success looks like) and the Pixar structure that makes stories 22x more memorable than facts alone.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "The Coaching Leader Integration",
    content: [
      "You've learned three advanced communication skills: coaching at scale, powerful questions, storytelling. Now we integrate them into a coherent leadership communication approach that develops people, drives strategic thinking, and inspires action simultaneously. This is the Brown Belt communication mastery: every interaction is developmental, strategic, and meaningful. You're not just communicating—you're transforming through communication.",
      
      "The integration framework: (1) Story opens (creates context and meaning), (2) Questions explore (develops thinking and ownership), (3) Coaching closes (commits to action and support). Example: You're kicking off a new strategic initiative. Traditional leader: Presents strategy, explains logic, tells team what to do (compliance). Coaching leader: Tells story ('Here's why this matters—customer story'), Asks questions ('What challenges do you foresee? What would success look like from your perspective?'), Coaches action ('What will you do first? What support do you need from me?'). The first creates compliance. The second creates ownership. Same initiative, different communication approach, radically different outcomes.",
      
      "Research from Google's Project Aristotle studying leadership behaviors found that psychological safety (which enables performance) is created through: (1) Leaders modeling vulnerability (storytelling: 'Here's what I don't know'), (2) Leaders inviting input (questions: 'What am I missing?'), (3) Leaders supporting agency (coaching: 'What will you do?'). These three communication behaviors—tell authentic stories, ask genuine questions, coach toward action—create the environment where teams perform. This isn't soft skill. This is the mechanism by which high performance happens.",
      
      "At Just Eat Takeaway, I ran weekly team meetings using the Story-Question-Coach framework. Week 1: Story—'Last week I made a decision that backfired. Here's what happened and what I learned.' Questions—'Where else are we optimizing for speed over sustainability?' Coach—'Pick one thing to change this week. What will you do differently?' This pattern (repeated weekly) created a team that: told truth about problems (story normalized vulnerability), thought strategically (questions developed analysis), owned outcomes (coaching created agency). After 6 months, our team had the highest engagement and lowest turnover in the organization. The communication framework created the culture.",
      
      "The daily practice: Every interaction—meeting, email, 1-on-1, presentation—should include all three elements in some form. Email example: Story opening ('Quick context on why this matters...'), Question exploration ('What concerns do you have? What am I not considering?'), Coaching close ('Let me know what you need from me'). Meeting example: Story opening (customer impact, team win, personal learning), Question exploration (what's working, what's not, what should we try), Coaching close (commitments, next actions, support needed). This structure becomes automatic after 30 days of deliberate practice.",
      
      "The mistake most leaders make: They pick one modality and over-rely on it. Some leaders only tell stories (inspiring but lacks strategic rigor). Some leaders only ask questions (develops thinking but can feel manipulative if there's no context). Some leaders only coach (supports action but misses meaning-making). The power is in integration: stories create meaning, questions develop thinking, coaching drives action. All three together create communication that transforms.",
      
      "The measurement: How do you know this is working? Track: (1) Team members telling their own stories (vulnerability spreading), (2) Team members asking strategic questions in meetings (thinking capability growing), (3) Team members solving problems without escalating to you (autonomy increasing). When you see all three, your communication approach is creating leadership capability throughout the team. You're not just leading well—you're creating leaders.",
      
      "In Brazilian Jiu Jitsu, black belt instructors don't just teach technique—they tell stories about when they learned it, ask questions to develop students' strategic thinking, and coach them toward autonomous practice. 'Let me tell you how I discovered this technique. What do you notice about the positioning? What would you try from here? Great—go drill that for 10 minutes and show me what you learned.' Story, question, coach. This creates practitioners who think strategically, move purposefully, and own their development. Business teams need the same: communication that develops autonomy, not dependence.",
      
      "The leadership legacy question: In 12 months, if you consistently communicate through Story-Question-Coach, what will be different about your team? They'll: (1) Be more open about challenges (psychological safety from story), (2) Think more strategically (capability from questions), (3) Own outcomes more fully (agency from coaching), (4) Need you less (because they're developing leadership capability themselves). That's your legacy: not what you accomplished, but the capability you developed in others that persists after you leave.",
      
      "Implementation plan: (1) This week: Prepare 2 leadership stories (one 'who I am', one 'why this matters'). (2) Memorize the five coaching questions from Lesson 1. (3) Practice Story-Question-Coach in three interactions (meeting, email, 1-on-1). (4) After each interaction, assess: Did I create meaning (story)? Did I develop thinking (questions)? Did I enable action (coaching)? If no to any, adjust next time. (5) After 30 days: Assess team changes (more vulnerability? more strategic thinking? more ownership?). This communication approach becomes your leadership operating system.",
      
      "Brown Belt Complete: You've mastered accountability and influence. You learned: Extreme Ownership (leaders take absolute responsibility), Accountability Rituals (systematic practices that embed ownership), Cost of Non-Ownership (the massive price of diffused responsibility), Distributed Leadership (scaling through developing owners), Influence Without Authority (expertise, credibility, relationships, value creation), Presence (somatic, cognitive, intentional alignment), Credibility Under Pressure (five-part crisis formula), Executive Presence (four trainable components), Coaching at Scale (GROW model, five questions), Powerful Questions (four types that unlock insight), Storytelling (three leadership story types), Integrated Communication (Story-Question-Coach). You're ready for Black Belt: Results mastery and organizational transformation."
    ],
    learningObjective: "You will learn to integrate storytelling, powerful questions, and coaching into every interaction using the Story-Question-Coach framework that creates meaning, develops thinking, and drives action simultaneously.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe16Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your direct report escalates a problem. You know the answer and could solve it in 30 seconds. According to coaching-at-scale principles, what do you do?",
    options: [
      "Solve it quickly—you're busy and it's the fastest path",
      "Ask: 'What outcome do you want? What's happening? What options have you considered? What will you do?' (GROW model—takes 3-5 min but builds capability)",
      "Tell them to figure it out themselves without guidance",
      "Schedule a formal 1-hour coaching session for next week"
    ],
    correctAnswer: 1,
    explanation: "Option B uses GROW coaching compressed for scale. International Coach Federation: managers using coaching skills see 30% higher team performance and 40% higher engagement. The Just Eat Takeaway example: shifted from solving everything (fast but created dependency) to coaching-first (asked 'what options have you considered?')—escalations dropped 60% in 3 months because team solved problems themselves. Option A optimizes for speed but creates dependency (they'll be back tomorrow with next problem). Option C abdicates without development. Option D treats coaching as separate from work (no time for this). The insight: coaching IS work. 3-minute investment per escalation compounds—each coached decision builds capability, reducing future escalations. After 10 iterations, they stop bringing problems.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "Your team proposes an 18-month project timeline. You think it's too long. According to powerful questions principles, what's your approach?",
    options: [
      "Tell them: 'That's too long, make it 12 months'",
      "Ask: 'Do you think 18 months is realistic?' (closed question)",
      "Ask: 'What's the earliest this could be done if we had to? What's the riskiest dependency? If we could only test one market first, which would you choose?' (open, challenging, expanding)",
      "Accept their timeline—they're the experts"
    ],
    correctAnswer: 2,
    explanation: "Option C demonstrates powerful questions: open-ended (start with 'what'), assumption-challenging ('earliest if we had to' challenges sequential assumption), expanding ('test one market' surfaces options not considered). The Just Eat Takeaway migration example: these questions revealed 18-month assumed unnecessary sequential rollout, identified addressable risk (data validation with better tooling), surfaced testing option not in original plan—result: 12 months, 40% less risk. Harvard research: inquiry-based leaders outperform advocacy-based by 40% on innovation, 25% on execution. Option A gets compliance, not ownership. Option B is closed (yes/no). Option D abdicates. The anatomy: Open-ended, generative, assumption-challenging, future-focused. After powerful question: shut up, count to 10, let them think (insight comes after 7-15 seconds processing).",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You need to shift your team's culture from 'speed at all costs' to 'sustainable pace'. You have burnout data showing the problem. According to storytelling principles, what's most effective?",
    options: [
      "Present the burnout data in a deck with clear metrics and recommendations",
      "Tell a story: 'A year ago, one of our best engineers collapsed at his desk. Ambulance came. Chronic sleep deprivation from 70-hour weeks. He recovered but left. I thought: What are we optimizing for? This isn't sustainable. We're changing.'",
      "Send an email announcing the new policy",
      "Both data and story are equally effective"
    ],
    correctAnswer: 1,
    explanation: "Option B uses storytelling for culture change. Stanford research: stories are 22x more memorable than facts alone. Data persuades mind (10% retention), stories persuade heart (65-70% retention). Stories activate multiple brain regions (language, sensory, motor, emotional) vs. facts (only language). The Just Eat Takeaway example: burnout data got nods, no change; engineer collapse story created culture shift because it was concrete (real person, real consequence), emotional (lost someone good), value-laden (what we optimize for matters). Option A presents facts without meaning. Option C announces without motivation. Option D is wrong—stories are 22x more effective for behavior change. The three types of leadership stories: 'Who I Am' (values/background), 'Why We're Here' (mission/problem), 'What Success Looks Like' (future state). Use Pixar structure: context, status quo, inciting incident, consequences, resolution.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're kicking off a strategic initiative. You want ownership, not compliance. According to the Story-Question-Coach integration framework, what's your approach?",
    options: [
      "Present strategy clearly, explain logic, tell team what to do",
      "Story opening ('Here's why this matters—customer impact'), Question exploration ('What challenges do you foresee? What would success look like?'), Coaching close ('What will you do first? What support do you need?')",
      "Just ask questions—let them figure everything out",
      "Tell an inspiring story and hope they get motivated"
    ],
    correctAnswer: 1,
    explanation: "Option B integrates all three advanced communication skills: Story creates meaning/context, Questions develop thinking/ownership, Coaching drives action/support. Google Project Aristotle: psychological safety (which enables performance) created through: leaders modeling vulnerability (story: 'here's what I don't know'), inviting input (questions: 'what am I missing?'), supporting agency (coaching: 'what will you do?'). The Just Eat Takeaway weekly meeting example: Story ('last week I made decision that backfired'), Questions ('where else are we optimizing for speed over sustainability?'), Coach ('pick one thing to change')—created team with highest engagement, lowest turnover because framework created culture of vulnerability, strategic thinking, and ownership. Option A creates compliance. Option C lacks meaning-making. Option D lacks strategic rigor and action. Integrated communication transforms.",
    xpReward: 10
  }
];

export const stripe16Content = {
  lessons: stripe16Lessons,
  checkpoints: stripe16Checkpoints
};

