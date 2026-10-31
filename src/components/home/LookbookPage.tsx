import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Camera } from 'lucide-react';

export const LookbookPage: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setSelectedProduct, products } = useStore();

  const looks = [
    {
      title: 'The Riviera Departure',
      season: 'Autumn Cruise 2026',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80',
      description: 'French flax linen overshirt layered against relaxed Gurkha trousers with Italian driving loafers.',
      featuredProductId: 'prod-8'
    },
    {
      title: 'Savile Row Sovereign',
      season: 'Winter Galas & Evenings',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      description: 'Super 130s Merino virgin wool double-breasted blazer with peaked lapels and mother-of-pearl buttons.',
      featuredProductId: 'prod-1'
    },
    {
      title: 'Tokyo Raw Minimalist',
      season: 'Architectural Streetwear',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
      description: 'Full-grain calfskin biker jacket worn with 14.5oz Okayama selvedge denim.',
      featuredProductId: 'prod-5'
    },
    {
      title: 'The Kensington Executive',
      season: 'Metropolitan Autumn',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
      description: 'Camel Melton double-breasted overcoat cut with dramatic silhouette over an Oxford crown shirt.',
      featuredProductId: 'prod-12'
    }
  ];

  const handleShopLook = (prodId: string) => {
    const prod = products.find(p => p.id === prodId);
    if (prod) {
      setSelectedProduct(prod);
    } else {
      setCurrentView('shop');
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Editorial Lookbook</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-wide">
          Autumn / Winter Runway
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-light leading-relaxed">
          Examine sartorial pairings curated by our master stylists. Effortless sophistication engineered for boardrooms, galleries, and private suites.
        </p>
      </div>

      <div className="space-y-16">
        {looks.map((look, idx) => (
          <div
            key={look.title}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl group">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-black/80 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-md">
                  {look.season}
                </div>
              </div>
            </div>

            <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                Look {idx + 1}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                {look.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {look.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleShopLook(look.featuredProductId)}
                  className="px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#c5a030] text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#d4af37]/20"
                >
                  <span>Acquire This Look</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
