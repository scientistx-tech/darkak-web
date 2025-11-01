'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/app/(root)/types/ProductType';
import { message } from 'antd';
import PriceInfo from './PriceInfo';
import RightIcons from './RightIcons';
import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, setIsOpen }) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const router = useRouter();
  //console.log(product)

  // Message setup
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Link copied to clipboard!',
    });
  };

  // Combine thumbnail and images, ensuring no duplicates and thumbnail is first
  const allImages = [
    product.thumbnail,
    ...(product.Image || []).map((img: any) => (typeof img === 'string' ? img : img?.url)),
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  // Only use the first image for the slider
  const sliderImages = allImages.slice(0, 6);

  return (
    <div
      className="relative mx-auto w-full border-1.5 border-primaryBlue max-w-sm overflow-hidden rounded-[20px] bg-primaryWhite shadow-md transition-all duration-300 md:h-[370px] xl:h-[400px] 2xl:h-[380px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {contextHolder}

      {/* Discount badge */}
      {product.discount > 0 && (
        <div className="absolute left-0 top-5 z-20 rounded-r-full bg-primaryBlue px-4 py-1 text-center text-xs font-semibold text-secondaryWhite">
          {Math.round(product.discount)}{product.discount_type === "flat" ? "৳" : "%"}
          <br />
          {lang === 'bn' ? 'ছাড়' : 'OFF'}
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
      ></RightIcons>

      {/* Image Container with polygon background */}
      <Link href={`/product/${product.slug}`}
        className="relative flex h-32 cursor-pointer items-center justify-center transition-all duration-500 md:h-48"
        onMouseEnter={() => {
          setTimeout(() => {
            setActiveImage((activeImage + 1) % product.Image.length);
          }, 1600);
        }}
      // onClick={() => {
      //   // window.open(`/product/${product.slug}`, "_blank");
      //   router.push(`/product/${product.slug}`);
      //   if (setIsOpen) setIsOpen(false);
      // }}
      >
        {/* Polygon background behind the image */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 38%, 0% 100%)',
            zIndex: 0,
          }}
        />

        {/* Product Image */}
        <motion.img
          key={activeImage}
          src={sliderImages[activeImage] || product.thumbnail}
          alt={product.title}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="z-10 h-32 object-contain md:h-48 rounded-md"
        />
        
      </Link>

      {/* Image Indicators */}
      <div className="my-2 flex items-center justify-center gap-2 mt-3">
        {sliderImages.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveImage(i)}
            className={`h-2 w-4 cursor-pointer rounded-full transition-all duration-300 hover:bg-primaryBlue ${i === activeImage
                ? 'w-8 bg-primaryBlue'
                : 'border-[1px] border-secondaryLiteBlue bg-secondaryWhite'
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
