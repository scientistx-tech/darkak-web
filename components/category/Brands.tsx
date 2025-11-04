import React from "react";

type Brand = {
  id: number;
  name: string;
};

const brands: Brand[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Google" },
  { id: 3, name: "Nothing" },
  { id: 4, name: "ASUS" },
  { id: 5, name: "ONE +" },
  { id: 6, name: "VIVO" },
  { id: 7, name: "TECNO" },
  { id: 8, name: "iNFINIX" },
  { id: 9, name: "REAL ME" },
  { id: 10, name: "Xiaomi" },
  { id: 11, name: "ZTE" },
  { id: 12, name: "SAMSUNG" },
  { id: 13, name: "Walton" },
  { id: 14, name: "HONOR" },
  { id: 15, name: "HUAWEI" },
  { id: 16, name: "Oppo" },
];

const rows = [brands.slice(0, 5), brands.slice(5, 11), brands.slice(11, 16)];

export default function Brands() {
  return (
    <div className="mt-10 md:mt-16 lg:mt-[77px] w-full space-y-4">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex w-full flex-wrap gap-3 ${
            index === 1 ? "justify-center px-0" : "justify-center px-4 md:px-16"
          }`}
        >
          {row.map((brand) => (
            <button
              key={brand.id}
              type="button"
              className="rounded-full bg-[#E6EFFF] px-5 md:px-12 lg:px-20 py-2 md:py-3 lg:py-5 text-sm font-medium text-[#4B4E55] hover:bg-[#cad6ec] md:text-base"
            >
              {brand.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
