'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/shared/ProductCard';
import laptop from '@/Data/Demo/Rectangle 130 (1).png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGetMostVisitedProductsQuery } from '@/redux/services/client/products';
import Link from 'next/link';
import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
interface MostVisitedProductsProps {
  visitorId: string;
}

const MostVisitedProducts: React.FC<MostVisitedProductsProps> = ({ visitorId }) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const { data, error, isLoading, refetch } = useGetMostVisitedProductsQuery('visitorId=sff');
  const [screen, setScreen] = useState('md');

  useEffect(() => {
    const logScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreen('sm');
      } else if (width >= 640 && width < 768) {
        setScreen('md');
      } else if (width >= 768 && width < 1024) {
        setScreen('lg');
      } else if (width >= 1024 && width < 1280) {
        setScreen('xl');
      } else if (width >= 1280) {
        setScreen('2xl');
      }
    };

    logScreenSize();
    window.addEventListener('resize', logScreenSize);
    return () => {
      window.removeEventListener('resize', logScreenSize);
    };
  }, []);
  const { data: banner } = useGetHomeContentQuery();

  if (isLoading || error) return null; // optional loading/error handling

  const mostVisitedBanner = banner?.banners?.find((banner: any) => banner.type === 'most_visited');
  return (
    <main className="mt-5">
      <div>
        <div className="h-[50px]">
          <div className="flex items-center justify-between gap-6 md:justify-start">
            <h2 className="text-2xl font-semibold text-primaryDarkBlue">
              {lang === 'bn' ? 'সর্বাধিক ভিজিটকৃত' : 'MOST VISITED'}
            </h2>
            <Link href="/more/most-visited" className="">
              <span className="cursor-pointer text-2xl">→</span>
            </Link>
          </div>
        </div>

        {screen === 'sm' || screen === 'md' ? (
          <motion.div
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {data?.data.slice(0, 9).map((product: any) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="relative">
            <motion.div
              className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8"
              style={{
                clipPath: `polygon(${screen === 'lg' ? '68% 0' : screen === 'xl' ? '76% 0' : '81% 0'}, ${screen === 'lg' ? '68% 380px' : screen === 'xl' ? '76% 380px' : '81% 405px'}, ${screen === 'lg' ? '100% 380px' : screen === 'xl' ? '100% 380px' : '100% 405px'}, 100% 100%, 0 100%, 0 50%, 0 0)`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {data?.data.slice(0, 9).map((product: any) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {mostVisitedBanner ? (
              <Link href={`/product/${mostVisitedBanner?.product?.slug}`}>
                <motion.div
                  className="absolute right-0 top-0 mt-[-50px] hidden w-[236px] cursor-pointer flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white md:flex md:h-[425px] lg:w-[238px] xl:h-[450px] xl:w-[240px] 2xl:w-[270px] 3xl:w-[365px]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
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
                        alt="Most Visited Banner Image"
                        width={200}
                        height={200}
                        className="w-[200px] object-contain"
                      />
                    </div>
                  )}
                </motion.div>
              </Link>
            ) : (
              <div className="absolute right-0 top-0 mt-[-50px] hidden w-[236px] rounded-xl bg-[#4C84FF] md:flex md:h-[425px] lg:w-[238px] xl:h-[450px] xl:w-[240px] 2xl:w-[270px] 3xl:w-[365px]" />
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MostVisitedProducts;
