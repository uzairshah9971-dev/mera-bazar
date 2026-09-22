export type CategoryId =
  | 'clothing'
  | 'shoes'
  | 'jewelry'
  | 'grocery'
  | 'food'
  | 'electronics'
  | 'mobile'
  | 'sports'
  | 'cosmetics'
  | 'furniture'
  | 'other';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  urduName?: string;
  iconName: string;
  itemCount: number;
  color: string;
}

export interface Shop {
  id: string;
  name: string;
  shopkeeperName: string;
  category: CategoryId;
  phone: string;
  whatsapp?: string;
  locationCity: string;
  division: string;
  province: string;
  address: string; // e.g., "Shop #24, Main Bank Road, near Jamia Masjid, Mardan"
  nearbyLandmark?: string;
  distanceKm: number;
  openingHours: string; // e.g. "9:00 AM - 9:30 PM"
  isOpenNow: boolean;
  description: string;
  coverImage: string;
  logoImage: string;
  isVerified: boolean; // Verified physical shop badge
  physicalSignboardPhoto?: string;
  deliveryAvailable: boolean;
  deliveryFee: number; // PKR
  deliveryRadiusKm: number;
  rating: number;
  reviewCount: number;
  productsCount: number;
  registeredDate: string;
  isPopular?: boolean;
  isRecent?: boolean;
}

export interface Product {
  id: string;
  shopId: string;
  shopName: string;
  shopLocation: string;
  shopkeeperName: string;
  name: string;
  price: number; // PKR
  originalPrice?: number; // PKR if discounted
  category: CategoryId;
  photos: string[];
  videoUrl?: string; // Short video preview
  description: string;
  isAvailable: boolean; // Available vs Sold Out
  isNewStock: boolean; // New Stock vs Existing
  offerDiscountPercent?: number;
  quantity: number;
  createdAt: string;
  tags?: string[];
  specifications?: Record<string, string>;
}

export type FulfillmentType = 'pickup' | 'delivery';

export type OrderStatus =
  | 'Pending'
  | 'Preparing'
  | 'Ready'
  | 'Out for delivery'
  | 'Completed'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
}

export interface Order {
  id: string;
  shopId: string;
  shopName: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  fulfillmentType: FulfillmentType;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  pickupTimeWindow?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'shopkeeper';
  text: string;
  timestamp: string;
  attachedProduct?: {
    id: string;
    name: string;
    price: number;
    photo: string;
  };
  orderRequest?: {
    fulfillmentType: FulfillmentType;
    quantity: number;
    total: number;
  };
}

export interface Conversation {
  id: string;
  shopId: string;
  shopName: string;
  shopLogo: string;
  shopkeeperName: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface RegionNode {
  id: string;
  name: string;
  type: 'country' | 'province' | 'division' | 'city' | 'bazaar';
  activeShopsCount: number;
  children?: RegionNode[];
}

export type ScreenId =
  | 'customer_home'
  | 'customer_categories'
  | 'search_explore'
  | 'product_details'
  | 'shop_profile'
  | 'customer_chat'
  | 'order_delivery'
  | 'customer_profile'
  | 'shopkeeper_dashboard'
  | 'add_product'
  | 'manage_products'
  | 'shopkeeper_orders'
  | 'shopkeeper_messages'
  | 'shopkeeper_profile'
  | 'admin_dashboard'
  | 'shop_approval'
  | 'product_shop_management'
  | 'regional_management';

export type ActiveRole = 'customer' | 'shopkeeper' | 'admin' | 'gallery';
