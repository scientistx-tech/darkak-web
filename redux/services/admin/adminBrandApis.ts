import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFormDataBrand: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/admin/brand/create`,
        method: "POST",
        body: formData,
      }),
    }),

    updateBrand: builder.mutation<
      any,
      { categoryId: string; formData: FormData }
    >({
      query: ({ categoryId, formData }) => ({
        url: `/admin/brand/update/${categoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteBrand: builder.mutation<any, number>({
      query: (categoryId) => ({
        url: `/admin/brand/delete/${categoryId}`,
        method: "DELETE",
      }),
    }),

    getBrands: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/brand/get${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useUploadFormDataBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
} = adminApi;
