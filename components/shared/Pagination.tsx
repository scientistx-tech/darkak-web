// components/Pagination.tsx
"use client";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  // Use either (total & limit) or totalPages
  total?: number;
  limit?: number;
  totalPages?: number;
  align?: "left" | "center" | "right";
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  total,
  limit,
  totalPages: totalPagesProp,
  align = "right",
}) => {
  const totalPages =
    totalPagesProp ?? (total && limit ? Math.ceil(total / limit) : 0);

  if (totalPages <= 1) return null;

  const siblings = 1;

  const getPageNumbers = () => {
    const pages: (number | "dots")[] = [];
    const pageSet = new Set<number>();

    pageSet.add(1);
    pageSet.add(totalPages);

    for (
      let i = Math.max(2, currentPage - siblings);
      i <= Math.min(totalPages - 1, currentPage + siblings);
      i++
    ) {
      pageSet.add(i);
    }

    const sortedPages = Array.from(pageSet).sort((a, b) => a - b);
    let lastPage = 0;

    for (let page of sortedPages) {
      if (page - lastPage > 1) {
        pages.push("dots");
      }
      pages.push(page);
      lastPage = page;
    }

    return pages;
  };

  // Determine alignment class
  let justifyClass = "justify-end";
  if (align === "center") justifyClass = "justify-center";
  else if (align === "left") justifyClass = "justify-start";

  return (
    <div className={`mt-6 flex flex-wrap ${justifyClass} gap-2`}>
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 shadow transition-all duration-200 hover:from-blue-200 hover:to-blue-300 hover:text-blue-900 active:scale-95"
          aria-label="Previous page"
        >
          <FaChevronLeft className="text-base" />
          <span className="hidden sm:inline">Prev</span>
        </button>
      )}

      {getPageNumbers().map((page, idx) =>
        page === "dots" ? (
          <span key={`dots-${idx}`} className="select-none px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              currentPage === page
                ? "scale-105 bg-gradient-to-r from-blue-500 to-blue-700 text-white ring-2 ring-blue-300"
                : "bg-white text-blue-700 hover:bg-blue-100 hover:text-blue-900"
            } `}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ),
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 shadow transition-all duration-200 hover:from-blue-200 hover:to-blue-300 hover:text-blue-900 active:scale-95"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="text-base" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
