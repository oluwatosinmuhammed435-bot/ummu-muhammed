import { ArrowRight } from 'lucide-react';

interface CategoryProps {
  name: string;
  description: string;
  image: string;
  itemCount: number;
  [key: string]: unknown;
}

export default function CategoryCard({ name, description, image, itemCount }: CategoryProps) {
  return (
    <div className="group cursor-pointer relative overflow-hidden rounded-sm">
      {/* Image */}
      <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" 
          loading="lazy"
        />
        
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f00]/90 via-[#1a0f00]/30 to-transparent" />
        
        {/* Gold corner accent */}
        <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#D4AF37]/50 group-hover:h-12 transition-all duration-500" />
          <div className="absolute top-0 left-0 h-[1px] w-8 bg-[#D4AF37]/50 group-hover:w-12 transition-all duration-500" />
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#D4AF37]/50 group-hover:h-12 transition-all duration-500" />
          <div className="absolute bottom-0 right-0 h-[1px] w-8 bg-[#D4AF37]/50 group-hover:w-12 transition-all duration-500" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col">
          <span className="text-[#D4AF37] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5 md:mb-2">
            {itemCount} Products
          </span>
          <h3 className="text-white text-sm md:text-xl leading-tight mb-1 md:mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            {name}
          </h3>
          <p className="text-gray-300/80 text-[10px] md:text-xs leading-relaxed mb-2 md:mb-3 line-clamp-2 hidden md:block">
            {description}
          </p>
          
          {/* Shop Now CTA */}
          <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] md:text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
            <span>Shop Now</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
