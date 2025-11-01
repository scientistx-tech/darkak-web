'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FailedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-2xl"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="mb-6 flex justify-center"
        >
          <XCircle className="h-12 w-12 text-red-500 md:h-16 md:w-16" />
        </motion.div>

        {/* Title */}
        <h1 className="mb-3 text-3xl font-bold text-gray-800">Payment Failed!</h1>
        <p className="mb-6 text-gray-600">
          Unfortunately, your transaction could not be completed. Please try again or use a
          different payment method.
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

        {/* Help text */}
        <p className="mt-6 text-sm text-gray-500">
          Need help?{' '}
          <Link href="/contact-us" className="font-medium text-red-500 hover:underline">
            Contact Support
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
