import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  itemsPerPage = 20,
  totalItems,
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getPaginationNumbers = () => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 3 + siblingCount);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - (3 + siblingCount) + 1, totalPages);
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  };

  const paginationNumbers = getPaginationNumbers();
  const totalItemCount =
    totalItems !== undefined ? totalItems : totalPages * itemsPerPage;

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-md bg-blue-50 px-4 py-4 shadow-sm sm:flex-row sm:px-8 md:px-16">
      {/* empty div */}
      <div className="w-1/3 hidden lg:block"></div>
      
      {/* Pagination Controls */}
      <div className="w-full lg:w-1/3 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`rounded-md px-3 py-2 text-sm text-blue-700 ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          }`}
        >
          Prev
        </button>

        {paginationNumbers.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="text-gray-500 px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 text-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`rounded-md px-3 py-2 text-sm text-blue-700 ${
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          }`}
        >
          Next
        </button>
      </div>

      {/* Status Text */}
      <div className="w-full lg:w-1/3 text-center text-xs text-gray-600 sm:text-sm">
        Showing {currentPage * itemsPerPage - (itemsPerPage - 1)} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItemCount)} of{" "}
        {totalItemCount} ({totalPages} Pages)
      </div>
    </div>
  );
};

export default Pagination;
