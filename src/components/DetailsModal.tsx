import { CardItem } from '../types';
import { X, Clock, Users, Scissors, Quote, ShoppingCart, Check, Heart } from 'lucide-react';
import { useState } from 'react';

interface DetailsModalProps {
  item: CardItem;
  onClose: () => void;
  onAddToCart: (item: CardItem) => void;
  onSaveToPortfolio?: (item: CardItem) => void;
  isSaved?: boolean;
}

export default function DetailsModal({ item, onClose, onAddToCart, onSaveToPortfolio, isSaved = false }: DetailsModalProps) {
  const [added, setAdded] = useState(false);

  const handleCartClick = () => {
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-brand-surface border-4 border-brand-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none relative">
        
        {/* Header Ribbon / Category Banner */}
        <div className={`p-4 border-b-2 border-brand-black flex items-center justify-between ${
          item.category === 'Workshop' ? 'bg-brand-primary text-white' :
          item.category === 'Tool' ? 'bg-brand-secondary text-white' :
          item.category === 'Project' ? 'bg-[#9bedf2] text-brand-black' : 'bg-brand-black text-white'
        }`}>
          <span className="font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            {item.category} • {item.tag}
          </span>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-brand-black/20 rounded-full transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero image if exists */}
        {item.imageUrl && (
          <div className="w-full h-48 md:h-64 overflow-hidden border-b-2 border-brand-black relative">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Details & Philosophy */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-brand-black leading-tight">
                {/* Format words with asterisks if any, or standard */}
                {item.title.split('*').map((part, index) => 
                  index % 2 === 1 ? <em key={index} className="text-brand-primary italic not-font-bold mr-1">{part}</em> : part
                )}
              </h2>
              {item.price && (
                <p className="font-mono text-xl font-extrabold text-brand-equity mt-2">
                  ${item.price.toFixed(2)}
                </p>
              )}
            </div>

            <p className="font-sans text-sm md:text-base text-brand-black/80 leading-relaxed">
              {item.longDescription}
            </p>

            {/* Micro Metadata */}
            <div className="grid grid-cols-2 gap-4 border-y-2 border-brand-black/10 py-4 font-mono text-xs text-brand-black/70">
              {item.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-secondary" />
                  <span><strong>Timeframe:</strong> {item.duration}</span>
                </div>
              )}
              {item.groupSize && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-secondary" />
                  <span><strong>Group Size:</strong> {item.groupSize}</span>
                </div>
              )}
            </div>

            {/* Materials Checklist */}
            {item.materials && item.materials.length > 0 && (
              <div className="bg-brand-yellow/30 border-2 border-brand-black/20 p-4 rounded-none space-y-2">
                <h4 className="font-mono text-xs font-black uppercase text-brand-black flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5" />
                  What you need (Materials):
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-brand-black/70 pl-1 list-disc list-inside">
                  {item.materials.map((mat, i) => (
                    <li key={i}>{mat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Wisdom take away */}
            {item.whyItWorks && (
              <div className="border-l-4 border-brand-equity pl-4 py-1 italic text-brand-black/70 font-sans text-sm relative">
                <Quote className="w-8 h-8 text-brand-equity/15 absolute -left-2 -top-4 -z-10" />
                <p className="relative z-10">{item.whyItWorks}</p>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Step Guide */}
          <div className="md:col-span-5 space-y-6 border-t-2 md:border-t-0 md:border-l-2 border-brand-black/10 pt-6 md:pt-0 md:pl-6">
            <h3 className="font-mono text-xs font-black uppercase text-brand-black tracking-wider">
              Step-by-Step Guide
            </h3>

            {item.steps && item.steps.length > 0 ? (
              <div className="space-y-4">
                {item.steps.map((step, idx) => (
                  <div key={idx} className="border-2 border-brand-black p-4 bg-white relative hover:translate-x-1 hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-center mb-1.5 font-mono text-[11px] font-bold text-brand-primary">
                      <span>{step.name}</span>
                      <span className="bg-brand-black/5 px-1.5 py-0.5 rounded text-brand-black">
                        {step.time}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-brand-black/80 leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-brand-black/5 p-8 text-center rounded-none italic text-xs text-brand-black/55">
                No step-by-step activity required for this entry. Read, learn, and co-design!
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t-2 border-brand-black/10">
              {item.price ? (
                <button
                  onClick={handleCartClick}
                  className="w-full bg-brand-equity text-white hover:bg-brand-black border-2 border-brand-black py-3 font-mono text-xs uppercase font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart • ${item.price.toFixed(2)}
                    </>
                  )}
                </button>
              ) : (
                onSaveToPortfolio && (
                  <button
                    onClick={() => onSaveToPortfolio(item)}
                    className={`w-full border-2 border-brand-black py-3 font-mono text-xs uppercase font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                      isSaved 
                        ? 'bg-brand-secondary text-white' 
                        : 'bg-white text-brand-black hover:bg-brand-black hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-white' : 'text-brand-black'}`} />
                    {isSaved ? 'Saved to Portfolio!' : 'Save Activity Guide'}
                  </button>
                )
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
