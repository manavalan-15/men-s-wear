import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductSize, ColorOption } from '../../types';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  MessageSquarePlus,
  Check
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    setIsSizeGuideOpen,
    setCurrentView,
    setIsCartOpen,
    reviews,
    addReview
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping' | 'reviews'>('details');

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  if (!selectedProduct) return null;

  // Initialize selected size and color if not yet set
  const currentSize = selectedSize || selectedProduct.sizes[0];
  const currentColor = selectedColor || selectedProduct.colors[0];

  const discountPercent = Math.round(
    ((selectedProduct.originalPrice - selectedProduct.discountedPrice) / selectedProduct.originalPrice) * 100
  );

  const productReviews = reviews.filter(r => r.productId === selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentSize, currentColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, currentSize, currentColor, quantity);
    setSelectedProduct(null);
    setCurrentView('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;
    addReview(selectedProduct.id, newRating, reviewTitle, reviewComment, reviewName || 'Valued Gentleman');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#121215] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Top bar with close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-neutral-700/60 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 bg-[#0d0d10] p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full max-h-[500px] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800/80 group">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {selectedProduct.tag && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/80 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-md">
                  {selectedProduct.tag}
                </div>
              )}
            </div>

            {/* Thumbnails row */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/20 scale-102' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Actions (5 cols on lg) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= Math.round(selectedProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-xs text-white">{selectedProduct.rating}</span>
                  <span className="text-neutral-500 text-[11px]">({selectedProduct.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white tracking-wide leading-tight">
                {selectedProduct.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3 pb-4 border-b border-neutral-800">
                <span className="text-2xl font-extrabold text-white">
                  {formatPrice(selectedProduct.discountedPrice)}
                </span>
                {selectedProduct.originalPrice > selectedProduct.discountedPrice && (
                  <>
                    <span className="text-sm text-neutral-500 line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
                <span className="text-[11px] text-neutral-500 ml-auto">Inclusive of all luxury duties</span>
              </div>

              {/* Color Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400 uppercase tracking-wider font-semibold">
                    Color: <span className="text-white font-normal">{currentColor.name}</span>
                  </span>
                </div>
                <div className="flex gap-2.5">
                  {selectedProduct.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        currentColor.name === col.name ? 'ring-2 ring-offset-2 ring-offset-[#121215] ring-[#d4af37] scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {currentColor.name === col.name && (
                        <Check className="w-4 h-4 text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400 uppercase tracking-wider font-semibold">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[#d4af37] hover:underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                        currentSize === size
                          ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Stock */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5">
                  <span className="text-xs text-neutral-400 uppercase font-semibold">Qty:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white px-1">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stockCount || 10, quantity + 1))}
                    className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs">
                  {selectedProduct.stockCount > 0 ? (
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      In Stock Atelier ({selectedProduct.stockCount} available)
                    </span>
                  ) : (
                    <span className="text-red-400">Made to order (Waitlist)</span>
                  )}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-[#d4af37] text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
                  <span>Add To Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#d4af37] hover:bg-[#c5a030] text-black text-xs font-extrabold uppercase tracking-widest transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Instant Buy Now</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-center ${
                    isWishlisted(selectedProduct.id)
                      ? 'bg-[#d4af37] text-black border-[#d4af37]'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-[#d4af37]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted(selectedProduct.id) ? 'fill-black' : ''}`} />
                </button>
              </div>

              {/* Tabs: Details, Fabric, Shipping, Reviews */}
              <div className="mt-8 border-t border-neutral-800 pt-5">
                <div className="flex border-b border-neutral-800 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider relative ${
                      activeTab === 'details' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Cut &amp; Silhouette
                  </button>
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider relative ${
                      activeTab === 'fabric' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Fabric &amp; Care
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider relative ${
                      activeTab === 'shipping' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 px-3 transition-colors uppercase tracking-wider relative ${
                      activeTab === 'reviews' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Reviews ({productReviews.length})
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="py-4 text-xs text-neutral-300 leading-relaxed min-h-[120px]">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{selectedProduct.description}</p>
                      <div className="pt-2 text-[11px] text-neutral-400">
                        <span className="font-semibold text-neutral-200">Fit Specification: </span>
                        {selectedProduct.fitType}
                      </div>
                    </div>
                  )}

                  {activeTab === 'fabric' && (
                    <div className="space-y-2">
                      <p className="font-medium text-white">{selectedProduct.fabricDetails}</p>
                      <p className="text-neutral-400">
                        Milled with responsibly farmed natural fibers. Retains hand-feel and form through repeated garment-cleansing cycles.
                      </p>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-white">
                        <Truck className="w-4 h-4 text-[#d4af37]" />
                        <span>White-Glove Express Delivery across India &amp; Worldwide (2-4 Days)</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <RotateCcw className="w-4 h-4 text-[#d4af37]" />
                        <span>15-Day Complimentary Atelier Exchange with door pickup</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                        <span>100% Authenticated Luxury Certified Guarantee</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                        <span className="font-bold text-white text-sm">Gentlemen Reviews</span>
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="flex items-center gap-1.5 text-xs text-[#d4af37] hover:underline"
                        >
                          <MessageSquarePlus className="w-3.5 h-3.5" />
                          <span>Write Review</span>
                        </button>
                      </div>

                      {showReviewForm && (
                        <form onSubmit={handleReviewSubmit} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-neutral-400">Your Rating:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(s => (
                                <button
                                  type="button"
                                  key={s}
                                  onClick={() => setNewRating(s)}
                                  className="p-0.5"
                                >
                                  <Star className={`w-4 h-4 ${s <= newRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'}`} />
                                </button>
                              ))}
                            </div>
                          </div>

                          <input
                            type="text"
                            value={reviewName}
                            onChange={e => setReviewName(e.target.value)}
                            placeholder="Your Name (e.g. Karthik S.)"
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                          />

                          <input
                            type="text"
                            value={reviewTitle}
                            onChange={e => setReviewTitle(e.target.value)}
                            placeholder="Review Title (e.g. Masterful fit)"
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                            required
                          />

                          <textarea
                            value={reviewComment}
                            onChange={e => setReviewComment(e.target.value)}
                            placeholder="Describe the fabric, shoulder fit, comfort, and compliments received..."
                            rows={3}
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                            required
                          />

                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setShowReviewForm(false)}
                              className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#d4af37] text-black hover:bg-[#c5a030]"
                            >
                              Post Review
                            </button>
                          </div>
                        </form>
                      )}

                      {productReviews.length > 0 ? (
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                          {productReviews.map(r => (
                            <div key={r.id} className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-white">{r.userName}</span>
                                <span className="text-[10px] text-neutral-500">{r.date}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'}`}
                                  />
                                ))}
                                <span className="text-[10px] text-[#d4af37] font-semibold ml-2">Verified Patron</span>
                              </div>
                              <div className="text-xs font-medium text-neutral-200">{r.title}</div>
                              <p className="text-[11px] text-neutral-400 mt-1">{r.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-neutral-500 text-center py-4">Be the first gentleman to review this piece.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
