import React from 'react';
import ContentFaqCard from '@/components/shared/ContentFaqCard';
import getSeoData from '../getSeoData';

export async function generateMetadata() {
  const data = await getSeoData('about');
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
export default async function page() {
  const data = await getSeoData('about');
  return (
    <div>
      <div className="h-[65px] w-full md:h-[109px]" />
      <div className="ml-[2.5%] mt-8 w-[95%] md:mt-16">
        <ContentFaqCard content={data?.data?.content} faqs={data?.data?.faq?.faq || []} />
      </div>
    </div>
  );
}
