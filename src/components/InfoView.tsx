import React, { useState } from 'react';
import { Compass, BookOpen, Users, Rocket, Sparkles, HelpCircle, RefreshCw, Trophy, Heart } from 'lucide-react';

const MINDSETS = [
  { id: 1, title: 'Show, Don\'t Tell', desc: 'Communicate your vision in an impactful and active way by creating experiences, using visuals, and building physical stories.' },
  { id: 2, title: 'Focus on Human Values', desc: 'Empathy for the people you are designing for and feedback from them are the absolute anchors of great, ethical innovation.' },
  { id: 3, title: 'Craft Clarity', desc: 'Produce a compelling and simple point-of-view from messy, complex, and highly ambiguous field insights.' },
  { id: 4, title: 'Embrace Ambiguity', desc: 'Develop the emotional safety and courage to hold multiple conflicting ideas and wander in raw, unrefined territory.' },
  { id: 5, title: 'Mindful of Process', desc: 'Be highly aware of where you are in the design sequence, what method to pull, and how to direct your team\'s active energy.' },
  { id: 6, title: 'Bias Toward Action', desc: 'Do not just sit and analyze. Build cardboard models, draft scripts, and co-design with users. Make, break, learn!' },
  { id: 7, title: 'Radical Collaboration', desc: 'Bring medical, law, business, and art minds into the same workspace to build things none of you could have imagined alone.' }
];

const QUIZ_QUESTIONS = [
  {
    question: "1. A co-designed prototype fails dramatically during user testing. What do you do?",
    options: [
      { text: "Laugh, grab the hot-glue gun, and rebuild a completely different version in 10 minutes.", type: "prototyper" },
      { text: "Sit down with the user and listen to their disappointment. Unpack their emotional reactions.", type: "explorer" },
      { text: "Trace back how this failure affects the wider community ecosystem and 50-year system loop.", type: "futurist" },
      { text: "Re-examine the initial creative brief. Did we answer the wrong problem question?", type: "crusader" }
    ]
  },
  {
    question: "2. You are given a blank sheet of cardboard, some twine, and a sharpie. Your instinct is to:",
    options: [
      { text: "Immediately fold it into a custom 3D telephone booth mockup.", type: "prototyper" },
      { text: "Draft a sign-up sheet to interview bystanders about their day.", type: "explorer" },
      { text: "Map out a large, nested timeline showing how resource scarcity affects local schools.", type: "futurist" },
      { text: "Write 10 assumption statements on the cardboard and challenge colleagues to flip them.", type: "crusader" }
    ]
  },
  {
    question: "3. Who is your ultimate dream collaborator on a complex project?",
    options: [
      { text: "A physical sculptor who works in messy clay and scrap metal.", type: "prototyper" },
      { text: "A somatic therapist who specializes in non-verbal body language and space.", type: "explorer" },
      { text: "A multi-generational panel of ancestors and descendants.", type: "futurist" },
      { text: "An investigative reporter who unearths hidden systemic power dynamics.", type: "crusader" }
    ]
  },
  {
    question: "4. When walking into a new, highly ambiguous public space, you first notice:",
    options: [
      { text: "How people interact with physical fixtures—workarounds, hacks, or doors being held.", type: "prototyper" },
      { text: "The facial expressions, tones of voices, and underlying feelings of comfort or belonging.", type: "explorer" },
      { text: "The historical context, public policies, and resource grids shaping this community.", type: "futurist" },
      { text: "The explicit rules, warnings, and invisible assumptions governing how visitors behave.", type: "crusader" }
    ]
  },
  {
    question: "5. What is your favorite d.school mantra or design value?",
    options: [
      { text: "\"Fail forward, fast. Prototyping is thinking with your hands.\"", type: "prototyper" },
      { text: "\"Design for Belonging. Empathy is co-creation, not observation.\"", type: "explorer" },
      { text: "\"Stretch your horizon. We are ancestors to descendants yet unborn.\"", type: "futurist" },
      { text: "\"Embrace ambiguity. True clarity comes from crossing assumption bridges.\"", type: "crusader" }
    ]
  }
];

export default function InfoView() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizState, setQuizState] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [archetypeResult, setArchetypeResult] = useState<{ name: string; desc: string; motto: string; challenge: string } | null>(null);

  const handleStartQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setQuizState('quiz');
  };

  const handleAnswerSelect = (type: string) => {
    const updated = [...answers, type];
    setAnswers(updated);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Tabulate result
      const counts = updated.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      let highestType = 'prototyper';
      let maxCount = 0;
      Object.entries(counts).forEach(([k, v]) => {
        const val = v as number;
        if (val > maxCount) {
          maxCount = val;
          highestType = k;
        }
      });

      // Assign Archetype
      let arch = { name: '', desc: '', motto: '', challenge: '' };
      if (highestType === 'prototyper') {
        arch = {
          name: "The Radical Prototyper",
          desc: "You build cardboard and glue-gun mockups immediately. You understand that 'prototyping is thinking with your hands' and would rather fail fast and physically iterate than spend weeks in sedentary committee planning.",
          motto: "\"Don't think your way into a new way of acting. Act your way into a new way of thinking!\"",
          challenge: "Grab three random items from your drawer. Combine them to design an adaptive phone holder. Get feedback from someone within 1 hour."
        };
      } else if (highestType === 'explorer') {
        arch = {
          name: "The Empathy Explorer",
          desc: "You have a deep radar for emotional undertones and social belonging. You understand that co-designing with community stakeholders is the absolute key to building systems that are deeply trusted and impactful.",
          motto: "\"If you design for people without designing WITH them, you represent your bias rather than their needs.\"",
          challenge: "Conduct an assumption interview with a colleague. Ask open-ended questions and unearth three distinct emotional constraints they face."
        };
      } else if (highestType === 'futurist') {
        arch = {
          name: "The Systems Futurist",
          desc: "You stretch your responsibility horizon. You observe current actions through a multi-generational lens, tracing resources, power loops, and ecosystem dynamics 100 years into the future.",
          motto: "\"We must cultivate deep empathy not just for those standing in front of us, but for descendants yet unborn.\"",
          challenge: "Complete a 'Portrait of a Descendant' map. Design one modern-day education ritual that ensures high civic trust in 2126."
        };
      } else {
        arch = {
          name: "The Assumptions Crusader",
          desc: "You are the ultimate frame reframer! You ask 'Why' five times in rapid succession, shatter standard project instructions, and turn boring briefs into beautiful creative canvases of possibilities.",
          motto: "\"Great design doesn't come from answers; it comes from having the courage to ask the right questions.\"",
          challenge: "Pick one standard office tool you dislike. Write down 5 rules governing its design, then brainstorm 3 ways to violate those rules."
        };
      }

      setArchetypeResult(arch);
      setQuizState('result');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-16">
      
      {/* Brand philosophy intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-4 border-brand-black p-6 md:p-8">
        <div className="lg:col-span-7 space-y-4">
          <p className="font-mono text-xs font-black uppercase text-brand-primary tracking-widest">
            Hasso Plattner Institute of Design at Stanford
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-black text-brand-black leading-tight">
            Creative Confidence & <em className="text-brand-primary italic not-font-bold">Radical</em> Playfulness
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-black/75 leading-relaxed">
            The Stanford d.school is a hub for innovators. We believe design thinking is a tool for systemic change, democratic access, and social equity. We don't just teach courses; we foster experimental mindsets, co-creation methodologies, and a bias toward action. Anyone from any major or background is welcomed to explore, prototype, and co-design a more collaborative world.
          </p>
        </div>
        <div className="lg:col-span-5 bg-brand-cyan/20 border-2 border-brand-black p-6 rounded relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute -right-4 -top-8 text-9xl font-black text-brand-cyan/30">d.</div>
          <div className="space-y-2 z-10">
            <h3 className="font-display text-lg font-bold text-brand-black">The Core Belief</h3>
            <p className="font-sans text-xs text-brand-black/80 leading-relaxed italic">
              "We believe that everyone has creative capacity, and that design thinking can be used to unlock that capacity, foster collaboration, and build equitable futures."
            </p>
          </div>
          <span className="font-mono text-[9px] font-black text-brand-secondary uppercase tracking-wider block mt-4 z-10">
            Est. 2005 • Stanford University
          </span>
        </div>
      </section>

      {/* 7 Stanford d.school Mindsets */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl md:text-3xl font-black text-brand-black uppercase">
            The 7 Design Mindsets
          </h2>
          <p className="font-sans text-xs text-brand-black/50">These core behavioral postures govern every creative challenge at the d.school.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MINDSETS.map((mind, idx) => (
            <div key={mind.id} className="bg-brand-surface border-2 border-brand-black p-5 relative rounded hover:translate-y-1 transition-transform">
              <span className="font-mono text-3xl font-black text-brand-primary/10 absolute right-3 top-2 select-none">
                0{mind.id}
              </span>
              <h4 className="font-display text-base font-bold text-brand-black mb-2 pr-6">
                {mind.title}
              </h4>
              <p className="font-sans text-xs text-brand-black/70 leading-relaxed">
                {mind.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Designer Archetype Quiz */}
      <section className="bg-[#eeeee9] border-4 border-brand-black p-6 md:p-8 rounded relative overflow-hidden">
        <div className="absolute right-4 top-4 font-mono text-[10px] text-brand-black/25 font-bold uppercase select-none tracking-widest hidden md:block">
          interactive d.school experiment
        </div>

        {quizState === 'intro' ? (
          /* Quiz Intro Screen */
          <div className="max-w-2xl mx-auto text-center space-y-6 py-6">
            <div className="flex items-center justify-center bg-brand-primary text-white rounded-full w-12 h-12 mx-auto">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl md:text-3xl font-black text-brand-black">What is your Designer Archetype?</h2>
              <p className="font-sans text-sm text-brand-black/70 leading-relaxed">
                Answer 5 playful, scenario-based questions inspired by d.school classroom challenges. Uncover your dominant design mindset and receive custom exercises curated for your archetype!
              </p>
            </div>
            <button
              onClick={handleStartQuiz}
              className="bg-brand-primary text-white hover:bg-brand-black border-2 border-brand-black py-3 px-8 font-mono text-xs uppercase font-extrabold rounded inline-flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              Start Archetype Audit
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        ) : quizState === 'quiz' ? (
          /* Active Question Screen */
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex justify-between items-center font-mono text-[10px] uppercase font-bold text-brand-black/50">
              <span>DESIGN MINDSET AUDIT</span>
              <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-brand-black leading-snug">
                {QUIZ_QUESTIONS[currentQ].question}
              </h3>
              
              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(opt.type)}
                    className="w-full text-left bg-white border-2 border-brand-black p-4 text-xs font-sans text-brand-black/85 hover:bg-brand-equity/10 hover:border-brand-equity transition-all cursor-pointer relative group flex justify-between items-center"
                  >
                    <span>{opt.text}</span>
                    <span className="w-5 h-5 rounded-full border border-brand-black group-hover:bg-brand-equity group-hover:border-brand-equity flex items-center justify-center text-transparent group-hover:text-white font-bold text-[10px] transition-colors">
                      ✓
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-brand-black/10 h-2 rounded overflow-hidden">
              <div 
                className="bg-brand-equity h-full transition-all duration-300"
                style={{ width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          /* Result Screen */
          archetypeResult && (
            <div className="max-w-2xl mx-auto bg-white border-2 border-brand-black p-6 md:p-8 space-y-6 relative hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="absolute right-4 top-4 bg-brand-primary text-white rounded-full p-2">
                <Trophy className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase font-black tracking-widest text-brand-primary">Audit Outcome</span>
                <h2 className="font-display text-2xl md:text-3xl font-black text-brand-black">
                  {archetypeResult.name}
                </h2>
                <p className="font-sans italic text-xs text-brand-black/60 font-bold leading-relaxed">
                  {archetypeResult.motto}
                </p>
              </div>

              <p className="font-sans text-sm text-brand-black/75 leading-relaxed bg-brand-surface p-4 border-l-4 border-brand-secondary">
                {archetypeResult.desc}
              </p>

              <div className="bg-brand-yellow/30 p-5 border border-brand-black/15 space-y-3">
                <h4 className="font-mono text-xs font-black uppercase text-brand-equity flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  Your Custom Maker Challenge:
                </h4>
                <p className="font-sans text-xs text-brand-black/85 leading-relaxed">
                  {archetypeResult.challenge}
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-brand-black/10">
                <button
                  onClick={handleStartQuiz}
                  className="bg-brand-black text-white hover:bg-brand-primary font-mono text-[10px] uppercase font-bold py-2 px-5 rounded inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Audit
                </button>
              </div>
            </div>
          )
        )}
      </section>

    </div>
  );
}
