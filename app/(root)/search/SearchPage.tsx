"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FilterSidebar from "@/components/search/FilterSidebar";
import ProductGrid from "@/components/search/ProductGrid";
import Pagination from "@/components/shared/Pagination";
import { useGetSearchPublicQuery } from "@/redux/services/client/searchedProducts";
import {
  sortItems,
  DEFAULT_SORTING_OPTIONS,
  useSortingState
} from "@/utils/sortingUtils";
import SortingDropdown from "@/components/shared/SortingDropdown";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword")?.toLowerCase().trim() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(page);
  const ITEMS_PER_PAGE = 16;

  // Use the reusable sorting hook
  const { currentSort, updateSort } = useSortingState(searchParams, router, "newer");

  const { data, isFetching, isLoading } = useGetSearchPublicQuery({
    search: `${keyword}`,
  });

  console.log("🚀 ~ SearchPage ~ data:", data);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`/search?${newParams.toString()}`);
  };

  const handleSortChange = (name: string, value: string) => {
    setCurrentPage(1);
    updateSort(value, true);
  };

  // Apply sorting to products using the correct field mappings for your data structure
  const allProducts = data?.data || [];
  
  // DEBUG: Log the first product to verify structure
  if (allProducts.length > 0) {
    console.log("Sample product structure:", {
      id: allProducts[0].id,
      date: allProducts[0].date,
      price: allProducts[0].price,
      avgRate: allProducts[0].avgRate,
      totalReview: allProducts[0].totalReview,
      deal: allProducts[0].deal,
      feature: allProducts[0].feature
    });
  }

  const sortedProducts = sortItems(allProducts, currentSort, {
    // FIXED: Use correct field names that match your product data
    dateField: ['date'], // Your product uses 'date' field
    priceField: ['price'], // Your product uses 'price' field
    popularityField: ['viewCount', 'salesCount', 'popularity'], // Fallback fields for popularity
    ratingField: ['avgRate', 'rating'] // Your product uses 'avgRate'
  });

  // DEBUG: Log sorting results
  console.log(`Sorting by: ${currentSort}`);
  console.log("First 3 sorted products:", sortedProducts.slice(0, 3).map(p => ({
    id: p.id,
    title: p.title?.substring(0, 30),
    date: p.date,
    price: p.price,
    avgRate: p.avgRate
  })));

  const totalProducts = sortedProducts.length;
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIdx, endIdx);

  return (
    <div className="container mx-auto w-full">
      <div className="h-[65px] w-full md:h-[109px]" />

      <div className="flex items-center justify-between py-5">
        <p className="mb-1 text-base font-semibold text-[#003084] md:mb-0 md:text-xl lg:text-3xl">
          Searching for &apos;{keyword}&apos;
        </p>

        <SortingDropdown
          sortingItems={DEFAULT_SORTING_OPTIONS}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          size="md"
          className="order-2 flex w-full flex-row items-center justify-between md:order-none md:w-auto md:justify-start"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
        <div className="col-span-1">
          <FilterSidebar products={sortedProducts} />
        </div>
        <div className="col-span-3">
          <ProductGrid products={paginatedProducts} isLoading={isFetching} />
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            total={totalProducts}
            limit={ITEMS_PER_PAGE}
            align="right"
          />
        </div>
      </div>
    </div>
  );
};