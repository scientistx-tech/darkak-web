'use client';

import Pagination from '@/components/category/Pagination';
import ProductCard from '@/components/shared/ProductCard';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SellerProduct, SellerProductResponse } from '../types';
import WatchCard from '../components/WatchCard';

export default function MoreProduct() {
  const { type } = useParams();
  const query = useSearchParams();
  const page = query.get('page') || '1';
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        setLoading(true);
        const qs = query.toString();
        const res = await fetch(
          `https://api.darkak.com.bd/api/public/bag-products/${type}?${qs}`
        );
        const json: SellerProductResponse = await res.json();
        setData(json.data || []);
        setTotalPages(json.totalPages || 0);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, [type, query]);

  const handlePageChange = (newPage: number) => {
    const newQuery = new URLSearchParams(query.toString());
    newQuery.set('page', newPage.toString());
    router.push(`/explore/bag/more/${type}?${newQuery.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] to-[#e0eafc] px-6 py-16">
      <div className="h-[65px] w-full md:h-[109px]" />
      <h1 className="mb-4 text-xl font-bold">
        {(type as string)?.split('-').join(' ').toUpperCase()}
      </h1>
      <div className="container mx-auto mb-6">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : data.length === 0 ? (
          <div className="text-center text-2xl font-medium">No product to show!</div>
        ) : (
          <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((product: SellerProduct) => (
              <WatchCard
                discount={product.product.discount}
                discountType={product.product.discount_type}
                href={`/product/${product.product.slug}`}
                img1={product.thumbnail}
                img1Alt={product.thumbnail_alt}
                img2={product.additional}
                img2Alt={product.additional_alt}
                key={product.id}
                product={product.product}
                name={product.title}
                price={product.product.price}
              />
            ))}
          </div>
        )}
      </div>
      {totalPages > 0 && (
        <Pagination
          currentPage={parseInt(page)}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={10}
          siblingCount={1}
        />
      )}
    </div>
  );
}
