import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice
  } = useStore();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedQuickSize, setSelectedQuickSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedQuickSize, product.colors[0], 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setCurrentImgIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImgIndex(0);
      }}
      className="group relative flex flex-col bg-[#121215] border border-neutral-850 hover:border-[#d4af37]/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#18181d]">
        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.tag && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-md">
              {product.tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8a1c1c] text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all z-10 ${
            wishlisted
              ? 'bg-[#d4af37] text-black border-[#d4af37]'
              : 'bg-black/50 text-white border-white/20 hover:bg-black hover:text-[#d4af37]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Low Stock Indicator */}
        {product.stockCount <= 8 && product.stockCount > 0 && (
          <div className="absolute bottom-3 left-3 z-10 text-[10px] font-semibold text-amber-300 bg-black/80 px-2 py-0.5 rounded border border-amber-500/30">
            Only {product.stockCount} left
          </div>
        )}

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <button
            onClick={e => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full py-2.5 bg-black/90 hover:bg-[#d4af37] hover:text-black text-white text-xs font-bold uppercase tracking-widest rounded-xl border border-neutral-700/60 backdrop-blur-md transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine Tailoring</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-neutral-500">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-[#d4af37] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-1 mt-1 font-light">
            {product.description}
          </p>
        </div>

        {/* Pricing & Quick Add */}
        <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-white tracking-tight">
              {formatPrice(product.discountedPrice)}
            </div>
            {product.originalPrice > product.discountedPrice && (
              <div className="text-[11px] text-neutral-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black text-neutral-200 transition-all"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
