// types/reviewTypes.ts

export interface Attachments {
  images: string[];
  videos: string[];
}

export interface Review {
  message: string;
  name: string;
  rate: number; // typically between 0 and 5
  attachments: Attachments;
  userId: number | undefined | string;
  productId: number 
}
