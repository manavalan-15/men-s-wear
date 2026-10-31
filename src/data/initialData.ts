import { Product, Review, Order, CategoryName } from '../types';

export const CATEGORIES_DATA: { name: CategoryName; image: string; tag: string; description: string }[] = [
  {
    name: "Men's Shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    tag: "Bespoke Cut",
    description: "Pure Egyptian Giza cotton & tailored Italian collars"
  },
  {
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    tag: "Supima Luxury",
    description: "Heavyweight 280 GSM combed cotton essentials"
  },
  {
    name: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
    tag: "Selvedge Denim",
    description: "14oz Japanese raw indigo selvedge denim"
  },
  {
    name: "Trousers",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    tag: "Pleated & Tailored",
    description: "Gurkha side-adjusters & tailored wool flannels"
  },
  {
    name: "Formal Wear",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    tag: "Savile Row Inspired",
    description: "Hand-stitched tuxedos, bespoke blazers & waistcoats"
  },
  {
    name: "Casual Wear",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    tag: "Refined Leisure",
    description: "Linen overshirts, polo knits & weekend layers"
  },
  {
    name: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    tag: "Outerwear Haute",
    description: "Full-grain calfskin leather, cashmere coats & trench"
  },
  {
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    tag: "French Terry",
    description: "Structured architectural silhouettes with clean cuffs"
  },
  {
    name: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
    tag: "Riviera Tailored",
    description: "Tailored swim and linen resort shorts"
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    tag: "Accents of Distinction",
    description: "Chronograph timepieces, Italian leather belts & silk ties"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "The Mayfair Bespoke Double-Breasted Blazer",
    slug: "mayfair-double-breasted-blazer",
    category: "Formal Wear",
    originalPrice: 18999,
    discountedPrice: 14499,
    rating: 4.9,
    reviewCount: 38,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Midnight Charcoal", hex: "#1f2421" },
      { name: "Navy Royal", hex: "#0b1b3d" },
      { name: "Camel Melton", hex: "#b48b57" }
    ],
    description: "Expertly tailored from super 130s Merino virgin wool with a peak lapel and horn button detailing. Designed to sculpt an athletic masculine silhouette while allowing fluid movement.",
    fabricDetails: "100% Super 130s Merino Virgin Wool with cupro lining. Dry clean only.",
    fitType: "Tailored Slim Fit",
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    isBestSeller: true,
    tag: "Signature"
  },
  {
    id: "prod-2",
    name: "Oxford Crown Crisp Formal Shirt",
    slug: "oxford-crown-crisp-formal-shirt",
    category: "Men's Shirts",
    originalPrice: 4999,
    discountedPrice: 3499,
    rating: 4.8,
    reviewCount: 82,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Starch White", hex: "#f8f9fa" },
      { name: "Sky Azure", hex: "#b8d0eb" },
      { name: "Charcoal Slate", hex: "#2f3542" }
    ],
    description: "Engineered from long-staple Egyptian cotton with a cutaway collar and mother-of-pearl buttons. Retains crisp lines throughout 18 hours of wear.",
    fabricDetails: "100% Egyptian Giza 87 Cotton. Easy-iron finish.",
    fitType: "Modern Tailored Fit",
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    isNewArrival: true,
    tag: "Essential"
  },
  {
    id: "prod-3",
    name: "Kyoto Selvedge Raw Denim Jean",
    slug: "kyoto-selvedge-raw-denim",
    category: "Jeans",
    originalPrice: 8999,
    discountedPrice: 6999,
    rating: 4.9,
    reviewCount: 54,
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Deep Indigo", hex: "#1a2332" },
      { name: "Washed Obsidian", hex: "#1c1c1c" }
    ],
    description: "Milled on vintage shuttle looms in Okayama. 14.5oz unwashed selvedge with copper rivets and distinctive redline selvage edge that creates bespoke honeycombs with wear.",
    fabricDetails: "100% Long-Staple Japanese Cotton. Cold soak recommended.",
    fitType: "Straight Tapered",
    inStock: true,
    stockCount: 19,
    isBestSeller: true,
    tag: "Japanese Selvedge"
  },
  {
    id: "prod-4",
    name: "The Milan Pleated Gurkha Trouser",
    slug: "milan-pleated-gurkha-trouser",
    category: "Trousers",
    originalPrice: 6499,
    discountedPrice: 4899,
    rating: 4.7,
    reviewCount: 29,
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Espresso Brown", hex: "#3d2b1f" },
      { name: "Charcoal Wool", hex: "#2b2b2b" },
      { name: "Ecru Linen", hex: "#e5ded4" }
    ],
    description: "Inspired by classic military tailoring. High-rise waistband with double brass side-adjusters, double forward pleats, and generous drape through the thigh.",
    fabricDetails: "70% Wool, 30% Silk blend. Natural mechanical stretch.",
    fitType: "High-Waist Classic Relaxed",
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    tag: "High Rise"
  },
  {
    id: "prod-5",
    name: "Bespoke Full-Grain Calfskin Biker Jacket",
    slug: "bespoke-calfskin-biker-jacket",
    category: "Jackets",
    originalPrice: 28999,
    discountedPrice: 22499,
    rating: 5.0,
    reviewCount: 46,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Onyx Matte", hex: "#111111" },
      { name: "Antique Whiskey", hex: "#633c16" }
    ],
    description: "Hand-waxed Italian calfskin leather with heavy silver YKK Excella hardware. Silk quilted thermal lining for all-season luxury.",
    fabricDetails: "100% Top-Grain Italian Calfskin. Satin lining. Professional leather care.",
    fitType: "Athletic Cut",
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isBestSeller: true,
    tag: "Luxury Leather"
  },
  {
    id: "prod-6",
    name: "Heavyweight 320 GSM Supima T-Shirt",
    slug: "heavyweight-supima-tee",
    category: "T-Shirts",
    originalPrice: 2499,
    discountedPrice: 1699,
    rating: 4.8,
    reviewCount: 110,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Jet Black", hex: "#0f0f10" },
      { name: "Chalk White", hex: "#f7f7f7" },
      { name: "Sage Olive", hex: "#52634f" }
    ],
    description: "Crafted from Californian Supima cotton. Substantial 320 GSM drape that doesn't cling, with reinforced bound collar that never sags.",
    fabricDetails: "100% Extra-Long Staple Supima Cotton. Pre-shrunk.",
    fitType: "Relaxed Boxy Fit",
    inStock: true,
    stockCount: 65,
    isNewArrival: true,
    onSale: true,
    tag: "320 GSM"
  },
  {
    id: "prod-7",
    name: "Normandy French Terry Minimalist Hoodie",
    slug: "normandy-french-terry-hoodie",
    category: "Hoodies",
    originalPrice: 5999,
    discountedPrice: 4299,
    rating: 4.9,
    reviewCount: 33,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Smoked Heather Grey", hex: "#7a7a7a" },
      { name: "Obsidian Black", hex: "#141416" },
      { name: "Bone White", hex: "#e7e5df" }
    ],
    description: "Architectural 450 GSM French Terry loopback cotton. Features double-lined hood without cumbersome drawstrings for a sleek minimalist presence.",
    fabricDetails: "100% Organic Loopback Cotton. Brushed interior.",
    fitType: "Drop-Shoulder Modern Fit",
    inStock: true,
    stockCount: 22,
    isNewArrival: true,
    tag: "Clean Luxury"
  },
  {
    id: "prod-8",
    name: "Capri Riviera Tailored Linen Shirt",
    slug: "capri-riviera-tailored-linen-shirt",
    category: "Casual Wear",
    originalPrice: 4499,
    discountedPrice: 3199,
    rating: 4.7,
    reviewCount: 41,
    images: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mediterranean Sand", hex: "#d8c7b5" },
      { name: "Cobalt Wash", hex: "#284a75" },
      { name: "Pure Linen White", hex: "#fcfcfb" }
    ],
    description: "Woven in Normandy from French flax. Naturally breathable, lightweight, garment-dyed for a lived-in texture that softens gracefully with each tide.",
    fabricDetails: "100% French Flax Linen. Machine wash gentle, air dry.",
    fitType: "Comfort Classic",
    inStock: true,
    stockCount: 31,
    isFeatured: true,
    tag: "Resort Collection"
  },
  {
    id: "prod-9",
    name: "The Monte Carlo Tailored Resort Shorts",
    slug: "monte-carlo-tailored-resort-shorts",
    category: "Shorts",
    originalPrice: 3999,
    discountedPrice: 2699,
    rating: 4.6,
    reviewCount: 23,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy Yacht", hex: "#112233" },
      { name: "Khaki Savanna", hex: "#c2b280" }
    ],
    description: "6.5-inch inseam tailored shorts with zip fly, horn buttons, and internal drawstring. Transition seamlessly from yacht deck to evening terrace.",
    fabricDetails: "60% Linen, 40% Tencel blend.",
    fitType: "Tailored 6.5-inch Inseam",
    inStock: true,
    stockCount: 15,
    tag: "Riviera"
  },
  {
    id: "prod-10",
    name: "Geneva Chronograph Noir Timepiece",
    slug: "geneva-chronograph-noir-timepiece",
    category: "Accessories",
    originalPrice: 14999,
    discountedPrice: 11999,
    rating: 4.9,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["M"],
    colors: [
      { name: "Brushed Obsidian & Gold", hex: "#1a1a1a" },
      { name: "Silver Sunray", hex: "#d1d5db" }
    ],
    description: "Precision meca-quartz movement housed in 316L surgical steel with anti-reflective sapphire crystal glass and genuine Horween leather strap.",
    fabricDetails: "316L Surgical Stainless Steel, Sapphire Crystal, 5 ATM Water Resistance.",
    fitType: "40mm Case Diameter",
    inStock: true,
    stockCount: 11,
    isFeatured: true,
    isBestSeller: true,
    tag: "Limited Batch"
  },
  {
    id: "prod-11",
    name: "Handmade Tuscan Leather Chelsea Boot",
    slug: "handmade-tuscan-leather-chelsea-boot",
    category: "Accessories",
    originalPrice: 16999,
    discountedPrice: 12999,
    rating: 4.9,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Espresso Waxed Calf", hex: "#301e14" },
      { name: "Onyx Black", hex: "#111111" }
    ],
    description: "Goodyear welted construction crafted in Tuscany. Features durable Dainite studded rubber soles and supple elasticated side gussets.",
    fabricDetails: "Full-Grain Tuscan Calfskin. Goodyear Welted.",
    fitType: "True to Size",
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    tag: "Goodyear Welted"
  },
  {
    id: "prod-12",
    name: "The Kensington Wool Cashmere Overcoat",
    slug: "kensington-wool-cashmere-overcoat",
    category: "Jackets",
    originalPrice: 24999,
    discountedPrice: 19499,
    rating: 5.0,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Camel Melton", hex: "#c29b63" },
      { name: "Charcoal Herringbone", hex: "#333333" },
      { name: "Midnight Navy", hex: "#131b2e" }
    ],
    description: "A commanding outerwear investment. Double-breasted longline coat woven from a hefty wool-cashmere blend with dramatic lapels and interior ticket pockets.",
    fabricDetails: "90% Virgin Wool, 10% Cashmere. Full viscose lining.",
    fitType: "Tailored Overcoat Fit",
    inStock: true,
    stockCount: 7,
    isBestSeller: true,
    tag: "Haute Outerwear"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    userName: "Aditya Vikram Singhania",
    rating: 5,
    title: "Unmatched tailoring and drape",
    comment: "Wore the Mayfair Double-Breasted to an awards gala in Mumbai. The shoulders sit naturally, fabric breathability is sublime, and compliments did not stop. Worth every rupee.",
    date: "14 Oct 2026",
    verified: true
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userName: "Marcus Vance",
    rating: 5,
    title: "Rivalling Savile Row bespoke",
    comment: "I own suits from London and Milan, but the precision cut of this blazer blew my expectations away. The horn buttons and lapel roll are exquisite.",
    date: "28 Sep 2026",
    verified: true
  },
  {
    id: "rev-3",
    productId: "prod-2",
    userName: "Rohan Malhotra",
    rating: 5,
    title: "Best white shirt on the market",
    comment: "Keeps its crisp structure under a blazer even after a 12-hour workday and dinner. The collar stays in place without bowing.",
    date: "20 Oct 2026",
    verified: true
  },
  {
    id: "rev-4",
    productId: "prod-3",
    userName: "Devansh Nair",
    rating: 5,
    title: "True 14.5oz Japanese Selvedge",
    comment: "The redline detail on the cuff turn-up is clean. Fades are already breaking in beautifully behind the knees.",
    date: "18 Oct 2026",
    verified: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-8921",
    orderNumber: "UG-2026-8921",
    items: [
      {
        productId: "prod-1",
        name: "The Mayfair Bespoke Double-Breasted Blazer",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
        size: "L",
        color: "Midnight Charcoal",
        quantity: 1,
        price: 14499
      },
      {
        productId: "prod-2",
        name: "Oxford Crown Crisp Formal Shirt",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
        size: "L",
        color: "Starch White",
        quantity: 1,
        price: 3499
      }
    ],
    subtotal: 17998,
    discount: 1799,
    shippingFee: 0,
    tax: 1457,
    totalAmount: 17656,
    shippingAddress: {
      fullName: "Karthik Subramanian",
      phone: "+91 98401 22841",
      email: "karthik.gent@gmail.com",
      addressLine1: "Flat 4B, Regency Park Avenue, Boat Club Road",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600028",
      country: "India"
    },
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    orderStatus: "shipped",
    trackingNumber: "UG-EXPRESS-99214A",
    carrierName: "Blue Dart Express Gold",
    createdAt: "2026-10-28T14:22:00Z",
    estimatedDelivery: "2026-11-02",
    timeline: [
      {
        status: "placed",
        title: "Order Placed & Verified",
        description: "Payment confirmed via Razorpay UPI. Order assigned to master tailor.",
        timestamp: "28 Oct 2026, 02:22 PM",
        completed: true
      },
      {
        status: "confirmed",
        title: "Bespoke Inspection & Packaging",
        description: "Garments hand-inspected for stitching tension and sealed in breathable garment bag.",
        timestamp: "29 Oct 2026, 10:15 AM",
        completed: true
      },
      {
        status: "shipped",
        title: "Dispatched from Mumbai Atelier",
        description: "Air freight dispatch via Blue Dart Express Gold Priority.",
        timestamp: "30 Oct 2026, 06:40 PM",
        completed: true
      },
      {
        status: "out_for_delivery",
        title: "Out for Delivery",
        description: "Courier executive out for delivery in Chennai Central hub.",
        timestamp: "Pending",
        completed: false
      },
      {
        status: "delivered",
        title: "Delivered to Recipient",
        description: "Package received and signed by client.",
        timestamp: "Estimated 02 Nov 2026",
        completed: false
      }
    ]
  }
];
