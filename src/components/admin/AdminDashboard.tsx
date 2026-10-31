import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  BarChart3,
  Layers,
  Eye,
  X
} from 'lucide-react';
import { Product, OrderStatus, CategoryName, ProductSize } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    resetCatalog,
    orders,
    updateOrderStatus,
    formatPrice,
    setCurrentView,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form fields for new/edit product
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryName>("Men's Shirts");
  const [formOriginalPrice, setFormOriginalPrice] = useState('5999');
  const [formDiscountedPrice, setFormDiscountedPrice] = useState('4499');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80');
  const [formStock, setFormStock] = useState('25');
  const [formDescription, setFormDescription] = useState('Pure handcrafted luxury menswear tailored to perfection.');
  const [formFabric, setFormFabric] = useState('100% Giza Egyptian Cotton.');
  const [formFit, setFormFit] = useState('Tailored Slim Fit');
  const [formTag, setFormTag] = useState('New In');

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockProducts = products.filter(p => p.stockCount <= 8);
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Filter products for table
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormName('');
    setFormCategory("Men's Shirts");
    setFormOriginalPrice('5999');
    setFormDiscountedPrice('4499');
    setFormImage('https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80');
    setFormStock('20');
    setFormDescription('Pure handcrafted luxury menswear tailored to perfection.');
    setFormFabric('100% Giza Egyptian Cotton.');
    setFormFit('Tailored Slim Fit');
    setFormTag('New In');
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormOriginalPrice(String(p.originalPrice));
    setFormDiscountedPrice(String(p.discountedPrice));
    setFormImage(p.images[0] || '');
    setFormStock(String(p.stockCount));
    setFormDescription(p.description);
    setFormFabric(p.fabricDetails);
    setFormFit(p.fitType);
    setFormTag(p.tag || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Product name is required', 'warning');
      return;
    }

    const payload = {
      name: formName,
      category: formCategory,
      originalPrice: Number(formOriginalPrice) || 4999,
      discountedPrice: Number(formDiscountedPrice) || 3999,
      images: [formImage],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[],
      colors: [
        { name: 'Midnight Charcoal', hex: '#1c1c1e' },
        { name: 'Starch White', hex: '#f8f9fa' }
      ],
      description: formDescription,
      fabricDetails: formFabric,
      fitType: formFit,
      inStock: Number(formStock) > 0,
      stockCount: Number(formStock) || 0,
      tag: formTag || undefined
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }

    setIsProductModalOpen(false);
  };

  const categoriesList: CategoryName[] = [
    "Men's Shirts",
    "T-Shirts",
    "Jeans",
    "Trousers",
    "Formal Wear",
    "Casual Wear",
    "Jackets",
    "Hoodies",
    "Shorts",
    "Accessories"
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 uppercase tracking-widest">
                Atelier Headquarters
              </span>
              <span className="text-xs text-neutral-500">Live Management Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display-luxury text-white mt-1">
              URBAN GENT Store Administration
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors"
            >
              Exit to Customer Storefront
            </button>
            <button
              onClick={resetCatalog}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/50 text-xs text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1.5"
              title="Reset sample inventory to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Catalog</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#121216] border border-neutral-800/90 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
              <span className="uppercase tracking-wider font-semibold">Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{formatPrice(totalRevenue)}</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +18.4% this quarter
            </div>
          </div>

          <div className="bg-[#121216] border border-neutral-800/90 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
              <span className="uppercase tracking-wider font-semibold">Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{totalOrdersCount} Orders</div>
            <div className="text-[11px] text-neutral-400 mt-1">
              Avg Value: <strong className="text-white">{formatPrice(averageOrderValue)}</strong>
            </div>
          </div>

          <div className="bg-[#121216] border border-neutral-800/90 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
              <span className="uppercase tracking-wider font-semibold">Active Catalog</span>
              <Package className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{totalProductsCount} Styles</div>
            <div className="text-[11px] text-neutral-400 mt-1">Across 10 Categories</div>
          </div>

          <div className="bg-[#121216] border border-neutral-800/90 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
              <span className="uppercase tracking-wider font-semibold">Low Stock Watch</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300 tracking-tight">{lowStockProducts.length} Items</div>
            <div className="text-[11px] text-neutral-400 mt-1">Stock threshold &le; 8 units</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 text-xs font-semibold gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 uppercase tracking-wider rounded-t-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-neutral-850 text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Analytics &amp; Performance
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 uppercase tracking-wider rounded-t-xl transition-all ${
              activeTab === 'products'
                ? 'bg-neutral-850 text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Garments &amp; Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 uppercase tracking-wider rounded-t-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-neutral-850 text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-3 px-4 uppercase tracking-wider rounded-t-xl transition-all ${
              activeTab === 'customers'
                ? 'bg-neutral-850 text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Patrons Directory
          </button>
        </div>

        {/* Tab 1: Overview & Analytics */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Revenue Distribution */}
              <div className="bg-[#121216] border border-neutral-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
                  <h3 className="text-sm font-bold font-display-luxury text-white uppercase tracking-wider">
                    Revenue By Department
                  </h3>
                  <BarChart3 className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="space-y-4">
                  {[
                    { cat: 'Formal Wear (Bespoke Blazers & Tuxedos)', percentage: 42, revenue: 84900 },
                    { cat: "Men's Shirts (Egyptian Cotton)", percentage: 24, revenue: 48500 },
                    { cat: 'Outerwear (Italian Calfskin & Coats)', percentage: 18, revenue: 36400 },
                    { cat: 'Jeans & Trousers (Selvedge & Gurkha)', percentage: 11, revenue: 22200 },
                    { cat: 'Accessories & Horology', percentage: 5, revenue: 10100 }
                  ].map(item => (
                    <div key={item.cat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300 font-medium">{item.cat}</span>
                        <span className="text-white font-bold">{formatPrice(item.revenue)} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#a38029] to-[#d4af37] h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atelier Operations & Stock Urgency */}
              <div className="bg-[#121216] border border-neutral-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
                  <h3 className="text-sm font-bold font-display-luxury text-white uppercase tracking-wider">
                    Inventory Replenishment Alerts
                  </h3>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-3">
                  {lowStockProducts.map(p => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-neutral-800"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-12 object-cover rounded-lg border border-neutral-850"
                        />
                        <div>
                          <div className="text-xs font-bold text-white truncate max-w-xs">{p.name}</div>
                          <div className="text-[10px] text-neutral-400">{p.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {p.stockCount} left
                        </span>
                        <div className="mt-1">
                          <button
                            onClick={() => adjustStock(p.id, 10)}
                            className="text-[10px] text-[#d4af37] hover:underline font-semibold"
                          >
                            + Restock 10
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products & Inventory Management */}
        {activeTab === 'products' && (
          <div className="bg-[#121216] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-6">
            {/* Top Toolbar: Search, Category Filter, and Add Product button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative min-w-[240px] flex-1">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    placeholder="Search by title or category..."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={e => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-300 focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="All">All Categories</option>
                  {categoriesList.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#c5a030] text-black text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Garment</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-800">
                  <tr>
                    <th className="py-3.5 px-4">Garment</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4">Sizes</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                  {filteredProducts.map(prod => (
                    <tr key={prod.id} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-14 object-cover rounded-lg border border-neutral-800"
                          />
                          <div>
                            <div className="font-bold text-white text-sm">{prod.name}</div>
                            {prod.tag && (
                              <span className="text-[9px] bg-[#d4af37]/15 text-[#d4af37] px-1.5 py-0.5 rounded uppercase font-semibold">
                                {prod.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">{prod.category}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{formatPrice(prod.discountedPrice)}</div>
                        <div className="text-[10px] text-neutral-500 line-through">
                          {formatPrice(prod.originalPrice)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adjustStock(prod.id, -1)}
                            className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-xs ${
                              prod.stockCount <= 5 ? 'bg-red-500/20 text-red-300' : 'text-neutral-200'
                            }`}
                          >
                            {prod.stockCount}
                          </span>
                          <button
                            onClick={() => adjustStock(prod.id, 1)}
                            className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1 flex-wrap">
                          {prod.sizes.map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-neutral-300 hover:text-[#d4af37] transition-colors"
                            title="Edit specs"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 rounded-lg bg-neutral-850 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition-colors"
                            title="Delete garment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-[#121216] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h3 className="text-base font-bold font-display-luxury text-white">
                  Consignments &amp; Orders Pipeline
                </h3>
                <p className="text-xs text-neutral-400">
                  Updating status here updates customer live order tracking in real-time.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-800">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Patron</th>
                    <th className="py-3.5 px-4">Garments</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4">Dispatch Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                  {orders.map(ord => (
                    <tr key={ord.id} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{ord.orderNumber}</div>
                        <div className="text-[10px] text-neutral-500">
                          {new Date(ord.createdAt).toLocaleDateString('en-GB')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{ord.shippingAddress.fullName}</div>
                        <div className="text-[10px] text-neutral-400">{ord.shippingAddress.city}, {ord.shippingAddress.state}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-neutral-300">
                          {ord.items.map(it => `${it.quantity}x ${it.name} (${it.size})`).join(', ')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {formatPrice(ord.totalAmount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="uppercase text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {ord.paymentMethod} &bull; {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={ord.orderStatus}
                          onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="placed">Placed</option>
                          <option value="confirmed">Confirmed / Tailoring</option>
                          <option value="shipped">Dispatched / Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Patrons / Customer Directory */}
        {activeTab === 'customers' && (
          <div className="bg-[#121216] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold font-display-luxury text-white pb-3 border-b border-neutral-800">
              Gentlemen Patrons Directory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'Vikramaditya Roy',
                  email: 'roy.vikram@urbangent.com',
                  location: 'Altamount Road, Mumbai',
                  spend: 48998,
                  tier: 'Black Card Bespoke'
                },
                {
                  name: 'Karthik Subramanian',
                  email: 'karthik.gent@gmail.com',
                  location: 'Boat Club Road, Chennai',
                  spend: 17656,
                  tier: 'Gold Patron'
                },
                {
                  name: 'Marcus Vance',
                  email: 'marcus.vance@atelier.co.uk',
                  location: 'Mayfair, London',
                  spend: 64200,
                  tier: 'VIP Sovereign'
                }
              ].map(cust => (
                <div key={cust.email} className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{cust.name}</div>
                    <div className="text-xs text-neutral-400">{cust.email}</div>
                    <div className="text-[11px] text-neutral-500 mt-1">{cust.location}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded uppercase">
                      {cust.tier}
                    </span>
                    <div className="text-xs font-bold text-white mt-1">Total: {formatPrice(cust.spend)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#131317] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <h3 className="text-lg font-bold font-display-luxury text-white">
                {editingProductId ? 'Edit Garment Specifications' : 'Introduce New Garment to Collection'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. The Venetian Cashmere Turtleneck"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as CategoryName)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  >
                    {categoriesList.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={formTag}
                    onChange={e => setFormTag(e.target.value)}
                    placeholder="Signature, Selvedge, Limited..."
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={e => setFormOriginalPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                    Discounted Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formDiscountedPrice}
                    onChange={e => setFormDiscountedPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={e => setFormStock(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                    Fabric &amp; Care
                  </label>
                  <input
                    type="text"
                    value={formFabric}
                    onChange={e => setFormFabric(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                    Fit Type
                  </label>
                  <input
                    type="text"
                    value={formFit}
                    onChange={e => setFormFit(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#c5a030]"
                >
                  {editingProductId ? 'Save Changes' : 'Publish Garment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
