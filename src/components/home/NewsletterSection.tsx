import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Sparkles, Check, Copy } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Gentleman Circle! Voucher code unlocked.', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('GENT15');
    showToast('Promo code "GENT15" copied to clipboard!', 'info');
  };

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#18181f] via-[#121216] to-[#0c0c0e] border border-neutral-800 p-8 sm:p-14 text-center shadow-2xl">
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Atelier Dispatch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-wide">
            Join The Gentlemen&apos;s Circle
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Subscribe to receive private invitations to runway previews, rare fabric arrivals, and private concierge perks.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your gentleman email address"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-2xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#d4af37] hover:bg-[#c5a030] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 shrink-0 cursor-pointer"
              >
                Claim 15% Privilege
              </button>
            </form>
          ) : (
            <div className="mt-6 p-4 rounded-2xl bg-neutral-900/80 border border-[#d4af37]/40 max-w-md mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Welcome Privilege Unlocked
                </span>
                <div className="text-sm font-extrabold text-white tracking-widest mt-0.5">
                  CODE: <span className="text-[#d4af37]">GENT15</span>
                </div>
              </div>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#c5a030] transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>
          )}

          <p className="text-[10px] text-neutral-500 pt-2">
            Zero spam. Unsubscribe at any time with a single click.
          </p>
        </div>
      </div>
    </section>
  );
};
