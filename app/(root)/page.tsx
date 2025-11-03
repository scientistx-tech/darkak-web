import getSeoData from './getSeoData';
import Categories from './screen/Categories';
import ClientComponent from './screen/ClientComponent';
import Slider from './screen/Index';

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
  const [category, slider, banner, home] = await Promise.all([getCategories(), getSlider("slider"), getSlider("banner"), getHome()])
  return (
    <div className="w-full">
      <div className="h-[65px] w-full bg-[#E6EFFF] md:h-[109px]" />
      <Slider sliderData={slider} />
      <Categories categories={category} />
      <ClientComponent home={home} banner={banner} />
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