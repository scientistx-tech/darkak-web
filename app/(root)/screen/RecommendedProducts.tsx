import Image from 'next/image';
import ProductCard from '@/components/shared/ProductCard';
import Link from 'next/link';
import { Translate } from './Translate';

const RecommendedProducts = async ({ banner }: { banner: any }) => {
  const data = await getRecomended('');

  const mostVisitedBanner = banner?.banners?.find((banner: any) => banner.type === 'featured');
  //console.log(mostVisitedBanner);
  return (
    <div
      className="container mx-auto my-5 md:my-8 px-5 md:px-0 "
    >
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary md:ml-[33%] lg:ml-[25%] xl:ml-[20%]">
          <Translate text='FEATURE PRODUCTS' />
        </h2>
        <Link href="/more/feature" className="">
          <span className="cursor-pointer text-2xl text-primary">→</span>
        </Link>
      </div>

      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
        {/* LEFT SIDE BANNER */}
        <div className="relative hidden md:block">
          {mostVisitedBanner ? (
            <Link href={`/product/${mostVisitedBanner?.product?.slug}`}>
              <div
                className="absolute bottom-0 right-0 z-10 hidden flex-col justify-between overflow-hidden rounded-xl bg-primary p-6 text-white md:flex"

              >
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {mostVisitedBanner?.type.replace('_', ' ')}
                  </h3>

                  <p className="line-clamp-2 break-words text-2xl font-semibold leading-tight">
                    {mostVisitedBanner?.title}
                  </p>

                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {mostVisitedBanner?.details}
                  </p>
                </div>

                {mostVisitedBanner?.image && (
                  <div className="mt-auto flex justify-center pt-8 bg-cyan-400" style={{
                    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  }}>
                    <Image
                      src={mostVisitedBanner.image}
                      alt={mostVisitedBanner?.title || 'Banner Image'}
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
        {data?.data.slice(0, 9).map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;

async function getRecomended(params: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/featured?${params}`, {
    next: { revalidate: 86400 }, // ✅ cache 1 day
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}