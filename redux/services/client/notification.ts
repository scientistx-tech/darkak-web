import baseApi from '@/redux/baseApi';
import { NotificationResponse } from '@/types/client/notificationTypes';

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationResponse, string | void>({
      query: (s) => `/user/notifications?admin=${s || ''}`,
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
