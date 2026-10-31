import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { CategoryName } from '../../types';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProduct,
    setCurrentView,
    formatPrice,
    setSelectedCategory
  } = useStore();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = [
    'Double-Breasted Blazer',
    'Selvedge Denim',
    'Egyptian Cotton Shirt',
    'Cashmere Overcoat',
    'French Terry Hoodie',
    'Gurkha Trouser'
  ];

  const handleSelectProduct = (prod: any) => {
    setSelectedProduct(prod);
    setIsSearchOpen(false);
  };

  const handleCategoryClick = (cat: CategoryName) => {
    setSelectedCategory(cat);
    setCurrentView('shop');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#121215] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input bar */}
        <div className="flex items-center px-6 py-5 border-b border-neutral-800/80 bg-[#16161a]">
          <Search className="w-5 h-5 text-[#d4af37] mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tailored blazers, Giza shirts, Japanese denim, boots..."
            className="w-full bg-transparent text-lg text-white placeholder-neutral-500 focus:outline-none font-sans-luxury"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white mr-3 text-sm"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Trending Searches
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-[#d4af37]/60 hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-3">
                Curated Departments
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(["Men's Shirts", "Formal Wear", "Jeans", "Trousers", "Jackets", "Accessories"] as CategoryName[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-800/80 text-left text-sm text-neutral-200 transition-colors group"
                  >
                    <span>{cat}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#d4af37] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <div className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">
                Products Found ({filteredProducts.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-4 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 hover:border-[#d4af37]/50 hover:bg-neutral-850 cursor-pointer transition-all group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs text-[#d4af37] uppercase tracking-wider font-medium">
                        {product.category}
                      </div>
                      <div className="text-sm font-semibold text-white truncate group-hover:text-[#d4af37] transition-colors">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-white">
                          {formatPrice(product.discountedPrice)}
                        </span>
                        {product.originalPrice > product.discountedPrice && (
                          <span className="text-xs text-neutral-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-base text-neutral-300">No bespoke pieces matching &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-neutral-500 mt-1">Try exploring blazers, linen, cashmere, or trousers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
