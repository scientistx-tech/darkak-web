"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/shared/NavLink";
import { FaAngleDown } from "react-icons/fa";
import { useGetProductCategoriesQuery } from "@/redux/services/client/categories";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const shimmer = "animate-pulse bg-secondaryLiteBlue rounded-md h-6 mb-2";

export default function Test() {
  const [hoveredMain, setHoveredMain] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery("");

  const bgColor = "bg-primaryWhite";
  const textColor = "text-primaryDarkBlue";

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setHoveredMain(null);
        setHoveredSub(null);
      }}
    >
      <NavLink
        href="/category"
        className="group flex cursor-pointer items-center gap-2 font-serif text-lg text-secondaryWhite transition-colors duration-300 hover:text-secondaryBlue"
      >
        Category
        <FaAngleDown
          className={`transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </NavLink>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 top-full z-50"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`mt-4 flex w-[900px] rounded-xl ${bgColor} p-6 pt-4 shadow-2xl`}
            >
              {/* Main Categories */}
              <div className="w-1/3 border-r border-secondaryLiteBlue pr-4">
                <p
                  className={`mb-3 text-base font-semibold opacity-70 ${textColor}`}
                >
                  Main Categories
                </p>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className={shimmer} />
                  ))
                ) : error ? (
                  <p className="text-sm text-red-500">Failed to load.</p>
                ) : (
                  categories?.map((cat) => (
                    <div
                      key={cat.title}
                      onMouseEnter={() => {
                        setHoveredMain(cat.title);
                        setHoveredSub(null);
                      }}
                      className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-secondaryLiteBlue ${
                        hoveredMain === cat.title
                          ? "bg-secondaryLiteBlue"
                          : "bg-transparent"
                      }`}
                    >
                      <Image
                        src={cat.icon}
                        alt={cat.title}
                        width={28}
                        height={28}
                        className="rounded-md"
                      />
                      <span className={`text-sm ${textColor}`}>
                        {cat.title}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Sub Categories */}
              <div className="w-1/3 border-r border-secondaryLiteBlue px-4">
                <p
                  className={`mb-3 text-base font-semibold opacity-70 ${textColor}`}
                >
                  Sub Categories
                </p>
                {isLoading
                  ? [...Array(4)].map((_, i) => (
                      <div key={i} className={shimmer} />
                    ))
                  : hoveredMain &&
                    categories
                      ?.find((c) => c.title === hoveredMain)
                      ?.sub_category.map((sub) => (
                        <div
                          key={sub.title}
                          onMouseEnter={() => setHoveredSub(sub.title)}
                          className={`cursor-pointer rounded-md px-3 py-2 transition-all hover:bg-secondaryLiteBlue ${
                            hoveredSub === sub.title
                              ? "bg-secondaryLiteBlue"
                              : "bg-transparent"
                          }`}
                        >
                          <span className={`text-sm ${textColor}`}>
                            {sub.title}
                          </span>
                        </div>
                      ))}
              </div>

              {/* Sub-Sub Categories */}
              <div className="w-1/3 pl-4">
                <p
                  className={`mb-3 text-base font-semibold opacity-70 ${textColor}`}
                >
                  Sub Sub Categories
                </p>
                {isLoading
                  ? [...Array(3)].map((_, i) => (
                      <div key={i} className={shimmer} />
                    ))
                  : hoveredMain &&
                    hoveredSub &&
                    categories
                      ?.find((c) => c.title === hoveredMain)
                      ?.sub_category.find((s) => s.title === hoveredSub)
                      ?.sub_sub_category.map((item) => (
                        <div
                          key={item.title}
                          className="cursor-pointer rounded-md px-3 py-2 transition-all hover:bg-secondaryLiteBlue"
                        >
                          <span className={`text-sm ${textColor}`}>
                            {item.title}
                          </span>
                        </div>
                      ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
