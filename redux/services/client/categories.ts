import baseApi from "@/redux/baseApi";
import { Category } from "@/types/client/categoriesTypes";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductCategories: builder.query<Category[], string | void>({
      query: (search = "") => `/public/category?search=${search}`,
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.log("Error fetching categories:", error);
        }
      },
    }),
  }),
});

export const { useGetProductCategoriesQuery } = categoryApi;
