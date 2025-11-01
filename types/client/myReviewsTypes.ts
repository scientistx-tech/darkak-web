// types/productTypes.ts

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
  discount_type: 'percentage' | 'fixed';
  discount: number;
  tax_amount: number;
  status: 'approved' | 'pending' | 'rejected';
  tax_type: 'include' | 'exclude';
  available: 'in-stock' | 'out-of-stock';
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
  review?: Review[]; // Optional for items in 'history'
}

export interface Review {
  id: number;
  message: string;
  name: string;
  rate: number;
  attachments: {
    images: string[];
    videos: string[];
  };
  userId: number;
  productId: number;
  date: string;
}

export interface PaginatedProducts {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Product[];
}

export interface ProductReviewResponse {
  toReview: PaginatedProducts;
  history: PaginatedProducts;
}
