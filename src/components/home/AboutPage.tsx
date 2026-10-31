import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Sparkles, Award, MapPin, Scissors, Clock } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          The House of Urban Gent
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-white tracking-wide">
          An Atelier Dedicated To Sartorial Excellence
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
          Established in 2021, URBAN GENT emerged with a singular commitment: to restore heirloom craft and architectural precision to modern men&apos;s attire.
        </p>
      </div>

      {/* Flagship Showrooms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            city: 'Mumbai Atelier',
            address: 'The Heritage Arcade, Kala Ghoda, Fort',
            hours: '11:00 AM – 09:00 PM',
            service: 'Bespoke Fittings & Cigar Lounge',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
          },
          {
            city: 'London Showroom',
            address: '14 Savile Row, Mayfair, London W1S',
            hours: '10:00 AM – 07:00 PM',
            service: 'European Master Tailor Consultations',
            image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80'
          },
          {
            city: 'Chennai Boutique',
            address: 'Boat Club Road, R.A. Puram, Chennai',
            hours: '11:00 AM – 08:30 PM',
            service: 'Giza Cotton & Resort Linen Suite',
            image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'
          }
        ].map(store => (
          <div
            key={store.city}
            className="rounded-3xl bg-[#121215] border border-neutral-800 overflow-hidden shadow-xl"
          >
            <div className="h-44 overflow-hidden relative">
              <img src={store.image} alt={store.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                {store.city}
              </div>
            </div>
            <div className="p-6 space-y-2 text-xs">
              <div className="text-white font-medium flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{store.address}</span>
              </div>
              <div className="text-neutral-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{store.hours}</span>
              </div>
              <div className="text-neutral-300 pt-2 border-t border-neutral-800/80 font-medium">
                {store.service}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Craftsmanship Pillars */}
      <div className="bg-[#121216] border border-neutral-800 rounded-3xl p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white text-center mb-10">
          The Four Pillars of Urban Gent
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#d4af37] mx-auto sm:mx-0">
              <Scissors className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Canvassed Structure</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Floating horsehair canvas inside jacket chests that breathes and moves rather than stiff glued fusions.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#d4af37] mx-auto sm:mx-0">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Noble Fibers Only</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Zero synthetic microplastics. We mill pure long-staple cotton, French flax, and fine Merino wool.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#d4af37] mx-auto sm:mx-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Honest Luxury Pricing</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Direct-from-atelier model removing 8x traditional wholesale markups for exceptional value.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#d4af37] mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Heirloom Longevity</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Engineered with generous interior seam inlays allowing alterations across decades of body changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
