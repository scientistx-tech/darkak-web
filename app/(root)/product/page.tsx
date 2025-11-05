import React from 'react';
import ProductPage from './ProductPage';
import getSeoData from '../getSeoData';
// Fetch metadata for SEO
export async function generateMetadata() {
  const data = await getSeoData('product');
  //console.log(data);

  return {
    title: data?.data?.meta_title || '',
    description: data?.data?.meta_description || '',
    keywords: data?.data?.meta_keywords?.map((d: any) => d) || [],
    openGraph: {
      title: data?.data?.meta_title || '',
      description: data?.data?.meta_description || '',
      images: [
        {
          url: data?.data?.meta_image, // Update with your image URL
          width: 1200,
          height: 630,
          alt: data?.data?.meta_alt,
        },
      ],
    },
  };
}
export default function page() {
  return (
    <div className="w-full">
      <div className="h-[65px] w-full md:h-[109px]" />
      <ProductPage />
    </div>
  );
}
