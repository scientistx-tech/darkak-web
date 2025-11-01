'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/shared/ProductCard';
import { motion } from 'framer-motion';
import { useGetNewArivalProductsQuery } from '@/redux/services/client/products';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TrendingProducts() {
  const lang = useSelector((state: RootState) => state.language.language);

  const { data, error, isLoading } = useGetNewArivalProductsQuery('');
  const [screen, setScreen] = useState('md');

  useEffect(() => {
    const logScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreen('sm');
      else if (width < 768) setScreen('md');
      else if (width < 1024) setScreen('lg');
      else if (width < 1280) setScreen('xl');
      else setScreen('2xl');
    };

    logScreenSize();
    window.addEventListener('resize', logScreenSize);
    return () => {
      window.removeEventListener('resize', logScreenSize);
    };
  }, []);

  if (isLoading || error) return null;

  return (
    <main className="mt-15">
      <div>
        <div className="h-[50px]">
          <div className="flex items-center justify-between gap-6 md:justify-start">
            <h2 className="text-2xl font-semibold text-primaryDarkBlue">
              {lang === 'bn' ? 'জনপ্রিয় পণ্যসমূহ' : 'Trending Products'}
            </h2>
            <Link href="/more/new-arival" className="">
              <span className="cursor-pointer text-2xl">→</span>
            </Link>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {data?.data.map((product: any) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
