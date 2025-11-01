import React, { useEffect, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import CategoryFilter from "@/assets/svg/CategoryFilter";
import { useGetAllProductsQuery } from "@/redux/services/client/products";
import SideFilterSection from "./SideFilterSection";

const VendorsProductsSection = ({
  currentPage,
  setTotalPages,
  initialQuery,
  sortBy,
  searchValue,
  vendorProduct,
}: {
  currentPage: number;
  setTotalPages: (total: number) => void;
  initialQuery?: Record<string, string>;
  sortBy: string;
  searchValue: string;
  vendorProduct: any;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarFilters, setSidebarFilters] = useState<any>(() => {
    // Convert initialQuery values to numbers if possible
    const parsed = Object.fromEntries(
      Object.entries(initialQuery || {}).map(([k, v]) => [
        k,
        !isNaN(Number(v)) && v !== "" ? Number(v) : v,
      ]),
    );
    return parsed;
  });

  // console.log("Initial Query from productsection:", initialQuery);

  useEffect(() => {
    if (sortBy) {
      setSidebarFilters((prevFilters: any) => ({
        ...prevFilters,
        sort: sortBy,
        search: searchValue || "", // Add search value if provided
      }));
    }
  }, [sortBy, searchValue]);

  // When initialQuery changes (route changes), update sidebarFilters
  useEffect(() => {
    const parsed = Object.fromEntries(
      Object.entries(initialQuery || {}).map(([k, v]) => [
        k,
        !isNaN(Number(v)) && v !== "" ? Number(v) : v,
      ]),
    );
    setSidebarFilters((prev: any) => {
      const next = { ...parsed };
      if (prev.sort || sortBy) next.sort = prev.sort || sortBy || "";
      return next;
    });
  }, [initialQuery, sortBy]); // Add sortBy to the dependency array

  // Add currentPage to sidebarFilters before calling useGetAllProductsQuery
  const filtersWithPageAndLimit = {
    ...sidebarFilters,
    page: currentPage,
    limit: 16,
  };

  const { data, error, isLoading, refetch } = useGetAllProductsQuery(
    filtersWithPageAndLimit,
  );

  useEffect(() => {
    if (data?.totalPage) {
      setTotalPages(data.totalPage);
    }
  }, [data, setTotalPages]);

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "sidebar-overlay") {
      closeSidebar();
    }
  };

  // Handler to receive filter changes from LeftSidebar
  const handleSidebarFilters = (filters: any) => {
    setSidebarFilters((prev: any) => {
      // Merge, but avoid duplicate params (prefer new filters, but keep sort)
      const merged = { ...prev, ...filters };
      if (prev.sort || sortBy) merged.sort = prev.sort || sortBy || "";
      return merged;
    });
  };

  return (
    <section className="mt-4 w-full items-start gap-x-7 p-4 md:mt-6 md:p-6 lg:flex lg:p-8 xl:p-10">
      {/* <section className="relative mt-4 md:mt-12 md:p-6 lg:mt-[62px] flex w-full flex-col gap-x-7 p-4 lg:flex-row lg:p-8 xl:p-10"> */}
      {/* Hamburger Button */}
      <div className="mb-4 block lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 rounded-md px-4 py-2 text-[#003084]"
        >
          Filter
          <CategoryFilter />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-1/5">
        <SideFilterSection onFilterChange={handleSidebarFilters} />
      </div>

      {/* Mobile Sidebar Drawer with Overlay */}
      {isSidebarOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 z-99 bg-black bg-opacity-30 lg:hidden"
          onClick={handleBackdropClick}
        >
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-xs transform bg-white shadow-md transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={closeSidebar}>
                <svg
                  className="h-6 w-6 text-gray-700 hover:text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-full overflow-y-auto px-4 pb-20 pt-4">
              <SideFilterSection onFilterChange={handleSidebarFilters} />
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}

      <div className="grid w-full grid-cols-2 gap-4 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-4">
        {/* {isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg bg-gray-100 p-4 shadow-sm"
            >
              <div className="mb-3 h-36 w-full rounded bg-gray-200" />
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mb-1 h-3 w-1/2 rounded bg-gray-200" />
              <div className="h-3 w-1/3 rounded bg-gray-200" />
            </div>
          ))} */}
        {(!vendorProduct || vendorProduct.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <svg
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 64 64"
              className="mb-4 text-blue-400"
            >
              <circle cx="32" cy="32" r="32" fill="#e0e7ef" />
              <path
                d="M20 40c0-4.418 7.163-8 16-8s16 3.582 16 8"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <ellipse
                cx="36"
                cy="28"
                rx="8"
                ry="10"
                fill="#fff"
                stroke="#60a5fa"
                strokeWidth="2"
              />
              <circle cx="36" cy="28" r="3" fill="#60a5fa" />
            </svg>
            <h3 className="mb-2 text-xl font-bold text-blue-700">
              No Products Found
            </h3>
            <p className="mb-1 text-gray-500">
              We couldn&rsquo;t find any products matching your filters.
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting your filters or search for something else.
            </p>
          </div>
        )}
        {vendorProduct?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default VendorsProductsSection;
