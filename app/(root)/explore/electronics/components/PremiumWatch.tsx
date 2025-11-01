import React from 'react';
import WatchBannerCard from './WatchBannerCard';
import WatchCard from './WatchCard';

import { SellerProductResponse, WatchBanner } from '../types';
import Link from 'next/link';

export default async function PremiumWatch({ banner }: { banner: WatchBanner | undefined }) {
  const data = await fetchSellerProducts();
  return (
    <div className="mt-0 w-full md:mt-10">
      <div className="flex items-center justify-between">
        <p className="font-serif text-xl font-medium text-primaryBlue md:text-[35px]">
          Travel & Adventure Electronics
        </p>
        <Link
          href={`/explore/electronics/more/${banner?.type}`}
          className="rounded-full bg-primary px-3 py-1.5 font-medium text-white transition-all duration-300 hover:bg-primaryBlue md:px-4 md:py-2"
        >
          View All
        </Link>
      </div>

      <div className="mt-0 grid w-full grid-cols-2 items-center gap-4 sm:grid-cols-2 md:mt-8 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-5">
        {banner && (
          <WatchBannerCard
            href={`/product/${banner?.product.slug}`}
            img={banner.image}
            alt={banner.alt}
            text={banner?.description}
            name={banner.title}
          />
        )}

        {data?.data?.map((d) => (
          <WatchCard
            key={d.id}
            href={`/product/${d.product.slug}`}
            img1={d.thumbnail}
            img2={d.additional}
            name={d.title}
            discountType={d.product.discount_type}
            img1Alt={d.thumbnail_alt}
            img2Alt={d.additional_alt}
            price={d.product.price}
            discount={d.product.discount}
            product={d.product}
          />
        ))}
      </div>
    </div>
  );
}
const fetchSellerProducts = async (): Promise<SellerProductResponse> => {
  const res = await fetch('https://api.darkak.com.bd/api/public/electronics-products/premium');
  return res.json();
};
