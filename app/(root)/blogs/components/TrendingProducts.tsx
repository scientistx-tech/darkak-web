'use client';
import ProductCard from '@/components/shared/ProductCard';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function TrendingProducts({ data }: { data: any }) {
  const lang = useSelector((state: RootState) => state.language.language);

  if (!data) return null;

  return (
    <main className="mt-15">
      <div>
        <div className="h-[50px]">
          <div className="flex items-center justify-between gap-6 md:justify-start">
            <h2 className="text-2xl font-semibold text-primaryDarkBlue">
              {lang === 'bn' ? 'জনপ্রিয় পণ্যসমূহ' : 'Trending Products'}
            </h2>
            <Link href="/more/new-arival" className="">
              <span className="cursor-pointer text-2xl">→</span>
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8"

        >
          {data?.data.map((product: any) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
          ))}
        </div>
      </div>
    </main>
  );
}
