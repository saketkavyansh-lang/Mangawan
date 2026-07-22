export interface Product {
  id: string;
  title: string;
  category: string; // One of the 12 categories
  price: number; // Discounted selling price in INR
  originalPrice: number; // Original MRP in INR
  discountPercent: number;
  description: string;
  fabric?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string; // unique cart item key (productId + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface OrderCustomer {
  name: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'COD';

export interface Order {
  id: string; // MBG-84920
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Cash on Delivery';
  orderStatus: 'Placed' | 'Processing' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedSize: string;
  selectedColor: string;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
