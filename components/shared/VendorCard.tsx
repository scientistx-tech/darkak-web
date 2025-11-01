"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface VendorCardProps {
  shopBanner: string;
  shopLogo: string;
  shopName: string;
  shopRating: string;
  shopReviews: string;
  shopTotalProduct: string;
  shopLink: string;
}

const VendorCard: React.FC<VendorCardProps> = ({
  shopBanner,
  shopLogo,
  shopName,
  shopRating,
  shopReviews,
  shopTotalProduct,
  shopLink,
}) => {
  return (
    <Link
      href={shopLink}
      className="group overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl"
    >
      {/* Banner Image */}
      <div className="relative h-[120px] w-full overflow-hidden">
        <Image
          src={shopBanner}
          alt="Vendor Banner"
          width={50}
          height={12}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Body Content */}
      <div className="bg-white p-4">
        {/* Logo and Name */}
        <div className="flex items-center gap-4">
          <div className="">
            <Image
              src={shopLogo}
              alt={`${shopName} Logo`}
              width={48}
              height={48}
              className="h-[70px] w-[70px] rounded-full border border-primaryBlue shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-primaryBlue">
              {shopName}
            </h2>
            <div className="flex items-center gap-1 text-xs text-yellow-500">
              <FaStar className="text-sm" />
              <span className="text-black">{shopRating}</span>
              <span className="ml-1 text-gray-500">Rating</span>
            </div>
          </div>
        </div>

        {/* Review and Product Count */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2 rounded-md bg-slate-200 px-3 py-1">
            <p className="text-lg font-bold text-black">{shopReviews}</p>
            <p className="text-lg">Reviews</p>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-200 px-3 py-1">
            <p className="text-lg font-bold text-black">{shopTotalProduct}</p>
            <p className="text-lg">Products</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard;
