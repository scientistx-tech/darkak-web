"use client";

import React, { useEffect } from "react";
import BannerCart from "@/components/shared/BannerCart";
import { useGetPublicSlidersQuery } from "@/redux/services/client/sliderApis";

const ThardBanner: React.FC = () => {
  const {
    data: sliderData,
    error,
    isLoading,
    refetch,
  } = useGetPublicSlidersQuery({ type: "banner" });

  // ✅ Filter sliders WITHOUT banners
  const slidersWithoutBanner =
    sliderData?.filter(
      (slider: any) =>
        !slider?.banner ||
        slider?.banner === "null" ||
        slider?.banner.trim() === "",
    ) || [];

  // ✅ Group slidersWithoutBanner in rows of 2
  const sliderGroups = [];
  for (let i = 0; i < slidersWithoutBanner.length; i += 2) {
    sliderGroups.push(slidersWithoutBanner.slice(i, i + 2));
  }

  useEffect(() => {
    if (slidersWithoutBanner.length === 0) {
      console.log("✅ No API sliders without banner — showing static layout");
    } else {
      console.log("✅ Showing dynamic API-based sliders (without banner)");
    }
  }, [slidersWithoutBanner]);

  const bgColors = [
    "#00153B",
    "#323232",
    "#5694FF",
    "#07d38b",
    "#ff6b6b",
    "#ffa502",
  ];
  console.log("slider", sliderGroups);
  // ✅ Else: Show dynamic sliders without banners
  return (
    <div className="mt-5 w-full md:mt-16 md:space-y-6">
      {sliderGroups.slice(0, 2).map((group, rowIndex) => (
        <div
          key={rowIndex}
          className="flex w-full flex-col gap-0 md:flex-row md:gap-10"
        >
          {group.map((slide: any, colIndex: number) => {
            const index = rowIndex * 2 + colIndex; // flat index
            const bgColour = bgColors[index % bgColors.length]; // cycle through colors

            return (
              <BannerCart
                key={colIndex}
                bgColour={bgColour}
                image={
                  slide?.banner
                    ? slide?.banner
                    : slide?.product?.thumbnail || "/images/fallback.jpg"
                }
                position={colIndex % 2 === 0 ? "left" : "right"}
                title={slide?.title || "Deal"}
                description={slide?.offer_name || "Don't miss out!"}
                text={slide?.details || "Shop the best products now!"}
                link={`/product/${slide?.product?.slug || ""}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ThardBanner;
