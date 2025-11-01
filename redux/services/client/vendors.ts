import baseApi from "@/redux/baseApi";

export const publicVendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendorPublic: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params
          ? `?${new URLSearchParams(params).toString()}`
          : "";
        return {
          url: `/public/seller-all${queryString}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getVendorDetailsById: builder.query({
      query: (id) => ({
        url: `/public/seller/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

const { useGetAllVendorPublicQuery, useGetVendorDetailsByIdQuery } =
  publicVendorApi;
