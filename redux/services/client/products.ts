import baseApi from "@/redux/baseApi";
import { AddToCartPayload, CartResponse } from "@/types/client/myCartTypes";

export const myCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSinglePublicProductDetails: builder.query({
      query: (slug) => ({
        url: `/public/product/${slug}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getAllProducts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/public/filter${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getNewArivalProducts: builder.query({
      query: (params?: string) => {
        return {
          url: `/public/new-arrival?${params}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getBestSellingProducts: builder.query({
      query: (params?: string) => {
        return {
          url: `/public/most-selling?${params}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getMostVisitedProducts: builder.query({
      query: (params?: string) => {
        return {
          url: `/public/most-visited?${params}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getTopRatedProducts: builder.query({
      query: (params?: string) => {
        return {
          url: `/public/top-rated?${params}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getBestDealProducts: builder.query({
      query: (params?: string) => {
        return {
          url: `/public/best-deal?${params}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getFeatured: builder.query({
      query: (params?: string) => {
        return {
          url: `/public/featured?${params}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useGetSinglePublicProductDetailsQuery,
  useGetAllProductsQuery,
  useGetNewArivalProductsQuery,
  useGetBestSellingProductsQuery,
  useGetMostVisitedProductsQuery,
  useGetTopRatedProductsQuery,
  useGetBestDealProductsQuery,
  useGetFeaturedQuery,
} = myCartApi;
