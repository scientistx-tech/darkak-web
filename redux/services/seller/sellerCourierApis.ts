import baseApi from "../../baseApi";

export const sellerCourierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCourierSeller: builder.mutation<any, number>({
      query: (courierId) => ({
        url: `/seller/courier/delete/${courierId}`,
        method: "DELETE",
      }),
    }),

    getAllCourierSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/courier/get-all${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    // getSingleSlider: builder.query({
    //   query: (id) => ({
    //     url: `/admin/slider/get/${id}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }),
    // }),

    updateDeliveryProviderStatusSeller: builder.mutation<any, any>({
      query: (id) => ({
        url: `/seller/courier/update-status/${id}`,
        method: "GET",
      }),
    }),

    createDeliveryProviderSeller: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/seller/courier/create`,
        method: "POST",
        body: formData,
      }),
    }),

    createDeliverySeller: builder.mutation<any, any>({
      query: ({ courierId, orderId, data }) => ({
        url: `/seller/courier/delivery/${courierId}/${orderId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCourierSellerQuery,
  useCreateDeliveryProviderSellerMutation,
  useDeleteCourierSellerMutation,
  useUpdateDeliveryProviderStatusSellerMutation,
  useCreateDeliverySellerMutation,
} = sellerCourierApi;
