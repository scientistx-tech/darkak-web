import baseApi from "@/redux/baseApi";

export const publicSliderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicSliders: builder.query<any, { type: string }>({
      query: ({ type }) => ({
        url: `/public/slider?sort=${type}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetPublicSlidersQuery } = publicSliderApi;
