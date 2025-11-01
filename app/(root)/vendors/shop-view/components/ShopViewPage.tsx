'use client';

import ProductsSection from '@/components/category/ProductsSection';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import VendorsProductsSection from './VendorsProductSection';
import CategoryPage from '@/components/category/CategoryPage';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'next/navigation';

export default function ShopViewPage({ shop, products }: { shop: any; products: any }) {
  const searchParams = useSearchParams();
  const params = useParams();
  const { id } = params;

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
    sellerId: String(id),
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
  //console.log("shop view shop", shop);
  return (
    <div className="w-full py-6">
      <div className="w-full px-12">
        {/* Banner Image */}
        <div className="relative h-[400px] w-full">
          <Image
            src={shop?.shop_banner}
            alt="Vendor Banner"
            width={1200}
            height={12}
            className="h-full w-full rounded-xl"
          />
          {/* Overlay for better text visibility */}
          <div className="absolute ml-[10px] mt-[-110px] flex h-[100px] items-center gap-5 rounded-xl bg-white px-6 text-black">
            <div className="">
              <Image
                src={shop.shop_logo}
                alt={`${shop.shop_name} Logo`}
                width={48}
                height={48}
                className="h-[70px] w-[70px] rounded-full border border-primaryBlue object-cover shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primaryBlue">{shop?.store_name}</h2>
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <FaStar className="text-sm" />
                <span className="text-black">{shop?.averageRate || 0}</span>
                <span className="ml-1 text-gray-500">Rating</span>
                <span className="ml-1 text-black">|</span>
                <span className="ml-1 text-black">{shop?.reviews?.length || 0}</span>
                <span className="ml-1 text-gray-500">Reviews</span>
              </div>

              <div className="mt-1 flex items-center">
                <span className="ml-1 text-primary">Total Order:</span>
                <span className="ml-1 text-black">{shop?.totalOrder || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 w-full">
        {/* Orther products */}
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
      </div>
    </div>
  );
}
