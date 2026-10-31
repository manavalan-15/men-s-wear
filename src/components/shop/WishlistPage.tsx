import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setCurrentView } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Collection</span>
        </button>
      </div>

      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-3 text-[#d4af37]">
          <Heart className="w-6 h-6 fill-[#d4af37]/20" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          Saved Sartorial Pieces
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
          Your Curated Wishlist ({wishlistedProducts.length})
        </h1>
        <p className="text-xs text-neutral-400 mt-2">
          Keep track of bespoke suits, selvedge denim, and cashmere layers for your upcoming fitting.
        </p>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#121215] rounded-3xl border border-neutral-800 max-w-md mx-auto">
          <Heart className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">Your Wishlist is Empty</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-6">
            Tap the heart icon on any piece while exploring our wardrobe to save it here.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#c5a030]"
          >
            Explore Wardrobe
          </button>
        </div>
      )}
    </div>
  );
};
