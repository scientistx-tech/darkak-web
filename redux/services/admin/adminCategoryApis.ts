import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFormData: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/admin/category/create`,
        method: "POST",
        body: formData,
      }),
    }),

    updateCategory: builder.mutation<
      any,
      { categoryId: string; formData: FormData }
    >({
      query: ({ categoryId, formData }) => ({
        url: `/admin/category/create/${categoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteCategory: builder.mutation<any, number>({
      query: (categoryId) => ({
        url: `/admin/category/create/${categoryId}`,
        method: "DELETE",
      }),
    }),

    getCategories: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/category/create${queryString}`,
          method: "GET",
        };
      },
    }),

    // sub category

    createSubCategory: builder.mutation<
      any,
      { title: string; categoryId: number }
    >({
      query: (data) => ({
        url: `/admin/category/sub-category`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    updateSubCategory: builder.mutation<
      any,
      { subCategoryId: string; formData: any }
    >({
      query: ({ subCategoryId, formData }) => ({
        url: `/admin/category/sub-category/${subCategoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteSubCategory: builder.mutation<any, number>({
      query: (subCategoryId) => ({
        url: `/admin/category/sub-category/${subCategoryId}`,
        method: "DELETE",
      }),
    }),

    getSubCategories: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/category/sub-category${queryString}`,
          method: "GET",
        };
      },
    }),

    // sub sub category

    createSubSubCategory: builder.mutation<
      any,
      { title: string; categoryId: number; subCategoryId: number }
    >({
      query: (data) => ({
        url: `/admin/category/sub-sub-category`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    updateSubSubCategory: builder.mutation<
      any,
      { subSubCategoryId: string; formData: any }
    >({
      query: ({ subSubCategoryId, formData }) => ({
        url: `/admin/category/sub-sub-category/${subSubCategoryId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteSubSubCategory: builder.mutation<any, number>({
      query: (subSubCategoryId) => ({
        url: `/admin/category/sub-sub-category/${subSubCategoryId}`,
        method: "DELETE",
      }),
    }),

    getSubSubCategories: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/category/sub-sub-category${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useUploadFormDataMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useCreateSubSubCategoryMutation,
  useDeleteSubSubCategoryMutation,
  useGetSubSubCategoriesQuery,
  useUpdateSubSubCategoryMutation,
} = adminApi;
