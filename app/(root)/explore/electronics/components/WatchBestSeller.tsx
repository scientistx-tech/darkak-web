'use client';
import React from 'react';
import WatchCard from './WatchCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { WatchProduct } from '../types';

export default function WatchBestSeller({ seller }: { seller: WatchProduct[] | undefined }) {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center md:mt-8">
      <h1 className="font-serif text-xl font-medium text-primaryBlue md:text-[35px]">
        Electronics Best Seller
      </h1>
      <p>This component will display the best-selling items in the Electronics category.</p>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
          1300: {
            slidesPerView: 5,
          },
          1800: {
            slidesPerView: 5,
          },
        }}
        className="mt-4 h-[300px] w-full md:h-[400px]"
      >
        {seller?.map((item, i) => (
          <SwiperSlide key={i} className="w-[380px] md:px-3">
            <WatchCard
              href={`/product/${item.product.slug}`}
              img1={item.thumbnail}
              img2={item.additional}
              name="Miller Charm Rose Gold"
              price={item.product.offerPrice ?? item.product.price}
              discount={item.product.discount}
              img1Alt={item.thumbnail_alt}
              img2Alt={item.additional_alt}
              discountType={item.product.discount_type}
              product={item.product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
