import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // Sarees & Kurtis (Women's Wear)
  {
    id: 'mbg-001',
    title: 'Banarasi Art Silk Saree with Unstitched Blouse Piece',
    category: 'Sarees',
    price: 1899,
    originalPrice: 3499,
    discountPercent: 45,
    description: 'Exquisite royal maroon Banarasi art silk saree adorned with intricate golden zari woven border and rich pallu. Perfect for weddings, festivals, and special traditional occasions in Madhya Pradesh.',
    fabric: 'Art Silk / Banarasi Jacquard',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    colors: ['Royal Maroon', 'Emerald Green', 'Mustard Gold'],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: 'mbg-002',
    title: 'Lucknowi Chikankari Hand Embroidery Anarkali Kurti Set',
    category: 'Kurtis',
    price: 1299,
    originalPrice: 2299,
    discountPercent: 43,
    description: 'Pure cotton full-flare Anarkali kurti featuring classic Lucknawi Chikankari needlework. Breathable, elegant, and comes with matching dupatta.',
    fabric: '100% Pure Chanderi Cotton',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Sky Blue', 'Peach Pink', 'Off-White'],
    inStock: true,
    stockCount: 25,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 68
  },
  {
    id: 'mbg-003',
    title: 'Chanderi Silk Floral Printed Saree with Zari Border',
    category: 'Sarees',
    price: 1450,
    originalPrice: 2600,
    discountPercent: 44,
    description: 'Lightweight and airy Chanderi blend saree with soft pastel floral digital prints and a shimmering gold weave border.',
    fabric: 'Chanderi Cotton Silk',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Free Size'],
    colors: ['Pastel Green', 'Rose Pink', 'Cream Gold'],
    inStock: true,
    stockCount: 12,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 29
  },

  // Men's Wear (Shirts, T-Shirts, Jeans, Trousers)
  {
    id: 'mbg-004',
    title: 'Men Premium Pure Cotton Formal Button-Down Shirt',
    category: 'Shirts',
    price: 799,
    originalPrice: 1499,
    discountPercent: 46,
    description: 'Crisp long-sleeve formal cotton shirt designed with spread collar, curved hemline, and anti-wrinkle soft finish. Ideal for office & events.',
    fabric: '100% Premium Combed Cotton',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    colors: ['Navy Blue', 'Classic White', 'Light Pink', 'Sky Blue'],
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 84
  },
  {
    id: 'mbg-005',
    title: 'Men Slim Fit Stretchable Denim Jeans - Dark Wash',
    category: 'Jeans',
    price: 1099,
    originalPrice: 1999,
    discountPercent: 45,
    description: 'Heavy duty stretch denim jeans with 5-pocket construction, contrast stitching, and durable YKK zip fly. Excellent flexibility & comfort.',
    fabric: '98% Cotton Denim, 2% Elastane',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Dark Indigo', 'Charcoal Black', 'Mid Wash Blue'],
    inStock: true,
    stockCount: 20,
    isFeatured: true,
    rating: 4.6,
    reviewsCount: 51
  },
  {
    id: 'mbg-006',
    title: 'Men Solid Matty Cotton Polo T-Shirt with Collar',
    category: 'T-Shirts',
    price: 499,
    originalPrice: 899,
    discountPercent: 44,
    description: 'Classic polo t-shirt crafted from breathable matty cotton fabric. Features a 3-button placket and ribbed sleeve cuffs.',
    fabric: 'Breathable Matty Cotton',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Maroon', 'Olive Green', 'Black', 'Royal Blue'],
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.5,
    reviewsCount: 37
  },
  {
    id: 'mbg-007',
    title: 'Men Slim Fit Cotton Chino Trousers',
    category: 'Trousers',
    price: 899,
    originalPrice: 1599,
    discountPercent: 43,
    description: 'Versatile stretch chino trousers featuring twin slanted side pockets and buttoned rear welt pockets. Perfect balance of casual and formal.',
    fabric: 'Cotton Twill Stretch',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Khaki', 'Beige', 'Navy', 'Olive'],
    inStock: true,
    stockCount: 15,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 23
  },

  // Women's Dresses & Ethnic Wear
  {
    id: 'mbg-008',
    title: 'Women Ethnic Rayon Printed Kurti with Palazzos & Dupatta',
    category: 'Women\'s Wear',
    price: 1199,
    originalPrice: 2199,
    discountPercent: 45,
    description: 'Complete 3-piece designer outfit set. Soft, breathable heavy rayon fabric with golden foil motifs, matching flared palazzo, and chiffon dupatta.',
    fabric: 'Heavy Soft Rayon',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Mustard Yellow', 'Wine Red', 'Deep Teal'],
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 56
  },
  {
    id: 'mbg-009',
    title: 'Women Floral Print A-Line Midi Dress with Belt',
    category: 'Dresses',
    price: 949,
    originalPrice: 1799,
    discountPercent: 47,
    description: 'Charming summer midi dress with sweetheart neck, flutter sleeves, and adjustable matching fabric waist belt.',
    fabric: 'Georgette Crepe with Inner Lining',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Floral Yellow', 'Pastel Pink', 'Sage Green'],
    inStock: true,
    stockCount: 14,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 19
  },

  // Kids' Wear
  {
    id: 'mbg-010',
    title: 'Boys Traditional Kurta Pyjama Set with Nehru Jacket',
    category: 'Kids\' Wear',
    price: 849,
    originalPrice: 1499,
    discountPercent: 43,
    description: 'Adorable 3-piece ethnic attire for young boys. Includes silk blend kurta, comfortable drawstring pyjama, and printed ethnic vest jacket.',
    fabric: 'Cotton Silk Blend',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-11 Yrs'],
    colors: ['Royal Gold & Maroon', 'Pista Green', 'Orange & White'],
    inStock: true,
    stockCount: 20,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 31
  },

  // Winter Wear
  {
    id: 'mbg-011',
    title: 'Men Fleece-Lined Quilted Winter Bomber Jacket',
    category: 'Winter Wear',
    price: 1599,
    originalPrice: 2999,
    discountPercent: 46,
    description: 'Windproof, water-resistant insulated winter jacket with soft warm fleece lining, detachable hood, and heavy zippers.',
    fabric: 'Polyester Shell with Thermal Fleece',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Olive Drab', 'Matte Black', 'Navy Blue'],
    inStock: true,
    stockCount: 16,
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 48
  },

  // Fashion Accessories
  {
    id: 'mbg-012',
    title: 'Traditional Heavy Phulkari Dupatta with Gota Patti',
    category: 'Fashion Accessories',
    price: 599,
    originalPrice: 1199,
    discountPercent: 50,
    description: 'Vibrant hand-embroidered multi-color Phulkari dupatta with sparkling metallic lace border. Elevates any plain suit or kurti instantly.',
    fabric: 'Art Silk / Chiffon Thread Work',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Free Size (2.25 Meters)'],
    colors: ['Multicolor Red', 'Multicolor Yellow', 'Pink Orange'],
    inStock: true,
    stockCount: 28,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 62
  },

  // Additional Men's & Women's items
  {
    id: 'mbg-013',
    title: 'Men Ethnic Silk Blend Nehru Jacket / Waistcoat',
    category: 'Men\'s Wear',
    price: 999,
    originalPrice: 1899,
    discountPercent: 47,
    description: 'Mandarin collar sleeveless Nehru jacket with textured woven jacquard design. Ideal for pairing over kurtas or formal shirts.',
    fabric: 'Art Jacquard Silk',
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    colors: ['Maroon Gold', 'Royal Blue', 'Cream Bronze'],
    inStock: true,
    stockCount: 19,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 39
  },
  {
    id: 'mbg-014',
    title: 'Girls Designer Embroidered Festival Lehenga Choli',
    category: 'Kids\' Wear',
    price: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    description: 'Ready to wear festive lehenga choli set for girls with sequins embroidery, comfortable soft lining, and net dupatta.',
    fabric: 'Net & Satin Blend with Soft Cotton Lining',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs'],
    colors: ['Magenta Pink', 'Bright Yellow', 'Sky Turquoise'],
    inStock: true,
    stockCount: 14,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 27
  }
];
