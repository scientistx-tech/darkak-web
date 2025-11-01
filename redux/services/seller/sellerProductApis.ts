import { Product, UpdateProduct } from "@/types/apiTypes";
import baseApi from "../../baseApi";

interface UpdateProductPayload {
  id: string;
  data: UpdateProduct;
}

export const sellerProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Product Attribute

    getProductAttributesSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";

        return {
          url: `/seller/product/attribute${queryString}`,
          method: "GET",
        };
      },
    }),

    // products

    createProductSeller: builder.mutation<any, Product>({
      query: (data) => ({
        url: "/seller/product/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    getProductsSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/get${queryString}`,
          method: "GET",
        };
      },
    }),

    getPendingProductsSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/get/pending${queryString}`,
          method: "GET",
        };
      },
    }),

    getApprovedProductsSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/get/approved${queryString}`,
          method: "GET",
        };
      },
    }),

    getRejectedProductsSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/get/rejected${queryString}`,
          method: "GET",
        };
      },
    }),

    createPorductRequestToAdmin: builder.mutation<any, any>({
      query: ({ data }) => ({
        url: `/seller/product/stock`,
        method: "POST",
        body: data,
      }),
    }),

    getRequestedProductsSeller: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/seller/product/request-list${queryString}`,
          method: "GET",
        };
      },
    }),

    createRestockRequestToAdmin: builder.mutation<any, any>({
      query: ({ data }) => ({
        url: `/seller/product/restock`,
        method: "POST",
        body: data,
      }),
    }),

    getSingleProductDetailsSeller: builder.query({
      query: (id) => ({
        url: `/seller/product/details/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateProductSeller: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/seller/product/update/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    deleteProductSeller: builder.mutation<any, number>({
      query: (productId) => ({
        url: `/seller/product/delete/${productId}`,
        method: "DELETE",
      }),
    }),

    // change product status

    updateDraftStatusSeller: builder.mutation<
      any,
      {
        id: string;
        data: { status: boolean };
      }
    >({
      query: ({ id, data }: { id: string; data: { status: boolean } }) => ({
        url: `/seller/product/update/drafted/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    updateTodaysDealStatusSeller: builder.mutation<
      any,
      {
        id: string;
        data: { status: boolean };
      }
    >({
      query: ({ id, data }: { id: string; data: { status: boolean } }) => ({
        url: `/seller/product/update/deal/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    updateFeatureStatusSeller: builder.mutation<
      any,
      {
        id: string;
        data: { status: boolean };
      }
    >({
      query: ({ id, data }: { id: string; data: { status: boolean } }) => ({
        url: `/seller/product/update/feature/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    // image uploads

    uploadImagesSeller: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/seller/product/upload-multiple-images",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductAttributesSellerQuery,
  useCreateProductSellerMutation,
  useGetProductsSellerQuery,
  useGetPendingProductsSellerQuery,
  useGetApprovedProductsSellerQuery,
  useGetRejectedProductsSellerQuery,
  useCreatePorductRequestToAdminMutation,
  useGetRequestedProductsSellerQuery,
  useCreateRestockRequestToAdminMutation,
  useGetSingleProductDetailsSellerQuery,
  useUpdateProductSellerMutation,
  useUploadImagesSellerMutation,
  useDeleteProductSellerMutation,
  useUpdateFeatureStatusSellerMutation,
  useUpdateTodaysDealStatusSellerMutation,
  useUpdateDraftStatusSellerMutation,
} = sellerProductApi;
