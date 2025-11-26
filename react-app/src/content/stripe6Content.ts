/**
 * BLUE BELT - STRIPE 6: COMMUNICATION UNDER PRESSURE
 * Theme: High-stakes communication when clarity matters most
 * Focus: Non-verbal communication, tactical standups, real-time feedback, active listening
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

export const stripe6Lessons: Lesson[] = [
  {
    id: 1,
    title: "The 90% Rule: Non-Verbal Communication",
    content: [
      "You're giving your team a motivational talk about hitting Q4 targets. Your words are confident: 'We can do this.' But your shoulders are slumped, your voice is flat, and you're avoiding eye contact. What message is your team receiving? Not the words—the body. Research from Albert Mehrabian shows that when verbal and non-verbal messages conflict, people believe the non-verbal 93% of the time.",
      
      "The breakdown: 7% of communication impact comes from words, 38% from vocal tone (pitch, pace, volume), and 55% from body language (posture, gestures, facial expressions). This doesn't mean words don't matter—it means your body and voice determine whether your words land or not. Say 'I trust you' with crossed arms and a skeptical expression, and your team hears 'I don't trust you' loud and clear.",
      
      "Research from the Strozzi Institute on somatic leadership confirms this: Leaders are constantly 'broadcasting' through their physiology. When you're stressed, your breathing becomes shallow. When you're defensive, your posture closes. When you're uncertain, your gestures become erratic. Your team's nervous systems read these signals below conscious awareness and respond accordingly. They're not deciding whether to trust you—they're feeling whether to trust you.",
      
      "At Just Eat Takeaway during a major system outage, I had to address 50+ operations staff who were panicking. If I'd come in tense and speaking fast, I would have amplified the panic. Instead, I deliberately slowed my breathing, grounded my stance, lowered my vocal pace, and made steady eye contact. My words were: 'This is serious AND we have a plan.' But the non-verbal message was: 'I'm not panicking, so you don't need to either.' The room calmed within 60 seconds because calm is contagious—when it's embodied, not just spoken.",
      
      "The biggest mistake leaders make: They focus on what to SAY without considering how their body is saying it. You prepare the perfect message, deliver it with collapsed posture and anxious energy, then wonder why it didn't land. Your team isn't rejecting your message—they're responding to the incongruence between your words and your state.",
      
      "Here's the practice: Before any high-stakes communication (difficult conversation, team announcement, client negotiation), do a 60-second body check. Notice: Where am I holding tension? (Common: jaw, shoulders, stomach.) How am I breathing? (Most stressed leaders are shallow chest breathing.) What's my posture? (Most are collapsed forward.) Then reset: Ground your feet, roll shoulders back, take 5 deep belly breaths. This isn't performance—it's preparation. You're calibrating your physiology to broadcast the message you intend.",
      
      "Advanced technique from FBI hostage negotiators: Match your vocal pace to your desired outcome. Want to calm someone down? Speak slower than they're speaking. Want to energize a lethargic team? Increase your pace slightly. Your voice is a tool for regulating not just your own nervous system but others' as well. Chris Voss, former lead FBI international kidnapping negotiator, teaches this in 'Never Split the Difference': The voice you use shapes the conversation more than the words.",
      
      "In Brazilian Jiu Jitsu, there's a concept called 'heavy pressure.' It's not about muscular force—it's about body positioning and weight distribution. A 150-pound black belt can make you feel like you're under a truck through positioning alone. A 220-pound white belt just using muscle feels lighter because their weight isn't organized. Heavy pressure is physics, not strength.",
      
      "Communication is the same. Your 'weight' isn't volume or force of words—it's the grounded presence you bring. A leader speaking quietly but with full body alignment and calm energy has more impact than a leader shouting but with anxious, scattered energy. Presence is organized energy. Most leaders are disorganized energy. That's why their words don't land even when their ideas are good.",
      
      "The practice drill: Record yourself giving a 2-minute presentation. Watch it back with the sound OFF. What does your body communicate? Confidence? Anxiety? Authority? Uncertainty? Your body tells the truth your mind edits. Then watch with sound ON but focus on vocal pace, pitch, and tone. Does it match the message you intended? Most leaders are shocked by the gap between intent and impact.",
      
      "Next lesson: Tactical Stand-Ups—how to achieve alignment in 10 minutes through structured communication. But first, do the video exercise. You cannot improve what you don't see. Your non-verbal communication is either supporting your leadership or sabotaging it. Find out which."
    ],
    learningObjective: "You will learn that 93% of communication impact comes from non-verbal cues (55% body, 38% voice, 7% words) and how to calibrate your physiology to broadcast your intended message.",
    duration: "7-9 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "Tactical Stand-Ups: Alignment in 10 Minutes",
    content: [
      "Most team meetings are slow, unfocused, and accomplish little. People show up without prep, discussions wander, decisions don't get made, and an hour disappears with minimal value created. Then leaders wonder why their teams are 'misaligned.' The problem isn't lack of communication—it's lack of structured communication.",
      
      "The Tactical Stand-Up is a military-inspired meeting format designed for maximum information transfer in minimum time. Used by Special Operations units, adapted by Agile software teams, and now standard practice in high-performing operations organizations. The rules are simple but non-negotiable: (1) Stand, don't sit. (2) 10 minutes maximum. (3) Each person shares 3 things only. (4) No discussion—just information. (5) Daily, same time, same place.",
      
      "Why standing? Research shows seated meetings run 34% longer than standing meetings with no quality difference. Standing creates mild physical discomfort that keeps people focused. Navy SEAL teams do stand-ups before missions for this exact reason—sitting invites wandering; standing demands efficiency.",
      
      "The three things each person shares: (1) Progress since last stand-up (what got done). (2) Plan until next stand-up (what's next). (3) Problems blocking progress (what's stuck). That's it. No storytelling, no defending, no deep dives. Just signal: green (progressing), yellow (concerns), red (blocked). If someone raises a blocker, it doesn't get solved in the stand-up—it gets scheduled for a separate working session.",
      
      "At Just Eat Takeaway, we implemented daily 9 AM tactical stand-ups for the operations leadership team (8 people). Before stand-ups: We had 90-minute weekly syncs that felt endless. Issues emerged midweek with no visibility. People worked on conflicting priorities because alignment happened too infrequently. After stand-ups: Daily alignment took 8 minutes. Blockers surfaced within 24 hours, not 7 days. Cross-functional dependencies became visible immediately. We cut our weekly sync to 30 minutes because the stand-up handled 70% of what the weekly used to cover.",
      
      "The ROI is absurd: 8 people × 10 minutes × 5 days = 400 minutes per week = 6.7 hours. That's less time than most teams spend in one inefficient weekly meeting. But the value isn't just time saved—it's rhythm created. Daily touchpoints build momentum. Problems get escalated early. The team develops shared awareness of who's working on what. Silos dissolve because visibility is constant.",
      
      "Common objections: 'We don't need daily meetings, we're all aligned.' (If you're all aligned, the stand-up will prove it and take 5 minutes. If you're not, you just discovered a problem.) 'Standing for 10 minutes is uncomfortable.' (That's the point—discomfort maintains focus.) 'What if someone needs to discuss something?' (Schedule it separately. Stand-ups are for broadcasting, not discussing.) These objections all miss that structure creates efficiency. Unstructured 'let's just talk' meetings are where time dies.",
      
      "The discipline required: START ON TIME even if people are missing. END ON TIME even if someone wants to keep talking. STICK TO FORMAT even when someone wants to tell a story. The first two weeks will feel abrupt. People will resist. By week three, it becomes rhythm. By week six, people will protect it—because they've experienced the value of structured, predictable, efficient alignment.",
      
      "In Brazilian Jiu Jitsu, drilling is repetitive, structured, and time-boxed. 'Triangle chokes for 5 minutes—go.' You're not sparring (that comes later). You're building muscle memory through specific, repeated movement. Drilling feels boring compared to sparring, but it's how you build technical precision. When you spar later, the techniques you drilled appear automatically under pressure. You don't think—you execute.",
      
      "Tactical Stand-Ups are drilling for communication. Same format, same time, same questions, daily repetition. It feels mechanical compared to 'dynamic' brainstorming sessions. But it builds the muscle memory of alignment. When a crisis hits (equivalent to live sparring), your team doesn't need a 2-hour meeting to get aligned—they already have shared awareness from daily stand-ups. They can move immediately.",
      
      "The implementation: Start tomorrow. Gather your team, set a daily time (I recommend morning), explain the format, run the first one. It will feel awkward. People will want to discuss. You'll want to solve blockers in real-time. Resist. Stick to the structure for 3 weeks before evaluating. The value emerges from consistency, not individual meetings. One stand-up is a data point. Twenty stand-ups is a rhythm. Rhythm is where performance lives.",
      
      "Next lesson: Feedback in Real-Time—we'll cover how to give corrective input in the moment, not weeks later in a performance review. But first, implement ONE tactical stand-up this week. Even if it's just a test with your direct reports. Feel the structure. Notice what emerges when you constrain time and format. That constraint is what creates clarity."
    ],
    learningObjective: "You will learn how to implement military-style tactical stand-ups (10 minutes, standing, 3-part structure, daily) that create alignment with 85% less meeting time than traditional syncs.",
    duration: "8-10 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Feedback in Real-Time",
    content: [
      "Your team member just handled a client call poorly. You listened in. They were defensive, talked over the client, and missed three opportunities to de-escalate. You have two choices: (1) Give feedback immediately, or (2) Save it for their quarterly review in 6 weeks. Most leaders choose option 2. This is exactly wrong.",
      
      "Research from the Center for Creative Leadership shows that feedback loses 70% of its impact within 24 hours of the observed behavior. By day 3, it's down to 40%. By week 6? Nearly zero. Why? Because the person's memory of the situation has faded, they've rationalized their behavior, and the feedback feels like ancient history. Real-time feedback—delivered within minutes or hours—lands with full context and maximum learning.",
      
      "But real-time feedback is hard. You're both still emotionally activated. You might say something reactive. They might get defensive. So leaders avoid it, telling themselves they're 'waiting for the right moment.' That moment never comes. The behavior repeats. Frustration builds. Eventually it explodes in an annual review: 'You've been doing X wrong for 6 months.' The team member is blindsided. They feel ambushed. Trust craters.",
      
      "Here's the framework for real-time feedback that works: (1) Regulate yourself first (use the 6-second pause or box breathing if you're triggered). (2) Find private space (within 30 minutes, pull them aside). (3) Describe behavior specifically (not 'you were defensive' but 'when the client raised the pricing concern, you interrupted them twice and your voice got louder'). (4) Share impact ('The client ended the call saying they need to think about it—we lost the close'). (5) Ask for their perspective ('What happened from your view?'). (6) Agree on one specific change for next time.",
      
      "Why this works: It's fast (happens while the situation is fresh), specific (describes observable behavior, not character judgments), and collaborative (asks for their perspective). The person can actually remember the situation and engage with the feedback. Compare this to 6 weeks later: 'In that client call back in October, you were defensive.' They don't remember October. They remember you holding onto this for 6 weeks without saying anything. That's what damages trust, not the feedback itself.",
      
      "At Just Eat Takeaway, I had a manager who would save up feedback for bi-weekly 1-on-1s. By the time we met, she'd have a list of 5-7 things her team had done wrong over two weeks. She thought she was being 'efficient'—one conversation instead of seven. But her team experienced it as an ambush. They'd leave the meetings demoralized, unsure which of the 7 things was most important, and resentful that she'd been 'keeping score' without telling them.",
      
      "I coached her to switch to real-time micro-feedback. Behavior observed → 2-minute private feedback → move on. Within one month, her team's performance improved and their relationship with her strengthened. Why? Because feedback became helpful coaching, not judgmental evaluation. They knew where they stood in real-time, not weeks later.",
      
      "The objection everyone raises: 'But if I'm constantly giving feedback, won't they feel micromanaged?' No—if the feedback is specific, behavior-focused, and delivered with curiosity about their perspective. Micromanagement is controlling HOW people work. Real-time feedback is course-correcting WHAT isn't working. Big difference.",
      
      "In Brazilian Jiu Jitsu, your instructor doesn't watch you drill for 30 minutes then give you a comprehensive critique. They watch you do the move once, stop you, make one correction, have you do it again. Immediate feedback on specific behavior. This accelerates learning by 10x compared to delayed feedback. You don't develop bad habits because errors are corrected in real-time.",
      
      "The discipline: When you observe behavior that needs addressing, commit to delivering feedback within 60 minutes. Not 'when it's convenient.' Not 'in our next 1-on-1.' Within 60 minutes. This creates two benefits: (1) The feedback lands while context is fresh. (2) You don't accumulate resentment by storing issues. You address, resolve, move forward.",
      
      "The boundary: Real-time feedback is for behavior within the person's control. Not for systemic issues, not for personality traits, not for context you don't fully understand. If you see behavior you can't interpret (maybe they're stressed about something you don't know), ask questions before giving feedback: 'I noticed you were quieter than usual in that meeting. Everything okay?' Sometimes what looks like performance issues is personal context.",
      
      "Next lesson: Listening as a Combat Sport—how world-class listeners create competitive advantage. But first, practice real-time feedback once this week. Observe behavior that needs course-correction, regulate yourself, deliver feedback within 60 minutes using the 6-part framework. Notice: Did it improve the behavior? Did it damage the relationship? If you're specific, private, and curious, it will improve behavior AND strengthen relationship because you cared enough to help them improve in the moment."
    ],
    learningObjective: "You will learn why feedback loses 70% of impact within 24 hours and master the 6-part framework for delivering real-time course corrections within 60 minutes of observed behavior.",
    duration: "8-10 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Listening as a Combat Sport",
    content: [
      "Most people think listening is passive—you sit quietly while someone talks. They're wrong. World-class listening is active, athletic, and exhausting. It's a combat sport where you're fighting your own ego, assumptions, and impulse to speak. And like any combat sport, most people lose because they never trained the skill.",
      
      "Research from Harvard Business School shows that executives spend 45% of their work time listening, but only 25% of what they hear is retained and understood. This isn't an attention problem—it's a technique problem. People confuse 'hearing words' with 'listening to meaning.' Hearing is passive. Listening is active extraction of understanding despite barriers (noise, emotion, poor communication from the speaker).",
      
      "Stephen Covey said: 'Most people don't listen with the intent to understand; they listen with the intent to reply.' This is the fundamental error. While someone is speaking, you're crafting your response, planning your rebuttal, or thinking about how this relates to your experience. You're not listening—you're waiting to talk. The speaker feels this. Everyone does.",
      
      "The neuroscience explains why this is hard: Your brain processes information at 400-500 words per minute. Most people speak at 125-150 words per minute. That gap creates 'spare cognitive capacity' that your mind fills with thoughts about other things. World-class listeners use that spare capacity deliberately: they're not passively receiving—they're actively processing. They're testing assumptions, identifying emotion beneath words, noticing what's NOT being said.",
      
      "At Just Eat Takeaway, I had an operations lead complaining about the tech team: 'They don't understand our needs. They build what they want, not what we need. We keep giving feedback and nothing changes.' My first instinct was to defend tech (I thought they were doing great work). But I suppressed that and asked: 'Help me understand. When you say they don't understand your needs, what specifically have you asked for that hasn't been delivered?' That question opened 20 minutes of specific examples I hadn't known about. If I'd led with my defense, I'd have missed all of it.",
      
      "The listening technique that works: After someone finishes speaking, pause for 2 seconds (fights your impulse to jump in), then say: 'What I'm hearing is [summarize in your own words]. Did I get that right?' This does three things: (1) Confirms you actually understood (often you didn't), (2) Signals you were listening (they feel heard), (3) Gives them a chance to clarify or add nuance. This simple pattern—listen, pause, reflect back, confirm—transforms conversation quality.",
      
      "Chris Voss, FBI negotiator, teaches a advanced version called 'tactical empathy.' You're not just reflecting content—you're naming the emotion beneath it. 'It sounds like you're frustrated because your team's feedback isn't being incorporated, and that makes you feel like operations isn't valued. Is that right?' When you name the emotion accurately, people feel deeply understood. Their defensiveness drops. Their willingness to problem-solve increases. Tactical empathy isn't soft—it's strategic.",
      
      "The hardest listening moment: when someone is criticizing you or your work. Every fiber wants to defend, explain, justify. That impulse is your ego protecting itself. But the moment you start defending is the moment you stop listening. And if you're not listening, you can't learn what might be valid in their criticism—even if delivery is poor.",
      
      "In Brazilian Jiu Jitsu, there's a drill called 'Shark Tank' where one person rolls (spars) continuously while fresh partners rotate in every 2-3 minutes. It's exhausting. You're tempted to muscle through with strength. But strength runs out. The only way to survive Shark Tank is technique and efficiency—using exactly the right amount of energy, no more. You have to listen to your body's signals: heart rate, breathing, muscle fatigue. Ignore those signals, you gas out and get submitted repeatedly.",
      
      "Listening in high-stakes conversations is Shark Tank for your attention. You're tired. You're emotionally activated. You want to shortcut to your response. But shortcutting costs you understanding. The discipline is: Keep listening even when it's hard. Even when you disagree. Even when you're formulating brilliant rebuttals. Those rebuttals will be there in 60 seconds. First, fully understand what you're rebutting.",
      
      "The metric for listening quality: Can you summarize the other person's position so accurately that they say 'Yes, exactly'? If not, you didn't listen well enough. This is the standard Chris Voss uses in hostage negotiations: 'Can I restate your position better than you stated it?' That level of understanding gives you influence because the person feels fully heard. Only then can you offer your perspective and have it land.",
      
      "Next stripe: Team Rhythm—we'll build the cadences and protocols that make high-performance sustainable. But first, practice tactical listening in one difficult conversation this week. After they speak, pause for 2 seconds (fight the impulse), then: 'What I'm hearing is X. Did I get that right?' Repeat until they say yes. Only then offer your view. Notice how this changes the conversation dynamic. That's listening as a combat sport—you're battling your own impulses to create understanding."
    ],
    learningObjective: "You will learn why listening is an active combat sport (fighting ego/assumptions/impulse to reply) and master tactical empathy techniques from FBI hostage negotiation.",
    duration: "8-10 minutes",
    xpReward: 10
  }
];

export const stripe6Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "You need to deliver bad news to your team: the project they've worked on for 3 months is being canceled due to budget cuts. You've prepared what to say, but you notice you're anxious (tight shoulders, shallow breathing). According to the 90% Rule, what should you do BEFORE delivering the message?",
    options: [
      "Deliver it immediately while you have courage—waiting will make it harder",
      "Take 60 seconds to ground your feet, roll shoulders back, and do 5 deep breaths to reset your physiology",
      "Write it in an email instead to avoid the non-verbal betraying your anxiety",
      "Have your boss deliver it since they're less emotionally connected"
    ],
    correctAnswer: 1,
    explanation: "Option B prepares your non-verbal communication to match your message. With 93% of impact from non-verbal (55% body + 38% voice), delivering bad news while broadcasting anxiety through your body will amplify panic, not contain it. Strozzi Institute research: leaders who regulate physiology before difficult communications are rated 40% more effective. Option A delivers the message but contaminates it with anxious energy. Option C (email) removes your ability to read the room and respond. Option D abdicates. The 60 seconds of regulation isn't delay—it's preparation. You're calibrating your broadcast signal to convey: 'This is serious news AND we're going to handle it' rather than 'This is serious news AND I'm panicking.'",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "You're implementing daily tactical stand-ups. On day 3, one team member starts telling a 5-minute story about why their task is blocked. The stand-up is running long. What do you do?",
    options: [
      "Let them finish—cutting them off would seem rude and damage psychological safety",
      "Interrupt: 'Hold that story. You're blocked—got it. Let's schedule 30 minutes after this to dive into it.'",
      "Suggest: 'Maybe we should make stand-ups longer to accommodate these discussions'",
      "Let it go today, send a reminder email about format after the meeting"
    ],
    correctAnswer: 1,
    explanation: "Option B maintains the stand-up structure while respecting their blocker. Research shows standing meetings are 34% shorter—but only if you enforce the format. Letting storytelling continue (Option A) teaches everyone the time limit doesn't matter. Option C defeats the purpose (stand-ups are for broadcast, not discussion). Option D is too passive. The key insight: Interrupting to redirect isn't rude if you're redirecting to a BETTER forum for the discussion. You're saying: 'This is important AND it deserves more than stand-up time. Let's give it proper attention.' That's actually more respectful than letting them burn stand-up time when the issue needs deep work.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "In a 1-on-1, your team member says: 'I'm frustrated with how slowly decisions are made here.' You immediately think of three good reasons why decisions take time (stakeholder complexity, data gathering, risk assessment). According to tactical listening principles, what do you say FIRST?",
    options: [
      "Explain the three reasons to help them understand the context",
      "Pause 2 seconds, then: 'What I'm hearing is you're frustrated by decision speed. Tell me more—what decision is top of mind?'",
      "Ask: 'Have you considered that good decisions take time?'",
      "Validate: 'I understand, a lot of people feel that way'"
    ],
    correctAnswer: 1,
    explanation: "Option B implements the listen-pause-reflect-confirm sequence. You're fighting your impulse to explain/defend and instead seeking deeper understanding. Chris Voss' research: the person who listens best controls the conversation because they have the most information. Your three reasons might be valid, but if you don't understand WHICH decisions they're frustrated about and WHY, your explanation will miss the mark. Option A is the ego's defensive reflex. Option C is passive-aggressive. Option D validates without understanding. Tactical listening requires: pause (regulate impulse), reflect (demonstrate understanding), confirm (test accuracy), THEN respond. Most leaders skip straight to responding, which is why their responses don't land.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "You're recording yourself for the non-verbal assessment exercise. Watching back (sound OFF), you notice: hunched shoulders, frequent hand-wringing, minimal eye contact, fidgety movements. What does this body language communicate regardless of your words?",
    options: [
      "Thoughtfulness and careful consideration",
      "Uncertainty, anxiety, and low confidence",
      "Professionalism and focus",
      "Approachability and openness"
    ],
    correctAnswer: 1,
    explanation: "Option B is what research on non-verbal communication confirms. Hunched shoulders = closed/defensive posture. Hand-wringing = anxiety or discomfort. Avoided eye contact = uncertainty or discomfort. Fidgeting = nervous energy. This body language broadcasts: 'I'm not confident in what I'm saying.' Even if your words are assertive, your body is undermining them. Mehrabian's research: when verbal and non-verbal conflict, people believe non-verbal 93% of the time. This isn't judgment—it's diagnostic data. Now you know your broadcast signal isn't matching your intended message. The fix: practice open posture (shoulders back), steady hands, sustained eye contact, and stillness. Your body should broadcast: 'I'm grounded in what I'm saying.' That's what creates presence.",
    xpReward: 10
  }
];

export const stripe6Content = {
  lessons: stripe6Lessons,
  checkpoints: stripe6Checkpoints
};

