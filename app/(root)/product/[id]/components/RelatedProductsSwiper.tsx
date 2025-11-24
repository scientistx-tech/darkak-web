'use client';

import ProductCard from '@/components/shared/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRef } from 'react';

interface RelatedProductsSwiperProps {
  data: any[];
}

export default function RelatedProductsSwiper({ data }: RelatedProductsSwiperProps) {
  const lang = useSelector((state: RootState) => state.language.language);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto px-2 py-8 md:px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-primaryDarkBlue">
          {lang === 'bn' ? 'সম্পর্কিত পণ্যসমূহ' : 'Related Products'}
        </h2>
        <div className="flex gap-2">
          <button
            name="scrollLeft"
            onClick={() => scroll('left')}
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition"
          >
            ←
          </button>
          <button
            name="scrollRight"
            onClick={() => scroll('right')}
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable product list */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        {data.map((product: any) => (
          <div
            key={product.id}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[260px] xl:min-w-[280px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
