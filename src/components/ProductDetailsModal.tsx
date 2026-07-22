import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  ShoppingBag, 
  MessageSquare, 
  Zap, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus,
  Sparkles
} from 'lucide-react';
import { getProductInquiryUrl, SHOP_NAME, SHOP_PHONE } from '../utils/whatsapp';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const whatsappUrl = getProductInquiryUrl(product, selectedSize, selectedColor);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-stone-100 hover:bg-stone-200 text-stone-700 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Image Gallery Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative">
              <img
                src={selectedImage || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                {product.discountPercent}% OFF
              </span>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-amber-600 scale-105 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Specs Column */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock ({product.stockCount} left)
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-serif leading-snug">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current text-amber-500' : 'text-stone-200'}`} />
                  ))}
                </div>
                <span className="font-bold text-stone-800">{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100">
                <span className="text-2xl sm:text-3xl font-black text-amber-950">
                  ₹{product.price}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  MRP: ₹{product.originalPrice}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md ml-auto">
                  You Save ₹{product.originalPrice - product.price}
                </span>
              </div>

              {/* Description & Fabric */}
              <div className="text-xs text-stone-600 leading-relaxed space-y-1">
                <p>{product.description}</p>
                {product.fabric && (
                  <p className="text-stone-800 font-semibold pt-1">
                    🧵 Fabric Material: <span className="text-stone-600 font-normal">{product.fabric}</span>
                  </p>
                )}
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-stone-800 flex justify-between">
                    <span>Select Size:</span>
                    <span className="text-amber-700 font-semibold text-[11px] cursor-pointer hover:underline">
                      Size Chart Guide
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          selectedSize === sz
                            ? 'bg-amber-700 text-white border-amber-700 shadow-md scale-105'
                            : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-stone-800">
                    Select Color: <span className="text-amber-800 font-semibold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((clr) => (
                      <button
                        key={clr}
                        onClick={() => setSelectedColor(clr)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                          selectedColor === clr
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                        }`}
                      >
                        {clr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2">
                <label className="text-xs font-bold text-stone-800">Quantity:</label>
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-stone-200 text-stone-700"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-stone-200 text-stone-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-stone-700" />
                      <span>Add to Shopping Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-current text-white" />
                  <span>Buy Now (Checkout)</span>
                </button>
              </div>

              {/* Direct WhatsApp Product Inquiry Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp about this Product ({SHOP_PHONE})</span>
              </a>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-stone-500 font-medium text-center">
                <div className="flex flex-col items-center gap-1 bg-stone-50 p-2 rounded-xl">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fast Delivery Rewa/MP</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-stone-50 p-2 rounded-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-stone-50 p-2 rounded-xl">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                  <span>7 Days Easy Return</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
