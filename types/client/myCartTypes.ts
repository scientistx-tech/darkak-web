// types/cart.ts

export interface CartItemOption {
  id: number;
  image: string;
  title: string;
  price: number;
  sku: string;
  stock: number;
  key: string;
  itemId: number;
  productId: number;
}

export interface CartItem {
  option: CartItemOption;
}

export interface Brand {
  title: string;
  icon: string;
}

export interface Product {
  title: string;
  thumbnail: string;
  stock: number;
  minOrder: number;
  price: number;
  discount: number;
  discount_type: 'flat' | 'percentage'; // adjust if more types exist
  brand: Brand;
  slug:string
}

export interface Cart {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  date: string; // ISO string
  cart_items: CartItem[];
  product: Product;
}

export interface CartResponse {
  message: string;
  cart: Cart[];
}
export interface AddToCartPayload {
  quantity: number;
  productId: number | string;
  optionIds?: number[]; // optional
}
