// types/orderTypes.ts

export interface Product {
  id: number;
  title: string;
  slug: string;
  code: string;
  short_description: string;
  meta_title: string;
  meta_image: string;
  video_link: string;
  thumbnail: string;
  price: number;
  discount_type: 'percentage' | 'fixed' | string;
  discount: number;
  tax_amount: number;
  status: 'approved' | 'pending' | 'rejected' | string;
  tax_type: 'include' | 'exclude' | string;
  available: 'in-stock' | 'out-of-stock' | string;
  warranty: string;
  warranty_time: string;
  region: string;
  stock: number;
  minOrder: number;
  unit: string;
  specification: string;
  description: string;
  warranty_details: string;
  drafted: boolean;
  scheduled_time: string | null;
  meta_description: string;
  deal: boolean;
  feature: boolean;
  categoryId: number;
  subCategoryId: number;
  subSubCategoryId: number;
  brandId: number;
  userId: number;
  date: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  orderId: string;
  userId: number;
  name: string;
  email: string;
  phone: string;
  division: string;
  district: string;
  sub_district: string;
  area: string;
  subTotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
  paymentType: 'cod' | 'online' | 'bank' | string;
  paid: boolean;
  total: number;
  date: string;
  order_type: 'in-house' | 'third-party' | string;
  sellerId: number | null;
  order_items: OrderItem[];
}
