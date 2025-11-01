import baseApi from "@/redux/baseApi";

export const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubscriber: builder.mutation<any, any>({
      query: (body) => ({
        url: `/public/news-subscribe`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useAddSubscriberMutation } = subscribeApi;
