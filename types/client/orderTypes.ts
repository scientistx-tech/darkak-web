// types/orderProductData.ts

import { Review } from './myReviewsTypes';

export interface OrderProductData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
  order: Order;
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
  status: string;
  paymentType: string;
  paid: boolean;
  total: number;
  date: string;
  order_type: string;
  sellerId: number | null;
}

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
  discount_type: string;
  discount: number;
  tax_amount: number;
  status: string;
  tax_type: string;
  available: string;
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
  review: Review[];
}

export interface ReturnRequest {
  returened_method: string;
  message: string;
  orderItemId: number;
  files: {
    images: string[];
    videos: string[];
  };
}
