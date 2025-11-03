import ProductCard from '@/components/shared/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

const NewArrival = async ({ lang, banner }: { lang: string; banner: any }) => {
  const data = await getData('');

  if (!data) return null;

  const mostVisitedBanner = banner?.banners?.find(
    (b: any) => b.type === 'new_arrival'
  );

  return (
    <main className="mt-15">
      <div>
        {/* Header Section */}
        <div className="h-[50px]">
          <div className="flex items-center justify-between gap-6 md:justify-start">
            <h2 className="text-2xl font-semibold text-primaryDarkBlue">
              {lang === 'bn' ? 'নতুন আগমন' : 'NEW ARRIVAL'}
            </h2>
            <Link href="/more/new-arival">
              <span className="cursor-pointer text-2xl">→</span>
            </Link>
          </div>
        </div>

        {/* Main Section */}
        <div className="relative">
          {/* Product Grid */}
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
            {data?.data.map((product: any) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Banner */}
          {mostVisitedBanner ? (
            <Link href={`/product/${mostVisitedBanner?.product?.slug}`}>
              <div className="absolute right-0 top-0 mt-[-50px] hidden w-[236px] cursor-pointer flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white md:flex md:h-[425px] lg:w-[238px] xl:h-[450px] xl:w-[240px] 2xl:w-[270px] 3xl:w-[365px]">
                <div className="space-y-2">
                  <h3 className="mb-1 text-sm font-semibold uppercase">
                    {mostVisitedBanner?.type.replace('_', ' ')}
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
                      alt="New Arrival Banner"
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
};

export default NewArrival;

// Server-side fetch with revalidation
async function getData(params: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/new-arrival?${params}`,
    { next: { revalidate: 86400 } } // Cache for 1 day
  );

  if (!res.ok) throw new Error('Failed to fetch new arrival products');
  return res.json();
}
