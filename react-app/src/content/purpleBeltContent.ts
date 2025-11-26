/**
 * PURPLE BELT - LACK OF COMMITMENT (Buy-In & Clarity)
 * 
 * Theme: Getting genuine commitment and creating clarity around decisions
 * Focus: Moving from fake agreement to real buy-in, cascading decisions clearly
 * 
 * 4 Stripes × 4 Lessons = 16 Lessons Total
 */

interface Lesson {
  id: number;
  title: string;
  content: string[];
  keyInsight: string;
  practiceExercise: string;
  researchCitation: string;
}

interface Quiz {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
}

interface Stripe {
  number: number;
  name: string;
  theme: string;
  lessons: Lesson[];
  quiz: Quiz[];
}

export const purpleBeltContent: Stripe[] = [
  // STRIPE 1: COMMITMENT FOUNDATIONS
  {
    number: 1,
    name: "Commitment Foundations",
    theme: "Understanding Real Commitment vs. Fake Agreement",
    lessons: [
      {
        id: 1,
        title: "What Real Commitment Looks Like",
        content: [
          "Most teams confuse compliance with commitment. People nod in meetings, then do nothing. Or worse, they do something different than what was decided. This is the dysfunction Lencioni calls 'Lack of Commitment.'",
          "**Real commitment** has three markers: (1) Clarity on what was decided, (2) Buy-in from those executing, (3) Accountability for delivery. Without all three, you have fake agreement.",
          "**Clarity:** Can everyone on the team state, in their own words, what was decided and why? If there's ambiguity, there's no commitment. Lencioni says: 'Clarity is the antidote to anxiety.'",
          "**Buy-in:** Did people have a genuine chance to voice concerns and be heard? Amazon's principle 'disagree and commit' only works if the 'disagree' part happens fully. Otherwise, it's just 'comply silently.'",
          "**Accountability:** Will there be follow-up? If decisions vanish into the void after meetings, people learn their commitment doesn't matter. Follow-through signals that commitments are real.",
          "Research from McKinsey shows that teams with high commitment execute 25% faster and with 40% fewer mid-course corrections. Why? Because everyone is rowing in the same direction, not hedging their bets or working on shadow agendas.",
          "The cost of fake commitment: wasted resources, duplicated effort, confusion about priorities, and erosion of trust. Every 'yes' that doesn't mean 'yes' damages the team's ability to function."
        ],
        keyInsight: "Commitment requires clarity, buy-in, and accountability—not just nodding heads.",
        practiceExercise: "After your next team decision, test commitment. Ask each person: 'Can you summarize what we decided and why?' Then: 'Are you committed to this, even if you initially disagreed?' Document the responses.",
        researchCitation: "Lencioni's 'Lack of Commitment' research; McKinsey organizational effectiveness studies"
      },
      {
        id: 2,
        title: "Consensus vs. Commitment",
        content: [
          "Many leaders believe they need consensus—everyone must agree—before moving forward. This is a trap that leads to slow decisions, watered-down strategies, and exhausted teams.",
          "**Consensus** = Everyone agrees. **Commitment** = Everyone supports the decision, even those who initially disagreed. You need the latter, not the former.",
          "Seeking consensus on every decision creates three problems: (1) Endless debates that erode energy, (2) Compromise solutions that satisfy no one, (3) Lowest-common-denominator thinking that avoids bold moves.",
          "Intel's Andy Grove famously practiced 'disagree and commit.' His leadership team would debate fiercely, but once a decision was made, everyone executed as if it were their own idea. Dissent happened before the decision, not after.",
          "**When consensus IS important:** Values, culture, foundational strategy. **When commitment is enough:** Most tactical decisions, resource allocation, execution plans.",
          "The key question: 'Do we need everyone to agree, or do we need everyone to commit?' The latter is achievable even when the former isn't.",
          "Research from Stanford's Bob Sutton shows that teams that distinguish between consensus and commitment make decisions 3x faster without sacrificing execution quality. Speed comes from knowing when debate must end and action must begin."
        ],
        keyInsight: "Seek commitment, not consensus—you can commit to a decision you initially opposed.",
        practiceExercise: "Identify one recent decision where you tried to achieve consensus. Ask: 'Could we have moved forward with commitment instead?' What would have changed?",
        researchCitation: "Andy Grove's 'High Output Management'; Bob Sutton's decision-making research"
      },
      {
        id: 3,
        title: "The Commitment Tax (Cost of Ambiguity)",
        content: [
          "Every moment of ambiguity after a decision is made costs the team time, energy, and momentum. This is the 'Commitment Tax'—and most teams pay it daily without realizing.",
          "**What ambiguity looks like:** 'We should probably focus more on X' (What does 'probably' and 'more' mean?). 'Let's aim for better performance' (What metric? By when? How much better?).",
          "**The tax compounds:** Week 1: Team members interpret the decision differently. Week 2: They execute in conflicting directions. Week 3: Someone realizes the misalignment. Week 4: Frustration, blame, and rework. All because the original decision lacked clarity.",
          "Research from the Neuroleadership Institute shows that ambiguity triggers the brain's threat response. People under ambiguous direction experience 30% higher stress and 25% lower productivity compared to those with clear expectations.",
          "**Paying the tax:** Repeated clarification meetings. Email chains seeking confirmation. Work done and undone. Relationships strained by misunderstanding. Opportunities missed because the team was stuck in confusion.",
          "**Avoiding the tax:** Make clarity a non-negotiable. After decisions, explicitly state: What are we doing? By when? Who owns it? What does success look like? Until everyone can answer these, the decision isn't real.",
          "The ruthless question: 'Is everyone clear enough to act independently and still be aligned?' If not, you're about to pay the Commitment Tax."
        ],
        keyInsight: "Ambiguity after decisions is expensive—clarity is the best investment.",
        practiceExercise: "Audit your last 3 team decisions. Score each on clarity (1-10): What exactly was decided? Who owns it? By when? What does success look like? Where did you score lowest?",
        researchCitation: "Neuroleadership Institute research on ambiguity and stress; organizational clarity studies"
      },
      {
        id: 4,
        title: "Signs of Commitment Dysfunction",
        content: [
          "How do you know when your team lacks genuine commitment? Watch for these behavioral markers:",
          "**Sign 1: Analysis Paralysis:** Decisions get revisited endlessly. Every meeting reopens settled questions. Nothing ever feels 'final.' This signals people never truly committed.",
          "**Sign 2: Misaligned Execution:** Team members pursue different priorities, claiming each is 'what we agreed to.' If everyone remembers the decision differently, there was no real decision.",
          "**Sign 3: Hedged Language:** 'I'll try' instead of 'I will.' 'Hopefully' instead of 'definitely.' 'If we can' instead of 'we will.' This language reveals uncommitted intent.",
          "**Sign 4: Silent Non-Compliance:** No one disagrees in the meeting, but nobody follows through either. Work continues on old priorities while new ones are ignored.",
          "**Sign 5: Constant Surprises:** Deadlines that 'everyone knew about' catch people off guard. Priorities that were 'clearly communicated' are news to half the team.",
          "**Sign 6: Frequent Escalations:** Minor execution questions bounce back up to leadership because people lack confidence in what was decided.",
          "Research shows that teams with commitment dysfunction take 40% longer to complete projects and experience 60% more scope creep. Why? Because no one is working from the same blueprint.",
          "The diagnostic: If your team spends more time clarifying old decisions than making new ones, you have a commitment problem, not a communication problem."
        ],
        keyInsight: "Commitment dysfunction appears as reopened decisions, misaligned execution, and hedged language.",
        practiceExercise: "Score your team 1-10 on each warning sign. Which is your biggest commitment killer? Share this assessment with your team and discuss.",
        researchCitation: "Lencioni's commitment dysfunction research; project management effectiveness studies"
      }
    ],
    quiz: [
      {
        id: "p1-q1",
        question: "According to Lencioni, real commitment requires three elements. Which of the following is NOT one of them?",
        options: [
          { label: "A", text: "Clarity on what was decided" },
          { label: "B", text: "Buy-in from those executing" },
          { label: "C", text: "Unanimous agreement from everyone" },
          { label: "D", text: "Accountability for delivery" }
        ],
        correct: "C",
        explanation: "Real commitment requires clarity, buy-in, and accountability—not unanimous agreement. You can commit to a decision you initially disagreed with if you were heard and the path forward is clear."
      },
      {
        id: "p1-q2",
        question: "What is the primary difference between consensus and commitment?",
        options: [
          { label: "A", text: "Consensus means everyone agrees; commitment means everyone supports the decision even if they disagreed" },
          { label: "B", text: "They are the same thing" },
          { label: "C", text: "Consensus is faster than commitment" },
          { label: "D", text: "Commitment doesn't require any discussion" }
        ],
        correct: "A",
        explanation: "Consensus requires full agreement; commitment requires full support of execution, even from those who initially disagreed. Andy Grove's 'disagree and commit' principle demonstrates this distinction."
      },
      {
        id: "p1-q3",
        question: "The 'Commitment Tax' refers to:",
        options: [
          { label: "A", text: "The financial cost of making team decisions" },
          { label: "B", text: "The time, energy, and momentum lost due to ambiguous decisions" },
          { label: "C", text: "The price of hiring consultants to help with commitment issues" },
          { label: "D", text: "Mandatory training on commitment for new employees" }
        ],
        correct: "B",
        explanation: "The Commitment Tax is the compounding cost of ambiguity after decisions. Unclear direction leads to misaligned work, repeated clarifications, rework, and lost opportunities."
      },
      {
        id: "p1-q4",
        question: "Which phrase is a sign of hedged language indicating lack of commitment?",
        options: [
          { label: "A", text: "'I will deliver this by Friday'" },
          { label: "B", text: "'I'll try to get it done if I can'" },
          { label: "C", text: "'I commit to completing this milestone'" },
          { label: "D", text: "'I own this deliverable'" }
        ],
        correct: "B",
        explanation: "'I'll try if I can' is hedged language that reveals uncommitted intent. Real commitment uses definitive language: 'I will' not 'I'll try,' 'definitely' not 'hopefully.'"
      }
    ]
  },
  // STRIPE 2: CREATING CLARITY
  {
    number: 2,
    name: "Creating Clarity",
    theme: "Techniques for Crystal-Clear Decision Communication",
    lessons: [
      {
        id: 5,
        title: "Cascading Communication",
        content: [
          "Decisions made at one level must cascade down clearly to every level that needs to act on them. Most organizations fail at this, creating what Patrick Lencioni calls 'silos of clarity' separated by chasms of confusion.",
          "**The Cascade Model:** Leadership decides → Middle managers translate → Front-line understands and acts. But at each step, 40-60% of clarity is lost unless you build in deliberate mechanisms.",
          "**Why cascades fail:** (1) Assumption that 'telling once' is enough, (2) Different interpretations at each level, (3) No verification that the message landed, (4) Competing priorities that drown out the signal.",
          "**Effective cascading requires:** (1) Consistent message across all channels, (2) Leaders at each level who can answer 'why this matters to us specifically,' (3) Two-way verification ('What did you hear?'), (4) Written reinforcement (not just verbal).",
          "Research from McKinsey shows that companies with strong cascading communication mechanisms execute strategy 35% more effectively. Every level knows not just WHAT to do, but WHY it matters and HOW it connects to their work.",
          "**The Cascade Test:** Can an individual contributor explain the decision and its rationale in their own words? If not, the cascade failed somewhere.",
          "Best practice: Leaders repeat key messages 7-10 times across multiple channels before they penetrate. Once is never enough."
        ],
        keyInsight: "Cascading decisions requires repetition, translation, and verification at every level.",
        practiceExercise: "Take one recent major decision. Map its cascade: Who needed to know? How was it communicated to each level? Can someone 3 levels down explain it? Test it.",
        researchCitation: "Lencioni on cascading communication; McKinsey strategy execution research"
      },
      {
        id: 6,
        title: "Decision Documentation",
        content: [
          "The palest ink is better than the strongest memory. Decisions that aren't documented are decisions that never happened—or will be endlessly re-litigated.",
          "**What to document:** (1) What was decided (specific and measurable), (2) Who owns it, (3) By when, (4) Success criteria, (5) Key concerns raised and how they were addressed, (6) Who was in the room.",
          "**Why concerns matter:** Documenting dissent isn't negative—it's protective. When someone says 'I was worried about X and we decided to proceed anyway,' everyone knows that risk was considered. This prevents 'I told you so' dynamics later.",
          "**The Decision Log:** High-performing teams maintain a living document of major decisions. Each entry includes the 6 elements above. This becomes the 'source of truth' when memories diverge.",
          "Research from Harvard Business Review shows that teams with documented decisions spend 50% less time re-clarifying and 40% less time in 'did we decide this?' debates. Documentation creates accountability and clarity.",
          "**The simplest format:** Date | Decision | Owner | Deadline | Success looks like | Concerns raised | Attendees. One row per decision. Shared and visible to all.",
          "The commitment boost: When people see their input documented, they feel heard. Feeling heard drives buy-in. Buy-in drives commitment."
        ],
        keyInsight: "Documented decisions create accountability and prevent endless re-litigation.",
        practiceExercise: "Start a Decision Log for your team. Document your next 3 decisions using the 6-element format. Share it and ask: 'Is this what we all agreed to?'",
        researchCitation: "Harvard Business Review on decision documentation; organizational memory research"
      },
      {
        id: 7,
        title: "The Clarity Canvas",
        content: [
          "The Clarity Canvas is a one-page tool for aligning teams around major initiatives. It answers the critical questions that, when left unanswered, create commitment dysfunction.",
          "**The 6 Questions:** (1) What are we doing (specifically)? (2) Why does this matter (the real reason, not platitudes)? (3) Who is responsible (one name, not a committee)? (4) By when (exact date, not 'soon')? (5) How do we measure success (observable, not subjective)? (6) What are we NOT doing (trade-offs made)?",
          "**Why 'What we're NOT doing' matters:** Commitment often fails because people say yes to everything. When you explicitly name what you're de-prioritizing to make room for this, you create real buy-in.",
          "Example: 'We're launching Product X by Q2. That means we're delaying the redesign and reducing support hours for Legacy Product Y.' Now everyone knows what they're trading.",
          "Research from Stanford's Robert Sutton shows that teams using clarity frameworks make faster decisions (2x), with higher commitment (30% more follow-through), and less second-guessing (50% fewer revision requests).",
          "**The discipline:** Force yourself to answer all 6 questions BEFORE moving forward. If you can't, you're not ready to decide. Clarify first, commit second.",
          "The Canvas becomes a living document: update it when circumstances change, but document the change so everyone knows."
        ],
        keyInsight: "The Clarity Canvas forces answers to the questions that prevent commitment dysfunction.",
        practiceExercise: "Use the Clarity Canvas on your team's current top priority. Answer all 6 questions. Share it. Notice where resistance shows up—that's where clarity was missing.",
        researchCitation: "Robert Sutton's clarity framework research; decision quality studies"
      },
      {
        id: 8,
        title: "Deadline Discipline",
        content: [
          "Deadlines are commitment's forcing function. Without them, 'we'll do this' becomes 'we'll get to it eventually' becomes 'why didn't we do that again?'",
          "**The problem with 'soft deadlines':** When deadlines slip without consequence, people learn that commitments are flexible. This trains the team to ignore future commitments. Deadline discipline isn't about rigidity; it's about integrity.",
          "**Hard deadlines vs. Target dates:** Hard deadlines are immovable (product launch, client deliverable, regulatory filing). Target dates are aspirational (internal milestones, continuous work). Conflating the two creates confusion. Be explicit about which you're setting.",
          "**What to do when a deadline is at risk:** Surface it early. 'We committed to X by Y, and we're tracking to miss it by Z.' Then: 'What do we need to change (scope, resources, dependencies) to hit it, or should we renegotiate?' Renegotiation with notice is better than silent slippage.",
          "Research from Microsoft Project Management shows that teams with consistent deadline discipline complete 40% more projects on time. Why? Because people believe deadlines matter, so they plan accordingly and escalate issues early.",
          "**The accountability mechanism:** After missed deadlines, conduct a retrospective: 'Why did we miss it? What warning signs did we ignore? How do we prevent this pattern?' This reinforces that deadlines are commitments, not suggestions.",
          "The trust equation: Reliable deadlines → Predictable execution → Stakeholder trust → More autonomy. Missed deadlines destroy all four."
        ],
        keyInsight: "Deadlines create commitment discipline—treat them as promises, not aspirations.",
        practiceExercise: "Review your last 5 commitments with deadlines. How many hit on time? For those that slipped, why? Was it surfaced early or discovered late? What pattern do you see?",
        researchCitation: "Microsoft Project Management research; deadline psychology studies"
      }
    ],
    quiz: [
      {
        id: "p2-q1",
        question: "According to research, how much clarity is typically lost at each level of organizational cascade?",
        options: [
          { label: "A", text: "10-20%" },
          { label: "B", text: "25-35%" },
          { label: "C", text: "40-60%" },
          { label: "D", text: "75-80%" }
        ],
        correct: "C",
        explanation: "Research shows 40-60% of clarity is lost at each cascade level unless organizations build in deliberate mechanisms for verification and translation."
      },
      {
        id: "p2-q2",
        question: "What is the main benefit of documenting dissenting opinions when recording a decision?",
        options: [
          { label: "A", text: "It slows down decision-making to make everyone feel included" },
          { label: "B", text: "It prevents 'I told you so' dynamics and shows risks were considered" },
          { label: "C", text: "It allows people to avoid responsibility later" },
          { label: "D", text: "It creates unnecessary negativity" }
        ],
        correct: "B",
        explanation: "Documenting concerns shows that risks were surfaced and considered. This prevents later blame dynamics and actually increases commitment because people feel heard."
      },
      {
        id: "p2-q3",
        question: "The Clarity Canvas includes 'What we're NOT doing.' Why is this important?",
        options: [
          { label: "A", text: "It's not important; focus only on what you're doing" },
          { label: "B", text: "It creates negativity by highlighting what you're abandoning" },
          { label: "C", text: "It makes explicit the trade-offs, which increases real buy-in" },
          { label: "D", text: "It's just a space filler on the template" }
        ],
        correct: "C",
        explanation: "Naming what you're NOT doing (de-prioritizing) makes trade-offs explicit. This prevents people from saying yes to everything and creates genuine commitment to priorities."
      },
      {
        id: "p2-q4",
        question: "When a deadline is at risk, what should you do?",
        options: [
          { label: "A", text: "Stay silent and hope you can make it up" },
          { label: "B", text: "Surface it early and discuss scope, resources, or renegotiation" },
          { label: "C", text: "Blame external factors and move on" },
          { label: "D", text: "Miss it quietly and set a new deadline without telling anyone" }
        ],
        correct: "B",
        explanation: "Early escalation allows the team to adjust scope, resources, or deadlines with notice. Silent slippage destroys trust. Renegotiation with transparency maintains integrity."
      }
    ]
  },
  // STRIPE 3: DRIVING BUY-IN
  {
    number: 3,
    name: "Driving Buy-In",
    theme: "Techniques for Getting Genuine Support",
    lessons: [
      {
        id: 9,
        title: "Input vs. Decision Rights",
        content: [
          "One of the biggest commitment killers: people confuse having input with having decision rights. When everyone expects to decide, no decision gets made. When no one has input, no one commits.",
          "**Input** = The right to voice opinions, concerns, and alternatives. **Decision rights** = The authority to make the final call. High-performing teams are crystal clear about who has which.",
          "**The RACI Model Applied:** Responsible (does the work), Accountable (makes the decision and owns outcomes), Consulted (provides input), Informed (needs to know). Most teams have 5 people 'Accountable' when only 1 should be.",
          "**Why this matters for commitment:** When people know they'll have input but someone else decides, they can commit even when the decision goes against their recommendation. But if they thought they had decision rights and were overruled, resentment builds.",
          "Example: Marketing wants input on product features (Consulted), but Product leads the decision (Accountable). Everyone knows this upfront. When Product chooses differently, Marketing still commits because their voice was heard and the process was fair.",
          "Research from INSEAD shows that perceived fairness of decision process matters more than the decision itself for commitment. People will commit to decisions they disagree with if the process felt fair.",
          "**The explicit conversation:** 'On this decision, I'm seeking input from X, Y, Z. I'll make the final call by Friday. If you disagree, I want to hear it now. After Friday, we all commit.' This creates safety to dissent AND clarity on who decides."
        ],
        keyInsight: "Separate input from decision rights—people can commit when process is clear and fair.",
        practiceExercise: "Map your next major decision: Who has input? Who decides? Who just needs to be informed? Share this RACI explicitly before discussing the decision.",
        researchCitation: "INSEAD research on procedural justice and commitment"
      },
      {
        id: 10,
        title: "The 'Disagree and Commit' Protocol",
        content: [
          "Amazon's 'disagree and commit' principle is famous. But most teams implement it wrong. They skip the 'disagree' part and jump straight to 'commit'—which is just compliance with a fancy name.",
          "**The protocol has 3 phases:** (1) **Disagree Fully** - Voice your concerns, advocate for alternatives, debate the decision vigorously. (2) **Decide Clearly** - Someone makes a call, with reasons. (3) **Commit Completely** - Everyone supports the decision publicly and in execution, as if it were their idea.",
          "**Phase 1 is non-negotiable:** If people don't feel safe to disagree fully, they won't commit fully. Skipping debate to 'move fast' actually slows execution because people drag their feet on decisions they never bought into.",
          "**What 'commit completely' means:** You don't undermine the decision in side conversations. You don't execute half-heartedly. You don't wait for it to fail so you can say 'I told you so.' You give it your full effort.",
          "**When to revisit:** The decision stands unless circumstances fundamentally change or new information emerges that invalidates core assumptions. Then you surface it transparently: 'We committed to X based on Y assumption. Y is no longer true. Should we revisit?'",
          "Research from organizational psychology shows that teams explicitly practicing 'disagree and commit' report 40% higher team commitment scores and 35% faster decision-to-action cycles compared to consensus-seeking teams.",
          "**The leader's role:** Model it. 'I disagreed with the CEO on this strategy, but we've decided to proceed. Here's why it might work, and here's how we're going to execute it fully.' This gives permission for others to do the same."
        ],
        keyInsight: "'Disagree and commit' requires FULL disagree first, then FULL commit—not fake harmony.",
        practiceExercise: "Practice the protocol explicitly in your next decision. After debate, say: 'We've decided X. For those who disagreed, I want to hear your commitment statement: How will you support this?' Document it.",
        researchCitation: "Amazon leadership principles; organizational commitment research"
      },
      {
        id: 11,
        title: "Thematic Goals",
        content: [
          "Patrick Lencioni's 'Thematic Goal' is a single, qualitative focus for a defined period (usually a quarter or year). It's the rallying cry that aligns everyone. Without it, teams fracture into competing priorities.",
          "**What makes a Thematic Goal effective:** (1) **Qualitative** - It's inspiring, not just a metric. 'Become the industry leader in customer trust' vs. 'Increase NPS by 5 points.' (2) **Singular** - One goal, not five. (3) **Time-bound** - Clear start and end. (4) **Unifying** - Every department can connect their work to it.",
          "**Why singular focus matters:** Research shows that teams with more than 3 priorities have essentially no priorities. Everything competes for attention, nothing gets full commitment. One Thematic Goal forces trade-offs.",
          "**The Defining Objectives:** Under the Thematic Goal sit 3-5 Defining Objectives (these can be quantitative). Example: Thematic Goal = 'Launch successfully in Europe.' Objectives = Localize product by Q2, Hire 10 sales reps by Q3, Achieve €1M ARR by Q4.",
          "**How this drives commitment:** When everyone knows THE goal, daily decisions become easier. 'Does this support our Thematic Goal?' If no, defer it. This clarity prevents the ambiguity that erodes commitment.",
          "Research from OKR implementations (Objectives and Key Results) shows similar patterns: teams with a clear singular objective achieve 2.5x more of their goals than teams with scattered priorities.",
          "**The rhythm:** Quarterly Thematic Goals with monthly check-ins. At each check-in, ask: 'Are we on track? What's blocking us? Do we need to adjust tactics?' This keeps commitment alive and visible."
        ],
        keyInsight: "A singular Thematic Goal unifies the team and forces prioritization, driving commitment.",
        practiceExercise: "Draft a Thematic Goal for your team's next quarter. Make it qualitative, singular, and inspiring. Then identify 3-5 measurable Defining Objectives beneath it. Test it with the team.",
        researchCitation: "Lencioni's Thematic Goal framework; OKR research from Doerr's 'Measure What Matters'"
      },
      {
        id: 12,
        title: "Commitment Ceremonies",
        content: [
          "Rituals matter. They transform abstract commitments into tangible moments. High-performing teams don't just 'decide things'—they create commitment ceremonies that make commitments real and social.",
          "**What is a commitment ceremony?** A structured moment where commitments are made explicit, public, and witnessed. Examples: Sprint planning (Agile), quarterly kickoff meetings, project launch events, verbal 'go-arounds' where each person states their commitment.",
          "**Why ceremonies work:** (1) **Public commitment** - Social psychology shows we're more likely to follow through on commitments made publicly. (2) **Shared witness** - The team sees who committed to what. (3) **Symbolic significance** - It marks a transition from discussion to action.",
          "**The simplest ceremony:** After a decision, go around the room (or virtual room). Each person answers: 'What am I committing to do to support this decision?' Write it down. Display it visibly. Follow up on it.",
          "**The quarterly commitment kickoff:** Leadership presents the Thematic Goal and Defining Objectives. Each department shares their key initiatives. Everyone sees how the pieces fit together. The meeting ends with a collective commitment: 'We're all in.' Then you execute.",
          "Research from organizational behavior shows that teams with explicit commitment rituals have 50% higher goal attainment and 30% better cross-functional collaboration. Why? Because commitment was public, not private.",
          "**The celebration ceremony:** When the goal is achieved, gather and acknowledge it. 'We committed to X. We delivered. Here's what we learned.' This closes the loop and reinforces that commitments matter."
        ],
        keyInsight: "Commitment ceremonies make abstract agreements tangible, public, and socially binding.",
        practiceExercise: "Create a commitment ceremony for your team's next major initiative. Have each person publicly state their commitment. Document it. Follow up at the halfway point: 'Are we delivering on what we said?'",
        researchCitation: "Social psychology research on public commitment; organizational ritual studies"
      }
    ],
    quiz: [
      {
        id: "p3-q1",
        question: "In the RACI model, who makes the final decision and owns the outcomes?",
        options: [
          { label: "A", text: "Responsible (does the work)" },
          { label: "B", text: "Accountable (makes decision, owns outcomes)" },
          { label: "C", text: "Consulted (provides input)" },
          { label: "D", text: "Informed (needs to know)" }
        ],
        correct: "B",
        explanation: "Accountable = decision rights and ownership. Responsible does the work, Consulted provides input, Informed needs to know. Clarity on these roles prevents commitment dysfunction."
      },
      {
        id: "p3-q2",
        question: "Amazon's 'disagree and commit' protocol requires what FIRST?",
        options: [
          { label: "A", text: "Immediate commitment without discussion" },
          { label: "B", text: "Full, vigorous disagreement and debate" },
          { label: "C", text: "Anonymous voting" },
          { label: "D", text: "Consensus from everyone" }
        ],
        correct: "B",
        explanation: "Phase 1 is 'Disagree Fully'—voice concerns, advocate alternatives, debate vigorously. Without full disagreement first, 'commit' is just compliance. The protocol only works when both phases are honored."
      },
      {
        id: "p3-q3",
        question: "According to research, teams with more than how many priorities essentially have NO priorities?",
        options: [
          { label: "A", text: "More than 1" },
          { label: "B", text: "More than 3" },
          { label: "C", text: "More than 7" },
          { label: "D", text: "More than 10" }
        ],
        correct: "B",
        explanation: "More than 3 priorities = no priorities. Everything competes for attention, nothing gets full commitment. Lencioni's Thematic Goal is singular for this reason—it forces trade-offs and creates clarity."
      },
      {
        id: "p3-q4",
        question: "What makes commitment ceremonies effective?",
        options: [
          { label: "A", text: "They waste time that could be spent working" },
          { label: "B", text: "They make commitments public, witnessed, and socially binding" },
          { label: "C", text: "They're only useful for large companies" },
          { label: "D", text: "They replace the need for actual follow-up" }
        ],
        correct: "B",
        explanation: "Commitment ceremonies work because they make commitments public (social psychology: we follow through on public commitments), witnessed by the team, and symbolically significant. They mark the transition from discussion to action."
      }
    ]
  },
  // STRIPE 4: COMMITMENT MASTERY
  {
    number: 4,
    name: "Commitment Mastery",
    theme: "Advanced Commitment in Complex Situations",
    lessons: [
      {
        id: 13,
        title: "Commitment Under Uncertainty",
        content: [
          "The hardest commitments to secure are those made under uncertainty. Leaders often wait for perfect information before deciding—but perfect information never comes. High-performing teams commit decisively even when the path isn't clear.",
          "**The 70% rule:** Amazon's Jeff Bezos says most decisions can be made with 70% of the information you wish you had. Waiting for 90% means you're moving too slowly. Commit with 70%, adjust with speed.",
          "**Type 1 vs. Type 2 decisions:** Type 1 = Irreversible or very costly to reverse (hiring key leaders, major acquisitions). These require more analysis. Type 2 = Reversible (most decisions). These require speed over certainty.",
          "**How to commit under uncertainty:** (1) Name the uncertainty explicitly: 'We don't know X, Y, Z.' (2) State your assumptions: 'We're proceeding based on A, B, C being true.' (3) Define decision checkpoints: 'We'll review this in 30 days and adjust.' (4) Commit to the direction, not the exact path.",
          "Research from venture capital and startup ecosystems shows that speed of learning beats depth of planning. Teams that commit quickly, test, and iterate outperform those that plan endlessly.",
          "**The courage gap:** Most commitment failures under uncertainty aren't due to lack of information—they're due to fear of being wrong. Leaders must model comfort with ambiguity and course-correction.",
          "**The commitment statement:** 'We're committing to X based on our current best understanding. We expect to learn and adjust. The commitment is to the outcome, not to being right about every detail.'"
        ],
        keyInsight: "Commit with 70% information and adjust with speed—perfect clarity never comes.",
        practiceExercise: "Identify one decision you're delaying due to uncertainty. Ask: 'Do we have 70% of what we need?' If yes, commit. Name assumptions and set a review checkpoint in 30 days.",
        researchCitation: "Bezos' 70% rule; lean startup methodology research"
      },
      {
        id: 14,
        title: "When to Revisit Decisions",
        content: [
          "Commitment doesn't mean stubbornness. Circumstances change. New information emerges. The question is: when should you revisit a decision vs. when should you stay the course?",
          "**Valid reasons to revisit:** (1) Core assumptions proven false, (2) External environment shifts fundamentally (market crash, regulatory change, competitor disruption), (3) Unintended consequences at scale (pilot looked good, rollout is failing), (4) Better option emerges that wasn't available before.",
          "**Invalid reasons to revisit:** (1) It's hard (commitment is supposed to be hard), (2) Someone disagrees (they should have spoken up before the decision), (3) Early results are mixed (most things get worse before they get better), (4) Leader gets nervous (stay the course unless fundamentals changed).",
          "**The decision review protocol:** (1) Surface the concern: 'I think we need to revisit X because Y.' (2) Gather the team: Don't unilaterally reverse. (3) Review assumptions: 'What did we believe then? What do we know now?' (4) Decide: Pivot, persevere, or pause. (5) Re-commit: Whatever the new direction, commit fully.",
          "Research from agile methodology shows that regular checkpoints (sprints, retrospectives) allow teams to adjust without thrashing. The rhythm of 'commit, execute, review, adjust' prevents both premature abandonment and stubborn adherence.",
          "**The transparency principle:** If you're revisiting a decision, say so explicitly and explain why. 'We committed to X. Assumption Y has changed. We're now committing to Z.' This maintains trust even when direction shifts.",
          "The worst case: repeatedly changing direction without clear reasons. This trains teams that commitments don't matter."
        ],
        keyInsight: "Revisit decisions when fundamentals change, not when execution gets hard.",
        practiceExercise: "Review a recent pivot your team made. Was it due to changed fundamentals or execution difficulty? Was the decision to pivot communicated clearly? What did you learn?",
        researchCitation: "Agile sprint methodology; organizational change management research"
      },
      {
        id: 15,
        title: "Commitment Across Levels",
        content: [
          "Leadership commits to a strategy. Middle management commits to tactics. Front-line commits to execution. When these layers aren't aligned, the organization fractures. Cascading commitment is an art.",
          "**The alignment problem:** Leadership sees the big picture and long-term. Front-line sees immediate reality and customer pain. Middle management is caught between. Without translation at each level, commitment breaks down.",
          "**Translation, not transmission:** Leadership can't just 'transmit' decisions downward. Each level must translate: 'Here's what this means for us. Here's why it matters to our work specifically.' That translation creates local buy-in.",
          "**The two-way flow:** Commitment also flows upward. Front-line commits to execution IF middle management commits to removing obstacles IF leadership commits to providing resources. Each level has commitments to the others.",
          "**The broken telephone effect:** Message degrades at each level. Research shows 60% of strategic intent is lost between C-suite and front-line. Combat this with: (1) Consistent messaging, (2) Leader availability for questions, (3) Feedback loops ('What are you hearing?'), (4) Written reinforcement.",
          "**The commitment chain:** Each manager must be able to say to their team: 'I am personally committed to this. Here's why. Here's what I need from you. Here's what I'll provide you.' Personal commitment from direct leaders matters more than broad company announcements.",
          "Research from Gallup shows that the single biggest driver of employee engagement is the immediate manager's commitment to team success. Cascade begins with leaders who personally own the message."
        ],
        keyInsight: "Commitment must be translated and owned at every level, not just transmitted down.",
        practiceExercise: "Take your organization's top strategic priority. Interview people at 3 levels: leadership, middle, front-line. Ask each: 'What is our top priority and why does it matter?' Notice where the message degrades.",
        researchCitation: "Gallup employee engagement research; organizational alignment studies"
      },
      {
        id: 16,
        title: "From Commitment to Accountability (Bridge to Brown Belt)",
        content: [
          "Commitment without accountability is just hopeful thinking. This lesson bridges Purple Belt (Commitment) to Brown Belt (Accountability). Both are required for results.",
          "**The relationship:** Commitment = 'We agree to do this.' Accountability = 'We will track progress and address gaps.' You can't hold someone accountable to something they never committed to. And commitment without follow-up becomes meaningless.",
          "**Why teams resist accountability:** Not because they don't want results, but because accountability feels like judgment. If the culture punishes mistakes, people avoid accountability. If commitment was never clear, accountability feels unfair.",
          "**Building the bridge:** (1) Make commitments explicit and measurable, (2) Agree upfront on how progress will be tracked, (3) Create regular checkpoints, (4) Separate person from performance ('You're great AND this deliverable is late'), (5) Treat accountability as support, not punishment.",
          "**The accountability statement:** After commitment, add: 'We'll check progress on [date]. If we're off track, we'll address it immediately. Accountability is how we support each other in delivering what we committed to.' This reframes accountability as care, not criticism.",
          "Research from high-reliability organizations (aviation, healthcare) shows that cultures of accountability have HIGHER psychological safety, not lower. Why? Because people know where they stand and that issues will be addressed quickly, not left to fester.",
          "**The next belt:** Brown Belt teaches HOW to hold each other accountable without damaging relationships. But it requires the foundation of clear commitments you're building now.",
          "The complete loop: Trust → Conflict → Commitment → Accountability → Results. You're now ready for the Accountability phase."
        ],
        keyInsight: "Commitment must be followed by accountability—one enables the other, neither works alone.",
        practiceExercise: "For your team's current commitments, add accountability checkpoints. Agree as a team: When will we review progress? How will we address gaps? Frame accountability as support.",
        researchCitation: "High-reliability organization research; accountability and psychological safety studies (Edmondson)"
      }
    ],
    quiz: [
      {
        id: "p4-q1",
        question: "According to Bezos' decision-making principle, what percentage of information is enough to make most decisions?",
        options: [
          { label: "A", text: "50%" },
          { label: "B", text: "70%" },
          { label: "C", text: "90%" },
          { label: "D", text: "100%" }
        ],
        correct: "B",
        explanation: "Bezos' 70% rule: Most decisions can be made with 70% of the information you wish you had. Waiting for 90% or 100% means moving too slowly. Commit at 70%, adjust with speed."
      },
      {
        id: "p4-q2",
        question: "Which is a VALID reason to revisit a committed decision?",
        options: [
          { label: "A", text: "Execution is harder than expected" },
          { label: "B", text: "A core assumption was proven false" },
          { label: "C", text: "Someone on the team disagrees (but didn't speak up before)" },
          { label: "D", text: "Early results are mixed after 2 weeks" }
        ],
        correct: "B",
        explanation: "Core assumptions proven false is a valid reason to revisit. Hard execution, late disagreement, and mixed early results are not—most commitments face these. Revisit when fundamentals change, not when it gets tough."
      },
      {
        id: "p4-q3",
        question: "Research shows what percentage of strategic intent is lost between C-suite and front-line?",
        options: [
          { label: "A", text: "20%" },
          { label: "B", text: "40%" },
          { label: "C", text: "60%" },
          { label: "D", text: "80%" }
        ],
        correct: "C",
        explanation: "60% of strategic intent degrades between top leadership and front-line due to the 'broken telephone effect.' Combat this with consistent messaging, translation at each level, and feedback loops."
      },
      {
        id: "p4-q4",
        question: "Why do high-reliability organizations (aviation, healthcare) have HIGHER psychological safety despite strong accountability cultures?",
        options: [
          { label: "A", text: "They don't actually have high accountability" },
          { label: "B", text: "People know where they stand and issues are addressed quickly, not left to fester" },
          { label: "C", text: "They punish mistakes harshly, which creates fear-based safety" },
          { label: "D", text: "They avoid giving feedback to maintain harmony" }
        ],
        correct: "B",
        explanation: "Accountability INCREASES psychological safety when done right because people know where they stand, issues are addressed immediately (not left to fester), and accountability is framed as support, not punishment."
      }
    ]
  }
];


