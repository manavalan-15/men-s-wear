import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShippingAddress, PaymentMethod } from '../../types';
import {
  CreditCard,
  QrCode,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Building,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    formatPrice,
    createOrder,
    setCurrentView,
    setActiveOrderForTracking,
    currentUser,
    showToast
  } = useStore();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: currentUser.savedAddresses[0]?.fullName || currentUser.name,
    phone: currentUser.savedAddresses[0]?.phone || currentUser.phone,
    email: currentUser.savedAddresses[0]?.email || currentUser.email,
    addressLine1: currentUser.savedAddresses[0]?.addressLine1 || '',
    addressLine2: '',
    city: currentUser.savedAddresses[0]?.city || '',
    state: currentUser.savedAddresses[0]?.state || '',
    postalCode: currentUser.savedAddresses[0]?.postalCode || '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiId, setUpiId] = useState('gentleman@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('884');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);

  // Quick fill sample address
  const handleFillSample = () => {
    setShippingAddress({
      fullName: 'Vikramaditya Roy',
      phone: '+91 98200 45112',
      email: 'roy.vikram@urbangent.com',
      addressLine1: 'Penthouse 18, Imperial Towers, Altamount Road',
      addressLine2: 'Cumballa Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400026',
      country: 'India'
    });
    showToast('Atelier test address populated', 'info');
  };

  const FREE_SHIPPING_THRESHOLD = 3000;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 250;
  const grandTotal = cartSubtotal + shippingFee;

  const handlePlaceOrder = () => {
    if (!shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.postalCode) {
      showToast('Please fulfill required shipping address fields', 'warning');
      return;
    }

    if (cart.length === 0) {
      showToast('Your shopping bag is empty', 'warning');
      return;
    }

    if (paymentMethod === 'razorpay') {
      setShowRazorpayModal(true);
      return;
    }

    executeOrderCreation();
  };

  const executeOrderCreation = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        image: item.product.images[0],
        size: item.selectedSize,
        color: item.selectedColor.name,
        quantity: item.quantity,
        price: item.product.discountedPrice
      }));

      const newOrder = createOrder({
        items: orderItems,
        subtotal: cartSubtotal,
        discount: 0,
        shippingFee,
        tax: Math.round(cartSubtotal * 0.05),
        totalAmount: grandTotal,
        shippingAddress,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'placed'
      });

      setIsProcessing(false);
      setShowRazorpayModal(false);

      // Trigger Confetti celebratory blast!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ffffff', '#e5c07b', '#b48b57']
        });
      } catch (e) {
        console.warn('Confetti unavailable', e);
      }

      setActiveOrderForTracking(newOrder.id);
      setCurrentView('order-tracking');
      showToast(`Order #${newOrder.orderNumber} successfully placed!`, 'success');
    }, 1200);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Collection</span>
        </button>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          Secure Checkout
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
          Complete Your Acquisition
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          Handcrafted garments tailored to perfection and packaged in signature monogram boxes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Shipping & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Shipping Address */}
          <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-lg font-bold font-display-luxury text-white">
                  1. Delivery Destination
                </h3>
              </div>
              <button
                type="button"
                onClick={handleFillSample}
                className="text-xs text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37]/10 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Auto-fill Test Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={shippingAddress.fullName}
                  onChange={e => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  placeholder="e.g. Vikramaditya Roy"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={e => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  placeholder="client@urbangent.com"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={e => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  placeholder="+91 98200 45112"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Street Address &amp; Penthouse / Apt *
                </label>
                <input
                  type="text"
                  value={shippingAddress.addressLine1}
                  onChange={e => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  placeholder="e.g. Imperial Towers, Altamount Road"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  City *
                </label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="Mumbai"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  State / Region *
                </label>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  placeholder="Maharashtra"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Postal Code / PIN *
                </label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={e => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  placeholder="400026"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Country
                </label>
                <input
                  type="text"
                  value={shippingAddress.country}
                  disabled
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-sm text-neutral-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Gateway Selection */}
          <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-800 mb-6">
              <Lock className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-lg font-bold font-display-luxury text-white">
                2. Bespoke Payment Gateway
              </h3>
            </div>

            <div className="space-y-3">
              {/* Razorpay Option */}
              <label
                onClick={() => setPaymentMethod('razorpay')}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'bg-[#191922] border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                  className="mt-1 accent-[#d4af37]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <span>Razorpay Official Gateway</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        Instant Verification
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-sky-400">UPI / QR / Cards / NetBanking</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Direct seamless gateway integration. Supports Google Pay, PhonePe, Paytm, and all major Indian banks.
                  </p>
                </div>
              </label>

              {/* Direct UPI Option */}
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-[#191922] border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 accent-[#d4af37]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#d4af37]" />
                      <span>Direct UPI / QR Code</span>
                    </span>
                    <span className="text-xs text-neutral-400">Zero surcharge</span>
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-neutral-800 space-y-3">
                      <div className="flex gap-2">
                        {(['gpay', 'phonepe', 'paytm'] as const).map(app => (
                          <button
                            type="button"
                            key={app}
                            onClick={() => setSelectedUpiApp(app)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border transition-all ${
                              selectedUpiApp === app ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="Enter your VPA / UPI ID (e.g. mobile@upi)"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Direct Card Option */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#191922] border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 accent-[#d4af37]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#d4af37]" />
                      <span>Credit / Debit Card (Visa, Mastercard, Amex)</span>
                    </span>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-neutral-800 grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase">Valid Thru</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-[#191922] border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#d4af37]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Cash on Delivery (COD)</span>
                    <span className="text-xs text-neutral-400">Pay on Handshake</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Pay securely in cash or via handheld UPI QR upon courier arrival.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary: Order Items & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl sticky top-28">
            <h3 className="text-lg font-bold font-display-luxury text-white pb-4 border-b border-neutral-800">
              Acquisition Summary ({cart.length})
            </h3>

            {/* Item list */}
            <div className="py-4 space-y-3 max-h-72 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover object-top rounded-lg shrink-0 border border-neutral-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-white truncate">{item.product.name}</h5>
                    <div className="text-[11px] text-neutral-400">
                      Size: <strong className="text-neutral-200">{item.selectedSize}</strong> &bull; Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-white shrink-0">
                    {formatPrice(item.product.discountedPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Courier Delivery</span>
                <span className="text-white font-medium">
                  {shippingFee === 0 ? <span className="text-emerald-400 font-bold">Complimentary</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Luxury GST / Tax</span>
                <span className="text-white font-medium">{formatPrice(Math.round(cartSubtotal * 0.05))}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-neutral-800">
                <span>Grand Total</span>
                <span className="text-xl text-[#d4af37]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full mt-6 py-4 rounded-xl bg-[#d4af37] hover:bg-[#c5a030] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Atelier Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 fill-black text-[#d4af37]" />
                  <span>Confirm Acquisition &bull; {formatPrice(grandTotal)}</span>
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-neutral-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Complimentary Returns within 15 Days &bull; Bespoke Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Razorpay Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0f1118] border border-[#2b354f] rounded-2xl shadow-2xl overflow-hidden p-6">
            {/* Razorpay Brand Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#0c2340] text-[#3395ff] font-extrabold text-xs flex items-center justify-center border border-[#3395ff]/40">
                  R
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">Razorpay Checkout [TEST MODE]</div>
                  <div className="text-[10px] text-neutral-400">URBAN GENT ATELIER</div>
                </div>
              </div>
              <button
                onClick={() => setShowRazorpayModal(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="py-6 text-center">
              <div className="text-2xl font-bold text-white mb-1">{formatPrice(grandTotal)}</div>
              <div className="text-xs text-neutral-400">Order UG-2026-EXP</div>

              {/* Simulated QR Code */}
              <div className="my-5 p-4 bg-white rounded-2xl w-44 h-44 mx-auto flex flex-col items-center justify-center shadow-lg">
                <QrCode className="w-32 h-32 text-black" />
                <span className="text-[9px] font-bold text-black uppercase tracking-wider mt-1">
                  Scan to Pay via Any UPI App
                </span>
              </div>

              <div className="text-xs text-neutral-300">
                Simulating secure test payment. Click below to authorize instantly:
              </div>
            </div>

            <button
              onClick={executeOrderCreation}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-[#3395ff] hover:bg-[#257fe6] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              {isProcessing ? 'Processing Transaction...' : 'Simulate Successful Payment'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
