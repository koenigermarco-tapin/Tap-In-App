/**
 * WHITE BELT - STRIPE 2: PSYCHOLOGICAL SAFETY
 * Theme: Creating environments where teams can take interpersonal risks
 * Focus: Google's research, safety mechanisms, leader's role in building safety
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

export const stripe2Lessons: Lesson[] = [
  {
    id: 1,
    title: "What Psychological Safety Really Means",
    content: [
      "Most people hear 'psychological safety' and think it means being nice, avoiding hard conversations, or creating a feelings-first workplace. They're completely wrong. Psychological safety isn't about comfort—it's about candor.",
      
      "Amy Edmondson at Harvard Business School coined the term in 1999 after studying medical teams. Her definition: 'A shared belief held by members of a team that the team is safe for interpersonal risk-taking.' Not physical safety. Not emotional coddling. Interpersonal risk-taking.",
      
      "What does that mean in practice? It means you can say 'I don't know' without looking incompetent. You can admit 'I screwed up' without career damage. You can challenge your boss's idea without retaliation. You can ask 'stupid questions' without judgment. You can fail at something new without being labeled a failure.",
      
      "Here's what psychological safety is NOT: It's not lowering standards. It's not avoiding accountability. It's not protecting people from consequences. It's not consensus decision-making. It's not everyone getting a participation trophy. Those misconceptions kill performance just as much as fear does.",
      
      "Google's Project Aristotle studied 180 teams for two years, analyzing everything: who was on the team, how they communicated, their individual skills, their working styles. They expected to find that the best teams had the smartest people or the most experienced leaders. The data told a different story.",
      
      "Psychological safety explained 43% of the variance in team performance. Not intelligence. Not resources. Not tenure. The belief that you could take interpersonal risks without punishment. Teams with high psychological safety had 19% higher productivity, 27% lower turnover, 29% more satisfaction, and 3.6x more engagement.",
      
      "At Just Eat Takeaway, we had a weekly operations review where we'd analyze delivery failures. Initially, these meetings were finger-pointing sessions—everyone protecting their territory, hiding problems until they exploded. Then we changed one thing: I started each meeting by sharing my biggest mistake from the week.",
      
      "Within three weeks, the quality of our problem-solving jumped dramatically. Why? Because I'd signaled: 'Mistakes are data, not crimes.' People started surfacing issues early instead of hiding them. We caught problems at €5,000 instead of €50,000. That's the ROI of psychological safety.",
      
      "In Brazilian Jiu Jitsu, you can't learn without getting tapped out. Repeatedly. If you're afraid of tapping (admitting defeat), you'll never put yourself in positions where you're learning at the edge of your ability. You'll stay in your comfort zone, rolling with people you can beat, avoiding techniques you haven't mastered.",
      
      "The best training gyms have a culture where tapping is celebrated as learning. 'Nice tap—you felt that choke coming. Now let's work on the defense.' No shame. No ego. Just continuous improvement through acknowledged failure.",
      
      "Organizations are the same. If your team is afraid of 'tapping'—admitting they're stuck, don't know something, made an error—they'll hide problems until they become disasters. Psychological safety is the culture where tapping early is rewarded, not punished.",
      
      "In the next lesson, we'll dive deep into Google's Project Aristotle—the exact behaviors that created the highest-performing teams. For now, reflect: On your team, what's one thing people are afraid to say out loud? That fear is where psychological safety is missing. That's your starting point."
    ],
    learningObjective: "You will learn what psychological safety actually means (interpersonal risk-taking, not comfort) and why it's the #1 predictor of team performance according to Google's research.",
    duration: "6-8 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Google Secret: Project Aristotle Revealed",
    content: [
      "In 2012, Google launched Project Aristotle to answer one question: What makes a team effective at Google? They had all the data in the world—performance metrics, personality tests, social graphs, communication patterns, project outcomes. Surely they'd find the formula for the perfect team composition.",
      
      "They studied 180 teams across engineering, sales, and support functions. They analyzed team member IQs, work styles, social connections, hobbies, educational backgrounds, tenure at Google. They looked at whether teams socialized outside work, whether they had similar personalities, whether introverts or extroverts dominated.",
      
      "Nothing correlated. High-performing teams had all types of personalities. Some members were friends outside work, others weren't. Some had homogeneous backgrounds, others were diverse. The composition didn't matter nearly as much as how the team interacted.",
      
      "They found five key dynamics that set successful teams apart, ranked by impact: (1) Psychological Safety, (2) Dependability, (3) Structure & Clarity, (4) Meaning, (5) Impact. But psychological safety was so far ahead of the others that Google's researchers said: 'It's the underpinning of the other four. Without it, the others don't matter.'",
      
      "Here's what psychological safety looked like in Google's top teams: Conversational turn-taking was roughly equal. No one dominated discussions. Everyone spoke roughly the same amount over the course of a project. Social sensitivity was high—team members picked up on non-verbal cues, noticed when someone seemed uncomfortable, adjusted their behavior accordingly.",
      
      "The researchers found that high-performing teams had heated debates—but they were about ideas, not personal attacks. People disagreed vigorously but no one felt personally attacked. Why? Because the foundation of psychological safety meant 'I can challenge your idea without you thinking I'm challenging YOU.'",
      
      "MIT research by Alex Pentland found similar patterns. They studied 'collective intelligence'—how smart a group is together, regardless of individual IQs. The key variable? Equal distribution of conversational turn-taking. Teams where one or two people dominated had lower collective intelligence than teams where everyone contributed—even if those dominant people were individually brilliant.",
      
      "Here's the practical implication: If you're in a meeting and only 3 out of 8 people have spoken, your team is underperforming its potential. The three quietest people might have the insights that solve your problem—but they're not sharing because they don't feel safe.",
      
      "At Just Eat Takeaway, I started using a simple technique in critical meetings: After we'd discussed an issue for 10 minutes, I'd ask, 'Who hasn't spoken yet?' Then I'd specifically call on them: 'Maria, what am I missing from the operational side?' Not 'Do you have anything to add?' (too easy to say no), but 'What am I missing?' (presumes their perspective has value).",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'rounds.' In a typical training session, you'll roll (spar) with 5-8 different partners. The instructors intentionally pair you with higher belts, lower belts, bigger, smaller, faster, slower. Why? Because you learn different things from each body type and skill level.",
      
      "If you only rolled with people similar to you, your game would have gaps. The 120-pound person teaches you technique refinement. The 220-pound person teaches you how to handle pressure. The blue belt teaches you basics you've forgotten. The black belt shows you what's possible.",
      
      "Teams work the same way. If only the 'loudest voices' or 'most senior people' speak, you're training with the same partners every time. You're missing the perspectives that would make your strategy more robust, your execution sharper, your problem-solving complete. Psychological safety is how you get everyone into the rounds.",
      
      "Next lesson: How to create psychological safety in high-pressure environments where mistakes are expensive. For now, observe your next meeting: Who spoke? Who didn't? The silence tells you where your team's collective intelligence is leaking."
    ],
    learningObjective: "You will learn the specific behaviors from Google's Project Aristotle that created high-performing teams and how to implement equal conversational turn-taking.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Creating Safety in High-Pressure Environments",
    content: [
      "Here's the objection every leader raises: 'Psychological safety sounds great for tech companies with ping-pong tables. But I run operations. Mistakes cost money. We can't afford people being 'comfortable' making errors.' This misunderstands everything.",
      
      "Psychological safety isn't about making errors acceptable—it's about making error reporting mandatory. The difference? In low-safety environments, people make mistakes AND hide them until they explode. In high-safety environments, people make mistakes AND surface them immediately so they can be fixed at €5,000 instead of €500,000.",
      
      "Amy Edmondson studied cardiac surgery teams—literal life-and-death environments where one mistake kills someone. She found that the teams with the highest psychological safety reported MORE errors, not fewer. Were they making more mistakes? No. They were catching and reporting them before they reached the patient.",
      
      "The low-safety teams appeared to have fewer errors on paper—because nurses and technicians were afraid to speak up when they saw something wrong. So the errors proceeded to patient harm. Psychological safety wasn't soft—it was the difference between catching a mistake and burying a patient.",
      
      "Aviation learned this the hard way. In 1977, two Boeing 747s collided on a runway in Tenerife, killing 583 people. The co-pilot saw the problem but deferred to the captain's authority. After Tenerife, the industry created Crew Resource Management (CRM)—training that explicitly requires junior crew to challenge senior pilots if they see danger. Psychological safety isn't optional when lives are at stake.",
      
      "How do you build safety in high-pressure, high-stakes environments? Three mechanisms: (1) Normalize error reporting. (2) Respond to bad news with curiosity, not anger. (3) Punish cover-ups, not mistakes.",
      
      "Mechanism 1: Normalize error reporting. At Bridgewater, the world's largest hedge fund, Ray Dalio created an 'Issue Log' where every employee logs mistakes and near-misses daily. It's not optional. It's not negative. It's operational discipline. The data from the Issue Log reveals patterns that prevent bigger failures. Mistakes become intelligence.",
      
      "Mechanism 2: Respond to bad news with curiosity, not anger. When someone reports an error, your first response sets the culture. If you explode in blame, you've just taught everyone to hide problems. If you ask, 'What happened? What can we learn? How do we prevent this?' you've taught them that problems are puzzles, not punishments.",
      
      "Mechanism 3: Punish cover-ups, not mistakes. At Amazon, Jeff Bezos is famous for saying, 'I want people to make mistakes—but I want them to be NEW mistakes.' A mistake you learn from is tuition. A mistake you hide is fraud. And fraud gets you fired. The severity isn't the error—it's the dishonesty.",
      
      "In practice at Just Eat Takeaway during COVID: We had a dispatcher make a routing error that left 200 orders unassigned for 45 minutes. €20,000 in refunds and angry customers. She came to me in tears, expecting to be fired. I said: 'Walk me through what happened. What was the system showing you? What was the decision point? What would have helped you catch this?'",
      
      "We learned the routing algorithm had an edge case we'd never considered. We fixed the code. We documented the failure mode. We trained the whole dispatch team on the pattern. That €20,000 mistake prevented a €200,000 one three months later when we saw the early warning signs. Because she felt safe reporting it immediately instead of hiding it.",
      
      "In Brazilian Jiu Jitsu, there's a saying: 'A black belt is a white belt who never quit.' Every person who's expert at BJJ has tapped thousands of times. They've been choked, arm-barred, swept, mounted, crushed. The ones who became dangerous are the ones who treated every tap as data: 'How did I end up there? What did I miss? How do I defend that next time?'",
      
      "The ones who quit are the ones who treated taps as failure, who felt shame, who avoided training partners who exposed their weaknesses. They protected their ego instead of improving their game. Your team is the same: do they treat failures as learning or shame? That's your culture barometer.",
      
      "Next lesson: Your specific role as a leader in creating this safety. But first, implement one mechanism this week: When someone reports bad news, force yourself to respond with a question, not a judgment. 'Tell me more' not 'How could you.' Watch what changes."
    ],
    learningObjective: "You will learn how to create psychological safety in high-stakes environments by normalizing error reporting, responding with curiosity, and punishing cover-ups not mistakes.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "From Fear to Freedom: Your Role",
    content: [
      "If you're the leader, you are the thermostat of psychological safety. Not the thermometer (measuring what's there), but the thermostat (setting the temperature). Your team will never feel safer than you make it safe for them to be. This is non-delegable.",
      
      "Research from the Neuroleadership Institute shows that the leader's behavior accounts for 70% of variance in team psychological safety. Not HR policies. Not company values posters. Not team-building exercises. YOU. What you reward, what you punish, how you respond to uncertainty, how you handle your own mistakes—that's the safety level.",
      
      "Here are the five specific behaviors that leaders of high-safety teams consistently demonstrate, according to Amy Edmondson's research: (1) Frame work as a learning problem, not an execution problem. (2) Acknowledge your own fallibility. (3) Model curiosity. (4) Create structures for voice. (5) Respond productively to voice.",
      
      "Behavior 1: Frame work as learning, not execution. Instead of 'We need to execute flawlessly,' say 'We're figuring out something complex here. We'll make mistakes. Our job is to learn faster than we stumble.' This gives permission for the messy reality of innovation.",
      
      "Behavior 2: Acknowledge your own fallibility. Regularly say things like: 'I might be wrong about this,' 'I don't have enough context on X,' 'I made a mistake on Y last quarter.' This signals that admitting uncertainty or error is normal, not career-limiting. At Pixar, Ed Catmull famously said, 'Early on, all our movies suck.' Not 'are bad' or 'need improvement'—SUCK. That permission to name reality drives their innovation.",
      
      "Behavior 3: Model curiosity. When something goes wrong, your first question should be: 'Help me understand what happened.' Not 'Who's responsible?' or 'Why didn't you...' Curiosity before judgment. This rewires your team's nervous system from fear to problem-solving.",
      
      "Behavior 4: Create structures for voice. Don't just say 'speak up.' Build mechanisms that require input. Examples: Anonymous feedback channels. Regular 'What am I missing?' check-ins. Retrospectives where everyone speaks. Devil's advocate roles in decision meetings. Structure trumps intention every time.",
      
      "Behavior 5: Respond productively to voice. When someone shares a concern, your response determines whether others will. Thank them explicitly: 'I'm glad you brought this up.' Show you heard it: 'What I'm hearing is X—did I get that right?' Take action: 'Here's what I'll do with this input.' Close the loop: 'We couldn't implement your suggestion because of Y, but we did Z instead.'",
      
      "The mistake most leaders make: They say they want psychological safety, then contradict it through micro-responses. Someone admits a mistake—you sigh and look frustrated. Someone asks a basic question—you answer but your tone says 'you should know this.' Someone challenges your idea—you get defensive. Your team's nervous system reads the subtext, not the words.",
      
      "At Just Eat Takeaway, I created a 'Friday Fails' channel in Slack. Every Friday, leadership team posted one mistake from the week. Not major disasters—small operational mess-ups, bad assumptions, missed details. I went first every single week. After six weeks, the rest of the company started sharing. After three months, we had a database of failure patterns that improved our execution by 15%.",
      
      "The ROI wasn't the database—it was that people stopped wasting energy hiding normal mistakes. That energy went into fixing problems instead of covering them up. Psychological safety isn't about feelings—it's about redirecting effort from fear-management to performance.",
      
      "In Brazilian Jiu Jitsu, the instructor is the safety thermostat. If the instructor mocks students who get tapped, the culture becomes toxic. People hide weaknesses, avoid challenges, quit. If the instructor says 'Great tap—you felt that coming' and helps them learn the defense, the culture becomes growth-oriented. Same mats, same techniques, different culture—all set by the leader.",
      
      "The physical practice: Partner drill called 'Trust Fall.' Stand back-to-back with a partner, lock arms, and sit down together without using your hands. You must coordinate descent or you both fall. Then stand up together the same way. This teaches you what it feels like when your success is dependent on someone else's commitment. You can't control them—you can only trust them.",
      
      "This is your role as a leader: Create the conditions where your team trusts each other enough to be interdependent. Not independent (everyone protecting their turf) or dependent (everyone waiting for you to solve it), but interdependent (success requires coordinated risk-taking).",
      
      "Next stripe, we shift from team safety to self-leadership—because you can't create safety for others if you're not grounded yourself. But before that, do one thing this week: Pick ONE of the five behaviors (frame as learning, acknowledge fallibility, model curiosity, create structures, respond productively) and practice it deliberately in every interaction. Notice what shifts.",
      
      "You're not building psychological safety for its own sake. You're building it because high-safety teams execute faster, innovate better, and retain talent longer. The business case is overwhelming. The question is: Will you be the thermostat or just another thermometer reading the temperature others set?"
    ],
    learningObjective: "You will learn the five specific leader behaviors that create psychological safety and understand your non-delegable role as the culture thermostat.",
    duration: "8-10 minutes",
    xpReward: 10
  }
];

export const stripe2Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your team just launched a new feature. After one week, usage is 60% below projections. In your retrospective meeting, the product manager says: 'I think we misread the customer research. The feature solves a problem they don't actually have.' How do you respond to build psychological safety?",
    options: [
      "Ask: 'How did we miss this in validation? What should we have tested differently?'",
      "Say: 'Let's not dwell on the past. What can we do now to improve adoption?'",
      "Point out: 'I raised concerns about the research methodology in the planning phase'",
      "Reassure: 'It's okay, these things happen. We'll figure it out'"
    ],
    correctAnswer: 0,
    explanation: "Option A models curiosity and frames the situation as a learning problem, not an execution failure. This is exactly what Amy Edmondson's research shows builds safety: respond to problems with genuine questions, not blame. Option B sounds positive but misses the learning opportunity—teams need to understand failure patterns to prevent them. Option C destroys safety by implying 'I told you so.' Option D is well-intentioned but too soft—it doesn't acknowledge the real problem or create learning. Psychological safety isn't about comfort—it's about honest, curious problem-solving.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You're in a strategy meeting with 10 people. After 30 minutes of discussion about a major organizational change, you notice that only 3 people have spoken (all senior leaders). The other 7 are silent. What's the Project Aristotle-informed move?",
    options: [
      "Continue—if they had something important to say, they'd speak up",
      "Ask generally: 'Does anyone else have thoughts on this?'",
      "Pause and say: 'I want to hear from everyone who hasn't spoken yet. Maria, what are we missing from the field perspective?'",
      "Send a follow-up email after the meeting asking for written feedback"
    ],
    correctAnswer: 2,
    explanation: "Option C implements the key finding from Project Aristotle: equal conversational turn-taking drives collective intelligence. By specifically naming people who haven't spoken and asking what you're 'missing' (not 'do you have thoughts'), you signal their perspective has value AND you create structure for voice. Google's research was clear: teams where everyone speaks roughly equally outperform teams where a few dominate, regardless of who those few are. Option A ignores the data on silence. Option B is too passive—junior people won't volunteer in front of senior leaders. Option D delays input when real-time discussion is what's needed.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Your operations team just discovered a critical error that will cost €80,000 to fix. The engineer who made it comes to you immediately, clearly stressed. Your first response is:",
    options: [
      "'How long have you known about this and why am I just hearing about it now?'",
      "'This is really expensive. We need to talk about your attention to detail.'",
      "'Walk me through what happened. What was the decision point where this went wrong?'",
      "'Don't worry about it. Everyone makes mistakes. Let's just fix it and move on.'"
    ],
    correctAnswer: 2,
    explanation: "Option C is the only response that creates psychological safety in a high-stakes environment. You're responding with curiosity ('walk me through'), not anger or blame. The engineer came immediately—that's the behavior you want to reinforce. Amy Edmondson's surgery research shows: teams that report more errors have better outcomes because they catch them early. Option A punishes reporting and guarantees future problems will be hidden longer. Option B focuses on blame when you need system learning. Option D sounds nice but misses the learning opportunity—€80k mistakes require understanding, not dismissal. The goal isn't comfort—it's making the next €80k mistake impossible through shared learning.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're implementing Amy Edmondson's five leader behaviors. You've been doing well on framing work as learning, acknowledging fallibility, and modeling curiosity. But you realize you haven't created any new structures for voice—you're relying on 'open door policy' and 'just speak up.' What structure should you implement first?",
    options: [
      "Anonymous feedback survey sent quarterly",
      "Weekly team ritual where everyone shares one challenge they're facing",
      "One-on-one meetings with each team member monthly",
      "Open Slack channel for team concerns"
    ],
    correctAnswer: 1,
    explanation: "Option B creates the most powerful structure: regular, expected, public voice. Psychological safety research shows that structures requiring everyone to speak (vs. inviting voluntary input) produce dramatically better results. Weekly cadence keeps it fresh. Everyone shares makes it psychologically normal. Challenge focus makes it useful. Compare this to: Option A is too infrequent and anonymous doesn't build team-level safety. Option C is important but doesn't create collective voice. Option D is passive—people won't use it unless there's already high safety. The Neuroleadership Institute research is clear: leader behavior accounts for 70% of variance in safety, and the most effective behavior is creating participation structures, not just being open to input.",
    xpReward: 10
  }
];

export const stripe2Content = {
  lessons: stripe2Lessons,
  checkpoints: stripe2Checkpoints
};

