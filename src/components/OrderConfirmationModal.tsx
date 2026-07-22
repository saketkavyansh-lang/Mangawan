import React from 'react';
import { Order } from '../types';
import { 
  CheckCircle2, 
  MessageSquare, 
  Printer, 
  Truck, 
  X, 
  ShoppingBag, 
  Phone, 
  Copy, 
  Check, 
  MapPin, 
  Clock
} from 'lucide-react';
import { getOrderConfirmationWhatsAppUrl, SHOP_NAME, SHOP_PHONE } from '../utils/whatsapp';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder
}) => {
  if (!order) return null;

  const [copied, setCopied] = React.useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = getOrderConfirmationWhatsAppUrl(order);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative my-8 animate-in zoom-in-95 duration-200">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white p-6 text-center relative space-y-2">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black font-serif">Order Placed Successfully!</h2>
          <p className="text-xs text-emerald-100 max-w-md mx-auto">
            Thank you for shopping at <b>{SHOP_NAME}</b>! Your order has been registered.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-6">
          
          {/* Order ID & Copy */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <p className="text-amber-900 font-bold">Order Reference ID:</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg font-black font-mono text-stone-900">{order.id}</span>
                <button
                  onClick={handleCopyOrderId}
                  className="p-1 text-stone-500 hover:text-amber-800 bg-white rounded border border-stone-200"
                  title="Copy Order ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-stone-500">Estimated Delivery:</p>
              <p className="font-bold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {order.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Delivery Address & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
              <p className="font-bold text-stone-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" /> Delivery Address
              </p>
              <p className="font-semibold text-stone-800">{order.customer.name}</p>
              <p className="text-stone-600">{order.customer.address}</p>
              <p className="text-stone-600">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="text-amber-800 font-medium">📞 {order.customer.mobile}</p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
              <p className="font-bold text-stone-900 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-700" /> Payment & Status
              </p>
              <p className="text-stone-700">Payment Method: <b className="text-stone-900">{order.paymentMethod}</b></p>
              <p className="text-stone-700">Payment Status: <b className="text-emerald-700">{order.paymentStatus}</b></p>
              <p className="text-stone-700">Order Status: <b className="text-amber-800">{order.orderStatus}</b></p>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Ordered Items</h4>
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-3 divide-y divide-stone-200 max-h-48 overflow-y-auto">
              {order.items.map((item) => (
                <div key={item.id} className="py-2 first:pt-0 last:pb-0 flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 truncate">{item.product.title}</p>
                    <p className="text-[10px] text-stone-500">Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-amber-900">₹{item.product.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs font-black text-stone-900 pt-1">
              <span>Grand Total Paid/Payable:</span>
              <span className="text-amber-900 text-sm">₹{order.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-stone-200">
            
            {/* Primary WhatsApp Order Confirmation Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send / Confirm Order on WhatsApp ({SHOP_PHONE})</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onTrackOrder(order.id);
                  onClose();
                }}
                className="py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Live Track Order</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-stone-300"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice Receipt</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
