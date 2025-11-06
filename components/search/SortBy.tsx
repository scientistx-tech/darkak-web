"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import TypingPlaceholderInput from "../shared/TypingPlaceholderInput";

export interface SortItem {
    value: string;
    name: string;
}

export const sortingItems: SortItem[] = [
    {
        value: "newer",
        name: "Newer",
    },
    {
        value: "popular",
        name: "Popular",
    },
    {
        value: "older",
        name: "Older",
    },
    {
        value: "low-to-high",
        name: "Low to High Price",
    },
    {
        value: "high-to-low",
        name: "High to Low Price",
    },
];

const SortBy = ({
    categoryTitle,
    setSortBy,
    searchValue,
    setSearchValue,
}: {
    categoryTitle: string;
    setSortBy: (value: string) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [sortingItem, setSortingItem] = useState<string>("Newer");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSort = (name: string, value: string) => {
        setSortingItem(name);
        setIsOpen(false);
        setSortBy(value);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <div className="w-full px-2 md:px-6 lg:px-8 xl:px-10">
            <div className="mt-4 flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:gap-x-7 md:gap-y-0">
                <div className="w-full md:w-auto">
                    <p className="mb-1 text-base font-semibold text-[#003084] md:mb-0 md:text-xl lg:text-3xl">
                        {categoryTitle} Category
                    </p>
                </div>
                <div className="order-3 w-full flex-1 md:order-none">
                    <TypingPlaceholderInput
                        value={searchValue}
                        onChange={setSearchValue}
                    />
                </div>
                <div className="order-2 flex w-full flex-row items-center justify-between gap-x-2 md:order-none md:w-auto md:justify-start md:gap-x-4 lg:gap-x-6">
                    <p className="whitespace-nowrap text-sm font-semibold text-[#003084] md:text-xl lg:text-3xl">
                        Sort By
                    </p>
                    <div
                        className="relative inline-block w-36 text-left md:w-auto"
                        ref={dropdownRef}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown();
                            }}
                            className="inline-flex w-full items-center justify-between rounded-full bg-white px-3 py-2 text-center text-xs font-medium text-[#003084] shadow-md ring-1 ring-gray-200 transition hover:bg-blue-50 focus:outline-none md:px-4 md:py-2 lg:px-8 lg:py-3 lg:text-base"
                            type="button"
                        >
                            <span className="truncate">{sortingItem}</span>
                            <IoIosArrowDown
                                height={5}
                                width={5}
                                className={`ml-2 text-[#003084] transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-36 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-gray-200 md:w-44">
                                <ul className="py-2 text-xs text-[#003084] md:text-base">
                                    {sortingItems.map((item) => (
                                        <li
                                            key={item.value}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSort(item.name, item.value);
                                            }}
                                            className="block cursor-pointer rounded px-4 py-2 transition-colors hover:bg-blue-50"
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortBy;