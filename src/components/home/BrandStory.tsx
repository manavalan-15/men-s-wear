import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Scissors, ShieldCheck, Gem, Compass } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <section className="py-24 bg-[#0a0a0c] border-y border-neutral-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80"
                alt="Bespoke Tailor Inspecting Wool Flannel"
                className="w-full h-full object-cover object-center filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/75 border border-white/10 backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#d4af37]">
                  The Atelier Standard
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  &ldquo;A truly well-tailored suit is not an expense; it is armor for the modern gentleman.&rdquo;
                </div>
              </div>
            </div>

            {/* Floating Accent Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-[#16161a] border border-[#d4af37]/40 p-4 rounded-2xl shadow-2xl items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Hand-Stitched Lapels</div>
                <div className="text-[10px] text-neutral-400">Over 38 artisan work hours per coat</div>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              <span>Bespoke Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-wide leading-tight">
              Crafted For Those Who Walk With Purpose
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              At <strong className="text-white font-medium">URBAN GENT</strong>, we discard the disposable ethos of fast fashion. Founded at the crossroads of classic Savile Row tailoring and modern architectural minimalism, every piece in our permanent collection is forged with purpose.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#d4af37]">
                  <Gem className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Finest Raw Mills</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Direct alliances with vintage Japanese denim looms in Okayama and century-old Italian wool mills.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#d4af37]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Precision Fit</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Anatomically balanced chest canvas that naturally molds to your physique over years of wear.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setCurrentView('about')}
                className="px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-[#d4af37] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
              >
                Discover Atelier Philosophy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
