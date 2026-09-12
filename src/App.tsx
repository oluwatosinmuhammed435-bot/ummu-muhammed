/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useRef } from 'react';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Toast, { ToastData } from './components/Toast';
import { CATEGORIES, PRODUCTS } from './data';
import { Product, CartItemType } from './types';
import { ShieldCheck, Package, Globe, Truck, ArrowRight, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = searchQuery.trim() === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Get unique categories for filter tabs
  const productCategories = useMemo(() => {
    const cats = [...new Set(PRODUCTS.map(p => p.category))];
    return ['All', ...cats];
  }, []);

  const handleOrder = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id && !item.isDozen);
      if (existingItem) {
        return prev.map(item => 
          item.id === existingItem.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, {
        id: `${product.id}-piece`,
        product,
        quantity: 1,
        isDozen: false
      }];
    });
    
    // Show toast notification
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      productName: product.name,
      productImage: product.image,
      timestamp: Date.now()
    }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const toggleDozen = (id: string) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isDozen: !item.isDozen, id: `${item.product.id}-${!item.isDozen ? 'dozen' : 'piece'}` };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartItemCount = cartItems.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header cartItemCount={cartItemCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow pt-[60px] md:pt-[100px]">
        {/* ============================================
            HERO SECTION — Dark premium, matching mockup
            ============================================ */}
        <section id="home" className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[85vh] flex items-center bg-[#050505] overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-bg.jpg" 
              alt="Premium modest fashion collection" 
              className="w-full h-full object-cover opacity-40 md:opacity-50" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-[#050505]/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50"></div>
          </div>
          
          {/* Hero Content — Left aligned */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-xl lg:max-w-2xl">
              {/* Logo mark */}
              <div className="mb-6 md:mb-8 flex items-center gap-4 animate-fade-in-up">
                <div className="flex flex-col items-center">
                  <svg width="50" height="42" viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                    <path d="M23 2C23 2 28 7 33 7H43V9H3V7H13C18 7 23 2 23 2Z" fill="#D4AF37"/>
                    <text x="23" y="33" fill="#D4AF37" fontSize="28" fontFamily="serif" textAnchor="middle" fontWeight="bold">UME</text>
                  </svg>
                </div>
                <div className="border-l border-[#D4AF37]/40 pl-4">
                  <h1 className="text-[#D4AF37] text-xl md:text-3xl lg:text-4xl tracking-widest leading-none mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    UMMU MUHAMMAD
                  </h1>
                  <span className="text-[#D4AF37] text-[9px] md:text-xs tracking-[0.45em] uppercase leading-none">
                    Enterprises
                  </span>
                </div>
              </div>
              
              {/* Main headline */}
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl leading-tight mb-4 animate-fade-in-up delay-100" style={{ fontFamily: "'Playfair Display', serif" }}>
                Premium Modest Fashion{' '}
                <span className="text-[#D4AF37]">&</span> Accessories
              </h2>
              
              {/* Subtitle */}
              <div className="flex items-center gap-3 text-[#D4AF37] text-xs md:text-sm tracking-wide mb-8 md:mb-10 animate-fade-in-up delay-200">
                <span>Wholesale</span>
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                <span>Retail</span>
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                <span>International Distribution</span>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in-up delay-300">
                <a 
                  href="#products"
                  className="bg-[#D4AF37] text-[#0a0a0a] hover:bg-white transition-colors duration-300 font-bold tracking-widest uppercase text-[11px] px-8 md:px-10 py-3.5 md:py-4 flex items-center justify-center gap-2"
                >
                  Shop Products
                  <ArrowRight size={14} />
                </a>
                <a 
                  href="#products"
                  className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-colors duration-300 font-bold tracking-widest uppercase text-[11px] px-8 md:px-10 py-3.5 md:py-4 flex items-center justify-center gap-2"
                >
                  Wholesale Orders
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Decorative gold line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] gold-separator"></div>
        </section>

        {/* ============================================
            TRUST INDICATORS — Warm cream
            ============================================ */}
        <section className="bg-[#FFF8F0] border-b border-[#D4AF37]/10">
          <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: ShieldCheck, title: 'Quality Guarantee', desc: 'Premium fabrics & finishing' },
                { icon: Package, title: 'Wholesale Pricing', desc: 'Save up to 15% per dozen' },
                { icon: Globe, title: 'International Shipping', desc: 'Deliver worldwide' },
                { icon: Truck, title: 'Fast Dispatch', desc: 'Orders shipped within 48hrs' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 md:p-0">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-[#111111] text-xs md:text-sm font-semibold">{item.title}</h4>
                    <p className="text-gray-500 text-[10px] md:text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            CATEGORIES SECTION — Warm cream
            ============================================ */}
        <section id="categories" className="py-10 md:py-20 bg-warm-cream">
          <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-12 gap-4">
              <div>
                <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Browse Collection</span>
                <h2 className="text-xl md:text-3xl lg:text-4xl text-[#111111]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shop by Category
                </h2>
              </div>
              <p className="text-gray-500 text-xs md:text-sm max-w-md hidden md:block">
                Explore our comprehensive catalogue of premium modest fashion — from everyday wear to special occasions.
              </p>
            </div>
            
            {/* Mobile: Horizontal scrollable categories */}
            <div className="relative md:hidden">
              <div 
                ref={categoryScrollRef}
                className="flex gap-3 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory -mx-5 px-5"
              >
                {CATEGORIES.map((category) => (
                  <div key={category.id} className="flex-shrink-0 w-[200px] snap-start">
                    <CategoryCard {...category} />
                  </div>
                ))}
              </div>
              {/* Scroll hint gradient */}
              <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-[#FFF8F0] to-transparent pointer-events-none" />
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            FEATURED PRODUCTS SECTION — Warm cream
            ============================================ */}
        <section id="products" className="py-10 md:py-20 bg-[#FFFBF5] border-t border-[#D4AF37]/8">
          <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-10">
              <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Curated Selection</span>
              <h2 className="text-xl md:text-3xl lg:text-4xl text-[#111111] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Featured Products
              </h2>
              <p className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto">
                Handpicked bestsellers available for retail and wholesale orders. All prices shown per piece — switch to dozens in cart for wholesale rates.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-6 md:mb-8">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, category..."
                  className="w-full bg-white border border-[#D4AF37]/25 rounded-full py-3 pl-11 pr-10 text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111111] transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 md:mb-8 md:flex-wrap md:justify-center -mx-5 px-5 md:mx-0 md:px-0">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-[#D4AF37] hover:text-[#B8960C]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onOrder={handleOrder} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Search size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-lg text-[#111111] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No products found</h3>
                <p className="text-gray-400 text-sm mb-4">Try a different search term or category</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="text-[#D4AF37] text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ============================================
            WHOLESALE CTA BANNER
            ============================================ */}
        <section id="wholesale" className="bg-[#0a0a0a] py-14 md:py-20 relative overflow-hidden">
          {/* Gold accent lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          
          <div className="max-w-[900px] mx-auto px-5 md:px-6 lg:px-8 text-center relative z-10">
            <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-3 block">For Wholesalers & Retailers</span>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Bulk Orders Made <span className="text-[#D4AF37]">Simple</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Order by dozens and save up to 15% per piece. Add products to your cart, select "Dozens" mode, and send your order directly via WhatsApp. We'll handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="#products"
                className="bg-[#D4AF37] text-[#0a0a0a] hover:bg-white transition-colors duration-300 font-bold tracking-widest uppercase text-[11px] px-10 py-4 flex items-center justify-center gap-2"
              >
                Start Ordering
                <ArrowRight size={14} />
              </a>
              <a 
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-colors duration-300 font-bold tracking-widest uppercase text-[11px] px-10 py-4 flex items-center justify-center gap-2"
              >
                Contact Us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer id="contact" className="bg-[#0a0a0a] text-white pt-16 md:pt-20 pb-8 md:pb-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 md:mb-16">
            <div>
              <div className="flex flex-col items-start mb-5">
                <span className="text-[#D4AF37] text-xl tracking-widest leading-none mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>UMMU MUHAMMAD</span>
                <span className="text-[#D4AF37] text-[9px] tracking-[0.45em] uppercase leading-none">Enterprises</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Premium modest fashion and accessories. Supplying quality garments for wholesale and retail customers across Nigeria and globally.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium uppercase tracking-widest text-xs mb-5">Explore</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Shop All</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">New Arrivals</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Wholesale Portal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Our Story</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium uppercase tracking-widest text-xs mb-5">Customer Care</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Shipping & Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">Size Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium uppercase tracking-widest text-xs mb-5">Stay Connected</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe for updates on new collections and wholesale offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent border border-gray-700 px-4 py-3 text-sm w-full focus:outline-none focus:border-[#D4AF37] text-white rounded-l-sm"
                />
                <button className="bg-[#D4AF37] text-[#0a0a0a] px-4 font-medium uppercase text-xs tracking-wider hover:bg-white transition-colors rounded-r-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Ummu Muhammad Enterprises. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-500 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Slide-out Cart */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        toggleDozen={toggleDozen}
        removeItem={removeItem}
      />
    </div>
  );
}
