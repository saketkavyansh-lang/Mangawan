import React from 'react';
import { ShoppingBag, MessageSquare, Star, Zap, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { getProductInquiryUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onBuyNow: (product: Product, size?: string, color?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onBuyNow
}) => {
  const defaultSize = product.sizes[0] || 'M';
  const defaultColor = product.colors[0] || 'Default';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image & Badges */}
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-[11px] px-2.5 py-1 rounded-full shadow-md">
            {product.discountPercent}% OFF
          </span>
        )}

        {/* Featured / Best Seller Badge */}
        {product.isBestSeller && (
          <span className="absolute top-3 right-3 bg-amber-500 text-stone-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
            ★ Best Seller
          </span>
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="bg-white/95 hover:bg-white text-stone-900 font-bold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5 text-amber-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3 h-3 fill-current text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 hover:text-amber-700 cursor-pointer transition-colors leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Available Sizes Pills Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar text-[10px] text-stone-600 font-medium">
            <span className="text-stone-400 mr-1 shrink-0">Sizes:</span>
            {product.sizes.slice(0, 4).map((sz) => (
              <span key={sz} className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] shrink-0">
                {sz}
              </span>
            ))}
            {product.sizes.length > 4 && <span className="text-stone-400 text-[9px]">+more</span>}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-stone-100">
          <span className="text-base sm:text-lg font-black text-amber-900">
            ₹{product.price}
          </span>
          <span className="text-xs text-stone-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-[10px] text-emerald-700 font-bold ml-auto">
            Save ₹{product.originalPrice - product.price}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product, defaultSize, defaultColor)}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-stone-700" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => onBuyNow(product, defaultSize, defaultColor)}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Prominent WhatsApp Inquiry button for product */}
          <a
            href={getProductInquiryUrl(product, defaultSize, defaultColor)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-600" />
            <span>Inquire on WhatsApp</span>
          </a>

        </div>

      </div>
    </div>
  );
};
