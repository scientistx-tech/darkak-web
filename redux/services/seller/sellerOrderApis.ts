import { Product, UpdateProduct } from "@/types/apiTypes";
import baseApi from "../../baseApi";

interface UpdateProductPayload {
  id: string;
  data: UpdateProduct;
}

export const sellerOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // orders

    getOrdersSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/order/get${queryString}`,
          method: "GET",
        };
      },
    }),

    getOrderDetailsSeller: builder.query({
      query: (id: string) => ({
        url: `/seller/order/details/${id}`,
        method: "GET",
      }),
    }),

    // change product status

    updatePaymentStatusSeller: builder.mutation<any, any>({
      query: (id) => ({
        url: `/seller/order/payment/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateOrderStatusSeller: builder.mutation<
      any,
      {
        id: string;
        data: { status: string; message?: string };
      }
    >({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { status: string; message?: string };
      }) => ({
        url: `/seller/order/status/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOrdersSellerQuery,
  useGetOrderDetailsSellerQuery,
  useUpdateOrderStatusSellerMutation,
  useUpdatePaymentStatusSellerMutation,
} = sellerOrderApi;
