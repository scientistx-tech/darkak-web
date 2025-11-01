import baseApi from "../../baseApi";

export const adminScriptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteScript: builder.mutation<any, number>({
      query: (scriptId) => ({
        url: `/admin/script/delete/${scriptId}`,
        method: "DELETE",
      }),
    }),

    getAllScripts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/script/get${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    // getSingleSlider: builder.query({
    //   query: (id) => ({
    //     url: `/admin/slider/get/${id}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }),
    // }),

    updateScripts: builder.mutation<any, any>({
      query: ({ id, formData }) => ({
        url: `/admin/script/update/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    createScript: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/admin/script/add`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useDeleteScriptMutation,
  useGetAllScriptsQuery,
  useUpdateScriptsMutation,
  useCreateScriptMutation,
} = adminScriptApi;
