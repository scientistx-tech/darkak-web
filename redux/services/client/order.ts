import baseApi from "@/redux/baseApi";
import { Review } from "@/types/client/createReviewTypes";
import { ProductReviewResponse } from "@/types/client/myReviewsTypes";
import { Order } from "@/types/client/orderDetailsType";
import { OrderProductData, ReturnRequest } from "@/types/client/orderTypes";

export const clientOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<
      OrderProductData,
      { page?: number; limit?: number; status?: string }
    >({
      query: ({ page, limit }) =>
        `/user/order/get?page=${page}&limit=${limit}&status=${status}`,
    }),
    getMyReviews: builder.query<
      ProductReviewResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) =>
        `/user/review/get?page=${page}&limit=${limit}`,
    }),
     getOrderDetails: builder.query<Order, number>({
      query: (id) => `/user/order/details/${id}`,
    }),

    addReviewCreate: builder.mutation<{ message: string }, Review>({
      query: (body) => ({
        url: `/user/review/create`,
        method: "POST",
        body: body,
      }),
    }),
    addReturnRequest: builder.mutation<any, ReturnRequest>({
      query: (body) => ({
        url: `/user/return-request`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetMyReviewsQuery,
  useGetOrderDetailsQuery,
  useAddReviewCreateMutation,
  useAddReturnRequestMutation,
} = clientOrderApi;
