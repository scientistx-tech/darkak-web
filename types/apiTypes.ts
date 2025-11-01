export type AccessType =
  | 'category'
  | 'venue'
  | 'news'
  | 'team'
  | 'player'
  | 'coach'
  | 'event'
  | 'fixture'
  | 'redirect';

export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isModerator: boolean;
  accessList: AccessType[];
  passwordUpdateAt: string; // ISO date string
}

export interface AdminLoginResponse {
  message: string;
  admin: Admin;
  token: string;
}

export type GameCategory = {
  details: Record<string, any>; // or a more specific type if you know the structure
  name: string;
  image: string;
  news: any[]; // Replace `any` with a specific `News` type if available
};

export type GameCategoryResponse = {
  message: string;
  category: GameCategory;
};

export interface Category {
  name: string;
  image: string;
  id: string;
  serial: number;
  images: string[];
  _count: {
    news: number;
  };
}
export interface Venue {
  id: string;
  name: string;
  image: string;
  details: Record<string, any>; // or a more specific type if known
}

export interface VenueResponse {
  venue: Venue;
}

type DeliveryInfo = {
  delivery_time: string;
  delivery_charge: string;
  delivery_time_outside: string;
  delivery_charge_outside: string;
  return_days: string;
  multiply?: string;
};

type AttributeOption = {
  title: string;
  image?: string;
  price?: number | string;
  stock?: number | string;
  key?: string;
  sku?: string;
};

type AttributeItem = {
  title: string;
  options: AttributeOption[];
};

type DiscountType = 'flat' | 'percentage';

export type Product = {
  title: string;
  short_description: string;
  meta_title: string;
  meta_image: string;
  video_link: string;
  thumbnail: string;
  price: string;
  discount_type: string;
  discount: string;
  tax_amount: string;
  tax_type: string;
  available: string;
  warranty: string;
  warranty_time: string;
  meta_keywords: string[];
  meta_description: string;
  region: string;
  stock: string;
  minOrder: string;
  unit: string;
  code: string;
  specification: string;
  description: string;
  warranty_details: string;
  categoryId: string;
  subCategoryId: string;
  subSubCategoryId: string;
  brandId: string;
  drafted: boolean;
  keywords: string[];
  images: string[];
  delivery_info: DeliveryInfo;
  items: AttributeItem[];
};

export type UpdateProduct = {
  title?: string;
  short_description?: string;
  meta_title?: string;
  meta_image?: string;
  video_link?: string;
  thumbnail?: string;
  price?: string;
  discount_type?: string;
  discount?: string;
  tax_amount?: string;
  tax_type?: string;
  available?: string;
  warranty?: string;
  warranty_time?: string;
  meta_keywords?: string[];
  meta_description?: string;
  region?: string;
  stock?: string;
  minOrder?: string;
  unit?: string;
  code?: string;
  specification?: string;
  description?: string;
  warranty_details?: string;
  categoryId?: string;
  subCategoryId?: string;
  subSubCategoryId?: string;
  brandId?: string;
  drafted?: boolean;
  keywords?: string[];
  images?: string[];
  delivery_info?: DeliveryInfo;
  items?: AttributeItem[];
};
export interface OrderAnalytics {
  adminOrders: Record<OrderStatus, number>;
  aeOrders: Record<OrderStatus, number>;
  vendorOrders: Record<OrderStatus, number>;
}

type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'packaging'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'failed_to_delivery'
  | 'pre-order';

export interface LiveMessage {
  id: number;
  message: string;
}

export interface LiveConversationTypes {
  id: number;
  sender_name: string;
  token: string;
  sender_number: string;
  updatedAt: string; // ISO date string
  live_messages: LiveMessage[];
}

interface MessageFile {
  id: number;
  url: string;
  createAt: string; // ISO date string
  messageId: number;
}

export interface LiveMessage {
  id: number;
  message: string;
  senderId: number | null;
  isReadBy: any | null; // adjust if you know the structure of `isReadBy`
  conversationId: number;
  createdAt: string; // ISO date string
  read: boolean;
  message_files: MessageFile[];
}
export interface BlogResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Blog[];
}

export interface Blog {
  id: number;
  name: string;
  title: string;
  thumbnail: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: {
    keywords: string[];
  };
  meta_image: string;
  meta_alt: string;
  content: string;
  faq: {
    faq: FAQ[];
  };
  date: string; // ISO date string
  published: boolean;
  slug:string
}

export interface FAQ {
  question: string;
  answer: string;
}


export interface CrateBlogType {
  name: string;
  title: string;
  thumbnail: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: {
    keywords: string[];
  };
  meta_image: string;
  meta_alt: string;
  content: string;
  faq: {
    faq: {
      question: string;
      answer: string;
    }[];
  };
}
