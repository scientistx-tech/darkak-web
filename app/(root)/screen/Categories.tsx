'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useGetProductCategoriesQuery } from '@/redux/services/client/categories';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Categories() {
  const lang = useSelector((state: RootState) => state.language.language);

  const { data: categories, isLoading, error } = useGetProductCategoriesQuery('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) return <p className="text-center">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load categories.</p>;

  return (
    <div className="mt-16 px-8 md:px-12">
      <h2 className="mb-10 text-center text-3xl font-medium text-primaryDarkBlue">
        {lang === 'bn' ? 'ক্যাটাগরি অনুযায়ী পণ্য দেখুন' : 'Shop by Categories'}
      </h2>

      <div className="relative w-full">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-primaryBlue bg-transparent text-primaryBlue shadow-md transition-all duration-300 hover:bg-primaryBlue hover:text-white"
        >
          <FaAngleLeft className="text-xl" />
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar flex h-[210px] w-full items-center gap-4 overflow-x-auto scroll-smooth px-2"
        >
          {categories?.map((category: any, index: number) => (
            <CategoriesComponent
              key={index}
              name={category.title}
              icon={category.icon}
              href={`/category?categoryId=${category.title}`}
            />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-primaryBlue bg-transparent text-primaryBlue shadow-md transition-all duration-300 hover:bg-primaryBlue hover:text-white"
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}

interface CategoriesProps {
  name: string;
  icon: string;
  href: string;
}

const CategoriesComponent: React.FC<CategoriesProps> = ({ name, icon, href }) => {
  return (
    <Link
      href={href}
      className="group flex h-[140px] w-[150px] flex-shrink-0 flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:h-[180px] md:w-[200px]"
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 via-white to-blue-200 shadow-inner transition group-hover:from-primary/10 group-hover:to-primary/20">
        <Image src={icon} alt={name} width={40} height={40} className="object-contain" />
      </div>
      <p className="line-clamp-1 text-center text-sm font-medium text-gray-700 transition group-hover:text-primary md:line-clamp-2 md:h-[45px]">
        {name}
      </p>
    </Link>
  );
};
