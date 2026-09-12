import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, FileText } from 'lucide-react';
import { CartItemType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  updateQuantity: (id: string, delta: number) => void;
  toggleDozen: (id: string) => void;
  removeItem: (id: string) => void;
}

// WhatsApp icon component
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  toggleDozen,
  removeItem
}: CartDrawerProps) {
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.isDozen ? item.product.dozenPrice * 12 : item.product.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.isDozen) {
        const fullPrice = item.product.price * 12 * item.quantity;
        const dozenPrice = item.product.dozenPrice * 12 * item.quantity;
        return total + (fullPrice - dozenPrice);
      }
      return total;
    }, 0);
  };

  const totalItems = cartItems.reduce((total, item) => {
    return total + (item.isDozen ? item.quantity * 12 : item.quantity);
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generateWhatsAppMessage = () => {
    let message = `🛍️ *NEW ORDER — Ummu Muhammad Enterprises*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━\n`;
    
    cartItems.forEach((item, index) => {
      const unitLabel = item.isDozen ? 'dozen(s)' : 'piece(s)';
      const unitPrice = item.isDozen ? item.product.dozenPrice : item.product.price;
      const lineTotal = (item.isDozen ? item.product.dozenPrice * 12 : item.product.price) * item.quantity;
      
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   ${item.quantity} ${unitLabel} × ${formatCurrency(unitPrice)}/pc\n`;
      message += `   Subtotal: ${formatCurrency(lineTotal)}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 Total Items: ${totalItems} pieces\n`;
    
    const savings = calculateSavings();
    if (savings > 0) {
      message += `💰 Wholesale Savings: ${formatCurrency(savings)}\n`;
    }
    
    message += `💵 *Grand Total: ${formatCurrency(calculateTotal())}*\n\n`;
    message += `Please confirm availability and delivery details. Thank you! 🙏`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = '2348000000000';
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleRequestInvoice = () => {
    // For now, also sends via WhatsApp with invoice request
    const phoneNumber = '2348000000000';
    let message = generateWhatsAppMessage();
    message += encodeURIComponent('\n\n📄 *I would also like a formal invoice/proforma for this order.*');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-[#FFFBF5] z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-800 bg-[#0a0a0a] text-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#1a1a1a] p-2 rounded-full border border-[#D4AF37]/30">
              <ShoppingBag className="text-[#D4AF37]" size={18} />
            </div>
            <div>
              <h2 className="text-lg tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>Your Cart</h2>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">{totalItems} item{totalItems !== 1 ? 's' : ''} total</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-[#D4AF37] hover:rotate-90 transition-all duration-300">
            <X size={22} />
          </button>
        </div>

        {/* Wholesale Tip Banner */}
        {cartItems.length > 0 && (
          <div className="bg-[#FFF3D6] px-5 py-3 border-b border-[#D4AF37]/20 flex items-start gap-3">
            <span className="text-lg leading-none mt-0.5">💡</span>
            <p className="text-[11px] text-[#8B6914] leading-relaxed">
              <span className="font-bold">Wholesale Tip:</span> Switch to "Dozens" to save up to 15% per piece. Minimum wholesale order is ₦100,000.
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 no-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-5">
              <div className="w-20 h-20 rounded-full bg-[#FFF3E0] flex items-center justify-center border-2 border-dashed border-[#D4AF37]/30">
                <ShoppingBag size={36} className="text-[#D4AF37]/50" />
              </div>
              <div className="text-center">
                <h3 className="text-lg text-[#111111] mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>Your cart is empty</h3>
                <p className="text-sm text-gray-400">Browse our collections and start ordering.</p>
              </div>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-colors duration-300 rounded-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex gap-3 bg-white p-3 md:p-4 rounded-sm border border-[#D4AF37]/10 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Product Image */}
                  <div className="w-[70px] h-[85px] md:w-20 md:h-24 bg-[#F5F0E8] flex-shrink-0 relative overflow-hidden rounded-sm">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm text-[#111111] leading-tight pr-2 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.product.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-0.5"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    {/* Price per unit */}
                    <div className="text-xs mb-2">
                      <span className="font-semibold text-[#B8960C]">
                        {formatCurrency(item.isDozen ? item.product.dozenPrice : item.product.price)}
                      </span>
                      <span className="text-gray-400 text-[9px] uppercase tracking-wider ml-1">/ piece</span>
                      {item.isDozen && (
                        <span className="ml-2 text-[9px] bg-[#FFF3D6] text-[#8B6914] px-1.5 py-0.5 rounded font-semibold uppercase">
                          Dozen Rate
                        </span>
                      )}
                    </div>

                    {/* Controls Row */}
                    <div className="mt-auto flex items-center justify-between gap-2 flex-wrap">
                      {/* Quantity Control */}
                      <div className="flex items-center border border-gray-200 bg-white rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1.5 text-gray-400 hover:text-[#D4AF37] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold min-w-[28px] text-center text-[#111111]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1.5 text-gray-400 hover:text-[#D4AF37] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Dozen / Piece Toggle */}
                      <div className="flex bg-[#FFF8F0] p-0.5 rounded-sm border border-[#D4AF37]/15">
                        <button 
                          onClick={() => item.isDozen && toggleDozen(item.id)}
                          className={`px-2.5 py-1 text-[8px] md:text-[9px] uppercase tracking-wider font-bold rounded-sm transition-all duration-300 ${
                            !item.isDozen ? 'bg-[#1a1a1a] text-white shadow-sm' : 'text-gray-500 hover:text-[#111111]'
                          }`}
                        >
                          Pieces
                        </button>
                        <button 
                          onClick={() => !item.isDozen && toggleDozen(item.id)}
                          className={`px-2.5 py-1 text-[8px] md:text-[9px] uppercase tracking-wider font-bold rounded-sm transition-all duration-300 ${
                            item.isDozen ? 'bg-[#D4AF37] text-[#0a0a0a] shadow-sm' : 'text-gray-500 hover:text-[#111111]'
                          }`}
                        >
                          Dozens
                        </button>
                      </div>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="mt-2 pt-2 border-t border-[#D4AF37]/10 flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-medium">
                        {item.isDozen ? `${item.quantity} doz × 12 = ${item.quantity * 12} pcs` : `${item.quantity} piece${item.quantity > 1 ? 's' : ''}`}
                      </span>
                      <span className="text-[#111111] font-bold">
                        {formatCurrency((item.isDozen ? item.product.dozenPrice * 12 : item.product.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t border-[#D4AF37]/15 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
            <div className="p-4 md:p-5">
              {/* Savings callout */}
              {calculateSavings() > 0 && (
                <div className="bg-[#F0FFF4] border border-green-200 rounded-sm px-4 py-2.5 mb-3 flex items-center gap-2">
                  <span className="text-green-600 text-sm">🎉</span>
                  <span className="text-green-700 text-xs font-semibold">
                    You're saving {formatCurrency(calculateSavings())} with wholesale pricing!
                  </span>
                </div>
              )}

              {/* Summary */}
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-gray-400 text-xs">Subtotal ({totalItems} items)</span>
                <span className="text-sm text-[#111111]" style={{ fontFamily: "'Playfair Display', serif" }}>{formatCurrency(calculateTotal())}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#D4AF37]/10">
                <span className="text-gray-400 text-xs">Shipping</span>
                <span className="text-xs text-[#B8960C] font-medium italic">Calculated on checkout</span>
              </div>
              
              <div className="flex justify-between items-end mb-5">
                <span className="text-[#111111] uppercase tracking-widest text-[10px] font-bold">Estimated Total</span>
                <span className="text-2xl md:text-3xl text-[#111111] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* WhatsApp Order - Primary CTA */}
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full btn-whatsapp py-3.5 font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-2.5 rounded-sm"
                >
                  <WhatsAppIcon size={16} />
                  Send Order via WhatsApp
                </button>

                {/* Request Invoice - Secondary */}
                <button 
                  onClick={handleRequestInvoice}
                  className="w-full bg-[#1a1a1a] text-white py-3 font-bold uppercase tracking-widest text-[10px] flex justify-center items-center gap-2 rounded-sm hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-colors duration-300"
                >
                  <FileText size={14} />
                  Request Invoice / Proforma
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
