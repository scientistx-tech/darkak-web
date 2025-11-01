'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

// ✅ Dynamic imports for performance optimization
const CategoryPage = dynamic(() => import('@/components/category/CategoryPage'), {
  loading: () => <p className="text-center py-10">Loading products...</p>,
});
const ContentFaqCard = dynamic(() => import('@/components/shared/ContentFaqCard'));

export default function Page() {
  const searchParams = useSearchParams();
  const { brandId } = useParams();

  const [sidebarFilters, setSidebarFilters] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<any>({});
  const [visibleCount, setVisibleCount] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const [queryObject, setQueryObject] = useState<{ [key: string]: string }>({});

  // 🧩 Extract query params
  useEffect(() => {
    const queryObj: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      queryObj[key] = value;
    });
    setQueryObject(queryObj);
  }, [searchParams]);

  // 🧠 useCallback to stabilize function reference (fixes ESLint warning)
  const fetchAllProducts = useCallback(async () => {
    const filters = {
      brandId: String(brandId),
      page: String(visibleCount),
      limit: '20',
      ...queryObject,
      ...sidebarFilters,
    };

    const queryString = `?${new URLSearchParams(filters).toString()}`;
    const controller = new AbortController();
    const { signal } = controller;

    setIsFetching(true);

    try {
      const response = await fetch(
        `https://api.darkak.com.bd/api/public/filter${queryString}`,
        {
          signal,
          cache: 'force-cache', // helps performance
        }
      );

      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast.error(error?.message || 'Something went wrong while fetching products.');
      }
    } finally {
      setIsFetching(false);
    }

    return () => controller.abort();
  }, [brandId, visibleCount, queryObject, sidebarFilters]);

  // 🪄 Trigger product fetch when filters or page change
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="w-full" role="main">
      {/* Spacer for fixed header */}
      <div className="h-[65px] w-full md:h-[109px]" />
      <div className="h-[10px] w-full md:h-[20px]" />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 px-3 text-sm font-semibold md:px-5 lg:px-11"
      >
        <Link className="text-primary underline hover:text-primary/80" href="/category">
          Brand
        </Link>
        <ArrowRightIcon className="h-4 w-4" />
        <span className="capitalize text-gray-700">{brandId}</span>
      </nav>

      {/* Main Content */}
      <CategoryPage
        data={data}
        sidebarFilters={sidebarFilters}
        setSidebarFilters={setSidebarFilters}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        isLoading={isFetching}
        setIsLoading={setIsFetching}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />

      {/* Optional FAQ/Content Section */}
      {data?.brand?.content && (
        <div className="mt-10 px-3 md:px-5 lg:px-11">
          <ContentFaqCard
            content={data?.brand?.content}
            faqs={data?.brand?.faq?.faq || []}
          />
        </div>
      )}
    </div>
  );
}
