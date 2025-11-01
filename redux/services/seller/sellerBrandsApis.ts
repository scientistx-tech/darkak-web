import baseApi from "../../baseApi";

export const sellerBrandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandsSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/brands${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBrandsSellerQuery } = sellerBrandsApi;
