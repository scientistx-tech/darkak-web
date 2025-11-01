"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import clsx from "clsx";
import ShopNowButton from "@/components/Button/ShopNowButton";


import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


interface BannerCardProps {
  bgColour: string;
  image: string | StaticImageData; // ✅ Accept both string and static image import
  position: "left" | "right";
  title: string;
  description: string;
  text: string;
  link: string;
}

const BannerCart: React.FC<BannerCardProps> = ({
  bgColour,
  image,
  position,
  title,
  description,
  text,
  link,
}) => {
   const lang = useSelector((state: RootState) => state.language.language);
  return (
    <div
      className={clsx(
        "relative flex h-full w-full items-center justify-between overflow-hidden rounded-xl py-3 pr-5 text-white",
      )}
      style={{ backgroundColor: bgColour }}
    >
      <div
        className={clsx(
          "space-y-2 p-4 md:space-y-3 md:p-8",
          position === "left" ? "w-full md:w-[55%]" : "w-full md:w-[45%]",
        )}
      >
        <h2 className="text-sm md:text-base line-clamp-1">{title}</h2>
        <h1 className="text-lg font-bold md:text-2xl h-[20px]">{description}</h1>
        <p
          className={clsx(
            position === "left" ? "text-2xl" : "text-2xl",
            "line-clamp-1",
          )}
        >
          {text}
        </p>

        <div className="h-[10px] w-full"></div>

        <ShopNowButton link={link} text={lang === 'bn' ? 'এখনই কিনুন' : 'Shop Now'} />
      </div>

      <div>
        <Image
          src={image}
          alt="Product Image"
          className="object-cover"
          width={200}
          height={300}
          // sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default BannerCart;
