"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Translate } from "./Translate";

export default function Categories({ categories }: { categories: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto my-5 md:my-8 px-5 md:px-0">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-block">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
            <Translate text="Popular" />
          </span>
        </div>
        <h2 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text font-serif text-2xl font-bold text-transparent md:text-5xl">
          <Translate text="Shop by Categories" />
        </h2>
        <p className="mx-auto max-w-2xl text-slate-600">
          <Translate text="Discover our wide range of products across different categories" />
        </p>
      </div>

      <div className="relative w-full">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-20 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-primaryBlue bg-transparent text-primaryBlue cursor-pointer shadow-md transition-all duration-300 hover:bg-primaryBlue hover:text-white"
        >
          <FaAngleLeft className="text-xl" />
        </button>

        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-2 py-6"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
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
        <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
            height: 0;
          }
        `}</style>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-primaryBlue bg-transparent text-primaryBlue cursor-pointer shadow-md transition-all duration-300 hover:bg-primaryBlue hover:text-white"
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

const CategoriesComponent: React.FC<CategoriesProps> = ({
  name,
  icon,
  href,
}) => {
  return (
    <Link
      href={href}
      className="group relative flex h-[180px] w-[160px] flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl md:h-[220px] md:w-[200px]"
    >
      {/* Animated Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Icon Container */}
      <div className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl md:h-24 md:w-24">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 transition-opacity duration-500 group-hover:opacity-20`}
        />
        <span className="relative text-4xl transition-transform duration-500 group-hover:scale-110 md:text-5xl">
          <Image
            src={icon}
            alt={name}
            width={40}
            height={40}
            className="object-contain"
          />
        </span>
      </div>

      {/* Category Name */}
      <div className="relative z-10 text-center">
        <p className="line-clamp-2 text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-900 md:text-base">
          {name}
        </p>
      </div>

      {/* Hover Border Effect */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
      />
      <div
        className={`absolute inset-[1px] rounded-2xl bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Shine Effect */}
      <div className="absolute -right-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:right-full" />
    </Link>
  );
};
async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/category`,
    {
      next: { revalidate: 86400 }, // ✅ cache 1 day
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
