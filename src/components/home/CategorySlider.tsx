import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES_DATA } from '../../data/initialData';
import { CategoryName } from '../../types';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const CategorySlider: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useStore();

  const handleCategorySelect = (cat: CategoryName) => {
    setSelectedCategory(cat);
    setCurrentView('shop');
  };

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
            Curated Departments
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
            Shop By Wardrobe Category
          </h2>
        </div>
        <button
          onClick={() => {
            setSelectedCategory('All');
            setCurrentView('shop');
          }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#d4af37] transition-colors group"
        >
          <span>View All Collections</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid of 10 Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {CATEGORIES_DATA.map(item => (
          <div
            key={item.name}
            onClick={() => handleCategorySelect(item.name)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-850 hover:border-[#d4af37]/60 cursor-pointer transition-all duration-500 shadow-xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            {/* Tag Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/70 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-md">
                {item.tag}
              </span>
            </div>

            {/* Category Name & Action */}
            <div className="absolute inset-x-3 bottom-3 p-2">
              <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-white group-hover:text-[#d4af37] transition-colors leading-tight">
                {item.name}
              </h3>
              <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.description}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#d4af37] mt-1">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
