import baseApi from '@/redux/baseApi';

export const sitemapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSiteMaps: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `/admin/sitemap?page=${page}&limit=${limit}`,
    }),
    createSiteMap: builder.mutation({
      query: (body) => ({
        url: `/admin/sitemap`,
        method: 'POST',
        body,
      }),
    }),
    updateSiteMap: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/sitemap/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteSiteMap: builder.mutation({
      query: (id) => ({
        url: `/admin/sitemap/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSiteMapsQuery,
  useCreateSiteMapMutation,
  useUpdateSiteMapMutation,
  useDeleteSiteMapMutation,
} = sitemapApi;
