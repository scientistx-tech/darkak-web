import { User } from "@/types/admin/customerListTyes";
import baseApi from "../../baseApi";

export const sellerCustomerReviewList = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerReviewsSeller: builder.query({
      query: (params?: Record<any, any>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/user/reviews${queryString}`,
          method: "GET",
        };
      },
    }),

    changeCustomerReviewStatusSeller: builder.mutation<any, any>({
      query: (id) => ({
        url: `/seller/user/update-status-review/${id}`,
        method: "GET",
      }),
    }),

    getCustomersListSeller: builder.query({
      query: (params?: Record<any, any>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/user/get${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCustomerReviewsSellerQuery,
  useGetCustomersListSellerQuery,
  useChangeCustomerReviewStatusSellerMutation,
} = sellerCustomerReviewList;
