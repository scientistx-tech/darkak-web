import baseApi from '@/redux/baseApi';

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkCouponCode: builder.mutation<CouponResponse, { code: string; data: ApplyCouponPayload }>({
      query: ({ code, data }) => ({
        url: `/public/check-coupon/${code}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCheckCouponCodeMutation } = couponApi;

export interface Coupon {
  id: number;
  type: 'free-delivery' | 'percentage' | 'flat' | string; // extend as needed
  title: string;
  code: string;
  bearer: 'seller' | 'platform' | string; // adjust enum if fixed
  sellerId: number | null;
  limit: number;
  use_limit: number;
  discount_type: 'flat' | 'percentage' | string;
  discount_amount: number;
  subCategoryId: number | null;
  categoryId: number | null;
  subSubCategoryId: number | null;
  min_purchase: number;
  start_date: string; // ISO string
  end_date: string; // ISO string
  status: 'draft' | 'published' | 'expired' | string;
  coupon_user: any[]; // if you know the structure, replace `any[]` with proper type
}

export interface CouponResponse {
  message: string;
  coupon: Coupon;
}
export interface ApplyCouponPayload {
  total: number; // Total purchase amount (required)
  userId?: number | null; // Optional: logged-in user ID
  productIds: number[]; // Product IDs to apply coupon on (required)
  visitorId?: string; // Visitor/session ID (required for guests)
}
