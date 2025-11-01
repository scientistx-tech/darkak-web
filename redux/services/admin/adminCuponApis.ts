import baseApi from "@/redux/baseApi";

export const adminCupon = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCupon: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/coupon/get${queryString}`,
          method: "GET",
        };
      },
    }),

    updateCouponStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/coupon/change-status/${id}`,
      }),
    }),

    updateCoupon: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/coupon/update",
        method: "PUT",
        body: data,
      }),
    }),

    deleteCoupon: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/coupon/delete/${id}`,
        method: "DELETE",
      }),
    }),

    createCupon: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/coupon/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCuponQuery,
  useUpdateCouponStatusMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useCreateCuponMutation,
} = adminCupon;
