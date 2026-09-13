export interface Product {
  id: string;
  name: string;
  title?: string;
  slug: string;
  subtitle: string;
  shortSummary?: string;
  description: string;
  category: 'women' | 'men' | 'watches' | 'shoes' | 'accessories';
  subCategory: string;
  subcategory?: string;
  collection: 'Essentials' | 'Atelier Reserve' | 'Autumn Solstice' | 'Nocturne' | 'Quiet Luxury';
  price: number; // in PKR
  pricePKR?: number;
  oldPrice?: number;
  originalPricePKR?: number;
  discountPercent?: number;
  discount?: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  colors: Array<{
    name: string;
    hex: string;
    inStock: boolean;
  }>;
  color?: string;
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  availability?: string;
  badge?: string;
  images: string[];
  details: {
    material: string;
    origin: string;
    care: string;
    delivery: string;
    returns: string;
    fit?: string;
    style?: string;
  };
  material?: string;
  fit?: string;
  care?: string;
  delivery?: string;
  style?: string;
  reviews?: Review[];
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  userVoted?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province?: string;
  postalCode?: string;
  notes?: string;
}

export type DeliveryMethod = 'standard' | 'express' | 'sameday';
export type PaymentMethod = 'easypaisa' | 'jazzcash' | 'bank_transfer' | 'card' | 'cod';

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode?: string;
  saveAddress?: boolean;
  shippingMethod: 'standard' | 'express' | 'sameday';
  paymentMethod: 'easypaisa' | 'jazzcash' | 'bank_transfer' | 'card' | 'cod';
  easypaisaPhone?: string;
  jazzcashPhone?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber?: string;
  trackingNumber?: string;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
  courierName?: string;
  paymentStatus?: string;
  city?: string;
  postalCode?: string;
<<<<<<< HEAD
=======
=======
>>>>>>> dc76fe99c39430892f270c31a641850b11e26596
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
<<<<<<< HEAD
  orderDate?: string;
  estimatedDelivery: string;
  status: 'placed' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered';
=======
<<<<<<< HEAD
  orderDate?: string;
  estimatedDelivery: string;
  status: 'placed' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered';
=======
  orderDate: string;
  estimatedDelivery: string;
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
>>>>>>> dc76fe99c39430892f270c31a641850b11e26596
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  items: CartItem[];
  customer?: CustomerDetails;
  deliveryMethod?: DeliveryMethod;
  bankTransferRef?: string;
  shippingFee?: number;
  discountAmount?: number;
  promoCode?: string;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
  emailSent?: boolean;
  emailError?: string;
  emailProvider?: string;
  emailMessageId?: string;
  createdAt?: string;
  updatedAt?: string;
<<<<<<< HEAD
=======
=======
  createdAt?: string;
>>>>>>> dc76fe99c39430892f270c31a641850b11e26596
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
  statusTimestamps?: {
    placed: string;
    confirmed?: string;
    processing?: string;
<<<<<<< HEAD
    packed?: string;
    shipped?: string;
    in_transit?: string;
=======
<<<<<<< HEAD
    packed?: string;
    shipped?: string;
    in_transit?: string;
=======
    shipped?: string;
>>>>>>> dc76fe99c39430892f270c31a641850b11e26596
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
    out_for_delivery?: string;
    delivered?: string;
  };
}

export type PageType = 
  | 'home'
  | 'shop'
  | 'women'
  | 'men'
  | 'watches'
  | 'shoes'
  | 'accessories'
  | 'new_arrivals'
  | 'sale'
  | 'product_details'
  | 'cart'
  | 'wishlist'
  | 'checkout'
  | 'order_success'
  | 'order_tracking'
<<<<<<< HEAD
  | 'admin'
=======
<<<<<<< HEAD
  | 'admin'
=======
>>>>>>> dc76fe99c39430892f270c31a641850b11e26596
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
  | 'reviews'
  | 'help_support'
  | 'about';

export interface FilterState {
  category?: string;
  subCategory?: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  minRating: number;
  availability: 'all' | 'in_stock' | 'out_of_stock';
  collection?: string;
  discountOnly: boolean;
  newOnly: boolean;
  sort: 'featured' | 'newest' | 'bestseller' | 'price_asc' | 'price_desc' | 'rating_desc';
  searchQuery: string;
}
