// WHITE BELT: Absence of Trust - Building Vulnerability-Based Foundation
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

export const whiteBeltContent: Stripe[] = [
  // STRIPE 1: TRUST FOUNDATIONS
  {
    number: 1,
    name: "Trust Foundations",
    theme: "Building the Base of Vulnerability-Based Trust",
    lessons: [
      {
        id: 1,
        title: "The Two Types of Trust",
        content: [
          "Trust in teams operates on two distinct levels that leaders must understand.",
          "**Predictive Trust** is based on past behavior—'I trust you'll deliver because you always have.' It's transactional and limited. You can predict someone's behavior, count on their reliability, but that doesn't mean you can be vulnerable with them.",
          "**Vulnerability-Based Trust** goes deeper—'I trust you with my weaknesses, fears, and mistakes.' This is the foundation of high-performing teams. It's the confidence that your teammates will not use your vulnerabilities against you. When you say 'I don't know,' 'I made a mistake,' or 'I need help,' you won't be punished, judged, or secretly tallied against.",
          "Research from Patrick Lencioni's work with over 10,000 teams shows that vulnerability-based trust is the differentiator between functional and dysfunctional teams. Google's Project Aristotle confirmed this: psychological safety (the ability to be vulnerable without fear) was the #1 predictor of team success across 180 teams studied.",
          "The shift from predictive to vulnerability-based trust requires leaders to go first. When you admit 'I don't know' or 'I made a mistake,' you give permission for others to do the same. This creates a cascade effect—one person's vulnerability makes it safer for the next person to be honest.",
          "Most teams plateau at predictive trust. They're reliable but distant. The breakthrough happens when someone risks vulnerability and others reciprocate. That's when teams accelerate."
        ],
        keyInsight: "Trust isn't built by being perfect—it's built by being human.",
        practiceExercise: "In your next team meeting, share one thing you're currently struggling with professionally. Notice how others respond. Document: Did anyone else open up? How did the energy in the room shift?",
        researchCitation: "Google's Project Aristotle (2012-2014) - Study of 180 teams found psychological safety as #1 predictor of performance"
      },
      {
        id: 2,
        title: "Why Teams Avoid Vulnerability",
        content: [
          "If vulnerability builds trust, why do most teams avoid it? The answer lies in our conditioning and past experiences.",
          "**Fear of judgment** is the primary barrier. We're conditioned from childhood to hide weaknesses. In school, not knowing the answer meant embarrassment. In early career roles, showing uncertainty felt like career suicide. By the time we reach leadership positions, we've spent decades perfecting the mask of competence.",
          "**Competitive environments** amplify this. When your peers are rivals for promotions, admitting weakness feels like handing them ammunition. The same colleague you're supposed to trust is also the person you're competing against for the next role.",
          "**Past punishment** creates lasting scars. Many professionals have been burned before—they shared a concern honestly and it was used against them in a performance review, or leaked to others. The nervous system remembers these betrayals, even when your current team seems safe.",
          "**Cultural norms** vary by industry. Finance, law, and tech often reward the appearance of confidence over authentic uncertainty. Saying 'I'm not sure' can be misinterpreted as incompetence rather than intellectual honesty.",
          "Research from Brené Brown's decade-long study of 11,000+ data points shows that vulnerability is not weakness—it's 'the birthplace of innovation, creativity, and change.' Yet 80% of professionals report hiding their true opinions in meetings. Harvard Business School research found that teams with psychological safety outperform others by 19% on average.",
          "The cost of avoiding vulnerability? Artificial harmony, unspoken resentments, decisions made without full information, and slower innovation. Energy that should go toward solving problems gets wasted on impression management."
        ],
        keyInsight: "The team that can't discuss problems openly can't solve them effectively.",
        practiceExercise: "Identify one opinion you've been holding back in a current project. Write it down. Then consider: What's the worst that could happen if you shared it? What's the cost of staying silent? Share it this week.",
        researchCitation: "Brené Brown's research on vulnerability and shame (2010-2020) - 11,000+ data points across multiple studies"
      },
      {
        id: 3,
        title: "The Trust Pyramid",
        content: [
          "Trust builds in layers, and you can't skip steps. Understanding this hierarchy prevents the common mistake of forcing vulnerability too soon.",
          "**Level 1: Reliability Trust** forms the foundation. 'Can I count on you to do what you say?' This is table stakes—showing up on time, meeting deadlines, keeping small promises. Without reliability, nothing else matters. If you can't trust someone to respond to an email, you certainly can't trust them with your fears.",
          "**Level 2: Competence Trust** builds next. 'Do you have the skills to deliver?' This comes from demonstrating capability and acknowledging gaps honestly. It's the difference between 'I can figure it out' (competence) and 'I'm pretending I know' (false competence). Admitting 'I don't know X, but I know how to learn it' actually builds this level.",
          "**Level 3: Interpersonal Trust** requires personal connection. 'Do you have my back?' This goes beyond work deliverables to knowing each other as humans—understanding motivations, values, and what matters outside of work. Teams often skip this level, staying purely transactional. That's why they plateau.",
          "**Level 4: Vulnerability Trust** is the summit. 'Can I be fully human with you?' This is where team members share fears, admit failures, and ask for help without fear of judgment. It's the confidence that your weakness won't be weaponized.",
          "McKinsey research on 5,000+ executives found that teams operating at Level 4 make decisions 2.5x faster and implement them 3x more effectively than teams stuck at Levels 1-2. The difference isn't marginal—it's exponential.",
          "Most teams plateau at Level 2. They're competent but distant. The breakthrough happens when leaders model vulnerability first, creating safety for others to climb to Levels 3 and 4."
        ],
        keyInsight: "Trust is a ladder. You climb it one rung at a time, and the leader must climb first.",
        practiceExercise: "Map your current team on the Trust Pyramid. Which level are you operating at with each person? Choose one relationship to intentionally move up one level this week. Document what you did and what shifted.",
        researchCitation: "McKinsey research on executive teams (2018) - Study of 5,000+ executives on trust and decision-making speed"
      },
      {
        id: 4,
        title: "Signs of Trust Dysfunction",
        content: [
          "Trust dysfunction often hides behind other explanations. Leaders say 'we have a communication problem' or 'people aren't aligned on priorities.' Usually, the real problem is trust. Here's how to diagnose it.",
          "**Meetings after the meeting** are the clearest signal. When real conversations happen in hallways, DMs, and 1-on-1s—never in the room where decisions should be made—trust is absent. People don't feel safe speaking honestly in front of the group.",
          "**Hedged language** reveals self-protection. 'I might be wrong, but...' or 'This is probably a dumb question, but...' signals fear of judgment. Confident, trusted teams say 'I think...' or 'My perspective is...' without excessive caveating.",
          "**Silence on controversial topics** is another indicator. When hard issues arise—budget cuts, performance concerns, strategic disagreements—people suddenly have nothing to say. The silence is deafening. They're calculating the political risk of speaking.",
          "**Blame deflection** appears when things go wrong. Instead of collaborative problem-solving ('How do we fix this?'), energy goes into finding fault ('Who's responsible for this mess?'). High-trust teams assume good intent; low-trust teams assume sabotage.",
          "**Information hoarding** shows up when people protect knowledge as power rather than sharing freely. 'Only I know how this system works' becomes job security instead of a problem to solve through documentation.",
          "**Excessive politeness** can mask unresolved tensions. If everyone is always agreeable, always positive, never pushing back—that's not trust, it's artificial harmony. Real trust includes healthy disagreement.",
          "Research from the NeuroLeadership Institute shows that trust deficits trigger the brain's threat response, reducing cognitive capacity by up to 50%. Your team is literally getting dumber when trust is low. Gallup data reveals that teams with low trust have 50% higher turnover and 37% lower productivity."
        ],
        keyInsight: "Trust dysfunction is expensive—in talent, speed, and results.",
        practiceExercise: "Score your team 1-10 on each warning sign (1=severe problem, 10=no problem). Where did you score lowest? That's your starting point. Share this assessment with your team and discuss: 'What would need to change for us to score higher?'",
        researchCitation: "NeuroLeadership Institute research on trust and cognitive performance (2019)"
      }
    ],
    quiz: [
      {
        id: "s1-q1",
        question: "A team member consistently delivers quality work but never admits when they're struggling. What type of trust is present?",
        options: [
          { label: "A", text: "No trust exists" },
          { label: "B", text: "Only predictive/reliability trust" },
          { label: "C", text: "Full vulnerability-based trust" },
          { label: "D", text: "Level 4 vulnerability trust" }
        ],
        correct: "B",
        explanation: "Consistent delivery demonstrates predictive trust (Level 1-2), but never admitting struggles indicates absence of vulnerability-based trust (Level 4). They can be relied upon but won't be vulnerable."
      },
      {
        id: "s1-q2",
        question: "According to Google's Project Aristotle research, what was the #1 predictor of team performance?",
        options: [
          { label: "A", text: "Individual talent level and IQ" },
          { label: "B", text: "Years of experience working together" },
          { label: "C", text: "Psychological safety (ability to be vulnerable)" },
          { label: "D", text: "Clear goals and metrics" }
        ],
        correct: "C",
        explanation: "Google's 2-year study of 180 teams found psychological safety was the #1 predictor—even more important than talent, experience, or clarity. Teams where members felt safe being vulnerable consistently outperformed others."
      },
      {
        id: "s1-q3",
        question: "Your team has 'meetings after the meeting' where real opinions are shared. This indicates:",
        options: [
          { label: "A", text: "A healthy culture of follow-up and relationship building" },
          { label: "B", text: "Trust dysfunction - fear of speaking openly in the group" },
          { label: "C", text: "Good time management - efficient use of formal meetings" },
          { label: "D", text: "Normal workplace behavior that should be encouraged" }
        ],
        correct: "B",
        explanation: "Hallway conversations after meetings signal that people don't feel safe speaking honestly in the group setting. This is a classic trust dysfunction symptom—the real work happens in private because public forums feel unsafe."
      },
      {
        id: "s1-q4",
        question: "What should a leader do FIRST to build vulnerability-based trust on their team?",
        options: [
          { label: "A", text: "Create an anonymous feedback system to protect people" },
          { label: "B", text: "Model vulnerability themselves by admitting mistakes or uncertainty" },
          { label: "C", text: "Send the team to trust-building workshops and trainings" },
          { label: "D", text: "Hire more trustworthy people with better character" }
        ],
        correct: "B",
        explanation: "Leaders must go first. Modeling vulnerability creates permission for others to be honest. Anonymous systems, workshops, and hiring can help, but they're ineffective without leadership vulnerability setting the tone."
      }
    ]
  },
  // STRIPE 2: PRACTICING VULNERABILITY
  {
    number: 2,
    name: "Practicing Vulnerability",
    theme: "Moving from Theory to Action",
    lessons: [
      {
        id: 5,
        title: "The Leader's First Move",
        content: [
          "Vulnerability-based trust doesn't happen by accident. It requires someone to go first—and that someone must be the leader. This is the 'vulnerability first move,' and it's the most powerful trust-building tool available.",
          "**Why leaders must go first:** Power dynamics make it unsafe for team members to be vulnerable until the leader models it. If you wait for your team to 'open up,' you'll wait forever. They're watching to see if vulnerability gets rewarded or punished.",
          "**What qualifies as a vulnerability first move?** It's not vague statements like 'I'm not perfect' (everyone knows that). It's specific admissions: 'I don't know how to solve this problem,' 'I made a mistake in how I handled that situation,' or 'I need help with X.'",
          "Amy Edmondson's research at Harvard shows that leaders who ask 'What am I missing?' and genuinely listen create 67% more psychological safety than leaders who only make statements. Questions that reveal uncertainty ('Help me understand...' or 'What would you do differently?') are vulnerability in action.",
          "**The timing matters.** Don't save vulnerability for private 1-on-1s. Make it public in team settings. When you admit uncertainty in a team meeting, you signal to everyone that honesty is safe here. Private vulnerability helps one person; public vulnerability helps the whole team.",
          "**The caveat:** Vulnerability must be strategic, not indiscriminate. Share uncertainties about decisions or skills ('I'm unsure of the best approach here'), not existential doubts ('I don't think I should be leading this team'). The former invites collaboration; the latter creates anxiety.",
          "Research from Google's re:Work initiative found that teams where leaders consistently asked for input had 19% better outcomes than teams where leaders only gave direction. The vulnerability of not having all answers turns teams into problem-solving partners, not just order-takers."
        ],
        keyInsight: "Leadership vulnerability is not weakness—it's the fastest path to team trust and performance.",
        practiceExercise: "This week, start one team meeting with 'Here's what I'm uncertain about...' and share a genuine area where you need team input. Document: How did people respond? Did the quality of discussion change?",
        researchCitation: "Amy Edmondson's research on psychological safety and team learning at Harvard Business School (1999-2018)"
      },
      {
        id: 6,
        title: "Vulnerability Without Weakness",
        content: [
          "The most common fear about vulnerability is that it will be perceived as weakness. But there's a critical distinction between productive vulnerability and damaging oversharing.",
          "**Productive vulnerability** focuses on task-related uncertainties and learning needs. 'I don't know the answer' or 'I made a mistake' or 'I need your expertise here' demonstrates humility and invites collaboration. It strengthens trust because it's honest and actionable.",
          "**Damaging oversharing** dumps existential anxieties or personal crises without boundaries. 'I don't think I can do this job' or lengthy personal trauma details without context creates anxiety rather than safety. It burdens the team inappropriately.",
          "Brené Brown's research on boundaries and vulnerability shows that 'daring leaders' share selectively: they're honest about challenges while maintaining appropriate boundaries. They don't confuse vulnerability with verbal vomiting.",
          "**The vulnerability formula:** Share the challenge + what you're doing about it + how others can help. Example: 'I don't know how to approach this negotiation (challenge). I'm reading up on negotiation tactics and talking to colleagues (what I'm doing). I'd love your input on our positioning (how you can help).'",
          "**Context matters.** Sharing vulnerability about work challenges builds trust. Sharing vulnerability about personal struggles can build connection, but requires careful judgment about depth, timing, and relevance. 'I'm having a tough family situation this week' provides context without demanding emotional labor.",
          "The goal isn't to become an open book. It's to be selectively honest about uncertainties and mistakes that are relevant to team performance. This creates a culture where problems surface early instead of festering in silence."
        ],
        keyInsight: "Strategic vulnerability builds trust; indiscriminate oversharing creates burden.",
        practiceExercise: "Identify one work challenge you've been hiding. Prepare to share it using the vulnerability formula: challenge + action + request for help. Practice it, then share with your team this week.",
        researchCitation: "Brené Brown's work on vulnerability and boundaries in 'Dare to Lead' (2018)"
      },
      {
        id: 7,
        title: "Creating Safety for Others",
        content: [
          "Once you've modeled vulnerability, the next step is actively creating safety for others to do the same. This requires specific behaviors, not just good intentions.",
          "**Ask questions that invite honesty.** Instead of 'Any concerns?' (which gets silence), try 'What am I not seeing here?' or 'What could go wrong with this plan?' Frame questions to assume there ARE concerns, making it safe to voice them.",
          "**Respond to vulnerability with curiosity, not judgment.** When someone says 'I'm struggling with X,' resist the urge to immediately solve, dismiss, or criticize. First response: 'Tell me more' or 'What's making it difficult?' This validates the sharing before problem-solving.",
          "**Make your thinking visible.** Don't just announce decisions—share your reasoning process, including doubts. 'Here's what I'm considering... here's what worries me... what am I missing?' This normalizes uncertainty and invites input.",
          "Google's research on psychological safety found that managers who actively solicited dissenting opinions ('What's wrong with this plan?') led teams with 27% fewer errors and 31% faster problem-solving. The invitation creates permission.",
          "**Protect vulnerability when it emerges.** If someone shares a mistake or concern in a team setting, treat it as valuable data, not fodder for criticism. 'Thank you for sharing that' should be your default response. If others mock or judge, intervene immediately: 'We don't do that here.'",
          "**Celebrate learning from failure.** When mistakes surface, focus on 'What did we learn?' not 'Who's to blame?' The team watches how you respond to bad news—that determines whether they'll keep sharing it.",
          "Research from the NeuroLeadership Institute shows that psychological safety is contagious but fragile. One instance of punished vulnerability can undo weeks of trust-building. Protection is as important as invitation."
        ],
        keyInsight: "Safety is created through repeated evidence that vulnerability is rewarded, not punished.",
        practiceExercise: "In your next team meeting, explicitly ask 'What am I not seeing here?' or 'What could go wrong with this plan?' Then respond with curiosity to the first person who speaks. Document: Did others start contributing more freely after the first response?",
        researchCitation: "Google's re:Work project on psychological safety (2015-2017)"
      },
      {
        id: 8,
        title: "Responding to Vulnerability",
        content: [
          "How you respond when someone is vulnerable determines whether they'll ever be vulnerable again. This is the moment that builds or breaks trust.",
          "**Don't fix immediately.** When someone shares a struggle, the instinct is to jump to solutions. Resist. If you immediately problem-solve, you signal 'vulnerability is a problem to be eliminated.' Instead, acknowledge first: 'Thank you for sharing that. Tell me more.'",
          "**Don't minimize.** Phrases like 'That's not so bad' or 'Everyone struggles with that' feel dismissive, even if well-intentioned. The person sharing needed courage to speak—don't diminish their experience.",
          "**Don't reciprocate immediately with your own story.** 'Oh, I had the same thing happen...' shifts focus from them to you. There's a time for reciprocal vulnerability, but not in the first 60 seconds of their sharing.",
          "**Do validate the risk.** 'I appreciate you bringing this up—I know it's not easy to share.' This acknowledges the courage required and reinforces that vulnerability is valued.",
          "**Do ask clarifying questions.** 'What specifically is most challenging?' or 'What would be helpful?' shows genuine interest and helps the person feel heard.",
          "Harvard research on trust repair and building shows that the quality of response to vulnerability is MORE important than the initial act of vulnerability. A poor response creates 'vulnerability hangovers'—regret for having opened up—that damage trust long-term.",
          "**The LASER response framework:** Listen fully, Acknowledge the courage, Suspend judgment, Explore with questions, Respond with support. This sequence builds safety at each step."
        ],
        keyInsight: "Trust is built or broken not in the moment of vulnerability, but in the response to it.",
        practiceExercise: "Next time someone shares a concern or mistake with you, pause before responding. Count to 3. Then respond with 'Thank you for sharing that. Tell me more.' Notice how the conversation deepens.",
        researchCitation: "Harvard research on trust responses and psychological safety (Edmondson, 2019)"
      }
    ],
    quiz: [
      {
        id: "s2-q1",
        question: "A leader shares: 'I don't have all the answers on this strategy.' A team member jokes: 'Well that's concerning!' The best leadership response is:",
        options: [
          { label: "A", text: "Laugh it off to keep the mood light" },
          { label: "B", text: "Say 'That's exactly why I need your input' and move forward" },
          { label: "C", text: "Address it directly: 'I'm being serious. I need honest input, not jokes.'" },
          { label: "D", text: "Ignore the comment and continue sharing" }
        ],
        correct: "C",
        explanation: "Protecting vulnerability means setting clear boundaries when someone mocks it. Addressing it directly signals that vulnerability is serious and safe, not fodder for humor. If left unaddressed, others learn that honesty gets ridiculed."
      },
      {
        id: "s2-q2",
        question: "Which is an example of productive vulnerability vs. damaging oversharing?",
        options: [
          { label: "A", text: "'I don't know how to approach this negotiation. I'd love your thoughts.'" },
          { label: "B", text: "'I'm having serious doubts about whether I should be in this role.'" },
          { label: "C", text: "'Let me tell you about my entire personal crisis this week.'" },
          { label: "D", text: "'I'm struggling with everything right now.'" }
        ],
        correct: "A",
        explanation: "Option A is productive—it shares a specific work challenge and invites collaboration. B, C, and D are oversharing that dumps anxiety without boundaries or actionability, potentially burdening the team."
      },
      {
        id: "s2-q3",
        question: "A team member shares a mistake they made. What should your FIRST response be?",
        options: [
          { label: "A", text: "Jump to solutions: 'Here's how to fix it...'" },
          { label: "B", text: "Acknowledge: 'Thank you for sharing. Tell me more about what happened.'" },
          { label: "C", text: "Share your own story: 'I made the same mistake once...'" },
          { label: "D", text: "Minimize: 'That's not so bad, everyone makes mistakes.'" }
        ],
        correct: "B",
        explanation: "First, acknowledge the courage it took to share, then explore with curiosity. This validates the risk they took and creates safety for future vulnerability. Fixing, redirecting, or minimizing can feel dismissive."
      },
      {
        id: "s2-q4",
        question: "According to research, what happens when leaders consistently ask 'What am I missing?'",
        options: [
          { label: "A", text: "Team members lose confidence in the leader's competence" },
          { label: "B", text: "Teams have 19% better outcomes and more psychological safety" },
          { label: "C", text: "Meetings become longer and less efficient" },
          { label: "D", text: "Team members feel burdened by having to do the leader's thinking" }
        ],
        correct: "B",
        explanation: "Google's research found leaders who asked for input (revealing they don't have all answers) created teams with significantly better outcomes. This vulnerability transforms team members into problem-solving partners."
      }
    ]
  },
  // STRIPE 3: BUILDING TEAM TRUST
  {
    number: 3,
    name: "Building Team Trust",
    theme: "Scaling Trust Across the Group",
    lessons: [
      {
        id: 9,
        title: "Personal Histories Exercise",
        content: [
          "Building team trust requires moving beyond surface-level interactions. The Personal Histories exercise is one of the most effective trust-building tools from Lencioni's work—simple in design, profound in impact.",
          "**The structure:** Each team member shares 3 things: Where they grew up, number of siblings, and one unique or interesting challenge from childhood. That's it. No work talk, no resume recitation—just brief personal background.",
          "**Why it works:** Humans are wired to connect through stories. When you learn that your analytical colleague was the youngest of 5 siblings fighting for attention, or that your quiet teammate grew up in 7 different countries, you stop seeing them as job titles. They become three-dimensional humans.",
          "**The rules are critical:** This is listening only. No questions during sharing (save for the end), no advice-giving, no judgment. The facilitator must protect this—when someone tries to 'fix' another's childhood story, intervene: 'We're just listening right now.'",
          "Research from organizational psychology shows that interpersonal knowledge (knowing personal context) increases cooperation by 23% and reduces conflict by 17%. Teams that know each other's backgrounds assign less malicious intent to behaviors—they have context.",
          "**Common resistance:** 'My team won't go deep.' They will, if you go first. Leaders should share first, modeling appropriate depth. Not trauma-dumping, just honest. 'I grew up in a small town, middle child of 3, moved around a lot because of my parent's job—learned to adapt quickly but struggle with putting down roots.'",
          "**Timing:** Allow 2-3 minutes per person. For a team of 8, budget 30 minutes. It feels slow, but it accelerates everything else. After Personal Histories, meetings are more efficient because people trust each other's intentions."
        ],
        keyInsight: "Teams that know each other's stories fight less and collaborate more.",
        practiceExercise: "Run a 15-minute Personal Histories round at your next team meeting. Set clear rules: share 3 things (where you grew up, siblings, one childhood challenge), listening only, no fixing. Go first. Document what shifts in the team dynamic afterward.",
        researchCitation: "Lencioni's structured team exercises from 'The Five Dysfunctions of a Team' (2002)"
      },
      {
        id: 10,
        title: "Behavioral Profiling",
        content: [
          "Understanding how team members prefer to work—their communication style, decision-making approach, and stress responses—creates empathy and reduces friction.",
          "**Assessment tools** like DiSC, MBTI, or Enneagram serve as trust-building tools when used correctly. The goal isn't to label people ('She's an INTJ'), but to create a shared language for differences. 'I process decisions slowly and need time to think' vs. 'I decide quickly and get frustrated by delay' explains tension without blame.",
          "**The application:** After profiles are shared, use them in real-time. 'I know you're a high-D and like directness, so here's my feedback straight...' or 'You're an introvert, so I'll send the agenda early so you can prepare thoughts before the meeting.' Profiles become tools for adaptation.",
          "Research on personality assessments in teams shows a 31% improvement in collaboration when teams actively USE the insights, not just TAKE the assessments. Most teams take DiSC and never reference it again—that's wasted potential.",
          "**Create a team reference sheet.** After assessments, compile everyone's key preferences: Communication style (direct vs. diplomatic), Decision style (quick vs. thorough), Stress response (vocal vs. withdraws), Feedback preference (real-time vs. scheduled). Make it visible in your team space.",
          "**Caveat:** Don't use profiles as excuses. 'I'm just direct, deal with it' weaponizes the tool. Behavioral profiling is for understanding and adaptation, not for justifying dysfunction. If someone's 'natural style' hurts team effectiveness, that's still a problem to address.",
          "The power of profiling is in revealing that different ≠ wrong. When disagreements arise, you can say 'We're approaching this from different decision-making styles—let's find a middle ground' rather than 'You're being difficult.'"
        ],
        keyInsight: "Understanding each other's work styles transforms conflict into collaboration.",
        practiceExercise: "Create a simple team preference doc. Ask each person: 1) How do you prefer to receive feedback? 2) How do you make decisions? 3) How do you handle stress? Share results and use them in your next team interaction.",
        researchCitation: "Research on personality assessments and team performance from Journal of Applied Psychology (2015)"
      },
      {
        id: 11,
        title: "Team Trust Agreements",
        content: [
          "Implicit trust expectations cause unnecessary friction. Making trust commitments explicit creates clarity and accountability.",
          "**What are trust agreements?** They're specific commitments about how the team will operate: 'We'll speak directly to each other, not about each other,' 'We'll share concerns early, not wait until they explode,' 'We'll assume good intent before assuming bad intent.' These aren't corporate values posted on walls—they're working agreements referenced regularly.",
          "**How to create them:** Don't decree them top-down. Co-create with the team. Ask: 'What behaviors would help us trust each other more?' and 'What behaviors are currently damaging trust?' Synthesize responses into 5-7 clear commitments.",
          "**Examples of effective trust agreements:** 'We'll admit mistakes within 24 hours,' 'We'll ask clarifying questions before assuming intent,' 'We'll say 'I don't know' when we don't know,' 'We'll have hard conversations directly, not through intermediaries,' 'We'll keep confidential discussions confidential.'",
          "Research from high-performing teams shows that explicit agreements reduce conflict by 28% and increase follow-through by 34%. When expectations are clear, violations are obvious and can be addressed early.",
          "**The enforcement mechanism:** Trust agreements only work if they're enforced. When someone violates an agreement ('I heard you talking about Sarah behind her back, which violates our agreement'), address it. Unenforced agreements become cynicism fuel.",
          "**Review regularly.** Quarterly, revisit the agreements. Ask: 'Which are we living? Which have we abandoned? What needs to be added?' Agreements should evolve as the team matures.",
          "The power of agreements is in the permission they create. When someone says 'Can I give you hard feedback? We agreed to be direct,' the agreement makes the difficult conversation easier."
        ],
        keyInsight: "Explicit trust agreements prevent implicit trust violations.",
        practiceExercise: "Draft 3 trust commitments you want from your team. Share them and ask: 'What would you add? What's missing?' Create 5-7 final agreements together. Post them visibly and reference them in conflicts.",
        researchCitation: "Research on team charters and psychological contracts (Rousseau, 1995; Katzenbach & Smith, 1993)"
      },
      {
        id: 12,
        title: "Trust Repair",
        content: [
          "Trust will be broken. Someone will betray a confidence, miss a commitment, or violate an agreement. The question isn't whether trust will break—it's whether you can repair it.",
          "**Trust breaks come in layers:** Small breaks (missed deadline, forgotten promise) are recoverable quickly. Medium breaks (public criticism, broken confidence) require explicit repair. Large breaks (deliberate betrayal, repeated violations) may be irreparable without consequences.",
          "**The repair sequence:** (1) Acknowledge specifically what happened: 'I broke our agreement by talking about the project outside the team.' (2) Name the impact: 'That likely made you feel I can't be trusted with information.' (3) Commit to different behavior: 'Going forward, I'll check with you before sharing project details externally.' (4) Make amends if possible: 'What can I do to rebuild your trust?'",
          "**What doesn't work:** Vague apologies ('Sorry if I upset you'), defensiveness ('I had good reasons'), or rushing past it ('Let's move on'). These compound the break instead of repairing it.",
          "Research from Dr. John Gottman's work on trust repair (originally in marriages, now applied to teams) shows that successful repairs require: specificity (what exactly happened), empathy (acknowledging impact), and commitment (clear behavior change). Generic apologies don't rebuild neural pathways of trust.",
          "**The role of the violated party:** If someone breaks trust with you, you have a choice. Ghost them (breaks team effectiveness), pretend it didn't happen (breeds resentment), or engage in repair ('What you did damaged my trust. Here's what would help rebuild it'). The last option is hardest but most effective.",
          "**Time matters:** Small breaks repaired quickly (within days) restore trust faster than breaks left to fester. The longer you wait, the more the story calcifies into 'they're untrustworthy' rather than 'they made a mistake.'",
          "Teams with strong trust repair processes report 40% faster resolution of interpersonal conflicts. The skill isn't avoiding breaks—it's fixing them quickly and completely."
        ],
        keyInsight: "Trust repair is a skill that determines whether setbacks become permanent damage.",
        practiceExercise: "Identify one trust breach you need to address (recent or old). Use the repair sequence: acknowledge specifically, name impact, commit to change, make amends. Do it this week. If you're owed a repair, ask for it explicitly.",
        researchCitation: "Dr. John Gottman's trust repair research adapted to organizational settings (2011)"
      }
    ],
    quiz: [
      {
        id: "s3-q1",
        question: "During a Personal Histories exercise, a team member shares something deeply personal and another immediately offers advice. The facilitator should:",
        options: [
          { label: "A", text: "Let it happen—they're trying to help and showing care" },
          { label: "B", text: "Intervene gently: 'Thank you. Let's just listen without fixing right now.'" },
          { label: "C", text: "Move quickly to the next person to avoid awkwardness" },
          { label: "D", text: "Ask the group if anyone else has advice to offer" }
        ],
        correct: "B",
        explanation: "Personal Histories requires listening only, no fixing. The facilitator must protect the space for vulnerability. Giving advice shifts from connection to problem-solving and can make people regret sharing."
      },
      {
        id: "s3-q2",
        question: "A team uses DiSC profiles but never references them after the initial workshop. The most likely result is:",
        options: [
          { label: "A", text: "Team members will naturally adapt their styles over time" },
          { label: "B", text: "The profiles will have subconscious benefits even unused" },
          { label: "C", text: "The exercise was wasted—profiles must be actively applied to improve collaboration" },
          { label: "D", text: "People will remember their type and self-correct automatically" }
        ],
        correct: "C",
        explanation: "Research shows a 31% improvement in collaboration when teams actively USE insights, not just take assessments. Without application and reference, profiles don't change behavior—they're just expensive personality tests."
      },
      {
        id: "s3-q3",
        question: "Your team created trust agreements 6 months ago. Someone just violated one. The best response is:",
        options: [
          { label: "A", text: "Let it go—calling it out might create conflict" },
          { label: "B", text: "Address it directly: 'This violates our agreement about X. Let's talk.'" },
          { label: "C", text: "Send an anonymous reminder email about the agreements" },
          { label: "D", text: "Wait to see if it happens again before addressing" }
        ],
        correct: "B",
        explanation: "Unenforced agreements become cynicism fuel. Address violations directly but without judgment—'I noticed X, which goes against our agreement'—to maintain the integrity of the commitments. Silence signals agreements don't matter."
      },
      {
        id: "s3-q4",
        question: "A colleague broke your trust by sharing confidential information. According to trust repair research, effective repair requires:",
        options: [
          { label: "A", text: "A vague apology: 'Sorry if I upset you, let's move on'" },
          { label: "B", text: "An explanation: 'I had good reasons for sharing that information'" },
          { label: "C", text: "Specific acknowledgment, naming impact, and behavior commitment" },
          { label: "D", text: "Time—just let it blow over naturally without discussion" }
        ],
        correct: "C",
        explanation: "Gottman's trust repair research shows effective repairs require: (1) specific acknowledgment of what happened, (2) empathy for impact, (3) clear commitment to different behavior. Generic apologies and avoidance don't rebuild trust."
      }
    ]
  },
  // STRIPE 4: TRUST MASTERY
  {
    number: 4,
    name: "Trust Mastery",
    theme: "Sustaining and Deepening Trust",
    lessons: [
      {
        id: 13,
        title: "Trust Under Pressure",
        content: [
          "The real test of trust isn't in calm times—it's when stakes are high, timelines are compressed, and pressure is intense. This is when teams either lean into trust or revert to self-protection.",
          "**What happens under pressure:** Deadlines trigger our threat response. When the brain perceives pressure, it prioritizes short-term survival over long-term relationship building. This is why teams that trust each other in normal times sometimes fracture under stress.",
          "**Trust behaviors that hold under pressure:** High-trust teams don't become less honest when stressed—they become MORE honest. 'This deadline is unrealistic' gets said clearly instead of whispered. 'I need help' gets asked immediately instead of hidden until crisis. These teams move faster under pressure because communication stays clear.",
          "**Trust behaviors that collapse under pressure:** Low-trust teams experience trust regression. Meetings revert to status updates instead of problem-solving. People hoard information as protection. Blame language increases ('Why didn't you...?'). Decisions happen in closed rooms instead of openly.",
          "Research from crisis leadership studies shows that teams with strong pre-crisis trust show 34% better performance under pressure than teams without it. The trust foundation determines whether pressure reveals capability or exposes dysfunction.",
          "**How to maintain trust under pressure:** (1) Name the pressure explicitly: 'We're under intense pressure. Let's not revert to protection mode—we need honesty more than ever.' (2) Model vulnerability first: 'Here's what I'm worried about...' (3) Protect dissent: If someone raises a concern, thank them publicly: 'This is exactly what we need to hear right now.'",
          "**Recovery after pressure:** After intense periods, conduct a trust debrief. 'How did we do on maintaining our agreements under pressure? Where did trust hold? Where did it crack?' This meta-conversation prevents silent resentment from accumulating."
        ],
        keyInsight: "Trust under pressure is the real test—preparation determines whether teams rise or fracture.",
        practiceExercise: "Recall your team's last high-pressure moment. Did trust hold up, or did people revert to self-protection? What would you do differently next time? If you're currently under pressure, try the 'name it, model it, protect dissent' framework this week.",
        researchCitation: "Crisis leadership and team trust research from Harvard Kennedy School (2020)"
      },
      {
        id: 14,
        title: "Trust in Remote/Hybrid Teams",
        content: [
          "Remote and hybrid work changes how trust is built and maintained. The informal moments that build trust in person (hallway chats, lunch conversations, reading body language) disappear. Trust must be rebuilt intentionally for distributed teams.",
          "**The remote trust challenge:** Distance creates interpretation gaps. When you don't see someone's face, a delayed email response becomes 'They're ignoring me' instead of 'They're probably busy.' Lack of casual interaction means you never learn personal context that creates empathy.",
          "**Trust-building practices for remote teams:** (1) Video-on by default: Seeing faces creates connection that chat doesn't. (2) Start meetings with personal check-ins: 'How are you really?' with actual space to answer. (3) Create virtual water cooler moments: 15-minute optional coffee chats, Slack channels for non-work sharing. (4) Over-communicate appreciation: Remote teams need 3x more explicit recognition than in-person teams.",
          "**Vulnerability looks different remotely.** In person, vulnerability happens spontaneously in moments. Remotely, it must be more intentional. 'Before we dive in, I want to share—I'm really struggling with work-life balance this month. It might affect my availability after 6pm.' This creates permission for others.",
          "Research from Microsoft's remote work studies shows that remote teams form trust more slowly (40% longer to reach high trust) but can eventually reach the same levels as in-person teams if they use structured trust practices. The key word: structured. Accidental trust doesn't happen remotely.",
          "**Hybrid adds complexity.** The worst scenario: some people in conference rooms, others on Zoom. The remote members become second-class participants. Fix: Rotate in-office/remote, or everyone joins Zoom even if in the same building. Equality creates trust; hierarchy destroys it.",
          "**Async trust-building:** Not everything needs to be synchronous. Vulnerability can happen in async formats: weekly email where each person shares one win and one struggle, Slack thread for 'what I learned this week,' team journal where people reflect on challenges. Some introverts prefer written vulnerability."
        ],
        keyInsight: "Remote trust requires intentional structure—accidental connection doesn't happen through screens.",
        practiceExercise: "If you lead a remote/hybrid team, add one trust ritual this week: Start your next meeting with 'How are you really?' (video on, 30 seconds each, no crosstalk). If fully in-person, try one async practice (weekly email where you share one win and one struggle—invite replies).",
        researchCitation: "Microsoft's research on remote work and team dynamics during global distribution shift (2020-2023)"
      },
      {
        id: 15,
        title: "Onboarding New Members into High-Trust Teams",
        content: [
          "Bringing a new member into an established high-trust team is delicate. The existing team has built trust over time; the new person hasn't earned it yet. Without intentional onboarding, they'll feel like an outsider for months.",
          "**The onboarding trust challenge:** Existing team members share in shorthand, reference shared history, and are vulnerable with each other. The new person doesn't have context, doesn't know the norms, and doesn't feel safe being honest yet. They'll default to impression management.",
          "**Accelerated trust onboarding:** (1) First week: Run Personal Histories again, including the new person. Even though existing members have shared before, doing it again creates equality. (2) Explicitly share team trust agreements: 'Here's how we operate. These are our commitments to each other.' (3) Assign a trust buddy—someone who explains unwritten rules and provides safe space for questions.",
          "**What NOT to do:** Don't make the new person prove themselves before trusting them. 'They'll earn trust over time' creates a probation period that delays integration. High-trust teams default to trusting new members until proven otherwise, not the reverse.",
          "**Early vulnerability from the new person:** New members should be encouraged (not forced) to share concerns or questions early. 'I don't understand why we do X this way' or 'I'm feeling overwhelmed by all the new information' should be normalized, not seen as red flags.",
          "Research on team integration shows that new members who felt 'psychologically safe to ask questions' in their first 30 days had 56% higher performance at 6 months than those who stayed quiet. Early trust correlates with long-term success.",
          "**The existing team's role:** Model vulnerability with the new person quickly. Don't wait for them to 'get comfortable.' Share a recent mistake or current challenge in the first week. This signals: 'We're honest here—you can be too.' First impressions of team culture happen fast—shape them intentionally.",
          "Onboarding trust well means the new person feels like a full team member in weeks, not months. Poor onboarding creates outsiders who never fully integrate."
        ],
        keyInsight: "Trust onboarding determines whether new members integrate in weeks or remain outsiders for months.",
        practiceExercise: "If you're onboarding someone new, schedule these in their first week: (1) Personal Histories session (include everyone), (2) 1-on-1 to share team trust agreements explicitly, (3) Assign a buddy for questions. If you don't have someone new, document your onboarding process for next time.",
        researchCitation: "Research on newcomer adjustment and psychological safety (Morrison, 1993; Edmondson, 2003)"
      },
      {
        id: 16,
        title: "Your Trust Mastery Plan",
        content: [
          "Trust isn't a one-time achievement—it's a continuous practice. This final lesson helps you consolidate learning into a personal Trust Mastery Plan that you'll implement over the next 90 days.",
          "**Reflection: Where are you now?** Score yourself honestly: (1) Do I model vulnerability consistently? (1-10), (2) Does my team feel safe admitting mistakes? (1-10), (3) Do we have 'meetings after the meeting' or real discussion in the room? (1-10), (4) Can my team disagree with me openly? (1-10). Your lowest scores are your starting points.",
          "**Your Vulnerability First Move (next 7 days):** Choose ONE specific vulnerability you'll share with your team in the next week. Make it concrete: 'In Friday's meeting, I'll admit I don't understand our new tech stack and ask for help,' or 'I'll share with the team that I'm struggling with prioritization this quarter.' Write it down. Schedule it. Do it.",
          "**Your Trust Exercise (next 30 days):** Choose ONE structured exercise to run with your team: Personal Histories round (if you haven't done it), Trust agreements creation session, Behavioral profiling share-out, or Trust repair conversation (if there's a known issue). Block time on the calendar. Prepare. Facilitate it.",
          "**Your Trust Ritual (next 90 days):** Establish ONE recurring practice that maintains trust: Weekly check-ins starting with 'How are you really?', Monthly team retrospectives on 'How's our trust level?', Quarterly trust agreement reviews, or Friday reflections where everyone shares one thing they learned that week. Consistency compounds.",
          "**Your Trust Metric:** Pick ONE observable indicator you'll track to measure trust progress: Number of times people admit mistakes publicly (count it), Frequency of 'meetings after meetings' (ask team to self-report), Team member ratings of psychological safety (monthly pulse survey), or Speed of problem-surfacing (time from issue to team awareness). Measurement creates accountability.",
          "**The commitment:** Trust-building is leadership work, not HR work. It's not a program that runs itself. It requires your consistent attention, modeling, and protection. The plan you create here only matters if you execute it. Most leaders read about trust, nod along, and change nothing. The ones who actually DO this work see teams transform.",
          "Research across leadership development programs shows that specific, written commitments with timeline accountability increase follow-through by 73% compared to general intentions. Write your plan. Share it with someone who will check in. Then execute."
        ],
        keyInsight: "Trust mastery isn't knowledge—it's disciplined practice over time.",
        practiceExercise: "Complete your Trust Mastery Plan right now: (1) One Vulnerability First Move I'll make in the next 7 days: [Be specific], (2) One Trust Exercise I'll run with my team in the next 30 days: [Which one?], (3) One Trust Ritual I'll establish in the next 90 days: [What and when?], (4) One metric I'll track to measure trust progress: [How will I measure?]. Save this. Review it in 90 days.",
        researchCitation: "Leadership commitment and behavior change research (Kegan & Lahey, 2009; Heath & Heath, 2010)"
      }
    ],
    quiz: [
      {
        id: "s4-q1",
        question: "Your team faces a sudden deadline crisis. According to research, high-trust teams under pressure will:",
        options: [
          { label: "A", text: "Become MORE honest and direct about concerns and needs" },
          { label: "B", text: "Revert to protection mode and start hoarding information" },
          { label: "C", text: "Become overly polite to avoid adding stress" },
          { label: "D", text: "Wait for the leader to make all decisions to save time" }
        ],
        correct: "A",
        explanation: "High-trust teams get MORE honest under pressure, not less. They know transparency speeds up problem-solving. Low-trust teams regress to self-protection when stressed, which slows everything down."
      },
      {
        id: "s4-q2",
        question: "Research shows remote teams need _____ more explicit recognition than in-person teams to maintain trust:",
        options: [
          { label: "A", text: "The same amount—trust is trust regardless of location" },
          { label: "B", text: "2x more" },
          { label: "C", text: "3x more" },
          { label: "D", text: "Actually less, since remote work is more asynchronous" }
        ],
        correct: "C",
        explanation: "Remote teams need approximately 3x more explicit appreciation and recognition because casual positive signals (smile in hallway, thumbs up in meeting) don't exist. What happens naturally in-person must be intentional remotely."
      },
      {
        id: "s4-q3",
        question: "A new team member joins your high-trust team. The best practice for integration is:",
        options: [
          { label: "A", text: "Let them observe for 30 days to learn the culture before participating" },
          { label: "B", text: "Have them prove reliability before trusting them with vulnerability" },
          { label: "C", text: "Re-run Personal Histories with everyone, model vulnerability early, assign a trust buddy" },
          { label: "D", text: "Give them a document about team values and let them adapt naturally" }
        ],
        correct: "C",
        explanation: "Research shows new members who experience psychological safety in their first 30 days perform 56% better at 6 months. Re-running trust exercises creates equality, early vulnerability from the team models norms, and a buddy provides safe space for questions."
      },
      {
        id: "s4-q4",
        question: "According to research on leadership behavior change, what increases follow-through by 73%?",
        options: [
          { label: "A", text: "Reading about best practices and understanding concepts" },
          { label: "B", text: "Attending workshops and taking notes" },
          { label: "C", text: "Writing specific commitments with timelines and accountability" },
          { label: "D", text: "General intentions to 'do better' at trust-building" }
        ],
        correct: "C",
        explanation: "Specific, written commitments with timelines and someone checking in increase follow-through by 73%. Knowledge doesn't change behavior—structured accountability does. Your Trust Mastery Plan only works if it's written and tracked."
      }
    ]
  }
];


