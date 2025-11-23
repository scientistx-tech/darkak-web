import BannerCart from '@/components/shared/BannerCart';

const Banner = async () => {
  const sliderData = await getSlider("banner");
  function sortByIndex(sliders: any[]) {
    return [...sliders].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  }
  const sortedSliderData = sliderData ? sortByIndex(sliderData) : [];
  const bgColors = ['#003084', '#3558E0'];
  // console.log("sorted banner", sortedSliderData);
  if (!sliderData) return null
  return (
    <div className="flex w-full md:my-8 px-5 md:px-0 gap-5 md:gap-3 flex-col   md:flex-row lg:gap-10">
      {sortedSliderData.slice(0, 2).map((slide: any, idx: number) => {
        const bgColour = bgColors[idx % bgColors.length];
        return (
          <div key={idx} className="flex h-full w-full flex-col gap-0 md:flex-row md:gap-10">
            <BannerCart
              bgColour={bgColour}
              image={
                slide?.banner ? slide.banner : slide.product.thumbnail || '/images/fallback.jpg'
              }
              position={idx % 2 === 0 ? 'left' : 'right'}
              title={slide.title || 'Deal'}
              description={slide.offer_name || "Don't miss out!"}
              text={slide.details || 'Shop the best products now!'}
              link={`/product/${slide?.product?.slug || ''}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
async function getSlider(type: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/slider?sort=${type}`, {
    next: { revalidate: 86400 }, // ✅ cache 1 day
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}