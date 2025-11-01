'use client';

import React, { useEffect, useState } from 'react';
import CategoryPage from '@/components/category/CategoryPage';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import ContentFaqCard from '@/components/shared/ContentFaqCard';
import { slugToText } from '@/utils/urlConverter';

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams();
  const { category } = params;

  const [sidebarFilters, setSidebarFilters] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<any>({});
  const [visibleCount, setVisibleCount] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [queryObject, setQueryObject] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const queryObj: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      queryObj[key] = value;
    });
    setQueryObject(queryObj);
  }, [searchParams]);
  //console.log(sidebarFilters);
  // Add currentPage to sidebarFilters before calling useGetAllProductsQuery
  const filtersWithPageAndLimit = {
    categoryId: String(category),
    page: String(visibleCount),
    limit: '20',
    ...queryObject,
    ...sidebarFilters,
  };

  const fetchAllProducts = async () => {
    const queryString = filtersWithPageAndLimit
      ? `?${new URLSearchParams(filtersWithPageAndLimit).toString()}`
      : '';
    try {
      (setIsLoading(true), setIsFetching(true));
      const response = await fetch(`https://api.darkak.com.bd/api/public/filter${queryString}`);
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      (setIsLoading(false), setIsFetching(false));
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [sidebarFilters, visibleCount]);

  //console.log('setSidebarFilters type:', typeof setSidebarFilters);
  //console.log('data', data);
  return (
    <div className="w-full">
      <div className="h-[65px] w-full md:h-[109px]" />
      <div className="h-[10px] w-full md:h-[20px]" />
      <div className="flex items-center gap-1 px-3 text-sm font-semibold md:px-5 lg:px-11">
        
        <Link className="text-primary underline" href={'/category'}>
          category
        </Link>
        /
        {category}
      </div>
      <CategoryPage
        data={data}
        sidebarFilters={sidebarFilters}
        setSidebarFilters={setSidebarFilters}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
      <div className="mt-10 px-3 md:px-5 lg:px-11">
        <ContentFaqCard content={data?.category?.content} faqs={data?.category?.faq?.faq || []} />
      </div>
    </div>
  );
}
