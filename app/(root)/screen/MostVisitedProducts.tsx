import ProductCard from "@/components/shared/ProductCard";
import Image from "next/image";
import Link from "next/link";

interface MostVisitedProductsProps {
  visitorId: string;
  lang: string;
  banner: any
}

export default async function MostVisitedProducts({
  visitorId,
  lang,
  banner
}: MostVisitedProductsProps) {
  // ✅ Run both fetches in parallel (cached for 1 day)
  const data = await getData(`visitorId=${visitorId}`)

  if (!data) return null;

  const mostVisitedBanner = banner?.banners?.find(
    (b: any) => b.type === "most_visited"
  );

  return (
    <main className="mt-5">
      <div>
        {/* Section Header */}
        <div className="h-[50px]">
          <div className="flex items-center justify-between gap-6 md:justify-start">
            <h2 className="text-2xl font-semibold text-primaryDarkBlue">
              {lang === "bn" ? "সর্বাধিক ভিজিটকৃত" : "MOST VISITED"}
            </h2>
            <Link href="/more/most-visited">
              <span className="cursor-pointer text-2xl">→</span>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="relative">
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
            {data?.data?.slice(0, 9)?.map((product: any) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right-side Banner */}
          {mostVisitedBanner ? (
            <Link href={`/product/${mostVisitedBanner?.product?.slug}`}>
              <div className="absolute right-0 top-0 mt-[-50px] hidden w-[236px] cursor-pointer flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white md:flex md:h-[425px] lg:w-[238px] xl:h-[450px] xl:w-[240px] 2xl:w-[270px] 3xl:w-[365px]">
                <div className="space-y-2">
                  <h3 className="mb-1 text-sm font-semibold uppercase">
                    {mostVisitedBanner?.type?.replace("_", " ")}
                  </h3>

                  <p className="line-clamp-2 break-words text-xl font-semibold leading-tight">
                    {mostVisitedBanner?.title}
                  </p>

                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {mostVisitedBanner?.details}
                  </p>
                </div>

                {mostVisitedBanner?.image && (
                  <div className="mt-auto flex justify-center pt-8">
                    <Image
                      src={mostVisitedBanner.image}
                      alt={mostVisitedBanner?.title || "Most Visited Banner"}
                      width={200}
                      height={200}
                      className="w-[200px] object-contain"
                    />
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <div className="absolute right-0 top-0 mt-[-50px] hidden w-[236px] rounded-xl bg-[#4C84FF] md:flex md:h-[425px] lg:w-[238px] xl:h-[450px] xl:w-[240px] 2xl:w-[270px] 3xl:w-[365px]" />
          )}
        </div>
      </div>
    </main>
  );
}

// ✅ Server-side cached fetch functions
async function getData(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/most-visited?${params}`,
    { next: { revalidate: 86400 } } // Cache 1 day
  );
  if (!res.ok) throw new Error("Failed to fetch most visited products");
  return res.json();
}
