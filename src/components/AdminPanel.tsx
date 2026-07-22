import React, { useState } from 'react';
import { Product, Order, Category } from '../types';
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Image as ImageIcon, 
  Check, 
  Search, 
  MessageSquare,
  Sparkles,
  Layers,
  Save,
  Tag
} from 'lucide-react';
import { SHOP_NAME, SHOP_PHONE } from '../utils/whatsapp';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  categories: Category[];
  orders: Order[];
  onAddProduct: (newProduct: Omit<Product, 'id'>) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  categories,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add-product'>('products');
  const [searchProduct, setSearchProduct] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0]?.name || "Men's Wear",
    price: 999,
    originalPrice: 1999,
    description: '',
    fabric: '100% Cotton / Silk Blend',
    images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    sizes: 'M, L, XL, XXL',
    colors: 'Maroon, Navy, Black, Gold',
    stockCount: 20,
    inStock: true
  });

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchProduct.toLowerCase()) || 
    p.category.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const sizesArr = formData.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const colorsArr = formData.colors.split(',').map(c => c.trim()).filter(Boolean);
    const imagesArr = formData.images.split(',').map(i => i.trim()).filter(Boolean);
    
    const disc = Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100);

    if (editingProduct) {
      // Edit existing product
      const updated: Product = {
        ...editingProduct,
        title: formData.title,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discountPercent: disc > 0 ? disc : 0,
        description: formData.description,
        fabric: formData.fabric,
        images: imagesArr.length > 0 ? imagesArr : [editingProduct.images[0]],
        sizes: sizesArr.length > 0 ? sizesArr : ['Standard'],
        colors: colorsArr.length > 0 ? colorsArr : ['Standard'],
        stockCount: Number(formData.stockCount),
        inStock: formData.stockCount > 0
      };
      onUpdateProduct(updated);
      setEditingProduct(null);
    } else {
      // Add new product
      onAddProduct({
        title: formData.title,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discountPercent: disc > 0 ? disc : 0,
        description: formData.description,
        fabric: formData.fabric,
        images: imagesArr.length > 0 ? imagesArr : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'],
        sizes: sizesArr.length > 0 ? sizesArr : ['Standard'],
        colors: colorsArr.length > 0 ? colorsArr : ['Standard'],
        stockCount: Number(formData.stockCount),
        inStock: formData.stockCount > 0,
        rating: 4.8,
        reviewsCount: 12
      });
    }

    // Reset Form
    setFormData({
      title: '',
      category: categories[0]?.name || "Men's Wear",
      price: 999,
      originalPrice: 1999,
      description: '',
      fabric: '100% Cotton',
      images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      sizes: 'M, L, XL, XXL',
      colors: 'Maroon, Navy, Black, Gold',
      stockCount: 20,
      inStock: true
    });

    setActiveTab('products');
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      title: p.title,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      description: p.description,
      fabric: p.fabric || 'Cotton Blend',
      images: p.images.join(', '),
      sizes: p.sizes.join(', '),
      colors: p.colors.join(', '),
      stockCount: p.stockCount,
      inStock: p.inStock
    });
    setActiveTab('add-product');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-lg shadow-md">
              माँ
            </div>
            <div>
              <h3 className="font-black text-lg font-serif">Store Owner Admin Dashboard</h3>
              <p className="text-xs text-amber-300">{SHOP_NAME} • Mangawan, Rewa ({SHOP_PHONE})</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-xl hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-stone-100 p-2 border-b border-stone-200 flex flex-wrap gap-2 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('products');
              setEditingProduct(null);
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'products' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                title: '',
                category: categories[0]?.name || "Men's Wear",
                price: 999,
                originalPrice: 1999,
                description: '',
                fabric: 'Cotton Blend',
                images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
                sizes: 'S, M, L, XL',
                colors: 'Red, Blue, Black',
                stockCount: 15,
                inStock: true
              });
              setActiveTab('add-product');
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'add-product' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingProduct ? 'Edit Product' : 'Add New Product'}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: Product List */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search product by title/category..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>

                <div className="text-xs text-stone-500">
                  Total Active Products: <b className="text-stone-900">{filteredProducts.length}</b>
                </div>
              </div>

              {/* Product Table */}
              <div className="overflow-x-auto border border-stone-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Selling Price</th>
                      <th className="p-3">MRP</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-bold text-stone-900 line-clamp-1 max-w-xs">{p.title}</span>
                        </td>
                        <td className="p-3 text-amber-800 font-semibold">{p.category}</td>
                        <td className="p-3 font-black text-stone-900">₹{p.price}</td>
                        <td className="p-3 text-stone-400 line-through">₹{p.originalPrice}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.stockCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                            {p.stockCount} left
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: Add/Edit Product Form */}
          {activeTab === 'add-product' && (
            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs max-w-2xl mx-auto">
              
              <h4 className="text-sm font-bold text-stone-900 font-serif border-b pb-2">
                {editingProduct ? `Edit Product: ${editingProduct.title}` : 'Add New Clothing Product'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-bold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Banarasi Silk Saree with Zari Border"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Product Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Fabric Material</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Pure Cotton"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Original MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-bold mb-1">Product Image URLs (comma separated)</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Available Sizes (comma separated)</label>
                  <input
                    type="text"
                    placeholder="S, M, L, XL, XXL, Free Size"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Available Colors (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Maroon, Navy Blue, Gold"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-bold mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed description of clothing item..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Save Product Changes' : 'Publish Product to Shop'}</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 3: Customer Orders List */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-900 font-serif border-b pb-2">
                Customer Placed Orders
              </h4>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  No orders placed yet. Placed customer orders will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                        <div>
                          <span className="font-bold text-stone-900">Order ID: <b className="font-mono text-amber-900">{ord.id}</b></span>
                          <span className="text-stone-500 ml-2">({ord.date})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-900">₹{ord.total}</span>
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[10px]">
                            {ord.paymentMethod} ({ord.paymentStatus})
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
                        <div>
                          <p className="font-bold text-stone-800">Customer: {ord.customer.name}</p>
                          <p>Phone: {ord.customer.mobile}</p>
                          <p>Address: {ord.customer.address}, {ord.customer.city} - {ord.customer.pincode}</p>
                        </div>

                        <div className="space-y-1">
                          <label className="block font-bold text-stone-800">Update Order Status:</label>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order['orderStatus'])}
                            className="p-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-amber-900"
                          >
                            <option value="Placed">Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Direct WhatsApp to Customer */}
                      <a
                        href={`https://wa.me/91${ord.customer.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${ord.customer.name}, updating you regarding your order ${ord.id} at माँ भगवाती गैरमेंट. Status: ${ord.orderStatus}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-xl shadow-sm hover:bg-emerald-700"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>Send WhatsApp Update to Customer ({ord.customer.mobile})</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
