import baseApi from '../../baseApi';

export const adminFaqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query<any, void>({
      query: () => ({
        url: `admin/page/get-faq`,
        method: 'GET',
      }),
    }),

    createFaq: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/admin/page/create-faq`,
        method: 'POST',
        body: formData,
      }),
    }),

    updateFaq: builder.mutation<any, { id: string | number; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/page/update-faq/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteFaq: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/admin/page/delete-faq/${id}`,
        method: 'DELETE',
      }),
    }),
    getSeoPageData: builder.query<any, string>({
      query: (type) => `/public/page-seo/${type}`,
    }),
  }),
});

export const {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useGetSeoPageDataQuery,
} = adminFaqApi;
