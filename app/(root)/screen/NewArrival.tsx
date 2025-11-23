import ProductCard from "@/components/shared/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Translate } from "./Translate";

const NewArrival = async ({ banner }: { banner: any }) => {
  const data = await getNewArrival("");
  if (!data) return null;

  const mostVisitedBanner = banner?.banners?.find(
    (b: any) => b.type === "new_arrival"
  );

  return (
    <main className="my-5 md:my-8 px-5 md:px-0">
      <div>
        {/* Header Section */}
        <div className="h-[50px]">
          <div className="flex items-center justify-between gap-6 md:justify-start">
            <h2 className="text-2xl font-semibold text-primary">
              <Translate text="NEW ARRIVAL" />
            </h2>
            <Link href="/more/new-arival">
              <span className="cursor-pointer text-2xl text-primary">→</span>
            </Link>
          </div>
        </div>

        <div className="hidden xl:grid gap-4 grid-cols-5 2xl:gap-8">
          {/* First 4 products */}
          {data?.data.slice(0, 4).map((product: any) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}

          {/* BANNER */}
          {mostVisitedBanner ? (
            <Link href={`/product/${mostVisitedBanner.product.slug}`}>
              <div
                className="
          col-span-2 md:col-span-1 mt-[-50px]
          lg:col-start-4 xl:col-start-5
          flex flex-col justify-between rounded-xl bg-primary p-6 text-white h-[425px]
        "
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {mostVisitedBanner.type.replace("_", " ")}
                  </h3>
                  <p className="line-clamp-2 break-words text-2xl font-semibold leading-tight">
                    {mostVisitedBanner.title}
                  </p>
                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {mostVisitedBanner.details}
                  </p>
                </div>

                {mostVisitedBanner.image && (
                  <div
                    className="mt-auto flex justify-center pt-8 bg-teal-400"
                    style={{
                      clipPath:
                        "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
                    }}
                  >
                    <Image
                      src={mostVisitedBanner.image}
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
            <div className="col-span-2 md:col-span-1 lg:col-start-4 xl:col-start-5 h-[425px] rounded-xl bg-[#4C84FF]" />
          )}

          {/* Remaining products */}
          {data?.data.slice(4, 9).map((product: any) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="hidden lg:grid xl:hidden grid-cols-4 gap-4 2xl:gap-8">
          {/* First 4 products */}
          {data?.data.slice(0, 3).map((product: any) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}

          {/* BANNER */}
          {mostVisitedBanner ? (
            <Link href={`/product/${mostVisitedBanner.product.slug}`}>
              <div
                className="
          col-span-2 md:col-span-1  md:col-end-3
          lg:col-start-4 xl:col-start-5 mt-[-50px]
          flex flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white h-[425px]
        "
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {mostVisitedBanner.type.replace("_", " ")}
                  </h3>
                  <p className="line-clamp-2 break-words text-xl font-semibold leading-tight">
                    {mostVisitedBanner.title}
                  </p>
                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {mostVisitedBanner.details}
                  </p>
                </div>

                {mostVisitedBanner.image && (
                  <div
                    className="mt-auto flex justify-center pt-8 bg-fuchsia-400"
                    style={{
                      clipPath:
                        "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
                    }}
                  >
                    <Image
                      src={mostVisitedBanner.image}
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
            <div className="col-span-2 md:col-span-1 lg:col-start-4 xl:col-start-5 h-[425px] rounded-xl bg-[#4C84FF]" />
          )}

          {/* Remaining products */}
          {data?.data.slice(3, 9).map((product: any) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="hidden md:grid lg:hidden xl:hidden grid-cols-3 gap-4 2xl:gap-8">
          {/* First 4 products */}
          {data?.data.slice(0, 2).map((product: any) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}

          {/* BANNER */}
          {mostVisitedBanner ? (
            <Link href={`/product/${mostVisitedBanner.product.slug}`}>
              <div
                className="
          col-span-2 md:col-span-1 mt-[-50px] 
          lg:col-start-4 xl:col-start-5 md:col-start-3
          flex flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white h-[425px]
        "
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {mostVisitedBanner.type.replace("_", " ")}
                  </h3>
                  <p className="line-clamp-2 break-words text-xl font-semibold leading-tight">
                    {mostVisitedBanner.title}
                  </p>
                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {mostVisitedBanner.details}
                  </p>
                </div>

                {mostVisitedBanner.image && (
                  <div
                    className="mt-auto flex justify-center pt-8 bg-fuchsia-400"
                    style={{
                      clipPath:
                        "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
                    }}
                  >
                    <Image
                      src={mostVisitedBanner.image}
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
            <div className="col-span-2 md:col-span-1 md:col-start-3 lg:col-start-4 xl:col-start-5 h-[425px] rounded-xl bg-[#4C84FF]" />
          )}

          {/* Remaining products */}
          {data?.data.slice(4, 9).map((product: any) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="md:hidden grid grid-cols-2 gap-4 2xl:gap-8">
          {/* First 4 products */}
          {data?.data.slice(0, 9).map((product: any) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NewArrival;

// Server-side fetch with revalidation
async function getNewArrival(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/new-arrival?${params}`,
    { next: { revalidate: 86400 } } // Cache for 1 day
  );

  if (!res.ok) throw new Error("Failed to fetch new arrival products");
  return res.json();
}
