import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CategoryName,
  CartItem,
  ProductSize,
  ColorOption,
  Order,
  OrderStatus,
  Review,
  AppView,
  CustomerUser
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  // Navigation & Views
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedCategory: CategoryName | 'All';
  setSelectedCategory: (cat: CategoryName | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Selected Product & Modals
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (id: string, delta: number) => void;
  resetCatalog: () => void;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, rating: number, title: string, comment: string, userName: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, color: ColorOption, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Currency
  activeCurrency: 'INR' | 'USD';
  setActiveCurrency: (currency: 'INR' | 'USD') => void;
  formatPrice: (amountInINR: number) => string;

  // Orders & Tracking
  orders: Order[];
  activeOrderForTracking: string | null;
  setActiveOrderForTracking: (orderId: string | null) => void;
  createOrder: (orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline' | 'trackingNumber' | 'carrierName' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // User & Auth
  currentUser: CustomerUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CustomerUser>>;
  toggleAdminMode: () => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = 'ug_store_products_v2';
const LOCAL_STORAGE_CART = 'ug_store_cart_v2';
const LOCAL_STORAGE_WISHLIST = 'ug_store_wishlist_v2';
const LOCAL_STORAGE_ORDERS = 'ug_store_orders_v2';
const LOCAL_STORAGE_REVIEWS = 'ug_store_reviews_v2';

const DEFAULT_USER: CustomerUser = {
  id: 'usr-vip-001',
  name: 'Vikramaditya Roy',
  email: 'roy.vikram@urbangent.com',
  phone: '+91 98200 45112',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  savedAddresses: [
    {
      fullName: 'Vikramaditya Roy',
      phone: '+91 98200 45112',
      email: 'roy.vikram@urbangent.com',
      addressLine1: 'Penthouse 18, Imperial Towers, Altamount Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400026',
      country: 'India'
    }
  ]
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS);
      return stored ? JSON.parse(stored) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ORDERS);
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Views and Modals
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeCurrency, setActiveCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeOrderForTracking, setActiveOrderForTracking] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CustomerUser>(DEFAULT_USER);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Local storage synchronization
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [reviews]);

  // Toast notifier
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Pricing formatting helper
  const formatPrice = (amountInINR: number): string => {
    if (activeCurrency === 'USD') {
      const inUSD = Math.round(amountInINR / 85);
      return `$${inUSD.toLocaleString('en-US')}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  };

  // Cart operations
  const addToCart = (product: Product, size: ProductSize, color: ColorOption, quantity: number = 1) => {
    const cartItemId = `${product.id}-${size}-${color.name.replace(/\s+/g, '')}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedSize: size, selectedColor: color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Reviews
  const addReview = (
    productId: string,
    rating: number,
    title: string,
    comment: string,
    userName: string
  ) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName: userName || currentUser.name,
      rating,
      title,
      comment,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      verified: true
    };
    setReviews(prev => [newRev, ...prev]);

    // recalculate product rating
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const currentTotal = p.rating * p.reviewCount;
          const nextCount = p.reviewCount + 1;
          const nextRating = Number(((currentTotal + rating) / nextCount).toFixed(1));
          return { ...p, rating: nextRating, reviewCount: nextCount };
        }
        return p;
      })
    );
    showToast('Your gentleman review has been submitted for publication', 'success');
  };

  // Orders & Tracking
  const createOrder = (
    orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline' | 'trackingNumber' | 'carrierName' | 'estimatedDelivery'>
  ): Order => {
    const timestamp = Date.now();
    const orderNumber = `UG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `UG-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      ...orderPayload,
      id: `ord-${timestamp}`,
      orderNumber,
      trackingNumber,
      carrierName: 'Blue Dart Luxury Express Air',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeline: [
        {
          status: 'placed',
          title: 'Order Placed & Verified',
          description: `Bespoke order registered under ${orderPayload.shippingAddress.fullName}.`,
          timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          completed: true
        },
        {
          status: 'confirmed',
          title: 'Master Tailor Assigned',
          description: 'Garments queued for fine hand-pressing and artisan inspection.',
          timestamp: 'Queued',
          completed: false
        },
        {
          status: 'shipped',
          title: 'Atelier Dispatch',
          description: 'Package handed over to Blue Dart Express Gold Priority.',
          timestamp: 'Scheduled',
          completed: false
        },
        {
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Courier executive arriving at destination.',
          timestamp: 'Upcoming',
          completed: false
        },
        {
          status: 'delivered',
          title: 'Delivered',
          description: 'Delivered and authenticated signature received.',
          timestamp: 'Upcoming',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock for items ordered
    orderPayload.items.forEach(item => {
      adjustStock(item.productId, -item.quantity);
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const statusOrder: OrderStatus[] = [
            'placed',
            'confirmed',
            'tailoring',
            'shipped',
            'out_for_delivery',
            'delivered'
          ];
          const currentIndex = statusOrder.indexOf(status);

          const updatedTimeline = ord.timeline.map((step) => {
            const stepIdx = statusOrder.indexOf(step.status);
            if (stepIdx <= currentIndex && stepIdx !== -1) {
              return {
                ...step,
                completed: true,
                timestamp: step.completed
                  ? step.timestamp
                  : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
              };
            }
            return step;
          });

          return {
            ...ord,
            orderStatus: status,
            timeline: updatedTimeline
          };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} status updated to ${status.toUpperCase()}`, 'success');
  };

  // Product Admin Operations
  const addProduct = (
    data: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>
  ) => {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      slug,
      rating: 5.0,
      reviewCount: 1
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added product "${data.name}" to inventory`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product specifications updated', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const adjustStock = (id: string, delta: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextStock = Math.max(0, p.stockCount + delta);
          return {
            ...p,
            stockCount: nextStock,
            inStock: nextStock > 0
          };
        }
        return p;
      })
    );
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReviews(INITIAL_REVIEWS);
    localStorage.removeItem(LOCAL_STORAGE_PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_ORDERS);
    localStorage.removeItem(LOCAL_STORAGE_REVIEWS);
    showToast('Catalog & orders restored to pristine defaults', 'info');
  };

  const toggleAdminMode = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'admin' ? 'customer' : 'admin'
    }));
    showToast(
      currentUser.role === 'customer'
        ? 'Switched to Master Tailor / Admin Mode'
        : 'Switched to Gentleman Customer Mode',
      'info'
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        resetCatalog,
        reviews,
        addReview,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        activeCurrency,
        setActiveCurrency,
        formatPrice,
        orders,
        activeOrderForTracking,
        setActiveOrderForTracking,
        createOrder,
        updateOrderStatus,
        currentUser,
        setCurrentUser,
        toggleAdminMode,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
