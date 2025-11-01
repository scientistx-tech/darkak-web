import baseApi from '@/redux/baseApi';

export const adminVendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorsReview: builder.query({
      query: ({ id, params }: { id: number; params?: Record<string, string> }) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/vendor/reviews/${id}/${queryString}`,
          method: 'GET',
        };
      },
    }),

    getVendorsTransaction: builder.query({
      query: ({ id, params }: { id: number; params?: Record<string, string> }) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/vendor/transactions/${id}${queryString}`,
          method: 'GET',
        };
      },
    }),

    getVendorsProduct: builder.query({
      query: ({ id }) => ({
        url: `/admin/vendor/products/${id}`,
        method: 'GET',
      }),
    }),

    getVendorsOrder: builder.query({
      query: ({ id }) => ({
        url: `/admin/vendor/orders/${id}`,
        method: 'GET',
      }),
    }),

    getVendorDetailsByIdAdmin: builder.query({
      query: ({ id }) => ({
        url: `/admin/vendor/details/${id}`,
        method: 'GET',
      }),
    }),

    changeVendorStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/vendor/status-update-vendor/${id}`,
        method: 'GET',
      }),
    }),

    getAllVendors: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/vendor/get${queryString}`,
          method: 'GET',
        };
      },
    }),
    getAllVendorsPublic: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/public/seller-all${queryString}`,
          method: 'GET',
        };
      },
    }),

    createVendor: builder.mutation<any, any>({
      query: (data) => ({
        url: '/admin/vendor/create',
        method: 'POST',
        body: data,
      }),
    }),

    getVendorComissionSetting: builder.query({
      query: ({ id }) => ({
        url: `/admin/vendor/commission/${id}`,
        method: 'GET',
      }),
    }),

    updateVendorComissionSetting: builder.mutation<any, { data: { charge: number }; id: number }>({
      query: ({ data, id }) => ({
        url: `/admin/vendor/commission/${id}`,
        method: 'POST',
        body: data,
      }),
    }),

    getVendorsRequestedProducts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/vendor/get-product-request/pending${queryString}`,
          method: 'GET',
        };
      },
    }),

    getVendorsApprovedProducts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/vendor/get-product-request/approved${queryString}`,
          method: 'GET',
        };
      },
    }),

    getVendorsRejectedProducts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/vendor/get-product-request/rejected${queryString}`,
          method: 'GET',
        };
      },
    }),

    changeVendorsProductRequestStatus: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/vendor/reuest/update/${id}`,
        method: 'POST',
        body: data,
      }),
    }),

    getVendorsProductRequestCounts: builder.query<any, any>({
      query: () => ({
        url: '/admin/vendor/get-product-request-count',
        method: 'GET',
      }),
    }),

    getVendorsRestockRequestedProducts: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/vendor/get-product-request/re-request${queryString}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetVendorsReviewQuery,
  useGetVendorsTransactionQuery,
  useGetVendorsProductQuery,
  useGetVendorsOrderQuery,
  useGetVendorDetailsByIdAdminQuery,
  useChangeVendorStatusMutation,
  useGetAllVendorsQuery,
  useCreateVendorMutation,
  useGetVendorComissionSettingQuery,
  useUpdateVendorComissionSettingMutation,
  useGetVendorsRequestedProductsQuery,
  useGetVendorsApprovedProductsQuery,
  useGetVendorsRejectedProductsQuery,
  useChangeVendorsProductRequestStatusMutation,
  useGetVendorsProductRequestCountsQuery,
  useGetVendorsRestockRequestedProductsQuery,
  useGetAllVendorsPublicQuery,
} = adminVendorApi;
