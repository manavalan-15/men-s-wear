/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { HeroBanner } from './components/home/HeroBanner';
import { CategorySlider } from './components/home/CategorySlider';
import { FeaturedSection } from './components/home/FeaturedSection';
import { BrandStory } from './components/home/BrandStory';
import { CustomerReviewsSection } from './components/home/CustomerReviewsSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { ShopPage } from './components/shop/ShopPage';
import { LookbookPage } from './components/home/LookbookPage';
import { AboutPage } from './components/home/AboutPage';
import { ContactPage } from './components/home/ContactPage';
import { WishlistPage } from './components/shop/WishlistPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderTrackingPage } from './components/orders/OrderTrackingPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { SearchModal } from './components/common/SearchModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { AuthModal } from './components/common/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { Footer } from './components/common/Footer';

function MainAppContent() {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] flex flex-col font-sans-luxury selection:bg-[#d4af37]/30 selection:text-white">
      {/* Navbar rendered on all views */}
      <Navbar />

      {/* Main Content View Switcher */}
      <div className="flex-1">
        {currentView === 'home' && (
          <main>
            <HeroBanner />
            <CategorySlider />
            <FeaturedSection />
            <BrandStory />
            <CustomerReviewsSection />
            <NewsletterSection />
          </main>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'lookbook' && <LookbookPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-tracking' && <OrderTrackingPage />}
        {currentView === 'admin' && <AdminDashboard />}
      </div>

      {/* Footer on client views */}
      {currentView !== 'admin' && <Footer />}

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <ProductDetailModal />
      <SearchModal />
      <SizeGuideModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
