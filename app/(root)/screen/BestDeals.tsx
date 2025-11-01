'use client';

import React from 'react';
import ProductCard from '@/components/shared/ProductCard';
import Image from 'next/image';
import { easeOut, motion } from 'framer-motion';
import { useGetBestDealProductsQuery } from '@/redux/services/client/products';
import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

const BestDeals: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.language);

  const { data, error, isLoading } = useGetBestDealProductsQuery('');
  const { data: banner } = useGetHomeContentQuery();

  if (isLoading || error || !data?.data) return null;

  const todaysDealBanner = banner?.banners?.find((b: any) => b.type === 'todays_deal');

  return (
    <motion.section
      className="container mx-auto mt-15 px-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primaryDarkBlue md:ml-[33%] lg:ml-[25%] xl:ml-[20%]">
        {lang === 'bn' ? 'আজকের ডিল' : 'TODAY\'S DEAL'}

        </h2>
        <Link href="/more/todays-deal" className="">
          <span className="cursor-pointer text-2xl">→</span>
        </Link>
      </div>

      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
        {/* LEFT SIDE BANNER */}
        {/* LEFT SIDE BANNER */}
        <div className="relative hidden w-[236px] md:block">
          {todaysDealBanner ? (
            <Link href={`/product/${todaysDealBanner?.product?.slug}`}>
              <motion.div
                className="absolute bottom-0 right-0 z-10 hidden w-[236px] flex-col justify-between overflow-hidden rounded-xl bg-[#4C84FF] p-6 text-white md:flex"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 425, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
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
                      alt="Banner Image"
                      width={200}
                      height={200}
                      className="w-[200px] object-contain"
                    />
                  </div>
                )}
              </motion.div>
            </Link>
          ) : (
            <div className="absolute bottom-0 right-0 hidden h-[425px] w-[236px] rounded-xl bg-[#4C84FF] md:flex" />
          )}
        </div>

        {/* PRODUCT CARDS */}
        {data?.data.slice(0, 9).map((product: any) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BestDeals;
