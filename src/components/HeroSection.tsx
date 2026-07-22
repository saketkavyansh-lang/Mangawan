import React from 'react';
import { ShoppingBag, MessageSquare, ArrowRight, ShieldCheck, Sparkles, Truck, Phone, Star } from 'lucide-react';
import { getWhatsAppUrl, SHOP_NAME, SHOP_PHONE, SHOP_ADDRESS } from '../utils/whatsapp';

interface HeroSectionProps {
  onExploreClick: () => void;
  onSelectCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onSelectCategory }) => {
  return (
    <div className="relative bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white overflow-hidden py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
      
      {/* Decorative background glow circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline & Call to Action */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Mangawan, Rewa's Favorite Clothing Destination</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-white leading-tight">
            <span className="text-amber-400 drop-shadow-sm">{SHOP_NAME}</span>
            <br />
            <span className="text-stone-200 text-2xl sm:text-4xl lg:text-5xl font-sans font-bold">
              Latest Fashion for Whole Family
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Discover premium traditional sarees, designer kurtis, men's formal & casual shirts, jeans, kids' wear & winter fashion at wholesale prices in <b>{SHOP_ADDRESS}</b>.
          </p>

          {/* Key Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300 font-medium max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Fast Home Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cash on Delivery (COD)</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50 col-span-2 sm:col-span-1">
              <Star className="w-4 h-4 text-yellow-400 shrink-0 fill-current" />
              <span>100% Quality Fabric</span>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            
            {/* Primary WhatsApp Chat button */}
            <a
              href={getWhatsAppUrl("Hello माँ भगवाती गैरमेंट, I want to inquire about clothing styles and place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Chat on WhatsApp ({SHOP_PHONE})</span>
            </a>

            {/* Explore Catalog button */}
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-6 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md shadow-amber-950/40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Clothing Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Call Text */}
          <div className="pt-2 text-xs text-stone-400 flex items-center justify-center lg:justify-start gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Need instant assistance? Call us directly: <b className="text-amber-300">{SHOP_PHONE}</b></span>
          </div>

        </div>

        {/* Right Column: High visual fashion collage */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 relative">
          
          <div className="space-y-3 pt-6">
            <div 
              onClick={() => onSelectCategory("Sarees")}
              className="group relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 cursor-pointer aspect-[3/4]"
            >
              <img 
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" 
                alt="Banarasi Sarees" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Royal Collection</span>
                <h3 className="text-sm font-bold text-white">Sarees & Kurtis</h3>
              </div>
            </div>

            <div 
              onClick={() => onSelectCategory("Kids' Wear")}
              className="group relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 cursor-pointer aspect-[4/3]"
            >
              <img 
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80" 
                alt="Kids Fashion" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                <h3 className="text-xs font-bold text-white">Kids' Festival Wear</h3>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div 
              onClick={() => onSelectCategory("Shirts")}
              className="group relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 cursor-pointer aspect-[4/3]"
            >
              <img 
                src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80" 
                alt="Men Shirts" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                <h3 className="text-xs font-bold text-white">Men's Formal Shirts</h3>
              </div>
            </div>

            <div 
              onClick={() => onSelectCategory("Jeans")}
              className="group relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 cursor-pointer aspect-[3/4]"
            >
              <img 
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80" 
                alt="Denim Jeans" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Stretch Fit</span>
                <h3 className="text-sm font-bold text-white">Jeans & Trousers</h3>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
