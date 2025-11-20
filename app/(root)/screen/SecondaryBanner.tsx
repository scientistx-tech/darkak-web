import BannerCart from "@/components/shared/BannerCart";

const SecondaryBanner = ({sliderData}:{sliderData:any}) => {

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
    <div className="flex w-full my-5 md:my-16 px-5 md:px-0 gap-5 md:gap-3 flex-col   md:flex-row lg:gap-10">
      {sortedSliderData.slice(2, 4).map((slide: any, idx: number) => {
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
