import { AuthResponse, User } from '@/types/userTypes';
import baseApi from '../baseApi';
import { LiveConversationTypes, LiveMessage } from '@/types/apiTypes';

export interface Sender {
  id: number; // Unique identifier for the sender
  sender_name: string; // Name of the sender (e.g., "BKASH")
  token: string; // Reference or authentication token
  sender_number: string; // Sender’s phone number
  updatedAt: string; // Last updated timestamp (ISO format)
}

export const liveChatApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLiveChatStatus: builder.query<{ status: boolean }, void>({
      query: () => `/public/live-message`,
    }),
    toggleLiveChatStatus: builder.query<{ status: boolean }, void>({
      query: () => `/admin/contact/live-message`,
    }),
    createLiveChat: builder.mutation<Sender, { token: string; phone: string; name: string }>({
      query: (body) => ({
        url: `/public/live-message`,
        method: 'POST',
        body,
      }),
    }),
    getLiveConversations: builder.query<LiveConversationTypes[], void>({
      query: () => `/admin/contact/live-conversation`,
    }),
    getLiveMessages: builder.query<LiveMessage, string>({
      query: (id) => `/admin/contact/live-message/${id}`,
    }),
  }),
});

export const {
  useGetLiveChatStatusQuery,
  useCreateLiveChatMutation,
  useGetLiveConversationsQuery,
  useGetLiveMessagesQuery,
  useToggleLiveChatStatusQuery,
  useLazyToggleLiveChatStatusQuery
} = liveChatApis;
