import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, BookOpen, Scissors, HelpCircle, Heart, FolderPlus } from 'lucide-react';
import { GeneratedMethod } from '../types';

interface CuriosityLabProps {
  onSaveGeneratedMethod: (method: GeneratedMethod) => void;
  savedTitles: string[];
}

const PRESET_CURIOSITIES = [
  { text: "Designing a morning routine that isn't stressful", focus: "Tool" },
  { text: "Helping university students learn visual design layout", focus: "Workshop" },
  { text: "Improving local park accessibility for multi-generational families", focus: "Project" },
  { text: "Overcoming fear of failure when starting a new venture", focus: "Story" },
  { text: "Designing an interface that stops mindless social media scrolling", focus: "Tool" },
];

const LOADING_MESSAGES = [
  "Grabbing the sharpies...",
  "Plastering the windows with sticky notes...",
  "Asking 'Why' five times in a row...",
  "Sourcing cardboard and duct tape...",
  "Embracing absolute ambiguity...",
  "Assembling the radical collaboration squad...",
  "Brewing fresh design thinking coffee...",
  "Drafting rapid prototypes..."
];

export default function CuriosityLab({ onSaveGeneratedMethod, savedTitles }: CuriosityLabProps) {
  const [curiosity, setCuriosity] = useState('');
  const [focusArea, setFocusArea] = useState('Any');
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [result, setResult] = useState<GeneratedMethod | null>(null);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Rotate loading messages
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handlePresetSelect = (preset: typeof PRESET_CURIOSITIES[0]) => {
    setCuriosity(preset.text);
    setFocusArea(preset.focus);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!curiosity.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    setIsSaved(false);
    setLoadingMsgIdx(0);

    try {
      const response = await fetch('/api/curious', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curiosity, focusArea: focusArea === 'Any' ? '' : focusArea }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate design method');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Something went wrong while connecting with Gemini. Make sure your GEMINI_API_KEY is configured in the Secrets panel.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!result) return;
    onSaveGeneratedMethod(result);
    setIsSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
      {/* Intro section */}
      <section className="text-center space-y-4">
        <p className="font-sans text-lg italic text-brand-black/60">I'm curious about...</p>
        <div className="inline-flex flex-col items-center">
          <div className="flex items-center justify-center bg-brand-equity text-white rounded-full w-12 h-12 mb-3 animate-bounce">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black italic text-brand-equity tracking-tight">
            Everything
          </h1>
        </div>
        <p className="font-sans text-sm text-brand-black/70 max-w-lg mx-auto">
          Type what you are curious to solve or explore. The d.school Gemini advisor will co-design a custom design thinking exercise, experiment, or rapid-prototyping challenge for you!
        </p>
      </section>

      {/* Inputs Form */}
      <section className="bg-white border-4 border-brand-black p-6 md:p-8 rounded-none">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs font-black uppercase text-brand-black block">
              1. What's on your mind? (Your Curiosity Area)
            </label>
            <input
              type="text"
              placeholder="e.g. Redesigning how busy parents find quiet focus, making climate data fun..."
              value={curiosity}
              onChange={(e) => setCuriosity(e.target.value)}
              disabled={loading}
              className="w-full bg-brand-surface border-2 border-brand-black px-4 py-3 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-brand-equity text-brand-black transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-xs font-black uppercase text-brand-black block">
                2. Design Format Focus
              </label>
              <select
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                disabled={loading}
                className="w-full bg-brand-surface border-2 border-brand-black p-3 text-sm rounded-none focus:outline-none text-brand-black font-mono"
              >
                <option value="Any">Any Format (Surprise me)</option>
                <option value="Tool">Tool (Method card)</option>
                <option value="Workshop">Workshop (Event blueprint)</option>
                <option value="Project">Project (Deep dive challenge)</option>
                <option value="Story">Story (Case reflection style)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || !curiosity.trim()}
                className="w-full bg-brand-equity text-white hover:bg-brand-black border-2 border-brand-black py-3.5 px-6 font-mono text-xs uppercase font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Consulting d.school...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Ignite Curiosity
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Preset Suggestions */}
        <div className="mt-8 border-t border-brand-black/10 pt-4">
          <span className="font-mono text-[10px] uppercase font-bold text-brand-black/55 tracking-widest block mb-2">
            Or, spark ideas with preset curiosities:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_CURIOSITIES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                disabled={loading}
                className="bg-brand-black/5 hover:bg-brand-equity/15 border border-brand-black/10 px-3 py-1.5 text-xs rounded font-sans text-brand-black/80 hover:text-brand-equity transition-colors text-left cursor-pointer"
              >
                💡 {preset.text} ({preset.focus})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading Animation */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-brand-equity border-t-transparent rounded-full animate-spin"></div>
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase font-bold text-brand-equity tracking-wider">
              {LOADING_MESSAGES[loadingMsgIdx]}
            </p>
            <p className="text-xs text-brand-black/55 italic">
              Generating active, physical, and intellectual prototyping steps via Gemini 3.5...
            </p>
          </div>
        </div>
      )}

      {/* Error Output */}
      {error && (
        <div className="bg-red-50 border-2 border-red-500 p-6 flex flex-col md:flex-row gap-4 items-center text-red-700">
          <HelpCircle className="w-12 h-12 text-red-500 flex-shrink-0" />
          <div className="space-y-1 text-xs md:text-sm">
            <h4 className="font-bold uppercase tracking-wider">Failed to draft design challenge</h4>
            <p className="leading-relaxed">{error}</p>
            <p className="font-mono text-[10px] text-red-500/80 mt-2">
              Tip: Ensure your GEMINI_API_KEY has been set up in the Secrets tab of AI Studio.
            </p>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <section className="bg-[#eeeee9] border-4 border-brand-black p-4 md:p-8 space-y-6 relative hover:shadow-[6px_6px_0px_0px_rgba(31,28,6,0.15)] transition-shadow">
          <div className="absolute right-4 top-4 bg-brand-equity text-white text-[10px] font-mono px-2 py-0.5 rounded font-black uppercase">
            {result.tag}
          </div>

          <div className="space-y-4">
            <span className="bg-brand-black text-white px-3 py-1 font-mono text-[10px] uppercase font-bold">
              Gemini Co-Created Method • {result.category}
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-brand-black leading-tight">
              {result.title.split('*').map((part, index) => 
                index % 2 === 1 ? <em key={index} className="text-brand-primary italic not-font-bold mr-1">{part}</em> : part
              )}
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-black/85 leading-relaxed bg-white/70 p-4 border-l-4 border-brand-secondary">
              {result.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t-2 border-brand-black/15 pt-6">
            
            {/* Left side: Context, Materials, Wisdom */}
            <div className="md:col-span-5 space-y-6">
              <div className="grid grid-cols-2 gap-4 font-mono text-xs border-b border-brand-black/10 pb-4 text-brand-black/75">
                <div>
                  <span className="font-bold block text-[10px] text-brand-black/50">TIME ALLOCATED:</span>
                  {result.duration}
                </div>
                <div>
                  <span className="font-bold block text-[10px] text-brand-black/50">GROUP SIZE:</span>
                  {result.groupSize}
                </div>
              </div>

              {/* Materials */}
              <div className="space-y-2 bg-brand-yellow/30 p-4 border border-brand-black/15">
                <h4 className="font-mono text-xs font-black uppercase text-brand-black flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5" />
                  Materials Checklist:
                </h4>
                <ul className="text-xs space-y-1 pl-1 list-disc list-inside text-brand-black/75">
                  {result.materials.map((mat, i) => (
                    <li key={i}>{mat}</li>
                  ))}
                </ul>
              </div>

              {/* Wisdom */}
              <div className="border-l-4 border-brand-equity pl-4 italic text-xs md:text-sm text-brand-black/70">
                "{result.whyItWorks}"
              </div>
            </div>

            {/* Right side: Steps list */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="font-mono text-xs font-black uppercase text-brand-black tracking-wide">
                Core Activities (Active Steps)
              </h4>
              <div className="space-y-4">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="bg-white border border-brand-black/25 p-4 relative hover:translate-x-1 transition-transform">
                    <div className="flex justify-between items-center mb-1 text-xs font-mono font-bold text-brand-primary">
                      <span>{step.name}</span>
                      <span className="bg-brand-black/5 px-1.5 py-0.2 rounded text-brand-black text-[10px]">
                        {step.time}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-brand-black/85 leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action button */}
          <div className="border-t-2 border-brand-black/15 pt-6 flex justify-end">
            <button
              onClick={handleSaveResult}
              disabled={isSaved || savedTitles.includes(result.title)}
              className={`font-mono text-xs uppercase font-extrabold py-2.5 px-6 border-2 border-brand-black flex items-center gap-2 cursor-pointer transition-all ${
                isSaved || savedTitles.includes(result.title)
                  ? 'bg-brand-secondary text-white'
                  : 'bg-white text-brand-black hover:bg-brand-black hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
              }`}
            >
              <FolderPlus className="w-4 h-4" />
              {isSaved || savedTitles.includes(result.title) ? 'Saved to Your Portfolio' : 'Save to Maker Portfolio'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
