import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Calendar,
  FileText,
  Printer,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const {
    orders,
    activeOrderForTracking,
    setActiveOrderForTracking,
    formatPrice,
    setCurrentView
  } = useStore();

  const [searchQuery, setSearchQuery] = useState(activeOrderForTracking || '');

  // Active tracked order
  const currentOrder = orders.find(
    o =>
      o.id === (activeOrderForTracking || searchQuery) ||
      o.orderNumber.toLowerCase() === searchQuery.toLowerCase() ||
      o.trackingNumber.toLowerCase() === searchQuery.toLowerCase()
  ) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = orders.find(
      o =>
        o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase() ||
        o.trackingNumber.toLowerCase() === searchQuery.trim().toLowerCase() ||
        o.shippingAddress.email.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (match) {
      setActiveOrderForTracking(match.id);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          Concierge Services
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
          Live Order &amp; Delivery Tracking
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          Track the artisan journey of your garments from Savile Row inspection to your doorstep.
        </p>

        {/* Search Bar for Order Lookup */}
        <form onSubmit={handleSearch} className="mt-6 flex max-w-md mx-auto gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Order Number (e.g. UG-2026-8921) or Tracking #"
              className="w-full pl-10 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#c5a030] transition-colors"
          >
            Locate
          </button>
        </form>
      </div>

      {currentOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Tracking Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tracking Summary Card */}
            <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                      {currentOrder.carrierName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 uppercase">
                      {currentOrder.orderStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold font-display-luxury text-white mt-1">
                    Order {currentOrder.orderNumber}
                  </h2>
                  <div className="text-xs text-neutral-400 mt-1 flex items-center gap-3">
                    <span>AWB: <strong className="text-neutral-200">{currentOrder.trackingNumber}</strong></span>
                    <span>&bull;</span>
                    <span>Created: {new Date(currentOrder.createdAt).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>

                <button
                  onClick={handlePrintReceipt}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-[#d4af37] transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Print Invoice</span>
                </button>
              </div>

              {/* Progress Timeline */}
              <div className="py-8">
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-neutral-800">
                  {currentOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          step.completed
                            ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/30'
                            : 'bg-neutral-900 border border-neutral-700 text-neutral-500'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 fill-black text-[#d4af37]" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="flex-1 bg-neutral-900/40 border border-neutral-800/80 p-4 rounded-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="text-sm font-bold text-white tracking-wide">
                            {step.title}
                          </h4>
                          <span className="text-[11px] text-neutral-400 font-medium">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Delivery Notice */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-[#d4af37]/20 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div className="text-xs text-neutral-300">
                  <span className="font-bold text-white">Estimated Arrival: </span>
                  {new Date(currentOrder.estimatedDelivery).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  {' '}&bull; Courier will contact via SMS prior to arrival.
                </div>
              </div>
            </div>

            {/* Destination Address & Payment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                  <MapPin className="w-4 h-4" /> Shipping Destination
                </div>
                <div className="text-sm font-bold text-white">{currentOrder.shippingAddress.fullName}</div>
                <div className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {currentOrder.shippingAddress.addressLine1}
                  {currentOrder.shippingAddress.addressLine2 && `, ${currentOrder.shippingAddress.addressLine2}`}
                  <br />
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.postalCode}
                  <br />
                  {currentOrder.shippingAddress.country}
                  <br />
                  <span className="text-neutral-300 mt-1 inline-block">Tel: {currentOrder.shippingAddress.phone}</span>
                </div>
              </div>

              <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                  <ShieldCheck className="w-4 h-4" /> Payment Settlement
                </div>
                <div className="text-sm font-bold text-white capitalize">
                  Method: {currentOrder.paymentMethod.toUpperCase()}
                </div>
                <div className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Status: <strong className="text-emerald-400 capitalize">{currentOrder.paymentStatus}</strong>
                  <br />
                  Subtotal: {formatPrice(currentOrder.subtotal)}
                  <br />
                  Delivery Surcharge: {currentOrder.shippingFee === 0 ? 'Complimentary' : formatPrice(currentOrder.shippingFee)}
                  <br />
                  <span className="text-sm font-bold text-white mt-1 inline-block">
                    Total Invoiced: {formatPrice(currentOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ordered Items & All Orders (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-base font-bold font-display-luxury text-white pb-3 border-b border-neutral-800">
                Garments in Consignment ({currentOrder.items.length})
              </h3>
              <div className="py-4 space-y-4">
                {currentOrder.items.map((it, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-14 h-18 object-cover rounded-xl border border-neutral-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{it.name}</div>
                      <div className="text-[11px] text-neutral-400">
                        Size: {it.size} &bull; Qty: {it.quantity} &bull; {it.color}
                      </div>
                      <div className="text-xs font-bold text-[#d4af37] mt-0.5">
                        {formatPrice(it.price * it.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other orders switcher */}
            <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Your Order Archive ({orders.length})
              </h4>
              <div className="space-y-2">
                {orders.map(o => (
                  <div
                    key={o.id}
                    onClick={() => setActiveOrderForTracking(o.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      o.id === currentOrder.id
                        ? 'bg-neutral-850 border-[#d4af37]/60 text-white'
                        : 'bg-neutral-900/50 border-neutral-800/80 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{o.orderNumber}</div>
                      <div className="text-[10px] text-neutral-500">
                        {new Date(o.createdAt).toLocaleDateString('en-GB')} &bull; {formatPrice(o.totalAmount)}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-[#121215] rounded-3xl border border-neutral-800 max-w-lg mx-auto">
          <Package className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Order Found</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-6">
            Please verify your Order Number or explore our latest tailoring collection.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider"
          >
            Explore Shop
          </button>
        </div>
      )}
    </div>
  );
};
