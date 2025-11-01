export interface WatchProduct {
  id: number;
  title: string;
  thumbnail: string;
  thumbnail_alt: string;
  additional: string;
  additional_alt: string;
  type: 'casual' | 'premium';
  arrival: boolean;
  publish: boolean;
  seller: boolean;
  date: string;
  productId: number;
  product: ProductDetail;
}
export interface WatchCategory {
  id: number;
  title: string;
  image: string;
  alt: string | null;
  subCategoryId: number;
  subCategory: {
    title: string;
    id: number;
    category: {
      title: string;
      id: number;
    };
  };
}
export interface WatchBrand {
  id: number;
  brandId: number;
  brand: {
    id: number;
    title: string;
    icon: string;
    userId: number;
  };
}
export interface WatchBanner {
  id: number;
  productId: number;
  type: 'casual' | 'premium';
  title: string;
  description: string;
  alt: string;
  image: string;
  product: {
    slug: string;
    id: number;
  };
}

export interface ProductDetail {
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
  discount_type: 'percentage' | 'flat';
  discount: number;
  discount_type_mobile: 'percentage' | 'flat';
  discount_mobile: number;
  tax_amount: number;
  status: 'approved' | string;
  tax_type: 'include' | 'exclude';
  aliexpress_id: string | null;
  aliexpress_benifit: string | null;
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
  ae_sku_property_dtos: any;
  faq: any;
  content: any;
  offerPrice: number;
}

export interface Poster {
  id: number;
  top_title: string;
  top_description: string;
  top_image: string;
  top_alt: string;
  poster_title: string;
  poster_description: string;
  poster_image: string;
  poster_alt: string;
  productId: number;
  product: {
    slug: string;
  };
}

export interface Slider {
  id: number;
  title: string;
  alt: string;
  image: string;
  productId: number;
  offer_name: string;
  date: string;
  product: {
    slug: string;
    id: number;
  };
}
export interface Review {
  id: number;
  rate: number; // 1 to 5 rating
  message: string;
  name: string;
  area: string;
  date: string; // ISO string (can be converted to Date if needed)
}

export interface HomeDataResponse {
  sliders: Slider[];
  poster: Poster;
  seller: WatchProduct[];
  arrivals: WatchProduct[];
  category: WatchCategory[];
  brands: WatchBrand[];
  banners: WatchBanner[];
  reviews: Review[];
}
export interface SellerProductResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: SellerProduct[];
}

export interface SellerProduct {
  id: number;
  title: string;
  thumbnail: string;
  thumbnail_alt: string;
  additional: string;
  additional_alt: string;
  type: 'casual' | 'premium' | string;
  arrival: boolean;
  publish: boolean;
  seller: boolean;
  date: string; // ISO string
  productId: number;
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
  discount_type: 'percentage' | 'flat' | string;
  discount: number;
  discount_type_mobile: 'percentage' | 'flat' | string;
  discount_mobile: number;
  tax_amount: number;
  status: 'approved' | 'drafted' | string;
  tax_type: 'include' | 'exclude' | string;
  aliexpress_id: string | null;
  aliexpress_benifit: string | null;
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
  ae_sku_property_dtos: any; // can define further if needed
  faq: any;
  content: any;
}
