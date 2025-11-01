import { AuthResponse, User } from '@/types/userTypes';
import baseApi from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<
      User,
      Partial<
        Pick<User, 'name' | 'phone' | 'dob' | 'gender' | 'marital_status' | 'anniversary_date'>
      >
    >({
      query: (body) => ({
        url: `/user/update`,
        body: body,
        method: 'PUT',
      }),
    }),
    updateUserAddress: builder.mutation<
      AuthResponse,
      { area: string; division: string; sub_district: string; district: string }
    >({
      query: (body) => ({
        url: `/user/update/address`,
        body: body,
        method: 'PUT',
      }),
    }),
    updateUserProfilePicture: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `/user/upload-picture`,
        body: body,
        method: 'PUT',
      }),
    }),
    uploadMultipleImages: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `/user/upload-multiple-images`,
        body: body,
        method: 'POST',
      }),
    }),
    uploadMultipleImagesPublic: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `/public/upload-multiple-images`,
        body: body,
        method: 'POST',
      }),
    }),
    uploadVideos: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `/user/upload-video`,
        body: body,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdateUserAddressMutation,
  useUpdateUserProfilePictureMutation,
  useUploadMultipleImagesMutation,
  useUploadMultipleImagesPublicMutation,
  useUploadVideosMutation,
} = authApi;
