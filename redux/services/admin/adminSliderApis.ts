import { get } from "http";
import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteSlider: builder.mutation<any, number>({
      query: (sliderId) => ({
        url: `/admin/slider/delete/${sliderId}`,
        method: "DELETE",
      }),
    }),

    getAllSliders: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/slider/get${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getSingleSlider: builder.query({
      query: (id) => ({
        url: `/admin/slider/get/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateSlider: builder.mutation<any, any>({
      query: ({ id, formData }) => ({
        url: `/admin/slider/update/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    uploadFormDataSlider: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/admin/slider/create`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useDeleteSliderMutation,
  useGetAllSlidersQuery,
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
  useUploadFormDataSliderMutation,
} = adminApi;
