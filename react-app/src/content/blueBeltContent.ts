// BLUE BELT: Fear of Conflict - Learning Healthy Debate
// 4 Stripes × 4 Lessons = 16 Lessons Total

export interface Lesson {
  id: number;
  title: string;
  content: string[];
  keyInsight: string;
  practiceExercise: string;
  researchCitation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
}

export interface Stripe {
  number: number;
  name: string;
  theme: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export const blueBeltContent: Stripe[] = [
  // STRIPE 1: DIFFICULT CONVERSATIONS
  {
    number: 1,
    name: "Difficult Conversations",
    theme: "Mastering the Art of Addressing Issues Head-On",
    lessons: [
      {
        id: 1,
        title: "The Cost of Avoiding Conflict",
        content: [
          "Most teams don't fail because they have too much conflict—they fail because they have too little. Artificial harmony feels safe in the moment but creates slow-motion disasters over time.",
          "**What happens when conflict is avoided:** Problems compound silently. Small issues become large crises. Resentment builds beneath polite surfaces. Decisions get made without full information because people won't voice concerns. Teams move slowly because important disagreements never get resolved.",
          "Research from organizational psychology shows that teams with moderate levels of task conflict (disagreement about ideas, not personalities) outperform both high-conflict and low-conflict teams. The sweet spot is 'productive friction'—enough disagreement to surface better ideas, not so much that it becomes personal.",
          "**The types of conflict that matter:** Task conflict (how should we solve this problem?) is productive. Process conflict (who should do what?) can be managed. Relationship conflict (I don't like you) is toxic and should be addressed quickly or terminated.",
          "Leadership consultant Patrick Lencioni's research found that teams without conflict experience 'tension without resolution.' Issues simmer below the surface, erupting in passive-aggressive behavior, hallway complaints, and disengagement. Healthy teams argue about ideas, not people.",
          "**The false choice:** Leaders often think the choice is between 'nice' (avoid conflict) or 'mean' (constant fighting). The real choice is between fake harmony (dangerous) and productive conflict (powerful). You want disagreement with respect, not agreement without thought."
        ],
        keyInsight: "Artificial harmony is more dangerous than productive conflict.",
        practiceExercise: "This week: Identify one issue your team is avoiding. Name it explicitly in your next meeting: 'I think we're avoiding discussing X. Can we talk about it now?' Observe what happens when you break the silence.",
        researchCitation: "Lencioni's research on team conflict and Edmondson's work on productive disagreement (2002-2018)"
      },
      {
        id: 2,
        title: "Preparing for Difficult Conversations",
        content: [
          "Most difficult conversations fail before they start—not because of what was said, but because of inadequate preparation. Flying by feel guarantees emotional escalation.",
          "**The Difficult Conversations Framework** (from Harvard Negotiation Project): Every hard conversation has three layers: (1) The 'What Happened' conversation (facts and interpretations), (2) The Feelings conversation (emotions at play), (3) The Identity conversation (what this means about me).",
          "**Before the conversation, clarify:** What's my actual concern? (Be specific, not vague.) What outcome do I want? (Not just venting.) What's my contribution to this problem? (Rarely zero.) What assumptions am I making about the other person's intent? (Often wrong.)",
          "Research from difficult conversations expert Douglas Stone shows that 90% of difficult conversations go wrong because people enter with hidden agendas, unexamined assumptions, or blame-focused framing. The person who prepares wins.",
          "**Script your opening line.** Not the whole conversation—just how you'll start. Weak opening: 'We need to talk about your performance.' Strong opening: 'I've noticed our project timelines have been slipping. I'd like to understand what's happening from your perspective.'",
          "**Timing and setting matter.** Don't ambush people. Give notice: 'I'd like to discuss X with you. When's a good 30-minute window this week?' Meet in neutral space, not your office (power dynamic). Eliminate distractions (no phones, no interruptions)."
        ],
        keyInsight: "Preparation transforms difficult conversations from emotional explosions into productive exchanges.",
        practiceExercise: "Identify one difficult conversation you've been avoiding. Write down: (1) The specific issue, (2) The outcome I want, (3) My contribution to the problem, (4) One assumption I'm making about the other person. Then schedule the conversation.",
        researchCitation: "Harvard Negotiation Project's 'Difficult Conversations' framework (Stone, Patton, Heen, 1999)"
      },
      {
        id: 3,
        title: "The Conversation Structure That Works",
        content: [
          "Once you're in the conversation, most people wing it. That's when emotions hijack logic. Having a structure keeps you on track even when things get heated.",
          "**The Five-Part Structure:** (1) State your purpose and invite partnership, (2) Share your observations (facts, not judgments), (3) Share your interpretation (your story about those facts), (4) Invite their perspective (genuinely curious), (5) Problem-solve together (only after understanding is shared).",
          "**Example applied:** (1) 'I want to talk about our recent project delays. My goal is to understand and fix what's not working.' (2) 'The last three deadlines slipped by 5-7 days.' (3) 'My interpretation is that we're over-committed or under-resourced. But I don't have full visibility.' (4) 'What's your take on what's happening?' (5) [After listening] 'Based on what we've discussed, what if we tried X?'",
          "Research from the field of conflict resolution shows that conversations structured this way reduce defensiveness by 60% compared to blame-first approaches. Why? You're sharing your perspective, not declaring truth. You're inviting input, not imposing conclusions.",
          "**The transition phrases that save conversations:** 'Help me understand...' (replaces 'You're wrong'). 'Here's how I'm seeing it...' (replaces 'Here's what you did'). 'What am I missing?' (replaces 'Why didn't you...'). These phrases de-escalate while keeping the topic alive.",
          "**When they get defensive:** Don't match their energy. Pause. Acknowledge their emotion: 'I can tell this is hitting hard. That wasn't my intent.' Then return to curiosity: 'What part of what I said landed wrong?' This almost always de-escalates if your tone is genuine."
        ],
        keyInsight: "Structure turns emotional volatility into productive dialogue.",
        practiceExercise: "Practice the five-part structure on a low-stakes issue this week. Script it out beforehand. Execute it. Document how it felt different from your usual approach.",
        researchCitation: "Conflict resolution research on structured dialogue (Fisher & Ury, 'Getting to Yes', 1981; Crucial Conversations framework, Patterson et al., 2002)"
      },
      {
        id: 4,
        title: "Recovery When Conversations Go Wrong",
        content: [
          "Even well-prepared conversations sometimes derail. Someone gets triggered, you say the wrong thing, emotions spike. What matters is recovery, not perfection.",
          "**Recognizing the derailment:** Physical signs (heart racing, face flushing, voice rising). Behavioral signs (interrupting, blaming, withdrawing, going silent). Content signs (conversation circles back to the same point, no progress being made).",
          "**The recovery move:** Name it and pause. 'I notice we're both getting heated. Can we take a 5-minute break?' Or in the moment: 'I think I said that badly. Let me try again.' Naming the dynamic breaks the escalation cycle.",
          "Research on de-escalation shows that explicitly acknowledging tension reduces it by 40-50%. Why? Because both parties realize they're in a dynamic, not just 'dealing with an unreasonable person.' The problem becomes the pattern, not the people.",
          "**Post-conversation repair:** If a conversation went poorly, address it within 24 hours. 'I've been thinking about our conversation yesterday. I don't think I handled it well. I'd like to try again.' Most people appreciate the follow-up more than you expect.",
          "**What not to do:** Don't pretend it didn't happen. Don't send a passive-aggressive email 'summarizing your understanding.' Don't complain to others about the person. All of these make future conversations harder.",
          "**Building skill through repetition:** Difficult conversations don't get easier through avoidance—they get easier through practice with reflection. After each one, ask yourself: What went well? What would I do differently? This turns experience into expertise."
        ],
        keyInsight: "Recovery matters more than perfection—repair builds skill and trust.",
        practiceExercise: "After your next difficult conversation (good or bad), take 10 minutes to journal: What went well? What would I do differently? What did I learn about myself? Share one learning with a trusted colleague.",
        researchCitation: "Research on de-escalation and conversational repair (Gottman Institute, 2011; Crucial Conversations research)"
      }
    ],
    quiz: [
      {
        id: "b1-q1",
        question: "According to research, which type of conflict is most productive for team performance?",
        options: [
          { label: "A", text: "Relationship conflict (personal disagreements)" },
          { label: "B", text: "Task conflict (disagreement about ideas and solutions)" },
          { label: "C", text: "Process conflict (disagreement about roles)" },
          { label: "D", text: "No conflict at all (artificial harmony)" }
        ],
        correct: "B",
        explanation: "Task conflict (disagreement about ideas) is productive and leads to better decisions. Relationship conflict is toxic. Process conflict can be managed. Artificial harmony prevents innovation."
      },
      {
        id: "b1-q2",
        question: "Before a difficult conversation, the most important preparation step is:",
        options: [
          { label: "A", text: "Write a detailed list of everything the other person did wrong" },
          { label: "B", text: "Clarify your concern, desired outcome, your contribution, and your assumptions" },
          { label: "C", text: "Rehearse exactly what you'll say word-for-word" },
          { label: "D", text: "Gather allies who agree with your perspective" }
        ],
        correct: "B",
        explanation: "Effective preparation means clarifying your perspective, desired outcome, acknowledging your role, and examining assumptions—not building a case against someone or scripting every word."
      },
      {
        id: "b1-q3",
        question: "During a difficult conversation, the other person becomes defensive. The best response is:",
        options: [
          { label: "A", text: "Match their energy and stand your ground" },
          { label: "B", text: "Pause, acknowledge their emotion, and return to curiosity" },
          { label: "C", text: "End the conversation immediately" },
          { label: "D", text: "Continue making your points until they understand" }
        ],
        correct: "B",
        explanation: "Acknowledging emotion and returning to curiosity de-escalates 90% of defensive reactions. Matching energy or pushing harder escalates conflict. Ending abruptly prevents resolution."
      },
      {
        id: "b1-q4",
        question: "A difficult conversation went poorly yesterday. What should you do?",
        options: [
          { label: "A", text: "Pretend it didn't happen and move on" },
          { label: "B", text: "Send an email 'summarizing your understanding' of what was said" },
          { label: "C", text: "Address it within 24 hours: 'I'd like to try that conversation again'" },
          { label: "D", text: "Complain to colleagues to get their perspective" }
        ],
        correct: "C",
        explanation: "Repairing within 24 hours shows maturity and builds trust. Avoidance, passive-aggressive emails, or complaining to others makes future conversations harder."
      }
    ]
  },
  // STRIPE 2: MASTERING DIFFICULT CONVERSATIONS
  {
    number: 2,
    name: "Mastering Difficult Conversations",
    theme: "Skills for Direct, Respectful Dialogue",
    lessons: [
      {
        id: 5,
        title: "The COIN Method",
        content: [
          "Most feedback fails because it's either too vague ('You need to improve your communication') or too aggressive ('You're terrible at this'). The COIN method provides structure.",
          "**C - Connection**: Start with context and positive intent. 'I value your contributions and want to discuss something that came up.' This signals you're not attacking.",
          "**O - Observation**: Share what you observed, not what you interpreted. 'In yesterday's meeting, I noticed you interrupted Sarah twice while she was presenting' (observation) vs. 'You're disrespectful' (interpretation).",
          "**I - Impact**: Explain the effect of the behavior. 'When that happened, Sarah stopped sharing her ideas and the meeting became tense. We lost valuable input.'",
          "**N - Next Steps**: Propose a path forward together. 'Going forward, could we practice letting people finish their thoughts before jumping in? What would help you with that?'",
          "Research on feedback effectiveness shows structured approaches like COIN reduce defensiveness by 65% compared to unstructured criticism. The structure keeps you focused on behavior, not character.",
          "The power is in the separation: Observation (what I saw) vs. Impact (what resulted) vs. Next Steps (what we do). Each is discussable without triggering fight-or-flight."
        ],
        keyInsight: "Structure transforms emotional feedback into collaborative problem-solving.",
        practiceExercise: "Use COIN to address one piece of difficult feedback this week. Script it out first, then deliver it. Document: How did the structure help you stay clear and calm?",
        researchCitation: "Feedback effectiveness research (Center for Creative Leadership, 2016)"
      },
      {
        id: 6,
        title: "Separating Impact from Intent",
        content: [
          "The fundamental attribution error: When someone hurts us, we assume negative intent. When we hurt someone, we cite good intentions. This asymmetry destroys relationships.",
          "**The formula that saves conversations:** 'I'm assuming positive intent, AND here's the impact I experienced.' Both parts matter. The first creates safety; the second names reality.",
          "Example: 'I know you didn't mean to undermine me in that meeting. AND when you questioned my data in front of the client, it damaged my credibility. Can we discuss how to handle disagreements differently?'",
          "Cognitive bias research shows we're wired to infer intent from impact. Your colleague arrives late → 'They don't respect my time' (attribution of intent). In reality: traffic, family emergency, miscommunication (actual reasons).",
          "The practice: When upset, ask yourself: 'What's the most generous interpretation of their behavior?' Then address the impact regardless of intent. 'Even if you didn't mean it, here's what happened...'",
          "This isn't about being naive. It's about not conflating two separate things. Address impact directly while staying open about intent."
        ],
        keyInsight: "Address impact without assuming intent—this keeps conversations productive.",
        practiceExercise: "Reframe one current complaint using 'impact vs. intent' language. Write it down: 'I assume positive intent about [X], AND here's the impact I experienced: [Y].' Notice how this changes your emotional response.",
        researchCitation: "Fundamental attribution error research (Ross, 1977; attribution theory)"
      },
      {
        id: 7,
        title: "Managing Emotional Hijacks",
        content: [
          "You're in a meeting. Someone challenges your work. Your heart races. Your face flushes. Your mind goes blank. You've been emotionally hijacked—and your next move will determine whether this conflict becomes productive or destructive.",
          "**What's happening biologically:** The amygdala perceives threat and floods your system with cortisol and adrenaline. Blood flow moves from prefrontal cortex (reasoning) to limbic system (survival). You're literally less smart in this state.",
          "**The 6-second rule:** Neuroscience research shows emotional hijacks peak and begin to subside within 6 seconds IF you don't fuel them. The practice: Pause. Breathe. Count. Let the chemical wave pass before responding.",
          "**Somatic cues to watch for:** Increased heart rate, shallow breathing, tightness in chest or jaw, heat in face, tunnel vision. These are your early warning system. Notice them BEFORE you speak.",
          "**The tactical pause:** 'That's an important point. Give me a moment to think about it.' Or: 'I'm noticing I'm getting reactive. Can we pause for 2 minutes?' Naming it defuses it.",
          "Research from emotional regulation studies shows that labeling your emotions ('I'm feeling defensive right now') reduces their intensity by 40%. The prefrontal cortex re-engages when you name what's happening."
        ],
        keyInsight: "The 6-second pause between trigger and response determines conflict quality.",
        practiceExercise: "Practice the 'pause and breathe' technique before responding to criticism this week. Inhale for 4 counts, hold for 4, exhale for 4. Notice: Does this create space for a better response?",
        researchCitation: "Amygdala hijack research (Goleman, 1995; LeDoux neuroscience research)"
      },
      {
        id: 8,
        title: "When to Push vs. Pause",
        content: [
          "Not every conflict needs to be resolved immediately. Not every disagreement needs to escalate. Skilled conflict navigators know when to lean in and when to step back.",
          "**Push when:** Stakes are high and time is limited. The issue affects multiple people. Patterns are repeating. Silence would signal acceptance. Team needs to see leadership modeling difficult conversations.",
          "**Pause when:** Emotions are too high for productive dialogue. You don't have full information. The relationship needs repair first. There's time to gather input. Fatigue is affecting judgment.",
          "Negotiation research shows that timing accounts for 40% of conflict resolution success. The best conversationalists are also the best timers—they sense when conditions are ripe.",
          "**Reading the room:** Watch for physical cues (body language closing off), energy cues (frustration vs. fatigue), and engagement cues (checking out vs. leaning in). These tell you whether to continue or pause.",
          "**The explicit choice:** 'I think this conversation needs to continue, but I'm sensing we're both tired. Should we pause and reconvene tomorrow?' Naming the choice builds trust."
        ],
        keyInsight: "Timing matters as much as content—push when productive, pause when destructive.",
        practiceExercise: "In your next conflict, consciously choose to push or pause. Document: What signals led to your choice? Was it the right call? What did you learn?",
        researchCitation: "Negotiation timing research (Fisher & Ury; Crucial Conversations research)"
      }
    ],
    quiz: [
      {
        id: "b2-q1",
        question: "Using the COIN method, which element should come FIRST in a difficult conversation?",
        options: [
          { label: "A", text: "Impact - Explain the consequences immediately" },
          { label: "B", text: "Observation - Share specific behaviors you noticed" },
          { label: "C", text: "Connection - Establish positive intent and context" },
          { label: "D", text: "Next Steps - Jump to solutions quickly" }
        ],
        correct: "C",
        explanation: "Connection comes first to create psychological safety and signal positive intent. This makes the other person more receptive to feedback. Then: Observation, Impact, Next Steps."
      },
      {
        id: "b2-q2",
        question: "When someone's behavior has negative impact, the best approach is:",
        options: [
          { label: "A", text: "Assume they meant harm and address it directly" },
          { label: "B", text: "Ignore the impact to preserve the relationship" },
          { label: "C", text: "Address the impact while assuming positive intent" },
          { label: "D", text: "Wait to see if it happens again before saying anything" }
        ],
        correct: "C",
        explanation: "Separating impact from intent allows you to address real harm while preserving relationship. You can assume good intent AND still name the impact that needs to change."
      },
      {
        id: "b2-q3",
        question: "During a meeting, someone challenges your work and you feel your heart racing. What should you do FIRST?",
        options: [
          { label: "A", text: "Respond immediately to defend yourself" },
          { label: "B", text: "Pause, breathe for 6 seconds, let the chemical wave pass" },
          { label: "C", text: "Leave the meeting to calm down" },
          { label: "D", text: "Change the subject to avoid conflict" }
        ],
        correct: "B",
        explanation: "The 6-second pause allows the amygdala hijack to begin subsiding. Your prefrontal cortex re-engages, letting you respond thoughtfully instead of reactively. Immediate response escalates; pausing de-escalates."
      },
      {
        id: "b2-q4",
        question: "You're in a heated disagreement and notice both parties are exhausted. The best move is:",
        options: [
          { label: "A", text: "Push through to resolution—finish what you started" },
          { label: "B", text: "Explicitly name it: 'Let's pause and reconvene tomorrow'" },
          { label: "C", text: "End the conversation without explanation" },
          { label: "D", text: "Keep going but speak louder to maintain energy" }
        ],
        correct: "B",
        explanation: "Timing matters. Fatigue reduces conflict resolution quality by 40%. Explicitly naming the pause and setting a time to reconvene shows respect and maintains trust while protecting conversation quality."
      }
    ]
  },
  // STRIPE 3: TEAM CONFLICT PROTOCOLS
  {
    number: 3,
    name: "Team Conflict Protocols",
    theme: "Systematizing Healthy Debate",
    lessons: [
      {
        id: 9,
        title: "Establishing Conflict Norms",
        content: [
          "Teams don't develop healthy conflict by accident. They establish explicit agreements about HOW to disagree. Without norms, conflict defaults to power dynamics and personality.",
          "**What are conflict norms?** Clear, specific agreements about how the team handles disagreements. Not vague values ('respect'), but concrete behaviors ('we challenge ideas in the meeting, not after').",
          "**Examples of effective conflict norms:** We commit to raising concerns in real-time, not later. We attack problems, never people. We assume positive intent until proven otherwise. We don't leave the room without clarity on next steps. Disagreement is expected; disrespect is not tolerated.",
          "Research on high-performing teams shows those with explicit conflict norms resolve disagreements 50% faster and with 40% less relationship damage than teams without them.",
          "**The creation process:** Co-create norms, don't decree them. Ask: 'What behaviors would help us disagree better?' and 'What behaviors damage our conflicts?' Synthesize responses into 5-7 clear commitments.",
          "**The enforcement mechanism:** Norms only work if they're enforced. When someone violates a norm, address it immediately: 'Hold on—we agreed to hear people out before jumping in. Let Sarah finish.' Silence signals norms don't matter."
        ],
        keyInsight: "Explicit conflict norms prevent dysfunction before it starts.",
        practiceExercise: "Draft 3 'rules of engagement' for team conflict. Share with your team and ask: 'What would you add or change?' Finalize and post them visibly.",
        researchCitation: "High-performing teams research (Google re:Work, Lencioni team exercises)"
      },
      {
        id: 10,
        title: "The Devil's Advocate Role",
        content: [
          "Teams often agree too quickly. Groupthink is comfortable. The Devil's Advocate role forces consideration of alternatives even when consensus feels easy.",
          "**How it works:** Assign someone (rotate the role) to argue the opposite position, regardless of their personal view. Their job: surface risks, challenge assumptions, stress-test logic.",
          "**Why it's powerful:** People give themselves permission to voice concerns they'd otherwise suppress. 'I'm not saying I believe this, but playing Devil's Advocate...' removes social risk.",
          "Decision-making research shows teams using Devil's Advocate approaches make 25% fewer preventable errors. Why? They consider failure modes BEFORE committing, not after.",
          "**The key distinction:** This isn't about being contrarian for sport. It's about systematically exploring 'What could go wrong?' and 'What are we not seeing?'",
          "**When to deploy:** Major decisions with significant downside. Decisions where everyone agrees quickly (too quickly). Decisions that can't easily be reversed. High-stakes hiring, strategic pivots, large investments."
        ],
        keyInsight: "Assigned dissent reveals blind spots that voluntary input misses.",
        practiceExercise: "Assign a Devil's Advocate in your next major decision. Give them explicit permission to argue the opposite. Document: What concerns emerged that wouldn't have otherwise?",
        researchCitation: "Decision-making research on Devil's Advocate effectiveness (Janis, groupthink research)"
      },
      {
        id: 11,
        title: "Conflict Retrospectives",
        content: [
          "Most teams review WHAT they decided, not HOW they disagreed. Conflict retrospectives build the meta-skill: reflecting on the conflict process itself.",
          "**The practice:** After major disagreements, ask: 'How did we handle that conflict? What went well? What would we do differently next time?' This turns experience into learning.",
          "**What to examine:** Did everyone speak? Were concerns addressed or dismissed? Did we focus on issues or did it get personal? How long did it take to resolve? Did relationships suffer? Are we truly committed to the decision?",
          "Agile retrospective research shows that teams reflecting on their processes improve 30% faster than those who don't. The same applies to conflict: teams that review HOW they fight get better at it.",
          "**The timing:** Immediately after (within 24 hours) while memories are fresh. Not during the conflict—that's too heated. Not weeks later—that's too distant.",
          "**The safety requirement:** Retrospectives require psychological safety. If people fear punishment for honest feedback, they won't share. Leaders must demonstrate non-defensiveness."
        ],
        keyInsight: "Reviewing how you fought makes you better at fighting.",
        practiceExercise: "Add 'How did we handle conflict?' to your next team retrospective. Create safety by starting with your own self-critique: 'I think I could have...'",
        researchCitation: "Agile retrospective research applied to conflict (Scrum methodology, continuous improvement)"
      },
      {
        id: 12,
        title: "Escalation Paths",
        content: [
          "Not all conflicts resolve at the team level. Sometimes you need external help. Having a clear escalation path prevents conflicts from festering OR exploding inappropriately.",
          "**What is an escalation path?** A known, accepted process for what to do when team-level conflict resolution fails. Who do you involve? When? How?",
          "**When to escalate:** Repeated pattern despite multiple attempts to resolve. Conflict affecting team performance. Personal attacks or behavior violations. Power dynamics preventing direct resolution. Stalemate with no path forward.",
          "**When NOT to escalate:** First disagreement (work it out first). Minor issues that can be addressed directly. Using escalation as a threat ('I'll tell your boss'). Jumping levels to avoid difficult conversations.",
          "Organizational design research shows that teams with clear escalation paths experience 60% fewer unresolved conflicts than teams without. Why? People know there's a safety valve, which paradoxically makes them more willing to try direct resolution first.",
          "**The communication:** 'We've tried to resolve this three times and haven't made progress. I think we need to bring in [manager/mediator]. Are you open to that?' Frame it as problem-solving, not tattling."
        ],
        keyInsight: "Clear escalation paths provide safety nets that encourage direct resolution first.",
        practiceExercise: "Map your team's escalation path. Write it down: Step 1 (direct conversation), Step 2 (involve manager), Step 3 (HR/mediation). Share it. Does everyone know the process?",
        researchCitation: "Organizational design research on conflict resolution systems"
      }
    ],
    quiz: [
      {
        id: "b3-q1",
        question: "Which of these is an effective conflict norm?",
        options: [
          { label: "A", text: "'Be respectful' (general value)" },
          { label: "B", text: "'We challenge ideas in the meeting, not after' (specific behavior)" },
          { label: "C", text: "'No fighting allowed' (conflict avoidance)" },
          { label: "D", text: "'Majority rules' (voting without discussion)" }
        ],
        correct: "B",
        explanation: "Effective norms are specific and behavioral. 'Respect' is too vague. 'No fighting' prevents productive conflict. Specific norms like 'challenge in the meeting' create clear expectations."
      },
      {
        id: "b3-q2",
        question: "The Devil's Advocate role is most useful when:",
        options: [
          { label: "A", text: "The team has already spent weeks debating" },
          { label: "B", text: "Everyone agrees quickly on a major decision" },
          { label: "C", text: "Someone wants to be contrarian for fun" },
          { label: "D", text: "The decision is low-stakes and easily reversible" }
        ],
        correct: "B",
        explanation: "Devil's Advocate is most valuable when consensus comes too easily—it forces exploration of risks and alternatives before committing. It's designed to prevent groupthink on important decisions."
      },
      {
        id: "b3-q3",
        question: "When should a team conduct a conflict retrospective?",
        options: [
          { label: "A", text: "During the conflict while emotions are high" },
          { label: "B", text: "Within 24 hours after the conflict while memories are fresh" },
          { label: "C", text: "Weeks later once everyone has forgotten the details" },
          { label: "D", text: "Only after conflicts that went poorly, not successful ones" }
        ],
        correct: "B",
        explanation: "Within 24 hours captures fresh details without the heat of the moment. Waiting weeks loses valuable learning. Review both good and bad conflicts to understand what makes them effective."
      },
      {
        id: "b3-q4",
        question: "A team conflict has failed to resolve after three attempts. What should you do?",
        options: [
          { label: "A", text: "Give up and avoid the person" },
          { label: "B", text: "Threaten to escalate unless they agree with you" },
          { label: "C", text: "Frame escalation as problem-solving: 'Should we involve a manager?'" },
          { label: "D", text: "Immediately go to HR without telling the other person" }
        ],
        correct: "C",
        explanation: "Clear escalation paths help. After genuine attempts to resolve, propose escalation as collaborative problem-solving, not threat or tattling. Transparency maintains trust."
      }
    ]
  },
  // STRIPE 4: CONFLICT MASTERY
  {
    number: 4,
    name: "Conflict Mastery",
    theme: "Advanced Conflict Navigation",
    lessons: [
      {
        id: 13,
        title: "Cross-Cultural Conflict",
        content: [
          "Conflict styles vary dramatically across cultures. What's 'direct and honest' in one culture is 'rude and aggressive' in another. What's 'respectful and considerate' in one is 'passive-aggressive and indirect' in another.",
          "**Hofstede's Cultural Dimensions** applied to conflict: High-context cultures (Japan, China) rely on implicit communication and group harmony. Low-context cultures (US, Germany) value explicit, direct disagreement.",
          "**Individualism vs. Collectivism:** Individualist cultures (US, UK) see conflict as individual opinions clashing. Collectivist cultures (East Asia, Latin America) see conflict as threatening group harmony. Different stakes.",
          "**Power Distance:** High power distance cultures (many Asian and Latin countries) expect disagreement to flow through hierarchy. Challenging a senior publicly is unthinkable. Low power distance cultures (Scandinavia, Australia) expect anyone to speak up.",
          "The GLOBE study of 62 cultures found NO universal conflict style. Effective leaders adapt their approach based on cultural context, not impose their native style.",
          "**The adaptation practice:** When working across cultures, ask explicitly: 'In your culture, how are disagreements typically handled? What would be considered respectful here?' This prevents misunderstandings."
        ],
        keyInsight: "Effective conflict requires cultural intelligence—adapt your style to the context.",
        practiceExercise: "Research the conflict norms of one culture different from yours. Identify 3 specific differences in how disagreement is handled. How would you adapt?",
        researchCitation: "Hofstede cultural dimensions research (1980-2020), GLOBE study of cultural leadership"
      },
      {
        id: 14,
        title: "Conflict in Remote Teams",
        content: [
          "Remote work removes 93% of communication cues (body language, tone, micro-expressions). What's left is text and voice—prone to misinterpretation. Conflict becomes harder to navigate and easier to escalate.",
          "**The text trap:** Written disagreement often reads harsher than intended. No smile, no softening tone, no eye contact. 'I disagree with this approach' in person = collaborative. In Slack = aggressive.",
          "**The escalation principle:** If a disagreement starts to heat up in text, move it up the communication richness ladder. Text → Voice → Video → In-person. Each step adds context that de-escalates.",
          "Remote work research from Microsoft shows that remote teams take 40% longer to resolve conflicts than in-person teams when they stay in asynchronous channels. But video calls close that gap to within 10%.",
          "**Best practices for remote conflict:** Use video for anything sensitive (seeing faces builds empathy). Over-communicate tone ('I'm curious about this, not criticizing'). Respond faster (silence in remote = anger). Schedule sync time for complex disagreements.",
          "**The danger of delay:** Remote makes it easy to avoid conflict ('I'll respond later'). But delayed responses in remote teams breed more anxiety than in-person silence. Address conflicts within 24 hours."
        ],
        keyInsight: "Remote conflict requires higher communication richness—escalate the medium, not the emotion.",
        practiceExercise: "Move one text-based disagreement to video this week. Notice: What changed when you could see each other? Did the conflict feel different?",
        researchCitation: "Remote work and conflict research (Microsoft, Stanford remote work studies)"
      },
      {
        id: 15,
        title: "Recovering from Conflict Gone Wrong",
        content: [
          "Even skilled conflict navigators sometimes blow it. You lose your temper. You say something you regret. The conversation spirals. What matters is repair, not perfection.",
          "**The 24-hour rule:** If a conflict went poorly, address it within 24 hours. 'I've been thinking about our conversation yesterday. I don't think I handled it well. Can we try again?'",
          "**What to acknowledge:** Be specific about what you did wrong. 'I interrupted you three times and didn't really listen' is better than 'Sorry if I upset you.' Own your part fully.",
          "Trust repair research from Dr. John Gottman (originally in relationships, now applied to teams) shows that successful repairs require: (1) specific acknowledgment, (2) empathy for impact, (3) commitment to change. Generic apologies don't rebuild trust.",
          "**When you were wronged:** If someone harmed you in conflict, you can initiate repair too. 'That conversation was hard. I'd like to understand your perspective better. Can we talk?' This isn't weakness—it's leadership.",
          "**The rebuild process:** After repair, test the relationship with low-stakes collaboration. Don't avoid the person OR force intimacy. Rebuild trust incrementally through positive interactions.",
          "Teams that develop conflict repair skills report 60% better psychological safety than teams without repair practices. Why? People know mistakes won't be fatal to relationships."
        ],
        keyInsight: "Conflict repair is a leadership skill—address bad conflicts quickly and specifically.",
        practiceExercise: "Identify one past conflict to revisit and repair. Reach out within 24 hours: 'I've been thinking about X. I'd like to discuss it again.' Use the repair framework.",
        researchCitation: "Gottman Institute trust repair research adapted to organizational settings"
      },
      {
        id: 16,
        title: "From Conflict to Commitment",
        content: [
          "This is where Blue Belt bridges to Purple Belt. Healthy conflict is pointless if it doesn't lead to clear commitment. The best debates end with unified action.",
          "**Disagree and commit:** Amazon's principle. After full debate, even those who disagreed commit fully to the decision. This only works if the conflict was genuinely heard and explored.",
          "**The commitment check:** After any significant disagreement, explicitly ask: 'Are we all committed to this decision, even those who disagreed?' Silence ≠ agreement. Make commitment verbal and public.",
          "Research from Lencioni shows that teams skipping this step experience 'false agreement'—people nod but don't follow through. Real commitment requires: (1) full airing of concerns, (2) being heard, (3) explicit verbal commitment.",
          "**What blocks commitment after conflict:** Concerns that weren't fully addressed. Feeling steamrolled or outvoted. Lack of clarity on WHAT we're committing to. Missing the 'why' behind the decision.",
          "**The practice:** End major debates with: 'Let's summarize: We've decided X. The concerns raised were Y and Z. We're addressing Z by doing A. Everyone committed?' Then go around the room, names spoken, commitment given.",
          "Without this bridge, conflict is just catharsis. With it, conflict becomes the engine of alignment."
        ],
        keyInsight: "Conflict without commitment is noise—bridge debate to unified action.",
        practiceExercise: "After your next team debate, explicitly ask: 'Are we all committed to this decision?' Make commitment verbal. Document how this changes follow-through.",
        researchCitation: "Lencioni's 'Disagree and Commit' framework; Amazon leadership principles"
      }
    ],
    quiz: [
      {
        id: "b4-q1",
        question: "According to Hofstede's research, high-context cultures (like Japan or China) tend to:",
        options: [
          { label: "A", text: "Value explicit, direct disagreement in meetings" },
          { label: "B", text: "Rely on implicit communication and prioritize group harmony" },
          { label: "C", text: "Encourage anyone to challenge authority publicly" },
          { label: "D", text: "See conflict as purely individual, not group-related" }
        ],
        correct: "B",
        explanation: "High-context cultures rely on implicit cues and prioritize group harmony over explicit disagreement. Direct public challenge (common in low-context cultures) can be seen as damaging relationships."
      },
      {
        id: "b4-q2",
        question: "A text-based disagreement is escalating. According to remote work research, what should you do?",
        options: [
          { label: "A", text: "Continue in text to have a written record" },
          { label: "B", text: "Move up the communication richness ladder (text → voice → video)" },
          { label: "C", text: "Ignore it and hope it resolves itself" },
          { label: "D", text: "Respond with ALL CAPS to show you're serious" }
        ],
        correct: "B",
        explanation: "Escalate the medium, not the emotion. Video adds body language and tone that de-escalate misunderstandings. Remote teams resolve conflicts 40% faster when they move to richer communication channels."
      },
      {
        id: "b4-q3",
        question: "A conflict went poorly yesterday—you lost your temper. According to trust repair research, what's the best approach?",
        options: [
          { label: "A", text: "Give it a few weeks for everyone to forget about it" },
          { label: "B", text: "Send a generic 'Sorry if I upset anyone' email" },
          { label: "C", text: "Within 24 hours, specifically acknowledge what you did wrong and commit to change" },
          { label: "D", text: "Pretend it didn't happen and move on" }
        ],
        correct: "C",
        explanation: "The 24-hour rule with specific repair: acknowledge exactly what you did wrong, show empathy for impact, commit to different behavior. Generic apologies and avoidance don't rebuild trust."
      },
      {
        id: "b4-q4",
        question: "After a major team debate, the best way to ensure commitment is:",
        options: [
          { label: "A", text: "Assume everyone agrees if no one objects" },
          { label: "B", text: "Explicitly ask 'Are we all committed?' and get verbal confirmation from everyone" },
          { label: "C", text: "Send an email summary and consider silence as agreement" },
          { label: "D", text: "Only check with those who initially disagreed" }
        ],
        correct: "B",
        explanation: "Lencioni's research shows verbal, explicit commitment prevents 'false agreement.' Go around the room, get names spoken, confirmation given. Silence ≠ commitment, especially after significant debate."
      }
    ]
  }
];

