import baseApi from '@/redux/baseApi';
import { AddToCartPayload, CartResponse } from '@/types/client/myCartTypes';

export interface SSLCommerzOrder {
  shipping_method: string;
  product_name: string;
  product_category: string;
  product_profile: string;

  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_add2?: string;
  cus_city: string;
  cus_state?: string;
  cus_postcode: string;
  cus_country: string;
  cus_phone: string;
  cus_fax?: string;

  ship_name: string;
  ship_add1: string;
  ship_add2?: string;
  ship_city: string;
  ship_state?: string;
  ship_postcode: string | number;
  ship_country: string;

  order_ids: string[] | number[];
  cartIds: string[] | undefined;
}
export interface SSLCommerzInitResponse {
  url: string; // The GatewayPageURL for redirect
  status: 'SUCCESS' | 'FAILED'; // Success or Failed status
}

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderSingleProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: '/public/order',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),

    orderCartProducts: builder.mutation<any, any>({
      query: (data) => ({
        url: '/public/order-from-cart',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    getPaymentUrl: builder.mutation<SSLCommerzInitResponse, SSLCommerzOrder>({
      query: (body) => ({
        url: `/public/payment-url`,
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useOrderCartProductsMutation,
  useOrderSingleProductMutation,
  useGetPaymentUrlMutation,
} = checkoutApi;
