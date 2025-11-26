/**
 * BLACK BELT - STRIPE 18: STRATEGIC LEADERSHIP
 * Theme: Vision, long-term thinking, moral compass, leading through uncertainty
 * Focus: Vision without fluff, moral compass canvas, long-term thinking, uncertainty navigation
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

export const stripe18Lessons: Lesson[] = [
  {
    id: 1,
    title: "Vision Without Fluff",
    content: [
      "'Our vision is to leverage synergies and paradigm shifts to deliver best-in-class solutions that empower stakeholders.' This is not a vision. This is corporate word salad. It sounds impressive but means nothing. No one knows what to do with it. Vision without specificity is decoration. Real vision is concrete: Here's where we are. Here's where we're going. Here's why it matters. Here's how you'll know when we've arrived. Black Belt leaders create vision that drives action, not vision that sounds good in presentations.",
      
      "Research from Jim Collins and Jerry Porras (Built to Last) studying visionary companies found that effective vision has three components: (1) Core Purpose—why the organization exists beyond making money. (2) Core Values—what principles guide decisions when no one's watching. (3) BHAG (Big Hairy Audacious Goal)—specific, measurable, time-bound target that's challenging but achievable. These three create clarity. Purpose answers 'why this work matters.' Values answer 'how we do the work.' BHAG answers 'what we're trying to achieve.' Together they create direction that guides 1,000 daily decisions without leadership micromanagement.",
      
      "The vision clarity test: Can a new employee, after hearing your vision, make a decision about whether to pursue opportunity A or B without asking leadership? If yes, your vision is clear. If they still need to escalate every decision, your vision is fluff. Good vision acts as decision filter: 'We're pursuing customer retention over new customer acquisition—so which project aligns with that?' Clear answer. Bad vision: 'We're leveraging synergies'—gives zero decision guidance. Vision should reduce coordination overhead by giving everyone a compass for autonomous decisions.",
      
      "At Just Eat Takeaway, we had classic corporate vision: 'Be the world's leading online food delivery platform delivering exceptional customer experiences.' Impressive. Meaningless. I couldn't tell you whether we should invest in 10-minute delivery (customer experience?) or partner selection (leading platform?). We simplified: Purpose = Connect people with food they love. Value = Customer obsession (their experience > our convenience). BHAG = 50% of our customers order weekly by 2025 (measurable retention). Now decisions were clear: 10-minute delivery—does it increase weekly ordering? Yes? Do it. Partner selection—does it get customers food they love? Yes? Do it. The vision became a filter, not a slogan.",
      
      "The BHAG discipline: Big Hairy Audacious Goals must be: (1) Specific (not 'be the best' but 'achieve X by Y date'), (2) Measurable (you know definitively if you hit it), (3) Time-bound (usually 5-10 years out—long enough to require transformation, short enough to stay accountable), (4) Challenging (50-70% probability of success—if certain, not audacious enough; if near-impossible, not credible). Examples: Amazon 1990s—'Every book in print available online in 60 seconds.' SpaceX—'Make humanity multiplanetary.' Airbnb—'100M nights booked per year.' These pass the test: Specific? Yes. Measurable? Yes. Time-bound? Yes. Challenging? Yes. Your BHAG should inspire and clarify simultaneously.",
      
      "The values discipline: Core values must be: (1) Behaviors you actually demonstrate (not aspirations), (2) Principles you'd keep even if they create short-term cost (Patagonia: environmental sustainability even when expensive), (3) Few enough to remember (3-5 max), (4) Specific enough to guide decisions (not 'integrity' but 'we admit mistakes publicly and own solutions'). Bad values: Every company claims integrity, customer focus, innovation, teamwork (meaningless because universal). Good values: Specific to your culture and decision-making. Example: Amazon's 'Customer obsession' paired with 'frugality'—creates specific tension (spend on customer experience, not on perks). That tension guides decisions.",
      
      "The mistake most leaders make: They create vision in an offsite, put it on wall posters, and never reference it again. Vision isn't wallpaper. It's the operating system. Every strategy discussion should reference it ('Does this align with our purpose?'). Every decision should filter through it ('Does this reflect our values?'). Every quarterly review should assess it ('Are we progressing toward our BHAG?'). If leadership doesn't use the vision constantly, team won't either. The discipline: Reference vision weekly minimum in team communications. Make it the frame for all strategic discussions. Use it until people are sick of hearing it. Then use it more.",
      
      "In Brazilian Jiu Jitsu, the vision is clear: Control position, isolate limb, submit opponent. That's it. Not 'leverage synergies to optimize grappling paradigms.' Just: position → isolation → submission. Every technique, every drill, every roll serves that vision. A white belt can watch a black belt roll and see the vision in action. A new business team member should be able to watch leadership meetings and see the vision in action just as clearly. If they can't, your vision is fluff.",
      
      "Next lesson: The Moral Compass Canvas—a practical framework for defining and operationalizing the values that guide your team's decisions when you're not in the room. But first, test your current vision. Does it have: Purpose (why this matters)? Values (how we work)? BHAG (specific measurable goal)? Can new employees use it to make decisions without asking? If no to any, revise. Create vision that drives action, not vision that sounds good. That's Black Belt strategic leadership: clarity over cleverness, specificity over sophistication."
    ],
    learningObjective: "You will learn Collins & Porras' three-component vision framework (Purpose, Values, BHAG) that creates decision filters, reducing coordination overhead through specific, measurable, time-bound direction.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "The Moral Compass Canvas",
    content: [
      "Your team faces a decision: Fast launch with known bugs, or delay two weeks for quality? No one can reach you. What do they decide? That decision reveals your actual values—not the ones on your wall poster, but the ones embedded in your culture. The Moral Compass Canvas is a tool for making values operational: defining specific decision principles that guide your team when authority isn't present. This is strategic leadership: creating systems that embody your values so culture runs independently of you.",
      
      "Research from Dov Seidman (How We Do Anything Means Everything) found that companies with operationalized values (specific behavioral principles that guide decisions) outperform companies with stated-but-not-practiced values by 40% on revenue growth and 30% on profit margins. Why? Because operationalized values reduce decision friction. People don't need to escalate every trade-off if they know 'quality over speed' or 'customer safety over convenience.' Values become decision shortcuts. Stated-but-not-practiced values become cynicism ('leadership says one thing, rewards another').",
      
      "The Moral Compass Canvas framework: For each core value, define: (1) What it means (concrete description), (2) What it looks like in practice (specific behaviors), (3) What it doesn't mean (common misinterpretations), (4) Decision principle (when this conflicts with X, we choose Y). Example—Value: Customer Obsession. Means: We prioritize customer long-term success over our short-term convenience. Looks like: Taking the complex support ticket yourself rather than deflecting. Doesn't mean: Saying yes to every customer request regardless of feasibility. Decision principle: When customer request conflicts with product sustainability, we explain why we can't and offer alternatives—never ghost or blame. This specificity guides decisions.",
      
      "At Just Eat Takeaway, we had value 'Move Fast.' But what did that mean? Some teams interpreted it as 'skip testing, ship broken things, fix later.' Others interpreted it as 'cut corners on customer communication.' That's not what we meant. We rebuilt with Moral Compass Canvas: Move Fast means: We optimize for learning speed (test ideas quickly) not delivery speed (ship whatever). Looks like: Running small experiments with fast feedback loops rather than big launches without user input. Doesn't mean: Shipping low quality or creating customer pain for our convenience. Decision principle: When speed conflicts with customer trust, customer trust wins—we slow down. Suddenly 'move fast' meant something consistent across teams. Values became actionable.",
      
      "The tension principle: Most interesting decisions involve values conflict. Quality vs. Speed. Customer vs. Company. Short-term vs. Long-term. Your Moral Compass Canvas must address these tensions explicitly. Don't pretend every value is always priority #1 (impossible). Instead: 'When Quality conflicts with Speed, Quality wins for customer-facing features, Speed wins for internal tools.' This specificity prevents values from being vague aspirations. It makes them decision principles that handle real trade-offs your team faces daily.",
      
      "The validation test: After creating your Moral Compass Canvas, give your team real scenarios and ask what they'd decide. Scenario: Customer demands feature that would take 6 months and delay other priorities. According to our values, what do we do? If team can answer confidently using the canvas ('Customer obsession means their long-term success, not every request—we'd explain trade-offs and offer alternatives'), your canvas works. If they're uncertain or give different answers, your canvas needs more specificity. Values should create convergent decision-making, not divergent.",
      
      "The reinforcement mechanism: Values become real through what you reward and punish. If you say 'integrity' but promote the person who hit numbers through shady tactics, your actual value is 'hit numbers.' If you say 'work-life balance' but only praise people working weekends, your actual value is 'always on.' The discipline: Recognize people publicly for demonstrating values, especially when costly. 'Sarah delayed our launch to fix customer data security issue. She embodies our value that customer trust > our timelines. That's leadership.' Do this weekly. Values reinforced through recognition become culture.",
      
      "In Brazilian Jiu Jitsu, the value is 'Tap early, tap often' (admit when you're caught, don't injure yourself by resisting). This value prevents injuries but conflicts with ego ('I don't want to lose'). Good gyms operationalize this: Coaches celebrate people who tap quickly ('That's smart—you preserved your arm and can keep training'). They shame people who resist to injury ('Your ego just cost you 3 months off the mat'). The value becomes operational through consistent reinforcement. Business values need the same: consistent recognition of values-aligned behavior, consistent consequences for values-violating behavior.",
      
      "Next lesson: Long-Term Thinking in Short-Term Markets—how to maintain strategic focus on long-term outcomes despite quarterly pressure, market volatility, and stakeholder short-termism. But first, build your Moral Compass Canvas. For each core value: What does it mean? What does it look like? What doesn't it mean? What's the decision principle when it conflicts with X? Test it with real scenarios. Ensure team can use it to make consistent decisions. Then reinforce through recognition—catch people demonstrating values and celebrate publicly. That's how values become culture: through operational specificity and consistent reinforcement."
    ],
    learningObjective: "You will learn the Moral Compass Canvas framework (meaning, behaviors, non-examples, decision principles) that operationalizes values, improving revenue 40% and profit 30% through reduced decision friction.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Long-Term Thinking in Short-Term Markets",
    content: [
      "Your board wants quarterly growth. Your investors want monthly metrics. Your market moves daily. How do you maintain focus on long-term strategy (3-5 years) when everyone demands short-term results (this quarter)? This is the strategic leadership paradox: You must deliver short-term while building long-term. Most leaders optimize for one (usually short-term—it's louder, more urgent). Black Belt leaders master both simultaneously. This lesson teaches you how.",
      
      "Research from McKinsey studying 615 companies over 15 years found that companies with 'long-term orientation' (investing in multi-year initiatives despite short-term cost) outperformed short-term oriented companies by 47% on revenue growth and 36% on earnings. But here's the insight: Long-term winners ALSO delivered competitive short-term results. They didn't sacrifice short-term for long-term. They managed both through portfolio thinking: Some investments deliver this quarter, some deliver in 3 years, both matter.",
      
      "The portfolio approach: Divide your resources across three horizons: Horizon 1 (optimize current business—delivers results this quarter/year), Horizon 2 (build adjacent opportunities—delivers results in 1-3 years), Horizon 3 (experiment with future possibilities—delivers results in 3-5+ years). McKinsey research suggests optimal allocation: 70% H1, 20% H2, 10% H3. This balance lets you hit quarterly targets (H1) while building future growth (H2/H3). Pure H1 focus creates short-term wins and long-term decline. Pure H3 focus creates vision without revenue. Portfolio creates sustainable performance.",
      
      "At Just Eat Takeaway, we faced exactly this pressure. Investors wanted order growth quarterly. But our strategy required investing in customer retention infrastructure (CRM, loyalty program, personalization)—these would take 18 months to show results. We implemented portfolio thinking: H1 (70% of resources): Optimize current operations—delivery speed, restaurant selection, app performance. These delivered immediate order growth. H2 (20%): Build retention infrastructure. Wouldn't show results for 18 months but essential for sustainable growth. H3 (10%): Experiment with ghost kitchens, subscription models, adjacent services. Long-term bets. This portfolio let us hit quarterly targets while building long-term capability. Without H2/H3, we'd optimize current business into obsolescence.",
      
      "The communication strategy: When stakeholders pressure short-term, don't defend long-term thinking emotionally ('You don't understand strategy!'). Show the portfolio: 'Here's how we're delivering this quarter (H1 initiatives). Here's how we're building next year's growth (H2). Here's how we're preparing for future market shifts (H3). All three are running. We're balancing short and long-term.' This transparency builds trust. Stakeholders stop worrying you're sacrificing short-term if they see clear H1 delivery. They stop worrying you're ignoring long-term if they see clear H2/H3 investment. The portfolio makes both/and visible.",
      
      "The mistake most leaders make: They treat long-term strategy as separate from operations. 'We'll do an annual offsite for strategy, then get back to executing.' Wrong. Strategy and execution are integrated. Your quarterly execution should include H1 (deliver now), H2 (build capability), H3 (explore future). Every quarter, you're executing across all three horizons. Strategy isn't once-a-year thinking—it's continuous allocation across time horizons. The discipline: In every quarterly planning, explicitly allocate resources across H1/H2/H3. Make the portfolio visible. Protect H2/H3 from being raided for H1 urgency.",
      
      "The Amazon playbook: Jeff Bezos managed this masterfully through his shareholder letters. Every year: 'We're investing billions in AWS (H2/H3) while optimizing retail margins (H1). Short-term profits will be lower. Long-term, AWS will be bigger than retail.' He communicated the portfolio constantly, defended long-term investment explicitly, and delivered H1 results that bought trust for H2/H3. Result: Amazon built multiple multi-billion dollar businesses (AWS, Prime, Marketplace) while maintaining retail dominance. Both/and, not either/or. The strategic leadership skill: Make long-term investment visible and credible so stakeholders trust you're not sacrificing short-term.",
      
      "In Brazilian Jiu Jitsu, you balance short-term tactics (winning this position) with long-term strategy (setting up future positions). Pure short-term: You scramble to escape bad position but exhaust yourself (win battle, lose war). Pure long-term: You let opponent dominate while 'playing the long game' (you get submitted). Balance: You defend immediate threats efficiently (short-term) while working toward better position (long-term). Both simultaneously. Business is the same: Deliver quarterly results efficiently while building long-term capability. Both matter. Neither is optional.",
      
      "Next lesson: Leading Through Uncertainty—how to make strategic decisions and maintain team confidence when the future is unclear, information is incomplete, and traditional planning breaks down. But first, build your portfolio. List all your current initiatives. Categorize: H1 (delivers this quarter/year), H2 (delivers 1-3 years), H3 (delivers 3-5+ years). Calculate allocation. Is it 95% H1, 5% H2, 0% H3? That's short-term optimization. Reallocate: Protect 20% for H2, 10% for H3. Communicate the portfolio to stakeholders: 'Here's how we're delivering now AND building future.' That's strategic leadership: both/and thinking in an either/or world."
    ],
    learningObjective: "You will learn McKinsey's three-horizon portfolio framework (70% current, 20% adjacent, 10% future) that enables long-term oriented companies to outperform by 47% revenue while delivering competitive short-term results.",
    duration: "9-11 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Leading Through Uncertainty",
    content: [
      "March 2020: COVID hits. Every business assumption breaks. Customer behavior shifts overnight. Supply chains collapse. Teams go remote instantly. No playbook exists. Traditional planning is useless. This is radical uncertainty—when you must lead despite having no idea what happens next. Black Belt leaders don't freeze or fake confidence. They adapt their leadership approach for uncertainty. This lesson teaches you how to lead when you don't know what's coming.",
      
      "Research from Jennifer Garvey Berger studying leadership through disruption found that leaders who navigate uncertainty effectively demonstrate three capabilities: (1) Sense-making (interpreting ambiguous signals to create coherent narrative), (2) Rapid experimentation (testing multiple small bets rather than one big plan), (3) Transparent communication (naming uncertainty explicitly rather than projecting false confidence). These three replace traditional planning (which requires predictability) with adaptive strategy (which assumes unpredictability). Most leaders fail in uncertainty because they keep using tools designed for stability.",
      
      "Sense-making: In uncertainty, your job isn't to have all answers—it's to help the team make sense of contradictory information. You do this through: (1) Pattern recognition ('Here's what I'm seeing across multiple signals...'), (2) Scenario planning ('Here are 3 possible futures and how we'd respond to each...'), (3) Clear framing ('The challenge we're facing is X, which means we need to prioritize Y'). You're not predicting the future—you're creating shared understanding of the present and frameworks for responding to multiple futures. This reduces anxiety (people understand what's happening) and enables action (people know what to optimize for).",
      
      "At Just Eat Takeaway during COVID: Restaurants closing, demand spiking chaotically, delivery partners scared. I didn't know what would happen. But I could sense-make: 'Here's what we're seeing: (1) Demand is 3x normal in some areas, 50% in others. (2) Restaurant partners need financial support. (3) Delivery partners need safety equipment. Here are three scenarios: Best case—normalizes in 3 months. Base case—6-12 months of volatility. Worst case—18+ months with permanent behavior shift. For each scenario, here's our response plan.' This didn't predict the future, but it created framework for adaptive response. Team knew: We're watching these signals, adjusting based on what materializes. Anxiety decreased. Execution improved.",
      
      "Rapid experimentation: In uncertainty, big plans fail because assumptions break. Replace annual planning with quarterly experiments. Structure: (1) Hypothesis ('We believe customer behavior X is happening'), (2) Test ('We'll try Y for 4 weeks and measure Z'), (3) Decision rule ('If we see A, we'll scale it. If we see B, we'll pivot. If we see C, we'll kill it'), (4) Review ('What did we learn?'). This creates learning momentum. You're not betting everything on one strategy—you're running parallel tests and scaling what works. Amazon, Google, Netflix all operate this way: hundreds of experiments, most fail, winners scale. In uncertainty, experimentation beats planning.",
      
      "Transparent communication: The instinct in uncertainty is to project confidence ('Everything's fine, I have it under control'). This backfires because: (1) People sense you're faking (destroys trust), (2) When reality doesn't match your projection, you lose credibility. Better: Name the uncertainty explicitly. 'I don't know what happens next. Here's what we know, what we don't know, and how we'll figure it out together.' Research from Brené Brown (Dare to Lead): Leaders who admit uncertainty while providing direction ('I don't have all answers, here's what we're doing') build MORE trust than leaders who project false confidence. Honesty about uncertainty + clarity about response = confidence.",
      
      "The leadership stance in uncertainty: Not 'I have the answer' (arrogant in uncertainty) or 'I have no idea' (abdicates). Instead: 'I'm watching these signals, running these experiments, and we'll adjust based on what we learn. I'll communicate what changes and why. We'll figure this out together.' This stance is confident (I'm actively leading us through this) and humble (I don't pretend to know what I can't). It invites team participation (we'll figure this out together) while maintaining direction (here's what we're doing now). This paradox—confident humility—is the sweet spot for leading through uncertainty.",
      
      "In Brazilian Jiu Jitsu, every roll is uncertainty. You don't know what your opponent will do. You can't plan 10 moves ahead because they won't comply with your plan. So you: (1) Sense position ('I'm in X, they're threatening Y'), (2) Experiment ('I'll try this escape, see how they respond'), (3) Adapt ('That didn't work, trying this instead'). This sense-experiment-adapt loop is how you navigate uncertainty. Planning doesn't work when your opponent has agency. Adaptation does. Business environments are increasingly like rolling: too much complexity and change for static plans. Adaptive leadership wins.",
      
      "Black Belt Integration: You've completed Strategic Leadership stripe. You learned: (1) Vision Without Fluff (Purpose, Values, BHAG creating decision filters), (2) Moral Compass Canvas (operationalizing values through meaning, behaviors, decision principles), (3) Long-Term Thinking (three-horizon portfolio managing 70% current, 20% adjacent, 10% future), (4) Leading Through Uncertainty (sense-making, rapid experimentation, transparent communication). You now have strategic leadership capability: clarity of direction, operationalized values, balanced time horizons, adaptive response to uncertainty. This is how Black Belts think: strategically, long-term, with both confidence and humility.",
      
      "Next stripe: Organizational Transformation—we'll tackle how to change culture, scale systems, build leadership pipeline, and create sustainable transformation across the entire organization. But first, assess your current environment. Is uncertainty high (market volatility, rapid change)? If yes, shift from planning to experimentation. Pick 3 hypotheses about customer/market. Design 4-week tests. Define decision rules. Run experiments. Review learning. Communicate what you're learning transparently. This adaptive approach works when traditional planning can't. That's Black Belt leadership: using the right tool for the environment, not forcing stability tools onto uncertain environments."
    ],
    learningObjective: "You will learn three uncertainty leadership capabilities (sense-making, rapid experimentation, transparent communication) that replace traditional planning with adaptive strategy when the future is unpredictable.",
    duration: "9-11 minutes",
    xpReward: 10
  }
];

export const stripe18Checkpoints: Checkpoint[] = [
  {
    id: 1,
    lessonId: 1,
    question: "Your current vision: 'Leverage synergies to deliver best-in-class solutions that empower stakeholders.' A new team member asks: 'Should we prioritize Project A (fast launch, lower quality) or Project B (slower, higher quality)?' They can't decide using the vision. According to 'vision without fluff' principles, what's the problem?",
    options: [
      "The team member needs more training",
      "Your vision is corporate word salad that provides zero decision guidance. Fix: Create Collins & Porras framework: Purpose (why we exist), Values (e.g., 'Quality over speed'), BHAG (specific measurable goal). Vision should filter decisions autonomously.",
      "They should ask their manager",
      "The vision is fine—some decisions require leadership input"
    ],
    correctAnswer: 1,
    explanation: "Option B diagnoses vision fluff and applies Built to Last framework. Vision clarity test: Can new employee make decision without escalating? If no, vision is fluff. The Just Eat Takeaway example: 'Be world's leading platform' → couldn't decide between 10-min delivery vs. partner selection. Simplified to: Purpose (Connect people with food they love), Value (Customer obsession), BHAG (50% order weekly by 2025)—now decisions clear (does it increase weekly ordering? yes? do it). Option A blames person not system. Option C creates dependency. Option D accepts vague vision. Collins & Porras: Purpose (why beyond money), Values (decision principles), BHAG (specific, measurable, time-bound, challenging). Vision should reduce coordination overhead by giving everyone compass for autonomous decisions. If leadership micromanages every decision, vision isn't working.",
    xpReward: 10
  },
  {
    id: 2,
    lessonId: 2,
    question: "Your value is 'Move Fast.' Some teams interpret this as 'skip testing, ship broken things.' Others as 'cut corners on customer communication.' According to Moral Compass Canvas principles, what's the fix?",
    options: [
      "The value is fine—people just need to use common sense",
      "Remove the value—it's causing confusion",
      "Operationalize with Moral Compass Canvas: Means (optimize learning speed not delivery speed), Looks like (small experiments with fast feedback), Doesn't mean (ship low quality/create customer pain), Decision principle (speed vs. trust conflict, trust wins).",
      "Add more values to balance it"
    ],
    correctAnswer: 2,
    explanation: "Option C applies Moral Compass Canvas to operationalize vague value. Dov Seidman research: companies with operationalized values (specific behavioral principles) outperform stated-but-not-practiced by 40% revenue, 30% profit because values reduce decision friction. The Just Eat Takeaway example: 'Move Fast' caused inconsistent interpretation—rebuilt with canvas: means learning speed, looks like experiments, doesn't mean low quality, principle: customer trust > speed. Values became actionable, consistent across teams. Option A expects convergence without framework (won't happen). Option B removes value instead of fixing it. Option D adds complexity. The framework: For each value, define meaning, behaviors, non-examples, decision principle (when X conflicts with Y, we choose Z). Test with real scenarios. Reinforce through recognition (celebrate people demonstrating values even when costly). Values become culture through operational specificity + consistent reinforcement.",
    xpReward: 10
  },
  {
    id: 3,
    lessonId: 3,
    question: "Your board wants quarterly growth. Your strategy requires 18-month infrastructure investment that will reduce short-term profits. According to long-term thinking principles, how do you handle this?",
    options: [
      "Choose: Either hit quarterly targets OR invest long-term (can't do both)",
      "Delay long-term investment until quarterly pressure eases",
      "Use three-horizon portfolio: 70% H1 (optimize current business for quarterly results), 20% H2 (build infrastructure for 1-3 year growth), 10% H3 (experiment for future). Deliver short-term AND build long-term. Communicate portfolio to board.",
      "Ignore the board—they don't understand strategy"
    ],
    correctAnswer: 2,
    explanation: "Option C applies McKinsey's three-horizon portfolio for both/and thinking. Research: long-term oriented companies outperform by 47% revenue, 36% earnings—but they ALSO deliver competitive short-term results. Not either/or, both/and. The Just Eat Takeaway example: investors wanted quarterly order growth, strategy required 18-month retention infrastructure—implemented portfolio: H1 70% (optimize operations for immediate growth), H2 20% (build retention infrastructure), H3 10% (experiment ghost kitchens/subscriptions). Hit quarterly targets while building long-term capability. Option A is false choice. Option B sacrifices long-term. Option D destroys relationships. Amazon playbook: Bezos communicated portfolio constantly ('investing in AWS/Prime while optimizing retail'), defended long-term explicitly, delivered H1 results that bought trust for H2/H3. The discipline: every quarterly planning, explicitly allocate across H1/H2/H3, make portfolio visible, protect H2/H3 from H1 urgency.",
    xpReward: 10
  },
  {
    id: 4,
    lessonId: 4,
    question: "Major market disruption hits (like COVID). All your assumptions break. Customer behavior shifts unpredictably. Your annual plan is useless. According to leading through uncertainty principles, what's your approach?",
    options: [
      "Project confidence: 'Everything's under control, stick to the plan'",
      "Admit you have no idea and let team figure it out",
      "Sense-making ('Here's what we're seeing, 3 scenarios, response plans'), Rapid experimentation (test multiple small bets, scale what works), Transparent communication ('Don't know what's next, here's what we're doing'). Replace planning with adaptive strategy.",
      "Wait until things stabilize before making decisions"
    ],
    correctAnswer: 2,
    explanation: "Option C applies Jennifer Garvey Berger's uncertainty leadership framework. Leaders who navigate disruption effectively: (1) Sense-making (interpret ambiguous signals, create coherent narrative), (2) Rapid experimentation (test multiple small bets vs. one big plan), (3) Transparent communication (name uncertainty explicitly vs. false confidence). The Just Eat Takeaway COVID example: didn't know future, but sense-made: 'here's what we're seeing, three scenarios (3-month/6-12-month/18+month), response plan for each'—created framework for adaptive response, reduced anxiety, improved execution. Option A projects false confidence (destroys trust when reality doesn't match). Option B abdicates. Option D freezes. Brené Brown research: leaders who admit uncertainty while providing direction build MORE trust than false confidence. The stance: 'I'm watching signals, running experiments, we'll adjust based on learning. I'll communicate what changes. We'll figure this out together.' Confident humility. BJJ analogy: can't plan 10 moves ahead (opponent has agency), so sense-experiment-adapt loop. Adaptive leadership wins in uncertainty.",
    xpReward: 10
  }
];

export const stripe18Content = {
  lessons: stripe18Lessons,
  checkpoints: stripe18Checkpoints
};

