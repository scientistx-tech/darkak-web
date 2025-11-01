"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetPublicSlidersQuery } from "@/redux/services/client/sliderApis";
import ClientLoading from "../components/ClientLoading";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import New from "../../../Data/Icon/sign.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type SlideType = {
  banner: string;
  offer_name: string;
  title: string;
  details: string;
  product?: {
    slug?: string;
  };
};

const Slider: React.FC = () => {
  const { data: sliderData, isLoading } = useGetPublicSlidersQuery({
    type: "slider",
  });

  const finalSlides: SlideType[] = sliderData?.length > 0 ? sliderData : [];
  const lang = useSelector((state: RootState) => state.language.language);

  const [index, setIndex] = useState(0);

  // Auto slide every 7 seconds
  useEffect(() => {
    if (finalSlides.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % finalSlides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [finalSlides]);

  const handleDotClick = (i: number) => {
    setIndex(i);
  };

  const current = finalSlides[index];

  if (isLoading)
    return (
      <div className="w-full overflow-hidden bg-primaryBlue text-white">
        <div className="w-full md:h-[calc(100vh-150px)]">
          <div className="h-[2px] w-full bg-primary" />
          <div className="relative flex h-full flex-col items-center justify-center lg:flex-row">
            {/* Left skeleton (offer name & title) */}
            <div className="absolute z-30 hidden w-[80%] items-center justify-between lg:flex">
              <div className="flex h-[500px] w-1/4 flex-col gap-4 border-b-2 border-l-2 border-white px-6 py-6">
                <div className="mb-5 h-8 w-3/4 animate-pulse rounded bg-white/30" />
                <div className="h-24 w-2/3 animate-pulse rounded bg-white/20" />
                <div className="h-24 w-1/2 animate-pulse rounded bg-white/10" />
              </div>
              {/* Center skeleton (image) */}
              <div className="flex h-[500px] w-2/4 items-start justify-end">
                <div className="mr-[17%] h-[80px] w-[80px] animate-pulse rounded-full bg-white/30" />
              </div>
              {/* Right skeleton (details & button) */}
              <div className="flex h-[500px] w-1/4 flex-col items-end justify-center gap-4 border-r-2 border-t-2 border-white py-6 pr-6">
                <div className="h-16 w-5/6 animate-pulse rounded bg-white/20" />
                <div className="h-10 w-1/2 animate-pulse rounded bg-white/30" />
              </div>
            </div>
            {/* Mobile skeleton */}
            <div className="flex w-full flex-col items-center justify-center gap-4 px-6 py-6 lg:hidden">
              <div className="mb-3 h-6 w-1/2 animate-pulse rounded bg-white/30" />
              <div className="h-12 w-2/3 animate-pulse rounded bg-white/20" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="mb-5 mt-5 h-8 w-1/2 animate-pulse rounded bg-white/20" />
              <div className="h-10 w-1/3 animate-pulse rounded bg-white/30" />
            </div>
          </div>
          {/* Dots skeleton */}
          <div className="flex w-full items-center justify-center gap-3 py-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[8px] w-[30px] animate-pulse rounded bg-white/30"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center pb-6 md:mt-4"></div>
      </div>
    );

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-primaryBlue via-primary to-primaryBlue text-white">
      <div className="w-full md:h-[calc(100vh-150px)]">
        <div className="h-[2px] w-full bg-primary" />

        <div className="relative flex h-full flex-col items-center justify-center lg:flex-row">
          <div className="absolute z-30 hidden w-[80%] items-center justify-between lg:flex">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="h-[500px] w-1/4 border-b-2 border-l-2 border-white px-6 py-6"
            >
              <p className="mb-5 text-3xl font-light text-primary">
                {current?.offer_name}
              </p>
              {current?.title?.split(" ").map((word: string, idx: number) => (
                <p
                  key={idx}
                  className="font-serif text-[100px] font-light leading-none opacity-70"
                >
                  {word}
                </p>
              ))}
            </motion.div>

            <motion.div
              key={`sign-${index}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex h-[500px] w-2/4 items-start justify-end"
            >
              <Image
                src={New}
                alt="Image"
                className="mr-[17%] h-[80px] w-[80px]"
              />
            </motion.div>

            <motion.div
              key={`details-${index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="flex h-[500px] w-1/4 flex-col items-end justify-center border-r-2 border-t-2 border-white py-6 pr-6"
            >
              <p className="text-justify font-serif text-sm opacity-80 md:mt-4">
                {current?.details}
              </p>
              <div className="h-5 w-full md:h-10" />
              <Link
                href={`/product/${current?.product?.slug || ""}`}
                className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
              >
                <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-primary transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                 {lang==="bn"?"আরও দেখুন":" Explore More"}
                </span>
              </Link>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0.3, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="flex w-full items-center justify-center lg:mt-[-60px]"
            >
              <Image
                src={current.banner}
                alt={`Slide ${index}`}
                className="mt-20 h-[300px] w-full object-contain opacity-80 md:w-[500px] lg:mt-0 lg:h-[500px]"
                width={400}
                height={300}
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="lg:hidden">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="flex w-full flex-col items-center justify-center px-6 py-6"
            >
              <p className="mb-3 text-xl font-light text-primary">
                {current?.offer_name}
              </p>
              <p className="font-serif text-[30px] font-light leading-none opacity-70">
                {current?.title}
              </p>
              <p className="mb-5 mt-5 text-center font-serif text-sm opacity-80">
                {current?.details}
              </p>

              <Link
                href={`/product/${current?.product?.slug || ""}`}
                className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-2 font-medium transition-all hover:bg-white"
              >
                <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-primary transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Explore More
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-5lg:mt-[-60px] flex w-full items-center justify-center gap-3 py-4">
          {finalSlides.map((_: unknown, i: number) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-[8px] w-[30px] transition-all duration-300 ${
                i === index ? "scale-110 bg-white" : "bg-primaryDarkBlue"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-6 md:mt-4"></div>
    </div>
  );
};

export default Slider;
