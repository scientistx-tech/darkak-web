import baseApi from "@/redux/baseApi";
import { AddToCartPayload, CartResponse } from "@/types/client/myCartTypes";

export const myCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCart: builder.query<CartResponse, void>({
      query: () => `/user/cart/get`,
    }),
    addToCart: builder.mutation<{ message: string }, AddToCartPayload>({
      query: (body) => ({
        url: `/user/cart/create`,
        body: body,
        method: "POST",
      }),
    }),
    deleteCart: builder.mutation<any, number>({
      query: (cartID) => ({
        url: `/user/cart/delete/${cartID}`,
        method: "DELETE",
      }),
    }),
    updateCart: builder.mutation<any, { id: number; quantity: number }>({
      query: (cartID) => ({
        url: `/user/cart/update/${cartID.id}`,
        method: "PUT",
        body: { quantity: cartID.quantity },
      }),
    }),
  }),
});

export const {
  useGetMyCartQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation
} = myCartApi;
