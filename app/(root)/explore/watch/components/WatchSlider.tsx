'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import ShopNowButton from '@/components/Button/ShopNowButton';
import { Slider } from '../types';

export default function WatchSlider({ sliders }: { sliders: Slider[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-primaryBlue md:h-[calc(100vh-109px)]">
      {/* Background Image Transition */}
      {sliders.map((slide, index) => (
        <Image
          key={index}
          src={slide.image}
          width={1200}
          height={800}
          alt={sliders[currentIndex].alt}
          className={`absolute left-0 top-0 h-[350px] w-full object-cover transition-opacity duration-1000 ease-in-out md:h-full ${
            index === currentIndex ? 'z-0 opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Foreground Content */}
      <div className="relative z-10 ml-[5%] flex h-[350px] w-[90%] items-end justify-center text-white md:h-full md:items-center">
        <div className="w-full md:w-1/2">
          <p className="font-mono text-[30px] md:text-[60px]">{sliders[currentIndex].title}</p>
          <p className="mb-5 mt-[-10px] font-serif text-[18px] font-thin text-white md:text-[40px]">
            {sliders[currentIndex].offer_name}
          </p>
          <ShopNowButton
            link={`/product/${sliders[currentIndex].product.slug}`}
            text={'Explore Product'}
            className="px-4"
          />
          <div className="h-[20px] w-full" />
        </div>
        <div className="md:w-1/2"></div>
      </div>

      {/* Dots / Controls */}
      <div className="bottom-0 left-0 z-20 flex h-[40px] w-full items-center justify-center gap-4 bg-primaryBlue text-white md:absolute md:h-[50px] md:bg-black/70">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-[10px] w-[30px] rounded-full border transition-all duration-300 md:h-[12px] md:w-[40px] ${
              index === currentIndex
                ? 'scale-110 border-white bg-white'
                : 'border-white bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
