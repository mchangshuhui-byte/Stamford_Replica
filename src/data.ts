import { CardItem } from './types';

export const INITIAL_CARDS: CardItem[] = [
  {
    id: 'design-for-democracy',
    title: 'Design for Democracy: Investigating Election Administration',
    category: 'Project',
    tag: 'Project',
    description: 'Investigating and designing solutions to make election voting administration more transparent, equitable, and efficient.',
    longDescription: 'How might we design a more robust and accessible voting process? In this project-based initiative, teams of students collaborate with election officials, poll workers, and civic organizations. We apply fieldwork methods to unpack the bottlenecks in registration, wait times, and ballot navigation, prototyping solutions that are currently in testing across multiple municipalities.',
    bgColorClass: 'bg-brand-yellow',
    textColorClass: 'text-brand-black',
    tagBgClass: 'bg-brand-black',
    tagTextClass: 'text-white',
    duration: '10 weeks',
    groupSize: '4-5 students',
    materials: ['Field observation logs', 'Flowcharts', 'Cardboard voting booth prototypes', 'Affinity diagrams'],
    steps: [
      { name: '1. Field Observation', instruction: 'Spend a morning at a local registrar office. Map the physical layout and note any moments of friction or confusion for visitors.', time: '2 hours' },
      { name: '2. User Persona Mapping', instruction: 'Synthesize observations into three distinct voter profiles: first-timer, senior voter, and non-native English speaker.', time: '1 hour' },
      { name: '3. Redesign Ingress', instruction: 'Create a low-fidelity model of the queueing area. Use signage and color-coded pathways to simplify navigation.', time: '1.5 hours' }
    ],
    whyItWorks: '"Civic trust is not abstract; it is built through the tiny touchpoints of our public services." — d.school Democracy Lab'
  },
  {
    id: 'design-thinking-bootcamp',
    title: 'Design Thinking Bootcamp',
    category: 'Workshop',
    tag: 'Workshop',
    description: 'The flagship d.school workshop. An intense, immersive experience learning and applying the design thinking methodology to real-world messy challenges.',
    longDescription: 'd.school\'s premier learning experience. Over four intense days, you will go from framing ambiguity to prototyping active solutions in the real world. In this fast-paced workshop, professional and academic teams work shoulder-to-shoulder with expert facilitators, tackling complex partner briefs and internalizing the mindset of a bias toward action.',
    bgColorClass: 'bg-[#9bedf2]',
    textColorClass: 'text-brand-black',
    tagBgClass: 'bg-brand-primary',
    tagTextClass: 'text-white',
    spanClass: 'md:col-span-2',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLukUWnX0vRAbm2Y06KR83gt9WE_fxYbuqkq0LsJ0jq5l6VsPVBZm7TPubSlMd35f1-gJ_oYiBGCjPn7s5VyQw9HzQgEFEZ_31wD06CvXPAPk9UCV_iWA2BcbBhBGrausmtYBCbKMIQmEH6mRYyeZ-P2PzvkILD03aXtSis6W4acOx-9HaSjCbW6dbbBPNZMqlXFHdF_q6JHy2Wnwj42QSZu3aO6RkHYkhdTzMpDyRvq8t38lvJn5QEmv2s',
    duration: '4 Days',
    groupSize: 'Teams of 6',
    materials: ['Sharpies', 'Post-it notes', 'Hot glue guns', 'Pipe cleaners', 'Foam board', 'Interview recording guides'],
    steps: [
      { name: 'Day 1: Empathy & Framing', instruction: 'Head out into the city to interview community partners. Practice active listening and unearth emotional contradictions.', time: 'Full Day' },
      { name: 'Day 2: Synthesis & Ideation', instruction: 'Unpack interviews on the d.school windows. Define "How Might We" statements and brainstorm 100 wild ideas.', time: 'Full Day' },
      { name: 'Day 3: Prototype & Iterate', instruction: 'Build cardboard, tape, and play-doh approximations. Get feedback from real users and fail forward fast.', time: 'Full Day' },
      { name: 'Day 4: Implement & Pitch', instruction: 'Present functional service maps or physical prototypes to stakeholders. Establish an action plan.', time: 'Full Day' }
    ],
    whyItWorks: '"You don\'t think your way to a new way of acting, you act your way to a new way of thinking." — d.school Motto'
  },
  {
    id: 'ethnography-expedition',
    title: 'Ethnography Expedition',
    category: 'Tool',
    tag: 'Professionals',
    description: 'Outline the specific steps for your project: field research, unpack learnings, develop insights...',
    longDescription: 'A systematic framework designed for professional design researchers. The Ethnography Expedition tool guides you through planning field observations, conducting respectful deep-dive interviews, and extracting deep, actionable human needs that go beyond what people say they want.',
    bgColorClass: 'bg-brand-secondary',
    textColorClass: 'text-white',
    tagBgClass: 'bg-white/10',
    tagTextClass: 'text-white border border-white/20',
    duration: '3 hours',
    groupSize: 'Pairs',
    materials: ['Notebook', 'Camera or smartphone', 'Interview prompt cards'],
    steps: [
      { name: 'Step 1: Frame the Inquiry', instruction: 'Write down 3 core assumptions you have about your topic. Flip them into open-ended questions.', time: '30 mins' },
      { name: 'Step 2: Observe and Shadow', instruction: 'Watch people interacting with the space. Look for workarounds, hacks, or moments of visible hesitation.', time: '1 hour' },
      { name: 'Step 3: Ask "Why" Five Times', instruction: 'Engage a willing participant in conversation. Start high-level, and ask "Why?" to drill down into core emotional drivers.', time: '45 mins' },
      { name: 'Step 4: Unpack and Share', instruction: 'With your partner, list 5 surprising quotes and 3 non-verbal behaviors. Extract one major contradiction.', time: '45 mins' }
    ],
    whyItWorks: '"Observing what people do is the beginning of understanding why they do it, and what they truly need."'
  },
  {
    id: 'portrait-of-a-descendant',
    title: 'Portrait of a Descendant: Futures Thinking for K12',
    category: 'Tool',
    tag: 'Futures',
    description: 'Imagine a descendant many generations ahead and cultivate empathy for the future.',
    longDescription: 'An empathy exercise that stretches our horizon of responsibility. Ideal for K-12 classrooms and strategy teams, this tool prompts participants to design solutions with a multi-generational lens, thinking about descendants 100 years in the future to build long-term systems thinking.',
    bgColorClass: 'bg-sky-100',
    textColorClass: 'text-brand-black',
    tagBgClass: 'bg-brand-black',
    tagTextClass: 'text-white',
    duration: '60 mins',
    groupSize: '3-4 people',
    materials: ['Blank descendant templates', 'Colored markers', 'Imagination sheets'],
    steps: [
      { name: '1. Create the Descendant', instruction: 'Draw or collage a character who lives in your city in the year 2126. Give them a name, a daily chore, and a favorite hobby.', time: '20 mins' },
      { name: '2. Audit the Ecosystem', instruction: 'List three resources they depend on daily (e.g. clean air, community spaces, public memory). Where do those resources originate?', time: '15 mins' },
      { name: '3. Backcast Solutions', instruction: 'Identify a modern-day threat to one of those resources. Work backward from 2126 to today to design a systemic intervention.', time: '25 mins' }
    ],
    whyItWorks: '"Empathy is not just for the people standing in front of us, but for those who will inherit the decisions we make today."'
  },
  {
    id: 'design-for-belonging',
    title: 'Design for Belonging',
    category: 'Book',
    tag: 'Book',
    description: 'A practical guide to designing spaces, practices, and rituals that foster a deep sense of belonging.',
    longDescription: 'How do you design for something as elusive as belonging? Susie Wise, a leader at the Stanford d.school, shares an actionable framework showing how belonging can be intentionally built through concrete "design levers"—such as physical spaces, roles, peer rituals, and shared vocabulary. This book offers inspiration and clear structures to build inclusive environments.',
    bgColorClass: 'bg-brand-black',
    textColorClass: 'text-white',
    tagBgClass: 'bg-brand-equity',
    tagTextClass: 'text-white',
    price: 22.99,
    duration: 'Book • 224 Pages',
    groupSize: 'Educators & Leaders',
    materials: ['Book', 'Ritual template sheets', 'Empathy logs'],
    steps: [
      { name: 'Read & Reflect', instruction: 'Unpack the 9 design levers of belonging, identifying which ones are active (or missing) in your current organization.', time: 'Daily' },
      { name: 'Audit Your Environment', instruction: 'Perform a "Belonging Walk" through your office or school. Note where visitors are welcomed or made to feel like outsiders.', time: '1 hour' },
      { name: 'Prototype a Ritual', instruction: 'Create a micro-ritual for the first 5 minutes of your weekly meetings to establish high psychological safety.', time: '15 mins' }
    ],
    whyItWorks: '"Belonging doesn\'t just happen. It is designed, lever by lever, through intentional moments of connection." — Susie Wise'
  },
  {
    id: 'educator-guides',
    title: 'Educator Guides',
    category: 'Story',
    tag: 'Share Out',
    description: 'Activities from d.school books. Step-by-step guides for primary, secondary, and higher-education teachers to bring creative mindsets into the classroom.',
    longDescription: 'A treasure trove of pedagogical activities curated from d.school classroom experiments. These guides provide teachers with lesson plans, warm-ups, and experiential exercises to foster curiosity, intellectual playfulness, and collaborative prototyping in students of all age groups.',
    bgColorClass: 'bg-brand-yellow',
    textColorClass: 'text-brand-black',
    tagBgClass: 'bg-brand-black',
    tagTextClass: 'text-white',
    spanClass: 'md:row-span-2',
    duration: 'Ongoing Support',
    groupSize: 'K-12 & Higher Ed',
    materials: ['Lesson plan downloads', 'Recyclable building materials', 'Visual thinking cards'],
    steps: [
      { name: 'Step 1: Choose Your Mindset', instruction: 'Select a core mindset to build (e.g. Bias toward action, Empathy, or Embracing Ambiguity).', time: '10 mins' },
      { name: 'Step 2: Introduce the Warm-up', instruction: 'Conduct a 5-minute interactive warm-up to snap students out of analytical, fear-of-failure modes.', time: '5 mins' },
      { name: 'Step 3: Run the Challenge', instruction: 'Have students collaborate in small groups to build rapid cardboard prototypes of physical or service solutions.', time: '30 mins' }
    ],
    whyItWorks: '"When we change the physical and mental posture of learning, we unlock a completely different level of creative courage."'
  },
  {
    id: 'design-project-guide',
    title: 'Design Project Guide',
    category: 'Tool',
    tag: 'Social Impact',
    description: 'Discover new opportunities, better understand those for whom you are designing...',
    longDescription: 'This comprehensive manual helps teams navigate social impact design. From initial stakeholder alignment to ethical field immersion, this guide ensures your community-oriented project maintains human dignity and co-creation at the absolute center of every phase.',
    bgColorClass: 'bg-cyan-100',
    textColorClass: 'text-brand-secondary',
    tagBgClass: 'bg-brand-secondary',
    tagTextClass: 'text-white',
    duration: '1.5 hours',
    groupSize: 'Flexible',
    materials: ['Stakeholder map canvas', 'Value alignment matrix'],
    steps: [
      { name: '1. Map the Ecosystem', instruction: 'Draw all individuals, groups, and systems impacted by your project. Draw lines representing relationships, power dynamics, and flows of resources.', time: '30 mins' },
      { name: '2. Conduct a Reciprocity Check', instruction: 'Answer: "What does the community gain from this interaction? What do they lose? How are they active co-designers rather than passive research subjects?"', time: '30 mins' },
      { name: '3. Frame the Creative Brief', instruction: 'Co-write a project goal statement that includes at least one community-led metric of success.', time: '30 mins' }
    ],
    whyItWorks: '"If you design for people without designing with them, your solution will solve your own bias rather than their reality."'
  },
  {
    id: 'deck-of-design-values',
    title: 'Deck of Design Values: 32 Unexpected Ways to Explore Design',
    category: 'Deck',
    tag: 'Card Deck',
    description: 'A beautifully tactile card deck containing 32 unexpected prompts and perspectives to expand your team\'s design thinking capabilities.',
    longDescription: 'Shake up your design routines! This physical card deck contains 32 curated prompt cards designed by d.school educators. Each card challenges traditional corporate processes and forces you to think through lenses like Extreme Analogy, Sensory Inversion, and Radical Constraints.',
    bgColorClass: 'bg-brand-black',
    textColorClass: 'text-white',
    tagBgClass: 'bg-[#9bedf2]',
    tagTextClass: 'text-brand-black',
    price: 28.00,
    duration: '32-Card Tactile Deck',
    groupSize: 'Product & Design Teams',
    materials: ['Design Values Deck', 'Whiteboards or paper', 'Active imagination'],
    steps: [
      { name: '1. Pull a Card', instruction: 'During a roadblock in your brainstorm, draw a random card from the Deck of Design Values.', time: '2 mins' },
      { name: '2. Apply the Constraint', instruction: 'Spend 10 minutes reframing your current problem strictly through the constraint on the card (e.g. "Design it with zero budget and 100% cardboard").', time: '10 mins' },
      { name: '3. Sketch 3 Wild Prototypes', instruction: 'Capture the unexpected angles forced by this prompt into rough visual napkin drawings.', time: '15 mins' }
    ],
    whyItWorks: '"Great design comes from forcing your brain off its paved highways. These cards are the off-road vehicle." — d.school Media Lab'
  },
  {
    id: 'university-wide-electives',
    title: 'University-Wide Electives',
    category: 'Project',
    tag: 'Read More',
    description: 'Explore credit courses open to all students at Stanford, bridging diverse departments through collaborative problem-solving.',
    longDescription: 'The d.school believes design is for everyone. Our university-wide electives bring medical, law, business, and engineering students into the same physical room. Working in radical collaborative teams, students tackle massive issues like healthcare delivery, sustainable energy, and civil rights, applying design methods as a unifying language.',
    bgColorClass: 'bg-brand-equity',
    textColorClass: 'text-white',
    tagBgClass: 'bg-white/20',
    tagTextClass: 'text-white border border-white/25',
    duration: '10-week courses',
    groupSize: 'Interdisciplinary teams',
    materials: ['Mixed expertise', 'd.school studio space', 'Real-world briefs'],
    steps: [
      { name: 'Assemble the Squad', instruction: 'Form teams where no two members share the same academic discipline or major.', time: 'Week 1' },
      { name: 'Frame the Ambiguity', instruction: 'Receive a messy real-world brief from a corporate or civic sponsor. Map out what you do and do not know.', time: 'Weeks 2-3' },
      { name: 'Co-Design with Users', instruction: 'Bring user experts directly into the design studio to build low-fidelity mockups of potential experiences.', time: 'Weeks 5-8' }
    ],
    whyItWorks: '"The magic of the d.school is what happens when a lawyer, a computer scientist, and a visual artist look at the exact same problem together."'
  },
  {
    id: 'stoke-deck',
    title: 'Stoke Deck',
    category: 'Tool',
    tag: 'Educators',
    description: 'Boost energy, foster collaboration or ignite creativity. This deck provides high-energy icebreakers and physical prompts.',
    longDescription: 'Is your workshop feeling sluggish? The Stoke Deck contains 45 high-energy physical warm-ups, spatial challenges, and collaborative micro-games designed to elevate oxygen levels, reduce social anxiety, and build immediate team trust.',
    bgColorClass: 'bg-brand-cyan',
    textColorClass: 'text-brand-black',
    tagBgClass: 'bg-brand-black',
    tagTextClass: 'text-white',
    duration: '5-10 mins',
    groupSize: '5 to 100+ people',
    materials: ['Stoke Deck', 'An open physical space', 'Willingness to look silly'],
    steps: [
      { name: '1. Select a Card', instruction: 'Choose a card category based on your current workshop mood: Focus, Connect, or Energize.', time: '1 min' },
      { name: '2. Pitch the Game', instruction: 'Deliver the instructions in under 30 seconds. Do not explain the "why"—just dive straight into action.', time: '30 secs' },
      { name: '3. Execute with High Energy', instruction: 'As the leader, model absolute enthusiasm. Play along and embrace the chaos!', time: '5 mins' }
    ],
    whyItWorks: '"Physical movement changes cognitive posture. You cannot design active solutions while sitting frozen in a desk chair."'
  },
  {
    id: 'creative-acts',
    title: 'Creative Acts for Curious People',
    category: 'Book',
    tag: 'Book',
    description: 'Over 80 experiential activities designed by the d.school to spark creativity, empathy, and observation.',
    longDescription: 'A landmark book written by Sarah Stein Greenberg, Executive Director of the Stanford d.school. Filled with visual ideas, illustrations, and over 80 hands-on design challenges, this is a comprehensive field manual for anyone looking to build their creative muscle, unlock deep insights, and approach problem-solving with courage and curiosity.',
    bgColorClass: 'bg-brand-black/90',
    textColorClass: 'text-white',
    tagBgClass: 'bg-brand-primary',
    tagTextClass: 'text-white',
    price: 26.00,
    spanClass: 'md:col-span-2',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsgyz_PXsP7V1WQ5SEj5_ST8geXfEW-MvYkS1ypN8oEaps-en9LG10-HSB3Pwb0LoXdvAy0YKH6dhov_HLHr3t-FqKqSMU3wFitc8yD8fBequywLYoLaKeFmKm_mOX_yGGMa5X-GRX1SOwNdjcgJSs_SXMVFAH6PG8Ysj8xly2Kcs8KyGpAxaBDqu8aip3DYYq0eXeOEc86-UrRoZQHcwrOEpCV6yditWbTIuBSBau-ZRw2MiaMzv4Vv68',
    duration: 'Book • 288 Pages',
    groupSize: 'Creatives & Curious Minds',
    materials: ['Book', 'Your environment', 'Drawing pad'],
    steps: [
      { name: 'Activity: The Sound Walk', instruction: 'Walk around your neighborhood in total silence. Focus entirely on capturing and categorizing 15 distinct sounds.', time: '20 mins' },
      { name: 'Activity: 30 Circles Challenge', instruction: 'Draw 30 circles on a sheet of paper. Turn as many circles as you can into recognizable objects (e.g., watch, pizza, earth) in 3 minutes.', time: '3 mins' },
      { name: 'Activity: Radical Redesign', instruction: 'Pick an object you hate. Draw 5 ways to make it completely delightful, ignoring the laws of physics.', time: '15 mins' }
    ],
    whyItWorks: '"Creativity is not a talent; it is a discipline. The more you practice looking at the ordinary with extraordinary curiosity, the more creative you become." — Sarah Stein Greenberg'
  },
  {
    id: 'teaching-learning-studio',
    title: 'Teaching and Learning Studio',
    category: 'Workshop',
    tag: 'Workshop',
    description: 'A 5-day on-campus studio designed specifically for educators who want to teach design thinking.',
    longDescription: 'Are you an educator looking to transform your teaching? Join us on the Stanford campus for an immersive studio. You will experience d.school learning firsthand, dissect our pedagogical methods, and co-design active learning environments and course syllabi that spark creative confidence in students.',
    bgColorClass: 'bg-brand-primary',
    textColorClass: 'text-white',
    tagBgClass: 'bg-white',
    tagTextClass: 'text-brand-primary font-bold',
    duration: '5 Days • On Campus',
    groupSize: 'Educators from around the world',
    materials: ['Pedagogy playbooks', 'Curriculum templates', 'Stanford campus resources'],
    steps: [
      { name: 'Experience d.school Pedagogy', instruction: 'Participate as a learner in dynamic d.school experiences to feel the physical and cognitive rhythm of design education.', time: 'Days 1-2' },
      { name: 'Deconstruct the Methods', instruction: 'Pull back the curtain with d.school directors. Examine how we design lectures, debriefs, transitions, and physical spatial shifts.', time: 'Day 3' },
      { name: 'Co-Design Your Class', instruction: 'Draft and rapidly prototype a brand-new course module or interactive classroom ritual. Get active feedback from fellow educators.', time: 'Days 4-5' }
    ],
    whyItWorks: '"To teach creativity, we must be willing to learn in public, make mistakes, and design classrooms that feel like messy experiments." — d.school Pedagogy Lab'
  }
];
