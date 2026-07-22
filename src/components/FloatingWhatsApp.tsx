import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { getWhatsAppUrl, SHOP_NAME, SHOP_PHONE } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = () => {
    const msg = customMsg.trim() || `Hello ${SHOP_NAME}, I want to inquire about clothing at your shop.`;
    window.open(getWhatsAppUrl(msg), '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* WhatsApp Quick Chat Card Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg">
                माँ
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{SHOP_NAME}</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span> Online • {SHOP_PHONE}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-amber-50/40 space-y-3">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 text-xs text-stone-700 leading-relaxed">
              👋 Namaste! Welcome to <b>{SHOP_NAME}</b> (Mangawan, Rewa). How can we assist you with clothing, sarees, or orders today?
            </div>

            <div className="space-y-2">
              <textarea
                rows={2}
                placeholder="Type your message or inquiry here..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
              
              <button
                onClick={handleSend}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start Direct Chat on WhatsApp</span>
              </button>
            </div>

            <div className="text-[10px] text-center text-stone-400">
              Direct phone: {SHOP_PHONE}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white p-4 rounded-full shadow-xl hover:shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-110 active:scale-95 relative"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageSquare className="w-6 h-6 fill-current animate-bounce" />
        <span className="hidden group-hover:inline text-xs font-bold pr-1">
          Chat on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
      </button>
    </div>
  );
};
