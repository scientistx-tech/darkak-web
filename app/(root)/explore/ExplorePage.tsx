'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notification } from 'antd';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import watchImg from '@/Data/Demo/thumb-1920-831859.jpg';
import bagImg from '@/Data/Img/bag.jpg';
import electronicsImg from '@/Data/Img/electronics.jpg';

type Category = {
  name: string;
  href: string;
  available: boolean;
};

const categories: Category[] = [{ name: 'WATCHES', href: '/explore/watch', available: true }];

export default function ExplorePage() {
  const lang = useSelector((state: RootState) => state.language.language);

  const [api, contextHolder] = notification.useNotification();

  return (
    <div className="w-full">
      {contextHolder}

      {/* Watch Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <Image src={watchImg} alt="Explore Banner" fill className="object-cover" priority />
        <div className="absolute inset-0 flex flex-col items-start justify-end bg-black bg-opacity-40 p-12 px-4 text-center text-white md:p-20">
          <h1 className="mb-4 font-serif text-4xl font-medium">
            {lang === 'bn' ? 'আমাদের সংগ্রহ ঘুরে দেখুন' : 'Explore Our Collections'}
          </h1>

          <Link
            href="/explore/watch"
            className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
          >
            <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-primary transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {lang === 'bn' ? 'এখনই ঘুরে দেখুন' : 'Explore Now'}
            </span>
          </Link>
        </div>
      </div>

      <div className="h-10 w-full bg-gradient-to-r from-primary via-primaryBlue to-primary" />

      {/* Bag Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <Image src={bagImg} alt="Explore Banner" fill className="object-cover" priority />
        <div className="absolute inset-0 flex flex-col items-end justify-end bg-black bg-opacity-40 p-12 px-4 text-center text-white md:p-20">
          <h1 className="mb-4 font-serif text-4xl font-medium">
            {lang === 'bn' ? 'প্রতিটি সেলাইয়ে খুঁজে পান রুচিশীলতা' : 'Discover Elegance in Every Stitch'}
          </h1>

          <Link
            href="/explore/bag"
            className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
          >
            <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-primary transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {lang === 'bn' ? 'এখনই ঘুরে দেখুন' : 'Explore Now'}
            </span>
          </Link>
        </div>
      </div>

      <div className="h-10 w-full bg-gradient-to-r from-primary via-primaryBlue to-primary" />

       {/* Electronics Section */} 
       <div className="relative h-[500px] w-full overflow-hidden">
        <Image src={electronicsImg} alt="Explore Banner" fill className="object-cover" priority />
        <div className="absolute inset-0 flex flex-col items-start justify-end bg-black bg-opacity-10 p-12 px-4 text-center text-white md:p-20">
          <h1 className="mb-4 font-serif text-4xl font-medium">
            {lang === 'bn' ? 'আজই অনুভব করুন ভবিষ্যৎ' : 'Experience the Future Today'}
          </h1>

          <Link
            href="/explore/electronics"
            className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
          >
            <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-primary transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {lang === 'bn' ? 'এখনই ঘুরে দেখুন' : 'Explore Now'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
