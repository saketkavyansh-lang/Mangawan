import React, { useState } from 'react';
import { Order } from '../types';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { getWhatsAppUrl, SHOP_NAME, SHOP_PHONE } from '../utils/whatsapp';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderId = ''
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [foundOrder, setFoundOrder] = useState<Order | null>(
    initialOrderId ? orders.find(o => o.id.toLowerCase() === initialOrderId.toLowerCase()) || null : null
  );
  const [searched, setSearched] = useState(Boolean(initialOrderId));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) {
      setFoundOrder(null);
      return;
    }

    const match = orders.find(
      o => o.id.toLowerCase() === query || o.customer.mobile.includes(query)
    );
    setFoundOrder(match || null);
  };

  const getStepStatus = (orderStatus: string, stepIndex: number) => {
    const statuses = ['Placed', 'Processing', 'Packed', 'Dispatched', 'Delivered'];
    const currentIdx = statuses.indexOf(orderStatus);
    if (currentIdx === -1) return 'pending';
    if (stepIndex < currentIdx) return 'completed';
    if (stepIndex === currentIdx) return 'current';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 flex items-center justify-between border-b border-amber-900/40">
          <div className="flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-black text-base font-serif">Track Your Order Status</h3>
              <p className="text-[11px] text-amber-200">{SHOP_NAME} • Mangawan, Rewa</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-stone-800">
              Enter Order ID (e.g. MBG-84920) or Customer Mobile Number:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Order ID / Mobile No."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Results View */}
          {searched && !foundOrder && (
            <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl text-center space-y-2 text-xs">
              <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
              <p className="font-bold text-amber-900">No matching order record found</p>
              <p className="text-stone-600 max-w-xs mx-auto">
                Please check your Order ID or contact the store directly on WhatsApp for real-time order updates.
              </p>
              <a
                href={getWhatsAppUrl(`Hello ${SHOP_NAME}, I want to check my order status for: ${searchQuery}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl mt-1 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Ask Store Owner on WhatsApp</span>
              </a>
            </div>
          )}

          {foundOrder && (
            <div className="space-y-6">
              
              {/* Order Info Card */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="font-bold text-stone-900">Order ID: <b className="font-mono text-amber-900">{foundOrder.id}</b></span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                    {foundOrder.orderStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-stone-600">
                  <p>Customer: <b className="text-stone-800">{foundOrder.customer.name}</b></p>
                  <p>Date: <b className="text-stone-800">{foundOrder.date}</b></p>
                  <p>Tracking No: <b className="text-stone-800 font-mono">{foundOrder.trackingNumber}</b></p>
                  <p>Total: <b className="text-amber-900 font-bold">₹{foundOrder.total}</b></p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Live Tracking Timeline
                </h4>

                <div className="space-y-3 relative pl-6 border-l-2 border-stone-200 ml-2">
                  {[
                    { label: 'Order Placed', desc: 'Received & logged in shop portal' },
                    { label: 'Processing & Packed', desc: 'Inspected and packed in Mangawan store' },
                    { label: 'Dispatched', desc: 'Handed over to courier partner' },
                    { label: 'Out for Delivery', desc: 'Assigned to local delivery agent' },
                    { label: 'Delivered', desc: 'Handed to customer at address' }
                  ].map((step, idx) => {
                    const status = getStepStatus(foundOrder.orderStatus, idx);
                    return (
                      <div key={idx} className="relative">
                        {/* Timeline dot */}
                        <div 
                          className={`absolute -left-[31px] top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] ${
                            status === 'completed'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : status === 'current'
                              ? 'bg-amber-500 border-amber-600 text-stone-950 font-bold animate-pulse'
                              : 'bg-white border-stone-300 text-stone-400'
                          }`}
                        >
                          {status === 'completed' ? '✓' : idx + 1}
                        </div>

                        <div>
                          <p className={`text-xs font-bold ${status === 'pending' ? 'text-stone-400' : 'text-stone-900'}`}>
                            {step.label}
                          </p>
                          <p className="text-[11px] text-stone-500">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Shop Owner on WhatsApp */}
              <a
                href={getWhatsAppUrl(`Hello ${SHOP_NAME}, I need help regarding my order tracking ID: ${foundOrder.id}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Contact Shop Owner on WhatsApp for Updates ({SHOP_PHONE})</span>
              </a>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
