"use client";
import Pagination from "@/components/category/Pagination";
import ProductCard from "@/components/shared/ProductCard";
import {
  useGetBestDealProductsQuery,
  useGetBestSellingProductsQuery,
  useGetFeaturedQuery,
  useGetMostVisitedProductsQuery,
  useGetNewArivalProductsQuery,
  useGetTopRatedProductsQuery,
} from "@/redux/services/client/products";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function MoreProduct() {
  const { type } = useParams();
  const query = useSearchParams();
  const page = query.get("page");
  const router = useRouter();

  // Call all hooks unconditionally
  const bestDeal = useGetBestDealProductsQuery(query.toString());
  const newArival = useGetNewArivalProductsQuery(query.toString());
  const mostVisited = useGetMostVisitedProductsQuery(query.toString());
  const featured = useGetFeaturedQuery(query.toString());
  const bestSelling = useGetBestSellingProductsQuery(query.toString());
  const topRated = useGetTopRatedProductsQuery(query.toString());

  // Choose the appropriate data based on type
  const selectedData =
    type === "todays-deal"
      ? bestDeal
      : type === "new-arival"
        ? newArival
        : type === "most-visited"
          ? mostVisited
          : type === "featured"
            ? featured
            : type === "best-selling"
              ? bestSelling
              : topRated;

  const data = selectedData.data;
  const isLoading = selectedData.isLoading;

  const totalPages = data?.totalPage;

  const handlePageChange = (newPage: number) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("page", newPage.toString());
    router.push(`/more/${type}?${newQuery.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] to-[#e0eafc] px-6 py-16">
      <div className="h-[65px] w-full md:h-[109px]" />
      <h1 className="mb-4 text-xl font-bold">
        {(type as string)?.split("-").join(" ").toUpperCase()}
      </h1>
      <div className="container mx-auto mb-6">
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading &&
            Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg bg-gray-100 p-4 shadow-sm"
              >
                <div className="mb-3 h-36 w-full rounded bg-gray-200" />
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mb-1 h-3 w-1/2 rounded bg-gray-200" />
                <div className="h-3 w-1/3 rounded bg-gray-200" />
              </div>
            ))}
          {data?.data?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {data?.data?.length === 0 && (
          <div className="text-center text-2xl font-medium">
            No product to show!
          </div>
        )}
      </div>
      {totalPages && totalPages > 0 ? (
        <Pagination
          currentPage={page ? parseInt(page) : 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={10}
          siblingCount={1}
        />
      ) : null}
    </div>
  );
}
