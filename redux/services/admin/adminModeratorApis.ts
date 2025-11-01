import baseApi from "../../baseApi";

export const adminModeratorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteModerator: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admin/moderator/delete/${id}`,
        method: "DELETE",
      }),
    }),

    getAllModerator: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/admin/moderator/get${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    updateModeratorStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/moderator/status-change/${id}`,
        method: "GET",
      }),
    }),

    updateModeratorAccess: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/moderator/update-access/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    createModerator: builder.mutation<any, any>({
      query: (data) => ({
        url: `/admin/moderator/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteModeratorMutation,
  useGetAllModeratorQuery,
  useUpdateModeratorStatusMutation,
  useUpdateModeratorAccessMutation,
  useCreateModeratorMutation,
} = adminModeratorApi;
