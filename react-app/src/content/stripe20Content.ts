/**
 * BLACK BELT - STRIPE 20: LEGACY & MASTERY (FINAL STRIPE)
 * Theme: Integration, teaching, philosophy, legacy
 * Focus: The Five Dysfunctions as one system, becoming a leader of leaders, your leadership philosophy, what you leave behind
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

export const stripe20Lessons: Lesson[] = [
  {
    id: 1,
    title: "Integration: The Five Dysfunctions as One System",
    content: [
      "You've learned trust, conflict, commitment, accountability, and results as separate stripes. Now see them as one integrated system. They're not linear stages you complete—they're interconnected dynamics you manage simultaneously. Trust enables conflict. Conflict enables commitment. Commitment enables accountability. Accountability enables results. But also: Results strengthen trust. Accountability reinforces commitment. This is systems thinking: understanding how all five dysfunctions interact as a living, breathing team organism. Black Belt mastery is seeing and managing the whole system, not individual pieces.",
      
      "Lencioni's pyramid visualization shows the five stacked: Trust (bottom), Conflict, Commitment, Accountability, Results (top). But this can mislead people into thinking you 'finish' trust, then move to conflict. Wrong. The pyramid shows foundation importance (can't have real conflict without trust), not sequential completion. In reality, you're working all five simultaneously. This week you might strengthen trust through vulnerability. Next week you facilitate healthy conflict. The week after, you drive commitment to decisions. Simultaneously, you're maintaining accountability and obsessing over results. All five, all the time. That's the integration.",
      
      "The diagnostic tool: Assess your team across all five dimensions monthly. Trust: Are people open about weaknesses? Conflict: Are we debating ideas vigorously? Commitment: Do people own decisions even when they disagreed? Accountability: Are peers holding each other to standards? Results: Are we prioritizing collective outcomes over individual success? Score each 1-10. Your weakest link determines team effectiveness. If trust is 9 but results focus is 4, you'll underperform. If accountability is 9 but trust is 3, accountability will feel punitive rather than supportive. The system is only as strong as its weakest element. Diagnose, then strengthen the weakest link this quarter.",
      
      "At Just Eat Takeaway, we had this exact evolution. Year 1: Focused exclusively on results (weak trust, conflict avoidance, fake commitment, blame culture). We hit some metrics but burned people out and lost talent. Year 2: Realized we needed foundation, focused on building trust and psychological safety (results temporarily dipped as we slowed down). Year 3: With trust foundation, we could have real conflict, which created real commitment. Year 4: Commitment enabled peer accountability without defensiveness. Year 5: All five were strong—results exceeded anything we achieved in Year 1, but sustainably, with engaged people who wanted to stay. The five-year journey taught me: You can't skip foundation, but you also can't stay there. You build foundation, then layer the rest, then maintain all five continuously.",
      
      "The leadership moves across the five dysfunctions: Building Trust—go first with vulnerability, admit what you don't know, ask for help publicly. Inviting Conflict—mine for disagreement ('What concerns haven't been voiced?'), don't shut down debate. Driving Commitment—after debate, 'Are we all committed to this decision even if we disagreed?'. Creating Accountability—give people explicit permission to hold each other (and you) accountable, celebrate when they do. Obsessing Over Results—shared scoreboard, aligned incentives, public celebration of collective wins. These aren't one-time interventions—they're ongoing leadership practices. Every team meeting, you're deploying moves across all five dysfunctions. That's mastery: unconscious competence across the full system.",
      
      "The mistake most leaders make: They read about the five dysfunctions, pick their 'weakest one' (usually accountability or results because those are most visible), and try to fix it without strengthening foundation. 'We need more accountability!'—but without trust and commitment, accountability becomes blame. 'We need better results!'—but without conflict and commitment, you can't align on what results matter. The discipline: Always assess the full system. When addressing one dysfunction, ask: 'Do we have the foundation for this?' If not, build foundation first. If yes, proceed. The system is integrated—respect the architecture.",
      
      "In Brazilian Jiu Jitsu, the fundamentals are integrated system: Position (trust foundation—you must be stable before attacking), Pressure (conflict—engage with opponent), Transition (commitment—fully commit to next position), Control (accountability—maintain what you've gained), Submission (results—finish the match). You don't 'complete' position work and move to pressure. Every roll involves all five simultaneously. A white belt learns them separately. A black belt executes them as one fluid system. That's mastery in BJJ and business: seeing the whole, not just parts.",
      
      "The continuous practice: High-performing teams maintain all five dysfunctions through: Weekly trust-building (vulnerability in sharing wins/learns), Regular conflict (healthy debate in strategy discussions), Explicit commitment (public agreement after decisions), Peer accountability (team members calling each other to standards), Results obsession (visible scoreboard everyone owns). These aren't special programs—they're how the team operates every week. The five dysfunctions framework isn't theory to learn. It's practice to maintain. Forever. When you stop maintaining trust, it erodes. When you stop facilitating conflict, it disappears. When you stop reinforcing commitment, it weakens. The system requires active management. That's your job as leader: systems operator across all five.",
      
      "Next lesson: Becoming a Leader of Leaders—you've developed your own leadership, now we'll explore how to develop leadership in others, teaching what you've learned, and multiplying your impact through people you develop. But first, assess your team across all five dysfunctions. Score each 1-10. Identify weakest link. Ask: Do we have foundation to work on this, or do we need to strengthen trust/conflict first? Then plan this quarter's focus: 'We're strengthening X while maintaining Y/Z.' Integration means managing the whole system, not just fixing one piece. That's Black Belt thinking."
    ],
    learningObjective: "You will learn to manage Lencioni's five dysfunctions as an integrated, simultaneous system rather than sequential stages, with the weakest link determining overall team effectiveness.",
    duration: "10-12 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Becoming a Leader of Leaders: Teaching What You've Learned",
    content: [
      "You've completed 80 lessons. You understand trust, conflict, commitment, accountability, results, influence, communication, strategy, transformation. Now your responsibility shifts: from learning to teaching. Black Belt isn't the end of the journey—it's where you start giving back. The mark of mastery isn't what you know. It's how many people you develop who know it. Your legacy isn't your achievements. It's the leaders you create who continue leading after you're gone. This is the ultimate Black Belt responsibility: developing other Black Belts.",
      
      "Research from Google's Project Oxygen studying what makes great managers found that 'develops people' is the #2 predictor of team performance (after 'is a good coach'—which is related). Yet only 18% of managers say they're effective at developing others. Why? Because development requires: (1) Seeing potential others don't see yet, (2) Investing time in others' growth (not just task completion), (3) Tolerating their mistakes as learning (not just demanding perfection), (4) Celebrating their success (even when they surpass you). Most leaders are too busy executing to develop. Black Belts make development their primary work.",
      
      "The teaching framework: (1) Demonstrate (show them how you think through problems, not just what you decide), (2) Explain (make your reasoning visible—'I'm choosing X over Y because...'), (3) Delegate with coaching (give them challenge + support), (4) Debrief learning (after they act, 'What did you learn? What would you do differently?'), (5) Step back (let them own it fully, even make mistakes). This progression—I do it, we do it together, you do it with my coaching, you do it independently, you teach others—is how you develop leaders. Most leaders get stuck at step 1-2 (demonstrate and explain) without progressing to step 3-5 (actually developing independence).",
      
      "At Just Eat Takeaway, I measured my success by: How many people I developed who got promoted (23 directs/indirects promoted over 5 years). How many people left for bigger roles elsewhere (8—initially I was sad, then realized: If they're ready for bigger things than I can offer, that's development success). How many people said 'You changed how I think about leadership' (dozens, based on exit interviews and LinkedIn messages years later). These metrics matter more than any business result I achieved because business results are temporary—the leaders you develop continue creating results long after you leave.",
      
      "The teaching mindset shifts: From 'I'm the expert with answers' to 'I help you discover your answers.' From 'Do it my way' to 'What approach works for your context?' From 'Here's what I know' to 'What are you learning?' From 'Let me solve that' to 'How will you approach it?' These shifts are uncomfortable—coaching takes longer than solving, questions feel slower than answers, their approach may differ from yours. But the outcome is leader development, not task completion. Task completion happens once. Leader development compounds forever.",
      
      "The specific practices: (1) Weekly development 1-on-1s separate from status updates—focused on their growth, not project updates. (2) Give stretch assignments intentionally—'This is slightly beyond your current capability, here's support.' (3) Share your reasoning explicitly in decisions—make them see HOW you think, not just WHAT you decide. (4) Create teaching moments—when something goes wrong, 'What's the learning here?' not 'Who's at fault?' (5) Celebrate their leadership—when they demonstrate mastery, name it: 'That was Black Belt coaching you just did.' Recognition accelerates development. These practices make development systematic, not accidental.",
      
      "The mistake most leaders make: They hoard knowledge as power ('If I teach them everything, they won't need me'). This creates dependency, not leadership. Organizations limited by their leader's capacity can't scale. The Black Belt mindset: 'If I develop people who don't need me, I'm free to work on bigger challenges.' Your goal is to make yourself redundant in your current role (because you've developed people who can do it) so you can take on the next level (where you'll develop the next cohort). Leadership development is how you scale: your capacity becomes irrelevant because you've multiplied capacity through others.",
      
      "In Brazilian Jiu Jitsu, black belts have responsibility: teach. Not just show techniques (anyone can do that), but develop practitioners who think strategically, learn independently, and eventually teach others. A black belt is measured by: How many students progress through belts under their instruction? How many students develop their own unique game (vs. just copying instructor)? How many students become instructors themselves? These are legacy metrics. Business Black Belts need the same: How many leaders did you develop? How many developed their own leadership style? How many are now developing leaders themselves? That's how leadership multiplies.",
      
      "Next lesson: Your Leadership Philosophy—we'll help you articulate your unique leadership approach, synthesizing everything you've learned into a coherent personal philosophy that guides your decisions and communicates your values. But first, identify 2-3 people you'll develop this year. Not just manage—develop. Commit to: Weekly development 1-on-1s with each. One stretch assignment per quarter. Explicit coaching after key moments. Public celebration of their leadership. In 12 months, assess: Are they operating more independently? Are they demonstrating leadership without needing you? Are they ready for bigger roles? If yes, you've succeeded. Teaching what you've learned is how you earn the Black Belt. Mastery isn't just personal skill—it's developing skill in others."
    ],
    learningObjective: "You will learn the five-step teaching framework (demonstrate, explain, delegate with coaching, debrief, step back) and why developing leaders is the #2 predictor of team performance, yet only 18% of managers do it effectively.",
    duration: "10-12 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Your Leadership Philosophy: Synthesizing the Journey",
    content: [
      "After 80 lessons, 300+ research citations, real-world examples across five belts—what's YOUR leadership philosophy? Not Lencioni's. Not Google's. Not mine. Yours. Black Belt mastery requires synthesizing everything you've learned into a coherent personal philosophy: the principles that guide your decisions, the values that shape your actions, the beliefs about people and teams that drive your leadership approach. This lesson helps you articulate that philosophy clearly so you can communicate it, live it, and pass it on.",
      
      "Your leadership philosophy answers four questions: (1) What do I believe about people? (fundamentally capable and want to contribute? need direction and control? grow through challenge? require safety first?). (2) What's my primary role as leader? (provide vision? remove obstacles? develop capability? drive results?). (3) What principles guide my decisions? (trust over control? long-term over short-term? collective over individual? transparency over comfort?). (4) What legacy do I want? (results achieved? people developed? culture created? what's remembered?). Your answers to these four questions create your leadership operating system—the philosophy that guides everything.",
      
      "The process: Reflect on your leadership journey (biggest successes, worst failures, most important lessons). Identify patterns: What approaches consistently work for you? What values do you refuse to compromise? What leadership moments made you proud? What do people say about your leadership style? These patterns reveal your authentic philosophy—not what you think you should say, but what you actually believe and practice. Write it down: 200-300 words capturing your core beliefs about leadership. This becomes your North Star—referenced when making hard decisions, communicated to new team members, refined as you learn.",
      
      "My leadership philosophy (example to spark your thinking): 'I believe people are fundamentally capable and want to contribute meaningfully, but organizations often create systems that prevent contribution. My primary role is removing obstacles and developing capability so people can do their best work. I lead through: (1) Extreme ownership (I'm accountable for everything in my world), (2) Transparent communication (I share reasoning, not just decisions), (3) Developmental coaching (I ask questions before giving answers), (4) Results obsession (we're here to achieve outcomes that matter). I refuse to compromise on: psychological safety (people must feel safe to take risks), long-term value (I won't sacrifice tomorrow for today), distributed ownership (I build leaders, not dependencies). My legacy goal: Develop leaders who continue creating impact long after I'm gone.' This philosophy guides every decision I make.",
      
      "At Just Eat Takeaway, articulating my philosophy changed how I led. Before: Reactive (responding to whatever was urgent). After: Intentional (filtering decisions through my philosophy). Example: Was asked to mandate return-to-office (leadership wanted it). My philosophy (distributed ownership, trust over control): 'Let teams decide what works for their context. We're accountable for results, not presence.' This created friction with some executives but aligned with my beliefs about people. The philosophy gave me conviction to push back on approaches misaligned with my values. Without clear philosophy, you're just responding to pressure. With philosophy, you're leading from principles.",
      
      "The test: Share your philosophy with your team. Do they recognize it in your daily actions? If you say 'I believe in transparency' but they've never seen you admit uncertainty, your philosophy is aspiration, not reality. If you say 'I develop people' but they've never received developmental coaching, you're describing what you wish, not what you do. The discipline: Your philosophy must describe your actual practice, not your ideal state. Then the gap between philosophy and practice becomes your development agenda. 'I believe X but I'm doing Y—I need to change Y to align with X.' This creates integrity: your stated beliefs match your demonstrated behavior.",
      
      "The evolution: Your philosophy will refine over time. My early-career philosophy: 'Be the smartest person in the room, have all the answers, drive through technical excellence.' Mid-career: 'Develop people through coaching questions, distribute ownership, obsess over results.' Current: 'Build systems and leaders that continue operating effectively without me, teach what I've learned, prioritize long-term impact.' Each phase reflected my growth. Your philosophy should evolve as you learn. The point isn't to get it perfect once—it's to articulate clearly where you are now, then refine as you develop.",
      
      "In Brazilian Jiu Jitsu, every black belt has a unique game (their personal style built on fundamentals). Some are pressure-passers (constant forward pressure). Some are guard-players (fight from bottom). Some are submission specialists (finish fast). All are effective. All are built on same fundamentals (position, pressure, transition, control, submission) but expressed uniquely. Your leadership philosophy is the same: built on fundamentals (trust, conflict, commitment, accountability, results) but expressed in your unique style. There's no one 'right' philosophy—there's YOUR philosophy, authentic to who you are and what you believe.",
      
      "Next lesson: Legacy—What You Leave Behind. The final lesson. We'll explore what it means to create lasting impact beyond your tenure, how to think about leadership legacy intentionally, and how to ensure the work you've done continues after you move on. But first, draft your leadership philosophy. Answer the four questions: What do I believe about people? What's my role as leader? What principles guide my decisions? What legacy do I want? Write 200-300 words. Share with someone you trust. Ask: Does this match what you see in my leadership? Refine based on feedback. This becomes your North Star. Reference it. Live it. Evolve it. Pass it on. That's Black Belt: knowing who you are as leader and leading from that authentic place."
    ],
    learningObjective: "You will learn to synthesize your leadership journey into a personal philosophy by answering four questions (beliefs about people, your role, guiding principles, legacy goal) that creates your leadership operating system.",
    duration: "10-12 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Legacy: What You Leave Behind",
    content: [
      "Your career will end. You'll retire, move to a new role, or leave the organization. Years later, what will remain? The deals you closed? Forgotten. The features you shipped? Replaced. The presentations you gave? Deleted. But the people you developed? Still leading. The culture you built? Still operating. The values you embedded? Still guiding decisions. This is legacy: not what you accomplished, but what continues after you're gone. Black Belt leaders think about legacy intentionally from the beginning, not frantically at the end. This final lesson helps you define and create the legacy you want.",
      
      "Research from Harvard Business School studying executive legacy found that leaders remembered most positively by their organizations had: (1) Developed successors who thrived after they left (leadership continuity), (2) Built systems that improved performance sustainably (not just spiked results then crashed), (3) Transformed culture in ways that persisted (new behaviors became norms), (4) Maintained relationships with people they developed (continued mentoring after leaving role). The leaders remembered poorly: Hit short-term numbers but left burned-out teams, promoted people unprepared for roles, created dependencies on themselves so organization struggled without them. Legacy isn't your resume. It's what happens after you leave.",
      
      "The three types of legacy: (1) Results Legacy—the tangible outcomes you achieved (revenue grown, products launched, customers served). This matters but it's perishable—next leader will create new results. (2) People Legacy—the leaders you developed who continue creating impact. This compounds—the people you develop develop others, multiplying impact across generations. (3) Cultural Legacy—the values, practices, and systems that persist. This is foundational—culture you embed continues shaping decisions long after you're gone. Most leaders focus exclusively on Results Legacy (easiest to measure, fastest to achieve). Black Belts balance all three, emphasizing People and Cultural Legacy because those compound.",
      
      "At Just Eat Takeaway, my Results Legacy: Scaled operations 500→2,000 people, grew revenue 3x, improved customer satisfaction 40%, reduced delivery times 35%. But honestly—those will be replaced or improved by future leaders. My People Legacy: 23 people promoted to next level, 8 people moved to bigger roles externally, 15+ people still reference lessons I taught years later (based on LinkedIn messages). My Cultural Legacy: Shifted from 'speed at all costs' to 'sustainable performance,' embedded weekly team rituals that still run today (3 years after I left), created leadership pipeline system still developing future leaders. The Results Legacy I'm proud of. The People and Cultural Legacy I'm most proud of because they're still creating value.",
      
      "The legacy questions: Ask yourself honestly: (1) If I left tomorrow, would my team struggle or thrive? (Dependency test—have you built leaders who can operate without you?). (2) Three years after I leave, what will people remember about my leadership? (Reputation test—what's the story they tell?). (3) What values/practices did I embed that will persist? (Cultural test—what survives your departure?). (4) Who did I develop that's creating impact elsewhere? (People test—how many are leading because you developed them?). Your answers reveal your actual legacy trajectory. If the answers aren't what you want, you still have time to change trajectory.",
      
      "The intentional legacy practice: (1) Develop your successor explicitly (don't wait until you're leaving—develop people who could replace you starting now). (2) Document your systems (playbooks, decision frameworks, lessons learned—so future leaders benefit from your experience). (3) Embed rituals that outlast you (weekly team practices, quarterly reviews, cultural ceremonies that become 'how we work'). (4) Maintain relationships after you move on (continue mentoring people you developed—your legacy continues through them). (5) Celebrate others' success publicly (the more you give credit away, the more they remember your influence). These five practices create legacy intentionally, not accidentally.",
      
      "The mistake most leaders make: They wait until they're leaving to think about legacy ('Better start documenting things, I'm retiring next year'). Too late. Legacy is built daily over years, not created frantically at the end. Every decision to develop someone vs. do it yourself. Every choice to embed a system vs. operate heroically. Every time you share credit vs. claim it. These daily decisions accumulate into legacy. The discipline: Lead now as if you're leaving in 12 months. Are you building dependencies or developing independence? Creating hero-systems or sustainable systems? Hoarding knowledge or teaching generously? Live your legacy daily. It's not a deathbed reflection—it's a daily practice.",
      
      "In Brazilian Jiu Jitsu, a black belt's legacy is measured by: How many students earned their black belts under your instruction? What unique techniques or approaches did you contribute to the art? How has your gym's culture influenced the broader community? How many of your students are now instructors developing the next generation? The legendary instructors (Hélio Gracie, John Danaher, Marcelo Garcia) are remembered not for their comp wins (though impressive) but for the students they developed and the evolution of the art they influenced. That's legacy: creating impact that multiplies and persists long after you're gone.",
      
      "The final integration: You've completed 80 lessons across five belts (White: Trust foundations, Blue: Navigating conflict, Purple: Driving commitment, Brown: Creating accountability, Black: Results mastery and transformation). You've learned frameworks, research, practices, principles. Now you know: Leadership isn't about authority—it's about influence. It's not about being the smartest—it's about developing others. It's not about short-term wins—it's about sustainable systems. It's not about what you accomplish—it's about what continues after you're gone. This is Black Belt leadership: mastery of yourself, development of others, transformation of organizations, creation of legacy.",
      
      "Your journey doesn't end here. Black Belt is when real work begins. Now you teach what you've learned. You develop the next generation of leaders. You refine your practice continuously. You build organizations that outlast you. You create impact that multiplies through people you develop. This is the Black Belt responsibility. This is the legacy you're now equipped to create. Welcome to Black Belt. Now go build something that matters. Develop people who lead long after you're gone. Create systems that improve lives continuously. Leave organizations better than you found them. That's the work. That's the legacy. That's why you earned the Black Belt. Now use it. Teach it. Pass it on. The journey continues."
    ],
    learningObjective: "You will learn three types of legacy (Results, People, Cultural) and five intentional practices (develop successors, document systems, embed rituals, maintain relationships, celebrate others) that create impact persisting after you're gone.",
    duration: "10-12 minutes",
    xpReward: 10
  }
];

export const stripe20Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your team scores: Trust 9/10, Conflict 8/10, Commitment 7/10, Accountability 4/10, Results 5/10. You want to improve results. According to integrated systems thinking, what's your approach?",
    options: [
      "Focus on Results directly—launch metrics, create urgency, demand performance",
      "Focus on Accountability first (the weakest foundation dysfunction). Without accountability, results obsession becomes blame. Fix: Build peer accountability through trust/commitment foundation you already have, THEN emphasize results.",
      "Work on all five equally to balanced improvement",
      "Results are fine at 5/10—that's passing"
    ],
    correctAnswer: 1,
    explanation: "Option B applies integrated systems thinking—the system is only as strong as its weakest link. You have strong trust/conflict/commitment (foundation), weak accountability. Lencioni's cascade: Without accountability, you can't have real results focus (who holds people to standards?). But you CAN build accountability because you have the trust/commitment foundation. The Just Eat Takeaway example: Year 1 focused on results without foundation (burnout, turnover). Year 2 built trust (results temporarily dipped). Years 3-4 layered conflict→commitment→accountability. Year 5 all five strong, results exceeded Year 1 sustainably. Option A skips necessary foundation (results pressure without accountability = blame culture). Option C dilutes effort. Option D accepts mediocrity. The diagnostic: assess all five monthly, strengthen weakest link, respect the architecture (can't build accountability without trust, can't drive results without accountability). All five work simultaneously once foundation exists, but you strengthen them sequentially based on current state.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You've developed strong leadership skills. A team member asks for help solving a complex problem. You know the answer. According to 'becoming a leader of leaders' principles, what do you do?",
    options: [
      "Tell them the answer—it's faster and you're the expert",
      "Use the teaching framework: Demonstrate your thinking process ('Here's how I'd analyze this...'), Explain reasoning, Coach them through it ('What would you try?'), Debrief after ('What did you learn?'). Develop their problem-solving capability, not just solve this problem.",
      "Tell them to figure it out themselves without guidance",
      "Solve it together so they learn by watching"
    ],
    correctAnswer: 1,
    explanation: "Option B applies the five-step teaching framework (demonstrate→explain→delegate with coaching→debrief→step back) focused on developing independence, not just task completion. Google Project Oxygen: 'develops people' is #2 predictor of team performance, yet only 18% of managers do it effectively. The Just Eat Takeaway metrics: 23 promoted, 8 to bigger external roles, dozens saying 'you changed how I think'—legacy measured by leaders developed, not problems solved personally. Option A optimizes speed over development (they'll be back with next problem). Option C abdicates without teaching. Option D is better but still centered on you. The mindset shifts: 'I help you discover answers' vs. 'I have answers.' 'How will you approach it?' vs. 'Let me solve that.' Teaching takes longer than solving—but task completion happens once, leader development compounds forever. Black Belt mastery: developing people who don't need you so you're free for bigger challenges. Make yourself redundant through development.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You articulate your leadership philosophy: 'I believe in transparency.' Your team gives feedback: 'We've never seen you admit when you don't know something.' According to philosophy-practice alignment principles, what's happening?",
    options: [
      "Your team doesn't understand what transparency means",
      "Gap between stated philosophy (aspiration) and actual practice (reality). Your philosophy must describe what you DO, not what you WISH. The gap is your development agenda: change behavior to align with stated beliefs, or revise philosophy to reflect actual practice.",
      "Transparency doesn't require admitting uncertainty",
      "Your team is wrong—you are transparent"
    ],
    correctAnswer: 1,
    explanation: "Option B diagnoses philosophy-practice misalignment. Your philosophy must match demonstrated behavior, not aspirational values. The test: Share philosophy with team—do they recognize it in your daily actions? If gap exists, either: (1) Change practice to match philosophy ('I say transparency, so I'll start admitting uncertainty'), or (2) Revise philosophy to reflect reality ('I actually believe in confidence projection'—though this likely indicates development need). The Just Eat Takeaway example: before articulating philosophy, reactive leadership responding to pressure. After articulating philosophy (distributed ownership, trust over control), filtered decisions through principles—pushed back on mandated return-to-office because misaligned with beliefs. Philosophy gave conviction. Without clear philosophy, you respond to pressure. With philosophy, you lead from principles. Philosophy evolves (early: be smartest; mid: develop people; current: build systems/leaders that work without me). The discipline: articulate where you are NOW, create integrity between stated beliefs and demonstrated behavior, refine as you develop.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're planning to leave your role in 12 months. You start documenting systems and processes frantically. According to legacy principles, what's the problem?",
    options: [
      "Nothing—that's exactly when you should think about legacy",
      "Too late. Legacy is built daily over years through: developing successors NOW, embedding rituals that persist, maintaining relationships after you leave, celebrating others' success. You should have been building legacy from day one, not creating it frantically at the end.",
      "12 months is too much notice to give",
      "Documentation isn't important for legacy"
    ],
    correctAnswer: 1,
    explanation: "Option B diagnoses the 'legacy as deathbed reflection' mistake. Harvard research: leaders remembered positively developed successors who thrived, built sustainable systems, transformed culture that persisted, maintained relationships after leaving. Three legacy types: Results (perishable—next leader creates new results), People (compounds—leaders you develop develop others), Cultural (foundational—values/practices persist). The Just Eat Takeaway example: Results legacy (scaled, grew revenue) will be replaced. People legacy (23 promoted, 8 to external roles, 15+ still reference lessons) and Cultural legacy (shifted to sustainable performance, rituals still running 3 years later, pipeline still developing leaders) continue creating value. Option A waits until end (too late). Option C is irrelevant. Option D misses point. Five intentional practices: (1) Develop successor explicitly (starting now), (2) Document systems, (3) Embed rituals, (4) Maintain relationships, (5) Celebrate others. Daily decisions accumulate: develop vs. do yourself, embed systems vs. operate heroically, share credit vs. claim it. Lead NOW as if leaving in 12 months. Black Belt: mastery of self, development of others, transformation of organizations, creation of legacy. That's the work. That's the Black Belt. Journey continues.",
    xpReward: 10
  }
];

export const stripe20Content = {
  lessons: stripe20Lessons,
  checkpoints: stripe20Checkpoints
};

