import baseApi from '@/redux/baseApi';
import { OrderAnalytics } from '@/types/apiTypes';

export const adminDashboard = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardData: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/dashboard/statics${queryString}`,
          method: 'GET',
        };
      },
    }),

    orderStatistics: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/dashboard/orders${queryString}`,
          method: 'GET',
        };
      },
    }),

    earningStatistics: builder.query({
      query: (params?: Record<string, string>) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return {
          url: `/admin/dashboard/earnings${queryString}`,
          method: 'GET',
        };
      },
    }),
    getOrdersStatistics: builder.query<OrderAnalytics, void>({
      query: () => {
        return {
          url: `/admin/orders/statics`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useDashboardDataQuery,
  useOrderStatisticsQuery,
  useEarningStatisticsQuery,
  useGetOrdersStatisticsQuery,
} = adminDashboard;
