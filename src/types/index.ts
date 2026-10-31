export type CategoryName =
  | "Men's Shirts"
  | "T-Shirts"
  | "Jeans"
  | "Trousers"
  | "Formal Wear"
  | "Casual Wear"
  | "Jackets"
  | "Hoodies"
  | "Shorts"
  | "Accessories";

export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryName;
  originalPrice: number; // in INR
  discountedPrice: number; // in INR
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: ProductSize[];
  colors: ColorOption[];
  description: string;
  fabricDetails: string;
  fitType: string;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  onSale?: boolean;
  tag?: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g., productId + size + color)
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ColorOption;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'tailoring'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'razorpay' | 'card' | 'upi' | 'cod';
export type PaymentStatus = 'paid' | 'pending' | 'failed';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: ProductSize;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber: string;
  carrierName: string;
  createdAt: string;
  estimatedDelivery: string;
  timeline: {
    status: OrderStatus;
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar?: string;
  savedAddresses: ShippingAddress[];
}

export type AppView =
  | 'home'
  | 'shop'
  | 'collections'
  | 'lookbook'
  | 'about'
  | 'contact'
  | 'checkout'
  | 'order-tracking'
  | 'wishlist'
  | 'admin';
