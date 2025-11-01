'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ProductCard from '@/components/shared/ProductCard';
import { Product } from '@/app/(root)/types/ProductType';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// const dummyProducts: Product[] = new Array(7).fill(null).map((_, i) => ({
//   id: `prod-${i}`,
//   name: "iPhone 15 Pro Max",
//   images: [
//     "/images/dummy/dummy.png",
//     "/images/dummy/dummy1.png",
//     "/images/dummy/dummy2.png",
//   ],
//   price: 800,
//   originalPrice: 1000,
//   storage: "12GB/512GB",
//   discount: 10,
//   rating: 4.5,
//   reviews: 65,
// }));

export default function RelatedProductsSwiper({ data }: { data: [] }) {
  const lang = useSelector((state: RootState) => state.language.language);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'free-snap',
    renderMode: 'performance',
    rubberband: false,
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 3, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 4, spacing: 16 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 5, spacing: 16 },
      },
    },
  });

  useEffect(() => {
    slider.current?.update();
  }, [slider]);

  return (
    <div className="container mx-auto px-2 py-8 md:px-4">
      <h2 className="text-center text-2xl font-bold text-primaryDarkBlue">
        {lang === 'bn' ? 'সম্পর্কিত পণ্যসমূহ' : 'Related Products'}
      </h2>

      <motion.div
        ref={sliderRef}
        className="keen-slider no-scrollbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {data.map((product: any) => (
          <div className="keen-slider__slide py-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
