'use client';

import CategoryPage from '@/components/category/CategoryPage';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';



export default function CategoryPageServer({ searchPage }: { searchPage?: boolean }) {
  const lang = useSelector((state: RootState) => state.language.language);


  const [sidebarFilters, setSidebarFilters] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<any>({});
  const [visibleCount, setVisibleCount] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  // Add currentPage to sidebarFilters before calling useGetAllProductsQuery
  //console.log(sidebarFilters)
  const filtersWithPageAndLimit = {
    ...sidebarFilters,
    page: String(visibleCount),
    limit: '20',
  };

  const fetchAllProducts = async () => {
    const queryString = filtersWithPageAndLimit
      ? `?${new URLSearchParams(filtersWithPageAndLimit).toString()}`
      : '';
    try {
      setIsLoading(true), setIsFetching(true);
      const response = await fetch(`https://api.darkak.com.bd/api/public/filter${queryString}`);
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsLoading(false), setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [sidebarFilters, visibleCount,search]);

  //console.log('setSidebarFilters type:', typeof setSidebarFilters);
  return (
    <div className="w-full">
      <div className="h-2.5 w-full md:h-5" />
      {!searchPage && (
        <div className="flex items-center gap-1 px-3 text-sm font-semibold md:px-5 lg:px-11">
          <Link className="text-primary underline" href={'/'}>
            {lang === 'bn' ? 'হোম' : 'Home'}
          </Link>
          /
          {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
        </div>
      )}

      <CategoryPage
        searchPage={searchPage}
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
    </div>
  );
}
