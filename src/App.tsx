import { useState, useEffect } from 'react';
import { CardItem, CartItem, CustomUserTool, GeneratedMethod } from './types';
import { INITIAL_CARDS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import DetailsModal from './components/DetailsModal';
import CuriosityLab from './components/CuriosityLab';
import ShopView from './components/ShopView';
import PortfolioView from './components/PortfolioView';
import InfoView from './components/InfoView';
import { Search, Filter, Grid, ArrowRight, X, Sparkles, BookOpen, ShoppingBag, Plus, Minus, Heart } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'feed' | 'curious' | 'shop' | 'maker' | 'info'>('feed');
  
  // Feed States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Workshop' | 'Tool' | 'Project' | 'Story' | 'Book'>('All');
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Maker Portfolio States (Durable Storage with LocalStorage)
  const [savedMethods, setSavedMethods] = useState<GeneratedMethod[]>([]);
  const [customTools, setCustomTools] = useState<CustomUserTool[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem('dschool_saved_methods');
      const storedCustom = localStorage.getItem('dschool_custom_tools');
      const storedCart = localStorage.getItem('dschool_cart');
      
      if (storedSaved) setSavedMethods(JSON.parse(storedSaved));
      if (storedCustom) setCustomTools(JSON.parse(storedCustom));
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
  }, []);

  // Save to local storage on state changes
  useEffect(() => {
    localStorage.setItem('dschool_saved_methods', JSON.stringify(savedMethods));
  }, [savedMethods]);

  useEffect(() => {
    localStorage.setItem('dschool_custom_tools', JSON.stringify(customTools));
  }, [customTools]);

  useEffect(() => {
    localStorage.setItem('dschool_cart', JSON.stringify(cart));
  }, [cart]);

  // Shopping Cart Actions
  const handleAddToCart = (item: CardItem | { id: string; title: string; price: number; imageUrl?: string; category: string }) => {
    const price = item.price || 19.99; // Default price if not specified
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(cart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, {
        id: item.id,
        title: item.title,
        price,
        imageUrl: item.imageUrl,
        quantity: 1,
        category: item.category
      }]);
    }
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCart(cart.map((item) => item.id === id ? { ...item, quantity } : item));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Portfolio Saved Actions
  const handleSaveGeneratedMethod = (method: GeneratedMethod) => {
    if (savedMethods.some((m) => m.title === method.title)) return;
    setSavedMethods([...savedMethods, method]);
  };

  const handleDeleteSavedMethod = (title: string) => {
    setSavedMethods(savedMethods.filter((m) => m.title !== title));
  };

  const handleCreateCustomTool = (tool: CustomUserTool) => {
    setCustomTools([tool, ...customTools]);
  };

  const handleDeleteCustomTool = (id: string) => {
    setCustomTools(customTools.filter((t) => t.id !== id));
  };

  // Convert custom or bookmarked portfolio item for modal inspection
  const handleInspectSavedMethod = (method: GeneratedMethod) => {
    const parsedCard: CardItem = {
      id: `saved-${Date.now()}`,
      title: method.title,
      category: method.category as any,
      tag: method.tag,
      description: method.description,
      longDescription: method.description,
      bgColorClass: 'bg-[#eeeee9]',
      textColorClass: 'text-brand-black',
      tagBgClass: 'bg-brand-black',
      tagTextClass: 'text-white',
      duration: method.duration,
      groupSize: method.groupSize,
      materials: method.materials,
      steps: method.steps,
      whyItWorks: method.whyItWorks
    };
    setSelectedItem(parsedCard);
  };

  // Feed Filter list calculation
  const filteredCards = INITIAL_CARDS.filter((card) => {
    const matchesFilter = activeFilter === 'All' ? true : card.category === activeFilter;
    const matchesSearch = 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-brand-surface text-brand-black min-h-screen font-sans flex flex-col justify-between selection:bg-brand-primary selection:text-white">
      
      {/* Central Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* Main Body */}
      <main className="flex-1 pt-24 pb-12">
        {activeTab === 'feed' && (
          <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-12">
            
            {/* Eclectic Brutalist Hero Banner */}
            <section className="relative bg-brand-black text-white p-8 md:p-14 border-4 border-brand-black hover:translate-x-1 hover:-translate-y-1 transition-transform overflow-hidden shadow-[6px_6px_0px_0px_rgba(188,0,10,1)]">
              <div className="absolute right-0 bottom-0 text-[180px] font-display font-black leading-none text-brand-primary/15 uppercase select-none pointer-events-none">
                d.
              </div>
              <div className="space-y-6 max-w-3xl z-10 relative">
                <span className="font-mono text-xs uppercase tracking-widest font-black text-brand-primary bg-white/10 px-3 py-1 rounded inline-block">
                  Stanford Hasso Plattner Institute of Design
                </span>
                <h1 className="font-display text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">
                  Everything is <span className="text-brand-primary underline decoration-2">designed</span>.
                </h1>
                <p className="font-sans text-sm md:text-lg leading-relaxed text-brand-surface/80">
                  Explore curriculum methods, design tools, published guides, and immersive workshops. Discover step-by-step practices built to unlock creative courage and radical co-creation.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('curious')}
                    className="bg-brand-primary text-white border border-brand-black px-5 py-3 font-mono text-xs uppercase font-extrabold flex items-center gap-2 hover:bg-white hover:text-brand-black cursor-pointer transition-colors"
                  >
                    Curiosity Engine
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('maker')}
                    className="bg-transparent text-white border border-white/30 hover:border-white px-5 py-3 font-mono text-xs uppercase font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    Custom Maker Studio
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Sliding Visual Marquee Divider */}
            <div className="bg-brand-primary border-y-2 border-brand-black py-3 text-white font-mono text-xs uppercase font-black tracking-widest overflow-hidden whitespace-nowrap select-none">
              <div className="animate-marquee inline-block">
                Co-Create • Discover • Prototype • Human Values • Radical Collaboration • Craft Clarity • Show Don't Tell • Embrace Ambiguity • Co-Create • Discover • Prototype • Human Values • Radical Collaboration • Craft Clarity
              </div>
            </div>

            {/* Catalog Filters & Real-time Search */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-brand-black p-4 bg-white">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'Workshop', 'Tool', 'Project', 'Story', 'Book'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`font-mono text-xs uppercase font-bold px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                      activeFilter === filter
                        ? 'bg-brand-primary text-white'
                        : 'bg-brand-black/5 text-brand-black hover:bg-brand-black/10'
                    }`}
                  >
                    {filter === 'All' ? 'All Formats' : `${filter}s`}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-sm w-full">
                <input
                  type="text"
                  placeholder="Search titles, categories, or tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-surface border border-brand-black px-3 py-2 pl-9 text-xs rounded focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <Search className="w-3.5 h-3.5 text-brand-black/40 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-brand-black/40 hover:text-brand-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </section>

            {/* Everything Masonry Feed Grid */}
            <section className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredCards.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white border-2 border-dashed border-brand-black/20 rounded">
                  <p className="font-sans text-sm text-brand-black/50 italic">No matches found. Clear filters or check spelling.</p>
                </div>
              ) : (
                filteredCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedItem(card)}
                    className={`break-inside-avoid border-4 border-brand-black p-6 relative flex flex-col justify-between rounded-none cursor-pointer hover:shadow-[5px_5px_0px_0px_rgba(31,28,6,1)] transition-all hover:-translate-y-1 ${card.bgColorClass} ${card.textColorClass || 'text-brand-black'}`}
                  >
                    {/* Top vertical indicator */}
                    <span className="absolute left-2 top-2 rotated-label font-mono text-[9px] uppercase font-black tracking-wider opacity-60">
                      {card.category}
                    </span>

                    <div className="space-y-4 mt-6">
                      <span className={`px-2 py-0.5 font-mono text-[10px] uppercase font-bold inline-block rounded-none ${card.tagBgClass} ${card.tagTextClass}`}>
                        {card.tag}
                      </span>
                      <h3 className="font-display text-lg md:text-xl font-extrabold tracking-tight leading-snug">
                        {card.title.split('*').map((part, index) => 
                          index % 2 === 1 ? <em key={index} className="text-brand-equity italic mr-0.5 not-font-bold">{part}</em> : part
                        )}
                      </h3>
                      {card.imageUrl && (
                        <div className="w-full h-36 overflow-hidden border border-brand-black/20 my-3 rounded-none bg-brand-surface flex items-center justify-center">
                          <img 
                            src={card.imageUrl} 
                            alt={card.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      <p className="font-sans text-xs opacity-90 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="border-t border-brand-black/10 pt-4 mt-5 flex items-center justify-between font-mono text-[10px] font-bold">
                      <span className="flex items-center gap-1">
                        {card.duration || 'Flexible Frame'}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform uppercase text-brand-primary flex items-center gap-1">
                        Explore Activity →
                      </span>
                    </div>
                  </div>
                ))
              )}
            </section>

          </div>
        )}

        {/* Curiosity Lab tab */}
        {activeTab === 'curious' && (
          <CuriosityLab 
            onSaveGeneratedMethod={handleSaveGeneratedMethod} 
            savedTitles={savedMethods.map((m) => m.title)} 
          />
        )}

        {/* Read & Buy Shop tab */}
        {activeTab === 'shop' && (
          <ShopView 
            cart={cart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Maker Studio tab */}
        {activeTab === 'maker' && (
          <PortfolioView
            savedMethods={savedMethods}
            onDeleteSavedMethod={handleDeleteSavedMethod}
            customTools={customTools}
            onCreateCustomTool={handleCreateCustomTool}
            onDeleteCustomTool={handleDeleteCustomTool}
            onViewSavedMethod={handleInspectSavedMethod}
          />
        )}

        {/* Info tab */}
        {activeTab === 'info' && <InfoView />}
      </main>

      {/* Slide-out Shopping Cart Sidebar Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-brand-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white border-l-4 border-brand-black w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative">
            
            <div className="p-5 border-b-2 border-brand-black flex justify-between items-center bg-brand-surface">
              <h3 className="font-display text-lg font-black text-brand-black flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-primary" />
                Shopping Bag
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-brand-black/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="py-24 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-brand-black/15 mx-auto" />
                  <p className="font-sans text-xs text-brand-black/50 italic">Your bag is currently empty.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setActiveTab('shop');
                    }}
                    className="text-xs font-mono font-bold uppercase text-brand-primary hover:underline cursor-pointer"
                  >
                    Visit Bookstore Shop
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-brand-black/10 pb-4 items-start">
                    <div className="w-14 h-14 bg-brand-surface border border-brand-black/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-brand-black/30" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-display text-xs font-extrabold text-brand-black leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="font-mono text-[10px] text-brand-black/60">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 bg-brand-black/5 rounded px-2 py-0.5 font-mono text-xs">
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                            className="p-0.5 hover:text-brand-primary"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                            className="p-0.5 hover:text-brand-primary"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-xs font-mono text-brand-primary hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t-2 border-brand-black bg-brand-surface space-y-4">
                <div className="flex justify-between font-mono text-xs text-brand-black/75">
                  <span>Bag Subtotal:</span>
                  <span className="font-bold text-brand-black">${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab('shop');
                  }}
                  className="w-full bg-brand-primary text-white hover:bg-brand-black border-2 border-brand-black py-3 font-mono text-xs uppercase font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  Go to Checkout Screen
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Inspect Item Details Modal */}
      {selectedItem && (
        <DetailsModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToCart={handleAddToCart}
          onSaveToPortfolio={(item) => {
            const formatted: GeneratedMethod = {
              title: item.title,
              category: item.category,
              duration: item.duration || 'Flexible Frame',
              groupSize: item.groupSize || 'Any',
              tag: item.tag,
              description: item.description,
              materials: item.materials || [],
              steps: item.steps || [],
              whyItWorks: item.whyItWorks || 'A trusted curriculum exercise from Hasso Plattner Institute of Design at Stanford University.'
            };
            handleSaveGeneratedMethod(formatted);
          }}
          isSaved={savedMethods.some((m) => m.title === selectedItem.title)}
        />
      )}

      {/* Central Footer */}
      <Footer />
      
    </div>
  );
}
