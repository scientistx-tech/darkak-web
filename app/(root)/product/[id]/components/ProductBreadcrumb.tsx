"use client";

import SocialShare from "@/components/ShareSocialMedia";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiGitCompare } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ProductBreadcrumb = ({ title, url }: { title: string; url: string }) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  console.log(title, url);

  const baseUrl = "https://www.darkak.com.bd";

  return (
    <div>
      <div className="mt-2 flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        {/* Breadcrumbs */}
        <nav className="flex max-w-full flex-wrap items-center gap-x-1 gap-y-2 overflow-x-auto text-[10px] text-[#4B4E55] md:text-sm">
          <Link
            href="/"
            className="whitespace-nowrap hover:text-primaryDarkBlue"
          >
            Home
          </Link>
          {segments.map((seg, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            const isLast = idx === segments.length - 1;

            return (
              <span key={idx} className="flex items-center space-x-1">
                <span>/</span>
                {isLast ? (
                  <span className="whitespace-nowrap text-secondaryBlue">
                    {decodeURIComponent(seg)}
                  </span>
                ) : (
                  <Link
                    // href={href}
                    href="/category"
                    className="whitespace-nowrap capitalize hover:text-primaryDarkBlue"
                  >
                    {decodeURIComponent(seg)}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex flex-row items-center gap-3 sm:flex-row sm:gap-4">
          <div className="flex items-center gap-2">
            <CiShare2 className="h-4 w-4 text-primaryDarkBlue" />
            <p className="hidden text-sm md:block">
               {lang === 'bn' ? 'শেয়ার করুন:' : 'Share:'}
            </p>
          </div>
          <SocialShare url={`${baseUrl}${url}`} title={title} />
        </div>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
