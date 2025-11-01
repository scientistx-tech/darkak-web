"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

import { useGetMyCartQuery } from "@/redux/services/client/myCart";
import { useGetMyWishListQuery } from "@/redux/services/client/myWishList";

const FooterNav: React.FC = () => {
  const pathname = usePathname();

  const { data: cart, refetch: cartRefetch } = useGetMyCartQuery();
  const { data: wishlist, refetch: wishRefetch } = useGetMyWishListQuery({
    page: 1,
    limit: 100,
  });

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-[60px] w-full items-center justify-evenly bg-[#00286EF2] text-white">
      <Link
        href="/"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaHome
          size={24}
          className={`${pathname === "/" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/category"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaShoppingBag
          size={24}
          className={`${pathname === "/category" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/user/wishlist"
        className="flex flex-col items-center transition-all duration-300"
      >
        <div
          className={`absolute ml-[25px] mt-[-8px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-black group-hover:bg-primary group-hover:text-white ${
            pathname === "/user/wishlist" ? "bg-white" : "bg-primary text-white"
          }`}
        >
          <p className="text-[10px] font-semibold">
            {wishlist ? wishlist.data.length : "0"}
          </p>
        </div>
        <FaHeart
          size={24}
          className={`${pathname === "/user/wishlist" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/user/cart"
        className="flex flex-col items-center transition-all duration-300"
      >
        <div
          className={`absolute ml-[25px] mt-[-8px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-black group-hover:bg-primary group-hover:text-white ${
            pathname === "/user/cart" ? "bg-white" : "bg-primary text-white"
          }`}
        >
          <p className="text-[10px] font-semibold">
            {cart ? cart.cart.length : "0"}
          </p>
        </div>
        <FaShoppingCart
          size={24}
          className={`${pathname === "/user/cart" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/contact-us"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaEnvelope
          size={24}
          className={`${pathname === "/contact-us" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>
    </div>
  );
};

export default FooterNav;
