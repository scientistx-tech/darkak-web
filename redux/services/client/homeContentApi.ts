// src/redux/services/public/publicContentApi.ts

import baseApi from '@/redux/baseApi';
import { get } from 'http';
interface MessageFile {
  id: number;
  url: string;
  createAt: string; // ISO date string
  messageId: number;
}
export interface Message {
  id: number;
  message: string;
  senderId: number;
  isReadBy: number | null;
  conversationId: number;
  createdAt: string; // or use `Date` if parsed
  read: boolean;
  message_files: MessageFile[];
}
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  dob: string; // ISO string, can also use Date
  gender: 'male' | 'female' | 'other';
  isAdmin: boolean;
  image: string;
  socketId: string | null;
  pushToken: string | null;
  marital_status: 'single' | 'married' | 'other';
  anniversary_date: string | null;
  provider: string;
  token: string | null;
  isModerator: boolean;
  isSeller: boolean;
  updatePasswordAt: string;
  createdAt: string;
  isBlocked: boolean;
  isActive: boolean;
}
export interface Conversation {
  id: number;
  senderId: number;
  receiverId: number;
  createdAt: string;
  messages: Message[];
  sender: User;
  receiver: User;
  unreadCount: number;
}

export const publicContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeContent: builder.query<any, void>({
      query: () => ({
        url: '/public/home',
        method: 'GET',
      }),
    }),
    createConversation: builder.query<{ id: number }, string>({
      query: (id) => ({
        url: `/user/conversation/${id}`,
        method: 'GET',
      }),
    }),
    getConversationMessages: builder.query<Message[], number>({
      query: (id) => ({
        url: `/user/messages?conversationId=${id}`,
        method: 'GET',
      }),
    }),
    getConversation: builder.query<Conversation[], void>({
      query: () => ({
        url: `/user/conversations`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetHomeContentQuery,
  useCreateConversationQuery,
  useGetConversationMessagesQuery,
  useGetConversationQuery,
  useLazyCreateConversationQuery
} = publicContentApi;
