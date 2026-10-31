import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryName, ProductSize } from '../../types';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  Sparkles,
  Search
} from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/initialData';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    formatPrice
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColorHex, setSelectedColorHex] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);

  const availableSizes: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];

  const availableColors = [
    { name: 'Charcoal', hex: '#1f2421' },
    { name: 'Crisp White', hex: '#f8f9fa' },
    { name: 'Indigo Navy', hex: '#0b1b3d' },
    { name: 'Camel Tan', hex: '#b48b57' },
    { name: 'Espresso', hex: '#3d2b1f' },
    { name: 'Jet Black', hex: '#0f0f10' },
    { name: 'Sage Olive', hex: '#52634f' }
  ];

  const handleSizeToggle = (size: ProductSize) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColorHex(null);
    setMaxPrice(30000);
    setInStockOnly(false);
    setSearchFilter('');
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

        // Search text
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          const match = p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!match) return false;
        }

        // Price range
        if (p.discountedPrice > maxPrice) return false;

        // Size filter
        if (selectedSizes.length > 0) {
          const hasSize = selectedSizes.some(s => p.sizes.includes(s));
          if (!hasSize) return false;
        }

        // Color filter
        if (selectedColorHex) {
          const hasColor = p.colors.some(c => c.hex.toLowerCase() === selectedColorHex.toLowerCase());
          if (!hasColor) return false;
        }

        // In-stock only
        if (inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.discountedPrice - b.discountedPrice;
        if (sortBy === 'price-desc') return b.discountedPrice - a.discountedPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchFilter, maxPrice, selectedSizes, selectedColorHex, inStockOnly, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedSizes.length +
    (selectedColorHex ? 1 : 0) +
    (maxPrice < 30000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchFilter ? 1 : 0);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Category Pills Bar */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
            }`}
          >
            All Wardrobe
          </button>
          {CATEGORIES_DATA.map(c => (
            <button
              key={c.name}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === c.name
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar (3 cols on lg) */}
        <aside className="hidden lg:block lg:col-span-3 bg-[#121215] border border-neutral-800 rounded-3xl p-6 space-y-6 sticky top-28 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
              <h3 className="font-display-luxury text-sm font-bold text-white uppercase tracking-wider">
                Refine Selection
              </h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearAllFilters}
                className="text-[11px] text-[#d4af37] hover:underline font-semibold"
              >
                Clear All ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Search within catalog */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Search Garments
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Blazer, linen, denim..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              <span>Max Price</span>
              <span className="text-white font-mono">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="1500"
              max="30000"
              step="500"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
              <span>{formatPrice(1500)}</span>
              <span>{formatPrice(30000)}</span>
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Bespoke Size
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {availableSizes.map(s => (
                <button
                  key={s}
                  onClick={() => handleSizeToggle(s)}
                  className={`py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    selectedSizes.includes(s)
                      ? 'bg-[#d4af37] text-black font-extrabold shadow-md shadow-[#d4af37]/20'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Color Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorHex(selectedColorHex === c.hex ? null : c.hex)}
                  className={`w-7 h-7 rounded-full border transition-all ${
                    selectedColorHex === c.hex ? 'ring-2 ring-offset-2 ring-offset-[#121215] ring-[#d4af37] scale-110' : 'border-neutral-700 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-2 border-t border-neutral-800">
            <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded accent-[#d4af37] w-4 h-4"
              />
              <span>In Atelier Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Catalog Stage (9 cols on lg) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Bar: Results Count & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">
                Showing <strong className="text-[#d4af37]">{filteredProducts.length}</strong> Bespoke Garments
              </span>
              {selectedCategory !== 'All' && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {selectedCategory}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white"
              >
                <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  <option value="featured">Featured &amp; Curated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Patron Rated</option>
                  <option value="newest">New Arrivals First</option>
                </select>
              </div>

              {/* Grid Column Selector (Desktop) */}
              <div className="hidden sm:flex bg-neutral-900 border border-neutral-800 rounded-xl p-1">
                <button
                  onClick={() => setGridColumns(2)}
                  className={`p-1.5 rounded-lg transition-colors ${gridColumns === 2 ? 'bg-neutral-800 text-[#d4af37]' : 'text-neutral-400 hover:text-white'}`}
                  title="2 Columns"
                >
                  <Grid2X2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGridColumns(3)}
                  className={`p-1.5 rounded-lg transition-colors ${gridColumns === 3 ? 'bg-neutral-800 text-[#d4af37]' : 'text-neutral-400 hover:text-white'}`}
                  title="3 Columns"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  className={`p-1.5 rounded-lg transition-colors ${gridColumns === 4 ? 'bg-neutral-800 text-[#d4af37]' : 'text-neutral-400 hover:text-white'}`}
                  title="4 Columns"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-neutral-500">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-900 border border-neutral-700 text-white">
                  <span>Category: {selectedCategory}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-400"
                    onClick={() => setSelectedCategory('All')}
                  />
                </span>
              )}
              {selectedSizes.map(s => (
                <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-900 border border-neutral-700 text-white">
                  <span>Size {s}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-400"
                    onClick={() => handleSizeToggle(s)}
                  />
                </span>
              ))}
              {selectedColorHex && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-900 border border-neutral-700 text-white">
                  <span>Color Tone</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-400"
                    onClick={() => setSelectedColorHex(null)}
                  />
                </span>
              )}
              {maxPrice < 30000 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-900 border border-neutral-700 text-white">
                  <span>Under {formatPrice(maxPrice)}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-400"
                    onClick={() => setMaxPrice(30000)}
                  />
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-900 border border-neutral-700 text-white">
                  <span>In Stock</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-400"
                    onClick={() => setInStockOnly(false)}
                  />
                </span>
              )}
              <button
                onClick={handleClearAllFilters}
                className="text-xs text-[#d4af37] underline hover:text-white ml-2"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Product Grid Render */}
          {filteredProducts.length > 0 ? (
            <div
              className={`grid gap-6 ${
                gridColumns === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridColumns === 4
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-[#121215] rounded-3xl border border-neutral-800">
              <Sparkles className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No Garments Match Filter Criteria</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto mb-6">
                Try loosening your price bounds or clearing selected size specifications.
              </p>
              <button
                onClick={handleClearAllFilters}
                className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#c5a030]"
              >
                Clear All Refinements
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in lg:hidden">
          <div className="w-full max-w-lg bg-[#141418] border border-neutral-800 rounded-3xl p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white">Refine Wardrobe</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-neutral-400 block mb-2">Max Price</label>
              <input
                type="range"
                min="1500"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#d4af37]"
              />
              <div className="text-xs text-white font-mono mt-1">{formatPrice(maxPrice)}</div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-neutral-400 block mb-2">Sizes</label>
              <div className="grid grid-cols-5 gap-2">
                {availableSizes.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSizeToggle(s)}
                    className={`py-2 rounded-lg text-xs font-bold ${
                      selectedSizes.includes(s) ? 'bg-[#d4af37] text-black' : 'bg-neutral-900 text-neutral-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3.5 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl mt-4"
            >
              Apply Refinements ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
