'use client';
import React, { useState } from 'react';
import Hero from '@/components/category/Hero';
import Brands from '@/components/category/Brands';
import SortBy from '@/components/category/SortBy';
import ProductsSection from '@/components/category/ProductsSection';
import Pagination from '../shared/Pagination';

export default function CategoryPage({
  initialQuery,
  data,
  sidebarFilters,
  setSidebarFilters,
  visibleCount,
  setVisibleCount,
  isLoading,
  setIsLoading,
  isFetching,
  setIsFetching,
  searchPage
}: {
  initialQuery?: Record<string, string>;
  data: any;
  sidebarFilters: {};
  setSidebarFilters: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
  searchPage?:boolean
}) {
  const [searchValue, setSearchValue] = useState<string>('');

  const [sortBy, setSortBy] = useState('newer');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const categoryTitle = initialQuery?.categoryId || 'All Products';

  
  //console.log('setSidebarFilters type:', typeof setSidebarFilters);

  return (
    <div>
      {/* <Hero /> */}
      {/* <Brands /> */}
      <SortBy
        categoryTitle={categoryTitle}
        setSortBy={setSortBy}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ProductsSection
        data={data}
        currentPage={currentPage}
        setTotalPages={setTotalPages}
        initialQuery={initialQuery}
        sortBy={sortBy}
        searchValue={searchValue}
        sidebarFilters={sidebarFilters}
        setSidebarFilters={setSidebarFilters}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
      {/* <div className="px-10">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          align="right"
        />
      </div> */}
    </div>
  );
}
