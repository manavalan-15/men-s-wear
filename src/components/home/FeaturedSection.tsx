import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';
import { ArrowRight, Flame, Sparkles, Star, Tag } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'bestsellers' | 'offers'>('featured');

  const filteredProducts = products.filter(p => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'new') return p.isNewArrival || p.isFeatured;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'offers') return p.onSale || p.originalPrice > p.discountedPrice;
    return true;
  });

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
            Haute Selection
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
            The Atelier Collections
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#121216] border border-neutral-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'featured'
                ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured</span>
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'new'
                ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>New Arrivals</span>
          </button>

          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'bestsellers'
                ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Best Sellers</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'offers'
                ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Special Offers</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 8).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-14 text-center">
        <button
          onClick={() => {
            setSelectedCategory('All');
            setCurrentView('shop');
          }}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-[#d4af37] hover:bg-neutral-850 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all group"
        >
          <span>Explore Entire Catalog ({products.length} Garments)</span>
          <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
