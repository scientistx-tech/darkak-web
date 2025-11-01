import baseApi from "@/redux/baseApi";
import { WishlistResponse } from "@/types/client/myWishlistType";

export const myWishListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWishList: builder.query<
      WishlistResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/user/wish/get?page=${page}&limit=${limit}`,
    }),
    addToWishList: builder.mutation<{ message: string }, { productId: number | string }>(
      {
        query: ({ productId }) => ({
          url: `/user/wish/create`,
          method: "POST",
          body: { productId },
        }),
      },
    ),
    deleteWishList: builder.mutation<any, number>({
      query: (wishID) => ({
        url: `/user/wish/delete/${wishID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMyWishListQuery,
  useAddToWishListMutation,
  useDeleteWishListMutation,
} = myWishListApi;
