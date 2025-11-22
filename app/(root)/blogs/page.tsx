import ContentFaqCard from '@/components/shared/ContentFaqCard';
import getSeoData from '../getSeoData';
import BlogsPage from './components/BlogsPage';
import TrendingProducts from './components/TrendingProducts';

export async function generateMetadata() {
  const data = await getSeoData('blog');
  //console.log(data);

  return {
    title: data?.data?.meta_title || '',
    description: data?.data?.meta_description || '',
    keywords: data?.data?.meta_keywords?.map((d: any) => d) || [],
    openGraph: {
      title: data?.data?.meta_title || '',
      description: data?.data?.meta_description || '',
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
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const page = (await searchParams).page || "1"
  const [data, blogs, products] = await Promise.all([await getSeoData('blog'),
  await getData(page.toString(), "10"), await getProducts("")])

  return (
    <div>
      <div className="h-[65px] w-full md:h-[109px]" />
      <BlogsPage page={Number(page)} blogs={blogs?.blogs || []} total={blogs?.total || 1} />

      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <TrendingProducts data={products} />
      </div>

      <div className="ml-[2.5%] mt-8 w-[95%] md:mt-16">
        <ContentFaqCard content={data?.data?.content} faqs={data?.data?.faq?.faq || []} />
      </div>
    </div>
  );
}

async function getData(page: string, limit: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/blogs?page=${page}&limit=${limit}`, {
    next: { revalidate: 86400 }, // ✅ cache 1 day
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
async function getProducts(params: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/new-arrival?${params}`, {
    next: { revalidate: 86400 }, // ✅ cache 1 day
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}