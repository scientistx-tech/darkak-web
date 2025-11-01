"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiGitCompare } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";

const ProductBreadcrumb = () => {
  const pathname = usePathname(); 
  const segments = pathname.split("/").filter(Boolean); 
  const [isCompared, setIsCompared] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCompare = () => {
    setIsCompared((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <div >
      <div className="flex items-center justify-between py-3">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1 text-sm text-[#4B4E55]">
          <Link href="/" className="hover:text-primaryDarkBlue">
            Home
          </Link>
          {segments.map((seg, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            const isLast = idx === segments.length - 1;
            return (
              <span key={idx} className="flex items-center space-x-1">
                <span>/</span>
                {isLast ? (
                  <span className="text-secondaryBlue">
                    {decodeURIComponent(seg)}
                  </span>
                ) : (
                  <Link href={href} className="capitalize hover:text-primaryDarkBlue">
                    {decodeURIComponent(seg)}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCompare}
            className="flex items-center space-x-1 rounded-full bg-secondaryWhite px-3 py-1.5 text-secondaryBlue transition hover:bg-blue-100"
          >
            <BiGitCompare className="h-4 w-4 text-primaryDarkBlue" />
            <span>{isCompared ? "Compared" : "Add to Compare"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1 rounded-full bg-secondaryWhite px-3 py-1.5 text-secondaryBlue transition hover:bg-blue-100"
          >
            <CiShare2 className="h-4 w-4 text-primaryDarkBlue" />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
