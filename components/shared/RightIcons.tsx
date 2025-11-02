"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaEye,

  FaFacebook,
  FaPinterest,
  FaXTwitter,
  FaLink,
} from "react-icons/fa6";
import {
 
  FaRandom,
 
} from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAddToWishListMutation } from "@/redux/services/client/myWishList";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setWish } from "@/redux/slices/authSlice";

interface RightIconsProps {
  hovered: boolean;
  success: () => void;
  productId: number | string;
  slug: string;
  image: string;
  title: string;
}

export default function RightIcons({
  hovered,
  success,
  productId,
  slug,
  image,
  title,
}: RightIconsProps) {
  const [addToWishList, { isLoading }] = useAddToWishListMutation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showShare, setShowShare] = useState(false);

  const handleAddToWishlist = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      await addToWishList({ productId }).unwrap();
      toast.success("Item added to wishlist!");
      dispatch(setWish(Math.random()));
    } catch (error: any) {
      if (error?.status === 401) return router.replace("/auth/login");
      toast.error(error?.data?.message || "Failed to add to wishlist");
    }
  };

  return (
    <motion.div
      className="absolute right-3 top-5 z-30 flex flex-col gap-3 text-xl text-primaryBlue"
      initial={{ opacity: 0, y: -10 }}
      animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
    >
      {/* Wishlist Icon */}
      <div
        onClick={handleAddToWishlist}
        className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-secondaryBlue"
      >
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin text-primaryBlue"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        ) : (
          <FaHeart />
        )}
      </div>

      {/* View Product */}
      <Link href={`/product/${slug}`}>
        <FaEye className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-secondaryBlue" />
      </Link>

      {/* Share Tooltip */}
      <div
        className="relative"
        onMouseEnter={() => setShowShare(true)}
        onMouseLeave={() => setShowShare(false)}
      >
        <FaRandom className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-secondaryBlue" />

        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute right-8 top-1 flex gap-3 rounded-lg bg-[#275278] p-2 shadow-lg"
            >
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://darkak.com.bd/product/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-white text-lg hover:scale-125 transition-transform" />
              </a>

              {/* Pinterest */}
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                  `https://darkak.com.bd/product/${slug}`
                )}&media=${encodeURIComponent(image ?? "")}&description=${encodeURIComponent(
                  title ?? "Check this product!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest className="text-white text-lg hover:scale-125 transition-transform" />
              </a>

              {/* Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  `https://darkak.com.bd/product/${slug}`
                )}&text=${encodeURIComponent(title ?? "Check this product!")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-white text-lg hover:scale-125 transition-transform" />
              </a>

              {/* Copy Link */}
              <div
                className="cursor-pointer text-white text-lg hover:scale-125 transition-transform"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://darkak.com.bd/product/${slug}`
                  );
                  success();
                }}
              >
                <FaLink />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
