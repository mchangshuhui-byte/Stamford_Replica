import React, { useState } from 'react';
import { PenTool, Plus, Trash2, Check, Sparkles, Eye, ScrollText, Calendar, Compass, UserCircle } from 'lucide-react';
import { CustomUserTool, GeneratedMethod } from '../types';

interface PortfolioViewProps {
  savedMethods: GeneratedMethod[];
  onDeleteSavedMethod: (title: string) => void;
  customTools: CustomUserTool[];
  onCreateCustomTool: (tool: CustomUserTool) => void;
  onDeleteCustomTool: (id: string) => void;
  onViewSavedMethod: (method: GeneratedMethod) => void;
}

const COLOR_PRESETS = [
  { id: 'bg-brand-yellow text-brand-black', name: 'Warm Yellow', bg: '#F8F3DB' },
  { id: 'bg-brand-cyan text-brand-black', name: 'Soft Cyan', bg: '#9bedf2' },
  { id: 'bg-brand-secondary text-white', name: 'Teal Green', bg: '#00696e' },
  { id: 'bg-brand-primary text-white', name: 'Cardinal Red', bg: '#bc000a' },
  { id: 'bg-brand-black text-white', name: 'Deep Black', bg: '#1F1C06' },
];

export default function PortfolioView({
  savedMethods,
  onDeleteSavedMethod,
  customTools,
  onCreateCustomTool,
  onDeleteCustomTool,
  onViewSavedMethod
}: PortfolioViewProps) {
  // Card Builder Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Workshop' | 'Tool' | 'Story' | 'Project'>('Tool');
  const [tag, setTag] = useState('Radical Maker');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<{ name: string; instruction: string; time: string }[]>([
    { name: '1. Immerse', instruction: 'Get physical feedback from the environment.', time: '10 mins' }
  ]);
  const [bgColorClass, setBgColorClass] = useState('bg-brand-yellow text-brand-black');
  
  // Single Step input builder
  const [stepName, setStepName] = useState('');
  const [stepInstruction, setStepInstruction] = useState('');
  const [stepTime, setStepTime] = useState('');

  const [activeTab, setActiveTab] = useState<'portfolio' | 'builder'>('portfolio');

  const handleAddStep = () => {
    if (!stepName.trim() || !stepInstruction.trim()) return;
    setSteps([...steps, { name: stepName, instruction: stepInstruction, time: stepTime || '5 mins' }]);
    setStepName('');
    setStepInstruction('');
    setStepTime('');
  };

  const handleRemoveStep = (idx: number) => {
    setSteps(steps.filter((_, i) => i !== idx));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newTool: CustomUserTool = {
      id: `custom-${Date.now()}`,
      title,
      category,
      tag,
      description,
      steps,
      bgColor: bgColorClass,
      createdAt: new Date().toLocaleDateString()
    };

    onCreateCustomTool(newTool);
    
    // Clear & shift tab
    setTitle('');
    setDescription('');
    setSteps([{ name: '1. Immerse', instruction: 'Get physical feedback from the environment.', time: '10 mins' }]);
    setTag('Radical Maker');
    setActiveTab('portfolio');
  };

  const handleViewCustomAsMethod = (tool: CustomUserTool) => {
    const formatted: GeneratedMethod = {
      title: tool.title,
      category: tool.category,
      duration: tool.steps.reduce((acc, curr) => acc ? `${acc} + ${curr.time}` : curr.time, ''),
      groupSize: 'Any',
      tag: tool.tag,
      description: tool.description,
      materials: ['Paper', 'Imagination'],
      steps: tool.steps,
      whyItWorks: 'You designed and published this custom method card inside the d.school Maker Studio!'
    };
    onViewSavedMethod(formatted);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-brand-black/15 mb-8">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-6 py-3 font-mono text-xs uppercase font-extrabold border-t-2 border-x-2 border-brand-black relative top-[2px] transition-colors cursor-pointer ${
            activeTab === 'portfolio'
              ? 'bg-white text-brand-primary border-b-2 border-b-white z-10'
              : 'bg-brand-surface text-brand-black/55 border-transparent hover:text-brand-black'
          }`}
        >
          📁 My d.school Portfolio ({savedMethods.length + customTools.length})
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-6 py-3 font-mono text-xs uppercase font-extrabold border-t-2 border-x-2 border-brand-black relative top-[2px] transition-colors cursor-pointer ${
            activeTab === 'builder'
              ? 'bg-white text-brand-primary border-b-2 border-b-white z-10'
              : 'bg-brand-surface text-brand-black/55 border-transparent hover:text-brand-black'
          }`}
        >
          🛠️ Method Card Builder
        </button>
      </div>

      {activeTab === 'builder' ? (
        /* Method Card Customizer Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Side */}
          <form onSubmit={handlePublish} className="lg:col-span-7 bg-white border-4 border-brand-black p-6 md:p-8 space-y-6">
            <h2 className="font-display text-xl font-black text-brand-black uppercase border-b border-brand-black/15 pb-2">
              Co-Design Your Method Card
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60">Card Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. *Bodystorming* on a Budget"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-brand-surface border border-brand-black px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                />
                <span className="text-[10px] text-brand-black/40 block">Wrap key terms in asterisks *Empathy* for bold visual italics.</span>
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60">Category Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-brand-surface border border-brand-black px-3 py-2 text-sm focus:outline-none font-mono"
                >
                  <option value="Tool">Tool (Tactile / Method)</option>
                  <option value="Workshop">Workshop (Agenda / Active Session)</option>
                  <option value="Project">Project (Deep systemic challenge)</option>
                  <option value="Story">Story (Anecdote / Learning Reflection)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60">Theme Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Radical Collaboration, Equity"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-brand-surface border border-brand-black px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60">Aesthetic Palette</label>
                <div className="flex gap-2 pt-1">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setBgColorClass(preset.id)}
                      title={preset.name}
                      style={{ backgroundColor: preset.bg }}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${
                        bgColorClass === preset.id ? 'border-brand-equity scale-110' : 'border-brand-black/20 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60">Brief Mission (Description)</label>
              <textarea
                rows={3}
                required
                placeholder="What bottlenecks does this solve? Who is this method designed for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-brand-surface border border-brand-black p-3 text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>

            {/* Dynamic Step Agenda Builder */}
            <div className="border-t border-brand-black/15 pt-4 space-y-3">
              <h3 className="font-mono text-xs font-black uppercase text-brand-black tracking-wide">
                Build Activity Agenda Steps
              </h3>
              
              <div className="space-y-2 bg-brand-surface p-4 border border-brand-black/15">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Step (e.g. 1. Immerse)"
                    value={stepName}
                    onChange={(e) => setStepName(e.target.value)}
                    className="bg-white border border-brand-black/30 px-3 py-1.5 text-xs rounded"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 10 mins)"
                    value={stepTime}
                    onChange={(e) => setStepTime(e.target.value)}
                    className="bg-white border border-brand-black/30 px-3 py-1.5 text-xs rounded"
                  />
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="bg-brand-secondary text-white hover:bg-brand-black py-1.5 px-3 font-mono text-[10px] uppercase font-bold rounded cursor-pointer"
                  >
                    Add This Step
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder="Clear physical directions: stand up, draw ASSUMPTIONS, rip them up..."
                  value={stepInstruction}
                  onChange={(e) => setStepInstruction(e.target.value)}
                  className="w-full bg-white border border-brand-black/30 p-2 text-xs rounded mt-2 focus:outline-none"
                />
              </div>

              {/* List added steps */}
              <div className="space-y-2">
                {steps.map((st, i) => (
                  <div key={i} className="flex justify-between items-center bg-brand-black/5 px-3 py-2 rounded text-xs">
                    <div className="font-mono">
                      <strong>{st.name}</strong> ({st.time}): <span className="font-sans italic">{st.instruction}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(i)}
                      className="text-brand-black/40 hover:text-brand-equity p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!title.trim() || !description.trim() || steps.length === 0}
              className="w-full bg-brand-primary text-white hover:bg-brand-black border-2 border-brand-black py-3.5 font-mono text-xs uppercase font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-45 disabled:translate-none disabled:shadow-none"
            >
              <Check className="w-4 h-4" />
              Publish to My Portfolio Card Stack
            </button>
          </form>

          {/* Card Preview Side */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-mono text-xs font-black uppercase text-brand-black/60 tracking-wider">Live Card Preview</h3>
            
            <div className={`border-4 border-brand-black p-6 relative flex flex-col justify-between min-h-[350px] rounded-none hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-shadow ${bgColorClass}`}>
              <span className="absolute left-2 top-2 rotated-label font-mono text-[9px] uppercase font-bold tracking-widest opacity-60">
                {category}
              </span>
              
              <div className="space-y-4 mt-6">
                <span className="bg-brand-black text-white px-2 py-0.5 font-mono text-[9px] uppercase font-bold inline-block">
                  {tag || 'Method'}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight leading-snug">
                  {(title || 'Untitled Method').split('*').map((part, index) => 
                    index % 2 === 1 ? <em key={index} className="text-brand-equity italic mr-1 not-font-bold">{part}</em> : part
                  )}
                </h3>
                <p className="font-sans text-xs opacity-85 leading-relaxed">
                  {description || 'Provide a brief summary detailing the creative goals of this published method.'}
                </p>
              </div>

              {/* Step counter micro badge */}
              <div className="border-t border-brand-black/10 pt-4 flex items-center justify-between font-mono text-[10px] font-bold">
                <span>{steps.length} ACTIVE AGENDA STEPS</span>
                <span className="bg-brand-black/10 px-2 py-0.5 rounded text-[9px]">PREVIEW ONLY</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Portfolio Grid listing published and bookmarked tools */
        <div className="space-y-8">
          
          {/* Saved methods from Curiosity Lab (Gemini) */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-black text-brand-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-equity animate-pulse" />
              Gemini Co-Created Exercises ({savedMethods.length})
            </h3>
            
            {savedMethods.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-brand-black/20 p-8 text-center text-xs text-brand-black/50 italic rounded space-y-2">
                <p>No co-created exercises saved yet.</p>
                <p className="text-[10px] font-mono not-italic uppercase tracking-widest text-brand-primary">
                  Go to Curiosity Lab and enter a challenge to co-design with AI!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedMethods.map((method, idx) => (
                  <div key={idx} className="bg-white border-2 border-brand-black p-5 flex flex-col justify-between hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center font-mono text-[9px]">
                        <span className="bg-brand-secondary text-white py-0.5 px-2 rounded-full uppercase font-bold">
                          {method.category}
                        </span>
                        <span className="text-brand-black/55 font-bold uppercase">{method.tag}</span>
                      </div>
                      <h4 className="font-display text-md font-extrabold text-brand-black tracking-tight leading-snug">
                        {method.title.split('*').map((part, index) => 
                          index % 2 === 1 ? <em key={index} className="text-brand-primary italic not-font-bold mr-0.5">{part}</em> : part
                        )}
                      </h4>
                      <p className="font-sans text-xs text-brand-black/75 line-clamp-3 leading-relaxed">
                        {method.description}
                      </p>
                    </div>

                    <div className="border-t border-brand-black/10 pt-4 mt-4 flex justify-between items-center">
                      <button
                        onClick={() => onViewSavedMethod(method)}
                        className="text-[10px] font-mono uppercase font-black tracking-wider text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Guide
                      </button>
                      <button
                        onClick={() => onDeleteSavedMethod(method.title)}
                        className="text-[10px] font-mono uppercase font-black tracking-wider text-brand-black/40 hover:text-brand-equity flex items-center gap-1 cursor-pointer"
                        title="Delete from Portfolio"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Published Custom Method Cards */}
          <div className="space-y-4 pt-4 border-t border-brand-black/10">
            <h3 className="font-display text-lg font-black text-brand-black flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-brand-secondary" />
              Published Custom Cards ({customTools.length})
            </h3>

            {customTools.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-brand-black/20 p-8 text-center text-xs text-brand-black/50 italic rounded space-y-2">
                <p>No custom published cards yet.</p>
                <p className="text-[10px] font-mono not-italic uppercase tracking-widest text-brand-secondary">
                  Click 'Method Card Builder' above to custom-craft your own methods!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {customTools.map((tool) => (
                  <div key={tool.id} className="bg-white border-2 border-brand-black p-5 flex flex-col justify-between hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center font-mono text-[9px]">
                        <span className="bg-brand-black text-white py-0.5 px-2 rounded-full uppercase font-bold">
                          {tool.category}
                        </span>
                        <span className="text-brand-black/55 font-bold uppercase">{tool.tag}</span>
                      </div>
                      <h4 className="font-display text-md font-extrabold text-brand-black tracking-tight leading-snug">
                        {tool.title.split('*').map((part, index) => 
                          index % 2 === 1 ? <em key={index} className="text-brand-primary italic not-font-bold mr-0.5">{part}</em> : part
                        )}
                      </h4>
                      <p className="font-sans text-xs text-brand-black/75 line-clamp-3 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="border-t border-brand-black/10 pt-4 mt-4 flex justify-between items-center">
                      <button
                        onClick={() => handleViewCustomAsMethod(tool)}
                        className="text-[10px] font-mono uppercase font-black tracking-wider text-brand-secondary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect steps
                      </button>
                      <button
                        onClick={() => onDeleteCustomTool(tool.id)}
                        className="text-[10px] font-mono uppercase font-black tracking-wider text-brand-black/40 hover:text-brand-equity flex items-center gap-1 cursor-pointer"
                        title="Delete card"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
