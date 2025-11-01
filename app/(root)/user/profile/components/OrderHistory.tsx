'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGetMyOrdersQuery } from '@/redux/services/client/order';
import { OrderProduct } from '@/types/client/orderTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function OrderHistory() {
  const lang = useSelector((state: RootState) => state.language.language);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetMyOrdersQuery({ page, limit });

  if (isLoading) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-primaryBlue">
        {lang === 'bn' ? 'আপনার অর্ডার লোড হচ্ছে...' : 'Loading your orders...'}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-red-500">
        {lang === 'bn'
          ? 'অর্ডার ইতিহাস লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
          : 'Failed to load order history. Please try again later.'}
      </div>
    );
  }

  const orders = data.data;
  const totalPages = data.totalPages;

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-2 shadow-2xl backdrop-blur-md md:p-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        {lang === 'bn' ? 'অর্ডার ইতিহাস' : 'Order History'}
      </h2>

      {/* Table Head */}
      <div className="grid grid-cols-4 px-2 pb-4 text-gray-600 md:px-6 md:font-semibold">
        <div>{lang === 'bn' ? 'পণ্য' : 'Product'}</div>
        <div>{lang === 'bn' ? 'মূল্য' : 'Price'}</div>
        <div>{lang === 'bn' ? 'অর্ডারের তারিখ' : 'Order Date'}</div>
        <div>{lang === 'bn' ? 'ডেলিভারি স্ট্যাটাস' : 'Delivery Status'}</div>
      </div>

      <div className="space-y-6">
        {orders.map((order: OrderProduct) => (
          <div
            key={order.id}
            className="grid grid-cols-4 items-center rounded-2xl bg-white/60 p-2 shadow-md backdrop-blur-md md:p-4"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={order.product.thumbnail}
                alt={order.product.title}
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <span className="hidden font-medium md:block">
                {order.product.title.length > 27
                  ? order.product.title.substring(0, 27) + '...'
                  : order.product.title}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="font-medium text-black md:hidden">{order.product.title}</div>
              <div className="font-medium text-gray-700">৳ {order.product.price.toFixed(2)}</div>
            </div>

            <div className="text-gray-500">
              {new Date(order.order.date).toLocaleDateString('en-BD', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                  order.order.status === 'delivered'
                    ? 'bg-green-100 text-green-600'
                    : order.order.status === 'packaging'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-red-100 text-red-600'
                }`}
              >
                {order.order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            {lang === 'bn' ? 'আগেরটি' : 'Previous'}
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            {lang === 'bn' ? 'পরবর্তী' : 'Next'}
          </button>
        </div>

        {/* Optional limit selector */}
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="limit" className="text-gray-600">
            {lang === 'bn' ? 'প্রতি পৃষ্ঠায় অর্ডার সংখ্যা:' : 'Orders per page:'}
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-700"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
      </div>
    </div>
  );
}
