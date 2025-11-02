"use client";

import React, { useEffect } from "react";
import BannerCart from "@/components/shared/BannerCart";
import { useGetPublicSlidersQuery } from "@/redux/services/client/sliderApis";

const SecondaryBanner: React.FC = () => {
  const {
    data: sliderData,
    error,
    isLoading,
    refetch,
  } = useGetPublicSlidersQuery({ type: "banner" });

  function sortByIndex(sliders: any[]) {
    return [...sliders].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  }
  const sortedSliderData = sliderData ? sortByIndex(sliderData) : [];
  const bgColors = [
    "#00153B",
    "#323232",
    "#5694FF",
    "#07d38b",
    "#ff6b6b",
    "#ffa502",
  ];
  // console.log("sorted banner", sortedSliderData);
  // ✅ Else: Show dynamic sliders without banners
  return (
    <div className="mt-15 flex w-full flex-col gap-4 md:flex-row md:gap-10">
      {sortedSliderData.slice(6, 8).map((slide: any, idx: number) => {
        const bgColour = bgColors[idx % bgColors.length];
        return (
          <div
            key={idx}
            className="flex w-full flex-col gap-0 md:flex-row md:gap-10"
          >
            <BannerCart
              bgColour={bgColour}
              image={
                slide?.banner
                  ? slide?.banner
                  : slide?.product?.thumbnail || "/images/fallback.jpg"
              }
              position={idx % 2 === 0 ? "left" : "right"}
              title={slide?.title || "Deal"}
              description={slide?.offer_name || "Don't miss out!"}
              text={slide?.details || "Shop the best products now!"}
              link={`/product/${slide?.product?.slug || ""}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SecondaryBanner;
