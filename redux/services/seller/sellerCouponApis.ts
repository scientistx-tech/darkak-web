import baseApi from "@/redux/baseApi";

export const sellerCupon = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCuponSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/coupon/get${queryString}`,
          method: "GET",
        };
      },
    }),

    updateCouponStatusSeller: builder.mutation<any, any>({
      query: (id) => ({
        url: `/seller/coupon/change-status/${id}`,
      }),
    }),

    updateCouponSeller: builder.mutation<any, any>({
      query: (data) => ({
        url: "/seller/coupon/update",
        method: "PUT",
        body: data,
      }),
    }),

    deleteCouponSeller: builder.mutation<any, any>({
      query: (id) => ({
        url: `/seller/coupon/delete/${id}`,
        method: "DELETE",
      }),
    }),

    createCuponSeller: builder.mutation<any, any>({
      query: (data) => ({
        url: "/seller/coupon/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCuponSellerQuery,
  useUpdateCouponStatusSellerMutation,
  useUpdateCouponSellerMutation,
  useDeleteCouponSellerMutation,
  useCreateCuponSellerMutation,
} = sellerCupon;
