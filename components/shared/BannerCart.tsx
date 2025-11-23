"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import ShopNowButton from "@/components/Button/ShopNowButton";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface BannerCardProps {
  bgColour: string;
  image: string | StaticImageData;
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={clsx(
        "relative w-full overflow-hidden rounded-3xl shadow-2xl",
        "grid md:grid-cols-2 items-center gap-4",
        "px-6 py-10 md:px-12 md:py-14"
      )}
      style={{ backgroundColor: bgColour }}
    >
      {/* ----------- GLOW WAVE BACKGROUND ----------- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-cyan-700 to-transparent opacity-40" />

        {/* Curved Wave Shape */}
        <svg
          className="absolute bottom-0 left-0 w-full h-40 opacity-30"
          viewBox="0 0 1440 320"
        >
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d="M0,224L48,224C96,224,192,224,288,224C384,224,480,224,576,229.3C672,235,768,245,864,250.7C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128V320H0Z"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Crystal Shapes */}
        <div className="absolute top-10 right-10 h-20 w-20 bg-white/10 blur-xl rotate-12 rounded-xl" />
        <div className="absolute bottom-10 left-10 h-16 w-16 bg-primary/20 blur-xl rotate-45 rounded-lg" />
      </div>

      {/* ---------- TEXT SECTION ---------- */}
      <div
        className={clsx(
          "hidden md:block relative z-20 space-y-4",
          position === "left" ? "order-1" : "order-2"
        )}
      >
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-sm md:text-base text-cyan-200 opacity-75 tracking-widest uppercase"
        >
          {title}
        </motion.h2>

        <motion.h1
          initial={{ x: -15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-xl md:text-3xl font-extrabold text-white drop-shadow-xl leading-tight"
        >
          {description}
        </motion.h1>

        <motion.p
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-sm md:text-xl font-medium text-white/90 drop-shadow-sm line-clamp-2"
        >
          {text}
        </motion.p>

        <div className="md:pt-4">
          <ShopNowButton
            link={link}
            text={lang === "bn" ? "এখনই কিনুন" : "Shop Now"}
          />
        </div>
      </div>

      {/* ---------- PRODUCT IMAGE SECTION ---------- */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={clsx(
          "hidden relative z-20 md:flex justify-center items-center",
          position === "left" ? "order-2" : "order-1"
        )}
      >
        <div className="relative">
          {/* Behind Glow */}
          <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-60" />

          <Image
            src={image}
            alt="Product"
            width={350}
            height={350}
            className="object-contain drop-shadow-[0_12px_25px_rgba(0,0,0,0.35)] 
                       hover:scale-110 transition-all duration-500"
          />
        </div>
      </motion.div>

      {/* For Mobile View */}
      <div className="md:hidden flex w-full">
        <div
          className={clsx(
            "w-1/2 relative z-20 space-y-4",
            position === "left" ? "order-1" : "order-2"
          )}
        >
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-sm md:text-base text-cyan-200 opacity-75 tracking-widest uppercase"
          >
            {title}
          </motion.h2>

          <motion.h1
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl md:text-3xl font-extrabold text-white drop-shadow-xl leading-tight"
          >
            {description}
          </motion.h1>

          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-sm md:text-xl font-medium text-white/90 drop-shadow-sm line-clamp-2"
          >
            {text}
          </motion.p>

          <div className="md:pt-4">
            <ShopNowButton
              link={link}
              text={lang === "bn" ? "এখনই কিনুন" : "Shop Now"}
            />
          </div>
        </div>

        {/* ---------- PRODUCT IMAGE SECTION ---------- */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={clsx(
            "w-1/2 relative z-20 flex justify-center items-center",
            position === "left" ? "order-2" : "order-1"
          )}
        >
          <div className="relative">
            {/* Behind Glow */}
            <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-60" />

            <Image
              src={image}
              alt="Product"
              width={150}
              height={250}
              className="object-contain drop-shadow-[0_12px_25px_rgba(0,0,0,0.35)] 
                       hover:scale-110 transition-all duration-500"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BannerCart;
