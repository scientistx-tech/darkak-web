export interface Product {
  id: string | number;
  title: string;
  slug: string;
  Image: { url: string }[];
  price: number;
  originalPrice: number;
  storage: string;
  discount: number; // percentage
  rating: number;
  review: [];
  thumbnail: string;
  discount_type: string;
  items: {
    options: {
      id: number;
    }[];
  }[];
  avgRate: number;
  stock: number;
}
