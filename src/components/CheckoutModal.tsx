import React, { useState } from 'react';
import { CartItem, PaymentMethod, OrderCustomer, Order } from '../types';
import { 
  X, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Check, 
  Phone, 
  MapPin, 
  User, 
  MessageSquare,
  Lock,
  Loader2
} from 'lucide-react';
import { SHOP_NAME, SHOP_PHONE, getOrderConfirmationWhatsAppUrl } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  // Form State
  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '',
    mobile: '',
    address: '',
    city: 'Rewa',
    state: 'Madhya Pradesh',
    pincode: '486111',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState<boolean>(false);

  // Card details mock
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  // Bank selection mock
  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 999;
  const shippingFee = isFreeShipping || items.length === 0 ? 0 : 60;
  const totalAmount = subtotal + shippingFee;

  const handleInputChange = (field: keyof OrderCustomer, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.name.trim() || !customer.mobile.trim() || !customer.address.trim() || !customer.pincode.trim()) {
      alert('Please fill in all mandatory customer delivery details (Name, Mobile, Address, PIN Code).');
      return;
    }

    if (paymentMethod === 'COD') {
      // Direct placement for COD
      processFinalOrder();
    } else {
      // Show Razorpay Payment Gateway Placeholder dialog
      setShowRazorpayModal(true);
    }
  };

  const processFinalOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `MBG-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNo = `IND${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customer,
        items: [...items],
        subtotal,
        shippingFee,
        discount: items.reduce((acc, i) => acc + (i.product.originalPrice - i.product.price) * i.quantity, 0),
        total: totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid',
        orderStatus: 'Placed',
        trackingNumber: trackingNo,
        estimatedDelivery: '3 to 5 Working Days'
      };

      setIsProcessing(false);
      setShowRazorpayModal(false);
      onOrderPlaced(newOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 flex items-center justify-between border-b border-amber-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-lg shadow-md">
              माँ
            </div>
            <div>
              <h3 className="font-black text-lg font-serif">Secure Delivery Checkout</h3>
              <p className="text-xs text-amber-200">{SHOP_NAME} • Mangawan, Rewa (M.P.)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          
          {/* Left Side: Delivery Details & Payment Selection */}
          <div className="md:col-span-7 p-6 space-y-6">
            
            {/* Customer Details Form */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-700" />
                <span>1. Customer Delivery Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={customer.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Mobile Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={customer.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">Street Address / Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="House No., Building, Colony, Landmark"
                    value={customer.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">City / Tehsil *</label>
                  <input
                    type="text"
                    required
                    placeholder="City (e.g. Rewa, Mangawan)"
                    value={customer.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={customer.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN Code (e.g. 486111)"
                    value={customer.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options Selection */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-amber-700" />
                <span>2. Select Payment Method</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'UPI'
                      ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600 font-bold text-amber-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-purple-600 shrink-0" />
                  <div>
                    <p className="font-bold">UPI / QR Code</p>
                    <p className="text-[10px] text-stone-500 font-normal">GPay, PhonePe, Paytm</p>
                  </div>
                </button>

                {/* Card Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600 font-bold text-amber-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-bold">Credit/Debit Card</p>
                    <p className="text-[10px] text-stone-500 font-normal">Visa, Mastercard, RuPay</p>
                  </div>
                </button>

                {/* Net Banking Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('NET_BANKING')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'NET_BANKING'
                      ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600 font-bold text-amber-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <p className="font-bold">Net Banking</p>
                    <p className="text-[10px] text-stone-500 font-normal">SBI, HDFC, ICICI, etc.</p>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'COD'
                      ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600 font-bold text-amber-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Cash on Delivery</p>
                    <p className="text-[10px] text-stone-500 font-normal">Pay in Cash at Doorstep</p>
                  </div>
                </button>

              </div>

              {/* Extended Details UI depending on selected payment method */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2">
                {paymentMethod === 'UPI' && (
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-white p-1 rounded-xl border border-stone-200 shadow-sm flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-purple-700" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">UPI VPA: <span className="text-purple-700 font-mono">8839448447@upi</span></p>
                      <p className="text-[11px] text-stone-500">Scan QR Code or pay directly via Google Pay, PhonePe, or Paytm during gateway verification.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'CARD' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Card Number (4532 XXXX XXXX 8901)"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'NET_BANKING' && (
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Select Bank:</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    >
                      <option>State Bank of India (SBI)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Punjab National Bank</option>
                      <option>Bank of Baroda</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Pay ₹{totalAmount} in cash when courier delivers to your address in {customer.city || 'Rewa'}.</span>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Side: Order Summary Sidebar */}
          <div className="md:col-span-5 p-6 bg-stone-50 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
                <span>Order Summary ({items.length} items)</span>
                <span className="text-amber-700 font-black">₹{totalAmount}</span>
              </h4>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 divide-y divide-stone-200">
                {items.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-900 truncate">{item.product.title}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                    </div>
                    <p className="font-bold text-amber-900">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Price Calculation breakdown */}
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charges:</span>
                  <span className="font-bold text-emerald-700">
                    {isFreeShipping ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-900 font-black text-sm pt-2 border-t border-stone-100">
                  <span>Total Payable:</span>
                  <span className="text-amber-900 text-base">₹{totalAmount}</span>
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-400 text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>{paymentMethod === 'COD' ? 'Confirm COD Order' : 'Proceed to Gateway Payment'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[10px] text-center text-stone-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-stone-500" />
                <span>256-Bit SSL Encrypted Payment Gateway</span>
              </div>
            </div>

          </div>

        </form>

      </div>

      {/* Razorpay Payment Gateway Placeholder Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-5 border border-stone-200 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex justify-between items-center pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="font-black text-blue-700 text-lg">Razorpay</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">GATEWAY SIMULATOR</span>
              </div>
              <span className="text-xs font-bold text-stone-900">₹{totalAmount}</span>
            </div>

            <div className="space-y-2 py-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2 border border-amber-200 animate-pulse">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-stone-900">
                Authorizing Payment to {SHOP_NAME}
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Selected Method: <b className="text-stone-800">{paymentMethod}</b>. Ready to connect with Indian banking gateway.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={processFinalOrder}
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying OTP & Processing...</span>
                  </>
                ) : (
                  <span>Approve & Complete Payment (₹{totalAmount})</span>
                )}
              </button>

              <button
                onClick={() => setShowRazorpayModal(false)}
                className="text-xs text-stone-500 hover:text-stone-800 py-1"
              >
                Cancel Gateway Payment
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
