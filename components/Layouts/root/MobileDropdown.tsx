"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetProductCategoriesQuery } from "@/redux/services/client/categories";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface MobileDropdownProps {
  onClose: () => void;
}

export default function MobileDropdown({ onClose }: MobileDropdownProps) {
  const { data: categories, isLoading, error } = useGetProductCategoriesQuery("");
  const [openMain, setOpenMain] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleMain = (title: string) => {
    setOpenMain(openMain === title ? null : title);
    setOpenSub(null); // Reset subcategory on main toggle
  };

  const toggleSub = (title: string) => {
    setOpenSub(openSub === title ? null : title);
  };

  return (
    <div className="w-full space-y-1 px-2 py-2 text-secondaryDark">
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Failed to load categories.</p>
      ) : (
        categories?.map((cat) => (
          <div key={cat.title} className="rounded-lg">
            <div
              onClick={() => toggleMain(cat.title)}
              className="flex cursor-pointer items-center justify-between font-semibold hover:text-secondaryBlue"
            >
              <span>{cat.title}</span>
              {openMain === cat.title ? <FaAngleUp /> : <FaAngleDown />}
            </div>

            {openMain === cat.title && (
              <div className="mt-3 space-y-2 pl-4 border-l border-gray-200">
                {cat.sub_category?.map((sub) => (
                  <div key={sub.title}>
                    <div
                      onClick={() =>
                        sub.sub_sub_category ? toggleSub(sub.title) : onClose()
                      }
                      className="flex cursor-pointer items-center justify-between text-base text-gray-700 hover:text-secondaryBlue"
                    >
                      <Link
                        href={{
                          pathname: "/category",
                          query: {
                            categoryId: cat.title,
                            subCategoryId: sub.title,
                          },
                        }}
                        onClick={onClose}
                      >
                        {sub.title}
                      </Link>
                      {sub.sub_sub_category && (
                        openSub === sub.title ? <FaAngleUp /> : <FaAngleDown />
                      )}
                    </div>

                    {/* Sub-subcategory */}
                    {openSub === sub.title && sub.sub_sub_category?.length > 0 && (
                      <div className="mt-2 ml-3 space-y-1 border-l border-gray-100 pl-3">
                        {sub.sub_sub_category.map((subSub) => (
                          <Link
                            key={subSub.title}
                            href={{
                              pathname: "/category",
                              query: {
                                categoryId: cat.title,
                                subCategoryId: sub.title,
                                subSubCategoryId: subSub.title,
                              },
                            }}
                            onClick={onClose}
                            className="block text-sm text-gray-600 hover:text-secondaryBlue transition-all duration-200"
                          >
                            {subSub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
