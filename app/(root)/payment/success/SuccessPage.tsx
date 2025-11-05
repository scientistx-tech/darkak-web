'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { setCart } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

export default function SuccessPage() {
  const params = useSearchParams();

  let orderIds: string[] = [];
  if (params.get("orderIds")) {
    try {
      orderIds = JSON.parse(params.get("orderIds") as string);
    } catch {
      orderIds = [];
    }
  }
  const total = params.get('total');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCart(Math.random()));
    localStorage?.removeItem('checkout_items');
  }, [localStorage]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-12 w-12 animate-bounce text-green-500 md:h-16 md:w-16" />
        </div>

        {/* Title */}
        <h1 className="mb-3 text-2xl font-bold text-gray-800">Payment Successful 🎉</h1>

        {/* Subtitle */}
        <p className="mb-6 text-gray-600">
          Thank you for your purchase! Your order has been confirmed and is now being processed. You
          will receive an email confirmation shortly.
        </p>

        {/* Order Summary (demo) */}
        <div className="mb-6 rounded-xl bg-gray-50 p-5 text-left shadow-inner">
          <p className="font-semibold text-gray-700">Order Summary</p>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Order ID:</span>
            <span>#{orderIds?.join(", ")}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Total:</span>
            <span>৳{total}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Status:</span>
            <span className="font-semibold text-green-600">Confirmed</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-primaryBlue px-6 py-3 text-white shadow-md transition hover:bg-primaryBlue/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
