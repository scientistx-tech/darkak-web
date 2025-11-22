"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/app/(root)/types/ProductType";
import PriceInfo from "./PriceInfo";
import RightIcons from "./RightIcons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, setIsOpen }) => {
  const lang = useSelector((state: RootState) => state.language.language);
  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // ✅ Toastify success handler
  const success = () => {
    toast.success("🔗 Link copied to clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      theme: "colored",
    });
  };


  // ✅ Combine thumbnail + additional images safely
  const allImages = [
    product.thumbnail,
    ...(product.Image || []).map((img: any) =>
      typeof img === "string" ? img : img?.url
    ),
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);
  
  const sliderImages = allImages.slice(0, 6);

  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[20px] border-1.5 border-primaryBlue bg-primaryWhite shadow-md transition-all duration-300 hover:shadow-lg md:h-[370px] xl:h-[400px] 2xl:h-[380px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Discount badge */}
      {product.discount > 0 && (
        <div className="absolute left-0 top-5 z-20 rounded-r-full bg-primaryBlue px-4 py-1 text-center text-xs font-semibold text-secondaryWhite">
          {Math.round(product.discount)}
          {product.discount_type === "flat" ? "৳" : "%"}
          <br />
          {lang === "bn" ? "ছাড়" : "OFF"}
        </div>
      )}

      {/* Top Right Icons */}
      <RightIcons
        productId={product.id}
        slug={product.slug}
        hovered={hovered}
        image={product.thumbnail}
        title={product.title}
        success={success}
      />

      {/* Product Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative flex h-32 cursor-pointer items-center justify-center transition-all duration-300 md:h-48"
        onMouseEnter={() => {
          setTimeout(() => {
            setActiveImage((activeImage + 1) % sliderImages.length);
          }, 1600);
        }}
      >
        {/* Polygon background */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 38%, 0% 100%)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 h-32 w-full md:h-48 flex items-center justify-center">
          <Image
            src={sliderImages[activeImage] || product.thumbnail}
            alt={product.title}
            width={140}
            height={140}
            className="object-contain transition-transform duration-500 hover:scale-105 rounded-md"
            sizes="(max-width: 640px) 50vw, 140px"
            quality={70}
            decoding="async"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Image Indicators */}
      <div className="my-2 mt-3 flex items-center justify-center z-40 gap-2">
        {sliderImages.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveImage(i)}
            className={`h-2 w-4 cursor-pointer rounded-full transition-all duration-300 hover:bg-primaryBlue ${i === activeImage
                ? "w-8 bg-primaryBlue"
                : "border-[1px] border-secondaryLiteBlue bg-secondaryWhite"
              }`}
          />
        ))}
      </div>

      {/* Price and Info */}
      <PriceInfo product={product} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ProductCard;
