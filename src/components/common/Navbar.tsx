import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  ShieldCheck,
  Menu,
  X,
  Package,
  Globe,
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';
import { AppView, CategoryName } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthModalOpen,
    wishlist,
    activeCurrency,
    setActiveCurrency,
    formatPrice,
    currentUser,
    toggleAdminMode,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { label: string; view: AppView; category?: CategoryName }[] = [
    { label: 'Home', view: 'home' },
    { label: 'All Apparel', view: 'shop' },
    { label: 'Formal Wear', view: 'shop', category: 'Formal Wear' },
    { label: "Men's Shirts", view: 'shop', category: "Men's Shirts" },
    { label: 'Jackets & Coats', view: 'shop', category: 'Jackets' },
    { label: 'Selvedge Denim', view: 'shop', category: 'Jeans' },
    { label: 'Accessories', view: 'shop', category: 'Accessories' },
    { label: 'Lookbook', view: 'lookbook' },
    { label: 'About Atelier', view: 'about' }
  ];

  const handleNavClick = (view: AppView, cat?: CategoryName) => {
    if (cat) {
      setSelectedCategory(cat);
    } else if (view === 'shop') {
      setSelectedCategory('All');
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0c0e]/90 backdrop-blur-xl border-b border-neutral-800/80">
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-[#121216] border-b border-neutral-850 text-neutral-400 text-[11px] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
            <span>Complimentary Bespoke Express Delivery on all orders over ₹3,000</span>
          </div>
          <div className="sm:hidden text-center w-full uppercase tracking-wider text-[10px]">
            Complimentary Express Delivery &bull; Bespoke Tailoring
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs">
            {/* Currency switcher */}
            <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
              <Globe className="w-3 h-3 text-[#d4af37]" />
              <button
                onClick={() => setActiveCurrency(activeCurrency === 'INR' ? 'USD' : 'INR')}
                className="hover:text-white font-medium"
              >
                {activeCurrency === 'INR' ? 'INR (₹)' : 'USD ($)'}
              </button>
            </div>

            {/* Order Tracking Direct Link */}
            <button
              onClick={() => handleNavClick('order-tracking')}
              className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
            >
              <Package className="w-3 h-3" />
              <span>Track Order</span>
            </button>

            {/* Admin Switcher Shortcut */}
            <button
              onClick={toggleAdminMode}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                currentUser.role === 'admin'
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{currentUser.role === 'admin' ? 'Admin Active' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Center / Left Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#8c7322] flex items-center justify-center text-black font-extrabold shadow-lg shadow-[#d4af37]/20">
            <span className="font-display-luxury text-xl tracking-tighter">UG</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display-luxury text-xl sm:text-2xl font-bold tracking-[0.2em] text-white group-hover:text-[#d4af37] transition-colors">
              URBAN GENT
            </span>
            <span className="text-[9px] font-semibold tracking-[0.35em] text-[#d4af37] uppercase -mt-1">
              Atelier &bull; Menswear
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.slice(0, 7).map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view, link.category)}
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors relative py-1 hover:text-[#d4af37] ${
                currentView === link.view && (!link.category || link.category === 'Formal Wear')
                  ? 'text-white'
                  : 'text-neutral-400'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('lookbook')}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 hover:text-[#d4af37] transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" /> Lookbook
          </button>
        </nav>

        {/* Right Icons: Search, Wishlist, Bag, Profile */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-neutral-300 hover:text-[#d4af37] hover:bg-neutral-900 rounded-full transition-colors"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className="p-2 text-neutral-300 hover:text-[#d4af37] hover:bg-neutral-900 rounded-full transition-colors relative"
            title="Your Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#d4af37] fill-[#d4af37]/20' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 p-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-full px-3.5 transition-all text-neutral-200 hover:border-[#d4af37]/60 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 group-hover:text-[#d4af37] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold text-white">
              {formatPrice(cartSubtotal)}
            </span>
          </button>

          {/* User Account / Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-full transition-colors flex items-center gap-1"
            >
              <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
                <User className="w-4 h-4 text-[#d4af37]" />
              </div>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#141418] border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-neutral-800">
                  <div className="font-semibold text-white truncate">{currentUser.name}</div>
                  <div className="text-neutral-400 text-[11px] truncate">{currentUser.email}</div>
                  <div className="mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#d4af37]/15 text-[#d4af37] uppercase">
                    {currentUser.role === 'admin' ? 'Atelier Admin' : 'Gentleman Client'}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      handleNavClick('order-tracking');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-2"
                  >
                    <Package className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>My Orders &amp; Tracking</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('wishlist');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>My Wishlist ({wishlist.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('admin');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Store Admin Panel</span>
                  </button>

                  <div className="border-t border-neutral-800 my-1"></div>

                  <button
                    onClick={() => {
                      toggleAdminMode();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Toggle Role ({currentUser.role === 'admin' ? 'Customer' : 'Admin'})</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-neutral-400 hover:text-white hover:bg-neutral-800"
                  >
                    Switch Account / Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111114] border-b border-neutral-800 px-6 py-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.category)}
                className="text-left text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-[#d4af37] py-2 border-b border-neutral-800/60"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  handleNavClick('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-white uppercase tracking-wider"
              >
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Store Admin Panel
              </button>

              <button
                onClick={() => {
                  handleNavClick('order-tracking');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-white uppercase tracking-wider"
              >
                <Package className="w-4 h-4 text-[#d4af37]" />
                Track My Order
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
