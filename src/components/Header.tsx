import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Package, 
  Globe, 
  Facebook, 
  Instagram, 
  Search,
  ShoppingCart,
  Menu,
  X,
  Home,
  ShoppingBag,
  LayoutGrid,
} from 'lucide-react';

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Logo = ({ mobile = false, light = false }: { mobile?: boolean; light?: boolean }) => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="flex flex-col items-center pt-0.5 group-hover:scale-105 transition-transform duration-300">
      <svg width={mobile ? "36" : "42"} height={mobile ? "30" : "36"} viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 2C23 2 28 7 33 7H43V9H3V7H13C18 7 23 2 23 2Z" fill="#D4AF37"/>
        <text x="23" y="33" fill="#D4AF37" fontSize="28" fontFamily="serif" textAnchor="middle" fontWeight="bold">UME</text>
      </svg>
    </div>
    {!mobile && (
      <div className="flex flex-col border-l border-[#D4AF37]/30 pl-3 py-0.5">
        <span className={`font-serif text-lg md:text-xl leading-none tracking-widest mb-1 ${light ? 'text-[#D4AF37]' : 'text-[#111111]'}`}>UMMU MUHAMMAD</span>
        <span className={`text-[9px] md:text-[10px] tracking-[0.4em] uppercase leading-none ${light ? 'text-[#D4AF37]' : 'text-[#8B7332]'}`}>Enterprises</span>
      </div>
    )}
  </div>
);

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartItemCount, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300`}
    >
      {/* LAYER 1: Slim Utility Bar — dark */}
      <div className="hidden md:block bg-[#111111] text-gray-400 text-[10px] font-medium tracking-wide py-1.5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer">
              <ShieldCheck size={12} className="text-[#D4AF37]" />
              <span className="uppercase">Quality Guarantee</span>
            </div>
            <div className="w-[1px] h-2.5 bg-gray-700"></div>
            <div className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer">
              <Package size={12} className="text-[#D4AF37]" />
              <span className="uppercase">Wholesale & Retail</span>
            </div>
            <div className="w-[1px] h-2.5 bg-gray-700"></div>
            <div className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer">
              <Globe size={12} className="text-[#D4AF37]" />
              <span className="uppercase">International Shipping</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center gap-3">
              <span className="uppercase">Follow us:</span>
              <div className="flex items-center gap-2.5 text-gray-400">
                <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Facebook"><Facebook size={12} /></a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Instagram"><Instagram size={12} /></a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="TikTok"><TikTokIcon size={12} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 2: Main Navigation — Clean white */}
      <div className={`bg-white border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-gray-200 shadow-lg shadow-black/5 py-2.5' 
          : 'border-gray-100 py-4'
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Mobile Menu Toggle (Left) */}
          <button 
            className="md:hidden text-[#111111] hover:text-[#D4AF37] transition-colors p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={26} />
          </button>

          {/* Logo (Center on mobile, Left on desktop) */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <a href="#home" className="hidden md:block">
              <Logo />
            </a>
            <a href="#home" className="block md:hidden">
              <Logo mobile />
            </a>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            <a href="#home" className="text-[#111111] transition-colors text-[13px] font-semibold tracking-wide uppercase relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#D4AF37]">
              Home
            </a>
            <a href="#products" className="text-gray-500 hover:text-[#111111] transition-colors text-[13px] font-medium tracking-wide uppercase hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-all relative">
              Shop
            </a>
            <a href="#categories" className="text-gray-500 hover:text-[#111111] transition-colors text-[13px] font-medium tracking-wide uppercase hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-all relative">
              Categories
            </a>
            <a href="#wholesale" className="text-gray-500 hover:text-[#111111] transition-colors text-[13px] font-medium tracking-wide uppercase hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-all relative">
              Wholesale
            </a>
            <a href="#contact" className="text-gray-500 hover:text-[#111111] transition-colors text-[13px] font-medium tracking-wide uppercase hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] after:transition-all relative">
              Contact
            </a>
          </nav>

          {/* Actions (Right) */}
          <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0">
            {/* Desktop Search Link */}
            <a href="#products" className="hidden md:flex text-gray-400 hover:text-[#D4AF37] transition-colors p-1" aria-label="Search Products">
              <Search size={20} />
            </a>
            
            {/* Mobile Search Icon */}
            <a href="#products" className="md:hidden text-[#111111] hover:text-[#D4AF37] transition-colors p-1" aria-label="Search">
              <Search size={22} />
            </a>

            {/* Shopping Cart */}
            <button 
              onClick={onOpenCart}
              className="relative text-[#111111] hover:text-[#D4AF37] transition-colors group p-1" 
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#D4AF37] text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full leading-none px-1">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU — elegant dark overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#080808] md:hidden" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-[#D4AF37]/15">
            <Logo mobile light />
            <button 
              className="text-gray-400 hover:text-[#D4AF37] transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={26} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
            <nav className="flex flex-col space-y-6">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-[#D4AF37] text-base font-medium tracking-wide flex items-center gap-4">
                <Home size={20} className="text-[#D4AF37]" /> 
                Home
              </a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#D4AF37] transition-colors text-base font-medium tracking-wide flex items-center gap-4">
                <ShoppingBag size={20} className="text-[#D4AF37]" /> 
                Shop
              </a>
              <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#D4AF37] transition-colors text-base font-medium tracking-wide flex items-center gap-4">
                <LayoutGrid size={20} className="text-[#D4AF37]" /> 
                Categories
              </a>
              <a href="#wholesale" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#D4AF37] transition-colors text-base font-medium tracking-wide pl-[36px]">
                Wholesale
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#D4AF37] transition-colors text-base font-medium tracking-wide pl-[36px]">
                Contact
              </a>
            </nav>

            {/* Mobile Menu Footer Actions */}
            <div className="mt-auto pt-8 flex items-center justify-around pb-6 border-t border-[#D4AF37]/10">
              <a 
                href="#products" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                <Search size={20} />
                <span className="text-[10px] uppercase tracking-wider font-medium">Search</span>
              </a>
              <div className="w-[1px] h-8 bg-gray-800"></div>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                <div className="relative">
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-medium">Cart ({cartItemCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

