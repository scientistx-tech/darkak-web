import baseApi from "@/redux/baseApi";

export const scriptsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllScriptsPublic: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/public/script${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useGetAllScriptsPublicQuery } = scriptsApi;
