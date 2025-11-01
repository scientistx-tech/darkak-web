import { get } from "http";
import baseApi from "../../baseApi";

export const sellerRefundRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRefundRequestSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/refund/get/pending${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllUnderReviewRefundRequestSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/refund/get/under-review${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllApprovedRefundRequestSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/refund/get/approved${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllRejectedRefundRequestSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/refund/get/rejected${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllRefundedRefundRequestSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/refund/get/refunded${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getSingleRefundRequestDetailsSeller: builder.query({
      query: (id) => ({
        url: `/seller/refund/details/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    changeRefunRequestStatusSeller: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/seller/refund/status-update/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllRefundRequestSellerQuery,
  useGetAllApprovedRefundRequestSellerQuery,
  useGetAllUnderReviewRefundRequestSellerQuery,
  useGetAllRejectedRefundRequestSellerQuery,
  useGetAllRefundedRefundRequestSellerQuery,
  useGetSingleRefundRequestDetailsSellerQuery,
  useChangeRefunRequestStatusSellerMutation,
} = sellerRefundRequestApi;
