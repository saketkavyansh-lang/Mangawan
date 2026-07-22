/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Order, Category, FilterState } from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { INITIAL_CATEGORIES } from './data/initialCategories';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ContactSection } from './components/ContactSection';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SlidersHorizontal, ArrowUpDown, Filter, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { getWhatsAppUrl, SHOP_NAME, SHOP_PHONE } from './utils/whatsapp';

export default function App() {
  // 1. Persistent Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mbg_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('mbg_products', JSON.stringify(products));
  }, [products]);

  // Categories
  const categories = INITIAL_CATEGORIES;

  // 2. Persistent Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mbg_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mbg_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Persistent Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mbg_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mbg_orders', JSON.stringify(orders));
  }, [orders]);

  // 4. Filters & Controls
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(5000);

  // 5. UI Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Filtered & Sorted Products List
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          if (!matchesTitle && !matchesCat && !matchesDesc) return false;
        }
        // Max Price Filter
        if (p.price > maxPriceFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0); // default 'featured'
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPriceFilter]);

  // Cart Functions
  const handleAddToCart = (product: Product, size?: string, color?: string, qty: number = 1) => {
    const selectedSize = size || product.sizes[0] || 'M';
    const selectedColor = color || product.colors[0] || 'Standard';
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedSize, selectedColor, quantity: qty }];
    });
  };

  const handleBuyNow = (product: Product, size?: string, color?: string, qty: number = 1) => {
    handleAddToCart(product, size, color, qty);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Order Functions
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // Clear cart
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
  };

  // Admin Functions
  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newId = `mbg-${Date.now().toString().slice(-4)}`;
    const fullProduct: Product = { ...newProductData, id: newId };
    setProducts((prev) => [fullProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product from shop catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col antialiased selection:bg-amber-500 selection:text-white">
      
      {/* Header */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Banner Section */}
        <HeroSection
          onExploreClick={() => {
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 12 Product Categories Grid */}
        <CategoryGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(catName) => {
            setSelectedCategory(catName);
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Main Catalog Section */}
        <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Controls & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm mb-8">
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                <span>Filter:</span>
              </span>

              {/* Category Pills */}
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Items ({products.length})
              </button>

              <span className="text-xs font-semibold text-stone-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                Category: <b>{selectedCategory}</b>
              </span>
            </div>

            {/* Sorting & Price Range Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium hidden sm:inline">Max Price:</span>
                <input
                  type="range"
                  min={300}
                  max={5000}
                  step={100}
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-amber-600 cursor-pointer"
                />
                <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  ₹{maxPriceFilter}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
                  className="bg-stone-100 border border-stone-200 rounded-xl px-2.5 py-1.5 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

            </div>

          </div>

          {/* Active Results Summary */}
          <div className="flex justify-between items-center mb-6 text-xs text-stone-500">
            <p>
              Showing <b className="text-stone-900">{filteredProducts.length}</b> garments in{' '}
              <b className="text-amber-800">{selectedCategory}</b>
            </p>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-amber-700 font-bold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3 max-w-md mx-auto my-8">
              <Sparkles className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="text-base font-bold text-stone-900">No clothing items match your search</h3>
              <p className="text-xs text-stone-500">
                Try searching for another category or resetting your price filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setMaxPriceFilter(5000);
                }}
                className="mt-2 px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-amber-700"
              >
                View Full Clothing Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={(p, sz, clr) => handleAddToCart(p, sz, clr)}
                  onBuyNow={(p, sz, clr) => handleBuyNow(p, sz, clr)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Contact Section with Address & Direct WhatsApp */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer
        categories={categories}
        onSelectCategory={(catName) => {
          setSelectedCategory(catName);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* MODALS & DRAWERS */}
      
      {/* 1. Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, sz, clr, qty) => handleAddToCart(p, sz, clr, qty)}
        onBuyNow={(p, sz, clr, qty) => handleBuyNow(p, sz, clr, qty)}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 3. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* 4. Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onTrackOrder={(orderId) => {
          setTrackingOrderId(orderId);
          setIsTrackingOpen(true);
        }}
      />

      {/* 5. Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        initialOrderId={trackingOrderId}
      />

      {/* 6. Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        categories={categories}
        orders={orders}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

    </div>
  );
}
