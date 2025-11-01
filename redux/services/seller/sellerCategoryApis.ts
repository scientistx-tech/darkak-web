import baseApi from "../../baseApi";

export const sellerCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/category${queryString}`,
          method: "GET",
        };
      },
    }),

    // sub category

    getSubCategoriesSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/sub-category${queryString}`,
          method: "GET",
        };
      },
    }),

    // sub sub category

    getSubSubCategoriesSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/sub-sub-category${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCategoriesSellerQuery,
  useGetSubCategoriesSellerQuery,
  useGetSubSubCategoriesSellerQuery,
} = sellerCategoryApi;
