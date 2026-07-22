import React from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquare, 
  ArrowRight, 
  Truck, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { getCartInquiryUrl, SHOP_NAME, SHOP_PHONE } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalOriginal = items.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const savings = totalOriginal - subtotal;
  
  const FREE_SHIPPING_THRESHOLD = 999;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingFee = isFreeShipping || items.length === 0 ? 0 : 60;
  const finalTotal = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-base font-serif">Your Shopping Cart</h3>
            <span className="text-xs bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-amber-50 p-3 border-b border-amber-200 text-xs">
          {isFreeShipping ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Congratulations! You get FREE Delivery in MP!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-amber-900 font-semibold mb-1">
                <span>Add ₹{amountToFreeShipping} more for FREE Delivery</span>
                <span>₹{subtotal} / ₹{FREE_SHIPPING_THRESHOLD}</span>
              </div>
              <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-stone-400 py-12">
              <ShoppingBag className="w-16 h-16 text-stone-300 stroke-1" />
              <p className="text-sm font-bold text-stone-700">Your cart is currently empty</p>
              <p className="text-xs text-stone-500 max-w-xs">Explore our sarees, kurtis, men's shirts and kids wear collection to add items.</p>
              <button
                onClick={onClose}
                className="mt-2 bg-amber-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm hover:bg-amber-700"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200 relative group"
              >
                {/* Product Thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-24 object-cover rounded-xl border border-stone-200"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 truncate pr-6">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Size: <b className="text-stone-800">{item.selectedSize}</b> | Color: <b className="text-stone-800">{item.selectedColor}</b>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-stone-300 bg-white rounded-lg overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xs font-black text-amber-900">
                        ₹{item.product.price * item.quantity}
                      </p>
                      <p className="text-[10px] text-stone-400 line-through">
                        ₹{item.product.originalPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-2 right-2 text-stone-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Actions */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 space-y-3">
            
            {/* Calculation details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-900">₹{subtotal}</span>
              </div>
              
              {savings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Total Discount Savings:</span>
                  <span>-₹{savings}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Estimated Shipping:</span>
                <span className="font-semibold text-stone-900">
                  {isFreeShipping ? <b className="text-emerald-700 font-bold">FREE</b> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Amount:</span>
                <span className="text-amber-900 text-base">₹{finalTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Order via WhatsApp Direct Chat */}
              <a
                href={getCartInquiryUrl(items, finalTotal)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Order via WhatsApp Chat ({SHOP_PHONE})</span>
              </a>

            </div>

            <p className="text-[10px] text-center text-stone-400">
              🔒 Safe & Encrypted Checkout • Cash on Delivery Available in Rewa/MP
            </p>

          </div>
        )}

      </div>

    </div>
  );
};
