/**
 * BLACK BELT - STRIPE 19: ORGANIZATIONAL TRANSFORMATION
 * Theme: Culture, continuous improvement, scaling, leadership development
 * Focus: Culture as operating system, kaizen mindset, scaling without breaking, leadership pipeline
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

export const stripe19Lessons: Lesson[] = [
  {
    id: 1,
    title: "Culture as Operating System",
    content: [
      "Most leaders treat culture as soft stuff—values posters, team retreats, pizza Fridays. That's decoration, not culture. Real culture is your operating system: the invisible set of rules that determines how decisions get made, how information flows, how conflicts resolve, how people get promoted. Culture runs your organization the way iOS runs your iPhone. Bad culture = buggy OS (everything's slow, features don't work, constant crashes). Good culture = optimized OS (everything runs smoothly, features work intuitively, scales effortlessly). Black Belt leaders design culture intentionally, not accidentally.",
      
      "Research from Edgar Schein (MIT professor who defined organizational culture) describes culture at three levels: (1) Artifacts (what you see—office layout, dress code, rituals), (2) Espoused values (what you say—mission statements, values posters), (3) Basic assumptions (what actually drives behavior—the unspoken rules everyone follows). Most leaders work on level 1-2 (artifacts and statements) without touching level 3 (actual assumptions). Result: Culture doesn't change. Real culture work happens at level 3: identifying and shifting the unconscious assumptions that drive behavior.",
      
      "The diagnostic: What are your organization's actual assumptions (not stated values)? Ask: (1) What behaviors get promoted regardless of stated values? (If people working 80-hour weeks get promoted, actual assumption = hours worked matter more than results). (2) What topics are undiscussable? (If no one mentions the CEO's bad decisions, actual assumption = don't challenge authority). (3) What do new employees learn quickly? (If they learn 'don't raise problems in meetings,' actual assumption = harmony over honesty). These unconscious assumptions ARE your culture. Everything else is marketing.",
      
      "At Just Eat Takeaway, we said we valued 'work-life balance' (espoused value) but promoted people who responded to Slack at midnight (revealed assumption = always-on is success). We said 'customer obsession' but rewarded fastest feature shipping regardless of customer impact (revealed assumption = speed over quality). Until we acknowledged the gap between what we said and what we rewarded, culture didn't change. The shift: We changed promotion criteria (now explicitly assessed sustainable performance and customer impact, not just speed/hours). We changed recognition (celebrated people who delivered results with balance). Within 6 months, behavior shifted because the actual assumptions shifted.",
      
      "The culture design framework: (1) Define desired behaviors (not values—behaviors: 'We make decisions based on data and debate, not hierarchy and politics'). (2) Identify current assumptions that prevent those behaviors ('challenging senior leaders is career-limiting'). (3) Design systems that reward desired behaviors and punish old assumptions (make challenging senior leaders in constructive ways a promotion criterion). (4) Model the new behaviors obsessively (leaders demonstrate them first, always, no exceptions). (5) Measure and reinforce (track behavior indicators, celebrate when you see new culture, address violations immediately). Culture changes when systems change, not when posters change.",
      
      "The mistake most leaders make: They announce new culture ('We're now customer-obsessed!') without changing systems. Promotion criteria stay same. Recognition stays same. Consequences stay same. Result: People hear the announcement, see nothing changed structurally, conclude it's performative. Culture is what the system rewards, not what the leader says. If you want accountability culture, promote people who demonstrate accountability (even if they're not the highest performers). If you want innovation culture, celebrate smart failures (not just successes). If you want collaboration culture, tie compensation to team outcomes (not just individual metrics). Change the system, culture follows.",
      
      "In Brazilian Jiu Jitsu, gym culture is the operating system. Good gym culture: Everyone taps when caught (safety), higher belts control intensity with lower belts (learning environment), questions are encouraged (growth mindset), egos are checked at door (respect). This culture is maintained through: (1) Explicit teaching to new members, (2) Modeling by instructors, (3) Immediate correction of violations ('You didn't tap, that's how injuries happen'). Within weeks, new members absorb the culture because it's consistently demonstrated and enforced. Business culture works the same: explicit teaching + leadership modeling + immediate correction of violations = culture becomes operating system.",
      
      "The time horizon: Culture change takes 18-24 months minimum. First 6 months: Skepticism ('Leadership says this, but will they actually change anything?'). Months 7-12: Tentative belief ('They're actually promoting people who demonstrate new behaviors'). Months 13-18: Adoption ('This is actually how we work now'). Months 19-24: Institutionalization ('This is just who we are'). Most leaders give up at month 6 when they don't see immediate change. The discipline: Commit to 24 months of consistent system changes, leadership modeling, and reinforcement. Culture is the longest-leverage work you can do (affects everything) but it's also the slowest (requires sustained commitment). If you want fast results, culture work isn't it. If you want sustained transformation, nothing else matters more.",
      
      "Next lesson: The Kaizen Mindset—how to embed continuous improvement into organizational DNA so everyone is constantly finding ways to work better, not waiting for leadership to drive change. But first, diagnose your actual culture. What behaviors get promoted? What topics are undiscussable? What do new employees learn fast? These reveal your actual assumptions. Then ask: Do these assumptions create the culture we need for our strategy? If no, start the 24-month culture work: Define desired behaviors, identify blocking assumptions, design systems to reward new behaviors, model obsessively, reinforce consistently. Culture is your operating system. Design it intentionally."
    ],
    learningObjective: "You will learn Schein's three culture levels (artifacts, espoused values, basic assumptions) and why real culture change requires 18-24 months of system changes that reward desired behaviors, not just value statements.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Kaizen Mindset: Continuous Improvement",
    content: [
      "Toyota factories have a system: Any worker can pull a cord that stops the entire production line when they see a quality problem. Stopping production costs thousands per minute. Yet Toyota encourages it. Why? Because catching defects immediately (kaizen—continuous improvement) costs less than shipping defective cars. This mindset—everyone is empowered and expected to improve the system constantly—is kaizen. It's not a program. It's a philosophy that improvement is everyone's job, always. Black Belt organizations embed kaizen into DNA so improvement happens automatically, not when leadership demands it.",
      
      "Research from Jeffrey Liker (The Toyota Way) studying Toyota's 60-year dominance found that kaizen culture creates: (1) 50% fewer defects than traditional manufacturing, (2) 30% faster time-to-market for new products, (3) 40% lower costs through continuous efficiency gains, (4) Higher employee engagement (people feel ownership over improvement, not just task execution). The competitive advantage isn't any single improvement—it's the system that generates thousands of small improvements continuously. Competitors can copy one improvement. They can't copy a culture that improves faster than anyone else.",
      
      "The kaizen principles: (1) Improvement is everyone's responsibility (not just leadership or special 'innovation' teams—every person, every day). (2) Small improvements compound (you don't need breakthrough innovations—1% better every week = 68% better in a year through compounding). (3) Problems are learning opportunities (when something breaks, you celebrate discovering the weak point—now you can strengthen it). (4) Go to gemba (the place where work happens—leaders don't improve from conference rooms, they improve by observing actual work). (5) Make problems visible (if everyone hides problems, you can't improve—psychological safety enables kaizen).",
      
      "At Just Eat Takeaway, we struggled with delivery delays. Traditional approach: Leadership analyzes data, designs solution, mandates change. Kaizen approach: We sent leaders to gemba (ride with delivery partners for full shifts), asked delivery partners 'What slows you down?' and 'What would make this easier?', collected 200+ small improvement ideas (better navigation app features, clearer restaurant pickup instructions, payment streamlining), let delivery partners vote on priorities, implemented top 20 ideas. Result: Delivery times improved 18%, but more importantly—delivery partners felt ownership. They continued suggesting improvements because they saw their ideas implemented. We didn't solve the problem once. We created a system where delivery partners continuously improve it.",
      
      "The implementation: (1) Create improvement rituals (weekly 15-minute team huddle: 'What went well? What should improve? What will we try this week?'). (2) Make improvement metrics visible (track not just business results but # of improvements attempted—celebrate experimentation). (3) Remove barriers to experimentation (give people permission to try small changes without approval—within defined boundaries). (4) Celebrate smart failures (when experiment doesn't work, celebrate the learning—'Now we know that doesn't work'). (5) Scale what works (when improvement succeeds, share it across teams—'Team X tried Y and got Z result'). This system makes improvement routine, not heroic.",
      
      "The mistake most leaders make: They launch kaizen as a program ('This quarter we're focusing on continuous improvement!'), run it for 3 months with special workshops and forms, then wonder why improvement stops when the program ends. Kaizen isn't a program—it's a mindset embedded in daily operations. You don't need workshops. You need: Weekly team huddles where improvement is discussed. Permission for people to experiment with their work processes. Recognition when people improve things. Consequences when people just follow broken processes without questioning. Make improvement expected, not exceptional. That's how it becomes culture.",
      
      "In Brazilian Jiu Jitsu, kaizen is built in. After every roll, you reflect: 'What worked? What didn't? What will I try next time?' After every class, instructors adjust curriculum based on what students struggled with. After every competition, practitioners analyze video to find improvement opportunities. No one waits for permission to improve their game—improvement is the point. A practitioner who executes the same techniques without improvement stays at their belt level forever. A practitioner who continuously improves progresses through belts. Business should work the same: Those who improve continuously advance. Those who just execute static processes stagnate.",
      
      "The scaling challenge: Kaizen works in small teams naturally. How do you embed it across 500 or 5,000 people? Through systems: (1) Make improvement a job expectation (performance reviews explicitly assess 'What improvements did you drive this year?'). (2) Create improvement sharing mechanisms (monthly all-hands where teams present improvements—creates learning and recognition). (3) Protect time for improvement (Google's 20% time, Toyota's quality circles—people need space to improve, not just execute). (4) Measure improvement rate (track # of experiments run, # of improvements implemented, cycle time from idea to implementation). What gets measured gets done. If you only measure business results, people optimize results. If you measure improvement rate, people improve systems that generate results.",
      
      "Next lesson: Scaling Without Breaking—how to grow the organization rapidly while maintaining culture, quality, and performance. But first, start kaizen practice. This week: 15-minute team huddle ('What went well? What should improve? What will we try?'). Pick one small experiment. Run it for one week. Review results. Repeat. Don't wait for permission or perfect process. Just start improving. After 12 weeks of weekly improvement cycles, you'll have embedded kaizen. Your team will improve faster than teams that wait for leadership-driven change initiatives. That's the competitive advantage: not one big breakthrough, but thousands of small improvements compounding continuously."
    ],
    learningObjective: "You will learn five kaizen principles (everyone's responsibility, small improvements compound, problems = learning, go to gemba, make problems visible) that create 50% fewer defects and 30% faster innovation through continuous improvement culture.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Scaling Without Breaking",
    content: [
      "Your startup grows from 20 people to 200. What worked at 20 breaks at 200. The founder who knew everyone's name now can't remember half the company. Decisions that were made in hallway conversations now require three meetings. Culture that was maintained through osmosis now dilutes with every hire. This is the scaling challenge: How do you grow rapidly without losing what made you successful? Most companies break during hyper-growth—not because they don't grow, but because they grow wrong. Black Belt leaders scale systems, not just headcount.",
      
      "Research from the Startup Genome Project studying 3,200 companies found that 74% of high-growth startups fail not from lack of product-market fit (they already had it) but from premature scaling—adding resources (people, infrastructure) faster than the organization can absorb them. The failure pattern: Hire aggressively to capture market opportunity. New people don't understand culture/strategy. Quality degrades. Customer experience suffers. Revenue growth stalls. Company implodes despite being 5x bigger than before. Scaling requires different leadership than starting: You're building systems that work without you, not doing everything yourself.",
      
      "The scaling principles: (1) Systems before people (hire for systems you've designed, not random headcount). (2) Culture carriers (promote people who embody culture before they have 'earned' it by metrics—they'll propagate culture as you scale). (3) Decision authorities (distribute decision rights explicitly as you grow—you can't be in every meeting). (4) Forcing functions (create rituals/structures that maintain quality as volume increases). (5) Ruthless subtraction (kill products/processes/meetings that don't scale—addition is default, subtraction requires discipline). These five principles let you add people without adding chaos.",
      
      "At Just Eat Takeaway, we scaled from 500 to 2,000 employees in 18 months (acquisition integration). Traditional approach: Hire as fast as possible to manage workload. We tried that initially—disaster. New people didn't understand strategy, made decisions misaligned with values, quality declined, key people left frustrated. We shifted to scaling principles: (1) Built systems first: Documented decision-making frameworks, created onboarding curricula, standardized key processes. (2) Identified culture carriers: Promoted 10 people who embodied our values into leadership roles—they became culture propagators. (3) Distributed decisions: Made explicit 'Level 1-4 decision authorities' so people knew what they could decide without escalation. (4) Created forcing functions: Monthly all-hands, weekly team standups, quarterly strategy reviews—rituals that maintained alignment at scale. (5) Killed projects ruthlessly: Went from 40 initiatives to 8 (focused only on strategic priorities). After these changes: Scaled to 2,000 without breaking. Culture maintained. Quality improved. Key people stayed.",
      
      "The mistake most leaders make: They optimize for growth speed ('We need 100 new hires this quarter') without building absorption capacity (systems, culture propagation, decision distribution). Result: You hire 100 people who don't know what to do, create coordination overhead (endless meetings), degrade culture (new people learn old culture wasn't real), and often produce LESS output with more people because of organizational drag. Better: Hire slower, build systems first, ensure each wave of new people absorbs culture before adding next wave. Sustainable scaling beats rapid-then-collapse.",
      
      "The test: 'If I left for 3 months, would this organization run effectively?' At 20 people: Probably not (you're central to everything). At 200 people: If you've scaled well, yes (systems/leaders/culture maintain operations). At 2,000 people: If you haven't scaled well, no (everyone's waiting for your decisions). The goal of scaling leadership: Make yourself progressively less necessary to daily operations. You're not abdicating—you're building systems and leaders that embody your strategy so you can work ON the business (strategy, culture, future) not IN the business (operations, execution, firefighting). That's the scaling transition most leaders fail: They keep operating as if they're in a 20-person startup when they're in a 2,000-person organization.",
      
      "In Brazilian Jiu Jitsu, gyms scale through instructor development. One black belt instructor can teach 30 students personally. But to scale to 300 students, you need: (1) Systems (curriculum that can be taught by multiple instructors consistently), (2) Culture carriers (identify purple/brown belts who embody the gym culture and promote them to teaching roles), (3) Distributed authority (assistant instructors can run beginner classes without black belt present), (4) Forcing functions (regular seminars where all instructors align on technique details), (5) Quality standards (belt promotions maintain standards regardless of which instructor tests you). Same principles as business scaling: systems, culture carriers, distributed authority, alignment rituals, quality standards.",
      
      "The leadership pipeline: As you scale, your job shifts from 'doer' to 'leader of doers' to 'leader of leaders' to 'leader of leader of leaders.' Each level requires different skills: Doer = technical execution. Leader of doers = coaching and direction. Leader of leaders = strategy and systems. Leader of leader of leaders = vision and culture. Most leaders fail to make these transitions—they keep doing the job they're good at instead of the job the organization needs. The discipline: Every time you add organizational layer, consciously shift what you work on. Let go of previous level's work. Trust people below you to do that work. Focus on what only you can do at your current level.",
      
      "Next lesson: Building Leadership Pipeline—how to systematically develop leaders at every level so you're never the bottleneck and the organization has succession depth. But first, assess your scaling health. Can the organization run effectively without you for 3 months? Do you have systems documented? Have you identified culture carriers? Have you distributed decision authorities? Do you have forcing functions maintaining alignment? Are you killing low-value work ruthlessly? If no to any, start building scaling systems now—before you hit the breaking point. Scale systems before you scale headcount. That's how you grow without breaking."
    ],
    learningObjective: "You will learn five scaling principles (systems before people, culture carriers, decision authorities, forcing functions, ruthless subtraction) that prevent the 74% failure rate from premature scaling.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Building Leadership Pipeline",
    content: [
      "Your organization has one amazing leader (you) and 200 people waiting for direction. That's not a leadership organization—that's a bottleneck with employees. Real organizational capability comes from leadership depth: leaders at every level who can think strategically, develop people, drive results, and propagate culture. This is the leadership pipeline: a systematic approach to developing leaders continuously so you're never dependent on one person (including yourself). Black Belt leaders build pipelines, not dependencies.",
      
      "Research from Ram Charan (The Leadership Pipeline) studying Fortune 500 succession found that companies with strong leadership pipelines (systematic development at every level) have: (1) 2.3x higher revenue growth (more leaders = more parallel execution), (2) 40% higher profit margins (distributed decision-making creates efficiency), (3) 60% lower leadership turnover (people see clear growth path), (4) 3.5x better succession planning (always have ready replacements). The competitive advantage: You can pursue multiple opportunities simultaneously because you have leadership capacity. Companies without pipelines are limited by their one great leader's capacity.",
      
      "The pipeline framework: Six leadership transitions, each requiring different skills: (1) Individual Contributor → First-Time Leader (from doing to leading doers—coaching, delegation, performance management). (2) First-Time Leader → Leader of Leaders (from executing to strategy—developing other leaders, resource allocation). (3) Leader of Leaders → Functional Leader (from one team to function—cross-team coordination, functional strategy). (4) Functional Leader → Business Leader (from function to P&L—understanding all functions, business trade-offs). (5) Business Leader → Group Leader (from one business to portfolio—capital allocation, portfolio strategy). (6) Group Leader → Enterprise Leader (from operations to vision—culture, succession, long-term direction). Each transition requires letting go of previous level's work and learning new level's skills.",
      
      "The development system: (1) Identify high-potential individuals (not just high-performers—people with capacity for next level). (2) Assess readiness (which transition are they approaching? what skills do they need?). (3) Provide developmental assignments (stretch projects that build next-level skills with support). (4) Offer coaching and feedback (regular conversations about leadership development, not just task performance). (5) Evaluate progress (are they demonstrating next-level capabilities?). (6) Promote when ready (not when position opens—develop people ahead of need so you have ready bench). This system creates continuous leadership development, not reactive 'we need someone now' promotions.",
      
      "At Just Eat Takeaway, we had no pipeline—leadership was bottleneck. When we grew fast, we made terrible promotion decisions (promoted top performers who weren't ready for leadership, failed, demoted them—damaged careers and team morale). We rebuilt with pipeline system: (1) Identified 30 high-potentials across organization. (2) Assessed which transition each was approaching. (3) Gave them developmental assignments (IC → First-Time Leader got project lead roles; First-Time Leader → Leader of Leaders got cross-team initiatives). (4) Provided coaching (monthly 1-on-1s focused on leadership development). (5) Promoted when they demonstrated capabilities (not when we were desperate for bodies). After 18 months: Had bench of 15 ready-now leaders at various levels. Could pursue new initiatives without being bottlenecked. Key people stayed because they saw growth path. Leadership pipeline became strategic advantage.",
      
      "The mistake most leaders make: They develop people reactively ('We need a director, who's available?') rather than proactively ('Who should we develop now for director role in 18 months?'). This creates: (1) Bad promotions (people promoted before ready), (2) Development gaps (no one coaching for next level), (3) Retention problems (high-potentials leave because they see no growth), (4) Strategic constraints (can't pursue opportunities because no leadership capacity). Better: Develop people 18-24 months ahead of need. By the time you need director, you have 3 people ready. That's strategic leadership pipeline: anticipating future needs and developing talent now.",
      
      "The 70-20-10 development model: People develop through: 70% challenging assignments (stretch projects that build new skills), 20% coaching and feedback (regular development conversations with manager/mentor), 10% formal training (courses, books, workshops). Most companies invert this (90% training, 10% real work)—doesn't work because leadership is learned through doing, not reading. The discipline: Give high-potentials stretch assignments with coaching support. Let them lead projects slightly above current capability (with safety net). Provide feedback. Watch them grow. That's how leadership capability develops: through doing with support, not through classroom alone.",
      
      "In Brazilian Jiu Jitsu, the leadership pipeline is belt system. White → Blue (learn basic techniques). Blue → Purple (develop game strategy). Purple → Brown (teach others, refine understanding). Brown → Black (mastery, independent thinking, instructional capability). Each belt represents leadership transition. Black belts weren't born knowing everything—they progressed through systematic development over years. Each belt had specific skill requirements. Promotions came when capabilities demonstrated, not when time elapsed. Business leadership pipelines should work same: clear transitions, specific skill requirements, promotion when ready, systematic development over time.",
      
      "Black Belt Integration: You've completed Organizational Transformation stripe. You learned: (1) Culture as Operating System (Schein's three levels, 18-24 month transformation through system changes). (2) Kaizen Mindset (five principles creating 50% fewer defects through continuous improvement culture). (3) Scaling Without Breaking (five principles preventing 74% premature scaling failure). (4) Leadership Pipeline (six transitions, systematic development creating 2.3x revenue growth). You now have organizational mastery: You can transform culture, embed continuous improvement, scale sustainably, and develop leadership depth. This is Black Belt organizational capability: not just leading well yourself, but building organizations that lead themselves.",
      
      "Next stripe: Legacy & Mastery—the final stripe. We'll explore your leadership legacy, the Black Belt mindset, teaching others, and continuous improvement forever. This is the culmination: integrating everything you've learned into your leadership philosophy and preparing to give back. You're ready."
    ],
    learningObjective: "You will learn Charan's six leadership transitions (IC to first-time leader through enterprise leader) and systematic development that creates 2.3x revenue growth and 60% lower leadership turnover through strong pipelines.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe19Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You announce 'We're now customer-obsessed!' but promotion criteria, recognition, and compensation don't change—still rewarding speed and individual performance. Six months later, behavior hasn't changed. According to culture-as-operating-system principles, what happened?",
    options: [
      "People don't care about culture",
      "You need more communication about the new culture",
      "Culture is what the system rewards, not what leadership says. You announced new culture without changing systems (promotion, recognition, compensation). Change systems that reward desired behaviors, culture follows.",
      "Six months isn't enough time for culture change"
    ],
    correctAnswer: 2,
    explanation: "Option C diagnoses system-culture misalignment. Edgar Schein: culture exists at three levels—artifacts, espoused values, basic assumptions. Most leaders work on levels 1-2 without touching level 3 (actual assumptions). Real culture = what system rewards. The Just Eat Takeaway example: said 'work-life balance' but promoted people working 80-hour weeks (revealed assumption: hours > results). Said 'customer obsession' but rewarded fastest shipping (revealed assumption: speed > quality). Until promotion criteria changed to assess sustainable performance and customer impact, behavior didn't shift. Option A blames people. Option B adds communication noise. Option D is partially true but misses root cause. Culture design framework: define desired behaviors, identify blocking assumptions, design systems that reward new behaviors, model obsessively, reinforce consistently. Culture changes when systems change (promotion/recognition/consequences), not when posters change. 18-24 month commitment required.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You want continuous improvement culture. You launch 'Kaizen Quarter' with workshops and forms for 3 months. After quarter ends, improvement stops. According to kaizen principles, what went wrong?",
    options: [
      "People aren't motivated to improve",
      "You need bigger improvements, not small ones",
      "You treated kaizen as program (3-month initiative) not mindset (daily practice). Fix: Weekly team huddle discussing improvements, permission to experiment, recognition when people improve, make improvement expected not exceptional. Embed in operations.",
      "Kaizen doesn't work in your industry"
    ],
    correctAnswer: 2,
    explanation: "Option C diagnoses program vs. mindset error. Kaizen isn't a program—it's philosophy embedded in operations. Liker's Toyota research: kaizen creates 50% fewer defects, 30% faster time-to-market, 40% lower costs through continuous improvement culture, not one-time initiatives. Five principles: (1) Everyone's responsibility, (2) Small improvements compound (1% better weekly = 68% better yearly), (3) Problems = learning, (4) Go to gemba, (5) Make problems visible. The Just Eat Takeaway example: sent leaders to gemba (ride with delivery partners), collected 200+ improvement ideas, implemented top 20, delivery times improved 18%—but more importantly, partners felt ownership and continued suggesting improvements. Option A blames people. Option B misunderstands compounding. Option D deflects. Implementation: weekly improvement rituals, visible metrics (# experiments attempted), remove experiment barriers, celebrate smart failures, scale what works. Make improvement routine, not heroic. After 12 weeks weekly cycles, kaizen embeds.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You're scaling from 50 to 500 employees. You hire aggressively to capture market opportunity. Quality degrades, culture dilutes, key people leave. According to scaling principles, what happened?",
    options: [
      "You hired the wrong people",
      "Premature scaling: added resources (people) faster than organization could absorb. Fix: Systems before people, culture carriers promoted, decision authorities distributed, forcing functions created, ruthless subtraction of non-scalable work.",
      "Scaling is always messy—this is normal",
      "You need better HR processes"
    ],
    correctAnswer: 1,
    explanation: "Option B diagnoses classic premature scaling failure. Startup Genome: 74% of high-growth startups fail from premature scaling (adding resources faster than absorption capacity), not product-market fit lack. Five scaling principles: (1) Systems before people (design systems first, then hire into them), (2) Culture carriers (promote culture embodiers to propagate values), (3) Decision authorities (distribute decision rights—you can't be in every meeting), (4) Forcing functions (rituals maintaining alignment at scale), (5) Ruthless subtraction (kill non-scalable processes). Just Eat Takeaway example: scaled 500→2,000 in 18 months—initially disaster (new people didn't understand strategy, quality declined)—rebuilt with: documented frameworks, promoted 10 culture carriers, made explicit decision authorities, created rituals (monthly all-hands, weekly standups, quarterly reviews), killed 40→8 initiatives—scaled without breaking. Option A oversimplifies. Option C accepts dysfunction. Option D treats symptom. The test: 'If I left 3 months, would org run effectively?' Scale systems, not just headcount.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You need a director-level leader. You look at current managers, pick the best performer, promote them immediately. They struggle in role, team morale drops. According to leadership pipeline principles, what went wrong?",
    options: [
      "You promoted the wrong person",
      "Reactive development: promoted when you needed someone (desperation) vs. proactive development (develop 18-24 months ahead). Fix: Identify high-potentials, assess readiness, provide developmental assignments, coaching, evaluate progress, promote when ready—not when position opens.",
      "They need more training",
      "Director role is too hard for internal candidates"
    ],
    correctAnswer: 1,
    explanation: "Option B diagnoses reactive vs. proactive development failure. Charan's Leadership Pipeline: six transitions (IC → First-Time Leader → Leader of Leaders → Functional → Business → Group → Enterprise), each requiring different skills. Companies with strong pipelines: 2.3x revenue growth, 40% higher profit margins, 60% lower turnover, 3.5x better succession. The Just Eat Takeaway example: no pipeline, promoted top performers not ready for leadership—failed, demoted, damaged careers/morale. Rebuilt with: identified 30 high-potentials, assessed which transition each approached, gave developmental assignments (stretch projects building next-level skills), coaching monthly, promoted when capabilities demonstrated—after 18 months had 15 ready-now leaders, could pursue initiatives without bottleneck. Option A oversimplifies. Option C treats symptom. Option D is defeatist. Development system: identify high-potentials (not just performers), assess readiness, developmental assignments (70% learning), coaching (20%), training (10%), promote when ready. Develop 18-24 months ahead of need.",
    xpReward: 10
  }
];

export const stripe19Content = {
  lessons: stripe19Lessons,
  checkpoints: stripe19Checkpoints
};

