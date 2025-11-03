import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";

interface BestSellingProps {
  lang: string;
  banner: any;
}

export default async function BestSelling({ lang, banner }: BestSellingProps) {
  const data = await getData("");

  if (!data) return null;

  const bestSellingBanner = banner?.banners?.find(
    (b: any) => b.type === "best_selling"
  );

  return (
    <section className="container mx-auto mt-15 px-2">
      {/* Section Header */}
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primaryDarkBlue md:ml-[33%] lg:ml-[25%] xl:ml-[20%]">
          {lang === "bn" ? "সেরা বিক্রিত পণ্যসমূহ" : "BEST SELLING PRODUCTS"}
        </h2>
        <Link href="/more/best-selling">
          <span className="cursor-pointer text-2xl">→</span>
        </Link>
      </div>

      {/* Product Grid + Banner */}
      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
        {/* LEFT SIDE BANNER */}
        <div className="relative hidden w-[236px] md:block">
          {bestSellingBanner ? (
            <Link href={`/product/${bestSellingBanner?.product?.slug}`}>
              <div className="absolute bottom-0 right-0 z-10 hidden h-[425px] w-[236px] flex-col justify-between overflow-hidden rounded-xl bg-[#4C84FF] p-6 text-white md:flex">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {bestSellingBanner?.type?.replace("_", " ")}
                  </h3>

                  <p className="line-clamp-2 break-words text-xl font-semibold leading-tight">
                    {bestSellingBanner?.title}
                  </p>

                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {bestSellingBanner?.details}
                  </p>
                </div>

                {bestSellingBanner?.image && (
                  <div className="mt-auto flex justify-center pt-8">
                    <Image
                      src={bestSellingBanner.image}
                      alt="Banner Image"
                      width={200}
                      height={200}
                      className="w-[200px] object-contain"
                    />
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <div className="absolute bottom-0 right-0 hidden h-[425px] w-[236px] rounded-xl bg-[#4C84FF] md:flex" />
          )}
        </div>

        {/* PRODUCT CARDS */}
        {data?.data?.slice(0, 9)?.map((product: any) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ✅ Server-side cached fetch
async function getData(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/most-selling?${params}`,
    { next: { revalidate: 86400 } } // Cache 1 day
  );
  if (!res.ok) throw new Error("Failed to fetch best selling products");
  return res.json();
}
