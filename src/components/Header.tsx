import { ShoppingBag, Sparkles, Grid, BookOpen, Info, PenTool, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: 'feed' | 'curious' | 'shop' | 'maker' | 'info';
  setActiveTab: (tab: 'feed' | 'curious' | 'shop' | 'maker' | 'info') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, onOpenCart }: HeaderProps) {
  const navItems = [
    { id: 'feed', label: 'Everything Feed', icon: Grid },
    { id: 'curious', label: 'Curiosity Lab', icon: Sparkles },
    { id: 'shop', label: 'Read & Buy', icon: BookOpen },
    { id: 'maker', label: 'Maker Studio', icon: PenTool },
    { id: 'info', label: 'd.school Info', icon: Info },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-surface border-b-2 border-brand-black px-4 md:px-10 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setActiveTab('feed')}
          className="font-display text-lg md:text-2xl font-black text-brand-primary uppercase tracking-tighter hover:scale-105 transition-transform cursor-pointer"
        >
          Stanford d.school
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 font-mono text-xs uppercase tracking-wider font-bold">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
                isActive 
                  ? 'text-brand-primary border-brand-primary' 
                  : 'text-brand-black/60 border-transparent hover:text-brand-primary'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        {/* Mobile Navigation Dropdown/Tabs representation (Icon list) */}
        <div className="lg:hidden flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`p-1.5 rounded transition-colors ${
                  isActive ? 'bg-brand-primary text-white' : 'text-brand-black hover:bg-brand-black/5'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Shopping Cart Button */}
        <button
          onClick={onOpenCart}
          className="relative p-2 hover:bg-brand-black/5 rounded-full transition-colors flex items-center justify-center cursor-pointer group"
          title="Open Cart"
        >
          <ShoppingBag className="w-5 h-5 text-brand-black group-hover:text-brand-primary transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-brand-equity text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
