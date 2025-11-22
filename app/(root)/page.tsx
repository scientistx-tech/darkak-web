import getSeoData from './getSeoData';
import Banner from './screen/Banner';
import BestDeals from './screen/BestDeals';
import BestSelling from './screen/BestSelling';
import Categories from './screen/Categories';
import ContentFaqSection from './screen/ContentFaqSection';
import FeatureSection from './screen/FeatureSection';
import ForthBanner from './screen/FourthBanner';
import Slider from './screen/Index';
import MostVisitedProducts from './screen/MostVisitedProducts';
import NewArrival from './screen/NewArrival';
import RecommendedProducts from './screen/RecommendedProducts';
import SecondaryBanner from './screen/SecondaryBanner';

// Fetch metadata for SEO
export async function generateMetadata() {
  const data = await getSeoData("home");
  //console.log(data);

  return {
    title: data?.data?.meta_title || "",
    description: data?.data?.meta_description || "",
    keywords: data?.data?.meta_keywords?.map((d: any) => d) || [],
    openGraph: {
      title: data?.data?.meta_title || "",
      description: data?.data?.meta_description || "",
      images: [
        {
          url: data?.data?.meta_image, // Update with your image URL
          width: 1200,
          height: 630,
          alt: data?.data?.meta_alt,
        },
      ],
    },
  };
}
async function Page() {
  const [category, slider, banner, home] = await Promise.all([
    getCategories(), getSlider("slider"), getSlider("banner"),
    getHome(),
  ])

  return (
    <div className="w-full">
      <div className="h-[65px] w-full bg-[#E6EFFF] md:h-[109px]" />
      <Slider sliderData={slider} />
      <Categories categories={category} />
      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <Banner />
        <RecommendedProducts banner={home} />
        <SecondaryBanner sliderData={banner} />
        <MostVisitedProducts banner={home} />
        <BestSelling banner={home} />
        <NewArrival banner={home} />
        <ForthBanner sliderData={banner} />
        <BestDeals banner={home} />
        <ContentFaqSection data={home} />
        <FeatureSection />
      </div>

    </div>
  );
}

export default Page;

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/category`, {
    next: { revalidate: 86400 }, // ✅ cache 1 day
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
async function getSlider(type: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/slider?sort=${type}`, {
    next: { revalidate: 86400 }, // ✅ cache 1 day
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
async function getHome() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/home`, {
    next: { revalidate: 86400 }, // ✅ cache 1 day
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}





