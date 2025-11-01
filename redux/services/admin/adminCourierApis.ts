import baseApi from "../../baseApi";

export const adminCourierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCourier: builder.mutation<any, number>({
      query: (courierId) => ({
        url: `/admin/courier/delete/${courierId}`,
        method: "DELETE",
      }),
    }),

    getAllCourier: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/courier/get-all${queryString}`,
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

    updateDeliveryProviderStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/courier/update-status/${id}`,
        method: "GET",
      }),
    }),

    createDeliveryProvider: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/admin/courier/create`,
        method: "POST",
        body: formData,
      }),
    }),

    createDelivery: builder.mutation<any, any>({
      query: ({ courierId, orderId, data }) => ({
        url: `/admin/courier/delivery/${courierId}/${orderId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCourierQuery,
  useCreateDeliveryProviderMutation,
  useDeleteCourierMutation,
  useUpdateDeliveryProviderStatusMutation,
  useCreateDeliveryMutation,
} = adminCourierApi;
