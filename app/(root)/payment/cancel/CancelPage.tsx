'use client';

import React from 'react';

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Card */}
      <div className="animate-fadeIn w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h1 className="mb-6 text-xl md:text-3xl font-extrabold text-primaryBlue">
          Darkak — Secure Payment Gateway
        </h1>

        {/* Cancel Icon */}
        <div className="mb-4 flex justify-center">
          <XCircle className="h-12 w-12 md:h-16 md:w-16 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Payment Cancelled</h1>

        {/* Message */}
        <p className="mb-6 text-gray-600">
          Oops! It looks like your payment was not completed. Don&apos;t worry, you can try again or
          continue shopping.
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/easy-checkout"
            className="rounded-xl bg-primaryBlue px-6 py-3 font-semibold text-white shadow transition hover:bg-primaryBlue/90"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 shadow transition hover:bg-gray-200"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Darkak. All rights reserved.
      </p>
    </div>
  );
}
