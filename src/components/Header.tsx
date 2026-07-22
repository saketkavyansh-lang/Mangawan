import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Menu, 
  X, 
  User, 
  SlidersHorizontal,
  Layers,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Product, Category } from '../types';
import { getWhatsAppUrl, SHOP_NAME, SHOP_PHONE, SHOP_ADDRESS } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Category[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracking,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  products,
  onSelectProduct
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Search autocomplete results
  const searchResults = searchQuery.trim().length > 1 
    ? products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-amber-100 shadow-sm">
      {/* Top Bar - Store Notice & Quick Direct Contact */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-red-800 text-amber-50 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1 font-semibold text-amber-200">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              {SHOP_NAME} • Mangawan, Rewa (M.P.)
            </span>
            <span className="hidden md:inline text-amber-300/50">|</span>
            <span className="hidden md:flex items-center gap-1 text-amber-100">
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Shipping over ₹999 & Cash on Delivery Available!
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${SHOP_PHONE.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 font-medium hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{SHOP_PHONE}</span>
            </a>

            {/* Direct Header WhatsApp button */}
            <a
              href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I have a quick question about your shop.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1 transition-all hover:scale-105 shadow-sm"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedCategory('All')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-red-700 flex items-center justify-center text-white shadow-md shadow-amber-900/10 font-black text-xl border border-amber-400/30">
              माँ
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-1.5 font-serif">
                <span>{SHOP_NAME}</span>
                <Sparkles className="w-4 h-4 text-amber-600 hidden sm:inline" />
              </div>
              <p className="text-[11px] font-medium text-amber-800 tracking-wide uppercase">
                Mangawan, Rewa • Premium Garments
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Men's, Women's, Sarees, Kurtis, T-shirts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600 bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-12 bg-white border border-stone-200 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-stone-100">
                <div className="px-4 py-2 bg-amber-50/50 text-xs font-semibold text-amber-900">
                  Matching Products ({searchResults.length})
                </div>
                {searchResults.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      setSearchQuery('');
                    }}
                    className="p-3 hover:bg-stone-50 flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <img 
                      src={prod.images[0]} 
                      alt={prod.title} 
                      className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-stone-900 truncate">{prod.title}</p>
                      <p className="text-[11px] text-stone-500">{prod.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-amber-700">₹{prod.price}</p>
                      <p className="text-[10px] text-stone-400 line-through">₹{prod.originalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Links & Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Category Dropdown Toggle - Desktop */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-amber-800 bg-stone-100 hover:bg-amber-50 rounded-lg flex items-center gap-1.5 transition-colors border border-stone-200/60"
              >
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>Categories</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isCategoryDropdownOpen && (
                <div 
                  className="absolute right-0 top-11 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 grid grid-cols-1 gap-0.5 max-h-96 overflow-y-auto"
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                >
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`px-4 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-amber-50 transition-colors ${selectedCategory === 'All' ? 'bg-amber-100/60 font-bold text-amber-900' : 'text-stone-700'}`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">All</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`px-4 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-amber-50 transition-colors ${selectedCategory === cat.name ? 'bg-amber-100/60 font-bold text-amber-900' : 'text-stone-700'}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-amber-700/70 font-semibold">{cat.itemCount} items</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Track Order */}
            <button
              onClick={onOpenTracking}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-amber-800 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <Truck className="w-4 h-4 text-stone-500" />
              <span>Track Order</span>
            </button>

            {/* Admin Dashboard Switch */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-2 rounded-lg transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span>Shop Admin</span>
            </button>

            {/* Header WhatsApp Button */}
            <a
              href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I am browsing your online catalog.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current text-white" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-stone-900 hover:bg-amber-700 text-white p-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search clothing, sarees, kurtis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Navigation</span>
            <span className="text-xs text-amber-800 font-semibold">{SHOP_PHONE}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-xs font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-200"
            >
              🛍️ All Products
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-xs font-semibold rounded-lg bg-stone-100 text-stone-800"
            >
              🚚 Track Order
            </button>
          </div>

          <div className="pt-2">
            <p className="text-xs font-bold text-stone-500 uppercase mb-2">Shop Categories</p>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-2.5 py-1.5 rounded text-xs font-medium ${
                    selectedCategory === cat.name ? 'bg-amber-600 text-white' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-2">
            {/* Mobile WhatsApp Button */}
            <a
              href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I want to inquire about clothes at your Mangawan shop.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Direct Chat on WhatsApp (+91 88394 48447)</span>
            </a>

            <button
              onClick={() => {
                onOpenAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Owner Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
