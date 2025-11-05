import ProductCard from '@/components/shared/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { Translate } from './Translate';

const BestDeals = async ({ banner }: { banner: any }) => {
  const data = await getBestDeal('');
  if (!data) return null;

  const todaysDealBanner = banner?.banners?.find(
    (b: any) => b.type === 'todays_deal'
  );

  return (
    <section className="container mx-auto mt-15 px-2">
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primaryDarkBlue md:ml-[33%] lg:ml-[25%] xl:ml-[20%]">

          <Translate text={`TODAY'S DEAL`} />
        </h2>
        <Link href="/more/todays-deal">
          <span className="cursor-pointer text-2xl">→</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
        {/* LEFT SIDE BANNER */}
        <div className="relative hidden w-[236px] md:block">
          {todaysDealBanner ? (
            <Link href={`/product/${todaysDealBanner?.product?.slug}`}>
              <div className="absolute bottom-0 right-0 z-10 hidden w-[236px] flex-col justify-between overflow-hidden rounded-xl bg-[#4C84FF] p-6 text-white md:flex h-[425px]">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {todaysDealBanner?.type.replace('_', ' ')}
                  </h3>

                  <p className="line-clamp-2 break-words text-xl font-semibold leading-tight">
                    {todaysDealBanner?.title}
                  </p>

                  <p className="line-clamp-3 break-words text-sm leading-snug text-white/90">
                    {todaysDealBanner?.details}
                  </p>
                </div>

                {todaysDealBanner?.image && (
                  <div className="mt-auto flex justify-center pt-8">
                    <Image
                      src={todaysDealBanner.image}
                      alt="Today's Deal Banner"
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
        {data?.data.slice(0, 9).map((product: any) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestDeals;

// Server-side fetch with ISR (cache 1 day)
async function getBestDeal(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/best-deal?${params}`,
    { next: { revalidate: 86400 } } // Revalidate every 24h
  );

  if (!res.ok) throw new Error('Failed to fetch best deal products');
  return res.json();
}