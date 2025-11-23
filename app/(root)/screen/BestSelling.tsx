import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";
import { Translate } from "./Translate";

interface BestSellingProps {
  banner: any;
}

export default async function BestSelling({ banner }: BestSellingProps) {

  const data = await getMostSelling('');
  if (!data) return null;

  const bestSellingBanner = banner?.banners?.find(
    (b: any) => b.type === "best_selling"
  );

  return (
    <section className="container mx-auto  my-5 md:my-8 px-5 md:px-0">
      {/* Section Header */}
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary md:ml-[33%] lg:ml-[25%] xl:ml-[20%]">
          <Translate text="BEST SELLING PRODUCTS" />
        </h2>
        <Link href="/more/best-selling">
          <span className="cursor-pointer text-2xl text-primary">→</span>
        </Link>
      </div>

      {/* Product Grid + Banner */}
      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
        {/* LEFT SIDE BANNER */}
        <div className="relative hidden md:block">
          {bestSellingBanner ? (
            <Link href={`/product/${bestSellingBanner?.product?.slug}`}>
              <div className="absolute bottom-0 right-0 z-10 hidden h-[425px] flex-col justify-between overflow-hidden rounded-xl bg-primary p-6 text-white md:flex">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {bestSellingBanner?.type?.replace("_", " ")}
                  </h3>

                  <p className="line-clamp-2 break-words text-2xl font-semibold leading-tight">
                    {bestSellingBanner?.title}
                  </p>

                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {bestSellingBanner?.details}
                  </p>
                </div>

                {bestSellingBanner?.image && (
                  <div className="mt-auto flex justify-center pt-8 bg-emerald-500" style={{
                    clipPath: "polygon(20% 8%, 80% 8%, 80% 0, 100% 20%, 100% 100%, 0 100%, 0 20%, 20% 0)",
                  }}>
                    <Image
                      src={bestSellingBanner.image}
                      alt="Banner Image"
                      width={200}
                      height={200}
                      className="w-[200px] object-contain"
                      sizes="200px"
                      quality={70}
                      decoding="async"
                      loading="lazy"
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
async function getMostSelling(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/most-selling?${params}`,
    { next: { revalidate: 86400 } } // Cache 1 day
  );
  if (!res.ok) throw new Error("Failed to fetch best selling products");
  return res.json();
}