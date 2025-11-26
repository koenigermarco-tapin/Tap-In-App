/**
 * WHITE BELT - STRIPE 3: SELF-LEADERSHIP
 * Theme: Leading yourself before leading others
 * Focus: Emotional regulation, baseline assessment, physical stability
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

export const stripe3Lessons: Lesson[] = [
  {
    id: 1,
    title: "Leading Yourself First",
    content: [
      "You can't give what you don't have. If you're not grounded, you can't create stability for your team. If you're reactive, you can't create thoughtful culture. If you're disconnected from yourself, you can't build trust with others. Self-leadership isn't selfish—it's prerequisite.",
      
      "Research from the Center for Creative Leadership shows that 'derailment' (when high-potential leaders fail) isn't caused by lack of technical skills or strategic thinking. It's caused by poor self-awareness and inability to manage their own emotional responses under pressure. 75% of leadership failures trace back to self-regulation issues, not competence gaps.",
      
      "Bill George, former CEO of Medtronic and Harvard professor, studied 125 successful leaders for his book 'Authentic Leadership.' His finding: The leaders who sustained performance over decades all had rigorous self-leadership practices—daily reflection, clear values, emotional regulation techniques, physical disciplines. None of them winged it.",
      
      "Here's what self-leadership looks like in practice: You know your triggers (what situations make you reactive). You know your patterns (how you behave under stress). You have practices that keep you grounded (physical, mental, emotional). You catch yourself before you respond poorly. You course-correct in real-time.",
      
      "At Just Eat Takeaway during COVID, I was managing 50+ critical escalations daily. Angry customers, stressed drivers, overwhelmed dispatchers, anxious executives. In the first two weeks, I was constantly reactive—snapping at people, making rushed decisions, working 18-hour days and accomplishing less.",
      
      "Then I remembered a lesson from jiu-jitsu: When you're exhausted and panicking, you get submitted. When you're breathing and methodical, you find escapes. I started structuring my days: 6 AM workout (non-negotiable), 15-minute pause between meetings (process and breathe), 9 PM hard stop (protect sleep). Within a week, my decision quality doubled while my hours dropped by 20%.",
      
      "The paradox of self-leadership: Taking time for yourself feels like you're taking time AWAY from your team. But research from Teresa Amabile at Harvard shows the opposite. Leaders who maintain self-care practices (physical exercise, adequate sleep, reflection time, boundaries) are rated 25% more effective by their teams than leaders who 'sacrifice everything' for work.",
      
      "Why? Because self-regulated leaders don't bleed their stress onto their teams. They don't make panicked decisions. They don't create artificial urgency. They model sustainable performance, not burnout theater. Your team learns more from how you manage yourself than from any presentation you give.",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'posture.' It's not about sitting up straight—it's about maintaining structural integrity under pressure. When someone's in your guard trying to pass, your posture determines everything. Good posture: you control the distance, dictate the pace, choose your reactions. Bad posture: you're reactive, defensive, getting swept.",
      
      "Leadership posture is the same. When you're grounded (physically, emotionally, mentally), you respond rather than react. You create space instead of collapsing under pressure. You choose your moves rather than being moved by circumstances.",
      
      "Here are three non-negotiables for self-leadership: (1) Physical anchor—some form of physical practice that grounds you in your body (running, lifting, yoga, martial arts, whatever moves you). (2) Mental space—structured time to process, reflect, plan (15 minutes daily minimum). (3) Clear boundaries—when you're on, you're fully on; when you're off, you're actually off. No 'always accessible' martyrdom.",
      
      "In the next lesson, we'll dive into emotional regulation under fire—the specific techniques for managing your nervous system when everything's chaotic. For now, audit your last month: How many days did you do something physical? How much time did you spend in reflection? How well did you maintain boundaries? Those three numbers predict your leadership effectiveness more than your strategic thinking does."
    ],
    learningObjective: "You will learn why self-leadership is prerequisite to team leadership and identify the three non-negotiables (physical anchor, mental space, boundaries) for sustainable performance.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Emotional Regulation Under Fire",
    content: [
      "It's 2 PM on a Friday. You just found out your biggest client is threatening to leave. Your boss wants answers in 30 minutes. Your team is looking at you. You feel your heart rate spike, your jaw clench, your thoughts race. This is the moment that defines your leadership—not your strategy deck or your org chart.",
      
      "Neuroscience research from the Neuroleadership Institute shows that under stress, your amygdala (threat detection center) can hijack your prefrontal cortex (rational thinking center). This is called an 'amygdala hijack.' When hijacked, your IQ effectively drops 10-15 points. You're literally less smart when you're dysregulated.",
      
      "The hijack happens because your nervous system evolved to keep you alive, not help you think clearly. When your brain perceives threat (even non-physical threat like professional embarrassment), it triggers fight-flight-freeze. Blood flow moves from your prefrontal cortex to your limbic system. Cortisol and adrenaline flood your bloodstream. You're ready to fight or run—but you're not ready to strategize.",
      
      "Jocko Willink, former Navy SEAL commander, says: 'Calm is contagious. So is panic.' Your team's nervous system mirrors yours. If you're regulated, they regulate. If you're panicking, they panic. This isn't motivation—it's biology. Mirror neurons in the brain cause people to unconsciously mimic the emotional state of whoever has authority in the room.",
      
      "So how do you regulate under fire? Not positive thinking. Not 'fake it till you make it.' But actual nervous system techniques that work in seconds. Here are the four that research and practice have proven most effective:",
      
      "Technique 1: Box Breathing. Inhale for 4 counts. Hold for 4 counts. Exhale for 4 counts. Hold for 4 counts. Repeat 3 times. This activates your parasympathetic nervous system (rest-and-digest) and overrides the sympathetic (fight-or-flight). Navy SEALs use this before combat. You can use it before difficult meetings.",
      
      "Technique 2: The 6-Second Pause. When you feel triggered, create 6 seconds of space before responding. Count silently: '1-Mississippi, 2-Mississippi...' to 6. Research shows the chemical cascade of an emotional reaction peaks at 6 seconds and begins to subside if you don't fuel it with thoughts or words. That pause prevents 90% of regrettable responses.",
      
      "Technique 3: Name It to Tame It. Dr. Dan Siegel's research shows that simply labeling your emotional state ('I'm feeling anxious right now' or 'I notice I'm getting defensive') reduces the intensity of the emotion by 30-40%. Why? Activating the language center of your brain (Broca's area) dampens activity in the amygdala. You can't be fully hijacked while you're observing yourself.",
      
      "Technique 4: Ground Through Your Feet. When you're emotionally flooding, you're literally 'in your head'—all your awareness is stuck in racing thoughts. Shifting attention to physical sensation interrupts the loop. Feel your feet on the floor. Press them down deliberately. Notice the contact. This pulls you back into your body and out of thought-spiral.",
      
      "At Just Eat Takeaway, I had a ritual before every high-stakes meeting: 60 seconds alone, box breathing, feet on floor, one question: 'What does this team need from me right now?' Not 'What do I need to prove?' Not 'How do I defend myself?' Just 'What do they need?' That reframe moved me from reactive to responsive. Reactivity is driven by self-protection. Responsiveness is driven by service.",
      
      "The practice isn't about never getting triggered—you will. It's about reducing the time between trigger and recovery. Amateurs stay hijacked for hours. Professionals recover in minutes. Masters recover in seconds. That recovery speed determines your leadership ceiling.",
      
      "In Brazilian Jiu Jitsu, you learn to 'breathe through the pressure.' When someone has you in side control, your instinct is to panic, hold your breath, and thrash. That's exactly wrong—it exhausts you and makes the position worse. The practice is: exhale slowly, stay methodical, wait for the opening. The one who stays calm wins.",
      
      "I've rolled with black belts who put me in terrible positions—mount, back control, deep submissions—and I can feel their heartbeat against me. It's slow. Calm. They're physically crushing me while remaining emotionally neutral. That's mastery. That's what your team needs in crisis: your physical presence putting in effort while your nervous system stays regulated.",
      
      "Next lesson: Your leadership baseline assessment—we'll identify your current patterns so you know exactly where you're starting. For now, pick ONE of the four techniques (box breathing, 6-second pause, name it to tame it, ground through feet) and use it deliberately the next time you feel triggered. Just once. Notice what shifts."
    ],
    learningObjective: "You will learn the neuroscience of emotional hijacks and four evidence-based techniques (box breathing, 6-second pause, name it, ground) to regulate your nervous system under pressure.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Your Leadership Baseline Assessment",
    content: [
      "You can't improve what you don't measure. Most leaders operate on assumptions about their effectiveness ('I think I'm pretty self-aware') without any actual data. This lesson gives you the framework to assess your current leadership baseline across five dimensions that research shows predict performance.",
      
      "Peter Drucker said: 'You can't manage what you can't measure.' Bill Campbell, legendary Silicon Valley coach to Steve Jobs, Jeff Bezos, and Eric Schmidt, started every coaching relationship the same way: 'Before we fix anything, we need to know where you actually are—not where you think you are.'",
      
      "The five dimensions: (1) Self-Awareness, (2) Self-Regulation, (3) Energy Management, (4) Relational Capacity, (5) Recovery Practices. These aren't soft—they're predictive. Research from the Consortium for Research on Emotional Intelligence in Organizations shows these five factors account for 58% of variance in leadership performance across all job levels.",
      
      "Dimension 1: Self-Awareness. Do you know your triggers (what situations make you reactive)? Do you know your patterns (how you behave under stress)? Can you predict how you'll show up in challenging situations? Rate yourself 1-10: How accurately do you see yourself? Then ask 3 trusted colleagues to rate you. If there's a 2+ point gap, your self-awareness needs work.",
      
      "Dimension 2: Self-Regulation. When triggered, how quickly do you recover? Hours? Minutes? Seconds? How often do you say or do things you later regret? How well do you manage your emotional state when stakes are high? Track this for a week: Every time you get triggered, note how long until you're back to baseline. That's your regulation speed. Under 5 minutes is good. Under 60 seconds is mastery.",
      
      "Dimension 3: Energy Management. How many hours of quality work can you sustain in a day? How's your sleep (quantity and quality)? How's your physical fitness? Do you take breaks or power through? Research from Tony Schwartz and the Energy Project shows that energy, not time, is the fundamental currency of performance. You can have 12 hours available but only 3 hours of useful capacity if your energy is mismanaged.",
      
      "Dimension 4: Relational Capacity. How many high-quality relationships can you maintain simultaneously? How present are you in conversations? How well do you read people's emotional states? Do you have trusted peers you can be vulnerable with? Research shows high performers have 3-5 'crucible relationships'—people who will tell you hard truths. Do you? Name them. If you can't quickly name 3 people who challenge you, you're in an echo chamber.",
      
      "Dimension 5: Recovery Practices. What do you do to recharge? Do you have daily, weekly, and quarterly recovery rituals? Or do you just work until you collapse? Greg McKeown's research in 'Essentialism' shows that deliberate recovery isn't optional—it's how the nervous system prevents burnout. No recovery = diminishing returns on effort. You work more, accomplish less.",
      
      "Here's how to do your baseline assessment: For each of the five dimensions, rate yourself 1-10 (10 = mastery, 1 = needs significant work). Be brutally honest. Then identify one specific behavior or metric that would prove you're improving. Examples: Self-regulation = 'recovery time after trigger drops from 15 minutes to 5 minutes.' Energy management = 'I sleep 7+ hours on 6 out of 7 nights.'",
      
      "At Just Eat Takeaway, I did this assessment every quarter. First time through: Self-awareness 7, Self-regulation 5, Energy 4, Relational 6, Recovery 3. That '3' in recovery was why everything else was suffering. I was working 70-hour weeks with no structure. My energy was shot, which made me more reactive, which damaged relationships. I focused recovery first (sleep, exercise, boundaries). Within 8 weeks, every other dimension improved 1-2 points.",
      
      "The insight: These dimensions are interconnected. You can't patch one in isolation. But you CAN identify the keystone—the one dimension that, if improved, lifts the others. For most leaders, it's recovery or energy management. Fix your sleep and exercise, and your regulation improves. Regulate better, and your relationships improve.",
      
      "In Brazilian Jiu Jitsu, you learn positional hierarchy: mount beats side control beats guard beats standing. If you don't know which position you're in, you can't know which technique to use. Same with leadership—if you don't know your baseline, you're just guessing at what to improve.",
      
      "The physical practice: Record yourself in a challenging meeting (with permission). Watch it back with the sound off. What does your body language communicate? Tension? Openness? Defensiveness? Calm? Your body tells the truth your mind edits. This is your leadership baseline—not what you intend to project, but what you actually project.",
      
      "Next lesson: The Base Position—we'll connect physical stability to mental clarity through embodied practice. But first, complete your baseline assessment. Five dimensions, 1-10 rating, one measurable behavior per dimension. Write it down. Share it with someone who'll hold you accountable. This is your starting point. Everything we build from here starts from this truth."
    ],
    learningObjective: "You will assess your leadership baseline across five research-validated dimensions (self-awareness, regulation, energy, relationships, recovery) and identify your keystone area for improvement.",
    duration: "8-10 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "The Base Position: Physical Stability Meets Mental Clarity",
    content: [
      "In Brazilian Jiu Jitsu, 'base' is everything. Lose your base, lose the position. Lose the position, get submitted. Every technique, every transition, every escape starts from a stable base. And base isn't just physical—it's the integration of body structure, breath control, and mental focus.",
      
      "This isn't metaphor—it's biology. Research from the Strozzi Institute on 'somatic leadership' shows that your physical state directly shapes your mental and emotional capacity. Stand with chest collapsed and shoulders forward, your brain literally has less access to executive function. Stand with an open chest and grounded feet, your cognition improves measurably.",
      
      "Dr. Amy Cuddy's research at Harvard on 'power posing' showed that holding expansive physical positions for 2 minutes increases testosterone (confidence hormone) by 20% and decreases cortisol (stress hormone) by 25%. Your physiology isn't separate from your psychology—it's the foundation of it. Change your body, change your brain.",
      
      "Here's what a stable leadership 'base position' looks like: Feet shoulder-width apart, weight evenly distributed, knees slightly bent (not locked), spine neutral (not rigid), shoulders back and down, chest open, head balanced over spine. Breath is slow and deep—belly rising on inhale, falling on exhale. Eyes are focused but not fixed. You're alert but not tense.",
      
      "Why does this matter in business? Because when you're in meetings, on calls, giving presentations, having difficult conversations—your physical state is either supporting or sabotaging you. Most leaders are physically collapsed (hunched over laptops), holding their breath (shallow chest breathing), or locked up (tense shoulders, clenched jaw). Then they wonder why they feel anxious or foggy.",
      
      "The practice is simple but not easy: Before every important interaction, take 30 seconds to establish your base. Stand up. Feel your feet on the ground. Roll your shoulders back. Take three deep belly breaths. Reset your posture. Then enter the meeting. The difference in your presence will be immediate—your team will feel it even if they can't name it.",
      
      "At Just Eat Takeaway, I started using 'body checks' throughout the day. Every hour, I'd notice: Where am I holding tension? (Usually jaw and shoulders.) How am I breathing? (Usually shallow.) Where's my posture? (Usually collapsed.) Then I'd spend 60 seconds resetting: feet grounded, shoulders back, 5 deep breaths. My decision quality improved. My energy lasted longer. My team said I seemed 'more present.'",
      
      "The research backs this up. Richard Strozzi-Heckler, who trained U.S. Special Forces in embodied leadership, found that operators who learned to maintain physical centering under stress had 37% better decision-making scores and 42% faster recovery from mistakes than those who relied only on mental techniques. Your body is the platform your mind runs on. Optimize the platform.",
      
      "In Brazilian Jiu Jitsu, white belts learn this the hard way: When you're rolling and you lose your base—maybe your hips come too high, or you lean too far forward, or your weight shifts unevenly—your opponent immediately capitalizes. Sweep. Pass. Submit. The punishment for bad base is swift and clear.",
      
      "In business, bad base also gets punished—but it's slower and harder to see. You make slightly worse decisions. You're slightly less present in conversations. You're slightly more reactive under pressure. These 'slightly' compounds over weeks and months into 'significantly' worse outcomes. Career derailment often traces back to leaders who never learned to manage their physical state.",
      
      "The physical drill: Practice 'Base Under Pressure.' Have a training partner push against your chest with both hands while you maintain your base position. They vary the pressure (light, medium, strong) while you stay grounded. The goal isn't to push back—it's to absorb pressure without collapsing or being moved. This trains your nervous system to stay stable when challenged.",
      
      "Advanced version: While being pushed, carry on a conversation. This simulates business reality—you're under pressure (difficult negotiation, challenging feedback, unexpected crisis) while needing to think clearly and communicate effectively. If your body destabilizes, your mind follows.",
      
      "You've now completed White Belt Stripe 3: Self-Leadership. You understand that you must lead yourself before leading others. You have techniques for emotional regulation. You've assessed your baseline. You've learned that physical stability enables mental clarity. This isn't preparation for leadership—this IS leadership. The quality of your internal state determines the quality of your external impact.",
      
      "Next stripe: Vulnerability in Action—where we take everything you've built and put it into practice through the hardest leadership moments. But before that, practice your base position every day for a week. Morning: 2 minutes of base work before starting your day. Throughout: Reset your base before each important interaction. Evening: Notice how your physical state affected your performance. This practice will serve you for your entire career."
    ],
    learningObjective: "You will learn how physical stability (base position) directly impacts mental clarity and decision-making, plus a practical drill to train stability under pressure.",
    duration: "8-10 minutes",
    xpReward: 10
  }
];

export const stripe3Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You've been working 70-hour weeks for the past month on a critical project. You're exhausted, short-tempered with your team, and your decision quality is slipping. Your boss praises your 'dedication' and asks you to maintain this pace through the next quarter. What's the self-leadership move?",
    options: [
      "Agree to the pace—leadership requires sacrifice and your team needs you",
      "Say: 'I can sustain 50 quality hours, not 70 declining hours. Here's how we redesign the work.'",
      "Delegate more to your team so you can reduce your hours",
      "Push through but start looking for a less demanding job"
    ],
    correctAnswer: 1,
    explanation: "Option B demonstrates mature self-leadership: you recognize that quantity ≠ quality, and you propose a solution rather than just complaining. Teresa Amabile's Harvard research shows leaders who maintain self-care boundaries are rated 25% more effective. You're not being selfish—you're protecting your team from a leader running on empty. Option A is martyr leadership that ends in burnout. Option C might work tactically but doesn't address the systemic issue. Option D is giving up. The self-leadership lesson: your boundaries aren't about what you can endure—they're about what your team deserves from you (a grounded, effective leader).",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You're in a board meeting. A board member challenges your quarterly results in a way that feels personal and unfair. You feel your heart rate spike and your jaw clench. You have about 10 seconds before you need to respond. What technique do you use?",
    options: [
      "Immediately defend yourself with data to maintain credibility",
      "Use the 6-second pause: count silently to 6, then respond calmly",
      "Name it to tame it: 'I notice I'm feeling defensive right now' out loud to the board",
      "Ground through your feet while box breathing (inhale 4, hold 4, exhale 4, hold 4)"
    ],
    correctAnswer: 1,
    explanation: "Option B (6-second pause) is the most appropriate for this context. Research shows the amygdala hijack peaks at 6 seconds—the pause lets the chemical cascade subside so you can engage your prefrontal cortex. Option A (immediate defense) is exactly what the hijack wants you to do—you'll likely escalate. Option C (name it externally) is too vulnerable for a board setting where you need to project confidence. Option D (box breathing + grounding) takes too long—you'd be sitting silently for 20+ seconds which looks odd. The 6-second pause is invisible to others but gives you just enough space to shift from reactive to responsive. Jocko's principle: 'Calm is contagious.' Your regulated response resets the room's energy.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "You complete your leadership baseline assessment. Your scores: Self-Awareness 8, Self-Regulation 7, Energy Management 4, Relational Capacity 7, Recovery Practices 3. Where should you focus first?",
    options: [
      "Self-Awareness (your highest score)—double down on your strength",
      "Self-Regulation (strong but could be better)—get to mastery",
      "Recovery Practices (your lowest score)—it's likely the keystone affecting everything else",
      "Work on all five equally—balanced improvement is best"
    ],
    correctAnswer: 2,
    explanation: "Option C (Recovery) is your keystone. Research from the Energy Project shows recovery practices underpin all other dimensions. Your low energy (4) is likely caused by poor recovery (3). When you're exhausted, your regulation suffers, relationships suffer, even self-awareness drops. These dimensions are interconnected, not independent. Option A (doubling down on strength) ignores that your foundation is cracked. Option B (regulation) treats a symptom, not the root cause. Option D (equal focus) dilutes effort. The pattern in this data: you're a high-performer (8,7,7 in awareness/regulation/relationships) who's running themselves into the ground (4,3 in energy/recovery). Fix sleep, exercise, and boundaries, and watch the other scores climb by 1-2 points within weeks.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're about to deliver difficult feedback to a senior engineer who's been underperforming. You notice your shoulders are tense, your breathing is shallow, and you feel nervous. You have 2 minutes before the meeting. What do you do?",
    options: [
      "Review your notes one more time to feel more prepared",
      "Do the base position practice: ground feet, open chest, 5 deep belly breaths",
      "Send a quick Slack to your boss for moral support",
      "Skip the prep and wing it—you know what needs to be said"
    ],
    correctAnswer: 1,
    explanation: "Option B (base position) directly addresses the physical state that's undermining your mental clarity. Strozzi Institute research shows physical centering improves decision-making by 37% under stress. Your tense shoulders and shallow breathing signal your nervous system is in threat mode—reviewing notes (Option A) won't fix that, it might increase anxiety. Option C is procrastination. Option D ignores the preparation you need. The embodied leadership insight: your physical state determines your conversational capacity. Enter the meeting collapsed and tense, you'll be defensive and unclear. Enter grounded and breathing, you'll be direct and compassionate. Two minutes of base work beats 20 minutes of mental rehearsal because you're optimizing the platform (your body) that your mind runs on.",
    xpReward: 10
  }
];

export const stripe3Content = {
  lessons: stripe3Lessons,
  checkpoints: stripe3Checkpoints
};

