import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  QrCode, 
  CreditCard, 
  Building2, 
  Banknote,
  Sparkles
} from 'lucide-react';
import { getWhatsAppUrl, SHOP_NAME, SHOP_PHONE, SHOP_ADDRESS } from '../utils/whatsapp';
import { Category } from '../types';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onSelectCategory,
  onOpenTracking,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-8 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-stone-800 text-xs">
          <div className="flex items-center gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
            <Truck className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Fast Home Delivery</p>
              <p className="text-stone-400">Across Rewa & Madhya Pradesh</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
            <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Cash on Delivery</p>
              <p className="text-stone-400">Pay when your order arrives</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
            <RotateCcw className="w-8 h-8 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">Quality Guaranteed</p>
              <p className="text-stone-400">100% fine fabrics & stitching</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
            <MessageSquare className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">WhatsApp Orders</p>
              <p className="text-stone-400">Direct Chat: {SHOP_PHONE}</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          
          {/* Column 1: Store Brand & Contact Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-lg">
                माँ
              </div>
              <h3 className="font-black text-xl font-serif text-white tracking-tight">
                {SHOP_NAME}
              </h3>
            </div>

            <p className="text-stone-400 leading-relaxed">
              Your premier clothing store in Mangawan, Rewa (M.P.). Offering a wide range of Men's Wear, Women's Sarees & Kurtis, Kids' Wear, Winter Fashion & Accessories.
            </p>

            <div className="space-y-2 pt-1 font-medium">
              <div className="flex items-center gap-2 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{SHOP_ADDRESS}</span>
              </div>

              <div className="flex items-center gap-2 text-stone-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${SHOP_PHONE.replace(/\s+/g, '')}`} className="hover:text-amber-400 font-bold">
                  {SHOP_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-bold pt-1">
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <a 
                  href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I am visiting your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Direct WhatsApp: {SHOP_PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="font-bold text-white text-sm font-serif border-b border-stone-800 pb-2">
              Popular Product Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-stone-400">
              {categories.slice(0, 10).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.name)}
                  className="text-left hover:text-amber-400 transition-colors truncate"
                >
                  • {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Customer Links & Admin */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm font-serif border-b border-stone-800 pb-2">
              Customer Services
            </h4>

            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={onOpenTracking} className="hover:text-amber-400">
                  🚚 Live Track Your Order
                </button>
              </li>
              <li>
                <a 
                  href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I want to inquire about wholesale clothing.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400"
                >
                  💬 WhatsApp Direct Inquiries
                </a>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-400">
                  ⚙️ Store Owner Admin Login
                </button>
              </li>
            </ul>

            {/* Payment Method Icons */}
            <div className="pt-3">
              <p className="text-[10px] font-bold uppercase text-stone-500 mb-2">Supported Payment Options</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-purple-400 font-bold flex items-center gap-1">
                  <QrCode className="w-3 h-3" /> UPI
                </span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-blue-400 font-bold flex items-center gap-1">
                  <CreditCard className="w-3 h-3" /> Cards
                </span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-indigo-400 font-bold flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> NetBanking
                </span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <Banknote className="w-3 h-3" /> COD
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar Copyright */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {SHOP_NAME} ({SHOP_PHONE}). All Rights Reserved. Mangawan, Rewa, Madhya Pradesh.</p>
          
          <a
            href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3 fill-current" />
            <span>Chat on WhatsApp: {SHOP_PHONE}</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
