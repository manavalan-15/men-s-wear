import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Truck, RotateCcw, Award, Sparkles, Lock } from 'lucide-react';
import { AppView, CategoryName } from '../../types';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, toggleAdminMode, currentUser } = useStore();

  const handleLink = (view: AppView, cat?: CategoryName) => {
    if (cat) {
      setSelectedCategory(cat);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-neutral-850 text-neutral-400 text-xs">
      {/* Upper Features Strip */}
      <div className="border-b border-neutral-900 py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-bold uppercase tracking-wider text-xs">Express Delivery</div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Complimentary across India on orders above ₹3,000</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-bold uppercase tracking-wider text-xs">15-Day Exchange</div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Complimentary bespoke doorstep exchange</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-bold uppercase tracking-wider text-xs">256-Bit Encryption</div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Razorpay verified gateway with UPI &amp; Cards</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-bold uppercase tracking-wider text-xs">100% Giza &amp; Merino</div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Zero synthetic polyester blends in tailoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onClick={() => handleLink('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#8c7322] flex items-center justify-center text-black font-extrabold shadow-md">
              <span className="font-display-luxury text-base tracking-tighter">UG</span>
            </div>
            <div>
              <span className="font-display-luxury text-lg font-bold tracking-[0.2em] text-white">
                URBAN GENT
              </span>
              <div className="text-[9px] font-semibold tracking-[0.3em] text-[#d4af37] uppercase -mt-0.5">
                Bespoke Atelier
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
            Engineered for the discerning modern gentleman. Timeless Savile Row silhouette precision, European noble fabrics, and luxury craftsmanship.
          </p>

          <div className="pt-2 text-xs text-neutral-300">
            <span className="font-semibold text-white">Atelier Concierge:</span> +91 (022) 8400-GENT
            <br />
            <span className="font-semibold text-white">Flagships:</span> Mumbai &bull; London &bull; Chennai
          </div>
        </div>

        {/* Column 2: Wardrobe Collections */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
            Departments
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => handleLink('shop', "Men's Shirts")}
                className="hover:text-[#d4af37] transition-colors"
              >
                Men&apos;s Giza Shirts
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('shop', "Formal Wear")}
                className="hover:text-[#d4af37] transition-colors"
              >
                Formal Suits &amp; Blazers
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('shop', "Jeans")}
                className="hover:text-[#d4af37] transition-colors"
              >
                Okayama Selvedge Denim
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('shop', "Trousers")}
                className="hover:text-[#d4af37] transition-colors"
              >
                Gurkha &amp; Pleated Trousers
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('shop', "Jackets")}
                className="hover:text-[#d4af37] transition-colors"
              >
                Calfskin Leather &amp; Overcoats
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('shop', "Accessories")}
                className="hover:text-[#d4af37] transition-colors"
              >
                Horology &amp; Chelsea Boots
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Client Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
            Client Concierge
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => handleLink('order-tracking')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Live Order Tracking
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('lookbook')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Editorial Runway Lookbook
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('about')}
                className="hover:text-[#d4af37] transition-colors"
              >
                The Atelier Heritage
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('contact')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Book Styling Appointment
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLink('wishlist')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Saved Wardrobe Items
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Atelier Administration & Gateways */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
            Store Management
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => handleLink('admin')}
                className="flex items-center gap-1.5 text-[#d4af37] hover:underline font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Admin Portal</span>
              </button>
            </li>
            <li>
              <button
                onClick={toggleAdminMode}
                className="text-neutral-400 hover:text-white"
              >
                Role: {currentUser.role.toUpperCase()} (Click to toggle)
              </button>
            </li>
          </ul>

          <div className="pt-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Payment Integrations
            </div>
            <div className="flex flex-wrap gap-1.5 text-[9px] font-bold">
              <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                Razorpay
              </span>
              <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                UPI / QR
              </span>
              <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                Visa / MC
              </span>
              <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                Amex
              </span>
              <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                COD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-neutral-900 py-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} URBAN GENT Atelier Inc. All rights reserved. Defined by craftsmanship.
        </div>
        <div className="flex items-center gap-4">
          <span>Privacy Covenant</span>
          <span>&bull;</span>
          <span>Terms of Bespoke Fitting</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1 text-neutral-400">
            <Lock className="w-3 h-3 text-[#d4af37]" /> SSL 256-Bit Secured
          </span>
        </div>
      </div>
    </footer>
  );
};
