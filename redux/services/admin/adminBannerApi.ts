import baseApi from "../../baseApi";

export const adminBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPageBanner: builder.query<any, void>({
        query: () => ({
        url: `/admin/page/get-banner`,
          method: "GET",
        }),
      }),
      
      updatePageBanner: builder.mutation<any, any>({
        query: (formData) => ({
              url: `/admin/page/update-banner`,
          method: "POST",
          body: formData,
        }),
      }),

  }),
});

export const {
 useUpdatePageBannerMutation,
 useGetPageBannerQuery,
} = adminBannerApi;
