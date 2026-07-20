import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, Tag, Loader2, CheckCircle2, Ticket } from 'lucide-react';
import { CardItem, CartItem, CustomerDetails } from '../types';

interface ShopViewProps {
  cart: CartItem[];
  onUpdateCartQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  onAddToCart: (item: CardItem | { id: string; title: string; price: number; imageUrl?: string; category: string }) => void;
}

const SHOP_ITEMS = [
  {
    id: 'design-for-belonging-shop',
    title: 'Design for Belonging',
    category: 'Books',
    description: 'A practical, structured guide to designing welcoming spaces, co-creative rituals, and collaborative practices.',
    price: 22.99,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLukUWnX0vRAbm2Y06KR83gt9WE_fxYbuqkq0LsJ0jq5l6VsPVBZm7TPubSlMd35f1-gJ_oYiBGCjPn7s5VyQw9HzQgEFEZ_31wD06CvXPAPk9UCV_iWA2BcbBhBGrausmtYBCbKMIQmEH6mRYyeZ-P2PzvkILD03aXtSis6W4acOx-9HaSjCbW6dbbBPNZMqlXFHdF_q6JHy2Wnwj42QSZu3aO6RkHYkhdTzMpDyRvq8t38lvJn5QEmv2s',
    subTitle: 'How to Build More Inclusive Communities'
  },
  {
    id: 'deck-of-design-values-shop',
    title: 'Deck of Design Values',
    category: 'Tools & Decks',
    description: '32 beautiful tactile card prompts challenging your assumptions and shaking up static business methods.',
    price: 28.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsgyz_PXsP7V1WQ5SEj5_ST8geXfEW-MvYkS1ypN8oEaps-en9LG10-HSB3Pwb0LoXdvAy0YKH6dhov_HLHr3t-FqKqSMU3wFitc8yD8fBequywLYoLaKeFmKm_mOX_yGGMa5X-GRX1SOwNdjcgJSs_SXMVFAH6PG8Ysj8xly2Kcs8KyGpAxaBDqu8aip3DYYq0eXeOEc86-UrRoZQHcwrOEpCV6yditWbTIuBSBau-ZRw2MiaMzv4Vv68',
    subTitle: '32 Unexpected Ways to Explore Design'
  },
  {
    id: 'creative-acts-shop',
    title: 'Creative Acts for Curious People',
    category: 'Books',
    description: 'Filled with illustrations and over 80 hands-on d.school experiential activities to spark observation and empathy.',
    price: 26.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsgyz_PXsP7V1WQ5SEj5_ST8geXfEW-MvYkS1ypN8oEaps-en9LG10-HSB3Pwb0LoXdvAy0YKH6dhov_HLHr3t-FqKqSMU3wFitc8yD8fBequywLYoLaKeFmKm_mOX_yGGMa5X-GRX1SOwNdjcgJSs_SXMVFAH6PG8Ysj8xly2Kcs8KyGpAxaBDqu8aip3DYYq0eXeOEc86-UrRoZQHcwrOEpCV6yditWbTIuBSBau-ZRw2MiaMzv4Vv68',
    subTitle: 'How to Think, Make and Learn Boldly'
  },
  {
    id: 'stoke-deck-shop',
    title: 'Stoke Deck: Printed Edition',
    category: 'Tools & Decks',
    description: '45 high-energy physical warm-ups, icebreakers, and quick physical prompts to wake up your teams.',
    price: 32.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLukUWnX0vRAbm2Y06KR83gt9WE_fxYbuqkq0LsJ0jq5l6VsPVBZm7TPubSlMd35f1-gJ_oYiBGCjPn7s5VyQw9HzQgEFEZ_31wD06CvXPAPk9UCV_iWA2BcbBhBGrausmtYBCbKMIQmEH6mRYyeZ-P2PzvkILD03aXtSis6W4acOx-9HaSjCbW6dbbBPNZMqlXFHdF_q6JHy2Wnwj42QSZu3aO6RkHYkhdTzMpDyRvq8t38lvJn5QEmv2s',
    subTitle: '45 Icebreakers and High-Energy Starters'
  },
  {
    id: 'red-sharpies-shop',
    title: 'Cardinal Red Professional Sharpies',
    category: 'Maker Supplies',
    description: 'A dozen archival, fast-drying markers in Stanford\'s legendary signature deep crimson shade.',
    price: 15.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsgyz_PXsP7V1WQ5SEj5_ST8geXfEW-MvYkS1ypN8oEaps-en9LG10-HSB3Pwb0LoXdvAy0YKH6dhov_HLHr3t-FqKqSMU3wFitc8yD8fBequywLYoLaKeFmKm_mOX_yGGMa5X-GRX1SOwNdjcgJSs_SXMVFAH6PG8Ysj8xly2Kcs8KyGpAxaBDqu8aip3DYYq0eXeOEc86-UrRoZQHcwrOEpCV6yditWbTIuBSBau-ZRw2MiaMzv4Vv68',
    subTitle: 'Pack of 12 Bold Bullet-Tip Markers'
  },
  {
    id: 'social-impact-shop',
    title: 'Designing for Social Impact Guide',
    category: 'Books',
    description: 'Co-creation manual mapping ethical community engagement practices and sustainable prototyping.',
    price: 18.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLukUWnX0vRAbm2Y06KR83gt9WE_fxYbuqkq0LsJ0jq5l6VsPVBZm7TPubSlMd35f1-gJ_oYiBGCjPn7s5VyQw9HzQgEFEZ_31wD06CvXPAPk9UCV_iWA2BcbBhBGrausmtYBCbKMIQmEH6mRYyeZ-P2PzvkILD03aXtSis6W4acOx-9HaSjCbW6dbbBPNZMqlXFHdF_q6JHy2Wnwj42QSZu3aO6RkHYkhdTzMpDyRvq8t38lvJn5QEmv2s',
    subTitle: 'Co-Design Framework Manual'
  }
];

export default function ShopView({ cart, onUpdateCartQuantity, onRemoveFromCart, onAddToCart }: ShopViewProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Books' | 'Tools & Decks' | 'Maker Supplies'>('All');
  const [checkoutStep, setCheckoutStep] = useState<'shopping' | 'details' | 'success'>('shopping');
  
  // Checkout Form Details
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<{ orderId: string; total: number; deliveryDate: string; message: string } | null>(null);
  const [error, setError] = useState('');

  const filteredItems = SHOP_ITEMS.filter(item => 
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825; // 8.25% CA Sales Tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const grandTotal = subtotal + tax + shipping;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.email || !customer.address) {
      setError('Please fill in all checkout fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, customer }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to place order.');
      }

      const data = await response.json();
      setOrderResult(data);
      setCheckoutStep('success');
      
      // Clear cart
      cart.forEach(item => onRemoveFromCart(item.id));
    } catch (err: any) {
      setError(err?.message || 'Error processing checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Intro section */}
      <section className="text-center space-y-3 mb-10">
        <p className="font-mono text-[10px] uppercase font-bold tracking-widest text-brand-equity bg-brand-equity/10 px-3 py-1 rounded inline-block">
          d.school bookstore & supply co.
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-brand-black">
          Read & Buy
        </h1>
        <p className="font-sans text-sm text-brand-black/60 max-w-xl mx-auto">
          Equip yourself and your classroom with the tools of radical collaboration. Books written by d.school directors, custom tactile card decks, and maker equipment.
        </p>
      </section>

      {checkoutStep === 'success' && orderResult ? (
        /* Order Success Screen */
        <div className="max-w-md mx-auto bg-white border-4 border-brand-black p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-brand-secondary/15 text-brand-secondary rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-black text-brand-black">Order Placed Successfully!</h2>
            <p className="font-mono text-sm text-brand-equity font-bold">{orderResult.orderId}</p>
          </div>
          <p className="font-sans text-sm text-brand-black/75 leading-relaxed">
            {orderResult.message}
          </p>
          <div className="bg-brand-surface border-y border-brand-black/15 py-4 text-xs font-mono text-left space-y-2">
            <p><strong>Total Charged:</strong> ${orderResult.total.toFixed(2)}</p>
            <p><strong>Estimated Delivery:</strong> {orderResult.deliveryDate}</p>
            <p><strong>Shipping To:</strong> {customer.name}, {customer.address}</p>
          </div>
          <button
            onClick={() => {
              setCheckoutStep('shopping');
              setCustomer({ name: '', email: '', address: '' });
              setOrderResult(null);
            }}
            className="w-full bg-brand-black text-white hover:bg-brand-primary py-3 font-mono text-xs uppercase font-extrabold rounded cursor-pointer transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : checkoutStep === 'details' ? (
        /* Checkout Shipping Details Form */
        <div className="max-w-2xl mx-auto bg-white border-4 border-brand-black p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-brand-black/10 pb-4">
            <h2 className="font-display text-xl font-bold text-brand-black">Shipping & Billing Information</h2>
            <button
              onClick={() => setCheckoutStep('shopping')}
              className="text-xs font-mono underline text-brand-black/60 hover:text-brand-black"
            >
              Back to cart
            </button>
          </div>

          <form onSubmit={handleCheckoutSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60 block">Full Name</label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="e.g. Jean Plattner"
                className="w-full bg-brand-surface border border-brand-black px-3 py-2 text-sm rounded focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60 block">Email Address</label>
              <input
                type="email"
                required
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                placeholder="e.g. jean@stanford.edu"
                className="w-full bg-brand-surface border border-brand-black px-3 py-2 text-sm rounded focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase font-bold text-brand-black/60 block">Delivery Address</label>
              <input
                type="text"
                required
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="e.g. 550 Escondido Mall, Stanford, CA 94305"
                className="w-full bg-brand-surface border border-brand-black px-3 py-2 text-sm rounded focus:outline-none focus:border-brand-primary"
              />
            </div>

            {error && <p className="text-red-600 text-xs font-mono">{error}</p>}

            <div className="bg-brand-surface p-4 border border-brand-black/15 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} item(s)):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>CA Tax (8.25%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between border-t border-brand-black/10 pt-2 font-bold text-brand-equity text-sm">
                <span>Total Charge:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-equity text-white hover:bg-brand-black border-2 border-brand-black py-3.5 font-mono text-xs uppercase font-extrabold rounded flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Charging Secure Token...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Place Simulated Order (${grandTotal.toFixed(2)})
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Standard Shop Catalog Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Catalog Listing */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Catalog Categories */}
            <div className="flex flex-wrap gap-2 border-b border-brand-black/10 pb-4">
              {(['All', 'Books', 'Tools & Decks', 'Maker Supplies'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-xs uppercase font-bold py-1.5 px-3 rounded-full cursor-pointer transition-colors ${
                    activeCategory === cat
                      ? 'bg-brand-primary text-white'
                      : 'bg-brand-black/5 text-brand-black hover:bg-brand-black/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white border-2 border-brand-black flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                  
                  {/* Image & Header */}
                  <div>
                    <div className="h-44 overflow-hidden border-b-2 border-brand-black relative bg-brand-surface flex items-center justify-center">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-80"
                      />
                      <span className="absolute top-2 left-2 bg-brand-black text-white text-[9px] font-mono font-bold uppercase py-0.5 px-2">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="font-mono text-[10px] font-bold text-brand-primary uppercase tracking-wider block">
                        {item.subTitle}
                      </span>
                      <h3 className="font-display text-lg font-bold text-brand-black leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-brand-black/70 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Add to cart */}
                  <div className="p-4 pt-0 border-t border-brand-black/10 mt-4 flex items-center justify-between">
                    <span className="font-mono font-black text-brand-black text-base">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onAddToCart({ ...item, category: 'Book' })}
                      className="bg-brand-primary text-white border border-brand-black px-3 py-1.5 font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 hover:bg-brand-black cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Cart Panel Sidebar */}
          <div className="lg:col-span-4 bg-white border-4 border-brand-black p-6 space-y-6 self-start hover:shadow-[4px_4px_0px_0px_rgba(31,28,6,0.1)] transition-shadow">
            <h2 className="font-display text-lg font-black text-brand-black uppercase border-b-2 border-brand-black pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-brand-primary" />
                Shopping Bag
              </span>
              <span className="font-mono text-xs bg-brand-black/5 px-2 py-0.5 rounded text-brand-black">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
              </span>
            </h2>

            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-brand-black/15 mx-auto" />
                <p className="font-sans text-xs text-brand-black/50 italic">Your bag is empty. Explore and co-design!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Item Rows */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b border-brand-black/10 pb-3 items-start">
                      <div className="w-12 h-12 bg-brand-surface border border-brand-black/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingBag className="w-5 h-5 text-brand-black/30" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-display text-xs font-bold text-brand-black leading-tight line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-brand-black/60">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-1 bg-brand-black/5 rounded px-1.5 py-0.5">
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}
                              className="p-0.5 hover:text-brand-primary"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
                              className="p-0.5 hover:text-brand-primary"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-brand-black/40 hover:text-brand-equity p-0.5 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Pricing */}
                <div className="space-y-2 border-t-2 border-brand-black/10 pt-4 font-mono text-xs">
                  <div className="flex justify-between text-brand-black/75">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {subtotal > 0 && subtotal < 50 && (
                    <div className="flex items-center gap-1 bg-yellow-50 text-brand-black p-2 text-[10px] rounded border border-yellow-200">
                      <Ticket className="w-3.5 h-3.5 text-brand-primary" />
                      Add <strong>${(50 - subtotal).toFixed(2)}</strong> more for FREE Shipping!
                    </div>
                  )}
                  <div className="flex justify-between text-brand-black/75">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-black text-brand-black text-sm border-t border-brand-black/10 pt-2">
                    <span>Est. Total:</span>
                    <span>${(subtotal + shipping).toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger button */}
                <button
                  onClick={() => setCheckoutStep('details')}
                  className="w-full bg-brand-primary text-white hover:bg-brand-black border-2 border-brand-black py-3 font-mono text-xs uppercase font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  Checkout Simulated Bag
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
