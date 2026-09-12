import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

export interface ToastData {
  id: string;
  productName: string;
  productImage: string;
  timestamp: number;
}

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col-reverse gap-3 pointer-events-none max-w-[calc(100vw-2rem)]">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void; [key: string]: unknown }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2700);

    const removeTimer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto relative flex items-center gap-3 bg-[#0a0a0a] border border-[#D4AF37]/30 shadow-2xl shadow-black/40 px-4 py-3 w-full sm:min-w-[300px] sm:max-w-[380px] rounded-lg ${
        isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'
      }`}
    >
      {/* Product thumbnail */}
      <div className="w-10 h-10 flex-shrink-0 bg-[#1a1a1a] rounded-md overflow-hidden">
        <img
          src={toast.productImage}
          alt={toast.productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
            <Check size={10} className="text-white" strokeWidth={3} />
          </div>
          <span className="text-[#25D366] text-[10px] font-semibold uppercase tracking-wider">
            Added to Cart
          </span>
        </div>
        <p className="text-white text-xs font-medium truncate">
          {toast.productName}
        </p>
        <p className="text-gray-400 text-[10px]">added successfully</p>
      </div>

      {/* Close button */}
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        className="text-gray-500 hover:text-white transition-colors flex-shrink-0 p-0.5"
      >
        <X size={14} />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a1a] rounded-b-lg overflow-hidden">
        <div className="h-full bg-[#25D366] toast-progress" />
      </div>
    </div>
  );
}

