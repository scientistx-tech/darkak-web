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
  failed_reason: string | null;
  paymentType: string;
  paid: boolean;
  total: number;
  date: string;
  order_type: string;
  sellerId: number | null;
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  orderId: number;
  message: string;
  type: string;
  read: boolean;
  date: string;
  image: string | null;
  order: Order;
  conversationId:number
}

export interface NotificationResponse {
  message: string;
  notification: Notification[];
}
