/**
 * BROWN BELT - STRIPE 14: OWNERSHIP CULTURE
 * Theme: Creating extreme ownership and distributed leadership
 * Focus: Jocko principles, accountability rituals, cost of non-ownership, distributed leadership
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

export const stripe14Lessons: Lesson[] = [
  {
    id: 1,
    title: "Extreme Ownership: The Jocko Principle",
    content: [
      "A Navy SEAL team executes a mission in Iraq. It goes wrong. Multiple friendly fire incidents. Chaos. Afterwards, the SEAL team leaders meet with their commanding officers to explain what happened. Every team leader starts the same way: 'I take full responsibility. Here's what I did wrong.' Not 'my team failed me.' Not 'the intel was bad.' Not 'conditions were difficult.' Just ownership. This is Extreme Ownership—the leadership philosophy from Jocko Willink and Leif Babin that transformed SEAL Team 3 and now transforms businesses.",
      
      "The principle: Leaders take absolute responsibility for everything in their world. If your team fails, you failed to prepare them, set expectations clearly, or provide the right resources. If strategy doesn't work, you failed to stress-test it or communicate it effectively. If execution stumbles, you failed to remove obstacles or coach performance. There are no bad teams, only bad leaders. This is uncomfortable. It's also liberating. If everything is your fault, everything is within your control to fix.",
      
      "Research from organizational psychology shows that leaders who model extreme ownership create cultures where team members also take ownership. It's contagious. When the leader says 'my fault' instead of 'their fault,' team members follow: 'What could I have done differently?' When the leader says 'their fault,' team members follow: 'Not my problem.' Leadership sets the tone. Accountability flows downhill—but it starts at the top.",
      
      "The counterintuitive insight: Taking responsibility for everything doesn't weaken your authority—it strengthens it. When you own failures, people trust you're being honest about successes. When you blame others, people suspect you're taking credit for wins while deflecting losses. Credibility comes from consistency: own both wins and losses, and your team knows they can trust your assessment of reality.",
      
      "At Just Eat Takeaway, we had a major delivery failure. 500 orders delayed due to a dispatch algorithm bug. My team waited for me to assign blame: Was it engineering's bug? Product's specification? My response: 'I'm accountable. I pushed for fast deployment without adequate testing. I didn't ensure we had rollback procedures. I didn't build in enough buffer for unknowns. This is on me.' What happened? The team stopped defending themselves and started problem-solving: 'Here's how we prevent this.' 'Here's the fix.' 'Here's the communication plan.' Extreme ownership unlocked extreme problem-solving.",
      
      "The four levels of ownership: (1) Task ownership—I'm responsible for my individual work. (2) Team ownership—I'm responsible for my team's results. (3) Mission ownership—I'm responsible for the overall objective, including dependencies and context. (4) Extreme ownership—I'm responsible for everything that affects the mission, even things outside my direct control. Most people operate at level 1-2. Leaders operate at level 3-4. The shift from 'that's not my job' to 'if it affects the mission, it's my job' is the shift from competence to leadership.",
      
      "The discipline: When something goes wrong, your first internal question is: 'What could I have done differently?' Not 'who messed up?' Focus on what's within YOUR control: Did I set clear expectations? Did I provide adequate resources? Did I remove known obstacles? Did I coach performance? Did I ensure alignment? Did I stress-test the plan? There's always something you could have done better. Find it. Own it. Fix it going forward. This isn't self-blame—it's agency. If it's your fault, you can fix it. If it's their fault, you're helpless.",
      
      "The mistake most leaders make: They confuse ownership with blame. 'If I say it's my fault, people will think I'm incompetent.' Wrong. People think you're incompetent when you deflect and make excuses. People think you're strong when you own reality and drive solutions. Jocko's principle: 'There's no one to blame but me. And that's okay—because now I can fix it.' Ownership without blame is pure agency. It's the most powerful leadership posture possible.",
      
      "In Brazilian Jiu Jitsu, if you get submitted, you don't blame your opponent for being good or the referee for bad positioning. You ask: 'What did I do that allowed that? Where was my defense weak? What setup did I miss?' The best practitioners never blame—they own their position and adjust. This creates rapid improvement because you're focused on what you control (your technique) not what you don't (opponent's skill).",
      
      "The implementation: Start with yourself. Next time something goes wrong on your team, before analyzing anyone else's performance, write down: 'What I could have done differently: [5 things].' List five things within your control that would have prevented or mitigated the problem. Then share that list with your team: 'Here's what I'm going to change going forward.' This models extreme ownership and gives your team permission to own their part. The leader goes first. Always.",
      
      "Next lesson: Creating Accountability Rituals—how to embed ownership into daily operations through structured practices that make accountability automatic, not exceptional. But first, practice extreme ownership once this week. When something doesn't go as planned, resist the impulse to find who's at fault. Instead, identify five things within YOUR control that would have changed the outcome. Own those. Fix those. Watch what happens to your team's ownership in response."
    ],
    learningObjective: "You will learn Jocko Willink's Extreme Ownership principle where leaders take absolute responsibility for everything in their world, creating agency and contagious ownership culture.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Creating Accountability Rituals",
    content: [
      "One-time accountability conversations don't create accountability culture. Rituals do. Rituals are repeated practices that become automatic—like brushing your teeth. You don't decide whether to do it; you just do it because it's part of your routine. Accountability needs the same: regular, predictable practices that make ownership automatic rather than something you have to consciously enforce.",
      
      "Research from Stanford's BJ Fogg on habit formation shows that behaviors become automatic through: (1) Clear trigger (when does this happen?), (2) Easy execution (low friction), (3) Consistent repetition (no exceptions). Accountability rituals use this framework: specific triggers (every Friday), easy structures (15-minute format), consistent practice (non-negotiable attendance). After 8-12 weeks, the ritual becomes 'how we operate,' not 'that thing leadership makes us do.'",
      
      "Ritual 1: The Friday Wins & Learns (30 minutes weekly). Every team member shares: (1) One win from this week (what went well), (2) One learning (what didn't go as planned and what you'll do differently). The structure forces both celebration and accountability. People can't just report wins (creates false positivity). People can't just report problems (creates victim mentality). The combination creates realistic assessment and forward-looking adjustment. The discipline: Everyone shares, including the leader. No skipping. No exceptions.",
      
      "Ritual 2: The Monday Commitment Check (15 minutes weekly). Start of week, everyone states: (1) My top 3 commitments for this week, (2) What I need from others to deliver (dependencies). End of week, review: Did I deliver? If not, what prevented it? This creates public commitment (social accountability) and early visibility into obstacles. Research shows public commitments are 65% more likely to be kept than private ones because social pressure reinforces individual motivation.",
      
      "Ritual 3: The Monthly Retrospective (90 minutes monthly). Deep dive on patterns: (1) What's working well that we should keep doing? (2) What's not working that we should stop or change? (3) What experiments should we try next month? The key: This isn't venting—it's data-driven pattern recognition. 'We've had 3 deadline misses this month—what's the common factor?' The team diagnoses system problems, not individual failures. Then they own the solutions collectively.",
      
      "Ritual 4: The Quarterly Reflection (2 hours quarterly). Step back from tactical and ask strategic questions: (1) Are we working on the right things (Purple Belt priorities check)? (2) How's our team health (White Belt trust check)? (3) What capabilities are we building vs. what we need (skill gaps)? (4) What's one thing we'll commit to improving next quarter? This prevents teams from executing efficiently in the wrong direction. Quarterly altitude check keeps strategy and execution aligned.",
      
      "At Just Eat Takeaway, we implemented all four rituals. Before: Accountability was sporadic, dependent on leadership attention, and felt punitive when it happened. After: Accountability was systematic, peer-driven, and felt like collaborative problem-solving. The rituals created rhythm. People knew: Friday we reflect on the week. Monday we commit to the week ahead. Monthly we look at patterns. Quarterly we check strategic direction. No surprises, no exceptions, just consistent practice.",
      
      "The mistake most leaders make: They implement rituals inconsistently. Week 1: We do Friday wins/learns. Week 2: Someone's on vacation, skip it. Week 3: Busy week, skip it. Week 4: Forgot about it. By week 5, it's dead. Rituals only work if they're sacred. BJ Fogg's research: It takes 8-12 weeks of perfect consistency to establish a habit. If you skip even once in those first 12 weeks, you reset the clock. The discipline: Protect the ritual religiously for 12 weeks. After that, it's self-sustaining because it's become 'how we work.'",
      
      "The facilitation technique: Rituals need structure to stay valuable. Friday Wins/Learns: Max 3 minutes per person, use timer, no discussion/problem-solving (just share and move on). Monday Commitment Check: Write commitments in shared doc during meeting (visibility), dependencies noted explicitly. Monthly Retro: Use 'Start/Stop/Continue' framework (what to start doing, stop doing, continue doing). Quarterly Reflection: Pre-work required (everyone brings 3 observations), breakout discussions, synthesis at end. Structure prevents rituals from becoming unfocused venting sessions.",
      
      "In Brazilian Jiu Jitsu, every class follows a ritual: Bow in, warm up, technique instruction, drilling, live sparring, bow out. This ritual happens whether there are 5 students or 50, whether the instructor feels inspired or tired, whether it's Monday or Saturday. The consistency is the point—it creates psychological safety ('I know what to expect'), builds skill through repetition, and reinforces culture. Business teams need the same: predictable rituals that create psychological safety and embed values through repetition.",
      
      "The implementation: Choose ONE ritual to start. Don't try to implement all four at once. Pick the one that addresses your biggest gap. If accountability is weak: Start with Monday Commitment Check. If learning is slow: Start with Friday Wins/Learns. If coordination is chaotic: Start with Weekly Tactical (from Blue Belt). If strategy drift is an issue: Start with Quarterly Reflection. Run it perfectly for 12 weeks. Then add a second ritual. Layer rituals over time—don't overwhelm the team.",
      
      "Next lesson: The Cost of Non-Ownership—we'll explore exactly what it costs (time, money, trust, talent) when teams don't take ownership, making the business case for accountability culture. But first, implement one ritual. Choose it. Schedule it for the next 12 weeks (recurring calendar invite). Protect it absolutely—no cancellations, no exceptions. Facilitate it with discipline (structure, time-boxing, everyone participates). After 12 weeks, assess: Has accountability improved? If yes, add the next ritual. If no, you likely skipped weeks or didn't facilitate with structure. Rituals work—but only if practiced consistently."
    ],
    learningObjective: "You will learn four accountability rituals (Friday wins/learns, Monday commitments, monthly retros, quarterly reflection) that embed ownership into team operations through consistent, structured practice.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "The Cost of Non-Ownership",
    content: [
      "Your project is late. You ask the team: 'What happened?' Everyone has an explanation: 'Marketing didn't send assets on time.' 'Engineering had other priorities.' 'The vendor delayed.' All true. And all irrelevant. Because no one owned the outcome—they owned their piece. When no one owns the whole, the whole fails. This is the cost of non-ownership: everyone did their job, the mission still failed, and no one feels responsible.",
      
      "Research from Harvard Business Review studying project failures found that 65% of failed projects had clear individual accountability (everyone knew their role) but lacked outcome ownership (no one owned the overall result). This is the difference between task completion and mission success. Task accountability asks: 'Did I do my part?' Outcome ownership asks: 'Did we achieve the objective?' The first is necessary but insufficient. The second is what actually matters.",
      
      "The quantifiable costs of non-ownership: (1) Coordination overhead—when no one owns the outcome, you need constant meetings to align. McKinsey estimates 20-30% of employee time is spent in coordination overhead when ownership is diffuse. (2) Delayed problem-solving—issues sit unaddressed because 'not my responsibility.' (3) Finger-pointing waste—energy goes to blame instead of solutions. (4) Repeated failures—same mistakes happen because no one owned preventing them. (5) Talent loss—high performers leave because they're surrounded by non-owners.",
      
      "The hidden cost: Trust erosion. When team members consistently don't take ownership, trust degrades. You can't trust someone who doesn't own their impact. Research from Stephen M.R. Covey ('The Speed of Trust') shows that low-trust organizations have a 'trust tax'—everything takes longer, costs more, and produces worse results because you have to verify, monitor, and control. High-trust organizations have a 'trust dividend'—speed increases, costs decrease, results improve because you can assume ownership.",
      
      "At Just Eat Takeaway, we had a quarter where delivery errors spiked 40%. In the post-mortem, every function explained their constraints: Operations was short-staffed. Tech had competing priorities. Product had delayed a needed feature. Customer service was overwhelmed. All true. Zero ownership. I asked: 'Who owned delivery quality?' Silence. Everyone owned a piece; no one owned the outcome. We restructured: one person (Operations Lead) owned delivery quality end-to-end, with authority to pull resources from other functions. Errors dropped 35% in 6 weeks because someone finally OWNED it.",
      
      "The cultural cost: Non-ownership culture attracts and retains non-owners while repelling and losing owners. High performers (people who naturally take ownership) join teams, discover no one else owns outcomes, get frustrated carrying the team, and leave. Low performers (people who avoid ownership) join teams, discover they can hide in diffused responsibility, and stay forever. Over time, the team composition degrades: you lose your best people and keep your worst. This is selection pressure in action—culture determines who stays and who goes.",
      
      "The diagnostic question: 'If this project fails, whose career takes the hit?' If the answer is 'no one's really—we all share responsibility,' you have diffused accountability. If the answer is a specific name, you have ownership. The person whose career is tied to the outcome will behave differently than someone who's 'just helping out.' They'll escalate earlier, coordinate more intensively, and make trade-offs to ensure success. That's what ownership looks like.",
      
      "The fix: Single-threaded ownership. Amazon's Jeff Bezos pioneered this: every major initiative has ONE owner who is single-threaded (not doing three other things), who has authority to make decisions, and who owns the outcome. Not a committee. Not a 'shared team.' One person. That person can build a team, delegate tasks, collaborate across functions—but at the end, if it fails, everyone knows whose failure it is. That clarity creates accountability that diffused ownership never can.",
      
      "In Brazilian Jiu Jitsu, if you compete, you can't blame your loss on your training partners, your coach, or the tournament format. You stepped on the mat. You either won or lost. That's pure ownership—no one to blame, no one to credit but yourself. This creates extreme accountability. Every loss is a mirror showing you exactly where your game needs improvement. That feedback loop creates rapid growth. Teams need the same: clear ownership so failure provides clear feedback on what to improve.",
      
      "The implementation: Audit your major initiatives. For each one, answer: (1) Who owns the outcome (one name)? (2) Do they have authority to make decisions affecting success? (3) Is their career tied to this result? If you can't answer #1 with confidence, you have diffused ownership. Fix it: Designate one owner. If you answered #1 but #2 is no, give them authority. If #1 and #2 are yes but #3 is no, tie their performance evaluation to the outcome. All three must be true for ownership to work.",
      
      "Next lesson: Distributed Leadership—how to scale ownership across the organization so you're not the single point of failure. But first, identify one important initiative that's struggling. Diagnose: Who owns the outcome? If answer is vague ('the team') or multiple names ('Sarah and Tom co-own it'), that's your problem. Restructure: One owner, clear authority, career tied to outcome. Watch how behavior changes when someone actually OWNS it vs. just participating in it. The cost of non-ownership is massive. The fix is simple but uncomfortable: actual, singular ownership."
    ],
    learningObjective: "You will learn the quantifiable costs of non-ownership (coordination overhead, delayed problem-solving, trust erosion, talent loss) and how single-threaded ownership fixes diffused accountability.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Distributed Leadership",
    content: [
      "You're the bottleneck. Every decision flows through you. Every escalation comes to you. Every coordination requires you. When you're on vacation, things break. This isn't leadership—it's heroic micromanagement. Distributed leadership means building a team where ownership and decision-making is spread across people, not concentrated in you. Not because you're delegating tasks, but because you've developed leaders who own outcomes.",
      
      "Research from Harvard Business School studying high-growth companies found that sustainable scaling requires 'distributed leadership'—where leadership capability exists at multiple levels, not just the top. Companies that try to scale with centralized leadership (everything flows through founder/CEO) hit a ceiling around 50-150 people. Companies with distributed leadership scale to thousands because decision-making is parallelized, not serialized through one person.",
      
      "The shift from task delegation to outcome ownership: Task delegation—'Go do this specific thing I defined.' Outcome ownership—'Achieve this result; you decide how.' Task delegation keeps you as the thinker and them as the doers. Outcome ownership develops their judgment and autonomy. Example: Task delegation—'Send this specific email to these customers with this subject line.' Outcome ownership—'We need to reduce churn 15% this quarter. You own that. What's your plan?' The second requires them to think strategically, not just execute tactically.",
      
      "The four levels of distributed leadership (growing delegation): Level 1—Recommend (you decide, they propose options). Level 2—Inform (they decide, they tell you what they decided). Level 3—Act (they decide and act, no notification needed). Level 4—Own (they're accountable for outcomes in this domain, you're hands-off). Most leaders get stuck at Level 1-2 (they retain decision rights). High-growth leaders operate at Level 3-4 (they give decision rights). The progression requires trust built through successful delegation at earlier levels.",
      
      "At Just Eat Takeaway, I had 8 direct reports. Initially, I made every significant decision (Level 1 across all domains). Bottleneck. I couldn't scale. So I mapped domains and distributed ownership: Operations Lead owned delivery quality (Level 4). Product Lead owned roadmap priorities (Level 3). Engineering Lead owned architecture decisions (Level 4). Customer Service Lead owned support protocols (Level 3). Each domain had ONE owner at Level 3-4. My role shifted from deciding to coaching: 'What's your thinking? What have you considered? What could go wrong?' They owned decisions; I helped them think through implications.",
      
      "The mistake most leaders make: They say they want distributed leadership but then overrule decisions they disagree with. This trains people that 'ownership' is fake—you only own decisions if the boss agrees. True distributed leadership means: (1) You give decision rights explicitly. (2) You let people make decisions you wouldn't make. (3) You let those decisions play out (unless they're catastrophic). (4) You coach the learning afterwards. If you consistently overrule, you're not distributing leadership—you're just pretending to delegate while keeping control.",
      
      "The framework for growing distributed leaders: (1) Start with small, reversible decisions (low stakes, easy to course-correct). (2) Let them make the decision and implement it. (3) Debrief afterwards: 'What did you learn? What would you do differently?' (4) Gradually increase scope and stakes as they demonstrate judgment. (5) Move from Level 1 → 2 → 3 → 4 over time. (6) Eventually, they own entire domains and you're hands-off. This progression builds confidence (theirs) and trust (yours). Rushing it creates failures. Avoiding it creates dependence.",
      
      "The accountability balance: Distributed leadership doesn't mean abdication. You're still accountable for outcomes (Extreme Ownership from earlier lesson). But you achieve those outcomes THROUGH others' ownership, not by doing everything yourself. When something goes wrong in a domain someone else owns, you ask: 'Did I give them the right training? Did I set clear expectations? Did I provide support when they asked?' If yes and they still failed, that's coaching opportunity or potentially wrong person in role. If no, that's your failure as a leader—you gave ownership without enablement.",
      
      "In Brazilian Jiu Jitsu, black belts don't just train—they teach. They develop other practitioners. A gym with one black belt who does all the instruction doesn't scale. A gym with one black belt who develops five purple belts who can teach effectively scales to hundreds of students. Distributed instructional leadership. The black belt's value isn't in personally teaching everyone—it's in developing instructors who can teach. Same in business: your value isn't in making every decision—it's in developing decision-makers who can own domains.",
      
      "The implementation: Map your decision domains (the types of decisions you make regularly). Examples: hiring, budget allocation, vendor selection, feature prioritization, customer escalations, process changes. For each domain, ask: (1) Do I need to own this or can someone else? (2) If someone else, who? (3) What level are they ready for (1-4)? (4) What support do they need to succeed? Then explicitly delegate: 'You now own domain X at Level Y. Here's what that means...' Document it. Tell the team. Follow through by NOT taking back decisions unless absolutely necessary.",
      
      "Brown Belt Integration: You've completed Ownership Culture stripe. You learned: (1) Extreme Ownership—leaders take absolute responsibility for everything. (2) Accountability Rituals—consistent practices that embed ownership into operations. (3) Cost of Non-Ownership—the massive price of diffused responsibility. (4) Distributed Leadership—scaling ownership across the organization. These create a culture where ownership is the default, not the exception. Where problems get solved by whoever sees them, not escalated up the chain. Where leadership exists at every level, not just the top.",
      
      "Next stripe: Influence Without Authority—we'll explore how to lead when you don't have formal power, building credibility and presence that creates followership regardless of title. But first, start distributing one domain. Pick something you currently own that someone else could own. Assess their readiness level (1-4). Explicitly delegate ownership at that level. Provide support. Let them make decisions you wouldn't make. Debrief and learn. This is how you scale: by developing owners, not by doing everything yourself. Your ceiling is your team's capacity for ownership. Raise their capacity, raise your ceiling."
    ],
    learningObjective: "You will learn how to scale through distributed leadership by moving from task delegation to outcome ownership using 4 levels (recommend, inform, act, own) that develop autonomous decision-makers.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe14Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your team misses a major deadline. In the post-mortem, everyone explains their constraints: Engineering was understaffed, Product changed requirements twice, Vendor delayed. According to Extreme Ownership principles, what's your response as the leader?",
    options: [
      "Acknowledge the constraints were real and outside your control",
      "'I'm accountable. I didn't ensure adequate engineering resources, I didn't lock down requirements early enough, I didn't build in vendor delay buffer. This is on me. Here's what I'll do differently.'",
      "Hold each function accountable for their part",
      "Document lessons learned and move forward"
    ],
    correctAnswer: 1,
    explanation: "Option B demonstrates Extreme Ownership. Jocko's principle: Leaders take absolute responsibility for everything in their world. Not 'their fault'—'my fault' because within your control were: resource planning, requirements management, risk buffers. The Just Eat Takeaway example: 500 orders delayed, leader said 'I pushed fast deployment without adequate testing'—team stopped defending and started problem-solving. Option A deflects. Option C distributes blame. Option D avoids ownership. The counterintuitive insight: Taking responsibility strengthens authority (people trust your honesty) while blaming others weakens it (people suspect you take credit for wins, deflect losses). Extreme ownership = extreme agency. If it's your fault, you can fix it.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You want to implement accountability rituals. You start 'Friday Wins & Learns'—30 min weekly where everyone shares one win and one learning. After 3 weeks of perfect execution, week 4 someone's on vacation so you skip it. Week 5 you're busy and forget. According to habit formation research, what happened?",
    options: [
      "Normal—just restart next week",
      "You reset the 8-12 week consistency clock required to establish the ritual as automatic behavior. You need 12 perfect weeks.",
      "Three weeks was enough to establish the habit",
      "Flexibility is good—rituals should adapt to circumstances"
    ],
    correctAnswer: 1,
    explanation: "Option B applies BJ Fogg's habit formation research: 8-12 weeks of perfect consistency are required to establish automatic behavior. Skip even once in those first 12 weeks and you reset the clock. The discipline: Protect the ritual absolutely for 12 weeks—no cancellations, no exceptions. Someone on vacation? Do it without them. You're busy? Do it anyway. After 12 perfect weeks, it becomes 'how we operate.' Option A underestimates how quickly rituals die. Option C overestimates how quickly they establish. Option D sounds reasonable but kills consistency. The Just Eat Takeaway example: implemented four rituals, protected them religiously for 12 weeks, accountability shifted from sporadic (leadership-dependent) to systematic (peer-driven). Rituals work—but only if practiced consistently.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Your project is failing. You ask: 'Who owns delivery quality?' The answer: 'Operations, Product, and Engineering all share responsibility.' According to single-threaded ownership principles, what's the problem and fix?",
    options: [
      "Good—shared responsibility creates collaboration",
      "Diffused ownership. Fix: One person owns delivery quality end-to-end with authority to pull resources. When everyone owns it, no one owns it.",
      "You need clearer roles and responsibilities documentation",
      "The three functions should form a committee to coordinate"
    ],
    correctAnswer: 1,
    explanation: "Option B diagnoses diffused accountability and applies single-threaded ownership. Harvard research: 65% of failed projects had clear individual accountability (everyone knew their role) but lacked outcome ownership (no one owned the overall result). The Just Eat Takeaway example: delivery errors spiked 40%, every function explained constraints, zero ownership. Restructured: one person owned delivery quality end-to-end, errors dropped 35% in 6 weeks. Option A confuses shared responsibility with accountability (shared responsibility = no one's responsible). Option C treats symptoms (documentation) not cause (structure). Option D adds coordination overhead. The diagnostic: 'If this fails, whose career takes the hit?' If answer is vague or multiple names, fix it: one owner, clear authority, career tied to outcome.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're distributing leadership. Your Operations Lead proposes a process change you disagree with (you think it's suboptimal but not catastrophic). You previously gave them Level 3 authority (decide and act). According to distributed leadership principles, what do you do?",
    options: [
      "Overrule it—you're still accountable for outcomes",
      "Let them implement it, coach them through implications, debrief learning afterwards. True distributed leadership means letting people make decisions you wouldn't make.",
      "Suggest they reconsider but let them decide",
      "Require they get your approval before implementing"
    ],
    correctAnswer: 1,
    explanation: "Option B demonstrates real distributed leadership. If you consistently overrule decisions you disagree with, you train people that 'ownership' is fake—they only own decisions if you agree. Harvard research: distributed leadership requires giving decision rights AND letting people make decisions you wouldn't make (unless catastrophic). The framework: Start small/reversible, let them decide, debrief learning, gradually increase stakes. Option A keeps control (fake delegation). Option C sounds good but undermines their authority. Option D reverts to Level 1 (recommend). The balance: You're still accountable for outcomes (Extreme Ownership), but you achieve through others' ownership. If it fails: Did you give right training, set clear expectations, provide support? If yes, coaching opportunity. If no, your failure as leader. Distributed leadership scales; centralized leadership bottlenecks.",
    xpReward: 10
  }
];

export const stripe14Content = {
  lessons: stripe14Lessons,
  checkpoints: stripe14Checkpoints
};

