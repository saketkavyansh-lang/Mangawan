import { Product, CartItem, Order } from '../types';

export const SHOP_NAME = 'माँ भगवाती गैरमेंट';
export const SHOP_PHONE = '+91 88394 48447';
export const SHOP_RAW_PHONE = '918839448447';
export const SHOP_ADDRESS = 'Mangawan, Rewa, Madhya Pradesh, India';

export const BASE_WHATSAPP_URL = `https://wa.me/${SHOP_RAW_PHONE}`;

/**
 * Returns the general WhatsApp link with default greeting or custom text
 */
export const getWhatsAppUrl = (customText?: string): string => {
  const defaultText = `Hello ${SHOP_NAME}, I want to inquire about products at your shop in ${SHOP_ADDRESS}.`;
  const text = customText || defaultText;
  return `${BASE_WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
};

/**
 * Returns pre-filled WhatsApp inquiry link for a specific product
 */
export const getProductInquiryUrl = (product: Product, selectedSize?: string, selectedColor?: string): string => {
  let text = `Hello ${SHOP_NAME}, I am interested in this product. Please provide more details.\n\n`;
  text += `📌 Product: ${product.title}\n`;
  text += `💰 Price: ₹${product.price} (MRP: ₹${product.originalPrice})\n`;
  if (selectedSize) text += `📏 Selected Size: ${selectedSize}\n`;
  if (selectedColor) text += `🎨 Selected Color: ${selectedColor}\n`;
  text += `🔗 Category: ${product.category}\n\nIs this available in stock?`;
  return `${BASE_WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
};

/**
 * Returns WhatsApp message link for a customer placing an order or inquiring about cart
 */
export const getCartInquiryUrl = (items: CartItem[], total: number): string => {
  let text = `Hello ${SHOP_NAME}, I would like to place an order for the following items:\n\n`;
  items.forEach((item, index) => {
    text += `${index + 1}. ${item.product.title}\n   Qty: ${item.quantity} | Size: ${item.selectedSize} | Color: ${item.selectedColor} | Price: ₹${item.product.price * item.quantity}\n`;
  });
  text += `\n💵 Estimated Total: ₹${total}\n\nPlease confirm availability and payment options for delivery in Rewa / MP.`;
  return `${BASE_WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
};

/**
 * Returns WhatsApp message link for a confirmed order summary
 */
export const getOrderConfirmationWhatsAppUrl = (order: Order): string => {
  let text = `*NEW ORDER CONFIRMATION - ${SHOP_NAME}*\n`;
  text += `🆔 Order ID: *${order.id}*\n`;
  text += `👤 Customer: ${order.customer.name}\n`;
  text += `📞 Phone: ${order.customer.mobile}\n`;
  text += `📍 Delivery Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\n`;
  text += `*ITEMS ORDERED:*\n`;
  order.items.forEach((item, idx) => {
    text += `${idx + 1}. ${item.product.title} (Size: ${item.selectedSize}, Color: ${item.selectedColor}) x ${item.quantity} = ₹${item.product.price * item.quantity}\n`;
  });
  text += `\n💰 Total Amount: *₹${order.total}*\n`;
  text += `💳 Payment Method: ${order.paymentMethod}\n`;
  text += `🚚 Delivery Status: ${order.orderStatus}\n\n`;
  text += `Please process my order at the earliest. Thank you!`;
  return `${BASE_WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
};
