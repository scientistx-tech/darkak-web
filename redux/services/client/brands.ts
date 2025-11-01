import baseApi from "@/redux/baseApi";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandsPublic: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/public/brands${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBrandsPublicQuery } = brandApi;
