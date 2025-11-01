export interface WishlistResponse {
  message: string;
  totalPage: number;
  data: WishlistItem[];
}

export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  date: string;
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  code: string;
  short_description: string;
  meta_title: string;
  meta_image: string;
  meta_alt: string | null;
  video_link: string;
  thumbnail: string;
  thumbnail_alt: string | null;
  price: number;
  discount_type: string;
  discount: number;
  discount_type_mobile: string;
  discount_mobile: number;
  tax_amount: number;
  status: string;
  tax_type: string;
  aliexpress_id: number | null;
  aliexpress_benifit: any | null;
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
  ae_sku_property_dtos: any | null;
  faq: any | null;
  content: any | null;
  items: ProductItem[];
  brand: Brand;
}

export interface ProductItem {
  id: number;
  title: string;
  options: ProductOption[];
}

export interface ProductOption {
  id: number;
  image: string;
  title: string;
  price: number;
  sku: string;
  stock: number;
  alt: string | null;
  key: string | null;
  itemId: number;
  productId: number;
}
export interface Brand {
  id: number;
  title: string;
  slug: string;
  icon: string;
  userId: number;
}
