/**
 * BROWN BELT - STRIPE 13: ACCOUNTABILITY FOUNDATIONS
 * Theme: Understanding peer accountability vs. boss accountability
 * Focus: Why teams avoid accountability, the accountability gap, dysfunction signs
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

export const stripe13Lessons: Lesson[] = [
  {
    id: 1,
    title: "The Take-the-Back Principle",
    content: [
      "In Brazilian Jiu Jitsu, 'taking the back' is the most dominant position. Your opponent can't see you, can't defend effectively, and you have multiple submission options. But here's what's interesting: you can't take the back by force against someone skilled. You take the back when your opponent makes a mistake and you capitalize instantly. Accountability works the same way—you can't force it. You create conditions where it emerges naturally.",
      
      "The 'Take-the-Back Principle' in business: Accountability isn't imposed from above (boss accountability). It's created laterally (peer accountability). When team members hold EACH OTHER accountable—without waiting for the boss to intervene—that's high-performance culture. When team members wait for the boss to address problems, that's boss-dependent culture. One scales. The other doesn't.",
      
      "Research from Patrick Lencioni shows that on high-performing teams, members confront peers about performance and behavioral issues directly rather than escalating to leadership. On dysfunctional teams, members complain to the leader about each other but won't address issues directly. Why? Because peer accountability requires vulnerability-based trust (White Belt) and conflict comfort (Blue Belt). Without those foundations, people default to boss accountability—which creates bottlenecks and resentment.",
      
      "At Just Eat Takeaway, I had a team where every conflict escalated to me. 'Marco, Sarah's missing deadlines.' 'Marco, Tom's not sharing information.' I was constantly mediating. I finally said: 'If you haven't had a direct conversation with that person first, don't bring it to me.' Initially, people resisted: 'But that's uncomfortable!' Yes. And growth requires discomfort. After 4 weeks of forcing peer conversations, the team transformed. They started addressing issues early, directly, and effectively. My mediation time dropped 80%. Performance improved because problems were solved in real-time, not escalated and delayed.",
      
      "The distinction: Boss accountability is centralized and bottlenecked (everything flows through one person). Peer accountability is distributed and scalable (issues get addressed by whoever sees them). Boss accountability trains dependence ('I'll wait for the boss to fix this'). Peer accountability trains ownership ('I'll address this directly'). Boss accountability preserves harmony in the moment (no direct confrontation) but creates long-term dysfunction (unaddressed problems compound). Peer accountability creates short-term discomfort (direct conversations are hard) but long-term health (problems don't fester).",
      
      "The three prerequisites for peer accountability (notice these are the previous belts): (1) Trust (White Belt)—people believe peers aren't attacking them but trying to help. (2) Conflict skills (Blue Belt)—people can engage in productive disagreement. (3) Clarity (Purple Belt)—everyone knows what they're accountable FOR (expectations are clear). Without these, attempts at peer accountability feel like personal attacks. With these, accountability becomes collaborative problem-solving.",
      
      "The leader's role shifts: From being the accountability enforcer ('I'll hold everyone accountable') to being the accountability architect ('I'll create conditions where accountability emerges'). This means: (1) Modeling vulnerability (showing it's safe to admit mistakes). (2) Rewarding peer accountability (praising people who address issues directly). (3) Refusing to mediate without prior peer conversation (forcing direct engagement). (4) Making expectations crystal clear (so there's no ambiguity about what people are accountable FOR).",
      
      "Why leaders resist this shift: It feels like losing control. If team members hold each other accountable, what's the leader's job? Answer: Strategic direction, context-setting, resource allocation, coaching, removing obstacles. All higher-leverage than refereeing peer conflicts. But many leaders are addicted to being needed. Peer accountability means you're not needed for daily coordination—which is exactly the goal. Your value isn't in mediating—it's in setting direction and developing capability.",
      
      "The practice: Next time someone escalates a peer issue to you, ask: 'Have you talked directly with them about this?' If no: 'Go have that conversation. If it doesn't resolve, come back and we'll discuss together.' If yes: 'What did they say? What's your proposed solution?' This forces peer-to-peer resolution FIRST. Initially, people will resist. They want you to solve it. Don't. Hold the boundary. After 3-4 forced peer conversations, the pattern shifts. People start addressing issues directly because they know you'll send them back anyway.",
      
      "In BJJ, instructors don't solve every problem for students. When you're stuck, they ask: 'What have you tried? What position are you in? What's your next move?' They coach you to solve the problem, not solve it for you. This develops independent problem-solvers, not dependent students. Leadership is the same. Every time you solve a peer conflict for your team, you train dependence. Every time you coach them to solve it themselves, you train accountability.",
      
      "Next lesson: Why Teams Avoid Holding Each Other Accountable—we'll explore the psychological and cultural barriers that make peer accountability feel impossible. But first, implement the redirect policy. Next escalation you receive: 'Have you talked to them first?' Don't solve it for them. Coach them to solve it peer-to-peer. The discomfort you feel ('but I could fix this in 5 minutes!') is you learning to scale your impact through others instead of doing everything yourself."
    ],
    learningObjective: "You will learn why peer accountability scales while boss accountability creates bottlenecks and how to shift from enforcement to architecture by forcing peer-to-peer resolution first.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Why Teams Avoid Holding Each Other Accountable",
    content: [
      "You see your teammate missing deadlines repeatedly. It's affecting the whole team. You don't say anything. Why? Not because you're conflict-averse (you've learned Blue Belt skills). Not because you don't care (you're invested in team success). You don't say anything because: (1) 'It's not my job—that's the manager's role,' (2) 'I don't want to damage our relationship,' (3) 'What if they get defensive and it makes things worse?' These rationalizations protect you from discomfort while allowing team performance to degrade. This is the accountability avoidance pattern.",
      
      "Research from Patrick Lencioni studying dysfunctional teams found five barriers to peer accountability: (1) Role confusion ('I'm not their boss'). (2) Relationship preservation ('I don't want tension'). (3) Fear of hypocrisy ('I'm not perfect either'). (4) Lack of clarity ('Maybe they don't know they're missing deadlines?'). (5) Absence of trust ('What if this is used against me?'). Each barrier is addressable, but most teams never address them explicitly—so the barriers persist and accountability dies.",
      
      "Barrier 1: Role confusion. People think accountability = authority. 'I can't hold them accountable because I'm not their manager.' Wrong framing. Peer accountability isn't about positional authority ('I can fire you'). It's about mutual commitment ('We both committed to this team's success, and your actions are affecting that'). When you joined this team, you committed to its goals. When someone's behavior undermines those goals, you're not overstepping by addressing it—you're fulfilling your commitment. The question isn't 'Do I have authority?' It's 'Do I care about this team's success?'",
      
      "Barrier 2: Relationship preservation. People fear that addressing issues will damage relationships. Sometimes true—IF you lack trust (White Belt) or conflict skills (Blue Belt). But research from Kim Scott ('Radical Candor') shows the opposite: relationships strengthen when you care enough to address problems directly. What damages relationships is passive-aggressive behavior (complaining to others but not to the person), silent resentment (letting frustration build), and triangulation (involving the boss instead of talking directly). Direct, respectful accountability builds trust. Avoidance erodes it.",
      
      "Barrier 3: Fear of hypocrisy. 'I can't call them out for missing deadlines—I missed one last month.' This confuses accountability with perfection. You don't need to be perfect to address an issue. You need to care about team performance. The frame isn't 'I'm better than you.' The frame is 'We both care about this team winning. I've missed deadlines too. Right now, your missed deadlines are affecting our ability to deliver. What's going on and how can we fix it?' This is peer-to-peer problem-solving, not superior-to-inferior judgment.",
      
      "Barrier 4: Lack of clarity. Sometimes people avoid accountability because expectations are vague. 'Maybe they don't know the deadline was firm?' This is a Purple Belt failure—if commitments aren't clear, you can't hold people accountable to them. Solution: Ensure crystal-clear commitments upfront (using Clarity Canvas from Purple Belt). Once commitments are documented and agreed, there's no ambiguity. 'On Monday, you committed to delivering X by Friday. It's Friday and X isn't done. Help me understand what happened.' No guessing, no assumptions—just clear reference to agreed commitment.",
      
      "Barrier 5: Absence of trust. If you don't believe the person receiving accountability is safe (they might retaliate, get defensive, turn it personal), you won't engage. This traces back to White Belt—do we have vulnerability-based trust? If not, peer accountability will fail because the foundation isn't there. You can't address Barrier 5 at Brown Belt. You fix it by returning to White Belt and building trust. This is why sequence matters. Shortcuts fail.",
      
      "At Just Eat Takeaway, we had a peer who was consistently late to meetings. No one addressed it for 2 months because of these barriers: 'Not my job' (role confusion), 'I don't want to be the bad guy' (relationship preservation), 'I'm sometimes late too' (hypocrisy fear). Finally, in a retrospective, I asked: 'What's something we're all noticing but not addressing?' Someone named it. The late person responded: 'I didn't realize it was affecting people. Why didn't anyone say something sooner?' The whole team learned: avoidance doesn't protect relationships—it prevents solving problems.",
      
      "The practice: Explicit team agreement. Have your team discuss: 'How do we want to handle accountability?' Get consensus on: (1) We're all accountable to each other (not just to the manager). (2) If someone's behavior affects team success, we address it directly first (not escalate immediately). (3) We assume positive intent (you're trying to help, not attack). (4) We commit to hearing accountability without defensiveness. (5) If peer-to-peer doesn't resolve it, we'll escalate together. This removes ambiguity and creates shared norms.",
      
      "The leader's role: Model receiving accountability well. If your team never sees you receive feedback gracefully, they'll assume defensiveness is the norm. Next time someone on your team challenges your decision or points out your mistake, respond: 'You're right—I missed that. Thanks for catching it. Here's how I'll adjust.' That three-sentence response teaches your team: accountability is safe here, we value truth over ego, mistakes are learning opportunities not career threats. One well-received accountability moment is worth ten lectures on 'we have a culture of feedback.'",
      
      "In BJJ, training partners constantly correct each other. 'Your elbow was too high, that's why the choke failed.' 'You telegraphed that sweep.' This correction isn't personal—it's collaborative improvement. But it only works because there's shared commitment (we both want to get better) and trust (you're helping, not attacking). Teams need the same: shared commitment to winning + trust that accountability is help not attack. With those two, peer accountability flows naturally. Without them, all the frameworks in the world won't work.",
      
      "Next lesson: The Accountability Gap—what happens when teams have clear expectations but don't follow through, and how to diagnose and close the gap. But first, have the explicit team agreement conversation. Don't assume everyone's on the same page about accountability. Make it discussable. Five questions: (1) Are we all accountable to each other or just to the manager? (2) Do we address issues peer-to-peer first or escalate immediately? (3) How do we want to give and receive accountability? (4) What does good accountability look like? (5) What does bad accountability look like? Document the answers. You've now created psychological safety for peer accountability."
    ],
    learningObjective: "You will learn the five barriers that prevent peer accountability (role confusion, relationship fears, hypocrisy concerns, clarity gaps, trust absence) and how to address each explicitly.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "The Accountability Gap",
    content: [
      "Your team has clear goals. Everyone knows what they're supposed to deliver. Deadlines are documented. And yet... 40% of commitments are missed. This is the accountability gap—the distance between what people say they'll do and what actually gets done. Most leaders try to close this gap through more tracking, more meetings, more pressure. All wrong. The accountability gap isn't a monitoring problem—it's a culture problem.",
      
      "Research from Harvard Business Review studying high-performing teams found that accountability gaps stem from four sources: (1) Absence of consequences (good or bad performance produces same result). (2) Diffused responsibility (everyone and no one is accountable). (3) Tolerated mediocrity (we accept patterns we claim to reject). (4) Leadership inconsistency (we enforce rules situationally, not consistently). Fix these four, and the accountability gap shrinks. Ignore them, and no amount of tracking helps.",
      
      "Source 1: Absence of consequences. If meeting commitments and missing commitments produce the same outcome (nothing happens either way), rational actors will conserve effort. Not because they're lazy—because you've trained them that commitments don't matter. Example: Employee A delivers on time. Employee B misses deadline. Both get same raise, same promotion timeline, same praise in all-hands. What did you just teach? Deadlines are suggestions. The fix: Differentiate outcomes based on performance. Meeting commitments should be publicly recognized. Missing commitments should trigger visible adjustment (not punishment, but visible attention and problem-solving).",
      
      "Source 2: Diffused responsibility. When multiple people share accountability, it often means no one is accountable. 'The team is accountable for X' is code for 'no individual is accountable for X.' Research from social psychology shows this is called 'diffusion of responsibility'—when accountability is shared, everyone assumes someone else will handle it. The fix: One name per commitment. Using Clarity Canvas from Purple Belt: every commitment has ONE owner (who can delegate, who can collaborate, but who ultimately owns the outcome). If it fails, we know who to talk to—not to blame, but to understand and solve.",
      
      "Source 3: Tolerated mediocrity. The standards you walk past are the standards you accept. If your star performer misses deadlines and you say nothing (because they're valuable in other ways), you've just told the team: our stated commitments are negotiable. If one team consistently delivers and another consistently misses but both are treated the same, you've told everyone: excellence isn't rewarded, mediocrity is acceptable. The fix: Enforce standards consistently regardless of who violates them. The moment you have different rules for different people, you've killed accountability culture.",
      
      "Source 4: Leadership inconsistency. If you demand 100% delivery from your team but regularly miss your own commitments to them ('I'll get you that resource by Tuesday'—doesn't deliver), you've destroyed your moral authority. If you enforce one policy strictly but ignore another, you've taught people to guess which rules matter. The fix: Model the accountability you demand. Track your commitments to the team as rigorously as you track theirs. When you miss, acknowledge it publicly and adjust. Consistency > intensity. Better to have one rule enforced 100% of the time than ten rules enforced randomly.",
      
      "At Just Eat Takeaway, we had a chronic accountability gap. Weekly commitments made in Monday meetings, 50% delivered by Friday. We diagnosed: (1) No consequences—missed commitments weren't addressed. (2) Diffused responsibility—'the team will handle it' with no single owner. (3) Tolerated mediocrity—high performers and low performers treated identically. We implemented: (a) Named owners for every commitment (Clarity Canvas). (b) Friday review where each person reported out (visibility creates accountability). (c) Public recognition for delivery, public problem-solving for misses (not blame, but attention). Gap closed to 85% delivery within 6 weeks.",
      
      "The visibility principle: Accountability thrives in transparency. When commitments are visible to everyone and outcomes are reported publicly, social pressure creates accountability. When commitments are private (only you and your manager know), only explicit enforcement creates accountability. High-performing teams make commitments public (team Slack channel, dashboard, standup updates). This isn't surveillance—it's creating conditions where people naturally hold each other accountable because performance is visible.",
      
      "The mistake most leaders make: They try to close the accountability gap through process (more tracking, more check-ins, more project management tools). Process doesn't create accountability—culture does. If your culture tolerates missed commitments, no Jira workflow will fix it. If your culture creates social pressure to deliver, you barely need tracking. The diagnostic: Are missed commitments surprising (process problem) or expected (culture problem)? If they're expected ('Yeah, Sarah always misses deadlines'), that's culture. Fix culture, not process.",
      
      "In Brazilian Jiu Jitsu, when someone doesn't show up to train regularly, the team notices. Not through formal tracking—through absence. 'Where's Mike? He's missed three sessions.' The accountability comes from visibility and shared commitment. Everyone knows who's training consistently and who's not. That social awareness creates pressure to show up. Business teams need the same: make commitments and outcomes visible enough that the team naturally tracks who's delivering and who's not. Social accountability beats managerial accountability every time.",
      
      "The implementation: Run an accountability gap diagnostic. For your last 10 team commitments, calculate: How many were delivered on time? For missed commitments, what happened? Then evaluate the four sources: (1) Were there consequences (positive or negative)? (2) Was there a single owner or diffused responsibility? (3) Did you tolerate the misses or address them? (4) Are you modeling the accountability you demand? Your answers reveal which source is creating your gap. Then fix that source—don't add more tracking.",
      
      "Next lesson: Signs of Accountability Dysfunction—how to recognize when your team has an accountability problem before it becomes a crisis. But first, fix the worst source of your accountability gap. If consequences are absent, start differentiating outcomes (recognition for delivery, problem-solving for misses). If responsibility is diffused, assign single owners. If you're tolerating mediocrity, enforce standards. If you're inconsistent, model what you demand. Pick one. Fix it this week. The gap will shrink immediately because you've addressed root cause, not symptoms."
    ],
    learningObjective: "You will learn the four sources of accountability gaps (absent consequences, diffused responsibility, tolerated mediocrity, leadership inconsistency) and how visibility creates natural social accountability.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Signs of Accountability Dysfunction",
    content: [
      "You're in a leadership role. Things feel off. Projects are delayed. Meetings are full of excuses. But no one is explicitly failing—it's just... slow. Mediocre. Frustrating. These vague signals are actually specific patterns. Accountability dysfunction has signatures. If you know what to look for, you can diagnose and fix it before it metastasizes. This lesson teaches you the diagnostic checklist.",
      
      "Sign 1: Blame-shifting in retrospectives. When something goes wrong and the team discusses it, does everyone take ownership OR does everyone explain why it wasn't their fault? High-accountability teams: 'I missed that deadline because I underestimated complexity. Here's what I'll do differently.' Low-accountability teams: 'I would have hit it but Marketing didn't send the brief on time.' Blame flows outward, not inward. The diagnostic: Count ratio of 'I' vs. 'they' statements in post-mortems. High accountability = more 'I.' Low accountability = more 'they.'",
      
      "Sign 2: Commitments without dates. People say 'I'll get that done' without specifying when. Or dates are always vague: 'early next week,' 'sometime in Q2,' 'soon.' Specific dates create accountability because they're verifiable. Vague timelines create wiggle room. The diagnostic: Review your last 10 team commitments. How many had specific dates vs. vague timeframes? If >30% are vague, that's a signal. High-accountability teams default to: 'I'll deliver X by Friday EOD.' No ambiguity.",
      
      "Sign 3: No one asks for help until it's too late. Projects miss deadlines and when you investigate, the person knew they were in trouble 2 weeks ago but didn't say anything. Why? Because in low-accountability cultures, asking for help is seen as weakness or failure. In high-accountability cultures, NOT asking for help is the failure. The diagnostic: When someone misses a commitment, ask: 'When did you realize this wasn't going to make it? Did you raise it then?' If pattern is 'I knew but didn't want to alarm anyone,' that's accountability dysfunction. Teams need permission to say 'I'm stuck' early.",
      
      "Sign 4: Repeating the same mistakes. A specific failure pattern happens (missed deadline, quality issue, communication breakdown). Team discusses it. Identifies root cause. Says 'we won't do that again.' Then does it again next quarter. This is the clearest sign of accountability dysfunction: learning doesn't translate to behavior change. High-accountability teams implement specific changes after failures and track whether those changes happen. Low-accountability teams have great retrospectives that produce zero behavior change.",
      
      "Sign 5: Leader is the bottleneck for all decisions and accountability. If you're constantly mediating conflicts, approving routine decisions, checking on progress, and reminding people of commitments, you're in boss-accountability mode (centralized). If your team runs smoothly when you're on vacation, you're in peer-accountability mode (distributed). The diagnostic: Take a week off. What breaks? If answer is 'nothing,' you've built accountability into the team. If answer is 'everything,' accountability is dependent on you—which doesn't scale.",
      
      "Sign 6: Passive-aggressive behavior. People don't confront issues directly. Instead, you see: sarcastic comments in meetings, complaints to other teams, eye rolls, behind-back gossip, subtle undermining. All signs that the team lacks conflict skills (Blue Belt) or trust (White Belt) to address issues directly. Low accountability always produces passive aggression because the frustration has to go somewhere. If it doesn't go into direct accountability conversations, it leaks out as toxicity.",
      
      "At Just Eat Takeaway, we had all six signs in one team: Blame-shifting ('Engineering didn't...' 'Product didn't...'). Vague commitments ('I'll look into that'). No early escalation (people hid problems until deadline). Repeated mistakes (same coordination failures every quarter). Leader bottleneck (the manager mediated everything). Passive aggression (eye rolls, sarcasm). I showed the manager this diagnostic. He said: 'That's us.' We spent 4 weeks fixing trust (White Belt) and conflict (Blue Belt) before even discussing accountability. Two months later, the six signs were gone. The team self-managed accountability.",
      
      "The leader's diagnostic protocol: Spend one week observing for these six signs. Don't intervene yet—just watch and document. Score each sign 1-5 (1 = never see this, 5 = constant). If any score is 4+, that's your focus area. If 3+ signs score above 3, you have systemic accountability dysfunction that requires foundation work (return to White/Blue Belt practices). If only 1-2 signs score above 3, you can address those specifically with Brown Belt techniques.",
      
      "The most important insight: Accountability dysfunction is almost never isolated. It's downstream of trust dysfunction (White Belt) or conflict dysfunction (Blue Belt). You can't create accountability without vulnerability-based trust (people won't take risks if mistakes are punished). You can't create accountability without conflict comfort (people won't address issues if confrontation is avoided). This is why the belt sequence exists. If you're failing at Brown Belt, the problem is usually 2-3 belts earlier.",
      
      "Brown Belt Integration Check: You've completed Accountability Foundations stripe. You learned: (1) Peer accountability scales, boss accountability bottlenecks. (2) Five barriers prevent peer accountability (role confusion, relationship fears, hypocrisy concerns, clarity gaps, trust absence). (3) Four sources create accountability gaps (absent consequences, diffused responsibility, tolerated mediocrity, leadership inconsistency). (4) Six signs diagnose accountability dysfunction before it becomes crisis. These aren't separate—they're a diagnostic and intervention system for building accountability culture.",
      
      "Next stripe: Ownership Culture—we'll explore Jocko Willink's 'Extreme Ownership' principles and how to create rituals that embed accountability into daily operations. But first, run the six-sign diagnostic on your team. Score each 1-5. If you have multiple high scores (4+), you know where to focus. And if the scores reveal trust or conflict issues, don't try to force accountability—return to White or Blue Belt and rebuild the foundation. Shortcuts fail. Sequence matters. Accountability is the outcome of foundation work, not a substitute for it."
    ],
    learningObjective: "You will learn to diagnose six signs of accountability dysfunction (blame-shifting, vague commitments, late escalation, repeated mistakes, leader bottleneck, passive aggression) before they become crises.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe13Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "A team member comes to you: 'Marco, Sarah's not responding to my requests for input and it's blocking my work.' According to the Take-the-Back Principle, what's your response?",
    options: [
      "Tell Sarah to respond faster",
      "Mediate a meeting between them to resolve it",
      "Ask: 'Have you talked directly with Sarah about this?' If no: 'Go have that conversation first. If it doesn't resolve, come back and we'll discuss together.'",
      "Restructure work so they don't have to coordinate"
    ],
    correctAnswer: 2,
    explanation: "Option C implements peer accountability architecture by forcing peer-to-peer resolution FIRST. Lencioni's research: high-performing teams address issues directly, dysfunctional teams escalate without attempting peer conversation. Option A (boss solving it) trains dependence. Option B (immediate mediation) doesn't require them to try peer resolution first. Option D avoids the problem. The discipline: 'Have you talked to them?' becomes your default response. Initially people resist (they want you to solve it). After 3-4 forced peer conversations, pattern shifts—they start addressing directly because they know you'll redirect anyway. Just Eat Takeaway example: mediation time dropped 80% after implementing this policy. The insight: Every time you solve a peer conflict FOR them, you train dependence. Every time you coach them to solve it themselves, you train accountability.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You notice a teammate consistently missing deadlines, affecting the team. You don't address it because: 'I'm not their manager—that's not my role.' According to peer accountability barriers, what barrier is this and how should you reframe?",
    options: [
      "This is correct—accountability IS the manager's role",
      "This is 'role confusion' barrier. Reframe: 'We both committed to this team's success. When commitments affect team performance, peer accountability is fulfilling that commitment, not overstepping.'",
      "This is 'relationship preservation' barrier—you're afraid of damaging the relationship",
      "Wait until the manager addresses it naturally"
    ],
    correctAnswer: 1,
    explanation: "Option B correctly identifies 'role confusion' and provides the reframe. Peer accountability ≠ positional authority. It's about mutual commitment to team success. When you joined the team, you committed to its goals. When behavior undermines goals, addressing it isn't overstepping—it's fulfilling your commitment. Kim Scott's research: direct, respectful accountability strengthens relationships. What damages relationships is passive-aggression, silent resentment, and triangulation (involving boss instead of talking directly). Option A perpetuates the barrier. Option C misdiagnoses the barrier. Option D abdicates. The five barriers from Lencioni: role confusion, relationship fears, hypocrisy concerns, clarity gaps, trust absence. Each is addressable through explicit team agreement.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Your team makes weekly commitments. Only 40% are delivered on time. You diagnose: No consequences (delivery and misses produce same outcome), no single owners (team accountability), and inconsistent follow-through. According to accountability gap sources, what's your intervention?",
    options: [
      "Add more project management tracking",
      "Have more frequent check-in meetings",
      "Implement: (1) Named single owners per commitment, (2) Public Friday review where everyone reports, (3) Visible recognition for delivery + problem-solving for misses",
      "Accept 40% as the team's baseline capacity"
    ],
    correctAnswer: 2,
    explanation: "Option C addresses all three diagnosed sources. Named owners fixes diffused responsibility. Public review creates visibility (social accountability). Recognition + problem-solving adds consequences (delivery is noticed, misses trigger visible attention). Just Eat Takeaway example: these three changes closed gap from 50% to 85% delivery in 6 weeks. Options A and B treat symptoms (add process) not causes (cultural issues). Option D accepts dysfunction. The four sources: absent consequences, diffused responsibility, tolerated mediocrity, leadership inconsistency. Process doesn't create accountability—culture does. The visibility principle: accountability thrives in transparency. Make commitments and outcomes visible, and social pressure creates accountability. Hide them, and only explicit enforcement works.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're diagnosing your team using the six accountability dysfunction signs. Scores: Blame-shifting (5/5), Vague commitments (4/5), Late escalation (4/5), Repeated mistakes (3/5), Leader bottleneck (5/5), Passive aggression (4/5). What does this pattern indicate?",
    options: [
      "Minor accountability issues—just need better processes",
      "Systemic accountability dysfunction likely rooted in White Belt (trust) or Blue Belt (conflict) failures—address foundation before forcing accountability",
      "The team needs accountability training",
      "You need to be more strict about enforcement"
    ],
    correctAnswer: 1,
    explanation: "Option B correctly diagnoses systemic dysfunction requiring foundation work. Five of six signs scoring 4-5 = this isn't an accountability problem, it's a trust or conflict problem. You can't create accountability without vulnerability-based trust (White Belt: people won't take risks if mistakes are punished) or conflict comfort (Blue Belt: people won't address issues if confrontation is avoided). Options A, C, and D try to force Brown Belt solutions on White/Blue Belt problems—will fail. The pattern is diagnostic: Blame-shifting + passive aggression = can't handle conflict directly (Blue Belt gap). Leader bottleneck + late escalation = don't trust peers or feel safe (White Belt gap). The most important insight: Accountability dysfunction is almost never isolated—it's downstream of earlier belt failures. If Brown Belt is failing, return to White/Blue Belt and rebuild foundation. Sequence matters. Shortcuts fail.",
    xpReward: 10
  }
];

export const stripe13Content = {
  lessons: stripe13Lessons,
  checkpoints: stripe13Checkpoints
};

