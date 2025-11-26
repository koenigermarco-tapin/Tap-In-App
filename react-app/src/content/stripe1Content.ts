/**
 * WHITE BELT - STRIPE 1: TRUST FOUNDATIONS
 * Theme: Building the foundation of vulnerability-based trust
 * Focus: Understanding trust, psychological safety, and creating safe environments
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

export const stripe1Lessons: Lesson[] = [
  {
    id: 1,
    title: "Why Teams Fail: The Trust Crisis",
    content: [
      "Walk into any struggling company and you'll hear the same complaints: 'Communication is broken.' 'We're not aligned.' 'People aren't accountable.' But these aren't the real problems—they're symptoms. The disease is always the same: absence of trust.",
      
      "According to the 2025 Talent Trends Austria Report, only 1% of employees fully trust leadership to balance performance and wellbeing. Just 31% say their company fosters psychological safety. This isn't a 'nice to have' culture problem—it's a €200,000+ problem for every company that ignores it.",
      
      "Patrick Lencioni studied over 10,000 teams and identified trust as the foundation of his Five Dysfunctions model. Without it, every other dysfunction cascades: teams can't have healthy conflict, can't truly commit to decisions, can't hold each other accountable, and ultimately can't achieve collective results.",
      
      "But here's what most miss: Lencioni isn't talking about predictability trust ('I trust you'll deliver on time'). He's talking about vulnerability-based trust—the confidence that your teammates won't use your weaknesses against you. That you can say 'I don't know,' 'I screwed up,' or 'I need help' without being punished.",
      
      "Google spent two years studying 180 teams in Project Aristotle, expecting to find that the best teams had the smartest people or the best resources. They were wrong. The #1 predictor of team performance was psychological safety—the belief that you won't be punished when you make a mistake. Teams with high psychological safety had 43% higher performance variance, 19% higher productivity, 27% lower turnover, and 3.6x more engagement.",
      
      "McKinsey research shows employee disengagement costs a median S&P 500 company between €228-355 million annually. Over five years, that's at least €1.1 billion in lost value. Deloitte found that replacing one employee costs 6-9 months of their salary. For a €60,000 employee, that's €30,000-45,000 in recruiting and training—multiplied by every person who leaves because they don't trust their team.",
      
      "The real cost isn't the money—it's the wasted potential. Smart people spending energy on self-protection instead of innovation. Teams avoiding hard conversations that would lead to breakthroughs. Leaders hiding uncertainty instead of crowdsourcing solutions.",
      
      "At Just Eat Takeaway, I managed operations for 2,000+ delivery partners across multiple countries. When COVID hit and demand spiked 350%, I learned this lesson fast: the teams that survived weren't the ones with the best plans—they were the ones where people felt safe admitting when something wasn't working.",
      
      "In Brazilian Jiu Jitsu, there's a moment every white belt experiences: you're stuck in a bad position, don't know the escape, and have two choices. Fight it alone and get choked out, or tap and ask your training partner to show you the way out. The people who progress fastest are the ones who tap early and ask questions.",
      
      "Organizations work the same way. The leaders who win are the ones who create environments where people can tap—admit they're stuck, ask for help, share uncertainty—without fear of judgment.",
      
      "In the next lesson, we'll explore what happens to trust when pressure hits—because fair-weather trust means nothing when it's 3 AM and the system is down.",
      
      "For now, ask yourself: On a scale of 1-10, how safe do your team members feel admitting mistakes to you? Not what you hope—what's real. That number is your trust score. Everything else builds from there."
    ],
    learningObjective: "You will learn why absence of trust is the root cause of team dysfunction and how it costs organizations millions in hidden productivity losses.",
    duration: "5-7 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Trust Under Pressure: When It Matters Most",
    content: [
      "Picture this: It's 3 AM. Your production system is down. Revenue is bleeding €10,000 per hour. Your team is on a conference call, and everyone is looking to you for answers you don't have yet.",
      
      "This is when trust matters most. Not in the all-hands meetings or team-building exercises—but when everything is on fire and no one has a clear solution.",
      
      "Most teams have 'fair weather trust'—they work together when things are smooth. But Google's Project Aristotle found that the #1 predictor of team performance isn't intelligence, resources, or experience. It's psychological safety—the belief that you won't be punished for mistakes or for not knowing something. And that belief gets tested hardest under pressure.",
      
      "Harvard Business School research confirms that 'trust is the foundation of most successful organizations.' But here's what they found that matters: trust built through shared vulnerability under stress is 3x stronger than trust built through team dinners or personality tests. Why? Because your brain remembers emotional experiences far better than intellectual ones.",
      
      "At Just Eat Takeaway, we faced a 350% demand spike during COVID. I had 2,000+ delivery drivers, overwhelmed dispatchers, and angry customers. I didn't have all the answers. The breakthrough came when I stopped pretending I did.",
      
      "In a team call, I said: 'I don't know how to fix this yet. But here's what I'm seeing, here's what I'm thinking, and I need your help.' That moment of vulnerability under pressure created more trust than six months of 'team-building' ever could.",
      
      "Here's the paradox: We think trust is built by being reliable and having answers. But research shows trust is actually built through appropriate vulnerability—admitting what you don't know while maintaining clarity about what you do know. Under pressure, teams need both: 'I don't have the answer AND I'm committed to figuring it out with you.'",
      
      "Next time you're in a high-pressure situation, try this framework: (1) Name the reality: 'This is hard and we don't have all the answers yet.' (2) Share what you know: 'Here's what we do know...' (3) Ask for input: 'What am I missing? What do you see?' (4) Commit to action: 'Here's what we'll do in the next hour.' This builds trust because it's honest, clear, and action-oriented.",
      
      "The mistake most leaders make: They think vulnerability means dumping their anxiety on the team. It doesn't. Vulnerability is honesty about what you don't know while maintaining composure about the process of finding out. Think of it like a pilot during turbulence: 'Folks, we're hitting rough air and I'm adjusting our altitude' is honest. 'I have no idea what's happening!' is panic.",
      
      "In Brazilian Jiu Jitsu, you learn that the person who panics under pressure loses. The person who stays calm, assesses the situation, and adapts—wins. But here's the key: You only learn to stay calm by practicing under pressure. You can't think your way to composure. You have to train it.",
      
      "This is why Tap-In uses physical exercises alongside frameworks. When you practice the 'Grip-Switch' drill—where you physically experience giving and receiving trust—your body learns what trust feels like. And in a 3 AM crisis call, your body remembers that feeling faster than your brain can recall a PowerPoint slide.",
      
      "In the next lesson, we'll explore 'The Vulnerability Paradox'—why the leaders who admit weakness are actually perceived as stronger. For now, reflect on this: When was the last time you were under real pressure with your team? Did you pretend to have all the answers, or did you create space for shared problem-solving? The teams that survive crises together are the teams that trust each other most."
    ],
    learningObjective: "You will learn why trust is tested most under pressure and how to build trust that survives crisis situations through appropriate vulnerability.",
    duration: "6-8 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "The Vulnerability Paradox",
    content: [
      "Here's what doesn't make sense: The leaders who admit they don't have all the answers are rated as more competent, not less. The teams where people openly share mistakes perform better, not worse. Vulnerability, when done right, is a superpower—not a weakness.",
      
      "Brené Brown spent a decade studying 11,000+ data points on vulnerability, courage, and shame. Her finding: 'Vulnerability is not weakness; it's our greatest measure of courage.' But in business, we've been taught the opposite. Show no weakness. Never let them see you sweat. Fake it till you make it.",
      
      "The research tells a different story. Paul J. Zak's neuroscience work identified 8 management behaviors that stimulate oxytocin production and generate trust in organizations. #1 on the list? 'Recognizing excellence.' But #2? 'Showing vulnerability.' Leaders asking for help increases trust and cooperation throughout the organization.",
      
      "Amy Edmondson's work at Harvard on psychological safety shows that when leaders model vulnerability—admitting mistakes, asking questions they don't know the answers to, seeking input on decisions—team members are 4x more likely to speak up with concerns, 3x more likely to report errors before they become disasters, and 2x more likely to collaborate across functions.",
      
      "But here's the paradox within the paradox: There's a right way and a wrong way to be vulnerable. Strategic vulnerability builds trust. Uncontrolled emotional dumping destroys it.",
      
      "Strategic vulnerability looks like this: 'I made a mistake on the client proposal. I missed a key requirement. Here's my plan to fix it, but I need your input on timeline feasibility.' You're admitting error (vulnerable), taking ownership (accountable), and inviting collaboration (inclusive).",
      
      "Uncontrolled dumping looks like this: 'I'm so stressed, I can't handle this, everything is going wrong, I don't know what to do.' You're sharing feelings without a productive frame. That's therapy, not leadership—and your team isn't your therapist.",
      
      "The difference? Strategic vulnerability serves the team's ability to solve problems. Emotional dumping serves your need to vent. One builds trust and performance. The other creates anxiety and paralysis.",
      
      "In practice: Before you share something vulnerable, ask yourself three questions: (1) Is this relevant to the work at hand? (2) Am I maintaining clarity about next steps? (3) Am I inviting collaboration or just venting? If you can answer yes, yes, yes—it's strategic. If not, save it for your coach or therapist.",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'giving your back.' It's one of the worst positions—your opponent can choke you out and you can't see what's coming. No one voluntarily gives their back in competition. Except in training with trusted partners. When you give your back intentionally, you're saying: 'I trust you not to destroy me. Let's work on escape techniques.'",
      
      "Organizations work the same way. The paradox is that by giving your 'back'—by being strategically vulnerable—you create environments where others feel safe to do the same. And that's when the real learning happens.",
      
      "Next lesson, we'll build your personal trust foundation with a practical framework. But first, reflect: When was the last time you admitted a mistake to your team? How did they respond? If you can't remember, that's your sign—the vulnerability muscle needs training."
    ],
    learningObjective: "You will learn the difference between strategic vulnerability that builds trust and uncontrolled emotional dumping that destroys it.",
    duration: "5-7 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Building Your Trust Foundation",
    content: [
      "Trust isn't magic. It's not about personality or charisma. It's a skill you can train, and like any skill, it requires deliberate practice. This lesson gives you the framework to start building trust—starting today.",
      
      "The Trust Foundation has three pillars, based on Lencioni's work with thousands of executive teams: (1) Reliability Trust—do what you say you'll do. (2) Competence Trust—demonstrate capability in your domain. (3) Vulnerability Trust—be open about weaknesses and ask for help. Most leaders stop at pillar 2. High-performing teams require all three.",
      
      "Pillar 1: Reliability Trust is table stakes. If you're late to meetings, miss deadlines, or make commitments you don't keep, nothing else matters. Your team's nervous system learns: 'Their words don't match their actions.' Research shows it takes 8 positive interactions to overcome 1 negative trust breach. Don't create the debt.",
      
      "Action: For the next week, track your commitments. Write down every 'I'll do X by Y' you say. Then audit: Did you deliver? If not, did you proactively communicate and renegotiate the deadline before you missed it? Reliability is predictability, and predictability reduces cognitive load for your team.",
      
      "Pillar 2: Competence Trust means you're good at what you do—and honest about where you're not. This isn't about being the smartest person in the room. It's about being clear on where you add value and where you need others. McKinsey research shows that leaders who clearly communicate their strengths and development areas are rated 35% more effective than those who don't.",
      
      "Action: Create your 'User Manual.' Write down: (1) What I'm great at (your superpowers), (2) What I'm still developing (your growth edges), (3) How to work with me best (your preferences). Share this with your team. Invite them to do the same. This isn't weakness—it's operational clarity.",
      
      "Pillar 3: Vulnerability Trust is where most leaders struggle—and where the biggest gains live. This is the confidence that you can admit mistakes, share uncertainty, and ask for help without being punished. Google's data is clear: teams with high psychological safety (vulnerability trust) outperform by 19% on productivity and have 27% lower turnover.",
      
      "Action: The 'First Tap' exercise. In your next team meeting, admit one thing you don't know or one mistake you made this week. Make it real, not performative. Watch what happens. Do others open up? Or does silence follow? That tells you the current state of your team's vulnerability trust.",
      
      "Here's the integration: Reliability trust is foundational—without it, nothing else works. Competence trust is necessary—people need to believe you're capable. But vulnerability trust is transformational—it's the difference between functional teams and exceptional ones.",
      
      "In Brazilian Jiu Jitsu, the base position is everything. If your base is unstable, every technique fails. New students try fancy moves before they can maintain posture. They get swept, mounted, submitted—because they skipped the foundation. The same applies to leadership. You can't skip to 'inspiring vision' if your team doesn't trust you at the foundation level.",
      
      "The physical practice: Find a training partner. Stand facing each other, arms extended, palms touching. Partner A pushes with varying pressure. Partner B's job: maintain stable base without falling back. Switch roles. This drill teaches you what physical trust stability feels like. When someone pushes (challenges you), you stay grounded rather than collapsing or pushing back aggressively.",
      
      "This is your Trust Foundation blueprint. In the coming stripe, we'll go deeper into psychological safety—Google's secret weapon. But for now, you have three actions: Track reliability, create your user manual, take your first tap. These aren't theory. They're drills. And drills build skills.",
      
      "Reflect: Which of the three pillars is strongest for you? Which needs the most work? Be honest. Your trust foundation is only as strong as its weakest pillar. Start there."
    ],
    learningObjective: "You will learn the three pillars of trust and receive actionable exercises to begin building your personal trust foundation immediately.",
    duration: "6-8 minutes",
    xpReward: 10
  }
];

export const stripe1Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You're leading a project that's behind schedule. The CEO asks in front of the leadership team: 'Why are we missing deadlines?' You know it's partly due to unclear requirements from the product team, partly due to your team's execution issues. What's the trust-building response?",
    options: [
      "Blame the product team for changing requirements three times this month",
      "Say: 'We hit some execution challenges. I take responsibility and here's our recovery plan'",
      "Deflect: 'The market shifted and we had to adjust our approach'",
      "Provide a detailed technical explanation that obscures accountability"
    ],
    correctAnswer: 1,
    explanation: "Option B demonstrates vulnerability-based trust. Taking responsibility (even when it's not entirely your fault) creates psychological safety for honest problem-solving. Research shows leaders who model accountability have teams with 2x higher trust scores. Blame (Option A) destroys trust. Deflection (Options C & D) signals you're not safe to be honest with. The team is watching: do you own reality or hide from it?",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "It's 11 PM. Your deployment just failed in production. The team is on Slack, stressed and looking for direction. You're not sure yet what caused it. The senior engineer suggests rolling back, but the CTO pushed for this release. What do you do?",
    options: [
      "Immediately roll back to avoid further damage without consulting the CTO",
      "Say: 'I'm assessing options. Current data shows X. I'm deciding in 10 mins. What am I missing?'",
      "Tell the team: 'CTO wanted this release, escalate to him for the decision'",
      "Pretend you know the root cause and give confident (but uncertain) direction"
    ],
    correctAnswer: 1,
    explanation: "Option B is strategic vulnerability under pressure: you're honest about not having full clarity YET while maintaining composure and timeline. You invite input (distributed intelligence) while owning the decision (leadership). Harvard research shows teams led this way recover from incidents 3x faster. Option A might be right tactically but skips stakeholder management. Option C abdicates leadership. Option D (false confidence) destroys trust when people discover you were guessing.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "In a leadership training session, the facilitator asks: 'Share a recent failure.' Everyone else shares safe, minor mistakes. You had a major screw-up last quarter that cost the company €50K and you haven't told this group yet. What's the vulnerability-play?",
    options: [
      "Share a minor, safe failure like everyone else to avoid standing out negatively",
      "Share the €50K mistake with context: what happened, what you learned, what changed",
      "Pass on sharing—you don't know this group well enough yet to be that vulnerable",
      "Share it but minimize: 'We had a small setback last quarter but it's handled now'"
    ],
    correctAnswer: 1,
    explanation: "Option B is strategic vulnerability. You're modeling the depth of honesty that gives others permission to do the same. Brené Brown's research: vulnerability is contagious—when leaders go first with real stories, teams follow. The key is strategic: you share WITH context (what you learned) not just raw emotion. Option A is safe but creates artificial harmony. Option C misses the opportunity to build deeper trust. Option D is the worst—fake vulnerability that people see through, which actually decreases trust.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You've been tracking your commitments for a week. You realize you've missed 40% of your small promises ('I'll send that email by EOD,' 'I'll review your doc tonight'). Your team hasn't said anything. What's the trust-foundation move?",
    options: [
      "Ignore it—they haven't complained, so it's probably fine",
      "Acknowledge it in your next 1-on-1s: 'I've been tracking and I've missed follow-throughs. That's on me. What impact did that have?'",
      "Commit to doing better starting now, but don't bring up the past",
      "Explain why you've been busy and ask for understanding about the delays"
    ],
    correctAnswer: 1,
    explanation: "Option B rebuilds reliability trust through acknowledgment + accountability + curiosity about impact. You can't fix trust breaches by ignoring them (Option A) or by only committing to future behavior (Option C). Excuses (Option D) signal you prioritize being right over being trustworthy. Research shows trust repair requires: (1) acknowledge the breach, (2) understand the impact, (3) commit to specific changes, (4) follow through consistently. The fact that your team hasn't complained doesn't mean trust isn't eroding—it often means they've given up on you being reliable, which is worse.",
    xpReward: 10
  }
];

// Export combined for easy import
export const stripe1Content = {
  lessons: stripe1Lessons,
  checkpoints: stripe1Checkpoints
};

