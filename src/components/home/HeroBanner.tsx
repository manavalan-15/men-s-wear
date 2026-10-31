import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, Award, Shield, Truck, Compass } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Background Hero Image with Editorial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85"
          alt="Gentleman Fashion Model in Double Breasted Suit"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-110 scale-105 transform animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/90 via-transparent to-[#0c0c0e]/90"></div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 pointer-events-none flex justify-between opacity-15">
        <div className="w-px h-full bg-neutral-600"></div>
        <div className="w-px h-full bg-neutral-600 hidden md:block"></div>
        <div className="w-px h-full bg-neutral-600"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-20 text-center flex flex-col items-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#d4af37]/40 backdrop-blur-md mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            Autumn / Winter Haute Sartorial Collection
          </span>
        </div>

        {/* Primary Heading */}
        <h1 className="font-display-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-[0.08em] uppercase leading-[1.05] drop-shadow-2xl">
          DEFINE YOUR <span className="shimmer-gold">STYLE</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-lg md:text-xl text-neutral-300 font-serif-luxury max-w-2xl font-normal tracking-wide leading-relaxed">
          Discover the Latest Men&apos;s Fashion Collection. Hand-cut Italian fabrics, Savile Row precision, and timeless luxury tailored for modern distinguished gentlemen.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('shop');
            }}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#d4af37] hover:bg-[#c5a030] text-black font-extrabold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl shadow-[#d4af37]/30 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Shop The Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentView('lookbook')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/60 hover:bg-neutral-900 border border-neutral-700 hover:border-[#d4af37] text-white font-semibold text-xs uppercase tracking-[0.2em] backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Explore Lookbook</span>
          </button>
        </div>

        {/* Luxury Hallmarks Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full text-left">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Super 130s Wool</div>
              <div className="text-[11px] text-neutral-400">Merino &amp; Giza Cotton</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Bespoke Fit</div>
              <div className="text-[11px] text-neutral-400">Master Tailor Quality</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Express Dispatch</div>
              <div className="text-[11px] text-neutral-400">White-Glove 48H Delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">15-Day Exchange</div>
              <div className="text-[11px] text-neutral-400">Doorstep Collection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
