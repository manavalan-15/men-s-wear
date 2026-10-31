import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    formatPrice,
    setCurrentView
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3000;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const discountAmount = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.percent) / 100) : 0;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 250;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'GENT10' || code === 'URBAN10') {
      setAppliedCoupon({ code, percent: 10 });
      setCouponCode('');
    } else if (code === 'VIP20' || code === 'BESPOKE20') {
      setAppliedCoupon({ code, percent: 20 });
      setCouponCode('');
    } else {
      setCouponError('Invalid voucher code. Try "GENT10" or "VIP20"');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121216] border-l border-neutral-800 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="font-display-luxury text-lg font-bold text-white tracking-wider">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#18181f] px-6 py-3 border-b border-neutral-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                {amountToFreeShipping === 0 ? (
                  <span className="text-[#d4af37] font-semibold">You unlocked Complimentary Express Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-white">{formatPrice(amountToFreeShipping)}</strong> for Free Express Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-neutral-400">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#8c7322] to-[#d4af37] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-white">Your Atelier Bag is Empty</h3>
                <p className="text-xs text-neutral-400 max-w-xs mt-1">
                  Discover refined tailoring, Egyptian cotton shirts, and Italian leathers crafted for distinction.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#c5a030] transition-colors"
                >
                  Explore New Arrivals
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top rounded-xl shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                        <span className="bg-neutral-800 px-2 py-0.5 rounded text-neutral-300 font-medium">
                          Size {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-neutral-600"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          ></span>
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/50">
                      <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-white">
                        {formatPrice(item.product.discountedPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#0f0f13] border-t border-neutral-800 space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Voucher code (try GENT10 or VIP20)"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 uppercase tracking-wider focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-xl uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-[#d4af37] bg-[#d4af37]/10 p-2 rounded-lg border border-[#d4af37]/30">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> Code &ldquo;{appliedCoupon.code}&rdquo; applied ({appliedCoupon.percent}% Off)
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-neutral-400 hover:text-white text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(cartSubtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#d4af37]">
                    <span>VIP Promotion ({appliedCoupon.percent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span className="text-white font-medium">
                    {shippingFee === 0 ? <span className="text-emerald-400 font-bold">Complimentary</span> : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#d4af37]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-xl bg-[#d4af37] hover:bg-[#c5a030] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>256-Bit Encrypted Checkout &bull; Razorpay &bull; Cards &bull; UPI &bull; COD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
