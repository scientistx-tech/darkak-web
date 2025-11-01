import baseApi from "../../baseApi";

export const adminContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query<any, void>({
        query: () => ({
          url: `/admin/page/get-content`,
          method: "GET",
        }),
      }),
      
      updatePageContent: builder.mutation<any, any>({
        query: (formData) => ({
          url: `/admin/page/update-content`,
          method: "POST",
          body: formData,
        }),
      }),

  }),
});

export const {
  useGetPageContentQuery,
  useUpdatePageContentMutation,
} = adminContentApi;
