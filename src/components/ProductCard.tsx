import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
  [key: string]: unknown;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const savings = Math.round(((product.price - product.dozenPrice) / product.price) * 100);

  return (
    <div className="group flex flex-col card-warm rounded-sm overflow-hidden transition-all duration-500 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F0E8]">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <div className="bg-[#D4AF37] text-[#0a0a0a] text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
              New
            </div>
          )}
          <div className="dozen-badge text-[8px] md:text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
            Save {savings}% per dozen
          </div>
        </div>

        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick Add overlay on hover (desktop) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            onClick={() => onOrder(product)}
            className="bg-[#D4AF37] text-[#0a0a0a] px-6 py-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <span className="text-[9px] md:text-[10px] text-[#B8960C] uppercase tracking-[0.15em] font-semibold mb-1 block">
          {product.category}
        </span>
        <h3 className="text-sm md:text-base text-[#111111] leading-snug mb-2 group-hover:text-[#B8960C] transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
          {product.name}
        </h3>
        
        {/* Pricing */}
        <div className="mt-auto space-y-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base md:text-lg font-bold text-[#111111]">
              {formatPrice(product.price)}
            </span>
            <span className="text-[9px] md:text-[10px] text-gray-400 font-medium uppercase tracking-wider">/ piece</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs md:text-sm font-semibold text-[#B8960C]">
              {formatPrice(product.dozenPrice)}
            </span>
            <span className="text-[9px] text-[#B8960C]/60 font-medium uppercase tracking-wider">/ dozen</span>
          </div>
        </div>
      </div>

      {/* Order Button */}
      <button 
        onClick={() => onOrder(product)}
        className="w-full bg-[#1a1a1a] text-white hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300 py-3 md:py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <ShoppingBag size={13} />
        Add to Cart
      </button>
    </div>
  );
}
