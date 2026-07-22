import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Send, 
  Building, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { getWhatsAppUrl, SHOP_NAME, SHOP_PHONE, SHOP_ADDRESS } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = `Hello ${SHOP_NAME},\nName: ${name || 'Customer'}\nMessage: ${msg || 'Inquiry about clothes'}`;
    window.open(getWhatsAppUrl(fullMsg), '_blank');
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visit Or Contact Our Store</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif tracking-tight">
            Contact माँ भगवाती गैरमेंट
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Located in Mangawan, Rewa. We welcome you to visit our shop or contact us on WhatsApp for fast orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Shop Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-amber-900/40">
            
            <div className="flex items-center gap-3 border-b border-amber-900/40 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-md">
                माँ
              </div>
              <div>
                <h3 className="font-black text-xl font-serif text-amber-300">{SHOP_NAME}</h3>
                <p className="text-xs text-stone-300">Garments & Clothing Shop</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-200 text-xs">Shop Address:</p>
                  <p className="text-stone-300 font-medium">{SHOP_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-200 text-xs">Direct Phone Call:</p>
                  <a href={`tel:${SHOP_PHONE.replace(/\s+/g, '')}`} className="text-amber-300 font-bold hover:underline text-sm">
                    {SHOP_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-200 text-xs">WhatsApp Support:</p>
                  <a 
                    href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I am reaching out from your website.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 font-bold hover:underline text-sm"
                  >
                    {SHOP_PHONE} (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-200 text-xs">Working Hours:</p>
                  <p className="text-stone-300">9:00 AM - 9:00 PM (Monday to Sunday)</p>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I want to visit your shop in Mangawan, Rewa.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Connect Immediately on WhatsApp</span>
            </a>

          </div>

          {/* Quick Contact Form & Map Preview */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
            
            <div>
              <h3 className="font-bold text-lg text-stone-900 font-serif mb-1">Send a Message to Store</h3>
              <p className="text-xs text-stone-500">Fill out this quick form to initiate a chat with {SHOP_NAME} on WhatsApp.</p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Message / Product Query</label>
                <textarea
                  rows={4}
                  placeholder="Ask about sarees, kurtis, sizes, prices, or store directions..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp (+91 88394 48447)</span>
              </button>
            </form>

            {/* Map location badge */}
            <div className="bg-amber-100/60 p-4 rounded-2xl border border-amber-200/80 flex items-center gap-3 text-xs text-amber-900">
              <Building className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <p className="font-bold">Location Pin: Mangawan, Rewa (M.P.)</p>
                <p className="text-[11px] text-stone-600">Easily accessible in Mangawan main market. Fast shipping across Madhya Pradesh.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
