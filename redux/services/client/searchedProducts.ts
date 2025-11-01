import baseApi from "@/redux/baseApi";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchPublic: builder.query({
      query: (params?: Record<string, string | number>) => {
        const queryString = params ? new URLSearchParams(params as any).toString() : '';
        return {
          url: `/public/filter?${queryString}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetSearchPublicQuery } = searchApi;
