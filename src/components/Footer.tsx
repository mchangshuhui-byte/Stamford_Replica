import React, { useState } from 'react';
import { Loader2, MailCheck, AlertCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [challengePrompt, setChallengePrompt] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setChallengePrompt(data.curiosityPrompt || '');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Network error. Failed to reach server.');
    }
  };

  return (
    <footer className="bg-brand-black text-brand-surface py-16 px-6 md:px-10 border-t-4 border-brand-primary mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        
        {/* Logo & Brand */}
        <div className="lg:col-span-2 space-y-6">
          <div className="font-display text-8xl font-extrabold text-brand-equity leading-none">d.</div>
          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold tracking-tight">Stanford | ENGINEERING</h3>
            <p className="font-sans text-xs text-brand-surface/60 max-w-xs leading-relaxed">
              Hasso Plattner Institute of Design at Stanford University. Bringing design thinking, creative confidence, and radical collaboration to the world.
            </p>
          </div>
        </div>

        {/* Footer Links Column 1 */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold text-brand-equity uppercase tracking-widest">About</h4>
          <nav className="flex flex-col gap-2 font-sans text-sm text-brand-surface/80">
            <a className="hover:text-brand-equity transition-colors" href="#our-space">Our Space</a>
            <a className="hover:text-brand-equity transition-colors" href="#stories">Stories</a>
            <a className="hover:text-brand-equity transition-colors" href="#news">News & Media</a>
          </nav>
          
          <h4 className="font-mono text-xs font-bold text-brand-equity uppercase tracking-widest pt-4">Study</h4>
          <nav className="flex flex-col gap-2 font-sans text-sm text-brand-surface/80">
            <a className="hover:text-brand-equity transition-colors" href="#undergrad">Undergraduate</a>
            <a className="hover:text-brand-equity transition-colors" href="#grad">Graduate Degree</a>
            <a className="hover:text-brand-equity transition-colors" href="#electives">Electives</a>
          </nav>
        </div>

        {/* Footer Links Column 2 */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold text-brand-equity uppercase tracking-widest">Innovate</h4>
          <nav className="flex flex-col gap-2 font-sans text-sm text-brand-surface/80">
            <a className="hover:text-brand-equity transition-colors" href="#professional">Professional Education</a>
            <a className="hover:text-brand-equity transition-colors" href="#shop">d.school Shop</a>
            <a className="hover:text-brand-equity transition-colors" href="#tools">Design Tools</a>
          </nav>

          <h4 className="font-mono text-xs font-bold text-brand-equity uppercase tracking-widest pt-4">Connect</h4>
          <nav className="flex flex-col gap-2 font-sans text-sm text-brand-surface/80">
            <a className="hover:text-brand-equity transition-colors" href="#events">Upcoming Events</a>
            <a className="hover:text-brand-equity transition-colors" href="#directory">Directory</a>
            <a className="hover:text-brand-equity transition-colors" href="#support">Support Our Work</a>
          </nav>
        </div>

        {/* Subscription Section */}
        <div className="lg:col-span-2 bg-brand-black/40 border-2 border-brand-equity p-6 rounded relative flex flex-col justify-between overflow-hidden">
          <div className="absolute -right-2 -top-6 text-[110px] font-bold text-brand-equity/15 leading-none select-none">!</div>
          
          <div className="space-y-3 z-10">
            <h4 className="font-display text-lg font-bold leading-snug text-brand-surface">
              Want to learn more & get involved?
            </h4>
            <p className="font-sans text-xs text-brand-surface/80 leading-relaxed">
              Subscribe to our email newsletter for (kinda) regular updates, methods, and workshop opportunities.
            </p>
          </div>

          <div className="mt-6 z-10">
            {status === 'success' ? (
              <div className="space-y-3 bg-brand-equity/20 p-4 rounded border border-brand-equity/30 text-xs">
                <div className="flex items-center gap-2 text-brand-equity font-bold">
                  <MailCheck className="w-4 h-4" />
                  Subscription Confirmed!
                </div>
                <p className="text-brand-surface/90 leading-relaxed">{message}</p>
                {challengePrompt && (
                  <div className="border-t border-brand-surface/20 pt-2 mt-2">
                    <span className="font-mono text-[10px] uppercase text-brand-equity font-bold tracking-wider">Your Mini-Challenge:</span>
                    <p className="italic text-brand-surface/80">{challengePrompt}</p>
                  </div>
                )}
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[10px] font-mono underline hover:text-brand-equity transition-colors cursor-pointer block mt-1"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full bg-brand-black border border-brand-surface/30 px-3 py-2 text-xs rounded focus:outline-none focus:border-brand-equity text-brand-surface transition-colors"
                  required
                />
                
                {status === 'error' && (
                  <p className="text-red-400 text-[11px] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-brand-surface text-brand-black hover:bg-brand-equity hover:text-white transition-all font-mono text-[11px] font-bold py-2.5 px-4 uppercase rounded flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Adding to circle...
                    </>
                  ) : (
                    'Get the latest'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-surface/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-wider text-brand-surface/55">
          <a className="hover:text-brand-equity transition-colors" href="#linkedin">LinkedIn</a>
          <a className="hover:text-brand-equity transition-colors" href="#instagram">Instagram</a>
          <a className="hover:text-brand-equity transition-colors" href="#x">X</a>
          <a className="hover:text-brand-equity transition-colors" href="#facebook">Facebook</a>
          <a className="hover:text-brand-equity transition-colors" href="#medium">Medium</a>
        </div>
        <p className="font-sans text-xs text-brand-surface/40 text-center md:text-right">
          © {new Date().getFullYear()} Hasso Plattner Institute of Design at Stanford University. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
