"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import New from "../../../Data/Icon/sign.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import bg from "@/Data/Img/pngwing.com.png";

type SlideType = {
  banner: string;
  offer_name: string;
  title: string;
  details: string;
  product?: {
    slug?: string;
  };
};

const Slider = ({ sliderData }: { sliderData: any }) => {
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
  if (!sliderData) return null;
  return (
    <div className="w-full overflow-hidden bg-linear-to-r from-primaryBlue via-primary to-primaryBlue text-white">
      <div className="w-full md:h-[calc(100vh-150px)]">
        <div className="h-0.5 w-full bg-primary" />

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
              <p className="mb-5 text-3xl font-light text-red-500">
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

            <div className="absolute w-full flex justify-center items-center">
              {/* <Image
                src={bg}
                alt="Background"
                className="inset-0 w-2/4 h-[50%] object-cover opacity-60 z-0"
              /> */}
              <motion.div
                key={`sign-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex z-20 absolute h-[500px] w-2/4 items-start justify-end"
              >
                <Image
                  src={New}
                  alt="Image"
                  width={80}
                  height={80}
                  sizes="80px"
                  quality={80}
                  decoding="async"
                  className="mr-[17%] h-20 w-20"
                />
              </motion.div>
            </div>

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
                  {lang === "bn" ? "আরও দেখুন" : " Explore More"}
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                quality={75}
                decoding="async"
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
              className={`h-2 w-[30px] transition-all duration-300 ${
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
