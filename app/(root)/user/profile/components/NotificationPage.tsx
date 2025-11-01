'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGetNotificationsQuery } from '@/redux/services/client/notification';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Pagination } from 'antd';

export default function NotificationPage() {
  const lang = useSelector((state: RootState) => state.language.language);
  const [page, setPage] = useState(1);
  const pageSize = 10; // ✅ 10 notifications per page

  const { data, isLoading, isError, refetch } = useGetNotificationsQuery();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.notification) {
      setNotifications(data.notification);
    }
  }, [data]);

  useEffect(() => {
    // Slice notifications based on current page
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setPaginatedData(notifications.slice(start, end));
  }, [page, notifications]);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-10 shadow-2xl backdrop-blur-md">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        ✨ {lang === 'bn' ? 'বিজ্ঞপ্তিসমূহ' : 'Notifications'}
      </h2>

      {isLoading && (
        <p className="animate-pulse text-center text-gray-500">
          {lang === 'bn' ? 'বিজ্ঞপ্তি লোড হচ্ছে...' : 'Loading notifications...'}
        </p>
      )}

      {isError && (
        <p className="text-center text-red-500">
          {lang === 'bn' ? 'বিজ্ঞপ্তি লোড করতে ব্যর্থ হয়েছে।' : 'Failed to load notifications.'}
          <button onClick={refetch} className="underline ml-2">
            {lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Try again'}
          </button>
        </p>
      )}

      {!isLoading && notifications.length === 0 && (
        <p className="text-center text-gray-600">
          {lang === 'bn' ? 'কোনো বিজ্ঞপ্তি পাওয়া যায়নি।' : 'No notifications found.'}
        </p>
      )}

      <div className="space-y-4">
        {!isLoading &&
          paginatedData.map((notification) => (
            <NotificationComponent
              key={notification.id}
              image={notification.image}
              name={notification.title}
              message={notification.message}
              onDelete={() => handleDelete(notification.id)}
            />
          ))}
      </div>

      {/* ✅ Pagination */}
      {notifications.length > pageSize && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={notifications.length}
            onChange={(p) => {
              setPage(p)
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showSizeChanger={false} // optional, disable pageSize change
          />
        </div>
      )}
    </div>
  );
}

// Notification Component
interface NotificationProps {
  image: string | null;
  name: string;
  message: string;
  onDelete: () => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  image,
  name,
  message,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#cfd8dc] bg-white/70 p-4 shadow-md backdrop-blur-lg transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-center gap-5">
        <Image
          src={
            image ||
            'https://cdn.pixabay.com/photo/2015/12/16/17/41/bell-1096280_1280.png'
          }
          alt={name}
          width={70}
          height={70}
          className="h-[70px] w-[70px] rounded-xl object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-[#1a237e]">{name}</h3>
          <p className="text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  );
};
