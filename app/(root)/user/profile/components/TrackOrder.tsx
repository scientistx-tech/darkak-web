'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGetMyOrdersQuery, useGetOrderDetailsQuery } from '@/redux/services/client/order';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Pagination } from 'antd';

const steps = [
  {
    title: 'Pending',
    description: 'We received your order.',
  },
  {
    title: 'Processing',
    description: 'Your order is being prepared.',
  },
  {
    title: 'Shipped',
    description: 'Your order is on the way.',
  },
  {
    title: 'Delivered',
    description: 'Order delivered to your address.',
  },
];

const stepsBn = [
  {
    title: 'মুলতুবি',
    description: 'আমরা আপনার অর্ডার পেয়েছি।',
  },
  {
    title: 'প্রসেসিং',
    description: 'আপনার অর্ডার প্রস্তুত করা হচ্ছে।',
  },
  {
    title: 'পাঠানো হয়েছে',
    description: 'আপনার অর্ডার পাঠানো হয়েছে।',
  },
  {
    title: 'ডেলিভারড',
    description: 'অর্ডার আপনার ঠিকানায় পৌঁছে গেছে।',
  },
];

const getStepFromStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 0;
    case 'processing':
      return 1;
    case 'shipped':
      return 2;
    case 'delivered':
      return 3;
    default:
      return 0;
  }
};

export default function TrackOrder() {
  const lang = useSelector((state: RootState) => state.language.language);
  const isBn = lang === 'bn';

  const [orderId, setOrderId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: ordersData } = useGetMyOrdersQuery({ page, limit });

  useEffect(() => {
    if (ordersData?.data?.length && orderId === undefined) {
      setOrderId(ordersData.data[0].orderId);
    }
  }, [ordersData, orderId]);

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(Number(orderId), {
    skip: orderId === undefined,
  });

  const activeStep = getStepFromStatus(order?.status || '');
  const localizedSteps = isBn ? stepsBn : steps;

  return (
    <div className="mx-auto w-full max-w-7xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-4 shadow-2xl backdrop-blur-md md:p-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        {isBn ? 'এখানে আপনার অর্ডার ট্র্যাক করুন' : 'Track your order here'}
      </h2>

      {/* Product Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordersData?.data
          ?.filter((item) => item.order.status !== 'canceled')
          .map((item) => {
            const isActive = item.orderId === orderId;
            return (
              <div
                key={item.id}
                onClick={() => setOrderId(item.orderId)}
                className={`flex cursor-pointer items-center rounded-xl p-4 transition hover:shadow-lg ${isActive ? 'bg-blue-100 ring-2 ring-primaryBlue' : 'bg-white shadow-md'
                  }`}
              >
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-md font-semibold">
                    {item.product.title.length > 27
                      ? item.product.title.substring(0, 27) + '...'
                      : item.product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} {item.product.unit} / {item.product.price}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={limit}
          total={ordersData?.totalPages || 0}
          onChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top on page change
          }}
          showSizeChanger={false}
          showQuickJumper
          className="ant-pagination"
        />
      </div>

      {/* Step Tracker */}
      <div className="overflow-x-auto p-4 pb-6">
        {isLoading ? (
          <div className="flex h-20 items-center justify-center text-primaryBlue">
            {isBn ? 'স্টেপ ট্র্যাকার আপডেট করা হচ্ছে...' : 'Updating step tracker...'}
          </div>
        ) : isError || !order ? (
          <div className="flex h-20 items-center justify-center text-red-600">
            {isBn ? 'অর্ডার বিস্তারিত লোড করতে ব্যর্থ হয়েছে।' : 'Failed to load order details.'}
          </div>
        ) : (
          <div className="flex min-w-[700px] items-center space-x-8 md:min-w-full">
            {localizedSteps.map((step, index) => (
              <div
                key={index}
                className="relative flex w-28 flex-shrink-0 flex-col items-center md:w-36"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-4 md:h-14 md:w-14 ${index <= activeStep
                    ? 'border-primaryBlue bg-primaryBlue text-white'
                    : 'border-gray-300 bg-gray-300 text-gray-500'
                    }`}
                >
                  ✓
                </div>
                <h4
                  className={`mt-2 text-center text-xs font-semibold md:text-sm ${index <= activeStep ? 'text-primaryBlue' : 'text-gray-400'
                    }`}
                >
                  {step.title}
                </h4>
                <p className="mt-1 text-center text-[10px] text-gray-400 md:text-xs">
                  {step.description}
                </p>

                {index !== localizedSteps.length - 1 && (
                  <div
                    className={`absolute right-[-47%] top-7 hidden h-1 md:block ${index < activeStep ? 'bg-primaryBlue' : 'bg-gray-300'
                      }`}
                    style={{ width: '100px' }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
